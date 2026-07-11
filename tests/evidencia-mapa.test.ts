import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import {
  auditarPerfilBrujula,
  coordenadaAuditable,
  evaluarPosicion,
  proyectarEnEspacio,
  proyectarPartidoEnEspacio,
  transcripcionesRelacionadas,
} from '../src/engine/index.js';
import type { Eje, Item, PerfilAfinidad, Posicion, Valor } from '../src/engine/index.js';

const EJE: Eje = {
  id: 'economico',
  nombre: 'Economía',
  poloNegativo: 'Izquierda',
  poloPositivo: 'Derecha',
};

function item(id: string, carga = 1): Item {
  return {
    id,
    texto: id,
    modulo: 'nucleo',
    ejes: [{ eje: EJE.id, carga }],
  };
}

function posicion(
  valor: Valor,
  documento: string,
  cita: string,
  justificacion = 'La cita contesta directamente la dicotomía del ítem.',
  grupoEvidencia?: string,
): Posicion {
  const grupoGenerado = `test-${documento}-${cita}`
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 100);
  return {
    valor,
    justificacion,
    calidadEvidencia: 'alta',
    grupoEvidencia: grupoEvidencia ?? grupoGenerado,
    fuente: {
      tipo: 'programa',
      titulo: `Documento ${documento}`,
      url: `https://example.test/${documento}.pdf`,
      consultado: '2026-07-11',
      cita,
    },
  };
}

function perfil(posiciones: Record<string, Posicion>): PerfilAfinidad {
  return {
    id: 'partido-sintetico',
    nombre: 'Partido sintético',
    confianza: 'verificada',
    posiciones,
  };
}

