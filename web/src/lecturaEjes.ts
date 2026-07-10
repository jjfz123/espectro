/**
 * Lectura verbal de las puntuaciones de eje y textos de ayuda de la interfaz.
 *
 * Un «−83» no dice nada por sí solo: toda puntuación de eje se acompaña de
 * una lectura verbal anclada en los polos reales del eje (data/ejes.json).
 * El número queda como dato secundario, en cuerpo menor y cifras tabulares.
 *
 * Bandas cualitativas sobre |valor| (escala −100..+100):
 *   < 15  «En el centro»
 *   15–44 «Inclinación hacia {polo}»
 *   45–74 «Claramente hacia {polo}»
 *   ≥ 75  «En el polo {polo}»
 *
 * Este fichero es la única fuente de estas frases y de los recortes de polo:
 * ningún componente debe copiarse su propia versión.
 */
import type { Eje } from '@engine';

/** Etiqueta corta del polo: sin el paréntesis aclaratorio. */
export function poloCorto(texto: string): string {
  const i = texto.indexOf('(');
  return (i === -1 ? texto : texto.slice(0, i)).trim();
}

/**
 * Como poloCorto, pero con puntos de partición tras las barras para que en
 * pantallas estrechas el rótulo pueda partirse ahí (Verde/Alternativo/…).
 */
export function poloCortoPartible(texto: string): string {
  return poloCorto(texto).replace(/\//g, '/​');
}

/** Etiqueta mínima del polo: sin paréntesis y cortada en la primera coma. */
export function poloBreve(texto: string): string {
  const corto = poloCorto(texto);
  return (corto.split(',')[0] ?? corto).trim();
}

/** poloBreve con puntos de partición tras las barras (rótulos del cubo 3D). */
export function poloBrevePartible(texto: string): string {
  return poloBreve(texto).replace(/\//g, '/​');
}

export type BandaEje = 'centro' | 'inclinacion' | 'clara' | 'polo';

/** Banda cualitativa de un valor de eje en [−100, 100]. */
export function bandaEje(valor: number): BandaEje {
  const magnitud = Math.abs(valor);
  if (magnitud < 15) return 'centro';
  if (magnitud < 45) return 'inclinacion';
  if (magnitud < 75) return 'clara';
  return 'polo';
}

/**
 * Frase de lectura de un valor: banda cualitativa + texto del polo real.
 * Ejemplos: «En el polo Verde/Alternativo/Libertario», «Inclinación hacia
 * Derecha económica», «En el centro, entre ambos polos».
 */
export function lecturaEje(valor: number, eje: Eje): string {
  const banda = bandaEje(valor);
  if (banda === 'centro') return 'En el centro, entre ambos polos';
  const polo = poloBreve(valor < 0 ? eje.poloNegativo : eje.poloPositivo);
  if (banda === 'inclinacion') return `Inclinación hacia ${polo}`;
  if (banda === 'clara') return `Claramente hacia ${polo}`;
  return `En el polo ${polo}`;
}

/** Lectura completa para texto corrido o atributos aria: frase + número. */
export function lecturaEjeConNumero(valor: number, eje: Eje): string {
  const signo = Math.round(valor) > 0 ? '+' : Math.round(valor) < 0 ? '−' : '';
  return `${lecturaEje(valor, eje)} (${signo}${Math.abs(Math.round(valor))} de ±100)`;
}

/**
 * Explicaciones en castellano llano de los ejes del mapa, para el patrón de
 * ayuda «?» (mismo filete que el glosario del cuestionario). Son textos de
 * interfaz: no tocan data/ejes.json. Para el resto de facetas basta la
 * `descripcion` del propio eje.
 */
export const AYUDA_EJES_MAPA: Record<string, string> = {
  economico:
    'Eje económico clásico: desde la izquierda económica (redistribución, ' +
    'intervención del Estado) hasta la derecha económica (mercado, baja ' +
    'fiscalidad). Mide impuestos, gasto social, regulación laboral y papel ' +
    'del Estado en la economía.',
  social:
    'GAL-TAN es el eje social y cultural: desde las posiciones ' +
    'verdes/alternativas/libertarias (GAL) hasta las ' +
    'tradicionales/autoritarias/nacionalistas (TAN). Mide libertades ' +
    'personales, inmigración, orden y moral pública — no economía.',
  territorial:
    'Eje territorial: desde la máxima descentralización, incluido el derecho ' +
    'a decidir, hasta la máxima centralización estatal. Mide el reparto del ' +
    'poder entre el Estado y los territorios, el rasgo distintivo del ' +
    'sistema de partidos español.',
};

/** Explicación llana de un eje: la de interfaz si existe, si no su descripción. */
export function ayudaEje(eje: Eje): string | undefined {
  return AYUDA_EJES_MAPA[eje.id] ?? eje.descripcion;
}
