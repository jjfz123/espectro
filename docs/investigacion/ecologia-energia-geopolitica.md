# Investigación: ecología, energía y geopolítica

**Fecha de corte:** 9 de julio de 2026
**Ámbito:** partidos españoles con representación o relevancia política reciente, más partidos minoritarios reales cuando son necesarios para anclar una posición que no existe entre los grandes.
**Objetivo:** aportar evidencia para revisar `energia-modelo-productivo.json`, `geopolitica-defensa.json`, los ejes asociados y el ítem saharaui `sd-019`. Este documento no modifica datos de producción.

## Método y cautelas

Se han priorizado, por este orden, programas electorales y documentos políticos del propio partido, iniciativas y votaciones nominales de las Cortes, normas y tratados, y comunicados oficiales. No se ha usado la ubicación en una familia europea como sustituto de una posición española. Tampoco se ha deducido una doctrina sobre armas nucleares solo por apoyar o rechazar la OTAN.

En las tablas:

- **Confianza alta**: la frase del ítem está respaldada de forma directa por un programa, resolución o voto oficial.
- **Confianza media**: la fuente es directa, pero el encaje con el ítem requiere un matiz, es de coalición o no contiene todos los elementos de la frase.
- **Confianza baja**: documento antiguo sin reafirmación reciente, declaración lateral o inferencia. No debería convertirse en un `Esperado` fuerte.
- **Vigencia alta**: 2024-2026 o norma/posición institucional actualmente aplicable.
- **Vigencia media**: 2022-2023 y sigue siendo el último programa general conocido.
- **Vigencia baja**: anterior a 2022 y sin confirmación posterior.
- **NE** significa *no hay evidencia suficiente*. No equivale a una posición neutral ni a una respuesta `0`.

Cuando se sugiere una respuesta `+2` o `-2`, el signo se refiere al acuerdo o desacuerdo con el texto literal del ítem, no al signo interno de sus cargas.

## Conclusiones ejecutivas

