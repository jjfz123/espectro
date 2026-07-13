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
 * Rendimiento: cada par de ejes se calcula UNA vez (caché por par). Una
 * rejilla de 120×120 sirve para buscar espacios seguros para los rótulos;
 * las regiones visibles se trazan como polígonos de Voronoi vectoriales,
 * sin bordes escalonados al ampliar o resaltar una corriente.
 */
import { ENTIDADES_MAPA } from './mapaEspacial';
import type { EntidadMapa } from './mapaEspacial';
import { corrientesAtlasVisibles } from './atlasIdeologias';

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
  /** Región como polígono de Voronoi vectorial en un path SVG. */
  d: string;
  /** Rótulo colocado, o null si la zona es demasiado pequeña (se elide). */
  etiqueta: EtiquetaZona | null;
  /** Índice de tinte 0..3; regiones vecinas reciben tonos distintos. */
  tono: number;
  celdas: number;
  /** Coordenada doctrinal normalizada, usada por la navegación espacial. */
  vx: number;
  vy: number;
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
 * Excepción también genérica: un paréntesis que es un periodo histórico
 * («(1945-1957)») no es un aclaratorio prescindible — «Franquismo
 * nacionalcatólico 1945-57» y «Franquismo» no se leen igual bajo el punto
 * del usuario (feedback beta, 2026-07) — y se conserva abreviado.
 */
