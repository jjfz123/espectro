// Valida todos los datos de /data contra los esquemas y comprueba la
// integridad referencial (ítems → módulos/ejes, posiciones → ítems).
// Uso: npm run validate:data   (falla con exit 1 si hay errores)
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const errores = [];

/** Fuentes retiradas tras detectar redirecciones o contenido SEO inyectado.
 * Las rutas limpias del mismo medio siguen permitidas cuando proceda. */
function motivoUrlBloqueada(valor) {
  try {
    const url = new URL(valor);
    const host = url.hostname.toLowerCase();
    if (host === 'pcpa.es' || host.endsWith('.pcpa.es')) {
      return 'dominio de fuente comprometido; usar PCPE/JEC u otra fuente primaria';
    }
    if (host === 'aliancacatalana.cat' && url.pathname.includes('independencia-i-pais')) {
      return 'ruta oficial antigua comprometida; usar web.aliancacatalana.cat';
    }
    if (host === 'aliancacatalana.cat' && url.pathname === '/') {
      return 'raíz oficial antigua comprometida; usar web.aliancacatalana.cat';
    }
    if (host === 'www.nuevacanariasbc.org' && url.pathname === '/') {
      return 'raíz comprometida; enlazar únicamente documentos o artículos verificados';
    }
  } catch {
    return undefined;
  }
  return undefined;
}

function auditarUrls(datos, ruta, camino = '') {
  if (Array.isArray(datos)) {
    datos.forEach((valor, indice) => auditarUrls(valor, ruta, `${camino}/${indice}`));
    return;
  }
  if (!datos || typeof datos !== 'object') return;
  for (const [clave, valor] of Object.entries(datos)) {
    const siguiente = `${camino}/${clave}`;
    if ((clave === 'url' || clave === 'web') && typeof valor === 'string') {
      const motivo = motivoUrlBloqueada(valor);
      if (motivo) errores.push(`- ${ruta}${siguiente}: URL bloqueada (${motivo}): ${valor}`);
    }
    auditarUrls(valor, ruta, siguiente);
  }
}

/** JSON.parse acepta claves duplicadas y conserva solo la última. Eso puede
 * borrar evidencia sin que AJV lo vea, así que se detectan antes de parsear. */
function clavesDuplicadas(texto) {
  const pila = [];
  const duplicadas = [];
  let linea = 1;
  for (let i = 0; i < texto.length; i++) {
    const caracter = texto[i];
    if (caracter === '\n') {
      linea++;
      continue;
    }
    if (caracter === '{') {
      pila.push({ tipo: 'objeto', claves: new Set(), esperaClave: true });
      continue;
    }
    if (caracter === '[') {
      pila.push({ tipo: 'array' });
      continue;
    }
    if (caracter === '}' || caracter === ']') {
      pila.pop();
      continue;
    }
    const actual = pila.at(-1);
    if (caracter === ',' && actual?.tipo === 'objeto') {
      actual.esperaClave = true;
      continue;
    }
    if (caracter !== '"') continue;

    const lineaClave = linea;
    let fin = i + 1;
    while (fin < texto.length) {
      if (texto[fin] === '\\') {
        fin += 2;
        continue;
      }
      if (texto[fin] === '"') break;
      if (texto[fin] === '\n') linea++;
      fin++;
    }
    if (actual?.tipo === 'objeto' && actual.esperaClave) {
      const clave = JSON.parse(texto.slice(i, fin + 1));
      if (actual.claves.has(clave)) duplicadas.push({ clave, linea: lineaClave });
      actual.claves.add(clave);
      actual.esperaClave = false;
    }
    i = fin;
  }
  return duplicadas;
}

const leer = (ruta) => {
  const texto = readFileSync(join(raiz, ruta), 'utf8');
  for (const duplicada of clavesDuplicadas(texto)) {
    errores.push(`- ${ruta}:${duplicada.linea}: clave JSON duplicada «${duplicada.clave}»`);
  }
  const datos = JSON.parse(texto);
  auditarUrls(datos, ruta);
  return datos;
};

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validaEje = ajv.compile(leer('data/schemas/eje.schema.json'));
const validaModulo = ajv.compile(leer('data/schemas/modulo.schema.json'));
const validaItem = ajv.compile(leer('data/schemas/item.schema.json'));
const validaPartido = ajv.compile(leer('data/schemas/partido.schema.json'));
const validaSindicato = ajv.compile(leer('data/schemas/sindicato.schema.json'));
const validaTermino = ajv.compile(leer('data/schemas/termino.schema.json'));
const validaConvocatoria = ajv.compile(leer('data/schemas/convocatoria.schema.json'));
const validaReferencia = ajv.compile(leer('data/schemas/referencia.schema.json'));
const validaMapaIdeologias = ajv.compile(leer('data/schemas/mapa-ideologias.schema.json'));
const validaInventarioIdeologias = ajv.compile(
  leer('data/schemas/inventario-ideologias-imagen.schema.json'),
);

const fallo = (donde, detalle) => errores.push(`- ${donde}: ${detalle}`);
const ajvErrores = (v) =>
  (v.errors ?? []).map((e) => `${e.instancePath || '/'} ${e.message}`).join('; ');

// Metadatos que invalidan de forma segura las sesiones si cambia el
// significado del instrumento y declaran el corte editorial offline.
const versionDatos = leer('data/version.json');
if (!/^[1-9][0-9]*$/.test(versionDatos.versionInstrumento ?? '')) {
  fallo('version.json', 'versionInstrumento debe ser un entero positivo representado como texto');
}
const fechaCorte = versionDatos.fechaCorte ?? '';
const fechaCorteObjeto = new Date(`${fechaCorte}T00:00:00Z`);
if (
  !/^\d{4}-\d{2}-\d{2}$/.test(fechaCorte) ||
  Number.isNaN(fechaCorteObjeto.getTime()) ||
  fechaCorteObjeto.toISOString().slice(0, 10) !== fechaCorte
) {
  fallo('version.json', 'fechaCorte debe ser una fecha ISO YYYY-MM-DD válida');
}

// 1. Ejes
const ejes = leer('data/ejes.json');
const idsEjes = new Set();
for (const eje of ejes) {
  if (!validaEje(eje)) fallo(`ejes.json (${eje.id ?? '?'})`, ajvErrores(validaEje));
  if (idsEjes.has(eje.id)) fallo(`ejes.json (${eje.id ?? '?'})`, 'id duplicado');
  for (let i = 1; i < (eje.referencias?.length ?? 0); i++) {
    if (eje.referencias[i - 1].valor >= eje.referencias[i].valor) {
      fallo(
        `ejes.json (${eje.id ?? '?'})`,
        'las referencias de escala deben tener valores únicos y orden ascendente',
      );
      break;
    }
  }
  idsEjes.add(eje.id);
}

