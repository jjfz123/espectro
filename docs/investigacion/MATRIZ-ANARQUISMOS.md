# Matriz de anarquismos — dosier de investigación

**Fecha del dosier:** 12 de julio de 2026
**Corte documental del dataset auditado:** 2026-07-11 (`data/version.json`: versionInstrumento 4, hashSemantico b7f674a480d095bf)
**Ámbito:** tipos ideales doctrinales para el atlas ideológico de Espectro (VAA español). No son candidaturas electorales ni etiquetas personales.
**Encargo:** contrastar 12 corrientes anarquistas en 7 dimensiones y decidir, con la vara de «discriminación real», qué merece **ficha** propia y qué es **faceta**.
**Naturaleza:** SOLO LECTURA sobre los datos. Este fichero es el único entregable. No modifica `data/`, `web/`, `tests/` ni `docs/` existentes.

> **AVISO CRÍTICO DE MÉTODO — leer antes que nada.** En esta sesión la **política de egress bloquea TODO host externo** (proxy responde 403 a `marxists.org`, `es.anarchistlibraries.net`, `es.theanarchistlibrary.org`, `omegalfa.es`, `portaloaca.com`, `gutenberg.org`, `plato.stanford.edu`, `wikipedia.org`, `archive.org`, `cnt.es`…). Solo `WebSearch` funciona (devuelve títulos y URLs, no texto fiable verbatim). **No he podido verificar que responda NINGUNA URL externa, ni extraer ningún pasaje nuevo de fuente primaria.** En consecuencia:
> - Los **únicos pasajes verbatim en español que se presentan como cita** son los que **ya están verificados y almacenados en el repositorio** (`data/referencias/*.json`), cotejados en sesiones anteriores.
> - Todo pasaje que exigiría abrir un archivo externo se declara **HUECO** y se manda a la **cola de verificación humana (§6)**, con su URL-objetivo. No se transcribe ningún resumen de buscador como si fuera cita: la regla de la casa dice que *un pasaje inventado o mal atribuido es peor que un hueco*, y aquí se cumple a rajatabla.
> - Esto NO es pereza: es la aplicación estricta de los «silencios deliberados» de `docs/investigacion/anarquismos-referencias.md` («no añadir una posición porque suena anarquista: exigir fuente doctrinal primaria»).

---

## 0. Contexto, base y relación con lo ya hecho

- **Base declarada del encargo:** HEAD `b8a29b5`. **Discrepancia:** el worktree arranca en `c42e406` y `b8a29b5` **no es ancestro** de ese HEAD (ramas divergentes). No afecta al encargo (solo lectura de datos y un fichero nuevo). El trabajo del integrador sobre felipismo/derecha no se toca ni se cita.
- **Trabajo previo que este dosier extiende:** `docs/investigacion/anarquismos-referencias.md` (9-jul-2026) fijó la decisión original de **4 referencias** (anarcocomunismo, anarcosindicalismo AIT, mutualismo, individualismo tuckeriano). El dataset ha crecido desde entonces a **11 referencias libertarias** y el mapa anticipa varias más en investigación. Este dosier audita ese estado ampliado y aplica la vara de discriminación a las 12 corrientes del encargo.
- **Reglas de la casa que gobiernan las propuestas** (de `anarquismos-referencias.md` y `AGENTS.md`): no copiar posiciones entre referencias; una coincidencia se justifica de forma independiente; un mismo pasaje no sostiene dos posiciones del mismo eje; género, religión, aborto, nuclear **no** se rellenan por herencia doctrinal, exigen fuente explícita; el `0` es una posición documentada, no un hueco.

---

## 1. Auditoría de lo existente

### 1.1 Referencias doctrinales anarquistas ya instrumentadas (`data/referencias/`)

| Referencia (fichero) | Corriente del encargo | Confianza / v | Posiciones | Citas **verbatim ES** | Ítems cubiertos (muestra) | Calidad |
|---|---|---|---|---|---|---|
| `anarcocomunismo` | Anarcocomunismo | verificada 1.1 | 24 | 0 (5 citas, en inglés) | izq-016, izq-042, lab-008/016/017, dem-011/013/019, soc-006, ter-001 | Alta; corpus Kropotkin en inglés |
| `anarquismo-colectivista-bakuninista` | Colectivismo bakuninista | verificada 1.0 | 31 | 0 | izq-001/002/007/016, lab-005/006/011, dem-034/035 | Alta cobertura, **sin verbatim** |
| `anarcosindicalismo` | Anarcosindicalismo | verificada 1.1 | 31 | **3** (CNT Zaragoza 1936) + 5 en inglés (Rocker) | izq-016/042, lab-017/018/026, dem-034/035, geo-003 | Alta; **2 pasajes ES oro** |
| `plataformismo-anarcocomunista` | Plataformismo/especifismo | verificada 1.0 | 33 | 0 (1 cita, en inglés) | izq-001/002/003/017, lab-014/015, dem-015 | Alta cobertura; verbatim en inglés |
| `mutualismo-proudhoniano` | Mutualismo | verificada 1.1 | 27 | 0 (7 citas, en inglés) | eco-001, dr-001, izq-032, lab-011/012, dem-034/035, soc-003 | Alta; corpus Proudhon en inglés |
| `anarquismo-individualista` | Individualismo (tuckeriano) | verificada 1.1 | 31 | 0 (9 citas, en inglés) | lib-002/007/008/009, lab-010, eco-003, izq-039 | Alta; corpus Tucker/Spooner en inglés |
| `anarcopacifismo-tolstoyano` | Anarcopacifismo | verificada 1.0 | 33 | 0 | def-001/002, geo-001..014, dr-025, lim-006, sd-002/003 | Alta cobertura, **sin verbatim** |
| `comunalismo-bookchiniano` | (rama de ecoanarquismo) | verificada 1.0 | 11 | 0 | dem-001/002/013/017, izq-037/038/039 | Media; escueta, sin verbatim |
| `anarcofeminismo` | Anarcofeminismo | verificada 1.0 | 7 | **7** (Goldman + Mujeres Libres) | izq-014, lab-010/011/017, soc-001/006, fem-012 | **No publicable** (falta 4.ª ancla económica) |
| `anarquismo-queer` | Anarquismo queer | verificada 1.0 | 5 | 1 (CNT) + 4 en inglés | izq-014, soc-001/006, fem-001, lab-010 | **No publicable** (1 sola ancla económica) |
| `anarquismo-sin-adjetivos` | (síntesis hispana) | verificada 1.0 | 3 | 3 **descriptores, no verbatim** | izq-003/007, dem-019 | Baja: las «citas» son resúmenes de sección |
| `anarcocapitalismo-rothbardiano` | (fuera: no es anarquismo de izquierda) | verificada 1.1 | 31 | 0 | — | En familia `libertarismos`, no `anarquismos` |

