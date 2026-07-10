/**
 * Cubo 3D del espacio político: económico × GAL-TAN × territorial.
 *
 * Todo three/react-three-fiber/drei vive en este chunk perezoso: solo se
 * descarga al pulsar «Ver en 3D». Render bajo demanda (frameloop="demand" +
 * invalidate), pixel ratio limitado a 2, sin antialias nativo y
 * powerPreference high-performance, según docs/investigacion/ESPACIO-EJES.md.
 * El canvas es opaco para lectores de pantalla: la tabla hermana contiene la
 * información equivalente y el mapa 2D queda como respaldo sin WebGL.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import type { Eje } from '@engine';
import { distanciaEspacial } from '@engine';
import { formatearEje } from '../datos';
import { NOMBRE_CORTO_EJE } from '../mapaEspacial';
import type { EntidadMapa } from '../mapaEspacial';

interface Props {
  /** Los tres ejes del espacio, en orden: económico, social, territorial. */
  ejes: Eje[];
  valoresUsuario: Record<string, number | null>;
  usuarioProvisional: boolean;
  entidades: EntidadMapa[];
}

interface Tema {
  papel: string;
  tinta: string;
  tintaSuave: string;
  filete: string;
  fileteFuerte: string;
  acento: string;
}

interface PuntoDatos {
  id: string;
  nombre: string;
  etiqueta: string;
  tipo: 'usuario' | 'partido' | 'referencia';
  valores: Record<string, number>;
  posicion: [number, number, number];
}

interface Vecino {
  punto: PuntoDatos;
  distancia: number;
}

/**
 * La estructura (rejilla, planos, filetes) no debe interceptar el raycast de
 * la oclusión de etiquetas ni los clics: solo los puntos son interactivos.
 */
const ignorarRaycast = () => undefined;

function leerTema(): Tema {
  const estilo = getComputedStyle(document.documentElement);
  const variable = (nombre: string, respaldo: string) =>
    estilo.getPropertyValue(nombre).trim() || respaldo;
  return {
    papel: variable('--papel', '#faf9f7'),
    tinta: variable('--tinta', '#211e1b'),
    tintaSuave: variable('--tinta-suave', '#6b6459'),
    filete: variable('--filete', '#ddd8cd'),
    fileteFuerte: variable('--filete-fuerte', '#b1a999'),
    acento: variable('--acento', '#9b1c31'),
  };
}

function useTema(): Tema {
  const [tema, setTema] = useState<Tema>(leerTema);
  useEffect(() => {
    const consulta = window.matchMedia('(prefers-color-scheme: dark)');
    const alCambiar = () => setTema(leerTema());
    consulta.addEventListener('change', alCambiar);
    return () => consulta.removeEventListener('change', alCambiar);
  }, []);
  return tema;
}

function usePrefiereMenosMovimiento(): boolean {
  const [prefiere, setPrefiere] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const consulta = window.matchMedia('(prefers-reduced-motion: reduce)');
    const alCambiar = () => setPrefiere(consulta.matches);
    consulta.addEventListener('change', alCambiar);
    return () => consulta.removeEventListener('change', alCambiar);
  }, []);
  return prefiere;
}

