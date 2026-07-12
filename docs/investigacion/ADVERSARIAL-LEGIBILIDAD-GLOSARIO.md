# Encargo adversarial de legibilidad — glosario del banco de ítems

**Fecha:** 2026-07-12 · **Base:** `fb97e64` (glosario ya ampliado a 64 términos) · **Alcance:** SOLO LECTURA sobre datos. Este documento propone; **no** modifica `data/items/*.json` ni `data/glosario.json`. El integrador aplica tras triaje.

**Método.** Lectura completa de los 406 ítems (`data/items/*.json`: texto, notas, `terminos`, `condicion`, `marco`) y de las 64 entradas del glosario, adoptando la mirada de un votante que **no** sabe politología. Se puntúa cada ítem sospechoso 1-3 y se propone el apoyo que necesita: cableado de término existente, término nuevo redactado, o —si el problema es de redacción, no de vocabulario— una reformulación **que no cambia la tesis medida** (solo se propone, jamás se aplica: un cambio semántico obligaría a migrar perfiles).

Criterios de dificultad: **C1** jerga técnica sin glosario cableado · **C2** abstracción filosófica · **C3** dobles negaciones o condicionales enrevesados · **C4** seguimiento anafórico que exige recordar la pregunta madre · **C5** siglas sin desarrollar · **C6** concepto histórico-doctrinal · **C7** enunciado largo (>24-30 palabras) con más de una tesis aparente.

---

## §1 · Resumen y recuentos

- **406 ítems** revisados. **64/64** términos del glosario están cableados al menos una vez (no hay términos huérfanos; no se proponen duplicados).
- **~82 ítems** puntúan dificultad ≥2 para el votante medio. Reparto por criterio principal (un ítem puede tocar varios; se cuenta el dominante):

| Criterio | Nº aprox. | Ítems más representativos |
|---|---|---|
| C1 jerga sin glosario | 23 | dem-013, dem-016, dem-017, dem-020, izq-007, izq-009, izq-029, izq-032, lab-002, lab-007, lab-008, cat-001, gal-005, ter-004, geo-015 |
| C2 abstracción filosófica | 9 | lab-010, lab-011, izq-047, izq-048, izq-054, izq-055, der-027 |
| C3 condicional/negación | 8 | nac-001, cat-007, geo-011, dem-035, izq-054, eus-005 |
| C4 seguimiento anafórico | 12 | **los 12**: izq-037, dem-017/018/019/020, lab-010/011/012/013/027/019/030 |
| C5 siglas sin desarrollar | 3 | lib-008 (VTC), eco-008 (IPC), varios (LGTB/LGTBI) |
| C6 histórico-doctrinal | 22 | izq-021/022/023/029/030/049/050/051/053, dr-013/014/026, izq-004/006/020, va-019 |
| C7 largo / multi-tesis | 7 | cul-016 (32p), der-027 (30p), izq-047 (27p), izq-053 (27p), cul-006 (27p), lab-031 (27p), va-019 (26p) |

- **Los 12 seguimientos** son el foco de mayor riesgo: todos dependen de una pregunta madre y cuatro (`lab-010/011/027/030`) empiezan con anáfora («Mi rechazo / Mi objeción / Desaparecerían porque…») que solo se entiende recordando la respuesta anterior. Requieren que la interfaz muestre el enunciado madre encima del seguimiento (ver §5).
- **Términos nuevos propuestos:** 12 con URL de es.wikipedia verificada por WebSearch (§3) + 2 con URL sin resolver que van a cola humana (`campismo`, `reconstitución`; §6).
- **Cableados de términos existentes propuestos:** 22 (§4), varios son huecos claros (p. ej. `fem-009` nombra los Acuerdos de 1979 pero no cablea `acuerdos-santa-sede-1979`; `cat-002`/`ter-003` citan «concierto vasco» sin cablear `concierto-economico`).
- **Redacciones a revisar (defecto de fábrica, no de glosario):** 5 (§5).
- **PETICIÓN EXPRESA DEL PROPIETARIO** (§5.1): ambigüedad en la *oposición* a las cooperativas (`lab-017`, `izq-032`, adyacente `and-003`); remedio propuesto: par de seguimientos «Mi rechazo se debe a…» en la rama de desacuerdo, que desambigua el motivo propietarista del estatista **sin tocar la tesis medida**.

**Módulos más densos** (jerga/doctrina): `corrientes-izquierda` (izq-047..055 solo-matching doctrinal), `democracia-instituciones` (seguimientos dem-017..020, mandato imperativo, sorteo), `trabajo-estado-sindicatos` (seguimientos lab-009→010/011/012/013/027, cogestión, consejos, concertación), `derecha-radical` (sindicato vertical, democracia orgánica). Los módulos territoriales y de núcleo son mayoritariamente legibles salvo la jerga fiscal-territorial (concierto, ordinalidad, financiación singular), ya cubierta por glosario.

---

## §2 · Tabla ítem → dificultad → remedio (ítems con dificultad ≥2)

Leyenda remedio: **[N id]** = redactar/usar término nuevo (§3) · **[+id]** = cablear término existente (§4) · **[R]** = redacción a revisar (§5) · **[UI]** = mostrar pregunta madre en interfaz.

### corrientes-izquierda (el módulo más doctrinal)

