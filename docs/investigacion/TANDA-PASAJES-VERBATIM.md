# Tanda de pasajes verbatim — ejecución de datos (Opus, worktree aislado)

**Fecha de corte:** 2026-07-12 · **Ejecutor:** brazo de datos (Opus, máximo esfuerzo).
**Worktree:** `/home/user/espectro/.claude/worktrees/agent-a7f918ec44d1046e8` · **Rama:** `worktree-agent-a7f918ec44d1046e8`.
**Base de la rama:** `e427cab` (tip de `fable/todo-atlas-cuadrante` al iniciar; mi worktree se creó desde `c42e406`, 44 commits por detrás, y lo alineé con `fable` para tener los ficheros objetivo — **sin tocar la rama `fable`**, que después avanzó por su cuenta).
**Rango de reintegración:** `e427cab..a31064c` (3 commits). **Sin push.**

> **Método (idéntico a §14.4 de la casa):** WebFetch bloqueado (403). Toda cita se aceptó solo si aparecía **reproducida literalmente en español** en los resultados de WebSearch (títulos de página reales o texto que el buscador devolvió con detalle no aportado en la consulta), corroborada por ≥1 fuente sólida (ideal ≥2). Donde solo obtuve **paráfrasis/traducción** o la **versión reformada** de una norma (no la de época), dejé **hueco documentado**. No se fabricó ninguna cita. No se tocaron valores, vetos (`publicable`/`motivo`), advertencias ni avisos legales.

---

## 1. Vara de calidad aplicada (§30 de la casa)

- **Verbatim de fuente primaria** (articulado BOE, discurso oficial) = **alta**.
- **Verbatim vía secundaria sólida o titular/eslogan propio** (prensa, título de página oficial, síntesis enciclopédica) = **media**.
- Solo se elevó `calidadEvidencia`; nunca se rebajó ni se tocó ningún `valor`.

---

## 2. Tabla posición → pasaje conseguido / hueco

### 2.1 `psoe-felipista-1982-1996.json` (citas-título → articulado)

| Posición | Estado | Pasaje / hueco | Fuente | Calidad |
|---|---|---|---|---|
| eco-014 | ✅ conseguido | «El Impuesto sobre el Patrimonio es un tributo de carácter directo y naturaleza personal que grava el patrimonio neto de las personas físicas en los términos previstos en esta Ley.» (art. 1) | BOE Ley 19/1991 (corrob. noticias.juridicas, supercontable, congreso.es) | media → **alta** |
| eco-012 | ✅ conseguido | Art. 47 (redacción original 1985): «Para el sostenimiento de Centros privados con fondos públicos se establecerá un régimen de conciertos al que podrán acogerse aquellos Centros privados que, en orden a la prestación del servicio público de la educación… impartan la educación básica y reúnan los requisitos previstos en este Título.» | BOE LO 8/1985 + noticias.juridicas (Anterior/r0) | media → **alta** |
| eco-004 | ✅ conseguido | Exp. de motivos: «introducir un conjunto de medidas que, respetando la norma del artículo 41 de la Constitución, corrija las desviaciones y desequilibrios más notorios y urgentes» | BOE RDL 1/1992 + congreso.es + iberley | media → **alta** |
| eco-010 | ✅ conseguido | Art. 22 (Fondos de Promoción de Empleo): «Con la finalidad de mejorar la intensidad de la protección por desempleo… así como de colaborar en la recolocación en nuevos empleos de los trabajadores afectados por la reconversión… los Reales Decretos de reconversión podrán prever la constitución de Fondos de Promoción de Empleo.» *(elisión de una cláusula intermedia; sentido íntegro; 428 chars)* | BOE Ley 27/1984 + economistjurist + vLex | media → **alta** |
| ue-001 | ✅ cotejado | «trabajaremos con tesón para allanar los obstáculos que aún se oponen a nuestra plena integración en las Comunidades Europeas» (cita ya presente, ahora **cotejada literalmente**: el buscador devolvió además contexto no aportado —«nuestra vocación europeísta…», «no será pretencioso conseguir la adhesión dentro del horizonte dado por la presente Legislatura»—) | La Moncloa (oficial) + felipegonzalez.es | media → **alta** |
| **nuc-001** | ❌ **hueco** | LOPJ art. 112 de época (1985): busqué la redacción **original** de 1985 (elección parlamentaria de los 20 vocales), pero el buscador solo devolvió la **versión reformada de 2013** (art. 567) y paráfrasis. Riesgo de citar el texto equivocado → no toco. Sigue con cita-título. | — | (baja/pend.) |
| **dem-032** | ❌ **hueco** | STC 76/1983: solo obtuve **paráfrasis** de la doctrina (leyes interpretativas / armonización 150.3), nunca un fundamento reproducido verbatim y estable. → no toco. Sigue con cita-identificador. | — | (baja/pend.) |
| **sd-019** (nueva) | ❌ **no creada** | Solo hallé **paráfrasis** del encuentro González–Polisario de 1992 («reiteró el apoyo al referéndum»); el verbatim fuerte («hasta la victoria final», «mala colonización y peor descolonización») es de **1976, fuera de la ventana 1982-1996**. Sin pasaje de época → no se añade. | — | — |

