import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  calcularAfinidad,
  rankingAfinidad,
  calcularFacetas,
  calcularEjes,
  compararReferenciasDoctrinales,
  modulosDesbloqueados,
  partidosElegibles,
  partidosPrincipalesUltimasGenerales,
  perfilContraste,
  seleccionarPartidosElectorales,
  itemVisible,
} from '../src/engine/index.js';
import type {
  ConvocatoriaElectoral,
  Eje,
  Item,
  Modulo,
  Partido,
  ReferenciaDoctrinal,
  Respuesta,
  Sindicato,
} from '../src/engine/index.js';

const raiz = fileURLToPath(new URL('..', import.meta.url));
const leer = <T>(ruta: string): T =>
  JSON.parse(readFileSync(join(raiz, ruta), 'utf8')) as T;

const ejes = leer<Eje[]>('data/ejes.json');
const modulos = leer<Modulo[]>('data/modulos.json');
const itemsNucleo = leer<Item[]>('data/items/nucleo.json');
const itemsIzquierda = leer<Item[]>('data/items/corrientes-izquierda.json');
const vanguardia = leer<Partido>('data/partidos/demo-vanguardia.json');
const consejista = leer<Partido>('data/partidos/demo-consejista.json');

const laxo = { minimoItems: 1, umbralCobertura: 0 };

function partido(id: string, posiciones: Record<string, -2 | -1 | 0 | 1 | 2>): Partido {
  const p: Partido = {
    id,
    nombre: id,
    ambito: 'estatal',
    confianza: 'verificada',
    posiciones: {},
  };
  for (const [k, v] of Object.entries(posiciones)) p.posiciones[k] = { valor: v };
  return p;
}

describe('calcularAfinidad (Manhattan normalizada)', () => {
  it('coincidencia perfecta = 100', () => {
    const r: Respuesta[] = [
      { itemId: 'a', valor: 2 },
      { itemId: 'b', valor: -1 },
    ];
    const res = calcularAfinidad(r, partido('p', { a: 2, b: -1 }), laxo);
    expect(res.puntuacion).toBe(100);
  });

  it('oposición total = 0', () => {
    const r: Respuesta[] = [
      { itemId: 'a', valor: 2 },
      { itemId: 'b', valor: -2 },
    ];
    const res = calcularAfinidad(r, partido('p', { a: -2, b: 2 }), laxo);
    expect(res.puntuacion).toBe(0);
  });

  it('«sin opinión» (null) se excluye del cálculo', () => {
    const con: Respuesta[] = [
      { itemId: 'a', valor: 2 },
      { itemId: 'b', valor: null },
    ];
    const sin: Respuesta[] = [{ itemId: 'a', valor: 2 }];
    const p = partido('p', { a: 2, b: -2 });
    expect(calcularAfinidad(con, p, laxo).puntuacion).toBe(
      calcularAfinidad(sin, p, laxo).puntuacion,
    );
    expect(calcularAfinidad(con, p, laxo).itemsComparados).toBe(1);
  });

  it('un ítem importante pesa el doble', () => {
    // a: dist 0 peso 2; b: dist 4 peso 1 → 100·(1 − 4/12) = 66.7
    const r: Respuesta[] = [
      { itemId: 'a', valor: 2, importante: true },
      { itemId: 'b', valor: 2 },
    ];
    const res = calcularAfinidad(r, partido('p', { a: 2, b: -2 }), laxo);
    expect(res.puntuacion).toBe(66.7);
  });

  it('marca bajaCobertura cuando el partido cubre pocos ítems respondidos', () => {
    const r: Respuesta[] = [
      { itemId: 'a', valor: 1 },
      { itemId: 'b', valor: 1 },
      { itemId: 'c', valor: 1 },
    ];
    const res = calcularAfinidad(r, partido('p', { a: 1 }), {
      minimoItems: 1,
      umbralCobertura: 0.5,
    });
    expect(res.cobertura).toBeCloseTo(1 / 3, 3);
    expect(res.bajaCobertura).toBe(true);
  });

  it('adjunta la evidencia (justificación y fuente) al detalle por ítem', () => {
    const r: Respuesta[] = [{ itemId: 'eco-001', valor: 2 }];
    const res = calcularAfinidad(r, vanguardia, laxo);
    expect(res.detalle[0]?.justificacion).toContain('DEMO');
  });

  it('compara cualquier perfil documentado sin mezclar su tipo de organización', () => {
    const sindicato: Sindicato = {
      id: 'sindicato-prueba',
      nombre: 'Sindicato prueba',
      ambito: 'estatal',
      confianza: 'verificada',
      revisado: '2026-07-09',
      posiciones: { 'lab-prueba': { valor: 2 } },
    };
    const resultado = calcularAfinidad(
      [{ itemId: 'lab-prueba', valor: 2 }],
      sindicato,
      laxo,
    );
    expect(resultado.entidadId).toBe('sindicato-prueba');
    expect(resultado.puntuacion).toBe(100);
  });
});