// 2. Módulos
const modulos = leer('data/modulos.json');
const idsModulos = new Set();
const CCAA_VALIDAS = new Set([
  'andalucia', 'aragon', 'asturias', 'canarias', 'cantabria', 'castilla-la-mancha',
  'castilla-y-leon', 'catalunya', 'ceuta', 'comunitat-valenciana', 'euskadi',
  'extremadura', 'galicia', 'illes-balears', 'la-rioja', 'madrid', 'melilla',
  'murcia', 'navarra',
]);
for (const m of modulos) {
  if (!validaModulo(m)) fallo(`modulos.json (${m.id ?? '?'})`, ajvErrores(validaModulo));
  if (idsModulos.has(m.id)) fallo(`modulos.json (${m.id ?? '?'})`, 'id duplicado');
  idsModulos.add(m.id);
  if (['eje', 'eje-banda', 'eje-o-ccaa'].includes(m.desbloqueo?.tipo) && !idsEjes.has(m.desbloqueo.eje)) {
    fallo(`modulos.json (${m.id})`, `desbloqueo referencia un eje inexistente: ${m.desbloqueo.eje}`);
  }
  if (m.desbloqueo?.tipo === 'eje-banda' && m.desbloqueo.min > m.desbloqueo.max) {
    fallo(`modulos.json (${m.id})`, 'la banda tiene min mayor que max');
  }
  if (['ccaa', 'eje-o-ccaa'].includes(m.desbloqueo?.tipo)) {
    const comunidades = Array.isArray(m.desbloqueo.ccaa) ? m.desbloqueo.ccaa : [m.desbloqueo.ccaa];
    for (const ccaa of comunidades) {
      if (!CCAA_VALIDAS.has(ccaa)) fallo(`modulos.json (${m.id})`, `CCAA inexistente: ${ccaa}`);
    }
  }
}

// 3. Glosario
const terminos = leer('data/glosario.json');
const idsTerminos = new Set();
for (const t of terminos) {
  const donde = `glosario.json (${t.id ?? '?'})`;
  if (!validaTermino(t)) fallo(donde, ajvErrores(validaTermino));
  if (idsTerminos.has(t.id)) fallo(donde, 'id duplicado');
  idsTerminos.add(t.id);
}

// 4. Ítems
const idsItems = new Set();
const itemsPorId = new Map();
const ordenItems = new Map();
const terminosUsados = new Set();
let indiceItem = 0;
for (const fichero of readdirSync(join(raiz, 'data/items'))) {
  if (!fichero.endsWith('.json')) continue;
  const items = leer(`data/items/${fichero}`);
  for (const item of items) {
    const donde = `items/${fichero} (${item.id ?? '?'})`;
    if (!validaItem(item)) fallo(donde, ajvErrores(validaItem));
    if (idsItems.has(item.id)) fallo(donde, 'id duplicado');
    idsItems.add(item.id);
    itemsPorId.set(item.id, item);
    ordenItems.set(item.id, indiceItem++);
    if (!idsModulos.has(item.modulo)) fallo(donde, `módulo inexistente: ${item.modulo}`);
    const ejesVistos = new Set();
    for (const c of item.ejes ?? []) {
      if (!idsEjes.has(c.eje)) fallo(donde, `eje inexistente: ${c.eje}`);
      if (ejesVistos.has(c.eje)) fallo(donde, `eje repetido en el ítem: ${c.eje}`);
      ejesVistos.add(c.eje);
    }
    if (item.uso === 'solo-mapa' && (item.ejes?.length ?? 0) === 0) {
      fallo(donde, 'un ítem solo-mapa debe cargar al menos una faceta; si no, no produciría ningún resultado');
    }
    for (const t of item.terminos ?? []) {
      if (!idsTerminos.has(t)) fallo(donde, `término de glosario inexistente: ${t}`);
      terminosUsados.add(t);
    }
  }
}

// Las condiciones se comprueban después de cargar todo el banco para permitir
// referencias a cualquier ítem anterior del mismo módulo.
for (const item of itemsPorId.values()) {
  if (!item.condicion) continue;
  const padre = itemsPorId.get(item.condicion.itemId);
  const donde = `ítem condicional (${item.id})`;
  if (!padre) {
    fallo(donde, `referencia un ítem inexistente: ${item.condicion.itemId}`);
    continue;
  }
  if (padre.id === item.id) fallo(donde, 'no puede depender de sí mismo');
  if (padre.modulo !== item.modulo && padre.modulo !== 'nucleo') {
    fallo(
      donde,
      `debe depender de un ítem del mismo módulo o del núcleo común: ${padre.id}`,
    );
  }
  if ((ordenItems.get(padre.id) ?? Infinity) >= (ordenItems.get(item.id) ?? -1)) {
    fallo(donde, `la pregunta padre debe aparecer antes: ${padre.id}`);
  }
  if (padre.estado === 'retirado' && item.estado !== 'retirado') {
    fallo(donde, `depende de un ítem retirado: ${padre.id}`);
  }
}

// Detección defensiva de ciclos, aunque el requisito de orden ya los impide.
for (const item of itemsPorId.values()) {
  const visitados = new Set([item.id]);
  let actual = item;
  while (actual.condicion) {
    if (visitados.has(actual.condicion.itemId)) {
      fallo(`ítem condicional (${item.id})`, 'ciclo de dependencias');
      break;
    }
    visitados.add(actual.condicion.itemId);
    const padre = itemsPorId.get(actual.condicion.itemId);
    if (!padre) break;
    actual = padre;
  }
}
for (const t of idsTerminos) {
  if (!terminosUsados.has(t)) fallo(`glosario.json (${t})`, 'término sin ningún ítem que lo use');
}

// El rápido tiene orden e identidad canónicos fuera del glob de Vite: un
// fichero nuevo o reordenado no puede alterar silenciosamente sus 50 preguntas.
const rapido = leer('data/rapido.json');
const idsRapidos = Array.isArray(rapido.ids) ? rapido.ids : [];
const idsAmpliacionRapida = Array.isArray(rapido.idsAmpliacion2026)
  ? rapido.idsAmpliacion2026
  : [];
if (idsRapidos.length !== 50) fallo('rapido.json', `debe contener 50 ids, contiene ${idsRapidos.length}`);
if (new Set(idsRapidos).size !== idsRapidos.length) fallo('rapido.json', 'contiene ids duplicados');
if (idsAmpliacionRapida.length !== 10) {
  fallo('rapido.json', `la ampliación debe contener 10 ids, contiene ${idsAmpliacionRapida.length}`);
}
if (new Set(idsAmpliacionRapida).size !== idsAmpliacionRapida.length) {
  fallo('rapido.json', 'la ampliación contiene ids duplicados');
}
if (idsRapidos.slice(-idsAmpliacionRapida.length).join('|') !== idsAmpliacionRapida.join('|')) {
  fallo('rapido.json', 'los diez ids de ampliación deben cerrar el recorrido rápido');
}
for (const itemId of idsRapidos) {
  const item = itemsPorId.get(itemId);
  if (!item) fallo('rapido.json', `ítem inexistente: ${itemId}`);
  else if (item.estado === 'retirado') fallo('rapido.json', `ítem retirado: ${itemId}`);
  else if (item.modulo !== 'nucleo') fallo('rapido.json', `ítem fuera del núcleo: ${itemId}`);
}
const nucleoVigente = [...itemsPorId.values()]
  .filter((item) => item.modulo === 'nucleo' && item.estado !== 'retirado')
  .map((item) => item.id);
