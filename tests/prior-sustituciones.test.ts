import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

interface Corriente {
  id: string;
  coordenadasPrior: { x: number; y: number };
  coordenadas: { x: number; y: number };
  desviacionJustificada?: string;
  revisionEditorialDoble?: string;
  trazabilidadOriginal?: {
    coordenadasOriginales: { x: number; y: number };
  };
}

const atlas = JSON.parse(
  readFileSync(new URL('../data/mapa-ideologias.json', import.meta.url), 'utf8'),
) as { corrientes: Corriente[] };
const sustituciones = atlas.corrientes.filter((corriente) => corriente.trazabilidadOriginal);

describe('prior auditable de las sustituciones del atlas', () => {
  it('conserva los quince huecos originales sin reiniciar el prior', () => {
    expect(sustituciones).toHaveLength(15);
    for (const corriente of sustituciones) {
      expect(corriente.coordenadasPrior, corriente.id).toEqual(
        corriente.trazabilidadOriginal!.coordenadasOriginales,
      );
    }
  });

  it('documenta los desplazamientos grandes y registra doble revisión sobre 60', () => {
    for (const corriente of sustituciones) {
      const distancia = Math.hypot(
        corriente.coordenadas.x - corriente.coordenadasPrior.x,
        corriente.coordenadas.y - corriente.coordenadasPrior.y,
      );
      if (distancia > 25) {
        expect(corriente.desviacionJustificada?.length, corriente.id).toBeGreaterThanOrEqual(50);
      }
      if (distancia > 60) {
        expect(corriente.revisionEditorialDoble?.length, corriente.id).toBeGreaterThanOrEqual(80);
      }
    }
  });
});
