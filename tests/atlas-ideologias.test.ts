import { describe, expect, it } from 'vitest';
import { proyectarPartidoEnEspacio } from '../src/engine/espacio.js';
import type { AuditoriaBrujula } from '../src/engine/evidenciaMapa.js';
// El CLI es ESM reutilizable y delega en el mismo contrato puro que la web.
// @ts-expect-error el módulo .mjs no publica una declaración TypeScript propia
import { crearAuditoria } from '../scripts/auditar-brujula-partidos.mjs';
import {
  ANCLAS_ATLAS_BLOQUEADAS,
  ANCLAS_REGIONALES_ATLAS,
  CONTRATO_ATLAS,
  CORRIENTES_ATLAS,
  REGIONES_ATLAS,
  corrientesAtlasVisibles,
  corrienteAtlasMasCercana,
  entradasAtlasExplorables,
  gradoEvidenciaBrujula,
  nombreCapaAtlas,
  opcionesBusquedaAtlas,
  resolverOpcionBusquedaAtlas,
} from '../web/src/atlasIdeologias.js';
import {
  ENTIDADES_MAPA,
  EJE_ECONOMIA_BRUJULA,
  EJE_PODER_BRUJULA,
  EJES_MAPA,
} from '../web/src/mapaEspacial.js';
import { ITEMS } from '../web/src/datos.js';
import { PARTIDOS } from '../web/src/datosOrganizaciones.js';

