import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const raiz = join(__dirname, '..');

/**
 * Casilla del TODO «Perfiles monotemáticos o sin datos suficientes no reciben
 * afinidad general espuria y explican exactamente qué puede compararse»: la
 * exclusión del motor ya está fijada en edge-cases.test.ts (ranking vacío);
 * aquí se fija que la interfaz explica la comparación en vez de callarla.
 */
describe('monotemáticos y sin-datos en la interfaz', () => {
  it('la sección de coincidencias específicas renuncia expresamente al porcentaje general', () => {
    const resultados = readFileSync(join(raiz, 'web/src/vistas/Resultados.tsx'), 'utf8');
    expect(resultados).toContain('Coincidencias específicas');
    expect(resultados).toContain('no fabricamos un porcentaje de afinidad general');
    expect(resultados).toContain('coincidenciasMonotematicas');
  });

  it('un perfil sin datos explica qué no puede compararse en su fila del ranking', () => {
    const ranking = readFileSync(join(raiz, 'web/src/componentes/Ranking.tsx'), 'utf8');
    expect(ranking).toContain('no tiene posición conocida en las preguntas que has contestado');
    expect(ranking).toContain('Sin posiciones comparables con tus respuestas');
  });
});
