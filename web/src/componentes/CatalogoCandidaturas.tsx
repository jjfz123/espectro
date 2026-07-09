import type { CandidaturaElectoral, ConvocatoriaElectoral, Partido } from '@engine';

interface Props {
  convocatoria: ConvocatoriaElectoral;
  candidaturas: CandidaturaElectoral[];
  partidos: ReadonlyMap<string, Partido>;
}

const ETIQUETAS_RELACION = {
  'misma-organizacion': 'perfil de la misma organización',
  'organizacion-territorial': 'organización territorial del perfil',
  coalicion: 'perfil propio de la coalición',
  componente: 'componente de la candidatura',
  sucesora: 'organización sucesora',
} as const;

const ETIQUETAS_INCLUSION = {
  umbral: 'supera el umbral',
  'historica-activa': 'excepción histórica activa',
  'comunista-activa': 'excepción comunista activa',
} as const;

export function CatalogoCandidaturas({ convocatoria, candidaturas, partidos }: Props) {
  return (
    <details className="catalogo-candidaturas">
      <summary>
        Ver las {candidaturas.length} candidaturas incluidas y su cobertura documental
      </summary>
      <div className="catalogo-candidaturas__cuerpo">
        <p className="nota-al-margen">
          La lista reproduce el universo incluido de esta convocatoria. Enlazar un componente
          identifica quién formó la candidatura, pero no atribuye su programa a toda la coalición.
          «Pendiente de perfil» significa que conservamos el resultado oficial sin inventar
          posiciones ideológicas.
        </p>
        <ol className="catalogo-candidaturas__lista">
          {candidaturas.map((candidatura) => {
            const relacionesDisponibles = candidatura.perfilRelaciones.filter((relacion) =>
              partidos.has(relacion.perfilId),
            );
            return (
              <li key={candidatura.id} className="catalogo-candidaturas__fila">
                <div className="catalogo-candidaturas__cabecera">
                  <strong>{candidatura.nombre}</strong>
                  <span>
                    {candidatura.porcentaje.toLocaleString('es-ES', {
                      maximumFractionDigits: 3,
                    })}{' '}
                    % · {candidatura.votos.toLocaleString('es-ES')} votos
                  </span>
                </div>
                <p className="catalogo-candidaturas__estado">
                  {ETIQUETAS_INCLUSION[candidatura.motivoInclusion]}
                  {candidatura.circunscripciones?.length
                    ? ` · ${candidatura.circunscripciones.join(', ')}`
                    : ' · conjunto de la convocatoria'}
                </p>
                {relacionesDisponibles.length > 0 ? (
                  <ul className="catalogo-candidaturas__perfiles">
                    {relacionesDisponibles.map((relacion) => {
                      const perfil = partidos.get(relacion.perfilId);
                      if (!perfil) return null;
                      return (
                        <li key={`${candidatura.id}-${relacion.perfilId}`}>
                          {perfil.nombre}: {ETIQUETAS_RELACION[relacion.relacion]}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="catalogo-candidaturas__pendiente">
                    Inventariada; pendiente de perfil doctrinal suficiente para compararla.
                  </p>
                )}
                {candidatura.variantesPapeleta ? (
                  <details className="catalogo-candidaturas__variantes">
                    <summary>Denominaciones por circunscripción</summary>
                    <ul>
                      {Object.entries(candidatura.variantesPapeleta).map(
                        ([circunscripcion, nombre]) => (
                          <li key={circunscripcion}>
                            <strong>{circunscripcion}:</strong> {nombre}
                          </li>
                        ),
                      )}
                    </ul>
                  </details>
                ) : null}
              </li>
            );
          })}
        </ol>
        <p className="nota-al-margen">
          Fuente:{' '}
          <a href={convocatoria.fuente.url} target="_blank" rel="noopener noreferrer">
            {convocatoria.fuente.titulo}
          </a>
          . Consultada el {convocatoria.fuente.consultado}.
        </p>
      </div>
    </details>
  );
}
