import { describe, expect, it } from 'vitest';
import type { Valor } from '@engine';
import { ITEMS, MODULOS, secuenciaItems } from '../web/src/datos.js';

/**
 * Garantía de producto del exhaustivo: activando todos los módulos, TODAS las
 * preguntas vigentes del banco llegan a mostrarse — las ordinarias siempre y
 * cada subpregunta condicional en cuanto su padre se responde en el rango que
 * la activa. Un ítem vigente que ningún recorrido puede mostrar es un bug de
 * datos (módulo inexistente, condición insatisfacible), no una decisión.
 */

const TODOS_LOS_MODULOS = MODULOS.map((m) => m.id).filter((id) => id !== 'nucleo');
const VIGENTES = ITEMS.filter((item) => item.estado !== 'retirado');

/** Respuestas que satisfacen a la vez todas las condiciones del banco. */
function respuestasQueAbrenTodo(): Record<string, Valor | null> {
  const respuestas: Record<string, Valor | null> = {};
  for (const item of VIGENTES) {
    if (!item.condicion) continue;
    const { itemId, valores } = item.condicion;
    const previo = respuestas[itemId];
    if (typeof previo === 'number' && !valores.includes(previo)) {
      throw new Error(
        `condiciones incompatibles sobre ${itemId}: ${previo} no sirve para ${item.id}`,
      );
    }
    if (previo === undefined) respuestas[itemId] = valores[0] as Valor;
  }
  return respuestas;
}

describe('cobertura del recorrido exhaustivo', () => {
  it('sin responder nada, muestra todas las preguntas ordinarias vigentes', () => {
    const visibles = new Set(secuenciaItems(TODOS_LOS_MODULOS).map((item) => item.id));
    for (const item of VIGENTES.filter((candidato) => !candidato.condicion)) {
      expect(visibles.has(item.id), `falta la pregunta ordinaria ${item.id}`).toBe(true);
    }
  });

  it('con las condiciones satisfechas, ninguna pregunta vigente queda inalcanzable', () => {
    const respuestas = respuestasQueAbrenTodo();
    const visibles = new Set(
      secuenciaItems(TODOS_LOS_MODULOS, respuestas).map((item) => item.id),
    );
    const inalcanzables = VIGENTES.filter((item) => !visibles.has(item.id)).map(
      (item) => item.id,
    );
    expect(inalcanzables).toEqual([]);
    expect(visibles.size).toBe(VIGENTES.length);
  });

  it('los seguimientos de la UE, la supranacionalidad y la URSS aparecen exactamente cuando toca', () => {
    const base = secuenciaItems(TODOS_LOS_MODULOS);
    for (const id of ['ue-004', 'ue-005', 'geo-017', 'geo-018', 'izq-056']) {
      expect(base.some((item) => item.id === id), `${id} visible sin padre`).toBe(false);
    }

    const conMotivos = secuenciaItems(TODOS_LOS_MODULOS, {
      'ue-001': 2,
      'geo-016': -1,
      'izq-049': -2,
    });
    for (const id of ['ue-004', 'ue-005', 'geo-017', 'geo-018', 'izq-056']) {
      expect(conMotivos.some((item) => item.id === id), `${id} oculto con padre activador`).toBe(
        true,
      );
    }

    const sinMotivos = secuenciaItems(TODOS_LOS_MODULOS, {
      'ue-001': -2,
      'geo-016': 2,
      'izq-049': 1,
    });
    for (const id of ['ue-004', 'ue-005', 'geo-017', 'geo-018', 'izq-056']) {
      expect(sinMotivos.some((item) => item.id === id), `${id} visible con padre no activador`).toBe(
        false,
      );
    }
  });
});
