import { lazy, Suspense, useMemo, type CSSProperties } from 'react';
import type { ResultadoFaceta } from '@engine';
import { COMUNIDADES, EJES } from '../datos';
import {
  nombrePartidoCompartible,
  PARTIDOS_COMPARTIBLES,
} from '../datosCompartidos';
import {
  leerResultadoCompartido,
  ordenarPartidosParaVista,
  type EleccionResultadoCompartido,
  type FacetaCompartida,
  type NivelResultadoCompartido,
  type ResultadoCompartidoV1,
} from '../resultadoCompartido';

interface Props {
  hash: string;
  alCerrar: () => void;
}

/**
 * El atlas canónico (corrientes doctrinales + brújula) también se pinta en la
 * vista compartida: sus capas son datos estáticos del bundle y el punto del
 * usuario sale de las facetas del snapshot. Va en chunk perezoso, como en
 * Resultados, para no cargar el presupuesto de la ruta compartida.
 */
const MapaPolitico = lazy(() =>
  import('../componentes/MapaPolitico').then((modulo) => ({
    default: modulo.MapaPolitico,
  })),
);

/**
 * Reconstruye las facetas mínimas que consume el mapa (facetaId, valor,
 * cobertura y suficiencia). Los campos internos de cálculo (cargas,
 * numeradores) no viajan en el enlace y el mapa no los lee: se rellenan a
 * cero para cumplir el tipo sin fingir evidencia.
 */
function facetasDelSnapshot(resultado: ResultadoCompartidoV1): ResultadoFaceta[] {
  return resultado.f.map(([facetaId, valor, cobertura, itemsRespondidos, suficiente]) => ({
    facetaId,
    valor: valor === null ? null : valor / 10,
    itemsRespondidos,
    itemsDisponibles: itemsRespondidos,
    cargaRespondida: 0,
    cargaDisponible: 0,
    numerador: 0,
    denominador: 0,
    cobertura: cobertura / 1_000,
    coberturaSuficiente: suficiente === 1,
  }));
}

const EJE_POR_ID = new Map(EJES.map((eje) => [eje.id, eje]));
const PARTIDO_POR_ID = new Map(PARTIDOS_COMPARTIBLES.map((partido) => [partido.id, partido]));
const COMUNIDAD_POR_ID = new Map(COMUNIDADES.map((comunidad) => [comunidad.id, comunidad]));
const PERMITIDOS = {
  ejes: new Set(EJE_POR_ID.keys()),
  partidos: new Set(PARTIDO_POR_ID.keys()),
  comunidades: new Set(COMUNIDAD_POR_ID.keys()),
};

const NIVEL: Record<NivelResultadoCompartido, string> = {
  r: 'Perfil rápido · provisional',
  i: 'Perfil intermedio · provisional',
  e: 'Perfil exhaustivo',
};

const ELECCION: Record<EleccionResultadoCompartido, string> = {
  g: 'Elecciones generales',
  a: 'Elecciones autonómicas',
  m: 'Elecciones municipales',
  u: 'Elecciones europeas',
};

function formatearPorcentaje(valor: number): string {
  return `${(valor / 10).toLocaleString('es-ES', { maximumFractionDigits: 1 })} %`;
}

function formatearEje(valor: number | null): string {
  if (valor === null) return 'Sin datos';
  const normalizado = valor / 10;
  const numero = Math.abs(normalizado).toLocaleString('es-ES', { maximumFractionDigits: 1 });
  return normalizado > 0 ? `+${numero}` : normalizado < 0 ? `−${numero}` : '0';
}

function ordenarFacetas(resultado: ResultadoCompartidoV1): FacetaCompartida[] {
  const orden = new Map(EJES.map((eje, indice) => [eje.id, indice]));
  return [...resultado.f].sort(
    (a, b) => (orden.get(a[0]) ?? 999) - (orden.get(b[0]) ?? 999),
  );
}