describe('calcularEjes', () => {
  it('acuerdo máximo con carga -1 → −100 en el eje', () => {
    const r: Respuesta[] = [{ itemId: 'eco-001', valor: 2 }]; // subir impuestos, carga economico −1
    const res = calcularEjes(r, itemsNucleo, ejes);
    expect(res['economico']).toBe(-100);
  });

  it('ejes sin ítems respondidos devuelven null, y los solo-matching no puntúan', () => {
    const r: Respuesta[] = [{ itemId: 'izq-004', valor: 2 }]; // ítem con ejes: []
    const res = calcularEjes(r, itemsIzquierda, ejes);
    expect(res['economico']).toBeNull();
    expect(res['organizacion']).toBeNull();
  });

  it('la importancia no desplaza el perfil personal', () => {
    const items: Item[] = [
      { id: 'a', texto: 'Pregunta A suficientemente larga', modulo: 'demo', ejes: [{ eje: 'economico', carga: 1 }] },
      { id: 'b', texto: 'Pregunta B suficientemente larga', modulo: 'demo', ejes: [{ eje: 'economico', carga: 1 }] },
    ];
    const respuestas: Respuesta[] = [
      { itemId: 'a', valor: 2, importante: true },
      { itemId: 'b', valor: -2 },
    ];

    expect(calcularEjes(respuestas, items, ejes)['economico']).toBe(0);
  });
});

describe('calcularFacetas', () => {
  const facetas: Eje[] = [
    {
      id: 'demo',
      nombre: 'Demo',
      poloNegativo: 'Polo negativo',
      poloPositivo: 'Polo positivo',
    },
    {
      id: 'vacia',
      nombre: 'Vacía',
      poloNegativo: 'Polo negativo',
      poloPositivo: 'Polo positivo',
    },
  ];
  const items: Item[] = [
    { id: 'a', texto: 'Pregunta A suficientemente larga', modulo: 'demo', ejes: [{ eje: 'demo', carga: 1 }] },
    { id: 'b', texto: 'Pregunta B suficientemente larga', modulo: 'demo', ejes: [{ eje: 'demo', carga: -0.5 }] },
  ];

  it('expone valor, n/N, carga, denominador y cobertura', () => {
    const [resultado] = calcularFacetas(
      [
        { itemId: 'a', valor: 2, importante: true },
        { itemId: 'b', valor: null },
      ],
      items,
      facetas,
      { minimoItems: 1, umbralCobertura: 0.5 },
    );

    expect(resultado).toMatchObject({
      facetaId: 'demo',
      valor: 100,
      itemsRespondidos: 1,
      itemsDisponibles: 2,
      cargaRespondida: 1,
      cargaDisponible: 1.5,
      numerador: 2,
      denominador: 2,
      cobertura: 0.667,
      coberturaSuficiente: true,
    });
  });

  it('distingue ausencia de opinión y cobertura insuficiente de una posición central', () => {
    const resultados = calcularFacetas(
      [
        { itemId: 'a', valor: null },
        { itemId: 'b', valor: null },
      ],
      items,
      facetas,
    );

    expect(resultados[0]).toMatchObject({
      facetaId: 'demo',
      valor: null,
      itemsRespondidos: 0,
      itemsDisponibles: 2,
      coberturaSuficiente: false,
    });
    expect(resultados[1]).toMatchObject({
      facetaId: 'vacia',
      valor: null,
      itemsDisponibles: 0,
      coberturaSuficiente: false,
    });

    const [central] = calcularFacetas(
      [
        { itemId: 'a', valor: 0 },
        { itemId: 'b', valor: 0 },
      ],
      items,
      facetas,
    );
    expect(central).toMatchObject({ valor: 0, itemsRespondidos: 2 });
  });

  it('exige a la vez el mínimo de ítems y el umbral de carga', () => {
    const [resultado] = calcularFacetas(
      [
        { itemId: 'a', valor: 2 },
        { itemId: 'b', valor: 2 },
      ],
      items,
      facetas,
      { minimoItems: 3, umbralCobertura: 0.5 },
    );

    expect(resultado?.cobertura).toBe(1);
    expect(resultado?.coberturaSuficiente).toBe(false);
  });
});

