import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { PARTIDOS_COMPARTIBLES } from '../web/src/datosCompartidos';

describe('índice ligero de partidos para enlaces compartidos', () => {
  it('coincide exactamente con id, nombre y siglas de todos los perfiles reales', () => {
    const directorio = resolve(import.meta.dirname, '../data/partidos');
    const canonicos = readdirSync(directorio)
      .filter((archivo) => archivo.endsWith('.json') && !archivo.startsWith('_'))
      .sort((a, b) => a.localeCompare(b))
      .map((archivo) => JSON.parse(readFileSync(resolve(directorio, archivo), 'utf8')) as {
        id: string;
        nombre: string;
        siglas?: string;
        demo?: boolean;
      })
      .filter((partido) => !partido.demo)
      .map(({ id, nombre, siglas }) => ({ id, nombre, ...(siglas ? { siglas } : {}) }))
      .sort((a, b) => a.id.localeCompare(b.id, 'es'));

    expect([...PARTIDOS_COMPARTIBLES].sort((a, b) => a.id.localeCompare(b.id, 'es'))).toEqual(
      canonicos,
    );
    expect(new Set(PARTIDOS_COMPARTIBLES.map((partido) => partido.id)).size).toBe(
      PARTIDOS_COMPARTIBLES.length,
    );
  });
});
