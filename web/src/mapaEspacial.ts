/**
 * Proyección de partidos y referencias doctrinales al espacio de tres ejes
 * (Economía × Sociedad × Territorio) para el mapa 2D/3D de resultados.
 *
 * Las entidades se miden con el MISMO instrumento que el usuario: sus
 * posiciones documentadas ({itemId: {valor}}) se convierten a Respuesta[] y
 * pasan por calcularFacetas contra el banco completo de ítems.
 *
 * Inclusión POR PLANO: una entidad se dibuja en cada plano cuyo par de ejes
 * tenga evidencia suficiente (umbral de entidades del motor). Una referencia
 * honesta cuyos textos no hablan del eje territorial (Bad Godesberg) aparece
 * en Economía × Sociedad y no en los pares territoriales; el cubo 3D exige
 * los tres ejes. Con menos de dos ejes suficientes no hay plano posible y la
 * entidad queda fuera, con su evidencia explicada. Nunca se inventan
 * posiciones.
 *
 * Vive junto a datosResultados.ts: solo lo descarga el chunk de resultados.
 */
import { EJES_ESPACIO, proyectarEnEspacio } from '@engine';
import type { Eje, PerfilAfinidad, ResultadoFaceta } from '@engine';
import { EJES, ITEMS, nombrePerfil } from './datos';
import { PARTIDOS, REFERENCIAS } from './datosResultados';
import { NOMBRE_LLANO_EJE } from './lecturaEjes';

export type TipoEntidadMapa = 'partido' | 'referencia';

export interface EntidadMapa {
  id: string;
  nombre: string;
  /** Rótulo corto para el plano (siglas si existen). */
  etiqueta: string;
  tipo: TipoEntidadMapa;
  /** Posición por eje en [-100, 100], solo ejes con evidencia suficiente. */
  valores: Record<string, number>;
  /** Ids de los ejes cuya evidencia supera el umbral de entidades. */
  ejesSuficientes: string[];
  /** Evidencia por eje para tooltips y auditoría. */
  facetas: ResultadoFaceta[];
}

export interface EntidadExcluida {
  id: string;
  nombre: string;
  tipo: TipoEntidadMapa;
  /** Un motivo legible por cada eje sin evidencia suficiente. */
  motivos: string[];
}

/** Los tres macro-ejes del mapa, en el orden de data/ejes.json. */
export const EJES_MAPA: Eje[] = EJES.filter((eje) =>
  (EJES_ESPACIO as readonly string[]).includes(eje.id),
);

/** Nombre corto de eje para rótulos: el llano de la interfaz (lecturaEjes). */
export const NOMBRE_CORTO_EJE: Record<string, string> = NOMBRE_LLANO_EJE;

function motivoDeFaceta(faceta: ResultadoFaceta): string {
  const nombre = NOMBRE_CORTO_EJE[faceta.facetaId] ?? faceta.facetaId;
  const cobertura = Math.round(faceta.cobertura * 100);
  return `${nombre}: ${faceta.itemsRespondidos} de ${faceta.itemsDisponibles} ítems del eje documentados (cobertura ${cobertura} %)`;
}

function clasificar(
  perfiles: PerfilAfinidad[],
  tipo: TipoEntidadMapa,
  dentro: EntidadMapa[],
  fuera: EntidadExcluida[],
): void {
  for (const perfil of perfiles) {
    const proyeccion = proyectarEnEspacio(perfil, ITEMS, EJES_MAPA);
    const insuficientes = new Set(proyeccion.ejesInsuficientes);
    const suficientes = proyeccion.facetas.filter(
      (faceta) => !insuficientes.has(faceta.facetaId) && typeof faceta.valor === 'number',
    );
    // Con dos ejes suficientes ya existe al menos un plano donde dibujarla.
    if (suficientes.length >= 2) {
      const valores: Record<string, number> = {};
      for (const faceta of suficientes) valores[faceta.facetaId] = faceta.valor as number;
      dentro.push({
        id: perfil.id,
        nombre: nombrePerfil(perfil),
        etiqueta: perfil.siglas ?? perfil.nombre,
        tipo,
        valores,
        ejesSuficientes: suficientes.map((faceta) => faceta.facetaId),
        facetas: proyeccion.facetas,
      });
    } else {
      fuera.push({
        id: perfil.id,
        nombre: nombrePerfil(perfil),
        tipo,
        motivos: proyeccion.facetas
          .filter((faceta) => insuficientes.has(faceta.facetaId))
          .map(motivoDeFaceta),
      });
    }
  }
}

const dentro: EntidadMapa[] = [];
const fuera: EntidadExcluida[] = [];
clasificar(PARTIDOS, 'partido', dentro, fuera);
clasificar(REFERENCIAS, 'referencia', dentro, fuera);

/** Entidades dibujables en al menos un plano (≥2 ejes con evidencia). */
export const ENTIDADES_MAPA: EntidadMapa[] = dentro;

/** Entidades con los tres ejes suficientes: las únicas que entran al cubo 3D. */
export const ENTIDADES_CUBO: EntidadMapa[] = dentro.filter(
  (entidad) => entidad.ejesSuficientes.length === EJES_MAPA.length,
);

/** Entidades fuera de todo plano, con el detalle de la evidencia que les falta. */
export const EXCLUIDAS_MAPA: EntidadExcluida[] = fuera;

export const TOTAL_PARTIDOS_CATALOGO = PARTIDOS.length;
export const TOTAL_REFERENCIAS_CATALOGO = REFERENCIAS.length;
