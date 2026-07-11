import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

interface Posicion {
  valor: number;
  justificacion: string;
  calidadEvidencia: string;
}

interface Referencia {
  id: string;
  nombre: string;
  tipo: string;
  definicion: string;
  variante: string;
  periodo: string;
  advertencia: string;
  publicacionMapa: { publicable: boolean; motivo: string };
  posiciones: Record<string, Posicion>;
  [clave: string]: unknown;
}

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const leer = (id: string): Referencia =>
  JSON.parse(
    readFileSync(join(RAIZ, `data/referencias/${id}.json`), 'utf8'),
  ) as Referencia;

const referencias = {
  costa: leer('regeneracionismo-costista-joaquin-costa'),
  primo: leer('regeneracionismo-autoritario-primorriverista'),
  desarrollismo: leer('desarrollismo-tecnocratico-franquista-1957-1973'),
  canovas: leer('conservadurismo-canovista-restauracion'),
};

const valores = (referencia: Referencia) =>
  Object.fromEntries(
    Object.entries(referencia.posiciones).map(([itemId, posicion]) => [
      itemId,
      posicion.valor,
    ]),
  );

describe('semántica de cuatro referencias históricas de Estado y derecha', () => {
  it('mantiene democrático y material el regeneracionismo de Costa', () => {
    expect(valores(referencias.costa)).toEqual({
      'pop-001': 2,
      'dem-010': 1,
      'der-022': 2,
      'der-001': -1,
    });

    expect(referencias.costa.posiciones['dem-009']).toBeUndefined();
    expect(referencias.costa.posiciones['dem-011']).toBeUndefined();
    expect(referencias.costa.posiciones['lai-001']).toBeUndefined();
    expect(referencias.costa.advertencia).toMatch(/cirujano de hierro.*no autoriza|no autoriza.*dictadura/i);
  });

  it('separa la dictadura primorriverista del sindicato único fascista', () => {
    expect(valores(referencias.primo)).toMatchObject({
      'dem-010': -2,
      'dem-011': 2,
      'dem-012': -2,
      'dem-019': 2,
      'dem-018': 1,
      'dr-014': 2,
      'lab-005': -1,
      'lab-006': 0,
      'der-022': 2,
      'mon-001': -2,
      'dr-024': 2,
    });

    expect(referencias.primo.posiciones['der-001']).toBeUndefined();
    expect(referencias.primo.posiciones['dr-011']).toBeUndefined();
    expect(referencias.primo.posiciones['dr-021']).toBeUndefined();
    expect(referencias.primo.posiciones['dr-025']).toBeUndefined();
    expect(referencias.primo.advertencia).toMatch(/asociaciones obreras voluntarias.*corporación obligatoria/i);
  });

  it('no convierte la apertura desarrollista en Estado mínimo ni hereda la autarquía', () => {
    expect(valores(referencias.desarrollismo)).toMatchObject({
      'der-001': -2,
      'dem-008': -2,
      'dem-010': -2,
      'dem-011': 2,
      'dem-019': 2,
      'dem-018': 2,
      'dr-011': 2,
      'mon-001': -2,
      'dr-014': 2,
      'lab-006': 2,
      'lab-005': -1,
      'dr-024': 2,
      'der-005': 2,
    });

    for (const omision of ['der-004', 'eco-004', 'lab-016', 'lib-014']) {
      expect(
        referencias.desarrollismo.posiciones[omision],
        `${omision} no debe inferirse de liberalización, planificación o ministros tecnócratas`,
      ).toBeUndefined();
    }
    expect(referencias.desarrollismo.advertencia).toMatch(/no convirtió.*Estado mínimo/i);
  });

  it('preserva el pluralismo limitado y la ambivalencia foral de Cánovas', () => {
    expect(valores(referencias.canovas)).toEqual({
      'mon-001': -2,
      'dem-010': 1,
      'dem-019': -2,
      'dr-011': 2,
      'der-020': 2,
      'der-004': 2,
      'der-014': 0,
    });

    for (const omision of ['dem-001', 'dem-005', 'dem-008', 'dem-025', 'dr-024']) {
      expect(
        referencias.canovas.posiciones[omision],
        `${omision} sería una traducción anacrónica no documentada`,
      ).toBeUndefined();
    }
    expect(referencias.canovas.advertencia).toMatch(/abolición.*Concierto|Concierto.*abolición/i);
  });

  it.each(Object.values(referencias))('$nombre queda bloqueada para publicación cartográfica', (referencia) => {
    expect(referencia.publicacionMapa.publicable).toBe(false);
    expect(referencia.publicacionMapa.motivo.length).toBeGreaterThan(80);
    expect(referencia.tipo).toBe('referencia-doctrinal');
    expect(referencia.definicion.length).toBeGreaterThanOrEqual(80);
    expect(referencia.variante.length).toBeGreaterThanOrEqual(40);
    expect(referencia.periodo.length).toBeGreaterThanOrEqual(10);
    for (const campoPartidista of ['siglas', 'actividad', 'ambito', 'componentes', 'web']) {
      expect(referencia[campoPartidista]).toBeUndefined();
    }
  });
});
