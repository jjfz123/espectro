import { useMemo } from 'react';
import type { Respuesta } from '@engine';
import {
  calcularAfinidad,
  calcularFacetas,
  compararReferenciasDoctrinales,
  perfilContraste,
  rankingAfinidad,
  seleccionarPartidosElectorales,
} from '@engine';
import { CatalogoCandidaturas } from '../componentes/CatalogoCandidaturas';
import { DetalleAfinidad } from '../componentes/DetallePartido';
import type { LecturaContraste } from '../componentes/DetallePartido';
import { PerfilFacetas } from '../componentes/PerfilFacetas';
import { ReferenciasDoctrinales } from '../componentes/ReferenciasDoctrinales';
import { Ranking } from '../componentes/Ranking';
import type { DobleMarcador } from '../componentes/Ranking';
import {
  COMUNIDADES,
  CONVOCATORIAS,
  EJES,
  ELECCIONES,
  ITEM_POR_ID,
  ITEMS_POR_MODULO,
  MODULOS,
  PARTIDOS,
  REFERENCIAS,
  SINDICATOS,
  itemVisible,
  nombreComunidad,
  secuenciaItems,
} from '../datos';
import type { Accion, Estado } from '../estado';

interface Props {
  estado: Estado;
  despachar: (accion: Accion) => void;
}

const PARTIDO_POR_ID = new Map(PARTIDOS.map((p) => [p.id, p]));
const SINDICATO_POR_ID = new Map(SINDICATOS.map((sindicato) => [sindicato.id, sindicato]));
const ITEMS_LABORALES_EN_NUCLEO = new Set(['lab-006']);

export function Resultados({ estado, despachar }: Props) {
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

  const resultadosFueraConvocatoria = useMemo(() => {
    if (nConOpinion === 0) return [];
    return rankingAfinidad(respuestas, seleccionElectoral.partidosFueraConvocatoria);
  }, [respuestas, nConOpinion, seleccionElectoral.partidosFueraConvocatoria]);

  const doblesMarcadores = useMemo(() => {
    const marcadores = new Map<string, DobleMarcador>();
    if (nConOpinion === 0) return marcadores;
    for (const partido of seleccionElectoral.partidos) {
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
  }, [respuestas, nConOpinion, seleccionElectoral.partidos]);

  const lecturaContraste = (partidoId: string): LecturaContraste | undefined => {
    const partido = PARTIDO_POR_ID.get(partidoId);
    const marcador = doblesMarcadores.get(partidoId);
    if (!partido?.dobleLectura || !marcador) return undefined;
    return {
      etiquetaBase: partido.dobleLectura.etiquetaBase,
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
  const resultadosSindicales = useMemo(() => {
    if (nOpinionLaboral === 0) return [];
    const relevantes = SINDICATOS.filter(
      (sindicato) =>
        sindicato.ambito === 'estatal' ||
        sindicato.ambito === 'sectorial' ||
        !estado.ccaa ||
        sindicato.ccaa?.includes(estado.ccaa),
    );
    return rankingAfinidad(respuestasLaborales, relevantes, {
      minimoItems: 3,
      umbralCobertura: 0.2,
    });
  }, [respuestasLaborales, nOpinionLaboral, estado.ccaa]);

  const facetasUsuario = useMemo(
    () => calcularFacetas(respuestas, itemsSesion, EJES),
    [respuestas, itemsSesion],
  );
  const facetasConOpinion = facetasUsuario.filter((faceta) => faceta.valor !== null).length;
  const facetasConCobertura = facetasUsuario.filter(
    (faceta) => faceta.valor !== null && faceta.coberturaSuficiente,
  ).length;

  const resultadosReferencias = useMemo(
    () => compararReferenciasDoctrinales(respuestas, REFERENCIAS),
    [respuestas],
  );

  const nSinOpinion = respuestas.filter((r) => r.valor === null).length;
  const esPerfilProvisional = estado.modo === 'rapido';
  const nombreEleccion =
    ELECCIONES.find((e) => e.id === estado.eleccion)?.nombre ?? estado.eleccion;
  const comunidad = estado.ccaa ? nombreComunidad(estado.ccaa) : undefined;

  const quedanModulos = MODULOS.some((m) => {
    if (m.id === 'nucleo') return false;
    const items = (ITEMS_POR_MODULO.get(m.id) ?? []).filter((item) =>
      itemVisible(item, estado.respuestas),
    );
    return items.some((i) => !(i.id in estado.respuestas));
  });

  return (
    <div className="contenedor contenedor--ancho">
      <p className="kicker">{esPerfilProvisional ? 'Perfil provisional' : 'Resultados'}</p>
      <h1 className="titular" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.4rem)' }}>
        {esPerfilProvisional
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

      {esPerfilProvisional ? (
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

      <section className="seccion">
        <h2>Tu perfil por facetas</h2>
        <p className="nota-al-margen" style={{ maxWidth: '68ch' }}>
          Esta es tu posición aunque ningún partido la represente. Cada faceta va de −100 a
          +100 y conserva sus propios polos y evidencia. «Sin datos» significa que no hay una
          opinión calculable; «provisional», que aún faltan preguntas o cobertura.
        </p>
        <PerfilFacetas ejes={EJES} facetas={facetasUsuario} />
      </section>

      <ReferenciasDoctrinales
        referencias={REFERENCIAS}
        resultados={resultadosReferencias}
      />

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

      {seleccionElectoral.metodo === 'convocatoria-documentada' &&
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

      <section className="seccion">
        <h2>Afinidad con partidos</h2>
        <p className="nota-al-margen" style={{ maxWidth: '68ch' }}>
          Se muestra después de tu perfil propio: es una comparación electoral, no tu identidad.
          La distancia se calcula solo sobre posiciones compartidas y cada resultado declara su
          cobertura y sus fuentes.
        </p>
        {nConOpinion === 0 ? (
          <div className="resultado-no-calculable" role="status">
            <strong>No hay afinidad calculable.</strong>
            <p>
              Has usado «Sin opinión» en todas las preguntas. Eso no equivale a estar en
              desacuerdo con todos los partidos: simplemente no hay posiciones que comparar.
            </p>
          </div>
        ) : (
          <Ranking
            resultados={resultados}
            entidades={PARTIDO_POR_ID}
            doblesMarcadores={doblesMarcadores}
          />
        )}
      </section>

      {resultados.length > 0 ? (
        <section className="seccion">
          <h2>Por qué coincide</h2>
          <p className="nota-al-margen" style={{ maxWidth: '68ch' }}>
            Cada porcentaje se puede auditar: despliega un partido para ver tu respuesta, la
            suya, la justificación y la fuente, ítem a ítem.
          </p>
          {resultados.map((r) => {
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
          <Ranking
            resultados={resultadosFueraConvocatoria}
            entidades={PARTIDO_POR_ID}
          />
          <div className="detalles-afinidad">
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
        {esPerfilProvisional ? (
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
    </div>
  );
}
