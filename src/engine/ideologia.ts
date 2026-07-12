import type { CondicionEje, Eje, Item, Modulo, Respuesta, ResultadoFaceta, Valor } from './types.js';

export interface OpcionesFacetas {
  /** Nº mínimo de preguntas con opinión para considerar estable una faceta (def. 3). */
  minimoItems?: number;
  /** Proporción mínima de carga disponible respondida (def. 0.5). */
  umbralCobertura?: number;
}

/** Acumulador interno de una faceta. */
interface AcumuladorFaceta {
  numerador: number;
  cargaRespondida: number;
  cargaDisponible: number;
  itemsRespondidos: Set<string>;
  itemsDisponibles: Set<string>;
}

/**
 * Calcula el perfil personal por facetas con evidencia explícita.
 *
 * Los `items` recibidos son las preguntas administradas o disponibles en el
 * recorrido actual. «Sin opinión» cuenta como disponible, pero no como
 * respondida. La prioridad `importante` se ignora deliberadamente: expresa
 * saliencia para el matching, no una posición ideológica distinta.
 */
export function calcularFacetas(
  respuestas: Respuesta[],
  items: Item[],
  ejes: Eje[],
  opciones: OpcionesFacetas = {},
): ResultadoFaceta[] {
  const minimoItems = opciones.minimoItems ?? 3;
  const umbralCobertura = opciones.umbralCobertura ?? 0.5;
  const idsEjes = new Set(ejes.map((eje) => eje.id));
  const respuestaPorItem = new Map(respuestas.map((respuesta) => [respuesta.itemId, respuesta]));
  const acumuladores = new Map<string, AcumuladorFaceta>();

  for (const eje of ejes) {
    acumuladores.set(eje.id, {
      numerador: 0,
      cargaRespondida: 0,
      cargaDisponible: 0,
      itemsRespondidos: new Set(),
      itemsDisponibles: new Set(),
    });
  }

  for (const item of items) {
    const respuesta = respuestaPorItem.get(item.id);
    const valor = respuesta?.valor;

    for (const carga of item.ejes) {
      if (!idsEjes.has(carga.eje) || !Number.isFinite(carga.carga) || carga.carga === 0) continue;
      const acumulador = acumuladores.get(carga.eje);
      if (!acumulador) continue;

      const cargaAbsoluta = Math.abs(carga.carga);
      acumulador.itemsDisponibles.add(item.id);
      acumulador.cargaDisponible += cargaAbsoluta;

      if (!esRespuestaConOpinion(valor)) continue;
      acumulador.itemsRespondidos.add(item.id);
      acumulador.cargaRespondida += cargaAbsoluta;
      acumulador.numerador += valor * carga.carga;
    }
  }

  return ejes.map((eje) => {
    const acumulador = acumuladores.get(eje.id);
    if (!acumulador) return facetaVacia(eje.id);

    const denominador = 2 * acumulador.cargaRespondida;
    const cobertura =
      acumulador.cargaDisponible > 0
        ? acumulador.cargaRespondida / acumulador.cargaDisponible
        : 0;
    const itemsRespondidos = acumulador.itemsRespondidos.size;

    return {
      facetaId: eje.id,
      valor: denominador > 0 ? redondear((100 * acumulador.numerador) / denominador, 1) : null,
      itemsRespondidos,
      itemsDisponibles: acumulador.itemsDisponibles.size,
      cargaRespondida: redondear(acumulador.cargaRespondida, 4),
      cargaDisponible: redondear(acumulador.cargaDisponible, 4),
      numerador: redondear(acumulador.numerador, 4),
      denominador: redondear(denominador, 4),
      cobertura: redondear(cobertura, 3),
      coberturaSuficiente: itemsRespondidos >= minimoItems && cobertura >= umbralCobertura,
    };
  });
}

/**
 * Puntuación del usuario en cada eje, en [-100, 100]:
 *
 *   ejeₖ = 100 · Σ uᵢ·cᵢₖ / Σ 2·|cᵢₖ|
 *
 * donde cᵢₖ es la carga del ítem i sobre el eje k. Los ítems «sin opinión»
 * y los solo-matching (ejes vacíos) no contribuyen. Un eje sin ítems
 * respondidos devuelve null (no se inventa una posición). La prioridad
 * `importante` no altera el perfil personal; se reserva para el matching.
 *
 * API compacta conservada por compatibilidad. Para mostrar evidencia y
 * cobertura debe usarse `calcularFacetas`.
 */
