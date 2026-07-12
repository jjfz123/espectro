# TANDA BRÚJULA — Partidos catalanes, vascos y gallego (Propiedad×Poder)

Subida al contrato de brújula (eje X = propiedad-mercado, eje Y = autoridad-política)
de **erc, junts, cup, eh-bildu, eaj-pnv, bng**. Base: `7cafb3c`. Solo ALTAS en
`posiciones` (capa base); ningún valor previo tocado (470 inserciones, 0 borrados).

## Puerta de datos

`npm run validate:data` → **verde** tras cada commit y al cierre.

## Auditor `npm run audit:partidos` — antes / después

**ANTES (base 7cafb3c):**

```
- bng:      insuficiente; (-100.0, -88.9); X 3/6 (3 fam), single-ancla coord/prop/titu; Y 3/6, 2/3 fam, 3/2 núcleo; extremo
- eaj-pnv:  insuficiente; (17.6, —);       X 4/6 (3 fam), single-ancla coord/prop;      Y 0/6, 0/3 fam, 0/2 núcleo; Y sin coordenada
- eh-bildu: insuficiente; (-100.0, 0.0);   X 4/6 (3 fam), single-ancla prop/titu;       Y 2/6, 2/3 fam, 1/2 núcleo; extremo
- erc:      insuficiente; (-88.9, -14.3);  X 5/6 (3 fam), single-ancla titu;            Y 2/6, 2/3 fam, 1/2 núcleo; extremo
- junts:    insuficiente; (89.1, -40.0);   X 3/6 (2 fam), single-ancla titu;            Y 3/6, 2/3 fam, 2/2 núcleo; extremo
- cup:      provisional;  (-61.0, -23.9);  X 5/6 (3 fam);                               Y 4/6, 2/3 fam, 2/2 núcleo
```

**DESPUÉS:**

```
- cup:      SÓLIDA;       (-67.4, -47.7);  X 6/6 (3 subdim equilibradas); Y 6/6 (4 fam, 3 núcleo)
- erc:      SÓLIDA;       (-66.7, -61.0);  X 6/6 (3 subdim equilibradas); Y 6/6 (4 fam, 4 núcleo)
- bng:      SÓLIDA;       (-72.2, -62.3);  X 6/6 (3 subdim equilibradas); Y 6/6 (4 fam, 4 núcleo)
- eaj-pnv:  SÓLIDA;       (-2.1, -71.9);   X 6/6 (3 subdim equilibradas); Y 6/6 (4 fam, 4 núcleo)
- junts:    insuficiente; (94.4, -61.0);   X 5/6 (single-ancla prop; extremo); Y 6/6 SÓLIDO (4 fam, 4 núcleo)
- eh-bildu: insuficiente; (-87.2, -60.0);  X 6/6 4 subdim (single-ancla prop; extremo); Y 6/6 SÓLIDO (4 fam, 4 núcleo)
```

**Resultado: 4 de 6 a SÓLIDA** (cup, erc, bng, eaj-pnv). **junts y eh-bildu** completan
el eje Y a nivel sólido y refuerzan el eje X, pero permanecen `insuficiente` por un
**hueco real y documentado**: el flag «extremo sin contrapeso» en el eje económico
(ver más abajo). No se ha fabricado ningún contrapeso.

## Método

- Solo posturas verificables (programa vigente, votaciones, dirección). ≥2 extractos
  por posición vía WebSearch (WebFetch daba 403). Valor por el enunciado exacto del ítem;
  justificación propia; fuente URL+título+fecha; calidad `media` en casi todas (`baja`
  no cuenta para la brújula, así que no se usó como grupo).
- **Grupo independiente = URL distinta.** Cada grupo nuevo usa una URL distinta de los
  demás grupos del mismo eje del partido.
