import type { ResultadoAfinidad, ResultadoFaceta, TipoEleccion } from '@engine';
import {
  compararPartidosCompartidos,
  ESQUEMA_RESULTADO_COMPARTIDO,
  type EleccionResultadoCompartido,
  type NivelResultadoCompartido,
  type ResultadoCompartidoV1,
} from './resultadoCompartido';

export type NivelPerfilCompartido = 'rapido' | 'intermedio' | 'exhaustivo';

export interface DatosParaResultadoCompartido {
  versionInstrumento: string;
  versionCatalogo: string;
  nivel: NivelPerfilCompartido;
  eleccion: TipoEleccion;
  ccaa?: string;
  respuestasAdministradas: number;
  respuestasConOpinion: number;
  facetas: readonly ResultadoFaceta[];
  afinidades: readonly ResultadoAfinidad[];
}

const NIVEL_COMPACTO: Record<NivelPerfilCompartido, NivelResultadoCompartido> = {
  rapido: 'r',
  intermedio: 'i',
  exhaustivo: 'e',
};

const ELECCION_COMPACTA: Record<TipoEleccion, EleccionResultadoCompartido> = {
  generales: 'g',
  autonomicas: 'a',
  municipales: 'm',
  europeas: 'u',
};

function limitarEntero(valor: number, minimo: number, maximo: number): number {
  return Math.max(minimo, Math.min(maximo, Math.round(valor)));
}

/**
 * Convierte resultados ya derivados en una instantánea mínima. Deliberadamente
 * no acepta respuestas, prioridades, detalles por ítem ni referencias: así no
 * pueden terminar en el enlace por una ampliación accidental de la interfaz.
 */
export function crearSnapshotResultadoCompartido(
  datos: DatosParaResultadoCompartido,
): ResultadoCompartidoV1 {
  const respuestasAdministradas = limitarEntero(datos.respuestasAdministradas, 0, 500);
  const respuestasConOpinion = limitarEntero(
    datos.respuestasConOpinion,
    0,
    respuestasAdministradas,
  );
  const facetas: ResultadoCompartidoV1['f'] = datos.facetas.map((faceta) => [
    faceta.facetaId,
    faceta.valor === null ? null : limitarEntero(faceta.valor * 10, -1_000, 1_000),
    limitarEntero(faceta.cobertura * 1_000, 0, 1_000),
    limitarEntero(faceta.itemsRespondidos, 0, 500),
    faceta.coberturaSuficiente ? 1 : 0,
  ]);

  const afinidades: ResultadoCompartidoV1['p'] = datos.afinidades
    .filter(
      (resultado) =>
        resultado.estado === 'calculable' &&
        resultado.puntuacion !== null &&
        (resultado.confianza === 'verificada' || resultado.confianza === 'estimada'),
    )
    .map((resultado) => [
      resultado.entidadId,
      limitarEntero((resultado.puntuacion ?? 0) * 10, 0, 1_000),
      limitarEntero(resultado.cobertura * 1_000, 0, 1_000),
      limitarEntero(resultado.itemsComparados, 1, 500),
      resultado.bajaCobertura ? 1 : 0,
      resultado.confianza === 'verificada' ? 'v' : 'e',
    ] as ResultadoCompartidoV1['p'][number])
    .sort(compararPartidosCompartidos)
    .slice(0, 5);

  return {
    s: ESQUEMA_RESULTADO_COMPARTIDO,
    i: datos.versionInstrumento,
    d: datos.versionCatalogo,
    l: NIVEL_COMPACTO[datos.nivel],
    e: ELECCION_COMPACTA[datos.eleccion],
    ...(datos.ccaa ? { c: datos.ccaa } : {}),
    q: [respuestasAdministradas, respuestasConOpinion],
    f: facetas,
    p: afinidades,
  };
}
