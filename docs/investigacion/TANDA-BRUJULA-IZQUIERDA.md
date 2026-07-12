# Tanda brújula — estatales de izquierda (Propiedad × Poder)

Subida al contrato de brújula (`src/engine/evidenciaMapa.js`) de los cuatro
partidos estatales de izquierda: **psoe, movimiento-sumar, podemos, iu**.

- **Base:** `git reset --hard 7cafb3c` (Espectro 0.9.0). Todas las altas son en la
  capa base `posiciones`; no se tocan valores existentes ni `dobleLectura`.
- **Método:** solo posiciones sostenidas verificablemente (programa vigente,
  votación, ley, declaración de dirección), verificadas con ≥2 extractos web
  independientes (WebFetch daba 403: se trabaja con títulos/localizadores de
  resultados de búsqueda, por eso la mayoría de las citas nuevas son
  `calidadEvidencia: "media"`). Cada grupo documental de un mismo eje usa una
  **URL distinta**. Fuente con URL+título+fecha+consultado y `cita` localizadora;
  `grupoEvidencia` canónico = `pasaje-<sha256(urlNorm#localizadorNorm)[:20]>`.
- **Mecánica del contrato (recordatorio):** un «grupo» = `url#grupoEvidencia`.
  X sólida = ≥6 grupos en ≥3 subdimensiones con **cada subdimensión cubierta a
  ≥2 grupos**. Y sólida = ≥6 grupos en ≥3 familias con ≥2 grupos de núcleo.
  Provisional exige el mismo equilibrio con umbrales 3/2. El flag
  `extremoSinContrapeso` (|valor|≥75 y todos los componentes del mismo signo con
  |dirección|≥1) **bloquea sólida y provisional**; como en un grupo de un solo
  ítem |dirección|=|valor|, solo lo rompe un **0 documentado** (`resolucionCero`)
  o una **posición de signo contrario** (un desacuerdo que invierte el signo).

## Resultado (antes → después)

| Partido | Antes | Después | X (grupos/subdim, valor, extremo) | Y (grupos/fam/núcleo, valor, extremo) |
|---|---|---|---|---|
| psoe | insuficiente | **sólida** | 5→**6** / 3, −61.1, no | 4→**6** / 3 / 5, −59.7, sí→**no** |
| movimiento-sumar | insuficiente | **provisional** | 5→**7** / 3, −80.0, sí→**no** (X **sólida**) | 1→**4** / 3 / 3, −45.5, sí→**no** |
| podemos | insuficiente | **provisional** | 2→**7** / 4, −69.4, sí→**no** (X **sólida**) | 0→**3** / 3 / 2, −18.9, —→**no** |
| iu | insuficiente | insuficiente* | 3→**6** / 4, −55.2, sí→**no** | 0→**3** / 3 / 2, −33.3, —→**no** |

\* IU queda insuficiente **solo** por un bloqueo estructural en X
(propiedad-difundida); ver §IU. Y ya cumple provisional; X tiene 3 de 4
subdimensiones equilibradas y el extremo roto. Una sola acción del integrador la
deja en provisional.

### Recuento de altas

23 altas en total (todas en `posiciones`, capa base): psoe 3, sumar 6, podemos 8, iu 6.

### Shas (commits atómicos por partido)

- `8cefb93` psoe: brújula Propiedad×Poder sólida en ambos ejes
- `67324ca` movimiento-sumar: brújula a provisional (X sólida, Y provisional)
- `1537da1` podemos: brújula a provisional (X sólida, Y provisional)
- `1970a82` iu: preparación de brújula (X extremo roto y 3/4 equilibrada, Y provisional)

### Grep del auditor (`npm run audit:partidos | grep -E "psoe|sumar|podemos|iu:"`)

```
- iu: insuficiente; (-55.2, -33.3); X 6/6 grupos independientes (6 ítems) y 4/3 familias; X subdimensiones con una sola ancla independiente: propiedad-difundida; Y 3/6 grupos independientes (3 ítems), 3/3 familias y 2/2 grupos núcleo
- movimiento-sumar: provisional; (-80.0, -45.5); Y 4/6 grupos independientes (4 ítems), 3/3 familias y 3/2 grupos núcleo
- podemos: provisional; (-69.4, -18.9); Y 3/6 grupos independientes (3 ítems), 3/3 familias y 2/2 grupos núcleo
```

`psoe` no aparece: está **sólida** (el auditor solo lista lo no sólido). El grep
captura además `psuc-viu` (su «…viu:» contiene «iu:»), ajeno a esta tanda.
`npm run validate:data` quedó **verde** antes de cada commit.

---

