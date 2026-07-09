# Metodología

Este documento fija las decisiones metodológicas del proyecto y su justificación. La transparencia metodológica no es opcional en un VAA: publicar el algoritmo y los datos de posiciones es parte del estándar del campo (Declaración de Lausana sobre VAAs).

## 1. Escala de respuesta

Likert de 5 puntos: Muy en desacuerdo (−2), En desacuerdo (−1), Neutral (0), De acuerdo (+1), Muy de acuerdo (+2), **más una opción «sin opinión» separada**.

Por qué: la escala de 3 puntos del Wahl-O-Mat discrimina poco entre partidos cercanos; la de 5 es el estándar de EU&I/euandi. Y la literatura sobre VAAs muestra que los usuarios usan el punto medio para expresar desconocimiento o rechazo del marco de la pregunta, no solo neutralidad genuina: separar «neutral» (posición real, cuenta) de «sin opinión» (se excluye del cálculo) mejora la validez.

## 2. Matching: distancia city-block normalizada y ponderada

Para el ranking de partidos:

```
afinidad(u, p) = 100 · (1 − Σᵢ wᵢ·|uᵢ − pᵢ| / (Σᵢ wᵢ · 4))
```

- `uᵢ, pᵢ ∈ {−2..+2}`: respuesta del usuario y posición del partido en el ítem i.
- `wᵢ = 2` si el usuario marcó el ítem como importante; `1` en caso contrario.
- Solo entran ítems con respuesta ≠ «sin opinión» **y** posición del partido conocida.
- `4` es la distancia máxima posible por ítem.

Por qué Manhattan y no euclídea para el ranking: es el método de Wahl-O-Mat y StemWijzer (que abandonó la euclídea), es explicable ítem a ítem —condición necesaria para la vista «por qué coincide»— y no amplifica cuadráticamente desacuerdos puntuales. La literatura (Louwerse & Rosema) muestra que la elección del modelo espacial cambia el consejo para la mayoría de usuarios: por eso el modelo se publica, se justifica y se mantiene estable.

**Cobertura.** `cobertura = ítems comparados / ítems respondidos`. Si es < 0,5 o hay < 10 ítems comparados, el resultado se marca `bajaCobertura` y la interfaz debe mostrarlo con aviso explícito (no ocultarlo: honestidad antes que limpieza estética). Esto es crítico para partidos de nivel `estimada` con pocas posiciones conocidas.

## 3. Mapa ideológico: puntuación por eje

Para cada eje k:

```
ejeₖ = 100 · Σᵢ wᵢ·uᵢ·cᵢₖ / Σᵢ wᵢ·2·|cᵢₖ|
```

donde `cᵢₖ ∈ [−1, 1]` es la carga del ítem i sobre el eje k. Rango −100..+100. Un eje sin ítems respondidos devuelve `null`: no se inventa una posición.

Los seis ejes principales (económico, GAL-TAN, territorial, UE, ecologismo, populismo) están anclados en las dimensiones del Chapel Hill Expert Survey; los sub-ejes (método de cambio, modelo organizativo, moral pública) solo se miden en módulos de profundización.

**Ítems solo-matching** (`ejes: []`): afirmaciones que discriminan fuertemente entre partidos (p. ej. el balance de la URSS separa estalinismo de trotskismo) pero cuya proyección sobre un eje continuo sería forzada. Cuentan para el matching, no para el mapa. Este mecanismo es el que permite granularidad sin inflar el número de ejes.

## 4. Arquitectura modular y desbloqueo

Principio de diseño: **el número de preguntas necesarias crece con las distinciones que se quieren hacer, no con el número de partidos.** Veinte ítems donde los partidos realmente divergen separan más que cien genéricos.

- **Núcleo** (siempre): 35-40 ítems finales que posicionan en los ejes principales. Es el «modo rápido» completo.
- **Módulos por eje**: se desbloquean por posición (economico ≤ −40 → corrientes de la izquierda; ≥ +40 → corrientes de la derecha) y son siempre activables manualmente (`eleccionUsuario`), porque el interés no depende de la posición propia.
- **Módulos por banda de eje** (`eje-banda`): las corrientes que viven en franjas intermedias —socialdemocracia y reformismo (economico ∈ [−60, 5]), centro y liberalismo (economico ∈ [−15, 60])— no pueden desbloquearse con un umbral de extremo. La banda captura al usuario cuya profundización natural no está en los polos. Las bandas se solapan deliberadamente: un usuario en −50 ve tanto «corrientes de la izquierda» como «socialdemocracia», porque esa frontera (¿comunista reformista o socialdemócrata radical?) es exactamente la que el módulo debe resolver.
- **Módulos territoriales**: se activan por la comunidad autónoma del usuario (una o varias: Euskadi y Navarra comparten módulo). El de Canarias sirve de plantilla: REF, insularidad, ultraperiferia, descuento de residente, frontera sur.
- **Módulos transversales**: feminismos y moral pública, y ecologismo/animalismo cortan las familias por dentro (el abolicionismo o la ley trans parten a la izquierda; la caza y la nuclear parten a la derecha y al ecologismo). Se desbloquean con umbrales laxos y quedan siempre disponibles a elección.

Objetivo de banco: 250-400 ítems totales; un usuario en modo completo responde ~90-130. Precedentes de que el público objetivo completa tests largos: PolitiScales (117 ítems), LeftValues.

## 5. Posicionamiento de partidos

Método mixto, por orden de preferencia:

