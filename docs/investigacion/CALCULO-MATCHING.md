# Cálculo del matching: métodos, cobertura, ponderación, Mokken/IRT, CAT y coaliciones

Fecha de corte: 10 de julio de 2026.
Origen: investigación profunda automatizada (104 subagentes, 5 ángulos, 18 fuentes, 76 afirmaciones candidatas). Verificación adversarial: **15 confirmadas (3-0), 1 refutada (0-3), 9 sin verificar** por límite de sesión. Solo lo confirmado se presenta como hallazgo.

## 1. Síntesis ejecutiva

El resultado más importante de esta tanda **no es una novedad, es una confirmación**: de las 15 afirmaciones verificadas, la inmensa mayoría reconfirma —a veces citando literalmente los mismos artículos, con las mismas cifras— decisiones que `docs/METODOLOGIA.md` ya documenta y que `src/engine/matching.ts` ya implementa. No hay ninguna contradicción entre lo confirmado y las decisiones vigentes del proyecto. Los puntos donde la investigación *sí* tocaba terreno nuevo para Espectro (efecto real de la ponderación por importancia, imputación de posiciones de partido, validación dinámica Mokken, CAT con datos reales) **fallaron todos por límite de sesión** y quedan como pendientes explícitos, no como hechos.

Un sub-frente entero —**optimización computacional client-side en navegador móvil**— no produjo ni una sola afirmación verificada ni sin verificar: el ángulo de búsqueda no llegó a generar reclamaciones comprobables. Con 371 ítems × 48 partidos (~17.800 celdas como máximo, la mayoría vacías), el problema es hoy trivial para el hilo principal del navegador; no hay evidencia — ni falta de ella — de que Espectro necesite *workers* o estructuras precalculadas todavía.

## 2. Hallazgos confirmados (3-0), con fuente

### 2.1. El modelo espacial y la métrica de distancia importan más que los detalles del algoritmo

