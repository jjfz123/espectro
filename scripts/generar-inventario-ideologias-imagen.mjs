#!/usr/bin/env node

/**
 * Materializa la criba A–F original sin mezclarla con la ontología actual.
 * Las sustituciones españolas quedan enlazadas como registros independientes:
 * buscar el rótulo de partida abre contexto, nunca una equivalencia doctrinal.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const rutaAtlas = join(raiz, 'data/mapa-ideologias.json');
const rutaTaxonomia = join(raiz, 'docs/investigacion/TAXONOMIA-MAPA-IDEOLOGIAS.md');
const rutaSalida = join(raiz, 'data/inventario-ideologias-imagen.json');
const comprobar = process.argv.includes('--check');

const atlas = JSON.parse(readFileSync(rutaAtlas, 'utf8'));
const textoTaxonomia = readFileSync(rutaTaxonomia, 'utf8');
const inicio = textoTaxonomia.indexOf('## 4. Inventario exhaustivo');
const fin = textoTaxonomia.indexOf('\n## 5.', inicio);
if (inicio < 0 || fin < 0) throw new Error('No se encontró el inventario A–F en la taxonomía.');

const filas = [];
for (const linea of textoTaxonomia.slice(inicio, fin).split('\n')) {
  const match = linea.match(
    /^\|\s*(\d+)\s*\|\s*`([^`]+)`\s*\|\s*([^|]+?)\s*\|\s*([A-F])\s*\|/u,
  );
  if (!match) continue;
  filas.push({
    numero: Number(match[1]),
    etiquetaOriginal: match[2],
    normalizacion: match[3].trim().replace(/\*\*/gu, ''),
    decisionOriginal: match[4],
  });
}
if (filas.length !== 178) throw new Error(`Se esperaban 178 rótulos y hay ${filas.length}.`);

const porEtiquetaActual = new Map(
  atlas.corrientes.map((corriente) => [corriente.etiquetaOriginal, corriente]),
);
const porEtiquetaTrazada = new Map(
  atlas.corrientes
    .filter((corriente) => corriente.trazabilidadOriginal)
    .map((corriente) => [corriente.trazabilidadOriginal.etiquetaOriginal, corriente]),
);
const exclusiones = new Map(
  atlas.exclusiones.map((exclusion) => [exclusion.etiquetaOriginal, exclusion]),
);

const rotulos = filas.map((fila) => {
  const actual = porEtiquetaActual.get(fila.etiquetaOriginal);
  const trazada = porEtiquetaTrazada.get(fila.etiquetaOriginal);
  const exclusion = exclusiones.get(fila.etiquetaOriginal);
  const coincidencias = [actual, trazada, exclusion].filter(Boolean);
  if (coincidencias.length !== 1) {
    throw new Error(
      `«${fila.etiquetaOriginal}» tiene ${coincidencias.length} tratamientos; se esperaba uno.`,
    );
  }

  let tratamientoActual;
  if (trazada) {
    tratamientoActual = {
      clase: trazada.trazabilidadOriginal.capa,
      corrienteId: trazada.id,
      decisionCapa: trazada.decision,
      equivalenciaConCorriente: false,
      motivo: trazada.trazabilidadOriginal.motivo,
    };
  } else if (actual) {
    tratamientoActual = {
      clase: actual.capa,
      corrienteId: actual.id,
      decisionCapa: actual.decision,
      ...(actual.publicacionGeometrica
        ? { publicacionGeometrica: actual.publicacionGeometrica }
        : {}),
      equivalenciaConCorriente: true,
      motivo:
        actual.encajeEspana.length >= 30
          ? actual.encajeEspana
          : `${actual.encajeEspana} ${actual.definicion}`,
    };
  } else {
    tratamientoActual = {
      clase: 'exclusion',
      equivalenciaConCorriente: false,
      motivo: exclusion.motivo,
    };
  }
  return { ...fila, tratamientoActual };
});

const conteoDecisionesOriginales = Object.fromEntries(
  'ABCDEF'.split('').map((decision) => [
    decision,
    rotulos.filter((rotulo) => rotulo.decisionOriginal === decision).length,
  ]),
);
const salida = `${JSON.stringify(
  {
    version: '1.0.0',
    total: rotulos.length,
    conteoDecisionesOriginales,
    rotulos,
  },
  null,
  2,
)}\n`;

if (comprobar) {
  const actual = readFileSync(rutaSalida, 'utf8');
  if (actual !== salida) throw new Error('El inventario ideológico generado está desactualizado.');
} else {
  writeFileSync(rutaSalida, salida);
}

console.log(
  `✓ Inventario original: ${rotulos.length} rótulos; decisiones ${JSON.stringify(conteoDecisionesOriginales)}.`,
);
