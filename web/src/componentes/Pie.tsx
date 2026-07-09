import { URL_REPOSITORIO } from '../datos';

interface Props {
  alAbrirMetodologia: () => void;
  alBorrarDatos: () => void;
}

export function Pie({ alAbrirMetodologia, alBorrarDatos }: Props) {
  return (
    <footer className="pie">
      <div className="contenedor pie-fila">
        <p>Espectro · código abierto (AGPL-3.0) · tus respuestas no salen de tu navegador.</p>
        <div className="pie-enlaces">
          <button type="button" onClick={alAbrirMetodologia}>
            Metodología y privacidad
          </button>
          <a href={URL_REPOSITORIO} rel="noopener noreferrer" target="_blank">
            Código fuente
          </a>
          <button type="button" onClick={alBorrarDatos}>
            Borrar mis datos guardados
          </button>
        </div>
      </div>
    </footer>
  );
}