| Ítem | Punt. | Crit. | Por qué es difícil (1 frase) | Remedio |
|---|---|---|---|---|
| izq-007 | 2 | C1/C6 | «El Estado, incluso uno obrero…» presupone el concepto marxista de «Estado obrero», que un votante no maneja. | [N consejismo] contextualiza; o nota; ya hay `burocratizacion-urss` cerca. |
| izq-009 | 2 | C1/C6 | «coaliciones amplias con otras fuerzas progresistas» mide el «frente amplio/popular» sin nombrarlo ni explicarlo. | [N frente-popular] |
| izq-021 | 2 | C6 | «Trotski… frente a la burocratización de la URSS» exige saber quién fue Trotski y qué disputa encarna. | `burocratizacion-urss` ya cableado; OK. |
| izq-022 | 3 | C6 | «La Revolución Cultural china» es un episodio histórico que la mayoría no ubica ni entiende. | [N revolucion-cultural] |
| izq-023 | 2 | C6 | «Conquistar una república democrática… aunque todavía no fuera socialista» es la tesis del *etapismo*, invisible para el lego. | Nota o [N] «etapismo» (secundario); o reformular. |
| izq-029 | 3 | C1/C6 | «apoyar al bando enfrentado a Estados Unidos» mide *campismo* vs conflicto interimperialista, jerga pura. | [N campismo] (URL a resolver, §6); `otan` ya cableado. |
| izq-030 | 2 | C6 | «la decisión del PCE de aceptar el marco de la Constitución de 1978» exige contexto eurocomunista/Transición. | [N eurocomunismo] |
| izq-032 | 2 | C1 | «cooperativas gestionadas por sus trabajadores… más que empresas nacionalizadas» opone autogestión a estatismo sin nombrarlo. | [N autogestion] |
| izq-047 | 2 | C2/C7 | 27 palabras; «análisis científico… más que ideales morales» es la abstracción socialismo científico/utópico. | `materialismo-historico` cableado; OK (borderline). |
| izq-048 | 2 | C2 | «construir ya… la sociedad deseada» abstracción prefigurativa. | `politica-prefigurativa` cableado; OK. |
| izq-049 | 3 | C6/C7 | «El giro de la URSS tras la muerte de Stalin (el XX Congreso del PCUS, 1956)… abandono del socialismo» es doctrina de nicho. | [N xx-congreso-pcus] |
| izq-050 | 3 | C6 | «El partido comunista debe reconstituirse desde cero…» = tesis de la *reconstitución*, opaca. | [N reconstitucion] (URL a resolver, §6) |
| izq-051 | 2 | C1/C7 | «…desvían… de la contradicción entre capital y trabajo» usa jerga marxista; 22 palabras. | [R] simplificar la jerga; o nota. |
| izq-053 | 3 | C6/C7 | «militar dentro de los grandes partidos… para ganarlos desde dentro» = *entrismo*; 27 palabras. | [N entrismo] |
| izq-054 | 2 | C2/C3 | 26 palabras; condicional + concesiva («aunque una parte hubiera votado en contra») sobre responsabilidad colectiva. | Texto sin jerga; [UI]/nota; no requiere término. |
| izq-055 | 2 | C2 | Abstracción filosófica (egoísmo stirneriano) aunque el texto sea llano; concepto de nicho. | Texto autoexplicativo; sin término (nicho). |
| izq-004/006/020 | 2 | C6 | Balances de la URSS/Stalin/«socialismo en un país». | `socialismo-real`/`socialismo-en-un-pais` cableados; OK. |
| va-019 (verde) | 2 | C6/C7 | 26 palabras; «desmontar la sociedad industrial» = anarcoprimitivismo, sin nombrarlo. | Texto autoexplicativo; nota opcional. |

### democracia-instituciones

| Ítem | Punt. | Crit. | Por qué | Remedio |
|---|---|---|---|---|
| dem-013 | 3 | C1 | «obligados por las instrucciones… de quienes los eligieron» = *mandato imperativo*. **Las propias notas piden explicarlo en glosario antes del lanzamiento.** | [N mandato-imperativo] |
| dem-016 | 2 | C1 | «escogerse por sorteo entre la ciudadanía» es una práctica que el votante no conoce (sorteo/demarquía). | [N sorteo-democratico] |
| dem-017 | 3 | C1/C4 | Seguimiento; «consejos locales y laborales cuyos delegados fueran revocables» = consejismo + mandato imperativo. | [N consejismo] + [UI] |
| dem-018 | 2 | C4 | Seguimiento; «por municipios y ámbitos profesionales en lugar de por partidos» = representación corporativa/orgánica (de-etiquetada a propósito). | [UI]; nota (evitar `democracia-organica`, se de-etiquetó adrede). |
| dem-019 | 2 | C4 | Seguimiento; «un movimiento político unificado… sin competencia entre partidos» = partido único, sin nombrarlo. | [UI]; nota. |
| dem-020 | 2 | C1/C4 | Seguimiento; «proceso constituyente plural» es jerga institucional. | [N proceso-constituyente] + [UI] |
| dem-025 | 2 | C1 | «reparto de escaños lo más proporcional posible aunque aumente la fragmentación» opone proporcionalidad/gobernabilidad. | Nota o `listas-electorales` (parcial). |
| dem-026 | 2 | C1 | «mayoría parlamentaria reforzada y mandato no coincidente con el del Gobierno» = jerga (mayoría cualificada). | Nota o [N] mayoría-cualificada (secundario). |
| dem-034 | 2 | C1/C3 | «confederación de territorios soberanos que delegan competencias limitadas» — denso y técnico. | Nota o término territorial (secundario); precisa, no reformular. |
| dem-035 | 2 | C3 | «derecho legal de salida aunque el resto se opusiera» — condicional que presupone entender «confederal». | Depende de dem-034; nota. |

