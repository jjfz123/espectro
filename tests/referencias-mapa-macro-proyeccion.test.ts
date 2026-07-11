import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  coordenadaAuditable,
  EJES_ESPACIO,
  proyectarEnEspacio,
  proyectarPartidoEnEspacio,
} from '../src/engine/index.js';
import type { Eje, Item, PerfilAfinidad, ReferenciaDoctrinal } from '../src/engine/index.js';

/**
 * Regresión de la casilla «partidos y referencias en su posición real»: fija
 * que la coordenada DIBUJABLE de una entidad en los planos macro (Economía ×
 * Sociedad) es exactamente la proyección del motor sobre sus posiciones
 * documentadas, sin ninguna coordenada ni desplazamiento pegado a mano en la
 * ficha. web/src/mapaEspacial.ts consume `proyectarEnEspacio` /
 * `proyectarPartidoEnEspacio` y asigna `valores[eje] = faceta.valor` sin
 * transformarlo; este test protege ese contrato desde el motor.
 *
 * Complementa (no duplica) a bng-geometria y partidos-regionales-geometria,
 * que fijan la ausencia de coordenada editorial en los partidos pero sobre el
 * plano Propiedad/mercado × Poder; aquí se cubre el plano macro y, en concreto,
 * las referencias doctrinales que la tanda «poblar Economía × Sociedad» hace
 * dibujables.
 */

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const leer = <T>(ruta: string): T => JSON.parse(readFileSync(join(RAIZ, ruta), 'utf8')) as T;

const EJES_REALES = leer<Eje[]>('data/ejes.json');
const EJE_ECONOMICO = EJES_REALES.find((eje) => eje.id === 'economico')!;
const EJE_SOCIAL = EJES_REALES.find((eje) => eje.id === 'social')!;
const PAR_MACRO: Eje[] = [EJE_ECONOMICO, EJE_SOCIAL];
const EJES_MACRO = ['economico', 'social'] as const;

const ITEMS = readdirSync(join(RAIZ, 'data/items'))
  .filter((fichero) => fichero.endsWith('.json') && !fichero.startsWith('_'))
  .sort()
  .flatMap((fichero) => leer<Item[]>(`data/items/${fichero}`))
  .filter((item) => item.estado !== 'retirado');
const ITEM_POR_ID = new Map(ITEMS.map((item) => [item.id, item]));

/** Campos que, de existir en una ficha, delatarían una coordenada o un
 *  desplazamiento pegado a mano en lugar de la proyección del motor. */
const CAMPOS_COORDENADA_MANUAL = [
  'coordenadas',
  'coordenada',
  'valores',
  'posicionMapa',
  'desplazamiento',
  'offset',
  'ajuste',
  'x',
  'y',
] as const;

/**
 * Reimplementación INDEPENDIENTE del contrato documentado de `calcularFacetas`
 * (docs/investigacion/ESPACIO-EJES.md):
 *   eje = redondear( 100 · Σ vᵢ·cᵢ / (2 · Σ |cᵢ|), 1 )
 * sobre los ítems posicionados con carga finita no nula en el eje. No invoca al
 * motor: si el motor introdujera un desplazamiento, ambos números divergirían.
 */
function reproyectarMacro(posiciones: PerfilAfinidad['posiciones'], ejeId: string): number | null {
  let numerador = 0;
  let carga = 0;
  for (const item of ITEMS) {
    const posicion = posiciones[item.id];
    if (typeof posicion?.valor !== 'number') continue;
    for (const entrada of item.ejes ?? []) {
      if (entrada.eje !== ejeId || !Number.isFinite(entrada.carga) || entrada.carga === 0) continue;
      numerador += posicion.valor * entrada.carga;
      carga += Math.abs(entrada.carga);
    }
  }
  if (carga <= 0) return null;
  return Math.round(((100 * numerador) / (2 * carga)) * 10) / 10;
}

// Las cinco referencias que la tanda hace dibujables en Economía × Sociedad.
const REFERENCIAS_DIBUJADAS = [
  'conservadurismo-liberal-europeo',
  'democracia-cristiana',
  'plataformismo-anarcocomunista',
  'luxemburguismo',
  'eurocomunismo',
] as const;

