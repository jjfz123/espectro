import { useMemo, useState } from 'react';
import type { Desbloqueo, Respuesta } from '@engine';
import { calcularEjes, modulosDesbloqueados } from '@engine';
import {
  EJES,
  ITEMS,
  ITEMS_POR_MODULO,
  MODULOS,
  nombreComunidad,
} from '../datos';
import type { Accion, Estado } from '../estado';

interface Props {
  estado: Estado;
  despachar: (accion: Accion) => void;
}

function motivoDesbloqueo(desbloqueo: Desbloqueo, ccaa: string): string {
  if (desbloqueo.tipo === 'ccaa') {
    const nombre = nombreComunidad(ccaa);
    return nombre ? `Desbloqueado por tu comunidad: ${nombre}` : 'Desbloqueado por tu comunidad';
  }
  if (desbloqueo.tipo === 'eje' || desbloqueo.tipo === 'eje-banda') {
    const eje = EJES.find((e) => e.id === desbloqueo.eje);
    return eje
      ? `Desbloqueado por tu posición en «${eje.nombre}»`
      : 'Desbloqueado por tu posición';
  }
  return 'Disponible';
}

export function Modulos({ estado, despachar }: Props) {
  const respuestas: Respuesta[] = useMemo(
    () =>
      Object.entries(estado.respuestas).map(([itemId, valor]) => ({
        itemId,
        valor,
        importante: Boolean(estado.importantes[itemId]),
      })),
    [estado.respuestas, estado.importantes],
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
      const items = ITEMS_POR_MODULO.get(m.id) ?? [];
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

  const alternar = (id: string) => {
    setSeleccion((previa) => {
      const nueva = new Set(previa);
      if (nueva.has(id)) nueva.delete(id);
      else nueva.add(id);
      return nueva;
    });
  };

  const pendientes = [...seleccion].reduce((suma, id) => {
    const items = ITEMS_POR_MODULO.get(id) ?? [];
    return suma + items.filter((i) => !(i.id in estado.respuestas)).length;
  }, 0);

  const listaDesbloqueados = MODULOS.filter((m) => m.id !== 'nucleo' && desbloqueados.has(m.id));
  const listaRestantes = MODULOS.filter((m) => m.id !== 'nucleo' && !desbloqueados.has(m.id));

  const fila = (id: string, desbloqueado: boolean) => {
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
            {desbloqueado && !completado ? (
              <span className="modulo-motivo">{motivoDesbloqueo(modulo.desbloqueo, estado.ccaa)}</span>
            ) : null}
            <span className="modulo-desc">{modulo.descripcion}</span>
          </span>
          <span className="modulo-carga">
            {items.length} ítems · ≈ {items.length} min
          </span>
        </label>
      </li>
    );
  };

  return (
    <div className="contenedor">
      <p className="kicker">Núcleo completado</p>
      <h1 className="titular" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.4rem)' }}>
        Módulos de profundización
      </h1>
      <p className="entradilla" style={{ fontSize: '1.05rem' }}>
        Según tus respuestas al núcleo, estos módulos afinan tu zona del espectro. Todos los
        demás también pueden activarse: el interés no depende de la posición. Cuenta con que
        cada ítem lleva alrededor de un minuto.
      </p>

      <section className="seccion" style={{ marginTop: '1.75rem' }}>
        <h2>Desbloqueados por tus respuestas</h2>
        {listaDesbloqueados.length > 0 ? (
          <ul className="lista-modulos">{listaDesbloqueados.map((m) => fila(m.id, true))}</ul>
        ) : (
          <p className="nota-al-margen">
            Ninguno: tus posiciones no cruzan los umbrales de desbloqueo automático. Puedes
            activar abajo los módulos que te interesen.
          </p>
        )}
      </section>

      <section className="seccion">
        <h2>El resto del banco</h2>
        <p className="nota-al-margen">
          Activables a mano. Los módulos territoriales de comunidades distintas de la tuya
          también están aquí.
        </p>
        <ul className="lista-modulos">{listaRestantes.map((m) => fila(m.id, false))}</ul>
      </section>

      <div className="acciones">
        <button
          type="button"
          className="boton"
          onClick={() => despachar({ tipo: 'confirmar-modulos', seleccion: [...seleccion] })}
        >
          {pendientes > 0
            ? `Continuar: ${pendientes} ítems (≈ ${pendientes} min)`
            : 'Ver resultados'}
        </button>
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
