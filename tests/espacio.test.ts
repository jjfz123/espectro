import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  calcularFacetas,
  distanciaEspacial,
  proyectarEnEspacio,
  respuestasDePosiciones,
  EJES_ESPACIO,
  EJE_AUTORIDAD_POLITICA,
  EJE_PROPIEDAD_MERCADO,
} from '../src/engine/index.js';
import type {
  Eje,
  Item,
  PerfilAfinidad,
  ReferenciaDoctrinal,
  Valor,
} from '../src/engine/index.js';

const RAIZ = fileURLToPath(new URL('..', import.meta.url));

function leer<T>(ruta: string): T {
  return JSON.parse(readFileSync(join(RAIZ, ruta), 'utf8')) as T;
}

const EJES: Eje[] = [
  { id: 'economico', nombre: 'Económico', poloNegativo: 'Izquierda', poloPositivo: 'Derecha' },
  { id: 'social', nombre: 'GAL-TAN', poloNegativo: 'GAL', poloPositivo: 'TAN' },
  { id: 'territorial', nombre: 'Territorial', poloNegativo: 'Periferia', poloPositivo: 'Centro' },
];

/** Banco sintético: 4 ítems por eje, carga 1 (2 de ellos invertidos). */
const ITEMS: Item[] = EJES.flatMap((eje) =>
  [1, 2, 3, 4].map(
    (n): Item => ({
      id: `${eje.id}-${n}`,
      texto: `Ítem ${n} de ${eje.id}`,
      modulo: 'nucleo',
      ejes: [{ eje: eje.id, carga: n % 2 === 0 ? -1 : 1 }],
      polaridad: n % 2 === 0 ? 'negativa' : 'positiva',
    }),
  ),
);

function perfil(id: string, valores: Record<string, Valor>): PerfilAfinidad {
  const posiciones: PerfilAfinidad['posiciones'] = {};
  for (const [itemId, valor] of Object.entries(valores)) posiciones[itemId] = { valor };
  return { id, nombre: id, confianza: 'verificada', posiciones };
}

describe('respuestasDePosiciones', () => {
  it('convierte posiciones documentadas al formato Respuesta[] del cuestionario', () => {
    const p = perfil('p', { 'economico-1': 2, 'social-2': -1 });
    expect(respuestasDePosiciones(p.posiciones)).toEqual([
      { itemId: 'economico-1', valor: 2 },
      { itemId: 'social-2', valor: -1 },
    ]);
  });
});

describe('proyectarEnEspacio', () => {
  it('incluye una entidad con ≥4 posiciones documentadas por eje', () => {
    const completa = perfil('completa', {
      'economico-1': 2, 'economico-2': -2, 'economico-3': 2, 'economico-4': -2,
      'social-1': -2, 'social-2': 2, 'social-3': -2, 'social-4': 2,
      'territorial-1': 1, 'territorial-2': -1, 'territorial-3': 1, 'territorial-4': -1,
    });
    const proyeccion = proyectarEnEspacio(completa, ITEMS, EJES);
    expect(proyeccion.incluida).toBe(true);
    expect(proyeccion.ejesInsuficientes).toEqual([]);
    const valores = Object.fromEntries(proyeccion.facetas.map((f) => [f.facetaId, f.valor]));
    expect(valores.economico).toBe(100);
    expect(valores.social).toBe(-100);
    expect(valores.territorial).toBe(50);
  });

  it('excluye a quien no llega al mínimo de 4 ítems en algún eje y explica cuál', () => {
    const coja = perfil('coja', {
      'economico-1': 2, 'economico-2': -2, 'economico-3': 2, 'economico-4': -2,
      'social-1': -2, 'social-2': 2, 'social-3': -2, 'social-4': 2,
      'territorial-1': 1, 'territorial-2': -1, 'territorial-3': 1, // 3 < mínimo de 4
    });
    const proyeccion = proyectarEnEspacio(coja, ITEMS, EJES);
    expect(proyeccion.incluida).toBe(false);
    expect(proyeccion.ejesInsuficientes).toEqual(['territorial']);
    // La posición territorial existe numéricamente pero no es publicable en el mapa.
    const territorial = proyeccion.facetas.find((f) => f.facetaId === 'territorial');
    expect(territorial?.coberturaSuficiente).toBe(false);
  });

  it('la vara de entidades no exige cobertura relativa del banco, pero sigue disponible vía opciones', () => {
    // 4 de 8 ítems económicos documentados en un banco ampliado: cobertura 0.5 de la carga.
    const bancoAmplio: Item[] = [
      ...ITEMS,
      ...[5, 6, 7, 8].map((n) => ({
        id: `economico-${n}`,
        texto: `Ítem ${n}`,
        modulo: 'nucleo',
        ejes: [{ eje: 'economico', carga: 1 }],
      })),
    ];
    const parcial = perfil('parcial', {
      'economico-1': 2, 'economico-2': -2, 'economico-3': 2, 'economico-4': -2,
      'social-1': -2, 'social-2': 2, 'social-3': -2, 'social-4': 2,
      'territorial-1': 1, 'territorial-2': -1, 'territorial-3': 1, 'territorial-4': -1,
    });
    // Con la vara de entidades (mínimo absoluto), entra.
    expect(proyectarEnEspacio(parcial, bancoAmplio, EJES).incluida).toBe(true);
    // Con una vara relativa estricta pasada explícitamente, el económico no llega.
    const estricta = proyectarEnEspacio(parcial, bancoAmplio, EJES, {
      minimoItems: 4,
      umbralCobertura: 0.75,
    });
    expect(estricta.incluida).toBe(false);
    expect(estricta.ejesInsuficientes).toEqual(['economico']);
  });

  it('mide a la entidad con el mismo instrumento que al usuario', () => {
    const entidad = perfil('igual', {
      'economico-1': 1, 'economico-2': -1, 'economico-4': 2,
      'social-1': 0, 'social-2': 1, 'social-3': -1,
      'territorial-1': -2, 'territorial-3': 1, 'territorial-4': 2,
    });
    const proyeccion = proyectarEnEspacio(entidad, ITEMS, EJES);
    const comoUsuario = calcularFacetas(
      respuestasDePosiciones(entidad.posiciones),
      ITEMS,
      EJES,
      { minimoItems: 4, umbralCobertura: 0 },
    );
    expect(proyeccion.facetas).toEqual(comoUsuario);
  });

  it('una entidad sin ninguna posición queda fuera por los tres ejes', () => {
    const vacia = perfil('vacia', {});
    const proyeccion = proyectarEnEspacio(vacia, ITEMS, EJES);
    expect(proyeccion.incluida).toBe(false);
    expect(proyeccion.ejesInsuficientes).toEqual(['economico', 'social', 'territorial']);
    for (const faceta of proyeccion.facetas) expect(faceta.valor).toBeNull();
  });
});

