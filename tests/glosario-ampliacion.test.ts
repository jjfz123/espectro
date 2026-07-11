import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Termino } from '../src/engine/index.js';

/**
 * Contrato de la ampliación del glosario (feedback del propietario): el «?»
 * profundiza sin dejar de ser neutral. La ampliación explica funcionamiento,
 * datos duros y qué defiende cada lado; JAMÁS insinúa hacia dónde puntúa la
 * pregunta ni convierte la ayuda en consejo.
 */

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const TERMINOS = JSON.parse(
  readFileSync(join(RAIZ, 'data/glosario.json'), 'utf8'),
) as Termino[];

/* La primera tanda de ampliaciones: el término del primer ítem con glosario
   del modo rápido (autodeterminación, ter-002) más los técnicos donde el
   feedback señalaba que la definición se queda corta. Si alguien las retira,
   este test lo detiene: la ayuda no va a menos. */
const AMPLIADOS_TANDA_1 = [
  'autodeterminacion',
  'concierto-economico',
  'foralismo',
  'ordinalidad',
  'ref-canario',
  'mochila-austriaca',
  'impuesto-plano',
  'pensiones-capitalizacion',
  'educacion-concertada',
  'democracia-organica',
  'sindicato-vertical',
  'consejo-general-poder-judicial',
  'prision-permanente-revisable',
] as const;

/* Formulaciones que delatarían una pista de puntuación o un consejo: la
   ampliación explica el debate, nunca la mecánica del test ni una dirección. */
const PISTAS_PROHIBIDAS = [
  /puntúa/iu,
  /puntuaci[oó]n/iu,
  /te acerca/iu,
  /te aleja/iu,
  /suma puntos/iu,
  /marca «?de acuerdo»?/iu,
  /deber[íi]as (responder|marcar|contestar)/iu,
  /la respuesta correcta/iu,
];

describe('ampliaciones del glosario', () => {
  it.each(AMPLIADOS_TANDA_1)('%s conserva su ampliación', (id) => {
    const termino = TERMINOS.find((t) => t.id === id);
    expect(termino, `el término ${id} debe existir`).toBeDefined();
    expect(termino?.ampliacion, `${id} debe conservar su ampliación`).toBeTypeOf('string');
    expect((termino?.ampliacion ?? '').length).toBeGreaterThanOrEqual(200);
    expect((termino?.ampliacion ?? '').length).toBeLessThanOrEqual(900);
  });

  it('ninguna ampliación insinúa la puntuación ni aconseja una respuesta', () => {
    for (const termino of TERMINOS) {
      if (!termino.ampliacion) continue;
      for (const pista of PISTAS_PROHIBIDAS) {
        expect(
          pista.test(termino.ampliacion),
          `${termino.id}: la ampliación no debe casar con ${pista}`,
        ).toBe(false);
      }
    }
  });

  it('toda ampliación acompaña a una definición previa y no la sustituye', () => {
    for (const termino of TERMINOS) {
      if (!termino.ampliacion) continue;
      expect(termino.definicion.length).toBeGreaterThanOrEqual(80);
      expect(
        termino.ampliacion === termino.definicion,
        `${termino.id}: la ampliación no puede ser una copia de la definición`,
      ).toBe(false);
    }
  });
});
