# Espectro

**Test de afinidad política de espectro completo para España.** No otro test de diez partidos y dos ejes: un VAA (*Voting Advice Application*) diseñado para cubrir el registro completo de partidos españoles —estatales, autonómicos, insularistas y locales— y para cartografiar los matices ideológicos finos que los tests existentes ignoran (¿leninista o consejista? ¿derecha confesional o derecha liberal pro-LGTB?).

> Nombre provisional. CI: TypeScript + Vitest + validación de datos + build de producción + Playwright.

## Por qué existe

Los tests españoles actuales (afinidadpolitica.es y similares) cubren ~10 partidos con representación y 2 ejes. Eso deja fuera la dimensión territorial —la que explica el sistema de partidos español—, los cientos de partidos que concurren a elecciones sin escaño, y toda la taxonomía interna de cada familia ideológica. Espectro parte de tres decisiones de diseño:

1. **Las preguntas crecen con las *distinciones*, no con el número de partidos.** Distinguir a un estalinista de una luxemburguista no requiere más preguntas de impuestos: requiere preguntas de otra naturaleza (vanguardia/consejos, reforma/revolución, balance de la URSS). De ahí la arquitectura modular.
2. **Cobertura escalonada y honesta.** Posiciones `verificada` (autoubicación del partido o codificación experta con cita), `estimada` (inferida y etiquetada como tal) y `sin-datos` (listado sin matching). Nunca se inventa una posición.
3. **Privacidad por diseño.** Las opiniones políticas son dato de categoría especial (art. 9 RGPD) y el art. 9.1 LOPDGDD impide que el solo consentimiento baste cuando la finalidad principal es identificar la ideología. Por eso el motor es puro y **todo el cálculo ocurre en el navegador**: el servidor nunca ve las respuestas. Ver [docs/PRIVACIDAD.md](docs/PRIVACIDAD.md).

## Arquitectura

```
espectro/
├── data/                    Capa de datos (JSON validado por esquema)
│   ├── ejes.json            27 ejes y facetas principales, transversales y de profundización
│   ├── modulos.json         19 módulos y sus reglas de desbloqueo (umbral, banda, CCAA, manual)
│   ├── items/               Banco versionado (374 registros; 360 vigentes y 14 retirados)
│   ├── partidos/            67 perfiles, con justificación y cita por posición
│   ├── sindicatos/          14 perfiles separados del ranking electoral
│   ├── referencias/         39 referencias doctrinales no electorales
│   ├── convocatorias/       21 convocatorias y 323 candidaturas incluidas
│   └── schemas/             JSON Schema de cada entidad
├── src/engine/              Motor puro TypeScript, sin dependencias ni E/S
│   ├── matching.ts          Afinidad: Manhattan normalizada + pesos + cobertura
│   ├── ideologia.ts         Puntuación por eje y desbloqueo de módulos
│   └── types.ts             Modelo de dominio
├── scripts/validate-data.mjs  Validación de esquemas + integridad referencial
├── tests/                   vitest (incluye el test de la tesis del proyecto)
└── docs/                    Metodología, privacidad y fuentes de datos
```

El motor no sabe nada de HTTP ni de DOM: se importa igual desde un frontend web (Vite/React/Svelte), una app móvil (React Native/Capacitor) o un script de análisis. Esa pureza es lo que garantiza el requisito client-side.

## Cómo funciona

**Dos recorridos y tres profundidades de resultado.** *Rápido*: 50 preguntas generales y perfil provisional. Desde ahí se puede continuar al *exhaustivo*, que conserva todas las respuestas compatibles y añade módulos universales, ideológicos y territoriales. Al alcanzar 150 respuestas, un hito único permite ver un perfil de profundidad intermedia o seguir; el perfil conserva el avance y vuelve después a la primera pregunta pendiente. Las subpreguntas aparecen solo cuando una respuesta necesita aclarar el motivo; las categorías, cargas y aproximaciones permanecen ocultas hasta cada salida de resultados.

**Escala de respuesta.** Likert de 5 puntos (−2..+2) **más «sin opinión»**, separada del neutral y excluida del cálculo. Cada ítem puede marcarse como *importante* (peso ×2).

**Matching.** Distancia city-block/Manhattan normalizada y ponderada — el método del Wahl-O-Mat, transparente y explicable ítem a ítem:

```
afinidad = 100 · (1 − Σ wᵢ·|uᵢ − pᵢ| / (Σ wᵢ · 4))
```

Cada resultado incluye cobertura (proporción de tus respuestas que el partido tiene posicionadas), bandera de baja cobertura, nivel de confianza y el **detalle ítem a ítem con la justificación y la cita de fuente** del partido: el «por qué coincide» es parte del contrato.

Los partidos de programa monotemático no entran en ese porcentaje: una coincidencia en un solo
punto se presenta en un bloque específico, con su fuente, sin fingir que describe una afinidad
ideológica general.

