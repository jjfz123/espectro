import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  calcularAfinidad,
  rankingAfinidad,
  calcularEjes,
  modulosDesbloqueados,
} from '../src/engine/index.js';
import type { Eje, Item, Modulo, Partido, Respuesta } from '../src/engine/index.js';

const raiz = fileURLToPath(new URL('..', import.meta.url));
const leer = <T>(ruta: string): T =>
  JSON.parse(readFileSync(join(raiz, ruta), 'utf8')) as T;

const ejes = leer<Eje[]>('data/ejes.json');
const modulos = leer<Modulo[]>('data/modulos.json');
const itemsNucleo = leer<Item[]>('data/items/nucleo.json');
const itemsIzquierda = leer<Item[]>('data/items/corrientes-izquierda.json');
const vanguardia = leer<Partido>('data/partidos/demo-vanguardia.json');
const consejista = leer<Partido>('data/partidos/demo-consejista.json');

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

describe('calcularAfinidad (Manhattan normalizada)', () => {
  it('coincidencia perfecta = 100', () => {
    const r: Respuesta[] = [
      { itemId: 'a', valor: 2 },
      { itemId: 'b', valor: -1 },
    ];
    const res = calcularAfinidad(r, partido('p', { a: 2, b: -1 }), laxo);
    expect(res.puntuacion).toBe(100);
  });

  it('oposición total = 0', () => {
    const r: Respuesta[] = [
      { itemId: 'a', valor: 2 },
      { itemId: 'b', valor: -2 },
    ];
    const res = calcularAfinidad(r, partido('p', { a: -2, b: 2 }), laxo);
    expect(res.puntuacion).toBe(0);
  });

  it('«sin opinión» (null) se excluye del cálculo', () => {
    const con: Respuesta[] = [
      { itemId: 'a', valor: 2 },
      { itemId: 'b', valor: null },
    ];
    const sin: Respuesta[] = [{ itemId: 'a', valor: 2 }];
    const p = partido('p', { a: 2, b: -2 });
    expect(calcularAfinidad(con, p, laxo).puntuacion).toBe(
      calcularAfinidad(sin, p, laxo).puntuacion,
    );
    expect(calcularAfinidad(con, p, laxo).itemsComparados).toBe(1);
  });

  it('un ítem importante pesa el doble', () => {
    // a: dist 0 peso 2; b: dist 4 peso 1 → 100·(1 − 4/12) = 66.7
    const r: Respuesta[] = [
      { itemId: 'a', valor: 2, importante: true },
      { itemId: 'b', valor: 2 },
    ];
    const res = calcularAfinidad(r, partido('p', { a: 2, b: -2 }), laxo);
    expect(res.puntuacion).toBe(66.7);
  });

  it('marca bajaCobertura cuando el partido cubre pocos ítems respondidos', () => {
    const r: Respuesta[] = [
      { itemId: 'a', valor: 1 },
      { itemId: 'b', valor: 1 },
      { itemId: 'c', valor: 1 },
    ];
    const res = calcularAfinidad(r, partido('p', { a: 1 }), {
      minimoItems: 1,
      umbralCobertura: 0.5,
    });
    expect(res.cobertura).toBeCloseTo(1 / 3, 3);
    expect(res.bajaCobertura).toBe(true);
  });

  it('adjunta la evidencia (justificación y fuente) al detalle por ítem', () => {
    const r: Respuesta[] = [{ itemId: 'eco-001', valor: 2 }];
    const res = calcularAfinidad(r, vanguardia, laxo);
    expect(res.detalle[0]?.justificacion).toContain('DEMO');
  });
});

describe('calcularEjes', () => {
  it('acuerdo máximo con carga -1 → −100 en el eje', () => {
    const r: Respuesta[] = [{ itemId: 'eco-001', valor: 2 }]; // subir impuestos, carga economico −1
    const res = calcularEjes(r, itemsNucleo, ejes);
    expect(res['economico']).toBe(-100);
  });

  it('ejes sin ítems respondidos devuelven null, y los solo-matching no puntúan', () => {
    const r: Respuesta[] = [{ itemId: 'izq-004', valor: 2 }]; // ítem con ejes: []
    const res = calcularEjes(r, itemsIzquierda, ejes);
    expect(res['economico']).toBeNull();
    expect(res['organizacion']).toBeNull();
  });
});

