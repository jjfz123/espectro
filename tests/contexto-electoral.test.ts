// Contención territorial del contexto electoral. Sobre TODAS las convocatorias
// reales de /data/convocatorias (incluidas Ceuta y Melilla) comprueba que la
// selección electoral no cruza comunidades, que el motor falla cerrado cuando
// falta la comunidad y que un componente de coalición no se convierte en
// papeleta propia. Complementa a scripts/auditar-contexto-electoral.mjs: el
// auditor vigila los datos; estos tests fijan el contrato del motor.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  partidosPrincipalesUltimasGenerales,
  seleccionarPartidosElectorales,
} from '../src/engine/index.js';
import type {
  CandidaturaElectoral,
  ConvocatoriaElectoral,
  Partido,
  RelacionPerfilCandidatura,
} from '../src/engine/index.js';

const raiz = fileURLToPath(new URL('..', import.meta.url));

function leerDirectorio<T>(directorio: string): T[] {
  const ruta = join(raiz, directorio);
  return readdirSync(ruta)
    .filter((archivo) => archivo.endsWith('.json') && !archivo.startsWith('_'))
    .sort()
    .map((archivo) => JSON.parse(readFileSync(join(ruta, archivo), 'utf8')) as T);
}

const partidos = leerDirectorio<Partido>('data/partidos');
const convocatorias = leerDirectorio<ConvocatoriaElectoral>('data/convocatorias');

/** Relaciones que presentan un perfil como la identidad votable de la papeleta. */
const RELACIONES_IDENTIDAD_VOTABLE: ReadonlySet<RelacionPerfilCandidatura['relacion']> = new Set([
  'misma-organizacion',
  'organizacion-territorial',
]);

const autonomicas = convocatorias.filter((convocatoria) => convocatoria.tipo === 'autonomicas');
const ultimaPorTerritorio = new Map<string, ConvocatoriaElectoral>();
for (const convocatoria of autonomicas) {
  const previa = ultimaPorTerritorio.get(convocatoria.territorio);
  if (!previa || previa.fecha.localeCompare(convocatoria.fecha) < 0) {
    ultimaPorTerritorio.set(convocatoria.territorio, convocatoria);
  }
}
const territorios = [...ultimaPorTerritorio.keys()].sort();

/** Perfiles cuya única vía de aparición en la convocatoria es `componente`. */
function perfilesSoloComponente(convocatoria: ConvocatoriaElectoral): string[] {
  const relacionesPorPerfil = new Map<string, Set<string>>();
  for (const candidatura of convocatoria.candidaturas) {
    for (const relacion of candidatura.perfilRelaciones) {
      const conjunto = relacionesPorPerfil.get(relacion.perfilId) ?? new Set<string>();
      conjunto.add(relacion.relacion);
      relacionesPorPerfil.set(relacion.perfilId, conjunto);
    }
  }
  return [...relacionesPorPerfil]
    .filter(([, relaciones]) => [...relaciones].every((relacion) => relacion === 'componente'))
    .map(([perfilId]) => perfilId);
}

describe('cobertura de las convocatorias autonómicas reales', () => {
  it('las 17 comunidades y las 2 ciudades autónomas tienen convocatoria con comunidad declarada', () => {
    expect(territorios).toContain('ceuta');
    expect(territorios).toContain('melilla');
    expect(territorios).toHaveLength(19);
    for (const convocatoria of autonomicas) {
      expect(convocatoria.territorio, `${convocatoria.id} sin comunidad`).toBeTruthy();
      expect(convocatoria.territorio).not.toBe('espana');
    }
  });
});

