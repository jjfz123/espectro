# Tanda de datos — derecha nacionales (campo NACIONAL de la matriz)

Drenaje de los huecos eje-entidad del campo NACIONAL para cuatro perfiles: **España 2000**,
**Democracia Nacional**, **FE-JONS** y **Noviembre Nacional**. Método: por cada eje-hueco se
leyeron los ítems que cargan ese eje en `data/items/*.json` (campo `ejes[].eje`), se eligieron
0–3 sostenidos por la evidencia y se codificó el valor (−2..+2) desde el **enunciado exacto del
ítem** y la **evidencia verificada**, nunca desde la puntuación −100..100 de la matriz (hoja de
pistas, jamás fuente). Solo altas; no se tocaron coordenadas, brújula ni el bloque
`clasificacion`. Lenguaje clínico; etiquetas ideológicas atribuidas con fuente; «investigada» ≠
«condenada».

## Base sincronizada (corrección del integrador)

- El worktree se creó desde `c42e406`, **no** desde la base fresca `70843d4` del encargo.
  Sincronizados los cuatro ficheros con `git checkout 70843d4 -- …` y eliminado el fichero
  obsoleto `data/partidos/nucleo-nacional.json` (renombrado a `noviembre-nacional.json` en la
  base fresca). Commit de sincronización **`4e52d46`** «Sincroniza base fresca 70843d4».
- `c42e406` es ancestro lineal de `70843d4`. Verificado que **todos** los ítems referenciados por
  los cuatro perfiles de `70843d4` existen en `data/items` de mi árbol (resultado `{}`), de modo
  que el checkout parcial **no** rompe la integridad referencial. `data/items`, `data/version.json`,
  etc. permanecen en `c42e406` (fuera de mi ámbito) y `npm run validate:data` queda en verde.
- La entidad «noviembre-nacional» del encargo **es** `data/partidos/noviembre-nacional.json`
  (`id: noviembre-nacional`, nombre «Noviembre Nacional»), vehículo partidista de la asociación
  Núcleo Nacional. La discrepancia inicial de nombre de fichero se debía a la base vieja.

## Restricción de red (afecta a la calidad de la evidencia)

`WebFetch` a webs de partido y prensa devolvió **403** (bloqueo anti-bot del **servidor destino**,
no denegación de política del proxy: los dominios no aparecen en `recentRelayFailures`). La
verificación viva se hizo con **extractos de buscador** (`WebSearch`) más los **pasajes ya
datados en el repo**. Consecuencia metodológica: **ninguna alta de esta tanda añade una cita
verbatim nueva** (no pude cargar las páginas para transcribir un pasaje limpio). Todas las altas
son **posición con fuente + justificación, sin cita**, calidad `media` o `baja`, conforme a la
regla «evidencia sin pasaje limpio → media/baja». Las webs vivas de partido activo llevan
`fecha: "2026"`.

## Resumen antes/después

| Entidad | Posiciones antes | Altas | Después | Ejes-hueco | Drenados | Huecos declarados |
|---|---:|---:|---:|---:|---:|---:|
| España 2000 | 17 | 5 | 22 | 15 | 5 | 10 |
| Democracia Nacional | 18 | 5 | 23 | 13 | 6 | 7 |
| FE-JONS | 25 | 6 | 31 | 11 | 6 | 5 |
| Noviembre Nacional | 24 | 1 | 25 | 5 | 2 | 3 |
| **Total** | **84** | **17** | **101** | **44** | **19** | **25** |

(Algunas altas drenan más de un eje: `dem-019` cubre pluralismo + organización + autoridad;
`soc-003`/`der-026` no se usaron por falta de pasaje limpio, ver huecos.)

## Altas por entidad

Formato: `ítem` · valor · calidad · cita(sí/no) · fecha fuente · eje(s)-hueco que drena.

### España 2000 (`estimada`) — commit `c919df3`

