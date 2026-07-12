import { describe, expect, it } from 'vitest';
import { modulosDesbloqueados } from '../src/engine/index.js';
import { MODULOS } from '../web/src/datos.js';

/**
 * Casilla del TODO «Equilibrar los solapes y umbrales de desbloqueo entre
 * familias»: a distancias simétricas del centro se desbloquea el MISMO número
 * de módulos por señal de eje a cada lado. Las excepciones estructurales
 * quedan fuera del recuento con su motivo: ecología y territorial abren un
 * módulo cuyo contenido ES el polo (no existe un «anti-verde» que equilibrar)
 * y los módulos por CCAA o manuales no son señal de eje.
 */

function porSenalDeEje(ejesUsuario: Record<string, number | null>): string[] {
  return modulosDesbloqueados(MODULOS, ejesUsuario).filter((id) => {
    const modulo = MODULOS.find((m) => m.id === id);
    const tipo = modulo?.desbloqueo.tipo;
    return tipo === 'eje' || tipo === 'eje-banda';
  });
}

describe('simetría de desbloqueos por señal de eje', () => {
  it('eje económico: mismo número de módulos a ambos lados en todo el barrido', () => {
    for (const distancia of [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 80, 90]) {
      const izquierda = porSenalDeEje({ economico: -distancia, social: 0 });
      const derecha = porSenalDeEje({ economico: distancia, social: 0 });
      expect(
        izquierda.length,
        `econ ±${distancia}: izq [${izquierda.join(', ')}] vs der [${derecha.join(', ')}]`,
      ).toBe(derecha.length);
    }
  });

  it('eje social: mismo número de módulos a ambos lados en todo el barrido', () => {
    for (const distancia of [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70]) {
      const libertades = porSenalDeEje({ economico: 0, social: -distancia });
      const orden = porSenalDeEje({ economico: 0, social: distancia });
      expect(
        libertades.length,
        `social ±${distancia}: libertades [${libertades.join(', ')}] vs orden [${orden.join(', ')}]`,
      ).toBe(orden.length);
    }
  });

  it('las bandas del centro son espejo: solape simétrico alrededor del cero económico', () => {
    const sd = MODULOS.find((m) => m.id === 'socialdemocracia-reformismo')?.desbloqueo;
    const centro = MODULOS.find((m) => m.id === 'centro-liberalismo')?.desbloqueo;
    expect(sd?.max).toBe(-(centro?.min ?? Number.NaN));
    expect(sd?.min).toBe(-(centro?.max ?? Number.NaN));
  });

  it('identidad-cultura es de la familia generales y está disponible para todo el mundo', () => {
    const identidad = MODULOS.find((m) => m.id === 'identidad-cultura');
    expect(identidad?.desbloqueo.tipo).toBe('siempre');
  });
});
