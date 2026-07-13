# TANDA — Recalibración del eje del compass (posiciones moderadoras)

Objetivo: corregir el sesgo de evidencia-bandera que deja a varios partidos
demasiado extremos en los ejes `economico` (lrecon) y `social` (galtan) del
calibrador CHES, buscando posiciones MODERADORAS/PRAGMÁTICAS REALES con pasaje
verificable. Principio rector respetado: CHES es diagnóstico, no objetivo; solo
se añaden posiciones con pasaje que un humano pueda comprobar; nunca se mueve un
partido para cuadrar con CHES; nunca se inventa ni se estira un pasaje.

Base: `18cc5aa`. Worktree `agent-af1cafa3ee203037e`. Solo ALTAS en
`data/partidos/`; contador del TODO y `contratoFuncional.sha256` actualizados
por obligación de puertas. Sin tocar ítems, esquemas, web ni tests.

## Límite de entorno (condiciona el alcance de esta tanda)

En este entorno **WebFetch está bloqueado (403) para toda fuente política
española** probada: PDFs de programas (eaj-pnv.eus, mivotocuenta.es),
prensa (eldiario.es, naiz.eus, europapress, elespanol), Wikipedia, sitios de
partido (upn.org), oficiales (congreso.es, parlamentodenavarra.es) e incluso
web.archive.org. Solo responde infraestructura de desarrollo
(raw.githubusercontent). `WebSearch` sí funciona, pero devuelve resúmenes
parafraseados; el único verbatim verificable que ofrece es el **titular exacto**
de cada resultado (campo título del enlace).

Consecuencia metodológica: solo puede sostenerse `calidadEvidencia` **media**
vía «titular-como-cita» cuando el titular responde por sí mismo al instrumento
EXACTO y en la dirección correcta. No puede alcanzarse `alta` (exige leer el
pasaje completo del programa, inaccesible aquí). Por eso esta tanda produce
**1 alta** y declara el resto como **huecos por inaccesibilidad de fuente**
—distinto de «el partido no tiene moderadoras»—, con leads accionables para un
integrador con acceso web. Fabricar citas de resúmenes no leídos habría sido la
traición que la constitución prohíbe; se ha evitado deliberadamente.

## Alta realizada (1)

### junts — `der-018` = −1 (media) · eje social ↑
- **Instrumento:** «Debe facilitarse la regularización de los inmigrantes que
  llevan años viviendo y trabajando en España.» (carga social −0.5)
- **Valor −1 (desacuerdo condicionado):** en marzo de 2026 Junts votó **junto a
  PP y Vox** una iniciativa que instaba al Gobierno a **paralizar** su plan de
  regularización extraordinaria de inmigrantes con años de residencia y trabajo;
  además condiciona cualquier regularización a que se transfieran a Cataluña las
  competencias de inmigración. No respalda facilitarla en los términos
  planteados → desacuerdo, pero no absoluto (de ahí −1, no −2).
- **Fuente (votacion, titular-como-cita, media):** «El Congreso pide parar la
  regularización de inmigrantes con los votos del PP, Vox y Junts» (El Debate,
  2026-03-18). Corroborado por pp.es y okdiario. `grupoEvidencia`
  `pasaje-6a3f215e89d5fd5a923d`.
- **Efecto:** junts social −17(14) → −14(15); Δ con CHES de −36 a −33
  (dirección correcta hacia +19). El resto de su torcedura social es genuino
  (Junts es liberal en moral: soc-001=2, fem-001=1) o queda como hueco (abajo).

## Huecos declarados por partido (con leads para acceso web)

Patrón transversal hallado: **la evidencia moderadora fuerte que sí se corrobora
mapea a ítems YA codificados o BLOQUEADOS**, no a huecos; y varias hipótesis de
moderación se **contradicen** con los hechos. Detalle:

- **eaj-pnv** (econ −9 vs +24; social −54 vs +24). Se corrobora que el PNV es
  proempresa y defiende la colaboración público-privada como «garantía de
  eficiencia» y «fórmulas de gestión más modernas» (notas eaj-pnv.eus; tensión
  interna: Elena Lete se opuso a «acotar la privatización»). PERO esa evidencia
  responde a **eco-002 (BLOQUEADO a 0, modelo-mixto) y eco-013 (ya = 1)**: no
  hay hueco donde colocarla. La palanca fiscal (revolución fiscal de Bizkaia,
  deducciones IRPF para atraer talento) **se contradice** con que PNV votó
  CONTRA la rebaja fiscal del PP (eleconomista, 2024): fiscalidad pragmática, no
  encaja limpio en eco-001. Orden/autoridad (apoyo a la Ertzaintza; instrucción
  de Zupiria de publicar criminalidad por origen, elespanol 2025-11-16) es real
  pero **no casa con ningún ítem del eje social** (soc-003 videovigilancia ya
  =1; el banco social es inmigración/moral/LGTB, donde el PNV es liberal → −54
  en parte genuino). Leads (requieren leer el programa 21A-2024): nac-005
  (ordinalidad/Concierto), lib-*/ene-005 promercado, va-008.
  **Observación (no tocada):** eco-002=0 podría infravalorar la postura
  proeficiencia documentada; queda anotada, sin modificar (regla dura).
- **junts** (social −17 vs +19). Además del alta der-018, la línea dura en
  okupación (ley de desalojo exprés 48h, con PP/Vox) responde a **eco-007 (ya
  =2)**. La exigencia de integración en cultura/lengua **catalana** NO responde
  a cul-001 (que pide costumbres «españolas») → hueco por instrumento. Lead:
  soc-003 (un candidato afirmó que «más cámaras ayudan mucho a disuadir»), sin
  URL/fecha atribuible aquí.
- **eh-bildu** (econ −84 vs −50; social −84 vs −56). El «acercamiento al mundo
  empresarial» es real (eldiario/naiz/gedar) pero **desarrollista-estatal**
  (Banco Vasco de Inversiones, Consejo Público de la Industria, «modelo vasco de
  empresa» con participación de trabajadores) → mapea a **lab-017 (ya =1,
  cooperativas)**, no a ítems promercado (eco-002=−2, ene-005 públicas). Social:
  genuinamente libertario (soc-003=−2, soc-002=−2, soc-004=2). Discrepancia con
  CHES a documentar, no hueco corregible con las fuentes accesibles. Lead
  (requiere lectura): izq-016/izq-005 (rechazo de expropiación/planificación
  total → economía mixta).
- **bng** (econ −83 vs −45; social −84 vs −49). Señal sólida de economía mixta
  (Instituto Galego de Crédito, apoyo a PYME, captación de inversión privada,
  escepticismo ante la expropiación; plan industrial de Pontón). Encaja mejor en
  **izq-016 = −2** (no expropiar sin indemnización → sube econ) pero **sin
  titular verbatim** que lo sostenga: hueco por fuente. Lead econ prioritario
  para el integrador.
- **erc** (social −93 vs −49). ERC gobernó la Generalitat y dirigió los Mossos
  (orden público institucional), pero no aflora titular que responda a un ítem
  social concreto (soc-003, etc.). Hueco por fuente. Lead: pragmatismo
  institucional en seguridad.
- **iu** (social −95 vs −55). Genuinamente extremo-libertario en el banco
  social; sin moderadoras documentables halladas. Se declara extremo real.
- **movimiento-sumar** (econ −83 vs −55). El diálogo social con la patronal
  (reforma laboral pactada con CEOE) responde a **der-012 (ya =2)**. Sin hueco
  promercado limpio con fuente accesible. Lead: izq-016/izq-005 (aceptación de
  economía de mercado mixta).
- **upn** (econ 71 vs 41; social 74 vs 45). **Contradicción con la hipótesis de
  moderación:** UPN **votó en contra / se abstuvo** en la revalorización de
  pensiones por IPC (Ley 20/2021 y decreto 2026) y **recortó sanidad un 13,2 %**
  (2010-13, newtral/noticiasdenavarra). Su conducta fiscal es genuinamente de
  derecha/austeridad: NO se hallan moderadoras económicas; añadir eco-008 (contra
  IPC) empeoraría el ajuste y no modera. Social: no aflora titular de UPN
  proinmigración/integración pese a la dependencia agraria de temporeros. Huecos
  por fuente + discrepancia; su extremidad puede ser en parte real.
