import { useId, useState } from 'react';
import type { Eje, ReferenciaDoctrinal } from '@engine';
import { NOMBRE_LLANO_EJE } from '../lecturaEjes';
import { LecturaEjes } from './LecturaEjes';

export interface FichaIdeologiaProps {
  referencia: ReferenciaDoctrinal;
  /** Posición proyectada de la referencia; nunca se infiere dentro de la ficha. */
  valores?: Record<string, number | null | undefined>;
  /** Ejes que dan contexto a `valores`, en el orden en que deben leerse. */
  ejes?: Eje[];
  /** Indica que el motor ya ha determinado cercanía; no asigna una identidad. */
  cercaDelUsuario?: boolean;
  onCerrar: () => void;
}

type OrigenAparicionIdeologia =
  | 'seleccion'
  | 'coincidencia-items'
  | 'proyeccion-calculada'
  | 'ancla-editorial';

function explicacionDeAparicion(
  referencia: ReferenciaDoctrinal,
  cercaDelUsuario: boolean | undefined,
  origen: OrigenAparicionIdeologia,
): string {
  const esPatronViolento = referencia.sensibilidad === 'violenta';

  if (origen === 'ancla-editorial') {
    return cercaDelUsuario
      ? 'Esta referencia documenta la región editorial que has abierto. La cercanía indicada pertenece al ancla del atlas, no a una proyección calculada de esta referencia ni a una coincidencia doctrinal.'
      : 'Esta referencia documenta la región editorial que has abierto. El ancla pertenece al atlas educativo: no es una proyección calculada de esta referencia ni una coincidencia doctrinal.';
  }

  if (
    origen === 'proyeccion-calculada' &&
    referencia.publicacionMapa?.publicable === false
  ) {
    return 'Se muestra como contexto de la entrada seleccionada. Su proyección calculada está vetada editorialmente, por lo que esta ficha no atribuye cercanía cartográfica.';
  }

  if (cercaDelUsuario) {
    if (origen === 'coincidencia-items') {
      return esPatronViolento
        ? 'Algunas respuestas comparables coinciden con este patrón doctrinal sensible. Es una lectura descriptiva: no implica pertenencia, militancia, delito ni intención violenta.'
        : 'La comparación ítem a ítem ha encontrado coincidencias parciales con esta referencia. No es una posición en el mapa ni equivale a una identidad política o a un acuerdo completo.';
    }
    return esPatronViolento
      ? 'Algunas respuestas comparables quedan próximas a este patrón doctrinal sensible. Es una lectura descriptiva para contextualizar posiciones: no implica pertenencia, militancia, delito ni intención violenta.'
      : 'La posición calculada en los ejes disponibles queda próxima a esta referencia. La cercanía es descriptiva: no equivale a una identidad política ni a un acuerdo completo.';
  }

  return esPatronViolento
    ? 'Se muestra para explicar un patrón doctrinal sensible seleccionado. Consultar esta ficha no expresa afinidad ni atribuye pertenencia, militancia o intención.'
    : 'Se muestra como contexto de una referencia doctrinal seleccionada. Si no se indica cercanía, abrir la ficha no implica afinidad ni pertenencia.';
}

