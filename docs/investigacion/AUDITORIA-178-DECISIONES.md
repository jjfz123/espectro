# Auditoría metodológica de las 178 decisiones del atlas

| Campo | Valor |
|---|---|
| Documento auditado | `docs/investigacion/TAXONOMIA-MAPA-IDEOLOGIAS.md` · versión 1.2.0 |
| Implementación contrastada | `data/mapa-ideologias.json` · versión 1.2.0 |
| Fecha de auditoría | 11 de julio de 2026 |
| Alcance | Criba ontológica, adaptación a España, trazabilidad nominal y riesgo de rellenado artificial |
| Fuera de alcance | Validar las posiciones doctrinales de 178 rótulos, recalcular coordenadas o autorizar publicación/matching |

## 1. Dictamen

La taxonomía contiene una **criba nominal completa** de las 178 etiquetas de la imagen, pero el JSON todavía no representa fielmente esa criba y **no constituye una cartografía doctrinal validada**.

Los aciertos metodológicos principales son claros:

- separa ramas reales del marxismo y del anarquismo en vez de reducirlas a dos etiquetas generales;
- trata `Antifa`, `Anti Communism`, `Pink Capitalism`, formas de monarquía, teocracias, populismo, tecnocracia y otros falsos amigos como movimientos, rasgos, formas institucionales o contextos, no como ideologías económicas integrales;
- periodiza fascismo, franquismo, carlismo y varias tradiciones comunistas;
- declara que una ficha sin evidencia suficiente no debe recibir una coordenada calculada;
- admite dejar huecos y prohíbe deducir paquetes completos a partir de una sola respuesta.

Sin embargo, hay cuatro defectos que impiden considerar cerrada la criba:

1. **Quince rótulos originales se usan como identidad técnica de quince sustitutos distintos.** Entre otros, `Mugabeism` identifica en JSON a Fernando de los Ríos, `Mandelaism` a Anarquismo sin adjetivos y cinco teocracias no cristianas o genéricas identifican corrientes católicas o autoritarias europeas. Una vista contextual en interfaz puede mitigar la presentación, pero no corrige la relación semántica del dato.
2. **La decisión original A–F se pierde.** El inventario contiene 28 A, 50 B, 35 C, 5 D, 38 E y 22 F; el JSON reduce todo a 28 A, 147 B y 23 exclusiones. `capa` conserva parte de la intención, pero no permite reconstruirla de forma unívoca.
3. **La geometría sigue gobernada por densidad, no por evidencia.** Hay umbrales de 90 corrientes, 15 regiones por cuadrante, área máxima de 4,5 % y radio vacío máximo de 60. Aunque MAP-09 diga que no se deben rellenar esquinas, esos cuatro objetivos premian precisamente el rellenado.
4. **No existe evidencia por ficha en el contrato del atlas.** Cero corrientes contienen un campo de fuentes y el esquema no lo admite. Hay 84 fichas en `investigacion`, 81 con coordenada procedente de la imagen y 22 que ya tienen `capa: region`. Esas 22 no deben participar en Voronoi, matching ni lenguaje de posición hasta documentarse.

La conclusión operativa es: **conservar la amplitud doctrinal, retirar la obligación de cubrir geométricamente el plano y separar cada sustituto español de la etiqueta que reemplaza**. No procede fijar un máximo previo de diez, quince o treinta descartes. El número correcto depende de la evidencia; una casilla vacía es preferible a una equivalencia falsa.

## 2. Hallazgos P0