const fueraDelManifiesto = nucleoVigente.filter((itemId) => !idsRapidos.includes(itemId));
if (fueraDelManifiesto.length > 0) {
  fallo('rapido.json', `ítems vigentes del núcleo fuera del manifiesto: ${fueraDelManifiesto.join(', ')}`);
}

// 5. Partidos (los ficheros que empiezan por "_" son plantillas y se omiten)
let nPartidos = 0;
const idsPartidos = new Set();
const partidos = [];
const validarPosicionesPerfil = (posiciones, donde, confianza, capa = 'base') => {
  for (const [itemId, pos] of Object.entries(posiciones ?? {})) {
    if (!idsItems.has(itemId)) fallo(donde, `posición sobre ítem inexistente: ${itemId}`);
    if (itemsPorId.get(itemId)?.uso === 'solo-mapa') {
      fallo(donde, `posición partidista prohibida sobre ítem solo-mapa: ${itemId}`);
    }
    if (itemsPorId.get(itemId)?.estado === 'retirado') {
      fallo(donde, `posición sobre un ítem retirado: ${itemId}`);
    }
    if (capa === 'base' && pos.estadoCompromiso) {
      fallo(donde, `estado de compromiso fuera de la capa observada: ${itemId}`);
    }
    if (capa === 'contraste' && pos.fuente?.tipo === 'programa') {
      fallo(donde, `la conducta reciente no puede acreditarse solo con un programa: ${itemId}`);
    }
    if (confianza === 'verificada' || capa === 'contraste') {
      if (!pos.justificacion) fallo(donde, `posición «verificada» sin justificación: ${itemId}`);
      if (!pos.fuente?.url || !pos.fuente?.titulo || !pos.fuente?.consultado) {
        fallo(
          donde,
          `posición «verificada» sin fuente titulada, enlazada y con fecha de consulta: ${itemId}`,
        );
      }
      if (!pos.calidadEvidencia) {
        fallo(donde, `posición «verificada» sin calidad de evidencia: ${itemId}`);
      }
    }
  }
};
for (const fichero of readdirSync(join(raiz, 'data/partidos'))) {
  if (!fichero.endsWith('.json') || fichero.startsWith('_')) continue;
  nPartidos++;
  const p = leer(`data/partidos/${fichero}`);
  partidos.push(p);
  const donde = `partidos/${fichero} (${p.id ?? '?'})`;
  if (!validaPartido(p)) fallo(donde, ajvErrores(validaPartido));
  if (idsPartidos.has(p.id)) fallo(donde, 'id duplicado');
  idsPartidos.add(p.id);
  if (p.ambito !== 'estatal' && (!Array.isArray(p.ccaa) || p.ccaa.length === 0)) {
    fallo(donde, 'un partido no estatal debe declarar al menos una CCAA');
  }
  for (const ccaa of p.ccaa ?? []) {
    if (!CCAA_VALIDAS.has(ccaa)) fallo(donde, `CCAA inexistente: ${ccaa}`);
  }
  if (p.excepcionCatalogo) {
    if (p.actividad !== 'activa') {
      fallo(donde, 'una excepción de catálogo debe acreditar actividad actual');
    }
    const fuente = p.excepcionCatalogo.fuente;
    if (!fuente?.titulo || !fuente?.url || !fuente?.consultado) {
      fallo(donde, 'excepción de catálogo sin fuente titulada, enlazada y consultada');
    }
  }
  validarPosicionesPerfil(p.posiciones, donde, p.confianza);
  if (p.monotematico) {
    const posiciones = Object.keys(p.posiciones ?? {});
    if (p.confianza !== 'verificada') {
      fallo(donde, 'un perfil monotemático debe tener evidencia verificada');
    }
    if (posiciones.length < 1 || posiciones.length > 3) {
      fallo(donde, 'un perfil monotemático debe declarar entre 1 y 3 posiciones');
    }
    for (const itemId of posiciones) {
      if ((itemsPorId.get(itemId)?.ejes?.length ?? 0) > 0) {
        fallo(donde, `un perfil monotemático solo puede usar ítems solo-matching: ${itemId}`);
      }
    }
  }
  if (p.dobleLectura) {
    const contraste = p.dobleLectura.contraste;
    if (contraste.desde && contraste.desde > contraste.hasta) {
      fallo(donde, 'la ventana de doble lectura empieza después de terminar');
    }
    if (p.revisado && contraste.hasta > p.revisado) {
      fallo(donde, 'la doble lectura termina después de la fecha de revisión del perfil');
    }
    if (Object.keys(contraste.posiciones ?? {}).length === 0) {
      fallo(donde, 'la doble lectura debe contener al menos una posición observada');
    }
    validarPosicionesPerfil(contraste.posiciones, `${donde}, doble lectura`, 'verificada', 'contraste');
  }
}

for (const p of partidos) {
  for (const componente of p.componentes ?? []) {
    if (!idsPartidos.has(componente)) {
      fallo(`partido (${p.id})`, `componente inexistente: ${componente}`);
    }
    if (componente === p.id) fallo(`partido (${p.id})`, 'no puede contenerse a sí mismo');
  }
}

// 6. Referencias doctrinales: tipos ideales no electorales. A diferencia de
// los partidos, pueden usar anclas solo-mapa, pero siempre con fuente propia.
let nReferencias = 0;
const idsReferencias = new Set();
const referencias = [];
const directorioReferencias = join(raiz, 'data/referencias');
if (existsSync(directorioReferencias)) {
  for (const fichero of readdirSync(directorioReferencias)) {
    if (!fichero.endsWith('.json') || fichero.startsWith('_')) continue;
    nReferencias++;
    const referencia = leer(`data/referencias/${fichero}`);
    referencias.push(referencia);
    const donde = `referencias/${fichero} (${referencia.id ?? '?'})`;
    if (!validaReferencia(referencia)) fallo(donde, ajvErrores(validaReferencia));
    if (idsReferencias.has(referencia.id)) fallo(donde, 'id duplicado');
    if (idsPartidos.has(referencia.id)) fallo(donde, 'id compartido con un partido real');
    idsReferencias.add(referencia.id);
    for (const faceta of referencia.facetasDefinitorias ?? []) {
      if (!idsEjes.has(faceta)) fallo(donde, `faceta inexistente: ${faceta}`);
    }
    if (referencia.publicacionMapa?.publicable === true) {
      fallo(donde, 'publicacionMapa solo debe declararse para una exclusión editorial razonada');
    }
    const posiciones = Object.entries(referencia.posiciones ?? {});
    if ((referencia.reglaPublicacion?.minimoItems ?? Infinity) > posiciones.length) {
      fallo(donde, 'el mínimo publicable supera el número de posiciones definitorias');
    }
    for (const [itemId, posicion] of posiciones) {
      const item = itemsPorId.get(itemId);
      if (!item) fallo(donde, `posición sobre ítem inexistente: ${itemId}`);
      if (item?.estado === 'retirado') fallo(donde, `posición sobre ítem retirado: ${itemId}`);
      if (!posicion.justificacion || !posicion.calidadEvidencia) {
        fallo(donde, `posición doctrinal sin justificación o calidad: ${itemId}`);
      }
      if (!posicion.fuente?.titulo || !posicion.fuente?.url || !posicion.fuente?.consultado) {
        fallo(donde, `posición doctrinal sin fuente completa: ${itemId}`);
      }
    }
  }
}

