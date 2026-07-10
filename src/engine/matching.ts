import type {
  DetalleItem,
  Partido,
  PerfilAfinidad,
  Respuesta,
  ResultadoAfinidad,
  Valor,
} from './types.js';

/** Distancia máxima entre dos posiciones en la escala [-2, 2]. */
const DISTANCIA_MAXIMA = 4;

export interface OpcionesAfinidad {
  /** Proporción mínima de ítems respondidos que el partido debe cubrir (def. 0.5). */
  umbralCobertura?: number;
  /** Nº mínimo de ítems comparados para no marcar bajaCobertura (def. 10). */
  minimoItems?: number;
}

/**
 * Proyección auditable de la segunda lectura de un partido. Devuelve solo las
 * posiciones observadas: no rellena silenciosamente sus huecos con programa.
 */
export function perfilContraste(partido: Partido): PerfilAfinidad | undefined {
  if (!partido.dobleLectura) return undefined;
  return {
    id: partido.id,
    nombre: partido.nombre,
    siglas: partido.siglas,
    confianza: partido.confianza,
    web: partido.web,
    posiciones: partido.dobleLectura.contraste.posiciones,
  };
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
  entidad: PerfilAfinidad,
  opciones: OpcionesAfinidad = {},
): ResultadoAfinidad {
  const umbral = opciones.umbralCobertura ?? 0.5;
  const minimo = opciones.minimoItems ?? 10;

  // Deduplicación por itemId (se conserva la última respuesta), coherente con
  // calcularFacetas: una respuesta repetida no puede contar dos veces.
  const porItem = new Map(respuestas.map((r) => [r.itemId, r]));
  const contestadas = [...porItem.values()].filter(
    (r): r is Respuesta & { valor: Valor } => r.valor !== null,
  );

  const detalle: DetalleItem[] = [];
  let sumaDistancias = 0;
  let sumaPesos = 0;

  for (const r of contestadas) {
    const pos = entidad.posiciones[r.itemId];
    if (!pos) continue;
    const peso = r.importante ? 2 : 1;
    const distancia = Math.abs(r.valor - pos.valor);
    sumaDistancias += peso * distancia;
    sumaPesos += peso;
    detalle.push({
      itemId: r.itemId,
      valorUsuario: r.valor,
      valorEntidad: pos.valor,
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
    entidadId: entidad.id,
    puntuacion: redondear(puntuacion, 1),
    itemsComparados,
    itemsRespondidos: contestadas.length,
    cobertura: redondear(cobertura, 3),
    confianza: entidad.confianza,
    bajaCobertura: cobertura < umbral || itemsComparados < minimo,
    detalle,
  };
}

/**
 * Ranking de afinidad, de mayor a menor.
 *
 * Los resultados con cobertura suficiente se muestran primero. Los de baja
 * cobertura siguen disponibles por transparencia, pero no pueden adelantar a
 * una comparación sustentada en datos suficientes. Los partidos sin ningún
 * ítem comparable quedan al final y la interfaz debe tratarlos como «sin
 * datos», nunca como una afinidad del 0 %.
 */
export function rankingAfinidad(
  respuestas: Respuesta[],
  entidades: PerfilAfinidad[],
  opciones: OpcionesAfinidad = {},
): ResultadoAfinidad[] {
  return entidades
    .filter((entidad) => entidad.confianza !== 'sin-datos')
    .map((entidad) => calcularAfinidad(respuestas, entidad, opciones))
    .sort((a, b) => {
      const categoriaA = a.itemsComparados === 0 ? 2 : a.bajaCobertura ? 1 : 0;
      const categoriaB = b.itemsComparados === 0 ? 2 : b.bajaCobertura ? 1 : 0;
      return categoriaA - categoriaB || b.puntuacion - a.puntuacion;
    });
}

function redondear(n: number, decimales: number): number {
  const f = 10 ** decimales;
  return Math.round(n * f) / f;
}