| ID | Hallazgo | Evidencia en el repositorio | Riesgo | Corrección exigida antes de publicar el atlas como “exhaustivo” |
|---|---|---|---|---|
| P0-01 | Sustitución semántica de quince etiquetas | `trazabilidadOriginal` aparece en 15 corrientes; `etiquetaOriginal` sigue siendo el rótulo sustituido | Una búsqueda, exportación o consumidor de datos puede afirmar que una doctrina es otra | Crear dos registros: el original como contexto/exclusión y la adaptación como corriente independiente, con `etiquetaOriginal` propia o nula. Nunca usar un rótulo extranjero como alias identitario del sustituto |
| P0-02 | Pérdida de A–F | Matriz original: A 28/B 50/C 35/D 5/E 38/F 22. JSON: A 28/B 147; exclusiones 23 | La aplicación no puede distinguir doctrina exhaustiva, faceta, movimiento, contexto histórico y exclusión a partir de la decisión | Añadir `decisionOriginal: A|B|C|D|E|F` inmutable y un campo separado `tratamientoActual: region|faceta|movimiento|contexto|modelo|exclusion` |
| P0-03 | Incentivo estructural a rellenar cuadrantes | `minimoCorrientes: 90`, `minimoPorCuadrante: 15`, `maximaAreaRegionPorcentaje: 4.5`, `maximoRadioVacio: 60` | Sustituciones elegidas por la casilla disponible y no por validez doctrinal | Convertir densidad, área y vacíos en diagnósticos visuales, nunca gates de publicación. La única puerta debe ser evidencia + utilidad incremental |
| P0-04 | Regiones sin expediente de fuentes | 84 fichas en investigación; 22 son regiones; el esquema no admite fuentes | Una posición heredada del meme se percibe como clasificación editorial respaldada | Exigir por corriente fuentes primarias y académicas, idioma, pasaje, fecha, país/periodo, contraevidencia y decisión de publicación. Mientras tanto, `capa != region` |
| P0-05 | El prior visual funciona como dato doctrinal | 140/175 corrientes tienen `origenCoordenadas: referencia-visual`; 81/84 fichas en investigación heredan ese origen | La imagen acaba fijando hechos que el propio documento dice que no puede probar | Mantener el prior solo como coordenada de referencia no publicable. Toda coordenada visible debe indicar si es `prior`, `editorial documentada` o `calculada`, sin mezclarlas |
| P0-06 | Regímenes y movimientos E participan como regiones | Titoísmo, guevarismo, menchevismo, situacionismo y neozapatismo son E en la tabla y `region` en JSON | Una tradición histórica extranjera se ofrece como identidad contemporánea española y ocupa Voronoi | Pasarlos a `contexto` o `movimiento`; una inspiración doctrinal española distinta necesitaría ficha propia |
| P0-07 | Conteos incompatibles bajo la misma versión | El dictamen de la taxonomía declara 46 referencias y 45 fichas instrumentadas; JSON contiene 60 corrientes instrumentadas y 60 `referenciaId` únicos | La versión 1.2.0 no identifica un estado reproducible | Actualizar versión y generar automáticamente conteos desde datos; no mantener cifras editoriales a mano |

## 3. Las quince sustituciones que deben desacoplarse

Ninguna de las quince adaptaciones siguientes tiene que desaparecer. El problema es presentarla técnicamente como si fuera la normalización del rótulo original. Varias adaptaciones son valiosas para España y algunas ya tienen referencia instrumentada; deben vivir como altas independientes.

| Nº | Rótulo original y decisión | Corriente que lo suplanta en JSON | Dictamen | Acción P0 |
|---:|---|---|---|---|
| 122 | `Distributist Libertarianism` · B | Liberalismo igualitario rawlsiano | Rawls no es una variante del distributismo | Separar; conservar el rótulo original solo si aparece un corpus delimitado |
| 68 | `Hamiltonianism` · E | Conservadurismo canovista de la Restauración | La comparación institucional no establece identidad doctrinal | Dos fichas históricas, EE. UU. y España, sin alias compartido |
| 74 | `Ho Chi Minh Thought` · E | Deleonismo | Tradiciones, países, organización y modelo de poder distintos | Ho como contexto vietnamita; De Leon como rama socialista propia |
| 77 | `Kuomintangism` · E | Regeneracionismo costista | La analogía desarrollista no convierte Costa en Tridemismo | Separar y documentar el costismo con fuentes españolas |
| 22 | `Fordism` · E | Desarrollismo tecnocrático franquista, 1957–1973 | Fordismo es régimen productivo; el segundo es una fase político-económica española | Fordismo como contexto económico y desarrollismo franquista como ficha histórica independiente |
| 39 | `Sikh Theocracy` · C | Corporativismo social católico | Religión, institucionalidad y tradición no coinciden | Teocracia sij solo como modelo contextual; corporativismo católico con su corpus propio |
| 40 | `Mugabeism` · E | Socialismo humanista de Fernando de los Ríos | Sustitución sin relación doctrinal | Separación absoluta; no conservar `Mugabeism` como alias de búsqueda del socialismo democrático español |
| 41 | `Buddhist Theocracy` · C | Salazarismo | La religión sustituida ni siquiera corresponde al régimen portugués | Teocracia budista como modelo comparado; Estado Novo con país y periodo propios |
| 43 | `Hindu Theocracy` · C | Integrismo católico de Nocedal | Traslado interreligioso injustificable | Separar y no colocar uno en el hueco del otro |
| 44 | `Christian Theocracy` · C | Catolicismo político de la CEDA | Cercanía religiosa no equivale a teocracia; la naturaleza y el posibilismo de la CEDA son objeto de debate historiográfico | Mantener teocracia como polo institucional y CEDA como caso histórico documentado, nunca como sinónimo |
| 45 | `Islamic Theocracy` · C | Maurrasismo con recepción española | Tradiciones religiosas y nacionales distintas | Separar; Maurrasismo requiere fuentes francesas y de recepción española |
| 58 | `Feudalism` · E | Neocatolicismo español isabelino | Neocatolicismo no implica relaciones feudales | Dos contextos históricos independientes |
| 64 | `Longism` · E | Republicanismo radical-socialista español | La analogía redistributiva/personalista no prueba equivalencia | Conservar Long como EE. UU.; crear ficha española sin herencia |
| 7 | `Kraterocracy` · F | Regeneracionismo autoritario primorriverista | “Gobierno del fuerte” es un concepto marginal, no otro nombre para primorriverismo | Kraterocracia fuera de identidad; primorriverismo como corriente histórica española propia |
| 141 | `Mandelaism` · F | Anarquismo sin adjetivos | No existe relación. Además, “Mandelaism” se usa para la mitologización/legado de Mandela y puede confundirse con el mandelismo de Ernest Mandel | Excluir el rótulo ambiguo y mantener Anarquismo sin adjetivos como alta independiente |

