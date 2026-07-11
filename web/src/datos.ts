/**
 * Capa de datos del cuestionario: banco de ítems, ejes, módulos y glosario,
 * importados en tiempo de build. Los perfiles de partidos, sindicatos,
 * referencias y convocatorias viven en datosResultados.ts y solo se descargan
 * con la vista de resultados. No hay ninguna petición de red en ejecución:
 * todo viaja dentro del propio build (requisito de privacidad).
 */
import { itemVisible } from '@engine';
import type { Eje, Item, Modulo, PerfilAfinidad, Valor } from '@engine';
import type { TipoEleccion } from '@engine';

/** Número de perfiles reales (sin demos), inyectado en tiempo de build. */
declare const __PERFILES_REALES__: number | undefined;

export const PERFILES_REALES: number =
  typeof __PERFILES_REALES__ === 'number' ? __PERFILES_REALES__ : 0;

import ejesJson from '@data/ejes.json';
import modulosJson from '@data/modulos.json';
import glosarioJson from '@data/glosario.json';
import versionJson from '@data/version.json';
import rapidoJson from '@data/rapido.json';

export const VERSION_INSTRUMENTO = versionJson.versionInstrumento;
export const FECHA_CORTE_DATOS = versionJson.fechaCorte;

export const EJES = ejesJson as unknown as Eje[];

export const MODULOS = ([...(modulosJson as unknown as Modulo[])] as Modulo[]).sort(
  (a, b) => (a.orden ?? 99) - (b.orden ?? 99),
);