describe('itinerario condicional', () => {
  const seguimiento: Item = {
    id: 'seguimiento',
    texto: 'Pregunta de seguimiento suficientemente larga',
    modulo: 'demo',
    ejes: [],
    condicion: { itemId: 'padre', valores: [1, 2] },
  };

  it('muestra una pregunta ordinaria y oculta la condicional sin respuesta padre', () => {
    const ordinaria: Item = { ...seguimiento, condicion: undefined };
    expect(itemVisible(ordinaria, {})).toBe(true);
    expect(itemVisible(seguimiento, {})).toBe(false);
    expect(itemVisible(seguimiento, { padre: null })).toBe(false);
  });

  it('activa únicamente los valores declarados por la condición', () => {
    expect(itemVisible(seguimiento, { padre: 2 })).toBe(true);
    expect(itemVisible(seguimiento, { padre: 1 })).toBe(true);
    expect(itemVisible(seguimiento, { padre: 0 })).toBe(false);
    expect(itemVisible(seguimiento, { padre: -2 })).toBe(false);
  });
});

describe('modulosDesbloqueados', () => {
  it('núcleo siempre; corrientes-izquierda con las DOS señales; territorial por CCAA', () => {
    const activos = modulosDesbloqueados(
      modulos,
      { economico: -75, 'propiedad-mercado': -70 },
      { ccaa: 'canarias' },
    );
    expect(activos).toContain('nucleo');
    expect(activos).toContain('corrientes-izquierda');
    expect(activos).toContain('territorial-canarias');
    expect(activos).not.toContain('corrientes-derecha');
  });

  it('feedback beta 2026-07: el intervencionismo moderado NO dispara corrientes-izquierda', () => {
    /* El ±1 uniforme del núcleo da (−50, −50): cruza el −40 del macroeje
       económico pero NO acredita colectivización (umbral −55). El gatillo
       conjuntivo corta el «te pone preguntas asumiendo que eres comunista»
       sin cerrar el módulo a quien trae convicción real o lo activa a mano. */
    const moderado = modulosDesbloqueados(
      modulos,
      { economico: -50, 'propiedad-mercado': -50 },
      {},
    );
    expect(moderado).not.toContain('corrientes-izquierda');
    // Sin señal del segundo eje (bajo el piso de ítems) tampoco se asume nada.
    const sinSegundaSenal = modulosDesbloqueados(modulos, { economico: -75 }, {});
    expect(sinSegundaSenal).not.toContain('corrientes-izquierda');
    // Simétrico exacto a la derecha: mercado moderado sin señal de propiedad.
    const moderadoDerecha = modulosDesbloqueados(
      modulos,
      { economico: 50, 'propiedad-mercado': 50 },
      {},
    );
    expect(moderadoDerecha).not.toContain('corrientes-derecha');
    const convencidoDerecha = modulosDesbloqueados(
      modulos,
      { economico: 75, 'propiedad-mercado': 70 },
      {},
    );
    expect(convencidoDerecha).toContain('corrientes-derecha');
  });

  it('sin puntuación de eje solo activa módulos universales', () => {
    const activos = modulosDesbloqueados(modulos, { economico: null }, {});
    expect(activos).toContain('nucleo');
    expect(activos).toContain('democracia-instituciones');
    expect(activos).toContain('trabajo-estado-sindicatos');
    expect(activos).not.toContain('corrientes-izquierda');
    expect(activos).not.toContain('corrientes-derecha');
    expect(
      activos.every((id) => modulos.find((modulo) => modulo.id === id)?.desbloqueo.tipo === 'siempre'),
    ).toBe(true);
  });

  it('eje-banda desbloquea dentro de la franja y no fuera', () => {
    const banda: Modulo[] = [
      {
        id: 'sd',
        nombre: 'sd',
        desbloqueo: { tipo: 'eje-banda', eje: 'economico', min: -60, max: 5 },
      },
    ];
    expect(modulosDesbloqueados(banda, { economico: -30 }, {})).toContain('sd');
    expect(modulosDesbloqueados(banda, { economico: -60 }, {})).toContain('sd');
    expect(modulosDesbloqueados(banda, { economico: 5 }, {})).toContain('sd');
    expect(modulosDesbloqueados(banda, { economico: -75 }, {})).toEqual([]);
    expect(modulosDesbloqueados(banda, { economico: 20 }, {})).toEqual([]);
    expect(modulosDesbloqueados(banda, { economico: null }, {})).toEqual([]);
  });

  it('un módulo territorial puede cubrir varias CCAA', () => {
    const multi: Modulo[] = [
      {
        id: 'eus-nav',
        nombre: 'eus-nav',
        desbloqueo: { tipo: 'ccaa', ccaa: ['euskadi', 'navarra'] },
      },
    ];
    expect(modulosDesbloqueados(multi, {}, { ccaa: 'navarra' })).toContain('eus-nav');
    expect(modulosDesbloqueados(multi, {}, { ccaa: 'euskadi' })).toContain('eus-nav');
    expect(modulosDesbloqueados(multi, {}, { ccaa: 'madrid' })).toEqual([]);
    expect(modulosDesbloqueados(multi, {}, {})).toEqual([]);
  });

  it('eje-o-ccaa recomienda regionalismos por posición o por contexto leonés', () => {
    const mixto: Modulo[] = [
      {
        id: 'regionalismos',
        nombre: 'regionalismos',
        desbloqueo: {
          tipo: 'eje-o-ccaa',
          eje: 'territorial',
          operador: '<=',
          umbral: -30,
          ccaa: 'castilla-y-leon',
        },
      },
    ];
    expect(modulosDesbloqueados(mixto, { territorial: 20 }, { ccaa: 'castilla-y-leon' }))
      .toContain('regionalismos');
    expect(modulosDesbloqueados(mixto, { territorial: -40 }, { ccaa: 'madrid' }))
      .toContain('regionalismos');
    expect(modulosDesbloqueados(mixto, { territorial: 20 }, { ccaa: 'madrid' }))
      .toEqual([]);
  });
});

