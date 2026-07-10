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

## 3. Perfil ideológico: puntuación por faceta

Para cada eje k:

```
facetaₖ = 100 · Σᵢ uᵢ·cᵢₖ / Σᵢ 2·|cᵢₖ|
```

donde `cᵢₖ ∈ [−1, 1]` es la carga del ítem i sobre la faceta k. Rango −100..+100. La prioridad declarada (`wᵢ`) no interviene aquí: importa al comparar partidos o sindicatos, pero no debe mover la identidad política de la persona. Una faceta sin ítems respondidos devuelve `null`: no se inventa una posición.

Los seis ejes principales (económico, GAL-TAN, territorial, UE, ecologismo, populismo) parten de dimensiones comparables con CHES. El modo exhaustivo añade facetas que no deben colapsarse en izquierda/derecha: método de cambio, pluralismo institucional, formas de decisión, poder laboral, estatismo, religión y libertad de conciencia, nuclear civil, uso de fuerza, armas nucleares y otras. Todas son escalas **exploratorias** hasta completar entrevistas cognitivas y calibración.

**Jerarquía del resultado.** El mapa personal es anterior e independiente de cualquier partido. Una persona puede quedar cerca de un arquetipo doctrinal —por ejemplo, anarcocapitalismo, consejismo o ecologismo pronuclear— aunque ninguna candidatura disponible lo represente. La interfaz muestra primero facetas y cobertura, después el razonamiento pregunta → faceta y solo al final organizaciones comparables. Un eje sin evidencia suficiente queda `null`; no se rellena con cero ni con el partido más próximo.

**Ítems solo-matching** (`ejes: []`): afirmaciones que discriminan fuertemente entre partidos (p. ej. el balance de la URSS separa estalinismo de trotskismo) pero cuya proyección sobre un eje continuo sería forzada. Cuentan para el matching, no para el mapa. Este mecanismo es el que permite granularidad sin inflar el número de ejes.

**Ítems solo-mapa** (`uso: "solo-mapa"`): anclas doctrinales o límites no electorales que pueden describir al usuario, pero que el validador prohíbe usar para recomendar partidos o sindicatos reales. Evitan fabricar una posición partidaria para llenar una casilla extrema.

**Mapa del espectro (2D/3D) y umbral de evidencia de entidades.** El mapa cruza los tres macro-ejes con respaldo académico (económico × GAL-TAN × territorial; ver docs/investigacion/ESPACIO-EJES.md) y sitúa a usuario, partidos y referencias doctrinales **con el mismo instrumento** (`proyectarEnEspacio` pasa las posiciones documentadas por `calcularFacetas`). La vara de evidencia difiere: al usuario se le mide contra lo que ha recorrido (cobertura relativa); a una entidad, contra un mínimo absoluto de posiciones documentadas con carga en el eje (≥4 por eje, `UMBRAL_EVIDENCIA_ENTIDADES`), porque exigirle un porcentaje de toda la carga del banco la excluiría siempre. Una entidad sin evidencia suficiente en algún eje **no se dibuja** y el mapa declara cuántas quedaron fuera y por qué; la interfaz muestra el número de ítems que sostiene cada punto.

**Equifinalidad y motivos.** Una misma respuesta puede proceder de razones incompatibles: «los impuestos son un robo» puede expresar propiedad individual absoluta, crítica socialista a la propiedad, autogestión fiscal o protesta por el uso concreto del gasto. La pregunta de entrada no carga un eje; activa seguimientos de motivo. Los seguimientos no deben multiplicar el peso del tema: antes del lanzamiento se sustituirán los grupos Likert provisionales por selección principal + confirmación contrastiva o por normalización de grupo.

## 4. Arquitectura modular y desbloqueo

Principio de diseño: **el número de preguntas necesarias crece con las distinciones que se quieren hacer, no con el número de partidos.** Veinte ítems donde los partidos realmente divergen separan más que cien genéricos.

