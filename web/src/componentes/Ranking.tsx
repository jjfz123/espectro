import type { PerfilAfinidad, ResultadoAfinidad } from '@engine';
import { formatearNumero, nombrePerfil } from '../datos';

interface Props {
  resultados: ResultadoAfinidad[];
  entidades: ReadonlyMap<string, PerfilAfinidad>;
  tipoEntidad?: 'partido' | 'sindicato' | 'organizacion';
  doblesMarcadores?: ReadonlyMap<string, DobleMarcador>;
}

export interface DobleMarcador {
  etiquetaBase: string;
  etiquetaContraste: string;
  resultadoContraste: ResultadoAfinidad;
  advertencia: string;
}

const ETIQUETA_CONFIANZA: Record<string, string> = {
  verificada: 'posición verificada',
  estimada: 'posición estimada',
  'sin-datos': 'sin datos',
};

export function Ranking({
  resultados,
  entidades,
  tipoEntidad = 'partido',
  doblesMarcadores,
}: Props) {
  const plural = tipoEntidad === 'sindicato' ? 'sindicatos' : tipoEntidad === 'partido' ? 'partidos' : 'organizaciones';
  const singular = tipoEntidad === 'sindicato' ? 'sindicato' : tipoEntidad === 'partido' ? 'partido' : 'organización';
  if (resultados.length === 0) {
    return (
      <p className="nota-al-margen">
        No hay {plural} comparables con las respuestas disponibles.
      </p>
    );
  }

  return (
    <ol className="ranking">
      {resultados.map((r, i) => {
        const entidad = entidades.get(r.entidadId);
        if (!entidad) return null;
        const calculable = r.itemsComparados > 0;
        const doble = doblesMarcadores?.get(r.entidadId);
        const contrasteCalculable = (doble?.resultadoContraste.itemsComparados ?? 0) > 0;
        return (
          <li key={r.entidadId}>
            <div className="ranking-cabecera">
              <span className="ranking-pos" aria-hidden="true">
                {i + 1}.
              </span>
              <span className="ranking-nombre">{nombrePerfil(entidad)}</span>
              <span
                className="insignia"
                title={
                  r.confianza === 'verificada'
                    ? `Posiciones con autoubicación de la organización o cita documental verificada.`
                    : 'Posiciones inferidas por el equipo y etiquetadas como estimación.'
                }
              >
                {ETIQUETA_CONFIANZA[r.confianza] ?? r.confianza}
              </span>
              {entidad.demo ? <span className="insignia insignia--acento">demo</span> : null}
              <span className="ranking-pct">
                {doble ? <small className="ranking-pct__etiqueta">{doble.etiquetaBase}</small> : null}
                {calculable ? (
                  <>
                    {formatearNumero(r.puntuacion)}
                    <small> %</small>
                  </>
                ) : (
                  <small>sin datos comparables</small>
                )}
              </span>
            </div>
            {calculable ? (
              <>
                <div className="barra" aria-hidden="true">
                  <span style={{ width: `${Math.max(0, Math.min(100, r.puntuacion))}%` }} />
                </div>
                <p className="ranking-meta">
                  Comparados {r.itemsComparados} de tus {r.itemsRespondidos} ítems con respuesta
                  {' · '}cobertura del {formatearNumero(100 * r.cobertura, 0)} %
                </p>
              </>
            ) : (
              <p className="ranking-meta">
                El {singular} no tiene posición conocida en las preguntas que has contestado.
              </p>
            )}
            {doble ? (
              <div className="marcador-contraste">
                <div className="marcador-contraste__cabecera">
                  <strong>{doble.etiquetaContraste}</strong>
                  <span>
                    {contrasteCalculable
                      ? `${formatearNumero(doble.resultadoContraste.puntuacion)} %`
                      : 'sin datos comparables'}
                  </span>
                </div>
                {contrasteCalculable ? (
                  <>
                    <div className="barra barra--contraste" aria-hidden="true">
                      <span
                        style={{
                          width: `${Math.max(
                            0,
                            Math.min(100, doble.resultadoContraste.puntuacion),
                          )}%`,
                        }}
                      />
                    </div>
                    <p className="ranking-meta">
                      {doble.resultadoContraste.itemsComparados} ítems observados · cobertura del{' '}
                      {formatearNumero(100 * doble.resultadoContraste.cobertura, 0)} %
                    </p>
                  </>
                ) : null}
                <p className="marcador-contraste__aviso">{doble.advertencia}</p>
              </div>
            ) : null}
            {calculable && r.bajaCobertura ? (
              <p className="aviso-cobertura">
                <strong>Aviso de baja cobertura:</strong> este {singular} solo tiene posición
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