describe('partidosElegibles (ámbito electoral)', () => {
  const base = { confianza: 'estimada' as const, posiciones: {} };
  const estatal: Partido = { id: 'e', nombre: 'e', ambito: 'estatal', ...base };
  const canario: Partido = { id: 'c', nombre: 'c', ambito: 'autonomico', ccaa: ['canarias'], ...base };
  const gomero: Partido = { id: 'g', nombre: 'g', ambito: 'insular', ccaa: ['canarias'], ...base };
  const localMadrid: Partido = { id: 'm', nombre: 'm', ambito: 'local', ccaa: ['madrid'], ...base };
  const todos = [estatal, canario, gomero, localMadrid];

  it('autonómicas en Canarias: estatales + autonómicos e insulares canarios', () => {
    const ids = partidosElegibles(todos, { tipo: 'autonomicas', ccaa: 'canarias' }).map((p) => p.id);
    expect(ids).toEqual(['e', 'c', 'g']);
  });

  it('generales en Madrid: los partidos canarios no aparecen; los locales tampoco', () => {
    const ids = partidosElegibles(todos, { tipo: 'generales', ccaa: 'madrid' }).map((p) => p.id);
    expect(ids).toEqual(['e']);
  });

  it('europeas: circunscripción única, entran todos', () => {
    expect(partidosElegibles(todos, { tipo: 'europeas' })).toHaveLength(4);
  });

  it('municipales incluyen ámbito local de la CCAA', () => {
    const ids = partidosElegibles(todos, { tipo: 'municipales', ccaa: 'madrid' }).map((p) => p.id);
    expect(ids).toEqual(['e', 'm']);
  });

  it('sin CCAA conocida no se excluye a ningún partido regional', () => {
    const ids = partidosElegibles(todos, { tipo: 'generales' }).map((p) => p.id);
    expect(ids).toEqual(['e', 'c', 'g']);
  });

  it('autonómicas o municipales sin CCAA no mezclan territorios incompatibles', () => {
    expect(partidosElegibles(todos, { tipo: 'autonomicas' })).toEqual([]);
    expect(partidosElegibles(todos, { tipo: 'municipales' })).toEqual([]);
  });

  it('nunca presenta un perfil histórico o inactivo como candidatura vigente', () => {
    const historico: Partido = { ...estatal, id: 'h', actividad: 'historica' };
    const inactivo: Partido = { ...estatal, id: 'i', actividad: 'inactiva' };
    const ids = partidosElegibles([...todos, historico, inactivo], {
      tipo: 'europeas',
    }).map((p) => p.id);
    expect(ids).not.toContain('h');
    expect(ids).not.toContain('i');
  });
});

