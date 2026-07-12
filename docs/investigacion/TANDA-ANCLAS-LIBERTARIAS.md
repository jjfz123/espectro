# Tanda anclas libertarias — 7 fichas doctrinales del campo LIBERTARIO

Encargo de datos. Objetivo: crear las **fichas de referencia doctrinal** de las 7
anclas bloqueadas (`estado: investigacion`, `publicacionGeometrica:
bloqueada-investigacion`) del campo LIBERTARIO del atlas: **hoppeanismo,
propertarianismo, voluntarismo, agorismo, rothbardianismo-izquierda,
libertarismo-nacional, libertarismo-cristiano**. Solo altas: 7 ficheros nuevos en
`data/referencias/`. No se tocó `mapa-ideologias.json`, ni ítems, ni TODO, ni
candado, ni versión, ni tests, ni web. La entrada de cada ancla en el mapa
(definición, encajeEspaña, preguntasDiscriminantes, nota del propietario) se usó
como intención editorial de partida; la forma se copió de
`anarcocapitalismo-rothbardiano.json`, nunca el contenido.

## Base y condiciones de red

- **Base sincronizada: `9ed70f1`** (obligatoria del encargo). El worktree nació de
  `c42e406` (main desactualizado); se hizo `git reset --hard 9ed70f1` y se verificó
  con `git log --oneline -1` antes de escribir nada.
- **WebFetch bloqueado (403) en mises.org y en wikipedia.org** (bloqueo de bots tipo
  Cloudflare del servidor, no del proxy de egreso: la respuesta es «403 Forbidden»
  del propio host, no un 407 del proxy). No se rodeó. Siguiendo el rúbrico, toda la
  confirmación doctrinal se hizo con **WebSearch** (≥2 extractos independientes por
  doctrina), que devuelve resúmenes sintetizados: sirven para confirmar dirección,
  magnitud y fecha de la obra original y para localizar una URL estable citable,
  **pero no dan pasaje verbatim**. Por eso **ninguna posición lleva `cita` literal**:
  todas son «posición con fuente + justificación» de **calidad media o baja**, con
  fecha de la obra original en la fuente. Sin `cita`, ninguna posición necesita
  `grupoEvidencia`.
- **`npm run validate:data` verde antes de cada commit.** Un commit atómico por ficha
  (7) + este documento.

## Recuento

| Ficha | Posiciones | reglaPublicacion {ítems, cobertura, umbral} | sensibilidad |
|---|---|---|---|
| hoppeanismo | 8 | {5, 0.6, 85} | **antipluralista** |
| propertarianismo | 6 | {4, 0.55, 84} | normal |
| voluntarismo | 6 | {4, 0.6, 85} | normal |
| agorismo | 6 | {4, 0.55, 83} | normal |
| rothbardianismo-izquierda | 6 | {4, 0.5, 82} | normal |
| libertarismo-nacional | 7 | {4, 0.55, 86} | normal |
| libertarismo-cristiano | 7 | {4, 0.55, 84} | normal |
| **Total** | **46** | | |

`referencias doctrinales` pasó de 67 a **74** en la validación. Todas las fichas usan
`confianza: estimada` (reconstrucciones de tipo ideal desde fuentes secundarias y
paráfrasis, sin verificación de texto primario; a diferencia de ancap/minarquismo,
que citan libro con pasaje).

## Decisión sobre `hoppeanismo` = antipluralista (razonada)

**Sí, marcado `antipluralista`**, coherente con la intención del mapa
(`sensibilidad: antipluralista`) y con la nota del propietario («sensible por sus
posibles políticas de exclusión»). Fundamento: en *Democracy: The God That Failed*
(2001) Hoppe defiende que las **comunidades de pacto pueden excluir y expulsar a
demócratas, comunistas y defensores de estilos de vida ajenos** por sus ideas, sin
que medie agresión alguna. Esa **exclusión selectiva del discrepante pacífico** es un
principio de ordenación antipluralista, y es lo que activa la cautela — **no** un
culto a un liderazgo infalible (por eso `lim-001 = -2`: su orden es propiedad privada
descentralizada, no una dirección doctrinal única). Matiz honesto en el valor: el
marcador `lim-005` se codifica **+1 y no +2** porque el ítem formula la pérdida de
derechos como **orden estatal**, mientras Hoppe la concibe como **exclusión privada de
un pacto** (el excluido puede ir a otra comunidad). Regla reforzada `{5, 0.6, 85}`,
por encima del suelo de sensibilidad del validador `{3, 0.5, 78}` y del suelo del
encargo `{4, 0.6, 85}`. Advertencia clínica de 462 caracteres (≥80).

