/**
 * Capa de datos del frontend: importa el banco de ítems, los ejes, los módulos
 * y los partidos en tiempo de build. No hay ninguna petición de red en
 * ejecución: todo viaja dentro del propio bundle (requisito de privacidad).
 */
import type { Eje, Item, Modulo, Partido, Valor } from '@engine';
import type { TipoEleccion } from '@engine';

import ejesJson from '@data/ejes.json';
import modulosJson from '@data/modulos.json';

import itemsNucleo from '@data/items/nucleo.json';
import itemsCorrientesIzquierda from '@data/items/corrientes-izquierda.json';
import itemsSocialdemocracia from '@data/items/socialdemocracia-reformismo.json';
import itemsCentroLiberalismo from '@data/items/centro-liberalismo.json';
import itemsCorrientesDerecha from '@data/items/corrientes-derecha.json';
import itemsDerechaRadical from '@data/items/derecha-radical.json';
import itemsNacionalismos from '@data/items/nacionalismos-regionalismos.json';
import itemsVerdeAnimalista from '@data/items/verde-animalista.json';
import itemsFeminismosMoral from '@data/items/feminismos-moral.json';
import itemsTerritorialAndalucia from '@data/items/territorial-andalucia.json';
import itemsTerritorialCanarias from '@data/items/territorial-canarias.json';
import itemsTerritorialCatalunya from '@data/items/territorial-catalunya.json';
import itemsTerritorialEuskadiNavarra from '@data/items/territorial-euskadi-navarra.json';
import itemsTerritorialGalicia from '@data/items/territorial-galicia.json';

import partidoDemoConsejista from '@data/partidos/demo-consejista.json';
import partidoDemoVanguardia from '@data/partidos/demo-vanguardia.json';

export const EJES = ejesJson as unknown as Eje[];

export const MODULOS = ([...(modulosJson as unknown as Modulo[])] as Modulo[]).sort(
  (a, b) => (a.orden ?? 99) - (b.orden ?? 99),
);

const bancoBruto = [
  ...itemsNucleo,
  ...itemsCorrientesIzquierda,
  ...itemsSocialdemocracia,
  ...itemsCentroLiberalismo,
  ...itemsCorrientesDerecha,
  ...itemsDerechaRadical,
  ...itemsNacionalismos,
  ...itemsVerdeAnimalista,
  ...itemsFeminismosMoral,
  ...itemsTerritorialAndalucia,
  ...itemsTerritorialCanarias,
  ...itemsTerritorialCatalunya,
  ...itemsTerritorialEuskadiNavarra,
  ...itemsTerritorialGalicia,
] as unknown as Item[];

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

export const PARTIDOS = [partidoDemoConsejista, partidoDemoVanguardia] as unknown as Partido[];

export const ITEMS_NUCLEO: Item[] = ITEMS_POR_MODULO.get('nucleo') ?? [];

/**
 * Secuencia de ítems de una sesión: el núcleo y, detrás, los módulos activos
 * en su orden natural.
 */
export function secuenciaItems(modulosActivos: string[]): Item[] {
  const activos = new Set(modulosActivos);
  const secuencia: Item[] = [...ITEMS_NUCLEO];
  for (const m of MODULOS) {
    if (m.id === 'nucleo' || !activos.has(m.id)) continue;
    secuencia.push(...(ITEMS_POR_MODULO.get(m.id) ?? []));
  }
  return secuencia;
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
export function nombrePartido(partido: Partido): string {
  const nombre = partido.demo
    ? partido.nombre.replace(/\s*\(DEMO\)\s*/g, ' ').trim()
    : partido.nombre;
  return partido.siglas ? `${nombre} (${partido.siglas})` : nombre;
}

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
