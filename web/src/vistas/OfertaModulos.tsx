import { useEffect, useMemo } from 'react';
import { ITEMS_POR_MODULO, itemVisible } from '../datos';
import {
  ofertaVigente,
  type Accion,
  type Estado,
} from '../estado';

/**
 * Oferta ciega en vuelo: las respuestas acumuladas han desbloqueado bloques de
 * profundización que no estaban activos. No se nombra ningún área ni tema y
 * TAMPOCO se muestran recuentos exactos de bloques o preguntas: con un banco
 * asimétrico, el número exacto delataría hacia dónde apunta el perfil
 * (revisión adversarial). Solo se comunica un orden de magnitud de duración
 * con tres tramos fijos. La decisión nunca borra respuestas ni desactiva
 * bloques ya elegidos.
 */
export function OfertaModulos({ estado, despachar }: {
  estado: Estado;
  despachar: (accion: Accion) => void;
}) {
  const nuevos = useMemo(() => ofertaVigente(estado), [estado]);

  const tramoDuracion = useMemo(() => {
    const preguntas = nuevos.reduce((suma, id) => {
      const items = (ITEMS_POR_MODULO.get(id) ?? []).filter(
        (item) => itemVisible(item, estado.respuestas) && !(item.id in estado.respuestas),
      );
      return suma + items.length;
    }, 0);
    const minutos = Math.max(1, Math.ceil(preguntas / 3));
    if (minutos < 10) return 'menos de diez minutos más';
    if (minutos <= 30) return 'entre diez y treinta minutos más';
    return 'más de media hora adicional';
  }, [nuevos, estado.respuestas]);

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
        Tus respuestas abren bloques nuevos
      </h1>
      <p className="entradilla" style={{ fontSize: '1.08rem' }}>
        Según lo que llevas respondido, hay profundización adicional que ahora encaja con tu
        recorrido (aproximadamente {tramoDuracion}). Para no darte pistas sobre el resultado, no
        te decimos cuáles son los bloques, cuántos son ni qué respuestas los activaron. Nada de
        lo ya respondido se pierde decidas lo que decidas.
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
