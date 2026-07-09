import { useEffect, useReducer, useState } from 'react';
import { Cabecera } from './componentes/Cabecera';
import { Pie } from './componentes/Pie';
import { borrarAlmacen, cargarEstado, guardarEstado, reductor } from './estado';
import { Cuestionario } from './vistas/Cuestionario';
import { Metodologia } from './vistas/Metodologia';
import { Modulos } from './vistas/Modulos';
import { Portada } from './vistas/Portada';
import { Resultados } from './vistas/Resultados';

export function App() {
  const [estado, despachar] = useReducer(reductor, undefined, cargarEstado);
  const [verMetodologia, setVerMetodologia] = useState(false);

  useEffect(() => {
    guardarEstado(estado);
  }, [estado]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [estado.fase, verMetodologia]);

  const abrirMetodologia = () => setVerMetodologia(true);

  const borrarDatos = () => {
    if (
      window.confirm(
        'Se borrarán tus respuestas y preferencias guardadas en este navegador. ¿Continuar?',
      )
    ) {
      borrarAlmacen();
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
      case 'modulos':
        vista = <Modulos key={estado.modulosActivos.join(',')} estado={estado} despachar={despachar} />;
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
      <main>{vista}</main>
      <Pie alAbrirMetodologia={abrirMetodologia} alBorrarDatos={borrarDatos} />
    </div>
  );
}
