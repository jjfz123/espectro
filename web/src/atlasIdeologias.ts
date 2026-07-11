import mapaJson from '@data/mapa-ideologias.json';

export type DecisionAtlas = 'A' | 'B' | 'E';
export type EstadoAtlas = 'instrumentada' | 'informativa' | 'investigacion';
export type SensibilidadAtlas = 'normal' | 'antipluralista' | 'violenta';

export interface CoordenadasAtlas {
  x: number;
  y: number;
}

export interface CorrienteAtlas {
  id: string;
  nombre: string;
  etiquetaOriginal: string;
  familia: string;
  decision: DecisionAtlas;
  coordenadasPrior: CoordenadasAtlas;
  coordenadas: CoordenadasAtlas;
  origenCoordenadas: 'referencia-visual' | 'adaptacion-espanola' | 'sintesis-editorial';
  estado: EstadoAtlas;
  referenciaId?: string;
  definicion: string;
  encajeEspana: string;
  preguntasDiscriminantes: string[];
  sensibilidad: SensibilidadAtlas;
  desviacionJustificada?: string;
}

interface ContratoAtlas {
  version: string;
  fechaCorte: string;
  sistema: {
    ejeX: 'propiedad-mercado';
    ejeY: 'autoridad-politica';
    alcance: string;
    subdimensionesX: Record<string, string[]>;
    familiasY: Record<string, string[]>;
    familiasNucleoY: string[];
  };
  umbrales: {
    minimoCorrientes: number;
    minimoInstrumentadas: number;
    minimoFamilias: number;
    minimoPorCuadrante: number;
    minimoItemsX: number;
    minimoSubdimensionesX: number;
    minimoItemsY: number;
    minimoFamiliasY: number;
    minimoItemsNucleoY: number;
    maximaDistanciaSinJustificar: number;
    maximaDistanciaConJustificacion: number;
    maximaDistanciaMotorSinJustificar: number;
    maximaDistanciaMotorConJustificacion: number;
    maximaAreaRegionPorcentaje: number;
    maximoRadioVacio: number;
  };
  corrientes: CorrienteAtlas[];
}

/** Contrato validado en CI; la interfaz no inventa anclas ni umbrales. */
export const CONTRATO_ATLAS = mapaJson as unknown as ContratoAtlas;
export const CORRIENTES_ATLAS = CONTRATO_ATLAS.corrientes;
export const CORRIENTE_ATLAS_POR_ID: ReadonlyMap<string, CorrienteAtlas> = new Map(
  CORRIENTES_ATLAS.map((corriente) => [corriente.id, corriente]),
);

/**
 * Catálogo que puede exponerse en una capa del atlas.
 *
 * La decisión editorial A forma siempre la capa principal. La B es una capa
 * de profundidad: solo entra tras una activación expresa o en un perfil
 * exhaustivo. Las exclusiones E nunca se convierten en zonas aunque sigan en
 * el contrato para que la decisión sea auditable.
 */
export function corrientesAtlasVisibles(
  incluirProfundidad: boolean,
): readonly CorrienteAtlas[] {
  return CORRIENTES_ATLAS.filter(
    (corriente) =>
      corriente.decision === 'A' ||
      (incluirProfundidad && corriente.decision === 'B'),
  );
}

export interface EvidenciaEjeAtlas {
  items: number;
  familias: number;
  itemsNucleo: number;
  suficiente: boolean;
}

export type GradoEvidenciaBrujula = 'solida' | 'provisional' | 'insuficiente';

/**
 * Umbral de publicación cauta para partidos que aún no alcanzan el contrato
 * editorial completo. No rellena posiciones ni rebaja qué se considera una
 * coordenada sólida: únicamente permite mostrar, como punto hueco y con una
 * advertencia explícita, una media sostenida por varias preguntas y familias.
 *
 * La alternativa sería ocultar casi todo el sistema de partidos mientras se
 * completa la documentación del nuevo par de ejes. Un solo ítem nunca basta.
 */
export const UMBRAL_PROVISIONAL_BRUJULA = {
  propiedad: { minimoItems: 3, minimoFamilias: 2 },
  poder: { minimoItems: 3, minimoFamilias: 2, minimoItemsNucleo: 1 },
} as const;