- **Núcleo** (siempre): exactamente 50 preguntas generales que posicionan en los ejes principales. El modo rápido termina en un perfil provisional y permite continuar al exhaustivo conservando respuestas.
- **Módulos por eje**: se desbloquean por posición (economico ≤ −40 → corrientes de la izquierda; ≥ +40 → corrientes de la derecha) y son siempre activables manualmente (`eleccionUsuario`), porque el interés no depende de la posición propia.
- **Módulos por banda de eje** (`eje-banda`): las corrientes que viven en franjas intermedias —socialdemocracia y reformismo (economico ∈ [−60, 5]), centro y liberalismo (economico ∈ [−15, 60])— no pueden desbloquearse con un umbral de extremo. La banda captura al usuario cuya profundización natural no está en los polos. Las bandas se solapan deliberadamente: un usuario en −50 ve tanto «corrientes de la izquierda» como «socialdemocracia», porque esa frontera (¿comunista reformista o socialdemócrata radical?) es exactamente la que el módulo debe resolver.
- **Módulos territoriales**: se activan por la comunidad autónoma del usuario (una o varias: Euskadi y Navarra comparten módulo). El de Canarias sirve de plantilla: REF, insularidad, ultraperiferia, descuento de residente, frontera sur.
- **Módulos transversales**: feminismos y moral pública, y ecologismo/animalismo cortan las familias por dentro (el abolicionismo o la ley trans parten a la izquierda; la caza y la nuclear parten a la derecha y al ecologismo). Se desbloquean con umbrales laxos y quedan siempre disponibles a elección.

El banco puede superar el recorrido de una persona: los módulos, condiciones y retiradas evitan responderlo entero. La duración se calcula con preguntas realmente visibles y se comunica antes de continuar. Que existan tests largos no sustituye las pruebas de abandono y comprensión del piloto.

## 5. Posicionamiento de partidos

Método mixto, por orden de preferencia:

1. **Autoubicación del partido con justificación** (modelo Wahl-O-Mat): se invita a cada partido a responder los ítems y justificar cada respuesta en ≤ 500 caracteres. Resuelve el problema de los partidos sin programa publicado.
2. **Codificación por el equipo con cita textual obligatoria** (modelo EU&I): extracto de programa electoral, voto en el Congreso (datos abiertos de congreso.es) o declaración pública, con URL y fecha. Si autoubicación y codificación discrepan, se pide al partido más apoyo documental antes de fijar el valor.
3. **Estimación etiquetada**: para partidos sin respuesta ni programa, posición inferida de estatutos/manifiestos/actividad pública, marcada `confianza: estimada` y visible como tal en la interfaz.

**La granularidad debe existir en ambos lados.** Si el test tiene ítems de módulo pero las posiciones de partido solo cubren el núcleo, el matching profundo se rompe: dos partidos comunistas contestan igual a «nacionalizar la banca» y divergen en «partido de vanguardia». El cuestionario a partidos y la codificación incluyen siempre los ítems de módulo relevantes para su familia.

**Programa, voto y conducta no son intercambiables.** Una tesis normativa se codifica primero con el programa o autoubicación vigente; una tesis sobre una votación se codifica con el registro parlamentario. Para PSOE, PP, VOX y Sumar —y cualquier otro caso donde la evidencia lo justifique— `dobleLectura` conserva dos marcadores: programa/posición oficial y conducta, votaciones o discurso recientes. No se promedian. La capa observada solo contiene posiciones con evidencia propia y nunca rellena sus huecos desde el programa. El ranking declara qué marcador ordena y la vista «por qué coincide» enseña las dos tablas.

Los compromisos gubernamentales se auditan ítem por ítem como `cumplido`, `parcial`, `bloqueado`, `incumplido` o `no-evaluable`. Un bloqueo parlamentario no es lo mismo que renunciar a un compromiso, y una declaración no equivale a una ley ejecutada. No se publica un porcentaje agregado de «programa cumplido» salvo que exista un protocolo de codificación completo, predefinido y reproducible.

Cada posición guarda calidad de evidencia propia, título, URL, fecha de la fuente y fecha de consulta. La confianza global de una organización no convierte sus casillas desconocidas en neutrales. Los perfiles declaran además actividad y fecha de revisión para no presentar una escisión histórica o marca inactiva como candidatura actual.

**Micropartidos y redes sociales.** Muchos partidos pequeños no publican programa, y posiciones enteras (p. ej. las posturas sobre cuestiones de género de algunos partidos comunistas menores, o las líneas de sus juventudes) solo existen en sus redes o comunicados. La fuente `redes` es citable con URL y fecha (idealmente con captura archivada en web.archive.org, porque las publicaciones se borran). Las posiciones de las organizaciones juveniles (CJC, etc.) sirven como **indicio** para el partido madre, se etiquetan como tales y nunca bastan solas para una posición `verificada`.

