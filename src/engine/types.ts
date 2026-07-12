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

/** Regla para mostrar una subpregunta según una respuesta anterior. */
export interface CondicionItem {
  /** id del ítem del que depende esta pregunta. */
  itemId: string;
  /** La subpregunta se muestra si la respuesta coincide con uno de estos valores. */
  valores: Valor[];
}

/**
 * Orden institucional desde el que debe interpretarse un ítem.
 * Es contexto visible para quien responde; el motor no lo puntúa.
 */
export interface MarcoReferencia {
  /** Omitir `marco` en el ítem equivale a un supuesto neutro. */
  supuesto: 'sistema-actual' | 'sociedad-deseada' | 'neutro';
  /** Aclaración breve mostrada junto a la pregunta. */
  aclaracion?: string;
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
  /** Subpregunta condicional, usada solo en recorridos de profundización. */
  condicion?: CondicionItem;
  /** Marco explícito cuando presente y horizonte deseado producirían respuestas distintas. */
  marco?: MarcoReferencia;
  /** `solo-mapa` nunca puede utilizarse para recomendar una entidad real. */
  uso?: 'normal' | 'solo-mapa';
  estado?: 'activo' | 'piloto' | 'retirado';
  notas?: string;
}

/** Entrada del glosario: definición de consenso + enlace de referencia. */
export interface Termino {
  id: string;
  termino: string;
  definicion: string;
  /**
   * Ampliación opcional en español llano: cómo funciona en la práctica,
   * datos duros y qué defiende cada lado, sin revelar jamás hacia dónde
   * puntúa la pregunta. Se muestra plegada bajo «Más detalle».
   */
  ampliacion?: string;
  url: string;
}

export interface Respuesta {
  itemId: string;
  /** null = «sin opinión»: se excluye del cálculo (distinto del 0, «neutral»). */
  valor: Valor | null;
  /**
   * Prioridad declarada por el usuario. Pesa ×2 al comparar organizaciones,
   * pero no altera su posición en el perfil ideológico personal.
   */
  importante?: boolean;
}

export interface FuenteCita {
  /** 'redes': para micropartidos sin programa, a menudo la única fuente (URL + fecha). */
  tipo: 'programa' | 'votacion' | 'declaracion' | 'autoubicacion' | 'estatutos' | 'redes' | 'otro';
  titulo?: string;
  url?: string;
  fecha?: string;
  /** Fecha ISO en que el equipo comprobó que la fuente seguía accesible. */
  consultado?: string;
  cita?: string;
}

export interface Posicion {
  valor: Valor;
  justificacion?: string;
  fuente?: FuenteCita;
  /**
   * Identidad estable del pasaje dentro de su fuente. Dos ítems apoyados por
   * el mismo párrafo deben compartirla aunque transcriban fragmentos distintos.
   */
  grupoEvidencia?: string;
  /** Calidad de la evidencia concreta, independiente de la ficha global. */
  calidadEvidencia?: 'alta' | 'media' | 'baja';
  /**
   * Un cero solo entra en coordenadas documentales cuando la fuente resuelve
   * de forma explícita la dicotomía; evita convertir silencio en moderación.
   */
  resolucionCero?: {
    tipo: 'modelo-mixto' | 'equilibrio-explicito';
    explicacion: string;
  };
  /**
   * Solo para compromisos programáticos auditables. No convierte el perfil
   * completo en un porcentaje de «cumplimiento» ni sustituye a la evidencia.
   */
  estadoCompromiso?:
    | 'cumplido'
    | 'parcial'
    | 'bloqueado'
    | 'incumplido'
    | 'no-evaluable';
}

export type Confianza = 'verificada' | 'estimada' | 'sin-datos';

/** Campos mínimos de cualquier organización que pueda compararse ítem a ítem. */
export interface PerfilAfinidad {
  id: string;
  nombre: string;
  siglas?: string;
  confianza: Confianza;
  demo?: boolean;
  web?: string;
  /**
   * Programa de uno o muy pocos puntos. Se compara como coincidencia
   * específica, nunca como porcentaje de afinidad ideológica general.
   */
  monotematico?: boolean;
  /** Control editorial de una proyección espacial que resultaría engañosa. */
  publicacionMapa?: {
    publicable: boolean;
    motivo: string;
  };
  posiciones: Record<string, Posicion>;
}

