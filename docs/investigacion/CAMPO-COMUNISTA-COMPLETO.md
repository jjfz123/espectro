# Campo comunista completo — ejecución de datos (Opus, worktree aislado)

**Fecha de corte:** 2026-07-12 · **Ejecutor:** brazo de datos (Opus, máximo esfuerzo).
**Worktree:** `/home/user/espectro/.claude/worktrees/agent-a3be17e8fe518f9ea` · **Rama:** `worktree-agent-a3be17e8fe518f9ea` · **Base:** `c42e406`.
**Encargo:** mejorar el mapeo del campo comunista con el informe del propietario, meter lo que falta, colocarlo en los ejes con posiciones citadas y cablear las corrientes doctrinales inexistentes.

> Aviso de método (idéntico a §14.4 de la auditoría de la casa): WebFetch bloqueado (403) en esta red; toda corroboración es por WebSearch plural. Las citas verbatim que no pude abrir en la fuente primaria quedan en calidad `media`/`baja` y en la **cola de verificación humana**. No se ha fabricado ninguna cita. Donde la fuente era paráfrasis o reconstrucción, se dejó hueco documentado en vez de inventar el pasaje.

---

## 0. Commits de la tanda (para el integrador; él re-verifica)

| # | hash | contenido |
|---|---|---|
| 1 | `574d2e8` | Referencias nuevas: `movimiento-socialista`, `reconstitucion-comunista` |
| 2 | `292d624` | Mejora de 7 perfiles partidistas (URSS/Stalin/China + metadatos por Internacional) |
| 3 | (este informe) | `docs/investigacion/CAMPO-COMUNISTA-COMPLETO.md` |

Base de la rama: `c42e406`. Rango de reintegración: `c42e406..HEAD`. **Sin push** (regla del encargo).

**Puertas verdes en el worktree (reejecutadas tras la tanda):**

| Puerta | Resultado |
|---|---|
| `npm run validate:data` | ✓ exit 0 — 67 partidos, **65** referencias (antes 63) |
| `npm run validate:evidence-groups` | ✓ exit 0 — 1 grupo nuevo asignado (`pcte` izq-028); aviso preexistente de 2 citas sin localizador **inalterado** |
| `npm run audit:partidos` | ✓ exit 0 (diagnóstico) |
| `npm run audit:atlas` | ✓ exit 0 — ninguna de mis 2 referencias declara faceta sin carga |
| `npm run audit:electoral` | ✓ exit 0 — 46/67 perfiles enlazados |
| `git diff --check` | ✓ limpio |
| `npm run validate:todo-inventory` | ✗ **esperado**: `posiciones partidistas: 1379/1372` — recuento contractual de `data/inventario-canonico-mapeo.json` (PROHIBIDO tocar). **Es del integrador**: subir 1372→1379. |

---

## 1. Qué se creó y qué se mejoró (antes/después)

### 1.1 Referencias doctrinales nuevas (2)

| id | nombre | nº posiciones | facetas | sensibilidad | veto | fuentes |
|---|---|---:|---|---|---|---|
| `movimiento-socialista` | Movimiento Socialista (Mugimendu Sozialista) — GKS/EHKS | 7 | metodo-cambio, organizacion, territorial | normal | mapa+afinidad `publicable:false` | EHKS (kontseilusozialista.eus), elDiario, El Salto, Wikipedia |
| `reconstitucion-comunista` | Tesis de la Reconstitución del comunismo (Línea Proletaria) | 8 | metodo-cambio, organizacion | violenta | mapa+afinidad `publicable:false` | reconstitucion.net |

Ambas con `confianza: estimada` y motivo de veto honesto («cotejo pendiente»), para que el integrador decida levantarlas. Cubren los dos ejes del informe que **no existían** como tipo ideal: el Movimiento Socialista vasco (Recomendación 3; corriente marxista revolucionaria **no trotskista**) y la **tesis de la reconstitución vs. continuidad** (Eje 9, el discriminante más novedoso del campo).

