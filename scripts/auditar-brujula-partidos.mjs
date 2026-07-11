#!/usr/bin/env node

/**
 * Audita la publicación de partidos en Propiedad/mercado × Poder político.
 *
 * El contrato puro vive en src/engine/evidenciaMapa.js y lo consume también
 * la interfaz. Este fichero se limita a E/S y CLI: CI y el mapa no mantienen
 * dos implementaciones que puedan contar fuentes de manera distinta.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  coordenadaAuditable,
  crearAuditoriaBrujula,
  evaluarPosicion,
  evidenciaIndependiente,
  grupoEvidenciaDe,
  normalizarLocalizador,
  normalizarUrl,
} from '../src/engine/evidenciaMapa.js';

export {
  coordenadaAuditable,
  evaluarPosicion,
  evidenciaIndependiente,
  grupoEvidenciaDe,
  normalizarLocalizador,
  normalizarUrl,
};

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const comoJson = (ruta) => JSON.parse(readFileSync(join(raiz, ruta), 'utf8'));
const jsonEn = (directorio) =>
  readdirSync(join(raiz, directorio))
    .filter((fichero) => fichero.endsWith('.json') && !fichero.startsWith('_'))
    .sort()
    .map((fichero) => comoJson(`${directorio}/${fichero}`));

/** Alias conservado para tests y consumidores del auditor anterior. */
export function crearAuditoria(entrada) {
  return crearAuditoriaBrujula(entrada);
}

export function cargarAuditoria({ incluirHistoricos = false } = {}) {
  const items = jsonEn('data/items').flat().filter((item) => item.estado !== 'retirado');
  const partidos = jsonEn('data/partidos').filter(
    (partido) =>
      !partido.demo &&
      (incluirHistoricos
        ? true
        : partido.actividad !== 'inactiva' && partido.actividad !== 'historica'),
  );
  const atlas = comoJson('data/mapa-ideologias.json');
  return crearAuditoriaBrujula({ items, partidos, atlas });
}

function ejecutarCli() {
  const incluirHistoricos = process.argv.includes('--all');
  const { resumen, resultados } = cargarAuditoria({ incluirHistoricos });
  const alcance = incluirHistoricos ? 'todos' : 'activos';

  if (process.argv.includes('--json')) {
    console.log(
      JSON.stringify(
        { generado: new Date().toISOString(), alcance, resumen, resultados },
        null,
        2,
      ),
    );
  } else {
    console.log(
      `Brújula de partidos (${alcance}): ${resumen.solidas}/${resumen.perfiles} sólidas, ${resumen.provisionales} provisionales, ${resumen.insuficientes} insuficientes; ${resumen.extremosInsuficientes} extremos sin evidencia completa.`,
    );
    for (const resultado of resultados.filter((entrada) => entrada.grado !== 'solida')) {
      const x = resultado.x.valor === null ? '—' : resultado.x.valor.toFixed(1);
      const y = resultado.y.valor === null ? '—' : resultado.y.valor.toFixed(1);
      console.log(
        `- ${resultado.id}: ${resultado.grado}; (${x}, ${y}); ${resultado.problemas.join('; ')}`,
      );
    }
  }

  if (process.argv.includes('--strict') && resumen.solidas !== resumen.perfiles) {
    console.error(
      `✗ Quedan ${resumen.perfiles - resumen.solidas} perfiles (${alcance}) sin coordenada sólida en ambos ejes.`,
    );
    process.exitCode = 1;
  }
}

const ejecutadoDirectamente =
  process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (ejecutadoDirectamente) ejecutarCli();
