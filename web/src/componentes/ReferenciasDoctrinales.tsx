import { useEffect, useState } from 'react';
import { compararReferenciasDoctrinales } from '@engine';
import type { Respuesta } from '@engine';
import { ITEM_POR_ID, formatearNumero } from '../datos';
import { REFERENCIAS } from '../datosReferencias';
import { InformacionIdeologia } from './FichaIdeologia';

interface Props {
  respuestas: Respuesta[];
  alMontar?: () => void;
}

export function ReferenciasDoctrinales({ respuestas, alMontar }: Props) {
  const [referenciaAbierta, setReferenciaAbierta] = useState<string | null>(null);
  const referenciaPorId = new Map(REFERENCIAS.map((referencia) => [referencia.id, referencia]));
  const resultados = compararReferenciasDoctrinales(respuestas, REFERENCIAS);
  const publicables = resultados.filter((resultado) => resultado.publicable);

  useEffect(() => {
    alMontar?.();
  }, [alMontar]);

  if (REFERENCIAS.length === 0) return null;

  return (
    <div className="referencias-doctrinales__contenido">
      <p className="nota-al-margen" style={{ maxWidth: '70ch' }}>
        Son tipos ideales para describir combinaciones que quizá ningún partido represente. No
        dicen «eres X», no son candidaturas y no usan lo que marcaste como importante. Cada
        tarjeta compara únicamente sus preguntas definitorias —a veces solo un puñado—, así que
        puedes salir cerca de corrientes rivales entre sí a la vez sin contradicción. Solo
        aparecen cuando has contestado suficientes posiciones definitorias y superas el umbral
        publicado; puede no aparecer ninguna o aparecer varias.
      </p>

      {publicables.length === 0 ? (
        <p className="resultado-no-calculable" role="status">
          Ninguna referencia alcanza todavía a la vez el mínimo de similitud y de cobertura.
          Profundizar en módulos puede añadir evidencia, pero no se fuerza una etiqueta ganadora.
        </p>
      ) : (
        <div className="lista-referencias">
          {publicables.map((resultado) => {
            const referencia = referenciaPorId.get(resultado.entidadId);
            if (!referencia) return null;
            const esViolenta = referencia.sensibilidad === 'violenta';
            const coincidencias = [...resultado.detalle]
              .filter((detalle) => detalle.distancia <= 1)
              .sort((a, b) => a.distancia - b.distancia)
              .slice(0, 3);
            const diferencias = [...resultado.detalle]
              .filter((detalle) => detalle.distancia >= 2)
              .sort((a, b) => b.distancia - a.distancia)
              .slice(0, 3);

            return (
              <div className="referencia-resultado" key={referencia.id}>
                <article
                  className="referencia-tarjeta"
                  data-sensible={referencia.sensibilidad !== undefined && referencia.sensibilidad !== 'normal'}
                >
                  <header>
                    <div>
                      <p className="kicker">
                        {esViolenta
                          ? 'Patrón doctrinal sensible'
                          : `Coincide en ${resultado.itemsComparados} de sus ${resultado.itemsDefinitorios} preguntas`}
                      </p>
                      <h3>{referencia.nombre}</h3>
                      {!esViolenta && resultado.itemsComparados <= 6 ? (
                        <p className="referencia-anecdotica">
                          Coincidencia estrecha: pocas preguntas compartidas. No es tu etiqueta.
                        </p>
                      ) : null}
                      {referencia.variante ? <p className="referencia-variante">{referencia.variante}</p> : null}
                    </div>
                    {!esViolenta ? (
                      <p className="referencia-puntuacion">
                        {formatearNumero(resultado.puntuacion ?? 0)} <small>%</small>
                      </p>
                    ) : null}
                  </header>
                  <p className="referencia-definicion">{referencia.definicion}</p>
                  <p className="referencia-cobertura">
                    Comparación basada en {resultado.itemsComparados} de {resultado.itemsDefinitorios}{' '}
                    posiciones definitorias
                    {esViolenta
                      ? ' · supera los mínimos metodológicos, sin convertirlos en una puntuación personal'
                      : ` · umbral ${referencia.reglaPublicacion.umbralAfinidad} %`}
                  </p>
                  <div className="referencia-balance">
                    <div>
                      <h4>Coincidencias visibles</h4>
                      <ul>
                        {coincidencias.map((detalle) => (
                          <li key={detalle.itemId}>
                            {ITEM_POR_ID.get(detalle.itemId)?.texto ?? detalle.itemId}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>Diferencias o matices</h4>
                      {diferencias.length > 0 ? (
                        <ul>
                          {diferencias.map((detalle) => (
                            <li key={detalle.itemId}>
                              {ITEM_POR_ID.get(detalle.itemId)?.texto ?? detalle.itemId}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>
                          No hay diferencias fuertes entre las posiciones comparadas; eso no
                          cubre las que faltan ni demuestra pertenencia doctrinal.
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="boton boton--secundario referencia-resultado__ampliar"
                    aria-expanded={referenciaAbierta === referencia.id}
                    onClick={() =>
                      setReferenciaAbierta((actual) =>
                        actual === referencia.id ? null : referencia.id,
                      )
                    }
                  >
                    {referenciaAbierta === referencia.id
                      ? 'Ocultar información'
                      : 'Más información sobre esta corriente'}
                  </button>
                  {referenciaAbierta === referencia.id ? (
                    <div className="referencia-fuentes ficha-ideologia__informacion">
                      <InformacionIdeologia referencia={referencia} cercaDelUsuario />
                    </div>
                  ) : null}
                </article>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
