import { useMemo } from 'react';
import type { Respuesta } from '@engine';
import { calcularEjes, partidosElegibles, rankingAfinidad } from '@engine';
import { DetallePartido } from '../componentes/DetallePartido';
import { MapaEjes } from '../componentes/MapaEjes';
import { Ranking } from '../componentes/Ranking';
import {
  EJES,
  ELECCIONES,
  ITEMS,
  ITEMS_POR_MODULO,
  MODULOS,
  PARTIDOS,
  nombreComunidad,
  secuenciaItems,
} from '../datos';
import type { Accion, Estado } from '../estado';

interface Props {
  estado: Estado;
  despachar: (accion: Accion) => void;
}

const PARTIDO_POR_ID = new Map(PARTIDOS.map((p) => [p.id, p]));

export function Resultados({ estado, despachar }: Props) {
  const respuestas: Respuesta[] = useMemo(() => {
    return secuenciaItems(estado.modulosActivos)
      .filter((item) => item.id in estado.respuestas)
      .map((item) => ({
        itemId: item.id,
        valor: estado.respuestas[item.id] ?? null,
        importante: Boolean(estado.importantes[item.id]),
      }));
  }, [estado.modulosActivos, estado.respuestas, estado.importantes]);

  const resultados = useMemo(() => {
    const elegibles = partidosElegibles(PARTIDOS, {
      tipo: estado.eleccion,
      ccaa: estado.ccaa || undefined,
    });
    return rankingAfinidad(respuestas, elegibles);
  }, [respuestas, estado.eleccion, estado.ccaa]);

  const ejesUsuario = useMemo(() => calcularEjes(respuestas, ITEMS, EJES), [respuestas]);

  const ejesPrincipales = EJES.filter((e) => !e.subEje);
  const subEjes = EJES.filter((e) => e.subEje);

  const nSinOpinion = respuestas.filter((r) => r.valor === null).length;
  const nombreEleccion =
    ELECCIONES.find((e) => e.id === estado.eleccion)?.nombre ?? estado.eleccion;
  const comunidad = estado.ccaa ? nombreComunidad(estado.ccaa) : undefined;

  const quedanModulos = MODULOS.some((m) => {
    if (m.id === 'nucleo') return false;
    const items = ITEMS_POR_MODULO.get(m.id) ?? [];
    return items.some((i) => !(i.id in estado.respuestas));
  });

  return (
    <div className="contenedor contenedor--ancho">
      <p className="kicker">Resultados</p>
      <h1 className="titular" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.4rem)' }}>
        Tu posición y tus afinidades
      </h1>
      <p className="contexto-resultados">
        {nombreEleccion}
        {comunidad ? ` · ${comunidad}` : ' · comunidad sin indicar'} · {respuestas.length}{' '}
        ítems respondidos
        {nSinOpinion > 0 ? ` (${nSinOpinion} sin opinión)` : ''}. Calculado en tu navegador;
        nada se ha enviado a ningún servidor.
      </p>

      <div className="nota-demo">
        <p>
          <strong>Versión de demostración.</strong> El banco de posiciones de partidos está
          en construcción: por ahora solo contiene dos partidos ficticios que sirven para
          enseñar el mecanismo. Este resultado no es orientación de voto.
        </p>
      </div>

      <section className="seccion">
        <h2>Afinidad con partidos</h2>
        <p className="nota-al-margen" style={{ maxWidth: '68ch' }}>
          Distancia city-block normalizada y ponderada sobre los ítems que compartís, el
          método del Wahl-O-Mat. «Posición verificada» significa autoubicación del partido o
          cita documental; «estimada», inferencia del equipo etiquetada como tal.
        </p>
        <Ranking resultados={resultados} partidos={PARTIDO_POR_ID} />
      </section>

      <section className="seccion">
        <h2>Mapa ideológico</h2>
        <p className="nota-al-margen" style={{ maxWidth: '68ch' }}>
          Tu puntuación en cada eje, de −100 a +100. Un eje sin ítems respondidos queda «sin
          datos»: no se inventa una posición.
        </p>
        <MapaEjes titulo="Ejes principales" ejes={ejesPrincipales} valores={ejesUsuario} />
        <MapaEjes
          titulo="Sub-ejes de módulo"
          nota="Solo se miden con los módulos de profundización; el núcleo apenas los roza."
          ejes={subEjes}
          valores={ejesUsuario}
        />
      </section>

      <section className="seccion">
        <h2>Por qué coincide</h2>
        <p className="nota-al-margen" style={{ maxWidth: '68ch' }}>
          Cada porcentaje se puede auditar: despliega un partido para ver tu respuesta, la
          suya, la justificación y la fuente, ítem a ítem.
        </p>
        {resultados.map((r) => {
          const partido = PARTIDO_POR_ID.get(r.partidoId);
          if (!partido) return null;
          return <DetallePartido key={r.partidoId} resultado={r} partido={partido} />;
        })}
      </section>

      <div className="acciones">
        {quedanModulos ? (
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