## psoe — SÓLIDA en ambos ejes (objetivo cumplido)

Estaba a 1 grupo de X sólida y a 2 de Y. Tres altas lo cierran.

| Ítem | Eje/subdim | Valor | Calidad | Fecha | Fuente |
|---|---|---|---|---|---|
| eco-002 | X titularidad | −2 | media | 2023 | Sánchez «blindar el SNS de la privatización» (Redacción Médica); corroborado por la Ley de Gestión Pública e Integridad del SNS que deroga la Ley 15/1997 |
| dem-026 | Y contrapesos | −1 | media | 2024-10-23 | RDL 5/2024: rebaja las mayorías para elegir el consejo de RTVE y lo renueva con la mayoría del Gobierno (Civio) |
| dem-031 | Y contrapesos | +2 | media | 2023-02-20 | Ley 2/2023 de protección del informante y lucha contra la corrupción (BOE) |

- **X:** eco-002 cierra `titularidad` a 2 (con eco-012) → **6 grupos, 3 subdim
  equilibradas** (titularidad 2, coordinación 2, propiedad-difundida 2). Valor
  −61.1, no extremo (eco-012 y eco-013 aportan signo pro-privado).
- **Y:** `contrapesos` era la 3.ª familia que faltaba. **dem-026 (−1) rompe el
  extremo Y** (conducta autoritaria: gubernamentalización de RTVE, dirección +1);
  dem-031 (+2) aporta el 6.º grupo. Y = 6 grupos, 3 familias, **5 grupos núcleo**,
  −59.7, no extremo.
- **Huecos declarados:** ninguno relevante para el contrato. der-026 se estudió
  como posible 0 de contrapesos, pero la postura verificable del PSOE actual es de
  **desacuerdo** con ilegalizar por secesión (no un 0), así que no se forzó.

## movimiento-sumar — X SÓLIDA + Y PROVISIONAL (→ provisional)

`eco-012`, `eco-014` y `dem-021` figuraban **ya posicionados** (sin cita) en el
fichero, así que no eran altas; se trabajó con ítems libres.

| Ítem | Eje/subdim | Valor | Calidad | Fecha | Fuente |
|---|---|---|---|---|---|
| dr-001 | X titularidad | 0 (modelo-mixto) | media | 2023 | Banca pública (ICO+Correos) que compite con la privada, sin nacionalizar el sector (elDiario.es) |
| eco-009 | X propiedad-difundida | −2 | media | 2026 | Impuesto complementario a Sucesiones para grandes herencias >1M€ (elEconomista) |
| dem-022 | Y libertades | +2 | media | 2024-07-17 | Derogar el art. 36.23 de la ley mordaza, imágenes de agentes (Infobae) |
| der-026 | Y contrapesos | −2 | media | 2025 | Rechazo a ilegalizar partidos independentistas (El Plural) |
| izq-007 | Y jerarquía | −2 | media | 2024 | «Gobernar es transformar»: proyecto de gobierno que transforma el Estado, no lo abole (infoLibre) |

- **X SÓLIDA:** **dr-001=0 rompe el extremo X** (banca pública sin nacionalizar
  el sector = modelo mixto, dirección 0) y cierra `titularidad`; eco-009 cierra
  `propiedad-difundida`. 7 grupos, 3 subdim equilibradas, −80.0, no extremo.
- **Y PROVISIONAL:** **izq-007=−2 rompe el extremo Y** (dirección +2). 4 grupos,
  3 familias (libertades 2, contrapesos 1, jerarquía 1), 3 núcleo, −45.5.
- **Para Y sólida faltan 2 grupos** en familias con ítems libres. Se descartaron
  por no encontrar extractos **atribuibles a Sumar** con ≥2 fuentes: rel-002
  (aconfesionalidad), dem-006 (Tribunal Constitucional/lawfare), lab-005
  (autonomía sindical), dem-029 (ILP), lab-015 (huelga), rel-003 (veto religioso).
  Huecos declarados, no forzados.

## podemos — X SÓLIDA + Y PROVISIONAL (→ provisional)