Posiciones cargadas (resumen):

- **movimiento-socialista:** izq-001 (+2 ruptura), izq-002 (+1 partido comunista imprescindible, «de nuevo tipo/masas»), izq-009 (−2 rechazo del frente amplio), izq-010 (−2 rechazo de gestión con la socialdemocracia; anti-Bildu), izq-019 (+1 extraparlamentarismo), ter-002 (+2 Estado socialista vasco), izq-024 (−1 organización de clase propia).
- **reconstitucion-comunista:** izq-031 (+2 **boicot** — su seña), izq-009 (−2 anti-«revisionismo»/frente amplio), izq-001 (+2 ruptura), izq-002 (+2 reconstituir el Partido como sujeto/vanguardia), izq-030 (−2 1978 como capitulación), izq-020 (+1 Stalin con balance, lectura maoísta), izq-022 (+2 revoluciones culturales), izq-028 (+2 China no socialista).

> **Nota de disociación obligatoria** (honra la auditoría interna `comunistas-exclusiones-corrientes.md` §«PML(RC)…no son sinónimos»): `reconstitucion-comunista` (CxR/Línea Proletaria, **maoísta**) NO es Reconstrucción Comunista (RC/`frente-obrero`, **hoxhista y antimaoísta**). Comparten la raíz léxica «reconstruir/reconstituir», no la doctrina ni continuidad orgánica. La ficha lo dice en `variante` y `advertencia`.

### 1.2 Perfiles partidistas mejorados (7)

| perfil | posiciones antes | posiciones después | añadido | clasificación añadida |
|---|---:|---:|---|---|
| `pcpe` | 15 | 16 | izq-004 (+2 URSS) | — |
| `pcoe` | 17 | 19 | izq-004 (+2 URSS), izq-020 (+2 Stalin) | — |
| `pcte` | 34 | 35 | izq-028 (+2 China no socialista, con cita del CC) | — |
| `crt` | 16 | 19 | izq-021 (+2 Trotski), izq-020 (−2 Stalin), izq-004 (−1) | FT-CI (morenista) |
| `posi` | 14 | 14 | — | trotskismo lambertista (OCRFI) |
| `uce` | 8 | 8 | — | tradición maoísta (corrección) |
| `frente-obrero` | 37 | 37 | — | relación genealógica con RC |

Total posiciones partidistas añadidas: **+7** (1372→1379).

**Diferenciación fina lograda (Eje 1 del informe, «momento de la degeneración»):** los prosoviéticos que sostienen que la URSS fue socialista **hasta 1991** reciben `izq-004 = +2` (PCPE, PCOE), mientras que la referencia `hoxhaismo` ya existente marca `izq-004 = +1` (degeneró en 1956) y `trotskismo` marca `izq-004 = −1` (Estado obrero degenerado). La CRT, trotskista, recibe `izq-004 = −1` coherente con esa referencia. Así el ítem separa las tres familias del informe sin un ítem nuevo.

---

## 2. Evidencia por posición añadida (para cotejo)

| perfil · ítem | valor | calidad | fuente (URL) | cita/estado |
|---|---:|---|---|---|
| pcpe · izq-004 | +2 | media | pcpe.es/documento-de-unidad-pcpe-up/ | sin cita verbatim; «retroceso temporal» 1989-91 (paráfrasis en justificación) |
| pcoe · izq-004 | +2 | media | analisis.pcoe.net/stalingrado-la-victoria-del-socialismo-fascismo/ | sin cita verbatim |
| pcoe · izq-020 | +2 | media | pcoe.net/pcoe/editorial/desmontando-las-mentiras-sobre-el-camarada-stalin/ | titular editorial propio (media máx.) |
| pcte · izq-028 | +2 | media | pcte.es/…/resolucion-…-movimiento-comunista-internacional-… | **cita**: «China y Estados Unidos, se desarrollan bajo relaciones capitalistas de producción» (grupo `pasaje-3b95412a914e4834698a`; pasaje ya vetado en la nota del ítem izq-028) |
| crt · izq-021 | +2 | media | izquierdadiario.es/La-lucha-del-trotskismo-contra-el-estalinismo | sin cita verbatim |
| crt · izq-020 | −2 | media | laizquierdadiario.com/El-combate-de-Trotsky-contra-la-escuela-de-falsificacion-estalinista | sin cita verbatim |
| crt · izq-004 | −1 | baja | izquierdadiario.es/La-lucha-del-trotskismo-contra-el-estalinismo | extensión doctrinal declarada |

