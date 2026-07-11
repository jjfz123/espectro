import { describe, it, expect } from 'vitest';
import {
  calcularAfinidad,
  rankingAfinidad,
  itemVisible,
  partidosElegibles,
} from '../src/engine/index.js';
import type { Item, Partido, Respuesta } from '../src/engine/index.js';

const laxo = { minimoItems: 1, umbralCobertura: 0 };

function partido(id: string, posiciones: Record<string, -2 | -1 | 0 | 1 | 2>): Partido {
  const p: Partido = {
    id,
    nombre: id,
    ambito: 'estatal',
    confianza: 'verificada',
    posiciones: {},
  };
  for (const [k, v] of Object.entries(posiciones)) p.posiciones[k] = { valor: v };
  return p;
}

describe('calcularAfinidad: casos límite', () => {
  it('sin respuestas: estado sin-datos, cobertura 0 y bajaCobertura', () => {
    const res = calcularAfinidad([], partido('p', { a: 1 }));
    expect(res.estado).toBe('sin-datos');
    expect(res.puntuacion).toBeNull();
    expect(res.itemsComparados).toBe(0);
    expect(res.cobertura).toBe(0);
    expect(res.bajaCobertura).toBe(true);
  });

  it('todo «sin opinión»: equivale a no haber respondido', () => {
    const r: Respuesta[] = [
      { itemId: 'a', valor: null },
      { itemId: 'b', valor: null },
    ];
    const res = calcularAfinidad(r, partido('p', { a: 2, b: -2 }), laxo);
    expect(res.estado).toBe('sin-datos');
    expect(res.puntuacion).toBeNull();
    expect(res.itemsRespondidos).toBe(0);
  });

  it('un 0 % real (desacuerdo máximo) sigue siendo calculable: nunca se confunde con sin-datos', () => {
    const res = calcularAfinidad(
      [{ itemId: 'a', valor: 2 }],
      partido('p', { a: -2 }),
      laxo,
    );
    expect(res.estado).toBe('calculable');
    expect(res.puntuacion).toBe(0);
    expect(res.itemsComparados).toBe(1);
  });

  it('los sin-datos cierran el ranking y no compiten numéricamente con un 0 % real', () => {
    const respuestas: Respuesta[] = [{ itemId: 'a', valor: 2 }];
    const orden = rankingAfinidad(
      respuestas,
      [partido('vacio', { b: 1 }), partido('cero-real', { a: -2 })],
      laxo,
    );
    expect(orden.map((r) => r.entidadId)).toEqual(['cero-real', 'vacio']);
    expect(orden[0]).toMatchObject({ estado: 'calculable', puntuacion: 0 });
    expect(orden[1]).toMatchObject({ estado: 'sin-datos', puntuacion: null });
  });

  it('una respuesta duplicada no cuenta dos veces: prevalece la última', () => {
    const duplicada: Respuesta[] = [
      { itemId: 'a', valor: -2 },
      { itemId: 'b', valor: 2 },
      { itemId: 'a', valor: 2 }, // corrección posterior del usuario
    ];
    // La deduplicación conserva la posición de la primera aparición y el valor
    // de la última: el equivalente limpio mantiene el orden a, b.
    const limpia: Respuesta[] = [
      { itemId: 'a', valor: 2 },
      { itemId: 'b', valor: 2 },
    ];
    const p = partido('p', { a: 2, b: 2 });
    expect(calcularAfinidad(duplicada, p, laxo)).toEqual(calcularAfinidad(limpia, p, laxo));
    expect(calcularAfinidad(duplicada, p, laxo).itemsRespondidos).toBe(2);
  });

  it('respuestas sobre ítems que el partido no posiciona reducen cobertura sin castigar puntuación', () => {
    const r: Respuesta[] = [
      { itemId: 'a', valor: 2 },
      { itemId: 'zz-desconocido', valor: -2 },
    ];
    const res = calcularAfinidad(r, partido('p', { a: 2 }), laxo);
    expect(res.puntuacion).toBe(100);
    expect(res.cobertura).toBe(0.5);
  });

  it('todos los ítems marcados importantes no altera una coincidencia perfecta ni una oposición total', () => {
    const todosImportantes: Respuesta[] = [
      { itemId: 'a', valor: 2, importante: true },
      { itemId: 'b', valor: -2, importante: true },
    ];
    expect(calcularAfinidad(todosImportantes, partido('p', { a: 2, b: -2 }), laxo).puntuacion).toBe(100);
    expect(calcularAfinidad(todosImportantes, partido('q', { a: -2, b: 2 }), laxo).puntuacion).toBe(0);
  });
});

