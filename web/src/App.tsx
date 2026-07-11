import { Suspense, lazy, useEffect, useReducer, useRef, useState } from 'react';
import { Cabecera } from './componentes/Cabecera';
import { LimiteError } from './componentes/LimiteError';
import { Pie } from './componentes/Pie';
import { borrarAlmacen, cargarEstado, guardarEstado, reductor } from './estado';
import { actualizarPWA, EVENTO_ACTUALIZACION_PWA } from './pwa';
import { Cuestionario } from './vistas/Cuestionario';
import { FinRapido } from './vistas/FinRapido';
import { HitoIntermedio } from './vistas/HitoIntermedio';
import { Metodologia } from './vistas/Metodologia';
import { Modulos } from './vistas/Modulos';
import { Portada } from './vistas/Portada';
import { Revision } from './vistas/Revision';

/**
 * La vista de resultados carga aparte: arrastra los perfiles de partidos,
 * sindicatos, referencias y convocatorias, que la portada y el cuestionario
 * no necesitan.
 */
const cargarResultados = () => import('./vistas/Resultados');
const Resultados = lazy(() =>
  cargarResultados().then((modulo) => ({ default: modulo.Resultados })),
);

function VistaCargando() {
  return (
    <div className="contenedor vista-cargando vista-cargando--vista" role="status">
      <p className="kicker">Resultados</p>
      <p>Preparando tu perfil y tus afinidades…</p>
    </div>
  );
}

function VistaRecuperacion({
  alReintentar,
  alVolver,
  puedeRecargar,
}: {
  alReintentar: () => void;
  alVolver: () => void;
  puedeRecargar: boolean;
}) {
  return (
    <div className="contenedor vista-recuperacion" role="alert">
      <p className="kicker">No se ha podido abrir esta vista</p>
      <h1>{puedeRecargar ? 'Tu progreso sigue guardado' : 'No recargues esta sesión'}</h1>
      {puedeRecargar ? (
        <p>
          Puede faltar un archivo de la aplicación o haberse interrumpido una actualización. Tus
          respuestas permanecen guardadas en este navegador y no se enviará ningún diagnóstico.
        </p>
      ) : (
        <p>
          El navegador ha bloqueado el almacenamiento. Tus respuestas siguen abiertas solo en
          memoria: recargar ahora las perdería. Puedes volver a la portada sin cerrar la página.
        </p>
      )}
      <div className="acciones">
        {puedeRecargar ? (
          <button type="button" className="boton" onClick={alReintentar}>
            Recargar y reintentar
          </button>
        ) : null}
        <button type="button" className="boton boton--secundario" onClick={alVolver}>
          Volver a la portada
        </button>
      </div>
    </div>
  );
}

