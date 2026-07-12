# Feedback de beta-testers de Discord (julio 2026)

Dosier de diagnóstico y aplicación del feedback de dos beta-testers. Base de
trabajo: `0d6115e0e4516dd8c391bd7c9dc85327f8380119`. Los cambios de código
aplicados viven en los commits referenciados en cada sección; **ningún fichero
de datos (`data/`) ha sido tocado**: las piezas que exigen datos quedan aquí
listas-para-pegar para el integrador.

Nota de puertas: la base ya llegaba con 4 tests fallando, todos de datos y
ajenos a este trabajo (`fechas-fuentes-ratchet`, `partidos-regionales-geometria`
×2, `todo-validator`). Tras los cambios: 437 pasan / los mismos 4 fallan; los
typecheck de raíz y de `web/` pasan.

---

## 1. Bug «preguntas repetidas y ya seleccionadas»: diagnóstico y arreglo aplicado

> «Las últimas 30 preguntas han salido repetidas y ya venían seleccionadas, por
> lo que tampoco he tenido que hacer nada pero sí estaba pasándolas.»

### Veredicto

**Bug real de navegación**, no diseño mal rotulado. No hay ítems duplicados en
la secuencia (los ids son únicos en el banco y `secuenciaItems` no repite
ninguno): lo que el tester vio fue el **mismo tramo de preguntas ya
contestadas re-presentado una a una**, con su respuesta ya marcada en la
escala, sin ningún rótulo que lo explicara. El mecanismo legítimo de
re-confirmación (editar desde la revisión, botón «Anterior») no interviene en
esta traza.

### Traza exacta

1. El tester hizo el rápido (50 ítems del núcleo), siguió al exhaustivo y
   confirmó módulos. Respondió su secuencia; su perfil de izquierda desbloqueó
   más módulos por el camino (re-check dinámico).
2. En una frontera de módulo o al **completar la secuencia activa**, el
   re-check ofreció bloques nuevos (`estado.ts`, acción `siguiente` →
   `oferta-modulos`) y el tester **aceptó**.
3. `aceptar-oferta-modulos` añade los módulos a `modulosActivos`, pero
   `secuenciaItems` (web/src/datos.ts) **inserta cada módulo en su orden
   canónico** (`MODULOS` ordenado por `orden`), no al final. Un módulo
   aceptado tarde con orden bajo (p. ej. feminismos-moral, orden 8, o
   cualquier «siempre»: democracia 2, trabajo 3, energía 4…) queda **delante**
   de módulos ya respondidos con orden alto (socialdemocracia 15,
   corrientes-izquierda 17).
4. `seguirCuestionario` reanuda bien (salta a la primera pendiente con
   `primerSinResponder`), pero al terminar el bloque insertado la acción
   `siguiente` avanzaba `indice + 1` **sin saltar lo ya contestado**: todo el
   tramo respondido que quedaba físicamente detrás (decenas de preguntas, «las
   últimas 30») se re-presentaba pantalla a pantalla, cada una «ya
   seleccionada» (el Likert pinta `estado.respuestas[itemId]`), y había que
   pulsarlas una a una hasta el final.

La cifra «241 items» del tester es coherente: 50 del núcleo + ~190 de los
módulos activados (los cinco «siempre» suman 106, más los desbloqueados por su
perfil), menos condicionales no reveladas.

### Arreglo aplicado (causa raíz, mínimo cambio)

- `web/src/datos.ts`: nueva función pura `indiceProximoPendiente(secuencia,
  indice, respuestas)` → índice del siguiente ítem **sin responder**
  estrictamente después del actual, o −1.
- `web/src/estado.ts` (acción `siguiente`, rama de avance): el destino del
  avance es el siguiente pendiente, no el ítem físico contiguo. Si no queda
  nada pendiente por delante, cierra la secuencia por el camino ya existente
  (oferta de fin de secuencia → `faseTrasCompletar`). La oferta en frontera de
  módulo y el hito de 150 conservan su semántica (la frontera se evalúa entre
  el ítem actual y el destino del salto).