describe('catálogo por convocatoria documentada', () => {
  const base = {
    confianza: 'estimada' as const,
    posiciones: {
      'item-comparable': { valor: 1 as const },
    },
  };
  const estatal: Partido = { id: 'estatal', nombre: 'Estatal', ambito: 'estatal', ...base };
  const regional: Partido = {
    id: 'regional',
    nombre: 'Regional',
    ambito: 'autonomico',
    ccaa: ['galicia'],
    ...base,
  };
  const noPresentado: Partido = {
    id: 'no-presentado',
    nombre: 'No presentado',
    ambito: 'estatal',
    ...base,
  };
  const demo: Partido = {
    id: 'demo',
    nombre: 'Demo',
    ambito: 'estatal',
    demo: true,
    ...base,
  };
  const convocatoria: ConvocatoriaElectoral = {
    id: 'general-prueba',
    nombre: 'General de prueba',
    tipo: 'generales',
    fecha: '2026-01-01',
    territorio: 'espana',
    umbralPorcentaje: 0.02,
    denominador: { tipo: 'votos-a-candidaturas', valor: 1000 },
    totalCandidaturasOficiales: 2,
    fuente: { titulo: 'Fuente oficial', url: 'https://example.test', consultado: '2026-01-02' },
    candidaturas: [
      {
        id: 'lista-estatal',
        nombre: 'Lista estatal',
        votos: 600,
        porcentaje: 60,
        territorios: ['galicia', 'madrid'],
        motivoInclusion: 'umbral',
        perfilRelaciones: [
          { perfilId: 'estatal', relacion: 'misma-organizacion' },
          { perfilId: 'demo', relacion: 'componente' },
        ],
      },
      {
        id: 'lista-regional',
        nombre: 'Lista regional',
        votos: 100,
        porcentaje: 10,
        territorios: ['galicia'],
        motivoInclusion: 'umbral',
        perfilRelaciones: [{ perfilId: 'regional', relacion: 'misma-organizacion' }],
      },
    ],
  };

  it('solo selecciona perfiles enlazados a candidaturas y nunca demos', () => {
    const seleccion = seleccionarPartidosElectorales(
      [estatal, regional, noPresentado, demo],
      [convocatoria],
      { tipo: 'generales', ccaa: 'galicia' },
    );
    expect(seleccion.metodo).toBe('convocatoria-documentada');
    expect(seleccion.partidos.map((p) => p.id)).toEqual(['estatal', 'regional']);
    expect(seleccion.candidaturasConPerfil).toBe(2);
  });

  it('ordena los principales por votos y no convierte componentes en candidaturas', () => {
    const coalicion: Partido = {
      id: 'coalicion',
      nombre: 'Coalición',
      ambito: 'estatal',
      tipo: 'coalicion',
      ...base,
    };
    const componente: Partido = {
      id: 'componente',
      nombre: 'Componente',
      ambito: 'estatal',
      ...base,
    };
    const convocatoriaConCoalicion: ConvocatoriaElectoral = {
      ...convocatoria,
      candidaturas: [
        {
          ...convocatoria.candidaturas[1]!,
          votos: 700,
          perfilRelaciones: [
            { perfilId: 'componente', relacion: 'componente' },
            { perfilId: 'coalicion', relacion: 'coalicion' },
          ],
        },
        convocatoria.candidaturas[0]!,
      ],
    };

    const principales = partidosPrincipalesUltimasGenerales(
      [estatal, coalicion, componente],
      [convocatoriaConCoalicion],
      2,
    );

    expect(principales.map((principal) => principal.partido.id)).toEqual([
      'coalicion',
      'estatal',
    ]);
    expect(principales.map((principal) => principal.puestoVotos)).toEqual([1, 2]);
    expect(principales.some((principal) => principal.partido.id === 'componente')).toBe(false);
  });

  it('filtra la presencia general por CCAA sin afirmar una papeleta provincial', () => {
    const seleccion = seleccionarPartidosElectorales(
      [estatal, regional],
      [convocatoria],
      { tipo: 'generales', ccaa: 'madrid' },
    );
    expect(seleccion.candidaturas.map((c) => c.id)).toEqual(['lista-estatal']);
    expect(seleccion.partidos.map((p) => p.id)).toEqual(['estatal']);
  });

  it('declara la heurística cuando falta una convocatoria aplicable', () => {
    const seleccion = seleccionarPartidosElectorales([estatal], [], {
      tipo: 'autonomicas',
      ccaa: 'madrid',
    });
    expect(seleccion.metodo).toBe('heuristica-ambito');
    expect(seleccion.convocatoria).toBeUndefined();
  });

  it('exige comunidad antes de seleccionar partidos autonómicos o municipales', () => {
    for (const tipo of ['autonomicas', 'municipales'] as const) {
      const seleccion = seleccionarPartidosElectorales([estatal, regional], [], { tipo });
      expect(seleccion.metodo).toBe('contexto-incompleto');
      expect(seleccion.partidos).toEqual([]);
    }
  });
});

