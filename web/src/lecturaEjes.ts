/**
 * Lectura verbal de las puntuaciones de eje y textos de ayuda de la interfaz.
 *
 * Un «−83» no dice nada por sí solo: toda puntuación de eje se acompaña de
 * una lectura verbal anclada en los polos del eje. En los tres macro-ejes
 * del mapa los polos y nombres de interfaz son llanos (POLOS_LLANOS_EJE);
 * en el resto de facetas se usan los de data/ejes.json. El número queda
 * como dato secundario, en cuerpo menor y cifras tabulares.
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

/**
 * Nombres llanos de los tres macro-ejes del mapa en la superficie de la
 * interfaz. data/ejes.json conserva intactos los nombres académicos (eje
 * económico, GAL-TAN, centro-periferia): aquí solo se decide cómo se llaman
 * de cara al usuario. La jerga politológica queda como nota dentro del panel
 * de ayuda «?» (AYUDA_EJES_MAPA), nunca como título.
 */
export const NOMBRE_LLANO_EJE: Record<string, string> = {
  economico: 'Economía',
  social: 'Sociedad',
  territorial: 'Territorio',
  'propiedad-mercado': 'Propiedad y mercado',
  'autoridad-politica': 'Poder',
};

/**
 * Polos llanos de los macro-ejes, misma dirección que data/ejes.json
 * (negativo → positivo). Descriptivos y sin carga valorativa: «Orden y
 * tradición», no «autoritario».
 */
export const POLOS_LLANOS_EJE: Record<string, { negativo: string; positivo: string }> = {
  economico: {
    negativo: 'Izquierda (más redistribución)',
    positivo: 'Derecha (más mercado)',
  },
  social: {
    negativo: 'Libertades y diversidad',
    positivo: 'Orden y tradición',
  },
  territorial: {
    negativo: 'Más autogobierno',
    positivo: 'Más centralización',
  },
  'propiedad-mercado': {
    negativo: 'Propiedad social o cooperativa',
    positivo: 'Propiedad privada y mercados',
  },
};

/** Nombre de eje para la interfaz: el llano si existe, si no el del dato. */
export function nombreLlanoEje(eje: Eje): string {
  return NOMBRE_LLANO_EJE[eje.id] ?? eje.nombre;
}

/** Texto de polo para la interfaz: el llano si existe, si no el del dato. */
export function poloLlano(eje: Eje, signo: 'negativo' | 'positivo'): string {
  const polos = POLOS_LLANOS_EJE[eje.id];
  if (polos) return polos[signo];
  return signo === 'negativo' ? eje.poloNegativo : eje.poloPositivo;
}

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
 * Frase de lectura de un valor: banda cualitativa + polo de interfaz (el
 * llano en los macro-ejes del mapa, el del dato en el resto de facetas).
 * Ejemplos: «En el polo Orden y tradición», «Inclinación hacia Izquierda»,
 * «En el centro, entre ambos polos».
 */
export function lecturaEje(valor: number, eje: Eje): string {
  const banda = bandaEje(valor);
  if (banda === 'centro') return 'En el centro, entre ambos polos';
  const polo = poloBreve(poloLlano(eje, valor < 0 ? 'negativo' : 'positivo'));
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
 * interfaz: no tocan data/ejes.json. La jerga académica va aquí dentro, como
 * nota final, nunca en la superficie del mapa. Para el resto de facetas
 * basta la `descripcion` del propio eje.
 */
export const AYUDA_EJES_MAPA: Record<string, string> = {
  economico:
    'Mide impuestos, gasto social, regulación laboral y papel del Estado en ' +
    'la economía: desde la izquierda (más redistribución, más intervención ' +
    'pública) hasta la derecha (más mercado, menos impuestos). Es el eje ' +
    'izquierda-derecha económico clásico.',
  social:
    'Mide libertades personales, diversidad, inmigración, orden público y ' +
    'moral pública — no economía. Va del polo Libertades y diversidad al ' +
    'polo Orden y tradición. Los politólogos llaman a este eje GAL-TAN: de ' +
    'Verde/Alternativo/Libertario (GAL) a Tradicional/Autoritario/' +
    'Nacionalista (TAN).',
  territorial:
    'Mide el reparto del poder entre el Estado y los territorios: desde más ' +
    'autogobierno, incluido el derecho a decidir, hasta más centralización ' +
    'estatal. Es el rasgo distintivo del sistema de partidos español; los ' +
    'politólogos lo llaman eje centro-periferia.',
  'propiedad-mercado':
    'Mide quién posee y dirige la producción y cuánto se coordina mediante ' +
    'mercados. El polo social incluye propiedad pública, social y cooperativa; ' +
    'el privado incluye propiedad empresarial y elección de mercado. No mide ' +
    'por sí solo impuestos, proteccionismo ni tamaño del Estado: esas posiciones ' +
    'se conservan en facetas distintas.',
};

/** Explicación llana de un eje: la de interfaz si existe, si no su descripción. */
export function ayudaEje(eje: Eje): string | undefined {
  return AYUDA_EJES_MAPA[eje.id] ?? eje.descripcion;
}
