import { Suspense, lazy, useEffect, useId, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from 'react';
import type { Eje, ResultadoFaceta } from '@engine';
import {
  EJE_AUTORIDAD_POLITICA,
  EJE_PROPIEDAD_MERCADO,
  distanciaEspacial,
} from '@engine';
import { nombreLlanoEje, poloLlano } from '../lecturaEjes';
import { CLAVE_REABRIR_3D } from '../estadoVisores';
import { AyudaEjes } from './AyudaEjes';
import { FichaZonaIdeologica } from './FichaZonaIdeologica';
import { LecturaEjes } from './LecturaEjes';
import { LimiteError } from './LimiteError';
import { REFERENCIAS } from '../datosReferencias';
import {
  EJES_MAPA,
  EJE_ECONOMIA_BRUJULA,
  EJE_PODER_BRUJULA,
  ENTIDADES_CUBO,
  ENTIDADES_MAPA,
  EXCLUIDAS_MAPA,
  NOMBRE_CORTO_EJE,
  TOTAL_PARTIDOS_CATALOGO,
  TOTAL_REFERENCIAS_CATALOGO,
} from '../mapaEspacial';
import type { EntidadMapa } from '../mapaEspacial';
import {
  ALTO_LINEA_ZONA,
  UMBRAL_ZONA_LEJANA,
  capaCorrientes,
  zonaMasCercanaDelPar,
} from '../zonasCorrientes';
import {
  CORRIENTE_ATLAS_POR_ID,
  anclasAtlasBloqueadasVisibles,
  corrientesAtlasVisibles,
  corrienteAtlasMasCercana,
  entradasAtlasExplorables,
  nombreCapaAtlas,
  opcionesBusquedaAtlas,
  resolverOpcionBusquedaAtlas,
} from '../atlasIdeologias';
import type { CorrienteAtlas, GradoEvidenciaBrujula } from '../atlasIdeologias';
import { idsPartidosEnCumulo } from '../cumuloPartidos';

const Mapa3D = lazy(() => import('./Mapa3D'));

interface Props {
  facetasUsuario: ResultadoFaceta[];
  /** Cruce mapa↔doctrina: por referencia, si el usuario publica coincidencia
      doctrinal y con cuántas preguntas compartidas (fase 2 de legibilidad). */
  resumenDoctrinal?: Map<
    string,
    { publicable: boolean; itemsComparados: number; itemsDefinitorios: number }
  >;
  puedeRecargar: boolean;
  alConfirmarGuardado: () => boolean;
  /** Devuelve el foco al contexto persistente tras resolver el chunk perezoso. */
  alMontar?: () => void;
  /** Controla qué capa abre el atlas sin confundir profundidad con identidad. */
}

interface ParEjes {
  id: string;
  x: string;
  y: string;
  nombre: string;
}

/** Cruces de ejes, con nombres llanos: la jerga vive en el panel «?». */
const PARES: ParEjes[] = [
  { id: 'economico-social', x: 'economico', y: 'social', nombre: 'Economía × Sociedad' },
  { id: 'economico-territorial', x: 'economico', y: 'territorial', nombre: 'Economía × Territorio' },
  { id: 'social-territorial', x: 'social', y: 'territorial', nombre: 'Sociedad × Territorio' },
];

const PAR_BRUJULA: ParEjes = {
  id: 'propiedad-autoridad',
  x: EJE_PROPIEDAD_MERCADO,
  y: EJE_AUTORIDAD_POLITICA,
  nombre: 'Propiedad y mercado × Poder',
};

/**
 * Descriptores de esquina de cada cruce, sin carga valorativa (regla del
 * proyecto: descriptivo, nunca peyorativo). Orden: arriba-izquierda,
 * arriba-derecha, abajo-izquierda, abajo-derecha.
 */
const ESQUINAS: Record<string, [string, string, string, string]> = {
  'propiedad-autoridad': [
    'propiedad social + poder concentrado',
    'propiedad privada + poder concentrado',
    'propiedad social + poder distribuido',
    'propiedad privada + poder distribuido',
  ],
  'economico-social': [
    'izquierda + orden',
    'derecha + orden',
    'izquierda + libertades',
    'derecha + libertades',
  ],
  'economico-territorial': [
    'izquierda + centralización',
    'derecha + centralización',
    'izquierda + autogobierno',
    'derecha + autogobierno',
  ],
  'social-territorial': [
    'libertades + centralización',
    'orden + centralización',
    'libertades + autogobierno',
    'orden + autogobierno',
  ],
};

/** Geometría del plano SVG. */
const MARGEN = 12;
const LADO = 456;
const TOTAL = LADO + MARGEN * 2;

/**
 * Radio de detección de cúmulo acorde a la geometría REAL de los objetivos
 * táctiles: dos hits se tocan cuando la distancia entre centros baja de la
 * suma de sus radios (24+24 en escritorio; ~40+40 en móvil vía CSS). Sin esto
 * quedaba una franja ciega en la que los círculos se solapaban sin ofrecer
 * desambiguación y el punto de debajo era intocable en esa zona.
 */
function radioCumuloEfectivo(): number {
  try {
    return window.matchMedia('(max-width: 34rem)').matches ? 80 : 48;
  } catch {
    return 48;
  }
}

/** Devuelve el foco al punto elegido dentro del plano indicado. */
function enfocarPuntoEnPlano(selectorPlano: string, id: string): void {
  window.requestAnimationFrame(() => {
    document
      .querySelector<SVGGElement>(`${selectorPlano} [data-entidad-id="${CSS.escape(id)}"]`)
      ?.focus();
  });
}

function aCoordenada(valor: number): number {
  return MARGEN + ((valor + 100) / 200) * LADO;
}

interface PuntoPlano {
  id: string;
  etiqueta: string;
  nombre: string;
  tipo: 'usuario' | 'partido' | 'referencia';
  evidenciaBrujula?: Exclude<GradoEvidenciaBrujula, 'insuficiente'>;
  cx: number;
  cy: number;
}

interface EtiquetaColocada {
  x: number;
  y: number;
  anclaje: 'start' | 'end' | 'middle';
  /**
   * Sin hueco limpio ni con el abanico completo: el rótulo permanente se
   * elide y solo aparece al pasar el puntero o enfocar el punto (solo
   * referencias doctrinales; los partidos conservan rótulo siempre).
   */
  elidida?: boolean;
}

interface Rect {
  x: number;
  y: number;
  ancho: number;
  alto: number;
}

function chocan(a: Rect, b: Rect): boolean {
  return (
    a.x < b.x + b.ancho && b.x < a.x + a.ancho && a.y < b.y + b.alto && b.y < a.y + a.alto
  );
}

/** Zonas que ocupan los descriptores de esquina, para que ningún rótulo los pise. */
function rectsEsquinas(esquinas: [string, string, string, string]): Rect[] {
  const alto = 16;
  return esquinas.map((texto, i) => {
    const ancho = texto.length * 6.2 + 10;
    return {
      x: i % 2 === 0 ? MARGEN + 2 : TOTAL - MARGEN - 2 - ancho,
      y: i < 2 ? MARGEN + 2 : TOTAL - MARGEN - 2 - alto,
      ancho,
      alto,
    };
  });
}

/**
 * Anchura estimada de un rótulo en unidades del plano (fuente sans de 10.5px
 * con halo de papel de 3px): por clases de carácter en lugar de una media
 * única, que subestimaba las siglas en mayúsculas y dejaba que rótulos
 * vecinos se rozaran en los cúmulos.
 */
function anchoRotulo(texto: string): number {
  let ancho = 0;
  for (const caracter of texto) {
    if ("ilíìîïjt.,;:'’ ()".includes(caracter)) ancho += 3.4;
    else if ('mwMW'.includes(caracter)) ancho += 9.4;
    else if (/[A-ZÁÉÍÓÚÑÜ]/.test(caracter)) ancho += 7.3;
    else if (caracter === '…') ancho += 8;
    else ancho += 5.9;
  }
  return ancho + 7;
}

/**
 * Direcciones del abanico radial, de la más legible (horizontal) a la
 * vertical. En SVG la y crece hacia abajo; el signo solo cambia el lado.
 */
const ANGULOS_RADIALES = [
  0,
  Math.PI,
  -Math.PI / 6,
  Math.PI / 6,
  Math.PI - Math.PI / 6,
  Math.PI + Math.PI / 6,
  -Math.PI / 3,
  Math.PI / 3,
  Math.PI - Math.PI / 3,
  Math.PI + Math.PI / 3,
  -Math.PI / 2,
  Math.PI / 2,
];

/**
 * Radios del abanico, siempre con línea guía al punto. Los dos últimos son
 * escapes largos para los cúmulos del borde cuando el catálogo crece: antes
 * de pisar otro rótulo, un partido puede rotularse a media plana.
 */
const RADIOS_ABANICO = [20, 32, 46, 62, 80, 100, 122, 146];

/**
 * Colocación de rótulos con desplazamiento radial: cada etiqueta prueba
 * derecha, izquierda, arriba y abajo del punto y, si no hay hueco, un
 * abanico de anillos crecientes alrededor (primero en horizontal, después
 * diagonales y verticales), hasta no chocar con las ya colocadas, con las
 * zonas reservadas (esquinas) ni salirse. En los cúmulos del borde —AA,
 * Podemos y las referencias abajo a la izquierda— el abanico reparte los
 * rótulos alrededor en lugar de apilarlos en una escalera que acababa
 * rozándose; la línea guía (etiquetaLejana) une cada rótulo desplazado con
 * su punto. Si ni aun así hay hueco limpio, se elige el candidato con menos
 * solape en vez de pisar siempre a la derecha del punto.
 */
function colocarEtiquetas(
  puntos: PuntoPlano[],
  reservados: Rect[] = [],
): Map<string, EtiquetaColocada> {
  const colocadas = new Map<string, EtiquetaColocada>();
  const ocupados: Rect[] = [
    ...reservados,
    ...puntos.map((p) => ({
      x: p.cx - 7,
      y: p.cy - 7,
      ancho: 14,
      alto: 14,
    })),
  ];
  const ALTO = 13;

  const rectDe = (candidato: EtiquetaColocada, ancho: number): Rect => {
    const x0 =
      candidato.anclaje === 'start'
        ? candidato.x
        : candidato.anclaje === 'end'
          ? candidato.x - ancho
          : candidato.x - ancho / 2;
    return { x: x0, y: candidato.y - ALTO + 2, ancho, alto: ALTO };
  };

  for (const punto of puntos) {
    const ancho = anchoRotulo(punto.etiqueta);
    const candidatos: EtiquetaColocada[] = [
      { x: punto.cx + 9, y: punto.cy + 4, anclaje: 'start' },
      { x: punto.cx - 9, y: punto.cy + 4, anclaje: 'end' },
      { x: punto.cx, y: punto.cy - 11, anclaje: 'middle' },
      { x: punto.cx, y: punto.cy + 18, anclaje: 'middle' },
    ];
    for (const radio of RADIOS_ABANICO) {
      for (const angulo of ANGULOS_RADIALES) {
        const dx = Math.cos(angulo) * radio;
        const dy = Math.sin(angulo) * radio;
        const anclaje: EtiquetaColocada['anclaje'] =
          Math.abs(dx) < radio * 0.4 ? 'middle' : dx > 0 ? 'start' : 'end';
        candidatos.push({ x: punto.cx + dx, y: punto.cy + dy + 4, anclaje });
      }
    }

    let elegido: EtiquetaColocada | null = null;
    for (const candidato of candidatos) {
      const rect = rectDe(candidato, ancho);
      const dentro = rect.x >= 2 && rect.x + rect.ancho <= TOTAL - 2 && rect.y >= 1 && rect.y + rect.alto <= TOTAL - 1;
      if (dentro && !ocupados.some((otro) => chocan(rect, otro))) {
        ocupados.push(rect);
        elegido = candidato;
        break;
      }
    }
    if (!elegido && punto.tipo === 'referencia') {
      /* Referencia sin hueco ni con el abanico completo: se elide el rótulo
         permanente (queda el rombo con tooltip, hover, foco y lectura al
         seleccionar) en lugar de pisar a otro. El rótulo de hover se pinta
         pegado al punto: el solape transitorio es preferible a uno fijo. */
      elegido = { x: punto.cx + 9, y: punto.cy + 4, anclaje: 'start', elidida: true };
    } else if (!elegido) {
      let mejorPenalizacion = Infinity;
      for (const candidato of candidatos) {
        const rect = rectDe(candidato, ancho);
        /* Salirse del plano pesa el triple que pisar otro rótulo. */
        const fueraX = Math.max(0, 2 - rect.x) + Math.max(0, rect.x + rect.ancho - (TOTAL - 2));
        const fueraY = Math.max(0, 1 - rect.y) + Math.max(0, rect.y + rect.alto - (TOTAL - 1));
        let penalizacion = (fueraX * rect.alto + fueraY * rect.ancho) * 3;
        for (const otro of ocupados) {
          const solapeX =
            Math.min(rect.x + rect.ancho, otro.x + otro.ancho) - Math.max(rect.x, otro.x);
          const solapeY =
            Math.min(rect.y + rect.alto, otro.y + otro.alto) - Math.max(rect.y, otro.y);
          if (solapeX > 0 && solapeY > 0) penalizacion += solapeX * solapeY;
        }
        if (penalizacion < mejorPenalizacion) {
          mejorPenalizacion = penalizacion;
          elegido = candidato;
        }
      }
      elegido = elegido ?? candidatos[0]!;
      ocupados.push(rectDe(elegido, ancho));
    }
    colocadas.set(punto.id, elegido);
  }
  return colocadas;
}

/** Punto de anclaje visual de una etiqueta (para la línea guía). */
function anclaEtiqueta(etiqueta: EtiquetaColocada): { x: number; y: number } {
  const x =
    etiqueta.anclaje === 'start'
      ? etiqueta.x - 2
      : etiqueta.anclaje === 'end'
        ? etiqueta.x + 2
        : etiqueta.x;
  return { x, y: etiqueta.y - 4 };
}

/**
 * En los cúmulos, la anticolisión puede alejar un rótulo de su punto: a
 * partir de esta distancia se dibuja una línea guía fina para que el rótulo
 * no parezca la posición de otro punto.
 */
function etiquetaLejana(etiqueta: EtiquetaColocada, punto: PuntoPlano): boolean {
  const ancla = anclaEtiqueta(etiqueta);
  return Math.hypot(ancla.x - punto.cx, ancla.y - punto.cy) > 26;
}

/**
 * Rótulo del plano: los nombres kilométricos de algunas referencias
 * doctrinales se cortan en la última palabra completa que quepa (~24
 * caracteres, sin conjunciones colgantes). El nombre íntegro sigue en el
 * tooltip y en el panel de lectura.
 */
function acortarEtiqueta(texto: string): string {
  if (texto.length <= 26) return texto;
  let corte = '';
  for (const palabra of texto.split(' ')) {
    const tentativa = corte ? `${corte} ${palabra}` : palabra;
    if (tentativa.length > 24) break;
    corte = tentativa;
  }
  corte = corte.replace(/ (y|e|o|u|de|del|la|los|las)$/, '');
  return `${corte || texto.slice(0, 24)}…`;
}

/** Puntos dibujables de un par de ejes: usuario (si procede) + entidades. */
function puntosDelPar(
  par: ParEjes,
  valoresUsuario: Record<string, number | null>,
): PuntoPlano[] {
  const lista: PuntoPlano[] = [];
  const vxUsuario = valoresUsuario[par.x];
  const vyUsuario = valoresUsuario[par.y];
  if (typeof vxUsuario === 'number' && typeof vyUsuario === 'number') {
    lista.push({
      id: 'usuario',
      etiqueta: 'Tú',
      nombre: 'Tu posición',
      tipo: 'usuario',
      cx: aCoordenada(vxUsuario),
      cy: TOTAL - aCoordenada(vyUsuario),
    });
  }
  for (const entidad of ENTIDADES_MAPA) {
    if (par.id === 'propiedad-autoridad' && entidad.tipo === 'referencia') continue;
    const vx = entidad.valores[par.x];
    const vy = entidad.valores[par.y];
    if (typeof vx !== 'number' || typeof vy !== 'number') continue;
    lista.push({
      id: entidad.id,
      etiqueta: acortarEtiqueta(entidad.etiqueta),
      nombre: entidad.nombre,
      tipo: entidad.tipo,
      evidenciaBrujula:
        par.id === 'propiedad-autoridad' ? entidad.evidenciaBrujula?.grado : undefined,
      cx: aCoordenada(vx),
      cy: TOTAL - aCoordenada(vy),
    });
  }
  return lista;
}

/** Marco, cruz central y marcas de ±50: compartidos por brújula y detalle. */
function EstructuraPlano() {
  return (
    <>
      <line
        className="mapa-plano__media"
        x1={MARGEN}
        y1={TOTAL / 2}
        x2={TOTAL - MARGEN}
        y2={TOTAL / 2}
      />
      <line
        className="mapa-plano__media"
        x1={TOTAL / 2}
        y1={MARGEN}
        x2={TOTAL / 2}
        y2={TOTAL - MARGEN}
      />
      {[-50, 50].map((valor) => (
        <g key={valor} className="mapa-plano__marcas">
          <line
            x1={aCoordenada(valor)}
            y1={TOTAL / 2 - 4}
            x2={aCoordenada(valor)}
            y2={TOTAL / 2 + 4}
          />
          <line
            x1={TOTAL / 2 - 4}
            y1={TOTAL - aCoordenada(valor)}
            x2={TOTAL / 2 + 4}
            y2={TOTAL - aCoordenada(valor)}
          />
        </g>
      ))}
    </>
  );
}

/** Descriptores de esquina en tipografía pequeña y tinta suave. */
function EsquinasPlano({ esquinas }: { esquinas: [string, string, string, string] }) {
  const [arribaIzq, arribaDcha, abajoIzq, abajoDcha] = esquinas;
  return (
    <g className="mapa-plano__esquinas" aria-hidden="true">
      <text x={MARGEN + 8} y={MARGEN + 16} textAnchor="start">
        {arribaIzq}
      </text>
      <text x={TOTAL - MARGEN - 8} y={MARGEN + 16} textAnchor="end">
        {arribaDcha}
      </text>
      <text x={MARGEN + 8} y={TOTAL - MARGEN - 9} textAnchor="start">
        {abajoIzq}
      </text>
      <text x={TOTAL - MARGEN - 8} y={TOTAL - MARGEN - 9} textAnchor="end">
        {abajoDcha}
      </text>
    </g>
  );
}

/**
 * Capa de corrientes de fondo: teselación por vecino más cercano de las
 * referencias doctrinales incluidas (zonasCorrientes.ts). Se pinta en dos
 * partes para respetar el orden de capas: los tintes y fronteras van bajo la
 * estructura del plano, y los rótulos de zona sobre ella pero SIEMPRE detrás
 * de los puntos y rótulos de partidos. Todo es decorativo-orientativo: fuera
 * del árbol de accesibilidad, con el nombre completo en el tooltip nativo.
 */
function CapaCorrientes({
  par,
  parte,
  interactiva = false,
  activa = null,
  fijada = null,
  alEntrar,
  alSalir,
  alFijar,
  reservadosExtra = [],
  incluirProfundidad = false,
}: {
  par: ParEjes;
  parte: 'fondo' | 'rotulos';
  interactiva?: boolean;
  activa?: string | null;
  fijada?: string | null;
  alEntrar?: (id: string) => void;
  alSalir?: () => void;
  alFijar?: (id: string) => void;
  reservadosExtra?: Rect[];
  incluirProfundidad?: boolean;
}) {
  const capa = capaCorrientes(
    par.id,
    par.x,
    par.y,
    MARGEN,
    LADO,
    [
      ...rectsEsquinas(ESQUINAS[par.id] ?? ESQUINAS['economico-social']!),
      ...reservadosExtra,
    ],
    incluirProfundidad,
  );
  const [zonaConTab, setZonaConTab] = useState<string | null>(null);
  if (capa.zonas.length === 0) return null;
  const zonaTab = capa.zonas.some((zona) => zona.id === zonaConTab)
    ? zonaConTab
    : capa.zonas[0]?.id ?? null;

  const moverFoco = (
    evento: ReactKeyboardEvent<SVGPathElement>,
    zonaActual: (typeof capa.zonas)[number],
  ) => {
    const direcciones: Record<string, { dx: number; dy: number }> = {
      ArrowLeft: { dx: -1, dy: 0 },
      ArrowRight: { dx: 1, dy: 0 },
      ArrowUp: { dx: 0, dy: 1 },
      ArrowDown: { dx: 0, dy: -1 },
    };
    let siguiente: (typeof capa.zonas)[number] | undefined;
    if (evento.key === 'Home') siguiente = capa.zonas[0];
    else if (evento.key === 'End') siguiente = capa.zonas.at(-1);
    else {
      const direccion = direcciones[evento.key];
      if (!direccion) return false;
      siguiente = capa.zonas
        .filter((zona) => {
          const dx = zona.vx - zonaActual.vx;
          const dy = zona.vy - zonaActual.vy;
          return dx * direccion.dx + dy * direccion.dy > 0.01;
        })
        .sort((a, b) => {
          const puntuar = (zona: (typeof capa.zonas)[number]) => {
            const dx = zona.vx - zonaActual.vx;
            const dy = zona.vy - zonaActual.vy;
            const avance = Math.abs(dx * direccion.dx + dy * direccion.dy);
            const lateral = Math.abs(dx * direccion.dy - dy * direccion.dx);
            return Math.hypot(dx, dy) + lateral * 1.5 - avance * 0.1;
          };
          return puntuar(a) - puntuar(b);
        })[0];
    }
    if (!siguiente) return false;
    evento.preventDefault();
    setZonaConTab(siguiente.id);
    alEntrar?.(siguiente.id);
    const grupo = evento.currentTarget.parentElement;
    const destino = grupo?.querySelector<SVGPathElement>(
      `[data-zona-id="${siguiente.id}"]`,
    );
    destino?.focus();
    return true;
  };

  if (parte === 'fondo') {
    return (
      <g
        className="mapa-zonas"
        aria-hidden={interactiva ? undefined : true}
        aria-label={interactiva ? 'Zonas doctrinales orientativas' : undefined}
      >
        {capa.zonas.map((zona) => (
          <path
            key={zona.id}
            className={`mapa-zona${interactiva ? ' mapa-zona--interactiva' : ''}`}
            data-tono={zona.tono}
            data-zona-id={zona.id}
            data-activa={activa === zona.id}
            data-tiene-rotulo={zona.etiqueta ? 'true' : 'false'}
            d={zona.d}
            shapeRendering="geometricPrecision"
            role={interactiva ? 'button' : undefined}
            tabIndex={interactiva ? (zona.id === zonaTab ? 0 : -1) : undefined}
            aria-pressed={interactiva ? fijada === zona.id : undefined}
            aria-label={
              interactiva
                ? `${zona.nombre}: mostrar explicación de esta corriente de referencia`
                : undefined
            }
            onMouseEnter={interactiva ? () => alEntrar?.(zona.id) : undefined}
            onMouseLeave={interactiva ? alSalir : undefined}
            onFocus={
              interactiva
                ? () => {
                    setZonaConTab(zona.id);
                    alEntrar?.(zona.id);
                  }
                : undefined
            }
            onBlur={interactiva ? alSalir : undefined}
            onClick={
              interactiva
                ? (evento) => {
                    evento.stopPropagation();
                    alFijar?.(zona.id);
                  }
                : undefined
            }
            onKeyDown={
              interactiva
                ? (evento) => {
                    if (moverFoco(evento, zona)) return;
                    if (evento.key === 'Enter' || evento.key === ' ') {
                      evento.preventDefault();
                      alFijar?.(zona.id);
                    }
                  }
                : undefined
            }
          >
            <title>{`${zona.nombre} — referencia doctrinal más cercana en esta zona del plano`}</title>
          </path>
        ))}
        {capa.bordes ? <path className="mapa-zonas__borde" d={capa.bordes} /> : null}
      </g>
    );
  }
  return (
    <g className="mapa-zonas__rotulos" aria-hidden="true">
      {capa.zonas.map((zona) =>
        zona.etiqueta && (!interactiva || activa === zona.id) ? (
          <text
            key={zona.id}
            className="mapa-zona__nombre"
            x={zona.etiqueta.x}
            y={zona.etiqueta.y}
            textAnchor="middle"
          >
            {zona.etiqueta.lineas.map((linea, indice) => (
              <tspan
                key={indice}
                x={zona.etiqueta!.x}
                dy={indice === 0 ? 0 : ALTO_LINEA_ZONA}
              >
                {linea}
              </tspan>
            ))}
          </text>
        ) : null,
      )}
    </g>
  );
}

/** Polos del eje vertical (arriba/abajo) y horizontal alrededor del plano. */
function PolosPlano({ ejeX, ejeY, children }: { ejeX: Eje; ejeY: Eje; children: ReactNode }) {
  return (
    <>
      <span className="mapa-plano__polo mapa-plano__polo--arriba">
        {poloLlano(ejeY, 'positivo')}
      </span>
      {children}
      <span className="mapa-plano__polo mapa-plano__polo--abajo">
        {poloLlano(ejeY, 'negativo')}
      </span>
      <div className="mapa-plano__polos-x">
        <span>{poloLlano(ejeX, 'negativo')}</span>
        <span>{poloLlano(ejeX, 'positivo')}</span>
      </div>
    </>
  );
}

/**
 * Mantiene visibles las corrientes pendientes sin concederles territorio.
 * El círculo hueco marca únicamente el prior editorial que debe auditarse:
 * no recorta el Voronoi y nunca puede ser la corriente más cercana.
 */
function AnclasAtlasBloqueadas({
  anclas,
  activa,
  alEntrar,
  alSalir,
  alFijar,
}: {
  anclas: readonly CorrienteAtlas[];
  activa: string | null;
  alEntrar: (id: string) => void;
  alSalir: () => void;
  alFijar: (id: string) => void;
}) {
  if (anclas.length === 0) return null;
  return (
    <g className="mapa-anclas-bloqueadas" aria-label="Anclas ideológicas en investigación">
      {anclas.map((corriente) => {
        const cx = aCoordenada(corriente.coordenadas.x);
        const cy = TOTAL - aCoordenada(corriente.coordenadas.y);
        const estaActiva = activa === corriente.id;
        return (
          <g
            key={corriente.id}
            className="mapa-ancla-bloqueada"
            data-activa={estaActiva}
            data-corriente-id={corriente.id}
            role="button"
            tabIndex={0}
            aria-label={`${corriente.nombre}: ancla en investigación, sin región geométrica`}
            onMouseEnter={() => alEntrar(corriente.id)}
            onMouseLeave={alSalir}
            onFocus={() => alEntrar(corriente.id)}
            onBlur={alSalir}
            onClick={(evento) => {
              evento.stopPropagation();
              alFijar(corriente.id);
            }}
            onKeyDown={(evento) => {
              if (evento.key === 'Enter' || evento.key === ' ') {
                evento.preventDefault();
                alFijar(corriente.id);
              }
            }}
          >
            <title>{`${corriente.nombre} — prior en investigación; no posee celda ni participa en cercanía`}</title>
            <circle className="mapa-ancla-bloqueada__hit" cx={cx} cy={cy} r={24} />
            <circle className="mapa-ancla-bloqueada__forma" cx={cx} cy={cy} r={5} />
            {estaActiva ? (
              <text className="mapa-ancla-bloqueada__rotulo" x={cx + 9} y={cy - 8}>
                {corriente.nombre}
              </text>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

/**
 * Brújula clásica: Propiedad/mercado × Poder con la orientación reconocible (poder
 * concentrado arriba, libertades y poder distribuido abajo) y lavados suaves,
 * la excepción deliberada y acotada a la regla de un-solo-acento — solo el
 * fondo del plano; puntos, rótulos y UI siguen en tinta y carmín. Es un
 * resumen para reconocer de un vistazo: la lectura punto a punto vive en la
 * vista detallada de abajo.
 */
function Brujula({
  puntos,
  anclasBloqueadas,
  descripcionId,
  corrientes,
  corrienteActiva,
  corrienteFijada,
  partidoFijado,
  alEntrarCorriente,
  alSalirCorriente,
  alFijarCorriente,
  alFijarPartido,
  incluirProfundidad,
}: {
  puntos: PuntoPlano[];
  anclasBloqueadas: readonly CorrienteAtlas[];
  descripcionId: string;
  corrientes: boolean;
  corrienteActiva: string | null;
  corrienteFijada: string | null;
  partidoFijado: string | null;
  alEntrarCorriente: (id: string) => void;
  alSalirCorriente: () => void;
  alFijarCorriente: (id: string) => void;
  alFijarPartido: (id: string) => void;
  incluirProfundidad: boolean;
}) {
  /* En la brújula solo «Tú» queda rotulado de forma permanente. Cada partido
     revela sus siglas al pasar, enfocar o tocar su punto; así el cúmulo de la
     izquierda sigue siendo legible en móvil. Los rombos se explican mediante
     sus zonas doctrinales y en la vista detallada inferior. */
  const etiquetas = useMemo(() => {
    const resultado = new Map<string, EtiquetaColocada>();
    for (const punto of puntos) {
      if (punto.tipo === 'referencia') continue;
      const haciaIzquierda = punto.cx > TOTAL - 76;
      const cercaDelBordeInferior = punto.cy > TOTAL - 24;
      resultado.set(punto.id, {
        x: punto.cx + (haciaIzquierda ? -9 : 9),
        y: punto.cy + (cercaDelBordeInferior ? -9 : 4),
        anclaje: haciaIzquierda ? 'end' : 'start',
      });
    }
    return resultado;
  }, [puntos]);
  const reservadosCorrientes = useMemo(
    () =>
      puntos.map((punto) => ({
        x: punto.cx - 10,
        y: punto.cy - 10,
        ancho: 20,
        alto: 20,
      })),
    [puntos],
  );
  return (
    <svg
      viewBox={`0 0 ${TOTAL} ${TOTAL}`}
      role="group"
      aria-label="Brújula política: Propiedad y mercado por Poder político y libertades"
      aria-describedby={descripcionId}
    >
      <defs>
        {[
          { id: 'io', cx: MARGEN, cy: MARGEN, clase: 'mapa-gradiente__io' },
          { id: 'do', cx: TOTAL - MARGEN, cy: MARGEN, clase: 'mapa-gradiente__do' },
          { id: 'il', cx: MARGEN, cy: TOTAL - MARGEN, clase: 'mapa-gradiente__il' },
          { id: 'dl', cx: TOTAL - MARGEN, cy: TOTAL - MARGEN, clase: 'mapa-gradiente__dl' },
        ].map((gradiente) => (
          <radialGradient
            id={`${descripcionId}-${gradiente.id}`}
            key={gradiente.id}
            cx={gradiente.cx}
            cy={gradiente.cy}
            r={LADO * 0.92}
            gradientUnits="userSpaceOnUse"
          >
            <stop className={gradiente.clase} offset="0" stopOpacity="0.2" />
            <stop className={gradiente.clase} offset="0.55" stopOpacity="0.1" />
            <stop className={gradiente.clase} offset="1" stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>
      <rect className="mapa-plano__marco" x={MARGEN} y={MARGEN} width={LADO} height={LADO} />
      <g className="mapa-plano__lavados" aria-hidden="true">
        {['io', 'do', 'il', 'dl'].map((id) => (
          <rect
            key={id}
            x={MARGEN}
            y={MARGEN}
            width={LADO}
            height={LADO}
            fill={`url(#${descripcionId}-${id})`}
          />
        ))}
      </g>
      {corrientes ? (
        <CapaCorrientes
          par={PAR_BRUJULA}
          parte="fondo"
          interactiva
          activa={corrienteActiva}
          fijada={corrienteFijada}
          alEntrar={alEntrarCorriente}
          alSalir={alSalirCorriente}
          alFijar={alFijarCorriente}
          reservadosExtra={reservadosCorrientes}
          incluirProfundidad={incluirProfundidad}
        />
      ) : null}
      {corrientes ? (
        <AnclasAtlasBloqueadas
          anclas={anclasBloqueadas}
          activa={corrienteActiva}
          alEntrar={alEntrarCorriente}
          alSalir={alSalirCorriente}
          alFijar={alFijarCorriente}
        />
      ) : null}
      <EstructuraPlano />
      <EsquinasPlano esquinas={ESQUINAS['propiedad-autoridad']!} />
      {corrientes ? (
        <CapaCorrientes
          par={PAR_BRUJULA}
          parte="rotulos"
          interactiva
          activa={corrienteActiva}
          reservadosExtra={reservadosCorrientes}
          incluirProfundidad={incluirProfundidad}
        />
      ) : null}
      {puntos.map((punto) => {
        const etiqueta = etiquetas.get(punto.id);
        const partidoInteractivo = punto.tipo === 'partido';
        const partidoSeleccionado = partidoInteractivo && partidoFijado === punto.id;
        const posicionProvisional =
          partidoInteractivo && punto.evidenciaBrujula === 'provisional';
        const posicionEstimada =
          partidoInteractivo && punto.evidenciaBrujula === 'estimada';
        const descripcionEvidencia = posicionProvisional
          ? ' Posición provisional: se calcula con evidencia parcial y se dibuja hueca.'
          : posicionEstimada
            ? ' Posición estimada: la evidencia todavía no alcanza el contrato y el punto se dibuja tenue; el detalle lista lo que falta.'
            : '';
        return (
          <g
            key={punto.id}
            className="mapa-punto mapa-punto--quieto"
            data-tipo={punto.tipo}
            data-entidad-id={punto.id}
            data-seleccionado={partidoSeleccionado}
            data-evidencia={punto.evidenciaBrujula}
            role={partidoInteractivo ? 'button' : undefined}
            tabIndex={partidoInteractivo ? -1 : undefined}
            aria-pressed={partidoInteractivo ? partidoSeleccionado : undefined}
            aria-label={
              partidoInteractivo
                ? `${punto.nombre}.${descripcionEvidencia} Mostrar u ocultar sus siglas`
                : undefined
            }
            onClick={partidoInteractivo ? () => alFijarPartido(punto.id) : undefined}
            onKeyDown={
              partidoInteractivo
                ? (evento) => {
                    if (evento.key === 'Enter' || evento.key === ' ') {
                      evento.preventDefault();
                      alFijarPartido(punto.id);
                    }
                  }
                : undefined
            }
          >
            <title>{`${punto.nombre}.${descripcionEvidencia}`}</title>
            {partidoInteractivo ? (
              <circle
                className="mapa-punto__hit"
                cx={punto.cx}
                cy={punto.cy}
                r={24}
                aria-hidden="true"
              />
            ) : null}
            {punto.tipo === 'referencia' ? (
              <rect
                className="mapa-punto__forma"
                x={punto.cx - 5}
                y={punto.cy - 5}
                width={10}
                height={10}
                transform={`rotate(45 ${punto.cx} ${punto.cy})`}
              />
            ) : (
              <circle
                className="mapa-punto__forma"
                cx={punto.cx}
                cy={punto.cy}
                r={punto.tipo === 'usuario' ? 7 : 5}
              />
            )}
            {etiqueta ? (
              <text
                className="mapa-punto__rotulo"
                x={etiqueta.x}
                y={etiqueta.y}
                textAnchor={etiqueta.anclaje}
              >
                {punto.etiqueta}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

export function MapaPolitico({
  facetasUsuario,
  resumenDoctrinal,
  puedeRecargar,
  alConfirmarGuardado,
  alMontar,
}: Props) {
  const idBase = useId();
  const [parId, setParId] = useState(PARES[0]?.id ?? 'economico-social');
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [ver3D, setVer3D] = useState(false);
  /* Orden del propietario (2026-07-12): el atlas completo con corrientes y
     profundidad es el ÚNICO modo — sin conmutadores ni variante simplificada.
     El nombre y la explicación de cada región siguen apareciendo solo al
     pasar, enfocar o tocar (sin sopa de rótulos). */
  const [corrienteTemporal, setCorrienteTemporal] = useState<string | null>(null);
  const [corrienteFijada, setCorrienteFijada] = useState<string | null>(null);
  const [vistaRotuloOriginalFijada, setVistaRotuloOriginalFijada] = useState(false);
  const [partidoBrujulaFijado, setPartidoBrujulaFijado] = useState<string | null>(null);
  const [cumuloPartidos, setCumuloPartidos] = useState<string[]>([]);
  /* Cúmulo del plano detallado: cuando varios puntos comparten objetivo de
     toque, un clic abre la desambiguación en lugar de premiar al de encima.
     El teclado no lo necesita: cada punto conserva su propio tabulador. */
  const [cumuloDetalle, setCumuloDetalle] = useState<string[]>([]);
  const cumuloBrujulaRef = useRef<HTMLDivElement>(null);
  const cumuloDetalleRef = useRef<HTMLDivElement>(null);
  /* Al abrirse una desambiguación, el foco entra en el panel para que el
     lector de pantalla la anuncie; al resolverla, vuelve al punto elegido. */
  useEffect(() => {
    if (cumuloPartidos.length > 1) cumuloBrujulaRef.current?.focus();
  }, [cumuloPartidos]);
  useEffect(() => {
    if (cumuloDetalle.length > 1) cumuloDetalleRef.current?.focus();
  }, [cumuloDetalle]);
  const corrientesVisibles = useMemo(() => corrientesAtlasVisibles(true), []);
  const anclasBloqueadasVisibles = useMemo(() => anclasAtlasBloqueadasVisibles(true), []);
  const opcionesAtlas = useMemo(() => opcionesBusquedaAtlas(true), []);
  const numeroRegionesPrincipales = corrientesAtlasVisibles(false).length;
  const numeroRegionesProfundidad =
    corrientesAtlasVisibles(true).length - numeroRegionesPrincipales;
  const numeroAnclasBloqueadasPrincipales = anclasAtlasBloqueadasVisibles(false).length;
  const numeroAnclasBloqueadasProfundidad =
    anclasAtlasBloqueadasVisibles(true).length - numeroAnclasBloqueadasPrincipales;
  const numeroEntradasPrincipales = entradasAtlasExplorables(false).length;
  const numeroEntradasProfundidad =
    entradasAtlasExplorables(true).length - numeroEntradasPrincipales;
  const numeroContextosPrincipales =
    numeroEntradasPrincipales - numeroRegionesPrincipales - numeroAnclasBloqueadasPrincipales;
  const numeroContextosProfundidad =
    numeroEntradasProfundidad - numeroRegionesProfundidad - numeroAnclasBloqueadasProfundidad;

  useEffect(() => {
    try {
      if (sessionStorage.getItem(CLAVE_REABRIR_3D) === '1') {
        sessionStorage.removeItem(CLAVE_REABRIR_3D);
        setVer3D(true);
      }
    } catch {
      // El visor sigue disponible manualmente si sessionStorage está bloqueado.
    }
  }, []);

  useEffect(() => {
    alMontar?.();
  }, [alMontar]);

  const par = PARES.find((p) => p.id === parId) ?? PARES[0]!;
  const ejePorId = useMemo(() => new Map(EJES_MAPA.map((eje) => [eje.id, eje])), []);
  const facetaUsuarioPorEje = useMemo(
    () => new Map(facetasUsuario.map((faceta) => [faceta.facetaId, faceta])),
    [facetasUsuario],
  );

  const ejeX = ejePorId.get(par.x);
  const ejeY = ejePorId.get(par.y);
  const ejeEconomiaBrujula = EJE_ECONOMIA_BRUJULA;

  const facetaAutoridadUsuario = facetaUsuarioPorEje.get(EJE_AUTORIDAD_POLITICA);

  const valoresUsuario = useMemo(() => {
    const valores: Record<string, number | null> = {};
    for (const eje of EJES_MAPA) {
      valores[eje.id] = facetaUsuarioPorEje.get(eje.id)?.valor ?? null;
    }
    valores[EJE_PROPIEDAD_MERCADO] =
      facetaUsuarioPorEje.get(EJE_PROPIEDAD_MERCADO)?.valor ?? null;
    valores[EJE_AUTORIDAD_POLITICA] = facetaAutoridadUsuario?.valor ?? null;
    return valores;
  }, [facetaUsuarioPorEje, facetaAutoridadUsuario?.valor]);

  const usuarioProvisional = EJES_MAPA.some((eje) => {
    const faceta = facetaUsuarioPorEje.get(eje.id);
    return faceta ? faceta.valor !== null && !faceta.coberturaSuficiente : false;
  }) ||
    (() => {
      const propiedad = facetaUsuarioPorEje.get(EJE_PROPIEDAD_MERCADO);
      return propiedad ? propiedad.valor !== null && !propiedad.coberturaSuficiente : false;
    })() ||
    (facetaAutoridadUsuario?.valor !== null &&
      facetaAutoridadUsuario?.valor !== undefined &&
      !facetaAutoridadUsuario.coberturaSuficiente);

  const usuarioEnPlano =
    typeof valoresUsuario[par.x] === 'number' && typeof valoresUsuario[par.y] === 'number';

  const puntos = useMemo(() => puntosDelPar(par, valoresUsuario), [par, valoresUsuario]);
  const etiquetas = useMemo(
    () => colocarEtiquetas(puntos, rectsEsquinas(ESQUINAS[par.id] ?? ESQUINAS['economico-social']!)),
    [puntos, par.id],
  );

  const parBrujula = PAR_BRUJULA;
  const puntosBrujula = useMemo(
    () => puntosDelPar(parBrujula, valoresUsuario),
    [parBrujula, valoresUsuario],
  );
  const partidosBrujula = puntosBrujula.filter((punto) => punto.tipo === 'partido');
  const partidosProvisionalesBrujula = partidosBrujula.filter(
    (punto) => punto.evidenciaBrujula === 'provisional',
  );
  const partidosEstimadosBrujula = partidosBrujula.filter(
    (punto) => punto.evidenciaBrujula === 'estimada',
  );
  const usuarioEnBrujula = puntosBrujula.some((punto) => punto.tipo === 'usuario');

  const entidadSeleccionada: EntidadMapa | null =
    seleccion && seleccion !== 'usuario'
      ? ENTIDADES_MAPA.find((entidad) => entidad.id === seleccion) ?? null
      : null;

  const partidosEnPlano = puntos.filter((punto) => punto.tipo === 'partido').length;
  const referenciasEnPlano = puntos.filter((punto) => punto.tipo === 'referencia').length;
  const referenciasEnAlgunPlano = ENTIDADES_MAPA.filter(
    (entidad) => entidad.tipo === 'referencia',
  ).length;
  const partidosEnAlgunPlano = ENTIDADES_MAPA.filter(
    (entidad) => entidad.tipo === 'partido',
  ).length;
  const hayCorrientes = corrientesVisibles.length > 0;
  const partidosFuera = TOTAL_PARTIDOS_CATALOGO - partidosEnAlgunPlano;
  const referenciasFuera = TOTAL_REFERENCIAS_CATALOGO - referenciasEnAlgunPlano;
  /* La zona del fondo bajo el punto del usuario, con su distancia real:
     el Voronoi reparte TODO el plano entre las anclas dibujadas, así que en
     cruces poco poblados una referencia puede «poseer» media franja (el caso
     «izquierda + orden → franquismo» del feedback beta). Decirlo debajo del
     plano convierte una etiqueta aparente en una lectura de cercanía. */
  const zonaUsuarioDetalle = useMemo(
    () => zonaMasCercanaDelPar(par.x, par.y, valoresUsuario),
    [par, valoresUsuario],
  );
  /* Una selección fijada por clic/teclado tiene prioridad sobre el hover.
     Así la ficha no cambia mientras la persona mueve el puntero desde el
     mapa hasta «Más información». Para elegir otra zona basta con pulsarla. */
  const corrienteActivaId = corrienteFijada ?? corrienteTemporal;
  const corrienteActiva = corrienteActivaId
    ? CORRIENTE_ATLAS_POR_ID.get(corrienteActivaId) ?? null
    : null;
  const vistaRotuloOriginalActiva =
    vistaRotuloOriginalFijada &&
    corrienteFijada !== null &&
    corrienteFijada === corrienteActivaId;
  const corrienteActivaReferencia = corrienteActiva?.referenciaId
    ? REFERENCIAS.find((referencia) => referencia.id === corrienteActiva.referenciaId)
    : undefined;
  const nombreFichaAtlasActiva =
    vistaRotuloOriginalActiva && corrienteActiva?.trazabilidadOriginal
      ? corrienteActiva.trazabilidadOriginal.nombreOriginal
      : corrienteActiva?.nombre;
  const corrienteUsuario =
    typeof valoresUsuario[EJE_PROPIEDAD_MERCADO] === 'number' &&
    typeof valoresUsuario[EJE_AUTORIDAD_POLITICA] === 'number'
      ? corrienteAtlasMasCercana(
          valoresUsuario[EJE_PROPIEDAD_MERCADO],
          valoresUsuario[EJE_AUTORIDAD_POLITICA],
          corrientesVisibles,
        )
      : null;

  const seleccionarPartidoBrujula = (id: string, detectarCumulo = true) => {
    const idsCercanos = detectarCumulo
      ? idsPartidosEnCumulo(partidosBrujula, id, radioCumuloEfectivo())
      : [];
    setCorrienteTemporal(null);
    setCorrienteFijada(null);
    setVistaRotuloOriginalFijada(false);
    if (idsCercanos.length > 1) {
      setCumuloPartidos(idsCercanos);
      setPartidoBrujulaFijado(null);
      return;
    }
    setCumuloPartidos([]);
    setPartidoBrujulaFijado((actual) => (actual === id ? null : id));
  };

  const descripcionId = `${idBase}-descripcion`;
  const tituloPlanoId = `${idBase}-plano`;
  const brujulaDescId = `${idBase}-brujula`;

  if (!ejeX || !ejeY) return null;

  const lecturaSeleccion = () => {
    if (!seleccion) return null;
    if (seleccion === 'usuario') {
      return (
        <div className="mapa-lectura" role="status">
          <p className="mapa-lectura__titular">
            <strong>Tu posición.</strong>
            {usuarioProvisional ? (
              <span className="mapa-lectura__tipo"> Alguna posición aún provisional.</span>
            ) : null}
          </p>
          <LecturaEjes ejes={EJES_MAPA} valores={valoresUsuario} nombreCorto={NOMBRE_CORTO_EJE} />
        </div>
      );
    }
    if (!entidadSeleccionada) return null;
    const distanciaPlano = distanciaEspacial(valoresUsuario, entidadSeleccionada.valores, [
      par.x,
      par.y,
    ]);
    return (
      <div className="mapa-lectura" role="status">
        <p className="mapa-lectura__titular">
          <strong>{entidadSeleccionada.nombre}.</strong>{' '}
          <span className="mapa-lectura__tipo">
            {entidadSeleccionada.tipo === 'referencia'
              ? 'Referencia doctrinal, no votable.'
              : 'Partido.'}
          </span>
        </p>
        <LecturaEjes
          ejes={EJES_MAPA}
          valores={entidadSeleccionada.valores}
          nombreCorto={NOMBRE_CORTO_EJE}
        />
        {distanciaPlano !== null ? (
          <p className="mapa-lectura__distancia">
            Distancia a ti en este plano: {Math.round(distanciaPlano)} (orientativa).
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <div className="mapa-politico">
      <div className="mapa-como-leer">
        <p>
          <strong>Cómo leer este mapa.</strong> Cada punto negro es un partido y el fondo forma
          un atlas de corrientes doctrinales; ninguna zona es una papeleta. Tu punto es el carmín.
          Cuanto más cerca está un punto, más se parece en propiedad productiva y reparto del
          poder político, no necesariamente en el resto de tus respuestas.
        </p>
        <p className="mapa-como-leer__nota">
          El ranking de afinidad de más abajo usa todas tus respuestas, no solo estas dos
          dimensiones: su orden puede no coincidir con las cercanías de este plano.
        </p>
        <p className="mapa-como-leer__nota">
          El horizontal separa propiedad social, pública o cooperativa de propiedad privada y
          mercados; la fiscalidad y la intervención estatal se miden aparte. «Poder» se calcula
          directamente con preguntas de contrapesos, libertades, coerción, jerarquía,
          participación y revocación. Cultura y moral no empujan esa vertical. El GAL–TAN se
          conserva en los planos detallados.
        </p>
      </div>

      <p id={brujulaDescId} className="solo-lectores">
        Plano de menos cien a más cien por eje. Horizontal, propiedad y mercado: de{' '}
        {poloLlano(ejeEconomiaBrujula, 'negativo')} a{' '}
        {poloLlano(ejeEconomiaBrujula, 'positivo')}. Vertical,
        Poder político: de {poloLlano(EJE_PODER_BRUJULA, 'negativo')} abajo a{' '}
        {poloLlano(EJE_PODER_BRUJULA, 'positivo')} arriba. Esta vertical usa preguntas directas
        sobre pluralismo, contrapesos, libertades, coerción, organización y participación; no
        deriva la autoridad de las costumbres ni de la posición económica.
      </p>

      {hayCorrientes ? (
        <div className="mapa-corrientes-control">
          <span className="mapa-corrientes-control__nota">
            Explora una zona para explicar una corriente; señala un punto para identificar un
            partido.
          </span>
          <span className="mapa-corrientes-control__nota" role="status">
            El atlas completo es el único modo: incluye{' '}
            {numeroRegionesPrincipales + numeroRegionesProfundidad} regiones geométricas,{' '}
            {numeroAnclasBloqueadasPrincipales + numeroAnclasBloqueadasProfundidad} anclas
            huecas en investigación y{' '}
            {numeroContextosPrincipales + numeroContextosProfundidad} entradas contextuales
            buscables, sin cambiar tu resultado. Solo las regiones publicadas ocupan una celda;
            las anclas huecas son explorables, pero no poseen celda ni cuentan como cercanía.
          </span>
          <label className="mapa-corrientes-control__buscador">
            <span>Buscar en el atlas</span>
            <select
              value={
                corrienteFijada
                  ? vistaRotuloOriginalFijada
                    ? `rotulo-original:${corrienteFijada}`
                    : corrienteFijada
                  : ''
              }
              onChange={(evento) => {
                const opcion = evento.target.value
                  ? resolverOpcionBusquedaAtlas(
                      evento.target.value,
                      true,
                    )
                  : null;
                setPartidoBrujulaFijado(null);
                setCorrienteTemporal(null);
                setCorrienteFijada(opcion?.corrienteId ?? null);
                setVistaRotuloOriginalFijada(opcion?.vista === 'rotulo-original');
              }}
            >
              <option value="">Selecciona una entrada…</option>
              {[...opcionesAtlas]
                .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
                .map((opcion) => (
                  <option key={opcion.clave} value={opcion.clave}>
                    {opcion.nombre}
                    {opcion.etiquetaFuente && opcion.etiquetaFuente !== opcion.nombre
                      ? ` (${opcion.etiquetaFuente})`
                      : ''}
                    {opcion.vista === 'rotulo-original'
                      ? ` — rótulo original, ${nombreCapaAtlas(opcion.capa)}`
                      : ` — ${nombreCapaAtlas(opcion.capa)}`}
                  </option>
                ))}
            </select>
          </label>
          {partidosBrujula.length > 0 ? (
            <label className="mapa-corrientes-control__buscador">
              <span>Localizar un partido</span>
              <select
                value={partidoBrujulaFijado ?? ''}
                onChange={(evento) => {
                  const id = evento.target.value;
                  if (!id) {
                    setPartidoBrujulaFijado(null);
                    setCumuloPartidos([]);
                    return;
                  }
                  seleccionarPartidoBrujula(id, false);
                }}
              >
                <option value="">Selecciona un partido…</option>
                {[...partidosBrujula]
                  .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
                  .map((partido) => (
                    <option key={partido.id} value={partido.id}>
                      {partido.nombre}
                      {partido.evidenciaBrujula === 'provisional'
                        ? ' — posición provisional'
                        : partido.evidenciaBrujula === 'estimada'
                          ? ' — posición estimada'
                          : ''}
                    </option>
                  ))}
              </select>
            </label>
          ) : null}
        </div>
      ) : null}

      <div className="mapa-plano mapa-plano--brujula">
        <PolosPlano ejeX={ejeEconomiaBrujula} ejeY={EJE_PODER_BRUJULA}>
          <Brujula
            puntos={puntosBrujula}
            anclasBloqueadas={anclasBloqueadasVisibles}
            descripcionId={brujulaDescId}
            corrientes={hayCorrientes}
            corrienteActiva={corrienteActivaId}
            corrienteFijada={corrienteFijada}
            partidoFijado={partidoBrujulaFijado}
            alEntrarCorriente={setCorrienteTemporal}
            alSalirCorriente={() => setCorrienteTemporal(null)}
            alFijarCorriente={(id) => {
              setPartidoBrujulaFijado(null);
              setCorrienteTemporal(null);
              setCorrienteFijada((actual) =>
                actual === id && !vistaRotuloOriginalFijada ? null : id,
              );
              setVistaRotuloOriginalFijada(false);
            }}
            alFijarPartido={(id) => {
              seleccionarPartidoBrujula(id);
            }}
            incluirProfundidad={true}
          />
        </PolosPlano>
      </div>

      {partidosProvisionalesBrujula.length > 0 ? (
        <p className="mapa-evidencia-provisional">
          <strong>Puntos huecos: evidencia parcial.</strong>{' '}
          {partidosProvisionalesBrujula.length} de {partidosBrujula.length} partidos tienen
          suficientes posiciones independientes para una coordenada orientativa, pero todavía no
          alcanzan el contrato completo de cobertura. No se rellenan huecos ni se altera el ranking
          de afinidad; el selector permite identificarlos sin depender del punto.
        </p>
      ) : null}

      {partidosEstimadosBrujula.length > 0 ? (
        <p className="mapa-evidencia-provisional mapa-evidencia-estimada">
          <strong>Puntos tenues: posición estimada.</strong>{' '}
          {partidosEstimadosBrujula.length} de {partidosBrujula.length} partidos se dibujan con la
          media de las posiciones documentadas que tienen, aunque su evidencia aún no llega ni al
          nivel provisional — puede descansar en pocas fuentes o carecer de contrapesos. Están a la
          vista para no esconder el sistema de partidos, pero cada punto tenue lleva su recibo de
          lo que falta al tocarlo; solo quedan fuera los partidos sin ninguna coordenada calculable.
        </p>
      ) : null}

      {cumuloPartidos.length > 1 ? (
        <div
          className="mapa-cumulo"
          role="group"
          aria-label="Partidos muy próximos en el mapa"
          tabIndex={-1}
          ref={cumuloBrujulaRef}
        >
          <p>Hay varios partidos casi en el mismo punto. Elige cuál quieres identificar:</p>
          <div>
            {cumuloPartidos.map((id) => {
              const partido = partidosBrujula.find((punto) => punto.id === id);
              return partido ? (
                <button
                  key={id}
                  type="button"
                  className="boton boton--terciario"
                  onClick={() => {
                    seleccionarPartidoBrujula(id, false);
                    enfocarPuntoEnPlano('.mapa-plano--brujula', id);
                  }}
                >
                  {partido.nombre}
                  {partido.evidenciaBrujula === 'provisional'
                    ? ' (posición provisional)'
                    : partido.evidenciaBrujula === 'estimada'
                      ? ' (posición estimada)'
                      : ''}
                </button>
              ) : null;
            })}
          </div>
        </div>
      ) : null}

      {(() => {
        /* Recibo del punto fijado: qué evidencia sostiene la coordenada y qué
           pide el contrato. Es lo que convierte un punto tenue o hueco en una
           lectura auditable en vez de una etiqueta sin explicación. */
        const fijado = partidoBrujulaFijado
          ? ENTIDADES_MAPA.find((entidad) => entidad.id === partidoBrujulaFijado)
          : null;
        const evidencia = fijado?.evidenciaBrujula;
        if (!fijado || !evidencia || evidencia.grado === 'solida') return null;
        return (
          <p className="mapa-lectura__distancia mapa-recibo-brujula" role="status">
            <strong>{fijado.nombre}</strong> — posición{' '}
            {evidencia.grado === 'provisional' ? 'provisional' : 'estimada'}. Propiedad y
            mercado: {evidencia.propiedad.items} grupos independientes en{' '}
            {evidencia.propiedad.familias} subdimensiones. Poder:{' '}
            {evidencia.poder.items} grupos en {evidencia.poder.familias} familias, con{' '}
            {evidencia.poder.itemsNucleo} de contrapesos o libertades. El contrato completo pide
            6 grupos y 3 subdimensiones o familias por eje (2 de núcleo en Poder); hasta
            entonces la coordenada es la media de lo documentado, sin rellenar huecos.
          </p>
        );
      })()}

      {hayCorrientes ? (
        corrienteActiva ? (
          <div
            className="mapa-corriente-lectura"
            role="region"
            aria-live="polite"
            aria-label={`Explicación de ${nombreFichaAtlasActiva ?? corrienteActiva.nombre}`}
          >
            <FichaZonaIdeologica
              corriente={corrienteActiva}
              referencia={corrienteActivaReferencia}
              ejes={[ejeEconomiaBrujula, EJE_PODER_BRUJULA]}
              cercaDelUsuario={corrienteUsuario?.id === corrienteActiva.id}
              vistaRotuloOriginal={vistaRotuloOriginalActiva}
              onCerrar={() => {
                setCorrienteTemporal(null);
                setCorrienteFijada(null);
                setVistaRotuloOriginalFijada(false);
              }}
            />
          </div>
        ) : (
          <div className="mapa-corriente-instruccion" role="status">
            {corrienteUsuario ? (
              <>
                <span>
                  En estas dos dimensiones, tu punto queda más cerca de la zona{' '}
                  <strong>{corrienteUsuario.nombre}</strong>. Es orientación geométrica, no una
                  identidad ni el resultado doctrinal completo.
                  {(() => {
                    const cruce =
                      corrienteUsuario.referenciaId &&
                      corrienteUsuario.sensibilidad === 'normal'
                        ? resumenDoctrinal?.get(corrienteUsuario.referenciaId)
                        : undefined;
                    if (!cruce) {
                      return (
                        ' Estar cerca aquí y no aparecer en «corrientes afines» es normal: esto' +
                        ' mide dos ejes; aquello, sus preguntas definitorias.'
                      );
                    }
                    return cruce.publicable
                      ? ` Ahí también apareces: coincides en ${cruce.itemsComparados} de sus ${cruce.itemsDefinitorios} preguntas definitorias (ver «corrientes afines»).`
                      : ` En sus preguntas definitorias no llegas a su umbral: por eso NO aparece en «corrientes afines». Cercanía geométrica sin coincidencia doctrinal — es normal.`;
                  })()}
                </span>{' '}
                <button
                  type="button"
                  className="boton boton--terciario"
                  onClick={() => {
                    setCorrienteFijada(corrienteUsuario.id);
                    setVistaRotuloOriginalFijada(false);
                  }}
                >
                  Ver por qué
                </button>
              </>
            ) : (
              'Las regiones están sin rotular para mantener el mapa legible. Explora una zona para revelar su corriente y leerla en español.'
            )}
          </div>
        )
      ) : null}

      <ul className="mapa-leyenda" aria-label="Leyenda del mapa">
        <li>
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <circle cx="8" cy="8" r="6" className="mapa-leyenda__usuario" />
          </svg>
          Tú{usuarioProvisional ? ' (alguna posición provisional)' : ''}
        </li>
        <li>
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <circle cx="8" cy="8" r="5" className="mapa-leyenda__partido" />
          </svg>
          {partidosProvisionalesBrujula.length > 0
            ? 'Partido con posición sólida'
            : 'Partido comparable'}
        </li>
        {partidosProvisionalesBrujula.length > 0 ? (
          <li>
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <circle cx="8" cy="8" r="5" className="mapa-leyenda__partido-provisional" />
            </svg>
            Partido con posición provisional
          </li>
        ) : null}
        {partidosEstimadosBrujula.length > 0 ? (
          <li>
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <circle cx="8" cy="8" r="4" className="mapa-leyenda__partido-estimado" />
            </svg>
            Partido con posición estimada (evidencia inicial)
          </li>
        ) : null}
        <li>
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <rect x="2" y="2" width="12" height="12" className="mapa-leyenda__referencia" />
          </svg>
          Zona doctrinal del atlas, no votable
        </li>
      </ul>

      {!usuarioEnBrujula ? (
        <p className="aviso-cobertura">
          Tu posición no aparece en la brújula: falta una opinión calculable en{' '}
          {[parBrujula.x, parBrujula.y]
            .filter((eje) => typeof valoresUsuario[eje] !== 'number')
            .map((eje) => `el eje ${NOMBRE_CORTO_EJE[eje] ?? eje}`)
            .join(' y ')}
          . Nunca se dibuja una posición inventada.
        </p>
      ) : null}

      <p className="mapa-politico__enlace-detalle">
        <a href="#mapa-detalle">Ver en detalle: los tres cruces de ejes, punto a punto</a>
      </p>

      <div className="mapa-politico__disclaimer">
        <p>
          <strong>Ayuda a la orientación, no una recomendación de voto.</strong> Las
          puntuaciones por eje se basan en respuestas y evidencia documentada (fiables); las
          cercanías entre puntos son geométricas y orientativas: con otro modelo de distancia
          el vecino más próximo puede cambiar.
        </p>
      </div>

      <h3 id="mapa-detalle" className="mapa-detalle-titulo">
        En detalle: los tres cruces de ejes
      </h3>
      <div className="mapa-politico__intro nota-al-margen">
        <span>
          La brújula resume dos temas, pero en España el territorio es un eje propio: un
          partido puede coincidir contigo en economía y quedar lejos en autogobierno. Los tres
          ejes — Economía, Sociedad y Territorio — se miden con el mismo instrumento para ti,
          para los partidos y para las referencias doctrinales. Elige el cruce y toca
          cualquier punto para leerlo.
        </span>
        <AyudaEjes
          ejes={EJES_MAPA}
          etiqueta="Qué mide cada eje, con su nombre académico"
          nota="Sobre las corrientes de fondo: cada zona del plano se nombra por la referencia doctrinal más cercana, con posición calculada desde sus textos. El número de zonas crece a medida que el catálogo de referencias supera el umbral de evidencia."
        />
      </div>

      <fieldset className="mapa-pares">
        <legend className="solo-lectores">Par de ejes del plano</legend>
        {PARES.map((opcion) => (
          <label key={opcion.id} data-activo={opcion.id === par.id}>
            <input
              type="radio"
              name={`${idBase}-par`}
              value={opcion.id}
              checked={opcion.id === par.id}
              onChange={() => {
                setParId(opcion.id);
                setSeleccion(null);
                setCumuloDetalle([]);
              }}
            />
            {opcion.nombre}
          </label>
        ))}
      </fieldset>

      <p id={descripcionId} className="solo-lectores">
        Plano de dos ejes de menos cien a más cien. Eje horizontal, {nombreLlanoEje(ejeX)}: de{' '}
        {poloLlano(ejeX, 'negativo')} a {poloLlano(ejeX, 'positivo')}. Eje vertical,{' '}
        {nombreLlanoEje(ejeY)}: de {poloLlano(ejeY, 'negativo')} abajo a{' '}
        {poloLlano(ejeY, 'positivo')} arriba.
      </p>

      <div className="mapa-plano">
        <PolosPlano ejeX={ejeX} ejeY={ejeY}>
          <svg
            viewBox={`0 0 ${TOTAL} ${TOTAL}`}
            role="group"
            aria-labelledby={tituloPlanoId}
            aria-describedby={descripcionId}
            onClick={() => {
              setSeleccion(null);
              setCumuloDetalle([]);
            }}
          >
            <title id={tituloPlanoId}>Plano {par.nombre}</title>
            {/* Marco y cruz central: filetes de 1px, fondo en papel. */}
            <rect
              className="mapa-plano__marco"
              x={MARGEN}
              y={MARGEN}
              width={LADO}
              height={LADO}
            />
            {hayCorrientes ? <CapaCorrientes par={par} parte="fondo" /> : null}
            <EstructuraPlano />
            <EsquinasPlano esquinas={ESQUINAS[par.id] ?? ESQUINAS['economico-social']!} />
            {hayCorrientes ? <CapaCorrientes par={par} parte="rotulos" /> : null}

            {puntos.map((punto) => {
              const etiqueta = etiquetas.get(punto.id);
              const seleccionado = seleccion === punto.id;
              return (
                <g
                  key={punto.id}
                  className="mapa-punto"
                  data-tipo={punto.tipo}
                  data-entidad-id={punto.id}
                  data-seleccionado={seleccionado}
                  role="button"
                  tabIndex={0}
                  aria-pressed={seleccionado}
                  aria-label={
                    punto.tipo === 'usuario'
                      ? 'Tú: tu posición'
                      : `${punto.nombre}${punto.tipo === 'referencia' ? ' (referencia doctrinal, no votable)' : ''}`
                  }
                  onClick={(evento) => {
                    evento.stopPropagation();
                    /* Puntero/táctil: si varios puntos comparten el objetivo
                       ampliado, se pregunta cuál en vez de premiar al de
                       encima; ninguno queda inaccesible por tamaño. */
                    const cercanos = idsPartidosEnCumulo(puntos, punto.id, radioCumuloEfectivo());
                    if (cercanos.length > 1 && !seleccionado) {
                      setSeleccion(null);
                      setCumuloDetalle(cercanos);
                      return;
                    }
                    setCumuloDetalle([]);
                    setSeleccion(seleccionado ? null : punto.id);
                  }}
                  onKeyDown={(evento) => {
                    if (evento.key === 'Enter' || evento.key === ' ') {
                      evento.preventDefault();
                      setCumuloDetalle([]);
                      setSeleccion(seleccionado ? null : punto.id);
                    }
                  }}
                >
                  <title>{punto.nombre}</title>
                  <circle
                    className="mapa-punto__hit"
                    cx={punto.cx}
                    cy={punto.cy}
                    r={24}
                    aria-hidden="true"
                  />
                  {etiqueta && !etiqueta.elidida && etiquetaLejana(etiqueta, punto) ? (
                    <line
                      className="mapa-punto__guia"
                      x1={punto.cx}
                      y1={punto.cy}
                      x2={anclaEtiqueta(etiqueta).x}
                      y2={anclaEtiqueta(etiqueta).y}
                    />
                  ) : null}
                  {seleccionado ? (
                    <circle className="mapa-punto__halo" cx={punto.cx} cy={punto.cy} r={12} />
                  ) : null}
                  {punto.tipo === 'referencia' ? (
                    <rect
                      className="mapa-punto__forma"
                      x={punto.cx - 5}
                      y={punto.cy - 5}
                      width={10}
                      height={10}
                      transform={`rotate(45 ${punto.cx} ${punto.cy})`}
                    />
                  ) : (
                    <circle
                      className="mapa-punto__forma"
                      cx={punto.cx}
                      cy={punto.cy}
                      r={punto.tipo === 'usuario' ? 7 : 5}
                    />
                  )}
                  {etiqueta ? (
                    <text
                      className={`mapa-punto__rotulo${
                        etiqueta.elidida ? ' mapa-punto__rotulo--elidido' : ''
                      }`}
                      x={etiqueta.x}
                      y={etiqueta.y}
                      textAnchor={etiqueta.anclaje}
                    >
                      {punto.etiqueta}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </svg>
        </PolosPlano>
      </div>

      {cumuloDetalle.length > 1 ? (
        <div
          className="mapa-cumulo"
          role="group"
          aria-label="Puntos muy próximos en este plano"
          tabIndex={-1}
          ref={cumuloDetalleRef}
        >
          <p>Hay varios puntos casi en el mismo lugar. Elige cuál quieres leer:</p>
          <div>
            {cumuloDetalle.map((id) => {
              const punto = puntos.find((candidato) => candidato.id === id);
              return punto ? (
                <button
                  key={id}
                  type="button"
                  className="boton boton--terciario"
                  onClick={() => {
                    setCumuloDetalle([]);
                    setSeleccion(punto.id);
                    enfocarPuntoEnPlano('.mapa-plano:not(.mapa-plano--brujula)', punto.id);
                  }}
                >
                  {punto.tipo === 'usuario' ? 'Tú (tu posición)' : punto.nombre}
                  {punto.tipo === 'referencia' ? ' (referencia doctrinal)' : ''}
                </button>
              ) : null;
            })}
          </div>
        </div>
      ) : null}

      {!usuarioEnPlano ? (
        <p className="aviso-cobertura">
          Tu posición no aparece en este plano: falta una opinión calculable en{' '}
          {[par.x, par.y]
            .filter((eje) => typeof valoresUsuario[eje] !== 'number')
            .map((eje) => `el eje ${NOMBRE_CORTO_EJE[eje] ?? eje}`)
            .join(' y ')}
          . Nunca se dibuja una posición inventada.
        </p>
      ) : null}

      {usuarioEnPlano && hayCorrientes && zonaUsuarioDetalle ? (
        <p className="mapa-zona-usuario nota-al-margen" role="status">
          La zona de fondo bajo tu punto se nombra por la referencia dibujada más cercana:{' '}
          <strong>{zonaUsuarioDetalle.nombre}</strong>, a{' '}
          {Math.round(zonaUsuarioDetalle.distancia)} puntos de ti. Es una cercanía geométrica
          orientativa, no una etiqueta que te ponga el instrumento.
          {zonaUsuarioDetalle.distancia >= UMBRAL_ZONA_LEJANA
            ? ` Y queda lejos: en este cruce solo ${zonaUsuarioDetalle.dibujadas} referencias superan el umbral de evidencia, así que las zonas son grandes y aproximadas; la capa se afinará al documentarse más corrientes.`
            : ''}
        </p>
      ) : null}

      {lecturaSeleccion()}

      <div className="mapa-exclusiones">
        <p>
          En este plano: {usuarioEnPlano ? 'tu posición, ' : ''}
          {partidosEnPlano} de {TOTAL_PARTIDOS_CATALOGO} partidos y {referenciasEnPlano} de{' '}
          {TOTAL_REFERENCIAS_CATALOGO} referencias doctrinales del catálogo.{' '}
          En cada uno de los tres planos detallados, un partido aparece solo al alcanzar al menos
          4 grupos documentales independientes por eje, con URL, título, fecha de consulta y pasaje
          reproducible; repetir el mismo pasaje no suma cobertura y un extremo sin evidencia
          moderadora se omite. La brújula aplica su contrato propio: una posición sólida exige 6
          grupos por eje, 3 familias o subdimensiones y, para Poder, al menos dos grupos de
          contrapesos o libertades. Solo los partidos pueden publicarse provisionalmente —como
          puntos huecos— con 3 grupos y 2 familias por eje, y con al menos un grupo de contrapesos
          o libertades; y, por debajo, como posición estimada —punto tenue a trazos— cuando existe
          una coordenada calculable desde posiciones documentadas aunque la evidencia no llegue a
          esos mínimos: cada punto tenue lleva su recibo de lo que falta. Las referencias
          doctrinales nunca usan estos umbrales reducidos.{' '}
          {partidosFuera + referenciasFuera > 0
            ? `Quedan fuera de todos los planos ${partidosFuera} partidos y ${referenciasFuera} referencias: sin ninguna coordenada calculable desde posiciones documentadas no se dibuja nada — los huecos no se rellenan ni se estiman.`
            : ''}
        </p>
        {EXCLUIDAS_MAPA.length > 0 ? (
          <details>
            <summary>Ver las {EXCLUIDAS_MAPA.length} entidades excluidas y su evidencia</summary>
            <ul>
              {EXCLUIDAS_MAPA.map((entidad) => (
                <li key={entidad.id}>
                  <strong>{entidad.nombre}</strong>
                  {entidad.tipo === 'referencia' ? ' (referencia doctrinal)' : ''} —{' '}
                  {entidad.motivos.join(' · ')}
                </li>
              ))}
            </ul>
          </details>
        ) : null}
      </div>

      <div className="mapa-3d-control">
        <button
          type="button"
          className="boton boton--secundario"
          onClick={() => setVer3D((antes) => !antes)}
          aria-expanded={ver3D}
        >
          {ver3D ? 'Ocultar el 3D' : 'Ver en 3D'}
        </button>
        <span className="nota-al-margen">
          Cubo Economía × Sociedad × Territorio: los mismos tres ejes de los cruces, vistos a
          la vez — dos puntos pueden verse cerca en un plano y lejos en el cubo porque cada
          plano ignora el tercer eje. Se muestra solo si lo abres y queda preparado para
          funcionar sin conexión.
        </span>
      </div>

      {ver3D ? (
        <LimiteError
          recuperacion={
            <div className="aviso-cobertura" role="alert">
              <strong>No se ha podido abrir el visor 3D.</strong>{' '}
              El mapa 2D conserva la misma información y sigue disponible.
              <div className="acciones acciones--compactas">
                {puedeRecargar ? (
                  <button
                    type="button"
                    className="boton boton--secundario"
                    onClick={() => {
                      if (!alConfirmarGuardado()) return;
                      try {
                        sessionStorage.setItem(CLAVE_REABRIR_3D, '1');
                      } catch {
                        // Tras recargar se podrá abrir de nuevo manualmente.
                      }
                      window.location.reload();
                    }}
                  >
                    Recargar y reintentar el 3D
                  </button>
                ) : (
                  <span className="nota-al-margen">
                    No se puede recargar sin perder esta sesión porque el almacenamiento está
                    bloqueado.
                  </span>
                )}
                <button
                  type="button"
                  className="boton boton--terciario"
                  onClick={() => setVer3D(false)}
                >
                  Seguir con el mapa 2D
                </button>
              </div>
            </div>
          }
        >
          <Suspense
            fallback={
              <p className="vista-cargando" role="status">
                Descargando el visor 3D…
              </p>
            }
          >
            <Mapa3D
              ejes={EJES_MAPA}
              valoresUsuario={valoresUsuario}
              usuarioProvisional={usuarioProvisional}
              entidades={ENTIDADES_CUBO}
            />
          </Suspense>
        </LimiteError>
      ) : null}

      <p className="mapa-politico__facetas nota-al-margen">
        Este mapa es un resumen en tres ejes. <a href="#perfil-facetas">Tu perfil por facetas</a>,
        más abajo, conserva cada faceta medida con sus propios polos y su evidencia, sin
        mezclarlas.
      </p>
    </div>
  );
}