// 6 bis. Atlas ideológico de la brújula principal. Esta capa editorial es
// deliberadamente distinta de las referencias de matching: puede explicar
// una corriente seria todavía no instrumentada, pero no fingir afinidad. El
// contrato se comprueba aquí para que densidad, cuadrantes y desviaciones no
// dependan de una revisión visual informal.
const mapaIdeologias = leer('data/mapa-ideologias.json');
if (!validaMapaIdeologias(mapaIdeologias)) {
  fallo('mapa-ideologias.json', ajvErrores(validaMapaIdeologias));
}
const inventarioIdeologias = leer('data/inventario-ideologias-imagen.json');
if (!validaInventarioIdeologias(inventarioIdeologias)) {
  fallo(
    'inventario-ideologias-imagen.json',
    ajvErrores(validaInventarioIdeologias),
  );
}

const corrientesAtlas = Array.isArray(mapaIdeologias.corrientes)
  ? mapaIdeologias.corrientes
  : [];
const anclasRegionalesAtlas = corrientesAtlas.filter((corriente) => corriente.capa === 'region');
const regionesAtlas = anclasRegionalesAtlas.filter(
  (corriente) => corriente.publicacionGeometrica === 'publicada',
);
const avisosAtlas = [];
const umbralesAtlas = mapaIdeologias.umbrales ?? {};
const subdimensionesXAtlas = mapaIdeologias.sistema?.subdimensionesX ?? {};
const familiasYAtlas = mapaIdeologias.sistema?.familiasY ?? {};
const familiasNucleoYAtlas = new Set(mapaIdeologias.sistema?.familiasNucleoY ?? []);
const idsCorrientesAtlas = new Set();
const nombresCorrientesAtlas = new Set();
const coordenadasCorrientesAtlas = new Set();
const familiasAtlas = new Set();
const cuadrantesAtlas = { 'izquierda-arriba': 0, 'derecha-arriba': 0, 'izquierda-abajo': 0, 'derecha-abajo': 0 };
let nInstrumentadasAtlas = 0;
const referenciaPorId = new Map(referencias.map((referencia) => [referencia.id, referencia]));

for (const [subdimension, ids] of Object.entries(subdimensionesXAtlas)) {
  for (const itemId of ids ?? []) {
    const item = itemsPorId.get(itemId);
    if (!item) fallo(`mapa-ideologias.json (subdimensión ${subdimension})`, `ítem inexistente: ${itemId}`);
    else if (item.estado === 'retirado') {
      fallo(`mapa-ideologias.json (subdimensión ${subdimension})`, `ítem retirado: ${itemId}`);
    } else if (
      !item.ejes?.some(
        (entrada) => entrada.eje === 'propiedad-mercado' && entrada.carga !== 0,
      )
    ) {
      fallo(
        `mapa-ideologias.json (subdimensión ${subdimension})`,
        `el ítem ${itemId} no carga en propiedad-mercado`,
      );
    }
  }
}
for (const [familia, ids] of Object.entries(familiasYAtlas)) {
  for (const itemId of ids ?? []) {
    const item = itemsPorId.get(itemId);
    if (!item) fallo(`mapa-ideologias.json (familiaY ${familia})`, `ítem inexistente: ${itemId}`);
    else if (item.estado === 'retirado') {
      fallo(`mapa-ideologias.json (familiaY ${familia})`, `ítem retirado: ${itemId}`);
    } else if (
      !item.ejes?.some(
        (entrada) => entrada.eje === 'autoridad-politica' && entrada.carga !== 0,
      )
    ) {
      fallo(
        `mapa-ideologias.json (familiaY ${familia})`,
        `el ítem ${itemId} no carga en autoridad-politica`,
      );
    }
  }
}
const pertenenciaFamiliaY = new Map();
for (const [familia, ids] of Object.entries(familiasYAtlas)) {
  for (const itemId of ids ?? []) {
    const previa = pertenenciaFamiliaY.get(itemId);
    if (previa) {
      fallo(
        'mapa-ideologias.json (familiasY)',
        `el ítem ${itemId} figura a la vez en ${previa} y ${familia}; duplicaría su evidencia`,
      );
    } else {
      pertenenciaFamiliaY.set(itemId, familia);
    }
  }
}
for (const item of itemsPorId.values()) {
  if (
    item.estado !== 'retirado' &&
    item.ejes?.some((entrada) => entrada.eje === 'autoridad-politica') &&
    !pertenenciaFamiliaY.has(item.id)
  ) {
    fallo(
      'mapa-ideologias.json (familiasY)',
      `la carga directa de ${item.id} no está clasificada en ninguna familia de Poder`,
    );
  }
}
for (const familia of familiasNucleoYAtlas) {
  if (!Object.hasOwn(familiasYAtlas, familia)) {
    fallo('mapa-ideologias.json (familiasNucleoY)', `familia inexistente: ${familia}`);
  }
}

const distanciaCoordenadas = (a, b) =>
  Math.hypot((a?.x ?? 0) - (b?.x ?? 0), (a?.y ?? 0) - (b?.y ?? 0));

const facetaDeReferencia = (referencia, ejeId) => {
  let numerador = 0;
  let carga = 0;
  let items = 0;
  for (const [itemId, posicion] of Object.entries(referencia?.posiciones ?? {})) {
    const item = itemsPorId.get(itemId);
    const cargaEje = item?.ejes?.find((entrada) => entrada.eje === ejeId)?.carga;
    if (!Number.isFinite(cargaEje) || cargaEje === 0 || item?.estado === 'retirado') continue;
    numerador += posicion.valor * cargaEje;
    carga += Math.abs(cargaEje);
    items += 1;
  }
  return { valor: carga > 0 ? (100 * numerador) / (2 * carga) : null, items };
};

