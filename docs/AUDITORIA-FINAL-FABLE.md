# Auditoría final — Fable (tanda de integración 2026-07-11)

**Rama:** `fable/espectro-integracion-atlas-resultados` · **Base:** `6dce6c58` · **HEAD de la tanda:** ver lista de commits (§12)

## 1. Resumen ejecutivo

Se integró semánticamente la rama de feedback (`claude/multi-agent-architecture-feedback-gvh156`) sobre el HEAD de la objetivo sin merge ciego: la mayoría de sus fixes ya estaban absorbidos por la objetivo, y lo genuinamente pendiente (tríada sindical, guardarraíl de campos huérfanos, tres documentos, principio de marco) se trasplantó con el conflicto `lab-027` resuelto por remapeo. Además se cerraron cuatro contratos del motor (sin-datos discriminado, semánticas separadas, hash del instrumento, fuente de verdad única), se reordenó la pantalla de resultados a la jerarquía pedida, y se creó el auditor de contexto electoral con tests parametrizados para las 21 convocatorias, endureciendo de paso el motor para fallar cerrado en autonómicas.

## 2. Matriz antes/después

| Puerta | Antes (BASE `6dce6c5`) | Después (HEAD de la tanda) |
|---|---|---|
| `validate:data` | ✓ 375 ítems/361 vigentes; 2 diagnósticos + 8 avisos bandera | ✓ **378/364** (+3 ítems sindicales); mismos avisos + candado `hashSemantico` activo |
| `validate:evidence-groups` | ✓ | ✓ |
| `validate:atlas-contract` | ✓ (72 publicadas/17 bloqueadas) | ✓ (sin cambios de atlas) |
| `validate:todo-inventory` | ✓ | ✓ |
| `typecheck` (raíz + web) | ✓ | ✓ |
| `test` (Vitest) | ✓ 243/243 en 24 archivos | ✓ **354/354 en 25 archivos** (+104 electorales, +7 motor/persistencia) |
| `web:build` | ✓ | ✓ |
| `web:budget` | ✓ inicial 105,3 KiB gzip · resultados 274,0 · atlas 158,4 · 3D 244,2 · PWA 3,14 MiB | ✓ mismos presupuestos en verde |
| E2E Chromium | no ejecutado en base | ✓ **23/23** (ejecutado además en cada tanda) |
| E2E Firefox/WebKit | no ejecutado | **pendiente**: navegadores instalados; el config aún no define proyectos (QA-001) |
| `audit:atlas` | ✓ con avisos | ✓ (sin cambios) |
| `audit:partidos` | ✓ (casi todo «insuficiente») | ✓ (sin cambios de datos políticos) |
| `audit:electoral` | **no existía** | ✓ **0 errores, 70 avisos** documentados |
| `git diff --check` | ✓ | ✓ |

## 3. Decisiones metodológicas

1. **`lab-027`**: se conserva el fiscal (chovinismo del bienestar, condicional de `lab-009`); la tríada sindical del feedback vive en `lab-028/029/030` (ver `INTEGRACION-RAMAS-FABLE.md` §4). Cambio aditivo dentro del instrumento v4: nada existente cambió de carga, texto ni condición.
2. **Sin-datos ≠ 0 %**: `ResultadoAfinidad` es ahora `estado: 'calculable' | 'sin-datos'` con `puntuacion: number | null`. Un 0 % real (desacuerdo máximo) permanece calculable; la ausencia de solape jamás produce porcentaje ni compite en el orden. El formato del enlace compartido v1 no cambia (siempre serializó solo calculables) → sin bump de esquema.
3. **Semánticas separadas**: `coberturaDefinitoria` (referencias, gobierna la publicación) y `gruposDocumentales` (proyección documental) dejan de sobrecargar `itemsRespondidos`/`cobertura`.
4. **Versionado por hash**: `data/version.json.hashSemantico` (sha256/16 de id+cargas+condición+uso+módulo de los vigentes). Todo cambio semántico rompe CI hasta decidir compatible (hash) o incompatible (versión+migración). Los cambios de solo texto no alteran el hash, deliberadamente.
5. **Sesiones**: nunca se borra en silencio; incompatible/caducada/futura/corrupta → cuarentena `espectro.v1.retirada` con motivo + aviso descartable en portada. Marcas futuras (> 24 h) invalidan.
6. **Fuente de verdad única**: sugerencia de módulos y perfil calculan sobre la misma secuencia activa (`respuestasDeSecuenciaActiva`); las respuestas de módulos desactivados se conservan sin influir.
7. **Contención territorial**: el universo lo fija la convocatoria; `audit:electoral` veta en CI datos foráneos y el motor además falla cerrado en autonómicas (defensa en profundidad).

