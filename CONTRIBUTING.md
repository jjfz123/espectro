# Contribuir a Espectro

## Flujo
1. Fork + rama por cambio.
2. `npm install && npm test && npm run typecheck && npm run validate:data` en verde antes del PR.
3. El CI repite esas tres comprobaciones; un PR con datos inválidos no se fusiona.

## Añadir ítems (afirmaciones)
Un ítem entra al banco en estado `piloto` y solo pasa a `activo` tras demostrar discriminación en piloto/calibración. Reglas de redacción:

- **Una sola idea por ítem.** Si contiene «y», probablemente son dos ítems.
- **Sin dobles negaciones** y sin tecnicismos evitables.
- **Debe discriminar**: en el PR, indica qué familias de partidos responderían distinto y por qué. Un ítem donde todos contestan igual es ruido.
- **Polaridad**: declara `positiva`/`negativa` y ayuda a equilibrar el banco (~50/50). La semilla actual está sesgada a positiva: se aceptan con prioridad reformulaciones en negativo.
- **Ejes**: asigna cargas con parsimonia (lo normal es un eje, carga ±1 o ±0.5). Si la afirmación discrimina partidos pero no proyecta limpiamente sobre un eje, usa `"ejes": []` (solo-matching) y explica en `notas`.
- **Módulo**: `nucleo` solo para temas transversales; los matices de familia van a su módulo.

## Añadir o editar partidos
- Un fichero por partido en `data/partidos/`, partiendo de `_plantilla.json`.
- **Toda posición de un partido `verificada` exige `justificacion` o `fuente.cita`** (el validador lo comprueba). Fuente con `tipo`, `url` y `fecha`.
- Prioridad de fuentes: votación parlamentaria > programa vigente > declaración oficial > estatutos.
- `confianza: estimada` para posiciones inferidas; explica el razonamiento en `justificacion`.
- `demo: true` queda reservado a fixtures de test; prohibido en producción.
- No inventes posiciones. Un partido sin datos se lista como `sin-datos` y no se puntúa.

## Añadir un módulo territorial
Copia la estructura de `territorial-canarias`: 5-8 ítems sobre financiación, competencias, lengua (si aplica), agravios específicos. Desbloqueo `{"tipo": "ccaa", "ccaa": "<id>"}` + `eleccionUsuario: true`.

## Código
- Motor puro: sin E/S, sin dependencias de runtime, sin acceso a red. Todo lo que necesite datos los recibe por parámetro.
- TypeScript estricto; los tests acompañan a cada función nueva.
