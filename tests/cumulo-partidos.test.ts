import { describe, expect, it } from 'vitest';
import { idsPartidosEnCumulo } from '../web/src/cumuloPartidos.js';

describe('resolución geométrica de partidos próximos', () => {
  const puntos = [
    { id: 'origen', cx: 100, cy: 100 },
    { id: 'solapado', cx: 120, cy: 110 },
    { id: 'borde', cx: 132, cy: 100 },
    { id: 'lejano', cx: 133, cy: 100 },
  ];

  it('incluye el propio punto y todos los que interceptan su radio táctil', () => {
    expect(idsPartidosEnCumulo(puntos, 'origen')).toEqual([
      'origen',
      'solapado',
      'borde',
    ]);
  });

  it('no inventa cúmulos para ids ausentes ni radios inválidos', () => {
    expect(idsPartidosEnCumulo(puntos, 'ausente')).toEqual([]);
    expect(idsPartidosEnCumulo(puntos, 'origen', -1)).toEqual([]);
    expect(idsPartidosEnCumulo(puntos, 'origen', Number.NaN)).toEqual([]);
  });
});
