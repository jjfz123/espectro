import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

interface Fuente {
  titulo: string;
  url: string;
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
  tipo: string;
  definicion: string;
  variante: string;
  periodo: string;
  publicacionAfinidad?: { publicable: boolean; motivo: string };
  publicacionMapa?: { publicable: boolean; motivo: string };
  advertencia: string;
  fuentesMarco: Fuente[];
  posiciones: Record<string, Posicion>;
  [clave: string]: unknown;
}

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const leer = (id: string): Referencia =>
  JSON.parse(
    readFileSync(join(RAIZ, `data/referencias/${id}.json`), 'utf8'),
  ) as Referencia;

const referencias = {
  anarquismo: leer('anarquismo-sin-adjetivos'),
  rawls: leer('liberalismo-igualitario-rawlsiano'),
  deleon: leer('deleonismo'),
  deLosRios: leer('socialismo-humanista-democratico-fernando-de-los-rios'),
  radicalSocialista: leer('republicanismo-radical-socialista-espanol'),
};

describe('semántica de las cinco referencias doctrinales sustitutas', () => {
  it('distingue el anarquismo sin adjetivos de inferencias económicas, sindicales o violentas', () => {
    const posiciones = referencias.anarquismo.posiciones;
    expect(posiciones['izq-007']?.valor).toBe(2);
    expect(posiciones['izq-003']?.valor).toBe(1);
    expect(posiciones['izq-032']).toBeUndefined();
    expect(posiciones['dem-019']?.valor).toBe(-2);
    expect(posiciones['lab-005']).toBeUndefined();
    expect(posiciones['izq-001']).toBeUndefined();
  });

  it('conserva las libertades y el impuesto sucesorio de Rawls sin fabricar su política fiscal', () => {
    const posiciones = referencias.rawls.posiciones;
    expect(posiciones['eco-009']?.valor).toBe(-2);
    expect(posiciones['dem-028']?.valor).toBe(2);
    expect(posiciones['dem-010']?.valor).toBe(1);
    expect(posiciones['eco-001']).toBeUndefined();
    expect(posiciones['eco-014']).toBeUndefined();
    expect(referencias.rawls.advertencia).toMatch(
      /principio de diferencia.*igualdad justa de oportunidades/i,
    );
  });

  it('modela la doble vía deleonista sin convertirla en parlamentarismo ni sindicalismo puro', () => {
    const posiciones = referencias.deleon.posiciones;
    expect(posiciones['lab-018']?.valor).toBe(1);
    expect(posiciones['lab-008']?.valor).toBe(1);
    expect(posiciones['lab-008']?.calidadEvidencia).toBe('media');
    expect(posiciones['izq-008']?.valor).toBe(0);
    expect(posiciones['izq-019']?.valor).toBe(2);
    expect(posiciones['izq-002']?.valor).toBe(0);
  });

  it('fija los guardarraíles reformista y pluralista de Fernando de los Ríos', () => {
    const posiciones = referencias.deLosRios.posiciones;
    expect(posiciones['izq-001']?.valor).toBe(-2);
    expect(posiciones['dem-010']?.valor).toBe(2);
    expect(posiciones['dem-020']?.valor).toBe(1);
    expect(posiciones['dem-020']?.calidadEvidencia).toBe('media');
    expect(referencias.deLosRios.periodo).toBe('1921-1931');
    expect(posiciones['eco-001']).toBeUndefined();
    expect(posiciones['dem-028']).toBeUndefined();
  });

  it('mantiene histórico el radical-socialismo y evita retrotraerle los acuerdos de 1979', () => {
    const posiciones = referencias.radicalSocialista.posiciones;
    expect(posiciones['mon-001']?.valor).toBe(1);
    expect(posiciones['dem-001']?.valor).toBe(2);
    expect(posiciones['eco-001']?.valor).toBe(1);
    expect(posiciones['eco-009']?.valor).toBe(-2);
    expect(posiciones['dem-020']).toBeUndefined();
    expect(posiciones['lai-001']?.valor).toBe(2);
    expect(posiciones['lab-002']?.valor).toBe(1);
    expect(posiciones['lab-002']?.calidadEvidencia).toBe('media');
    expect(posiciones['fem-009']).toBeUndefined();
  });

  it.each(Object.values(referencias))('$nombre se publica sin veto y con salvaguardas (decisión editorial 2026-07-12)', (referencia) => {
    expect(referencia.publicacionAfinidad).toBeUndefined();
    expect(referencia.publicacionMapa).toBeUndefined();
    const regla = (referencia as { reglaPublicacion?: { minimoItems: number; umbralAfinidad: number } })
      .reglaPublicacion;
    expect(regla?.minimoItems).toBeGreaterThanOrEqual(3);
    expect(regla?.umbralAfinidad).toBeGreaterThanOrEqual(78);
  });
});
