/**
 * Proyección de partidos y referencias doctrinales al espacio de tres ejes
 * (Economía × Sociedad × Territorio) y a la vertical compuesta de poder de
 * la primera brújula, para los mapas 2D/3D de resultados.
 *
 * Las entidades se miden con el MISMO instrumento que el usuario: sus
 * posiciones documentadas ({itemId: {valor}}) se convierten a Respuesta[] y
 * pasan por calcularFacetas contra el banco completo de ítems.
 *
 * Inclusión POR PLANO: una entidad se dibuja en cada plano cuyo par de ejes
 * tenga evidencia suficiente (umbral de entidades del motor). Una referencia
 * honesta cuyos textos no hablan del eje territorial (Bad Godesberg) aparece
 * en Economía × Sociedad y no en los pares territoriales; el cubo 3D exige
 * los tres macroejes. La brújula Economía × Poder exige economía y evidencia
 * repartida entre al menos dos facetas de su vertical. Sin un par publicable,
 * la entidad queda fuera con su evidencia explicada. Nunca se inventan posiciones.
 *
 * Vive junto a datosResultados.ts: solo lo descarga el chunk de resultados.
 */
import {
  EJE_AUTORIDAD_POLITICA,
  EJES_ESPACIO,
  componerAutoridadPolitica,
  proyectarEnEspacio,
} from '@engine';
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

/** Vertical compuesta de la primera brújula; no sustituye la faceta GAL–TAN. */
export const EJE_PODER_BRUJULA: Eje = {
  id: EJE_AUTORIDAD_POLITICA,
  nombre: 'Poder político y libertades',
  poloNegativo: 'Libertades, pluralismo y poder distribuido',
  poloPositivo: 'Orden, jerarquía y poder concentrado',
  descripcion:
    'Composición transparente de GAL–TAN, pluralismo institucional, organización, libertades civiles, democracia directa, estatismo y tradición moral. Evita confundir laicismo con pluralismo o tradición con autoritarismo.',
};

/** Nombre corto de eje para rótulos: el llano de la interfaz (lecturaEjes). */
export const NOMBRE_CORTO_EJE: Record<string, string> = {
  ...NOMBRE_LLANO_EJE,
  [EJE_AUTORIDAD_POLITICA]: 'Poder',
};

function motivoDeFaceta(faceta: ResultadoFaceta): string {
  const nombre = NOMBRE_CORTO_EJE[faceta.facetaId] ?? faceta.facetaId;
  const cobertura = Math.round(faceta.cobertura * 100);
  return `${nombre}: ${faceta.itemsRespondidos} de ${faceta.itemsDisponibles} ítems del eje documentados (cobertura ${cobertura} %)`;
}

function motivoDeAutoridad(faceta: ResultadoFaceta): string {
  return `Poder: ${faceta.itemsRespondidos} observaciones repartidas entre las facetas componentes; se exigen al menos 4 y dos familias distintas`;
}

function clasificar(
  perfiles: PerfilAfinidad[],
  tipo: TipoEntidadMapa,
  dentro: EntidadMapa[],
  fuera: EntidadExcluida[],
): void {
  for (const perfil of perfiles) {
    if (perfil.publicacionMapa?.publicable === false) {
      fuera.push({
        id: perfil.id,
        nombre: nombrePerfil(perfil),
        tipo,
        motivos: [perfil.publicacionMapa.motivo],
      });
      continue;
    }
    const proyeccion = proyectarEnEspacio(perfil, ITEMS, EJES_MAPA);
    const facetasCompletas = proyectarEnEspacio(
      perfil,
      ITEMS,
      EJES,
      { minimoItems: 1, umbralCobertura: 0 },
    ).facetas;
    const autoridad = componerAutoridadPolitica(facetasCompletas, {
      minimoItems: 4,
      minimoComponentes: 2,
      umbralCobertura: 0,
    });
    const insuficientes = new Set(proyeccion.ejesInsuficientes);
    const suficientes = proyeccion.facetas.filter(
      (faceta) => !insuficientes.has(faceta.facetaId) && typeof faceta.valor === 'number',
    );
    const valores: Record<string, number> = {};
    for (const faceta of suficientes) valores[faceta.facetaId] = faceta.valor as number;
    if (autoridad.coberturaSuficiente && typeof autoridad.valor === 'number') {
      valores[EJE_AUTORIDAD_POLITICA] = autoridad.valor;
    }
    const paresDibujables = [
      ['economico', 'social'],
      ['economico', 'territorial'],
      ['social', 'territorial'],
      ['economico', EJE_AUTORIDAD_POLITICA],
    ] as const;
    if (paresDibujables.some(([x, y]) => typeof valores[x] === 'number' && typeof valores[y] === 'number')) {
      dentro.push({
        id: perfil.id,
        nombre: nombrePerfil(perfil),
        etiqueta: perfil.siglas ?? perfil.nombre,
        tipo,
        valores,
        ejesSuficientes: Object.keys(valores),
        facetas: [...proyeccion.facetas, autoridad],
      });
    } else {
      fuera.push({
        id: perfil.id,
        nombre: nombrePerfil(perfil),
        tipo,
        motivos: proyeccion.facetas
          .filter((faceta) => insuficientes.has(faceta.facetaId))
          .map(motivoDeFaceta)
          .concat(autoridad.coberturaSuficiente ? [] : [motivoDeAutoridad(autoridad)]),
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
  (entidad) => EJES_MAPA.every((eje) => entidad.ejesSuficientes.includes(eje.id)),
);

/** Entidades fuera de todo plano, con el detalle de la evidencia que les falta. */
export const EXCLUIDAS_MAPA: EntidadExcluida[] = fuera;

export const TOTAL_PARTIDOS_CATALOGO = PARTIDOS.length;
export const TOTAL_REFERENCIAS_CATALOGO = REFERENCIAS.length;
