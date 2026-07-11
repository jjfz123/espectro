import { describe, expect, it } from 'vitest';
import {
  dimensionesCaptura,
  distribuirFilasResumen,
  FACETAS_POR_CAPTURA,
  numeroPaginasFacetas,
} from '../web/src/capturaResultado';

describe('contrato de capturas de resultados', () => {
  it('mantiene formatos explícitos para compartir y guardar', () => {
    expect(dimensionesCaptura('resumen')).toEqual({ ancho: 1_200, alto: 630 });
    expect(dimensionesCaptura('brujula')).toEqual({ ancho: 1_080, alto: 1_080 });
    expect(dimensionesCaptura('afinidades')).toEqual({ ancho: 1_080, alto: 1_350 });
    expect(dimensionesCaptura('facetas')).toEqual({ ancho: 1_080, alto: 1_350 });
  });

  it('pagina las facetas sin producir una descarga automática por eje', () => {
    expect(FACETAS_POR_CAPTURA).toBeGreaterThanOrEqual(6);
    expect(FACETAS_POR_CAPTURA).toBeLessThanOrEqual(8);
    expect(numeroPaginasFacetas(0)).toBe(1);
    expect(numeroPaginasFacetas(7)).toBe(1);
    expect(numeroPaginasFacetas(8)).toBe(2);
    expect(numeroPaginasFacetas(29)).toBe(5);
  });

  it('reserva altura real a nombres de dos líneas en el resumen', () => {
    const filas = distribuirFilasResumen([2, 2, 2]);

    expect(filas).toHaveLength(3);
    for (const [indice, fila] of filas.entries()) {
      const ultimaLineaY = fila.nombreY + 24;
      expect(fila.metadatosY).toBeGreaterThan(ultimaLineaY);
      if (indice > 0) {
        expect(fila.nombreY).toBeGreaterThan(filas[indice - 1]!.metadatosY);
      }
    }
    expect(filas.at(-1)!.metadatosY).toBeLessThanOrEqual(510);
  });
});
