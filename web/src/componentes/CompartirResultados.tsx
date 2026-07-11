import { useEffect, useMemo, useRef, useState } from 'react';
import {
  generarCapturaResultado,
  numeroPaginasFacetas,
  type EtiquetasParaCaptura,
  type TipoCapturaResultado,
} from '../capturaResultado';
import {
  crearFragmentoResultadoCompartido,
  type ListasPermitidasResultado,
} from '../resultadoCompartido';
import {
  crearSnapshotResultadoCompartido,
  type DatosParaResultadoCompartido,
} from '../compartirResultados';

interface Props {
  datos: DatosParaResultadoCompartido;
  etiquetas: EtiquetasParaCaptura;
  permitidos: ListasPermitidasResultado;
}

type EstadoAccion =
  | { tipo: 'reposo'; mensaje: '' }
  | { tipo: 'ocupado'; mensaje: string }
  | { tipo: 'exito' | 'error'; mensaje: string };

type MetodoCopia = 'clipboard-api' | 'seleccion-legacy';

function enlaceConFragmento(fragmento: string): string {
  const url = new URL(window.location.href);
  url.search = '';
  url.hash = fragmento.slice(1);
  return url.toString();
}

async function copiarTexto(texto: string): Promise<MetodoCopia> {
  try {
    const portapapeles = navigator.clipboard;
    if (typeof portapapeles?.writeText === 'function') {
      await portapapeles.writeText(texto);
      return 'clipboard-api';
    }
  } catch {
    // Un permiso denegado no debe terminar como un rechazo sin capturar: aún
    // podemos intentar la vía compatible de selección durante el mismo gesto.
  }

  // Safari antiguo, WebViews y contextos HTTP pueden no exponer Clipboard API.
  // El textarea solo vive durante este gesto y nunca queda visible en el DOM.
  const focoAnterior =
    document.activeElement instanceof HTMLElement && document.activeElement !== document.body
      ? document.activeElement
      : null;
  const campo = document.createElement('textarea');
  campo.value = texto;
  campo.readOnly = true;
  campo.setAttribute('aria-hidden', 'true');
  campo.style.position = 'fixed';
  campo.style.opacity = '0';
  document.body.append(campo);
  campo.select();
  let copiado = false;
  try {
    try {
      copiado = typeof document.execCommand === 'function' && document.execCommand('copy') === true;
    } catch {
      copiado = false;
    }
  } finally {
    campo.remove();
    if (focoAnterior?.isConnected) focoAnterior.focus({ preventScroll: true });
  }
  if (!copiado) {
    throw new Error(
      'El navegador no ha permitido copiar el enlace. Puedes compartir una tarjeta PNG en su lugar.',
    );
  }
  return 'seleccion-legacy';
}

function descargarBlob(blob: Blob, nombre: string): void {
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = nombre;
  enlace.style.display = 'none';
  document.body.append(enlace);
  enlace.click();
  enlace.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}

function nombreCaptura(tipo: TipoCapturaResultado, pagina?: number): string {
  return tipo === 'facetas'
    ? `espectro-facetas-${(pagina ?? 0) + 1}.png`
    : `espectro-${tipo}.png`;
}

function mensajeError(error: unknown): string {
  return error instanceof Error
    ? error.message
    : 'No se ha podido completar la acción en este navegador.';
}

function esCancelacionDeUsuario(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    (error as { name?: unknown }).name === 'AbortError'
  );
}

function mensajeCopiaExitosa(metodo: MetodoCopia): string {
  return metodo === 'clipboard-api'
    ? 'Enlace copiado. Ya puedes pegarlo donde quieras.'
    : 'Enlace copiado mediante el modo de compatibilidad del navegador.';
}