const modulosItems = import.meta.glob('../../data/items/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>;

/**
 * El manifiesto se genera desde el propio directorio para que un JSON nuevo no
 * pueda validar en CI y quedar accidentalmente fuera del producto.
 */
const bancoBruto = Object.entries(modulosItems)
  .sort(([rutaA], [rutaB]) => rutaA.localeCompare(rutaB))
  .flatMap(([, contenido]) => contenido as Item[]);

/** Banco completo, sin los ítems retirados. */
export const ITEMS: Item[] = bancoBruto.filter((i) => i.estado !== 'retirado');

export const ITEM_POR_ID: ReadonlyMap<string, Item> = new Map(ITEMS.map((i) => [i.id, i]));

export const ITEMS_POR_MODULO: ReadonlyMap<string, Item[]> = (() => {
  const mapa = new Map<string, Item[]>();
  for (const m of MODULOS) mapa.set(m.id, []);
  for (const item of ITEMS) {
    const lista = mapa.get(item.modulo);
    if (lista) lista.push(item);
  }
  return mapa;
})();

export const MODULO_POR_ID: ReadonlyMap<string, Modulo> = new Map(MODULOS.map((m) => [m.id, m]));

/* ————— Glosario ————— */

export interface TerminoGlosario {
  id: string;
  termino: string;
  definicion: string;
  url: string;
}

export const GLOSARIO_POR_ID: ReadonlyMap<string, TerminoGlosario> = new Map(
  (glosarioJson as TerminoGlosario[]).map((t) => [t.id, t]),
);

/** Términos del glosario que usa un ítem, en el orden en que los declara. */
export function terminosDeItem(item: Item): TerminoGlosario[] {
  if (!item.terminos) return [];
  return item.terminos
    .map((id) => GLOSARIO_POR_ID.get(id))
    .filter((t): t is TerminoGlosario => t !== undefined);
}

/**
 * Ampliación de 2026: diez discriminantes generales añadidos al final del
 * recorrido rápido. Mantener el orden explícito evita desplazar las primeras
 * cuarenta preguntas en sesiones ya empezadas.
 */
export const IDS_AMPLIACION_NUCLEO = rapidoJson.idsAmpliacion2026;

/** Orden canónico versionado: no depende del orden de los ficheros ni del glob de Vite. */
export const ITEMS_NUCLEO: Item[] = rapidoJson.ids
  .map((id) => ITEM_POR_ID.get(id))
  .filter((item): item is Item => item !== undefined);

/**
 * Secuencia de ítems de una sesión: el núcleo y, detrás, los módulos activos
 * en su orden natural.
 */
export { itemVisible };

export function secuenciaItems(
  modulosActivos: string[],
  respuestas: Readonly<Record<string, Valor | null>> = {},
): Item[] {
  const activos = new Set(modulosActivos);
  const secuencia: Item[] = [...ITEMS_NUCLEO];
  for (const m of MODULOS) {
    if (m.id === 'nucleo' || !activos.has(m.id)) continue;
    secuencia.push(...(ITEMS_POR_MODULO.get(m.id) ?? []));
  }
  return secuencia.filter((item) => itemVisible(item, respuestas));
}

/* ————— Vocabulario de la interfaz ————— */

export const ESCALA: { valor: Valor; etiqueta: string }[] = [
  { valor: -2, etiqueta: 'Muy en desacuerdo' },
  { valor: -1, etiqueta: 'En desacuerdo' },
  { valor: 0, etiqueta: 'Neutral' },
  { valor: 1, etiqueta: 'De acuerdo' },
  { valor: 2, etiqueta: 'Muy de acuerdo' },
];

const ETIQUETA_POR_VALOR = new Map(ESCALA.map((e) => [e.valor, e.etiqueta]));

export function etiquetaValor(valor: Valor): string {
  return ETIQUETA_POR_VALOR.get(valor) ?? String(valor);
}

export const ELECCIONES: { id: TipoEleccion; nombre: string }[] = [
  { id: 'generales', nombre: 'Elecciones generales' },
  { id: 'autonomicas', nombre: 'Elecciones autonómicas' },
  { id: 'municipales', nombre: 'Elecciones municipales' },
  { id: 'europeas', nombre: 'Elecciones europeas' },
];

/** Los ids en minúsculas son los que usan los desbloqueos de módulo por CCAA. */
export const COMUNIDADES: { id: string; nombre: string }[] = [
  { id: 'andalucia', nombre: 'Andalucía' },
  { id: 'aragon', nombre: 'Aragón' },
  { id: 'asturias', nombre: 'Asturias' },
  { id: 'canarias', nombre: 'Canarias' },
  { id: 'cantabria', nombre: 'Cantabria' },
  { id: 'castilla-la-mancha', nombre: 'Castilla-La Mancha' },
  { id: 'castilla-y-leon', nombre: 'Castilla y León' },
  { id: 'catalunya', nombre: 'Catalunya' },
  { id: 'ceuta', nombre: 'Ceuta' },
  { id: 'comunitat-valenciana', nombre: 'Comunitat Valenciana' },
  { id: 'euskadi', nombre: 'Euskadi' },
  { id: 'extremadura', nombre: 'Extremadura' },
  { id: 'galicia', nombre: 'Galicia' },
  { id: 'illes-balears', nombre: 'Illes Balears' },
  { id: 'la-rioja', nombre: 'La Rioja' },
  { id: 'madrid', nombre: 'Comunidad de Madrid' },
  { id: 'melilla', nombre: 'Melilla' },
  { id: 'murcia', nombre: 'Región de Murcia' },
  { id: 'navarra', nombre: 'Navarra' },
];

export function nombreComunidad(id: string): string | undefined {
  return COMUNIDADES.find((c) => c.id === id)?.nombre;
}

/**
 * Nombre de partido para la interfaz: los partidos de demostración llevan
 * «(DEMO)» en el propio dato, pero en pantalla ya lo señala la insignia.
 */
export function nombrePerfil(perfil: PerfilAfinidad): string {
  const nombre = perfil.demo
    ? perfil.nombre.replace(/\s*\(DEMO\)\s*/g, ' ').trim()
    : perfil.nombre;
  return perfil.siglas ? `${nombre} (${perfil.siglas})` : nombre;
}

export const nombrePartido = nombrePerfil;

export const URL_REPOSITORIO = 'https://github.com/jjfz123/espectro';

/* ————— Formato ————— */

/** Número con coma decimal y signo menos tipográfico. */
export function formatearNumero(n: number, decimales = 1): string {
  return n
    .toLocaleString('es-ES', { maximumFractionDigits: decimales })
    .replace('-', '−');
}

/** Valor de eje con signo explícito (+34, −62, 0). */
export function formatearEje(n: number): string {
  const redondeado = Math.round(n);
  if (redondeado > 0) return `+${redondeado}`;
  if (redondeado < 0) return `−${Math.abs(redondeado)}`;
  return '0';
}

export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}
