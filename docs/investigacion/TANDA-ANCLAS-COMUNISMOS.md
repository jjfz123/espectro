# Tanda de datos — anclas de comunismos y tercera vía (fichas doctrinales)

Instrumentación de cuatro **anclas bloqueadas** del atlas (`estado: investigacion`,
`publicacionGeometrica: bloqueada-investigacion`) con **ficha doctrinal propia** en
`data/referencias/`: **marxismo-clasico**, **marxismo-ortodoxo**,
**comunismo-lujo-automatizado** y **tercera-via**. Método: por cada ancla se leyó su
entrada en `data/mapa-ideologias.json` (definición, encaje, preguntasDiscriminantes) y se
codificaron 8–9 posiciones sobre **ítems existentes** de `data/items/*.json`, con el valor
(−2..+2) tomado del **enunciado exacto del ítem** —nunca de las coordenadas del mapa, que son
hoja de pistas, jamás fuente— y una **justificación propia** con fuente y fecha por obra. La
vara de esta tanda es la **discriminación real**: cada ficha se separa, pregunta a pregunta,
de las ramas comunistas ya cartografiadas (marxismo-leninismo, trotskismo, luxemburguismo,
consejismo, bordiguismo, eurocomunismo…) y de las socialdemocracias vecinas.

No se tocó `data/mapa-ideologias.json`, ni `data/items/*`, ni coordenadas, ni brújula, ni el
candado/versión. Solo altas de referencias doctrinales. `npm run validate:data` en verde antes
de cada commit; un commit atómico por ficha.

## Base sincronizada

- Worktree reseteado a `git reset --hard 9ed70f1` (nace de `main`, base del encargo).
  Verificado `git log --oneline -1` → `9ed70f1` «Arregla hacia delante el sellado de §47…».
- Las cuatro fichas **no existían**: son altas nuevas. Tras la tanda,
  `data/referencias` pasa de 67 a 71 ficheros (68→71 referencias doctrinales computadas).

## Restricción de red (afecta a la calidad de la evidencia)

`WebFetch` devolvió **403** en todos los dominios usados —`marxists.org`, `en.wikipedia.org`,
`versobooks.com`, `library.fes.de`— por bloqueo del **proxy del entorno**, no de los servidores.
Conforme al método del encargo (WebFetch 403 → WebSearch ≥2 extractos), la verificación se hizo
con **extractos de buscador** (≥2 por fuente), **sin citas literales**: cada posición es
**fuente + justificación propia**, con calidad `media` (base textual canónica confirmada) o
`baja` (posición inferida del marco general). **Ninguna posición añade cita verbatim** ni usa el
campo `cita`; por eso **ninguna requiere `grupoEvidencia`**. `confianza: "estimada"` en las
cuatro: canónicas en contenido, pero con URLs que van **a cola humana** para confirmar ruta viva
y, si procede, ascender a `verificada`. Toda obra lleva `fecha` (Manifiesto 1848, Erfurt 1891,
FALC 2019, The Third Way 1998…).

## Resumen

| Ficha | Familia | Coords atlas (x,y) | Posiciones | reglaPublicacion {items, cob, umbral} | Sensib. | Commit |
|---|---|---:|---:|---|---|---|
| marxismo-clasico | comunismos | (−88, −55) | 9 | {5, 0.55, 84} | normal | `b63423b` |
| marxismo-ortodoxo | comunismos | (−83, 7) | 9 | {5, 0.55, 84} | normal | `9400ae2` |
| comunismo-lujo-automatizado | comunismos | (−98, 48) | 8 | {4, 0.5, 82} | normal | `e2be98a` |
| tercera-via | socialismos | (22, −6) | 9 | {5, 0.6, 85} | normal | `0ddb0c3` |

`reglaPublicacion` proporcional dentro de los rangos del encargo (items 3–6, cobertura 0.5–0.65,
umbral 80–88): umbral alto (82–85) porque son **troncos doctrinales amplios** y conviene exigir
afinidad combinada fuerte para evitar falsos positivos; `minimoItems` ≈ mitad de las posiciones.
Todas `sensibilidad: normal` (lectura del ancla en el mapa; ninguna es antipluralista ni violenta:
son tipos ideales democráticos o doctrinales, y el suelo de triple llave para sensibles no aplica).