---

## Ficha 1 — hoppeanismo (8 posiciones)

Fuente marco: Hoppe, *Democracy: The God That Failed* (2001).

| Ítem | Valor | Calidad | Fecha | Cita | Núcleo |
|---|---|---|---|---|---|
| dem-011 | +2 | media | 2001 | no | democracia como degeneración; sustituir soberanía por derecho privado |
| lim-005 | +1 | media | 2001 | no | exclusión/expulsión del disidente pacífico en la comunidad de pacto |
| lim-001 | −2 | media | 2001 | no | **no** es culto a dirección infalible: orden descentralizado |
| izq-046 | −2 | media | 2001 | no | rechazo de la libre circulación; «integración forzosa» |
| der-025 | +2 | baja | 2001 | no | autoridad doméstica/paterna (comunidad para familia y parentela) |
| dem-010 | −1 | baja | 2001 | no | subordina el pluralismo político a la homogeneidad del pacto |
| dem-035 | +2 | media | 2001 | no | secesión ilimitada hasta el individuo como antídoto |
| lab-009 | +2 | media | 2001 | no | orden natural sin impuestos: exacción = despojo |

**Discriminantes (mapa: lab-010, der-025, dem-010).** Las 2-3 preguntas que mejor lo
separan: **izq-046** (fronteras), **dem-010 / lim-005** (antipluralismo), **dem-011**
(antidemocratismo).
- **vs anarcocapitalismo-rothbardiano:** comparten el anarquismo de mercado
  (`dem-011 +2`, `lab-009 +2`), pero el hoppeanismo añade tres rasgos que el ancap
  rothbardiano **no** tiene: antidemocratismo doctrinal, **exclusión** del disidente
  pacífico (`lim-005`, `dem-010 −1`) y **cierre de fronteras** (`izq-046 −2`, frente
  al ancap rothbardiano abierto o dividido — cf. nota de `lib-018`: «propietarismo
  hoppeano» vs «fronteras abiertas rothbardianas»). Añade discriminación real: **sí**.
- **vs minarquismo:** opuestos en lo institucional. Minarquismo conserva el Estado
  (`lib-002 −2`, `der-001 +2`, `dem-011 −1`) y es **pluralista** (`dem-028 +2`,
  `dem-006 +2`, restricciones laterales que protegen minorías); el hoppeanismo lo
  abole y es antipluralista. Separador limpio: `dem-011` (+2 vs −1) y el eje pluralismo.

---

## Ficha 2 — propertarianismo (6 posiciones)

Fuente marco: *Propertarianism* (ficha enciclopédica); L. Neil Smith, *The
Probability Broach* (1980).

| Ítem | Valor | Calidad | Fecha | Cita | Núcleo |
|---|---|---|---|---|---|
| lab-010 | +2 | media | 1980 | no | tesis pura: todo derecho se reduce a propiedad (autopropiedad) |
| lib-002 | +1 | media | 1980 | no | abarca de cuerpo mínimo de contrato a provisión privada (no dogma anarquista) |
| eco-007 | +2 | baja | 1980 | no | propiedad como derecho supremo; ocupación = violación paradigmática |
| der-025 | +1 | baja | 1980 | no | autoridad privada/doméstica, no moralismo tradicional |
| dem-010 | +1 | baja | 1980 | no | civil-libertario (L. Neil Smith): pluralismo como extensión de la libertad |
| lib-010 | +2 | baja | 1980 | no | propiedad del propio cuerpo → libertad plena de consumo |

**Discriminantes (mapa: lab-010, der-025, dem-010).** Mejores separadores: **lib-002
(+1)** —posición intermedia entre ancap y minarquismo—, **dem-010 (+1)** y la reducción
propietarista.
- **vs anarcocapitalismo-rothbardiano:** el propertarismo **no** es definicionalmente
  anarquista: `lib-002 +1` (acepta la provisión privada sin convertirla en dogma)
  frente al ancap `+2`. Se identifica por la reducción de todo derecho a propiedad y
  por medir autoridad privada/exclusión/pluralismo, no por rechazar impuestos (nota
  del mapa). Discriminación: **moderada** — en muchos ítems se parece al ancap; su
  nicho es `lib-002 +1` y el encuadre propietarista.
