// Calibración externa del espacio de ejes contra el Chapel Hill Expert Survey.
//
// Compara la posición que el motor calcula para cada partido (con la misma
// fórmula de `calcularFacetas`, src/engine/ideologia.ts, aplicada sobre las
// posiciones documentadas en data/partidos/) con la estimación de expertos del
// CHES 2024, reescalada al rango del proyecto. Es una herramienta de
// DIAGNÓSTICO del sesgo de evidencia-bandera (docs/METODOLOGIA.md §6): una
// desviación grande no «suspende» al partido, pero señala dónde la evidencia
// codificada está probablemente sesgada hacia posiciones extremas o donde,
// con argumentos, discrepamos de CHES (que también tiene sesgos y otra fecha
// de campo). Por eso SIEMPRE termina con exit 0.
//
// Uso: npm run calibrar
//
// ── Fuente de los valores CHES ────────────────────────────────────────────────
// Chapel Hill Expert Survey 2024 (trabajo de campo octubre-diciembre de 2024,
// 609 politólogos, 279 partidos en 31 países):
//   Datos:    https://www.chesdata.eu/s/CHES_2024_final_v2.csv
//   Codebook: https://www.chesdata.eu/s/CHES-2024-Codebook.pdf
//   Web:      https://www.chesdata.eu/2024-chapel-hill-expert-survey-ches
//   Cita: Jolly, S., Bakker, R., Hooghe, L., Marks, G., Polk, J., Rovny, J.,
//         Steenbergen, M. & Vachudova, M. (2025). «The 2024 Chapel Hill Expert
//         Survey on political party positioning in Europe». Electoral Studies.
//         https://www.sciencedirect.com/science/article/pii/S0261379425000873
// Valores copiados literalmente del CSV oficial (filas de España, country
// «esp», party_id 501-553; consultado 2026-07-10 vía réplicas públicas del
// fichero oficial, verificando cada fila cruda columna a columna contra la
// cabecera: lrecon es la columna 14, galtan la 18 y regions la 45). No se
// redondean aquí: el redondeo se hace solo al imprimir.
//
// Variables usadas y su correspondencia con los ejes del proyecto
// (data/ejes.json; la polaridad coincide en los tres casos):
//   lrecon  (0 = extrema izquierda económica, 10 = extrema derecha)  → economico
//   galtan  (0 = GAL/libertario,             10 = TAN/autoritario)   → social
//   regions (0 = máxima descentralización,   10 = contra la descentralización)
//                                                                    → territorial
// La comparación principal pedida por la metodología es lrecon/galtan;
// `regions` se incluye como referencia adicional porque el mapa del proyecto
// tiene tres ejes, pero el constructo CHES (descentralización) es más estrecho
// que el eje territorial del proyecto (que incluye autodeterminación, lengua,
// símbolos), así que sus desviaciones se leen con más cautela.
//
// ── Reescalado ────────────────────────────────────────────────────────────────
// CHES usa 0..10 con centro en 5; el proyecto usa −100..+100 con centro en 0:
//   reescalado(v) = (v − 5) · 20
//
// ── Partidos españoles de CHES 2024 sin perfil comparable aquí ───────────────
//   SALF «Se Acabó La Fiesta» (party_id 552): sin ficha en data/partidos/.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Posiciones CHES 2024 (España, country=5). Claves: id de perfil del proyecto.
 * `ches` conserva el nombre con que aparece el partido en el CSV oficial.
 */
const CHES_2024 = {
  psoe: { ches: 'PSOE', lrecon: 3.9375, galtan: 2.9375, regions: 3.5999999 },
  pp: { ches: 'PP', lrecon: 7.25, galtan: 7, regions: 7 },
  vox: { ches: 'Vox', lrecon: 9, galtan: 9.5, regions: 10 },
  'movimiento-sumar': { ches: 'Sumar', lrecon: 2.2666667, galtan: 1.2, regions: 3.5999999 },
  podemos: { ches: 'Podemos', lrecon: 1.625, galtan: 1.4375, regions: 3 },
  iu: { ches: 'IU', lrecon: 1.6, galtan: 2.2666667, regions: 3.8 },
  erc: { ches: 'ERC', lrecon: 2.8571429, galtan: 2.5714285, regions: 0 },
  junts: { ches: 'Junts', lrecon: 6.3333335, galtan: 5.9285712, regions: 0 },
  'eh-bildu': { ches: 'EH Bildu', lrecon: 2.5, galtan: 2.2, regions: 0 },
  'eaj-pnv': { ches: 'EAJ/PNV', lrecon: 6.1999998, galtan: 6.1999998, regions: 0 },
  bng: { ches: 'BNG', lrecon: 2.7333333, galtan: 2.5333333, regions: 0 },
  'coalicion-canaria': { ches: 'Cca', lrecon: 5.8666668, galtan: 6.1666665, regions: 0.75 },
  upn: { ches: 'UPN', lrecon: 7.0714288, galtan: 7.2307692, regions: 3.25 },
};

/** CHES `regions` mide oposición a la descentralización: misma polaridad que
 * el eje territorial del proyecto (positivo = centralización). */
const EJE_A_CHES = { economico: 'lrecon', social: 'galtan', territorial: 'regions' };
const EJES = Object.keys(EJE_A_CHES);

