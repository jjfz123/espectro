# Tanda derecha-independentistas — drenaje del campo INDEPENDENTISTA/INSULAR

**Agente ejecutor de datos (Opus, máximo esfuerzo). Corte: 2026-07-12. Rama: `worktree-agent-a0a06dab884cded40`.**

Encargo: drenar los huecos eje-entidad del campo INDEPENDENTISTA/INSULAR de la matriz del propietario para tres entidades — **El Pi** (16 ejes), **Junts** (13) y **Aliança Catalana** (9) = **38 huecos**. La matriz es hoja de pistas: sus puntuaciones −100..100 y calidades A/M **no se copian**; el valor (−2..+2) se decide por el enunciado exacto del ítem propio y la evidencia verificada.

## 0. Base sincronizada y aislamiento

- **Base fresca confirmada: `70843d4`.** El worktree se creó desde `c42e406` (ancestro de `70843d4`), donde `data/partidos/el-pi.json` aún no existía. Antes de escribir nada se ejecutó `git reset --hard 70843d4` sobre la rama del worktree, dejando HEAD y árbol idénticos a la base fresca (más limpio que un checkout parcial: no queda divergencia y el diff de triaje es mínimo). No hizo falta un commit de sincronización porque no había nada que reconciliar y no se había escrito aún. Verificado: los tres ficheros coincidían byte a byte con `70843d4`; `el-pi` con 9 posiciones, `junts` 36, `alianca` 43; `alianca nac-006 = −1` intacto.
- Trabajo exclusivo en el worktree aislado. Solo se han tocado los tres ficheros permitidos de `data/partidos/` y este informe nuevo. **Cero deleciones**: ningún valor existente se ha cambiado; todo son altas. No se ha tocado `data/items/*`, `data/inventario-canonico-mapeo.json`, `data/version.json`, `data/modulos.json`, `data/convocatorias/*`, `data/referencias/*`, `web/`, `tests/` ni `docs/TODO*`/`docs/AUDITORIA*`. Sin `git config`, sin `git push`.

## 0-bis. Limitación de red (afecta a la calidad de toda la tanda)

- **WebFetch está denegado por la política de egress del proxy** (403 a CONNECT en todos los hosts probados: `web.junts.cat`, `es.wikipedia.org`, `www.el-pi.com`, prensa). No se ha intentado rodear la política.
- Verificación por **WebSearch (≥2 extractos independientes por posición)**, el fallback previsto en el encargo. Consecuencia directa: los snippets de buscador **no son pasajes verbatim fiables**, así que casi todas las altas son **calidad media/baja con fuente+justificación y sin cita literal**. Única alta con cita literal: **AC `dem-012`** (pasaje del manifiesto en catalán, ya verificado en el repo vía la autodescripción).

## 1. Commits atómicos por entidad (esta rama, sobre `70843d4`)

| Hash | Entidad | Altas | Ejes drenados | Huecos declarados |
|------|---------|-------|---------------|-------------------|
| `2dd73d7` | Junts | 14 | 11 | 2 |
| `bf633aa` | Aliança Catalana | 5 | 5 | 4 |
| `11bcfeb` | El Pi | 3 | 3 | 13 |

(Este informe se commitea aparte, tras los tres.)

## 2. Tabla antes/después

| Entidad | id | Posiciones antes | Altas | Después | Ejes-hueco | Drenados | Huecos |
|---|---|---|---|---|---|---|---|
| Junts | `junts` | 36 | +14 | 50 | 13 | 11 | 2 |
| Aliança Catalana | `alianca-catalana` | 43 | +5 | 48 | 9 | 5 | 4 |
| El Pi | `el-pi` | 9 | +3 | 12 | 16 | 3 | 13 |
| **Total** | | **88** | **+22** | **110** | **38** | **19** | **19** |

## 3. Altas por entidad

Signo: `valor` es la respuesta del partido al enunciado del ítem (−2..+2). El eje que drena es el que carga el ítem.

### 3.1 Junts (`2dd73d7`) — 14 altas

