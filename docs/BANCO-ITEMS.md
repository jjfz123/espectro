# Diseño del banco de ítems

Este documento explica **cómo se proponen las preguntas** de Espectro: por qué un test plano de 30 preguntas no puede mapear el espectro español completo, y qué método usamos para que el banco crezca de forma controlada hasta cubrir todas las corrientes —de las capas del marxismo a las ramas de la ultraderecha— sin convertirse en un cuestionario de 500 preguntas al azar.

## 1. La tesis: las preguntas escalan con las distinciones, no con los partidos

El error de los tests existentes no es tener «pocas preguntas»: es tener preguntas de una sola naturaleza. Con 30 ítems de impuestos, inmigración y autodeterminación puedes ordenar a PSOE, PP, VOX y Sumar, pero un estalinista y una luxemburguista contestan *idéntico* a todos ellos: ambos quieren nacionalizar la banca, subir los impuestos al capital y salir de la OTAN. Lo que los separa —partido de vanguardia o consejos obreros, balance de la URSS, socialismo en un país o internacionalismo— **no está en el cuestionario**, así que ninguna cantidad de preguntas de ese cuestionario los separará jamás.

Formalmente: el banco no es una lista de temas, es una **matriz de distinciones**. Cada par de corrientes vecinas (PCTE/PCE, ERC/Junts, PNV/Bildu, democristiano/liberal-conservador, VOX/Falange, CC/NC…) define una fila; cada fila exige al menos dos ítems donde ese par diverge de forma documentable. La cobertura del test no se mide en «número de preguntas» sino en **pares vecinos separados**.

De ahí la arquitectura: núcleo estable de 50 preguntas generales (modo rápido) + módulos de profundización por familia, institución, tema y territorio. El banco puede ser mucho mayor que cualquier recorrido: condiciones y selección modular impiden que una persona lo responda entero.

## 2. El método de las distinciones: cómo nace un ítem

Cada ítem del banco se deriva con el mismo procedimiento, y el PR que lo añade debe documentarlo:

1. **Elegir el par (o los pares) de corrientes vecinas** que el ítem debe separar. «Vecinas» = corrientes que el resto del test confunde. Ejemplo: PCTE y PCE/IU empatan en todo el eje económico.
2. **Localizar el hecho documentable donde divergen**: un punto de programa, una votación en el Congreso, una posición congresual, una campaña pública. Ejemplo: el PCTE rechaza las coaliciones «oportunistas» tipo IU/Sumar por principio congresual; el PCE lleva medio siglo dentro de ellas.
3. **Redactar la afirmación Likert más limpia posible** sobre esa divergencia: una sola idea, sin dobles negaciones, en un lenguaje que un simpatizante de *cada* lado firmaría como descripción justa de su postura.
4. **Registrar la hipótesis de discriminación** en `notas`: qué separa y qué respuesta se espera de cada corriente/partido (−2..+2). Esta hipótesis se valida después contra fuentes primarias (posición `verificada` con cita) y, tras el piloto, contra datos reales de usuarios.
5. **Decidir las cargas de eje**. Si la divergencia se proyecta limpiamente sobre un eje (más/menos centralización), el ítem carga ese eje. Si es *no lineal* —el balance de la URSS, la unilateralidad, la nuclear— el ítem va **solo-matching** (`ejes: []`): cuenta para la afinidad con partidos, no contamina el mapa. Este mecanismo es el que permite granularidad infinita sin inflar el número de ejes.

## 3. Taxonomía de corrientes cubiertas

El banco se organiza en módulos que se corresponden con las grandes familias, y dentro de cada módulo los ítems separan sus corrientes internas:

**Corrientes de la izquierda** (`corrientes-izquierda`)
marxismo-leninismo ortodoxo/estalinismo (PCTE, PCOE, PCPE) · eurocomunismo y frente amplio (PCE/IU) · trotskismo (Izquierda Revolucionaria, Corriente Roja) · maoísmo · hoxhaísmo · luxemburguismo · «rojipardismo»/socialpatriotismo (Frente Obrero) · anarcocomunismo y anarcosindicalismo (CNT/CGT como cultura política) · municipalismo libertario · asamblearismo institucional (CUP).
Distinciones-eje: vanguardia/consejos (`organizacion`), reforma/ruptura (`metodo-cambio`), internacionalismo/socialismo en un país (`internacionalismo`). Distinciones solo-matching: balance de la URSS, coaliciones amplias vs. pureza, abolir/conquistar el Estado, inmigración como «ejército de reserva» (el corte rojipardo).

