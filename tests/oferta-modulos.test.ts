import { describe, expect, it } from 'vitest';
import {
  ESTADO_INICIAL,
  cargarEstado,
  modulosRecienDesbloqueados,
  reductor,
  type Estado,
} from '../web/src/estado.js';
import { ITEMS_NUCLEO, MODULOS, secuenciaItems } from '../web/src/datos.js';
import type { Valor } from '../src/engine/index.js';

/**
 * Contrato del re-check dinámico (orden del propietario, 2026-07-12): el
 * exhaustivo detecta el movimiento del perfil y ofrece EN CIEGO los bloques
 * recién desbloqueados en las fronteras de módulo y al completar la
 * secuencia; nunca re-ofrece lo ya ofrecido ni desactiva nada.
 */

/** Responde todos los ítems visibles del núcleo: extremo izquierda económica y 0 en el resto. */
function responderNucleoIzquierdaEconomica(): Record<string, Valor | null> {
  const respuestas: Record<string, Valor | null> = {};
  // Los condicionales pueden aparecer al responder: iterar hasta el cierre.
  for (let vuelta = 0; vuelta < 6; vuelta += 1) {
    const visibles = secuenciaItems([], respuestas).filter((item) => !(item.id in respuestas));
    if (visibles.length === 0) break;
    for (const item of visibles) {
      const cargaEco = item.ejes.find((c) => c.eje === 'economico' && c.carga !== 0);
      respuestas[item.id] = cargaEco ? ((cargaEco.carga > 0 ? -2 : 2) as Valor) : 0;
    }
  }
  return respuestas;
}

function estadoEnFronteraDeModulo(): Estado {
  const respuestas = responderNucleoIzquierdaEconomica();
  const estado: Estado = {
    ...ESTADO_INICIAL,
    modo: 'completo',
    fase: 'cuestionario',
    modulosActivos: ['democracia-instituciones'],
    modulosOfrecidos: [],
    respuestas,
  };
  const secuencia = secuenciaItems(estado.modulosActivos, estado.respuestas);
  const ultimoNucleo = secuencia.reduce(
    (ultimo, item, indice) => (item.modulo === 'nucleo' ? indice : ultimo),
    -1,
  );
  expect(ultimoNucleo).toBeGreaterThanOrEqual(0);
  expect(secuencia[ultimoNucleo + 1]?.modulo).toBe('democracia-instituciones');
  return { ...estado, indice: ultimoNucleo };
}

