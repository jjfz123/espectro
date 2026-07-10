# Diseño web editorial: rasgos anti-IA, tipografía, paletas, UX de cuestionarios, SVG accesible y rendimiento

Fecha de corte: 10 de julio de 2026.
Origen: investigación profunda automatizada (104 subagentes, 5 ángulos, 23 fuentes, 63 afirmaciones candidatas). Verificación adversarial: **15 confirmadas (3-0), 3 refutadas (0-3 o 1-2), 7 sin verificar** por límite de sesión. Solo lo confirmado se presenta como hallazgo.

## 1. Síntesis ejecutiva

El hallazgo más útil de esta tanda es diagnóstico, no prescriptivo: da nombre y origen documentado a los rasgos que hoy delatan una interfaz «hecha con IA» (paleta índigo/violeta con degradado, Inter como tipografía por defecto, tres tarjetas redondeadas en fila, modo oscuro no solicitado). **La hoja de estilos actual de Espectro (`web/src/estilos.css`) ya evita sistemáticamente los cinco rasgos identificados**: no usa índigo ni degradados, no usa Inter (usa una pila serif de sistema para display + sans de sistema para UI), no hay tarjetas `rounded-2xl` (los `border-radius` del proyecto son de 1-2px, filete editorial), no hay glassmorphism ni sombras decorativas, y el modo oscuro es una alternativa `prefers-color-scheme` completa, no un añadido superficial. Esto no es casualidad: el comentario de cabecera del propio fichero ya declara la dirección de arte («instrumento cívico, maqueta editorial. Papel y tinta, una sola tinta de acento») antes de esta investigación.

El resto de hallazgos confirmados —tipografía autoalojada vs. de sistema, ejemplo premiado de Wahl-O-Mat con acento único, patrones de accesibilidad SVG— **refuerzan decisiones ya tomadas** más que aportar cambios. El área con más recorrido real pendiente es UX de cuestionarios largos y Core Web Vitals 2026, donde esta tanda apenas verificó nada (falló casi todo el ángulo de GOV.UK y de rendimiento en gama baja) y el propio `docs/TODO-PENDIENTES.md` ya tiene un backlog más completo y honesto que lo que esta investigación pudo confirmar.

## 2. Hallazgos confirmados (3-0), con fuente

### 2.1. El origen documentado del «look de IA»