const poderDeReferencia = (referencia) => {
  const faceta = facetaDeReferencia(referencia, 'autoridad-politica');
  const idsPosicionados = new Set(Object.keys(referencia?.posiciones ?? {}));
  const idsInstrumento = new Set(Object.values(familiasYAtlas).flat());
  const familias = Object.values(familiasYAtlas).filter((ids) =>
    ids.some((itemId) => idsPosicionados.has(itemId)),
  ).length;
  const idsNucleo = new Set(
    [...familiasNucleoYAtlas].flatMap((familia) => familiasYAtlas[familia] ?? []),
  );
  return {
    valor: faceta.valor,
    // Igual que web/src/atlasIdeologias.ts: cuentan los ids declarados en el
    // contrato, no cualquier carga auxiliar que pueda añadirse al eje.
    items: [...idsPosicionados].filter((itemId) => idsInstrumento.has(itemId)).length,
    familias,
    itemsNucleo: [...idsPosicionados].filter((itemId) => idsNucleo.has(itemId)).length,
  };
};

for (const corriente of corrientesAtlas) {
  const donde = `mapa-ideologias.json (${corriente.id ?? '?'})`;
  if (idsCorrientesAtlas.has(corriente.id)) fallo(donde, 'id de corriente duplicado');
  if (nombresCorrientesAtlas.has(corriente.nombre)) fallo(donde, 'nombre de corriente duplicado');
  idsCorrientesAtlas.add(corriente.id);
  nombresCorrientesAtlas.add(corriente.nombre);
  if (corriente.publicacionGeometrica === 'publicada') familiasAtlas.add(corriente.familia);

  if (corriente.publicacionGeometrica === 'publicada') {
    const claveCoordenada = `${corriente.coordenadas?.x},${corriente.coordenadas?.y}`;
    if (coordenadasCorrientesAtlas.has(claveCoordenada)) {
      fallo(donde, `coordenada final duplicada: ${claveCoordenada}`);
    }
    coordenadasCorrientesAtlas.add(claveCoordenada);

    const { x, y } = corriente.coordenadas ?? {};
    if (x < 0 && y > 0) cuadrantesAtlas['izquierda-arriba']++;
    if (x > 0 && y > 0) cuadrantesAtlas['derecha-arriba']++;
    if (x < 0 && y < 0) cuadrantesAtlas['izquierda-abajo']++;
    if (x > 0 && y < 0) cuadrantesAtlas['derecha-abajo']++;
  }

  if (
    corriente.capa === 'region' &&
    corriente.estado === 'investigacion' &&
    corriente.publicacionGeometrica !== 'bloqueada-investigacion'
  ) {
    fallo(donde, 'una región en investigación no puede publicar geometría');
  }

  for (const itemId of corriente.preguntasDiscriminantes ?? []) {
    const item = itemsPorId.get(itemId);
    if (!item) fallo(donde, `pregunta discriminante inexistente: ${itemId}`);
    else if (item.estado === 'retirado') fallo(donde, `pregunta discriminante retirada: ${itemId}`);
  }

  const priorTrazable = corriente.trazabilidadOriginal?.coordenadasOriginales;
  if (
    priorTrazable &&
    (corriente.coordenadasPrior?.x !== priorTrazable.x ||
      corriente.coordenadasPrior?.y !== priorTrazable.y)
  ) {
    fallo(
      donde,
      'coordenadasPrior debe conservar coordenadasOriginales cuando una región sustituye otro rótulo',
    );
  }
  const distanciaPrior = distanciaCoordenadas(
    priorTrazable ?? corriente.coordenadasPrior,
    corriente.coordenadas,
  );
  if (distanciaPrior > (umbralesAtlas.maximaDistanciaConJustificacion ?? Infinity)) {
    const sustitucionRevisada =
      priorTrazable &&
      corriente.desviacionJustificada &&
      corriente.revisionEditorialDoble &&
      distanciaPrior <= (umbralesAtlas.maximaDistanciaMotorConJustificacion ?? Infinity);
    if (!sustitucionRevisada) {
      fallo(
        donde,
        `se aleja ${distanciaPrior.toFixed(1)} puntos del prior visual; una sustitución que supera el máximo exige justificación y revisión editorial doble`,
      );
    }
  } else if (
    distanciaPrior > (umbralesAtlas.maximaDistanciaSinJustificar ?? Infinity) &&
    !corriente.desviacionJustificada
  ) {
    fallo(donde, `se aleja ${distanciaPrior.toFixed(1)} puntos del prior visual sin justificación`);
  }

  if (corriente.estado !== 'instrumentada') continue;
  const referencia = referenciaPorId.get(corriente.referenciaId);
  if (!referencia) {
    fallo(donde, `referenciaId inexistente: ${corriente.referenciaId ?? '(vacío)'}`);
    continue;
  }
  if (corriente.publicacionGeometrica !== 'publicada') continue;
  nInstrumentadasAtlas++;
  if (
    referencia.sensibilidad &&
    referencia.sensibilidad !== 'normal' &&
    corriente.sensibilidad !== referencia.sensibilidad
  ) {
    fallo(
      donde,
      `sensibilidad ${corriente.sensibilidad} no conserva la de la referencia (${referencia.sensibilidad})`,
    );
  }

  const propiedad = facetaDeReferencia(referencia, 'propiedad-mercado');
  const poder = poderDeReferencia(referencia);
  const idsPosicionados = new Set(Object.keys(referencia.posiciones ?? {}));
  const idsPropiedadContrato = new Set(Object.values(subdimensionesXAtlas).flat());
  const itemsPropiedadContrato = [...idsPosicionados].filter((itemId) =>
    idsPropiedadContrato.has(itemId),
  ).length;
  const subdimensionesCubiertas = Object.values(subdimensionesXAtlas).filter((ids) =>
    ids.some((itemId) => idsPosicionados.has(itemId)),
  ).length;
  // Replica el umbral técnico vigente del frontend; el atlas no rellena los
  // huecos cuando falta una de las dos coordenadas calculables.
  if (
    itemsPropiedadContrato >= (umbralesAtlas.minimoItemsX ?? Infinity) &&
    subdimensionesCubiertas >= (umbralesAtlas.minimoSubdimensionesX ?? Infinity) &&
    typeof propiedad.valor === 'number' &&
    poder.items >= (umbralesAtlas.minimoItemsY ?? Infinity) &&
    poder.familias >= (umbralesAtlas.minimoFamiliasY ?? Infinity) &&
    poder.itemsNucleo >= (umbralesAtlas.minimoItemsNucleoY ?? Infinity) &&
    typeof poder.valor === 'number'
  ) {
    const distanciaMotor = Math.hypot(
      propiedad.valor - corriente.coordenadas.x,
      poder.valor - corriente.coordenadas.y,
    );
    if (distanciaMotor > (umbralesAtlas.maximaDistanciaMotorConJustificacion ?? Infinity)) {
      fallo(donde, `motor y atlas divergen ${distanciaMotor.toFixed(1)} puntos; supera el máximo absoluto`);
    } else if (
      distanciaMotor > (umbralesAtlas.maximaDistanciaMotorSinJustificar ?? Infinity) &&
      !corriente.desviacionJustificada
    ) {
      fallo(donde, `motor y atlas divergen ${distanciaMotor.toFixed(1)} puntos sin justificación`);
    }
  }
}