export interface Partido extends PerfilAfinidad {
  ambito: 'estatal' | 'autonomico' | 'insular' | 'local';
  /** 'coalicion' para candidaturas paraguas (Sumar, EH Bildu, Por Andalucía). */
  tipo?: 'partido' | 'coalicion';
  /** ids de los partidos que integran la coalición. */
  componentes?: string[];
  ccaa?: string[];
  registroMir?: string;
  /** Cómo se define el propio partido, con sus palabras y fuente. */
  autodescripcion?: { texto: string; fuente: FuenteCita };
  /**
   * Etiquetas analíticas externas SIEMPRE atribuidas (politología, prensa de
   * referencia), cada una con explicación llana del término y fuente. La voz
   * editorial del proyecto no etiqueta: cita a quien clasifica.
   */
  clasificacion?: Array<{ etiqueta: string; explicacion: string; fuente: FuenteCita }>;
  /** Fecha de corte documental del perfil; no equivale a fecha de un programa concreto. */
  revisado?: string;
  /** Evita presentar organizaciones históricas o doctrinales como candidaturas actuales. */
  actividad?: 'activa' | 'incierta' | 'inactiva' | 'historica';
  /**
   * Incluye una formación activa fuera del umbral ordinario sin fingir que
   * figuró en la candidatura seleccionada. Se muestra en un bloque separado.
   */
  excepcionCatalogo?: {
    motivo: 'comunista-activa' | 'historica-activa';
    justificacion: string;
    fuente: FuenteCita;
  };
  /**
   * Segunda lectura, deliberadamente separada de `posiciones`: compara el
   * programa/posición oficial con conducta, votaciones o discurso recientes.
   * Los huecos de esta capa nunca se rellenan con la capa programática.
   */
  dobleLectura?: {
    etiquetaBase: string;
    descripcionBase: string;
    contraste: {
      etiqueta: string;
      descripcion: string;
      desde?: string;
      hasta: string;
      advertencia: string;
      posiciones: Record<string, Posicion>;
    };
  };
}

export interface Sindicato extends PerfilAfinidad {
  ambito: 'estatal' | 'autonomico' | 'territorial' | 'sectorial';
  ccaa?: string[];
  sectores?: string[];
  revisado: string;
  /** Nota visible: similitud doctrinal no implica presencia en el centro ni recomendación de afiliación. */
  advertencia?: string;
  /** Dos capas de etiquetas, mismas reglas que en Partido: la voz propia no clasifica. */
  autodescripcion?: { texto: string; fuente: FuenteCita };
  clasificacion?: Array<{ etiqueta: string; explicacion: string; fuente: FuenteCita }>;
}

/** Tipo ideal doctrinal para comparar el perfil personal; nunca es candidatura. */
export interface ReferenciaDoctrinal extends PerfilAfinidad {
  tipo: 'referencia-doctrinal';
  definicion: string;
  variante?: string;
  periodo?: string;
  version: string;
  revisado: string;
  facetasDefinitorias: string[];
  sensibilidad?: 'normal' | 'antipluralista' | 'violenta';
  advertencia: string;
  fuentesMarco: FuenteCita[];
  /** Veto independiente del mapa: impide mostrar afinidad mientras la ficha está en auditoría. */
  publicacionAfinidad?: {
    publicable: boolean;
    motivo: string;
  };
  reglaPublicacion: {
    minimoItems: number;
    minimoCobertura: number;
    umbralAfinidad: number;
  };
}

export interface Eje {
  id: string;
  nombre: string;
  poloNegativo: string;
  poloPositivo: string;
  descripcion?: string;
  subEje?: boolean;
  /** Hitos explicativos sobre la escala; no fuerzan una etiqueta categórica. */
  referencias?: Array<{ valor: number; etiqueta: string }>;
}

