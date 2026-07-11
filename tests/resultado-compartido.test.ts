import { describe, expect, it } from 'vitest';
import {
  crearFragmentoResultadoCompartido,
  leerResultadoCompartido,
  OBJETIVO_ENLACE_RESULTADO,
  type ResultadoCompartidoV1,
} from '../web/src/resultadoCompartido';

const ejes = new Set(Array.from({ length: 29 }, (_, indice) => `eje-${indice + 1}`));
const partidos = new Set(['psoe', 'pp', 'vox', 'movimiento-sumar', 'podemos']);
const comunidades = new Set(['andalucia']);
const permitidos = { ejes, partidos, comunidades };

function muestra(): ResultadoCompartidoV1 {
  return {
    s: 1,
    i: '4',
    d: '2026-07-11.1',
    l: 'e',
    e: 'g',
    c: 'andalucia',
    q: [150, 142],
    f: Array.from({ length: 29 }, (_, indice) => [
      `eje-${indice + 1}`,
      indice % 7 === 0 ? null : -900 + indice * 60,
      Math.min(1_000, 300 + indice * 20),
      Math.min(30, indice + 1),
      indice > 8 ? 1 : 0,
    ]) as ResultadoCompartidoV1['f'],
    p: [
      ['psoe', 713, 520, 44, 0, 'v'],
      ['movimiento-sumar', 688, 430, 38, 1, 'v'],
      ['podemos', 688, 390, 33, 1, 'v'],
      ['pp', 621, 560, 48, 0, 'v'],
      ['vox', 594, 510, 46, 0, 'v'],
    ],
  };
}

/** Evita el serializador canónico para probar cargas recibidas y manipuladas. */
function fragmentoCrudo(valor: unknown): string {
  return `#r=1.${Buffer.from(JSON.stringify(valor), 'utf8').toString('base64url')}`;
}

function aleatorioDeterminista(semilla: number): () => number {
  let estado = semilla >>> 0;
  return () => {
    estado ^= estado << 13;
    estado ^= estado >>> 17;
    estado ^= estado << 5;
    return (estado >>> 0) / 0x1_0000_0000;
  };
}

function valorHostil(azar: () => number, profundidad = 0): unknown {
  const escalares: unknown[] = [
    null,
    true,
    false,
    -1,
    0,
    1,
    1_001,
    Number.MAX_SAFE_INTEGER,
    '',
    '💥'.repeat(1 + Math.floor(azar() * 8)),
    '__proto__',
  ];
  if (profundidad >= 3 || azar() < 0.55) {
    return escalares[Math.floor(azar() * escalares.length)];
  }
  if (azar() < 0.5) {
    return Array.from(
      { length: Math.floor(azar() * 8) },
      () => valorHostil(azar, profundidad + 1),
    );
  }
  return Object.fromEntries(
    Array.from({ length: Math.floor(azar() * 8) }, (_, indice) => [
      `k-${indice}-${Math.floor(azar() * 10_000)}`,
      valorHostil(azar, profundidad + 1),
    ]),
  );
}