- **Cita = localizador verificable**: se usa el titular/título real de la fuente (que la
  búsqueda reproduce con fiabilidad). Cuando el extracto no reproducía verbatim un pasaje
  interno, la cita es el título del documento y el razonamiento va en la justificación.
- **El 0 documentado como contrapeso**: para retirar el flag «extremo», se codificó como
  `0` (modelo-mixto, con `resolucionCero`) la postura de banca pública de erc y bng
  (un banco público que complementa —no nacionaliza— la banca privada). No se hizo con
  eh-bildu (que sí pide nacionalizar Kutxabank) ni con junts (que enterró la banca pública).

## Por partido

### cup — SÓLIDA (provisional → sólida)
Altas (3): `dr-001` (+2, X titularidad, banca pública/nacionalización), `der-026` (−2,
Y contrapesos núcleo, contra ilegalizar independentistas), `dem-001` (+2, Y participación,
referéndum vinculante de autodeterminación).
Contrato: X 6 grupos (3 subdim equilibradas); Y 6 grupos (4 familias, 3 núcleo). Sin huecos.

### erc — SÓLIDA (insuficiente → sólida)
Altas (5): `dr-001` (0 modelo-mixto, X titularidad — ICF como banca pública en modelo
mixto; **retira el flag de extremo** y equilibra titularidad), `der-026` (−2, Y contrapesos
núcleo), `soc-001` (+2, Y libertades núcleo, matrimonio igualitario), `dem-021` (+2, Y
libertades núcleo, derogación Ley Mordaza), `dem-001` (+2, Y participación, referéndum
fórmula Montenegro).
Contrato: X 6/6 (extremo resuelto); Y 6/6 (4 familias, 4 núcleo). Sin huecos.

### bng — SÓLIDA (insuficiente → sólida)
Altas (6): `dr-001` (0 modelo-mixto, X titularidad — banca pública galega + Instituto de
Crédito, **retira el flag de extremo X**), `eco-013` (−2, X coord, contra derivar a la
privada), `eco-009` (−2, X propiedad-difundida, contra rebajar sucesiones), `izq-003`
(−2 → contrapeso, Y jerarquía — frente organizado con dirección, **retira el flag de
extremo Y**), `dem-001` (+2, Y participación, dereito a decidir), `der-026` (−2, Y
contrapesos núcleo, contra ilegalizar nacionalistas).
Contrato: X 6/6; Y 6/6 (4 familias, 4 núcleo). Ambos extremos resueltos. Sin huecos.

### eaj-pnv — SÓLIDA (insuficiente → sólida)
Eje Y construido desde cero (0 → 6). Altas (8): `eco-006` (+1, X propiedad-difundida,
parque público en modelo mixto), `eco-010` (−1, X coord, contra abaratar el despido),
`der-026` (−2, Y contrapesos núcleo), `dem-028` (+2, Y contrapesos núcleo, nación vasca
indisponible para la mayoría), `soc-003` (+1, Y libertades núcleo, videovigilancia —
**ancla positiva que evita el flag de extremo Y**), `dem-001` (+1, Y participación,
derecho a decidir), `izq-039` (+1, Y jerarquía, límite de mandatos), `dem-008` (+2, Y
contrapesos núcleo, separación de poderes).
Contrato: X 6/6; Y 6/6 (4 familias, 4 núcleo). Sin huecos.
Nota de calidad: `izq-039` se apoya en una fuente terciaria (norma de límite de mandatos);
`dem-008` cita a Esteban sobre separación de poderes. Ambas `media`, marcadas para cola humana.