---

## marxismo-clasico (Marx y Engels, 1848–1895) — comunismos

| Ítem | Valor | Calidad | Obra (fecha) |
|---|---:|---|---|
| izq-001 | +2 | media | Manifiesto (1848) |
| izq-002 | −1 | media | Manifiesto (1848) |
| izq-047 | +2 | media | Socialismo utópico y científico (1880) |
| izq-048 | −2 | media | Manifiesto / Socialismo utópico y científico (1880) |
| izq-016 | +2 | media | Manifiesto (1848) |
| lab-011 | +2 | media | Crítica del Programa de Gotha (1875) |
| izq-005 | +2 | baja | Manifiesto (1848) |
| izq-006 | −2 | media | Manifiesto (1848) |
| dem-017 | +1 | baja | La guerra civil en Francia (1871) |

**Facetas:** metodo-cambio, organizacion, economico, propiedad-mercado, poder-laboral,
internacionalismo. **izq-047=+2** es su ancla explícita (el «socialismo científico»).

**Qué la separa de sus vecinas concretas:**
- **Del leninismo-bolchevique / marxismo-leninismo-sovietico-estaliniano / bordiguismo /
  trotskismo** (todos **izq-002=+2**): la separa **izq-002=−1** — los comunistas no forman
  partido aparte ni dirigen a la clase desde una vanguardia (matiz, no −2: Marx no es antipartido).
- **Del marxismo-ortodoxo**: la separan **izq-001=+2** (ruptura revolucionaria frente al 0
  electoral de la ortodoxia), **dem-017=+1** (modelo Comuna frente a conquistar el parlamento) e
  **izq-016=+2** (expropiación sin indemnización frente al +1 ortodoxo).
- **De la socialdemocracia-clasica** (izq-001=−2, izq-002=−2): comparte el izq-002 negativo pero
  por **otra razón** (autoemancipación, no reformismo), y la separan **izq-001=+2** y **lab-011=+2**
  (propiedad y control, no distribución).
- **Del consejismo** (izq-002=−2, izq-003=+2): coincide en rechazar la vanguardia, pero **dem-017=+1
  (no +2)** e **izq-002=−1 (no −2)** marcan que Marx no absolutiza el antipartido consejista.

**Huecos declarados:** no se codificó el eje territorial ni el moral (el corpus 1848–1895 los
trata de forma no trasladable al banco actual). izq-005 en calidad baja (inferencia *a fortiori*
de la supresión del mercado; «sectores estratégicos» no es la formulación de Marx).

---

## marxismo-ortodoxo (II Internacional, Erfurt 1891) — comunismos

| Ítem | Valor | Calidad | Obra (fecha) |
|---|---:|---|---|
| izq-001 | 0 *(resolucionCero: modelo-mixto)* | media | La lucha de clases / Erfurt (1892) |
| dem-012 | +2 | media | La dictadura del proletariado (1918) |
| izq-019 | −2 | media | La dictadura del proletariado (1918) |
| dem-011 | −1 | baja | La dictadura del proletariado (1918) |
| izq-002 | −1 | media | La lucha de clases / Erfurt (1892) |
| izq-016 | +1 | baja | La lucha de clases / Erfurt (1892) |
| lab-011 | +2 | media | La lucha de clases / Erfurt (1892) |
| izq-047 | +2 | media | La lucha de clases / Erfurt (1892) |
| izq-048 | −2 | baja | La lucha de clases / Erfurt (1892) |

**Facetas:** metodo-cambio, institucionalismo, organizacion, economico, propiedad-mercado,
poder-laboral. **izq-001=0** es un **cero documentado** (modelo-mixto): objetivo revolucionario +
vía sufragista; ni ruptura insurreccional ni reforma gradual.

**Qué la separa de sus vecinas concretas:**
- **Del leninismo-bolchevique** (izq-002=+2, dem-011=+2): la separan **izq-002=−1** (partido de
  masas, no vanguardia), **dem-011=−1** (conquistar y reformar el parlamento, no sustituirlo por
  soviets), **dem-012=+2** (vía democrática) e **izq-001=0** (rechazo de la insurrección).