### trabajo-estado-sindicatos

| Ítem | Punt. | Crit. | Por qué | Remedio |
|---|---|---|---|---|
| lab-002 | 2 | C1 | «elegir una parte del órgano de dirección de las grandes empresas» = *cogestión* (parafraseada). | [N cogestion] |
| lab-007 | 2 | C1 | «acordar con el Gobierno planes económicos vinculantes por sector» = concertación/planificación tripartita. | Nota o [N] concertacion-social (secundario). |
| lab-008 | 2 | C1/C6 | «Consejos elegidos en los centros de trabajo deberían dirigir la producción» = consejos obreros/control obrero. | [N consejismo] + [N autogestion] |
| lab-010 | 3 | C2/C4 | Seguimiento anafórico; «la propiedad privada no debería financiar servicios colectivos sin consentimiento individual» — abstracción propietarista (el caso señalado en el encargo). | [R] + [UI] |
| lab-011 | 2 | C2/C4 | Seguimiento anafórico; «gravar salarios no cambia quién posee y dirige las grandes empresas». | [R] + [UI] |
| lab-012 | 2 | C1/C4 | Seguimiento; «aportaciones gestionadas por organizaciones profesionales y laborales» = alternativa corporativa/gremial a Hacienda. | [UI]; nota. |
| lab-013 | 2 | C4 | Seguimiento; legible, pero «no la existencia de impuestos en sí misma» exige recordar lab-009. | [UI] |
| lab-019 | 2 | C4 | Seguimiento de lab-004 (rama «financiación mixta»); legible pero descontextualizado sin la madre. | [UI] |
| lab-027 | 2 | C4 | Seguimiento anafórico; «Mi rechazo se debe a que los recursos públicos deberían reservarse… a la comunidad nacional». | [R] + [UI]; `chovinismo-bienestar` cableado. |
| lab-030 | 2 | C4 | Seguimiento anafórico; «Desaparecerían porque la autoorganización directa y horizontal…» — el sujeto («sindicatos») está en la madre lab-029. | [R] + [UI] |
| lab-031 | 2 | C7 | 27 palabras; impuesto sobre el valor del suelo (georgismo). | `impuesto-valor-suelo` cableado; OK. |
| lab-018 | 2 | C1 | «sustituir a los partidos como vía de representación de los trabajadores» = horizonte sindicalista. | `marco` ya ayuda; nota. |

### derecha-radical / corrientes-derecha

| Ítem | Punt. | Crit. | Por qué | Remedio |
|---|---|---|---|---|
| dr-013 | 2 | C6 | «representación orgánica basada en municipios, familias y ámbitos profesionales» = democracia orgánica. | `democracia-organica` cableado; OK. |
| dr-014 | 2 | C6 | «una única organización conjunta… bajo la dirección del Estado» = sindicato vertical. | `sindicato-vertical` cableado; OK. |
| dr-026 | 2 | C6 | «El sindicalismo nacional debería organizar solo a quienes producen…» = nacionalsindicalismo antipatronal; matiz muy fino. | `sindicato-vertical` cableado; OK. |
| der-027 | 2 | C2/C7 | 30 palabras; propiedad productiva repartida = distributismo. | `distributismo` cableado; OK. |
| dr-024/025 | 2 | C2 | «un régimen autoritario puede ser preferible…» / «La violencia nunca es un medio legítimo» — abstracción tipo encuesta de valores. | Texto llano; sin término. |

### identidad-cultura / geopolítica / nacionalismos

| Ítem | Punt. | Crit. | Por qué | Remedio |
|---|---|---|---|---|
| cul-006 | 2 | C6/C7 | 27 palabras; «leyenda negra difundida por sus rivales». | `leyenda-negra` cableado; OK. |
| cul-013 | 2 | C6 | «comunidad de naciones hispanohablantes… más que la UE» (Iberosfera). | `hispanidad` cableado; OK. |
| cul-016 | 2 | C7 | **32 palabras** (el más largo), pero léxico llano; multi-cláusula. | Legible pese a longitud; sin acción. |
| geo-006 | 2 | C5/C1 | «Tratado sobre la Prohibición de las Armas Nucleares» — tratado concreto sin contexto. | [+disuasion-nuclear] (la entrada ya lo menciona). |
| geo-011 | 2 | C3 | «Los vínculos históricos no bastan… si la mayoría… rechaza integrarse» — negación + condicional. | Texto necesario; nota. |
| geo-015 | 2 | C1 | «aprobarse por mayoría cualificada aunque España votara en contra» — jerga UE. | Nota o [N] mayoría-cualificada (secundario). |
| nac-001 | 2 | C3/C7 | 25 palabras; condicional largo sobre «vía unilateral hacia la independencia». | [+autodeterminacion] |
| nac-005 | 2 | C1/C7 | 24 palabras; principio de ordinalidad. | `ordinalidad` cableado; OK. |
| cat-007 | 2 | C3 | Condicional doble: «victoria del no debería cerrar la vía… durante una generación». | Texto necesario; nota. |
| eus-005 | 2 | C3/C6 | Comparativa «actualizar los derechos históricos forales es mejor camino que… república independiente». | `foralismo` cableado; OK. |
| lib-008 (centro) | 2 | C5 | «licencias de taxi y VTC» — **VTC** sin desarrollar. | [R]/nota: desarrollar «VTC (vehículos con conductor)». |

### Escuela y lenguas (transversal)

