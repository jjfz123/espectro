import { useId, useMemo, useState } from 'react';
import type { ResultadoFaceta } from '@engine';
import { EJE_AUTORIDAD_POLITICA, EJE_PROPIEDAD_MERCADO } from '@engine';
import { formatearEje } from '../datos';
import { lecturaEje, poloLlano } from '../lecturaEjes';
import {
  EJE_ECONOMIA_BRUJULA,
  EJE_PODER_BRUJULA,
  ENTIDADES_MAPA_PARTIDOS,
  EXCLUIDAS_MAPA_PARTIDOS,
  NOMBRE_CORTO_EJE,
  TOTAL_PARTIDOS_CATALOGO,
  seleccionarPuntosBrujula,
} from '../mapaEspacialLigero';
import type { PuntoBrujula } from '../mapaEspacialLigero';

/**
 * Brújula principal LIGERA: visible y expandida de entrada en resultados,
 * sin Three.js, sin datosReferencias y sin las zonas del atlas. Dibuja al
 * usuario y a los partidos con par Propiedad × Poder publicable según el
 * contrato único de mapaEspacialLigero (sólido = punto lleno; provisional =
 * punto hueco; insuficiente = no se dibuja y se declara). El atlas completo
 * sigue cargándose bajo demanda desde su lanzador.
 */

interface Props {
  facetasUsuario: ResultadoFaceta[];
  /** ids de partidos del universo electoral seleccionado (mismo del ranking). */
  idsContextoElectoral: ReadonlySet<string>;
  /** ids de los partidos principales de las últimas generales. */
  idsPrincipales: ReadonlySet<string>;
}

type Conjunto = 'contexto' | 'principales' | 'todos' | 'ninguno';

/** Geometría del plano SVG (misma escala visual que el atlas). */
const MARGEN = 12;
const LADO = 456;
const TOTAL = LADO + MARGEN * 2;

function aCoordenada(valor: number): number {
  return MARGEN + ((valor + 100) / 200) * LADO;
}

/** Descriptores de esquina, descriptivos y sin carga valorativa. */
const ESQUINAS: [string, string, string, string] = [
  'propiedad social + poder concentrado',
  'propiedad privada + poder concentrado',
  'propiedad social + poder distribuido',
  'propiedad privada + poder distribuido',
];

/** Única selección publicable: el contrato vive en mapaEspacialLigero. */
const SELECCION = seleccionarPuntosBrujula(ENTIDADES_MAPA_PARTIDOS, EXCLUIDAS_MAPA_PARTIDOS);

function textoEstado(punto: PuntoBrujula): string {
  return punto.grado === 'provisional'
    ? 'Posición provisional: evidencia parcial, punto hueco.'
    : 'Posición con evidencia sólida.';
}

function textoCobertura(punto: PuntoBrujula): string {
  return (
    `Propiedad y mercado: ${punto.propiedad.items} grupos documentales en ` +
    `${punto.propiedad.familias} subdimensiones · Poder: ${punto.poder.items} grupos en ` +
    `${punto.poder.familias} familias (${punto.poder.itemsNucleo} de contrapesos o libertades)`
  );
}

