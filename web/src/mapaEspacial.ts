/**
 * Proyección de partidos y referencias doctrinales al espacio de tres ejes
 * (Economía × Sociedad × Territorio) y a la vertical compuesta de poder de
 * la primera brújula, para los mapas 2D/3D de resultados.
 *
 * Las entidades se miden con el MISMO instrumento que el usuario: sus
 * posiciones documentadas ({itemId: {valor}}) se convierten a Respuesta[] y
 * pasan por calcularFacetas contra el banco completo de ítems.
 *
 * Inclusión POR PLANO: una entidad se dibuja en cada plano cuyo par de ejes
 * tenga evidencia suficiente (umbral de entidades del motor). Una referencia
 * honesta cuyos textos no hablan del eje territorial (Bad Godesberg) aparece
 * en Economía × Sociedad y no en los pares territoriales; el cubo 3D exige
 * los tres macroejes. La brújula Propiedad/mercado × Poder exige tres anclas
 * de propiedad/coordinación y evidencia repartida entre al menos dos facetas
 * de su vertical. Sin un par publicable,
 * la entidad queda fuera con su evidencia explicada. Nunca se inventan posiciones.
 *
 * Vive junto a datosResultados.ts: solo lo descarga el chunk de resultados.
 */
import {
  auditarPerfilBrujula,
  EJE_AUTORIDAD_POLITICA,
  EJE_PROPIEDAD_MERCADO,
  EJES_ESPACIO,
  proyectarPartidoEnEspacio,
  proyectarEnEspacio,
} from '@engine';
import type { Eje, PerfilAfinidad, ResultadoFaceta } from '@engine';
import type { CoordenadaAuditable } from '@engine';
import { EJES, ITEMS, nombrePerfil } from './datos';
import { PARTIDOS } from './datosOrganizaciones';
import { REFERENCIAS } from './datosReferencias';
import { NOMBRE_LLANO_EJE } from './lecturaEjes';
import {
  CONTRATO_ATLAS,
  evidenciaAutoridadAtlas,
  evidenciaPropiedadAtlas,
  gradoEvidenciaBrujula,
} from './atlasIdeologias';
import type { EvidenciaEjeAtlas, GradoEvidenciaBrujula } from './atlasIdeologias';

export type TipoEntidadMapa = 'partido' | 'referencia';

export interface EntidadMapa {
  id: string;
  nombre: string;
  /** Rótulo corto para el plano (siglas si existen). */
  etiqueta: string;
  tipo: TipoEntidadMapa;
  /** Posición por eje en [-100, 100], solo ejes con evidencia suficiente. */
  valores: Record<string, number>;
  /** Ids de los ejes cuya evidencia supera el umbral de entidades. */
  ejesSuficientes: string[];
  /** Evidencia por eje para tooltips y auditoría. */
  facetas: ResultadoFaceta[];
  /**
   * Calidad específica del par Propiedad × Poder. «Provisional» conserva la
   * media observada, pero obliga a dibujar el punto hueco y a advertir que la
   * documentación todavía no supera el contrato completo.
   */
  evidenciaBrujula?: {
    grado: Exclude<GradoEvidenciaBrujula, 'insuficiente'>;
    propiedad: EvidenciaEjeAtlas;
    poder: EvidenciaEjeAtlas;
  };
}

export interface EntidadExcluida {
  id: string;
  nombre: string;
  tipo: TipoEntidadMapa;
  /** Un motivo legible por cada eje sin evidencia suficiente. */
  motivos: string[];
}

/** Los tres macro-ejes del mapa, en el orden de data/ejes.json. */
export const EJES_MAPA: Eje[] = EJES.filter((eje) =>
  (EJES_ESPACIO as readonly string[]).includes(eje.id),
);

/** Horizontal de la brújula: propiedad/coordinación, separado de fiscalidad. */
export const EJE_ECONOMIA_BRUJULA: Eje =
  EJES.find((eje) => eje.id === EJE_PROPIEDAD_MERCADO) ?? {
    id: EJE_PROPIEDAD_MERCADO,
    nombre: 'Propiedad y coordinación económica',
    poloNegativo: 'Propiedad social, pública o cooperativa',
    poloPositivo: 'Propiedad privada y coordinación por mercados',
  };

/** Vertical directa de la brújula; nunca se sustituye por GAL–TAN cultural. */
export const EJE_PODER_BRUJULA: Eje =
  EJES.find((eje) => eje.id === EJE_AUTORIDAD_POLITICA) ?? {
    id: EJE_AUTORIDAD_POLITICA,
    nombre: 'Poder político y libertades',
    poloNegativo: 'Libertades, pluralismo y poder distribuido',
    poloPositivo: 'Jerarquía, coerción y poder concentrado',
  };