| Ítem | Punt. | Crit. | Por qué | Remedio |
|---|---|---|---|---|
| cat-001 | 2 | C1 | «no debe estar obligada a impartir un porcentaje mínimo en castellano» = debate inmersión/lengua vehicular. | [N inmersion-linguistica] |
| ter-004 | 2 | C1 | «el castellano sea lengua vehicular en las aulas» — «lengua vehicular» es término técnico. | [N inmersion-linguistica] |
| lib-019 | 2 | C1 | «el castellano sea lengua vehicular… junto a las lenguas cooficiales». | [N inmersion-linguistica] |
| gal-005 | 2 | C1 | «topes legales que limitan las horas de enseñanza en gallego» = mismo debate. | [N inmersion-linguistica] |
| eus-003 | 2 | C1 | «el conocimiento del euskera debe ser requisito, y no solo mérito» — distinción requisito/mérito técnica. | [N inmersion-linguistica] (parcial); nota. |

*Ítems 1/3 (borderline, no accionados): la mayoría del núcleo (eco-*, soc-*, ecl-*, pop-*), territoriales legibles (and-*, can-*, cat-*, eus-* de memoria), y los solo-matching con texto llano (dr-024/025, lab-028/029, geo-010..014). No requieren apoyo.*

---

## §3 · Entradas de glosario nuevas (JSON válido, listas para pegar)

> Todas con URL de es.wikipedia **verificada por WebSearch** salvo las dos de la cola humana (§6), que van con URL provisional marcada. Definiciones neutrales de 50-90 palabras con las dos lecturas cuando el concepto es disputado. **No duplican** ninguno de los 64 ids existentes.

### Prioridad ALTA (doctrina de nicho que hoy deja al votante sin asidero)

```json
[
  {
    "id": "mandato-imperativo",
    "termino": "Mandato imperativo",
    "definicion": "Vínculo por el que un cargo electo queda obligado a votar y actuar según las instrucciones expresas de quienes lo eligieron, que pueden retirarle la representación si se aparta de ellas. Se opone al mandato representativo, en el que el electo decide en conciencia y no puede ser destituido a mitad de mandato. La Constitución española (art. 67.2) prohíbe el mandato imperativo de diputados y senadores. Las tradiciones asamblearias y consejistas lo reivindican como control popular; sus críticos lo ven como fuente de rigidez y disciplina externa sobre el representante.",
    "url": "https://es.wikipedia.org/wiki/Mandato_representativo"
  },
  {
    "id": "entrismo",
    "termino": "Entrismo",
    "definicion": "Táctica por la que los militantes de una organización revolucionaria pequeña se afilian a un partido grande de masas —socialdemócrata, laborista o comunista— para ganar a sus bases desde dentro, en lugar de fundar de inmediato un partido propio. La postuló Trotski en los años treinta y la practicaron corrientes trotskistas en el laborismo británico o el peronismo argentino. Sus defensores la ven como vía para llegar a trabajadores que no seguirían a un grupo minoritario; sus críticos la consideran maniobra oportunista o condenada a diluir al que entra.",
    "url": "https://es.wikipedia.org/wiki/Entrismo"
  },
  {
    "id": "eurocomunismo",
    "termino": "Eurocomunismo",
    "definicion": "Corriente que desde los años setenta llevó a los grandes partidos comunistas de Europa occidental (el italiano, el francés y el PCE de Santiago Carrillo) a distanciarse de Moscú, aceptar la democracia parlamentaria, el pluralismo y las libertades y renunciar a la dictadura del proletariado. Sus partidarios lo presentaron como la vía democrática al socialismo adaptada a Occidente; sus críticos comunistas lo denunciaron como abandono del leninismo y deriva socialdemócrata. En España marca la divisoria entre el PCE y las escisiones prosoviéticas o marxistas-leninistas que le reprocharon esa renuncia.",
    "url": "https://es.wikipedia.org/wiki/Eurocomunismo"
  },
  {
    "id": "consejismo",
    "termino": "Comunismo consejista (consejismo)",
    "definicion": "Corriente marxista revolucionaria surgida en Alemania y Países Bajos en los años veinte que sostiene que la clase trabajadora debe organizarse y gobernar mediante consejos obreros de base —elegidos en fábricas y barrios, con delegados revocables— y no a través de un partido de vanguardia ni del Parlamento. Se sitúa entre el marxismo y el anarquismo: comparte con el leninismo el objetivo comunista, pero rechaza su centralismo. Sus críticos leninistas lo consideran espontaneísta e incapaz de dirigir una revolución; para sus partidarios evita precisamente la burocratización del poder.",
    "url": "https://es.wikipedia.org/wiki/Comunismo_consejista"
  },
  {
    "id": "revolucion-cultural",
    "termino": "Revolución Cultural china",
    "definicion": "Campaña política lanzada por Mao Zedong en China entre 1966 y 1976 para, según su objetivo declarado, impedir una restauración capitalista purgando del partido y de la sociedad a los dirigentes y las costumbres considerados burgueses, movilizando a los jóvenes «guardias rojos». Provocó persecuciones masivas, caos y muertes. En el comunismo actual sigue siendo un marcador de corriente: el maoísmo la reivindica como intento de mantener viva la revolución; el resto de familias (prosoviéticos, trotskistas, eurocomunistas) la valoran críticamente. Valorarla positiva o negativamente distingue corrientes entre sí.",
    "url": "https://es.wikipedia.org/wiki/Revoluci%C3%B3n_Cultural"
  },
  {
    "id": "xx-congreso-pcus",
    "termino": "XX Congreso del PCUS (1956) y revisionismo",
    "definicion": "Congreso del Partido Comunista soviético de 1956 en el que Nikita Jruschov denunció en un discurso secreto los crímenes de Stalin y su «culto a la personalidad», iniciando la desestalinización. Para las corrientes prosoviéticas ortodoxas fue una corrección necesaria; para maoístas y hoxhaístas marcó el «revisionismo», el momento en que la URSS habría abandonado el socialismo e iniciado una restauración capitalista; el trotskismo, en cambio, sitúa la degeneración mucho antes, ya bajo Stalin. Fechar —o negar— ese punto de ruptura distingue a las familias comunistas entre sí.",
    "url": "https://es.wikipedia.org/wiki/XX_Congreso_del_Partido_Comunista_de_la_Uni%C3%B3n_Sovi%C3%A9tica"
  }
]
```

