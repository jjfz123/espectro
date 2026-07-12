import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const raiz = join(__dirname, '..');

/**
 * Casilla del TODO «La limitación metodológica es visible: ejes normativos,
 * datos autodeclarados, cobertura desigual, error de medición, fecha de corte
 * y diferencia entre doctrina, programa, discurso y conducta»: la vista de
 * metodología debe nombrar las seis limitaciones, no darlas por sabidas.
 */
describe('limitaciones metodológicas visibles', () => {
  const fuente = readFileSync(join(raiz, 'web/src/vistas/Metodologia.tsx'), 'utf8');

  it('la vista de metodología nombra las seis limitaciones de la casilla', () => {
    expect(fuente).toContain('constructos normativos');
    expect(fuente).toContain('autodeclarados');
    expect(fuente).toContain('cobertura es desigual');
    expect(fuente).toContain('error de medición');
    expect(fuente).toContain('fecha de corte');
    expect(fuente).toContain('Doctrina, programa, discurso y conducta');
  });

  it('no promete precisión: el error de medición desaconseja leer decimales como reales', () => {
    expect(fuente).toMatch(/ningún decimal debe leerse como precisión real/);
  });
});