- **Del marxismo-clasico**: la separan **izq-001=0** (frente a +2), **izq-019=−2** (gestión
  parlamentaria frente a la Comuna) e **izq-016=+1** (frente a +2).
- **De la socialdemocracia-clasica** (izq-001=−2, reformismo puro): la separan **izq-001=0**
  (conserva el objetivo revolucionario), **izq-016=+1** (socialización de la propiedad) y
  **lab-011=+2** (no basta redistribuir).

**Huecos declarados:** dem-011 e izq-048 en baja (el «−1» de dem-011 pondera el afán
democratizador de Kautsky; izq-048 se infiere del determinismo, no de un pasaje directo). izq-016
en baja: la ambigüedad histórica del SPD sobre indemnización sostiene el +1, no un −2 ni un +2.

---

## comunismo-lujo-automatizado (Bastani, FALC 2019) — comunismos

| Ítem | Valor | Calidad | Obra (fecha) |
|---|---:|---|---|
| cul-015 | +2 | media | FALC (2019) |
| izq-045 | −2 | media | FALC (2019) |
| ene-011 | +2 | media | FALC (2019) |
| ene-009 | +1 | baja | FALC (2019) |
| lab-011 | +2 | media | FALC (2019) |
| izq-005 | +1 | media | FALC (2019) |
| sd-008 | +1 | baja | FALC (2019) |
| lib-017 | +1 | baja | FALC (2019) |

**Facetas:** ecologia, energia-nuclear, economico, propiedad-mercado, poder-laboral, social.
**cul-015=+2** es el **discriminante estrella** (aceleración tecnológica) frente al decrecimiento.

**Qué la separa de sus vecinas concretas:**
- **Del decrecimiento-democratico** (izq-045=+2, ene-011=−2, ene-010=+2): la separan **cul-015=+2**
  (aceleración; el decrecimiento puntúa −2), **izq-045=−2** (rechaza producir/consumir menos) y
  **ene-011=+2** (crecimiento con innovación). Eje ecomodernista invertido punto por punto.
- **Del ecosocialismo** (izq-045=+2, ene-011=−2, ene-001=−2 antinuclear): la separan **izq-045=−2**,
  **ene-011=+2** y **ene-009=+1** (I+D en nuclear avanzada frente al antinuclearismo ecosocialista).
- **Del comunismo socialconservador/rojipardo** (crítica al «posmodernismo», tipo PCTE / Frente
  Obrero, izq-051=+2): la separa **lib-017=+1** — la matriz cultural libertaria del «lujo»
  (autonomía corporal) frente al comunismo moralmente conservador. **lab-011=+2** la mantiene, con
  todo, en la familia comunista (propiedad y control, no redistribución).

**Huecos declarados y a cola humana:** **ene-009 (+1)** y **lib-017 (+1)** son inferencias del
marco (ecomodernismo tecnófilo → I+D energética avanzada; matriz libertaria → derechos de
autonomía personal), no pasajes literales del libro: calidad **baja**, a verificar. sd-008 en baja
(Bastani prefiere servicios universales a renta básica en metálico: +1, no +2).

---

## tercera-via (Giddens / Blair / Schröder, 1998) — socialismos

| Ítem | Valor | Calidad | Obra (fecha) |
|---|---:|---|---|
| eco-002 | +2 | media | The Third Way / PFI (1998) |
| sd-012 | −2 | media | Cláusula IV reescrita (1995) |
| sd-009 | +2 | media | The Third Way / New Deal (1998) |
| lab-001 | −1 | media | Blair-Schröder / Die Neue Mitte (1999) |
| eco-004 | +1 | media | Blair-Schröder / Die Neue Mitte (1999) |
| eco-001 | 0 *(resolucionCero: modelo-mixto)* | media | New Labour, política fiscal (1998) |
| eco-003 | +1 | media | New Labour, salario mínimo (1999) |
| izq-001 | −2 | media | The Third Way (1998) |
| soc-001 | +2 | baja | New Labour, reformas sociales (1998) |

**Facetas:** economico, propiedad-mercado, poder-laboral, metodo-cambio, social. **eco-001=0** es
un **cero documentado** (modelo-mixto): «ni vieja izquierda ni nueva derecha» hecho fiscalidad.

