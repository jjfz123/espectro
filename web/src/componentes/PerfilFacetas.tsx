import { useId, useMemo, useState, type CSSProperties } from 'react';
import type { Eje, ResultadoFaceta } from '@engine';
import { formatearEje, formatearNumero } from '../datos';

interface Props {
  ejes: Eje[];
  facetas: ResultadoFaceta[];
}

interface Dominio {
  id: string;
  nombre: string;
  descripcion: string;
  facetas: string[];
}

/** Los dominios ordenan la lectura: nunca reciben una puntuación agregada. */
const DOMINIOS: Dominio[] = [
  {
    id: 'economia-trabajo',
    nombre: 'Economía, Estado y trabajo',
    descripcion: 'Propiedad y mercado, dirección estatal y capacidad colectiva en el trabajo.',
    facetas: ['economico', 'estatismo', 'poder-laboral', 'autonomia-sindical'],
  },
  {
    id: 'democracia-instituciones',
    nombre: 'Democracia e instituciones',
    descripcion: 'Pluralismo, forma de decisión, mediación política y jefatura del Estado.',
    facetas: [
      'institucionalismo',
      'democracia-directa',
      'pluralismo-institucional',
      'libertades-civiles',
      'populismo',
      'monarquia',
    ],
  },
  {
    id: 'sociedad-convivencia',
    nombre: 'Sociedad, moral y convivencia',
    descripcion: 'Costumbres, relación entre religión y Estado, conciencia y consideración animal.',
    facetas: ['social', 'tradicion-moral', 'laicismo', 'libertad-conciencia', 'animalismo'],
  },
  {
    id: 'territorio-cooperacion',
    nombre: 'Territorio y soberanía compartida',
    descripcion: 'Distribución territorial del poder, integración europea e internacionalismo.',
    facetas: ['territorial', 'modelo-territorial', 'ue', 'internacionalismo'],
  },
  {
    id: 'ecologia-energia',
    nombre: 'Ecología y energía',
    descripcion: 'Prioridad ambiental y posición específica sobre energía nuclear civil.',
    facetas: ['ecologia', 'energia-nuclear'],
  },
  {
    id: 'mundo-defensa',
    nombre: 'Mundo, paz y defensa',
    descripcion: 'Alianzas, intervención, armas nucleares y grado de implicación internacional.',
    facetas: ['atlantismo', 'uso-fuerza', 'armas-nucleares', 'implicacion-internacional'],
  },
  {
    id: 'cambio-organizacion',
    nombre: 'Cambio y organización política',
    descripcion: 'Método de transformación y reparto interno del poder en organizaciones.',
    facetas: ['metodo-cambio', 'organizacion'],
  },
];

type EstiloBarra = CSSProperties & {
  '--posicion': string;
  '--inicio': string;
  '--longitud': string;
};

