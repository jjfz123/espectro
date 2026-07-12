import { describe, expect, it } from 'vitest';
import {
  ESTADO_INICIAL,
  reductor,
  type Estado,
} from '../web/src/estado.js';
import { MODULOS, MODULO_POR_ID, secuenciaItems } from '../web/src/datos.js';
import type { Valor } from '../src/engine/index.js';

/**
 * Contrato (feedback beta Discord, 2026-07): el AVANCE normal del cuestionario
 * nunca re-presenta como pendientes preguntas ya contestadas.
 *
 * Traza del bug: al aceptar módulos ofrecidos en vuelo, `secuenciaItems` los
 * inserta en su orden canónico —que puede ser ANTERIOR a módulos ya
 * respondidos— y `siguiente` avanzaba índice a índice sin saltar lo ya
 * contestado: el usuario tenía que «pasar» una a una decenas de preguntas que
 * aparecían con su respuesta ya seleccionada («las últimas 30 preguntas han
 * salido repetidas y ya venían seleccionadas»).
 *
 * La re-confirmación de respuestas existe, pero es opt-in y está rotulada: el
 * botón «Anterior» y la vista de revisión. Nunca silenciosa en el avance.
 */

/** Responde todos los pendientes visibles con `valor` (itera por los condicionales). */
function responderTodo(
  modulosActivos: string[],
  respuestas: Record<string, Valor | null>,
  valor: Valor,
): void {
  for (let vuelta = 0; vuelta < 8; vuelta += 1) {
    const pendientes = secuenciaItems(modulosActivos, respuestas).filter(
      (item) => !(item.id in respuestas),
    );
    if (pendientes.length === 0) break;
    for (const item of pendientes) respuestas[item.id] = valor;
  }
}

/** Núcleo al extremo económico de la izquierda y 0 en el resto (perfil del tester). */
function respuestasNucleoIzquierda(): Record<string, Valor | null> {
  const respuestas: Record<string, Valor | null> = {};
  for (let vuelta = 0; vuelta < 8; vuelta += 1) {
    const pendientes = secuenciaItems([], respuestas).filter((item) => !(item.id in respuestas));
    if (pendientes.length === 0) break;
    for (const item of pendientes) {
      const cargaEco = item.ejes.find((c) => c.eje === 'economico' && c.carga !== 0);
      respuestas[item.id] = cargaEco ? ((cargaEco.carga > 0 ? -2 : 2) as Valor) : 0;
    }
  }
  return respuestas;
}