describe('la coordenada macro dibujable proviene solo de la proyección documentada', () => {
  it('economico y social siguen siendo los macroejes del espacio', () => {
    expect(EJES_ESPACIO).toContain('economico');
    expect(EJES_ESPACIO).toContain('social');
  });

  it.each(REFERENCIAS_DIBUJADAS)(
    '%s entra en Economía × Sociedad con la coordenada exacta que reproyecta el motor, sin desplazamiento manual',
    (id) => {
      const referencia = leer<ReferenciaDoctrinal>(`data/referencias/${id}.json`);
      const campos = referencia as unknown as Record<string, unknown>;

      // 1) Ninguna coordenada ni desplazamiento pegado a mano en la ficha.
      for (const campo of CAMPOS_COORDENADA_MANUAL) {
        expect(campos[campo], `${id} no debe declarar «${campo}»`).toBeUndefined();
      }
      // 2) Sin veto: el plano macro puede publicarla.
      expect(referencia.publicacionMapa?.publicable).not.toBe(false);

      // 3) El motor la incluye en el par economico × social.
      const proyeccion = proyectarEnEspacio(referencia, ITEMS, PAR_MACRO);
      expect(proyeccion.incluida, `${id} debe dibujarse en Economía × Sociedad`).toBe(true);

      // 4) La coordenada dibujable coincide EXACTAMENTE con la reproyección
      //    independiente de las posiciones documentadas.
      for (const ejeId of EJES_MACRO) {
        const faceta = proyeccion.facetas.find((entrada) => entrada.facetaId === ejeId);
        expect(faceta?.valor).toBeTypeOf('number');
        expect(faceta?.valor, `${id}/${ejeId} debe ser la reproyección pura`).toBe(
          reproyectarMacro(referencia.posiciones, ejeId),
        );
      }
    },
  );

  it('falangismo-fe-jons-1934 NO se dibuja en Economía × Sociedad: sus anclas sociales no llegan a cuatro pasajes independientes', () => {
    /* Guardia de la revisión adversarial: dos posiciones que comparten el
       mismo pasaje documental (punto 13) no pueden sumar dos evidencias del
       eje social. Al retirarse eco-007, el eje queda con tres anclas y la
       referencia permanece honestamente fuera del plano; si alguien vuelve a
       cruzar el umbral duplicando un pasaje, este test lo detiene. */
    const referencia = leer<ReferenciaDoctrinal>(
      'data/referencias/falangismo-fe-jons-1934.json',
    );
    expect(referencia.posiciones['eco-007']).toBeUndefined();
    const social = Object.entries(referencia.posiciones).filter(([itemId]) =>
      (ITEM_POR_ID.get(itemId)?.ejes ?? []).some(
        (entrada) => entrada.eje === 'social' && entrada.carga !== 0,
      ),
    );
    expect(social.length).toBeLessThan(4);
    const proyeccion = proyectarEnEspacio(referencia, ITEMS, PAR_MACRO);
    expect(proyeccion.incluida).toBe(false);
  });
});

describe('la coordenada macro de un partido es su recibo documental, no una coordenada editorial', () => {
  const PARTIDOS_MUESTRA = ['psoe', 'pp', 'vox'] as const;

  it.each(PARTIDOS_MUESTRA)(
    '%s proyecta su punto macro desde el recibo auditable, sin coordenada pegada a mano',
    (id) => {
      const partido = leer<PerfilAfinidad>(`data/partidos/${id}.json`);
      const campos = partido as unknown as Record<string, unknown>;

      for (const campo of CAMPOS_COORDENADA_MANUAL) {
        expect(campos[campo], `${id} no debe declarar «${campo}»`).toBeUndefined();
      }

      const proyeccion = proyectarPartidoEnEspacio(partido, ITEMS, PAR_MACRO);
      for (const ejeId of EJES_MACRO) {
        const faceta = proyeccion.facetas.find((entrada) => entrada.facetaId === ejeId);
        // El valor dibujable es la coordenada auditable de los grupos
        // documentales deduplicados, no un número almacenado en la ficha.
        const auditable = coordenadaAuditable(partido.posiciones, ejeId, ITEM_POR_ID);
        expect(faceta?.valor).toBe(auditable.valor);
      }
    },
  );
});
