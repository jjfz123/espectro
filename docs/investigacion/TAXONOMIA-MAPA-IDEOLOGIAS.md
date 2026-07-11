# Taxonomía maestra para el mapa de ideologías

| Campo | Valor |
|---|---|
| Documento | `taxonomia-mapa-ideologias` |
| Versión | **1.2.0** |
| Fecha de corte | **11 de julio de 2026** |
| Imagen auditada | [Imagen exacta aportada como referencia](https://preview.redd.it/where-do-you-fall-on-this-very-detailed-political-compass-v0-9bw9g7zxfns91.jpg?auto=webp&s=ca1d9e02f5d9124aed36dd80723b88d9b2171136) |
| Copia auditada | JPEG 678×680; SHA-256 `5a10ac569b54cf9718e63a01bdaacd35b1bf1c6528e43e7ab33cd4173f79e35b` |
| Ámbito | Índice doctrinal para Espectro; España como prioridad y referencias internacionales como contexto |
| Naturaleza | Investigación y backlog editorial. Este documento **no** autoriza por sí solo posiciones, preguntas ni publicación en el mapa. |

## 0. Dictamen ejecutivo

La imagen cumple dos funciones distintas que no deben confundirse. Es una **norma visual dura** para la gramática espacial del primer atlas —orden relativo, vecindades, continuidad, densidad y ritmo entre cuadrantes— y, a la vez, un inventario cultural que debe depurarse. No es una ontología política ni una fuente factual válida para definir doctrinas, atribuir posiciones o redactar preguntas. Mezcla en el mismo nivel:

- familias ideológicas estables (`liberalism`, `conservatism`, `social democracy`);
- ramas doctrinales reales (`council communism`, `anarcho-syndicalism`, `minarchism`);
- regímenes, dirigentes o periodos (`Pinochetism`, `Mugabeism`, `Gorbachevism`, `Vichy Fascism`);
- formas de gobierno o patologías institucionales (`elective monarchism`, `kleptocracy`, `corporatocracy`);
- actitudes transversales (`anti-communism`, `statism`, `populism`, `progressivism`);
- cruces discutibles o internéticos (`anarcho-monarchism`, `CapCom`);
- ficción y memes nacidos de *1984* o de comunidades de “polcompball” (`Ingsocism`, `Death Worship`, `Soulism`, `Avaritionism`).

Por ello, Espectro debe usar una jerarquía **familia → tradición → rama → variante histórica**, mantener por separado los **rasgos transversales** y reservar una categoría distinta para **arquetipos de riesgo no electorales**. El perfil por facetas sigue siendo el resultado principal; el plano 2D o cubo es solo un explorador secundario. Una doctrina sin evidencia suficiente en dos macroejes no recibe un punto inventado.

El corte actual reúne **46 referencias doctrinales** y un atlas de **175 corrientes visibles**: 28 A en la capa principal y 147 B en profundidad. Cuarenta y cinco tienen referencia instrumentada; las otras 130 son fichas informativas o de investigación con, como mínimo, tres preguntas discriminantes vigentes, pero no calculan afinidad doctrinal hasta completar fuentes y posiciones. Las **178 etiquetas exactas** de la imagen quedan resueltas nominalmente: 155 tienen ficha visible y 23 se excluyen una a una con justificación; otras 20 adaptaciones españolas o históricas completan el atlas. La expansión incorpora sistemas, movimientos y contextos reales que la primera criba C/D/E había mantenido fuera, además de tres fases separadas del fascismo italiano. La geometría ya no deja que Falangismo domine el cuadrante: su región baja al 0,32 % mediante vecinos históricos serios, no semillas ficticias.

## 1. Contrato taxonómico y editorial

### 1.1 Notación de ejes

La columna `2D / incertidumbre` usa estas abreviaturas:

- `E−`: propiedad social, redistribución o planificación; `E+`: mercado y propiedad privada; `E?`: sin programa económico definitorio.
- `A+`: concentración de poder, jerarquía o antipluralismo; `A−`: dispersión del poder, pluralismo o antiestatismo; `A?`: evidencia insuficiente o internamente variable.
- `T`, `R`, `V`, `G`, etc. remiten a facetas independientes —territorio, religión, violencia, geopolítica— que **no deben comprimirse** en el plano.
- `No mapear` significa que proyectar la referencia produciría una coordenada engañosa. No significa que la corriente sea irrelevante.

Los cuadrantes y las posiciones relativas de la imagen forman el prior geométrico del atlas. Se heredan como contrato de composición, no como verdad doctrinal: toda definición, pertenencia familiar, discriminante y adaptación española exige evidencia independiente.

### 1.2 Estados

| Estado | Significado |
|---|---|
| `implementada` | Existe una referencia versionada en `data/referencias` con posiciones y reglas de publicación. |
| `parcial` | El banco ya contiene discriminantes útiles, pero falta referencia, cobertura, contraindicadores o revisión de fuentes. |
| `pendiente-P1` | Alta utilidad para España o gran capacidad discriminante; siguiente fase recomendada. |
| `pendiente-P2` | Útil como profundidad histórica/internacional, después de cerrar P1. |
| `transversal` | Rasgo, estilo, postura o forma institucional; debe mostrarse como faceta, no como identidad integral. |
| `histórica-contextual` | Régimen, dirigente o periodo; solo debe publicarse con fechas y alcance expresos. |
| `riesgo-no-electoral` | Arquetipo sensible para explicar antipluralismo/violencia; nunca candidatura, recomendación ni insignia lúdica. |
| `excluida-meme` | Ficción, broma, etiqueta de foro o contradicción sin tradición documentable. Puede conservarse en este inventario, no en resultados. |
| `excluida-ambigua` | Nombre no normalizado o imposible de interpretar sin elegir arbitrariamente una doctrina. |

### 1.2 bis. Decisión A–F para cada etiqueta de la imagen

El inventario final asigna una decisión editorial explícita:

- **A — cartografiable y relevante para España:** puede merecer referencia visible si supera fuentes, cobertura e incertidumbre. “Cartografiable” no garantiza un punto 2D: puede ser una tarjeta doctrinal con facetas.
- **B — referencia doctrinal solo en modo exhaustivo:** corriente real pero nicho, redundante o de baja relevancia española.
- **C — posición/faceta transversal:** proposición seria, modelo institucional o rasgo que cruza ideologías; puede recibir ficha y región pedagógica en profundidad si declara que no es identidad integral.
- **D — movimiento, estrategia o coalición:** entidad política real, táctica o etiqueta de movilización sin doctrina integral estable; puede ser visible como contexto, nunca como partido implícito.
- **E — histórica/extranjera contextual:** régimen, dirigente, tradición nacional o periodo útil para aprender; entra en profundidad con país, periodo y cautela, no como recomendación española.
- **F — meme, ficción, contradicción o exclusión editorial:** se conserva únicamente para demostrar que fue revisada.

Esta clasificación prima sobre el deseo de “llenar casillas”. La imagen **sí fija la gramática geométrica de partida** del primer atlas —topología, densidad, continuidad y posiciones relativas—, pero no obliga a conservar etiquetas ficticias, ambiguas o no integrales ni decide qué afirma una doctrina.

### 1.3 Contrato visual duro y límite factual

El contrato se aplica a la capa editorial del atlas, no a los puntos calculados de personas, partidos o referencias:

1. el plano conserva `propiedad-mercado` de izquierda a derecha y `autoridad-politica` de abajo arriba;
2. se preservan el orden relativo de las corrientes, sus vecindades de familia, la continuidad de las transiciones y una densidad comparable entre cuadrantes; no basta con colocar cuatro etiquetas canónicas en las esquinas;
3. `coordenadasPrior` registra la lectura normalizada e inmutable de la imagen; `coordenadas` puede adaptarse a España, pero una distancia superior a 25 puntos exige `desviacionJustificada` y una superior a 60 requiere doble revisión editorial;
4. retirar memes, ficción o rasgos transversales no autoriza a colapsar el mosaico: el hueco se deja visible o se cubre con una corriente seria vecina solo cuando su definición y posición tienen fuentes independientes;
5. las corrientes A forman la capa principal y las B mantienen la profundidad; rótulos C/D/E de la criba original pueden normalizarse como B si describen algo real y la ficha declara sus límites, mientras memes, ficción y nombres sin referente no se convierten en territorio;
6. no se copian el activo, sus colores, iconos, texto, chistes ni contornos exactos. Se implementa una composición propia, degradada, accesible y en español;
7. la cercanía geométrica comunica **proximidad proyectada, no identidad**. Las diferencias decisivas que el 2D omite deben aparecer en la ficha y en las facetas.

La imagen no puede citarse para sostener que una corriente es autoritaria, socialista, religiosa o española. Esas afirmaciones proceden de fuentes primarias y académicas; el prior visual solo responde a «dónde y con qué densidad se organiza el atlas».

### 1.4 Regla mínima para crear una referencia

Una nueva ficha no debe publicarse por cumplir el mínimo técnico del esquema. Requisitos editoriales recomendados:

1. definición, variante, periodo y ámbito geográfico explícitos;
2. al menos **8–12 posiciones definitorias** cuando el banco lo permita, repartidas entre varias facetas;
3. uno o más contraindicadores —qué respuesta separa esa rama de su vecina—;
4. fuentes primarias y al menos una fuente académica independiente; una página militante nunca basta por sí sola;
5. valores desconocidos en blanco: no deducir aborto, nuclear, inmigración o geopolítica de una etiqueta económica;
6. revisión temporal para movimientos que cambian por fases;
7. para referencias `antipluralista` o `violenta`, umbral alto, advertencia visible, ausencia de símbolos propagandísticos y texto “coincidencias parciales”, nunca “eres X”.
8. explicación editorial en español; cuando la fuente enlazada no esté disponible en español, el título conserva la obra original o una traducción descriptiva y declara «en inglés», «en francés», «en italiano» u otro idioma real.

## 2. Fases recomendadas

### P1 — cerrar la taxonomía útil en España

| Prioridad | Referencia o cambio | Por qué discrimina | Ítems disponibles / carencia principal |
|---:|---|---|---|
| 1 | **Hecho:** leninismo bolchevique y marxismo-leninismo soviético, fase estaliniana | Ya evita que toda respuesta comunista termine en trotskismo, hoxhaísmo o MLM; los dos periodos se publican separados. | 15 y 14 posiciones documentadas, respectivamente; mantener revisión historiográfica. |
| 2 | **Hecho:** luxemburgismo (24 posiciones) | Separa huelga de masas, democracia obrera e internacionalismo del partido-vanguardia. | Es la única referencia que supera en este corte el contrato estricto de Propiedad × Poder; no se extrapolan derechos actuales ausentes de sus textos. |
| 3 | **Hecho:** socialismo democrático pluralista y ecosocialismo (15 y 20 posiciones) | Cubre una zona real entre socialdemocracia y ruptura revolucionaria. | El ecosocialismo queda fuera del mapa macro por falta de arquitectura general del poder. |
| 4 | **Hecho:** falangismo de FE de las JONS, 1934 (19 posiciones) | Distingue sindicato vertical, corporativismo mixto, partido único, nacionalización y revolución nacional. | Conserva ancla editorial en el atlas; su punto calculado no se publica hasta cubrir seis ítems y tres subdimensiones/familias. No se mezcla con FET-JONS o franquismo. |
| 5 | **Hecho:** franquismo nacionalcatólico, 1945-1957 (15 posiciones) | Evita confundir la dictadura de posguerra con Falange, carlismo o derecha radical electoral. | Matching histórico sensible; fuera del mapa macro por falta de economía equilibrada. |
| 6 | **Hecho:** derecha radical populista/nativista (12 posiciones) | Cubre el núcleo nativismo–autoritarismo sin identificarlo automáticamente con fascismo. | Referencia implementada, pero sin coordenada económica inventada; separar populismo mediante `pop-*`. |
| 7 | **Hecho:** anarquismo colectivista (31 posiciones) | Rama histórica central en España; ya no queda absorbida por anarcocomunismo/mutualismo. | Sigue faltando `N1` para aislar remuneración por trabajo frente a distribución por necesidad. |
| 8 | **Hecho:** plataformismo anarcocomunista (30 posiciones) | Distingue organización anarquista coordinada de espontaneísmo y de vanguardia leninista. | Sigue faltando `N2` para medir directamente unidad teórica/táctica y responsabilidad colectiva. |
| 9 | **Hecho:** comunalismo bookchiniano (11 posiciones) | Da sentido a democracia municipal, confederación y poder popular sin Estado central. | Matching sin mapa económico; Öcalan/confederalismo democrático queda como investigación distinta. |
| 10 | **Hecho:** anarcopacifismo tolstoyano (33 posiciones) | Separa antiestatismo no violento de insurreccionalismo. | Fuerte en guerra, desarme y método; fuera del mapa por economía variable. |
| 11 | **Hecho:** abolicionismo de la explotación animal (10 posiciones) | Corriente ética diferenciada del ecologismo de conservación y del bienestarismo. | Matching de la faceta animalista; sin economía o modelo de poder inventados. |
| 12 | **Hecho:** republicanismo federal pimargalliano (6 posiciones) | Conecta república, federalismo pactista y poder municipal sin inferir economía. | Matching institucional/territorial; fuera del mapa macro. El republicanismo unitario no superó el umbral documental. |
| 13 | Izquierda nacional-popular/social-patriótica | Captura la combinación “clase + símbolos españoles” sin usar `rojipardo` como autodefinición neutral. | `izq-014`, `izq-025`, `izq-026`; nombrar siempre la atribución y no inferir autoritarismo. |
| 14 | **Hecho:** socialismo de mercado autogestionario de Schweickart (17 posiciones) | Separa cooperativas competitivas de ministerios, nacionalización y capitalismo privado. | Matching económico; fuera del mapa político general. `N3` mejoraría la separación directa. |

### P2 — profundidad internacional e histórica

| Grupo | Alcance recomendado | Condición antes de implementarlo |
|---|---|---|
| Georgismo/geolibertarismo | Referencia económica real y muy discriminante. | Añadir `N4`, impuesto al valor no mejorado del suelo. |
| Agorismo y libertarismo de mercado de izquierda | Estrategia de contraeconomía; no sinónimo de anarcocapitalismo. | Añadir `N5`, y documentar Samuel Edward Konkin III. |
| Anarcoprimitivismo | Crítica a civilización industrial y división tecnológica del trabajo. | Añadir `N6`; `ene-010` y `va-016` no bastan. |
| Titoísmo/autogestión yugoslava | Variante histórica con empresa social, federalismo y partido-Estado. | Periodizar; no convertir todo socialismo de mercado en titoísmo. |
| Juche, denguismo, castrismo, pensamiento Ho Chi Minh | Tradiciones/Estados concretos, útiles en anexo internacional. | Fuentes por periodo y país; no heredar posiciones contemporáneas sin evidencia. |
| Baazismo/socialismo árabe, Pancasila y kuomintangismo | Familias nacional-desarrollistas no reducibles a “izquierda autoritaria”. | Banco nuevo sobre pan-nacionalismo, secularismo, desarrollismo y corporativismo. |
| Cuarta Teoría Política, nacionalbolchevismo, strasserismo | Sincretismos anti-liberales; la imagen los coloca de forma demasiado simple. | Investigación especializada y advertencia; evitar normalización lúdica. |
| Neorreacción/Dark Enlightenment | Crítica antidemocrática y elitista con variantes tecnológicas/monárquicas. | Cobertura nueva; no asumir una política económica única. |
| Fases del fascismo italiano | San Sepolcro, pre-Marcha, régimen y RSI/Salò como perfiles distintos. | Periodización y fuentes primarias por fase; nunca un vector fascista atemporal. |
| Nacionalismos internacionales | Zionismo, nacionalismo negro, panarabismo, panturquismo, hindutva, etc. | Solo con módulos y contexto del territorio correspondiente. |

### Ítems nuevos citados

| Clave | Redacción de investigación; requiere revisión cognitiva y de sesgo |
|---|---|
| `N1` | «En una economía poscapitalista, cada persona debería recibir en función del trabajo aportado, no principalmente según sus necesidades.» |
| `N2` | «Una organización anarquista específica necesita unidad teórica y táctica y responsabilidad colectiva, aunque sus grupos conserven autonomía de acción.» |
| `N3` | «La mayor parte de las empresas deberían ser cooperativas de trabajadores que intercambian en mercados, sin que un ministerio fije toda la producción y los precios.» |
| `N4` | «La recaudación pública debería proceder principalmente del valor del suelo sin contar las mejoras realizadas, reduciendo los impuestos al trabajo y al capital.» |
| `N5` | «Crear redes de intercambio y producción al margen de la regulación estatal debería ser la estrategia principal para reemplazar gradualmente al Estado.» |
| `N6` | «La civilización industrial y su división tecnológica del trabajo deberían desmantelarse, no limitarse a funcionar con energía limpia.» |
| `N7` | «La propiedad privada de una empresa solo debería mantenerse mientras cumpla objetivos nacionales fijados por el Estado.» |

`N1–N7` son propuestas de banco, no ítems aprobados. Deben pasar revisión de claridad, deseabilidad social, doble negación, traducción doctrinal y entrevistas cognitivas.

## 3. Índice maestro serio

Para mantener legibles las tablas, la columna de fuentes usa estas claves. Son **puntos de partida que deben leerse**, no sellos automáticos de validez:

- `GEN`: Michael Freeden, Marc Stears y Lyman Tower Sargent (eds.), [*The Oxford Handbook of Political Ideologies*](https://academic.oup.com/edited-volume/34324); Andrew Heywood, *Political Ideologies*.
- `COM`: Stephen A. Smith (ed.), [*The Oxford Handbook of the History of Communism*](https://academic.oup.com/edited-volume/35402), más los textos primarios de cada corriente.
- `ANAR`: Carl Levy y Matthew S. Adams (eds.), [*The Palgrave Handbook of Anarchism*](https://link.springer.com/book/10.1007/978-3-031-98030-5), más Proudhon, Bakunin, Kropotkin y Malatesta.
- `FASC`: Roger Griffin, *The Nature of Fascism*; Robert Paxton, *The Anatomy of Fascism*; Emilio Gentile, *Fascismo: historia e interpretación*.
- `RAD`: Cas Mudde, *Populist Radical Right Parties in Europe*, cuya separación de nativismo, autoritarismo y populismo debe guiar la codificación ([síntesis de Cambridge](https://www.cambridge.org/core/books/abs/populist-radical-right-parties-in-europe/populist-radical-right-democracy/8FD7C41B3BDC2BA410C6A0AFD25894F9)).
- `ESP-FAL`: programa de veintisiete puntos de Falange, *Fuero del Trabajo* y Ferran Gallego/Joan Maria Thomàs; contraste con [«Falangismo, nacionalsocialismo y el mito de Hitler en España»](https://www.cepc.gob.es/publicaciones/revistas/revista-de-estudios-politicos/numero-169-julioseptiembre-2015/falangismo-nacionalsocialismo-y-el-mito-de-hitler-en-espana-1931-1945-1).
- `ESP-CAR`: Vázquez de Mella y documentos de las organizaciones actuales; Juan Carlos Senent, [*Antifranquistas de boina roja*](https://www.cepc.gob.es/publicaciones/monografias/antifranquistas-de-boina-roja-el-cambio-ideologico-en-el-carlismo-1968-1986).
- `LIB`: Locke, J. S. Mill, Hayek, Friedman y la literatura de liberalismo en `GEN`; para libertarismos, Nozick, Rothbard, Konkin y Henry George según la rama.
- `GREEN`: Andrew Dobson, *Green Political Thought*; Bookchin; *An Ecomodernist Manifesto*; Singer y Regan para liberación animal.
- `POP`: Cas Mudde y Cristóbal Rovira Kaltwasser, *Populism: A Very Short Introduction*; el populismo se trata como ideología delgada/estilo, no como programa económico completo.
- `ACC`: [Ministerio del Interior, primera célula aceleracionista detectada en España](https://www.interior.gob.es/opencms/es/detalle/articulo/La-Policia-Nacional-desarticula-la-primera-celula-terrorista-de-caracter-aceleracionista-detectada-en-Espana/), listados oficiales de organizaciones proscritas y literatura de terrorismo. No se consultan ni enlazan manuales propagandísticos.
- `PAÍS`: fuente primaria de la organización/constitución y monografía académica específica del país y periodo; nunca una wiki de memes.

### 3.1 Socialismos, marxismos y comunismos

| Corriente/familia y etiquetas de la imagen | 2D / incertidumbre | Definición breve y relevancia | Preguntas discriminantes | Fuentes | Estado | Sensibilidad y cautela |
|---|---|---|---|---|---|---|
| **Socialdemocracia clásica** (`Social Democracy`) | E− moderada, A variable | Reforma democrática, negociación colectiva, Estado social y economía mixta. Muy relevante en España. | `eco-001`, `lab-001`, `dem-012` | `GEN`; Bernstein; programas históricos PSOE/PSOE actual por separado | `implementada` | No confundir tipo doctrinal con conducta de un partido gobernante. |
| **Socialismo democrático pluralista** (`Democratic Socialism`) | E−, A−/plural | Socialización o control democrático más profundo que la socialdemocracia sin partido único. La referencia implementada delimita una variante pluralista; no agota toda la familia. | rechazo `izq-001`; `dem-012`, `sd-012` | `GEN`; Labour/PES; autores y organizaciones españolas | `implementada` | Separar objetivo poscapitalista de simple Estado de bienestar y no extender una variante a toda la etiqueta. |
| **Socialismo liberal y libertario** (`Liberal Socialism`, `Social Libertarianism`, `Libertarian Socialism`) | E−, A−; amplitud alta | Tradiciones que combinan igualdad material con libertades y poder distribuido. “Libertarian socialism” es familia, no punto único. | `dem-010`, `izq-003`, `lab-008` | `GEN`, `ANAR`; Carlo Rosselli para socialismo liberal | `parcial` | No fusionar automáticamente con anarquismo ni con liberalismo social. |
| **Socialismo de mercado/autogestión** (`Market Socialism`, `Libertarian Market Socialism`) | E−/mixta, A variable | Propiedad social/cooperativa con intercambios de mercado; la referencia implementada se limita a la Democracia Económica de Schweickart. | `izq-032`, `lab-017`, `N3` | David Schweickart; `COM` | `implementada` | No heredar el perfil a Yugoslavia, China, Roemer o cooperativismo aislado. |
| **Socialismo utópico** (`Utopian Socialism`) | E−, A? | Familia pre/marxista de comunidades cooperativas y diseños ideales. Contexto histórico, poca discriminación electoral española. | `izq-032`, `lab-017`; falta ítem de comunidad experimental voluntaria | Owen, Fourier, Saint-Simon; `GEN` | `pendiente-P2` | “Utópico” fue también etiqueta polémica marxista. |
| **Laborismo** (`Labourism`) | E− moderada, A variable | Política basada en representación del trabajo organizado, habitualmente parlamentaria. Internacional; eco español indirecto. | `lab-001`, `lab-018`, rechazo `izq-019` | historia del Labour británico y sindicalismo político | `histórica-contextual` | No convertir todo partido socialdemócrata en “laborista”. |
| **Socialismo conservador / religioso** (`Conservative Socialism`, `Religious Socialism`) | E−, moral/T variable | Redistribución o propiedad social combinadas con comunidad/tradición o motivación religiosa. | `eco-001`, `der-002`, `rel-002/003` | `GEN`; Rerum Novarum; socialismo cristiano español | `pendiente-P2` | Dos rótulos amplios; no deducir teocracia de religiosidad. |
| **Marxismo** (`Marxism`) | E−, A? | Crítica del capitalismo basada en clase, explotación y transformación de relaciones de propiedad; no fija por sí sola partido, régimen o táctica. | `izq-016`, `lab-011`, `izq-001` | Marx y Engels; `COM` | `parcial` | No usar “marxismo” como sinónimo de URSS o autoritarismo. |
| **Leninismo bolchevique y marxismo-leninismo soviético en fase estaliniana** (`Leninism`, `Marxist Leninism`, `Stalinism`, parcialmente `Anti Revisionism`) | E−, A+ en el modelo histórico; G variable | Dos referencias separadas: Lenin/bolchevismo 1902–1921 y configuración soviética 1928–1953. Evitan convertir vanguardia, NEP, planificación y fase estaliniana en un único vector. | `izq-002`, `izq-018`, `izq-017`, `izq-044` | Lenin, Stalin; `COM`; historia institucional soviética | `implementada` | Periodizar y no trasladar crímenes, adhesiones ni una etiqueta personal por pocas respuestas. |
| **Maoísmo / pensamiento Mao Zedong** (`Maoism`) | E−, A+ histórico; método revolucionario | Línea de masas, guerra popular y revolución continuada; no idéntico a MLM consolidado después. | `izq-002`, `izq-022`, `izq-031` | Mao; Timothy Cheek en `COM` | `parcial` | Separar China histórica, maoísmo internacional y MLM. |
| **Marxismo-leninismo-maoísmo** (`Marxist Leninism Maoism`) | E−, A+/V | Síntesis internacional codificada en los años noventa con partido, guerra popular y antirrevisionismo. | `izq-002`, `izq-022`, `lim-003` | RIM, “Long Live Marxism-Leninism-Maoism!”; estudios académicos | `implementada` | `violenta`; umbral alto y no mapear si faltan macroejes. |
| **Pensamiento Gonzalo** (solicitado; no aparece con nombre en la imagen) | E−, A+/V extremo | Variante del PCP-Sendero Luminoso que eleva liderazgo, guerra popular y boicot electoral. Referencia histórica internacional, no partido español. | `lim-001`, `lim-003`, `izq-031` | documentos PCP contrastados con CVR Perú y bibliografía académica | `implementada` | `violenta`; advertencia de víctimas, sin iconografía ni recomendación. |
| **Hoxhaísmo / antirrevisionismo albanés** (`Hoxhaism`) | E−, A+ | Defensa de planificación y partido-Estado albanés; ruptura con URSS post-Stalin y China post-Mao. | `izq-020`, `izq-028`, `dem-019` | Hoxha; `COM`; historia de Albania | `implementada` | `antipluralista`; no igualar todo antirrevisionismo a hoxhaísmo. |
| **Trotskismo** (`Trotskyism`) | E−, A variable | Revolución permanente, internacionalismo y oposición a burocratización estalinista; pluralidad interna relevante en España. | `izq-021`, rechazo `izq-006`, `izq-018` | Trotsky, IV Internacional; `COM` | `implementada` | No reducir a valoración personal de Trotski. |
| **Luxemburgismo** (`Luxemburgism`) | E−, A− relativa | Huelga de masas, democracia socialista e internacionalismo; crítica a centralismo excesivo. | `izq-008`, `izq-018`, rechazo `izq-002` | Rosa Luxemburg, *La revolución rusa* y textos organizativos; `COM` | `implementada` | No presentar a Luxemburg como simplemente anarquista o antipartido. |
| **Comunismo de consejos / consejismo** (`Council Communism`) | E−, A− | Consejos obreros y rechazo del partido dirigente/gestión parlamentaria. | `izq-003`, `lab-008`, `dem-017` | Pannekoek, Gorter; `COM` | `implementada` | Distinguir de soviets subordinados al partido. |
| **Comunismo de izquierda italiano / bordiguismo** (la imagen solo dice `Left Communism`) | E−, A organizativa alta pero antiparlamentaria | Invariancia programática, partido y rechazo del electoralismo/frentes; no es lo mismo que consejismo. | `izq-019`, rechazo `izq-018`, `izq-002` | Bordiga; historia de la izquierda comunista italiana | `implementada` | La etiqueta “comunismo de izquierda” contiene ramas incompatibles. |
| **Eurocomunismo** (ausente de la imagen) | E−, A−/plural | Vía democrática nacional, pluralismo y aceptación de instituciones; clave para historia del PCE. | `izq-030`, `dem-010`, rechazo `izq-031` | Carrillo y debates PCE/PCI; `COM` | `implementada` | Su macroposición económica actual no debe publicarse hasta corregir cobertura. |
| **Menchevismo** (`Menshevism`) | E−, parlamentario/etapista | Corriente histórica rusa favorable a partido amplio y etapa democrática previa; contexto, no identidad española actual. | rechazo `izq-002`, `izq-023`, rechazo `izq-031` | Mártov; historia RSDLP en `COM` | `pendiente-P2` | Solo con periodo 1903–1917/derivaciones; no usar como insulto “moderado”. |
| **Posadismo** (`Posadism`) | E−, A+/V nuclear | Rama de la IV Internacional fundada en 1962, con tesis excepcional sobre guerra nuclear y revolución. | `lim-004`, `izq-021`, `izq-002` | J. Posadas; IV Internacional Posadista; estudios independientes | `implementada` | `antipluralista`; distinguir de POSI español y de `Anarcho Posadism` meme. |
| **Nacionalcomunismo / nacionalbolchevismo** (`National Communism`, `Nazbol`) | E−, A+; nacionalismo independiente | Familias sincréticas que subordinan clase e internacionalismo a nación/Estado; no un único programa. | `izq-006`, `izq-025`, `dr-024` | estudios de nacionalbolchevismo ruso/alemán por periodo | `pendiente-P2` | Sensible; no derivar de patriotismo de izquierda aislado. |
| **Izquierda nacional-popular/social-patriótica** (`Left Wing Nationalism`, parte de `Populism (Left)`) | E− variable, A? | Izquierda que reivindica nación, símbolos o soberanía; en España puede ser estatal o periférica. | `izq-025`, `izq-026`, `izq-014` | autores/organizaciones concretas; `POP` | `pendiente-P1` | “Rojipardo” es atribución polémica, no nombre neutral automático. |
| **Guevarismo** (`Guevarism`) | E−, V/método | Foco guerrillero, internacionalismo y “hombre nuevo”; variante histórica latinoamericana. | `izq-001`, `lim-003`, rechazo `izq-006` | Che Guevara; Debray; historia latinoamericana | `pendiente-P2` | No inferir apoyo a violencia actual por admiración histórica. |
| **Titoísmo/autogestión yugoslava** (`Titoism`) | E−/mercado social, A+ partido; T federal | Socialismo federal no alineado y autogestión bajo partido único. | `lab-008`, `izq-017`, `izq-006` | constituciones yugoslavas; Horvat; `COM` | `pendiente-P2` | Tipo histórico híbrido; no colocarlo en un único eje autoridad. |
| **Castrismo / pensamiento Ho Chi Minh / denguismo / gorbachovismo** (`Castroism`, `Ho Chi Minh Thought`, `Dengism`, `Gorbachevism`) | E y A cambian por fase | Etiquetas de dirigentes, Estados y estrategias nacionales; útiles para historia comparada, no como cuatro identidades universales inmediatas. | Castro/Ho: `izq-002`, `izq-006`; Deng: `izq-017`, `izq-028`; Gorbachov: `dem-010`, `izq-018` | `PAÍS`, `COM`, documentos de cada periodo | `histórica-contextual` | Una ficha por país y etapa; no herencia por asociación con “comunismo”. |
| **Juche** (`Juche`) | E− histórica, A+ extremo; soberanismo | Ideología oficial norcoreana de autosuficiencia, liderazgo y partido-Estado. | `izq-006`, `lim-001`, `dem-019` | constituciones/textos norcoreanos contrastados con investigación académica | `pendiente-P2` | `antipluralista`; fuentes estatales requieren contraste independiente. |
| **Polpotismo/Jemeres Rojos** (`Pol Potism`) | E− agraria, A+/V extremo | Régimen histórico de ingeniería social agraria y violencia masiva, no rama general del maoísmo. | `lim-003`, `lim-005`; falta ítem antiurbanización forzada | ECCC, Yale Cambodian Genocide Program, `COM` | `histórica-contextual` | `violenta`; no ofrecer como resultado identitario o “curiosidad”. |
| **Chavismo** (`Chavism`) | E− variable, A/populismo variable | Movimiento venezolano nacional-popular, electoral y estatal con etapas distintas. | `pop-001`, `sd-018`, `izq-017` | constitución/programas venezolanos; literatura académica comparada | `histórica-contextual` | No extrapolar automáticamente a Podemos ni a toda izquierda populista. |
| **Socialismo árabe / baazismo** (`Arab Socialism`, `Ba'athism`) | E−/desarrollista, A+ histórico; panárabe | Nacionalismo panárabe secular con estatismo y partido, distinto entre Siria, Irak y nasserismo. | `izq-005`, `dem-019`; faltan panarabismo y secularismo nacional | Michel Aflaq; constituciones/programas; `PAÍS` | `pendiente-P2` | Variación nacional y periodización obligatorias. |
| **Gadafismo / Tercera Teoría Universal** (`Gaddafism`) | E mixta, A+ real pese a retórica directa | Modelo libio de *Jamahiriya*, panarabismo/panafricanismo y Libro Verde. | `dem-001`, `dem-019`, `lab-012` | *Libro Verde* contrastado con historia política de Libia | `histórica-contextual` | No codificar instituciones nominales como práctica democrática sin contraste. |

### 3.2 Anarquismos, sindicalismos y municipalismos

| Corriente/familia y etiquetas de la imagen | 2D / incertidumbre | Definición breve y relevancia | Preguntas discriminantes | Fuentes | Estado | Sensibilidad y cautela |
|---|---|---|---|---|---|---|
| **Anarcocomunismo** (`Anarcho communism`) | E−, A− | Abolición de Estado, capitalismo y salario; propiedad común y distribución por necesidades. Muy relevante en la historia española. | `izq-007`, `izq-043`, `lab-017`; contra `N1` | Kropotkin, Malatesta; `ANAR` | `implementada` | No confundir con comunismo de partido-Estado. |
| **Anarcosindicalismo / sindicalismo revolucionario libertario** (`Anarcho Syndicalism`, parte de `Syndicalism`) | E−, A− | Sindicato y acción directa como medios de transformación y organización social. Núcleo histórico CNT. | `izq-008`, `lab-018`, `lab-026` | Carta de Amiens; congresos CNT; `ANAR` | `implementada` | Distinguir sindicato actual, referencia doctrinal y sindicalismo fascista. |
| **Anarquismo individualista** (`Individualist Anarchism`) | E variable, A− | Familia antiautoritaria centrada en soberanía individual; incluye economías incompatibles. | `izq-007`, `izq-039`, `lab-010` | Stirner, Tucker y tradición ibérica; `ANAR` | `implementada` | No equiparar automáticamente a anarcocapitalismo. |
| **Mutualismo proudhoniano** (`Mutualism`, posible `Mutual-ism`) | E mixta/mercados sin capitalistas, A− | Posesión, reciprocidad, crédito mutuo y federación; puente histórico entre socialismo y anarquismo. | `izq-032`, `lab-017`, `izq-038` | Proudhon; `ANAR` | `implementada` | “Mercado” no implica acumulación capitalista ni ancap. |
| **Anarquismo colectivista** (`Anarcho Collectivism`, `Collectivism` solo parcialmente) | E−, A− | Propiedad colectiva de medios de producción con remuneración vinculada al trabajo; tradición de Bakunin y peso español. | `izq-007`, `lab-017`, `N1` | Bakunin; Guillaume; `ANAR` | `implementada` | `N1` aún mejoraría su separación del anarcocomunismo; `Collectivism` aislado es demasiado genérico. |
| **Plataformismo/especifismo** (`Platformism`) | E−, A− con coordinación | Organización política anarquista específica con unidad teórica/táctica y responsabilidad colectiva. La referencia implementada se limita a Dielo Truda. | `izq-003`, `izq-007`, `N2` | *Organizational Platform* de Dielo Truda | `implementada` | No heredar el vector al especifismo actual ni traducir coordinación como vanguardia leninista. |
| **Comunalismo/ecología social/municipalismo libertario** (`Communalism`, `Eco Anarchism`) | E−/comunal, A−; ecología | Democracia municipal, confederación y ecología social. La referencia implementada cubre la formulación comunalista madura de Bookchin. | `izq-038`, `ene-012`, `ene-010` | Bookchin; Biehl; `ANAR`, `GREEN` | `implementada` | No confundir con `Council Communism` ni heredarla al confederalismo democrático kurdo. |
| **Confederalismo democrático** (`Democratic Confederalism`) | E mixta/comunal, A−; T | Autogobierno de base, pluralismo comunitario y confederación asociado a Öcalan y experiencia kurda. | `izq-038`, `dem-034`, `dem-035` | Öcalan; estudios sobre AANES/Rojava | `pendiente-P1` | No asumir identidad kurda ni trasladar sin contexto a España. |
| **Neozapatismo** (`Neozapatismo`) | E−/comunal, A−; indígena/territorial | Autonomía, “mandar obedeciendo” y organización comunitaria zapatista contemporánea. | `dem-013`, `izq-038`, `nac-003` en negativo | declaraciones EZLN; estudios de Chiapas | `pendiente-P2` | No confundir con el zapatismo histórico de Emiliano Zapata. |
| **Anarcopacifismo** (`Anarcho Pacifism`) | E variable, A−/V− | Anarquismo que rechaza violencia y militarismo como medios; la referencia implementada se limita a la raíz tolstoyana. | `dr-025`, `izq-040`, `izq-007` | Tolstói; Christoyannopoulos; `ANAR` | `implementada` | Una respuesta pacifista aislada no define anarquismo y no fija economía. |
| **Gandhismo** (`Gandhism`) | E/T variable, A−/no violencia | Satyagraha, autogobierno y no violencia; tradición político-ética india, no subtipo de anarquismo sin más. | `dr-025`, `dem-001`; falta autosuficiencia local/satyagraha | Gandhi; estudios poscoloniales | `histórica-contextual` | Evitar apropiación descontextualizada y simplificación pacifista; no es prioridad del matching español. |
| **Anarcofeminismo y anarquismo queer** (`Anarcha Feminism`, `Queer Anarchism`) | E− variable, A−; género | Análisis conjunto de patriarcado, Estado y capitalismo; rama real, no solo suma de etiquetas. | `izq-007`, `fem-010/011` según teoría; falta poder doméstico no estatal | Emma Goldman, Mujeres Libres, `ANAR` | `pendiente-P2` | No asumir una única posición en debates trans/prostitución sin fuentes. |
| **Anarquismo religioso** (`Religious Anarchism`) | E variable, A−; R variable | Rechazo de autoridad estatal desde tradiciones religiosas; incluye cristiano, judío, budista y otras ramas. | `izq-007`, rechazo `rel-003`, `rel-002` | Tolstói, Ellul y capítulo de religión en `ANAR` | `pendiente-P2` | Religión no equivale a confesionalidad ni teocracia. |
| **Anarcoprimitivismo** (`Anarcho primitivism`) | E−/subsistencia, A−; tecnología | Crítica radical de civilización industrial, domesticación y división tecnológica del trabajo. | `ene-010`, rechazo `va-016`, `N6` | John Zerzan y crítica académica en `ANAR` | `pendiente-P2` | No confundir con ecologismo, decrecimiento o pueblos indígenas. |
| **Egoísmo anarquista e ilegalismo histórico** (`Egoism`, `Illegalism`) | E variable, A− | Stirnerismo; el ilegalismo fue táctica/corriente histórica minoritaria, no permiso genérico para dañar. | `izq-007`, `lab-010`; falta autonomía frente a normas comunitarias | Stirner; historia del anarquismo individualista | `pendiente-P2` | `Illegalism` exige periodo y no debe gamificarse. |
| **Situacionismo** (`Situationism`) | E−, A−; crítica cultural | Internacional Situacionista: crítica de espectáculo, vida cotidiana y capitalismo avanzado. | `izq-001`, `izq-042`; falta crítica de mercancía/espectáculo | Guy Debord; archivos SI | `pendiente-P2` | Corriente artística-política, no coordenada estable. |
| **Antifa/antifascismo** (`Antifa`) | No mapear | Práctica y coalición contra fascismo; reúne anarquistas, comunistas, liberales y otros. | `dr-025`, `dem-021`; falta distinguir acción directa no violenta/violenta | historia comparada del antifascismo | `transversal` | No es ideología unitaria ni organización mundial única. |
| **“True Anarchism”** (`True Anarchism`) | No mapear | Rótulo de gatekeeping sin referente doctrinal delimitado. | Ninguno | No procede | `excluida-meme` | Sustituir por ramas documentadas; nunca declarar una como “verdadera”. |

### 3.3 Liberalismos, libertarismos de mercado y capitalismo

| Corriente/familia y etiquetas de la imagen | 2D / incertidumbre | Definición breve y relevancia | Preguntas discriminantes | Fuentes | Estado | Sensibilidad y cautela |
|---|---|---|---|---|---|---|
| **Liberalismo clásico** (`Liberalism`, `Classical Liberalism`) | E+, A−/constitucional | Derechos individuales, gobierno limitado, propiedad y mercado bajo ley. Relevancia española alta como referencia, aunque pocas organizaciones sean tipos puros. | `der-001`, `lib-003`, `dem-008` | Locke, Smith, Mill; `LIB`, `GEN` | `implementada` | No confundir con “liberal” estadounidense ni con neoliberalismo. |
| **Liberalismo social** (`Social Liberalism`) | E mixta, A−/plural | Libertades civiles y mercado regulado con corrección pública de desigualdades. | `soc-001`, `eco-001`, `dem-010` | T. H. Green, Hobhouse, Rawls; `GEN` | `parcial` | Debe distinguirse de socialdemocracia por propiedad/mercado, no por etiqueta. |
| **Tercera vía** (`Third Way`) | E mixta/mercado, A plural | Corriente programática que adapta la socialdemocracia a mercados, disciplina fiscal y políticas de activación. Tuvo traducción española/europea, pero no merece una “zona” principal sin evidencia empírica propia. | `eco-004`, `sd-009`, `eco-002` | Anthony Giddens; manifiestos Blair/Schröder; análisis PSOE por periodo | `pendiente-P2` | **Ficha secundaria**, no sinónimo de centrismo ni de todo gobierno del PSOE. |
| **Neoliberalismo friedmaniano** (`Neo Liberalism`, solo una rama) | E+, A− liberal | Subtipo ya documentado de propiedad, competencia, desregulación y gobierno limitado. No pretende representar toda la familia neoliberal. | `eco-002`, `lib-004`, `lib-007`, `lib-008` | Friedman, Mont Pelerin y literatura crítica comparada | `implementada` | No usar como insulto o cajón de sastre; ordoliberalismo, conservadurismo moral y experiencias autoritarias requieren fichas distintas. |
| **Capitalismo laissez-faire** (`Laissez Faire Capitalism`, `General Capitalism`) | E+, A? | Ideal de mínima intervención económica; “capitalismo general” es sistema amplio, no identidad suficiente. | `der-001`, `lib-003`, rechazo `eco-005` | Smith con contexto; laissez-faire histórico; `LIB` | `parcial` | La autoridad política y libertades civiles quedan indeterminadas. |
| **Minarquismo** (`Minarchism`) | E+, A− estatal | Estado mínimo limitado a seguridad, justicia y defensa, manteniendo monopolio jurídico. | `der-001`, rechazo `lib-002`, `lab-010` | Nozick; liberalismo libertario | `implementada` | Diferenciar del liberalismo clásico por extensión del Estado y del ancap por su existencia. |
| **Anarcocapitalismo rothbardiano** (`Anarcho capitalism`) | E+ extremo, A− estatal | Abolición del Estado y provisión privada de justicia/seguridad fundada en propiedad y no agresión. | `lib-002`, `lab-010`, rechazo `lab-017` | Rothbard, *For a New Liberty*; `LIB` | `implementada` | Su pertenencia al anarquismo histórico es discutida; mostrarlo como libertarismo de mercado radical. |
| **Agorismo** (`Agorism`) | E+ de mercado, A−; estrategia | Contraeconomía y mercados no estatales como estrategia de cambio, con autodefinición de izquierda libertaria. | `lib-002`, `lab-010`, `N5` | Samuel Edward Konkin III | `pendiente-P2` | No sinónimo de ancap ni aprobación general de ilegalidad. |
| **Rothbardianismo de izquierda** (`Left Rothbardianism`) | E+ anticapitalismo corporativo, A− | Lectura de mercados radicales contra privilegio estatal, guerra y poder corporativo. | `lib-002`, `geo-003`, rechazo `eco-002` si implica privilegio | Rothbard de los sesenta; Karl Hess; estudios de left-market anarchism | `pendiente-P2` | Rótulo minoritario con evolución temporal. |
| **Georgismo / geolibertarismo** (`Georgism`) | E+ productiva, renta del suelo social | Propiedad privada del producto del trabajo y captura pública del valor no mejorado del suelo. Discrimina muy bien y puede tener utilidad española en vivienda/suelo. | `N4`, `eco-005`, `lib-003` | Henry George, *Progress and Poverty*; literatura de land-value tax | `pendiente-P2` | Sin `N4`, cualquier afinidad sería espuria. |
| **Objetivismo** (`Objectivism`) | E+, A−/individualista | Filosofía de Ayn Rand: razón, egoísmo racional, derechos individuales y capitalismo laissez-faire. | `der-001`, `lib-003`; falta ítem de altruismo/colectivismo moral | Ayn Rand; crítica académica | `pendiente-P2` | Filosofía más amplia que política; no inferir por apoyo al mercado. |
| **Voluntarismo político** (`Voluntaryism`) | E+ usual, A− | Toda relación política legítima debe ser voluntaria; suele solaparse con ancap pero no es necesariamente un programa económico completo. | `lab-010`, `lib-002`; falta consentimiento político general | Auberon Herbert y literatura libertaria | `pendiente-P2` | Alto solapamiento: evitar ficha si no añade discriminación incremental. |
| **Libertarismo compasivo** (`Bleeding-Heart Libertarianism`) | E+, A−; preocupación distributiva | Intenta compatibilizar mercados y derechos de propiedad con justicia social para grupos vulnerables. | `lib-003`, `eco-001`, `soc-004` | Zwolinski, Tomasi y debates académicos | `pendiente-P2` | Corriente intelectual anglófona, relevancia española baja. |
| **Paleolibertarismo / hoppeanismo / propertarianismo** (`Paleo Libertarianism`, `Hoppeanism`, `Propertarianism`) | E+, A social variable/posible exclusión | Corrientes que priorizan propiedad radical y, en algunas variantes, orden social conservador o comunidades contractuales. | `lab-010`, `der-025`, `dem-010`; falta derecho de exclusión contractual | Rothbard tardío, Hoppe y literatura crítica | `pendiente-P2` | No fusionar las tres ni atribuir posiciones extremas por una respuesta fiscal. |
| **Libertarismos nacional, cristiano, “neo” y korwinista** (`National Libertarianism`, `Christian Libertarianism`, `Neo Libertarianism`, `Korwinism`) | E+, A/T/G variables | Cruces entre economía libertaria y nación, religión o intervencionismo exterior; “korwinismo” es personalista/polaco. | `der-001` más `izq-025`/`der-002`/`der-021` según rama | autores y programas concretos; `PAÍS` | `histórica-contextual` | No son una sola familia ni prioritarias en España. |
| **Libertarismo verde** (`Green Libertarianism`) | E+ variable, A−; ecología | Soluciones ambientales basadas en derechos, descentralización, mercados o bienes comunes. | `va-008`, `ene-011`, `ene-012` | `GREEN`, economía ecológica institucional | `pendiente-P2` | No confundir con ecomodernismo, que puede apoyar Estado e I+D. |
| **“Capitalismo rosa”** (`Pink Capitalism`) | No mapear | Estrategia comercial/coalición de mercado y derechos LGTB; no doctrina coherente por sí sola. | `soc-001` y economía por separado | literatura sobre rainbow capitalism | `transversal` | No crear una zona ni inferir liberalismo económico desde derechos LGTB. |
| **Libertarismo transhumanista/espacial** (`Transhumanism`, `Astro Libertarianism`) | E?, A?; tecnología | Transhumanismo es postura sobre mejora humana; “astro-libertarianism” es rótulo nicho sobre espacio y propiedad. | falta módulo tecnológico; `lib-002` no basta | Bostrom/Hughes; derecho espacial | `transversal` / `excluida-ambigua` | No inventar economía o bioética a partir de entusiasmo tecnológico. |
| **Anarcomonarquismo / anarcofascismo / anarcofronterismo** (`Anarcho Monarchism`, `Anarcho Fascism`, `Anarcho Frontierism`) | Incoherente o indeterminado | Cruces de internet sin núcleo estable; pueden ocultar modelos distintos de autoridad privada o local. | Ninguno | Solo investigar si aparece una tradición primaria delimitable | `excluida-meme` | No legitimar una celda por su mera presencia gráfica. |
| **Anarcodarwinismo y avaricionismo** (`Anarcho Darwinism`, `Avaritionism`) | No mapear | Etiquetas de polcompball que combinan ausencia de Estado, fuerza y egoísmo sin tradición seria estable. | Ninguno | Origen de foro; no fuente doctrinal | `excluida-meme` | No presentar violencia amoral como opción lúdica. |

### 3.4 Conservadurismos, democracia cristiana, carlismos y religión

| Corriente/familia y etiquetas de la imagen | 2D / incertidumbre | Definición breve y relevancia | Preguntas discriminantes | Fuentes | Estado | Sensibilidad y cautela |
|---|---|---|---|---|---|---|
| **Conservadurismo clásico** (`Conservatism`) | E variable, A/tradición moderada | Prudencia, continuidad institucional, autoridad limitada y cambio gradual. Referencia española útil. | `dem-012`, `der-002`, `eco-004` | Burke; Oakeshott; `GEN` | `implementada` | No identificarlo con PP ni con toda derecha. |
| **Conservadurismo liberal europeo** (`Liberal Conservatism`) | E+, A/tradición moderada | Mercado y constitucionalismo con orden/tradición; familia europea común con referencia ya implementada. | `eco-002`, `dem-008`, `der-010` | `GEN`; programas EPP por periodo | `implementada` | Separar el tipo doctrinal de la conducta de un partido real. |
| **Conservadurismo progresista** (`Progressive Conservatism`) | E variable, A moderada | Reforma social gradual dentro de instituciones y tradiciones existentes. | `dem-012`, `soc-001`, `eco-004` | historia one-nation/progressive conservatism | `pendiente-P2` | Rótulo dependiente de país y época. |
| **Paleoconservadurismo y neoconservadurismo** (`Paleo Conservatism`, `Neo Conservatism`) | E+ variable; G opuesta a menudo | El primero suele ser nacional, tradicional y no intervencionista; el segundo combina democracia liberal/mercado con política exterior más intervencionista. | `der-002`, `geo-003`, `der-021` | literatura estadounidense, `PAÍS` | `pendiente-P2` | Categorías estadounidenses; no trasplantarlas sin adaptación española. |
| **Democracia cristiana** (`Christian Theocracy` no; la imagen no rotula la ficha explícita, pero sí `Religious Democracy`) | E mixta/social de mercado, A plural; R | Dignidad, subsidiariedad, solidaridad y democracia plural inspiradas en cristianismo, distinta de teocracia. | `der-012`, `rel-002`, rechazo `rel-003` | *Rerum Novarum*, *Quadragesimo Anno*, programas democristianos | `implementada` | Su proyección macro social está suspendida hasta mejorar cobertura bioética. |
| **Democracia religiosa** (`Religious Democracy`) | E?, A plural; R | Categoría amplia de democracia compatible con inspiración religiosa. | `dem-010`, `rel-002`, rechazo `rel-003` | literatura comparada por religión/país | `transversal` | Demasiado genérica para una referencia sin tradición concreta. |
| **Distributismo** (`Distributism`, `Distributist Libertarianism`) | E mixta, A/T variable | Propiedad productiva ampliamente distribuida, subsidiariedad y crítica tanto a concentración capitalista como estatal. | `lab-017`, `eco-014`, `der-002` | Chesterton, Belloc, doctrina social católica | `implementada` | La variante “libertaria” de la imagen exige fuente separada; no heredarla. |
| **Carlismo tradicionalista** (ausente como rótulo de imagen) | E orgánica/mixta, A+ no liberal; T foral; R confesional | Dios–Patria–Fueros–Rey, legitimidad monárquica, fueros y representación orgánica. Prioridad española. | `dr-011`, `dem-018`, `mon-001` en negativo | `ESP-CAR` | `implementada` | No confundir foralismo con centralismo ni con el Partido Carlista socialista. |
| **Carlismo socialista autogestionario** (ausente como rótulo de imagen) | E−, A−/federal; monarquía particular | Giro de Carlos Hugo: socialismo autogestionario, federalismo y ruptura democrática. | `lab-017`, `dem-033`, `mon-001` según formulación histórica | `ESP-CAR` | `implementada` | Periodo 1968–1986 y continuidad actual deben declararse. |
| **Monarquía constitucional/electiva/absoluta** (`Constitutional Monarchism`, `Elective Monarchism`, `Absolute Monarchism`) | E?; A de plural a absoluta | Formas de jefatura y régimen, no ideologías económicas completas. La constitucional es una posición real y relevante en España. | `mon-001`, `dem-008`, `dr-008` | teoría constitucional y constituciones comparadas | `transversal` | Mostrar en “modelo de Estado/instituciones”, no como región principal. |
| **Aristocracia y feudalismo** (`Aristocracy`, `Feudalism`) | E histórico, A+ | Forma de gobierno elitista y sistema socioeconómico histórico, respectivamente. | `dem-010`, `dem-018`; banco actual insuficiente | historia institucional medieval/moderna | `histórica-contextual` | No tratarlos como opciones contemporáneas equivalentes a partidos. |
| **Teocracia cristiana/islámica/hindú/sij/budista** (`Christian Theocracy`, `Islamic Theocracy`, `Hindu Theocracy`, `Sikh Theocracy`, `Buddhist Theocracy`) | E?; A+/R | Supremacía institucional de autoridad/doctrina religiosa; cada tradición tiene modelos diferentes. | `rel-003`, `rel-002` en negativo, `dem-010` | constituciones y estudios por país/religión | `pendiente-P2` | No inferir teocracia de práctica religiosa; evitar homogeneizar religiones. |
| **Hindutva** (`Hindutva`) | E?, A/nacionalismo variable; R | Nacionalismo hindú moderno, no sinónimo de hinduismo ni necesariamente teocracia formal. | `nac-003`, `lim-007`, `dem-010` | Savarkar y literatura académica sobre India | `histórica-contextual` | Alta necesidad de contexto; no relevante como zona española. |

### 3.5 Fascismos, derecha radical, autoritarismos y arquetipos de riesgo

| Corriente/familia y etiquetas de la imagen | 2D / incertidumbre | Definición breve y relevancia | Preguntas discriminantes | Fuentes | Estado | Sensibilidad y cautela |
|---|---|---|---|---|---|---|
| **Fascismo histórico italiano, por fases** (`Fascism`) | E variable por fase, A+; ultranacionalista | El régimen PNF 1925–43 ya tiene referencia propia; San Sepolcro, pre-Marcha y Salò siguen separados porque no comparten un único vector económico, religioso o institucional. | Régimen: 14 posiciones; fases restantes `dem-019`, `dr-024`, `N7` | manifiesto de San Sepolcro, doctrina de 1932, Carta de Verona; `FASC` | `implementada` para 1925–43 / resto `pendiente-P2` | `violenta/antipluralista`; periodizar y no usar “fascista” como eje genérico. |
| **Falangismo / nacionalsindicalismo español** (`Falangism`) | E dirigida, A+; centralista | La referencia implementada se limita al programa de FE de las JONS de 1934: unidad nacional, movimiento totalitario, sindicalismo vertical, nacionalización y propiedad subordinada. | 19 posiciones; ancla editorial (+17,+72); punto calculado suspendido por cobertura directa insuficiente | programa de 27 puntos; UNED/UCM; `ESP-FAL` | `implementada` | `antipluralista`; no mezclar con FET-JONS, franquismo o partidos actuales. |
| **Nacionalcatolicismo/franquismo** (no rotulado como tal; relacionado con `Authoritarian Capitalism`, `Conservative Socialism`) | E indeterminada en el banco, A+; R confesional | La referencia implementada delimita 1945-1957: catolicismo estatal, jefatura personal, Cortes orgánicas, centralismo y sindicato vertical. | 15 posiciones; economía insuficiente para mapa | BOE, Congreso e historiografía española | `implementada` | `violenta`; matching histórico sin porcentaje ni identidad personal. |
| **Nazismo/nacionalsocialismo** (`Nazism`) | E dirigida pero propiedad mixta, A+/V extremo; racial | Ultranacionalismo racial, dictadura y genocidio. Referencia histórica, no zona electoral. | `lim-007`, `lim-005`, `dr-024` | fuentes del Holocausto, historiografía académica; `FASC` | `histórica-contextual` | `violenta`; nunca iconografía, ranking lúdico o equivalencia por política social. |
| **Neonazismo y fascismo esotérico** (`Neo Nazism`, `Esoteric Fascism`) | E?, A+/V | Renovaciones posbélicas del nazismo y variantes ocultistas/esotéricas marginales. | `lim-007`, `lim-005`, `dr-025` en negativo | estudios de extremismo y terrorismo | `pendiente-P2` | `violenta/antipluralista`; no amplificar subculturas. |
| **Aceleracionismo neonazi; Atomwaffen Division/The Base** (`Accelerationism (Right)` solo parcialmente) | E?; A+/V extremo; **no mapear** | Arquetipo de riesgo que busca acelerar mediante violencia el colapso democrático y una guerra racial. En España existe relevancia de seguridad, no electoral. | `lim-002`, `lim-003`, `lim-007` | `ACC` | `riesgo-no-electoral` / implementada | `violenta`; sin contenido operativo, propaganda, emblemas ni inferencias delictivas. Una respuesta aislada no identifica militancia. |
| **Strasserismo** (`Strasserism`) | E−/anticapitalismo nacional, A+; racial/nacional | Rama histórica nazi que enfatizó retórica anticapitalista; no “izquierda” por economía aislada. | `dr-001`, `dr-002`, `lim-007` | historiografía NSDAP y `FASC` | `pendiente-P2` | `antipluralista`; evitar blanqueo por política económica. |
| **Cuarta Teoría Política / eurasianismo duginista** (`Forth Theory`) | E?, A+ antiliberal; G multipolar | Proyecto sincrético posliberal de Aleksandr Dugin; la celda “autoritaria izquierda” de la imagen es injustificada. | `dr-019`, `dr-024`; falta rechazo conjunto de liberalismo/comunismo/fascismo | Dugin contrastado con estudios académicos de Eurasianism | `pendiente-P2` | Sensible, nicho exhaustivo; no sobredimensionar influencia española. |
| **Mladorossismo** (`Mladorossism`) | E sincrética, A+; monárquica | Movimiento emigrado ruso de entreguerras que mezcló monarquismo y elementos fascistas/soviéticos. | banco insuficiente | archivos y monografías sobre emigración rusa | `histórica-contextual` | Relevancia española casi nula. |
| **Fascismo de Vichy / estatismo Shōwa** (`Vichy Fascism`, `Showa Statism`) | E?, A+; país/periodo | Etiquetas de régimen/coalición histórica francesa y japonesa, no doctrinas universales. | `dem-019`, `dr-024`; faltan imperio/colaboracionismo | `PAÍS`, `FASC` | `histórica-contextual` | Periodo, guerra y debates historiográficos obligatorios. |
| **Neofascismo** (`Neo Fascism`) | E variable, A+ | Rearticulaciones pos-1945 de núcleos fascistas; distinto de derecha radical que compite en democracia. | `dem-010` en negativo, `dr-024`, `dem-019` | `FASC`, literatura posfascismo | `pendiente-P2` | No llamar neofascista a toda política nativista sin evidencia. |
| **Derecha radical populista/nativista** (`Alt Right`, `Populism (Right)`) | E variable, A autoritaria; nativismo | Nativismo y autoritarismo; populismo frecuente pero separable. Relevancia española alta. | `dr-003`, `dr-006`, `lim-007`; `pop-001` aparte | `RAD`, fuentes españolas | `implementada` | La referencia no recibe x económica: esta familia incluye programas incompatibles. No confundirla con fascismo, terrorismo ni con la `alt-right` estadounidense. |
| **Capitalismo autoritario/nacional** (`Authoritarian Capitalism`, `National Capitalism`) | E+, A+ | Mercado/propiedad privada bajo poder político concentrado; “nacional” añade preferencia/protección nacional. | `eco-002`, `dr-024`, `der-004` | literatura de capitalismo autoritario y desarrollismo | `pendiente-P2` | Descriptor de régimen, no necesariamente identidad coherente. |
| **Pinochetismo** (`Pinochetism`) | E+, A+/V; país/periodo | Régimen militar chileno y coalición ideológica concreta, con neoliberalización y represión. | `dr-024`, `eco-002`, `dem-010` en negativo | informes Rettig/Valech; historia de Chile | `histórica-contextual` | `violenta`; no usar como sinónimo de toda reforma promercado. |
| **Trumpismo** (`Trumpism`) | E+/proteccionista variable, A/populismo | Movimiento personalista estadounidense con nacionalismo, populismo y posiciones cambiantes. | `dr-023`, `der-004`, `pop-001` | programas/discurso por año y literatura estadounidense | `histórica-contextual` | No trasplantar como ideología española; periodizar. |
| **Corporativismo y sindicalismo nacional** (`Corporatocracy` no; `Falangism` sí) | E mixta, A variable | Organización de intereses por cuerpos; puede ser social, católica, fascista o estatal. Debe separar empresarios+trabajadores de sindicato solo productor. | `dr-014`, `dr-026`, `lab-007` | Philippe Schmitter; Costa Pinto; `ESP-FAL` | `parcial` | “Corporatocracy” significa dominio corporativo y no equivale a corporativismo. |

### 3.6 Nacionalismos, territorio, formas de Estado y geopolítica

| Corriente/familia y etiquetas de la imagen | 2D / incertidumbre | Definición breve y relevancia | Preguntas discriminantes | Fuentes | Estado | Sensibilidad y cautela |
|---|---|---|---|---|---|---|
| **Centralismo/uniformismo español** (sin rótulo propio; relacionado con `National Liberalism`) | E?, A/T central | Primacía de unidad y competencias estatales; puede aparecer en izquierda y derecha. | `dr-021`, `der-005`, `ter-001` | Constitución, programas y literatura territorial española | `parcial` | No inferir economía, religión ni autoritarismo del centralismo. |
| **Autonomismo, federalismo y confederalismo** (`Confederalism`) | E?, A−/T | Grados de reparto territorial: autonomías, federación constitucional y confederación de soberanos. | `dem-032`, `dem-033`, `dem-034`; salida `dem-035` | teoría federal; Constitución y estatutos | `transversal` | La monarquía constitucional también se cruza con cualquiera; son modelos de Estado, no cuadrantes. |
| **Republicanismo federal español** (`Republicanism` solo parcialmente) | E variable, A−/federal | Referencia histórica pimargalliana sobre república, pacto, autonomía y poder federal común; “republicanismo” incluye ramas muy distintas. | `mon-001`, `dem-033/034`, `izq-038` | Pi y Margall; CEPC; historia constitucional | `implementada` | No deducir izquierda radical de preferir jefatura electa ni inventar economía. |
| **Soberanismos/independentismos periféricos** | E y A variables; T principal | Proyectos catalanes, vascos, gallegos, canarios, andaluces y otros con ramas de derecha e izquierda. | `ter-002`, `nac-001`, `nac-003`; módulos territoriales | fuentes de cada organización y nación | `parcial` | Nunca colapsar “independentismo” en un punto económico/cultural. |
| **Regionalismo, foralismo e insularismo** | E y A variables; T | Autogobierno, derechos históricos o defensa territorial sin independencia necesaria. Incluye cuestión leonesa y singularidades autonómicas. | `eus-005`, `nac-009`, `nac-015`, `der-014` | estatutos, movimientos y academia territorial | `parcial` | Separar identidad cívica, lengua, financiación y modelo económico. |
| **Iberismo/federación España–Portugal** | E?, A/T/G | Proyecto de integración ibérica con variantes federalistas, confederales, monárquicas y republicanas. | `geo-010`, `dem-033/034` | autores iberistas y fuentes hispano-portuguesas | `parcial` | Una sola pregunta no basta para referencia. |
| **Nacionalismo negro** (`Black Nationalism`) | E variable, A/T variable | Familia de autodeterminación y política negra, principalmente estadounidense/diáspora; contiene ramas integracionistas y separatistas. | banco español insuficiente | Du Bois, Garvey, Malcolm X y estudios afrodiásporicos | `histórica-contextual` | No equiparar a supremacismo ni trasladar al contexto español sin módulo. |
| **Panarabismo y panturquismo** (`Pan Arabism`, `Pan turkism`) | E?, A/T/G | Proyectos de unidad supranacional árabe o túrquica, con variantes seculares, socialistas y derechistas. | faltan ítems de unidad pan-nacional | `PAÍS` | `histórica-contextual` | No ubicar por economía sin fuente. |
| **Sionismo** (`Zionism`) | **No forzar E×A**; G/T | Familia de proyectos de autodeterminación/Estado judío con ramas laboristas, liberales, revisionistas, religiosas y otras. | módulo internacional específico; actuales `geo-*` no bastan | Herzl y corrientes posteriores; historia académica Israel/Palestina | `transversal` / contextual | Ubicar en política internacional/territorial; no inferir postura sobre gobiernos actuales ni antisemitismo. |
| **Pancasila** (`Pancasila`) | E?, A?; Indonesia | Filosofía estatal indonesia de cinco principios, reinterpretada por regímenes distintos. | banco insuficiente | constitución/discursos fundacionales; historia indonesia | `histórica-contextual` | No es “izquierda autoritaria” universal. |
| **Kuomintangismo/Tridemismo** (`Kuomintangism`) | E/desarrollista variable, A variable; China/Taiwán | Nacionalismo de los Tres Principios del Pueblo y evolución de un partido/Estado concreto. | faltan nacionalismo cívico, bienestar y tutela política | Sun Yat-sen; historia KMT/Taiwán | `histórica-contextual` | Relevancia española baja; no zona prioritaria. |
| **Mandelismo/Mandelaísmo ambiguo** (`Mandelaism`) | Indeterminado | Puede aludir a Nelson Mandela (“Mandelaísmo”) o a Ernest Mandel (“mandelismo” trotskista). La imagen no resuelve cuál. | Ninguno hasta desambiguar | fuente original de la etiqueta; después Mandela o Mandel | `excluida-ambigua` | No asignar posiciones por parecido ortográfico. |

### 3.7 Ecologismos, animalismo, feminismos y tecnología

| Corriente/familia y etiquetas de la imagen | 2D / incertidumbre | Definición breve y relevancia | Preguntas discriminantes | Fuentes | Estado | Sensibilidad y cautela |
|---|---|---|---|---|---|---|
| **Ecologismo verde** (`Greenism`) | E variable, A variable; ecología principal | Prioridad de límites ecológicos, biodiversidad y transición; contiene ramas socialistas, liberales, conservadoras y libertarias. | `sd-016`, `va-007`, `ecl-001` | `GREEN`; programas verdes europeos/españoles | `parcial` | No proyectar automáticamente a izquierda ni antinuclear. |
| **Ecosocialismo** (parte de `Greenism`, `Eco Anarchism`) | E−, A variable; límites biofísicos | La referencia implementada se limita al Manifiesto Ecosocialista y la Declaración de Belém: transformación de propiedad/poder y ruptura con productivismo. | `ene-010`, `sd-016`, `izq-045` | Kovel, Löwy y Declaración de Belém | `implementada` | No representa todo decrecimiento ni fija una arquitectura constitucional completa. |
| **Ecomodernismo/ecologismo pronuclear** (no rotulado con ese nombre) | E variable, A variable; tecnología/nuclear | Protección climática mediante innovación, densificación y nuclear civil; corrige el falso eje verde=antinuclear. | `ene-001`, `ene-011`, `va-008` | *An Ecomodernist Manifesto* y literatura energética | `implementada` | No inferir liberalismo económico ni apoyo a armas nucleares. |
| **Liberación/abolicionismo animal** | E?, A?; ética interespecie | La referencia implementada atribuye derechos básicos a seres sintientes y busca abolir su explotación, no solo regularla. | `va-001`, `va-010`, `va-014` | Regan, Francione y literatura académica | `implementada` | Matching animalista sin inferir economía; separar bienestar, conservación y derechos. |
| **Feminismos** (`Libertarian Feminism`, `Anarcha Feminism`) | E/A variables; género | Familia plural: liberal, socialista, radical, interseccional, libertaria, anarquista, etc. | banco `fem-*`, pero ninguna tríada define toda la familia | historia y teoría feminista plural | `parcial` | No fabricar una referencia única a partir de prostitución o identidad trans. |
| **Transhumanismo** (`Transhumanism`) | E/A indeterminadas; tecnología | Apoyo a ampliación humana tecnológica; tiene variantes liberales, democráticas, socialistas y autoritarias. | falta módulo de mejora humana, IA, genética y acceso | Bostrom, Hughes y bioética académica | `transversal` | No colocarlo automáticamente en libertarian-right. |

### 3.8 Rasgos, estilos, sistemas y etiquetas que no deben convertirse en “zonas”

| Etiqueta seria normalizada | Qué es | Tratamiento en Espectro | Ítems actuales | Estado/cautela |
|---|---|---|---|---|
| **Populismo** (`Populism (Left)`, `Populism (Right)`) | Ideología delgada/estilo que contrapone “pueblo puro” y “élite corrupta”; puede acoplarse a izquierda o derecha. | Faceta independiente, nunca carga económica automática. | `pop-001`, `pop-002`, `pop-003`, `sd-018` | `transversal`; `POP`. |
| **Centrismo** (`Centrism`) | Posición relacional o estrategia de moderación, no paquete estable. | Describir respuestas moderadas/mixtas; no referencia identitaria salvo doctrina documentada. | Resultado por facetas | `transversal`; centro ≠ desconocimiento. |
| **Progresismo** (`Progressivism`) | Orientación al cambio/reforma con contenidos dependientes de época. | Facetas sociales e institucionales concretas. | `soc-*`, `fem-*`, `dem-*` | `transversal`; no sinónimo de izquierda económica. |
| **Anticapitalismo / anticomunismo** (`Anti Capitalism`, `Anti Communism`) | Rechazos que agrupan razones y alternativas incompatibles. | Mostrar posiciones y motivos, no ideología. | `izq-016`, `lab-017`; `izq-004/020` en negativo | `transversal`; una negación no define destino. |
| **Estatismo / autoritarismo / anti-autoritarismo** (`Statism`, `General Authoritarianisms`, `Anti Authoritarianism`) | Rasgos sobre alcance y concentración del Estado. | Facetas `estatismo`, `pluralismo`, `institucionalismo`, `organizacion`. | `lab-016`, `dem-009/010/019`, `izq-007` | `transversal`; evitar “horseshoe” por similitud superficial. |
| **Tecnocracia** (`Technocracy`) | Criterio de selección/decisión por expertos, compatible con regímenes diversos. | Posición institucional. | `lib-014`, `dem-027` | `transversal`; expertos independientes ≠ abolición de democracia. |
| **Imperialismo** (`Imperialism`) | Política/sistema de dominación exterior, no ideología completa. | Faceta geopolítica e histórica. | `geo-003`, `sd-003`; faltan colonialismo/anexión | `transversal` / `histórica-contextual`. |
| **Fordismo** (`Fordism`) | Régimen de producción/compromiso socioeconómico, no corriente política integral. | Contexto de economía política. | banco insuficiente | `histórica-contextual`. |
| **Corporatocracia** (`Corporatocracy`) | Descriptor de dominio de grandes corporaciones sobre gobierno. | Medir captura regulatoria/transparencia, no identidad. | `pop-002`, `dem-030`; falta lobby/captura | `transversal`; no confundir con corporativismo. |
| **Cleptocracia / república bananera** (`Kleptocracy`, `Banana Republicanism`) | Patología de gobierno/categoría peyorativa histórica. | No resultado identitario; posibles preguntas de corrupción institucional. | `dem-030`, `dem-031` | `histórica-contextual` / término peyorativo. |
| **Darwinismo social** (`Social Darwinism`) | Doctrina histórica que naturaliza jerarquía/competencia social. | Ficha histórica solo con banco específico. | `lim-007` no basta | `histórica-contextual`; no confundir biología evolutiva con política. |
| **Kraterocracia** (`Kraterocracy`) | Gobierno por los fuertes/fuerza, concepto marginal de forma de poder. | No zona; como máximo rasgo autoritario. | `dr-024`, `lim-005` | `excluida-ambigua` salvo tradición documentada. |

## 4. Inventario exhaustivo de etiquetas legibles de la imagen

Este inventario garantiza trazabilidad, **no adopción**. Se conserva la grafía inglesa visible —incluidos errores como `Forth Theory`— y se remite al nombre serio cuando existe. La decisión A–F responde a la taxonomía española curada de §1.2 bis.

| Nº | Etiqueta exacta legible | Normalización / familia | Decisión | Tratamiento y motivo |
|---:|---|---|:---:|---|
| 1 | `Hive Mind Collectivism` | Colectivismo de mente-colmena | F | Ficción/especulación de polcompball; no tradición política documentada. |
| 2 | `Nazbol` | Nacionalbolchevismo | B | Sincretismo real pero nicho, extranjero y sensible; solo exhaustivo. |
| 3 | `Neo Bolshevism` | Neobolchevismo de *1984* | F | Ideología ficticia de Eurasia, no bolchevismo histórico. |
| 4 | `Ingsocism` | Ingsoc/socialismo inglés de *1984* | F | Ficción de Orwell. |
| 5 | `Death Worship` | “Culto a la muerte” de *1984* | F | Ficción atribuida a Asia Oriental en la novela. |
| 6 | `Corporatocracy` | Corporatocracia | C | Descriptor de captura/dominio empresarial, no corporativismo ni doctrina integral. |
| 7 | `Kraterocracy` | Kraterocracia | F | Concepto marginal “gobierno del fuerte”, sin programa estable para Espectro. |
| 8 | `Posadism` | Posadismo | B | Referencia ya implementada; exhaustiva y sensible, no zona principal. |
| 9 | `Stalinism` | Estalinismo/ML ortodoxo | A | Discrimina corrientes comunistas españolas; requiere periodización y lenguaje neutral. |
| 10 | `Marxist Leninism Maoism` | Marxismo-leninismo-maoísmo | B | Implementada; referencia exhaustiva violenta, no identidad electoral. |
| 11 | `Forth Theory` | **Cuarta Teoría Política** (corrección) | B | Corriente duginista real, nicho; ubicación de la imagen no se hereda. |
| 12 | `Mladorossism` | Mladorossismo | E | Movimiento monárquico-sincrético ruso de entreguerras. |
| 13 | `Pol Potism` | Polpotismo/Jemeres Rojos | E | Régimen histórico violento; nunca zona lúdica. |
| 14 | `Juche` | Juche | E | Ideología estatal norcoreana contextual. |
| 15 | `Fascism` | Fascismo histórico por fases | B | Referencia exhaustiva; España prioriza falangismo y franquismo diferenciados. |
| 16 | `Esoteric Fascism` | Fascismo esotérico | B | Niche real/heterogéneo; solo con investigación especializada. |
| 17 | `Nazism` | Nacionalsocialismo alemán | E | Referencia histórica violenta, no región electoral. |
| 18 | `Neo Nazism` | Neonazismo | B | Referencia sensible exhaustiva; no confundir con derecha radical. |
| 19 | `National Capitalism` | Capitalismo nacional | B | Descriptor programático posible, pero heterogéneo y secundario. |
| 20 | `Alt Right` | Alt-right | D | Subcultura/movimiento estadounidense, no ideología universal. |
| 21 | `Absolute Monarchism` | Monarquía absoluta | C | Forma de Estado, sin programa económico inherente. |
| 22 | `Fordism` | Fordismo | E | Régimen de producción y compromiso histórico, no ideología completa. |
| 23 | `Populism (Left)` | Populismo de izquierda | C | Estilo/ideología delgada acoplada a programas diversos. |
| 24 | `Hoxhaism` | Hoxhaísmo | B | Implementada; comunismo antirrevisionista exhaustivo. |
| 25 | `Left Wing Nationalism` | Nacionalismo de izquierda | C | Familia/overlay territorial; no coordenada económica única. |
| 26 | `Pancasila` | Pancasila indonesia | E | Filosofía estatal nacional y multietápica. |
| 27 | `Ba'athism` | Baazismo | E | Familia árabe nacional-desarrollista por país y fase. |
| 28 | `Vichy Fascism` | Régimen de Vichy | E | Régimen/colaboracionismo histórico francés. |
| 29 | `Falangism` | Falangismo/nacionalsindicalismo | A | Implementado como FE de las JONS 1934, separado de franquismo y corporativismo genérico. |
| 30 | `Showa Statism` | Estatismo Shōwa | E | Contexto imperial japonés, no doctrina universal. |
| 31 | `Neo Fascism` | Neofascismo | B | Corriente posbélica real, sensible y exhaustiva. |
| 32 | `Authoritarian Capitalism` | Capitalismo autoritario | C | Tipo/descriptor de régimen, no identidad suficiente. |
| 33 | `Populism (Right)` | Populismo de derecha | C | Populismo separado de nativismo y autoritarismo. |
| 34 | `Anti Revisionism` | Antirrevisionismo comunista | C | Posición intrafamiliar; puede desembocar en hoxhaísmo, maoísmo u otras ramas. |
| 35 | `National Communism` | Nacionalcomunismo | B | Familia sincrética exhaustiva; no una sola doctrina. |
| 36 | `Maoism` | Maoísmo/pensamiento Mao Zedong | B | Exhaustiva; distinguir de MLM y Pensamiento Gonzalo. |
| 37 | `Strasserism` | Strasserismo | B | Rama nazi histórica sensible; economía aislada no la hace “de izquierda”. |
| 38 | `Technocracy` | Tecnocracia | C | Criterio de decisión/selección de élites, compatible con múltiples ideologías. |
| 39 | `Sikh Theocracy` | Teocracia sij | C | Polo religión–Estado contextual; no zona económica. |
| 40 | `Mugabeism` | Mugabismo | E | Etiqueta personalista de Zimbabue, por periodos. |
| 41 | `Buddhist Theocracy` | Teocracia budista | C | Modelo religión–Estado demasiado general; estudiar país concreto. |
| 42 | `Hindutva` | Hindutva/nacionalismo hindú | E | Corriente india contextual; no sinónimo de hinduismo o teocracia. |
| 43 | `Hindu Theocracy` | Teocracia hindú | C | Polo institucional religioso, no ideología económica. |
| 44 | `Christian Theocracy` | Teocracia cristiana | C | Polo institucional; separar democracia cristiana y confesionalidad. |
| 45 | `Islamic Theocracy` | Teocracia islámica | C | Modelos nacionales muy diferentes; no homogenizar islam. |
| 46 | `Imperialism` | Imperialismo | C | Política/sistema de dominación exterior, no doctrina integral. |
| 47 | `Marxist Leninism` | Marxismo-leninismo | A | Hueco P1 por utilidad para el ecosistema comunista español. |
| 48 | `CapCom` | “Capitalist communism”/CapCom | F | Abreviatura internética ambigua y contradictoria sin referente delimitado. |
| 49 | `Chavism` | Chavismo | E | Movimiento venezolano personal/nacional y multietápico. |
| 50 | `Arab Socialism` | Socialismo árabe | E | Familia histórica regional; no se proyecta sin módulo panárabe. |
| 51 | `Titoism` | Titoísmo/autogestión yugoslava | E | Variante histórica nacional; puede inspirar ficha P2. |
| 52 | `Monarcho Communism` | Monarco-comunismo | F | Cruce de internet sin tradición estable; casos históricos van bajo su nombre real. |
| 53 | `General Authoritarianisms` | Autoritarismo general | C | Rasgo de concentración/antipluralismo, no ideología. |
| 54 | `Pan Arabism` | Panarabismo | E | Proyecto supranacional contextual. |
| 55 | `Pan turkism` | Panturquismo | E | Proyecto supranacional contextual. |
| 56 | `Trumpism` | Trumpismo | E | Movimiento personalista estadounidense por periodos. |
| 57 | `Aristocracy` | Aristocracia | C | Forma de gobierno/élite, sin economía única. |
| 58 | `Feudalism` | Feudalismo | E | Sistema socioeconómico histórico, no opción ideológica contemporánea. |
| 59 | `Leninism` | Leninismo | B | Tradición histórica amplia; el P1 serio es ML ortodoxo con discriminantes. |
| 60 | `Conservative Socialism` | Socialismo conservador | B | Familia real pero heterogénea; exhaustiva y con fuente concreta. |
| 61 | `Black Nationalism` | Nacionalismo negro | E | Familia afrodiásporica contextual con ramas incompatibles. |
| 62 | `Castroism` | Castrismo | E | Estado/movimiento cubano por periodos. |
| 63 | `Dengism` | Denguismo | E | Estrategia/periodo chino; no sinónimo de socialismo de mercado. |
| 64 | `Longism` | Longismo (Huey Long) | E | Etiqueta personalista estadounidense. |
| 65 | `State Liberalism` | Liberalismo estatal | F | Rótulo no normalizado; puede significar desarrollismo, liberalismo autoritario u otra cosa. |
| 66 | `Elective Monarchism` | Monarquía electiva | C | Forma de selección de jefatura, no ideología integral. |
| 67 | `Paleo Conservatism` | Paleoconservadurismo | B | Corriente estadounidense real, solo modo exhaustivo. |
| 68 | `Hamiltonianism` | Hamiltonianismo | E | Tradición institucional/económica estadounidense contextual. |
| 69 | `Pinochetism` | Pinochetismo | E | Régimen/movimiento chileno histórico y sensible. |
| 70 | `Collectivism` | Colectivismo | C | Rasgo sobre propiedad/primacía colectiva; demasiado amplio. |
| 71 | `Trotskyism` | Trotskismo | A | Implementada y relevante para pluralidad comunista española. |
| 72 | `Agrarianism` | Agrarismo | B | Familia programática real; requiere variante española concreta para subir a A. |
| 73 | `Guevarism` | Guevarismo | E | Estrategia/tradición revolucionaria latinoamericana contextual. |
| 74 | `Ho Chi Minh Thought` | Pensamiento Ho Chi Minh | E | Tradición nacional vietnamita; baja relevancia española. |
| 75 | `Religious Democracy` | Democracia religiosa | C | Compatibilidad democracia–religión; necesita tradición concreta. |
| 76 | `Statism` | Estatismo | C | Faceta sobre alcance/dirección estatal. |
| 77 | `Kuomintangism` | Kuomintangismo/Tridemismo | E | Tradición nacional china/taiwanesa, no prioridad española. |
| 78 | `Constitutional Monarchism` | Monarquismo constitucional | C | Posición real en modelo de Estado; no región del primer plano. |
| 79 | `Zionism` | Sionismo | C | Familia territorial/geopolítica; no forzar a Economía×Sociedad. |
| 80 | `Neo Conservatism` | Neoconservadurismo | B | Corriente principalmente estadounidense; ficha exhaustiva y geopolítica. |
| 81 | `Banana Republicanism` | “Republicanismo bananero” | F | Giro peyorativo/meme derivado de “república bananera”, no doctrina. |
| 82 | `Menshevism` | Menchevismo | E | Corriente histórica rusa; contexto. |
| 83 | `Republicanism` | Republicanismo | C | Familia y posición de jefatura; España requiere variante federal/cívica delimitada. |
| 84 | `Gaddafism` | Gadafismo/Tercera Teoría Universal | E | Régimen/teoría libia contextual. |
| 85 | `Gorbachevism` | Gorbachovismo | E | Periodo/estrategia soviética de reforma. |
| 86 | `Labourism` | Laborismo | E | Tradición británica y sindical-parlamentaria contextual. |
| 87 | `Liberalism` | Liberalismo | A | Familia central; ya existe referencia clásica y faltan ramas españolas. |
| 88 | `Progressive Conservatism` | Conservadurismo progresista | B | Corriente real dependiente de país/época; exhaustiva. |
| 89 | `Liberal Conservatism` | Conservadurismo liberal europeo | A | Familia relevante para España y Europa; referencia implementada, separada de partidos concretos. |
| 90 | `Conservatism` | Conservadurismo | A | Referencia clásica implementada. |
| 91 | `Communalism` | Comunalismo/municipalismo libertario | A | Implementado como comunalismo bookchiniano maduro; sin economía inventada. |
| 92 | `Left Communism` | Comunismo de izquierda | B | Exhaustivo; ya se divide seriamente en bordiguismo y consejismo. |
| 93 | `Anti Capitalism` | Anticapitalismo | C | Negación transversal con alternativas incompatibles. |
| 94 | `General Socialism` | Socialismo general | C | Familia demasiado amplia para un punto. |
| 95 | `Distributism` | Distributismo | A | Referencia implementada y útil en España católico-social. |
| 96 | `Centrism` | Centrismo | C | Posición relacional/estrategia, no paquete doctrinal estable. |
| 97 | `National Liberalism` | Liberalismo nacional | B | Corriente real, pero exige variante y país; exhaustiva. |
| 98 | `General Capitalism` | Capitalismo general | C | Sistema económico amplio, no identidad política suficiente. |
| 99 | `Anti Communism` | Anticomunismo | C | Rechazo compartido por liberalismo, socialdemocracia, fascismo y anarquismo por motivos distintos. |
| 100 | `Dark Enlightenment` | Ilustración Oscura/neorreacción | B | Corriente real de nicho, antidemocrática/elitista; modo exhaustivo sin inflarla. |
| 101 | `Social Darwinism` | Darwinismo social | E | Doctrina histórica, no biología ni zona contemporánea. |
| 102 | `Progressivism` | Progresismo | C | Orientación al cambio dependiente de época y tema. |
| 103 | `Third Way` | Tercera vía | B | Corriente programática real; ficha secundaria, no zona española principal. |
| 104 | `Girondism` | Girondinismo | E | Facción/tradición de la Revolución francesa; contexto histórico. |
| 105 | `Kleptocracy` | Cleptocracia | C | Patología institucional, no ideología elegible. |
| 106 | `Council Communism` | Comunismo de consejos | B | Implementada; referencia exhaustiva real. |
| 107 | `Democratic Confederalism` | Confederalismo democrático | A | P1 exhaustivo de alto valor para poder territorial y de base. |
| 108 | `Greenism` | Ecologismo verde | A | Familia relevante, pero dividida por propiedad, nuclear y crecimiento. |
| 109 | `Social Democracy` | Socialdemocracia | A | Referencia implementada y familia central española. |
| 110 | `Social Liberalism` | Liberalismo social | A | Familia relevante para centroizquierda liberal; pendiente de ficha. |
| 111 | `Neo Liberalism` | Neoliberalismo | A | Familia programática relevante si se define sin uso peyorativo. |
| 112 | `Green Libertarianism` | Libertarismo verde | B | Cruce real pero minoritario; exhaustivo. |
| 113 | `Confederalism` | Confederalismo | C | Modelo territorial/institucional, no ideología económica. |
| 114 | `Laissez Faire Capitalism` | Capitalismo laissez-faire | B | Tipo ideal económico exhaustivo; no determina pluralismo o moral. |
| 115 | `Transhumanism` | Transhumanismo | C | Faceta tecnológica/bioética con variantes políticas opuestas. |
| 116 | `Luxemburgism` | Luxemburgismo | A | Implementado con 24 anclas y proyección Economía × Poder. |
| 117 | `Liberal Socialism` | Socialismo liberal | B | Corriente real, secundaria frente a socialismo democrático/social liberalismo. |
| 118 | `Utopian Socialism` | Socialismo utópico | E | Familia histórica pre/marxista. |
| 119 | `Democratic Socialism` | Socialismo democrático pluralista | A | Referencia implementada entre socialdemocracia y revolución; no agota todas las variantes. |
| 120 | `Social Libertarianism` | Libertarismo social | B | Etiqueta amplia y solapada; exhaustiva si se normaliza. |
| 121 | `Libertarianism` | Libertarismo | C | Familia paraguas; Espectro debe mostrar ramas concretas, no un punto único. |
| 122 | `Distributist Libertarianism` | Distributismo libertario | B | Variante nicho; no heredar posiciones del distributismo general. |
| 123 | `Classical Liberalism` | Liberalismo clásico | A | Referencia implementada y relevante. |
| 124 | `Marxism` | Marxismo | C | Familia/método crítico amplio; las ramas proporcionan discriminación. |
| 125 | `Gandhism` | Gandhismo | E | Tradición india contextual; no prioridad española ni simple pacifismo. |
| 126 | `Syndicalism` | Sindicalismo | D | Estrategia/familia organizativa con ramas revolucionarias, reformistas y nacionales. |
| 127 | `Anti Authoritarianism` | Antiautoritarismo | C | Faceta de dispersión del poder; no ideología completa. |
| 128 | `Astro Libertarianism` | Astrolibertarismo | F | Rótulo internético/nicho sin cuerpo doctrinal suficiente. |
| 129 | `National Libertarianism` | Libertarismo nacional | B | Cruce minoritario que exige definición y país. |
| 130 | `Paleo Libertarianism` | Paleolibertarismo | B | Corriente libertaria estadounidense exhaustiva. |
| 131 | `Situationism` | Situacionismo | E | Movimiento artístico-político histórico. |
| 132 | `Market Socialism` | Socialismo de mercado | A | Implementado en la variante de Democracia Económica de Schweickart. |
| 133 | `Left Rothbardianism` | Rothbardianismo de izquierda | B | Corriente de mercado antiautoritaria minoritaria. |
| 134 | `Neozapatismo` | Neozapatismo | E | Movimiento/autonomía chiapaneca contextual; puede inspirar facetas. |
| 135 | `Libertarian Feminism` | Feminismo libertario | B | Rama real pero plural; modo exhaustivo. |
| 136 | `Korwinism` | Korwinismo | E | Etiqueta personalista polaca; baja relevancia española. |
| 137 | `Christian Libertarianism` | Libertarismo cristiano | B | Cruce doctrinal minoritario; religión no implica teocracia. |
| 138 | `Propertarianism` | Propertarianismo | B | Prioridad radical de propiedad; exhaustivo y solapado con otros libertarismos. |
| 139 | `Libertarian Socialism` | Socialismo libertario | A | Familia relevante, pero debe desglosarse en ramas para el matching. |
| 140 | `Libertarian Market Socialism` | Socialismo libertario de mercado | B | Subrama real, secundaria tras socialismo de mercado general. |
| 141 | `Mandelaism` | Mandelaísmo/mandelismo **ambiguo** | F | La imagen no permite saber si alude a Nelson Mandela o Ernest Mandel. |
| 142 | `Antifa` | Antifascismo militante | D | Movimiento/estrategia heterogénea, no corriente coherente única. |
| 143 | `Georgism` | Georgismo | B | Referencia real y discriminante cuando exista el ítem de valor del suelo. |
| 144 | `Objectivism` | Objetivismo randiano | B | Filosofía/corriente real, nicho exhaustivo. |
| 145 | `Bleeding-Heart Libertarianism` | Libertarismo compasivo | B | Corriente académica anglófona, baja relevancia española. |
| 146 | `Neo Libertarianism` | Neolibertarismo | F | Rótulo ambiguo sin variante, país ni periodo. |
| 147 | `Minarchism` | Minarquismo | A | Referencia implementada y útil para separar liberalismo/ancap. |
| 148 | `Accelerationism (Left)` | Aceleracionismo de izquierda | B | Corriente filosófica sobre tecnología/cambio que requiere definición; no equivale a terrorismo. |
| 149 | `Anarcho communism` | Anarcocomunismo | A | Referencia implementada y central en historia española. |
| 150 | `Minarcho Socialism` | Socialismo minarquista | F | Cruce internético/no normalizado; las proposiciones válidas ya viven en facetas. |
| 151 | `Platformism` | Plataformismo/especifismo | A | Implementado como plataformismo clásico de Dielo Truda; no heredado al especifismo actual. |
| 152 | `Anarcho Pacifism` | Anarcopacifismo | A | Implementado en variante tolstoyana; fuera del mapa económico. |
| 153 | `Mutualism` | Mutualismo | A | Referencia implementada. |
| 154 | `Religious Anarchism` | Anarquismo religioso | B | Familia real y plural, solo exhaustivo. |
| 155 | `Anarcho Fascism` | “Anarcofascismo” | F | Contradicción internética sin tradición estable delimitada. |
| 156 | `Agorism` | Agorismo | B | Corriente real de estrategia contraeconómica; necesita ítem propio. |
| 157 | `Anarcho Monarchism` | “Anarcomonarquismo” | F | Cruce internético; monarquía simbólica/privada puede medirse sin esta etiqueta. |
| 158 | `Pink Capitalism` | Capitalismo rosa | D | Estrategia comercial/coalición de mercado y derechos LGTB, no corriente coherente. |
| 159 | `Anarcho capitalism` | Anarcocapitalismo rothbardiano | A | Referencia implementada; familia de libertarismo de mercado radical. |
| 160 | `Accelerationism (Right)` | Aceleracionismo de derecha | B | Rótulo amplio; separar neorreacción filosófica del arquetipo terrorista neonazi. |
| 161 | `Anarcho Posadism` | “Anarcoposadismo” | F | Meme que combina ramas incompatibles; Posadismo serio ya está separado. |
| 162 | `Anarcho Syndicalism` | Anarcosindicalismo | A | Referencia implementada y máxima relevancia histórica española. |
| 163 | `Anarcha Feminism` | Anarcofeminismo | B | Rama real; modo exhaustivo, con Mujeres Libres como posible conexión española. |
| 164 | `Queer Anarchism` | Anarquismo queer | B | Rama real contemporánea; requiere módulo y fuentes propios. |
| 165 | `Anarcho Collectivism` | Anarquismo colectivista | A | Implementado en variante Bakunin-Guillaume; `N1` queda como mejora discriminante. |
| 166 | `Eco Anarchism` | Ecoanarquismo/ecología social | B | Familia real; la rama comunalista útil se prioriza en A. |
| 167 | `Egoism` | Egoísmo anarquista/stirneriano | B | Corriente filosófica real, exhaustiva. |
| 168 | `Individualist Anarchism` | Anarquismo individualista | A | Referencia implementada. |
| 169 | `Voluntaryism` | Voluntarismo político | B | Corriente libertaria real pero muy solapada. |
| 170 | `Hoppeanism` | Hoppeanismo | B | Corriente nicho exhaustiva y sensible por exclusión/orden social en algunas lecturas. |
| 171 | `Anarcho Darwinism` | “Anarcodarwinismo” | F | Meme sin tradición estable; no gamificar dominación por fuerza. |
| 172 | `Soulism` | Soulism/ego-comunalismo de foro | F | Creación de polcompball, no doctrina académica. |
| 173 | `Anarcho Nazbol` | “Anarco-nazbol” | F | Meme/contradicción sin tradición estable. |
| 174 | `Anarcho primitivism` | Anarcoprimitivismo | B | Corriente real exhaustiva; exige pregunta sobre civilización industrial. |
| 175 | `True Anarchism` | “Anarquismo verdadero” | F | Gatekeeping, no nombre doctrinal. |
| 176 | `Anarcho Frontierism` | “Anarcofronterismo” | F | Rótulo de foro/ficción sin corpus estable. |
| 177 | `Illegalism` | Ilegalismo histórico | D | Táctica/corriente histórica minoritaria, no programa político total. |
| 178 | `Avaritionism` | Avaricionismo | F | Ideología meme creada en comunidades polcompball; excluida. |

**Control de integridad del inventario original:** 178 etiquetas legibles, una decisión inicial A–F por etiqueta: **28 A**, **50 B**, **35 C**, **5 D**, **38 E** y **22 F**. Estas letras conservan la trazabilidad de la primera criba, no son ya un veto automático: los modelos, movimientos y contextos reales pueden aparecer en profundidad con cautela. La capa principal sigue limitada a las 28 A y ninguna región editorial se convierte por ello en punto psicométrico.

## 5. Cómo convertir la taxonomía en preguntas sin convertir el test en trivia

### 5.1 Proposiciones latentes, nunca nombres de ideología

Una pregunta debe medir una decisión política comprensible aunque la persona no conozca a Posadas, Pannekoek, Rothbard o Vázquez de Mella. No deben aparecer formulaciones como «¿apoyas el posadismo?» o «¿eres plataformista?». Se pregunta por la proposición latente:

- quién posee y dirige la empresa;
- partido, sindicato, consejos o representantes electos;
- pluralismo, mando y revocación;
- reforma, acción directa o violencia;
- Estado central, federación, confederación y derecho de salida;
- neutralidad religiosa, confesionalidad o veto doctrinal;
- crecimiento, suficiencia, tecnología y nuclear civil;
- impuestos, y **por qué** se rechazan;
- nación cívica, cultural o étnica;
- intervención exterior, armas y alianzas.

Una referencia se deriva de la **configuración** de varias respuestas, nunca de una palabra clave o pregunta icónica.

### 5.2 Enrutado condicional reservado a decisiones esenciales

Las subpreguntas son útiles cuando una respuesta principal tiene razones opuestas. Deben activarse solo en el modo exhaustivo y tras una respuesta fuerte, no por curiosidad doctrinal. Ejemplos:

| Puerta esencial | Si la respuesta es fuerte… | Subpreguntas discriminantes existentes |
|---|---|---|
| `lab-009`, «los impuestos son robo» | Preguntar el motivo, sin presuponer derecha o izquierda. | `lab-010` propiedad/consentimiento; `lab-011` no cambian control de empresa; `lab-012` aportaciones laborales; `lab-013` cuantía/uso, no existencia. |
| `izq-001`, ruptura revolucionaria | Separar organización y límites. | `izq-002` vanguardia; `izq-003` consejos; `izq-008` acción directa; `lim-006` civiles/crítica. |
| `dem-011`, sustituir parlamentarismo | Separar democracia radical, representación orgánica y partido único. | `dem-017`, `dem-018`, `dem-019`, `dem-020`. |
| `izq-007`, abolir incluso el Estado obrero | Separar propiedad y coordinación. | `lab-017`, `lib-002`, `izq-038`, futuro `N1/N2`. |
| `dr-025`, rechazo/aceptación de violencia política | Solo si hay desacuerdo fuerte, distinguir límites sin operacionalizar. | `lim-002`, `lim-003`, `lim-006`; `lim-004` únicamente en módulo sensible. |
| `rel-002`, aconfesionalidad | Si se rechaza hacia uno u otro polo, separar ateísmo estatal, confesionalidad y teocracia. | `rel-001`, `dr-011`, `rel-003`. |
| `dem-034`, confederación | Distinguir delegación limitada de derecho unilateral de salida. | `dem-035`, `ter-002`. |
| `ene-010`/`ene-011`, límites o crecimiento verde | Separar propiedad, tecnología y veto territorial. | `ene-001`, `va-008`, `ene-012`, `N6` solo tras rechazo radical de civilización industrial. |

La subpregunta no “suma puntos secretos” a una etiqueta. Añade evidencia a facetas y, después, el comparador calcula coincidencias y diferencias con varios tipos ideales.

### 5.3 Modo rápido

El modo rápido no debe contener Posadismo, Gonzalo, Juche, Dark Enlightenment, Vichy, Hoppe ni ninguna rareza por su nombre o por un ítem caricaturesco. Debe maximizar información transversal. Un núcleo de alto valor puede cubrir:

1. redistribución/propiedad;
2. mercado frente a dirección pública;
3. poder laboral/gestión de empresa;
4. reforma frente a ruptura;
5. pluralismo y contrapesos;
6. centralismo–autonomía–federación/confederación;
7. religión–Estado;
8. inmigración/pertenencia con lenguaje no estigmatizante;
9. ecología, crecimiento y nuclear civil como decisiones separadas;
10. alianzas/intervención y uso de la fuerza;
11. libertades civiles;
12. democracia directa/representativa.

Al terminar, debe ofrecer: «Ver resultado provisional» o «Continuar al exhaustivo». La segunda opción conserva todas las respuestas, administra solo ítems no contestados y presenta la cobertura de cada faceta. Una coincidencia doctrinal nicho se calcula únicamente cuando su módulo ha aportado cobertura suficiente.

## 6. Arquitectura visual recomendada

### 6.1 No recrear el mosaico de Reddit

La alternativa seria es un explorador por capas:

1. **Perfil personal por facetas**, con posición, cobertura, respuestas que empujan a ambos polos y estado conceptual/piloto/validado.
2. **Familias A**, en un mapa secundario limpio y con número limitado de rótulos; al hacer zoom aparecen ramas.
3. **Referencias B/E**, en un panel “Explorar doctrinas” filtrable por familia, país, periodo y sensibilidad.
4. **Movimientos D y formas C**, como chips o capas temáticas —territorio, modelo de Estado, religión, ecología, tecnología, método—, no como territorios coloreados.
5. **F**, únicamente en documentación editorial; nunca en el resultado del usuario.

Si una referencia tiene evidencia suficiente solo en facetas, se muestra una tarjeta sin coordenada. Si tiene dos macroejes, puede aparecer en 2D con advertencia. Solo entra en el cubo con los tres macroejes medidos. El aceleracionismo neonazi no se publica en mapa porque su economía no es definitoria.

### 6.2 Evitar solapes semánticos y visuales

- Un nodo de familia no compite en distancia con su propia rama (`anarquismo` frente a `anarcocomunismo`).
- Las etiquetas históricas muestran años y país: `Titoísmo · Yugoslavia · 1948–1980`, no solo “Titoísmo”.
- Los términos controvertidos llevan descriptor: `Izquierda nacional-popular (atribución externa frecuente: “rojiparda”)`.
- Las referencias violentas no usan insignias, colores de gamificación, “logros” ni porcentajes sin cobertura.
- La proximidad geométrica nunca sustituye la lista de coincidencias y diferencias decisivas.

## 7. Advertencias metodológicas obligatorias

1. **Equifinalidad:** un marxista, una persona de extrema derecha y un ancap pueden rechazar impuestos por razones incompatibles. El valor agregado no revela el motivo; por eso existen `lab-010` a `lab-013`.
2. **Una negación no es ideología:** anticapitalismo, anticomunismo, antiautoritarismo y anti-OTAN necesitan una alternativa positiva para formar referencia.
3. **No inferir paquetes:** nuclear civil no implica armas nucleares; confesionalidad no implica teocracia; independencia no implica izquierda; mercado no implica libertades civiles.
4. **No heredar partido ↔ doctrina:** una referencia ideal y una candidatura actual son capas diferentes. Para PSOE, PP, Vox y Sumar deben seguir separados programa/teoría y conducta/declaraciones fechadas.
5. **Tiempo y país:** fascismo italiano de 1919, 1922 y Salò; carlismo de Mella y Carlos Hugo; China de Mao, Deng y la actualidad; todos requieren fichas distintas o posiciones desconocidas.
6. **No forzar simetría:** que haya cinco teocracias en la imagen no obliga a crear cinco referencias; que exista un anarcocomunismo no obliga a inventar un “anarcofascismo”.
7. **No confundir rareza con precisión:** una etiqueta muy específica puede estar peor definida y medir menos que una familia amplia con buenos discriminantes.
8. **Umbrales sensibles:** una persona no debe recibir una asociación violenta por una respuesta. Cobertura y afinidad deben ser excepcionalmente altas, con explicación y posibilidad de ocultar referencias sensibles.
9. **Validez antes de estética:** tras piloto, analizar dimensionalidad, funcionamiento diferencial, fiabilidad e ítems redundantes. Antes, hablar de orientación conceptual, no de rasgo validado.
10. **Revisión de fuentes adversarial:** cada ficha debe buscar evidencia que contradiga la codificación inicial y registrar desacuerdos historiográficos.

## 8. Backlog editorial verificable

### P1 de datos

- Crear las referencias 1–14 de la tabla P1 solo después de fichas de fuentes y revisión por pares interna.
- Añadir y probar `N1–N7`; ninguna entra en modo rápido.
- Auditar duplicados semánticos antes de aumentar el banco para que una idea no pese dos veces por redacción repetida.
- Añadir al menos un contraindicador a cada nueva referencia.
- Mantener `publicacionMapa.publicable: false` cuando economía/sociedad se infiera mal, como ya se hace con democracia cristiana, eurocomunismo y aceleracionismo neonazi.

### P1 de producto

- Filtro `España / Internacional / Histórico / Sensible` y jerarquía familia-rama.
- Cobertura visible por referencia y enlace a respuestas coincidentes/diferentes.
- Resultados provisionales del rápido con botón de continuidad al exhaustivo, sin perder estado.
- En móvil, lista/escala primero; mapa como exploración opcional. En escritorio, panel de detalle accesible por teclado y no dependiente de hover.

### P2 de investigación

- Resolver fuentes primarias/académicas de todas las filas B antes de convertirlas en JSON.
- Mantener `Mandelaism` rotulado como legado contextual de Nelson Mandela, no como doctrina cerrada ni como el mandelismo trotskista de Ernest Mandel.
- `State Liberalism` y `Astro Libertarianism` quedan excluidos por origen memético/especulativo; `Neo Libertarianism` entra solo como uso estadounidense intervencionista, con periodo y ambigüedad visibles.
- Mantener la lista F como control de procedencia, sin exponerla en la aplicación.

## 9. Historial de versiones

| Versión | Fecha | Cambio |
|---|---|---|
| `1.2.0` | 2026-07-11 | Cobertura nominal completa de las 178 etiquetas: 155 exactas visibles, 23 exclusiones justificadas y 20 adaptaciones adicionales; 175 fichas totales. |
| `1.0.0` | 2026-07-11 | Primera taxonomía maestra: 178 etiquetas auditadas, decisión A–F, P1/P2, fuentes, discriminantes y reglas para referencias sensibles. |
