import { describe, expect, it } from 'vitest';
import {
  ESTADO_INICIAL,
  cargarEstado,
  reductor,
  type Estado,
} from '../web/src/estado.js';
import { ITEMS, ITEMS_NUCLEO, itemVisible, secuenciaItems } from '../web/src/datos.js';
import type { Valor } from '../src/engine/index.js';

/**
 * Casilla del TODO «tests de estado recorren… recarga real en cada frontera,
 * no duplicación de seguimientos…»: cada fase persistible sobrevive a
 * cargarEstado con su semántica, la reanudación cae en la primera pendiente
 * correcta aunque el índice guardado apunte a una ya respondida, y los
 * seguimientos revelados nunca se duplican en la secuencia al recargar.
 */

function conAlmacen<T>(estado: Record<string, unknown>, accion: () => T): T {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  const contenido = new Map<string, string>([
    [
      'espectro.v1',
      JSON.stringify({
        ...estado,
        guardadoEn: new Date().toISOString(),
        versionInstrumento: ESTADO_INICIAL.versionInstrumento,
      }),
    ],
  ]);
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (k: string) => contenido.get(k) ?? null,
      setItem: (k: string, v: string) => contenido.set(k, v),
      removeItem: (k: string) => contenido.delete(k),
      clear: () => contenido.clear(),
      key: () => null,
      length: 0,
    } as Storage,
  });
  try {
    return accion();
  } finally {
    if (descriptor) Object.defineProperty(globalThis, 'localStorage', descriptor);
    else delete (globalThis as { localStorage?: Storage }).localStorage;
  }
}

const respuestasNucleo = (): Record<string, Valor | null> => {
  const respuestas: Record<string, Valor | null> = {};
  for (let vuelta = 0; vuelta < 6; vuelta += 1) {
    const pendientes = secuenciaItems([], respuestas).filter((i) => !(i.id in respuestas));
    if (pendientes.length === 0) break;
    for (const item of pendientes) respuestas[item.id] = 0;
  }
  return respuestas;
};

describe('recarga real en cada frontera', () => {
  it('fin-rapido sobrevive a la recarga con sus respuestas', () => {
    const estado = conAlmacen(
      {
        ...ESTADO_INICIAL,
        fase: 'fin-rapido',
        modo: 'rapido',
        respuestas: respuestasNucleo(),
      },
      () => cargarEstado(),
    );
    expect(estado.fase).toBe('fin-rapido');
    expect(Object.keys(estado.respuestas).length).toBeGreaterThanOrEqual(ITEMS_NUCLEO.length);
  });

  it('la frontera de módulos sobrevive a la recarga en modo completo', () => {
    const estado = conAlmacen(
      {
        ...ESTADO_INICIAL,
        fase: 'modulos',
        modo: 'completo',
        respuestas: respuestasNucleo(),
      },
      () => cargarEstado(),
    );
    expect(estado.fase).toBe('modulos');
    expect(estado.modo).toBe('completo');
  });

  it('revisión y resultados sobreviven a la recarga sin recalcular nada', () => {
    for (const fase of ['revision', 'resultados'] as const) {
      const estado = conAlmacen(
        {
          ...ESTADO_INICIAL,
          fase,
          modo: 'rapido',
          respuestas: respuestasNucleo(),
        },
        () => cargarEstado(),
      );
      expect(estado.fase).toBe(fase);
    }
  });

  it('si el índice guardado apunta a una pregunta ya respondida, continuar cae en la primera pendiente', () => {
    const respuestas = respuestasNucleo();
    const secuencia = secuenciaItems([], respuestas);
    // Deja UNA pendiente en mitad de la secuencia y guarda el índice en otra
    // (ya respondida) anterior.
    const objetivo = secuencia[Math.floor(secuencia.length / 2)]!;
    delete respuestas[objetivo.id];
    const estado = conAlmacen(
      {
        ...ESTADO_INICIAL,
        fase: 'cuestionario',
        modo: 'rapido',
        respuestas,
        indice: 2,
      },
      () => cargarEstado(),
    );
    const tras = reductor(estado, { tipo: 'continuar' });
    expect(tras.fase).toBe('cuestionario');
    const secuenciaTras = secuenciaItems(tras.modulosActivos, tras.respuestas);
    expect(secuenciaTras[tras.indice]?.id).toBe(objetivo.id);
  });
});

describe('seguimientos al reanudar', () => {
  // Los seguimientos de las preguntas esenciales del núcleo viven en los
  // módulos temáticos (p. ej. dem-011 → dem-017 en democracia-instituciones):
  // la reanudación se prueba con el módulo del seguimiento activado.
  const esencialConSeguimiento = (() => {
    for (const item of ITEMS) {
      if (item.modulo !== 'nucleo' || item.condicion) continue;
      for (const candidato of ITEMS) {
        if (!candidato.condicion) continue;
        const visibleTrasRespuesta = [2, -2, 1, -1].find((valor) =>
          itemVisible(candidato, { [item.id]: valor as Valor }),
        );
        if (visibleTrasRespuesta !== undefined) {
          return { padre: item, seguimiento: candidato, valor: visibleTrasRespuesta as Valor };
        }
      }
    }
    return null;
  })();

  it('existe al menos un seguimiento activable desde el núcleo (premisa del contrato)', () => {
    expect(esencialConSeguimiento).not.toBeNull();
  });

  it('un seguimiento revelado y respondido aparece UNA sola vez tras recargar', () => {
    if (!esencialConSeguimiento) return;
    const { padre, seguimiento, valor } = esencialConSeguimiento;
    const respuestas: Record<string, Valor | null> = { [padre.id]: valor, [seguimiento.id]: 0 };
    const estado = conAlmacen(
      {
        ...ESTADO_INICIAL,
        fase: 'cuestionario',
        modo: 'completo',
        modulosActivos: [seguimiento.modulo],
        respuestas,
        indice: 0,
      },
      () => cargarEstado(),
    );
    const apariciones = secuenciaItems(estado.modulosActivos, estado.respuestas).filter(
      (item) => item.id === seguimiento.id,
    );
    expect(apariciones).toHaveLength(1);
    expect(estado.respuestas[seguimiento.id]).toBe(0);
  });

  it('si la respuesta del padre cambió antes de recargar, el seguimiento huérfano se limpia', () => {
    if (!esencialConSeguimiento) return;
    const { padre, seguimiento, valor } = esencialConSeguimiento;
    const valorQueOculta = [2, -2, 1, -1, 0].find(
      (v) => v !== valor && !itemVisible(seguimiento, { [padre.id]: v as Valor }),
    );
    expect(valorQueOculta).toBeDefined();
    const estado = conAlmacen(
      {
        ...ESTADO_INICIAL,
        fase: 'cuestionario',
        modo: 'completo',
        modulosActivos: [seguimiento.modulo],
        respuestas: { [padre.id]: valorQueOculta as Valor, [seguimiento.id]: 0 },
        indice: 0,
      },
      () => cargarEstado(),
    );
    expect(seguimiento.id in estado.respuestas).toBe(false);
  });
});
