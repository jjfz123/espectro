import { describe, expect, it } from 'vitest';
import { ESTADO_INICIAL, reductor } from '../web/src/estado.js';
import {
  IDS_AMPLIACION_NUCLEO,
  ITEMS_NUCLEO,
  secuenciaItems,
} from '../web/src/datos.js';

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
});
