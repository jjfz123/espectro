import { useId, useState } from 'react';
import type { Eje, ReferenciaDoctrinal } from '@engine';
import type { CorrienteAtlas } from '../atlasIdeologias';
import { nombreCapaAtlas } from '../atlasIdeologias';
import { ITEM_POR_ID } from '../datos';
import { NOMBRE_LLANO_EJE } from '../lecturaEjes';
import { InformacionIdeologia } from './FichaIdeologia';
import { LecturaEjes } from './LecturaEjes';

interface Props {
  corriente: CorrienteAtlas;
  referencia?: ReferenciaDoctrinal;
  ejes: [Eje, Eje];
  cercaDelUsuario?: boolean;
  /** Abre la etiqueta sustituida como contexto, nunca como región o match. */
  vistaRotuloOriginal?: boolean;
  onCerrar: () => void;
}

function etiquetaEstado(corriente: CorrienteAtlas): string {
  if (corriente.estado === 'instrumentada') return 'Corriente instrumentada';
  if (corriente.estado === 'investigacion') return 'Ancla en investigación, sin región';
  return 'Ancla informativa';
}

export function FichaZonaIdeologica({
  corriente,
  referencia,
  ejes,
  cercaDelUsuario,
  vistaRotuloOriginal = false,
  onCerrar,
}: Props) {
  const idBase = useId();
  const [ampliada, setAmpliada] = useState(false);
  const idTitulo = `${idBase}-titulo`;
  const idDetalle = `${idBase}-detalle`;
  const trazabilidad = vistaRotuloOriginal ? corriente.trazabilidadOriginal : undefined;
  const nombreVisible = trazabilidad?.nombreOriginal ?? corriente.nombre;
  /* La sensibilidad de la región sustituta no se hereda a una etiqueta
     original que se abre únicamente como registro contextual. */
  const sensible = !trazabilidad && corriente.sensibilidad !== 'normal';
  const valores = {
    [ejes[0].id]: corriente.coordenadas.x,
    [ejes[1].id]: corriente.coordenadas.y,
  };

  return (
    <article
      className="referencia-tarjeta ficha-ideologia ficha-zona-ideologica"
      aria-labelledby={idTitulo}
      data-sensible={sensible || undefined}
      data-cerca-del-usuario={!trazabilidad && cercaDelUsuario ? true : undefined}
      data-vista={trazabilidad ? 'rotulo-original' : 'entrada-atlas'}
    >
      <header>
        <div>
          <p className="kicker">
            {trazabilidad
              ? 'Rótulo original conservado como contexto'
              : cercaDelUsuario
                ? 'Zona bidimensional más próxima'
                : etiquetaEstado(corriente)}
          </p>
          <h3 id={idTitulo}>{nombreVisible}</h3>
        </div>
        <button
          type="button"
          className="boton boton--terciario"
          aria-label={`Cerrar explicación de ${nombreVisible}`}
          onClick={onCerrar}
        >
          Cerrar
        </button>
      </header>

      <p className="referencia-definicion">
        {trazabilidad ? trazabilidad.motivo : corriente.definicion}
      </p>
      <p className="mapa-corriente-lectura__nota">
        {trazabilidad
          ? `Esta etiqueta se conserva como ${nombreCapaAtlas(trazabilidad.capa)} para que la adaptación sea auditable. No ocupa una celda, no puede ser la región más cercana y no participa en el cálculo de afinidad.`
          : cercaDelUsuario
          ? 'Tu punto queda más cerca de esta ancla en estos dos ejes. No significa que «seas» esta corriente: el perfil completo, las coincidencias y las diferencias se calculan aparte.'
          : corriente.publicacionGeometrica === 'bloqueada-investigacion'
            ? 'Esta ancla hueca conserva un prior editorial pendiente de fuentes y revisión. No posee una celda, no puede ser la corriente más cercana y abrirla no expresa afinidad ni pertenencia.'
            : corriente.capa === 'region'
              ? 'Esta es una región educativa publicada del atlas. Abrirla no expresa afinidad ni pertenencia.'
            : `Esta entrada se conserva como ${nombreCapaAtlas(corriente.capa)} y no ocupa una celda del mapa ni puede ser la corriente más cercana.`}
      </p>
      {sensible ? (
        <p className="mapa-corriente-lectura__nota">
          Corriente sensible: la proximidad parcial nunca atribuye apoyo a violencia,
          antipluralismo, militancia o intención.
        </p>
      ) : null}

      {!trazabilidad && corriente.publicacionGeometrica === 'publicada' ? (
        <section className="ficha-ideologia__posicion" aria-label="Ancla editorial de la corriente">
          <h4>Ancla editorial de la región</h4>
          <LecturaEjes ejes={ejes} valores={valores} nombreCorto={NOMBRE_LLANO_EJE} />
          <p className="mapa-corriente-lectura__nota">
            Es una posición editorial auditable para construir la geometría educativa. No es la
            posición calculada de una referencia ni reemplaza una puntuación desde respuestas.
          </p>
        </section>
      ) : null}

      {!trazabilidad && corriente.publicacionGeometrica === 'bloqueada-investigacion' ? (
        <p className="mapa-corriente-lectura__nota">
          El marcador hueco señala dónde estaba el prior que debe revisarse; sus coordenadas no se
          presentan como medición doctrinal y no recortan ninguna región del mapa.
        </p>
      ) : null}

      <button
        type="button"
        className="boton boton--secundario ficha-ideologia__ampliar"
        aria-expanded={ampliada}
        aria-controls={idDetalle}
        onClick={() => setAmpliada((actual) => !actual)}
      >
        {ampliada ? 'Ocultar información' : 'Más información'}
      </button>

      <div id={idDetalle} className="referencia-fuentes ficha-ideologia__informacion" hidden={!ampliada}>
        {trazabilidad ? (
          <>
            <section>
              <h4>Cómo se conserva el rótulo original</h4>
              <p>
                <strong>Rótulo literal de la imagen:</strong> {trazabilidad.etiquetaOriginal}.
              </p>
              <p>
                Inventario original nº {trazabilidad.numeroOriginal}, decisión inicial{' '}
                {trazabilidad.decisionOriginal}. Esa clasificación se conserva como procedencia y
                no es la decisión de publicación de la corriente española independiente.
              </p>
              <p>
                La imagen de partida lo situaba visualmente en x{' '}
                {trazabilidad.coordenadasOriginales.x}, y {trazabilidad.coordenadasOriginales.y}.
                Espectro conserva esas coordenadas solo como trazabilidad: no las dibuja ni las
                trata como una posición calculada.
              </p>
            </section>
            <section>
              <h4>Sustitución en la adaptación española</h4>
              <p>
                La región que ocupa este espacio editorial en la adaptación es{' '}
                <strong>{corriente.nombre}</strong>, con definición, evidencia y ancla propias.
                No se afirma que ambas etiquetas sean equivalentes.
              </p>
              <p>{corriente.definicion}</p>
              <p>{corriente.encajeEspana}</p>
            </section>
            <section>
              <h4>Límite de la comparación</h4>
              <p>
                El rótulo original no tiene aquí una referencia doctrinal verificable y separada.
                Por eso no se le calculan afinidad, cercanía ni una identidad personal a partir de
                las respuestas.
              </p>
            </section>
          </>
        ) : (
          <>
            <section>
              <h4>Encaje en Espectro y en España</h4>
              <p>{corriente.encajeEspana}</p>
              <p>
                <strong>Estado:</strong> {etiquetaEstado(corriente)} ·{' '}
                {corriente.decision === 'A' ? 'capa principal' : 'profundidad exhaustiva'} ·{' '}
                {nombreCapaAtlas(corriente.capa)}.
              </p>
              {corriente.trazabilidadOriginal ? (
                <p>
                  <strong>Rótulo de la imagen conservado:</strong>{' '}
                  {corriente.trazabilidadOriginal.nombreOriginal} ({
                    nombreCapaAtlas(corriente.trazabilidadOriginal.capa)
                  }). {corriente.trazabilidadOriginal.motivo}
                </p>
              ) : null}
              {corriente.desviacionJustificada ? (
                <p>
                  <strong>Decisión geométrica:</strong> {corriente.desviacionJustificada}
                </p>
              ) : null}
            </section>

            <section>
              <h4>Preguntas que ayudan a distinguirla</h4>
              <ul>
                {corriente.preguntasDiscriminantes.map((itemId) => (
                  <li key={itemId}>{ITEM_POR_ID.get(itemId)?.texto ?? itemId}</li>
                ))}
              </ul>
            </section>

            {referencia ? (
              <InformacionIdeologia
                referencia={referencia}
                cercaDelUsuario={cercaDelUsuario}
                origenAparicion={corriente.capa === 'region' ? 'ancla-editorial' : 'seleccion'}
              />
            ) : (
              <section>
                <h4>Límite de la comparación</h4>
                <p>
                  Aún no existe una referencia con suficientes posiciones verificadas para
                  calcular afinidad ítem a ítem. La entrada puede explorarse en el atlas, pero no
                  aparecerá como resultado doctrinal hasta superar ese control.
                </p>
              </section>
            )}
          </>
        )}
      </div>
    </article>
  );
}
