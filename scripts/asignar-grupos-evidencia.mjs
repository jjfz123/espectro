#!/usr/bin/env node

/**
 * Asigna identidades estables a pasajes ya citados y fusiona transcripciones
 * casi duplicadas dentro del mismo documento. Es una migración mecánica: el
 * TODO mantiene abierta la revisión editorial nominal de cada recibo.
 */
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  normalizarLocalizador,
  normalizarUrl,
  pasajesEquivalentes,
  transcripcionesRelacionadas,
} from '../src/engine/evidenciaMapa.js';

const raiz = process.env.ESPECTRO_EVIDENCE_ROOT
  ? resolve(process.env.ESPECTRO_EVIDENCE_ROOT)
  : join(dirname(fileURLToPath(import.meta.url)), '..');
const directorios = ['data/partidos', 'data/referencias', 'data/sindicatos'];
const escribir = process.argv.includes('--write');
let conflictosTextuales = 0;
let pasajesNoPublicables = 0;

function coleccionesPosiciones(perfil) {
  return [
    perfil.posiciones,
    perfil.dobleLectura?.contraste?.posiciones,
  ].filter((posiciones) => posiciones && typeof posiciones === 'object');
}

function citaCrudaNormalizada(cita) {
  return typeof cita === 'string'
    ? cita.replace(/[\p{Cf}\uFEFF]/gu, '').replace(/\s+/gu, ' ').trim().toLocaleLowerCase('es')
    : '';
}

function idGenerado(posiciones) {
  const candidatas = posiciones
    .map((posicion) => ({
      url: normalizarUrl(posicion.fuente?.url) ?? 'sin-url',
      cita:
        normalizarLocalizador(posicion.fuente?.cita) ??
        citaCrudaNormalizada(posicion.fuente?.cita),
    }))
    .filter((entrada) => entrada.cita)
    .sort((a, b) => a.cita.length - b.cita.length || a.cita.localeCompare(b.cita, 'es'));
  const canonica = candidatas[0];
  if (!canonica) return null;
  const huella = createHash('sha256')
    .update(`${canonica.url}#${canonica.cita}`)
    .digest('hex')
    .slice(0, 20);
  return `pasaje-${huella}`;
}

function asignarEnColeccion(posiciones) {
  const entradas = Object.entries(posiciones)
    .filter(([, posicion]) =>
      Boolean(citaCrudaNormalizada(posicion?.fuente?.cita)),
    )
    .sort(([idA], [idB]) => idA.localeCompare(idB, 'es'));
  const conglomerados = [];

  pasajesNoPublicables += entradas.filter(([, posicion]) =>
    !normalizarUrl(posicion.fuente?.url) || !normalizarLocalizador(posicion.fuente?.cita),
  ).length;

  for (const entrada of entradas) {
    const [, posicion] = entrada;
    const existente = conglomerados.find((grupo) => {
      const mismaIdentidadExplicita = grupo.some(([, candidata]) =>
        Boolean(
          posicion.grupoEvidencia &&
            candidata.grupoEvidencia === posicion.grupoEvidencia &&
            (normalizarUrl(candidata.fuente?.url) ?? 'sin-url') ===
              (normalizarUrl(posicion.fuente?.url) ?? 'sin-url'),
        ),
      );
      if (mismaIdentidadExplicita) return true;
      return grupo.every(([, candidata]) =>
        ((normalizarUrl(candidata.fuente?.url) ?? 'sin-url') ===
          (normalizarUrl(posicion.fuente?.url) ?? 'sin-url') &&
          citaCrudaNormalizada(candidata.fuente?.cita) ===
            citaCrudaNormalizada(posicion.fuente?.cita)) ||
        pasajesEquivalentes(candidata, posicion),
      );
    });
    (existente ?? conglomerados[conglomerados.push([]) - 1]).push(entrada);
  }

  let cambios = 0;
  for (const grupo of conglomerados) {
    if (grupo.length > 1) {
      let coherente = true;
      for (let indice = 0; indice < grupo.length && coherente; indice += 1) {
        for (let otro = indice + 1; otro < grupo.length; otro += 1) {
          if (!transcripcionesRelacionadas(grupo[indice][1], grupo[otro][1])) {
            coherente = false;
            break;
          }
        }
      }
      if (!coherente) {
        conflictosTextuales += 1;
        continue;
      }
    }
    const existentes = [...new Set(
      grupo
        .map(([, posicion]) => posicion.grupoEvidencia)
        .filter((id) => typeof id === 'string' && /^[a-z0-9][a-z0-9-]{5,100}$/u.test(id)),
    )].sort((a, b) => a.localeCompare(b, 'es'));
    const id = existentes[0] ?? idGenerado(grupo.map(([, posicion]) => posicion));
    if (!id) continue;
    for (const [, posicion] of grupo) {
      if (posicion.grupoEvidencia !== id) {
        posicion.grupoEvidencia = id;
        cambios += 1;
      }
    }
  }
  return cambios;
}

let ficherosCambiados = 0;
let pasajesAsignados = 0;
const escriturasPendientes = [];
for (const directorio of directorios) {
  for (const fichero of readdirSync(join(raiz, directorio))
    .filter((nombre) => nombre.endsWith('.json'))
    .sort((a, b) => a.localeCompare(b, 'es'))) {
    const ruta = join(raiz, directorio, fichero);
    const original = readFileSync(ruta, 'utf8');
    const perfil = JSON.parse(original);
    const cambios = coleccionesPosiciones(perfil).reduce(
      (total, posiciones) => total + asignarEnColeccion(posiciones),
      0,
    );
    if (cambios === 0) continue;
    ficherosCambiados += 1;
    pasajesAsignados += cambios;
    escriturasPendientes.push({
      ruta,
      contenido: `${JSON.stringify(perfil, null, 2)}\n`,
    });
  }
}

// Dos fases: ningún fichero cambia si aparece un conflicto en otro leído más
// tarde. Solo después de validar el conjunto completo se preparan y renombran
// todos los temporales.
if (escribir && conflictosTextuales === 0) {
  for (const { ruta, contenido } of escriturasPendientes) {
    writeFileSync(`${ruta}.tmp`, contenido);
  }
  for (const { ruta } of escriturasPendientes) {
    renameSync(`${ruta}.tmp`, ruta);
  }
}

if (conflictosTextuales > 0) {
  console.error(
    `✗ ${conflictosTextuales} grupo(s) comparten id pero contienen transcripciones inconexas; requieren resolución editorial.`,
  );
  process.exitCode = 1;
} else if (ficherosCambiados === 0) {
  console.log('✓ Todos los pasajes citados conservan un grupo de evidencia canónico.');
} else if (!escribir) {
  console.error(
    `✗ Faltan ${pasajesAsignados} asignaciones en ${ficherosCambiados} ficheros; ejecuta con --write y revisa los conglomerados.`,
  );
  process.exitCode = 1;
} else {
  console.log(
    `✓ Asignados ${pasajesAsignados} grupos de evidencia en ${ficherosCambiados} ficheros; queda pendiente su revisión editorial nominal.`,
  );
}
if (pasajesNoPublicables > 0) {
  console.warn(
    `⚠ ${pasajesNoPublicables} cita(s) tienen identidad canónica pero no URL HTTPS o localizador de 20 caracteres; el runtime las omite del mapa.`,
  );
}
