import type { Partido, ResultadoAfinidad } from '@engine';
import { ITEM_POR_ID, etiquetaValor, nombrePartido } from '../datos';

interface Props {
  resultado: ResultadoAfinidad;
  partido: Partido;
}

const TIPO_FUENTE: Record<string, string> = {
  programa: 'Programa',
  votacion: 'Votación',
  declaracion: 'Declaración',
  autoubicacion: 'Autoubicación del partido',
  estatutos: 'Estatutos',
  redes: 'Redes sociales',
  otro: 'Otra fuente',
};

/**
 * «Por qué coincide»: la evidencia ítem a ítem que sustenta el porcentaje.
 * Es parte del contrato del proyecto: ningún resultado sin su explicación.
 */
export function DetallePartido({ resultado, partido }: Props) {
  return (
    <details className="detalle-partido">
      <summary>
        <span>{nombrePartido(partido)}</span>
        {partido.demo ? <span className="insignia insignia--acento">demo</span> : null}
      </summary>
      <div className="detalle-cuerpo">
        <p className="detalle-intro">
          Comparación ítem a ítem de tus respuestas con las posiciones conocidas del partido.
          La distancia va de 0 (misma posición) a 4 (posiciones opuestas); los ítems que
          marcaste como importantes pesan el doble en el porcentaje.
        </p>
        {resultado.detalle.length === 0 ? (
          <p className="nota-al-margen">
            Este partido no tiene posición conocida en ninguno de los ítems que has respondido.
          </p>
        ) : (
          <div className="tabla-scroll">
            <table className="tabla-detalle">
              <thead>
                <tr>
                  <th className="col-item" scope="col">
                    Ítem
                  </th>
                  <th scope="col">Tu respuesta</th>
                  <th scope="col">Partido</th>
                  <th scope="col">Distancia</th>
                  <th className="col-just" scope="col">
                    Justificación y fuente
                  </th>
                </tr>
              </thead>
              <tbody>
                {resultado.detalle.map((d) => {
                  const item = ITEM_POR_ID.get(d.itemId);
                  return (
                    <tr key={d.itemId}>
                      <td>
                        {item?.texto ?? d.itemId}
                        <span className="celda-id">{d.itemId}</span>
                      </td>
                      <td className="celda-valor">
                        {etiquetaValor(d.valorUsuario)}
                        {d.peso === 2 ? (
                          <span className="celda-peso"> · importa el doble</span>
                        ) : null}
                      </td>
                      <td className="celda-valor">{etiquetaValor(d.valorPartido)}</td>
                      <td className="celda-dist">{d.distancia} de 4</td>
                      <td>
                        {d.justificacion ?? <span className="sin-dato">Sin justificación</span>}
                        {d.fuente ? (
                          <span className="celda-fuente">
                            {TIPO_FUENTE[d.fuente.tipo] ?? d.fuente.tipo}
                            {d.fuente.titulo ? (
                              <>
                                {': '}
                                <cite>{d.fuente.titulo}</cite>
                              </>
                            ) : null}
                            {d.fuente.fecha ? ` (${d.fuente.fecha})` : ''}
                            {d.fuente.cita ? <> — «{d.fuente.cita}»</> : null}
                            {d.fuente.url ? (
                              <>
                                {' · '}
                                <a href={d.fuente.url} rel="noopener noreferrer" target="_blank">
                                  fuente
                                </a>
                              </>
                            ) : null}
                          </span>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </details>
  );
}
