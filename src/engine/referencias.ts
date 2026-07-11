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
      const cobertura = itemsDefinitorios > 0 ? base.itemsComparados / itemsDefinitorios : 0;
      const publicable =
        base.itemsComparados >= referencia.reglaPublicacion.minimoItems &&
        cobertura >= referencia.reglaPublicacion.minimoCobertura &&
        base.puntuacion >= referencia.reglaPublicacion.umbralAfinidad;

      return {
        ...base,
        itemsRespondidos: itemsDefinitorios,
        cobertura: redondear(cobertura, 3),
        bajaCobertura:
          base.itemsComparados < referencia.reglaPublicacion.minimoItems ||
          cobertura < referencia.reglaPublicacion.minimoCobertura,
        itemsDefinitorios,
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
