import type { Partido } from './types.js';

export type TipoEleccion = 'generales' | 'autonomicas' | 'municipales' | 'europeas';

export interface ContextoEleccion {
  tipo: TipoEleccion;
  /** id de CCAA en minúsculas; necesario para filtrar partidos de ámbito no estatal. */
  ccaa?: string;
}

/**
 * Partidos que tiene sentido mostrar y rankear en una elección dada.
 *
 * Heurística v1 (pendiente de sustituirse por datos reales de candidaturas
 * de infoelectoral en la Fase 3):
 * - europeas: circunscripción única, entran todos.
 * - generales/autonomicas: estatales + autonómicos/insulares de la CCAA del usuario.
 * - municipales: además los de ámbito local de esa CCAA (sin datos de municipio
 *   el filtrado fino aún no es posible).
 *
 * IMPORTANTE: no toca la fórmula de afinidad ni las puntuaciones de eje —
 * solo decide QUÉ partidos entran en el ranking. La afinidad de cada partido
 * se calcula exactamente igual en cualquier ámbito electoral.
 */
export function partidosElegibles(partidos: Partido[], ctx: ContextoEleccion): Partido[] {
  if (ctx.tipo === 'europeas') return [...partidos];
  return partidos.filter((p) => {
    if (p.ambito === 'estatal') return true;
    if (p.ambito === 'local' && ctx.tipo !== 'municipales') return false;
    if (!ctx.ccaa) return true; // sin CCAA conocida no se excluye a nadie
    return p.ccaa?.includes(ctx.ccaa) ?? false;
  });
}