`Neo Libertarianism` (nº 146) no forma parte de esas quince sustituciones, pero también contradice la tabla: pasa de F a un contexto B estadounidense. La reentrada solo es defendible si el nombre visible incluye país, periodo y sentido elegido, y si se documenta por qué no se está usando el sentido filosófico alternativo del término.

## 4. Auditoría nominal de la decisión A–F

Las tablas siguientes cubren nominalmente las 178 etiquetas. “Defendible” significa que el **tipo de tratamiento** es razonable a nivel de criba; no significa que definición, coordenada o preguntas hayan sido validadas. “Condicionada” exige una fuente concreta antes de mantener prioridad, granularidad o región.

### 4.1 Decisión A · 28 etiquetas

| Nº y rótulo | Dictamen | Razón / fuente que falta |
|---|---|---|
| 29 `Falangism`; 87 `Liberalism`; 89 `Liberal Conservatism`; 90 `Conservatism`; 108 `Greenism`; 109 `Social Democracy`; 110 `Social Liberalism`; 111 `Neo Liberalism`; 119 `Democratic Socialism`; 123 `Classical Liberalism` | Defendible como familias principales | Son familias o tradiciones centrales para leer la política española/europea. Cada subtipo necesita corpus y no debe heredarse a partidos concretos |
| 149 `Anarcho communism`; 153 `Mutualism`; 162 `Anarcho Syndicalism`; 165 `Anarcho Collectivism` | Defendible y de alta relevancia histórica española | La historiografía del anarquismo español permite mantenerlas separadas. Mutualismo, colectivismo y comunismo necesitan contraindicadores sobre propiedad, retribución y mercado |
| 9 `Stalinism`; 47 `Marxist Leninism`; 71 `Trotskyism`; 116 `Luxemburgism` | Doctrinas reales; prioridad A condicionada | Documentar implantación o utilidad discriminante en España y separar sensibilidad histórica de relevancia. “Estalinismo” no debe ser insignia identitaria principal |
| 91 `Communalism`; 107 `Democratic Confederalism` | Reales, pero A no está justificada por España | Bookchin y Öcalan son corrientes distintas y principalmente internacionales. Necesitan evidencia de recepción española o bajar a B/contexto |
| 95 `Distributism` | Real; A condicionada | Aportar recepción española contemporánea e histórica. No confundir doctrina social católica, distributismo y corporativismo |
| 132 `Market Socialism`; 139 `Libertarian Socialism` | Reales; A útil solo si se desglosan | Son familias amplias. Mantener tarjetas de familia y hacer matching con variantes documentadas, no con el paraguas |
| 147 `Minarchism`; 159 `Anarcho capitalism` | Reales y útiles para perfiles sin partido; A condicionada por cobertura | El usuario pidió cubrir ancap/minarquismo, pero su prioridad no autoriza inferir posiciones sociales, religiosas o geopolíticas desde impuestos/Estado |
| 151 `Platformism`; 152 `Anarcho Pacifism` | Reales; A condicionada | Plataformismo clásico y anarcopacifismo tolstoyano tienen corpus, pero su relevancia española y su cobertura incremental deben quedar documentadas |
| 168 `Individualist Anarchism` | Real; variante actual dudosa | La ficha dice “tuckeriano”, mientras la justificación española alude a una tradición ibérica más amplia. Elegir y documentar una variante; si es Tucker, bajar la pretensión española |

