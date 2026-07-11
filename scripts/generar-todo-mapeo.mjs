#!/usr/bin/env node

/**
 * Actualiza únicamente los dos inventarios nominales del TODO exhaustivo.
 *
 * Ya no imprime un documento entero para redirigirlo sobre el original: eso
 * borraría los contratos funcionales y sus estados. Sin `--write` actúa como
 * comprobación; con `--write` conserva el resto y escribe mediante renombrado
 * atómico.
 */
import { readFileSync, readdirSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const rutaTodo = join(raiz, 'docs/TODO-MAPEO-EXHAUSTIVO.md');
const leer = (ruta) => readFileSync(join(raiz, ruta), 'utf8');
const actual = readFileSync(rutaTodo, 'utf8');

const partidos = readdirSync(join(raiz, 'data/partidos'))
  .filter((fichero) => fichero.endsWith('.json') && !fichero.startsWith('_'))
  .map((fichero) => JSON.parse(leer(`data/partidos/${fichero}`)))
  .filter((partido) => !partido.demo)
  .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

const taxonomia = leer('docs/investigacion/TAXONOMIA-MAPA-IDEOLOGIAS.md');
const bloqueInventario = taxonomia
  .split('## 4. Inventario exhaustivo de etiquetas legibles de la imagen')[1]
  ?.split('\n## 5.')[0];
if (!bloqueInventario) throw new Error('No se ha encontrado el inventario de 178 etiquetas.');
const ideologias = bloqueInventario
  .split('\n')
  .map((linea) =>
    linea.match(/^\|\s*(\d+)\s*\|\s*`([^`]+)`\s*\|\s*(.*?)\s*\|\s*([A-F])\s*\|/),
  )
  .filter(Boolean)
  .map((coincidencia) => ({
    numero: Number(coincidencia[1]),
    original: coincidencia[2],
    normalizacion: coincidencia[3],
    decision: coincidencia[4],
  }));
if (ideologias.length !== 178) {
  throw new Error(`Se esperaban 178 etiquetas y se han extraído ${ideologias.length}.`);
}

const estadosPartidos = new Map(
  [...actual.matchAll(/^- \[([ x])\] `([^`]+)` —/gmu)].map((m) => [m[2], m[1]]),
);
const estadosIdeologias = new Map(
  [...actual.matchAll(/^- \[([ x])\] \d{3}\. `([^`]+)` →/gmu)].map((m) => [m[2], m[1]]),
);

const filasPartidos = partidos.map((partido) => {
  const notas = [
    partido.actividad ? `actividad: ${partido.actividad}` : null,
    partido.monotematico ? 'hoy monotemático' : null,
    partido.confianza === 'sin-datos' ? 'hoy sin datos' : null,
  ].filter(Boolean);
  return `- [${estadosPartidos.get(partido.id) ?? ' '}] \`${partido.id}\` — ${partido.nombre}${notas.length ? ` _(${notas.join('; ')})_` : ''}`;
});

const filasIdeologias = ideologias.map(
  (ideologia) =>
    `- [${estadosIdeologias.get(ideologia.original) ?? ' '}] ${String(ideologia.numero).padStart(3, '0')}. \`${ideologia.original}\` → ${ideologia.normalizacion} _(clasificación inicial ${ideologia.decision})_`,
);

function sustituirFilas(documento, titulo, patronFila, filas) {
  const inicio = documento.indexOf(titulo);
  if (inicio < 0) throw new Error(`Falta la sección ${titulo}.`);
  const siguiente = documento.indexOf('\n## ', inicio + titulo.length);
  const fin = siguiente < 0 ? documento.length : siguiente + 1;
  const seccion = documento.slice(inicio, fin);
  const lineas = seccion.replace(/\n$/u, '').split('\n');
  const primera = lineas.findIndex((linea) => patronFila.test(linea));
  if (primera < 0) throw new Error(`La sección ${titulo} no contiene filas nominales.`);
  const conservadasAntes = lineas.slice(0, primera);
  const conservadasDespues = lineas.slice(primera).filter((linea) => !patronFila.test(linea));
  const nueva = [...conservadasAntes, ...filas, ...conservadasDespues].join('\n');
  return `${documento.slice(0, inicio)}${nueva}\n${documento.slice(fin)}`;
}

let regenerado = sustituirFilas(
  actual,
  `## Partidos (${partidos.length})`,
  /^- \[[ x]\] `[^`]+` —/u,
  filasPartidos,
);
regenerado = sustituirFilas(
  regenerado,
  `## Etiquetas de la imagen (${ideologias.length})`,
  /^- \[[ x]\] \d{3}\. `[^`]+` →/u,
  filasIdeologias,
);

if (regenerado === actual) {
  console.log('✓ Inventarios nominales sincronizados; el resto del contrato permanece intacto.');
} else if (!process.argv.includes('--write')) {
  console.error('✗ Los inventarios nominales están desactualizados. Ejecuta con --write.');
  process.exitCode = 1;
} else {
  const temporal = `${rutaTodo}.tmp`;
  writeFileSync(temporal, regenerado);
  renameSync(temporal, rutaTodo);
  console.log('✓ Inventarios actualizados atómicamente sin tocar las demás secciones o casillas.');
}
