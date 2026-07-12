import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const raiz = join(__dirname, '..');

/**
 * Casilla del TODO «Las corrientes sensibles o violentas usan lenguaje
 * clínico, no gamificado, requieren evidencia combinada y no aparecen en
 * capturas predeterminadas ni como identidad afirmada».
 */
describe('corrientes sensibles: contrato completo', () => {
  const referencias = readdirSync(join(raiz, 'data/referencias'))
    .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
    .map((f) => JSON.parse(readFileSync(join(raiz, 'data/referencias', f), 'utf8')));

  it('toda referencia sensible exige evidencia combinada (triple llave con suelo)', () => {
    for (const referencia of referencias) {
      if (!referencia.sensibilidad || referencia.sensibilidad === 'normal') continue;
      const regla = referencia.reglaPublicacion;
      expect(regla, `${referencia.id} sin reglaPublicacion`).toBeDefined();
      expect(regla.minimoItems, referencia.id).toBeGreaterThanOrEqual(3);
      expect(regla.minimoCobertura, referencia.id).toBeGreaterThanOrEqual(0.5);
      expect(regla.umbralAfinidad, referencia.id).toBeGreaterThanOrEqual(78);
    }
  });

  it('la ficha usa lenguaje clínico y niega la identidad afirmada', () => {
    const ficha = readFileSync(join(raiz, 'web/src/componentes/FichaIdeologia.tsx'), 'utf8')
      .replace(/\s+/gu, ' ');
    expect(ficha).toContain('no implica pertenencia, militancia, delito ni intención violenta');
    const referenciasVista = readFileSync(
      join(raiz, 'web/src/componentes/ReferenciasDoctrinales.tsx'),
      'utf8',
    ).replace(/\s+/gu, ' ');
    expect(referenciasVista).toContain('No dicen «eres X»');
  });

  it('la enciclopedia presenta las entradas sensibles con aviso clínico propio', () => {
    const enciclopedia = readFileSync(join(raiz, 'web/src/vistas/Enciclopedia.tsx'), 'utf8')
      .replace(/\s+/gu, ' ');
    expect(enciclopedia).toContain('patrón sensible documentado');
    expect(enciclopedia).toContain('nunca se presenta como identidad de nadie');
  });

  it('las capturas predeterminadas no dibujan zonas del atlas (ninguna corriente sale en la tarjeta)', () => {
    const captura = readFileSync(join(raiz, 'web/src/capturaResultado.ts'), 'utf8');
    expect(captura).not.toMatch(/mapa-zona|CorrienteAtlas|corrientesAtlas|CapaCorrientes/u);
  });

  it('el validador rechaza referencias sensibles sin triple llave', () => {
    const validador = readFileSync(join(raiz, 'scripts/validate-data.mjs'), 'utf8');
    expect(validador).toContain('referencia sensible sin reglaPublicacion');
    expect(validador).toContain('triple llave por debajo del suelo');
  });
});
