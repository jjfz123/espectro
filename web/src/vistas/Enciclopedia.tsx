import { useMemo, useState } from 'react';
import type { FuenteCita, Partido, Posicion } from '@engine';
import {
  ITEM_POR_ID,
  etiquetaValor,
  nombreComunidad,
  nombrePerfil,
} from '../datos';
import { PARTIDOS } from '../datosOrganizaciones';
import { REFERENCIAS } from '../datosReferencias';
import { ENTIDADES_MAPA } from '../mapaEspacial';
import type { EntidadMapa } from '../mapaEspacial';
import { nombreGradoBrujula } from '../brujulaPartidos';
import { InformacionIdeologia } from '../componentes/FichaIdeologia';

interface Props {
  alVolver: () => void;
}

type SeccionEnciclopedia = 'partidos' | 'ideologias';

const PARTIDOS_ACTIVOS = PARTIDOS.filter((partido) => partido.actividad === 'activa');
const ENTIDAD_PARTIDO_POR_ID = new Map(
  ENTIDADES_MAPA.filter((entidad) => entidad.tipo === 'partido').map((entidad) => [
    entidad.id,
    entidad,
  ]),
);

const AMBITO: Record<Partido['ambito'], string> = {
  estatal: 'Estatal',
  autonomico: 'Autonómico',
  insular: 'Insular',
  local: 'Local',
};

function normalizar(texto: string): string {
  return texto.toLocaleLowerCase('es').normalize('NFD').replace(/[̀-ͯ]/gu, '');
}

function Fuente({ fuente, etiqueta = 'fuente' }: { fuente: FuenteCita; etiqueta?: string }) {
  const contenido = (
    <>
      {fuente.titulo ?? etiqueta}
      {fuente.fecha ? ` (${fuente.fecha})` : ''}
    </>
  );
  return fuente.url ? (
    <a href={fuente.url} rel="noopener noreferrer" target="_blank">
      {contenido}
    </a>
  ) : (
    <span>{contenido}</span>
  );
}

function EvidenciaAncla({ itemId, posicion }: { itemId: string; posicion: Posicion }) {
  const item = ITEM_POR_ID.get(itemId);
  return (
    <li>
      <p>
        <strong>{item?.texto ?? itemId}</strong>{' '}
        <span className="insignia">{etiquetaValor(posicion.valor)}</span>
      </p>
      {posicion.justificacion ? <p>{posicion.justificacion}</p> : null}
      {posicion.fuente ? (
        <p className="nota-al-margen">
          <Fuente fuente={posicion.fuente} />
          {posicion.fuente.consultado ? ` · consultada ${posicion.fuente.consultado}` : ''}
        </p>
      ) : null}
    </li>
  );
}

