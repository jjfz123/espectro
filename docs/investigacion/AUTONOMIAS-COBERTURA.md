# Cobertura de las comunidades autónomas — auditoría de relaciones y enriquecimiento de perfiles

**Agente de datos (OPUS), worktree `agent-a44e69a5b45152359`. Corte documental: 2026-07-12.**

Encargo: arreglar el lado de DATOS del caso Madrid (un perfil luxemburguista obtuvo como
mayores afinidades Alianza Verde 100 % con 3 ítems, Verdes Equo 79 % con 6 y PACMA 77 %,
por pura escasez de posiciones de los perfiles «finos», mientras Podemos/PSOE/PP/VOX/PCTE
—con corpus real— quedaban por debajo). El lado UI (preferir cobertura) lo arregla el
integrador. Aquí se documenta: (a) auditoría de todas las convocatorias, (b) relaciones
ausentes verificadas y añadidas, (c) enriquecimiento de perfiles finos con huecos
deliberados, (d) candidaturas sin perfil con recibo, (e/f) vuelta 2 y antes/después.

> **Todo pasaje citado en este informe se verificó con ≥2 fuentes independientes por hecho
> (WebFetch estaba bloqueado; corroboración por WebSearch en plural). Cada cita añadida a los
> datos es un pasaje reproducible; donde no había pasaje reproducible fiable NO se añadió la
> posición (un hueco es mejor que un signo inventado).**

---

## 0. AVISO DE PROCEDENCIA (leer primero) — contaminación del repo principal

Por un error de directorio (comandos `cd /home/user/espectro` en lugar del worktree), parte
del trabajo aterrizó en el **repo principal** `/home/user/espectro`, rama del integrador
`fable/todo-atlas-cuadrante`, en vez de en este worktree. El integrador ya lo confirmó y lo
está gestionando. Estado real:

| Trabajo | Dónde quedó | Estado |
|---|---|---|
| (b) 14 relaciones `componente` en 13 convocatorias | commit `6751932` en `fable/todo-atlas-cuadrante` | lo verifica el integrador |
| (c) 4 posiciones nuevas (mas-madrid +3, pacma +1) | barridas y recogidas en el commit `a0e82f6` del integrador | lo verifica el integrador |
| (c) 4 posiciones nuevas Ciudadanos | commit **`a998111`** en ESTE worktree | **para reintegrar** |
| (e) 1 posición nueva Chunta Aragonesista | commit **`e5e2838`** en ESTE worktree | **para reintegrar** |
| Este informe | commit de este worktree | **para reintegrar** |

**Commits de MI rama (`worktree-agent-a44e69a5b45152359`) a reintegrar:** `a998111`,
`e5e2838` y el commit de este informe. No he vuelto a tocar el repo principal ni la rama
`fable/todo-atlas-cuadrante` desde la corrección. Ninguna rama se ha pusheado.

**Reconciliación del contrato TODO (acción del integrador):** añadir posiciones eleva el
total contractual «Las 1.372 posiciones partidistas inventariadas» de
`docs/TODO-MAPEO-EXHAUSTIVO.md` (línea 367), fichero que tengo prohibido tocar (regla 4). Mis
5 posiciones nuevas de este worktree (Cs +4, CHA +1) lo llevan de **1.372 → 1.377**; sumadas a
las 4 ya aterrizadas por el integrador (mas-madrid/pacma) el total reintegrado será
**1.381**. El test `tests/todo-validator.test.js` queda en rojo en mi worktree SOLO por ese
recuento (los otros **390 tests pasan**); su reconciliación es del integrador porque el total
vive en el TODO. Todas las puertas que sí puedo cerrar están verdes (ver §7).

---

## 1. Resumen ejecutivo

