# Candidaturas autonómicas del centro y sur: universo electoral y prioridad de perfiles

**Corte de vigencia:** 9 de julio de 2026
**Ámbito:** Andalucía, Comunidad de Madrid, Castilla-La Mancha, Castilla y León, Extremadura, Región de Murcia y La Rioja
**Objeto:** construir un inventario reproducible para Espectro sin convertir automáticamente una candidatura, una coalición fechada o un nombre sugerente en un perfil ideológico.

## 1. Regla de inclusión y cautelas de identidad

Se toma la elección autonómica más reciente con escrutinio definitivo disponible en cada comunidad y se incluyen todas las candidaturas con al menos el **0,02 % de los votos a candidaturas en el conjunto de la comunidad**. El denominador no es el censo, la participación ni los votos válidos —que incluyen el voto en blanco—, sino la suma autonómica de votos atribuidos a candidaturas. El porcentaje se recalcula como:

`100 × votos de la candidatura / votos a candidaturas en la comunidad`

Se muestran tres decimales para hacer visible el corte. El mínimo entero es `techo(denominador × 0,0002)`. Cuando una lista sólo concurrió en algunas circunscripciones, sus votos se dividen igualmente por el denominador autonómico: no se infla su peso usando sólo la provincia donde se presentó.

Este universo sirve para decidir qué investigar; **no asigna ideología**. En particular:

1. La denominación publicada en el acta es una **candidatura de una fecha concreta**. No prueba por sí sola que exista hoy como organización unitaria.
2. Una coalición electoral se conserva como objeto fechado y sus componentes se desglosan sólo cuando una fuente electoral oficial permite verificarlos. La actividad posterior de un componente no convierte en permanente a la coalición.
3. «Actividad no comprobada» significa exactamente que no se halló evidencia oficial posterior suficiente en esta revisión; no equivale a disolución ni inactividad.
4. Un nombre —incluidas palabras como «verde», «obrero», «libre», «regional», «socialista» o «nacional»— nunca basta para puntuar un eje. Hace falta programa, manifiesto, votación o declaración oficial atribuible.
5. Una candidatura puede merecer perfil por su capacidad discriminante aunque sea pequeña; necesita, además, posiciones documentadas. Cuando no las hay, permanece en `inventario-sin-datos`.

### 1.1. Estados y destinos usados

| Código | Significado |
|---|---|
| `electoral-2026` / `electoral-2025` | La propia proclamación y el resultado prueban actividad electoral en esa fecha reciente; no se extrapola indefinidamente. |
| `representacion-2023-2027` | La candidatura obtuvo representación en una institución cuyo mandato seguía abierto al corte. |
| `posterior-verificada` | Hay una candidatura oficial posterior a la elección aquí inventariada. |
| `matrices-verificadas` | La marca fue una coalición fechada; al menos una o varias matrices reaparecen oficialmente, sin presumir continuidad de la coalición exacta. |
| `actividad-local-verificada` | La misma organización, o la matriz territorial indicada, mantiene grupo o actuación institucional local al corte; no prueba una futura candidatura autonómica. |
| `actividad-organizativa-verificada` | Hay actividad primaria reciente —congreso, comunicados o posiciones—, aunque no una elección posterior. |
| `reordenacion-2026` | Una fuente primaria documenta integración, cambio de marca o decisión de no volver a concurrir; no se presume disolución jurídica. |
| `no-comprobada` | No se verificó actividad oficial posterior suficiente al proceso inventariado. |
| `perfil-reutilizable` | Conviene un único perfil de organización, con superposición territorial si procede. |
| `perfil-especifico` | Conviene investigar una ficha propia territorial o de coalición porque puede añadir señal discriminante no cubierta por un perfil estatal. |
| `inventario-sin-datos` | Conservar identidad y resultado, pero no ofrecer como resultado ideológico hasta reunir fuentes de posiciones suficientes. |

### 1.2. Elecciones, denominadores y convocatorias anticipadas

