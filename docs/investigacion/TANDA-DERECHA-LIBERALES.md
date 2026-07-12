# Tanda derecha-liberales — drenaje de huecos del campo LIBERAL

Encargo de datos. Objetivo: drenar los huecos eje-entidad del campo LIBERAL de la
matriz del propietario para **ciudadanos** (14 ejes), **p-lib** (12) y **pp** (6) =
32 huecos. Solo altas; no se modifica ningún valor existente. La matriz del
propietario se usó como hoja de pistas, nunca como fuente citable: cada valor
(−2..+2) se decidió por el enunciado exacto del ítem propio y la evidencia verificada.

## Base y condiciones de red

- **Base sincronizada: `70843d4`** (base fresca del encargo). El worktree se creó
  desde `c42e406`; siguiendo la corrección del integrador se hizo
  `git checkout 70843d4 -- data/partidos/{ciudadanos,p-lib,pp}.json` y un commit de
  sincronización antes de escribir. Así, ciudadanos partía de 20 posiciones (no 9) y
  pp de 49; p-lib era idéntico en ambas bases.
- **WebFetch bloqueado por política de egreso** (403 en p-lib.es, ciudadanos-cs.org,
  boe.es; elpais.com no accesible). No se rodeó el bloqueo. Toda la verificación se
  hizo con **WebSearch**, que devuelve resúmenes sintetizados/traducidos: útiles para
  confirmar dirección y magnitud y para localizar la fuente primaria real con fecha,
  **pero no dan pasaje verbatim citable**. Por eso, según el rúbrico del encargo,
  **ninguna alta lleva `cita` literal** y todas son «posición con fuente + justificación»
  de **calidad media o baja**. Fecha del documento de época en cada fuente (Cs: nunca
  2026; partidos activos: fecha real del documento).

## Recuento antes / después

| Entidad | Posiciones base (70843d4) | Altas | Después | Ejes-hueco | Cubiertos | Huecos declarados |
|---|---|---|---|---|---|---|
| ciudadanos | 20 | 8 | 28 | 14 | 9 | 5 |
| p-lib | 21 | 15 | 36 | 12 | 10 | 2 |
| pp | 49 | 6 | 55 | 6 | 6 | 0 |
| **Total** | | **29** | | **32** | **25** | **7** |

Ninguna alta lleva cita literal (columna «cita» = **no** en todas). Fetch bloqueado.

---

## CIUDADANOS (Cs) — 8 altas, 5 huecos

Partido inactivo tras 2024: fuentes con fecha de época (estrategia 2024-10-26;
europeas 2024-05). Confirmaciones de buscador: Cs se define de «liberalismo
reformista», por el «descrédito de los populismos», constitucionalista,
**aconfesional** («dejó de ser laico y se definió aconfesional, alineándose con la
Constitución»), europeísta y unionista.

| Ítem | Eje-hueco | Valor | Calidad | Cita | Fuente (fecha) |
|---|---|---|---|---|---|
| lab-002 | poder-laboral | −1 | baja | no | Estrategia Cs (2024-10-26) |
| lab-005 | autonomia-sindical | +1 | media | no | Estrategia Cs (2024-10-26) |
| pop-001 | populismo | −2 | media | no | Estrategia Cs (2024-10-26) |
| sd-013 | monarquia | −1 | baja | no | Estrategia Cs (2024-10-26) |
| rel-002 | libertad-conciencia | +2 | media | no | Estrategia Cs (2024-10-26) |
| dem-034 | modelo-territorial | −2 | media | no | Estrategia Cs (2024-10-26) |
| der-015 | internacionalismo **+ ecologia** | −2 | media | no | Programa europeas (2024-05) |
| izq-001 | metodo-cambio | −2 | media | no | Estrategia Cs (2024-10-26) |

Notas de decisión:
- **poder-laboral**: `lab-003` (dirección a la propiedad) está **retirado**; se usó su
  espejo activo `lab-002` (cogestión) con valor **−1** (Cs rechaza la cogestión).
- **monarquia**: `dr-008` (mantener monarquía) está **retirado**; se usó `sd-013`
  (referéndum monarquía/república) con **−1** (Cs constitucionalista se opone a
  reabrir la forma de Estado).
- **der-015 cubre dos ejes**: carga `internacionalismo` +0.5 y `ecologia` −0.5; el
  rechazo de Cs a abandonar la Agenda 2030 fija ambos (europeísta, pro-marcos
  internacionales, transición verde compatible con competitividad).

Huecos declarados (5):
- **estatismo**: la propia pista es 0 (centro/mixto, magnitud estimativa); sin ítem
  activo que la evidencia sostenga sin forzar.
- **libertades-civiles**: los ítems activos del eje miden protesta/identificación
  policial/videovigilancia, donde el registro de Cs es **mixto** (apoyó medidas de
  seguridad y a la vez criticó parte de la Ley Mordaza); la evidencia limpia de la
  pista (separación de poderes) ya está capturada en `dem-008` (existente).