const numerosInventario = new Set();
const etiquetasInventario = new Set();
const exclusionAtlasPorEtiqueta = new Set(
  (mapaIdeologias.exclusiones ?? []).map((exclusion) => exclusion.etiquetaOriginal),
);
let sustitucionesDesacopladas = 0;
for (const rotulo of inventarioIdeologias.rotulos ?? []) {
  const donde = `inventario-ideologias-imagen.json (${rotulo.numero ?? '?'})`;
  if (numerosInventario.has(rotulo.numero)) fallo(donde, 'número original duplicado');
  if (etiquetasInventario.has(rotulo.etiquetaOriginal)) fallo(donde, 'rótulo original duplicado');
  numerosInventario.add(rotulo.numero);
  etiquetasInventario.add(rotulo.etiquetaOriginal);
  const tratamiento = rotulo.tratamientoActual ?? {};
  if (tratamiento.clase === 'exclusion') {
    if (!exclusionAtlasPorEtiqueta.has(rotulo.etiquetaOriginal)) {
      fallo(donde, 'la exclusión no existe en el contrato actual');
    }
    continue;
  }
  const corriente = corrientesAtlas.find((entrada) => entrada.id === tratamiento.corrienteId);
  if (!corriente) {
    fallo(donde, `corriente actual inexistente: ${tratamiento.corrienteId ?? '(vacía)'}`);
    continue;
  }
  if (tratamiento.equivalenciaConCorriente === false) {
    sustitucionesDesacopladas++;
    if (corriente.trazabilidadOriginal?.etiquetaOriginal !== rotulo.etiquetaOriginal) {
      fallo(donde, 'el registro contextual no coincide con trazabilidadOriginal');
    }
    if (corriente.etiquetaOriginal === rotulo.etiquetaOriginal) {
      fallo(donde, 'el sustituto todavía usa el rótulo original como identidad técnica');
    }
  } else if (corriente.etiquetaOriginal !== rotulo.etiquetaOriginal) {
    fallo(donde, 'la equivalencia declarada no coincide con la etiqueta de la corriente');
  }
}
if (sustitucionesDesacopladas !== 15) {
  fallo(
    'inventario-ideologias-imagen.json',
    `se esperaban 15 sustituciones desacopladas y hay ${sustitucionesDesacopladas}`,
  );
}

if (regionesAtlas.length < (umbralesAtlas.minimoCorrientes ?? Infinity)) {
  avisosAtlas.push(
    `densidad: ${regionesAtlas.length} regiones publicadas frente a la referencia ${umbralesAtlas.minimoCorrientes}`,
  );
}
if (nInstrumentadasAtlas < (umbralesAtlas.minimoInstrumentadas ?? Infinity)) {
  avisosAtlas.push(
    `documentación: ${nInstrumentadasAtlas} regiones publicadas instrumentadas frente a la referencia ${umbralesAtlas.minimoInstrumentadas}`,
  );
}
if (familiasAtlas.size < (umbralesAtlas.minimoFamilias ?? Infinity)) {
  avisosAtlas.push(
    `cobertura: ${familiasAtlas.size} familias publicadas frente a la referencia ${umbralesAtlas.minimoFamilias}`,
  );
}
for (const [cuadrante, numero] of Object.entries(cuadrantesAtlas)) {
  if (numero < (umbralesAtlas.minimoPorCuadrante ?? Infinity)) {
    avisosAtlas.push(
      `cuadrante ${cuadrante}: ${numero} regiones publicadas frente a la referencia ${umbralesAtlas.minimoPorCuadrante}`,
    );
  }
}

// Auditoría geométrica discreta, determinista y barata. La misma rejilla
// estima la mayor región y el agujero más alejado; los umbrales dejan margen
// suficiente para que la aproximación no falle por una centésima.
if (regionesAtlas.length > 0) {
  const ladoAuditoria = 121;
  const celdasPorCorriente = new Array(regionesAtlas.length).fill(0);
  let radioVacio = 0;
  for (let fila = 0; fila < ladoAuditoria; fila++) {
    const y = 100 - (200 * fila) / (ladoAuditoria - 1);
    for (let columna = 0; columna < ladoAuditoria; columna++) {
      const x = -100 + (200 * columna) / (ladoAuditoria - 1);
      let mejor = 0;
      let distanciaMejor = Infinity;
      regionesAtlas.forEach((corriente, indice) => {
        const distancia = Math.hypot(
          x - corriente.coordenadas.x,
          y - corriente.coordenadas.y,
        );
        if (distancia < distanciaMejor) {
          distanciaMejor = distancia;
          mejor = indice;
        }
      });
      celdasPorCorriente[mejor]++;
      radioVacio = Math.max(radioVacio, distanciaMejor);
    }
  }
  const areaMayor = (100 * Math.max(...celdasPorCorriente)) / (ladoAuditoria ** 2);
  if (areaMayor > (umbralesAtlas.maximaAreaRegionPorcentaje ?? Infinity) + 0.15) {
    avisosAtlas.push(
      `área: la región mayor ocupa aproximadamente ${areaMayor.toFixed(2)} %, por encima de la referencia`,
    );
  }
  if (radioVacio > (umbralesAtlas.maximoRadioVacio ?? Infinity) + 0.5) {
    avisosAtlas.push(
      `vacío: radio aproximado ${radioVacio.toFixed(1)}, por encima de la referencia`,
    );
  }
}