### Prioridad MEDIA (jerga técnica recurrente; texto ya la parafrasea pero el concepto ayuda)

```json
[
  {
    "id": "inmersion-linguistica",
    "termino": "Inmersión lingüística y lengua vehicular",
    "definicion": "La lengua vehicular es aquella en la que se imparten las asignaturas en la escuela (matemáticas, ciencias…), distinta de la lengua que se estudia como materia. En un modelo de inmersión, la lengua cooficial (catalán, gallego, euskera) es la vehicular principal y el castellano se aprende sobre todo como asignatura. El debate enfrenta a quienes defienden la inmersión como herramienta de normalización de la lengua propia y de cohesión social, y a quienes reclaman que el castellano tenga también garantizado un porcentaje mínimo de horas lectivas como lengua vehicular.",
    "url": "https://es.wikipedia.org/wiki/Inmersi%C3%B3n_ling%C3%BC%C3%ADstica"
  },
  {
    "id": "cogestion",
    "termino": "Cogestión",
    "definicion": "Modelo por el que los trabajadores participan en la dirección de la empresa ocupando parte de sus órganos de gobierno, junto a los propietarios y sin llegar a sustituirlos. Su referencia clásica es Alemania, donde la ley reserva a las plantillas de las grandes empresas parte de los puestos del consejo de vigilancia. Se distingue de la autogestión (empresa dirigida solo por sus trabajadores) y de la negociación colectiva. Sus defensores la ven como democracia económica; sus críticos, como injerencia en la gestión o corresponsabilidad que desactiva el conflicto.",
    "url": "https://es.wikipedia.org/wiki/Cogesti%C3%B3n"
  },
  {
    "id": "autogestion",
    "termino": "Autogestión",
    "definicion": "Gestión de una empresa, un servicio o una comunidad por las propias personas implicadas —trabajadores, vecinos—, que toman democráticamente las decisiones, sin propietarios externos ni dirección estatal. En economía, su forma típica es la cooperativa de trabajo. Es un principio central de las tradiciones anarquista y del socialismo autogestionario, que la oponen tanto a la empresa capitalista como a la nacionalización dirigida por el Estado. Sus críticos, incluidos otros sectores de la izquierda, discuten su viabilidad en sectores que exigen gran escala o coordinación central.",
    "url": "https://es.wikipedia.org/wiki/Autogesti%C3%B3n"
  },
  {
    "id": "frente-popular",
    "termino": "Frente popular / frente amplio",
    "definicion": "Coalición electoral amplia entre partidos de izquierda y, a veces, de centro para sumar fuerzas frente a un adversario común. La expresión nació en los años treinta para las alianzas antifascistas impulsadas por la Internacional Comunista (en España, el Frente Popular de 1936). En la izquierda actual divide estrategias: unas corrientes defienden concurrir en coaliciones amplias (el PCE dentro de Izquierda Unida) para tener influencia; otras las rechazan como «colaboración de clases» que diluye el programa y prefieren candidaturas propias de clase.",
    "url": "https://es.wikipedia.org/wiki/Frentes_populares"
  },
  {
    "id": "proceso-constituyente",
    "termino": "Proceso constituyente",
    "definicion": "Procedimiento por el que un país elabora una Constitución nueva, en lugar de reformar la vigente, normalmente a través de una asamblea constituyente elegida para ese fin y de su ratificación popular. Implica reabrir las reglas básicas del Estado. En España lo reclaman sobre todo sectores de la izquierda y del soberanismo que consideran agotado el marco de 1978; sus críticos advierten del riesgo de inestabilidad y prefieren reformar la Constitución actual por sus propios cauces. Un proceso constituyente puede ser plural y democrático o excluyente, según cómo se diseñe.",
    "url": "https://es.wikipedia.org/wiki/Proceso_constituyente"
  },
  {
    "id": "sorteo-democratico",
    "termino": "Sorteo (selección de cargos por azar)",
    "definicion": "Método de designación de cargos o representantes por sorteo entre la ciudadanía, en lugar de por elección. Se usó en la democracia ateniense y hoy se propone sobre todo para asambleas ciudadanas deliberativas que asesoran o deciden sobre asuntos concretos, buscando una muestra representativa de la población ajena a los partidos. Sus partidarios lo ven como forma de acercar la política a la gente corriente y reducir el peso de los aparatos; sus críticos dudan de la competencia y de la rendición de cuentas de personas no elegidas ni reelegibles.",
    "url": "https://es.wikipedia.org/wiki/Sorteo_democr%C3%A1tico_(Lotocracia)"
  }
]
```

---

## §4 · Cableados de términos existentes propuestos (`item.terminos += [id]`)

Huecos donde un término **ya existente** en el glosario resolvería el ítem. Priorizados por evidencia (el texto nombra literalmente el concepto o lo mide de forma inequívoca).