- **coalicion-canaria** (social −36 vs +23). Refuerzo de seguridad/policía
  canaria (lavozdefuerteventura 2026-05-28, rama local de Antigua) es orden real
  pero **no responde a soc-003 (videovigilancia) ni a otro ítem social**: es
  «más policía/horas», sin instrumento equivalente. Gestión migratoria de la
  crisis canaria mapea a soc-002 (ya =−1). Hueco por instrumento/fuente.
- **psoe** (econ −47 vs −21, baja prioridad). El diálogo social pactado responde
  a der-012 (carga negativa: no sube econ). Sin moderadora promercado limpia.
  Hueco de baja prioridad.

## Resumen de puertas

`validate:data` ✓ · `validate:evidence-groups` ✓ (⚠ 1 cita sin localizador de
20 car., no bloqueante, preexistente) · `validate:todo-inventory` ✓ (715
casillas; posiciones 1665/1665) · `npm test` ✓ **454/454**.

## Calibrador — antes / después

Solo cambia **junts (social)**; el resto es idéntico porque no hubo más altas.

```
                      ANTES                         DESPUÉS
junts  social   -17(14)  CHES 19  Δ -36  →   -14(15)  CHES 19  Δ -33   (↑ correcto)
```

Tabla completa `npm run calibrar` (después):

```
partido            │  economico: calc  CHES   Δ      │     social: calc  CHES   Δ      │ territorial: calc  CHES   Δ
psoe               │    -47(14)    -21    -25 AVISO│    -36(13)    -41      6      │    -46(14)    -28    -18
pp                 │     68(14)     45     23      │     38(14)     40     -2      │     33(12)     40     -7
vox                │     82(15)     80      2      │     93(20)     90      3      │    100(13)    100      0
movimiento-sumar   │    -83(19)    -55    -28 AVISO│    -93(14)    -76    -17      │    -24(14)    -28      4
podemos            │    -75(19)    -67     -8      │    -90(15)    -71    -18      │    -53(13)    -40    -13
iu                 │    -84(14)    -68    -16      │    -95(10)    -55    -40 AVISO│    -91( 8)    -24    -67 AVISO
erc                │    -65(14)    -43    -22      │    -93(13)    -49    -45 AVISO│    -83(13)   -100     17
junts              │     42(15)     27     15      │    -14(15)     19    -33 AVISO│    -90(13)   -100     10
eh-bildu           │    -84(17)    -50    -34 AVISO│    -84(16)    -56    -28 AVISO│    -92(13)   -100      8
eaj-pnv            │     -9(15)     24    -33 AVISO│    -54(14)     24    -78 AVISO│    -15(11)   -100     85 AVISO
bng                │    -83(18)    -45    -38 AVISO│    -84(13)    -49    -34 AVISO│    -78(11)   -100     22
coalicion-canaria  │     20(14)     17      2      │    -36(13)     23    -60 AVISO│    -15(10)    -85     70 AVISO
upn                │     71( 8)     41     30 AVISO│     74( 8)     45     29 AVISO│     16( 8)    -35     51 AVISO
```

## Recomendación al integrador

Rehacer esta tanda en un entorno con WebFetch operativo para prensa/programas.
Los leads con mayor probabilidad de alta verificable, por impacto: **bng izq-016**
(no expropiación → econ ↑), **eaj-pnv** promercado en el programa 21A-2024
(lib-*/ene-005/nac-005) y su vertiente de orden democristiano, **junts soc-003**
(videovigilancia, atribuir URL), y **eh-bildu/sumar izq-016/izq-005** (economía
mixta). Mantener el mismo listón: pasaje que responda al instrumento exacto, en
la dirección que diga la fuente.
