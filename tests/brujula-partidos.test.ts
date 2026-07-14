import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  EJE_ECONOMIA_BRUJULA,
  EJE_PODER_BRUJULA,
  ENTIDADES_MAPA,
  TOTAL_PARTIDOS_CATALOGO,
} from '../web/src/mapaEspacial.js';

interface Posicion {
  valor: -2 | -1 | 0 | 1 | 2;
  fuente?: { url?: string; titulo?: string; consultado?: string };
}

interface Partido {
  id: string;
  demo?: boolean;
  actividad?: string;
  posiciones: Record<string, Posicion>;
}

function leerJson<T>(ruta: string): T {
  return JSON.parse(readFileSync(ruta, 'utf8')) as T;
}

function partidosActivos(): Partido[] {
  return readdirSync('data/partidos')
    .filter((archivo) => archivo.endsWith('.json') && !archivo.startsWith('_'))
    .map((archivo) => leerJson<Partido>(join('data/partidos', archivo)))
    .filter((partido) => !partido.demo && partido.actividad === 'activa');
}

describe('publicación completa de la brújula de partidos', () => {
  it('mantiene exactamente los 65 partidos activos dentro del eje y lejos de ±100', () => {
    const activos = partidosActivos();
    const registro = leerJson<{
      metodologia: { rangoPartidos: [number, number] };
      partidos: Record<
        string,
        [
          x: number,
          y: number,
          incertidumbreX: number,
          incertidumbreY: number,
          criterio: 'D' | 'P' | 'M',
        ]
      >;
    }>('data/brujula-partidos.json');

    expect(activos).toHaveLength(65);
    const entradas = Object.entries(registro.partidos);
    expect(entradas).toHaveLength(65);
    expect(new Set(entradas.map(([id]) => id))).toEqual(
      new Set(activos.map((partido) => partido.id)),
    );
    const [minimo, maximo] = registro.metodologia.rangoPartidos;
    for (const [, [x, y, incertidumbreX, incertidumbreY]] of entradas) {
      expect(x).toBeGreaterThanOrEqual(minimo);
      expect(x).toBeLessThanOrEqual(maximo);
      expect(y).toBeGreaterThanOrEqual(minimo);
      expect(y).toBeLessThanOrEqual(maximo);
      expect(Math.abs(x)).toBeLessThan(100);
      expect(Math.abs(y)).toBeLessThan(100);
      expect(incertidumbreX).toBeGreaterThan(0);
      expect(incertidumbreY).toBeGreaterThan(0);
    }
  });

  it('publica esos 65 partidos en el flujo real que consume el componente del mapa', () => {
    const partidos = ENTIDADES_MAPA.filter((entidad) => entidad.tipo === 'partido');
    expect(TOTAL_PARTIDOS_CATALOGO).toBe(65);
    expect(partidos).toHaveLength(65);
    for (const partido of partidos) {
      expect(typeof partido.valores[EJE_ECONOMIA_BRUJULA.id]).toBe('number');
      expect(typeof partido.valores[EJE_PODER_BRUJULA.id]).toBe('number');
      expect(partido.evidenciaBrujula).toBeDefined();
    }
  });

  it('cablea cada pregunta rápida con al menos tres partidos activos y hace bidireccional la nueva 65', () => {
    const activos = partidosActivos();
    const rapido = leerJson<{ ids: string[] }>('data/rapido.json');
    const cobertura = new Map(
      rapido.ids.map((itemId) => [
        itemId,
        activos.filter((partido) => partido.posiciones[itemId] !== undefined),
      ]),
    );

    for (const [itemId, partidos] of cobertura) {
      expect(partidos.length, `${itemId} carece de anclajes partidistas`).toBeGreaterThanOrEqual(3);
    }

    const posiciones65 = cobertura.get('lab-017')?.map((partido) => partido.posiciones['lab-017']!) ?? [];
    expect(posiciones65.length).toBeGreaterThanOrEqual(40);
    expect(posiciones65.filter((posicion) => posicion.valor < 0).length).toBeGreaterThanOrEqual(5);
    expect(posiciones65.filter((posicion) => posicion.valor > 0).length).toBeGreaterThanOrEqual(5);
  });
});