/** Clasifica conjuntamente la evidencia de los dos ejes de la brújula. */
export function gradoEvidenciaBrujula(
  propiedad: EvidenciaEjeAtlas,
  poder: EvidenciaEjeAtlas,
): GradoEvidenciaBrujula {
  if (propiedad.suficiente && poder.suficiente) return 'solida';
  const propiedadProvisional =
    propiedad.items >= UMBRAL_PROVISIONAL_BRUJULA.propiedad.minimoItems &&
    propiedad.familias >= UMBRAL_PROVISIONAL_BRUJULA.propiedad.minimoFamilias;
  const poderProvisional =
    poder.items >= UMBRAL_PROVISIONAL_BRUJULA.poder.minimoItems &&
    poder.familias >= UMBRAL_PROVISIONAL_BRUJULA.poder.minimoFamilias &&
    poder.itemsNucleo >= UMBRAL_PROVISIONAL_BRUJULA.poder.minimoItemsNucleo;
  return propiedadProvisional && poderProvisional ? 'provisional' : 'insuficiente';
}

function idsPresentes(ids: Iterable<string>): Set<string> {
  return ids instanceof Set ? ids : new Set(ids);
}

/**
 * Cobertura del horizontal del atlas. Un mismo ítem cuenta una vez aunque
 * figure en más de una subdimensión; las subdimensiones sí se cuentan por
 * separado para evitar una coordenada sostenida solo por fiscalidad o por una
 * nacionalización aislada.
 */
export function evidenciaPropiedadAtlas(ids: Iterable<string>): EvidenciaEjeAtlas {
  const presentes = idsPresentes(ids);
  const grupos = Object.values(CONTRATO_ATLAS.sistema.subdimensionesX);
  const idsInstrumento = new Set(grupos.flat());
  const items = [...presentes].filter((id) => idsInstrumento.has(id)).length;
  const familias = grupos.filter((grupo) => grupo.some((id) => presentes.has(id))).length;
  return {
    items,
    familias,
    itemsNucleo: 0,
    suficiente:
      items >= CONTRATO_ATLAS.umbrales.minimoItemsX &&
      familias >= CONTRATO_ATLAS.umbrales.minimoSubdimensionesX,
  };
}

/** Cobertura de la vertical directa, con núcleo de contrapesos/libertades. */
export function evidenciaAutoridadAtlas(ids: Iterable<string>): EvidenciaEjeAtlas {
  const presentes = idsPresentes(ids);
  const grupos = Object.entries(CONTRATO_ATLAS.sistema.familiasY);
  const idsInstrumento = new Set(grupos.flatMap(([, grupo]) => grupo));
  const idsNucleo = new Set(
    CONTRATO_ATLAS.sistema.familiasNucleoY.flatMap(
      (familia) => CONTRATO_ATLAS.sistema.familiasY[familia] ?? [],
    ),
  );
  const items = [...presentes].filter((id) => idsInstrumento.has(id)).length;
  const familias = grupos.filter(([, grupo]) => grupo.some((id) => presentes.has(id))).length;
  const itemsNucleo = [...presentes].filter((id) => idsNucleo.has(id)).length;
  return {
    items,
    familias,
    itemsNucleo,
    suficiente:
      items >= CONTRATO_ATLAS.umbrales.minimoItemsY &&
      familias >= CONTRATO_ATLAS.umbrales.minimoFamiliasY &&
      itemsNucleo >= CONTRATO_ATLAS.umbrales.minimoItemsNucleoY,
  };
}

export function corrienteAtlasMasCercana(
  x: number,
  y: number,
  corrientes: readonly CorrienteAtlas[] = CORRIENTES_ATLAS,
): CorrienteAtlas | null {
  let mejor: CorrienteAtlas | null = null;
  let distanciaMejor = Infinity;
  for (const corriente of corrientes) {
    const distancia = Math.hypot(
      x - corriente.coordenadas.x,
      y - corriente.coordenadas.y,
    );
    if (distancia < distanciaMejor) {
      mejor = corriente;
      distanciaMejor = distancia;
    }
  }
  return mejor;
}
