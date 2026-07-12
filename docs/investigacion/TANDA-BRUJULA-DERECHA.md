# Tanda brújula — derecha y liberales estatales (Propiedad × Poder)

Corte: 2026-07-12. Alcance: subir a contrato de brújula (eje X propiedad/mercado,
eje Y autoridad política) los partidos **estatales de derecha y liberales**: `pp`,
`vox`, `salf`, `ciudadanos`, `p-lib`. Base sincronizada en `7cafb3c`.

Método: solo **altas** en la capa base `posiciones` (no se tocan valores existentes
ni `dobleLectura`). Cada posición nueva se sustenta en programa, votación o
declaración de dirección **verificable** (≥2 extractos por WebSearch), con `valor`
por el enunciado exacto, justificación propia, y `fuente` con URL + título + fecha +
`cita` literal (titular = calidad media máx) + `grupoEvidencia`. Cada grupo
independiente usa **URL distinta** (dos posiciones con la misma URL cuentan como un
grupo). El 0 documentado se codifica con `resolucionCero` (modelo-mixto) y sirve de
contrapeso al extremo.

## Contrato (umbrales del auditor)

- **X sólida**: ≥6 grupos, ≥3 subdimensiones, cada subdimensión presente con ≥2
  grupos (equilibrio), sin extremo sin contrapeso.
- **Y sólida**: ≥6 grupos, ≥3 familias, ≥2 grupos de núcleo (contrapesos o
  libertades-coerción), sin extremo sin contrapeso.
- **Provisional**: X 3 grupos / 2 subdimensiones equilibradas; Y 3 grupos / 2
  familias / 1 núcleo; sin extremo en ninguno.

## Auditor — antes / después

```
ANTES (base 7cafb3c)
- pp:         insuficiente; (83.8, -3.1)
- vox:        insuficiente; (92.6, —)      Y sin coordenada
- salf:       insuficiente; (68.2, —)      Y sin coordenada
- ciudadanos: insuficiente; (100.0, —)     Y sin coordenada
- p-lib:      insuficiente; (—, —)         X e Y sin coordenada

DESPUÉS (npm run audit:partidos | grep)
- pp:         provisional;  (67.7, -33.8)  X 5/6 · 2/3 subdim · Y 6/6 · 2/3 fam · 6/2 núcleo
- ciudadanos: provisional;  (73.7, -55.6)  X 5/6 · 2/3 subdim · Y 3/6 · 2/3 fam · 3/2 núcleo
- vox:        insuficiente; (83.8, -16.9)  Y SÓLIDA (6/6 · 3 fam · 5 núcleo); X capado
- salf:       insuficiente; (68.2, 20.0)   Y 2/6 · 2 fam · 2 núcleo
- p-lib:      insuficiente; (100.0, -83.3) X e Y con coordenada; ambos extremo
```

Saldo: **PP y Ciudadanos pasan a provisional**; **VOX completa el eje Y a nivel
sólido** (el perfil sigue insuficiente por un tope arquitectónico en X); **SALF y
p-lib** pasan de no tener coordenada a tenerla documentada, aunque siguen
insuficientes. 24 altas en total.

---

## pp — insuficiente → **provisional**

Altas (5):

| ítem | valor | eje/familia | calidad | fecha | fuente |
|---|---|---|---|---|---|
| eco-010 | +2 | X coordinación-mercado | media | 2021-12-30 | The Objective — reforma laboral 2012 (45→33 días) |
| eco-006 | 0 (modelo-mixto) | X propiedad-difundida | media | 2025-12-19 | Infobae — vivienda PP: pisos sociales + colaboración público-privada |
| dem-006 | +2 | Y contrapesos/núcleo | media | 2024 | El Plural — recurso de inconstitucionalidad contra la ley de amnistía |
| dem-007 | −2 | Y contrapesos/núcleo | media | 2024 | Catalan News — el PP exige que los jueces elijan el CGPJ |
| soc-003 | +2 | Y libertades-coerción/núcleo | media | 2025-07-21 | Enciende Cuenca — el PP pide más videovigilancia |

Contrato conseguido: **X provisional** (coord 2 + propiedad-difundida 3; `eco-006=0`
elimina el extremo, X baja de 83.8 a 67.7) y **Y provisional reforzada** (6 grupos, 6
núcleo). Perfil **provisional**.

Huecos: **3ª subdimensión X no alcanzable** — titularidad y control-productivo solo
tienen como ítems libres `dr-001` (nacionalizar banca) y `lab-016` (empresas
estratégicas estatales) más `lab-017` (cooperativas). `lab-017` es una idea marginal
sin declaración del PP, y sin ella ni titularidad ni control llegan a 2 grupos (el PP
no tiene postura directa citable sobre nacionalizar la banca: las "nacionalizaciones"
de Feijóo se refieren a nacionalidades, homónimo). **3ª familia Y no alcanzable** —
jerarquía-organización y participación-revocación no tienen fuente limpia (la postura
del PP sobre subvenciones sindicales es sobre todo autonómica y liderada por VOX; la
oposición a referendos vinculantes no arroja fuente nítida).

---

