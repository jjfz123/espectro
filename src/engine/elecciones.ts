import type { Partido } from './types.js';

export type TipoEleccion = 'generales' | 'autonomicas' | 'municipales' | 'europeas';

export interface ContextoEleccion {
  tipo: TipoEleccion;
  /** id de CCAA en minúsculas; necesario para filtrar partidos de ámbito no estatal. */
  ccaa?: string;
}

export type MotivoInclusionCandidatura =
  | 'umbral'
  | 'historica-activa'
  | 'comunista-activa';

export interface RelacionPerfilCandidatura {
  perfilId: string;
  /**
   * La relación solo identifica actores: nunca hereda posiciones entre una
   * coalición y sus componentes, ni entre una marca histórica y una sucesora.
   */
  relacion:
    | 'misma-organizacion'
    | 'organizacion-territorial'
    | 'coalicion'
    | 'componente'
    | 'sucesora';
  nota?: string;
}

export interface CandidaturaElectoral {
  id: string;
  codigoOficial?: string;
  siglas?: string;
  nombre: string;
  votos: number;
  porcentaje: number;
  escanos?: number;
  /** CCAA en las que la fuente registra votos para esta candidatura. */
  territorios?: string[];
  /** Provincias, islas u otras circunscripciones dentro de la convocatoria. */
  circunscripciones?: string[];
  /** Denominaciones distintas cuando no existió una papeleta territorial única. */
  variantesPapeleta?: Record<string, string>;
  motivoInclusion: MotivoInclusionCandidatura;
  perfilRelaciones: RelacionPerfilCandidatura[];
  nota?: string;
}

export interface ConvocatoriaElectoral {
  id: string;
  nombre: string;
  tipo: TipoEleccion;
  fecha: string;
  /** `espana` para una convocatoria estatal; si no, id normalizado de CCAA. */
  territorio: string;
  camara?: string;
  umbralPorcentaje: number;
  denominador: {
    tipo: 'votos-a-candidaturas' | 'votos-validos';
    valor: number;
  };
  totalCandidaturasOficiales: number;
  fuente: {
    titulo: string;
    url: string;
    fechaDatos?: string;
    consultado: string;
  };
  fuentesAdicionales?: Array<{
    titulo: string;
    url: string;
    fechaDatos?: string;
    consultado: string;
  }>;
  nota?: string;
  candidaturas: CandidaturaElectoral[];
}

export interface SeleccionElectoral {
  partidos: Partido[];
  /** Formaciones activas añadidas por excepción, nunca presentadas como papeleta. */
  partidosFueraConvocatoria: Partido[];
  /** Ausente cuando todavía no hay una convocatoria documentada para el contexto. */
  convocatoria?: ConvocatoriaElectoral;
  candidaturas: CandidaturaElectoral[];
  /** Candidaturas seleccionadas que ya tienen al menos un perfil comparable. */
  candidaturasConPerfil: number;
  /** Perfiles enlazados a la selección, antes de descartar inactivos o históricos. */
  perfilesEnlazados: number;
  metodo: 'convocatoria-documentada' | 'heuristica-ambito' | 'contexto-incompleto';
}

export interface PartidoPrincipalGeneral {
  partido: Partido;
  candidatura: CandidaturaElectoral;
  /** Puesto por votos dentro de la convocatoria completa, antes de descartar perfiles ausentes. */
  puestoVotos: number;
  convocatoria: ConvocatoriaElectoral;
}

function vigentes(partidos: Partido[]): Partido[] {
  return partidos.filter(
    (partido) =>
      !partido.demo && partido.actividad !== 'inactiva' && partido.actividad !== 'historica',
  );
}

function porAmbito(partidos: Partido[], ctx: ContextoEleccion): Partido[] {
  if (ctx.tipo === 'europeas') return partidos;
  if ((ctx.tipo === 'autonomicas' || ctx.tipo === 'municipales') && !ctx.ccaa) return [];
  return partidos.filter((p) => {
    if (p.ambito === 'estatal') return true;
    if (p.ambito === 'local' && ctx.tipo !== 'municipales') return false;
    if (!ctx.ccaa) return true;
    return p.ccaa?.includes(ctx.ccaa) ?? false;
  });
}

