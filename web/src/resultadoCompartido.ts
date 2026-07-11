/**
 * Instantánea política derivada para compartir. Nunca contiene respuestas,
 * prioridades, justificaciones, fuentes ni texto introducido por una persona.
 * El fragmento no se envía al servidor, pero quien posea el enlace sí puede
 * leerlo: la interfaz debe explicarlo antes de copiar o compartir.
 */
export const ESQUEMA_RESULTADO_COMPARTIDO = 1 as const;
export const MAX_CARGA_RESULTADO_COMPARTIDO = 4_096;
export const OBJETIVO_ENLACE_RESULTADO = 1_800;

export type NivelResultadoCompartido = 'r' | 'i' | 'e';
export type EleccionResultadoCompartido = 'g' | 'a' | 'm' | 'u';
export type ConfianzaResultadoCompartido = 'v' | 'e';

/** [ejeId, valor×10, cobertura×1000, nº ítems, suficiente 0/1]. */
export type FacetaCompartida = [string, number | null, number, number, 0 | 1];
/** [partidoId, afinidad×10, cobertura×1000, nº ítems, baja 0/1, confianza]. */
export type PartidoCompartido = [
  string,
  number,
  number,
  number,
  0 | 1,
  ConfianzaResultadoCompartido,
];

export interface ResultadoCompartidoV1 {
  s: typeof ESQUEMA_RESULTADO_COMPARTIDO;
  /** Versión semántica del instrumento. */
  i: string;
  /** Versión/hash del catálogo con el que se calculó el snapshot. */
  d: string;
  /** rápido / intermedio / exhaustivo. */
  l: NivelResultadoCompartido;
  /** generales / autonómicas / municipales / europeas. */
  e: EleccionResultadoCompartido;
  /** CCAA normalizada; se omite si la persona no la indicó. */
  c?: string;
  /** [respuestas administradas, respuestas con opinión]. */
  q: [number, number];
  f: FacetaCompartida[];
  /** Top cinco canónico ya ordenado por afinidad visible. */
  p: PartidoCompartido[];
}

export interface ListasPermitidasResultado {
  ejes?: ReadonlySet<string>;
  partidos?: ReadonlySet<string>;
  comunidades?: ReadonlySet<string>;
}

export type LecturaResultadoCompartido =
  | { estado: 'ausente' }
  | { estado: 'invalido' }
  | { estado: 'valido'; resultado: ResultadoCompartidoV1 };

const ID = /^[a-z0-9][a-z0-9-]{0,63}$/;
const VERSION = /^[0-9]{1,4}$/;
const CATALOGO = /^[A-Za-z0-9][A-Za-z0-9._-]{0,39}$/;
const NIVELES = new Set<NivelResultadoCompartido>(['r', 'i', 'e']);
const ELECCIONES = new Set<EleccionResultadoCompartido>(['g', 'a', 'm', 'u']);
const CONFIANZAS = new Set<ConfianzaResultadoCompartido>(['v', 'e']);

function enteroEn(valor: unknown, minimo: number, maximo: number): valor is number {
  return Number.isInteger(valor) && (valor as number) >= minimo && (valor as number) <= maximo;
}

function clavesExactas(
  valor: Record<string, unknown>,
  obligatorias: readonly string[],
  opcionales: readonly string[] = [],
): boolean {
  const permitidas = new Set([...obligatorias, ...opcionales]);
  return (
    obligatorias.every((clave) => Object.hasOwn(valor, clave)) &&
    Object.keys(valor).every((clave) => permitidas.has(clave))
  );
}

function idPermitido(id: unknown, permitidos?: ReadonlySet<string>): id is string {
  return typeof id === 'string' && ID.test(id) && (!permitidos || permitidos.has(id));
}

