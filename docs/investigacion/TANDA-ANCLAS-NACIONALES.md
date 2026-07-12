# TANDA — Anclas nacionales sensibles (neorreacción, cuarta teoría política, strasserismo, neonazismo)

Fichas doctrinales de 4 anclas bloqueadas del atlas (grupo SENSIBLE, `estado: investigacion`,
`publicacionGeometrica: bloqueada-investigacion`). Base sincronizada a `9ed70f1`. Cada ficha
es un tipo ideal doctrinal no electoral; el cableado al mapa (referenciaId, coordenadas,
paso a instrumentada) lo hace el integrador.

## Método y límites de evidencia

- **WebFetch 403**: toda verificación por WebSearch con ≥2 extractos independientes por doctrina.
  **Sin cita literal** (`cita`) en ninguna posición → `calidadEvidencia` media/baja, nunca alta.
- **Fechas**: referencias vivas (Wikipedia, ECPS, Britannica) llevan `fecha: 2026` (estado
  consultado, misma convención que `pce-reconstituido`). Fuentes datadas llevan su fecha real
  (Duguin FPT 2009 en la definición; programa Strasser 1925-1926; Circular FGE 7/2019;
  condena Amanecer Dorado 2020-10-07; Ferreira RECP 2019). **Los años de los dos papers
  académicos de Dugin (ResearchGate #384363152 y Journal of Ecohumanism) van como `2024`
  aproximado: la cola humana debe firmarlos.**
- `confianza: estimada` en las 4 (proyección translingüe de doctrinas alemanas/rusas/angloamericanas
  sobre ítems españoles, sin verbatim; coherente con el `estado: investigacion` del mapa).
- Puerta `npm run validate:data` **verde** tras cada ficha (avisos preexistentes de partidos, no de
  estas referencias; las referencias doctrinales quedan fuera del chequeo de evidencia-bandera).

## ⚠ Discrepancia editorial que debe resolver el integrador

**strasserismo**: el mapa (`data/mapa-ideologias.json`, línea de la corriente) marca
`sensibilidad: "violenta"`; el encargo la fija como `antipluralista` (innegociable), y así se ha
construido la ficha (`reglaPublicacion {4, 0.6, 85}`). **Antes de cablear la corriente a
`instrumentada`+`publicada`, hay que armonizar el campo `sensibilidad` del mapa (violenta →
antipluralista)**, o `validate-data.mjs` (≈línea 695) fallará al exigir
`corriente.sensibilidad === referencia.sensibilidad`. Las otras tres ya coinciden con el mapa
(neonazismo=violenta; neorreacción y cuarta-teoría=antipluralista).

---

## 1. neorreacción (`neorreaccion.json`) — antipluralista — commit `613d745`

Ilustración Oscura (Dark Enlightenment): Yarvin/Moldbug y Land. Neocameralismo (Estado-empresa
dirigido por consejo o director-monarca), «la Catedral», «salida en vez de voz», rechazo
antiigualitario de la democracia.

| ítem | valor | calidad | fuente (fecha) |
|---|---|---|---|
| dem-001 | −2 | media | Wikipedia Dark Enlightenment (2026) |
| dem-008 | −2 | media | Wikipedia Curtis Yarvin (2026) |
| dem-010 | −2 | media | Wikipedia Dark Enlightenment (2026) |
| dem-011 | +2 | media | Wikipedia Curtis Yarvin (2026) |
| dem-019 | +2 | baja | Wikipedia Curtis Yarvin (2026) |
| dr-024 | +2 | media | ECPS «Dark Enlightenment» (2026) |
| lib-014 | +2 | baja | Wikipedia Curtis Yarvin (2026) |
| lim-005 | +1 | baja | Wikipedia Curtis Yarvin (2026) |

- **Huecos declarados**: economía (X) no instrumentada — sin posición limpia en `economico`/
  `propiedad-mercado` (la literatura la llama «hiperneoliberal» pero también postlibertaria/formalista:
  ambiguo); eje étnico (`lim-007`/`cul-002`) **no codificado a propósito**: el formalismo de Yarvin
  no es primariamente etnonacionalista; hueco antes que sobrelectura. `dem-019` y `lib-014` son
  proxies parciales (soberano corporativo, no movimiento de masas; gerencialismo que la doctrina
  extiende a todo el soberano).
- **Mejores discriminantes** (para `preguntasDiscriminantes`): **lib-014** (gobierno gerencial tipo
  empresa, lo más específico de NRx), **dem-011** (sustituir, no reformar el parlamentarismo) y
  **dem-008** (rechazo de la separación de poderes). El set actual del mapa [dem-010, dem-019,
  lib-014] es razonable, pero dem-019 lo comparte con 4TP y neonazismo; lib-014 + dem-011 son más
  únicos.
- **Fuentes (cola humana)**: https://en.wikipedia.org/wiki/Dark_Enlightenment ·
  https://en.wikipedia.org/wiki/Curtis_Yarvin · https://en.wikipedia.org/wiki/Nick_Land ·
  https://www.populismstudies.org/Vocabulary/dark-enlightenment/

---

## 2. cuarta teoría política (`cuarta-teoria-politica.json`) — antipluralista — commit `e9a9782`

Proyecto duginista posliberal y eurasianista: rechaza liberalismo, comunismo y fascismo;
multipolaridad de civilizaciones frente a la hegemonía atlantista, Rusia como polo eurasiático.

| ítem | valor | calidad | fuente (fecha) |
|---|---|---|---|
| dr-019 | +2 | media | Wikipedia Aleksandr Dugin (2026) |
| ue-001 | +2 | baja | Journal of Ecohumanism, FPT (2024 aprox.) |
| ue-002 | −2 | baja | Wikipedia Aleksandr Dugin (2026) |
| dr-024 | +2 | media | ResearchGate, marco intelectual de Dugin (2024 aprox.) |
| dem-019 | +2 | baja | Wikipedia Aleksandr Dugin (2026) |
| cul-013 | +1 | baja | Journal of Ecohumanism, FPT (2024 aprox.) |

- **Huecos declarados**: economía (X) **no instrumentada** (el mapa ya lo advierte); sin posición
  limpia en `tradicion-moral`/`social` pese al tradicionalismo de la doctrina (su contenido
  español es difuso). `dem-019` y `cul-013` son ecos parciales: el modelo institucional positivo de
  Dugin es orgánico y poco especificado, y `cul-013` (Hispanidad vs UE) es una proyección
  civilizacional análoga, no un enunciado literal del 4TP.
- **Mejores discriminantes**: **dr-019** (cooperación con Rusia / eurasianismo — lo más específico,
  separa 4TP del euroescepticismo genérico), **ue-001** (antiliberalismo anti-Bruselas) y **dr-024**
  (rechazo de la democracia liberal). El set actual del mapa [dr-019, dr-024, ue-001] es
  **excelente**: se confirma sin cambios.
- **Fuentes (cola humana)**: https://en.wikipedia.org/wiki/Aleksandr_Dugin ·
  https://ecohumanism.co.uk/joe/ecohumanism/article/download/6487/6656/15367 ·
  https://www.researchgate.net/publication/384363152 (firmar año) · obra primaria: A. Duguin,
  *La cuarta teoría política* (2009).

---

## 3. strasserismo (`strasserismo.json`) — antipluralista (ver ⚠) — commit `7ee6e04`

Ala anticapitalista y obrerista del nacionalsocialismo (Gregor y Otto Strasser): nacionalización
de banca y trusts + ultranacionalismo racial, antisemitismo y caudillaje.

| ítem | valor | calidad | fuente (fecha) |
|---|---|---|---|
| dr-001 | +2 | media | Wikipedia Gregor Strasser (2026) |
| izq-016 | +1 | baja | Wikipedia Strasserism (2026) |
| dr-002 | +2 | baja | Wikipedia Strasserism (2026) |
| cul-002 | +2 | media | Wikipedia Strasserism (2026) |
| lim-007 | +2 | media | Wikipedia Gregor Strasser (2026) |
| lim-001 | +2 | media | Wikipedia Strasserism (2026) |
| dr-024 | +2 | baja | Wikipedia Strasserism (2026) |

- **Diseño clave**: combina economía obrerista de polo izquierdo (dr-001, izq-016, dr-002) con
  exclusión racial (cul-002, lim-007) y autoritarismo (lim-001, dr-024) para que **una posición
  económica aislada no lo etiquete como izquierda** (norma del mapa).
- **Huecos / cautelas**: `izq-016` va a **+1** (no +2): las fuentes atestiguan nacionalización de
  banca y gran industria, pero enmarcada en «socialismo alemán» solidarista bajo caudillaje, no en
  la expropiación proletaria «sin indemnización» del enunciado. `dr-002` (preferencia nacional en
  empleo) es inferencia del obrerismo racial völkisch, calidad baja. Advertencia historiográfica
  recogida: Stachura sostiene que el «strasserismo de izquierdas» fue magnificado por Otto Strasser.
- **Mejores discriminantes**: **dr-001** (nacionalizar la banca — el eco anticapitalista que lo
  separa del fascismo/falangismo de mercado) y **lim-007** (Estado racial — lo separa de la izquierda
  real); el cruce dr-001 × lim-007 es su firma. Tercero: **cul-002** (nación por ascendencia, que lo
  separa incluso del falangismo, que rechaza el determinismo biológico). El set del mapa
  [dr-001, dr-002, lim-007] funciona; sugiero cul-002 en lugar de dr-002 para maximizar el corte.
- **Fuentes (cola humana)**: https://en.wikipedia.org/wiki/Strasserism ·
  https://en.wikipedia.org/wiki/Gregor_Strasser · https://en.wikipedia.org/wiki/Otto_Strasser ·
  https://www.britannica.com/biography/Gregor-Strasser · debate: ResearchGate «The Myth of
  Strasserite Socialism» (#388396879).

---

## 4. neonazismo (`neonazismo.json`) — **violenta** — commit `be174d4`

Tipo ideal doctrinal de la rearticulación posbélica del nacionalsocialismo: supremacismo racial,
antisemitismo, Estado racial, Führerprinzip, rehabilitación del régimen NS. Distinto de la derecha
radical electoral y del arquetipo aceleracionista terrorista (`aceleracionismo-neonazi.json`).

| ítem | valor | calidad | fuente (fecha) |
|---|---|---|---|
| lim-007 | +2 | media | Wikipedia ES Neonazismo (2026) |
| lim-005 | +2 | media | Wikipedia ES Neonazismo (2026) |
| lim-001 | +2 | media | Wikipedia ES Neonazismo (2026) |
| cul-002 | +2 | media | Wikipedia ES Neonazismo (2026) |
| dem-019 | +2 | media | Wikipedia ES Neonazismo (2026) |
| dr-024 | +2 | media | Ferreira, RECP (2019) |
| dr-025 | −1 | media | Ferreira, RECP (2019) |
| lim-006 | −2 | media | Wikipedia ES Neonazismo (2026) |

- `reglaPublicacion {6, 0.65, 92}` (suelo violenta {6, 0.65, 90} superado en umbral).
- **Cautelas de calibración**: `dr-025` va a **−1** (no −2) deliberadamente: el neonazismo glorifica
  la violencia del régimen que reivindica (rechaza el «nunca legítima»), pero se codifica en grado
  moderado para preservar la frontera con el arquetipo aceleracionista terrorista, que sí es −2
  (hace de la violencia armada su método principal). El propio ítem modela «entorno neonazi −1».
- **Huecos declarados**: economía (X) no instrumentada (economía neonazi corporativista/mixta, no
  codificada limpiamente aquí); `cul-002` es ítem español («antepasados españoles») usado como
  medida de la concepción étnica/de sangre de la pertenencia, no como enunciado literal sobre
  Alemania.
- **Advertencia legal-clínica**: art. 510 CP (discurso de odio; enaltecimiento/negación/
  trivialización grave del genocidio, 1-4 años), Circular FGE 7/2019; condena de Amanecer Dorado
  como organización criminal (Grecia, 2020); descriptiva, jamás operativa.
- **Mejores discriminantes**: **lim-007** (Estado racial / derechos por origen étnico — el definidor),
  **lim-005** (opositores sin derechos) y **dr-024** (autoritarismo preferible — el ítem mismo modela
  «neonazis +2», corte más nítido que dr-025, que aquí es solo −1). El set del mapa
  [lim-005, lim-007, dr-025] es válido; sugiero **dr-024 o cul-002 en lugar de dr-025** para un
  corte más fuerte, ya que dr-025 quedó moderado por la frontera con el aceleracionismo.
- **Fuentes (cola humana)**: https://es.wikipedia.org/wiki/Neonazismo ·
  https://www.boe.es/diario_boe/txt.php?id=BOE-A-2019-7771 ·
  https://cnnespanol.cnn.com/2020/10/07/lideres-del-grupo-neonazi-amanecer-dorado-en-grecia-fueron-declarados-culpables-por-dirigir-organizacion-criminal ·
  https://recyt.fecyt.es/index.php/recp/article/download/72190/html_126?inline=1 ·
  descartadas por propaganda: Metapedia, Hispanopedia.

---

## Recuentos y commits

- **4 fichas nuevas**, 29 posiciones totales (neorreacción 8, cuarta-teoría 6, strasserismo 7,
  neonazismo 8), todas sobre ítems existentes y vigentes.
- Sensibilidad: 1 violenta (neonazismo), 3 antipluralista (resto).
- `npm run validate:data`: **verde** (71 referencias doctrinales; +4 respecto a la base).
- Commits atómicos por ficha (base `9ed70f1`):
  - neonazismo — `be174d4`
  - strasserismo — `7ee6e04`
  - cuarta-teoria-politica — `e9a9782`
  - neorreaccion — `613d745`
- **Sin push, sin git config, sin tocar mapa/items/TODO/candado/version/tests/web.**
- **Pendiente del integrador**: (1) armonizar `sensibilidad` de strasserismo en el mapa
  (violenta→antipluralista); (2) firmar años de los dos papers académicos de Dugin;
  (3) cablear las 4 anclas (referenciaId + coordenadas + paso a instrumentada cuando proceda).