**Notas de calidad:** el grueso de las fichas ricas cita corpus **en inglés** (Kropotkin, Proudhon, Tucker, Spooner, Rocker, Dielo Truda). Los **únicos verbatim en español** verificados en el repo son (a) el **Dictamen de Zaragoza de la CNT (mayo 1936)** en `anarcosindicalismo` y (b) las **traducciones de Emma Goldman y el testimonio de Mujeres Libres** en `anarcofeminismo`. La ficha `anarquismo-sin-adjetivos` presenta como `cita` textos que son **descripciones de sección** («Sección "La anarquía": describe una sociedad sin gobiernos ni gobernados»), que por la vara de la casa son **calidad baja** (no son pasajes literales).

### 1.2 Taxonomía del propietario (`data/mapa-ideologias.json`, familia `anarquismos`, e `inventario-ideologias-imagen.json`)

El mapa ya anticipa TODAS las corrientes del encargo y marca su estado. Esto es la intención editorial de fondo:

| Corriente (id de mapa) | Estado | Capa | Ficha | Discriminantes declarados | Nota del propietario (encaje) |
|---|---|---|---|---|---|
| `anarcocomunismo` | instrumentada | region | sí | izq-007, izq-043, lab-017 | Corriente central de la historia libertaria española |
| `anarquismo-colectivista` | instrumentada | region | sí | izq-007, lab-017, lab-006 | Retribución remunerada la separa del comunismo |
| `anarcosindicalismo` | instrumentada | region | sí | izq-008, lab-018, lab-026 | — |
| `plataformismo` | instrumentada | region | sí | izq-003, izq-007, dem-015 | «Falta un ítem directo de responsabilidad colectiva» |
| `mutualismo` | instrumentada | region | sí | izq-032, lab-017, izq-038 | — |
| `anarquismo-individualista` | instrumentada | region | sí | izq-007, izq-039, lab-010 | «El individualismo stirneriano nunca arraigó» en España |
| `anarcopacifismo` | instrumentada | region | sí | dr-025, izq-040, izq-007 | — |
| `comunalismo` | instrumentada | region | sí | izq-038, dem-034/035 | Cubre **una** rama del ecoanarquismo (Bookchin) |
| `anarquismo-sin-adjetivos` | instrumentada | region | sí | izq-007, izq-003, dem-019 | Síntesis, no vector único |
| `socialismo-libertario` | informativa | faceta | **no** | izq-007, lab-017, dem-017 | **Nodo de familia**, no compite con sus ramas |
| `ecoanarquismo` | informativa | region | **no** | ene-010, izq-038, ene-012 | «No debe duplicar a Bookchin ni al decrecimiento» |
| `anarcofeminismo` | investigacion | region | (existe, **no cableada**) | izq-007, fem-010, fem-011 | «Faltan preguntas sobre poder doméstico no estatal» |
| `anarquismo-queer` | investigacion | region | (existe, **no cableada**) | izq-007, fem-010, soc-001 | «Requiere módulo y fuentes propios» |
| `egoismo-anarquista` | investigacion | region | **no** | izq-007, lab-010, izq-039 | «No debe heredar la economía tuckeriana» |
| `anarcoprimitivismo` | investigacion | region | **no** | ene-010, va-016, ene-011 | **«Falta un ítem directo sobre desmantelar la civilización industrial»** |
| `anarquismo-religioso` | investigacion | faceta | **no** | izq-007, rel-003, rel-002 | «Religión no implica confesionalidad; libertad de conciencia explícita» |
| `ilegalismo-anarquista` | investigacion | faceta | **no** | izq-042, dr-025, lab-010 | **«Contexto histórico y táctico, nunca identidad»** |

**Inconsistencia detectada:** `anarcofeminismo` y `anarquismo-queer` **tienen ficha** en `data/referencias/` pero el mapa las marca `SIN-FICHA` (no cableado `referenciaId`). Hay que reconciliarlo (cablear o degradar). Es un hueco de integración, no doctrinal.

### 1.3 El banco de ítems por las 7 dimensiones de contraste (`data/items/`, 392 ítems)

| Dimensión | Ítems del banco relevantes (muestra) |
|---|---|
| **1. Propiedad / intercambio** | lab-008, lab-010, lab-012, lab-016, lab-017, izq-016, izq-032, izq-042, eco-001, eco-007, der-001, dr-001, lab-003* |
| **2. Organización** | izq-002, izq-035*, izq-037, izq-039, dem-015, dem-016*, dem-018, lab-018, lab-026, lab-028*, lab-029*, lab-030*, lim-001 |
| **3. Sujeto de cambio** | izq-001, izq-003, izq-007, izq-008, izq-031, dem-019, lab-018 |
| **4. Violencia** | dr-025, lim-002, lim-003, lim-006, izq-040, izq-042, soc-006, def-001, def-002 |
| **5. Tecnología / ecología** | ene-010, ene-011, ene-012, va-005*, va-006*, va-007*, va-008, va-009*, va-011*, va-016, izq-045, izq-027 |
| **6. Género** | fem-001, fem-003*, fem-004*, sd-015*, soc-001, fem-012, izq-014, fem-010 |
| **7. Religión** | rel-001, rel-002, rel-003, lai-001, fem-008*, fem-009, fem-013, sd-014* |

(*) marcados = **ítems huérfanos** (ninguna referencia, partido ni sindicato los usa hoy; ver 1.4).

### 1.4 Ítems huérfanos relevantes — comprobación y ampliación

Cruzados **todos** los `data/referencias/*.json`, `data/partidos/*.json` y `data/sindicatos/*.json`: de 392 ítems, **314 tienen alguna posición y 78 están huérfanos**. Confirmo los que citaba el encargo y **amplío** la lista con hallazgos propios (todos con enunciado literal comprobado):

**Confirmados del encargo (huérfanos hoy):**

| Ítem | Enunciado (verbatim del banco) | Dimensión que discrimina |
|---|---|---|
| lab-028 | «En el sistema actual, sería legítimo que el Estado prohibiera los sindicatos independientes del poder político.» | Organización (todo anarquismo −2; separa del autoritarismo, poco intra-familia) |
| lab-029 | «En la sociedad que defiendo, los sindicatos dejarían de tener sentido y desaparecerían.» | **Organización — discriminante fuerte** (anarcosindicalismo −2 vs anarcocomunismo +1/+2) |
| lab-030 | «Desaparecerían porque la autoorganización directa y horizontal haría innecesaria cualquier estructura sindical permanente.» | **Organización — razón** (mismo eje que lab-029) |
| va-006 | «La protección del paisaje y del territorio rural debe poder frenar grandes proyectos de parques eólicos y solares.» | **Tec./ecología** (primitivismo/eco-profunda +2 vs anarquismos productivistas −1) |
| va-009 | «Debe gravarse con impuestos el consumo de carne para reducir su impacto ambiental.» | Tec./ecología (impuesto estatal choca con antiestatismo; matiz) |
| va-011 | «Especies como el lobo deben seguir estrictamente protegidas aunque causen pérdidas a la ganadería extensiva.» | Tec./ecología (ecocentrismo) |
| fem-003 | «La prostitución ejercida voluntariamente entre personas adultas debe regularse como un trabajo con derechos laborales y cotización.» | **Género — discriminante** (individualista +2 vs anarcofeminismo **en disenso** vs tolstoyano −) |
| fem-004 | «La ley debe sancionar con multas a quienes paguen por mantener relaciones sexuales.» | Género (modelo abolicionista sueco; anti-individualista) |
| sd-014 | «España debería poner fin a los Acuerdos de 1979 con la Santa Sede.» | **Religión** (todo anarquismo secular +2; matiz en religioso) |
| sd-015 | «Quienes pagan por servicios sexuales deberían ser sancionados por la ley.» | Género (duplica fem-004) |