**Mapa personal antes que partidos.** La posición del usuario se calcula aunque ningún partido la represente. Primero se muestran dimensiones y facetas con cobertura; después, por separado, similitud sindical y afinidad electoral. Los ítems *solo-matching* (`ejes: []`) separan organizaciones sin forzar una carga lineal; los ítems `solo-mapa` describen arquetipos doctrinales pero están vetados para recomendar organizaciones reales.

La primera brújula combina un campo degradado Economía × Poder político con regiones doctrinales
calculadas, no dibujadas a mano. Los nombres permanecen ocultos hasta pasar, enfocar o tocar una
zona; cada corriente abre una ficha en español con definición, variante, periodo, límites y
fuentes. Los puntos de partido se identifican del mismo modo para conservar legibilidad en móvil.
La vertical es una composición publicada de GAL–TAN, pluralismo, organización, libertades civiles,
democracia directa, estatismo y tradición moral; el GAL–TAN original y el eje territorial siguen
visibles por separado en los planos detallados.
La criba editorial de la imagen de referencia está documentada en
[docs/investigacion/TAXONOMIA-MAPA-IDEOLOGIAS.md](docs/investigacion/TAXONOMIA-MAPA-IDEOLOGIAS.md):
178 etiquetas revisadas, pero solo 28 candidatas a la capa española principal.

## Empezar

```bash
npm ci
npm --prefix web ci

npm run validate:data # esquemas, fuentes e integridad referencial
npm run typecheck      # motor y tests
npm test               # Vitest: motor, espacio, persistencia y casos límite
npm run web:build      # TypeScript web + build Vite/PWA en web/dist
npm run web:budget     # límites gzip de inicial, resultados, 3D y PWA completa

# Primera ejecución local de Playwright:
npm --prefix web exec -- playwright install chromium
npm run web:test:e2e
```

La matriz de CI ejecuta estas comprobaciones desde instalaciones limpias. Los E2E levantan el
build de producción y cubren también el flujo rápido → provisional → exhaustivo, persistencia,
el hito intermedio de 150 respuestas, ramas condicionales, móvil estrecho y funcionamiento offline
de resultados y del visor 3D.

El test más importante está en `tests/engine.test.ts` («tesis del proyecto»): dos partidos demo que **empatan exactamente** respondiendo solo el núcleo económico y se separan >15 puntos al activar el módulo de corrientes. Es la demostración ejecutable de por qué un test plano de 30 preguntas no basta.

## Estado y hoja de ruta

- [x] Motor de matching + ejes + módulos, testado y tipado (incl. desbloqueo por banda y multi-CCAA)
- [x] Modelo de datos con esquemas, citación por posición y niveles de confianza
- [x] Banco semilla (33 ítems, 4 módulos) y partidos demo
- [x] Banco ampliado: **374 registros, 19 módulos, 27 ejes/facetas**, con hipótesis de discriminación obligatoria y revisión adversarial ([docs/BANCO-ITEMS.md](docs/BANCO-ITEMS.md))
- [x] Frontend client-side: modo rápido y exhaustivo, itinerario condicional, revisión editable, resultados sin falsos ceros y persistencia defensiva
- [x] Catálogo documentado: **67 partidos, 39 referencias doctrinales, 21 convocatorias con 323 candidaturas y 14 sindicatos**
- [x] PWA con manifest, precache generado en build, actualización consentida y recuperación local ante errores
- [ ] **Fase 1:** selección del núcleo definitivo tras entrevistas/piloto y partidos con representación estatal/autonómica (`verificada`)
- [ ] **Fase 2:** campaña de autoubicación a partidos (modelo Wahl-O-Mat), partidos sin escaño (`estimada`), módulos territoriales de las 17 CCAA + Ceuta y Melilla, integración de votaciones del Congreso como fuente
- [ ] **Fase 3:** calibración con análisis de Mokken/IRT sobre datos anonimizados, selección adaptativa de ítems (CAT), cobertura de todo partido que concurra a cualquier elección (vía infoelectoral)

Detalles en [docs/METODOLOGIA.md](docs/METODOLOGIA.md), [docs/FUENTES.md](docs/FUENTES.md)
y [docs/PRODUCCION-APP.md](docs/PRODUCCION-APP.md).

## Contribuir

Ítems nuevos, posiciones de partido con cita, módulos territoriales de tu comunidad: ver [CONTRIBUTING.md](CONTRIBUTING.md). Toda posición `verificada` exige justificación o cita de fuente; el validador lo comprueba en CI.

## Licencia

[AGPL-3.0](LICENSE): cualquier despliegue derivado, también como servicio web, debe publicar su código. Elegida deliberadamente para que nadie convierta esto en una caja negra comercial de perfilado político.