### 2.2 `iu.json`

| Posición | Estado | Pasaje | Fuente | Calidad |
|---|---|---|---|---|
| mon-001 | ✅ ampliada | «¡Hasta que se vayan!» (18 chars, el runtime la omitía) → «¡Hasta que se vayan! II Marcha Republicana a Madrid» (misma fuente, título verbatim) | izquierdaunida.org (propia org.) | media (sin cambio) |

> La «otra cita corta <20» que señala el ⚠ es `demo-vanguardia` eco-001 (partido **ficticio de demostración**, `"demo": true`, URL no https). **Fuera de alcance** (no es fuente real). El ⚠ residual de `validate:evidence-groups` es exclusivamente ese fixture.

### 2.3 `movimiento-socialista.json` (GKS/EHKS)

| Posición | Estado | Pasaje | Fuente | Calidad |
|---|---|---|---|---|
| izq-001 | ✅ conseguido | «EHKS reivindicará la necesidad de la ruptura política de los trabajadores frente al régimen burgués español del 78» | kontseilusozialista.eus (EHKS, **web oficial castellano**) | baja → **media** |
| izq-002 | ✅ conseguido | «Euskal Herriko Kontseilu Sozialista, la nueva organización del Movimiento Socialista» | GARA / Naiz (prensa) | baja → **media** |
| izq-010 | ✅ conseguido | «La disidencia de la izquierda abertzale acusa a EH Bildu de ser un partido "burgués"» | Noticias de Gipuzkoa (prensa) | baja → **media** |
| izq-009, izq-019, ter-002, izq-024, izq-050, izq-051, izq-053 | ❌ **hueco** | Fuentes primarias (gedar.eus, «Nor gara») y prensa devolvieron **paráfrasis/traducción**, no verbatim español limpio y datable que encajara con cada enunciado. Candidatos vistos pero no usados: «superación de la dominación burguesa y las distintas formas de opresión» (Wikipedia/Rebelión, doblaba izq-001) y «Construyamos poder obrero» (banner sin fecha). | — | (baja) |

### 2.4 `reconstitucion-comunista.json` (Línea Proletaria)

