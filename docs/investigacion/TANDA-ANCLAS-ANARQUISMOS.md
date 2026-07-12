# Tanda de anclas — anarquismos (anarcoprimitivismo y egoísmo anarquista)

**Fecha:** 12 de julio de 2026
**Base del worktree:** `9ed70f1` (sincronizada por `git reset --hard`; instrumento v4, corte 2026-07-11).
**Alcance:** crear las FICHAS de las dos anclas bloqueadas de la familia `anarquismos` que el dosier `docs/investigacion/MATRIZ-ANARQUISMOS.md` dictaminó como ficha propia:
`anarcoprimitivismo` (§9b/11: ficha nueva, bloqueada por ítem) y `egoismo-anarquista` (§3-6b + §5.4: faceta-borde ascendida a ficha por su discriminante moral y de propiedad).
**Aislamiento:** solo `cwd`; sin `git config`; sin `push`; commits atómicos por ficha. Ficheros tocados: EXCLUSIVAMENTE `data/referencias/anarcoprimitivismo.json`, `data/referencias/egoismo-anarquista.json` y este informe. No se tocó `mapa-ideologias.json`, ítems, TODO, candado, versión, tests ni web.
**Puertas:** `npm run validate:data` en verde antes de cada commit (68 → 69 referencias doctrinales; sin errores).

> **Método de evidencia (heredado del dosier).** El egress externo está bloqueado (WebFetch 403). Las posiciones se fijan por **dirección doctrinal + fuente**, SIN cita literal, con `calidadEvidencia` **media/baja**; los pasajes verbatim quedan en la **cola de verificación humana**, no se inventan ni se transcriben resúmenes de buscador como citas. Cada dirección doctrinal se contrastó con ≥2 extractos de `WebSearch` (Zerzan: agricultura/domesticación/técnica como origen de la dominación, superioridad cazadora-recolectora; Stirner: propiedad como poder y «ficción legal» no derecho, «unión de egoístas» disoluble, rechazo de «lo sagrado»/espectros, hostilidad radical yo-Estado). Fechas por obra original: Zerzan 1994, Stirner 1845.

---

## Ficha A — `anarcoprimitivismo`

Fichero: `data/referencias/anarcoprimitivismo.json`. `confianza: estimada`, `version: 1.0`, `sensibilidad: normal`, `facetasDefinitorias: [ecologia]`, `reglaPublicacion: {minimoItems 4, minimoCobertura 0.6, umbralAfinidad 85}`. Commit `0697dc5`.

Discrimina en **una** dimensión y en su extremo: tecnológico-ecológico. No reduce (decrecimiento) ni racionaliza (ecología social) la técnica industrial: la desmantela. Corpus: John Zerzan, *Futuro primitivo* (1994, ed. esp.).

### Posiciones (7)

| Ítem | Valor | Calidad | Fecha fuente | Dirección |
|---|---|---|---|---|
| ene-010 (reducir producción/consumo por límites ecológicos) | **+2** | media | 1994 | Reducir es un piso, no un techo. |
| ene-011 (crecimiento verde por innovación) | **−2** | media | 1994 | La técnica no es neutral: es el núcleo de la dominación. |
| va-016 (autorizar transgénicos y edición genética) | **−2** | media | 1994 | Culminación de la domesticación de lo vivo. |
| va-008 (innovación y mercado lideran el clima) | **−2** | media | 1994 | Huida hacia adelante tecnológica denunciada. |
| va-006 (proteger paisaje puede frenar eólica y solar) | **+2** | **baja** | 1994 | Incluso lo «verde» es industria a gran escala (inferido). |
| izq-045 (producir/consumir menos, renunciar al crecimiento) | **+2** | media | 1994 | Coincide en dirección; su horizonte la desborda. |
| **va-019 (desmontar la sociedad industrial y su tecnología)** | **+2** | media | 1994 | **Rasgo definitorio**: el ítem-llave que la separa del decrecimiento. |

