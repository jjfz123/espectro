# Tanda de anclas: cuadrante izquierda-orden del plano Economía × Sociedad

**Fecha:** 2026-07-12 · **Base:** `b788b6b` · **Alcance:** solo altas de posiciones en
`data/referencias/{strasserismo,marxismo-leninismo-maoismo,izquierda-social-patriotica-espanola}.json`.
No se ha tocado ni re-valorado ninguna posición existente.

## Objetivo y criterio

Una referencia se dibuja en el plano detallado Economía × Sociedad cuando tiene **≥4 posiciones
con carga no nula en `economico` y ≥4 en `social`** (`web/src/zonasCorrientes.ts → referenciasDelPar`,
umbral `minimoItems: 4` de `src/engine/espacio.ts`; los ítems `retirado` no cuentan).

## Antes / después (posiciones con carga eco / social; faceta calculada)

| Ficha | Antes | Después | ¿Se dibuja? | Faceta (eco, social) |
|---|---|---|---|---|
| strasserismo | 3 / 2 | **5 / 4** | **Sí** | (−86,7, +100,0) |
| marxismo-leninismo-maoismo | 3 / 1 | **5 / 4** | **Sí** | (−69,2, −37,5) |
| izquierda-social-patriotica-espanola | 3 / 2 | **6 / 5** | **Sí** | (−83,3, +100,0) |
| marxismo-ortodoxo | 2 / 0 | 2 / 0 (sin cambios) | No | (−75,0, null) |
| hoxhaismo | 0 / 0 | 0 / 0 (sin cambios) | No | (null, null) |

Regresión protegida: en el punto del feedback beta (−60, +70) la zona más cercana sigue siendo
`franquismo-nacionalcatolico-1945-1957` (d≈30,1) frente a las nuevas anclas ISP (d≈38,0) y
strasserismo (d≈40,2); `tests/zona-usuario-detalle.test.ts` pasa sin cambios.

## Método de verificación de pasajes

`WebFetch` y `curl` están bloqueados en este entorno para los archivos doctrinales (403 del
proxy/CDN, incluido marxists.org). Cada cita textual se verificó mediante **búsquedas de frase
exacta** (WebSearch) que devolvieron la transcripción literal y la URL del archivo; para la ISP se
reutilizó además evidencia ya transcrita y verificada en `data/partidos/frente-obrero.json`
(mismas URL y citas). Donde no se pudo asegurar transcripción literal, la fuente lleva
título-localizador sin campo `cita` (patrón ya usado por las fichas).

## strasserismo (+2 eco, +2 social)

| Ítem | Valor | Pasaje / localizador | Fuente |
|---|---|---|---|
| der-004 (proteccionismo legítimo) | +2 | Sección «State Monopoly of Foreign Trade» del programa económico del «socialismo alemán»: todo el comercio exterior bajo monopolio estatal | Otto Strasser, *Germany Tomorrow* (1940), archive.org (`in.ernet.dli.2015.174648`) |
| lab-016 (empresas estratégicas dirigidas por el Estado) | +2 | Nacionalización de grandes trusts y banca como principio programático (1925-1926), no como corrección de fallo de mercado | en.wikipedia.org/wiki/Gregor_Strasser (síntesis de contraste) |
| dr-003 (retorno también de inmigrantes regulares) | +2 | La sección «cuestión judía» del borrador de 1925-1926 exigía la expulsión de los inmigrantes judíos y la desnacionalización de los judíos alemanes (reclasificados como extranjeros) | en.wikipedia.org/wiki/Otto_Strasser |
| cul-003 (modo de vida amenazado por otras culturas) | +2 | Ultranacionalismo völkisch: lo alemán amenazado por un elemento ajeno a la comunidad racial; el programa pedía por ello expulsiones (calidad **baja**: es la tesis del ítem en clave racial, no migratoria general) | en.wikipedia.org/wiki/Strasserism |

**No añadidos (huecos honestos):** izq-005 (los gremios strasseristas sustituyen tanto al
monopolio capitalista como a la planificación central: sin respuesta unívoca al enunciado);
lab-027 (ítem condicionado a lab-009 «impuestos=robo», marco ajeno a la doctrina); cul-001
(el racialismo niega que la asimilación baste: no responde el eje asimilación/convivencia);
dr-013 (habría sido el ancla natural de la democracia orgánica-estamental de Otto Strasser,
pero el ítem está **retirado**); cul-004, izq-013, soc-002 (sin pasaje).

