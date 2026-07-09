import type { Eje, Item, Modulo, Respuesta } from './types.js';

/**
 * Puntuación del usuario en cada eje, en [-100, 100]:
 *
 *   ejeₖ = 100 · Σ wᵢ·uᵢ·cᵢₖ / Σ wᵢ·2·|cᵢₖ|
 *
 * donde cᵢₖ es la carga del ítem i sobre el eje k. Los ítems «sin opinión»
 * y los solo-matching (ejes vacíos) no contribuyen. Un eje sin ítems
 * respondidos devuelve null (no se inventa una posición).
 */
export function calcularEjes(
  respuestas: Respuesta[],
  items: Item[],
  ejes: Eje[],
): Record<string, number | null> {
  const porItem = new Map(items.map((i) => [i.id, i]));
  const num: Record<string, number> = {};
  const den: Record<string, number> = {};
  for (const eje of ejes) {
    num[eje.id] = 0;
    den[eje.id] = 0;
  }

  for (const r of respuestas) {
    if (r.valor === null) continue;
    const item = porItem.get(r.itemId);
    if (!item) continue;
    const peso = r.importante ? 2 : 1;
    for (const carga of item.ejes) {
      if (!(carga.eje in num)) continue;
      num[carga.eje] = (num[carga.eje] ?? 0) + peso * r.valor * carga.carga;
      den[carga.eje] = (den[carga.eje] ?? 0) + peso * 2 * Math.abs(carga.carga);
    }
  }

  const resultado: Record<string, number | null> = {};
  for (const eje of ejes) {
    const d = den[eje.id] ?? 0;
    const n = num[eje.id] ?? 0;
    resultado[eje.id] = d > 0 ? Math.round((100 * n) / d * 10) / 10 : null;
  }
  return resultado;
}

export interface ContextoUsuario {
  /** id de comunidad autónoma en minúsculas, p. ej. "canarias". */
  ccaa?: string;
}

/**
 * Módulos que se activan para este usuario:
 * - "siempre": el núcleo.
 * - "eje": profundización desbloqueada por la posición en un eje
 *   (p. ej. economico <= -40 → corrientes de la izquierda).
 * - "ccaa": módulo territorial según la comunidad del usuario.
 * Los módulos con `eleccionUsuario: true` pueden activarse además manualmente.
 */
export function modulosDesbloqueados(
  modulos: Modulo[],
  ejesUsuario: Record<string, number | null>,
  contexto: ContextoUsuario = {},
): string[] {
  const activos: string[] = [];
  for (const m of modulos) {
    const d = m.desbloqueo;
    let ok = false;
    if (d.tipo === 'siempre') {
      ok = true;
    } else if (d.tipo === 'eje' && d.eje && d.operador && typeof d.umbral === 'number') {
      const v = ejesUsuario[d.eje];
      if (typeof v === 'number') {
        ok = d.operador === '<=' ? v <= d.umbral : v >= d.umbral;
      }
    } else if (d.tipo === 'ccaa' && d.ccaa) {
      ok = contexto.ccaa === d.ccaa;
    }
    if (ok) activos.push(m.id);
  }
  return activos;
}
