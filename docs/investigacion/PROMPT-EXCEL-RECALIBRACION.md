# Prompt de investigación → Excel de recalibración (para el propietario)

Objetivo: devolver un Excel con **citas reales** (pasaje textual + URL + fecha) que permita
(A) recalibrar partidos torcidos en el eje del compass, (B) recolocar ideologías mal situadas
en el atlas, y (C) añadir anclas nuevas. Yo lo integro con verificación §0.

## Definición de los dos ejes (imprescindible para colocar bien)

- **Eje X = propiedad y mercado.** −100 = propiedad social/pública/cooperativa, colectivización,
  planificación. 0 = economía mixta. +100 = propiedad privada, mercados, laissez-faire.
- **Eje Y = poder político y libertades.** −100 = libertades, pluralismo, poder distribuido y
  revocable, anti-autoritario. 0 = mixto. +100 = jerarquía, autoridad, coerción, poder concentrado.

(Ojo: X NO es «izquierda-derecha» general. Un partido puede subir impuestos a ricos —redistribución,
que va en otro eje— y aun así defender mercados y propiedad privada: eso es X positivo.)

---

## PARTE A — Partidos mal calibrados en el eje

Nuestra coordenada sale más extrema que la encuesta académica de expertos CHES 2024 (diagnóstico,
no objetivo). Casi siempre es **sesgo de evidencia-bandera**: tenemos sus votos-bandera progresistas,
nos faltan sus posiciones pragmáticas / de gestión / probempresa / de orden. Para cada partido,
busca posiciones DOCUMENTADAS (voto, declaración, programa) sobre los ítems indicados, con la
cita textual. El valor cae donde diga el pasaje; si no hay pasaje, se queda como está.

| Partido | Coord. actual (X propiedad, Y poder) | Diagnóstico CHES | Qué buscar (con cita) |
|---|---|---|---|
| **eaj-pnv** | no computa aún varios | econ −9 vs +24; social −54 vs +24 | **EL MÁS TORCIDO.** Es democristiano y probempresa. Buscar: contra impuesto de sucesiones/patrimonio (Hacienda foral), a favor de bajar IRPF, colaboración público-privada, defensa de la gran industria y PYME vasca, disciplina fiscal; en Y: seguridad, orden público, moral democristiana. Ítems: eco-009, eco-010, ene-005, lib-008, dem-023, soc-003, soc-006, rel-003. |
| **junts** | (94, −61) | social −17 vs +19 | Partido de la burguesía catalana, conservador. En Y (orden/autoridad): seguridad, videovigilancia (soc-003), prisión permanente (soc-006), inmigración dura (ya cableado der-018), valores. Ítems Y: soc-003, soc-006, dem-023, dem-007, rel-003. |
| **eh-bildu** | (−87, −60) | econ −84 vs −50; social −84 vs −56 | Tiene «giro/acercamiento empresarial» (eldiario 2024): modelo empresarial vasco, apoyo a PYME y cooperativas, economía mixta pragmática (no socialización total). Buscar posiciones que NO sean máximo-izquierda en: eco-007 (okupación), ene-005, lib-008, y matices de orden en Y. |
| **bng** | (−100, −62) | econ −83 vs −45; social −84 vs −49 | Gestión pragmática (gobierna con apoyo), defensa de la PYME gallega, economía mixta, no expropiación real. Ítems X donde no sea −2: eco-007, ene-005, lib-008. |
| **erc** | no computa Y | social −93 vs −49 | Ha gobernado la Generalitat: pragmatismo institucional, orden público (Mossos), seguridad. Ítems Y: soc-003, dem-023, dem-007, soc-006. |
| **movimiento-sumar** | (−80, −45) | econ −83 vs −55 | Moderadoras económicas: economía mixta, apoyo a autónomos/PYME, no colectivización. Ítems X: eco-007, ene-005, lib-008. |
| **iu** | (−55, −33) | social −95 vs −55 | Matices en Y (ya coherente en X). |
| **coalicion-canaria** | (2, −7) | social −36 vs +23 | Centro pragmático canario, más de orden de lo que mostramos: seguridad, autoridad. Ítems Y: soc-003, soc-006, dem-023. |
| **upn** | (72, −24) | econ 71 vs 41; social 74 vs 45 | Sale demasiado a la DERECHA/autoritario. Buscar sus posiciones más centristas/moderadas (es regionalista de centro-derecha, no extrema). OJO: ya verificamos que votó contra pensiones-IPC y recortó sanidad → parte del extremo es real; solo añadir moderadoras genuinas. |
| **psoe** | (−61, −60) aprox | econ −47 vs −21 | Alguna moderadora económica (mercado, disciplina fiscal, apoyo a empresa). Baja prioridad. |

Formato de vuelta (una fila por posición): `partido_id | item_id | valor(−2..+2) | cita_textual | url | fecha(AAAA-MM-DD)`.
Reglas: cita literal (no paráfrasis); si la cita es un titular, márcalo (será calidad «media»); un
0 exige una resolución explícita documentada; si no encuentras pasaje, no pongas la fila.