describe('resultado compartido', () => {
  it('hace round-trip canónico, determinista y dentro del presupuesto', () => {
    const resultado = muestra();
    resultado.f.reverse();
    const primero = crearFragmentoResultadoCompartido(resultado, permitidos);
    const segundo = crearFragmentoResultadoCompartido(muestra(), permitidos);
    expect(primero).toBe(segundo);
    expect(primero.length).toBeLessThanOrEqual(OBJETIVO_ENLACE_RESULTADO);
    const lectura = leerResultadoCompartido(primero, permitidos);
    expect(lectura.estado).toBe('valido');
    if (lectura.estado === 'valido') {
      expect(lectura.resultado.f[0]?.[0]).toBe('eje-1');
      expect(lectura.resultado.p.map((partido) => partido[0])).toEqual([
        'psoe',
        'movimiento-sumar',
        'podemos',
        'pp',
        'vox',
      ]);
    }
  });

  it('no serializa respuestas, prioridades, ítems ni textos libres', () => {
    const fragmento = crearFragmentoResultadoCompartido(muestra(), permitidos);
    expect(fragmento).not.toContain('respuestas');
    expect(fragmento).not.toContain('importantes');
    expect(fragmento).not.toContain('eco-001');
    expect(fragmento).not.toContain('justificacion');
    expect(fragmento).not.toContain('http');
  });

  it.each([
    '',
    '#r=',
    '#r=2.abc',
    '#r=1.***',
    `#r=1.${'a'.repeat(4_097)}`,
    '#otra-cosa',
  ])('falla de forma segura ante %s', (hash) => {
    expect(() => leerResultadoCompartido(hash, permitidos)).not.toThrow();
    expect(leerResultadoCompartido(hash, permitidos).estado).not.toBe('valido');
  });

  it('rechaza ids desconocidos y un ranking manipulado fuera de orden', () => {
    const desconocido = muestra();
    desconocido.f[0]![0] = 'eje-inventado';
    expect(() => crearFragmentoResultadoCompartido(desconocido, permitidos)).toThrow();

    const fueraDeOrden = muestra();
    fueraDeOrden.p = [
      ['pp', 400, 500, 20, 0, 'v'],
      ['psoe', 900, 500, 20, 0, 'v'],
    ];
    // La canonicalización corrige el orden antes de serializar.
    const lectura = leerResultadoCompartido(
      crearFragmentoResultadoCompartido(fueraDeOrden, permitidos),
      permitidos,
    );
    expect(lectura.estado).toBe('valido');
    if (lectura.estado === 'valido') expect(lectura.resultado.p[0]?.[0]).toBe('psoe');
  });

  it('valida en la carga el comparador completo de los cinco puestos', () => {
    const rankingsInvertidos: ResultadoCompartidoV1['p'][] = [
      // Afinidad.
      [
        ['pp', 700, 500, 20, 0, 'v'],
        ['psoe', 800, 500, 20, 0, 'v'],
      ],
      // A igual afinidad, una estimación débil nunca precede a una sólida.
      [
        ['psoe', 800, 900, 30, 1, 'v'],
        ['pp', 800, 300, 10, 0, 'v'],
      ],
      // A igual solidez, manda la mayor base comparada.
      [
        ['pp', 800, 900, 20, 0, 'v'],
        ['psoe', 800, 300, 21, 0, 'v'],
      ],
      // Después, mayor cobertura.
      [
        ['pp', 800, 400, 20, 0, 'v'],
        ['psoe', 800, 500, 20, 0, 'v'],
      ],
      // Finalmente, id canónico para que el enlace sea determinista.
      [
        ['psoe', 800, 500, 20, 0, 'v'],
        ['pp', 800, 500, 20, 0, 'v'],
      ],
    ];

    for (const partidosInvertidos of rankingsInvertidos) {
      const manipulado = muestra();
      manipulado.p = partidosInvertidos;
      expect(leerResultadoCompartido(fragmentoCrudo(manipulado), permitidos)).toEqual({
        estado: 'invalido',
      });
    }

    const ordenado = muestra();
    ordenado.p = [
      ['psoe', 800, 500, 30, 0, 'v'],
      ['pp', 800, 500, 20, 0, 'v'],
      ['movimiento-sumar', 800, 400, 20, 0, 'e'],
      ['podemos', 800, 900, 40, 1, 'v'],
      ['vox', 700, 900, 40, 0, 'v'],
    ];
    expect(leerResultadoCompartido(fragmentoCrudo(ordenado), permitidos).estado).toBe('valido');
  });

  it('somete el parser a fuzz generativo determinista sin lanzar excepciones', () => {
    const azar = aleatorioDeterminista(0x5eec_7a0);
    let invalidos = 0;

    for (let indice = 0; indice < 512; indice += 1) {
      const mutado = structuredClone(muestra()) as unknown as Record<string, unknown>;
      const claves = ['s', 'i', 'd', 'l', 'e', 'c', 'q', 'f', 'p'] as const;
      mutado[claves[Math.floor(azar() * claves.length)]!] = valorHostil(azar);
      if (azar() < 0.25) mutado[`extra-${indice}`] = valorHostil(azar);
      const lectura = leerResultadoCompartido(fragmentoCrudo(mutado), permitidos);
      expect(['valido', 'invalido']).toContain(lectura.estado);
      if (lectura.estado === 'invalido') invalidos += 1;
    }

    const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-.$%💥';
    for (let indice = 0; indice < 512; indice += 1) {
      const longitud = 1 + Math.floor(azar() * 600);
      let carga = '';
      for (let posicion = 0; posicion < longitud; posicion += 1) {
        carga += alfabeto[Math.floor(azar() * alfabeto.length)];
      }
      expect(() => leerResultadoCompartido(`#r=1.${carga}`, permitidos)).not.toThrow();
      if (leerResultadoCompartido(`#r=1.${carga}`, permitidos).estado === 'invalido') {
        invalidos += 1;
      }
    }

    // Evita que una futura relajación convierta el fuzz en una prueba vacía.
    expect(invalidos).toBeGreaterThan(1_000);
  });

  it('rechaza duplicados, rangos imposibles y propiedades adicionales', () => {
    const duplicada = muestra();
    duplicada.f[1] = [...duplicada.f[0]!];
    expect(() => crearFragmentoResultadoCompartido(duplicada, permitidos)).toThrow();

    const imposible = muestra();
    imposible.p[0]![1] = 1_001;
    expect(() => crearFragmentoResultadoCompartido(imposible, permitidos)).toThrow();

    const adicional = { ...muestra(), respuestas: { 'eco-001': 2 } };
    expect(() =>
      crearFragmentoResultadoCompartido(adicional as ResultadoCompartidoV1, permitidos),
    ).toThrow();
  });
});