- `web/src/vistas/Cuestionario.tsx`: `esUltimo` pasa a ser «no queda pendiente
  por delante», de modo que el botón anuncia el cierre («Ver resultados» /
  «Finalizar…») aunque detrás quede un tramo respondido.

**Qué se conserva**: la edición desde revisión (`editando`), el botón
«Anterior» (retrocede paso a paso, incluidas respondidas: releer es opt-in y
rotulado) y el re-check dinámico completo (libro de ofrecidos, cortafuegos
anti-bucle, oferta ciega). Único cambio de comportamiento colateral: quien
retrocede N preguntas y pulsa «Siguiente» vuelve directo a la primera
pendiente en lugar de re-visitar una a una; el repaso fino sigue teniendo su
vista dedicada (Revisión).

**Contrato en tests** (`tests/avance-sin-repetidos.test.ts`, 3 tests):
premisa estructural; «siguiente» cierra en vez de re-mostrar el tramo
respondido; y reproducción íntegra de la traza del tester (aceptar la oferta
final e ir respondiendo: ninguna pantalla del avance presenta una pregunta ya
contestada ni repite ninguna). Los dos últimos fallaban antes del arreglo
(fallo observado: re-presentaba `izq-001`, ya contestada).

Commits: `fix(cuestionario): el avance salta las preguntas ya contestadas` y
`test(cuestionario): contrato de avance sin preguntas repetidas`.

---

## 2. Hueco corporativismo / economía mixta: inventario + ítems propuestos con fuentes

> «No hay muchas preguntas sobre el corporativismo o una economía mixta
> intervencionista. Y con darle un poco a apoyar nacionalizaciones ya te pone
> preguntas asumiendo que eres comunista.»

### 2a. Inventario de lo que hoy cubre el banco (408 ítems, solo lectura)

Cobertura actual de los temas señalados:

| Tema | Ítems existentes | Observación |
|---|---|---|
| Concertación / pacto social | `der-012` «Las grandes reformas económicas deben pactarse con los sindicatos y la patronal antes de aprobarse» | Único ítem; mide el pacto puntual, no la institucionalización permanente. Está en corrientes-derecha (no lo ve la izquierda). |
| Corporativismo orgánico (integración capital-trabajo por ramas) | `lab-012` «Los impuestos estatales deberían sustituirse por aportaciones gestionadas directamente por organizaciones profesionales y laborales» (condicional de lab-009); `lab-028` (prohibir sindicatos independientes, marco sistema-actual) | No existe ningún ítem que mida el corporativismo como modelo de organización de intereses (cámaras/corporaciones por rama con funciones públicas). El eje `autonomia-sindical` existe justo para esto («Separa el corporativismo estatal de los modelos sindicales autónomos») pero está infra-alimentado. |
| Gestión tripartita de instituciones | — | Sin cobertura. |
| Economía mixta / planificación indicativa | `izq-005` «La planificación pública debe **sustituir** al mercado…»; `izq-017` «En la transición al socialismo puede mantenerse… un amplio sector privado **subordinado** a la planificación» | Solo existen las variantes socialistas (sustitución/subordinación). La planificación **indicativa** (orientar la inversión privada sin sustituirla, art. 131 CE) no tiene ítem. Ambos ítems viven en corrientes-izquierda: solo los ve quien ya disparó ese módulo. |
| Empresa pública en competencia (sin estatalización general) | `ene-007` / `sd-011` (empresa pública **de energía** que compita con las privadas); `lab-016` «Las empresas estratégicas deberían estar **dirigidas por el Estado** aunque pudieran operar de forma rentable en manos privadas»; `dr-001` «El Estado debería nacionalizar la banca» (derecha-radical) | La versión multisectorial «empresa pública que compite sin excluir a la privada» (modelo SEPI / art. 128.2 CE) solo existe para energía. `dr-001` mide nacionalización de la banca, pero desde derecha-radical. |
| Proteccionismo / dirigismo industrial | `der-004` «El proteccionismo comercial es legítimo…» | Cubre el arancel; no cubre el dirigismo industrial activo (elegir sectores, condicionar ayudas: PERTE, autonomía estratégica). |