export function calcularEjes(
  respuestas: Respuesta[],
  items: Item[],
  ejes: Eje[],
): Record<string, number | null> {
  return Object.fromEntries(
    calcularFacetas(respuestas, items, ejes).map((faceta) => [faceta.facetaId, faceta.valor]),
  );
}

function esRespuestaConOpinion(valor: Respuesta['valor'] | undefined): valor is Valor {
  return typeof valor === 'number';
}

function facetaVacia(facetaId: string): ResultadoFaceta {
  return {
    facetaId,
    valor: null,
    itemsRespondidos: 0,
    itemsDisponibles: 0,
    cargaRespondida: 0,
    cargaDisponible: 0,
    numerador: 0,
    denominador: 0,
    cobertura: 0,
    coberturaSuficiente: false,
  };
}

function redondear(valor: number, decimales: number): number {
  const factor = 10 ** decimales;
  return Math.round(valor * factor) / factor;
}

export interface ContextoUsuario {
  /** id de comunidad autónoma en minúsculas, p. ej. "canarias". */
  ccaa?: string;
}

/**
 * Evalúa una condición de eje (umbral con operador u horquilla min–max).
 * Un eje sin señal (null) nunca cumple: no se asume ninguna posición.
 */
function cumpleCondicionEje(
  condicion: CondicionEje,
  ejesUsuario: Record<string, number | null>,
): boolean {
  const valor = ejesUsuario[condicion.eje];
  if (typeof valor !== 'number') return false;
  if (condicion.operador && typeof condicion.umbral === 'number') {
    return condicion.operador === '<=' ? valor <= condicion.umbral : valor >= condicion.umbral;
  }
  if (typeof condicion.min === 'number' && typeof condicion.max === 'number') {
    return valor >= condicion.min && valor <= condicion.max;
  }
  return false;
}

/**
 * Módulos que se activan para este usuario:
 * - "siempre": el núcleo.
 * - "eje": profundización desbloqueada por la posición en un eje
 *   (p. ej. economico <= -40 → corrientes de la izquierda).
 * - "eje-banda": desbloqueo por franja (min <= valor <= max), para corrientes
 *   que viven en zonas intermedias de un eje (socialdemocracia, centro liberal).
 * - "ccaa": módulo territorial según la comunidad del usuario (una o varias).
 * - "ejes-todos": conjunción de condiciones de eje; todas deben cumplirse con
 *   señal suficiente (permite gatillos que exijan dos dimensiones a la vez).
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
    } else if (
      d.tipo === 'eje-banda' &&
      d.eje &&
      typeof d.min === 'number' &&
      typeof d.max === 'number'
    ) {
      const v = ejesUsuario[d.eje];
      if (typeof v === 'number') {
        ok = v >= d.min && v <= d.max;
      }
    } else if (d.tipo === 'ccaa' && d.ccaa && contexto.ccaa) {
      ok = Array.isArray(d.ccaa) ? d.ccaa.includes(contexto.ccaa) : contexto.ccaa === d.ccaa;
    } else if (
      d.tipo === 'ejes-todos' &&
      Array.isArray(d.condiciones) &&
      d.condiciones.length > 0
    ) {
      ok = d.condiciones.every((condicion) => cumpleCondicionEje(condicion, ejesUsuario));
    } else if (
      d.tipo === 'eje-o-ccaa' &&
      d.eje &&
      d.operador &&
      typeof d.umbral === 'number'
    ) {
      const valor = ejesUsuario[d.eje];
      const cumpleEje =
        typeof valor === 'number' &&
        (d.operador === '<=' ? valor <= d.umbral : valor >= d.umbral);
      const cumpleCcaa =
        Boolean(contexto.ccaa && d.ccaa) &&
        (Array.isArray(d.ccaa)
          ? d.ccaa.includes(contexto.ccaa ?? '')
          : contexto.ccaa === d.ccaa);
      ok = cumpleEje || cumpleCcaa;
    }
    if (ok) activos.push(m.id);
  }
  return activos;
}
