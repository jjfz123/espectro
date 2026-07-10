/**
 * Capa de «corrientes de fondo» del mapa: teselación por vecino más cercano
 * (Voronoi discreto sobre una rejilla fina) de las referencias doctrinales
 * incluidas en el mapa, proyectadas al par de ejes activo.
 *
 * Las zonas no son un meme dibujado a mano: cada nombre marca la referencia
 * doctrinal más cercana, y esas referencias tienen posición calculada desde
 * sus textos con el mismo instrumento que el usuario (proyectarEnEspacio).
 * Este módulo no conoce ningún nombre ni posición concretos: cuando el
 * catálogo data/referencias crece, la teselación se densifica sola.
 *
 * Rendimiento: cada par de ejes se calcula UNA vez (caché por par), sobre
 * una rejilla de 120×120 celdas, y cada región se emite como un único
 * <path> de rectángulos por filas fusionados — no una celda por rect.
 */
import { ENTIDADES_MAPA } from './mapaEspacial';
import type { EntidadMapa } from './mapaEspacial';

export interface RectReservado {
  x: number;
  y: number;
  ancho: number;
  alto: number;
}

export interface EtiquetaZona {
  /** Centro horizontal del bloque de texto. */
  x: number;
  /** Línea base de la primera línea. */
  y: number;
  lineas: string[];
}

export interface ZonaCorriente {
  id: string;
  /** Nombre completo de la referencia (vive en el tooltip de la zona). */
  nombre: string;
  /** Forma corta editorial del nombre, para el rótulo de la zona. */
  rotulo: string;
  /** Región como path SVG (subpaths rectangulares fusionados por filas). */
  d: string;
  /** Rótulo colocado, o null si la zona es demasiado pequeña (se elide). */
  etiqueta: EtiquetaZona | null;
  /** Índice de tinte 0..3; regiones vecinas reciben tonos distintos. */
  tono: number;
  celdas: number;
}

export interface CapaCorrientes {
  zonas: ZonaCorriente[];
  /** Fronteras entre regiones, como un solo path de segmentos. */
  bordes: string;
}

/** Lado de la rejilla de teselación (máximo acordado: 120). */
const REJILLA = 120;

/** Interlineado del rótulo de zona, en px del viewBox. */
export const ALTO_LINEA_ZONA = 11;

/**
 * Anchura media estimada por carácter del rótulo. Calibrada midiendo
 * getComputedTextLength en Chromium con versalitas de 9px y tracking 0.09em
 * (medidas reales: 4.5–5.1 px/carácter); se deja algo de holgura.
 */
const ANCHO_CARACTER = 5.2;

/** Media caja de las versalitas: baja la línea base al centrar el bloque. */
const MEDIA_CAJA = 3.2;

/** Margen de respeto alrededor del rótulo dentro de su zona. */
const RESPETO = 3;

const NUMERO_TONOS = 4;

