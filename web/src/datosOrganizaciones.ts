/** Datos electorales y organizativos que necesita el resultado básico. */
import type { ConvocatoriaElectoral, Partido, Sindicato } from '@engine';

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

const modulosSindicatos = import.meta.glob('../../data/sindicatos/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>;

export const SINDICATOS: Sindicato[] = Object.entries(modulosSindicatos)
  .filter(([ruta]) => !ruta.split('/').at(-1)?.startsWith('_'))
  .sort(([rutaA], [rutaB]) => rutaA.localeCompare(rutaB))
  .map(([, contenido]) => contenido as Sindicato);
