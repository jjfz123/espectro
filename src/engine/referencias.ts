import { calcularAfinidad } from './matching.js';
import type {
  ReferenciaDoctrinal,
  Respuesta,
  ResultadoReferencia,
} from './types.js';

/**
 * Compara respuestas con tipos ideales doctrinales sin usar la saliencia
 * electoral. La cobertura se mide contra todas las posiciones definitorias de
 * la referencia, incluidas las que el recorrido todavía no administró.
 */
export function compararReferenciasDoctrinales(
  respuestas: Respuesta[],
  referencias: ReferenciaDoctrinal[],
): ResultadoReferencia[] {
  return referencias
    .filter(
      (referencia) =>
        referencia.confianza !== 'sin-datos' &&
        referencia.publicacionAfinidad?.publicable !== false,
    )
    .map((referencia) => {
      const idsDefinitorios = new Set(Object.keys(referencia.posiciones));
      const relevantes = respuestas
        .filter((respuesta) => idsDefinitorios.has(respuesta.itemId))
        .map((respuesta) => ({ ...respuesta, importante: false }));
      const base = calcularAfinidad(relevantes, referencia, {
        minimoItems: referencia.reglaPublicacion.minimoItems,
        umbralCobertura: referencia.reglaPublicacion.minimoCobertura,
      });
      const itemsDefinitorios = idsDefinitorios.size;
      // Cobertura sobre el tipo ideal, no sobre las respuestas del usuario.
      // Vive en su propio campo: `itemsRespondidos` y `cobertura` conservan
      // la semántica de ResultadoAfinidad y no se sobrescriben.
      const coberturaDefinitoria =
        itemsDefinitorios > 0 ? base.itemsComparados / itemsDefinitorios : 0;
      // Veto definitorio: rechazar una posición nuclear del tipo ideal (signo
      // contrario, con opinión) excluye la referencia aunque la similitud
      // media supere el umbral. Un 0 o «sin opinión» no es rechazo.
      const respuestaPorItem = new Map(
        relevantes.map((respuesta) => [respuesta.itemId, respuesta.valor]),
      );
      const definitoriasContradichas = Object.entries(referencia.posiciones).filter(
        ([itemId, posicion]) => {
          if (posicion.definitoria !== true) return false;
          if (typeof posicion.valor !== 'number' || posicion.valor === 0) return false;
          const valorUsuario = respuestaPorItem.get(itemId);
          return typeof valorUsuario === 'number' && valorUsuario * posicion.valor < 0;
        },
      ).length;
      const publicable =
        base.estado === 'calculable' &&
        base.itemsComparados >= referencia.reglaPublicacion.minimoItems &&
        coberturaDefinitoria >= referencia.reglaPublicacion.minimoCobertura &&
        definitoriasContradichas === 0 &&
        (base.puntuacion ?? 0) >= referencia.reglaPublicacion.umbralAfinidad;

      return {
        ...base,
        bajaCobertura:
          base.itemsComparados < referencia.reglaPublicacion.minimoItems ||
          coberturaDefinitoria < referencia.reglaPublicacion.minimoCobertura,
        itemsDefinitorios,
        coberturaDefinitoria: redondear(coberturaDefinitoria, 3),
        definitoriasContradichas,
        publicable,
        umbralAfinidad: referencia.reglaPublicacion.umbralAfinidad,
      };
    })
    .sort((a, b) => {
      const referenciaA = referencias.find((referencia) => referencia.id === a.entidadId);
      const referenciaB = referencias.find((referencia) => referencia.id === b.entidadId);
      return (referenciaA?.nombre ?? '').localeCompare(referenciaB?.nombre ?? '', 'es');
    });
}

function redondear(valor: number, decimales: number): number {
  const factor = 10 ** decimales;
  return Math.round(valor * factor) / factor;
}