| Ítem | Valor | Calidad | Cita | Fecha | Eje-hueco | Base de la posición |
|---|---:|---|---|---|---|---|
| `izq-046` | −2 | media | no | 2026 | internacionalismo | Nativismo declarado («Los españoles primero», inmigración «descontrolada e invasiva que merma los recursos y derechos de los nativos») ⇒ rechaza la libre circulación como derecho universal. |
| `pop-001` | +2 | media | no | 2026 | populismo | Antielitismo + antiglobalismo («el fortalecimiento del Estado Nacional es la única defensa contra la globalización»); encuadre académico como derecha radical populista de Mudde. |
| `geo-015` | −2 | media | no | 2026 | implicación-internacional | Euroescepticismo (UE como fracaso, recuperar soberanía frente a Bruselas) ⇒ rechaza política exterior de la UE por mayoría cualificada. |
| `dem-012` | +1 | media | no | 2026 | institucionalismo | Concurre a elecciones (candidaturas 2023); la academia lo sitúa «dentro de las reglas democráticas formales» frente al neofascismo. Moderado por su retórica de confrontación. |
| `geo-003` | +1 | **baja** | no | 2026 | uso-fuerza | **Inferencia** desde el antiatlantismo documentado (`def-002`: salir de la OTAN «dominada por EE. UU.», defensa «de Portugal a Rusia»); no participar en guerras exteriores de aliados. No pacifismo integral. |

### Democracia Nacional (`estimada`) — commit `15c9f7d`

| Ítem | Valor | Calidad | Cita | Fecha | Eje-hueco | Base de la posición |
|---|---:|---|---|---|---|---|
| `izq-046` | −2 | media | no | 2026 | internacionalismo | Nativismo (deportaciones masivas, tesis del «reemplazo») ⇒ rechaza la libre circulación como derecho universal. |
| `pop-001` | +2 | media | no | s/f (entrevista) | populismo | Modelo lepenista (nacional-populismo identitario) y «falso igualitarismo» de las élites ilustradas frente a «democracia orgánica». |
| `ter-001` | +2 | media | no | 2026 | modelo-territorial | Nacionalismo español centralista, oposición frontal a los nacionalismos periféricos ⇒ recentralización competencial. |
| `dem-019` | +2 | media | no | s/f (entrevista) | pluralismo-institucional (+ autoridad) | «Democracia orgánica» sustituye la democracia liberal de partidos: movimiento nacional unificado que dirige el Estado sin competencia entre partidos. Condición `dem-011` satisfecha. |
| `geo-015` | −2 | media | no | 2026 | implicación-internacional | Salida del euro y de Schengen y tesis de que la UE debe desaparecer ⇒ rechaza política exterior de la UE por mayoría cualificada. |

### FE-JONS (`verificada`) — commit `c28ec1b`

| Ítem | Valor | Calidad | Cita | Fecha | Eje-hueco | Base de la posición |
|---|---:|---|---|---|---|---|
| `lab-018` | +2 | media | no | 2026-05 | poder-laboral | Nacionalsindicalismo: representación desde el sindicato nacional y el lugar de trabajo en vez de por partidos (horizonte sindicalista). |
| `pop-001` | +2 | media | no | 2026 | populismo | «Pueblo» frente a «oligarquía»/caciquismo y denuncia de la partitocracia. |
| `izq-046` | −2 | media | no | 2026 | internacionalismo | Remigración, homogeneidad cultural y contratación preferente de españoles ⇒ rechaza la libre circulación como derecho universal. |
| `geo-003` | +2 | media | no | 2026 | uso-fuerza | «No es nuestra guerra»: rechaza guerras exteriores ajenas/imperialistas, salida de la OTAN, ejército limitado a la integridad territorial. |
| `geo-015` | −2 | media | no | 2026 | implicación-internacional | Salida de la UE ⇒ rechaza política exterior de la UE por mayoría cualificada. |
| `izq-001` | +2 | media | no | 2026 | método-cambio | Transformación integral del sistema (revolución nacionalsindicalista), no reforma gradual del orden liberal; concurre como táctica. |

### Noviembre Nacional (`estimada`) — commit `9886d0f`

| Ítem | Valor | Calidad | Cita | Fecha | Eje-hueco | Base de la posición |
|---|---:|---|---|---|---|---|
| `dem-019` | +2 | **baja** | no | 2026-07-07 | pluralismo-institucional (+ organización) | Rechazo en bloque del «régimen del 78» y del sistema de partidos; orientación nacionalsocialista **atribuida por prensa e investigadores** (no resolución judicial), coherente con un movimiento único sin competencia entre partidos. Condición `dem-011` satisfecha. Codificación cauta. |