**Huérfanos NO citados en el encargo, que AÑADO por su valor discriminante:**

| Ítem | Enunciado (verbatim) | Por qué importa |
|---|---|---|
| izq-035 | «Los cargos electos de la izquierda deberían limitarse a ejecutar lo que decidan sus asambleas de base, sin margen para decidir por su cuenta.» | **Prefiguración / mandato imperativo** — el mejor sustituto real del inexistente izq-048 |
| dem-016 | «Una parte de las cámaras legislativas debería escogerse por sorteo entre la ciudadanía.» | Organización (sorteo vs representación) |
| izq-033 | «Los sindicatos deberían renunciar a las subvenciones públicas y financiarse únicamente con las cuotas de sus afiliados.» | Autonomía sindical (variante AIT anti-subvención) |
| fem-008 | «La asignatura de religión confesional debe salir del horario lectivo de la escuela pública.» | **Religión** (laicismo; duplica lai-001) |
| fem-013 | «El Código Penal debería dejar de castigar la ofensa a los sentimientos religiosos.» | **Religión** (librepensamiento/blasfemia) |
| va-005 | «Alargar la vida de las centrales nucleares es razonable como energía de transición…» | Tec./ecología (nuclear; silencio deliberado hoy) |
| va-007 | «…los países ricos deben reducir su producción y su consumo aunque el PIB deje de crecer.» | Tec./ecología (decrecimiento; primitivismo lo desborda) |
| lab-003 | «La dirección de una empresa debe corresponder a sus propietarios y gestores, no a órganos elegidos por la plantilla.» | Propiedad/poder-laboral (negativo para todo anarquismo) |

**HALLAZGO DE DISCREPANCIA (importante):** el encargo cita como huérfanos **izq-048 (prefiguración)** y **cul-015 / cul-016 (aceleración tecnológica vs vida de pueblo)**. **Esos ítems NO EXISTEN en el worktree** (el máximo real es `izq-046` y `cul-014`). No están huérfanos: están **ausentes**. Probablemente pertenecen a otra rama o son ítems planeados aún no creados. Consecuencia operativa: la dimensión **prefiguración** se cubre parcialmente con `izq-035`/`izq-037`; la dimensión **aceleración tecnológica vs vida de pueblo** **no tiene ítem** y motiva la propuesta de ítem nuevo (§5). Se detalla en §7.

---

## 2. Matriz 12 × 7

Posición doctrinal característica de cada corriente en cada dimensión (una frase). **Fuente entre paréntesis**; `[repo]` = respaldada por pasaje verbatim ya verificado en el repo; `[cola]` = atribución doctrinal estándar cuyo verbatim está pendiente de cotejo (§6) por el bloqueo de egress.

### 2.1 Tabla sinóptica (celdas terse)

| Corriente | Propiedad/interc. | Organización | Sujeto de cambio | Violencia | Tec./ecología | Género | Religión |
|---|---|---|---|---|---|---|---|
| **1. Anarcocomunismo** | Comunismo de bienes; sin salario ni propiedad; «según la necesidad» | Comunas y federaciones libres; sin partido | Iniciativa directa de comunas; expropiación popular | Revolución social; violencia defensiva, no terror | Tecnófilo: integra industria y agro (Campos, fábricas y talleres) | Amor libre; emancipación como fin | Ateísmo/anticlericalismo, sin coacción |
| **2. Colectivismo bakuninista** | Colectiviza medios; **retribuye SEGÚN EL TRABAJO** | Asociaciones obreras + **minoría organizada (Alianza)** | Insurrección de masas; destruir el Estado | **Insurreccionalismo** («destruir es crear») | Industrialista; contra el «gobierno de sabios» | Igualdad de sexos; abolir familia jurídica y herencia | **Ateísmo militante** («si Dios existiera…») |
| **3. Anarcosindicalismo** | Socializa la riqueza; los productores administran | **El SINDICATO es la estructura**; no desaparece: administra | Clase organizada; **huelga general**, no parlamento | Acción directa; huelga expropiadora | Industrialista; gestión obrera | Igualdad; entorno de Mujeres Libres | Anticlericalismo; suprimir la Iglesia-poder |
| **4. Plataformismo/especifismo** | Comunista-libertario (hereda anarcocomunismo) | **Organización específica: unidad táctica + responsabilidad colectiva** | La organización orienta la lucha; ni espontaneísmo ni vanguardia | Revolución social; defensa organizada | Industrialista (heredado) | Igualdad (heredado) | Ateísmo/anticlericalismo (heredado) |
| **5. Mutualismo** | **Mantiene MERCADO**; posesión por uso; crédito mutuo | Federación contractual de asociaciones | **Reforma gradual** por crédito y asociación | Reformista/pacifista relativo | Productivismo artesano-industrial | **Punto negro histórico: misoginia de Proudhon** | Antiteológico, anticlerical |
| **6. Individualismo / egoísmo** | Mercado libre y posesión (Tucker) / **propiedad = poder, no derecho (Stirner)** | Asociación voluntaria; **«Unión de egoístas» disoluble**; sin líderes | **EL INDIVIDUO**: insurrección del yo, no revolución | Autodefensa; egoísmo rechaza el deber de no-violencia | Indiferente / tecnófilo | Autonomía individual; amor libre | **Egoísmo: rechazo de TODO lo «sagrado», incluida la moral** |
| **7. Anarcopacifismo** | Propiedad = violencia; uso comunitario | Comunidades voluntarias; no cooperación con el Estado | Conversión moral + objeción + desobediencia civil | **NO VIOLENCIA ABSOLUTA** (no resistencia por la fuerza) | Vida sencilla, agraria, anti-lujo | Conservador en sexualidad (matiz tolstoyano) | **Cristianismo evangélico anti-eclesial** (el Reino sin Iglesia ni Estado) |
| **8. Anarquismo religioso/cristiano** | Comunidad de bienes cristiana; contra la acumulación | Comunidades de fe autónomas; personalismo | Conversión ética + acción directa no violenta | Mayormente no violencia (rama tolstoyana) | Sencillez; distributismo agrario | Variable; conservador en rama tolstoyana | **Antiautoritarismo DESDE la fe; se opone al ateísmo de Estado** |
| **9. Ecoanarquismo (ecología social)** | Comunización de recursos; post-escasez | **Municipalismo libertario**: asambleas confederadas | El «pueblo» en asamblea municipal (ciudadanía, no solo clase) | Confrontación con el Estado; defensa | **La jerarquía social es raíz de la crisis; tecnología liberadora racional** (NO anti-técnica) | Fin de toda jerarquía, incluida la de género | Naturalismo secular; crítica al misticismo de la ecología profunda |
| **10. Anarcofeminismo / queer** | Anticapitalista; crítica de la familia como institución económica | Autoorganización de mujeres/disidencia (Mujeres Libres) | **Género/sexualidad como eje CO-PRIMARIO**, no secundario a la clase | Acción directa; autodefensa; rama Bash Back! insurreccional | Variable | **Patriarcado como sistema; amor libre; queer: guerra a la identidad fija. DISENSO sobre trabajo sexual** | Anticlerical; crítica de la moral religiosa sobre el cuerpo |
| **11. Primitivismo** | Sin propiedad; abundancia cazadora-recolectora sin acumulación | Bandas/comunidades cara a cara; sin instituciones | **Ruptura con la civilización misma** (rewilding), no la clase | Rama insurreccional/sabotaje; Zerzan ambiguo | **RECHAZO DE LA CIVILIZACIÓN INDUSTRIAL: agricultura, domesticación, división del trabajo, tecnología** | La domesticación como origen del patriarcado | Crítica del lenguaje simbólico, el tiempo y la religión como alienación |
| **12. Ilegalismo** | **Reapropiación individual: robo/expropiación como ruptura inmediata** | Grupos de afinidad reducidos; hostil a organizaciones formales | El individuo en guerra con la sociedad **ahora** | **Legitima el acto ilegal/violento individual** (opuesto al anarcopacifismo) | Indiferente | Amor libre (herencia individualista) | Amoralismo (herencia stirneriana) |