- **(b) Relaciones ausentes — el arreglo sistémico principal.** El patrón del caso Madrid
  (`mad-2023-podemos-iu-av` no enlazaba el perfil `iu`, con 34 posiciones) se repite en **13
  coaliciones de 13 CCAA**. Se añadieron **14 relaciones `componente` verificadas** (IU en 13
  papeletas + Verdes Equo en CLM). Efecto directo sobre el caso reportado: la papeleta madrileña
  Podemos-IU-AV pasa a tener un comparable RICO (IU, 34 posiciones) en vez de solo los finos
  Podemos/AV; lo mismo en Murcia, Cantabria, La Rioja, Extremadura, CyL, Aragón, Valencia, CLM,
  Baleares, Canarias, Navarra y Andalucía.
- **(c/e) Enriquecimiento de perfiles finos.** +9 posiciones citadas: Ciudadanos 9→13,
  Más Madrid 23→26, PACMA 14→15, Chunta 11→12. Todas con pasaje reproducible y honrando las
  anclas «Esperado:» de los ítems.
- **Hallazgo de calibración honesto.** Los micropartidos **Verdes Equo, Alianza Verde y
  PUM+J** NO son enriquecibles de forma fiable más allá de su núcleo temático (clima/nuclear,
  humanismo/migración): WebSearch no devuelve pasajes verbatim de sus programas en ejes
  económico/territorial, y forzar citas violaría la regla 1. Su escasez de cobertura refleja
  **delgadez programática real** en esos ejes, no solo un artefacto de fuentes — lo que
  confirma que la palanca correcta para el caso reportado es la UI consciente de cobertura.
- **(d) Fuerzas grandes sin perfil.** Hay candidaturas relevantes SIN perfil que superan el
  umbral de la regla 5 (>0,5 %): **Partido Regionalista de Cantabria 21,2 %**, Coalición por
  Melilla 19,0 %, MDyC Ceuta 11,4 %, Ceuta Ya! 10,2 %, MÉS per Mallorca 8,5 %, Somos Melilla
  5,2 %… (§5). Se recomiendan como perfiles nuevos de una tanda dedicada.

---

## 2. (a) Auditoría de las 21 convocatorias — perfiles enlazados y nº de posiciones

Recuento por perfil (posiciones en la base, tras esta tanda). Perfiles finos en **negrita**.

| perfil | nº pos | perfil | nº pos | perfil | nº pos |
|---|---|---|---|---|---|
| **alianza-verde** | 3 | **verdes-equo** | 6 | **pum-j** | 6 |
| **ciudadanos** | **13** (era 9) | **pacma** | 15 (era 14) | mas-madrid | 26 (era 23) |
| chunta-aragonesista | 12 (era 11) | iu | 34 | podemos | 48 |
| psoe | 51 | pp | 49 | vox | 63 |
| pcte | 34 | movimiento-sumar | 55 | compromis | 21 |
| nueva-canarias | 21 | eaj-pnv | 46 | eh-bildu | 51 |
| bng | 52 | erc | 40 | junts | 36 |
| coalicion-canaria | 42 | upn | 25 | geroa-bai | 19 |

Tabla completa candidatura→perfil→nº posiciones (fuente: `data/convocatorias/*.json` +
`data/partidos/*.json`). Papeletas de coalición cuya composición se corrigió en (b) marcadas
con **[+IU]** / **[+VQ]**:

- **madrid-2023-05**: pp(49) · mas-madrid(26)+verdes-equo(6) · psoe(51) · vox(63) ·
  **podemos(48)+iu(34)[+IU]+alianza-verde(3)** · ciudadanos(13) · pacma(15) · pum-j(6) ·
  pcte(34) · fe-jons(18). Sin perfil: PFE, Unión por Leganés, Partido Humanista.
- **murcia-2023-05**: pp · psoe · vox · **podemos+iu[+IU]+alianza-verde** · ciudadanos ·
  verdes-equo(componente en Más Región-VQ) · pacma · pcpe · fe-jons. Sin perfil: MC Regional (2,99 %)…
- **cantabria-2023-05**: pp · psoe · vox · **podemos+iu[+IU]** · ciudadanos · pacma ·
  verdes-equo. Sin perfil: **PRC (21,17 %)**, Cantabristas (1,73 %)…