function esFaceta(
  valor: unknown,
  permitidos?: ReadonlySet<string>,
): valor is FacetaCompartida {
  return (
    Array.isArray(valor) &&
    valor.length === 5 &&
    idPermitido(valor[0], permitidos) &&
    (valor[1] === null || enteroEn(valor[1], -1_000, 1_000)) &&
    enteroEn(valor[2], 0, 1_000) &&
    enteroEn(valor[3], 0, 500) &&
    (valor[4] === 0 || valor[4] === 1)
  );
}

function esPartido(
  valor: unknown,
  permitidos?: ReadonlySet<string>,
): valor is PartidoCompartido {
  return (
    Array.isArray(valor) &&
    valor.length === 6 &&
    idPermitido(valor[0], permitidos) &&
    enteroEn(valor[1], 0, 1_000) &&
    enteroEn(valor[2], 0, 1_000) &&
    enteroEn(valor[3], 1, 500) &&
    (valor[4] === 0 || valor[4] === 1) &&
    CONFIANZAS.has(valor[5] as ConfianzaResultadoCompartido)
  );
}

function sinDuplicados(valores: readonly (readonly unknown[])[]): boolean {
  const ids = valores.map((valor) => valor[0]);
  return new Set(ids).size === ids.length;
}

/**
 * Desempate canónico del ranking visible. La afinidad manda siempre; a igual
 * porcentaje se prefiere una estimación sin aviso de baja cobertura y, solo
 * después, mayor base comparada. Lo usan tanto el snapshot como el codec para
 * que compartir un resultado nunca cambie sus puestos empatados.
 */
export function compararPartidosCompartidos(
  a: PartidoCompartido,
  b: PartidoCompartido,
): number {
  return (
    b[1] - a[1] ||
    a[4] - b[4] ||
    b[3] - a[3] ||
    b[2] - a[2] ||
    a[0].localeCompare(b[0], 'es')
  );
}

export function validarResultadoCompartido(
  valor: unknown,
  permitidos: ListasPermitidasResultado = {},
): valor is ResultadoCompartidoV1 {
  if (!valor || typeof valor !== 'object' || Array.isArray(valor)) return false;
  const objeto = valor as Record<string, unknown>;
  if (!clavesExactas(objeto, ['s', 'i', 'd', 'l', 'e', 'q', 'f', 'p'], ['c'])) return false;
  if (
    objeto.s !== ESQUEMA_RESULTADO_COMPARTIDO ||
    typeof objeto.i !== 'string' ||
    !VERSION.test(objeto.i) ||
    typeof objeto.d !== 'string' ||
    !CATALOGO.test(objeto.d) ||
    !NIVELES.has(objeto.l as NivelResultadoCompartido) ||
    !ELECCIONES.has(objeto.e as EleccionResultadoCompartido)
  ) {
    return false;
  }
  if (
    objeto.c !== undefined &&
    !idPermitido(objeto.c, permitidos.comunidades)
  ) {
    return false;
  }
  if (
    !Array.isArray(objeto.q) ||
    objeto.q.length !== 2 ||
    !enteroEn(objeto.q[0], 0, 500) ||
    !enteroEn(objeto.q[1], 0, 500) ||
    objeto.q[1] > objeto.q[0]
  ) {
    return false;
  }
  if (
    !Array.isArray(objeto.f) ||
    objeto.f.length > 40 ||
    !objeto.f.every((faceta) => esFaceta(faceta, permitidos.ejes)) ||
    !sinDuplicados(objeto.f)
  ) {
    return false;
  }
  if (
    !Array.isArray(objeto.p) ||
    objeto.p.length > 5 ||
    !objeto.p.every((partido) => esPartido(partido, permitidos.partidos)) ||
    !sinDuplicados(objeto.p)
  ) {
    return false;
  }
  for (let indice = 1; indice < objeto.p.length; indice++) {
    // El enlace es una instantánea canónica, no una bolsa de candidatos que el
    // receptor deba volver a ordenar. Comprobar solo la afinidad permitiría
    // invertir empates (por ejemplo, mostrar una estimación débil antes que una
    // sólida) manipulando el fragmento a mano.
    if (
      compararPartidosCompartidos(
        objeto.p[indice - 1] as PartidoCompartido,
        objeto.p[indice] as PartidoCompartido,
      ) > 0
    ) {
      return false;
    }
  }
  return true;
}

