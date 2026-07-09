import type { ReferenciaDoctrinal, ResultadoReferencia } from '@engine';
import { ITEM_POR_ID, formatearNumero } from '../datos';

interface Props {
  referencias: ReferenciaDoctrinal[];
  resultados: ResultadoReferencia[];
}

export function ReferenciasDoctrinales({ referencias, resultados }: Props) {
  const referenciaPorId = new Map(referencias.map((referencia) => [referencia.id, referencia]));
  const publicables = resultados.filter((resultado) => resultado.publicable);

  if (referencias.length === 0) return null;

  return (
    <section className="seccion referencias-doctrinales">
      <h2>Referencias doctrinales</h2>
      <p className="nota-al-margen" style={{ maxWidth: '70ch' }}>
        Son tipos ideales para describir combinaciones que quizá ningún partido represente. No
        dicen «eres X», no son candidaturas y no usan lo que marcaste como importante. Solo
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
            const coincidencias = [...resultado.detalle]
              .filter((detalle) => detalle.distancia <= 1)
              .sort((a, b) => a.distancia - b.distancia)
              .slice(0, 3);
            const diferencias = [...resultado.detalle]
              .filter((detalle) => detalle.distancia >= 2)
              .sort((a, b) => b.distancia - a.distancia)
              .slice(0, 3);

            return (
              <article
                className="referencia-tarjeta"
                data-sensible={referencia.sensibilidad !== undefined && referencia.sensibilidad !== 'normal'}
                key={referencia.id}
              >
                <header>
                  <div>
                    <p className="kicker">Coincidencias parciales con</p>
                    <h3>{referencia.nombre}</h3>
                    {referencia.variante ? <p className="referencia-variante">{referencia.variante}</p> : null}
                  </div>
                  <p className="referencia-puntuacion">
                    {formatearNumero(resultado.puntuacion)} <small>%</small>
                  </p>
                </header>
                <p className="referencia-definicion">{referencia.definicion}</p>
                <p className="referencia-cobertura">
                  Comparación basada en {resultado.itemsComparados} de {resultado.itemsDefinitorios}{' '}
                  posiciones definitorias · umbral {referencia.reglaPublicacion.umbralAfinidad} %
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
                <details className="referencia-fuentes">
                  <summary>Definición, límites y fuentes</summary>
                  <p>{referencia.advertencia}</p>
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
                </details>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