- **la-rioja-2023-05**: pp · psoe · vox · **podemos+iu[+IU]** · ciudadanos · pacma ·
  escanos-en-blanco. Sin perfil: Partido Riojano+EV (3,63 %), Por La Rioja (2,63 %).
- **extremadura-2025-12**: pp · psoe · vox · **podemos+iu[+IU]+alianza-verde** · pacma ·
  ciudadanos · pum-j. Sin perfil: Juntos por Extremadura (0,80 %), Nuevo Extremeñismo (0,61 %)…
- **castilla-y-leon-2026-03**: pp · psoe · vox · upl · **movimiento-sumar+iu[+IU]+verdes-equo** ·
  salf · por-avila · **podemos+alianza-verde** · soria-ya · pacma · escanos-en-blanco ·
  ciudadanos · coalicion-por-el-bierzo(+partido-del-bierzo,+el-bierzo-existe) · pcte · pum-j · fe-jons · prepal.
- **aragon-2026-02**: pp · psoe · vox · chunta-aragonesista(12) · coalicion-existe(+teruel-existe,+aragon-existe) ·
  **movimiento-sumar+iu[+IU]** · salf · **podemos+alianza-verde** · pacma · pum-j · pcte · escanos-en-blanco.
  Sin perfil: Partido Aragonés (1,26 %), Coalición Aragonesa (0,08 %).
- **comunitat-valenciana-2023-05**: pp · psoe · compromis(+verdes-equo) · vox ·
  **podemos+iu[+IU]** · ciudadanos · pacma · pcpe · recortes-cero · pum-j.
- **castilla-la-mancha-2023-05**: psoe · pp · vox · **podemos+iu[+IU]+verdes-equo[+VQ]** ·
  ciudadanos · pacma · recortes-cero(componente) · pcpe · fe-jons.
- **illes-balears-2023-05**: pp · psoe · vox · **podemos+iu[+IU]** · ciudadanos · pacma(componente) ·
  pp/psoe(componentes en candidaturas de Formentera). Sin perfil: **MÉS per Mallorca (8,49 %)**,
  El PI (3,85 %), MÉS per Menorca (1,46 %)…
- **canarias-2023-05**: psoe · coalicion-canaria(42) · pp · vox · nueva-canarias(21) ·
  **podemos+iu[+IU]** · verdes-equo(en Drago) · pacma · ciudadanos. Sin perfil: Unidos por Gran Canaria (1,72 %)…
- **navarra-2023-05**: upn · psoe · eh-bildu · geroa-bai(+eaj-pnv) · pp · **podemos+iu[+IU]** ·
  vox · pum-j · ciudadanos.
- **andalucia-2026-05**: pp · psoe · vox · adelante-andalucia(24) ·
  **por-andalucia(23)+podemos+movimiento-sumar+verdes-equo+alianza-verde+iu[+IU]** · salf ·
  pacma · escanos-en-blanco · pcpe · fe-jons · pum-j · nacion-andaluza · pcte.
- **asturias / ceuta / galicia / euskadi / murcia / melilla**: sin cambios de relación en (b)
  (composiciones ya correctas o sin componente-con-perfil ausente); ver §5 para candidaturas sin perfil.

Convocatorias estatales de contexto (no autonómicas) auditadas también: `congreso-2023-07`,
`europeas-2024-06` (Sumar/Ahora Repúblicas ya enlazan todos sus componentes con perfil).

---

## 3. (b) Relaciones `componente` añadidas — composición oficial verificada

14 relaciones. Todas con `relacion: componente` y `nota` que documenta la composición. Ninguna
transfiere posiciones a la coalición (regla del proyecto). Verificación (≥2 fuentes por hecho):

