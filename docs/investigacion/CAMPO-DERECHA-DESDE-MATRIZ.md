# Campo de la derecha española — mapeo desde la matriz del propietario

**Agente ejecutor de datos (Opus, máximo esfuerzo). Corte: 2026-07-12. Rama: `worktree-agent-a6e769556ce8f55e2`.**

Encargo: mapear el campo de la derecha usando la matriz de investigación del propietario (17 entidades × 29 subejes, 493 filas) **solo como hoja de pistas** —nunca como fuente ni copiando sus coordenadas—, verificando fila a fila por búsqueda plural (WebFetch bloqueado; solo pasajes reproducidos en extractos o ≥2 fuentes independientes) y mapeando a los ítems propios con disciplina de signo.

## 0. Método y aislamiento

- Trabajo exclusivo en el worktree aislado. Solo se han tocado ficheros de `data/partidos/` (permitido). **Cero deleciones** en `git diff --numstat`: no se ha cambiado ningún valor existente; todo son altas. No se ha tocado `data/items/*`, `data/inventario-canonico-mapeo.json`, `data/version.json`, `data/modulos.json`, `data/convocatorias/*`, `web/`, `tests/` ni `docs/TODO-*`.
- La matriz del propietario se usó para (a) sus URLs y catálogo de fuentes y (b) su triaje A/M/B/ND (dónde hay evidencia primaria). Sus puntuaciones NO se copiaron como posiciones.
- Verificación delegada a 5 subagentes de solo-búsqueda con contrato anti-alucinación (distinguir cita literal de paráfrasis; ≥2 fuentes; no decidir signo). El mapeo ítem-a-ítem y el signo los decidió este agente.

## 1. Commits atómicos (esta rama)

| Hash | Contenido |
|------|-----------|
| `ca3032f` | VOX: +5 posiciones (soc-002, soc-004, cul-001, cul-003, cul-013) |
| `3f2c6d0` | Ciudadanos: +9 posiciones (moral, económica, territorial, institucional) |
| `2b15a67` | FE-JONS: +7 posiciones doctrinales |
| `5525172` | España 2000 (+3) y Democracia Nacional (+4) |
| `f441b59` | Noviembre Nacional: clasificación reforzada + dem-011 |
| `cb6d967` | El Pi – Proposta per les Illes: alta del perfil (9 posiciones) |

(El informe se commiteará por separado tras estos.)

## 2. Tabla antes/después por entidad

| Entidad | id fichero | Antes | Después | Δ | Acción |
|---|---|---|---|---|---|
| Partido Popular | `pp` | 48 | 48 | 0 | Sin alta; solo banderas de revisión (§7) |
| VOX | `vox` | 63 | 68 | +5 | Identidad + núcleo social |
| Se Acabó La Fiesta | `salf` | 22 | 22 | 0 | Ya sólido; sin huecos limpios nuevos |
| Ciudadanos | `ciudadanos` | 9 | 18 | +9 | Gran ampliación (era el mayor hueco) |
| FE-JONS | `fe-jons` | 18 | 25 | +7 | Doctrina falange.es verificada |
| España 2000 | `espana-2000` | 14 | 17 | +3 | UE, OTAN, economía estatista |
| EAJ-PNV | `eaj-pnv` | 46 | 46 | 0 | Ya muy completo |
| Junts | `junts` | 36 | 36 | 0 | Ya completo |
| UPN | `upn` | 25 | 25 | 0 | Ya completo |
| Coalición Canaria | `coalicion-canaria` | 42 | 42 | 0 | Ya muy completo |
| Partido Libertario | `p-lib` | 21 | 21 | 0 | 21/21 alta; sin citas, pero coherente |
| Aliança Catalana | `alianca-catalana` | 43 | 43 | 0 | Ya completo; 1 posible error de signo (§7) |
| Democracia Nacional | `democracia-nacional` | 14 | 18 | +4 | Territorial, identidad, OTAN |
| Noviembre Nacional | `nucleo-nacional` | 23 | 24 | +1 | + clasificación (continuidad + advertencia) |
| **El Pi** | `el-pi` | — | **9** | **NUEVO** | Alta del perfil |
| Núcleo Nacional | (anexo) | — | — | — | NO es partido → no entra en data/partidos (§5) |
| Atomwaffen / Spanish Waffen | (anexo) | — | — | — | Propuesta de texto, NO aplicada (§6) |

