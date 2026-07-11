import {
  HITO_INTERMEDIO_RESPUESTAS,
  contarRespuestasDeSesion,
  type Accion,
  type Estado,
} from '../estado';

interface Props {
  estado: Estado;
  despachar: (accion: Accion) => void;
  almacenDisponible: boolean;
}

export function HitoIntermedio({ estado, despachar, almacenDisponible }: Props) {
  const respondidas = contarRespuestasDeSesion(estado);

  return (
    <div className="contenedor fin-rapido" aria-labelledby="hito-intermedio-titulo">
      <p className="kicker">Hito del modo exhaustivo</p>
      <h1
        id="hito-intermedio-titulo"
        className="titular"
        style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
      >
        Has llegado a {HITO_INTERMEDIO_RESPUESTAS} respuestas
      </h1>
      <p className="entradilla" style={{ fontSize: '1.08rem' }}>
        Ya hay evidencia suficiente para una lectura bastante más profunda que la del modo rápido.
        Puedes verla ahora o seguir respondiendo sin interrumpir el recorrido exhaustivo.
      </p>

      <div className="fin-rapido-aviso" role="status" aria-live="polite">
        <strong>
          {almacenDisponible
            ? 'Tu avance está guardado en este navegador.'
            : 'Tu avance se conserva solo en memoria mientras esta pestaña siga abierta.'}
        </strong>
        <p>
          Conservaremos las {respondidas} respuestas. Si abres el perfil intermedio, quedará
          marcado como provisional y podrás volver exactamente a la primera pregunta pendiente.
          {!almacenDisponible
            ? ' No cierres ni recargues la página: el navegador ha bloqueado el almacenamiento.'
            : ''}
        </p>
      </div>

      <div className="acciones fin-rapido-acciones" aria-label="Elige cómo continuar">
        <button
          type="button"
          className="boton"
          onClick={() => despachar({ tipo: 'ver-perfil-intermedio' })}
        >
          Ver perfil con profundidad intermedia
        </button>
        <button
          type="button"
          className="boton boton--secundario"
          onClick={() => despachar({ tipo: 'seguir-exhaustivo' })}
        >
          Seguir con el exhaustivo
        </button>
      </div>
      <p className="nota-al-margen">
        Este aviso aparece una sola vez por test. Elegir cualquiera de los dos caminos no borra ni
        modifica tus respuestas.
      </p>
    </div>
  );
}
