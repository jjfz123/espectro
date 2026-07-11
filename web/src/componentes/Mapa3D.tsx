/**
 * Cubo 3D del espacio político: Economía × Sociedad × Territorio.
 *
 * Todo three/react-three-fiber/drei vive en este chunk perezoso: solo se
 * descarga al pulsar «Ver en 3D». Render bajo demanda (frameloop="demand" +
 * invalidate), pixel ratio limitado a 2 y powerPreference high-performance,
 * según docs/investigacion/ESPACIO-EJES.md. Con ~20 entidades el presupuesto
 * permite esferas con sombreado suave (dos luces direccionales + ambiente) en
 * lugar de puntos planos; el canvas es transparente y el fondo lo pone la
 * hoja de estilos (viñeta radial papel→superficie), de modo que respira con
 * el tema claro/oscuro. El canvas es opaco para lectores de pantalla: la
 * tabla hermana contiene la información equivalente y el mapa 2D queda como
 * respaldo sin WebGL.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import type { Eje } from '@engine';
import { distanciaEspacial } from '@engine';
import { formatearEje } from '../datos';
import { lecturaEjeConNumero, poloBreve, poloLlano } from '../lecturaEjes';
import { NOMBRE_CORTO_EJE } from '../mapaEspacial';
import type { EntidadMapa } from '../mapaEspacial';
import { AyudaEjes } from './AyudaEjes';
import { LecturaEjes } from './LecturaEjes';

interface Props {
  /** Los tres ejes del espacio, en orden: económico, social, territorial. */
  ejes: Eje[];
  valoresUsuario: Record<string, number | null>;
  usuarioProvisional: boolean;
  entidades: EntidadMapa[];
}

interface Tema {
  papel: string;
  superficie: string;
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
    superficie: variable('--superficie', '#f1eee8'),
    tinta: variable('--tinta', '#211e1b'),
    tintaSuave: variable('--tinta-suave', '#6b6459'),
    filete: variable('--filete', '#ddd8cd'),
    fileteFuerte: variable('--filete-fuerte', '#b1a999'),
    acento: variable('--acento', '#9b1c31'),
  };
}

