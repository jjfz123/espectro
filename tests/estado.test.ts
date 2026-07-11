import { describe, expect, it } from 'vitest';
import {
  CLAVE_ALMACEN,
  DIAS_CADUCIDAD,
  ESTADO_INICIAL,
  HITO_INTERMEDIO_RESPUESTAS,
  cargarEstado,
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
  it('mantiene un núcleo rápido de exactamente 50 preguntas y la ampliación acordada', () => {
    expect(ITEMS_NUCLEO).toHaveLength(50);
    expect(ITEMS_NUCLEO.slice(-IDS_AMPLIACION_NUCLEO.length).map((item) => item.id)).toEqual(
      [...IDS_AMPLIACION_NUCLEO],
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
    expect(conRama.length - sinRama.length).toBe(4);
    expect(conRama.some((item) => item.id === 'lab-010')).toBe(true);

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

  it('descarta estados de otro instrumento o caducados', () => {
    const base = {
      ...ESTADO_INICIAL,
      fase: 'cuestionario',
      respuestas: { 'eco-001': 2 },
      guardadoEn: new Date().toISOString(),
    };
    for (const datos of [
      { ...base, versionInstrumento: 'instrumento-incompatible' },
      {
        ...base,
        guardadoEn: new Date(
          Date.now() - (DIAS_CADUCIDAD + 1) * 24 * 60 * 60 * 1000,
        ).toISOString(),
      },
    ]) {
      conLocalStorage({ [CLAVE_ALMACEN]: JSON.stringify(datos) }, (almacen) => {
        expect(cargarEstado()).toEqual(ESTADO_INICIAL);
        expect(almacen.getItem(CLAVE_ALMACEN)).toBeNull();
      });
    }
  });
});
