import { useState } from 'react';
import type { PerfilAfinidad, Posicion, ResultadoAfinidad } from '@engine';
import { ITEM_POR_ID, etiquetaValor, nombrePerfil } from '../datos';

export interface LecturaContraste {
  etiquetaBase: string;
  etiqueta: string;
  descripcion: string;
  advertencia: string;
  resultado: ResultadoAfinidad;
  posiciones: Record<string, Posicion>;
}

interface Props {
  resultado: ResultadoAfinidad;
  entidad: PerfilAfinidad;
  tipoEntidad?: 'partido' | 'sindicato' | 'organizacion';
  lecturaContraste?: LecturaContraste;
}

const TIPO_FUENTE: Record<string, string> = {
  programa: 'Programa',
  votacion: 'Votación',
  declaracion: 'Declaración',
  autoubicacion: 'Autoubicación de la organización',
  estatutos: 'Estatutos',
  redes: 'Redes sociales',
  otro: 'Otra fuente',
};

const CALIDAD_EVIDENCIA: Record<string, string> = {
  alta: 'evidencia alta',
  media: 'evidencia media',
  baja: 'evidencia baja',
};

const ESTADO_COMPROMISO: Record<string, string> = {
  cumplido: 'compromiso cumplido',
  parcial: 'cumplimiento parcial',
  bloqueado: 'compromiso bloqueado',
  incumplido: 'compromiso incumplido',
  'no-evaluable': 'aún no evaluable',
};

interface TablaProps {
  resultado: ResultadoAfinidad;
  posiciones: Record<string, Posicion>;
  singular: string;
}

function TablaDetalle({ resultado, posiciones, singular }: TablaProps) {
  if (resultado.detalle.length === 0) {
    return (
      <p className="nota-al-margen">
        Este {singular} no tiene posición conocida en ninguno de los ítems que has respondido.
      </p>
    );
  }

  return (
    <div className="tabla-scroll">
      <table className="tabla-detalle">
        <thead>
          <tr>
            <th className="col-item" scope="col">
              Ítem
            </th>
            <th scope="col">Tu respuesta</th>
            <th scope="col">Organización</th>
            <th scope="col">Distancia</th>
            <th className="col-just" scope="col">
              Justificación y fuente
            </th>
          </tr>
        </thead>
        <tbody>
          {resultado.detalle.map((detalle) => {
            const item = ITEM_POR_ID.get(detalle.itemId);
            const posicion = posiciones[detalle.itemId];
            return (
              <tr key={detalle.itemId}>
                <td>
                  {item?.texto ?? detalle.itemId}
                  <span className="celda-id">{detalle.itemId}</span>
                </td>
                <td className="celda-valor">
                  {etiquetaValor(detalle.valorUsuario)}
                  {detalle.peso === 2 ? (
                    <span className="celda-peso">importa el doble</span>
                  ) : null}
                </td>
                <td className="celda-valor">{etiquetaValor(detalle.valorEntidad)}</td>
                <td className="celda-dist">{detalle.distancia} de 4</td>
                <td>
                  {detalle.justificacion ?? <span className="sin-dato">Sin justificación</span>}
                  {posicion?.estadoCompromiso ? (
                    <span className={`celda-estado celda-estado--${posicion.estadoCompromiso}`}>
                      {ESTADO_COMPROMISO[posicion.estadoCompromiso] ?? posicion.estadoCompromiso}
                    </span>
                  ) : null}
                  {posicion?.calidadEvidencia ? (
                    <span className="celda-calidad">
                      {CALIDAD_EVIDENCIA[posicion.calidadEvidencia] ?? posicion.calidadEvidencia}
                    </span>
                  ) : null}
                  {detalle.fuente ? (
                    <span className="celda-fuente">
                      {TIPO_FUENTE[detalle.fuente.tipo] ?? detalle.fuente.tipo}
                      {detalle.fuente.titulo ? (
                        <>
                          {': '}
                          <cite>{detalle.fuente.titulo}</cite>
                        </>
                      ) : null}
                      {detalle.fuente.fecha ? ` (${detalle.fuente.fecha})` : ''}
                      {detalle.fuente.consultado
                        ? ` · consultada ${detalle.fuente.consultado}`
                        : ''}
                      {detalle.fuente.cita ? <> — «{detalle.fuente.cita}»</> : null}
                      {detalle.fuente.url ? (
                        <>
                          {' · '}
                          <a
                            href={detalle.fuente.url}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
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
  );
}

/** «Por qué coincide»: ninguna puntuación se muestra sin evidencia auditable. */
export function DetalleAfinidad({
  resultado,
  entidad,
  tipoEntidad = 'partido',
  lecturaContraste,
}: Props) {
  const [abierto, setAbierto] = useState(false);
  const singular =
    tipoEntidad === 'sindicato'
      ? 'sindicato'
      : tipoEntidad === 'partido'
        ? 'partido'
        : 'organización';

  return (
    <details
      className="detalle-partido"
      onToggle={(evento) => setAbierto(evento.currentTarget.open)}
    >
      <summary>
        <span>{nombrePerfil(entidad)}</span>
        {entidad.demo ? <span className="insignia insignia--acento">demo</span> : null}
      </summary>
      {abierto ? (
        <div className="detalle-cuerpo">
          <p className="detalle-intro">
            Comparación ítem a ítem de tus respuestas con las posiciones conocidas del{' '}
            {singular}. La distancia va de 0 (misma posición) a 4 (posiciones opuestas); los
            ítems que marcaste como importantes pesan el doble en el porcentaje.
          </p>

          {lecturaContraste ? <h3>{lecturaContraste.etiquetaBase}</h3> : null}
          <TablaDetalle
            resultado={resultado}
            posiciones={entidad.posiciones}
            singular={singular}
          />

          {lecturaContraste ? (
            <section
              className="lectura-contraste"
              aria-label={`${lecturaContraste.etiqueta}: ${nombrePerfil(entidad)}`}
            >
              <h3>{lecturaContraste.etiqueta}</h3>
              <p>{lecturaContraste.descripcion}</p>
              <p className="lectura-contraste__aviso">{lecturaContraste.advertencia}</p>
              <TablaDetalle
                resultado={lecturaContraste.resultado}
                posiciones={lecturaContraste.posiciones}
                singular={singular}
              />
            </section>
          ) : null}
        </div>
      ) : null}
    </details>
  );
}
