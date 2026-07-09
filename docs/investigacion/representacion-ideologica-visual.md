# Representar una ideología política multidimensional sin reducirla a un «compass»

**Fecha de corte:** 10 de julio de 2026
**Ámbito:** metodología de medición, visualización y experiencia de resultados para Espectro. Se revisan literatura académica en inglés y español, proyectos originales y el frontend actual.
**Límite de esta investigación:** no se modifica código ni datos de producción.

## Respuesta corta

La representación principal de Espectro debería ser un **perfil por facetas**, no un punto en un plano ni una etiqueta identitaria. Cada faceta estrecha se mostraría en una **escala horizontal común**, agrupada dentro de dominios que sirven para navegar pero que **no se promedian**. Al lado de cada posición deben aparecer por separado su cobertura, su estado de validación y, cuando exista calibración suficiente, su incertidumbre de medición.

La interfaz tendría tres espacios claramente separados:

1. **Tu perfil:** descripción independiente de partidos y elecciones.
2. **Perfiles de referencia:** comparación opcional con prototipos doctrinales documentados —no organizaciones ni recomendaciones—, siempre mostrando coincidencias, diferencias y cobertura.
3. **Afinidad electoral:** comparación coyuntural con candidaturas elegibles, fuentes y fecha de la elección.

Un mapa de dos dimensiones puede sobrevivir como explorador secundario en el que el usuario elige qué dos facetas comparar. No debe haber un «mapa verdadero» predeterminado. Tampoco conviene usar como resultado canónico un radar, PCA, UMAP, t-SNE o una etiqueta del tipo «eres X».

Esta solución permite representar sin partido a un anarcocapitalista, un consejista, un carlista o un ecologista pronuclear porque no presupone que antiestatismo, propiedad, organización, tradición, territorio, ecología y nuclear se muevan juntos.

## 1. Qué se mide: posiciones, no identidades

Una respuesta política puede describir al menos cinco objetos distintos que las interfaces suelen mezclar:

| Nivel | Qué representa | ¿Se puntúa? | Presentación recomendada |
|---|---|---:|---|
| **Ítem** | Una decisión o afirmación concreta. | Sí, como respuesta observada. | Texto, respuesta, importancia y explicación. |
| **Faceta** | Un constructo estrecho que varias preguntas intentan medir de forma coherente. | Sí, solo con cobertura y validez suficientes. | Barra divergente con punto, polos escritos y estado de evidencia. |
| **Dominio** | Una agrupación editorial para orientarse: economía, democracia, territorio, etc. | **No.** | Encabezado y resumen de cobertura; nunca una media que vuelva a colapsar facetas. |
| **Perfil de referencia** | Una configuración teórica y documentada de respuestas o facetas. | Se calcula similitud descriptiva, no pertenencia. | Coincidencias, diferencias y fuentes; nunca «diagnóstico» o recomendación. |
| **Partido/candidatura** | Una oferta electoral real, fechada y territorialmente elegible. | Afinidad por ítems compartidos. | Sección electoral separada, con cobertura y calidad de fuentes. |

La palabra **faceta** debe reservarse a una escala con varios indicadores y una hipótesis de unidimensionalidad. Si solo existe una pregunta sobre Gibraltar, monarquía o energía nuclear, puede mostrarse como **posición específica** mientras no haya suficiente evidencia para llamarla escala. Esta distinción evita que todos los temas reciban una falsa apariencia psicométrica.

También conviene separar dos usos de «ideología»:

- La **ideología operativa** es el patrón de posiciones concretas que el usuario ha expresado.
- La **identidad ideológica** es la etiqueta con la que una persona se reconoce o el grupo al que siente pertenecer.

