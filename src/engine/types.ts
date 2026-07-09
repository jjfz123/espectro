/**
 * Tipos del motor de Espectro.
 * El motor es puro (sin dependencias ni E/S): diseñado para ejecutarse
 * íntegramente en el navegador (privacidad por diseño, ver docs/PRIVACIDAD.md).
 */

/** Escala Likert de 5 puntos. */
export type Valor = -2 | -1 | 0 | 1 | 2;

export interface CargaEje {
  /** id del eje (data/ejes.json) */
  eje: string;
  /** carga en [-1, 1]; el signo define la dirección del ítem sobre el eje */
  carga: number;
}

export interface Item {
  id: string;
  texto: string;
  modulo: string;
  /** Vacío = ítem solo-matching: discrimina entre partidos sin puntuar ejes. */
  ejes: CargaEje[];
  polaridad?: 'positiva' | 'negativa';
  tags?: string[];
  /** ids de términos del glosario que la interfaz debe explicar junto al ítem. */
  terminos?: string[];
  estado?: 'activo' | 'piloto' | 'retirado';
  notas?: string;
}

/** Entrada del glosario: definición de consenso + enlace de referencia. */
export interface Termino {
  id: string;
  termino: string;
  definicion: string;
  url: string;
}

export interface Respuesta {
  itemId: string;
  /** null = «sin opinión»: se excluye del cálculo (distinto del 0, «neutral»). */
  valor: Valor | null;
  /** true = el usuario marcó el ítem como importante (peso ×2). */
  importante?: boolean;
}

export interface FuenteCita {
  /** 'redes': para micropartidos sin programa, a menudo la única fuente (URL + fecha). */
  tipo: 'programa' | 'votacion' | 'declaracion' | 'autoubicacion' | 'estatutos' | 'redes' | 'otro';
  titulo?: string;
  url?: string;
  fecha?: string;
  cita?: string;
}

export interface Posicion {
  valor: Valor;
  justificacion?: string;
  fuente?: FuenteCita;
}

export type Confianza = 'verificada' | 'estimada' | 'sin-datos';

export interface Partido {
  id: string;
  nombre: string;
  siglas?: string;
  ambito: 'estatal' | 'autonomico' | 'insular' | 'local';
  /** 'coalicion' para candidaturas paraguas (Sumar, EH Bildu, Por Andalucía). */
  tipo?: 'partido' | 'coalicion';
  /** ids de los partidos que integran la coalición. */
  componentes?: string[];
  ccaa?: string[];
  confianza: Confianza;
  demo?: boolean;
  registroMir?: string;
  web?: string;
  posiciones: Record<string, Posicion>;
}

export interface Eje {
  id: string;
  nombre: string;
  poloNegativo: string;
  poloPositivo: string;
  descripcion?: string;
  subEje?: boolean;
}

export interface Desbloqueo {
  tipo: 'siempre' | 'eje' | 'eje-banda' | 'ccaa';
  eje?: string;
  operador?: '<=' | '>=';
  umbral?: number;
  /** Para tipo "eje-banda": se desbloquea si min <= valor del eje <= max. */
  min?: number;
  max?: number;
  /** Una CCAA o varias (p. ej. un módulo compartido Euskadi–Navarra). */
  ccaa?: string | string[];
}

export interface Modulo {
  id: string;
  nombre: string;
  descripcion?: string;
  orden?: number;
  eleccionUsuario?: boolean;
  desbloqueo: Desbloqueo;
}

export interface DetalleItem {
  itemId: string;
  valorUsuario: Valor;
  valorPartido: Valor;
  distancia: number;
  peso: number;
  justificacion?: string;
  fuente?: FuenteCita;
}

export interface ResultadoAfinidad {
  partidoId: string;
  /** 0–100 (distancia city-block/Manhattan normalizada y ponderada). */
  puntuacion: number;
  itemsComparados: number;
  itemsRespondidos: number;
  /** itemsComparados / itemsRespondidos: proporción del test cubierta por el partido. */
  cobertura: number;
  confianza: Confianza;
  /** true si el resultado debe mostrarse con aviso (pocos ítems comparables). */
  bajaCobertura: boolean;
  /** Evidencia ítem a ítem para la vista «por qué coincide». */
  detalle: DetalleItem[];
}