export function CompartirResultados({ datos, etiquetas, permitidos }: Props) {
  const [estado, setEstado] = useState<EstadoAccion>({ tipo: 'reposo', mensaje: '' });
  const focoPendiente = useRef<HTMLElement | null>(null);
  const resultado = useMemo(() => crearSnapshotResultadoCompartido(datos), [datos]);
  const fragmento = useMemo(
    () => crearFragmentoResultadoCompartido(resultado, permitidos),
    [resultado, permitidos],
  );
  const ocupado = estado.tipo === 'ocupado';

  useEffect(() => {
    if (estado.tipo === 'ocupado') return;
    const disparador = focoPendiente.current;
    focoPendiente.current = null;
    if (disparador?.isConnected && !disparador.matches(':disabled')) {
      disparador.focus({ preventScroll: true });
    }
  }, [estado.tipo]);

  const ejecutar = async (mensaje: string, accion: () => Promise<string>) => {
    const disparador =
      document.activeElement instanceof HTMLElement && document.activeElement !== document.body
        ? document.activeElement
        : null;
    focoPendiente.current = disparador;
    setEstado({ tipo: 'ocupado', mensaje });
    try {
      setEstado({ tipo: 'exito', mensaje: await accion() });
    } catch (error) {
      if (esCancelacionDeUsuario(error)) {
        setEstado({ tipo: 'reposo', mensaje: '' });
        return;
      }
      setEstado({ tipo: 'error', mensaje: mensajeError(error) });
    }
  };

  const compartirEnlace = () =>
    ejecutar('Preparando el enlace…', async () => {
      const enlace = enlaceConFragmento(fragmento);
      if (typeof navigator.share === 'function') {
        try {
          await navigator.share({
            title: 'Resultado de Espectro',
            text: 'Un perfil político calculado localmente con Espectro.',
            url: enlace,
          });
          return 'Se ha abierto el menú para compartir el enlace.';
        } catch (error) {
          if (esCancelacionDeUsuario(error)) throw error;
          const metodo = await copiarTexto(enlace);
          return `No se ha podido abrir el menú de compartir. ${mensajeCopiaExitosa(metodo)}`;
        }
      }
      const metodo = await copiarTexto(enlace);
      return `Este navegador no ofrece el menú de compartir. ${mensajeCopiaExitosa(metodo)}`;
    });

  const copiarEnlace = () =>
    ejecutar('Copiando el enlace…', async () => {
      const metodo = await copiarTexto(enlaceConFragmento(fragmento));
      return mensajeCopiaExitosa(metodo);
    });

  const descargarTarjeta = (tipo: TipoCapturaResultado, pagina?: number) =>
    ejecutar('Generando la tarjeta en este dispositivo…', async () => {
      const blob = await generarCapturaResultado(resultado, etiquetas, {
        tipo,
        paginaFacetas: pagina,
      });
      descargarBlob(blob, nombreCaptura(tipo, pagina));
      return 'Se ha descargado una tarjeta PNG.';
    });

  const compartirImagen = () =>
    ejecutar('Generando la imagen en este dispositivo…', async () => {
      const blob = await generarCapturaResultado(resultado, etiquetas, { tipo: 'resumen' });
      if (typeof File !== 'function') {
        descargarBlob(blob, 'espectro-resumen.png');
        return 'Este navegador no comparte archivos directamente; hemos descargado la imagen.';
      }
      let archivo: File;
      try {
        archivo = new File([blob], 'espectro-resumen.png', { type: 'image/png' });
      } catch {
        descargarBlob(blob, 'espectro-resumen.png');
        return 'Este navegador no puede preparar archivos compartibles; hemos descargado la imagen.';
      }
      const datosParaCompartir = { files: [archivo], title: 'Resultado de Espectro' };
      let admiteArchivo = false;
      try {
        admiteArchivo =
          typeof navigator.share === 'function' &&
          typeof navigator.canShare === 'function' &&
          navigator.canShare(datosParaCompartir);
      } catch {
        admiteArchivo = false;
      }
      if (admiteArchivo) {
        try {
          await navigator.share(datosParaCompartir);
          return 'Se ha abierto el menú para compartir la imagen.';
        } catch (error) {
          if (esCancelacionDeUsuario(error)) throw error;
          descargarBlob(blob, archivo.name);
          return 'No se ha podido abrir el menú de compartir; hemos descargado la imagen.';
        }
      }
      descargarBlob(blob, archivo.name);
      return 'Este navegador no comparte archivos directamente; hemos descargado la imagen.';
    });

  return (
    <section className="seccion compartir-resultados" aria-labelledby="compartir-resultados-titulo">
      <p className="kicker">Compartir y guardar</p>
      <h2 id="compartir-resultados-titulo">Lleva contigo este resultado</h2>
      <p className="compartir-resultados__privacidad">
        <strong>El enlace revela un resumen de tu perfil político y tus cinco mayores afinidades.</strong>{' '}
        Cualquiera que lo tenga podrá leerlo. No incluye respuestas, prioridades, explicaciones por
        ítem ni texto libre; no caduca, no se puede revocar y no está firmado ni acredita identidad.
      </p>
      <div className="compartir-resultados__acciones" aria-label="Opciones para compartir resultados">
        <button type="button" className="boton" disabled={ocupado} onClick={compartirEnlace}>
          Compartir enlace
        </button>
        <button
          type="button"
          className="boton boton--secundario"
          disabled={ocupado}
          onClick={copiarEnlace}
        >
          Copiar enlace
        </button>
        <button
          type="button"
          className="boton boton--secundario"
          disabled={ocupado}
          onClick={compartirImagen}
        >
          Compartir imagen
        </button>
      </div>
      <details className="compartir-resultados__descargas">
        <summary>Descargar tarjetas PNG una a una</summary>
        <p className="nota-al-margen">
          Una descarga por pulsación evita que Safari o Chrome bloqueen el resto de archivos.
        </p>
        <div className="compartir-resultados__descargas-lista">
          <button
            type="button"
            className="boton boton--secundario"
            disabled={ocupado}
            onClick={() => descargarTarjeta('resumen')}
          >
            Descargar resumen
          </button>
          <button
            type="button"
            className="boton boton--secundario"
            disabled={ocupado}
            onClick={() => descargarTarjeta('brujula')}
          >
            Descargar brújula
          </button>
          <button
            type="button"
            className="boton boton--secundario"
            disabled={ocupado}
            onClick={() => descargarTarjeta('afinidades')}
          >
            Descargar afinidades
          </button>
          {Array.from(
            { length: numeroPaginasFacetas(resultado.f.length) },
            (_, pagina) => (
              <button
                type="button"
                className="boton boton--secundario"
                disabled={ocupado}
                onClick={() => descargarTarjeta('facetas', pagina)}
                key={pagina}
              >
                Descargar facetas {pagina + 1} de {numeroPaginasFacetas(resultado.f.length)}
              </button>
            ),
          )}
        </div>
      </details>
      <p
        className={`compartir-resultados__estado${estado.tipo === 'error' ? ' compartir-resultados__estado--error' : ''}`}
        role={estado.tipo === 'error' ? 'alert' : 'status'}
        aria-live="polite"
      >
        {estado.mensaje}
      </p>
      <p className="nota-al-margen">
        Las imágenes usan una composición fija, sin cargar recursos externos ni añadir etiquetas
        ideológicas sensibles. Puedes descargar resumen, brújula, afinidades y facetas paginadas.
      </p>
    </section>
  );
}
