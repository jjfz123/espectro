import { describe, expect, it } from 'vitest';
import {
  CLAVE_ALMACEN,
  CLAVE_SESION_RETIRADA,
  DIAS_CADUCIDAD,
  ESTADO_INICIAL,
  HITO_INTERMEDIO_RESPUESTAS,
  avisoSesionRetirada,
  borrarAlmacen,
  cargarEstado,
  descartarAvisoSesionRetirada,
  guardarEstado,
  reductor,
} from '../web/src/estado.js';
import {
  IDS_AMPLIACION_NUCLEO,
  ITEMS_NUCLEO,
  MODULOS,
  VERSION_INSTRUMENTO,
  secuenciaItems,
} from '../web/src/datos.js';

function conLocalStorage<T>(inicial: Record<string, string>, accion: (almacen: Storage) => T): T {
  const descriptorOriginal = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  const contenido = new Map(Object.entries(inicial));
  const almacen: Storage = {
    get length() {
      return contenido.size;
    },
    clear: () => contenido.clear(),
    getItem: (clave) => contenido.get(clave) ?? null,
    key: (indice) => [...contenido.keys()][indice] ?? null,
    removeItem: (clave) => contenido.delete(clave),
    setItem: (clave, valor) => contenido.set(clave, valor),
  };
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: almacen,
  });
  try {
    return accion(almacen);
  } finally {
    if (descriptorOriginal) Object.defineProperty(globalThis, 'localStorage', descriptorOriginal);
    else delete (globalThis as { localStorage?: Storage }).localStorage;
  }
}

function estadoAlcanzandoHito() {
  const modulosActivos = MODULOS.filter((modulo) => modulo.id !== 'nucleo').map(
    (modulo) => modulo.id,
  );
  const ids = [
    ...new Set(secuenciaItems(modulosActivos).map((item) => item.id)),
  ].slice(0, HITO_INTERMEDIO_RESPUESTAS);
  expect(ids).toHaveLength(HITO_INTERMEDIO_RESPUESTAS);
  const respuestas = Object.fromEntries(ids.map((id) => [id, 0 as const]));
  const secuencia = secuenciaItems(modulosActivos, respuestas);
  const indice = secuencia.findIndex((item) => item.id === ids.at(-1));
  expect(indice).toBeGreaterThanOrEqual(0);
  return {
    ...ESTADO_INICIAL,
    fase: 'cuestionario' as const,
    modo: 'completo' as const,
    modulosActivos,
    respuestas,
    indice,
  };
}