describe('rankingAfinidad: orden y suficiencia de datos', () => {
  it('ordena por el porcentaje visible aunque una coincidencia tenga baja cobertura', () => {
    const r: Respuesta[] = [
      { itemId: 'a', valor: 2 },
      { itemId: 'b', valor: 2 },
      { itemId: 'c', valor: 2 },
      { itemId: 'd', valor: 2 },
    ];
    const cubierto = partido('cubierto', { a: 1, b: 1, c: 1, d: 1 }); // 75 %, cobertura 1
    const perfectoPeroVacio = partido('vacio', { a: 2 }); // 100 %, cobertura 0.25
    const ranking = rankingAfinidad(r, [perfectoPeroVacio, cubierto], {
      minimoItems: 2,
      umbralCobertura: 0.5,
    });
    expect(ranking.map((resultado) => resultado.entidadId)).toEqual(['vacio', 'cubierto']);
    expect(ranking[0]?.puntuacion).toBe(100);
    expect(ranking[0]?.bajaCobertura).toBe(true);
    expect(ranking[1]?.puntuacion).toBe(75);
  });

  it('desempata por solidez, número de comparaciones y un id estable', () => {
    const r: Respuesta[] = [
      { itemId: 'a', valor: 2 },
      { itemId: 'b', valor: 2 },
      { itemId: 'c', valor: 2 },
      { itemId: 'd', valor: 2 },
    ];
    const baja = partido('z-baja', { a: 1 });
    const dos = partido('b-dos', { a: 1, b: 1 });
    const cuatroZ = partido('z-cuatro', { a: 1, b: 1, c: 1, d: 1 });
    const cuatroA = partido('a-cuatro', { a: 1, b: 1, c: 1, d: 1 });
    const ranking = rankingAfinidad(r, [baja, cuatroZ, dos, cuatroA], {
      minimoItems: 2,
      umbralCobertura: 0.5,
    });
    expect(ranking.map((resultado) => resultado.entidadId)).toEqual([
      'a-cuatro',
      'z-cuatro',
      'b-dos',
      'z-baja',
    ]);
  });

  it('los sin-datos no entran en el ranking', () => {
    const sinDatos: Partido = {
      id: 'x',
      nombre: 'x',
      ambito: 'estatal',
      confianza: 'sin-datos',
      posiciones: {},
    };
    expect(rankingAfinidad([{ itemId: 'a', valor: 1 }], [sinDatos], laxo)).toEqual([]);
  });

  it('un perfil monotemático nunca genera un porcentaje de afinidad general', () => {
    const monotematico: Partido = {
      id: 'mono',
      nombre: 'Un solo punto',
      ambito: 'estatal',
      confianza: 'verificada',
      monotematico: true,
      posiciones: { unico: { valor: 2 } },
    };
    expect(rankingAfinidad([{ itemId: 'unico', valor: 2 }], [monotematico])).toEqual([]);
  });
});

describe('itemVisible: condicionales', () => {
  const hija: Item = {
    id: 'hija',
    texto: 'Subpregunta condicionada a la respuesta del padre.',
    modulo: 'nucleo',
    ejes: [],
    condicion: { itemId: 'padre', valores: [1, 2] },
  };

  it('sin respuesta del padre, la hija no aparece', () => {
    expect(itemVisible(hija, {})).toBe(false);
    expect(itemVisible(hija, { padre: undefined })).toBe(false);
  });

  it('«sin opinión» en el padre nunca activa la rama', () => {
    expect(itemVisible(hija, { padre: null })).toBe(false);
  });

  it('solo activan los valores incluidos en la regla', () => {
    expect(itemVisible(hija, { padre: 2 })).toBe(true);
    expect(itemVisible(hija, { padre: 0 })).toBe(false);
    expect(itemVisible(hija, { padre: -2 })).toBe(false);
  });
});

describe('partidosElegibles: casos límite', () => {
  const base = { confianza: 'estimada' as const, posiciones: {} };
  const regionalSinCcaa: Partido = { id: 'r', nombre: 'r', ambito: 'autonomico', ...base };

  it('un partido autonómico sin campo ccaa no aparece al filtrar por comunidad', () => {
    const ids = partidosElegibles([regionalSinCcaa], { tipo: 'autonomicas', ccaa: 'madrid' });
    expect(ids).toEqual([]);
  });

  it('una CCAA desconocida no revienta: simplemente no casa con ningún regional', () => {
    const canario: Partido = { id: 'c', nombre: 'c', ambito: 'autonomico', ccaa: ['canarias'], ...base };
    expect(partidosElegibles([canario], { tipo: 'generales', ccaa: 'atlantida' })).toEqual([]);
  });
});