describe.each(territorios)('autonómicas de %s', (territorio) => {
  const convocatoria = ultimaPorTerritorio.get(territorio);
  if (!convocatoria) throw new Error(`sin convocatoria autonómica para ${territorio}`);
  const seleccion = seleccionarPartidosElectorales(partidos, convocatorias, {
    tipo: 'autonomicas',
    ccaa: territorio,
  });

  it('usa la convocatoria documentada de su comunidad', () => {
    expect(seleccion.metodo).toBe('convocatoria-documentada');
    expect(seleccion.convocatoria?.id).toBe(convocatoria.id);
    expect(seleccion.convocatoria?.territorio).toBe(territorio);
    expect(seleccion.candidaturas).toHaveLength(convocatoria.candidaturas.length);
  });

  it('todos los perfiles y candidaturas devueltos provienen de su propia convocatoria', () => {
    const enlazados = new Set(
      convocatoria.candidaturas.flatMap((candidatura) =>
        candidatura.perfilRelaciones.map((relacion) => relacion.perfilId),
      ),
    );
    for (const partido of seleccion.partidos) {
      expect(enlazados.has(partido.id), `${partido.id} no está enlazado en ${convocatoria.id}`).toBe(
        true,
      );
    }
    const idsCandidaturas = new Set(convocatoria.candidaturas.map((candidatura) => candidatura.id));
    for (const candidatura of seleccion.candidaturas) {
      expect(
        idsCandidaturas.has(candidatura.id),
        `${candidatura.id} pertenece a otra convocatoria`,
      ).toBe(true);
    }
  });

  it('no incluye perfiles foráneos: todo perfil no estatal declara esta comunidad', () => {
    for (const partido of seleccion.partidos) {
      if (partido.ambito === 'estatal') continue;
      const ccaaPerfil = partido.ccaa ?? [];
      // Un perfil no estatal sin territorio declarado no permite comprobar la
      // contención; el auditor lo señala como aviso en vez de inventar ámbito.
      if (ccaaPerfil.length === 0) continue;
      expect(
        ccaaPerfil,
        `${partido.id} (declarado en ${ccaaPerfil.join(', ')}) aparece en ${territorio}`,
      ).toContain(territorio);
    }
  });

  it('ningún perfil aparece como identidad votable en dos candidaturas', () => {
    const papeletasPorPerfil = new Map<string, Set<string>>();
    for (const candidatura of seleccion.candidaturas) {
      for (const relacion of candidatura.perfilRelaciones) {
        if (!RELACIONES_IDENTIDAD_VOTABLE.has(relacion.relacion)) continue;
        const papeletas = papeletasPorPerfil.get(relacion.perfilId) ?? new Set<string>();
        papeletas.add(candidatura.id);
        papeletasPorPerfil.set(relacion.perfilId, papeletas);
      }
    }
    for (const [perfilId, papeletas] of papeletasPorPerfil) {
      expect(
        papeletas.size,
        `${perfilId} es votable en ${[...papeletas].join(', ')}`,
      ).toBeLessThanOrEqual(1);
    }
  });

  it('un componente de coalición sin candidatura propia no figura como identidad votable', () => {
    // Fija el contrato: si el motor reescribiera relaciones o los datos
    // añadieran una papeleta duplicada para un componente, esto fallaría.
    for (const perfilId of perfilesSoloComponente(convocatoria)) {
      const papeletasPropias = seleccion.candidaturas.filter((candidatura) =>
        candidatura.perfilRelaciones.some(
          (relacion) =>
            relacion.perfilId === perfilId && RELACIONES_IDENTIDAD_VOTABLE.has(relacion.relacion),
        ),
      );
      expect(papeletasPropias, `${perfilId} figura como papeleta propia`).toHaveLength(0);
    }
  });
});

describe('Ceuta y Melilla: ciudades autónomas de pleno derecho en el contexto', () => {
  it.each(['ceuta', 'melilla'] as const)(
    '%s selecciona su convocatoria documentada sin foráneas',
    (ciudad) => {
      const seleccion = seleccionarPartidosElectorales(partidos, convocatorias, {
        tipo: 'autonomicas',
        ccaa: ciudad,
      });
      expect(seleccion.metodo).toBe('convocatoria-documentada');
      expect(seleccion.convocatoria?.territorio).toBe(ciudad);
      expect(seleccion.candidaturas.length).toBeGreaterThan(0);
      expect(seleccion.partidos.map((partido) => partido.id)).toEqual(
        expect.arrayContaining(['pp', 'psoe', 'vox', 'podemos']),
      );
      for (const partido of seleccion.partidos) {
        expect(
          partido.ambito === 'estatal' || (partido.ccaa ?? []).includes(ciudad),
          `${partido.id} es foráneo en ${ciudad}`,
        ).toBe(true);
      }
    },
  );
});