describe('el avance nunca re-presenta preguntas ya contestadas', () => {
  it('premisa: existen módulos con orden canónico anterior a corrientes-izquierda', () => {
    const ordenCi = MODULO_POR_ID.get('corrientes-izquierda')?.orden ?? 0;
    const anteriores = MODULOS.filter(
      (m) => m.id !== 'nucleo' && (m.orden ?? 99) < ordenCi && m.desbloqueo.tipo === 'siempre',
    );
    // Sin esto la inserción en vuelo no puede dejar material respondido detrás
    // y el contrato de abajo no probaría nada.
    expect(anteriores.length).toBeGreaterThan(0);
  });

  it('con todo lo restante ya contestado, «siguiente» cierra en vez de re-mostrar el tramo respondido', () => {
    // Módulo temprano (democracia) y tardío (corrientes-izquierda) activos y
    // TODO respondido; el índice está al final del módulo temprano, con las 52
    // preguntas ya contestadas de corrientes-izquierda físicamente por delante
    // (así queda la secuencia tras aceptar una oferta en vuelo y responderla).
    const modulosActivos = ['democracia-instituciones', 'corrientes-izquierda'];
    const respuestas: Record<string, Valor | null> = respuestasNucleoIzquierda();
    responderTodo(modulosActivos, respuestas, 0);
    const secuencia = secuenciaItems(modulosActivos, respuestas);
    const ultimoDemocracia = secuencia.reduce(
      (ultimo, item, indice) => (item.modulo === 'democracia-instituciones' ? indice : ultimo),
      -1,
    );
    expect(ultimoDemocracia).toBeGreaterThanOrEqual(0);
    expect(secuencia[ultimoDemocracia + 1]?.modulo).toBe('corrientes-izquierda');

    const estado: Estado = {
      ...ESTADO_INICIAL,
      modo: 'completo',
      fase: 'cuestionario',
      modulosActivos,
      // Nada nuevo que ofrecer: aísla el contrato del avance.
      modulosOfrecidos: MODULOS.map((m) => m.id).filter((id) => id !== 'nucleo'),
      hitoIntermedio150Visto: true,
      respuestas,
      indice: ultimoDemocracia,
    };

    const tras = reductor(estado, { tipo: 'siguiente' });
    // El bug: fase 'cuestionario' apuntando a una pregunta YA respondida.
    if (tras.fase === 'cuestionario') {
      const itemMostrado = secuenciaItems(tras.modulosActivos, tras.respuestas)[tras.indice];
      expect(
        itemMostrado !== undefined && itemMostrado.id in tras.respuestas,
        `re-presenta «${itemMostrado?.id}» ya contestada`,
      ).toBe(false);
    }
    expect(tras.fase).toBe('resultados');
  });

  it('reproduce la traza del tester: aceptar la oferta final no obliga a re-pasar lo ya contestado', () => {
    // 1. Núcleo (izquierda económica) + corrientes-izquierda respondidos del todo.
    const modulosActivos = ['corrientes-izquierda'];
    const respuestas: Record<string, Valor | null> = respuestasNucleoIzquierda();
    responderTodo(modulosActivos, respuestas, 0);
    const secuencia = secuenciaItems(modulosActivos, respuestas);
    const idsContestadosAntes = new Set(
      secuencia.map((item) => item.id).filter((id) => id in respuestas),
    );

    let estado: Estado = {
      ...ESTADO_INICIAL,
      modo: 'completo',
      fase: 'cuestionario',
      modulosActivos,
      modulosOfrecidos: [],
      respuestas,
      indice: secuencia.length - 1,
    };

    // 2. Al terminar la secuencia se ofrecen los bloques desbloqueados…
    estado = reductor(estado, { tipo: 'siguiente' });
    expect(estado.fase).toBe('oferta-modulos');
    // …y el usuario acepta: los módulos nuevos (orden canónico ANTERIOR a
    // corrientes-izquierda) se insertan en medio de la secuencia.
    estado = reductor(estado, { tipo: 'aceptar-oferta-modulos' });
    expect(estado.fase).toBe('cuestionario');
    expect(estado.modulosActivos.length).toBeGreaterThan(1);

    // 3. Responde el resto del recorrido. Contrato: ninguna pantalla del
    // avance presenta una pregunta ya contestada, ni dos veces la misma.
    const vistas = new Set<string>();
    for (let paso = 0; paso < 500 && estado.fase !== 'resultados'; paso += 1) {
      if (estado.fase === 'hito-intermedio') {
        estado = reductor(estado, { tipo: 'seguir-exhaustivo' });
        continue;
      }
      if (estado.fase === 'oferta-modulos') {
        estado = reductor(estado, { tipo: 'rechazar-oferta-modulos' });
        continue;
      }
      expect(estado.fase).toBe('cuestionario');
      const item = secuenciaItems(estado.modulosActivos, estado.respuestas)[estado.indice];
      expect(item).toBeDefined();
      expect(
        idsContestadosAntes.has(item!.id),
        `re-presenta «${item!.id}», contestada antes de aceptar la oferta`,
      ).toBe(false);
      expect(vistas.has(item!.id), `presenta dos veces «${item!.id}»`).toBe(false);
      vistas.add(item!.id);
      estado = reductor(estado, { tipo: 'responder', itemId: item!.id, valor: 0 });
      estado = reductor(estado, { tipo: 'siguiente' });
    }

    // 4. Y el recorrido termina en resultados sin pasos muertos.
    expect(estado.fase).toBe('resultados');
    expect(vistas.size).toBeGreaterThan(0);
  });
});
