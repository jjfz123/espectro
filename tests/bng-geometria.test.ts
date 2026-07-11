import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
// El auditor es un CLI ESM deliberadamente reutilizable, sin artefacto TS.
// @ts-expect-error el módulo JavaScript no publica declaraciones de tipos
import { crearAuditoria } from '../scripts/auditar-brujula-partidos.mjs';

interface Posicion {
  valor: number;
  fuente?: { url?: string; cita?: string };
}

interface Perfil {
  id: string;
  nombre: string;
  actividad: string;
  confianza: string;
  posiciones: Record<string, Posicion>;
  [clave: string]: unknown;
}

interface Item {
  id: string;
  estado?: string;
  ejes?: Array<{ eje: string; carga: number }>;
}

interface Atlas {
  sistema: unknown;
  umbrales: unknown;
}

interface Recibo {
  url: string;
  localizador: string | null;
  items: string[];
}

interface ResultadoAuditoria {
  id: string;
  grado: string;
  x: {
    grupos: number;
    items: number;
    recibo: Recibo[];
    omitidos: Array<{ itemId: string; motivo: string }>;
  };
  y: {
    grupos: number;
    items: number;
    recibo: Recibo[];
    omitidos: Array<{ itemId: string; motivo: string }>;
  };
}

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const leer = <T>(ruta: string): T =>
  JSON.parse(readFileSync(join(RAIZ, ruta), 'utf8')) as T;

const bng = leer<Perfil>('data/partidos/bng.json');
const atlas = leer<Atlas>('data/mapa-ideologias.json');
const items = readdirSync(join(RAIZ, 'data/items'))
  .filter((fichero) => fichero.endsWith('.json') && !fichero.startsWith('_'))
  .sort()
  .flatMap((fichero) => leer<Item[]>(`data/items/${fichero}`))
  .filter((item) => item.estado !== 'retirado');
const resultado = (
  crearAuditoria({ items, partidos: [bng], atlas }) as {
    resultados: ResultadoAuditoria[];
  }
).resultados[0];

describe('recibo metodológico del BNG en Propiedad × Poder', () => {
  it('no convierte reglas internas ni un proceso constituyente en respuestas ciudadanas distintas', () => {
    expect(bng.posiciones['dem-002']).toBeUndefined();
    expect(bng.posiciones['dem-011']).toBeUndefined();
    expect(bng.posiciones['dr-001']).toBeUndefined();
    expect(bng.posiciones['dem-005']?.valor).toBe(-2);
    expect(bng.posiciones['izq-038']?.valor).toBe(-2);
  });

  it('descarta documentos sin localizador y separa pasajes realmente localizados', () => {
    expect(resultado).toBeDefined();
    for (const itemId of ['dem-013', 'dem-015', 'izq-018']) {
      expect(resultado?.y.recibo.some((grupo) => grupo.items.includes(itemId))).toBe(false);
      expect(resultado?.y.omitidos).toContainEqual({
        itemId,
        motivo: 'sin pasaje o localizador reproducible',
      });
    }

    const programa2024 = resultado?.x.recibo.filter((grupo) =>
      grupo.url.includes('24_bng_galegas_programa_goberno.pdf'),
    );
    expect(programa2024?.filter((grupo) => grupo.items.includes('eco-006'))).toHaveLength(1);
    expect(programa2024?.filter((grupo) => grupo.items.includes('eco-012'))).toHaveLength(1);
    expect(
      programa2024?.find((grupo) => grupo.items.includes('eco-006'))?.localizador,
    ).not.toBe(
      programa2024?.find((grupo) => grupo.items.includes('eco-012'))?.localizador,
    );
  });

  it('calcula desde posiciones directas y deja fuera cualquier herencia o coordenada editorial', () => {
    for (const campo of [
      'heredaDe',
      'perfilBase',
      'posicionesHeredadas',
      'coordenada',
      'coordenadas',
      'publicacionMapa',
    ]) {
      expect(bng[campo]).toBeUndefined();
    }
    expect(resultado?.id).toBe('bng');
  });
});
