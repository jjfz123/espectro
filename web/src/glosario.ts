/**
 * Carga perezosa del glosario: es la única pieza de datos del cuestionario
 * retirada del cierre estático inicial (palanca de recuperación del
 * presupuesto web, 2026-07-13). El Cuestionario la precarga al montar, así
 * que cuando alguien toca su primer «?» el catálogo ya está en memoria; la
 * promesa se comparte y el resultado queda cacheado para lecturas síncronas.
 */
import type { Item } from '@engine';
import type { TerminoGlosario } from './datos';

let cache: ReadonlyMap<string, TerminoGlosario> | null = null;
let promesa: Promise<ReadonlyMap<string, TerminoGlosario>> | null = null;

/** Mapa id→término si ya se cargó; null durante el arranque. */
export function glosarioCargado(): ReadonlyMap<string, TerminoGlosario> | null {
  return cache;
}

export function cargarGlosario(): Promise<ReadonlyMap<string, TerminoGlosario>> {
  promesa ??= import('@data/glosario.json').then((modulo) => {
    cache = new Map(
      (modulo.default as TerminoGlosario[]).map((termino) => [termino.id, termino]),
    );
    return cache;
  });
  return promesa;
}

/** Términos del glosario que usa un ítem, en el orden en que los declara. */
export function terminosDeItem(
  item: Item,
  glosario: ReadonlyMap<string, TerminoGlosario> | null,
): TerminoGlosario[] {
  if (!item.terminos || !glosario) return [];
  return item.terminos
    .map((id: string) => glosario.get(id))
    .filter((t: TerminoGlosario | undefined): t is TerminoGlosario => t !== undefined);
}