describe('doble lectura de partidos', () => {
  it('la capa observada no hereda huecos del programa', () => {
    const partidoDual: Partido = {
      id: 'dual',
      nombre: 'Dual',
      ambito: 'estatal',
      confianza: 'verificada',
      posiciones: { programa: { valor: 2 } },
      dobleLectura: {
        etiquetaBase: 'Programa',
        descripcionBase: 'Posiciones declaradas en el programa vigente del partido.',
        contraste: {
          etiqueta: 'Conducta reciente',
          descripcion: 'Votaciones y declaraciones recientes documentadas.',
          hasta: '2026-01-01',
          advertencia: 'La ausencia de evidencia observada no confirma ni refuta el programa.',
          posiciones: { conducta: { valor: -2 } },
        },
      },
    };

    const contraste = perfilContraste(partidoDual);
    expect(contraste?.posiciones).toEqual({ conducta: { valor: -2 } });
    expect(contraste?.posiciones.programa).toBeUndefined();
  });
});

describe('referencias doctrinales no electorales', () => {
  const referencia: ReferenciaDoctrinal = {
    id: 'referencia-prueba',
    nombre: 'Referencia de prueba',
    tipo: 'referencia-doctrinal',
    definicion: 'Tipo ideal suficientemente definido para comprobar el motor de referencias.',
    confianza: 'verificada',
    version: '1.0',
    revisado: '2026-01-01',
    facetasDefinitorias: ['economico'],
    advertencia: 'La similitud parcial no determina pertenencia ni identidad política de la persona.',
    fuentesMarco: [
      {
        tipo: 'otro',
        titulo: 'Fuente de prueba',
        url: 'https://example.test/referencia',
        consultado: '2026-01-01',
      },
    ],
    reglaPublicacion: { minimoItems: 3, minimoCobertura: 0.75, umbralAfinidad: 70 },
    posiciones: {
      a: { valor: 2 },
      b: { valor: -2 },
      c: { valor: 1 },
      d: { valor: 2 },
    },
  };

  it('mide cobertura contra todas las posiciones definitorias y puede no publicar', () => {
    const [resultado] = compararReferenciasDoctrinales(
      [
        { itemId: 'a', valor: 2 },
        { itemId: 'b', valor: -2 },
      ],
      [referencia],
    );
    expect(resultado).toMatchObject({
      itemsComparados: 2,
      // Respuestas con opinión del usuario: no se sobrescribe con el total
      // de posiciones definitorias de la referencia.
      itemsRespondidos: 2,
      itemsDefinitorios: 4,
      coberturaDefinitoria: 0.5,
      publicable: false,
    });
  });

  it('ignora la prioridad electoral y publica solo al superar todos los umbrales', () => {
    const respuestas: Respuesta[] = [
      { itemId: 'a', valor: 2, importante: true },
      { itemId: 'b', valor: -2 },
      { itemId: 'c', valor: 1 },
    ];
    const [conImportancia] = compararReferenciasDoctrinales(respuestas, [referencia]);
    const [sinImportancia] = compararReferenciasDoctrinales(
      respuestas.map((respuesta) => ({ ...respuesta, importante: false })),
      [referencia],
    );
    expect(conImportancia?.puntuacion).toBe(sinImportancia?.puntuacion);
    expect(conImportancia).toMatchObject({ coberturaDefinitoria: 0.75, publicable: true });
  });
});