describe('estado del cuestionario', () => {
  it('mantiene un núcleo rápido de exactamente 65 preguntas y la ampliación acordada', () => {
    /* v6 mantiene las 65 preguntas rápidas y sustituye solo la semántica de
       lab-017; la formulación cooperativa anterior se conserva como lab-039. */
    expect(ITEMS_NUCLEO).toHaveLength(65);
    expect(ITEMS_NUCLEO.slice(-IDS_AMPLIACION_NUCLEO.length).map((item) => item.id)).toEqual(
      [...IDS_AMPLIACION_NUCLEO],
    );
  });

  it('mantiene el rápido general y sin organizaciones o corrientes nominales', () => {
    const textoRapido = ITEMS_NUCLEO.map((item) => item.texto).join('\n');
    expect(textoRapido).not.toMatch(
      /\b(?:ETA|PSOE|PP|VOX|Sumar|Podemos|Falange|Atomwaffen|Posadismo|Gonzalo)\b/iu,
    );
  });

  it('ofrece perfil provisional o exhaustivo y conserva todas las respuestas', () => {
    const respuestas = Object.fromEntries(ITEMS_NUCLEO.map((item) => [item.id, 1 as const]));
    const completoRapido = {
      ...ESTADO_INICIAL,
      fase: 'cuestionario' as const,
      modo: 'rapido' as const,
      respuestas,
      importantes: { 'eco-001': true },
      indice: ITEMS_NUCLEO.length - 1,
    };

    const decision = reductor(completoRapido, { tipo: 'siguiente' });
    expect(decision.fase).toBe('fin-rapido');

    const provisional = reductor(decision, { tipo: 'ver-perfil-provisional' });
    expect(provisional.fase).toBe('resultados');
    expect(provisional.modo).toBe('rapido');

    const exhaustivo = reductor(provisional, { tipo: 'continuar-exhaustivo' });
    expect(exhaustivo.fase).toBe('modulos');
    expect(exhaustivo.modo).toBe('completo');
    expect(exhaustivo.respuestas).toEqual(respuestas);
    expect(exhaustivo.importantes).toEqual({ 'eco-001': true });
  });

  it('interrumpe una sola vez al llegar a 150 y reanuda en la primera pendiente', () => {
    const antesDelHito = estadoAlcanzandoHito();
    const primeraPendiente = secuenciaItems(
      antesDelHito.modulosActivos,
      antesDelHito.respuestas,
    ).findIndex((item) => !(item.id in antesDelHito.respuestas));
    expect(primeraPendiente).toBeGreaterThan(antesDelHito.indice);

    const hito = reductor(antesDelHito, { tipo: 'siguiente' });
    expect(hito).toMatchObject({
      fase: 'hito-intermedio',
      modo: 'completo',
      hitoIntermedio150Visto: true,
      perfilIntermedio: false,
    });
    expect(hito.respuestas).toEqual(antesDelHito.respuestas);

    const perfil = reductor(hito, { tipo: 'ver-perfil-intermedio' });
    expect(perfil).toMatchObject({
      fase: 'resultados',
      perfilIntermedio: true,
    });

    const reanudado = reductor(perfil, { tipo: 'seguir-exhaustivo' });
    expect(reanudado).toMatchObject({
      fase: 'cuestionario',
      indice: primeraPendiente,
      hitoIntermedio150Visto: true,
      perfilIntermedio: false,
    });
    expect(reanudado.respuestas).toEqual(antesDelHito.respuestas);

    const item = secuenciaItems(reanudado.modulosActivos, reanudado.respuestas)[reanudado.indice];
    expect(item).toBeDefined();
    const respondido = reductor(reanudado, {
      tipo: 'responder',
      itemId: item!.id,
      valor: 0,
    });
    const avanzaSinRepetirHito = reductor(respondido, { tipo: 'siguiente' });
    expect(avanzaSinRepetirHito.fase).toBe('cuestionario');
    expect(avanzaSinRepetirHito.hitoIntermedio150Visto).toBe(true);
  });

  it('persiste el hito y el perfil intermedio al recargar', () => {
    conLocalStorage({}, () => {
      const hito = reductor(estadoAlcanzandoHito(), { tipo: 'siguiente' });
      expect(guardarEstado(hito)).toBe(true);
      expect(cargarEstado()).toMatchObject({
        fase: 'hito-intermedio',
        hitoIntermedio150Visto: true,
        perfilIntermedio: false,
      });

      const perfil = reductor(hito, { tipo: 'ver-perfil-intermedio' });
      expect(guardarEstado(perfil)).toBe(true);
      const restaurado = cargarEstado();
      expect(restaurado).toMatchObject({
        fase: 'resultados',
        hitoIntermedio150Visto: true,
        perfilIntermedio: true,
      });
      expect(restaurado.respuestas).toEqual(perfil.respuestas);
    });
  });

  it('abre una respuesta desde resultados y vuelve a la revisión', () => {
    const empezado = reductor(ESTADO_INICIAL, {
      tipo: 'empezar',
      ccaa: 'canarias',
      eleccion: 'generales',
      modo: 'rapido',
    });
    const respondido = reductor(empezado, {
      tipo: 'responder',
      itemId: 'eco-001',
      valor: 1,
    });
    const editando = reductor(
      { ...respondido, fase: 'resultados' },
      { tipo: 'editar-respuesta', itemId: 'eco-001' },
    );

    expect(editando.fase).toBe('cuestionario');
    expect(editando.editando).toBe(true);
    expect(secuenciaItems([], editando.respuestas)[editando.indice]?.id).toBe('eco-001');

    const revisando = reductor(editando, { tipo: 'terminar-edicion' });
    expect(revisando.fase).toBe('revision');
    expect(revisando.editando).toBe(false);
  });

  it('activa y limpia subpreguntas cuando cambia la respuesta esencial', () => {
    const base = {
      ...ESTADO_INICIAL,
      fase: 'cuestionario' as const,
      modo: 'completo' as const,
      modulosActivos: ['trabajo-estado-sindicatos'],
    };
    const sinRama = secuenciaItems(base.modulosActivos, base.respuestas);

    const activa = reductor(base, {
      tipo: 'responder',
      itemId: 'lab-009',
      valor: 2,
    });
    const conRama = secuenciaItems(activa.modulosActivos, activa.respuestas);
    expect(conRama.length - sinRama.length).toBe(5);
    expect(conRama.some((item) => item.id === 'lab-010')).toBe(true);
    expect(conRama.some((item) => item.id === 'lab-027')).toBe(true);

    const conSeguimiento = reductor(
      {
        ...activa,
        importantes: { ...activa.importantes, 'lab-010': true },
      },
      { tipo: 'responder', itemId: 'lab-010', valor: 2 },
    );
    const desactiva = reductor(conSeguimiento, {
      tipo: 'responder',
      itemId: 'lab-009',
      valor: 0,
    });

    expect(desactiva.respuestas['lab-010']).toBeUndefined();
    expect(desactiva.importantes['lab-010']).toBeUndefined();
    expect(secuenciaItems(desactiva.modulosActivos, desactiva.respuestas)).toHaveLength(
      sinRama.length,
    );
  });

  it('persiste la versión metodológica y restaura una sesión compatible', () => {
    conLocalStorage({}, (almacen) => {
      const estado = {
        ...ESTADO_INICIAL,
        fase: 'cuestionario' as const,
        respuestas: { 'eco-001': 1 as const },
      };
      expect(guardarEstado(estado)).toBe(true);
      const crudo = JSON.parse(almacen.getItem(CLAVE_ALMACEN) ?? '{}');
      expect(crudo).toMatchObject({
        version: 3,
        versionInstrumento: VERSION_INSTRUMENTO,
      });
      expect(Date.parse(crudo.guardadoEn)).not.toBeNaN();
      expect(cargarEstado()).toMatchObject({
        fase: 'cuestionario',
        respuestas: { 'eco-001': 1 },
      });
    });
  });

  it('migra v6 a v7 restaurando las respuestas tal cual, sin remapeos ni reapertura', () => {
    const anterior = {
      ...ESTADO_INICIAL,
      versionInstrumento: '6',
      fase: 'resultados',
      modo: 'completo',
      respuestas: { 'eco-001': 2, 'lab-009': 2, 'lab-017': -1, 'lab-027': 2, 'soc-006': null },
      importantes: { 'lab-027': true },
      modulosActivos: ['trabajo-estado-sindicatos'],
      guardadoEn: new Date().toISOString(),
    };
    conLocalStorage({ [CLAVE_ALMACEN]: JSON.stringify(anterior) }, () => {
      const restaurado = cargarEstado();
      // v6→v7 solo corrige signos de carga (lab-027): la respuesta guardada
      // conserva su significado literal y no debe moverse ni reinterpretarse.
      expect(restaurado).toMatchObject({
        versionInstrumento: VERSION_INSTRUMENTO,
        fase: 'resultados',
        modo: 'completo',
        modulosActivos: anterior.modulosActivos,
      });
      expect(restaurado.respuestas).toMatchObject({
        'eco-001': 2,
        'lab-009': 2,
        'lab-017': -1,
        'lab-027': 2,
        'soc-006': null,
      });
      expect(restaurado.respuestas['lab-039']).toBeUndefined();
      expect(restaurado.importantes).toEqual({ 'lab-027': true });
    });
  });

  it('migra v5 a v7 sin reinterpretar la antigua lab-017', () => {
    const anterior = {
      ...ESTADO_INICIAL,
      versionInstrumento: '5',
      fase: 'cuestionario',
      modo: 'completo',
      respuestas: { 'eco-001': 2, 'lab-017': -1, 'soc-006': null },
      importantes: { 'lab-017': true },
      modulosActivos: ['trabajo-estado-sindicatos'],
      guardadoEn: new Date().toISOString(),
    };
    conLocalStorage({ [CLAVE_ALMACEN]: JSON.stringify(anterior) }, () => {
      const restaurado = cargarEstado();
      expect(restaurado).toMatchObject({
        versionInstrumento: VERSION_INSTRUMENTO,
        fase: 'cuestionario',
        modo: 'completo',
        modulosActivos: anterior.modulosActivos,
      });
      expect(restaurado.respuestas).toMatchObject({
        'eco-001': 2,
        'lab-039': -1,
        'soc-006': null,
      });
      expect(restaurado.respuestas['lab-017']).toBeUndefined();
      expect(restaurado.importantes).toEqual({ 'lab-039': true });
      expect(secuenciaItems(restaurado.modulosActivos, restaurado.respuestas).some(
        (item) => item.id === 'lab-017',
      )).toBe(true);
    });
  });

  it('reabre una sesión v5 terminada exactamente en la nueva pregunta 65', () => {
    const respuestasV5 = Object.fromEntries(
      ITEMS_NUCLEO.map((item) => [item.id, item.id === 'lab-017' ? 2 : 0]),
    );
    const anterior = {
      ...ESTADO_INICIAL,
      versionInstrumento: '5',
      fase: 'resultados',
      respuestas: respuestasV5,
      guardadoEn: new Date().toISOString(),
    };
    conLocalStorage({ [CLAVE_ALMACEN]: JSON.stringify(anterior) }, () => {
      const restaurado = cargarEstado();
      expect(restaurado.fase).toBe('cuestionario');
      expect(restaurado.respuestas['lab-039']).toBe(2);
      expect(restaurado.respuestas['lab-017']).toBeUndefined();
      expect(secuenciaItems([], restaurado.respuestas)[restaurado.indice]?.id).toBe('lab-017');
    });
  });

  it('retira estados de otro instrumento, caducados, futuros o corruptos con motivo y sin borrado silencioso', () => {
    const base = {
      ...ESTADO_INICIAL,
      fase: 'cuestionario',
      respuestas: { 'eco-001': 2 },
      guardadoEn: new Date().toISOString(),
    };
    const casos: Array<[string, string]> = [
      [JSON.stringify({ ...base, versionInstrumento: 'instrumento-incompatible' }), 'instrumento'],
      // Solo v5→v7 y v6→v7 están declaradas: los saltos anteriores ya no son compatibles.
      [JSON.stringify({ ...base, versionInstrumento: '4' }), 'instrumento'],
      [
        JSON.stringify({
          ...base,
          guardadoEn: new Date(
            Date.now() - (DIAS_CADUCIDAD + 1) * 24 * 60 * 60 * 1000,
          ).toISOString(),
        }),
        'caducada',
      ],
      [
        JSON.stringify({
          ...base,
          guardadoEn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        }),
        'reloj-futuro',
      ],
      [JSON.stringify({ ...base, guardadoEn: 'no-es-una-fecha' }), 'marca-temporal'],
      ['{esto no es json', 'corrupta'],
    ];
    for (const [payload, motivoEsperado] of casos) {
      conLocalStorage({ [CLAVE_ALMACEN]: payload }, (almacen) => {
        expect(cargarEstado()).toEqual(ESTADO_INICIAL);
        // La clave principal queda libre, pero la sesión no desaparece en
        // silencio: se conserva bajo la clave de retirada con su motivo.
        expect(almacen.getItem(CLAVE_ALMACEN)).toBeNull();
        const retirada = JSON.parse(almacen.getItem(CLAVE_SESION_RETIRADA) ?? '{}');
        expect(retirada.motivo).toBe(motivoEsperado);
        // Privacidad por diseño: el apunte jamás conserva las respuestas.
        expect(retirada).not.toHaveProperty('payload');
        expect(JSON.stringify(retirada)).not.toContain('eco-001');
        expect(avisoSesionRetirada()).toEqual({ motivo: motivoEsperado });
        descartarAvisoSesionRetirada();
        expect(avisoSesionRetirada()).toBeNull();
      });
    }
  });
});