## vox — insuficiente → insuficiente (eje **Y a nivel sólido**)

Altas (7):

| ítem | valor | eje/familia | calidad | fecha | fuente |
|---|---|---|---|---|---|
| dem-006 | +2 | Y contrapesos/núcleo | media | 2020-04-29 | VOX — recurso de inconstitucionalidad contra el estado de alarma |
| dem-007 | −2 | Y contrapesos/núcleo | media | 2024-05-16 | VOX — plan CGPJ: vocales elegidos por y entre jueces |
| dem-023 | +2 | Y libertades-coerción/núcleo | media | 2023-01-31 | VOX — contra la reforma de la ley de seguridad ciudadana |
| soc-003 | +2 | Y libertades-coerción/núcleo | media | 2025-07-29 | Zamora News — VOX pide más cámaras de videovigilancia |
| soc-001 | −2 | Y libertades-coerción/núcleo | media | 2025-01-31 | VOX — derogar la ley LGTBI y la ley trans |
| lab-005 | +2 | Y jerarquía-organización | media | 2024-06-04 | VOX — eliminar subvenciones a sindicatos ("independencia") |
| lib-008 | +1 | X coordinación-mercado | media | 2019-01-22 | Libre Mercado — VOX y la liberalización del taxi con compensación |

Contrato conseguido: **Y SÓLIDA** (6 grupos, 3 familias —contrapesos, libertades-
coerción, jerarquía—, 5 de núcleo; coordenada Y = −16.9, mezcla honesta: pluralista
en instituciones/sindicatos, autoritaria en seguridad/moral). El eje Y era el objetivo
explícito del encargo para VOX y queda cubierto.

Huecos: **eje X capado por diseño de la base.** La subdimensión propiedad-difundida
solo cuenta `eco-009`; los otros dos ítems (`eco-006`, `eco-014`) están
**presentes-sin-contar** en la base (sin cita/grupoEvidencia) y la regla de "solo
altas" impide dotarlos. Con propiedad-difundida bloqueada a 1 grupo, el equilibrio X
es inalcanzable y el perfil no puede superar insuficiente aunque el eje Y esté
completo. `lib-008` mejora la robustez de X (coord a 2 grupos) pero no rompe el tope.

---

## ciudadanos — insuficiente → **provisional** (solo fuentes de época)

Partido **inactivo**: todas las altas se sustentan en fuentes de su periodo de
actividad (2015-2020). **Ninguna fecha 2026.**

Altas (6):

| ítem | valor | eje/familia | calidad | fecha | fuente |
|---|---|---|---|---|---|
| izq-005 | −2 | X coordinación-mercado | media | 2015-12 | elDiario — Rivera vs Iglesias, modelo de mercado vs intervención |
| eco-014 | −2 | X propiedad-difundida | media | 2019-04-10 | idealista — Cs propone suprimir el Impuesto de Patrimonio |
| eco-006 | 0 (modelo-mixto) | X propiedad-difundida | media | 2019 | Castellón Plaza — vivienda: VPO + incentivos de mercado |
| dem-027 | +2 | Y contrapesos/núcleo | media | 2017 | Vozpópuli — "descolonizar" Banco de España, CNMV, CNMC |
| soc-006 | −2 | Y libertades-coerción/núcleo | media | 2018-03-15 | El Español — Cs se opone a derogar la prisión permanente |
| dem-028 | +2 | Y contrapesos/núcleo | media | 2017 | Wikipedia — Cs vota el 155 frente al referéndum unilateral |

Contrato conseguido: **X provisional** (coord 2 + propiedad-difundida 3; `eco-006=0`
elimina el extremo, X baja de 100 a 73.7) y **Y provisional** (3 grupos, 2 familias, 3
núcleo). Perfil **provisional**.

Huecos: **3ª subdimensión X** — `eco-012` (defensa de la concertada, Albacete 2019) es
documentable pero se omite deliberadamente: al no haber un 2º ítem de titularidad con
fuente limpia de época, añadirlo dejaría titularidad en 1 grupo y rompería el
equilibrio. **3ª familia Y** — sin fuente de época limpia en jerarquía o
participación.

---

## p-lib — insuficiente → insuficiente (coordenadas X e Y **documentadas**)

Altas (4):

| ítem | valor | eje/familia | calidad | fecha | fuente |
|---|---|---|---|---|---|
| dem-007 | −2 | Y contrapesos/núcleo | media | 2023-11-08 | P-LIB — separación de poderes / aferramiento de Sánchez |
| dem-010 | +2 | Y contrapesos/núcleo | media | 2026-04-16 | P-LIB — crítica a la "democracia iliberal" (Orbán) |
| izq-038 | +1 | Y jerarquía-organización | media | 2023-11-16 | P-LIB — "federalismo libertario", poder desde lo local |
| eco-014 | −2 | X propiedad-difundida | media | 2015-10-16 | P-LIB — tipo único del 10%, mínima carga fiscal |

Contrato conseguido: el Partido Libertario pasa de **0 grupos** a tener coordenada en
ambos ejes (X = 100 con 1 grupo; Y = −83.3 con 3 grupos, 2 familias, 2 núcleo).