- El consejo de un VAA depende fuertemente del modelo espacial usado para calcular el emparejamiento: «Los resultados indican que el consejo depende fuertemente del modelo espacial adoptado. Una mayoría de los usuarios de StemWijzer habría recibido otro consejo si se hubiera usado otro modelo espacial» — [link.springer.com/article/10.1057/ap.2013.30](https://link.springer.com/article/10.1057/ap.2013.30) (Louwerse & Rosema).
- El objeto de estudio de ese artículo es exactamente la elección de método de matching: compara sistemáticamente el método de coincidencia exacta de StemWijzer, la distancia city-block, la euclídea y los modelos espaciales de baja dimensión — misma fuente.
- Wagner & Ruusuvirta (2012) establecen que los algoritmos de matching de los VAA operacionalizan mayoritariamente el modelo de proximidad (congruencia de posiciones, familia city-block/Manhattan), con solo algunos VAA añadiendo elementos direccionales o de saliencia — [link.springer.com/article/10.1057/ap.2011.29](https://link.springer.com/article/10.1057/ap.2011.29). Esto sitúa la distancia Manhattan que usa Espectro como el estándar de facto del campo, no una elección idiosincrática.

### 2.2. Selección adaptativa de ítems (CAT): la arquitectura de referencia ya es la que cita Espectro

- Sigfrid (2024) propone un método de cuestionario adaptativo que extiende el modelo de respuesta graduada (GRM) de Samejima y el criterio de máxima información (MIC) de la teoría de respuesta al ítem, combinando MIC con pesos dimensionales — [link.springer.com/article/10.1007/s11135-024-01845-6](https://link.springer.com/article/10.1007/s11135-024-01845-6).
- Con pocos ítems respondidos, este método adaptativo supera a un test de orden fijo de la misma longitud a la hora de identificar el mejor partido/candidato — misma fuente.
- Logra interpretabilidad en un contexto multidimensional seleccionando ítems de un banco organizado en **escalas unidimensionales separadas**, en vez de ajustar un modelo IRT multidimensional completo — misma fuente.

### 2.3. La longitud de la escala y el tratamiento de «sin opinión» no son neutrales

- La longitud de la escala de respuesta (binaria, 5 puntos, 101 puntos) cambia materialmente el partido recomendado: transformar las mismas respuestas de una escala de 101 puntos a formatos más cortos produjo recomendaciones distintas para muchos usuarios (excepto perfiles extremos) — [onlinelibrary.wiley.com/doi/full/10.1002/poi3.139](https://onlinelibrary.wiley.com/doi/full/10.1002/poi3.139) (*Policy & Internet*, 2017).
- En los conjuntos de datos de VAA usados por un estudio (estilo Choose4Cyprus/Choose4Greece), las respuestas «sin opinión» explícitas y las preguntas no respondidas se codifican como valores ausentes, **nunca como el punto medio** — [link.springer.com/chapter/10.1007/978-3-642-41013-0_51](https://link.springer.com/chapter/10.1007/978-3-642-41013-0_51) (Katakis et al.).
- El mismo estudio mide cuantitativamente cómo el número de valores ausentes degrada distintos métodos de predicción de voto — evidencia empírica de que la cobertura parcial sesga el consejo — misma fuente.

### 2.4. Cuatro palancas del matching y su magnitud medida

- Los debates sobre algoritmos de matching se concentran en cuatro aspectos: dimensionalidad, métrica de distancia, uso de pesos y tratamiento de valores ausentes — [frontiersin.org/.../10.3389/fpos.2024.1286893/full](https://www.frontiersin.org/journals/political-science/articles/10.3389/fpos.2024.1286893/full).
- Distintos algoritmos aplicados a los mismos datos de usuario y partido tienen muchas probabilidades de producir consejos distintos, y la fiabilidad de las posiciones de partido estimadas en los VAA ha sido puesta en duda (citando a Gemenis y van Ham, 2014) — misma fuente.
- El tratamiento de valores ausentes puede producir inferencias erróneas o **penalizar sistemáticamente a los partidos sin posición en varios ítems** — misma fuente.
- Gemenis (2013) identifica cuatro áreas problemáticas en cómo los VAA estiman posiciones de partido: la redacción de las afirmaciones, el formato de la escala de respuesta, la fiabilidad de codificar afirmaciones en la escala, y la fiabilidad/validez de agrupar ítems en dimensiones — [link.springer.com/article/10.1057/ap.2012.36](https://link.springer.com/article/10.1057/ap.2012.36).

### 2.5. El sesgo de selección de ítems, cuantificado

- Cambiar el método de matching (parámetro de la aplicación) puede desplazar la frecuencia de recomendación de un partido hasta un 105 %, con datos reales de Smartvote — [arxiv.org/pdf/2505.13329](https://arxiv.org/pdf/2505.13329) (Baumann et al.).
- Elegir los ítems del cuestionario a conveniencia («cherry-picking») puede aumentar la frecuencia de recomendación de un partido más de un 261 % — misma fuente.

## 3. Lo que esta tanda NO pudo verificar (no usar como hecho)

Todas fallaron por límite de sesión, no por refutación:

- Las dos correcciones estándar de diseño para posiciones de partido ausentes: imputar la categoría neutral (como EU Profiler/EUandI) frente a dividir la puntuación agregada entre el número de afirmaciones respondidas.
- Que las escalas de dimensión de los VAA a menudo carezcan de unidimensionalidad y fiabilidad, y que Germann y Mendez (2016) propusieran validación dinámica de escalas mediante análisis Mokken sobre respuestas reales tempranas tras el lanzamiento — **esta es justo la cita que `docs/METODOLOGIA.md` §7.2 ya usa** («propuesta de Germann & Méndez para VAAs»); esta tanda no logró reverificarla, pero tampoco la contradice.
- El hallazgo (Niemi & Bartels, NES 1979/1980) de que ponderar por la importancia autodeclarada de cada ítem **no mejora** la predicción del voto, robusto a formato de pregunta, muestra y codificación.
- Un resultado similar con el PSID (N=5.049): ponderar por importancia autodeclarada tampoco mejoró la correlación en un dominio de satisfacción vital, robusto a método analítico.
- Que las versiones cortas estáticas de Smartvote den una precisión de recomendación por debajo del 40 %, y que un modelo IRT adaptativo (IDEAL + criterio PosteriorRMSE) suba esa precisión al 74 % con el mismo número de preguntas.
- Que el método adaptativo de Sigfrid prediga las respuestas no contestadas mediante un encoder/decoder en un espacio político latente de dos dimensiones.

**Refutada (0-3)**: la afirmación de que las posiciones de partido codificadas en un VAA tienen buena validez convergente en las dimensiones económica e izquierda-derecha pero mucho peor en inmigración y medio ambiente — el verificador la rechazó, así que **no debe usarse** como argumento para tratar de forma distinta los ítems de esos dominios.

**Recomendación**: la afirmación sobre ponderación por importancia (Niemi & Bartels) es la que más directamente tocaría una decisión de diseño vigente (`wᵢ = 2` para ítems marcados importantes, `docs/METODOLOGIA.md` §2). Como quedó sin verificar, no se trata como contradicción — pero merece una investigación dedicada antes de tocar la fórmula: si se confirmara con fuentes sólidas, sería motivo de una revisión metodológica explícita y documentada, no de un cambio silencioso.

## 4. Acciones concretas para Espectro

| Hallazgo | Estado en el proyecto |
|---|---|
| El modelo espacial/métrica de distancia determina el consejo más que el resto del algoritmo | **Ya cubierto y citado.** `docs/METODOLOGIA.md` §2 y §6 citan a Louwerse & Rosema explícitamente («la mayoría de usuarios recibiría otra recomendación con otro modelo espacial») como justificación de publicar la fórmula y no cambiarla sin motivo. |
| La distancia city-block/Manhattan es el estándar de facto del campo (Wagner & Ruusuvirta) | **Ya cubierto, cita nueva disponible.** Espectro ya usa Manhattan (`src/engine/matching.ts`, `calcularAfinidad`) justificándolo por Wahl-O-Mat/StemWijzer; esta fuente añade respaldo académico adicional a una elección ya tomada. No cambia nada; se puede añadir como cita complementaria en `docs/METODOLOGIA.md` §2 si el supervisor lo considera útil, sin urgencia. |
| CAT con GRM + MIC + pesos dimensionales, seleccionando de escalas unidimensionales | **Ya cubierto y citado de forma idéntica.** `docs/METODOLOGIA.md` §7.3 ya cita a Sigfrid (*Quality & Quantity*, 2024) con esta misma arquitectura como referencia para el CAT futuro. Sin implementar todavía (correctamente: el propio documento lo marca como paso 3 de calibración, posterior al piloto). Ninguna acción nueva. |
| La longitud de escala cambia el consejo | **Ya cubierto y citado.** `docs/METODOLOGIA.md` §6 («Longitud de la escala», *Policy & Internet* 2017) usa esta misma fuente para justificar la escala de 5 puntos como decisión estable, no arbitraria. |
| «Sin opinión» y no-respuesta deben codificarse como ausentes, nunca como punto medio | **Ya implementado.** `Likert.tsx` separa explícitamente el punto neutral (cuenta) de «sin opinión» (`valor: null`, excluido); `calcularAfinidad` filtra `r.valor !== null` antes de comparar. Coincide con Katakis et al., ya citado en METODOLOGIA §6. |
| Cuatro palancas del matching: dimensionalidad, métrica, pesos, valores ausentes | **Ya cubierto y citado con las mismas palabras.** `docs/METODOLOGIA.md` §6 cita literalmente «cuatro palancas» de *Frontiers in Political Science* 2024. |
| Valores ausentes penalizan sistemáticamente a partidos con pocas posiciones documentadas | **Ya implementado.** `calcularAfinidad` calcula `cobertura` y marca `bajaCobertura` cuando `cobertura < umbralCobertura` (0,5 por defecto) o `itemsComparados < minimoItems` (10 por defecto); `rankingAfinidad` ordena primero por esa categoría y nunca oculta el dato, solo lo señala. Coincide exactamente con la advertencia de Frontiers 2024. |
| Cherry-picking de ítems puede inflar la recomendación de un partido un 261 %; cambiar el método de matching hasta un 105 % | **Ya cubierto y citado con las mismas cifras.** `docs/METODOLOGIA.md` §6 cita a Baumann et al. (arXiv:2505.13329) con exactamente estos dos porcentajes. |
| Ponderación por importancia autodeclarada podría no mejorar la predicción (Niemi & Bartels, PSID) | **Sin verificar — no accionable todavía.** No se toca `wᵢ = 2`. Se documenta como pregunta abierta para una futura investigación dedicada, no como hallazgo. |
| Mokken/IRT para validar dimensionalidad con datos reales tempranos | **Ya es la política declarada** (`docs/METODOLOGIA.md` §7.2), pendiente de datos de usuarios reales (TODO-PENDIENTES.md, P2: «Pilotar las 50 preguntas con datos reales»). Esta investigación no aporta ni contradice nada nuevo aquí. |
| Herencia de posiciones entre coaliciones y componentes | **Ya cubierto por diseño propio, sin necesidad de literatura externa.** `src/engine/elecciones.ts` modela `coalicion`/`componente` como relaciones que explícitamente «nunca heredan posiciones»; cada coalición mantiene sus propias posiciones documentadas (`docs/METODOLOGIA.md` §5 bis). La investigación no encontró (ni refutó) literatura específica sobre este punto. |
| Optimización computacional client-side (workers, precálculo, estructuras de datos) | **Sin investigar — hueco real, no solo de esta tanda.** El ángulo no produjo ninguna afirmación comprobable. Con el tamaño actual del banco (371 ítems × 48 partidos) no hay indicio de que haga falta; queda como pregunta abierta para cuando el catálogo crezca sustancialmente (ver TODO-PENDIENTES.md P1: «límite/virtualización si el catálogo de candidaturas crece mucho más»). |

## 5. Nota de honestidad metodológica

Esta síntesis documenta deliberadamente cuántos de los 15 hallazgos confirmados **ya estaban citados, con la misma fuente, antes de esta investigación**: al menos 10 de 15. Esto no es un fallo del ejercicio — es la señal de que `docs/METODOLOGIA.md` está bien fundamentado y de que la investigación cumplió su función de auditoría independiente sin encontrar contradicciones. El valor añadido real de esta tanda es pequeño y concentrado en dos citas nuevas (Wagner & Ruusuvirta sobre el estándar de proximidad; Gemenis 2013 sobre las cuatro áreas problemáticas de codificación) y en dejar registrada, sin confirmar, la duda sobre ponderación por importancia.
