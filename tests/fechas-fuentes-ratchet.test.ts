import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const raiz = join(__dirname, '..');

function posicionesSinFecha(carpeta: string): string[] {
  const sinFecha: string[] = [];
  for (const fichero of readdirSync(join(raiz, carpeta))) {
    if (!fichero.endsWith('.json') || fichero.startsWith('_')) continue;
    const dato = JSON.parse(readFileSync(join(raiz, carpeta, fichero), 'utf8')) as {
      id?: string;
      posiciones?: Record<string, { fuente?: { fecha?: string } }>;
    };
    for (const [itemId, posicion] of Object.entries(dato.posiciones ?? {})) {
      if (!posicion.fuente?.fecha) sinFecha.push(`${dato.id ?? fichero}:${itemId}`);
    }
  }
  return sinFecha;
}

/**
 * Casilla del TODO «Programas, entrevistas, declaraciones y conducta
 * parlamentaria se versionan por ventana temporal»: el mecanismo (ventanas de
 * doble lectura, perfiles de época, fecha por fuente) existe; este trinquete
 * garantiza que la deuda de fechas SOLO DECRECE. Si añades posiciones, ponles
 * fecha; si fechas antiguas, baja el tope aquí en el mismo commit.
 */
describe('trinquete de fechas en las fuentes', () => {
  it('posiciones de partidos sin fecha: nunca más de las heredadas (160, 2026-07-12)', () => {
    const sinFecha = posicionesSinFecha('data/partidos');
    expect(sinFecha.length, sinFecha.slice(0, 8).join(', ')).toBeLessThanOrEqual(160);
  });

  it('posiciones de referencias doctrinales sin fecha: nunca más de las heredadas (72 tras el lote del 2026-07-12)', () => {
    const sinFecha = posicionesSinFecha('data/referencias');
    expect(sinFecha.length, sinFecha.slice(0, 8).join(', ')).toBeLessThanOrEqual(72);
  });
});