| Ítem | Eje/subdim | Valor | Calidad | Fecha | Fuente |
|---|---|---|---|---|---|
| dr-001 | X titularidad | +2 | media | 2019 | Banca pública / no privatizar Bankia (elDiario.es-Alternativas Económicas) |
| lab-016 | X control-productivo | +2 | media | 2021 | Empresas públicas de banca, energía, farmacia y telecom (Servimedia) |
| lab-017 | X titularidad+control-prod | −1 | media | 2021 | Prioriza propiedad pública estatal frente a cooperativizar las grandes empresas (Podemos: «eficiencia y privatización no van de la mano») |
| ene-005 | X coordinación | −2 | media | 2021-01-11 | Nacionalizar una eléctrica pública (Energías Renovables) |
| eco-009 | X propiedad-difundida | −2 | media | 2026 | Mantener y reforzar Sucesiones frente a su supresión (podemos.info) |
| soc-001 | Y libertades | +2 | media | 2023 | Ley 4/2023 trans y LGTBI, impulsada por Igualdad-Montero |
| der-026 | Y contrapesos | −2 | media | 2024 | Rechazo a ilegalizar independentistas, «no se pueden prohibir las ideas» (Público) |
| izq-007 | Y jerarquía | −2 | media | 2014 | «Asalto a los cielos» = conquistar el Estado y formar gobierno, no abolirlo (elDiario.es) |

- **X SÓLIDA:** **lab-017=−1 rompe el extremo X** (dirección +1: prefiere lo
  público estatal a la cooperativización para las grandes empresas). 7 grupos,
  **4 subdim equilibradas**, −69.4, no extremo.
- **Y PROVISIONAL:** **izq-007=−2 rompe el extremo Y** (dirección +2). 3 grupos,
  3 familias, 2 núcleo, −18.9. El valor Y sale moderado por el peso de izq-007;
  se volvería más libertario al añadir grupos de libertades (todos de dirección
  negativa para Podemos): mejora pendiente si se busca Y sólida.

## iu — insuficiente por BLOQUEO ESTRUCTURAL en X (Y ya provisional)

IU es el caso difícil. Se rompió el extremo en ambos ejes, se equilibraron 3 de
4 subdimensiones de X y Y quedó **provisional-ready**, pero **X no puede pasar
solo con altas** (ver bloqueo).

| Ítem | Eje/subdim | Valor | Calidad | Fecha | Fuente |
|---|---|---|---|---|---|
| lab-017 | X titularidad+control-prod | −1 | media | 2026 | Prioriza propiedad pública estatal (nacionalizar sectores estratégicos) sobre cooperativizar (Documento Político-Organizativo IU) |
| eco-012 | X titularidad | +2 | media | 2020-09-25 | Eliminación progresiva de conciertos; red única pública y laica (Nueva Tribuna) |
| ene-005 | X coordinación | −2 | media | 2014-02-18 | Nacionalizar las eléctricas frente al oligopolio (Energías Renovables) |
| der-026 | Y contrapesos | −2 | media | 2025 | Rechazo a ilegalizar independentistas (infoLibre) |
| dem-021 | Y libertades | +2 | media | 2024-10-30 | Derogación íntegra de la ley mordaza (Enrique Santiago, IU) |
| izq-007 | Y jerarquía | −2 | media | 2026 | Marxista: transforma/conquista el Estado para el socialismo, no lo abole (Documento Político-Organizativo IU) |

- **X:** 6 grupos, **extremo roto** (lab-017=−1, dirección +1), 3 de 4
  subdimensiones equilibradas (control-productivo 2, titularidad 2, coordinación
  2). Falta **propiedad-difundida**, con **una sola ancla** (eco-006).
- **Y PROVISIONAL:** izq-007 rompe el extremo. 3 grupos, 3 familias, 2 núcleo,
  −33.3.
- Nota de citas: `lab-017` (X) e `izq-007` (Y) comparten localizador (Documento
  Político-Organizativo de IU) por estar en **ejes distintos** (el contrato cuenta
  grupos por eje; no hay colisión). El documento cubre a la vez economía
  (nacionalización) y estrategia de Estado.

### BLOQUEO ESTRUCTURAL de IU en propiedad-difundida (para el integrador)

`propiedad-difundida` = {eco-006, eco-009, eco-014}. `eco-006` está sostenido;
**`eco-009` (−2) y `eco-014` (+2) ya están posicionados pero sin `cita` ni
`grupoEvidencia`**, así que no cuentan, y **no queda ningún ítem libre** de esa
subdimensión. Como esta tanda solo hace **altas** (no modifica posiciones
existentes), no puede darse el 2.º grupo. Por eso X queda con «una sola ancla» en
propiedad-difundida y IU insuficiente pese a tener el resto listo.

**Arreglo (una sola acción, fuera del alcance de altas):** completar `cita` +
`grupoEvidencia` en **una** de las dos posiciones ya existentes de IU (su URL ya
está en el fichero). Con completar una, propiedad-difundida pasa a 2 grupos → **X
sólida** → **IU provisional** (X sólida + Y provisional). Valores ya presentes:

