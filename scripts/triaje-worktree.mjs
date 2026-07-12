#!/usr/bin/env node

/**
 * Herramienta del integrador (§0: no confiar en informes de agentes).
 *
 * Dado un rango git (p. ej. `c42e406..worktree-agent-xyz`), lista TODA
 * posición nueva o modificada en data/partidos y data/referencias junto al
 * ENUNCIADO EXACTO del ítem, para revisar signos de un vistazo:
 *
 *   node scripts/triaje-worktree.mjs <desde> <hasta>
 *
 * Salida por posición: perfil, ítem, valor, calidad, cita sí/no, fecha,
 * enunciado. No sustituye el juicio del integrador: lo acelera.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const [desde, hasta] = process.argv.slice(2);
if (!desde || !hasta) {
  console.error('Uso: node scripts/triaje-worktree.mjs <desde> <hasta>');
  process.exit(2);
}

const enunciados = new Map();
for (const fichero of readdirSync(join(raiz, 'data/items'))) {
  if (!fichero.endsWith('.json')) continue;
  for (const item of JSON.parse(readFileSync(join(raiz, 'data/items', fichero), 'utf8'))) {
    enunciados.set(item.id, item.texto);
  }
}

const git = (...args) =>
  execFileSync('git', args, { cwd: raiz, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
const mostrar = (ref, ruta) => {
  try {
    return JSON.parse(git('show', `${ref}:${ruta}`));
  } catch {
    return null;
  }
};

const ficheros = git('diff', '--name-only', `${desde}..${hasta}`, '--', 'data/partidos', 'data/referencias')
  .split('\n')
  .filter(Boolean);

let totalNuevas = 0;
let totalCambiadas = 0;
for (const ruta of ficheros) {
  const antes = mostrar(desde, ruta);
  const ahora = mostrar(hasta, ruta);
  if (!ahora) {
    console.log(`\n== ${ruta} — ELIMINADO`);
    continue;
  }
  const capas = [['base', ahora.posiciones ?? {}, antes?.posiciones ?? {}]];
  if (ahora.dobleLectura?.contraste) {
    capas.push([
      'contraste',
      ahora.dobleLectura.contraste.posiciones ?? {},
      antes?.dobleLectura?.contraste?.posiciones ?? {},
    ]);
  }
  const filas = [];
  for (const [capa, actuales, previas] of capas) {
    for (const [itemId, pos] of Object.entries(actuales)) {
      const previa = previas[itemId];
      const esNueva = !previa;
      const cambiada = previa && JSON.stringify(previa) !== JSON.stringify(pos);
      if (!esNueva && !cambiada) continue;
      if (esNueva) totalNuevas += 1;
      else totalCambiadas += 1;
      const fuente = pos.fuente ?? {};
      filas.push(
        `  ${esNueva ? 'NUEVA   ' : 'CAMBIADA'} [${capa}] ${itemId} valor=${
          pos.valor >= 0 ? `+${pos.valor}` : pos.valor
        } calidad=${pos.calidadEvidencia ?? '?'} cita=${fuente.cita ? 'sí' : 'NO'} fecha=${
          fuente.fecha ?? '—'
        }` + (previa && previa.valor !== pos.valor ? `  ⚠ VALOR ANTES=${previa.valor}` : ''),
      );
      filas.push(`           «${enunciados.get(itemId) ?? '¡ÍTEM INEXISTENTE!'}»`);
    }
  }
  if (filas.length > 0 || !antes) {
    console.log(`\n== ${ruta}${antes ? '' : ' — FICHERO NUEVO'}`);
    if (!antes && ahora.sensibilidad) console.log(`  sensibilidad: ${ahora.sensibilidad}`);
    if (!antes && ahora.publicacionMapa) {
      console.log(`  publicacionMapa.publicable: ${ahora.publicacionMapa.publicable}`);
    }
    for (const fila of filas) console.log(fila);
  }
}
console.log(`\nTotal: ${totalNuevas} posiciones nuevas, ${totalCambiadas} modificadas en ${ficheros.length} ficheros.`);