**Qué la separa de sus vecinas concretas:**
- **De la socialdemocracia-clasica** (eco-002=+1, lab-001=+2, eco-004=−1): la separan **eco-002=+2**
  (gestión privada eficiente), **sd-012=−2** (abandono de la nacionalización, Cláusula IV 1995),
  **eco-004=+1** (disciplina fiscal frente a la prioridad clásica del gasto) y **lab-001=−1**
  (flexibilidad laboral frente al laborismo fuerte). El vuelco **promercado** del encargo.
- **Del liberalismo social** (liberalismo-igualitario-rawlsiano / liberalismo-clasico): la separan
  **eco-003=+1** (salario mínimo legal, que el liberalismo económico rechaza) y **sd-009=+2**
  (activación *welfare-to-work* de raíz laborista); su **origen laborista** frente al liberalismo
  de derechos individuales. **izq-001=−2** la sitúa en la familia socialista reformista.
- **Del neoliberalismo-friedmaniano**: la separan **eco-001=0** (no rebaja los tipos altos),
  **eco-003=+1** (suelo salarial legal) y la financiación pública retenida bajo gestión mixta.

**Huecos declarados:** no se codificó el eje territorial/UE (no distintivo del tipo ideal). soc-001
en baja (progresismo social documentado del New Labour, pero como marco, no como programa
económico de la tercera vía).

---

## URLs a cola humana (verificar ruta viva; posible ascenso a `verificada`)

Todas devolvieron 403 a `WebFetch` por el proxy; confirmadas por ≥2 extractos de `WebSearch`.

- `https://www.marxists.org/espanol/m-e/1840s/48-manif.htm` — Manifiesto (1848), es.
- `https://www.marxists.org/espanol/m-e/1870s/gotha/gothai.htm` — Crítica del Programa de Gotha (1875), es.
- `https://www.marxists.org/espanol/m-e/1870s/gcfran/guer.htm` — La guerra civil en Francia (1871), es.
- `https://www.marxists.org/espanol/m-e/1880s/dsusc/` — Del socialismo utópico al científico (1880), es.
- `https://www.marxists.org/archive/kautsky/1892/erfurt/` — Kautsky, La lucha de clases / Erfurt (1892), en.
- `https://www.marxists.org/archive/kautsky/1918/dictprole/index.htm` — Kautsky, La dictadura del proletariado (1918), en.
- `https://en.wikipedia.org/wiki/Erfurt_Program` — Programa de Erfurt (1891), ficha.
- `https://www.versobooks.com/products/476-fully-automated-luxury-communism` — Bastani, FALC (2019), editor.
- `https://en.wikipedia.org/wiki/Fully_Automated_Luxury_Communism` — FALC (2019), ficha.
- `https://traficantes.net/libros/comunismo-de-lujo-totalmente-automatizado` — ed. española (2020).
- `https://en.wikipedia.org/wiki/Third_Way` — Giddens, The Third Way (1998), ficha.
- `https://library.fes.de/pdf-files/bueros/suedafrika/02828.pdf` — Blair-Schröder / Die Neue Mitte (1999).
- `https://en.wikipedia.org/wiki/Clause_IV` — Cláusula IV y su reescritura de 1995.
- `https://en.wikipedia.org/wiki/New_Labour` — New Labour (salario mínimo, fiscalidad, reformas sociales).

## Notas para el triaje del integrador

- Los ceros documentados (izq-001 en ortodoxo, eco-001 en tercera-via) usan `resolucionCero:
  modelo-mixto`; son posiciones sustantivas, no vacíos.
- Coincidencias entre fichas hermanas justificadas de forma independiente (p. ej. izq-002=−1 en
  clásico y en ortodoxo: en el clásico por «no forman partido aparte», en la ortodoxia por «partido
  de masas, no vanguardia»; lab-011=+2 en clásico, ortodoxo y FALC, cada uno con su fundamento).
- Instrumentación geométrica **no** activada: las anclas siguen `bloqueada-investigacion` en el
  mapa (fuera de mi ámbito). Estas fichas quedan documentadas y listas para que el integrador
  decida su desbloqueo y el ajuste de coordenadas motor↔atlas.