### 2.2 Fuentes que sostienen cada fila (una línea por corriente)

1. **Anarcocomunismo** — Kropotkin, *La conquista del pan* (1892) y *El Estado: su papel histórico* (1896) `[repo, en inglés]`; para género, Goldman `[repo, ES]`.
2. **Colectivismo bakuninista** — Bakunin, *Dios y el Estado*, *Catecismo revolucionario*, *Estatismo y anarquía*; Guillaume, *Ideas sobre la organización social* `[cola]`.
3. **Anarcosindicalismo** — **CNT, Dictamen del Congreso de Zaragoza (mayo 1936)** `[repo, ES]`; Rocker, *Anarcosindicalismo* (1938) `[repo, en inglés]`; Estatutos AIT 2022 `[repo]`.
4. **Plataformismo/especifismo** — Dielo Truda, *Plataforma organizativa* (1926, Archinov/Majno) `[repo, en inglés]`; especifismo: FAU/tradición latinoamericana `[cola]`.
5. **Mutualismo** — Proudhon, *¿Qué es la propiedad?* (1840), *Idea general de la revolución* (1851), *El principio federativo* (1863) `[repo, en inglés]`.
6. **Individualismo/egoísmo** — Tucker, *Instead of a Book* (1897), Spooner `[repo, en inglés]`; **Stirner, *El único y su propiedad* (1845)** `[cola]`.
7. **Anarcopacifismo** — Tolstói, *El Reino de Dios está en vosotros* (1894), *La ley de la violencia y la ley del amor* (1908) `[repo, marco]`.
8. **Anarquismo religioso/cristiano** — Tolstói `[repo, marco]`; Dorothy Day / Catholic Worker; Adin Ballou `[cola]`.
9. **Ecoanarquismo/ecología social** — Bookchin, *La ecología de la libertad*, *El municipalismo libertario* (comunalismo `[repo]`); Reclus `[cola]`.
10. **Anarcofeminismo/queer** — **Goldman** (*Anarquismo…*, *La tragedia de la emancipación…*, *Matrimonio y amor*) y **Mujeres Libres** (Nash) `[repo, ES]`; queer: Against Equality, Bash Back!, artículo CNT `[repo, mixto]`.
11. **Primitivismo** — Zerzan, *Futuro primitivo* (1994) `[cola]`.
12. **Ilegalismo** — praxis de Marius Jacob y la banda Bonnot; base filosófica individualista/stirneriana `[cola]`.

---

## 3. Veredicto por corriente (vara: ¿discriminación real en las 7 dimensiones?)

Criterio operativo: una corriente merece **FICHA** si produce un perfil de respuestas **distinto** de sus hermanas en al menos una de las 7 dimensiones, ese contraste es **instrumentable** con ítems (existentes o proponibles) y tiene **corpus citable**. Si su aporte se reduce a heredar otra ficha con un matiz, es **FACETA** (se documenta dentro de la ficha madre).

| # | Corriente | Veredicto | Dimensión(es) donde discrimina | Se documenta en |
|---|---|---|---|---|
| 1 | Anarcocomunismo | **FICHA** (confirmar; existe) | Propiedad (comunismo puro sin salario) | ficha propia |
| 2 | Colectivismo bakuninista | **FICHA** (confirmar; existe) | Propiedad (retribución según trabajo) + violencia (insurreccionalismo) | ficha propia |
| 3 | Anarcosindicalismo | **FICHA** (confirmar; existe) | Organización (el sindicato como estructura permanente) + sujeto (huelga general) | ficha propia |
| 4 | Plataformismo/especifismo | **FICHA** (confirmar; existe) | **Solo organización** (responsabilidad colectiva, unidad táctica) | ficha propia; requiere ítem nuevo (§5) |
| 5 | Mutualismo | **FICHA** (confirmar; existe) | Propiedad/intercambio (mantiene mercado) | ficha propia |
| 6a | Individualismo tuckeriano | **FICHA** (confirmar; existe) | Propiedad (mercado + posesión) + fiscalidad por consentimiento | ficha propia |
| 6b | Egoísmo stirneriano | **FACETA** (borde) | Religión/moral (rechazo de lo «sagrado») + justificación de la propiedad (poder, no derecho) | dentro de `anarquismo-individualista`, como variante; puerta a ficha si se añade ítem moral (§5) |
| 7 | Anarcopacifismo | **FICHA** (confirmar; existe) | Violencia (no violencia absoluta) — dimensión entera | ficha propia |
| 8 | Anarquismo religioso/cristiano | **FACETA** | Religión (antiautoritarismo desde la fe; contra el ateísmo de Estado) | dentro de `anarcopacifismo-tolstoyano` (rama cristiana) + nota de dimensión religión |
| 9a | Ecoanarquismo general | **FACETA** | Tec./ecología (pero ya cubierta) | dentro de `comunalismo-bookchiniano` + `decrecimiento-democratico` |
| 9b | Primitivismo | **FICHA** (nueva; **bloqueada** hasta ítem) | Tec./ecología en el extremo (desmantelar la civilización industrial) | ficha propia nueva; requiere ítem nuevo (§5) |
| 10a | Anarcofeminismo | **FICHA** (reforzar hasta publicable; existe) | Género (co-primacía del patriarcado) | ficha propia; fuerte anclaje español (Mujeres Libres) |
| 10b | Anarquismo queer | **FICHA condicionada** | Género/sexualidad (guerra a la identidad; crítica del matrimonio-asimilación) | ficha propia en investigación; degradar a faceta de anarcofeminismo si no aparece corpus **español** |
| 11 | Primitivismo | (ver 9b) | — | — |
| 12 | Ilegalismo | **FACETA** | Propiedad (reapropiación individual) + violencia (acto ilegal legítimo) | dentro de `anarquismo-individualista` como contexto histórico-táctico; **nunca identidad** |