function FichaPartido({ partido, entidad }: { partido: Partido; entidad: EntidadMapa | undefined }) {
  const evidencia = entidad?.evidenciaBrujula;
  const x = entidad?.valores['propiedad-mercado'];
  const y = entidad?.valores['autoridad-politica'];
  const anclas = Object.entries(partido.posiciones)
    .filter(([itemId, posicion]) => ITEM_POR_ID.has(itemId) && posicion.fuente?.url)
    .slice(0, 9);
  const posiciones = Object.values(partido.posiciones);
  const conFuente = posiciones.filter((posicion) => posicion.fuente?.url).length;
  const comunidades = partido.ccaa?.map((id) => nombreComunidad(id) ?? id).join(', ');

  return (
    <div className="enciclopedia-entrada__cuerpo enciclopedia-partido">
      <dl className="enciclopedia-partido__metadatos">
        <div>
          <dt>Ámbito</dt>
          <dd>{AMBITO[partido.ambito]}{comunidades ? ` · ${comunidades}` : ''}</dd>
        </div>
        <div>
          <dt>Tipo</dt>
          <dd>{partido.tipo === 'coalicion' ? 'Coalición' : 'Partido'}</dd>
        </div>
        <div>
          <dt>Ficha documental</dt>
          <dd>{posiciones.length} posiciones; {conFuente} con enlace reproducible</dd>
        </div>
        <div>
          <dt>Revisión</dt>
          <dd>{partido.revisado ?? 'Sin fecha declarada'}</dd>
        </div>
      </dl>

      {evidencia && typeof x === 'number' && typeof y === 'number' ? (
        <section className="enciclopedia-partido__brujula" aria-label="Coordenada en la brújula">
          <h3>Posición en el eje</h3>
          <p>
            <strong>{nombreGradoBrujula(evidencia.grado)}.</strong>{' '}
            Propiedad y mercado: {Math.round(x)} ± {evidencia.incertidumbreX}. Poder: {Math.round(y)} ±{' '}
            {evidencia.incertidumbreY}. Ninguno de estos márgenes altera el ranking de afinidad.
          </p>
          <p>{evidencia.resumenX} {evidencia.resumenY}</p>
          <p className="nota-al-margen">
            Cobertura estricta: {evidencia.propiedad.items} grupos en{' '}
            {evidencia.propiedad.familias} subdimensiones de propiedad; {evidencia.poder.items} grupos
            en {evidencia.poder.familias} familias de poder, con {evidencia.poder.itemsNucleo} de
            contrapesos o libertades. Criterio: {evidencia.criterio}.
          </p>
        </section>
      ) : (
        <p className="resultado-no-calculable">
          El perfil no tiene una coordenada publicable. Esto indica un error de integridad: todos los
          partidos activos deben permanecer en la brújula.
        </p>
      )}

      {partido.autodescripcion ? (
        <section>
          <h3>Cómo se describe la organización</h3>
          <blockquote>{partido.autodescripcion.texto}</blockquote>
          <p className="nota-al-margen">
            Autodescripción atribuida: <Fuente fuente={partido.autodescripcion.fuente} />
          </p>
        </section>
      ) : null}

      {partido.clasificacion && partido.clasificacion.length > 0 ? (
        <section>
          <h3>Clasificaciones externas atribuidas</h3>
          <ul className="enciclopedia-partido__clasificaciones">
            {partido.clasificacion.map((clasificacion, indice) => (
              <li key={`${clasificacion.etiqueta}-${indice}`}>
                <strong>{clasificacion.etiqueta}.</strong> {clasificacion.explicacion}{' '}
                <span className="nota-al-margen">
                  — <Fuente fuente={clasificacion.fuente} />
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {anclas.length > 0 ? (
        <section>
          <h3>Muestra documental</h3>
          <p className="nota-al-margen">
            Posiciones directas con fuente; la ficha de datos conserva el inventario completo.
          </p>
          <ul className="enciclopedia-partido__anclas">
            {anclas.map(([itemId, posicion]) => (
              <EvidenciaAncla key={itemId} itemId={itemId} posicion={posicion} />
            ))}
          </ul>
        </section>
      ) : null}

      <p className="enciclopedia-partido__enlaces">
        {partido.web ? (
          <a href={partido.web} rel="noopener noreferrer" target="_blank">
            Sitio oficial
          </a>
        ) : (
          <span>Sin sitio oficial enlazado</span>
        )}
      </p>
    </div>
  );
}

/**
 * Enciclopedia documental: partidos activos y corrientes doctrinales se
 * mantienen en catálogos separados para no convertir una organización real en
 * un tipo ideal ni presentar una corriente como candidatura.
 */
export function Enciclopedia({ alVolver }: Props) {
  const [seccion, setSeccion] = useState<SeccionEnciclopedia>('partidos');
  const [filtro, setFiltro] = useState('');

  const partidosOrdenados = useMemo(
    () => [...PARTIDOS_ACTIVOS].sort((a, b) => nombrePerfil(a).localeCompare(nombrePerfil(b), 'es')),
    [],
  );
  const referenciasOrdenadas = useMemo(
    () => [...REFERENCIAS].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es')),
    [],
  );
  const filtroNormalizado = normalizar(filtro.trim());
  const partidosVisibles = filtroNormalizado
    ? partidosOrdenados.filter((partido) =>
        normalizar(
          [
            partido.nombre,
            partido.siglas ?? '',
            partido.autodescripcion?.texto ?? '',
            ...(partido.clasificacion?.flatMap((entrada) => [entrada.etiqueta, entrada.explicacion]) ?? []),
            ...(partido.ccaa ?? []),
          ].join(' '),
        ).includes(filtroNormalizado),
      )
    : partidosOrdenados;
  const referenciasVisibles = filtroNormalizado
    ? referenciasOrdenadas.filter((referencia) =>
        normalizar(
          `${referencia.nombre} ${referencia.definicion} ${referencia.variante ?? ''} ${referencia.periodo ?? ''}`,
        ).includes(filtroNormalizado),
      )
    : referenciasOrdenadas;
  const dibujadas = REFERENCIAS.filter(
    (referencia) => referencia.publicacionMapa?.publicable !== false,
  ).length;

  return (
    <div className="contenedor">
      <p className="kicker">Documentación</p>
      <h1 className="titular" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.4rem)' }}>
        Enciclopedia de partidos e ideologías
      </h1>
      <p className="entradilla" style={{ fontSize: '1.05rem' }}>
        Dos catálogos auditables y separados: los {PARTIDOS_ACTIVOS.length} partidos activos, con su
        coordenada, incertidumbre y fuentes; y las {REFERENCIAS.length} corrientes doctrinales, tratadas
        como tipos ideales. Explorar una ficha no cambia tus respuestas ni te asigna una identidad.
      </p>

      <div className="enciclopedia-pestanas" role="tablist" aria-label="Catálogo de la enciclopedia">
        <button
          type="button"
          role="tab"
          aria-selected={seccion === 'partidos'}
          className="boton boton--secundario"
          onClick={() => {
            setSeccion('partidos');
            setFiltro('');
          }}
        >
          Partidos ({PARTIDOS_ACTIVOS.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={seccion === 'ideologias'}
          className="boton boton--secundario"
          onClick={() => {
            setSeccion('ideologias');
            setFiltro('');
          }}
        >
          Ideologías ({REFERENCIAS.length})
        </button>
      </div>

      <label className="enciclopedia-buscador">
        <span>{seccion === 'partidos' ? 'Buscar un partido' : 'Buscar una corriente'}</span>
        <input
          type="search"
          value={filtro}
          onChange={(evento) => setFiltro(evento.target.value)}
          placeholder={
            seccion === 'partidos'
              ? 'siglas, nombre, clasificación, comunidad…'
              : 'anarquismo, distributismo, felipismo…'
          }
        />
      </label>

      {seccion === 'partidos' ? (
        <>
          <p className="nota-al-margen" role="status">
            {partidosVisibles.length === PARTIDOS_ACTIVOS.length
              ? `${PARTIDOS_ACTIVOS.length} partidos activos, de la A a la Z; todos aparecen también en el eje.`
              : `${partidosVisibles.length} de ${PARTIDOS_ACTIVOS.length} partidos coinciden con la búsqueda.`}
          </p>
          <div className="enciclopedia-lista">
            {partidosVisibles.map((partido) => {
              const entidad = ENTIDAD_PARTIDO_POR_ID.get(partido.id);
              const evidencia = entidad?.evidenciaBrujula;
              return (
                <details className="enciclopedia-entrada" key={partido.id}>
                  <summary>
                    <span className="enciclopedia-entrada__nombre">{nombrePerfil(partido)}</span>
                    {evidencia ? (
                      <span className="insignia">{nombreGradoBrujula(evidencia.grado)}</span>
                    ) : null}
                    {partido.monotematico ? (
                      <span className="insignia insignia--acento">programa monotemático</span>
                    ) : null}
                  </summary>
                  <FichaPartido partido={partido} entidad={entidad} />
                </details>
              );
            })}
            {partidosVisibles.length === 0 ? (
              <p className="resultado-no-calculable" role="status">
                Ningún partido coincide con esa búsqueda.
              </p>
            ) : null}
          </div>
        </>
      ) : (
        <>
          <p className="nota-al-margen" role="status">
            {referenciasVisibles.length === REFERENCIAS.length
              ? `${REFERENCIAS.length} corrientes, de la A a la Z. ${dibujadas} tienen proyección publicable.`
              : `${referenciasVisibles.length} de ${REFERENCIAS.length} corrientes coinciden con la búsqueda.`}
          </p>
          <div className="enciclopedia-lista">
            {referenciasVisibles.map((referencia) => {
              const esSensible =
                referencia.sensibilidad !== undefined && referencia.sensibilidad !== 'normal';
              return (
                <details className="enciclopedia-entrada" key={referencia.id}>
                  <summary>
                    <span className="enciclopedia-entrada__nombre">{referencia.nombre}</span>
                    {referencia.periodo ? <span className="insignia">{referencia.periodo}</span> : null}
                    {esSensible ? (
                      <span className="insignia insignia--acento">patrón sensible documentado</span>
                    ) : null}
                  </summary>
                  <div className="enciclopedia-entrada__cuerpo">
                    {esSensible ? (
                      <p className="nota-al-margen">
                        Entrada descriptiva con lenguaje clínico: documenta un patrón doctrinal sensible
                        con fuentes. Leerla no implica pertenencia, militancia ni intención, y esta corriente
                        nunca se presenta como identidad de nadie.
                      </p>
                    ) : null}
                    <p className="enciclopedia-entrada__definicion">{referencia.definicion}</p>
                    <InformacionIdeologia referencia={referencia} origenAparicion="seleccion" />
                  </div>
                </details>
              );
            })}
            {referenciasVisibles.length === 0 ? (
              <p className="resultado-no-calculable" role="status">
                Ninguna corriente coincide con esa búsqueda; prueba con otro término.
              </p>
            ) : null}
          </div>
        </>
      )}

      <div className="acciones">
        <button type="button" className="boton" onClick={alVolver}>
          Volver
        </button>
      </div>
    </div>
  );
}
