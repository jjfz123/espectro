import { etiquetaTema, type Tema } from '../tema';

interface Props {
  alIrAPortada: () => void;
  alAbrirMetodologia: () => void;
  tema: Tema;
  alCambiarTema: () => void;
}

export function Cabecera({ alIrAPortada, alAbrirMetodologia, tema, alCambiarTema }: Props) {
  return (
    <header className="cabecera">
      <div className="contenedor cabecera-fila">
        <button type="button" className="marca" onClick={alIrAPortada}>
          Espectro<sup>beta</sup>
        </button>
        <nav className="cabecera-nav" aria-label="Navegación principal">
          <button
            type="button"
            className="tema-conmutador"
            onClick={alCambiarTema}
            aria-label={`${etiquetaTema(tema)}. Pulsa para cambiar`}
            title="Cambiar entre tema del sistema, claro y oscuro"
          >
            <span className="tema-conmutador__glifo" aria-hidden="true">
              ◐
            </span>
            <span className="tema-conmutador__texto" aria-hidden="true">
              {tema === 'sistema' ? 'sistema' : tema}
            </span>
          </button>
          <button type="button" onClick={alAbrirMetodologia}>
            Metodología y privacidad
          </button>
        </nav>
      </div>
    </header>
  );
}