| Eje | Ítem | Valor | Calidad | Cita | Fecha fuente | Base |
|---|---|---|---|---|---|---|
| monarquia | `mon-001` | +2 | media | no | 2024-10 | Objetivo declarado: república catalana independiente → jefatura elegida, no hereditaria |
| modelo-territorial | `ter-001` | −2 | media | no | 2024-10 | Reclama más competencias (hisenda pròpia, migración), no devolverlas |
| modelo-territorial | `dem-035` | +2 | media | no | 2024-10 | Derecho de salida/autodeterminación (coherente con ter-002, nac-001) |
| ue | `ue-001` | −2 | media | no | 2026 | Europeísta: Cataluña independiente miembro de pleno derecho de la UE |
| ue | `ue-002` | +1 | media | no | 2026 | Eurofederalista (eliminar unanimidad) con matiz soberanista |
| energia-nuclear | `ene-003` | 0 | media | no | 2025-11 | Abstención ambivalente en la supresión del calendario de cierre |
| ecologia | `ene-011` | +1 | baja | no | 2026 | Transición compatible con competitividad/crecimiento e industria |
| animalismo | `va-002` | +1 | media | no | 2021 | Caza de gestión legítima (activo para el equilibrio de fauna) |
| animalismo | `va-004` | +1 | baja | no | 2021 | Reducir ganadería intensiva; modelos extensivos |
| institucionalismo | `dem-011` | −2 | media | no | 2024-10 | Demócrata parlamentario: no sustituye el modelo parlamentario |
| libertades-civiles | `dem-021` | +1 | media | no | 2026 | Exigió más garantías (pelotas de goma, protesta) a la reforma de la Ley Mordaza |
| libertad-conciencia | `rel-002` | +1 | media | no | 2024-05 | Aconfesional pluralista (reconoce comunidades religiosas, sin religión oficial) |
| populismo | `pop-003` | +1 | baja | no | 2026-07 | Marco del «régimen del 78» (PSOE/PP como un mismo sistema) |
| internacionalismo | `izq-046` | −1 | media | no | 2025-03 | Soberanismo + control catalán de la inmigración (rechaza libre movimiento incondicional) |

### 3.2 Aliança Catalana (`bf633aa`) — 5 altas · lenguaje clínico, etiquetas atribuidas a fuente

| Eje | Ítem | Valor | Calidad | Cita | Fecha fuente | Base |
|---|---|---|---|---|---|---|
| institucionalismo | `dem-012` | −2 | **alta** | **sí** (catalán) | 2026 | Vía unilateral (DUI sin referéndum); rechaza los procedimientos constitucionales |
| organizacion | `dem-015` | +2 | media | no | 2025 | Liderazgo personalista férreo (núcleo de una decena en torno a la líder) |
| ue | `ue-001` | +1 | media | no | 2024-10 | Euroescepticismo soberanista (Europa de las Naciones Soberanas / PVV), matizado |
| libertades-civiles | `soc-003` | +1 | baja | no | 2024 | Seguridad como eje declarado; videovigilancia inferida del programa de orden público |
| libertad-conciencia | `rel-002` | −1 | media | no | 2025-01 | Moratoria/cierre de mezquitas restringe al islam vs expresión igual de toda religión |

- La cita de `dem-012` es el pasaje verbatim del manifiesto en catalán: «Declararem unilateralment la independència i la defensarem fins expulsar definitivament l'Estat espanyol de Catalunya» (traducción en la justificación). Grupo de evidencia asignado: `pasaje-861ccf727578ad5f6913`.

### 3.3 El Pi (`11bcfeb`) — 3 altas

| Eje | Ítem | Valor | Calidad | Cita | Fecha fuente | Base |
|---|---|---|---|---|---|---|
| economico | `eco-009` | +1 | media | no | 2023-04-22 | Suspende sucesiones e ITP en la vivienda habitual (rebaja acotada) |
| tradicion-moral | `dr-018` | −1 | media | no | 2026 | Apoya la ley específica de violencia de género (inferido); contra la ley neutra por sexo |
| ecologia | `va-012` | +1 | media | no | 2023 | Contención de la saturación turística (300.000/15 años, Palma compacta, plazas obsoletas) |

## 4. Huecos declarados (19) — «nada limpio → hueco» es mejor que inventar

**Junts (2):**
- `estatismo`: el perfil económico ya está reflejado en las posiciones `eco-*`/`der-*` existentes (p. ej. `der-001` intervención puntual, `eco-001` presión fiscal); no hay evidencia ítem-a-ítem limpia sobre dirección estatal de la economía para los ítems disponibles (`ene-005`, `lab-016`, `lab-007`).
- `metodo-cambio`: **hueco estructural** — el banco de ítems del sub-eje es específico del campo comunista (`izq-001`, `izq-008`, `izq-016`, `izq-019`, `izq-030`, `izq-031`…). Ninguno aplica a un partido nacionalista de centro-derecha.