export function BrujulaLigera({ facetasUsuario, idsContextoElectoral, idsPrincipales }: Props) {
  const idBase = useId();
  const [conjunto, setConjunto] = useState<Conjunto>(() =>
    idsContextoElectoral.size > 0 ? 'contexto' : 'principales',
  );
  const [seleccionId, setSeleccionId] = useState<string | null>(null);

  const facetaPropiedad = facetasUsuario.find(
    (faceta) => faceta.facetaId === EJE_PROPIEDAD_MERCADO,
  );
  const facetaPoder = facetasUsuario.find(
    (faceta) => faceta.facetaId === EJE_AUTORIDAD_POLITICA,
  );
  const usuario =
    typeof facetaPropiedad?.valor === 'number' && typeof facetaPoder?.valor === 'number'
      ? {
          x: facetaPropiedad.valor,
          y: facetaPoder.valor,
          provisional:
            !facetaPropiedad.coberturaSuficiente || !facetaPoder.coberturaSuficiente,
        }
      : null;

  const visibles = useMemo(() => {
    if (conjunto === 'ninguno') return [];
    if (conjunto === 'todos') return SELECCION.publicables;
    const ids = conjunto === 'contexto' ? idsContextoElectoral : idsPrincipales;
    return SELECCION.publicables.filter((punto) => ids.has(punto.id));
  }, [conjunto, idsContextoElectoral, idsPrincipales]);

  const enContexto = useMemo(
    () => SELECCION.publicables.filter((punto) => idsContextoElectoral.has(punto.id)).length,
    [idsContextoElectoral],
  );
  const enPrincipales = useMemo(
    () => SELECCION.publicables.filter((punto) => idsPrincipales.has(punto.id)).length,
    [idsPrincipales],
  );

  const seleccionado = visibles.find((punto) => punto.id === seleccionId) ?? null;
  const ocultosPorConjunto = SELECCION.publicables.length - visibles.length;
  const descripcionId = `${idBase}-descripcion`;
  const nombreConjuntos = `${idBase}-conjuntos`;

  const opciones: Array<{ valor: Conjunto; rotulo: string }> = [
    { valor: 'contexto', rotulo: `Solo contexto electoral (${enContexto})` },
    { valor: 'principales', rotulo: `Principales de las últimas generales (${enPrincipales})` },
    { valor: 'todos', rotulo: `Todos con evidencia (${SELECCION.publicables.length})` },
    { valor: 'ninguno', rotulo: 'Ninguno (solo tu punto)' },
  ];

  const alternarSeleccion = (id: string) => {
    setSeleccionId((actual) => (actual === id ? null : id));
  };

  return (
    <div className="brujula-ligera">
      <p className="brujula-ligera__intro">
        Tu punto es el carmín; cada punto de tinta es un partido con evidencia publicable en
        este par de ejes. Un punto lleno supera el contrato completo de evidencia; un punto
        hueco es una posición provisional. La cercanía habla solo de estas dos dimensiones,
        no del resto de tus respuestas ni del ranking.
      </p>

      <p id={descripcionId} className="solo-lectores">
        Plano de menos cien a más cien por eje. Horizontal, propiedad y mercado: de{' '}
        {poloLlano(EJE_ECONOMIA_BRUJULA, 'negativo')} a{' '}
        {poloLlano(EJE_ECONOMIA_BRUJULA, 'positivo')}. Vertical, Poder político: de{' '}
        {poloLlano(EJE_PODER_BRUJULA, 'negativo')} abajo a{' '}
        {poloLlano(EJE_PODER_BRUJULA, 'positivo')} arriba. Cada punto de partido se puede
        enfocar para leer su nombre, su estado de evidencia y su cobertura; la misma
        información está en la lista accesible de debajo.
      </p>

      <fieldset className="brujula-ligera__conjuntos">
        <legend>Partidos dibujados</legend>
        {opciones.map((opcion) => (
          <label key={opcion.valor} className="brujula-ligera__conjunto">
            <input
              type="radio"
              name={nombreConjuntos}
              value={opcion.valor}
              checked={conjunto === opcion.valor}
              onChange={() => {
                setConjunto(opcion.valor);
                setSeleccionId(null);
              }}
            />
            <span>{opcion.rotulo}</span>
          </label>
        ))}
      </fieldset>

      {conjunto === 'contexto' && idsContextoElectoral.size === 0 ? (
        <p className="brujula-ligera__nota" role="status">
          El contexto electoral está incompleto: indica la comunidad autónoma más abajo para
          dibujar sus partidos, o elige otro conjunto.
        </p>
      ) : null}

      <div className="brujula-ligera__plano">
        <span className="brujula-ligera__polo">{poloLlano(EJE_PODER_BRUJULA, 'positivo')}</span>
        <svg
          viewBox={`0 0 ${TOTAL} ${TOTAL}`}
          role="group"
          aria-label="Brújula principal: Propiedad y mercado por Poder político y libertades"
          aria-describedby={descripcionId}
        >
          <rect
            className="brujula-ligera__marco"
            x={MARGEN}
            y={MARGEN}
            width={LADO}
            height={LADO}
          />
          <line
            className="brujula-ligera__media"
            x1={MARGEN}
            y1={TOTAL / 2}
            x2={TOTAL - MARGEN}
            y2={TOTAL / 2}
          />
          <line
            className="brujula-ligera__media"
            x1={TOTAL / 2}
            y1={MARGEN}
            x2={TOTAL / 2}
            y2={TOTAL - MARGEN}
          />
          {[-50, 50].map((valor) => (
            <g key={valor} className="brujula-ligera__marcas">
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
          <g className="brujula-ligera__esquinas" aria-hidden="true">
            <text x={MARGEN + 8} y={MARGEN + 16} textAnchor="start">
              {ESQUINAS[0]}
            </text>
            <text x={TOTAL - MARGEN - 8} y={MARGEN + 16} textAnchor="end">
              {ESQUINAS[1]}
            </text>
            <text x={MARGEN + 8} y={TOTAL - MARGEN - 9} textAnchor="start">
              {ESQUINAS[2]}
            </text>
            <text x={TOTAL - MARGEN - 8} y={TOTAL - MARGEN - 9} textAnchor="end">
              {ESQUINAS[3]}
            </text>
          </g>
          {visibles.map((punto) => {
            const cx = aCoordenada(punto.x);
            const cy = TOTAL - aCoordenada(punto.y);
            const estaSeleccionado = seleccionId === punto.id;
            const rotuloIzquierda = cx > TOTAL - 76;
            const rotuloArriba = cy > TOTAL - 24;
            return (
              <g
                key={punto.id}
                className="brujula-ligera__punto"
                data-tipo="partido"
                data-entidad-id={punto.id}
                data-evidencia={punto.grado}
                data-seleccionado={estaSeleccionado}
                role="button"
                tabIndex={0}
                aria-pressed={estaSeleccionado}
                aria-label={`${punto.nombre}. ${textoEstado(punto)} ${textoCobertura(punto)}. Mostrar u ocultar su lectura`}
                onClick={() => alternarSeleccion(punto.id)}
                onKeyDown={(evento) => {
                  if (evento.key === 'Enter' || evento.key === ' ') {
                    evento.preventDefault();
                    alternarSeleccion(punto.id);
                  }
                }}
              >
                <title>{`${punto.nombre}. ${textoEstado(punto)}`}</title>
                <circle className="brujula-ligera__hit" cx={cx} cy={cy} r={24} aria-hidden="true" />
                <circle className="brujula-ligera__forma" cx={cx} cy={cy} r={5} />
                <text
                  className="brujula-ligera__rotulo"
                  x={cx + (rotuloIzquierda ? -9 : 9)}
                  y={cy + (rotuloArriba ? -9 : 4)}
                  textAnchor={rotuloIzquierda ? 'end' : 'start'}
                >
                  {punto.etiqueta}
                </text>
              </g>
            );
          })}
          {usuario ? (
            <g className="brujula-ligera__punto" data-tipo="usuario">
              <title>
                {`Tu posición${usuario.provisional ? ' (provisional: cobertura aún incompleta)' : ''}`}
              </title>
              <circle
                className="brujula-ligera__forma"
                cx={aCoordenada(usuario.x)}
                cy={TOTAL - aCoordenada(usuario.y)}
                r={7}
              />
              <text
                className="brujula-ligera__rotulo brujula-ligera__rotulo--usuario"
                x={aCoordenada(usuario.x) + 10}
                y={TOTAL - aCoordenada(usuario.y) + 4}
              >
                Tú
              </text>
            </g>
          ) : null}
        </svg>
        <span className="brujula-ligera__polo">{poloLlano(EJE_PODER_BRUJULA, 'negativo')}</span>
        <div className="brujula-ligera__polos-x">
          <span>{poloLlano(EJE_ECONOMIA_BRUJULA, 'negativo')}</span>
          <span>{poloLlano(EJE_ECONOMIA_BRUJULA, 'positivo')}</span>
        </div>
      </div>

      <ul className="brujula-ligera__leyenda">
        <li>
          <svg viewBox="0 0 14 14" aria-hidden="true">
            <circle cx="7" cy="7" r="5" className="brujula-ligera__muestra-usuario" />
          </svg>
          Tú
        </li>
        <li>
          <svg viewBox="0 0 14 14" aria-hidden="true">
            <circle cx="7" cy="7" r="5" className="brujula-ligera__muestra-solida" />
          </svg>
          Partido con evidencia sólida (punto lleno)
        </li>
        <li>
          <svg viewBox="0 0 14 14" aria-hidden="true">
            <circle cx="7" cy="7" r="5" className="brujula-ligera__muestra-provisional" />
          </svg>
          Posición provisional (punto hueco)
        </li>
      </ul>

      {!usuario ? (
        <p className="brujula-ligera__nota" role="status">
          Tu posición aún no es calculable en este par de ejes: no hay respuestas con opinión
          en sus preguntas. Los partidos siguen dibujados con su evidencia documental.
        </p>
      ) : usuario.provisional ? (
        <p className="brujula-ligera__nota">
          Tu punto es provisional: aún no alcanza el umbral de cobertura en ambos ejes.
          Responder más preguntas lo consolida sin mover a los partidos.
        </p>
      ) : null}

      <div className="brujula-ligera__estado" role="status">
        {seleccionado ? (
          <>
            <p className="brujula-ligera__lectura-titular">
              <strong>{seleccionado.nombre}.</strong> {textoEstado(seleccionado)}
            </p>
            <ul className="brujula-ligera__lectura-ejes">
              <li>
                {NOMBRE_CORTO_EJE[EJE_ECONOMIA_BRUJULA.id]}:{' '}
                {lecturaEje(seleccionado.x, EJE_ECONOMIA_BRUJULA)} (
                {formatearEje(seleccionado.x)})
              </li>
              <li>
                {NOMBRE_CORTO_EJE[EJE_PODER_BRUJULA.id]}:{' '}
                {lecturaEje(seleccionado.y, EJE_PODER_BRUJULA)} ({formatearEje(seleccionado.y)})
              </li>
            </ul>
            <p className="brujula-ligera__lectura-cobertura">{textoCobertura(seleccionado)}</p>
          </>
        ) : (
          <p className="brujula-ligera__pista">
            Toca o enfoca un punto para leer su nombre, su estado de evidencia y su cobertura
            sin depender del cursor.
          </p>
        )}
      </div>

      <p className="brujula-ligera__exclusiones">
        En la brújula: {visibles.length} de {TOTAL_PARTIDOS_CATALOGO} partidos del catálogo.{' '}
        {SELECCION.excluidas.length > 0
          ? `${SELECCION.excluidas.length} quedan fuera por evidencia insuficiente en este par y no se dibujan con ningún conjunto. `
          : ''}
        {ocultosPorConjunto > 0
          ? `${ocultosPorConjunto} con evidencia publicable están fuera del conjunto elegido.`
          : ''}
      </p>

      {SELECCION.excluidas.length > 0 ? (
        <details className="brujula-ligera__detalle">
          <summary>Por qué quedan fuera ({SELECCION.excluidas.length})</summary>
          <ul>
            {SELECCION.excluidas.map((excluida) => (
              <li key={excluida.id}>
                <strong>{excluida.nombre}.</strong> {excluida.motivos.join(' · ')}
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      <details className="brujula-ligera__detalle brujula-ligera__lista">
        <summary>Ver la brújula como lista accesible</summary>
        <div className="brujula-ligera__tabla-contenedor">
        <table>
          <caption className="solo-lectores">
            Posiciones dibujadas en la brújula Propiedad y mercado × Poder, con su estado de
            evidencia.
          </caption>
          <thead>
            <tr>
              <th scope="col">Quién</th>
              <th scope="col">Evidencia</th>
              <th scope="col">{NOMBRE_CORTO_EJE[EJE_ECONOMIA_BRUJULA.id]}</th>
              <th scope="col">{NOMBRE_CORTO_EJE[EJE_PODER_BRUJULA.id]}</th>
            </tr>
          </thead>
          <tbody>
            {usuario ? (
              <tr>
                <th scope="row">Tú</th>
                <td>{usuario.provisional ? 'Provisional (cobertura incompleta)' : 'Tu perfil'}</td>
                <td>
                  {lecturaEje(usuario.x, EJE_ECONOMIA_BRUJULA)} ({formatearEje(usuario.x)})
                </td>
                <td>
                  {lecturaEje(usuario.y, EJE_PODER_BRUJULA)} ({formatearEje(usuario.y)})
                </td>
              </tr>
            ) : null}
            {visibles.map((punto) => (
              <tr key={punto.id}>
                <th scope="row">{punto.nombre}</th>
                <td>{punto.grado === 'provisional' ? 'Provisional (punto hueco)' : 'Sólida'}</td>
                <td>
                  {lecturaEje(punto.x, EJE_ECONOMIA_BRUJULA)} ({formatearEje(punto.x)})
                </td>
                <td>
                  {lecturaEje(punto.y, EJE_PODER_BRUJULA)} ({formatearEje(punto.y)})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </details>
    </div>
  );
}