describe('autonómicas sin comunidad: el motor falla cerrado', () => {
  it('devuelve contexto-incompleto y ninguna lista inventada', () => {
    const seleccion = seleccionarPartidosElectorales(partidos, convocatorias, {
      tipo: 'autonomicas',
    });
    expect(seleccion.metodo).toBe('contexto-incompleto');
    expect(seleccion.partidos).toEqual([]);
    expect(seleccion.candidaturas).toEqual([]);
    expect(seleccion.partidosFueraConvocatoria).toEqual([]);
    expect(seleccion.convocatoria).toBeUndefined();
    expect(seleccion.candidaturasConPerfil).toBe(0);
    expect(seleccion.perfilesEnlazados).toBe(0);
  });
});

describe('componentes de coalición en las últimas generales', () => {
  const ultimaGenerales = convocatorias
    .filter((convocatoria) => convocatoria.tipo === 'generales')
    .sort((a, b) => b.fecha.localeCompare(a.fecha))[0];
  if (!ultimaGenerales) throw new Error('sin convocatoria de generales documentada');

  it('un componente sin candidatura propia nunca se convierte en partido principal', () => {
    const soloComponente = perfilesSoloComponente(ultimaGenerales);
    expect(soloComponente).toEqual(
      expect.arrayContaining(['iu', 'podemos', 'mas-madrid', 'compromis']),
    );
    const principales = partidosPrincipalesUltimasGenerales(partidos, convocatorias, 100).map(
      (resultado) => resultado.partido.id,
    );
    for (const perfilId of soloComponente) {
      expect(principales, `${perfilId} aparece como principal`).not.toContain(perfilId);
    }
  });

  it('la candidatura de una coalición se atribuye al perfil de la coalición, no a un componente', () => {
    const principales = partidosPrincipalesUltimasGenerales(partidos, convocatorias, 100);
    const sumar = principales.find(
      (resultado) => resultado.candidatura.id === 'congreso-2023-07-sumar',
    );
    expect(sumar?.partido.id).toBe('movimiento-sumar');
  });
});

// Fixtures sintéticos mínimos para las reglas de fallo cerrado que los datos
// reales, hoy coherentes, no pueden ejercitar.
function perfilSintetico(
  id: string,
  ambito: Partido['ambito'],
  ccaa?: string[],
  actividad: Partido['actividad'] = 'activa',
): Partido {
  return {
    id,
    nombre: id,
    ambito,
    ccaa,
    actividad,
    confianza: 'verificada',
    posiciones: { 'itm-001': { valor: 1 } },
  };
}

function candidaturaSintetica(
  id: string,
  votos: number,
  perfilRelaciones: RelacionPerfilCandidatura[],
): CandidaturaElectoral {
  return {
    id,
    nombre: id.toUpperCase(),
    votos,
    porcentaje: votos,
    motivoInclusion: 'umbral',
    perfilRelaciones,
  };
}

function convocatoriaSintetica(
  tipo: ConvocatoriaElectoral['tipo'],
  territorio: string,
  candidaturas: CandidaturaElectoral[],
): ConvocatoriaElectoral {
  return {
    id: `sintetica-${tipo}-${territorio}`,
    nombre: 'Convocatoria sintética de prueba',
    tipo,
    fecha: '2026-01-01',
    territorio,
    umbralPorcentaje: 0.02,
    denominador: { tipo: 'votos-a-candidaturas', valor: 100 },
    totalCandidaturasOficiales: candidaturas.length,
    fuente: { titulo: 'Fixture de prueba', url: 'https://example.com', consultado: '2026-01-01' },
    candidaturas,
  };
}