- **vs minarquismo:** el minarquista **niega** la provisión privada de justicia
  (`lib-002 −2`, mano invisible nozickiana); el propertarista la **acepta** (`+1`) y
  deriva todo de la propiedad (`lab-010 +2`), no de restricciones laterales. Separador:
  `lib-002` (+1 vs −2), `eco-007`.

---

## Ficha 3 — voluntarismo (6 posiciones)

Fuente marco: *Voluntaryism* (revival 1982: Watner, G. H. Smith, McElroy); Auberon
Herbert, *A Plea for Voluntaryism* (1908).

| Ítem | Valor | Calidad | Fecha | Cita | Núcleo |
|---|---|---|---|---|---|
| lab-010 | +2 | media | 1982 | no | consentimiento como único test de legitimidad |
| lib-002 | +2 | baja | 1982 | no | monopolio estatal de justicia = no consentido |
| dem-011 | +2 | media | 1982 | no | parlamentarismo = consentimiento presunto, no real |
| dem-029 | −1 | media | 1982 | no | **rechaza voto/acción electoral**: rasgo diferencial vs ancap |
| geo-003 | +2 | baja | 1908 | no | guerra estatal = coacción no consentida (Herbert) |
| soc-002 | −1 | baja | 1982 | no | rechaza la deportación como coacción estatal sobre el pacífico |

**Discriminantes (mapa: lab-010, lib-002, lab-009).** Mejores separadores: **dem-029
(−1, no electoralismo)**, **soc-002 (−1)** y el purismo del consentimiento.
- **vs anarcocapitalismo-rothbardiano:** el propio mapa avisa «muy solapada con
  ancap». Discriminación **baja**: la información incremental es `dem-029 −1` (rechazo
  del voto/proceso electoral como legitimación), `soc-002 −1` y el encuadre del
  consentimiento como test único. Se entrega la ficha marcando explícitamente el bajo
  aporte discriminante. (Auberon Herbert admitía Estado financiado voluntariamente; el
  voluntarismo moderno es antiestatista integral: matiz en `variante`.)
- **vs minarquismo:** limpio — el voluntarismo abole el Estado (`lib-002 +2`,
  `dem-011 +2`) frente al minarquismo que lo conserva (`lib-002 −2`, `dem-011 −1`).

---

## Ficha 4 — agorismo (6 posiciones)

Fuente marco: Konkin, *New Libertarian Manifesto* (1980).

| Ítem | Valor | Calidad | Fecha | Cita | Núcleo |
|---|---|---|---|---|---|
| lab-009 | +2 | media | 1980 | no | contraeconomía = rechazo activo del impuesto |
| izq-008 | +1 | media | 1980 | no | **antipartido**: praxis extraparlamentaria (contraeconomía, no huelga) |
| dem-011 | +2 | media | 1980 | no | disolver el Estado por vaciado de recursos, no reforma |
| lib-002 | +2 | baja | 1980 | no | agencias voluntarias de protección/arbitraje en el ágora |
| lib-009 | +2 | baja | 1980 | no | mercado negro/gris (cannabis) como praxis |
| lib-008 | +2 | baja | 1980 | no | prestación sin licencia (transporte gris) = contraeconomía en acto |

**Discriminantes (mapa: lab-010, izq-008, lab-009).** Mejor separador: **izq-008
(+1, estrategia antipartido/contraeconómica)**.
- **vs anarcocapitalismo-rothbardiano:** **mismo fin** (anarcocapitalismo), distinta
  **estrategia** (contraeconomía). Discriminación **baja-moderada**, embotellada por un
  **HUECO declarado: el instrumento carece de un ítem directo de contraeconomía** (nota
  del propietario: la economía sumergida española es «agorismo de facto sin agoristas
  — praxis sin teoría»). `izq-008` es la única señal incremental clara.
- **vs minarquismo:** limpio — agorismo disuelve el Estado (`dem-011 +2`) vs reformismo
  minarquista (`dem-011 −1`).
- **vs rothbardianismo-izquierda (hermana más próxima doctrinalmente):** distinta
  **época y estrategia** — agorismo = contraeconomía antipolítica (1980); rothbardianismo
  de izquierda = coalición con la nueva izquierda (1965-1968). Solo comparten `lab-009`.

