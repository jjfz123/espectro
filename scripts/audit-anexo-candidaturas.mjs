#!/usr/bin/env node

/**
 * Puerta aritmética y de coherencia del anexo de candidaturas (casilla 87).
 *
 * Para cada candidatura de cada convocatoria comprueba, sin red:
 *  1. porcentaje declarado ≈ votos / denominador (tolerancia de redondeo);
 *  2. coherencia del motivo de inclusión con el umbral declarado;
 *  3. la suma de votos de las candidaturas no supera el denominador;
 *  4. las relaciones apuntan a perfiles existentes y sin duplicar
 *     misma-organizacion dentro de la convocatoria.
 * La identidad nominal frente a la fuente oficial sigue siendo trabajo
 * editorial (la fuente vive en la cabecera de cada convocatoria).
 */
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const leerDir = (ruta) =>
  readdirSync(join(raiz, ruta))
    .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
    .map((f) => JSON.parse(readFileSync(join(raiz, ruta, f), 'utf8')));

const convocatorias = leerDir('data/convocatorias');
const idsPartidos = new Set(leerDir('data/partidos').map((p) => p.id));

const errores = [];
let candidaturas = 0;

for (const convocatoria of convocatorias) {
  const donde = convocatoria.id;
  const denominador = convocatoria.denominador?.valor;
  const vistos = new Map();
  let sumaVotos = 0;
  for (const candidatura of convocatoria.candidaturas ?? []) {
    candidaturas += 1;
    const etiqueta = `${donde}|${candidatura.id}`;
    sumaVotos += candidatura.votos ?? 0;

    if (typeof denominador === 'number' && denominador > 0 && typeof candidatura.votos === 'number') {
      const esperado = (candidatura.votos / denominador) * 100;
      if (typeof candidatura.porcentaje !== 'number') {
        errores.push(`${etiqueta}: sin porcentaje declarado`);
      } else if (Math.abs(candidatura.porcentaje - esperado) > 0.0005) {
        errores.push(
          `${etiqueta}: porcentaje ${candidatura.porcentaje} ≠ votos/denominador (${esperado.toFixed(6)})`,
        );
      }
    }

    if (
      candidatura.motivoInclusion === 'umbral' &&
      typeof convocatoria.umbralPorcentaje === 'number' &&
      typeof candidatura.porcentaje === 'number' &&
      candidatura.porcentaje < convocatoria.umbralPorcentaje
    ) {
      errores.push(
        `${etiqueta}: motivo «umbral» con ${candidatura.porcentaje} % < umbral ${convocatoria.umbralPorcentaje} %`,
      );
    }

    for (const relacion of candidatura.perfilRelaciones ?? []) {
      if (!idsPartidos.has(relacion.perfilId)) {
        errores.push(`${etiqueta}: relación a perfil inexistente ${relacion.perfilId}`);
      }
      if (relacion.relacion === 'misma-organizacion') {
        const previa = vistos.get(relacion.perfilId);
        if (previa) {
          errores.push(
            `${donde}: ${relacion.perfilId} es misma-organizacion de ${previa} y ${candidatura.id}`,
          );
        }
        vistos.set(relacion.perfilId, candidatura.id);
      }
    }
  }
  if (typeof denominador === 'number' && sumaVotos > denominador) {
    errores.push(`${donde}: la suma de votos (${sumaVotos}) supera el denominador (${denominador})`);
  }
}

if (errores.length > 0) {
  console.error(`✗ audit:anexo — ${errores.length} error(es):`);
  for (const error of errores) console.error(`- ${error}`);
  process.exit(1);
}
console.log(
  `✓ Anexo aritméticamente coherente: ${candidaturas} candidaturas en ${convocatorias.length} convocatorias (porcentajes, umbrales, sumas y relaciones).`,
);
