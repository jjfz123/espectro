import type { Partido, ResultadoAfinidad } from '@engine';
import { formatearNumero, nombrePartido } from '../datos';

interface Props {
  resultados: ResultadoAfinidad[];
  partidos: ReadonlyMap<string, Partido>;
}

const ETIQUETA_CONFIANZA: Record<string, string> = {
  verificada: 'posición verificada',
  estimada: 'posición estimada',
  'sin-datos': 'sin datos',
};

export function Ranking({ resultados, partidos }: Props) {
  if (resultados.length === 0) {
    return (
      <p className="nota-al-margen">
        No hay partidos comparables para el ámbito electoral elegido.
      </p>
    );
  }

  return (
    <ol className="ranking">
      {resultados.map((r, i) => {
        const partido = partidos.get(r.partidoId);
        if (!partido) return null;
        return (
          <li key={r.partidoId}>
            <div className="ranking-cabecera">
              <span className="ranking-pos" aria-hidden="true">
                {i + 1}.
              </span>
              <span className="ranking-nombre">{nombrePartido(partido)}</span>
              <span
                className="insignia"
                title={
                  r.confianza === 'verificada'
                    ? 'Posiciones con autoubicación del partido o cita documental verificada.'
                    : 'Posiciones inferidas por el equipo y etiquetadas como estimación.'
                }
              >
                {ETIQUETA_CONFIANZA[r.confianza] ?? r.confianza}
              </span>
              {partido.demo ? <span className="insignia insignia--acento">demo</span> : null}
              <span className="ranking-pct">
                {formatearNumero(r.puntuacion)}
                <small> %</small>
              </span>
            </div>
            <div className="barra" aria-hidden="true">
              <span style={{ width: `${Math.max(0, Math.min(100, r.puntuacion))}%` }} />
            </div>
            <p className="ranking-meta">
              Comparados {r.itemsComparados} de tus {r.itemsRespondidos} ítems con respuesta
              {' · '}cobertura del {formatearNumero(100 * r.cobertura, 0)} %
            </p>
            {r.bajaCobertura ? (
              <p className="aviso-cobertura">
                <strong>Aviso de baja cobertura:</strong> este partido solo tiene posición
                conocida en una parte pequeña de tus respuestas. El porcentaje se muestra por
                transparencia, pero puede no ser representativo.
              </p>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
