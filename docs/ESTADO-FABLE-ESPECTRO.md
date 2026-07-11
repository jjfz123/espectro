# Estado de la sesión de integración — Fable

**Actualizado:** 2026-07-11 (noche) · Documento de relevo: otro agente debe poder continuar desde aquí sin reconstruir contexto.

## SHAs

- **Base (`BASE_SHA`):** `6dce6c58db92378339897988ac289d1656c50c1e` = HEAD de `claude/espectro-political-vaa-3d35l3`.
- **Rama de integración:** `fable/espectro-integracion-atlas-resultados` (local, sin push).
- Commits de la rama (orden cronológico): `2a4480d` data lab-028/029/030 · `99ba498` qa guardarraíl huérfanos · `25ff4ab` docs feedback recuperados · `19e3e39` docs harness · `8bbb057` engine sin-datos/semántica · `8c14e30` engine hash+cuarentena+fuente única · `bbeb65b` results jerarquía.
- Clon de trabajo: `/home/j.fernandez/espectro`. El checkout `/home/j.fernandez/espectro-review` es del auditor previo; no tocar.

## Fases

- Fase 0 (congelar/entender): **hecha**. Fase 1 (integración semántica): **hecha y verificada**. Fase 2 (contratos del motor): **hecha** (ENG-001..004; quedan ENG-005/006/007). Fase 4 (jerarquía de resultados): **UX-001 hecho**; UX-002 (brújula ligera) pendiente con diseño anotado. Fase 3 (electoral): ELEC-001/002 en subagente, pendiente de integrar.
- Revisión adversarial independiente de la tanda: lanzada (workflow), pendiente de triaje al cierre.

## Worktrees y ramas de agentes

- `../espectro-elec` → rama `agent/elec-auditor`, base `8bbb057`. Encargo: `scripts/auditar-contexto-electoral.mjs` + `tests/contexto-electoral.test.ts`, sin tocar nada más, commit local sin push. Al integrar: `git diff --check <sha>^!` + `cherry-pick`, luego `worktree remove` y `branch -d`.

## Propietario de archivos calientes

Fable en el árbol principal (Resultados.tsx, estado.ts, validate-data.mjs, datos.ts ya integrados y committeados). El subagente solo escribe sus 2 archivos nuevos.

## Último conjunto de comandos verdes (HEAD `bbeb65b`)

`validate:data` ✓ (378 ítems/364 vigentes) · `typecheck` raíz y web ✓ · `test` 248/248 ✓ · `web:build` ✓ · `web:budget` ✓ · `web:test:e2e` **23/23 Chromium** ✓ · `git diff --check` ✓. Playwright Firefox/WebKit instalados pero el config no define proyectos multi-navegador (QA-001 abierto).

## Decisiones tomadas en esta sesión (resumen)

1. `lab-027` fiscal conservado; tríada sindical como `lab-028/029/030` (INTEGRACION-RAMAS-FABLE §4).
2. Afinidad sin solape = `estado: 'sin-datos'` + `puntuacion: null`; el formato de enlace compartido v1 NO cambia (solo se serializan calculables, igual que antes) → sin bump de esquema.
3. `hashSemantico` (sha256/16 de ids+cargas+condición+uso+módulo de vigentes) en `data/version.json`; cambios de solo texto no lo alteran (deliberado).
4. Sesiones incompatibles → cuarentena `espectro.v1.retirada` + aviso descartable en portada; nunca borrado silencioso.
5. Sugerencia de módulos y perfil comparten fuente de verdad (`respuestasDeSecuenciaActiva`); las respuestas de módulos desactivados se conservan sin influir.
6. Referencia de generales: plegada y rotulada «no votable en esta convocatoria» cuando `eleccion !== 'generales'`.

## Siguiente acción concreta (para el relevo)

1. Recoger la entrega del subagente electoral, revisar su diff aislado y hacer cherry-pick; cablear `npm run audit:electoral` en package.json y en la puerta.
2. Triage de la revisión adversarial (workflow `espectro-adversarial-tanda1`): corregir P0/P1 confirmados.
3. UX-002: partir `web/src/mapaEspacial.ts` en (a) módulo ligero solo-partidos para `BrujulaPrincipalLigera` (sin importar `datosReferencias`) y (b) módulo atlas; el componente ligero se monta expandido en la sección «Mapa del espectro» con lista accesible; el atlas completo sigue bajo demanda. Presupuesto: no engordar el chunk de resultados >390 KiB.
4. ATLAS-001: los 4 estados (calculada/provisional/editorial/sin datos) ya existen a nivel de datos (`publicacionGeometrica`, `origenCoordenadas`, grados de auditoría); falta reflejarlos tipográficamente en la UI de la brújula y bloquear con test que una región editorial se pinte como calculada.
5. ENG-005/006/007, DATA-001/002/003, SHARE-001 (fuzz), A11Y, resto del plan.

## Claves del entorno

npm vía shims corepack en `~/.local/bin` (npm 12); node v24.18.0; Playwright con Chromium+Firefox+WebKit instalados.
