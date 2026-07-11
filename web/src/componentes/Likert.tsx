import type { Valor } from '@engine';
import { ESCALA } from '../datos';

interface Props {
  /** undefined = sin responder; null = «sin opinión». */
  valor: Valor | null | undefined;
  textoItem: string;
  alResponder: (valor: Valor | null) => void;
  /** true = «muy de acuerdo» primero (orden descendente); false = orden ascendente por defecto. */
  invertida?: boolean;
}

/**
 * Escala Likert de 5 puntos más «sin opinión».
 * «Sin opinión» va aparte y con otro estilo: no es el punto neutral
 * (que sí cuenta para el cálculo), sino la ausencia de posición
 * (excluida del cálculo).
 *
 * El número visible de cada opción se deriva del valor (−2→1 … +2→5), no de
 * su posición: así el atajo de teclado 1-5 sigue señalando la misma opción
 * aunque el usuario invierta el orden de presentación.
 */
export function Likert({ valor, textoItem, alResponder, invertida = false }: Props) {
  const opciones = invertida ? [...ESCALA].slice().reverse() : ESCALA;
  return (
    <fieldset className="likert-campo">
      <legend className="solo-lectores">Tu posición: {textoItem}</legend>
      <div className="likert">
        {opciones.map((opcion) => (
          <label
            key={opcion.valor}
            className="likert-opcion"
            data-activo={valor === opcion.valor}
          >
            <input
              type="radio"
              name="respuesta-actual"
              value={opcion.valor}
              checked={valor === opcion.valor}
              onChange={() => alResponder(opcion.valor)}
            />
            <span className="likert-num" aria-hidden="true">
              {opcion.valor + 3}
            </span>
            <span>{opcion.etiqueta}</span>
          </label>
        ))}
      </div>
      <div className="sin-opinion-fila">
        <label
          className="sin-opinion"
          data-activo={valor === null}
        >
          <input
            type="radio"
            name="respuesta-actual"
            checked={valor === null}
            onChange={() => alResponder(null)}
          />
          <span>Sin opinión</span>
        </label>
        <span className="sin-opinion-nota">
          No cuenta para el cálculo; el punto neutral, sí.
        </span>
      </div>
    </fieldset>
  );
}
