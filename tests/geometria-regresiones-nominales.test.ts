import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  proyectarEnEspacio,
  EJE_AUTORIDAD_POLITICA,
  EJE_PROPIEDAD_MERCADO,
} from '../src/engine/index.js';
import type { Eje, Item, PerfilAfinidad, ReferenciaDoctrinal } from '../src/engine/index.js';

/**
 * Casilla del TODO «regresiones nominales para los fallos reportados»:
 * - BNG no ocupa el extremo anarquista por territorialidad o izquierdismo;
 * - Falangismo/FE-JONS no domina un cuadrante ni salta de izquierda a derecha
 *   por una pregunta bandera;
 * - Distributismo no queda centrado sin evidencia económica e institucional.
 */

const RAIZ = fileURLToPath(new URL('..', import.meta.url));

function leer<T>(ruta: string): T {
  return JSON.parse(readFileSync(join(RAIZ, ruta), 'utf8')) as T;
}

const ejesReales = leer<Eje[]>('data/ejes.json');
const ejePropiedad = ejesReales.find((eje) => eje.id === EJE_PROPIEDAD_MERCADO)!;
const ejeAutoridad = ejesReales.find((eje) => eje.id === EJE_AUTORIDAD_POLITICA)!;
const ejeEconomico = ejesReales.find((eje) => eje.id === 'economico')!;
const itemsReales = readdirSync(join(RAIZ, 'data/items'))
  .filter((fichero) => fichero.endsWith('.json'))
  .sort()
  .flatMap((fichero) => leer<Item[]>(`data/items/${fichero}`))
  .filter((item) => item.estado !== 'retirado');
const ITEM_POR_ID = new Map(itemsReales.map((item) => [item.id, item]));

describe('regresiones nominales de geometría (fallos reportados)', () => {
  it('BNG no ocupa el extremo anarquista: su eje de Poder no se hereda del territorio ni del izquierdismo', () => {
    const bng = leer<PerfilAfinidad>('data/partidos/bng.json');
    const proyeccion = proyectarEnEspacio(
      bng as unknown as ReferenciaDoctrinal,
      itemsReales,
      [ejeAutoridad],
      { minimoItems: 1, umbralCobertura: 0 },
    );
    const valor = proyeccion.facetas[0]?.valor;
    expect(valor).toBeTypeOf('number');
    // Extremo anarquista sería ≤ −75: el BNG es soberanista de izquierdas,
    // no antiestatista radical.
    expect(valor!).toBeGreaterThan(-75);
    // Anti-fuga estructural: por construcción, el eje de Poder solo agrega
    // ítems con carga en autoridad-politica; se verifica que ningún ítem del
    // banco cargue a la vez autoridad y territorial con signos que permitan
    // heredar el soberanismo como antiautoritarismo extremo (carga cruzada
    // fuerte en ambos).
    const cruzadosFuertes = itemsReales.filter((item) => {
      const autoridadCarga = item.ejes.find((c) => c.eje === EJE_AUTORIDAD_POLITICA)?.carga ?? 0;
      const territorialCarga = item.ejes.find((c) => c.eje === 'territorial')?.carga ?? 0;
      return Math.abs(autoridadCarga) >= 0.75 && Math.abs(territorialCarga) >= 0.75;
    });
    expect(cruzadosFuertes).toEqual([]);
  });

  it('el falangismo no salta de lado económico por una sola pregunta bandera (estabilidad dejar-uno-fuera)', () => {
    const falangismo = leer<ReferenciaDoctrinal>(
      'data/referencias/falangismo-fe-jons-1934.json',
    );
    const completo = proyectarEnEspacio(falangismo, itemsReales, [ejeEconomico], {
      minimoItems: 1,
      umbralCobertura: 0,
    }).facetas[0]?.valor;
    expect(completo).toBeTypeOf('number');

    const idsEconomicos = Object.keys(falangismo.posiciones).filter((itemId) =>
      (ITEM_POR_ID.get(itemId)?.ejes ?? []).some(
        (carga) => carga.eje === 'economico' && carga.carga !== 0,
      ),
    );
    expect(idsEconomicos.length).toBeGreaterThanOrEqual(4);
    for (const itemId of idsEconomicos) {
      const posiciones = { ...falangismo.posiciones };
      delete posiciones[itemId];
      const sinUno = proyectarEnEspacio(
        { ...falangismo, posiciones },
        itemsReales,
        [ejeEconomico],
        { minimoItems: 1, umbralCobertura: 0 },
      ).facetas[0]?.valor;
      expect(sinUno).toBeTypeOf('number');
      // Ninguna pregunta bandera puede llevarlo a dominar el lado derecho
      // (+25) ni el extremo izquierdo (−75): banda de estabilidad nominal.
      expect(sinUno!).toBeLessThanOrEqual(25);
      expect(sinUno!).toBeGreaterThanOrEqual(-75);
    }
  });

  it('el distributismo solo aparece centrado porque tiene evidencia: sin ella queda excluido, no centrado', () => {
    const distributismo = leer<ReferenciaDoctrinal>('data/referencias/distributismo.json');
    // Con la regla del plano (≥4 ítems por eje), la evidencia económica real
    // lo sostiene…
    const econ = proyectarEnEspacio(distributismo, itemsReales, [ejePropiedad], {
      minimoItems: 4,
      umbralCobertura: 0,
    });
    expect(econ.incluida).toBe(true);
    // …y el eje institucional (Poder), que hoy solo tiene 2 anclas, queda
    // excluido del par Propiedad×Poder en lugar de dibujar un falso centro.
    const par = proyectarEnEspacio(distributismo, itemsReales, [ejePropiedad, ejeAutoridad], {
      minimoItems: 4,
      umbralCobertura: 0,
    });
    expect(par.incluida).toBe(false);
    const facetaAutoridad = par.facetas.find(
      (faceta) => faceta.facetaId === EJE_AUTORIDAD_POLITICA,
    );
    expect(facetaAutoridad?.itemsRespondidos ?? 0).toBeLessThan(4);
  });
});
