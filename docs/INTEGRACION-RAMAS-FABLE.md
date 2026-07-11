# Informe de integración de ramas — Fable

**Corte:** 2026-07-11 · **Integrador:** agente raíz Fable · **Rama de trabajo:** `fable/espectro-integracion-atlas-resultados`

## 1. Ramas y SHAs

| Referencia | SHA | Comentario |
|---|---|---|
| Rama objetivo `claude/espectro-political-vaa-3d35l3` (HEAD remoto) | `6dce6c58db92378339897988ac289d1656c50c1e` | «Cierra el contrato técnico del atlas» |
| Rama de fixes `claude/multi-agent-architecture-feedback-gvh156` (HEAD remoto) | `b8db555eeeef108ef8b0b2c987c6faa1e3c8b115` | «Guardarraíl de campos huérfanos y tramos visibles en el ranking» |
| Merge base | `3f04c3b7105cc64993bfbc071dbf6c4afdafd3c1` | «Rediseña la brújula ideológica con atlas v4» |
| `BASE_SHA` de la rama de integración | `6dce6c58db92378339897988ac289d1656c50c1e` | Idéntico al HEAD de la objetivo; árbol limpio al partir |

Commits exclusivos de la objetivo (desde el merge base): `53e0c4e` «Amplía el atlas político y endurece la aplicación», `6dce6c5` «Cierra el contrato técnico del atlas».

Commits exclusivos de la rama de fixes: `13b3925` «Marco de referencia en los ítems», `25b82d7` «Comprensibilidad, presentación y bug de doble lectura», `dcd9d3e` «Doble lectura para todos los partidos y retirada del id interno del ítem», `b8db555` «Guardarraíl de campos huérfanos y tramos visibles en el ranking».

## 2. Hallazgo estructural

**La rama objetivo ya integró la mayor parte de la rama de fixes** en sus dos commits posteriores al merge base (mismos diffstats en `DetallePartido.tsx`, `Likert.tsx`, `estado.ts`, `Cuestionario.tsx`, `Portada.tsx`; el propio `tests/marco-referencia.test.ts` existe en la objetivo en una variante adaptada). El diff a tres puntos `objetivo...fixes` es engañoso porque muestra fixes-contra-merge-base. La clasificación siguiente se hizo comparando **contenido actual de la objetivo contra contenido de la rama de fixes**, marcador a marcador y, en los ítems, texto a texto.

## 3. Clasificación por archivo