---

## Ficha 5 — rothbardianismo-izquierda (6 posiciones)

Fuente marco: revista *Left and Right* (1965-1968); Carson, *Free-Market
Anti-Capitalism* (C4SS, 2011).

| Ítem | Valor | Calidad | Fecha | Cita | Núcleo |
|---|---|---|---|---|---|
| geo-003 | +2 | media | 1965 | no | antiimperialismo (Vietnam, complejo militar-industrial) |
| izq-046 | +2 | baja | 2011 | no | **fronteras abiertas** (internacionalismo antiimperialista) |
| izq-032 | +1 | baja | 2011 | no | cooperativas/mutuales en mercado sin privilegios |
| lib-007 | +2 | baja | 2011 | no | anticorporativismo: suprimir privilegio gremial |
| izq-007 | +2 | media | 1965 | no | abolir cualquier Estado (deriva anarquista Hess/Rothbard) |
| lab-009 | +2 | media | 1965 | no | antiestatismo rothbardiano (impuesto = despojo) |

**Discriminantes (mapa: lab-010, izq-032, izq-007).** Mejores separadores: **izq-032
(+1, cooperativas)** —ninguna otra hermana libertaria lo toca en positivo—, **izq-046
(+2)** y el anticorporativismo (`lib-007`).
- **vs anarcocapitalismo-rothbardiano:** comparten anarquismo (`izq-007 +2`) y
  antiimperialismo (`geo-003 +2`), pero el rothbardianismo de izquierda **proyecta a la
  izquierda** (mapa: x=−39): `izq-032 +1` (cooperativas), `lib-007 +2` (contra el
  privilegio corporativo) e `izq-046 +2` (fronteras abiertas). Paradoja documentada:
  «anticapitalismo de libre mercado». Discriminación: **alta**.
- **vs minarquismo:** anarquista y anticorporativo-de-izquierda frente al Estado mínimo
  pluralista nozickiano. Separadores: `izq-007` (+2 vs implícito −), `izq-032`.

---

## Ficha 6 — libertarismo-nacional (7 posiciones)

Fuente marco: *National Libertarianism* (Inside Political Science, sin fecha);
Hoppe, «integración forzosa» (2001). **Corriente difusa, sin obra fundacional única.**

| Ítem | Valor | Calidad | Fecha | Cita | Núcleo |
|---|---|---|---|---|---|
| der-001 | +1 | baja | s/f | no | Estado mínimo **con excepción nacional** (tensión) |
| izq-046 | −2 | media | 2001 | no | rechazo de la libre circulación (frontera protege la nación) |
| ue-001 | +2 | baja | s/f | no | soberanismo frente a lo supranacional |
| lib-003 | +2 | baja | s/f | no | fiscalidad baja/no progresiva (mitad de mercado) |
| lib-006 | +2 | baja | s/f | no | liberalizar suelo (mercado) |
| soc-002 | +2 | baja | s/f | no | devolución prioritaria (la comunidad nacional controla la entrada) |
| lab-009 | +1 | baja | s/f | no | antifiscalismo **templado** por el coste de fronteras/defensa |

**Discriminantes (mapa: der-001, izq-025, ue-001).** Mejores separadores: **izq-046
(−2)**, **ue-001 (+2)** y **soc-002 (+2)**. (Se descartó `izq-025` como posición: su
enunciado es «la izquierda debe reivindicar la bandera», marco de clase impropio para
esta corriente; se documenta como hueco.)
- **Tensión libertad/nación (no resuelta, por encargo):** `der-001 +1` y `lab-009 +1`
  (aceptan que fronteras y defensa exigen financiación pública) conviven con
  `lib-003 +2`, `lib-006 +2` (mercado). Quieren un Estado mínimo **y** un Estado-nación
  capaz de cerrar fronteras: la ficha lo deja planteado, no lo resuelve.
- **vs anarcocapitalismo-rothbardiano:** el ancap **disuelve** el Estado-nación y es
  abierto/dividido en fronteras; el nacional lo **afirma** (`izq-046 −2`, `soc-002 +2`,
  `ue-001 +2`). Discriminación: **alta** en el eje frontera/nación.