describe('modulosDesbloqueados', () => {
  it('núcleo siempre; corrientes-izquierda con economico ≤ −40; territorial por CCAA', () => {
    const activos = modulosDesbloqueados(
      modulos,
      { economico: -75 },
      { ccaa: 'canarias' },
    );
    expect(activos).toContain('nucleo');
    expect(activos).toContain('corrientes-izquierda');
    expect(activos).toContain('territorial-canarias');
    expect(activos).not.toContain('corrientes-derecha');
  });

  it('sin puntuación de eje no desbloquea módulos condicionados', () => {
    const activos = modulosDesbloqueados(modulos, { economico: null }, {});
    expect(activos).toEqual(['nucleo']);
  });

  it('eje-banda desbloquea dentro de la franja y no fuera', () => {
    const banda: Modulo[] = [
      {
        id: 'sd',
        nombre: 'sd',
        desbloqueo: { tipo: 'eje-banda', eje: 'economico', min: -60, max: 5 },
      },
    ];
    expect(modulosDesbloqueados(banda, { economico: -30 }, {})).toContain('sd');
    expect(modulosDesbloqueados(banda, { economico: -60 }, {})).toContain('sd');
    expect(modulosDesbloqueados(banda, { economico: 5 }, {})).toContain('sd');
    expect(modulosDesbloqueados(banda, { economico: -75 }, {})).toEqual([]);
    expect(modulosDesbloqueados(banda, { economico: 20 }, {})).toEqual([]);
    expect(modulosDesbloqueados(banda, { economico: null }, {})).toEqual([]);
  });

  it('un módulo territorial puede cubrir varias CCAA', () => {
    const multi: Modulo[] = [
      {
        id: 'eus-nav',
        nombre: 'eus-nav',
        desbloqueo: { tipo: 'ccaa', ccaa: ['euskadi', 'navarra'] },
      },
    ];
    expect(modulosDesbloqueados(multi, {}, { ccaa: 'navarra' })).toContain('eus-nav');
    expect(modulosDesbloqueados(multi, {}, { ccaa: 'euskadi' })).toContain('eus-nav');
    expect(modulosDesbloqueados(multi, {}, { ccaa: 'madrid' })).toEqual([]);
    expect(modulosDesbloqueados(multi, {}, {})).toEqual([]);
  });
});

describe('tesis del proyecto: el módulo separa lo que el núcleo no puede', () => {
  // Usuario de izquierda consejista: contesta el núcleo igual que ambos demos
  // comparten, y el módulo con perfil horizontalista.
  const nucleo: Respuesta[] = [
    { itemId: 'eco-001', valor: 2 },
    { itemId: 'eco-002', valor: -2 },
    { itemId: 'eco-003', valor: 2 },
    { itemId: 'eco-004', valor: -2 },
  ];
  const modulo: Respuesta[] = [
    { itemId: 'izq-001', valor: 2 },
    { itemId: 'izq-002', valor: -2 },
    { itemId: 'izq-003', valor: 2 },
    { itemId: 'izq-004', valor: -2 },
    { itemId: 'izq-006', valor: -2 },
    { itemId: 'izq-007', valor: 2 },
    { itemId: 'izq-008', valor: 2 },
  ];

  it('solo con el núcleo económico, vanguardistas y consejistas empatan', () => {
    const a = calcularAfinidad(nucleo, vanguardia, laxo);
    const b = calcularAfinidad(nucleo, consejista, laxo);
    expect(a.puntuacion).toBe(b.puntuacion);
  });

  it('con el módulo de corrientes, el ranking se separa con claridad', () => {
    const ranking = rankingAfinidad([...nucleo, ...modulo], [vanguardia, consejista], laxo);
    expect(ranking[0]?.partidoId).toBe('demo-consejista');
    expect((ranking[0]?.puntuacion ?? 0) - (ranking[1]?.puntuacion ?? 0)).toBeGreaterThan(15);
  });
});
