import { describe, expect, it } from 'vitest';
import type { ResultadoAfinidad, ResultadoFaceta } from '../src/engine';
import { crearSnapshotResultadoCompartido } from '../web/src/compartirResultados';
import {
  crearFragmentoResultadoCompartido,
  leerResultadoCompartido,
  ordenarPartidosParaVista,
} from '../web/src/resultadoCompartido';

function faceta(
  facetaId: string,
  valor: number | null,
  cobertura: number,
  suficiente: boolean,
): ResultadoFaceta {
  return {
    facetaId,
    valor,
    itemsRespondidos: valor === null ? 0 : 4,
    itemsDisponibles: 8,
    cargaRespondida: 4,
    cargaDisponible: 8,
    numerador: 0,
    denominador: 8,
    cobertura,
    coberturaSuficiente: suficiente,
  };
}

function afinidad(
  entidadId: string,
  puntuacion: number,
  confianza: ResultadoAfinidad['confianza'] = 'verificada',
  itemsComparados = 12,
): ResultadoAfinidad {
  return {
    entidadId,
    estado: itemsComparados > 0 ? 'calculable' : 'sin-datos',
    puntuacion: itemsComparados > 0 ? puntuacion : null,
    itemsComparados,
    itemsRespondidos: 20,
    cobertura: 0.6,
    confianza,
    bajaCobertura: false,
    detalle: [
      {
        itemId: 'eco-001',
        valorUsuario: 2,
        valorEntidad: 1,
        distancia: 1,
        peso: 2,
        justificacion: 'Texto deliberadamente sensible que nunca debe viajar.',
        fuente: { tipo: 'otro', url: 'https://example.test/fuente' },
      },
    ],
  };
}

describe('integración del snapshot compartible', () => {
  it('serializa solo resultados derivados, redondeados y con el vocabulario compacto', () => {
    const resultado = crearSnapshotResultadoCompartido({
      versionInstrumento: '4',
      versionCatalogo: '2026-07-11',
      nivel: 'intermedio',
      eleccion: 'autonomicas',
      ccaa: 'andalucia',
      respuestasAdministradas: 150,
      respuestasConOpinion: 147,
      facetas: [faceta('economico', -27.35, 0.625, true), faceta('territorial', null, 0, false)],
      afinidades: [afinidad('partido-a', 78.84), afinidad('partido-b', 61.16, 'estimada')],
    });

    expect(resultado).toMatchObject({
      s: 1,
      i: '4',
      d: '2026-07-11',
      l: 'i',
      e: 'a',
      c: 'andalucia',
      q: [150, 147],
      f: [
        ['economico', -273, 625, 4, 1],
        ['territorial', null, 0, 0, 0],
      ],
      p: [
        ['partido-a', 788, 600, 12, 0, 'v'],
        ['partido-b', 612, 600, 12, 0, 'e'],
      ],
    });
    const serializado = JSON.stringify(resultado);
    expect(serializado).not.toContain('eco-001');
    expect(serializado).not.toContain('deliberadamente sensible');
    expect(serializado).not.toContain('example.test');
    expect(serializado).not.toContain('respuestas');
    expect(serializado).not.toContain('importantes');
  });

  it('limita a cinco afinidades calculables y nunca convierte sin-datos en un porcentaje', () => {
    const afinidades = [
      ...Array.from({ length: 6 }, (_, indice) => afinidad(`p-${indice + 1}`, 90 - indice)),
      afinidad('sin-comparacion', 100, 'verificada', 0),
      afinidad('sin-datos', 100, 'sin-datos'),
    ];
    const resultado = crearSnapshotResultadoCompartido({
      versionInstrumento: '4',
      versionCatalogo: 'catalogo-1',
      nivel: 'rapido',
      eleccion: 'generales',
      respuestasAdministradas: 10,
      respuestasConOpinion: 20,
      facetas: [],
      afinidades,
    });

    expect(resultado.p.map((partido) => partido[0])).toEqual(['p-1', 'p-2', 'p-3', 'p-4', 'p-5']);
    expect(resultado.q).toEqual([10, 10]);
    expect(resultado).not.toHaveProperty('c');
  });

  it('elige el top cinco por afinidad aunque el consumidor entregue una lista desordenada', () => {
    const resultado = crearSnapshotResultadoCompartido({
      versionInstrumento: '4',
      versionCatalogo: 'catalogo-1',
      nivel: 'exhaustivo',
      eleccion: 'europeas',
      respuestasAdministradas: 50,
      respuestasConOpinion: 50,
      facetas: [],
      afinidades: [afinidad('medio', 60), afinidad('primero', 95), afinidad('ultimo', 20)],
    });

    expect(resultado.p.map((partido) => partido[0])).toEqual(['primero', 'medio', 'ultimo']);
  });

  it('conserva el desempate por cobertura antes y después del enlace', () => {
    const solido = afinidad('solido', 80, 'verificada', 10);
    solido.cobertura = 0.5;
    const debil = afinidad('debil', 80, 'verificada', 20);
    debil.cobertura = 0.8;
    debil.bajaCobertura = true;
    const resultado = crearSnapshotResultadoCompartido({
      versionInstrumento: '4',
      versionCatalogo: 'catalogo-1',
      nivel: 'intermedio',
      eleccion: 'generales',
      respuestasAdministradas: 150,
      respuestasConOpinion: 150,
      facetas: [],
      afinidades: [debil, solido],
    });
    const permitidos = { partidos: new Set(['solido', 'debil']) };
    const lectura = leerResultadoCompartido(
      crearFragmentoResultadoCompartido(resultado, permitidos),
      permitidos,
    );

    expect(resultado.p.map(([id]) => id)).toEqual(['solido', 'debil']);
    expect(lectura.estado).toBe('valido');
    if (lectura.estado === 'valido') {
      expect(lectura.resultado.p.map(([id]) => id)).toEqual(['solido', 'debil']);
    }
  });
});

