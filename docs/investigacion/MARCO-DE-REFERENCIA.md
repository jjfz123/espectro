# Marco de referencia de los ítems: sistema actual vs. sociedad deseada

**Corte:** 2026-07-11 · **Estado:** diseño aplicado al módulo de trabajo/sindicatos; propuesta de extensión para el resto del banco.

> **Nota de integración (rama `fable/espectro-integracion-atlas-resultados`):** este documento nació en la rama de feedback, donde los ítems de existencia del sindicato se llamaban `lab-027/028/029`. Al integrarlos, `lab-027` ya estaba ocupado en la rama principal por el seguimiento fiscal de prioridad nacional (condicional de `lab-009`), así que la tríada sindical vive ahora en **`lab-028` (prohibición), `lab-029` (desaparición) y `lab-030` (motivo libertario, condicional de `lab-029`)**. El texto siguiente usa ya los IDs definitivos.

## 1. El problema (feedback de pilotaje)

Un ítem del núcleo preguntaba:

> «El Estado debería reconocer una única organización sindical representativa por sector e integrarla en la gestión económica.» (`lab-006`)

La objeción del pilotaje fue exacta: **no se puede responder sin saber de qué sistema se habla.**

- En el **sistema liberal-democrático actual**, reconocer un único sindicato oficial suena a monopolio representativo impuesto.
- En un **socialismo**, la integración de los trabajadores en la gestión económica es un principio, no una amenaza.
- En un **corporativismo fascista**, el sindicato vertical único *es* el modelo (Falange: organización única de productores bajo dirección del Estado).

La misma respuesta —«de acuerdo» o «en contra»— significa cosas opuestas según el régimen que el encuestado tenga en la cabeza. Y hay un segundo problema, más sutil, sobre la **existencia misma** de los sindicatos:

> Muchos marxistas y anarquistas **no contemplan que los sindicatos existan tras la revolución** (se disuelven al desaparecer el conflicto de clase o al generalizarse la autoorganización horizontal), **pero tampoco apoyarían prohibirlos bajo el capitalismo**.

Un ítem plano del tipo «¿deben existir / ser fuertes los sindicatos?» fusiona dos preguntas que esas corrientes responden de forma opuesta según el marco temporal e institucional.

## 2. Por qué es un problema real, no una manía

1. **La literatura de diseño de VAA.** La investigación metodológica recomienda (a) evitar enunciados *double-barrelled*, (b) evitar enunciados demasiado generales y (c) **ofrecer un punto de referencia que indique el statu quo** cuando la afirmación lo necesita. Los efectos de encuadre (*framing*) sobre la respuesta están medidos.
2. **La propia tesis de Espectro.** El proyecto ya trata la *equifinalidad* (misma respuesta, motivos incompatibles) con ítems `solo-matching` y subpreguntas condicionales. El marco de referencia es otra cara del mismo problema: no basta con saber *qué* responde alguien, hay que saber *respecto a qué orden* lo responde.

El módulo `corrientes-izquierda` ya lo resuelve **nombrando el régimen en el propio enunciado** («En la transición al socialismo…»). Los ítems de trabajo/sindicatos no aplicaban ese patrón. Este trabajo lo generaliza.

## 3. La solución: un marco declarado y visible

Campo opcional `marco` en el modelo de ítem:

```jsonc
"marco": {
  "supuesto": "sistema-actual",     // | "sociedad-deseada" | "neutro"
  "aclaracion": "Piensa en el marco institucional vigente, no en la sociedad que preferirías."
}
```

- **`supuesto`** declara el orden institucional desde el que se juzga la afirmación (`sistema-actual` = statu quo; `sociedad-deseada` = el orden que la persona defiende; `neutro`, implícito al omitir el campo).
- **`aclaracion`** es la frase que la interfaz muestra como contexto junto a la pregunta. Obligatoria salvo cuando el supuesto es `neutro` (lo garantiza el esquema).

### Decisiones de diseño