// 7. Convocatorias y candidaturas. Una candidatura es una marca presentada en
// una elección; no se confunde con el partido ni hereda su posición doctrinal.
let nConvocatorias = 0;
let nCandidaturas = 0;
const idsConvocatorias = new Set();
const idsCandidaturas = new Set();
const directorioConvocatorias = join(raiz, 'data/convocatorias');
if (existsSync(directorioConvocatorias)) {
  for (const fichero of readdirSync(directorioConvocatorias)) {
    if (!fichero.endsWith('.json') || fichero.startsWith('_')) continue;
    nConvocatorias++;
    const convocatoria = leer(`data/convocatorias/${fichero}`);
    const donde = `convocatorias/${fichero} (${convocatoria.id ?? '?'})`;
    if (!validaConvocatoria(convocatoria)) {
      fallo(donde, ajvErrores(validaConvocatoria));
    }
    if (idsConvocatorias.has(convocatoria.id)) fallo(donde, 'id duplicado');
    idsConvocatorias.add(convocatoria.id);
    if (convocatoria.territorio !== 'espana' && !CCAA_VALIDAS.has(convocatoria.territorio)) {
      fallo(donde, `territorio inexistente: ${convocatoria.territorio}`);
    }
    if (convocatoria.tipo === 'autonomicas' && convocatoria.territorio === 'espana') {
      fallo(donde, 'una convocatoria autonómica debe identificar su comunidad');
    }
    if (convocatoria.totalCandidaturasOficiales < convocatoria.candidaturas.length) {
      fallo(donde, 'hay más candidaturas incluidas que candidaturas oficiales declaradas');
    }
    let votosAnteriores = Infinity;
    for (const candidatura of convocatoria.candidaturas ?? []) {
      nCandidaturas++;
      const dondeCandidatura = `${donde}, candidatura ${candidatura.id ?? '?'}`;
      if (idsCandidaturas.has(candidatura.id)) fallo(dondeCandidatura, 'id duplicado');
      idsCandidaturas.add(candidatura.id);
      if (candidatura.votos > votosAnteriores) {
        fallo(dondeCandidatura, 'las candidaturas deben estar ordenadas por votos descendentes');
      }
      votosAnteriores = candidatura.votos;
      const porcentajeCalculado =
        (100 * candidatura.votos) / convocatoria.denominador.valor;
      if (Math.abs(porcentajeCalculado - candidatura.porcentaje) > 0.000001) {
        fallo(
          dondeCandidatura,
          `porcentaje inconsistente: ${candidatura.porcentaje} frente a ${porcentajeCalculado}`,
        );
      }
      if (
        candidatura.motivoInclusion === 'umbral' &&
        candidatura.porcentaje < convocatoria.umbralPorcentaje
      ) {
        fallo(dondeCandidatura, 'marcada por umbral pese a quedar por debajo');
      }
      for (const ccaa of candidatura.territorios ?? []) {
        if (!CCAA_VALIDAS.has(ccaa)) fallo(dondeCandidatura, `CCAA inexistente: ${ccaa}`);
      }
      const perfilesVistos = new Set();
      for (const relacion of candidatura.perfilRelaciones ?? []) {
        if (perfilesVistos.has(relacion.perfilId)) {
          fallo(dondeCandidatura, `perfil relacionado dos veces: ${relacion.perfilId}`);
        }
        perfilesVistos.add(relacion.perfilId);
        if (!idsPartidos.has(relacion.perfilId)) {
          fallo(dondeCandidatura, `perfil de partido inexistente: ${relacion.perfilId}`);
        }
      }
    }
  }
}

// 8. Sindicatos: catálogo separado del electoral. La afinidad doctrinal no
// acredita implantación real y nunca comparte ranking con los partidos.
let nSindicatos = 0;
const idsSindicatos = new Set();
for (const fichero of readdirSync(join(raiz, 'data/sindicatos'))) {
  if (!fichero.endsWith('.json') || fichero.startsWith('_')) continue;
  nSindicatos++;
  const sindicato = leer(`data/sindicatos/${fichero}`);
  const donde = `sindicatos/${fichero} (${sindicato.id ?? '?'})`;
  if (!validaSindicato(sindicato)) fallo(donde, ajvErrores(validaSindicato));
  if (idsSindicatos.has(sindicato.id)) fallo(donde, 'id duplicado');
  if (idsReferencias.has(sindicato.id)) fallo(donde, 'id compartido con una referencia doctrinal');
  if (idsPartidos.has(sindicato.id)) fallo(donde, 'id compartido con un partido real');
  idsSindicatos.add(sindicato.id);
  if (
    ['autonomico', 'territorial'].includes(sindicato.ambito) &&
    (!Array.isArray(sindicato.ccaa) || sindicato.ccaa.length === 0)
  ) {
    fallo(donde, 'un sindicato autonómico o territorial debe declarar al menos una CCAA');
  }
  for (const ccaa of sindicato.ccaa ?? []) {
    if (!CCAA_VALIDAS.has(ccaa)) fallo(donde, `CCAA inexistente: ${ccaa}`);
  }
  for (const [itemId, pos] of Object.entries(sindicato.posiciones ?? {})) {
    const item = itemsPorId.get(itemId);
    if (!item) fallo(donde, `posición sobre ítem inexistente: ${itemId}`);
    if (item?.uso === 'solo-mapa') {
      fallo(donde, `posición sindical prohibida sobre ítem solo-mapa: ${itemId}`);
    }
    if (item?.estado === 'retirado') fallo(donde, `posición sobre un ítem retirado: ${itemId}`);
    if (sindicato.confianza === 'verificada') {
      if (!pos.justificacion) fallo(donde, `posición «verificada» sin justificación: ${itemId}`);
      if (!pos.fuente?.url || !pos.fuente?.fecha || !pos.fuente?.titulo) {
        fallo(donde, `posición «verificada» sin fuente fechada, titulada y enlazada: ${itemId}`);
      }
      if (!pos.calidadEvidencia) {
        fallo(donde, `posición «verificada» sin calidad de evidencia: ${itemId}`);
      }
    }
  }
}

// Candado del instrumento: la compatibilidad de una sesión guardada depende
// de que el contenido SEMÁNTICO del banco (ids, cargas, condiciones, uso,
// módulo, estado, polaridad y marco de cada ítem vigente) no cambie dentro de una misma
// versionInstrumento. Antes esa garantía era un comentario en estado.ts;
// ahora es un hash reproducible: cualquier cambio semántico rompe CI hasta
// que alguien decida conscientemente si es (a) compatible/aditivo —actualizar
// hashSemantico en data/version.json—, o (b) incompatible —subir
// versionInstrumento, declarar migración o reinicio informado, y actualizar
// el hash—. Los cambios de solo texto (reformulaciones) no alteran el hash.
const itemsSemanticos = [...itemsPorId.values()]
  .filter((item) => item.estado !== 'retirado')
  .map((item) => ({
    id: item.id,
    modulo: item.modulo,
    ejes: item.ejes ?? [],
    condicion: item.condicion ?? null,
    uso: item.uso ?? 'normal',
    estado: item.estado ?? 'activo',
    polaridad: item.polaridad ?? null,
    // El marco es significado, no texto: sistema-actual vs sociedad-deseada
    // reinterpreta la misma respuesta (lab-028 vs lab-029 se distinguen solo
    // por él). La aclaración sí es texto y queda fuera.
    marco: item.marco?.supuesto ?? 'neutro',
  }))
  .sort((a, b) => a.id.localeCompare(b.id));
const hashSemantico = createHash('sha256')
  .update(JSON.stringify(itemsSemanticos))
  .digest('hex')
  .slice(0, 16);
if (versionDatos.hashSemantico !== hashSemantico) {
  fallo(
    'version.json',
    `hashSemantico desactualizado: el contenido semántico del instrumento cambió (hash actual ${hashSemantico}, declarado ${versionDatos.hashSemantico ?? 'ausente'}). ` +
      'Decide: cambio compatible/aditivo → actualiza hashSemantico; cambio de carga, signo, condición, uso o módulo de un ítem existente → sube versionInstrumento y define migración o reinicio informado.',
  );
}

