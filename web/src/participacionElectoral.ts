import type { SeleccionElectoral } from '@engine';

/**
 * Contexto de participación para el ranking: si un perfil solo aparece en la
 * convocatoria como COMPONENTE de una candidatura (sin papeleta identificada
 * como propia vía misma-organizacion / organizacion-territorial / coalicion),
 * se le añade una línea que dice dentro de qué candidatura concurre. Motivo de
 * producto (tanda de la familia comunista + caso Madrid): tu mayor afinidad
 * puede ser un partido que no encontrarás como papeleta con su nombre.
 * La redacción es puramente factual («concurre dentro de…»): no afirma que la
 * marca líder de una lista conjunta carezca de papeleta.
 */
const RELACIONES_CON_PAPELETA = new Set(['misma-organizacion', 'organizacion-territorial', 'coalicion']);

export function contextoParticipacionPorPartido(
  seleccion: Pick<SeleccionElectoral, 'candidaturas'>,
): Map<string, string> {
  const conPapeletaPropia = new Set<string>();
  const componenteDe = new Map<string, string>();
  for (const candidatura of seleccion.candidaturas) {
    for (const relacion of candidatura.perfilRelaciones ?? []) {
      if (RELACIONES_CON_PAPELETA.has(relacion.relacion)) {
        conPapeletaPropia.add(relacion.perfilId);
      } else if (relacion.relacion === 'componente' && !componenteDe.has(relacion.perfilId)) {
        componenteDe.set(relacion.perfilId, candidatura.siglas ?? candidatura.nombre);
      }
    }
  }
  const contexto = new Map<string, string>();
  for (const [perfilId, papeleta] of componenteDe) {
    if (conPapeletaPropia.has(perfilId)) continue;
    contexto.set(
      perfilId,
      `En esta convocatoria concurre dentro de la candidatura ${papeleta}.`,
    );
  }
  return contexto;
}
