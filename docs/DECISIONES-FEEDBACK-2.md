# Decisiones de diseño — segunda ronda de feedback de pilotaje

**Corte original:** 2026-07-11 (rama `claude/multi-agent-architecture-feedback-gvh156`) · **Actualizado en la integración Fable:** 2026-07-11. Cada sección lleva su **estado en la rama actual** (`fable/espectro-integracion-atlas-resultados`, base `6dce6c5`); los IDs sindicales usan ya la numeración definitiva `lab-028/029/030` (ver nota de integración en `investigacion/MARCO-DE-REFERENCIA.md`).

Este documento registra qué se cambió y **por qué**, con la evidencia detrás de cada decisión, para poder revisarlo y revertirlo con criterio.

## 1. Marco de referencia: mecanismo elegido — **INTEGRADO** (ítems con IDs remapeados)

**Feedback.** «¿El test es sobre el sistema actual o sobre el sistema que defiendes?» Ejemplo: «los impuestos son un robo» significa cosas distintas para un marxista, un anarcocapitalista o las distintas fases del liberalismo económico. Se planteó, sin certeza, un desplegable.

**Decisión: etiqueta de marco + preguntas de seguimiento + intro global.** No se añade un desplegable por pregunta.

Motivos:
- La literatura de VAA respalda el **formato ramificado** (afirmación bipolar + subpregunta que precisa el motivo) frente a preguntas con muchas opciones simultáneas. Un desplegable por ítem multiplicaría la fricción y obligaría a recalibrar toda la puntuación por marco, sin evidencia de que mejore la validez.
- Espectro **ya resuelve el caso de los impuestos** con ese formato: `lab-009` («cobrar impuestos mediante coacción es, en esencia, robo») es *solo-matching* y sus condicionales `lab-010/011/012/013` (más el seguimiento de prioridad nacional `lab-027`) identifican el motivo sin inferirlo.
- El módulo `corrientes-izquierda` demuestra el patrón correcto: **nombra el régimen en el enunciado**.

**Implementado:** campo `marco` (schema/types/validador/UI), intro global en portada («Sobre qué respondes»), marco en `lab-005/006/007/018` y tríada de existencia del sindicato `lab-028/029/030`.

**Sobre el riesgo de pregunta capciosa (post-revolución).** `lab-029` («en la sociedad que defiendo, los sindicatos desaparecerían») podía leerse como trampa. Mitigaciones: (a) etiqueta `sociedad-deseada` visible; (b) es *solo-matching*; (c) «sin opinión» siempre disponible; (d) su subpregunta `lab-030` separa el motivo libertario del comunista. **Pendiente de pilotaje:** confirmar que el enunciado no se percibe como acusatorio.

## 2. Comprensibilidad de los ítems de justicia — **INTEGRADO** (con dos redacciones posteriores mejores)

Reescritura en lenguaje llano + **8 términos nuevos de glosario** (`consejo-general-poder-judicial`, `independencia-judicial`, `separacion-de-poderes`, `tribunal-constitucional`, `prision-permanente-revisable`, `codigo-penal`, `reinsercion-social`, `inviolabilidad-jefe-estado`) mostrados con el botón «?».

Ítems intervenidos: `nuc-001`, `soc-006`, `der-019`, `der-020`, `dem-005`, `dem-006`, `dem-007`, `dem-008`, `dem-023`, `eus-004`, `fem-011`, `fem-013`. Ninguna reformulación cambia cargas de eje.

