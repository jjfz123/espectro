import type { ReactNode } from 'react';
import type { PerfilAfinidad, ResultadoAfinidad } from '@engine';
import { formatearNumero, nombrePerfil } from '../datos';

/* Piso de publicación del porcentaje (feedback del propietario, 2026-07-13):
   con 1-2 preguntas en común un 100 % es una anécdota disfrazada de resultado
   («responder que los animales tienen derechos te saca 100 % PACMA»). El motor
   sigue calculando y ordenando igual; solo se retira la CIFRA hasta tener
   al menos 3 comparaciones. */
const MINIMO_ITEMS_PORCENTAJE = 3;

interface Props {
  resultados: ResultadoAfinidad[];
  entidades: ReadonlyMap<string, PerfilAfinidad>;
  tipoEntidad?: 'partido' | 'sindicato' | 'organizacion';
  doblesMarcadores?: ReadonlyMap<string, DobleMarcador>;
  /** Reduce espaciado y repliega las explicaciones largas; conserva todos los datos. */
  compacto?: boolean;
  /** Permite continuar un ranking partido en un bloque desplegable. */
  inicio?: number;
  /** `false` para referencias informativas que no deben fingir un puesto. */
  ordenada?: boolean;
  etiquetaPosicion?: (resultado: ResultadoAfinidad, indice: number) => ReactNode;
  contextoPorEntidad?: ReadonlyMap<string, string>;
  /** Separa los tramos de fiabilidad cuando el array viene de `rankingAfinidad`. */
  separarTramos?: boolean;
}

export interface DobleMarcador {
  etiquetaBase: string;
  etiquetaContraste: string;
  resultadoContraste: ResultadoAfinidad;
  advertencia: string;
  /** Periodo observado del marcador de contraste (desde–hasta), siempre visible. */
  periodo?: string;
  /** Fecha de corte documental del marcador base (partido.revisado). */
  fechaBase?: string;
}

const ETIQUETA_CONFIANZA: Record<string, string> = {
  verificada: 'posición verificada',
  estimada: 'posición estimada',
  'sin-datos': 'sin datos',
};

type TramoFiabilidad = 0 | 1 | 2;

function tramoFiabilidad(resultado: ResultadoAfinidad): TramoFiabilidad {
  if (resultado.estado === 'sin-datos') return 2;
  return resultado.bajaCobertura ? 1 : 0;
}

const ETIQUETA_TRAMO: Record<Exclude<TramoFiabilidad, 0>, string> = {
  1: 'Cobertura baja: menos datos para comparar',
  2: 'Sin posiciones comparables con tus respuestas',
};

function MarcadorContraste({ doble, compacto }: { doble: DobleMarcador; compacto: boolean }) {
  const calculable = doble.resultadoContraste.estado === 'calculable';
  const puntuacion = calculable
    ? `${formatearNumero(doble.resultadoContraste.puntuacion ?? 0)} %`
    : 'sin datos comparables';
  const resumen = calculable
    ? `${puntuacion} · ${doble.resultadoContraste.itemsComparados} ítems${
        doble.resultadoContraste.bajaCobertura ? ' · cobertura baja' : ''
      }`
    : puntuacion;
  const contenido = (
    <>
      {calculable ? (
        <>
          <div className="barra barra--contraste" aria-hidden="true">
            <span
              style={{
                width: `${Math.max(0, Math.min(100, doble.resultadoContraste.puntuacion ?? 0))}%`,
              }}
            />
          </div>
          <p className="ranking-meta">
            {doble.resultadoContraste.itemsComparados} ítems observados · cobertura del{' '}
            {formatearNumero(100 * doble.resultadoContraste.cobertura, 0)} %
          </p>
        </>
      ) : null}
      <p className="marcador-contraste__lecturas">
        Dos lecturas del mismo partido, sin promediar: «{doble.etiquetaBase}»
        {doble.fechaBase ? ` (corte ${doble.fechaBase})` : ''} frente a «
        {doble.etiquetaContraste}»{doble.periodo ? ` (${doble.periodo})` : ''}.{' '}
        {'Ninguna es «la verdad esencial»: una recoge lo que el partido dice; la otra, lo que hizo en el periodo observado.'}
      </p>
      <p className="marcador-contraste__aviso">{doble.advertencia}</p>
      {calculable && doble.resultadoContraste.bajaCobertura ? (
        <p className="aviso-cobertura aviso-cobertura--contraste">
          Esta segunda lectura tiene cobertura baja y no determina el puesto.
        </p>
      ) : null}
    </>
  );

  if (compacto) {
    return (
      <details className="marcador-contraste marcador-contraste--replegado">
        <summary>
          <strong>{doble.etiquetaContraste}</strong>
          <span>{resumen}</span>
        </summary>
        <div className="marcador-contraste__contenido">{contenido}</div>
      </details>
    );
  }

  return (
    <div className="marcador-contraste">
      <div className="marcador-contraste__cabecera">
        <strong>{doble.etiquetaContraste}</strong>
        <span>{puntuacion}</span>
      </div>
      {contenido}
    </div>
  );
}

