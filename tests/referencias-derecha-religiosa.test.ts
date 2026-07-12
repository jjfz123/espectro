import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

type Fuente = {
  titulo: string;
  url: string;
  cita?: string;
};

type Referencia = {
  id: string;
  nombre: string;
  definicion: string;
  periodo: string;
  advertencia: string;
  fuentesMarco: Fuente[];
  publicacionAfinidad?: { publicable: boolean; motivo: string };
  publicacionMapa?: { publicable: boolean; motivo: string };
  sensibilidad?: string;
  reglaPublicacion: { minimoItems: number; minimoCobertura: number; umbralAfinidad: number };
  posiciones: Record<
    string,
    {
      valor: number;
      calidadEvidencia: string;
      justificacion: string;
      fuente: Fuente;
    }
  >;
};

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const nombresFichero = [
  'salazarismo-estado-novo-portugues.json',
  'integrismo-catolico-espanol-nocedal.json',
  'maurrasismo-nacionalismo-integral-recepcion-espanola.json',
  'corporativismo-social-catolico.json',
  'catolicismo-politico-cedista-1933.json',
  'neocatolicismo-espanol-isabelino.json',
] as const;

const referencias = nombresFichero.map((fichero) =>
  JSON.parse(readFileSync(join(raiz, 'data/referencias', fichero), 'utf8')) as Referencia,
);
const porId = new Map(referencias.map((referencia) => [referencia.id, referencia]));

const items = readdirSync(join(raiz, 'data/items'))
  .filter((fichero) => fichero.endsWith('.json'))
  .flatMap((fichero) =>
    JSON.parse(readFileSync(join(raiz, 'data/items', fichero), 'utf8')) as Array<{
      id: string;
      estado?: string;
    }>,
  );
const itemsPorId = new Map(items.map((item) => [item.id, item]));

const valores = (id: string) =>
  Object.fromEntries(
    Object.entries(porId.get(id)?.posiciones ?? {}).map(([itemId, posicion]) => [
      itemId,
      posicion.valor,
    ]),
  );

