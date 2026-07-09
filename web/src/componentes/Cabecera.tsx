interface Props {
  alIrAPortada: () => void;
  alAbrirMetodologia: () => void;
}

export function Cabecera({ alIrAPortada, alAbrirMetodologia }: Props) {
  return (
    <header className="cabecera">
      <div className="contenedor cabecera-fila">
        <button type="button" className="marca" onClick={alIrAPortada}>
          Espectro<sup>beta</sup>
        </button>
        <nav className="cabecera-nav" aria-label="Navegación principal">
          <button type="button" onClick={alAbrirMetodologia}>
            Metodología y privacidad
          </button>
        </nav>
      </div>
    </header>
  );
}
