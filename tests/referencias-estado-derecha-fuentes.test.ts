import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

interface Fuente {
  tipo: string;
  titulo: string;
  url: string;
  fecha?: string;
  consultado: string;
  cita?: string;
}

interface Posicion {
  valor: number;
  justificacion: string;
  calidadEvidencia: string;
  fuente: Fuente;
}

interface Referencia {
  id: string;
  nombre: string;
  fuentesMarco: Fuente[];
  posiciones: Record<string, Posicion>;
}

interface Item {
  id: string;
  estado?: string;
}

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const IDs = [
  'regeneracionismo-costista-joaquin-costa',
  'regeneracionismo-autoritario-primorriverista',
  'desarrollismo-tecnocratico-franquista-1957-1973',
  'conservadurismo-canovista-restauracion',
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

const HOSTS_AUDITADOS = new Set([
  'www.boe.es',
  'www.cepc.gob.es',
  'www.cervantesvirtual.com',
  'www.congreso.es',
  'constitucion.congreso.es',
  'dialnet.unirioja.es',
  'observatorioregadio.gob.es',
  'www.euskadi.eus',
]);

const todasLasFuentes = (referencia: Referencia): Fuente[] => [
  ...referencia.fuentesMarco,
  ...Object.values(referencia.posiciones).map(({ fuente }) => fuente),
];

describe('integridad, accesibilidad editorial e idioma de las fuentes históricas', () => {
  it.each(referencias)('$nombre usa únicamente ítems vigentes y evidencia cualificada', (referencia) => {
    expect(Object.keys(referencia.posiciones).length).toBeGreaterThanOrEqual(4);
    for (const [itemId, posicion] of Object.entries(referencia.posiciones)) {
      expect(itemsVigentes.has(itemId), `${referencia.id}: ${itemId}`).toBe(true);
      expect(posicion.valor).toBeGreaterThanOrEqual(-2);
      expect(posicion.valor).toBeLessThanOrEqual(2);
      expect(['alta', 'media']).toContain(posicion.calidadEvidencia);
      expect(posicion.justificacion.length).toBeGreaterThanOrEqual(80);
    }
  });

  it.each(referencias)('$nombre enlaza fuentes auditadas por HTTPS, sin Wikipedia ni páginas raíz', (referencia) => {
    for (const fuente of todasLasFuentes(referencia)) {
      const url = new URL(fuente.url);
      expect(url.protocol).toBe('https:');
      expect(HOSTS_AUDITADOS.has(url.hostname), `${referencia.id}: ${url.hostname}`).toBe(true);
      expect(`${url.pathname}${url.search}`.length).toBeGreaterThan(1);
      expect(url.hostname).not.toMatch(/(^|\.)wikipedia\.org$/);
      expect(fuente.consultado).toBe('2026-07-11');
      expect(fuente.titulo.length).toBeGreaterThanOrEqual(12);
    }
  });

  it('mantiene toda la documentación en español y no oculta fuentes en otra lengua', () => {
    const fuentes = referencias.flatMap(todasLasFuentes);
    expect(fuentes).not.toHaveLength(0);
    for (const fuente of fuentes) {
      expect(fuente.titulo).not.toMatch(/\(en (inglés|francés|portugués|alemán|italiano)\)/i);
    }

    expect(fuentes.some(({ url }) => url.includes('boe.es'))).toBe(true);
    expect(fuentes.some(({ url }) => url.includes('congreso.es'))).toBe(true);
    expect(fuentes.some(({ url }) => url.includes('dialnet.unirioja.es'))).toBe(true);
    expect(fuentes.some(({ url }) => url.includes('cepc.gob.es'))).toBe(true);
  });

  it.each(referencias)('$nombre combina documento primario u oficial y contraste académico', (referencia) => {
    const urls = referencia.fuentesMarco.map(({ url }) => url);
    expect(
      urls.some((url) =>
        /boe\.es|congreso\.es|cervantesvirtual\.com|observatorioregadio\.gob\.es|euskadi\.eus/.test(
          url,
        ),
      ),
    ).toBe(true);
    expect(urls.some((url) => /dialnet\.unirioja\.es|cepc\.gob\.es/.test(url))).toBe(true);
  });

  it.each(referencias)('$nombre localiza cada posición sin duplicar artificialmente el mismo pasaje', (referencia) => {
    const grupos = new Set<string>();
    for (const [itemId, posicion] of Object.entries(referencia.posiciones)) {
      const cita = posicion.fuente.cita;
      expect(cita, `${referencia.id}: ${itemId} sin localizador`).toBeTypeOf('string');
      expect(cita!.length, `${referencia.id}: ${itemId} localizador pobre`).toBeGreaterThanOrEqual(30);

      const grupo = `${posicion.fuente.url}\n${cita!.trim().toLocaleLowerCase('es')}`;
      expect(grupos.has(grupo), `${referencia.id}: pasaje reutilizado en ${itemId}`).toBe(false);
      grupos.add(grupo);
    }
    expect(grupos.size).toBe(Object.keys(referencia.posiciones).length);
  });

  it('conserva los cuatro contratos de procedencia específicos', () => {
    const porId = new Map(referencias.map((referencia) => [referencia.id, referencia]));
    const urls = (id: string) => porId.get(id)!.fuentesMarco.map(({ url }) => url);

    expect(urls('regeneracionismo-costista-joaquin-costa')).toEqual(
      expect.arrayContaining([
        expect.stringContaining('cervantesvirtual.com/obra-visor/oligarquia-y-caciquismo'),
        expect.stringContaining('cepc.gob.es'),
      ]),
    );
    expect(urls('regeneracionismo-autoritario-primorriverista')).toEqual(
      expect.arrayContaining([
        expect.stringContaining('congreso.es/es/cem/primoriv'),
        expect.stringContaining('GMD-1926-331.pdf'),
      ]),
    );
    expect(urls('desarrollismo-tecnocratico-franquista-1957-1973')).toEqual(
      expect.arrayContaining([
        expect.stringContaining('BOE-1959-174.pdf'),
        expect.stringContaining('BOE-A-1963-22668'),
      ]),
    );
    expect(urls('conservadurismo-canovista-restauracion')).toEqual(
      expect.arrayContaining([
        expect.stringContaining('constitucion.congreso.es'),
        expect.stringContaining('euskadi.eus'),
      ]),
    );
  });
});