**Socialdemocracia y reformismo** (`socialdemocracia-reformismo`)
tercera vía (sector PSOE) · ala izquierda del PSOE · socialismo democrático/ecosocialismo reformista (Sumar, Más Madrid, Compromís, Chunta) · populismo de izquierda (Podemos) · socialdemocracia antinacionalista y laicista (Izquierda Española).
Distinciones: OTAN (`atlantismo`), pactos con nacionalistas vs. igualdad territorial, regular el mercado vs. socializar sectores, renta básica vs. empleo garantizado, tope de alquileres, liderazgo carismático vs. partido de afiliados.

**Centro y liberalismo** (`centro-liberalismo`)
socioliberalismo (herencia Cs/UPyD, Volt) · liberalismo clásico · libertarianismo/anarcocapitalismo (P-LIB) · centrismo regionalista pragmático (PRC) · tecnocracia.
Distinciones: Estado mínimo vs. Estado garante, impuesto plano, cheque escolar, UE federal vs. UE de mercado, capitalización vs. reparto, y las libertades personales (cannabis, prostitución, gestación subrogada) que separan al liberal integral del conservador con retórica liberal.

**Corrientes de la derecha** (`corrientes-derecha`)
democracia cristiana · conservadurismo liberal (mainstream PP) · tecnocracia conservadora · tradicionalismo/carlismo · agrarismo conservador · neoconservadurismo.
Distinciones: aborto/eutanasia (derogar vs. convivir con la ley), Iglesia-Estado (`laicismo`), economía social de mercado vs. liberalismo duro, autonomismo pragmático vs. recentralización, consenso climático «con correcciones» vs. rechazo (frontera con la derecha radical), moral pública (`tradicion-moral`: la línea pro-LGTB vs. confesional).

**Derecha radical y ultraderecha** (`derecha-radical`)
nacional-conservadurismo económicamente liberal (VOX) · falangismo/nacionalsindicalismo (FE-JONS: anticapitalista, republicano, salida de UE/OTAN) · identitarismo nativista (Democracia Nacional, España 2000) · populismo digital antipolítico (SALF) · nacional-catolicismo · ultraderecha independentista (Aliança Catalana) · ramas europeas «liberales en costumbres».
Distinciones: mercado/nacionalsindicalismo/proteccionismo nativista (tres economías incompatibles bajo la misma etiqueta), monarquía/república (`monarquia`), OTAN (`atlantismo`), grados del discurso migratorio, LGTB (prohibición / indiferencia / instrumentalización), antipolítica.

**Nacionalismos y regionalismos** (`nacionalismos-regionalismos` + módulos territoriales)
Los generales (unilateralidad/pacto, independencia/confederalismo/foralismo, nación cívica/cultural, ordinalidad, pactismo) valen para cualquier periferia; los territoriales bajan al detalle: Catalunya (ERC/Junts/CUP/Aliança/PDeCAT), Euskadi-Navarra (PNV/EH Bildu/UPN/Geroa Bai; concierto, Navarra, euskera), Galicia (BNG y su frente interno), Andalucía (Adelante Andalucía, Nación Andaluza), Canarias (CC/NC/ASG/AHI; REF, moratoria turística, insularismo de isla), y la España vaciada como eje propio (Teruel Existe, Soria ¡YA!, UPL, PRC).

**Ecologismo y animalismo** (`verde-animalista`)
animalismo de derechos (PACMA) · ecologismo político (Verdes Equo) · ecosocialismo · ecologismo de mercado · decrecentismo.
Distinciones: derechos vs. bienestarismo (`animalismo`), caza, tauromaquia, nuclear (solo-matching: separa ecomodernistas de verdes clásicos *y* a la derecha de la izquierda), renovables vs. territorio, decrecimiento vs. crecimiento verde.

**Feminismos y moral pública** (`feminismos-moral`)
Los cortes que parten las familias por dentro: abolicionismo vs. regulacionismo de la prostitución, autodeterminación de género (el gran discriminante intra-izquierda), gestación subrogada, aborto (plazos/supuestos/libre), eutanasia, laicismo escolar, paridad, violencia de género como categoría penal.