describe('contrato documental de coordenadas', () => {
  it('la reconstrucción limpia reconoce el pasaje repetido real del PCTE', () => {
    const pcte = JSON.parse(
      readFileSync(new URL('../data/partidos/pcte.json', import.meta.url), 'utf8'),
    ) as PerfilAfinidad;
    const autonomia = structuredClone(pcte.posiciones['dem-033']!);
    const confederal = structuredClone(pcte.posiciones['dem-034']!);
    delete autonomia.grupoEvidencia;
    delete confederal.grupoEvidencia;
    expect(transcripcionesRelacionadas(autonomia, confederal)).toBe(true);
  });

  it('publica la media de pasajes deduplicados y conserva el promedio crudo solo como diagnóstico', () => {
    const items = [item('a'), item('b'), item('c')];
    const posiciones = {
      a: posicion(2, 'programa-a', 'La misma propuesta de propiedad privada para ambas preguntas.'),
      b: posicion(2, 'programa-a', 'La misma propuesta de propiedad privada para ambas preguntas.'),
      c: posicion(-2, 'programa-b', 'Una propuesta independiente de propiedad social y cooperativa.'),
    } satisfies Record<string, Posicion>;

    const recibo = coordenadaAuditable(
      posiciones,
      EJE.id,
      new Map(items.map((entrada) => [entrada.id, entrada])),
    );

    expect(recibo.grupos).toBe(2);
    expect(recibo.componentes.map(({ items: ids }) => ids)).toContainEqual(['a', 'b']);
    expect(recibo.valorPorItems).toBe(33.3);
    expect(recibo.valorPorGrupos).toBe(0);
    expect(recibo.valor).toBe(recibo.valorPorGrupos);
  });

  it('bloquea ids distintos que probablemente describen el mismo pasaje', () => {
    const items = [item('a'), item('b')];
    const posiciones = {
      a: posicion(
        2,
        'programa-a',
        'La propiedad colectiva se ejercerá mediante control democrático de quienes trabajan.',
        undefined,
        'pasaje-declarado-a',
      ),
      b: posicion(
        2,
        'programa-a',
        'La propiedad colectiva se ejercerá mediante control demo\u200Bcrático de quienes trabajan. Esta regla se aplicará a los sectores estratégicos.',
        undefined,
        'pasaje-declarado-b',
      ),
    } satisfies Record<string, Posicion>;
    const recibo = coordenadaAuditable(
      posiciones,
      EJE.id,
      new Map(items.map((entrada) => [entrada.id, entrada])),
    );
    expect(recibo.grupos).toBe(0);
    expect(recibo.omitidos.map((entrada) => entrada.itemId)).toEqual(['a', 'b']);
    expect(recibo.omitidos.every((entrada) => entrada.motivo?.includes('conflicto'))).toBe(true);
  });

  it('bloquea un mismo id manual si agrupa transcripciones inconexas', () => {
    const items = [item('a'), item('b')];
    const posiciones = {
      a: posicion(
        2,
        'programa-a',
        'La propiedad de los sectores estratégicos pasará al control cooperativo de sus trabajadores.',
        undefined,
        'pasaje-manual-compartido',
      ),
      b: posicion(
        -2,
        'programa-a',
        'El parlamento elegirá a la presidencia mediante una mayoría reforzada y con mandato limitado.',
        undefined,
        'pasaje-manual-compartido',
      ),
    } satisfies Record<string, Posicion>;
    const recibo = coordenadaAuditable(
      posiciones,
      EJE.id,
      new Map(items.map((entrada) => [entrada.id, entrada])),
    );
    expect(recibo.grupos).toBe(0);
    expect(recibo.omitidos.map((entrada) => entrada.itemId)).toEqual(['a', 'b']);
  });

  it('no acepta coherencia transitiva A-B-C cuando A y C no son el mismo pasaje', () => {
    const comunes = Array.from({ length: 30 }, (_, indice) => `comun${indice}`).join(' ');
    const tramoA = Array.from({ length: 20 }, (_, indice) => `propiedad${indice}`).join(' ');
    const tramoC = Array.from({ length: 20 }, (_, indice) => `institucion${indice}`).join(' ');
    const citaA = `${tramoA} ${comunes}`;
    const citaB = `${tramoA} ${comunes} ${tramoC}`;
    const citaC = `${comunes} ${tramoC}`;
    const items = [item('a'), item('b'), item('c')];
    const posiciones = {
      a: posicion(2, 'cadena', citaA, undefined, 'pasaje-cadena'),
      b: posicion(2, 'cadena', citaB, undefined, 'pasaje-cadena'),
      c: posicion(-2, 'cadena', citaC, undefined, 'pasaje-cadena'),
    } satisfies Record<string, Posicion>;
    expect(transcripcionesRelacionadas(posiciones.a, posiciones.b)).toBe(true);
    expect(transcripcionesRelacionadas(posiciones.b, posiciones.c)).toBe(true);
    expect(transcripcionesRelacionadas(posiciones.a, posiciones.c)).toBe(false);
    const recibo = coordenadaAuditable(
      posiciones,
      EJE.id,
      new Map(items.map((entrada) => [entrada.id, entrada])),
    );
    expect(recibo.grupos).toBe(0);
    expect(recibo.omitidos.map((entrada) => entrada.itemId)).toEqual(['a', 'b', 'c']);
  });

  it('no fusiona una frase corta con otro pasaje largo por compartir vocabulario', () => {
    const items = [item('a'), item('b')];
    const frase = 'Derecho universal a una vivienda digna para toda la ciudadanía.';
    const posiciones = {
      a: posicion(2, 'programa-a', frase, undefined, 'pagina-10-vivienda'),
      b: posicion(
        -2,
        'programa-a',
        `${frase} En una sección distinta, el documento desarrolla después la organización de la enseñanza, las becas, la fiscalidad educativa y la elección de los consejos escolares sin formular una segunda medida de propiedad.`,
        undefined,
        'pagina-80-educacion',
      ),
    } satisfies Record<string, Posicion>;
    const recibo = coordenadaAuditable(
      posiciones,
      EJE.id,
      new Map(items.map((entrada) => [entrada.id, entrada])),
    );
    expect(recibo.grupos).toBe(2);
    expect(recibo.omitidos).toEqual([]);
  });

  it('una URL completa no sustituye al pasaje y un cero ambiguo tampoco puntúa', () => {
    const sinLocalizador = posicion(2, 'sin-cita', 'Este texto se eliminará del objeto fuente.');
    delete sinLocalizador.fuente?.cita;
    const ceroAmbiguo = posicion(
      0,
      'cero-ambiguo',
      'El documento contiene varias medidas económicas sin una conclusión unívoca.',
      'La justificación no decide la dicotomía del ítem.',
    );
    const sinGrupo = posicion(2, 'sin-grupo', 'Pasaje reproducible pero sin identidad canónica.');
    delete sinGrupo.grupoEvidencia;
    const ceroResuelto = posicion(
      0,
      'cero-resuelto',
      'El programa combina expresamente propiedad pública y privada.',
      'El pasaje combina expresamente ambos modelos y resuelve el cero.',
    );
    ceroResuelto.resolucionCero = {
      tipo: 'modelo-mixto',
      explicacion: 'El mismo pasaje enumera propiedad pública y privada como partes del modelo.',
    };

    expect(evaluarPosicion(sinLocalizador)).toMatchObject({
      sustentada: false,
      motivo: 'sin pasaje o localizador reproducible',
    });
    expect(evaluarPosicion(ceroAmbiguo)).toMatchObject({
      sustentada: false,
      motivo: 'valor 0 sin resolución documental explícita',
    });
    expect(evaluarPosicion(sinGrupo)).toMatchObject({
      sustentada: false,
      motivo: 'sin identificador canónico de pasaje',
    });
    expect(evaluarPosicion(ceroResuelto).sustentada).toBe(true);
  });

  it('rechaza valores, protocolos, fechas y ceros manipulados aunque la justificación use palabras mágicas', () => {
    const base = posicion(0, 'hostil', 'Texto totalmente ajeno a la dicotomía que se pretende medir.');
    base.justificacion = 'El documento combina expresamente cualquier cosa.';
    expect(evaluarPosicion(base).sustentada).toBe(false);

    const silencio = posicion(0, 'silencio', 'Pasaje ajeno que no resuelve la dicotomía.');
    (silencio as unknown as { resolucionCero: { tipo: string; explicacion: string } }).resolucionCero = {
      tipo: 'silencio-comprobado',
      explicacion: 'La ausencia de una posición no puede convertirse en una coordenada neutral.',
    };
    expect(evaluarPosicion(silencio).sustentada).toBe(false);

    const fueraDeEscala = posicion(2, 'valor', 'Pasaje reproducible para probar el rango.');
    (fueraDeEscala as unknown as { valor: number }).valor = 99;
    expect(evaluarPosicion(fueraDeEscala).sustentada).toBe(false);

    const protocolo = posicion(2, 'protocolo', 'Pasaje reproducible para probar el protocolo.');
    protocolo.fuente!.url = 'ftp://example.test/documento.pdf';
    expect(evaluarPosicion(protocolo).sustentada).toBe(false);

    const fecha = posicion(2, 'fecha', 'Pasaje reproducible para probar la fecha de consulta.');
    fecha.fuente!.consultado = 'no-es-fecha';
    expect(evaluarPosicion(fecha).sustentada).toBe(false);

    for (const fechaFuente of [7, '2026-13', '2026-02-31']) {
      const hostil = posicion(
        2,
        `fecha-fuente-${String(fechaFuente)}`,
        'Pasaje reproducible para probar la fecha editorial de la fuente.',
      );
      (hostil.fuente as unknown as Record<string, unknown>).fecha = fechaFuente;
      expect(() => evaluarPosicion(hostil)).not.toThrow();
      expect(evaluarPosicion(hostil).sustentada).toBe(false);
    }

    for (const fechaFuente of ['2026', '2026-07', '2026-07-11']) {
      const valida = posicion(
        2,
        `fecha-fuente-valida-${fechaFuente}`,
        'Pasaje reproducible con fecha editorial válida y precisión declarada.',
      );
      valida.fuente!.fecha = fechaFuente;
      expect(evaluarPosicion(valida).sustentada).toBe(true);
    }

    const calidadInventada = posicion(2, 'calidad', 'Pasaje reproducible para probar calidad.');
    (calidadInventada as unknown as { calidadEvidencia: string }).calidadEvidencia = 'inventada';
    expect(evaluarPosicion(calidadInventada).sustentada).toBe(false);

    const sinTipo = posicion(2, 'sin-tipo', 'Pasaje reproducible sin tipo de fuente.');
    delete (sinTipo.fuente as Partial<NonNullable<Posicion['fuente']>>).tipo;
    expect(evaluarPosicion(sinTipo).sustentada).toBe(false);

    for (const [campo, valor] of [
      ['justificacion', 7],
      ['grupoEvidencia', 7],
    ] as const) {
      const hostil = posicion(2, `tipo-${campo}`, 'Pasaje reproducible para tipos hostiles.');
      (hostil as unknown as Record<string, unknown>)[campo] = valor;
      expect(() => evaluarPosicion(hostil)).not.toThrow();
      expect(evaluarPosicion(hostil).sustentada).toBe(false);
    }

    const tituloHostil = posicion(2, 'titulo-hostil', 'Pasaje reproducible para título hostil.');
    (tituloHostil.fuente as unknown as Record<string, unknown>).titulo = 7;
    expect(() => evaluarPosicion(tituloHostil)).not.toThrow();
    expect(evaluarPosicion(tituloHostil).sustentada).toBe(false);

    const ceroHostil = posicion(0, 'cero-hostil', 'Pasaje reproducible para cero hostil.');
    ceroHostil.resolucionCero = {
      tipo: 'modelo-mixto',
      explicacion: 'Explicación inicialmente válida de un modelo explícitamente mixto.',
    };
    (ceroHostil.resolucionCero as unknown as Record<string, unknown>).explicacion = 7;
    expect(() => evaluarPosicion(ceroHostil)).not.toThrow();
    expect(evaluarPosicion(ceroHostil).sustentada).toBe(false);
  });
});