export function PerfilFacetas({ ejes, facetas }: Props) {
  const idBase = useId();
  const facetaPorId = useMemo(
    () => new Map(facetas.map((faceta) => [faceta.facetaId, faceta])),
    [facetas],
  );
  const ejePorId = useMemo(() => new Map(ejes.map((eje) => [eje.id, eje])), [ejes]);

  const dominios = useMemo(() => {
    const asignadas = new Set(DOMINIOS.flatMap((dominio) => dominio.facetas));
    const otras = ejes.filter((eje) => !asignadas.has(eje.id)).map((eje) => eje.id);
    return otras.length > 0
      ? [
          ...DOMINIOS,
          {
            id: 'otras',
            nombre: 'Otras facetas',
            descripcion: 'Facetas nuevas aún no asignadas a un dominio de navegación.',
            facetas: otras,
          },
        ]
      : DOMINIOS;
  }, [ejes]);

  const conPosicion = facetas.filter((faceta) => faceta.valor !== null).length;
  const conCobertura = facetas.filter((faceta) => faceta.coberturaSuficiente).length;

  return (
    <div className="perfil-facetas">
      <div className="perfil-resumen" aria-label="Resumen de cobertura del perfil">
        <p>
          <strong>{conPosicion} de {ejes.length}</strong>
          <span> facetas con posición</span>
        </p>
        <p>
          <strong>{conCobertura}</strong>
          <span> con evidencia suficiente</span>
        </p>
      </div>

      <p className="perfil-clave">
        Cada fila es independiente. Los dominios solo ordenan la lectura y no se promedian.
        Marcar una pregunta como importante influye en la afinidad con organizaciones, no en
        tu posición personal. «Evidencia suficiente» exige al menos tres preguntas con opinión
        y la mitad de la carga disponible en este recorrido.
      </p>

      <div className="perfil-dominios">
        {dominios.map((dominio) => {
          const filas = dominio.facetas.flatMap((id) => {
            const eje = ejePorId.get(id);
            const faceta = facetaPorId.get(id);
            return eje && faceta ? [{ eje, faceta }] : [];
          });
          if (filas.length === 0) return null;
          const medidas = filas.filter(({ faceta }) => faceta.valor !== null).length;
          const tituloId = `${idBase}-${dominio.id}`;

          return (
            <section className="perfil-dominio" aria-labelledby={tituloId} key={dominio.id}>
              <header className="perfil-dominio-cabecera">
                <div>
                  <h3 id={tituloId}>{dominio.nombre}</h3>
                  <p>{dominio.descripcion}</p>
                </div>
                <span>{medidas}/{filas.length} con datos</span>
              </header>
              <div className="perfil-dominio-filas">
                {filas.map(({ eje, faceta }) => (
                  <FilaFaceta eje={eje} faceta={faceta} key={eje.id} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <ExploradorFacetas ejes={ejes} facetas={facetas} />
    </div>
  );
}

function FilaFaceta({ eje, faceta }: { eje: Eje; faceta: ResultadoFaceta }) {
  const conDato = faceta.valor !== null;
  const valor = faceta.valor ?? 0;
  const posicion = conDato ? (valor + 100) / 2 : 50;
  const inicio = Math.min(50, posicion);
  const longitud = Math.abs(posicion - 50);
  const estilo = {
    '--posicion': `${posicion}%`,
    '--inicio': `${inicio}%`,
    '--longitud': `${longitud}%`,
  } as EstiloBarra;
  const estado = textoEvidencia(faceta);
  const valorTexto = conDato ? formatearEje(valor) : 'sin datos';
  const ariaBarra = conDato
    ? `${eje.nombre}: ${valorTexto} en una escala de menos cien, ${eje.poloNegativo}, a más cien, ${eje.poloPositivo}. ${estado}`
    : `${eje.nombre}: sin datos. ${estado}`;
  const distanciasReferencias = conDato
    ? eje.referencias?.map((referencia) => ({
        referencia,
        distancia: Math.abs(referencia.valor - valor),
      })) ?? []
    : [];
  const distanciaMinima = Math.min(...distanciasReferencias.map(({ distancia }) => distancia));
  const referenciasCercanas = distanciasReferencias.filter(
    ({ distancia }) => distancia === distanciaMinima,
  );
  const referenciaCercana = referenciasCercanas.length === 1
    ? referenciasCercanas[0]?.referencia
    : undefined;

  return (
    <article className="faceta-fila" data-estado={conDato ? (faceta.coberturaSuficiente ? 'suficiente' : 'tentativa') : 'sin-datos'}>
      <div className="faceta-cabecera">
        <h4 title={eje.descripcion}>{eje.nombre}</h4>
        <span className={conDato ? 'faceta-valor' : 'faceta-valor faceta-valor--vacio'}>
          {valorTexto}
        </span>
      </div>

      <p className="faceta-evidencia">
        {estado}
      </p>

      <div
        className={conDato ? 'faceta-barra' : 'faceta-barra faceta-barra--vacia'}
        style={estilo}
        role="img"
        aria-label={ariaBarra}
      >
        {conDato ? (
          <>
            <span className="faceta-barra-tramo" />
            <span className="faceta-barra-marcador" />
          </>
        ) : null}
      </div>

      <div className="faceta-polos">
        <span data-activo={conDato && valor < 0}>{eje.poloNegativo}</span>
        <span data-activo={conDato && valor > 0}>{eje.poloPositivo}</span>
      </div>

      {eje.referencias?.length ? (
        <ol className="faceta-referencias" aria-label="Referencias orientativas de la escala">
          {[...eje.referencias]
            .sort((a, b) => a.valor - b.valor)
            .map((referencia) => (
              <li
                key={`${referencia.valor}-${referencia.etiqueta}`}
                data-activo={referencia === referenciaCercana}
              >
                {referencia.etiqueta}
              </li>
            ))}
        </ol>
      ) : null}

      <details className="faceta-detalle">
        <summary>Qué mide y qué evidencia hay</summary>
        <div>
          {eje.descripcion ? <p>{eje.descripcion}</p> : null}
          <dl>
            <div>
              <dt>Preguntas con opinión</dt>
              <dd>{faceta.itemsRespondidos} de {faceta.itemsDisponibles}</dd>
            </div>
            <div>
              <dt>Carga respondida</dt>
              <dd>
                {formatearNumero(faceta.cargaRespondida)} de{' '}
                {formatearNumero(faceta.cargaDisponible)}
              </dd>
            </div>
            <div>
              <dt>Cálculo normalizado</dt>
              <dd>
                numerador {formatearNumero(faceta.numerador)} · denominador{' '}
                {formatearNumero(faceta.denominador)}
              </dd>
            </div>
          </dl>
        </div>
      </details>
    </article>
  );
}

function textoEvidencia(faceta: ResultadoFaceta): string {
  if (faceta.itemsDisponibles === 0) return 'Sin datos · no incluida en este recorrido';
  const preguntas = `${faceta.itemsRespondidos}/${faceta.itemsDisponibles} preguntas con opinión`;
  if (faceta.valor === null) return `${preguntas} · sin datos`;
  return faceta.coberturaSuficiente
    ? `${preguntas} · evidencia suficiente`
    : `${preguntas} · orientación provisional`;
}

function ExploradorFacetas({ ejes, facetas }: Props) {
  const idBase = useId();
  const disponibles = useMemo(() => {
    const ejePorId = new Map(ejes.map((eje) => [eje.id, eje]));
    return facetas.flatMap((faceta) => {
      const eje = ejePorId.get(faceta.facetaId);
      return eje && faceta.valor !== null ? [{ eje, faceta }] : [];
    });
  }, [ejes, facetas]);

  const [ejeXElegido, setEjeXElegido] = useState('');
  const [ejeYElegido, setEjeYElegido] = useState('');
  if (disponibles.length < 2) return null;

  const ejeXId = disponibles.some(({ eje }) => eje.id === ejeXElegido)
    ? ejeXElegido
    : disponibles[0]?.eje.id ?? '';
  const ejeYId = disponibles.some(({ eje }) => eje.id === ejeYElegido && eje.id !== ejeXId)
    ? ejeYElegido
    : disponibles.find(({ eje }) => eje.id !== ejeXId)?.eje.id ?? '';
  const x = disponibles.find(({ eje }) => eje.id === ejeXId);
  const y = disponibles.find(({ eje }) => eje.id === ejeYId);
  if (!x || !y) return null;

  const puntoX = 24 + ((x.faceta.valor ?? 0) + 100) * 1.26;
  const puntoY = 276 - ((y.faceta.valor ?? 0) + 100) * 1.26;
  const descripcionId = `${idBase}-descripcion`;

  return (
    <details className="explorador-facetas">
      <summary>
        Explorar dos facetas en 2D <span>opcional</span>
      </summary>
      <div className="explorador-cuerpo">
        <p id={descripcionId} className="nota-al-margen">
          Esta vista solo cruza las dos facetas elegidas. No resume tu ideología, no calcula
          afinidades y no asigna cuadrantes ni etiquetas.
        </p>
        <div className="explorador-controles">
          <label>
            <span>Eje horizontal</span>
            <select value={ejeXId} onChange={(evento) => setEjeXElegido(evento.target.value)}>
              {disponibles.map(({ eje, faceta }) => (
                <option value={eje.id} key={eje.id} disabled={eje.id === ejeYId}>
                  {eje.nombre}{faceta.coberturaSuficiente ? '' : ' (provisional)'}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Eje vertical</span>
            <select value={ejeYId} onChange={(evento) => setEjeYElegido(evento.target.value)}>
              {disponibles.map(({ eje, faceta }) => (
                <option value={eje.id} key={eje.id} disabled={eje.id === ejeXId}>
                  {eje.nombre}{faceta.coberturaSuficiente ? '' : ' (provisional)'}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="explorador-plano">
          <span className="explorador-y explorador-y--positivo">{y.eje.poloPositivo}</span>
          <svg
            viewBox="0 0 300 300"
            role="img"
            aria-describedby={descripcionId}
            aria-label={`${x.eje.nombre}: ${formatearEje(x.faceta.valor ?? 0)}. ${y.eje.nombre}: ${formatearEje(y.faceta.valor ?? 0)}.`}
          >
            <rect className="explorador-marco" x="24" y="24" width="252" height="252" />
            <path className="explorador-marcas" d="M150 276v-7M24 150h7M276 150h-7M150 24v7" />
            <circle className="explorador-punto" cx={puntoX} cy={puntoY} r="7">
              <title>Tu posición en estas dos facetas</title>
            </circle>
          </svg>
          <span className="explorador-y explorador-y--negativo">{y.eje.poloNegativo}</span>
          <div className="explorador-x">
            <span>{x.eje.poloNegativo}</span>
            <span>{x.eje.poloPositivo}</span>
          </div>
        </div>
        <p className="explorador-lectura">
          <strong>{x.eje.nombre}:</strong> {formatearEje(x.faceta.valor ?? 0)} ·{' '}
          <strong>{y.eje.nombre}:</strong> {formatearEje(y.faceta.valor ?? 0)}.
          {!x.faceta.coberturaSuficiente || !y.faceta.coberturaSuficiente
            ? ' Al menos una de las dos posiciones es provisional.'
            : ''}
        </p>
      </div>
    </details>
  );
}
