# Plan de ejecución — Fable (integración + auditoría de producto)

**Rama:** `fable/espectro-integracion-atlas-resultados` · **Base:** `6dce6c5` · **Corte:** 2026-07-11

Documento vivo. Estados válidos: `pendiente | investigando | bloqueada | implementando | en revisión | verificada | descartada con motivo`. Ningún estado pasa a `verificada` sin prueba automática o evidencia registrada en `docs/AUDITORIA-FINAL-FABLE.md`.

| ID | Prioridad | Área | Resultado esperado | Dependencias | Propietario | Archivos permitidos | Pruebas | Estado | Evidencia |
|---|---|---|---|---|---|---|---|---|---|
| MERGE-001 | P0 | Integración | Informe de comparación y clasificación de ramas | — | Fable | docs/INTEGRACION-RAMAS-FABLE.md | revisión | verificada | docs/INTEGRACION-RAMAS-FABLE.md |
| MERGE-002 | P0 | Integración | Ítems sindicales trasplantados como lab-028/029/030 sin colisión | MERGE-001 | Fable | data/items/trabajo-estado-sindicatos.json | validate:data + grep IDs | verificada | validate:data 378/364; tests 246/246; grep IDs sin colisión |
| MERGE-003 | P0 | Integración | Tests de existencia del sindicato con IDs nuevos | MERGE-002 | Fable | tests/marco-referencia.test.ts | npm test | verificada | npm test 246/246 (4 tests nuevos) |
| MERGE-004 | P1 | Integración | Guardarraíl de campos huérfanos de dobleLectura en el validador | MERGE-001 | Fable | scripts/validate-data.mjs | validate:data | verificada | validate:data en verde con la guarda activa |
| MERGE-005 | P1 | Integración | Docs de feedback/motor/marco recuperados y actualizados | MERGE-002 | Fable | docs/DECISIONES-FEEDBACK-2.md, docs/HALLAZGOS-REVISION-MOTOR.md, docs/investigacion/MARCO-DE-REFERENCIA.md | revisión | verificada | docs recuperados y actualizados; revisados contra HEAD |
| MERGE-006 | P1 | Integración | Principio «Marco de referencia» reincorporado a BANCO-ITEMS | MERGE-001 | Fable | docs/BANCO-ITEMS.md | revisión | verificada | BANCO-ITEMS §5.8 + §7 con recuento vivo |
| ENG-001 | P0 | Motor | Afinidad sin solape devuelve estado `sin-datos` discriminado, no 0; ordenación/UI/serialización adaptadas | — | Fable | src/engine/matching.ts, src/engine/types.ts, consumidores en web/src, tests/ | unit + typecheck + E2E básico | pendiente | — |
| ENG-002 | P0 | Motor | `itemsRespondidos` deja de sobrecargarse en referencias.ts y espacio.ts; campos con semántica propia | ENG-001 | Fable | src/engine/referencias.ts, src/engine/espacio.ts, types.ts, consumidores | unit | pendiente | — |
| ENG-003 | P1 | Motor | Manifiesto/hash reproducible del instrumento + política de migración comprobada programáticamente (v3→v4 deja de ser aceptación en bloque) | — | Fable | scripts/, web/src/estado.ts, data/version.json | unit + validate | pendiente | — |
| ENG-004 | P1 | Motor | Desbloqueo de módulos y resultados usan la misma fuente de verdad (secuencia activa) con decisión documentada | — | Fable | web/src/vistas/Modulos.tsx, web/src/estado.ts | unit | pendiente | — |
| ENG-005 | P2 | Motor | `indice` persistido no salta de ítem al editar un padre condicional | ENG-004 | Fable | web/src/estado.ts, Cuestionario.tsx | unit | pendiente | — |
| ENG-006 | P2 | Motor | Avisos de validador: eje sin ítems vigentes, módulo vacío, seguimiento sin padre | — | Fable | scripts/validate-data.mjs | validate | pendiente | — |
| ENG-007 | P1 | Motor | Contrato de grupos de puntuación: una rama condicional no puede sobreponderar un tema en un eje | ENG-001 | Fable | src/engine/ideologia.ts, schema, validador | unit | investigando | — |
| ELEC-001 | P0 | Electoral | `scripts/auditar-contexto-electoral.mjs`: recorre 21 convocatorias, falla cerrado (IDs, territorios, duplicados, foráneas, relaciones) | — | Fable/Sonnet | scripts/auditar-contexto-electoral.mjs, package.json | fixtures + ejecución | pendiente | — |
| ELEC-002 | P0 | Electoral | Tests parametrizados de contención territorial para TODAS las convocatorias incl. Ceuta y Melilla | ELEC-001 | Fable/Sonnet | tests/ | unit | pendiente | — |
| ELEC-003 | P1 | Electoral | Autonómica sin CCAA: estado vacío explicativo, nunca lista inventada; datos incompletos fallan cerrado | ELEC-001 | Fable | src/engine/elecciones.ts, web/src | unit + E2E | investigando | — |
| ATLAS-001 | P0 | Atlas | La brújula principal separa visualmente y en tipos: calculada / provisional / editorial / sin datos; ninguna región editorial pasa por calculada | — | Fable | web/src/componentes/MapaPolitico.tsx, atlasIdeologias.ts, engine | unit + visual | pendiente | — |
| ATLAS-002 | P1 | Atlas | Vista por casillas/regiones semánticas en escritorio (zoom, búsqueda, filtros, ficha) | ATLAS-001 | Fable+Sonnet | web/src (componentes nuevos) | E2E + visual | pendiente | — |
| ATLAS-003 | P1 | Atlas | Vista móvil: brújula resumida + cuadrícula/lista accesible + ficha en dialog | ATLAS-002 | Sonnet | web/src | E2E + visual | pendiente | — |
| UX-001 | P0 | Resultados | Jerarquía: resumen → brújula expandida → ranking contextual → cruces/atlas → referencias/sindicatos → facetas → compartir; referencia estatal plegada y rotulada no votable | ENG-001 | Fable | web/src/vistas/Resultados.tsx, estilos.css | E2E + visual | pendiente | — |
| UX-002 | P1 | Resultados | Brújula principal de carga inmediata sin Three.js ni atlas pesado; alternar conjuntos de puntos | UX-001 | Fable | web/src | budget + E2E | investigando | — |
| UX-003 | P1 | Resultados | Ranking agrupado por candidatura votable con desplegables accesibles; componentes sin herencia | UX-001, ELEC-001 | Fable | web/src, engine/elecciones.ts | unit + E2E | pendiente | — |
| UX-004 | P1 | Cuestionario | Atajos de teclado inertes con foco en controles interactivos; número = valor semántico en ambos órdenes | — | Sonnet | web/src/vistas/Cuestionario.tsx | unit + E2E | pendiente | — |
| UX-005 | P2 | Glosario | Etiqueta de fuente del enlace según dominio/fuente declarada, no «Wikipedia» fijo; rel seguro | — | Sonnet | web/src, data/glosario.json | unit | pendiente | — |
| A11Y-001 | P1 | Accesibilidad | Axe sin violaciones serias; foco, diálogos, reduced motion, lector básico | UX-001 | Sonnet | web/src | axe + E2E | pendiente | — |
| A11Y-002 | P1 | Responsive | 320/360/390/768/1024/1280/1440 sin overflow, claro/oscuro | UX-001 | Sonnet | web/src/estilos.css | visual | pendiente | — |
| SHARE-001 | P1 | Compartir | Verificar contrato actual compacto/completo, preview exacta, límites de parser; fuzz + fixtures v1; versionar v2 solo si cambia semántica | ENG-001 | Fable | web/src/resultadoCompartido.ts, compartirResultados.ts, tests | unit + fuzz + E2E | investigando | — |
| DATA-001 | P2 | Datos | `scripts/auditar-glosario.mjs`: términos huérfanos, URLs, alias duplicados, ítems complejos sin ayuda | — | Sonnet | scripts/ | fixtures | pendiente | — |
| DATA-002 | P2 | Datos | `scripts/auditar-fuentes.mjs`: fechas, consulta, tipo, home genérica vs documento | — | Sonnet | scripts/ | fixtures | pendiente | — |
| DATA-003 | P2 | Datos | Glosario ampliado con candidatos auditados (subsidiariedad, centralismo democrático, consejos obreros, plurinacionalidad, decrecimiento…) | DATA-001 | Sonnet | data/glosario.json, items | validate | pendiente | — |
| QA-001 | P0 | Calidad | E2E Chromium+Firefox+WebKit en verde local (navegadores ya instalados) | — | Fable | web/ | playwright | pendiente | — |
| QA-002 | P0 | Calidad | Revisión adversarial independiente por tanda + matriz global antes/después + informe final | todas | Fable | docs/AUDITORIA-FINAL-FABLE.md | matriz | pendiente | — |

## Notas de alcance

- Los P0 de este plan son los del prompt del propietario (§6, §7, §8) más los gates de `AGENTS.md`. Los P0 nominales del TODO (65 perfiles, 178 rótulos, 323 candidaturas) **no se cierran en esta tanda**: requieren investigación documental humana/por fases y siguen gobernados por `docs/TODO-MAPEO-EXHAUSTIVO.md`.
- Prohibiciones activas (§24 del prompt): no inventar posiciones, no mover coordenadas, no merge ciego, no E2E «verde» sin navegador, no push a `main`.
