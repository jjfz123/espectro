# Estado de la sesión — Fable (bloque atlas-cuadrante)

**Actualizado:** 2026-07-11 (tarde) · Documento de relevo: otro agente debe poder continuar desde aquí sin reconstruir contexto. El relevo anterior (integración `6dce6c5`) queda registrado en el historial de git.

## SHAs

- **Base del bloque (`BASE_SHA`):** `4f54de90feab1af6b485a5bbb856b1a78ef1c950` = `origin/main` en el corte.
- **Rama del bloque:** `fable/todo-atlas-cuadrante` (local). Checkpoint remoto: `claude/espectro-root-agent-fr21qz` (misma historia; sin PR, `main` intacta).
- Commits: `e26ff1c` UI del cuadrante · `db58679` datos de referencias (cherry-pick del worktree `agent/atlas-poblar-referencias`, entrega `e0e1669`) · `8f64518` E2E anclas · cierre adversarial+casillas (este commit).

## Bloque ejecutado: atlas-cuadrante (casillas TODO §Resultado ideológico)

- **Vista de profundidad por defecto** y cuadrante desplegado sin exigir clic: **HECHO y marcado** (E2E de contrato; sin puerta «Abrir mapa interactivo»; chunk perezoso automático; foco solo tras reapertura 3D).
- **Vista simple** (compass pelado) conmutable, nunca inicial: **HECHO y marcado** (E2E dedicado).
- **Clicabilidad ≥44×44 px** en todos los puntos + desambiguación de cúmulos + foco gestionado: **HECHO y marcado** (E2E con medición en 320/360/390 para puntos y anclas; radio de cúmulo 48/80 acorde al solape real).
- **Poblar Economía×Sociedad**: PROGRESO **18→23 de 61** con 18 posiciones documentadas (cita/URL/fecha/calidad) — casilla abierta (mejora continua), conteo vivo actualizado y manifiesto regenerado. Vetos resueltos con recálculo: democracia-cristiana (social −42,3→+2,6), eurocomunismo (económico +18,2→−31,8). Falangismo-1934 queda FUERA por honestidad (3 anclas sociales; un pasaje no puede contar dos veces) con test-guardia.
- **Posición real de partidos**: mecanismo intacto y ahora con test de regresión (`tests/referencias-mapa-macro-proyeccion.test.ts`); casilla abierta (faltan partidos que alcancen el umbral — trabajo de la categoría Partidos 65).

## Revisión adversarial de la tanda

3 P0, 10 P1, 7 P2 — todos corregidos o aceptados con documentación; detalle completo con reproducciones en `docs/AUDITORIA-FINAL-FABLE.md` §14.

## Última matriz verde (HEAD de la tanda, reejecutada por el integrador)

validate:data ✓ (61 referencias) · evidence-groups ✓ · atlas-contract ✓ (72/17) · todo-inventory ✓ (754 abiertas) · typecheck raíz+web ✓ · test **366/366** ✓ · web:build ✓ · web:budget ✓ (inicial 108,2 · resultados 273,0 · atlas 161,6/180 · referencias **148,1/150** · 3D 245,6 · PWA 3,17 MiB) · audit:atlas ✓ (**Economía×Sociedad 23**) · audit:partidos ✓ · audit:electoral ✓ · E2E **25/25** ✓ · git diff --check ✓ · revisión visual 320/360/390/1440 claro/oscuro con capturas antes/después (solo crece).

## Decisiones de esta tanda

1. El cuadrante rico se muestra sin clic (norma dura); las **referencias doctrinales** conservan su puerta bajo gesto. La casilla cerrada de presupuestos que decía «Atlas 2D… bajo gesto» queda desfasada en su primera mitad: **necesita redacción del propietario** (no se ha tocado).
2. Un pasaje documental no puede sumar dos evidencias de un mismo eje en una referencia (vara de partidos aplicada editorialmente): falangismo fuera de Economía×Sociedad hasta tener 4 pasajes independientes. Candidato a guardarraíl del validador (hoy solo lo cubre el test de la tanda para este caso).
3. Los agregados recalculados al levantar un veto se documentan en la advertencia de la ficha (caso DC) y en la auditoría.
4. Red del entorno sin acceso a dominios primarios: citas corroboradas por búsqueda plural, calidades honestas (la de Dignitas Infinita rebajada a media por URL construida a patrón), verificación humana pendiente listada en AUDITORIA §14.

## Siguiente acción concreta (para el relevo)

1. Presentar el informe del bloque al propietario; con su visto bueno, decidir PR contra `main` (nunca push directo).
2. El propietario decide: redacción de la casilla de presupuestos desfasada; si la casilla «poblar» se considera cerrada o sigue de mejora continua.
3. Candidatos a siguiente bloque (NO iniciados, §0): guardarraíl de deduplicación de pasajes para referencias en validate-data; `resolucionCero` validado para referencias; verificación humana de URLs primarias de la tanda; ampliación del corpus social de ordoliberalismo/consejismo si aparece evidencia; categoría Partidos (65) según prioridad documentada del TODO.

## Claves del entorno

npm 10.9.7 / node v22.22.2 (sin el shim corepack del relevo previo). E2E: `PLAYWRIGHT_PORT` limpio (4790 usado) + `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/opt/pw-browsers/chromium` (el binario 1228 que pide @playwright/test no existe en la imagen; **no** ejecutar `playwright install`). Push directo bloqueado por el clasificador de permisos salvo petición expresa del propietario en la conversación.