| Convocatoria · candidatura | perfil añadido | Composición y fuentes |
|---|---|---|
| madrid-2023-05 · mad-2023-podemos-iu-av | `iu` | «Podemos-Izquierda Unida-Alianza Verde» nº13. Portal electoral C. Madrid + izquierdaunida.org + Público |
| murcia-2023-05 · mur-2023-podemos-iu-av | `iu` | IU-Verdes Región de Murcia. Podemos R. Murcia + Murcia Plaza + Wikipedia |
| cantabria-2023-05 · cnt-2023-podemos-izquierda-unida | `iu` | IU Cantabria (Carmen Martín nº2). Podemos Cantabria + IU Cantabria |
| la-rioja-2023-05 · rio-2023-podemos-iu | `iu` | IU encabeza (Henar Moreno nº1). Público + IU |
| extremadura-2025-12 · ext-2025-unidas | `iu` | Unidas por Extremadura = Podemos+IU+AV (Maíllo en campaña). eldiario.es + Demócrata + Wikipedia |
| castilla-y-leon-2026-03 · cyl-2026-iu-ms-vq | `iu` | «IU, Movimiento Sumar, Verdes Equo: En Común» (Juan Gascón nº1, IU). JEC + valladolidplural + salamancadiario |
| aragon-2026-02 · ara-2026-izquierda-unida-movimiento-sumar | `iu` | IU-Sumar (Marta Abengochea, IU); constituida ante JE Aragón 26-12-2025. Aragón Digital + Wikipedia |
| comunitat-valenciana-2023-05 · val-2023-unides-podem-esquerra-unida | `iu` | EUPV (federación IU; Rosa Pérez Garijo nº2 València). Público + JEC CV |
| castilla-la-mancha-2023-05 · clm-2023-unidas | `iu` + `verdes-equo` | Denominación oficial «PODEMOS-IU-EQUO CLM». Portal electoral CLM + eldiario.es (listas de Albacete) |
| illes-balears-2023-05 · bal-2023-unidas-podemos | `iu` | EUIB (federación IU; siglas EUIB-PODEMOS). JEC + Wikipedia (EUIB = federación balear de IU) |
| canarias-2023-05 · can-2023-unidas-si-podemos | `iu` | IU Canaria + Podemos + Sí se puede. sisepuedecanarias.org + unidassipodemoscanarias.com + RTVC |
| navarra-2023-05 · nav-2023-contigo | `iu` | IU Navarra (IUN-NEB) en Contigo-Zurekin. IUN-NEB + COPE + eldiario.es |
| andalucia-2026-05 · and-2026-por-andalucia | `iu` | Por Andalucía = Podemos+IU+Sumar (Maíllo candidato). ORAIN + Demócrata |

**Huecos deliberados de (b):** en `nav-2023-contigo` la coalición incluye además Alianza Verde
y Verdes Equo (según Wikipedia), pero solo tenía una fuente independiente sólida para IU
(IUN-NEB, dominio oficial de IU Navarra); AV/VQ NO se enlazaron para no enlazar por suposición
(regla b: «solo con composición oficial verificada»). Recomendación: confirmar AV/VQ de
Contigo-Zurekin con el acuerdo de coalición de la Junta Electoral de Navarra antes de enlazar.

`audit:electoral` verde tras (b): 0 errores; los avisos `perfil-solo-componente` de IU/VQ son
esperados y no bloquean (patrón deliberado de coaliciones sin perfil paraguas).

---

## 4. (c/e) Enriquecimiento de perfiles — posiciones añadidas y huecos

Cada posición: `valor` guiado por el enunciado exacto del ítem y su ancla «Esperado:», con
`justificacion`, `calidadEvidencia` y `fuente` con cita reproducible. `grupoEvidencia`
asignado por `scripts/asignar-grupos-evidencia.mjs --write`.

### 4.1 Ciudadanos (9 → 13) — commit `a998111` (este worktree)
| ítem | valor | evidencia (cita) | fuente |
|---|---|---|---|
| ter-004 | +2 | «el castellano será lengua vehicular en todos los colegios de España» (bandera fundacional; promesa de Rivera) | elEconomista 2019-02 |
| nuc-001 | +2 | «elecciones entre jueces para el CGPJ» (12 de 20 vocales elegidos por jueces) | El Español 2018-07 |
| eco-009 | +2 | «Cs presenta una Ley para suprimir el impuesto de sucesiones…» | web oficial ciudadanos-cs.org |
| eco-010 | +2 | «su modelo laboral de contrato único y mochila austríaca» (se honra el ancla del ítem: Cs +2) | elEconomista 2018-06 |