**Total: +38 posiciones, +1 partido.** (Coincide con el fallo esperado del validador del TODO: 1410/1372 posiciones, 66/65 partidos.)

## 3. Qué se verificó y qué quedó hueco (por entidad con altas)

### Ciudadanos (9→18) — el mayor hueco cubierto
Todas verificadas con prensa de referencia o programa:
- `lib-017` +2 eutanasia (votó a favor de la LO 3/2021, en clave de libertad — El Español, 2020-12-17).
- `lib-012` +2 / `der-024` +2 gestación subrogada altruista (proposiciones 2017/2019/2023 — El Independiente, Servimedia).
- `ter-004` +2 castellano lengua vehicular (seña fundacional — Rivera, Infolibre 2019).
- `eco-009` +2 suprimir sucesiones (bonificación 100%, rechazada en Congreso — Público 2018).
- `lib-020` +2 mochila austriaca / contrato único (El Economista 2018).
- `lib-008` +2 liberalización VTC (único partido a favor — Xataka Magnet).
- `lib-016` +2 suprimir diputaciones (programa 2019 — El Independiente).
- `fem-001` −1 ley trans (abstención y luego en contra; reparos a la autodeterminación registral — El Español 2022).

**Huecos documentados (Cs):** `lib-009`/`fem-014` (cannabis) → **NO codificado**: el ancla del banco atribuye a Cs una «ley de regulación integral del cannabis», pero la verificación la desmiente (fue de **Podemos/Más País**; Cs solo apoyó cannabis **medicinal**). Ver §7. `lib-007` colegiación → NO hallada fuente que nombre a Cs. `sd-002` gasto defensa, `eus-002` cupo → probables pero sin fuente datada limpia; quedan hueco.

### VOX (63→68)
- `soc-002` +2 devolución prioritaria (De Meer, «deportaciones masivas» — El Debate 2025-07-09).
- `soc-004` −2 (único grupo en contra de admitir a trámite la ILP de regularización, abril 2024 — El Español).
- `cul-001` +2 asimilación (integración condicionada a respetar «la identidad, costumbres y tradiciones de España» — Valencia Plaza 2026).
- `cul-003` +2 amenaza cultural / reemplazo («preservar la identidad española» — Maldita.es).
- `cul-013` +2 Iberosfera / Foro de Madrid frente a la UE (AECPA, CIDOB).
- **Hueco (VOX):** `cul-002` (nación étnica) dejado sin dato: VOX prioriza el marco hispanista-cultural, no la sangre, aunque su discurso reciente se endurece hacia los latinos; un «0» carecería de evidencia positiva limpia.

### FE-JONS (18→25) — doctrina nacionalsindicalista de falange.es
- `cul-013` +2 Hispanidad (España «eje del mundo hispánico», punto 3; liderar «área de influencia hispánica»).
- `cul-001` +2 asimilación cultural / homogeneidad.
- `cul-002` −1 **no-etnicismo** (nación como «unidad de destino en lo universal», no de raza; hispanidad cultural que integra a hispanoamericanos). Nuance que **separa a la Falange del etnicismo de DN/E2000**. Calidad baja: doctrina falangista bien establecida, pero sin cita verbatim reciente.
- `der-004` +2 proteccionismo (economía nacional protegida).
- `der-005` +2 unidad de España (cerrar parlamentos autonómicos).
- `mon-001` +2 **republicana antiborbónica** (aspira a abolir la monarquía parlamentaria; verificado como «netamente republicano»).
- `fem-005` +2 derogar eutanasia (provida «de la concepción a la muerte natural»).
- **Huecos (FE-JONS):** `geo-014` servicio militar obligatorio → NO codificado (la web actual defiende «defensa nacional / milicia» pero no la conscripción explícita); no forzado. Confirmada la colocación **económica a la izquierda del centro** (nacionalización de banca ya presente en `dr-001`, `lab-016`; añadido `der-004`): el aviso no bloqueante de `validate:data` («fe-jons economico −100, 4 posiciones ±2») es el comportamiento correcto según el encargo (falangismo dibujado por sus nacionalizaciones), no un sesgo de bandera.

