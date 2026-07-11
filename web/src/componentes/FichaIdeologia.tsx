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

function explicacionDeAparicion(
  referencia: ReferenciaDoctrinal,
  cercaDelUsuario: boolean | undefined,
): string {
  const esPatronViolento = referencia.sensibilidad === 'violenta';

  if (cercaDelUsuario) {
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
}: Pick<FichaIdeologiaProps, 'referencia' | 'cercaDelUsuario'>) {
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
        <p>{explicacionDeAparicion(referencia, cercaDelUsuario)}</p>
        <p>{referencia.advertencia}</p>
        {referencia.publicacionMapa?.motivo ? (
          <p>
            <strong>Limitación cartográfica:</strong> {referencia.publicacionMapa.motivo}
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
  const mostrarPosicion = Boolean(valores && ejes && ejes.length > 0);

  return (
    <article
      className="referencia-tarjeta ficha-ideologia"
      aria-labelledby={idTitulo}
      data-sensible={esSensible}
      data-cerca-del-usuario={cercaDelUsuario || undefined}
    >
      <header>
        <div>
          <p className="kicker">
            {esViolenta
              ? 'Patrón doctrinal sensible'
              : cercaDelUsuario
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
        <InformacionIdeologia referencia={referencia} cercaDelUsuario={cercaDelUsuario} />
      </div>
    </article>
  );
}
