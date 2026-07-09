# Candidaturas autonómicas restantes: universo electoral y prioridad de perfiles

**Corte de vigencia:** 9 de julio de 2026
**Ámbito:** Aragón, Principado de Asturias, Canarias, Cantabria, Illes Balears, Comunitat Valenciana, Ceuta y Melilla
**Objeto:** completar el inventario autonómico de España con una regla reproducible, separando candidatura fechada, organización, coalición y actividad posterior.

## 1. Regla de inclusión, agregación y cautelas

Se usa la elección más reciente con escrutinio definitivo disponible al corte. Se incluyen todas las candidaturas que alcanzan el **0,02 % de los votos a candidaturas del conjunto territorial**. El porcentaje se recalcula como `100 × votos / votos a candidaturas`; el corte entero es `techo(denominador × 0,0002)`. No se usa censo, participación ni voto válido —este último incluye el blanco—.

Cuando una misma formación concurre en varias circunscripciones, se agregan sus votos y se mantiene la cobertura. Si el rótulo cambia por circunscripción, el agregado conserva las variantes oficiales. En Canarias, donde cada elector dispone de voto autonómico y voto insular, el universo incluye **ambos planos**: el denominador suma los votos a candidaturas de la circunscripción autonómica y de las siete insulares, exactamente igual que el anexo oficial que agrega los votos de cada formación.

Una denominación electoral no basta para asignar ideología. Una coalición queda fechada; la actividad posterior de sus matrices no demuestra que la alianza siga unida. `no-comprobada` significa que esta revisión no encontró evidencia primaria posterior suficiente, no que la organización esté jurídicamente disuelta.

### 1.1. Estados y destinos

| Código | Significado |
|---|---|
| `electoral-2026` | La candidatura concurrió en Aragón en febrero de 2026. |
| `representacion-2023-2027` | La lista obtuvo escaño en un mandato todavía abierto al corte; para coaliciones no se presume continuidad futura. |
| `posterior-verificada` | La organización reaparece en una proclamación o resultado oficial posterior. |
| `matrices-verificadas` | La coalición fue fechada, pero una o varias matrices tienen actividad posterior verificable. |
| `actividad-organizativa-verificada` | Existe actividad primaria reciente, sin acreditar futura candidatura autonómica. |
| `no-comprobada` | No se verificó continuación suficiente después del proceso inventariado. |
| `perfil-reutilizable` | Conviene reutilizar un perfil estatal con capa territorial. |
| `perfil-especifico` | Conviene investigar un perfil territorial o de coalición propio. |
| `inventario-sin-datos` | Se conserva identidad y resultado, pero faltan posiciones suficientes para puntuar. |

### 1.2. Elecciones, denominadores y cobertura

| Territorio | Elección | Votos a candidaturas | Corte ≥0,02 % | Filas incluidas | Naturaleza |
|---|---:|---:|---:|---:|---|
| Aragón | 08-02-2026 | 660.984 | 133 | 15 | **Anticipada**: el [Decreto de 15-12-2025](https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?BASE=BOLE&CMD=VERDOC&DOCN=007954454&SEC=BUSQUEDA_AVANZADA) disolvió las Cortes elegidas en 2023 antes del término natural. |
| Principado de Asturias | 28-05-2023 | 527.500 | 106 | 15 | Ordinaria; tres circunscripciones. |
| Canarias | 28-05-2023 | 1.794.261 | 359 | 26 | Ordinaria; circunscripción autonómica más siete insulares. |
| Cantabria | 28-05-2023 | 318.919 | 64 | 12 | Ordinaria; circunscripción única. |
| Illes Balears | 28-05-2023 | 443.437 | 89 | 18 agregados | Ordinaria; Mallorca, Menorca, Ibiza y Formentera. |
| Comunitat Valenciana | 28-05-2023 | 2.435.951 | 488 | 19 | Ordinaria; Alicante, Castellón y Valencia. |
| Ceuta | 28-05-2023 | 33.888 | 7 | 8 | Asamblea de ciudad autónoma; proceso convocado con las locales. |
| Melilla | 28-05-2023 | 29.359 | 6 | 8 | Asamblea de ciudad autónoma; proceso convocado con las locales. |

Todas las candidaturas oficiales de estos ocho procesos superan el corte una vez agregadas por formación. No se necesita ninguna excepción subumbral `historica-activa`.

## 2. Aragón — 8 de febrero de 2026

