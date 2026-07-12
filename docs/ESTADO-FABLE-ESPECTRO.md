# Estado de la sesión — Fable (bloque atlas-cuadrante)

**Actualizado:** 2026-07-12 (mediodía) · Documento de relevo: otro agente debe poder continuar desde aquí sin reconstruir contexto.

## ESTADO ACTUAL (léelo primero; lo de abajo es historial de bloques)

- **Base:** `origin/main` = `c42e406` (PR #2 fusionado por orden del propietario). Rama de trabajo `fable/todo-atlas-cuadrante`, checkpoint continuo en `claude/espectro-root-agent-fr21qz`; punta ≈ `58ba664`. NADA se toca en `main` sin orden expresa.
- **Números vivos:** 397 ítems (383 vigentes; cul-015/016, izq-047/048, der-027 nuevos piloto) · 51 términos de glosario · **1.385 posiciones partidistas** (línea fijada del TODO) · candado contratoFuncional 289 tareas · **740 casillas abiertas** (−21 hoy) · 433 tests unit · 28 E2E (puerto limpio 4790) · presupuesto web verde.
- **Jornada 2026-07-12 (bloques cerrados, AUDITORIA §§20-32):** doble lectura completa PSOE/PP/VOX/Sumar con disclaimer+fechas (triaje 4/10 del dosier Sonnet J, §20) · ítems derivados LeftValues (§21) · limitaciones metodológicas visibles (§22) · adversarial del felipismo sin cambios de valor (§23) · monotemáticos con contrato (§24) · tarjeta compartida cobertura-primero SIN romper enlaces ni clientes + caso Madrid (§25) · revisión re-evalúa desbloqueos (§26) · simetría de desbloqueos 0 asimetrías (§27) · **incidente de aislamiento del agente de autonomías contenido y reglas endurecidas** (§28: encargos solo con cwd del worktree; sin `git add -A` con agentes vivos; validadores sin `| tail` en cadenas) · contexto de participación «concurre dentro de la candidatura X» (§29) · integración final autonomías: Cs 9→13, CHA +1, informe AUTONOMIAS-COBERTURA (§30) · **órdenes del propietario: atlas único sin variante simplificada + Enciclopedia ideológica desde la portada** (§31) · trinquete de fechas «solo decrece» (§32).
- **Agente EN VUELO:** Opus «campo comunista» en su worktree aislado con el informe íntegro del propietario (mejorar PCTE/PCPE/PCE/IU/UPG/NA/Recortes-Cero; altas CRT/Frente Obrero/PCOE/POSI/IZAR/IzCa; referencias doctrinales para GKS-MS, Línea Proletaria, trotskismo por Internacional, PSUC Viu, Comunistes, PCE m-l; ilegalizadas SOLO documentadas; ítems nuevos = propuesta). Reintegración = tarea #18 con filtro endurecido. Latido rearmado.
- **Colas del propietario/humanas:** URLs de §§20-32 · pasaje verbatim sd-019 felipista · lab-016 falangismo · veto nacional-catolicismo (decisión editorial) · levantamiento del veto felipista tras cotejo literal · tanda dedicada de fuerzas sin perfil (PRC 21%, CpM, MDyC, Ceuta Ya!, MÉS) · fechado de la deuda 161+82 del trinquete · propuesta de ítems del campo comunista (memoria del socialismo real, reconstitución, clase-vs-movimientos) para diseñar FABLE+propietario.

**Sesión autónoma nocturna en curso (orden del propietario, 2026-07-12 ~00:04, tras el corte por límite de sesión de las 12am UTC):** trabajar de forma independiente sin pedir checks ni verificación hasta completar el TODO; regla dura registrada en `TODO-MAPEO-EXHAUSTIVO.md` §Reglas de cierre. La autonomía no relaja puertas, adversarial, «solo crece» ni la prohibición de tocar `main`.

## SHAs

- **HITO 2026-07-12 ~00:35 UTC:** el propietario ordenó por escrito llevar el trabajo a `main` → **PR #1 fusionado** (`e768cc8`, método merge, 26 commits). `main` ya NO está en la base congelada original (`4f54de9`): contiene todos los bloques 1-4 de esta sesión.
- **Base actual de trabajo:** `origin/main` = `e768cc8`. Rama local `fable/todo-atlas-cuadrante` REINICIADA desde ese main (regla de PR fusionado: no se apila sobre historia fusionada); checkpoint remoto `claude/espectro-root-agent-fr21qz` sincronizado con la nueva historia.
- Trabajo post-merge en la rama: `a71641b` (veto republicanismo re-motivado) · `4916d80`/`321214d` (fichas anarcofeminismo y anarquismo-queer) · docs de este cierre.
- Commits: `e26ff1c` UI del cuadrante · `db58679` datos de referencias (cherry-pick del worktree `agent/atlas-poblar-referencias`, entrega `e0e1669`) · `8f64518` E2E anclas · `14e726f` cierre adversarial+casillas · `4b794bd` mecánica del glosario (esquema+motor+panel «Más detalle») · contenido de las 13 ampliaciones + tests-contrato (este commit).

## Bloque ejecutado: atlas-cuadrante (casillas TODO §Resultado ideológico)

- **Vista de profundidad por defecto** y cuadrante desplegado sin exigir clic: **HECHO y marcado** (E2E de contrato; sin puerta «Abrir mapa interactivo»; chunk perezoso automático; foco solo tras reapertura 3D).
- **Vista simple** (compass pelado) conmutable, nunca inicial: **HECHO y marcado** (E2E dedicado).
- **Clicabilidad ≥44×44 px** en todos los puntos + desambiguación de cúmulos + foco gestionado: **HECHO y marcado** (E2E con medición en 320/360/390 para puntos y anclas; radio de cúmulo 48/80 acorde al solape real).
- **Poblar Economía×Sociedad**: PROGRESO **18→23 de 61** con 18 posiciones documentadas (cita/URL/fecha/calidad) — casilla abierta (mejora continua), conteo vivo actualizado y manifiesto regenerado. Vetos resueltos con recálculo: democracia-cristiana (social −42,3→+2,6), eurocomunismo (económico +18,2→−31,8). Falangismo-1934 queda FUERA por honestidad (3 anclas sociales; un pasaje no puede contar dos veces) con test-guardia.
- **Posición real de partidos**: mecanismo intacto y ahora con test de regresión (`tests/referencias-mapa-macro-proyeccion.test.ts`); casilla abierta (faltan partidos que alcancen el umbral — trabajo de la categoría Partidos 65).

## Bloque 2 ejecutado: glosario-ampliaciones (feedback del propietario)

Encargo textual: «ampliar el ? del glosario explicando más cosas de las preguntas» (ejemplo dado: concierto económico). Entrega: campo opcional `ampliacion` (esquema 200-900; su descripción prohíbe insinuar puntuación) + panel plegado «Más detalle» dentro del «?» del cuestionario (mecánica en `4b794bd`), y **13 ampliaciones** (591-804 caracteres) redactadas por Fable sobre TRES investigaciones independientes que convergen (consolidador de 13 términos + rama económico-laboral + plan-B sin fan-out): autodeterminación, concierto económico, foralismo, ordinalidad, REF canario, mochila austriaca, impuesto plano, pensiones (reparto/capitalización), educación concertada, democracia orgánica, sindicato vertical, CGPJ y prisión permanente revisable. Contrato protegido: `tests/glosario-ampliacion.test.ts` (los 13 ids conservan su ampliación; lint de pistas prohibidas; no copia de la definición) + E2E extendido (el panel llega plegado, abre bajo demanda, >150 caracteres). No nace de casillas del TODO (verificado: no hay casillas de glosario), así que no toca el inventario ni sus candados. Avisos y fuentes en AUDITORIA §15.

**Matriz del bloque 2 (reejecutada por el integrador):** validate:data ✓ (39 términos, 13 con ampliación) · typecheck raíz+web ✓ · test **381/381** ✓ (+15 del contrato) · web:build ✓ · web:budget ✓ (inicial **111,6/120 KiB**, resto sin cambios) · E2E **25/25** ✓ (puerto limpio 4790, glosario extendido) · git diff --check ✓ · visual escritorio/320/360, claro y oscuro (capturas del arnés).

## Bloque 3 ejecutado: tanda partidos-citas (TODO categoría Partidos; casillas 61/86 en avance)

Pipeline completo: 2 investigadores Sonnet (pasajes verbatim PP+PSOE / CUP+MM) → filtro del integrador «solo confianza alta» (20 de ~40 filas) → Opus en worktree desde `d007260` (17 aplicadas, 3 omisiones válidas) → cherry-pick → **revisión adversarial (12 hallazgos: 2 P0 aceptados con retirada — dem-009 del PSOE por las SSTC 148/2021 y 183/2021, y la cita de eco-009 de MM por atribución dudosa — más 6 correcciones menores y la retención de eco-013 elevada a decisión del propietario)**. Resultado neto, verificado en auditoría, E2E y visual: **la brújula pasa de 1 a 2 provisionales (entra Más Madrid, −34,6/−53,8, tras corregir su signo X de +50 con 2 anclas a 4 anclas equilibradas)** · CUP conserva provisional y sube X de 3 a 5 grupos (−61,0) · **PSOE se dibuja por primera vez en el plano detallado Economía×Sociedad** (2.º partido; X −100→−46,2 sin extremo; su Y sigue extremo a la espera de la cita de dem-008) · PP sin cambios (hueco honesto). «CUP sin moderadora social» quedó CONFIRMADO por refutación adversarial. Detalle completo y deudas en AUDITORIA §16.

**Matriz del bloque 3 (HEAD actual, reejecutada por el integrador):** validate:data ✓ · evidence-groups ✓ (aviso preexistente inalterado) · todo-inventory ✓ (total 1.357, candado original restaurado) · typecheck ✓ · test **381/381** ✓ · web:build ✓ · web:budget ✓ (resultados 274,0/390) · audit:partidos ✓ (0 sólidas, **2 provisionales**, 17 extremos-insuf) · audit:atlas ✓ · audit:electoral ✓ · E2E **25/25** ✓ (puerto limpio 4790) · git diff --check ✓ · visual: brújula con 2 huecos y plano detallado con FO+PSOE, claro/oscuro (capturas archivadas).

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

1. Presentar al propietario el informe de los DOS bloques (atlas-cuadrante y glosario); con su visto bueno, decidir PR contra `main` (nunca push directo).
2. El propietario decide: redacción de la casilla de presupuestos desfasada; si la casilla «poblar» se considera cerrada o sigue de mejora continua; verificación humana de URLs primarias (tanda 1 + dosieres del glosario, listadas en AUDITORIA §14-15).
3. CERRADA — tanda Partidos (bloque 3, ver arriba). Decisiones del propietario que deja: (a) retención de la cita de eco-013 (CUP) vs. aceptar CUP insuficiente — hoy prima la norma «solo crece»; (b) cola de verificación humana: eco-005 (CUP/Verificat), dem-008 (PSOE/PDF congresual, la moderadora correcta de su Y), atribución del titular de Infobae (MM eco-009), PP eco-008.
4. Candidatos a siguiente bloque (NO iniciados, §0): regresiones nominales de geometría (casilla 70: BNG/Falangismo/Distributismo); marcadores programa-vs-conducta de PSOE/PP/VOX/Sumar (casillas 78-81); guardarraíl de deduplicación de pasajes para referencias; `resolucionCero` validado para referencias.

## Claves del entorno

npm 10.9.7 / node v22.22.2 (sin el shim corepack del relevo previo). E2E: `PLAYWRIGHT_PORT` limpio (4790 usado) + `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/opt/pw-browsers/chromium` (el binario 1228 que pide @playwright/test no existe en la imagen; **no** ejecutar `playwright install`). Push directo bloqueado por el clasificador de permisos salvo petición expresa del propietario en la conversación.