**Nota de integración:** la rama principal reformuló después `nuc-001` («Los doce vocales judiciales…», cifra exacta) y `der-020» («…sin acotar los actos que quedan protegidos», el punto preciso del debate) de forma más afilada que esta ronda, conservando los enlaces de glosario. Se mantienen esas redacciones posteriores.

## 3. Orden de la escala Likert — **INTEGRADO**

**Feedback.** «Pondría "muy de acuerdo" arriba… porque por inercia siempre me voy arriba.»

**Hallazgo.** El diseño de encuestas documenta que el orden descendente —«de acuerdo» arriba— **aumenta** las respuestas positivas (primacía + aquiescencia + deseabilidad social). El orden ascendente vigente es el conservador contra ese sesgo.

**Decisión** («lo que señale la evidencia, con un botón para invertir que trackee bien»):
- Por defecto orden ascendente («muy en desacuerdo» arriba).
- Botón para invertir con nota explicativa; preferencia persistida (`escalaInvertida`), conservada al recargar y al empezar de nuevo.
- El **número visible** se deriva del valor (−2→1 … +2→5), no de la posición: el atajo 1-5 señala siempre la misma opción y la respuesta registrada no cambia con la presentación.
- Mitigación de fondo: balance de polaridad del banco (pendiente estructural, ver BANCO-ITEMS).

## 4. Orden de la vista de resultados — **ABIERTO → tarea UX-001**

**Feedback.** «Primero el political compass, luego los partidos, luego los otros compases y luego los sliders detallados abajo.»

La reordenación de esta ronda se hizo sobre un `Resultados.tsx` de ~500 líneas; la rama principal lo ha convertido después en un componente mucho mayor (compartir, hito provisional, catálogo de candidaturas, doble marcador), así que el parche quedó obsoleto. La jerarquía pedida (resumen → brújula expandida → candidaturas del contexto → cruces/atlas → referencias/sindicatos → facetas) se reimplementa sobre la versión actual como **UX-001** en `docs/PLAN-FABLE-ESPECTRO.md`.

## 5. Bug cazado en la doble lectura — **INTEGRADO**

**Reporte.** Bajo «Programa y compromisos reiterados» aparecía un único ítem y ninguna explicación del bloque.

1. **«Solo un ítem» — no era bug del motor:** reproducido `calcularAfinidad` con el núcleo completo, el PSOE posiciona 25 ítems y devuelve 25 filas; una tabla corta solo ocurre si casi todo se respondió «sin opinión».
2. **Bug confirmado:** `DetallePartido.tsx` pintaba `etiquetaBase` pero nunca `descripcionBase` (que existe y está relleno en los 4 partidos con doble lectura). Corregido: el campo viaja en `LecturaContraste` y se renderiza simétricamente a la capa de contraste.

**Método** (reutilizable): separar datos de código reproduciendo el cálculo; comparar el dato con lo que se pinta (un campo del modelo relleno que ningún `grep` de `web/src` referencia es la firma típica); buscar asimetrías entre ramas hermanas.

**Prevención:** test de regresión sobre todos los partidos (etiqueta y descripción no vacías + el campo se transporta y renderiza) y guardarraíl de CI (§7).

## 6. El identificador interno del ítem no debe mostrarse — **INTEGRADO**

El id (`eco-003`…) se retira de la interfaz; se conserva como atributo `data-item-id` en la fila para trazabilidad/soporte. Solo puede aparecer como texto si faltara el enunciado, como último recurso defensivo.

## 7. Guardarraíl en CI: campos de presentación huérfanos — **INTEGRADO EN LA TANDA MERGE**

`scripts/validate-data.mjs` reúne los campos de la `dobleLectura` presentes en los datos (salvo los contenedores `contraste` y `posiciones`) y exige que cada nombre aparezca en el código de `web/src`. Si alguien añade un campo al modelo y a los datos pero ninguna vista lo pinta —justo lo que pasó con `descripcionBase`—, el validador lo caza en CI. Heurística por referencia textual: barata y sin falsos positivos hoy; limitación asumida (un nombre igual a una palabra común podría colarse).

## 8. Orden de los partidos en el resultado — **SUPERADO por una versión mejor**

**Reporte.** «El orden de los partidos del final no parece estar ordenado por porcentajes.»

No era fallo de cálculo: `rankingAfinidad` ordena por **tramos de fiabilidad** y, dentro de cada tramo, por porcentaje (un 100 % con un solo ítem no adelanta a un 61 % sobre 25). El arreglo de presentación de esta ronda (separadores rotulados en `Ranking`) fue reimplementado de forma más completa en la rama principal (`tramoFiabilidad` + props `separarTramos`/`ordenada`); se conserva esa versión.

## Verificación (tanda de integración, 2026-07-11)

`npm run validate:data` (378 ítems, 364 vigentes), `npm run typecheck`, `npm test` (246/246) y build en verde sobre la rama de integración. Detalle por puerta en `docs/AUDITORIA-FINAL-FABLE.md`.