/** Umbral de aviso en puntos del espacio −100..+100. */
const UMBRAL_AVISO = 25;

/** Mismo mínimo absoluto de evidencia que usa el mapa
 * (UMBRAL_EVIDENCIA_ENTIDADES, src/engine/espacio.ts). */
const MINIMO_ITEMS = 4;

const reescalar = (v) => (v - 5) * 20;

// ── Carga del banco de ítems vigente ─────────────────────────────────────────
// Mismos criterios que el mapa: fuera retirados y anclas solo-mapa.
const items = [];
for (const fichero of readdirSync(join(raiz, 'data/items'))) {
  if (!fichero.endsWith('.json') || fichero.startsWith('_')) continue;
  for (const item of JSON.parse(readFileSync(join(raiz, 'data/items', fichero), 'utf8'))) {
    if (item.estado === 'retirado' || item.uso === 'solo-mapa') continue;
    items.push(item);
  }
}

/**
 * Réplica exacta de la fórmula de `calcularFacetas` (src/engine/ideologia.ts):
 *   facetaₖ = 100 · Σ uᵢ·cᵢₖ / Σ 2·|cᵢₖ|
 * sobre las posiciones documentadas del perfil (capa base, nunca dobleLectura,
 * igual que hace `proyectarEnEspacio` con `respuestasDePosiciones`).
 */
function facetasDePerfil(posiciones) {
  const acumuladores = new Map(
    EJES.map((eje) => [eje, { numerador: 0, cargaRespondida: 0, items: 0 }]),
  );
  for (const item of items) {
    const posicion = posiciones[item.id];
    if (typeof posicion?.valor !== 'number') continue;
    for (const carga of item.ejes ?? []) {
      const acumulador = acumuladores.get(carga.eje);
      if (!acumulador || !Number.isFinite(carga.carga) || carga.carga === 0) continue;
      acumulador.numerador += posicion.valor * carga.carga;
      acumulador.cargaRespondida += Math.abs(carga.carga);
      acumulador.items += 1;
    }
  }
  const resultado = {};
  for (const eje of EJES) {
    const { numerador, cargaRespondida, items: n } = acumuladores.get(eje);
    resultado[eje] = {
      valor: cargaRespondida > 0 ? (100 * numerador) / (2 * cargaRespondida) : null,
      items: n,
    };
  }
  return resultado;
}

// ── Comparación ───────────────────────────────────────────────────────────────
const formato = (v) => (v === null || v === undefined ? '   —  ' : String(Math.round(v)).padStart(6));
const filas = [];
let avisos = 0;

for (const [id, ches] of Object.entries(CHES_2024)) {
  const ruta = join(raiz, 'data/partidos', `${id}.json`);
  if (!existsSync(ruta)) {
    filas.push({ id, ches: ches.ches, nota: 'sin ficha en data/partidos/' });
    continue;
  }
  const perfil = JSON.parse(readFileSync(ruta, 'utf8'));
  const facetas = facetasDePerfil(perfil.posiciones ?? {});
  const fila = { id, ches: ches.ches, ejes: {} };
  for (const eje of EJES) {
    const calculado = facetas[eje];
    const esperado = reescalar(ches[EJE_A_CHES[eje]]);
    const comparable = calculado.valor !== null && calculado.items >= MINIMO_ITEMS;
    const desviacion = comparable ? calculado.valor - esperado : null;
    const aviso = desviacion !== null && Math.abs(desviacion) > UMBRAL_AVISO;
    if (aviso) avisos += 1;
    fila.ejes[eje] = { calculado, esperado, desviacion, aviso, comparable };
  }
  filas.push(fila);
}

// ── Salida ────────────────────────────────────────────────────────────────────
console.log('Calibración externa contra CHES 2024 (chesdata.eu; reescalado (v−5)·20 a −100..+100)');
console.log(`Aviso si |calculado − CHES| > ${UMBRAL_AVISO} puntos. Diagnóstico, no bloqueo: exit 0 siempre.`);
console.log(`Ejes: economico↔lrecon, social↔galtan, territorial↔regions (este último, constructo más estrecho).\n`);

const cabecera =
  'partido'.padEnd(19) +
  EJES.map((eje) => `│ ${eje.padStart(10)}: calc  CHES   Δ      `).join('');
console.log(cabecera);
console.log('─'.repeat(cabecera.length));

for (const fila of filas) {
  if (fila.nota) {
    console.log(`${fila.id.padEnd(19)}│ ${fila.nota}`);
    continue;
  }
  let linea = fila.id.padEnd(19);
  for (const eje of EJES) {
    const { calculado, esperado, desviacion, aviso, comparable } = fila.ejes[eje];
    const marca = aviso ? ' AVISO' : comparable ? '      ' : ' n<4  ';
    linea += `│ ${formato(comparable ? calculado.valor : null)}(${String(calculado.items).padStart(2)}) ${formato(esperado)} ${formato(desviacion)}${marca}`;
  }
  console.log(linea);
}

console.log(
  `\n${avisos} desviación(es) > ${UMBRAL_AVISO} puntos. ` +
    'Interpretación: puede ser sesgo de evidencia-bandera en nuestros datos (faltan posiciones moderadoras), ' +
    'una discrepancia argumentada con CHES (documentarla), o distinta fecha de campo (CHES 2024 vs. corpus 2026).',
);
process.exit(0);