### España 2000 (14→17)
- `ue-001` +2 euroescepticismo/antiglobalización («el Estado Nacional es la única defensa contra la globalización»).
- `def-002` +2 salida de la OTAN (defensa europea «de Portugal a Rusia»).
- `der-001` −2 (modelo estatista: banca pública, empresas nacionales controladas por el Estado; opuesto al Estado mínimo).
- **Hueco (E2000):** `dr-010` (salida del euro) NO codificado — es de DN, no articulado por E2000. Su economía a la izquierda del centro (matriz X ≈ −37) queda reflejada en `lab-016`, `dr-001`, `der-001`.

### Democracia Nacional (14→18)
- `ter-002` −2 antiseparatismo (unidad de España frente a nacionalismos periféricos).
- `cul-002` +2 nación étnica (ius sanguinis).
- `cul-003` +2 amenaza cultural / reemplazo (Público).
- `def-002` +1 antiatlantismo/pro-Rusia (Liga Soberanista, San Petersburgo 2025).
- **Hueco (DN):** `dr-005` mezquitas/islam **NO codificado** — la verificación no lo atribuye a DN, sino a **España 2000 y a Plataforma per Catalunya**; no forzado (ver §7). Economía **ND** (matriz): sin posiciones económicas.

### El Pi – Proposta per les Illes (NUEVO, 9)
Regionalismo balear de centro, no independentista, constitucionalista, pactista, europeísta. Perfil concentrado en su dimensión real (territorial/institucional):
- `nac-009` +2 pactismo transversal («dispuestos a investir a Prohens (PP) o a Armengol (PSOE)» — Melià, elDiario 2023).
- `lib-015` +2 apoyo a Madrid de cualquier color por inversiones (cogobierna con PP y con Més).
- `ter-003` +2 concierto económico balear.
- `ter-001` −2 más autogobierno (no devolver competencias).
- `der-005` −1 balearismo (no antepone la unidad de España a la reivindicación autonómica).
- `dem-012` +2 / `dem-008` +1 constitucionalismo y pluralismo.
- `pop-003` +1 anti-«sucursalismo» de los partidos estatales.
- `ue-001` −1 europeísmo (coalición CEUS 2024).
- **Huecos (El Pi):** economía (perfil liberal difuso, sin posiciones verificables), moral/social (evita la guerra cultural: NO ENCONTRADO), y **lengua/turismo/demografía** (defiende el catalán con unidad de la lengua y la contención demográfica, pero **el banco no tiene ítems baleares** que lo capturen). Documentado como hueco estructural, no rellenado por estereotipo.

## 4. Noviembre Nacional / Núcleo Nacional (anexo)

- El fichero `data/partidos/nucleo-nacional.json` tiene `id: "nucleo-nacional"` pero `nombre: "Noviembre Nacional"`: **representa al PARTIDO** Noviembre Nacional (registrado 2026-02-10), no a la asociación. **Propuesta al integrador:** renombrar el id a `noviembre-nacional` para evitar confusión con la asociación (afecta al recuento canónico; decisión del integrador).
- **Clasificación reforzada** (todo atribuido, nunca sentencia judicial): (1) neonazismo [ya existía]; (2) **continuidad orgánica con Núcleo Nacional** — registrado por un dirigente de la asociación, mismo domicilio (Valladolid) y símbolos, grupo que «une a nazis, franquistas y falangistas» (elDiario.es); (3) **advertencia clínica** — etiquetas atribuidas por prensa/investigadores, entidad **investigada por presuntos delitos de odio (investigada ≠ condenada)**, «riesgo elevado de extremismo violento» según expertos (Cadena SER).
- **Corrección al encargo:** quien **registró** el partido es **Enrique Lemus** (veterano de Núcleo Nacional, con vínculos previos a Democracia Nacional); **Iván Rico** es el **portavoz** visible, no el registrante. La continuidad se sostiene igual.
- Añadida `dem-011` +2 (rechazo del «régimen del 78» / sustitución del sistema parlamentario). **Economía NO cargada** (matriz ND).
- **Núcleo Nacional (asociación):** NO se crea como partido separado (evita doble recuento; su vehículo partidista es Noviembre Nacional).

