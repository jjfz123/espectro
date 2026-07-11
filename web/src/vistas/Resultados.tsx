import { lazy, Suspense, useCallback, useMemo, useRef, useState } from 'react';
import type { Respuesta } from '@engine';
import {
  EJE_AUTORIDAD_POLITICA,
  EJE_PROPIEDAD_MERCADO,
  calcularAfinidad,
  calcularFacetas,
  partidosPrincipalesUltimasGenerales,
  perfilContraste,
  rankingAfinidad,
  respuestasEnCorpus,
  seleccionarPartidosElectorales,
  sindicatoRelevanteEnCcaa,
} from '@engine';
import { CatalogoCandidaturas } from '../componentes/CatalogoCandidaturas';
import { DetalleAfinidad } from '../componentes/DetallePartido';
import type { LecturaContraste } from '../componentes/DetallePartido';
import { EspacioPatrocinado } from '../componentes/EspacioPatrocinado';
import { PerfilFacetas } from '../componentes/PerfilFacetas';
import { Ranking } from '../componentes/Ranking';
import type { DobleMarcador } from '../componentes/Ranking';
import {
  COMUNIDADES,
  EJES,
  ELECCIONES,
  FECHA_CORTE_DATOS,
  ITEM_POR_ID,
  ITEMS_POR_MODULO,
  MODULOS,
  etiquetaValor,
  itemVisible,
  nombreComunidad,
  nombrePerfil,
  secuenciaItems,
  VERSION_INSTRUMENTO,
} from '../datos';
import { CONVOCATORIAS, PARTIDOS, SINDICATOS } from '../datosOrganizaciones';
import { evidenciaAutoridadAtlas, evidenciaPropiedadAtlas } from '../atlasIdeologias';
import { hayReapertura3DPendiente } from '../estadoVisores';
import type { DatosParaResultadoCompartido } from '../compartirResultados';
import type { EtiquetasParaCaptura } from '../capturaResultado';
import type { Accion, Estado } from '../estado';

const CompartirResultados = lazy(() =>
  import('../componentes/CompartirResultados').then((modulo) => ({
    default: modulo.CompartirResultados,
  })),
);

const MapaPolitico = lazy(() =>
  import('../componentes/MapaPolitico').then((modulo) => ({
    default: modulo.MapaPolitico,
  })),
);

const ReferenciasDoctrinales = lazy(() =>
  import('../componentes/ReferenciasDoctrinales').then((modulo) => ({
    default: modulo.ReferenciasDoctrinales,
  })),
);

interface Props {
  estado: Estado;
  despachar: (accion: Accion) => void;
  puedeRecargar: boolean;
  alConfirmarGuardado: () => boolean;
}

const PARTIDO_POR_ID = new Map(PARTIDOS.map((p) => [p.id, p]));
const SINDICATO_POR_ID = new Map(SINDICATOS.map((sindicato) => [sindicato.id, sindicato]));
const ITEMS_LABORALES_EN_NUCLEO = new Set(['lab-006']);
const PRINCIPALES_GENERALES = partidosPrincipalesUltimasGenerales(PARTIDOS, CONVOCATORIAS, 7);
const PODEMOS = PARTIDO_POR_ID.get('podemos');
const FORMATO_VOTOS = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 });
const CONTEXTO_PRINCIPALES = new Map(
  PRINCIPALES_GENERALES.map((principal) => [
    principal.partido.id,
    `Candidatura ${principal.candidatura.siglas ?? principal.candidatura.nombre} · ${FORMATO_VOTOS.format(principal.candidatura.votos)} votos`,
  ]),
);
const EJES_CAPTURA: EtiquetasParaCaptura['ejes'] = new Map(
  EJES.map((eje) => [
    eje.id,
    {
      id: eje.id,
      nombre: eje.nombre,
      poloNegativo: eje.poloNegativo,
      poloPositivo: eje.poloPositivo,
    },
  ]),
);
const PARTIDOS_CAPTURA: EtiquetasParaCaptura['partidos'] = new Map(
  PARTIDOS.map((partido) => [partido.id, nombrePerfil(partido)]),
);
const PERMITIDOS_COMPARTIR = {
  ejes: new Set(EJES.map((eje) => eje.id)),
  partidos: new Set(PARTIDOS.map((partido) => partido.id)),
  comunidades: new Set(COMUNIDADES.map((comunidad) => comunidad.id)),
};

