/**
 * Módulo del atlas: completa la proyección ligera (mapaEspacialLigero.ts, la
 * única fuente de la metodología y de los umbrales) con las referencias
 * doctrinales. Importa datosReferencias, así que SOLO deben descargarlo los
 * chunks bajo demanda (MapaPolitico, Mapa3D, zonas del atlas); el chunk de
 * resultados usa el módulo ligero. Aquí no se define ninguna regla nueva:
 * las referencias pasan por la misma clasificarEntidadesEspacio que los
 * partidos para que ambas vistas no puedan divergir.
 */
import { REFERENCIAS } from './datosReferencias';
import {
  clasificarEntidadesEspacio,
  EJES_MAPA,
  ENTIDADES_MAPA_PARTIDOS,
  EXCLUIDAS_MAPA_PARTIDOS,
} from './mapaEspacialLigero';
import type { EntidadExcluida, EntidadMapa } from './mapaEspacialLigero';

export {
  EJES_MAPA,
  EJE_ECONOMIA_BRUJULA,
  EJE_PODER_BRUJULA,
  NOMBRE_CORTO_EJE,
  TOTAL_PARTIDOS_CATALOGO,
} from './mapaEspacialLigero';
export type { EntidadExcluida, EntidadMapa, TipoEntidadMapa } from './mapaEspacialLigero';

const referenciasClasificadas = clasificarEntidadesEspacio(REFERENCIAS, 'referencia');

/** Entidades dibujables en al menos un plano (≥2 ejes con evidencia). */
export const ENTIDADES_MAPA: EntidadMapa[] = [
  ...ENTIDADES_MAPA_PARTIDOS,
  ...referenciasClasificadas.dentro,
];

/** Entidades con los tres ejes suficientes: las únicas que entran al cubo 3D. */
export const ENTIDADES_CUBO: EntidadMapa[] = ENTIDADES_MAPA.filter(
  (entidad) => EJES_MAPA.every((eje) => entidad.ejesSuficientes.includes(eje.id)),
);

/** Entidades fuera de todo plano, con el detalle de la evidencia que les falta. */
export const EXCLUIDAS_MAPA: EntidadExcluida[] = [
  ...EXCLUIDAS_MAPA_PARTIDOS,
  ...referenciasClasificadas.fuera,
];

export const TOTAL_REFERENCIAS_CATALOGO = REFERENCIAS.length;
