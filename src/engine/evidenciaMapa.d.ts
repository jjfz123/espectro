import type { Item, PerfilAfinidad, Posicion } from './types.js';

export interface SistemaEvidenciaBrujula {
  ejeX: string;
  ejeY: string;
  subdimensionesX: Record<string, string[]>;
  familiasY: Record<string, string[]>;
  familiasNucleoY: string[];
}

export interface UmbralesEvidenciaBrujula {
  minimoItemsX: number;
  minimoSubdimensionesX: number;
  minimoItemsY: number;
  minimoFamiliasY: number;
  minimoItemsNucleoY: number;
}

export interface ContratoEvidenciaBrujula {
  sistema: SistemaEvidenciaBrujula;
  umbrales: UmbralesEvidenciaBrujula;
}

export interface PerfilAuditable extends PerfilAfinidad {
  actividad?: string;
}

export interface EvaluacionPosicion {
  sustentada: boolean;
  motivo: string | null;
  grupo: string | null;
}

export interface ReciboEvidencia {
  clave: string;
  url: string | null;
  localizador: string | null;
  items: string[];
  familias: string[];
  nucleo: boolean;
}

export interface EvidenciaIndependiente {
  items: number;
  grupos: number;
  familias: string[];
  itemsNucleo: number;
  gruposNucleo: number;
  recibo: ReciboEvidencia[];
  omitidos: Array<{ itemId: string; motivo: string | null }>;
}

export interface CoordenadaAuditable {
  /** Coordenada publicable, calculada por grupos documentales deduplicados. */
  valor: number | null;
  /** Diagnóstico no publicable del promedio crudo por ítems. */
  valorPorItems: number | null;
  /** Alias explícito de `valor`, conservado para recibos y auditorías. */
  valorPorGrupos: number | null;
  /** Extremo formado únicamente por grupos bandera en la misma dirección. */
  extremoSinContrapeso: boolean;
  grupos: number;
  componentes: Array<{
    grupo: string;
    items: string[];
    direccion: number;
    peso: number;
  }>;
  omitidos: Array<{ itemId: string; motivo: string | null }>;
}

export type GradoAuditoriaBrujula = 'solida' | 'provisional' | 'estimada' | 'insuficiente';

export interface EjeAuditadoBrujula extends EvidenciaIndependiente {
  valor: number | null;
  valorPorItems: number | null;
  valorPorGrupos: number | null;
  extremoSinContrapeso: boolean;
  componentes: CoordenadaAuditable['componentes'];
}

export interface ResultadoAuditoriaBrujula {
  id: string;
  nombre: string;
  actividad?: string;
  grado: GradoAuditoriaBrujula;
  x: EjeAuditadoBrujula;
  y: EjeAuditadoBrujula;
  problemas: string[];
}

export interface AuditoriaBrujula {
  resumen: {
    perfiles: number;
    solidas: number;
    provisionales: number;
    estimadas: number;
    insuficientes: number;
    extremosInsuficientes: number;
    activas: number;
  };
  resultados: ResultadoAuditoriaBrujula[];
}

export function normalizarUrl(url: unknown): string | null;
export function normalizarLocalizador(cita: unknown): string | null;
export function grupoEvidenciaDe(posicion: Posicion | undefined): string | null;
export function pasajesEquivalentes(
  a: Posicion | undefined,
  b: Posicion | undefined,
): boolean;
export function transcripcionesRelacionadas(
  a: Posicion | undefined,
  b: Posicion | undefined,
): boolean;
export function evaluarPosicion(posicion: Posicion | undefined): EvaluacionPosicion;
export function evidenciaIndependiente(
  posiciones: Record<string, Posicion>,
  grupos: Array<[string, string[]]>,
  idsNucleo?: ReadonlySet<string>,
): EvidenciaIndependiente;
export function coordenadaAuditable(
  posiciones: Record<string, Posicion>,
  ejeId: string,
  itemPorId: ReadonlyMap<string, Item>,
): CoordenadaAuditable;
export function auditarPerfilBrujula(
  perfil: PerfilAuditable,
  items: readonly Item[],
  atlas: ContratoEvidenciaBrujula,
): ResultadoAuditoriaBrujula;
export function crearAuditoriaBrujula(entrada: {
  items: readonly Item[];
  partidos: readonly PerfilAuditable[];
  atlas: ContratoEvidenciaBrujula;
}): AuditoriaBrujula;
