import { useEffect, useRef } from 'react';
import type { Valor } from '@engine';
import { BarraProgreso } from '../componentes/BarraProgreso';
import { Likert } from '../componentes/Likert';
import { MODULO_POR_ID, pad2, secuenciaItems } from '../datos';
import type { Accion, Estado } from '../estado';

interface Props {
  estado: Estado;
  despachar: (accion: Accion) => void;
}

const VALORES_TECLA: Record<string, Valor> = {
  '1': -2,
  '2': -1,
  '3': 0,
  '4': 1,
  '5': 2,
};

export function Cuestionario({ estado, despachar }: Props) {
  const secuencia = secuenciaItems(estado.modulosActivos);
  const item = secuencia[estado.indice];
  const encabezadoRef = useRef<HTMLHeadingElement>(null);
  const montadoRef = useRef(false);

  const itemId = item?.id;
  const respondido = itemId !== undefined && itemId in estado.respuestas;

  useEffect(() => {
    if (montadoRef.current) {
      encabezadoRef.current?.focus({ preventScroll: true });
    } else {
      montadoRef.current = true;
    }
  }, [itemId]);

  useEffect(() => {
    if (!itemId) return;
    const alPulsar = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const destino = e.target as HTMLElement | null;
      if (destino && ['INPUT', 'SELECT', 'TEXTAREA'].includes(destino.tagName)) return;
      if (e.key in VALORES_TECLA) {
        despachar({ tipo: 'responder', itemId, valor: VALORES_TECLA[e.key] ?? 0 });
      } else if (e.key === '0') {
        despachar({ tipo: 'responder', itemId, valor: null });
      } else if (e.key === 'ArrowLeft') {
        despachar({ tipo: 'anterior' });
      } else if (e.key === 'ArrowRight' && respondido) {
        despachar({ tipo: 'siguiente' });
      } else {
        return;
      }
      e.preventDefault();
    };
    window.addEventListener('keydown', alPulsar);
    return () => window.removeEventListener('keydown', alPulsar);
  }, [itemId, respondido, despachar]);

  if (!item || !itemId) {
    return (
      <div className="contenedor">
        <p className="nota-al-margen">No hay ítems pendientes.</p>
        <button type="button" className="boton" onClick={() => despachar({ tipo: 'ir-a-portada' })}>
          Volver a la portada
        </button>
      </div>
    );
  }

  const valor = estado.respuestas[itemId];
  const importante = Boolean(estado.importantes[itemId]);
  const modulo = MODULO_POR_ID.get(item.modulo);
  const esUltimo = estado.indice === secuencia.length - 1;
  const etiquetaSiguiente = !esUltimo
    ? 'Siguiente'
    : estado.modo === 'completo' && estado.modulosActivos.length === 0
      ? 'Terminar el núcleo'
      : 'Ver resultados';

  return (
    <div className="contenedor">
      <BarraProgreso modulosActivos={estado.modulosActivos} respuestas={estado.respuestas} />
      <div className="cuestionario-meta">
        <span className="kicker">{modulo?.nombre ?? item.modulo}</span>
        <span className="numeracion">
          <strong>{pad2(estado.indice + 1)}</strong> / {pad2(secuencia.length)}
        </span>
      </div>

      <h1 className="item-texto" ref={encabezadoRef} tabIndex={-1}>
        {item.texto}
      </h1>

      <Likert
        valor={valor}
        textoItem={item.texto}
        alResponder={(v) => despachar({ tipo: 'responder', itemId, valor: v })}
      />

      <div className="importante-fila">
        <label className="importante">
          <input
            type="checkbox"
            checked={importante}
            onChange={(e) =>
              despachar({ tipo: 'marcar-importante', itemId, importante: e.target.checked })
            }
          />
          <span>Este tema me importa el doble</span>
        </label>
      </div>

      <div className="cuestionario-nav">
        <button
          type="button"
          className="boton boton--secundario"
          onClick={() => despachar({ tipo: 'anterior' })}
          disabled={estado.indice === 0}
        >
          Anterior
        </button>
        <button
          type="button"
          className="boton"
          onClick={() => despachar({ tipo: 'siguiente' })}
          disabled={!respondido}
        >
          {etiquetaSiguiente}
        </button>
      </div>

      <p className="atajos">
        Atajos de teclado: <kbd>1</kbd>–<kbd>5</kbd> escala · <kbd>0</kbd> sin opinión ·{' '}
        <kbd>←</kbd> <kbd>→</kbd> navegar
      </p>
    </div>
  );
}
