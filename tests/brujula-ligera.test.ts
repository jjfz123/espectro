import { describe, expect, it } from 'vitest';
import {
  EJE_ECONOMIA_BRUJULA,
  EJE_PODER_BRUJULA,
  ENTIDADES_MAPA_PARTIDOS,
  EXCLUIDAS_MAPA_PARTIDOS,
  TOTAL_PARTIDOS_CATALOGO,
  seleccionarPuntosBrujula,
} from '../web/src/mapaEspacialLigero.js';
import type { EntidadExcluida, EntidadMapa } from '../web/src/mapaEspacialLigero.js';
import { ENTIDADES_MAPA, EXCLUIDAS_MAPA } from '../web/src/mapaEspacial.js';
import type { ResultadoFaceta } from '../src/engine/index.js';

function faceta(
  facetaId: string,
  valor: number | null,
  coberturaSuficiente: boolean,
): ResultadoFaceta {
  return {
    facetaId,
    valor,
    itemsRespondidos: 4,
    itemsDisponibles: 10,
    gruposDocumentales: 4,
    cargaRespondida: 4,
    cargaDisponible: 10,
    numerador: 0,
    denominador: 8,
    cobertura: 0.4,
    coberturaSuficiente,
  };
}

const EVIDENCIA_OK = { items: 6, familias: 3, itemsNucleo: 2, suficiente: true };

function entidad(parcial: Partial<EntidadMapa> & { id: string }): EntidadMapa {
  return {
    nombre: parcial.id,
    etiqueta: parcial.id.toUpperCase(),
    tipo: 'partido',
    valores: {},
    ejesSuficientes: [],
    facetas: [],
    ...parcial,
  };
}

describe('selector de puntos publicables de la brújula ligera', () => {
  it('clasifica sólida como punto lleno y provisional como publicable declarado', () => {
    const solida = entidad({
      id: 'solida',
      valores: { [EJE_ECONOMIA_BRUJULA.id]: -40, [EJE_PODER_BRUJULA.id]: 10 },
      evidenciaBrujula: { grado: 'solida', propiedad: EVIDENCIA_OK, poder: EVIDENCIA_OK },
    });
    const provisional = entidad({
      id: 'provisional',
      valores: { [EJE_ECONOMIA_BRUJULA.id]: 55, [EJE_PODER_BRUJULA.id]: -20 },
      evidenciaBrujula: {
        grado: 'provisional',
        propiedad: { items: 3, familias: 2, itemsNucleo: 0, suficiente: false },
        poder: { items: 3, familias: 2, itemsNucleo: 1, suficiente: false },
      },
    });

    const seleccion = seleccionarPuntosBrujula([solida, provisional]);

    expect(seleccion.publicables.map((punto) => [punto.id, punto.grado])).toEqual([
      ['solida', 'solida'],
      ['provisional', 'provisional'],
    ]);
    expect(seleccion.publicables[0]).toMatchObject({ x: -40, y: 10 });
    expect(seleccion.publicables[1]).toMatchObject({ x: 55, y: -20 });
    expect(seleccion.excluidas).toEqual([]);
  });

  it('excluye con motivo a quien no tiene el par publicable, sin inventar posiciones', () => {
    const sinBrujula = entidad({
      id: 'solo-macro',
      // Dibujable en Economía × Sociedad, pero insuficiente en la brújula.
      valores: { economico: -30, social: 20 },
      facetas: [
        faceta(EJE_ECONOMIA_BRUJULA.id, -10, false),
        faceta(EJE_PODER_BRUJULA.id, null, false),
      ],
    });
    const excluidaDelEspacio: EntidadExcluida = {
      id: 'fuera-total',
      nombre: 'fuera-total',
      tipo: 'partido',
      motivos: ['Economía: 1 grupos documentales independientes (cobertura de carga 4 %)'],
    };

    const seleccion = seleccionarPuntosBrujula([sinBrujula], [excluidaDelEspacio]);

    expect(seleccion.publicables).toEqual([]);
    expect(seleccion.excluidas.map((excluida) => excluida.id)).toEqual([
      'solo-macro',
      'fuera-total',
    ]);
    for (const excluida of seleccion.excluidas) {
      expect(excluida.motivos.length).toBeGreaterThan(0);
      expect(excluida.motivos.join(' ')).not.toBe('');
    }
  });

  it('ignora referencias doctrinales y coordenadas huérfanas de evidencia', () => {
    const referencia = entidad({
      id: 'referencia',
      tipo: 'referencia',
      valores: { [EJE_ECONOMIA_BRUJULA.id]: 0, [EJE_PODER_BRUJULA.id]: 0 },
      evidenciaBrujula: { grado: 'solida', propiedad: EVIDENCIA_OK, poder: EVIDENCIA_OK },
    });
    // Estado imposible por contrato (valores sin evidenciaBrujula): si un
    // refactor lo produjera, debe caer en excluidas, nunca dibujarse.
    const huerfana = entidad({
      id: 'huerfana',
      valores: { [EJE_ECONOMIA_BRUJULA.id]: 10, [EJE_PODER_BRUJULA.id]: 10 },
    });

    const seleccion = seleccionarPuntosBrujula([referencia, huerfana]);

    expect(seleccion.publicables).toEqual([]);
    expect(seleccion.excluidas.map((excluida) => excluida.id)).toEqual(['huerfana']);
  });

  it('con el catálogo real: todo partido queda dibujado o declarado, sin dobles', () => {
    const seleccion = seleccionarPuntosBrujula(
      ENTIDADES_MAPA_PARTIDOS,
      EXCLUIDAS_MAPA_PARTIDOS,
    );
    const ids = [
      ...seleccion.publicables.map((punto) => punto.id),
      ...seleccion.excluidas.map((excluida) => excluida.id),
    ];

    expect(ids).toHaveLength(TOTAL_PARTIDOS_CATALOGO);
    expect(new Set(ids).size).toBe(TOTAL_PARTIDOS_CATALOGO);
    expect(seleccion.publicables.length).toBeGreaterThan(0);
    for (const punto of seleccion.publicables) {
      expect(punto.x).toBeGreaterThanOrEqual(-100);
      expect(punto.x).toBeLessThanOrEqual(100);
      expect(punto.y).toBeGreaterThanOrEqual(-100);
      expect(punto.y).toBeLessThanOrEqual(100);
      expect(['solida', 'provisional']).toContain(punto.grado);
    }
  });

  it('el módulo ligero y el atlas comparten exactamente la misma clasificación de partidos', () => {
    // Una sola fuente de verdad: el atlas reexpone las MISMAS instancias.
    expect(
      ENTIDADES_MAPA.filter((entidadAtlas) => entidadAtlas.tipo === 'partido'),
    ).toEqual(ENTIDADES_MAPA_PARTIDOS);
    expect(
      EXCLUIDAS_MAPA.filter((excluida) => excluida.tipo === 'partido'),
    ).toEqual(EXCLUIDAS_MAPA_PARTIDOS);
    const idsAtlas = new Set(ENTIDADES_MAPA.map((entidadAtlas) => entidadAtlas.id));
    for (const entidadLigera of ENTIDADES_MAPA_PARTIDOS) {
      expect(idsAtlas.has(entidadLigera.id)).toBe(true);
    }
  });
});
