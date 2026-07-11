#!/usr/bin/env node
/** Sincroniza línea a línea la puerta geométrica sin reformatear el atlas. */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ruta = join(dirname(fileURLToPath(import.meta.url)), '..', 'data/mapa-ideologias.json');
const comprobar = process.argv.includes('--check');
const lineas = readFileSync(ruta, 'utf8').split('\n');
const contextosHistoricos = new Set([
  'titoismo',
  'guevarismo',
  'menchevismo',
  'neozapatismo',
  'situacionismo',
]);
let regiones = 0;
let bloqueadas = 0;
let cambios = 0;
for (let i = 0; i < lineas.length; i += 1) {
  const linea = lineas[i];
  if (!linea.includes('"id"') || !linea.includes('"capa"')) continue;
  const coma = linea.trimEnd().endsWith(',');
  let entrada;
  try { entrada = JSON.parse(linea.trim().replace(/,$/u, '')); } catch { continue; }
  if (contextosHistoricos.has(entrada.id) && entrada.capa !== 'contexto') {
    entrada.capa = 'contexto';
  }
  if (entrada.capa === 'region') {
    regiones += 1;
    const esperada = entrada.estado === 'investigacion'
      ? 'bloqueada-investigacion'
      : 'publicada';
    if (esperada === 'bloqueada-investigacion') bloqueadas += 1;
    if (entrada.publicacionGeometrica === esperada) continue;
    entrada.publicacionGeometrica = esperada;
  } else {
    if (!Object.hasOwn(entrada, 'publicacionGeometrica')) continue;
    delete entrada.publicacionGeometrica;
  }
  const sangria = linea.match(/^\s*/u)?.[0] ?? '';
  lineas[i] = `${sangria}${JSON.stringify(entrada)}${coma ? ',' : ''}`;
  cambios += 1;
}
if (regiones !== 89 || bloqueadas !== 17) {
  throw new Error(`Contrato inesperado: ${regiones} regiones y ${bloqueadas} bloqueadas.`);
}
if (comprobar && cambios) throw new Error(`${cambios} puertas geométricas desincronizadas.`);
if (!comprobar && cambios) writeFileSync(ruta, lineas.join('\n'));
console.log(`✓ Puerta geométrica: ${regiones - bloqueadas} publicadas y ${bloqueadas} bloqueadas.`);