Las 3 clasificaciones (CRT FT-CI, POSI lambertista, UCE maoísta) y las 2 de Frente Obrero llevan fuente propia (La Izquierda Diario, posicuarta.org, Archivo General de la Región de Murcia, reconstruccioncomunista.es). La UCE se corrige de hoxhista a **maoísta** (marxismo-leninismo-pensamiento Mao Zedong) citando la ficha de autoridad del Archivo de Murcia; rasgo genealógico atribuido, **no** imputable a los votantes de Recortes Cero (respeta la auditoría interna).

---

## 3. Exclusiones (registro histórico; NADA en `data/`)

Por la **norma de arquetipo de seguridad de la casa** (nada que pueda leerse como identidad afirmable):

| entidad | motivo de exclusión | fuente |
|---|---|---|
| **PCE(r) / GRAPO** | ilegalizado (Garzón 2003, disuelto AN 2006); brazo político de los GRAPO, fidelidad pública a la lucha armada | Fiscalía AN (memoria 2021); ya excluido en `comunistas-exclusiones-corrientes.md` |
| **EHAK / PCTV** | ilegalizado por el TS el 18-IX-2008 por vinculación con Batasuna/ETA | doctrina consolidada; no se crea perfil ni referencia |
| **FRAP** | organización del entorno del PCE(m-l) con actividad armada al final del franquismo | histórico; no afirmable |

**Nós-UP** (autodisuelta 2015, no violenta): no se creó referencia histórica — el corpus citado localizado (resultados testimoniales europeas 2004) no alcanza el mínimo de 3 posiciones documentadas con fuente propia. **Hueco documentado**, candidato a referencia histórica si aparece corpus.

---

## 4. No verificadas del informe (NADA en `data/`)

Intento de confirmación por WebSearch (Registro de Partidos / estadodelmce). **No confirmadas con fuente primaria suficiente**, coherente con la auditoría interna previa: **PTD, Castella, Galiza Vermelha, Tanekra, GIO, SOL (Socialismo y Libertad), La Aurora, Crida Comunista, UCCP/Germen Rojo, Praxi, COML, IC (Iniciativa Comunista)**. Recibo «no verificada»: nada en datos. (La auditoría interna ya las había clasificado como colectivos/corrientes sin candidatura propia verificada.)

---

## 5. Discrepancias detectadas (el integrador debe resolver)

1. **izq-047 e izq-048 NO existen en el worktree.** El encargo afirma que `data/items/corrientes-izquierda.json` «incluye izq-047 ciencia-vs-prefiguración e izq-048 nuevos». El fichero termina en **izq-046**. Verificado por grep en todo `data/`: no hay izq-047/048 (solo aparecen izq-104/111/112 como referencias legadas en `notas`, tampoco existentes como id). **No pude cargar posiciones sobre ellos** (el validador rechaza posición sobre ítem inexistente). Probablemente viven en otra rama (p. ej. `fable/todo-atlas-cuadrante`) aún no fusionada aquí. → Propuestas de diseño en §7.

2. **Recuento contractual 1379/1372.** `validate:todo-inventory` falla por el candado de `data/inventario-canonico-mapeo.json` (PROHIBIDO tocar). Delta = +7 posiciones partidistas (PCPE +1, PCOE +2, PCTE +1, CRT +3). El integrador sube 1372→1379.