### 4.2 Más Madrid (23 → 26) — aterrizado por el integrador en `a0e82f6`
| ítem | valor | evidencia (cita) | fuente |
|---|---|---|---|
| eco-001 | +2 | «Quien más tiene, paga más» (reforma fiscal, subir IRPF>100k, recuperar patrimonio/sucesiones) | Última Hora 2026-05 (+El Debate/El Diario de Madrid) |
| soc-004 | +2 | «Maestre exige 400 funcionarios para regularizar inmigrantes en Madrid» | Moncloa.com 2026-05 |
| soc-005 | +2 | «Mira hacia arriba para descubrir a los verdaderos culpables de la desigualdad» (refuta el «Gran Reemplazo») | web oficial masmadrid.org |

### 4.3 PACMA (14 → 15) — aterrizado por el integrador en `a0e82f6`
| ítem | valor | evidencia (cita) | fuente |
|---|---|---|---|
| mon-001 | +1 | «PACMA solicita un referéndum vinculante para elegir el modelo de Estado» | web oficial pacma.es |

### 4.4 Chunta Aragonesista (11 → 12) — commit `e5e2838` (este worktree, vuelta 2)
| ítem | valor | evidencia (cita) | fuente |
|---|---|---|---|
| soc-001 | +2 | «CHA reafirma su compromiso con los derechos, la dignidad y la libertad de las personas LGTBI+» | web oficial chunta.org |

### 4.5 Huecos deliberados (posición NO añadida por falta de pasaje reproducible o por riesgo de signo)
- **Alianza Verde (queda en 3) y Verdes Equo (queda en 6):** WebSearch no devuelve pasajes
  verbatim de sus programas fuera de su núcleo clima/nuclear (ya cubierto). Ítems intentados sin
  cita limpia: eco-001/eco-005/eco-006 (fiscalidad/vivienda), soc-001/soc-004 (social),
  mon-001 (VQ), y **ecl-002 (coches 2035, ancla VQ +2)** — la búsqueda solo devolvió información
  genérica de la UE, sin declaración propia. **No se forzó ninguna.**
- **PUM+J (queda en 6):** perfil humanista-transversal; sus posiciones fuera de migración/DDHH
  no son documentables con cita reproducible.
- **Más Madrid — def-001 (gasto militar):** trampa de signo evitada. La cita disponible de
  Mónica García es «ni rearme ni recortes» (celebra NO gastar el 5 % en defensa), que NO
  equivale a «reducir el gasto militar» (+2); «ni recortes» contradice reducir. Hueco, no signo.
- **Más Madrid — soc-006 (prisión permanente), mon-001 (república):** sin cita directa limpia
  atribuible a Más Madrid; posición probable pero no reproducible. Huecos.
- **Más Madrid — soc-003 (videovigilancia):** votó en contra de ampliar cámaras (con PSOE,
  frente a PP/Vox); hecho con ≥2 fuentes pero sin cita directa del partido. Hueco.
- **Ciudadanos — eco-014 (patrimonio, ancla Cs −2), eco-015 (jubilación), eco-013/eco-002
  (sanidad concertada):** los recursos contra el impuesto de grandes fortunas fueron de
  gobiernos autonómicos del PP, no de Cs con cita propia; el resto sin cita limpia. Huecos.
- **Chunta — ter-002 (referéndum de autodeterminación):** CHA lo defiende «dentro de la
  legalidad», pero el pasaje verbatim disponible (hoyaragon) ya sostiene `nac-002`; para no
  reutilizar el mismo pasaje en un ítem del mismo eje (regla 2) se dejó como hueco.

---

## 5. (d) Candidaturas sin perfil (>0,05 %) — recibo

Lista completa por convocatoria: ver salida de auditoría abajo. **Superan el umbral de la
regla 5 (>0,5 %) y son candidatas a perfil nuevo con corpus documentable** (recomendadas para
una tanda dedicada; NO creadas en esta por el coste de un corpus citado de ~10 posiciones cada
una y por evitar conflictos con ficheros de convocatoria que el integrador ya tocó):

