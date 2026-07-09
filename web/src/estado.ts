/**
 * Estado de la aplicación y su persistencia.
 *
 * El progreso se guarda en localStorage —nunca sale del dispositivo— y puede
 * borrarse desde la interfaz en cualquier momento (docs/PRIVACIDAD.md).
 */
import type { Valor } from '@engine';
import type { TipoEleccion } from '@engine';
import {
  COMUNIDADES,
  ITEMS,
  ITEM_POR_ID,
  MODULO_POR_ID,
  itemVisible,
  secuenciaItems,
} from './datos';

export type Fase =
  | 'portada'
  | 'cuestionario'
  | 'fin-rapido'
  | 'modulos'
  | 'revision'
  | 'resultados';
export type Modo = 'rapido' | 'completo';

export interface Estado {
  version: 2;
  fase: Fase;
  /** '' = el usuario prefiere no indicar comunidad. */
  ccaa: string;
  eleccion: TipoEleccion;
  modo: Modo;
  /** itemId → valor; null = «sin opinión» (respondida, pero excluida del cálculo). */
  respuestas: Record<string, Valor | null>;
  /** itemId → true si el usuario marcó «me importa el doble». */
  importantes: Record<string, boolean>;
  /** Módulos de profundización confirmados (sin contar el núcleo). */
  modulosActivos: string[];
  /** Posición actual dentro de la secuencia de ítems. */
  indice: number;
  /** La pregunta actual se abrió desde la revisión final. */
  editando: boolean;
}

export const ESTADO_INICIAL: Estado = {
  version: 2,
  fase: 'portada',
  ccaa: '',
  eleccion: 'generales',
  modo: 'rapido',
  respuestas: {},
  importantes: {},
  modulosActivos: [],
  indice: 0,
  editando: false,
};

export type Accion =
  | { tipo: 'empezar'; ccaa: string; eleccion: TipoEleccion; modo: Modo }
  | { tipo: 'actualizar-contexto'; ccaa: string; eleccion: TipoEleccion }
  | { tipo: 'continuar' }
  | { tipo: 'responder'; itemId: string; valor: Valor | null }
  | { tipo: 'marcar-importante'; itemId: string; importante: boolean }
  | { tipo: 'anterior' }
  | { tipo: 'siguiente' }
  | { tipo: 'confirmar-modulos'; seleccion: string[] }
  | { tipo: 'ver-perfil-provisional' }
  | { tipo: 'continuar-exhaustivo' }
  | { tipo: 'ir-a-modulos' }
  | { tipo: 'ir-a-revision' }
  | { tipo: 'editar-respuesta'; itemId: string }
  | { tipo: 'terminar-edicion' }
  | { tipo: 'ir-a-resultados' }
  | { tipo: 'ir-a-portada' }
  | { tipo: 'reiniciar' }
  | { tipo: 'borrar-todo' };

function primerSinResponder(estado: Estado): number {
  const secuencia = secuenciaItems(estado.modulosActivos, estado.respuestas);
  const i = secuencia.findIndex((item) => !(item.id in estado.respuestas));
  return i === -1 ? Math.max(0, secuencia.length - 1) : i;
}

function todoRespondido(estado: Estado): boolean {
  return secuenciaItems(estado.modulosActivos, estado.respuestas).every(
    (item) => item.id in estado.respuestas,
  );
}

function faseTrasCompletar(estado: Estado): Fase {
  if (estado.modo === 'rapido' && estado.modulosActivos.length === 0) return 'fin-rapido';
  if (estado.modo === 'completo' && estado.modulosActivos.length === 0) return 'modulos';
  return 'resultados';
}

function limpiarCondicionalesOcultas(
  respuestas: Record<string, Valor | null>,
  importantes: Record<string, boolean>,
): void {
  let huboCambios = true;
  while (huboCambios) {
    huboCambios = false;
    for (const item of ITEMS) {
      if (!item.condicion || itemVisible(item, respuestas)) continue;
      if (item.id in respuestas) {
        delete respuestas[item.id];
        huboCambios = true;
      }
      delete importantes[item.id];
    }
  }
}