- **laicismo**: `fem-008` (religión fuera del horario lectivo) está **retirado**; sin
  otro ítem activo con evidencia Cs limpia (aconfesionalidad ya cubierta por rel-002
  en libertad-conciencia).
- **animalismo**: evidencia solo inferida («diversidad y libertades civiles»); Cs
  apoyó el bienestar animal (seres sintientes) pero no «animales como sujetos de
  derechos»; sin fuente limpia.
- **energia-nuclear**: pista explícitamente «inferida de su liberalismo tecnocrático»;
  el ítem de transición nuclear `va-005` está **retirado** y no hay declaración Cs
  limpia sobre nuclear.

---

## PARTIDO LIBERTARIO (P-LIB) — 15 altas, 2 huecos

Minarquista. Fuentes: PPM vigente (2025-12), «Federalismo libertario» (2023-11-16),
«Reflexión libertaria sobre la migración» (2025-02-10). Buscador confirma:
separación de poderes (jueces fuera de los partidos), referéndum + ampliación de la
ILP, legalización de todas las drogas, aborto = libertad de la mujer sin coacción,
derechos sin distinción de orientación sexual, libre circulación como derecho
inherente, federalismo descentralizado, negociación individual/primacía de empresa.

| Ítem | Eje-hueco | Valor | Calidad | Cita | Fuente (fecha) |
|---|---|---|---|---|---|
| lab-002 | poder-laboral | −2 | media | no | PPM (2025-12) |
| lab-001 | poder-laboral | −2 | media | no | PPM (2025-12) |
| dem-012 | institucionalismo | +2 | media | no | PPM (2025-12) |
| dem-029 | democracia-directa | +2 | media | no | PPM (2025-12) |
| dem-001 | democracia-directa | +1 | media | no | PPM (2025-12) |
| dem-008 | pluralismo-institucional | +2 | media | no | PPM (2025-12) |
| dem-021 | libertades-civiles | +2 | media | no | PPM (2025-12) |
| dem-023 | libertades-civiles | −2 | baja | no | PPM (2025-12) |
| lib-010 | tradicion-moral | +2 | media | no | PPM (2025-12) |
| der-007 | tradicion-moral | −2 | media | no | PPM (2025-12) |
| der-003 | tradicion-moral | +2 | media | no | PPM (2025-12) |
| dr-021 | territorial **+ modelo-territorial** | −2 | media | no | Federalismo libertario (2023-11-16) |
| dem-034 | modelo-territorial | +1 | baja | no | Federalismo libertario (2023-11-16) |
| izq-046 | internacionalismo | +2 | media | no | Reflexión migración (2025-02-10) |
| izq-001 | metodo-cambio | −2 | media | no | PPM (2025-12) |

Notas:
- **poder-laboral (2 ítems)**: `lab-003` retirado → espejo `lab-002` (cogestión) −2;
  más `lab-001` (convenio sectorial prevalece) −2 (defiende negociación individual y
  primacía de empresa). Aspectos distintos, no el mismo pasaje.
- **democracia-directa (2 ítems)**: `dem-029` (ampliación ILP) +2 y `dem-001`
  (referéndum) +1 — dos mecanismos nombrados por separado en el programa.
- **tradicion-moral (3 ítems, tope)**: drogas (lib-010 +2), aborto (der-007 −2), LGTB
  (der-003 +2). Temas distintos, todos confirmados por buscador.
- **dr-021 cubre territorial y modelo-territorial** (carga en ambos): rechaza el
  Estado unitario. `dem-034` añade el matiz confederal-voluntario (baja: «territorios
  soberanos» sobreestima algo su federalismo; el propietario situaba el polo en
  «pacto confederal»).

Huecos declarados (2):
- **populismo**: la pista −30 se deriva de la **misma** evidencia de separación de
  poderes/pluralismo ya usada; no hay declaración de populismo distinta, y reutilizar
  el pasaje violaría «un mismo pasaje no sostiene dos posiciones». Hueco honesto.
- **organizacion**: sin fuente limpia sobre la democracia interna estatutaria del
  partido (la pista es estimativa); no se fuerza.

---

## PARTIDO POPULAR (PP) — 6 altas, 0 huecos

Fuentes: Ponencia Política 21.º Congreso (2025-06); Ley de Seguridad Ciudadana
(pp.es); El País ideario (2025-07-06) y claves programa (2023-07-04).

| Ítem | Eje-hueco | Valor | Calidad | Cita | Fuente (fecha) |
|---|---|---|---|---|---|
| lab-002 | poder-laboral | −1 | baja | no | El País, claves programa PP (2023-07-04) |
| dem-023 | libertades-civiles | +1 | media | no | Ley Seguridad Ciudadana, pp.es (2015) |
| pop-001 | populismo | −1 | baja | no | Ponencia Política PP (2025-06) |
| der-020 | monarquia | +2 | media | no | Ponencia Política PP (2025-06) |
| rel-001 | libertad-conciencia | −2 | baja | no | El País, ideario PP (2025-07-06) |
| izq-001 | metodo-cambio | −2 | media | no | Ponencia Política PP (2025-06) |

