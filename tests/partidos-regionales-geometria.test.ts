import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
// El auditor es un CLI ESM deliberadamente reutilizable, sin artefacto TS.
// @ts-expect-error el módulo JavaScript no publica declaraciones de tipos
import { cargarAuditoria, crearAuditoria, evidenciaIndependiente, normalizarUrl } from '../scripts/auditar-brujula-partidos.mjs';

interface Fuente {
  url?: string;
  cita?: string;
}

interface Posicion {
  valor: number;
  justificacion?: string;
  calidadEvidencia?: string;
  fuente?: Fuente;
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

interface Contrato {
  sistema: {
    subdimensionesX: Record<string, string[]>;
    familiasY: Record<string, string[]>;
    familiasNucleoY: string[];
  };
  umbrales: Record<string, number>;
}

interface Recibo {
  url: string;
  localizador: string | null;
  items: string[];
}

interface EjeAuditado {
  items: number;
  grupos: number;
  gruposNucleo: number;
  recibo: Recibo[];
  omitidos: Array<{ itemId: string; motivo: string }>;
}

interface Resultado {
  id: string;
  grado: 'solida' | 'provisional' | 'insuficiente';
  x: EjeAuditado;
  y: EjeAuditado;
  problemas: string[];
}

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const leer = <T>(ruta: string): T =>
  JSON.parse(readFileSync(join(RAIZ, ruta), 'utf8')) as T;

const idsRegionales = [
  'erc',
  'junts',
  'cup',
  'eaj-pnv',
  'eh-bildu',
  'mas-madrid',
  'compromis',
  'geroa-bai',
] as const;
const perfiles = Object.fromEntries(
  idsRegionales.map((id) => [id, leer<Perfil>(`data/partidos/${id}.json`)]),
) as Record<(typeof idsRegionales)[number], Perfil>;
const contrato = leer<Contrato>('data/mapa-ideologias.json');
const items = readdirSync(join(RAIZ, 'data/items'))
  .filter((fichero) => fichero.endsWith('.json') && !fichero.startsWith('_'))
  .sort()
  .flatMap((fichero) => leer<Item[]>(`data/items/${fichero}`))
  .filter((item) => item.estado !== 'retirado');
const resultados = new Map(
  (
    crearAuditoria({ items, partidos: Object.values(perfiles), atlas: contrato }) as {
      resultados: Resultado[];
    }
  ).resultados.map((resultado) => [resultado.id, resultado]),
);

describe('evidencia independiente de la tanda regional', () => {
  it('normaliza orden y rastreadores de una URL antes de formar el grupo', () => {
    expect(normalizarUrl('https://Ejemplo.es/doc/?b=2&utm_source=x&a=1#pagina')).toBe(
      'https://ejemplo.es/doc?a=1&b=2',
    );
  });

  it('una misma frase acredita un grupo, no un grupo por ID', () => {
    const compromis = resultados.get('compromis');
    const sanidad = compromis?.x.recibo.find(
      (grupo) =>
        grupo.items.includes('eco-002') && grupo.items.includes('eco-013'),
    );
    expect(sanidad).toBeDefined();
    expect(compromis?.x.grupos).toBeLessThan(compromis?.x.items ?? 0);
  });

  it('dos pasajes localizados del mismo PDF pueden sostener pruebas distintas', () => {
    const cup = resultados.get('cup');
    const propiedad = cup?.x.recibo.filter((grupo) =>
      grupo.url.includes('PONENCIA-FINAL-AN-CUP.pdf'),
    );
    const estado = propiedad?.find((grupo) => grupo.items.includes('lab-016'));
    const cooperativas = propiedad?.find((grupo) => grupo.items.includes('lab-039'));
    expect(estado?.localizador).toBeTruthy();
    expect(cooperativas?.localizador).toBeTruthy();
    expect(estado?.localizador).not.toBe(cooperativas?.localizador);
  });

  it('un cero solo cuenta con una resolución explícita y localizable', () => {
    const gruposX = Object.entries(contrato.sistema.subdimensionesX);
    const cup = evidenciaIndependiente(perfiles.cup.posiciones, gruposX) as EjeAuditado;
    const pnv = evidenciaIndependiente(perfiles['eaj-pnv'].posiciones, gruposX) as EjeAuditado;
    const geroa = evidenciaIndependiente(perfiles['geroa-bai'].posiciones, gruposX) as EjeAuditado;

    expect(cup.recibo.some((grupo) => grupo.items.includes('lab-039'))).toBe(true);
    expect(pnv.recibo.some((grupo) => grupo.items.includes('eco-002'))).toBe(true);
    expect(pnv.omitidos.map(({ itemId }) => itemId)).toEqual(
      expect.arrayContaining(['eco-011', 'eco-014']),
    );
    expect(geroa.omitidos.map(({ itemId }) => itemId)).toEqual(
      expect.arrayContaining(['eco-013', 'ene-005']),
    );
  });
});

describe('correcciones semánticas regionales', () => {
  it('no usa revocación interna como revocatoria ciudadana ni participación como referéndum habitual', () => {
    expect(perfiles['eaj-pnv'].posiciones['dem-002']).toBeUndefined();
    expect(perfiles['eh-bildu'].posiciones['dem-002']).toBeUndefined();
    expect(perfiles['mas-madrid'].posiciones['dem-001']).toBeUndefined();
    expect(perfiles.compromis.posiciones['dem-001']).toBeUndefined();
    expect(perfiles['geroa-bai'].posiciones['dem-001']).toBeUndefined();
  });

  it('distingue control estatal, control colectivo y cooperativización en la CUP', () => {
    expect(perfiles.cup.posiciones['lab-016']?.valor).toBe(1);
    expect(perfiles.cup.posiciones['lab-017']?.valor).toBe(-2);
    expect(perfiles.cup.posiciones['lab-039']?.valor).toBe(0);
    expect(perfiles.cup.posiciones['lab-016']?.fuente?.cita).toContain('control públic');
    expect(perfiles.cup.posiciones['lab-017']?.fuente?.cita).toContain('banca pública');
    expect(perfiles.cup.posiciones['lab-039']?.fuente?.cita).toContain('cooperatives');
    expect(perfiles.cup.posiciones['soc-001']?.fuente?.url).toBe('https://feminisme.cup.cat/');
  });

  it('retira inferencias que no contestan el instrumento exacto del ítem', () => {
    expect(perfiles.compromis.posiciones['dr-001']).toBeUndefined();
    expect(perfiles.compromis.posiciones['eco-014']).toBeUndefined();
    expect(perfiles.compromis.posiciones['eco-011']).toBeUndefined();
    expect(perfiles['geroa-bai'].posiciones['eco-011']).toBeUndefined();
    expect(perfiles['geroa-bai'].posiciones['eco-014']).toBeUndefined();
  });

  it.each(idsRegionales)('%s se audita sin herencia ni coordenada editorial', (id) => {
    const perfil = perfiles[id];
    for (const campo of [
      'heredaDe',
      'perfilBase',
      'posicionesHeredadas',
      'coordenada',
      'coordenadas',
      'publicacionMapa',
    ]) {
      expect(perfil[campo]).toBeUndefined();
    }
    expect(resultados.get(id)).toBeDefined();
  });
});

describe('alcance nominal del auditor', () => {
  it('mantiene activos por defecto y añade PDeCAT con --all', () => {
    const activos = cargarAuditoria() as { resumen: { perfiles: number }; resultados: Resultado[] };
    const todos = cargarAuditoria({ incluirHistoricos: true }) as {
      resumen: { perfiles: number };
      resultados: Array<Resultado & { actividad: string }>;
    };
    expect(activos.resumen.perfiles).toBe(65);
    expect(activos.resultados.some(({ id }) => id === 'pdecat')).toBe(false);
    expect(todos.resumen.perfiles).toBe(66);
    expect(todos.resultados.find(({ id }) => id === 'pdecat')?.actividad).toBe('historica');
  });
});