export function InformacionIdeologia({
  referencia,
  cercaDelUsuario,
  origenAparicion = cercaDelUsuario ? 'coincidencia-items' : 'seleccion',
}: Pick<FichaIdeologiaProps, 'referencia' | 'cercaDelUsuario'> & {
  origenAparicion?: OrigenAparicionIdeologia;
}) {
  const idBase = useId();
  const idMotivo = `${idBase}-motivo`;
  const idFuentes = `${idBase}-fuentes`;

  return (
    <>
      {referencia.variante || referencia.periodo ? (
        <dl className="ficha-ideologia__metadatos">
          {referencia.variante ? (
            <div>
              <dt>Variante descrita</dt>
              <dd>{referencia.variante}</dd>
            </div>
          ) : null}
          {referencia.periodo ? (
            <div>
              <dt>Periodo</dt>
              <dd>{referencia.periodo}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      <section aria-labelledby={idMotivo}>
        <h4 id={idMotivo}>Por qué se muestra y qué limita esta lectura</h4>
        <p>{explicacionDeAparicion(referencia, cercaDelUsuario, origenAparicion)}</p>
        <p>{referencia.advertencia}</p>
        {referencia.publicacionMapa ? (
          <p>
            <strong>
              Proyección calculada en el mapa:{' '}
              {referencia.publicacionMapa.publicable
                ? 'admitida por el control editorial.'
                : 'no publicable.'}
            </strong>{' '}
            {referencia.publicacionMapa.motivo}
            {referencia.publicacionMapa.publicable
              ? ' Aun así, solo se dibuja si alcanza la cobertura exigida.'
              : ' Este veto no afecta al ancla editorial educativa del atlas.'}
          </p>
        ) : null}
        {referencia.publicacionAfinidad ? (
          <p>
            <strong>
              Afinidad doctrinal:{' '}
              {referencia.publicacionAfinidad.publicable
                ? 'admitida por el control editorial.'
                : 'no publicable.'}
            </strong>{' '}
            {referencia.publicacionAfinidad.motivo}
            {referencia.publicacionAfinidad.publicable
              ? ' La aparición sigue dependiendo de los mínimos de similitud y cobertura.'
              : ' No participa en el cálculo de afinidad ni puede aparecer como resultado doctrinal mientras siga vigente este veto.'}
          </p>
        ) : null}
      </section>

      {referencia.fuentesMarco.length > 0 ? (
        <section aria-labelledby={idFuentes}>
          <h4 id={idFuentes}>Fuentes marco</h4>
          <ul>
            {referencia.fuentesMarco.map((fuente, indice) => (
              <li key={`${fuente.url ?? fuente.titulo ?? 'fuente'}-${indice}`}>
                {fuente.url ? (
                  <a href={fuente.url} rel="noopener noreferrer" target="_blank">
                    {fuente.titulo ?? 'Fuente doctrinal'}
                  </a>
                ) : (
                  fuente.titulo ?? 'Fuente doctrinal'
                )}
                {fuente.fecha ? ` (${fuente.fecha})` : ''}
                {fuente.consultado ? ` · consultada ${fuente.consultado}` : ''}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}

/**
 * Ficha genérica de una referencia doctrinal. Puede abrirse desde una zona del
 * mapa o desde una cercanía calculada; no conoce coordenadas ni ideologías
 * concretas y nunca convierte una referencia sensible en premio o identidad.
 */
export function FichaIdeologia({
  referencia,
  valores,
  ejes,
  cercaDelUsuario,
  onCerrar,
}: FichaIdeologiaProps) {
  const idBase = useId();
  const [ampliada, setAmpliada] = useState(false);
  const idTitulo = `${idBase}-titulo`;
  const idInformacion = `${idBase}-informacion`;
  const idPosicion = `${idBase}-posicion`;
  const esViolenta = referencia.sensibilidad === 'violenta';
  const esSensible = referencia.sensibilidad !== undefined && referencia.sensibilidad !== 'normal';
  const cercaniaCartograficaPublicable =
    Boolean(cercaDelUsuario) && referencia.publicacionMapa?.publicable !== false;
  const mostrarPosicion = Boolean(
    valores &&
      ejes &&
      ejes.length > 0 &&
      referencia.publicacionMapa?.publicable !== false,
  );

  return (
    <article
      className="referencia-tarjeta ficha-ideologia"
      aria-labelledby={idTitulo}
      data-sensible={esSensible}
      data-cerca-del-usuario={cercaniaCartograficaPublicable || undefined}
    >
      <header>
        <div>
          <p className="kicker">
            {esViolenta
              ? 'Patrón doctrinal sensible'
              : cercaniaCartograficaPublicable
                ? 'Referencia doctrinal cercana'
                : 'Referencia doctrinal'}
          </p>
          <h3 id={idTitulo}>{referencia.nombre}</h3>
        </div>
        <button
          type="button"
          className="boton boton--terciario"
          aria-label={`Cerrar explicación de ${referencia.nombre}`}
          onClick={onCerrar}
        >
          Cerrar
        </button>
      </header>

      <p className="referencia-definicion">{referencia.definicion}</p>

      {mostrarPosicion ? (
        <section className="ficha-ideologia__posicion" aria-labelledby={idPosicion}>
          <h4 id={idPosicion}>Posición en los ejes mostrados</h4>
          <LecturaEjes
            ejes={ejes ?? []}
            valores={valores ?? {}}
            nombreCorto={NOMBRE_LLANO_EJE}
          />
        </section>
      ) : null}

      <button
        type="button"
        className="boton boton--secundario ficha-ideologia__ampliar"
        aria-expanded={ampliada}
        aria-controls={idInformacion}
        onClick={() => setAmpliada((estado) => !estado)}
      >
        {ampliada ? 'Ocultar información' : 'Más información'}
      </button>

      <div id={idInformacion} className="referencia-fuentes ficha-ideologia__informacion" hidden={!ampliada}>
        <InformacionIdeologia
          referencia={referencia}
          cercaDelUsuario={cercaniaCartograficaPublicable}
          origenAparicion={cercaniaCartograficaPublicable ? 'proyeccion-calculada' : 'seleccion'}
        />
      </div>
    </article>
  );
}
