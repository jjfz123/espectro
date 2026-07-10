import { calcularFacetas } from './ideologia.js';
import type { OpcionesFacetas } from './ideologia.js';
import type { Eje, Item, PerfilAfinidad, Respuesta, ResultadoFaceta } from './types.js';

/**
 * Espacio político de tres macro-ejes (docs/investigacion/ESPACIO-EJES.md):
 * económico (izquierda-derecha), social/cultural (GAL-TAN) y territorial
 * (centro-periferia). El mapa 2D principal cruza económico × GAL-TAN.
 */
export const EJES_ESPACIO = ['economico', 'social', 'territorial'] as const;

export type EjeEspacio = (typeof EJES_ESPACIO)[number];

/** Proyección de una entidad (partido o referencia doctrinal) al espacio de ejes. */
export interface ProyeccionEspacial {
  entidadId: string;
  /**
   * true solo si TODAS las facetas pedidas superan el mínimo de evidencia de
   * `calcularFacetas` (nº de ítems y cobertura de carga). Una entidad no
   * incluida nunca debe dibujarse en el mapa: no se inventan posiciones.
   */
  incluida: boolean;
  /** Medición completa por eje, con evidencia explícita, para auditar la decisión. */
  facetas: ResultadoFaceta[];
  /** Ejes cuya evidencia documental no alcanza el umbral. */
  ejesInsuficientes: string[];
}

/**
 * Convierte las `posiciones` documentadas de un perfil ({itemId: {valor}}) en
 * el mismo formato de respuestas que produce el cuestionario del usuario:
 * prerrequisito para medir a usuario, partidos y arquetipos con el mismo
 * instrumento (principio CSES).
 */
export function respuestasDePosiciones(
  posiciones: PerfilAfinidad['posiciones'],
): Respuesta[] {
  return Object.entries(posiciones).map(([itemId, posicion]) => ({
    itemId,
    valor: posicion.valor,
  }));
}

/**
 * Sitúa un perfil en el espacio de ejes pasando sus posiciones documentadas
 * por `calcularFacetas` contra el banco de ítems indicado (para el mapa, el
 * banco completo). La cobertura mide así qué parte de la carga total del eje
 * está documentada, no cuántas posiciones tiene la ficha.
 */
export function proyectarEnEspacio(
  perfil: PerfilAfinidad,
  items: Item[],
  ejes: Eje[],
  opciones: OpcionesFacetas = {},
): ProyeccionEspacial {
  const facetas = calcularFacetas(
    respuestasDePosiciones(perfil.posiciones),
    items,
    ejes,
    opciones,
  );
  const ejesInsuficientes = facetas
    .filter((faceta) => faceta.valor === null || !faceta.coberturaSuficiente)
    .map((faceta) => faceta.facetaId);
  return {
    entidadId: perfil.id,
    incluida: ejesInsuficientes.length === 0,
    facetas,
    ejesInsuficientes,
  };
}

/**
 * Distancia euclídea entre dos posiciones sobre los ejes indicados, en las
 * mismas unidades que los ejes (−100..+100). Devuelve null si a alguna de las
 * dos posiciones le falta un eje: la cercanía no se estima con huecos.
 * Es una medida geométrica orientativa, no un porcentaje de acuerdo.
 */
export function distanciaEspacial(
  a: Record<string, number | null | undefined>,
  b: Record<string, number | null | undefined>,
  ejes: readonly string[],
): number | null {
  let suma = 0;
  for (const eje of ejes) {
    const va = a[eje];
    const vb = b[eje];
    if (typeof va !== 'number' || typeof vb !== 'number') return null;
    suma += (va - vb) ** 2;
  }
  return Math.sqrt(suma);
}
