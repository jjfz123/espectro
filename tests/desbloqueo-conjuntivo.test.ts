import { describe, expect, it } from 'vitest';
import { modulosDesbloqueados } from '../src/engine/index.js';
import type { Modulo } from '../src/engine/index.js';

/**
 * Contrato del desbloqueo conjuntivo «ejes-todos» (feedback beta Discord,
 * 2026-07: «con darle un poco a apoyar nacionalizaciones ya te pone preguntas
 * asumiendo que eres comunista»). El tipo permite que un módulo exija DOS
 * señales a la vez —p. ej. izquierda económica Y colectivización de la
 * propiedad— en lugar de tratar cualquier intervencionismo como
 * anticapitalismo. Aquí se prueba solo la lógica del motor con módulos
 * sintéticos; el cableado de datos (data/modulos.json) es del integrador.
 */

const MODULO_CONJUNTIVO: Modulo = {
  id: 'sintetico-conjuntivo',
  nombre: 'Sintético conjuntivo',
  desbloqueo: {
    tipo: 'ejes-todos',
    condiciones: [
      { eje: 'economico', operador: '<=', umbral: -40 },
      { eje: 'propiedad-mercado', operador: '<=', umbral: -35 },
    ],
  },
};

const MODULO_CON_BANDA: Modulo = {
  id: 'sintetico-banda',
  nombre: 'Sintético con horquilla',
  desbloqueo: {
    tipo: 'ejes-todos',
    condiciones: [
      { eje: 'economico', operador: '<=', umbral: -40 },
      { eje: 'estatismo', min: -20, max: 60 },
    ],
  },
};

describe('desbloqueo conjuntivo ejes-todos', () => {
  it('desbloquea solo cuando TODAS las condiciones se cumplen', () => {
    const ambos = modulosDesbloqueados([MODULO_CONJUNTIVO], {
      economico: -55,
      'propiedad-mercado': -50,
    });
    expect(ambos).toContain('sintetico-conjuntivo');

    // Izquierda económica sin señal de colectivización: NO se desbloquea.
    const soloEconomico = modulosDesbloqueados([MODULO_CONJUNTIVO], {
      economico: -55,
      'propiedad-mercado': -10,
    });
    expect(soloEconomico).not.toContain('sintetico-conjuntivo');

    const soloPropiedad = modulosDesbloqueados([MODULO_CONJUNTIVO], {
      economico: -20,
      'propiedad-mercado': -50,
    });
    expect(soloPropiedad).not.toContain('sintetico-conjuntivo');
  });

  it('un eje sin señal (null o ausente) nunca cumple: no se asume posición', () => {
    expect(
      modulosDesbloqueados([MODULO_CONJUNTIVO], {
        economico: -55,
        'propiedad-mercado': null,
      }),
    ).not.toContain('sintetico-conjuntivo');
    expect(
      modulosDesbloqueados([MODULO_CONJUNTIVO], { economico: -55 }),
    ).not.toContain('sintetico-conjuntivo');
  });

  it('admite mezclar umbral con operador y horquilla min–max', () => {
    expect(
      modulosDesbloqueados([MODULO_CON_BANDA], { economico: -60, estatismo: 30 }),
    ).toContain('sintetico-banda');
    expect(
      modulosDesbloqueados([MODULO_CON_BANDA], { economico: -60, estatismo: 80 }),
    ).not.toContain('sintetico-banda');
    expect(
      modulosDesbloqueados([MODULO_CON_BANDA], { economico: -60, estatismo: -30 }),
    ).not.toContain('sintetico-banda');
  });

  it('una lista de condiciones vacía o ausente no desbloquea nada (fallo cerrado)', () => {
    const vacio: Modulo = {
      id: 'sintetico-vacio',
      nombre: 'Sintético vacío',
      desbloqueo: { tipo: 'ejes-todos', condiciones: [] },
    };
    const sinCondiciones: Modulo = {
      id: 'sintetico-sin-condiciones',
      nombre: 'Sintético sin condiciones',
      desbloqueo: { tipo: 'ejes-todos' },
    };
    const ids = modulosDesbloqueados([vacio, sinCondiciones], {
      economico: -100,
      'propiedad-mercado': -100,
    });
    expect(ids).toEqual([]);
  });

  it('una condición malformada (sin operador ni horquilla) no cumple', () => {
    const malformado: Modulo = {
      id: 'sintetico-malformado',
      nombre: 'Sintético malformado',
      desbloqueo: { tipo: 'ejes-todos', condiciones: [{ eje: 'economico' }] },
    };
    expect(modulosDesbloqueados([malformado], { economico: -100 })).toEqual([]);
  });

  it('no altera los tipos de desbloqueo existentes', () => {
    const porEje: Modulo = {
      id: 'clasico-eje',
      nombre: 'Clásico por eje',
      desbloqueo: { tipo: 'eje', eje: 'economico', operador: '<=', umbral: -40 },
    };
    expect(modulosDesbloqueados([porEje], { economico: -55 })).toContain('clasico-eje');
    expect(modulosDesbloqueados([porEje], { economico: -10 })).not.toContain('clasico-eje');
  });
});
