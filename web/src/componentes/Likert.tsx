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
    <div>
      <div role="radiogroup" aria-label={`Tu posición: ${textoItem}`} className="likert">
        {ESCALA.map((opcion, i) => (
          <button
            key={opcion.valor}
            type="button"
            role="radio"
            aria-checked={valor === opcion.valor}
            onClick={() => alResponder(opcion.valor)}
          >
            <span className="likert-num" aria-hidden="true">
              {i + 1}
            </span>
            <span>{opcion.etiqueta}</span>
          </button>
        ))}
      </div>
      <div className="sin-opinion-fila">
        <button
          type="button"
          className="sin-opinion"
          aria-pressed={valor === null}
          onClick={() => alResponder(null)}
        >
          Sin opinión
        </button>
        <span className="sin-opinion-nota">
          No cuenta para el cálculo; el punto neutral, sí.
        </span>
      </div>
    </div>
  );
}