/** Medición transparente de una faceta del perfil personal. */
export interface ResultadoFaceta {
  /** id del eje/faceta descrito en data/ejes.json. */
  facetaId: string;
  /** Posición en [-100, 100]; null si no hay ninguna respuesta con opinión. */
  valor: number | null;
  /**
   * Número de preguntas con opinión que contribuyen a la faceta (perfil del
   * usuario) o número de ítems posicionados con evidencia válida (proyección
   * documental de una entidad). Nunca cuenta grupos: para eso está
   * `gruposDocumentales`.
   */
  itemsRespondidos: number;
  /** Número de preguntas administradas que podían contribuir a la faceta. */
  itemsDisponibles: number;
  /**
   * Solo en la proyección documental de entidades: nº de grupos documentales
   * independientes que sostienen la coordenada (la unidad que decide la
   * publicabilidad).
   */
  gruposDocumentales?: number;
  /** Suma de |carga| de las preguntas respondidas. */
  cargaRespondida: number;
  /** Suma de |carga| de todas las preguntas disponibles. */
  cargaDisponible: number;
  /** Suma respuesta × carga; no incluye la prioridad `importante`. */
  numerador: number;
  /** 2 × cargaRespondida, usado para normalizar la posición. */
  denominador: number;
  /** cargaRespondida / cargaDisponible, en [0, 1]. */
  cobertura: number;
  /** Cumple simultáneamente los mínimos de preguntas y carga respondida. */
  coberturaSuficiente: boolean;
}

/**
 * Condición individual de un desbloqueo conjuntivo: o bien umbral con
 * operador, o bien horquilla min–max sobre un eje. Sin señal en el eje
 * (valor null) la condición no se cumple: nunca se asume una posición.
 */
export interface CondicionEje {
  eje: string;
  operador?: '<=' | '>=';
  umbral?: number;
  min?: number;
  max?: number;
}

export interface Desbloqueo {
  tipo: 'siempre' | 'eje' | 'eje-banda' | 'ccaa' | 'eje-o-ccaa' | 'ejes-todos' | 'manual';
  eje?: string;
  operador?: '<=' | '>=';
  umbral?: number;
  /** Para tipo "eje-banda": se desbloquea si min <= valor del eje <= max. */
  min?: number;
  max?: number;
  /** Una CCAA o varias (p. ej. un módulo compartido Euskadi–Navarra). */
  ccaa?: string | string[];
  /**
   * Para tipo "ejes-todos": TODAS las condiciones deben cumplirse a la vez.
   * Permite gatillos más finos que un solo eje: p. ej. exigir izquierda
   * económica Y señal de colectivización (propiedad-mercado) antes de ofrecer
   * corrientes-izquierda, en vez de tratar todo intervencionismo como
   * anticapitalismo.
   */
  condiciones?: CondicionEje[];
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
  valorEntidad: Valor;
  distancia: number;
  peso: number;
  justificacion?: string;
  fuente?: FuenteCita;
}

export interface ResultadoAfinidad {
  entidadId: string;
  /**
   * `calculable` cuando existe al menos un ítem comparable; `sin-datos`
   * cuando el solapamiento es cero. La ausencia de datos nunca se codifica
   * como un porcentaje: un 0 significa desacuerdo máximo real, no vacío.
   */
  estado: 'calculable' | 'sin-datos';
  /**
   * 0–100 (distancia city-block/Manhattan normalizada y ponderada), o `null`
   * cuando `estado === 'sin-datos'`. Un consumidor no debe ordenar ni pintar
   * `null` dentro de un ranking numérico: va en una sección aparte.
   */
  puntuacion: number | null;
  itemsComparados: number;
  /** Respuestas del usuario con opinión dentro del universo comparado. */
  itemsRespondidos: number;
  /** itemsComparados / itemsRespondidos: proporción del test cubierta por el partido. */
  cobertura: number;
  confianza: Confianza;
  /** true si el resultado debe mostrarse con aviso (pocos ítems comparables). */
  bajaCobertura: boolean;
  /** Evidencia ítem a ítem para la vista «por qué coincide». */
  detalle: DetalleItem[];
}

export interface ResultadoReferencia extends ResultadoAfinidad {
  /** Nº total de posiciones definitorias codificadas en la referencia. */
  itemsDefinitorios: number;
  /**
   * itemsComparados / itemsDefinitorios: cuánto del tipo ideal quedó cubierto
   * por el recorrido. Es distinta de `cobertura` (que mide sobre las
   * respuestas del usuario) y es la que gobierna la publicación.
   */
  coberturaDefinitoria: number;
  /** Supera simultáneamente mínimos de cobertura, ítems y similitud. */
  publicable: boolean;
  umbralAfinidad: number;
}