No son intercambiables. La investigación europea muestra que la autoubicación izquierda–derecha depende del contexto y puede estar impulsada por vínculos partidistas o simbólicos tanto como por preferencias de política pública ([Caughey, O'Grady y Warshaw, *APSR*, 2019](https://www.cambridge.org/core/journals/american-political-science-review/article/policy-ideology-in-european-mass-publics-19812016/EC5CCE297E0EE5CC108EB87C4240E4A9)). Un estudio experimental reciente encuentra que las etiquetas izquierda/derecha funcionan como atajos de grupo aun cuando la autoubicación no resume bien las posiciones del votante ([Lachance y Treger, *Public Opinion Quarterly*, 2026](https://academic.oup.com/poq/article/90/3/730/8554342)). Por eso Espectro debe decir «tus respuestas se parecen en estas cuestiones», no «eres».

## 2. Por qué dos dimensiones no bastan

### 2.1 La opinión ciudadana no hereda necesariamente la estructura de los partidos

Los partidos y las élites tienen incentivos para empaquetar asuntos heterogéneos en plataformas coherentes. La ciudadanía puede combinar esos asuntos de maneras diferentes. Un estudio publicado en 2026 con más de seis millones de usos reales de las VAAs belgas de 2024 encontró una estructura ideológica mínima entre votantes y una estructura bastante mayor entre élites que contestaban las mismas afirmaciones ([Mongrain y Walgrave, *European Journal of Political Research*, 2026](https://www.cambridge.org/core/journals/european-journal-of-political-research/article/onedimensional-multidimensional-or-nondimensional-ideological-structure-in-mass-and-elite-opinion/78C953E1B5CC289B183AC549621DB14D)). No debe suponerse que las correlaciones de una competición partidista sean leyes de la ideología personal.

Otro análisis con una muestra representativa neerlandesa y 40 posiciones políticas identificó cuatro dimensiones distintas —igualdad económica, mercados/eficiencia, libertad personal y cultural, y nacionalismo/proteccionismo/populismo— que solo correlacionaban modestamente con la escala izquierda–derecha ([Laméris, Jong-A-Pin y Garretsen, *European Journal of Political Economy*, 2018](https://www.sciencedirect.com/science/article/pii/S017626801730277X)). La medición europea comparada también encuentra que economía, asuntos sociales y migración/nacionalismo producen patrones que una sola escala no reproduce ([Caughey, O'Grady y Warshaw, 2019](https://www.cambridge.org/core/journals/american-political-science-review/article/policy-ideology-in-european-mass-publics-19812016/EC5CCE297E0EE5CC108EB87C4240E4A9)).

La consecuencia de producto es importante: **un resultado puede ser internamente combinado sin ser incoherente o centrista**. Una persona puede querer propiedad colectiva y poco Estado, ecología fuerte y nuclear, tradición moral y fueros, o intervención militar sin atlantismo. La interfaz debe conservar esas combinaciones.

### 2.2 Los grandes proyectos comparados usan jerarquías, no un único cuadrante

Tres proyectos académicos ayudan a definir una arquitectura razonable, aunque ninguno deba copiarse sin adaptación:

- **CHES 2024** sitúa 279 partidos europeos con la evaluación de 609 especialistas y mantiene por separado integración europea, izquierda/derecha general, economía, sociedad y políticas como inmigración, redistribución, descentralización, ambiente, populismo y democracia. Su propia evolución demuestra que los asuntos relevantes no caben en un eje universal ([Chapel Hill Expert Survey 2024](https://www.chesdata.eu/ches-europe)). CHES mide partidos, no personas; sirve como inventario comparado y validación externa, no como cuestionario personal listo para usar.
- **MARPOR/Manifesto Project** codifica cuasi-frases en decenas de categorías agrupadas en siete áreas de política pública ([manual oficial](https://manifesto-project.wzb.eu/information/documents/handbooks)). Su índice RILE es transparente, pero el propio tutorial del proyecto explica críticas de comparabilidad entre países, validez y desplazamiento artificial hacia el centro por contenido «neutral» ([tutorial oficial de RILE](https://manifesto-project.wzb.eu/down/tutorials/main-dataset.html)). La lección es conservar categorías y dominios, no convertir automáticamente toda su riqueza en izquierda–derecha.
- **V-Dem** descompone conceptos amplios en indicadores, componentes e índices y publica tanto estimaciones puntuales como regiones creíbles. Su modelo no es trasladable sin más a respuestas individuales, pero sí lo es el principio de **jerarquía conceptual + incertidumbre visible + libro de códigos** ([metodología V-Dem](https://v-dem.net/about/v-dem-project/methodology/), [documentos de referencia v16](https://www.v-dem.net/data/reference-documents/)).

### 2.3 España necesita, como mínimo, una dimensión territorial visible

La serie oficial del CIS continúa preguntando una única autoubicación de 1 —izquierda— a 10 —derecha—; es útil como identidad declarada y para series históricas, pero no pretende ser un perfil exhaustivo ([serie CIS, consultada en 2026](https://www.cis.es/es/series/escala-de-autoubicacion-ideologica-1-10-poblacion-residente-vii-)).

Las experiencias españolas han tenido que añadir otras dimensiones:

- La **Brújula Electoral UC3M/Kieskompas de 2015** mostraba izquierda–derecha y progresismo–conservadurismo, además de comparación por tema y codificación por varios analistas ([UC3M](https://www.uc3m.es/ss/Satellite/UC3MInstitucional/es/Detalle/Comunicacion_C/1371216216251/1371216001705/Una_aplicacion_online_permite_a_los_ciudadanos_conocer_el_partido_politico_mas_cercano_a_su)). Su conclusión de competición partidista casi unidimensional no debe extrapolarse a toda persona ni a 2026.
- **Decidir23J**, desarrollado por investigadores de UPF y UOC para las generales de 2023, usó economía/izquierda–derecha y centralización–descentralización, con adaptaciones para Cataluña, Euskadi, Galicia y Canarias ([UOC/UPF](https://www.uoc.edu/en/news/2023/178-uoc-and-upf-researchers-launch-decidir23)). Es un precedente directo de que el plano español exige territorialidad, pero sigue siendo un resumen electoral de dos dimensiones.
- **EU&I 2024**, que incluyó España, separa el ranking por afirmaciones de seis dimensiones temáticas y de un «paisaje» de solo dos ejes; su metodología advierte expresamente que el paisaje reduce más la complejidad y no interviene en el matching ([metodología EU&I](https://www.euandi.eu/en/data-research/methodology.html)). Esa separación es una decisión acertada para Espectro.

En España, además de economía, cultura y territorio, las propias facetas de Espectro ya muestran divisiones independientes sobre UE, pluralismo institucional, forma del Estado, organización, ecología, nuclear, trabajo, religión y geopolítica. Ocultarlas para conservar un cuadrante limpio sería perder precisamente el valor diferencial del proyecto.

## 3. Lo que enseñan las VAAs sobre validez y explicación

### 3.1 El resultado depende de decisiones de diseño

La selección de afirmaciones no es neutral. Una simulación de 500.000 combinaciones mostró que distintas selecciones producían consejos divergentes y favorecían a partidos diferentes ([Walgrave, Nuytemans y Pepermans, 2009](https://medialibrary.uantwerpen.be/oldcontent/container2608/files/Walgrave%20et%20al%202009%20-%20voting%20aid%20applications.pdf)). La métrica también importa: una mayoría de usuarios de StemWijzer habría recibido otro primer partido bajo otro modelo espacial ([Louwerse y Rosema, 2014](https://www.tomlouwerse.nl/publications/2014-louwerse-rosema-actapolitica/)). Y un modelo bidimensional idéntico para todos los países no acomoda la variación real entre sistemas partidistas ([Otjes y Louwerse, 2014](https://www.tomlouwerse.nl/publications/2014-otjes-louwerse-es/)).

Por ello, la explicación no puede limitarse a publicar una fórmula. El usuario necesita ver:

1. qué respondió;
2. a qué faceta se asignó cada pregunta y con qué signo/peso;
3. cuántas preguntas sostienen la faceta;
4. qué coincidencias y diferencias producen una comparación;
5. qué partes no se midieron o no son comparables.

La validación dinámica propuesta para VAAs comprueba unidimensionalidad y fiabilidad con datos tempranos, en lugar de dar por válidas las escalas definidas a priori ([Germann y Méndez, 2016](https://michagermann.github.io/publication/germannmendez2016/)). Espectro ya prevé Mokken/IRT en `docs/METODOLOGIA.md`; la interfaz debe reflejar el estado real —conceptual, piloto o validado— y no esperar a que todo sea perfecto para ser honesta.

### 3.2 Una coincidencia total puede ocultar caminos opuestos

La FAQ oficial de Wahl-O-Mat ofrece un ejemplo especialmente útil: un usuario puede coincidir en 19 preguntas con el partido A y en las otras 19 con el partido B, de modo que ambos reciben el mismo porcentaje aunque no coincidan entre sí en ninguna pregunta. También recuerda que la misma respuesta puede proceder de motivaciones distintas ([Wahl-O-Mat 2025](https://www.bpb.de/themen/wahl-o-mat/bundestagswahl-2025/558464/haeufig-gestellte-fragen-zum-wahl-o-mat/)).

Esto es **equifinalidad**: el mismo agregado se alcanza por rutas diferentes. Se evita de tres maneras complementarias:

- no promediar facetas distintas en un «resultado global»;
- conservar la firma de ítems dentro de cada faceta y señalar tensiones internas;
- explicar cada similitud con sus coincidencias y diferencias decisivas, no solo con un porcentaje.

### 3.3 La visualización también altera la interpretación

La investigación específica sobre VAAs encuentra que personas distintas interpretan de manera diferente gráficos que el diseñador cree equivalentes ([Bruinsma, 2020](https://ideas.repec.org/a/bpj/statpp/v11y2020i1p1-21n1.html)). Un experimento de IEEE VIS 2025 con 382 participantes comparó el mapa tradicional de Kieskompas con un mapa metafórico basado en reducción dimensional: el segundo fue más difícil de interpretar y produjo menor conocimiento percibido y factual, aunque redujo algunas lecturas partidistas ([Verboom et al., 2025](https://research.tilburguniversity.edu/en/publications/visualizing-opinion-space-in-voting-advice-applications-a-user-st/)).

La lección no es que toda innovación visual sea mala, sino que una imagen atractiva no debe exigir al usuario descubrir qué significan distancias, regiones o formas. En 2026, dos experimentos en escritorio y móvil también encontraron que añadir información contextual accesible mediante botones reducía respuestas no direccionales y mejoraba la experiencia, sin que el chatbot aportara una ventaja necesaria frente a una interfaz web enriquecida ([Liebrecht, Kamoen y Van Lieshout, 2026](https://journals.sagepub.com/doi/abs/10.1177/00936502261425713)). El patrón favorece pequeños desplegables explicativos, no una metáfora visual opaca ni IA generativa en el camino crítico.

## 4. Comparación crítica de mapas y tests populares

Estos proyectos son precedentes de diseño y cultura de uso, no autoridades científicas equivalentes a CHES o a una escala validada.

| Proyecto | Qué hace bien | Límite metodológico relevante | Qué puede aprender Espectro |
|---|---|---|---|
| **Political Compass** | Un plano memorable y fácil de compartir; separó economía de una dimensión social/autoritaria. | Su FAQ admite proposiciones intencionadamente vagas o sesgadas, rechaza «no sé» y mantiene en secreto el scoring. No publica validación psicométrica; dos coordenadas y cuadrantes esconden combinaciones ([FAQ oficial, actualizada en 2026](https://www.politicalcompass.org/faq)). | Conservar la memorabilidad y rechazar la opacidad, el punto único y las etiquetas de cuadrante. |
| **Nolan Chart / World's Smallest Political Quiz** | Separa libertad económica y personal con solo diez preguntas y explicita su cálculo. | Es un instrumento de divulgación promovido por una organización libertaria, con marco estadounidense y cinco tipos prefijados; diez ítems no cubren territorio, ecología, organización, UE o geopolítica ([sitio oficial](https://www.theadvocates.org/quiz/)). | Una visualización breve puede ser puerta de entrada, pero no debe fingir exhaustividad. |
| **8values** | Código abierto, cuatro pares de valores y resultado compacto basado en barras; muy compartible. | El repositorio expone preguntas y pesos, pero no un estudio de construcción, fiabilidad o validez; asigna una ideología «más cercana» y trata cada par como complemento ([repositorio original](https://github.com/8values/8values.github.io)). | Barras por faceta y transparencia del código, sin heredar etiquetas forzadas ni ejes no validados. |
| **9Axes** | Amplía mucho la cobertura y ofrece una versión corta y otra de 216 preguntas. | Nueve binarios siguen siendo decisiones editoriales; no se publica validación de escalas ni incertidumbre ([proyecto original](https://9axes.github.io/), [repositorio](https://github.com/9Axes/9Axes.github.io)). | Profundidad opcional y módulos, pero con cobertura visible y sin presentar número de ejes como sinónimo de rigor. |
| **PolitiScales** | Ocho barras claras, rasgos adicionales y una tarjeta final fácilmente reconocible. | Mezcla actitudes políticas, teorías sobre naturaleza humana y método de cambio; se define como aproximación inspirada en 8values, sin paper de validación ([ayuda/proyecto](https://dbhq.github.io/help/), [resultados](https://politiscales.party/results)). | El formato editorial funciona; los «rasgos» sueltos deben convertirse en posiciones documentadas, no insignias identitarias. |
| **LeftValues** | Demuestra el valor de profundizar dentro de una familia: revolución/reforma, partido/sindicato, producción/naturaleza, etc. | Se declara solo apto para izquierda; su «closest match» es un trabajo en curso y el proyecto deriva de 8values ([proyecto](https://leftvalues.github.io/), [repositorio original](https://github.com/LeftValues/leftvalues.github.io)). | Los módulos de profundización de Espectro tienen sentido, pero sus resultados deben integrarse en el mismo perfil personal. |
| **SapplyValues** | Añade una dimensión cultural al compass y usa una UI conocida. | El propio repositorio lo describe como clon de Sapply con la interfaz de 8values; no documenta una metodología académica ([repositorio original](https://github.com/SapplyValues/SapplyValues.github.io)). | No confundir popularidad comunitaria con validación. |
| **smartvote** | Publica asignación de preguntas, distingue matching, «smartmap» y perfil temático, y permite comparar candidato/usuario. | Su `smartspider` es un radar de 6–8 ejes: compacto, pero hereda problemas perceptivos y de área ([descripción oficial](https://smartvote.org/how-smartvote-works/), [ejemplo metodológico](https://australia2019.smartvote.org/en/methodology)). | Separar vistas y publicar mapeos; sustituir el radar por pequeñas escalas comunes. |
| **EU&I / Wahl-O-Mat / Vote Compass** | Separan «sin opinión», ranking por ítems, dimensiones ilustrativas y explicación con fuentes. Vote Compass usa codificación independiente, reconciliación y citas visibles ([EU&I](https://www.euandi.eu/en/data-research/methodology.html), [Wahl-O-Mat](https://www.bpb.de/themen/wahl-o-mat/bundestagswahl-2025/558464/haeufig-gestellte-fragen-zum-wahl-o-mat/), [Vote Compass](https://www.voxpoplabs.com/votecompass/methodology.pdf)). | Siguen siendo herramientas electorales: un paisaje de partidos no equivale al universo de doctrinas personales. | Reutilizar trazabilidad y comparación ítem a ítem, pero mantener el mapa personal fuera del ranking electoral. |

## 5. Casos que el diseño debe resolver

| Caso | Por qué un compass lo confunde | Facetas mínimas que lo hacen legible |
|---|---|---|
| **Anarcocapitalismo** | Puede compartir antiestatismo y descentralización con anarquismos de izquierda, pero divergir por completo en propiedad, mercado y poder laboral. «Libertario» no basta. | Propiedad/mercado, redistribución, dirección estatal, poder laboral, autoridad política, organización y libertades civiles. |
| **Consejismo** | Puede ser antiestatal y horizontal, pero colectivista, revolucionario y partidario del control obrero. Un promedio economía–autoridad puede acercarlo falsamente al anarcocapitalismo o al leninismo. | Propiedad, mercado, estatismo, poder laboral, partido/consejos, jerarquía, método de cambio y pluralismo. |
| **Carlismo** | Tradición, confesionalidad y monarquía pueden coexistir con fueros y descentralización. Un eje «autoridad» lo acercaría indebidamente a un centralismo uniforme. Además, el carlismo cambia según época y corriente. | Forma del Estado, territorial/fueros, tradición moral, religión–Estado, libertad de conciencia, organización y economía; referencia versionada por variante. |
| **Ecologismo pronuclear** | Muchos mapas convierten ecología en antinuclear por construcción. Así hacen invisible a quien prioriza clima y biodiversidad pero apoya nuclear civil. | Ecología/productivismo, energía nuclear civil, decrecimiento/ecomodernismo, planificación energética y participación territorial. |

Hay una segunda equifinalidad dentro de una misma faceta. Dos personas pueden obtener `0` en «papel del Estado»: una porque contestó neutral a todo y otra porque apoya nacionalizar redes pero rechaza límites al consumo y planificación social. El resultado debe distinguir:

- **posición intermedia:** respuestas moderadas que apuntan al centro;
- **perfil mixto:** respuestas fuertes en sentidos opuestos;
- **poca información:** pocos ítems o muchas respuestas «sin opinión»;
- **sin medir:** el módulo correspondiente no se contestó.

El centro del gráfico solo debe significar posición central estimada. Nunca debe reutilizarse para desconocimiento, conflicto interno o ausencia de datos.

## 6. Arquitectura metodológica propuesta

### 6.1 Dominios como navegación; facetas como medida

Una organización inicial compatible con el banco actual sería:

1. **Economía, propiedad y provisión:** redistribución; mercado/regulación; propiedad; dirección estatal; servicios públicos.
2. **Trabajo y organización colectiva:** poder laboral; autonomía sindical; jerarquía/horizontalidad; partido, sindicato o consejos; método de cambio.
3. **Democracia, Estado y libertades:** pluralismo y contrapesos; institucionalismo; representación/directa; civil-libertad/seguridad; populismo; forma de jefatura.
4. **Sociedad, moral y pertenencia:** tradición moral; género y familia; inmigración/asimilación; religión–Estado; libertad de conciencia; animalismo cuando se trate como estatus moral.
5. **Territorio y soberanía compartida:** centralización/descentralización; autodeterminación; UE; multilateralismo; internacionalismo/soberanismo.
6. **Ecología, tecnología y modelo productivo:** prioridad ecológica; crecimiento/decrecimiento; nuclear civil; despliegue territorial; innovación y precaución.
7. **Mundo, paz y defensa:** alianzas; capacidad militar; intervención; armas nucleares; neutralidad; derechos humanos en política exterior.

No todos necesitan estar abiertos a la vez. En móvil, cada dominio puede ser un acordeón con «4 de 6 facetas medidas». El encabezado no recibe una puntuación: decir «62 % en Economía» volvería a mezclar propiedad, mercado, redistribución y Estado.

Las facetas deben ser más estrechas que varios ejes actuales. En particular, GAL–TAN, atlantismo, internacionalismo o implicación internacional solo deben conservarse si sus ítems escalan juntos. Si no lo hacen, se dividen o se muestran como posiciones específicas. CHES es una fuente para proponer dominios, no una licencia para asumir un único factor.

### 6.2 Puntuación, saliencia y umbral de publicación

La suma ponderada actual es una estimación provisional y transparente:

```text
posición_f = 100 · Σ(respuesta_i · carga_if · peso_i)
                    / Σ(2 · |carga_if| · peso_i)
```

Sin embargo, el motor actual usa `peso_i = 2` cuando el usuario marca una pregunta como importante. Para el **perfil personal** conviene separar dos variables:

- **posición:** en qué dirección y con qué intensidad responde;
- **saliencia:** cuánto pesa ese asunto en sus prioridades políticas.

Dos personas que contestan «muy de acuerdo» sostienen la misma posición en ese ítem aunque una lo considere decisivo para votar y la otra no. Multiplicar la respuesta importante desplaza la faceta y mezcla contenido con prioridad. La versión canónica del perfil debería usar pesos fijos del instrumento —carga teórica o discriminación calibrada— y representar la saliencia como una capa distinta. La importancia sí puede ponderar la **afinidad electoral**, porque ahí la pregunta es qué discrepancias pesan más para elegir. Smartvote adopta una separación parecida: la ponderación del usuario afecta al matching, pero no al cálculo de sus perfiles temáticos ([metodología de smartvote Austria](https://austria.smartvote.org/de/wiki/aut-methoden)).

Por tanto, el objetivo es:

```text
posición_f = 100 · Σ(respuesta_i · carga_if · pesoEscala_i)
                    / Σ(2 · |carga_if| · pesoEscala_i)

saliencia_f = resumen separado de los ítems que el usuario marcó importantes
```

Mientras el motor no cambie, la interfaz debe explicar que el valor incorpora prioridades. No debe llamarlo rasgo latente calibrado.

Pero no debe mostrarse con igual certeza en todos los casos. Para cada faceta hacen falta al menos:

- `nRespondidos`: preguntas con opinión que contribuyen;
- `nDisponibles`: preguntas administradas que podían contribuir;
- `nBanco`: preguntas activas de la faceta en los módulos aplicables;
- `coberturaRespondida = Σ|carga| respondida / Σ|carga| administrada`;
- `coberturaBanco = Σ|carga| respondida / Σ|carga| aplicable`;
- estado de la escala: `conceptual`, `piloto` o `validada`.

La cifra exacta no debería publicarse como posición estable con una sola pregunta. Regla provisional hasta el piloto: mínimo de tres ítems con opinión y al menos la mitad de la carga aplicable; por debajo, mostrar «orientación tentativa» o «sin información suficiente». El umbral final debe decidirse por información del test y validación, no por estética.

### 6.3 Tres incertidumbres que no deben confundirse

| Incertidumbre | Qué significa | Cómo mostrarla |
|---|---|---|
| **Cobertura** | Faltan preguntas, módulos o posiciones comparables. | Texto exacto `4/7`, track incompleto y lista de facetas no medidas. |
| **Medición** | Aun con respuestas, la escala estima con error una variable latente. | Banda alrededor del punto solo después de calibración; texto «intervalo de medición», no «dudas tuyas». |
| **Codificación externa** | Un partido o referencia doctrinal tiene fuentes incompletas o discutidas. | Badge `evidencia alta/media/baja`, fecha y fuente; no se mezcla con la incertidumbre del usuario. |

Antes de calibrar Mokken/IRT, Espectro **no debe dibujar un intervalo de confianza estadístico inventado**. Puede mostrar cobertura y, si se calcula, un rango de sensibilidad del resultado al retirar una respuesta, etiquetándolo exactamente como «sensibilidad a un ítem». Un bootstrap de preguntas escogidas editorialmente no convierte el banco en una muestra aleatoria de «todas las preguntas políticas».

Tras validar una faceta unidimensional con suficientes datos, un modelo ordinal de respuesta al ítem puede producir información y error estándar condicional: la precisión cambia según la zona del rasgo y los ítems contestados ([introducción de ETS a IRT](https://www.ets.org/Media/Research/pdf/RM-20-06.pdf); [Reise, funciones de información y error condicional](https://onlinelibrary.wiley.com/doi/10.1002/9781118625392.wbecp357)). Entonces sí procede un punto con banda y explicación en lenguaje llano. V-Dem ofrece un buen precedente de publicar estimación, región creíble y escala interpretable, aunque su modelo sea diferente ([V-Dem](https://v-dem.net/about/v-dem-project/methodology/)).

La comunicación de incertidumbre debe ser directa. La literatura documenta que se omite a menudo pese a su valor y que distintas representaciones producen heurísticas diferentes ([Hullman, 2020](https://pubmed.ncbi.nlm.nih.gov/31425093/)). Una banda sobria con etiqueta textual es más adecuada aquí que densidades animadas.

### 6.4 Conservar la firma interna para evitar equifinalidad

Cada faceta expandida debería mostrar:

- las preguntas que tiran hacia cada polo;
- respuestas fuertes que se compensan;
- preguntas marcadas como importantes;
- términos y contexto;
- carga teórica y, cuando llegue el piloto, carga empírica;
- motivo editorial de la asignación.

Un indicador «perfil mixto» puede activarse cuando haya contribuciones sustantivas en ambos sentidos. No es inconsistencia ni error. El texto podría decir: «Tu puntuación queda cerca del centro porque combinas posiciones fuertes en ambos polos».

### 6.5 El camino explicable: pregunta → faceta → referencia

El camino visible debe ser reversible:

```text
«Construir nuevas centrales nucleares…»
Tu respuesta: de acuerdo · importante
        ↓ contribuye a
Energía nuclear civil: continuidad/expansión
        ↓ explica parte de
Coincidencia con “ecologismo pronuclear”: sí en nuclear;
diferencia en crecimiento material; 5 de 7 rasgos definitorios cubiertos.
```

Para no reintroducir equifinalidad, la similitud con referencias debe calcularse **por ítems compartidos**, como distancia Manhattan transparente, y agrupar después las contribuciones por faceta para explicarlas. La faceta no debe sustituir a las respuestas detalladas en el cálculo de similitud. Así, dos caminos que producen la misma media siguen siendo distinguibles. En la comparación doctrinal canónica tampoco se pondera por importancia: describe contenido. La vista puede ofrecer aparte «coincidencia en mis prioridades»; en el matching electoral, en cambio, la importancia sí conserva su función.

Los ítems `solo-matching` también pueden contribuir a una referencia si están documentados, pero deben aparecer como «posición específica», no simular una faceta.

## 7. Perfiles doctrinales de referencia sin convertirlos en recomendaciones

### 7.1 Qué es un perfil de referencia

Conviene sustituir en la interfaz «arquetipo» por **perfil de referencia** o **referencia doctrinal**. En metodología puede explicarse que es un tipo ideal: una construcción analítica que funciona como vara de comparación, no como descripción perfecta de una persona real. El análisis de tipos ideales permite hablar de grados de similitud y diferencia sin asumir pertenencia categórica ([Kvist, 2007](https://www.sciencedirect.com/science/article/abs/pii/S0148296307000173)).

Cada referencia debería incluir:

- nombre doctrinal y definición neutral;
- variante, lugar y periodo cuando sean relevantes;
- fuentes primarias canónicas y bibliografía académica;
- respuestas esperadas por ítem, con justificación y confianza;
- facetas **definitorias** y facetas no especificadas;
- divergencias internas conocidas de la tradición;
- fecha y versión de codificación;
- al menos dos codificadores y resolución documentada de desacuerdos.

Un carlismo histórico no debe mezclarse con todas las organizaciones que hoy usen ese nombre; «ecologismo pronuclear» describe una combinación de políticas, no necesariamente una escuela única. Si una tradición tiene variantes incompatibles, se crean perfiles distintos o se deja la faceta en `NE`.

### 7.2 Regla de comparación

Una referencia solo aparece si:

1. hay cobertura suficiente de sus ítems y facetas definitorias;
2. la distancia está por debajo de un umbral publicado;
3. se pueden mostrar al menos dos coincidencias y dos diferencias o matices;
4. no se oculta una contradicción en un rasgo central mediante el promedio.

La tarjeta no dirá «Tu ideología es consejista». Una formulación adecuada sería:

> **Coincidencias parciales con el consejismo**
> Coincides sobre control obrero y organización desde las bases. Difieres sobre ruptura institucional y planificación. Comparación basada en 18 de 25 posiciones definitorias.

Puede haber cero, una o varias referencias; **no se fuerza siempre un ganador**. Las referencias que superen el umbral se muestran juntas y la primera no recibe un tratamiento gráfico de «campeón». El usuario puede ordenar por similitud, cobertura o nombre.

### 7.3 Extremismos y doctrinas antipluralistas

Incluir una doctrina para describir el espacio no equivale a aprobarla. Para evitar recomendación, captación o confusión con partidos actuales:

- no usar «te recomendamos», «tu comunidad», insignias, mascotas, niveles o llamadas a afiliarse;
- no enlazar a canales de captación de organizaciones extremistas; usar fuentes históricas, textos primarios estables y análisis académico o institucional;
- separar visualmente **referencias doctrinales** de **candidaturas actuales** y no usar logos de partido;
- describir de manera factual si el perfil rechaza elecciones competitivas, separación de poderes, derechos iguales u oposición legal, usando las mismas facetas de pluralismo para todas las doctrinas;
- mostrar siempre diferencias decisivas, especialmente las institucionales;
- permitir ocultar todos los nombres doctrinales y navegar solo por facetas;
- no inferir que el usuario apoya violencia o antipluralismo por coincidir en economía, ecología o territorio.

La FAQ de Wahl-O-Mat explica el mismo riesgo en el ámbito electoral: una coincidencia media o alta con un partido extremista en políticas concretas no convierte al usuario en extremista y exige revisar fundamentos y justificaciones ([Wahl-O-Mat 2025](https://www.bpb.de/themen/wahl-o-mat/bundestagswahl-2025/558464/haeufig-gestellte-fragen-zum-wahl-o-mat/)). En Espectro, las facetas de pluralismo y medios políticos deben estar visibles, no diluidas en el porcentaje general.

## 8. Alternativas visuales evaluadas

Escala: 1 = deficiente, 5 = muy adecuada para el objetivo.

| Alternativa | Precisión | Equifinalidad | Móvil | Accesibilidad | Compartible | Veredicto |
|---|---:|---:|---:|---:|---:|---|
| **A. Cuaderno de facetas: small multiples de barras divergentes con punto/banda** | 5 | 5 | 5 | 5 | 4 | **Resultado canónico recomendado.** |
| **B. Mosaico o «código de perfil»: una tesela por faceta, símbolo + intensidad** | 3 | 4 | 4 | 3 | 5 | Resumen secundario y tarjeta para compartir; siempre acompañado de texto. |
| **C. Atlas 2D con dos facetas elegidas por el usuario** | 3 | 2 | 3 | 3 | 4 | Explorador opcional; nunca resumen total ni base del matching. |

### 8.1 Alternativa A — recomendada: cuaderno de facetas

Cada fila comparte la misma geometría horizontal. La posición sobre una escala común se percibe con más precisión que ángulos o áreas; los experimentos clásicos de percepción gráfica colocan la posición en escala común por delante de longitud, ángulo y área ([Cleveland y McGill, 1986](https://www.sciencedirect.com/science/article/pii/S0020737386800190)).

La fila contiene:

- nombre corto de faceta;
- los dos polos escritos, sin depender de `−` y `+`;
- track de extremo a extremo, cero visible y punto de posición;
- banda de medición cuando sea legítima;
- `5/7 preguntas · validación piloto`;
- estados textuales `perfil mixto`, `tentativo` o `sin medir`;
- botón «Por qué» que abre preguntas, cargas y referencias.

Ventajas: comparación exacta, lectura lineal, orden semántico, fácil reflujo en móvil, texto accesible y capacidad de dejar huecos explícitos. El coste es que ocupa más alto; los acordeones por dominio y un resumen inicial resuelven ese problema sin sacrificar significado.

### 8.2 Alternativa B: mosaico compartible

Un mosaico de 12–20 teselas puede ofrecer reconocimiento visual rápido: cada tesela lleva abreviatura, marcador direccional y nivel de cobertura. No debe usar solo color ni esconder los polos. Es adecuado como **postal** o resumen plegado, pero no para leer valores exactos.

Su fortaleza es la forma global y la facilidad de exportar en 1:1 o 4:5. Su riesgo es convertir intensidad cromática en certeza o valor moral. Por ello debe usar tinta, posición y patrón además de color, y enlazar a la vista de facetas.

### 8.3 Alternativa C: atlas 2D seleccionable

El usuario elige, por ejemplo, `propiedad/mercado` en X y `estatismo` en Y; después puede superponer perfiles doctrinales con cobertura suficiente. El encabezado debe decir: «Esta vista solo muestra estas dos facetas». Cambiar un selector no cambia el perfil, solo la proyección.

No debe calcularse una distancia «total» mirando el plano ni colocar partidos por defecto. Las líneas de proyección o tooltips pueden explicar que dos puntos cercanos aquí quizá difieran mucho en otras facetas. Es útil para explorar precisamente las combinaciones ancap–consejismo o ecología–nuclear, no para declarar una posición global.

## 9. Por qué no radar, PCA, UMAP o t-SNE como resultado principal

### 9.1 Radar/spider chart

Los radares son atractivos y smartvote demuestra que el público reconoce el formato. Sin embargo:

- la comparación depende de ángulos y forma, menos precisa que una escala común;
- el área parece una cantidad total aunque no tenga significado político;
- reordenar exactamente los mismos ejes cambia el polígono y puede invertir comparaciones. Está documentado tanto para indicadores sociales como para accesibilidad territorial ([Feldman, 2012](https://doi.org/10.1007/s11205-012-0028-6); [Takenaka et al., 2018](https://www.jstage.jst.go.jp/article/journalcpij/53/3/53_640/_article/-char/en));
- con muchos ejes y etiquetas largas se degrada especialmente en móvil;
- «sin datos» suele convertirse visualmente en cero y deforma la figura;
- una forma compacta favorece lecturas identitarias —«esta es mi silueta»— sin mostrar cobertura.

No debe usarse ni siquiera relleno como resultado canónico. Si se prototipa por demanda de usuarios, tendría que ser una vista decorativa sin área rellena, con orden fijo, no comparativa, descripción textual y advertencia; aun así, el mosaico cumple mejor esa función.

### 9.2 PCA

PCA crea componentes que maximizan la varianza del conjunto de datos concreto; son variables definidas por la muestra, no dimensiones políticas a priori ([Jolliffe y Cadima, 2016](https://doi.org/10.1098/rsta.2015.0202)). Esto sirve para investigación y para detectar redundancias, pero como mapa público presenta problemas:

- los componentes cambian al cambiar la muestra, el banco o el escalado;
- el signo y la orientación no tienen significado político natural;
- una dirección de máxima varianza no es necesariamente la faceta más importante o válida;
- una combinación de cargas puede ser difícil de nombrar sin racionalización posterior.

PCA puede auditar el banco o sugerir estructura, nunca sustituir la definición y validación de facetas ni producir un «PC1 = izquierda» por conveniencia.

### 9.3 t-SNE y UMAP

t-SNE y UMAP son métodos de reducción no lineal útiles para exploración. t-SNE puede alterar tamaños de clúster, distancias globales y formas; cambia con hiperparámetros y algunas ejecuciones, y hasta ruido aleatorio puede parecer agrupado ([Wattenberg, Viégas y Johnson, 2016](https://distill.pub/2016/misread-tsne/); [van der Maaten y Hinton, 2008](https://www.jmlr.org/papers/v9/vandermaaten08a.html)). UMAP construye una representación de vecindades/manifold y también carece de ejes políticos semánticos por sí mismos ([McInnes et al., 2018](https://joss.theoj.org/papers/10.21105/joss.00861)).

Ambos pueden ayudar internamente a buscar vecinos o patrones, siempre contrastados en el espacio original. No son adecuados para decir al usuario por qué está «cerca» de una doctrina: la geometría visible no se traduce de forma estable a preguntas, los ejes no tienen polos sustantivos y añadir nuevos datos puede mover el mapa.

## 10. Jerarquía visual concreta para el frontend

### 10.1 Orden de la página de resultados

La navegación recomendada es:

```text
Resultados
[ Tu perfil ] [ Referencias doctrinales ] [ Afinidad electoral ]

TU PERFIL, NO UNA ETIQUETA
Rasgos más definidos
• Ecología prioritaria     • Nuclear favorable
• Poder laboral alto      • Dirección estatal baja
18 de 25 facetas medidas · 4 tentativas · 3 sin medir

Economía, propiedad y provisión                 4/5 facetas
  Propiedad            colectiva ────●──── privada      5/6 · piloto
  Mercado              coordinación ──────●── mercado    4/5 · piloto
  Dirección estatal    autonomía ──●────── Estado        6/8 · mixto
  [Abrir explicaciones]

Democracia, Estado y libertades                 5/6 facetas
  …

¿Qué falta por medir?
  Defensa, libertad de conciencia… [Añadir módulo]
```

Los «rasgos más definidos» se seleccionan por magnitud **y** cobertura mínima, de distintos dominios; no se genera una frase identitaria. Si dos rasgos forman una combinación informativa —ecología alta + nuclear favorable; igualdad + antiestatismo— se muestran juntos como «combinación destacada».

En móvil:

- una sola columna;
- nombre y estado en la primera línea;
- barra en la segunda;
- polos en una tercera línea que pueda partirse;
- detalles con `<details>/<summary>` o botón accesible, nunca hover;
- ninguna tabla horizontal en la interfaz final.

### 10.2 Componentes sugeridos

| Componente | Responsabilidad | Datos mínimos |
|---|---|---|
| `NavegacionResultados` | Separar perfil, referencias y elección. | pestaña activa; no altera respuestas. |
| `ResumenPerfil` | Rasgos robustos, combinaciones y cobertura total. | facetas publicables, cobertura, estado. |
| `GrupoDominio` | Agrupar sin promediar; plegable. | nombre, descripción, facetas medidas/total. |
| `FilaFaceta` | Punto, polos, banda, cobertura y estados. | valor, intervalo opcional, n, estado, mezcla. |
| `DetalleFaceta` | Preguntas que contribuyen, signo, peso y sensibilidad. | respuestas, cargas, notas, términos. |
| `FacetasSinMedir` | Hacer visible lo que falta y abrir módulos. | facetas aplicables, motivo de ausencia, coste estimado en preguntas. |
| `ListaReferencias` | Comparaciones doctrinales sin ganador forzado. | coincidencias, diferencias, cobertura, fuentes, versión. |
| `ExploradorDosFacetas` | Mapa 2D explícitamente parcial. | dos selectores; puntos con cobertura; sin distancia global. |
| `AfinidadElectoral` | Ranking y detalle de partidos para una elección. | contexto, puntuación por ítems, cobertura, evidencia y fecha. |
| `TarjetaCompartir` | Exportación local de un resumen elegido. | solo facetas derivadas seleccionadas; texto alternativo. |

### 10.3 Adaptación del diseño actual

El componente actual `web/src/componentes/MapaEjes.tsx` ya usa barras divergentes, posición sobre una escala común, polos textuales y un estado explícito «sin datos». Es una base mucho mejor que reemplazarlo por un radar. Los cambios principales son jerarquía y evidencia:

- pasar de `principales`/`subEjes` a `dominio → faceta/posición`;
- añadir recuento y cobertura por fila;
- impedir que una sola respuesta aparezca con la misma seguridad que diez;
- separar posición de saliencia, sin dejar que «importante» desplace el mapa personal;
- distinguir centro, mezcla, tentativo y no medido;
- abrir la ruta de preguntas que explica el valor;
- reservar una banda para incertidumbre futura, sin inventarla ahora.

La fórmula de `src/engine/ideologia.ts` normaliza solo sobre ítems respondidos. Por eso una única respuesta puede producir `±100`; visualmente hoy parece tan concluyente como una escala extensa. Este es el primer problema metodológico que debería resolver el frontend.

El banco actual contiene 25 ejes y 334 ítems. La cobertura varía mucho: `economico` tiene decenas de indicadores, mientras autonomía sindical, implicación internacional y libertad de conciencia tienen tres. El booleano `subEje` no expresa esa diferencia. Harían falta metadatos como:

```text
dominio
tipo: escala | posicion-especifica
estadoMedicion: conceptual | piloto | validada
minimoRespondidos
versionEscala
```

No se propone añadirlos en esta investigación; son requisitos para una implementación posterior.

### 10.4 Lenguaje visual

La dirección editorial existente —papel, tinta, carmín, serif para títulos y filetes finos— encaja bien con un «cuaderno de facetas». Recomendaciones:

- tinta o carmín para el marcador personal, gris/patrón para cobertura o intervalo;
- no usar colores de partidos en `Tu perfil` ni en referencias doctrinales;
- reservar color de partido para `Afinidad electoral` y acompañarlo siempre de nombre/siglas;
- polos con peso tipográfico equivalente, sin presentar uno como éxito;
- números tabulares en detalles; en la portada del perfil priorizar palabras y posición;
- espacio en blanco entre dominios, no tarjetas de dashboard saturadas;
- sin animaciones de «revelación» que conviertan una posición sensible en premio; respetar `prefers-reduced-motion`.

## 11. Compartir sin filtrar las respuestas

Las opiniones políticas son categoría especial en el artículo 9 RGPD ([EUR-Lex](https://eur-lex.europa.eu/legal-content/EN-DE-ES/ALL/?from=EN&uri=CELEX%3A32016R0679)) y la legislación española añade cautelas específicas sobre tratamiento destinado a identificar ideología ([LO 3/2018 consolidada](https://www.boe.es/buscar/pdf/2018/BOE-A-2018-16673-consolidado.pdf?no_link=1)). El Tribunal Constitucional también protege el derecho al silencio sobre la propia posición política ([STC 76/2019](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2019-9548&lang=es)). Que compartir sea voluntario no justifica exponer más de lo necesario.

Diseño recomendado:

1. Generar en el navegador un SVG/PNG 4:5 o cuadrado con las facetas que el usuario marque.
2. No incluir respuestas literales, partido votado, localidad, identificador, timestamp fino ni referencia doctrinal por defecto.
3. Incluir cobertura y versión: «12 facetas mostradas · perfil v1.2».
4. Ofrecer toggles explícitos: nombres de referencias doctrinales **apagados por defecto**; afinidad electoral en otra tarjeta.
5. Compartir un fichero mediante Web Share API o descargarlo; **no serializar respuestas en query params, fragmentos, QR o URL de resultados**.
6. El enlace opcional debe apuntar a la portada/metodología, no reconstruir el resultado.
7. No cargar SDK de redes sociales ni píxeles. Un precedente público mostró que una URL única de resultados podía llegar a Facebook por la cabecera `Referer` incluso sin completar la acción de compartir ([investigación del Privacy Commissioner of Canada sobre MyDemocracy](https://www.priv.gc.ca/en/opc-actions-and-decisions/investigations/investigations-into-federal-institutions/2016-17/pa_20170719_pco/)).
8. Generar junto a la imagen un botón «Copiar descripción»: «Perfil con ecología alta, nuclear favorable…; 12 facetas mostradas, 3 sin medir».

La tarjeta compartible puede usar el mosaico de la alternativa B, pero la aplicación debe conservar el cuaderno de facetas como fuente canónica. La postal es una selección hecha por el usuario, no el expediente completo.

## 12. Accesibilidad y legibilidad

WCAG 2.2 y la guía WAI para imágenes complejas exigen que un gráfico tenga una alternativa breve y una descripción larga equivalente; la propia WAI recomienda reducir complejidad y combinar gráfico, texto o tabla cuando proceda ([WAI: imágenes complejas](https://www.w3.org/WAI/tutorials/images/complex/), [novedades WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)). Para Espectro:

- el SVG puede ser decorativo si todos los valores, polos y estados ya están en HTML;
- cada faceta debe ser navegable como texto, en el mismo orden visual;
- posición, patrón y palabras deben duplicar cualquier codificación por color;
- contraste mínimo de 3:1 para elementos gráficos informativos y los criterios correspondientes para texto;
- objetivo táctil interno de 44×44 px, aunque WCAG 2.2 AA establezca un mínimo menor en ciertos casos;
- foco visible, teclado completo y ningún detalle solo en tooltip/hover;
- zoom al 200–400 % sin scroll horizontal en la página de resultados;
- «sin datos», «tentativo» y «mixto» escritos, no solo iconos;
- nombres de polos completos accesibles aunque visualmente se abrevien;
- modo de alto contraste, oscuro y movimiento reducido;
- resumen textual del perfil antes del gráfico, útil también para accesibilidad cognitiva.

La lista lineal de facetas es estructuralmente más accesible que un radar o un mapa de puntos. En móvil, la investigación de VAAs de 2026 favorece información adicional desplegable y sencilla frente a interacciones más complejas ([Liebrecht et al., 2026](https://journals.sagepub.com/doi/abs/10.1177/00936502261425713)).

## 13. Separar mapa personal y afinidad electoral

Esta separación debe ser conceptual, algorítmica y visual:

| Tu perfil | Afinidad electoral |
|---|---|
| Usa todas las respuestas y módulos aplicables. | Usa ítems compartidos con candidaturas elegibles. |
| No depende de CCAA, convocatoria o quién se presenta. | Depende de elección, territorio, coaliciones y fecha. |
| Muestra facetas, posiciones específicas y referencias doctrinales. | Muestra ranking, cobertura, confianza de codificación y fuentes. |
| No usa logos ni colores partidistas. | Identidad de partidos visible y fechada. |
| Puede cambiar al profundizar o revisar respuestas. | Puede cambiar además cuando cambia el programa o la candidatura. |
| No es recomendación ni identidad. | Tampoco es recomendación de voto; es congruencia programática parcial. |

El matching actual por distancia Manhattan a nivel de ítem es adecuado para mantener esta independencia. No debe reemplazarse por distancia entre puntos de un mapa. EU&I es un precedente claro: sus dimensiones son ilustrativas y no alteran el porcentaje de partido ([EU&I 2024](https://www.euandi.eu/en/data-research/methodology.html)).

En la interfaz, `Tu perfil` debe ser la pestaña por defecto. La elección y la CCAA se solicitan o editan al entrar en `Afinidad electoral`, no antes de que la persona pueda entenderse sin partido.

## 14. Secuencia de implementación recomendada

### Fase 1 — honradez visual con el motor actual

1. Mantener las barras divergentes existentes.
2. Añadir dominio, `n`, cobertura y estados «tentativo/sin medir».
3. Separar las tres vistas de resultados.
4. Añadir detalles pregunta → faceta con cargas y pesos.
5. Mostrar facetas pendientes y acceso a módulos.

No requiere fingir intervalos ni cambiar todavía el algoritmo de matching.

### Fase 2 — referencias y compartir

1. Crear esquema y proceso editorial de perfiles doctrinales.
2. Reutilizar distancia por ítem y agrupar explicación por faceta.
3. Añadir umbral de cobertura, rasgos definitorios y diferencias decisivas.
4. Implementar tarjeta local seleccionable sin URL de resultados.
5. Probar lenguaje de no identidad/no recomendación con usuarios.

### Fase 3 — calibración

1. Piloto con consentimiento separado y datos realmente anonimizados/agregados conforme a `docs/PRIVACIDAD.md`.
2. Validación dinámica, Mokken o IRT ordinal por faceta; dividir las que no sean unidimensionales.
3. Comprobar funcionamiento diferencial por idioma, territorio, edad y nivel educativo antes de comparar puntuaciones.
4. Añadir bandas de medición solo a escalas calibradas.
5. Publicar versiones, cambios de ítems y validación.

### Fase 4 — atlas exploratorio

1. Selector libre de dos facetas.
2. Proyección de referencias solo con cobertura suficiente.
3. Test de comprensión en móvil y lectores de pantalla.
4. Nunca usarlo para calcular partido más cercano o referencia doctrinal principal.

## 15. Pruebas que deberían decidir el diseño final

Antes de generalizar, comparar prototipos A/B con tareas concretas, no solo «¿te gusta?»:

- localizar el polo y cobertura de una faceta;
- distinguir `0 por moderación` de `0 por mezcla`;
- identificar una faceta sin medir;
- explicar qué dos preguntas movieron un resultado;
- entender por qué dos referencias tienen similitud parecida pero diferencias distintas;
- reconocer que una referencia doctrinal no es un partido ni una recomendación;
- reconocer que el atlas 2D omite otras facetas;
- exportar una tarjeta sin compartir respuestas;
- completar las mismas tareas a 320 px, con teclado, lector de pantalla y alto contraste.

Métricas: exactitud, tiempo, confianza calibrada —no confianza subjetiva sola—, recuerdo, tasa de interpretación identitaria, comprensión de cobertura y errores de privacidad. Estratificar por alfabetización gráfica y conocimiento político: el estudio de 2025 sobre mapas de VAA halló que una visualización más novedosa exigía mayor alfabetización y podía reducir conocimiento ([Verboom et al.](https://research.tilburguniversity.edu/en/publications/visualizing-opinion-space-in-voting-advice-applications-a-user-st/)).

## 16. Decisiones finales

### Adoptar

- Perfil por facetas en escalas horizontales comunes.
- Dominios no puntuados para navegación.
- Posición y saliencia separadas; la importancia declarada pondera la afinidad electoral, no desplaza el perfil ideológico.
- Centro, mezcla, poca cobertura y no medido como estados diferentes.
- Cobertura visible desde el primer nivel.
- Incertidumbre estadística solo tras calibración.
- Explicación reversible por pregunta, faceta y comparación.
- Referencias doctrinales versionadas, múltiples y opcionales.
- Perfil personal separado de afinidad electoral.
- Atlas 2D solo seleccionable y secundario.
- Exportación local de resultados derivados elegidos por el usuario.

### Evitar

- Un punto o cuadrante como ideología total.
- Promedio por dominio o porcentaje ideológico global.
- Mezclar la dirección de una posición con la importancia personal que se le concede.
- Radar relleno, incluso si produce una silueta atractiva.
- PCA, UMAP o t-SNE como mapa público estable.
- «Eres X», «tu verdadera ideología» o un único arquetipo ganador.
- Convertir ausencia de datos en centro.
- Mostrar `±100` con una sola respuesta sin advertencia.
- Mezclar logos/colores de partido con el perfil personal.
- Serializar respuestas o etiquetas políticas en un enlace compartible.

La idea rectora puede expresarse así: **Espectro no debe encontrar la casilla del usuario; debe mostrar la estructura, los matices y los límites de lo que sus respuestas permiten afirmar.**

## Fuentes principales

### Medición política y VAAs

- [Mongrain y Walgrave (2026), estructura ideológica en seis millones de usos de VAAs](https://www.cambridge.org/core/journals/european-journal-of-political-research/article/onedimensional-multidimensional-or-nondimensional-ideological-structure-in-mass-and-elite-opinion/78C953E1B5CC289B183AC549621DB14D).
- [Lachance y Treger (2026), identidad ideológica como atajo de grupo](https://academic.oup.com/poq/article/90/3/730/8554342).
- [Caughey, O'Grady y Warshaw (2019), ideología de políticas públicas en Europa](https://www.cambridge.org/core/journals/american-political-science-review/article/policy-ideology-in-european-mass-publics-19812016/EC5CCE297E0EE5CC108EB87C4240E4A9).
- [Laméris, Jong-A-Pin y Garretsen (2018), medición multidimensional de ideología del votante](https://www.sciencedirect.com/science/article/pii/S017626801730277X).
- [Germann y Méndez (2016), validación dinámica de escalas VAA](https://michagermann.github.io/publication/germannmendez2016/).
- [Walgrave, Nuytemans y Pepermans (2009), efecto de selección de afirmaciones](https://medialibrary.uantwerpen.be/oldcontent/container2608/files/Walgrave%20et%20al%202009%20-%20voting%20aid%20applications.pdf).
- [Louwerse y Rosema (2014), efecto del modelo de matching](https://www.tomlouwerse.nl/publications/2014-louwerse-rosema-actapolitica/).
- [Otjes y Louwerse (2014), límites de mapas 2D uniformes](https://www.tomlouwerse.nl/publications/2014-otjes-louwerse-es/).
- [Stockinger et al. (2024), confianza y transparencia de VAAs europeas](https://link.springer.com/article/10.1007/s10676-024-09790-6).
- [Declaración/metodología pública de EU&I 2024](https://www.euandi.eu/en/data-research/methodology.html).
- [Metodología pública de Vote Compass](https://www.voxpoplabs.com/votecompass/methodology.pdf).
- [FAQ y método de Wahl-O-Mat 2025](https://www.bpb.de/themen/wahl-o-mat/bundestagswahl-2025/558464/haeufig-gestellte-fragen-zum-wahl-o-mat/).
- [Metodología de smartvote Austria: ponderación y perfiles temáticos](https://austria.smartvote.org/de/wiki/aut-methoden).

### Datos comparados y España

- [CHES Europe 1999–2024](https://www.chesdata.eu/ches-europe).
- [Manifesto Project: manuales de codificación](https://manifesto-project.wzb.eu/information/documents/handbooks) y [tutorial RILE](https://manifesto-project.wzb.eu/down/tutorials/main-dataset.html).
- [Metodología V-Dem](https://v-dem.net/about/v-dem-project/methodology/).
- [Serie de autoubicación ideológica del CIS](https://www.cis.es/es/series/escala-de-autoubicacion-ideologica-1-10-poblacion-residente-vii-).
- [Decidir23J, UOC/UPF, 2023](https://www.uoc.edu/en/news/2023/178-uoc-and-upf-researchers-launch-decidir23).
- [Brújula Electoral UC3M/Kieskompas, 2015](https://www.uc3m.es/ss/Satellite/UC3MInstitucional/es/Detalle/Comunicacion_C/1371216216251/1371216001705/Una_aplicacion_online_permite_a_los_ciudadanos_conocer_el_partido_politico_mas_cercano_a_su).

### Visualización, accesibilidad y privacidad

- [Cleveland y McGill (1986), percepción gráfica](https://www.sciencedirect.com/science/article/pii/S0020737386800190).
- [Bruinsma (2020), visualizaciones en VAAs](https://ideas.repec.org/a/bpj/statpp/v11y2020i1p1-21n1.html).
- [Verboom et al. (2025), estudio de usuario de espacios de opinión](https://research.tilburguniversity.edu/en/publications/visualizing-opinion-space-in-voting-advice-applications-a-user-st/).
- [Liebrecht, Kamoen y Van Lieshout (2026), VAAs enriquecidas en escritorio y móvil](https://journals.sagepub.com/doi/abs/10.1177/00936502261425713).
- [Feldman (2012), problemas del radar relleno](https://doi.org/10.1007/s11205-012-0028-6).
- [Jolliffe y Cadima (2016), revisión de PCA](https://doi.org/10.1098/rsta.2015.0202).
- [Wattenberg, Viégas y Johnson (2016), interpretación de t-SNE](https://distill.pub/2016/misread-tsne/).
- [WAI/W3C: imágenes complejas](https://www.w3.org/WAI/tutorials/images/complex/) y [WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/).
- [RGPD, artículo 9](https://eur-lex.europa.eu/legal-content/EN-DE-ES/ALL/?from=EN&uri=CELEX%3A32016R0679), [LO 3/2018](https://www.boe.es/buscar/pdf/2018/BOE-A-2018-16673-consolidado.pdf?no_link=1) y [STC 76/2019](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2019-9548&lang=es).