1. **Aditivo y retrocompatible.** Omitir `marco` equivale a `neutro`; los ítems existentes siguen siendo válidos sin cambios.
2. **Metadato descriptivo, no puntuable.** El motor no lee `marco`: no altera afinidad ni perfil. Un test fija ese contrato (`tests/marco-referencia.test.ts`). Declarar el marco corrige el *sesgo de encuadre* en la persona que responde; no reescala el espacio ideológico, que es competencia de la calibración (fase 3).
3. **Convención por defecto.** Salvo indicación, un ítem describe el aquí y ahora; la portada lo comunica («Sobre qué respondes»).

### Capas (todas presentes en la rama actual)

| Capa | Fichero | Estado |
|---|---|---|
| Tipo de dominio | `src/engine/types.ts` (`MarcoReferencia`, `Item.marco`) | integrado |
| Esquema | `data/schemas/item.schema.json` (propiedad `marco` con `if/then`) | integrado |
| Validación | `scripts/validate-data.mjs` | integrado (+ vetos de eje repetido, colisión partido↔sindicato y campos huérfanos de presentación) |
| Datos | `data/items/trabajo-estado-sindicatos.json` | integrado: marco en `lab-005/006/007/018`; tríada `lab-028/029/030` |
| Interfaz | `web/src/vistas/Cuestionario.tsx` + `estilos.css` (bloque `marco-contexto`) y `Portada.tsx` (intro global) | integrado |
| Tests | `tests/marco-referencia.test.ts` | integrado (contrato motor + tríada con IDs definitivos + no-colisión con `lab-027` fiscal) |

## 4. Cambios concretos en trabajo/sindicatos

- **`lab-006` deja de ser doble enunciado.** El «sindicato único reconocido» se conserva; la «integración en la gestión económica» vive solo en `lab-007`. Marco `sistema-actual`.
- **`lab-005`** (independencia sindical) y **`lab-007`** (concertación tripartita) declaran `sistema-actual`.
- **`lab-018`** (sindicatos en lugar de partidos) declara `sociedad-deseada`.
- **Existencia del sindicato**, el punto del pilotaje, desdoblada en dos marcos:
  - **`lab-028`** (`sistema-actual`, solo-matching): «sería legítimo que el Estado prohibiera los sindicatos independientes». Ancla el cuasi-consenso y discrimina al corporativismo autoritario que sí los suprime.
  - **`lab-029`** (`sociedad-deseada`, solo-matching): «en la sociedad que defiendo, los sindicatos desaparecerían». Extinción como forma transitoria (anarquistas y comunistas, por razones distintas) frente a institución permanente.
  - **`lab-030`** (condicional de `lab-029`): separa el motivo libertario (horizontalidad) del comunista clásico (fin del conflicto de clase).

## 5. Extensión pendiente (para revisión de los mantenedores)

La auditoría del banco encontró más ítems dependientes de régimen. **No se han tocado sus cargas de eje**: reescalar el espacio es calibración, no redacción. Candidatos, por prioridad:

- **`dr-001`** (nacionalizar la banca, en `derecha-radical`): carga `economico -1` y sitúa a la Falange nacionalsindicalista en el polo económico-izquierdo. Requiere decidir si va `solo-matching` como `dr-014`/`dr-026`.
- **`lab-017`** (transferir empresas a cooperativas, no a ministerios): doble enunciado (desprivatizar + destino cooperativo).
- **`lab-016`** (dirección estatal de sectores estratégicos): une socialistas, fascistas y nacionalistas de economía de guerra.
- **`dem-011`** (sustituir el sistema parlamentario): candidato a `sociedad-deseada`.
- **Batería `eco-*` del núcleo** (`eco-009` sucesiones, `eco-014` grandes fortunas): candidatas a `sistema-actual` explícito.
- **`eco-002`** (gestión privada «mejora la eficiencia»): mezcla afirmación empírica y preferencia.

Aplicar `marco` a estos ítems es mecánico; decidir sus cargas de eje debe esperar al pilotaje.