1. **Autoubicación del partido con justificación** (modelo Wahl-O-Mat): se invita a cada partido a responder los ítems y justificar cada respuesta en ≤ 500 caracteres. Resuelve el problema de los partidos sin programa publicado.
2. **Codificación por el equipo con cita textual obligatoria** (modelo EU&I): extracto de programa electoral, voto en el Congreso (datos abiertos de congreso.es) o declaración pública, con URL y fecha. Si autoubicación y codificación discrepan, se pide al partido más apoyo documental antes de fijar el valor.
3. **Estimación etiquetada**: para partidos sin respuesta ni programa, posición inferida de estatutos/manifiestos/actividad pública, marcada `confianza: estimada` y visible como tal en la interfaz.

**La granularidad debe existir en ambos lados.** Si el test tiene ítems de módulo pero las posiciones de partido solo cubren el núcleo, el matching profundo se rompe: dos partidos comunistas contestan igual a «nacionalizar la banca» y divergen en «partido de vanguardia». El cuestionario a partidos y la codificación incluyen siempre los ítems de módulo relevantes para su familia.

**Dichos y hechos: la posición revelada prevalece.** Cuando el programa o la retórica divergen de la conducta (votaciones, acción u omisión de gobierno), la posición se codifica por la **conducta**, y la divergencia se anota en la justificación. Ejemplos del patrón: partidos con retórica de protección social cuyo registro de votos en materia laboral apunta en otra dirección; programas de vivienda ambiciosos con ejecución escasa cuando se gobierna. La fuente `votacion` pesa más que `programa`, y `programa` más que `declaracion`, salvo que la declaración sea más reciente y reiterada. Nunca se codifica desde la caracterización que hacen los adversarios del partido.

**Micropartidos y redes sociales.** Muchos partidos pequeños no publican programa, y posiciones enteras (p. ej. las posturas sobre cuestiones de género de algunos partidos comunistas menores, o las líneas de sus juventudes) solo existen en sus redes o comunicados. La fuente `redes` es citable con URL y fecha (idealmente con captura archivada en web.archive.org, porque las publicaciones se borran). Las posiciones de las organizaciones juveniles (CJC, etc.) sirven como **indicio** para el partido madre, se etiquetan como tales y nunca bastan solas para una posición `verificada`.

El validador (`npm run validate:data`) exige que toda posición de un partido `verificada` lleve justificación o cita.

## 5 bis. Ámbito electoral: generales, autonómicas, municipales y europeas

El mismo banco sirve para cualquier convocatoria; lo que cambia es el **contexto**, no la fórmula:

- `partidosElegibles(partidos, {tipo, ccaa})` decide qué partidos entran en el ranking: en autonómicas y generales, los estatales más los autonómicos/insulares de la comunidad del usuario; en europeas, todos (circunscripción única); en municipales, además los de ámbito local. Es una heurística v1 que la Fase 3 sustituirá por las candidaturas reales de cada convocatoria (infoelectoral).
- **La fórmula de afinidad no cambia jamás con el ámbito**: mismos ítems, misma distancia Manhattan normalizada, mismas puntuaciones de eje. Filtrar partidos no altera la puntuación de ningún otro (la afinidad es por pares usuario–partido, no relativa al conjunto), así que añadir o quitar convocatorias no puede sesgar los resultados.
- En autonómicas, el **módulo territorial** de la comunidad forma parte del núcleo efectivo (no es opcional), porque ahí viven los discriminantes de esa arena (moratoria turística CC/NC, concierto en Euskadi/Navarra, etc.).
- Las **coaliciones** (Sumar, EH Bildu, Por Andalucía, Existe) se modelan con `tipo: "coalicion"` y `componentes: [ids]`: la coalición tiene ficha y posiciones propias (lo que se vota), y cada componente puede tener la suya (lo que se es). El usuario ve la coalición en el ranking electoral y puede desplegar sus componentes en la vista de detalle. Los partidos autonómicos sin representación en el Congreso (Adelante Andalucía, Nación Andaluza, extraparlamentarios de cualquier territorio) entran por la misma vía que los estatales: nivel de confianza según la fuente disponible, sin trato especial.

## 6. Sesgos conocidos y controles

- **Selección de ítems**: Walgrave, Nuytemans y Pepermans (2009) demostraron simulando 500.000 configuraciones que *cualquier* selección de afirmaciones beneficia a algún partido. Controles: elegir ítems donde los partidos realmente divergen, equilibrar temas entre ejes, y documentar en cada PR por qué el ítem discrimina.
- **Polaridad**: formular en positivo («permitir») o negativo («prohibir») altera sistemáticamente las respuestas. Control: campo `polaridad` en cada ítem y equilibrio de signos en el banco (objetivo ~50/50; la semilla actual está sesgada a positiva y debe corregirse al crecer).
- **Punto medio / satisficing**: mitigado con la opción «sin opinión» y con redacción de una sola idea por ítem, sin dobles negaciones.
- **Efecto del modelo espacial**: mitigado publicando fórmulas, código y datos, y no cambiando el modelo entre elecciones sin justificación pública.

## 7. Calibración y mejora continua

1. **Piloto**: banco inicial de ~80 ítems de núcleo en estado `piloto`; tras el piloto se promocionan a `activo` los 35-40 con mejor discriminación y se retiran los redundantes (`retirado`, nunca se borran: trazabilidad).
2. **Análisis de escalas**: Mokken/IRT sobre respuestas **anonimizadas y agregadas** para verificar que los ítems de cada eje escalan juntos (propuesta de Germann & Méndez para VAAs). Si un eje no escala, se rediseñan sus ítems o se retira el eje del mapa (el ranking por % no depende del modelo espacial y sobrevive).
3. **Adaptativo (CAT)**: con parámetros IRT estimados, seleccionar en el modo completo el siguiente ítem más informativo para la zona del espacio donde está el usuario, reduciendo longitud sin perder precisión.
4. **Post-electoral**: recodificación de posiciones tras cada ciclo (programas nuevos, votaciones de la legislatura) con historial versionado en git.