export function reductor(estado: Estado, accion: Accion): Estado {
  switch (accion.tipo) {
    case 'empezar':
      return {
        ...ESTADO_INICIAL,
        ccaa: accion.ccaa,
        eleccion: accion.eleccion,
        modo: accion.modo,
        fase: 'cuestionario',
      };

    case 'actualizar-contexto':
      return { ...estado, ccaa: accion.ccaa, eleccion: accion.eleccion };

    case 'continuar': {
      if (todoRespondido(estado)) {
        return { ...estado, fase: faseTrasCompletar(estado) };
      }
      return { ...estado, fase: 'cuestionario', indice: primerSinResponder(estado) };
    }

    case 'responder': {
      const respuestas = { ...estado.respuestas, [accion.itemId]: accion.valor };
      const importantes = { ...estado.importantes };
      limpiarCondicionalesOcultas(respuestas, importantes);
      return {
        ...estado,
        respuestas,
        importantes,
      };
    }

    case 'marcar-importante': {
      const importantes = { ...estado.importantes };
      if (accion.importante) importantes[accion.itemId] = true;
      else delete importantes[accion.itemId];
      return { ...estado, importantes };
    }

    case 'anterior':
      return estado.indice > 0 ? { ...estado, indice: estado.indice - 1 } : estado;

    case 'siguiente': {
      if (estado.editando) return { ...estado, fase: 'revision', editando: false };
      const secuencia = secuenciaItems(estado.modulosActivos, estado.respuestas);
      if (estado.indice < secuencia.length - 1) {
        return { ...estado, indice: estado.indice + 1 };
      }
      return { ...estado, fase: faseTrasCompletar(estado) };
    }

    case 'confirmar-modulos': {
      const siguiente: Estado = { ...estado, modulosActivos: accion.seleccion };
      if (todoRespondido(siguiente)) return { ...siguiente, fase: 'resultados' };
      return { ...siguiente, fase: 'cuestionario', indice: primerSinResponder(siguiente) };
    }

    case 'ver-perfil-provisional':
      return { ...estado, fase: 'resultados', editando: false };

    case 'continuar-exhaustivo':
      return { ...estado, modo: 'completo', fase: 'modulos', editando: false };

    case 'ir-a-modulos':
      return { ...estado, modo: 'completo', fase: 'modulos', editando: false };

    case 'ir-a-revision':
      return { ...estado, fase: 'revision', editando: false };

    case 'editar-respuesta': {
      const indice = secuenciaItems(estado.modulosActivos, estado.respuestas).findIndex(
        (item) => item.id === accion.itemId,
      );
      if (indice === -1) return estado;
      return { ...estado, fase: 'cuestionario', indice, editando: true };
    }

    case 'terminar-edicion':
      return { ...estado, fase: 'revision', editando: false };

    case 'ir-a-resultados':
      return { ...estado, fase: 'resultados', editando: false };

    case 'ir-a-portada':
      return { ...estado, fase: 'portada', editando: false };

    case 'reiniciar':
      return { ...ESTADO_INICIAL, ccaa: estado.ccaa, eleccion: estado.eleccion, modo: estado.modo };

    case 'borrar-todo':
      return { ...ESTADO_INICIAL };
  }
}

/* ————— Persistencia local ————— */

export const CLAVE_ALMACEN = 'espectro.v1';

const FASES: Fase[] = [
  'portada',
  'cuestionario',
  'fin-rapido',
  'modulos',
  'revision',
  'resultados',
];
const MODOS: Modo[] = ['rapido', 'completo'];
const ELECCIONES_VALIDAS: TipoEleccion[] = ['generales', 'autonomicas', 'municipales', 'europeas'];
const VALORES_VALIDOS = new Set([-2, -1, 0, 1, 2, null]);

export function cargarEstado(): Estado {
  try {
    const crudo = localStorage.getItem(CLAVE_ALMACEN);
    if (!crudo) return ESTADO_INICIAL;
    const datos = JSON.parse(crudo) as Partial<Estado>;
    const versionGuardada = (datos as { version?: unknown }).version;
    if (versionGuardada !== 1 && versionGuardada !== 2) return ESTADO_INICIAL;

    const estado: Estado = {
      ...ESTADO_INICIAL,
      fase: FASES.includes(datos.fase as Fase) ? (datos.fase as Fase) : 'portada',
      ccaa:
        typeof datos.ccaa === 'string' && COMUNIDADES.some((comunidad) => comunidad.id === datos.ccaa)
          ? datos.ccaa
          : '',
      eleccion: ELECCIONES_VALIDAS.includes(datos.eleccion as TipoEleccion)
        ? (datos.eleccion as TipoEleccion)
        : 'generales',
      modo: MODOS.includes(datos.modo as Modo) ? (datos.modo as Modo) : 'rapido',
      respuestas: {},
      importantes: {},
      modulosActivos: Array.isArray(datos.modulosActivos)
        ? [...new Set(datos.modulosActivos)].filter(
            (m): m is string =>
              typeof m === 'string' && m !== 'nucleo' && MODULO_POR_ID.has(m),
          )
        : [],
      indice: typeof datos.indice === 'number' && datos.indice >= 0 ? Math.floor(datos.indice) : 0,
      editando: datos.editando === true,
    };

    if (datos.respuestas && typeof datos.respuestas === 'object') {
      for (const [id, valor] of Object.entries(datos.respuestas)) {
        if (ITEM_POR_ID.has(id) && VALORES_VALIDOS.has(valor as Valor | null)) {
          estado.respuestas[id] = valor as Valor | null;
        }
      }
    }
    if (datos.importantes && typeof datos.importantes === 'object') {
      for (const [id, marcado] of Object.entries(datos.importantes)) {
        if (marcado === true && ITEM_POR_ID.has(id)) estado.importantes[id] = true;
      }
    }

    limpiarCondicionalesOcultas(estado.respuestas, estado.importantes);
    const secuencia = secuenciaItems(estado.modulosActivos, estado.respuestas);
    if (estado.indice >= secuencia.length) estado.indice = Math.max(0, secuencia.length - 1);
    if (estado.fase !== 'portada' && Object.keys(estado.respuestas).length === 0 && estado.fase !== 'cuestionario') {
      estado.fase = 'portada';
    }
    return estado;
  } catch {
    return ESTADO_INICIAL;
  }
}

export function guardarEstado(estado: Estado): boolean {
  try {
    localStorage.setItem(CLAVE_ALMACEN, JSON.stringify(estado));
    return true;
  } catch {
    // Sin almacenamiento disponible (modo privado restrictivo): la sesión
    // funciona igual, solo que no se conserva al recargar.
    return false;
  }
}

export function borrarAlmacen(): void {
  try {
    localStorage.removeItem(CLAVE_ALMACEN);
  } catch {
    // Nada que borrar.
  }
}
