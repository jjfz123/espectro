import { URL_REPOSITORIO } from '../datos';

interface Props {
  alVolver: () => void;
  alBorrarDatos: () => void;
}

export function Metodologia({ alVolver, alBorrarDatos }: Props) {
  return (
    <div className="contenedor">
      <p className="kicker">Documentación</p>
      <h1 className="titular" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.4rem)' }}>
        Metodología y privacidad
      </h1>
      <p className="entradilla" style={{ fontSize: '1.05rem' }}>
        Resumen de las decisiones metodológicas y de protección de datos del proyecto. La
        versión completa, con sus justificaciones y referencias, está en el repositorio
        público.
      </p>

      <section className="seccion prosa">
        <h2>La escala de respuesta</h2>
        <p>
          Likert de 5 puntos —de «Muy en desacuerdo» (−2) a «Muy de acuerdo» (+2)— más una
          opción «sin opinión» separada. El punto neutral es una posición real y cuenta para
          el cálculo; «sin opinión» expresa que no tienes postura y se excluye. La literatura
          sobre VAAs muestra que confundir ambas cosas en el punto medio degrada la validez
          del test. Cada ítem puede marcarse además como importante: pesa el doble al comparar
          organizaciones, pero no desplaza tu perfil ideológico personal.
        </p>
      </section>

      <section className="seccion prosa">
        <h2>Cómo se calcula la afinidad</h2>
        <p>
          Distancia city-block (Manhattan) normalizada y ponderada, el método del Wahl-O-Mat
          alemán y del StemWijzer neerlandés:
        </p>
        <code className="formula">afinidad = 100 · (1 − Σ wᵢ·|uᵢ − pᵢ| / (Σ wᵢ · 4))</code>
        <p>
          donde <em>uᵢ</em> es tu respuesta, <em>pᵢ</em> la posición del partido y{' '}
          <em>wᵢ</em> vale 2 si marcaste el ítem como importante. Se eligió por ser
          transparente y explicable ítem a ítem —la vista «por qué coincide» es parte del
          contrato del proyecto— y por no amplificar cuadráticamente desacuerdos puntuales.
        </p>
        <p>
          Solo entran los ítems donde hay respuesta tuya y posición conocida del partido. La
          proporción de tus respuestas que el partido cubre es la <strong>cobertura</strong>;
          si baja del 50 % o hay menos de 10 ítems comparables, el resultado se marca con un
          aviso de baja cobertura que la interfaz nunca oculta.
        </p>
      </section>

      <section className="seccion prosa">
        <h2>El mapa ideológico</h2>
        <p>
          Cada eje puntúa de −100 a +100 agregando tus respuestas según la carga de cada ítem
          sobre ese eje:
        </p>
        <code className="formula">facetaₖ = 100 · Σ uᵢ·cᵢₖ / Σ 2·|cᵢₖ|</code>
        <p>
          Cada faceta conserva sus polos, su número de respuestas y su cobertura; no se reduce
          todo a un único eje izquierda–derecha. Un eje sin ítems respondidos devuelve «sin
          datos» y una medida con poca evidencia se marca como provisional. Existen además
          ítems «solo-matching» que separan razones o propuestas concretas sin forzarlas a una
          geometría lineal.
        </p>
      </section>

      <section className="seccion prosa">
        <h2>Módulos y desbloqueo</h2>
        <p>
          El principio de diseño del banco: las preguntas necesarias crecen con las
          distinciones que se quieren hacer, no con el número de partidos. Un núcleo común
          posiciona en los ejes; los módulos hacen las preguntas que separan corrientes
          vecinas (¿vanguardia o consejos?, ¿derecha confesional o liberal?). Se desbloquean
          por tu posición en un eje, por franjas intermedias o por tu comunidad autónoma, y
          todos pueden activarse a mano: el desbloqueo sugiere, no restringe.
        </p>
      </section>

      <section className="seccion prosa">
        <h2>Posiciones de partidos y honestidad</h2>
        <p>
          Cada posición de partido lleva justificación y cita de fuente, con tres niveles de
          confianza visibles en la interfaz: <strong>verificada</strong> (autoubicación del
          partido o codificación con cita documental), <strong>estimada</strong> (inferida
          por el equipo y etiquetada como tal) y <strong>sin datos</strong> (el partido se
          lista, pero no se puntúa). Nunca se inventa una posición. Cuando dichos y hechos
          divergen, la posición se codifica por la conducta (votaciones, acción de gobierno)
          y la divergencia se anota.
        </p>
        <p>
          Partido y candidatura son objetos distintos. El catálogo electoral se construye a
          partir de convocatorias fechadas, resultados oficiales y un umbral declarado; una
          coalición no transmite automáticamente sus posiciones a sus componentes. Los
          perfiles ficticios usados por las pruebas no entran en el producto.
        </p>
        <p>
          Para partidos donde importa la distancia entre lo prometido y lo ejecutado se
          muestran dos marcadores: programa o posición oficial, y conducta, votaciones o
          discurso recientes. Las capas no se promedian y la segunda no rellena sus huecos con
          la primera. Los compromisos se auditan uno a uno como cumplidos, parciales,
          bloqueados, incumplidos o todavía no evaluables; no se inventa un porcentaje global
          de cumplimiento.
        </p>
      </section>

      <section className="seccion prosa">
        <h2>Privacidad por diseño</h2>
        <p>
          Las opiniones políticas son una categoría especial de datos (art. 9 RGPD). En
          España, además, el art. 9.1 de la LOPDGDD establece que el solo consentimiento no
          basta cuando la finalidad principal del tratamiento es identificar la ideología, y
          eso es exactamente lo que hace un test de afinidad. La consecuencia arquitectónica
          es radical: <strong>no se tratan las respuestas en ningún servidor</strong>.
        </p>
        <ul>
          <li>
            Todo el cálculo ocurre en tu navegador. La página descarga datos públicos (ítems
            y posiciones de partidos); tus respuestas nunca salen de tu dispositivo.
          </li>
          <li>Sin cuentas, sin cookies de terceros, sin analítica ni rastreadores.</li>
          <li>
            El progreso se guarda solo en el almacenamiento local de tu navegador, con
            botón de borrado siempre visible.
          </li>
          <li>
            El código es libre (AGPL-3.0): cualquier despliegue derivado está obligado a
            publicar el suyo, lo que hace auditable que nadie añada perfilado en silencio.
          </li>
        </ul>
        <p>
          <button type="button" className="boton boton--secundario" onClick={alBorrarDatos}>
            Borrar mis datos guardados en este navegador
          </button>
        </p>
      </section>

      <section className="seccion prosa">
        <h2>Transparencia</h2>
        <p>
          Publicar el algoritmo, los datos y sus fuentes es parte del estándar del campo
          (Declaración de Lausana sobre VAAs). El motor de cálculo, el banco de ítems, las
          posiciones con sus citas y estos documentos completos están en{' '}
          <a href={URL_REPOSITORIO} rel="noopener noreferrer" target="_blank">
            el repositorio del proyecto
          </a>
          , en particular <code>docs/METODOLOGIA.md</code> y <code>docs/PRIVACIDAD.md</code>.
        </p>
      </section>

      <div className="acciones">
        <button type="button" className="boton" onClick={alVolver}>
          Volver
        </button>
      </div>
    </div>
  );
}