### junts — Y SÓLIDO; X reforzado (sigue insuficiente)
Altas (5): `dr-001` (−2, X titularidad, Giró enterró la banca pública), `eco-009` (+2, X
propiedad-difundida, suprimir sucesiones), `soc-001` (+2, Y libertades núcleo, ley
LGTBI catalana), `dem-001` (+2, Y participación, referéndum art. 92), `der-026` (−2, Y
contrapesos núcleo, contra ilegalizar independentistas).
Contrato conseguido: **eje Y 6/6 SÓLIDO** (4 familias, 4 núcleo). Eje X a 5/6 (3 subdim).
**HUECOS (por los que sigue insuficiente):**
- **Eje X «extremo sin contrapeso» (+94.4)**: Junts es un partido genuinamente pro-mercado
  en el polo (enterró la banca pública, suprime sucesiones/patrimonio, vota con PP/Vox en
  vivienda). No existe una postura económica moderadora o de sentido contrario verificable
  que codificar: el flag es **correcto**, no un defecto de cobertura.
- **propiedad-difundida con ancla única**: los únicos ítems restantes de esa subdimensión
  (eco-006, eco-014) ya existen sin sustentar y no pueden reabrirse (solo altas).

### eh-bildu — Y SÓLIDO; X completado (sigue insuficiente)
Altas (6): `lab-016` (+2, X control-productivo, banco vasco + energética pública),
`lab-017` (+1, X titularidad/control-productivo, economía social y cooperativa), `dem-021`
(+2, Y libertades núcleo, Ley Mordaza), `dem-020` (+2, Y contrapesos núcleo, relación
confederal/constituyente), `dem-001` (+2, Y participación, derecho a decidir), `rel-002`
(+2, Y libertades núcleo, Estado laico).
Contrato conseguido: **eje Y 6/6 SÓLIDO** (4 familias, 4 núcleo). Eje X 6/6 y 4 subdimensiones.
**HUECOS (por los que sigue insuficiente):**
- **Eje X «extremo sin contrapeso» (−87.2)**: Bildu está genuinamente en el polo
  anti-mercado (nacionalizar Kutxabank, control público de sectores estratégicos,
  fiscalidad progresiva). Su único 0 económico documentable —mantener la concertada
  (eco-012)— ya existe sin sustentar y no puede reabrirse. El flag es **correcto**.
- **propiedad-difundida con ancla única**: eco-006 sustentada; eco-014 ya existe sin sustentar.

## URLs a cola humana (verificación)

**cup**: larepublica.cat/…/la-cup-creu-que-catalunya-no-tindra-sobirania-financera… ·
publico.es/politica/vox-queda-ilegalizar-partidos-independentistas-no-prohibir-ideas.html ·
vilaweb.cat/noticies/cup-programa-electoral-eleccions-catalunya-2024/

**erc**: elnacional.cat/oneconomia/ca/economia/erc-psoe-acorden-impulsar-llicencia-bancaria-institut-catala-finances-icf_1411741_102.html ·
eleconomista.es/politica/noticias/10769663/09/20/Vox-intenta-que-el-Congreso-tramite-su-ley…-como-ERC-Junts-o-Bildu.html ·
publico.es/sociedad/asi-aprobo-matrimonio-igualitario-congreso-16-anos.html ·
eldiario.es/politica/reforma-ley-mordaza-fracasara-martes-anunciar-erc-eh-bildu-votaran_1_10030909.html ·
elplural.com/politica/independencia-cataluna-55-si-50-participacion-propuesta-erc-referendum_302678102

**bng**: galiciapress.es/articulo/politica/2026-06-04/5907310-ponton-propone-elevar-gasto-i-d-i-25-pib-crear-instrumentos-financiaros-apoyar-empresas ·
bng.gal/…/ana-ponton-denuncia-aumento-do-traspaso-fondos-sanidade-privada…/20250402141433040178.html ·
bng.gal/…/bng-propon-modelo-fiscal-mais-xusto-fronte-pp…/20251118081334041733.html ·
bnggaliza.opennemas.com/media/bnggaliza/files/2021/12/27/Principios%20organizaci%C3%B3ns%20e%20normas%20de%20funcionamento%20%28XVII%20AN%29.pdf ·
nosdiario.gal/…/ponton-demanda-reconecemento-plurinacional-do-estado-dereito-galiza-decidir…/20260628165732260511.html ·
eldiario.es/galicia/politica/bng-responde-vox-prohibicion-partidos-nacionalistas…_1_6222127.html