### 4.2 Decisión B · 50 etiquetas

| Nº y rótulo | Dictamen | Razón / fuente que falta |
|---|---|---|
| 2 `Nazbol`; 8 `Posadism`; 10 `Marxist Leninism Maoism`; 11 `Forth Theory`; 15 `Fascism`; 18 `Neo Nazism`; 24 `Hoxhaism`; 31 `Neo Fascism`; 36 `Maoism`; 37 `Strasserism`; 59 `Leninism`; 92 `Left Communism`; 100 `Dark Enlightenment`; 106 `Council Communism` | B defendible como profundidad seria/sensible | Exigen variante, periodo, fuente primaria y contraste académico. Las sensibles no deben producir identidad por tres preguntas ni usar una coordenada económica heredada |
| 67 `Paleo Conservatism`; 72 `Agrarianism`; 80 `Neo Conservatism`; 103 `Third Way`; 114 `Laissez Faire Capitalism`; 117 `Liberal Socialism`; 130 `Paleo Libertarianism`; 133 `Left Rothbardianism`; 143 `Georgism`; 144 `Objectivism`; 145 `Bleeding-Heart Libertarianism` | B defendible | Corrientes reales o tipos ideales útiles en exhaustivo. País, periodo y discriminante incremental son obligatorios; Georgismo no debe calcularse sin pregunta de renta del suelo |
| 148 `Accelerationism (Left)`; 160 `Accelerationism (Right)` | Existencia defendible, tratamiento B condicionado | “Aceleracionismo” contiene filosofía tecnológica, neorreacción y estrategias violentas incompatibles. Separar ficha filosófica, faceta de estrategia y arquetipo terrorista; no crear una región única |
| 135 `Libertarian Feminism` | B defendible como familia condicionada | Elegir una tradición concreta y documentar qué añade frente a feminismo liberal, anarquista y libertarismo general; no inferir un paquete desde dos etiquetas |
| 154 `Religious Anarchism`; 156 `Agorism`; 163 `Anarcha Feminism`; 164 `Queer Anarchism`; 166 `Eco Anarchism`; 167 `Egoism`; 169 `Voluntaryism`; 170 `Hoppeanism`; 174 `Anarcho primitivism` | Ramas/corrientes reales; B defendible con condiciones | Usar corpus específico y evitar que una tríada genérica cree afinidad. Voluntarismo y Hoppeanismo necesitan demostrar discriminación adicional frente a ancap/minarquismo; primitivismo necesita el ítem de civilización industrial |
| 16 `Esoteric Fascism`; 19 `National Capitalism`; 35 `National Communism`; 60 `Conservative Socialism` | Granularidad dudosa | Son paraguas heterogéneos. Exigir una definición académica y variantes; hasta entonces, contexto/faceta, no región |
| 88 `Progressive Conservatism`; 97 `National Liberalism`; 112 `Green Libertarianism`; 120 `Social Libertarianism` | Etiqueta dependiente de país o demasiado amplia | Elegir tradición, país y periodo, o conservar como cruce de facetas sin Voronoi |
| 122 `Distributist Libertarianism` | B no demostrada y atlas contradictorio | El propio documento admite que falta una fuente separada; no sustituirlo por Rawls. Fuente primaria de la variante o exclusión contextual |
| 129 `National Libertarianism`; 137 `Christian Libertarianism`; 138 `Propertarianism`; 140 `Libertarian Market Socialism` | B condicionada por corpus | Exigir autores, organizaciones o literatura académica que delimiten núcleo y contraindicadores. Si solo son combinaciones de adjetivos, mostrarlas como facetas, no doctrinas integrales |

### 4.3 Decisión C · 35 etiquetas

La decisión C es, en general, el bloque mejor resuelto: reconoce conceptos reales sin convertirlos en ideología total.

