import { Suspense, lazy, useId, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Eje, ResultadoFaceta } from '@engine';
import { distanciaEspacial } from '@engine';
import { nombreLlanoEje, poloLlano } from '../lecturaEjes';
import { AyudaEjes } from './AyudaEjes';
import { LecturaEjes } from './LecturaEjes';
import {
  EJES_MAPA,
  ENTIDADES_CUBO,
  ENTIDADES_MAPA,
  EXCLUIDAS_MAPA,
  NOMBRE_CORTO_EJE,
  TOTAL_PARTIDOS_CATALOGO,
  TOTAL_REFERENCIAS_CATALOGO,
} from '../mapaEspacial';
import type { EntidadMapa } from '../mapaEspacial';
import { ALTO_LINEA_ZONA, capaCorrientes } from '../zonasCorrientes';

/** El visor 3D (three/R3F/drei) carga solo si el usuario lo pide. */
const Mapa3D = lazy(() => import('./Mapa3D'));

interface Props {
  facetasUsuario: ResultadoFaceta[];
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

/**
 * Descriptores de esquina de cada cruce, sin carga valorativa (regla del
 * proyecto: descriptivo, nunca peyorativo). Orden: arriba-izquierda,
 * arriba-derecha, abajo-izquierda, abajo-derecha.
 */
const ESQUINAS: Record<string, [string, string, string, string]> = {
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

function aCoordenada(valor: number): number {
  return MARGEN + ((valor + 100) / 200) * LADO;
}

interface PuntoPlano {
  id: string;
  etiqueta: string;
  nombre: string;
  tipo: 'usuario' | 'partido' | 'referencia';
  cx: number;
  cy: number;
}

interface EtiquetaColocada {
  x: number;
  y: number;
  anclaje: 'start' | 'end' | 'middle';
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
 * Colocación de rótulos con desplazamiento simple: cada etiqueta prueba
 * derecha, izquierda, arriba y abajo del punto, y después desplazamientos
 * verticales crecientes, hasta no chocar con las ya colocadas, con las zonas
 * reservadas (esquinas) ni salirse.
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
  const ALTO = 12;

  for (const punto of puntos) {
    const ancho = punto.etiqueta.length * 6.4 + 4;
    const candidatos: EtiquetaColocada[] = [
      { x: punto.cx + 9, y: punto.cy + 4, anclaje: 'start' },
      { x: punto.cx - 9, y: punto.cy + 4, anclaje: 'end' },
      { x: punto.cx, y: punto.cy - 11, anclaje: 'middle' },
      { x: punto.cx, y: punto.cy + 18, anclaje: 'middle' },
    ];
    for (let paso = 1; paso <= 10; paso += 1) {
      candidatos.push({ x: punto.cx + 9, y: punto.cy + 4 + paso * ALTO, anclaje: 'start' });
      candidatos.push({ x: punto.cx - 9, y: punto.cy + 4 - paso * ALTO, anclaje: 'end' });
      /* Escapes hacia arriba-derecha y abajo-izquierda: en los cúmulos
         pegados a una esquina (frecuentes en Sociedad × Territorio) los
         cuatro primeros candidatos y los pasos anteriores se agotan. */
      candidatos.push({ x: punto.cx + 9, y: punto.cy + 4 - paso * ALTO, anclaje: 'start' });
      candidatos.push({ x: punto.cx - 9, y: punto.cy + 4 + paso * ALTO, anclaje: 'end' });
    }

    let elegido: EtiquetaColocada | null = null;
    for (const candidato of candidatos) {
      const x0 =
        candidato.anclaje === 'start'
          ? candidato.x
          : candidato.anclaje === 'end'
            ? candidato.x - ancho
            : candidato.x - ancho / 2;
      const rect: Rect = { x: x0, y: candidato.y - ALTO + 2, ancho, alto: ALTO };
      const dentro = rect.x >= 2 && rect.x + rect.ancho <= TOTAL - 2 && rect.y >= 1 && rect.y + rect.alto <= TOTAL - 1;
      if (dentro && !ocupados.some((otro) => chocan(rect, otro))) {
        ocupados.push(rect);
        elegido = candidato;
        break;
      }
    }
    colocadas.set(punto.id, elegido ?? { x: punto.cx + 9, y: punto.cy + 4, anclaje: 'start' });
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
    const vx = entidad.valores[par.x];
    const vy = entidad.valores[par.y];
    if (typeof vx !== 'number' || typeof vy !== 'number') continue;
    lista.push({
      id: entidad.id,
      etiqueta: acortarEtiqueta(entidad.etiqueta),
      nombre: entidad.nombre,
      tipo: entidad.tipo,
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
function CapaCorrientes({ par, parte }: { par: ParEjes; parte: 'fondo' | 'rotulos' }) {
  const capa = capaCorrientes(
    par.id,
    par.x,
    par.y,
    MARGEN,
    LADO,
    rectsEsquinas(ESQUINAS[par.id] ?? ESQUINAS['economico-social']!),
  );
  if (capa.zonas.length === 0) return null;
  if (parte === 'fondo') {
    return (
      <g className="mapa-zonas" aria-hidden="true">
        {capa.zonas.map((zona) => (
          <path
            key={zona.id}
            className="mapa-zona"
            data-tono={zona.tono}
            d={zona.d}
            shapeRendering="crispEdges"
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
        zona.etiqueta ? (
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
 * Brújula clásica: Economía × Sociedad con la orientación canónica (orden y
 * tradición arriba, libertades abajo) y lavados de cuadrante apagadísimos,
 * la excepción deliberada y acotada a la regla de un-solo-acento — solo el
 * fondo del plano; puntos, rótulos y UI siguen en tinta y carmín. Es un
 * resumen para reconocer de un vistazo: la lectura punto a punto vive en la
 * vista detallada de abajo.
 */
function Brujula({
  puntos,
  descripcionId,
  corrientes,
}: {
  puntos: PuntoPlano[];
  descripcionId: string;
  corrientes: boolean;
}) {
  /* En la brújula solo se rotulan tú y los partidos (siglas cortas): los
     nombres largos de las referencias doctrinales saturaban el plano y
     tapaban los descriptores de esquina. Los rombos conservan su tooltip y
     su nombre completo en la vista detallada. */
  const etiquetas = useMemo(() => {
    const rotulables = puntos.filter((punto) => punto.tipo !== 'referencia');
    const rombos = puntos
      .filter((punto) => punto.tipo === 'referencia')
      .map((punto) => ({ x: punto.cx - 7, y: punto.cy - 7, ancho: 14, alto: 14 }));
    return colocarEtiquetas(rotulables, [
      ...rectsEsquinas(ESQUINAS['economico-social']!),
      ...rombos,
    ]);
  }, [puntos]);
  const mitad = LADO / 2;
  return (
    <svg
      viewBox={`0 0 ${TOTAL} ${TOTAL}`}
      role="img"
      aria-label="Brújula política: Economía por Sociedad"
      aria-describedby={descripcionId}
    >
      <rect className="mapa-plano__marco" x={MARGEN} y={MARGEN} width={LADO} height={LADO} />
      <g className="mapa-plano__lavados" aria-hidden="true">
        <rect className="mapa-plano__lavado--io" x={MARGEN} y={MARGEN} width={mitad} height={mitad} />
        <rect className="mapa-plano__lavado--do" x={TOTAL / 2} y={MARGEN} width={mitad} height={mitad} />
        <rect className="mapa-plano__lavado--il" x={MARGEN} y={TOTAL / 2} width={mitad} height={mitad} />
        <rect className="mapa-plano__lavado--dl" x={TOTAL / 2} y={TOTAL / 2} width={mitad} height={mitad} />
      </g>
      {corrientes ? <CapaCorrientes par={PARES[0]!} parte="fondo" /> : null}
      <EstructuraPlano />
      <EsquinasPlano esquinas={ESQUINAS['economico-social']!} />
      {corrientes ? <CapaCorrientes par={PARES[0]!} parte="rotulos" /> : null}
      {puntos.map((punto) => {
        const etiqueta = etiquetas.get(punto.id);
        return (
          <g key={punto.id} className="mapa-punto mapa-punto--quieto" data-tipo={punto.tipo}>
            <title>{punto.nombre}</title>
            {etiqueta && etiquetaLejana(etiqueta, punto) ? (
              <line
                className="mapa-punto__guia"
                x1={punto.cx}
                y1={punto.cy}
                x2={anclaEtiqueta(etiqueta).x}
                y2={anclaEtiqueta(etiqueta).y}
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

export function MapaPolitico({ facetasUsuario }: Props) {
  const idBase = useId();
  const [parId, setParId] = useState(PARES[0]?.id ?? 'economico-social');
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [ver3D, setVer3D] = useState(false);
  /* Corrientes de fondo: activadas por defecto. Verificado en capturas a
     390px: la capa no satura en móvil porque las zonas pequeñas eliden su
     rótulo solas; si el catálogo crece, hay menos rótulos, no más. */
  const [verCorrientes, setVerCorrientes] = useState(true);

  const par = PARES.find((p) => p.id === parId) ?? PARES[0]!;
  const ejePorId = useMemo(() => new Map(EJES_MAPA.map((eje) => [eje.id, eje])), []);
  const facetaUsuarioPorEje = useMemo(
    () => new Map(facetasUsuario.map((faceta) => [faceta.facetaId, faceta])),
    [facetasUsuario],
  );

  const ejeX = ejePorId.get(par.x);
  const ejeY = ejePorId.get(par.y);
  const ejeEconomia = ejePorId.get('economico');
  const ejeSociedad = ejePorId.get('social');

  const valoresUsuario = useMemo(() => {
    const valores: Record<string, number | null> = {};
    for (const eje of EJES_MAPA) {
      valores[eje.id] = facetaUsuarioPorEje.get(eje.id)?.valor ?? null;
    }
    return valores;
  }, [facetaUsuarioPorEje]);

  const usuarioProvisional = EJES_MAPA.some((eje) => {
    const faceta = facetaUsuarioPorEje.get(eje.id);
    return faceta ? faceta.valor !== null && !faceta.coberturaSuficiente : false;
  });

  const usuarioEnPlano =
    typeof valoresUsuario[par.x] === 'number' && typeof valoresUsuario[par.y] === 'number';

  const puntos = useMemo(() => puntosDelPar(par, valoresUsuario), [par, valoresUsuario]);
  const etiquetas = useMemo(
    () => colocarEtiquetas(puntos, rectsEsquinas(ESQUINAS[par.id] ?? ESQUINAS['economico-social']!)),
    [puntos, par.id],
  );

  const parBrujula = PARES[0]!;
  const puntosBrujula = useMemo(
    () => puntosDelPar(parBrujula, valoresUsuario),
    [parBrujula, valoresUsuario],
  );
  const usuarioEnBrujula = puntosBrujula.some((punto) => punto.tipo === 'usuario');

  const entidadSeleccionada: EntidadMapa | null =
    seleccion && seleccion !== 'usuario'
      ? ENTIDADES_MAPA.find((entidad) => entidad.id === seleccion) ?? null
      : null;

  const partidosDentro = ENTIDADES_MAPA.filter((e) => e.tipo === 'partido').length;
  const referenciasDentro = ENTIDADES_MAPA.filter((e) => e.tipo === 'referencia').length;
  const hayCorrientes = referenciasDentro > 0;
  const partidosFuera = TOTAL_PARTIDOS_CATALOGO - partidosDentro;
  const referenciasFuera = TOTAL_REFERENCIAS_CATALOGO - referenciasDentro;

  const descripcionId = `${idBase}-descripcion`;
  const tituloPlanoId = `${idBase}-plano`;
  const brujulaDescId = `${idBase}-brujula`;

  if (!ejeX || !ejeY || !ejeEconomia || !ejeSociedad) return null;

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
          <strong>Cómo leer este mapa.</strong> Cada punto es un partido; los rombos son
          corrientes de referencia, no papeletas. Tu punto es el carmín. Cuanto más cerca de
          ti está un punto, más se parece a lo que has respondido en estos dos temas:
          economía (izquierda–derecha) y sociedad (libertades–orden).
        </p>
        <p className="mapa-como-leer__nota">
          El ranking de afinidad de más abajo usa todas tus respuestas, no solo estas dos
          dimensiones: su orden puede no coincidir con las cercanías de este plano.
        </p>
      </div>

      <p id={brujulaDescId} className="solo-lectores">
        Plano de menos cien a más cien por eje. Horizontal, Economía: de{' '}
        {poloLlano(ejeEconomia, 'negativo')} a {poloLlano(ejeEconomia, 'positivo')}. Vertical,
        Sociedad: de {poloLlano(ejeSociedad, 'negativo')} abajo a{' '}
        {poloLlano(ejeSociedad, 'positivo')} arriba. La versión interactiva, con lectura punto
        a punto, está más abajo en «En detalle».
      </p>

      {hayCorrientes ? (
        <div className="mapa-corrientes-control">
          <label className="mapa-corrientes-control__toggle">
            <input
              type="checkbox"
              checked={verCorrientes}
              onChange={(evento) => setVerCorrientes(evento.target.checked)}
            />
            <span>Mostrar corrientes de fondo</span>
          </label>
          <span className="mapa-corrientes-control__nota">
            Zonas orientativas: cada nombre marca la referencia doctrinal más cercana, medida
            con el mismo instrumento que tú.
          </span>
        </div>
      ) : null}

      <div className="mapa-plano mapa-plano--brujula">
        <PolosPlano ejeX={ejeEconomia} ejeY={ejeSociedad}>
          <Brujula
            puntos={puntosBrujula}
            descripcionId={brujulaDescId}
            corrientes={hayCorrientes && verCorrientes}
          />
        </PolosPlano>
      </div>

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
          Partido comparable
        </li>
        <li>
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <rect x="3.5" y="3.5" width="9" height="9" transform="rotate(45 8 8)" className="mapa-leyenda__referencia" />
          </svg>
          Referencia doctrinal, no votable
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
            onClick={() => setSeleccion(null)}
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
            {hayCorrientes && verCorrientes ? <CapaCorrientes par={par} parte="fondo" /> : null}
            <EstructuraPlano />
            <EsquinasPlano esquinas={ESQUINAS[par.id] ?? ESQUINAS['economico-social']!} />
            {hayCorrientes && verCorrientes ? <CapaCorrientes par={par} parte="rotulos" /> : null}

            {puntos.map((punto) => {
              const etiqueta = etiquetas.get(punto.id);
              const seleccionado = seleccion === punto.id;
              return (
                <g
                  key={punto.id}
                  className="mapa-punto"
                  data-tipo={punto.tipo}
                  data-seleccionado={seleccionado}
                  role="button"
                  tabIndex={0}
                  aria-pressed={seleccionado}
                  aria-label={`${punto.nombre}${punto.tipo === 'referencia' ? ' (referencia doctrinal, no votable)' : ''}`}
                  onClick={(evento) => {
                    evento.stopPropagation();
                    setSeleccion(seleccionado ? null : punto.id);
                  }}
                  onKeyDown={(evento) => {
                    if (evento.key === 'Enter' || evento.key === ' ') {
                      evento.preventDefault();
                      setSeleccion(seleccionado ? null : punto.id);
                    }
                  }}
                >
                  <title>{punto.nombre}</title>
                  {etiqueta && etiquetaLejana(etiqueta, punto) ? (
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
        </PolosPlano>
      </div>

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

      {lecturaSeleccion()}

      <div className="mapa-exclusiones">
        <p>
          En el plano: {usuarioEnPlano ? 'tu posición, ' : ''}
          {partidosDentro} de {TOTAL_PARTIDOS_CATALOGO} partidos y {referenciasDentro} de{' '}
          {TOTAL_REFERENCIAS_CATALOGO} referencias doctrinales del catálogo.{' '}
          Cada entidad aparece solo en los planos donde su evidencia alcanza el umbral (al
          menos 4 posiciones documentadas con carga en cada eje del par).{' '}
          {partidosFuera + referenciasFuera > 0
            ? `Quedan fuera de todos los planos ${partidosFuera} partidos y ${referenciasFuera} referencias: antes que estimar su posición, no se dibuja.`
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
          Cubo Economía × Sociedad × Territorio. El visor se descarga solo si lo abres.
        </span>
      </div>

      {ver3D ? (
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
      ) : null}

      <p className="mapa-politico__facetas nota-al-margen">
        Este mapa es un resumen en tres ejes. <a href="#perfil-facetas">Tu perfil por facetas</a>,
        más arriba, conserva cada faceta medida con sus propios polos y su evidencia, sin
        mezclarlas.
      </p>
    </div>
  );
}