### Huecos declarados
- **Verbatim (todas las posiciones):** ningún pasaje literal; egress bloqueado → cola humana. Prioridad de cotejo: va-019, ene-011, va-016 (los tres discriminantes fuertes).
- **va-006 (baja):** posición inferida de la crítica de la técnica; Zerzan no discute parques eólicos/solares concretos. Cotejar o degradar.
- **Género y religión: SILENCIO deliberado, no cero.** Zerzan liga domesticación→patriarcado y critica lenguaje/tiempo/religión como alienación, pero esas tesis exigen pasaje explícito. Son **futuras anclas** (fem-*, rel-*), no huecos a rellenar por deducción ahora.
- **Violencia:** rama insurreccional/sabotaje con Zerzan ambiguo; sin ítem-posición (silencio). El ilegalismo NO es identidad de esta ficha.

### URLs a cola de verificación humana
- `https://www.solidaridadobrera.org/ateneo_nacho/libros/John%20Zerzan%20-%20Futuro%20Primitivo.pdf` (ed. esp., texto completo; localizada viva por WebSearch, sin verbatim extraído aquí).
- `https://es.anarchistlibraries.net/library/john-zerzan-futuro-primitivo` (The Anarchist Library, ed. esp.).
- `https://archive.org/details/futuro-primitivo-y-otros-ensayos-john-zerzan_202410` (edición española escaneada; objetivo del dosier §6).

### Preguntas discriminantes recomendadas para el mapa (integrador)
El mapa lista hoy `ene-010, va-016, ene-011`. Recomiendo **incorporar `va-019`** como discriminante principal (es el ítem que el propietario exigía para desbloquear la ficha; sin él, primitivismo ≡ decrecimiento):
1. **va-019** — desmantelar la civilización industrial (+2 primitivismo vs −1/0 decrecimiento/ecología social). *El discriminante decisivo.*
2. **ene-011** — crecimiento verde por innovación (−2 vs +1/+2 tecno-optimistas).
3. **va-006** — paisaje frena renovables (+2 vs −1 izquierda productivista).

---

## Ficha B — `egoismo-anarquista`

Fichero: `data/referencias/egoismo-anarquista.json`. `confianza: estimada`, `version: 1.0`, `sensibilidad: normal`, `facetasDefinitorias: [libertad-conciencia, laicismo, estatismo, organizacion]`, `reglaPublicacion: {minimoItems 3, minimoCobertura 0.5, umbralAfinidad 82}`. Commit `56315fd`.

Discrimina en dos frentes acotados: **rechazo de todo lo «sagrado»** (moral, derechos, humanismo como espectros) y **propiedad como poder, no derecho**; más la **«unión de egoístas» disoluble**. Corpus: Max Stirner, *El único y su propiedad* (1845, ed. esp.).

### Posiciones (8)

| Ítem | Valor | Calidad | Fecha fuente | Dirección |
|---|---|---|---|---|
| **izq-055 (ninguna causa superior por encima de mi interés)** | **+2** | media | 1845 | **Ancla de identidad**: el yo no se debe a ningún ideal/espectro. |
| lab-010 (rechazo impuestos: propiedad no financia lo colectivo sin consentimiento) | **+1** | media | 1845 | Propiedad como poder, no derecho: no sacraliza la propiedad privada (deslinde de Tucker). |
| izq-039 (sin líder permanente; portavoces rotatorios) | **+1** | media | 1845 | Unión disoluble; sin autoridad permanente, pero sin regla fija de rotación. |
| izq-007 (abolir el Estado, no conquistarlo) | **+2** | media | 1845 | Hostilidad radical yo-Estado; conquistarlo solo entroniza un nuevo amo. |
| dem-014 (voto vinculante de toda la militancia) | **−1** | **baja** | 1845 | La masa no vincula al yo; objeción al carácter vinculante (inferido). |
| rel-001 (Estado promueve ateísmo y excluye lo religioso) | **−2** | media | 1845 | El ateísmo de Estado relocaliza «lo sagrado»: nuevo dogma coactivo. |
| rel-002 (Estado aconfesional que deja expresarse a todos) | **+1** | **baja** | 1845 | Más cerca de «dejar en paz» al yo que la imposición (inferido). |
| rel-003 (autoridades religiosas pueden vetar leyes) | **−2** | media | 1845 | El Único no reconoce autoridad sacra sobre nadie. |

