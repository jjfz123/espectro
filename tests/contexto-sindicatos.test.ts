import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  partidosPrincipalesUltimasGenerales,
  rankingAfinidad,
  respuestasEnCorpus,
  seleccionarPartidosElectorales,
  sindicatoRelevanteEnCcaa,
} from '../src/engine/index.js';
import type {
  ConvocatoriaElectoral,
  Partido,
  Respuesta,
  Sindicato,
} from '../src/engine/index.js';

const raiz = fileURLToPath(new URL('..', import.meta.url));

function leerDirectorio<T>(directorio: string): T[] {
  const ruta = join(raiz, directorio);
  return readdirSync(ruta)
    .filter((archivo) => archivo.endsWith('.json') && !archivo.startsWith('_'))
    .sort()
    .map((archivo) => JSON.parse(readFileSync(join(ruta, archivo), 'utf8')) as T);
}

describe('generales por CCAA: componentes territoriales de coaliciones estatales', () => {
  const partidos = leerDirectorio<Partido>('data/partidos');
  const convocatorias = leerDirectorio<ConvocatoriaElectoral>('data/convocatorias');

  function seleccionar(ccaa: 'catalunya' | 'galicia' | 'madrid' | 'aragon') {
    return seleccionarPartidosElectorales(partidos, convocatorias, {
      tipo: 'generales',
      ccaa,
    });
  }

  function idsPerfilesSumar(ccaa: 'catalunya' | 'galicia' | 'madrid' | 'aragon') {
    const sumar = seleccionar(ccaa).candidaturas.find(
      (candidatura) => candidatura.id === 'congreso-2023-07-sumar',
    );
    expect(sumar).toBeDefined();
    return sumar?.perfilRelaciones.map((relacion) => relacion.perfilId) ?? [];
  }

  it.each(['catalunya', 'galicia'] as const)(
    '%s conserva los componentes estatales, pero no arrastra MM, Compromís ni CHA',
    (ccaa) => {
      const seleccion = seleccionar(ccaa);
      const ids = seleccion.partidos.map((partido) => partido.id);
      const relacionesSumar = idsPerfilesSumar(ccaa);

      expect(ids).toEqual(expect.arrayContaining(['movimiento-sumar', 'iu', 'podemos']));
      for (const territorialAjeno of ['mas-madrid', 'compromis', 'chunta-aragonesista']) {
        expect(ids).not.toContain(territorialAjeno);
      }
      expect(relacionesSumar).toEqual(
        expect.arrayContaining(['movimiento-sumar', 'verdes-equo', 'iu', 'podemos']),
      );
      for (const territorialAjeno of ['mas-madrid', 'compromis', 'chunta-aragonesista']) {
        expect(relacionesSumar).not.toContain(territorialAjeno);
      }
    },
  );

  it('Madrid conserva Más Madrid como componente territorial aplicable, no Compromís ni CHA', () => {
    const ids = seleccionar('madrid').partidos.map((partido) => partido.id);
    const relacionesSumar = idsPerfilesSumar('madrid');

    expect(ids).toContain('mas-madrid');
    expect(relacionesSumar).toContain('mas-madrid');
    expect(ids).not.toContain('compromis');
    expect(ids).not.toContain('chunta-aragonesista');
    expect(relacionesSumar).not.toContain('compromis');
    expect(relacionesSumar).not.toContain('chunta-aragonesista');
  });

  it('Aragón conserva CHA como componente territorial aplicable, no MM ni Compromís', () => {
    const ids = seleccionar('aragon').partidos.map((partido) => partido.id);
    const relacionesSumar = idsPerfilesSumar('aragon');

    expect(ids).toContain('chunta-aragonesista');
    expect(relacionesSumar).toContain('chunta-aragonesista');
    expect(ids).not.toContain('mas-madrid');
    expect(ids).not.toContain('compromis');
    expect(relacionesSumar).not.toContain('mas-madrid');
    expect(relacionesSumar).not.toContain('compromis');
  });

  it('las europeas documentadas conservan su circunscripción única', () => {
    const seleccion = seleccionarPartidosElectorales(partidos, convocatorias, {
      tipo: 'europeas',
    });
    expect(seleccion.metodo).toBe('convocatoria-documentada');
    expect(seleccion.candidaturas.length).toBeGreaterThan(0);
    expect(seleccion.partidos.map((partido) => partido.id)).toEqual(
      expect.arrayContaining(['pp', 'psoe', 'eaj-pnv']),
    );
  });

  it('el fallback municipal aplica la CCAA y no mezcla organizaciones ajenas', () => {
    const seleccion = seleccionarPartidosElectorales(partidos, convocatorias, {
      tipo: 'municipales',
      ccaa: 'madrid',
    });
    expect(seleccion.metodo).toBe('heuristica-ambito');
    expect(seleccion.partidos.map((partido) => partido.id)).toContain('mas-madrid');
    expect(seleccion.partidos.map((partido) => partido.id)).not.toContain('compromis');
  });
});

