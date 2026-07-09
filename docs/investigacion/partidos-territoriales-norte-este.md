# Partidos territoriales del norte y el este: estado, posiciones y propuesta de modelado

**Corte de vigencia:** 10 de julio de 2026
**Ámbito:** Catalunya, Euskadi, Navarra y Galicia
**Objetivo:** aportar una base auditable para Espectro que no confunda partidos, frentes, coaliciones, marcas electorales, componentes internos y organizaciones históricas.

## 1. Criterio y límites

Este documento no intenta adivinar una posición a partir de la etiqueta izquierda/derecha. Una respuesta sólo se puntúa cuando existe un texto oficial suficientemente próximo a la proposición. La ausencia de dato se representa con un guion, no con cero: cero significa posición realmente intermedia, ambivalente o no reducible a uno de los polos.

Escala propuesta para los ítems existentes:

| Valor | Interpretación |
|---:|---|
| +2 | adhesión expresa o consecuencia inequívoca |
| +1 | inclinación clara, pero condicionada o menos intensa |
| 0 | posición intermedia, mixta o deliberadamente transversal |
| -1 | inclinación clara en sentido contrario |
| -2 | rechazo expreso o polo contrario inequívoco |
| — | no consta con seguridad suficiente |

Confianza:

- **A:** fuente oficial vigente y formulación directa.
- **B:** fuente oficial vigente que permite una inferencia corta, o documento oficial inmediatamente anterior aún coherente con la línea actual.
- **C:** indicio secundario o inferencia amplia; se documenta, pero no debe alimentar el resultado automático.

Reglas de identidad para el producto:

1. Una **marca electoral** es un alias de la entidad o coalición que la presenta; no genera por sí sola un resultado ideológico duplicado.
2. Una **coalición o frente** puede ser resultado si compite y sostiene programa propio. Sus componentes sólo aparecen como desglose informativo, salvo que también concurran por separado.
3. Una **corriente o componente** no debe aparecer como partido elegible si carece de candidatura propia.
4. Una entidad **histórica, disuelta, inactiva o de continuidad no verificada** queda como ficha de contexto y nunca como resultado actual.
5. Una federación territorial de un partido estatal, como PSN-PSOE, se modela como una superposición territorial sobre el perfil estatal; no como un duplicado completo.
6. La actividad en una elección prueba la existencia de la candidatura en esa fecha, no necesariamente la continuidad actual de todos sus integrantes.

## 2. Línea base electoral oficial