describe('proyección documental de partidos en los macroejes', () => {
  it('retira el umbral de cuatro posiciones crudas: exige cuatro pasajes independientes', () => {
    const items = [item('a'), item('b'), item('c'), item('d')];
    const citaRepetida = 'La misma frase del programa repetida en cuatro codificaciones.';
    const partido = perfil({
      a: posicion(2, 'programa-unico', citaRepetida),
      b: posicion(2, 'programa-unico', citaRepetida),
      c: posicion(2, 'programa-unico', citaRepetida),
      d: posicion(2, 'programa-unico', citaRepetida),
    });

    // La ruta general se conserva para usuario/referencias y sigue midiendo
    // respuestas: solo la publicación de partidos aplica el contrato documental.
    expect(proyectarEnEspacio(partido, items, [EJE]).incluida).toBe(true);

    const documental = proyectarPartidoEnEspacio(partido, items, [EJE]);
    expect(documental.incluida).toBe(false);
    expect(documental.ejesInsuficientes).toEqual([EJE.id]);
    expect(documental.facetas[0]).toMatchObject({
      valor: 100,
      itemsRespondidos: 1,
      coberturaSuficiente: false,
    });
    expect(documental.evidenciaDocumental?.[EJE.id]?.grupos).toBe(1);
  });

  it('incluye el macroeje cuando cuatro pasajes reproducibles e independientes lo sostienen', () => {
    const items = [item('a'), item('b'), item('c'), item('d')];
    const partido = perfil(
      Object.fromEntries(
        items.map((entrada, indice) => [
          entrada.id,
          posicion(
            indice < 3 ? 2 : -2,
            `programa-${indice}`,
            `Pasaje independiente número ${indice} que contesta el eje económico.`,
          ),
        ]),
      ),
    );

    const documental = proyectarPartidoEnEspacio(partido, items, [EJE]);
    expect(documental.incluida).toBe(true);
    expect(documental.facetas[0]).toMatchObject({
      valor: 50,
      itemsRespondidos: 4,
      coberturaSuficiente: true,
    });
  });

  it('no publica un extremo compuesto solo por posiciones bandera en la misma dirección', () => {
    const items = [item('a'), item('b'), item('c'), item('d')];
    const partido = perfil(
      Object.fromEntries(
        items.map((entrada, indice) => [
          entrada.id,
          posicion(2, `bandera-${indice}`, `Pasaje bandera independiente número ${indice}.`),
        ]),
      ),
    );
    const documental = proyectarPartidoEnEspacio(partido, items, [EJE]);
    expect(documental.evidenciaDocumental?.[EJE.id]?.extremoSinContrapeso).toBe(true);
    expect(documental.incluida).toBe(false);
    expect(documental.facetas[0]?.coberturaSuficiente).toBe(false);
  });

  it('un perfil sin datos nunca entra por el umbral provisional', () => {
    const items = ['x1', 'x2', 'x3', 'y1', 'y2', 'y3'].map((id) =>
      item(id, id.startsWith('x') ? 1 : 0),
    );
    for (const [indice, entrada] of items.entries()) {
      entrada.ejes = [{ eje: indice < 3 ? 'x' : 'y', carga: indice % 2 === 0 ? 1 : -1 }];
    }
    const posiciones = Object.fromEntries(
      items.map((entrada, indice) => [
        entrada.id,
        posicion(
          indice % 2 === 0 ? 2 : -2,
          `sin-datos-${indice}`,
          `Pasaje independiente para el grupo documental ${indice}.`,
        ),
      ]),
    );
    const resultado = auditarPerfilBrujula(
      { ...perfil(posiciones), confianza: 'sin-datos' },
      items,
      {
        sistema: {
          ejeX: 'x',
          ejeY: 'y',
          subdimensionesX: { a: ['x1', 'x2'], b: ['x3'] },
          familiasY: { a: ['y1', 'y2'], b: ['y3'] },
          familiasNucleoY: ['a'],
        },
        umbrales: {
          minimoItemsX: 6,
          minimoSubdimensionesX: 3,
          minimoItemsY: 6,
          minimoFamiliasY: 3,
          minimoItemsNucleoY: 2,
        },
      },
    );
    expect(resultado.grado).toBe('insuficiente');
    expect(resultado.problemas).toContain('perfil sin datos');
  });

  it('MAP-05 bloquea una X 4+1+1 aunque alcance seis grupos y tres subdimensiones', () => {
    const items: Item[] = [
      ...Array.from({ length: 6 }, (_, indice) => ({
        ...item(`x${indice + 1}`),
        ejes: [{ eje: 'x', carga: indice % 2 === 0 ? 1 : -1 }],
      })),
      ...Array.from({ length: 6 }, (_, indice) => ({
        ...item(`y${indice + 1}`),
        ejes: [{ eje: 'y', carga: indice % 2 === 0 ? 1 : -1 }],
      })),
    ];
    const posiciones = Object.fromEntries(
      items.map((entrada, indice) => [
        entrada.id,
        posicion(
          indice % 2 === 0 ? 2 : -2,
          `map05-${indice}`,
          `Pasaje MAP-05 independiente número ${indice}.`,
        ),
      ]),
    );
    const resultado = auditarPerfilBrujula(perfil(posiciones), items, {
      sistema: {
        ejeX: 'x',
        ejeY: 'y',
        subdimensionesX: { a: ['x1', 'x2', 'x3', 'x4'], b: ['x5'], c: ['x6'] },
        familiasY: { a: ['y1', 'y2'], b: ['y3', 'y4'], c: ['y5', 'y6'] },
        familiasNucleoY: ['a'],
      },
      umbrales: {
        minimoItemsX: 6,
        minimoSubdimensionesX: 3,
        minimoItemsY: 6,
        minimoFamiliasY: 3,
        minimoItemsNucleoY: 2,
      },
    });
    expect(resultado.grado).toBe('insuficiente');
    expect(resultado.problemas).toContain(
      'X subdimensiones con una sola ancla independiente: b, c',
    );
    expect(typeof resultado.x.extremoSinContrapeso).toBe('boolean');
    expect(typeof resultado.y.extremoSinContrapeso).toBe('boolean');
  });

  it('no concede grado cuando los ids del contrato tienen carga cero', () => {
    const idsX = Array.from({ length: 6 }, (_, indice) => `x${indice + 1}`);
    const idsY = Array.from({ length: 6 }, (_, indice) => `y${indice + 1}`);
    const items: Item[] = [...idsX, ...idsY].map((id) => ({
      ...item(id),
      ejes: [{ eje: id.startsWith('x') ? 'x' : 'y', carga: 0 }],
    }));
    const posiciones = Object.fromEntries(
      items.map((entrada, indice) => [
        entrada.id,
        posicion(
          indice % 2 === 0 ? 2 : -2,
          `carga-cero-${indice}`,
          `Pasaje con carga cero número ${indice}.`,
        ),
      ]),
    );
    const resultado = auditarPerfilBrujula(perfil(posiciones), items, {
      sistema: {
        ejeX: 'x',
        ejeY: 'y',
        subdimensionesX: { a: idsX.slice(0, 2), b: idsX.slice(2, 4), c: idsX.slice(4) },
        familiasY: { a: idsY.slice(0, 2), b: idsY.slice(2, 4), c: idsY.slice(4) },
        familiasNucleoY: ['a'],
      },
      umbrales: {
        minimoItemsX: 6,
        minimoSubdimensionesX: 3,
        minimoItemsY: 6,
        minimoFamiliasY: 3,
        minimoItemsNucleoY: 2,
      },
    });
    expect(resultado.grado).toBe('insuficiente');
    expect(resultado.x.valor).toBeNull();
    expect(resultado.y.valor).toBeNull();
    expect(resultado.problemas).toEqual(
      expect.arrayContaining([
        'X sin coordenada calculable con carga no nula',
        'Y sin coordenada calculable con carga no nula',
      ]),
    );
  });

  it('los macroplanos bloquean perfiles sin datos, monotemáticos y vetados', () => {
    const items = [item('a'), item('b'), item('c'), item('d')];
    const posiciones = Object.fromEntries(
      items.map((entrada, indice) => [
        entrada.id,
        posicion(indice === 3 ? -2 : 2, `macro-${indice}`, `Pasaje macro ${indice} independiente.`),
      ]),
    );
    for (const candidato of [
      { ...perfil(posiciones), confianza: 'sin-datos' as const },
      { ...perfil(posiciones), monotematico: true },
      {
        ...perfil(posiciones),
        publicacionMapa: { publicable: false, motivo: 'Veto editorial de prueba suficientemente explicado.' },
      },
    ]) {
      const proyeccion = proyectarPartidoEnEspacio(candidato, items, [EJE]);
      expect(proyeccion.incluida).toBe(false);
      expect(proyeccion.ejesInsuficientes).toEqual([EJE.id]);
      expect(proyeccion.bloqueosPerfil?.length).toBeGreaterThan(0);
    }
  });
});