**Sub-ejes transversales** (`internacionalismo`, `monarquia`, `atlantismo`, `laicismo`, `animalismo`): no son módulos sino dimensiones que cargan ítems de varios módulos, porque cortan el espectro en diagonal — hay republicanos falangistas y monárquicos socialistas, atlantistas socialdemócratas y antimilitaristas de extrema derecha.

## 4. Por qué esto cubre «todos los partidos»

Los ~6.300 partidos inscritos en el Registro del Ministerio del Interior no requieren 6.300 posicionamientos: la inmensa mayoría no concurre a nada. La estrategia es:

1. **El banco cubre corrientes, no partidos.** Un partido nuevo casi nunca exige ítems nuevos: exige *posiciones* sobre los ítems que ya existen. Cuando en 2024 apareció Aliança Catalana no hizo falta rediseñar el test: sus posiciones (independentismo + islamofobia) ya eran expresables en ítems de los módulos catalán y de derecha radical.
2. **Cobertura escalonada por actividad electoral** (vía infoelectoral): con representación → `verificada` (cita obligatoria); concurre sin escaño → `estimada` (etiquetada); inscrito sin actividad → `sin-datos` (listado, sin matching). El validador de CI lo hace cumplir.
3. **El test le habla a cada usuario de sus partidos**: el módulo territorial activa los partidos de su comunidad (a un canario se le muestran CC, NC, ASG, AHI junto a los estatales).

## 5. Reglas de redacción (resumen operativo)

1. Una afirmación Likert, **una sola idea**, ≤ ~180 caracteres, sin dobles negaciones.
2. **Neutralidad de marco**: un simpatizante de cada corriente implicada debe poder leer el ítem sin sentirse caricaturizado. Las palabras-bandera solo aparecen si el ítem mide precisamente la adhesión a ese marco.
3. **Polaridad equilibrada**: ~50% de ítems «positivos» (permitir/crear/subir) y ~50% «negativos» (prohibir/eliminar/reducir), registrada en el campo `polaridad` (el sesgo de polaridad altera las respuestas de forma sistemática; Kamoen & Holleman).
4. **Durabilidad**: nada de «el actual Gobierno» ni leyes coyunturales, salvo que definan la corriente; las divergencias se formulan como principios.
5. **Hipótesis explícita**: `notas` documenta qué discrimina el ítem y las respuestas esperadas. Un ítem que no sabe decir a quién separa no entra.
6. Todo ítem nuevo entra en `estado: "piloto"`; solo tras validación (discriminación real en datos + posiciones de partido verificadas) pasa a `activo`. Los retirados se marcan `retirado`, nunca se borran.
7. **Términos difíciles, explicados sin sobresimplificar**: todo ítem que use un término técnico o histórico (democracia orgánica, concierto económico, mochila austriaca, reintegracionismo…) lo referencia en su campo `terminos`, y el glosario (`data/glosario.json`) da una definición de consenso en palabras sencillas **más** el matiz cuando el término está en disputa (la definición de «autodeterminación» dice explícitamente que su aplicación fuera de contextos coloniales es discutida — eso no es relleno, es la definición honesta) y un enlace de referencia (Wikipedia). La interfaz lo muestra como una marca de ayuda junto al término. El validador exige que toda referencia exista y que ningún término quede huérfano.
8. **Marco de referencia**: si la afirmación solo es evaluable fijando antes el orden institucional (el sistema actual, un socialismo, un corporativismo fascista…), el ítem **declara ese supuesto** en el campo `marco` (`sistema-actual` | `sociedad-deseada`), y la interfaz lo muestra como contexto. Salvo indicación, un ítem describe el aquí y ahora. Es lo que separa «reconocer un sindicato único bajo las reglas vigentes» de «el sindicato vertical de un Estado corporativo», o «prohibir sindicatos bajo el capitalismo» de «que los sindicatos se disuelvan tras una transformación social»: la misma respuesta con marcos distintos es información distinta. El motor no puntúa `marco`; corrige el sesgo de encuadre de quien responde. Detalle y hoja de ruta en [investigacion/MARCO-DE-REFERENCIA.md](investigacion/MARCO-DE-REFERENCIA.md).
9. **Equifinalidad**: si una misma respuesta puede llegar desde los dos polos del eje que el ítem carga, el ítem va **solo-matching** (`ejes: []`). Casos canónicos: cerrar fronteras (rojipardismo de izquierda económica *y* nativismo de derecha), abolicionismo de la prostitución (feminismo *y* conservadurismo moral), Palestina/Israel (izquierda pro-palestina *y* antisionismo ultra frente al sionismo de VOX *y* el atlantismo liberal), rechazo del alineamiento con Trump (europeísmo institucional *y* antiamericanismo falangista). El ítem sigue discriminando partidos —para eso está el matching por pares—, pero no puede empujar el mapa de nadie en una dirección que no es la suya. La auditoría de equifinalidad es parte obligatoria de la revisión de cada tanda; en la primera se corrigieron 6 ítems.

