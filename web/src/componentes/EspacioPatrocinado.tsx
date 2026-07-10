/**
 * Hueco publicitario autoservido y estático (docs/PRIVACIDAD.md, «Publicidad»).
 *
 * El contenido viaja dentro del build y se renderiza como texto plano: cero
 * scripts de terceros, cero cookies y cero peticiones de red. Las respuestas
 * del usuario revelan su ideología (art. 9 RGPD); cualquier red publicitaria
 * con tracking comprometería el diseño 100 % client-side, así que queda
 * prohibida por diseño. Para activar el bloque, editar esta constante.
 */
export interface ContenidoPatrocinado {
  /** Desactivado por defecto: sin patrocinador no se muestra nada. */
  activo: boolean;
  titulo: string;
  texto: string;
  /** Enlace opcional, siempre estático y marcado rel="sponsored". */
  url?: string;
  etiquetaEnlace?: string;
}

export const ESPACIO_PATROCINADO: ContenidoPatrocinado = {
  activo: false,
  titulo: 'Este espacio admite un patrocinio editorial',
  texto:
    'Un mensaje estático aprobado por el equipo, servido con la propia página: sin rastreadores, sin cookies y sin peticiones de red.',
  url: 'https://github.com/jjfz123/espectro',
  etiquetaEnlace: 'Cómo patrocinar el proyecto',
};

export function EspacioPatrocinado() {
  if (!ESPACIO_PATROCINADO.activo) return null;
  return (
    <aside className="espacio-patrocinado" aria-label="Espacio patrocinado">
      <p className="kicker">Espacio patrocinado</p>
      <p className="espacio-patrocinado__titulo">{ESPACIO_PATROCINADO.titulo}</p>
      <p className="espacio-patrocinado__texto">{ESPACIO_PATROCINADO.texto}</p>
      {ESPACIO_PATROCINADO.url ? (
        <a
          href={ESPACIO_PATROCINADO.url}
          rel="noopener noreferrer nofollow sponsored"
          target="_blank"
        >
          {ESPACIO_PATROCINADO.etiquetaEnlace ?? ESPACIO_PATROCINADO.url}
        </a>
      ) : null}
      <p className="espacio-patrocinado__nota">
        Anuncio autoservido y estático: sin scripts de terceros, sin cookies y sin rastreo. No
        influye en el cálculo ni en el orden de los resultados.
      </p>
    </aside>
  );
}
