import type { Valor } from '@engine';
import { ESCALA } from '../datos';

interface Props {
  /** undefined = sin responder; null = «sin opinión». */
  valor: Valor | null | undefined;
  textoItem: string;
  alResponder: (valor: Valor | null) => void;
}

/**
 * Escala Likert de 5 puntos más «sin opinión».
 * «Sin opinión» va aparte y con otro estilo: no es el punto neutral
 * (que sí cuenta para el cálculo), sino la ausencia de posición
 * (excluida del cálculo).
 */
export function Likert({ valor, textoItem, alResponder }: Props) {
  return (
    <fieldset className="likert-campo">
      <legend className="solo-lectores">Tu posición: {textoItem}</legend>
      <div className="likert">
        {ESCALA.map((opcion, i) => (
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
              {i + 1}
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