## 4. Cambios de UX

- Jerarquía de resultados: resumen/hito → **mapa del espectro** → contexto electoral + catálogo → **máximos por afinidad** → referencia de generales (plegada y rotulada «no votable en esta convocatoria» fuera del contexto general) → auditoría ítem a ítem → coincidencias → excepciones → sindicatos → referencias doctrinales → facetas → compartir al final.
- Aviso de sesión retirada en portada con texto por motivo.
- Copy de «máximos» y «principales» corregido para el orden nuevo.

## 5. Cambios de datos/fuentes

Solo los 3 ítems sindicales (piloto, solo-matching, sin posiciones codificadas en ninguna entidad). Ninguna coordenada, posición ni fuente política se tocó.

## 6. Bugs y edge cases corregidos

- Afinidad 0 ambigua (HALLAZGOS §4) · sobrecarga `itemsRespondidos` (§5) · migración v3→v4 sin verificación (§1, vía candado dev-time + cuarentena runtime) · divergencia Modulos/Resultados (§2) · payload corrupto ignorado y marcas futuras eternas (§ persistencia) · filtro territorial fail-open en autonómicas (hallazgo del revisor electoral) · campos de presentación huérfanos (guardarraíl portado).

## 7. Tareas nuevas añadidas al plan

UX-002 (brújula ligera con diseño anotado), ATLAS-001/002/003, ENG-005/007, ELEC-003 (parcial: motor ya falla cerrado; falta UI), DATA-001/002/003, A11Y-001/002, SHARE-001 (fuzz), QA-001 (proyectos Firefox/WebKit). Ver `PLAN-FABLE-ESPECTRO.md`.

## 8. Rendimiento

Presupuestos idénticos y en verde; la reordenación no movió chunks (lazy loading conservado). La brújula ligera (UX-002) queda diseñada para no engordar el chunk de resultados.

## 9. Evidencia visual

Pendiente de revisión visual humana sobre build final (320/390/1440 y oscuro): los E2E cubren 320 px sin overflow y accesibilidad automática, pero la inspección visual nominal del TODO sigue abierta.

## 10. Warnings y huecos restantes

Los de la base (densidad de atlas, 8 avisos de evidencia-bandera, facetas definitorias sin carga) permanecen: no se rellenaron huecos con datos inventados. `audit:electoral` documenta 70 avisos (6 discrepancias de total oficial + 64 perfiles solo-componente, patrón deliberado de coalición). Los P0 nominales del TODO (65 perfiles, 178 rótulos, 323 candidaturas) siguen gobernados por sus documentos.

## 11. Instrucciones de despliegue/revisión

`npm ci && npm --prefix web ci`, luego la matriz completa: `validate:data`, `validate:evidence-groups`, `validate:atlas-contract`, `validate:todo-inventory`, `typecheck`, `test`, `web:build`, `web:budget`, `audit:atlas`, `audit:partidos`, `audit:electoral`, `web:test:e2e` (con `npx playwright install chromium`). PR contra `claude/espectro-political-vaa-3d35l3`, nunca contra `main`.

## 12. Commits de la tanda

`2a4480d` data: tríada sindical lab-028/029/030 · `99ba498` qa: guardarraíl campos huérfanos · `25ff4ab` docs: feedback recuperado · `19e3e39` docs: harness · `8bbb057` engine: sin-datos + semánticas · `8c14e30` engine: hash + cuarentena + fuente única · `bbeb65b` results: jerarquía · `23d76e3` qa: avisos estructura · `af64caf` electoral: auditor + tests (subagente, integrado por cherry-pick) · `66d3fc3` electoral: cableado npm · `370192d` electoral: fail-closed autonómicas.