**Justificaciones (2-3 frases cada una):**

1. **Anarcocomunismo — FICHA.** Discrimina limpiamente en propiedad: comunismo de bienes «según la necesidad» sin salario, frente al colectivismo (que remunera el trabajo) y al mutualismo (que conserva mercado). Ya instrumentada con 24 posiciones de alta calidad. Confirmar.

2. **Colectivismo bakuninista — FICHA.** Su discriminación es **estrecha pero limpia**: comparte casi todo con el anarcocomunismo salvo (a) la retribución **según el trabajo** —no según la necesidad— y (b) un insurreccionalismo con minoría organizada (la Alianza). Ambos rasgos son instrumentables (izq-016, lab-017, izq-032, lim-002). Confirmar; mantener la advertencia de que la diferencia es de distribución y método, no de todo el perfil.

3. **Anarcosindicalismo — FICHA.** Discriminación **fuerte** en organización y sujeto: el sindicato no es un instrumento entre otros, es **la** estructura de lucha y de la sociedad futura (no desaparece: administra), y la palanca es la huelga general, no el parlamento. Máxima relevancia española (tradición CNT) y con verbatim ES en el repo. Confirmar.

4. **Plataformismo/especifismo — FICHA (con reserva).** Su economía y su horizonte son los del anarcocomunismo; **toda** su discriminación se concentra en **una** dimensión, la organización (unidad teórica/táctica, responsabilidad colectiva, ejecución común). El documento previo de la casa proponía tratarla como faceta organizativa; hoy tiene ficha con 33 posiciones, pero **le falta el ítem que capture su rasgo definitorio** (responsabilidad colectiva, §5). Sin ese ítem, es casi indistinguible del anarcocomunismo pregunta a pregunta.

5. **Mutualismo — FICHA.** Discriminación limpia y fuerte en propiedad/intercambio: es el único socialismo anarquista **de mercado** (posesión por uso, crédito mutuo, intercambio recíproco), lo que lo separa de toda la rama comunista. Confirmar.

6a. **Individualismo tuckeriano — FICHA.** Discrimina en propiedad (mercado liberado + posesión por ocupación y uso) y en la objeción **de consentimiento** a la fiscalidad, con corpus propio (Tucker, Spooner). Confirmar; no es anarcocapitalismo (Tucker se decía socialista) ni hereda el vector rothbardiano.

6b. **Egoísmo stirneriano — FACETA (borde).** Añade discriminación real pero **acotada**: rechaza lo «sagrado» (moral, derechos, humanismo como «espectros») y funda la propiedad en el poder, no en un derecho natural —lo que lo separa del sistema de derechos de Tucker—. Pero comparte con el individualismo el resto del perfil y, sobre todo, **carece de arraigo español** (nota del propietario: «nunca arraigó»). Recomiendo documentarlo como variante dentro de `anarquismo-individualista`; solo ascendería a ficha si se instrumenta su discriminante moral con un ítem propio (§5) y aparece corpus español citable.

7. **Anarcopacifismo — FICHA.** Discrimina en una **dimensión entera**, la violencia: no violencia absoluta, no resistencia al mal por la fuerza, disolución de ejércitos (dr-025, izq-040, lim-002/003/006). Es el contrapunto exacto del ilegalismo/insurreccionalismo. Confirmar.

8. **Anarquismo religioso/cristiano — FACETA.** Su discriminante propio es el eje religión: antiautoritarismo **desde** la fe, que se opondría a un ateísmo de Estado (rel-001 −2) a diferencia del anarquismo secular. Pero su formulación con corpus disponible es **tolstoyana**, y esa rama ya está fichada como `anarcopacifismo-tolstoyano` (que **es** anarquismo cristiano). Un «anarquismo religioso» general sin pacifismo (Catholic Worker, ramas no cristianas) carece de corpus español citable. Documentar como faceta dentro de la ficha tolstoyana + nota de dimensión religión.

9a. **Ecoanarquismo general — FACETA.** Su contenido (crisis ecológica ligada a jerarquía; comunidades descentralizadas sostenibles) lo cubren ya `comunalismo-bookchiniano` (ecología social) y `decrecimiento-democratico`. Como advierte el propietario, un «ecoanarquismo general» **duplicaría** a Bookchin y al decrecimiento sin añadir discriminación. Es un nodo de familia, no una ficha.

9b/11. **Primitivismo — FICHA (nueva, bloqueada).** Es la **única** corriente que discrimina en el extremo de la dimensión tec./ecología: no reduce la sociedad industrial (decrecimiento) ni la racionaliza (Bookchin), sino que **rechaza la civilización industrial, la agricultura, la domesticación y la técnica**. Discriminación real y máxima frente a TODAS sus hermanas. Pero —nota exacta del propietario— **«límites al crecimiento y energías limpias no bastan»**: sin un ítem directo sobre desmantelar la civilización industrial (§5), no se distingue del decrecimiento y no debe publicarse.

10a. **Anarcofeminismo — FICHA (reforzar).** Discrimina en una dimensión entera, el género: patriarcado como eje **co-primario** de dominación (no distracción de la lucha de clases), amor libre, autonomía reproductiva, y una crítica de la moral religiosa sobre el cuerpo. Anclaje español de primer orden (**Mujeres Libres**, 1936-1939). Ya tiene ficha con verbatim ES, pero es **no publicable** por falta de la 4.ª ancla económica; el trabajo pendiente es reforzarla, no crearla.

10b. **Anarquismo queer — FICHA condicionada.** Discrimina en género/sexualidad (rechazo de la identidad fija; crítica del matrimonio —incluido el igualitario— como asimilación). Pero su corpus es **angloamericano** con recepción española fina (un solo pasaje ES, el artículo de CNT) y su eje económico es insuficiente para publicar. Mantener en investigación; si no aparece corpus español propio, degradar a faceta de anarcofeminismo.

12. **Ilegalismo — FACETA.** Es una **táctica** (reapropiación individual: robo, expropiación, falsificación) montada sobre la filosofía individualista/egoísta; discrimina solo en propiedad (expropiación individual legítima) y violencia (acto ilegal legítimo), heredando de la ficha individualista el resto. Como fija el propietario, es «contexto histórico y táctico, **nunca identidad**». Faceta dentro de `anarquismo-individualista`.

---

## 4. Posiciones propuestas sobre ítems existentes

Formato por posición: **ítem** · valor propuesto (−2..+2) · justificación · **pasaje verbatim ES** o **HUECO** · fuente. Regla aplicada: no reutilizar un pasaje para dos posiciones del mismo eje; género/religión no se rellenan por herencia. Por el bloqueo de egress, casi todo verbatim externo es **HUECO** (cola §6); se marca `[repo]` cuando el pasaje ya está verificado en el repositorio.

