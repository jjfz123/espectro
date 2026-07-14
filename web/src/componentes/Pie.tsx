import { FECHA_CORTE_DATOS, URL_KOFI } from '../datos';

interface Props {
  alAbrirMetodologia: () => void;
  alBorrarDatos: () => void;
}

export function Pie({ alAbrirMetodologia, alBorrarDatos }: Props) {
  return (
    <footer className="pie">
      <div className="contenedor pie-fila">
        <p>
          Espectro · sin anuncios ni rastreadores · datos con corte {FECHA_CORTE_DATOS} · tus
          respuestas no salen de tu navegador.
        </p>
        <div className="pie-enlaces">
          <button type="button" onClick={alAbrirMetodologia}>
            Metodología y privacidad
          </button>
          <a href={URL_KOFI} rel="noopener noreferrer" target="_blank">
            Apoyar el proyecto
          </a>
          <button type="button" onClick={alBorrarDatos}>
            Borrar mis datos guardados
          </button>
        </div>
      </div>
    </footer>
  );
}