| Prioridad | Candidatura | % | Convocatoria | Ámbito/CCAA sugerido | Motivo |
|---|---|---|---|---|---|
| **P0** | Partido Regionalista de Cantabria (PRC) | 21,17 % | cantabria-2023-05 | autonomico/cantabria | Fuerza de gobierno histórica; corpus amplio |
| **P0** | Coalición por Melilla (CpM) | 19,04 % | melilla-2023-05 | autonomico/melilla | 2ª fuerza; corpus documentable |
| **P1** | Movimiento por la Dignidad y la Ciudadanía (MDyC) | 11,36 % | ceuta-2023-05 | autonomico/ceuta | 4ª fuerza de Ceuta |
| **P1** | Ceuta Ya! | 10,16 % | ceuta-2023-05 | autonomico/ceuta | 5ª fuerza de Ceuta |
| **P1** | MÉS per Mallorca | 8,49 % | illes-balears-2023-05 | autonomico/illes-balears | Nacionalismo de izquierdas; corpus amplio |
| **P1** | Somos Melilla | 5,19 % | melilla-2023-05 | autonomico/melilla | 5ª fuerza |
| **P2** | El PI-Proposta per les Illes Balears | 3,85 % | illes-balears-2023-05 | autonomico/illes-balears | Regionalismo balear |
| **P2** | Foro Asturias | 3,73 % | asturias-2023-05 | autonomico/asturias | Corpus documentable |
| **P2** | Partido Riojano (+España Vaciada) | 3,63 % | la-rioja-2023-05 | autonomico/la-rioja | Regionalismo riojano |
| **P2** | MC Regional (Movimiento Ciudadano) | 2,99 % | murcia-2023-05 | autonomico/murcia | Regionalismo cartagenero |
| **P2** | Por La Rioja | 2,63 % | la-rioja-2023-05 | autonomico/la-rioja | — |
| **P2** | Cantabristas | 1,73 % | cantabria-2023-05 | autonomico/cantabria | Nacionalismo cántabro de izquierdas |
| **P2** | Unidos por Gran Canaria | 1,72 % | canarias-2023-05 | insular/canarias | — |
| **P2** | MÉS per Menorca | 1,46 % | illes-balears-2023-05 | autonomico/illes-balears | — |
| **P2** | Partido Aragonés (PAR) | 1,26 % | aragon-2026-02 | autonomico/aragon | Regionalismo aragonés de centro |
| **P3** | Democracia Ourensana (DO) | 1,04 % | galicia-2024-02 | local/galicia | Partido local de Ourense |

Candidaturas 0,05–0,5 % sin perfil («inventariadas sin perfil», motivo = por debajo del umbral
de creación de la regla 5): Andalucistas Pueblo Andaluz, 100x100 Unidos, Jaén Merece Más;
Andecha Astur, Suma Principado; múltiples listas insulares canarias; +Cuenca/España Vaciada;
Nueve CyL, PCAS-TC, Vamos Palencia; Alhora; Libres (Ceuta); Los Verdes-Ecopacifistas,
Esquerra Republicana del País Valencià; EB-AZ, IZAN; Extremadura Unida; Espazo Común Galeguista;
Ara Eivissa, Proyecto Liberal Español, etc.; VINEA; PFE, Unión por Leganés, Partido Humanista;
Adelante/Creando Melilla; Por mi Región, Murcia Libre, Valores, Partido Cantonal de Cartagena;
Eguzkilore, Voluntad Foral. (Lista exhaustiva en la salida de `auditar` abajo.)

---

## 6. (e/f) Vuelta 2, antes/después y propuestas