| Posición | Estado | Pasaje | Fuente | Calidad |
|---|---|---|---|---|
| izq-031 | ✅ conseguido | «Ante el ciclo electoral de 2019. En defensa del boicot y de las tareas revolucionarias» (título verbatim del documento primario) | reconstitucion.net (doc. de 2019) | baja → **media** |
| izq-001, izq-002, izq-009, izq-030, izq-020, izq-022, izq-028, izq-049, izq-050, izq-051, izq-052, izq-053 | ❌ **hueco** | reconstitucion.net devolvió **paráfrasis** del cuerpo; la única cita datable y unívoca es la del doc. de boicot (izq-031, `metodo-cambio`). Añadir más pasajes del **mismo documento** a otras posiciones de `metodo-cambio` los anularía por conflicto de identidad (`depurarConflictosDeIdentidad`); la «Tesis de Reconstitución del Partido Comunista» (título primario, encaja con izq-050/izq-002) quedó fuera por **no tener fecha** verificable (rompería el trinquete de fechas §32). | — | (baja) |

### 2.5 `pce-reconstituido-1975-2006.json` (aviso legal intacto, doble veto sin tocar)

| Posición | Estado | Pasaje | Fuente | Calidad |
|---|---|---|---|---|
| mon-001 | ✅ conseguido | «república popular y federativa» (fórmula programática documentada) | es.wikipedia (síntesis de contraste; corrob. libertaddigital, lahaine) | baja → **media** |
| dr-025 | ✅ conseguido | «El Fiscal pide la suspensión del Partido Comunista Reconstituido como brazo político de GRAPO» (documentación judicial reproducida en prensa) | Libertad Digital (2002) | baja → **media** |
| izq-001, izq-002, izq-031, izq-009 | ❌ **hueco** | Las resoluciones de CENDOJ/AN (2003-2006) no se reprodujeron verbatim en los extractos; solo paráfrasis enciclopédica. → sin cita. | — | (baja) |

**Total conseguido: 12 posiciones** (5 alta, 7 media). **Huecos documentados: 24 posiciones + sd-019 no creada.**

---

## 3. ¿Qué ficheros quedan LISTOS para levantar veto?

**Ninguno queda 100% cubierto solo con esta tanda.** Estado real (decisión de levantar veto = del integrador):

- **`psoe-felipista`** — el MÁS avanzado. La auditoría §23 fijó como únicos bloqueos «seis citas-título + cotejo de ue-001». **Resueltos 5 de 7**: eco-012, eco-010, eco-004, eco-014 (articulado) + ue-001 (cotejo). **Faltan 2**: nuc-001 (LOPJ art. 112) y dem-032 (STC 76/1983), que siguen como cita-título (huecos). Si el integrador acepta cerrar esos dos por la cola humana, el veto es levantable.
- **`movimiento-socialista`** — 3/10 posiciones con verbatim (media). Insuficiente para levantar veto (7 siguen en `baja`, no sustentadas por el motor).
- **`reconstitucion-comunista`** — 1/13 (media). Insuficiente. Además `sensibilidad: violenta` (§33 exige revisión editorial).
- **`pce-reconstituido`** — 2/6 (media). Insuficiente. **Doble veto** + `violenta`: §35 exige triple llave estricta y revisión editorial expresa para cualquier levantamiento.
- **`iu.json`** — no es fichero vetado; el arreglo de mon-001 solo cierra el ⚠ del validador. Ya publicable.

---

## 4. Commits de la tanda (para el integrador; él re-verifica)

| # | hash | contenido |
|---|---|---|
| 1 | `97e4fe6` | felipismo: 5 pasajes verbatim (4 citas-título → articulado BOE + cotejo investidura) |
| 2 | `dfa2a56` | iu(mon-001): amplía la cita corta <20 a ≥20 de la misma fuente |
| 3 | `a31064c` | comunistas: 6 pasajes verbatim para referencias vetadas (baja → media) |

Rango: `e427cab..a31064c`. Puertas en verde en el worktree: `asignar-grupos-evidencia --write` (6 grupos nuevos), `validate:data` ✓, `validate:evidence-groups` ✓ (⚠ 1 = fixture demo-vanguardia), trinquete de fechas ✓ (2/2), corrientes-sensibles §33 ✓ (5/5), `audit:atlas`/`audit:partidos` exit 0.

