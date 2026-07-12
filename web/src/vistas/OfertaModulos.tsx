import { useEffect, useMemo } from 'react';
import { ITEMS_POR_MODULO, itemVisible } from '../datos';
import {
  modulosRecienDesbloqueados,
  type Accion,
  type Estado,
} from '../estado';

interface Props {
  estado: Estado;
  despachar: (accion: Accion) => void;
}

/**
 * Oferta ciega en vuelo: las respuestas acumuladas han desbloqueado bloques de
 * profundización que no estaban activos. No se nombra ningún área ni tema —la
 * misma regla anti-pistas de la pantalla de módulos— y la decisión nunca borra
 * respuestas ni desactiva bloques ya elegidos.
 */
export function OfertaModulos({ estado, despachar }: Props) {
  const nuevos = useMemo(() => modulosRecienDesbloqueados(estado), [estado]);

  const preguntasNuevas = useMemo(
    () =>
      nuevos.reduce((suma, id) => {
        const items = (ITEMS_POR_MODULO.get(id) ?? []).filter(
          (item) => itemVisible(item, estado.respuestas) && !(item.id in estado.respuestas),
        );
        return suma + items.length;
      }, 0),
    [nuevos, estado.respuestas],
  );

  // Guardia: si no queda nada que ofrecer (p. ej. estado restaurado a destiempo),
  // se continúa por el camino canónico sin mostrar una pantalla vacía.
  useEffect(() => {
    if (nuevos.length === 0) despachar({ tipo: 'rechazar-oferta-modulos' });
  }, [nuevos.length, despachar]);
  if (nuevos.length === 0) return null;

  return (
    <div className="contenedor fin-rapido" aria-labelledby="oferta-modulos-titulo">
      <p className="kicker">Modo exhaustivo</p>
      <h1
        id="oferta-modulos-titulo"
        className="titular"
        style={{ fontSize: 'clamp(1.9rem, 4.8vw, 2.6rem)' }}
      >
        Tus respuestas abren {nuevos.length === 1 ? 'un bloque nuevo' : `${nuevos.length} bloques nuevos`}
      </h1>
      <p className="entradilla" style={{ fontSize: '1.08rem' }}>
        Según lo que llevas respondido, hay {nuevos.length === 1 ? 'un bloque' : 'bloques'} de
        profundización que ahora encaja{nuevos.length === 1 ? '' : 'n'} con tu recorrido
        {preguntasNuevas > 0 ? ` (hasta ${preguntasNuevas} preguntas más, ≈ ${Math.max(1, Math.ceil(preguntasNuevas / 3))} min)` : ''}.
        Para no darte pistas sobre el resultado, no te decimos cuáles son ni qué respuestas los
        activaron. Nada de lo ya respondido se pierde decidas lo que decidas.
      </p>

      <div className="acciones fin-rapido-acciones" aria-label="Elige cómo continuar">
        <button
          type="button"
          className="boton"
          onClick={() => despachar({ tipo: 'aceptar-oferta-modulos' })}
        >
          Añadirlos y seguir
        </button>
        <button
          type="button"
          className="boton boton--secundario"
          onClick={() => despachar({ tipo: 'rechazar-oferta-modulos' })}
        >
          Seguir sin añadirlos
        </button>
      </div>
      <p className="nota-al-margen" style={{ marginTop: '1rem' }}>
        Podrás activar o quitar temas a mano cuando quieras desde «Elegir temas manualmente»; esta
        decisión no cierra nada.
      </p>
    </div>
  );
}