3. **CRT europeas 2024 (ya avisado en el informe):** 5.165 (BOE/historiaelectoral) vs 5.527 (Wikipedia) vs 5.572 (autorreivindicado). **No fijé cifra**: `crt.json` no incorpora resultado numérico. Pendiente de `infoelectoral.interior.gob.es`. Todas coinciden en 0,03 %.

4. **PCTE↔PCPE «economicismo» = polémica MUTUA, no consenso.** El PCTE atribuye a la dirección del PCPE «eclecticismo» y «diversionismo ideológico» (y le reprocha confundir reforma con socialismo); el PCPE y el PCOE devuelven la acusación calificando al grupo de Ástor García de escisión **oportunista**. **Decisión:** lo documento aquí como atribución bidireccional (regla 5), **sin** inyectar la adjetivación hostil en el perfil de ninguno de los dos, porque solo dispongo de fuentes secundarias (Wikipedia, prensa militante) sin cita primaria verbatim. Si el integrador quiere fijarlo en datos, la vía limpia es una `clasificacion` atribuida en `pcte` con fuente primaria del propio PCTE (III Congreso / documento fundacional 2019), pendiente de localizar el pasaje. Fuentes de rastreo: es.wikipedia PCPE; analisis.pcoe.net «Desenmascarando al oportunismo… la escisión de Ástor García».

5. **Avisos de sesgo evidencia-bandera persistentes** (`pcpe`, `pcpc`, `recortes-cero`, `upg` en el eje `economico`/`territorial`, todos ±2). **No los moderé**: mis adiciones son ítems solo-matching (URSS/Stalin/China) que no cargan los ejes del mapa (economico/social/territorial), así que no aportan moderadoras. Buscar moderadoras reales de mercado/territorio para estos perfiles queda como trabajo separado (mismo aviso que ya daba la base).

---

## 6. Altas NO realizadas y por qué (huecos honestos)

| candidato del encargo | decisión | motivo |
|---|---|---|
| **PCE(m-l)** izq-004/izq-020 (Stalin, antirrevisionista 1956) | hueco → propuesta | doctrinalmente claro (Eje 1/2), pero sin fuente **primaria** de pceml.info sobre Stalin/1956; solo secundarias (Bitácora, nuevarevolucion, ICCR). No codifico posición partidista infrasourced. |
| **IZAR** (perfil electoral nuevo) | no creado | corpus citado < 8-10 posiciones; auditoría interna ya lo dejó como «organización sin candidatura separada verificada». Metadato aprovechable: **mandelismo** (Secretariado Unificado). |
| **Izquierda Castellana** (perfil electoral nuevo) | no creado | resultados testimoniales; sin corpus programático suficiente localizado por WebSearch. |
| **PRT, Lucha Internacionalista, Corriente Roja** (referencias) | no creadas | ya cubiertas doctrinalmente por la referencia `trotskismo` (variante LIT-CI/morenista anotable como metadato). Su alta como referencia propia añadiría poca discriminación sobre el tipo ideal existente. |
| **PSUC Viu / Comunistes de Catalunya** (declarar papeleta real) | ya cubierto | ambos ya tienen perfil `partido`; su encaje (EUiA/comuns) está en `excepcionCatalogo`. No requieren referencia nueva. |
| **UPG encaje BNG** | ya cubierto | `upg.json` ya declara en `excepcionCatalogo.justificacion` que es componente del BNG y «no debe competir con el BNG como si fueran papeletas distintas». No añadí nada para no duplicar. |
| **PCTE izq-020 (Stalin)** | hueco | el PCTE es prosoviético «en la memoria» pero más cauto con Stalin que PCOE; sin fuente específica localizada, no lo codifico (evito error de matiz). Propuesta a calibrar. |

---

## 7. Propuestas de ítems y sub-facetas nuevas (el integrador los diseña)

