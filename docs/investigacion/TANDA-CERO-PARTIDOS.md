# Tanda Cero — Partidos sin posiciones (orden expresa: «ningún partido debería tener 0 posiciones»)

Fecha de la tanda: 2026-07-13. Base: `df4e970`.

Objetivo: sacar de 0 a los partidos vacíos del catálogo (España Vaciada aragonesa y
localismos del Bierzo) e iniciar la cobertura del rápido de Teruel Existe, con
**pasaje textual verificable** en cada alta (regla PASAJE-O-HUECO). Toda la evidencia
se obtuvo con WebSearch: **WebFetch devolvió 403 en todos los dominios probados**
(webs de partido, prensa, Wikipedia, archive.org), por lo que la mayoría de las citas
son **titulares verbatim** (calidad `media` como tope) o declaraciones ya verificadas
en el repositorio.

## Resumen por partido (antes → después; ¿≥3?)

| Partido | Antes | Después | ¿≥3? | Notas |
|---|---|---|---|---|
| coalicion-existe | 0 | 3 | **sí** | transversalidad, financiación por despoblación, sanidad pública |
| aragon-existe | 0 | 3 | **sí** | financiación por despoblación, sanidad pública, transversalidad |
| teruel-existe | 6 | 7 | sí (ya lo era) | añadido 1 del rápido (sanidad); 0→1 en el rápido |
| partido-del-bierzo | 1 | 2 | **no (2)** | añadido gallego cooficial; hueco 3.ª declarado |
| el-bierzo-existe | 0 | 1 | **no (1)** | sale de 0 vía plataforma bercianista; atribución débil, ver abajo |
| escanos-en-blanco | 1 | 1 | **no (1)** | monotemático; 2.ª posición documentada pero sin pasaje verbatim, ver abajo |

Ningún partido queda a 0. Tres llegan a ≥3; los otros tres se declaran con motivo.

---

## coalicion-existe (0 → 3)  · commit `6a683d3`

Fuente propia de la coalición (grupo parlamentario «Aragón-Teruel Existe» y su cabeza
de lista Tomás Guitarte como candidato de la coalición Existe), no heredada de los
componentes.

- **nac-016 = +2** (transversalidad; `alta`). Pasaje: «No se nos debe juzgar en el eje
  derecha e izquierda, es un eje en el que no nos situamos» (Guitarte, candidato de la
  coalición Existe, Diario de Teruel, 2024). Mismo pasaje canónico que ya usa
  teruel-existe (grupoEvidencia compartido).
- **nac-010 = +2** (financiación autonómica por despoblación; `media`). Pasaje: «La
  despoblación no puede salir de los criterios de financiación autonómica» (Guitarte,
  Teruel Existe Web Oficial, 2026).
- **eco-002 = −2** (gestión privada de la sanidad; `media`). Titular verbatim: «Aragón-Teruel
  Existe reclama que el transporte sanitario urgente pase a ser público para garantizar
  la atención en el medio rural» (El Alto Jalón, PNL de 25-03-2025). El grupo reclama
  internalizar el servicio por las «importantes deficiencias» del modelo de concesión
  privada → rechaza que la gestión privada mejore la eficiencia.

## aragon-existe (0 → 3)  · commit `fe34948`

Aragón Existe es el partido aragonés de la España Vaciada y cofundador de la coalición
Existe; comparte el grupo «Aragón-Teruel Existe». Citas de grupo/coalición + programa
propio (aragonexiste.org) referido en la justificación.

- **nac-010 = +2** (`media`). Mismo pasaje de Guitarte sobre financiación autonómica; el
  programa de AE pide reformar la financiación ponderando dispersión y densidad frente a
  población.
- **eco-002 = −2** (`media`). AE denuncia en su web que la concesión privada del transporte
  sanitario urgente incumple la respuesta en 30 min en el 29% de los núcleos; el grupo
  reclama que el servicio «pase a ser público». Titular verbatim de El Alto Jalón.
- **nac-016 = +2** (`media`). Transversalidad España Vaciada; pasaje de Guitarte (coalición
  Existe). Calidad `media` por ser cita de nivel coalición aplicada al componente.

## teruel-existe (6 → 7; rápido 0 → 1)  · commit `d6ea38a`

- **eco-002 = −2** (`media`). Titular verbatim: «Teruel Existe advierte sobre la
  “privatización encubierta” de la sanidad “mediante contratación externa”: “Cuesta 6
  veces más”» (El Español, 2026-01-29). Con datos propios de sobrecoste → rechaza que la
  gestión privada mejore la eficiencia.

