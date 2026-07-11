# Auditoría cuantitativa de la geometría ideológica

| Campo | Valor |
|---|---|
| Corte de esta medición | 11 de julio de 2026; árbol de trabajo compartido, 46 referencias detectadas |
| Instrumento | `4` — facetas directas `propiedad-mercado` y `autoridad-politica` |
| Script reproducible | `node scripts/auditar-geometria-ideologias.mjs` |
| Prior visual | [Imagen exacta aportada por el usuario](https://preview.redd.it/where-do-you-fall-on-this-very-detailed-political-compass-v0-9bw9g7zxfns91.jpg?auto=webp&s=ca1d9e02f5d9124aed36dd80723b88d9b2171136), JPEG 678×680, SHA-256 `5a10ac569b54cf9718e63a01bdaacd35b1bf1c6528e43e7ab33cd4173f79e35b` |
| Regla de lectura | `valor/n`: coordenada calculada y número de ítems con carga; la publicación aplica además ids únicos, familias y núcleo de evidencia del contrato |

## Dictamen

La arquitectura final separa correctamente dos cosas que la versión de partida confundía:

- el **atlas editorial** de 175 corrientes visibles usa `coordenadasPrior`/`coordenadas`, decisiones A/B y definiciones españolas;
- los **puntos calculados** de persona, partidos y referencias solo aparecen cuando la faceta directa reúne evidencia dura.

La capa cubre los cuatro cuadrantes con **40/49/29/48** corrientes (izquierda-abajo/izquierda-arriba/derecha-abajo/derecha-arriba), más nueve anclas sobre un eje. La región máxima es Anarcocomunismo con **1,44 %**, Falangismo baja de **2,41 % a 0,32 %** gracias a vecinos históricos reales y el vacío máximo queda en **(−100,−100)** con radio **28,6**. Cumple el contrato endurecido de 3 %/45/15 sin resolver la denuncia mediante semillas ficticias.

Falangismo queda como ancla editorial en **(+17,+72)**, la posición relativa de la cuadrícula seria. Su puntuación bruta directa sería aproximadamente **(0,+100)**, pero no se dibuja como punto calculado porque no alcanza seis ítems y tres subdimensiones/familias. Así se preserva la composición sin fingir precisión psicométrica.

Con el contrato endurecido **ninguna** de las 46 referencias JSON supera hoy simultáneamente la evidencia de Propiedad y Poder. No es un fallo de la capa editorial: revela que las referencias se redactaron para matching y macroejes, no para las dos nuevas facetas directas. Los rombos calculados deben esperar más anclas; los 175 territorios del atlas siguen siendo educativos y declaran su origen. De ellos, 45 enlazan una referencia instrumentada y 130 siguen como ficha informativa o investigación: cantidad geométrica no equivale a validación doctrinal.

Permanece un defecto estructural: `publicacionMapa.publicable: false` veta todos los planos. En democracia cristiana el motivo cuestiona GAL–TAN y en eurocomunismo cuestiona Economía; impedir también pares no afectados es más amplio que la evidencia.

El mapa debe comunicar **proximidad proyectada**, no identidad. Cuando dos doctrinas coinciden en el 2D pero divergen en monarquía, violencia, internacionalismo, pluralismo o propiedad laboral, esa diferencia debe aparecer en la tarjeta y no resolverse desplazando puntos a mano.

## Método exacto

El script replica el motor sobre todos los ítems no retirados, incluidos los `solo-mapa`:

```text
faceta(k) = 100 · Σ(respuesta(i) · carga(i,k)) / Σ(2 · |carga(i,k)|)
```

Los macroejes se consideran suficientes con cuatro posiciones. Propiedad exige seis ids únicos y tres subdimensiones; Poder, seis ids, tres familias y dos ítems del núcleo contrapesos/libertades. Ambas son facetas directas: ya no se fabrica Poder promediando GAL–TAN, tradición y organización. El área se calcula recortando exactamente el cuadrado [−100,100]² por bisectrices de Voronoi y el vacío máximo se busca en rejilla 201×201.

## Tabla completa de referencias — línea base que motivó el contrato

**Alcance histórico:** esta tabla y las cuatro secciones cuantitativas que la siguen, hasta «Contrato duro vigente del atlas», conservan la instantánea v3 anterior a la faceta directa de Poder y a los umbrales 6/3/2. **No describen la publicación actual**: los valores de Poder eran la composición provisional retirada. La salida vigente y completa está en el JSON del script; ninguna referencia supera hoy ambos mínimos directos.

| Referencia | Prop. | Econ. | Poder n/f | GAL–TAN | Territorio | Planos publicados | 3D | Control editorial |
|---|---:|---:|---:|---:|---:|---|:---:|---|
| `abolicionismo-animal` | —/0 | —/0 | −100/3/2 | −100/2 | —/0 | — | — | veto global |
| `aceleracionismo-neonazi` | —/0 | —/0 | +100/6/3 | +100/1 | —/0 | — | — | veto global |
| `anarcocapitalismo-rothbardiano` | +85,5/9 | +76,2/12 | −72,4/12/5 | −27,8/5 | −93,7/5 | P×A, E×G, E×T, G×T | sí | — |
| `anarcocomunismo` | −69,1/6 | −63,6/7 | −81,7/18/6 | −92,9/5 | −92,9/5 | P×A, E×G, E×T, G×T | sí | — |
| `anarcopacifismo-tolstoyano` | +100/1 | −27,3/3 | −83,5/14/5 | −100/3 | −50/1 | — | — | veto global |
| `anarcosindicalismo` | −74/5 | −57,1/5 | −96,7/18/5 | −100/5 | −92,9/5 | P×A, E×G, E×T, G×T | sí | — |
| `anarquismo-colectivista-bakuninista` | −79,4/6 | −72,7/7 | −84,8/19/5 | −100/4 | −100/5 | P×A, E×G, E×T, G×T | sí | — |
| `anarquismo-individualista` | +23,4/9 | +51,3/12 | −80,8/19/7 | −80,8/5 | −85,7/5 | P×A, E×G, E×T, G×T | sí | — |
| `bordiguismo` | —/0 | —/0 | +100/3/2 | —/0 | +33,3/2 | — | — | sin par suficiente |
| `carlismo-socialista-autogestionario` | −78,6/4 | −35,7/2 | −85,3/5/3 | —/0 | −66,7/4 | P×A | — | — |
| `carlismo-tradicionalista` | —/0 | —/0 | +60,3/6/4 | —/0 | 0/3 | — | — | sin par suficiente |
| `comunalismo-bookchiniano` | —/0 | —/0 | −87,4/11/3 | —/0 | −100/1 | — | — | veto global |
| `consejismo` | −100/2 | −100/1 | −100/8/4 | —/0 | —/0 | — | — | sin par suficiente |
| `conservadurismo-clasico` | +60,9/3 | +50/5 | −1,5/11/6 | +45,5/4 | −8,3/4 | P×A, E×G, E×T, G×T | sí | — |
| `conservadurismo-liberal-europeo` | +85,7/3 | +32,4/6 | −62,9/7/3 | —/0 | —/0 | P×A | — | tres anclas horizontales |
| `decrecimiento-democratico` | −100/2 | −100/5 | −100/1/1 | —/0 | —/0 | — | — | veto global |
| `democracia-cristiana` | +29,2/4 | +3,1/5 | −37,5/10/4 | −42,3/5 | −50/4 | — | — | veto global |
| `derecha-radical-populista-nativista` | —/0 | −100/1 | +86,3/8/3 | +100/6 | —/0 | — | — | veto global |
| `distributismo` | −15,1/9 | −17,1/12 | −7,9/12/5 | +30/4 | −50/4 | P×A, E×G, E×T, G×T | sí | región sobredimensionada |
| `ecologismo-pronuclear` | —/0 | +100/1 | +100/1/1 | —/0 | —/0 | — | — | sin par suficiente |
| `ecosocialismo` | −65,6/5 | −81/6 | +33,3/3/1 | —/0 | —/0 | — | — | veto global |
| `eurocomunismo` | +15,5/3 | +18,2/4 | −45,6/11/5 | −75/4 | −45,8/5 | — | — | veto económico global |
| `falangismo-fe-jons-1934` | 0/3 | −44,1/5 | +92,5/9/5 | +100/1 | +100/2 | P×A | — | ancla P0 |
| `fascismo-italiano-regimen` | +50/3 | −11,1/6 | +96,3/11/5 | +100/4 | +100/1 | P×A, E×G | — | tres anclas horizontales |
| `franquismo-nacionalcatolico-1945-1957` | —/0 | −100/1 | +100/7/5 | +100/1 | +100/1 | — | — | veto global |
| `hoxhaismo` | —/0 | —/0 | +100/2/1 | —/0 | —/0 | — | — | sin par suficiente |
| `izquierda-social-patriotica-espanola` | −100/2 | −88,9/3 | +100/4/3 | +100/2 | +50/2 | — | — | veto global |
| `leninismo-bolchevique` | −100/4 | −92,5/6 | +17,5/7/3 | −77,3/4 | −50/1 | P×A, E×G | — | casi coincide con Posadismo |
| `liberalismo-clasico` | +67,6/4 | +32,5/6 | −58,2/10/4 | −70,6/6 | −35,7/4 | P×A, E×G, E×T, G×T | sí | — |
| `luxemburguismo` | −71,4/4 | −69,2/4 | −79,1/14/4 | —/0 | —/0 | P×A | — | región mínima |
| `marxismo-leninismo-maoismo` | —/0 | —/0 | +83,3/3/1 | —/0 | —/0 | — | — | sin par suficiente |
| `marxismo-leninismo-sovietico-estaliniano` | −100/4 | −100/6 | +84,5/8/4 | +63,6/4 | —/0 | P×A, E×G | — | — |
| `minarquismo` | +100/5 | +73,3/8 | −89,9/11/4 | −75/5 | −58,3/4 | P×A, E×G, E×T, G×T | sí | saturado en x |
| `mutualismo-proudhoniano` | −27,6/7 | −23,3/9 | −81,3/18/6 | −81,2/5 | −92,9/5 | P×A, E×G, E×T, G×T | sí | — |
| `neoliberalismo-friedmaniano` | +100/5 | +88,6/8 | −77,6/7/3 | −55,6/4 | —/0 | P×A, E×G | — | saturado en x |
| `ordoliberalismo-economia-social-mercado` | +63,7/6 | +38,3/10 | −50/4/2 | —/0 | —/0 | P×A | — | Poder solo dos familias |
| `patriotismo-constitucional-civico` | —/0 | —/0 | −100/10/3 | −100/3 | −100/1 | — | — | veto global |
| `pensamiento-gonzalo` | —/0 | —/0 | +100/4/2 | —/0 | —/0 | — | — | sin par suficiente |
| `plataformismo-anarcocomunista` | −77,8/5 | −70/6 | −66,7/16/5 | −50/1 | −85,7/5 | P×A, E×T | — | — |
| `posadismo` | −100/4 | −97,1/6 | +16,3/6/3 | −59,1/4 | −50/1 | P×A, E×G | — | casi coincide con Leninismo |
| `republicanismo-federal-pimargalliano` | —/0 | —/0 | +40/2/1 | —/0 | −66,7/4 | — | — | veto global |
| `republicanismo-federal-social-contemporaneo` | −100/3 | −100/3 | +25,8/3/2 | —/0 | −100/3 | — | — | veto global |
| `socialdemocracia-clasica` | −1/5 | −18,5/9 | −61,5/12/6 | −50/5 | —/0 | P×A, E×G | — | vertical muy baja |
| `socialismo-de-mercado-autogestionario` | −25/6 | −30,8/8 | −73,8/6/2 | —/0 | —/0 | — | — | veto global |
| `socialismo-democratico-pluralista` | −76,2/6 | −85,2/7 | −80,4/10/4 | −100/6 | —/0 | P×A, E×G | — | extremo con pluralismo sin carga |
| `trotskismo` | −100/4 | −95,8/4 | −18,7/13/4 | −100/5 | −55,6/4 | P×A, E×G, E×T, G×T | sí | cruza el centro del prior |

## P0 causal: Falangismo, propiedad y economía

La antigua abscisa económica de Falangismo era −44,1 porque cinco respuestas mezclaban cuatro conceptos distintos:

| Ítem | Respuesta | Carga económica | Aporte | Qué mide realmente |
|---|---:|---:|---:|---|
| `der-001` Estado mínimo | −2 | +1 | −2 | alcance estatal |
| `der-004` proteccionismo | +2 | −0,5 | −1 | apertura comercial/nación |
| `dr-001` nacionalizar banca | +2 | −1 | −2 | titularidad pública concreta |
| `lab-016` dirección estatal estratégica | +1 | −0,75 | −0,75 | dirección estatal |
| `lab-017` cooperativas, no ministerios | −2 | −1 | +2 | propiedad/control laboral |

Que una doctrina rechace el Estado mínimo, proteja la producción nacional o nacionalice la banca no demuestra “izquierda” si conserva empresa privada, subordina capital y trabajo al Estado y rechaza autogestión obrera. El nuevo horizontal mejora el constructo, pero sus tres anclas se cancelan exactamente:

```text
dr-001:  +2 × −0,75 = −1,50
lab-016: +1 × −0,50 = −0,50
lab-017: −2 × −1,00 = +2,00
total = 0  →  x = 0
```

La solución no es imponer manualmente “derecha”. Es añadir el discriminante neutral `N7` —«La propiedad privada de una empresa solo debería mantenerse mientras cumpla objetivos nacionales fijados por el Estado»— y separar, como mínimo:

1. titularidad privada ↔ pública/social;
2. coordinación por mercado ↔ plan administrativo;
3. control empresarial ↔ autogestión laboral;
4. competencia abierta ↔ corporativismo/protección nacional.

Una abscisa principal solo debería publicarse si cubre al menos tres de esas cuatro subdimensiones y ninguna depende de un único ítem. Hasta entonces, `x=0` significa **economía mixta de propiedad subordinada**, no centrismo político.

## P0 causal: Distributismo no está mal situado, está sobrerrepresentado

Su coordenada nueva (−15,1, −7,9) está a unos 14 puntos del prior visual (−22, +6): no justifica cancelar la referencia ni moverla a ojo. El fallo perceptivo es que su celda ocupa 14,93 % del plano y cubre gran parte del centro por ausencia de democracia cristiana, socialliberalismo, conservadurismo social moderado, cooperativismo y tercera vía bien anclados.

Además, el horizontal `propiedad-mercado` todavía le carga licencias profesionales, VTC, alquileres, sucesiones y patrimonio. Esas decisiones hablan de regulación o fiscalidad, no directamente de quién posee y coordina la producción. Deben quedar en el macroeje económico o con carga secundaria demostrada, no decidir una región de propiedad. Las anclas limpias son `eco-002`, `lab-016`, `lab-017` y futuros ítems sobre pequeña propiedad productiva, antimonopolio y subsidiariedad.

Recomendación: conservar el punto como provisional, limitar su área visual hasta densificar vecinos y explicar «propiedad productiva ampliamente distribuida; ni gran capital ni propiedad estatal», nunca «centro».

## Otros cuadrantes y vecinos engañosos

| Hallazgo | Evidencia | Decisión recomendada |
|---|---|---|
| Conservadurismo liberal demasiado próximo al ancap | distancia 9,5; horizontal sostenido por solo 3 anclas y Poder por evidencia estrecha | No publicar zona hasta tener tradición moral, libertades, organización y papel constitucional del Estado; no asumir que pluralismo + menos estatismo = −90 en Poder. |
| Leninismo y Posadismo casi idénticos | distancia 1,2 | Una sola región familiar «leninismos revolucionarios» con ramas al seleccionar, o separación mediante organización, internacionalismo y armas nucleares; nunca dos rótulos microscópicos. |
| Colectivismo anarquista y carlismo socialista casi idénticos | distancia 0,9 | La cercanía 2D puede ser real en autogestión/federalismo, pero la tarjeta debe anteponer monarquía, tradición y periodo. No fusionarlos. |
| Anarcocomunismo, Luxemburgismo y socialismo democrático se apiñan | distancias 3,5–7,2 | Jerarquía familia→rama y contraindicadores sobre partido, mercado, propiedad y transición. |
| Trotskismo aparece abajo | y −18,7 frente a prior aprox. +28 | Su `social=−100` y tradición −100 compensan organización +77,8; exigir evidencia de pluralismo/libertades antes de llamarlo poder distribuido. |
| Socialdemocracia aparece muy abajo | y −61,5 frente a prior aprox. −17 | La organización interna −100 y GAL −50 pesan como si definieran arquitectura estatal. Separar organización del movimiento de concentración de poder público. |
| Territorial carece de polo centralista | E×T: 7 izq.-descentralizadoras, 5 der.-descentralizadoras y cero por encima de 0 | No usar el fondo Voronoi territorial como atlas hasta incluir referencias centralistas con economía documentada; mantener puntos y áreas vacías explícitas. |
| GAL×Territorio está dominado por dos celdas | conservadurismo 41,31 %, liberalismo clásico 27,19 % | Suspender regiones de fondo; 11 anclas no cubren el plano y nueve están en el cuadrante GAL/descentralizador. |

## Geometría por plano — diagnóstico v3 retirado

| Plano | Anclas | Cuadrantes (−−/−+/+−/++) | Región mínima | Región máxima | Vacío máximo aproximado |
|---|---:|---|---|---|---|
| Propiedad × Poder | 24 | 11 / 3 / 8 / 1, más 1 sobre eje | carlismo socialista 0,16 % | distributismo 14,93 % | (+100,+52), radio 66,3 |
| Economía × GAL–TAN | 18 | 9 / 3 / 5 / 1 | trotskismo 0,27 % | conservadurismo 18,03 % | (+100,+100), radio 74 |
| Economía × Territorio | 12 | 7 / 0 / 5 / 0 | anarcocomunismo 0,26 % | conservadurismo 37,82 % | (−67,+100), radio 158,1 |
| GAL–TAN × Territorio | 11 | 9 / 0 / 2 / 0 | colectivismo anarquista 0,05 % | conservadurismo 41,31 % | (−100,+100), radio 138,8 |

La tabla anterior conserva los umbrales exploratorios de los planos calculados escasos. Para el atlas editorial ampliado rige un contrato más duro: ninguna región mayor del 3 %, Falangismo no mayor del 1 %, vacío no superior a 45 y al menos quince corrientes por cuadrante; por debajo de 0,75 % no hay rótulo persistente.

## Contrato duro vigente del atlas

La fuente normativa y validable es [`data/mapa-ideologias.json`](../../data/mapa-ideologias.json), conforme a [`data/schemas/mapa-ideologias.schema.json`](../../data/schemas/mapa-ideologias.schema.json). Este documento no duplica su JSON completo para evitar que una copia narrativa quede obsoleta.

La referencia visual es una norma dura de **composición**, no una fuente doctrinal. El atlas debe conservar su gramática espacial —orden relativo, vecindades de familia, densidad, continuidad y ocupación de los cuatro cuadrantes— mediante un diseño propio en español. No se copian el bitmap, los colores, iconos, memes, texto ni contornos exactos. Definiciones, posiciones, preguntas y adaptaciones españolas requieren fuentes independientes.

Los invariantes verificables son:

- al menos 125 corrientes visibles A/B, 16 familias y 15 anclas serias por cuadrante;
- A en la capa principal y toda B al activar profundidad; un rótulo C/D/E del inventario original puede entrar como B contextual si describe una doctrina, movimiento o sistema real y declara que no es una identidad integral;
- desviación prior–atlas superior a 25 con justificación y superior a 60 con doble revisión;
- ninguna región mayor del 3 %, Falangismo no mayor del 1 % y ningún vacío de radio superior a 45 si la capa se llama exhaustiva;
- tres preguntas discriminantes vigentes y distintas como mínimo para cada corriente visible, aunque todavía carezca de referencia instrumentada;
- coordenada calculada de Propiedad con 6 ítems y 3 subdimensiones;
- coordenada calculada de Poder con 6 ítems, 3 familias y 2 anclas de núcleo —contrapesos o libertades/coerción—;
- corrientes violentas sin identidad, porcentaje lúdico, recomendación ni contenido operativo;
- idioma visible para toda fuente no disponible en español.

En este corte v4 el atlas cumple densidad y continuidad: 175 corrientes, distribución 40/49/29/48 más nueve anclas sobre ejes, región máxima 1,44 %, Falangismo 0,32 % y vacío máximo 28,6. Esto valida la cobertura geométrica; no eleva automáticamente sus centros a mediciones psicométricas.

La tabla siguiente transcribe únicamente candidatos A/B. Las coordenadas `x₀/y₀` son **centros aproximados de la cuadrícula original**, normalizados por `x=200·columna/18−100`, `y=100−200·fila/18`, incertidumbre visual aproximada ±6. No son coordenadas inventadas para el motor. `Ref./preguntas` dice qué existe o qué falta.

**Lectura histórica obligatoria:** todos los textos `Motor (…)` de la última columna son el diagnóstico v3 con vertical compuesta que motivó la migración; están retirados y no describen resultados v4. En v4 ninguna referencia supera simultáneamente los mínimos directos de Propiedad y Poder. La salida vigente debe obtenerse con el script reproducible, no copiando esas cifras.

## Anclas A/B del prior visual, adaptadas a España

| Original | Adaptación española | x₀ | y₀ | Dec. | Ref./preguntas | Tratamiento o desplazamiento |
|---|---|---:|---:|:---:|---|---|
| Nazbol | Nacionalbolchevismo | −72 | +94 | B | pendiente; `izq-006`, `izq-025`, `dr-024` | Mantener prior solo como hueco sensible; no inferir desde patriotismo de izquierda. |
| Posadism | Posadismo | −94 | +83 | B | `posadismo`; `lim-004`, `izq-021`, `izq-002` | Motor (−100,+16): desplazamiento vertical >60, revisión doble; organización/pluralismo insuficientes. |
| Stalinism | ML soviético, fase estaliniana | −78 | +78 | A | `marxismo-leninismo-sovietico-estaliniano` | Motor (−100,+85), desplazamiento justificable por propiedad estatal integral. |
| Marxist Leninism Maoism | Marxismo-leninismo-maoísmo | −61 | +83 | B | `marxismo-leninismo-maoismo`; `izq-002`, `izq-022`, `lim-003` | Informativa hasta documentar propiedad y pluralismo; no forzar punto. |
| Forth Theory | Cuarta Teoría Política | −50 | +83 | B | pendiente; `dr-019`, `dr-024` + nuevo discriminante | La cuadrícula la presupone izquierda; economía indeterminada, no heredar x. |
| Fascism | Fascismo italiano por fases | 0 | +83 | B | `fascismo-italiano-regimen` | Motor (+50,+96); desplazamiento económico documentado por propiedad privada subordinada; separar 1919/RSI. |
| Esoteric Fascism | Fascismo esotérico | +17 | +83 | B | investigación específica | Sensible e histórico; no crear coordenada por asociación. |
| Neo Nazism | Neonazismo | +39 | +83 | B | `lim-005`, `lim-007`, `dr-025` | No sustituir por aceleracionismo terrorista; rama distinta. |
| National Capitalism | Capitalismo nacional | +50 | +83 | B | `eco-002`, `der-004`, `dr-024` | Descriptor amplio; exigir propiedad privada y dirección nacional simultáneas. |
| Hoxhaism | Hoxhaísmo | −61 | +72 | B | `hoxhaismo`; `izq-020`, `izq-028`, `dem-019` | Sin punto hasta anclar economía y pluralismo con ids cargados. |
| Falangism | Falangismo de FE-JONS, 1934 | +17 | +72 | A | `falangismo-fe-jons-1934`; añadir `N7` | Motor (0,+93): ya no está arriba-izquierda; x necesita más de tres anclas. |
| Neo Fascism | Neofascismo | +39 | +72 | B | pendiente; `dem-010`, `dr-024`, `dem-019` | País/periodo obligatorios; no igualar derecha radical electoral. |
| National Communism | Nacionalcomunismo | −72 | +61 | B | pendiente; `izq-006`, `izq-025`, `dr-024` | Familia heterogénea; prior provisional. |
| Maoism | Maoísmo/pensamiento Mao | −61 | +61 | B | pendiente; `izq-002`, `izq-022`, `izq-031` | No heredar coordenadas de MLM ni Pensamiento Gonzalo. |
| Strasserism | Strasserismo histórico | −50 | +61 | B | pendiente; `dr-001`, `dr-002`, `lim-007` | Retórica anticapitalista no basta para x negativa; revisión sensible. |
| Marxist Leninism | Marxismo-leninismo genérico | −83 | +50 | A | falta referencia genérica; `izq-002`, `izq-017`, `dem-019` | Lenin y fase estaliniana no sustituyen una tradición contemporánea genérica. |
| Leninism | Leninismo bolchevique | −83 | +39 | B | `leninismo-bolchevique` | Motor (−100,+18); revisar Poder por falta de contrapesos/libertades. |
| Conservative Socialism | Socialismo conservador/religioso | −67 | +39 | B | pendiente; `eco-001`, `der-002`, `rel-002` | No deducir teocracia ni partido único. |
| Paleo Conservatism | Paleoconservadurismo | +61 | +39 | B | pendiente; `der-002`, `geo-003`, `der-021` | Contexto estadounidense; prior solo exhaustivo. |
| Trotskyism | Trotskismo | −83 | +28 | A | `trotskismo` | Motor (−100,−19) cruza el eje: P0, faltan pluralismo/libertades como anclas directas. |
| Agrarianism | Agrarismo español por variante | −67 | +28 | B | falta propiedad de tierra/pequeño productor | No hay agrarismo universal; elegir tradición española concreta. |
| Neo Conservatism | Neoconservadurismo | +78 | +28 | B | `der-002`, `geo-003`, `der-021` | Contextual estadounidense; no trasladar al PP. |
| Liberalism | Liberalismo, familia | +11 | +17 | A | usar ramas, no un punto; `lib-003`, `dem-008` | El liberalismo clásico del motor no representa toda la familia. |
| Progressive Conservatism | Conservadurismo progresista | +33 | +17 | B | pendiente; `dem-012`, `soc-001`, `eco-004` | País/época obligatorios. |
| Liberal Conservatism | Conservadurismo liberal europeo | +56 | +17 | A | `conservadurismo-liberal-europeo` | Motor muy abajo; no publicarlo como casi ancap sin más evidencia de Poder. |
| Conservatism | Conservadurismo clásico | +78 | +17 | A | `conservadurismo-clasico` | Motor (+61,−2): desplazamiento moderado; evitar que su gran celda cubra huecos. |
| Communalism | Comunalismo bookchiniano | −94 | 0 | A | `comunalismo-bookchiniano`; `izq-038`, `dem-034`, `dem-035` | Sin x documentada; tarjeta/facetas hasta cubrir municipalización económica. |
| Left Communism | Comunismo de izquierda | −78 | −6 | B | `bordiguismo` + `consejismo` | Familia bifurcada; no crear un promedio. |
| Distributism | Distributismo | −22 | +6 | A | `distributismo`; añadir pequeña propiedad/antimonopolio | Motor (−15,−8) está cerca; reducir región, no cancelar punto. |
| National Liberalism | Liberalismo nacional | +22 | +6 | B | `der-001`, `izq-025`, `dem-008` | Requiere país y tipo de nación. |
| Dark Enlightenment | Neorreacción/Ilustración Oscura | +78 | +6 | B | falta democracia corporativa/elitismo hereditario | La y del prior parece demasiado baja; cualquier desplazamiento exige fuente. |
| Third Way | Tercera vía | +22 | −6 | B | falta referencia; mercado + inversión social + disciplina fiscal | Corriente programática real, no simple centro geométrico. |
| Council Communism | Consejismo | −94 | −22 | B | `consejismo`; `izq-003`, `lab-008`, `dem-017` | Sin x suficiente; conservar como rama informativa. |
| Democratic Confederalism | Confederalismo democrático | −78 | −17 | A | pendiente; `izq-038`, `dem-034`, `dem-035` | Contexto kurdo; adaptación española solo como referencia internacional. |
| Greenism | Ecologismo verde | −56 | −17 | A | `ene-010`, `sd-016`, `ecl-001`; falta familia | No asignar economía, nuclear o propiedad automáticamente. |
| Social Democracy | Socialdemocracia clásica | −33 | −17 | A | `socialdemocracia-clasica` | Motor (−1,−62): desviación >50, revisar organización y propiedad. |
| Social Liberalism | Liberalismo social | −11 | −17 | A | pendiente; mercado regulado + derechos + protección social | P1 central para densificar el centro. |
| Neo Liberalism | Neoliberalismo friedmaniano | +11 | −17 | A | `neoliberalismo-friedmaniano` | Motor (+100,−78) no representa el rótulo genérico; renombrar variante o justificar >60. |
| Green Libertarianism | Libertarismo verde | +33 | −17 | B | `va-008`, `ene-011`, `ene-012` | No equiparar ecomodernismo o mercado de carbono a doctrina integral. |
| Laissez Faire Capitalism | Capitalismo laissez-faire | +78 | −17 | B | `der-001`, `lib-003`, `lab-010` | Tipo económico; Poder necesita evidencia independiente. |
| Luxemburgism | Luxemburgismo | −78 | −28 | A | `luxemburguismo` | Motor (−71,−79): vertical se aleja >50; revisar doble carga de pluralismo/organización. |
| Liberal Socialism | Socialismo liberal | −56 | −28 | B | `dem-010`, `izq-003`, `lab-008` | Falta variante delimitada. |
| Democratic Socialism | Socialismo democrático pluralista | −22 | −33 | A | `socialismo-democratico-pluralista` | Motor (−76,−80), >60 del prior; ref DSA no debe ocupar toda la familia. |
| Social Libertarianism | Libertarismo social | −6 | −28 | B | `dem-010`, `izq-003`, `lab-008` | Etiqueta amplia; preferir ramas. |
| Distributist Libertarianism | Distributismo libertario | +56 | −28 | B | `lab-017`, `eco-014`, `der-002` | No heredar posiciones del distributismo general. |
| Classical Liberalism | Liberalismo clásico | +61 | −28 | A | `liberalismo-clasico` | Motor (+68,−58): desviación vertical 30, explicable solo con evidencia constitucional. |
| National Libertarianism | Libertarismo nacional | +44 | −39 | B | `der-001`, `izq-025` + nación/consentimiento | Cruce minoritario; no heredar paleolibertarismo. |
| Paleo Libertarianism | Paleolibertarismo | +78 | −39 | B | `lab-010`, `der-002`, `geo-003` | Contexto estadounidense. |
| Market Socialism | Socialismo de mercado autogestionario | −56 | −50 | A | `socialismo-de-mercado-autogestionario`; `N3` | Motor técnico (−25,−74), veto correcto hasta cubrir poder político. |
| Left Rothbardianism | Rothbardianismo de izquierda | −39 | −50 | B | `lab-010`, `izq-032`, `izq-007` | No confundir mercado antiestatal con ancap. |
| Libertarian Feminism | Feminismo libertario | +22 | −50 | B | banco `fem-*` + propiedad/Estado | Elegir rama; debates internos no se heredan. |
| Christian Libertarianism | Libertarismo cristiano | +56 | −50 | B | `der-001`, `rel-002`, libertad de conciencia | Religión no implica confesionalidad. |
| Propertarianism | Propertarianismo | +78 | −50 | B | `lab-010`, `der-025`, `dem-010` | Exige derecho de exclusión/autoridad privada, no solo impuestos bajos. |
| Libertarian Socialism | Socialismo libertario | −78 | −61 | A | familia cubierta por ramas | Nodo de familia, no competidor de sus propias ramas. |
| Libertarian Market Socialism | Socialismo libertario de mercado | −56 | −61 | B | `izq-032`, `lab-017`, `N3` | Separar mutualismo, cooperativismo y Schweickart. |
| Georgism | Georgismo | 0 | −61 | B | `N4` | No crear referencia antes del ítem sobre renta del suelo. |
| Objectivism | Objetivismo randiano | +17 | −61 | B | `der-001`, `lab-010`, `eco-001` invertido | Filosofía delimitada; no sinónimo de todo libertarismo. |
| Bleeding-Heart Libertarianism | Libertarismo compasivo | +33 | −61 | B | `lib-003`, `eco-001`, `soc-004` | Corriente académica anglófona; baja prioridad española. |
| Minarchism | Minarquismo | +78 | −61 | A | `minarquismo` | Motor (+100,−90), desviación 36; saturación x requiere anclas moderadoras. |
| Accelerationism (Left) | Aceleracionismo de izquierda | −94 | −72 | B | falta tecnología/automatización/aceleración | No equivale a terrorismo; investigar antes de mapear. |
| Anarcho communism | Anarcocomunismo | −78 | −78 | A | `anarcocomunismo` | Motor (−69,−82), alineación buena. |
| Platformism | Plataformismo | −39 | −72 | A | `plataformismo-anarcocomunista`; `N2` | Motor (−78,−67): x se aleja 39; revisar propiedad frente a etiqueta organizativa. |
| Anarcho Pacifism | Anarcopacifismo | −28 | −72 | A | `anarcopacifismo-tolstoyano` | Sin x suficiente; veto correcto. |
| Mutualism | Mutualismo | −17 | −72 | A | `mutualismo-proudhoniano` | Motor (−28,−81), alineación razonable. |
| Religious Anarchism | Anarquismo religioso | −6 | −72 | B | `izq-007`, `rel-002`, rechazo `rel-003` | Rama plural; no heredar Tolstói a todas las religiones. |
| Agorism | Agorismo | +17 | −72 | B | `N5` | Sin ítem de contraeconomía no hay referencia. |
| Anarcho capitalism | Anarcocapitalismo | +78 | −78 | A | `anarcocapitalismo-rothbardiano` | Motor (+86,−72), alineación buena. |
| Accelerationism (Right) | Aceleracionismo de derecha | +94 | −72 | B | separar neorreacción de `aceleracionismo-neonazi` | El arquetipo terrorista queda fuera del mapa. |
| Anarcho Syndicalism | Anarcosindicalismo | −61 | −83 | A | `anarcosindicalismo` | Motor (−74,−97), desplazamiento 19. |
| Anarcha Feminism | Anarcofeminismo | −50 | −83 | B | `izq-007` + `fem-*`; falta poder doméstico | Mujeres Libres da conexión española; no deducir debates actuales. |
| Queer Anarchism | Anarquismo queer | −39 | −83 | B | `izq-007` + módulo propio | Corriente real contemporánea; sin punto hasta instrumentar. |
| Anarcho Collectivism | Anarquismo colectivista | −28 | −83 | A | `anarquismo-colectivista-bakuninista`; `N1` | Motor (−79,−85), desviación x >50: falta remuneración por trabajo. |
| Eco Anarchism | Ecoanarquismo/ecología social | −11 | −83 | B | `ene-010`, `izq-038`; comunalismo separado | Familia amplia; no duplicar Bookchin sin jerarquía. |
| Egoism | Egoísmo stirneriano | +6 | −83 | B | `izq-007`, `lab-010` + norma/comunidad | No heredar el anarquismo tuckeriano. |
| Individualist Anarchism | Anarquismo individualista tuckeriano | +22 | −83 | A | `anarquismo-individualista` | Motor (+23,−81), x del nuevo eje alinea casi exactamente. |
| Voluntaryism | Voluntarismo político | +44 | −83 | B | `lab-010`, `lib-002` + consentimiento general | Alto solapamiento; exigir ganancia discriminante. |
| Hoppeanism | Hoppeanismo | +61 | −83 | B | `lab-010`, `der-025`, `dem-010` | Sensible por exclusión/orden contractual; no inferir por fiscalidad. |
| Anarcho primitivism | Anarcoprimitivismo | −22 | −94 | B | `N6`, `ene-010`, `va-016` | Sin `N6` no distinguir de ecologismo/decrecimiento. |

## Auditoría de las 178 etiquetas y estado de implementación

La integridad formal del inventario original sigue siendo correcta: **178** filas consecutivas, sin etiqueta exacta duplicada, con **28 A, 50 B, 35 C, 5 D, 38 E y 22 F** en la primera criba. Esa letra ya no funciona como veto de visibilidad: estatismo, monarquía constitucional, sionismos, populismos y confederalismo entran en profundidad como facetas o familias contextuales claramente rotuladas. Solo ficción, memes, contradicciones sin corpus y nombres imposibles de interpretar permanecen fuera.

Este corte cierra los desfases narrativos de recuento y estado: 46 referencias, socialismo democrático pluralista, derecha radical nativista y conservadurismo liberal europeo ya figuran como implementados, y fascismo italiano de régimen consta con 14 posiciones. También separa expresamente la notación histórica `E−/E+` de la faceta directa `propiedad-mercado`.

Quedan dos controles de implementación, no de taxonomía:

1. `decision` A/B ya forma parte del atlas; la interfaz debe mantener las 28 A como capa principal y revelar las 147 B al activar profundidad o entrar en modo exhaustivo.
2. `publicacionMapa` sigue siendo global en referencias antiguas, mientras el contrato prescribe publicación por par de ejes. Debe evolucionar a `publicacionPlanos` o a motivos separados por constructo.

Las letras C/D/E del inventario describen a menudo facetas, movimientos o contextos reales: pueden tener región pedagógica en profundidad si la ficha declara su naturaleza no integral y tres decisiones discriminantes. F exige revisión individual: no se rescata una ficción o un meme para llenar geometría, pero tampoco se excluye un movimiento existente solo por no tener partido.

### Facetas definitorias declaradas sin carga real

El script recorre las 29 facetas y señala estas inconsistencias. “Sin carga” no significa que la doctrina no sostenga la posición: significa que los ítems citados en su ficha no cargan ese eje en el instrumento actual.

| Referencia | Facetas declaradas sin ninguna observación cargada |
|---|---|
| `anarcopacifismo-tolstoyano` | `libertad-conciencia` |
| `comunalismo-bookchiniano` | `estatismo`, `modelo-territorial` |
| `falangismo-fe-jons-1934` | `modelo-territorial`, `uso-fuerza` |
| `franquismo-nacionalcatolico-1945-1957` | `modelo-territorial` |
| `hoxhaismo` | `internacionalismo` |
| `leninismo-bolchevique` | `internacionalismo` |
| `luxemburguismo` | `internacionalismo` |
| `marxismo-leninismo-sovietico-estaliniano` | `libertades-civiles` |
| `neoliberalismo-friedmaniano` | `estatismo`, `libertades-civiles`, `internacionalismo` |
| `posadismo` | `internacionalismo` |
| `republicanismo-federal-pimargalliano` | `estatismo` |
| `socialismo-democratico-pluralista` | `pluralismo-institucional` |

La salida JSON del script conserva para cada una de las 46 referencias el valor, número de ítems, carga y cobertura de **todas** las facetas, además de las aportaciones individuales a Poder. Así se evita duplicar en este documento una matriz 46×28 difícil de revisar y se mantiene la evidencia machine-readable.

## Prioridades

### P0 — antes de llamar exhaustivo al mapa

- Aplicar A/B en la interfaz: A principal y **todas** las B bajo profundidad; las históricas/contextuales conservan país, periodo y cautela en su ficha.
- Aumentar anclas directas de las referencias: los umbrales ya están activos, pero ninguna supera hoy Propiedad y Poder simultáneamente.
- Mantener Falangismo por debajo del 1 % con vecinos históricos reales: San Sepolcro, pre-Marcha, Salò, franquismo nacionalcatólico, Vichy, Shōwa y nacionalsocialismo. `N7` sigue pendiente para el matching, no para inflar su celda.
- Sustituir veto global por veto por plano; liberar solo los pares no afectados en democracia cristiana/eurocomunismo cuando cumplan evidencia.
- Mantener en validación continua área ≤3 %, Falangismo ≤1 %, vacío ≤45 y al menos quince corrientes serias por cuadrante; el atlas v4 cumple actualmente los cuatro límites.
- Hacer que la definición accesible de Poder coincida literalmente con sus componentes de código.

### P1 — densidad española útil

- Liberalismo social, tercera vía delimitada, derecha radical nativista sin x inventada, democracia cristiana por plano, confederalismo democrático contextual y corriente republicana federal contemporánea.
- Familias centrales jerárquicas: comunismos, anarquismos, liberalismos y conservadurismos; las ramas no deben competir simultáneamente con el nodo padre.
- Moderadores del centro: economía social de mercado, cooperativismo, pequeña propiedad, socialdemocracia y conservadurismo liberal con evidencia simétrica.
- Anclas centralistas para los planos territoriales y corrientes tradicionales/pluralistas separadas de concentración política.

### P2 — profundidad internacional e histórica

- Georgismo, agorismo, anarcoprimitivismo, neorreacción, paleolibertarismos, nacionalcomunismos y fases restantes del fascismo solo tras sus discriminantes.
- Las 130 fichas aún no instrumentadas requieren fuentes primarias/académicas por país y periodo antes de calcular afinidad; las sensibles mantienen revisión adversarial, sin iconografía ni lenguaje identitario.

## Discriminantes neutrales concretos

Además de `N1–N7` ya propuestos en la taxonomía:

| Id de investigación | Redacción neutral | Separa principalmente |
|---|---|---|
| `GEO-01` | «El aumento del valor de un terreno que no procede de mejoras de su propietario debería ser la base principal de la recaudación pública.» | Georgismo frente a liberalismo fiscal general. |
| `PROP-01` | «La prioridad debería ser repartir la propiedad productiva entre muchas familias y pequeños productores, no concentrarla ni en grandes empresas ni en el Estado.» | Distributismo, cooperativismo, propiedad estatal y capitalismo concentrado. |
| `PROP-02` | «Una empresa puede seguir siendo privada aunque el Estado le imponga objetivos obligatorios de producción, empleo o seguridad nacional.» | Propiedad privada dirigida/corporativismo frente a socialización. |
| `POD-01` | «Un gobierno elegido debería poder limitar temporalmente a la oposición si considera que bloquea una transformación profunda.» | Ruptura con pluralismo sin nombrar doctrinas. |
| `POD-02` | «La dirección de un movimiento debería poder ser revocada por sus bases incluso durante una crisis política.» | Vanguardia, centralismo, plataformismo y democracia interna. |
| `SOC-01` | «Un sistema económico puede conservar mercados para fijar precios aunque la mayoría de empresas pertenezcan a sus trabajadores.» | Socialismo de mercado, planificación administrativa y capitalismo privado. |
| `CONS-01` | «Las instituciones heredadas merecen una presunción a favor, aunque no puedan justificarse desde un diseño racional completo.» | Conservadurismo clásico frente a autoritarismo y liberalismo racionalista. |
| `NAT-01` | «La pertenencia política debería basarse en ciudadanía y adhesión a reglas comunes, no en ascendencia, religión o cultura familiar.» | Patriotismo cívico, nacionalismo cultural y etnonacionalismo. |
| `TECH-01` | «La automatización debería acelerarse aunque desplace empleo, si permite reducir de forma permanente el tiempo de trabajo.» | Aceleracionismo de izquierda frente a productivismo/precaución, sin aludir a violencia. |

Todos son modo exhaustivo, requieren revisión cognitiva, balance de polaridad y prueba de que añaden información incremental. Ninguno asigna una etiqueta por sí solo.

## Fuentes e idioma

Las fuentes marco extranjeras del catálogo auditado indican de forma visible «(en inglés)», «(en francés)» o «(en italiano)»; cuando existe versión española se prioriza. La regla debe validarse también en cada fuente de posición, no solo en `fuentesMarco`. Un título traducido no debe fingir que el recurso enlazado está en español.

## Validación reproducible

```bash
node scripts/auditar-geometria-ideologias.mjs > /tmp/geometria.json
jq '.resumen, .planos, .atlas, .atlasCoberturaEditorial, .taxonomia, .validacion' /tmp/geometria.json
node scripts/validate-data.mjs
git diff --check
```

Resultado del script en este corte: estructura válida, 178 etiquetas A–F completas y sin duplicados, 175 corrientes visibles con tres discriminantes, 46 referencias auditadas y doce declaraciones de faceta sin carga listadas arriba. El informe enumera las 130 corrientes sin referencia instrumentada; geometría y visibilidad pasan, pero esas fichas no calculan afinidad doctrinal hasta completar evidencia. Las 178 etiquetas exactas están resueltas entre 155 fichas visibles y 23 exclusiones individuales; las otras 20 fichas son adaptaciones españolas o históricas. El script no modifica datos ni el frontend y se adapta automáticamente cuando cambia el catálogo.