## 13. Revisión adversarial (cerrada)

Workflow independiente (4 dimensiones, 15 agentes, verificación por refutación). **11 hallazgos confirmados, 10 corregidos en `2a9437d`**: (P1) la cuarentena guardaba el payload político íntegro sin caducidad y «Borrar datos» no lo eliminaba — ahora solo motivo+fecha, caduca a 90 días y se borra con todo; (P1) el aviso del pliegue de generales afirmaba «no votable» siendo falso en europeas/autonómicas — reescrito veraz; (P1) un E2E aseguraba el copy antiguo Y descubrió que un preview stale de otro checkout en el puerto 4180 enmascaraba fallos (reuseExistingServer) — corregido y suite reverificada en servidor limpio; (P2) el hash semántico no cubría marco/polaridad/estado — ampliado y renovado; (P2) fallo de setItem podía dejar la sesión incompatible sin retirar — rutas independientes; (P3) nota del mapa con «más arriba» obsoleto. El 11.º (la tríada lab-028/029/030 no discrimina hasta que las referencias doctrinales la posicionen) es codificación con fuentes → **DATA-004**.

**Añadido post-revisión a petición del propietario:** módulo piloto `identidad-cultura` (14 ítems cul-001..014: asimilación, nación étnica/cívica, amenaza cultural, símbolos en la escuela, historia/leyenda negra, 12-O, acentos y variedades, ius soli, examen de nacionalidad, velo, Hispanidad, lenguas cooficiales en el Congreso), 4 términos de glosario y ~48 posiciones de 18 formaciones documentadas con fuentes primarias en `docs/investigacion/CULTURA-IDENTIDAD.md` (CULT-002, sin codificar: se codifican con el pipeline de evidencia en la siguiente tanda). Cifras finales: **392 ítems (378 vigentes), 20 módulos, 39 términos**; matriz completa en verde tras la integración, E2E 23/23 en servidor limpio.

## 14. Bloque «atlas-cuadrante» (tanda 2026-07-11, rama `fable/todo-atlas-cuadrante`, base `4f54de9`)

**Alcance:** casillas del TODO §Resultado ideológico marcadas por el propietario en `4f54de9` — vista de profundidad por defecto, cuadrante desplegado sin clic, vista simple conmutable, clicabilidad ≥44×44 px, y poblar Economía×Sociedad con evidencia. Pipeline: Fable (UI/integración) + 2 investigadores Sonnet (fichas con fuentes) + ejecutor Opus en worktree (`agent/atlas-poblar-referencias`, cherry-pick auditado) + revisor adversarial independiente.

**Matriz antes/después (verificada por el integrador, no por informes de subagentes):**

| Puerta | BASE `4f54de9` | HEAD de la tanda |
|---|---|---|
| validate:data / evidence-groups / atlas-contract / todo-inventory | ✓ | ✓ (61 referencias; 754 casillas abiertas tras marcar 3) |
| typecheck raíz + web (vía web:build) | ✓ | ✓ |
| test (Vitest) | ✓ 356/356 | ✓ **366/366** (+test regresión macro-proyección con guardia negativa de falangismo) |
| web:build / web:budget | ✓ referencias 144,6/150 · atlas 157,9/180 | ✓ referencias **148,1/150** · atlas 161,6/180 · resto sin cambios |
| audit:atlas | ✓ Economía×Sociedad **18** dibujadas | ✓ Economía×Sociedad **23** dibujadas; errores [] |
| audit:partidos / audit:electoral | ✓ | ✓ |
| E2E Chromium (PLAYWRIGHT_PORT limpio 4790 + PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH) | ✓ 23/23 | ✓ **25/25** (contrato nuevo + 2 tests) |
| git diff --check | ✓ | ✓ |
| Revisión visual (320/360/390/1440, claro/oscuro, capturas archivadas antes/después) | — | ✓ solo crece: 18→23 zonas nombradas, 5 nuevas visibles |