### Deslinde (en `variante`, obligatorio)
- **vs individualismo tuckeriano:** Tucker conserva un **sistema de derechos** y propiedad por **ocupación y uso**; aquí no hay derecho, solo poder. La ficha **NO hereda** la economía de mercado tuckeriana (por eso solo lab-010 en propiedad, y como poder, no como derecho de mercado).
- **vs objetivismo (Rand):** erige una **moral racionalista** con derechos individuales; el egoísmo stirneriano rechaza toda moral y todo lo «sagrado», incluido el de la razón.

### Huecos declarados
- **Verbatim (todas las posiciones):** sin pasaje literal → cola humana. Prioridad: izq-055, lab-010 (propiedad-poder), rel-001 (lo sagrado como espectro).
- **dem-014 (baja) y rel-002 (baja):** inferencias sobre casos que Stirner no aborda literalmente (voto de partido; programa positivo de aconfesionalidad). Cotejar o degradar.
- **Economía: thin deliberado.** No hay programa económico desarrollado; «propiedad como poder» no es un sistema de mercado. Es el **deslinde**, no un hueco a rellenar copiando a Tucker.
- **Género:** sin posiciones (silencio, no herencia).

### URLs a cola de verificación humana
- `https://www.solidaridadobrera.org/ateneo_nacho/libros/Max%20Stirner%20-%20El%20unico%20y%20su%20propiedad.pdf` (ed. esp., texto completo; localizada viva por WebSearch).
- `https://es.anarchistlibraries.net/library/max-stirner-el-unico-y-su-propiedad` (The Anarchist Library, ed. esp.).

### Preguntas discriminantes recomendadas para el mapa (integrador)
El mapa lista hoy `izq-007, lab-010, izq-039`. Recomiendo **incorporar `izq-055`** como discriminante principal (es el ancla de identidad y el único ítem que separa limpiamente al egoísmo del individualismo con derechos y del objetivismo):
1. **izq-055** — ninguna causa superior por encima de mi interés (+2 egoísmo vs −2 individualismo con derechos / objetivismo). *El discriminante decisivo.*
2. **lab-010** — propiedad-poder frente a impuestos sin consentimiento (+1, deslinde de Tucker por la razón, no por el valor).
3. **rel-001** — rechazo del ateísmo de Estado (−2), que exhibe el núcleo anti-«sagrado» incluso frente al laicismo autoritario.

---

## Triaje del integrador (pendiente, fuera de este encargo)

Escritura de datos que **no** corresponde a esta tanda de solo-fichas y queda para integración:

1. **Cablear el mapa.** Ambas anclas están en `estado: investigacion` con `publicacionGeometrica: bloqueada-investigacion` y **sin `referenciaId`**. Para publicarlas: fijar `referenciaId` (`anarcoprimitivismo` / `egoismo-anarquista`), pasar a `instrumentada` y evaluar geometría (motor vs prior visual). Conservar `sensibilidad: normal` en la corriente (coincide con la referencia).
2. **Actualizar `preguntasDiscriminantes` del mapa** con `va-019` (primitivismo) e `izq-055` (egoísmo) según lo anterior; ambos ítems ya existen en el banco (piloto) pero no figuran en las listas del mapa.
3. **Cola de verbatim (§6 del dosier):** cotejar los pasajes prioritarios sobre edición impresa/egress abierto y, al añadir cita literal, subir la calidad a `alta` y adjuntar `grupoEvidencia` (el esquema exige grupo cuando `fuente.cita` está presente).
4. **Futuras anclas de primitivismo** (no ahora, exigen fuente propia): género (domesticación→patriarcado) y religión/lenguaje (alienación simbólica). Silencio, no cero.
5. **No confundir facetas con identidad:** el ilegalismo asociado al egoísmo/individualismo es contexto histórico-táctico (dosier §3.12), nunca ficha ni sensibilidad `violenta`.

## Recuento
- Referencias nuevas: **2** (`anarcoprimitivismo`, `egoismo-anarquista`).
- Posiciones: **15** (7 + 8), todas media/baja, sin cita literal.
- Validación: `npm run validate:data` verde (69 referencias doctrinales; 0 errores).
- Commits: `0697dc5` (primitivismo), `56315fd` (egoísmo).