function BrujulaCompartida({ resultado }: { resultado: ResultadoCompartidoV1 }) {
  const propiedad = resultado.f.find((faceta) => faceta[0] === 'propiedad-mercado')?.[1];
  const autoridad = resultado.f.find((faceta) => faceta[0] === 'autoridad-politica')?.[1];
  const calculable = typeof propiedad === 'number' && typeof autoridad === 'number';
  const estiloPunto = calculable
    ? ({
        '--compartido-x': `${((propiedad + 1_000) / 2_000) * 100}%`,
        '--compartido-y': `${100 - ((autoridad + 1_000) / 2_000) * 100}%`,
      } as CSSProperties)
    : undefined;

  // Sin sección propia: hoy solo actúa de plano provisional mientras resuelve
  // el chunk perezoso del atlas canónico (y de vista mínima si aquel fallara).
  return (
    <div
      className="compartido-brujula"
      role="img"
      aria-label={
        calculable
          ? `Posición compartida: propiedad y mercado ${formatearEje(propiedad)}, poder político ${formatearEje(autoridad)}.`
          : 'La instantánea no contiene evidencia suficiente para situar la brújula principal.'
      }
    >
      <span className="compartido-brujula__eje compartido-brujula__eje--vertical" aria-hidden="true" />
      <span className="compartido-brujula__eje compartido-brujula__eje--horizontal" aria-hidden="true" />
      {calculable ? (
        <span className="compartido-brujula__punto" style={estiloPunto} aria-hidden="true" />
      ) : (
        <span className="compartido-brujula__sin-datos">Evidencia insuficiente</span>
      )}
    </div>
  );
}