describe('preferencia de orden de la escala Likert', () => {
  it('por defecto usa el orden recomendado (no invertido)', () => {
    expect(ESTADO_INICIAL.escalaInvertida).toBe(false);
  });

  it('«alternar-escala» invierte y vuelve, sin tocar respuestas', () => {
    const conRespuesta = reductor(ESTADO_INICIAL, { tipo: 'responder', itemId: 'eco-001', valor: 2 });
    const invertido = reductor(conRespuesta, { tipo: 'alternar-escala' });
    expect(invertido.escalaInvertida).toBe(true);
    expect(invertido.respuestas).toEqual(conRespuesta.respuestas);
    const restaurado = reductor(invertido, { tipo: 'alternar-escala' });
    expect(restaurado.escalaInvertida).toBe(false);
  });

  it('la preferencia se conserva al empezar de nuevo y se persiste', () => {
    const invertido = reductor(ESTADO_INICIAL, { tipo: 'alternar-escala' });
    expect(reductor(invertido, { tipo: 'reiniciar' }).escalaInvertida).toBe(true);
    conLocalStorage({}, () => {
      guardarEstado(invertido);
      expect(cargarEstado().escalaInvertida).toBe(true);
    });
  });
});

describe('borrado y caducidad del apunte de sesión retirada', () => {
  it('«Borrar datos» elimina también el apunte de sesión retirada', () => {
    conLocalStorage(
      { [CLAVE_SESION_RETIRADA]: JSON.stringify({ motivo: 'caducada', retiradaEn: new Date().toISOString() }) },
      (almacen) => {
        borrarAlmacen();
        expect(almacen.getItem(CLAVE_SESION_RETIRADA)).toBeNull();
      },
    );
  });

  it('un aviso de retirada antiguo caduca y se limpia solo', () => {
    const antiguo = new Date(Date.now() - (DIAS_CADUCIDAD + 1) * 24 * 60 * 60 * 1000);
    conLocalStorage(
      { [CLAVE_SESION_RETIRADA]: JSON.stringify({ motivo: 'caducada', retiradaEn: antiguo.toISOString() }) },
      (almacen) => {
        expect(avisoSesionRetirada()).toBeNull();
        expect(almacen.getItem(CLAVE_SESION_RETIRADA)).toBeNull();
      },
    );
  });
});

describe('fuente de verdad única de la secuencia activa', () => {
  it('las respuestas de módulos desactivados se conservan pero no alimentan ningún cálculo', async () => {
    const { respuestasDeSecuenciaActiva, ITEMS_POR_MODULO } = await import('../web/src/datos.js');
    const itemVerde = ITEMS_POR_MODULO.get('verde-animalista')?.find((item) => !item.condicion);
    expect(itemVerde).toBeDefined();
    const respuestas = { 'eco-001': 2 as const, [itemVerde!.id]: -1 as const };

    // Con el módulo activo, su respuesta cuenta.
    const conModulo = respuestasDeSecuenciaActiva(['verde-animalista'], respuestas);
    expect(conModulo.map((r) => r.itemId)).toContain(itemVerde!.id);

    // Al desactivar el módulo la respuesta sigue guardada (no la borra nadie)
    // pero deja de entrar en la secuencia activa: sugerencia de módulos y
    // perfil final ven exactamente lo mismo.
    const sinModulo = respuestasDeSecuenciaActiva([], respuestas);
    expect(sinModulo.map((r) => r.itemId)).not.toContain(itemVerde!.id);
    expect(sinModulo.map((r) => r.itemId)).toContain('eco-001');
  });
});