---

## PARTE B — Ideologías mal colocadas en el atlas (recolocar)

Cada corriente tiene una coordenada editorial (x,y). Estas parecen mal situadas. Devuelve la
coordenada CORREGIDA con 1-2 citas de teoría política (Stanford Encyclopedia of Philosophy,
manual académico, o texto canónico) que justifiquen la posición en cada eje.

| Corriente (id) | Coord. actual | Problema | Dirección correcta |
|---|---|---|---|
| **liberalismo-igualitario-rawlsiano** | (5, −30) | Justicia como equidad (principio de diferencia: desigualdad solo si beneficia al que peor está) es liberalismo IGUALITARIO → redistribución fuerte. Está en el lado mercado (+5). **Es centro-IZQUIERDA.** | X negativo, aprox (−25/−35, −30). |
| **objetivismo** | (17, −61) | Ayn Rand: capitalismo laissez-faire, propiedad privada radical, egoísmo racional. +17 es casi centro. **Debe estar pegado a la esquina de mercado**, junto a hoppeanismo/propertarianismo. | X aprox (+72/+80, −60). |
| **neoliberalismo** | (11, −17) | Escuela de mercado (Hayek/Friedman/Consenso de Washington): propiedad privada, competencia, Estado mínimo. +11 es demasiado central; el ordoliberalismo (más suave) ya está en +45. | X aprox (+50/+60, −15). |
| **liberalismo-social** _(verificar)_ | (−11, −17) | Liberalismo social (Beveridge/Keynes, ILE): ¿demasiado central? Podría ir algo más a la izquierda. | Verificar; quizá (−20, −17). |
| **distributismo** _(verificar)_ | (−22, 6) | Propiedad privada ampliamente repartida (Chesterton/Belloc): es propiedad PRIVADA, no social. −22 lo escora a la izquierda. | Verificar; quizá cerca de 0. |
| **georgismo** _(verificar)_ | (0, −61) | Impuesto al valor del suelo pero mercados libres en lo demás; los georgistas se ven promercado. | Verificar; quizá X ligeramente positivo. |
| **tercera-via** _(verificar)_ | (22, −6) | Blair/Giddens: mercados + inversión social. +22 defendible; confirmar. | Probablemente OK. |

Formato de vuelta: `corriente_id | x_propuesto | y_propuesto | cita/fuente_1 | cita/fuente_2 | razon`.

---

## PARTE C — Anclas nuevas a añadir

### C.1 — Centro-derecha-abajo (cuadrante despoblado)
El cuadrante **X positivo + Y negativo** (mercado + libertades, «liberal de derechas moderado»)
solo tiene UNA ancla (libertarismo-nacional en 44,−39). Un usuario o partido liberal-moderado que
caiga ahí no tiene referencia cercana. Buscar y colocar 1-2 corrientes que ocupen ~(+30/+45, −25/−45).
Candidatas a investigar: **liberalismo progresista / liberalismo conservador moderado**, tradición
liberal española (p. ej. el liberalismo de la Constitución de 1978, o el liberal-reformismo),
**posibilismo** (Emilio Castelar), o el espacio «liberal de centro» tipo UCD/Suárez. Devuelve
nombre + (x,y) + definición breve + encaje en España + cita.

### C.2 — Ideologías españolas que faltan (proponer y colocar)
El atlas tiene muchas corrientes españolas, pero faltan tradiciones relevantes. Investiga y coloca
(con cita) las que apliquen; candidatas:
- **Krausismo / Institución Libre de Enseñanza** (liberalismo reformista, laico, pedagógico) — centro-izq liberal.
- **Regeneracionismo** de otras ramas (ya está el costista y el autoritario; ¿falta el liberal-democrático?).
- **Andalucismo** (Blas Infante) — nacionalismo de izquierda andaluz.
- **Nacionalismo vasco aranista** (Sabino Arana) como corriente histórica distinta del PNV actual.
- **Galleguismo** (Castelao) — nacionalismo gallego.
- **Blaverismo / regionalismo valenciano**.
- **Lerrouxismo / radicalismo republicano** (populismo republicano anticlerical) — ya en cola nuestra.
- **Posibilismo** (Castelar) — republicanismo moderado.
- **Foralismo** (tradición vasco-navarra de fueros).
- Cualquier otra que consideres central en la historia política española y que no esté ya.

Formato de vuelta (por ancla nueva): `nombre | x | y | familia | definicion | encaje_espana | cita`.

---

## Notas para que el Excel entre limpio
- Fechas en formato AAAA-MM-DD (o AAAA si es una obra/programa sin día).
- Citas en español; si traduces de otro idioma, márcalo «(traducción propia)».
- Prefiere fuente primaria (programa, BOE, votación, texto canónico) a agregador o titular; si solo
  hay titular, vale pero será calidad «media».
- No hace falta que rellenes todo: lo que traigas con cita real, lo integro; lo que no, se queda como hueco honesto.
