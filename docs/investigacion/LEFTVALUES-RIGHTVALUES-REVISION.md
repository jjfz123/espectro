# Revisión comparada: LeftValues y RightValues (encargo del propietario)

**Fecha:** 2026-07-12 · **Investigador:** Sonnet (dosier íntegro, filtrado y archivado por el integrador) · **Casilla de origen:** TODO §Cobertura y neutralidad.

# Informe: LeftValues y RightValues como referencia comparada para Espectro

Contexto verificado antes de la búsqueda: leí `data/ejes.json` (29 ejes, de los cuales 8 son "eje" y 21 son "subEje": `metodo-cambio`, `organizacion`, `tradicion-moral`, `internacionalismo`, `monarquia`, `atlantismo`, `laicismo`, `animalismo`, `institucionalismo`, `democracia-directa`, `pluralismo-institucional`, `estatismo`, `propiedad-mercado`, `poder-laboral`, `autonomia-sindical`, `energia-nuclear`, `uso-fuerza`, `armas-nucleares`, `implicacion-internacional`, `libertad-conciencia`, `libertades-civiles`, más `modelo-territorial`) y hojeé `data/items/corrientes-izquierda.json` (46 ítems, ~903 líneas) y `corrientes-derecha.json` (26 ítems, ~498 líneas). También localicé la casilla exacta del encargo en `docs/TODO-MAPEO-EXHAUSTIVO.md:54` y una entrada previa, más breve, sobre LeftValues en `docs/investigacion/representacion-ideologica-visual.md:115`.

Nota metodológica: WebFetch devolvió 403 en mi único intento útil (README crudo de RightValues; solo rescató una frase genérica). Todo lo demás procede de WebSearch con corroboración cruzada entre 2-4 fuentes independientes por dato. Donde la corroboración fue débil o contradictoria, lo marco explícitamente.

---

## 0. Corrección de encuadre antes de empezar

El encargo asumía "~12 ejes" para LeftValues. Verificado: **LeftValues tiene 7 ejes, no 12** (confirmado de forma consistente en el propio repositorio, en NamuWiki y en el espejo 8values.cc). Hipótesis verosímil del origen del "12": existe un test distinto y no emparentado, **12Axes** (`politicaltests.github.io/12axes`, basado en 9axes, no en 8values), que sí tiene exactamente 12 ejes (Estructura, Representación, Poder, Inmigración, Diplomacia, Intervención, Economía, Control, Comercio, Religión, Moralidad, Tecnología) y convive con LeftValues/RightValues bajo el mismo paraguas informal `politicaltests.github.io`. Lo señalo para que quien fijó la casilla del TODO sepa que el número de referencia no corresponde al test que pidió revisar.

---

## 1. Subejes verificados de cada test

### LeftValues (leftvalues.github.io) — 7 ejes, 72 preguntas

