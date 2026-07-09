# Espectro

**Test de afinidad política de espectro completo para España.** No otro test de diez partidos y dos ejes: un VAA (*Voting Advice Application*) diseñado para cubrir el registro completo de partidos españoles —estatales, autonómicos, insularistas y locales— y para cartografiar los matices ideológicos finos que los tests existentes ignoran (¿leninista o consejista? ¿derecha confesional o derecha liberal pro-LGTB?).

> Nombre provisional. CI: typecheck + tests + validación de datos en cada push.

## Por qué existe

Los tests españoles actuales (afinidadpolitica.es y similares) cubren ~10 partidos con representación y 2 ejes. Eso deja fuera la dimensión territorial —la que explica el sistema de partidos español—, los cientos de partidos que concurren a elecciones sin escaño, y toda la taxonomía interna de cada familia ideológica. Espectro parte de tres decisiones de diseño:

1. **Las preguntas crecen con las *distinciones*, no con el número de partidos.** Distinguir a un estalinista de una luxemburguista no requiere más preguntas de impuestos: requiere preguntas de otra naturaleza (vanguardia/consejos, reforma/revolución, balance de la URSS). De ahí la arquitectura modular.
2. **Cobertura escalonada y honesta.** Posiciones `verificada` (autoubicación del partido o codificación experta con cita), `estimada` (inferida y etiquetada como tal) y `sin-datos` (listado sin matching). Nunca se inventa una posición.
3. **Privacidad por diseño.** Las opiniones políticas son dato de categoría especial (art. 9 RGPD) y el art. 9.1 LOPDGDD impide que el solo consentimiento baste cuando la finalidad principal es identificar la ideología. Por eso el motor es puro y **todo el cálculo ocurre en el navegador**: el servidor nunca ve las respuestas. Ver [docs/PRIVACIDAD.md](docs/PRIVACIDAD.md).

## Arquitectura

```
espectro/
├── data/                    Capa de datos (JSON validado por esquema)
│   ├── ejes.json            6 ejes principales + facetas transversales y de profundización
│   ├── modulos.json         19 módulos y sus reglas de desbloqueo (umbral, banda, CCAA, manual)
│   ├── items/               Banco versionado (342 registros; 328 vigentes y 14 retirados)
│   ├── partidos/            Un fichero por partido, con cita por posición
│   ├── sindicatos/          Perfiles separados del ranking electoral
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

**Dos modos de uso.** *Rápido*: 50 preguntas generales y perfil provisional. Desde ahí se puede continuar al *exhaustivo*, que conserva todas las respuestas compatibles y añade módulos universales, ideológicos y territoriales. Las subpreguntas aparecen solo cuando una respuesta necesita aclarar el motivo; las categorías, cargas y aproximaciones permanecen ocultas hasta terminar.

**Escala de respuesta.** Likert de 5 puntos (−2..+2) **más «sin opinión»**, separada del neutral y excluida del cálculo. Cada ítem puede marcarse como *importante* (peso ×2).

**Matching.** Distancia city-block/Manhattan normalizada y ponderada — el método del Wahl-O-Mat, transparente y explicable ítem a ítem:

```
afinidad = 100 · (1 − Σ wᵢ·|uᵢ − pᵢ| / (Σ wᵢ · 4))
```

Cada resultado incluye cobertura (proporción de tus respuestas que el partido tiene posicionadas), bandera de baja cobertura, nivel de confianza y el **detalle ítem a ítem con la justificación y la cita de fuente** del partido: el «por qué coincide» es parte del contrato.

**Mapa personal antes que partidos.** La posición del usuario se calcula aunque ningún partido la represente. Primero se muestran dimensiones y facetas con cobertura; después, por separado, similitud sindical y afinidad electoral. Los ítems *solo-matching* (`ejes: []`) separan organizaciones sin forzar una carga lineal; los ítems `solo-mapa` describen arquetipos doctrinales pero están vetados para recomendar organizaciones reales.

## Empezar

```bash
npm install
npm test              # motor, itinerario, persistencia y casos límite
npm run typecheck
npm run validate:data # esquemas + integridad referencial
```

El test más importante está en `tests/engine.test.ts` («tesis del proyecto»): dos partidos demo que **empatan exactamente** respondiendo solo el núcleo económico y se separan >15 puntos al activar el módulo de corrientes. Es la demostración ejecutable de por qué un test plano de 30 preguntas no basta.

## Estado y hoja de ruta

- [x] Motor de matching + ejes + módulos, testado y tipado (incl. desbloqueo por banda y multi-CCAA)
- [x] Modelo de datos con esquemas, citación por posición y niveles de confianza
- [x] Banco semilla (33 ítems, 4 módulos) y partidos demo
- [x] Banco ampliado: **342 registros, 19 módulos, 25 ejes/facetas**, con hipótesis de discriminación obligatoria y revisión adversarial ([docs/BANCO-ITEMS.md](docs/BANCO-ITEMS.md))
- [x] Frontend client-side: modo rápido y exhaustivo, itinerario condicional, revisión editable, resultados sin falsos ceros y persistencia defensiva
- [x] Primera capa sindical independiente: 11 organizaciones con evidencia por posición y advertencias de territorio/cobertura
- [ ] **Fase 1:** selección del núcleo definitivo tras entrevistas/piloto y partidos con representación estatal/autonómica (`verificada`)
- [ ] **Fase 2:** campaña de autoubicación a partidos (modelo Wahl-O-Mat), partidos sin escaño (`estimada`), módulos territoriales de las 17 CCAA + Ceuta y Melilla, integración de votaciones del Congreso como fuente
- [ ] **Fase 3:** calibración con análisis de Mokken/IRT sobre datos anonimizados, selección adaptativa de ítems (CAT), cobertura de todo partido que concurra a cualquier elección (vía infoelectoral)

Detalles en [docs/METODOLOGIA.md](docs/METODOLOGIA.md) y [docs/FUENTES.md](docs/FUENTES.md).

## Contribuir

Ítems nuevos, posiciones de partido con cita, módulos territoriales de tu comunidad: ver [CONTRIBUTING.md](CONTRIBUTING.md). Toda posición `verificada` exige justificación o cita de fuente; el validador lo comprueba en CI.

## Licencia

[AGPL-3.0](LICENSE): cualquier despliegue derivado, también como servicio web, debe publicar su código. Elegida deliberadamente para que nadie convierta esto en una caja negra comercial de perfilado político.