Huecos declarados (rápido) para TE:
- **eco-008 (pensiones IPC): HUECO.** Teruel Existe votó a favor de la Ley 21/2021 (garantía
  del poder adquisitivo), pero no se obtuvo un pasaje verbatim que nombre su voto (el acta
  del Congreso no es accesible por WebFetch; las búsquedas solo parafrasean). Sin pasaje,
  no se codifica.
- **eco-001 (subir impuestos a rentas altas) y ter-003 (concierto vasco): HUECO.** La
  fiscalidad de TE es «diferenciada» (incentivos territoriales), no redistributiva
  izquierda-derecha; y reclama financiación por despoblación, no un concierto de tipo
  vasco. No responden al instrumento exacto.

## partido-del-bierzo (1 → 2)  · commit `21aac12`  · **NO llega a 3**

- **nac-013 = +2** (lenguas propias cooficiales; `media`). El PB, formación bercianista,
  defiende la cooficialidad del gallego de El Bierzo y una Ley de Lenguas de Castilla y
  León que proteja gallego, leonés y euskera. Titular verbatim: «El bercianismo maniobra
  para considerar el gallego lengua oficial en Castilla y León mientras aguarda su
  provincia» (El Debate, 2026-02-17).
- (nac-015 = 0 preexistente: su proyecto es una Región de El Bierzo propia, no la autonomía
  triprovincial leonesa.)

Hueco 3.ª posición: **declarado.** La reivindicación central del PB (provincia/autonomía
del Bierzo, Consejo General propio) no tiene ítem limpio en el instrumento; su perfil
económico («progresista») no está documentado con pasajes sobre ítems del rápido.

## el-bierzo-existe (0 → 1)  · commit `5d376f7`  · **NO llega a 3** · atribución débil

- **nac-013 = +2** (`media`). El Bierzo Existe concurre integrada en Coalición por El
  Bierzo, cuya plataforma bercianista reclama el gallego oficial en Castilla y León.
  Mismo titular verbatim de El Debate.

**Advertencia de atribución:** El Bierzo Existe apenas existe como actor autónomo; opera
dentro de Coalición por El Bierzo (marca conjunta «Coalición por El Bierzo-El Bierzo
Existe»). No se halló ningún pasaje que atribuya una posición a «El Bierzo Existe» por sí
sola; esta alta descansa en la posición documentada de su coalición. Se sale de 0 (orden
expresa) con calidad `media` y justificación transparente. Si se prioriza la atribución
estricta, esta única posición debería revisarse.

## escanos-en-blanco (1 → 1)  · sin commit  · **NO llega a 3** · monotemático

Perfil monotemático (máx. 3 posiciones, solo ítems solo-matching). Mantiene **dem-036**
(voto en blanco computable → escaños vacíos).

- **dem-025 (proporcionalidad): candidato fuerte pero HUECO por falta de verbatim.**
  Su ideario propone sustituir la fórmula D'Hondt por un sistema de cocientes enteros y
  restos mayores y suprimir el mínimo (barrera) para obtener representación — es decir,
  el reparto «lo más proporcional posible» de dem-025. Es una posición real y solo-matching
  (compatible con el perfil monotemático), pero **no se logró un pasaje textual reproducible**:
  WebFetch de escanos.org / esconsenblanc.org devuelve 403 y WebSearch solo parafrasea la
  propuesta. Per PASAJE-O-HUECO, no se codifica. Si se habilita el acceso a escanos.org,
  esta sería la 2.ª posición inmediata.
- dem-024 (listas abiertas): no consta en su ideario; hueco.

---

## Nota de mantenimiento del contrato (TODO + manifiesto)

Cada alta de posición obliga, por diseño del propio repositorio, a actualizar el contador
«Las N posiciones partidistas inventariadas» de `docs/TODO-MAPEO-EXHAUSTIVO.md` (la línea
lo dice: «cualquier alta posterior actualiza de forma explícita este total») y a recomputar
`contratoFuncional.sha256` en `data/inventario-canonico-mapeo.json`; de lo contrario el test
`todo-validator` («posiciones partidistas: N/M») pone en rojo `npm test` y no se cumple la
puerta de 454 verdes. Es exactamente la mecánica del commit base `df4e970`
(«actualiza datos y contrato en la misma revisión»). En cada commit se tocó **solo** esa
cifra y ese sha, nada más del TODO ni del manifiesto. Total: 1.647 → 1.656 (+9 altas).
Puertas en verde tras cada commit: validate:data, validate:evidence-groups, 454 tests.
