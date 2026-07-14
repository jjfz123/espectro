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
  corrienteMapeableEnComunidad,
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
import { BRUJULA_PARTIDO_POR_ID } from '../web/src/brujulaPartidos.js';

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

  it('las anclas de investigación quedaron instrumentadas: 0 bloqueadas y geometría publicada coherente (2026-07-12)', () => {
    expect(ANCLAS_ATLAS_BLOQUEADAS).toHaveLength(0);
    expect(
      CORRIENTES_ATLAS.filter((corriente) => corriente.capa === 'region').every(
        (corriente) =>
          corriente.estado !== 'investigacion' &&
          (corriente.estado !== 'instrumentada' ||
            (typeof corriente.referenciaId === 'string' &&
              corriente.publicacionGeometrica === 'publicada')),
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
    /* 92/92 tras cerrar las 20 anclas (2026-07-12): toda ancla regional dibuja región. */
    expect(REGIONES_ATLAS.length).toBeLessThanOrEqual(ANCLAS_REGIONALES_ATLAS.length);
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

  it('los regionalismos solo se cartografían con su comunidad autónoma seleccionada', () => {
    const territoriales = REGIONES_ATLAS.filter(
      (corriente) => (corriente.comunidadAutonoma?.length ?? 0) > 0,
    );
    // Andalucismo, aranismo, galleguismo, blaverismo y foralismo, como mínimo.
    expect(territoriales.length).toBeGreaterThanOrEqual(5);

    // Sin filtro (undefined) = catálogo completo: enciclopedia y recuentos ven todo.
    expect(corrientesAtlasVisibles(true).length).toBe(
      REGIONES_ATLAS.filter((corriente) => corriente.decision !== 'E').length,
    );

    // «Sin comunidad» ('') deja fuera del eje a todos los regionalismos territoriales.
    const sinComunidad = corrientesAtlasVisibles(true, '');
    expect(sinComunidad.some((corriente) => (corriente.comunidadAutonoma?.length ?? 0) > 0)).toBe(
      false,
    );
    expect(sinComunidad.length).toBe(
      REGIONES_ATLAS.filter((corriente) => corriente.decision !== 'E').length -
        territoriales.length,
    );

    // Andalucía revela el andalucismo, no el aranismo ni el galleguismo.
    const idsAndalucia = new Set(corrientesAtlasVisibles(true, 'andalucia').map((c) => c.id));
    expect(idsAndalucia.has('andalucismo-blasinfantiano')).toBe(true);
    expect(idsAndalucia.has('aranismo-sabiniano')).toBe(false);
    expect(idsAndalucia.has('galleguismo-castelaiano')).toBe(false);

    // Euskadi revela aranismo y foralismo (etiquetados euskadi+navarra), no el andalucismo.
    const idsEuskadi = new Set(corrientesAtlasVisibles(true, 'euskadi').map((c) => c.id));
    expect(idsEuskadi.has('aranismo-sabiniano')).toBe(true);
    expect(idsEuskadi.has('foralismo-fuerista-pactista')).toBe(true);
    expect(idsEuskadi.has('andalucismo-blasinfantiano')).toBe(false);

    // Una corriente estatal (sin etiqueta territorial) se cartografía siempre.
    const estatal = REGIONES_ATLAS.find((corriente) => !corriente.comunidadAutonoma);
    expect(estatal, 'debe existir alguna región estatal').toBeDefined();
    expect(corrienteMapeableEnComunidad(estatal!, '')).toBe(true);
    expect(corrienteMapeableEnComunidad(estatal!, 'madrid')).toBe(true);
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

  it('cada punto partidista lleva un grado declarado y nunca marca referencias con niveles partidistas', () => {
    const partidosBrujula = ENTIDADES_MAPA.filter(
      (entidad) =>
        entidad.tipo === 'partido' &&
        typeof entidad.valores[EJE_ECONOMIA_BRUJULA.id] === 'number' &&
        typeof entidad.valores[EJE_PODER_BRUJULA.id] === 'number',
    );
    const partidosActivos = PARTIDOS.filter((partido) => partido.actividad === 'activa');
    expect(partidosBrujula).toHaveLength(partidosActivos.length);
    expect(new Set(partidosBrujula.map((partido) => partido.id))).toEqual(
      new Set(partidosActivos.map((partido) => partido.id)),
    );
    expect(
      partidosBrujula.every(
        (partido) =>
          partido.evidenciaBrujula?.grado === 'solida' ||
          partido.evidenciaBrujula?.grado === 'provisional' ||
          partido.evidenciaBrujula?.grado === 'estimada' ||
          partido.evidenciaBrujula?.grado === 'orientativa' ||
          partido.evidenciaBrujula?.grado === 'monotematica',
      ),
    ).toBe(true);
    const auditoria = crearAuditoria({
      items: ITEMS,
      partidos: PARTIDOS,
      atlas: CONTRATO_ATLAS,
    }) as AuditoriaBrujula;
    const partidoActivoPorId = new Map(partidosActivos.map((partido) => [partido.id, partido]));
    const entidadPorId = new Map(partidosBrujula.map((partido) => [partido.id, partido]));
    for (const resultado of auditoria.resultados.filter((entrada) =>
      partidoActivoPorId.has(entrada.id),
    )) {
      const entidad = entidadPorId.get(resultado.id);
      const perfil = partidoActivoPorId.get(resultado.id);
      const esperado =
        resultado.grado === 'insuficiente'
          ? perfil?.monotematico
            ? 'monotematica'
            : 'orientativa'
          : resultado.grado;
      expect(entidad?.evidenciaBrujula?.grado, resultado.id).toBe(esperado);
    }
    expect(
      partidosBrujula.some((partido) => partido.evidenciaBrujula?.grado === 'estimada'),
    ).toBe(true);
    expect(
      partidosBrujula.some((partido) => partido.evidenciaBrujula?.grado === 'orientativa'),
    ).toBe(true);
    expect(
      partidosBrujula.some((partido) => partido.evidenciaBrujula?.grado === 'monotematica'),
    ).toBe(true);
    expect(
      ENTIDADES_MAPA.some(
        (entidad) =>
          entidad.tipo === 'referencia' &&
          entidad.evidenciaBrujula !== undefined,
      ),
    ).toBe(false);
  });

  it('publica las 65 coordenadas calibradas y conserva aparte el recibo estricto del auditor', () => {
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
    const activos = new Set(
      PARTIDOS.filter((partido) => partido.actividad === 'activa').map((partido) => partido.id),
    );

    for (const resultado of auditoria.resultados.filter((entrada) => activos.has(entrada.id))) {
      const entidad = entidadPorId.get(resultado.id);
      const calibracion = BRUJULA_PARTIDO_POR_ID.get(resultado.id);
      expect(entidad, `${resultado.id} debe permanecer en el plano`).toBeDefined();
      expect(calibracion, `${resultado.id} debe tener calibración explícita`).toBeDefined();
      expect(entidad?.valores[EJE_ECONOMIA_BRUJULA.id]).toBe(calibracion?.x);
      expect(entidad?.valores[EJE_PODER_BRUJULA.id]).toBe(calibracion?.y);
      expect(entidad?.evidenciaBrujula?.valorDirectoX).toBe(resultado.x.valor);
      expect(entidad?.evidenciaBrujula?.valorDirectoY).toBe(resultado.y.valor);
      expect(entidad?.evidenciaBrujula?.propiedad.items).toBe(resultado.x.grupos);
      expect(entidad?.evidenciaBrujula?.poder.items).toBe(resultado.y.grupos);
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
      const calibracion = BRUJULA_PARTIDO_POR_ID.get(id);
      expect(entidad, `${id} debe permanecer visible aunque el recibo sea incompleto`).toBeDefined();
      expect(entidad?.evidenciaBrujula?.valorDirectoX).toBe(resultado.x.valorPorGrupos);
      expect(entidad?.evidenciaBrujula?.valorDirectoY).toBe(resultado.y.valorPorGrupos);
      expect(entidad?.valores[EJE_ECONOMIA_BRUJULA.id]).toBe(calibracion?.x);
      expect(entidad?.valores[EJE_PODER_BRUJULA.id]).toBe(calibracion?.y);
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