**Qué cambió.** UI: profundidad activada de entrada en todos los niveles; el mapa se muestra desplegado sin puerta (chunk perezoso automático con fallback accesible; el foco solo se roba tras la reapertura intencional del 3D); la vista simple (compass pelado) queda como alternativa conmutable probada; todos los puntos del plano detallado y las anclas en investigación ganan objetivo táctil ≥44×44 px real (r=24 escritorio / r=40 móvil), con desambiguación de cúmulo cuyo radio sigue la geometría real del solape (48/80) y con foco gestionado (panel al abrir, punto elegido al resolver). Datos: 18 posiciones nuevas con cita/URL/fecha/calidad en 5 referencias que ahora alcanzan 4+4 en Economía×Sociedad (conservadurismo-liberal-europeo, democracia-cristiana, plataformismo-anarcocomunista, luxemburguismo, eurocomunismo) y 3 anclas sociales documentadas en falangismo-fe-jons-1934 (que NO se dibuja: ver adversarial); vetos de mapa de democracia-cristiana (social −42,3→+2,6, documentado en su advertencia) y eurocomunismo (económico +18,2→−31,8) levantados con motivo resuelto y recalculado con el motor.

**Revisión adversarial independiente (verificación por refutación): 3 P0, 10 P1, 7 P2 — todos triados.** Corregidos en la misma tanda: (P0) falangismo cruzaba el umbral social con dos posiciones que compartían el mismo pasaje (punto 13) — se retiró `eco-007`, la referencia queda fuera de Economía×Sociedad con 3 anclas honestas y un test lo bloquea; (P0) la cita de videovigilancia pertenecía a la LO 4/1997, no a la LO 4/2015 — fuente corregida; (P0) cita de Luxemburg con título español, URL inglesa y alemán no verbatim — unificada a la edición inglesa verbatim «(en inglés)»; (P1) `der-026` de eurocomunismo duplicaba el pasaje de `dem-008` — retirada; (P1) citas no verbatim (fem-012, soc-006) corregidas a la transcripción localizada y la de eco-007 (luxemburguismo) retirada por no poder fijarse verbatim; (P1) justificación de izq-044 citaba «(punto 27)» de otro documento — reescrita declarando el corpus fundacional de 1933 pre-fusión; (P1) recálculo de DC documentado en la advertencia; (P1) franja ciega entre hit-circles solapados sin desambiguación — radio de cúmulo dinámico 48/80; (P1) foco perdido a body al resolver un cúmulo — gestión de foco en ambos paneles con aserciones E2E; (P1) docs desfasados (PRODUCCION-APP «bajo gesto»/«al solicitar el mapa») actualizados; (P1) conteo «18 de 61» del TODO actualizado a 23 con manifiesto regenerado; (P1) fila de brechas del PLAN reescrita; (P1) estados del PLAN elevados a `verificada` solo junto a esta evidencia; (P2) margen de 0,33 px del hit móvil — radio 38→40 (≈46,7 px). Aceptados con documentación (sin cambio): +2,6 social de DC es la salida honesta del motor (no se ajustan números a expectativas externas); ~15 de las 20 posiciones son extensión de principio declarada en su justificación; URL de Dignitas Infinita construida por patrón canónico no verificable desde la red del entorno (calidad rebajada a media, fecha corregida al 2024-04-02) — pendiente de verificación humana junto al resto de URLs primarias.

**Deudas y avisos que deja la tanda (sin ocultar):** (1) la casilla cerrada «Atlas 2D y referencias doctrinales tienen puertas bajo gesto…» (TODO §Rendimiento) queda parcialmente desfasada para el atlas 2D por decisión posterior del propietario (casilla de profundidad); requiere su redacción — las referencias doctrinales conservan la puerta; (2) el motor no deduplica pasajes por grupo documental para referencias (solo partidos): candidato a guardarraíl general del validador; (3) `resolucionCero` no se valida para referencias; (4) verificación online de fuentes bloqueada por la red del entorno: las citas canónicas se corroboraron por búsqueda plural y las calidades lo reflejan, pero la verificación humana de URLs sigue pendiente; (5) consejismo y ordoliberalismo quedan fuera por hueco social honesto (2<4), documentado.
