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
  VERSION_INSTRUMENTO,
  itemVisible,
  secuenciaItems,
} from './datos';

export type Fase =
  | 'portada'
  | 'cuestionario'
  | 'fin-rapido'
  | 'modulos'
  | 'hito-intermedio'
  | 'revision'
  | 'resultados';
export type Modo = 'rapido' | 'completo';

export const HITO_INTERMEDIO_RESPUESTAS = 150;

export interface Estado {
  version: 3;
  /** Cambia únicamente si cambia el significado o la carga de los ítems. */
  versionInstrumento: string;
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
  /** Evita volver a interrumpir el exhaustivo después de decidir en el hito de 150. */
  hitoIntermedio150Visto: boolean;
  /** La vista de resultados se abrió expresamente desde el hito de 150. */
  perfilIntermedio: boolean;
  /**
   * Preferencia de presentación de la escala Likert. Por defecto (false) el
   * orden es ascendente —«muy en desacuerdo» primero—, que la evidencia de
   * diseño de encuestas asocia a menos sesgo de aquiescencia (poner «de
   * acuerdo» primero aumenta el asentimiento por primacía). El usuario puede
   * invertirlo; solo afecta a la presentación, nunca al valor registrado.
   */
  escalaInvertida: boolean;
}

export const ESTADO_INICIAL: Estado = {
  version: 3,
  versionInstrumento: VERSION_INSTRUMENTO,
  fase: 'portada',
  ccaa: '',
  eleccion: 'generales',
  modo: 'rapido',
  respuestas: {},
  importantes: {},
  modulosActivos: [],
  indice: 0,
  editando: false,
  hitoIntermedio150Visto: false,
  perfilIntermedio: false,
  escalaInvertida: false,
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
  | { tipo: 'ver-perfil-intermedio' }
  | { tipo: 'seguir-exhaustivo' }
  | { tipo: 'continuar-exhaustivo' }
  | { tipo: 'ir-a-modulos' }
  | { tipo: 'ir-a-revision' }
  | { tipo: 'editar-respuesta'; itemId: string }
  | { tipo: 'terminar-edicion' }
  | { tipo: 'ir-a-resultados' }
  | { tipo: 'ir-a-portada' }
  | { tipo: 'alternar-escala' }
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

/** Cuenta respuestas únicas de la secuencia activa; «sin opinión» también es una respuesta. */
export function contarRespuestasDeSesion(estado: Estado): number {
  const idsActivos = new Set(
    secuenciaItems(estado.modulosActivos, estado.respuestas).map((item) => item.id),
  );
  return Object.keys(estado.respuestas).filter((id) => idsActivos.has(id)).length;
}

function debeMostrarHitoIntermedio(estado: Estado): boolean {
  return (
    estado.modo === 'completo' &&
    !estado.hitoIntermedio150Visto &&
    contarRespuestasDeSesion(estado) >= HITO_INTERMEDIO_RESPUESTAS &&
    !todoRespondido(estado)
  );
}

function seguirCuestionario(estado: Estado): Estado {
  if (todoRespondido(estado)) {
    return {
      ...estado,
      fase: faseTrasCompletar(estado),
      editando: false,
      perfilIntermedio: false,
    };
  }
  return {
    ...estado,
    fase: 'cuestionario',
    indice: primerSinResponder(estado),
    editando: false,
    perfilIntermedio: false,
  };
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
      return seguirCuestionario(estado);
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
      if (debeMostrarHitoIntermedio(estado)) {
        return {
          ...estado,
          fase: 'hito-intermedio',
          hitoIntermedio150Visto: true,
          perfilIntermedio: false,
        };
      }
      if (estado.indice < secuencia.length - 1) {
        return { ...estado, indice: estado.indice + 1 };
      }
      return { ...estado, fase: faseTrasCompletar(estado), perfilIntermedio: false };
    }

    case 'confirmar-modulos': {
      const siguiente: Estado = {
        ...estado,
        modulosActivos: accion.seleccion,
        perfilIntermedio: false,
      };
      if (todoRespondido(siguiente)) return { ...siguiente, fase: 'resultados' };
      return { ...siguiente, fase: 'cuestionario', indice: primerSinResponder(siguiente) };
    }

    case 'ver-perfil-provisional':
      return { ...estado, fase: 'resultados', editando: false, perfilIntermedio: false };

    case 'ver-perfil-intermedio':
      return {
        ...estado,
        fase: 'resultados',
        editando: false,
        hitoIntermedio150Visto: true,
        perfilIntermedio: true,
      };

    case 'seguir-exhaustivo':
      return seguirCuestionario({ ...estado, hitoIntermedio150Visto: true });

    case 'continuar-exhaustivo':
      return {
        ...estado,
        modo: 'completo',
        fase: 'modulos',
        editando: false,
        perfilIntermedio: false,
      };

    case 'ir-a-modulos':
      return {
        ...estado,
        modo: 'completo',
        fase: 'modulos',
        editando: false,
        perfilIntermedio: false,
      };

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

    case 'alternar-escala':
      return { ...estado, escalaInvertida: !estado.escalaInvertida };

    case 'reiniciar':
      return {
        ...ESTADO_INICIAL,
        ccaa: estado.ccaa,
        eleccion: estado.eleccion,
        modo: estado.modo,
        escalaInvertida: estado.escalaInvertida,
      };

    case 'borrar-todo':
      return { ...ESTADO_INICIAL };
  }
}

/* ————— Persistencia local ————— */

export const CLAVE_ALMACEN = 'espectro.v1';
export const DIAS_CADUCIDAD = 90;
const CADUCIDAD_MS = DIAS_CADUCIDAD * 24 * 60 * 60 * 1000;

