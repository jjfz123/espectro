import { registerSW } from 'virtual:pwa-register';

export const EVENTO_ACTUALIZACION_PWA = 'espectro:actualizacion-disponible';

let aplicarActualizacion: (() => Promise<void>) | undefined;

/**
 * Registra el service worker generado por Vite. El modo `prompt` conserva la
 * versión actual hasta que la persona decide recargar, algo importante en un
 * cuestionario largo aunque las respuestas ya estén guardadas localmente.
 */
export function registrarPWA(): void {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;

  const actualizar = registerSW({
    immediate: true,
    onNeedRefresh: () => {
      window.dispatchEvent(new Event(EVENTO_ACTUALIZACION_PWA));
    },
    // Un fallo de registro nunca debe impedir usar la aplicación en línea.
    onRegisterError: () => undefined,
  });
  aplicarActualizacion = () => actualizar(true);
}

export async function actualizarPWA(): Promise<void> {
  await aplicarActualizacion?.();
}