function redondear(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Forma corta editorial del nombre de una corriente para el rótulo de zona:
 * fuera paréntesis aclaratorios y, si sigue siendo kilométrico, se corta en
 * la primera rama («… y …») o en la primera coma. El nombre íntegro vive en
 * el tooltip de la zona. Regla genérica: nada de nombres codificados a mano.
 */
export function rotuloZona(nombre: string): string {
  let corto = nombre.replace(/\s*\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
  if (corto.length > 26) {
    const rama = corto.split(' y ')[0] ?? corto;
    if (rama.length >= 6) corto = rama.trim();
  }
  if (corto.length > 26) {
    const coma = corto.split(',')[0] ?? corto;
    if (coma.length >= 6) corto = coma.trim();
  }
  return corto || nombre;
}

/**
 * Unidades de partición del rótulo: palabras, y dentro de las palabras
 * kilométricas con guión («marxismo-leninismo-…»), cada tramo con su guión.
 */
function trocear(texto: string): string[] {
  const unidades: string[] = [];
  for (const palabra of texto.split(' ')) {
    if (palabra.length > 14 && palabra.includes('-')) {
      const partes = palabra.split('-');
      partes.forEach((parte, i) => {
        if (parte === '') return;
        unidades.push(i < partes.length - 1 ? `${parte}-` : parte);
      });
    } else {
      unidades.push(palabra);
    }
  }
  return unidades;
}

/** Une unidades de nuevo: las que acaban en guión no llevan espacio detrás. */
function unir(unidades: string[]): string {
  let texto = '';
  for (const unidad of unidades) {
    if (!texto) texto = unidad;
    else if (texto.endsWith('-')) texto += unidad;
    else texto += ` ${unidad}`;
  }
  return texto;
}

/** Reparto codicioso de las unidades en n líneas de anchura equilibrada. */
function partirEnLineas(texto: string, numeroLineas: number): string[] {
  const unidades = trocear(texto);
  if (numeroLineas <= 1 || unidades.length <= 1) return [unir(unidades)];
  const total = unir(unidades).length;
  const objetivo = total / numeroLineas;
  const lineas: string[] = [];
  let actual: string[] = [];
  for (const unidad of unidades) {
    const tentativa = unir([...actual, unidad]);
    if (
      actual.length > 0 &&
      tentativa.length > objetivo &&
      lineas.length < numeroLineas - 1
    ) {
      lineas.push(unir(actual));
      actual = [unidad];
    } else {
      actual = [...actual, unidad];
    }
  }
  if (actual.length > 0) lineas.push(unir(actual));
  return lineas;
}

function anchoLinea(linea: string): number {
  return linea.length * ANCHO_CARACTER + 4;
}

interface Geometria {
  margen: number;
  lado: number;
  /** Lado de una celda de la rejilla, en px del viewBox. */
  celda: number;
}

/**
 * ¿Cabe un bloque de texto (rect en px del viewBox) íntegramente dentro de
 * la región `indice`, sin salirse del plano ni pisar los rects reservados?
 */
function cabeBloque(
  asignacion: Int16Array,
  indice: number,
  geometria: Geometria,
  x0: number,
  y0: number,
  ancho: number,
  alto: number,
  reservados: RectReservado[],
): boolean {
  const { margen, lado, celda } = geometria;
  if (x0 < margen || y0 < margen || x0 + ancho > margen + lado || y0 + alto > margen + lado) {
    return false;
  }
  for (const r of reservados) {
    if (x0 < r.x + r.ancho && r.x < x0 + ancho && y0 < r.y + r.alto && r.y < y0 + alto) {
      return false;
    }
  }
  const i0 = Math.max(0, Math.floor((x0 - margen) / celda));
  const i1 = Math.min(REJILLA - 1, Math.floor((x0 + ancho - margen) / celda));
  const j0 = Math.max(0, Math.floor((y0 - margen) / celda));
  const j1 = Math.min(REJILLA - 1, Math.floor((y0 + alto - margen) / celda));
  for (let j = j0; j <= j1; j += 1) {
    for (let i = i0; i <= i1; i += 1) {
      if (asignacion[j * REJILLA + i] !== indice) return false;
    }
  }
  return true;
}

/**
 * Coloca el rótulo de una zona: prueba 1, 2 y 3 líneas centradas en el
 * centroide (las regiones de Voronoi son convexas: el centroide es interior)
 * y, si no caben, pequeños desplazamientos en espiral alrededor. Si nada
 * cabe, la zona se queda sin rótulo (elidido): su nombre completo vive en el
 * tooltip de la zona.
 */
function colocarRotulo(
  asignacion: Int16Array,
  indice: number,
  geometria: Geometria,
  rotulo: string,
  cx: number,
  cy: number,
  reservados: RectReservado[],
): EtiquetaZona | null {
  const { celda } = geometria;
  const pasos = [0, -2, 2, -4, 4, -6, 6, -8, 8, -10, 10, -12, 12];
  const desplazamientos: { dx: number; dy: number }[] = [];
  for (const px of pasos) {
    for (const py of pasos) {
      desplazamientos.push({ dx: px * celda, dy: py * celda });
    }
  }
  desplazamientos.sort((a, b) => a.dx * a.dx + a.dy * a.dy - (b.dx * b.dx + b.dy * b.dy));
  for (let numeroLineas = 1; numeroLineas <= 3; numeroLineas += 1) {
    const lineas = partirEnLineas(rotulo, numeroLineas);
    if (lineas.length !== numeroLineas) continue;
    const ancho = Math.max(...lineas.map(anchoLinea)) + RESPETO * 2;
    const alto = lineas.length * ALTO_LINEA_ZONA + RESPETO * 2;
    for (const { dx, dy } of desplazamientos) {
      const x0 = cx + dx - ancho / 2;
      const y0 = cy + dy - alto / 2;
      if (cabeBloque(asignacion, indice, geometria, x0, y0, ancho, alto, reservados)) {
        const baseLinea1 =
          cy + dy - ((lineas.length - 1) * ALTO_LINEA_ZONA) / 2 + MEDIA_CAJA;
        return { x: redondear(cx + dx), y: redondear(baseLinea1), lineas };
      }
    }
  }
  return null;
}

/** Path de una región: por filas, fusionando filas consecutivas idénticas. */
function pathRegion(
  asignacion: Int16Array,
  indice: number,
  geometria: Geometria,
): string {
  const { margen, celda } = geometria;
  interface Franja {
    i0: number;
    i1: number; // exclusivo
    j0: number;
    j1: number; // exclusivo
  }
  const franjas: Franja[] = [];
  for (let j = 0; j < REJILLA; j += 1) {
    let i = 0;
    while (i < REJILLA) {
      if (asignacion[j * REJILLA + i] !== indice) {
        i += 1;
        continue;
      }
      let fin = i;
      while (fin < REJILLA && asignacion[j * REJILLA + fin] === indice) fin += 1;
      const previa = franjas[franjas.length - 1];
      if (previa && previa.j1 === j && previa.i0 === i && previa.i1 === fin) {
        previa.j1 = j + 1;
      } else {
        franjas.push({ i0: i, i1: fin, j0: j, j1: j + 1 });
      }
      i = fin;
    }
  }
  let d = '';
  for (const f of franjas) {
    const x = redondear(margen + f.i0 * celda);
    const y = redondear(margen + f.j0 * celda);
    const ancho = redondear((f.i1 - f.i0) * celda);
    const alto = redondear((f.j1 - f.j0) * celda);
    d += `M${x} ${y}h${ancho}v${alto}h${-ancho}Z`;
  }
  return d;
}

/** Fronteras entre regiones: segmentos verticales y horizontales fusionados. */
function pathBordes(asignacion: Int16Array, geometria: Geometria): string {
  const { margen, celda } = geometria;
  let d = '';
  // Verticales: entre columnas i e i+1.
  for (let i = 0; i < REJILLA - 1; i += 1) {
    const x = redondear(margen + (i + 1) * celda);
    let j = 0;
    while (j < REJILLA) {
      if (asignacion[j * REJILLA + i] === asignacion[j * REJILLA + i + 1]) {
        j += 1;
        continue;
      }
      let fin = j;
      while (fin < REJILLA && asignacion[fin * REJILLA + i] !== asignacion[fin * REJILLA + i + 1]) {
        fin += 1;
      }
      d += `M${x} ${redondear(margen + j * celda)}V${redondear(margen + fin * celda)}`;
      j = fin;
    }
  }
  // Horizontales: entre filas j y j+1.
  for (let j = 0; j < REJILLA - 1; j += 1) {
    const y = redondear(margen + (j + 1) * celda);
    let i = 0;
    while (i < REJILLA) {
      if (asignacion[j * REJILLA + i] === asignacion[(j + 1) * REJILLA + i]) {
        i += 1;
        continue;
      }
      let fin = i;
      while (fin < REJILLA && asignacion[j * REJILLA + fin] !== asignacion[(j + 1) * REJILLA + fin]) {
        fin += 1;
      }
      d += `M${redondear(margen + i * celda)} ${y}H${redondear(margen + fin * celda)}`;
      i = fin;
    }
  }
  return d;
}

/**
 * Tonos por región: codicioso sobre el grafo de vecindad, de mayor a menor
 * zona, evitando repetir el tono de cualquier vecina ya coloreada. Con
 * cuatro tonos y regiones convexas casi nunca hay conflicto irresoluble.
 */
function asignarTonos(vecinas: Set<number>[], orden: number[]): number[] {
  const tonos = new Array<number>(vecinas.length).fill(-1);
  for (const indice of orden) {
    const usados = new Set<number>();
    for (const vecina of vecinas[indice] ?? []) {
      const tono = tonos[vecina];
      if (tono !== undefined && tono >= 0) usados.add(tono);
    }
    let elegido = 0;
    while (usados.has(elegido) && elegido < NUMERO_TONOS - 1) elegido += 1;
    tonos[indice] = elegido;
  }
  return tonos;
}

/** Referencias doctrinales incluidas con valor en ambos ejes del par. */
export function referenciasDelPar(ejeXId: string, ejeYId: string): EntidadMapa[] {
  return ENTIDADES_MAPA.filter(
    (entidad) =>
      entidad.tipo === 'referencia' &&
      typeof entidad.valores[ejeXId] === 'number' &&
      typeof entidad.valores[ejeYId] === 'number',
  );
}

const cachePorPar = new Map<string, CapaCorrientes>();

/**
 * Capa de corrientes para un par de ejes. Se calcula una sola vez por par
 * (las posiciones de las referencias son estáticas en tiempo de build) y las
 * llamadas siguientes devuelven la caché.
 *
 * @param reservados Rects del viewBox que los rótulos de zona no deben pisar
 *   (los descriptores de esquina del plano). Son deterministas por par.
 */
export function capaCorrientes(
  parId: string,
  ejeXId: string,
  ejeYId: string,
  margen: number,
  lado: number,
  reservados: RectReservado[],
): CapaCorrientes {
  const memo = cachePorPar.get(parId);
  if (memo) return memo;

  const referencias = referenciasDelPar(ejeXId, ejeYId);
  if (referencias.length === 0) {
    const vacia: CapaCorrientes = { zonas: [], bordes: '' };
    cachePorPar.set(parId, vacia);
    return vacia;
  }

  const geometria: Geometria = { margen, lado, celda: lado / REJILLA };
  const posiciones = referencias.map((r) => ({
    vx: r.valores[ejeXId] as number,
    vy: r.valores[ejeYId] as number,
  }));

  // Asignación por vecino más cercano en el espacio de valores (equivale al
  // espacio del viewBox: el plano es cuadrado y la escala, uniforme).
  const asignacion = new Int16Array(REJILLA * REJILLA);
  for (let j = 0; j < REJILLA; j += 1) {
    const vy = 100 - ((j + 0.5) * 200) / REJILLA;
    for (let i = 0; i < REJILLA; i += 1) {
      const vx = -100 + ((i + 0.5) * 200) / REJILLA;
      let mejor = 0;
      let mejorDistancia = Infinity;
      for (let k = 0; k < posiciones.length; k += 1) {
        const p = posiciones[k]!;
        const dx = vx - p.vx;
        const dy = vy - p.vy;
        const distancia = dx * dx + dy * dy;
        if (distancia < mejorDistancia) {
          mejorDistancia = distancia;
          mejor = k;
        }
      }
      asignacion[j * REJILLA + i] = mejor;
    }
  }

  // Recuento, centroides y grafo de vecindad en una sola pasada.
  const celdas = new Array<number>(referencias.length).fill(0);
  const sumaX = new Array<number>(referencias.length).fill(0);
  const sumaY = new Array<number>(referencias.length).fill(0);
  const vecinas: Set<number>[] = referencias.map(() => new Set<number>());
  for (let j = 0; j < REJILLA; j += 1) {
    for (let i = 0; i < REJILLA; i += 1) {
      const region = asignacion[j * REJILLA + i]!;
      celdas[region] = (celdas[region] ?? 0) + 1;
      sumaX[region] = (sumaX[region] ?? 0) + (i + 0.5);
      sumaY[region] = (sumaY[region] ?? 0) + (j + 0.5);
      if (i < REJILLA - 1) {
        const derecha = asignacion[j * REJILLA + i + 1]!;
        if (derecha !== region) {
          vecinas[region]?.add(derecha);
          vecinas[derecha]?.add(region);
        }
      }
      if (j < REJILLA - 1) {
        const abajo = asignacion[(j + 1) * REJILLA + i]!;
        if (abajo !== region) {
          vecinas[region]?.add(abajo);
          vecinas[abajo]?.add(region);
        }
      }
    }
  }

  const orden = referencias
    .map((_, indice) => indice)
    .sort((a, b) => (celdas[b] ?? 0) - (celdas[a] ?? 0));
  const tonos = asignarTonos(vecinas, orden);

  const zonas: ZonaCorriente[] = [];
  for (let indice = 0; indice < referencias.length; indice += 1) {
    const referencia = referencias[indice]!;
    const numeroCeldas = celdas[indice] ?? 0;
    // Dos referencias pueden proyectar casi al mismo punto: la segunda se
    // queda sin celdas y no genera zona (su nombre sigue en el catálogo).
    if (numeroCeldas === 0) continue;
    const cx = geometria.margen + ((sumaX[indice] ?? 0) / numeroCeldas) * geometria.celda;
    const cy = geometria.margen + ((sumaY[indice] ?? 0) / numeroCeldas) * geometria.celda;
    zonas.push({
      id: referencia.id,
      nombre: referencia.nombre,
      rotulo: rotuloZona(referencia.nombre),
      d: pathRegion(asignacion, indice, geometria),
      etiqueta: colocarRotulo(
        asignacion,
        indice,
        geometria,
        rotuloZona(referencia.nombre),
        cx,
        cy,
        reservados,
      ),
      tono: tonos[indice] ?? 0,
      celdas: numeroCeldas,
    });
  }

  const capa: CapaCorrientes = { zonas, bordes: pathBordes(asignacion, geometria) };
  cachePorPar.set(parId, capa);
  return capa;
}