**Aliança Catalana (4):**
- `animalismo`: la única acción documentada con animales es la moción de Ripoll contra el sacrificio halal, instrumental a su discurso antiislam; no mapea a los ítems `va-*` (caza, toros, ganadería, laboratorio). No se infiere una posición animalista general.
- `democracia-directa`: su método declarado es la **DUI parlamentaria sin referéndum** (propuesta de 2024 de restituir el Estado catalán sobre la DUI de 2017). No sostiene los ítems de decisión directa (`dem-001` referéndum, `dem-002` revocación, `dem-029` ILP). Discrepa además de la pista +15 de la matriz.
- `pluralismo-institucional`: **sin evidencia doctrinal limpia** sobre concentración de poder, separación de poderes, independencia judicial u oposición. No se infiere autoritarismo institucional a partir de su nativismo (los ítems fuertes `lim-005`, `lim-007` exigirían evidencia expresa; fabricarlos sería peor que el hueco, y contrario a la sensibilidad del encargo).
- `metodo-cambio`: mismo hueco estructural que en Junts (banco comunista). Su rupturismo nacional está capturado por `nac-001` (unilateralidad, +2) y por `dem-012` (−2) de esta tanda.

**El Pi (13):** `estatismo`, `propiedad-mercado`, `democracia-directa`, `libertades-civiles`, `monarquia`, `social`, `laicismo`, `libertad-conciencia`, `animalismo`, `internacionalismo`, `energia-nuclear`, `metodo-cambio`, `organizacion`.
- El perfil público de El Pi (web con poco detalle nacional/económico, prensa balear) no ofrece una posición limpia por ítem en esos ejes. `energia-nuclear` carece de contexto insular (Baleares no tiene parque nuclear). `metodo-cambio` es el hueco estructural del banco comunista. `social` queda hueca porque no hay evidencia de inmigración/LGTB/orden (su compromiso con la igualdad de género se usó en `tradicion-moral` vía `dr-018`).

## 5. Banderas para el integrador

1. **El Pi — «calidad A» de la matriz sin sustento.** La matriz marcó `monarquia` (+20), `democracia-directa` (−30), `libertades-civiles` (+65) e `internacionalismo` (+15) como «evidencia primaria/directa suficiente para la dirección». WebSearch (≥2 extractos, incluidas búsquedas dirigidas a Estatut/soberanía/monarquía) **no halló evidencia** que sostenga esas posiciones para El Pi. Quedan como huecos; recomiendo revisar de dónde salió esa calificación A en la fuente original.
2. **Junts `ene-003` = 0 y ecologia centrista.** La matriz situó `ecologia` en +65 (ecologismo) y `energia-nuclear` en −30. La evidencia verificada muestra un perfil más compatibilista/productivista (transición + competitividad; abstención deliberadamente ambigua en el cierre nuclear). Valores puestos por evidencia, no por la pista.
3. **`metodo-cambio` es inservible para partidos no comunistas.** Su banco de ítems (módulo `corrientes-izquierda`) no tiene ningún ítem aplicable a Junts, AC ni El Pi. Es una limitación del instrumento, no un hueco de datos: convendría un ítem de método rupturista/gradualista neutral de familia para poder puntuar el sub-eje fuera del campo comunista.
4. **Dataciones aproximadas por WebFetch bloqueado.** Sin acceso al documento primario, algunas fechas de fuente son estimaciones de año (Junts `va-002`/`va-004` → 2021; AC `dem-015` → 2025; El Pi `va-012` → 2023). El integrador debería confirmarlas al re-verificar.
5. **Aviso preexistente no bloqueante** de `validate:data`: `alianca-catalana (territorial): −100 con 10 posiciones, todas ±2`. Es del eje territorial (fuera de esta tanda) y anterior a mis altas; mis altas en AC incluyen valores moderados (`ue-001` +1, `soc-003` +1, `rel-002` −1) que no agravan ese patrón.

## 6. Cola de URLs (revisión humana)