describe('referencias históricas de derecha religiosa y corporativa', () => {
  it('delimita seis corrientes por país y periodo y las publica con salvaguardas (decisión editorial 2026-07-12)', () => {
    expect([...porId.keys()]).toEqual([
      'salazarismo-estado-novo-portugues',
      'integrismo-catolico-espanol-nocedal',
      'maurrasismo-nacionalismo-integral-recepcion-espanola',
      'corporativismo-social-catolico',
      'catolicismo-politico-cedista-1933',
      'neocatolicismo-espanol-isabelino',
    ]);

    expect(porId.get('salazarismo-estado-novo-portugues')?.periodo).toBe(
      'Portugal, 1933-1968',
    );
    expect(porId.get('integrismo-catolico-espanol-nocedal')?.periodo).toBe(
      'España, 1888-1909',
    );
    expect(
      porId.get('maurrasismo-nacionalismo-integral-recepcion-espanola')?.periodo,
    ).toContain('Francia, 1899-1939');
    expect(porId.get('catolicismo-politico-cedista-1933')?.periodo).toBe('España, 1933');
    expect(porId.get('neocatolicismo-espanol-isabelino')?.periodo).toBe(
      'España, 1854-1868',
    );

    for (const referencia of referencias) {
      expect(referencia.publicacionAfinidad, referencia.id).toBeUndefined();
      expect(referencia.publicacionMapa, referencia.id).toBeUndefined();
      expect(referencia.reglaPublicacion.minimoItems, referencia.id).toBeGreaterThanOrEqual(3);
      expect(referencia.reglaPublicacion.umbralAfinidad, referencia.id).toBeGreaterThanOrEqual(78);
      if ((referencia.sensibilidad ?? 'normal') !== 'normal') {
        expect(referencia.advertencia.length, referencia.id).toBeGreaterThan(80);
      }
    }
  });

  it('usa únicamente ítems vigentes y conserva las posiciones doctrinales verificadas', () => {
    for (const referencia of referencias) {
      for (const itemId of Object.keys(referencia.posiciones)) {
        expect(itemsPorId.has(itemId), `${referencia.id}: ${itemId} debe existir`).toBe(true);
        expect(
          itemsPorId.get(itemId)?.estado,
          `${referencia.id}: ${itemId} no puede estar retirado`,
        ).not.toBe('retirado');
      }
    }

    expect(valores('salazarismo-estado-novo-portugues')).toMatchObject({
      'dem-010': -2,
      'dem-011': 2,
      'dem-018': 1,
      'dr-014': 1,
      'dr-024': 2,
      'lab-005': -2,
    });
    expect(valores('integrismo-catolico-espanol-nocedal')).toMatchObject({
      'der-002': 2,
      'dem-010': -2,
      'dem-018': 1,
      'dr-011': 2,
      'rel-002': -2,
      'rel-003': 1,
    });
    expect(
      porId.get('integrismo-catolico-espanol-nocedal')?.posiciones['rel-003']
        ?.calidadEvidencia,
    ).toBe('media');
    expect(valores('maurrasismo-nacionalismo-integral-recepcion-espanola')).toMatchObject({
      'dem-010': -2,
      'dem-011': 2,
      'dem-018': 1,
      'mon-001': -2,
      'dr-024': 2,
      'dr-025': -2,
    });
  });

  it('no confunde corporativismo social católico con corporativismo estatal', () => {
    const corporativismo = porId.get('corporativismo-social-catolico')!;

    expect(valores(corporativismo.id)).toMatchObject({
      'dr-014': 0,
      'lab-005': 1,
      'lab-006': -1,
    });
    expect(Object.keys(corporativismo.posiciones).sort()).toEqual([
      'dr-014',
      'lab-005',
      'lab-006',
    ]);
    expect(corporativismo.posiciones['lab-005']?.calidadEvidencia).toBe('media');
    expect(Object.keys(corporativismo.posiciones)).not.toContain('dem-010');
    expect(Object.keys(corporativismo.posiciones)).not.toContain('dr-024');
    expect(corporativismo.advertencia).toMatch(/asociaciones separadas|libertad de asociación/i);
  });

  it('preserva las cautelas pluralistas del programa cedista y los huecos neocatólicos', () => {
    const ceda = porId.get('catolicismo-politico-cedista-1933')!;
    const neocatolicismo = porId.get('neocatolicismo-espanol-isabelino')!;

    expect(valores(ceda.id)).toMatchObject({
      'der-002': 2,
      'dem-006': 2,
      'dem-008': 1,
      'dem-018': 1,
    });
    expect(Object.keys(ceda.posiciones).sort()).toEqual([
      'dem-006',
      'dem-008',
      'dem-018',
      'der-002',
    ]);
    expect(Object.keys(ceda.posiciones)).not.toContain('dem-010');
    expect(Object.keys(ceda.posiciones)).not.toContain('dr-024');
    expect(ceda.advertencia).toMatch(/heterogénea|controversia historiográfica/i);

    expect(Object.keys(neocatolicismo.posiciones).sort()).toEqual([
      'der-002',
      'dr-011',
      'rel-002',
    ]);
    expect(neocatolicismo.posiciones['dr-011']?.valor).toBe(1);
    expect(neocatolicismo.posiciones['dr-011']?.calidadEvidencia).toBe('media');
    expect(neocatolicismo.posiciones['rel-002']?.valor).toBe(-1);
    expect(neocatolicismo.posiciones['rel-002']?.calidadEvidencia).toBe('media');
    expect(neocatolicismo.advertencia).toMatch(/solo como contexto histórico/i);
    expect(neocatolicismo.advertencia).toMatch(/no formuló una sola forma de gobierno/i);
  });

  it('aporta fuentes primarias o académicas reales y marca los idiomas no españoles', () => {
    const dominiosEsperados: Record<string, RegExp> = {
      'salazarismo-estado-novo-portugues': /parlamento\.pt|repositorio\.ucp\.pt/,
      'integrismo-catolico-espanol-nocedal': /wikisource\.org|dialnet\.unirioja\.es/,
      'maurrasismo-nacionalismo-integral-recepcion-espanola': /revistas\.uned\.es|maurras\.net/,
      'corporativismo-social-catolico': /vatican\.va|antropo\.es/,
      'catolicismo-politico-cedista-1933': /boe\.es|segundarepublica\.com/,
      'neocatolicismo-espanol-isabelino': /dialnet\.unirioja\.es|cepc\.gob\.es/,
    };

    for (const referencia of referencias) {
      const dominioEsperado = dominiosEsperados[referencia.id];
      expect(dominioEsperado, `${referencia.id}: falta el contrato de fuentes`).toBeDefined();
      expect(referencia.fuentesMarco.length, referencia.id).toBeGreaterThanOrEqual(2);
      const fuentes = [
        ...referencia.fuentesMarco,
        ...Object.values(referencia.posiciones).map((posicion) => posicion.fuente),
      ];
      for (const fuente of fuentes) {
        expect(fuente.url, referencia.id).toMatch(/^https:\/\//);
        expect(fuente.url, referencia.id).toMatch(dominioEsperado!);
        expect(fuente.url, referencia.id).not.toMatch(/wikipedia\.org/);

        const host = new URL(fuente.url).hostname;
        if (host.endsWith('.pt')) expect(fuente.titulo).toContain('(en portugués)');
        if (host === 'maurras.net') expect(fuente.titulo).toContain('(en francés)');
      }
    }
  });

  it('incluye un localizador auditable en cada posición sin simular independencia entre pasajes idénticos', () => {
    for (const referencia of referencias) {
      for (const [itemId, posicion] of Object.entries(referencia.posiciones)) {
        expect(
          posicion.fuente.cita?.length,
          `${referencia.id}/${itemId}: falta fuente.cita`,
        ).toBeGreaterThanOrEqual(20);
      }
    }

    const maurras = porId.get('maurrasismo-nacionalismo-integral-recepcion-espanola')!;
    expect(maurras.posiciones['mon-001']?.fuente.titulo).toContain('p. 347');
    expect(maurras.posiciones['mon-001']?.fuente.url).toContain('revistas.uned.es');
    expect(maurras.posiciones['mon-001']?.fuente.cita).toBe(
      maurras.posiciones['dr-024']?.fuente.cita,
    );
  });

  it('incluye guardarraíles explícitos sobre pluralismo, autoridad y violencia', () => {
    for (const referencia of referencias) {
      expect(referencia.advertencia, referencia.id).toMatch(
        /partid|plural|democr|oposición|competencia/i,
      );
      expect(referencia.advertencia, referencia.id).toMatch(
        /autoridad|poder|estado|ejecutivo|gobierno|absolutismo|veto|orden/i,
      );
      expect(referencia.advertencia, referencia.id).toMatch(/violenc|coerci|golpe|dictadura/i);
      expect(referencia.advertencia, referencia.id).toMatch(
        /carlismo|falangismo|nacionalcatolicismo|fascismo/i,
      );
    }
  });
});