describe('selección del top compartido con cobertura mixta (caso Madrid del propietario)', () => {
  function afinidadConCobertura(
    entidadId: string,
    puntuacion: number,
    itemsComparados: number,
    bajaCobertura: boolean,
  ): ResultadoAfinidad {
    return {
      ...afinidad(entidadId, puntuacion),
      itemsComparados,
      cobertura: bajaCobertura ? 0.02 : 0.6,
      bajaCobertura,
    };
  }

  it('un 100 % sobre 3 ítems no desplaza del top-5 a resultados cubiertos, y la vista los ordena cubiertos primero', () => {
    const snapshot = crearSnapshotResultadoCompartido({
      versionInstrumento: '4',
      versionCatalogo: '2026-07-12',
      nivel: 'exhaustivo',
      eleccion: 'autonomicas',
      ccaa: 'madrid',
      respuestasAdministradas: 200,
      respuestasConOpinion: 180,
      facetas: [],
      afinidades: [
        afinidadConCobertura('alianza-verde', 100, 3, true),
        afinidadConCobertura('verdes-equo', 79.2, 6, true),
        afinidadConCobertura('pacma', 77.3, 11, true),
        afinidadConCobertura('podemos', 84, 44, false),
        afinidadConCobertura('psoe', 71, 48, false),
        afinidadConCobertura('pp', 42, 46, false),
        afinidadConCobertura('vox', 30, 55, false),
        afinidadConCobertura('mas-madrid', 76, 21, false),
      ],
    });

    const ids = snapshot.p.map((partido) => partido[0]);
    // Los cinco cubiertos ocupan las cinco plazas; ninguno de baja cobertura entra.
    expect(new Set(ids)).toEqual(new Set(['podemos', 'psoe', 'pp', 'vox', 'mas-madrid']));
    // El cable conserva el orden canónico histórico (afinidad primero): los
    // clientes ya desplegados siguen validando el enlace.
    expect(ids[0]).toBe('podemos');
    // La vista ordena cubiertos primero (aquí todos lo son) por afinidad.
    const vista = ordenarPartidosParaVista(snapshot.p);
    expect(vista[0]?.[0]).toBe('podemos');
  });

  it('cuando quedan plazas libres, la baja cobertura entra al final de la vista aunque puntúe 100', () => {
    const snapshot = crearSnapshotResultadoCompartido({
      versionInstrumento: '4',
      versionCatalogo: '2026-07-12',
      nivel: 'exhaustivo',
      eleccion: 'autonomicas',
      ccaa: 'madrid',
      respuestasAdministradas: 200,
      respuestasConOpinion: 180,
      facetas: [],
      afinidades: [
        afinidadConCobertura('alianza-verde', 100, 3, true),
        afinidadConCobertura('podemos', 84, 44, false),
        afinidadConCobertura('psoe', 71, 48, false),
      ],
    });
    const vista = ordenarPartidosParaVista(snapshot.p);
    expect(vista.map((partido) => partido[0])).toEqual(['podemos', 'psoe', 'alianza-verde']);
    // En el cable, el 100 % figura primero (orden canónico estable de siempre).
    expect(snapshot.p[0]?.[0]).toBe('alianza-verde');
  });
});