/** Mezcla lineal de dos colores #rrggbb (para calibrar la niebla al fondo). */
function mezclarHex(a: string, b: string, proporcionB: number): string {
  const numA = /^#[0-9a-f]{6}$/i.test(a) ? parseInt(a.slice(1), 16) : null;
  const numB = /^#[0-9a-f]{6}$/i.test(b) ? parseInt(b.slice(1), 16) : null;
  if (numA === null || numB === null) return a;
  const canal = (desplazamiento: number) => {
    const va = (numA >> desplazamiento) & 0xff;
    const vb = (numB >> desplazamiento) & 0xff;
    return Math.round(va + (vb - va) * proporcionB);
  };
  const valor = (canal(16) << 16) | (canal(8) << 8) | canal(0);
  return `#${valor.toString(16).padStart(6, '0')}`;
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

function usePantallaEstrecha(): boolean {
  const [estrecha, setEstrecha] = useState(
    () => window.matchMedia('(max-width: 639px)').matches,
  );
  useEffect(() => {
    const consulta = window.matchMedia('(max-width: 639px)');
    const alCambiar = () => setEstrecha(consulta.matches);
    consulta.addEventListener('change', alCambiar);
    return () => consulta.removeEventListener('change', alCambiar);
  }, []);
  return estrecha;
}

function hayWebGL(): boolean {
  try {
    const lienzo = document.createElement('canvas');
    return Boolean(lienzo.getContext('webgl2') ?? lienzo.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Autorrotación lenta oscilatoria alrededor del eje vertical (efecto de
 * profundidad cinética). Se pausa al interactuar o seleccionar y queda
 * desactivada con prefers-reduced-motion. La fase se acumula solo mientras
 * está activa para que la reanudación no dé saltos.
 */
function GrupoOscilante({
  activo,
  grupoRef,
  children,
}: {
  activo: boolean;
  grupoRef: RefObject<THREE.Group | null>;
  children: ReactNode;
}) {
  const fase = useRef(0);
  const invalidate = useThree((estado) => estado.invalidate);
  useEffect(() => {
    if (activo) invalidate();
  }, [activo, invalidate]);
  useFrame((_, delta) => {
    if (!activo || !grupoRef.current) return;
    fase.current += Math.min(delta, 0.1);
    grupoRef.current.rotation.y = 0.45 * Math.sin(fase.current * 0.3);
    invalidate();
  });
  return <group ref={grupoRef}>{children}</group>;
}

/**
 * Al seleccionar un punto, la cámara reencuadra suavemente su objetivo hacia
 * él (y de vuelta al centro al deseleccionar). Con menos movimiento activado
 * el salto es inmediato. El objetivo se corrige con la rotación acumulada del
 * grupo oscilante para apuntar a la posición real en el mundo.
 */
function TransicionCamara({
  punto,
  grupo,
  inmediata,
}: {
  punto: [number, number, number] | null;
  grupo: RefObject<THREE.Group | null>;
  inmediata: boolean;
}) {
  const invalidate = useThree((estado) => estado.invalidate);
  const controles = useThree((estado) => estado.controls) as unknown as {
    target: THREE.Vector3;
    update: () => void;
  } | null;
  const objetivo = useRef(new THREE.Vector3());
  const ejeY = useRef(new THREE.Vector3(0, 1, 0));

  const destino = () => {
    const [x, y, z] = punto ?? [0, 0, 0];
    objetivo.current.set(x, y, z);
    const angulo = grupo.current?.rotation.y ?? 0;
    if (angulo !== 0) objetivo.current.applyAxisAngle(ejeY.current, angulo);
    return objetivo.current;
  };

  useEffect(() => {
    if (!controles) return;
    if (inmediata) {
      controles.target.copy(destino());
      controles.update();
    }
    invalidate();
  }, [controles, punto, inmediata, invalidate]);

  useFrame((_, delta) => {
    if (!controles || inmediata) return;
    const meta = destino();
    const distancia = controles.target.distanceTo(meta);
    if (distancia < 0.003) return;
    controles.target.lerp(meta, 1 - Math.exp(-6 * Math.min(delta, 0.1)));
    controles.update();
    invalidate();
  });
  return null;
}

/** Filetes del cubo, rejilla del suelo, ejes centrales y plano ecuatorial. */
function Estructura({ tema }: { tema: Tema }) {
  const bordes = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(2, 2, 2)), []);
  const [rejillaMenor, rejillaMayor] = useMemo(() => {
    const aGeometria = (puntos: number[]) => {
      const geometria = new THREE.BufferGeometry();
      geometria.setAttribute('position', new THREE.Float32BufferAttribute(puntos, 3));
      return geometria;
    };
    const menor: number[] = [];
    const mayor: number[] = [];
    for (let i = 1; i <= 7; i += 1) {
      const t = -1 + i / 4;
      const destino = t === 0 ? mayor : menor;
      destino.push(-1, -1, t, 1, -1, t);
      destino.push(t, -1, -1, t, -1, 1);
    }
    return [aGeometria(menor), aGeometria(mayor)];
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
      <lineSegments geometry={rejillaMenor} raycast={ignorarRaycast}>
        <lineBasicMaterial color={tema.filete} transparent opacity={0.55} />
      </lineSegments>
      <lineSegments geometry={rejillaMayor} raycast={ignorarRaycast}>
        <lineBasicMaterial color={tema.filete} />
      </lineSegments>
      <lineSegments geometry={ejesCentrales} raycast={ignorarRaycast}>
        <lineBasicMaterial color={tema.fileteFuerte} />
      </lineSegments>
      {/* Suelo apenas insinuado: ancla el cubo sin pesar. */}
      <mesh position={[0, -1.001, 0]} rotation={[-Math.PI / 2, 0, 0]} raycast={ignorarRaycast}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial
          color={tema.superficie}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

/**
 * Anticolisión rótulo-polo: tras cada fotograma dibujado se comparan los
 * rectángulos reales en pantalla de las etiquetas de puntos (selección,
 * vecinos con distancia, hover) con los rótulos de polos; el polo pisado
 * cede (se atenúa vía .cubo3d-polo--cedido) mientras dure el solape. Al
 * medir el DOM ya proyectado funciona con cualquier ángulo de cámara y con
 * etiquetas multilínea. La comprobación va acompasada al bucle bajo demanda
 * (si nada se mueve, nada se mide) y limitada a unas pocas por segundo.
 */
function AnticolisionPolos() {
  const gl = useThree((estado) => estado.gl);
  const trasUltimoFotograma = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ultimaPeriodica = useRef(0);

  const comprobar = () => {
    // Los Html de drei no cuelgan del padre directo del canvas: se busca
    // desde la raíz del componente (.cubo3d), que los contiene a todos.
    const raiz = gl.domElement.closest('.cubo3d') ?? document.body;
    const rectsVisibles = (selector: string) =>
      Array.from(raiz.querySelectorAll<HTMLElement>(selector))
        .map((el) => ({ el, rect: el.getBoundingClientRect() }))
        .filter(({ rect }) => rect.width > 0 && rect.height > 0);
    const etiquetas = rectsVisibles('.cubo3d-etiqueta');
    const MARGEN = 2; // «rozarse» también cuenta como pisar.
    for (const { el, rect } of rectsVisibles('.cubo3d-polo')) {
      const pisado = etiquetas.some(
        ({ rect: otro }) =>
          rect.left < otro.right + MARGEN &&
          otro.left - MARGEN < rect.right &&
          rect.top < otro.bottom + MARGEN &&
          otro.top - MARGEN < rect.bottom,
      );
      el.classList.toggle('cubo3d-polo--cedido', pisado);
    }
  };

  /* Con frameloop bajo demanda no se puede confiar solo en el fotograma
     actual: los Html de drei fijan su transformación durante el propio
     fotograma. Cada fotograma reprograma una comprobación de cierre a los
     80 ms (siempre hay una medición del estado final, aunque la escena se
     pare) y, mientras el movimiento es sostenido (autorrotación, órbita),
     una comprobación periódica mantiene los polos al día. */
  useEffect(() => {
    const inicial = setTimeout(comprobar, 120);
    return () => {
      clearTimeout(inicial);
      if (trasUltimoFotograma.current !== null) clearTimeout(trasUltimoFotograma.current);
    };
    // `comprobar` es estable a efectos prácticos: solo lee del DOM.
  }, []);

  useFrame(() => {
    if (trasUltimoFotograma.current !== null) clearTimeout(trasUltimoFotograma.current);
    trasUltimoFotograma.current = setTimeout(comprobar, 80);
    const ahora = performance.now();
    if (ahora - ultimaPeriodica.current >= 150) {
      ultimaPeriodica.current = ahora;
      requestAnimationFrame(comprobar);
    }
  });
  return null;
}

function EtiquetasEjes({ ejes }: { ejes: Eje[] }) {
  const [economico, social, territorial] = ejes;
  if (!economico || !social || !territorial) return null;
  /* Posiciones calibradas contra la proyección de la cámara por defecto para
     que ningún polo caiga en mitad de la escena ni se salga del lienzo: los
     del eje territorial van a ras de suelo (el cercano sobre el propio eje,
     el lejano hacia la esquina trasera derecha, despejada). */
  const polo = (eje: Eje, signo: 'negativo' | 'positivo') => poloBreve(poloLlano(eje, signo));
  const etiquetas: Array<{ posicion: [number, number, number]; texto: string }> = [
    { posicion: [1.36, -1, 0], texto: polo(economico, 'positivo') },
    { posicion: [-1.36, -1, 0], texto: polo(economico, 'negativo') },
    { posicion: [0, 1.26, 0], texto: polo(social, 'positivo') },
    { posicion: [0, -1.42, 0], texto: polo(social, 'negativo') },
    { posicion: [0, -0.9, 1.46], texto: polo(territorial, 'positivo') },
    { posicion: [1.08, -1.06, -1.3], texto: polo(territorial, 'negativo') },
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
  desplazamientoEtiqueta,
  sufijoEtiqueta,
  alSeleccionar,
}: {
  datos: PuntoDatos;
  tema: Tema;
  seleccionado: boolean;
  etiquetaVisible: boolean;
  desplazamientoEtiqueta: number;
  sufijoEtiqueta?: string;
  alSeleccionar: (id: string) => void;
}) {
  const invalidate = useThree((estado) => estado.invalidate);
  const [encima, setEncima] = useState(false);
  useEffect(
    () => () => {
      document.body.style.cursor = '';
    },
    [],
  );
  const esUsuario = datos.tipo === 'usuario';
  const destacado = esUsuario || seleccionado || encima;
  /* Tinta ligeramente levantada hacia el papel: el sombreado de la esfera
     necesita margen para leerse (una esfera 100 % tinta parece un disco). */
  const color = destacado ? tema.acento : mezclarHex(tema.tinta, tema.papel, 0.18);
  const alPulsar = (evento: { stopPropagation: () => void }) => {
    evento.stopPropagation();
    alSeleccionar(datos.id);
    invalidate();
  };
  const alEntrar = (evento: { stopPropagation: () => void }) => {
    evento.stopPropagation();
    setEncima(true);
    document.body.style.cursor = 'pointer';
  };
  const alSalir = () => {
    setEncima(false);
    document.body.style.cursor = '';
  };
  return (
    <group position={datos.posicion}>
      {datos.tipo === 'referencia' ? (
        <mesh
          onClick={alPulsar}
          onPointerOver={alEntrar}
          onPointerOut={alSalir}
          scale={seleccionado ? 1.2 : 1}
        >
          <octahedronGeometry args={[0.085, 0]} />
          <meshBasicMaterial color={color} wireframe />
        </mesh>
      ) : (
        <mesh
          onClick={alPulsar}
          onPointerOver={alEntrar}
          onPointerOut={alSalir}
          scale={seleccionado && !esUsuario ? 1.18 : 1}
        >
          {/* El tamaño en pantalla decrece con la profundidad (cámara en
              perspectiva): pista redundante junto a la niebla. */}
          <sphereGeometry args={[esUsuario ? 0.08 : 0.055, 32, 24]} />
          <meshStandardMaterial
            color={color}
            roughness={0.42}
            metalness={0.05}
            emissive={destacado ? tema.acento : '#000000'}
            emissiveIntensity={esUsuario ? 0.5 : destacado ? 0.3 : 0}
          />
        </mesh>
      )}
      {esUsuario ? (
        /* Aura tenue: «Tú» brilla ligeramente en carmín. */
        <mesh raycast={ignorarRaycast}>
          <sphereGeometry args={[0.14, 24, 16]} />
          <meshBasicMaterial
            color={tema.acento}
            transparent
            opacity={0.18}
            depthWrite={false}
          />
        </mesh>
      ) : null}
      {etiquetaVisible || encima ? (
        <Html
          position={[0, desplazamientoEtiqueta, 0]}
          center
          occlude
          zIndexRange={esUsuario ? [20, 11] : [10, 0]}
          className={`cubo3d-etiqueta${destacado ? ' cubo3d-etiqueta--destacada' : ''}`}
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

/**
 * Anticolisión simple y determinista de etiquetas: cada rótulo prueba niveles
 * verticales alternados (arriba/abajo, cada vez más lejos) hasta encontrar
 * uno que no choque con los ya colocados en su vecindad horizontal. La
 * separación vertical (0.26 unidades de mundo) deja sitio a rótulos de
 * referencias doctrinales partidos en dos o tres líneas. El usuario va
 * primero en la lista de puntos, así que conserva el puesto junto a su
 * esfera.
 */
const NIVELES_ETIQUETA = [0.16, -0.22, 0.48, -0.54, 0.8, -0.86, 1.12];

function calcularDesplazamientos(
  puntos: PuntoDatos[],
  visibles: ReadonlySet<string>,
): Map<string, number> {
  const resultado = new Map<string, number>();
  const colocadas: Array<{ x: number; z: number; centroY: number }> = [];
  const RADIO_HORIZONTAL = 0.55;
  const SEPARACION_VERTICAL = 0.3;
  for (const punto of puntos) {
    if (!visibles.has(punto.id)) continue;
    const [px, py, pz] = punto.posicion;
    let elegido = NIVELES_ETIQUETA[0] ?? 0.16;
    for (const nivel of NIVELES_ETIQUETA) {
      const centroY = py + nivel;
      const choca = colocadas.some(
        (otra) =>
          Math.hypot(otra.x - px, otra.z - pz) < RADIO_HORIZONTAL &&
          Math.abs(otra.centroY - centroY) < SEPARACION_VERTICAL,
      );
      if (!choca) {
        elegido = nivel;
        break;
      }
    }
    resultado.set(punto.id, elegido);
    colocadas.push({ x: px, z: pz, centroY: py + elegido });
  }
  return resultado;
}

export default function Mapa3D({ ejes, valoresUsuario, usuarioProvisional, entidades }: Props) {
  const tema = useTema();
  const menosMovimiento = usePrefiereMenosMovimiento();
  const pantallaEstrecha = usePantallaEstrecha();
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [interactuando, setInteractuando] = useState(false);
  const soportaWebGL = useMemo(hayWebGL, []);
  const grupoRef = useRef<THREE.Group>(null);

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

  /* Con una selección activa la escena se concentra en el punto elegido y
     sus vecinos: los rótulos permanentes de las referencias se retiran para
     no chocar con los de los vecinos (que llevan su distancia). */
  const etiquetasVisibles = new Set<string>();
  for (const punto of puntos) {
    if (
      punto.tipo === 'usuario' ||
      (punto.tipo === 'referencia' && seleccion === null) ||
      punto.id === seleccion ||
      idsVecinos.has(punto.id)
    ) {
      etiquetasVisibles.add(punto.id);
    }
  }
  const desplazamientos = calcularDesplazamientos(puntos, etiquetasVisibles);

  if (!soportaWebGL) {
    return (
      <p className="aviso-cobertura" role="status">
        Este navegador no puede mostrar el cubo 3D (WebGL no disponible). El mapa 2D superior
        contiene la misma información por pares de ejes.
      </p>
    );
  }

  const oscilar = !menosMovimiento && !interactuando && seleccion === null;
  const colorNiebla = mezclarHex(tema.papel, tema.superficie, 0.5);
  /* En pantallas estrechas la cámara arranca más lejos: el cubo respira y
     los rótulos de polos no se salen del lienzo. */
  const camaraInicial: [number, number, number] =
    pantallaEstrecha ? [3.45, 2.55, 4.2] : [2.85, 2.1, 3.45];

  return (
    <div className="cubo3d">
      <div className="cubo3d__lienzo" aria-hidden="true">
        <Canvas
          frameloop="demand"
          // Colores exactos de la maqueta: sin tone mapping cinematográfico.
          flat
          // Equivale a setPixelRatio(Math.min(devicePixelRatio, 2)).
          dpr={Math.min(window.devicePixelRatio || 1, 2)}
          gl={{
            antialias: (window.devicePixelRatio || 1) < 2,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          /* Ligeramente elevada: el suelo con rejilla queda visible y los
             rótulos de polos inferiores no se salen del lienzo. */
          camera={{ position: camaraInicial, fov: 42 }}
          onPointerMissed={() => setSeleccion(null)}
        >
          {/* Niebla suave calibrada al fondo: pista de profundidad. */}
          <fogExp2 attach="fog" args={[colorNiebla, 0.085]} />
          <ambientLight intensity={0.95} />
          <directionalLight position={[2.5, 4, 3]} intensity={1.45} />
          <directionalLight position={[-3, -1.5, -2.5]} intensity={0.45} />
          <GrupoOscilante activo={oscilar} grupoRef={grupoRef}>
            <Estructura tema={tema} />
            <EtiquetasEjes ejes={ejes} />
            {puntos.map((punto) => {
              const distanciaVecino = idsVecinos.get(punto.id);
              const esVecino = distanciaVecino !== undefined;
              const seleccionado = punto.id === seleccion;
              return (
                <Punto
                  key={punto.id}
                  datos={punto}
                  tema={tema}
                  seleccionado={seleccionado}
                  etiquetaVisible={etiquetasVisibles.has(punto.id)}
                  desplazamientoEtiqueta={desplazamientos.get(punto.id) ?? 0.15}
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
          <TransicionCamara
            punto={puntoSeleccionado?.posicion ?? null}
            grupo={grupoRef}
            inmediata={menosMovimiento}
          />
          <AnticolisionPolos />
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

      <div className="cubo3d__ayuda">
        <span>
          Arrastra para girar, rueda o pellizco para acercar, toca un punto para ver sus
          vecinos más próximos. La rotación se pausa al interactuar
          {menosMovimiento ? ' y está desactivada por tu preferencia de menos movimiento' : ''}
          .
        </span>{' '}
        <AyudaEjes ejes={ejes} etiqueta="Qué mide cada eje del cubo, con su nombre académico" />
      </div>

      {puntoSeleccionado ? (
        <div className="mapa-lectura" role="status">
          <p className="mapa-lectura__titular">
            <strong>{puntoSeleccionado.nombre}.</strong>{' '}
            {puntoSeleccionado.tipo !== 'usuario' ? (
              <span className="mapa-lectura__tipo">
                {puntoSeleccionado.tipo === 'referencia'
                  ? 'Referencia doctrinal, no votable.'
                  : 'Partido.'}
              </span>
            ) : null}
          </p>
          <LecturaEjes
            ejes={ejes}
            valores={puntoSeleccionado.valores}
            nombreCorto={NOMBRE_CORTO_EJE}
          />
          <p className="mapa-lectura__distancia">
            {vecinos.length > 0
              ? `Vecinos más próximos (distancia euclídea sobre los tres ejes, orientativa): ${vecinos
                  .map((vecino) => `${vecino.punto.nombre} (d ${Math.round(vecino.distancia)})`)
                  .join(' · ')}.`
              : 'No hay otros puntos con evidencia suficiente con los que medir cercanía.'}
          </p>
        </div>
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
              {idsEjes.map((id, i) => (
                <td
                  key={id}
                  className="celda-valor"
                  title={ejes[i] ? lecturaEjeConNumero(valoresUsuario[id] as number, ejes[i]) : undefined}
                >
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
                {idsEjes.map((id, i) => (
                  <td
                    key={id}
                    className="celda-valor"
                    title={ejes[i] ? lecturaEjeConNumero(entidad.valores[id] ?? 0, ejes[i]) : undefined}
                  >
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