describe('tesis del proyecto: el módulo separa lo que el núcleo no puede', () => {
  // Usuario de izquierda consejista: contesta el núcleo igual que ambos demos
  // comparten, y el módulo con perfil horizontalista.
  const nucleo: Respuesta[] = [
    { itemId: 'eco-001', valor: 2 },
    { itemId: 'eco-002', valor: -2 },
    { itemId: 'eco-003', valor: 2 },
    { itemId: 'eco-004', valor: -2 },
  ];
  const modulo: Respuesta[] = [
    { itemId: 'izq-001', valor: 2 },
    { itemId: 'izq-002', valor: -2 },
    { itemId: 'izq-003', valor: 2 },
    { itemId: 'izq-004', valor: -2 },
    { itemId: 'izq-006', valor: -2 },
    { itemId: 'izq-007', valor: 2 },
    { itemId: 'izq-008', valor: 2 },
  ];

  it('solo con el núcleo económico, vanguardistas y consejistas empatan', () => {
    const a = calcularAfinidad(nucleo, vanguardia, laxo);
    const b = calcularAfinidad(nucleo, consejista, laxo);
    expect(a.puntuacion).toBe(b.puntuacion);
  });

  it('con el módulo de corrientes, el ranking se separa con claridad', () => {
    const ranking = rankingAfinidad([...nucleo, ...modulo], [vanguardia, consejista], laxo);
    expect(ranking[0]?.entidadId).toBe('demo-consejista');
    expect((ranking[0]?.puntuacion ?? 0) - (ranking[1]?.puntuacion ?? 0)).toBeGreaterThan(15);
  });
});
