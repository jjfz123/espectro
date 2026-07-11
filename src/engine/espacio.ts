import { calcularFacetas } from './ideologia.js';
import type { OpcionesFacetas } from './ideologia.js';
import type { Eje, Item, PerfilAfinidad, Respuesta, ResultadoFaceta } from './types.js';

/**
 * Espacio político de tres macro-ejes (docs/investigacion/ESPACIO-EJES.md):
 * económico (izquierda-derecha), social/cultural (GAL-TAN) y territorial
 * (centro-periferia). Los planos detallados y el cubo conservan esos tres
 * ejes; la primera brújula añade una vertical compuesta de poder político.
 */
export const EJES_ESPACIO = ['economico', 'social', 'territorial'] as const;

export type EjeEspacio = (typeof EJES_ESPACIO)[number];

/** Id del eje compuesto usado solo por la brújula clásica Economía × Poder. */
export const EJE_AUTORIDAD_POLITICA = 'autoridad-politica' as const;

/**
 * La vertical del political compass no equivale al GAL–TAN cultural. Se
 * compone con varias facetas ya medidas para no colocar como libertaria una
 * doctrina laica pero de partido único, ni como autoritaria una doctrina
 * tradicional que respeta pluralismo y libertades civiles.
 *
 * `sentido` orienta cada faceta hacia +100 = poder concentrado/orden y
 * -100 = libertades/pluralismo/poder distribuido. Los pesos son editoriales
 * y públicos; el factor de evidencia (hasta ×2) se aplica después.
 */
export const COMPONENTES_AUTORIDAD_POLITICA = [
  { facetaId: 'social', peso: 1, sentido: 1 },
  { facetaId: 'pluralismo-institucional', peso: 1.1, sentido: -1 },
  { facetaId: 'organizacion', peso: 1.2, sentido: 1 },
  { facetaId: 'libertades-civiles', peso: 0.9, sentido: -1 },
  { facetaId: 'democracia-directa', peso: 0.25, sentido: -1 },
  { facetaId: 'estatismo', peso: 0.6, sentido: 1 },
  { facetaId: 'tradicion-moral', peso: 0.4, sentido: 1 },
] as const;

export interface OpcionesAutoridadPolitica {
  /** Evidencia agregada mínima entre las facetas componentes (por defecto 4). */
  minimoItems?: number;
  /** Nº mínimo de facetas distintas con opinión (por defecto 2). */
  minimoComponentes?: number;
  /** Cobertura ponderada mínima para una persona (por defecto 0.35). */
  umbralCobertura?: number;
}

function redondearCompuesto(valor: number, decimales: number): number {
  const factor = 10 ** decimales;
  return Math.round(valor * factor) / factor;
}

/**
 * Compone la vertical Poder–Libertades desde facetas calculadas. No reusa la
 * prioridad subjetiva del matching y no inventa valores para componentes sin
 * evidencia. `sqrt(items)` aumenta el peso de una faceta mejor documentada,
 * con tope ×2 para que un bloque largo no borre el resto del constructo.
 */
export function componerAutoridadPolitica(
  facetas: ResultadoFaceta[],
  opciones: OpcionesAutoridadPolitica = {},
): ResultadoFaceta {
  const minimoItems = opciones.minimoItems ?? 4;
  const minimoComponentes = opciones.minimoComponentes ?? 2;
  const umbralCobertura = opciones.umbralCobertura ?? 0.35;
  const porId = new Map(facetas.map((faceta) => [faceta.facetaId, faceta]));
  let sumaOrientada = 0;
  let pesoTotal = 0;
  let coberturaPonderada = 0;
  let itemsRespondidos = 0;
  let itemsDisponibles = 0;
  let componentes = 0;

  for (const componente of COMPONENTES_AUTORIDAD_POLITICA) {
    const faceta = porId.get(componente.facetaId);
    if (!faceta || typeof faceta.valor !== 'number' || faceta.itemsRespondidos === 0) continue;
    const factorEvidencia = Math.min(2, Math.sqrt(faceta.itemsRespondidos));
    const peso = componente.peso * factorEvidencia;
    sumaOrientada += (faceta.valor / 100) * componente.sentido * peso;
    pesoTotal += peso;
    coberturaPonderada += faceta.cobertura * peso;
    itemsRespondidos += faceta.itemsRespondidos;
    itemsDisponibles += faceta.itemsDisponibles;
    componentes += 1;
  }

  const cobertura = pesoTotal > 0 ? coberturaPonderada / pesoTotal : 0;
  const valor =
    pesoTotal > 0 ? redondearCompuesto((100 * sumaOrientada) / pesoTotal, 1) : null;
  const evidenciaSuficiente =
    valor !== null &&
    componentes >= minimoComponentes &&
    itemsRespondidos >= minimoItems &&
    cobertura >= umbralCobertura;

  return {
    facetaId: EJE_AUTORIDAD_POLITICA,
    valor,
    itemsRespondidos,
    itemsDisponibles,
    cargaRespondida: redondearCompuesto(pesoTotal, 4),
    cargaDisponible: redondearCompuesto(
      cobertura > 0 ? pesoTotal / cobertura : pesoTotal,
      4,
    ),
    numerador: redondearCompuesto(2 * sumaOrientada, 4),
    denominador: redondearCompuesto(2 * pesoTotal, 4),
    cobertura: redondearCompuesto(cobertura, 3),
    coberturaSuficiente: evidenciaSuficiente,
  };
}

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
 * Umbral de evidencia para situar ENTIDADES (partidos, referencias) en el mapa.
 *
 * A diferencia del usuario —que recorre un cuestionario y cuya cobertura se
 * mide contra lo administrado—, una ficha documenta posiciones sueltas contra
 * el banco completo: exigirle un porcentaje de toda la carga del eje (54 ítems
 * cargan económico) la excluiría siempre. La vara para entidades es un mínimo
 * absoluto de posiciones documentadas con carga en el eje (≥4), sin ratio
 * sobre el banco; la interfaz muestra el nº de ítems que sostiene cada punto.
 */
export const UMBRAL_EVIDENCIA_ENTIDADES: OpcionesFacetas = {
  minimoItems: 4,
  umbralCobertura: 0,
};

/**
 * Sitúa un perfil en el espacio de ejes pasando sus posiciones documentadas
 * por `calcularFacetas` contra el banco de ítems indicado (para el mapa, el
 * banco completo), con el umbral de evidencia de entidades por defecto.
 */
export function proyectarEnEspacio(
  perfil: PerfilAfinidad,
  items: Item[],
  ejes: Eje[],
  opciones: OpcionesFacetas = UMBRAL_EVIDENCIA_ENTIDADES,
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