**Fuente numérica:** Junta Electoral de Aragón, [resumen oficial de resultados](https://www.juntaelectoralcentral.es/cs/jec/documentos/ARAGON_2026_resumen_resultados.pdf).
**Identidad:** JEC, [proceso, candidaturas y coaliciones](https://www.juntaelectoralcentral.es/cs/jec/elecciones/Arag%C3%B3n-febrero2026?p=1392649314000). La coalición EXISTE utilizó `ARAGÓN EXISTE` en Huesca y Zaragoza y `TERUEL EXISTE - COALICIÓN EXISTE` en Teruel; el resumen agrega el resultado bajo el rótulo reproducido en la tabla.

| Candidatura / agregado oficial | Votos | % | Naturaleza y relación verificable | Cobertura | Actividad | Destino |
|---|---:|---:|---|---|---|---|
| PARTIDO POPULAR | 228.388 | 34,553 | partido | 3 provincias | `electoral-2026` | `perfil-reutilizable` |
| PARTIDO SOCIALISTA OBRERO ESPAÑOL | 162.925 | 24,649 | partido | 3 | `electoral-2026` | `perfil-reutilizable` |
| VOX | 119.281 | 18,046 | partido | 3 | `electoral-2026` | `perfil-reutilizable` |
| CHUNTA ARAGONESISTA | 65.118 | 9,852 | partido territorial | 3 | `electoral-2026` | `perfil-especifico` |
| ARAGÓN EXISTE / COALICIÓN EXISTE | 23.616 | 3,573 | coalición electoral EXISTE; variantes provinciales indicadas arriba | 3 | `electoral-2026` | `perfil-especifico` |
| IZQUIERDA UNIDA-MOVIMIENTO SUMAR | 19.832 | 3,000 | coalición: Izquierda Unida y Movimiento Sumar | 3 | `electoral-2026` | `perfil-especifico` |
| SE ACABÓ LA FIESTA | 18.256 | 2,762 | partido/candidatura | 3 | `electoral-2026` | `perfil-reutilizable` |
| PARTIDO ARAGONÉS | 8.329 | 1,260 | partido territorial | 3 | `electoral-2026` | `perfil-especifico` |
| PODEMOS ALIANZA VERDE | 6.478 | 0,980 | coalición: Podemos y Alianza Verde | 3 | `electoral-2026` | `perfil-especifico` |
| ESCAÑOS EN BLANCO PARA DEJAR ESCAÑOS VACÍOS | 4.238 | 0,641 | partido | 3 | `electoral-2026` | `perfil-reutilizable` |
| PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE | 2.742 | 0,415 | partido | 3 | `electoral-2026` | `perfil-reutilizable` |
| POR UN MUNDO MÁS JUSTO | 535 | 0,081 | partido | Huesca y Zaragoza | `electoral-2026` | `perfil-reutilizable` |
| PARTIDO COMUNISTA DE LOS TRABAJADORES DE ESPAÑA | 518 | 0,078 | partido | Zaragoza | `electoral-2026` | `perfil-reutilizable` |
| COALICIÓN ARAGONESA | 500 | 0,076 | coalición electoral registrada; no se infieren matrices sin pacto legible | 3 | `electoral-2026` | `inventario-sin-datos` |
| ENTRE TODOS BAJO/BAIX CINCA | 228 | 0,034 | partido/candidatura territorial | Huesca | `electoral-2026` | `inventario-sin-datos` |

**Control:** suma de filas = 660.984; diferencia frente al denominador = 0.

## 3. Principado de Asturias — 28 de mayo de 2023

**Fuente numérica:** Junta Electoral Provincial, [actas definitivas por Centro, Occidente y Oriente](https://www.juntaelectoralcentral.es/cs/jec/documentos/ASTURIAS_2023_Resultados.pdf).
**Identidad:** JEC, [proceso y coaliciones autonómicas](https://www.juntaelectoralcentral.es/cs/Satellite?c=JECEleccion_C&childpagename=JEC%2FJEC_Layout&cid=1408441876495&p=1379061494795&pagename=jec%2Fwrapper%2FJEC_Wrapper&rendermode=preview). `CONVOCATORIA POR ASTURIES IU-MÁS PAÍS-IAS` y `VERDES-EQUO ASTURIAS / ASTURIES` constan como coaliciones. Las tres variantes SOS se agrupan por su matriz común España Vaciada, conservando los nombres en JSON.

| Candidatura / agregado | Votos | % | Naturaleza y relación | Cobertura | Actividad | Destino |
|---|---:|---:|---|---|---|---|
| PARTIDO SOCIALISTA OBRERO ESPAÑOL | 195.999 | 37,156 | partido | 3 circ. | `representacion-2023-2027` | `perfil-reutilizable` |
| PARTIDO POPULAR | 175.131 | 33,200 | partido | 3 | `representacion-2023-2027` | `perfil-reutilizable` |
| VOX | 54.273 | 10,289 | partido | 3 | `representacion-2023-2027` | `perfil-reutilizable` |
| CONVOCATORIA POR ASTURIES IU-MÁS PAÍS-IAS | 40.774 | 7,730 | coalición: IU Asturias, Más País e Izquierda Asturiana | 3 | `representacion-2023-2027`; `matrices-verificadas` | `perfil-especifico` |
| PODEMOS ASTURIES | 21.052 | 3,991 | partido/candidatura territorial | 3 | `representacion-2023-2027` | `perfil-especifico` |
| FORO ASTURIAS | 19.652 | 3,725 | partido territorial | 3 | `representacion-2023-2027` | `perfil-especifico` |
| SOS ASTURIAS / SOS OCCIDENTE-ESPAÑA VACIADA | 5.838 | 1,107 | marcas territoriales vinculadas a España Vaciada | 3 | `matrices-verificadas` | `perfil-especifico` |
| CIUDADANOS-PARTIDO DE LA CIUDADANÍA | 4.974 | 0,943 | partido | 3 | `posterior-verificada` | `perfil-reutilizable` |
| PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE | 3.271 | 0,620 | partido | Centro y Occidente | `posterior-verificada` | `perfil-reutilizable` |
| VERDES EQUO ASTURIAS / ASTURIES | 1.717 | 0,325 | coalición electoral registrada | Centro | `matrices-verificadas` | `perfil-especifico` |
| PARTIDO COMUNISTA DE LOS TRABAJADORES DE ESPAÑA | 1.401 | 0,266 | partido | 3 | `posterior-verificada` | `perfil-reutilizable` |
| ANDECHA ASTUR | 1.245 | 0,236 | partido/candidatura territorial | 3 | `no-comprobada` | `perfil-especifico` |
| SUMA PRINCIPADO | 1.148 | 0,218 | partido/candidatura | 3 | `no-comprobada` | `inventario-sin-datos` |
| POR UN MUNDO MÁS JUSTO | 789 | 0,150 | partido | 3 | `posterior-verificada` | `perfil-reutilizable` |
| PARTIDO UNIONISTA ESTADO DE ESPAÑA | 236 | 0,045 | partido/candidatura | Centro | `no-comprobada` | `inventario-sin-datos` |

**Control:** 427.896 + 59.570 + 40.034 = 527.500; suma de agregados = 527.500.

## 4. Canarias — 28 de mayo de 2023

**Fuentes numéricas:** Junta Electoral de Canarias, [resultados generales y por circunscripción](https://www.gobiernodecanarias.org/boc/2023/121/008.html) y [corrección oficial](https://www.gobiernodecanarias.org/boc/archivo/2023/157/pda/002.html). La corrección reduce VOX en El Hierro de 104 a 102 y su total de 143.627 a **143.625**.
**Identidad:** JEC, [coaliciones válidamente constituidas](https://www.juntaelectoralcentral.es/cs/Satellite?c=JECInfoGeneral_C&childpagename=JEC%2FJEC_Layout&cid=1408441863897&pagename=jec%2Fwrapper%2FJEC_Wrapper&rendermode=preview).

| Formación agregada oficial | Votos | % | Naturaleza y relación | Cobertura | Actividad | Destino |
|---|---:|---:|---|---|---|---|
| PARTIDO SOCIALISTA OBRERO ESPAÑOL | 543.780 | 30,307 | partido | autonómica + 7 islas | `representacion-2023-2027` | `perfil-reutilizable` |
| COALICIÓN CANARIA | 376.599 | 20,989 | formación canaria; no figura entre las coaliciones electorales fechadas del proceso | autonómica + 6 islas | `representacion-2023-2027` | `perfil-especifico` |
| PARTIDO POPULAR | 360.069 | 20,068 | partido | autonómica + 7 islas | `representacion-2023-2027` | `perfil-reutilizable` |
| VOX | 143.625 | 8,005 | partido; total corregido | autonómica + 7 islas | `representacion-2023-2027` | `perfil-reutilizable` |
| NUEVA CANARIAS | 137.400 | 7,658 | partido/candidatura; electos publicados como NC-bc | autonómica + 5 islas | `representacion-2023-2027` | `perfil-especifico` |
| UNIDAS SÍ PODEMOS | 65.333 | 3,641 | coalición electoral registrada | autonómica + 6 islas | `matrices-verificadas` | `perfil-especifico` |
| DRAGO VERDES CANARIAS | 59.291 | 3,304 | coalición electoral; Drago Canarias y Verdes Equo Canarias | autonómica + 5 islas | `matrices-verificadas` | `perfil-especifico` |
| UNIDOS POR GRAN CANARIA | 30.913 | 1,723 | partido/candidatura territorial | autonómica y Gran Canaria | `no-comprobada` | `perfil-especifico` |
| PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE | 22.993 | 1,281 | partido | autonómica, Gran Canaria y Tenerife | `posterior-verificada` | `perfil-reutilizable` |
| CIUDADANOS PARTIDO DE LA CIUDADANÍA | 7.058 | 0,393 | partido | autonómica, Gran Canaria y Tenerife | `posterior-verificada` | `perfil-reutilizable` |
| AGRUPACIÓN SOCIALISTA GOMERA | 6.765 | 0,377 | partido territorial | La Gomera | `representacion-2023-2027` | `perfil-especifico` |
| ASAMBLEAS MUNICIPALES DE FUERTEVENTURA | 5.948 | 0,332 | partido/candidatura territorial | autonómica y Fuerteventura | `no-comprobada` | `perfil-especifico` |
| PARTIDO NACIONALISTA CANARIO | 4.812 | 0,268 | partido territorial | autonómica, Gran Canaria, Lanzarote y Tenerife | `no-comprobada` | `perfil-especifico` |
| REUNIR CANARIAS SOSTENIBLE | 4.310 | 0,240 | coalición electoral registrada | autonómica + 4 islas | `no-comprobada` | `inventario-sin-datos` |
| AHORA CANARIAS-PARTIDO COMUNISTA DEL PUEBLO CANARIO | 4.262 | 0,238 | coalición electoral: Ahora Canarias y PCPC | autonómica, Gran Canaria y Tenerife | `no-comprobada` | `perfil-especifico` |
| HABLEMOS AHORA | 4.030 | 0,225 | partido/candidatura territorial | Gran Canaria | `no-comprobada` | `inventario-sin-datos` |
| AHORA TÚ | 3.846 | 0,214 | coalición electoral registrada | autonómica | `no-comprobada` | `inventario-sin-datos` |
| MÁS CANARIAS | 3.830 | 0,213 | partido/candidatura territorial | autonómica, Lanzarote, La Palma y Tenerife | `no-comprobada` | `inventario-sin-datos` |
| TERCERA EDAD EN ACCIÓN | 1.898 | 0,106 | partido | El Hierro, Gran Canaria y Tenerife | `actividad-organizativa-verificada` | `perfil-especifico` |
| AGRUPACIÓN HERREÑA INDEPENDIENTE | 1.660 | 0,093 | partido territorial | El Hierro | `representacion-2023-2027` | `perfil-especifico` |
| INICIATIVA POR LA GOMERA | 1.312 | 0,073 | partido/candidatura territorial | La Gomera | `no-comprobada` | `inventario-sin-datos` |
| PAÍS CON GESTORES | 1.210 | 0,067 | partido/candidatura | autonómica | `no-comprobada` | `inventario-sin-datos` |
| ASAMBLEA HERREÑA | 1.089 | 0,061 | partido/candidatura territorial | El Hierro | `no-comprobada` | `inventario-sin-datos` |
| MOVIMIENTO ALTERNATIVO ELECTORAL | 778 | 0,043 | partido/candidatura territorial | La Palma | `no-comprobada` | `inventario-sin-datos` |
| CONTIGO SOMOS DEMOCRÁCIA | 732 | 0,041 | partido/candidatura | Fuerteventura y Gran Canaria | `no-comprobada` | `inventario-sin-datos` |
| UNIÓN DEMOCRÁTICA DE CANARIAS | 718 | 0,040 | partido/candidatura territorial | Tenerife | `no-comprobada` | `inventario-sin-datos` |

**Control:** autonómica 897.991 + insulares 896.270 = 1.794.261. Tras aplicar la corrección de VOX, las filas suman exactamente 1.794.261; el desfase de dos votos del primer BOC queda resuelto.

## 5. Cantabria — 28 de mayo de 2023

**Fuente numérica e identidad:** JEC, [proceso y resultado definitivo](https://www.juntaelectoralcentral.es/cs/Satellite?c=JECEleccion_C&childpagename=JEC%2FJEC_Layout&cid=1408441838690&p=1392648919356&pagename=jec%2Fwrapper%2FJEC_Wrapper&rendermode=preview) y [acta en PDF](https://www.juntaelectoralcentral.es/cs/jec/documentos/Cantabria%20resultados%202023.pdf). Sólo `PODEMOS-IZQUIERDA UNIDA` consta como coalición electoral autonómica.

| Candidatura | Votos | % | Naturaleza | Actividad | Destino |
|---|---:|---:|---|---|---|
| PARTIDO POPULAR DE CANTABRIA | 116.198 | 36,435 | organización territorial del PP | `representacion-2023-2027` | `perfil-reutilizable` |
| PARTIDO REGIONALISTA DE CANTABRIA | 67.523 | 21,172 | partido territorial | `representacion-2023-2027` | `perfil-especifico` |
| PARTIDO SOCIALISTA DE CANTABRIA-PSOE | 66.917 | 20,982 | federación territorial | `representacion-2023-2027` | `perfil-reutilizable` |
| VOX | 35.982 | 11,282 | partido | `representacion-2023-2027` | `perfil-reutilizable` |
| PODEMOS-IZQUIERDA UNIDA | 13.395 | 4,200 | coalición: Podemos e Izquierda Unida | `matrices-verificadas` | `perfil-especifico` |
| CIUDADANOS-PARTIDO DE LA CIUDADANIA | 7.527 | 2,360 | partido | `posterior-verificada` | `perfil-reutilizable` |
| CANTABRISTAS | 5.522 | 1,731 | partido/candidatura territorial | `no-comprobada` | `perfil-especifico` |
| PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE | 1.837 | 0,576 | partido | `posterior-verificada` | `perfil-reutilizable` |
| VERDES EQUO | 1.548 | 0,485 | partido/candidatura territorial | `matrices-verificadas` | `perfil-especifico` |
| OLA CANTABRIA | 1.125 | 0,353 | partido/candidatura territorial | `no-comprobada` | `inventario-sin-datos` |
| PARTIDO COMUNISTA DE LOS TRABAJADORES DE ESPAÑA | 757 | 0,237 | partido | `posterior-verificada` | `perfil-reutilizable` |
| CANTABRIA DISTINTA | 588 | 0,184 | partido/candidatura territorial | `no-comprobada` | `inventario-sin-datos` |

**Control:** suma = denominador = 318.919.

## 6. Illes Balears — 28 de mayo de 2023

**Fuente numérica:** Junta Electoral de les Illes Balears, [actas definitivas de las cuatro circunscripciones](https://www.juntaelectoralcentral.es/cs/jec/documentos/BALEARES_2023_Resultados.pdf).
**Identidad:** JEC, [proceso](https://www.juntaelectoralcentral.es/cs/jec/elecciones/Baleares-mayo2023?p=1392649819891) y [coaliciones constituidas](https://www.juntaelectoralcentral.es/cs/Satellite?c=JECInfoGeneral_C&childpagename=JEC%2FJEC_Layout&cid=1408441881275&packedargs=d%3DTouch&pagename=jec%2Fwrapper%2FJEC_Wrapper). PP, PSIB, VOX, Unidas Podemos, Cs, Progreso en Verde-PACMA y Proyecto Liberal se agregan sólo donde conservan la misma identidad; las coaliciones insulares se mantienen separadas.

| Candidatura / agregado | Votos | % | Naturaleza y relación | Cobertura | Actividad | Destino |
|---|---:|---:|---|---|---|---|
| Partido Popular | 161.267 | 36,368 | partido; no incluye Sa Unió | Mallorca, Menorca, Ibiza | `representacion-2023-2027` | `perfil-reutilizable` |
| Partit Socialista de les Illes Balears | 119.540 | 26,958 | federación territorial; no incluye GxF+PSIB | Mallorca, Menorca, Ibiza | `representacion-2023-2027` | `perfil-reutilizable` |
| VOX | 62.637 | 14,125 | partido | 4 islas | `representacion-2023-2027` | `perfil-reutilizable` |
| MÉS per Mallorca | 37.651 | 8,491 | partido/formación territorial | Mallorca | `representacion-2023-2027` | `perfil-especifico` |
| Unidas Podemos | 19.980 | 4,506 | coalición: Podemos y Esquerra Unida de les Illes Balears | Mallorca, Menorca, Ibiza | `matrices-verificadas` | `perfil-especifico` |
| El PI-Proposta per les Illes Balears | 17.089 | 3,854 | partido territorial | Mallorca | `no-comprobada` | `perfil-especifico` |
| MÉS per Menorca | 6.486 | 1,463 | partido/formación territorial distinta de MÉS per Mallorca | Menorca | `representacion-2023-2027` | `perfil-especifico` |
| Ciudadanos-Partido de la Ciudadanía | 6.097 | 1,375 | partido | Mallorca, Menorca, Ibiza | `posterior-verificada` | `perfil-reutilizable` |
| Progreso en Verde-PACMA | 4.389 | 0,990 | coalición: Progreso en Verde y PACMA | Mallorca, Ibiza, Formentera | `matrices-verificadas` | `perfil-especifico` |
| Sa Unió de Formentera (PP-Compromís) | 1.747 | 0,394 | coalición: PP y Compromís amb Formentera | Formentera | escaño electo en 2023; continuidad exacta `no-comprobada` | `perfil-especifico` |
| Gent per Formentera + Partit Socialista de les Illes Balears | 1.679 | 0,379 | coalición: GxF y PSIB-PSOE | Formentera | `matrices-verificadas` | `perfil-especifico` |
| Ara Eivissa | 1.407 | 0,317 | partido/candidatura territorial | Ibiza | `no-comprobada` | `perfil-especifico` |
| Proyecto Liberal Español | 817 | 0,184 | partido/candidatura | Mallorca y Menorca | `no-comprobada` | `inventario-sin-datos` |
| Coalició per Balears | 762 | 0,172 | partido/candidatura; el nombre no basta para afirmar coalición formal | Mallorca | `no-comprobada` | `inventario-sin-datos` |
| EPIC-El PI | 597 | 0,135 | coalición: EPIC-Moviment Ciutadà y El PI | Ibiza | `matrices-verificadas` | `perfil-especifico` |
| Reset-Reinicio Político | 509 | 0,115 | partido/candidatura | Mallorca | `no-comprobada` | `inventario-sin-datos` |
| Per Balears | 424 | 0,096 | partido/candidatura territorial | Ibiza | `no-comprobada` | `inventario-sin-datos` |
| Nuevo Orden Nacional-Nou Ordre Nacional | 359 | 0,081 | partido/candidatura | Mallorca | `no-comprobada` | `inventario-sin-datos` |

**Control:** Mallorca 357.760 + Menorca 38.103 + Ibiza 43.892 + Formentera 3.682 = 443.437; suma de los 18 agregados = 443.437.

## 7. Comunitat Valenciana — 28 de mayo de 2023

**Fuente numérica:** Junta Electoral de la Comunitat Valenciana, [resultados definitivos](https://www.juntaelectoralcentral.es/cs/jec/documentos/VALENCIA_2023_Resultados.pdf).
**Identidad:** JEC, [proceso](https://www.juntaelectoralcentral.es/cs/jec/elecciones/Valencia-mayo2023?p=1379061494795) y [coaliciones](https://www.juntaelectoralcentral.es/cs/jec/informacion/enlaces/CoalicionesVAL_2023). Compromís, Units, UP-EUPV, Recortes Cero y Centrats constan formalmente como coaliciones.

| Candidatura | Votos | % | Naturaleza y relación | Cobertura | Actividad | Destino |
|---|---:|---:|---|---|---|---|
| Partido Popular | 881.893 | 36,203 | partido | 3 provincias | `representacion-2023-2027` | `perfil-reutilizable` |
| Partido Socialista Obrero Español | 708.142 | 29,070 | partido/federación territorial | 3 | `representacion-2023-2027` | `perfil-reutilizable` |
| Compromís: Més-Iniciativa-Verdsequo | 357.989 | 14,696 | coalición: Més-Compromís, Iniciativa y VerdsEquo | 3 | `representacion-2023-2027`; `matrices-verificadas` | `perfil-especifico` |
| Vox | 310.184 | 12,734 | partido | 3 | `representacion-2023-2027` | `perfil-reutilizable` |
| Unides Podem-Esquerra Unida | 88.152 | 3,619 | coalición: Podem y EUPV | 3 | `matrices-verificadas` | `perfil-especifico` |
| Ciudadanos-Partido de la Ciudadanía | 37.095 | 1,523 | partido | 3 | `posterior-verificada` | `perfil-reutilizable` |
| Partido Animalista con el Medio Ambiente | 20.836 | 0,855 | partido | Alicante y Valencia | `posterior-verificada` | `perfil-reutilizable` |
| Los Verdes-Ecopacifistas (CENTRO MODERADO) | 4.846 | 0,199 | candidatura; no se infiere ideología del nombre | Alicante | `no-comprobada` | `inventario-sin-datos` |
| Esquerra Republicana del País Valencià | 4.570 | 0,188 | partido territorial | 3 | `posterior-verificada` | `perfil-especifico` |
| Coalició Units | 4.266 | 0,175 | coalición electoral; matrices no transcritas sin pacto inequívoco | 3 | `no-comprobada` | `inventario-sin-datos` |
| Partido Comunista de los Pueblos de España | 3.815 | 0,157 | partido | 3 | `posterior-verificada` | `perfil-reutilizable` |
| Recortes Cero | 2.926 | 0,120 | coalición electoral registrada | 3 | `posterior-verificada` | `perfil-reutilizable` |
| Decidix | 2.373 | 0,097 | partido/candidatura territorial | 3 | `no-comprobada` | `inventario-sin-datos` |
| Escaños en Blanco para Dejar Escaños Vacíos | 2.090 | 0,086 | partido | Valencia | `posterior-verificada` | `perfil-reutilizable` |
| República Valenciana / Partit Valencianiste Europeu | 1.745 | 0,072 | partido/candidatura territorial | 3 | `no-comprobada` | `perfil-especifico` |
| Alianza por el Comercio y la Vivienda | 1.689 | 0,069 | partido/candidatura | 3 | `no-comprobada` | `inventario-sin-datos` |
| Por un Mundo Más Justo | 1.373 | 0,056 | partido | Valencia | `posterior-verificada` | `perfil-reutilizable` |
| Centrats en la Nostra Terra | 1.326 | 0,054 | coalición electoral registrada | Castellón | `no-comprobada` | `inventario-sin-datos` |
| Partido Alicantino Regionalista - Esperanza Ciudadana | 641 | 0,026 | partido/candidatura territorial | Alicante | `no-comprobada` | `inventario-sin-datos` |

El DOGV imprime **2.426.278** en la celda total de electores, aunque las tres provincias suman 3.730.659; esa celda no es el denominador. Los votantes fueron 2.498.090, los nulos 31.104 y los blancos 31.035: `2.498.090 − 31.104 − 31.035 = 2.435.951`, cifra que coincide exactamente con la suma de candidaturas.

## 8. Ceuta y Melilla — 28 de mayo de 2023

**Fuente numérica común:** Ministerio del Interior, [área oficial de descargas](https://infoelectoral.interior.gob.es/es/elecciones-celebradas/area-de-descargas/) y [archivo definitivo de municipales y Asambleas 2023](https://infoelectoral.interior.gob.es/estaticos/docxl/apliextr/04202305_MUNI.zip). Se cruzaron el maestro de candidaturas y los ficheros finales de ámbito municipal; las sumas reproducen los denominadores oficiales.

### 8.1. Naturaleza institucional

No son parlamentos autonómicos idénticos a los de las comunidades. Los [Estatutos de Ceuta](https://www.boe.es/buscar/act.php?id=BOE-A-1995-6358) y [Melilla](https://www.boe.es/buscar/act.php?id=BOE-A-1995-6359) definen una Asamblea de 25 miembros; sus miembros ostentan también la condición de **concejales**, el proceso se rige por la legislación estatal de elecciones locales, la circunscripción es el término municipal y la fecha coincide con las locales. El [Real Decreto 207/2023](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-8458) convocó expresamente elecciones locales y a ambas Asambleas. Se inventarían aquí por ser los órganos representativos de las ciudades autónomas, pero el JSON marca `asamblea-ciudad-autonoma` y no los confunde con una cámara legislativa autonómica ordinaria.

### 8.2. Ceuta

| Candidatura | Votos | % | Escaños | Naturaleza | Actividad | Destino |
|---|---:|---:|---:|---|---|---|
| PARTIDO POPULAR | 11.774 | 34,744 | 9 | partido | `representacion-2023-2027` | `perfil-reutilizable` |
| PARTIDO SOCIALISTA OBRERO ESPAÑOL | 7.198 | 21,241 | 6 | partido | `representacion-2023-2027` | `perfil-reutilizable` |
| VOX | 7.073 | 20,872 | 5 | partido | `representacion-2023-2027` | `perfil-reutilizable` |
| MOVIMIENTO POR LA DIGNIDAD Y LA CIUDADANÍA DE CEUTA | 3.848 | 11,355 | 3 | partido territorial | `representacion-2023-2027` | `perfil-especifico` |
| CEUTA YA! | 3.442 | 10,157 | 2 | partido/candidatura territorial | `representacion-2023-2027` | `perfil-especifico` |
| CIUDADANOS-PARTIDO DE LA CIUDADANÍA | 239 | 0,705 | 0 | partido | `posterior-verificada` | `perfil-reutilizable` |
| PODEMOS | 192 | 0,567 | 0 | partido | `posterior-verificada` | `perfil-reutilizable` |
| LIBRES | 122 | 0,360 | 0 | partido/candidatura territorial | `no-comprobada` | `inventario-sin-datos` |

**Control Ceuta:** suma = denominador = 33.888.

### 8.3. Melilla

| Candidatura | Votos | % | Escaños | Naturaleza | Actividad | Destino |
|---|---:|---:|---:|---|---|---|
| PARTIDO POPULAR | 15.640 | 53,272 | 14 | partido | `representacion-2023-2027` | `perfil-reutilizable` |
| COALICIÓN POR MELILLA | 5.590 | 19,040 | 5 | partido territorial; el nombre no prueba coalición electoral fechada | `representacion-2023-2027` | `perfil-especifico` |
| PARTIDO SOCIALISTA OBRERO ESPAÑOL | 3.206 | 10,920 | 3 | partido | `representacion-2023-2027` | `perfil-reutilizable` |
| VOX | 2.957 | 10,072 | 2 | partido | `representacion-2023-2027` | `perfil-reutilizable` |
| SOMOS MELILLA | 1.524 | 5,191 | 1 | partido territorial | `representacion-2023-2027` | `perfil-especifico` |
| PODEMOS | 290 | 0,988 | 0 | partido | `posterior-verificada` | `perfil-reutilizable` |
| ADELANTE MELILLA | 78 | 0,266 | 0 | partido/candidatura territorial | `no-comprobada` | `inventario-sin-datos` |
| CREANDO MELILLA | 74 | 0,252 | 0 | partido/candidatura territorial | `no-comprobada` | `inventario-sin-datos` |

**Control Melilla:** suma = denominador = 29.359.

## 9. Actividad y decisiones de modelado

- Las propias elecciones aragonesas de 2026 prueban actividad reciente de sus quince candidaturas, pero no convierten una coalición en organización permanente.
- Los escaños oficiales de 2023 sostienen `representacion-2023-2027`. En Sa Unió se formula de manera más estrecha —«escaño electo en 2023»— para no presumir continuidad de la coalición a partir de la sola credencial.
- La [proclamación europea de 2024](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-9687), las elecciones generales de 2023 y los procesos autonómicos de 2025-2026 permiten verificar reapariciones de partidos estatales. La actividad de una matriz se registra como `matrices-verificadas`, no como continuidad de la papeleta conjunta.
- Para Tercera Edad en Acción se conserva `actividad-organizativa-verificada` por su [actividad primaria](https://3edad.org/), sin prometer candidatura futura.
- No se usa el Registro de Partidos como sinónimo de actividad: inscripción, coalición electoral, marca de papeleta y grupo institucional son entidades distintas.

## 10. JSON normalizado

El bloque siguiente sigue el mismo contrato conceptual que `data/schemas/convocatoria.schema.json`: identifica convocatoria, fecha, territorio, cámara, denominador, fuente y candidaturas. Para facilitar la investigación multiproceso usa un mapa `elecciones` y una lista agregada. `pct` siempre se calcula con el denominador territorial declarado; `tipo` y `naturaleza` materializan las relaciones entre partido, coalición y marca sin fusionar perfiles automáticamente.

```json
{
  "schema": "espectro/candidaturas-autonomicas-resto@1",
  "corte": "2026-07-09",
  "reglaPorcentaje": "100 * votos / votos_a_candidaturas_en_el_conjunto_territorial",
  "elecciones": {
    "ARA-2026": {"ccaa":"Aragón","fecha":"2026-02-08","camara":"Cortes de Aragón","tipo":"autonomicas","votosCandidaturas":660984,"sumaFilasOficiales":660984,"umbralPorcentaje":0.02,"umbralVotos":133,"totalAgregados":15,"convocatoria":"anticipada","fuenteResultado":"https://www.juntaelectoralcentral.es/cs/jec/documentos/ARAGON_2026_resumen_resultados.pdf","fuenteIdentidad":"https://www.juntaelectoralcentral.es/cs/jec/elecciones/Arag%C3%B3n-febrero2026?p=1392649314000"},
    "AST-2023": {"ccaa":"Principado de Asturias","fecha":"2023-05-28","camara":"Junta General del Principado de Asturias","tipo":"autonomicas","votosCandidaturas":527500,"sumaFilasOficiales":527500,"umbralPorcentaje":0.02,"umbralVotos":106,"totalAgregados":15,"convocatoria":"ordinaria","fuenteResultado":"https://www.juntaelectoralcentral.es/cs/jec/documentos/ASTURIAS_2023_Resultados.pdf"},
    "CAN-2023": {"ccaa":"Canarias","fecha":"2023-05-28","camara":"Parlamento de Canarias","tipo":"autonomicas","votosCandidaturas":1794261,"sumaFilasOficialesCorregidas":1794261,"umbralPorcentaje":0.02,"umbralVotos":359,"totalAgregados":26,"convocatoria":"ordinaria-doble-voto-autonomico-insular","fuenteResultado":"https://www.gobiernodecanarias.org/boc/2023/121/008.html","fuenteCorreccion":"https://www.gobiernodecanarias.org/boc/archivo/2023/157/pda/002.html"},
    "CNT-2023": {"ccaa":"Cantabria","fecha":"2023-05-28","camara":"Parlamento de Cantabria","tipo":"autonomicas","votosCandidaturas":318919,"sumaFilasOficiales":318919,"umbralPorcentaje":0.02,"umbralVotos":64,"totalAgregados":12,"convocatoria":"ordinaria","fuenteResultado":"https://www.juntaelectoralcentral.es/cs/jec/documentos/Cantabria%20resultados%202023.pdf"},
    "BAL-2023": {"ccaa":"Illes Balears","fecha":"2023-05-28","camara":"Parlament de les Illes Balears","tipo":"autonomicas","votosCandidaturas":443437,"sumaFilasOficiales":443437,"umbralPorcentaje":0.02,"umbralVotos":89,"totalAgregados":18,"totalPapeletasCircunscripcion":32,"convocatoria":"ordinaria","fuenteResultado":"https://www.juntaelectoralcentral.es/cs/jec/documentos/BALEARES_2023_Resultados.pdf"},
    "VAL-2023": {"ccaa":"Comunitat Valenciana","fecha":"2023-05-28","camara":"Les Corts Valencianes","tipo":"autonomicas","votosCandidaturas":2435951,"sumaFilasOficiales":2435951,"umbralPorcentaje":0.02,"umbralVotos":488,"totalAgregados":19,"convocatoria":"ordinaria","fuenteResultado":"https://www.juntaelectoralcentral.es/cs/jec/documentos/VALENCIA_2023_Resultados.pdf"},
    "CEU-2023": {"ccaa":"Ceuta","fecha":"2023-05-28","camara":"Asamblea de Ceuta","tipo":"asamblea-ciudad-autonoma","votosCandidaturas":33888,"sumaFilasOficiales":33888,"umbralPorcentaje":0.02,"umbralVotos":7,"totalAgregados":8,"convocatoria":"local-asamblea-ciudad-autonoma","fuenteResultado":"https://infoelectoral.interior.gob.es/estaticos/docxl/apliextr/04202305_MUNI.zip","fuenteEstatuto":"https://www.boe.es/buscar/act.php?id=BOE-A-1995-6358"},
    "MEL-2023": {"ccaa":"Melilla","fecha":"2023-05-28","camara":"Asamblea de Melilla","tipo":"asamblea-ciudad-autonoma","votosCandidaturas":29359,"sumaFilasOficiales":29359,"umbralPorcentaje":0.02,"umbralVotos":6,"totalAgregados":8,"convocatoria":"local-asamblea-ciudad-autonoma","fuenteResultado":"https://infoelectoral.interior.gob.es/estaticos/docxl/apliextr/04202305_MUNI.zip","fuenteEstatuto":"https://www.boe.es/buscar/act.php?id=BOE-A-1995-6359"}
  },
  "candidaturas": [
    {"id":"ara-2026-partido-popular","eleccion":"ARA-2026","nombrePapeleta":"PARTIDO POPULAR","votos":228388,"pct":34.553,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Huesca","Teruel","Zaragoza"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"ara-2026-partido-socialista-obrero-espanol","eleccion":"ARA-2026","nombrePapeleta":"PARTIDO SOCIALISTA OBRERO ESPAÑOL","votos":162925,"pct":24.649,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Huesca","Teruel","Zaragoza"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"ara-2026-vox","eleccion":"ARA-2026","nombrePapeleta":"VOX","votos":119281,"pct":18.046,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Huesca","Teruel","Zaragoza"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"ara-2026-chunta-aragonesista","eleccion":"ARA-2026","nombrePapeleta":"CHUNTA ARAGONESISTA","votos":65118,"pct":9.852,"motivoInclusion":"umbral","tipo":"partido-territorial","naturaleza":"partido territorial","circ":["Huesca","Teruel","Zaragoza"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"ara-2026-aragon-existe-coalicion-existe","eleccion":"ARA-2026","nombrePapeleta":"ARAGÓN EXISTE / COALICIÓN EXISTE","votos":23616,"pct":3.573,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición electoral EXISTE; variantes provinciales indicadas arriba","circ":["Huesca","Teruel","Zaragoza"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"ara-2026-izquierda-unida-movimiento-sumar","eleccion":"ARA-2026","nombrePapeleta":"IZQUIERDA UNIDA-MOVIMIENTO SUMAR","votos":19832,"pct":3,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición: Izquierda Unida y Movimiento Sumar","circ":["Huesca","Teruel","Zaragoza"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"ara-2026-se-acabo-la-fiesta","eleccion":"ARA-2026","nombrePapeleta":"SE ACABÓ LA FIESTA","votos":18256,"pct":2.762,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura","circ":["Huesca","Teruel","Zaragoza"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"ara-2026-partido-aragones","eleccion":"ARA-2026","nombrePapeleta":"PARTIDO ARAGONÉS","votos":8329,"pct":1.26,"motivoInclusion":"umbral","tipo":"partido-territorial","naturaleza":"partido territorial","circ":["Huesca","Teruel","Zaragoza"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"ara-2026-podemos-alianza-verde","eleccion":"ARA-2026","nombrePapeleta":"PODEMOS ALIANZA VERDE","votos":6478,"pct":0.98,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición: Podemos y Alianza Verde","circ":["Huesca","Teruel","Zaragoza"],"actividad":"electoral-2026","destino":"perfil-especifico"},
    {"id":"ara-2026-escanos-en-blanco-para-dejar-escanos-vacios","eleccion":"ARA-2026","nombrePapeleta":"ESCAÑOS EN BLANCO PARA DEJAR ESCAÑOS VACÍOS","votos":4238,"pct":0.641,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Huesca","Teruel","Zaragoza"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"ara-2026-partido-animalista-con-el-medio-ambiente","eleccion":"ARA-2026","nombrePapeleta":"PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE","votos":2742,"pct":0.415,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Huesca","Teruel","Zaragoza"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"ara-2026-por-un-mundo-mas-justo","eleccion":"ARA-2026","nombrePapeleta":"POR UN MUNDO MÁS JUSTO","votos":535,"pct":0.081,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Huesca y Zaragoza"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"ara-2026-partido-comunista-de-los-trabajadores-de-espana","eleccion":"ARA-2026","nombrePapeleta":"PARTIDO COMUNISTA DE LOS TRABAJADORES DE ESPAÑA","votos":518,"pct":0.078,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Zaragoza"],"actividad":"electoral-2026","destino":"perfil-reutilizable"},
    {"id":"ara-2026-coalicion-aragonesa","eleccion":"ARA-2026","nombrePapeleta":"COALICIÓN ARAGONESA","votos":500,"pct":0.076,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición electoral registrada; no se infieren matrices sin pacto legible","circ":["Huesca","Teruel","Zaragoza"],"actividad":"electoral-2026","destino":"inventario-sin-datos"},
    {"id":"ara-2026-entre-todos-bajo-baix-cinca","eleccion":"ARA-2026","nombrePapeleta":"ENTRE TODOS BAJO/BAIX CINCA","votos":228,"pct":0.034,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["Huesca"],"actividad":"electoral-2026","destino":"inventario-sin-datos"},
    {"id":"ast-2023-partido-socialista-obrero-espanol","eleccion":"AST-2023","nombrePapeleta":"PARTIDO SOCIALISTA OBRERO ESPAÑOL","votos":195999,"pct":37.156,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Centro","Occidente","Oriente"],"actividad":"representacion-2023-2027","destino":"perfil-reutilizable"},
    {"id":"ast-2023-partido-popular","eleccion":"AST-2023","nombrePapeleta":"PARTIDO POPULAR","votos":175131,"pct":33.2,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Centro","Occidente","Oriente"],"actividad":"representacion-2023-2027","destino":"perfil-reutilizable"},
    {"id":"ast-2023-vox","eleccion":"AST-2023","nombrePapeleta":"VOX","votos":54273,"pct":10.289,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Centro","Occidente","Oriente"],"actividad":"representacion-2023-2027","destino":"perfil-reutilizable"},
    {"id":"ast-2023-convocatoria-por-asturies-iu-mas-pais-ias","eleccion":"AST-2023","nombrePapeleta":"CONVOCATORIA POR ASTURIES IU-MÁS PAÍS-IAS","votos":40774,"pct":7.73,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición: IU Asturias, Más País e Izquierda Asturiana","circ":["Centro","Occidente","Oriente"],"actividad":"representacion-2023-2027; matrices-verificadas","destino":"perfil-especifico"},
    {"id":"ast-2023-podemos-asturies","eleccion":"AST-2023","nombrePapeleta":"PODEMOS ASTURIES","votos":21052,"pct":3.991,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["Centro","Occidente","Oriente"],"actividad":"representacion-2023-2027","destino":"perfil-especifico"},
    {"id":"ast-2023-foro-asturias","eleccion":"AST-2023","nombrePapeleta":"FORO ASTURIAS","votos":19652,"pct":3.725,"motivoInclusion":"umbral","tipo":"partido-territorial","naturaleza":"partido territorial","circ":["Centro","Occidente","Oriente"],"actividad":"representacion-2023-2027","destino":"perfil-especifico"},
    {"id":"ast-2023-sos-asturias-sos-occidente-espana-vaciada","eleccion":"AST-2023","nombrePapeleta":"SOS ASTURIAS / SOS OCCIDENTE-ESPAÑA VACIADA","votos":5838,"pct":1.107,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"marcas territoriales vinculadas a España Vaciada","circ":["Centro","Occidente","Oriente"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"ast-2023-ciudadanos-partido-de-la-ciudadania","eleccion":"AST-2023","nombrePapeleta":"CIUDADANOS-PARTIDO DE LA CIUDADANÍA","votos":4974,"pct":0.943,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Centro","Occidente","Oriente"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"ast-2023-partido-animalista-con-el-medio-ambiente","eleccion":"AST-2023","nombrePapeleta":"PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE","votos":3271,"pct":0.62,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Centro y Occidente"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"ast-2023-verdes-equo-asturias-asturies","eleccion":"AST-2023","nombrePapeleta":"VERDES EQUO ASTURIAS / ASTURIES","votos":1717,"pct":0.325,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición electoral registrada","circ":["Centro"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"ast-2023-partido-comunista-de-los-trabajadores-de-espana","eleccion":"AST-2023","nombrePapeleta":"PARTIDO COMUNISTA DE LOS TRABAJADORES DE ESPAÑA","votos":1401,"pct":0.266,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Centro","Occidente","Oriente"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"ast-2023-andecha-astur","eleccion":"AST-2023","nombrePapeleta":"ANDECHA ASTUR","votos":1245,"pct":0.236,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["Centro","Occidente","Oriente"],"actividad":"no-comprobada","destino":"perfil-especifico"},
    {"id":"ast-2023-suma-principado","eleccion":"AST-2023","nombrePapeleta":"SUMA PRINCIPADO","votos":1148,"pct":0.218,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura","circ":["Centro","Occidente","Oriente"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"ast-2023-por-un-mundo-mas-justo","eleccion":"AST-2023","nombrePapeleta":"POR UN MUNDO MÁS JUSTO","votos":789,"pct":0.15,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Centro","Occidente","Oriente"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"ast-2023-partido-unionista-estado-de-espana","eleccion":"AST-2023","nombrePapeleta":"PARTIDO UNIONISTA ESTADO DE ESPAÑA","votos":236,"pct":0.045,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura","circ":["Centro"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"can-2023-partido-socialista-obrero-espanol","eleccion":"CAN-2023","nombrePapeleta":"PARTIDO SOCIALISTA OBRERO ESPAÑOL","votos":543780,"pct":30.307,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["autonómica + 7 islas"],"actividad":"representacion-2023-2027","destino":"perfil-reutilizable"},
    {"id":"can-2023-coalicion-canaria","eleccion":"CAN-2023","nombrePapeleta":"COALICIÓN CANARIA","votos":376599,"pct":20.989,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"formación canaria; no figura entre las coaliciones electorales fechadas del proceso","circ":["autonómica + 6 islas"],"actividad":"representacion-2023-2027","destino":"perfil-especifico"},
    {"id":"can-2023-partido-popular","eleccion":"CAN-2023","nombrePapeleta":"PARTIDO POPULAR","votos":360069,"pct":20.068,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["autonómica + 7 islas"],"actividad":"representacion-2023-2027","destino":"perfil-reutilizable"},
    {"id":"can-2023-vox","eleccion":"CAN-2023","nombrePapeleta":"VOX","votos":143625,"pct":8.005,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido; total corregido","circ":["autonómica + 7 islas"],"actividad":"representacion-2023-2027","destino":"perfil-reutilizable"},
    {"id":"can-2023-nueva-canarias","eleccion":"CAN-2023","nombrePapeleta":"NUEVA CANARIAS","votos":137400,"pct":7.658,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura; electos publicados como NC-bc","circ":["autonómica + 5 islas"],"actividad":"representacion-2023-2027","destino":"perfil-especifico"},
    {"id":"can-2023-unidas-si-podemos","eleccion":"CAN-2023","nombrePapeleta":"UNIDAS SÍ PODEMOS","votos":65333,"pct":3.641,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición electoral registrada","circ":["autonómica + 6 islas"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"can-2023-drago-verdes-canarias","eleccion":"CAN-2023","nombrePapeleta":"DRAGO VERDES CANARIAS","votos":59291,"pct":3.304,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición electoral; Drago Canarias y Verdes Equo Canarias","circ":["autonómica + 5 islas"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"can-2023-unidos-por-gran-canaria","eleccion":"CAN-2023","nombrePapeleta":"UNIDOS POR GRAN CANARIA","votos":30913,"pct":1.723,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["autonómica y Gran Canaria"],"actividad":"no-comprobada","destino":"perfil-especifico"},
    {"id":"can-2023-partido-animalista-con-el-medio-ambiente","eleccion":"CAN-2023","nombrePapeleta":"PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE","votos":22993,"pct":1.281,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["autonómica, Gran Canaria y Tenerife"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"can-2023-ciudadanos-partido-de-la-ciudadania","eleccion":"CAN-2023","nombrePapeleta":"CIUDADANOS PARTIDO DE LA CIUDADANÍA","votos":7058,"pct":0.393,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["autonómica, Gran Canaria y Tenerife"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"can-2023-agrupacion-socialista-gomera","eleccion":"CAN-2023","nombrePapeleta":"AGRUPACIÓN SOCIALISTA GOMERA","votos":6765,"pct":0.377,"motivoInclusion":"umbral","tipo":"partido-territorial","naturaleza":"partido territorial","circ":["La Gomera"],"actividad":"representacion-2023-2027","destino":"perfil-especifico"},
    {"id":"can-2023-asambleas-municipales-de-fuerteventura","eleccion":"CAN-2023","nombrePapeleta":"ASAMBLEAS MUNICIPALES DE FUERTEVENTURA","votos":5948,"pct":0.332,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["autonómica y Fuerteventura"],"actividad":"no-comprobada","destino":"perfil-especifico"},
    {"id":"can-2023-partido-nacionalista-canario","eleccion":"CAN-2023","nombrePapeleta":"PARTIDO NACIONALISTA CANARIO","votos":4812,"pct":0.268,"motivoInclusion":"umbral","tipo":"partido-territorial","naturaleza":"partido territorial","circ":["autonómica, Gran Canaria, Lanzarote y Tenerife"],"actividad":"no-comprobada","destino":"perfil-especifico"},
    {"id":"can-2023-reunir-canarias-sostenible","eleccion":"CAN-2023","nombrePapeleta":"REUNIR CANARIAS SOSTENIBLE","votos":4310,"pct":0.24,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición electoral registrada","circ":["autonómica + 4 islas"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"can-2023-ahora-canarias-partido-comunista-del-pueblo-cana","eleccion":"CAN-2023","nombrePapeleta":"AHORA CANARIAS-PARTIDO COMUNISTA DEL PUEBLO CANARIO","votos":4262,"pct":0.238,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición electoral: Ahora Canarias y PCPC","circ":["autonómica, Gran Canaria y Tenerife"],"actividad":"no-comprobada","destino":"perfil-especifico"},
    {"id":"can-2023-hablemos-ahora","eleccion":"CAN-2023","nombrePapeleta":"HABLEMOS AHORA","votos":4030,"pct":0.225,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["Gran Canaria"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"can-2023-ahora-tu","eleccion":"CAN-2023","nombrePapeleta":"AHORA TÚ","votos":3846,"pct":0.214,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición electoral registrada","circ":["autonómica"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"can-2023-mas-canarias","eleccion":"CAN-2023","nombrePapeleta":"MÁS CANARIAS","votos":3830,"pct":0.213,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["autonómica, Lanzarote, La Palma y Tenerife"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"can-2023-tercera-edad-en-accion","eleccion":"CAN-2023","nombrePapeleta":"TERCERA EDAD EN ACCIÓN","votos":1898,"pct":0.106,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["El Hierro, Gran Canaria y Tenerife"],"actividad":"actividad-organizativa-verificada","destino":"perfil-especifico"},
    {"id":"can-2023-agrupacion-herrena-independiente","eleccion":"CAN-2023","nombrePapeleta":"AGRUPACIÓN HERREÑA INDEPENDIENTE","votos":1660,"pct":0.093,"motivoInclusion":"umbral","tipo":"partido-territorial","naturaleza":"partido territorial","circ":["El Hierro"],"actividad":"representacion-2023-2027","destino":"perfil-especifico"},
    {"id":"can-2023-iniciativa-por-la-gomera","eleccion":"CAN-2023","nombrePapeleta":"INICIATIVA POR LA GOMERA","votos":1312,"pct":0.073,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["La Gomera"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"can-2023-pais-con-gestores","eleccion":"CAN-2023","nombrePapeleta":"PAÍS CON GESTORES","votos":1210,"pct":0.067,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura","circ":["autonómica"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"can-2023-asamblea-herrena","eleccion":"CAN-2023","nombrePapeleta":"ASAMBLEA HERREÑA","votos":1089,"pct":0.061,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["El Hierro"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"can-2023-movimiento-alternativo-electoral","eleccion":"CAN-2023","nombrePapeleta":"MOVIMIENTO ALTERNATIVO ELECTORAL","votos":778,"pct":0.043,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["La Palma"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"can-2023-contigo-somos-democracia","eleccion":"CAN-2023","nombrePapeleta":"CONTIGO SOMOS DEMOCRÁCIA","votos":732,"pct":0.041,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura","circ":["Fuerteventura y Gran Canaria"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"can-2023-union-democratica-de-canarias","eleccion":"CAN-2023","nombrePapeleta":"UNIÓN DEMOCRÁTICA DE CANARIAS","votos":718,"pct":0.04,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["Tenerife"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"cnt-2023-partido-popular-de-cantabria","eleccion":"CNT-2023","nombrePapeleta":"PARTIDO POPULAR DE CANTABRIA","votos":116198,"pct":36.435,"motivoInclusion":"umbral","tipo":"organizacion-territorial","naturaleza":"organización territorial del PP","circ":["todas"],"actividad":"representacion-2023-2027","destino":"perfil-reutilizable"},
    {"id":"cnt-2023-partido-regionalista-de-cantabria","eleccion":"CNT-2023","nombrePapeleta":"PARTIDO REGIONALISTA DE CANTABRIA","votos":67523,"pct":21.172,"motivoInclusion":"umbral","tipo":"partido-territorial","naturaleza":"partido territorial","circ":["todas"],"actividad":"representacion-2023-2027","destino":"perfil-especifico"},
    {"id":"cnt-2023-partido-socialista-de-cantabria-psoe","eleccion":"CNT-2023","nombrePapeleta":"PARTIDO SOCIALISTA DE CANTABRIA-PSOE","votos":66917,"pct":20.982,"motivoInclusion":"umbral","tipo":"federacion-territorial","naturaleza":"federación territorial","circ":["todas"],"actividad":"representacion-2023-2027","destino":"perfil-reutilizable"},
    {"id":"cnt-2023-vox","eleccion":"CNT-2023","nombrePapeleta":"VOX","votos":35982,"pct":11.282,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["todas"],"actividad":"representacion-2023-2027","destino":"perfil-reutilizable"},
    {"id":"cnt-2023-podemos-izquierda-unida","eleccion":"CNT-2023","nombrePapeleta":"PODEMOS-IZQUIERDA UNIDA","votos":13395,"pct":4.2,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición: Podemos e Izquierda Unida","circ":["todas"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"cnt-2023-ciudadanos-partido-de-la-ciudadania","eleccion":"CNT-2023","nombrePapeleta":"CIUDADANOS-PARTIDO DE LA CIUDADANIA","votos":7527,"pct":2.36,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"cnt-2023-cantabristas","eleccion":"CNT-2023","nombrePapeleta":"CANTABRISTAS","votos":5522,"pct":1.731,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["todas"],"actividad":"no-comprobada","destino":"perfil-especifico"},
    {"id":"cnt-2023-partido-animalista-con-el-medio-ambiente","eleccion":"CNT-2023","nombrePapeleta":"PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE","votos":1837,"pct":0.576,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"cnt-2023-verdes-equo","eleccion":"CNT-2023","nombrePapeleta":"VERDES EQUO","votos":1548,"pct":0.485,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["todas"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"cnt-2023-ola-cantabria","eleccion":"CNT-2023","nombrePapeleta":"OLA CANTABRIA","votos":1125,"pct":0.353,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["todas"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"cnt-2023-partido-comunista-de-los-trabajadores-de-espana","eleccion":"CNT-2023","nombrePapeleta":"PARTIDO COMUNISTA DE LOS TRABAJADORES DE ESPAÑA","votos":757,"pct":0.237,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["todas"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"cnt-2023-cantabria-distinta","eleccion":"CNT-2023","nombrePapeleta":"CANTABRIA DISTINTA","votos":588,"pct":0.184,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["todas"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"bal-2023-partido-popular","eleccion":"BAL-2023","nombrePapeleta":"Partido Popular","votos":161267,"pct":36.368,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido; no incluye Sa Unió","circ":["Mallorca, Menorca, Ibiza"],"actividad":"representacion-2023-2027","destino":"perfil-reutilizable"},
    {"id":"bal-2023-partit-socialista-de-les-illes-balears","eleccion":"BAL-2023","nombrePapeleta":"Partit Socialista de les Illes Balears","votos":119540,"pct":26.958,"motivoInclusion":"umbral","tipo":"federacion-territorial","naturaleza":"federación territorial; no incluye GxF+PSIB","circ":["Mallorca, Menorca, Ibiza"],"actividad":"representacion-2023-2027","destino":"perfil-reutilizable"},
    {"id":"bal-2023-vox","eleccion":"BAL-2023","nombrePapeleta":"VOX","votos":62637,"pct":14.125,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Mallorca","Menorca","Ibiza","Formentera"],"actividad":"representacion-2023-2027","destino":"perfil-reutilizable"},
    {"id":"bal-2023-mes-per-mallorca","eleccion":"BAL-2023","nombrePapeleta":"MÉS per Mallorca","votos":37651,"pct":8.491,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/formación territorial","circ":["Mallorca"],"actividad":"representacion-2023-2027","destino":"perfil-especifico"},
    {"id":"bal-2023-unidas-podemos","eleccion":"BAL-2023","nombrePapeleta":"Unidas Podemos","votos":19980,"pct":4.506,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición: Podemos y Esquerra Unida de les Illes Balears","circ":["Mallorca, Menorca, Ibiza"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"bal-2023-el-pi-proposta-per-les-illes-balears","eleccion":"BAL-2023","nombrePapeleta":"El PI-Proposta per les Illes Balears","votos":17089,"pct":3.854,"motivoInclusion":"umbral","tipo":"partido-territorial","naturaleza":"partido territorial","circ":["Mallorca"],"actividad":"no-comprobada","destino":"perfil-especifico"},
    {"id":"bal-2023-mes-per-menorca","eleccion":"BAL-2023","nombrePapeleta":"MÉS per Menorca","votos":6486,"pct":1.463,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/formación territorial distinta de MÉS per Mallorca","circ":["Menorca"],"actividad":"representacion-2023-2027","destino":"perfil-especifico"},
    {"id":"bal-2023-ciudadanos-partido-de-la-ciudadania","eleccion":"BAL-2023","nombrePapeleta":"Ciudadanos-Partido de la Ciudadanía","votos":6097,"pct":1.375,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Mallorca, Menorca, Ibiza"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"bal-2023-progreso-en-verde-pacma","eleccion":"BAL-2023","nombrePapeleta":"Progreso en Verde-PACMA","votos":4389,"pct":0.99,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición: Progreso en Verde y PACMA","circ":["Mallorca, Ibiza, Formentera"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"bal-2023-sa-unio-de-formentera-pp-compromis","eleccion":"BAL-2023","nombrePapeleta":"Sa Unió de Formentera (PP-Compromís)","votos":1747,"pct":0.394,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición: PP y Compromís amb Formentera","circ":["Formentera"],"actividad":"escaño electo en 2023; continuidad exacta no-comprobada","destino":"perfil-especifico"},
    {"id":"bal-2023-gent-per-formentera-partit-socialista-de-les-ill","eleccion":"BAL-2023","nombrePapeleta":"Gent per Formentera + Partit Socialista de les Illes Balears","votos":1679,"pct":0.379,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición: GxF y PSIB-PSOE","circ":["Formentera"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"bal-2023-ara-eivissa","eleccion":"BAL-2023","nombrePapeleta":"Ara Eivissa","votos":1407,"pct":0.317,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["Ibiza"],"actividad":"no-comprobada","destino":"perfil-especifico"},
    {"id":"bal-2023-proyecto-liberal-espanol","eleccion":"BAL-2023","nombrePapeleta":"Proyecto Liberal Español","votos":817,"pct":0.184,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura","circ":["Mallorca y Menorca"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"bal-2023-coalicio-per-balears","eleccion":"BAL-2023","nombrePapeleta":"Coalició per Balears","votos":762,"pct":0.172,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura; el nombre no basta para afirmar coalición formal","circ":["Mallorca"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"bal-2023-epic-el-pi","eleccion":"BAL-2023","nombrePapeleta":"EPIC-El PI","votos":597,"pct":0.135,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición: EPIC-Moviment Ciutadà y El PI","circ":["Ibiza"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"bal-2023-reset-reinicio-politico","eleccion":"BAL-2023","nombrePapeleta":"Reset-Reinicio Político","votos":509,"pct":0.115,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura","circ":["Mallorca"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"bal-2023-per-balears","eleccion":"BAL-2023","nombrePapeleta":"Per Balears","votos":424,"pct":0.096,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["Ibiza"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"bal-2023-nuevo-orden-nacional-nou-ordre-nacional","eleccion":"BAL-2023","nombrePapeleta":"Nuevo Orden Nacional-Nou Ordre Nacional","votos":359,"pct":0.081,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura","circ":["Mallorca"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"val-2023-partido-popular","eleccion":"VAL-2023","nombrePapeleta":"Partido Popular","votos":881893,"pct":36.203,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Alicante","Castellón","Valencia"],"actividad":"representacion-2023-2027","destino":"perfil-reutilizable"},
    {"id":"val-2023-partido-socialista-obrero-espanol","eleccion":"VAL-2023","nombrePapeleta":"Partido Socialista Obrero Español","votos":708142,"pct":29.07,"motivoInclusion":"umbral","tipo":"federacion-territorial","naturaleza":"partido/federación territorial","circ":["Alicante","Castellón","Valencia"],"actividad":"representacion-2023-2027","destino":"perfil-reutilizable"},
    {"id":"val-2023-compromis-mes-iniciativa-verdsequo","eleccion":"VAL-2023","nombrePapeleta":"Compromís: Més-Iniciativa-Verdsequo","votos":357989,"pct":14.696,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición: Més-Compromís, Iniciativa y VerdsEquo","circ":["Alicante","Castellón","Valencia"],"actividad":"representacion-2023-2027; matrices-verificadas","destino":"perfil-especifico"},
    {"id":"val-2023-vox","eleccion":"VAL-2023","nombrePapeleta":"Vox","votos":310184,"pct":12.734,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Alicante","Castellón","Valencia"],"actividad":"representacion-2023-2027","destino":"perfil-reutilizable"},
    {"id":"val-2023-unides-podem-esquerra-unida","eleccion":"VAL-2023","nombrePapeleta":"Unides Podem-Esquerra Unida","votos":88152,"pct":3.619,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición: Podem y EUPV","circ":["Alicante","Castellón","Valencia"],"actividad":"matrices-verificadas","destino":"perfil-especifico"},
    {"id":"val-2023-ciudadanos-partido-de-la-ciudadania","eleccion":"VAL-2023","nombrePapeleta":"Ciudadanos-Partido de la Ciudadanía","votos":37095,"pct":1.523,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Alicante","Castellón","Valencia"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"val-2023-partido-animalista-con-el-medio-ambiente","eleccion":"VAL-2023","nombrePapeleta":"Partido Animalista con el Medio Ambiente","votos":20836,"pct":0.855,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Alicante y Valencia"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"val-2023-los-verdes-ecopacifistas-centro-moderado","eleccion":"VAL-2023","nombrePapeleta":"Los Verdes-Ecopacifistas (CENTRO MODERADO)","votos":4846,"pct":0.199,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"candidatura; no se infiere ideología del nombre","circ":["Alicante"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"val-2023-esquerra-republicana-del-pais-valencia","eleccion":"VAL-2023","nombrePapeleta":"Esquerra Republicana del País Valencià","votos":4570,"pct":0.188,"motivoInclusion":"umbral","tipo":"partido-territorial","naturaleza":"partido territorial","circ":["Alicante","Castellón","Valencia"],"actividad":"posterior-verificada","destino":"perfil-especifico"},
    {"id":"val-2023-coalicio-units","eleccion":"VAL-2023","nombrePapeleta":"Coalició Units","votos":4266,"pct":0.175,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición electoral; matrices no transcritas sin pacto inequívoco","circ":["Alicante","Castellón","Valencia"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"val-2023-partido-comunista-de-los-pueblos-de-espana","eleccion":"VAL-2023","nombrePapeleta":"Partido Comunista de los Pueblos de España","votos":3815,"pct":0.157,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Alicante","Castellón","Valencia"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"val-2023-recortes-cero","eleccion":"VAL-2023","nombrePapeleta":"Recortes Cero","votos":2926,"pct":0.12,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición electoral registrada","circ":["Alicante","Castellón","Valencia"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"val-2023-decidix","eleccion":"VAL-2023","nombrePapeleta":"Decidix","votos":2373,"pct":0.097,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["Alicante","Castellón","Valencia"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"val-2023-escanos-en-blanco-para-dejar-escanos-vacios","eleccion":"VAL-2023","nombrePapeleta":"Escaños en Blanco para Dejar Escaños Vacíos","votos":2090,"pct":0.086,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Valencia"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"val-2023-republica-valenciana-partit-valencianiste-europe","eleccion":"VAL-2023","nombrePapeleta":"República Valenciana / Partit Valencianiste Europeu","votos":1745,"pct":0.072,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["Alicante","Castellón","Valencia"],"actividad":"no-comprobada","destino":"perfil-especifico"},
    {"id":"val-2023-alianza-por-el-comercio-y-la-vivienda","eleccion":"VAL-2023","nombrePapeleta":"Alianza por el Comercio y la Vivienda","votos":1689,"pct":0.069,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura","circ":["Alicante","Castellón","Valencia"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"val-2023-por-un-mundo-mas-justo","eleccion":"VAL-2023","nombrePapeleta":"Por un Mundo Más Justo","votos":1373,"pct":0.056,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Valencia"],"actividad":"posterior-verificada","destino":"perfil-reutilizable"},
    {"id":"val-2023-centrats-en-la-nostra-terra","eleccion":"VAL-2023","nombrePapeleta":"Centrats en la Nostra Terra","votos":1326,"pct":0.054,"motivoInclusion":"umbral","tipo":"coalicion-electoral","naturaleza":"coalición electoral registrada","circ":["Castellón"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"val-2023-partido-alicantino-regionalista-esperanza-ciudad","eleccion":"VAL-2023","nombrePapeleta":"Partido Alicantino Regionalista - Esperanza Ciudadana","votos":641,"pct":0.026,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["Alicante"],"actividad":"no-comprobada","destino":"inventario-sin-datos"},
    {"id":"ceu-2023-partido-popular","eleccion":"CEU-2023","nombrePapeleta":"PARTIDO POPULAR","votos":11774,"pct":34.744,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Ceuta"],"actividad":"representacion-2023-2027","destino":"perfil-reutilizable","escanos":9},
    {"id":"ceu-2023-partido-socialista-obrero-espanol","eleccion":"CEU-2023","nombrePapeleta":"PARTIDO SOCIALISTA OBRERO ESPAÑOL","votos":7198,"pct":21.241,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Ceuta"],"actividad":"representacion-2023-2027","destino":"perfil-reutilizable","escanos":6},
    {"id":"ceu-2023-vox","eleccion":"CEU-2023","nombrePapeleta":"VOX","votos":7073,"pct":20.872,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Ceuta"],"actividad":"representacion-2023-2027","destino":"perfil-reutilizable","escanos":5},
    {"id":"ceu-2023-movimiento-por-la-dignidad-y-la-ciudadania-de-ce","eleccion":"CEU-2023","nombrePapeleta":"MOVIMIENTO POR LA DIGNIDAD Y LA CIUDADANÍA DE CEUTA","votos":3848,"pct":11.355,"motivoInclusion":"umbral","tipo":"partido-territorial","naturaleza":"partido territorial","circ":["Ceuta"],"actividad":"representacion-2023-2027","destino":"perfil-especifico","escanos":3},
    {"id":"ceu-2023-ceuta-ya","eleccion":"CEU-2023","nombrePapeleta":"CEUTA YA!","votos":3442,"pct":10.157,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["Ceuta"],"actividad":"representacion-2023-2027","destino":"perfil-especifico","escanos":2},
    {"id":"ceu-2023-ciudadanos-partido-de-la-ciudadania","eleccion":"CEU-2023","nombrePapeleta":"CIUDADANOS-PARTIDO DE LA CIUDADANÍA","votos":239,"pct":0.705,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Ceuta"],"actividad":"posterior-verificada","destino":"perfil-reutilizable","escanos":0},
    {"id":"ceu-2023-podemos","eleccion":"CEU-2023","nombrePapeleta":"PODEMOS","votos":192,"pct":0.567,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Ceuta"],"actividad":"posterior-verificada","destino":"perfil-reutilizable","escanos":0},
    {"id":"ceu-2023-libres","eleccion":"CEU-2023","nombrePapeleta":"LIBRES","votos":122,"pct":0.36,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["Ceuta"],"actividad":"no-comprobada","destino":"inventario-sin-datos","escanos":0},
    {"id":"mel-2023-partido-popular","eleccion":"MEL-2023","nombrePapeleta":"PARTIDO POPULAR","votos":15640,"pct":53.272,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Melilla"],"actividad":"representacion-2023-2027","destino":"perfil-reutilizable","escanos":14},
    {"id":"mel-2023-coalicion-por-melilla","eleccion":"MEL-2023","nombrePapeleta":"COALICIÓN POR MELILLA","votos":5590,"pct":19.04,"motivoInclusion":"umbral","tipo":"partido-territorial","naturaleza":"partido territorial; el nombre no prueba coalición electoral fechada","circ":["Melilla"],"actividad":"representacion-2023-2027","destino":"perfil-especifico","escanos":5},
    {"id":"mel-2023-partido-socialista-obrero-espanol","eleccion":"MEL-2023","nombrePapeleta":"PARTIDO SOCIALISTA OBRERO ESPAÑOL","votos":3206,"pct":10.92,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Melilla"],"actividad":"representacion-2023-2027","destino":"perfil-reutilizable","escanos":3},
    {"id":"mel-2023-vox","eleccion":"MEL-2023","nombrePapeleta":"VOX","votos":2957,"pct":10.072,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Melilla"],"actividad":"representacion-2023-2027","destino":"perfil-reutilizable","escanos":2},
    {"id":"mel-2023-somos-melilla","eleccion":"MEL-2023","nombrePapeleta":"SOMOS MELILLA","votos":1524,"pct":5.191,"motivoInclusion":"umbral","tipo":"partido-territorial","naturaleza":"partido territorial","circ":["Melilla"],"actividad":"representacion-2023-2027","destino":"perfil-especifico","escanos":1},
    {"id":"mel-2023-podemos","eleccion":"MEL-2023","nombrePapeleta":"PODEMOS","votos":290,"pct":0.988,"motivoInclusion":"umbral","tipo":"partido","naturaleza":"partido","circ":["Melilla"],"actividad":"posterior-verificada","destino":"perfil-reutilizable","escanos":0},
    {"id":"mel-2023-adelante-melilla","eleccion":"MEL-2023","nombrePapeleta":"ADELANTE MELILLA","votos":78,"pct":0.266,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["Melilla"],"actividad":"no-comprobada","destino":"inventario-sin-datos","escanos":0},
    {"id":"mel-2023-creando-melilla","eleccion":"MEL-2023","nombrePapeleta":"CREANDO MELILLA","votos":74,"pct":0.252,"motivoInclusion":"umbral","tipo":"partido-o-candidatura","naturaleza":"partido/candidatura territorial","circ":["Melilla"],"actividad":"no-comprobada","destino":"inventario-sin-datos","escanos":0}
  ],
  "fuentesActividad": {
    "europeas2024Proclamacion": "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-9687",
    "aragon2026": "https://www.juntaelectoralcentral.es/cs/jec/elecciones/Arag%C3%B3n-febrero2026?p=1392649314000",
    "terceraEdad": "https://3edad.org/",
    "convocatoriaCeutaMelilla": "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-8458"
  }
}
```
