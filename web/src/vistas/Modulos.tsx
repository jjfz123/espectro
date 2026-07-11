import { useMemo, useState } from 'react';
import type { Respuesta } from '@engine';
import { calcularEjes, modulosDesbloqueados } from '@engine';
import {
  EJES,
  ITEMS,
  ITEMS_NUCLEO,
  ITEMS_POR_MODULO,
  MODULOS,
  itemVisible,
  respuestasDeSecuenciaActiva,
} from '../datos';
import type { Accion, Estado } from '../estado';

interface Props {
  estado: Estado;
  despachar: (accion: Accion) => void;
}

export function Modulos({ estado, despachar }: Props) {
  // Misma fuente de verdad que Resultados: solo la secuencia activa alimenta
  // la sugerencia. Respuestas de módulos desactivados quedan guardadas pero
  // no reintroducen su señal por esta pantalla.
  const respuestas: Respuesta[] = useMemo(
    () =>
      respuestasDeSecuenciaActiva(estado.modulosActivos, estado.respuestas, estado.importantes),
    [estado.modulosActivos, estado.respuestas, estado.importantes],
  );

  const desbloqueados = useMemo(() => {
    const ejesUsuario = calcularEjes(respuestas, ITEMS, EJES);
    return new Set(
      modulosDesbloqueados(MODULOS, ejesUsuario, {
        ccaa: estado.ccaa || undefined,
      }).filter((id) => id !== 'nucleo'),
    );
  }, [respuestas, estado.ccaa]);

  const completados = useMemo(() => {
    const listo = new Set<string>();
    for (const m of MODULOS) {
      if (m.id === 'nucleo') continue;
      const items = (ITEMS_POR_MODULO.get(m.id) ?? []).filter((item) =>
        itemVisible(item, estado.respuestas),
      );
      if (items.length > 0 && items.every((i) => i.id in estado.respuestas)) listo.add(m.id);
    }
    return listo;
  }, [estado.respuestas]);

  const [seleccion, setSeleccion] = useState<Set<string>>(() => {
    const base =
      estado.modulosActivos.length > 0 ? new Set(estado.modulosActivos) : new Set(desbloqueados);
    for (const id of completados) base.add(id);
    return base;
  });
  const [personalizando, setPersonalizando] = useState(estado.modulosActivos.length > 0);

  const alternar = (id: string) => {
    setSeleccion((previa) => {
      const nueva = new Set(previa);
      if (nueva.has(id)) nueva.delete(id);
      else nueva.add(id);
      return nueva;
    });
  };

  const pendientes = [...seleccion].reduce((suma, id) => {
    const items = (ITEMS_POR_MODULO.get(id) ?? []).filter((item) =>
      itemVisible(item, estado.respuestas),
    );
    return suma + items.filter((i) => !(i.id in estado.respuestas)).length;
  }, 0);

  const condicionalesPotenciales = [...seleccion].reduce((suma, id) => {
    const items = ITEMS_POR_MODULO.get(id) ?? [];
    return (
      suma +
      items.filter(
        (item) =>
          item.condicion &&
          !itemVisible(item, estado.respuestas) &&
          !(item.id in estado.respuestas),
      ).length
    );
  }, 0);

  const listaModulos = MODULOS.filter((m) => m.id !== 'nucleo');

  const abrirPersonalizacion = () => {
    // Al abrir la selección manual no conservamos las sugerencias automáticas:
    // ver qué casillas recomendó el algoritmo revelaría la posición calculada.
    setSeleccion(new Set([...estado.modulosActivos, ...completados]));
    setPersonalizando(true);
  };

  const fila = (id: string) => {
    const modulo = MODULOS.find((m) => m.id === id);
    if (!modulo) return null;
    const items = ITEMS_POR_MODULO.get(id) ?? [];
    const completado = completados.has(id);
    return (
      <li key={id}>
        <label className="modulo-fila">
          <input
            type="checkbox"
            checked={seleccion.has(id)}
            disabled={completado}
            onChange={() => alternar(id)}
          />
          <span>
            <span className="modulo-nombre">{modulo.nombre}</span>{' '}
            {completado ? <span className="modulo-completado">completado</span> : null}
            <span className="modulo-desc">{modulo.descripcion}</span>
          </span>
          <span className="modulo-carga">
            hasta {items.length} preguntas · ≈ {Math.max(1, Math.ceil(items.length / 3))} min
          </span>
        </label>
      </li>
    );
  };

  return (
    <div className="contenedor">
      <p className="kicker">Modo exhaustivo</p>
      <h1 className="titular" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.4rem)' }}>
        Profundización personalizada
      </h1>
      <p className="entradilla" style={{ fontSize: '1.05rem' }}>
        Tus {ITEMS_NUCLEO.length} respuestas generales quedan guardadas. Hemos preparado una
        continuación según tus respuestas y tu ámbito; solo añadiremos preguntas nuevas. No
        mostramos qué áreas la activaron para no darte pistas sobre el resultado antes de
        terminar. Puedes aceptar la selección ciega o elegir temas manualmente.
      </p>

      {personalizando ? (
        <section className="seccion" style={{ marginTop: '1.75rem' }}>
          <h2>Elegir temas manualmente</h2>
          <p className="nota-al-margen">
            Esta lista no señala qué temas había sugerido el cálculo. Selecciona solo los que
            quieras explorar; los ya completados permanecen activos.
          </p>
          <ul className="lista-modulos">{listaModulos.map((m) => fila(m.id))}</ul>
        </section>
      ) : (
        <div className="seleccion-ciega" role="status">
          <strong>{pendientes} preguntas de profundización</strong>
          <span>
            Duración estimada: {Math.max(1, Math.ceil(pendientes / 3))}
            {condicionalesPotenciales > 0
              ? `–${Math.ceil((pendientes + condicionalesPotenciales) / 3)}`
              : ''}{' '}
            minutos. Algunas subpreguntas solo aparecen cuando ayudan a aclarar una respuesta.
            Las categorías permanecerán ocultas durante el cuestionario.
          </span>
        </div>
      )}

      <div className="acciones">
        <button
          type="button"
          className="boton"
          onClick={() => despachar({ tipo: 'confirmar-modulos', seleccion: [...seleccion] })}
        >
          {pendientes > 0
            ? `Continuar: ${pendientes} preguntas`
            : 'Ver resultados'}
        </button>
        {!personalizando ? (
          <button type="button" className="boton boton--secundario" onClick={abrirPersonalizacion}>
            Elegir temas manualmente
          </button>
        ) : null}
        {pendientes > 0 ? (
          <button
            type="button"
            className="boton boton--terciario"
            onClick={() => despachar({ tipo: 'ir-a-resultados' })}
          >
            Saltar a los resultados sin profundizar
          </button>
        ) : null}
      </div>
    </div>
  );
}
