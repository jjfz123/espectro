# Auditoría final — Fable (documento en construcción)

**Rama:** `fable/espectro-integracion-atlas-resultados` · **Base:** `6dce6c58db92378339897988ac289d1656c50c1e`

Este documento se completa al cierre. La tabla antes/después se rellena con cada tanda verificada.

## Matriz antes/después

| Puerta | Antes (BASE_SHA `6dce6c5`, 2026-07-11) | Después (HEAD final) |
|---|---|---|
| `validate:data` | ✓ (29 ejes, 19 módulos, 375 ítems/361 vigentes, 35 términos, 67 partidos, 61 referencias, 21 convocatorias/323 candidaturas, 14 sindicatos; 2 diagnósticos densidad + 8 avisos evidencia-bandera no bloqueantes) | — |
| `validate:evidence-groups` | ✓ | — |
| `validate:atlas-contract` | ✓ (72 publicadas / 17 bloqueadas) | — |
| `validate:todo-inventory` | ✓ | — |
| `typecheck` | ✓ | — |
| `test` (Vitest) | ✓ 243/243 en 24 archivos | — |
| `web:build` | ✓ | — |
| `web:budget` | ✓ inicial 105,3 KiB gzip · resultados 274,0 · compartido 5,0 · atlas 158,4 · referencias 145,1 · 3D 244,2 · PWA 3,14 MiB | — |
| E2E Chromium | no ejecutado en base (navegadores recién instalados) | — |
| E2E Firefox | no ejecutado en base | — |
| E2E WebKit | no ejecutado en base | — |
| `audit:atlas` | ✓ con avisos (facetas definitorias sin carga en ~20 referencias) | — |
| `audit:partidos` | ✓ — 1 provisional (CUP), resto insuficiente para brújula; extremos sin moderadora en PSOE/UPN/VOX (avisos) | — |
| `git diff --check` | ✓ | — |

## Warnings conocidos en base (no convertidos en éxito)

- Densidad del atlas: 72 regiones publicadas vs referencia 90; cuadrante derecha-abajo 9/15.
- 8 perfiles con posible sesgo de evidencia-bandera (todo ±2): adelante-andalucia, alianca-catalana, cup, pcpc, pcpe, recortes-cero, upg, vox.
- ~20 referencias declaran facetas definitorias sin carga (audit:atlas).
- Discrepancias documentales detectadas: README dice 374/360 ítems (real 375/361) y «46 referencias» (real 61); TODO habla de 94 regiones (mapa-ideologias tiene 89 `capa: region`).

## Secciones a completar al cierre

1. Resumen ejecutivo · 2. Integración de ramas (ver INTEGRACION-RAMAS-FABLE.md) · 3. Decisiones metodológicas · 4. Cambios de UX · 5. Cambios de datos/fuentes · 6. Bugs corregidos · 7. Tareas nuevas · 8. Rendimiento · 9. Evidencia visual · 10. Huecos restantes · 11. Instrucciones de despliegue/revisión · 12. Commits.