**Junts:**
- Ponència 2 «El país que volem» (programa 2024-10) — `https://web.junts.cat/wp-content/uploads/2024/10/Ponencia_2.pdf` (403 vía proxy; verificar pasajes sobre monarquía/economía/parlamentarismo)
- Ponència 1 «estratègia» (2024-10) — `https://web.junts.cat/wp-content/uploads/2024/10/Ponencia-1.pdf`
- Europa (web oficial) — `https://junts.cat/europa`
- Nuclear (abstención) — `https://www.publico.es/politica/congreso/pp-fracasa-intento-suprimir-calendario-cierre-nucleares-abstencion-junts.html`
- Industria/transición en programas catalanes — `https://industrytalks.es/que-lugar-ocupa-la-industria-en-los-programas-electorales-catalanes/`
- Protección animal (AnimaNaturalis) — `https://www.animanaturalis.org/n/analizamos-las-propuestas-de-proteccion-animal-para-las-elecciones-catalanas-2021`
- Ley Mordaza (Demócrata) — `https://www.democrata.es/actualidad/la-reforma-de-la-ley-de-seguridad-ciudadana-avanza-entre-advertencias-de-junts-y-podemos-de-no-rebajar-sus-exigencias/`
- Religión en programas (Religión en Libertad) — `https://www.religionenlibertad.com/espana/240511/elecciones-catalanas-2024-religion-candidatos-religion-programas-electorales-partidos_77135.html`
- «Régimen del 78» (The Objective) — `https://theobjective.com/espana/politica/2026-07-10/auge-alianca-catalana-junts-apoyo-sanchez/`
- Inmigración/multirreincidentes (Ara) — `https://es.ara.cat/politica/junts-quiere-generalitat-pueda-fijar-condiciones-expulsar-inmigrantes-delitos-multirreincidentes_1_4907247.html`

**Aliança Catalana:**
- Manifiesto (web oficial) — `https://web.aliancacatalana.cat/`
- Radiografía/estructura (Público) — `https://www.publico.es/politica/partidos/detras-silvia-orriols-asi-engranaje-impulsa-ascenso-ultras-alianca-catalana.html`
- Europa / ENS (Crónica Global) — `https://cronicaglobal.elespanol.com/politica/20241002/alianca-catalana-extrema-derecha-alemana-hacerse-europa/890161069_0.html`
- Programa 2024 (politicaelectoral) — `https://www.politicaelectoral.com/es/espana/autonomicas-2024/cataluna/alianca-catalana`
- Mezquitas (Ara) — `https://es.ara.cat/politica/parlament-de-catalunya/pp-vox-alian-silvia-orriols-cerrar-mezquitas-catalunya_1_5270650.html`
- DUI sin referéndum (Infobae) — `https://www.infobae.com/espana/agencias/2024/10/10/el-parlament-tumba-resoluciones-independentistas-sobre-la-autodeterminacion-y-la-dui/`
- Seguridad/Mossos — `https://xcatalunya.cat/es/actualidad/alianca-catalana-estalla-situacion-mossos-mientras-delincuentes`

**El Pi:**
- Programa (dBalears) — `https://www.dbalears.cat/balears/politica/2023/04/22/379439/presenta-seu-programa-electoral-centrat-financament-diversificacio-economica-habitatge.html`
- Quiénes somos (web oficial) — `https://www.el-pi.com/es/quienes-somos/`
- Saturación turística (OKDiario) — `https://okdiario.com/baleares/regionalistas-del-pi-baleares-tambien-apuntan-turismofobia-del-govern-armengol-9609522`
- Presión humana récord 2026 (Última Hora) — `https://www.ultimahora.es/noticias/local/2026/06/03/2642501/presion-humana-baleares-crece-crece-record-marzo-millones-personas.html`

## 7. Salida de puertas

```
npm run validate:data              → ✓ Datos válidos (instrumento v4, corte 2026-07-12)
                                       (avisos no bloqueantes preexistentes de otros partidos)
npm run validate:evidence-groups   → ✓ Todos los pasajes citados conservan grupo canónico
node scripts/asignar-grupos-evidencia.mjs --write
                                   → ✓ Asignado 1 grupo (AC dem-012: pasaje-861ccf727578ad5f6913)
```

- `git diff --numstat 70843d4 HEAD`: solo altas (0 deleciones de valores) en los tres ficheros permitidos + este informe.
- Recuento final: **22 altas / 19 ejes drenados / 19 huecos declarados** sobre 38 huecos eje-entidad. El integrador re-verificará por triaje.
