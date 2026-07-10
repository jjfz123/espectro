import type { Eje } from '@engine';
import { formatearEje } from '../datos';
import { lecturaEje } from '../lecturaEjes';

interface Props {
  /** Ejes en orden de lectura. */
  ejes: Eje[];
  /** Valores por eje; null o ausente = sin datos. */
  valores: Record<string, number | null | undefined>;
  /** Nombre corto por eje para el rótulo de la fila. */
  nombreCorto: Record<string, string>;
}

/**
 * Lectura verbal por eje para los paneles de selección del mapa (2D y 3D):
 * cada fila da la banda cualitativa anclada en los polos reales del eje; el
 * número queda como dato secundario. Fuente única: lecturaEjes.ts.
 */
export function LecturaEjes({ ejes, valores, nombreCorto }: Props) {
  return (
    <ul className="lectura-ejes">
      {ejes.map((eje) => {
        const valor = valores[eje.id];
        const conDato = typeof valor === 'number';
        return (
          <li key={eje.id}>
            <span className="lectura-ejes__eje">{nombreCorto[eje.id] ?? eje.nombre}</span>
            {conDato ? (
              <>
                <span className="lectura-ejes__frase">{lecturaEje(valor, eje)}</span>
                <span className="lectura-ejes__numero">{formatearEje(valor)}</span>
              </>
            ) : (
              <span className="lectura-ejes__frase lectura-ejes__frase--vacia">sin datos</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