describe('fixtures sintéticos: reglas de fallo cerrado del motor', () => {
  it('sin convocatoria documentada, la heurística de ámbito no arrastra foráneos', () => {
    const seleccion = seleccionarPartidosElectorales(
      [
        perfilSintetico('estatal-x', 'estatal'),
        perfilSintetico('propio-mad', 'autonomico', ['madrid']),
        perfilSintetico('foraneo-cat', 'autonomico', ['catalunya']),
      ],
      [],
      { tipo: 'autonomicas', ccaa: 'madrid' },
    );
    expect(seleccion.metodo).toBe('heuristica-ambito');
    const ids = seleccion.partidos.map((partido) => partido.id);
    expect(ids).toContain('estatal-x');
    expect(ids).toContain('propio-mad');
    expect(ids).not.toContain('foraneo-cat');
  });

  it('una convocatoria autonómica con datos foráneos no vuelve comparable un perfil de otra comunidad', () => {
    // Defensa en profundidad: audit:electoral ya veta este dato en CI, pero
    // el motor tampoco debe confiar en que los datos sean perfectos.
    const convocatoria = convocatoriaSintetica('autonomicas', 'madrid', [
      candidaturaSintetica('sint-local', 60, [
        { perfilId: 'propio-mad', relacion: 'misma-organizacion' },
      ]),
      candidaturaSintetica('sint-foranea', 40, [
        { perfilId: 'foraneo-cat', relacion: 'misma-organizacion' },
      ]),
    ]);
    const seleccion = seleccionarPartidosElectorales(
      [
        perfilSintetico('propio-mad', 'autonomico', ['madrid']),
        perfilSintetico('foraneo-cat', 'autonomico', ['catalunya']),
      ],
      [convocatoria],
      { tipo: 'autonomicas', ccaa: 'madrid' },
    );
    expect(seleccion.metodo).toBe('convocatoria-documentada');
    expect(seleccion.partidos.map((partido) => partido.id)).toEqual(['propio-mad']);
  });

  it('un perfil histórico enlazado en la convocatoria no vuelve como opción comparable', () => {
    const convocatoria = convocatoriaSintetica('autonomicas', 'madrid', [
      candidaturaSintetica('sint-activo', 60, [
        { perfilId: 'activo-mad', relacion: 'misma-organizacion' },
      ]),
      candidaturaSintetica('sint-historico', 40, [
        { perfilId: 'historico-mad', relacion: 'misma-organizacion' },
      ]),
    ]);
    const seleccion = seleccionarPartidosElectorales(
      [
        perfilSintetico('activo-mad', 'autonomico', ['madrid']),
        perfilSintetico('historico-mad', 'autonomico', ['madrid'], 'historica'),
      ],
      [convocatoria],
      { tipo: 'autonomicas', ccaa: 'madrid' },
    );
    expect(seleccion.metodo).toBe('convocatoria-documentada');
    expect(seleccion.partidos.map((partido) => partido.id)).toEqual(['activo-mad']);
    expect(seleccion.perfilesEnlazados).toBe(2);
    expect(seleccion.candidaturasConPerfil).toBe(1);
  });

  it('una coalición sin perfil propio no fabrica un principal a partir de sus componentes', () => {
    const generales = convocatoriaSintetica('generales', 'espana', [
      candidaturaSintetica('sint-coalicion', 100, [
        { perfilId: 'componente-a', relacion: 'componente' },
        { perfilId: 'componente-b', relacion: 'componente' },
      ]),
    ]);
    expect(
      partidosPrincipalesUltimasGenerales(
        [perfilSintetico('componente-a', 'estatal'), perfilSintetico('componente-b', 'estatal')],
        [generales],
        7,
      ),
    ).toEqual([]);
  });
});