El encargo prohíbe crear ítems; aquí van como **propuesta** (enunciado a dos voces, módulo, polaridad, anclas «Esperado»). Todos redactados sin copiar el fraseo cargado del informe.

### 7.1 izq-047 — «ciencia vs. prefiguración» (Eje 9 del informe, el más novedoso)
- **Enunciado propuesto:** «Antes de dirigir cualquier lucha de masas, los comunistas deben reconstruir desde cero su teoría y su organización, porque el Partido Comunista, tal como existió, ya no existe.»
- **Módulo:** corrientes-izquierda. **Polaridad:** positiva. **Ejes:** solo-matching (no proyecta linealmente; acuerdo por reconstitución, desacuerdo por continuidad, ambos dentro de la misma familia).
- **Esperado:** `reconstitucion-comunista` +2, `movimiento-socialista` +1 (recomposición del proletariado), PCE −2, PCPE −2, PCTE −2, PCOE −2 (todos se reivindican herederos directos del partido histórico).
- **Nota:** es la sub-faceta «tesis de la reconstitución» que la sección D del informe pide y que la arquitectura no captura. Sin él, `reconstitucion-comunista` se aproxima por ítems vecinos (izq-031 boicot, izq-002 vanguardia).

### 7.2 izq-048 — «clase vs. nuevos sujetos» sin caricatura (Eje 10)
- **Enunciado propuesto:** «La prioridad del movimiento obrero debe ser la contradicción entre capital y trabajo; las luchas feminista, LGTBI y ecologista son importantes pero subordinadas a ella.»
- **Módulo:** corrientes-izquierda (o feminismos-moral). **Polaridad:** negativa (acuerdo = polo obrerista). **Ejes:** valorar carga leve en `social`; probablemente solo-matching para no caricaturizar.
- **Esperado:** PCTE +1, Frente Obrero +2, `reconstitucion-comunista` +1, `movimiento-socialista` +1, PCE −2, CRT/trotskismo −2, IU −2.
- **Nota:** izq-014 ya captura la versión dura («desvían»); izq-048 mediría la versión **jerárquica** («subordinadas»), más fina y menos hostil, que separa al PCTE (feminismo de clase) de Frente Obrero (rechazo) sin forzar a ninguno a suscribir una premisa que no comparte.

### 7.3 Eje 1 fino — «momento de la degeneración» (par de ítems solo-matching)
Ya existe izq-004 (balance URSS) e izq-020 (Stalin). **Falta el corte fino de 1956** que separa hoxhistas de prosoviéticos:
- **Enunciado propuesto:** «El giro de Jrushchov en el XX Congreso del PCUS (1956) marcó el inicio de una degeneración que apartó a la URSS del socialismo.»
- **Esperado:** hoxhaísmo/PCE(m-l)/reconstitucion-comunista +2 (degeneró en 1956), PCPE/PCOE −1 (fue socialista hasta 1991), trotskismo −1 (ya había degenerado antes, en los años 20). Solo-matching.

### 7.4 Eje 5 — electoralismo/boicot con voz de nicho
izq-031 ya cubre el boicot. Está bien calibrado. **No hace falta ítem nuevo**; solo señalo que `reconstitucion-comunista` es el perfil que lo lleva a +2 y que quien puntúe +2 no encaja en ningún partido electoral (señal valiosa, ya anotada en el ítem).

### 7.5 Eje 13 — experiencias actuales (China/Cuba/Corea/Venezuela)
izq-028 (China no socialista) ya existe y discrimina. Para Cuba/Venezuela **falta** un ítem solo-matching:
- **Enunciado propuesto:** «Cuba y Venezuela son hoy referencias válidas de un proyecto socialista que merece apoyo.»
- **Esperado:** PCE/PCPE/PCOE/UPG/Nación Andaluza +1/+2 (campismo/solidaridad), PCTE −2 (relaciones capitalistas), trotskismo −2, reconstitucion-comunista −2 (Ciclo cerrado). Solo-matching.