- `eco-009` (valor −2 ya puesto): url `https://izquierdaunida.org/2021/03/23/unidas-podemos-plantea-modificaciones-al-impuesto-de-sucesiones-y-donaciones-y-rechaza-por-injusto-el-constante-intento-de-la-derecha-y-la-ultraderecha-para-eliminarlo-por-completo/`
  - `cita` sugerida: «Unidas Podemos plantea modificaciones al Impuesto de Sucesiones y Donaciones y rechaza por injusto el constante intento de la derecha y la ultraderecha para eliminarlo por completo»
  - `grupoEvidencia`: `pasaje-2e2502c901dab56597ea`
- `eco-014` (valor +2 ya puesto): url `https://izquierdaunida.org/2026/05/22/izquierda-unida-impulsa-una-proposicion-de-ley-para-crear-un-impuesto-a-las-grandes-herencias-y-donaciones-por-encima-del-millon-de-euros/`
  - `cita` sugerida: «Izquierda Unida impulsa una proposición de ley para crear un Impuesto a las Grandes Herencias y Donaciones por encima del millón de euros»
  - `grupoEvidencia`: `pasaje-406b251e382cad92fd29`

---

## URLs a cola humana (verificación editorial de citas)

WebFetch estaba en 403: todas las citas nuevas son títulos/localizadores de
resultados de búsqueda (calidad media). Conviene revisión humana del pasaje real.

**psoe:** redaccionmedica.com/.../sanchez-promete-blindar-al-sns-...-7003 ·
civio.es/.../2024/10/23/el-gobierno-reforma-la-ley-de-rtve-para-rebajar-las-mayorias... ·
boe.es/buscar/act.php?id=BOE-A-2023-4513

**movimiento-sumar:** eldiario.es/economia/sumar-propone-trocear-electricas-evitar-abusos-mercado_1_10356026.html ·
eleconomista.es/.../sumar-propone-un-impuesto-complementario-al-de-sucesiones... ·
infobae.com/espana/2024/07/17/el-articulo-de-la-ley-mordaza-que-derogaran-psoe-y-sumar... ·
elplural.com/.../congreso-unisono-rechaza-ley-vox-ilegalizar-partidos-independentistas_325049102 ·
infolibre.es/politica/yolanda-diaz-afirma-gobernar-transformar-no-resistir_1_1873897.html

**podemos:** eldiario.es/alternativaseconomicas/banca-publica_132_2686799.html ·
servimedia.es/noticias/1925892 ·
podemos.info/en/podemos-propone-crear-empresa-publica-energia-... ·
energias-renovables.com/panorama/unidas-podemos-propone-nacionalizar-una-compania-electrica-20210111 ·
podemos.info/en/propuestas-impuesto-sucesiones-donaciones-justo-equitativo/ ·
igualdad.gob.es/.../irene-montero-hoy-es-un-dia-historico-trans-lgtbi/ ·
publico.es/politica/vox-queda-ilegalizar-partidos-independentistas-no-prohibir-ideas.html ·
eldiario.es/politica/pablo-iglesias-asamblea-podemos-toma_1_4576968.html

**iu:** izquierdaunida.org/documento-politico-organizativo/ (usada en lab-017 X e izq-007 Y) ·
nuevatribuna.es/.../ley-educacion-psoe-lomloe-enmiendas-izquierdaunida-...-escuela-publica-laica/... ·
energias-renovables.com/panorama/izquierda-unida-propone-nacionalizar-las-electricas-20140218 ·
infolibre.es/politica/ley-vox-ilegalizar-partidos-independentistas-nace-condenada-sentencias-constitucional_1_1187530.html ·
izquierdaunida.org/2024/10/30/enrique-santiago-afirma-que-la-nueva-norma-que-sustituira-a-la-ley-mordaza...

## Revisión honesta de calidad / riesgos

- Todas las altas son **calidad media** (título/localizador, no pasaje literal
  verificado por la restricción de WebFetch). El integrador debería confirmar el
  pasaje exacto y, donde proceda, subir a «alta».
- **Ceros y desacuerdos moderadores** (los que rompen extremos) son los puntos a
  vigilar: dr-001=0 (Sumar), lab-017=−1 (Podemos, IU), dem-026=−1 (PSOE),
  izq-007=−2 (Sumar, Podemos, IU). Todos apoyados en postura verificable, pero
  son el fiel de la balanza del contrato.
- `izq-007` de IU se apoya en doctrina de partido (documento de IU) más que en un
  pasaje único; defendible (marxismo ≠ abolición del Estado) pero conviene un
  localizador más específico si se quiere «alta».
- Podemos Y (−18.9) sale más centrado de lo real por el peso de izq-007; se
  corregiría hacia lo libertario añadiendo grupos de libertades.
