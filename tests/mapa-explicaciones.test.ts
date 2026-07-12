import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const raiz = join(__dirname, '..');

/**
 * Casilla del TODO «Los planos adicionales y el cubo explican qué miden, qué
 * no miden, cobertura/incertidumbre y por qué pueden discrepar del primer
 * plano»: las cuatro explicaciones deben estar en la interfaz, no solo en la
 * documentación.
 */
describe('planos y cubo: explicaciones obligatorias', () => {
  // El JSX parte las frases en varias líneas: se compara con espacios normalizados.
  const normalizar = (s: string) => s.replace(/\s+/gu, ' ');
  const mapa = normalizar(readFileSync(join(raiz, 'web/src/componentes/MapaPolitico.tsx'), 'utf8'));
  const cubo = normalizar(readFileSync(join(raiz, 'web/src/componentes/Mapa3D.tsx'), 'utf8'));

  it('cada plano declara su cobertura y no inventa posiciones', () => {
    expect(mapa).toContain('En este plano');
    expect(mapa).toContain('Nunca se dibuja una posición inventada');
  });

  it('los planos explican la discrepancia entre cruces (un eje queda fuera)', () => {
    expect(mapa).toContain('coincidir contigo en economía y quedar lejos en autogobierno');
    expect(mapa).toContain('cada plano ignora el tercer eje');
  });

  it('el cubo explica qué mide, qué no mide y su incertidumbre', () => {
    expect(cubo).toContain('Qué mide cada eje del cubo');
    expect(cubo).toContain('las demás facetas medidas quedan en tu perfil por facetas');
    expect(cubo).toContain('no una recomendación');
    expect(cubo).toContain('Sin posición completa en los tres ejes; no se dibuja tu punto');
  });

  it('la incertidumbre geométrica se declara donde se leen cercanías', () => {
    expect(mapa).toContain('con otro modelo de distancia');
    expect(cubo).toContain('la distancia es geométrica y orientativa');
  });
});