| Nº y rótulo | Dictamen | Tratamiento correcto |
|---|---|---|
| 6 `Corporatocracy`; 32 `Authoritarian Capitalism`; 53 `General Authoritarianisms`; 76 `Statism`; 105 `Kleptocracy`; 127 `Anti Authoritarianism` | Defendible | Diagnóstico o facetas de captura, régimen, coerción y dispersión del poder; nunca identidad integral |
| 23 `Populism (Left)`; 33 `Populism (Right)` | Defendible | Populismo como ideología delgada/estilo unido a una doctrina huésped. No heredar economía desde “izquierda/derecha” sin fuente |
| 25 `Left Wing Nationalism`; 34 `Anti Revisionism`; 70 `Collectivism`; 93 `Anti Capitalism`; 94 `General Socialism`; 98 `General Capitalism`; 102 `Progressivism`; 121 `Libertarianism`; 124 `Marxism` | Defendible como familia/rasgo | Tarjeta de familia y ramas concretas. No producir un punto único ni hacer competir una familia con sus hijas |
| 46 `Imperialism`; 79 `Zionism`; 113 `Confederalism`; 115 `Transhumanism` | Defendible como eje no 2D | Geopolítica, territorio, tecnología o modelo estatal. Sionismo requiere ramas y contexto Israel/Palestina; no inferir economía ni posición ante un gobierno actual |
| 21 `Absolute Monarchism`; 57 `Aristocracy`; 66 `Elective Monarchism`; 75 `Religious Democracy`; 78 `Constitutional Monarchism`; 83 `Republicanism` | Defendible como forma institucional/familia | Mostrar en jefatura, legitimidad, pluralismo y selección de cargos. No ocupar regiones económicas |
| 38 `Technocracy` | Defendible | Faceta de autoridad epistémica/selección de decisores. Distinguir expertos con control democrático de gobierno de expertos sin control |
| 39 `Sikh Theocracy`; 41 `Buddhist Theocracy`; 43 `Hindu Theocracy`; 44 `Christian Theocracy`; 45 `Islamic Theocracy` | C defendible; cinco celdas no | Usar una escala general religión–Estado y casos de país solo en contexto. No atribuir economía ni homologar religiones; eliminar las cinco sustituciones del atlas |
| 96 `Centrism`; 99 `Anti Communism` | C defendible, tratamiento JSON asimétrico | No son identidades integrales, pero pueden tener ficha pedagógica fuera del plano. Anticomunismo y anticapitalismo deben recibir la misma regla de “negación + motivo + alternativa” |

### 4.4 Decisión D · 5 etiquetas

| Nº y rótulo | Dictamen | Tratamiento correcto |
|---|---|---|
| 20 `Alt Right` | Defendible | Movimiento/subcultura estadounidense con país y periodo, no región doctrinal universal |
| 126 `Syndicalism` | Defendible | Familia de estrategia/organización; las ramas anarcosindicalista, revolucionaria, reformista y nacional deben separarse |
| 142 `Antifa` | Defendible | Antifascismo como movimiento/estrategia plural. Conservar ficha explicativa, no matching identitario |
| 158 `Pink Capitalism` | Defendible | Estrategia comercial/coalición de mercado y derechos LGTB; medir ambas dimensiones por separado |
| 177 `Illegalism` | Defendible | Táctica/corriente histórica delimitada por país y periodo; nunca resultado lúdico ni permiso genérico para violencia |

### 4.5 Decisión E · 38 etiquetas

| Nº y rótulo | Dictamen | Tratamiento correcto / fuente necesaria |
|---|---|---|
| 12 `Mladorossism`; 26 `Pancasila`; 27 `Ba'athism`; 42 `Hindutva`; 50 `Arab Socialism`; 54 `Pan Arabism`; 55 `Pan turkism`; 61 `Black Nationalism`; 74 `Ho Chi Minh Thought`; 77 `Kuomintangism`; 86 `Labourism` | E defendible | País, periodo, textos primarios y literatura académica. No trasplantar al matching español ni comprimir economía/autoridad sin evidencia |
| 13 `Pol Potism`; 14 `Juche`; 17 `Nazism`; 28 `Vichy Fascism`; 30 `Showa Statism`; 51 `Titoism`; 58 `Feudalism`; 69 `Pinochetism`; 101 `Social Darwinism` | E defendible como modelo/régimen histórico | Contexto histórico, advertencia y no identidad. Titoísmo y otros modelos no deben participar como regiones mientras sean investigación |
| 40 `Mugabeism`; 49 `Chavism`; 56 `Trumpism`; 62 `Castroism`; 63 `Dengism`; 64 `Longism`; 73 `Guevarism`; 84 `Gaddafism`; 85 `Gorbachevism`; 136 `Korwinism` | E defendible, pero personalismo obliga a periodizar | Fuente primaria por etapa y revisión académica que separe figura, movimiento, gobierno y doctrina. Nunca usar el nombre como atajo a un paquete completo |
| 22 `Fordism`; 68 `Hamiltonianism`; 82 `Menshevism`; 104 `Girondism`; 118 `Utopian Socialism`; 125 `Gandhism`; 131 `Situationism`; 134 `Neozapatismo` | E defendible como historia/contexto | Fordismo no es ideología total; Gandhismo y neozapatismo requieren contexto anticolonial/comunitario; menchevismo, girondinismo y situacionismo necesitan periodos explícitos. No regiones contemporáneas españolas |