- **vs minarquismo:** el minarquismo es cosmopolita-ish (`lib-018 +1`, `soc-002 −1`);
  el nacional es anti-inmigración (`soc-002 +2`, `izq-046 −2`) y acepta más Estado
  (funciones nacionales). Separador: `soc-002` (+2 vs −1), `izq-046`.

---

## Ficha 7 — libertarismo-cristiano (7 posiciones)

Fuente marco: Libertarian Christian Institute (2021-2022); ley natural escolástica
(Aquino, Escuela de Salamanca); Edmund Opitz (1970, contexto).

| Ítem | Valor | Calidad | Fecha | Cita | Núcleo |
|---|---|---|---|---|---|
| der-001 | +2 | baja | 2021 | no | subsidiariedad → Estado reducido a seguridad/justicia |
| lib-003 | +2 | baja | 2021 | no | mayordomía + coacción mínima → fiscalidad baja |
| rel-002 | +2 | media | 2022 | no | **libertad religiosa, no confesionalidad** (fe libre) |
| der-002 | −1 | media | 2022 | no | **rechaza legislar la moral cristiana** (deslinde del integrismo) |
| geo-003 | +2 | baja | 2021 | no | no intervencionismo (Ron Paul): guerra justa + no agresión |
| lab-010 | +2 | baja | 2021 | no | ley natural/mayordomía: propiedad sin coacción fiscal |
| sd-014 | +1 | baja | 2022 | no | fin del privilegio estatal de la Iglesia, sin ánimo anticlerical |

**Discriminantes (mapa: der-001, rel-002, lib-003).** Su discriminante vive en
**religión/moral** (por encargo): **rel-002 (+2)**, **der-002 (−1)**, **sd-014 (+1)**.
- **vs anarcocapitalismo-rothbardiano (secular):** **misma economía**; difieren en el
  **fundamento** (ley natural, subsidiariedad, no agresión fundada en la fe — vive en
  las justificaciones) y en matices morales: `der-002 −1` (el cristiano-libertario
  **engancha** con la cuestión de la moral cristiana y la rechaza como imposición legal,
  el ancap es indiferente) y `sd-014 +1` (menos anticlerical que el `+2` limpio de un
  ancap secular). Discriminación a nivel de posición: **limitada** — es sobre todo
  **fundacional**. Se entrega marcándolo.
- **vs minarquismo:** economía y Estado mínimo parecidos (`der-001 +2`), pero fundado
  en la fe y la subsidiariedad, no en los derechos nozickianos; separación de posición
  también débil, la diferencia es de fundamento + énfasis en libertad religiosa.
- **vs catolicismo político / integrismo (deslinde clave del mapa):** `der-002 −1` y
  `rel-002 +2` lo separan nítidamente del confesionalismo (que afirmaría la moral
  cristiana por ley y una religión oficial).

---

## Anti-copia entre hermanas (auditoría)

Ninguna ficha es clon de otra. Máximo de pares **ítem+valor idénticos** entre dos
fichas cualesquiera = **2** (sobre 6-8 posiciones), siempre con **justificación y
fuente independientes**. Varios ítems compartidos llevan **valores opuestos**, y son
**discriminantes**, no copias:

- `izq-046`: hoppeanismo **−2**, libertarismo-nacional **−2**, rothbardianismo-izquierda **+2**.
- `soc-002`: voluntarismo **−1**, libertarismo-nacional **+2**.
- `dem-010`: hoppeanismo **−1**, propertarianismo **+1**.
- `der-025`: hoppeanismo **+2**, propertarianismo **+1**.
- `der-001`: libertarismo-nacional **+1**, libertarismo-cristiano **+2**.
- `lab-009`: hoppeanismo/agorismo/rothbardianismo-izquierda **+2**, libertarismo-nacional **+1**
  (ítem solo-matching equifinal: sus propias notas esperan a libertarios de mercado,
  antiestatistas de izquierda **y** nacionalistas por motivos distintos).

Ítem discriminante único por ficha: hoppeanismo (`lim-005`, `lim-001`, `dem-035`);
propertarianismo (`eco-007`, `lib-010`); voluntarismo (`dem-029`); agorismo
(`izq-008`, `lib-009`, `lib-008`); rothbardianismo-izquierda (`izq-032`, `lib-007`,
`izq-007`); libertarismo-nacional (`ue-001`, `lib-006`); libertarismo-cristiano
(`rel-002`, `der-002`, `sd-014`).

## Huecos declarados (por prioridad de revisión)

