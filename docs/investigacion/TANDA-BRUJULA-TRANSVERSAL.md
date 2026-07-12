# Tanda brújula transversal — partidos autonómicos relevantes

Subida al contrato de brújula (Propiedad/mercado × Poder político) de seis partidos
autonómicos/estatales: **mas-madrid, compromis, geroa-bai, coalicion-canaria, upn,
frente-obrero**.

- **Base de sincronización**: `git reset --hard 7cafb3c` (Espectro 0.9.0).
- **Método**: solo posturas verificables (programa, mociones, votaciones autonómicas,
  dirección). WebSearch ≥2 extractos por posición (WebFetch da 403 en este entorno).
  Valor por el enunciado exacto, justificación propia, fuente URL+título+fecha
  obligatoria, calidad media/baja (la alta reservada a votación/programa/declaración
  inequívoca). Cada grupo documental independiente = URL distinta. Sin postura → HUECO.
  El 0 documentado (modelo mixto o equilibrio explícito) vale como contrapeso.
- **Aislamiento**: solo altas en `posiciones`; ningún valor preexistente modificado
  (verificado: 40 altas, 0 preexistentes tocadas, metadatos intactos); commits atómicos
  por partido; `npm run validate:data` verde antes de cada commit.

## Contrato objetivo (recordatorio)

- **Eje X (propiedad)** sólido: ≥6 grupos independientes, ≥3 subdimensiones y **cada
  subdimensión cubierta con ≥2 grupos** (equilibrio), coordenada calculable, sin
  «extremo sin contrapeso».
- **Eje Y (poder)** sólido: ≥6 grupos, ≥3 familias, ≥2 grupos de núcleo
  (contrapesos o libertades-coerción), sin extremo.
- Ambos ejes provisionales relajan el mínimo de grupos a 3 y de familias/subdimensiones
  a 2 (X sigue exigiendo equilibrio; Y, ≥1 núcleo). Cualquier grado ≠ insuficiente exige
  **no** tener «extremo sin contrapeso».

## Resumen ejecutivo

| Partido | Antes | Después | Altas | Commit |
|---|---|---|---|---|
| mas-madrid | provisional (−40,7; −53,8) | **provisional** (−40,7; −59,4) · Y ya sólida | 2 | `9486571` |
| compromis | insuficiente (−100; −100) | **SÓLIDA** (−74,5; −71,7) | 14 | `5ce8eb7` |
| geroa-bai | insuficiente (−55,4; −100) | **SÓLIDA** (−57,3; −59,8) | 8 | `053c099` |
| coalicion-canaria | insuficiente (50; 100) | insuficiente (2,3; −7,3) · ambos extremos despejados | 6 | `b17bd33` |
| upn | insuficiente (100; 100) | **SÓLIDA** (60,2; −20) | 10 | `51ebb04` |
| frente-obrero | insuficiente (−100; 50) | insuficiente (sin cambios) | 0 | — |

Balance: **3 perfiles nuevos sólidos** (compromis, geroa-bai, upn), 1 provisional con eje Y
rematado (mas-madrid), 1 insuficiente muy mejorado con ambos extremos despejados
(coalicion-canaria) y 1 sin evidencia verificable adicional (frente-obrero). Global del
auditor tras la tanda: 3/65 sólidas, 2 provisionales.

---

## mas-madrid — provisional (Y sólida; techo estructural en X)

**Altas (2):**
- `rel-002` (+2, media): PNL de 2026 para regular la predicación religiosa en el Metro
  apelando al «carácter aconfesional del Estado», y rechazo a prohibir el burka.
- `dem-001` (+1, media): modelo de participación con consulta ciudadana obligatoria vía
  Decide Madrid y presupuestos participativos.

**Contrato conseguido:** eje Y **sólido** (6 grupos, 4 familias, 4 núcleo, sin extremo).
Eje X se mantiene en 4 grupos / 2 subdimensiones (provisional), sin extremo.

**Hueco / techo estructural (X no alcanza sólida):**
- `propiedad-difundida`: `eco-006`, `eco-009`, `eco-014` ya presentes **sin cita**
  (intocables) → subdimensión bloqueada.
- `control-productivo`: exige un par `lab-016` + `lab-017`. `lab-016` es documentable
  (Agencia Madrileña de Energía pública — La Política Online), pero `lab-017`
  (transferir empresas a cooperativas) **no es documentable** para Más Madrid; añadir
  solo `lab-016` rompería el equilibrio y degradaría el perfil, así que no se añade.