| Ítem | Añadir a `terminos` | Justificación |
|---|---|---|
| izq-037 | `revocatoria-mandato` | Seguimiento de dem-002 (que sí lo cablea); el propio texto mide revocabilidad permanente. |
| der-008 | `ley-eutanasia` | «La ley que regula la eutanasia debe ser derogada»; lib-017 y fem-005 ya lo cablean, der-008 no. |
| fem-009 | `acuerdos-santa-sede-1979` | El texto **nombra** «los Acuerdos de 1979 con la Santa Sede» y no está cableado (fem-008 y sd-014 sí). Hueco claro. |
| lai-001 | `acuerdos-santa-sede-1979` | «religión fuera del horario lectivo»; las notas remiten a los Acuerdos; paraleliza fem-008. |
| cat-002 | `concierto-economico` | «al estilo del concierto vasco» sin cablear (nac-008/can-006/eus-002 sí). |
| ter-003 | `concierto-economico` | «similar al concierto vasco» sin cablear. |
| sd-005 | `concierto-economico` | «financiación singular, como el concierto vasco». |
| sd-001 | `otan` | «iniciar la salida de la OTAN» sin cablear (def-002/izq-012/izq-029 sí). |
| dr-009 | `otan` | «España debería salir de la OTAN» sin cablear. |
| geo-006 | `disuasion-nuclear` | La entrada de `disuasion-nuclear` ya explica el Tratado de Prohibición y que España no lo firmó; geo-006 pregunta justo por eso. |
| geo-008 | `disuasion-nuclear` | «uso de armas nucleares… ni como respuesta» dialoga con la doctrina de disuasión. |
| nac-001 | `autodeterminacion` | «vía unilateral hacia la independencia» tras «referéndum pactado»; el término aporta el marco jurídico. |
| sd-013 | `jefatura-del-estado` | «elija entre monarquía y república» — el término explica qué órgano se discute. |
| dr-008 | `jefatura-del-estado` | «monarquía parlamentaria… forma de Estado». |
| der-007 | `ley-plazos` | «aborto solo permitido salvo riesgo vital» — contrapolo de la ley de plazos. |
| fem-012 | `ley-plazos` | Aborto de 16-17 años sin consentimiento paterno; encaja en el marco plazos/supuestos. |
| dr-004 | `hispanidad` | «afinidad cultural… hispanoamericanos» — trato preferente por Hispanidad. |
| cul-011 | `asimilacionismo` | «pruebas de lengua y cultura… más exigentes» = naturalización como asimilación acreditada. |
| rel-001 | `aconfesionalidad` | «promover el ateísmo y excluir a las religiones» — extremo del continuo que define `aconfesionalidad`. |
| rel-003 | `aconfesionalidad` | Ancla teocrática; el término da el contraste. |

*Descartados por diseño:* `democracia-organica` → dem-018 (las notas la de-etiquetaron adrede para evitar la palabra-bandera; **no** cablear).

---

## §5 · Redacciones a revisar (defecto de fábrica; el glosario no lo arregla)

> Reglas: cada propuesta **conserva la tesis medida, el eje y la polaridad**. Solo se propone; **jamás** se aplica sin revisar migración (AGENTS.md §Datos políticos). El problema aquí es anáfora o abstracción de la redacción, no vocabulario.

**Nota transversal [UI]:** los 12 seguimientos deberían mostrarse con el enunciado de la pregunta madre visible encima. Cuatro de ellos, además, empiezan con una anáfora («Mi rechazo…», «Mi objeción…», «Desaparecerían…») que es ininteligible en frío. Reformularlos como afirmaciones autónomas elimina la dependencia sin tocar lo que miden.

| Ítem | Texto actual | Por qué falla | Propuesta (misma tesis) | Por qué no cambia la tesis |
|---|---|---|---|---|
| lab-010 | «Mi rechazo a los impuestos se debe a que la propiedad privada no debería financiar servicios colectivos sin consentimiento individual.» | Anáfora + doble abstracción encadenada (propiedad→financiar→consentimiento): el caso de opacidad señalado en el encargo. | «Nadie debería estar obligado a pagar con su dinero servicios comunes que no ha consentido personalmente.» | Sigue midiendo la justificación propietarista/individualista del rechazo fiscal (eje economico +1, estatismo −1); solo sustituye la cadena abstracta por una formulación directa. |
| lab-011 | «Mi objeción principal es que gravar salarios no cambia quién posee y dirige las grandes empresas.» | Anáfora; «gravar salarios no cambia quién posee» exige el marco socialista implícito. | «Subir los impuestos sobre el salario no cambia quién es dueño de las grandes empresas ni quién las dirige.» | Mantiene la crítica socialista (la fiscalidad como sustituto insuficiente de transformar la propiedad); ejes economico −1 / poder-laboral +0.75 intactos. |
| lab-027 | «Mi rechazo se debe a que los recursos públicos deberían reservarse prioritariamente a quienes forman parte de la comunidad nacional.» | Anáfora; sin la madre no se sabe qué «rechazo». | «Los recursos públicos deberían reservarse sobre todo para quienes forman parte de la comunidad nacional.» | Sigue midiendo el chovinismo de bienestar (ya cablea `chovinismo-bienestar`); ejes social/internacionalismo intactos. Deja de depender de lab-009. |
| lab-030 | «Desaparecerían porque la autoorganización directa y horizontal haría innecesaria cualquier estructura sindical permanente.» | «Desaparecerían» sin sujeto: el sujeto (los sindicatos) está en lab-029. | «Los sindicatos desaparecerían porque la autoorganización directa y horizontal haría innecesaria cualquier estructura permanente.» | Solo repone el sujeto elidido; separa igual la razón libertaria de la comunista. Solo-matching intacto. |
| lib-008 | «…los límites de licencias de taxi y VTC y dejar competir a cualquiera…» | **VTC** es una sigla sin desarrollar (C5). | «…los límites de licencias de taxi y de VTC (los vehículos de alquiler con conductor, tipo Uber o Cabify) y dejar competir…» | Solo desarrolla la sigla con un ejemplo reconocible; no toca la tesis liberalizadora (eje economico +0.75). |

