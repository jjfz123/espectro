import { useId, useState } from 'react';
import type { Eje, ReferenciaDoctrinal } from '@engine';
import type { CorrienteAtlas } from '../atlasIdeologias';
import { ITEM_POR_ID } from '../datos';
import { NOMBRE_LLANO_EJE } from '../lecturaEjes';
import { InformacionIdeologia } from './FichaIdeologia';
import { LecturaEjes } from './LecturaEjes';

interface Props {
  corriente: CorrienteAtlas;
  referencia?: ReferenciaDoctrinal;
  ejes: [Eje, Eje];
  cercaDelUsuario?: boolean;
  onCerrar: () => void;
}

function etiquetaEstado(corriente: CorrienteAtlas): string {
  if (corriente.estado === 'instrumentada') return 'Corriente instrumentada';
  if (corriente.estado === 'investigacion') return 'Ancla en investigación';
  return 'Ancla informativa';
}

export function FichaZonaIdeologica({
  corriente,
  referencia,
  ejes,
  cercaDelUsuario,
  onCerrar,
}: Props) {
  const idBase = useId();
  const [ampliada, setAmpliada] = useState(false);
  const idTitulo = `${idBase}-titulo`;
  const idDetalle = `${idBase}-detalle`;
  const sensible = corriente.sensibilidad !== 'normal';
  const valores = {
    [ejes[0].id]: corriente.coordenadas.x,
    [ejes[1].id]: corriente.coordenadas.y,
  };

  return (
    <article
      className="referencia-tarjeta ficha-ideologia ficha-zona-ideologica"
      aria-labelledby={idTitulo}
      data-sensible={sensible || undefined}
      data-cerca-del-usuario={cercaDelUsuario || undefined}
    >
      <header>
        <div>
          <p className="kicker">
            {cercaDelUsuario ? 'Zona bidimensional más próxima' : etiquetaEstado(corriente)}
          </p>
          <h3 id={idTitulo}>{corriente.nombre}</h3>
        </div>
        <button
          type="button"
          className="boton boton--terciario"
          aria-label={`Cerrar explicación de ${corriente.nombre}`}
          onClick={onCerrar}
        >
          Cerrar
        </button>
      </header>

      <p className="referencia-definicion">{corriente.definicion}</p>
      <p className="mapa-corriente-lectura__nota">
        {cercaDelUsuario
          ? 'Tu punto queda más cerca de esta ancla en estos dos ejes. No significa que «seas» esta corriente: el perfil completo, las coincidencias y las diferencias se calculan aparte.'
          : 'Esta es una región educativa del atlas. Abrirla no expresa afinidad ni pertenencia.'}
      </p>
      {sensible ? (
        <p className="mapa-corriente-lectura__nota">
          Corriente sensible: la proximidad parcial nunca atribuye apoyo a violencia,
          antipluralismo, militancia o intención.
        </p>
      ) : null}

      <section className="ficha-ideologia__posicion" aria-label="Ancla visual de la corriente">
        <h4>Ancla visual en esta brújula</h4>
        <LecturaEjes ejes={ejes} valores={valores} nombreCorto={NOMBRE_LLANO_EJE} />
        <p className="mapa-corriente-lectura__nota">
          Es una posición editorial auditable tomada como prior visual; no reemplaza una
          puntuación calculada desde respuestas.
        </p>
      </section>

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
        <section>
          <h4>Encaje en Espectro y en España</h4>
          <p>{corriente.encajeEspana}</p>
          <p>
            <strong>Estado:</strong> {etiquetaEstado(corriente)} ·{' '}
            {corriente.decision === 'A' ? 'capa principal' : 'profundidad exhaustiva'}.
          </p>
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
          <InformacionIdeologia referencia={referencia} cercaDelUsuario={cercaDelUsuario} />
        ) : (
          <section>
            <h4>Límite de la comparación</h4>
            <p>
              Aún no existe una referencia con suficientes posiciones verificadas para calcular
              afinidad ítem a ítem. La corriente puede explorarse en el atlas, pero no aparecerá
              como resultado doctrinal hasta superar ese control.
            </p>
          </section>
        )}
      </div>
    </article>
  );
}