export function App() {
  const [estado, despachar] = useReducer(reductor, undefined, cargarEstado);
  const [verMetodologia, setVerMetodologia] = useState(false);
  const [almacenDisponible, setAlmacenDisponible] = useState(true);
  const [actualizacionDisponible, setActualizacionDisponible] = useState(false);
  const [actualizando, setActualizando] = useState(false);
  const omitirSiguienteGuardado = useRef(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (omitirSiguienteGuardado.current) {
      omitirSiguienteGuardado.current = false;
      return;
    }
    setAlmacenDisponible(guardarEstado(estado));
  }, [estado]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const frame = window.requestAnimationFrame(() => {
      mainRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [estado.fase, verMetodologia]);

  useEffect(() => {
    // Las fases previas al resultado anticipan la descarga del chunk para
    // que la transición sea inmediata.
    if (
      estado.fase === 'fin-rapido' ||
      estado.fase === 'modulos' ||
      estado.fase === 'hito-intermedio' ||
      estado.fase === 'revision'
    ) {
      void cargarResultados();
    }
  }, [estado.fase]);

  useEffect(() => {
    const avisar = () => setActualizacionDisponible(true);
    window.addEventListener(EVENTO_ACTUALIZACION_PWA, avisar);
    return () => window.removeEventListener(EVENTO_ACTUALIZACION_PWA, avisar);
  }, []);

  const abrirMetodologia = () => setVerMetodologia(true);

  /** Ninguna actualización o recuperación recarga si la sesión solo vive en memoria. */
  const guardarAntesDeRecargar = (): boolean => {
    const guardado = guardarEstado(estado);
    setAlmacenDisponible(guardado);
    return guardado;
  };

  const borrarDatos = () => {
    if (
      window.confirm(
        'Se borrarán tus respuestas y preferencias guardadas en este navegador. ¿Continuar?',
      )
    ) {
      borrarAlmacen();
      omitirSiguienteGuardado.current = true;
      despachar({ tipo: 'borrar-todo' });
      setVerMetodologia(false);
    }
  };

  let vista;
  if (verMetodologia) {
    vista = (
      <Metodologia alVolver={() => setVerMetodologia(false)} alBorrarDatos={borrarDatos} />
    );
  } else {
    switch (estado.fase) {
      case 'portada':
        vista = (
          <Portada estado={estado} despachar={despachar} alAbrirMetodologia={abrirMetodologia} />
        );
        break;
      case 'cuestionario':
        vista = <Cuestionario estado={estado} despachar={despachar} />;
        break;
      case 'fin-rapido':
        vista = <FinRapido estado={estado} despachar={despachar} />;
        break;
      case 'modulos':
        vista = <Modulos key={estado.modulosActivos.join(',')} estado={estado} despachar={despachar} />;
        break;
      case 'hito-intermedio':
        vista = (
          <HitoIntermedio
            estado={estado}
            despachar={despachar}
            almacenDisponible={almacenDisponible}
          />
        );
        break;
      case 'revision':
        vista = <Revision estado={estado} despachar={despachar} />;
        break;
      case 'resultados':
        vista = (
          <Resultados
            estado={estado}
            despachar={despachar}
            puedeRecargar={almacenDisponible}
            alConfirmarGuardado={guardarAntesDeRecargar}
          />
        );
        break;
    }
  }

  return (
    <div className="app">
      <Cabecera
        alIrAPortada={() => {
          setVerMetodologia(false);
          despachar({ tipo: 'ir-a-portada' });
        }}
        alAbrirMetodologia={abrirMetodologia}
      />
      <main ref={mainRef} tabIndex={-1}>
        {actualizacionDisponible ? (
          <div className="contenedor aviso-actualizacion" role="status" aria-live="polite">
            <div>
              <strong>Hay una versión nueva de Espectro.</strong>
              <span>
                {almacenDisponible
                  ? ' Guardaremos de nuevo tus respuestas antes de actualizar.'
                  : ' La actualización queda aplazada porque esta sesión no puede guardarse.'}
              </span>
            </div>
            <div className="aviso-actualizacion__acciones">
              <button
                type="button"
                className="boton"
                disabled={actualizando || !almacenDisponible}
                onClick={() => {
                  if (!guardarAntesDeRecargar()) return;
                  setActualizando(true);
                  void actualizarPWA().catch(() => setActualizando(false));
                }}
              >
                {actualizando ? 'Actualizando…' : 'Actualizar ahora'}
              </button>
              <button
                type="button"
                className="boton boton--terciario"
                onClick={() => setActualizacionDisponible(false)}
              >
                Más tarde
              </button>
            </div>
          </div>
        ) : null}
        {!almacenDisponible ? (
          <div className="contenedor aviso-persistencia" role="alert">
            <strong>Esta sesión no puede guardarse.</strong> No cierres ni recargues la página si
            quieres conservar tus respuestas.
          </div>
        ) : null}
        <LimiteError
          key={`${estado.fase}-${verMetodologia ? 'metodologia' : 'aplicacion'}`}
          recuperacion={
            <VistaRecuperacion
              puedeRecargar={almacenDisponible}
              alReintentar={() => {
                if (guardarAntesDeRecargar()) window.location.reload();
              }}
              alVolver={() => {
                setVerMetodologia(false);
                despachar({ tipo: 'ir-a-portada' });
              }}
            />
          }
        >
          <Suspense fallback={<VistaCargando />}>{vista}</Suspense>
        </LimiteError>
      </main>
      <Pie alAbrirMetodologia={abrirMetodologia} alBorrarDatos={borrarDatos} />
    </div>
  );
}