function ultimaConvocatoria(
  convocatorias: readonly ConvocatoriaElectoral[],
  ctx: ContextoEleccion,
): ConvocatoriaElectoral | undefined {
  return convocatorias
    .filter((convocatoria) => {
      if (convocatoria.tipo !== ctx.tipo) return false;
      if (ctx.tipo === 'autonomicas') {
        return Boolean(ctx.ccaa) && convocatoria.territorio === ctx.ccaa;
      }
      return convocatoria.territorio === 'espana';
    })
    .sort((a, b) => b.fecha.localeCompare(a.fecha))[0];
}

/**
 * Una coalición estatal puede enlazar perfiles de componentes territoriales que
 * solo participaron en una parte del país. Cuando las generales se consultan
 * por CCAA, esos perfiles no deben convertirse en opciones comparables fuera
 * de su territorio ni reaparecer como tales en el catálogo contextual.
 *
 * En autonómicas la misma regla actúa como defensa en profundidad: aunque el
 * universo lo fija la convocatoria (y `audit:electoral` veta en CI una
 * candidatura foránea), un perfil que declare territorio de otra comunidad
 * nunca se vuelve comparable aquí. El motor no confía en que los datos sean
 * perfectos: falla cerrado.
 *
 * Las organizaciones estatales se conservan: que sean componentes de una
 * coalición no las vuelve territoriales. Si falta el perfil enlazado, tampoco
 * inferimos un ámbito que los datos no declaran; y un perfil territorial sin
 * comunidad declarada no pasa el filtro (dato incompleto ≠ ámbito global).
 */
function relacionAplicableAlContexto(
  relacion: RelacionPerfilCandidatura,
  partidosPorId: ReadonlyMap<string, Partido>,
  ctx: ContextoEleccion,
): boolean {
  if (!ctx.ccaa || (ctx.tipo !== 'generales' && ctx.tipo !== 'autonomicas')) return true;
  const perfil = partidosPorId.get(relacion.perfilId);
  if (!perfil || perfil.ambito === 'estatal') return true;
  return perfil.ccaa?.includes(ctx.ccaa) ?? false;
}

const PRIORIDAD_RELACION_PRINCIPAL: Readonly<Record<RelacionPerfilCandidatura['relacion'], number>> = {
  'misma-organizacion': 0,
  coalicion: 1,
  'organizacion-territorial': 2,
  componente: 3,
  sucesora: 4,
};

/**
 * Devuelve las candidaturas más votadas de la última elección general que
 * tienen un perfil principal enlazado. Los componentes de una coalición no se
 * convierten aquí en candidaturas independientes: se elige antes la ficha de
 * la propia organización, coalición o marca territorial.
 */
export function partidosPrincipalesUltimasGenerales(
  partidos: Partido[],
  convocatorias: readonly ConvocatoriaElectoral[],
  limite = 7,
): PartidoPrincipalGeneral[] {
  const cantidad = Math.floor(limite);
  if (!Number.isFinite(limite) || cantidad <= 0) return [];
  const convocatoria = ultimaConvocatoria(convocatorias, { tipo: 'generales' });
  if (!convocatoria) return [];

  const partidosPorId = new Map(
    vigentes(partidos)
      .filter(
        (partido) =>
          partido.confianza !== 'sin-datos' &&
          !partido.monotematico &&
          Object.keys(partido.posiciones).length > 0,
      )
      .map((partido) => [partido.id, partido]),
  );
  const perfilesYaIncluidos = new Set<string>();
  const candidaturasPorVotos = [...convocatoria.candidaturas].sort(
    (a, b) => b.votos - a.votos || a.id.localeCompare(b.id, 'es'),
  );
  const principales: PartidoPrincipalGeneral[] = [];

  for (const [indice, candidatura] of candidaturasPorVotos.entries()) {
    const relaciones = [...candidatura.perfilRelaciones].sort(
      (a, b) =>
        PRIORIDAD_RELACION_PRINCIPAL[a.relacion] - PRIORIDAD_RELACION_PRINCIPAL[b.relacion],
    );
    const relacion = relaciones.find(
      (candidata) =>
        candidata.relacion !== 'componente' &&
        candidata.relacion !== 'sucesora' &&
        partidosPorId.has(candidata.perfilId) &&
        !perfilesYaIncluidos.has(candidata.perfilId),
    );
    if (!relacion) continue;
    const partido = partidosPorId.get(relacion.perfilId);
    if (!partido) continue;

    perfilesYaIncluidos.add(partido.id);
    principales.push({
      partido,
      candidatura,
      puestoVotos: indice + 1,
      convocatoria,
    });
    if (principales.length >= cantidad) break;
  }

  return principales;
}