## marxismo-leninismo-maoismo (+1 eco, +3 social; izq-042 carga en ambos)

| Ítem | Valor | Pasaje (cita textual en la ficha) | Fuente |
|---|---|---|---|
| izq-016 (expropiación sin indemnización de banca y grandes grupos) | +2 | «Confiscar … el capital monopolista, cuyos cabecillas son Chiang Kai-shek, T. V. Soong, H. H. Kung y Chen Li-fu, y entregarlo al Estado de nueva democracia; proteger la industria y el comercio de la burguesía nacional» | Mao, *La situación actual y nuestras tareas* (1947), marxists.org/espanol (`PSOT47s.html`) |
| izq-044 (reducir funciones de la policía) | −2 | «El aparato estatal, incluidos el ejército, la policía y los tribunales, es el instrumento con que una clase oprime a otra»; la tarea fijada es *fortalecer* el aparato estatal del pueblo | Mao, *Sobre la dictadura democrática popular* (1949), marxists.org/espanol (`PDD49s.html`) |
| izq-042 (ocupar edificios como acción política legítima) | +1 | «Hacer la revolución no es ofrecer un banquete… Una revolución es una insurrección, es un acto de violencia mediante el cual una clase derroca a otra»; el Informe defiende como justas las irrupciones y ocupaciones campesinas. Moderado a +1: su criterio es el contenido de clase, no el repertorio okupa autogestionario | Mao, *Informe … movimiento campesino en Junán* (1927), Obras Escogidas t. I (marxists.org/espanol, PDF) |
| lim-007 (derechos políticos según origen étnico) | −2 | Directiva que ordena combatir el chovinismo de gran jan con crítica y educación; igualdad de las nacionalidades (título-localizador, texto de una página) | Mao, *Criticar el chovinismo de gran jan* (16-03-1953), marxists.org/espanol (`CHC53s.html`) |

**Colocación resultante:** social = −37,5 → el MLM cae en el cuadrante izquierda-**progresista**,
no en izquierda-orden. Es el resultado honesto del instrumento: sus posiciones documentables en
los ítems con carga social (antipatriarcado del Informe de Junán → fem-007 −2 ya existente,
antietnicismo → lim-007 −2, ocupaciones → izq-042 +1) tiran hacia el polo «progresista», y solo
izq-044 (−2, policía) tira hacia «orden». Su autoritarismo político vive en los ejes
`autoridad-politica`/`pluralismo-institucional`/`metodo-cambio`, no en el macroeje social. No se
forzaron valores para «colocarlo» en el cuadrante.

**No añadidos:** soc-002/soc-004/soc-005 (política migratoria española contemporánea: hueco),
soc-003 (videovigilancia: anacrónico), soc-006/der-019 (prisión permanente revisable: anacrónico),
fem-001/fem-012/dr-007/dr-018 (sin pasaje doctrinal), cul-004 (rito escolar de bandera: práctica
de Estado sin pasaje doctrinal claro), fem-014 (la prohibición del opio 1950-52 es práctica
estatal documentada pero sin texto doctrinal de Mao localizable con URL estable), dr-001
(respondible con el mismo pasaje de *Sobre la Nueva Democracia* ya citado para lab-016; se evitó
duplicar pasaje para cruzar umbrales).

## izquierda-social-patriotica-espanola (+3 eco, +3 social; fem-010 carga en ambos)

| Ítem | Valor | Pasaje (cita textual en la ficha) | Fuente |
|---|---|---|---|
| eco-005 (limitar alquileres por ley) | +2 | Resumen del programa: «…la vivienda pública, a los autónomos, controlar los precios del alquiler y limitar la inmigración» | es.wikipedia.org/wiki/Frente_Obrero_(España) |
| eco-003 (seguir subiendo el SMI por ley) | +2 | Mismo pasaje-resumen («la subida del salario mínimo»), declarado como mismo grupo de evidencia | ídem (mismo `grupoEvidencia`) |
| fem-010 (cuotas de mujeres en consejos) | −2 | «Derogación parcial o total de todas las leyes basadas en la discriminación positiva […] Supresión de los cupos.» | frenteobrero.es/nuestro-programa-2/ (2026-01-20) |
| fem-001 (cambio registral de sexo por sola voluntad) | −2 | Campaña #STOP-LEY-TRANS contra «el borrador defensor de la autodeterminación de género» (2021, posición sostenida en el programa vigente) | murcia.com (nota de la organización, 2021-03-08) |
| soc-002 (devolución como respuesta prioritaria) | +2 | Vaquero: regularizar invierte los incentivos; lo correcto es el regreso al país de origen y los cauces legales (título-localizador) | El Diario de Madrid, 2025-11-18 |

