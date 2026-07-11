# Estado de la sesión de integración — Fable

**Actualizado:** 2026-07-11 (tarde) · Documento de relevo: otro agente debe poder continuar desde aquí sin reconstruir contexto.

## SHAs

- **Base (`BASE_SHA`):** `6dce6c58db92378339897988ac289d1656c50c1e` = HEAD de `claude/espectro-political-vaa-3d35l3`.
- **Rama de integración:** `fable/espectro-integracion-atlas-resultados` (local, sin push).
- **Rama de fixes:** `origin/claude/multi-agent-architecture-feedback-gvh156` @ `b8db555`.
- Clon limpio en `/home/j.fernandez/espectro` (el checkout `/home/j.fernandez/espectro-review` es del auditor previo; no tocar).

## Tareas activas

- Fase 0 (congelar y entender): **hecha** — línea base verde, comparación de ramas, harness creado.
- Fase 1 (integración semántica): **en curso** — MERGE-002..006.
- Siguiente acción concreta: implementar MERGE-002 (trasplante lab-028/029/030) y validar.

## Worktrees y ramas de agentes

Ninguno abierto. Los subagentes usados hasta ahora son de solo lectura (workflow `espectro-lectura-inicial`).

## Propietario de archivos calientes

Todos en Fable (integrador). No hay escritura paralela en curso.

## Último conjunto de comandos verdes (sobre BASE_SHA, log: scratchpad baseline.log)

`validate:data` ✓ (con 2 diagnósticos de densidad y 8 avisos de evidencia-bandera, no bloqueantes) · `validate:evidence-groups` ✓ · `validate:atlas-contract` ✓ · `validate:todo-inventory` ✓ · `typecheck` ✓ · `test` ✓ 243/243 (24 archivos) · `web:build` ✓ · `web:budget` ✓ (inicial 105,3 KiB gzip; resultados 274,0; atlas 158,4; referencias 145,1; 3D 244,2; PWA 3,14 MiB) · `audit:atlas` ✓ · `audit:partidos` ✓ · `git diff --check` ✓.

Playwright: **navegadores Chromium+Firefox+WebKit instalados en este entorno** (a diferencia del entorno del auditor previo). E2E aún no ejecutado en esta rama → QA-001.

## Fallos reproducibles abiertos

Ninguno técnico. Metodológicos conocidos (del prompt y de HALLAZGOS-REVISION-MOTOR): afinidad 0 vs sin-datos (ENG-001), sobrecarga `itemsRespondidos` (ENG-002), migración v3→v4 en bloque (ENG-003), Modulos vs Resultados (ENG-004), jerarquía de Resultados (UX-001), contrato editorial/calculado de la brújula (ATLAS-001).

## Decisiones metodológicas pendientes de propietario

1. ENG-004: al unificar el desbloqueo de módulos, ¿conservar respuestas de módulos desactivados (no perder trabajo) o limpiarlas? Propuesta Fable: conservar datos, calcular ambos (sugerencia y perfil) sobre la secuencia activa.
2. ENG-003: invalidar sesiones v3 o mantener la migración con verificación por hash. Propuesta: hash del subconjunto relevante; si no coincide con el esperado, invalidar con aviso.
3. Extensión del campo `marco` a `dr-001`, `lab-016/017`, `dem-011`, `eco-002/009/014` (MARCO-DE-REFERENCIA §5): las cargas de eje son calibración y esperan al pilotaje.

## Claves del entorno

- npm no está en el sistema: hay shims corepack en `~/.local/bin/npm|npx` (npm 12). `node` v24.18.0.
- Baseline log: `/tmp/claude-1004/.../scratchpad/baseline.log` (sesión); las cifras están copiadas en AUDITORIA-FINAL-FABLE.md.