| Archivo | Clasificación | Evidencia y decisión |
|---|---|---|
| `data/glosario.json` | ya integrado | Los 8 términos judiciales (prisión permanente revisable, CGPJ, independencia judicial, separación de poderes, TC, Código Penal, reinserción, inviolabilidad) están en la objetivo. |
| `data/items/corrientes-derecha.json` | ya integrado / objetivo superior | `der-019` idéntico. `der-020` tiene una redacción **posterior y más afilada** en la objetivo («…sin acotar los actos que quedan protegidos», el punto exacto del debate) con los mismos `terminos`; se conserva la objetivo. |
| `data/items/democracia-instituciones.json` | ya integrado | `dem-005/006/007/008/023` idénticos texto y `terminos`. |
| `data/items/feminismos-moral.json` | ya integrado | `fem-011/013` idénticos. |
| `data/items/nucleo.json` | ya integrado / objetivo superior | `soc-006` idéntico. `nuc-001` tiene redacción posterior más precisa en la objetivo («Los doce vocales judiciales…», cifra correcta) con los mismos `terminos` y test propio en `tests/marco-referencia.test.ts:50`; se conserva la objetivo. |
| `data/items/territorial-euskadi-navarra.json` | ya integrado | `eus-004` idéntico. |
| `data/items/trabajo-estado-sindicatos.json` | **conflicto semántico + trasplante** | Ver §4. `marco` en `lab-005/006/007/018` y la des-duplicación de `lab-006` ya están. Faltan los 3 ítems de existencia del sindicato. |
| `data/schemas/item.schema.json` | ya integrado | Propiedad `marco` con `if/then` presente. |
| `docs/BANCO-ITEMS.md` | **trasplante parcial** | La objetivo reescribió el documento (117 líneas) y el principio «Marco de referencia» se perdió; se reincorpora adaptado a la estructura vigente. |
| `docs/DECISIONES-FEEDBACK-2.md` | **trasplante actualizado** | No existe en la objetivo. Se recupera con las tablas de estado puestas al día (qué quedó integrado, qué sigue abierto) y los IDs remapeados. |
| `docs/HALLAZGOS-REVISION-MOTOR.md` | **trasplante actualizado** | No existe en la objetivo. Hallazgos A/B ya corregidos allí; hallazgos 1–6 siguen abiertos y pasan al plan (ENG-*). |
| `docs/investigacion/MARCO-DE-REFERENCIA.md` | **trasplante actualizado** | No existe en la objetivo. Se recupera con los IDs sindicales remapeados y la lista de extensión pendiente convertida en tareas. |
| `scripts/validate-data.mjs` | parcial → **trasplante de 1 de 3 guardas** | Eje repetido y colisión partido↔sindicato ya están. Falta el chequeo de campos de presentación huérfanos de la `dobleLectura`; se porta. |
| `src/engine/types.ts` | ya integrado | `MarcoReferencia` + `Item.marco` presentes. |
| `tests/estado.test.ts` | ya integrado | Los 3 tests de `escalaInvertida` están (líneas 306+). |
| `tests/marco-referencia.test.ts` | parcial → **trasplante de tests sindicales** | La objetivo tiene su variante (contrato motor, `lab-006`, justicia, doble lectura) pero perdió los tests de los ítems de existencia del sindicato al no trasplantarlos; se reponen con los IDs nuevos. |
| `web/src/componentes/DetallePartido.tsx` | ya integrado | `descripcionBase` se pinta; `celda-id` retirado y sustituido por `data-item-id`. |
| `web/src/componentes/Likert.tsx` | ya integrado | Prop `invertida`, número derivado del valor. |
| `web/src/componentes/Ranking.tsx` | objetivo superior | La objetivo implementa `tramoFiabilidad` + prop `separarTramos` + `ordenada`, más completa que el `tramoDe` de la rama de fixes. Nada que portar. |
| `web/src/estado.ts` | ya integrado | `escalaInvertida`, acción `alternar-escala`, persistencia y preservación en `reiniciar`. |
| `web/src/estilos.css` | ya integrado | `.marco-contexto`, `.escala-orden`, `.lectura-contraste__base`, `.ranking-separador` presentes; `.celda-id` eliminado. |
| `web/src/vistas/Cuestionario.tsx` | ya integrado | Bloque `marco-contexto` + botón de inversión de escala. |
| `web/src/vistas/Portada.tsx` | ya integrado | Nota global «Sobre qué respondes». |
| `web/src/vistas/Resultados.tsx` | **obsoleto como parche / reimplementación en Fase 4** | El fix de `descripcionBase` ya está. La reordenación de secciones de la rama de fixes se calculó sobre un `Resultados.tsx` de ~500 líneas; la objetivo lo ha convertido en un componente de ~950 líneas (compartir, hito provisional, catálogo, doble marcador). Aplicar el parche destruiría trabajo posterior. La jerarquía pedida (brújula → candidaturas → cruces → facetas) se reimplementa sobre la versión objetivo como tarea `UX-001`. |

## 4. Conflicto semántico `lab-027` — resolución

- **Objetivo:** `lab-027` = seguimiento condicional de `lab-009` (rechazo fiscal) que mide la justificación de prioridad nacional / chovinismo del bienestar. Carga ejes `social`, `internacionalismo`, `implicacion-internacional`. **Se conserva intacto.**
- **Fixes:** `lab-027/028/029` = tríada de existencia del sindicato (prohibición bajo el sistema actual; desaparición en la sociedad deseada; motivo libertario condicional).