**Candidatos menores** (no urgentes): `izq-051` («…la contradicción entre capital y trabajo» → «…el conflicto entre empresarios y trabajadores» simplifica la jerga sin alterar la tesis del reduccionismo de clase); `lab-011`/`lab-012`/`lab-013` comparten la anáfora de seguimiento y se benefician de [UI] aunque su texto sea aceptable.

### §5.1 · PETICIÓN EXPRESA DEL PROPIETARIO — ambigüedad en la OPOSICIÓN a las cooperativas

**El problema (planteado por el propietario).** En los ítems de cooperativas, el **acuerdo** es unívoco (autogestión), pero el **desacuerdo** es equifinal: quien responde «muy en desacuerdo» puede estarlo (a) porque **rechaza la forma cooperativa** como modelo de organización, o (b) porque **rechaza la transferencia/expropiación** de las empresas privadas (no la cooperativa en sí). A esos dos hay que sumar (c) el socialista **estatista** que rechaza porque prefiere la nacionalización estatal. Un solo botón de «desacuerdo» los mezcla.

**Ítems afectados (barrido del campo):**

| Ítem | Texto | ¿Afectado? | Cómo daña el mapa el desacuerdo mezclado |
|---|---|---|---|
| **lab-017** | «Las grandes empresas privadas deberían transferirse a cooperativas gestionadas por sus trabajadores, no a ministerios estatales.» (economico −1, propiedad-mercado −1, poder-laboral +1, estatismo −1) | **Sí, el más grave** | El verbo «transferirse» activa el motivo (b): un capitalista rechaza la **expropiación** y su desacuerdo lo empuja, correctamente, al polo de mercado, pero **mal** al polo pro-Estado (carga estatismo −1). A la vez, un socialista estatista (c) rechaza porque prefiere ministerios, y su desacuerdo lo empuja **mal** al polo de mercado (economico/propiedad-mercado). Dos perfiles opuestos mal ubicados. |
| **izq-032** | «La superación del capitalismo debe basarse en cooperativas gestionadas por sus propios trabajadores, más que en empresas nacionalizadas dirigidas por el Estado.» (organizacion −1, propiedad-mercado −1) | **Sí, más leve** | La cláusula «más que en empresas nacionalizadas» ya ofrece la alternativa estatista, de modo que el socialista estatista tiende a responder cerca del centro, no en desacuerdo fuerte. Queda el capitalista (b), a quien la carga propiedad-mercado −1 ubica bien; el residuo es menor y las propias notas del ítem ya lo advierten. |
| **and-003** | «Las grandes fincas improductivas de Andalucía deberían expropiarse para asentar en ellas cooperativas de jornaleros.» (economico −1, propiedad-mercado −1) | Adyacente / menor | El objeto saliente es la **expropiación** de latifundios, que es legible y monotónica (rechazarla = pro-propiedad, carga correcta). El submotivo cooperativo es secundario; ambigüedad baja. |
| **izq-048** | «Construir ya… la sociedad deseada —cooperativas, comunidades, instituciones propias— transforma más que esperar…» | **No afectado** | «Cooperativas» es solo un ejemplo del constructo *prefigurativo*; el desacuerdo mide «esperar a las condiciones históricas», no el rechazo a la cooperativa. |

**Remedio recomendado (sin cambiar la tesis medida).** Añadir el desacuerdo no toca el lado del acuerdo del ítem madre: la tesis medida (autogestión) queda intacta; solo se **añade resolución** a la oposición, exactamente como `lab-009 → lab-010/lab-011/lab-012/lab-013` hace con el rechazo a los impuestos. Se propone un **par de seguimientos condicionales** en la rama de desacuerdo de **lab-017** (`condicion: { itemId: "lab-017", valores: [-2, -1] }`), estilo «Mi rechazo se debe a…»:

```
lab-017a (motivo propietarista → aísla (b)):
  «Mi rechazo se debe a que las grandes empresas no deberían quitarse a sus dueños,
   sea cual sea quien las gestione después.»
  ejes sugeridos (a calibrar): propiedad-mercado +, economico +  · polaridad negativa

lab-017b (motivo estatista → aísla (c)):
  «Mi rechazo se debe a que las grandes empresas debería dirigirlas el Estado,
   no cooperativas de trabajadores.»
  ejes sugeridos (a calibrar): estatismo +, organizacion +  · polaridad positiva
```

Con ese par, el motor deja de empujar al socialista estatista hacia el polo de mercado y al capitalista hacia el polo pro-Estado: cada motivo se puntúa por su eje real. **izq-032** puede (i) compartir la lógica con un seguimiento análogo en su rama de desacuerdo, o (ii) resolverse con la opción ligera de abajo, dado que su ambigüedad es menor.

