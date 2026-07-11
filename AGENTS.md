# Acuerdos de trabajo para Espectro

Estas reglas se aplican a todo el repositorio. Su objetivo es permitir trabajo paralelo sin perder trazabilidad política, cambios del usuario ni estabilidad técnica.

## Fuente de verdad

- `docs/TODO-MAPEO-EXHAUSTIVO.md` es el cierre nominal. Ningún resumen numérico sustituye sus casillas.
- Una casilla solo se marca cuando cumple literalmente su criterio y las pruebas asociadas pasan.
- El agente raíz/integrador conserva requisitos, decisiones y revisión final. Los subagentes devuelven resultados destilados, no vuelcan logs extensos al hilo principal.

## Delegación

- Delegar únicamente tareas independientes, concretas y acotadas por archivos o por lectura.
- Preferir subagentes de solo lectura para investigación, exploración, triage, pruebas y revisión adversarial.
- Cada tarea de escritura declara antes de empezar: archivos permitidos, archivos prohibidos, validaciones y formato de entrega.
- Dos agentes no editan el mismo archivo en paralelo. Los archivos calientes (`Resultados.tsx`, `estilos.css`, `mapa-ideologias.json`, esquemas, validadores y este TODO) tienen un solo escritor por tanda.
- Si un agente detecta cambios concurrentes en un archivo de su ámbito, se detiene y avisa; nunca sobrescribe, restaura o resuelve por intuición.
- La herramienta de subagentes no crea por sí sola un worktree. Antes de autorizar escritura, el integrador registra `git rev-parse --show-toplevel`, `git rev-parse HEAD` y `git status --porcelain`, o documenta que los archivos son estrictamente disjuntos en el árbol compartido.

## Aislamiento de escritores

- A partir de un árbol limpio, dos tareas de escritura paralelas deben usar ramas/worktrees distintos. La alternativa excepcional es una asignación de archivos completamente disjunta y registrada por el integrador.
- Cada worktree usa una rama `agent/<tarea>` basada en el mismo SHA. No se reutiliza una rama ya abierta en otro worktree.
- Un subagente no hace push a `main`, no fuerza pushes y no integra otras ramas. Solo el integrador publica después de revisar.
- No se crean worktrees a mitad de una tanda con cambios sin commit: primero se integra o se descarta conscientemente la tanda existente.

## Entrega de un subagente

La entrega incluye siempre:

1. objetivo cumplido y decisiones tomadas;
2. lista exacta de archivos modificados;
3. comandos y resultados de validación;
4. riesgos, huecos y supuestos no resueltos;
5. ausencia expresa de commit/push salvo autorización específica.

Un commit de entrega dentro de un worktree puede hacerse tras las pruebas focales y nunca se empuja. Es distinto del commit integrador: este solo se crea después de la revisión adversarial y la matriz global. El integrador inspecciona el diff y puede aplicar el commit completo o rechazarlo; no mezcla silenciosamente fragmentos incompatibles.

Para integrar un worktree, el árbol destino debe estar limpio. Se revisan `git show --stat --oneline <sha>` y `git diff --check <sha>^!` antes de `git cherry-pick <sha>`. Ante un conflicto inesperado se ejecuta `git cherry-pick --abort`; no se improvisan resoluciones sobre archivos calientes. Al cerrar: `git worktree remove <ruta>`, `git worktree prune` y, solo después de integrar, `git branch -d agent/<tarea>`.

## Revisión integradora obligatoria

Antes de cualquier commit o push de una tanda:

1. esperar a que todos los subagentes solicitados estén completados, cancelados o fallidos con el motivo documentado;
2. revisar `git status`, `git diff --check`, diff por archivo y solapamientos;
3. ejecutar revisión adversarial independiente sobre lógica, metodología, privacidad, accesibilidad y móvil según el alcance;
4. comprobar durante el trabajo el inventario con `npm run validate:todo-inventory` y, como puerta de publicación, el cierre real con `npm run validate:todo`;
5. ejecutar datos, auditorías políticas, TypeScript raíz/web, Vitest, build, presupuesto y Playwright;
6. inspeccionar visualmente el build real en escritorio y móvil cuando cambie interfaz;
7. documentar advertencias no bloqueantes sin convertirlas en éxitos.

No se publica si una prueba requerida falla, si el árbol contiene cambios de procedencia desconocida o si un P0 nominal afectado sigue abierto.

## Datos políticos

- No mover, ocultar ni centrar un partido para compensar evidencia insuficiente. Se completa su ficha con fuentes y valores matizados.
- No inventar posiciones por familia, coalición, sucesión o estereotipo. Programa, conducta y periodo permanecen separados.
- Toda corriente real de la imagen debe ser localizable en la capa adecuada. Solo meme, ficción o no-concepto se excluye, individualmente y con justificación.
- Una coordenada extrema exige evidencia plural y contraejemplos/moderadoras cuando existan.
- Preguntas y perfiles se versionan; un cambio semántico del instrumento obliga a revisar migración y resultados compartidos.
- **Norma dura del atlas ideológico.** El cuadrante de corrientes doctrinales (plano Economía×Sociedad y los tres cruces de ejes, con las ideologías nombradas, los desplegables y el punto del usuario) es la vista canónica y solo puede crecer. Toda expansión mejora su claridad y añade ideologías con evidencia; está prohibido sustituirlo por una vista más pobre, esconderlo tras la vista por defecto, reducir las corrientes dibujadas o degradar su legibilidad. Un cambio que muestre menos ideologías o menos claridad que antes se revierte de inmediato. No va a menos.

## GitHub

- `main` se trata como rama protegida: PR/revisión y checks requeridos para las siguientes integraciones. Mientras GitHub no tenga la regla activada, esto es una norma de proceso y no una barrera técnica.
- La rama de trabajo recibe primero la tanda auditada. `main` solo avanza desde un SHA ya validado.
- No se marcan conversaciones como resueltas ni casillas como terminadas para conseguir un merge.
