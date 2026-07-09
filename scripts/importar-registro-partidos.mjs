/**
 * Importa el listado público de formaciones en alta del Registro de Partidos.
 *
 * El Ministerio lo publica mediante una aplicación HTML con sesión y botón de
 * exportación, no como API. Este importador usa Chromium solo para reproducir
 * el formulario oficial y guarda exclusivamente denominación, siglas y fecha
 * de inscripción. Descarta domicilio y población registral por minimización y
 * porque una sede no demuestra ámbito electoral. No asigna ideología.
 *
 * Uso: node scripts/importar-registro-partidos.mjs
 */
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = fileURLToPath(new URL('..', import.meta.url));
const destino = join(raiz, 'data/catalogo-formaciones-politicas.json');
const fuente =
  'https://infoelectoral.interior.gob.es/es/formaciones-politicas/registro-de-partidos-politicos/acceso-al-listado-de-formaciones-politicas';
const aplicacion = 'https://servicio.mir.es/nfrontal/webpartido_politico.html';
const consultado = new Date().toISOString().slice(0, 10);
const perfilTemporal = mkdtempSync(join(tmpdir(), 'espectro-registro-'));

function iniciarChromium() {
  const ejecutable = process.env.CHROMIUM_BIN || 'chromium';
  const proceso = spawn(
    ejecutable,
    [
      '--headless',
      '--no-sandbox',
      '--disable-gpu',
      '--ignore-certificate-errors',
      '--remote-debugging-port=0',
      `--user-data-dir=${perfilTemporal}`,
      'about:blank',
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] },
  );

  const websocket = new Promise((resolve, reject) => {
    let salida = '';
    const timeout = setTimeout(
      () => reject(new Error('Chromium no abrió el puerto de depuración a tiempo.')),
      15_000,
    );
    proceso.stderr.setEncoding('utf8');
    proceso.stderr.on('data', (trozo) => {
      salida += trozo;
      const coincidencia = salida.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (!coincidencia?.[1]) return;
      clearTimeout(timeout);
      resolve(coincidencia[1]);
    });
    proceso.once('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });
    proceso.once('exit', (codigo) => {
      if (codigo && !salida.includes('DevTools listening on')) {
        clearTimeout(timeout);
        reject(new Error(`Chromium terminó antes de iniciar (código ${codigo}).`));
      }
    });
  });
  return { proceso, websocket };
}

function clienteCdp(url) {
  const socket = new WebSocket(url);
  let siguienteId = 1;
  const pendientes = new Map();
  const esperas = new Map();

  socket.addEventListener('message', (evento) => {
    const mensaje = JSON.parse(String(evento.data));
    if (mensaje.id) {
      const pendiente = pendientes.get(mensaje.id);
      if (!pendiente) return;
      pendientes.delete(mensaje.id);
      if (mensaje.error) pendiente.reject(new Error(mensaje.error.message));
      else pendiente.resolve(mensaje.result);
      return;
    }
    const lista = esperas.get(mensaje.method);
    if (!lista?.length) return;
    const resolver = lista.shift();
    resolver?.(mensaje.params);
  });

  const abierto = new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  return {
    async comando(method, params = {}) {
      await abierto;
      const id = siguienteId++;
      const respuesta = new Promise((resolve, reject) => pendientes.set(id, { resolve, reject }));
      socket.send(JSON.stringify({ id, method, params }));
      return respuesta;
    },
    async evento(method, limiteMs = 30_000) {
      await abierto;
      return new Promise((resolve, reject) => {
        const lista = esperas.get(method) ?? [];
        let timeout;
        const completar = (parametros) => {
          clearTimeout(timeout);
          resolve(parametros);
        };
        lista.push(completar);
        esperas.set(method, lista);
        timeout = setTimeout(() => {
          const pendientes = esperas.get(method) ?? [];
          const indice = pendientes.indexOf(completar);
          if (indice >= 0) pendientes.splice(indice, 1);
          reject(new Error(`Tiempo agotado esperando ${method}.`));
        }, limiteMs);
      });
    },
    cerrar() {
      socket.close();
    },
  };
}

function normalizarFecha(fecha) {
  const coincidencia = fecha.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  return coincidencia
    ? `${coincidencia[3]}-${coincidencia[2]}-${coincidencia[1]}`
    : fecha || null;
}

function separarNombreYSiglas(celda) {
  const lineas = celda
    .split('\n')
    .map((linea) => linea.trim())
    .filter(Boolean);
  const ultima = lineas.at(-1) ?? '';
  const coincidencia = ultima.match(/^\((.*)\)$/);
  if (!coincidencia) return { denominacion: lineas.join(' '), siglas: null };
  return {
    denominacion: lineas.slice(0, -1).join(' '),
    siglas: coincidencia[1]?.trim() || null,
  };
}

const { proceso, websocket } = iniciarChromium();
let pagina;
try {
  const browserWs = await websocket;
  const puerto = new URL(browserWs).port;
  const nueva = await fetch(`http://127.0.0.1:${puerto}/json/new?${encodeURIComponent(aplicacion)}`, {
    method: 'PUT',
  });
  if (!nueva.ok) throw new Error(`No se pudo crear la pestaña (${nueva.status}).`);
  const objetivo = await nueva.json();
  pagina = clienteCdp(objetivo.webSocketDebuggerUrl);
  await pagina.comando('Page.enable');
  await pagina.comando('Runtime.enable');
  await pagina.evento('Page.loadEventFired');

  const cargaResultados = pagina.evento('Page.loadEventFired', 60_000);
  await pagina.comando('Runtime.evaluate', {
    expression: `(() => {
      const formulario = document.forms[0];
      if (!formulario) throw new Error('No se encontró el formulario oficial.');
      formulario.querySelector('[name="tamPag"]').value = '100000';
      formulario.querySelector('[name="pagActual"]').value = '1';
      formulario.submit();
    })()`,
  });
  await cargaResultados;

  const evaluacion = await pagina.comando('Runtime.evaluate', {
    expression: `(() => ({
      encabezados: [...document.querySelectorAll('table th')].map((celda) => celda.innerText.trim()),
      filas: [...document.querySelectorAll('table tbody tr')].map((fila) =>
        [...fila.querySelectorAll('td')].map((celda) => celda.innerText.trim())
      )
    }))()`,
    returnByValue: true,
  });
  const tabla = evaluacion.result?.value;
  if (!tabla || !Array.isArray(tabla.filas) || tabla.filas.length < 100) {
    throw new Error(`La tabla oficial devolvió ${tabla?.filas?.length ?? 0} filas; se aborta para no guardar un catálogo parcial.`);
  }

  const registros = tabla.filas
    .filter((fila) => fila.length >= 4 && fila[0])
    .map(([nombreYSiglas, , , fechaInscripcion]) => ({
      ...separarNombreYSiglas(nombreYSiglas),
      fechaInscripcion: normalizarFecha(fechaInscripcion),
    }))
    .filter((registro) => registro.denominacion);

  const salida = {
    fuente,
    aplicacion,
    consultado,
    alcance:
      'Formaciones inscritas y en alta. Solo denominación, siglas y fecha: la inscripción no demuestra actividad electoral, ámbito ni posición ideológica.',
    encabezadosOriginales: tabla.encabezados,
    total: registros.length,
    registros,
  };
  writeFileSync(destino, `${JSON.stringify(salida, null, 2)}\n`, 'utf8');
  console.log(`✓ Importadas ${registros.length} formaciones en ${destino}`);
} finally {
  pagina?.cerrar();
  proceso.kill('SIGTERM');
  rmSync(perfilTemporal, { recursive: true, force: true });
}