**eaj-pnv**: parlamentovasco.eaj-pnv.eus/es/noticias/55942/eaj-pnv-apuesta-por-impulsar-la-construccian-de-vi ·
deia.eus/economia/2012/03/09/pnv-defendera-derechos-laborales-marco-5462597.html ·
deia.eus/politica/2020/09/15/vox-queda-congreso-ley-ilegalizar-4680849.html ·
eaj-pnv.eus/noticias/esteban-recuerda-que-eajpnv-aproba_36455.html ·
eldiario.es/euskadi/bilbao-pondra-camaras-grabacion-policia-local-nuevo-plan-seguridad-ciudadana_1_11525810.html ·
elespanol.com/espana/politica/20180706/pnv-bildu-aliados-derecho-decidir-proyectiles-estatuto/320469069_0.html ·
es.wikipedia.org/wiki/Partido_Nacionalista_Vasco (izq-039, terciaria) ·
elplural.com/politica/espana/esteban-pnv-resucita-rima-tractor-rajoy-tumbar-feijoo_320138102 (dem-008)

**junts**: vozpopuli.com/espana/cataluna/giro-enterrar-banco-catalan.html ·
eldiario.es/catalunya/politica/junts-aprueba-congreso-eliminar-impuesto-sucesiones-donaciones_1_9178520.html ·
eldiario.es/catalunya/catalunya-aprueba-reforma-ley-lgtbifobia-multas-medio-millon-euros_1_12854115.html ·
maldita.es/malditateexplica/20231110/referendum-acuerdo-junts-psoe-constitucion/ ·
eleconomista.es/politica/noticias/10769663/09/20/Vox-intenta-que-el-Congreso-tramite-su-ley…-como-ERC-Junts-o-Bildu.html

**eh-bildu**: eitb.eus/es/noticias/politica/detalle/9986980/eh-bildu-plantea-14-propuestas-para-cambiar-politicas-industriales ·
politicaelectoral.com/es/espana/autonomicas-2024/pais-vasco/eh-bildu (lab-017 y rel-002; contenido programático, cita = título) ·
eldiario.es/politica/reforma-ley-mordaza-fracasara-martes-anunciar-erc-eh-bildu-votaran_1_10030909.html ·
eldiario.es/euskadi/claves-programa-eh-bildu-relacion-confederal-espana-repliegue-guardia-civil-mantener-concertada_1_11262861.html ·
naiz.eus/en/info/noticia/20230328/acuerdo-de-pnv-eh-bildu-y-elkarrekin-podemos-iu-por-el-derecho-a-decidir-y-la-republica

## Triaje para el integrador

- **Listas para publicar**: cup, erc, bng, eaj-pnv (SÓLIDAS, sin problemas).
- **Revisión de codificaciones-clave del contrapeso** (retiran el flag de extremo; si un
  revisor las mueve, el partido vuelve a insuficiente):
  erc `dr-001`=0 e bng `dr-001`=0 (banca pública como modelo mixto); bng `izq-003`=−2
  (frente organizado); eaj-pnv `soc-003`=+1 (ancla positiva del eje Y).
- **Codificaciones más débiles a auditar**: eaj-pnv `izq-039` (fuente terciaria) y `dem-008`;
  eh-bildu `lab-017` y `rel-002` (cita = título del programa, no pasaje verbatim).
- **junts y eh-bildu**: decisión editorial. Su eje Y es sólido; su eje X está bien
  documentado (5–6 grupos) pero el flag «extremo» es **materialmente correcto** (ambos
  viven en su polo económico sin postura moderadora verificable). Publicar como
  «insuficiente/perfil de polo» o mantener en cola según criterio editorial. No procede
  fabricar un 0 que no existe en la evidencia.