### 4.6 Decisión F · 22 etiquetas

| Nº y rótulo | Dictamen | Acción |
|---|---|---|
| 1 `Hive Mind Collectivism`; 3 `Neo Bolshevism`; 4 `Ingsocism`; 5 `Death Worship`; 48 `CapCom`; 52 `Monarcho Communism`; 65 `State Liberalism`; 81 `Banana Republicanism`; 128 `Astro Libertarianism`; 150 `Minarcho Socialism`; 155 `Anarcho Fascism`; 157 `Anarcho Monarchism`; 161 `Anarcho Posadism`; 171 `Anarcho Darwinism`; 172 `Soulism`; 173 `Anarcho Nazbol`; 175 `True Anarchism`; 176 `Anarcho Frontierism`; 178 `Avaritionism` | Exclusión defendible a falta de corpus serio | Mantener solo en inventario de procedencia. Corregir el motivo JSON de `Neo Bolshevism`: la tabla lo identifica como ficción de *1984*, no como mera ambigüedad |
| 7 `Kraterocracy` | Excluir como identidad, pero no llamar ficción | Existe como concepto marginal de gobierno por la fuerza; puede explicarse como forma de poder. No es sinónimo de primorriverismo |
| 141 `Mandelaism` | Exclusión/ambigüedad defendible | Existe uso académico para el imaginario/mitologización de Mandela y existe el mandelismo trotskista de Ernest Mandel. Ninguno equivale a Anarquismo sin adjetivos |
| 146 `Neo Libertarianism` | F como rótulo indeterminado; reentrada contextual posible | Hay usos incompatibles. Solo admitir una variante estadounidense intervencionista con fuente primaria, país y década; de lo contrario, mantener excluida |

## 5. Regiones en investigación que deben quedar bloqueadas

En el corte auditado, estas 22 fichas eran `region` y `investigacion`. Tener tres preguntas existentes no probaba que formasen una escala ni que la coordenada fuese correcta. La corrección posterior mantiene 17 como anclas huecas bloqueadas y reclasifica Titoísmo, Guevarismo, Menchevismo, Neozapatismo y Situacionismo como contexto; las 22 siguen sin Voronoi ni afinidad hasta completar su expediente.