/**
 * Selecciona el universo y devuelve también su procedencia. Así la interfaz
 * puede distinguir una convocatoria comprobada de una mera heurística.
 */
export function seleccionarPartidosElectorales(
  partidos: Partido[],
  convocatorias: readonly ConvocatoriaElectoral[],
  ctx: ContextoEleccion,
): SeleccionElectoral {
  const partidosVigentes = vigentes(partidos);
  if ((ctx.tipo === 'autonomicas' || ctx.tipo === 'municipales') && !ctx.ccaa) {
    return {
      partidos: [],
      partidosFueraConvocatoria: [],
      candidaturas: [],
      candidaturasConPerfil: 0,
      perfilesEnlazados: 0,
      metodo: 'contexto-incompleto',
    };
  }
  const convocatoria = ultimaConvocatoria(convocatorias, ctx);
  if (!convocatoria) {
    return {
      partidos: porAmbito(partidosVigentes, ctx),
      partidosFueraConvocatoria: [],
      candidaturas: [],
      candidaturasConPerfil: 0,
      perfilesEnlazados: 0,
      metodo: 'heuristica-ambito',
    };
  }

  const partidosPorId = new Map(partidos.map((partido) => [partido.id, partido]));
  const candidaturas = convocatoria.candidaturas
    .filter(
      (candidatura) =>
        !ctx.ccaa ||
        convocatoria.tipo !== 'generales' ||
        candidatura.territorios?.includes(ctx.ccaa),
    )
    .map((candidatura) => {
      if (!ctx.ccaa || (ctx.tipo !== 'generales' && ctx.tipo !== 'autonomicas')) {
        return candidatura;
      }
      return {
        ...candidatura,
        perfilRelaciones: candidatura.perfilRelaciones.filter((relacion) =>
          relacionAplicableAlContexto(relacion, partidosPorId, ctx),
        ),
      };
    });
  const ids = new Set(
    candidaturas.flatMap((candidatura) =>
      candidatura.perfilRelaciones.map((relacion) => relacion.perfilId),
    ),
  );
  const seleccionados = partidosVigentes.filter((partido) => ids.has(partido.id));
  const idsDisponibles = new Set(seleccionados.map((partido) => partido.id));
  const partidosFueraConvocatoria = porAmbito(partidosVigentes, ctx).filter(
    (partido) => partido.excepcionCatalogo && !ids.has(partido.id),
  );

  return {
    partidos: seleccionados,
    partidosFueraConvocatoria,
    convocatoria,
    candidaturas,
    candidaturasConPerfil: candidaturas.filter((candidatura) =>
      candidatura.perfilRelaciones.some((relacion) => idsDisponibles.has(relacion.perfilId)),
    ).length,
    perfilesEnlazados: ids.size,
    metodo: 'convocatoria-documentada',
  };
}

/**
 * Partidos que tiene sentido mostrar y rankear en una elección dada.
 *
 * Heurística de respaldo cuando aún no existe una convocatoria versionada:
 * - europeas: circunscripción única, entran todos.
 * - generales/autonomicas: estatales + autonómicos/insulares de la CCAA del usuario.
 * - municipales: además los de ámbito local de esa CCAA (sin datos de municipio
 *   el filtrado fino aún no es posible).
 *
 * La interfaz no debe llamarla «papeleta». Para contextos con resultados
 * oficiales se usa `seleccionarPartidosElectorales`. Ninguna de las dos rutas
 * toca la fórmula de afinidad ni las puntuaciones de faceta.
 */
export function partidosElegibles(partidos: Partido[], ctx: ContextoEleccion): Partido[] {
  return porAmbito(vigentes(partidos), ctx);
}