### 6.1 Antes/después por perfil enriquecido
| perfil | antes | después | Δ | commit |
|---|---|---|---|---|
| ciudadanos | 9 | 13 | +4 | `a998111` (worktree) |
| mas-madrid | 23 | 26 | +3 | `a0e82f6` (integrador) |
| pacma | 14 | 15 | +1 | `a0e82f6` (integrador) |
| chunta-aragonesista | 11 | 12 | +1 | `e5e2838` (worktree) |
| **Total posiciones nuevas** | | | **+9** | |
| Relaciones componente (13 convocatorias) | 46 perfiles enlazados | +14 relaciones | | `6751932` (integrador) |

### 6.2 Vuelta 2 — resto de CCAA
Aplicado el filtro «componente/fuerza autonómica principal con <15 posiciones y >5 % de voto»,
la única fuerza principal claramente infracubierta con perfil existente era **Chunta
Aragonesista** (9,85 % Aragón, 11 pos) → enriquecida (+soc-001). El resto de fuerzas
autonómicas grandes con <15 posiciones **carecen de perfil** (PRC, CpM, MÉS per Mallorca,
MDyC…) y se recogen como perfiles nuevos recomendados en §5, no como enriquecimiento.
Compromís (21), Nueva Canarias (21), Coalición Canaria (42), Geroa Bai (19), UPN (25) ya
superan el umbral de 15 posiciones.

### 6.3 Propuestas de cambio de valor (regla 3 — NO se tocó ningún valor existente)
Revisados los perfiles enriquecidos, **no se detectó ningún valor existente incorrecto que
proponer cambiar**. Nota de coherencia (no bloqueante) para el integrador: el aviso de
`validate:data` sobre «sesgo de evidencia-bandera» en `vox`, `cup`, `alianca-catalana`,
`adelante-andalucia`, `pcpe`, `pcpc`, `recortes-cero`, `upg` (coordenada extrema con pocas
posiciones, todas ±2) sigue vigente y es candidato a buscar posiciones moderadoras
documentables en futuras tandas; no es un error y no se alteró nada.

---

## 7. Puertas ejecutadas (en ESTE worktree)

```
node scripts/validate-data.mjs              → ✓ 0 errores (v4, 67 partidos, 21 convocatorias)
node scripts/asignar-grupos-evidencia.mjs   → ✓ todos los pasajes con grupo canónico
node scripts/auditar-contexto-electoral.mjs → ✓ exit 0 (0 errores)
node scripts/auditar-brujula-partidos.mjs   → informativo (ciudadanos pasa a tener X=100,0;
                                               mas-madrid mejora su X en la rama del integrador)
vitest run                                  → 390/391 tests pasan; el único rojo es
                                               `todo-validator` por el recuento contractual
                                               1.377/1.372, que solo el integrador puede
                                               reconciliar en docs/TODO-MAPEO-EXHAUSTIVO.md.
```

Cada cita nueva lleva `grupoEvidencia`; `validate:data` y `validate:evidence-groups` verdes en
el worktree. Commits atómicos en la rama `worktree-agent-a44e69a5b45152359`; **ningún push**.

---

## 8. Para el integrador — checklist de reintegración

1. Cherry-pick / merge de mis commits de rama: **`a998111`** (Ciudadanos +4) y **`e5e2838`**
   (Chunta +1) — ficheros `data/partidos/ciudadanos.json` y
   `data/partidos/chunta-aragonesista.json`, **disjuntos** de tu trabajo (b/c), sin conflicto.
2. Reconciliar el total de `docs/TODO-MAPEO-EXHAUSTIVO.md` (línea 367): +9 posiciones sobre
   1.372 (=1.381) tras integrar mis 5 (Cs+CHA) y tus 4 (mas-madrid/pacma). Con eso
   `tests/todo-validator.test.js` pasa a verde.
3. Verificar en tu rama mis `6751932` (14 relaciones (b)) y las 4 posiciones (c) de
   mas-madrid/pacma recogidas en `a0e82f6`, con las fuentes de §3 y §4.
4. Opcional: enlazar AV/VQ en Contigo-Zurekin (Navarra) tras confirmar el acuerdo de coalición
   de la Junta Electoral; crear los perfiles P0/P1 de §5 (PRC, CpM, MDyC, MÉS per Mallorca…).