El validador (`npm run validate:data`) exige que toda posición `verificada` lleve justificación, calidad de evidencia y fuente titulada, enlazada y con fecha de consulta. La fecha de publicación se conserva con la precisión real cuando existe; no se sustituye fraudulentamente por la fecha de consulta. También rechaza claves JSON duplicadas, posiciones sobre ítems retirados y usos partidistas de anclas `solo-mapa`.

## 5 bis. Ámbito electoral: generales, autonómicas, municipales y europeas

El mismo banco sirve para cualquier convocatoria; lo que cambia es el **contexto**, no la fórmula:

- `seleccionarPartidosElectorales(partidos, convocatorias, {tipo, ccaa})` busca primero la última convocatoria versionada aplicable. Las candidaturas entran por el umbral declarado del 0,02 % o por una excepción explícita (`historica-activa` o `comunista-activa`). Solo se rankean las que ya están vinculadas a un perfil documentado; las demás cuentan en la cobertura del catálogo y no reciben posiciones inventadas.
- Si todavía falta una convocatoria para el contexto, el motor devuelve `metodo: heuristica-ambito` y la interfaz lo advierte. La heurística sirve para seguir trabajando, pero nunca se presenta como papeleta real.
- **La fórmula de afinidad no cambia jamás con el ámbito**: mismos ítems, misma distancia Manhattan normalizada, mismas puntuaciones de eje. Filtrar partidos no altera la puntuación de ningún otro (la afinidad es por pares usuario–partido, no relativa al conjunto), así que añadir o quitar convocatorias no puede sesgar los resultados.
- En el modo exhaustivo, el **módulo territorial** de la comunidad se recomienda porque ahí viven los discriminantes de esa arena (moratoria turística CC/NC, concierto en Euskadi/Navarra, etc.). El modo rápido conserva exactamente sus 50 preguntas generales y no absorbe módulos autonómicos.
- Las **coaliciones** (Sumar, EH Bildu, Por Andalucía, Existe) se modelan con `tipo: "coalicion"` y `componentes: [ids]`: la coalición tiene ficha y posiciones propias (lo que se vota), y cada componente puede tener la suya (lo que se es). El usuario ve la coalición en el ranking electoral y puede desplegar sus componentes en la vista de detalle. Los partidos autonómicos sin representación en el Congreso (Adelante Andalucía, Nación Andaluza, extraparlamentarios de cualquier territorio) entran por la misma vía que los estatales: nivel de confianza según la fuente disponible, sin trato especial.

Cada convocatoria conserva fecha, denominador, votos, porcentaje, motivo de inclusión, territorios cubiertos y fuente oficial. Un agregado por CCAA no prueba presencia en cada provincia: la interfaz expresa ese límite. Partido, coalición, candidatura y marca sucesora son relaciones distintas (`misma-organizacion`, `coalicion`, `componente`, `sucesora`) y ninguna de ellas hereda posiciones automáticamente.

## 5 ter. Sindicatos y representación laboral

Los sindicatos nunca comparten ranking con partidos. El resultado «Tu modelo de representación laboral» usa únicamente respuestas del bloque laboral y muestra primero facetas —poder en la empresa, negociación/conflicto, financiación, autonomía, pluralismo, organización y propiedad—. Después puede comparar con organizaciones documentadas, siempre con cobertura y fuentes.

Una similitud sindical no es recomendación de afiliación: la utilidad práctica depende de empresa, sector, territorio y presencia real, datos que el cuestionario todavía no recoge. Los sindicatos territoriales se filtran por CCAA cuando se conoce; la falta de sector se advierte. Ausencia de evidencia queda sin posición, nunca en `0`.

## 6. Sesgos conocidos y controles

