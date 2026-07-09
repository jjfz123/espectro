import type { Partido, Respuesta, ResultadoAfinidad, DetalleItem, Valor } from './types.js';

/** Distancia máxima entre dos posiciones en la escala [-2, 2]. */
const DISTANCIA_MAXIMA = 4;

export interface OpcionesAfinidad {
  /** Proporción mínima de ítems respondidos que el partido debe cubrir (def. 0.5). */
  umbralCobertura?: number;
  /** Nº mínimo de ítems comparados para no marcar bajaCobertura (def. 10). */
  minimoItems?: number;
}

/**
 * Afinidad usuario–partido con distancia city-block (Manhattan) normalizada:
 *
 *   afinidad = 100 · (1 − Σ wᵢ·|uᵢ − pᵢ| / (Σ wᵢ · 4))
 *
 * donde wᵢ = 2 si el usuario marcó el ítem como importante, 1 en caso contrario.
 * Es el método del Wahl-O-Mat/StemWijzer: transparente y explicable ítem a ítem.
 *
 * Reglas:
 * - «sin opinión» (valor null) se excluye: no penaliza ni favorece.
 * - Ítems sin posición del partido se excluyen y reducen la cobertura.
 * - Cobertura baja ⇒ bandera `bajaCobertura` (mostrar aviso, no ocultar el dato).
 */
export function calcularAfinidad(
  respuestas: Respuesta[],
  partido: Partido,
  opciones: OpcionesAfinidad = {},
): ResultadoAfinidad {
  const umbral = opciones.umbralCobertura ?? 0.5;
  const minimo = opciones.minimoItems ?? 10;

  const contestadas = respuestas.filter(
    (r): r is Respuesta & { valor: Valor } => r.valor !== null,
  );

  const detalle: DetalleItem[] = [];
  let sumaDistancias = 0;
  let sumaPesos = 0;

  for (const r of contestadas) {
    const pos = partido.posiciones[r.itemId];
    if (!pos) continue;
    const peso = r.importante ? 2 : 1;
    const distancia = Math.abs(r.valor - pos.valor);
    sumaDistancias += peso * distancia;
    sumaPesos += peso;
    detalle.push({
      itemId: r.itemId,
      valorUsuario: r.valor,
      valorPartido: pos.valor,
      distancia,
      peso,
      justificacion: pos.justificacion,
      fuente: pos.fuente,
    });
  }

  const itemsComparados = detalle.length;
  const cobertura = contestadas.length > 0 ? itemsComparados / contestadas.length : 0;
  const puntuacion =
    sumaPesos > 0 ? 100 * (1 - sumaDistancias / (sumaPesos * DISTANCIA_MAXIMA)) : 0;

  return {
    partidoId: partido.id,
    puntuacion: redondear(puntuacion, 1),
    itemsComparados,
    itemsRespondidos: contestadas.length,
    cobertura: redondear(cobertura, 3),
    confianza: partido.confianza,
    bajaCobertura: cobertura < umbral || itemsComparados < minimo,
    detalle,
  };
}

/** Ranking de afinidad, de mayor a menor. Los `sin-datos` no se puntúan. */
export function rankingAfinidad(
  respuestas: Respuesta[],
  partidos: Partido[],
  opciones: OpcionesAfinidad = {},
): ResultadoAfinidad[] {
  return partidos
    .filter((p) => p.confianza !== 'sin-datos')
    .map((p) => calcularAfinidad(respuestas, p, opciones))
    .sort((a, b) => b.puntuacion - a.puntuacion);
}

function redondear(n: number, decimales: number): number {
  const f = 10 ** decimales;
  return Math.round(n * f) / f;
}