---

## 5. Cola de verificación humana (WebFetch bloqueado; confirmar verbatim en la fuente)

1. **eco-014** — boe.es/buscar/doc.php?id=BOE-A-1991-14392 (art. 1).
2. **eco-012** — boe.es/buscar/act.php?id=BOE-A-1985-12978 y noticias.juridicas.com/base_datos/Anterior/r0-lo8-1985.t4.html (**art. 47, redacción ORIGINAL de 1985** — confirmar que no es la consolidada).
3. **eco-004** — boe.es/diario_boe/txt.php?id=BOE-A-1992-7714 (exposición de motivos).
4. **eco-010** — boe.es/buscar/act.php?id=BOE-A-1984-17004 (**art. 22**; confirmar que la elisión con «…» respeta el sentido).
5. **ue-001** — lamoncloa.gob.es/.../30111982_InvestGonzalez.aspx + felipegonzalez.es/intervenciones/discurso-de-investidura-82/ (cotejo del pasaje; opcional: Diario de Sesiones del Congreso, 30-XI-1982).
6. **iu mon-001** — izquierdaunida.org/2025/05/27/hasta-que-se-vayan-ii-marcha-republicana-a-madrid/.
7. **MS izq-001** — kontseilusozialista.eus/es/2025/09/ehks-reivindicara-la-necesidad-de-la-ruptura-politica-de-los-trabajadores-frente-al-regimen-burgues-espanol-del-78/.
8. **MS izq-002** — naiz.eus …/2023-12-17/…/euskal-herriko-kontseilu-sozialista-la-nueva-organizacion-del-movimiento-socialista (⚠ el buscador devolvió el prefijo de idioma `/en/`; usé `/es/` — confirmar cuál resuelve).
9. **MS izq-010** — noticiasdegipuzkoa.eus/politica/2023/12/16/disidencia-izquierda-abertzale-acusa-eh-7645276.html.
10. **recon izq-031** — reconstitucion.net/Documentos/2019_boicot.html (confirmar subtítulo «En defensa del boicot y de las tareas revolucionarias»).
11. **pce mon-001** — es.wikipedia.org/wiki/Partido_Comunista_de_España_(reconstituido) (fórmula «república popular y federativa»); idealmente sustituir por CENDOJ/AN o documento histórico primario.
12. **pce dr-025** — libertaddigital.com/espana/2002-10-22/el-fiscal-pide-la-suspension-del-partido-comunista-reconstituido-como-brazo-politico-de-grapo-1275321207/; idealmente CENDOJ auto de suspensión 2003 / resolución de disolución 2006.

---

## 6. Pendiente para futuras tandas (huecos que sí tienen fuente pero no verbatim limpio hoy)

- **nuc-001** (felipista): localizar la **redacción original 1985** del art. 112 LOPJ (elección parlamentaria de los 20 vocales) en una reproducción histórica fiable.
- **dem-032** (felipista): fundamento jurídico verbatim de la **STC 76/1983** (o pasaje de la Ley 12/1983 del Proceso Autonómico).
- **movimiento-socialista** (7 posiciones): verbatim de gedar.eus / «Nor gara» / El Salto / Naiz que encaje 1:1 con cada enunciado (frente amplio, extraparlamentarismo, Estado socialista vasco, sindicatos).
- **reconstitucion-comunista** (12 posiciones): pasajes datables de reconstitucion.net para reconstitución (Tesis), ruptura, 1978, Stalin, revoluciones culturales, China/Cuba — **de documentos distintos** para no colisionar en `metodo-cambio`.
- **pce-reconstituido** (4 posiciones): resoluciones CENDOJ/AN 2003-2006 reproducidas verbatim.
- **sd-019** (felipista, nueva): crónica literal de época (1982-1996) del apoyo del PSOE al referéndum saharaui (resolución congresual o crónica del encuentro de 1992).
