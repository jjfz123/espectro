import { useMemo, useState } from 'react';
import { REFERENCIAS } from '../datosReferencias';
import { InformacionIdeologia } from '../componentes/FichaIdeologia';

interface Props {
  alVolver: () => void;
}

/**
 * Enciclopedia ideológica (orden del propietario, 2026-07-12): todas las
 * corrientes documentadas del proyecto, explorables desde la portada sin
 * hacer el test. Son tipos ideales con fuentes; abrir una ficha es una
 * exploración deliberada (origen «selección»), nunca una identidad asignada.
 */
export function Enciclopedia({ alVolver }: Props) {
  const [filtro, setFiltro] = useState('');

  const ordenadas = useMemo(
    () => [...REFERENCIAS].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es')),
    [],
  );
  const normalizar = (texto: string) =>
    texto.toLocaleLowerCase('es').normalize('NFD').replace(/[̀-ͯ]/gu, '');
  const filtroNormalizado = normalizar(filtro.trim());
  const visibles = filtroNormalizado
    ? ordenadas.filter((referencia) =>
        normalizar(
          `${referencia.nombre} ${referencia.definicion} ${referencia.variante ?? ''} ${referencia.periodo ?? ''}`,
        ).includes(filtroNormalizado),
      )
    : ordenadas;
  const dibujadas = REFERENCIAS.filter(
    (referencia) => referencia.publicacionMapa?.publicable !== false,
  ).length;

  return (
    <div className="contenedor">
      <p className="kicker">Documentación</p>
      <h1 className="titular" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.4rem)' }}>
        Enciclopedia ideológica
      </h1>
      <p className="entradilla" style={{ fontSize: '1.05rem' }}>
        Las {REFERENCIAS.length} corrientes documentadas del proyecto, con su definición, su
        variante datada y sus fuentes marco. Son <strong>tipos ideales</strong> construidos
        desde textos: no son candidaturas, no se te asignan como identidad y explorarlas no
        toca tus respuestas. {dibujadas} tienen hoy proyección publicada en el atlas; el resto
        sigue en investigación o con su proyección vetada por honestidad documental.
      </p>

      <label className="enciclopedia-buscador">
        <span>Buscar una corriente</span>
        <input
          type="search"
          value={filtro}
          onChange={(evento) => setFiltro(evento.target.value)}
          placeholder="anarquismo, distributismo, felipismo…"
        />
      </label>
      <p className="nota-al-margen" role="status">
        {visibles.length === REFERENCIAS.length
          ? `${REFERENCIAS.length} corrientes, de la A a la Z.`
          : `${visibles.length} de ${REFERENCIAS.length} corrientes coinciden con la búsqueda.`}
      </p>

      <div className="enciclopedia-lista">
        {visibles.map((referencia) => {
          const esSensible =
            referencia.sensibilidad !== undefined && referencia.sensibilidad !== 'normal';
          return (
            <details className="enciclopedia-entrada" key={referencia.id}>
              <summary>
                <span className="enciclopedia-entrada__nombre">{referencia.nombre}</span>
                {referencia.periodo ? (
                  <span className="insignia">{referencia.periodo}</span>
                ) : null}
                {esSensible ? (
                  <span className="insignia insignia--acento">patrón sensible documentado</span>
                ) : null}
              </summary>
              <div className="enciclopedia-entrada__cuerpo">
                {esSensible ? (
                  <p className="nota-al-margen">
                    Entrada descriptiva con lenguaje clínico: documenta un patrón doctrinal
                    sensible con fuentes. Leerla no implica pertenencia, militancia ni
                    intención, y esta corriente nunca se presenta como identidad de nadie.
                  </p>
                ) : null}
                <p className="enciclopedia-entrada__definicion">{referencia.definicion}</p>
                <InformacionIdeologia referencia={referencia} origenAparicion="seleccion" />
              </div>
            </details>
          );
        })}
        {visibles.length === 0 ? (
          <p className="resultado-no-calculable" role="status">
            Ninguna corriente coincide con esa búsqueda; prueba con otro término o revisa el
            glosario dentro del test.
          </p>
        ) : null}
      </div>

      <div className="acciones">
        <button type="button" className="boton" onClick={alVolver}>
          Volver
        </button>
      </div>
    </div>
  );
}
