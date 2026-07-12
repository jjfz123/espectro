/**
 * Referencias doctrinales: se descargan solo al abrir atlas o comparación.
 * Viajan en payload ligero: el plugin de build poda justificacion/fuente de
 * cada posición porque ninguna vista los muestra (los recibos íntegros viven
 * en data/ y los verifica CI); ver docs/PRODUCCION-APP.md.
 */
import type { ReferenciaDoctrinal } from '@engine';

const modulosReferencias = import.meta.glob('../../data/referencias/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>;

export const REFERENCIAS: ReferenciaDoctrinal[] = Object.entries(modulosReferencias)
  .filter(([ruta]) => !ruta.split('/').at(-1)?.startsWith('_'))
  .sort(([rutaA], [rutaB]) => rutaA.localeCompare(rutaB))
  .map(([, contenido]) => contenido as ReferenciaDoctrinal);
