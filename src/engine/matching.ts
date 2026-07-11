import type {
  DetalleItem,
  Partido,
  PerfilAfinidad,
  Respuesta,
  ResultadoAfinidad,
  Sindicato,
  Valor,
} from './types.js';

/** Distancia máxima entre dos posiciones en la escala [-2, 2]. */
const DISTANCIA_MAXIMA = 4;

export interface OpcionesAfinidad {
  /** Proporción mínima de ítems respondidos que el partido debe cubrir (def. 0.5). */
  umbralCobertura?: number;
  /** Nº mínimo de ítems comparados para no marcar bajaCobertura (def. 10). */
  minimoItems?: number;
  /**
   * Excluye del ranking los porcentajes que no alcanzan ambos umbrales. Por
   * defecto es `false`: el ranking partidista conserva el resultado y muestra
   * su aviso. Se activa en salidas donde una coincidencia parcial no debe
   * publicarse como afinidad general, como la comparación sindical.
   */
  bloquearCoberturaInsuficiente?: boolean;
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
 * El orden sigue estrictamente el porcentaje que ve la persona usuaria. La
 * cobertura no puede alterar silenciosamente el puesto: hacerlo producía
 * listas visualmente incoherentes (por ejemplo, un 62 % delante de un 80 %).
 * En caso de empate sí se prioriza la comparación más sólida y después la que
 * contiene más ítems. Las organizaciones monotemáticas se excluyen: un único
 * punto no puede producir un porcentaje de afinidad general. Los partidos sin
 * ningún ítem comparable quedan al final y la interfaz debe tratarlos como
 * «sin datos», nunca como una afinidad del 0 %.
 */
export function rankingAfinidad(
  respuestas: Respuesta[],
  entidades: PerfilAfinidad[],
  opciones: OpcionesAfinidad = {},
): ResultadoAfinidad[] {
  return entidades
    .filter(esPerfilComparable)
    .map((entidad) => calcularAfinidad(respuestas, entidad, opciones))
    .filter((resultado) =>
      opciones.bloquearCoberturaInsuficiente ? !resultado.bajaCobertura : true,
    )
    .sort((a, b) => {
      const sinDatosA = a.itemsComparados === 0;
      const sinDatosB = b.itemsComparados === 0;
      return (
        Number(sinDatosA) - Number(sinDatosB) ||
        b.puntuacion - a.puntuacion ||
        Number(a.bajaCobertura) - Number(b.bajaCobertura) ||
        b.itemsComparados - a.itemsComparados ||
        b.cobertura - a.cobertura ||
        a.entidadId.localeCompare(b.entidadId, 'es')
      );
    });
}

/** El denominador y el ranking deben operar sobre el mismo universo. */
export function esPerfilComparable(entidad: PerfilAfinidad): boolean {
  return entidad.confianza !== 'sin-datos' && !entidad.monotematico;
}

/**
 * Excluye respuestas para las que ninguna entidad del universo comparado ha
 * publicado posición. Evita que una rama condicional ajena a todo el corpus
 * reduzca artificialmente la cobertura de todas las organizaciones.
 */
export function respuestasEnCorpus(
  respuestas: Respuesta[],
  entidades: readonly PerfilAfinidad[],
): Respuesta[] {
  const idsComparables = new Set(
    entidades.filter(esPerfilComparable).flatMap((entidad) => Object.keys(entidad.posiciones)),
  );
  return respuestas.filter((respuesta) => idsComparables.has(respuesta.itemId));
}

/**
 * Un sindicato estatal o sectorial sin adscripción autonómica es nacional.
 * Cualquier otro perfil territorial necesita declarar y coincidir con la
 * comunidad consultada; un dato incompleto nunca se interpreta como global.
 */
export function sindicatoRelevanteEnCcaa(
  sindicato: Sindicato,
  ccaa: string | undefined,
): boolean {
  if (!ccaa || sindicato.ambito === 'estatal') return true;
  if (sindicato.ambito === 'sectorial' && (!sindicato.ccaa || sindicato.ccaa.length === 0)) {
    return true;
  }
  return sindicato.ccaa?.includes(ccaa) ?? false;
}

function redondear(n: number, decimales: number): number {
  const f = 10 ** decimales;
  return Math.round(n * f) / f;
}