### 4.A Primitivismo — ficha nueva (7 posiciones)

Corpus objetivo: **John Zerzan, *Futuro primitivo y otros ensayos*** (ed. esp. 2001) — **bloqueado en esta sesión**, cola §6.

| Ítem | Valor | Justificación | Pasaje |
|---|---|---|---|
| ene-010 (reducir producción/consumo para límites ecológicos) | **+2** | El primitivismo desborda el decrecimiento: no solo reducir, sino desmantelar; suscribe con creces la reducción. | **HUECO** — target: Zerzan, *Futuro primitivo*, crítica de la producción. |
| ene-011 (crecimiento verde por innovación) | **−2** | Niega frontalmente que la innovación tecnológica desacople crecimiento e impacto: la técnica **es** el problema. | **HUECO** — target: Zerzan, *El ocaso de las máquinas* / *Futuro primitivo*. |
| va-016 (autorizar transgénicos y edición genética) | **−2** | La biotecnología es la culminación de la domesticación que el primitivismo combate desde la agricultura. | **HUECO** — target: Zerzan, ensayo sobre agricultura/domesticación. |
| va-008 (innovación y mercado lideran el clima, no los límites) | **−2** | Solución tecnocrática: exactamente lo que el primitivismo denuncia como huida hacia adelante. | **HUECO** — target: Zerzan. |
| va-006 (proteger paisaje/territorio puede frenar eólica y solar) | **+2** | Incluso las renovables son gran infraestructura industrial; el primitivismo prioriza lo salvaje sobre cualquier megaproyecto. | **HUECO** — target: green anarchism/Zerzan. |
| izq-045 (producir y consumir menos, renunciar al crecimiento) | **+2** | Coincide en la dirección, aunque su horizonte va más allá del marco «de izquierda» del ítem. | **HUECO** — target: Zerzan. |
| **[ítem nuevo §5: desmantelar la civilización industrial]** | **+2** | Es el rasgo definitorio y el discriminante que lo separa del decrecimiento; sin este ítem la ficha no debe publicarse. | **HUECO** hasta crear el ítem. |

> Nota: la ficha de primitivismo **no debe** heredar posiciones de género/religión por deducción. Zerzan tiene tesis propias (domesticación → patriarcado; lenguaje/tiempo → alienación), pero exigen pasaje explícito (cola §6). Hasta entonces, silencio, no cero.

### 4.B Anarcofeminismo — refuerzo hasta publicable (5 posiciones)

La ficha existe con 7 posiciones y **verbatim ES de Goldman/Mujeres Libres ya en el repo**. Es **no publicable** por «falta la 4.ª ancla económica (demandas laborales verbatim de la revista *Mujeres Libres*)». Prioridad = cerrar el eje económico y añadir el eje religión.

| Ítem | Valor | Justificación | Pasaje |
|---|---|---|---|
| lab-008 (consejos de trabajo dirigen la producción) | **+2** | 4.ª ancla económica buscada: la autogestión productiva obrera, sin dirección ministerial ni patronal. | **HUECO** — target: revista *Mujeres Libres* (1936-1938), demandas laborales; o Goldman, *Anarquismo…* (pasaje distinto del ya usado en lab-010/lab-017). |
| fem-008 / lai-001 (religión confesional fuera del horario lectivo) | **+2** | La tríada goldmaniana libera «la mente del dominio de la religión»: laicismo escolar coherente. | `[repo]` disponible pero **ya usado** para lab-010 en eje económico; para el eje **laicismo** hay que extraer **pasaje distinto** de la misma obra → **HUECO** (cola). |
| sd-014 (fin de los Acuerdos con la Santa Sede) | **+2** | Anticlericalismo estructural: ningún privilegio institucional de la Iglesia. | **HUECO** — target: Goldman / prensa confederal, pasaje anticlerical explícito. |
| fem-003 (prostitución como trabajo con derechos) | **SIN POSICIÓN (declarada)** | La propia ficha lo prohíbe: «el disenso interno documentado sobre el trabajo sexual impide codificar posiciones sobre prostitución». Codificarla sería inventar consenso donde hay disputa. | **No se propone.** Es un **no-dato deliberado**, no un hueco por falta de fuente. |
| soc-001 (derechos LGTB y matrimonio igualitario protegidos) | **+1** (ya en ficha) | Se mantiene; matiz de desconfianza al matrimonio como institución estatal-económica. | `[repo]` — Goldman, *Matrimonio y amor*: «El matrimonio es ante todo un arreglo económico…». |

### 4.C Anarquismo queer — condicionada (3 posiciones, todas dependientes de corpus español)

| Ítem | Valor | Justificación | Pasaje |
|---|---|---|---|
| soc-001 (matrimonio igualitario protegido por ley) | **+1** | Defiende a las personas LGTB pero critica el matrimonio-asimilación (también el igualitario); disenso interno declarado. | `[repo]` pero el pasaje es de Yasmin Nair **en inglés**; el discriminante español está en el artículo de CNT. **HUECO** para verbatim ES sustantivo. |
| fem-001 (autodeterminación registral sin informes) | **+1** | «Guerra a la identidad fija» → sobran informes; recelo al registro estatal impide el +2. | `[repo]` en inglés (Bash Back!). **HUECO** para recepción española. |
| lab-008 / eco económico | **?** | Su eje económico está en investigación (1 sola ancla). No propongo valor sin fuente. | **HUECO** — target: *Queering Anarchism* (AK Press, 2012), lectura directa; o prensa confederal. |

### 4.D Relleno de huecos DISCRIMINANTES en fichas ricas (organizado por ítem, para exhibir el contraste)

Estas son las posiciones **más valiosas del encargo**: ítems huérfanos que **discriminan** entre hermanas ya fichadas. Se proponen por ítem, mostrando el perfil contrastado.

**lab-029 / lab-030 — «los sindicatos desaparecerían… la autoorganización horizontal los haría innecesarios».** Eje: organización. **Discriminante estrella** de la familia.

| Corriente | Valor | Justificación | Pasaje |
|---|---|---|---|
| Anarcosindicalismo | **−2** | El sindicato **no** desaparece: es la estructura permanente que administra la producción y el consumo. | El Dictamen de Zaragoza corrobora la dirección («las organizaciones de productoras… se encargarán de la administración directa de la producción y el consumo», `[repo]` pasaje-1bc289e1425f508fd789), pero ese pasaje **ya sostiene lab-017**; para evitar colisión de eje propongo **HUECO** con target **Isaac Puente, *El comunismo libertario* (1933)**, sección del sindicato como órgano de producción. |
| Anarcocomunismo | **+1** | El horizonte kropotkiniano es la **comuna**, no el sindicato permanente; admite que las estructuras sindicales se disuelvan en la asociación libre. | **HUECO** — target: Kropotkin, *La conquista del pan*, cap. sobre asociación libre. |
| Individualismo/egoísmo | **+2** | Ninguna estructura permanente es deseable; la asociación es disoluble a voluntad. | **HUECO** — target: Tucker/Stirner (izq-039 ya recoge el rechazo a estructuras/lider permanentes, `[repo]`). |
| Plataformismo | **−1** | Mantiene organización específica permanente, aunque no necesariamente sindical. | **HUECO** — target: *Plataforma* (1926), sección organizativa. |