**No añadidos:** izq-046 (fronteras abiertas: evidencia sólida en robertovaquero.es pero **sin
fecha localizable**, y el trinquete de fechas no admite nuevas posiciones sin `fuente.fecha`);
izq-016 (el banco espera FO +2 pero no localicé pasaje programático con «sin indemnización»);
soc-004 (equivalente a la evidencia de soc-002; se evitó inflar con el mismo argumento);
eco-006/eco-008/sd-011 (formulaciones del ítem —escala de gasto, IPC— no cubiertas literalmente).

**Nota de colocación:** social = +100 con cinco posiciones ±2. No es sesgo de codificación sino
del repertorio documentable del tipo ideal (todas sus posiciones sociales conocidas son
restrictivas); la advertencia de la ficha ya declara que faltan discriminantes moderadores. Si el
banco gana ítems sociales donde esta doctrina modere (p. ej. laicismo, memoria), conviene
añadirlos en una tanda futura.

## marxismo-ortodoxo — dejada sin cambios (y por qué)

El encargo la condicionaba a evidencia sólida para ≥2 eco **y ≥4 social**. Lo segundo es
inalcanzable honestamente hoy:

- El ancla natural (democracia orgánica, dr-013, donde Kautsky puntuaría −2 desde *La dictadura
  del proletariado*) está **retirada**; su sustituto `dem-018` carga `institucionalismo`, no `social`.
- El resto de ítems con carga social son política española contemporánea (migración, penal,
  LGTB, toros); la resolución de Stuttgart 1907 sobre migración es del corpus de la II
  Internacional pero es un compromiso de congreso («middle course», Hillquit) y no atribuible
  limpiamente al tipo kautskiano; PASAJE-O-HUECO → hueco.

Evidencia económica localizada y **lista para una tanda futura** (no añadida porque no cambia la
dibujabilidad): programa mínimo de Erfurt con jornada máxima legal de ocho horas (→ eco-011 ≈ +1,
la cláusula «sin rebaja de salario» no está en el texto) e imposición directa progresiva
sustituyendo los impuestos indirectos (→ eco-001 +2). Fuentes: es.wikipedia.org/wiki/Programa_de_Erfurt;
texto íntegro en español en grupgerminal.org (PDF, ojo: sirve en `http://`, el esquema exige `https://`).

## hoxhaismo — dejada sin cambios (y por qué)

Sus 12 posiciones viven en ejes doctrinales (`izq-*`, rel, def). Para eco existen expectativas del
banco (izq-016 +2, izq-017 −2, izq-005 +2, notas de los ítems) y la obra ancla (*El imperialismo y
la revolución*, marxists.org/espanol) está en `fuentesMarco`, pero marxists.org es ilegible desde
este entorno y no localicé por búsqueda pasajes económicos transcritos literalmente. Sin pasaje, no
hay posición. Aunque se añadieran las eco, seguiría en 0 ítems sociales (mismo diagnóstico que el
marxismo ortodoxo), es decir, no dibujable.

## Observaciones editoriales (sin tocar nada existente)

1. La advertencia «1 cita(s) tienen identidad canónica pero no URL HTTPS o localizador de 20
   caracteres» de `validate:evidence-groups` es **preexistente** en la base `b788b6b` (verificado
   con stash) y no proviene de esta tanda.
2. `strasserismo.dr-002` (existente) justifica con «es coherente con ese principio völkisch»
   (calidad baja); si se endurece el criterio anti-inferencia, es candidata a revisión editorial.
   No se ha tocado.
3. El maoísmo y el estalinismo soviético (ya dibujado en (−100, +63,6)) quedan ahora a ambos lados
   del eje social; puede ser útil para explicar en la UI que «izquierda autoritaria» no implica
   «social-orden» en este instrumento.

## Puertas

`npm run validate:data` ✓ y `npm test` (454/454) ✓ antes de cada commit;
`node scripts/asignar-grupos-evidencia.mjs` ✓ (grupos canónicos asignados a todas las citas nuevas).