1. El eje de **energía nuclear civil separado de ecología** está bien justificado. Hay al menos un partido español real que encarna el ecologismo pronuclear, **Volt España**; no hace falta dejarlo como arquetipo puramente hipotético. PP, Vox y Frente Obrero son pronucleares por razones distintas —continuidad industrial, soberanía o productivismo— y no deben etiquetarse automáticamente como ecologistas pronucleares.
2. Los nuevos ítems distinguen correctamente **nuclear civil** de **armas nucleares**, pero varios mezclan conductas que no son monotónicas: prohibir armas nucleares no implica pacifismo convencional; salir de la OTAN no implica querer un ejército débil; neutralidad militar no implica aislamiento diplomático.
3. El eje actual `atlantismo` une indebidamente pertenencia a la OTAN, gasto militar y antimilitarismo. Frente Obrero y Falange son contraejemplos reales: quieren salir de la OTAN y reforzar el ejército; Falange incluso propone recuperar el servicio militar obligatorio.
4. El **Sáhara Occidental** es un excelente discriminador real, con programa y voto parlamentario. Sin embargo, `sd-019` está físicamente en otro fichero, carga sobre un eje inadecuado y su nota de vigencia quedó desactualizada: la [Resolución 2797 (2025) del Consejo de Seguridad](https://documents.un.org/api/symbol/access?l=es&s=s%2Fres%2F2797%282025%29&t=pdf), de 31 de octubre de 2025, tomó el plan de autonomía marroquí como base de negociación, aunque mantuvo el principio de libre determinación.
5. El **iberismo federal** apenas existe como posición de partido: el Partido Ibérico Íber es un caso real y llegó a presentar candidatura municipal en 2023, pero ninguna formación estatal o parlamentaria importante propone una federación España-Portugal. Cooperación bilateral o «soluciones ibéricas» no es federación.
6. La reclamación española sobre **Gibraltar** es un consenso estatal mucho más amplio que la branch presupone. PSOE, PP y Vox difieren en medios y tono, no en conservar la reclamación. `geo-012` tendrá techo alto y discriminará sobre todo intensidad o partidos marginales.
7. Hay cuatro familias claras de duplicados activos: defensa europea (`ue-003`, `geo-004`, `lib-013`), prórroga nuclear (`ene-003`, `va-005`), decrecimiento (`ene-010`, `va-007`, `sd-016`) y despliegue territorial de renovables (`ene-008`, `ene-012`, `va-006`).

## 1. Energía nuclear civil y ecologismo

### 1.1 Mapa de partidos reales

| Partido | Posición documentada | Traducción prudente a los ítems actuales | Fuente, fecha | Confianza / vigencia |
|---|---|---|---|---|
| **PSOE** | Renovables como eje del modelo y desmantelamiento ordenado y progresivo de las centrales nucleares. | `ene-001`: desacuerdo fuerte; `ene-003`: acuerdo, pero el programa no dice literalmente «al terminar su licencia actual». `va-005`: desacuerdo moderado. | [Programa de generales 2023](https://www.psoe.es/media-content/2023/07/PROGRAMA_ELECTORAL-GENERALES-2023.pdf), 7-7-2023, pp. 73-74. | Alta / media |
| **PP** | Prolongar la vida útil de las centrales existentes; las presenta como energía limpia, estable y complementaria de las renovables. La propuesta de 2025 no basta por sí sola para afirmar que construiría nuevas centrales. | `ene-003`: `-2`; `va-005`: `+2`; `ene-001`: **NE** salvo fuente adicional sobre nueva construcción. | [Proposición del PP para prolongar la vida nuclear](https://www.pp.es/actualidad/articulos/el-pp-presenta-su-ley-para-prolongar-la-vida-util-de-las-centrales-nucleares-no-es-una-opcion-es-una/), 4-4-2025; [pacto energético](https://www.pp.es/actualidad/articulos/pacto-energetico/), 2022. | Alta / alta |
| **Vox** | SMR en emplazamientos cerrados, inversión y actualización del parque, extensión de vida y mix renovable-nuclear. | `ene-001`: `+2`; `ene-003`: `-2`; `va-005`: `+2`; `ene-009`: `+1/+2` si se precisa que la financiación es pública. | [Programa general 2023](https://www.voxespana.es/wp-content/uploads/2023/07/Programa-VOX-2023-con-menos-peso.pdf), 23-7-2023, medidas 245-248; [iniciativa nuclear de 2025](https://www.voxespana.es/noticias/vox-acude-a-las-centrales-nucleares-de-asco-y-almaraz-para-reivindicar-el-importante-papel-de-la-energia-nuclear-en-la-soberania-energetica-espanola-20250121), 21-1-2025. | Alta / alta |
| **Sumar** | Sistema eléctrico 100 % renovable, moratoria a nuevas iniciativas nucleares y mantenimiento del calendario de cierre. Propone tarifas domésticas progresivas, no topes físicos obligatorios. | `ene-001`: `-2`; `ene-003`: `+2`; `va-005`: `-2`. Su programa **no** respalda el texto actual de `ene-006`; sí respalda una versión sobre tramos tarifarios. | [Un programa para ti](https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf), 6-7-2023, pp. 44-47: tarifa progresiva, mapa renovable coordinado y cierre nuclear. | Alta / media |
| **Verdes Equo** | Como integrante de Sumar suscribió el programa de cierre seguro y moratoria nuclear. | Igual orientación que Sumar, pero conviene que la ficha de partido cite el programa de coalición y no una inferencia por ser «verde». | [Copia oficial de Verdes Equo del programa de Sumar](https://verdesequo.es/wp-content/uploads/2023/07/Un-Programa-para-ti-bueno.pdf), julio de 2023. | Alta / media |
| **Podemos** | Cierre de centrales nucleares, transición justa y objetivo renovable; en 2024 vuelve a incluir el cierre nuclear en la transición europea. | `ene-001`: `-2`; `ene-003`: `+2`; `va-005`: `-2`. | [Programa europeo 2024](https://podemos.info/wp-content/uploads/2024/05/Programa-PODEMOS-elecciones-europeas-2024.pdf), mayo de 2024, p. 63; [programa general 2019](https://podemos.info/wp-content/uploads/2019/04/Podemos_programa_generales_28A.pdf), abril de 2019. | Alta / alta |
| **ERC** | Sustituir la producción nuclear mediante calendario de cierre y alcanzar un sistema 100 % renovable, distribuido y con participación territorial. | `ene-001`: `-2`; `ene-003`: `+2`; `va-005`: `-2`; ofrece evidencia para participación local, no necesariamente veto absoluto. | [Pacto Nacional para la Transición Energética](https://www.esquerra.cat/esquerra-erc-impulsara-pacte-nacional-transicio-energetica-2050/), publicado 19-5-2021 y actualizado 21-3-2024. | Alta / alta |
| **IU** | El programa conjunto de Sumar es la evidencia nacional más reciente de la coalición. No se localizó en esta revisión un documento autónomo reciente de IU que permita diferenciarla de Sumar en nuclear civil. | Puede heredarse el cierre de coalición con confianza media; no debe inventarse una diferencia IU-Sumar sin fuente. | [Valoración oficial de IU del programa de Sumar](https://izquierdaunida.org/2023/07/06/iu-valora-que-el-programa-conjunto-de-sumar-cumple-las-aspiraciones-de-solvencia-y-rigor-en-la-elaboracion-compromiso-con-la-clase-trabajadora-y-perspectiva-constituyente/), 6-7-2023. | Media / media |
| **Volt España** | Transición climática acelerada, red basada en renovables apoyada por nuclear e hidrógeno verde; el programa europeo sitúa renovables, nuclear e hidrógeno dentro de un futuro verde. Es el caso real más claro de **ecologismo pronuclear**. | `ene-002`: `+2`; `va-005`: `+2`; `ene-003`: desacuerdo. `ene-001`: como máximo `+1`, porque el texto no exige expresamente nuevas centrales españolas. | [Transición climática](https://voltespana.org/transicion-climatica), programa vigente en la web; [programa europeo 2024](https://voltespana.org/storage/spain/politicas/elecciones/europeas/programa-completo-1716827899.pdf), junio de 2024, introducción y política climática. | Alta / alta |
| **Frente Obrero** | Ampliar y modernizar el parque nuclear, explotar uranio nacional, combinar nuclear y renovables, y detener cierres. Rechaza el marco de la «transición ecológica» dominante. | `ene-001`: `+2`; `ene-003`: `-2`; `va-005`: `+2`; no es ecologismo pronuclear, sino productivismo soberanista. | [Un programa para recuperar España](https://frenteobrero.es/wp-content/uploads/2025/01/Programa.pdf), enero de 2025, pp. 14-15. | Alta / alta |
| **PACMA** | Modelo de ahorro, eficiencia y renovables; considera contaminante la nuclear y propone cierre al superar la vida útil. | `va-005`: desacuerdo; el texto antiguo respalda cierre, pero no permite puntuar con máxima confianza todas las formulaciones de 2026. | [Programa general de 2016](https://pacma.es/wp-content/uploads/2023/03/2016-06-Elecciones-generales.pdf), 26-6-2016, pp. 23 y 29. | Alta / baja |
| **Junts** | Un documento político de 2024 reconoce el peso de la nuclear en Cataluña, pero no se localizó en esta revisión una propuesta inequívoca de prórroga, cierre o nuevas centrales. | `ene-001`, `ene-003`, `va-005`: **NE**. Reconocer el dato de generación no es una posición normativa. | [Ponencia política 2024](https://web.junts.cat/wp-content/uploads/2024/10/Ponencia_2.pdf), octubre de 2024. | Baja para puntuar / alta |

No se encontró evidencia primaria suficiente para asignar una posición nuclear civil fuerte y actual a PNV, BNG o EH Bildu. Deben permanecer como **NE** hasta localizar programa o voto específico; la orientación general del partido no sustituye ese dato.

### 1.2 Tipologías reales y arquetipos

| Tipo | Partidos reales que encajan | Qué no debe confundirse |
|---|---|---|
| Ecologismo pronuclear / ecomodernismo verde | Volt España | No es lo mismo que defender la nuclear contra la política climática. |
| Pronuclear conservador-pragmático | PP | La evidencia más sólida es prorrogar centrales existentes, no construir nuevas. |
| Pronuclear soberanista/productivista | Vox, Frente Obrero | Coinciden en tecnología, pero no en mercado, UE ni modelo económico. |
| Cierre programado y sustitución renovable | PSOE, Sumar, Podemos, ERC, Verdes Equo | PSOE es más gradual y gubernamental; Sumar/Podemos/ERC son más explícitos en moratoria o 100 % renovable. |
| Antinuclear animalista/verde clásico | PACMA | Su fuente nacional detallada es antigua; conviene bajar vigencia, no confianza en el contenido histórico. |
| «Racionamiento climático doméstico» | **Arquetipo, no partido mapeado** | Sumar propone precios progresivos ajustados al hogar, no límites obligatorios de cantidad. |

### 1.3 Contexto institucional útil para redactar

La taxonomía de la UE no declaró «toda la energía nuclear verde». El [Parlamento Europeo explicó el 6-7-2022](https://www.europarl.europa.eu/news/es/press-room/20220701IPR34365/taxonomy-meps-do-not-object-to-inclusion-of-gas-and-nuclear-activities) que **determinadas actividades** nucleares, con requisitos específicos y límite temporal, entraban como actividades medioambientalmente sostenibles o de transición. `ene-002` debería usar ese lenguaje preciso.

## 2. Armas nucleares, pacifismo, intervención, OTAN y defensa europea

### 2.1 Marco jurídico y doctrinal

- España es Estado no poseedor bajo el Tratado de No Proliferación. El [artículo II del TNP](https://www.exteriores.gob.es/RepresentacionesPermanentes/oficinadelasnacionesunidas/es/Representacion/Documents/TratadoNoProliferacionArmasNucleares1968.pdf) obliga a no fabricar ni adquirir armas nucleares. `geo-007` presupone romper o abandonar una obligación internacional central.
- En el registro del depositario de la ONU del [Tratado sobre la Prohibición de las Armas Nucleares](https://treaties.un.org/pages/ViewDetails.aspx?chapter=26&mtdsg_no=XXVI-9&src=IND), actualizado a 4-11-2025, España no figura entre firmantes ni Estados parte. El Gobierno defendió en 2022 un desarme gradual dentro del TNP y la Iniciativa de Estocolmo: [nota de Exteriores, 2-8-2022](https://www.exteriores.gob.es/es/Comunicacion/NotasPrensa/Paginas/2022_NOTAS_P/20220802_NOTA064.aspx).
- El [Concepto Estratégico de la OTAN de 2022](https://www.nato.int/content/dam/nato/webready/documents/publications-and-reports/strategic-concepts/2022/290622-strategic-concept.pdf) afirma que la Alianza seguirá siendo nuclear mientras existan armas nucleares. Pertenecer a la OTAN sitúa a España dentro de esa arquitectura, pero no prueba por sí solo cómo contestaría cada partido `geo-005`.
- La [Ley Orgánica 5/2005 de Defensa Nacional](https://www.boe.es/buscar/act.php?id=BOE-A-2005-18933), artículos 17-19, ya exige autorización del Congreso para determinadas operaciones exteriores y fija condiciones de legalidad internacional. `geo-009` debe dejar claro que propone **referéndum además del control parlamentario vigente**.

### 2.2 Mapa de partidos

| Partido | OTAN, fuerza y defensa europea | Armas nucleares | Ítems respaldados o desaconsejados | Fuentes, fecha | Confianza / vigencia |
|---|---|---|---|---|---|
| **PSOE** | Permanencia activa en la OTAN; complementariedad OTAN-UE; aumento de capacidades de disuasión y defensa. | Gobierno partidario de desarme gradual por TNP, no adhesión inmediata al TPAN. No se localizó una declaración partidaria inequívoca sobre el paraguas nuclear literal de `geo-005`. | `def-002`: `-2`; `geo-004`: `+1`; `geo-006`: no asignar `-2` solo por no haber firmado el TPAN; `geo-005`: **NE** partidario. | [Programa PSOE 2023](https://www.psoe.es/media-content/2023/07/PROGRAMA_ELECTORAL-GENERALES-2023.pdf), pp. 256 y 263; [Cumbre OTAN](https://www.lamoncloa.gob.es/presidente/intervenciones/Paginas/2022/prsp20220630.aspx), 30-6-2022; [posición TNP](https://www.exteriores.gob.es/es/Comunicacion/NotasPrensa/Paginas/2022_NOTAS_P/20220802_NOTA064.aspx), 2-8-2022. | Alta / media-alta |
| **PP** | Papel activo en la Alianza Atlántica, 2 % del PIB, Europa de la Defensa y reserva militar **voluntaria**. Una PNL aprobada en 2022 define la autonomía europea como complementaria de la OTAN. | No se encontró posición primaria reciente y explícita sobre TPAN, paraguas nuclear o no primer uso. | `def-002`: `-2`; `geo-004`: `+1`; `geo-014`: **NE** —proponer una reserva voluntaria no prueba oposición a la conscripción—; `geo-005/006/008`: **NE**. | [Programa PP 2023](https://www.pp.es/storage/2023/07/programa_electoral_pp_23j_feijoo_2023.pdf), medidas 335-337; [BOCG 1-4-2022](https://www.congreso.es/es/busqueda-de-publicaciones?_publicaciones_id_texto=%28BOCG-14-D-431.CODI.%29&_publicaciones_legislatura=XIV&_publicaciones_mode=mostrarTextoIntegro&p_p_id=publicaciones&p_p_lifecycle=0&p_p_mode=view&p_p_state=normal), PNL sobre autonomía estratégica. | Alta / media |
| **Vox** | Pide cobertura OTAN explícita para Ceuta y Melilla, participa en misiones internacionales contra el yihadismo, aumenta defensa, pero subordina organismos y compromisos al interés nacional. Propone una reserva **voluntaria**. | No aparece una doctrina programática clara sobre TPAN, paraguas o arsenal propio. | `def-002`: `-2`; `geo-003`: desacuerdo en términos absolutos; `geo-014`: **NE**; `geo-015`: probablemente desacuerdo, pero exige prueba por caso; nuclear militar: **NE**. | [Programa Vox 2023](https://www.voxespana.es/wp-content/uploads/2023/07/Programa-VOX-2023-con-menos-peso.pdf), medidas 190-195. | Alta / media |
| **Sumar** | Desplazar progresivamente las garantías de seguridad de la OTAN hacia una autonomía estratégica europea democrática; diplomacia, mediación y seguridad humana; no es aislacionismo. | Ratificar el TPAN y liderar abolición nuclear; prohibir exportaciones de armas a países que vulneren DD. HH. | `geo-004`: `+1`; `geo-006`: `+2`; `geo-013`: `+2`; `geo-001`: **NE**, porque autonomía europea no es neutralidad permanente. | [Programa Sumar 2023](https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf), pp. 137-140. | Alta / media |
| **Podemos** | Construcción de paz, desmilitarización y estrategia europea no subordinada a la OTAN. | Adhesión y firma del TPAN; abolición nuclear. | `geo-006`: `+2`; `def-002`: orientación favorable a salida/ruptura, aunque para la ficha actual conviene citar un texto español específico si se usa `+2`; `geo-001`: **NE**. | [Programa europeo Podemos 2024](https://podemos.info/wp-content/uploads/2024/05/Programa-PODEMOS-elecciones-europeas-2024.pdf), pp. 108 y 122. | Alta / alta |
| **IU** | Plan de contingencia para abandonar la OTAN, rechazo al rearme, seguridad humana multilateral. No es aislacionismo: propone reforzar Naciones Unidas. | Desarme nuclear y apoyo histórico a un tratado de prohibición. | `def-002`: `+2`; `geo-006`: `+2`; `geo-015`: previsiblemente acuerdo con multilateralismo ONU, pese a salir de la OTAN. | [Declaración por la paz y contra el rearme](https://izquierdaunida.org/2025/06/25/declaracion-final-de-la-conferencia-por-la-paz-y-contra-el-rearme/), 25-6-2025; [programa IU 2019](https://izquierdaunida.org/wp-content/uploads/2019/10/Programa-IU-10N-Cuadernillo-06.pdf), pp. 158-160. | Alta / alta para OTAN; media para TPAN literal |
| **ERC** | Seguridad humana, prevención, cooperación, desarme y desnuclearización; simultáneamente mantiene apoyo a Ucrania frente a la invasión rusa. Esto impide codificarla como no-intervencionista absoluta. | Ratificación del TPAN. | `geo-006`: `+2`; `geo-003`: **NE**; `geo-013`: acuerdo probable, pero no sustituir el texto sobre control de armas por una prohibición total sin fuente exacta. | [Programa general ERC 2023](https://static.esquerra.cat/uploads/20230905/e2023-programa.pdf), julio-septiembre de 2023. | Alta / media |
| **Junts** | Defensa común europea por encima de ejércitos estatales, aprovisionamiento conjunto y complementariedad con OTAN. | No se localizó doctrina propia reciente sobre TPAN o paraguas nuclear. | `geo-004`: `+2`; `def-002`: `-1/-2`; armas nucleares: **NE**. | [Programa europeo Junts 2024](https://web.junts.cat/wp-content/uploads/2024/05/PROGRAMA-ELECTORAL-EU_2024_LLIURESxEUROPA_JUNTS.pdf), mayo de 2024, pp. 42-43. | Alta / alta |
| **PNV** | Potencia militar y Estado Mayor europeos, compras conjuntas y autonomía estratégica preservando la relación con OTAN. | No se localizó posición primaria suficiente sobre TPAN o disuasión nuclear. | `geo-004`: `+2`; `def-002`: `-2`; armas nucleares: **NE**. | [Programa europeo PNV 2024](https://hauteskundeorokorrak2019-a10.eaj-pnv.eus/es/adjuntos-documentos/21326/pdf/programa-europeas-2024), junio de 2024; [manifiesto PDE](https://www.eaj-pnv.eus/es/adjuntos-documentos/21424/pdf/europako-alderdi-demokrataren-2024ko-hauteskundema), 2024. | Alta / alta |
| **BNG** | Neutralidad activa, reducción de gasto, salida de OTAN, diálogo y resolución pacífica. | Rechaza la escalada atómica de la OTAN, pero no se localizó en este corte una formulación propia literal sobre ratificar TPAN. | `geo-001`: `+2`; `def-002`: `+2`; `geo-003`: `+2`; `geo-006`: como máximo `+1` sin fuente TPAN directa. | [Comunicado de la Executiva Nacional ante la cumbre OTAN](https://www.bng.gal/articulo/novas/comunicado-da-executiva-nacional-do-bng-cimeira-da-otan-que-decorrera-29-30-xuno-madrid/20220628102504032672.html), 28-6-2022. | Alta / media |
| **EH Bildu** | Identidad antimilitarista y pacifista; reivindica la tradición del no a la OTAN. | Fue coautora con ERC de la moción senatorial para adherirse al TPAN en 2021. | `def-002`: `+2`; `geo-006`: `+2`; neutralidad permanente o renuncia a toda guerra aliada: **NE**. | [Aberri Eguna 2025](https://ehbildu.eus/index.php/es/noticias/eh-bildu-presenta-en-pamplona-el-programa-del-aberri-eguna-2025), 1-4-2025; [moción y sesión oficial del Senado](https://www.senado.es/web/actividadparlamentaria/sesionescomision/detallecomisiones/sesionescomision/sesioncelebrada/index.html?id=S011001&idConv=1&idSes=17&lang=gl_ES&legis=14), 22-11-2021. | Alta / alta para antimilitarismo; media-alta para TPAN |
| **Volt España** | Fuerzas Armadas europeas integradas, pilar europeo dentro de OTAN, capacidad de intervención ante atrocidades y autonomía estratégica. | Apoya a largo plazo el TPAN, pero condicionado a mantener disuasión creíble; propone transferir la disuasión francesa a un Gobierno europeo. Es simultáneamente desarmista finalista y disuasorio actual. | `geo-002`: `+2`; `geo-004`: `+2`; `geo-005`: `+2`; `geo-006`: **no puntuar como +2 literal**, por la condición; `lib-013`: `+2`. | [Programa europeo Volt 2024](https://voltespana.org/storage/spain/politicas/elecciones/europeas/programa-completo-1716827899.pdf), pp. 19-23. | Alta / alta |
| **Frente Obrero** | Salida inmediata de OTAN **y reforzamiento del ejército**; expulsión de bases extranjeras; no misiones exteriores al servicio de intereses ajenos. | Sin posición primaria localizada sobre TPAN, paraguas o arsenal propio. | `def-002`: `+2`; `geo-003`: `+2`; `geo-001`: solo `+1`, porque salir de la OTAN no prueba neutralidad permanente; armas nucleares: **NE**. Demuestra que anti-OTAN no equivale a antimilitarismo. | [Programa 2025](https://frenteobrero.es/wp-content/uploads/2025/01/Programa.pdf), pp. 10 y 62. | Alta / alta |
| **Falange Española de las JONS** | Salida de OTAN por soberanía, ejército orientado al interés nacional y recuperación del servicio militar obligatorio. | Sin evidencia suficiente sobre doctrina nuclear militar. | `def-002`: `+2`; `geo-014`: `+2`; `geo-001`: **NE**. Segundo contraejemplo real a la definición actual de `atlantismo`. | [Programa general FE-JONS 2023](https://falange.es/wp-content/uploads/2023/07/Programa-electoral-FE-de-las-JONS.-ELECCIONES-GENERALES-23-JULIO-2023.pdf), julio de 2023; [ideas vigentes](https://falange.es/nuestras-ideas/). | Alta / media-alta |

### 2.3 Votación oficial sobre el TPAN

El 22-11-2021 la Comisión de Exteriores del Senado rechazó por 5 votos a favor y 22 en contra la moción de ERC-EH Bildu para que España se adhiriese al TPAN. La [sesión oficial](https://www.senado.es/web/actividadparlamentaria/sesionescomision/detallecomisiones/sesionescomision/sesioncelebrada/index.html?id=S011001&idConv=1&idSes=17&lang=gl_ES&legis=14) y el [Diario de Sesiones](https://www.senado.es/legis14/publicaciones/pdf/senado/ds/DS_C_14_291.PDF) son evidencia conductual útil, pero no se debe reconstruir el voto de todos los partidos a partir del total si no se verifica cada portavoz o voto nominal.

### 2.4 Arquetipos sin partido español relevante probado

- **Arsenal nuclear español propio (`geo-007`)**: no se encontró un partido relevante que lo proponga; además requiere romper con el TNP. Es un ancla extrema hipotética, no una base fiable de matching.
- **No uso nuclear incluso como represalia (`geo-008`)**: posición doctrinal coherente, pero no se halló programa español que conteste ese supuesto exacto. No debe atribuirse automáticamente a todo partido que apoye el TPAN.
- **Neutralidad armada estricta**: es conceptualmente posible y distinta de pacifismo e internacionalismo. BNG se acerca con «neutralidad activa», pero no representa por sí solo todas las variantes.
- **Intervencionista humanitario federal europeo**: Volt ofrece un caso real. PSOE y PP apoyan misiones y alianzas, pero `geo-002` exige una autorización y finalidad exactas que conviene documentar antes de fijar `+2`.

## 3. Sáhara Occidental

### 3.1 El marco internacional cambió en 2025

La [Resolución 690 (1991)](https://peacekeeping.un.org/en/factsheet/minurso) creó MINURSO dentro de un plan que preveía un referéndum con elección entre independencia e integración con Marruecos. Sin embargo, la [Resolución 2797 (2025)](https://documents.un.org/api/symbol/access?l=es&s=s%2Fres%2F2797%282025%29&t=pdf), vigente al corte de esta investigación, hace tres cosas a la vez:

1. conserva el principio de libre determinación;
2. prorroga MINURSO hasta el 31-10-2026;
3. apoya negociaciones **sobre la base del plan de autonomía marroquí** y considera que una autonomía verdadera puede ser una de las soluciones más viables.

Por tanto, es incorrecto afirmar en la nota de `sd-019` que «el referéndum es la posición de la legalidad internacional desde 1991, así que el ítem no caduca». El referéndum sigue siendo una reivindicación política y el nombre de la misión permanece, pero ya no es la única vía que el Consejo de Seguridad presenta como operativa. El ítem puede mantenerse por su poder discriminante; debe corregirse su justificación y fecharse la fuente.

### 3.2 Posiciones y voto

| Partido | Evidencia actual | Respuesta prudente a `sd-019` | Confianza / vigencia |
|---|---|---|---|
| **PSOE / Gobierno** | En marzo de 2022 calificó el plan de autonomía marroquí como la base más realista; el programa 2023 pide una solución mutuamente aceptable en ONU, sin mencionar referéndum. En la votación del 7-4-2022, casi todo el grupo socialista votó no. | `-2` para la dirección actual. | Alta / alta-media. [Moncloa, 22-3-2022](https://www.lamoncloa.gob.es/consejodeministros/ruedas/Documents/2022/Consejo%202022.03.22.pdf); [programa PSOE](https://www.psoe.es/media-content/2023/07/PROGRAMA_ELECTORAL-GENERALES-2023.pdf); [voto nominal](https://www.congreso.es/webpublica/opendata/votaciones/Leg14/Sesion171/20220407/Votacion001/VOT_20230302191206.pdf). |
| **Sumar** | Volver atrás en el giro de 2022 y apoyar plenamente la libre determinación; en febrero de 2025 el grupo volvió a defender referéndum en iniciativa oficial. | `+2`. | Alta / alta. [Programa 2023](https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf), pp. 140-141; [BOCG 25-2-2025](https://www.congreso.es/es/c/portal/update_language?languageId=en_GB&p_l_id=696133&redirect=%2Fes%2Fbusqueda-de-publicaciones%3Fp_p_id%3Dpublicaciones%26p_p_lifecycle%3D0%26p_p_state%3Dnormal%26p_p_mode%3Dview%26_publicaciones_mode%3DmostrarTextoIntegro%26_publicaciones_legislatura%3DXV%26_publicaciones_id_texto%3D%28BOCG-15-D-289.CODI.%29). |
| **Podemos** | Coautor de la PNL de 2022 que ratificó apoyo a resoluciones ONU y MINURSO; mantiene libre determinación dentro del campo de Sumar/izquierda alternativa. | `+2`, aunque la ficha debería citar además un programa propio si se quiere máxima actualidad organizativa. | Alta / media-alta. [Texto de la PNL](https://www.congreso.es/es/busqueda-de-publicaciones?_publicaciones_id_texto=%28BOCG-14-D-431.CODI.%29&_publicaciones_legislatura=XIV&_publicaciones_mode=mostrarTextoIntegro&p_p_id=publicaciones&p_p_lifecycle=0&p_p_mode=view&p_p_state=normal), 25-3-2022. |
| **ERC** | Revertir reconocimiento de soberanía marroquí y defender autodeterminación; en 2024 rechaza expresamente cualquier plan de autonomía. Coautor de la PNL de 2022. | `+2`. | Alta / alta. [Programa general 2023](https://static.esquerra.cat/uploads/20230705/e2023-programa.pdf); [programa europeo 2024](https://static.esquerra.cat/uploads/20240619/eu2024-programa-electoral.pdf). |
| **EH Bildu** | Coautor de la PNL de 2022 y de iniciativas con ERC para exigir referéndum. | `+2`. | Alta / media-alta. [Iniciativa oficial del partido](https://ehbildu.eus/herriak/kongresua-senatua/es/noticias/eh-bildu-y-erc-llevan-al-congreso-una-iniciativa-para-pedir-un-referendum-en-el-sahara-occidental-que-obligara-al-psoe-a-retratarse), 2022. |
| **BNG** | Tras la resolución 2797 registró una PNL para que MINURSO organice el referéndum; volvió a reafirmarlo en 2026. | `+2`. | Alta / alta. [BOCG 25-11-2025](https://www.congreso.es/public_oficiales/L15/CONG/BOCG/D/BOCG-15-D-438.PDF); [comunicado BNG 27-2-2026](https://www.bng.gal/articulo/novas/comunicado-da-executiva-do-bloque-nacionalista-galego-polo-50o-aniversario-da-proclamacion-da-republica-arabe-saharaui-democratica/20260227132533042319.html). |
| **PNV** | Programa 2023 rechaza el giro español y defiende el ejercicio del derecho de autodeterminación; ha defendido explícitamente referéndum en documentos anteriores y votó sí en 2022. | `+2` si se acepta autodeterminación + conducta; `+1` si se exige que la fuente vigente diga literalmente «referéndum». | Alta / media-alta. [Programa PNV 2023](https://hauteskundeorokorrak2019-a10.eaj-pnv.eus/es/adjuntos-documentos/20945/pdf/con-voz-propia-programa-electoral-23-j); [posición explícita de 2016](https://www.eaj-pnv.eus/noticias/eajpnv-adhiere-junto-todos-los_43109.html). |
| **PP** | En 2022 el grupo votó a favor de la PNL sobre ONU/MINURSO. En 2024 pidió volver a neutralidad y que el acuerdo final fuese refrendado por el pueblo saharaui; en 2025 logró una moción sobre neutralidad activa. | `+1`, no `+2`: «refrendado» y apoyo a MINURSO no prueban necesariamente la pregunta binaria exacta de `sd-019` en el marco posterior a 2797. | Alta / alta. [PP, 13-3-2024](https://www.pp.es/actualidad/articulos/gpp-logra-que-congreso-inste-sanchez-rectificar-su-giro-unilateral-sobre-sahara/); [BOCG Senado 13-6-2025](https://www.congreso.es/en/busqueda-de-publicaciones?_publicaciones_id_texto=BOCG_D_15_273_2432.CODI.&_publicaciones_legislatura=XV&_publicaciones_mode=mostrarTextoIntegro&p_p_id=publicaciones&p_p_lifecycle=0&p_p_mode=view&p_p_state=normal). |
| **Junts** | Sus diputados incluidos en el Grupo Plural votaron sí a la PNL de 2022. No se localizó aquí un programa reciente tan explícito como ERC o BNG. | `+1` conductual; no fijar `+2` sin fuente propia actual. | Media / media. [Voto nominal 7-4-2022](https://www.congreso.es/webpublica/opendata/votaciones/Leg14/Sesion171/20220407/Votacion001/VOT_20230302191206.pdf). |
| **Vox** | Se abstuvo en bloque en la PNL de 2022. Ha criticado el giro unilateral del Gobierno y hablado de «traición» al pueblo saharaui, pero otras comunicaciones son críticas con el Polisario y no fijan de forma consistente un referéndum. | **NE / 0 de incertidumbre**, no `+2`. | Alta para el voto, media-baja para el destino final. [Voto nominal](https://www.congreso.es/webpublica/opendata/votaciones/Leg14/Sesion171/20220407/Votacion001/VOT_20230302191206.pdf); [comunicado Vox 6-4-2022](https://www.voxespana.es/grupo_parlamentario/actividad-parlamentaria/sahara-espinosa-acusa-a-sanchez-de-rendirse-ante-marruecos-la-traicion-al-pueblo-saharaui-la-acabaran-pagando-los-espanoles-20220406). |
| **Frente Obrero** | Defiende sin reservas el derecho saharaui a la autodeterminación. | `+1/+2`; el programa no precisa mecánica, pero la dirección es inequívoca. | Alta / alta. [Programa 2025](https://frenteobrero.es/wp-content/uploads/2025/01/Programa.pdf), p. 10. |

La [votación oficial del Congreso del 7-4-2022](https://www.congreso.es/en/opendata/votaciones?p_p_id=votaciones&p_p_lifecycle=0&p_p_mode=view&p_p_state=normal&targetDate=07%2F04%2F2022&targetLegislatura=XIV) terminó 168 sí, 118 no y 61 abstenciones. El detalle nominal muestra PP, Unidas Podemos, ERC, Grupo Plural, PNV y EH Bildu en el sí; PSOE en el no; Vox y Ciudadanos en la abstención. La parte dispositiva aprobada apoyaba resoluciones de la ONU y MINURSO; no debe describirse como un voto literal sobre independencia.

## 4. Iberismo e integración voluntaria con Portugal

### 4.1 Partidos reales

| Actor | Posición | Encaje con `geo-010` | Confianza / vigencia |
|---|---|---|---|
| **Partido Ibérico Íber** | Articulación constitucional y confederal de Iberia como Comunidad Ibérica de Naciones —Portugal, Andorra y España— y unificación gradual de servicios y organismos. | `+2`. Es el único partido español real encontrado que encaja de forma directa. La frase de doble aprobación de `geo-010` es razonable como salvaguarda voluntaria, aunque no aparece literalmente en el resumen consultado. | Alta sobre el objetivo / media sobre vigencia. [Web oficial](https://www.partidoiber.es/), propuesta visible pero noticias fechadas en 2017; el [BOP de Ciudad Real de 26-4-2023](https://i.promecal.es/documentos/7417D609-EA83-0AD7-619963246DA6B415.PDF) acredita candidatura municipal del Partido Ibérico en Puertollano. |
| **PSOE** | Profundizar relaciones bilaterales y exportar «soluciones ibéricas». | **NE** para federación. Cooperación energética o bilateral no es unión política. | Alta / media. [Programa PSOE 2023](https://www.psoe.es/media-content/2023/07/PROGRAMA_ELECTORAL-GENERALES-2023.pdf), p. 263. |
| **Volt España** | Federación europea. | **NE** para federación ibérica: el federalismo europeo no permite deducir un nivel ibérico intermedio. | Alta / alta. [Programa europeo 2024](https://voltespana.org/storage/spain/politicas/elecciones/europeas/programa-completo-1716827899.pdf). |
| **Resto de partidos parlamentarios revisados** | No se encontró propuesta primaria de federación España-Portugal. | **NE**, no desacuerdo. | — |

La Sociedad Iberista y organizaciones culturales pueden servir como contexto intelectual, pero **no son partidos** y no deben aparecer en la tabla de matching partidario. El Movimento Partido Ibérico portugués tampoco es un partido español.

### 4.2 Arquetipos que deben quedar separados

- **Iberismo confederal voluntario**: Partido Íber, real pero minoritario.
- **Cooperación bilateral ibérica**: PSOE y consensos estatales; no implica unión política.
- **Federalismo europeo**: Volt, PNV, Junts y otros; no implica por sí mismo iberismo.
- **Anexionismo o unión coercitiva**: no se encontró respaldo de partido relevante. No debe inventarse como extremo partidario.

## 5. Gibraltar y reclamaciones territoriales históricas

### 5.1 Evidencia real

| Partido / institución | Posición | Encaje | Confianza / vigencia |
|---|---|---|---|
| **Gobierno / PSOE** | Acuerdo y prosperidad compartida sin renunciar a la posición jurídica española. El tratado publicado en 2026 mantiene intacta la reclamación. | `geo-012`: acuerdo, probablemente `+1` por enfoque pragmático. | Alta / alta. [Programa PSOE 2023](https://www.psoe.es/media-content/2023/07/PROGRAMA_ELECTORAL-GENERALES-2023.pdf), p. 259; [Moncloa, tratado sobre Gibraltar](https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/exteriores/Paginas/2026/260226-albares-tratado-gibraltar.aspx), 26-2-2026. |
| **PP** | Mantener la soberanía española como objetivo, con diálogo responsable y descolonización. | `geo-012`: `+2` o `+1` según cuánto pese el «aunque sus habitantes…». | Alta / alta. [Programa europeo PP 2024](https://www.pp.es/storage/2024/06/nuestros_compromisos.pdf), punto 62. |
| **Vox** | Aplicar presión internacional para recuperar el territorio; posición más maximalista. | `geo-012`: `+2`. | Alta / media-alta. [Programa Vox 2023](https://www.voxespana.es/wp-content/uploads/2023/07/Programa-VOX-2023-con-menos-peso.pdf), puntos 27 y 293; [iniciativa de 2024](https://www.voxespana.es/grupo_parlamentario/actividad-parlamentaria/gibraltar-espanol-vox-exige-al-gobierno-la-recuperacion-de-la-soberania-sobre-el-penon-la-ultima-colonia-en-suelo-europeo-20240801). |
| **Frente Obrero** | Expulsar bases extranjeras y recuperar el control de Gibraltar. | `geo-012`: `+2`. | Alta / alta. [Programa 2025](https://frenteobrero.es/wp-content/uploads/2025/01/Programa.pdf), p. 10. |

No se localizó una posición primaria suficientemente reciente para puntuar a Sumar, Podemos, ERC, Junts, PNV, BNG o EH Bildu en la frase exacta que enfrenta reclamación y preferencia de los residentes. No debe inferirse de su postura sobre autodeterminación doméstica.

### 5.2 Problema psicométrico

`geo-012` no separa bien a PSOE, PP y Vox en el **sí/no**; separa la intensidad y los medios. Además, cargarlo en `territorial` es un error de constructo: ese eje mide descentralización, autonomías y derecho a decidir **dentro de España**, mientras Gibraltar es una controversia exterior de soberanía. Cargarlo en `internacionalismo` tampoco es monotónico: una reclamación puede defenderse desde legalismo multilateral, nacionalismo o cooperación bilateral.

Opciones, en orden de preferencia:

1. dejar `geo-012` como **solo-matching** y usarlo para distinguir intensidad soberanista;
2. reescribirlo hacia una renuncia efectiva, donde sí habría desacuerdo: «España debería renunciar a su reclamación sobre Gibraltar mientras una mayoría clara de sus residentes rechace integrarse»;
3. crear un eje de revisionismo/reclamaciones exteriores solo si se añaden al menos otros dos ítems reales. Con un único caso, el eje sería inestable.

No se halló una agenda actual de partidos relevantes sobre otras anexiones o reclamaciones históricas comparable a Gibraltar. Es preferible dejar esos supuestos como arquetipos que fabricar posiciones sobre Olivenza, Portugal, Andorra o territorios norteafricanos sin programa primario.

## 6. Auditoría de `energia-modelo-productivo.json`

| ID | Diagnóstico | Recomendación concreta |
|---|---|---|
| `ene-001` | Buen ítem: separa nueva construcción de prórroga. Vox y Frente Obrero ofrecen anclas reales; PP no debe codificarse automáticamente a favor de nuevas plantas solo por apoyar prórrogas. | **Mantener.** Conservar carga únicamente en `energia-nuclear`. |
| `ene-002` | «Considerarse verde» es coloquial y la coletilla mezcla seguridad, residuos y emisiones sin remitirse a una regla concreta. La taxonomía europea solo incluye determinadas actividades y bajo condiciones. | Reescribir: **«La taxonomía europea de inversión sostenible debería incluir las actividades nucleares que cumplan sus requisitos técnicos y de gestión de residuos.»** Volt ancla el sí; verdes antinucleares, el no. |
| `ene-003` | Mide la misma frontera que `va-005` en sentido inverso. «Licencia actual» puede no coincidir con el calendario político de cierre y envejecer cuando se renueve una licencia. | Conservar uno solo. Texto más durable: **«España debería mantener el calendario vigente de cierre del parque nuclear y descartar nuevas prórrogas.»** Si se retienen ambos durante piloto, medir correlación y efecto de encuadre. |
| `ene-004` | Doble barril: red eléctrica y «principales empresas» son objetos distintos. La red es monopolio regulado; generación y comercialización son mercados. Sumar propone empresa pública/hidráulica, ERC titularidad pública de redes, pero eso no equivale a nacionalizar las principales energéticas. | Dividir en: (A) **«Las redes de transporte y distribución eléctrica deberían ser de titularidad pública.»** (B) **«Debería existir una empresa pública de generación y comercialización que compita con las privadas.»** No unirlas. |
| `ene-005` | Es contrapunto razonable a propiedad/intervención pública, pero «productores privados» no debe abarcar la red monopolística. | Mantener tras precisar: **«La generación y comercialización de electricidad deberían realizarse principalmente por empresas privadas en competencia.»** |
| `ene-006` | No se encontró plataforma partidaria relevante que proponga límites cuantitativos obligatorios a los hogares. «Mayor consumo» no equivale a mayor renta: penaliza tamaño familiar, electrificación o necesidades médicas. La nota llama progresiva a una medida que no incorpora renta ni hogar. | O marcarlo como **arquetipo actitudinal**, sin matching de partido, o reemplazarlo por la propuesta real de Sumar: **«La factura eléctrica doméstica debería encarecerse por tramos a partir de un mínimo vital, ajustando los tramos al tamaño del hogar.»** No confundir precio progresivo con racionamiento. |
| `ene-007` | El identificador falta en la secuencia. No es un defecto semántico, pero parece una baja no documentada y dificulta auditorías. | Confirmar si hubo retirada; si no, registrar la razón del hueco. No renumerar IDs existentes. |
| `ene-008` | «Reservar suelo mediante planificación central» ignora competencias autonómicas y locales de ordenación y usa «central» como palabra cargada. La propuesta real de Sumar es mapa nacional coordinado con CCAA, biodiversidad y participación municipal. | Reescribir: **«Debería aprobarse un mapa estatal, coordinado con las comunidades autónomas, de zonas preferentes para grandes instalaciones renovables.»** La biodiversidad/participación puede quedar en otro ítem para no suavizar el coste de planificación. |
| `ene-009` | Buen intento de separar I+D de construcción, pero «prioritaria» no indica frente a qué. Vox sí apoya I+D nuclear y SMR; PP/Volt requieren fuente específica para el gasto público literal. | Reescribir: **«El Estado debería financiar programas específicos de I+D en reactores modulares y otras tecnologías nucleares avanzadas.»** Mantener carga nuclear moderada y estatismo pequeño. |
| `ene-010` | Duplicado casi literal de `va-007` y muy próximo a `sd-016`. | **Eliminar uno de los tres**. La mejor formulación de coste explícito es `va-007`; `sd-016` puede conservarse como versión socialdemócrata más moderada. `ene-010` aporta poco. |
| `ene-011` | Solapa con `va-008` y funciona como reverso cognitivo de los ítems de decrecimiento. Además, «puede continuar si…» es una predicción condicional más que una decisión política. | Retirar o convertir en elección normativa: **«España debería perseguir crecimiento verde mediante innovación en lugar de reducir deliberadamente la producción material.»** Aun así, evitar tenerlo junto a `va-008` salvo experimento de fiabilidad. |
| `ene-012` | «Comunidades locales» puede significar vecinos, ayuntamientos o CCAA. Un veto de autoridades locales no es democracia directa. Tampoco implica menos estatismo: descentralizar poder al Estado local sigue siendo estatismo. Solapa con `va-006`. | Si se quiere medir democracia directa: **«Una gran infraestructura energética debería poder ser bloqueada por un referéndum vinculante en los municipios directamente afectados.»** Eliminar carga `estatismo`. Si se quiere medir autonomía municipal, cambiar eje y no usar «comunidades». |

### Propuesta mínima de banco energético

Para cubrir las diferencias reales sin redundancia bastan, inicialmente:

1. nuevas centrales (`ene-001`);
2. prórroga del parque actual (una sola versión entre `ene-003` y `va-005`);
3. taxonomía/ecologismo pronuclear (`ene-002` corregido);
4. red pública y empresa pública en dos ítems distintos;
5. tarifa progresiva doméstica, no racionamiento inventado;
6. mapa coordinado de renovables frente a veto local/referéndum;
7. una sola ancla de decrecimiento y una sola de ecomodernismo/mercado.

## 7. Auditoría de `geopolitica-defensa.json`

| ID | Diagnóstico | Recomendación concreta |
|---|---|---|
| `geo-001` | Neutralidad militar no es aislamiento internacional. BNG combina neutralidad activa, cooperación y diplomacia. La carga `implicacion-internacional: -1` produciría un falso aislacionismo. | Mantener como alianza/neutralidad, **eliminar carga de implicación internacional**. Considerar un eje `alineamiento-militar` si se separa de OTAN. |
| `geo-002` | Buen caso difícil para pacifismo, pero «autorizadas internacionalmente» puede significar ONU, OTAN, UE o petición estatal; la fuente de legitimidad cambia respuestas. | Precisar **«autorizadas por el Consejo de Seguridad de la ONU»** si se quiere intervención humanitaria multilateral. Mantener `uso-fuerza`; la carga de implicación puede ser moderada, no automática. |
| `geo-003` | Útil como no intervención, pero «guerras» y «aliados solicitaran ayuda» mezclan expedición opcional y defensa colectiva ante agresión. No intervenir no implica menor diplomacia multilateral. | Mantener carga `uso-fuerza`; **retirar `implicacion-internacional`**. Si se desea defensa colectiva, crear otro escenario explícito. |
| `geo-004` | Solapa con `ue-003` y `lib-013`, pero añade el matiz valioso de autonomía respecto a EE. UU. La PNL PP-PSOE aprobada en 2022 y programas de Junts, PNV, Sumar y Volt demuestran que este matiz es real. | Mantener `geo-004` como ítem principal de autonomía estratégica. Retirar `ue-003`; reescribir `lib-013` para medir solo federación/gobierno europeo. |
| `geo-005` | Distinción válida entre paraguas aliado y arsenal propio. Solo Volt ofrece evidencia partidaria inequívoca encontrada. La pertenencia a OTAN no basta para puntuar automáticamente. | Mantener como ítem doctrinal/experimental. Añadir nota de **no inferencia por membresía OTAN**. |
| `geo-006` | Buena frontera, pero la política concreta es firmar/ratificar el TPAN. La carga `uso-fuerza: -0.5` es errónea: un actor puede apoyar intervención convencional y prohibición nuclear, como muestra la combinación de Volt aunque su apoyo sea condicional. | Reescribir: **«España debería firmar y ratificar el Tratado sobre la Prohibición de las Armas Nucleares aunque sus aliados nucleares se opusieran.»** Eliminar carga `uso-fuerza`; dejar solo `armas-nucleares`. |
| `geo-007` | No hay partido relevante probado; contradice el artículo II del TNP. Tendrá efecto suelo y puede clasificar por fantasía soberanista más que por programa real. | **Retirar del matching partidario** o conservar solo como ancla opcional/arquetipo, explicando que exige abandonar el TNP. No cargar `atlantismo`: una fuerza pro-OTAN también podría imaginar capacidad propia. |
| `geo-008` | El tag `no-primer-uso` es incorrecto. La frase prohíbe también la represalia, es decir, **no uso**, no solo no ser el primero. La carga en fuerza convencional tampoco es monotónica. | Cambiar tag a `no-uso-nuclear`/`represalia-nuclear`; eliminar carga `uso-fuerza`. Mantener solo si el piloto tolera un ancla doctrinal sin partidos claros. |
| `geo-009` | No reconoce que ya existe autorización parlamentaria para ciertas misiones. «Enviar tropas a una guerra» puede incluir defensa inmediata, evacuación o mantenimiento de paz. | Reescribir: **«El envío de tropas españolas a una operación de combate en el extranjero debería requerir un referéndum vinculante, además de la autorización del Congreso.»** Solo cargar democracia directa. |
| `geo-010` | Partido Íber aporta ancla real, pero ningún partido parlamentario importante. La doble aprobación es una salvaguarda razonable; no prueba una preferencia general por democracia directa. Iberismo también puede ser un nuevo nacionalismo ibérico, no internacionalismo lineal. | Mantener como ítem de matching minoritario/arquetipo. **Eliminar carga `democracia-directa`** y moderar o retirar `internacionalismo` si no se valida. |
| `geo-011` | Principio abstracto casi inverso de `geo-012`. Las cargas son impropias: consentimiento de residentes no mide descentralización doméstica ni solidaridad internacional. | Solo-matching o retirar. Si se mantiene, **sin cargas lineales**. |
| `geo-012` | Caso real, pero consenso amplio de PSOE-PP-Vox sobre conservar la reclamación. Difiere el tono, no la dirección. Cargar en `territorial` doméstico e `internacionalismo` es error de constructo. | Convertir en solo-matching/intensidad o invertirlo hacia renuncia condicionada por residentes. Eliminar ambas cargas actuales. |
| `geo-013` | Política real de Sumar y otras izquierdas, pero prohibir exportaciones por DD. HH. no mide de modo lineal pacifismo ni internacionalismo: intervencionistas liberales, pacifistas y aislacionistas pueden coincidir. | Mantener como solo-matching o crear, con más ítems, un eje `derechos-humanos-realismo`. Eliminar cargas actuales. |
| `geo-014` | Falange ancla el sí; PP y Vox solo permiten afirmar que proponen una reserva voluntaria, lo que no prueba ni apoyo ni rechazo de la conscripción. Conscripción tampoco equivale a intervencionismo exterior. | Mantener solo si se incluyen partidos marginales. **Eliminar `uso-fuerza` y `social`** o crear un eje específico de militarización/reclutamiento con más indicadores. |
| `geo-015` | Formulación de alta deseabilidad social y demasiado abstracta. Puede producir acuerdo tanto europeísta como internacionalista sin revelar qué compromiso acepta el usuario. | Sustituir por caso concreto: **«Las decisiones de política exterior de la UE deberían poder aprobarse por mayoría cualificada aunque España votara en contra.»** Cargar implicación/multilateralismo y, moderadamente, UE. |

### Ítem saharaui fuera de fichero

`sd-019` tiene `modulo: geopolitica-defensa` pero permanece en `socialdemocracia-reformismo.json`. Esto crea una inconsistencia de arquitectura y hace que una auditoría por fichero parezca no cubrir el Sáhara. Cuando se permita editar datos, conviene moverlo a `geopolitica-defensa.json` conservando el ID estable o, mejor, adoptar un prefijo coherente mediante migración explícita.

Su carga `internacionalismo: -0.5` debe eliminarse. Apoyar un referéndum saharaui puede proceder de anticolonialismo, nacionalismo de pueblos, legalismo ONU o estrategia bilateral; no mide de manera monotónica «solidaridad internacional frente a nación primero». También deben retirarse expectativas no documentadas —por ejemplo Izquierda Española— y actualizar la nota con la resolución 2797 (2025).

## 8. Auditoría de ejes

| Eje | Evaluación | Cambio propuesto |
|---|---|---|
| `energia-nuclear` | **Necesario y bien separado de ecología.** Su polo positivo une mantenimiento y expansión, que son grados distintos pero razonablemente ordinales si se usan ítems separados. | Renombrar polos a «cierre y sustitución» ↔ «continuidad y expansión». Mantener al menos una pregunta de nueva construcción y otra de prórroga. |
| `atlantismo` | Mezcla alineamiento OTAN con gasto y antimilitarismo. Frente Obrero y Falange quedan mal representados; también un europeísta militarmente autónomo puede no ser atlantista. | Definirlo solo como **alineamiento atlántico**: «salida/no alineamiento con OTAN» ↔ «integración y garantías OTAN». Mover gasto, conscripción y tamaño militar a otro constructo. |
| `uso-fuerza` | Pacifismo, intervención humanitaria, defensa colectiva y disuasión no son idénticos. El eje puede sobrevivir como propensión general, pero solo con escenarios diversos. | Usar casos de agresión a España/aliado, misión ONU para proteger civiles y guerra expedicionaria. No cargar TPAN, exportación de armas ni conscripción. Considerar nombre `intervencionismo-militar`. |
| `armas-nucleares` | Es el eje nuevo más limpio: abolición ↔ disuasión/capacidad. Aun así, paraguas, arsenal propio y doctrina de uso son facetas diferentes. | Mantener; retirar `geo-007` del banco principal y corregir `geo-008`. Usar TPAN + paraguas aliado como indicadores centrales. |
| `implicacion-internacional` | El polo negativo equipara aislamiento y neutralidad estricta. Un país neutral puede ser intensamente multilateral. | Renombrar a `multilateralismo-vinculante` o redefinir: «unilateralidad/soberanía de decisión» ↔ «compromisos multilaterales vinculantes». No cargar neutralidad ni no intervención por sí solas. |
| `territorial` | Diseñado para centralización/descentralización doméstica, pero recibe Gibraltar. | No usar para reclamaciones exteriores. Solo crear `revisionismo-territorial` si hay tres o más indicadores reales; en caso contrario, solo-matching. |
| `internacionalismo` | Se está usando como cajón de sastre para Sáhara, Gibraltar, iberismo y exportación de armas. Esas posiciones tienen motivaciones cruzadas y no forman una escala única. | Limitarlo a prioridad nacional/exclusión frente a solidaridad transnacional donde haya relación monotónica. Retirar cargas de `geo-010` a `geo-013` salvo validación empírica. |

Una arquitectura mínima más interpretable sería:

1. **alineamiento atlántico**: OTAN/no OTAN;
2. **capacidad/militarización**: gasto, tamaño, reserva o conscripción;
3. **intervencionismo**: disposición a usar fuerza en escenarios concretos;
4. **armas nucleares**: TPAN, paraguas y represalia;
5. **multilateralismo vinculante**: aceptar reglas y decisiones compartidas;
6. ítems de Sáhara, Gibraltar, iberismo y exportación de armas como matching o ejes solo cuando haya suficientes indicadores.

## 9. Duplicados y solapamientos de la branch

| Grupo | Ítems | Grado | Resolución recomendada |
|---|---|---|---|
| Defensa/federalización europea | `ue-003`, `geo-004`, `lib-013` | Alto | Conservar `geo-004` para autonomía estratégica; conservar `ue-002` para federación política; reescribir `lib-013` sin ejército o retirarlo; retirar `ue-003`. |
| Prórroga/cierre nuclear | `ene-003`, `va-005` | Muy alto, casi inversos | Elegir una sola formulación sobre mantener calendario o prolongar vida. Mantener `ene-001` porque nueva construcción sí es distinta. |
| Decrecimiento | `ene-010`, `va-007`, `sd-016`; `izq-027` es reverso obrerista | Alto | Retirar `ene-010`; conservar `va-007` como ancla fuerte y `sd-016` solo si se necesita el matiz moderado en socialdemocracia. `izq-027` puede seguir como framing de clase, no como medida general del mismo eje si se controla redundancia. |
| Innovación/crecimiento verde | `ene-011`, `va-008`, reverso de los anteriores | Medio-alto | Elegir una sola formulación normativa. `va-008` añade mercado; `ene-011` es demasiado factual. |
| Renovables y territorio | `ene-008`, `ene-012`, `va-006` | Medio-alto | Crear un par claro: planificación coordinada/zonas preferentes frente a veto o referéndum local. Retirar la tercera formulación o dejarla solo-matching. |
| Salida de OTAN | `def-002` activo; `sd-001` y `dr-009` retirados; `izq-012` añade condición de gobierno | Exacto en retirados, parcial en izquierda | No hay duplicado activo exacto salvo que los retirados vuelvan a entrar. Conservar `def-002` como universal e `izq-012` solo para prioridad estratégica interna. |

## 10. Correcciones prioritarias antes de promover ítems

1. Corregir `sd-019`: fuente y nota posterior a resolución 2797, sin carga de internacionalismo y ubicado con geopolítica.
2. Separar `atlantismo` de militarización/gasto; revisar todas sus cargas, no solo los ítems nuevos.
3. Eliminar cargas no monotónicas de `geo-001`, `geo-003`, `geo-006`, `geo-008`, `geo-010`-`geo-014`.
4. Resolver los tres duplicados más fuertes: UE-defensa, prórroga nuclear y decrecimiento.
5. Reescribir `ene-004`, `ene-006`, `ene-008`, `ene-012`, `geo-006`, `geo-009` y `geo-015` antes del piloto.
6. Marcar `geo-007`, `geo-008`, `geo-009`, `geo-010` y `geo-014` como arquetípicos/minoritarios cuando no haya suficiente partido real, en vez de fabricar respuestas esperadas.
7. Incorporar a Volt España como partido real para ecologismo pronuclear y disuasión europea; incorporar Frente Obrero y Falange como pruebas de que anti-OTAN no equivale a pacifismo o ejército débil.

## 11. Índice breve de fuentes institucionales transversales

- [Taxonomía de la UE: inclusión condicionada de determinadas actividades nucleares](https://www.europarl.europa.eu/news/es/press-room/20220701IPR34365/taxonomy-meps-do-not-object-to-inclusion-of-gas-and-nuclear-activities), Parlamento Europeo, 6-7-2022.
- [Tratado de No Proliferación, artículo II](https://www.exteriores.gob.es/RepresentacionesPermanentes/oficinadelasnacionesunidas/es/Representacion/Documents/TratadoNoProliferacionArmasNucleares1968.pdf), texto oficial.
- [Estado del Tratado sobre la Prohibición de las Armas Nucleares](https://treaties.un.org/pages/ViewDetails.aspx?chapter=26&mtdsg_no=XXVI-9&src=IND), depositario ONU, estado mostrado a 4-11-2025.
- [Concepto Estratégico OTAN 2022](https://www.nato.int/content/dam/nato/webready/documents/publications-and-reports/strategic-concepts/2022/290622-strategic-concept.pdf), 29-6-2022.
- [Ley Orgánica 5/2005 de Defensa Nacional](https://www.boe.es/buscar/act.php?id=BOE-A-2005-18933), BOE, texto consolidado.
- [Resolución 2797 (2025) sobre Sáhara Occidental](https://documents.un.org/api/symbol/access?l=es&s=s%2Fres%2F2797%282025%29&t=pdf), Consejo de Seguridad, 31-10-2025.
- [PNL y votación nominal del Congreso sobre Sáhara](https://www.congreso.es/webpublica/opendata/votaciones/Leg14/Sesion171/20220407/Votacion001/VOT_20230302191206.pdf), 7-4-2022.
- [Tratado y posición española sobre Gibraltar](https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/exteriores/Paginas/2026/260226-albares-tratado-gibraltar.aspx), Gobierno de España, 26-2-2026.
