import { useState } from 'react';
import type { TipoEleccion } from '@engine';
import {
  COMUNIDADES,
  EJES,
  ELECCIONES,
  ITEMS,
  ITEMS_NUCLEO,
  MODULOS,
  PARTIDOS,
  secuenciaItems,
} from '../datos';
import type { Accion, Estado, Modo } from '../estado';

interface Props {
  estado: Estado;
  despachar: (accion: Accion) => void;
  alAbrirMetodologia: () => void;
}

export function Portada({ estado, despachar, alAbrirMetodologia }: Props) {
  const [ccaa, setCcaa] = useState(estado.ccaa);
  const [eleccion, setEleccion] = useState<TipoEleccion>(estado.eleccion);
  const [modo, setModo] = useState<Modo>(estado.modo);

  const respondidas = Object.keys(estado.respuestas).length;
  const totalSecuencia = secuenciaItems(estado.modulosActivos).length;
  const hayProgreso = respondidas > 0;

  const empezar = () => {
    if (
      hayProgreso &&
      !window.confirm('Empezar de nuevo descartará tus respuestas anteriores. ¿Continuar?')
    ) {
      return;
    }
    despachar({ tipo: 'empezar', ccaa, eleccion, modo });
  };

  return (
    <div className="contenedor">
      <section className="portada-hero">
        <p className="kicker">Test de afinidad política · España</p>
        <h1 className="titular">Un mapa fino del espectro político español.</h1>
        <p className="entradilla">
          Los tests de afinidad existentes cubren unos diez partidos y dos ejes. Espectro
          está diseñado para el registro completo: distingue al leninista del consejista y a
          la derecha confesional de la liberal, y trata la dimensión territorial como lo que
          es, la que explica el sistema de partidos español.
        </p>
        <div className="cifras">
          <div className="cifra">
            <strong>{ITEMS.length}</strong>
            <span>ítems en el banco</span>
          </div>
          <div className="cifra">
            <strong>{MODULOS.length}</strong>
            <span>módulos temáticos</span>
          </div>
          <div className="cifra">
            <strong>{EJES.length}</strong>
            <span>ejes y sub-ejes</span>
          </div>
          <div className="cifra">
            <strong>{PARTIDOS.length}</strong>
            <span>partidos (demo)</span>
          </div>
        </div>
      </section>

      {hayProgreso ? (
        <section className="continuar-bloque" aria-label="Test empezado">
          <p>
            Tienes un test empezado en este navegador: <strong>{respondidas}</strong> de{' '}
            {totalSecuencia} ítems respondidos.
          </p>
          <div className="acciones" style={{ marginTop: 0 }}>
            <button type="button" className="boton" onClick={() => despachar({ tipo: 'continuar' })}>
              Continuar
            </button>
            <button
              type="button"
              className="boton--terciario boton"
              onClick={() => despachar({ tipo: 'reiniciar' })}
            >
              Descartarlo y empezar de nuevo
            </button>
          </div>
        </section>
      ) : null}

      <section className="seccion prosa">
        <h2>Por qué existe</h2>
        <p>
          Un cuestionario plano de treinta preguntas puede ordenar a los grandes partidos,
          pero un estalinista y una luxemburguista responden idéntico a todas ellas: lo que
          los separa no está en ese cuestionario. Espectro parte de otra premisa: las
          preguntas crecen con las <em>distinciones</em>, no con el número de partidos.
        </p>
        <p>
          Por eso el banco se organiza en módulos. Un núcleo común posiciona a cualquiera en
          los ejes principales, y los módulos de profundización —corrientes de la izquierda
          y de la derecha, centro y liberalismo, nacionalismos, ecologismo, feminismos, tu
          comunidad autónoma— hacen las preguntas que de verdad separan corrientes vecinas.
          Cada posición de partido lleva su justificación y su cita de fuente; cuando no hay
          datos suficientes, el resultado lo dice en lugar de disimularlo.
        </p>
      </section>

      <section className="seccion">
        <h2>Empezar el test</h2>
        <p className="nota-al-margen" style={{ maxWidth: '62ch' }}>
          Elige cuánto quieres profundizar. En ambos casos puedes marcar cualquier ítem como
          «sin opinión» y señalar los temas que te importan el doble.
        </p>

        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
          <legend className="solo-lectores">Modo del test</legend>
          <div className="modos">
            <label className="modo" data-activo={modo === 'rapido'}>
              <input
                type="radio"
                name="modo"
                value="rapido"
                checked={modo === 'rapido'}
                onChange={() => setModo('rapido')}
              />
              <span className="modo-nombre">Rápido</span>
              <span className="modo-detalle">
                Solo el núcleo: {ITEMS_NUCLEO.length} ítems. Ranking de afinidad por partido
                y mapa de ejes principales.
              </span>
            </label>
            <label className="modo" data-activo={modo === 'completo'}>
              <input
                type="radio"
                name="modo"
                value="completo"
                checked={modo === 'completo'}
                onChange={() => setModo('completo')}
              />
              <span className="modo-nombre">Mapa completo</span>
              <span className="modo-detalle">
                El núcleo más los módulos que se desbloquean según tus posiciones, entre 90 y
                130 ítems. La taxonomía fina: corrientes, sub-ejes y tu comunidad.
              </span>
            </label>
          </div>
        </fieldset>

        <div style={{ marginTop: '1.5rem' }}>
          <label className="campo">
            <span>Comunidad autónoma</span>
            <select value={ccaa} onChange={(e) => setCcaa(e.target.value)}>
              <option value="">Prefiero no indicarla</option>
              {COMUNIDADES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
            <span className="ayuda">
              Sirve para ofrecerte el módulo territorial y filtrar los partidos de tu ámbito.
              Se guarda solo en tu navegador.
            </span>
          </label>
          <label className="campo">
            <span>Tipo de elección</span>
            <select
              value={eleccion}
              onChange={(e) => setEleccion(e.target.value as TipoEleccion)}
            >
              {ELECCIONES.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nombre}
                </option>
              ))}
            </select>
            <span className="ayuda">
              Decide qué partidos entran en el ranking; la fórmula de afinidad no cambia.
            </span>
          </label>
        </div>

        <div className="acciones">
          <button type="button" className="boton" onClick={empezar}>
            Empezar el test
          </button>
          <span className="nota-al-margen">
            {modo === 'rapido'
              ? `${ITEMS_NUCLEO.length} ítems, aproximadamente uno por minuto.`
              : `${ITEMS_NUCLEO.length} ítems de núcleo; los módulos se eligen después.`}
          </span>
        </div>
      </section>

      <section className="seccion">
        <h2>Tus respuestas no salen de tu navegador</h2>
        <div className="privacidad-bloque">
          <p>
            Las opiniones políticas son datos especialmente protegidos (art. 9 RGPD y art.
            9.1 LOPDGDD). Por eso Espectro no tiene servidor de cálculo: los ítems y las
            posiciones de los partidos se descargan con la página, y la afinidad se calcula
            íntegramente en tu dispositivo. Sin cuentas, sin rastreadores, sin analítica.
          </p>
          <p>
            El progreso se guarda en el almacenamiento local de tu navegador y puedes
            borrarlo cuando quieras desde el pie de página.{' '}
            <button type="button" className="boton boton--terciario" onClick={alAbrirMetodologia} style={{ padding: 0 }}>
              Metodología y privacidad, en detalle
            </button>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