- **Selección de ítems**: Walgrave, Nuytemans y Pepermans (2009) demostraron simulando 500.000 configuraciones que *cualquier* selección de afirmaciones beneficia a algún partido. La magnitud está cuantificada: elegir ítems a conveniencia puede aumentar la frecuencia de recomendación de un partido más de un 261%, y cambiar el método de matching hasta un 105% (Baumann et al., arXiv:2505.13329, con datos reales de Smartvote). Controles: elegir ítems donde los partidos realmente divergen, equilibrar temas entre ejes, y documentar en cada PR por qué el ítem discrimina.
- **Inflación de extremos por carga dimensional**: cargar el cuestionario con muchos ítems de una dimensión favorece mecánicamente a los partidos con posiciones extremas en ella (Walgrave et al., *Electoral Studies* 2014). Relevante para los módulos de profundización: el módulo de derecha radical o el de corrientes de la izquierda no deben volcarse en una sola subdimensión, y el ranking global del modo completo se calcula siempre con el núcleo incluido, nunca solo con el módulo.
- **Fiabilidad por dimensión**: la comparación EUvox/euandi (2014) mostró que las posiciones de partido convergen bien en las dimensiones cultural y europea pero mal en la económica, sobre todo para la derecha radical — única familia que cae a lados opuestos del centro según el VAA (*Party Politics*, 2019). Refuerza dos decisiones de Espectro: los ítems culturales/identitarios como discriminadores primarios de esa familia, y el solo-matching para sus paradojas económicas (nacionalsindicalismo anticapitalista vs. liberalismo de VOX).
- **Longitud de la escala**: la misma respuesta transformada a escalas de distinta longitud produce consejos distintos salvo para perfiles extremos (*Policy & Internet*, 2017). La escala de 5 puntos de Espectro es por tanto una decisión consecuente y publicada, estable entre elecciones.
- **Polaridad**: formular en positivo («permitir») o negativo («prohibir») altera sistemáticamente las respuestas. Control: campo `polaridad` en cada ítem y equilibrio de signos en el banco (objetivo ~50/50; la semilla actual está sesgada a positiva y debe corregirse al crecer).
- **Punto medio / satisficing**: mitigado con la opción «sin opinión» y con redacción de una sola idea por ítem, sin dobles negaciones. La literatura de VAAs respalda el diseño: «sin opinión» y los ítems no contestados se codifican como valor ausente, nunca como punto neutro (Katakis et al., 2013), y el manejo de ausentes es una de las cuatro palancas que determinan el consejo junto a dimensionalidad, métrica y pesos (*Frontiers in Political Science*, 2024). El tratamiento de la cobertura parcial importa además del lado de los partidos: penaliza sistemáticamente a los que tienen pocas posiciones registradas — de ahí la bandera `bajaCobertura` visible y el mínimo de ítems comparados, en lugar de imputarles posiciones.
- **Efecto del modelo espacial**: mitigado publicando fórmulas, código y datos, y no cambiando el modelo entre elecciones sin justificación pública.
- **Equifinalidad**: una respuesta compartida por ideologías distintas solo carga una faceta si la relación es monotónica. Si no, se convierte en solo-matching o activa un seguimiento de motivo.
- **Doble peso**: pares inversos, duplicados entre módulos y cuatro justificaciones de una misma pregunta no pueden contarse como evidencias independientes. El validador retiene IDs retirados para trazabilidad y el piloto audita grupos temáticos.
- **Etiquetas identitarias**: un arquetipo próximo es una descripción condicional, no un diagnóstico ni una pertenencia. Debe mostrar distancia, cobertura y facetas que contradicen la etiqueta.

## 7. Calibración y mejora continua

1. **Piloto**: el núcleo rápido conserva exactamente 50 preguntas seleccionadas por discriminación y equilibrio de facetas; las redundantes se marcan `retirado`, nunca se borran, para mantener trazabilidad.
2. **Análisis de escalas**: Mokken/IRT sobre respuestas **anonimizadas y agregadas** para verificar que los ítems de cada eje escalan juntos (propuesta de Germann & Méndez para VAAs). Si un eje no escala, se rediseñan sus ítems o se retira el eje del mapa (el ranking por % no depende del modelo espacial y sobrevive).
3. **Adaptativo (CAT)**: con parámetros IRT estimados, seleccionar en el modo completo el siguiente ítem más informativo para la zona del espacio donde está el usuario, reduciendo longitud sin perder precisión. Arquitectura de referencia: Sigfrid (*Quality & Quantity*, 2024) — modelo de respuesta graduada (GRM) + criterio de máxima información con pesos dimensionales, seleccionando de un banco organizado en **escalas unidimensionales separadas** (exactamente la estructura de ejes de Espectro) en lugar de un modelo multidimensional opaco; con pocos ítems respondidos supera a un test de orden fijo de la misma longitud. La selección adaptativa se auditará contra el sesgo de cherry-picking (§6): el algoritmo optimiza información, nunca frecuencia de recomendación.
4. **Post-electoral**: recodificación de posiciones tras cada ciclo (programas nuevos, votaciones de la legislatura) con historial versionado en git.