## 6. Flujo del usuario

- **Modo rápido**: 50 preguntas generales, perfil provisional y ranking con cobertura e incertidumbre explícitas.
- **Modo exhaustivo**: conserva las 50 respuestas compatibles y añade una selección ciega de módulos según posición y CCAA; puede personalizarse sin revelar qué sugirió el cálculo. Las preguntas condicionales solo aparecen cuando aclaran un motivo. La interfaz calcula la duración sobre el itinerario visible y guarda el progreso localmente.
- Cada módulo respondido añade sub-ejes al mapa y afina el ranking (los partidos pequeños de esa familia dejan de empatar con los grandes).

## 7. Estado actual del banco

Esta sección se actualiza con cada ampliación; el recuento vivo lo da `npm run validate:data`.

El banco contiene **378 registros versionados**: 364 vigentes y 14 retirados que se conservan para trazabilidad. Entre los vigentes hay 255 ítems de eje, 88 solo-matching, 12 seguimientos condicionales y 9 solo-mapa. Toda entrada debe declarar en `notas` qué discrimina, qué coincidencias por motivos distintos son posibles y qué no debe inferirse; el esquema y el validador lo exigen.

| Módulo | Ítems | Módulo | Ítems |
|---|---|---|---|
| nucleo | 50 | nacionalismos-regionalismos | 17 |
| corrientes-izquierda | 43 | verde-animalista | 15 |
| socialdemocracia-reformismo | 20 | feminismos-moral | 15 |
| centro-liberalismo | 20 | territorial-canarias | 11 |
| corrientes-derecha | 24 | territorial-catalunya | 9 |
| derecha-radical | 22 | territorial-euskadi-navarra | 11 |
| territorial-andalucia | 8 | territorial-galicia | 5 |
| trabajo-estado-sindicatos | 28 | democracia-instituciones | 34 |
| geopolitica-defensa | 14 | energia-modelo-productivo | 11 |
| | | limites-antipluralismo | 7 |

Balance de polaridad vigente: 243 formulaciones positivas y 121 negativas (~33 % negativas). Sigue siendo una deuda del piloto; no se corrige invirtiendo frases mecánicamente, sino probando equivalencia de marco y retirando duplicados.

### Backlog de huecos conocidos (señalados en revisión, pendientes de futuras tandas)

- **Marxismo**: Cuba/Corea del Norte como referencias vivas (baja discriminación interna, prioridad baja).
- **Anarquismo**: pedagogía libertaria; servicios municipalizados vs. cooperativizados.
- **Liberalismo**: monarquía/república intra-liberal; dinero y banca central (patrón monetario, cripto) como marcador ancap puro.
- **Derecha conservadora**: Estado del bienestar democristiano vs. liberalismo duro (cubierto solo oblicuamente).
- **Derecha radical**: orden público duro (pena de muerte, prisión permanente ampliada) — excluido deliberadamente en esta tanda; chovinismo de bienestar (candidato a núcleo: toda la familia respondería igual).
- **Nacionalismos**: grupos parlamentarios propios vs. integración en grupos estatales; república como componente del proyecto nacional periférico; PER/subsidio agrario andaluz como distinción no lineal.
- **Verde-animalista**: ganadería extensiva como aliada ambiental (reverso en positivo de los prohibicionistas); festejos populares con animales (umbral intermedio); granjas peleteras (consenso creciente, prioridad baja).
- **Feminismos/moral**: presencia institucional de la religión en actos de Estado; verificación de edad para pornografía (separaría a los liberales de PSOE y PP a la vez).
- **Núcleo**: tercer indicador populista («no nos representan») para robustecer el eje populismo.
- **Voto protesta**: dejar escaños vacíos como protesta legítima (Escaños en Blanco) — un ítem solo-matching para el electorado antirrepresentativo.
- **Geopolítica**: China (rivalidad sistémica vs. pragmatismo comercial vs. referente campista) como complemento de los ítems de Israel/Palestina, Rusia, Trump, Sáhara y Ucrania ya integrados.
