import { ITEMS_POR_MODULO, MODULOS, itemVisible } from '../datos';
import type { Valor } from '@engine';

interface Props {
  modulosActivos: string[];
  respuestas: Record<string, Valor | null>;
}

/**
 * Progreso por módulos: un segmento por módulo activo, con anchura
 * proporcional a su número de ítems.
 */
export function BarraProgreso({ modulosActivos, respuestas }: Props) {
  const activos = new Set(modulosActivos);
  const segmentos = MODULOS.filter((m) => m.id === 'nucleo' || activos.has(m.id)).map((m) => {
    const items = (ITEMS_POR_MODULO.get(m.id) ?? []).filter((item) =>
      itemVisible(item, respuestas),
    );
    const respondidos = items.filter((i) => i.id in respuestas).length;
    return { id: m.id, total: items.length, respondidos };
  });

  const total = segmentos.reduce((s, x) => s + x.total, 0);
  const hechos = segmentos.reduce((s, x) => s + x.respondidos, 0);

  return (
    <div
      className="progreso"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={hechos}
      aria-label={`Progreso: ${hechos} de ${total} ítems respondidos`}
    >
      {segmentos.map((s, indice) => (
        <div
          key={s.id}
          className="progreso-seg"
          style={{ flexGrow: s.total }}
          title={`Bloque ${indice + 1}: ${s.respondidos} de ${s.total}`}
        >
          <span style={{ width: `${s.total > 0 ? (100 * s.respondidos) / s.total : 0}%` }} />
        </div>
      ))}
    </div>
  );
}