**Hueco real confirmado**: entre `eco-002` (gestión privada de servicios
públicos) y `izq-005/izq-016` (planificación sustitutiva, expropiación sin
indemnización) apenas hay peldaños. Un perfil corporativista, dirigista o de
economía mixta no socialista no tiene dónde expresarse, y el eje económico lo
empuja hacia el módulo de corrientes-izquierda (ver §3).

### 2b. Seis ítems nuevos listos-para-pegar

Formato exacto del banco. **`"ejes": []` a propósito** (ítem solo-matching
hasta que el integrador cablee cargas): la propuesta de cargas va como
anotación en `notas`, según lo pedido. Ids libres verificados: `lab-034…038`,
`der-028`. Todos ≤200 caracteres.

**(1) Concertación social institucionalizada — `lab-034`** (trabajo-estado-sindicatos)

```json
{
  "id": "lab-034",
  "texto": "Las grandes reformas económicas y laborales deberían negociarse en mesas permanentes de diálogo social entre Gobierno, sindicatos y patronal, institucionalizadas por ley.",
  "modulo": "trabajo-estado-sindicatos",
  "ejes": [],
  "polaridad": "positiva",
  "tags": ["concertacion", "dialogo-social", "tripartismo"],
  "estado": "piloto",
  "notas": "PROPUESTA DE CARGAS (integrador): estatismo +0.4, poder-laboral +0.4; sin carga en economico (la concertación no es izquierda-derecha: la practican gobiernos de ambos signos). Distinto de der-012: mide la institucionalización permanente por ley, no el pacto previo puntual."
}
```

