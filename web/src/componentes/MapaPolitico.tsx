import { Suspense, lazy, useId, useMemo, useState } from 'react';
import type { ResultadoFaceta } from '@engine';
import { distanciaEspacial } from '@engine';
import { formatearEje } from '../datos';
import {
  EJES_MAPA,
  ENTIDADES_MAPA,
  EXCLUIDAS_MAPA,
  NOMBRE_CORTO_EJE,
  TOTAL_PARTIDOS_CATALOGO,
  TOTAL_REFERENCIAS_CATALOGO,
} from '../mapaEspacial';
import type { EntidadMapa } from '../mapaEspacial';

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

const PARES: ParEjes[] = [
  { id: 'economico-social', x: 'economico', y: 'social', nombre: 'Económico × GAL-TAN' },
  { id: 'economico-territorial', x: 'economico', y: 'territorial', nombre: 'Económico × Territorial' },
  { id: 'social-territorial', x: 'social', y: 'territorial', nombre: 'GAL-TAN × Territorial' },
];

/** Geometría del plano SVG. */
const MARGEN = 12;
const LADO = 456;
const TOTAL = LADO + MARGEN * 2;

/** Etiqueta corta del polo, sin el paréntesis aclaratorio. */
function poloCorto(texto: string): string {
  const i = texto.indexOf('(');
  return (i === -1 ? texto : texto.slice(0, i)).trim().replace(/\//g, '/​');
}

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

/**
 * Colocación de rótulos con desplazamiento simple: cada etiqueta prueba
 * derecha, izquierda, arriba y abajo del punto, y después desplazamientos
 * verticales crecientes, hasta no chocar con las ya colocadas ni salirse.
 */
function colocarEtiquetas(puntos: PuntoPlano[]): Map<string, EtiquetaColocada> {
  const colocadas = new Map<string, EtiquetaColocada>();
  const ocupados: Rect[] = puntos.map((p) => ({
    x: p.cx - 7,
    y: p.cy - 7,
    ancho: 14,
    alto: 14,
  }));
  const ALTO = 12;

  for (const punto of puntos) {
    const ancho = punto.etiqueta.length * 6.4 + 4;
    const candidatos: EtiquetaColocada[] = [
      { x: punto.cx + 9, y: punto.cy + 4, anclaje: 'start' },
      { x: punto.cx - 9, y: punto.cy + 4, anclaje: 'end' },
      { x: punto.cx, y: punto.cy - 11, anclaje: 'middle' },
      { x: punto.cx, y: punto.cy + 18, anclaje: 'middle' },
    ];
    for (let paso = 1; paso <= 6; paso += 1) {
      candidatos.push({ x: punto.cx + 9, y: punto.cy + 4 + paso * ALTO, anclaje: 'start' });
      candidatos.push({ x: punto.cx - 9, y: punto.cy + 4 - paso * ALTO, anclaje: 'end' });
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

export function MapaPolitico({ facetasUsuario }: Props) {
  const idBase = useId();
  const [parId, setParId] = useState(PARES[0]?.id ?? 'economico-social');
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [ver3D, setVer3D] = useState(false);

  const par = PARES.find((p) => p.id === parId) ?? PARES[0]!;
  const ejePorId = useMemo(() => new Map(EJES_MAPA.map((eje) => [eje.id, eje])), []);
  const facetaUsuarioPorEje = useMemo(
    () => new Map(facetasUsuario.map((faceta) => [faceta.facetaId, faceta])),
    [facetasUsuario],
  );

  const ejeX = ejePorId.get(par.x);
  const ejeY = ejePorId.get(par.y);

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

  const puntos = useMemo<PuntoPlano[]>(() => {
    const lista: PuntoPlano[] = [];
    if (usuarioEnPlano) {
      lista.push({
        id: 'usuario',
        etiqueta: 'Tú',
        nombre: 'Tu posición',
        tipo: 'usuario',
        cx: aCoordenada(valoresUsuario[par.x] as number),
        cy: TOTAL - aCoordenada(valoresUsuario[par.y] as number),
      });
    }
    for (const entidad of ENTIDADES_MAPA) {
      const vx = entidad.valores[par.x];
      const vy = entidad.valores[par.y];
      if (typeof vx !== 'number' || typeof vy !== 'number') continue;
      lista.push({
        id: entidad.id,
        etiqueta: entidad.etiqueta,
        nombre: entidad.nombre,
        tipo: entidad.tipo,
        cx: aCoordenada(vx),
        cy: TOTAL - aCoordenada(vy),
      });
    }
    return lista;
  }, [par, usuarioEnPlano, valoresUsuario]);

  const etiquetas = useMemo(() => colocarEtiquetas(puntos), [puntos]);

  const entidadSeleccionada: EntidadMapa | null =
    seleccion && seleccion !== 'usuario'
      ? ENTIDADES_MAPA.find((entidad) => entidad.id === seleccion) ?? null
      : null;

  const partidosDentro = ENTIDADES_MAPA.filter((e) => e.tipo === 'partido').length;
  const referenciasDentro = ENTIDADES_MAPA.filter((e) => e.tipo === 'referencia').length;
  const partidosFuera = TOTAL_PARTIDOS_CATALOGO - partidosDentro;
  const referenciasFuera = TOTAL_REFERENCIAS_CATALOGO - referenciasDentro;

  const descripcionId = `${idBase}-descripcion`;
  const tituloPlanoId = `${idBase}-plano`;

  if (!ejeX || !ejeY) return null;

  const lecturaSeleccion = () => {
    if (!seleccion) return null;
    if (seleccion === 'usuario') {
      return (
        <p className="mapa-lectura" role="status">
          <strong>Tu posición.</strong>{' '}
          {EJES_MAPA.map((eje, i) => {
            const valor = valoresUsuario[eje.id];
            return (
              <span key={eje.id}>
                {i > 0 ? ' · ' : ''}
                {NOMBRE_CORTO_EJE[eje.id] ?? eje.id}{' '}
                {typeof valor === 'number' ? formatearEje(valor) : 'sin datos'}
              </span>
            );
          })}
          {usuarioProvisional ? ' · alguna posición es aún provisional' : ''}.
        </p>
      );
    }
    if (!entidadSeleccionada) return null;
    const distanciaPlano = distanciaEspacial(valoresUsuario, entidadSeleccionada.valores, [
      par.x,
      par.y,
    ]);
    return (
      <p className="mapa-lectura" role="status">
        <strong>{entidadSeleccionada.nombre}.</strong>{' '}
        {entidadSeleccionada.tipo === 'referencia' ? (
          <span className="mapa-lectura__tipo">Referencia doctrinal, no votable. </span>
        ) : (
          <span className="mapa-lectura__tipo">Partido. </span>
        )}
        {EJES_MAPA.map((eje, i) => (
          <span key={eje.id}>
            {i > 0 ? ' · ' : ''}
            {NOMBRE_CORTO_EJE[eje.id] ?? eje.id}{' '}
            {formatearEje(entidadSeleccionada.valores[eje.id] ?? 0)}
          </span>
        ))}
        {distanciaPlano !== null
          ? ` · distancia a ti en este plano: ${Math.round(distanciaPlano)} (orientativa)`
          : ''}
        .
      </p>
    );
  };

  return (
    <div className="mapa-politico">
      <p className="nota-al-margen" style={{ maxWidth: '68ch' }}>
        Tres ejes medidos con el mismo instrumento para ti, para los partidos y para las
        referencias doctrinales: el económico, el social/cultural (GAL-TAN) y el territorial.
        El plano principal cruza económico × GAL-TAN; puedes cambiar el par.
      </p>

      <div className="mapa-politico__disclaimer">
        <p>
          <strong>Ayuda a la orientación, no una recomendación de voto.</strong> Las
          puntuaciones por eje se basan en respuestas y evidencia documentada (fiables); las
          cercanías entre puntos son geométricas y orientativas: con otro modelo de distancia
          el vecino más próximo puede cambiar.
        </p>
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
        Plano de dos ejes de menos cien a más cien. Eje horizontal, {ejeX.nombre}: de{' '}
        {ejeX.poloNegativo} a {ejeX.poloPositivo}. Eje vertical, {ejeY.nombre}: de{' '}
        {ejeY.poloNegativo} a {ejeY.poloPositivo}.
      </p>

      <div className="mapa-plano">
        <span className="mapa-plano__polo mapa-plano__polo--arriba">
          {poloCorto(ejeY.poloPositivo)}
        </span>
        <svg
          viewBox={`0 0 ${TOTAL} ${TOTAL}`}
          role="group"
          aria-labelledby={tituloPlanoId}
          aria-describedby={descripcionId}
          onClick={() => setSeleccion(null)}
        >
          <title id={tituloPlanoId}>Plano {par.nombre}</title>
          {/* Marco y cruz central: filetes de 1px, sin etiquetas de cuadrante. */}
          <rect
            className="mapa-plano__marco"
            x={MARGEN}
            y={MARGEN}
            width={LADO}
            height={LADO}
          />
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
        <span className="mapa-plano__polo mapa-plano__polo--abajo">
          {poloCorto(ejeY.poloNegativo)}
        </span>
        <div className="mapa-plano__polos-x">
          <span>{poloCorto(ejeX.poloNegativo)}</span>
          <span>{poloCorto(ejeX.poloPositivo)}</span>
        </div>
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
          {partidosFuera + referenciasFuera > 0
            ? `Quedan fuera ${partidosFuera} partidos y ${referenciasFuera} referencias porque su evidencia documentada no alcanza el mínimo en los tres ejes (al menos 4 posiciones documentadas con carga por eje): antes que estimar su posición, no se dibuja.`
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
          Cubo económico × GAL-TAN × territorial. El visor se descarga solo si lo abres.
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
            entidades={ENTIDADES_MAPA}
          />
        </Suspense>
      ) : null}
    </div>
  );
}
