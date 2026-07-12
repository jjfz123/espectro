import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  rankingAfinidad,
  seleccionarPartidosElectorales,
  type ConvocatoriaElectoral,
  type Partido,
} from '../src/engine/index.js';

const raiz = join(__dirname, '..');

function leerDirectorio<T>(ruta: string): T[] {
  return readdirSync(join(raiz, ruta))
    .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
    .map((f) => JSON.parse(readFileSync(join(raiz, ruta, f), 'utf8')) as T);
}

/**
 * Casilla del TODO «Las 21 convocatorias y 323 candidaturas distinguen
 * partido, coalición, componente, marca y fecha; nunca heredan posiciones ni
 * actividad entre entidades relacionadas»: la relación identifica actores y
 * NADA más — ni una posición ni la vigencia viajan por ella.
 */

const coalicion: Partido = {
  id: 'coalicion-sintetica',
  nombre: 'Coalición Sintética',
  ambito: 'estatal',
  tipo: 'coalicion',
  confianza: 'verificada',
  actividad: 'activa',
  posiciones: {
    'item-x': { valor: 2, justificacion: 'fixture', calidadEvidencia: 'alta' },
  },
} as Partido;

const componente: Partido = {
  id: 'componente-sintetico',
  nombre: 'Componente Sintético',
  ambito: 'estatal',
  confianza: 'verificada',
  actividad: 'activa',
  posiciones: {
    'item-x': { valor: -2, justificacion: 'fixture', calidadEvidencia: 'alta' },
    'item-y': { valor: 2, justificacion: 'fixture', calidadEvidencia: 'alta' },
  },
} as Partido;

const marcaHistorica: Partido = {
  ...componente,
  id: 'marca-historica-sintetica',
  nombre: 'Marca Histórica',
  actividad: 'historica',
} as Partido;

function convocatoriaSintetica(): ConvocatoriaElectoral {
  return {
    id: 'generales-sinteticas',
    nombre: 'Generales sintéticas',
    tipo: 'generales',
    fecha: '2024-01-01',
    territorio: 'espana',
    umbralPorcentaje: 0,
    denominador: { tipo: 'votos-validos', valor: 100 },
    totalCandidaturasOficiales: 1,
    fuente: { titulo: 'fixture', url: 'https://example.org', consultado: '2026-07-12' },
    candidaturas: [
      {
        id: 'papeleta-coalicion',
        nombre: 'Coalición Sintética',
        votos: 100,
        porcentaje: 100,
        motivoInclusion: 'umbral',
        perfilRelaciones: [
          { perfilId: coalicion.id, relacion: 'misma-organizacion' },
          { perfilId: componente.id, relacion: 'componente' },
          { perfilId: marcaHistorica.id, relacion: 'sucesora' },
        ],
      },
    ],
  } as ConvocatoriaElectoral;
}

describe('candidaturas: la relación no hereda posiciones ni actividad', () => {
  const ctx = { tipo: 'generales' as const };
  const seleccion = seleccionarPartidosElectorales(
    [coalicion, componente, marcaHistorica],
    [convocatoriaSintetica()],
    ctx,
  );

  it('cada perfil enlazado compara SOLO sus propias posiciones', () => {
    const respuestas = [
      { itemId: 'item-x', valor: 2 as const },
      { itemId: 'item-y', valor: 2 as const },
    ];
    const ranking = rankingAfinidad(respuestas, seleccion.partidos);
    const porId = new Map(ranking.map((r) => [r.entidadId, r]));
    // La coalición no absorbe item-y de su componente: compara 1 ítem, no 2.
    expect(porId.get(coalicion.id)?.itemsComparados).toBe(1);
    expect(porId.get(coalicion.id)?.puntuacion).toBe(100);
    // El componente conserva su desacuerdo propio en item-x: no lo maquilla
    // la coalición con la que concurre.
    expect(porId.get(componente.id)?.itemsComparados).toBe(2);
    expect(porId.get(componente.id)?.puntuacion).toBeLessThan(100);
  });

  it('una marca histórica no entra en la selección por venir enlazada a una papeleta', () => {
    expect(seleccion.partidos.map((p) => p.id)).not.toContain(marcaHistorica.id);
    // Pero la relación se conserva como identificación (transparencia), sin
    // convertir a la marca en candidatura comparable.
    expect(seleccion.perfilesEnlazados).toBe(3);
  });
});

describe('convocatorias reales: identidad sin duplicidad', () => {
  const convocatorias = leerDirectorio<ConvocatoriaElectoral>('data/convocatorias');

  it('hay 21 convocatorias documentadas', () => {
    expect(convocatorias).toHaveLength(21);
  });

  it('ningún perfil es «misma-organizacion» de dos papeletas de la misma convocatoria', () => {
    for (const convocatoria of convocatorias) {
      const vistos = new Map<string, string>();
      for (const candidatura of convocatoria.candidaturas) {
        for (const relacion of candidatura.perfilRelaciones ?? []) {
          if (relacion.relacion !== 'misma-organizacion') continue;
          const previa = vistos.get(relacion.perfilId);
          expect(
            previa,
            `${convocatoria.id}: ${relacion.perfilId} es la misma organización en ${previa} y ${candidatura.id}`,
          ).toBeUndefined();
          vistos.set(relacion.perfilId, candidatura.id);
        }
      }
    }
  });
});
