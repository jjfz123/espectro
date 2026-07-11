import { useEffect, useRef, useState } from 'react';
import type { Valor } from '@engine';
import { BarraProgreso } from '../componentes/BarraProgreso';
import { Likert } from '../componentes/Likert';
import { ITEM_POR_ID, etiquetaValor, pad2, secuenciaItems, terminosDeItem } from '../datos';
import type { Accion, Estado } from '../estado';

interface Props {
  estado: Estado;
  despachar: (accion: Accion) => void;
}

const VALORES_TECLA: Record<string, Valor> = {
  '1': -2,
  '2': -1,
  '3': 0,
  '4': 1,
  '5': 2,
};

export function Cuestionario({ estado, despachar }: Props) {
  const secuencia = secuenciaItems(estado.modulosActivos, estado.respuestas);
  const item = secuencia[estado.indice];
  const encabezadoRef = useRef<HTMLHeadingElement>(null);
  const marcaGlosarioRef = useRef<HTMLButtonElement>(null);
  const [glosarioAbierto, setGlosarioAbierto] = useState(false);
  /**
   * Anuncio para lectores de pantalla al responder con los atajos 1-5/0:
   * con el foco en el encabezado, marcar el radio no produce ninguna
   * locución; esta región viva confirma qué quedó registrado. Al responder
   * pulsando el propio radio el lector ya lo anuncia y aquí no se escribe.
   */
  const [anuncio, setAnuncio] = useState('');

  const itemId = item?.id;
  const respondido = itemId !== undefined && itemId in estado.respuestas;

  useEffect(() => {
    setGlosarioAbierto(false);
    setAnuncio('');
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
      encabezadoRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [itemId]);

  useEffect(() => {
    if (!itemId) return;
    const alPulsar = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === 'Escape') {
        if (glosarioAbierto) {
          setGlosarioAbierto(false);
          marcaGlosarioRef.current?.focus();
          e.preventDefault();
        }
        return;
      }
      const destino = e.target as HTMLElement | null;
      if (destino && ['INPUT', 'SELECT', 'TEXTAREA'].includes(destino.tagName)) return;
      if (e.key in VALORES_TECLA) {
        const valorTecla = VALORES_TECLA[e.key] ?? 0;
        despachar({ tipo: 'responder', itemId, valor: valorTecla });
        setAnuncio(`Respondida: ${etiquetaValor(valorTecla)}.`);
      } else if (e.key === '0') {
        despachar({ tipo: 'responder', itemId, valor: null });
        setAnuncio('Respondida: sin opinión.');
      } else if (e.key === 'ArrowLeft' && !estado.editando) {
        despachar({ tipo: 'anterior' });
      } else if (e.key === 'ArrowRight' && respondido) {
        despachar({ tipo: estado.editando ? 'terminar-edicion' : 'siguiente' });
      } else {
        return;
      }
      e.preventDefault();
    };
    window.addEventListener('keydown', alPulsar);
    return () => window.removeEventListener('keydown', alPulsar);
  }, [itemId, respondido, glosarioAbierto, estado.editando, despachar]);

  if (!item || !itemId) {
    return (
      <div className="contenedor">
        <p className="nota-al-margen">No hay ítems pendientes.</p>
        <button type="button" className="boton" onClick={() => despachar({ tipo: 'ir-a-portada' })}>
          Volver a la portada
        </button>
      </div>
    );
  }

  const valor = estado.respuestas[itemId];
  const importante = Boolean(estado.importantes[itemId]);
  const terminos = terminosDeItem(item);
  const itemPadre = item.condicion ? ITEM_POR_ID.get(item.condicion.itemId) : undefined;
  const respuestaPadre = item.condicion
    ? estado.respuestas[item.condicion.itemId]
    : undefined;
  const esUltimo = estado.indice === secuencia.length - 1;
  const etiquetaSiguiente = !esUltimo
    ? 'Siguiente'
    : estado.modo === 'rapido' && estado.modulosActivos.length === 0
      ? 'Finalizar modo rápido'
      : estado.modo === 'completo' && estado.modulosActivos.length === 0
        ? 'Terminar el núcleo'
        : 'Ver resultados';

  return (
    <div className="contenedor">
      <BarraProgreso modulosActivos={estado.modulosActivos} respuestas={estado.respuestas} />
      <div className="cuestionario-meta">
        <span className="kicker">
          {estado.editando
            ? 'Corrigiendo una respuesta'
            : item.modulo === 'nucleo'
              ? 'Cuestionario · modo rápido'
              : 'Cuestionario · profundización'}
        </span>
        <span className="numeracion">
          <strong>{pad2(estado.indice + 1)}</strong> / {pad2(secuencia.length)}
        </span>
      </div>

      {itemPadre && typeof respuestaPadre === 'number' ? (
        <p className="seguimiento-contexto">
          <strong>Pregunta de seguimiento.</strong> Has respondido «{etiquetaValor(respuestaPadre)}»
          a «{itemPadre.texto}». Esta pregunta aclara el motivo sin cambiar la intensidad de tu
          respuesta anterior.
        </p>
      ) : null}

      {item.marco && item.marco.supuesto !== 'neutro' ? (
        <p className={`marco-contexto marco-${item.marco.supuesto}`}>
          <strong>
            {item.marco.supuesto === 'sistema-actual'
              ? 'Sobre el sistema actual.'
              : 'Sobre la sociedad que defiendes.'}
          </strong>{' '}
          {item.marco.aclaracion}
        </p>
      ) : null}

      <h1 className="item-texto" ref={encabezadoRef} tabIndex={-1}>
        {item.texto}
        {terminos.length > 0 ? (
          <button
            type="button"
            ref={marcaGlosarioRef}
            className="glosario-marca"
            aria-expanded={glosarioAbierto}
            aria-controls="glosario-panel"
            aria-label={`Qué significa: ${terminos.map((t) => t.termino).join(', ')}`}
            onClick={() => setGlosarioAbierto((abierto) => !abierto)}
          >
            <span aria-hidden="true">?</span>
          </button>
        ) : null}
      </h1>

      {terminos.length > 0 ? (
        <aside
          id="glosario-panel"
          className="glosario-panel"
          aria-label="Glosario"
          hidden={!glosarioAbierto}
        >
          <div className="glosario-cabecera">
            <span className="kicker">Del glosario</span>
            <button
              type="button"
              className="glosario-cerrar"
              onClick={() => {
                setGlosarioAbierto(false);
                marcaGlosarioRef.current?.focus();
              }}
            >
              Cerrar
            </button>
          </div>
          <dl>
            {terminos.map((t) => (
              <div key={t.id} className="glosario-entrada">
                <dt>{t.termino}</dt>
                <dd>
                  {t.definicion}{' '}
                  {t.ampliacion ? (
                    <details className="glosario-mas">
                      <summary>Más detalle</summary>
                      <p>{t.ampliacion}</p>
                    </details>
                  ) : null}
                  <a href={t.url} target="_blank" rel="noopener noreferrer">
                    Ver en Wikipedia
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      ) : null}

      <Likert
        valor={valor}
        textoItem={item.texto}
        alResponder={(v) => despachar({ tipo: 'responder', itemId, valor: v })}
        invertida={estado.escalaInvertida}
      />

      <div className="escala-orden">
        <button
          type="button"
          className="escala-orden__boton"
          aria-pressed={estado.escalaInvertida}
          onClick={() => despachar({ tipo: 'alternar-escala' })}
        >
          {estado.escalaInvertida ? 'Volver al orden recomendado' : 'Invertir el orden de la escala'}
        </button>
        <span className="escala-orden__nota">
          {estado.escalaInvertida
            ? '«Muy de acuerdo» aparece primero. El orden recomendado lo pone al final para reducir la tendencia a asentir sin pensar.'
            : 'Por defecto «muy de acuerdo» aparece al final para reducir la tendencia a asentir sin pensar. Puedes invertirlo.'}
        </span>
      </div>

      <div className="importante-fila">
        <label className="importante">
          <input
            type="checkbox"
            checked={importante}
            onChange={(e) =>
              despachar({ tipo: 'marcar-importante', itemId, importante: e.target.checked })
            }
          />
          <span>Este tema me importa el doble</span>
        </label>
      </div>

      <div className="cuestionario-nav">
        {estado.editando ? null : (
          <button
            type="button"
            className="boton boton--secundario"
            onClick={() => despachar({ tipo: 'anterior' })}
            disabled={estado.indice === 0}
          >
            Anterior
          </button>
        )}
        <button
          type="button"
          className="boton"
          onClick={() =>
            despachar({ tipo: estado.editando ? 'terminar-edicion' : 'siguiente' })
          }
          disabled={!respondido}
        >
          {estado.editando ? 'Guardar y volver a la revisión' : etiquetaSiguiente}
        </button>
      </div>

      <p className="atajos">
        Atajos de teclado: <kbd>1</kbd>–<kbd>5</kbd> escala · <kbd>0</kbd> sin opinión ·{' '}
        <kbd>←</kbd> <kbd>→</kbd> navegar
      </p>

      <p className="solo-lectores" role="status">
        {anuncio}
      </p>
    </div>
  );
}