**va-006 — «la protección del paisaje puede frenar grandes parques eólicos y solares».** Eje: tec./ecología.

| Corriente | Valor | Justificación | Pasaje |
|---|---|---|---|
| Primitivismo | **+2** | Toda gran infraestructura industrial —también la «verde»— se subordina a lo salvaje. | **HUECO** (Zerzan). |
| Ecoanarquismo/comunalismo | **+1** | Veto comunitario local sobre grandes infraestructuras (coherente con ene-012). | **HUECO** — target: Bookchin, municipalismo. |
| Anarcosindicalismo / anarcocomunismo | **−1** | Productivistas: la energía abundante es condición del bienestar común; el veto paisajístico no es su prioridad. | **HUECO** — target: Kropotkin, *Campos, fábricas y talleres*. |

**fem-003 / fem-004 / sd-015 — prostitución (regular como trabajo / sancionar al cliente).** Eje: género.

| Corriente | fem-003 | fem-004 | Justificación | Pasaje |
|---|---|---|---|---|
| Individualismo/egoísmo | **+2** | **−2** | Contrato libre entre adultos; sancionar al cliente es coacción estatal sobre un acuerdo voluntario. | **HUECO** — target: Tucker (soberanía individual sobre el propio cuerpo). |
| Anarcopacifismo tolstoyano | **−1** | ~0 | Moral sexual conservadora (castidad); pero rechaza también la sanción penal estatal. Tensión → probable silencio. | **HUECO** — target: Tolstói, *Sonata a Kreutzer* / escritos morales. |
| Anarcofeminismo | **SIN POSICIÓN** | **SIN POSICIÓN** | Disenso interno documentado (§4.B). | No se propone. |

**sd-014 / rel-001 — Acuerdos con la Santa Sede / ateísmo de Estado.** Eje: religión/laicismo.

| Corriente | sd-014 | rel-001 | Justificación | Pasaje |
|---|---|---|---|---|
| Anarquismos seculares (comunista, sindicalista, colectivista) | **+2** | **−1** | Fin de todo privilegio de la Iglesia, **pero** el Estado tampoco debe **imponer** el ateísmo: es antiestatismo, no ateísmo de Estado. | **HUECO** — target: prensa confederal / Bakunin (anticlericalismo sin Estado ateo). |
| Anarquismo religioso/cristiano | **+2** | **−2** | Contra el privilegio clerical **y** contra el ateísmo de Estado: rechaza toda imposición estatal en conciencia. | **HUECO** — target: tradición tolstoyana / libertad de conciencia. |

> Todas las posiciones de §4.D con «HUECO» quedan **propuestas sin cita**: valor y justificación fijados, pasaje pendiente de cotejo humano (§6). No se publica ninguna sin su pasaje.

---

## 5. Propuestas de ítems nuevos

Solo donde una dimensión discriminante **no tiene ítem** en el banco. Estilo de la casa: primera persona del votante español actual, sin jerga, una sola tesis.

1. **Desmantelar la civilización industrial (primitivismo).** *Hueco confirmado por el propietario* («falta un ítem directo sobre desmantelar civilización industrial»). Sin él, primitivismo ≡ decrecimiento.
   > **Propuesta:** «Deberíamos desmontar la sociedad industrial y su tecnología, no solo hacerla más pequeña o más limpia, y volver a formas de vida sencillas en comunidades reducidas.»
   > Discrimina: primitivismo **+2** vs decrecimiento/ecoanarquismo **−1/0** (reducen, no desmantelan).

2. **Aceleración tecnológica frente a vida de pueblo** (la dimensión que el encargo asociaba a los inexistentes cul-015/cul-016).
   > **Propuesta:** «Prefiero una vida más lenta y local, aunque haya menos tecnología y menos comodidades, a una sociedad que busca acelerar el progreso técnico.»
   > Discrimina: primitivismo/anarcopacifismo tolstoyano **+2**; anarcosindicalismo/anarcocomunismo (industrialistas) **−1**; aceleracionismos **−2**.

3. **Responsabilidad colectiva de la organización (plataformismo/especifismo).** *Hueco confirmado por el propietario* («falta un ítem directo de responsabilidad colectiva»). `dem-015` mide disciplina **vertical**; el rasgo plataformista es el compromiso **horizontal** de ejecutar lo acordado en común.
   > **Propuesta:** «Si mi organización toma una decisión en común, debería estar obligada a defenderla y aplicarla toda ella por igual, aunque una parte hubiera votado en contra.»
   > Discrimina: plataformismo **+2** vs anarcocomunismo espontaneísta / individualismo **−1/−2**.

4. **Insurrección del yo / rechazo de lo sagrado (egoísmo stirneriano).** Instrumenta el único discriminante que separaría al egoísmo del individualismo tuckeriano.
   > **Propuesta:** «Ninguna causa superior —ni la humanidad, ni la justicia, ni la comunidad— está por encima de mi propio interés; no me debo a ningún ideal.»
   > Discrimina: egoísmo **+2**; individualismo con derechos (Tucker) / anarquismos comunitarios **−2**. Si se aprueba, el egoísmo podría ascender de faceta a ficha.

5. **Prefiguración (sustituye al inexistente izq-048).** `izq-035` mide mandato imperativo e `izq-037` revocabilidad, pero ninguno mide la tesis prefigurativa (la forma de hoy anticipa la sociedad futura).
   > **Propuesta:** «La manera de organizarnos hoy —en asambleas, sin jefes— debe ser ya un ensayo de la sociedad que queremos, no solo un medio para llegar a ella.»
   > Discrimina: anarquismos (todos) **+2** vs leninismo (medios/fines separados) **−2**. Ítem transversal muy rentable.

---

## 6. Cola de verificación humana (URLs no verificables en esta sesión)

**Ninguna** de estas URL pudo comprobarse ni leerse aquí: la política de egress devolvió 403 en el CONNECT para todos los hosts externos. Se listan como **objetivos bibliográficos** (localizados vía WebSearch, sin extraer verbatim) para una sesión con egress abierto o cotejo con edición impresa. Prioridad por valor discriminante.

