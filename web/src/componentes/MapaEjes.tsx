import type { Eje } from '@engine';
import { formatearEje } from '../datos';
import { lecturaEje, lecturaEjeConNumero, poloCortoPartible } from '../lecturaEjes';

interface Props {
  ejes: Eje[];
  valores: Record<string, number | null>;
  titulo: string;
  nota?: string;
}

/**
 * Barras divergentes −100..+100 dibujadas en SVG. La dirección la codifica la
 * posición respecto al cero, no el color: una sola tinta basta. Junto al
 * número va siempre su lectura verbal (lecturaEjes.ts): un «−83» solo no dice
 * nada. Los ejes sin ítems respondidos se declaran «sin datos» en lugar de
 * fingir un 0.
 */
export function MapaEjes({ ejes, valores, titulo, nota }: Props) {
  return (
    <section className="mapa-grupo">
      <h3>{titulo}</h3>
      {nota ? <p className="nota-al-margen">{nota}</p> : null}
      {ejes.map((eje) => {
        const valor = valores[eje.id] ?? null;
        const conDato = typeof valor === 'number';
        const x = conDato ? (valor < 0 ? 500 + valor * 5 : 500) : 0;
        const ancho = conDato ? Math.max(Math.abs(valor) * 5, 4) : 0;
        return (
          <div key={eje.id} className="eje-fila">
            <div className="eje-cabecera">
              <span className="eje-nombre" title={eje.descripcion}>
                {eje.nombre}
              </span>
              {conDato ? (
                <span className="eje-valor" aria-label={lecturaEjeConNumero(valor, eje)}>
                  <span className="faceta-valor__frase">{lecturaEje(valor, eje)}</span>
                  <span className="faceta-valor__numero">{formatearEje(valor)}</span>
                </span>
              ) : (
                <span className="eje-valor eje-valor--vacio">sin datos</span>
              )}
            </div>
            <svg
              className="eje-svg"
              viewBox="0 0 1000 30"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <rect x="0" y="14" width="1000" height="2" fill="var(--filete)" />
              <rect x="0" y="10" width="2" height="10" fill="var(--filete)" />
              <rect x="998" y="10" width="2" height="10" fill="var(--filete)" />
              <rect x="249" y="12" width="2" height="6" fill="var(--filete)" />
              <rect x="749" y="12" width="2" height="6" fill="var(--filete)" />
              <rect x="499" y="4" width="2" height="22" fill="var(--filete-fuerte)" />
              {conDato ? <rect x={x} y="8" width={ancho} height="14" fill="var(--tinta)" /> : null}
            </svg>
            <div className="eje-polos" aria-hidden={!conDato}>
              <span data-activo={conDato && valor < 0} title={eje.poloNegativo}>
                {poloCortoPartible(eje.poloNegativo)}
              </span>
              <span data-activo={conDato && valor > 0} title={eje.poloPositivo}>
                {poloCortoPartible(eje.poloPositivo)}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