describe('distanciaEspacial', () => {
  it('distancia euclídea en unidades de eje', () => {
    const d = distanciaEspacial(
      { economico: 0, social: 0, territorial: 0 },
      { economico: 30, social: -40, territorial: 0 },
      EJES_ESPACIO,
    );
    expect(d).toBe(50);
  });

  it('devuelve null si falta algún eje: la cercanía no se estima con huecos', () => {
    const d = distanciaEspacial(
      { economico: 10, social: null, territorial: 0 },
      { economico: 30, social: -40, territorial: 0 },
      EJES_ESPACIO,
    );
    expect(d).toBeNull();
  });
});

describe('contrato de la brújula Propiedad/mercado × Poder', () => {
  const ejesReales = leer<Eje[]>('data/ejes.json');
  const ejePropiedad = ejesReales.find((eje) => eje.id === EJE_PROPIEDAD_MERCADO)!;
  const ejeAutoridad = ejesReales.find((eje) => eje.id === EJE_AUTORIDAD_POLITICA)!;
  const itemsReales = readdirSync(join(RAIZ, 'data/items'))
    .filter((fichero) => fichero.endsWith('.json'))
    .sort()
    .flatMap((fichero) => leer<Item[]>(`data/items/${fichero}`))
    .filter((item) => item.estado !== 'retirado');

  const referencia = (id: string) =>
    leer<ReferenciaDoctrinal>(`data/referencias/${id}.json`);

  const propiedad = (id: string) => {
    const proyeccion = proyectarEnEspacio(
      referencia(id),
      itemsReales,
      [ejePropiedad],
      { minimoItems: 3, umbralCobertura: 0 },
    );
    return proyeccion.facetas[0]?.valor;
  };

  const autoridad = (id: string) => {
    const proyeccion = proyectarEnEspacio(
      referencia(id),
      itemsReales,
      [ejeAutoridad],
      { minimoItems: 1, umbralCobertura: 0 },
    );
    return proyeccion.facetas[0]?.valor;
  };

  it('no convierte el intervencionismo falangista en izquierda económica extrema', () => {
    expect(propiedad('falangismo-fe-jons-1934')).toBeTypeOf('number');
    expect(propiedad('falangismo-fe-jons-1934')!).toBeGreaterThanOrEqual(-20);
    expect(propiedad('falangismo-fe-jons-1934')!).toBeLessThanOrEqual(25);
  });

  it('conserva separados socialización, distributismo y anarcocapitalismo', () => {
    expect(propiedad('marxismo-leninismo-sovietico-estaliniano')!).toBeLessThanOrEqual(-75);
    expect(propiedad('distributismo')!).toBeGreaterThanOrEqual(-35);
    expect(propiedad('distributismo')!).toBeLessThanOrEqual(5);
    expect(propiedad('anarcocapitalismo-rothbardiano')!).toBeGreaterThanOrEqual(65);
  });

  it('mide Poder con cargas directas sin derivarlo de GAL–TAN o tradición moral', () => {
    // 2026-07-12: lim-007 −2 (el discurso fundacional niega la raza como
    // fundamento de la nación) entra en el eje de autoridad y baja la
    // proyección de ~76 a ~65: sigue siendo claramente autoritaria, con más
    // evidencia y menos extrema. El umbral se ajusta al nuevo estado honesto.
    expect(autoridad('falangismo-fe-jons-1934')!).toBeGreaterThanOrEqual(60);
    expect(autoridad('trotskismo')!).toBeGreaterThan(0);
    expect(autoridad('anarcocapitalismo-rothbardiano')!).toBeLessThanOrEqual(-75);
  });
});