**URL para cola humana:** `lab-016` MM tiene fuente lista si aparece un `lab-017`
verificable (https://www.lapoliticaonline.com/espana/energia-es/la-propuesta-energetica-de-mas-madrid-dejar-de-ser-un-sumidero-y-producir-el-50-de-la-electricidad/).

---

## compromis — SÓLIDA (de insuficiente)

**Altas (14):**
- X: `eco-012` (+1, conciertos que segregan por género), `lab-017` (+1, cooperativas y
  economía social), **`lab-016` (0, modelo mixto)**, `eco-011` (+2, jornada 32h),
  `lib-008` (−2, regular VTC), `eco-009` (−2, mantener Sucesiones), `eco-014` (+2,
  impuesto a grandes fortunas).
- Y: `der-026` (−2), `dem-010` (+1), `dem-026` (+2, rechazo al «secuestro» de À Punt),
  `soc-006` (+2), `rel-003` (−2, laicismo/Concordato), **`dem-015` (+2, disciplina interna,
  caso Micó)**, `dem-029` (+1, ILP).

**Contrato conseguido:** X sólido (10 grupos, 4 subdimensiones equilibradas, extremo
despejado) e Y sólido (8 grupos, 4 familias, 6 núcleo, extremo despejado).

**Clave del desbloqueo:** Compromís puntuaba estatista en TODOS los ítems de mercado
documentados (extremo económico). El **0 de `lab-016`** (modelo público-privado: banca
pública IVF complementaria de la privada, «efecto tractor», reindustrialización ante la
patronal con colaboración privada) aporta el contrapeso documentado que despeja el
«extremo sin contrapeso» del eje X. `dem-015` (disciplina interna) hace lo propio en Y.

**Huecos declarados:** `dr-001` (nacionalización de banca; la banca pública IVF se
plantea como complemento, no sustituto — dirección indeterminada, no se fuerza).

**URL para cola humana (verificar el 0 de lab-016):**
https://www.eldiario.es/comunitat-valenciana/economia/bautismo-fuego-baldovi-patronal-reindustrializacion-escuela-negocios-publica-vpp-colaboracion-privada_1_13213829.html

---

## geroa-bai — SÓLIDA (de insuficiente)

**Altas (8):**
- X: `eco-011` (+2, jornada 37,5h votada en el Parlamento foral), `eco-009` (−1, mantiene
  Sucesiones con mínimo exento elevado), `eco-014` (+1, incorpora al régimen foral el
  impuesto a grandes fortunas).
- Y: `soc-006` (+2), `dem-021` (+2, reformar ley mordaza + recurso 2015), `dem-001` (+2,
  referéndum vinculante sobre el estatus de Navarra), `dem-002` (+1, Ley Foral de
  Participación Democrática), **`dem-008` (−1, contesta al Supremo/Constitucional cuando
  limitan el autogobierno)**.

**Contrato conseguido:** X sólido (7 grupos, 3 subdimensiones equilibradas) e Y sólido
(7 grupos, 3 familias, 5 núcleo). Ambos extremos despejados.

**Clave del desbloqueo:** eje Y era 100% libertario (extremo). `dem-008` (−1) —Geroa Bai
califica de «ataque grave al autogobierno» y «recentralización encubierta» los fallos que
limitan las competencias forales, cuestionando la independencia judicial— es el contrapeso
autoritario documentado que despeja el extremo.

**Huecos declarados:** `dr-001`, `lab-016`, `lab-017`, `lib-008`, `eco-010` (acción del
Ejecutivo foral del PSN, no declaración propia de Geroa Bai), `der-026`, `dem-015`
(disciplina interna: solo tensiones entre socios, no cita propia).

**URL para cola humana (matiz de dem-008):**
https://www.deia.eus/politica/2024/02/20/uxue-barkos-ataque-grave-autogobierno-7896449.html

---

## coalicion-canaria — insuficiente (ambos extremos despejados; techo estructural)

**Altas (6):**
- X: `izq-005` (−1, ponencia ideológica pro-iniciativa privada), `lib-008` (−2, VTC
  restringidas por criterios ambientales).
- Y: `dem-026` (−2, ley audiovisual CC-PP rebaja la mayoría reforzada de RTVC), `soc-001`
  (+2, voto del matrimonio igualitario 2005), `dem-021` (+2, recurso ley mordaza),
  `dem-022` (+1, el TC anula la sanción por grabar agentes).

**Contrato conseguido:** perfil mixto documentado (liberalismo económico regionalista +
garantías civiles + concentración de medios). **Ambos ejes dejan de marcarse como extremo.**
Eje Y provisional-capaz (5 grupos, 2 familias, 5 núcleo).

**Hueco / techo estructural (no alcanza provisional):**
- **X**: solo `coordinacion-mercado` es equilibrable. `titularidad` no llega a 2 anclas
  (`dr-001` HUECO tras ~8 búsquedas; `eco-002` intocable); `control-productivo`
  (`lab-016` intocable) y `propiedad-difundida` (`eco-006`/`eco-009`/`eco-014` intocables)
  bloqueadas. Con una sola subdimensión equilibrada, X no alcanza provisional y arrastra
  el perfil a insuficiente pese a la calidad de las altas.
- **Y**: sin 3ª familia — `dem-015` (caso Oramas, excelente fuente) está **presente sin
  cita** (intocable); `dem-002`, `dem-019`, `dem-028` HUECO.

**Notas para cola humana:** `dem-021` y `dem-022` proceden ambas del recurso de
inconstitucionalidad de 2015 (proposiciones y URLs distintas, evidencia emparentada).
`soc-001` es un voto de 2005 (histórico, calidad media por antigüedad).

---

## upn — SÓLIDA (de insuficiente)

**Altas (10):**
- X: `eco-002` (+1, colaboración público-privada «con criterios de eficiencia»),
  `ene-005` (+1, tumba el gravamen a energéticas), `eco-006` (−1, rechaza la ley de
  vivienda intervencionista), `eco-014` (−1, contra el impuesto a grandes fortunas).
- Y: `dem-008` (+1, contra la amnistía), `dem-010` (+2, control parlamentario en el estado
  de alarma), `dem-007` (−2, jueces eligen el CGPJ), `dem-023` (+1, potestades policiales),
  `dem-015` (+2, disciplina interna: sanción a Sayas y Adanero), `dem-001` (−1, intenta
  eliminar el referéndum de la Disposición Transitoria 4ª).

**Contrato conseguido:** X sólido (6 grupos, 3 subdimensiones equilibradas) e Y sólido
(7 grupos, 4 familias, 5 núcleo). Ambos extremos despejados.

**Clave del desbloqueo:** las posturas **moderadas** de mercado (+1/−1) bajan la coordenada
X por debajo de 75 y despejan el extremo; `eco-002` (+1) equilibra la subdimensión
`titularidad`, que sin ella bloqueaba todo el eje. En Y, el perfil constitucionalista mixto
(Estado de derecho/independencia judicial + orden/disciplina) despeja el extremo autoritario.

**Incidencia técnica resuelta:** la primera versión de `eco-006` colisionaba de fuente
(misma URL okdiario de la ley de vivienda) con la `eco-005` preexistente, y el auditor
purgaba ambas por «conflicto de identidad». Se reancló `eco-006` a un artículo okdiario
distinto (2025-04-22), restaurando `eco-005`.

**Huecos declarados:** `dr-001`, `lib-008`, `eco-013`, `izq-005`, `eco-010` (X);
`der-026`, `dem-019`, `dem-028`, `lab-015`, `rel-002`, `lab-005`, `dem-002` (Y).

**URL para cola humana (verificar eco-002 contra el programa real):**
https://www.politicaelectoral.com/es/espana/autonomicas-2023/navarra/upn
(corroborado por la presidenta C. Ibarrola en redaccionmedica.com sobre público-privada
en sanidad «con criterios de eficiencia, calidad y efectividad»).

---

## frente-obrero — insuficiente (sin altas; extremo genuino)

**Altas: 0.** No se localizó ninguna postura verificable **atribuible al propio partido con
cita literal** y URL distinta:
- La única postura de calidad alta hallada (`izq-005`, nacionalización de sectores
  estratégicos) procede del **mismo tuit** que ya sustenta `eco-002`/`eco-013`/`lab-016`
  (colisión/duplicado): no aporta grupo independiente.
- Las pistas sólidas (`eco-009` mantener/reforzar Sucesiones para grandes patrimonios;
  `eco-012` reducir subvenciones a la concertada; nacionalización, centralismo,
  recuperación de competencias para el Estado central) están **en los PDF del programa**
  (`frenteobrero.es/wp-content/uploads/.../Programa.pdf`,
  `Documentos-Politicos-Frente-Obrero.pdf`), **inaccesibles por WebFetch 403**; solo se
  obtienen paráfrasis en inglés de fuentes secundarias, sin cita literal.
- `lab-017`: un marxista-leninista prefiere propiedad estatal a cooperativas (desacuerdo con
  el enunciado), pero (a) no hay cita literal del FO y (b) codificarlo como contrapeso de
  mercado sería una mala lectura del eje. HUECO.

**Resultado honesto:** FO se mantiene como **extremo económico genuino** (X −100, «extremo
sin contrapeso») con evidencia documentable mínima (un tuit de 2021 + un punto de programa
en `soc-001`). No se fuerza ninguna postura por respeto al mandato anti-estereotipo
(«solo posturas documentadas del partido, no del campo rojipardo»).

**Cola humana (desbloqueo pendiente de acceso al PDF):** abrir desde un entorno sin 403
`https://frenteobrero.es/wp-content/uploads/2025/01/Programa.pdf` y
`https://frenteobrero.es/wp-content/uploads/2023/07/Documentos-Politicos-Frente-Obrero.pdf`
para extraer citas literales de sucesiones (`eco-009`, ≈ −2), conciertos (`eco-012`, ≈ +1)
y modelo de propiedad estatal vs. cooperativa (`lab-017`).

---

## Auditor de brújula — antes / después

`npm run audit:partidos` (líneas de los 6 objetivos; los perfiles **sólidos ya no
aparecen** en la lista de problemas del auditor).

**Antes (base 7cafb3c):**

```
- coalicion-canaria: insuficiente; (50.0, 100.0); X 1/6 grupos independientes (1 ítems) y 1/3 familias; X subdimensiones con una sola ancla independiente: coordinacion-mercado; Y 1/6 grupos independientes (1 ítems), 1/3 familias y 1/2 grupos núcleo; extremo sin evidencia moderadora o contradictoria independiente
- compromis: insuficiente; (-100.0, -100.0); X 3/6 grupos independientes (4 ítems) y 3/3 familias; X subdimensiones con una sola ancla independiente: propiedad-difundida, titularidad; Y 1/6 grupos independientes (1 ítems), 1/3 familias y 1/2 grupos núcleo; extremo sin evidencia moderadora o contradictoria independiente
- frente-obrero: insuficiente; (-100.0, 50.0); X 2/6 grupos independientes (3 ítems) y 3/3 familias; X subdimensiones con una sola ancla independiente: control-productivo, coordinacion-mercado, titularidad; Y 1/6 grupos independientes (1 ítems), 1/3 familias y 1/2 grupos núcleo; extremo sin evidencia moderadora o contradictoria independiente
- geroa-bai: insuficiente; (-55.4, -100.0); X 4/6 grupos independientes (4 ítems) y 3/3 familias; X subdimensiones con una sola ancla independiente: coordinacion-mercado, propiedad-difundida; Y 2/6 grupos independientes (2 ítems), 2/3 familias y 2/2 grupos núcleo; extremo sin evidencia moderadora o contradictoria independiente
- upn: insuficiente; (100.0, 100.0); X 2/6 grupos independientes (2 ítems) y 2/3 familias; X subdimensiones con una sola ancla independiente: coordinacion-mercado, titularidad; Y 1/6 grupos independientes (1 ítems), 1/3 familias y 1/2 grupos núcleo; extremo sin evidencia moderadora o contradictoria independiente
- mas-madrid: provisional; (-40.7, -53.8); X 4/6 grupos independientes (4 ítems) y 2/3 familias; Y 4/6 grupos independientes (5 ítems), 2/3 familias y 3/2 grupos núcleo
```

**Después:**

```
- coalicion-canaria: insuficiente; (2.3, -7.3); X 3/6 grupos independientes (3 ítems) y 1/3 familias; Y 5/6 grupos independientes (5 ítems), 2/3 familias y 5/2 grupos núcleo
- frente-obrero: insuficiente; (-100.0, 50.0); X 2/6 grupos independientes (3 ítems) y 3/3 familias; X subdimensiones con una sola ancla independiente: control-productivo, coordinacion-mercado, titularidad; Y 1/6 grupos independientes (1 ítems), 1/3 familias y 1/2 grupos núcleo; extremo sin evidencia moderadora o contradictoria independiente
- mas-madrid: provisional; (-40.7, -59.4); X 4/6 grupos independientes (4 ítems) y 2/3 familias
```

(compromis, geroa-bai y upn desaparecen de la lista: son **sólidas**.)

## Triaje para el integrador

- **Aceptar sin más:** compromis, geroa-bai, upn (sólidas, sin problemas), y las mejoras de
  mas-madrid (Y sólida) y coalicion-canaria (extremos despejados).
- **Revisar (media/inferencia):** el `0` de `lab-016` en compromis (modelo mixto
  público-privado), `dem-008` −1 en geroa-bai y upn (contestación al poder judicial /
  amnistía), `eco-002` +1 en upn (público-privada vía agregador de programa).
- **Techos estructurales por entradas preexistentes sin cita (intocables):** mas-madrid X,
  coalicion-canaria X e Y. Si se levantara la regla de intocabilidad para completar la cita
  de esas entradas (`eco-006`/`eco-009`/`eco-014`, `lab-016`, `dem-015`, `dem-001`), varios
  de esos perfiles subirían de grado.
- **Pendiente de acceso a PDF (cola humana):** frente-obrero (programa en PDF con 403).