/** Nombre corto de eje para rótulos: el llano de la interfaz (lecturaEjes). */
export const NOMBRE_CORTO_EJE: Record<string, string> = {
  ...NOMBRE_LLANO_EJE,
  [EJE_AUTORIDAD_POLITICA]: 'Poder',
  [EJE_PROPIEDAD_MERCADO]: 'Propiedad y mercado',
};

function motivoDeFaceta(
  faceta: ResultadoFaceta,
  evidenciaDocumental = false,
  recibo?: CoordenadaAuditable,
): string {
  const nombre = NOMBRE_CORTO_EJE[faceta.facetaId] ?? faceta.facetaId;
  const cobertura = Math.round(faceta.cobertura * 100);
  if (evidenciaDocumental) {
    if (recibo?.extremoSinContrapeso) {
      return `${nombre}: la evidencia disponible forma un extremo sin grupo moderador o contradictorio independiente; se oculta antes que publicar una posición bandera`;
    }
    return `${nombre}: ${faceta.itemsRespondidos} grupos documentales independientes (cobertura de carga ${cobertura} %)`;
  }
  return `${nombre}: ${faceta.itemsRespondidos} de ${faceta.itemsDisponibles} ítems del eje documentados (cobertura ${cobertura} %)`;
}

function clasificar(
  perfiles: PerfilAfinidad[],
  tipo: TipoEntidadMapa,
  dentro: EntidadMapa[],
  fuera: EntidadExcluida[],
): void {
  for (const perfil of perfiles) {
    if (perfil.publicacionMapa?.publicable === false) {
      fuera.push({
        id: perfil.id,
        nombre: nombrePerfil(perfil),
        tipo,
        motivos: [perfil.publicacionMapa.motivo],
      });
      continue;
    }
    const proyectarPerfil = tipo === 'partido'
      ? proyectarPartidoEnEspacio
      : proyectarEnEspacio;
    const proyeccion = proyectarPerfil(perfil, ITEMS, EJES_MAPA);
    const proyeccionPropiedad = proyectarPerfil(
      perfil,
      ITEMS,
      [EJE_ECONOMIA_BRUJULA],
      { minimoItems: 1, umbralCobertura: 0 },
    );
    const proyeccionPoder = proyectarPerfil(
      perfil,
      ITEMS,
      [EJE_PODER_BRUJULA],
      { minimoItems: 1, umbralCobertura: 0 },
    );
    const idsPosicionados = Object.keys(perfil.posiciones);
    const auditoriaPartido =
      tipo === 'partido' ? auditarPerfilBrujula(perfil, ITEMS, CONTRATO_ATLAS) : null;
    const evidenciaPropiedad = auditoriaPartido
      ? {
          items: auditoriaPartido.x.grupos,
          familias: auditoriaPartido.x.familias.length,
          itemsNucleo: 0,
          suficiente:
            auditoriaPartido.x.grupos >= CONTRATO_ATLAS.umbrales.minimoItemsX &&
            auditoriaPartido.x.familias.length >=
              CONTRATO_ATLAS.umbrales.minimoSubdimensionesX &&
            !auditoriaPartido.x.extremoSinContrapeso,
        }
      : evidenciaPropiedadAtlas(idsPosicionados);
    const evidenciaPoder = auditoriaPartido
      ? {
          items: auditoriaPartido.y.grupos,
          familias: auditoriaPartido.y.familias.length,
          itemsNucleo: auditoriaPartido.y.gruposNucleo,
          suficiente:
            auditoriaPartido.y.grupos >= CONTRATO_ATLAS.umbrales.minimoItemsY &&
            auditoriaPartido.y.familias.length >=
              CONTRATO_ATLAS.umbrales.minimoFamiliasY &&
            auditoriaPartido.y.gruposNucleo >=
              CONTRATO_ATLAS.umbrales.minimoItemsNucleoY &&
            !auditoriaPartido.y.extremoSinContrapeso,
        }
      : evidenciaAutoridadAtlas(idsPosicionados);
    const gradoCalculado = auditoriaPartido?.grado ??
      gradoEvidenciaBrujula(evidenciaPropiedad, evidenciaPoder);
    /* La capa educativa del atlas sustituye los rombos doctrinales en esta
       brújula. El tier provisional solo evita ocultar partidos mientras se
       amplía su ficha; nunca rescata referencias para después omitirlas en el
       render, porque quedarían fuera tanto del plano como de EXCLUIDAS_MAPA. */
    const gradoBrujula: GradoEvidenciaBrujula =
      tipo === 'partido'
        ? gradoCalculado
        : evidenciaPropiedad.suficiente && evidenciaPoder.suficiente
          ? 'solida'
          : 'insuficiente';
    const insuficientes = new Set(proyeccion.ejesInsuficientes);
    const suficientes = proyeccion.facetas.filter(
      (faceta) => !insuficientes.has(faceta.facetaId) && typeof faceta.valor === 'number',
    );
    const valores: Record<string, number> = {};
    for (const faceta of suficientes) valores[faceta.facetaId] = faceta.valor as number;
    const propiedad = proyeccionPropiedad.facetas[0];
    const autoridad = proyeccionPoder.facetas[0];
    const valorPropiedad = auditoriaPartido?.x.valor ?? propiedad?.valor;
    const valorPoder = auditoriaPartido?.y.valor ?? autoridad?.valor;
    if (gradoBrujula !== 'insuficiente' && typeof valorPropiedad === 'number') {
      valores[EJE_PROPIEDAD_MERCADO] = valorPropiedad;
    }
    if (gradoBrujula !== 'insuficiente' && typeof valorPoder === 'number') {
      valores[EJE_AUTORIDAD_POLITICA] = valorPoder;
    }
    const paresDibujables: ReadonlyArray<readonly [string, string]> = [
      ['economico', 'social'],
      ['economico', 'territorial'],
      ['social', 'territorial'],
      ...(tipo === 'partido'
        ? ([[EJE_PROPIEDAD_MERCADO, EJE_AUTORIDAD_POLITICA]] as const)
        : []),
    ];
    if (paresDibujables.some(([x, y]) => typeof valores[x] === 'number' && typeof valores[y] === 'number')) {
      dentro.push({
        id: perfil.id,
        nombre: nombrePerfil(perfil),
        etiqueta: perfil.siglas ?? perfil.nombre,
        tipo,
        valores,
        ejesSuficientes: Object.keys(valores),
        facetas: [
          ...proyeccion.facetas,
          ...(propiedad
            ? [{
                ...propiedad,
                valor: valorPropiedad ?? null,
                coberturaSuficiente: evidenciaPropiedad.suficiente,
              }]
            : []),
          ...(autoridad
            ? [{
                ...autoridad,
                valor: valorPoder ?? null,
                coberturaSuficiente: evidenciaPoder.suficiente,
              }]
            : []),
        ],
        evidenciaBrujula:
          gradoBrujula === 'insuficiente'
            ? undefined
            : {
                grado: gradoBrujula,
                propiedad: evidenciaPropiedad,
                poder: evidenciaPoder,
              },
      });
    } else {
      fuera.push({
        id: perfil.id,
        nombre: nombrePerfil(perfil),
        tipo,
        motivos: (proyeccion.bloqueosPerfil ?? [])
          .concat(proyeccion.facetas
          .filter((faceta) => insuficientes.has(faceta.facetaId))
          .map((faceta) =>
            motivoDeFaceta(
              faceta,
              tipo === 'partido',
              proyeccion.evidenciaDocumental?.[faceta.facetaId],
            ),
          )
          )
          .concat(
            evidenciaPropiedad.suficiente
              ? []
              : [
                  `Propiedad y mercado: ${evidenciaPropiedad.items} ${auditoriaPartido ? 'grupos independientes' : 'ítems'} en ${evidenciaPropiedad.familias} subdimensiones; el contrato exige más cobertura`,
                ],
          )
          .concat(
            evidenciaPoder.suficiente
              ? []
              : [
                  `Poder: ${evidenciaPoder.items} ${auditoriaPartido ? 'grupos independientes' : 'ítems'} en ${evidenciaPoder.familias} familias (${evidenciaPoder.itemsNucleo} de contrapesos/libertades); evidencia insuficiente`,
                ],
          )
          .concat(
            auditoriaPartido?.problemas.includes(
              'extremo sin evidencia moderadora o contradictoria independiente',
            )
              ? ['La brújula omite el extremo hasta documentar una posición moderadora o contradictoria independiente.']
              : [],
          ),
      });
    }
  }
}

const dentro: EntidadMapa[] = [];
const fuera: EntidadExcluida[] = [];
clasificar(PARTIDOS, 'partido', dentro, fuera);
clasificar(REFERENCIAS, 'referencia', dentro, fuera);

/** Entidades dibujables en al menos un plano (≥2 ejes con evidencia). */
export const ENTIDADES_MAPA: EntidadMapa[] = dentro;

/** Entidades con los tres ejes suficientes: las únicas que entran al cubo 3D. */
export const ENTIDADES_CUBO: EntidadMapa[] = dentro.filter(
  (entidad) => EJES_MAPA.every((eje) => entidad.ejesSuficientes.includes(eje.id)),
);

/** Entidades fuera de todo plano, con el detalle de la evidencia que les falta. */
export const EXCLUIDAS_MAPA: EntidadExcluida[] = fuera;

export const TOTAL_PARTIDOS_CATALOGO = PARTIDOS.length;
export const TOTAL_REFERENCIAS_CATALOGO = REFERENCIAS.length;
