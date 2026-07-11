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