/**
 * Una sesión guardada que no puede restaurarse no se borra en silencio: se
 * aparta bajo esta clave con su motivo, y la portada muestra un aviso honesto
 * una sola vez. El payload retirado se conserva ahí hasta que el usuario lo
 * descarta (o hasta que otra sesión incompatible lo sustituye).
 */
export const CLAVE_SESION_RETIRADA = 'espectro.v1.retirada';
/** Margen para relojes desajustados antes de tratar una marca futura como inválida. */
const TOLERANCIA_RELOJ_MS = 24 * 60 * 60 * 1000;

export type MotivoRetirada =
  | 'version-app'
  | 'instrumento'
  | 'marca-temporal'
  | 'reloj-futuro'
  | 'caducada'
  | 'corrupta';

function retirarSesion(motivo: MotivoRetirada, payload: string | null): void {
  try {
    localStorage.setItem(
      CLAVE_SESION_RETIRADA,
      JSON.stringify({ motivo, retiradaEn: new Date().toISOString(), payload }),
    );
    localStorage.removeItem(CLAVE_ALMACEN);
  } catch {
    // Almacenamiento bloqueado: no hay nada persistido que retirar.
  }
}

/** Aviso pendiente de sesión retirada, si existe y es legible. */
export function avisoSesionRetirada(): { motivo: MotivoRetirada } | null {
  try {
    const crudo = localStorage.getItem(CLAVE_SESION_RETIRADA);
    if (!crudo) return null;
    const datos = JSON.parse(crudo) as { motivo?: unknown };
    const motivos: MotivoRetirada[] = [
      'version-app',
      'instrumento',
      'marca-temporal',
      'reloj-futuro',
      'caducada',
      'corrupta',
    ];
    return motivos.includes(datos.motivo as MotivoRetirada)
      ? { motivo: datos.motivo as MotivoRetirada }
      : null;
  } catch {
    return null;
  }
}

export function descartarAvisoSesionRetirada(): void {
  try {
    localStorage.removeItem(CLAVE_SESION_RETIRADA);
  } catch {
    // Nada que descartar.
  }
}

const FASES: Fase[] = [
  'portada',
  'cuestionario',
  'fin-rapido',
  'modulos',
  'hito-intermedio',
  'revision',
  'resultados',
];
const MODOS: Modo[] = ['rapido', 'completo'];
const ELECCIONES_VALIDAS: TipoEleccion[] = ['generales', 'autonomicas', 'municipales', 'europeas'];
const VALORES_VALIDOS = new Set([-2, -1, 0, 1, 2, null]);

export function cargarEstado(): Estado {
  let crudo: string | null = null;
  try {
    crudo = localStorage.getItem(CLAVE_ALMACEN);
    if (!crudo) return ESTADO_INICIAL;
    const datos = JSON.parse(crudo) as Partial<Estado> & { guardadoEn?: unknown };
    const guardadoEn =
      typeof datos.guardadoEn === 'string' ? Date.parse(datos.guardadoEn) : Number.NaN;
    // v3 → v4 solo añade cargas a ejes nuevos: no cambia ids, texto, orden,
    // escala ni significado de ninguna respuesta. Es una migración segura y
    // deliberadamente acotada; futuras versiones vuelven a ser incompatibles
    // hasta declarar su propia migración. El hash semántico de version.json
    // (validate:data) obliga a decidir conscientemente cada cambio nuevo.
    const migracionCargasV3aV4 =
      VERSION_INSTRUMENTO === '4' && datos.versionInstrumento === '3';
    const motivoRetirada: MotivoRetirada | null =
      datos.version !== 3
        ? 'version-app'
        : datos.versionInstrumento !== VERSION_INSTRUMENTO && !migracionCargasV3aV4
          ? 'instrumento'
          : !Number.isFinite(guardadoEn)
            ? 'marca-temporal'
            : guardadoEn - Date.now() > TOLERANCIA_RELOJ_MS
              ? 'reloj-futuro'
              : Date.now() - guardadoEn > CADUCIDAD_MS
                ? 'caducada'
                : null;
    if (motivoRetirada) {
      retirarSesion(motivoRetirada, crudo);
      return ESTADO_INICIAL;
    }

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
      hitoIntermedio150Visto: datos.hitoIntermedio150Visto === true,
      perfilIntermedio: datos.perfilIntermedio === true,
      escalaInvertida: datos.escalaInvertida === true,
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
    if (estado.fase === 'hito-intermedio') {
      const hitoValido =
        estado.modo === 'completo' &&
        contarRespuestasDeSesion(estado) >= HITO_INTERMEDIO_RESPUESTAS &&
        !todoRespondido(estado);
      if (hitoValido) estado.hitoIntermedio150Visto = true;
      else estado.fase = todoRespondido(estado) ? faseTrasCompletar(estado) : 'cuestionario';
    }
    if (estado.perfilIntermedio && todoRespondido(estado)) estado.perfilIntermedio = false;
    if (estado.fase !== 'portada' && Object.keys(estado.respuestas).length === 0 && estado.fase !== 'cuestionario') {
      estado.fase = 'portada';
    }
    return estado;
  } catch {
    // Payload ilegible: se aparta con su motivo en lugar de dejarlo pudrirse
    // bajo la clave principal o borrarlo sin dejar rastro.
    if (crudo !== null) retirarSesion('corrupta', crudo);
    return ESTADO_INICIAL;
  }
}

export function guardarEstado(estado: Estado): boolean {
  try {
    localStorage.setItem(
      CLAVE_ALMACEN,
      JSON.stringify({ ...estado, guardadoEn: new Date().toISOString() }),
    );
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
