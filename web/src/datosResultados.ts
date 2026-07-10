/**
 * Datos que solo necesita la vista de resultados y su catálogo: perfiles de
 * partidos, sindicatos, referencias doctrinales y convocatorias electorales.
 * Se importan desde el chunk perezoso de resultados para que la carga inicial
 * (portada y cuestionario) no los descargue. Siguen viajando dentro del build:
 * no hay ninguna petición de datos en ejecución (requisito de privacidad).
 */
import type {
  ConvocatoriaElectoral,
  Partido,
  ReferenciaDoctrinal,
  Sindicato,
} from '@engine';

const modulosPartidos = import.meta.glob('../../data/partidos/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>;

const todosLosPartidos: Partido[] = Object.entries(modulosPartidos)
  .filter(([ruta]) => !ruta.split('/').at(-1)?.startsWith('_'))
  .sort(([rutaA], [rutaB]) => rutaA.localeCompare(rutaB))
  .map(([, contenido]) => contenido as Partido);

/** Los perfiles ficticios solo sirven para tests y no entran en producción. */
export const PARTIDOS: Partido[] = todosLosPartidos.filter((partido) => !partido.demo);

const modulosConvocatorias = import.meta.glob('../../data/convocatorias/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>;

export const CONVOCATORIAS: ConvocatoriaElectoral[] = Object.entries(modulosConvocatorias)
  .filter(([ruta]) => !ruta.split('/').at(-1)?.startsWith('_'))
  .sort(([rutaA], [rutaB]) => rutaA.localeCompare(rutaB))
  .map(([, contenido]) => contenido as ConvocatoriaElectoral);

const modulosReferencias = import.meta.glob('../../data/referencias/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>;

export const REFERENCIAS: ReferenciaDoctrinal[] = Object.entries(modulosReferencias)
  .filter(([ruta]) => !ruta.split('/').at(-1)?.startsWith('_'))
  .sort(([rutaA], [rutaB]) => rutaA.localeCompare(rutaB))
  .map(([, contenido]) => contenido as ReferenciaDoctrinal);

const modulosSindicatos = import.meta.glob('../../data/sindicatos/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>;

export const SINDICATOS: Sindicato[] = Object.entries(modulosSindicatos)
  .filter(([ruta]) => !ruta.split('/').at(-1)?.startsWith('_'))
  .sort(([rutaA], [rutaB]) => rutaA.localeCompare(rutaB))
  .map(([, contenido]) => contenido as Sindicato);
