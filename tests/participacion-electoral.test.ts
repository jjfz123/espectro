import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  seleccionarPartidosElectorales,
  type ConvocatoriaElectoral,
  type Partido,
} from '../src/engine/index.js';
import { contextoParticipacionPorPartido } from '../web/src/participacionElectoral.js';

const raiz = join(__dirname, '..');

function leerDirectorio<T>(ruta: string): T[] {
  return readdirSync(join(raiz, ruta))
    .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
    .map((f) => JSON.parse(readFileSync(join(raiz, ruta, f), 'utf8')) as T);
}

const PARTIDOS = leerDirectorio<Partido>('data/partidos');
const CONVOCATORIAS = leerDirectorio<ConvocatoriaElectoral>('data/convocatorias');

/**
 * Implicación de producto documentada (tanda familia comunista + caso Madrid):
 * la mayor afinidad puede ser un perfil que no existe como papeleta con su
 * nombre. El ranking añade una línea factual «concurre dentro de la
 * candidatura X» a los perfiles que solo aparecen como componente.
 */
describe('contexto de participación electoral en el ranking', () => {
  it('IU concurre dentro de Sumar en las generales de 2023 y el ranking lo dice', () => {
    const seleccion = seleccionarPartidosElectorales(PARTIDOS, CONVOCATORIAS, {
      tipo: 'generales',
    });
    const contexto = contextoParticipacionPorPartido(seleccion);
    expect(contexto.get('iu')).toMatch(/concurre dentro de la candidatura SUMAR/i);
  });

  it('Alianza Verde y Verdes Equo llevan su candidatura en las autonómicas de Madrid (caso del propietario)', () => {
    const seleccion = seleccionarPartidosElectorales(PARTIDOS, CONVOCATORIAS, {
      tipo: 'autonomicas',
      ccaa: 'madrid',
    });
    const contexto = contextoParticipacionPorPartido(seleccion);
    expect(contexto.get('alianza-verde')).toMatch(/concurre dentro de la candidatura/i);
    expect(contexto.get('verdes-equo')).toMatch(/concurre dentro de la candidatura/i);
  });

  it('un partido con papeleta propia nunca recibe la línea de componente', () => {
    const seleccion = seleccionarPartidosElectorales(PARTIDOS, CONVOCATORIAS, {
      tipo: 'generales',
    });
    const contexto = contextoParticipacionPorPartido(seleccion);
    for (const conPapeleta of ['pp', 'psoe', 'vox', 'pacma']) {
      expect(contexto.has(conPapeleta), conPapeleta).toBe(false);
    }
  });

  it('el ranking principal de resultados recibe el contexto de participación', () => {
    const fuente = readFileSync(join(raiz, 'web/src/vistas/Resultados.tsx'), 'utf8');
    const usos = fuente.match(/contextoPorEntidad=\{contextoParticipacion\}/gu) ?? [];
    expect(usos.length).toBeGreaterThanOrEqual(2);
  });
});