**Mapeo aplicado (verificado libre con búsqueda global: `lab-028/029/030` no aparecían en ningún JSON, TS, TSX, MJS ni MD del repo):**

| ID en rama de fixes | ID trasplantado | Contenido |
|---|---|---|
| `lab-027` | **`lab-028`** | «…sería legítimo que el Estado prohibiera los sindicatos independientes…» (`sistema-actual`, solo-matching, polaridad negativa) |
| `lab-028` | **`lab-029`** | «En la sociedad que defiendo, los sindicatos dejarían de tener sentido…» (`sociedad-deseada`, solo-matching) — su `notas` referencia ahora `lab-028` (antes `lab-027`) |
| `lab-029` | **`lab-030`** | «Desaparecerían porque la autoorganización directa y horizontal…» — `condicion.itemId` actualizado a `lab-029` (antes `lab-028`) |

Actualizaciones derivadas: tests (`tests/marco-referencia.test.ts`), documentación recuperada (`DECISIONES-FEEDBACK-2.md`, `MARCO-DE-REFERENCIA.md`). Ningún perfil, sindicato, referencia, grupo de evidencia ni snapshot usaba los IDs de la rama de fixes (verificado con grep global antes y después).

**Versionado del instrumento:** los tres ítems son `piloto`, solo-matching (`ejes: []`) y sin posiciones codificadas en ninguna entidad; añaden preguntas sin alterar carga, signo, texto ni condición de ningún ítem existente. Es un cambio **aditivo compatible** dentro del instrumento v4: las sesiones guardadas siguen siendo válidas (las respuestas nuevas simplemente no existen aún) y los enlaces compartidos no codifican estos ítems. La política de versionado por hash/manifiesto queda como tarea `ENG-003` (hallazgo 1 de HALLAZGOS-REVISION-MOTOR).

## 5. Qué se trasplanta en la tanda MERGE (Fase 1)

1. `data/items/trabajo-estado-sindicatos.json`: tres ítems con IDs `lab-028/029/030` (§4).
2. `tests/marco-referencia.test.ts`: describe de existencia del sindicato con los IDs nuevos.
3. `scripts/validate-data.mjs`: guardarraíl de campos de presentación huérfanos de la `dobleLectura`.
4. `docs/DECISIONES-FEEDBACK-2.md`, `docs/HALLAZGOS-REVISION-MOTOR.md`, `docs/investigacion/MARCO-DE-REFERENCIA.md`: recuperados y actualizados al estado real de la rama.
5. `docs/BANCO-ITEMS.md`: principio «Marco de referencia» reincorporado.

Cada punto con su prueba: `npm run validate:data`, `npm run typecheck`, `npm test` y grep global de IDs sin colisión.

## 6. Qué NO se trasplanta y por qué

- `web/src/vistas/Resultados.tsx` (reordenación): obsoleto como parche; reimplementación en `UX-001` sobre la versión objetivo.
- `web/src/componentes/Ranking.tsx` (separadores): la objetivo tiene una versión superior.
- `nuc-001`, `der-020`: redacciones de la objetivo posteriores y más precisas, con los mismos enlaces de glosario.
- Ningún archivo se copia entero de la rama de fixes: toda pieza se reevalúa contra el estado actual (regla «por comportamiento, no por fecha»).

## 7. Mejoras de la objetivo verificadas como conservadas

Atlas v4 con `publicacionGeometrica` y contrato técnico, compartir compacto/completo con visor (`resultadoCompartido.ts`, `CompartirResultados.tsx`, `capturaResultado.ts`), doble marcador programa/conducta, catálogo de candidaturas, presupuesto de chunks en CI, PWA v4. Línea base íntegra en verde sobre `BASE_SHA` (ver `docs/AUDITORIA-FINAL-FABLE.md`).