## Huecos declarados (nada limpio → hueco)

- **España 2000 (10):** democracia-directa, pluralismo-institucional, libertades-civiles,
  laicismo, libertad-conciencia, animalismo, armas-nucleares, método-cambio, organización,
  autoridad-política. Notas: el «autoritarismo» y la orientación de «orden» están *atribuidos*
  (Mudde/Dialnet) pero no hay pasaje propio sobre una política concreta (p. ej. `soc-003`
  videovigilancia), así que no se codificó libertades-civiles/autoridad para no forzar; laicismo
  ya queda recogido en el eje de moral por `der-002` (tradición-moral), extenderlo a laicismo
  institucional sería forzar; sin base para armas nucleares ni para democracia directa.
- **Democracia Nacional (7):** democracia-directa, libertades-civiles, tradición-moral, laicismo,
  libertad-conciencia, animalismo, uso-fuerza. Notas: la matriz misma señala que «moral y religión
  carecen de programa actual detallado»; el antiatlantismo (`def-002`) ya está codificado y no se
  extendió a uso-fuerza (DN no es pacifista); sin pasaje sobre política animal ni de conciencia.
- **FE-JONS (5):** democracia-directa, libertades-civiles, libertad-conciencia, animalismo,
  armas-nucleares. Notas: su «representación directa» es orgánica, no plebiscitaria (el
  falangismo rechaza el plebiscitarismo liberal), por eso democracia-directa se declara hueco;
  la doctrina «no menciona animales» (la web doctrinal), y aunque el programa andaluz de 2026 muy
  probablemente defienda la tauromaquia, **no pude verificar un pasaje limpio** (403), así que
  animalismo queda hueco; recupera energía nuclear (`ene-001`) pero eso no es armamento nuclear.
- **Noviembre Nacional (3):** democracia-directa, libertades-civiles, animalismo. Notas: entidad
  de máxima sensibilidad; sin declaración propia sobre referéndums, política de seguridad
  (la violencia/agresiones están *investigadas, no condenadas* y son conducta, no una posición
  de política de libertades) ni sobre animales. No se sobre-codifica.

## Banderas para el integrador (triaje)

1. **Base:** worktree salió de `c42e406`; sincronizado a `70843d4` por instrucción del integrador
   (commit `4e52d46`). Fichero de la entidad = `noviembre-nacional.json` (obsoleto
   `nucleo-nacional.json` eliminado).
2. **Red viva bloqueada (403 del servidor destino):** ninguna alta lleva cita verbatim nueva;
   todas son media/baja con fuente + justificación. Verificación por extractos de buscador +
   pasajes ya datados en el repo. Si el integrador tiene acceso de fetch, conviene re-verificar y,
   donde haya pasaje limpio, elevar a `alta` con cita (candidatos claros: FE-JONS `geo-003` desde
   `falange.es/no-es-nuestra-guerra`; FE-JONS `pop-001`/`izq-001` desde `nuestras-ideas`).
3. **Evidencia-bandera nueva:** `fe-jons (social): 100 con 4 posiciones, todas ±2` (aviso no
   bloqueante) aparece tras añadir `izq-046` (carga secundaria `social −0.5`). Es **fiel** al perfil
   TAN extremo de FE-JONS (remigración, aborto, homogeneidad); **no** se retiró el ítem para
   maquillar el aviso. Moderadora documentada existente: `cul-002` (−1, «no-etnicismo / unidad de
   destino en lo universal»). El aviso `fe-jons (economico)` es previo a esta tanda.
4. **Posiciones inferenciales `baja`** (revisar con lupa): E2000 `geo-003` (uso-fuerza, inferido de
   antiatlantismo) y NN `dem-019` (pluralismo, inferido de rechazo al sistema + orientación
   nacionalsocialista atribuida). E2000 `dem-012` es `media` pero también parcialmente inferencial
   (conducta electoral + clasificación académica). Si el criterio del propietario es más estricto,
   son las primeras candidatas a poda.
