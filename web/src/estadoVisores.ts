/** Señal efímera para recuperar el 3D después de una recarga intencional. */
export const CLAVE_REABRIR_3D = 'espectro.reabrir-3d';

/** Leer no consume la señal: MapaPolitico la elimina cuando llega a montar. */
export function hayReapertura3DPendiente(): boolean {
  try {
    return sessionStorage.getItem(CLAVE_REABRIR_3D) === '1';
  } catch {
    return false;
  }
}