| Comunidad | Elección utilizada | Votos a candidaturas | Corte ≥0,02 % | Incluidas | Naturaleza de la convocatoria |
|---|---:|---:|---:|---:|---|
| Andalucía | 17-05-2026 | 4.157.536 | 832 votos | 19 | El [Decreto del Presidente 2/2026](https://www.juntadeandalucia.es/boja/2026/505/1) disolvió la cámara elegida el 19-06-2022 y convocó el 17-05-2026. Es una disolución previa al agotamiento formal de los cuatro años, aunque muy próxima al final natural de legislatura; se etiqueta `anticipada-fin-de-ciclo`, no se mezcla con 2022. |
| Castilla y León | 15-03-2026 | 1.236.753 | 248 votos | 27 | Convocatoria al término de la legislatura mediante [Decreto 1/2026](https://bocyl.jcyl.es/boletin.do?fechaBoletin=20%2F01%2F2026); no es el adelanto de 2022. |
| Extremadura | 21-12-2025 | 524.837 | 105 votos | 11 | **Anticipada:** el [Decreto de la Presidenta 8/2025](https://doe.juntaex.es/otrosFormatos/html.php?anio=2025&doe=2070o&xml=2025040248) disolvió la Asamblea elegida en 2023. Por eso 2025, y no 2023, es la última elección disponible. |
| Comunidad de Madrid | 28-05-2023 | 3.344.370 | 669 votos | 13 | Elección ordinaria del ciclo fijo de mayo de 2023. El adelanto madrileño fue el de 2021; aquella cámara completaba sólo el tramo restante y no desplaza este proceso. |
| Castilla-La Mancha | 28-05-2023 | 1.072.883 | 215 votos | 14 | Elección ordinaria. |
| Región de Murcia | 28-05-2023 | 676.554 | 136 votos | 15 | Elección ordinaria. |
| La Rioja | 28-05-2023 | 165.559 | 34 votos | 10 | Elección ordinaria. |

Las elecciones anticipadas no se «anualizan» ni se comparan como si todas las candidaturas hubieran tenido el mismo tiempo de maduración. Su efecto aquí es sólo elegir correctamente el último escrutinio disponible y fechar cada marca.

## 2. Andalucía — 17 de mayo de 2026

**Fuente numérica común:** Junta Electoral de Andalucía, [resultados generales y por circunscripciones (BOJA, 08-06-2026)](https://www.juntadeandalucia.es/boja/2026/108/BOJA26-108-00091-7541-01_00338776.pdf).
**Identidad y coaliciones:** JEC, [información general del proceso](https://www.juntaelectoralcentral.es/cs/Satellite?c=JECEleccion_C&childpagename=JEC%2FJEC_Layout&cid=1408442385927&packedargs=apartado%3Dinfogeneral&pagename=jec%2Fwrapper%2FJEC_Wrapper&rendermode=preview) y [candidaturas proclamadas](https://www.juntaelectoralcentral.es/cs/jec/documentos/andalucia_2026_candidaturas_proclamadas.pdf). La errata «PARITDO AUTÓNOMOS» del cuadro de resultados se corrige con la proclamación, que dice **PARTIDO AUTÓNOMOS**. El resultado autonómico agrega una coalición como «ANDALUCISTAS PUEBLO ANDALUZ», pero sus ocho papeletas no tienen una denominación literal única; se preservan debajo por provincia.

| Candidatura exacta | Votos | % autonómico | Naturaleza y componentes verificables | Cobertura | Vigencia al corte | Destino |
|---|---:|---:|---|---|---|---|
| PARTIDO POPULAR | 1.744.728 | 41,965 | partido; candidatura territorial | 8 provincias | `electoral-2026` | `perfil-reutilizable` |
| PARTIDO SOCIALISTA OBRERO ESPAÑOL DE ANDALUCÍA | 955.584 | 22,984 | federación territorial/candidatura | 8 provincias | `electoral-2026` | `perfil-reutilizable` |
| VOX | 580.293 | 13,958 | partido | 8 provincias | `electoral-2026` | `perfil-reutilizable` |
| ADELANTE ANDALUCÍA | 403.560 | 9,707 | partido/candidatura; no se deducen componentes del nombre | 8 provincias | `electoral-2026` | `perfil-especifico` |
| POR ANDALUCÍA: IZQUIERDA UNIDA ANDALUCÍA–PODEMOS–MOVIMIENTO SUMAR–INICIATIVA DEL PUEBLO ANDALUZ–VERDES EQUO–ALTERNATIVA REPUBLICANA–ALIANZA VERDE | 266.213 | 6,403 | coalición: las siete organizaciones enumeradas en la denominación oficial | 8 provincias | `electoral-2026`; coalición fechada | `perfil-especifico` |
| SE ACABÓ LA FIESTA | 106.322 | 2,557 | partido/candidatura | 8 provincias | `electoral-2026` | `perfil-reutilizable` |
| PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE | 25.374 | 0,610 | partido | 8 provincias | `electoral-2026` | `perfil-reutilizable` |
| 100X100 UNIDOS | 14.786 | 0,356 | partido/candidatura; no figura como coalición registrada en la fuente del proceso | Cádiz | `electoral-2026` | `inventario-sin-datos` |
| ANDALUCISTAS PUEBLO ANDALUZ *(rótulo del agregado oficial; papeletas provinciales debajo)* | 12.157 | 0,292 | coalición de Andalucía Por Sí-Andalucistas, Convergencia Andaluza-Andalucistas, Andalucía Entre Tod@s, Compromiso por Andalucía, Andaluces Levantaos, Andalucistas Linenses y Foro de Montellano | 8 provincias | `electoral-2026`; coalición fechada | `perfil-especifico` |
| ESCAÑOS EN BLANCO PARA DEJAR ESCAÑOS VACÍOS | 9.347 | 0,225 | partido | 8 provincias | `electoral-2026` | `perfil-reutilizable` |
| JAÉN MERECE MÁS | 7.993 | 0,192 | partido/candidatura territorial | Jaén | `electoral-2026` | `perfil-especifico` |
| PARTIDO COMUNISTA DEL PUEBLO ANDALUZ | 5.716 | 0,137 | partido | 8 provincias | `electoral-2026` | `perfil-especifico` |
| FALANGE ESPAÑOLA DE LAS JONS | 4.995 | 0,120 | partido | 8 provincias | `electoral-2026` | `perfil-reutilizable` |
| POR UN MUNDO MÁS JUSTO | 4.790 | 0,115 | partido | 8 provincias | `electoral-2026` | `perfil-reutilizable` |
| PARTIDO AUTÓNOMOS | 3.752 | 0,090 | partido/candidatura | Almería, Cádiz, Málaga y Sevilla | `electoral-2026` | `inventario-sin-datos` |
| NACIÓN ANDALUZA | 3.004 | 0,072 | partido | 8 provincias | `electoral-2026` | `perfil-especifico` |
| HUELVA EXISTE | 2.148 | 0,052 | coalición registrada; composición no transcrita al no quedar inequívoca en la publicación consultada | Huelva | `electoral-2026`; coalición fechada | `inventario-sin-datos` |
| PARTIDO COMUNISTA DE LOS TRABAJADORES DE ESPAÑA | 1.792 | 0,043 | partido | Córdoba, Granada y Sevilla | `electoral-2026` | `perfil-reutilizable` |
| PODER ANDALUZ | 1.084 | 0,026 | partido/candidatura | Sevilla | `electoral-2026` | `inventario-sin-datos` |

Denominaciones exactas proclamadas para la coalición agregada como ANDALUCISTAS PUEBLO ANDALUZ:

| Circunscripción | Denominación de papeleta proclamada |
|---|---|
| Almería | ANDALUCISTAS - PUEBLO ANDALUZ |
| Cádiz | ANDALUCISTAS - PUEBLO ANDALUZ - ANDALUCÍA POR SÍ - ANDALUCISTAS LINENSES |
| Córdoba | ANDALUCISTAS - PUEBLO ANDALUZ - ANDALUCÍA, ENTRE TODOS - ANDALUCÍA POR SÍ |
| Granada | ANDALUCISTAS - PUEBLO ANDALUZ - CONVERGENCIA ANDALUZA - COMPROMISO POR ANDALUCÍA - ANDALUCÍA POR SÍ |
| Huelva | ANDALUCISTAS - PUEBLO ANDALUZ - ANDALUCÍA POR SÍ |
| Jaén | ANDALUCISTAS - PUEBLO ANDALUZ - ANDALUCÍA POR SÍ – STOP BIOGAS |
| Málaga | ANDALUCISTAS - PUEBLO ANDALUZ - ANDALUCÍA POR SÍ |
| Sevilla | ANDALUCISTAS - PUEBLO ANDALUZ - ANDALUCÍA POR SÍ – FORO MONTELLANO |

Las ocho candidaturas restantes del cuadro oficial quedan bajo el corte: Alternativa Malagueña (768), Almerienses Regionalistas Pro Almería (680), Partido Andalusí (538), Izquierda Anticapitalista Revolucionaria (528), Partido de Jubilados por el Futuro, Dignidad y Democracia (428), Izquierda por Almería (383), Conecta Andalucía (339) y Sociedad Unida (237). No se añade ninguna como excepción histórica: concurrir en 2026 prueba actividad de esa candidatura, pero no se identificó una razón histórica establecida en el alcance que justificase romper el umbral.

**Control de suma:** el propio BOJA contiene un descuadre de tres votos. Sus filas de candidatura suman 4.157.539, mientras el resumen fija 4.157.536 votos a candidaturas; el desfase está en Granada, donde las filas suman 476.345 frente a 476.342 en el resumen. Se conservan tanto los votos publicados para cada candidatura como el denominador oficial, sin «corregir» una candidatura arbitrariamente. El umbral no cambia y el JSON deja el descuadre explícito.

## 3. Castilla y León — 15 de marzo de 2026

**Fuente numérica común:** Junta Electoral de Castilla y León, [resultados generales, por circunscripción y electos (BOCYL, 29-04-2026)](https://bocyl.jcyl.es/html/2026/04/29/html/BOCYL-D-29042026-80-13.do).
**Identidad y coaliciones:** JEC, [información general del proceso](https://www.juntaelectoralcentral.es/cs/jec/eleccionesEnCurso/CastillayLeon_marzo2026?apartado=infogeneral) y BOCYL, [candidaturas proclamadas](https://bocyl.jcyl.es/boletin.do?fechaBoletin=17%2F02%2F2026). Cuando el registro de coaliciones no permite recuperar con seguridad todos los integrantes, se conserva la naturaleza formal y se evita inventarlos. Coalición por El Bierzo publica además sus [estatutos de federación de partidos](https://www.coalicionporelbierzo.org/wp-content/uploads/2023/06/estatutos-cb-oct23.pdf).

| Candidatura exacta | Votos | % autonómico | Naturaleza y componentes verificables | Cobertura | Vigencia al corte | Destino |
|---|---:|---:|---|---|---|---|
| PARTIDO POPULAR | 444.296 | 35,924 | partido; candidatura territorial | 9 provincias | `electoral-2026` | `perfil-reutilizable` |
| PARTIDO SOCIALISTA OBRERO ESPAÑOL | 386.774 | 31,273 | partido; candidatura territorial | 9 provincias | `electoral-2026` | `perfil-reutilizable` |
| VOX | 237.100 | 19,171 | partido | 9 provincias | `electoral-2026` | `perfil-reutilizable` |
| UNIÓN DEL PUEBLO LEONÉS | 54.096 | 4,374 | partido | León, Salamanca y Zamora | `electoral-2026` | `perfil-especifico` |
| IZQUIERDA UNIDA-MOVIMIENTO SUMAR-VERDES EQUO | 28.255 | 2,285 | coalición: Izquierda Unida, Movimiento Sumar y Verdes Equo | 9 provincias | `electoral-2026`; coalición fechada | `perfil-especifico` |
| SE ACABÓ LA FIESTA | 17.554 | 1,419 | partido/candidatura | 9 provincias | `electoral-2026` | `perfil-reutilizable` |
| POR ÁVILA | 11.518 | 0,931 | partido territorial | Ávila y 146 votos en Valladolid según el acta | `electoral-2026` | `perfil-especifico` |
| PODEMOS-ALIANZA VERDE CYL 2026 | 9.597 | 0,776 | coalición: Podemos y Alianza Verde | 9 provincias | `electoral-2026`; coalición fechada | `perfil-especifico` |
| SORIA ¡YA! | 9.145 | 0,739 | partido/candidatura territorial | Soria | `electoral-2026` | `perfil-especifico` |
| PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE | 5.267 | 0,426 | partido | 9 provincias | `electoral-2026` | `perfil-reutilizable` |
| ESCAÑOS EN BLANCO PARA DEJAR ESCAÑOS VACÍOS | 4.861 | 0,393 | partido | 9 provincias | `electoral-2026` | `perfil-reutilizable` |
| CIUDADANOS-PARTIDO DE LA CIUDADANÍA | 4.509 | 0,365 | partido | Ávila, Burgos, León, Salamanca, Soria, Valladolid y Zamora | `electoral-2026` | `perfil-reutilizable` |
| NUEVE CASTILLA Y LEÓN | 3.858 | 0,312 | partido/candidatura | Ávila, León, Salamanca, Segovia, Soria, Valladolid y Zamora | `electoral-2026` | `inventario-sin-datos` |
| VÍA BURGALESA MUNICIPALISTA | 3.621 | 0,293 | coalición electoral registrada; integrantes no transcritos sin evidencia inequívoca | Burgos | `electoral-2026`; coalición fechada | `perfil-especifico` |
| PARTIDO CASTELLANO-TIERRA COMUNERA | 3.137 | 0,254 | partido | 9 provincias | `electoral-2026` | `perfil-especifico` |
| COALICIÓN POR EL BIERZO | 1.992 | 0,161 | federación de partidos; estatutos: Partido de El Bierzo y El Bierzo Existe | León | `electoral-2026` | `perfil-especifico` |
| PARTIDO COMUNISTA DE LOS TRABAJADORES DE ESPAÑA | 1.744 | 0,141 | partido | Burgos, León, Palencia, Salamanca y Valladolid | `electoral-2026` | `perfil-reutilizable` |
| VAMOS PALENCIA | 1.668 | 0,135 | partido/candidatura territorial | Palencia | `electoral-2026` | `inventario-sin-datos` |
| POR UN MUNDO MÁS JUSTO | 1.664 | 0,135 | partido | Burgos, Palencia, Salamanca, Segovia, Valladolid y Zamora | `electoral-2026` | `perfil-reutilizable` |
| ESPAÑA VACIADA | 1.125 | 0,091 | partido/candidatura | Palencia y Salamanca | `electoral-2026` | `perfil-especifico` |
| AHORA DECIDE-ESPAÑA VACIADA | 1.000 | 0,081 | coalición: Ahora Decide y España Vaciada | Zamora | `electoral-2026`; coalición fechada | `perfil-especifico` |
| MUNICIPALISTAS-ESPAÑA VACIADA | 953 | 0,077 | coalición electoral registrada | Valladolid | `electoral-2026`; coalición fechada | `perfil-especifico` |
| PARTIDO NACIONALISTA DE CASTILLA Y LEÓN-UNIÓN REFORMISTA CIUDADANA | 940 | 0,076 | partido con denominación compuesta; no se infiere coalición del guion | Palencia, Salamanca, Valladolid y Zamora | `electoral-2026` | `inventario-sin-datos` |
| FALANGE ESPAÑOLA DE LAS J.O.N.S. | 810 | 0,065 | partido | Ávila, Palencia y Valladolid | `electoral-2026` | `perfil-reutilizable` |
| DECIDE NUEVE CYL | 501 | 0,041 | coalición electoral registrada | Burgos | `electoral-2026`; coalición fechada | `inventario-sin-datos` |
| PROYECTO ALANTRE | 391 | 0,032 | partido/candidatura | León | `electoral-2026` | `inventario-sin-datos` |
| PARTIDO REGIONALISTA DEL PAÍS LEONÉS | 254 | 0,021 | partido | León | `electoral-2026` | `inventario-sin-datos` |

La única candidatura bajo el umbral es SOBERANÍA ALIMENTARIA ESPAÑOLA, con 123 votos (0,010 %, Zamora). No se conserva como excepción histórica. Falange sí se incluye, no por una excepción nominal, sino porque superó el corte y concurrió efectivamente en 2026.

## 4. Extremadura — 21 de diciembre de 2025

**Fuente numérica común:** Junta Electoral de Extremadura, [escrutinio general y proclamación (DOE, 14-01-2026)](https://doe.juntaex.es/pdfs/doe/2026/80o/26AC0001.pdf).
**Identidad y coaliciones:** JEC, [elección de diciembre de 2025](https://www.juntaelectoralcentral.es/cs/jec/elecciones/Extremadura-diciembre2025?p=1379061494795) y [coaliciones constituidas](https://www.juntaelectoralcentral.es/cs/jec/informacion/enlaces/CoalicionesEXT_2025).

| Candidatura exacta | Votos | % autonómico | Naturaleza y componentes verificables | Cobertura | Vigencia al corte | Destino |
|---|---:|---:|---|---|---|---|
| PARTIDO POPULAR | 228.991 | 43,631 | partido; candidatura territorial | Badajoz y Cáceres | `electoral-2025`; representación vigente | `perfil-reutilizable` |
| PARTIDO SOCIALISTA OBRERO ESPAÑOL | 136.838 | 26,072 | partido; candidatura territorial | Badajoz y Cáceres | `electoral-2025`; representación vigente | `perfil-reutilizable` |
| VOX | 89.768 | 17,104 | partido | Badajoz y Cáceres | `electoral-2025`; representación vigente | `perfil-reutilizable` |
| UNIDAS POR EXTREMADURA PODEMOS IZQUIERDA UNIDA ALIANZA VERDE | 54.541 | 10,392 | coalición: Podemos, Izquierda Unida y Alianza Verde | Badajoz y Cáceres | `electoral-2025`; coalición fechada y representación vigente | `perfil-especifico` |
| JUNTOS POR EXTREMADURA-LEVANTA EXTREMADURA | 4.181 | 0,797 | coalición: Juntos por Extremadura y Levanta Extremadura | Badajoz y Cáceres | `electoral-2025`; coalición fechada | `perfil-especifico` |
| NUEVO EXTREMEÑISMO-ADELANTE EXTREMADURA | 3.200 | 0,610 | partido/candidatura; no figura como coalición registrada y el guion no autoriza descomponerla | Badajoz y Cáceres | `electoral-2025` | `perfil-especifico` |
| PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE | 2.302 | 0,439 | partido | Badajoz y Cáceres | `electoral-2025` | `perfil-reutilizable` |
| EXTREMADURA UNIDA | 1.548 | 0,295 | partido | Cáceres | `electoral-2025` | `perfil-especifico` |
| CIUDADANOS-PARTIDO DE LA CIUDADANÍA | 1.331 | 0,254 | partido | Badajoz y Cáceres | `electoral-2025` | `perfil-reutilizable` |
| UNA EXTREMADURA DIGNA-SOBERANÍA Y TRABAJO | 1.221 | 0,233 | coalición: Una Extremadura Digna y Soberanía y Trabajo | Badajoz y Cáceres | `electoral-2025`; coalición fechada | `perfil-especifico` |
| POR UN MUNDO MÁS JUSTO | 916 | 0,175 | partido | Badajoz y Cáceres | `electoral-2025` | `perfil-reutilizable` |

Todas las candidaturas proclamadas superaron el corte; no hay excepción subumbral.

## 5. Comunidad de Madrid — 28 de mayo de 2023

**Fuente numérica y denominación común:** Junta Electoral Provincial de Madrid, [acta de proclamación y resultados (BOCM, 09-06-2023)](https://www.bocm.es/boletin/CM_Orden_BOCM/2023/06/09/BOCM-20230609-72.PDF).
**Coaliciones:** JEC, [coaliciones constituidas para la elección madrileña de 2023](https://www.juntaelectoralcentral.es/cs/jec/informacion/enlaces/CoalicionesMAD_2023).

| Candidatura exacta | Votos | % autonómico | Naturaleza y componentes verificables | Cobertura | Vigencia al corte | Destino |
|---|---:|---:|---|---|---|---|
| PARTIDO POPULAR | 1.599.186 | 47,817 | partido; candidatura territorial | Comunidad de Madrid | `posterior-verificada`; representación 2023-2027 | `perfil-reutilizable` |
| MÁS MADRID-VERDES EQUO | 620.631 | 18,557 | coalición: Más Madrid y Verdes Equo | Comunidad de Madrid | coalición de 2023; representación de la lista y matrices verificadas | `perfil-especifico` |
| PARTIDO SOCIALISTA OBRERO ESPAÑOL | 614.296 | 18,368 | partido; candidatura territorial | Comunidad de Madrid | `posterior-verificada`; representación 2023-2027 | `perfil-reutilizable` |
| VOX | 248.379 | 7,427 | partido | Comunidad de Madrid | `posterior-verificada`; representación 2023-2027 | `perfil-reutilizable` |
| PODEMOS-IZQUIERDA UNIDA-ALIANZA VERDE | 161.032 | 4,815 | coalición: Podemos, Izquierda Unida y Alianza Verde | Comunidad de Madrid | coalición fechada; `matrices-verificadas` en 2025-2026 | `perfil-especifico` |
| CIUDADANOS-PARTIDO DE LA CIUDADANÍA | 52.925 | 1,583 | partido | Comunidad de Madrid | `posterior-verificada` en 2025-2026 | `perfil-reutilizable` |
| PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE | 23.451 | 0,701 | partido | Comunidad de Madrid | `posterior-verificada` en 2025-2026 | `perfil-reutilizable` |
| POR UN MUNDO MÁS JUSTO | 7.219 | 0,216 | partido | Comunidad de Madrid | `posterior-verificada` en 2025-2026 | `perfil-reutilizable` |
| PARTIDO FEMINISTA DE ESPAÑA | 5.376 | 0,161 | partido | Comunidad de Madrid | `actividad-organizativa-verificada`: IV Congreso en 2025 y comunicados en 2026 | `perfil-especifico` |
| PARTIDO COMUNISTA DE LOS TRABAJADORES DE ESPAÑA | 4.148 | 0,124 | partido | Comunidad de Madrid | `posterior-verificada` en 2026 | `perfil-reutilizable` |
| FALANGE ESPAÑOLA DE LAS J.O.N.S. | 2.779 | 0,083 | partido | Comunidad de Madrid | `posterior-verificada` en 2026 | `perfil-reutilizable` |
| UNIÓN POR LEGANÉS | 2.544 | 0,076 | partido/candidatura local que concurrió a la Asamblea | Comunidad de Madrid | `actividad-local-verificada` en la corporación de Leganés 2023-2027; continuidad autonómica no probada | `inventario-sin-datos` |
| PARTIDO HUMANISTA | 2.404 | 0,072 | partido | Comunidad de Madrid | `posterior-verificada` en las europeas de 2024 | `perfil-especifico` |

Todas las candidaturas del acta superaron el umbral; no hay excepción subumbral.

## 6. Castilla-La Mancha — 28 de mayo de 2023

**Fuente numérica y denominación común:** Junta Electoral de Castilla-La Mancha, [resultados definitivos por provincia y total autonómico](https://www.juntaelectoralcentral.es/cs/jec/documentos/Resultados%20definitivos%20Castilla%20La%20Mancha.pdf); portal autonómico, [resultados definitivos](https://elecciones.castillalamancha.es/resultados/resultados-def). El portal publica porcentajes sobre voto válido; para mantener una regla común aquí se recalculan sobre los **1.072.883 votos a candidaturas** que figuran en el acta.

| Candidatura exacta | Votos | % autonómico | Naturaleza y componentes verificables | Cobertura | Vigencia al corte | Destino |
|---|---:|---:|---|---|---|---|
| PARTIDO SOCIALISTA OBRERO ESPAÑOL | 490.288 | 45,698 | partido; candidatura territorial | 5 provincias | `posterior-verificada`; representación 2023-2027 | `perfil-reutilizable` |
| PARTIDO POPULAR | 366.312 | 34,143 | partido; candidatura territorial | 5 provincias | `posterior-verificada`; representación 2023-2027 | `perfil-reutilizable` |
| VOX | 139.607 | 13,012 | partido | 5 provincias | `posterior-verificada`; representación 2023-2027 | `perfil-reutilizable` |
| UNIDAS PODEMOS CASTILLA-LA MANCHA | 45.317 | 4,224 | coalición de Podemos e Izquierda Unida en el proceso; no tratar «Unidas Podemos» como partido permanente | 5 provincias | coalición fechada; `matrices-verificadas` | `perfil-especifico` |
| CIUDADANOS-PARTIDO DE LA CIUDADANÍA | 10.885 | 1,015 | partido | 5 provincias | `posterior-verificada` en 2025-2026 | `perfil-reutilizable` |
| PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE | 10.727 | 1,000 | partido | 5 provincias | `posterior-verificada` en 2025-2026 | `perfil-reutilizable` |
| PAÍS CON GESTORES | 2.151 | 0,200 | partido/candidatura | Albacete, Cuenca, Guadalajara y Toledo | `no-comprobada` después de 2023 | `inventario-sin-datos` |
| +CUENCA AHORA-ESPAÑA VACIADA | 1.984 | 0,185 | coalición: +Cuenca Ahora y España Vaciada | Cuenca | coalición fechada; España Vaciada reaparece en 2026 | `perfil-especifico` |
| ESPAÑA VACIADA | 1.670 | 0,156 | partido/candidatura | Toledo | `posterior-verificada` en 2026 | `perfil-especifico` |
| PARTIDO CASTELLANO-TIERRA COMUNERA-RECORTES CERO | 1.345 | 0,125 | coalición/candidatura conjunta de PCAS-TC y Recortes Cero | Cuenca, Guadalajara y Toledo | marca fechada; PCAS-TC reaparece en 2026 | `perfil-especifico` |
| PARTIDO COMUNISTA DE LOS PUEBLOS DE ESPAÑA | 989 | 0,092 | partido | Toledo | `posterior-verificada` en las europeas de 2024 | `perfil-reutilizable` |
| AQUÍ AHORA | 724 | 0,067 | partido/candidatura | Toledo | `no-comprobada` después de 2023 | `inventario-sin-datos` |
| TÚpatria | 585 | 0,055 | partido/candidatura | Cuenca | `no-comprobada` después de 2023 | `inventario-sin-datos` |
| FALANGE ESPAÑOLA DE LAS JONS | 299 | 0,028 | partido; el acta desarrolla las siglas con la errata «ESTAÑOLA», corregida por la denominación de candidatura y la identidad inequívoca del partido | Guadalajara | `posterior-verificada` en 2026 | `perfil-reutilizable` |

Todas las candidaturas del acta superaron el umbral; no hay excepción subumbral. La inclusión de Falange vuelve a depender de votos y actividad electoral comprobada, no de antigüedad del nombre.

## 7. Región de Murcia — 28 de mayo de 2023

**Fuente numérica y denominación común:** Centro Regional de Estadística de Murcia, [resultados autonómicos regionales definitivos](https://econet.carm.es/web/crem/inicio/-/crem/sicrem/PU2077/sec51.html). La propia fuente confirma que el porcentaje de candidatura usa como denominador los 676.554 votos a candidaturas.

| Candidatura exacta | Votos | % autonómico | Naturaleza y componentes verificables | Cobertura | Vigencia al corte | Destino |
|---|---:|---:|---|---|---|---|
| Partido Popular | 293.051 | 43,315 | partido; candidatura territorial | Región de Murcia | `posterior-verificada`; representación 2023-2027 | `perfil-reutilizable` |
| Partido Socialista Obrero Español | 175.505 | 25,941 | partido; candidatura territorial | Región de Murcia | `posterior-verificada`; representación 2023-2027 | `perfil-reutilizable` |
| VOX | 121.321 | 17,932 | partido | Región de Murcia | `posterior-verificada`; representación 2023-2027 | `perfil-reutilizable` |
| Podemos-Izquierda Unida Verdes-Alianza Verde | 32.173 | 4,755 | coalición: Podemos, Izquierda Unida-Verdes y Alianza Verde | Región de Murcia | coalición fechada; representación de la lista y `matrices-verificadas` | `perfil-especifico` |
| MC Regional | 20.206 | 2,987 | partido/candidatura regional | Región de Murcia | matriz `actividad-local-verificada`: grupo MC Cartagena activo en 2026; futura candidatura autonómica no probada | `perfil-especifico` |
| Ciudadanos-Partido de la Ciudadanía | 10.480 | 1,549 | partido | Región de Murcia | `posterior-verificada` en 2025-2026 | `perfil-reutilizable` |
| Mas Region-Verdes Equo | 8.919 | 1,318 | coalición: Más Región y Verdes Equo | Región de Murcia | coalición fechada; Verdes Equo reaparece oficialmente | `perfil-especifico` |
| Partido Animalista Con el Medio Ambiente | 5.957 | 0,880 | partido | Región de Murcia | `posterior-verificada` en 2025-2026 | `perfil-reutilizable` |
| Por mi Region | 2.449 | 0,362 | partido/candidatura | Región de Murcia | candidatura al Congreso en julio de 2023 y `actividad-local-verificada` en Campos del Río en mayo de 2026 | `perfil-especifico` |
| Tercera Edad en Acción | 1.479 | 0,219 | partido/candidatura | Región de Murcia | `actividad-organizativa-verificada` en junio de 2026 | `perfil-especifico` |
| Murcia Libre | 1.442 | 0,213 | partido/candidatura | Región de Murcia | `no-comprobada` después de 2023 | `inventario-sin-datos` |
| Valores | 1.336 | 0,197 | partido/candidatura | Región de Murcia | `no-comprobada` después de 2023 | `inventario-sin-datos` |
| Partido Comunista de los Pueblos de España | 1.152 | 0,170 | partido | Región de Murcia | `posterior-verificada` en las europeas de 2024 | `perfil-reutilizable` |
| Falange Española de las J.O.N.S | 554 | 0,082 | partido | Región de Murcia | `posterior-verificada` en 2026 | `perfil-reutilizable` |
| Partido Cantonal de Cartagena | 530 | 0,078 | partido histórico/candidatura | Región de Murcia | `actividad-organizativa-verificada` en 2026; la trayectoria histórica por sí sola no habría bastado | `perfil-especifico` |

Todas las candidaturas publicadas superaron el umbral; no hay excepción subumbral.

## 8. La Rioja — 28 de mayo de 2023

**Fuente numérica y denominación común:** Junta Electoral de la Comunidad Autónoma de La Rioja, [acta de escrutinio general](https://www.juntaelectoralcentral.es/cs/jec/documentos/Escrutinio%20General.pdf); Parlamento de La Rioja, [resultados electorales de 2023](https://www.parlamento-larioja.org/junta-electoral-car/proceso-electoral-2023/resultados-electorales).
**Coaliciones:** JEC, [información general y coaliciones del proceso](https://www.juntaelectoralcentral.es/cs/Satellite?c=JECInfoGeneral_C&childpagename=JEC%2FJEC_Layout&cid=1408441868692&d=Touch&packedargs=d%3DTouch&pagename=jec%2Fwrapper%2FJEC_Wrapper).

| Candidatura exacta | Votos | % autonómico | Naturaleza y componentes verificables | Cobertura | Vigencia al corte | Destino |
|---|---:|---:|---|---|---|---|
| PARTIDO POPULAR | 76.205 | 46,029 | partido; candidatura territorial | La Rioja | `posterior-verificada`; representación 2023-2027 | `perfil-reutilizable` |
| PARTIDO SOCIALISTA OBRERO ESPAÑOL | 53.562 | 32,352 | partido; candidatura territorial | La Rioja | `posterior-verificada`; representación 2023-2027 | `perfil-reutilizable` |
| VOX | 12.773 | 7,715 | partido | La Rioja | `posterior-verificada`; representación 2023-2027 | `perfil-reutilizable` |
| PODEMOS-IZQUIERDA UNIDA | 8.543 | 5,160 | coalición: Podemos e Izquierda Unida | La Rioja | coalición fechada; representación de la lista y `matrices-verificadas` | `perfil-especifico` |
| PARTIDO RIOJANO+ESPAÑA VACIADA | 6.016 | 3,634 | coalición: Partido Riojano y España Vaciada | La Rioja | coalición fechada; España Vaciada reaparece y Partido Riojano adopta la marca PR+ Riojan@s en 2026 | `perfil-especifico` |
| POR LA RIOJA | 4.349 | 2,627 | partido/candidatura territorial | La Rioja | `actividad-organizativa-verificada` en 2026 | `perfil-especifico` |
| CIUDADANOS-PARTIDO DE LA CIUDADANÍA | 1.473 | 0,890 | partido | La Rioja | `posterior-verificada` en 2025-2026 | `perfil-reutilizable` |
| PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE | 1.065 | 0,643 | partido | La Rioja | `posterior-verificada` en 2025-2026 | `perfil-reutilizable` |
| VINEA La Rioja | 954 | 0,576 | partido/candidatura territorial | La Rioja | `reordenacion-2026`: PR+ informa de que VINEA no concurrirá en 2027 y da paso a la integración de afiliados; disolución jurídica no verificada | `inventario-sin-datos` |
| ESCAÑOS EN BLANCO PARA DEJAR ESCAÑOS VACÍOS | 619 | 0,374 | partido | La Rioja | `posterior-verificada` en 2026 | `perfil-reutilizable` |

Todas las candidaturas del acta superaron el umbral; no hay excepción subumbral.

## 9. Lectura operativa para Espectro

### 9.1. Qué perfiles aportan más discriminación

El orden de trabajo recomendado no replica el volumen de voto. Primero se reutilizan perfiles estatales bien documentados —PP, PSOE, Vox, Ciudadanos, PACMA, Por Un Mundo Más Justo, PCTE, PCPE, Falange y Escaños en Blanco— sin duplicarlos siete veces. Después conviene investigar perfiles territoriales o coaliciones con capacidad de separar respuestas que esos perfiles estatales no capturan:

- **Andalucía:** Adelante Andalucía; Por Andalucía 2026; la coalición Andalucistas-Pueblo Andaluz-Andalucía Por Sí; Nación Andaluza; PCPA; Jaén Merece Más si se reúne programa autonómico suficiente.
- **Castilla y León:** UPL, Por Ávila, Soria ¡Ya!, PCAS-TC, Coalición por el Bierzo, Vía Burgalesa Municipalista, España Vaciada y sus alianzas provinciales. Las coaliciones IU-Movimiento Sumar-Verdes Equo y Podemos-Alianza Verde deben modelarse como ofertas de 2026, no como nuevos partidos.
- **Extremadura:** Unidas por Extremadura 2025, Juntos por Extremadura-Levanta Extremadura, Nuevo Extremeñismo-Adelante Extremadura, Extremadura Unida y Una Extremadura Digna-Soberanía y Trabajo.
- **Madrid:** Más Madrid-Verdes Equo y Podemos-IU-Alianza Verde como candidaturas fechadas; Partido Humanista como organización. El Partido Feminista puede discriminar mucho en ejes concretos, pero no debe entrar como resultado actual hasta verificar continuidad y un corpus vigente.
- **Castilla-La Mancha:** +Cuenca Ahora-España Vaciada, España Vaciada y PCAS-TC-Recortes Cero; Unidas Podemos CLM queda como candidatura de 2023 con matrices separadas.
- **Murcia:** MC Regional, Podemos-IU Verdes-Alianza Verde y Más Región-Verdes Equo. El 2,987 % de MC no autoriza a completar huecos doctrinales: hace falta documento vigente.
- **La Rioja:** Podemos-IU, Partido Riojano+España Vaciada y, si se verifica continuidad, Por La Rioja.

`Inventario-sin-datos` no significa irrelevancia. Es una barrera de calidad: 100X100 Unidos, Partido Autónomos, Huelva Existe, Poder Andaluz, Nueve Castilla y León, Vamos Palencia, PANCAL-URCI, Decide Nueve, Proyecto Alantre, PREPAL, ULEG, País con Gestores, Aquí Ahora, Túpatria, Murcia Libre, Valores y VINEA La Rioja permanecen localizables pero no puntuables. Para promover cualquiera se exigen, como mínimo, dos o tres fuentes primarias recientes que cubran ejes distintos y una comprobación de identidad organizativa.

### 9.2. Falange y organizaciones históricas

No existe una «cuota histórica». Falange aparece cinco veces porque consta una candidatura reciente en Andalucía y Castilla y León en 2026 y porque superó el 0,02 % en Madrid, Castilla-La Mancha y Murcia en 2023. La candidatura de 2026 es además evidencia oficial posterior para esas tres fichas de 2023. No concurrió en los últimos procesos de Extremadura o La Rioja y, por tanto, no se añade allí. El Partido Cantonal de Cartagena se conserva porque superó el umbral murciano, pero su antigüedad no sustituye una prueba de actividad posterior. No se añadió ninguna excepción por debajo del corte en estas siete elecciones.

### 9.3. Evidencia de vigencia posterior utilizada

- Los resultados oficiales de [Andalucía 2026](https://www.juntadeandalucia.es/boja/2026/108/BOJA26-108-00091-7541-01_00338776.pdf), [Castilla y León 2026](https://bocyl.jcyl.es/html/2026/04/29/html/BOCYL-D-29042026-80-13.do) y [Extremadura 2025](https://doe.juntaex.es/pdfs/doe/2026/80o/26AC0001.pdf) verifican reapariciones posteriores de partidos inventariados en 2023. Esto prueba actividad electoral de la organización que figura con la misma identidad, no la continuidad automática de todas sus antiguas coaliciones.
- La proclamación oficial de candidaturas a las [elecciones europeas de 2024 (BOE)](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-9687) verifica al Partido Humanista y la candidatura del PCPE/PCPC. Se usa sólo para existencia electoral posterior, no para inferir posiciones.
- El [BOE de candidaturas generales de julio de 2023](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-15066) y una publicación oficial de [Campos del Río de mayo de 2026](https://camposdelrio.es/author/admincampos/page/3/) verifican la continuidad electoral y local de Por Mi Región. Los ayuntamientos de [Leganés](https://www.leganes.org/corporacion-local) y [Cartagena](https://www.cartagena.es/grupos_municipales.asp) verifican, respectivamente, los grupos actuales de ULEG y MC Cartagena.
- Las fuentes primarias de organización verifican actividad del [Partido Feminista de España](https://partidofeminista.es/category/documentos/comunicados/) y [Tercera Edad en Acción](https://3edad.org/). La web de [Por La Rioja](https://porlarioja.com/ideario-politico/) conserva identidad y programa, y su congreso de mayo de 2026 fue [documentado públicamente](https://cadenaser.com/rioja/2026/04/27/por-la-rioja-celebrara-un-congreso-extraordinario-el-23-de-mayo-en-haro-para-abrir-el-partido-y-ganar-proyeccion-nacional-bajo-el-lema-hacer-que-la-rioja-cuente-radio-rioja/). La presencia del [Partido Cantonal de Cartagena en un acto municipal de 2026](https://www.cartagena.es/gestion/documentos/83087.pdf) y sus [propuestas públicas de 2026](https://cadenaser.com/murcia/2026/05/21/el-partido-cantonal-pide-incorporar-la-unidad-de-dano-cerebral-del-rosell-en-las-cuentas-de-2026-radio-cartagena/) acreditan actividad reciente, no una futura lista autonómica.
- La historia publicada por [PR+ Riojan@s](https://www.partidoriojano.es/historia/) documenta su cambio de marca en 2026 y el anuncio de VINEA de no concurrir en 2027, con integración abierta de sus afiliados. Esto no permite afirmar una disolución registral de VINEA.
- La representación se refiere al mandato surgido de los resultados oficiales enlazados. Para una coalición, se atribuye a la lista fechada; no se convierte en partido unitario ni demuestra que todos sus componentes sigan juntos.
- Cuando estas fuentes no ofrecieron una continuación inequívoca se dejó `no-comprobada`. Esta revisión no sustituye una consulta futura al Registro de Partidos, porque estar inscrito tampoco prueba actividad política sustantiva.

## 10. JSON normalizado

Este bloque es el inventario canónico derivado de las tablas. `pct` siempre usa el denominador autonómico declarado en `elecciones`; `circ: ["todas"]` significa todas las circunscripciones de ese proceso, no todo el Estado. `tipo` describe la entidad que sostuvo la candidatura, mientras `actividad` describe la evidencia disponible al corte. Por tanto, una `coalicion-electoral` con `matrices-verificadas` sigue siendo una marca fechada. `nombrePapeleta` conserva la denominación proclamada; la única lista con variantes provinciales, `and-2026-andalucistas`, usa `nombreResultado` y `nombresPapeletaPorCircunscripcion` para no fabricar una falsa papeleta autonómica única.

```json
{
  "schema": "espectro/candidaturas-autonomicas-centro-sur@1",
  "corte": "2026-07-09",
  "reglaPorcentaje": "100 * votos / votos_a_candidaturas_en_la_comunidad",
  "elecciones": {
    "AND-2026": {"ccaa":"Andalucía","fecha":"2026-05-17","votosCandidaturas":4157536,"sumaFilasOficiales":4157539,"descuadreFilasVsDenominador":3,"umbralVotos":832,"convocatoria":"anticipada-fin-de-ciclo","fuenteResultado":"https://www.juntadeandalucia.es/boja/2026/108/BOJA26-108-00091-7541-01_00338776.pdf","fuenteIdentidad":"https://www.juntaelectoralcentral.es/cs/jec/documentos/andalucia_2026_candidaturas_proclamadas.pdf"},
    "CYL-2026": {"ccaa":"Castilla y León","fecha":"2026-03-15","votosCandidaturas":1236753,"umbralVotos":248,"convocatoria":"fin-de-legislatura","fuenteResultado":"https://bocyl.jcyl.es/html/2026/04/29/html/BOCYL-D-29042026-80-13.do","fuenteIdentidad":"https://bocyl.jcyl.es/boletin.do?fechaBoletin=17%2F02%2F2026"},
    "EXT-2025": {"ccaa":"Extremadura","fecha":"2025-12-21","votosCandidaturas":524837,"umbralVotos":105,"convocatoria":"anticipada","fuenteResultado":"https://doe.juntaex.es/pdfs/doe/2026/80o/26AC0001.pdf","fuenteIdentidad":"https://www.juntaelectoralcentral.es/cs/jec/informacion/enlaces/CoalicionesEXT_2025"},
    "MAD-2023": {"ccaa":"Comunidad de Madrid","fecha":"2023-05-28","votosCandidaturas":3344370,"umbralVotos":669,"convocatoria":"ordinaria","fuenteResultado":"https://www.bocm.es/boletin/CM_Orden_BOCM/2023/06/09/BOCM-20230609-72.PDF","fuenteIdentidad":"https://www.juntaelectoralcentral.es/cs/jec/informacion/enlaces/CoalicionesMAD_2023"},
    "CLM-2023": {"ccaa":"Castilla-La Mancha","fecha":"2023-05-28","votosCandidaturas":1072883,"umbralVotos":215,"convocatoria":"ordinaria","fuenteResultado":"https://www.juntaelectoralcentral.es/cs/jec/documentos/Resultados%20definitivos%20Castilla%20La%20Mancha.pdf"},
    "MUR-2023": {"ccaa":"Región de Murcia","fecha":"2023-05-28","votosCandidaturas":676554,"umbralVotos":136,"convocatoria":"ordinaria","fuenteResultado":"https://econet.carm.es/web/crem/inicio/-/crem/sicrem/PU2077/sec51.html"},
    "RIO-2023": {"ccaa":"La Rioja","fecha":"2023-05-28","votosCandidaturas":165559,"umbralVotos":34,"convocatoria":"ordinaria","fuenteResultado":"https://www.juntaelectoralcentral.es/cs/jec/documentos/Escrutinio%20General.pdf","fuenteIdentidad":"https://www.juntaelectoralcentral.es/cs/Satellite?c=JECInfoGeneral_C&childpagename=JEC%2FJEC_Layout&cid=1408441868692&d=Touch&packedargs=d%3DTouch&pagename=jec%2Fwrapper%2FJEC_Wrapper"}
  },
  "candidaturas": [
    {"id":"and-2026-pp","eleccion":"AND-2026","nombrePapeleta":"PARTIDO POPULAR","votos":1744728,"pct":41.965,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"and-2026-psoe-a","eleccion":"AND-2026","nombrePapeleta":"PARTIDO SOCIALISTA OBRERO ESPAÑOL DE ANDALUCÍA","votos":955584,"pct":22.984,"tipo":"federacion-territorial","componentes":[],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"and-2026-vox","eleccion":"AND-2026","nombrePapeleta":"VOX","votos":580293,"pct":13.958,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"and-2026-adelante","eleccion":"AND-2026","nombrePapeleta":"ADELANTE ANDALUCÍA","votos":403560,"pct":9.707,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"and-2026-por-andalucia","eleccion":"AND-2026","nombrePapeleta":"POR ANDALUCÍA: IZQUIERDA UNIDA ANDALUCÍA–PODEMOS–MOVIMIENTO SUMAR–INICIATIVA DEL PUEBLO ANDALUZ–VERDES EQUO–ALTERNATIVA REPUBLICANA–ALIANZA VERDE","votos":266213,"pct":6.403,"tipo":"coalicion-electoral","componentes":["Izquierda Unida Andalucía","Podemos","Movimiento Sumar","Iniciativa del Pueblo Andaluz","Verdes Equo","Alternativa Republicana","Alianza Verde"],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"and-2026-salf","eleccion":"AND-2026","nombrePapeleta":"SE ACABÓ LA FIESTA","votos":106322,"pct":2.557,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"and-2026-pacma","eleccion":"AND-2026","nombrePapeleta":"PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE","votos":25374,"pct":0.610,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"and-2026-100x100","eleccion":"AND-2026","nombrePapeleta":"100X100 UNIDOS","votos":14786,"pct":0.356,"tipo":"partido-o-candidatura","componentes":[],"circ":["Cádiz"],"actividad":"electoral-2026","destino":"inventario-sin-datos"},
    {"id":"and-2026-andalucistas","eleccion":"AND-2026","nombreResultado":"ANDALUCISTAS PUEBLO ANDALUZ","nombresPapeletaPorCircunscripcion":{"Almería":"ANDALUCISTAS - PUEBLO ANDALUZ","Cádiz":"ANDALUCISTAS - PUEBLO ANDALUZ - ANDALUCÍA POR SÍ - ANDALUCISTAS LINENSES","Córdoba":"ANDALUCISTAS - PUEBLO ANDALUZ - ANDALUCÍA, ENTRE TODOS - ANDALUCÍA POR SÍ","Granada":"ANDALUCISTAS - PUEBLO ANDALUZ - CONVERGENCIA ANDALUZA - COMPROMISO POR ANDALUCÍA - ANDALUCÍA POR SÍ","Huelva":"ANDALUCISTAS - PUEBLO ANDALUZ - ANDALUCÍA POR SÍ","Jaén":"ANDALUCISTAS - PUEBLO ANDALUZ - ANDALUCÍA POR SÍ – STOP BIOGAS","Málaga":"ANDALUCISTAS - PUEBLO ANDALUZ - ANDALUCÍA POR SÍ","Sevilla":"ANDALUCISTAS - PUEBLO ANDALUZ - ANDALUCÍA POR SÍ – FORO MONTELLANO"},"votos":12157,"pct":0.292,"tipo":"coalicion-electoral","componentes":["Andalucía Por Sí-Andalucistas","Convergencia Andaluza-Andalucistas","Andalucía Entre Tod@s","Compromiso por Andalucía","Andaluces Levantaos","Andalucistas Linenses","Foro de Montellano"],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"and-2026-eb","eleccion":"AND-2026","nombrePapeleta":"ESCAÑOS EN BLANCO PARA DEJAR ESCAÑOS VACÍOS","votos":9347,"pct":0.225,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"and-2026-jaen-mas","eleccion":"AND-2026","nombrePapeleta":"JAÉN MERECE MÁS","votos":7993,"pct":0.192,"tipo":"partido-o-candidatura","componentes":[],"circ":["Jaén"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"and-2026-pcpa","eleccion":"AND-2026","nombrePapeleta":"PARTIDO COMUNISTA DEL PUEBLO ANDALUZ","votos":5716,"pct":0.137,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"and-2026-fe","eleccion":"AND-2026","nombrePapeleta":"FALANGE ESPAÑOLA DE LAS JONS","votos":4995,"pct":0.120,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"and-2026-mas-justo","eleccion":"AND-2026","nombrePapeleta":"POR UN MUNDO MÁS JUSTO","votos":4790,"pct":0.115,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"and-2026-autonomos","eleccion":"AND-2026","nombrePapeleta":"PARTIDO AUTÓNOMOS","votos":3752,"pct":0.090,"tipo":"partido-o-candidatura","componentes":[],"circ":["Almería","Cádiz","Málaga","Sevilla"],"actividad":"electoral-2026","destino":"inventario-sin-datos"},
    {"id":"and-2026-nacion-andaluza","eleccion":"AND-2026","nombrePapeleta":"NACIÓN ANDALUZA","votos":3004,"pct":0.072,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"and-2026-huelva-existe","eleccion":"AND-2026","nombrePapeleta":"HUELVA EXISTE","votos":2148,"pct":0.052,"tipo":"coalicion-electoral","componentes":[],"circ":["Huelva"],"actividad":"electoral-2026","destino":"inventario-sin-datos"},
    {"id":"and-2026-pcte","eleccion":"AND-2026","nombrePapeleta":"PARTIDO COMUNISTA DE LOS TRABAJADORES DE ESPAÑA","votos":1792,"pct":0.043,"tipo":"partido","componentes":[],"circ":["Córdoba","Granada","Sevilla"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"and-2026-poder-andaluz","eleccion":"AND-2026","nombrePapeleta":"PODER ANDALUZ","votos":1084,"pct":0.026,"tipo":"partido-o-candidatura","componentes":[],"circ":["Sevilla"],"actividad":"electoral-2026","destino":"inventario-sin-datos"},

    {"id":"cyl-2026-pp","eleccion":"CYL-2026","nombrePapeleta":"PARTIDO POPULAR","votos":444296,"pct":35.924,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"cyl-2026-psoe","eleccion":"CYL-2026","nombrePapeleta":"PARTIDO SOCIALISTA OBRERO ESPAÑOL","votos":386774,"pct":31.273,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"cyl-2026-vox","eleccion":"CYL-2026","nombrePapeleta":"VOX","votos":237100,"pct":19.171,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"cyl-2026-upl","eleccion":"CYL-2026","nombrePapeleta":"UNIÓN DEL PUEBLO LEONÉS","votos":54096,"pct":4.374,"tipo":"partido","componentes":[],"circ":["León","Salamanca","Zamora"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"cyl-2026-iu-ms-vq","eleccion":"CYL-2026","nombrePapeleta":"IZQUIERDA UNIDA-MOVIMIENTO SUMAR-VERDES EQUO","votos":28255,"pct":2.285,"tipo":"coalicion-electoral","componentes":["Izquierda Unida","Movimiento Sumar","Verdes Equo"],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"cyl-2026-salf","eleccion":"CYL-2026","nombrePapeleta":"SE ACABÓ LA FIESTA","votos":17554,"pct":1.419,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"cyl-2026-xav","eleccion":"CYL-2026","nombrePapeleta":"POR ÁVILA","votos":11518,"pct":0.931,"tipo":"partido","componentes":[],"circ":["Ávila","Valladolid"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"cyl-2026-podemos-av","eleccion":"CYL-2026","nombrePapeleta":"PODEMOS-ALIANZA VERDE CYL 2026","votos":9597,"pct":0.776,"tipo":"coalicion-electoral","componentes":["Podemos","Alianza Verde"],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"cyl-2026-soria-ya","eleccion":"CYL-2026","nombrePapeleta":"SORIA ¡YA!","votos":9145,"pct":0.739,"tipo":"partido-o-candidatura","componentes":[],"circ":["Soria"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"cyl-2026-pacma","eleccion":"CYL-2026","nombrePapeleta":"PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE","votos":5267,"pct":0.426,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"cyl-2026-eb","eleccion":"CYL-2026","nombrePapeleta":"ESCAÑOS EN BLANCO PARA DEJAR ESCAÑOS VACÍOS","votos":4861,"pct":0.393,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"cyl-2026-cs","eleccion":"CYL-2026","nombrePapeleta":"CIUDADANOS-PARTIDO DE LA CIUDADANÍA","votos":4509,"pct":0.365,"tipo":"partido","componentes":[],"circ":["Ávila","Burgos","León","Salamanca","Soria","Valladolid","Zamora"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"cyl-2026-nueve","eleccion":"CYL-2026","nombrePapeleta":"NUEVE CASTILLA Y LEÓN","votos":3858,"pct":0.312,"tipo":"partido-o-candidatura","componentes":[],"circ":["Ávila","León","Salamanca","Segovia","Soria","Valladolid","Zamora"],"actividad":"electoral-2026","destino":"inventario-sin-datos"},
    {"id":"cyl-2026-vbm","eleccion":"CYL-2026","nombrePapeleta":"VÍA BURGALESA MUNICIPALISTA","votos":3621,"pct":0.293,"tipo":"coalicion-electoral","componentes":[],"circ":["Burgos"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"cyl-2026-pcas-tc","eleccion":"CYL-2026","nombrePapeleta":"PARTIDO CASTELLANO-TIERRA COMUNERA","votos":3137,"pct":0.254,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"cyl-2026-bierzo","eleccion":"CYL-2026","nombrePapeleta":"COALICIÓN POR EL BIERZO","votos":1992,"pct":0.161,"tipo":"federacion-de-partidos","componentes":["Partido de El Bierzo","El Bierzo Existe"],"circ":["León"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"cyl-2026-pcte","eleccion":"CYL-2026","nombrePapeleta":"PARTIDO COMUNISTA DE LOS TRABAJADORES DE ESPAÑA","votos":1744,"pct":0.141,"tipo":"partido","componentes":[],"circ":["Burgos","León","Palencia","Salamanca","Valladolid"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"cyl-2026-vamos-palencia","eleccion":"CYL-2026","nombrePapeleta":"VAMOS PALENCIA","votos":1668,"pct":0.135,"tipo":"partido-o-candidatura","componentes":[],"circ":["Palencia"],"actividad":"electoral-2026","destino":"inventario-sin-datos"},
    {"id":"cyl-2026-mas-justo","eleccion":"CYL-2026","nombrePapeleta":"POR UN MUNDO MÁS JUSTO","votos":1664,"pct":0.135,"tipo":"partido","componentes":[],"circ":["Burgos","Palencia","Salamanca","Segovia","Valladolid","Zamora"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"cyl-2026-ev","eleccion":"CYL-2026","nombrePapeleta":"ESPAÑA VACIADA","votos":1125,"pct":0.091,"tipo":"partido-o-candidatura","componentes":[],"circ":["Palencia","Salamanca"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"cyl-2026-ad-ev","eleccion":"CYL-2026","nombrePapeleta":"AHORA DECIDE-ESPAÑA VACIADA","votos":1000,"pct":0.081,"tipo":"coalicion-electoral","componentes":["Ahora Decide","España Vaciada"],"circ":["Zamora"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"cyl-2026-mev","eleccion":"CYL-2026","nombrePapeleta":"MUNICIPALISTAS-ESPAÑA VACIADA","votos":953,"pct":0.077,"tipo":"coalicion-electoral","componentes":["Municipalistas","España Vaciada"],"circ":["Valladolid"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"cyl-2026-pancal-urci","eleccion":"CYL-2026","nombrePapeleta":"PARTIDO NACIONALISTA DE CASTILLA Y LEÓN-UNIÓN REFORMISTA CIUDADANA","votos":940,"pct":0.076,"tipo":"partido-o-candidatura","componentes":[],"circ":["Palencia","Salamanca","Valladolid","Zamora"],"actividad":"electoral-2026","destino":"inventario-sin-datos"},
    {"id":"cyl-2026-fe","eleccion":"CYL-2026","nombrePapeleta":"FALANGE ESPAÑOLA DE LAS J.O.N.S.","votos":810,"pct":0.065,"tipo":"partido","componentes":[],"circ":["Ávila","Palencia","Valladolid"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"cyl-2026-decide-nueve","eleccion":"CYL-2026","nombrePapeleta":"DECIDE NUEVE CYL","votos":501,"pct":0.041,"tipo":"coalicion-electoral","componentes":[],"circ":["Burgos"],"actividad":"electoral-2026","destino":"inventario-sin-datos"},
    {"id":"cyl-2026-alantre","eleccion":"CYL-2026","nombrePapeleta":"PROYECTO ALANTRE","votos":391,"pct":0.032,"tipo":"partido-o-candidatura","componentes":[],"circ":["León"],"actividad":"electoral-2026","destino":"inventario-sin-datos"},
    {"id":"cyl-2026-prepal","eleccion":"CYL-2026","nombrePapeleta":"PARTIDO REGIONALISTA DEL PAÍS LEONÉS","votos":254,"pct":0.021,"tipo":"partido","componentes":[],"circ":["León"],"actividad":"electoral-2026","destino":"inventario-sin-datos"},

    {"id":"ext-2025-pp","eleccion":"EXT-2025","nombrePapeleta":"PARTIDO POPULAR","votos":228991,"pct":43.631,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2025","destino":"perfil-reutilizable"},
    {"id":"ext-2025-psoe","eleccion":"EXT-2025","nombrePapeleta":"PARTIDO SOCIALISTA OBRERO ESPAÑOL","votos":136838,"pct":26.072,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2025","destino":"perfil-reutilizable"},
    {"id":"ext-2025-vox","eleccion":"EXT-2025","nombrePapeleta":"VOX","votos":89768,"pct":17.104,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2025","destino":"perfil-reutilizable"},
    {"id":"ext-2025-unidas","eleccion":"EXT-2025","nombrePapeleta":"UNIDAS POR EXTREMADURA PODEMOS IZQUIERDA UNIDA ALIANZA VERDE","votos":54541,"pct":10.392,"tipo":"coalicion-electoral","componentes":["Podemos","Izquierda Unida","Alianza Verde"],"circ":["todas"],"actividad":"electoral-2025","destino":"perfil-especifico"},
    {"id":"ext-2025-juntos-levanta","eleccion":"EXT-2025","nombrePapeleta":"JUNTOS POR EXTREMADURA-LEVANTA EXTREMADURA","votos":4181,"pct":0.797,"tipo":"coalicion-electoral","componentes":["Juntos por Extremadura","Levanta Extremadura"],"circ":["todas"],"actividad":"electoral-2025","destino":"perfil-especifico"},
    {"id":"ext-2025-nex","eleccion":"EXT-2025","nombrePapeleta":"NUEVO EXTREMEÑISMO-ADELANTE EXTREMADURA","votos":3200,"pct":0.610,"tipo":"partido-o-candidatura","componentes":[],"circ":["todas"],"actividad":"electoral-2025","destino":"perfil-especifico"},
    {"id":"ext-2025-pacma","eleccion":"EXT-2025","nombrePapeleta":"PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE","votos":2302,"pct":0.439,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2025","destino":"perfil-reutilizable"},
    {"id":"ext-2025-extremadura-unida","eleccion":"EXT-2025","nombrePapeleta":"EXTREMADURA UNIDA","votos":1548,"pct":0.295,"tipo":"partido","componentes":[],"circ":["Cáceres"],"actividad":"electoral-2025","destino":"perfil-especifico"},
    {"id":"ext-2025-cs","eleccion":"EXT-2025","nombrePapeleta":"CIUDADANOS-PARTIDO DE LA CIUDADANÍA","votos":1331,"pct":0.254,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2025","destino":"perfil-reutilizable"},
    {"id":"ext-2025-ued-syt","eleccion":"EXT-2025","nombrePapeleta":"UNA EXTREMADURA DIGNA-SOBERANÍA Y TRABAJO","votos":1221,"pct":0.233,"tipo":"coalicion-electoral","componentes":["Una Extremadura Digna","Soberanía y Trabajo"],"circ":["todas"],"actividad":"electoral-2025","destino":"perfil-especifico"},
    {"id":"ext-2025-mas-justo","eleccion":"EXT-2025","nombrePapeleta":"POR UN MUNDO MÁS JUSTO","votos":916,"pct":0.175,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"electoral-2025","destino":"perfil-reutilizable"},

    {"id":"mad-2023-pp","eleccion":"MAD-2023","nombrePapeleta":"PARTIDO POPULAR","votos":1599186,"pct":47.817,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"mad-2023-mas-madrid-vq","eleccion":"MAD-2023","nombrePapeleta":"MÁS MADRID-VERDES EQUO","votos":620631,"pct":18.557,"tipo":"coalicion-electoral","componentes":["Más Madrid","Verdes Equo"],"circ":["todas"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"mad-2023-psoe","eleccion":"MAD-2023","nombrePapeleta":"PARTIDO SOCIALISTA OBRERO ESPAÑOL","votos":614296,"pct":18.368,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"mad-2023-vox","eleccion":"MAD-2023","nombrePapeleta":"VOX","votos":248379,"pct":7.427,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"mad-2023-podemos-iu-av","eleccion":"MAD-2023","nombrePapeleta":"PODEMOS-IZQUIERDA UNIDA-ALIANZA VERDE","votos":161032,"pct":4.815,"tipo":"coalicion-electoral","componentes":["Podemos","Izquierda Unida","Alianza Verde"],"circ":["todas"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"mad-2023-cs","eleccion":"MAD-2023","nombrePapeleta":"CIUDADANOS-PARTIDO DE LA CIUDADANÍA","votos":52925,"pct":1.583,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"mad-2023-pacma","eleccion":"MAD-2023","nombrePapeleta":"PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE","votos":23451,"pct":0.701,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"mad-2023-mas-justo","eleccion":"MAD-2023","nombrePapeleta":"POR UN MUNDO MÁS JUSTO","votos":7219,"pct":0.216,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"mad-2023-pfe","eleccion":"MAD-2023","nombrePapeleta":"PARTIDO FEMINISTA DE ESPAÑA","votos":5376,"pct":0.161,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"actividad-organizativa-verificada","destino":"perfil-especifico"},
    {"id":"mad-2023-pcte","eleccion":"MAD-2023","nombrePapeleta":"PARTIDO COMUNISTA DE LOS TRABAJADORES DE ESPAÑA","votos":4148,"pct":0.124,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"mad-2023-fe","eleccion":"MAD-2023","nombrePapeleta":"FALANGE ESPAÑOLA DE LAS J.O.N.S.","votos":2779,"pct":0.083,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"mad-2023-uleg","eleccion":"MAD-2023","nombrePapeleta":"UNIÓN POR LEGANÉS","votos":2544,"pct":0.076,"tipo":"partido-o-candidatura","componentes":[],"circ":["todas"],"actividad":"actividad-local-verificada","destino":"inventario-sin-datos"},
    {"id":"mad-2023-ph","eleccion":"MAD-2023","nombrePapeleta":"PARTIDO HUMANISTA","votos":2404,"pct":0.072,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-especifico"},

    {"id":"clm-2023-psoe","eleccion":"CLM-2023","nombrePapeleta":"PARTIDO SOCIALISTA OBRERO ESPAÑOL","votos":490288,"pct":45.698,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"clm-2023-pp","eleccion":"CLM-2023","nombrePapeleta":"PARTIDO POPULAR","votos":366312,"pct":34.143,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"clm-2023-vox","eleccion":"CLM-2023","nombrePapeleta":"VOX","votos":139607,"pct":13.012,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"clm-2023-unidas","eleccion":"CLM-2023","nombrePapeleta":"UNIDAS PODEMOS CASTILLA-LA MANCHA","votos":45317,"pct":4.224,"tipo":"coalicion-electoral","componentes":["Podemos","Izquierda Unida"],"circ":["todas"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"clm-2023-cs","eleccion":"CLM-2023","nombrePapeleta":"CIUDADANOS-PARTIDO DE LA CIUDADANÍA","votos":10885,"pct":1.015,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"clm-2023-pacma","eleccion":"CLM-2023","nombrePapeleta":"PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE","votos":10727,"pct":1.000,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"clm-2023-pais-gestores","eleccion":"CLM-2023","nombrePapeleta":"PAÍS CON GESTORES","votos":2151,"pct":0.200,"tipo":"partido-o-candidatura","componentes":[],"circ":["Albacete","Cuenca","Guadalajara","Toledo"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"clm-2023-cuenca-ev","eleccion":"CLM-2023","nombrePapeleta":"+CUENCA AHORA-ESPAÑA VACIADA","votos":1984,"pct":0.185,"tipo":"coalicion-electoral","componentes":["+Cuenca Ahora","España Vaciada"],"circ":["Cuenca"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"clm-2023-ev","eleccion":"CLM-2023","nombrePapeleta":"ESPAÑA VACIADA","votos":1670,"pct":0.156,"tipo":"partido-o-candidatura","componentes":[],"circ":["Toledo"],"actividad":"posterior-verificada","destino":"perfil-especifico"},
    {"id":"clm-2023-pcas-rc","eleccion":"CLM-2023","nombrePapeleta":"PARTIDO CASTELLANO-TIERRA COMUNERA-RECORTES CERO","votos":1345,"pct":0.125,"tipo":"coalicion-o-candidatura-conjunta","componentes":["Partido Castellano-Tierra Comunera","Recortes Cero"],"circ":["Cuenca","Guadalajara","Toledo"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"clm-2023-pcpe","eleccion":"CLM-2023","nombrePapeleta":"PARTIDO COMUNISTA DE LOS PUEBLOS DE ESPAÑA","votos":989,"pct":0.092,"tipo":"partido","componentes":[],"circ":["Toledo"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"clm-2023-aqui-ahora","eleccion":"CLM-2023","nombrePapeleta":"AQUÍ AHORA","votos":724,"pct":0.067,"tipo":"partido-o-candidatura","componentes":[],"circ":["Toledo"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"clm-2023-tu-patria","eleccion":"CLM-2023","nombrePapeleta":"TÚpatria","votos":585,"pct":0.055,"tipo":"partido-o-candidatura","componentes":[],"circ":["Cuenca"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"clm-2023-fe","eleccion":"CLM-2023","nombrePapeleta":"FALANGE ESPAÑOLA DE LAS JONS","votos":299,"pct":0.028,"tipo":"partido","componentes":[],"circ":["Guadalajara"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},

    {"id":"mur-2023-pp","eleccion":"MUR-2023","nombrePapeleta":"Partido Popular","votos":293051,"pct":43.315,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"mur-2023-psoe","eleccion":"MUR-2023","nombrePapeleta":"Partido Socialista Obrero Español","votos":175505,"pct":25.941,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"mur-2023-vox","eleccion":"MUR-2023","nombrePapeleta":"VOX","votos":121321,"pct":17.932,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"mur-2023-podemos-iu-av","eleccion":"MUR-2023","nombrePapeleta":"Podemos-Izquierda Unida Verdes-Alianza Verde","votos":32173,"pct":4.755,"tipo":"coalicion-electoral","componentes":["Podemos","Izquierda Unida-Verdes","Alianza Verde"],"circ":["todas"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"mur-2023-mc","eleccion":"MUR-2023","nombrePapeleta":"MC Regional","votos":20206,"pct":2.987,"tipo":"partido-o-candidatura","componentes":[],"circ":["todas"],"actividad":"actividad-local-verificada","destino":"perfil-especifico"},
    {"id":"mur-2023-cs","eleccion":"MUR-2023","nombrePapeleta":"Ciudadanos-Partido de la Ciudadanía","votos":10480,"pct":1.549,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"mur-2023-mas-region-vq","eleccion":"MUR-2023","nombrePapeleta":"Mas Region-Verdes Equo","votos":8919,"pct":1.318,"tipo":"coalicion-electoral","componentes":["Más Región","Verdes Equo"],"circ":["todas"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"mur-2023-pacma","eleccion":"MUR-2023","nombrePapeleta":"Partido Animalista Con el Medio Ambiente","votos":5957,"pct":0.880,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"mur-2023-por-mi-region","eleccion":"MUR-2023","nombrePapeleta":"Por mi Region","votos":2449,"pct":0.362,"tipo":"partido-o-candidatura","componentes":[],"circ":["todas"],"actividad":"actividad-local-verificada","destino":"perfil-especifico"},
    {"id":"mur-2023-3e","eleccion":"MUR-2023","nombrePapeleta":"Tercera Edad en Acción","votos":1479,"pct":0.219,"tipo":"partido-o-candidatura","componentes":[],"circ":["todas"],"actividad":"actividad-organizativa-verificada","destino":"perfil-especifico"},
    {"id":"mur-2023-murcia-libre","eleccion":"MUR-2023","nombrePapeleta":"Murcia Libre","votos":1442,"pct":0.213,"tipo":"partido-o-candidatura","componentes":[],"circ":["todas"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"mur-2023-valores","eleccion":"MUR-2023","nombrePapeleta":"Valores","votos":1336,"pct":0.197,"tipo":"partido-o-candidatura","componentes":[],"circ":["todas"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"mur-2023-pcpe","eleccion":"MUR-2023","nombrePapeleta":"Partido Comunista de los Pueblos de España","votos":1152,"pct":0.170,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"mur-2023-fe","eleccion":"MUR-2023","nombrePapeleta":"Falange Española de las J.O.N.S","votos":554,"pct":0.082,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"mur-2023-pcan","eleccion":"MUR-2023","nombrePapeleta":"Partido Cantonal de Cartagena","votos":530,"pct":0.078,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"actividad-organizativa-verificada","destino":"perfil-especifico"},

    {"id":"rio-2023-pp","eleccion":"RIO-2023","nombrePapeleta":"PARTIDO POPULAR","votos":76205,"pct":46.029,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"rio-2023-psoe","eleccion":"RIO-2023","nombrePapeleta":"PARTIDO SOCIALISTA OBRERO ESPAÑOL","votos":53562,"pct":32.352,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"rio-2023-vox","eleccion":"RIO-2023","nombrePapeleta":"VOX","votos":12773,"pct":7.715,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"rio-2023-podemos-iu","eleccion":"RIO-2023","nombrePapeleta":"PODEMOS-IZQUIERDA UNIDA","votos":8543,"pct":5.160,"tipo":"coalicion-electoral","componentes":["Podemos","Izquierda Unida"],"circ":["todas"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"rio-2023-pr-ev","eleccion":"RIO-2023","nombrePapeleta":"PARTIDO RIOJANO+ESPAÑA VACIADA","votos":6016,"pct":3.634,"tipo":"coalicion-electoral","componentes":["Partido Riojano","España Vaciada"],"circ":["todas"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"rio-2023-por-la-rioja","eleccion":"RIO-2023","nombrePapeleta":"POR LA RIOJA","votos":4349,"pct":2.627,"tipo":"partido-o-candidatura","componentes":[],"circ":["todas"],"actividad":"actividad-organizativa-verificada","destino":"perfil-especifico"},
    {"id":"rio-2023-cs","eleccion":"RIO-2023","nombrePapeleta":"CIUDADANOS-PARTIDO DE LA CIUDADANÍA","votos":1473,"pct":0.890,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"rio-2023-pacma","eleccion":"RIO-2023","nombrePapeleta":"PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE","votos":1065,"pct":0.643,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"rio-2023-vinea","eleccion":"RIO-2023","nombrePapeleta":"VINEA La Rioja","votos":954,"pct":0.576,"tipo":"partido-o-candidatura","componentes":[],"circ":["todas"],"actividad":"reordenacion-2026","destino":"inventario-sin-datos"},
    {"id":"rio-2023-eb","eleccion":"RIO-2023","nombrePapeleta":"ESCAÑOS EN BLANCO PARA DEJAR ESCAÑOS VACÍOS","votos":619,"pct":0.374,"tipo":"partido","componentes":[],"circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"}
  ],
  "fuentesActividad": {
    "andalucia2026": "https://www.juntadeandalucia.es/boja/2026/108/BOJA26-108-00091-7541-01_00338776.pdf",
    "castillaLeon2026": "https://bocyl.jcyl.es/html/2026/04/29/html/BOCYL-D-29042026-80-13.do",
    "extremadura2025": "https://doe.juntaex.es/pdfs/doe/2026/80o/26AC0001.pdf",
    "europeas2024Proclamacion": "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-9687",
    "convocatoriaAndalucia2026": "https://www.juntadeandalucia.es/boja/2026/505/1",
    "convocatoriaCastillaLeon2026": "https://bocyl.jcyl.es/boletin.do?fechaBoletin=20%2F01%2F2026",
    "convocatoriaAnticipadaExtremadura2025": "https://doe.juntaex.es/otrosFormatos/html.php?anio=2025&doe=2070o&xml=2025040248",
    "coalicionPorElBierzoEstatutos": "https://www.coalicionporelbierzo.org/wp-content/uploads/2023/06/estatutos-cb-oct23.pdf",
    "generales2023Proclamacion": "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-15066",
    "porMiRegionActividadLocal2026": "https://camposdelrio.es/author/admincampos/page/3/",
    "ulegCorporacion2023_2027": "https://www.leganes.org/corporacion-local",
    "mcCartagenaCorporacion2026": "https://www.cartagena.es/grupos_municipales.asp",
    "partidoFeministaEstatutos2025": "https://partidofeminista.es/estatutos-del-partido-feminista/",
    "partidoFeministaComunicados2026": "https://partidofeminista.es/category/documentos/comunicados/",
    "terceraEdadActividad2026": "https://3edad.org/",
    "porLaRiojaOrganizacion": "https://porlarioja.com/ideario-politico/",
    "porLaRiojaCongreso2026": "https://cadenaser.com/rioja/2026/04/27/por-la-rioja-celebrara-un-congreso-extraordinario-el-23-de-mayo-en-haro-para-abrir-el-partido-y-ganar-proyeccion-nacional-bajo-el-lema-hacer-que-la-rioja-cuente-radio-rioja/",
    "partidoCantonalActividadMunicipal2026": "https://www.cartagena.es/gestion/documentos/83087.pdf",
    "partidoCantonalPropuesta2026": "https://cadenaser.com/murcia/2026/05/21/el-partido-cantonal-pide-incorporar-la-unidad-de-dano-cerebral-del-rosell-en-las-cuentas-de-2026-radio-cartagena/",
    "prRiojanosHistoriaYVinea2026": "https://www.partidoriojano.es/historia/"
  }
}
```