describe('re-check dinámico de módulos (oferta en vuelo)', () => {
  it('el núcleo respondido al extremo económico desbloquea corrientes-izquierda', () => {
    const estado = estadoEnFronteraDeModulo();
    const nuevos = modulosRecienDesbloqueados(estado);
    expect(nuevos).toContain('corrientes-izquierda');
    expect(nuevos).not.toContain('nucleo');
    expect(nuevos).not.toContain('democracia-instituciones');
  });

  it('en la frontera de módulo ofrece en vez de avanzar; aceptar añade y sigue', () => {
    const estado = estadoEnFronteraDeModulo();
    const enOferta = reductor(estado, { tipo: 'siguiente' });
    expect(enOferta.fase).toBe('oferta-modulos');
    expect(enOferta.indice).toBe(estado.indice);

    const nuevos = modulosRecienDesbloqueados(enOferta);
    const tras = reductor(enOferta, { tipo: 'aceptar-oferta-modulos' });
    expect(tras.fase).toBe('cuestionario');
    for (const id of nuevos) {
      expect(tras.modulosActivos).toContain(id);
      expect(tras.modulosOfrecidos).toContain(id);
    }
    // Reanuda en la primera pendiente, nunca pierde respuestas.
    expect(Object.keys(tras.respuestas)).toEqual(Object.keys(estado.respuestas));
    const secuencia = secuenciaItems(tras.modulosActivos, tras.respuestas);
    expect(secuencia[tras.indice]?.id in tras.respuestas).toBe(false);
  });

  it('rechazar marca como ofrecidos, no activa nada y no vuelve a interrumpir', () => {
    const estado = estadoEnFronteraDeModulo();
    const enOferta = reductor(estado, { tipo: 'siguiente' });
    const nuevos = modulosRecienDesbloqueados(enOferta);
    expect(nuevos.length).toBeGreaterThan(0);

    const tras = reductor(enOferta, { tipo: 'rechazar-oferta-modulos' });
    expect(tras.fase).toBe('cuestionario');
    expect(tras.modulosActivos).toEqual(estado.modulosActivos);
    for (const id of nuevos) expect(tras.modulosOfrecidos).toContain(id);

    // La misma frontera ya no interrumpe: avanza al siguiente módulo.
    const otra = reductor({ ...tras, indice: estado.indice }, { tipo: 'siguiente' });
    expect(otra.fase).toBe('cuestionario');
    expect(otra.indice).toBe(estado.indice + 1);
  });

  it('al completar la secuencia activa ofrece antes de ir a resultados', () => {
    const base = estadoEnFronteraDeModulo();
    // Responde también todo el módulo activo para agotar la secuencia.
    const respuestas = { ...base.respuestas };
    for (let vuelta = 0; vuelta < 6; vuelta += 1) {
      const pendientes = secuenciaItems(base.modulosActivos, respuestas).filter(
        (item) => !(item.id in respuestas),
      );
      if (pendientes.length === 0) break;
      for (const item of pendientes) respuestas[item.id] = 0;
    }
    const secuencia = secuenciaItems(base.modulosActivos, respuestas);
    const estado: Estado = { ...base, respuestas, indice: secuencia.length - 1 };

    const enOferta = reductor(estado, { tipo: 'siguiente' });
    expect(enOferta.fase).toBe('oferta-modulos');
    const tras = reductor(enOferta, { tipo: 'rechazar-oferta-modulos' });
    expect(tras.fase).toBe('resultados');
  });

  it('confirmar-modulos deja lo ya desbloqueado como ofrecido: sin re-oferta sin movimiento', () => {
    const respuestas = responderNucleoIzquierdaEconomica();
    const previo: Estado = {
      ...ESTADO_INICIAL,
      modo: 'completo',
      fase: 'modulos',
      respuestas,
    };
    const confirmado = reductor(previo, {
      tipo: 'confirmar-modulos',
      seleccion: ['democracia-instituciones'],
    });
    expect(confirmado.modulosOfrecidos).toContain('corrientes-izquierda');
    expect(modulosRecienDesbloqueados(confirmado)).toEqual([]);

    const secuencia = secuenciaItems(confirmado.modulosActivos, confirmado.respuestas);
    const ultimoNucleo = secuencia.reduce(
      (ultimo, item, indice) => (item.modulo === 'nucleo' ? indice : ultimo),
      -1,
    );
    const enFrontera = { ...confirmado, fase: 'cuestionario' as const, indice: ultimoNucleo };
    const tras = reductor(enFrontera, { tipo: 'siguiente' });
    expect(tras.fase).toBe('cuestionario');
    expect(tras.indice).toBe(ultimoNucleo + 1);
  });

  it('el afinamiento ideológico va al final de la secuencia (orden del propietario)', () => {
    const porId = new Map(MODULOS.map((m) => [m.id, m.orden ?? 99]));
    const generales = ['democracia-instituciones', 'trabajo-estado-sindicatos', 'energia-modelo-productivo', 'geopolitica-defensa'];
    const afinamiento = ['socialdemocracia-reformismo', 'centro-liberalismo', 'corrientes-izquierda', 'corrientes-derecha', 'derecha-radical'];
    for (const g of generales) {
      for (const a of afinamiento) {
        expect(porId.get(g)!).toBeLessThan(porId.get(a)!);
      }
    }
    expect(porId.get('limites-antipluralismo')).toBe(Math.max(...[...porId.values()]));
  });

  it('persistencia: modulosOfrecidos sobrevive al guardado y falta en sesiones antiguas sin romper', () => {
    const guardado = {
      ...ESTADO_INICIAL,
      modo: 'completo',
      fase: 'cuestionario',
      respuestas: { [ITEMS_NUCLEO[0].id]: 0 },
      modulosActivos: ['democracia-instituciones'],
      modulosOfrecidos: ['corrientes-izquierda', 'no-existe', 'nucleo'],
      guardadoEn: new Date().toISOString(),
      versionInstrumento: ESTADO_INICIAL.versionInstrumento,
    };
    const almacen = new Map<string, string>([['espectro.v1', JSON.stringify(guardado)]]);
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: {
        getItem: (k: string) => almacen.get(k) ?? null,
        setItem: (k: string, v: string) => almacen.set(k, v),
        removeItem: (k: string) => almacen.delete(k),
        clear: () => almacen.clear(),
        key: () => null,
        length: 0,
      } as Storage,
    });
    try {
      const cargado = cargarEstado();
      expect(cargado.modulosOfrecidos).toEqual(['corrientes-izquierda']);

      almacen.set(
        'espectro.v1',
        JSON.stringify({ ...guardado, modulosOfrecidos: undefined }),
      );
      expect(cargarEstado().modulosOfrecidos).toEqual([]);
    } finally {
      if (descriptor) Object.defineProperty(globalThis, 'localStorage', descriptor);
      else delete (globalThis as { localStorage?: Storage }).localStorage;
    }
  });

  it('una fase de oferta guardada sin nada que ofrecer se reanuda por el camino canónico', () => {
    const respuestas = responderNucleoIzquierdaEconomica();
    const guardado = {
      ...ESTADO_INICIAL,
      modo: 'completo',
      fase: 'oferta-modulos',
      respuestas,
      modulosActivos: ['democracia-instituciones'],
      // Todo lo desbloqueable ya consta como ofrecido: no queda oferta válida.
      modulosOfrecidos: MODULOS.map((m) => m.id).filter((id) => id !== 'nucleo'),
      guardadoEn: new Date().toISOString(),
      versionInstrumento: ESTADO_INICIAL.versionInstrumento,
    };
    const almacen = new Map<string, string>([['espectro.v1', JSON.stringify(guardado)]]);
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: {
        getItem: (k: string) => almacen.get(k) ?? null,
        setItem: (k: string, v: string) => almacen.set(k, v),
        removeItem: (k: string) => almacen.delete(k),
        clear: () => almacen.clear(),
        key: () => null,
        length: 0,
      } as Storage,
    });
    try {
      const cargado = cargarEstado();
      expect(cargado.fase).toBe('cuestionario');
      const secuencia = secuenciaItems(cargado.modulosActivos, cargado.respuestas);
      expect(secuencia[cargado.indice]?.id in cargado.respuestas).toBe(false);
    } finally {
      if (descriptor) Object.defineProperty(globalThis, 'localStorage', descriptor);
      else delete (globalThis as { localStorage?: Storage }).localStorage;
    }
  });
});