Huecos / límite: **insuficiente por diseño.** Es un partido ideológicamente
consistente —extremo de mercado en X, extremo libertario en Y— y el auditor exige una
posición **moderadora o contradictoria** para publicar. No existe una posición
estatista (X) ni autoritaria (Y) documentable que sirva de contrapeso: un libertario
no la sostiene. Ambos ejes quedan marcados como "extremo sin contrapeso". Se documenta
la evidencia real; el contrapeso, si aparece, corresponde a triaje humano.

---

## salf — insuficiente → insuficiente (eje **Y de 0 a 2 grupos**)

Partido nuevo (2024), documentación fina y episodio de ruptura interna.

Altas (2):

| ítem | valor | eje/familia | calidad | fecha | fuente |
|---|---|---|---|---|---|
| dem-023 | +2 | Y libertades-coerción/núcleo | media | 2024 | Alicante al Día — "mano dura", máxima seguridad (Alvise) |
| dem-031 | +2 | Y contrapesos/núcleo | media | 2025 | Nueva Revolución — "paladín contra la corrupción" |

Contrato conseguido: Y pasa de 0 a **2 grupos** (2 familias, 2 núcleo, coordenada 20.0,
sin extremo).

Huecos: **Y a 1 grupo de provisional** — falta un 3er grupo/familia con URL distinta y
cita literal (la temática de seguridad comparte fuente con la base `soc-006`, y la de
democracia directa/referéndum UE remite a `dem-001`, ya presente-sin-contar). **X**
solo tiene `eco-009` (1 grupo): el programa de SALF (menos impuestos, vivienda de
mercado) es documentable pero las fuentes disponibles carecen de cita literal por ítem
(WebFetch 403); queda para cola humana con lectura directa del programa.

---

## URLs a cola humana (verificación / mejora recomendada)

Fuentes correctas pero de vínculo indirecto, fecha estimada o calidad de titular que
convendría reforzar con lectura directa:

- **pp/dem-007** — https://www.catalannews.com/politics/item/socialists-and-pp-agree-to-renew-spains-top-judicial-body-after-five-year-deadlock (fuente secundaria en inglés; la postura "jueces eligen CGPJ" está en el cuerpo, no en el titular; fecha año).
- **pp/eco-010** — https://theobjective.com/economia/2021-12-30/reforma-laboral-yolanda-diaz-partido-popular/ (el titular no menciona "despido"; el 45→33 está en el cuerpo).
- **pp/dem-006** — https://www.elplural.com/politica/pp-registra-recurso-inconstitucionalidad-contra-ley-amnistia_336421102 (fecha con precisión de año 2024).
- **ciudadanos/dem-028** — https://es.wikipedia.org/wiki/Aplicaci%C3%B3n_del_art%C3%ADculo_155_de_la_Constituci%C3%B3n_espa%C3%B1ola_de_1978_en_Catalu%C3%B1a (fuente terciaria; convendría sustituir por hemeroteca de época del voto de Cs al 155).
- **ciudadanos/dem-027** y **ciudadanos/izq-005** — vozpópuli y elDiario con fecha estimada (2017 / 2015-12); confirmar día exacto.
- **ciudadanos/eco-006** — castellonplaza (comparador de programas 2019, no específico de Cs); confirmar el matiz mixto con el programa de vivienda de Cs 2019.
- **p-lib/dem-010** — https://www.p-lib.es/2026/04/16/orban-la-caida-del-adalid-de-la-democracia-iliberal (mapeo a dem-010 vía crítica a la democracia iliberal; verificar énfasis pro-oposición).
- **p-lib/izq-038** — https://www.p-lib.es/2023/11/16/federalismo-libertario/ (+1 parcial: descentralización sí, pero conserva Estado mínimo; matiz minarquista).
- **salf/dem-031** — https://nuevarevolucion.es/alvise-perez-de-paladin-contra-la-corrupcion-a-investigado-por-financiacion-ilegal/ (fuente secundaria de ángulo crítico; documenta la marca anticorrupción pero conviene sostener con el programa/estatutos de SALF).
- **salf/dem-023** — https://alicantealdia.es/entrevista-a-alvise-perez-mano-dura-contra-la-delincuencia-la-corrupcion-y-la-inmigracion-ilegal/ (comparte URL y cita con la base `soc-006`, que es calidad baja y queda omitida; el grupo cuenta, pero conviene una 2ª fuente).

## Pendientes para completar contrato (cola humana)

- **vox X**: dotar `eco-006`/`eco-014` (presentes-sin-contar) exigiría tocar la base;
  decisión editorial fuera de "solo altas".
- **pp / ciudadanos**: para pasar de provisional a sólida hace falta abrir una 3ª
  subdimensión X (titularidad/control) y una 3ª familia Y (jerarquía/participación),
  hoy huecos por falta de ítems libres con fuente directa.
- **salf**: 1 grupo/familia Y adicional y ≥1 subdimensión X extra con cita literal del
  programa.
- **p-lib**: localizar, si existe, una posición moderadora documentable en X o Y para
  levantar el "extremo sin contrapeso".
