# Recalibración de partidos y brújula — instrumento v6

Fecha de corte: 2026-07-14.

## Contrato visible

La brújula principal publica exactamente los **65 partidos activos** como puntos y ofrece esos mismos 65 en «Localizar un partido». La falta de cobertura no elimina perfiles, no los centra automáticamente y no los convierte en una banda sin punto. En su lugar, el punto conserva una coordenada documental y comunica el grado de evidencia mediante trazo e incertidumbre.

Los valores de partidos se mantienen dentro de `[-80, 80]`; `±100` queda reservado para tipos ideales. El registro actual ocupa X `−80…78` y Y `−61…80`.

Cada partido se sitúa **sobre su familia doctrinal real del atlas**: su región más cercana en el plano es su corriente (VOX → «Derecha radical populista nativista», PSOE → «Socialdemocracia clásica», el Partido Libertario → «Minarquismo», etc.), no un vecino histórico incidental. La proximidad geométrica y la lectura doctrinal coinciden por construcción. Las anclas documentadas del perfil justifican la pertenencia a esa familia; los extremos del rango se reservan a organizaciones genuinamente extremas (comunismos marxista-leninistas, neonazismo) y nunca alcanzan `±100`.

## Datos y trazabilidad

- `data/brujula-partidos.json`: coordenadas, incertidumbres y criterio de los 65 perfiles activos.
- `data/brujula-partidos-anclas.json`: anclas de propiedad, poder y contexto, validadas contra posiciones con URL, título y fecha de consulta en las fichas de partido.
- `scripts/validar-brujula-partidos.mjs`: exige correspondencia exacta con el catálogo activo, fuentes completas, rango, incertidumbre y tratamiento monotemático.
- `web/src/mapaEspacial.ts`: conserva en paralelo la auditoría estricta calculada desde preguntas y la coordenada editorial publicada; el valor directo nunca se reescribe ni se usa para fingir cobertura.

Los grados visibles son: sólida, provisional, estimada, orientativa y programa monotemático. «Orientativa» significa que el contrato estricto aún no llega a mínimos, no que la coordenada sea un cero imputado. El matching electoral sigue calculándose por respuestas compartidas; la brújula no altera el ranking.

## Pregunta 65

La formulación rápida anterior mezclaba transferencia a cooperativas, propiedad privada y dirección ministerial. En v6 se sustituye por una afirmación monotónica:

> La propiedad privada debería seguir siendo la forma principal de propiedad de las grandes empresas.

La formulación cooperativa se conserva como `lab-039` en el recorrido exhaustivo. La migración v5→v6 mueve la respuesta antigua a `lab-039`, deja la nueva `lab-017` pendiente y reabre una sesión terminada exactamente en esa pregunta. No se reinterpretan respuestas antiguas.

Las 65 preguntas rápidas tienen al menos tres anclajes partidistas activos. La nueva pregunta 65 cuenta con posiciones negativas, neutrales y positivas y no carga el eje de poder político.

## Enciclopedia

La enciclopedia abre con dos catálogos separados:

- 65 partidos activos: ámbito, tipo, ficha documental, revisión, coordenada e incertidumbre, cobertura estricta, autodescripción, clasificaciones externas, muestra de posiciones con fuente y sitio oficial.
- 85 referencias ideológicas: catálogo doctrinal preexistente, sin retirar corrientes ni degradar el atlas.

## Puertas automatizadas

La entrega incluye validadores de datos, evidencia, atlas, brújula e inventario; auditorías de partidos, atlas, elecciones y anexo; TypeScript raíz/web; 459 pruebas Vitest; build PWA y presupuesto de transferencia. Playwright queda preparado para instrumento v6, aunque su ejecución dentro del entorno de empaquetado está bloqueada por la política administrada de Chromium (`ERR_BLOCKED_BY_ADMINISTRATOR` incluso contra localhost y 127.0.0.1).

El cierre nominal global del proyecto no se declara: `docs/TODO-MAPEO-EXHAUSTIVO.md` conserva 715 casillas abiertas de trabajo histórico. Esta entrega cierra la recalibración visible y su cableado, no ese backlog completo.