5. **Dialnet (clasificación académica de E2000):** año de publicación no confirmable offline
   (Revista Nómadas, UCM; analiza el programa de 2015). Por eso `pop-001`/`dem-012` se anclan en la
   **web viva** del partido (fecha 2026) citando la clasificación en la justificación, en vez de
   usar el artículo como fuente sin fecha fiable.
6. **Wikipedia** se usó solo como **puntero de inferencia** (nunca pasaje/cita), replicando el
   patrón ya presente en el repo (DN `ue-001`, `der-005`, `cul-002`). Sin citas nuevas.
7. **Sin bajas ni cambios de valores existentes.** No se detectaron valores previos claramente
   erróneos que exijan bandera; los perfiles sincronizados se ven consistentes. No se tocó
   `clasificacion` de Noviembre Nacional (ya bien fundada con ≥2 fuentes).

## Cola de URLs (humana)

Fuentes usadas o verificadas por extracto de buscador en esta tanda (además de los pasajes ya
datados en los ficheros):

**España 2000**
- https://espana2000.es/ · https://espana2000.es/programa-politico/ · https://espana2000.es/los-espanoles-primero/ · https://espana2000.es/quienes-somos/ (web oficial, 2026; 403 a fetch, extractos de buscador)
- https://dialnet.unirioja.es/servlet/articulo?codigo=6011467 — «España 2000, ¿la emergencia de una nueva derecha radical populista?» (clasificación Mudde; año no confirmado)

**Democracia Nacional**
- https://democracianacional.es/ (web oficial, 2026)
- https://www.sevillainfo.es/noticias-nacional/entrevista-a-pedro-chaparro-presidente-de-democracia-nacional-dn/ (entrevista; «democracia orgánica», «falso igualitarismo»)
- https://es.wikipedia.org/wiki/Democracia_Nacional (puntero: centralismo, euroescepticismo)

**FE-JONS**
- https://falange.es/nuestras-ideas/ (doctrina vigente, 2026)
- https://falange.es/no-es-nuestra-guerra (anti-OTAN, «no es nuestra guerra», 2026)
- https://falange.es/historia/ (crítica de la oligarquía/caciquismo, partitocracia)
- https://falange.es/wp-content/uploads/2026/05/PROGRAMA-ELECTORAL-FEdelasJONS_ANDALUCIA-2026.pdf (programa 2026-05)

**Noviembre Nacional**
- https://theobjective.com/espana/politica/2026-07-07/grupo-neonazi-nucleo-nacional-partido-elecciones-generales/ («régimen del 78»)
- https://www.elespanol.com/reportajes/20260707/ivan-rico-administrativo-ultra-hijo-exconcejal-pp-quita-mascara-lanzar-partido-noviembre-nacional/1003744311510_0.html (anti-liberalismo/anti-marxismo)
- https://cadenaser.com/nacional/2025/04/09/quien-esta-detras-de-nucleo-nacional-representan-un-riesgo-elevado-de-extremismo-violento-cadena-ser/ (advertencia clínica: investigada, no condenada)

## Salida de puertas

```
npm run validate:data
✓ Datos válidos (instrumento v4, corte 2026-07-11): 29 ejes, 20 módulos, 392 ítems …, 67 partidos …
⚠ 2 diagnósticos de cobertura del atlas (no bloquean): densidad 72/90; cuadrante derecha-abajo 9/15  [previos a esta tanda]
⚠ evidencia-bandera (no bloquea): fe-jons (economico) [previo]; fe-jons (social) [nuevo, ver bandera 3]

npm run validate:evidence-groups
✓ Todos los pasajes citados conservan un grupo de evidencia canónico.
   (mis altas no añaden citas ⇒ no requieren `asignar-grupos-evidencia.mjs --write`)
```

## Commits (rama del worktree, sin push)

- `4e52d46` Sincroniza base fresca 70843d4 (ficheros del encargo)
- `c919df3` España 2000 (5 altas)
- `15c9f7d` Democracia Nacional (5 altas)
- `c28ec1b` FE-JONS (6 altas)
- `9886d0f` Noviembre Nacional (1 alta)
- (este informe se añade en un commit posterior)