## 5. Propuesta — referencia `aceleracionismo-neonazi` (Atomwaffen / Spanish Waffen). NO APLICADA.

La referencia **ya incorpora** el artículo de elDiario.es y la célula aceleracionista detectada por Interior (2025-12). Verificado por búsqueda: intento de sección española «Spanish Waffen» (Telegram, ~50 participantes, hacia **2020-2021**), difusión de instrucciones para armas/explosivos y llamamientos a la acción, **sin acciones reivindicadas en España** hasta la publicación (el propio artículo lo subraya; el titular usa «pretendía»).

**Texto propuesto para añadir al final de `advertencia`** (respeta la cautela obligatoria):
> «En España, la investigación de elDiario.es (diciembre de 2025, Q. Badia y M. Ramos) documentó un intento de implantación —un grupo de Telegram «Spanish Waffen» de una cincuentena de participantes, activo hacia 2020-2021, con difusión de instrucciones para fabricar armas y explosivos y llamamientos a la acción—, pero el propio artículo subraya que el grupo no había reivindicado ninguna acción en España hasta su publicación; conviene conservar esa cautela y no presentar el intento como una organización operativa consumada.»

No se crea perfil ni referencia nueva (es red violenta, no partido ni doctrina nueva).

## 6. Propuestas de cambio de valor / banderas de signo (NO aplicadas; el encargo prohíbe tocar valores existentes)

- **Aliança Catalana `nac-006` = −1 → probable error de signo.** El ítem («bloquear la gobernabilidad de España es legítimo para forzar la soberanía») espera AC +2 (junto a Junts/CUP); AC es unilateralista confrontacional (`nac-001` +2, `nac-002` +2). El −1 parece invertido. **Recomiendo revisar a +1/+2.** (No editado.)
- **VOX `dr-003` = 1 → 2.** El propio banco actualizó su hipótesis a VOX +2 por la «remigración masiva» de De Meer (julio 2025, 7-8 M incluidos descendientes; euronews, Público). Recomiendo actualizar.
- **VOX `eco-008` = −1 vs banco +1** (pensiones IPC aunque suba cotizaciones): tensión real entre chovinismo de bienestar (+) y antifiscalismo (−). El −1 pondera el rechazo a subir cotizaciones; defendible pero conviene revisar contra evidencia.
- **VOX `eco-010` = 2 vs banco 0** (abaratar despido): el banco rebajó a 0 por el giro obrerista retórico. Revisar.
- **PP `der-014` = 2 vs banco 0** (mantener conciertos forales): +2 es fuerte para el PP oficial (ambivalente sobre el cupo). Revisar.
- **PP `eco-009` = 1 vs banco +2** (suprimir sucesiones): el PP lo bonifica al 99% donde gobierna; +1 puede quedarse corto.
- **Noviembre Nacional — posiciones económicas existentes** (`eco-002` +1, `eco-014` −1, `der-001` −2, `izq-005` −2, `izq-016` −2, `dr-002` +1): la matriz codifica su economía como **ND** y las fuentes se **contradicen** (Nortes 2024 lo llama «procapitalista, libre empresa, fiscalidad baja»; su propia adscripción tercerposicionista/«modelo comunitario» apunta a lo contrario). **Recomiendo que el integrador revise o retire estas posiciones económicas** por descansar en una caracterización disputada. (No editadas.)

## 7. Discrepancias con la matriz/pistas del propietario (verificación vs. pista)

- **Cannabis de Ciudadanos:** la pista del banco (Cs registró ley integral de cannabis) es **incorrecta**; fue Podemos/Más País. Cs solo apoyó el cannabis medicinal. → No codificado `lib-009`/`fem-014` para Cs.
- **DN e islam/mezquitas:** la caracterización antiislam de la campaña anti-mezquita corresponde a **E2000 y PxC**, no a DN. → No codificado `dr-005` para DN.
- **El Pi no es región ultraperiférica:** Baleares es región **insular** (art. 174 TFUE); solo **Canarias** es RUP (art. 349). Corregido en el perfil (no se afirma ultraperiferia).
- **Noviembre Nacional — registrante:** Enrique Lemus (no Iván Rico); «silencio administrativo positivo» es afirmación **disputada** del ministro Marlaska, no hecho cerrado (el `registroMir` existente lo da por hecho; conviene matizarlo).
- **Atomwaffen — fechas:** actividad documentada **2020-2021**, no 2020-2022.
- En lo demás, la verificación **confirma la dirección** de la matriz del propietario para las entidades trabajadas; no se detectaron contradicciones de signo entre mi codificación verificada y la orientación de su matriz.