| Prioridad | Fuente / edición | URL-objetivo (sin verificar) | Pasajes a extraer |
|---|---|---|---|
| **Alta** | Isaac Puente, *El comunismo libertario* (1933) | `es.anarchistlibraries.net/library/isaac-puente-el-comunismo-libertario`; PDF `omegalfa.es`; `cntvalladolid.es` (IV Congreso) | Definición «administración de las cosas»; **sindicato como órgano de producción** (lab-029/030); comuna como órgano de consumo |
| **Alta** | CNT, *Concepto Confederal del Comunismo Libertario*, Zaragoza (mayo 1936) | `cnt.es/noticias/concepto-confederal-del-comunismo-libertario/`; PDF `jmc.web.uah.es/comunismolibertario.pdf` | Secciones **familia, amor libre, religión**, comuna (para fem/rel de anarcosindicalismo/anarcocomunismo) |
| **Alta** | John Zerzan, *Futuro primitivo y otros ensayos* (2001) | `es.anarchistlibraries.net/library/john-zerzan-futuro-primitivo`; `archive.org/details/futuro-primitivo-y-otros-ensayos-john-zerzan_202410` | Agricultura/domesticación; tecnología/máquina; división del trabajo; caza-recolección (toda §4.A) |
| **Alta** | Max Stirner, *El único y su propiedad* (1845, ed. esp.) | `es.anarchistlibraries.net/library/max-stirner-el-unico-y-su-propiedad`; PDF `solidaridadobrera.org`; `panarchy.org` | Propiedad como poder; «lo sagrado»/moral como espectro; Unión de egoístas (§4a egoísmo, ítem §5.4) |
| **Media** | Emma Goldman, ediciones españolas (marxists.org/espanol) | `marxists.org/espanol/goldman/` (índice) | **4.ª ancla económica** (demandas laborales de *Mujeres Libres*); pasaje **anticlerical** distinto (sd-014); *El tráfico de mujeres* / *La hipocresía del puritanismo* (contexto prostitución) |
| **Media** | Bakunin, *Dios y el Estado*, *Catecismo revolucionario* (ed. esp.) | `marxists.org/espanol/bakunin/` | Retribución según trabajo; ateísmo militante; abolición de herencia y familia jurídica |
| **Media** | Proudhon, *¿Qué es la propiedad?* (ed. esp.) | `marxists.org/espanol/proudhon/` | «La propiedad es un robo / la posesión es un derecho» (verbatim ES para mutualismo) |
| **Media** | Tolstói, *El Reino de Dios está en vosotros* (ed. esp.) | edición digital española a localizar | No resistencia; el Reino sin Iglesia ni Estado (anarquismo religioso, rel-001) |
| **Baja** | Ricardo Mella, *La ley del número* (1899) | `panarchy.org/mella/leynumero.html`; `es.wikisource.org/wiki/Autor:Ricardo_Mella` | Antielectoralismo (izq-031, dem-011) — refuerzo hispano de «sin adjetivos» |
| **Baja** | Bookchin, ed. esp. (municipalismo/ecología social) | a localizar | «Tecnología liberadora»; jerarquía social como raíz de la crisis (ecoanarquismo §9) |

**Además, cotejo con edición impresa recomendado para:** los pasajes ES ya en el repo cuya ficha marca «cotejo humano pendiente» — `anarcofeminismo` soc-006 (Goldman, *Prisiones…*) e izq-014/lab-011 (Nash, *Mujeres Libres*).

---

## 7. Limitaciones y discrepancias

1. **Bloqueo total de egress (la limitación dominante).** No pude verificar ninguna URL externa ni extraer ningún pasaje nuevo: el proxy aplica denegación de política (403) a `marxists.org`, bibliotecas anarquistas, `gutenberg.org`, `plato.stanford.edu`, `wikipedia.org`, `archive.org`, `cnt.es`, etc. `WebSearch` funciona pero solo da títulos/URLs y **resúmenes que NO son verbatim**. Cumpliendo la regla de la casa, **no transcribí ningún resumen de buscador como cita**: todo verbatim nuevo quedó en HUECO (§6). El encargo pedía «VERIFICA que cada URL responde antes de citarla»; aquí **ninguna** externa respondió, así que no se cita ninguna como viva. Los únicos verbatim presentados son los ya verificados en el repo.

2. **izq-048, cul-015 y cul-016 NO existen** en el worktree (máximos reales `izq-046`, `cul-014`). El encargo los daba por huérfanos; en realidad están **ausentes**. Es una discrepancia de base (probable rama distinta o ítems planeados). Impacto: la prefiguración se cubre con `izq-035`/`izq-037` y la dimensión «aceleración tecnológica vs vida de pueblo» carece de ítem → propuestas §5.2 y §5.5.

3. **Base HEAD divergente.** El encargo fija base `b8a29b5`, pero el worktree está en `c42e406` y `b8a29b5` **no es ancestro**. Audité el estado presente en el worktree. No toqué ni cité el trabajo del integrador (felipismo/derecha).

4. **Fichas de feminismo no cableadas.** `anarcofeminismo` y `anarquismo-queer` existen en `data/referencias/` pero el mapa las marca `SIN-FICHA`; ambas son además **no publicables** por anclas económicas insuficientes. La reconciliación mapa↔ficha y el cierre del eje económico son trabajo de integración pendiente (no lo resuelvo: es escritura de datos, fuera de mi encargo de solo lectura).

5. **Regla «un pasaje, un eje» no siempre verificable.** Varios ítems discriminantes (lab-028/029/030, dem-016, fem-003/004, sd-014, va-006, va-016, izq-035) tienen el array `ejes` **vacío** en el banco, de modo que no puedo comprobar colisiones de eje con certeza al reutilizar un pasaje del repo. Por prudencia mandé esos casos a HUECO en lugar de forzar una reutilización dudosa (p. ej. lab-029 para anarcosindicalismo).

6. **Prostitución: zona de no-discriminación deliberada.** `fem-003/004/sd-015` **no** deben codificarse en anarcofeminismo (disenso interno documentado en la propia ficha). Sí discriminan **entre** corrientes (individualismo pro-contrato vs moralismo tolstoyano), pero incluso ahí el verbatim está en HUECO. Es un buen ejemplo de que «más ítems» no siempre es «más discriminación».

7. **Anarcocapitalismo, excluido del contraste.** La ficha `anarcocapitalismo-rothbardiano` existe pero está en la familia `libertarismos`, no `anarquismos`; siguiendo el marco de la casa (y la tradición libertaria de izquierda), no cuenta como anarquismo «real» a efectos de esta matriz. Se menciona solo para deslindar el individualismo tuckeriano (socialista de mercado) del vector rothbardiano.

8. **Corpus mayoritariamente en inglés.** Casi todas las fichas ricas se sostienen en verbatim **inglés** (Kropotkin, Proudhon, Tucker, Rocker, Dielo Truda). Para un VAA español conviene, a medio plazo, sustituir o doblar esas citas por **ediciones españolas citables** (Puente, Mella, Lorenzo, Proudhon/Bakunin en traducción) — trabajo que el bloqueo de egress impidió avanzar aquí y que queda en §6.

---

### Cierre

Dosier autosuficiente: cada afirmación se apoya en (a) datos leídos del repo con ruta e id verificables, (b) pasajes ES ya verificados en `data/referencias/`, o (c) un HUECO explícito con URL-objetivo en §6. No se presenta ninguna paráfrasis como cita. Los veredictos son independientes pero convergen con la taxonomía del propietario en `data/mapa-ideologias.json`, matizándola donde la vara de «discriminación real» lo exige (egoísmo e ilegalismo → faceta; primitivismo → ficha bloqueada por ítem; ecoanarquismo general → faceta de comunalismo+decrecimiento).
