import { partidos as partidosRegistro } from '@data/brujula-partidos.json';

export type GradoBrujulaPartido =
  | 'solida'
  | 'provisional'
  | 'estimada'
  | 'orientativa'
  | 'monotematica';

export type CriterioCalibracionBrujula =
  | 'síntesis-documental'
  | 'síntesis-documental-parcial'
  | 'programa-monotemático';

export interface CalibracionBrujulaPartido {
  id: string;
  x: number;
  y: number;
  incertidumbreX: number;
  incertidumbreY: number;
  criterio: CriterioCalibracionBrujula;
  resumenX: string;
  resumenY: string;
}

type CodigoCriterio = 'D' | 'P' | 'M';
type EntradaCompacta = readonly [
  x: number,
  y: number,
  incertidumbreX: number,
  incertidumbreY: number,
  criterio: CodigoCriterio,
];

const CRITERIO_POR_CODIGO: Record<CodigoCriterio, CriterioCalibracionBrujula> = {
  D: 'síntesis-documental',
  P: 'síntesis-documental-parcial',
  M: 'programa-monotemático',
};

/**
 * Los resúmenes son una lectura estable de la coordenada, no una segunda
 * clasificación editorial duplicada en los datos. Los intervalos dejan claro
 * qué matiz verbal corresponde a cada tramo del eje.
 */
export function resumenPropiedadMercado(x: number): string {
  if (x <= -55) {
    return 'Predomina la propiedad social, pública o cooperativa y una intervención estructural sobre el capital privado.';
  }
  if (x <= -20) {
    return 'Se inclina hacia propiedad pública o social y regulación intensa, manteniendo elementos de economía mixta.';
  }
  if (x < 20) {
    return 'Ocupa una zona de economía mixta: combina propiedad privada, provisión pública y regulación según el sector.';
  }
  if (x < 55) {
    return 'Se inclina hacia propiedad privada y coordinación de mercado, con intervención pública selectiva.';
  }
  return 'Defiende con claridad la primacía de la propiedad privada y la coordinación competitiva por mercados.';
}

export function resumenPoderPolitico(y: number): string {
  if (y <= -55) {
    return 'Da prioridad fuerte a libertades, pluralismo, contrapesos y distribución del poder.';
  }
  if (y <= -20) {
    return 'Se inclina hacia pluralismo, derechos y poder distribuido, aunque acepta instituciones ejecutivas ordinarias.';
  }
  if (y < 20) {
    return 'Combina contrapesos y pluralismo con elementos de disciplina, seguridad o dirección ejecutiva.';
  }
  if (y < 55) {
    return 'Se inclina hacia orden, disciplina organizativa o concentración ejecutiva, con pluralismo todavía relevante.';
  }
  return 'Da prioridad fuerte a jerarquía, disciplina y concentración del poder político u organizativo.';
}

function normalizarCalibracion(id: string, entrada: EntradaCompacta): CalibracionBrujulaPartido {
  const [
    x,
    y,
    incertidumbreX,
    incertidumbreY,
    codigoCriterio,
  ] = entrada;
  return {
    id,
    x,
    y,
    incertidumbreX,
    incertidumbreY,
    criterio: CRITERIO_POR_CODIGO[codigoCriterio],
    resumenX: resumenPropiedadMercado(x),
    resumenY: resumenPoderPolitico(y),
  };
}

export const CALIBRACIONES_BRUJULA_PARTIDOS: readonly CalibracionBrujulaPartido[] =
  Object.entries(partidosRegistro as unknown as Record<string, EntradaCompacta>).map(([id, entrada]) =>
    normalizarCalibracion(id, entrada),
  );

export const BRUJULA_PARTIDO_POR_ID: ReadonlyMap<string, CalibracionBrujulaPartido> = new Map(
  CALIBRACIONES_BRUJULA_PARTIDOS.map((partido) => [partido.id, partido]),
);

export function nombreGradoBrujula(grado: GradoBrujulaPartido): string {
  switch (grado) {
    case 'solida':
      return 'posición sólida';
    case 'provisional':
      return 'posición provisional';
    case 'estimada':
      return 'posición estimada';
    case 'orientativa':
      return 'posición orientativa';
    case 'monotematica':
      return 'programa monotemático';
  }
}