function hayWebGL(): boolean {
  try {
    const lienzo = document.createElement('canvas');
    return Boolean(lienzo.getContext('webgl2') ?? lienzo.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Etiqueta breve del polo: sin paréntesis y cortada en la primera coma. */
function poloBreve(texto: string): string {
  const sinParentesis = texto.split('(')[0] ?? texto;
  return (sinParentesis.split(',')[0] ?? sinParentesis).trim();
}

/**
 * Autorrotación lenta oscilatoria alrededor del eje vertical (efecto de
 * profundidad cinética). Se pausa al interactuar o seleccionar y queda
 * desactivada con prefers-reduced-motion. La fase se acumula solo mientras
 * está activa para que la reanudación no dé saltos.
 */
function GrupoOscilante({ activo, children }: { activo: boolean; children: ReactNode }) {
  const referencia = useRef<THREE.Group>(null);
  const fase = useRef(0);
  const invalidate = useThree((estado) => estado.invalidate);
  useEffect(() => {
    if (activo) invalidate();
  }, [activo, invalidate]);
  useFrame((_, delta) => {
    if (!activo || !referencia.current) return;
    fase.current += Math.min(delta, 0.1);
    referencia.current.rotation.y = 0.45 * Math.sin(fase.current * 0.3);
    invalidate();
  });
  return <group ref={referencia}>{children}</group>;
}

/** Filetes del cubo, rejilla del suelo, ejes centrales y plano ecuatorial. */
function Estructura({ tema }: { tema: Tema }) {
  const bordes = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(2, 2, 2)), []);
  const rejilla = useMemo(() => {
    const puntos: number[] = [];
    for (let i = 0; i <= 4; i += 1) {
      const t = -1 + i / 2;
      puntos.push(-1, -1, t, 1, -1, t);
      puntos.push(t, -1, -1, t, -1, 1);
    }
    const geometria = new THREE.BufferGeometry();
    geometria.setAttribute('position', new THREE.Float32BufferAttribute(puntos, 3));
    return geometria;
  }, []);
  const ejesCentrales = useMemo(() => {
    const puntos = [-1, 0, 0, 1, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, -1, 0, 0, 1];
    const geometria = new THREE.BufferGeometry();
    geometria.setAttribute('position', new THREE.Float32BufferAttribute(puntos, 3));
    return geometria;
  }, []);
  return (
    <>
      <lineSegments geometry={bordes} raycast={ignorarRaycast}>
        <lineBasicMaterial color={tema.fileteFuerte} />
      </lineSegments>
      <lineSegments geometry={rejilla} raycast={ignorarRaycast}>
        <lineBasicMaterial color={tema.filete} />
      </lineSegments>
      <lineSegments geometry={ejesCentrales} raycast={ignorarRaycast}>
        <lineBasicMaterial color={tema.fileteFuerte} />
      </lineSegments>
      <mesh rotation={[-Math.PI / 2, 0, 0]} raycast={ignorarRaycast}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial
          color={tema.filete}
          transparent
          opacity={0.16}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

function EtiquetasEjes({ ejes, tema }: { ejes: Eje[]; tema: Tema }) {
  const [economico, social, territorial] = ejes;
  if (!economico || !social || !territorial) return null;
  const etiquetas: Array<{ posicion: [number, number, number]; texto: string }> = [
    { posicion: [1.28, -1, 0], texto: poloBreve(economico.poloPositivo) },
    { posicion: [-1.28, -1, 0], texto: poloBreve(economico.poloNegativo) },
    { posicion: [0, 1.22, 0], texto: poloBreve(social.poloPositivo) },
    { posicion: [0, -1.28, 0], texto: poloBreve(social.poloNegativo) },
    { posicion: [0, -1, 1.32], texto: poloBreve(territorial.poloPositivo) },
    { posicion: [0, -1, -1.32], texto: poloBreve(territorial.poloNegativo) },
  ];
  return (
    <>
      {etiquetas.map((etiqueta) => (
        <Html
          key={`${etiqueta.posicion.join(',')}`}
          position={etiqueta.posicion}
          center
          zIndexRange={[5, 0]}
          className="cubo3d-polo"
          style={{ color: tema.tintaSuave }}
        >
          {etiqueta.texto}
        </Html>
      ))}
    </>
  );
}

function Punto({
  datos,
  tema,
  seleccionado,
  etiquetaVisible,
  sufijoEtiqueta,
  alSeleccionar,
}: {
  datos: PuntoDatos;
  tema: Tema;
  seleccionado: boolean;
  etiquetaVisible: boolean;
  sufijoEtiqueta?: string;
  alSeleccionar: (id: string) => void;
}) {
  const invalidate = useThree((estado) => estado.invalidate);
  const color =
    datos.tipo === 'usuario' ? tema.acento : seleccionado ? tema.acento : tema.tinta;
  const alPulsar = (evento: { stopPropagation: () => void }) => {
    evento.stopPropagation();
    alSeleccionar(datos.id);
    invalidate();
  };
  return (
    <group position={datos.posicion}>
      {datos.tipo === 'referencia' ? (
        <mesh onClick={alPulsar}>
          <octahedronGeometry args={[0.08, 0]} />
          <meshBasicMaterial color={color} wireframe />
        </mesh>
      ) : (
        <mesh onClick={alPulsar}>
          {/* El tamaño en pantalla decrece con la profundidad (cámara en
              perspectiva): pista redundante junto a la niebla. */}
          <sphereGeometry args={[datos.tipo === 'usuario' ? 0.07 : 0.05, 24, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
      )}
      {etiquetaVisible ? (
        <Html
          position={[0, 0.14, 0]}
          center
          occlude
          zIndexRange={[10, 0]}
          className={`cubo3d-etiqueta${datos.tipo === 'usuario' || seleccionado ? ' cubo3d-etiqueta--destacada' : ''}`}
        >
          {datos.etiqueta}
          {sufijoEtiqueta ? <small>{sufijoEtiqueta}</small> : null}
        </Html>
      ) : null}
    </group>
  );
}

/** Segmentos que unen el punto seleccionado con sus vecinos más próximos. */
function Conexiones({
  origen,
  vecinos,
  tema,
}: {
  origen: [number, number, number];
  vecinos: Vecino[];
  tema: Tema;
}) {
  const geometria = useMemo(() => {
    const puntos: number[] = [];
    for (const vecino of vecinos) puntos.push(...origen, ...vecino.punto.posicion);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(puntos, 3));
    return geo;
  }, [origen, vecinos]);
  if (vecinos.length === 0) return null;
  return (
    <lineSegments geometry={geometria} raycast={ignorarRaycast}>
      <lineBasicMaterial color={tema.acento} transparent opacity={0.75} />
    </lineSegments>
  );
}

export default function Mapa3D({ ejes, valoresUsuario, usuarioProvisional, entidades }: Props) {
  const tema = useTema();
  const menosMovimiento = usePrefiereMenosMovimiento();
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [interactuando, setInteractuando] = useState(false);
  const soportaWebGL = useMemo(hayWebGL, []);

  const idsEjes = useMemo(() => ejes.map((eje) => eje.id), [ejes]);

  const usuarioCompleto = idsEjes.every((id) => typeof valoresUsuario[id] === 'number');

  const puntos = useMemo<PuntoDatos[]>(() => {
    const lista: PuntoDatos[] = [];
    if (usuarioCompleto) {
      const valores: Record<string, number> = {};
      for (const id of idsEjes) valores[id] = valoresUsuario[id] as number;
      lista.push({
        id: 'usuario',
        nombre: 'Tu posición',
        etiqueta: 'Tú',
        tipo: 'usuario',
        valores,
        posicion: aPosicion(valores, idsEjes),
      });
    }
    for (const entidad of entidades) {
      lista.push({
        id: entidad.id,
        nombre: entidad.nombre,
        etiqueta: entidad.etiqueta,
        tipo: entidad.tipo,
        valores: entidad.valores,
        posicion: aPosicion(entidad.valores, idsEjes),
      });
    }
    return lista;
  }, [entidades, idsEjes, usuarioCompleto, valoresUsuario]);

  const puntoSeleccionado = puntos.find((punto) => punto.id === seleccion) ?? null;

  const vecinos = useMemo<Vecino[]>(() => {
    if (!puntoSeleccionado) return [];
    return puntos
      .filter((punto) => punto.id !== puntoSeleccionado.id)
      .flatMap((punto) => {
        const distancia = distanciaEspacial(puntoSeleccionado.valores, punto.valores, idsEjes);
        return distancia === null ? [] : [{ punto, distancia }];
      })
      .sort((a, b) => a.distancia - b.distancia)
      .slice(0, 3);
  }, [idsEjes, puntoSeleccionado, puntos]);

  const idsVecinos = new Map(vecinos.map((vecino) => [vecino.punto.id, vecino.distancia]));

  if (!soportaWebGL) {
    return (
      <p className="aviso-cobertura" role="status">
        Este navegador no puede mostrar el cubo 3D (WebGL no disponible). El mapa 2D superior
        contiene la misma información por pares de ejes.
      </p>
    );
  }

  const oscilar = !menosMovimiento && !interactuando && seleccion === null;

  return (
    <div className="cubo3d">
      <div className="cubo3d__lienzo" aria-hidden="true">
        <Canvas
          frameloop="demand"
          // Equivale a setPixelRatio(Math.min(devicePixelRatio, 2)).
          dpr={Math.min(window.devicePixelRatio || 1, 2)}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
          camera={{ position: [2.4, 1.5, 3.1], fov: 42 }}
          onPointerMissed={() => setSeleccion(null)}
        >
          <color attach="background" args={[tema.papel]} />
          {/* Niebla suave: pista de profundidad coherente con el papel. */}
          <fog attach="fog" args={[tema.papel, 3.8, 9.5]} />
          <GrupoOscilante activo={oscilar}>
            <Estructura tema={tema} />
            <EtiquetasEjes ejes={ejes} tema={tema} />
            {puntos.map((punto) => {
              const distanciaVecino = idsVecinos.get(punto.id);
              const esVecino = distanciaVecino !== undefined;
              const seleccionado = punto.id === seleccion;
              const etiquetaVisible =
                punto.tipo === 'usuario' ||
                punto.tipo === 'referencia' ||
                seleccionado ||
                esVecino;
              return (
                <Punto
                  key={punto.id}
                  datos={punto}
                  tema={tema}
                  seleccionado={seleccionado}
                  etiquetaVisible={etiquetaVisible}
                  sufijoEtiqueta={
                    esVecino ? ` d ${Math.round(distanciaVecino)}` : undefined
                  }
                  alSeleccionar={(id) => setSeleccion((antes) => (antes === id ? null : id))}
                />
              );
            })}
            {puntoSeleccionado ? (
              <Conexiones origen={puntoSeleccionado.posicion} vecinos={vecinos} tema={tema} />
            ) : null}
          </GrupoOscilante>
          <OrbitControls
            makeDefault
            enablePan={false}
            enableDamping={false}
            minDistance={2.2}
            maxDistance={7}
            onStart={() => setInteractuando(true)}
            onEnd={() => setInteractuando(false)}
          />
        </Canvas>
      </div>

      <p className="cubo3d__ayuda">
        Arrastra para girar, rueda o pellizco para acercar, toca un punto para ver sus vecinos
        más próximos. La rotación se pausa al interactuar
        {menosMovimiento ? ' y está desactivada por tu preferencia de menos movimiento' : ''}.
      </p>

      {puntoSeleccionado ? (
        <p className="mapa-lectura" role="status">
          <strong>{puntoSeleccionado.nombre}.</strong>{' '}
          {puntoSeleccionado.tipo === 'referencia'
            ? 'Referencia doctrinal, no votable. '
            : ''}
          {vecinos.length > 0
            ? `Vecinos más próximos (distancia euclídea sobre los tres ejes, orientativa): ${vecinos
                .map((vecino) => `${vecino.punto.nombre} (d ${Math.round(vecino.distancia)})`)
                .join(' · ')}.`
            : 'No hay otros puntos con evidencia suficiente con los que medir cercanía.'}
        </p>
      ) : null}

      <div className="tabla-scroll">
      <table className="tabla-detalle tabla-cubo">
        <caption>
          Equivalente accesible del cubo: posición por eje ({idsEjes.map((id) => NOMBRE_CORTO_EJE[id] ?? id).join(', ')}) y
          distancia euclídea a tu posición, orientativa.
        </caption>
        <thead>
          <tr>
            <th scope="col">Entidad</th>
            <th scope="col">Tipo</th>
            {ejes.map((eje) => (
              <th scope="col" key={eje.id}>
                {NOMBRE_CORTO_EJE[eje.id] ?? eje.nombre}
              </th>
            ))}
            <th scope="col">Distancia a ti</th>
          </tr>
        </thead>
        <tbody>
          {usuarioCompleto ? (
            <tr>
              <th scope="row">Tú{usuarioProvisional ? ' (provisional)' : ''}</th>
              <td>usuario</td>
              {idsEjes.map((id) => (
                <td key={id} className="celda-valor">
                  {formatearEje(valoresUsuario[id] as number)}
                </td>
              ))}
              <td>—</td>
            </tr>
          ) : (
            <tr>
              <th scope="row">Tú</th>
              <td>usuario</td>
              <td colSpan={idsEjes.length + 1} className="sin-dato">
                Sin posición completa en los tres ejes; no se dibuja tu punto.
              </td>
            </tr>
          )}
          {entidades.map((entidad) => {
            const distancia = usuarioCompleto
              ? distanciaEspacial(valoresUsuario, entidad.valores, idsEjes)
              : null;
            return (
              <tr key={entidad.id}>
                <th scope="row">{entidad.nombre}</th>
                <td>{entidad.tipo === 'referencia' ? 'referencia doctrinal, no votable' : 'partido'}</td>
                {idsEjes.map((id) => (
                  <td key={id} className="celda-valor">
                    {formatearEje(entidad.valores[id] ?? 0)}
                  </td>
                ))}
                <td className="celda-dist">{distancia === null ? '—' : Math.round(distancia)}</td>
              </tr>
            );
          })}
          {entidades.length === 0 ? (
            <tr>
              <td colSpan={idsEjes.length + 3} className="sin-dato">
                Ningún partido ni referencia alcanza hoy la evidencia mínima en los tres ejes.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
      </div>
    </div>
  );
}

function aPosicion(
  valores: Record<string, number>,
  idsEjes: string[],
): [number, number, number] {
  const [economico = 'economico', social = 'social', territorial = 'territorial'] = idsEjes;
  return [
    (valores[economico] ?? 0) / 100,
    (valores[social] ?? 0) / 100,
    (valores[territorial] ?? 0) / 100,
  ];
}