### 7.6 Sub-faceta metadato — «Internacional trotskista»
No es ítem: es **clasificación** ya iniciada en CRT (FT-CI) y POSI (lambertista). Recomiendo extenderla si entran PRT/Corriente Roja (LIT-CI) o IZAR (mandelista). No produce afinidad; ordena el sub-espacio trotskista que los ejes doctrinales no separan (los cuatro puntúan casi igual en URSS/Stalin/expropiación).

---

## 8. Cola de verificación humana (URLs y pasajes)

Verificar en la fuente primaria (WebFetch bloqueado en mi red; corroboré por WebSearch plural):

1. **pcpe** izq-004 — `pcpe.es/documento-de-unidad-pcpe-up/`: localizar el pasaje verbatim del «retroceso temporal» de 1989-91 (o del carácter socialista hasta 1991) y, si procede, elevar calidad a alta con `cita`.
2. **pcoe** izq-004/izq-020 — `analisis.pcoe.net/stalingrado-…` y `pcoe.net/…/desmontando-las-mentiras-sobre-el-camarada-stalin/`: extraer cita verbatim del cuerpo (ahora es titular editorial = media máx.).
3. **pcte** izq-028 — confirmar que «China y Estados Unidos, se desarrollan bajo relaciones capitalistas de producción» es verbatim de la Resolución del CC (pasaje ya vetado en la nota del ítem; corroborado por búsqueda, no abierto).
4. **crt** izq-020/izq-021/izq-004 — `izquierdadiario.es/La-lucha-del-trotskismo-contra-el-estalinismo` y `laizquierdadiario.com/El-combate-…`: fijar pasaje verbatim; elevar calidad si procede.
5. **uce** clasificación maoísta — `archivogeneral.carm.es/…idDetalle=8081859`: confirmar la ficha de autoridad («marxista-leninista, seguidora del pensamiento de Mao»).
6. **frente-obrero** clasificación RC — `reconstruccioncomunista.es/en-respuesta-al-trotskismo-…`: confirmar la frase de RC de que «Frente Obrero no es comunista».
7. **movimiento-socialista** (referencia) — `kontseilusozialista.eus/es/nor-gara/`: cotejar posiciones con documentación primaria propia antes de levantar el veto `publicable:false`.
8. **reconstitucion-comunista** (referencia) — `reconstitucion.net/` y `reconstitucion.net/Documentos/2019_boicot.html`: cotejar boicot, Balance del Ciclo de Octubre y revoluciones culturales; decidir `sensibilidad` definitiva antes de levantar veto.
9. **PCTE↔PCPE economicismo** — localizar pasaje primario del PCTE (III Congreso o fundación 2019) si se quiere fijar en datos como atribución.
10. **PCE(m-l)** Stalin/1956 — localizar fuente primaria pceml.info para poder codificar izq-020/izq-004 (hueco actual).

---

## 9. Cierre

- **2 referencias doctrinales nuevas** (Movimiento Socialista, Tesis de la Reconstitución) — los dos tipos ideales que faltaban, con veto inicial honesto.
- **7 perfiles mejorados** con los discriminantes de memoria del socialismo real (Eje 1/2/13) y metadatos por Internacional.
- **+7 posiciones partidistas** (1372→1379), diferenciando prosoviéticos (+2 URSS) de hoxhistas (+1) y trotskistas (−1) sobre el mismo ítem.
- **Sin errores de signo detectados** en re-auditoría propia (§1.1 verifica el escalonado +2/+1/−1 de izq-004; cada valor cotejado contra la nota «Esperado» del ítem).
- Exclusiones de seguridad y no-verificadas respetadas: **nada** en `data/` para PCE(r)/GRAPO, EHAK, FRAP ni para las 12 siglas no confirmadas.
- Puertas verdes salvo `validate:todo-inventory` (recuento contractual, del integrador).

El integrador **no debe fiarse**: rango `c42e406..HEAD`, dos commits de datos + este informe, todas las rutas y cifras arriba.