describe('capas del atlas ideologico', () => {
  it('expone siempre A y reserva B para la profundidad', () => {
    const principales = corrientesAtlasVisibles(false);
    const profundas = corrientesAtlasVisibles(true);

    expect(principales.length).toBeGreaterThan(0);
    expect(principales.every((corriente) => corriente.decision === 'A')).toBe(true);
    expect(profundas.some((corriente) => corriente.decision === 'B')).toBe(true);
    expect(profundas.every((corriente) => corriente.decision !== 'E')).toBe(true);
    expect(profundas).toHaveLength(
      REGIONES_ATLAS.filter((corriente) => corriente.decision !== 'E').length,
    );
    expect(entradasAtlasExplorables(true)).toHaveLength(
      CORRIENTES_ATLAS.filter((corriente) => corriente.decision !== 'E').length,
    );
    expect(
      entradasAtlasExplorables(true).some((corriente) => corriente.capa !== 'region'),
    ).toBe(true);
  });

  it('la corriente cercana solo puede salir de la capa visible', () => {
    const posadismo = CORRIENTES_ATLAS.find((corriente) => corriente.id === 'posadismo');
    expect(posadismo?.decision).toBe('B');

    const principal = corrienteAtlasMasCercana(
      posadismo!.coordenadas.x,
      posadismo!.coordenadas.y,
      corrientesAtlasVisibles(false),
    );
    const profunda = corrienteAtlasMasCercana(
      posadismo!.coordenadas.x,
      posadismo!.coordenadas.y,
      corrientesAtlasVisibles(true),
    );

    expect(principal?.decision).toBe('A');
    expect(profunda?.id).toBe('posadismo');
  });

  it('bloquea la geometría en investigación sin ocultar la entrada nominal', () => {
    expect(ANCLAS_ATLAS_BLOQUEADAS).toHaveLength(20);
    expect(
      ANCLAS_ATLAS_BLOQUEADAS.every(
        (corriente) =>
          corriente.estado === 'investigacion' &&
          corriente.publicacionGeometrica === 'bloqueada-investigacion',
      ),
    ).toBe(true);
    expect(
      ANCLAS_REGIONALES_ATLAS.every(
        (corriente) => corriente.publicacionGeometrica !== undefined,
      ),
    ).toBe(true);
    for (const bloqueada of ANCLAS_ATLAS_BLOQUEADAS) {
      expect(REGIONES_ATLAS, bloqueada.id).not.toContain(bloqueada);
      expect(entradasAtlasExplorables(true), bloqueada.id).toContain(bloqueada);
      expect(
        corrienteAtlasMasCercana(bloqueada.coordenadas.x, bloqueada.coordenadas.y)?.id,
        bloqueada.id,
      ).not.toBe(bloqueada.id);
    }
  });

  it('mantiene cinco decisiones históricas E como contexto y no como regiones actuales', () => {
    for (const id of [
      'titoismo',
      'guevarismo',
      'menchevismo',
      'neozapatismo',
      'situacionismo',
    ]) {
      const entrada = CORRIENTES_ATLAS.find((corriente) => corriente.id === id);
      expect(entrada?.capa, id).toBe('contexto');
      expect(REGIONES_ATLAS, id).not.toContain(entrada);
      expect(entradasAtlasExplorables(true), id).toContain(entrada);
    }
  });

  it('conserva discriminantes y trata densidad/cuadrantes como diagnósticos', () => {
    expect(
      CORRIENTES_ATLAS.every(
        (corriente) =>
          corriente.preguntasDiscriminantes.length >= 3 &&
          new Set(corriente.preguntasDiscriminantes).size ===
            corriente.preguntasDiscriminantes.length,
      ),
    ).toBe(true);
    expect(CONTRATO_ATLAS.umbrales.minimoCorrientes).toBeGreaterThan(0);
    expect(CONTRATO_ATLAS.umbrales.minimoPorCuadrante).toBeGreaterThan(0);
    expect(REGIONES_ATLAS.length).toBeLessThan(ANCLAS_REGIONALES_ATLAS.length);
  });

  it('mantiene diagnósticos y contextos localizables pero fuera de Voronoi', () => {
    const cleptocracia = CORRIENTES_ATLAS.find((corriente) => corriente.id === 'cleptocracia');
    expect(cleptocracia?.capa).toBe('diagnostico');
    expect(entradasAtlasExplorables(true)).toContain(cleptocracia);
    expect(REGIONES_ATLAS).not.toContain(cleptocracia);
    expect(
      corrienteAtlasMasCercana(
        cleptocracia!.coordenadas.x,
        cleptocracia!.coordenadas.y,
      )?.id,
    ).not.toBe('cleptocracia');
  });

  it('conserva las quince etiquetas sustituidas como búsquedas contextuales separadas', () => {
    const sustituciones = CORRIENTES_ATLAS.filter(
      (corriente) => corriente.trazabilidadOriginal !== undefined,
    );
    const opciones = opcionesBusquedaAtlas(true);
    const rotulosOriginales = opciones.filter(
      (opcion) => opcion.vista === 'rotulo-original',
    );

    expect(sustituciones).toHaveLength(15);
    expect(rotulosOriginales).toHaveLength(sustituciones.length);
    for (const corriente of sustituciones) {
      const opcion = rotulosOriginales.find(
        (candidata) => candidata.corrienteId === corriente.id,
      );
      expect(opcion?.nombre, corriente.id).toBe(
        corriente.trazabilidadOriginal?.nombreOriginal,
      );
      expect(opcion?.etiquetaFuente, corriente.id).toBe(
        corriente.trazabilidadOriginal?.etiquetaOriginal,
      );
      expect(corriente.etiquetaOriginal, corriente.id).not.toBe(
        corriente.trazabilidadOriginal?.etiquetaOriginal,
      );
      expect(corriente.trazabilidadOriginal?.numeroOriginal).toBeGreaterThanOrEqual(1);
      expect(corriente.trazabilidadOriginal?.numeroOriginal).toBeLessThanOrEqual(178);
      expect(corriente.trazabilidadOriginal?.decisionOriginal).toMatch(/^[A-F]$/u);
      expect(
        resolverOpcionBusquedaAtlas(opcion?.clave ?? '', true),
        corriente.id,
      ).toEqual(opcion);
      expect(
        resolverOpcionBusquedaAtlas(opcion?.clave ?? '', false) !== null,
        `${corriente.id} debe respetar su decisión de capa`,
      ).toBe(corriente.decision === 'A');
    }
  });

  it('expone nombres humanos de capa y no los ids internos del contrato', () => {
    expect(nombreCapaAtlas('region')).toBe('región ideológica');
    expect(nombreCapaAtlas('faceta')).toBe('faceta transversal');
    expect(nombreCapaAtlas('contexto')).toBe('contexto histórico o comparado');
    expect(nombreCapaAtlas('diagnostico')).toBe('diagnóstico institucional');
    expect(nombreCapaAtlas('modelo-historico')).toBe('modelo histórico');
  });

  it('separa coordenadas sólidas, provisionales e insuficientes sin rellenar huecos', () => {
    expect(
      gradoEvidenciaBrujula(
        { items: 6, familias: 3, itemsNucleo: 0, suficiente: true },
        { items: 6, familias: 3, itemsNucleo: 2, suficiente: true },
      ),
    ).toBe('solida');
    expect(
      gradoEvidenciaBrujula(
        { items: 3, familias: 2, itemsNucleo: 0, suficiente: false },
        { items: 3, familias: 2, itemsNucleo: 1, suficiente: false },
      ),
    ).toBe('provisional');
    expect(
      gradoEvidenciaBrujula(
        { items: 3, familias: 2, itemsNucleo: 0, suficiente: false },
        { items: 3, familias: 2, itemsNucleo: 0, suficiente: false },
      ),
    ).toBe('insuficiente');
  });

  it('solo publica partidos que superan la puerta documental y nunca marca referencias como provisionales', () => {
    const partidosBrujula = ENTIDADES_MAPA.filter(
      (entidad) =>
        entidad.tipo === 'partido' &&
        typeof entidad.valores[EJE_ECONOMIA_BRUJULA.id] === 'number' &&
        typeof entidad.valores[EJE_PODER_BRUJULA.id] === 'number',
    );
    expect(
      partidosBrujula.every(
        (partido) =>
          partido.evidenciaBrujula?.grado === 'solida' ||
          partido.evidenciaBrujula?.grado === 'provisional',
      ),
    ).toBe(true);
    // El atlas puede quedar temporalmente sin puntos partidistas mientras el
    // inventario documental sigue abierto. La puerta no se rebaja para
    // satisfacer un mínimo visual: el cierre estricto del TODO exige completar
    // después todos los perfiles, y aquí verificamos que ninguno insuficiente
    // se cuele en el mapa durante ese trabajo.
    const auditoria = crearAuditoria({
      items: ITEMS,
      partidos: PARTIDOS,
      atlas: CONTRATO_ATLAS,
    }) as AuditoriaBrujula;
    const idsPublicados = new Set(partidosBrujula.map((partido) => partido.id));
    expect(
      auditoria.resultados
        .filter((resultado) => resultado.grado === 'insuficiente')
        .every((resultado) => !idsPublicados.has(resultado.id)),
    ).toBe(true);
    expect(
      ENTIDADES_MAPA.some(
        (entidad) =>
          entidad.tipo === 'referencia' && entidad.evidenciaBrujula?.grado === 'provisional',
      ),
    ).toBe(false);
  });

  it('publica exactamente las coordenadas y el grado del auditor compartido', () => {
    const auditoria = crearAuditoria({
      items: ITEMS,
      partidos: PARTIDOS,
      atlas: CONTRATO_ATLAS,
    }) as AuditoriaBrujula;
    const entidadPorId = new Map(
      ENTIDADES_MAPA.filter((entidad) => entidad.tipo === 'partido').map((entidad) => [
        entidad.id,
        entidad,
      ]),
    );

    for (const resultado of auditoria.resultados.filter(
      (entrada) => entrada.grado !== 'insuficiente',
    )) {
      const entidad = entidadPorId.get(resultado.id);
      expect(entidad, `${resultado.id} debe reflejar el recibo de CI`).toBeDefined();
      expect(entidad?.evidenciaBrujula?.grado).toBe(resultado.grado);
      expect(entidad?.valores[EJE_ECONOMIA_BRUJULA.id]).toBe(resultado.x.valor);
      expect(entidad?.valores[EJE_PODER_BRUJULA.id]).toBe(resultado.y.valor);
    }
  });

  it.each(['pce', 'crt', 'compromis', 'geroa-bai', 'bng', 'mas-madrid'])(
    '%s conserva el promedio crudo solo como diagnóstico y publica valorPorGrupos',
    (id) => {
      const auditoria = crearAuditoria({
        items: ITEMS,
        partidos: PARTIDOS,
        atlas: CONTRATO_ATLAS,
      }) as AuditoriaBrujula;
      const resultado = auditoria.resultados.find(
        (entrada) => entrada.id === id,
      );
      expect(resultado, `${id} debe estar en el recibo nominal`).toBeDefined();
      if (!resultado) throw new Error(`${id} no aparece en el recibo nominal`);
      expect(resultado.x.valor).toBe(resultado.x.valorPorGrupos);
      expect(resultado.y.valor).toBe(resultado.y.valorPorGrupos);

      const entidad = ENTIDADES_MAPA.find(
        (entrada) => entrada.tipo === 'partido' && entrada.id === id,
      );
      if (resultado.grado === 'insuficiente') {
        expect(
          typeof entidad?.valores[EJE_ECONOMIA_BRUJULA.id] === 'number' &&
            typeof entidad?.valores[EJE_PODER_BRUJULA.id] === 'number',
        ).toBe(false);
      } else {
        expect(entidad?.valores[EJE_ECONOMIA_BRUJULA.id]).toBe(resultado.x.valorPorGrupos);
        expect(entidad?.valores[EJE_PODER_BRUJULA.id]).toBe(resultado.y.valorPorGrupos);
      }
    },
  );

  it('los tres macroejes de cada partido reflejan la proyección documental deduplicada', () => {
    const entidadPorId = new Map(
      ENTIDADES_MAPA.filter((entidad) => entidad.tipo === 'partido').map((entidad) => [
        entidad.id,
        entidad,
      ]),
    );

    for (const partido of PARTIDOS.filter(
      (entrada) => entrada.publicacionMapa?.publicable !== false,
    )) {
      const proyeccion = proyectarPartidoEnEspacio(partido, ITEMS, EJES_MAPA);
      const entidad = entidadPorId.get(partido.id);
      if (!entidad) continue;

      for (const faceta of proyeccion.facetas) {
        if (faceta.coberturaSuficiente && typeof faceta.valor === 'number') {
          expect(entidad.valores[faceta.facetaId], `${partido.id}/${faceta.facetaId}`).toBe(
            faceta.valor,
          );
        } else {
          expect(entidad.valores[faceta.facetaId], `${partido.id}/${faceta.facetaId}`).toBeUndefined();
        }
      }
    }
  });
});