| Territorio | Proceso | Hecho útil para el modelado | Fuente oficial |
|---|---|---|---|
| Catalunya | Parlament, 12-05-2024 | Las candidaturas proclamadas incluyen ERC, CUP-Defensem la Terra, Junts+, Comuns Sumar, Aliança Catalana, Alhora, Front Nacional de Catalunya en dos circunscripciones y Convergents en Tarragona. Son denominaciones de candidatura; no todas son partidos separados. | Generalitat, [Candidatures proclamades](https://gencat.cat/eleccions/parlament2024/es/formacions-politiques/candidatures/candidatures-proclamades/index.html), 2024 |
| Euskadi | Parlamento Vasco, 21-04-2024 | La proclamación oficial permite verificar las marcas concurrentes. El informe definitivo atribuye 27 escaños a EAJ-PNV y 27 a EH Bildu. | Gobierno Vasco, [Candidaturas presentadas](https://www.euskadi.eus/elecciones-parlamento-vasco-2024-candidaturas-presentadas/web01-a3haup24/es/) e [Informe de resultados](https://www.euskadi.eus/contenidos/informacion/w_in_24_pv_resultados/es_def/adjuntos/informe-elecciones-parlamento-vasco_2024.pdf), 2024 |
| Navarra | Parlamento de Navarra, 28-05-2023 | Reparto definitivo: UPN 15, PSN 11, EH Bildu 9, Geroa Bai 7, PPN 3, Contigo 3 y Vox 2. | Gobierno de Navarra, [Recuento definitivo](https://www.navarra.es/es/-/nota-prensa/el-recuento-del-voto-pendiente-de-las-elecciones-al-parlamento-no-altera-el-reparto-de-escanos?print=true), 02-06-2023 |
| Galicia | Parlamento de Galicia, 18-02-2024 | BNG obtuvo 25 escaños y Democracia Ourensana uno; Espazo Común Galeguista concurrió sin obtener representación. | Parlamento de Galicia, [Resultados definitivos y electos](https://www.parlamentodegalicia.es/sitios/web/AxendaParlamentaria/p_2024_03_18_docu.pdf), 2024; Xunta, [Candidaturas proclamadas](https://eleccions2024.xunta.gal/Eleccions2024_31_c-Candidaturas_proclamadas.html), 2024 |

### 2.1. Universo electoral reproducible: umbral del 0,02 %

El universo de cribado son las candidaturas de la última elección autonómica que obtuvieron al menos el 0,02 % en el total de su comunidad. No es el registro de partidos. Estar en estas tablas sólo habilita investigación; no garantiza un perfil si no hay programa y vigencia suficientes.

La columna «vigencia» se refiere a la marca exacta:

- **activa:** existe evidencia oficial posterior a la elección;
- **matriz activa:** la candidatura fue una coalición o alias de 2024, pero sus partidos continúan;
- **no verificada:** no se localizó actividad oficial posterior suficiente;
- **excepción:** queda por debajo del umbral, pero se conserva por el alcance territorial solicitado o por continuidad histórica documentada.

#### Catalunya: 12 de mayo de 2024

Fuente común: Generalitat de Catalunya, [Informe de resultados definitivos](https://gencat.cat/eleccions/resultatsparlament2024/descarregues/dossier_ca_def.pdf), pp. 7-8. La fuente distingue 3.156.470 votos válidos, 35.967 votos en blanco y **3.120.503 votos a candidaturas**. Para aplicar una regla común, los porcentajes siguientes se recalculan sobre estos últimos. El corte exacto del 0,02 % exige al menos 625 votos.

| Candidatura oficial | Tipo correcto | Votos | % | Ámbito de resultado | Vigencia de la marca al 09-07-2026 |
|---|---|---:|---:|---|---|
| PSC | partido/federación territorial | 882.589 | 28,284 | Catalunya | activa |
| CAT-JUNTS+ | coalición electoral | 681.470 | 21,838 | Catalunya | matriz activa; Junts y Demòcrates continúan, no crear «Junts+» aparte |
| ERC | partido | 431.128 | 13,816 | Catalunya | activa |
| PP | partido estatal, candidatura territorial | 347.170 | 11,125 | Catalunya | activa |
| Vox | partido estatal, candidatura territorial | 251.096 | 8,047 | Catalunya | activa |
| Comuns Sumar | coalición electoral | 184.297 | 5,906 | Catalunya | matrices activas; la marca de 2024 no es partido autónomo |
| CUP-Defensem la Terra | coalición electoral | 129.059 | 4,136 | Catalunya | matriz activa; CUP continúa, CUP-DT es alias electoral |
| Aliança Catalana | partido | 119.149 | 3,818 | Catalunya | activa |
| PACMA | partido | 34.493 | 1,105 | Catalunya | activa |
| Ciutadans-Cs | partido | 22.947 | 0,735 | Catalunya | [actividad oficial en 2026](https://www.ciudadanos-cs.org/prensa), aunque sin representación |
| Alhora | partido | 14.104 | 0,452 | Catalunya | activa |
| Frente Obrero | partido | 10.118 | 0,324 | Catalunya | [activa en 2026](https://frenteobrero.es/transparencia/) |
| PCTC | organización territorial del PCTE | 4.212 | 0,135 | Catalunya | [activa en 2026](https://www.pcte.es/territorios/catalunya/la-clase-obrera-y-el-sistema-educativo-en-cataluna/) |
| Recortes Cero | partido | 3.487 | 0,112 | Catalunya | web oficial disponible; actividad electoral posterior no verificada |
| Per un Món Més Just, PUM+J | partido | 2.760 | 0,088 | Catalunya | [partido activo en 2026](https://www.porunmundomasjusto.es/) |
| Izquierda por España, IZQP-UNIDOS-DEf | coalición de Izquierda en Positivo, Unidos por la Solidaridad Internacional y Democracia Efectiva | 1.892 | 0,061 | Catalunya | marca de 2024; continuidad conjunta no verificada |

La composición oficial de CUP-DT, Comuns Sumar, Izquierda por España y Junts+ se comprueba en Generalitat, [Coaliciones electorales constituidas](https://gencat.cat/eleccions/parlament2024/es/formacions-politiques/candidatures/coalicions-electorals/index.html). No hubo candidatura de Falange en esta elección. Front Nacional de Catalunya (269 votos; 0,008620 %) y Convergents (263; 0,008428 %) quedan documentados en el inventario cualitativo por su continuidad, pero **fuera de la convocatoria normalizada**: no alcanzan el corte y el esquema de datos no contiene una excepción genérica que describa fielmente ambos casos.

#### Euskadi: 21 de abril de 2024

Fuente común: Gobierno Vasco, [Informe oficial de resultados](https://www.euskadi.eus/contenidos/informacion/w_in_24_pv_resultados/es_def/adjuntos/informe-elecciones-parlamento-vasco_2024.pdf), pp. 3-4. El informe publica 1.052.170 votos a candidaturas y estos porcentajes.

| Candidatura oficial | Tipo correcto | Votos | % | Ámbito de resultado | Vigencia de la marca al 09-07-2026 |
|---|---|---:|---:|---|---|
| EAJ-PNV | partido | 370.554 | 35,22 | Euskadi | activa |
| EH Bildu | federación | 341.735 | 32,48 | Euskadi | activa |
| PSE-EE/PSOE | federación territorial | 149.660 | 14,22 | Euskadi | activa |
| PP | partido estatal, candidatura territorial | 97.149 | 9,23 | Euskadi | activa |
| Sumar | candidatura/partido | 35.092 | 3,34 | Euskadi | matriz activa como Sumar Mugimendua; la marca electoral no se duplica |
| Podemos-Ahal Dugu-Alianza Verde | coalición electoral | 23.679 | 2,25 | Euskadi | Podemos Euskadi activo; alianza exacta de 2024 no es entidad aparte |
| Vox | partido | 21.396 | 2,03 | Euskadi | activa |
| PACMA | partido | 5.481 | 0,52 | Euskadi | activa |
| Escaños en Blanco-Aulki Zuriak, EB-AZ | partido | 3.072 | 0,29 | Euskadi | [web y estatutos disponibles](https://esconsenblanc.org/wp-content/uploads/2022/12/EB_Estatutos_es_v7.pdf); actividad electoral posterior no verificada |
| Por Un Mundo Más Justo, PUM+J | partido | 1.628 | 0,15 | Euskadi | activa en 2026 |
| Izan | partido/candidatura | 1.412 | 0,13 | Bizkaia y Gipuzkoa | continuidad posterior no verificada |
| PCTE/ELAK | partido, candidatura territorial | 660 | 0,06 | Bizkaia | [partido activo en 2026](https://www.pcte.es/) |
| Partido Humanista, PH | partido | 471 | 0,04 | Bizkaia | [partido activo en 2026](https://partidohumanista.es/) |

La implantación parcial se contrasta con Gobierno Vasco, [Candidaturas presentadas](https://www.euskadi.eus/elecciones-parlamento-vasco-2024-candidaturas-presentadas/web01-a3haup24/es/). Ongi Etorri obtuvo 181 votos: `181 / 1.052.170 × 100 = 0,0172025 %`. El 0,02 % publicado en el informe está redondeado y no satisface el umbral exacto, que exige 211 votos; por tanto se excluye sin excepción. No hubo una candidatura falangista.

#### Navarra: 28 de mayo de 2023

Fuente común: Gobierno de Navarra, [Escrutinio general definitivo](https://www.navarra.es/es/-/nota-prensa/el-recuento-del-voto-pendiente-de-las-elecciones-al-parlamento-no-altera-el-reparto-de-escanos?print=true), 02-06-2023. La nota oficial proporciona los votos de las once candidaturas y porcentajes sobre voto válido. Al restar 5.860 blancos de los 329.861 votos válidos resultan **324.001 votos a candidaturas**; se recalculan los porcentajes sobre ese denominador. El corte exige 65 votos.

| Candidatura oficial | Tipo correcto | Votos | % | Ámbito de resultado | Vigencia de la marca al 09-07-2026 |
|---|---|---:|---:|---|---|
| UPN | partido | 92.392 | 28,516 | Navarra | activa |
| PSN-PSOE | federación territorial | 68.247 | 21,064 | Navarra | activa |
| EH Bildu | federación | 56.535 | 17,449 | Navarra | activa |
| Geroa Bai | coalición | 43.660 | 13,475 | Navarra | activa |
| PPN | organización territorial del PP | 24.019 | 7,413 | Navarra | activa |
| Contigo Navarra-Zurekin Nafarroa | coalición | 20.095 | 6,202 | Navarra | activa como espacio y grupo parlamentario; no es partido unitario |
| Vox | partido | 14.197 | 4,382 | Navarra | activa |
| Por Un Mundo Más Justo | partido | 1.740 | 0,537 | Navarra | activa en 2026 |
| Ciudadanos | partido | 1.273 | 0,393 | Navarra | partido activo en 2026; implantación navarra posterior no verificada |
| Eguzkilore | partido/candidatura | 1.261 | 0,389 | Navarra | continuidad oficial posterior no verificada |
| Voluntad Foral-Nabarra Gurea | plataforma/partido | 582 | 0,180 | Navarra | [actividad pública posterior](https://www.voluntadforal-nabarragurea.com/) |

La proclamación de las once listas consta además en Gobierno de Navarra, [Listado de candidaturas](https://www.navarra.es/es/-/nota-prensa/el-bon-publica-el-listado-con-816-candidaturas-a-las-elecciones-al-parlamento-municipios-y-concejos-del-proximo-28-de-mayo), 26-04-2023. No hubo candidatura subumbral ni falangista que añadir.

#### Galicia: 18 de febrero de 2024

Fuente común: Xunta de Galicia/Junta Electoral, [Acuerdo de resultados generales definitivos](https://www.xunta.gal/dog/Publicados/2024/20240306/AnuncioG2453-050324-1_es.html), DOG 47, 06-03-2024, y su [corrección oficial](https://www.xunta.gal/dog/Publicados/2024/20240308/AnuncioG2453-070324-1_es.html), DOG 49, 08-03-2024. La corrección fija **1.488.705 votos a candidaturas** y 1.501.757 votos válidos. La columna se recalcula con el primero y el corte exige 298 votos.

| Candidatura oficial | Tipo correcto | Votos | % calculado | Ámbito de resultado | Vigencia de la marca al 09-07-2026 |
|---|---|---:|---:|---|---|
| PP | partido estatal, candidatura territorial | 711.713 | 47,808 | Galicia | activa |
| BNG | frente | 470.692 | 31,618 | Galicia | activa |
| PSdeG-PSOE | federación territorial | 211.361 | 14,198 | Galicia | activa |
| Vox | partido | 34.045 | 2,287 | Galicia | activa |
| Sumar a Galicia | coalición/candidatura | 29.009 | 1,949 | Galicia | matrices activas; marca exacta de 2024 no es partido autónomo |
| Democracia Ourensana | partido provincial | 15.442 | 1,037 | Galicia; sólo Ourense | activa |
| PACMA | partido | 5.932 | 0,398 | Galicia | activa |
| Podemos a Galiza-Alianza Verde | coalición electoral | 4.420 | 0,297 | Galicia | Podemos activo; marca conjunta de 2024 no es entidad separada |
| Escaños en Branco | partido | 2.884 | 0,194 | Galicia | web/estatutos del partido disponibles; actividad posterior no verificada |
| Espazo Común Galeguista | coalición electoral | 1.635 | 0,110 | Galicia | continuidad conjunta no verificada |
| Por Un Mundo Máis Xusto | partido | 1.572 | 0,106 | Galicia | activa en 2026 |

Todas superan el 0,02 %. No hubo candidatura falangista ni excepción subumbral relevante en esta elección.

## 3. Catalunya

### 3.1. Inventario y vigencia

| Entidad | Naturaleza correcta | Estado al corte | Actividad verificable | Tratamiento en Espectro |
|---|---|---|---|---|
| Esquerra Republicana de Catalunya, ERC | partido | activo | Parlament 2024; XXX Congrés Nacional en 2025 | resultado actual |
| Junts per Catalunya | partido | activo | candidatura Junts+ en 2024; congreso y documentos de 2024 | resultado actual; Junts+ como alias |
| Candidatura d'Unitat Popular, CUP | organización política asamblearia | activa | candidatura CUP-Defensem la Terra en 2024 | resultado actual; CUP-DT como alias |
| Aliança Catalana | partido | activo | Parlament 2024 y representación | resultado actual |
| Catalunya en Comú | partido/espacio político | activo | candidatura Comuns Sumar en 2024 | resultado actual; Comuns Sumar como marca de coalición |
| Alhora | partido | activo | Parlament 2024; actividad municipal publicada para 2027 | resultado actual, con aviso de baja implantación electoral |
| Convergents | partido | activo | candidatura en Tarragona en 2024; actividad orgánica posterior | resultado actual, no confundir con CDC |
| Front Nacional de Catalunya, FNC | partido actual | activo | candidatura en Barcelona y Tarragona en 2024; web activa en 2026 | resultado actual, identificado como refundación contemporánea |
| Demòcrates de Catalunya | partido asociado a Junts | activo como socio/componente | presencia en el espacio Junts y en su grupo parlamentario | desglose de Junts, no resultado electoral duplicado |
| Moviment d'Esquerres de Catalunya, MESCat | partido asociado | activo como socio de Junts | acuerdo orgánico con Junts de 11-04-2025 | desglose, no candidatura separada |
| Acció per la República | organización republicana progresista | actividad organizativa; proceso de confluencia anunciado | comunicados de 2025 sobre fusión con MESCat | contexto, no resultado separado |
| Fem-ho Junts | espacio de asociación | activo | definido en la organización de Junts | relación/umbrella, nunca partido |
| Partit Demòcrata Europeu Català, PDeCAT | antiguo partido | actividad política detenida | congreso de 28-10-2023 acuerda no continuar | ficha histórica, excluida |
| Junts+, CUP-DT, Comuns Sumar | candidaturas/marcas | proceso 2024 | proclamación oficial | aliases, no entidades autónomas |
| Directe 68 | organización independentista | actividad web, sin actividad electoral reciente verificada | ideario oficial | lista de vigilancia, no resultado |

### 3.2. Perfiles

#### ERC

**Familia:** izquierda republicana, independentista, social y ecologista.
**Ámbito declarado:** Catalunya y marco nacional de los Països Catalans.
**Lectura territorial:** su objetivo final sigue siendo una república catalana independiente, pero la estrategia aprobada en 2025 prioriza reconstruir una mayoría social estable, acumular fuerza institucional y ampliar la base antes de un nuevo embate. Esto no equivale ni a renunciar al Estado propio ni a prometer una declaración unilateral inmediata.

Posiciones utilizables:

- República independiente: nac-002 = +2, A.
- Vía unilateral condicionada: nac-001 = +1, B. La meta es inequívoca; el instrumento se subordina en la estrategia vigente a mayoría, fuerza y oportunidad.
- Països Catalans: cat-005 = +1, A.
- Hacienda catalana capaz de recaudar todos los tributos: cat-002 = +2, A.
- Inmersión y centralidad vehicular del catalán: cat-001 = +2, A.
- La identidad nacional se formula como cívica e inclusiva; rechazo de xenofobia y apoyo a regularización: cat-004 = -2 y nac-003 = -2, A.
- Más competencia catalana sobre inmigración: cat-006 = +1, B. La posición favorable a gestionar acogida, permisos e integración no autoriza a atribuirle sin matiz el polo de expulsiones.
- Economía redistributiva, servicios públicos, transición verde y política industrial.
- Europeísmo crítico y defensa de mayor autonomía estratégica europea. No hay base suficiente aquí para puntuar salida de la OTAN.
- Organización congresual con participación y consultas de militancia; dem-014 = +1, B.

Fuentes:

| Fecha | Documento oficial | Evidencia empleada |
|---|---|---|
| 15-03-2025 | ERC, [Ponència política aprovada del XXX Congrés Nacional](https://static.esquerra.cat/uploads/20250324/30cgn-ponencia-politica-aprovada.pdf) | república catalana, Països Catalans, lengua, inclusión, modelo social y ecológico |
| 15-03-2025 | ERC, [Ponència estratègica aprovada](https://static.esquerra.cat/uploads/20250324/30cgn-ponencia-estrategica-aprovada.pdf) | mayoría social, acumulación de fuerza y horizonte estratégico |
| 2025 | ERC, [Estatuts](https://static.esquerra.cat/arxius/textosbasics/estatuts_2025.pdf) | naturaleza, ámbito y órganos de participación |
| 2026 | ERC, [Regularitzar és una qüestió d'humanitat, de justícia social i de país](https://www.esquerra.cat/regularitzar-es-una-questio-dhumanitat-de-justicia-social-i-de-pais/) | enfoque inclusivo de inmigración |

#### Junts per Catalunya

**Familia:** independentismo transversal, liberal-comunitario, con sensibilidad empresarial y de bienestar.
**Ámbito:** Catalunya; relación cultural y nacional con el conjunto de Països Catalans.
**Lectura territorial:** Estado propio y legitimidad del 1-O, combinados con negociación táctica y construcción de poder. La categoría Junts+ es la candidatura de 2024, no otro partido.

Posiciones utilizables:

- Estado independiente: nac-002 = +2, A.
- Vía unilateral condicionada: nac-001 = +1, B. Sus ponencias mantienen confrontación y mandato del 1-O, pero no convierten cualquier bloqueo puntual en unilateralidad automática.
- Hacienda propia y recaudación plena: cat-002 = +2, A.
- Principio de ordinalidad y bilateralidad fiscal: nac-005 = +2, A.
- Inmersión y protección reforzada del catalán: cat-001 = +2, A.
- Delegación integral de inmigración: cat-006 = +2, A.
- Defiende integración con derechos y deberes y mayor exigencia lingüística; no sostiene que la inmigración musulmana sea en sí una amenaza: cat-004 = -1, B.
- Modelo económico favorable a empresa, industria, pymes y reducción selectiva de presión fiscal, dentro de un Estado del bienestar.
- Europeísmo claro; no se asigna posición OTAN sin un mandato vigente suficientemente directo.
- Organización mediante congreso, consejo nacional y ejecutiva, con mecanismos de participación y disciplina de espacio: dem-014 = +1 y dem-015 = +1, B.

Fuentes:

| Fecha | Documento oficial | Evidencia empleada |
|---|---|---|
| 2024 | Junts, [Ponència 1: estratègia](https://web.junts.cat/wp-content/uploads/2024/10/Ponencia-1.pdf) | independencia, 1-O, confrontación y estrategia |
| 2024 | Junts, [Ponència 2: model de país](https://web.junts.cat/wp-content/uploads/2024/10/Ponencia_2.pdf) | fiscalidad, lengua, economía, Europa, inmigración |
| 2024 | Junts, [Ponència 3: organització](https://web.junts.cat/wp-content/uploads/2024/10/Ponencia-3.pdf) | órganos, afiliación y espacio asociado |
| 09-01-2025 | Junts, [Delegació integral de les competències d'immigració](https://junts.cat/actualitat/junts-per-catalunya-sabste-despres-de-pactar-la-delegacio-integral-de-les-competencies-dimmigracio-a-la-generalitat-i-la-publicacio-immediata-de-les-balances-fiscals/) | alcance reclamado de la competencia migratoria |

**Entidades relacionadas.** Demòcrates de Catalunya conserva personalidad propia y una tradición humanista/personalista e independentista; MESCat aporta una identidad socialdemócrata y mantiene doble militancia y autonomía según el acuerdo de 2025; Acció per la República se define como progresista y republicana y comunicó un proceso de fusión con MESCat. Ninguna debe duplicar a Junts en el resultado mientras no concurra separadamente.

Fuentes de relación:

- Junts, [Informe de gestió de la Secretaria General](https://web.junts.cat/wp-content/uploads/2024/10/Informe-de-gestio-SG_compressed.pdf), 2024: relación con partidos y organizaciones del espacio.
- Junts y MESCat, [Acord polític i organitzatiu](https://web.junts.cat/wp-content/uploads/2025/04/250411_NDP_Junts-i-MES.docx.pdf), 11-04-2025: doble militancia, identidad propia y comisión conjunta.
- Acció per la República, [Qui som](https://www.acciorepublica.cat/qui-som/) y [Comunicats](https://www.acciorepublica.cat/categoria/que-fem/comunicats/), consultados 09-07-2026: identidad y proceso de confluencia.
- Joves Demòcrates, [Portada y definición](https://jovesdemocrates.cat/), consultada 09-07-2026: continuidad organizativa y orientación soberanista de la organización juvenil.

#### CUP

**Familia:** izquierda independentista, anticapitalista, feminista, ecologista y municipalista.
**Naturaleza:** organización política asamblearia; CUP-Defensem la Terra es su marca electoral de 2024.
**Ámbito:** Països Catalans.

Posiciones utilizables:

- Independencia y socialismo: nac-002 = +2, A.
- Ruptura democrática y desobediencia cuando la vía institucional bloquea el mandato: nac-001 = +2, A.
- Països Catalans: cat-005 = +2, A.
- Catalán como lengua vertebradora e inmersión: cat-001 = +2, A.
- Nación cívica, antirracismo y plenos derechos para población migrante: cat-004 = -2 y nac-003 = -2, A.
- No se puntúa cat-006: reclamar competencia propia no implica aceptar el paquete permisos-expulsiones contenido en la misma pregunta.
- Economía anticapitalista, propiedad y gestión pública de sectores estratégicos, planificación ecológica y derechos laborales.
- Oposición a OTAN y militarización: def-002 = +2, A.
- Asamblea Nacional, asambleas locales, listas colectivas y limitación de cargos: dem-014 = +2 y dem-015 = -1, A/B.

Fuentes:

| Fecha | Documento oficial | Evidencia empleada |
|---|---|---|
| 2024 | CUP, [Ponència final del Procés de Garbí](https://procesdegarbi.cup.cat/wp-content/uploads/2024/09/PONENCIA-FINAL-AN-CUP.pdf) | estrategia de ruptura, socialismo, feminismo, ecología, antirracismo y marco nacional |
| 2024 | CUP, [Estatuts](https://procesdegarbi.cup.cat/wp-content/uploads/2024/07/ESTATUS-V1.pdf) | estructura asamblearia, órganos, elección y control |
| consultada 09-07-2026 | CUP, [Què és la CUP?](https://cup.cat/que-es-la-cup/) | definición pública vigente y ámbito |

#### Aliança Catalana

**Familia:** derecha nacionalista catalana, identitaria, conservadora y económicamente liberal.
**Ámbito:** Catalunya, con prioridad política en el Principat.
**Actividad:** candidatura y dos escaños en 2024.

Posiciones utilizables:

- Declaración unilateral y Estado independiente: nac-001 = +2 y nac-002 = +2, A.
- Uso de la gobernabilidad estatal como palanca soberanista: nac-006 = +2, A/B.
- Catalán como eje nacional y educativo: cat-001 = +2, A.
- Competencia integral de inmigración y preferencia nacional: cat-006 = +2, A.
- Vincula inmigración masiva, islamismo e identidad/seguridad catalanas: cat-004 = +2, A.
- Concepción lingüístico-cultural exigente de integración: nac-003 = +1, B.
- Enfoque centrado en Catalunya y no en una construcción política común de Països Catalans: cat-005 = -1, B.
- Propiedad privada, mercado, industria, familia y reducción fiscal; abolición o fuerte reducción de sucesiones: eco-009 = +2, A.
- UE y OTAN: sin puntuación por falta de una posición oficial vigente inequívoca.
- No se puntúan democracia interna o disciplina sólo a partir del organigrama.

Fuentes:

| Fecha | Documento oficial | Evidencia empleada |
|---|---|---|
| 2024 | Aliança Catalana, [Programa electoral 2024](https://aliancacatalana.cat/wp-content/uploads/2024/04/Programa-electoral-2024.pdf) | independencia unilateral, inmigración, lengua, fiscalidad, economía y valores |
| 2024 | Aliança Catalana, [Estatuts](https://aliancacatalana.cat/wp-content/uploads/2024/09/Estatuts_AC_2024.pdf) | naturaleza y órganos |
| consultada 09-07-2026 | Aliança Catalana, [Valors i presentació](https://aliancacatalana.cat/) | línea pública vigente |
| consultada 09-07-2026 | Aliança Catalana, [Comitè de govern](https://aliancacatalana.cat/comite-de-govern/) | dirección actual, sin inferir por ello democracia interna |

#### Catalunya en Comú / Comuns

**Familia:** izquierda ecosocialista, federal/plurinacional y municipalista.
**Naturaleza:** partido y espacio político; Comuns Sumar fue la candidatura de 2024.

Posiciones utilizables:

- Catalunya como nación con más autogobierno y acuerdo bilateral ratificado por la ciudadanía; no Estado independiente: nac-002 = -2, A.
- Rechazo de unilateralidad y preferencia por negociación: nac-001 = -1, A.
- Referéndum o consulta acordada: ter-002 = +1, A/B.
- Hacienda catalana más fuerte y fiscalidad justa, sin equivalencia exacta a concierto: cat-002 = +1, B.
- Inmersión y promoción del catalán: cat-001 = +1, A.
- Amnistía y desjudicialización: cat-003 = +2, A.
- Antirracismo e inclusión: cat-004 = -2, A.
- No se puntúa cat-006 porque el ítem mezcla gestión, permisos y expulsiones.
- Servicios públicos, fiscalidad progresiva, vivienda regulada y transición ecológica.
- Europeísmo reformista y pacifismo; salida de la OTAN queda sin puntuar.
- Primarias y participación interna: dem-014 = +1, B.

Fuentes:

| Fecha | Documento oficial | Evidencia empleada |
|---|---|---|
| 2024 | Comuns, [Programa Parlament 2024](https://comuns.cat/wp-content/uploads/2025/07/comuns-programa-parlament-2024.pdf) | autogobierno, lengua, amnistía, migración, economía y ecología |
| 2024 | Comuns, [Presentació del programa electoral](https://comuns.cat/comuns-sumar-presenta-el-seu-programa-electoral-per-al-12m/) | prioridades de la candidatura |
| 2024 | Comuns, [Procés de primàries del 12-M](https://comuns.cat/catalunya-en-comu-engega-el-seu-proces-de-primaries-per-escollir-candidat-o-candidata-a-les-eleccions-catalanes-del-12-de-maig/) | selección interna |

#### Alhora

**Familia:** independentismo transversal de regeneración nacional, con discurso de lengua, educación, innovación y democracia interna.
**Actividad:** concurrió en 2024 sin escaño y mantiene actividad pública y preparación municipal.

Posiciones utilizables:

- Autodeterminación llevada hasta sus últimas consecuencias y Estado propio: nac-001 = +2 y nac-002 = +2, A.
- Països Catalans: cat-005 = +2, A.
- Red escolar plenamente en catalán: cat-001 = +2, A.
- Su diagnóstico demográfico y migratorio no basta para puntuar la afirmación específica sobre inmigración musulmana; cat-004 = —.
- Economía diversificada, tecnológica y verde.
- Asamblea como órgano máximo y consejo elegido mediante primarias: dem-014 = +2, A.
- Europeísmo humanista; OTAN sin dato suficiente.

Fuentes:

- Alhora, [Portada y propuestas vigentes](https://alhora.cat/), consultada 09-07-2026: actividad, autodeterminación, lengua, educación y economía.
- Alhora, [Com ens organitzem](https://alhora.cat/com-ens-organitzem/), consultada 09-07-2026: asamblea, consejo y primarias.

#### Convergents

**Familia:** centro soberanista, liberal, europeísta y partidario del orden institucional.
**Actividad:** candidatura en Tarragona en 2024 y actividad orgánica posterior.

Posiciones utilizables:

- Plena soberanía por vía democrática, pacífica y dialogada: nac-002 = +1 y nac-001 = -1, A/B. El término soberanía no se convierte automáticamente en una promesa de Estado independiente inmediato.
- Pacto transversal para ampliar autogobierno: nac-004 = +2, A.
- Identidad abierta e integradora: cat-004 = -2, A/B.
- Europa como marco esencial: nac-007 = +2, A.
- Economía de mercado con protección social; supresión de patrimonio, donaciones y sucesiones: eco-009 = +2, A.
- No se puntúa inmersión, OTAN ni organización interna sin formulación bastante próxima.

Fuentes:

- Convergents, [Ideari](https://www.convergents.org/ideari), consultado 09-07-2026: soberanía, diálogo, Europa, identidad, fiscalidad y economía.
- Convergents, [Qui som](https://www.convergents.org/qui-som), consultado 09-07-2026: naturaleza y órganos actuales.
- Convergents, [Portada](https://www.convergents.org/), consultada 09-07-2026: continuidad orgánica y actividad en 2026.

#### Front Nacional de Catalunya

**Familia:** nacionalismo catalán identitario de derecha, independentista y soberanista.
**Advertencia de identidad:** es la organización contemporánea que concurrió en 2024; no debe confundirse con el Front Nacional de Catalunya histórico de 1940-1990.

Posiciones utilizables:

- Independencia unilateral y ruptura: nac-001 = +2 y nac-002 = +2, A.
- Marco nacional de Catalunya/Països Catalans: cat-005 = +2, A.
- Catalán y occitano como lenguas oficiales, conocimiento obligatorio y pertenencia nacional cultural exigente: cat-001 = +2 y nac-003 = +2, A.
- Moratoria migratoria y remigración; el componente específicamente musulmán del ítem aconseja limitar cat-004 a +1, B.
- Soberanía fiscal: cat-002 = +2, A.
- Europeísmo no jacobino, pero disposición a salir si impide la soberanía: nac-007 = -2, A.
- OTAN y democracia interna: —.

Fuentes:

- FNC, [Decàleg](https://elfront.cat/decaleg/), consultado 09-07-2026: independencia, lengua, soberanía, Europa y valores.
- FNC, [Immigració](https://elfront.cat/immigracio/), consultado 09-07-2026: moratoria y remigración.
- FNC, [Qui som](https://elfront.cat/qui-som/), consultado 09-07-2026: identidad de la organización actual.

#### PDeCAT: cierre de actividad

El PDeCAT no debe aparecer como resultado actual. Su web oficial informa de que el congreso de 28 de octubre de 2023 decidió poner fin a la etapa y dejar detenida la actividad política. Debe conservarse únicamente como ficha histórica con fecha de fin, separada de Junts y de Convergents.

Fuente: PDeCAT, [comunicación institucional en la web del partido](https://www.partitdemocrata.cat/), 28-10-2023; consultada 09-07-2026.

## 4. Euskadi y Navarra

### 4.1. Inventario y vigencia

| Entidad | Naturaleza correcta | Estado al corte | Actividad verificable | Tratamiento en Espectro |
|---|---|---|---|---|
| Euzko Alderdi Jeltzalea-Partido Nacionalista Vasco, EAJ-PNV | partido | activo | 27 escaños vascos en 2024; presencia navarra dentro de Geroa Bai | resultado en Euskadi; componente de coalición en Navarra |
| Euskal Herria Bildu | federación de partidos y personas adheridas | activa | 27 escaños vascos en 2024 y 9 navarros en 2023 | resultado actual |
| Sortu | partido componente de EH Bildu | activo | actividad propia y representación a través de la federación | desglose, no duplicado |
| Eusko Alkartasuna, EA | partido componente de EH Bildu | activo | actividad orgánica y preparación congresual en 2026 | desglose, no duplicado |
| Alternatiba Eraikitzen | organización política componente de EH Bildu | activa | estatutos y actividad propias | desglose, no duplicado |
| Aralar | antiguo componente | disuelto/histórico | no figura en los estatutos federales vigentes | ficha histórica |
| Unión del Pueblo Navarro, UPN | partido foralista navarro | activo | 15 escaños en 2023 | resultado actual |
| Geroa Bai | coalición electoral estable | activa | 7 escaños en 2023 | resultado actual como coalición |
| Geroa Socialverdes | partido componente de Geroa Bai | activo | estatutos y web propia | desglose |
| EAJ-PNV de Navarra | organización territorial de EAJ-PNV y componente | activa | pacto de coalición de Geroa Bai | relación, no partido nuevo |
| Atarrabia Taldea | agrupación/partido local de Villava-Atarrabia | activo como componente | pacto de coalición y actividad municipal | desglose local |
| Zabaltzen | antiguo integrante de Geroa Bai | no acreditado como componente actual | no aparece en el pacto vigente de 2023 | histórico, no componente actual |
| PSN-PSOE | federación territorial del PSOE | activa | 11 escaños en 2023 y gobierno navarro | superposición territorial |
| PP Vasco / PPN | organizaciones territoriales del PP | activas | 7 escaños vascos en 2024; 3 navarros en 2023 | superposición territorial |
| Vox Euskadi / Vox Navarra | implantaciones territoriales de Vox | activas | un escaño vasco en 2024; dos navarros en 2023 | superposición territorial |

### 4.2. Perfiles

#### EAJ-PNV

**Familia:** nacionalismo vasco democrático, humanista, gradualista y de economía social de mercado.
**Ámbito:** Euskadi y conjunto de Euskal Herria, con organizaciones territoriales diferenciadas.
**Lectura territorial:** reconoce la nación vasca y el derecho a decidir, pero su instrumento vigente es el pacto bilateral, la actualización de derechos históricos y el autogobierno efectivo.

Posiciones utilizables:

- Negociación frente a unilateralidad: nac-001 = -1, A/B.
- El programa no plantea como opción inmediata una república independiente cerrada frente al autogobierno negociado: nac-002 = -1, B.
- Actualizar derechos históricos y pacto estatutario: eus-005 = +2, A.
- Navarra forma parte de la comunidad histórica vasca en su concepción nacional, respetando la voluntad navarra: eus-001 = +1, A.
- Defensa del Concierto y Convenio y de su bilateralidad: eus-002 = +2, A.
- No propone universalizar mecánicamente el Concierto: nac-008 = -1, B.
- Euskera en administración mediante perfiles y normalización gradual: eus-003 = +1, B; no equivale a exigirlo en toda plaza.
- Europeísmo, integración y protagonismo de las naciones sin Estado: nac-007 = +2, A.
- En 2026 define la OTAN como marco de seguridad actual y reclama un pilar europeo más fuerte: def-002 = -2 y geo-004 = +2, A.
- Política industrial, competitividad, cooperación público-privada y protección social.
- Organización escalonada municipal-territorial-nacional y selección militante: dem-014 = +1 y dem-015 = +1, B.

Fuentes:

| Fecha | Documento oficial | Evidencia empleada |
|---|---|---|
| 2024 | EAJ-PNV, [Programa electoral 21A](https://www.eaj-pnv.eus/es/adjuntos-documentos/21243/pdf/programa-electoral-21a) | autogobierno, derechos históricos, Concierto, lengua, industria y bienestar |
| 2024 | EAJ-PNV, [Programa de elecciones europeas](https://www.eaj-pnv.eus/es/adjuntos-documentos/21326/pdf/programa-europeas-2024) | integración europea y naciones sin Estado |
| 2025 | EAJ-PNV, [Estatutos nacionales](https://www.eaj-pnv.eus/es/adjuntos-documentos/21676/pdf/estatutos-nacionales-2025) | ámbito, órganos y participación |
| 2026 | EAJ-PNV, [A día de hoy, la OTAN es nuestro marco de seguridad](https://www.eaj-pnv.eus/es/noticias/57437/oihane-agirregoitia-a-dia-de-hoy-la-otan-es-nuestr/), consultado 09-07-2026 | OTAN y defensa europea |

#### Euskal Herria Bildu

**Familia:** izquierda soberanista e independentista, social, feminista, ecologista y municipalista.
**Naturaleza:** federación integrada formalmente por Sortu, Eusko Alkartasuna y Alternatiba, además de personas adheridas o bilkides. No es correcto describirla como un partido unitario sin matiz.

Posiciones utilizables:

- República confederal de Euskal Herria y soberanía: nac-002 = +2, A.
- Proceso gradual, democrático y popular, con desobediencia y unilateralidad condicionadas por el bloqueo: nac-001 = +1, B.
- Navarra como parte de Euskal Herria: eus-001 = +2, A.
- La actualización foral dentro de España no es su horizonte final: eus-005 = -2, A.
- Protección de Concierto y Convenio: eus-002 = +2, A.
- Euskera como derecho y requisito proporcional en el servicio público: eus-003 = +2, A/B.
- Fin de la zonificación lingüística navarra: eus-006 = +2, A.
- Aplicación de legalidad penitenciaria ordinaria y reinserción sin excepcionalidad: eus-004 = +2, A/B.
- Economía posneoliberal, refuerzo de lo público, derechos laborales y transición ecosocial.
- Migración inclusiva, ciudadanía por residencia y antirracismo.
- Oposición a la OTAN y a la subordinación militar europea: def-002 = +2, A. Su crítica a la UE actual no equivale por sí sola a abandonar Europa: nac-007 = 0, B.
- Congreso y decisiones directas con principio de una persona, un voto; revocación y límites al peso de los partidos componentes: dem-014 = +2, A. La doble validación para decisiones estructurales impide reducir su disciplina a un polo simple.

Fuentes:

| Fecha | Documento oficial | Evidencia empleada |
|---|---|---|
| 2024 | EH Bildu, [Ponencia política](https://ehbildu.eus/media/dokumentuak/albisteak/es-1729252550.pdf) | república confederal, soberanía, modelo socioeconómico, lengua y estrategia |
| 2025 | EH Bildu, [Estatutos](https://ehbildu.eus/dokumentuak/gardentasuna/Estatutos_2025.pdf) | naturaleza federal, componentes, bilkides, voto, órganos y revocación |
| consultada 09-07-2026 | EH Bildu, [La autonomía estratégica europea es incompatible con la OTAN](https://ehbildu.eus/es/noticias/pernando-barrena-la-autonomia-estrategica-europea-es-totalmente-incompatible-con-la-pertenencia-a-un-esquema-militar-como-es-la-otan) | oposición a la OTAN |
| consultada 09-07-2026 | EH Bildu Navarra, [El no de Navarra a la OTAN sigue plenamente vigente](https://ehbildu.eus/herriak/nafarroa/es/noticias/el-no-de-nafarroa-a-la-otan-sigue-plenamente-vigente) | posición territorial navarra sobre OTAN |

**Componentes actuales:**

- **Sortu:** partido independentista, socialista, feminista y euskaltzale, con mayor énfasis en movilización y ruptura que el mínimo común federal. Fuentes: [web oficial](https://sortu.eus/) y [Herrigaia ponentzia](https://sortu.eus/es/noticias/herrigaia-ponentzia), consultadas 09-07-2026.
- **Eusko Alkartasuna:** partido socialdemócrata, soberanista y pacifista. En 2026 mantiene actividad y prepara congreso; no es una marca histórica extinguida. Fuente: EA, [Plan estratégico para ganar eficiencia y representatividad](https://www.euskoalkartasuna.eus/es/eusko-alkartasuna-inicia-un-plan-estrategico-para-ganar-eficiencia-y-representatividad/), consultado 09-07-2026.
- **Alternatiba Eraikitzen:** organización socialista, feminista y anticapitalista. Fuente: [Documentos y estatutos](https://alternatiba.net/es/documentos/), consultados 09-07-2026.

Sus diferencias sirven para explicar el pluralismo de EH Bildu, no para ofrecer tres coincidencias electorales adicionales. Aralar no figura entre los componentes de los estatutos de 2025 y debe marcarse como histórico.

#### UPN

**Familia:** derecha regionalista, foralista navarra, conservadora y liberal en economía.
**Lectura territorial:** Navarra es comunidad propia dentro de España; defiende su régimen foral y rechaza la integración política en Euskadi.

Posiciones utilizables:

- Navarra no forma una misma comunidad política con Euskadi: eus-001 = -2, A.
- Fueros y Convenio dentro del marco constitucional: eus-005 = +2 y eus-002 = +2, A.
- Rechazo de independencia y autodeterminación unilateral: nac-002 = -2 y nac-001 = -2, A.
- Mantener la zonificación y voluntariedad del euskera: eus-006 = -2, A.
- Rechazo de requisitos lingüísticos generales en empleo público: eus-003 = -2, A.
- Política de memoria y penitenciaria contraria a eliminar toda excepcionalidad sin más condiciones: eus-004 = -2, B.
- Menor presión fiscal, empresa, industria, campo y concertación social; combinación de conservadurismo social y servicios públicos forales.
- UE y OTAN quedan sin puntuación territorial propia; no se copia automáticamente la posición de otra fuerza estatal.
- El congreso permite elección directa por la afiliación; dem-014 = +1, B.

Fuentes:

- UPN, [Principios y valores](https://www.upn.org/principios-y-valores/), consultados 09-07-2026: identidad navarra, España, foralidad y marco social.
- UPN, [Programa electoral](https://elecciones.upn.org/programa/), 2023: autogobierno, Convenio, lengua, fiscalidad, memoria y economía.
- UPN, [Congreso](https://www.upn.org/congreso/) y [Estatutos](https://www.upn.org/estatutos/), consultados 09-07-2026: organización y elección.

#### Geroa Bai

**Familia:** coalición navarrista progresista, vasquista, verde, socialdemócrata y foralista.
**Naturaleza:** coalición electoral, no partido. El pacto vigente identifica como integrantes a Geroa Socialverdes, EAJ-PNV y Atarrabia Taldea.

Posiciones utilizables:

- Navarra como sujeto político con derecho a decidir y relación especial con Euskal Herria, sin adoptar como mínimo común un Estado independiente: eus-001 = +1, nac-002 = -1 y nac-001 = -1, A/B.
- Profundización pactada del autogobierno: eus-005 = +1, A.
- Convenio Económico y bilateralidad: eus-002 = +2, A.
- Supresión de la zonificación lingüística: eus-006 = +2, A.
- Mérito del euskera en toda Navarra y perfiles ajustados al puesto; no requisito para la mayoría de empleos: eus-003 = +1, B.
- Economía verde, social, cooperativa y fiscalidad progresiva.
- Derechos, acogida e integración en inmigración; reclama más competencias navarras.
- Europeísmo y defensa europea coordinada: geo-004 = +2, A. La posición sobre permanencia en OTAN no queda fijada con la misma claridad.
- La ejecutiva de coalición distribuye representación 4-4-2 y exige unanimidad en decisiones clave. Esto describe gobernanza entre componentes, no democracia interna individual.

Fuentes:

| Fecha | Documento oficial | Evidencia empleada |
|---|---|---|
| 2023/2024 | Geroa Bai, [Estatutos del pacto de coalición](https://geroabai.eus/files/2024/06/estatutos-del-pacto-de-coalicion-geroa-bai.pdf) | componentes, reparto orgánico y reglas de decisión |
| 2023 | Geroa Bai, [Programa al Parlamento de Navarra](https://geroabai.eus/files/2023/05/programa-parlamento-completo-pag-2023.pdf) | autogobierno, Convenio, lengua, economía, migración y Europa |
| consultada 09-07-2026 | Geroa Bai, [Eliminar la zonificación y valorar el euskera en toda Navarra](https://geroabai.eus/es/actualidad/geroa-bai-apuesta-por-eliminar-la-zonificacion-lingueistica-y-que-se-valore-el-euskera-como-merito-en-toda-navarra) | diferencia entre mérito y requisito |
| 2026 | Geroa Bai, [Competencias navarras en inmigración](https://geroabai.eus/es/actualidad/javi-ollo-defiende-que-navarra-avance-en-la-asuncion-de-competencias-en-materia-de-inmigracion) | orientación territorial e inclusiva |

**Componentes actuales:**

- **Geroa Socialverdes:** partido verde, socialdemócrata y municipalista; considera Navarra sujeto político y contempla relación con Euskal Herria. Sus estatutos prevén voto directo para decisiones relevantes. Fuentes: [web oficial](https://www.geroasocialverdes.eu/) y [ponencia de estatutos](https://www.geroasocialverdes.eu/wp-content/uploads/2021/03/PONENCIA-ESTATUTOS-FINAL.pdf).
- **EAJ-PNV de Navarra:** organización territorial de EAJ-PNV, no nuevo partido a duplicar.
- **Atarrabia Taldea:** actor local de Villava-Atarrabia y componente del pacto. Fuente: Geroa Bai, [Atarrabia/Villava](https://geroabai.eus/es/herrigune/villava-1), consultada 09-07-2026.

Zabaltzen perteneció a etapas anteriores, pero no figura en el pacto formal vigente y no debe mostrarse como componente actual.

#### PSN-PSOE

PSN es la federación navarra del PSOE. Sólo deben añadirse diferencias territoriales:

- Navarra foral dentro de una España plural/federal, contraria a recentralización y ruptura unilateral: eus-001 = -2, nac-001 = -2, nac-002 = -2 y eus-005 = +1, A.
- Defensa bilateral del Convenio compatible con coordinación y solidaridad: eus-002 = +1, B; no alcanza el extremo «en ningún caso armonizar».
- Mantiene la zonificación legal y combina voluntariedad, mérito e igualdad: eus-006 = -1 y eus-003 = -1, B.
- Fiscalidad progresiva, servicios públicos y economía social; europeísmo federal.

Fuentes: PSN-PSOE, [Una Navarra en convivencia, con fortaleza institucional y foral en una España plural](https://www.psn-psoe.org/propuestas/una-navarra-en-convivencia-con-fortaleza-institucional-y-foral-en-una-espana-plural/) y [Economía social, emprendimiento y desarrollo empresarial](https://www.psn-psoe.org/propuestas/economia-social-emprendimiento-y-desarrollo-empresarial/), consultadas 09-07-2026.

#### Superposiciones territoriales de PP y Vox

No se crean partidos nuevos. Sólo se añaden estos modificadores cuando el usuario selecciona Euskadi o Navarra:

| Perfil | Distinción territorial verificable | Puntuaciones prudentes | Fuente oficial |
|---|---|---|---|
| PP Vasco / PPN | Autonomía estatutaria y foral dentro de España; rechazo de ruptura; euskera como mérito ajustado al puesto y no barrera general | eus-003 = -2; eus-005 = +1; eus-002 = +1; nac-002 = -2 | PP Vasco, [Reforma del Estatuto orientada a las personas y sin ruptura](https://www.ppvasco.com/el-pp-vasco-defiende-una-reforma-del-estatuto-de-gernika-orientada-a-las-personas-y-que-evite-toda-ruptura-y-division/) y [Servicio público por encima de ideologías](https://www.ppvasco.com/de-andres-apuesta-por-un-servicio-publico-por-encima-de-ideologias/), consultadas 09-07-2026 |
| Vox Euskadi / Navarra | Centralización, oposición al nacionalismo y rechazo de requisitos lingüísticos | eus-003 = -2; eus-006 = -2; nac-002 = -2 | Vox, [Denuncia de la imposición del euskera](https://www.voxespana.es/noticias/vox-insiste-en-la-denuncia-de-la-tenaz-imposicion-del-euskera-por-parte-del-gobierno-vasco-20240221?provincia=guipuzcoa-alava-vizcaya), 21-02-2024 |

No se atribuye una posición específica sobre Concierto/Convenio a Vox sin una fuente territorial actual suficientemente inequívoca.

## 5. Galicia

### 5.1. Inventario y vigencia

| Entidad | Naturaleza correcta | Estado al corte | Actividad verificable | Tratamiento en Espectro |
|---|---|---|---|---|
| Bloque Nacionalista Galego, BNG | frente político | activo | 25 escaños en 2024; XVIII Asemblea en 2025 | resultado actual |
| Unión do Povo Galego, UPG | partido componente del BNG | activo | XVI Congreso 2024 y presencia orgánica en BNG | desglose, no duplicado |
| Movemento Arredista | colectivo/corriente organizada del BNG | activo | propuesta a la XVIII Asemblea y representación interna | desglose |
| Fronte Obreira Galega, FOGA | organización integrada en BNG | activa | protocolo de integración y representación interna vigente | desglose |
| Alicerce | colectivo interno del BNG | activo desde 2024 | constitución aprobada por el Consello Nacional | desglose |
| Galiza Nova | organización juvenil del BNG | activa | actividad propia | ala juvenil, no corriente ideológica equivalente |
| Movemento Galego ao Socialismo, MGS | denominación precedente | histórica como nombre | continuidad reorganizada en Movemento Arredista | alias histórico, no doble componente |
| Democracia Ourensana, DO | partido provincial/local | activo | un escaño gallego en 2024 y gobierno municipal en Ourense | resultado territorial actual |
| Anova-Irmandade Nacionalista | partido-movimiento | activo | actividad municipal y orgánica en 2026; no concurrió al Parlamento en 2024 | resultado doctrinal con aviso de no candidatura reciente |
| Partido Galego, PG | partido galleguista | activo | web, dirección y actividad local vigentes; sin candidatura propia al Parlamento en 2024 | resultado doctrinal secundario, no atribuirle ECG |
| Alternativa dos Veciños | partido municipal/provincial | activo | representación municipal y provincial coruñesa | perfil municipal, no candidatura autonómica 2024 |
| Espazo Común Galeguista, ECG | coalición/candidatura de 2024 | continuidad posterior no verificada | candidatura oficial, 1.635 votos y cero escaños | ficha del proceso 2024, no resultado actual automático |
| Espazo Común | partido/organización | indicios de actividad en 2025; programa oficial actual no localizado | renovación ejecutiva publicada por medio local | vigilancia; no puntuación automática |
| Compromiso por Galicia, CxG | partido integrante de ECG en 2024 | continuidad actual no verificada | presencia en candidaturas de 2024 | ficha de coalición, no partido actual sin nueva prueba |
| Unidade Local, Galicia Sempre, Coalición Galega | integrantes o adscripciones de la candidatura ECG 2024 | continuidad actual separada no verificada | afiliaciones publicadas en listas oficiales | contexto electoral, no resultados actuales |

### 5.2. Perfiles

#### Bloque Nacionalista Galego

**Familia:** frente nacionalista gallego de izquierdas, soberanista, feminista, ecologista y de base asamblearia.
**Naturaleza:** frente plural, no partido unitario. Su resultado debe representar el mínimo común aprobado por el BNG, no la posición máxima de UPG o de una corriente.

Posiciones utilizables:

- Galicia como nación y derecho de autodeterminación: ter-002 = +2, A.
- Soberanía estatal como horizonte, formulada en la práctica inmediata mediante avance nacional y autogobierno: nac-002 = +1, A/B.
- No se asigna unilateralidad: nac-001 = 0, B. La línea oficial vigente combina movilización, mayorías y acción institucional sin una regla automática de ruptura.
- Concierto económico gallego y plena capacidad fiscal: nac-008 = +2, A.
- Tarifa eléctrica gallega ligada a la condición productora: gal-002 = +2, A.
- Competencia plena sobre costa y litoral: gal-003 = +2, A.
- Planificación eólica pública, retorno local y freno a la depredación territorial: gal-004 = +2, A/B.
- Plena normalización y escolarización en gallego: gal-005 = +2, A.
- La norma común oficial es la normativa gallega vigente; la existencia de corrientes lusistas no convierte al frente entero en reintegracionista: gal-001 = 0, B.
- Fiscalidad progresiva, servicios públicos, sectores estratégicos y reindustrialización verde.
- Internacionalismo, antirracismo y derechos para población migrante.
- Oposición a OTAN y militarización: def-002 = +2, A. Crítica a la UE neoliberal con actuación en una Europa de pueblos: nac-007 = -1, B.
- Asemblea Nacional, Consello Nacional y pluralidad de colectivos; dem-014 = +2, A/B.

Fuentes:

| Fecha | Documento oficial | Evidencia empleada |
|---|---|---|
| 2025 | BNG, [Documentos definitivos da XVIII Asemblea Nacional](https://www.bng.gal/media/bnggaliza/files/2025/02/07/documentos_xviii_asemblea_definitivos_corrixido.pdf) | estrategia nacional, economía, lengua, ecología, Europa/OTAN, organización y colectivos |
| vigente, consultada 09-07-2026 | BNG, [Principios](https://www.bng.gal/estaticas/principios-do-bng.html) | nación, autodeterminación, izquierda e internacionalismo |
| 11-01-2025 | BNG, [Reformar o Estatuto para incluír un concerto económico](https://www.bng.gal/articulo/novas/bng-propon-reformar-estatuto-incluir-concerto-economico-darlle-galiza-chave-seus-cartos/20250111141812039512.html) | concierto y soberanía fiscal |
| vigente, consultada 09-07-2026 | BNG, [Programas electorais](https://www.bng.gal/estaticas/programas-eleitorais.html) | índice oficial para contrastar propuestas sectoriales |

**Componentes y corrientes formalmente activas:**

| Componente | Tipo y estado | Diferencia doctrinal útil | Fuente oficial |
|---|---|---|---|
| UPG | partido activo dentro del BNG | marxista-leninista, independentista y socialista; antiimperialismo más explícito. Para su ficha interna: nac-002 = +2 y def-002 = +2 | UPG, [XVI Congreso 2024](https://upg.gal/xvi-congreso-2024/) y [Estatutos](https://upg.gal/upg-o-partido-da-patria-e-do-socialismo/estatutos-da-upg/) |
| Movemento Arredista | colectivo organizado activo | independentista, socialista, feminista y comunista; más favorable a ruptura y democracia de base | Movemento Arredista, [Presentación](https://arredista.gal/presentacion/) y [XVIII Asemblea do BNG](https://arredista.gal/xviii-asemblea-nacional-do-bng/) |
| FOGA | organización obrera integrada | nacionalismo, socialismo y centralidad del trabajo; no tiene candidatura separada | BNG/FOGA, [Protocolo de integración](https://www.bng.gal/media/bnggaliza/files/2017/01/27/texto-protocolo-integracion-bngfoga.pdf), y representación en documentos de la XVIII Asemblea |
| Alicerce | colectivo interno constituido en 2024 | refuerzo de democracia interna, feminismo, diversidad y ecología; sin distancia territorial suficiente para un resultado propio | BNG, [Constitución do colectivo interno Alicerce](https://www.bng.gal/articulo/novas/consello-nacional-aproba-constitucion-dun-novo-colectivo-interno-alicerce/20241121164307039183.html), 21-11-2024 |

MGS debe guardarse como denominación precedente vinculada al espacio que hoy se presenta como Movemento Arredista, no como quinto componente vivo. Galiza Nova se etiqueta como juventud.

#### Democracia Ourensana

**Familia:** localismo/provincialismo ourensano, populismo municipal y pragmatismo transversal.
**Actividad:** un escaño en 2024 y poder municipal. Su autodefinición «ni de derechas ni de izquierdas, sino de Ourense» no elimina posiciones concretas, pero obliga a evitar una familia estatal por analogía.

Posiciones utilizables:

- Prioridad de Ourense y denuncia de discriminación territorial.
- Propuestas económicas mixtas: incentivos empresariales y baja fiscalidad local junto con captura pública de rentas o recursos estratégicos.
- Opción lusista/reintegracionista expresa: gal-001 = +2, A.
- No constan posiciones suficientemente completas sobre independencia/autogobierno, enseñanza lingüística, UE, OTAN o inmigración.
- La imagen de liderazgo fuerte no prueba por sí sola ausencia de democracia interna; dem-014 y dem-015 = —.

Fuentes:

- Democracia Ourensana, [Quienes somos](https://democraciaourensana.es/quienes-somos/), consultado 09-07-2026: identidad provincial y transversalidad.
- Democracia Ourensana, [Programa](https://democraciaourensana.es/programa/), consultado 09-07-2026: economía, servicios y posición lingüística.
- Democracia Ourensana, [web oficial](https://democraciaourensana.es/), consultada 09-07-2026: actividad vigente.

#### Anova-Irmandade Nacionalista

**Familia:** izquierda nacionalista, soberanista, ecosocialista, republicana y municipalista.
**Actividad:** organización vigente con trabajo municipal; no fue candidatura al Parlamento gallego en 2024.

Posiciones utilizables:

- Soberanía y proceso constituyente republicano: nac-002 = +1 y nac-001 = +1, B.
- Normalización social plena del gallego y aproximación a la lusofonía: gal-005 = +2 y gal-001 = +1, A/B.
- Economía anticapitalista/ecosocialista, defensa de lo común y servicios públicos.
- Internacionalismo, derechos migrantes y antiimperialismo.
- Oposición a OTAN: def-002 = +2, A/B.
- Asambleas locales soberanas, cargos revocables y estructura horizontal: dem-014 = +2, A.

Fuentes:

- Anova, [Que é Anova-Irmandade Nacionalista](https://www.anova.gal/nos/anova-irmandade-nacionalista/), consultada 09-07-2026: soberanía, república, izquierda y ecología.
- Anova, [Organización](https://www.anova.gal/nos/) y [Transparencia](https://www.anova.gal/transparencia/), consultadas 09-07-2026: asambleas, órganos y estatutos.
- Anova, [web oficial](https://www.anova.gal/), consultada 09-07-2026: continuidad de actividad en 2026.

#### Partido Galego

**Familia:** galleguismo moderado, verde, rural, europeísta y transversal.
**Actividad:** partido vigente con grupos y comunicación pública. No presentó candidatura propia al Parlamento en 2024 y no debe atribuirse automáticamente a la coalición ECG por la afiliación declarada de algunas personas de sus listas.

Posiciones utilizables:

- Máximo autogobierno dentro de una reordenación plural del Estado, no ruptura unilateral: nac-002 = -1 y nac-001 = -2, A/B.
- Acuerdos amplios para avanzar en autogobierno: nac-004 = +2, A.
- Europeísmo: nac-007 = +2, A.
- Promoción decidida del gallego sin adhesión oficial demostrada a la ortografía reintegracionista: gal-001 = 0 y gal-005 = +1, B.
- Más competencias gallegas sobre infraestructuras y recursos; gal-003 = +1, B.
- Economía de pymes, cooperativismo, mundo rural y sostenibilidad.
- Sin posición segura sobre OTAN o inmigración.
- Congreso, consejo y órganos electos; dem-014 = +1, B.

Fuentes:

| Fecha | Documento oficial | Evidencia empleada |
|---|---|---|
| 2022, publicada en web vigente | Partido Galego, [Tese política](https://partidogalego.gal/wp-content/uploads/2024/09/2022-TESE-POLITICA-.pdf) | autogobierno, Europa, economía, ruralidad y transversalidad |
| vigente | Partido Galego, [Estatutos](https://partidogalego.gal/wp-content/uploads/2022/12/ESTATUTOS.pdf) | naturaleza y órganos |
| 2026 | Partido Galego, [O Partido Galego coa lingua galega](https://partidogalego.gal/o-partido-galego-coa-lingua-galega/) | compromiso lingüístico actual |
| consultada 09-07-2026 | Partido Galego, [web oficial](https://partidogalego.gal/) | continuidad y dirección actuales |

#### Alternativa dos Veciños

**Familia:** municipalismo cívico de orientación social, ambiental y participativa.
**Actividad:** representación municipal y en la Deputación da Coruña; no candidatura autonómica de 2024.

Posiciones utilizables:

- Más autogobierno gallego en una España plurinacional, no independencia: nac-002 = -2, nac-001 = -1 y nac-004 = +1, A/B.
- Defensa del gallego y de la realidad cultural propia: gal-005 = +1, B.
- Servicios públicos locales, protección ambiental, transparencia y participación vecinal.
- No hay base para extrapolar una posición sobre fiscalidad estatal, UE/OTAN o inmigración.

Fuentes:

- Alternativa dos Veciños, [Liñas políticas](https://alternativadosvecinos.org/linas-politicas/), consultadas 09-07-2026: municipalismo, servicios, ambiente, autogobierno y lengua.
- Alternativa dos Veciños, [Que é Alternativa](https://alternativadosvecinos.org/que-e-alternativa/) y [Na Deputación](https://alternativadosvecinos.org/na-deputacion/), consultadas 09-07-2026: naturaleza y representación vigente.

### 5.3. Espazo Común Galeguista y sus siglas

La documentación electoral oficial sólo permite afirmar con seguridad lo siguiente:

1. **Espazo Común Galeguista** fue una coalición/candidatura en las elecciones gallegas de 2024 y obtuvo 1.635 votos, sin escaño.
2. Las listas oficiales identifican personas vinculadas a Espazo Común, Unidade Local, Galicia Sempre, Compromiso por Galicia y Coalición Galega.
3. La presencia de personas identificadas como Partido Galego fue públicamente controvertida por este último. No debe modelarse al PG como componente formal de ECG sin un pacto oficial.
4. No se ha localizado un pacto o web oficial que acredite que ECG continúe funcionando en 2026 con la misma composición.
5. Una noticia local informó de renovación ejecutiva de Espazo Común en abril de 2025; al ser fuente secundaria y faltar programa oficial vigente, sólo justifica estado «indicio de actividad», no puntuaciones ideológicas.

Fuentes:

- Xunta de Galicia, [Candidaturas proclamadas](https://eleccions2024.xunta.gal/Eleccions2024_31_c-Candidaturas_proclamadas.html), 2024.
- Xunta de Galicia, [Detalle de candidaturas, circunscripción de Lugo](https://eleccions2024.xunta.gal/ver_candidaturas_g_1.html) y [detalle de candidaturas, circunscripción de Pontevedra](https://eleccions2024.xunta.gal/ver_candidaturas_c_7.html), 2024: siglas de afiliación declaradas en las listas.
- Parlamento de Galicia, [Resultados definitivos](https://www.parlamentodegalicia.es/sitios/web/AxendaParlamentaria/p_2024_03_18_docu.pdf), 2024.
- Adiante Galicia, [Espazo Común celebra unha xuntanza e renova a súa executiva](https://www.adiantegalicia.es/actualidade/2025/04/27/espazo-comun-celebra-unha-xuntanza-e-renova-a-sua-executiva.html), 27-04-2025, fuente secundaria de confianza C.

En consecuencia, CxG, Galicia Sempre, Unidade Local y Coalición Galega pueden figurar en la genealogía de la candidatura de 2024, pero no como resultados actuales mientras no exista una prueba de continuidad posterior.

## 6. Matrices comparables

Las siguientes matrices resumen diferencias verificables; «sin dato» significa que no conviene heredar una posición por familia ideológica.

### 6.1. Catalunya

| Entidad | Independencia / federalismo | Unilateralidad / pacto | Lengua | Fiscalidad / ordinalidad | UE / OTAN | Economía | Migración | Organización |
|---|---|---|---|---|---|---|---|---|
| ERC | república independiente | acumulación de mayoría y negociación; vía propia condicionada | inmersión y catalán vertebrador | recaudación plena; soberanía fiscal | europeísta; OTAN sin dato concluyente | izquierda redistributiva, pública y verde | ciudadanía inclusiva y regularización; más gestión catalana | partido congresual y consultas |
| Junts | Estado independiente | negociación táctica y confrontación; no automatismo | inmersión, deber de conocimiento | hacienda propia y ordinalidad | europeísta; OTAN sin dato | empresa, industria y bienestar; menor presión selectiva | competencia integral, derechos y deberes, integración lingüística | congreso/consejo/ejecutiva y espacio asociado |
| CUP | independencia socialista de Països Catalans | ruptura, desobediencia y poder popular | catalán vertebrador | soberanía fiscal al servicio de redistribución | crítica de UE neoliberal; anti-OTAN | anticapitalista, planificación y propiedad pública | antirracista, ciudadanía por residencia | asamblearia, revocable y con límites |
| Aliança Catalana | independencia | unilateralidad expresa | centralidad y exigencia alta del catalán | soberanía y reducción fiscal | sin dato suficiente | mercado, propiedad, industria y familia | restricción, preferencia nacional y enfoque identitario | comité de gobierno; democracia interna sin puntuar |
| Comuns | nación con encaje plurinacional/federal | acuerdo bilateral y ratificación | inmersión con enfoque garantista | hacienda reforzada, progresividad; no concierto pleno | europeísmo reformista; pacifista, OTAN no cerrado | ecosocialista, regulación y servicios públicos | inclusiva y antirracista | primarias y participación |
| Alhora | Estado propio | autodeterminación hasta el final | escolarización plenamente catalana | sin formulación comparable suficiente | europeísta; OTAN sin dato | tecnología, educación y economía verde | diagnóstico demográfico; respuesta concreta sin puntuar | asamblea y primarias |
| Convergents | plena soberanía, formulación gradual | diálogo y pacto transversal | lengua central; modelo escolar exacto sin puntuar | supresión de patrimonio, donaciones y sucesiones | europeísmo fuerte; OTAN sin dato | liberal con protección social | identidad abierta e integración | dirección congresual; voto interno sin dato |
| FNC actual | independencia y marco pancatalán | unilateralidad | catalán/occitano oficiales y conocimiento obligatorio | soberanía fiscal y baja imposición | europeísmo condicional, Catexit posible; OTAN sin dato | nacional-liberal y conservadora | moratoria y remigración | sin dato suficiente |

### 6.2. Euskadi y Navarra

| Entidad | Independencia / foralismo | Unilateralidad / pacto | Lengua | Fiscalidad | UE / OTAN | Economía | Migración | Organización |
|---|---|---|---|---|---|---|---|---|
| EAJ-PNV | nación vasca, derecho a decidir y derechos históricos | bilateralidad y pacto | normalización con perfiles graduales | defensa fuerte de Concierto/Convenio | muy europeísta; OTAN como marco y defensa europea | social de mercado, industria y bienestar | integración y gestión territorial | municipal-territorial-nacional |
| EH Bildu | república confederal de Euskal Herria | proceso popular; unilateralidad condicionada | cooficialidad efectiva, perfiles y fin de zonificación | protege Concierto/Convenio con orientación redistributiva | eurocrítica; anti-OTAN | izquierda posneoliberal, pública y ecosocial | inclusiva, antirracista y ciudadanía por residencia | federación; una persona/un voto y revocación |
| UPN | Navarra foral dentro de España | constitucionalismo y rechazo de ruptura | voluntariedad, zonificación y no requisito general | defensa fuerte del Convenio; menor presión | sin distinción territorial documentada | liberal-conservadora con servicios forales | sin posición diferencial bastante | congreso y elección directa afiliada |
| Geroa Bai | Navarra sujeto político, vasquista y foral | profundización pactada | fin de zonificación; mérito general y perfil proporcional | defensa bilateral del Convenio | europeísta y favorable a defensa europea; OTAN sin dato | verde, socialdemócrata y cooperativa | acogida, integración y más competencia navarra | coalición 4-4-2; unanimidad clave |
| PSN-PSOE | Navarra foral en España plural/federal | pacto y rechazo de unilateralidad | zonificación vigente y voluntariedad | Convenio bilateral con coordinación/solidaridad | europeísmo federal; hereda resto del PSOE | socialdemocracia y economía social | hereda perfil estatal con gestión navarra | federación territorial del PSOE |
| PP Vasco / PPN | autonomía y foralidad españolas | pacto estatutario, no secesión | mérito, no barrera general | acepta régimen propio; coordinación estatal | hereda perfil estatal salvo prueba territorial | centroderecha | hereda perfil estatal | capa territorial |
| Vox Euskadi / Navarra | unidad y recentralización | rechazo absoluto de secesión | oposición a requisitos y zonificación promotora | posición territorial específica no fijada aquí | hereda perfil estatal | derecha nacional | hereda perfil estatal | capa territorial |

### 6.3. Galicia

| Entidad | Independencia / autogobierno | Unilateralidad / pacto | Lengua | Fiscalidad / recursos | UE / OTAN | Economía | Migración | Organización |
|---|---|---|---|---|---|---|---|---|
| BNG | soberanía y autodeterminación; avance de autogobierno | mayorías, movilización e instituciones | normalización plena; norma común no reintegracionista | concierto, tarifa propia y recursos | Europa de pueblos, crítico con UE neoliberal; anti-OTAN | izquierda transformadora y reindustrialización verde | inclusiva y antirracista | frente asambleario y plural |
| UPG, componente | independencia socialista | ruptura y antiimperialismo más explícitos | normalización; sensibilidad lusófona variable | planificación socialista | anti-UE neoliberal y anti-OTAN | marxista-leninista | internacionalista | partido dentro del frente |
| Movemento Arredista, corriente | independencia socialista | democracia de base y ruptura | normalización con mayor cercanía reintegracionista | soberanía económica | antiimperialista | comunista, feminista y ecologista | antirracista | colectivo interno |
| Democracia Ourensana | provincialismo, modelo nacional sin dato | pragmatismo local | reintegracionismo/lusismo | fiscalidad local baja y rentas públicas selectivas | sin dato | mezcla localista | sin dato | partido con estatutos no localizados públicamente |
| Anova | soberanía y república | proceso constituyente y movilización | normalización y aproximación lusófona | soberanía económica y comunes | antiimperialista y anti-OTAN | ecosocialista/anticapitalista | inclusiva | horizontal, asamblearia y revocable |
| Partido Galego | máximo autogobierno plural | pacto transversal | promoción fuerte, no reintegracionismo probado | más capacidad e infraestructuras | europeísta; OTAN sin dato | verde, rural, pyme y cooperativa | sin dato | congreso y consejo |
| Alternativa dos Veciños | más autogobierno plurinacional | negociación | defensa del gallego | municipal; sin posición estatal completa | sin dato | servicios y ambiente | sin dato | municipalismo participativo |
| ECG 2024 | programa común actual no verificable | sin dato | sin dato | sin dato | sin dato | sin dato | sin dato | coalición electoral de continuidad incierta |

## 7. Correspondencia consolidada con ítems existentes

Esta tabla contiene sólo asignaciones A o B ya justificadas en las fichas. No debe transformarse un guion en cero.

### Catalunya

| Ítem | ERC | Junts | CUP | AC | Comuns | Alhora | Convergents | FNC |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| nac-001, vía unilateral condicionada | +1 | +1 | +2 | +2 | -1 | +2 | -1 | +2 |
| nac-002, Estado independiente | +2 | +2 | +2 | +2 | -2 | +2 | +1 | +2 |
| nac-003, pertenencia nacional lingüística | -2 | — | -2 | +1 | — | — | — | +2 |
| nac-004, pacto transversal | — | +1 | — | — | +1 | — | +2 | — |
| nac-005, ordinalidad | +1 | +2 | — | — | +1 | — | — | — |
| nac-006, bloquear gobernabilidad estatal | +1 | +1 | +1 | +2 | -1 | +1 | — | +1 |
| nac-007, renunciar si queda fuera de UE | — | +1 | -1 | — | +1 | — | +2 | -2 |
| cat-001, sin mínimo castellano/inmersión | +2 | +2 | +2 | +2 | +1 | +2 | — | +2 |
| cat-002, agencia y concierto propios | +2 | +2 | +2 | +2 | +1 | — | — | +2 |
| cat-003, amnistía frente a vía penal | +2 | +2 | +2 | — | +2 | +1 | +1 | +1 |
| cat-004, inmigración musulmana como amenaza | -2 | -1 | -2 | +2 | -2 | — | -2 | +1 |
| cat-005, Països Catalans | +1 | +1 | +2 | -1 | 0 | +2 | — | +2 |
| cat-006, competencia integral de inmigración | +1 | +2 | — | +2 | — | — | — | +2 |

### Euskadi y Navarra

| Ítem | EAJ-PNV | EH Bildu | UPN | Geroa Bai | PSN | PP Vasco/PPN | Vox territorial |
|---|---:|---:|---:|---:|---:|---:|---:|
| eus-001, Navarra en la misma comunidad nacional | +1 | +2 | -2 | +1 | -2 | -2 | -2 |
| eus-002, blindar Concierto/Convenio sin armonización | +2 | +2 | +2 | +2 | +1 | +1 | — |
| eus-003, euskera exigido en mayoría de empleos | +1 | +2 | -2 | +1 | -1 | -2 | -2 |
| eus-004, presos de ETA con reglas ordinarias | +1 | +2 | -2 | +1 | +1 | 0 | -2 |
| eus-005, actualizar fueros mejor que república | +2 | -2 | +2 | +1 | +1 | +1 | +1 |
| eus-006, abolir zonificación navarra | +1 | +2 | -2 | +2 | -1 | -1 | -2 |
| def-002, salir de la OTAN | -2 | +2 | — | — | -1 | -2 | -2 |
| geo-004, defensa europea común | +2 | -1 | — | +2 | +2 | +2 | -1 |

Las celdas de PSN, PP y Vox que reflejan una posición estatal se deben implementar como herencia explícita del perfil nacional, no como hallazgo territorial independiente. En eus-004, los valores distintos de EH Bildu y UPN son menos seguros que el resto: conviene mantener confianza B y mostrar la fuente al usuario avanzado.

### Galicia

| Ítem | BNG | UPG | M. Arredista | DO | Anova | Partido Galego | Alt. dos Veciños |
|---|---:|---:|---:|---:|---:|---:|---:|
| nac-001, vía unilateral condicionada | 0 | +2 | +2 | — | +1 | -2 | -1 |
| nac-002, Estado independiente | +1 | +2 | +2 | — | +1 | -1 | -2 |
| nac-004, pacto transversal de autogobierno | +1 | — | — | — | +1 | +2 | +1 |
| nac-007, renunciar si queda fuera de UE | -1 | -2 | -2 | — | -1 | +2 | — |
| nac-008, universalizar concierto / concierto propio | +2 | +2 | +2 | — | +1 | +1 | — |
| gal-001, ortografía reintegracionista | 0 | — | +1 | +2 | +1 | 0 | — |
| gal-002, tarifa eléctrica gallega | +2 | +2 | +2 | — | +1 | +1 | — |
| gal-003, competencia plena de costas | +2 | +2 | +2 | — | +1 | +1 | +1 |
| gal-004, pausa eólica hasta retorno local | +2 | +2 | +2 | — | +2 | +1 | +1 |
| gal-005, eliminar topes al gallego escolar | +2 | +2 | +2 | — | +2 | +1 | +1 |
| def-002, salir de la OTAN | +2 | +2 | +2 | — | +2 | — | — |

UPG y Movemento Arredista son desgloses explicativos del BNG; no deben competir con el BNG en el mismo cálculo de similitud salvo que exista un modo explícito de corrientes.

## 8. Huecos del cuestionario y preguntas candidatas

### 8.1. Separar meta, procedimiento y condición

El principal problema de los ítems actuales es que juntan varias decisiones. Una persona puede querer independencia y rechazar la unilateralidad, defender un referéndum pero preferir federalismo, o aceptar una declaración propia sólo tras un bloqueo permanente. Se proponen tres preguntas independientes:

| ID candidato | Pregunta | Polo -2 | Polo +2 | Seguimiento esencial |
|---|---|---|---|---|
| ter-new-01 | ¿Cuál debería ser el estatus final de tu territorio? | integración/recentralización | Estado soberano independiente | si marca autogobierno o independencia, preguntar por federación, confederación o Estado propio |
| ter-new-02 | Si el Estado rechaza indefinidamente un referéndum acordado, ¿debería abrirse una vía unilateral? | nunca | sí, incluso sin acuerdo estatal | preguntar qué umbral exige: mayoría electoral, mayoría reforzada, referéndum o movilización |
| ter-new-03 | ¿Debe un pacto de autogobierno tener primacía aunque retrase la independencia? | no, ruptura prioritaria | sí, pacto prioritario | sólo en modo exhaustivo |

Esto permite distinguir ERC/Junts/PNV/Geroa de CUP/AC/FNC y de Comuns/PSN/UPN sin convertir el fin en el método.

### 8.2. Descomponer fiscalidad territorial

| ID candidato | Pregunta | Motivo |
|---|---|---|
| fis-ter-01 | ¿Debe el territorio recaudar todos los impuestos y aportar después una cuota pactada al Estado? | diferencia concierto pleno de agencia parcial |
| fis-ter-02 | ¿Debe garantizarse ordinalidad: quien aporta más no puede quedar por debajo tras redistribuir? | distingue Junts de posiciones igualitaristas o forales |
| fis-ter-03 | ¿El Concierto/Convenio debe conservar su carácter histórico particular o generalizarse? | evita interpretar defensa foral como universalización |
| fis-ter-04 | ¿Los recursos energéticos producidos en el territorio deben generar tarifa y retorno local preferente? | recoge Galicia sin mezclarlo con independencia |

Seguimiento sólo si la respuesta rechaza impuestos o redistribución: «¿Los rechazas por considerar ilegítima toda imposición, por rechazo al Estado central o porque prefieres que los recaude tu territorio?». Esta bifurcación separa ancapitalismo, nacionalismo fiscal y crítica marxista al Estado burgués.

### 8.3. Lengua: cinco decisiones, no una sola

1. Lengua vehicular escolar.
2. Mínimo obligatorio de castellano.
3. Requisito lingüístico en empleo público según contacto con ciudadanía.
4. Oficialidad y deber general de conocimiento.
5. Norma RAG/IEC frente a reintegracionismo o marcos lingüísticos amplios.

Pregunta candidata para empleo público: «¿Debe el conocimiento de la lengua propia ser requisito sólo cuando el puesto lo necesita, mérito en todos los puestos o requisito general?». Es mejor que eus-003, cuyo «la mayoría» fuerza a PNV, EH Bildu y Geroa Bai a una escala artificial.

### 8.4. Competencia migratoria frente a política migratoria

cat-006 mezcla quién decide con qué decide. Debe dividirse:

- mig-ter-01: competencia territorial sobre acogida, permisos y trabajo.
- mig-ter-02: competencia territorial sobre control fronterizo y expulsión.
- mig-ter-03: preferencia de residentes/nacionales en ayudas y vivienda.
- mig-ter-04: integración cívica, lingüística, cultural o asimilación obligatoria.

Seguimiento esencial si se apoya restringir inmigración: «¿Por qué: capacidad de servicios, salarios, seguridad, continuidad cultural/lingüística, religión o rechazo general a la inmigración?». Así no se equiparan Junts, Aliança Catalana y FNC.

### 8.5. Europa, OTAN y defensa

No se debe inferir OTAN a partir de europeísmo. Añadir:

- geo-ter-01: salida de OTAN aunque no exista defensa europea alternativa.
- geo-ter-02: ejército/defensa común de la UE.
- geo-ter-03: permanencia en UE si bloquea la independencia.
- geo-ter-04: neutralidad del eventual Estado propio.

Esto distingue PNV, Geroa Bai, CUP, EH Bildu, BNG y el europeísmo condicional del FNC.

### 8.6. Organización política

Para frentes y coaliciones hacen falta respuestas multinivel:

- quién elige candidatura: afiliación, delegados, ejecutiva o primarias abiertas;
- quién decide pactos de gobierno;
- derecho de revocación;
- límite de mandatos;
- disciplina de voto;
- veto o cuota de partidos componentes;
- posibilidad de doble militancia.

Un único eje de «democracia interna» no representa la federación EH Bildu, la coalición Geroa Bai, el frente BNG y el espacio asociado de Junts. Se recomienda guardar rasgos separados y construir una explicación, no una media.

### 8.7. Reglas de incertidumbre

- Una posición no localizada permanece nula, nunca neutral.
- Las capas territoriales sólo sobrescriben los ítems documentados.
- Una fuente programática posterior prevalece sobre una anterior; estatutos prevalecen para naturaleza y órganos.
- Las declaraciones de un cargo sólo puntúan al partido cuando proceden de canal oficial y son consistentes con programa o resolución.
- Cada puntuación debe guardar fecha, URL, título, fragmento/paráfrasis y nivel de confianza.
- Al cambiar el estado de una coalición o componente, el historial se conserva con fecha de inicio/fin; no se reescribe el pasado.

## 9. JSON candidato

Es una propuesta de datos, no una modificación de la aplicación. Las posiciones omitidas son nulas. Los aliases de candidatura resuelven hacia una entidad y nunca generan una coincidencia adicional.

~~~json
{
  "schemaVersion": "territorial-entities-v1",
  "corte": "2026-07-09",
  "escala": {
    "min": -2,
    "max": 2,
    "nuloSignifica": "sin evidencia suficiente",
    "confianza": ["A", "B", "C"]
  },
  "entidades": [
    {
      "id": "erc",
      "nombre": "Esquerra Republicana de Catalunya",
      "tipoEntidad": "partido",
      "estado": "activo",
      "ambito": ["Catalunya", "Paisos Catalans"],
      "elegibleComoResultado": true,
      "aliasesElectorales": ["ERC"],
      "actividadElectoral": [{"proceso": "Parlament de Catalunya 2024", "verificada": true}],
      "familia": ["izquierda_republicana", "independentismo", "ecologismo"],
      "posiciones": {
        "nac-001": {"valor": 1, "confianza": "B", "fuenteIds": ["erc-estrategia-2025"]},
        "nac-002": {"valor": 2, "confianza": "A", "fuenteIds": ["erc-politica-2025"]},
        "nac-003": {"valor": -2, "confianza": "A", "fuenteIds": ["erc-politica-2025"]},
        "cat-001": {"valor": 2, "confianza": "A", "fuenteIds": ["erc-politica-2025"]},
        "cat-002": {"valor": 2, "confianza": "A", "fuenteIds": ["erc-politica-2025"]},
        "cat-004": {"valor": -2, "confianza": "A", "fuenteIds": ["erc-migracion-2026"]},
        "cat-005": {"valor": 1, "confianza": "A", "fuenteIds": ["erc-politica-2025"]},
        "cat-006": {"valor": 1, "confianza": "B", "fuenteIds": ["erc-politica-2025"]}
      }
    },
    {
      "id": "junts",
      "nombre": "Junts per Catalunya",
      "tipoEntidad": "partido",
      "estado": "activo",
      "ambito": ["Catalunya"],
      "elegibleComoResultado": true,
      "aliasesElectorales": ["Junts+"],
      "actividadElectoral": [{"proceso": "Parlament de Catalunya 2024", "verificada": true}],
      "familia": ["independentismo_transversal", "liberal_comunitario"],
      "posiciones": {
        "nac-001": {"valor": 1, "confianza": "B", "fuenteIds": ["junts-estrategia-2024"]},
        "nac-002": {"valor": 2, "confianza": "A", "fuenteIds": ["junts-estrategia-2024"]},
        "nac-005": {"valor": 2, "confianza": "A", "fuenteIds": ["junts-pais-2024"]},
        "cat-001": {"valor": 2, "confianza": "A", "fuenteIds": ["junts-pais-2024"]},
        "cat-002": {"valor": 2, "confianza": "A", "fuenteIds": ["junts-pais-2024"]},
        "cat-004": {"valor": -1, "confianza": "B", "fuenteIds": ["junts-pais-2024"]},
        "cat-006": {"valor": 2, "confianza": "A", "fuenteIds": ["junts-immigracio-2025"]}
      }
    },
    {
      "id": "cup",
      "nombre": "Candidatura d'Unitat Popular",
      "tipoEntidad": "organizacion_asamblearia",
      "estado": "activo",
      "ambito": ["Paisos Catalans"],
      "elegibleComoResultado": true,
      "aliasesElectorales": ["CUP-Defensem la Terra", "CUP-DT"],
      "actividadElectoral": [{"proceso": "Parlament de Catalunya 2024", "verificada": true}],
      "familia": ["izquierda_independentista", "anticapitalismo", "feminismo", "ecologismo"],
      "posiciones": {
        "nac-001": {"valor": 2, "confianza": "A", "fuenteIds": ["cup-garbi-2024"]},
        "nac-002": {"valor": 2, "confianza": "A", "fuenteIds": ["cup-garbi-2024"]},
        "nac-003": {"valor": -2, "confianza": "A", "fuenteIds": ["cup-garbi-2024"]},
        "cat-001": {"valor": 2, "confianza": "A", "fuenteIds": ["cup-garbi-2024"]},
        "cat-004": {"valor": -2, "confianza": "A", "fuenteIds": ["cup-garbi-2024"]},
        "cat-005": {"valor": 2, "confianza": "A", "fuenteIds": ["cup-garbi-2024"]},
        "def-002": {"valor": 2, "confianza": "A", "fuenteIds": ["cup-garbi-2024"]},
        "dem-014": {"valor": 2, "confianza": "A", "fuenteIds": ["cup-estatuts-2024"]}
      }
    },
    {
      "id": "alianca-catalana",
      "nombre": "Alianca Catalana",
      "tipoEntidad": "partido",
      "estado": "activo",
      "ambito": ["Catalunya"],
      "elegibleComoResultado": true,
      "aliasesElectorales": ["AC"],
      "actividadElectoral": [{"proceso": "Parlament de Catalunya 2024", "verificada": true, "representacion": 2}],
      "familia": ["derecha_identitaria", "independentismo", "conservadurismo", "liberalismo_economico"],
      "posiciones": {
        "nac-001": {"valor": 2, "confianza": "A", "fuenteIds": ["ac-programa-2024"]},
        "nac-002": {"valor": 2, "confianza": "A", "fuenteIds": ["ac-programa-2024"]},
        "nac-003": {"valor": 1, "confianza": "B", "fuenteIds": ["ac-programa-2024"]},
        "nac-006": {"valor": 2, "confianza": "B", "fuenteIds": ["ac-programa-2024"]},
        "cat-001": {"valor": 2, "confianza": "A", "fuenteIds": ["ac-programa-2024"]},
        "cat-004": {"valor": 2, "confianza": "A", "fuenteIds": ["ac-programa-2024"]},
        "cat-006": {"valor": 2, "confianza": "A", "fuenteIds": ["ac-programa-2024"]},
        "eco-009": {"valor": 2, "confianza": "A", "fuenteIds": ["ac-programa-2024"]}
      }
    },
    {
      "id": "catalunya-en-comu",
      "nombre": "Catalunya en Comu",
      "tipoEntidad": "partido_espacio",
      "estado": "activo",
      "ambito": ["Catalunya"],
      "elegibleComoResultado": true,
      "aliasesElectorales": ["Comuns", "Comuns Sumar"],
      "actividadElectoral": [{"proceso": "Parlament de Catalunya 2024", "verificada": true}],
      "familia": ["ecosocialismo", "federalismo", "izquierda"],
      "posiciones": {
        "nac-001": {"valor": -1, "confianza": "A", "fuenteIds": ["comuns-programa-2024"]},
        "nac-002": {"valor": -2, "confianza": "A", "fuenteIds": ["comuns-programa-2024"]},
        "ter-002": {"valor": 1, "confianza": "B", "fuenteIds": ["comuns-programa-2024"]},
        "cat-001": {"valor": 1, "confianza": "A", "fuenteIds": ["comuns-programa-2024"]},
        "cat-002": {"valor": 1, "confianza": "B", "fuenteIds": ["comuns-programa-2024"]},
        "cat-003": {"valor": 2, "confianza": "A", "fuenteIds": ["comuns-programa-2024"]},
        "cat-004": {"valor": -2, "confianza": "A", "fuenteIds": ["comuns-programa-2024"]}
      }
    },
    {
      "id": "alhora",
      "nombre": "Alhora",
      "tipoEntidad": "partido",
      "estado": "activo",
      "ambito": ["Catalunya", "Paisos Catalans"],
      "elegibleComoResultado": true,
      "aliasesElectorales": ["Alhora"],
      "actividadElectoral": [{"proceso": "Parlament de Catalunya 2024", "verificada": true}],
      "familia": ["independentismo_transversal", "regeneracionismo"],
      "posiciones": {
        "nac-001": {"valor": 2, "confianza": "A", "fuenteIds": ["alhora-web-2026"]},
        "nac-002": {"valor": 2, "confianza": "A", "fuenteIds": ["alhora-web-2026"]},
        "cat-001": {"valor": 2, "confianza": "A", "fuenteIds": ["alhora-web-2026"]},
        "cat-005": {"valor": 2, "confianza": "A", "fuenteIds": ["alhora-organitzacio"]},
        "dem-014": {"valor": 2, "confianza": "A", "fuenteIds": ["alhora-organitzacio"]}
      }
    },
    {
      "id": "convergents",
      "nombre": "Convergents",
      "tipoEntidad": "partido",
      "estado": "activo",
      "ambito": ["Catalunya"],
      "elegibleComoResultado": true,
      "aliasesElectorales": ["Convergents"],
      "actividadElectoral": [{"proceso": "Parlament de Catalunya 2024", "verificada": true, "circunscripciones": ["Tarragona"]}],
      "familia": ["centro_soberanista", "liberalismo", "europeismo"],
      "posiciones": {
        "nac-001": {"valor": -1, "confianza": "B", "fuenteIds": ["convergents-ideari"]},
        "nac-002": {"valor": 1, "confianza": "B", "fuenteIds": ["convergents-ideari"]},
        "nac-004": {"valor": 2, "confianza": "A", "fuenteIds": ["convergents-ideari"]},
        "nac-007": {"valor": 2, "confianza": "A", "fuenteIds": ["convergents-ideari"]},
        "cat-004": {"valor": -2, "confianza": "B", "fuenteIds": ["convergents-ideari"]},
        "eco-009": {"valor": 2, "confianza": "A", "fuenteIds": ["convergents-ideari"]}
      }
    },
    {
      "id": "fnc-actual",
      "nombre": "Front Nacional de Catalunya",
      "tipoEntidad": "partido",
      "estado": "activo",
      "ambito": ["Catalunya", "Paisos Catalans"],
      "elegibleComoResultado": true,
      "homonimoHistorico": "front-nacional-catalunya-1940-1990",
      "aliasesElectorales": ["FNC"],
      "actividadElectoral": [{"proceso": "Parlament de Catalunya 2024", "verificada": true, "circunscripciones": ["Barcelona", "Tarragona"]}],
      "familia": ["nacionalismo_identitario", "independentismo", "derecha"],
      "posiciones": {
        "nac-001": {"valor": 2, "confianza": "A", "fuenteIds": ["fnc-decaleg"]},
        "nac-002": {"valor": 2, "confianza": "A", "fuenteIds": ["fnc-decaleg"]},
        "nac-003": {"valor": 2, "confianza": "A", "fuenteIds": ["fnc-decaleg"]},
        "nac-007": {"valor": -2, "confianza": "A", "fuenteIds": ["fnc-decaleg"]},
        "cat-001": {"valor": 2, "confianza": "A", "fuenteIds": ["fnc-decaleg"]},
        "cat-004": {"valor": 1, "confianza": "B", "fuenteIds": ["fnc-immigracio"]},
        "cat-005": {"valor": 2, "confianza": "A", "fuenteIds": ["fnc-decaleg"]},
        "cat-002": {"valor": 2, "confianza": "A", "fuenteIds": ["fnc-decaleg"]}
      }
    },
    {
      "id": "democrates-cat",
      "nombre": "Democrates de Catalunya",
      "tipoEntidad": "partido_asociado",
      "estado": "activo_componente",
      "ambito": ["Catalunya"],
      "elegibleComoResultado": false,
      "integradoEn": ["junts"],
      "familia": ["independentismo", "humanismo_personalista"]
    },
    {
      "id": "mescat",
      "nombre": "Moviment d'Esquerres de Catalunya",
      "tipoEntidad": "partido_asociado",
      "estado": "activo_componente",
      "ambito": ["Catalunya"],
      "elegibleComoResultado": false,
      "integradoEn": ["junts"],
      "familia": ["socialdemocracia", "independentismo"],
      "fuenteIds": ["junts-mes-2025"]
    },
    {
      "id": "accio-republica",
      "nombre": "Accio per la Republica",
      "tipoEntidad": "organizacion",
      "estado": "confluencia_en_proceso",
      "ambito": ["Catalunya"],
      "elegibleComoResultado": false,
      "relacionadaCon": ["mescat", "junts"],
      "familia": ["republicanismo_progresista", "independentismo"]
    },
    {
      "id": "pdecat",
      "nombre": "Partit Democrata Europeu Catala",
      "tipoEntidad": "partido",
      "estado": "actividad_detenida",
      "fechaFin": "2023-10-28",
      "ambito": ["Catalunya"],
      "elegibleComoResultado": false,
      "motivoExclusion": "El congreso oficial acordo detener la actividad politica",
      "fuenteIds": ["pdecat-cierre-2023"]
    },
    {
      "id": "eaj-pnv",
      "nombre": "Euzko Alderdi Jeltzalea-Partido Nacionalista Vasco",
      "tipoEntidad": "partido",
      "estado": "activo",
      "ambito": ["Euskadi", "Navarra", "Euskal Herria"],
      "elegibleComoResultado": true,
      "aliasesElectorales": ["EAJ-PNV"],
      "actividadElectoral": [{"proceso": "Parlamento Vasco 2024", "verificada": true, "representacion": 27}],
      "familia": ["nacionalismo_vasco", "humanismo", "economia_social_mercado"],
      "posiciones": {
        "nac-001": {"valor": -1, "confianza": "B", "fuenteIds": ["pnv-programa-2024"]},
        "nac-002": {"valor": -1, "confianza": "B", "fuenteIds": ["pnv-programa-2024"]},
        "eus-001": {"valor": 1, "confianza": "A", "fuenteIds": ["pnv-programa-2024"]},
        "eus-002": {"valor": 2, "confianza": "A", "fuenteIds": ["pnv-programa-2024"]},
        "eus-003": {"valor": 1, "confianza": "B", "fuenteIds": ["pnv-programa-2024"]},
        "eus-005": {"valor": 2, "confianza": "A", "fuenteIds": ["pnv-programa-2024"]},
        "def-002": {"valor": -2, "confianza": "A", "fuenteIds": ["pnv-otan-2026"]},
        "geo-004": {"valor": 2, "confianza": "A", "fuenteIds": ["pnv-otan-2026"]}
      }
    },
    {
      "id": "eh-bildu",
      "nombre": "Euskal Herria Bildu",
      "tipoEntidad": "federacion",
      "estado": "activo",
      "ambito": ["Euskadi", "Navarra", "Euskal Herria"],
      "elegibleComoResultado": true,
      "aliasesElectorales": ["EH Bildu"],
      "componentes": ["sortu", "eusko-alkartasuna", "alternatiba"],
      "actividadElectoral": [
        {"proceso": "Parlamento Vasco 2024", "verificada": true, "representacion": 27},
        {"proceso": "Parlamento de Navarra 2023", "verificada": true, "representacion": 9}
      ],
      "familia": ["izquierda_soberanista", "independentismo", "ecologismo", "feminismo"],
      "posiciones": {
        "nac-001": {"valor": 1, "confianza": "B", "fuenteIds": ["ehb-ponencia-2024"]},
        "nac-002": {"valor": 2, "confianza": "A", "fuenteIds": ["ehb-ponencia-2024"]},
        "eus-001": {"valor": 2, "confianza": "A", "fuenteIds": ["ehb-ponencia-2024"]},
        "eus-002": {"valor": 2, "confianza": "A", "fuenteIds": ["ehb-ponencia-2024"]},
        "eus-003": {"valor": 2, "confianza": "B", "fuenteIds": ["ehb-ponencia-2024"]},
        "eus-004": {"valor": 2, "confianza": "B", "fuenteIds": ["ehb-ponencia-2024"]},
        "eus-005": {"valor": -2, "confianza": "A", "fuenteIds": ["ehb-ponencia-2024"]},
        "eus-006": {"valor": 2, "confianza": "A", "fuenteIds": ["ehb-ponencia-2024"]},
        "def-002": {"valor": 2, "confianza": "A", "fuenteIds": ["ehb-otan"]}
      }
    },
    {
      "id": "sortu",
      "nombre": "Sortu",
      "tipoEntidad": "partido_componente",
      "estado": "activo_componente",
      "ambito": ["Euskal Herria"],
      "elegibleComoResultado": false,
      "integradoEn": ["eh-bildu"],
      "familia": ["independentismo", "socialismo", "feminismo"]
    },
    {
      "id": "eusko-alkartasuna",
      "nombre": "Eusko Alkartasuna",
      "tipoEntidad": "partido_componente",
      "estado": "activo_componente",
      "ambito": ["Euskal Herria"],
      "elegibleComoResultado": false,
      "integradoEn": ["eh-bildu"],
      "familia": ["socialdemocracia", "independentismo", "pacifismo"]
    },
    {
      "id": "alternatiba",
      "nombre": "Alternatiba Eraikitzen",
      "tipoEntidad": "organizacion_componente",
      "estado": "activo_componente",
      "ambito": ["Euskal Herria"],
      "elegibleComoResultado": false,
      "integradoEn": ["eh-bildu"],
      "familia": ["socialismo", "anticapitalismo", "feminismo"]
    },
    {
      "id": "aralar",
      "nombre": "Aralar",
      "tipoEntidad": "partido_historico",
      "estado": "disuelto",
      "ambito": ["Euskal Herria"],
      "elegibleComoResultado": false,
      "motivoExclusion": "No forma parte de los componentes recogidos en los estatutos vigentes de EH Bildu"
    },
    {
      "id": "upn",
      "nombre": "Union del Pueblo Navarro",
      "tipoEntidad": "partido",
      "estado": "activo",
      "ambito": ["Navarra"],
      "elegibleComoResultado": true,
      "aliasesElectorales": ["UPN"],
      "actividadElectoral": [{"proceso": "Parlamento de Navarra 2023", "verificada": true, "representacion": 15}],
      "familia": ["regionalismo_navarrista", "foralismo", "conservadurismo", "liberalismo"],
      "posiciones": {
        "nac-001": {"valor": -2, "confianza": "A", "fuenteIds": ["upn-principios", "upn-programa-2023"]},
        "nac-002": {"valor": -2, "confianza": "A", "fuenteIds": ["upn-principios"]},
        "eus-001": {"valor": -2, "confianza": "A", "fuenteIds": ["upn-principios"]},
        "eus-002": {"valor": 2, "confianza": "A", "fuenteIds": ["upn-programa-2023"]},
        "eus-003": {"valor": -2, "confianza": "A", "fuenteIds": ["upn-programa-2023"]},
        "eus-005": {"valor": 2, "confianza": "A", "fuenteIds": ["upn-principios"]},
        "eus-006": {"valor": -2, "confianza": "A", "fuenteIds": ["upn-programa-2023"]}
      }
    },
    {
      "id": "geroa-bai",
      "nombre": "Geroa Bai",
      "tipoEntidad": "coalicion",
      "estado": "activo",
      "ambito": ["Navarra"],
      "elegibleComoResultado": true,
      "aliasesElectorales": ["Geroa Bai", "GBai"],
      "componentes": ["geroa-socialverdes", "eaj-pnv-nafarroa", "atarrabia-taldea"],
      "actividadElectoral": [{"proceso": "Parlamento de Navarra 2023", "verificada": true, "representacion": 7}],
      "familia": ["progresismo", "vasquismo", "foralismo", "ecologismo"],
      "posiciones": {
        "nac-001": {"valor": -1, "confianza": "B", "fuenteIds": ["gbai-programa-2023"]},
        "nac-002": {"valor": -1, "confianza": "B", "fuenteIds": ["gbai-programa-2023"]},
        "eus-001": {"valor": 1, "confianza": "A", "fuenteIds": ["gbai-programa-2023"]},
        "eus-002": {"valor": 2, "confianza": "A", "fuenteIds": ["gbai-programa-2023"]},
        "eus-003": {"valor": 1, "confianza": "B", "fuenteIds": ["gbai-euskera"]},
        "eus-005": {"valor": 1, "confianza": "A", "fuenteIds": ["gbai-programa-2023"]},
        "eus-006": {"valor": 2, "confianza": "A", "fuenteIds": ["gbai-euskera"]},
        "geo-004": {"valor": 2, "confianza": "A", "fuenteIds": ["gbai-programa-2023"]}
      }
    },
    {
      "id": "geroa-socialverdes",
      "nombre": "Geroa Socialverdes",
      "tipoEntidad": "partido_componente",
      "estado": "activo_componente",
      "ambito": ["Navarra"],
      "elegibleComoResultado": false,
      "integradoEn": ["geroa-bai"],
      "familia": ["socialdemocracia", "ecologismo", "municipalismo"]
    },
    {
      "id": "eaj-pnv-nafarroa",
      "nombre": "EAJ-PNV Nafarroa",
      "tipoEntidad": "organizacion_territorial",
      "estado": "activo_componente",
      "ambito": ["Navarra"],
      "elegibleComoResultado": false,
      "aplicaSobre": "eaj-pnv",
      "integradoEn": ["geroa-bai"]
    },
    {
      "id": "atarrabia-taldea",
      "nombre": "Atarrabia Taldea",
      "tipoEntidad": "partido_local_componente",
      "estado": "activo_componente",
      "ambito": ["Villava-Atarrabia"],
      "elegibleComoResultado": false,
      "integradoEn": ["geroa-bai"]
    },
    {
      "id": "psn-psoe",
      "nombre": "Partido Socialista de Navarra-PSOE",
      "tipoEntidad": "federacion_territorial",
      "estado": "activo",
      "ambito": ["Navarra"],
      "elegibleComoResultado": false,
      "aplicaSobre": "psoe",
      "actividadElectoral": [{"proceso": "Parlamento de Navarra 2023", "verificada": true, "representacion": 11}],
      "posicionesTerritoriales": {
        "nac-001": {"valor": -2, "confianza": "A", "fuenteIds": ["psn-foral"]},
        "nac-002": {"valor": -2, "confianza": "A", "fuenteIds": ["psn-foral"]},
        "eus-001": {"valor": -2, "confianza": "A", "fuenteIds": ["psn-foral"]},
        "eus-002": {"valor": 1, "confianza": "B", "fuenteIds": ["psn-foral"]},
        "eus-005": {"valor": 1, "confianza": "A", "fuenteIds": ["psn-foral"]}
      }
    },
    {
      "id": "pp-vasco-ppn",
      "nombre": "PP Vasco / Partido Popular de Navarra",
      "tipoEntidad": "superposicion_territorial",
      "estado": "activo",
      "ambito": ["Euskadi", "Navarra"],
      "elegibleComoResultado": false,
      "aplicaSobre": "pp",
      "posicionesTerritoriales": {
        "nac-002": {"valor": -2, "confianza": "A", "fuenteIds": ["ppvasco-estatuto"]},
        "eus-002": {"valor": 1, "confianza": "B", "fuenteIds": ["ppvasco-estatuto"]},
        "eus-003": {"valor": -2, "confianza": "A", "fuenteIds": ["ppvasco-euskera"]},
        "eus-005": {"valor": 1, "confianza": "A", "fuenteIds": ["ppvasco-estatuto"]}
      }
    },
    {
      "id": "vox-euskadi-navarra",
      "nombre": "Vox Euskadi / Vox Navarra",
      "tipoEntidad": "superposicion_territorial",
      "estado": "activo",
      "ambito": ["Euskadi", "Navarra"],
      "elegibleComoResultado": false,
      "aplicaSobre": "vox",
      "posicionesTerritoriales": {
        "nac-002": {"valor": -2, "confianza": "A", "fuenteIds": ["vox-euskera-2024"]},
        "eus-003": {"valor": -2, "confianza": "A", "fuenteIds": ["vox-euskera-2024"]},
        "eus-006": {"valor": -2, "confianza": "B", "fuenteIds": ["vox-euskera-2024"]}
      }
    },
    {
      "id": "bng",
      "nombre": "Bloque Nacionalista Galego",
      "tipoEntidad": "frente",
      "estado": "activo",
      "ambito": ["Galicia"],
      "elegibleComoResultado": true,
      "aliasesElectorales": ["BNG"],
      "componentes": ["upg", "movemento-arredista", "foga", "alicerce"],
      "actividadElectoral": [{"proceso": "Parlamento de Galicia 2024", "verificada": true, "representacion": 25}],
      "familia": ["nacionalismo_gallego", "izquierda", "feminismo", "ecologismo"],
      "posiciones": {
        "nac-001": {"valor": 0, "confianza": "B", "fuenteIds": ["bng-asemblea-2025"]},
        "nac-002": {"valor": 1, "confianza": "B", "fuenteIds": ["bng-asemblea-2025"]},
        "nac-008": {"valor": 2, "confianza": "A", "fuenteIds": ["bng-concerto-2025"]},
        "ter-002": {"valor": 2, "confianza": "A", "fuenteIds": ["bng-principios"]},
        "gal-001": {"valor": 0, "confianza": "B", "fuenteIds": ["bng-asemblea-2025"]},
        "gal-002": {"valor": 2, "confianza": "A", "fuenteIds": ["bng-asemblea-2025"]},
        "gal-003": {"valor": 2, "confianza": "A", "fuenteIds": ["bng-asemblea-2025"]},
        "gal-004": {"valor": 2, "confianza": "B", "fuenteIds": ["bng-asemblea-2025"]},
        "gal-005": {"valor": 2, "confianza": "A", "fuenteIds": ["bng-asemblea-2025"]},
        "def-002": {"valor": 2, "confianza": "A", "fuenteIds": ["bng-asemblea-2025"]}
      }
    },
    {
      "id": "upg",
      "nombre": "Union do Povo Galego",
      "tipoEntidad": "partido_componente",
      "estado": "activo_componente",
      "ambito": ["Galicia"],
      "elegibleComoResultado": false,
      "integradoEn": ["bng"],
      "familia": ["marxismo_leninismo", "independentismo", "socialismo"],
      "posiciones": {
        "nac-002": {"valor": 2, "confianza": "A", "fuenteIds": ["upg-congreso-2024"]},
        "def-002": {"valor": 2, "confianza": "A", "fuenteIds": ["upg-congreso-2024"]}
      }
    },
    {
      "id": "movemento-arredista",
      "nombre": "Movemento Arredista",
      "tipoEntidad": "colectivo_interno",
      "estado": "activo_componente",
      "ambito": ["Galicia"],
      "elegibleComoResultado": false,
      "integradoEn": ["bng"],
      "aliasHistoricoRelacionado": ["Movemento Galego ao Socialismo"],
      "familia": ["independentismo", "comunismo", "feminismo"]
    },
    {
      "id": "foga",
      "nombre": "Fronte Obreira Galega",
      "tipoEntidad": "organizacion_componente",
      "estado": "activo_componente",
      "ambito": ["Galicia"],
      "elegibleComoResultado": false,
      "integradoEn": ["bng"],
      "familia": ["nacionalismo", "socialismo", "obrerismo"]
    },
    {
      "id": "alicerce",
      "nombre": "Alicerce",
      "tipoEntidad": "colectivo_interno",
      "estado": "activo_componente",
      "fechaInicio": "2024-11-21",
      "ambito": ["Galicia"],
      "elegibleComoResultado": false,
      "integradoEn": ["bng"],
      "familia": ["izquierda", "feminismo", "ecologismo", "democracia_interna"]
    },
    {
      "id": "democracia-ourensana",
      "nombre": "Democracia Ourensana",
      "tipoEntidad": "partido_provincial",
      "estado": "activo",
      "ambito": ["Ourense", "Galicia"],
      "elegibleComoResultado": true,
      "aliasesElectorales": ["DO"],
      "actividadElectoral": [{"proceso": "Parlamento de Galicia 2024", "verificada": true, "representacion": 1}],
      "familia": ["localismo", "provincialismo", "populismo_municipal"],
      "posiciones": {
        "gal-001": {"valor": 2, "confianza": "A", "fuenteIds": ["do-programa"]}
      }
    },
    {
      "id": "anova",
      "nombre": "Anova-Irmandade Nacionalista",
      "tipoEntidad": "partido_movimiento",
      "estado": "activo_sin_candidatura_autonomica_reciente",
      "ambito": ["Galicia"],
      "elegibleComoResultado": true,
      "actividadElectoral": [{"proceso": "Parlamento de Galicia 2024", "verificada": true, "concurrio": false}],
      "familia": ["izquierda_nacionalista", "ecosocialismo", "republicanismo"],
      "posiciones": {
        "nac-001": {"valor": 1, "confianza": "B", "fuenteIds": ["anova-identidade"]},
        "nac-002": {"valor": 1, "confianza": "B", "fuenteIds": ["anova-identidade"]},
        "gal-001": {"valor": 1, "confianza": "B", "fuenteIds": ["anova-identidade"]},
        "gal-005": {"valor": 2, "confianza": "A", "fuenteIds": ["anova-identidade"]},
        "def-002": {"valor": 2, "confianza": "B", "fuenteIds": ["anova-identidade"]},
        "dem-014": {"valor": 2, "confianza": "A", "fuenteIds": ["anova-organizacion"]}
      }
    },
    {
      "id": "partido-galego",
      "nombre": "Partido Galego",
      "tipoEntidad": "partido",
      "estado": "activo_sin_candidatura_autonomica_reciente",
      "ambito": ["Galicia"],
      "elegibleComoResultado": true,
      "actividadElectoral": [{"proceso": "Parlamento de Galicia 2024", "verificada": true, "concurrio": false}],
      "familia": ["galleguismo_moderado", "ecologismo", "ruralismo", "europeismo"],
      "posiciones": {
        "nac-001": {"valor": -2, "confianza": "B", "fuenteIds": ["pg-tese"]},
        "nac-002": {"valor": -1, "confianza": "B", "fuenteIds": ["pg-tese"]},
        "nac-004": {"valor": 2, "confianza": "A", "fuenteIds": ["pg-tese"]},
        "nac-007": {"valor": 2, "confianza": "A", "fuenteIds": ["pg-tese"]},
        "gal-001": {"valor": 0, "confianza": "B", "fuenteIds": ["pg-lingua-2026"]},
        "gal-005": {"valor": 1, "confianza": "B", "fuenteIds": ["pg-lingua-2026"]}
      }
    },
    {
      "id": "alternativa-dos-vecinos",
      "nombre": "Alternativa dos Vecinos",
      "tipoEntidad": "partido_municipal_provincial",
      "estado": "activo",
      "ambito": ["A Coruna", "Galicia"],
      "elegibleComoResultado": true,
      "actividadElectoral": [{"proceso": "Parlamento de Galicia 2024", "verificada": true, "concurrio": false}],
      "familia": ["municipalismo", "progresismo_civico", "ecologismo"],
      "posiciones": {
        "nac-001": {"valor": -1, "confianza": "B", "fuenteIds": ["av-lineas"]},
        "nac-002": {"valor": -2, "confianza": "A", "fuenteIds": ["av-lineas"]},
        "nac-004": {"valor": 1, "confianza": "B", "fuenteIds": ["av-lineas"]},
        "gal-005": {"valor": 1, "confianza": "B", "fuenteIds": ["av-lineas"]}
      }
    },
    {
      "id": "espazo-comun-galeguista",
      "nombre": "Espazo Comun Galeguista",
      "tipoEntidad": "coalicion_electoral",
      "estado": "continuidad_no_verificada",
      "ambito": ["Galicia"],
      "elegibleComoResultado": false,
      "aliasesElectorales": ["ECG"],
      "actividadElectoral": [{"proceso": "Parlamento de Galicia 2024", "verificada": true, "votos": 1635, "representacion": 0}],
      "componentesEn2024": ["espazo-comun", "unidade-local", "galicia-sempre", "compromiso-por-galicia", "coalicion-galega"],
      "motivoExclusion": "No hay continuidad oficial de la coalicion acreditada al corte"
    },
    {
      "id": "espazo-comun",
      "nombre": "Espazo Comun",
      "tipoEntidad": "partido",
      "estado": "actividad_indiciaria",
      "ambito": ["Galicia"],
      "elegibleComoResultado": false,
      "motivoExclusion": "Renovacion organica conocida por fuente secundaria, sin programa oficial vigente localizado"
    },
    {
      "id": "compromiso-por-galicia",
      "nombre": "Compromiso por Galicia",
      "tipoEntidad": "partido",
      "estado": "continuidad_no_verificada",
      "ambito": ["Galicia"],
      "elegibleComoResultado": false,
      "motivoExclusion": "Participacion en ECG 2024 sin prueba oficial posterior suficiente"
    }
  ],
  "relaciones": [
    {"tipo": "alias_electoral_de", "origen": "Junts+", "destino": "junts", "proceso": "Parlament de Catalunya 2024"},
    {"tipo": "alias_electoral_de", "origen": "CUP-Defensem la Terra", "destino": "cup", "proceso": "Parlament de Catalunya 2024"},
    {"tipo": "alias_electoral_de", "origen": "Comuns Sumar", "destino": "catalunya-en-comu", "proceso": "Parlament de Catalunya 2024"},
    {"tipo": "integrante_de", "origen": "sortu", "destino": "eh-bildu"},
    {"tipo": "integrante_de", "origen": "eusko-alkartasuna", "destino": "eh-bildu"},
    {"tipo": "integrante_de", "origen": "alternatiba", "destino": "eh-bildu"},
    {"tipo": "integrante_de", "origen": "geroa-socialverdes", "destino": "geroa-bai"},
    {"tipo": "integrante_de", "origen": "eaj-pnv-nafarroa", "destino": "geroa-bai"},
    {"tipo": "integrante_de", "origen": "atarrabia-taldea", "destino": "geroa-bai"},
    {"tipo": "integrante_de", "origen": "upg", "destino": "bng"},
    {"tipo": "integrante_de", "origen": "movemento-arredista", "destino": "bng"},
    {"tipo": "integrante_de", "origen": "foga", "destino": "bng"},
    {"tipo": "integrante_de", "origen": "alicerce", "destino": "bng"}
  ],
  "fuentes": {
    "erc-politica-2025": {"fecha": "2025-03-15", "titulo": "Ponencia politica aprobada del XXX Congreso", "url": "https://static.esquerra.cat/uploads/20250324/30cgn-ponencia-politica-aprovada.pdf"},
    "erc-estrategia-2025": {"fecha": "2025-03-15", "titulo": "Ponencia estrategica aprobada", "url": "https://static.esquerra.cat/uploads/20250324/30cgn-ponencia-estrategica-aprovada.pdf"},
    "erc-migracion-2026": {"fecha": "2026", "titulo": "Regularizar es una cuestion de humanidad, justicia social y pais", "url": "https://www.esquerra.cat/regularitzar-es-una-questio-dhumanitat-de-justicia-social-i-de-pais/"},
    "junts-estrategia-2024": {"fecha": "2024-10", "titulo": "Ponencia 1", "url": "https://web.junts.cat/wp-content/uploads/2024/10/Ponencia-1.pdf"},
    "junts-pais-2024": {"fecha": "2024-10", "titulo": "Ponencia 2", "url": "https://web.junts.cat/wp-content/uploads/2024/10/Ponencia_2.pdf"},
    "junts-immigracio-2025": {"fecha": "2025-01-09", "titulo": "Delegacion integral de competencias de inmigracion", "url": "https://junts.cat/actualitat/junts-per-catalunya-sabste-despres-de-pactar-la-delegacio-integral-de-les-competencies-dimmigracio-a-la-generalitat-i-la-publicacio-immediata-de-les-balances-fiscals/"},
    "junts-mes-2025": {"fecha": "2025-04-11", "titulo": "Acuerdo politico y organizativo Junts-MES", "url": "https://web.junts.cat/wp-content/uploads/2025/04/250411_NDP_Junts-i-MES.docx.pdf"},
    "cup-garbi-2024": {"fecha": "2024", "titulo": "Ponencia final del Proceso de Garbi", "url": "https://procesdegarbi.cup.cat/wp-content/uploads/2024/09/PONENCIA-FINAL-AN-CUP.pdf"},
    "cup-estatuts-2024": {"fecha": "2024", "titulo": "Estatutos", "url": "https://procesdegarbi.cup.cat/wp-content/uploads/2024/07/ESTATUS-V1.pdf"},
    "ac-programa-2024": {"fecha": "2024-04", "titulo": "Programa electoral 2024", "url": "https://aliancacatalana.cat/wp-content/uploads/2024/04/Programa-electoral-2024.pdf"},
    "comuns-programa-2024": {"fecha": "2024", "titulo": "Programa Parlament 2024", "url": "https://comuns.cat/wp-content/uploads/2025/07/comuns-programa-parlament-2024.pdf"},
    "alhora-web-2026": {"fecha": "consulta 2026-07-09", "titulo": "Propuestas vigentes", "url": "https://alhora.cat/"},
    "alhora-organitzacio": {"fecha": "consulta 2026-07-09", "titulo": "Como nos organizamos", "url": "https://alhora.cat/com-ens-organitzem/"},
    "convergents-ideari": {"fecha": "consulta 2026-07-09", "titulo": "Ideario", "url": "https://www.convergents.org/ideari"},
    "fnc-decaleg": {"fecha": "consulta 2026-07-09", "titulo": "Decalogo", "url": "https://elfront.cat/decaleg/"},
    "fnc-immigracio": {"fecha": "consulta 2026-07-09", "titulo": "Inmigracion", "url": "https://elfront.cat/immigracio/"},
    "pdecat-cierre-2023": {"fecha": "2023-10-28", "titulo": "Cierre de actividad politica", "url": "https://www.partitdemocrata.cat/"},
    "pnv-programa-2024": {"fecha": "2024", "titulo": "Programa electoral 21A", "url": "https://www.eaj-pnv.eus/es/adjuntos-documentos/21243/pdf/programa-electoral-21a"},
    "pnv-otan-2026": {"fecha": "2026", "titulo": "La OTAN es nuestro marco de seguridad", "url": "https://www.eaj-pnv.eus/es/noticias/57437/oihane-agirregoitia-a-dia-de-hoy-la-otan-es-nuestr/"},
    "ehb-ponencia-2024": {"fecha": "2024", "titulo": "Ponencia politica", "url": "https://ehbildu.eus/media/dokumentuak/albisteak/es-1729252550.pdf"},
    "ehb-estatutos-2025": {"fecha": "2025", "titulo": "Estatutos", "url": "https://ehbildu.eus/dokumentuak/gardentasuna/Estatutos_2025.pdf"},
    "ehb-otan": {"fecha": "consulta 2026-07-09", "titulo": "Autonomia estrategica europea y OTAN", "url": "https://ehbildu.eus/es/noticias/pernando-barrena-la-autonomia-estrategica-europea-es-totalmente-incompatible-con-la-pertenencia-a-un-esquema-militar-como-es-la-otan"},
    "upn-principios": {"fecha": "consulta 2026-07-09", "titulo": "Principios y valores", "url": "https://www.upn.org/principios-y-valores/"},
    "upn-programa-2023": {"fecha": "2023", "titulo": "Programa electoral", "url": "https://elecciones.upn.org/programa/"},
    "gbai-programa-2023": {"fecha": "2023", "titulo": "Programa al Parlamento de Navarra", "url": "https://geroabai.eus/files/2023/05/programa-parlamento-completo-pag-2023.pdf"},
    "gbai-euskera": {"fecha": "consulta 2026-07-09", "titulo": "Eliminar la zonificacion y valorar el euskera", "url": "https://geroabai.eus/es/actualidad/geroa-bai-apuesta-por-eliminar-la-zonificacion-lingueistica-y-que-se-valore-el-euskera-como-merito-en-toda-navarra"},
    "psn-foral": {"fecha": "consulta 2026-07-09", "titulo": "Navarra foral en una Espana plural", "url": "https://www.psn-psoe.org/propuestas/una-navarra-en-convivencia-con-fortaleza-institucional-y-foral-en-una-espana-plural/"},
    "ppvasco-estatuto": {"fecha": "consulta 2026-07-09", "titulo": "Reforma estatutaria sin ruptura", "url": "https://www.ppvasco.com/el-pp-vasco-defiende-una-reforma-del-estatuto-de-gernika-orientada-a-las-personas-y-que-evite-toda-ruptura-y-division/"},
    "ppvasco-euskera": {"fecha": "consulta 2026-07-09", "titulo": "Servicio publico y requisitos linguisticos", "url": "https://www.ppvasco.com/de-andres-apuesta-por-un-servicio-publico-por-encima-de-ideologias/"},
    "vox-euskera-2024": {"fecha": "2024-02-21", "titulo": "Imposicion del euskera", "url": "https://www.voxespana.es/noticias/vox-insiste-en-la-denuncia-de-la-tenaz-imposicion-del-euskera-por-parte-del-gobierno-vasco-20240221?provincia=guipuzcoa-alava-vizcaya"},
    "bng-asemblea-2025": {"fecha": "2025", "titulo": "Documentos definitivos de la XVIII Asamblea", "url": "https://www.bng.gal/media/bnggaliza/files/2025/02/07/documentos_xviii_asemblea_definitivos_corrixido.pdf"},
    "bng-principios": {"fecha": "consulta 2026-07-09", "titulo": "Principios", "url": "https://www.bng.gal/estaticas/principios-do-bng.html"},
    "bng-concerto-2025": {"fecha": "2025-01-11", "titulo": "Concierto economico para Galicia", "url": "https://www.bng.gal/articulo/novas/bng-propon-reformar-estatuto-incluir-concerto-economico-darlle-galiza-chave-seus-cartos/20250111141812039512.html"},
    "upg-congreso-2024": {"fecha": "2024", "titulo": "XVI Congreso", "url": "https://upg.gal/xvi-congreso-2024/"},
    "do-programa": {"fecha": "consulta 2026-07-09", "titulo": "Programa", "url": "https://democraciaourensana.es/programa/"},
    "anova-identidade": {"fecha": "consulta 2026-07-09", "titulo": "Que es Anova", "url": "https://www.anova.gal/nos/anova-irmandade-nacionalista/"},
    "anova-organizacion": {"fecha": "consulta 2026-07-09", "titulo": "Organizacion", "url": "https://www.anova.gal/nos/"},
    "pg-tese": {"fecha": "2022", "titulo": "Tesis politica", "url": "https://partidogalego.gal/wp-content/uploads/2024/09/2022-TESE-POLITICA-.pdf"},
    "pg-lingua-2026": {"fecha": "2026", "titulo": "El Partido Galego con la lengua gallega", "url": "https://partidogalego.gal/o-partido-galego-coa-lingua-galega/"},
    "av-lineas": {"fecha": "consulta 2026-07-09", "titulo": "Lineas politicas", "url": "https://alternativadosvecinos.org/linas-politicas/"}
  }
}
~~~

## 10. Recomendación de integración

1. Importar primero la ontología de entidades y aliases, sin puntuaciones.
2. Resolver cada candidatura de 2024 hacia una sola entidad o coalición.
3. Añadir posiciones únicamente con confianza A/B y guardar el enlace de auditoría.
4. Mantener los componentes detrás de un control «ver corrientes y partidos integrantes».
5. Excluir por defecto PDeCAT, Aralar, ECG actual, CxG actual y otras continuidades no verificadas.
6. Ejecutar los nuevos ítems territoriales como módulo exhaustivo; el modo rápido puede quedarse con estatus final, método, fiscalidad y lengua.

El resultado más importante no es aumentar el número de siglas, sino evitar coincidencias falsas: una persona cercana a EH Bildu no debe recibir también Sortu, EA y Alternatiba como cuatro resultados equivalentes; un usuario próximo a Junts no debe ver Junts+ como partido adicional; y una posición galleguista moderada no debe mapearse a una coalición de 2024 cuya continuidad no está acreditada.

## 11. Convocatorias normalizadas

Este bloque es la entrada reproducible para `scripts/importar-candidaturas-autonomicas.mjs`. En las cuatro elecciones `pct` se calcula como `100 × votos / votosCandidaturas`, nunca sobre el voto válido. Sólo entran filas con porcentaje exacto igual o superior al 0,02 %. Por eso quedan fuera Ongi Etorri, FNC y Convergents aunque el informe electoral redondee alguno de esos resultados a 0,02 % o 0,01 %. `componentes` identifica relaciones organizativas en esa candidatura fechada y no transfiere posiciones.

```json
{
  "schema": "espectro/candidaturas-autonomicas-norte-este@1",
  "corte": "2026-07-10",
  "reglaPorcentaje": "100 * votos / votos_a_candidaturas_en_la_comunidad",
  "elecciones": {
    "CAT-2024": {
      "ccaa": "Catalunya",
      "fecha": "2024-05-12",
      "votosCandidaturas": 3120503,
      "sumaFilasOficiales": 3120503,
      "umbralVotos": 625,
      "totalAgregados": 18,
      "convocatoria": "anticipada",
      "fuenteResultado": "https://gencat.cat/eleccions/resultatsparlament2024/descarregues/dossier_ca_def.pdf",
      "fuenteIdentidad": "https://gencat.cat/eleccions/parlament2024/es/formacions-politiques/candidatures/candidatures-proclamades/index.html"
    },
    "EUS-2024": {
      "ccaa": "Euskadi",
      "fecha": "2024-04-21",
      "votosCandidaturas": 1052170,
      "sumaFilasOficiales": 1052170,
      "umbralVotos": 211,
      "totalAgregados": 14,
      "convocatoria": "fin-de-legislatura",
      "fuenteResultado": "https://www.euskadi.eus/contenidos/informacion/w_in_24_pv_resultados/es_def/adjuntos/informe-elecciones-parlamento-vasco_2024.pdf",
      "fuenteIdentidad": "https://www.euskadi.eus/elecciones-parlamento-vasco-2024-candidaturas-presentadas/web01-a3haup24/es/"
    },
    "NAV-2023": {
      "ccaa": "Navarra",
      "fecha": "2023-05-28",
      "votosCandidaturas": 324001,
      "sumaFilasOficiales": 324001,
      "umbralVotos": 65,
      "totalAgregados": 11,
      "convocatoria": "ordinaria",
      "fuenteResultado": "https://www.navarra.es/es/-/nota-prensa/el-recuento-del-voto-pendiente-de-las-elecciones-al-parlamento-no-altera-el-reparto-de-escanos?print=true",
      "fuenteIdentidad": "https://www.navarra.es/es/-/nota-prensa/el-bon-publica-el-listado-con-816-candidaturas-a-las-elecciones-al-parlamento-municipios-y-concejos-del-proximo-28-de-mayo"
    },
    "GAL-2024": {
      "ccaa": "Galicia",
      "fecha": "2024-02-18",
      "votosCandidaturas": 1488705,
      "sumaFilasOficiales": 1488705,
      "umbralVotos": 298,
      "totalAgregados": 11,
      "convocatoria": "anticipada",
      "fuenteResultado": "https://www.xunta.gal/dog/Publicados/2024/20240306/AnuncioG2453-050324-1_es.html",
      "fuenteCorreccion": "https://www.xunta.gal/dog/Publicados/2024/20240308/AnuncioG2453-070324-1_es.html",
      "fuenteIdentidad": "https://eleccions2024.xunta.gal/Eleccions2024_31_c-Candidaturas_proclamadas.html"
    }
  },
  "candidaturas": [
    {"id":"cat-2024-psc","eleccion":"CAT-2024","nombrePapeleta":"PSC","votos":882589,"pct":28.283549,"escanos":42,"motivoInclusion":"umbral","tipo":"federacion-territorial","componentes":[],"circ":["todas"],"actividad":"representacion-2024","destino":"perfil-reutilizable"},
    {"id":"cat-2024-junts","eleccion":"CAT-2024","nombrePapeleta":"CAT-JUNTS+","votos":681470,"pct":21.838466,"escanos":35,"motivoInclusion":"umbral","tipo":"coalicion-electoral","componentes":["Junts per Catalunya","Demòcrates de Catalunya"],"circ":["todas"],"actividad":"matrices-verificadas","destino":"perfil-reutilizable"},
    {"id":"cat-2024-erc","eleccion":"CAT-2024","nombrePapeleta":"ERC","votos":431128,"pct":13.815978,"escanos":20,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"representacion-2024","destino":"perfil-reutilizable"},
    {"id":"cat-2024-pp","eleccion":"CAT-2024","nombrePapeleta":"PP","votos":347170,"pct":11.12545,"escanos":15,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"representacion-2024","destino":"perfil-reutilizable"},
    {"id":"cat-2024-vox","eleccion":"CAT-2024","nombrePapeleta":"VOX","votos":251096,"pct":8.046651,"escanos":11,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"representacion-2024","destino":"perfil-reutilizable"},
    {"id":"cat-2024-comuns-sumar","eleccion":"CAT-2024","nombrePapeleta":"COMUNS SUMAR","votos":184297,"pct":5.906003,"escanos":6,"motivoInclusion":"umbral","tipo":"coalicion-electoral","componentes":["Catalunya en Comú","Movimiento Sumar"],"circ":["todas"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"cat-2024-cup-dt","eleccion":"CAT-2024","nombrePapeleta":"CUP - DT","votos":129059,"pct":4.13584,"escanos":4,"motivoInclusion":"umbral","tipo":"coalicion-electoral","componentes":["Candidatura d'Unitat Popular"],"circ":["todas"],"actividad":"matriz-verificada","destino":"perfil-reutilizable"},
    {"id":"cat-2024-alianca","eleccion":"CAT-2024","nombrePapeleta":"ALIANÇA.CAT","votos":119149,"pct":3.818263,"escanos":2,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"representacion-2024","destino":"perfil-especifico"},
    {"id":"cat-2024-pacma","eleccion":"CAT-2024","nombrePapeleta":"PACMA","votos":34493,"pct":1.105367,"escanos":0,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"cat-2024-cs","eleccion":"CAT-2024","nombrePapeleta":"Cs","votos":22947,"pct":0.735362,"escanos":0,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"cat-2024-alhora","eleccion":"CAT-2024","nombrePapeleta":"ALHORA","votos":14104,"pct":0.451978,"escanos":0,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-especifico"},
    {"id":"cat-2024-fo","eleccion":"CAT-2024","nombrePapeleta":"FO","votos":10118,"pct":0.324243,"escanos":0,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-especifico"},
    {"id":"cat-2024-pctc","eleccion":"CAT-2024","nombrePapeleta":"PCTC","votos":4212,"pct":0.134978,"escanos":0,"motivoInclusion":"umbral","tipo":"organizacion-territorial","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"cat-2024-recortes-cero","eleccion":"CAT-2024","nombrePapeleta":"RECORTES CERO","votos":3487,"pct":0.111745,"escanos":0,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"actividad-electoral-posterior-no-verificada","destino":"perfil-reutilizable"},
    {"id":"cat-2024-pumj","eleccion":"CAT-2024","nombrePapeleta":"PUM+J","votos":2760,"pct":0.088447,"escanos":0,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-especifico"},
    {"id":"cat-2024-izqp","eleccion":"CAT-2024","nombrePapeleta":"IZQP - UNIDOS - DEf","votos":1892,"pct":0.060631,"escanos":0,"motivoInclusion":"umbral","tipo":"coalicion-electoral","componentes":["Izquierda en Positivo","Unidos por la Solidaridad Internacional","Democracia Efectiva"],"circ":["Barcelona","Tarragona"],"actividad":"continuidad-conjunta-no-verificada","destino":"inventario-sin-datos"},

    {"id":"eus-2024-eaj-pnv","eleccion":"EUS-2024","nombrePapeleta":"EAJ-PNV","votos":370554,"pct":35.218073,"escanos":27,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"representacion-2024","destino":"perfil-reutilizable"},
    {"id":"eus-2024-eh-bildu","eleccion":"EUS-2024","nombrePapeleta":"EH BILDU","votos":341735,"pct":32.479067,"escanos":27,"motivoInclusion":"umbral","tipo":"federacion","componentes":["Sortu","Eusko Alkartasuna","Alternatiba"],"circ":["todas"],"actividad":"representacion-2024","destino":"perfil-reutilizable"},
    {"id":"eus-2024-pse","eleccion":"EUS-2024","nombrePapeleta":"PSE-EE/PSOE","votos":149660,"pct":14.223937,"escanos":12,"motivoInclusion":"umbral","tipo":"federacion-territorial","componentes":[],"circ":["todas"],"actividad":"representacion-2024","destino":"perfil-reutilizable"},
    {"id":"eus-2024-pp","eleccion":"EUS-2024","nombrePapeleta":"PP","votos":97149,"pct":9.233204,"escanos":7,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"representacion-2024","destino":"perfil-reutilizable"},
    {"id":"eus-2024-sumar","eleccion":"EUS-2024","nombrePapeleta":"SUMAR","votos":35092,"pct":3.335202,"escanos":1,"motivoInclusion":"umbral","tipo":"candidatura","componentes":["Sumar Mugimendua"],"circ":["todas"],"actividad":"representacion-2024","destino":"perfil-reutilizable"},
    {"id":"eus-2024-podemos-av","eleccion":"EUS-2024","nombrePapeleta":"PODEMOS-AHAL DUGU - ALIANZA VERDE","votos":23679,"pct":2.250492,"escanos":0,"motivoInclusion":"umbral","tipo":"coalicion-electoral","componentes":["Podemos","Alianza Verde"],"circ":["todas"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"eus-2024-vox","eleccion":"EUS-2024","nombrePapeleta":"VOX","votos":21396,"pct":2.033512,"escanos":1,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"representacion-2024","destino":"perfil-reutilizable"},
    {"id":"eus-2024-pacma","eleccion":"EUS-2024","nombrePapeleta":"PACMA","votos":5481,"pct":0.520923,"escanos":0,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"eus-2024-eb-az","eleccion":"EUS-2024","nombrePapeleta":"EB-AZ","votos":3072,"pct":0.291968,"escanos":0,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-no-verificada","destino":"inventario-sin-datos"},
    {"id":"eus-2024-pumj","eleccion":"EUS-2024","nombrePapeleta":"PUM+J","votos":1628,"pct":0.154728,"escanos":0,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-especifico"},
    {"id":"eus-2024-izan","eleccion":"EUS-2024","nombrePapeleta":"IZAN","votos":1412,"pct":0.134199,"escanos":0,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","componentes":[],"circ":["Bizkaia","Gipuzkoa"],"actividad":"posterior-no-verificada","destino":"inventario-sin-datos"},
    {"id":"eus-2024-pcte","eleccion":"EUS-2024","nombrePapeleta":"PCTE / ELAK","votos":660,"pct":0.062728,"escanos":0,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["Bizkaia"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"eus-2024-ph","eleccion":"EUS-2024","nombrePapeleta":"PH","votos":471,"pct":0.044765,"escanos":0,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["Bizkaia"],"actividad":"posterior-verificada","destino":"perfil-especifico"},

    {"id":"nav-2023-upn","eleccion":"NAV-2023","nombrePapeleta":"UPN","votos":92392,"pct":28.515961,"escanos":15,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"representacion-2023","destino":"perfil-reutilizable"},
    {"id":"nav-2023-psn","eleccion":"NAV-2023","nombrePapeleta":"PSN-PSOE","votos":68247,"pct":21.063824,"escanos":11,"motivoInclusion":"umbral","tipo":"federacion-territorial","componentes":[],"circ":["todas"],"actividad":"representacion-2023","destino":"perfil-reutilizable"},
    {"id":"nav-2023-eh-bildu","eleccion":"NAV-2023","nombrePapeleta":"EH Bildu","votos":56535,"pct":17.44902,"escanos":9,"motivoInclusion":"umbral","tipo":"federacion","componentes":["Sortu","Eusko Alkartasuna","Alternatiba"],"circ":["todas"],"actividad":"representacion-2023","destino":"perfil-reutilizable"},
    {"id":"nav-2023-geroa-bai","eleccion":"NAV-2023","nombrePapeleta":"Geroa Bai","votos":43660,"pct":13.475267,"escanos":7,"motivoInclusion":"umbral","tipo":"coalicion-estable","componentes":["Geroa Socialverdes","EAJ-PNV de Navarra","Atarrabia Taldea"],"circ":["todas"],"actividad":"representacion-2023","destino":"perfil-especifico"},
    {"id":"nav-2023-ppn","eleccion":"NAV-2023","nombrePapeleta":"PPN","votos":24019,"pct":7.413249,"escanos":3,"motivoInclusion":"umbral","tipo":"organizacion-territorial","componentes":[],"circ":["todas"],"actividad":"representacion-2023","destino":"perfil-reutilizable"},
    {"id":"nav-2023-contigo","eleccion":"NAV-2023","nombrePapeleta":"Contigo Navarra-Zurekin Nafarroa","votos":20095,"pct":6.202141,"escanos":3,"motivoInclusion":"umbral","tipo":"coalicion-electoral","componentes":["Podemos Navarra","Izquierda Unida de Navarra","Batzarre"],"circ":["todas"],"actividad":"representacion-2023","destino":"perfil-especifico"},
    {"id":"nav-2023-vox","eleccion":"NAV-2023","nombrePapeleta":"Vox","votos":14197,"pct":4.381777,"escanos":2,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"representacion-2023","destino":"perfil-reutilizable"},
    {"id":"nav-2023-pumj","eleccion":"NAV-2023","nombrePapeleta":"Por Un Mundo Más Justo","votos":1740,"pct":0.537035,"escanos":0,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-especifico"},
    {"id":"nav-2023-cs","eleccion":"NAV-2023","nombrePapeleta":"Ciudadanos","votos":1273,"pct":0.3929,"escanos":0,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"nav-2023-eguzkilore","eleccion":"NAV-2023","nombrePapeleta":"Eguzkilore","votos":1261,"pct":0.389196,"escanos":0,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","componentes":[],"circ":["todas"],"actividad":"posterior-no-verificada","destino":"inventario-sin-datos"},
    {"id":"nav-2023-voluntad-foral","eleccion":"NAV-2023","nombrePapeleta":"Voluntad Foral-Nabarra Gurea","votos":582,"pct":0.179629,"escanos":0,"motivoInclusion":"umbral","tipo":"partido-o-plataforma","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-especifico"},

    {"id":"gal-2024-pp","eleccion":"GAL-2024","nombrePapeleta":"PARTIDO POPULAR (PP)","votos":711713,"pct":47.807524,"escanos":40,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"representacion-2024","destino":"perfil-reutilizable"},
    {"id":"gal-2024-bng","eleccion":"GAL-2024","nombrePapeleta":"BLOQUE NACIONALISTA GALEGO (BNG)","votos":470692,"pct":31.617547,"escanos":25,"motivoInclusion":"umbral","tipo":"frente","componentes":[],"circ":["todas"],"actividad":"representacion-2024","destino":"perfil-reutilizable"},
    {"id":"gal-2024-psdeg","eleccion":"GAL-2024","nombrePapeleta":"PARTIDO DOS SOCIALISTAS DE GALICIA-PSOE (PSdeG-PSOE)","votos":211361,"pct":14.197642,"escanos":9,"motivoInclusion":"umbral","tipo":"federacion-territorial","componentes":[],"circ":["todas"],"actividad":"representacion-2024","destino":"perfil-reutilizable"},
    {"id":"gal-2024-vox","eleccion":"GAL-2024","nombrePapeleta":"VOX (VOX)","votos":34045,"pct":2.286887,"escanos":0,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"gal-2024-sumar","eleccion":"GAL-2024","nombrePapeleta":"SUMAR GALICIA (SUMAR GALICIA)","votos":29009,"pct":1.948606,"escanos":0,"motivoInclusion":"umbral","tipo":"coalicion-o-candidatura","componentes":["Movimiento Sumar"],"circ":["todas"],"actividad":"matriz-verificada","destino":"perfil-especifico"},
    {"id":"gal-2024-do","eleccion":"GAL-2024","nombrePapeleta":"DEMOCRACIA OURENSANA (DO)","votos":15442,"pct":1.037277,"escanos":1,"motivoInclusion":"umbral","tipo":"partido-provincial","componentes":[],"circ":["Ourense"],"actividad":"representacion-2024","destino":"perfil-especifico"},
    {"id":"gal-2024-pacma","eleccion":"GAL-2024","nombrePapeleta":"PARTIDO ANIMALISTA CONTRA O MALTRATO ANIMAL (PACMA)","votos":5932,"pct":0.398467,"escanos":0,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"gal-2024-podemos-av","eleccion":"GAL-2024","nombrePapeleta":"PODEMOS GALICIA (Podemos-Alianza Verde)","votos":4420,"pct":0.296902,"escanos":0,"motivoInclusion":"umbral","tipo":"coalicion-electoral","componentes":["Podemos","Alianza Verde"],"circ":["todas"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"gal-2024-escanos-branco","eleccion":"GAL-2024","nombrePapeleta":"ESCANOS EN BRANCO (ESCAÑOS EN BLANCO)","votos":2884,"pct":0.193725,"escanos":0,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-no-verificada","destino":"inventario-sin-datos"},
    {"id":"gal-2024-ecg","eleccion":"GAL-2024","nombrePapeleta":"ESPAZO COMÚN GALEGUISTA (ECG)","votos":1635,"pct":0.109827,"escanos":0,"motivoInclusion":"umbral","tipo":"coalicion-electoral","componentes":["Espazo Común","Unidade Local","Galicia Sempre","Compromiso por Galicia","Coalición Galega"],"circ":["todas"],"actividad":"continuidad-conjunta-no-verificada","destino":"inventario-sin-datos"},
    {"id":"gal-2024-pumj","eleccion":"GAL-2024","nombrePapeleta":"POR UN MUNDO MÁIS XUSTO (PUM+J)","votos":1572,"pct":0.105595,"escanos":0,"motivoInclusion":"umbral","tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-especifico"}
  ]
}
```
