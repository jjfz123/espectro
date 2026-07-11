# Revisión adversarial del motor, datos y persistencia

**Corte original:** 2026-07-11 (rama `claude/multi-agent-architecture-feedback-gvh156`) · **Actualizado en la integración Fable:** 2026-07-11, rama `fable/espectro-integracion-atlas-resultados` (base `6dce6c5`). El estado de cada hallazgo se ha reverificado contra el HEAD actual; los abiertos tienen tarea en `docs/PLAN-FABLE-ESPECTRO.md`.

**Alcance:** `src/engine/*`, `scripts/validate-data.mjs`, persistencia (`web/src/estado.ts`, `web/src/datos.ts`) y su cableado con las vistas.

Conclusión general: el motor y la persistencia están escritos de forma **muy defensiva**. No se encontró ningún NaN, división por cero sin proteger ni corrupción activa. Los hallazgos son **divergencias entre capas** y **huecos del validador**, ninguno disparado por los datos actuales.

## Corregidos (ya presentes en la rama actual)

### A. El validador no vetaba un eje repetido dentro de un ítem — CORREGIDO
`scripts/validate-data.mjs` (bucle de ítems). `calcularFacetas` suma **todas** las entradas de `item.ejes`, mientras que el validador y el atlas usan solo la **primera** coincidencia (`.find`). Un eje repetido duplicaría su peso en el perfil sin que las demás capas lo reflejasen. El validador lo rechaza. 0 casos en datos.

### B. El validador no detectaba colisión de id partido↔sindicato — CORREGIDO
Partidos y sindicatos comparten el espacio de identificadores de `PerfilAfinidad`; el veto existe ya en `scripts/validate-data.mjs`. 0 casos.

### C. Campos de presentación huérfanos en la `dobleLectura` — CORREGIDO EN ESTA INTEGRACIÓN
Portado de la rama de fixes en la tanda MERGE (2026-07-11): si un campo de la doble lectura existe en los datos y ninguna vista de `web/src` lo referencia, `validate:data` falla. Es la clase de fallo que dejó «pelado» el bloque de `descripcionBase`.

> El sub-hallazgo «división por `denominador.valor`» en convocatorias **no requiere cambio**: el esquema ya exige `minimum: 1`.

## Abiertos (decisión de producto o calibración; con tarea asignada)

### 1. La migración v3→v4 es una aceptación en bloque — riesgo real para returning users → **ENG-003**
`web/src/estado.ts:337-345`. Una sesión con `versionInstrumento: "3"` se declara compatible y se reinterpreta bajo las cargas v4 **sin comprobación programática**: la única garantía es un comentario. Recomendación: versionar por *hash* del subconjunto de ítems relevantes, de modo que un cambio de cargas invalide automáticamente, con aviso al usuario en lugar de borrado silencioso.

### 2. El desbloqueo de módulos usa todas las respuestas guardadas; los resultados solo la secuencia activa → **ENG-004**
`web/src/vistas/Modulos.tsx` vs. `web/src/vistas/Resultados.tsx`. Un usuario puede ver dos posiciones ideológicas distintas según la pantalla. Recomendación: unificar la fuente de verdad y documentar si se conservan las respuestas de módulos desactivados.

### 3. `indice` indexa una secuencia dinámica → **ENG-005**
`web/src/estado.ts` (`siguiente`/`anterior`) y `Cuestionario.tsx`. Editar un padre que oculta una subpregunta anterior al índice hace que el mismo índice apunte a otro ítem. No corrompe datos; puede saltar visualmente un ítem.

### 4. `calcularAfinidad` devuelve `puntuacion: 0` cuando el solapamiento es cero → **ENG-001 (P0)**
`src/engine/matching.ts:96-97`. Indistinguible de una afinidad real del 0 %. Hoy la UI lo mitiga (tramo «sin posiciones comparables» por `itemsComparados === 0`), pero sigue siendo un *footgun* de la API pública, y la serialización de resultados compartidos es un consumidor expuesto. Recomendación aceptada: resultado discriminado `calculable | sin-datos`.

### 5. `compararReferenciasDoctrinales` reutiliza `itemsRespondidos` con otra semántica → **ENG-002 (P0)**
`src/engine/referencias.ts:41` (`itemsRespondidos: itemsDefinitorios`) y también `src/engine/espacio.ts:175` (`itemsRespondidos: recibo.grupos`). Un componente que reutilice el campo esperando «respuestas con opinión del usuario» mostrará un número incorrecto (`Ranking.tsx` lo renderiza como «Comparados X de tus Y ítems con respuesta»).

### 6. Huecos menores del validador → **ENG-006**
No comprueba que cada eje de `ejes.json` sea usado por algún ítem vigente (eje muerto → faceta siempre `null`) ni que cada módulo tenga al menos un ítem. Añadir como **avisos** no bloqueantes.

## Zonas revisadas y correctas (tranquilidad adversarial)

- **«Sin opinión» (`valor null`)**: excluido de forma consistente en matching, facetas y visibilidad condicional (nunca activa una rama).
- **Normalización y signos** de `calcularFacetas`: rango [−100, 100] garantizado; afinidad ∈ [0, 100].
- **Peso ×2 «importante»**: aplicado simétricamente a numerador y denominador; no contamina el perfil ideológico.
- **Limpieza de condicionales huérfanas**: `while(huboCambios)` cubre cadenas multinivel, en `responder` y al cargar.
- **Persistencia**: valida versión, valores Likert, ids, caducidad de 90 días y re-deriva fases inconsistentes.
