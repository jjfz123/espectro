import { Suspense, lazy, useEffect, useReducer, useRef, useState } from 'react';
import { Cabecera } from './componentes/Cabecera';
import { LimiteError } from './componentes/LimiteError';
import { Pie } from './componentes/Pie';
import { borrarAlmacen, cargarEstado, guardarEstado, reductor } from './estado';
import { actualizarPWA, EVENTO_ACTUALIZACION_PWA } from './pwa';
import { aplicarTema, cargarTema, guardarTema, siguienteTema, type Tema } from './tema';
import { Cuestionario } from './vistas/Cuestionario';
import { FinRapido } from './vistas/FinRapido';
import { HitoIntermedio } from './vistas/HitoIntermedio';
import { Metodologia } from './vistas/Metodologia';
import { Modulos } from './vistas/Modulos';
import { OfertaModulos } from './vistas/OfertaModulos';
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
const ResultadoCompartido = lazy(() =>
  import('./vistas/ResultadoCompartido').then((modulo) => ({
    default: modulo.ResultadoCompartido,
  })),
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

function AplicacionLocal({ omitirGuardadoInicial }: { omitirGuardadoInicial: boolean }) {
  const [estado, despachar] = useReducer(reductor, undefined, cargarEstado);
  const [verMetodologia, setVerMetodologia] = useState(false);
  const [tema, setTema] = useState<Tema>(cargarTema);
  const [almacenDisponible, setAlmacenDisponible] = useState(true);
  const [actualizacionDisponible, setActualizacionDisponible] = useState(false);
  const [actualizando, setActualizando] = useState(false);
  const omitirSiguienteGuardado = useRef(omitirGuardadoInicial);
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

  const cambiarTema = () => {
    const siguiente = siguienteTema(tema);
    setTema(siguiente);
    aplicarTema(siguiente);
    guardarTema(siguiente);
  };

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
      setTema('sistema');
      aplicarTema('sistema');
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
      case 'oferta-modulos':
        vista = <OfertaModulos estado={estado} despachar={despachar} />;
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
        tema={tema}
        alCambiarTema={cambiarTema}
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

function AplicacionCompartida({ hash, alCerrar }: { hash: string; alCerrar: () => void }) {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const frame = window.requestAnimationFrame(() => {
      mainRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <div className="app app--compartida">
      <header className="cabecera">
        <div className="contenedor cabecera-fila">
          <button type="button" className="marca" onClick={alCerrar}>
            Espectro<sup>beta</sup>
          </button>
          <nav className="cabecera-nav" aria-label="Navegación del resultado compartido">
            <button type="button" onClick={alCerrar}>
              Volver a mi test
            </button>
          </nav>
        </div>
      </header>
      <main ref={mainRef} tabIndex={-1}>
        <LimiteError
          key={hash}
          recuperacion={
            <div className="contenedor vista-recuperacion" role="alert">
              <p className="kicker">No se ha podido abrir el resultado compartido</p>
              <h1>Tu test local no se ha tocado</h1>
              <p>
                El visor ha fallado antes de leer la instantánea. Puedes cerrar el enlace sin
                modificar lo que estuviera guardado en este navegador.
              </p>
              <button type="button" className="boton" onClick={alCerrar}>
                Cerrar el enlace
              </button>
            </div>
          }
        >
          <Suspense fallback={<VistaCargando />}>
            <ResultadoCompartido hash={hash} alCerrar={alCerrar} />
          </Suspense>
        </LimiteError>
      </main>
      <footer className="pie">
        <div className="contenedor pie-fila">
          <p>
            Espectro · resultado recibido en modo de solo lectura · el enlace no acredita identidad.
          </p>
          <button type="button" className="enlace-compartido-cerrar" onClick={alCerrar}>
            Cerrar resultado compartido
          </button>
        </div>
      </footer>
    </div>
  );
}

function hashDeResultadoCompartido(): string | null {
  return window.location.hash.startsWith('#r=') ? window.location.hash : null;
}

export function App() {
  const [hashCompartido, setHashCompartido] = useState<string | null>(
    hashDeResultadoCompartido,
  );

  // El tema elegido se aplica también fuera de la sesión local (p. ej. al
  // abrir un resultado compartido) antes de que exista cualquier cabecera.
  useEffect(() => {
    aplicarTema(cargarTema());
  }, []);
  const [omitirGuardadoInicial, setOmitirGuardadoInicial] = useState(false);
  const estabaCompartiendo = useRef(hashCompartido !== null);

  useEffect(() => {
    const actualizarHash = () => {
      const siguiente = hashDeResultadoCompartido();
      if (estabaCompartiendo.current && siguiente === null) {
        setOmitirGuardadoInicial(true);
      }
      estabaCompartiendo.current = siguiente !== null;
      setHashCompartido(siguiente);
    };
    window.addEventListener('hashchange', actualizarHash);
    return () => window.removeEventListener('hashchange', actualizarHash);
  }, []);

  if (hashCompartido !== null) {
    return (
      <AplicacionCompartida
        hash={hashCompartido}
        alCerrar={() => {
          window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
          // Al volver se carga la sesión local, pero se omite su guardado inicial:
          // cerrar un snapshot no renueva la caducidad ni altera el JSON persistido.
          setOmitirGuardadoInicial(true);
          estabaCompartiendo.current = false;
          setHashCompartido(null);
        }}
      />
    );
  }

  return <AplicacionLocal omitirGuardadoInicial={omitirGuardadoInicial} />;
}