Fuentes: [README/repo oficial](https://github.com/LeftValues/leftvalues.github.io), [espejo 8values.cc](https://8values.cc/leftvalues/?lang=en), [NamuWiki](https://en.namu.wiki/w/LeftValues) — los tres coinciden literalmente en la lista y el orden.

| Eje LeftValues | Polos | Qué mide (paráfrasis conceptual, no la pregunta) |
|---|---|---|
| Revolution vs. Reform | ruptura vs. gradualismo | Vía hacia la transformación: alzamiento/ruptura frente a cambio dentro del sistema |
| Science vs. Utopia | materialismo histórico vs. idealismo | Si el socialismo se concibe como análisis "científico" (dialéctico) de la historia o como proyecto moral/utópico — alude al folleto de Engels *Del socialismo utópico al científico* |
| Centralization vs. Decentralization | planificación central vs. local | Escala económica de la planificación: centralizada estatal vs. descentralizada/local |
| Internationalism vs. Nationalism | internacionalismo vs. foco nacional | Movimiento socialista global vs. prioridad de los intereses nacionales propios |
| Political Parties vs. Unions | partido vs. sindicato | Si el vehículo del cambio debe ser el partido político o el sindicato/organización de masas |
| Production vs. Ecology | productivismo vs. ecologismo | Prioridad del desarrollo productivo frente a la protección ambiental |
| Conservatism vs. Progress | tradición vs. progreso social | Actitud ante cambio social/cultural; según una fuente adicional (8values.cc/blog) su contenido incluye explícitamente feminismo, LGTB e igualdad racial bajo la etiqueta "Inclusivity" — dos descripciones del mismo eje, no dos ejes distintos |

Corrobora esta lista, de forma independiente, la entrada ya existente en `docs/investigacion/representacion-ideologica-visual.md:115` del propio repo ("revolución/reforma, partido/sindicato, producción/naturaleza"), escrita en una investigación anterior sin que yo la hubiera consultado todavía en ese momento de la búsqueda.

Matching a ideologías: 12 corrientes (Marxismo-Leninismo, Marxismo Ortodoxo, Eco-Marxismo, Marxismo Centrista, Comunismo de Consejos, Comunismo de Izquierda, Anarco-Comunismo, Eco-Anarquismo, Anarquismo de Mercado, Socialismo Utópico, Socialismo Democrático, Socialdemocracia) — una fuente dice "13"; no pude resolver la discrepancia de una unidad (ver Huecos).

### RightValues (rightvaluestest.github.io) — 7 ejes (confirmado por NamuWiki: "siete ejes... 69 preguntas"), 69 preguntas

Aquí la corroboración es más débil y hay **al menos tres versiones distintas en circulación** que no debo confundir:
- `rightvaluestest/rightvalues-old` (repo explícitamente archivado como "old")
- `rightvaluestest/rightvaluestest.github.io` (la actual, rama `main` — la que pidió el propietario)
- `therightcafe/Right-Values-Final` ("RightValues REVAMPED") — **fork de un tercero, no el proyecto original**; varias respuestas de búsqueda mezclaban datos de este fork con los del original, y tuve que descartarlos explícitamente.

Con esa salvedad, 4 de los 7 ejes están bien corroborados (aparecen igual en ≥2 fuentes independientes, con descripción coincidente):

| Eje RightValues | Polos | Qué mide |
|---|---|---|
| Globalism vs. Nationalism | alianzas internacionales vs. soberanía nacional | Equivalente especular del internacionalismo/nacionalismo de LeftValues |
| Religious vs. Secular | gobierno con presencia religiosa vs. Estado sin religión | Papel de la religión en el Estado |
| Materialism vs. Anti-Materialism | productividad/tecnología/urbanismo vs. rechazo de la modernidad, retorno a un pasado "más simple y localista" | Modernismo económico-cultural frente a primitivismo/ruralismo — una segunda fuente lo describe como "Acceleration vs. Deceleration" |
| Racial Consciousness vs. Racial Deconstructionism | raza como "realidad biológica" que incide en el desarrollo de las naciones vs. raza como constructo sin relevancia | Eje de "conciencia racial" (race realism) |

Los otros 3 aparecen solo en una síntesis agregada (no en fuente primaria que yo haya podido leer): Market vs. State (económico), Freedom vs. Authority (libertades civiles), Assimilation vs. Diversity (inmigración/asimilación cultural). Los incluyo con hedge explícito porque no logré verificarlos con la misma solidez que los cuatro anteriores.

Matching a ideologías: cifras contradictorias entre fuentes ("13" vs "26"); entre las nombradas aparecen monarquismo, monarquismo absoluto, fascismo, paleoconservadurismo, neoconservadurismo, distributismo, corporativismo estatal y libertarismo de derecha — no pude obtener la lista cerrada y numerada (ver Huecos).

---

## 2. Conceptos discriminantes que Espectro no cubre (o cubre solo parcialmente)

Van descritos por concepto, no por enunciado — en ningún momento de la búsqueda llegué a ver el texto literal de una pregunta de ninguno de los dos tests (solo descripciones de ejes), así que no hay riesgo de haber copiado nada textual.

1. **Visión "científica"/materialista de la historia frente a visión utópica/idealista** (eje Science/Utopia de LeftValues). No hay nada parecido en los 29 ejes ni en `corrientes-izquierda.json`; los ítems existentes sobre URSS/Stalin/Trotski/Mao (izq-004, izq-020, izq-021, izq-022, izq-028) juzgan balances históricos concretos, no la cuestión epistemológica de fondo (materialismo dialéctico vs. socialismo ético/utópico).

2. **Aceleracionismo/primitivismo no violento** (eje Materialism/Anti-Materialism de RightValues). Comprobé con grep que la única aparición de "aceleracionismo" en todo el banco de ítems está en `data/items/limites-antipluralismo.json`, y es explícitamente el arquetipo de aceleracionismo *violento* de tipo Atomwaffen ("requiere revisión ética antes de activarse"). No existe ningún ítem sobre la disyuntiva no violenta y mucho más mayoritaria: modernidad/tecnología/urbanismo/crecimiento frente a retorno a la tradición/ruralismo/localismo — relevante para tercera posición, ecofascismo, agrarismo identitario o incluso corrientes "tech-right".

3. **Partido vs. sindicato/consejo como vehículo estratégico** (eje Political Parties/Unions de LeftValues). Más cubierto de lo que parecía a primera vista: repartido entre `metodo-cambio`, `organizacion` y, sobre todo, ítems de `trabajo-estado-sindicatos.json` con tags `sindicalismo-revolucionario` y `consejos-trabajadores`. Pero está repartido entre dos módulos distintos de los que se me pidió revisar (corrientes-izquierda.json no lo resuelve solo), así que no hay garantía de que ambos proyecten sobre el mismo eje de forma coherente si un usuario responde a ambos módulos.

4. **Conciencia racial biológica ("race realism")** (eje Racial Consciousness de RightValues). No existe nada equivalente; el único uso de "racial" que encontré en el banco entero (`democracia-instituciones.json`) es una nota que aclara que un ítem de seguridad *no* presupone perfil racial — lo contrario de operacionalizar el concepto. Ver sección 3: esto no es una recomendación de relleno sino de exclusión deliberada.

5. **Distributismo / propiedad ampliamente distribuida como "tercera vía"** (aparece entre las ideologías de RightValues). El eje `propiedad-mercado` es hoy bipolar (social/pública vs. privada); una postura distributista/gremialista (ni mercado concentrado ni Estado, sino pequeña propiedad muy repartida) no tiene hueco limpio en un eje lineal de dos polos — es el mismo problema de diseño que el propio banco resuelve en otros casos con ítems "solo-matching" (ejes vacíos).

---

## 3. Qué NO adaptar

**Sesgo estructural heredado (documentado en el propio linaje, no verificado directamente en los forks).** El [issue #69 de 8values](https://github.com/8values/8values.github.io/issues/69) —ya citado por este mismo repositorio en `docs/investigacion/ESPACIO-EJES.md`— documenta un desequilibrio de ítems por dirección que produce ~20 puntos de brecha entre los dos lados de un eje aunque se responda "muy de acuerdo" a todo. LeftValues y RightValues reutilizan el mismo motor de puntuación (porcentaje simple sobre el máximo posible, sin IRT ni ponderación validada) y no encontré evidencia de que ninguno de los dos forks haya auditado o corregido específicamente ese problema. Tratarlo como riesgo heredado no confirmado, no como hecho probado para estos dos tests en concreto.

**Sin documentación técnica ni ponderaciones publicadas.** Ninguno de los dos publica un estudio de construcción, fiabilidad o validez, ni pesos justificados más allá del propio código fuente abierto. Esto coincide exactamente con lo que este repositorio ya critica de forma genérica a toda la familia 8values en `ESPACIO-EJES.md` ("no documenta una metodología académica"); mi búsqueda no encontró ninguna excepción para LeftValues/RightValues específicamente. Cero papers, cero mención en Wikipedia, cero estudio psicométrico.

**Inestabilidad editorial de RightValues.** Encontré al menos tres versiones con listas de ejes e ideologías distintas entre sí (rightvalues-old, la actual, y el fork independiente "REVAMPED" de un tercero) sin registro claro de changelog que explique qué cambió y por qué. Un instrumento de referencia cuyos propios constructos han cambiado de nombre y contenido entre versiones es una autoridad comparada débil; no adoptar ningún eje "porque lo dice RightValues" sin fijar primero de qué versión se habla.

**Proyectos sin mantenimiento activo.** LeftValues declara explícitamente en su propio repositorio que "ya no se mantiene activamente" (solo admite correcciones de traducción). Cualquier adaptación debe hacerse sabiendo que no habrá parches upstream.

**El eje de "conciencia racial" en sí mismo.** Independientemente de la calidad del test, el constructo de "raza como realidad biológica que incide en el desarrollo de las naciones" es el tipo de contenido que la literatura científica social mayoritaria trata como pseudociencia asociada al racismo científico. Este mismo repositorio ya tiene una norma equivalente para el aceleracionismo neonazi ("arquetipo de seguridad no identitario... veto de gamificación/captación", `TODO-MAPEO-EXHAUSTIVO.md:53`). Recomiendo aplicar la misma norma aquí: si se cubre en absoluto, por el patrón de arquetipo de seguridad con umbral reforzado, nunca como pregunta Likert de uso general que ponga el race-realism al mismo nivel que la política fiscal.

**Licencias: código abierto, MIT en cascada — pero eso no excusa copiar texto.** LeftValues confirma licencia MIT (repositorio, [LICENSE](https://github.com/LeftValues/leftvalues.github.io/blob/master/LICENSE), agregadores como Open Source Agenda). RightValues muy probablemente también MIT por herencia de 8values/LeftValues y por la existencia de un PR llamado literalmente "[Create LICENSE](https://github.com/rightvaluestest/rightvaluestest.github.io/pull/1)", aunque no pude leer el texto exacto del fichero (ver Huecos). MIT permitiría legalmente reutilizar texto con atribución, pero la norma propia del repositorio ("sin copiar ítems literales") es más estricta que la licencia y debe mantenerse por motivos de originalidad y de calidad del ítem (un enunciado calibrado para un contexto anglosajón de foros online no está calibrado para el electorado español), no solo por motivos legales. Dato agravante a tener en cuenta: LeftValues ya tiene traducción al español publicada (`lang_es.json`), lo que hace más tentador y por tanto más importante vigilar el copiado accidental.

---

## 4. Recomendación concreta — huecos discriminantes mapeados

| # | Hueco sugerido por el test comparado | Test de origen | ¿Eje existente de Espectro? | Acción recomendada | Prioridad |
|---|---|---|---|---|---|
| 1 | Reforma/revolución dentro de la izquierda | LeftValues (Revolution/Reform) | **Sí, `metodo-cambio`** — y mejor: Espectro lo ata a 10 ítems con posiciones sourced de partidos reales (PCE/PCTE/Frente Obrero/trotskismo), frente al slider genérico 0-100 de LeftValues | Ninguna acción — ya se mide mejor que en LeftValues | — |
| 2 | Monarquismo dentro de la derecha | RightValues (ideologías Monarchism/Absolute Monarchism) | **Sí, `monarquia`** + der-020 + dr-008 | Sin hueco de fondo; refinar distinguiendo monarquismo constitucional de monarquismo tradicionalista/legitimista — coincide con la tarea de Carlismo ya abierta en `TODO-MAPEO-EXHAUSTIVO.md:52` | Baja (ya priorizado internamente) |
| 3 | Materialismo histórico vs. utopismo/idealismo | LeftValues (Science/Utopia) | No | 1-2 ítems **solo-matching** nuevos en `corrientes-izquierda.json` (no eje lineal nuevo); separaría marxismo-leninismo "cientificista" de corrientes ético-utópicas | Media-baja |
| 4 | Aceleracionismo/primitivismo cultural no violento | RightValues (Materialism/Anti-Materialism) | Parcial (`ecologia`, `tradicion-moral`) | Ítems nuevos que midan modernidad/tecnología/crecimiento vs. tradición/ruralismo, dejando **intacto y separado** el arquetipo de seguridad de aceleracionismo violento ya existente | Media-alta |
| 5 | Conciencia racial / race realism | RightValues (Racial Consciousness) | No, y no debería serlo como eje Likert normal | **No adaptar como slider de opinión.** Si se cubre, vía patrón de arquetipo de seguridad ya usado para aceleracionismo neonazi, con el mismo veto de gamificación | Alta como exclusión, no como contenido |
| 6 | Distributismo / propiedad ampliamente distribuida | RightValues (ideología Distributism) | Parcial (`propiedad-mercado`, bipolar) | Ítem(s) nuevos, probablemente solo-matching, en `corrientes-derecha.json` o `centro-liberalismo.json` para dar hueco a la "tercera vía" gremial/pequeña-propiedad | Media |
| 7 | Partido vs. sindicato/consejo como vehículo | LeftValues (Parties/Unions) | Sí, repartido (`metodo-cambio` + `organizacion` + ítems de `trabajo-estado-sindicatos.json`) | No es hueco de contenido; verificar que ambos módulos proyecten de forma coherente sobre el mismo eje cuando un usuario responde a los dos | Baja (housekeeping) |
| 8 | Corporativismo estatal / sindicalismo vertical | RightValues (ideología Corporatism) | Sí, ya con tags `corporativismo` en `trabajo-estado-sindicatos.json` y `derecha-radical.json` | Ninguna — mi hallazgo corrobora que la tarea ya abierta en `TODO-MAPEO-EXHAUSTIVO.md` ("corporativismo y sindicalismo revolucionario soreliano") es prioritaria, no la descubre | — (confirma prioridad existente) |

Resumen de las dos preguntas literales que planteaba el encargo: la distinción reforma/revolución la mide Espectro **mejor** que LeftValues (más granular, más sourced); el eje aceleracionismo/primitivismo **no existe** en su vertiente no violenta y es el hueco de mayor prioridad real de esta revisión; el monarquismo **ya está cubierto** y solo necesita el refinamiento de Carlismo ya planificado.

---

## Huecos (lo que no pude verificar)

- Lista cerrada y numerada de ejes 5, 6 y 7 de RightValues (Market/State, Freedom/Authority, Assimilation/Diversity): proceden de una única síntesis agregada, sin una segunda fuente independiente que los confirme con el mismo detalle que los 4 primeros.
- Recuento exacto de ideologías: LeftValues aparece como "12" en una fuente y "13" en otra (discrepancia de una unidad); RightValues aparece como "13" en una fuente y "26" en otra (discrepancia mayor, sin resolver).
- Texto literal del fichero LICENSE de RightValues: confirmé que existe un PR "Create LICENSE" cerrado en 2021 y varias inferencias razonables de que es MIT (por herencia de 8values/LeftValues), pero no leí el contenido exacto del fichero.
- Si la versión actual de `rightvaluestest.github.io` (rama `main`) difiere en ejes de `rightvalues-old` (rama `master`, archivada): hay indicios circunstanciales de que sí (descripciones distintas atribuidas a cada una), pero no comparé un diff real.
- Críticas o sesgos documentados específicamente para LeftValues/RightValues (no para su padre 8values): mis búsquedas de foros/Reddit no devolvieron hilos sustanciales de crítica propia; no puedo distinguir si es porque no existen o porque mis consultas no dieron con ellos.
- No revisé el resto del banco de ítems de Espectro de forma exhaustiva — solo `ejes.json`, los dos ficheros pedidos y greps puntuales sobre 5-6 términos en el resto de módulos. Es posible que alguno de los huecos señalados esté ya parcialmente cubierto en un módulo que no llegué a leer completo (p. ej. `identidad-cultura.json`, `nacionalismos-regionalismos.json`).
- No pude leer el HTML/JS real de ninguno de los dos tests (mi único intento de WebFetch devolvió muy poco contenido útil); todo lo relativo a ejes y ejemplos de contenido procede de resúmenes de búsqueda de terceros, no de lectura directa del código fuente.

## Aviso de neutralidad

Este informe describe y compara instrumentos de terceros con fines exclusivamente de diseño metodológico, a petición explícita del propietario del repositorio y con el encargo ya registrado en `docs/TODO-MAPEO-EXHAUSTIVO.md`. Nombrar corrientes ideológicas (marxismo-leninismo, monarquismo, race realism, distributismo, etc.) es descriptivo, no una toma de posición sobre ninguna de ellas. La recomendación de no adaptar el eje de "conciencia racial" como pregunta Likert de uso general se apoya en el consenso científico-social sobre el estatus pseudocientífico del race-realism y en una norma que el propio proyecto ya aplica a contenidos afines (aceleracionismo neonazi), no en un juicio político mío. No he editado ningún fichero del repositorio ni delegado ninguna parte de esta investigación en subagentes; esta respuesta es el entregable completo.