export function rotuloZona(nombre: string): string {
  let corto = nombre
    .replace(/\s*\((\d{4})\s*[–-]\s*(\d{4})\)/g, (_, inicio: string, fin: string) => {
      const finCorto = fin.slice(0, 2) === inicio.slice(0, 2) ? fin.slice(2) : fin;
      return ` ${inicio}-${finCorto}`;
    })
    .replace(/\s*\([^)]*\)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
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

/** Umbral (en unidades de eje) a partir del cual la zona se declara lejana. */
export const UMBRAL_ZONA_LEJANA = 25;

export interface ZonaCercanaUsuario {
  id: string;
  nombre: string;
  distancia: number;
  /** Referencias dibujadas en este cruce (denominador de la advertencia). */
  dibujadas: number;
}

/**
 * Referencia dibujable más cercana al punto del usuario en un cruce de ejes —
 * por construcción, la dueña de la zona de Voronoi que queda bajo su punto.
 * Devuelve null si el usuario no tiene valor en ambos ejes o no hay capa.
 * Existe para poder DECIR debajo del plano lo que el fondo solo insinúa:
 * que la zona es la referencia más cercana (con su distancia), no una
 * etiqueta que el instrumento le ponga al usuario.
 */
export function zonaMasCercanaDelPar(
  ejeXId: string,
  ejeYId: string,
  valoresUsuario: Record<string, number | null>,
): ZonaCercanaUsuario | null {
  const vx = valoresUsuario[ejeXId];
  const vy = valoresUsuario[ejeYId];
  if (typeof vx !== 'number' || typeof vy !== 'number') return null;
  const referencias = referenciasDelPar(ejeXId, ejeYId);
  let mejor: ZonaCercanaUsuario | null = null;
  for (const referencia of referencias) {
    const distancia = Math.hypot(
      (referencia.valores[ejeXId] as number) - vx,
      (referencia.valores[ejeYId] as number) - vy,
    );
    if (!mejor || distancia < mejor.distancia) {
      mejor = {
        id: referencia.id,
        nombre: referencia.nombre,
        distancia,
        dibujadas: referencias.length,
      };
    }
  }
  return mejor;
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

/**
 * Celda de Voronoi exacta: parte del cuadrado [-100, 100]² y lo recorta por
 * el semiplano de cada bisectriz. El cálculo en el espacio de valores evita
 * los dientes de sierra de la rejilla; luego se proyecta al viewBox SVG.
 */
function pathRegion(
  posiciones: Array<{ vx: number; vy: number }>,
  indice: number,
  geometria: Geometria,
): string {
  interface PuntoValor {
    x: number;
    y: number;
  }
  const propia = posiciones[indice];
  if (!propia) return '';
  let poligono: PuntoValor[] = [
    { x: -100, y: -100 },
    { x: 100, y: -100 },
    { x: 100, y: 100 },
    { x: -100, y: 100 },
  ];
  const epsilon = 1e-7;

  for (let otra = 0; otra < posiciones.length && poligono.length > 0; otra += 1) {
    if (otra === indice) continue;
    const ajena = posiciones[otra]!;
    const a = 2 * (ajena.vx - propia.vx);
    const b = 2 * (ajena.vy - propia.vy);
    if (Math.abs(a) < epsilon && Math.abs(b) < epsilon) continue;
    const c =
      ajena.vx * ajena.vx +
      ajena.vy * ajena.vy -
      propia.vx * propia.vx -
      propia.vy * propia.vy;
    const recortado: PuntoValor[] = [];
    for (let i = 0; i < poligono.length; i += 1) {
      const inicio = poligono[i]!;
      const fin = poligono[(i + 1) % poligono.length]!;
      const valorInicio = a * inicio.x + b * inicio.y - c;
      const valorFin = a * fin.x + b * fin.y - c;
      const dentroInicio = valorInicio <= epsilon;
      const dentroFin = valorFin <= epsilon;
      if (dentroInicio) recortado.push(inicio);
      if (dentroInicio !== dentroFin) {
        const denominador = valorInicio - valorFin;
        const t = Math.abs(denominador) < epsilon ? 0 : valorInicio / denominador;
        recortado.push({
          x: inicio.x + (fin.x - inicio.x) * t,
          y: inicio.y + (fin.y - inicio.y) * t,
        });
      }
    }
    poligono = recortado;
  }

  if (poligono.length < 3) return '';
  const proyectar = (punto: PuntoValor) => ({
    x: redondear(geometria.margen + ((punto.x + 100) / 200) * geometria.lado),
    y: redondear(geometria.margen + ((100 - punto.y) / 200) * geometria.lado),
  });
  const proyectados = poligono.map(proyectar);
  return `${proyectados
    .map((punto, i) => `${i === 0 ? 'M' : 'L'}${punto.x} ${punto.y}`)
    .join('')}Z`;
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

interface AnclaZona {
  id: string;
  nombre: string;
  valores: Record<string, number>;
}

function anclasDelPar(
  parId: string,
  ejeXId: string,
  ejeYId: string,
  incluirProfundidad: boolean,
  ccaa?: string,
): AnclaZona[] {
  if (parId === 'propiedad-autoridad') {
    return corrientesAtlasVisibles(incluirProfundidad, ccaa).map((corriente) => ({
      id: corriente.id,
      nombre: corriente.nombre,
      valores: {
        [ejeXId]: corriente.coordenadas.x,
        [ejeYId]: corriente.coordenadas.y,
      },
    }));
  }
  return referenciasDelPar(ejeXId, ejeYId);
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
  incluirProfundidad = false,
  ccaa?: string,
): CapaCorrientes {
  const firmaReservados = reservados
    .map((rect) => [rect.x, rect.y, rect.ancho, rect.alto].map((n) => Math.round(n)).join(','))
    .join(';');
  const claveCache = `${parId}|${incluirProfundidad ? 'profundo' : 'principal'}|${ccaa ?? ''}|${firmaReservados}`;
  const memo = cachePorPar.get(claveCache);
  if (memo) return memo;

  const referencias = anclasDelPar(parId, ejeXId, ejeYId, incluirProfundidad, ccaa);
  if (referencias.length === 0) {
    const vacia: CapaCorrientes = { zonas: [], bordes: '' };
    cachePorPar.set(claveCache, vacia);
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
      d: pathRegion(posiciones, indice, geometria),
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
      vx: posiciones[indice]?.vx ?? 0,
      vy: posiciones[indice]?.vy ?? 0,
    });
  }

  const capa: CapaCorrientes = {
    zonas,
    /* Los contornos vectoriales comparten sus aristas; repetirlas no cambia
       el trazo y evita volver a introducir una frontera discreta. */
    bordes: zonas.map((zona) => zona.d).join(''),
  };
  cachePorPar.set(claveCache, capa);
  return capa;
}