| Corriente | Fuente primaria mínima | Contraste independiente y carencia decisiva |
|---|---|---|
| Cuarta Teoría Política | Textos de Dugin por edición/fecha | Estudios académicos sobre eurasianismo; no asumir economía única ni recepción española |
| Neonazismo | Programas/documentos de una organización y periodo concretos | Estudios de extremismo y fuentes oficiales; economía indeterminada, sensibilidad violenta |
| Strasserismo | Documentos de Otto/Gregor Strasser y NSDAP por fecha | Historiografía del nazismo; no convertir retórica anticapitalista en izquierda |
| Neorreacción / Dark Enlightenment | Yarvin y Land, con pasajes | Investigación académica; separar monarquismo, tecnoutopía y economía |
| Tercera vía | Giddens y manifiestos Blair–Schröder | Literatura comparada y recepción PSOE por periodo |
| Libertarismo nacional | Autores/organizaciones que usen el nombre | Si no hay núcleo estable, pasar a nación + mercado como facetas |
| Rothbardianismo de izquierda | Rothbard de los sesenta y Karl Hess | Historia intelectual; distinguirlo de ancap general y agorismo |
| Libertarismo cristiano | Corpus de una tradición concreta | Si solo suma fe y mercado, pasar a facetas |
| Propertarianismo | Autor/corpus que delimite el término | Distinguir propiedad radical, ancap, Hoppe y uso crítico externo |
| Georgismo | Henry George | Literatura sobre impuesto al valor del suelo y recepción española; falta `N4` |
| Agorismo | Samuel Edward Konkin III | Investigación independiente; falta `N5` y no equivale a ilegalismo |
| Anarcofeminismo | Textos históricos, incluida Mujeres Libres cuando se alegue España | Historia académica; falta poder patriarcal no estatal y no basta sumar dos etiquetas |
| Anarquismo queer | Corpus de organizaciones/autores delimitado | Literatura académica; no heredar todas las controversias contemporáneas |
| Egoísmo anarquista | Stirner y tradición posterior concreta | Historia del anarquismo individualista; separar filosofía e ilegalismo |
| Voluntarismo | Auberon Herbert u otro corpus elegido | Demostrar utilidad incremental frente a minarquismo/ancap |
| Hoppeanismo | Hoppe, obra y edición concretas | Literatura crítica; no inferir exclusión o autoritarismo desde fiscalidad |
| Anarcoprimitivismo | Zerzan u otra variante explícita | Crítica académica; falta `N6`, civilización industrial |
| Titoísmo | Constituciones y normas yugoslavas por periodo | Historia económica/política; autogestión no elimina partido-Estado |
| Guevarismo | Guevara y Debray por texto/fecha | Historia latinoamericana; separar foco, internacionalismo y apoyo actual a violencia |
| Menchevismo | Mártov y documentos RSDLP | Historiografía 1903–1921; no usar como sinónimo de moderación |
| Neozapatismo | Declaraciones EZLN | Estudios de Chiapas; movimiento contextual, no identidad española |
| Situacionismo | Textos de la Internacional Situacionista | Historia intelectual/artística; falta un discriminante de mercancía/espectáculo |

## 6. Contradicciones adicionales atlas ↔ taxonomía

| Prioridad | Contradicción | Acción |
|---|---|---|
| P0 | La taxonomía dice que referencias E van al panel histórico/internacional, pero Titoísmo, Guevarismo, Menchevismo, Situacionismo y Neozapatismo son regiones | Cambiar a contexto/movimiento hasta crear una doctrina integral y justificar relevancia española |
| P0 | MAP-08 permitía Voronoi a cualquier `region`, mientras 22 entradas carecían de fuentes por ficha | **Corregido estructuralmente:** publicación geométrica explícita, 17 anclas bloqueadas y 5 contextos; sus expedientes siguen pendientes |
| P0 | MAP-03 dice que una F queda fuera, pero Kraterocracia y Mandelaism viven dentro de corrientes como `etiquetaOriginal` | Separar original y sustituto, aunque la interfaz ya intente mostrar el original como contexto |
| P1 | `Anti Capitalism` es faceta visible y `Anti Communism` exclusión, pese a que §7 aplica la misma regla a ambas negaciones | Mantener ambas fuera de regiones y mostrar motivo/alternativa en una misma clase de faceta pedagógica |
| P1 | `Neo Bolshevism` es ficción orwelliana en la taxonomía, pero “ambigua” en la exclusión JSON | Corregir tipo y motivo; no mezclar con bolchevismo histórico |
| P1 | `Neo Libertarianism` es F en el inventario y B contextual en JSON sin registrar re-clasificación | Añadir decisión original, resolución de ambigüedad, fuentes y versión editorial |
| P1 | “45 instrumentadas” en el documento frente a 60 en JSON | Conteos generados y nueva versión |
| P1 | Todas las C/D/E incluidas pasan a decisión B, aunque `capa` no siempre conserva el tipo original | No sobrecargar B; preservar ontología original y tratamiento actual por separado |

## 7. Fuentes de contraste ya localizadas

Estas fuentes sostienen criterios y casos concretos; no validan por sí solas las 178 fichas.