## 8. Cola de URLs para verificación humana (el integrador re-verifica todo)

Fuentes primarias/de prensa usadas en las altas (consultado 2026-07-12):
- VOX: eldebate.com/.../rocio-meer...deportaciones-masivas..._315265.html · elespanol.com/.../20240409/partidos-excepto-vox-aprueban-ilp... · valenciaplaza.com/.../vox-pide...prioridad-nacional... · maldita.es/buloteca/.../vox-plantea...expulsion-masiva...identidad-espanola · aecpa.es/.../vox-la-iberosfera-y-el-foro-de-madrid...
- Ciudadanos: elespanol.com/.../20201217/congreso-ley-eutanasia-cs... · elindependiente.com/espana/2023/03/30/ciudadanos-registra...gestacion-subrogada/ · servimedia.es/.../gestacion-subrogada-garantista-altruista/3655527 · infolibre.es/.../rivera...lengua-vehicular... · publico.es/.../congreso-rechaza-suprimir-impuesto-sucesiones... · eleconomista.es/.../9216961/06/18/...contrato-unico-y-mochila-austriaca... · magnet.xataka.com/.../taxi-uber-licencias-vtc · elindependiente.com/politica/2019/03/14/las-diez-medidas-clave... · elespanol.com/.../20221006/ley-trans...abstencion-ciudadanos/
- FE-JONS: falange.es/nuestras-ideas/ (verificar cada elemento doctrinal; se citó la página doctrinal general, no sub-URLs específicas). Refuerzo académico: es.wikipedia «Nacionalsindicalismo».
- España 2000: espana2000.es/programa-politico/ (verificar OTAN, UE, banca pública).
- Democracia Nacional: es.wikipedia.org/wiki/Democracia_Nacional · publico.es/.../partido-xenofobo-democracia-nacional-refuerza-vinculos-ultras-rusos...
- Noviembre Nacional: eldiario.es/.../nucleo-nacional-grupo-une-nazis-franquistas-falangistas_1_12487588.html · cadenaser.com/.../quien-esta-detras-de-nucleo-nacional...riesgo-elevado-de-extremismo-violento...
- El Pi: eldiario.es/illes-balears/.../josep-melia...investir-prohens-pp-armengol-psoe... · ultimahora.es/.../2025/07/15/2430893/...financiacion-propio... · el-pi.com/es/quienes-somos/ · el-pi.com/es/el-pi-aprova-anar-a-les-eleccions-europees... · es.wikipedia.org/wiki/El_Pi-Proposta_per_les_Illes

## 9. Estado de las puertas verdes (en este worktree)

| Puerta | Resultado |
|---|---|
| `validate:data` | ✓ Datos válidos (68 partidos). Avisos no bloqueantes (cobertura atlas; sesgo-bandera fe-jons/vox, esperados). |
| `validate:evidence-groups` | ✓ Todos los pasajes citados con grupo canónico. (2 citas omitidas del mapa son **preexistentes**, ajenas a estas altas.) |
| `audit:partidos` | ✓ EXIT 0 (diagnósticos «insuficiente/provisional» informativos, no fallos). |
| `audit:electoral` | ✓ EXIT 0 (contexto coherente; El Pi no enlazado a convocatoria, como otros extraparlamentarios). |
| `audit:atlas` | ✓ EXIT 0. |
| `validate:atlas-contract` | ✓ EXIT 0. |
| `validate:todo-inventory` | ✗ **Fallo esperado y del integrador**: recuento contractual (1410/1372 posiciones, 66/65 partidos, falta `el-pi` en el manifiesto TODO y en `inventario-canonico-mapeo.json`). El encargo lo anticipa; no se tocan esos ficheros. |

`audit:anexo` **no existe** como script en `package.json` (las auditorías reales son `audit:atlas`, `audit:partidos`, `audit:electoral`, `validate:atlas-contract`).
