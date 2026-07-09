import type { Item, Valor } from './types.js';

/**
 * Decide si una pregunta pertenece al itinerario actual.
 *
 * Las preguntas ordinarias siempre son visibles. Una subpregunta condicional
 * solo aparece cuando su pregunta padre tiene una respuesta numérica incluida
 * en la regla; «sin opinión» nunca activa una rama.
 */
export function itemVisible(
  item: Item,
  respuestas: Readonly<Record<string, Valor | null | undefined>>,
): boolean {
  if (!item.condicion) return true;
  const valorPadre = respuestas[item.condicion.itemId];
  return typeof valorPadre === 'number' && item.condicion.valores.includes(valorPadre);
}