// Campos huérfanos de presentación. La `dobleLectura` es un contrato
// solo-visualización: cada uno de sus campos debe pintarse en alguna vista.
// Un campo que exista en los datos pero que ninguna vista de `web/src`
// referencie sale «pelado» en pantalla —le pasó a `descripcionBase`—, un
// fallo que ni el esquema ni la integridad referencial detectan. Se caza
// aquí en CI: si el frontend no menciona un campo de la doble lectura, falla.
function codigoFrontend(dir) {
  let texto = '';
  for (const entrada of readdirSync(dir, { withFileTypes: true })) {
    const ruta = join(dir, entrada.name);
    if (entrada.isDirectory()) {
      if (entrada.name === 'node_modules' || entrada.name === 'dist') continue;
      texto += codigoFrontend(ruta);
    } else if (/\.(ts|tsx)$/.test(entrada.name)) {
      texto += readFileSync(ruta, 'utf8');
    }
  }
  return texto;
}
const dirFrontend = join(raiz, 'web/src');
if (existsSync(dirFrontend)) {
  const codigoWeb = codigoFrontend(dirFrontend);
  // Campos de presentación de la doble lectura (se excluyen los contenedores
  // `contraste` y `posiciones`, que se pintan mediante estructuras propias).
  const camposPresentacion = new Set();
  for (const p of partidos) {
    if (!p.dobleLectura) continue;
    for (const clave of Object.keys(p.dobleLectura)) {
      if (clave !== 'contraste') camposPresentacion.add(clave);
    }
    for (const clave of Object.keys(p.dobleLectura.contraste ?? {})) {
      if (clave !== 'posiciones') camposPresentacion.add(clave);
    }
  }
  for (const campo of camposPresentacion) {
    if (!new RegExp(`\\b${campo}\\b`).test(codigoWeb)) {
      fallo(
        'doble lectura',
        `campo de presentación huérfano: «${campo}» existe en los datos pero ninguna vista de web/src lo pinta`,
      );
    }
  }
}

if (errores.length > 0) {
  console.error(`✗ ${errores.length} error(es) de validación:\n${errores.join('\n')}`);
  process.exit(1);
}

if (avisosAtlas.length > 0) {
  console.warn(
    `⚠ ${avisosAtlas.length} diagnóstico(s) de cobertura del atlas (no bloquean ni justifican rellenar huecos):\n${avisosAtlas.map((aviso) => `- ${aviso}`).join('\n')}`,
  );
}

// Aviso (no bloquea): sesgo de evidencia-bandera en los ejes del mapa.
// Un PARTIDO cuya proyección cae pegada a una esquina con pocas posiciones
// suele reflejar que solo se codificaron sus posturas características (todas
// ±2 en su dirección), no una posición real tan extrema. Las referencias
// doctrinales quedan fuera: un tipo ideal puede vivir legítimamente en el polo.
const EJES_MAPA = ['economico', 'social', 'territorial'];
const avisosSesgo = [];
for (const p of partidos) {
  if (p.demo) continue;
  for (const eje of EJES_MAPA) {
    let num = 0, den = 0, n = 0, extremas = 0;
    for (const [itemId, pos] of Object.entries(p.posiciones ?? {})) {
      const carga = itemsPorId.get(itemId)?.ejes?.find((c) => c.eje === eje)?.carga;
      if (typeof carga !== 'number' || itemsPorId.get(itemId)?.estado === 'retirado') continue;
      num += pos.valor * carga;
      den += 2 * Math.abs(carga);
      n += 1;
      if (Math.abs(pos.valor) === 2) extremas += 1;
    }
    if (n >= 4 && den > 0) {
      const valor = Math.round((100 * num) / den);
      if (Math.abs(valor) >= 85 && extremas === n) {
        avisosSesgo.push(
          `- ${p.id} (${eje}): ${valor} con ${n} posiciones, todas ±2 — ¿evidencia limitada a posiciones-bandera o extremo real? Buscar posiciones moderadoras documentables.`,
        );
      }
    }
  }
}
if (avisosSesgo.length > 0) {
  console.warn(
    `⚠ ${avisosSesgo.length} aviso(s) de posible sesgo de evidencia-bandera (no bloquean):\n${avisosSesgo.join('\n')}`,
  );
}

// Aviso (no bloquea): estructura muerta del instrumento. Un eje sin ítems
// vigentes produce una faceta siempre null; un módulo sin ítems vigentes es
// inalcanzable. No son errores porque pueden ser transitorios entre tandas,
// pero deben verse en cada validación hasta resolverse o retirarse.
const avisosEstructura = [];
const ejesUsados = new Set();
const modulosUsados = new Set();
for (const item of itemsPorId.values()) {
  if (item.estado === 'retirado') continue;
  modulosUsados.add(item.modulo);
  for (const carga of item.ejes ?? []) {
    if (carga.carga !== 0) ejesUsados.add(carga.eje);
  }
}
for (const eje of ejes) {
  if (!ejesUsados.has(eje.id)) {
    avisosEstructura.push(`- eje sin ítems vigentes que lo carguen: ${eje.id} (faceta siempre «sin datos»)`);
  }
}
for (const m of modulos) {
  if (!modulosUsados.has(m.id)) {
    avisosEstructura.push(`- módulo sin ítems vigentes: ${m.id}`);
  }
}
if (avisosEstructura.length > 0) {
  console.warn(
    `⚠ ${avisosEstructura.length} aviso(s) de estructura del instrumento (no bloquean):\n${avisosEstructura.join('\n')}`,
  );
}
const itemsVigentes = [...itemsPorId.values()].filter((item) => item.estado !== 'retirado');
const nSeguimientos = itemsVigentes.filter((item) => item.condicion).length;
const nCartografia = itemsVigentes.filter((item) => item.uso === 'solo-mapa').length;
const nMatching = itemsVigentes.filter(
  (item) => !item.condicion && item.uso !== 'solo-mapa' && item.ejes.length === 0,
).length;
const nEje = itemsVigentes.length - nSeguimientos - nCartografia - nMatching;
const nRetirados = idsItems.size - itemsVigentes.length;
console.log(
  `✓ Datos válidos (instrumento v${versionDatos.versionInstrumento}, corte ${versionDatos.fechaCorte}): ${ejes.length} ejes, ${modulos.length} módulos, ${idsItems.size} ítems (${itemsVigentes.length} vigentes: ${nEje} de eje, ${nMatching} solo-matching, ${nSeguimientos} seguimientos, ${nCartografia} solo-mapa; ${nRetirados} retirados), ${terminos.length} términos de glosario, ${nPartidos} partidos, ${nReferencias} referencias doctrinales, ${nConvocatorias} convocatorias (${nCandidaturas} candidaturas incluidas) y ${nSindicatos} sindicatos.`,
);
