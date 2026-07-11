// Valida todos los datos de /data contra los esquemas y comprueba la
// integridad referencial (ítems → módulos/ejes, posiciones → ítems).
// Uso: npm run validate:data   (falla con exit 1 si hay errores)
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
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
    for (const c of item.ejes ?? []) {
      if (!idsEjes.has(c.eje)) fallo(donde, `eje inexistente: ${c.eje}`);
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
const directorioReferencias = join(raiz, 'data/referencias');
if (existsSync(directorioReferencias)) {
  for (const fichero of readdirSync(directorioReferencias)) {
    if (!fichero.endsWith('.json') || fichero.startsWith('_')) continue;
    nReferencias++;
    const referencia = leer(`data/referencias/${fichero}`);
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

if (errores.length > 0) {
  console.error(`✗ ${errores.length} error(es) de validación:\n${errores.join('\n')}`);
  process.exit(1);
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