**Alternativa ligera (si no se quieren ítems nuevos):** aclaración de interfaz/glosario en ambos ítems que fije la lectura, apoyada en el término nuevo **`autogestion`** (§3), cuya definición ya contrapone la cooperativa **tanto** a la empresa capitalista **como** a la nacionalización estatal. Cablear `autogestion` a **lab-017** e **izq-032** ayuda a la *comprensión* del enunciado, pero **no** desambigua por sí solo la *medición* de la oposición: para eso hace falta el seguimiento. Recomendación: seguimiento en lab-017 (grave) + cableado de `autogestion` + nota en izq-032 (leve).

**Aviso de proceso:** un seguimiento nuevo es una adición al instrumento; el integrador debe pilotarlo y versionarlo (solo la subpregunta, no el ítem madre). Aquí solo se propone; no se aplica.

---

## §6 · URLs y decisiones para cola humana

**Verificaciones ya hechas por WebSearch (2026-07-12), OK para pegar:** `mandato-imperativo` (→ *Mandato representativo*, que define el imperativo por contraste; posible redirect `Mandato_imperativo`), `entrismo` (artículo *Entrismo*; definición confirmada verbatim, conviene un último clic de confirmación del slug exacto), `eurocomunismo`, `consejismo` (*Comunismo consejista*), `revolucion-cultural` (*Revolución Cultural*), `xx-congreso-pcus`, `inmersion-linguistica`, `cogestion`, `autogestion`, `frente-popular` (*Frentes populares*), `proceso-constituyente`, `sorteo-democratico` (*Sorteo democrático (Lotocracia)*; alternativa más limpia: *Demarquía*).

**Sin artículo es.wikipedia exacto — decisión editorial requerida:**

1. **`campismo`** (para izq-029). No existe artículo en es.wikipedia; solo en inglés (`en.wikipedia.org/wiki/Campism`) y ensayos en portugués. Opciones: (a) crear el término apuntando a `https://es.wikipedia.org/wiki/Antiimperialismo` (cobertura parcial, no idéntica); (b) apuntar excepcionalmente al artículo inglés; (c) no crear término y resolver izq-029 solo con el `otan` ya cableado + una nota breve. **Recomendación:** (a) con matiz, o (c). Definición redactada lista por si se aprueba:
   > «Postura en política internacional que divide el mundo en “campos” o bloques enfrentados y sostiene que la izquierda debe apoyar al bloque opuesto a Estados Unidos y la OTAN por considerarlo antiimperialista, sea cual sea el carácter de sus gobiernos. Se opone a la tesis del “conflicto interimperialista”, según la cual ninguno de los bandos merece apoyo porque todos defienden intereses de potencia. La división atraviesa a las corrientes comunistas.»

2. **`reconstitucion`** (para izq-050). No existe artículo conceptual en es.wikipedia (solo partidos: *PCE (reconstituido)*, *Reconstrucción Comunista*). Opciones: (a) apuntar a `https://es.wikipedia.org/wiki/Marxismo-leninismo-mao%C3%ADsmo` (que trata la estrategia de reconstitución de forma parcial); (b) no crear término (izq-050 es solo-matching y su texto —«reconstituirse desde cero, ideológica y orgánicamente»— es relativamente autoexplicativo). **Recomendación:** (b) o (a) con matiz. Definición redactada lista por si se aprueba:
   > «Tesis de algunas corrientes marxistas-leninistas y maoístas según la cual el movimiento comunista fue derrotado y liquidado en el siglo XX, de modo que no basta con refundar un partido a partir de los existentes: hay que “reconstituirlo” desde cero, primero en lo ideológico y luego en lo organizativo, antes de aspirar a dirigir las luchas de masas. Se opone a las corrientes que reivindican la continuidad histórica del partido.»

**Términos secundarios no redactados** (candidatos si el piloto muestra fricción; con artículo es.wikipedia presumible): `mayoria-cualificada` (dem-026, geo-015, dem-006), `etapismo` (izq-023), `concertacion-social` / *diálogo social* (lab-007, der-012), `anarcoprimitivismo` (va-019), y un posible `modelo-territorial` (federal/confederal/unitario) para dem-032..035. Verificar título exacto antes de redactar.

---

### Fuentes de verificación de URLs
- [Mandato representativo](https://es.wikipedia.org/wiki/Mandato_representativo) · [Entrismo (def. confirmada)](https://es.wikipedia.org/wiki/Cuarta_Internacional) · [Eurocomunismo](https://es.wikipedia.org/wiki/Eurocomunista) · [Comunismo consejista](https://es.wikipedia.org/wiki/Comunismo_consejista) · [Revolución Cultural](https://es.wikipedia.org/wiki/Revoluci%C3%B3n_Cultural) · [XX Congreso del PCUS](https://es.wikipedia.org/wiki/XX_Congreso_del_Partido_Comunista_de_la_Uni%C3%B3n_Sovi%C3%A9tica) · [Inmersión lingüística](https://es.wikipedia.org/wiki/Inmersi%C3%B3n_ling%C3%BC%C3%ADstica) · [Cogestión](https://es.wikipedia.org/wiki/Cogesti%C3%B3n) · [Autogestión](https://es.wikipedia.org/wiki/Autogesti%C3%B3n) · [Frentes populares](https://es.wikipedia.org/wiki/Frentes_populares) · [Proceso constituyente](https://es.wikipedia.org/wiki/Proceso_constituyente) · [Sorteo democrático](https://es.wikipedia.org/wiki/Sorteo_democr%C3%A1tico_(Lotocracia)) · [Demarquía](https://es.wikipedia.org/wiki/Demarqu%C3%ADa) · [Campism (en)](https://en.wikipedia.org/wiki/Campism) · [Marxismo-leninismo-maoísmo](https://es.wikipedia.org/wiki/Marxismo-leninismo-mao%C3%ADsmo)