function aBase64Url(texto: string): string {
  const bytes = new TextEncoder().encode(texto);
  let binario = '';
  for (let inicio = 0; inicio < bytes.length; inicio += 8_192) {
    binario += String.fromCharCode(...bytes.subarray(inicio, inicio + 8_192));
  }
  return btoa(binario).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/u, '');
}

function desdeBase64Url(carga: string): string | null {
  if (!/^[A-Za-z0-9_-]+$/u.test(carga)) return null;
  const base64 = carga.replaceAll('-', '+').replaceAll('_', '/');
  const relleno = '='.repeat((4 - (base64.length % 4)) % 4);
  try {
    const binario = atob(base64 + relleno);
    const bytes = Uint8Array.from(binario, (caracter) => caracter.charCodeAt(0));
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}

/** Canonicaliza arrays para que la misma instantánea produzca siempre el mismo enlace. */
export function canonicalizarResultadoCompartido(
  resultado: ResultadoCompartidoV1,
): ResultadoCompartidoV1 {
  return {
    s: ESQUEMA_RESULTADO_COMPARTIDO,
    i: resultado.i,
    d: resultado.d,
    l: resultado.l,
    e: resultado.e,
    ...(resultado.c ? { c: resultado.c } : {}),
    q: [...resultado.q],
    f: resultado.f.map((faceta) => [...faceta] as FacetaCompartida).sort((a, b) =>
      a[0].localeCompare(b[0], 'es'),
    ),
    p: resultado.p
      .map((partido) => [...partido] as PartidoCompartido)
      .sort(compararPartidosCompartidos),
  };
}

export function crearFragmentoResultadoCompartido(
  resultado: ResultadoCompartidoV1,
  permitidos: ListasPermitidasResultado = {},
): string {
  if (
    !resultado ||
    typeof resultado !== 'object' ||
    Array.isArray(resultado) ||
    !clavesExactas(
      resultado as unknown as Record<string, unknown>,
      ['s', 'i', 'd', 'l', 'e', 'q', 'f', 'p'],
      ['c'],
    )
  ) {
    throw new Error('La instantánea contiene propiedades no permitidas.');
  }
  const canonico = canonicalizarResultadoCompartido(resultado);
  if (!validarResultadoCompartido(canonico, permitidos)) {
    throw new Error('La instantánea de resultados no cumple el contrato de compartir.');
  }
  const fragmento = `#r=${ESQUEMA_RESULTADO_COMPARTIDO}.${aBase64Url(JSON.stringify(canonico))}`;
  if (fragmento.length > OBJETIVO_ENLACE_RESULTADO) {
    throw new Error('La instantánea supera el presupuesto del enlace compartible.');
  }
  return fragmento;
}

export function leerResultadoCompartido(
  hash: string,
  permitidos: ListasPermitidasResultado = {},
): LecturaResultadoCompartido {
  if (!hash.startsWith('#r=')) return { estado: 'ausente' };
  const carga = hash.slice(3);
  if (carga.length === 0 || carga.length > MAX_CARGA_RESULTADO_COMPARTIDO) {
    return { estado: 'invalido' };
  }
  const coincidencia = carga.match(/^1\.([A-Za-z0-9_-]+)$/u);
  if (!coincidencia) return { estado: 'invalido' };
  const json = desdeBase64Url(coincidencia[1]!);
  if (json === null || json.length > MAX_CARGA_RESULTADO_COMPARTIDO) {
    return { estado: 'invalido' };
  }
  try {
    const resultado = JSON.parse(json) as unknown;
    return validarResultadoCompartido(resultado, permitidos)
      ? { estado: 'valido', resultado }
      : { estado: 'invalido' };
  } catch {
    return { estado: 'invalido' };
  }
}
