// Presupuestos de transferencia para impedir regresiones silenciosas en móvil.
// Ejecutar después de `npm run web:build`.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const dist = process.argv[2]
  ? resolve(process.cwd(), process.argv[2])
  : fileURLToPath(new URL('../web/dist/', import.meta.url));
const manifestPath = join(dist, '.vite/manifest.json');

if (!existsSync(dist) || !existsSync(manifestPath)) {
  console.error('✗ Falta web/dist/.vite/manifest.json. Ejecuta primero npm run web:build.');
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const errores = [];

function buscarEntrada(nombre, predicado) {
  const candidatas = Object.entries(manifest).filter(([clave, entrada]) =>
    predicado(clave, entrada),
  );
  if (candidatas.length !== 1) {
    errores.push(`${nombre}: se esperaba una entrada de manifest y se encontraron ${candidatas.length}`);
    return null;
  }
  return candidatas[0][0];
}

/** Archivos JS que el navegador necesita para evaluar una entrada, sin imports dinámicos. */
function cierreEstatico(claveInicial) {
  const claves = new Set();
  const ficheros = new Set();
  const visitar = (clave) => {
    if (claves.has(clave)) return;
    claves.add(clave);
    const entrada = manifest[clave];
    if (!entrada) {
      errores.push(`manifest: import estático desconocido ${clave}`);
      return;
    }
    if (typeof entrada.file === 'string' && entrada.file.endsWith('.js')) {
      ficheros.add(entrada.file);
    }
    for (const importado of entrada.imports ?? []) visitar(importado);
  };
  visitar(claveInicial);
  return [...ficheros].sort();
}

function gzipFichero(fichero) {
  const ruta = join(dist, fichero);
  if (!existsSync(ruta)) {
    errores.push(`manifest: falta el fichero ${fichero}`);
    return 0;
  }
  return gzipSync(readFileSync(ruta)).byteLength;
}

function comprobarGrupo(nombre, clave, maxGzip, yaCargados = new Set()) {
  if (!clave) return;
  const ficheros = cierreEstatico(clave).filter((fichero) => !yaCargados.has(fichero));
  const gzip = ficheros.reduce((total, fichero) => total + gzipFichero(fichero), 0);
  const detalle = ficheros.map((fichero) => fichero.split('/').at(-1)).join(' + ');
  if (gzip > maxGzip) {
    errores.push(
      `${nombre}: ${(gzip / 1024).toFixed(1)} KiB gzip supera ${(maxGzip / 1024).toFixed(0)} KiB (${detalle})`,
    );
  } else {
    console.log(`✓ ${nombre}: ${(gzip / 1024).toFixed(1)} KiB gzip (${detalle})`);
  }
}

const entradaInicial = buscarEntrada(
  'aplicación inicial',
  (clave, entrada) => clave === 'index.html' && entrada.isEntry === true,
);
const entradaResultados = buscarEntrada(
  'resultados y catálogos',
  (_clave, entrada) => entrada.name === 'Resultados' && entrada.isDynamicEntry === true,
);
const entradaCompartida = buscarEntrada(
  'resultado compartido',
  (clave) => clave.endsWith('/vistas/ResultadoCompartido.tsx'),
);
const entradaMapa2d = buscarEntrada(
  'atlas interactivo 2D',
  (clave) => clave.endsWith('/componentes/MapaPolitico.tsx') || clave.startsWith('_MapaPolitico-'),
);
const entradaReferencias = buscarEntrada(
  'referencias doctrinales',
  (clave) => clave.endsWith('/componentes/ReferenciasDoctrinales.tsx'),
);
const entrada3d = buscarEntrada('visor 3D', (clave) => clave.endsWith('/componentes/Mapa3D.tsx'));

const ficherosIniciales = new Set(entradaInicial ? cierreEstatico(entradaInicial) : []);
const ficherosResultados = new Set(entradaResultados ? cierreEstatico(entradaResultados) : []);
// 2026-07-13 (tarde): 126→120 — RECUPERACIÓN COMPLETA del 120→130 del día 12.
// La palanca del glosario perezoso se ejecutó al crecer a 96 términos (v5):
// el catálogo sale del cierre inicial con prefetch al montar el cuestionario
// y el inicial queda en 107,2 KiB medidos, por debajo incluso del objetivo
// original pese a llevar 65 preguntas de núcleo y el motor conjuntivo.
comprobarGrupo('aplicación inicial', entradaInicial, 120 * 1024);
// Presupuesto real de ruta: incluye Resultados y todos sus imports estáticos,
// especialmente datosResultados. Se mide transferencia adicional a la portada;
// no se suman chunks dinámicos como Mapa3D.
// 2026-07-13: 420→390 (recuperación COMPLETA del 390→420 del día 12): el
// cruce mapa↔doctrina carga ahora el catálogo doctrinal en diferido y
// datosReferencias volvió detrás de las puertas de atlas/referencias.
// Medido tras la poda: 328,7 — vuelve el margen para las colas de citas.
comprobarGrupo('resultados y catálogos', entradaResultados, 390 * 1024, ficherosIniciales);
comprobarGrupo('resultado compartido', entradaCompartida, 250 * 1024, ficherosIniciales);
// Atlas y referencias solo se descargan tras una acción expresa. Cada puerta
// tiene presupuesto propio y nunca queda escondida dentro de Resultados.
comprobarGrupo('atlas interactivo 2D', entradaMapa2d, 180 * 1024, ficherosResultados);
comprobarGrupo('referencias doctrinales', entradaReferencias, 150 * 1024, ficherosResultados);
// El 3D se abre desde el atlas 2D: mide solo lo que aún no estaba cargado.
const ficherosMapa2d = new Set(entradaMapa2d ? cierreEstatico(entradaMapa2d) : []);
comprobarGrupo('visor 3D', entrada3d, 300 * 1024, ficherosMapa2d);

/**
 * Contrato del payload ligero de referencias (docs/PRODUCCION-APP.md): los
 * recibos por posición (justificacion/fuente) no viajan en el artefacto; el
 * catálogo (ids, valores, fuentesMarco) sí. Se verifica contra el build real
 * con una sentinela derivada de data/, para que no dependa de ningún texto
 * fijado a mano.
 */
function contratoReferenciasLigeras() {
  if (!entradaReferencias) return;
  const contenido = cierreEstatico(entradaReferencias)
    .map((fichero) => (existsSync(join(dist, fichero)) ? readFileSync(join(dist, fichero), 'utf8') : ''))
    .join('\n');
  const refsDir = fileURLToPath(new URL('../data/referencias/', import.meta.url));
  let sentinela = null;
  let idEnBundle = null;
  for (const archivo of readdirSync(refsDir).sort()) {
    if (!archivo.endsWith('.json') || archivo.startsWith('_')) continue;
    const dato = JSON.parse(readFileSync(join(refsDir, archivo), 'utf8'));
    for (const posicion of Object.values(dato.posiciones ?? {})) {
      const texto = posicion?.justificacion;
      const ascii = typeof texto === 'string' ? texto.match(/[A-Za-z ,.:;()-]{32,}/)?.[0] : null;
      if (ascii) {
        sentinela = ascii;
        idEnBundle = dato.id;
        break;
      }
    }
    if (sentinela) break;
  }
  if (!sentinela || !idEnBundle) {
    errores.push('payload ligero: no se pudo derivar una sentinela desde data/referencias');
    return;
  }
  if (!contenido.includes(`"${idEnBundle}"`)) {
    errores.push(`payload ligero: el chunk de referencias no contiene el id «${idEnBundle}» (¿poda excesiva?)`);
  } else if (contenido.includes(sentinela)) {
    errores.push('payload ligero: una justificación de referencia viaja en el bundle (la poda no se aplicó)');
  } else {
    console.log('✓ payload ligero de referencias: recibos podados del artefacto, catálogo íntegro');
  }
}
contratoReferenciasLigeras();

function tamanoDirectorio(ruta) {
  return readdirSync(ruta, { withFileTypes: true }).reduce((total, entrada) => {
    const hijo = join(ruta, entrada.name);
    return total + (entrada.isDirectory() ? tamanoDirectorio(hijo) : statSync(hijo).size);
  }, 0);
}

const total = tamanoDirectorio(dist);
const maxTotal = 3.2 * 1024 * 1024;
if (total > maxTotal) {
  errores.push(`PWA completa: ${(total / 1024 / 1024).toFixed(2)} MiB supera 3,20 MiB`);
} else {
  console.log(`✓ PWA completa: ${(total / 1024 / 1024).toFixed(2)} MiB`);
}

if (errores.length > 0) {
  console.error(`✗ Presupuesto web incumplido:\n- ${errores.join('\n- ')}`);
  process.exit(1);
}