export function Resultados({ estado, despachar, puedeRecargar, alConfirmarGuardado }: Props) {
  const [mostrarCompartir, setMostrarCompartir] = useState(false);
  const [mostrarMapa, setMostrarMapa] = useState(hayReapertura3DPendiente);
  const [mostrarReferencias, setMostrarReferencias] = useState(false);
  const tituloMapaRef = useRef<HTMLHeadingElement>(null);
  const tituloReferenciasRef = useRef<HTMLHeadingElement>(null);
  const enfocarTituloMapa = useCallback(() => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        tituloMapaRef.current?.focus({ preventScroll: true });
      });
    });
  }, []);
  const enfocarTituloReferencias = useCallback(() => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        tituloReferenciasRef.current?.focus({ preventScroll: true });
      });
    });
  }, []);
  const itemsSesion = useMemo(
    () => secuenciaItems(estado.modulosActivos, estado.respuestas),
    [estado.modulosActivos, estado.respuestas],
  );

  const respuestas: Respuesta[] = useMemo(() => {
    return itemsSesion
      .filter((item) => item.id in estado.respuestas)
      .map((item) => ({
        itemId: item.id,
        valor: estado.respuestas[item.id] ?? null,
        importante: Boolean(estado.importantes[item.id]),
      }));
  }, [itemsSesion, estado.respuestas, estado.importantes]);

  const nConOpinion = respuestas.filter((r) => r.valor !== null).length;

  const seleccionElectoral = useMemo(
    () =>
      seleccionarPartidosElectorales(PARTIDOS, CONVOCATORIAS, {
        tipo: estado.eleccion,
        ccaa: estado.ccaa || undefined,
      }),
    [estado.eleccion, estado.ccaa],
  );

  const resultados = useMemo(() => {
    if (nConOpinion === 0) return [];
    return rankingAfinidad(respuestas, seleccionElectoral.partidos);
  }, [respuestas, nConOpinion, seleccionElectoral.partidos]);

  const resultadosPrincipalesGenerales = useMemo(() => {
    if (nConOpinion === 0) return [];
    return PRINCIPALES_GENERALES.map(({ partido }) => calcularAfinidad(respuestas, partido));
  }, [respuestas, nConOpinion]);

  const resultadoPodemos = useMemo(() => {
    if (nConOpinion === 0 || !PODEMOS) return undefined;
    return calcularAfinidad(respuestas, PODEMOS);
  }, [respuestas, nConOpinion]);

  const resultadosFueraConvocatoria = useMemo(() => {
    if (nConOpinion === 0) return [];
    return rankingAfinidad(respuestas, seleccionElectoral.partidosFueraConvocatoria);
  }, [respuestas, nConOpinion, seleccionElectoral.partidosFueraConvocatoria]);

  const doblesMarcadores = useMemo(() => {
    const marcadores = new Map<string, DobleMarcador>();
    if (nConOpinion === 0) return marcadores;
    for (const partido of PARTIDOS) {
      if (!partido.dobleLectura) continue;
      const perfilObservado = perfilContraste(partido);
      if (!perfilObservado) continue;
      const resultadoContraste = calcularAfinidad(respuestas, perfilObservado);
      marcadores.set(partido.id, {
        etiquetaBase: partido.dobleLectura.etiquetaBase,
        etiquetaContraste: partido.dobleLectura.contraste.etiqueta,
        resultadoContraste,
        advertencia: partido.dobleLectura.contraste.advertencia,
      });
    }
    return marcadores;
  }, [respuestas, nConOpinion]);

  const lecturaContraste = (partidoId: string): LecturaContraste | undefined => {
    const partido = PARTIDO_POR_ID.get(partidoId);
    const marcador = doblesMarcadores.get(partidoId);
    if (!partido?.dobleLectura || !marcador) return undefined;
    return {
      etiquetaBase: partido.dobleLectura.etiquetaBase,
      descripcionBase: partido.dobleLectura.descripcionBase,
      etiqueta: partido.dobleLectura.contraste.etiqueta,
      descripcion: partido.dobleLectura.contraste.descripcion,
      advertencia: partido.dobleLectura.contraste.advertencia,
      resultado: marcador.resultadoContraste,
      posiciones: partido.dobleLectura.contraste.posiciones,
    };
  };

  const respuestasLaborales = useMemo(
    () =>
      respuestas.filter(
        (respuesta) =>
          ITEM_POR_ID.get(respuesta.itemId)?.modulo === 'trabajo-estado-sindicatos' ||
          (estado.modulosActivos.includes('trabajo-estado-sindicatos') &&
            ITEMS_LABORALES_EN_NUCLEO.has(respuesta.itemId)),
      ),
    [respuestas, estado.modulosActivos],
  );
  const nOpinionLaboral = respuestasLaborales.filter((respuesta) => respuesta.valor !== null).length;
  const sindicatosRelevantes = useMemo(
    () => SINDICATOS.filter((sindicato) => sindicatoRelevanteEnCcaa(sindicato, estado.ccaa)),
    [estado.ccaa],
  );
  const respuestasSindicalesComparables = useMemo(
    () => respuestasEnCorpus(respuestasLaborales, sindicatosRelevantes),
    [respuestasLaborales, sindicatosRelevantes],
  );
  const resultadosSindicales = useMemo(() => {
    if (nOpinionLaboral === 0) return [];
    return rankingAfinidad(respuestasSindicalesComparables, sindicatosRelevantes, {
      minimoItems: 3,
      umbralCobertura: 0.2,
      bloquearCoberturaInsuficiente: true,
    });
  }, [respuestasSindicalesComparables, sindicatosRelevantes, nOpinionLaboral]);

  const facetasUsuario = useMemo(() => {
    const calculadas = calcularFacetas(respuestas, itemsSesion, EJES);
    const idsConOpinion = respuestas
      .filter((respuesta) => typeof respuesta.valor === 'number')
      .map((respuesta) => respuesta.itemId);
    const propiedad = evidenciaPropiedadAtlas(idsConOpinion);
    const autoridad = evidenciaAutoridadAtlas(idsConOpinion);
    return calculadas.map((faceta) => {
      if (faceta.facetaId === EJE_PROPIEDAD_MERCADO) {
        return { ...faceta, coberturaSuficiente: propiedad.suficiente };
      }
      if (faceta.facetaId === EJE_AUTORIDAD_POLITICA) {
        return { ...faceta, coberturaSuficiente: autoridad.suficiente };
      }
      return faceta;
    });
  }, [respuestas, itemsSesion]);
  const facetasConOpinion = facetasUsuario.filter((faceta) => faceta.valor !== null).length;
  const facetasConCobertura = facetasUsuario.filter(
    (faceta) => faceta.valor !== null && faceta.coberturaSuficiente,
  ).length;

  const coincidenciasMonotematicas = useMemo(() => {
    const respuestaPorItem = new Map(respuestas.map((respuesta) => [respuesta.itemId, respuesta]));
    return PARTIDOS.filter(
      (partido) => partido.monotematico && partido.actividad !== 'inactiva' && partido.actividad !== 'historica',
    ).flatMap((partido) =>
      Object.entries(partido.posiciones).flatMap(([itemId, posicion]) => {
        const valorUsuario = respuestaPorItem.get(itemId)?.valor;
        const item = ITEM_POR_ID.get(itemId);
        if (typeof valorUsuario !== 'number' || !item || Math.abs(valorUsuario - posicion.valor) > 1) {
          return [];
        }
        return [{ partido, item, posicion, valorUsuario }];
      }),
    );
  }, [respuestas]);

  const nSinOpinion = respuestas.filter((r) => r.valor === null).length;
  // Cambiar al modo exhaustivo no convierte por sí solo el perfil en final:
  // si se saltan todos los módulos sigue siendo la misma evidencia del rápido.
  const esPerfilIntermedio = estado.perfilIntermedio;
  const esPerfilProvisional = !esPerfilIntermedio && estado.modulosActivos.length === 0;
  const pendientesSesion = itemsSesion.filter((item) => !(item.id in estado.respuestas)).length;
  const nombreEleccion =
    ELECCIONES.find((e) => e.id === estado.eleccion)?.nombre ?? estado.eleccion;
  const comunidad = estado.ccaa ? nombreComunidad(estado.ccaa) : undefined;
  const maximosAfinidad = resultados.filter((resultado) => resultado.estado === 'calculable').slice(0, 3);
  const idsMaximosAfinidad = new Set(maximosAfinidad.map((resultado) => resultado.entidadId));
  const resultadosRestantes = resultados.filter(
    (resultado) => !idsMaximosAfinidad.has(resultado.entidadId),
  );
  const idsResultadosContexto = new Set(resultados.map((resultado) => resultado.entidadId));
  const resultadosAuditoria =
    seleccionElectoral.metodo === 'contexto-incompleto'
      ? resultados
      : [
          ...resultados,
          ...resultadosPrincipalesGenerales.filter(
            (resultado) => !idsResultadosContexto.has(resultado.entidadId),
          ),
          ...(resultadoPodemos && !idsResultadosContexto.has(resultadoPodemos.entidadId)
            ? [resultadoPodemos]
            : []),
        ];
  const convocatoriaPrincipales = PRINCIPALES_GENERALES[0]?.convocatoria;

  const nivelCompartido = esPerfilIntermedio
    ? 'intermedio'
    : esPerfilProvisional
      ? 'rapido'
      : 'exhaustivo';
  const datosCompartidos = useMemo<DatosParaResultadoCompartido>(
    () => ({
      versionInstrumento: VERSION_INSTRUMENTO,
      versionCatalogo: FECHA_CORTE_DATOS,
      nivel: nivelCompartido,
      eleccion: estado.eleccion,
      ccaa: estado.ccaa || undefined,
      respuestasAdministradas: respuestas.length,
      respuestasConOpinion: nConOpinion,
      facetas: facetasUsuario,
      afinidades: resultados,
    }),
    [
      estado.eleccion,
      estado.ccaa,
      respuestas.length,
      nConOpinion,
      facetasUsuario,
      resultados,
      nivelCompartido,
    ],
  );
  const etiquetasCaptura = useMemo<EtiquetasParaCaptura>(
    () => ({
      contexto: `${nombreEleccion}${comunidad ? ` · ${comunidad}` : ' · comunidad sin indicar'}`,
      nivel:
        nivelCompartido === 'intermedio'
          ? 'Perfil intermedio'
          : nivelCompartido === 'rapido'
            ? 'Perfil rápido provisional'
            : 'Perfil exhaustivo',
      ejes: EJES_CAPTURA,
      partidos: PARTIDOS_CAPTURA,
    }),
    [nombreEleccion, comunidad, nivelCompartido],
  );

  const quedanModulos = MODULOS.some((m) => {
    if (m.id === 'nucleo') return false;
    const items = (ITEMS_POR_MODULO.get(m.id) ?? []).filter((item) =>
      itemVisible(item, estado.respuestas),
    );
    return items.some((i) => !(i.id in estado.respuestas));
  });

  return (
    <div className="contenedor contenedor--ancho">
      <p className="kicker">
        {esPerfilIntermedio
          ? 'Perfil intermedio · provisional'
          : esPerfilProvisional
            ? 'Perfil provisional'
            : 'Resultados'}
      </p>
      <h1 className="titular" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.4rem)' }}>
        {esPerfilIntermedio
          ? 'Tu perfil con profundidad intermedia'
          : esPerfilProvisional
            ? 'Tu posición provisional y tus afinidades'
            : 'Tu posición y tus afinidades'}
      </h1>
      <p className="contexto-resultados">
        {nombreEleccion}
        {comunidad ? ` · ${comunidad}` : ' · comunidad sin indicar'} · {respuestas.length}{' '}
        ítems respondidos
        {nSinOpinion > 0 ? ` (${nSinOpinion} sin opinión)` : ''}. Calculado en tu navegador;
        nada se ha enviado a ningún servidor.
      </p>

      {esPerfilIntermedio ? (
        <section className="resultado-provisional" aria-labelledby="resultado-intermedio-titulo">
          <div>
            <p className="kicker">Hito de 150 respuestas</p>
            <h2 id="resultado-intermedio-titulo">Una lectura profunda, todavía provisional</h2>
            <p>
              Este perfil usa todo lo que has respondido hasta ahora. Aún quedan{' '}
              {pendientesSesion} preguntas de la selección exhaustiva, por lo que las posiciones,
              afinidades y referencias pueden cambiar cuando completes el recorrido. La cobertura
              y la incertidumbre siguen visibles en cada resultado.
            </p>
          </div>
          <button
            type="button"
            className="boton"
            onClick={() => despachar({ tipo: 'seguir-exhaustivo' })}
          >
            Seguir con el exhaustivo
          </button>
          <p className="resultado-provisional__nota">
            Volverás a la primera pregunta pendiente. Tus {respuestas.length} respuestas y las
            prioridades que hayas marcado se conservan íntegramente.
          </p>
        </section>
      ) : esPerfilProvisional ? (
        <section className="resultado-provisional" aria-labelledby="resultado-provisional-titulo">
          <div>
            <p className="kicker">Primera lectura</p>
            <h2 id="resultado-provisional-titulo">Puedes afinarla sin repetir respuestas</h2>
            <p>
              El modo rápido aporta datos en {facetasConOpinion} de {facetasUsuario.length}{' '}
              facetas; {facetasConCobertura} alcanzan ya el umbral de cobertura. Las demás se
              muestran como provisionales o sin datos. Cada partido declara además sus ítems
              comparados y su cobertura propia: porcentajes con distinta cobertura no tienen la
              misma precisión.
            </p>
          </div>
          <button
            type="button"
            className="boton"
            onClick={() => despachar({ tipo: 'continuar-exhaustivo' })}
          >
            Continuar al exhaustivo
          </button>
          <p className="resultado-provisional__nota">
            Conservaremos tus {respuestas.length} respuestas y solo aparecerán preguntas nuevas
            de los módulos que elijas.
          </p>
        </section>
      ) : null}

      <div className="nota-catalogo">
        <p>
          <strong>Catálogo documental en ampliación.</strong> Hay {PARTIDOS.length} perfiles
          reales con evidencia versionada; no se muestran perfiles ficticios. La afinidad no
          es una recomendación de voto y una cobertura baja no permite comparar porcentajes
          como si fueran igual de sólidos.
        </p>
      </div>

      {mostrarCompartir ? (
        <Suspense
          fallback={
            <section className="seccion compartir-resultados compartir-resultados--cargando" role="status">
              Preparando las opciones para compartir y guardar…
            </section>
          }
        >
          <CompartirResultados
            datos={datosCompartidos}
            etiquetas={etiquetasCaptura}
            permitidos={PERMITIDOS_COMPARTIR}
          />
        </Suspense>
      ) : (
        <section className="seccion compartir-resultados compartir-resultados--lanzador" aria-labelledby="abrir-compartir-titulo">
          <p className="kicker">Compartir y guardar</p>
          <h2 id="abrir-compartir-titulo">Lleva contigo este resultado</h2>
          <p>
            Puedes crear un enlace de solo lectura o tarjetas PNG sin compartir las respuestas
            originales. Las herramientas de imagen se cargarán solo si decides usarlas.
          </p>
          <button type="button" className="boton" onClick={() => setMostrarCompartir(true)}>
            Abrir opciones para compartir y guardar
          </button>
        </section>
      )}

      <section className="seccion" id="perfil-facetas">
        <h2>Tu perfil por facetas</h2>
        <p className="nota-al-margen" style={{ maxWidth: '68ch' }}>
          Esta es tu posición aunque ningún partido la represente. Cada faceta va de −100 a
          +100 y conserva sus propios polos y evidencia. «Sin datos» significa que no hay una
          opinión calculable; «provisional», que aún faltan preguntas o cobertura.
        </p>
        <PerfilFacetas ejes={EJES} facetas={facetasUsuario} />
      </section>

      <section className="seccion" aria-labelledby="mapa-espectro-titulo">
        <h2 id="mapa-espectro-titulo" ref={tituloMapaRef} tabIndex={-1}>
          Mapa del espectro
        </h2>
        {mostrarMapa ? (
          <Suspense
            fallback={
              <div className="explorador-diferido explorador-diferido--cargando" role="status">
                Preparando el atlas interactivo y sus fuentes…
              </div>
            }
          >
            <MapaPolitico
              facetasUsuario={facetasUsuario}
              puedeRecargar={puedeRecargar}
              alConfirmarGuardado={alConfirmarGuardado}
              alMontar={enfocarTituloMapa}
              nivelPerfil={
                esPerfilIntermedio ? 'intermedio' : esPerfilProvisional ? 'rapido' : 'exhaustivo'
              }
            />
          </Suspense>
        ) : (
          <div className="explorador-diferido">
            <div>
              <p className="kicker">Vista interactiva bajo demanda</p>
              <h3>Abre la brújula detallada cuando quieras explorarla</h3>
              <p>
                Incluye las zonas ideológicas, partidos con evidencia publicable, planos por
                facetas y sus explicaciones. Se carga al pulsar para que el resumen y el ranking
                sigan siendo rápidos en móvil.
              </p>
            </div>
            <button type="button" className="boton" onClick={() => setMostrarMapa(true)}>
              Abrir mapa interactivo
            </button>
          </div>
        )}
      </section>

      <section
        className="seccion referencias-doctrinales"
        aria-labelledby="referencias-doctrinales-titulo"
      >
        <h2
          id="referencias-doctrinales-titulo"
          ref={tituloReferenciasRef}
          tabIndex={-1}
        >
          Referencias doctrinales
        </h2>
        {mostrarReferencias ? (
          <Suspense
            fallback={
              <div className="explorador-diferido explorador-diferido--cargando" role="status">
                Preparando las referencias doctrinales y sus fuentes…
              </div>
            }
          >
            <ReferenciasDoctrinales
              respuestas={respuestas}
              alMontar={enfocarTituloReferencias}
            />
          </Suspense>
        ) : (
          <div className="explorador-diferido">
            <div>
              <p className="kicker">Más allá de los partidos</p>
              <h3>Compara matices que ningún partido tiene por qué representar</h3>
              <p>
                Compara el perfil con corrientes históricas y contemporáneas sin afirmar
                pertenencia ni convertirlas en candidaturas. El catálogo profundo se descarga
                solo si decides consultarlo.
              </p>
            </div>
            <button type="button" className="boton" onClick={() => setMostrarReferencias(true)}>
              Explorar corrientes afines
            </button>
          </div>
        )}
      </section>

      {respuestasLaborales.length > 0 ? (
        <section className="seccion">
          <h2>Tu modelo de representación laboral</h2>
          <p className="nota-al-margen" style={{ maxWidth: '68ch' }}>
            Comparación independiente del voto. Mide coincidencias documentadas sobre poder en
            la empresa, autonomía, financiación y acción sindical; no acredita implantación en
            tu centro de trabajo ni recomienda afiliarse.
          </p>
          <p className="aviso-contexto aviso-contexto--laboral">
            {!estado.ccaa
              ? 'Como no has indicado comunidad, se muestran también sindicatos territoriales. '
              : ''}
            La demo aún no filtra por sector, empresa o presencia en tu centro de trabajo.
          </p>
          {nOpinionLaboral === 0 ? (
            <p className="resultado-no-calculable" role="status">
              No hay similitud sindical calculable porque has marcado «Sin opinión» en este bloque.
            </p>
          ) : resultadosSindicales.length === 0 ? (
            <p className="resultado-no-calculable" role="status">
              Aún no hay una afinidad sindical publicable. Para evitar un 100 % engañoso por
              una sola coincidencia, cada resultado necesita al menos 3 ítems comparados y
              cubrir el 20 % de tus respuestas con opinión dentro del corpus sindical
              documentado y comparable.
            </p>
          ) : (
            <>
              <Ranking
                resultados={resultadosSindicales}
                entidades={SINDICATO_POR_ID}
                tipoEntidad="sindicato"
              />
              {resultadosSindicales.length > 0 ? (
                <div className="detalles-afinidad">
                  <h3>Por qué coincide tu modelo laboral</h3>
                  {resultadosSindicales.map((resultado) => {
                    const sindicato = SINDICATO_POR_ID.get(resultado.entidadId);
                    if (!sindicato) return null;
                    return (
                      <DetalleAfinidad
                        key={resultado.entidadId}
                        resultado={resultado}
                        entidad={sindicato}
                        tipoEntidad="sindicato"
                      />
                    );
                  })}
                </div>
              ) : null}
            </>
          )}
        </section>
      ) : null}

      <section className="contexto-electoral" aria-labelledby="contexto-electoral-titulo">
        <div>
          <h2 id="contexto-electoral-titulo">Contexto electoral</h2>
          <p className="nota-al-margen">
            Puedes cambiar el ámbito y recalcular el ranking sin repetir el cuestionario.
          </p>
        </div>
        <label className="campo">
          <span>Tipo de elección</span>
          <select
            value={estado.eleccion}
            onChange={(evento) =>
              despachar({
                tipo: 'actualizar-contexto',
                ccaa: estado.ccaa,
                eleccion: evento.target.value as Estado['eleccion'],
              })
            }
          >
            {ELECCIONES.map((eleccion) => (
              <option value={eleccion.id} key={eleccion.id}>
                {eleccion.nombre}
              </option>
            ))}
          </select>
        </label>
        <label className="campo">
          <span>Comunidad autónoma</span>
          <select
            value={estado.ccaa}
            onChange={(evento) =>
              despachar({
                tipo: 'actualizar-contexto',
                ccaa: evento.target.value,
                eleccion: estado.eleccion,
              })
            }
          >
            <option value="">Sin indicar</option>
            {COMUNIDADES.map((ccaa) => (
              <option value={ccaa.id} key={ccaa.id}>
                {ccaa.nombre}
              </option>
            ))}
          </select>
        </label>
      </section>

      {seleccionElectoral.metodo === 'contexto-incompleto' ? (
        <p className="aviso-contexto" role="status">
          <strong>Falta la comunidad autónoma.</strong> Selecciónala para calcular un universo
          territorial coherente. Hasta entonces no mostramos un ranking que mezcle formaciones
          de comunidades distintas.
        </p>
      ) : seleccionElectoral.metodo === 'convocatoria-documentada' &&
      seleccionElectoral.convocatoria ? (
        <>
          <div className="aviso-contexto" role="status">
            <strong>Universo electoral documentado.</strong>{' '}
            {seleccionElectoral.convocatoria.nombre}: se incluyen{' '}
            {seleccionElectoral.candidaturas.length} candidaturas que superan el{' '}
            {seleccionElectoral.convocatoria.umbralPorcentaje.toLocaleString('es-ES')} % o cumplen
            una excepción declarada; {seleccionElectoral.candidaturasConPerfil} ya tienen al menos
            un perfil comparable.{' '}
            <a
              href={seleccionElectoral.convocatoria.fuente.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              Fuente oficial
            </a>
            . El agregado por comunidad no garantiza que una marca figurase en cada provincia.
          </div>
          <CatalogoCandidaturas
            convocatoria={seleccionElectoral.convocatoria}
            candidaturas={seleccionElectoral.candidaturas}
            partidos={PARTIDO_POR_ID}
          />
        </>
      ) : (
        <p className="aviso-contexto" role="status">
          Aún no hay una convocatoria versionada para este contexto. Se usa provisionalmente el
          ámbito declarado por cada partido; no debe interpretarse como una papeleta real.
        </p>
      )}

      {seleccionElectoral.metodo !== 'contexto-incompleto' &&
      nConOpinion > 0 &&
      resultadosPrincipalesGenerales.length > 0 ? (
        <section className="seccion seccion--principales" aria-labelledby="principales-generales-titulo">
          <p className="kicker">Referencia electoral común</p>
          <h2 id="principales-generales-titulo">Partidos principales de las últimas generales</h2>
          <p className="nota-al-margen" style={{ maxWidth: '72ch' }}>
            Son las siete candidaturas con más votos de{' '}
            {convocatoriaPrincipales?.nombre ?? 'las últimas elecciones generales documentadas'}
            {' '}que tienen un perfil principal comparable. Su orden aquí es el del voto, no el
            de afinidad. El porcentaje se calcula con tus mismas respuestas y conserva su aviso de
            cobertura.
          </p>
          <div className="principales-contexto" role="note">
            <strong>Contexto por representación, no recomendación.</strong>
            <p>
              Estas formaciones aparecen aquí únicamente por haber sido las más votadas en las
              últimas generales documentadas. Espectro no favorece, prioriza ni recomienda a los
              partidos mayoritarios y no pretende orientar el voto. Su propósito es ayudarte a
              encontrar afinidades en toda la pluralidad política disponible en el catálogo.
            </p>
            <p>
              El ranking ordenado por tu afinidad y el desplegable con el resto de formaciones
              están inmediatamente debajo.
            </p>
          </div>
          <Ranking
            resultados={resultadosPrincipalesGenerales}
            entidades={PARTIDO_POR_ID}
            doblesMarcadores={doblesMarcadores}
            compacto
            contextoPorEntidad={CONTEXTO_PRINCIPALES}
            separarTramos={false}
            etiquetaPosicion={(_, indice) => `${PRINCIPALES_GENERALES[indice]?.puestoVotos ?? indice + 1}.º voto`}
          />
          {PODEMOS && resultadoPodemos ? (
            <aside className="referencia-podemos" aria-labelledby="referencia-podemos-titulo">
              <div>
                <p className="kicker">Referencia separada</p>
                <h3 id="referencia-podemos-titulo">Podemos concurrió dentro de Sumar</h3>
                <p>
                  Se ofrece su perfil propio para comparar matices, pero no se presenta como una
                  octava candidatura: en las generales de 2023 formó parte de la coalición Sumar.
                </p>
              </div>
              <Ranking
                resultados={[resultadoPodemos]}
                entidades={PARTIDO_POR_ID}
                compacto
                ordenada={false}
              />
            </aside>
          ) : null}
        </section>
      ) : null}

      <section className="seccion" aria-labelledby="maximos-afinidad-titulo">
        <h2 id="maximos-afinidad-titulo">Máximos por afinidad</h2>
        <p className="nota-al-margen" style={{ maxWidth: '68ch' }}>
          Este sí es el orden real del porcentaje visible para el contexto electoral que has
          elegido. La cobertura nunca cambia silenciosamente el puesto: indica cuántas respuestas
          sostienen cada cifra. Una formación puede aparecer también en el bloque anterior porque
          allí el criterio son los votos; no es un segundo cálculo.
        </p>
        {seleccionElectoral.metodo === 'contexto-incompleto' ? (
          <div className="resultado-no-calculable" role="status">
            <strong>Indica una comunidad para calcular esta afinidad electoral.</strong>
            <p>Tus respuestas se conservan y el perfil ideológico de arriba sigue siendo válido.</p>
          </div>
        ) : nConOpinion === 0 ? (
          <div className="resultado-no-calculable" role="status">
            <strong>No hay afinidad calculable.</strong>
            <p>
              Has usado «Sin opinión» en todas las preguntas. Eso no equivale a estar en
              desacuerdo con todos los partidos: simplemente no hay posiciones que comparar.
            </p>
          </div>
        ) : (
          <>
            <Ranking
              resultados={maximosAfinidad}
              entidades={PARTIDO_POR_ID}
              doblesMarcadores={doblesMarcadores}
              compacto
            />
            {resultadosRestantes.length > 0 ? (
              <details className="ranking-resto">
                <summary>
                  Ver el resto del ranking ({resultadosRestantes.length}{' '}
                  {resultadosRestantes.length === 1 ? 'formación' : 'formaciones'})
                </summary>
                <p className="nota-al-margen">
                  Continúa el mismo orden por afinidad. Los perfiles sin datos comparables quedan
                  al final y no muestran un porcentaje inventado.
                </p>
                <Ranking
                  resultados={resultadosRestantes}
                  entidades={PARTIDO_POR_ID}
                  doblesMarcadores={doblesMarcadores}
                  inicio={maximosAfinidad.length + 1}
                  compacto
                />
              </details>
            ) : null}
          </>
        )}
      </section>

      {resultadosAuditoria.length > 0 ? (
        <section className="seccion seccion--auditoria">
          <details className="auditoria-afinidad">
            <summary>Auditar el cálculo y las fuentes, ítem a ítem</summary>
            <div className="auditoria-afinidad__cuerpo">
              <p className="nota-al-margen" style={{ maxWidth: '68ch' }}>
                Despliega una formación para ver tu respuesta, la suya, la distancia, la
                justificación y la fuente de cada posición usada en el porcentaje. También se
                incluyen aquí las referencias de generales mostradas arriba aunque no pertenezcan
                al contexto electoral seleccionado.
              </p>
              {resultadosAuditoria.map((r) => {
                const partido = PARTIDO_POR_ID.get(r.entidadId);
                if (!partido) return null;
                return (
                  <DetalleAfinidad
                    key={r.entidadId}
                    resultado={r}
                    entidad={partido}
                    lecturaContraste={lecturaContraste(r.entidadId)}
                  />
                );
              })}
            </div>
          </details>
        </section>
      ) : null}

      {coincidenciasMonotematicas.length > 0 ? (
        <section className="seccion" aria-labelledby="coincidencias-especificas-titulo">
          <h2 id="coincidencias-especificas-titulo">Coincidencias específicas</h2>
          <p className="nota-al-margen" style={{ maxWidth: '68ch' }}>
            Estas formaciones tienen un programa de uno o muy pocos puntos. Mostramos la
            coincidencia concreta, pero no fabricamos un porcentaje de afinidad general ni
            inferimos qué pensarías —o qué piensa el partido— sobre el resto del test.
          </p>
          <div className="coincidencias-especificas">
            {coincidenciasMonotematicas.map(({ partido, item, posicion, valorUsuario }) => (
              <article className="coincidencia-especifica" key={`${partido.id}-${item.id}`}>
                <p className="kicker">Programa monotemático</p>
                <h3>{nombrePerfil(partido)}</h3>
                <p><strong>Punto comparado:</strong> {item.texto}</p>
                <dl>
                  <div>
                    <dt>Tu respuesta</dt>
                    <dd>{etiquetaValor(valorUsuario)}</dd>
                  </div>
                  <div>
                    <dt>Posición documentada</dt>
                    <dd>{etiquetaValor(posicion.valor)}</dd>
                  </div>
                </dl>
                {posicion.justificacion ? <p>{posicion.justificacion}</p> : null}
                {posicion.fuente?.url ? (
                  <p className="nota-al-margen">
                    {posicion.fuente.titulo ?? 'Fuente documental'}
                    {posicion.fuente.fecha ? ` (${posicion.fuente.fecha})` : ''}{' · '}
                    <a href={posicion.fuente.url} rel="noopener noreferrer" target="_blank">
                      consultar fuente
                    </a>
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {resultadosFueraConvocatoria.length > 0 ? (
        <section className="seccion">
          <h2>Formaciones activas incluidas por excepción</h2>
          <p className="nota-al-margen" style={{ maxWidth: '68ch' }}>
            Este bloque conserva formaciones comunistas activas y organizaciones históricas
            que siguen actuando aunque no estén vinculadas a una candidatura incluida en la
            convocatoria seleccionada. Es una comparación doctrinal con partidos reales, no una
            afirmación de que aparezcan en tu papeleta.
          </p>
          <details className="ranking-resto">
            <summary>
              Ver formaciones incluidas por excepción ({resultadosFueraConvocatoria.length})
            </summary>
            <Ranking
              resultados={resultadosFueraConvocatoria}
              entidades={PARTIDO_POR_ID}
              compacto
            />
            <div className="detalles-afinidad auditoria-afinidad__cuerpo">
              <h3>Por qué coincide</h3>
              {resultadosFueraConvocatoria.map((resultado) => {
                const partido = PARTIDO_POR_ID.get(resultado.entidadId);
                if (!partido) return null;
                return (
                  <DetalleAfinidad
                    key={resultado.entidadId}
                    resultado={resultado}
                    entidad={partido}
                  />
                );
              })}
            </div>
          </details>
        </section>
      ) : null}

      <div className="acciones">
        <button
          type="button"
          className="boton boton--secundario"
          onClick={() => despachar({ tipo: 'ir-a-revision' })}
        >
          Revisar y corregir respuestas
        </button>
        {esPerfilIntermedio ? (
          <button
            type="button"
            className="boton"
            onClick={() => despachar({ tipo: 'seguir-exhaustivo' })}
          >
            Seguir con el exhaustivo
          </button>
        ) : esPerfilProvisional ? (
          <button
            type="button"
            className="boton"
            onClick={() => despachar({ tipo: 'continuar-exhaustivo' })}
          >
            Continuar al exhaustivo
          </button>
        ) : quedanModulos ? (
          <button
            type="button"
            className="boton boton--secundario"
            onClick={() => despachar({ tipo: 'ir-a-modulos' })}
          >
            Añadir módulos de profundización
          </button>
        ) : null}
        <button
          type="button"
          className="boton boton--terciario"
          onClick={() => {
            if (window.confirm('Empezar de nuevo descartará tus respuestas actuales. ¿Continuar?')) {
              despachar({ tipo: 'reiniciar' });
            }
          }}
        >
          Empezar de nuevo
        </button>
      </div>

      <EspacioPatrocinado />
    </div>
  );
}