- [The Palgrave Handbook of Anarchism (en inglés)](https://link.springer.com/book/10.1007/978-3-319-75620-2) documenta como tradiciones diferenciadas mutualismo, individualismo, anarcocomunismo, sindicalismo, anarcofeminismo y anarquismo verde. Apoya conservar ramas serias y no inventar cruces simétricos.
- [Kropotkin y el comportamiento cooperativo: crítica e influencia en España](https://revistas.ucm.es/index.php/IJHE/es/article/view/91208) y su discusión historiográfica del colectivismo/comunismo español respaldan la relevancia de distinguir las ramas históricas españolas, no sus coordenadas actuales.
- [Populism: An Ideational Approach (en inglés)](https://academic.oup.com/edited-volume/27977/chapter-abstract/211648584) respalda tratar populismo como una ideología delgada que necesita una doctrina huésped.
- [On the measurement of voter ideology (en inglés)](https://www.sciencedirect.com/science/article/pii/S017626801730277X) identifica cuatro dimensiones empíricas y muestra por qué un eje único —e incluso un 2D no validado— oculta heterogeneidad. Apoya que el plano sea explorador y no resultado total.
- [Self-reported political ideology (en inglés)](https://www.cambridge.org/core/journals/political-science-research-and-methods/article/selfreported-political-ideology/C2BED995008303104F4D43819B5FCC1E) advierte que muchas personas no conocen bien qué paquetes de posiciones corresponden a cada etiqueta; apoya preguntar por proposiciones y no por nombres.
- [Falangismo, nacionalsocialismo y el mito de Hitler en España](https://www.cepc.gob.es/publicaciones/revistas/revista-de-estudios-politicos/numero-169-julioseptiembre-2015/falangismo-nacionalsocialismo-y-el-mito-de-hitler-en-espana-1931-1945-1) respalda separar falangismo, nazismo y franquismo.
- [Antifranquistas de boina roja](https://www.cepc.gob.es/sites/default/files/2024-07/a-1192-antifranquistas-accesible.pdf) documenta el giro carlista hacia “Libertad, Federalismo, Socialismo y Autogestión”, lo que respalda mantener separado el carlismo socialista del tradicionalista.
- [La CEDA y la Iglesia en la II República española](https://www.cepc.gob.es/sites/default/files/2021-12/16062repne031-032115.pdf) muestra la centralidad de la confesionalidad y también el debate sobre su formulación. No autoriza a convertir CEDA en sinónimo de teocracia cristiana.
- [Fernando de los Ríos y el socialismo humanista democrático](https://www.cepc.gob.es/sites/default/files/2022-06/3973709san-andres-corral.html) respalda la existencia de esa tradición española, pero precisamente confirma que no guarda relación con `Mugabeism`.
- [Mandelaism in newspaper advertising that “pays tribute” to Mandela (en inglés)](https://ujcontent.uj.ac.za/esploro/outputs/journalArticle/Mandelaism-in-newspaper-advertising-that-pays/9910248007691) usa el término para prácticas culturales y mitologización de Mandela, no para Anarquismo sin adjetivos.
- [Three Concepts of Natural Law (en inglés)](https://doiserbia.nb.rs/img/doi/0353-5738/2022/0353-57382203601V.pdf) recoge el uso de *kratocracy/kraterocracy* de Montague como gobierno del más fuerte y señala que no desarrolla una teoría detallada de ese gobierno. Apoya tratarlo como concepto marginal de poder, no como doctrina integral ni sinónimo de primorriverismo.

## 8. Orden de cierre recomendado

1. Desacoplar las quince sustituciones y preservar A–F en el esquema.
2. Bloquear geométricamente las 22 entradas en investigación —17 anclas y 5 contextos— y mantener los indicadores de densidad solo como diagnósticos.
3. Añadir expediente de fuentes por corriente y sincronizar conteos/versiones.
4. Resolver primero los trece rótulos B de granularidad dudosa y los tres F especiales (`Kraterocracy`, `Mandelaism`, `Neo Libertarianism`).
5. Revisar la prioridad A con evidencia de relevancia española, sin retirar ramas comunistas, anarquistas o libertarias reales: si no justifican capa principal, pasan a profundidad, no desaparecen.
6. Solo después recalcular coordenadas y volver a medir vacíos. Los vacíos resultantes son información sobre los límites del modelo, no defectos que deban taparse.

## 9. Criterio de cierre de esta auditoría

Esta auditoría considera **nominalmente revisadas** las 178 decisiones, pero deja abiertas las decisiones factuales que requieren fuentes. No debe traducirse en 178 checks de “mapeado correcto”. El cierre real de cada ficha exige:

- corpus identificable y variante explícita;
- fuente primaria y al menos una académica independiente;
- fuente en español o etiqueta visible de idioma cuando no exista;
- encaje español documentado o declaración honesta de baja relevancia;
- contraindicador frente a la corriente vecina;
- coordenada independiente del activo visual, o ausencia de coordenada;
- tratamiento específico de país, periodo, violencia y antipluralismo;
- revisión que busque evidencia contraria, no solo confirmatoria.

Hasta cumplir esos requisitos, el nombre correcto del producto es **atlas editorial en investigación**, no mapa exhaustivo validado del espectro político.
