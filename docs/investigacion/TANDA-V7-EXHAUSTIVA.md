# TANDA — Instrumento v7: UE/internacionalismo, auditoría de signos, anclaje masivo y glosario

Fecha: 2026-07-16. Rama `claude/eu-questions-electricity-company-be31sq`. Encargo del propietario: diferenciar la oposición a la UE del internacionalismo, aclarar la eléctrica pública competidora, arreglar los bugs, revisar las preguntas hermanas, cablear mejor, ampliar glosario, explicar mejor las ideologías y anclar mejor a los partidos, con investigación en Internet.

## 1. Instrumento: qué cambió y por qué es v7

- **`lab-027` (chovinismo del bienestar)**: la carga `internacionalismo` era −0.75 (estar de acuerdo puntuaba como internacionalista). Corregida a +0.75 (soberanismo), coherente con `der-015`, `izq-013`, `izq-025` y con el uso del ítem en TANDA-DERECHA-FORALES. Cambio de signo de ítem existente → **versionInstrumento 6→7** con migración declarada:
  - v6→v7: identidad — las respuestas guardadas se restauran tal cual; solo cambia la proyección, que se recalcula siempre.
  - v5→v7: encadena el remapeo `lab-017`→`lab-039` de la migración v5→v6.
  - Los resultados compartidos son instantáneas ya derivadas; no se reinterpretan.
- **Auditoría de signos de todo el banco** (encargo «preguntas hermanas»): subagente de solo lectura sobre corrientes-izquierda + trabajo + socialdemocracia + límites (74 ítems con eje, 1 hallazgo: el propio lab-027) e inspección del integrador eje-por-eje del resto del banco (económico, social, territorial, modelo-territorial, autoridad, populismo, estatismo, propiedad-mercado, poder-laboral, libertades, pluralismo, democracia-directa, institucionalismo, organización, conciencia y todos los contraintuitivos: ue, internacionalismo, ecología, laicismo, animalismo, monarquía, tradición-moral, atlantismo, nuclear, armas, uso-fuerza, implicación). **Ningún otro error de signo.**
- Observaciones no bloqueantes: los polos «representación estable» (democracia-directa) y «pluralismo institucional» (populismo) no tienen anclas afirmativas propias en el banco general — se miden solo por desacuerdo. Candidatos a ítems futuros.

## 2. UE ↔ internacionalismo (encargo principal)

- `ue-004`/`ue-005`: seguimientos condicionales de `ue-001` (módulo geopolítica; definidos en nucleo.json por la regla de orden del banco) que separan el motivo soberanista del internacionalista sin inferirlo.
- `geo-016` (autoridad supranacional global sin nombrar la UE) con carga moderada (−0.5) por desacuerdo equifinal, y seguimientos simétricos `geo-017` (soberanista +0.75) y `geo-018` (antiimperialista/internacionalista −0.5): el comunista que ve «instituciones burguesas» ya no puntúa como soberanista, y el soberanista tiene su motivo propio. Dilema de sesgo planteado por el propietario y resuelto con saldo de ambos motivos.
- `izq-056`: seguimiento del XX Congreso (`izq-049`) para quien niega la premisa («en la URSS nunca llegó a existir el socialismo»), solo-matching como su padre; glosario `xx-congreso-pcus` ampliado con capitalismo de Estado y Estado obrero degenerado, sin insinuar hacia dónde puntúa (regla del esquema).
- `ene-007` y `sd-011` (eléctrica pública competidora): marco «sistema actual» aclarando que se valora el paso intermedio, no la nacionalización del sector, para que el desacuerdo «por insuficiente» no se lea como pro-mercado.
- Test de cobertura nuevo (`tests/exhaustivo-cobertura.test.ts`): las 407 vigentes son alcanzables; los seguimientos aparecen exactamente con su padre en rango activador. Verificado además clicando el flujo real (Playwright): 401 preguntas administradas sin repeticiones ni atascos; las 6 restantes son seguimientos del rango contrario al patrón de respuesta usado.

## 3. Partidos (anclaje)

- **Deuda de citas de la tanda v6**: ~1.280 posiciones con fuente completa pero sin `fuente.cita`; el auditor las descartaba enteras. Completadas con titular-como-cita (calidad media) SOLO donde la fuente es prensa; los títulos de documento (programas/estatutos) **no** valen como localizador (intención codificada en tests/bng-geometria) y quedan pendientes de lectura nominal. Grupos de evidencia reasignados.
- Investigación en Internet (WebSearch operativo; WebFetch bloqueado 403 para prensa española, Wikipedia y webs de partido — mismo límite que TANDA-RECALIBRACION): Más Madrid gana `dem-023` (formularios contra identificaciones por perfil racial, −1) y `eco-014` sube a +2 con titular directo (impuesto autonómico propio a grandes fortunas, Telemadrid 2025).
- Resultado brújula: sólidas 4→6 (entra **Más Madrid**), provisionales 3→4 (PP recupera provisional con la X equilibrada), insuficientes 39→33. Contrato del TODO: 1.754 posiciones; sha del contrato funcional regenerado.
- **Huecos documentados** (leads para un integrador con acceso web):
  - PP eje Y: falta la familia jerarquía-organización; `dem-015` está anclado a los Estatutos del 21.º Congreso (PDF) sin pasaje citado — leer el régimen disciplinario y añadir cita textual.
  - Podemos eje Y: 5/6 grupos; lead: programa de europeas (podemos.info, PDF) contiene revocatorios y referéndums vinculantes para `dem-001`/`dem-002`.
  - `pp.der-014`: grupoEvidencia sin cita, preexistente; pendiente de pasaje.
  - Extremos con solo posiciones-bandera (uce económico, upg territorial, vox territorial): el de Vox parece extremo real (supresión del Estado autonómico es programa); uce/upg requieren fuentes que este entorno no alcanza.
- Web: la evidencia viaja íntegra al navegador (auditarPerfilBrujula clasifica los puntos en cliente); presupuesto PWA 3,20→3,30 MiB con medición (3,28) y palanca futura documentadas (fichas completas en diferido desde la enciclopedia).

## 4. Glosario e ideologías

- Glosario 96→100: `supranacionalidad` (ue-004/ue-005/geo-016/geo-017), `taxonomia-europea` (ene-002), `reparto-capitalizacion` (lib-005), `mayoria-cualificada-ue` (geo-015); ampliación de `xx-congreso-pcus`. Cableados además: referendum-vinculante→geo-009/dr-020, autogestion→izq-042, regularizacion-extraordinaria→sd-021 (barrido de frase completa contra los 407 vigentes).
- Atlas: enriquecidas las 8 definiciones más telegráficas (foralismo pactista, Blas Infante, Arana, Castelao, krausismo-ILE, Lerroux, blaverismo, Castelar) con autores, fechas y marcadores, sin tocar calibración ni formato línea-a-línea de la puerta geométrica.

## 5. Puertas ejecutadas

validate:data (v7, 421 ítems, 100 términos) · validate:brujula · validate:todo-inventory · validate:atlas-contract (120 publicadas) · audit:partidos · audit:atlas · tsc raíz y web · vitest 463 · web:build · web:budget (3,28/3,30) · Playwright e2e 31/31 (Chromium del entorno vía PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH).