- El creador de Tailwind CSS confirmó públicamente que Tailwind UI puso `bg-indigo-500` como fondo de todos los botones de su librería de componentes: «Me gustaría disculparme formalmente por haber puesto `bg-indigo-500` en todos los botones de Tailwind UI hace cinco años» — [x.com/adamwathan/status/1953510802159219096](https://x.com/adamwathan/status/1953510802159219096).
- El propio autor atribuye la omnipresencia del índigo en interfaces generadas por IA a que ese valor por defecto saturó el código con el que se entrenaron los modelos: «lo que llevó a que toda interfaz generada por IA en el mundo también sea índigo» — misma fuente.
- Dos artículos de diseño de 2026 documentan el mismo fenómeno con más detalle: el degradado azul-a-morado es «el tell de IA más reconocible de 2026», y el «look de IA slop» se define como un conjunto reconocible de rasgos: tipografía Inter, degradados azul-morado, una fila de tres tarjetas redondeadas y layouts de héroe intercambiables — [925studios.co/blog/ai-slop-design-tells](https://www.925studios.co/blog/ai-slop-design-tells) y [vibecodekit.dev/ai-slop-design](https://vibecodekit.dev/ai-slop-design) (este último añade bordes grises de 1px uniformes y modo oscuro no solicitado).

**Importante — dos afirmaciones relacionadas fueron refutadas**, no dar por buenas: que Inter sea el tipo de letra por defecto en «casi cualquier» herramienta de IA (0-3), y que las pilas de fuentes de sistema causen «cero descargas y cero salto de layout» frente a las autoalojadas, en esos términos absolutos (0-3). El diagnóstico del color sí está bien sostenido; el de la tipografía, solo parcialmente.

### 2.2. Tipografía: autoalojar es hoy mayoritario, pero las pilas de sistema siguen siendo válidas

- En 2025, cerca del 72 % de los sitios web sirven al menos un archivo de fuente desde su propio origen, con el autoalojamiento exclusivo creciendo a cerca de un tercio de todos los sitios (desde ~30 % en 2024), mientras Google Fonts cae a ~54 % en escritorio — [almanac.httparchive.org/en/2025/fonts](https://almanac.httparchive.org/en/2025/fonts).
- Las fuentes variables las usa ya ~40 % de los sitios en 2025, pero la mayoría del uso es solo como archivo multi-peso: el eje de grosor se ajusta explícitamente en ~57-61 % de las páginas con fuente variable — misma fuente.
- Modern Font Stacks ofrece pilas CSS listas por clasificación tipográfica, incluidas clases serif editoriales para texto de display: Transitional (basada en Charter), Old Style (Iowan Old Style/Palatino) y Didone (Didot/Bodoni) — [modernfontstacks.com](https://modernfontstacks.com/).

### 2.3. Un ejemplo premiado de instrumento cívico con acento único

- Wahl-O-Mat, la aplicación de afinidad de la Agencia Federal alemana de Educación Cívica, ganó un iF Design Award (categoría Digital Media) — [ifdesign.com/en/winner-ranking/project/wahl-o-mat/81162](https://ifdesign.com/en/winner-ranking/project/wahl-o-mat/81162).
- Su patrón de interacción premiado es exactamente el de un test de afinidad: los partidos se posicionan sobre un conjunto fijo de afirmaciones, el usuario responde a las mismas, y el programa calcula y ordena la proximidad — misma fuente.
- Su identidad visual premiada se basa en **un único color de acento** (diseño «clásico» naranja) con variantes específicas por tipo de elección (autonómica, federal, europea) — misma fuente.

### 2.4. SVG accesible hecho a mano

- Para SVG informativos que necesitan un anuncio descriptivo (por ejemplo, gráficos), el patrón más fiable en pruebas cruzadas de navegador/lector de pantalla fue `<svg>` con `role="img"`, `<title>` + `<desc>`, y `aria-labelledby` apuntando a ambos IDs — [smashingmagazine.com/2021/05/accessible-svg-patterns-comparison](https://www.smashingmagazine.com/2021/05/accessible-svg-patterns-comparison/).
- Los patrones de accesibilidad SVG no son intercambiables: algunos funcionan de forma fiable, otros fallan de forma fiable, y un grupo intermedio solo funciona con limitaciones conocidas — misma fuente. Conclusión operativa: hay que elegir un patrón probado, no improvisar.

## 3. Lo que esta tanda NO pudo verificar (no usar como hecho)

Falló por límite de sesión, no por refutación:

- Los «tells» concretos adicionales del look de IA: modo oscuro permanente como el tell más común, neón cian/violeta con bordes de tarjeta brillantes («firma de v0/Cursor»), glassmorphism con esferas de degradado.
- Que el look genérico se deba a que los modelos convergen en el promedio estadístico de sus datos de entrenamiento (predicción de siguiente token) en vez de comprometerse con una dirección de diseño.
- Que la corrección prescrita sea fijar de antemano las decisiones de diseño (paleta, fuentes, radios, textura, movimiento) en un fichero tipo `DESIGN.md` antes de generar con IA.
- Que el beneficio de caché compartida de Google Fonts ya no exista porque los navegadores modernos particionan la caché HTTP por sitio.
- Que autoalojar sea más rápido y fiable que cargar desde Google Fonts por evitar DNS/latencia adicional.

**Refutada además** (1-2, no confirmada): que el patrón GOV.UK de «step by step navigation» esté explícitamente prohibido dentro de un servicio transaccional como un cuestionario interactivo, en favor del patrón «task list». No usar esta afirmación para justificar un cambio de navegación del cuestionario.

## 4. Acciones concretas para Espectro

| Hallazgo | Estado en el proyecto |
|---|---|
| El índigo/violeta con degradado es el tell nº1 de IA, con origen documentado en Tailwind | **Ya cubierto por completo.** `web/src/estilos.css` no usa índigo, violeta ni degradados de color en ningún selector; el único `linear-gradient` del fichero es una textura de rayas para el estado «sin datos» de una barra (`faceta-barra--vacia`), no un fondo decorativo. La paleta es papel/tinta con un único acento carmín (`--acento: #9b1c31`, `#d9677a` en oscuro). |
| Inter y las tipografías por defecto de IA como tell (parcialmente confirmado, ver arriba) | **Ya cubierto, y de forma más fuerte de lo que exige el hallazgo.** El proyecto no usa Inter en ningún punto: `--serif: 'Iowan Old Style', Georgia, Charter, 'Times New Roman', serif` para titulares y `--sans: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` para UI — ambas son pilas de sistema, sin descarga de fuente alguna. |
| Autoalojar fuentes es hoy la práctica dominante y creciente (72 % de sitios) | **Decisión distinta, pero coherente y no contradicha.** Espectro no autoaloja ni usa Google Fonts: usa una pila de sistema/websafe. La tendencia documentada es sobre *qué hacer si se usa una tipografía propia* (autoalojar en vez de CDN externo); no invalida la alternativa de no descargar ninguna fuente, que sigue siendo la opción de coste cero en payload. No se propone ningún cambio. |
| Modern Font Stacks: clase «Old Style» (Iowan Old Style/Palatino) para serif editorial | **Ya cubierto de facto.** La pila `--serif` del proyecto coincide casi literalmente con la clase Old Style de Modern Font Stacks. Pendiente menor, opcional: documentar en el propio CSS que se sigue esa convención con nombre, por si el equipo quiere referenciarla al añadir una clase display nueva. No es una acción urgente. |
| Wahl-O-Mat: acento único, premiado, con variantes por tipo de elección | **Ya cubierto en el acento único**, no en las variantes. Espectro ya tiene un único acento de marca (carmín) con modo claro/oscuro. **Pendiente: propuesta concreta** (no urgente, no de código aquí) — valorar si conviene una variante de acento o etiqueta visual distinta según el tipo de convocatoria (generales/autonómicas/municipales/europeas) tal como hace Wahl-O-Mat, dado que Espectro ya modela el `tipo` de convocatoria en `src/engine/elecciones.ts`. Es una decisión de producto, no solo de estilos, y debe evaluarse junto con el resto de la interfaz de convocatorias. |
| Patrón SVG accesible probado: `role="img"` + `title` + `desc` + `aria-labelledby` para gráficos descriptivos | **Cubierto con un patrón distinto y adecuado al caso.** `MapaEjes.tsx` (barras divergentes de una sola serie) marca el SVG como `aria-hidden="true"` y expone el valor mediante un `<span aria-label>` de texto adyacente — el patrón «DOM hermano semánticamente equivalente» que ya recomienda `docs/investigacion/ESPACIO-EJES.md`. `MapaPolitico.tsx` (dispersión interactiva de usuario/partidos/referencias) usa `role="group"` + `aria-labelledby`/`aria-describedby` en el contenedor y `role="button"` + `aria-pressed` + `aria-label` por punto — más apropiado que `role="img"` porque los puntos son interactivos y enfocables, no una imagen estática. Ninguna acción urgente; si se añade un gráfico nuevo puramente descriptivo (no interactivo, con varias series), sí conviene usar el patrón `title`+`desc`+`aria-labelledby` verificado por Smashing Magazine en vez de improvisar uno. |
| Bordes grises de 1px uniformes y tarjetas `rounded-2xl` como tell de IA | **Ya evitado.** Los `border-radius` del proyecto son de 1-2px (filete editorial, no tarjeta redondeada de app); no hay un sistema de tarjetas con sombra uniforme. |
| Rendimiento web/móvil: presupuesto de bundle, Core Web Vitals 2026 | **Parcialmente cubierto, con trabajo propio más completo que esta investigación.** `docs/TODO-PENDIENTES.md` ya documenta la división de bundle hecha (1.034 kB → 352 kB minificados, gzip 245 kB → 102 kB; catálogos en un chunk perezoso de 505 kB / gzip 93 kB) y dos tareas P1 explícitamente pendientes: «Ejecutar auditoría Lighthouse y accesibilidad con lector de pantalla» y pruebas E2E/visuales. Esta investigación no verificó nada nuevo sobre Core Web Vitals 2026 ni gama baja (todo ese ángulo quedó sin confirmar); no cambia la prioridad ya fijada en el TODO. |
| UX validada para cuestionarios largos multi-paso (progreso, guardado, Likert táctil) | **Ya implementado en lo esencial.** `BarraProgreso.tsx` usa `role="progressbar"` con `aria-valuemin/max/now` y segmentos por módulo; `Likert.tsx` usa `fieldset`/`legend` y radios reales (no botones falsos) con «sin opinión» separada; `estado.ts` persiste el progreso en `localStorage` y permite reanudar. El patrón GOV.UK de step-by-step (citado por la investigación pero no confirmado su rechazo explícito) no se usó como base ni a favor ni en contra; no hay acción derivada. Pendiente ya conocido y no nuevo: pruebas E2E de teclado/recarga (`docs/TODO-PENDIENTES.md`, P1). |

## 5. Nota de honestidad metodológica

De los 15 hallazgos confirmados, la mitad son diagnóstico puro (qué delata una interfaz de IA) y la otra mitad son citas que refuerzan un diseño ya construido antes de esta investigación. No se ha encontrado ninguna contradicción entre lo confirmado y `web/src/estilos.css` o los componentes existentes. El área donde esta tanda rindió menos —rendimiento en gama baja, Core Web Vitals 2026, patrones GOV.UK— coincide con la que ya tiene un backlog propio más honesto en `docs/TODO-PENDIENTES.md`; no se propone sustituir ese backlog, solo se deja constancia de que esta investigación no lo amplía.