1. **agorismo — sin ítem de contraeconomía.** Su rasgo definitorio (mercado negro/gris
   como praxis) no es instrumentable; queda infrarrepresentado y con alto solape con
   ancap. Candidato a ítem nuevo solo-mapa si el propietario quiere instrumentarlo.
2. **voluntarismo — solape alto con ancap.** Sin ítem directo de «el voto es
   ilegítimo»; `dem-029 −1` es el mejor proxy. Aporte discriminante bajo, declarado.
3. **libertarismo-nacional — fuente débil y sin obra fundacional.** Se apoya en una
   página descriptiva (insidepoliticalscience.com, sin fecha) + el argumento de Hoppe
   sobre «integración forzosa» (2001). `izq-025` (mapa) se descartó como posición por
   marco de clase impropio. Prioridad de verificación humana.
4. **libertarismo-cristiano — discriminación de posición limitada vs ancap secular.** La
   diferencia es fundacional (ley natural/subsidiariedad, en las justificaciones) + 2-3
   matices morales. Ítems de aborto/vida **omitidos a propósito**: la corriente está
   internamente dividida sobre usar o no la coacción estatal, así que codificar un valor
   sería inventar consenso.
5. **propertarianismo — sin ítem «propiedad como fundamento de todo derecho».** `lab-010`
   es el proxy más cercano.
6. **hoppeanismo — `lim-005` es proxy imperfecto.** El ítem formula la exclusión como
   acción **estatal**; Hoppe la concibe como **exclusión privada de pacto** (de ahí +1).

## Fuentes / URLs a cola humana

**Ninguna** con `cita` literal; todas «fuente + justificación», calidad media/baja;
fecha de obra original salvo corrientes difusas (s/f señalada). WebFetch 403 en
mises.org y wikipedia.org → confirmación por WebSearch (≥2 extractos independientes).

| Doctrina | URL | Fecha obra | Tipo |
|---|---|---|---|
| hoppeanismo | https://archive.org/details/democracythegodt00hans | 2001 | primaria (facsímil) |
| hoppeanismo | https://en.wikipedia.org/wiki/Democracy:_The_God_That_Failed | 2001 | terciaria |
| hoppeanismo / nacional | https://en.wikipedia.org/wiki/Libertarian_perspectives_on_immigration | 2001 | terciaria |
| propertarianismo | https://en.wikipedia.org/wiki/Propertarianism | 1980 | terciaria |
| voluntarismo | https://en.wikipedia.org/wiki/Voluntaryism | 1982 | terciaria |
| voluntarismo | https://oll.libertyfund.org/pages/rc-herbert1 | 1908 | primaria |
| agorismo | https://theanarchistlibrary.org/library/samuel-edward-konkin-iii-new-libertarian-manifesto | 1980 | primaria |
| agorismo | https://www.libertarianism.org/columns/black-market-activism-agorism-samuel-edward-konkin-iii | 1980 | secundaria |
| rothbardianismo-izq | https://en.wikipedia.org/wiki/Left_and_Right:_A_Journal_of_Libertarian_Thought | 1965 | terciaria |
| rothbardianismo-izq | https://c4ss.org/content/16089 | 2011 | secundaria |
| **libertarismo-nacional** | https://insidepoliticalscience.com/national-libertarianism/ | s/f | **secundaria débil (revisar)** |
| libertarismo-cristiano | https://libertarianchristians.com/2021/12/07/libertarianism-2-understanding-the-nap/ | 2021 | secundaria |
| libertarismo-cristiano | https://libertarianchristians.com/2022/06/09/political-neutrality-abortion-pro-life-libertarians/ | 2022 | secundaria |
| libertarismo-cristiano | https://en.wikipedia.org/wiki/Non-aggression_principle | — | terciaria (raíz escolástica) |

## Nota para el integrador

Las 7 anclas siguen en `estado: investigacion` / `bloqueada-investigacion` en el mapa
(no se tocó). Por tanto la validación **no** ejecuta el cruce motor↔atlas
(`corriente.estado !== 'instrumentada'` ⇒ `continue`): las fichas se validan de forma
autónoma (esquema + integridad de ítems + suelo de sensibilidad). Instrumentar y
publicar geometría requeriría editar el mapa (fuera de este encargo) y superar el
cruce motor↔atlas. Re-verificación total recomendada por triaje.
