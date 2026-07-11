import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

interface Fuente {
  titulo: string;
  url: string;
  consultado: string;
  fecha?: string;
  cita?: string;
}

interface Referencia {
  id: string;
  nombre: string;
  tipo: string;
  definicion: string;
  variante: string;
  periodo: string;
  advertencia: string;
  fuentesMarco: Fuente[];
  posiciones: Record<string, { fuente: Fuente }>;
  [clave: string]: unknown;
}

interface Item {
  id: string;
  estado?: string;
}

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const IDs = [
  'anarquismo-sin-adjetivos',
  'liberalismo-igualitario-rawlsiano',
  'deleonismo',
  'socialismo-humanista-democratico-fernando-de-los-rios',
  'republicanismo-radical-socialista-espanol',
] as const;
const leer = <T>(ruta: string): T =>
  JSON.parse(readFileSync(join(RAIZ, ruta), 'utf8')) as T;
const referencias = IDs.map((id) => leer<Referencia>(`data/referencias/${id}.json`));
const itemsVigentes = new Set(
  readdirSync(join(RAIZ, 'data/items'))
    .filter((archivo) => archivo.endsWith('.json') && !archivo.startsWith('_'))
    .flatMap((archivo) => leer<Item[]>(`data/items/${archivo}`))
    .filter((item) => item.estado !== 'retirado')
    .map((item) => item.id),
);

const todasLasFuentes = (referencia: Referencia): Fuente[] => [
  ...referencia.fuentesMarco,
  ...Object.values(referencia.posiciones).map(({ fuente }) => fuente),
];

describe('integridad y lengua de las fuentes doctrinales sustitutas', () => {
  it.each(referencias)('$nombre tiene identidad doctrinal, contexto y solo ítems vigentes', (referencia) => {
    expect(referencia.tipo).toBe('referencia-doctrinal');
    expect(referencia.definicion.length).toBeGreaterThanOrEqual(40);
    expect(referencia.variante.length).toBeGreaterThan(20);
    expect(referencia.periodo.length).toBeGreaterThan(3);
    expect(referencia.advertencia.length).toBeGreaterThanOrEqual(40);
    expect(Object.keys(referencia.posiciones).length).toBeGreaterThanOrEqual(3);
    expect(Object.keys(referencia.posiciones).every((id) => itemsVigentes.has(id))).toBe(true);
    for (const campoPartidista of ['siglas', 'actividad', 'ambito', 'componentes', 'web']) {
      expect(referencia[campoPartidista]).toBeUndefined();
    }
  });

  it.each(referencias)('$nombre aporta fuente completa por cada valor y no enlaza Wikipedia', (referencia) => {
    for (const fuente of todasLasFuentes(referencia)) {
      expect(fuente.titulo.length).toBeGreaterThan(3);
      expect(fuente.consultado).toBe('2026-07-11');
      expect(fuente.url.startsWith('https://')).toBe(true);
      expect(new URL(fuente.url).hostname).not.toMatch(/(^|\.)wikipedia\.org$/);
    }
    for (const { fuente } of Object.values(referencia.posiciones)) {
      expect(fuente.cita?.length, `${referencia.id}: falta localizador`).toBeGreaterThanOrEqual(20);
    }
  });

  it('fecha y agrupa los localizadores que proceden del mismo pasaje', () => {
    const rawls = referencias.find(({ id }) => id === 'liberalismo-igualitario-rawlsiano')!;
    expect(Object.values(rawls.posiciones).every(({ fuente }) => Boolean(fuente.fecha))).toBe(true);

    const anarquismo = referencias.find(({ id }) => id === 'anarquismo-sin-adjetivos')!;
    expect(anarquismo.posiciones['izq-007']?.fuente.cita).toBe(
      anarquismo.posiciones['dem-019']?.fuente.cita,
    );

    const deleon = referencias.find(({ id }) => id === 'deleonismo')!;
    expect(deleon.posiciones['lab-018']?.fuente.cita).toBe(
      deleon.posiciones['lab-008']?.fuente.cita,
    );
    expect(deleon.posiciones['izq-019']?.fuente.cita).toBe(
      deleon.posiciones['izq-002']?.fuente.cita,
    );

    const radicalSocialista = referencias.find(
      ({ id }) => id === 'republicanismo-radical-socialista-espanol',
    )!;
    expect(radicalSocialista.posiciones['eco-001']?.fuente.cita).toBe(
      radicalSocialista.posiciones['eco-009']?.fuente.cita,
    );
  });

  it('marca todas las fuentes inglesas y hace mayoritaria la documentación en lenguas de España', () => {
    const rawls = referencias.find(({ id }) => id === 'liberalismo-igualitario-rawlsiano')!;
    const deleon = referencias.find(({ id }) => id === 'deleonismo')!;
    for (const fuente of [...todasLasFuentes(rawls), ...todasLasFuentes(deleon)]) {
      expect(fuente.titulo).toContain('(en inglés)');
    }

    const marcos = referencias.flatMap(({ fuentesMarco }) => fuentesMarco);
    const ingles = marcos.filter(({ titulo }) => titulo.includes('(en inglés)'));
    const lenguasDeEspana = marcos.filter(({ titulo }) => !titulo.includes('(en inglés)'));
    expect(lenguasDeEspana.length).toBeGreaterThan(ingles.length);
    expect(
      marcos.some(({ titulo }) => titulo.includes('(en catalán)')),
    ).toBe(true);
  });

  it('combina textos primarios con repositorios o publicaciones académicas identificables', () => {
    const urlsMarco = new Map(
      referencias.map((referencia) => [
        referencia.id,
        referencia.fuentesMarco.map(({ url }) => url),
      ]),
    );
    expect(urlsMarco.get('anarquismo-sin-adjetivos')).toEqual(
      expect.arrayContaining([expect.stringContaining('revistes.iec.cat')]),
    );
    expect(urlsMarco.get('liberalismo-igualitario-rawlsiano')).toEqual(
      expect.arrayContaining([
        expect.stringContaining('tannerlectures.org'),
        expect.stringContaining('plato.stanford.edu'),
      ]),
    );
    expect(urlsMarco.get('deleonismo')).toEqual(
      expect.arrayContaining([expect.stringContaining('stars.library.ucf.edu')]),
    );
    expect(urlsMarco.get('socialismo-humanista-democratico-fernando-de-los-rios')).toEqual(
      expect.arrayContaining([
        expect.stringContaining('biblioteca.unesp.br'),
        expect.stringContaining('e-archivo.uc3m.es'),
      ]),
    );
    expect(urlsMarco.get('republicanismo-radical-socialista-espanol')).toEqual(
      expect.arrayContaining([expect.stringContaining('cepc.gob.es')]),
    );
  });
});
