import { describe, expect, it } from 'vitest';
import {
  CORRIENTES_ATLAS,
  corrientesAtlasVisibles,
  corrienteAtlasMasCercana,
  gradoEvidenciaBrujula,
} from '../web/src/atlasIdeologias.js';
import {
  ENTIDADES_MAPA,
  EJE_ECONOMIA_BRUJULA,
  EJE_PODER_BRUJULA,
} from '../web/src/mapaEspacial.js';

describe('capas del atlas ideologico', () => {
  it('expone siempre A y reserva B para la profundidad', () => {
    const principales = corrientesAtlasVisibles(false);
    const profundas = corrientesAtlasVisibles(true);

    expect(principales.length).toBeGreaterThan(0);
    expect(principales.every((corriente) => corriente.decision === 'A')).toBe(true);
    expect(profundas.some((corriente) => corriente.decision === 'B')).toBe(true);
    expect(profundas.every((corriente) => corriente.decision !== 'E')).toBe(true);
    expect(profundas).toHaveLength(
      CORRIENTES_ATLAS.filter((corriente) => corriente.decision !== 'E').length,
    );
  });

  it('la corriente cercana solo puede salir de la capa visible', () => {
    const posadismo = CORRIENTES_ATLAS.find((corriente) => corriente.id === 'posadismo');
    expect(posadismo?.decision).toBe('B');

    const principal = corrienteAtlasMasCercana(
      posadismo!.coordenadas.x,
      posadismo!.coordenadas.y,
      corrientesAtlasVisibles(false),
    );
    const profunda = corrienteAtlasMasCercana(
      posadismo!.coordenadas.x,
      posadismo!.coordenadas.y,
      corrientesAtlasVisibles(true),
    );

    expect(principal?.decision).toBe('A');
    expect(profunda?.id).toBe('posadismo');
  });

  it('separa coordenadas sólidas, provisionales e insuficientes sin rellenar huecos', () => {
    expect(
      gradoEvidenciaBrujula(
        { items: 6, familias: 3, itemsNucleo: 0, suficiente: true },
        { items: 6, familias: 3, itemsNucleo: 2, suficiente: true },
      ),
    ).toBe('solida');
    expect(
      gradoEvidenciaBrujula(
        { items: 3, familias: 2, itemsNucleo: 0, suficiente: false },
        { items: 3, familias: 2, itemsNucleo: 1, suficiente: false },
      ),
    ).toBe('provisional');
    expect(
      gradoEvidenciaBrujula(
        { items: 3, familias: 2, itemsNucleo: 0, suficiente: false },
        { items: 3, familias: 2, itemsNucleo: 0, suficiente: false },
      ),
    ).toBe('insuficiente');
  });

  it('publica los cuatro partidos estatales principales y nunca marca referencias como provisionales', () => {
    const partidosBrujula = ENTIDADES_MAPA.filter(
      (entidad) =>
        entidad.tipo === 'partido' &&
        typeof entidad.valores[EJE_ECONOMIA_BRUJULA.id] === 'number' &&
        typeof entidad.valores[EJE_PODER_BRUJULA.id] === 'number',
    );
    const ids = new Set(partidosBrujula.map((partido) => partido.id));

    for (const id of ['psoe', 'pp', 'vox', 'movimiento-sumar']) {
      expect(ids.has(id), `${id} debe tener coordenada sólida o provisional`).toBe(true);
    }
    expect(partidosBrujula.some((partido) => partido.evidenciaBrujula?.grado === 'provisional')).toBe(
      true,
    );
    expect(
      ENTIDADES_MAPA.some(
        (entidad) =>
          entidad.tipo === 'referencia' && entidad.evidenciaBrujula?.grado === 'provisional',
      ),
    ).toBe(false);
  });
});
