/**
 * Tema visual elegido por la persona: claro, oscuro o el del sistema.
 * Se persiste aparte de la sesión (no contiene respuestas) y «Borrar datos»
 * también lo elimina: la promesa de borrar todo rastro local no admite
 * excepciones. Sin elección explícita manda prefers-color-scheme.
 */
export type Tema = 'sistema' | 'claro' | 'oscuro';

export const CLAVE_TEMA = 'espectro.v1.tema';

export function cargarTema(): Tema {
  try {
    const crudo = localStorage.getItem(CLAVE_TEMA);
    return crudo === 'claro' || crudo === 'oscuro' ? crudo : 'sistema';
  } catch {
    return 'sistema';
  }
}

export function aplicarTema(tema: Tema): void {
  const raiz = document.documentElement;
  if (tema === 'sistema') delete raiz.dataset.tema;
  else raiz.dataset.tema = tema;
}

export function guardarTema(tema: Tema): void {
  try {
    if (tema === 'sistema') localStorage.removeItem(CLAVE_TEMA);
    else localStorage.setItem(CLAVE_TEMA, tema);
  } catch {
    // Almacenamiento bloqueado: el tema funciona igual durante la sesión.
  }
}

export function siguienteTema(actual: Tema): Tema {
  return actual === 'sistema' ? 'claro' : actual === 'claro' ? 'oscuro' : 'sistema';
}

export function etiquetaTema(tema: Tema): string {
  return tema === 'sistema' ? 'Tema: sistema' : tema === 'claro' ? 'Tema: claro' : 'Tema: oscuro';
}
