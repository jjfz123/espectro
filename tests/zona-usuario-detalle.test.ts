import { describe, expect, it } from 'vitest';
import {
  UMBRAL_ZONA_LEJANA,
  rotuloZona,
  zonaMasCercanaDelPar,
} from '../web/src/zonasCorrientes.js';

/**
 * Contrato del arreglo «izquierda + orden → franquismo» (feedback beta
 * Discord, 2026-07): en los cruces detallados el fondo de Voronoi reparte
 * TODO el plano entre las referencias dibujadas, y en zonas poco pobladas el
 * usuario leía el rótulo de la zona como una etiqueta propia. El plano ahora
 * (1) conserva el periodo histórico en el rótulo y (2) declara debajo la
 * referencia más cercana CON su distancia, avisando de la capa poco poblada.
 */
describe('rótulo de zona con periodo histórico', () => {
  it('conserva el periodo abreviado de los regímenes históricos', () => {
    expect(rotuloZona('Franquismo nacionalcatólico (1945-1957)')).toBe(
      'Franquismo nacionalcatólico 1945-57',
    );
  });

  it('abrevia solo cuando el siglo se repite y respeta otros separadores', () => {
    expect(rotuloZona('Ejemplo (1898-1923)')).toBe('Ejemplo 1898-1923');
    expect(rotuloZona('Ejemplo (1931–1939)')).toBe('Ejemplo 1931-39');
  });

  it('sigue retirando los paréntesis aclaratorios que no son periodos', () => {
    expect(rotuloZona('Corriente (variante doctrinal)')).toBe('Corriente');
  });
});

describe('zona más cercana bajo el punto del usuario', () => {
  it('izquierda + orden nombra a la izquierda social-patriótica CON distancia y aviso', () => {
    // 2026-07-16 (orden del propietario): el franquismo nacionalcatólico ya no
    // proyecta como izquierda económica — su ficha ganó los contrapesos
    // documentados de propiedad privada (Fuero del Trabajo) y fiscalidad
    // regresiva (sin IRPF hasta 1978) y queda en el centro-alto del plano.
    // La zona izquierda+orden pasa a nombrarse por su vecina real.
    const zona = zonaMasCercanaDelPar('economico', 'social', {
      economico: -60,
      social: 70,
    });
    expect(zona).not.toBeNull();
    expect(zona!.id).toBe('izquierda-social-patriotica-espanola');
    // A decenas de unidades del ancla: la advertencia de capa poco poblada aplica.
    expect(zona!.distancia).toBeGreaterThanOrEqual(UMBRAL_ZONA_LEJANA);
    expect(zona!.distancia).toBeLessThan(60);
    expect(zona!.dibujadas).toBeGreaterThanOrEqual(5);
  });

  it('el franquismo nacionalcatólico ya no reclama la esquina izquierda + orden', () => {
    const zona = zonaMasCercanaDelPar('economico', 'social', {
      economico: -60,
      social: 70,
    });
    expect(zona!.id).not.toBe('franquismo-nacionalcatolico-1945-1957');
  });

  it('sin valor en uno de los ejes no se inventa zona', () => {
    expect(zonaMasCercanaDelPar('economico', 'social', { economico: -60, social: null })).toBeNull();
  });

  it('pegado a un ancla, la distancia queda por debajo del umbral de aviso', () => {
    const zona = zonaMasCercanaDelPar('economico', 'social', {
      economico: -100,
      social: 64,
    });
    expect(zona).not.toBeNull();
    expect(zona!.distancia).toBeLessThan(UMBRAL_ZONA_LEJANA);
  });
});