function AfinidadesCompartidas({ resultado }: { resultado: ResultadoCompartidoV1 }) {
  return (
    <section className="seccion compartido-seccion" aria-labelledby="compartido-afinidades-titulo">
      <h2 id="compartido-afinidades-titulo">Mayores afinidades del snapshot</h2>
      <p className="nota-al-margen">
        Los resultados con cobertura comparable van primero; un porcentaje alto sobre muy pocos
        ítems es solo orientativo y no determina el puesto. La cobertura figura expresamente y
        el resultado no es una recomendación de voto.
      </p>
      {resultado.p.length === 0 ? (
        <p className="resultado-no-calculable">No se compartieron afinidades calculables.</p>
      ) : (
        <ol className="compartido-afinidades">
          {ordenarPartidosParaVista(resultado.p).map((partido) => {
            const perfil = PARTIDO_POR_ID.get(partido[0]);
            return (
              <li key={partido[0]}>
                <div className="compartido-afinidades__cabecera">
                  <strong>{perfil ? nombrePartidoCompartible(perfil) : partido[0]}</strong>
                  <span>{formatearPorcentaje(partido[1])}</span>
                </div>
                <div className="barra" aria-hidden="true">
                  <span style={{ width: `${partido[1] / 10}%` }} />
                </div>
                <p>
                  {partido[3]} ítems · cobertura {Math.round(partido[2] / 10)} %
                  {partido[4] ? ' · cobertura baja' : ''} · posición{' '}
                  {partido[5] === 'v' ? 'verificada' : 'estimada'}
                </p>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}

function FacetasCompartidas({ resultado }: { resultado: ResultadoCompartidoV1 }) {
  return (
    <section className="seccion compartido-seccion" aria-labelledby="compartido-facetas-titulo">
      <h2 id="compartido-facetas-titulo">Perfil por facetas</h2>
      <div className="compartido-facetas">
        {ordenarFacetas(resultado).map((faceta) => {
          const eje = EJE_POR_ID.get(faceta[0]);
          const desplazamiento = faceta[1] === null ? 50 : (faceta[1] + 1_000) / 20;
          return (
            <article className="compartido-faceta" key={faceta[0]}>
              <div className="compartido-faceta__cabecera">
                <h3>{eje?.nombre ?? faceta[0]}</h3>
                <strong>{formatearEje(faceta[1])}</strong>
              </div>
              <div
                className="compartido-faceta__escala"
                role="img"
                aria-label={`${eje?.nombre ?? faceta[0]}: ${formatearEje(faceta[1])}; ${faceta[3]} ítems y ${Math.round(faceta[2] / 10)} % de cobertura${faceta[4] ? '' : '; provisional'}.`}
              >
                <span aria-hidden="true" />
                {faceta[1] !== null ? (
                  <i style={{ left: `${desplazamiento}%` }} aria-hidden="true" />
                ) : null}
              </div>
              <div className="compartido-faceta__polos" aria-hidden="true">
                <span>{eje?.poloNegativo ?? 'Polo negativo'}</span>
                <span>{eje?.poloPositivo ?? 'Polo positivo'}</span>
              </div>
              <p>
                {faceta[3]} ítems · cobertura {Math.round(faceta[2] / 10)} %
                {faceta[4] ? '' : ' · provisional'}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function ResultadoCompartido({ hash, alCerrar }: Props) {
  const lectura = useMemo(() => leerResultadoCompartido(hash, PERMITIDOS), [hash]);

  if (lectura.estado !== 'valido') {
    return (
      <div className="contenedor vista-compartida vista-compartida--invalida" role="alert">
        <p className="kicker">Enlace compartido</p>
        <h1>No se puede leer este resultado</h1>
        <p>
          El enlace está incompleto, ha sido alterado o pertenece a un catálogo incompatible. No
          hemos leído ni modificado ningún test guardado en este navegador.
        </p>
        <button type="button" className="boton" onClick={alCerrar}>
          Cerrar el enlace y volver a Espectro
        </button>
      </div>
    );
  }

  const { resultado } = lectura;
  const comunidad = resultado.c ? COMUNIDAD_POR_ID.get(resultado.c)?.nombre : undefined;
  return (
    <div className="contenedor contenedor--ancho vista-compartida">
      <p className="kicker">Vista compartida · solo lectura</p>
      <h1 className="titular">Resultado político compartido</h1>
      <p className="contexto-resultados">
        {NIVEL[resultado.l]} · {ELECCION[resultado.e]}
        {comunidad ? ` · ${comunidad}` : ' · comunidad sin indicar'} · {resultado.q[0]} preguntas
        administradas ({resultado.q[1]} con opinión).
      </p>
      <div className="compartido-advertencia">
        <strong>Este snapshot puede revelar información política sensible.</strong>
        <p>
          Lo puede leer cualquiera que tenga el enlace. No caduca, no se puede revocar y no está
          firmado: no demuestra quién respondió ni que el contenido sea auténtico. No contiene las
          respuestas originales y abrirlo no lee, guarda ni renueva el test de este navegador.
        </p>
      </div>

      <section className="seccion compartido-seccion" aria-labelledby="compartido-mapa-titulo">
        <h2 id="compartido-mapa-titulo">Mapa del espectro</h2>
        <p className="nota-al-margen">
          El atlas de corrientes es el mismo de la vista completa; el punto marca la posición
          del snapshot. Solo lectura: nada de lo que abras aquí toca el test de este navegador.
        </p>
        <Suspense fallback={<BrujulaCompartida resultado={resultado} />}>
          <MapaPolitico
            facetasUsuario={facetasDelSnapshot(resultado)}
            puedeRecargar={false}
            alConfirmarGuardado={() => false}
            ccaa={resultado.c}
          />
        </Suspense>
      </section>
      <AfinidadesCompartidas resultado={resultado} />
      <FacetasCompartidas resultado={resultado} />

      <aside className="compartido-metadatos" aria-label="Versiones del resultado compartido">
        Instrumento {resultado.i} · catálogo {resultado.d}. Cálculo de proximidad, no identidad
        ideológica ni recomendación electoral.
      </aside>
      <div className="acciones">
        <button type="button" className="boton" onClick={alCerrar}>
          Cerrar el enlace y volver a mi Espectro
        </button>
      </div>
    </div>
  );
}