Fuentes: [Ley 21/1991, de creación del CES (BOE-A-1991-15528)](https://www.boe.es/buscar/act.php?id=BOE-A-1991-15528) — la exposición de motivos lo funda en «reforzar la participación de los agentes económicos y sociales en la vida económica y social, reafirmando su papel en el desarrollo del Estado Social y Democrático de Derecho»; su función se califica de **diálogo social institucionalizado**. [Art. 131.2 CE](https://app.congreso.es/consti/constitucion/indice/sinopsis/sinopsis.jsp?art=131&tipo=2): «El Gobierno elaborará los proyectos de planificación… con el asesoramiento y colaboración de los sindicatos y otras organizaciones profesionales, empresariales y económicas».

**(2) Gestión tripartita de instituciones — `lab-035`** (trabajo-estado-sindicatos)

```json
{
  "id": "lab-035",
  "texto": "Los organismos que gestionan pensiones, desempleo y formación deberían estar gobernados de forma paritaria por la Administración, los sindicatos y las organizaciones empresariales.",
  "modulo": "trabajo-estado-sindicatos",
  "ejes": [],
  "polaridad": "positiva",
  "tags": ["tripartismo", "seguridad-social", "participacion-institucional"],
  "estado": "piloto",
  "notas": "PROPUESTA DE CARGAS (integrador): poder-laboral +0.5, estatismo +0.2. Discrimina el modelo continental de cogobierno paritario frente a la gestión puramente administrativa o privatizada; no presupone propiedad pública (sin carga en propiedad-mercado)."
}
```

Fuentes: [Orden de 17-1-1980, Reglamento de los Consejos Generales del INSS (BOE-A-1980-1497)](https://www.boe.es/buscar/act.php?id=BOE-A-1980-1497) — desarrolla el RDL 36/1978, que instrumentó la participación «a través de Órganos en los que figurarían, **por partes iguales**, representantes de los distintos Sindicatos, de las Organizaciones Empresariales y de la Administración Pública». [Art. 129.1 CE, vía Revista de la Seguridad Social](https://revista.seg-social.es/-/participaci%C3%B3n-de-los-trabajadores-en-la-seguridad-social-de-un-estado-social-y-democr%C3%A1tico): «La ley establecerá las formas de participación de los interesados en la Seguridad Social».

**(3) Corporativismo orgánico por ramas — `lab-036`** (trabajo-estado-sindicatos)

```json
{
  "id": "lab-036",
  "texto": "Empresarios y trabajadores de cada sector deberían integrarse en corporaciones únicas por rama de producción, con funciones públicas, en vez de organizarse en sindicatos y patronales enfrentados.",
  "modulo": "trabajo-estado-sindicatos",
  "ejes": [],
  "polaridad": "positiva",
  "tags": ["corporativismo", "organizacion-intereses"],
  "estado": "piloto",
  "terminos": ["corporativismo"],
  "notas": "PROPUESTA DE CARGAS (integrador): autonomia-sindical -0.75 (polo integración/subordinación), estatismo +0.4, poder-laboral 0. Es EL discriminante corporativista (falangismo, doctrina social organicista, fascismos) frente a sindicalismo de clase Y frente a pluralismo liberal: ambos responderían en contra por motivos opuestos. Requiere término nuevo de glosario «corporativismo» (organización de intereses por ramas con reconocimiento público; distinto del uso coloquial «defensa gremial»)."
}
```

Fuentes: [Fuero del Trabajo de 1938, BOE núm. 505](https://www.boe.es/datos/pdfs/BOE/1938/505/A06178-06181.pdf) — Declaración XIII: «Todos los factores de la economía serán encuadrados por ramas de la producción o servicios en Sindicatos verticales» (corporación de derecho público ordenada «bajo la dirección del Estado»). [Encíclica *Quadragesimo Anno* (1931), vatican.va](https://www.vatican.va/content/pius-xi/es/encyclicals/documents/hf_p-xi_enc_19310515_quadragesimo-anno.html) — propone reconstruir el orden social mediante corporaciones por profesiones que reúnan a patronos y obreros del mismo sector para colaborar «en lugar de enfrentarse en la lucha de clases» (variante no estatal del mismo modelo).

**(4) Planificación indicativa — `lab-037`** (trabajo-estado-sindicatos)

```json
{
  "id": "lab-037",
  "texto": "El Estado debería aprobar planes económicos plurianuales que fijen prioridades y orienten la inversión privada mediante incentivos, sin sustituir la iniciativa ni la propiedad privadas.",
  "modulo": "trabajo-estado-sindicatos",
  "ejes": [],
  "polaridad": "positiva",
  "tags": ["planificacion-indicativa", "economia-mixta"],
  "estado": "piloto",
  "terminos": ["planificacion-indicativa"],
  "notas": "PROPUESTA DE CARGAS (integrador): estatismo +0.6; propiedad-mercado 0 o levemente negativo (-0.1): orienta el mercado pero conserva propiedad privada. Es el peldaño que falta entre eco-004 (austeridad) e izq-005 (planificación sustitutiva): la economía mixta con plan indicativo (art. 131 CE, planificación francesa de posguerra). Junto a izq-005 permite separar dirigismo de colectivización. Glosario nuevo «planificación indicativa»."
}
```

Fuentes: [Art. 131.1 CE (La Moncloa, Título VII)](https://www.lamoncloa.gob.es/espana/leyfundamental/paginas/titulo_septimo.aspx): «El Estado, mediante ley, podrá planificar la actividad económica general para atender a las necesidades colectivas, equilibrar y armonizar el desarrollo regional y sectorial…». [Wikipedia: Planificación indicativa](https://es.wikipedia.org/wiki/Planificaci%C3%B3n_indicativa): «información coordinada que guía las elecciones de entidades estatales y privadas en una economía de mercado o economía mixta… los planes indicativos sirven para complementar y mejorar el mercado, en lugar de reemplazar el mecanismo del mercado» (origen: Francia 1946, Commissariat général du Plan).

**(5) Empresa pública en competencia, multisectorial — `lab-038`** (trabajo-estado-sindicatos)

```json
{
  "id": "lab-038",
  "texto": "En sectores como la banca, las telecomunicaciones o el transporte, el Estado debería tener empresas públicas que compitan con las privadas, sin excluirlas del mercado.",
  "modulo": "trabajo-estado-sindicatos",
  "ejes": [],
  "polaridad": "positiva",
  "tags": ["empresa-publica", "economia-mixta", "sector-publico-empresarial"],
  "estado": "piloto",
  "notas": "PROPUESTA DE CARGAS (integrador): propiedad-mercado -0.35, estatismo +0.3, economico -0.25. Generaliza ene-007/sd-011 (hoy limitados a energía) y discrimina la nacionalización SECTORIAL en competencia (modelo SEPI/art. 128.2 CE) frente a lab-016 (dirección estatal aun siendo rentable en manos privadas) e izq-016 (expropiación sin indemnización). Pieza clave para el gatillo fino de §3: apoyar esto NO es colectivización general."
}
```

Fuentes: [Sinopsis del art. 128 CE (Congreso)](https://app.congreso.es/consti/constitucion/indice/sinopsis/sinopsis.jsp?art=128&tipo=2): «Se reconoce la iniciativa pública en la actividad económica» — la sinopsis subraya la «coexistencia de los dos sectores económicos, privado y público… el que se ha dado en llamar sistema de economía mixta». [SEPI — Quiénes somos](https://www.sepi.es/es): holding estatal con participación mayoritaria directa en 14 empresas (y minoritaria en un centenar) que operan en mercados abiertos: energía, defensa, alimentación, comunicación.

**(6) Dirigismo industrial — `der-028`** (corrientes-derecha)

```json
{
  "id": "der-028",
  "texto": "El Gobierno debería practicar una política industrial activa: elegir sectores estratégicos y condicionar las ayudas públicas a invertir, producir y mantener empleo en España.",
  "modulo": "corrientes-derecha",
  "ejes": [],
  "polaridad": "positiva",
  "tags": ["dirigismo", "politica-industrial", "autonomia-estrategica"],
  "estado": "piloto",
  "notas": "PROPUESTA DE CARGAS (integrador): estatismo +0.5; sin carga en propiedad-mercado (dirige, no posee). En corrientes-derecha separa la derecha dirigista/nacional-productivista (que respondería a favor) de la derecha liberal (en contra); complementa a der-004 (arancel) midiendo la dirección activa. Si el integrador prefiere que lo vea todo el espectro, el módulo alternativo natural es energia-modelo-productivo (id ene-013)."
}
```

Fuentes: [¿Qué son los PERTE? (Plan de Recuperación, Gobierno de España)](https://planderecuperacion.gob.es/preguntas/que-son-los-perte): instrumento «de impulso y coordinación de proyectos muy prioritarios… en los que exista un claro fallo de mercado, externalidades importantes o una insuficiente iniciativa o capacidad de inversión por parte del sector privado», aprobados sector a sector (semiconductores, vehículo eléctrico, naval, aeroespacial…) por el Consejo de Ministros. [Art. 131.1 CE](https://www.lamoncloa.gob.es/espana/leyfundamental/paginas/titulo_septimo.aspx) (habilitación general del dirigismo democrático).

**Glosario requerido** (2 términos nuevos, para `data/glosario.json`, del
integrador): `corporativismo` y `planificacion-indicativa`; definiciones
sugeridas en las notas de los ítems 3 y 4, con URL de referencia (Wikipedia
[Corporativismo](https://es.wikipedia.org/wiki/Corporativismo) y
[Planificación indicativa](https://es.wikipedia.org/wiki/Planificaci%C3%B3n_indicativa)).

### 2c. Ver §3 (misma queja, pieza adaptativa)

---

## 3. Oferta adaptativa: regla actual exacta y propuesta

### Regla actual (verificada en código y datos)

1. **Gatillo** (`data/modulos.json`): `corrientes-izquierda` se desbloquea con
   `{tipo: "eje", eje: "economico", operador: "<=", umbral: -40}`. Es
   **unidimensional**: solo mira el macroeje económico.
2. **Pantalla «Profundización personalizada»** (`web/src/vistas/Modulos.tsx`):
   la selección ciega inicial marca todo lo que devuelve
   `modulosDesbloqueados(MODULOS, calcularEjes(respuestasActivas), {ccaa})`.
   Sin piso adicional de evidencia (tras el núcleo hay señal de sobra).
3. **Oferta en vuelo** (`web/src/estado.ts`): `modulosRecienDesbloqueados`
   exige además ≥4 ítems con opinión en el eje gatillo
   (`MINIMO_ITEMS_EJE_OFERTA = 4`), aplica el cortafuegos anti-bucle en
   fronteras y el libro de `modulosOfrecidos`.
4. **Contenido**: el módulo `corrientes-izquierda` (52 ítems) arranca con
   método revolucionario, partido de vanguardia, balance de la URSS y de
   Stalin, expropiación sin indemnización… — preguntas legítimas para afinar
   corrientes, pero leídas como «asumir que eres comunista» si llegas ahí solo
   por intervencionismo.

**Por qué la queja es fundada, con números** (núcleo: 15 ítems cargan
`economico`, Σ|c| = 13,25):

- Responder «de acuerdo» (±1, sin ningún extremo) en dirección izquierda a los
  15 → eje económico = **−50** → cruza el umbral −40.
- Incluso ±1 en 12 de los 15 y neutral en el resto → **−43,4** → cruza.
- En vuelo, el piso de 4 ítems es exactamente alcanzable: 4 respuestas «muy de
  acuerdo» de izquierda con el resto sin opinión → −100 con n=4 → oferta.

Es decir: un socialdemócrata moderado que apoya subir impuestos a rentas
altas, SMI y vivienda pública (y no ha visto ni una pregunta de
nacionalización) recibe el módulo cuyo segundo ítem es el partido de
vanguardia. El eje `economico` mezcla fiscalidad, regulación e intervención;
la señal de **colectivización** vive en otro eje (`propiedad-mercado`, creado
justo «para no codificar como izquierda cualquier intervencionismo», ver
`src/engine/espacio.ts`), pero el gatillo no la usa.

### Propuesta (condición más fina)

Distinguir **nacionalización sectorial / intervencionismo** de
**colectivización general** exigiendo dos señales a la vez:

```json
{
  "tipo": "ejes-todos",
  "condiciones": [
    { "eje": "economico", "operador": "<=", "umbral": -40 },
    { "eje": "propiedad-mercado", "operador": "<=", "umbral": -35 }
  ]
}
```

El núcleo ya alimenta `propiedad-mercado` con 9 ítems (eco-002, eco-005,
eco-006, eco-007, eco-009, eco-010, eco-012, eco-013, eco-014): hay señal
suficiente sin añadir preguntas. Con los ítems propuestos en §2b (lab-037,
lab-038) la separación dirigismo/colectivización mejora aún más. El umbral
−35 es orientativo: calibrar con `npm run calibrar` / perfiles de prueba.

**Parte implementada (solo lógica, sin datos)** — commits
`feat(engine): desbloqueo conjuntivo «ejes-todos»…` y
`test(engine): contrato del desbloqueo conjuntivo…`:

- `src/engine/types.ts`: tipo `ejes-todos` con `condiciones: CondicionEje[]`
  (umbral con operador u horquilla min–max).
- `src/engine/ideologia.ts`: evaluación conjuntiva con fallo cerrado (eje sin
  señal, lista vacía o condición malformada → no desbloquea). El piso de ≥4
  ítems de la oferta en vuelo aplica automáticamente a **cada** eje del
  gatillo (los ejes bajo el piso llegan como `null`).
- `web/src/estado.ts`: el cortafuegos anti-bucle lee gatillos conjuntivos
  (basta que uno de sus ejes lo cargue el módulo recién terminado para
  diferir la oferta).
- `tests/desbloqueo-conjuntivo.test.ts`: 6 tests con módulos sintéticos.

**Parte pendiente para el integrador (datos, prohibida aquí)**:

1. Pegar el bloque `ejes-todos` de arriba en `data/modulos.json`
   (corrientes-izquierda). Simétricamente puede estudiarse
   `corrientes-derecha` (economico ≥ 40 ∧ propiedad-mercado ≥ 35).
2. Extender `scripts/validate-data.mjs` (líneas 184-192): hoy solo valida los
   ejes de los tipos `eje`/`eje-banda`/`eje-o-ccaa`; debe validar también cada
   `condiciones[].eje` de `ejes-todos` (y min ≤ max).
3. Revisar el impacto en `tests` de datos si algún test fija el gatillo
   actual.

Alternativa menor si no se quiere tocar el gatillo: mantener `-40` pero bajar
el listón de socialdemocracia-reformismo de forma que el moderado reciba antes
ese módulo — ya ocurre (banda económica [−60, 15]); el problema no es que
falte sd, es que **sobra** corrientes-izquierda a −40 sin señal de propiedad.

---

## 4. «Izquierda + orden» → «franquismo»: hallazgos

> Comentario: «"izquierda + orden" -> "franquismo"».

### Qué ve exactamente el usuario hoy

- «Izquierda + orden» es, literalmente, el **descriptor de esquina**
  arriba-izquierda del plano detallado **Economía × Sociedad**
  (`web/src/componentes/MapaPolitico.tsx`, `ESQUINAS['economico-social']`).
  El eje Y es el social/GAL-TAN con polos llanos «Libertades y diversidad» ↔
  «Orden y tradición» (`web/src/lecturaEjes.ts`). No es la brújula principal
  (que usa Propiedad y mercado × Poder).
- La capa de fondo de ese plano son **zonas de Voronoi** alrededor de las
  referencias doctrinales con ≥4 posiciones documentadas en **ambos** ejes
  (`web/src/zonasCorrientes.ts` → `referenciasDelPar`). Hoy solo **26 de las
  86 referencias** del catálogo cumplen ese requisito en el par
  economico×social, y en todo el cuadrante izquierda+orden caen **cinco**:

  | Referencia | economico | social |
  |---|---:|---:|
  | Fascismo italiano del Ventennio | −11,1 | +100 |
  | **Franquismo nacionalcatólico (1945-1957)** | **−62,5** | **+100** |
  | Marxismo-leninismo soviético (estaliniano) | −100 | +63,6 |
  | Falangismo de FE de las JONS (1934) | −36,1 | +36,7 |
  | Distributismo | −17,1 | +30 |

- El franquismo proyecta a **economico −62,5** porque sus posiciones
  documentadas (autarquía, intervención, regulación) puntúan «izquierda» en un
  eje que mide intervención/redistribución frente a mercado. Como el Voronoi
  **reparte todo el plano** entre las anclas existentes (no hay zonas vacías),
  la franja izquierda-alta no extrema (p. ej. usuario en −60, +70; −80, +90;
  −50, +70) cae de lleno en la zona rotulada «Franquismo nacionalcatólico»;
  solo el extremo −100 cae en el estalinismo y la franja media-baja en el
  falangismo. Un usuario de izquierda con preferencia por el orden ve su punto
  sobre «Franquismo» aunque esté a 40-60 unidades del ancla.

### Diagnóstico

Los tres factores a la vez, por este orden:

1. **Densidad**: 5 anclas para un cuadrante entero. Corrientes que precisarían
   esa zona (marxismo-leninismo genérico, maoísmo, hoxhaísmo, socialismo
   conservador, izquierda social-patriótica, strasserismo…) existen en
   `data/referencias/` o en el atlas pero **no alcanzan 4 posiciones con carga
   en `social`** y no se dibujan (medido: strasserismo n=3/2,
   ML-maoísmo n=3/1, izquierda-social-patriótica n=3/2,
   marxismo-ortodoxo n=2/0, hoxhaísmo n=0/0…). El atlas educativo
   (`data/mapa-ideologias.json`) tiene 49 corrientes en su cuadrante
   equivalente, pero solo se muestra en el par Propiedad × Poder.
2. **Concepto del eje X**: en economico×social el intervencionismo autoritario
   de derechas proyecta a la izquierda (franquismo a −62,5). Exactamente la
   confusión que la brújula principal evita usando `propiedad-mercado` (en el
   atlas el franquismo está en x = +34: cuadrante derecha-autoritario). El
   plano detallado hereda el problema conocido del eje económico compuesto.
3. **Rotulación**: la zona muestra «Franquismo nacionalcatólico» (el
   `rotuloZona` recorta «(1945-1957)») sin pista de que es la *referencia más
   cercana* de una capa poco poblada, ni de a qué distancia está.

Es decir: no es un dato erróneo (la coordenada del franquismo es defendible y
auditada), es **percepción producida por baja densidad + eje compuesto + rótulo
sin matiz**.

### Propuestas concretas (sin tocar datos)

1. **Datos (integrador, la de más impacto)**: completar posiciones `social`
   de 3-5 referencias de izquierda autoritaria/estatista hasta ≥4 ítems con
   carga (candidatas por cercanía al umbral: strasserismo,
   marxismo-leninismo-maoismo, izquierda-social-patriotica-espanola,
   marxismo-ortodoxo, consejismo — este último ya tiene economico n=4 y le
   faltan 2 de social). Cada ancla nueva parte el Voronoi y el cuadrante deja
   de ser un duopolio franquismo/estalinismo.
2. **UI (web/src, sin datos)**: cuando el punto del usuario cae en una zona
   cuya ancla está a más de ~35 unidades, añadir al tooltip/leyenda del plano
   la coletilla ya usada en otros sitios del mapa: «referencia más cercana a N
   puntos (orientativa); esta zona del atlas tiene pocas referencias
   documentadas». El dato de distancia ya se calcula para el panel de zona.
3. **UI (web/src)**: en los planos detallados, rotular las referencias de
   régimen histórico con su periodo («Franquismo nacionalcatólico 1945-57»):
   `rotuloZona` hoy recorta el paréntesis; una excepción para años cuesta una
   línea y reduce la lectura «me llama franquista».
4. **Orientación**: mantener la brújula Propiedad × Poder como plano por
   defecto al compartir/capturar (si no lo es ya), porque en ella el usuario
   «izquierda + orden» cae entre corrientes de izquierda autoritaria reales y
   el franquismo queda en su cuadrante correcto.

La propuesta 2 o 3 puede implementarse en una tanda posterior si el
propietario las prioriza; no se han tocado en esta tanda para no mezclar
alcances.

---

## Integración (FABLE, 2026-07-12)

Los 5 commits del agente entraron por cherry-pick sin conflicto (triaje: 0 posiciones
tocadas, ficheros exactamente los declarados). El arreglo del avance y el motor
`ejes-todos` se verificaron línea a línea y quedan como estaban.

**Corrección §0 al umbral propuesto**: el −35 de `propiedad-mercado` era un placebo.
Medido sobre el banco real: el perfil «±1 uniforme hacia la izquierda» del §3 —el caso
exacto de la queja— da **economico −50 y propiedad-mercado −50**, porque los 12 ítems del
núcleo que cargan `propiedad-mercado` son de redistribución/servicios (impuestos, SMI,
alquileres, parque público, conciertos, sanidad), no de colectivización: en datos de
núcleo ambos ejes son casi colineales y −35 se cruza igual. Umbral aplicado: **−55**
(el ±1 uniforme queda fuera; convicción con varios ±2 entra; el extremo −100/−100 de los
tests de oferta entra de sobra). Gatillo aplicado SIMÉTRICO también a
`corrientes-derecha` (+40 ∧ +55): la neutralidad del instrumento exige que el liberal
moderado tampoco reciba la batería anarcocapitalista por las mismas razones.

Aplicado además: esquema `modulo.schema.json` (tipo `ejes-todos` + `condiciones`),
validador `validate-data.mjs` (ejes existentes, umbral/banda coherentes, lista no vacía)
y contrato en `tests/engine.test.ts` que pina las cuatro esquinas (moderado fuera,
convencido dentro, sin-segunda-señal fuera, simétrico derecha). El hash semántico no
cubre gatillos: sin cambio de versión.

**En cola (bloque de ítems, no en esta integración)**: los 6 ítems propuestos en §2b
(lab-034…038, der-028) con verificación §0 de sus fuentes, y las propuestas del §4 sobre
la densidad del cuadrante izquierda-autoritaria del plano Economía×Sociedad.