describe('publicación sindical con cobertura bloqueante', () => {
  function sindicato(
    id: string,
    posiciones: Record<string, -2 | -1 | 0 | 1 | 2>,
    ambito: Sindicato['ambito'] = 'estatal',
  ): Sindicato {
    return {
      id,
      nombre: id,
      ambito,
      sectores: ambito === 'sectorial' ? ['educacion'] : undefined,
      confianza: 'verificada',
      revisado: '2026-07-11',
      posiciones: Object.fromEntries(
        Object.entries(posiciones).map(([itemId, valor]) => [itemId, { valor }]),
      ),
    };
  }

  it('no publica un 100 % sostenido por un solo ítem, aunque el ranking ordinario lo conserva con aviso', () => {
    const respuestas: Respuesta[] = [
      { itemId: 'a', valor: 2 },
      { itemId: 'b', valor: 2 },
      { itemId: 'c', valor: 2 },
      { itemId: 'd', valor: 2 },
    ];
    const unaCoincidencia = sindicato('una-coincidencia', { a: 2 });
    const coberturaSuficiente = sindicato('cobertura-suficiente', { a: 1, b: 1, c: 1 });
    const umbrales = { minimoItems: 3, umbralCobertura: 0.2 };

    const ordinario = rankingAfinidad(respuestas, [unaCoincidencia, coberturaSuficiente], umbrales);
    expect(ordinario[0]).toMatchObject({
      entidadId: 'una-coincidencia',
      puntuacion: 100,
      itemsComparados: 1,
      bajaCobertura: true,
    });

    const publicable = rankingAfinidad(respuestas, [unaCoincidencia, coberturaSuficiente], {
      ...umbrales,
      bloquearCoberturaInsuficiente: true,
    });
    expect(publicable.map((resultado) => resultado.entidadId)).toEqual([
      'cobertura-suficiente',
    ]);
  });

  it('bloquea por cobertura aunque alcance el mínimo absoluto de comparaciones', () => {
    const respuestas: Respuesta[] = Array.from({ length: 20 }, (_, indice) => ({
      itemId: `laboral-${indice + 1}`,
      valor: 2 as const,
    }));
    const tresDeVeinte = sindicato('tres-de-veinte', {
      'laboral-1': 2,
      'laboral-2': 2,
      'laboral-3': 2,
    });

    expect(
      rankingAfinidad(respuestas, [tresDeVeinte], {
        minimoItems: 3,
        umbralCobertura: 0.2,
        bloquearCoberturaInsuficiente: true,
      }),
    ).toEqual([]);
  });

  it('un perfil sectorial de un solo punto tampoco publica afinidad general', () => {
    const sectorial = sindicato('ensenanza-un-punto', { 'lab-001': 2 }, 'sectorial');

    expect(
      rankingAfinidad([{ itemId: 'lab-001', valor: 2 }], [sectorial], {
        minimoItems: 3,
        umbralCobertura: 0.2,
        bloquearCoberturaInsuficiente: true,
      }),
    ).toEqual([]);
  });

  it('las ramas sin posición en ningún sindicato no reducen la cobertura de todo el corpus', () => {
    const sindicatoPublicable = sindicato('publicable', { a: 2, b: 1, c: 0 });
    const respuestas: Respuesta[] = [
      { itemId: 'a', valor: 2 },
      { itemId: 'b', valor: 1 },
      { itemId: 'c', valor: 0 },
      ...Array.from({ length: 20 }, (_, indice) => ({
        itemId: `seguimiento-ajeno-${indice}`,
        valor: 2 as const,
      })),
    ];
    const comparables = respuestasEnCorpus(respuestas, [sindicatoPublicable]);
    expect(comparables.map((respuesta) => respuesta.itemId)).toEqual(['a', 'b', 'c']);
    expect(
      rankingAfinidad(comparables, [sindicatoPublicable], {
        minimoItems: 3,
        umbralCobertura: 0.2,
        bloquearCoberturaInsuficiente: true,
      }),
    ).toHaveLength(1);
  });

  it('un perfil no publicable no puede contaminar el denominador sindical', () => {
    const publicable = sindicato('publicable', { a: 2, b: 1, c: 0 });
    const contaminante: Sindicato = {
      ...sindicato(
        'contaminante',
        Object.fromEntries(
          Array.from({ length: 20 }, (_, indice) => [`ajeno-${indice}`, 2 as const]),
        ),
      ),
      confianza: 'sin-datos',
    };
    const respuestas: Respuesta[] = [
      { itemId: 'a', valor: 2 },
      { itemId: 'b', valor: 1 },
      { itemId: 'c', valor: 0 },
      ...Array.from({ length: 20 }, (_, indice) => ({
        itemId: `ajeno-${indice}`,
        valor: 2 as const,
      })),
    ];
    const comparables = respuestasEnCorpus(respuestas, [publicable, contaminante]);
    expect(comparables.map((respuesta) => respuesta.itemId)).toEqual(['a', 'b', 'c']);
    expect(
      rankingAfinidad(comparables, [publicable, contaminante], {
        minimoItems: 3,
        umbralCobertura: 0.2,
        bloquearCoberturaInsuficiente: true,
      }).map((resultado) => resultado.entidadId),
    ).toEqual(['publicable']);
  });

  it('los sindicatos sectoriales nacionales y territoriales no se confunden', () => {
    const nacional = sindicato('sectorial-nacional', { a: 1 }, 'sectorial');
    const catalan: Sindicato = {
      ...sindicato('sectorial-catalan', { a: 1 }, 'sectorial'),
      ccaa: ['catalunya'],
    };
    const territorialIncompleto: Sindicato = {
      ...sindicato('territorial-incompleto', { a: 1 }, 'territorial'),
      ccaa: undefined,
    };

    expect(sindicatoRelevanteEnCcaa(nacional, 'madrid')).toBe(true);
    expect(sindicatoRelevanteEnCcaa(catalan, 'catalunya')).toBe(true);
    expect(sindicatoRelevanteEnCcaa(catalan, 'madrid')).toBe(false);
    expect(sindicatoRelevanteEnCcaa(territorialIncompleto, 'madrid')).toBe(false);
  });

  it('los principales excluyen perfiles sin datos, monotemáticos o vacíos', () => {
    const candidatura = {
      id: 'prueba-candidatura',
      nombre: 'Prueba',
      votos: 100,
      porcentaje: 100,
      motivoInclusion: 'umbral' as const,
      perfilRelaciones: [
        { perfilId: 'sin-datos', relacion: 'misma-organizacion' as const },
        { perfilId: 'monotematico', relacion: 'coalicion' as const },
        { perfilId: 'vacio', relacion: 'organizacion-territorial' as const },
        { perfilId: 'valido', relacion: 'coalicion' as const },
      ],
    };
    const convocatoria: ConvocatoriaElectoral = {
      id: 'generales-prueba',
      nombre: 'Generales de prueba',
      tipo: 'generales',
      fecha: '2026-01-01',
      territorio: 'espana',
      camara: 'Congreso',
      umbralPorcentaje: 0.02,
      totalCandidaturasOficiales: 1,
      denominador: { tipo: 'votos-a-candidaturas', valor: 100 },
      fuente: { titulo: 'Fuente', url: 'https://example.com', consultado: '2026-01-01' },
      candidaturas: [candidatura],
    };
    const basePartido = {
      nombre: 'Perfil',
      ambito: 'estatal' as const,
      actividad: 'activa' as const,
      confianza: 'verificada' as const,
      posiciones: { a: { valor: 1 as const } },
    };
    const partidos: Partido[] = [
      { ...basePartido, id: 'sin-datos', confianza: 'sin-datos', posiciones: {} },
      { ...basePartido, id: 'monotematico', monotematico: true },
      { ...basePartido, id: 'vacio', posiciones: {} },
      { ...basePartido, id: 'valido' },
    ];
    expect(
      partidosPrincipalesUltimasGenerales(partidos, [convocatoria], 7).map(
        (resultado) => resultado.partido.id,
      ),
    ).toEqual(['valido']);
  });
});