Notas:
- **poder-laboral**: `lab-003` retirado → `lab-002` (cogestión) −1 (dirección a la
  propiedad; acepta diálogo social, por eso no −2).
- **monarquia**: `dr-008` retirado → `der-020` (inviolabilidad del Rey) +2 (la
  Ponencia sitúa la monarquía como pilar; el PP no respalda acotar la inviolabilidad).
- **libertades-civiles**: `dem-023` +1 — el PP impulsó y defiende la Ley de Seguridad
  Ciudadana (identificación preventiva); inclinación a potestades amplias, sin el máximo.
- **populismo −1 (baja)**: PP institucional/de gobierno; matiz honesto: usa retórica
  anti-Gobierno, por eso −1 y no −2. Confianza baja.
- **libertad-conciencia**: `rel-001` −2 — el PP democristiano rechaza que el Estado
  promueva el ateísmo y excluya la religión de la vida pública (laicidad de cooperación).

---

## Banderas sobre valores existentes (no tocados; para el integrador)

1. **Cs `economico` = 100 con 4 posiciones, todas ±2** (aviso de sesgo evidencia-bandera
   del validador, **preexistente en la base**, no introducido por esta tanda: eco-009,
   eco-010, lib-008, lib-020, todas +2). Convendría buscar posiciones económicas
   moderadoras documentables de Cs (p. ej. aceptación de sanidad/pensiones públicas)
   para que el eje no quede pegado al polo por solo codificar banderas liberales.
2. Ningún otro valor existente parece erróneo tras revisión; las dobles lecturas del PP
   (nuc-001, fem-001, etc.) están correctamente separadas de la capa base.

## Cola de URLs para verificación humana

Fuentes nuevas usadas (WebFetch estaba bloqueado; el integrador debería intentar el
verbatim y ascender calidad si procede):

- Cs — Estrategia (2024-10-26): https://www.ciudadanos-cs.org/estrategia
- Cs — Programa europeas (2024-05): https://www.ciudadanos-cs.org/var/public/documentos/2024-05/programa-electoral-9j-europeas.pdf
- P-LIB — PPM vigente (2025-12): https://www.p-lib.es/wp-content/uploads/2025/12/PPM-vigente.pdf
- P-LIB — Federalismo libertario (2023-11-16): https://www.p-lib.es/2023/11/16/federalismo-libertario/
- P-LIB — Reflexión migración (2025-02-10): https://www.p-lib.es/2025/02/10/reflexion-libertaria-sobre-la-migracion-y-sus-efectos-en-la-sociedad
- P-LIB — (fuente alternativa aborto, der-007): https://www.p-lib.es/derechos-y-libertades/sobre-la-reforma-de-la-ley-del-aborto
- P-LIB — (fuente alternativa drogas, lib-010): documento de legalización del cannabis y otras drogas / «80 propuestas» en https://www.p-lib.es/documentos/
- PP — Ponencia Política 21.º Congreso (2025-06): https://www.pp.es/storage/2025/06/21_Congreso_Ponencia_Politica.pdf
- PP — Ley de Seguridad Ciudadana (pp.es): https://www.pp.es/actualidad-noticia/ley-seguridad-ciudadana-amplia-las-garantias-ciudadanos · **flag de fecha**: se fechó «2015» por la época de la LO 4/2015; la fecha exacta de la página no se pudo verificar (fetch bloqueado).
- PP — El País, nuevo ideario (2025-07-06): https://elpais.com/espana/2025-07-06/el-nuevo-ideario-del-pp-endurecimiento-sobre-inmigracion-sin-rastro-del-aborto-y-defensa-de-la-libertad-de-prensa-o-la-tauromaquia.html
- PP — El País, claves programa 2023 (2023-07-04): https://elpais.com/espana/elecciones-generales/2023-07-04/las-claves-del-programa-del-pp-rebaja-fiscal-una-selectividad-unica-y-vuelta-al-pasado-en-la-politica-medioambiental.html

## Salida de las dos puertas

- `npm run validate:data` → **verde**: «✓ Datos válidos (instrumento v4, corte
  2026-07-11)…». Avisos no bloqueantes: cobertura del atlas (preexistente) y sesgo
  evidencia-bandera (incluye el de Cs económico, preexistente, ver banderas).
- `npm run validate:evidence-groups` → **verde**: «✓ Todos los pasajes citados
  conservan un grupo de evidencia canónico». No se ejecutó `--write` porque esta tanda
  **no añade ninguna cita** (sin verbatim), luego no crea ni altera grupos de evidencia.

## Método de valor (recordatorio)

No se tocaron coordenadas ni brújula: solo posiciones por ítem (−2..+2 = grado de
acuerdo con el enunciado exacto). La geometría la deriva el motor a partir de las
cargas de eje del ítem. Las puntuaciones −100..100 de la matriz del propietario nunca
se copiaron; sirvieron solo de puntero.
