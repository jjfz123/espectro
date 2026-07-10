import { Suspense, lazy, useEffect, useReducer, useRef, useState } from 'react';
import { Cabecera } from './componentes/Cabecera';
import { Pie } from './componentes/Pie';
import { borrarAlmacen, cargarEstado, guardarEstado, reductor } from './estado';
import { Cuestionario } from './vistas/Cuestionario';
import { FinRapido } from './vistas/FinRapido';
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
    <div className="contenedor vista-cargando" role="status">
      <p className="kicker">Resultados</p>
      <p>Preparando tu perfil y tus afinidades…</p>
    </div>
  );
}

export function App() {
  const [estado, despachar] = useReducer(reductor, undefined, cargarEstado);
  const [verMetodologia, setVerMetodologia] = useState(false);
  const [almacenDisponible, setAlmacenDisponible] = useState(true);
  const omitirSiguienteGuardado = useRef(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (omitirSiguienteGuardado.current) {
      omitirSiguienteGuardado.current = false;
      return;
    }
    if (!guardarEstado(estado)) setAlmacenDisponible(false);
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
    if (estado.fase === 'fin-rapido' || estado.fase === 'modulos' || estado.fase === 'revision') {
      void cargarResultados();
    }
  }, [estado.fase]);

  const abrirMetodologia = () => setVerMetodologia(true);

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
      case 'revision':
        vista = <Revision estado={estado} despachar={despachar} />;
        break;
      case 'resultados':
        vista = <Resultados estado={estado} despachar={despachar} />;
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
        {!almacenDisponible ? (
          <div className="contenedor aviso-persistencia" role="alert">
            <strong>Esta sesión no puede guardarse.</strong> No cierres ni recargues la página si
            quieres conservar tus respuestas.
          </div>
        ) : null}
        <Suspense fallback={<VistaCargando />}>{vista}</Suspense>
      </main>
      <Pie alAbrirMetodologia={abrirMetodologia} alBorrarDatos={borrarDatos} />
    </div>
  );
}