export function Ranking({
  resultados,
  entidades,
  tipoEntidad = 'partido',
  doblesMarcadores,
  compacto = false,
  inicio = 1,
  ordenada = true,
  etiquetaPosicion,
  contextoPorEntidad,
  separarTramos = true,
}: Props) {
  const plural =
    tipoEntidad === 'sindicato'
      ? 'sindicatos'
      : tipoEntidad === 'partido'
        ? 'partidos'
        : 'organizaciones';
  const singular =
    tipoEntidad === 'sindicato'
      ? 'sindicato'
      : tipoEntidad === 'partido'
        ? 'partido'
        : 'organización';
  if (resultados.length === 0) {
    return (
      <p className="nota-al-margen">
        No hay {plural} comparables con las respuestas disponibles.
      </p>
    );
  }

  // El separador de cada tramo se pinta UNA sola vez (en su primera aparición):
  // con tramos intercalados por puntuación se repetía hasta 4 veces en la misma
  // lista (revisión adversarial).
  const primerIndiceDeTramo = new Map<TramoFiabilidad, number>();
  resultados.forEach((r, i) => {
    const t = tramoFiabilidad(r);
    if (!primerIndiceDeTramo.has(t)) primerIndiceDeTramo.set(t, i);
  });
  const sinTramoPrincipalVisible = primerIndiceDeTramo.get(1) === 0;

  const filas = resultados.map((r, i) => {
    const entidad = entidades.get(r.entidadId);
    if (!entidad) return null;
    const calculable = r.estado === 'calculable';
    const doble = doblesMarcadores?.get(r.entidadId);
    const contexto = contextoPorEntidad?.get(r.entidadId);
    const tramo = tramoFiabilidad(r);
    const abreTramo =
      ordenada && separarTramos && tramo > 0 && primerIndiceDeTramo.get(tramo) === i;
    return (
      <li key={r.entidadId} className={abreTramo ? 'ranking-fila--abre-tramo' : undefined}>
        {abreTramo ? (
          <span className="ranking-separador">
            {ETIQUETA_TRAMO[tramo as 1 | 2]}
            {tramo === 1 ? (
              <small className="ranking-separador__nota">
                {sinTramoPrincipalVisible
                  ? 'Con las respuestas que llevas, todos los resultados de esta lista tienen cobertura baja: los porcentajes salen de pocos ítems y son solo orientativos. Responder más preguntas hace la comparación fiable.'
                  : 'Los porcentajes de este tramo salen de muy pocos ítems: se muestran apagados y en pequeño porque no son comparables con los del tramo principal.'}
              </small>
            ) : null}
          </span>
        ) : null}
        <div className="ranking-cabecera">
          {ordenada ? (
            <span className="ranking-pos" aria-hidden="true">
              {etiquetaPosicion?.(r, i) ?? `${inicio + i}.`}
            </span>
          ) : null}
          <span className="ranking-nombre">{nombrePerfil(entidad)}</span>
          <span
            className="insignia"
            title={
              r.confianza === 'verificada'
                ? `Posiciones con autoubicación de la organización o cita documental verificada.`
                : 'Posiciones inferidas por el equipo y etiquetadas como estimación.'
            }
          >
            {ETIQUETA_CONFIANZA[r.confianza] ?? r.confianza}
          </span>
          {entidad.demo ? <span className="insignia insignia--acento">demo</span> : null}
          <span
            className={`ranking-pct${
              calculable && r.bajaCobertura ? ' ranking-pct--orientativo' : ''
            }`}
          >
            {doble ? (
              <small className="ranking-pct__etiqueta">{doble.etiquetaBase}</small>
            ) : null}
            {calculable && r.itemsComparados >= MINIMO_ITEMS_PORCENTAJE ? (
              <>
                {r.bajaCobertura ? (
                  <small className="ranking-pct__etiqueta">
                    orientativo · {r.itemsComparados} ítems
                  </small>
                ) : null}
                {formatearNumero(r.puntuacion ?? 0)}
                <small> %</small>
              </>
            ) : calculable ? (
              <small>
                solo {r.itemsComparados} pregunta{r.itemsComparados === 1 ? '' : 's'} en común
              </small>
            ) : (
              <small>sin datos comparables</small>
            )}
          </span>
        </div>
        {contexto ? <p className="ranking-contexto">{contexto}</p> : null}
        {calculable && r.itemsComparados >= MINIMO_ITEMS_PORCENTAJE ? (
          <>
            <div
              className={`barra${r.bajaCobertura ? ' barra--orientativa' : ''}`}
              aria-hidden="true"
            >
              <span style={{ width: `${Math.max(0, Math.min(100, r.puntuacion ?? 0))}%` }} />
            </div>
            <p className="ranking-meta">
              Comparados {r.itemsComparados} de tus {r.itemsRespondidos} ítems con respuesta
              {' · '}cobertura del {formatearNumero(100 * r.cobertura, 0)} %
            </p>
          </>
        ) : calculable ? (
          <p className="ranking-meta">
            Con {r.itemsComparados} pregunta{r.itemsComparados === 1 ? '' : 's'} en común un
            porcentaje engaña más que informa: responder más preguntas (o completar el mapeo de
            este {singular}) activará la comparación.
          </p>
        ) : (
          <p className="ranking-meta">
            El {singular} no tiene posición conocida en las preguntas que has contestado.
          </p>
        )}
        {doble ? <MarcadorContraste doble={doble} compacto={compacto} /> : null}
        {calculable && r.bajaCobertura ? (
          <p className="aviso-cobertura">
            <strong>{compacto ? 'Cobertura baja:' : 'Aviso de baja cobertura:'}</strong> este{' '}
            {singular} solo tiene posición conocida en una parte pequeña de tus respuestas.
            {!compacto
              ? ' El porcentaje se muestra por transparencia, pero puede no ser representativo.'
              : ' Resultado orientativo.'}
          </p>
        ) : null}
      </li>
    );
  });

  const clase = `ranking${compacto ? ' ranking--compacto' : ''}`;
  return ordenada ? (
    <ol className={clase} start={inicio}>
      {filas}
    </ol>
  ) : (
    <ul className={clase}>{filas}</ul>
  );
}
