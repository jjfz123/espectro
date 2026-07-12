# TODO nominal de cartografía política

Este documento es el cierre obligatorio, elemento por elemento. Una casilla solo se marca cuando la entidad ha sido revisada visual y metodológicamente; los contadores agregados no la sustituyen.

## Reglas de cierre

- Un partido se tacha cuando obtiene posición sólida con evidencia directa suficiente en Propiedad/mercado y Poder político, fuentes revisadas y moderadoras cuando procedan, o como «auditado sin coordenada/afinidad general». Este segundo cierre exige motivo y búsqueda reproducible, UI explícita y pruebas de que no se imputa un cero; jamás se fuerza una coordenada a un perfil monotemático o sin corpus.
- Una etiqueta de la imagen se tacha únicamente cuando está visible con ficha, discriminantes y fuente primaria/académica enlazada (o referencia instrumentada), se fusiona documentalmente con una corriente equivalente dejando la relación explícita, o se excluye individualmente por meme/ficción/no-concepto con justificación.
- Movimiento, forma de Estado, rasgo transversal o variante histórica real no se descarta por comodidad: debe representarse en la capa/faceta correcta y seguir localizable.
- No se mueven puntos manualmente para tapar carencias de evidencia. No se ocultan entidades para aprobar la auditoría.
- **Norma dura del atlas ideológico (no negociable).** El cuadrante de corrientes doctrinales —el plano continuo Economía×Sociedad y los tres cruces de ejes, con las ideologías nombradas (Falangismo 1934, Marxismo-leninismo, Distributismo, Anarcocapitalismo, Socialdemocracia clásica…), los desplegables de búsqueda y el punto del usuario— es la vista canónica y **solo puede crecer**. Toda intervención sobre él debe **mejorar su claridad y añadir ideologías con evidencia**; queda prohibido sustituirlo por una vista más pobre, esconderlo detrás de la vista por defecto, reducir el número de corrientes dibujadas o degradar su legibilidad. Cualquier cambio que muestre menos ideologías o menos claridad que el estado anterior **se rechaza y se revierte de inmediato**. No va a menos, nunca.
- Cada tanda cerrada actualiza esta lista, ejecuta los auditores y conserva las fuentes.
- Este archivo concentra el contrato completo. Que una tarea también figure en `TODO-PENDIENTES.md`, una auditoría o una conversación no permite omitirla aquí ni cerrarla por un total agregado.
- Ninguna casilla funcional se marca solo porque exista código: exige prueba automatizada proporcional al riesgo, inspección visual cuando corresponda y revisión adversarial del resultado final.
- **Sesión autónoma nocturna (orden del propietario, 2026-07-12).** Fable trabaja de forma independiente, sin pedir al propietario checks ni verificaciones intermedias, encadenando bloques de este TODO hasta completarlo. Las decisiones que antes se elevaban se resuelven con el criterio más conservador disponible y quedan documentadas como «decisión nocturna» reversible; la cola de verificación humana de URLs sigue siendo cola (no bloquea el avance). La autonomía **no relaja ninguna otra regla dura**: puertas completas reejecutadas por el integrador, revisión adversarial por tanda, «solo crece», citas en español, nada a `main` (PR solo con visto bueno expreso) y checkpoints continuos a la rama cloud.

## Modos del cuestionario, continuidad y privacidad de la respuesta

- [x] El modo rápido conserva exactamente 50 preguntas —las 40 originales más `dem-011`, `dem-014`, `dem-021`, `lab-006`, `ene-001`, `sd-002`, `fem-006`, `geo-002`, `geo-005` y `va-001`— y no incorpora preguntas específicas sobre ETA, partidos o corrientes nominales; manifiesto y prueba blindan los IDs.
- [x] El rápido oculta puntos, puntuaciones, dirección de cada respuesta y cualquier pista de «a qué lado» acerca hasta mostrar el perfil provisional final.
- [x] Al terminar el rápido se ofrecen dos acciones inequívocas: ver y conservar el resultado provisional o continuar el exhaustivo desde la primera pregunta pendiente, sin repetir ni perder ninguna respuesta.
- [x] El hito intermedio aparece una sola vez al alcanzar 150 preguntas administradas —incluida «Sin opinión»—: explica que ya existe profundidad suficiente, permite obtener el resultado intermedio o continuar y conserva respuestas, prioridades, seguimientos y contexto electoral.
- [x] Reanudar desde rápido, intermedio, recarga, actualización PWA o cierre del navegador lleva a la primera pendiente correcta; si la pregunta actual ya fue respondida antes de recargar, avanza a `primerSinResponder`, nunca duplica seguimientos ni altera el resultado ya calculado (tests/reanudacion-fronteras.test.ts: recarga en fin-rápido/módulos/revisión/resultados sin recálculo, `continuar` cae en la primera pendiente con índice apuntando a una respondida, seguimiento único tras recargar y limpieza del huérfano; + estado.test.ts y E2E de almacenamiento/PWA; 2026-07-12).
- [x] El exhaustivo cubre todo el banco vigente sin obligar a contestar preguntas no aplicables; «Sin opinión» no se trata como neutralidad ni como desacuerdo.
- [x] Solo preguntas esenciales activan seguimientos neutrales del tipo «has respondido X, ¿por qué?», con varias razones políticamente distintas, opción de no responder y sin pedir texto libre sensible.
- [x] El caso «los impuestos son un robo/no están justificados» distingue, como mínimo, crítica marxista, libertaria/anarcocapitalista y ultranacionalista sin inferir una corriente por la respuesta troncal.
- [x] Una misma respuesta puede coincidir entre ideologías por motivos distintos; el motor usa seguimientos y combinaciones de ejes, no asociaciones binarias de una pregunta a una etiqueta.
- [x] Tests de estado recorren rápido → provisional → exhaustivo, rápido → 150 → intermedio → exhaustivo, recarga real en cada frontera (fin-rápido, módulos, hito, oferta dinámica, revisión y resultados), reanudación en la primera pendiente correcta aunque el índice guardado apunte a una respondida, no duplicación de seguimientos al recargar (y limpieza del huérfano si cambió el padre), almacenamiento bloqueado, sesión caducada, cambio de versión del instrumento y actualización PWA (tests/reanudacion-fronteras.test.ts + estado.test.ts + oferta-modulos.test.ts + E2E de almacenamiento/PWA; 2026-07-12).
- [x] El exhaustivo es adaptativo (orden del propietario, 2026-07-12): el afinamiento ideológico solo se administra si el perfil proyectado lo desbloquea, y si las respuestas mueven el perfil durante el recorrido, los bloques recién desbloqueados se ofrecen EN CIEGO en las fronteras de módulo y al completar la secuencia — sin nombres, sin recuentos (solo un tramo de duración en palabras), con piso de evidencia de 4 ítems en el eje gatillo, cortafuegos anti-bucle (nada de la misma familia recién respondida; núcleo exento) y sin re-ofrecer lo rechazado ni borrar nunca respuestas. Contrato: 10 tests de estado + 2 E2E con guardia anti-fuga de recuentos + revisión adversarial holística triada (AUDITORIA §18).
- [x] Los módulos generales van primero y el afinamiento ideológico al final (núcleo → generales → transversales → territorio → afinamiento → antipluralismo), con test que fija el orden relativo.
- [x] Tema claro/oscuro/sistema conmutable desde la cabecera (◐), persistido aparte de la sesión, aplicado antes del primer pintado (anti-FOUC), con el cubo 3D reaccionando en vivo y «Borrar datos» eliminándolo también; el enlace compartido solo LEE esa preferencia (contrato E2E).
- [x] El tramo de cobertura baja del ranking no compite tipográficamente con el principal (porcentaje apagado «orientativo · N ítems», barra atenuada, separador único con texto adaptado cuando toda la lista es de cobertura baja) y «Máximos por afinidad» prioriza resultados con cobertura comparable.
- [x] La ruta de Revisión re-evalúa desbloqueos al editar respuestas que cruzan umbrales (al volver de la edición, si el perfil cruza un umbral con módulos no ofrecidos ni rechazados aparece la oferta ciega; rechazar devuelve a revisión, aceptar lleva a la primera pregunta nueva, y el libro de ofrecidos impide bucles de confirmación al reeditar; campo ofertaDesdeRevision persistido y saneado; 6 tests con construcción determinista de frontera de umbral en tests/revision-desbloqueos.test.ts; AUDITORIA §26 resuelve la decisión aplazada de §18; 2026-07-12).
- [x] Equilibrar los solapes y umbrales de desbloqueo entre familias (asimetría estructural documentada por la revisión adversarial: a distancias simétricas del centro no se desbloquea el mismo número de módulos a izquierda y derecha) (tres ajustes: banda de socialdemocracia −60..15 espejo exacto de centro −15..60; feminismos-moral hasta 35 —los debates morales son diagnósticos también en la franja conservadora moderada hasta que a +40 releva derecha-radical—; identidad-cultura pasa a `siempre` como el resto de su familia generales; barrido económico ±5..±90 y social ±5..±70 con 0 asimetrías; excepciones estructurales documentadas —ecología/territorial abren un módulo cuyo contenido ES el polo—; contrato en tests/simetria-desbloqueos.test.ts; AUDITORIA §27; 2026-07-12).

## Cobertura y neutralidad del instrumento

- [ ] Poder y democracia separan rechazo del parlamentarismo/Estado institucional, pluralismo, separación de poderes, democracia representativa, democracia directa y grado general de democratización.
- [ ] Se miden por separado revocación popular de cargos, elección directa de jueces, mandatos limitados, reelección, independencia judicial y límites/controles al ejecutivo.
- [ ] Organización política distingue partido de cuadros o masas, centralismo democrático, pluralismo interno, liderazgos personalistas, primarias, mandato de base y autonomía territorial de la organización.
- [ ] Estado y trabajo separan intervención estatal, propiedad/coordinación económica, poder proletario en el lugar de trabajo, autonomía sindical, concertación, corporativismo y sindicalismo revolucionario soreliano.
- [ ] Religión usa una escala explicada y no equidistante por etiquetas: ateísmo de Estado ↔ laicismo ↔ aconfesionalidad ↔ confesionalidad ↔ teocracia, distinguiendo libertad de conciencia de privilegio institucional.
- [ ] Modelo territorial distingue Estado unitario/centralista, descentralización administrativa, autonomías, federalismo y confederalismo; independencia y unilateralidad no se deducen de querer más descentralización.
- [ ] Política exterior separa europeísmo, atlantismo, no alineamiento, pacifismo, uso de la fuerza, aislacionismo, internacionalismo, armas nucleares, Sáhara Occidental e hipotética integración ibérica con Portugal.
- [ ] Energía separa ecologismo, decrecimiento/ecomodernismo y apoyo o rechazo a la energía nuclear; «nuclear verde» no determina por sí sola izquierda/derecha ni política de armamento nuclear.
- [ ] Método de cambio y violencia diferencia reforma, ruptura, revolución, desobediencia y violencia política; jamás se infiere apoyo a ETA, terrorismo o una organización violenta desde soberanismo, autoritarismo o radicalidad económica.
- [ ] Reclamos históricos, forma de Estado, monarquía/republicanismo, memoria, derechos civiles, aborto, migración, ecología, animalismo y tecnología tienen facetas propias cuando no constituyen una ideología integral.
- [ ] Cada región publicable del atlas tiene preguntas neutrales suficientes para aproximarla y descartarla, con al menos una prueba sintética positiva, una vecina adversarial y una contradicción decisiva.
- [ ] Se auditan carga, solapamiento, rutas imposibles y dependencia de una sola pregunta para las 94 regiones actuales antes de afirmar que todas son alcanzables.
- [ ] Las preguntas nuevas se revisan en español claro, sin nombres de partidos/corrientes, doble negación, presuposiciones, jerga militante o formulaciones que revelen la puntuación.
- [ ] Fascismo italiano queda periodizado nominalmente en San Sepolcro/Fasci di Combattimento, premarcha/régimen y Salò, con fuentes por fase, preguntas no nominales y sin promediar posiciones incompatibles.
- [ ] Carlismo tradicionalista, Partido Carlista/socialismo autogestionario y escisiones/etapas tienen recibos separados que prueban qué preguntas los acercan y cuáles los distinguen.
- [ ] Aceleracionismo neonazi/Atomwaffen se trata como arquetipo de seguridad no identitario, con fuente española aportada, veto de gamificación/captación y umbral reforzado de coincidencias.
- [x] Revisar LeftValues y RightValues como referencia comparada (docs/investigacion/LEFTVALUES-RIGHTVALUES-REVISION.md, 2026-07-12): son 7 ejes cada uno (no 12); reforma/revolución ya se mide MEJOR en Espectro (10 ítems sourced vs slider genérico); licencia MIT pero sin metodología publicada, con el sesgo estructural heredado de 8values (issue #69) y RightValues con tres versiones inestables; nada se copió literal. Recomendaciones mapeadas: hueco real de modernidad-vs-ruralismo NO violento (prioritario), ciencia/utopía y tercera-vía distributista como solo-matching; race-realism EXCLUIDO como Likert por la norma de arquetipo de seguridad.
- [x] Diseñar los ítems derivados de la revisión comparada: modernidad/tecnología vs. tradición/ruralismo no violento (separado del arquetipo de seguridad aceleracionista), materialismo histórico vs. utopismo (solo-matching en corrientes-izquierda) y hueco distributista de propiedad repartida (solo-matching), con revisión de neutralidad y sin copiar enunciados de terceros (cul-015/cul-016 par a dos voces en identidad-cultura, izq-047/izq-048 ciencia-vs-prefiguración, der-027 distributista; los cinco piloto, solo-matching, con anclas «Esperado» en notas; glosario +materialismo-historico +distributismo cableados por `terminos`; hashSemantico actualizado como cambio aditivo consciente; puertas completas y revisión de neutralidad en AUDITORIA §21; 2026-07-12).
- [ ] Todo lo que ve el usuario y las citas de las fichas están en español (regla del propietario, 2026-07-11): las citas nuevas usan ediciones canónicas en español y «(en inglés)» solo se admite como excepción marcada y temporal; el retrofit de las citas ya existentes en otros idiomas se planifica como tanda propia más adelante.

## Resultado ideológico y explicación metodológica

- [ ] La primera brújula mantiene la gramática espacial de la imagen seria de referencia: plano continuo y degradado, muchas regiones proporcionadas, sin copiar memes ni usar la imagen como evidencia factual.
- [ ] La referencia visual queda archivada con URL de origen, fecha de consulta, dimensiones/hash y una transcripción contrastada de sus 178 rótulos; el inventario permite demostrar que se examinó completa y no a partir de una miniatura o de memoria.
- [ ] El diseño final es una obra original adaptada a España: la imagen solo inspira densidad y gramática espacial, no se calcan polígonos, textos, coordenadas ni decisiones doctrinales sin investigación independiente.
- [ ] Los dos ejes del primer plano tienen semántica, polaridad y leyenda estables —Propiedad/mercado y Poder político—; cada extremo y el centro se explican en español y ningún segundo eje oculto desplaza puntos dentro de ese plano.
- [ ] El degradado continuo funciona también con daltonismo, alto contraste e impresión monocroma; color, hover o posición sin texto nunca son la única vía para entender una región.
- [ ] Ninguna entrada real desaparece: las ideologías integrales ocupan regiones; facetas, contextos, diagnósticos y modelos históricos siguen buscables y explicados fuera del Voronoi identitario.
- [ ] En escritorio el nombre y resumen aparecen con hover y foco; en móvil con toque; el mapa sigue siendo comprensible sin hover, admite teclado y no muestra una nube ilegible de rótulos permanentes.
- [ ] «Más información» abre una ficha breve en español con definición, ubicación razonada, discriminantes, razones a favor/en contra de la cercanía, cautelas y fuentes, y esa misma ficha contextualiza el resultado del usuario.
- [ ] Si la persona cae cerca de una corriente sin partido —anarcocapitalismo, ramas anarquistas, posadismo u otra— el resultado la muestra como proximidad doctrinal aunque no exista oferta electoral comparable.
- [ ] La explicación desglosa cada eje y el porqué de la posición antes de listar partidos cercanos; nunca sustituye ideología por intención de voto ni presenta proximidad como pertenencia.
- [ ] Poblar el cuadrante de corrientes doctrinales (hoy 23 de 61 dibujadas en el plano Economía×Sociedad) con más ideologías con evidencia trazable, mejorando su claridad; toda ampliación **añade** corrientes y legibilidad, nunca reduce (ver norma dura del atlas ideológico en «Reglas de cierre»).
- [ ] Los partidos aparecen en el cuadrante mapeados en su **posición real documentada** (con fuentes, no aproximada a ojo), junto a las corrientes; el atlas es **curable** desde los datos: se pueden limpiar entradas dudosas o duplicadas y añadir corrientes/partidos nuevos, siempre respetando la norma dura (solo crece en claridad e ideologías).
- [x] La vista de profundidad es el **único modo** (orden del propietario, 2026-07-12, que supera la versión anterior «estado por defecto conmutable»): el cuadrante rico se muestra desplegado sin exigir un clic, el conmutador «Incluir corrientes de profundidad» se retira y no existe variante que esconda corrientes. Contrato E2E: sin conmutadores, atlas completo y buscador siempre operativo.
- [x] ~~La **vista simple** como alternativa conmutable~~ RETIRADA por orden del propietario (2026-07-12): «no tener una parte simplificada». El conmutador «Explorar corrientes ideológicas» desaparece y el atlas completo con corrientes es la única presentación; los rótulos siguen apareciendo solo al pasar, enfocar o tocar (sin sopa visual). E2E reescrito con el contrato inverso.
- [x] Ítems del campo comunista + PCE(r) con aviso legal (2026-07-12; derivados del informe de investigación del campo comunista y del precedente editorial de doctrinas violentas documentadas): cinco ítems piloto solo-matching que operativizan las fracturas del informe —izq-049 momento de la degeneración de la URSS (1956), izq-050 tesis de la reconstitución, izq-051 clase vs. nuevos movimientos en formulación clínica, izq-052 Cuba/Venezuela como referencias actuales, izq-053 entrismo vs. partido propio— con anclas «Esperado» por familia y coincidencias entre ideologías declaradas; y ficha PCE(r) 1975-2006 como registro doctrinal histórico con sensibilidad violenta, advertencia legal expresa (brazo político de los GRAPO según la Audiencia Nacional; suspendido 2003, disuelto 2006; pertenecer o colaborar es delito), triple llave 6/0,65/92, seis posiciones a calidad baja y doble veto hasta la tanda de pasajes; EHAK diferido con motivo (partido-vehículo sin corpus doctrinal propio: un hueco antes que una inferencia); hashSemantico actualizado como cambio aditivo consciente.
- [x] Enciclopedia ideológica (orden del propietario, 2026-07-12): entrada propia en la portada para explorar TODAS las corrientes documentadas sin hacer el test — buscador con normalización de acentos, fichas con variante datada, definición y fuentes marco (InformacionIdeologia con origen «selección»), entradas sensibles con aviso clínico y sin asignar identidad, contador de proyecciones publicadas, y contrato E2E de que explorar no añade respuestas ni cambia la fase.
- [x] En la vista de profundidad, cada punto tiene un objetivo de clic/toque real ≥44×44 px aunque su forma sea pequeña: corrientes o partidos agrupados y diminutos (p. ej. CUP, hoy inclicable por su tamaño) se separan, reciben halo de foco o se desambiguan al acercar, sin que ninguno quede inaccesible con ratón, teclado o táctil.
- [x] Los planos adicionales y el cubo explican qué miden, qué no miden, cobertura/incertidumbre y por qué pueden discrepar del primer plano (AyudaEjes en planos y cubo; contador «En este plano: N de M» y «nunca se dibuja una posición inventada» por plano; el cubo declara que solo resume tres ejes, remite al perfil por facetas, avisa de distancia geométrica orientativa y de que sin evidencia no se dibuja el punto; discrepancia explicada en la intro de cruces y en la entrada del cubo («cada plano ignora el tercer eje»); contratos en tests/mapa-explicaciones.test.ts; 2026-07-12).
- [x] La limitación metodológica es visible: ejes normativos, datos autodeclarados, cobertura desigual, error de medición, fecha de corte y diferencia entre doctrina, programa, discurso y conducta (sección «Limitaciones que conviene tener delante» en la vista de Metodología con las seis nombradas y sin prometer precisión; contrato en tests/metodologia-limitaciones.test.ts; además cobertura/provisional ya avisan en línea y el marcador de doble lectura muestra su corte; 2026-07-12).
- [x] Las corrientes sensibles o violentas usan lenguaje clínico, no gamificado, requieren evidencia combinada y no aparecen en capturas predeterminadas ni como identidad afirmada (lenguaje clínico en ficha y enciclopedia con negación expresa de pertenencia/identidad; evidencia combinada = triple llave ítems≥3 + cobertura≥0,5 + umbral≥78 ahora OBLIGATORIA para toda referencia sensible en el validador; las tarjetas compartidas no dibujan ninguna zona del atlas; nada gamificado alrededor; contrato quíntuple en tests/corrientes-sensibles.test.ts; 2026-07-12).
- [ ] El resultado canónico prioriza facetas explicadas e incertidumbre; atlas y partido cercano son capas opcionales posteriores. La decisión queda cerrada y enlazada en `representacion-ideologica-visual.md` tras investigación comparada en inglés y español.
- [ ] La capa de partidos permite alternar «más representativos», «más afines» y «todos», explica por qué se limita cada vista y nunca usa tamaño, orden o visibilidad inicial para sugerir que una formación mayoritaria es más recomendable.
- [x] La geometría tiene regresiones nominales para los fallos reportados (tests/geometria-regresiones-nominales.test.ts, 2026-07-12): BNG no ocupa el extremo anarquista (Poder > −75 y cero ítems con carga cruzada fuerte autoridad×territorial en todo el banco); Falangismo/FE-JONS no salta de lado económico por una pregunta bandera (estabilidad dejar-uno-fuera sobre sus 6 anclas); Distributismo queda EXCLUIDO —no centrado— del par Propiedad×Poder mientras su eje institucional tenga <4 anclas.
- [ ] Una auditoría de vecindad recorre cada región y sus fronteras: corrientes doctrinalmente próximas comparten borde o distancia razonable, contradicciones fuertes no quedan como sinónimos espaciales y cualquier excepción queda documentada, no corregida a ojo.

## Partidos, elecciones y doble lectura

- [ ] El criterio de cobertura queda reproducible: generales y autonómicas con umbral aproximado ≥0,02 % cuando haya datos fiables, más organizaciones históricas activas que continúan presentándose y familias doctrinales españolas relevantes.
- [x] Las 21 convocatorias y 323 candidaturas distinguen partido, coalición, componente, marca y fecha; nunca heredan posiciones ni actividad entre entidades relacionadas (tipos de relación misma-organizacion/organizacion-territorial/coalicion/componente/sucesora que solo identifican actores; tests/candidaturas-sin-herencia.test.ts: la coalición compara solo sus posiciones y no absorbe las del componente, una marca histórica no entra en la selección por venir enlazada, y ningún perfil es misma-organizacion de dos papeletas de la misma convocatoria; validador de perfiles existentes y sin duplicar por candidatura; E2E de Podemos sin heredar la candidatura Sumar; 2026-07-12).
- [ ] El [anexo nominal de 323 candidaturas](./TODO-CANDIDATURAS.md) está íntegro y cerrado: cada papeleta conserva recibo `perfil enlazado | inventariada sin perfil | excluida con motivo`, sin duplicar una formación como si fueran partidos distintos.
- [x] PSOE, PP, VOX y Movimiento Sumar tienen dos marcadores fechados y comparables: programa/posición formal y conducta/discurso observado, con fuentes por ítem y disclaimer de que ninguno es «la verdad esencial» del partido (dobleLectura con 5/6/9/4 posiciones de contraste; disclaimer con corte del base y periodo del contraste siempre visibles en el marcador; unit de transporte + E2E de renderizado + validador de capa; triaje del dosier en AUDITORIA §20; 2026-07-12).
- [x] PSOE documenta compromisos cumplidos, parciales e incumplidos sin fabricar un porcentaje global; la derogación/reforma de la ley mordaza queda como caso explicado y fechado (estadoCompromiso por ítem en la capa de contraste, renderizado en DetallePartido; dem-021 bloqueado con cronología; la advertencia declara expresamente que no se inventa porcentaje global; 2026-07-12).
- [x] El PSOE tiene además un perfil histórico diferenciado «PSOE de Felipe González» (1982-1996: reconversiones industriales, referéndum OTAN, primeras privatizaciones) separado del PSOE actual, con fuentes de época propias y sin heredar posiciones en ninguna dirección (aportación del propietario, 2026-07-11) (referencia psoe-felipista-1982-1996 con 11 posiciones de época BOE/investidura, GAL excluido con advertencia, auditoría adversarial semántica cerrada sin cambios de valor en AUDITORIA §23; publicada en mapa y afinidad por decisión editorial del 2026-07-12 tras la tanda de pasajes literales (9/11 posiciones con pasaje verbatim BOE/investidura cotejada; nuc-001 y dem-032 como cita-título a calidad media, cotejo humano en cola); 2026-07-12).
- [x] PP documenta su programa y sus declaraciones/actuaciones recientes, incluidos los matices y cambios verificables sobre aborto, sin convertir una noticia aislada en posición permanente (base fem-006 −2 + contraste fem-006 −1 con advertencia que veta esa extrapolación; añadidos nuc-001 y fem-001 con ventana ampliada a 2024-07-23 y etiquetado expreso de gobiernos autonómicos; AUDITORIA §20; 2026-07-12).
- [x] VOX documenta por separado programa y giro discursivo/estratégico reciente —incluido el actor o corriente citado por el usuario, cuya denominación exacta debe verificarse antes de publicarla— con ventana temporal, atribución y cautela (9 posiciones de contraste 2026 con ventana; cláusula ACOM de no-atribución causal en la advertencia; giro discursivo eco-010 fechado con cita; corregido el error factual «primera entrada en un gobierno autonómico» → regreso tras las coaliciones 2022-2024; 2026-07-12).
- [x] Movimiento Sumar distingue programa de coalición, conducta propia y posiciones de componentes; Podemos se presenta separado cuando corresponde y no hereda la candidatura Sumar (capa base reetiquetada «Programa de 2023 y posición formal» con mezcla declarada; contraste propio con 4 posiciones auditadas; divergencias de componentes nominales en cat-006/ter-003/sd-005 —Compromís y CHA rompiendo disciplina, Comuns a favor—; Podemos con perfil separado y E2E que fija que no aparece como octava candidatura; 2026-07-12).
- [x] La afinidad ofrece selector programa/conducta o muestra ambos valores sin mezclarlos en un porcentaje opaco; cobertura y fecha acompañan siempre cada marcador (doble marcador con puntuaciones separadas jamás promediadas; ítems comparados + cobertura en ambos; corte documental del base y periodo del contraste visibles incluso sin datos comparables; E2E del renderizado; 2026-07-12).
- [x] Perfiles monotemáticos o sin datos suficientes —por ejemplo Escaños en Blanco y coaliciones sin corpus— no reciben afinidad general espuria y explican exactamente qué puede compararse (esPerfilComparable excluye monotemáticos y sin-datos del universo del ranking con test de ranking vacío en edge-cases; espacio y principales los excluyen con motivo nominal; la sección «Coincidencias específicas» compara solo el punto documentado con fuente y renuncia expresamente al porcentaje general; fila sin-datos explicada; contratos en tests/monotematico-ui.test.ts; validador exige monotemático = 1-3 posiciones solo-matching verificadas; 2026-07-12).
- [ ] La clasificación territorial no arrastra automáticamente economía, sociedad, democracia o violencia; cada punto del primer plano usa solo evidencia válida para sus macroejes.
- [ ] Cada uno de los 65 perfiles tiene recibo nominal de coordenada en el primer plano y en cada plano adicional publicable: valores por eje, cobertura, fuentes/grupos deduplicados, incertidumbre, fecha y motivo de exclusión cuando no alcance el umbral.
- [ ] La inspección visual partido por partido compara punto, ficha y evidencia y prueba que ninguna formación se ha desplazado para evitar solapes; la anticolisión gráfica mueve rótulos, jamás la coordenada política.
- [ ] Casos de igual coordenada o afinidad por razones distintas conservan explicaciones distintas y no se separan con ruido artificial; los seguimientos doctrinales explican la coincidencia sin inventar precisión.

## Pluralidad territorial española

- [ ] León distingue autonomía leonesa, leonesismo regional, provincialismo, El Bierzo y sus organizaciones; no confunde comunidad autónoma propia con independencia estatal.
- [ ] Andalucía distingue deuda histórica, andalucismo, soberanismo e izquierda estatal; Adelante Andalucía y Por Andalucía mantienen programas, candidaturas y posiciones independientes.
- [ ] Canarias cubre canarismo, autonomismo, insularismo y soberanismo, y diferencia Coalición Canaria, Nueva Canarias y las formaciones pendientes sin herencia automática.
- [ ] Catalunya separa independentismo de derecha e izquierda, unilateralidad, federalismo/confederalismo, lengua, modelo social y estrategia institucional; ERC, Junts, CUP, Aliança y demás no comparten perfil por ser soberanistas.
- [ ] Euskadi/Navarra separa soberanía, foralidad, modelo social, memoria y medios políticos; finalidad histórica atribuida a ETA y apoyo/rechazo de la violencia nunca se colapsan en una sola variable ni se incluyen en el rápido.
- [ ] Galicia, Aragón, Comunitat Valenciana, Castilla y León/Bierzo, Castilla-La Mancha, Baleares, Asturias, Cantabria, Murcia, Extremadura, La Rioja, Madrid, Ceuta y Melilla reciben el mismo control de identidad exacta cuando haya candidaturas relevantes.
- [ ] Reclamos territoriales históricos, encaje de Portugal, Sáhara Occidental y relaciones centro/periferia se presentan como posiciones separadas y fechadas, no como un único eje nacionalista.

## Sindicatos (14)

- [ ] El matching sindical se presenta separado del partidista y compara solo facetas con evidencia suficiente; sector, territorio, representatividad y fecha no se confunden con ideología general.
- [ ] `anpe` — ANPE - Sindicato Independiente.
- [ ] `ccoo` — Comisiones Obreras.
- [ ] `cgt` — Confederación General del Trabajo.
- [ ] `cig` — Confederación Intersindical Galega.
- [ ] `cnt` — Confederación Nacional del Trabajo.
- [ ] `csif` — Central Sindical Independiente y de Funcionarios.
- [ ] `ela` — Eusko Langileen Alkartasuna - Solidaridad de los Trabajadores Vascos.
- [ ] `lab` — Langile Abertzaleen Batzordeak.
- [ ] `sat` — Sindicato Andaluz de Trabajadores y Trabajadoras.
- [ ] `satse` — Sindicato de Enfermería.
- [ ] `solidaridad` — Solidaridad.
- [ ] `stes` — Confederación de STEs-Intersindical (Sindicatos de Trabajadores y Trabajadoras de la Enseñanza).
- [ ] `ugt` — Unión General de Trabajadoras y Trabajadores.
- [ ] `uso` — Unión Sindical Obrera.
- [ ] Tests adversariales evitan que rechazo fiscal, estatismo, nacionalismo o radicalidad laboral hagan coincidir sindicatos distintos por una sola posición bandera.
- [ ] Cada sindicato conserva recibo individual de fuente/fecha, poder laboral, autonomía, financiación y organización, además de sector, territorio y representatividad; termina como posición suficiente o `auditado-no-mapa`, nunca con cero inventado.
- [x] El ranking sindical no publica ni ordena un 100 % sostenido por una sola coincidencia: mínimos de ítems/cobertura son bloqueantes, no una mera insignia de baja cobertura.
- [ ] Sector y territorio del usuario filtran o contextualizan ANPE/SATSE/STEs, CIG/ELA/LAB, SAT y demás; vectores idénticos no se desempatan fingiendo afinidad ideológica.
- [ ] Un auditor sindical específico deduplica documentos, exige localizadores y busca contraejemplos CCOO/UGT, ELA/LAB, ANPE/SATSE y corpus escaso; ninguna de las 14 fichas se cierra solo con el validador genérico.
- [x] Denominador y ranking sindical comparten exactamente el mismo universo publicable: perfiles `sin-datos`, monotemáticos o ajenos al corpus no pueden hacer desaparecer otra afinidad al contestar más ramas.
- [x] El filtro territorial distingue sindicato sectorial nacional, sectorial con CCAA y organización territorial; ningún `ccaa` ausente convierte por accidente un perfil autonómico/territorial en estatal.

## Calidad de producto, web, PWA y futura app

- [ ] Portada, pregunta, hitos, resultados, rankings, atlas, fichas, capturas y estados de error conservan el lenguaje visual cuidado en 320/360/390 px, tableta y escritorio; no basta con que no desborden.
- [ ] Auditoría visual con capturas de referencia cubre modo claro/oscuro, zoom 200 %, textos largos, fuentes que fallan, catálogos abiertos/cerrados, teclado, lector de pantalla y puntero táctil.
- [ ] Bugs y edge cases cubren navegación Atrás/Adelante, doble toque, clic repetido, cambios de CCAA/elección, datos incompletos, URLs hostiles, almacenamiento/cuota bloqueados, offline, actualización y recuperación 3D.
- [ ] La PWA es instalable, actualizable y utilizable offline en Android, iOS/Safari y escritorio; se valida el artefacto recién construido, nunca un `dist` antiguo.
- [ ] La base separa motor, datos versionados, persistencia y UI para reutilizarlos después con Capacitor u otro contenedor sin mantener un segundo instrumento divergente.
- [ ] Antes de una app de tienda se resuelven History API, safe areas, teclado virtual, compartir/guardar archivos, permisos mínimos, actualización/migración de datos y pruebas en dispositivos reales.
- [ ] CI ejecuta datos, TypeScript, unitarias, integración, E2E Chromium/Firefox/WebKit, accesibilidad, presupuestos, PWA offline y comprobación de versión; pruebas manuales reales quedan registradas, no simuladas como automáticas.
- [ ] Privacidad E2E confirma cero respuestas/prioridades en red, logs o telemetría, ausencia de terceros, borrado/caducidad local, CSP y Referrer-Policy; el fragmento compartido solo nace bajo gesto expreso.
- [ ] WCAG 2.2 AA se comprueba en foco, contraste, nombre/rol/valor, reduced motion, zoom 200 % y reflow; Lighthouse/CWV del build desplegado registra LCP, CLS e INP, no solo axe y bytes.
- [ ] Smoke del commit desplegado por HTTPS comprueba fallback SPA, headers, service worker/cache/rollback, instalación/offline y apertura de una URL compartida sin tocar el estado local.

## Proceso de cierre y publicación

- [ ] Cada subagente trabaja en archivos asignados o solo lectura, declara su diff y no hace commit/push; la raíz integra y revisa para evitar colisiones y cambios huérfanos. Todo encargo fija como base el HEAD vigente de la rama de trabajo en el momento del lanzamiento (sha citado en el propio encargo) y declara sus ficheros calientes; si la raíz avanza uno de ellos en vuelo, la colisión se anota y se resuelve por triaje en la reintegración, nunca pisando la versión ya integrada (regla añadida tras la base vieja del encargo de la derecha, 2026-07-12).
- [ ] Toda tanda recibe revisión adversarial independiente con hallazgos P0/P1/P2 y se corrige antes de marcar sus casillas.
- [ ] `git diff --check`, árbol revisado, matriz completa verde y smoke visual final son obligatorios antes de crear un commit.
- [ ] No se hace push durante la auditoría; primero se publica la rama `claude/espectro-political-vaa-3d35l3`, se comprueba el despliegue y solo después, con decisión explícita, se promueve a `main`.
- [x] El generador nominal actualiza únicamente partidos/etiquetas y preserva todas las demás secciones y casillas; nunca puede regenerar el formato antiguo ni borrar el contrato por redirección accidental.
- [x] El generador del anexo electoral preserva las 323 casillas ya revisadas y escribe atómicamente; regenerar convocatorias no reinicia el trabajo nominal.
- [x] CI separa `validate:todo-inventory` para cambios incrementales del gate `validate:todo --require-closed`, reservado a release; la rama puede trabajar con casillas abiertas sin fingir cierre.
- [ ] Reintegrar la nueva rama de Claude en una tanda aislada: registrar ref/SHA base y commits exclusivos, comparar `git diff --name-status` y `git range-diff`, clasificar cada cambio como nuevo/duplicado/conflictivo, integrar solo sobre árbol limpio mediante merge o cherry-pick auditable, resolver semánticamente archivos calientes y repetir datos, TODO, TypeScript, Vitest, build, presupuestos, Playwright y smoke visual antes de publicar; nunca sobrescribir esta rama por fecha ni usar un merge ciego.

## Ranking y presentación de partidos

- [x] Orden canónico estrictamente descendente por la afinidad visible, con desempate estable y cobertura separada.
- [x] Bloque compacto de partidos principales: siete candidaturas más votadas de las generales de 2023 con perfil, más Podemos como referencia separada y explicada, sin fingir que fue candidatura propia.
- [x] Aviso visible en el bloque principal: orden exclusivo por representación/votos, no recomendación ni priorización de Espectro; el objetivo es encontrar afinidades en toda la pluralidad y el ranking personal aparece debajo.
- [x] Bloque separado de máximos reales por afinidad, sin duplicaciones ni posiciones ordinales engañosas.
- [x] Resto de formaciones accesible mediante un desplegable nativo, conservando cobertura, fuentes, doble lectura y detalle.
- [x] Pruebas de regresión de orden, convocatoria, coaliciones/componentes, empates, 150 respuestas, móvil y axe.

## Investigación, fuentes y calibración

- [ ] Revisión bilingüe de métodos mejores que un «political compass» simple: literatura académica y documentación primaria sobre escalas multidimensionales, tipologías, incertidumbre, perfiles narrativos y visualización; se publica síntesis en español con enlaces.
- [ ] La elección del diagrama se justifica por comprensión, capacidad discriminante, accesibilidad y honestidad, no solo por parecido estético con la imagen de referencia.
- [ ] Se revisa `estadodelmce.netlify.app` como benchmark aportado por el usuario y se separan sus ideas útiles de cualquier afirmación política que requiera fuente independiente.
- [ ] Fuentes españolas, oficiales, programas, estatutos, actas y literatura académica tienen prioridad; prensa y entrevistas se fechan/atribuyen, y recursos sin versión española muestran «(en inglés)», «(en francés)» u otro idioma real.
- [ ] Cada cita codificada conserva pasaje/localizador suficiente para que otra persona pueda reproducir la posición; la URL por sí sola no acredita un valor ni una coordenada.
- [x] Programas, entrevistas, declaraciones y conducta parlamentaria se versionan por ventana temporal; contradicción y cambio se muestran, no se resuelven escogiendo solo la fuente conveniente (ventanas desde/hasta de la doble lectura con periodo y corte visibles y capas jamás promediadas; perfiles de época separados sin herencia —felipismo 1982-1996—; tipo y fecha por fuente con contraste 100% fechado por test; divergencia dicho/hecho codificada por conducta y anotada, Metodología lo declara; deuda de fechas en base/referencias acotada por trinquete «solo decrece» en tests/fechas-fuentes-ratchet.test.ts (161 partidos + 72 referencias heredadas tras el lote de §38, en cola de tandas); 2026-07-12).
- [ ] El piloto mide fiabilidad por faceta, discriminación, no respuesta, orden, rutas condicionales y funcionamiento diferencial; los porcentajes de afinidad y umbrales se describen como no calibrados hasta disponer de datos.
- [ ] La revisión doctrinal cubre explícitamente anarquismos, anarcocapitalismos/libertarismos, marxismos y familias comunistas, carlismos y derechas españolas sin comprimir tradiciones ricas en una sola etiqueta.
- [ ] La matriz de anarquismos contrasta al menos anarcocomunismo, colectivismo, anarcosindicalismo, plataformismo/especifismo, mutualismo, individualismo/egoísmo, anarcopacifismo, anarquismo religioso, ecoanarquismo, anarcofeminismo/queer, primitivismo e ilegalismo por propiedad/intercambio, organización, sujeto de cambio, violencia, tecnología/ecología, género y religión; una faceta no se vende como ideología completa si no añade discriminación real. (Avance 2026-07-12: dosier MATRIZ-ANARQUISMOS.md con la matriz 12×7 completa y veredictos — 9 fichas, 1 condicionada, 4 facetas por la vara de discriminación; ítems discriminantes creados va-019 desmantelar-civilización, izq-054 responsabilidad-colectiva, izq-055 egoísmo, y cul-015/016 + izq-048 ya cubrían aceleración y prefiguración; anarcofeminismo y anarquismo-queer cableadas al mapa por referenciaId; posiciones propuestas y ascensos pendientes de la cola de pasajes §6 del dosier.)
- [ ] La matriz marxista/comunista contrasta Marx, Lenin, marxismo-leninismo, estalinismo, hoxhaísmo, maoísmo y pensamiento Gonzalo, trotskismos/posadismo, luxemburguismo, comunismo de consejos/izquierda, De Leonismo, titoísmo/autogestión y corrientes democráticas por partido, Estado, revolución/reforma, consejos/sindicatos, mercado/plan, cuestión nacional, pluralismo e internacionalismo.
- [ ] La matriz de derechas españolas contrasta liberalismo conservador, conservadurismo, democracia cristiana, tradicionalismos/carlismos, integrismo y nacionalcatolicismo, CEDA/catolicismo político, falangismo/nacionalsindicalismo, franquismo/desarrollismo, derecha radical/populista y familias libertarias/paleolibertarias sin heredar monarquía, religión, nación, economía o autoritarismo entre ellas.
- [ ] Una tabla de falsos amigos documenta respuestas coincidentes por motivos incompatibles —impuestos entre marxista, anarcocapitalista y ultranacionalista; propiedad estatal entre socialistas y nacionalistas autoritarios; antiglobalización de izquierda/derecha; pacifismo, aislacionismo y no alineamiento; fe personal, confesionalidad y teocracia— y prueba que el resultado las desambigua.
- [ ] El fascismo histórico separa San Sepolcro/Fasci di Combattimento, fase premarcha/régimen y República Social Italiana; anticlericalismo, monarquismo, corporativismo y retórica social se fechan en vez de promediarse como una esencia atemporal.
- [ ] Carlismo tradicionalista, etapas/escisiones y carlismo socialista autogestionario se documentan por separado; monarquía, foralidad, religión y economía no se heredan entre ramas.
- [ ] Posadismo, pensamiento Gonzalo y aceleracionismo neonazi se investigan como referencias sensibles con umbrales reforzados; las preguntas miden posiciones sin nombrar organizaciones ni normalizar violencia.
- [ ] Anticomunismo, antifascismo, capitalismo rosa, gandhismo, sionismos, teocracias y monarquismo constitucional se clasifican honestamente como región, faceta, familia, estrategia o contexto según lo que el instrumento pueda medir.
- [ ] No existe un cupo arbitrario de 10, 15 o 30 descartes: cada rótulo se conserva, contextualiza, sustituye o excluye según utilidad española, coherencia conceptual, mensurabilidad y evidencia, aunque el total de decisiones de baja utilidad sea mayor.
- [ ] Toda corriente final tiene un expediente en español con definición, alcance, diferencias respecto de sus vecinas, recepción o ejemplo español cuando exista, fuentes y preguntas/discriminantes; la ausencia de partido español no es motivo de exclusión.
- [ ] Wikipedia puede localizar bibliografía y terminología, pero ninguna definición, coordenada o pregunta se cierra solo con Wikipedia; si no hay evidencia primaria/académica suficiente se cambia la capa o se busca un sustituto mejor documentado.
- [ ] El panel adversarial incluye perfiles sintéticos sin partido —como anarcocapitalista, varias ramas anarquistas y marxistas, posadista, nacional-sindicalista, democristiano, liberal nacional y confederalista— y verifica proximidad, contradicciones, incertidumbre y explicación sin usar nombres doctrinales en las respuestas.
- [ ] La situación de La Falange/FE-JONS se resuelve con fuente primaria: fecha y alcance de fusión, sucesión orgánica y actividad; el catálogo y la investigación no la omiten ni la cuentan dos veces.

## Compartir resultados y capturas

- [x] Contrato canónico y versionado `#r=1.<base64url>`, determinista y con presupuesto máximo de 1.800 caracteres.
- [x] La instantánea incluye facetas, top cinco, cobertura, contexto y versión; nunca respuestas, prioridades, detalle ítem a ítem, textos libres ni URLs.
- [x] Parser hostil con límite previo de 4.096 caracteres, base64url estricto, allowlist de ids/enum/rangos/cantidades y fallo seguro sin reflejar el payload.
- [x] Vista compartida de solo lectura aislada del estado normal: abrirla no hidrata, mezcla, borra ni renueva el `localStorage` del receptor.
- [x] Aviso explícito: cualquiera con el enlace ve el resumen político; no caduca, no es revocable y no certifica que el contenido no haya sido manipulado.
- [x] `PRIVACIDAD.md`, `PRODUCCION-APP.md` y la investigación visual describen la excepción deliberada del fragmento compartible, sus campos exactos y su modelo de amenaza; ninguna página sigue prometiendo que la URL nunca contiene resultados.
- [x] Acciones separadas «Compartir enlace» y «Copiar enlace», con Web Share y Clipboard bajo gesto y fallbacks visibles.
- [x] PNG Canvas 2D sin captura DOM ni recursos externos: resumen 1200×630, brújula 1080×1080 y afinidades 1080×1350.
- [ ] La tarjeta PNG de resumen calcula altura por líneas: nombres largos como Junts y EAJ-PNV no pisan porcentaje, base comparada ni cobertura, con regresión visual o geométrica automatizada.
- [x] Facetas en tarjetas PNG paginadas de 6–8 ejes, descarga individual, nombres largos envueltos y contenido HTML equivalente accesible.
- [x] Acción separada «Compartir imagen» con `navigator.canShare({ files })`, cancelación silenciosa y fallback de descarga/previsualización en iOS.
- [x] Etiquetas sensibles/violentas fuera de la tarjeta predeterminada salvo consentimiento expreso; siempre «proximidad», nunca pertenencia.
- [ ] Unitarias: round-trip, canonicalización, determinismo, tamaño, payload malformado/truncado/manipulado, ids/rangos desconocidos y fuzz generativo sin excepciones; los seis hashes hostiles fijos no sustituyen el fuzz.
- [ ] El top cinco usa un único comparador antes y después de serializar: afinidad visible, baja cobertura, base comparada, cobertura e id; se rechaza también un payload cuyo empate esté ordenado en sentido débil → sólido aunque la afinidad sea no creciente.
- [ ] Fallbacks sin `File`, sin Web Share y sin Clipboard API: descargan/copían sin excepción, tratan `execCommand('copy') === false` como fallo recuperable visible y restauran el foco del teclado.
- [ ] E2E: estado local intacto, enlace limpio, Clipboard denegado con fallback real, ausencia de `File`, PNG con dimensiones reales, 320 px, axe, PWA offline y actualización de esquema.
- [ ] Proyecto WebKit en CI y comprobación manual real en Safari/iOS, Chrome/Android y WhatsApp, Telegram, Signal, correo y SMS.

## Utilidad española, fuentes y sustituciones del atlas

- [x] La [auditoría metodológica nominal de las 178 decisiones](./investigacion/AUDITORIA-178-DECISIONES.md) cubre A–F, contradicciones atlas/taxonomía, 15 acoplamientos y 22 entradas inicialmente regionales; la puerta deja 17 anclas bloqueadas y reclasifica 5 decisiones E como contexto, sin validar sus fuentes pendientes.
- [x] El schema conserva para los 178 rótulos `decisionOriginal: A|B|C|D|E|F` inmutable y un `tratamientoActual` separado; región, faceta, movimiento, contexto, diagnóstico, modelo y exclusión no se colapsan en A/B.
- [ ] Las 15 adaptaciones españolas dejan de usar el rótulo sustituido como identidad técnica: original y alta independiente tienen registros, búsquedas, fuentes y publicación propias; ninguna exportación puede afirmar que Rawls es distributismo o Fernando de los Ríos es Mugabeísmo.
- [x] `minimoCorrientes`, `minimoPorCuadrante`, área máxima y radio vacío pasan a diagnósticos descriptivos, nunca puertas que incentiven rellenar el plano; evidencia, mensurabilidad y utilidad incremental son los únicos gates editoriales.
- [ ] El schema admite un expediente por corriente con fuentes primarias/académicas, idioma, pasaje/localizador, fecha, país/periodo, contraevidencia y decisión de publicación; una ficha `investigacion` no participa en Voronoi, matching ni lenguaje de posición.
- [ ] Toda coordenada visible declara origen mutuamente excluyente —`prior-no-publicable`, `editorial-documentada` o `calculada`—; las 140 heredadas de la referencia visual no se convierten en hechos doctrinales por defecto.
- [x] Titoísmo, Guevarismo, Menchevismo, Situacionismo y Neozapatismo respetan su decisión histórica/internacional E y pasan a contexto o movimiento hasta que una ficha distinta justifique región contemporánea y encaje español.
- [ ] Versión y conteos de referencias/fichas instrumentadas se generan desde el JSON; la contradicción 45 declaradas frente a 60 técnicas obliga a una nueva versión antes de presentar un corte reproducible.
- [ ] Auditar individualmente las 30 regiones nominales de baja utilidad o mensurabilidad española; no conservar una celda solo porque aparezca en la imagen de referencia.
- [ ] Cada corriente visible tiene fuente primaria o académica enlazada; Wikipedia solo orienta. Si no existe recurso en español, la interfaz marca de forma visible «(en inglés)» u otro idioma real.
- [ ] `publicacionAfinidad` y `publicacionMapa` son puertas independientes: toda referencia nueva queda fuera del resultado hasta cerrar semántica, discriminación vecinal, citas/localizadores y tests no tautológicos.
- [ ] Una etiqueta retirada del plano conserva trazabilidad nominal como faceta, contexto o exclusión justificada; nunca desaparece silenciosamente del inventario de 178.
- [x] Los 178 rótulos tienen capa explícita (`region`, `faceta`, `contexto`, `diagnostico`, `modelo-historico` o `exclusion`); solo una `region` con publicación geométrica explícita participa en Voronoi y en la corriente más cercana.
- [x] `coordenadasPrior` conserva el ancla realmente previa: una sustitución se compara con `trazabilidadOriginal.coordenadasOriginales`, y todo desplazamiento >25 se justifica; reiniciar el prior a la coordenada final no puede hacer pasar el validador.
- [ ] Ninguna referencia con `publicacionMapa:false` sostiene una región exacta o puede ser «la más cercana» por sí sola; un prior educativo no se presenta como coordenada calculada ni se usa para rellenar el mínimo geométrico.
- [ ] Coordenada, discriminantes y evidencia tienen dirección coherente: Costa, CEDA, Cánovas y corporativismo social católico cuentan con rutas sintéticas que no empujan al usuario al polo opuesto antes de publicar su región.
- [x] Las 15 etiquetas sustituidas se encuentran por su propio nombre en el buscador y abren su ficha contextual; no quedan ocultas detrás del nombre del sustituto.
- [x] La ficha distingue ancla editorial de posición calculada, muestra por separado los vetos `publicacionMapa`/`publicacionAfinidad` y no promete coincidencias que el motor ha excluido.
- [ ] Desactivar «Explorar corrientes» desactiva u oculta también buscador/ficha; contadores diferencian regiones de entradas, capas usan nombres humanos y cada discriminante explica qué respuesta acerca/aleja y con qué fuente.
- [ ] MAP-10/MAP-11 tienen validación ejecutable, incluida denominación con país/periodo cuando proceda; no quedan como reglas declarativas incumplidas.
- [ ] Revisar `Kuomintangism`: sustituir/facetar si el tridemismo chino no aporta preguntas o ejemplos útiles para España.
- [ ] Revisar conjuntamente `Buddhist Theocracy`, `Hindu Theocracy` e `Islamic Theocracy`: evitar tres regiones asiáticas indistinguibles por el instrumento y buscar sustitutos históricos españoles/europeos serios.
- [ ] Revisar `Georgism`: conservar solo si se añade un discriminante directo sobre renta del suelo; en caso contrario, evaluar un sustituto libertario ibérico documentado.
- [ ] `Antifa` permanece buscable con ficha como movimiento/estrategia transversal, no como ideología integral ni región identitaria; `exclusion` queda reservada a ficción, meme o no-concepto.
- [ ] Revisar personalismos extranjeros de baja ganancia —incluidos Pensamiento Ho Chi Minh y Titoísmo— frente a ramas doctrinales más discriminantes y con conexión española.
- [ ] Evaluar De Leonismo: solo entra si se distingue con preguntas neutrales sobre sindicato, partido y poder obrero y aporta información incremental.
- [ ] Preservar el desglose rico de anarquismos y marxismos/comunismos cuando las ramas tengan diferencias doctrinales medibles; no colapsarlas por ser nicho.
- [ ] Ampliar matices de las derechas españolas con corrientes documentadas —liberal, conservadora, democristiana, tradicionalista, nacionalcatólica, falangista/nacionalsindicalista, derecha radical y libertaria— sin hacerlas heredar posiciones entre sí.
- [ ] Revisar monarquía constitucional: por su relevancia española debe seguir explicada, pero decidir con evidencia si funciona mejor como faceta de forma de Estado que como región ideológica integral.
- [ ] Toda alta adaptada se coloca por su propia evidencia y no hereda la casilla del rótulo original: Voronoi puede dejar huecos; área, vacío y densidad por cuadrante se informan como diagnóstico y jamás obligan a fabricar un sustituto.
- [ ] Cada sustituto tiene al menos tres discriminantes vigentes y preguntas capaces de acercar o alejar por razones distintas, sin trivia de nombres propios.
- [ ] «Corriente cercana» no depende solo de distancia 2D: combina el plano con coincidencias doctrinales específicas, cobertura y contradicciones, y nunca etiqueta pertenencia por una respuesta aislada.
- [ ] Cada región realmente alcanzable tiene al menos una ruta de respuestas que la aproxima y otra que la descarta; tests sintéticos adversariales recorren las corrientes sin usar nombres propios en las preguntas.
- [ ] Todos los recuentos y límites publicados se regeneran del artefacto final y coinciden entre TODO, taxonomía, auditoría, metodología y UI: 61 referencias, 175 entradas/94 regiones y geometría 28/22/17/24 + 3 ejes, máximo 4,06 %, Falange 0,35 % y vacío 55,6 en este corte, hasta la siguiente regeneración.

### Bloqueo nominal de 22 entradas en investigación

Cada fila solo se cierra cuando existe expediente primario + académico, contraevidencia, discriminación incremental y encaje español o contexto honesto. Diecisiete conservan un prior hueco sin Voronoi; Titoísmo, Guevarismo, Menchevismo, Neozapatismo y Situacionismo ya son contexto sin coordenada publicable. Ninguna participa en afinidad ni identidad de resultado mientras siga abierta.

- [ ] `cuarta-teoria-politica`: Cuarta Teoría Política; delimitar eurasianismo, economía indeterminada y recepción española.
- [ ] `neonazismo`: Neonazismo; fijar organización/periodo, fuentes oficiales y sensibilidad violenta sin identidad lúdica.
- [ ] `strasserismo`: Strasserismo; contrastar textos Strasser e historiografía sin convertir retórica anticapitalista en izquierda.
- [ ] `neorreaccion`: Neorreacción/Ilustración Oscura; separar monarquismo CEO, tecnoutopía, antidemocracia y economía.
- [ ] `tercera-via`: Tercera vía; documentar Giddens, Blair–Schröder y recepción española por periodo.
- [ ] `libertarismo-nacional`: Libertarismo nacional; demostrar un núcleo estable distinto de sumar nación y mercado.
- [ ] `rothbardianismo-izquierda`: Rothbardianismo de izquierda; separar etapa histórica, Karl Hess, ancap general y agorismo.
- [ ] `libertarismo-cristiano`: Libertarismo cristiano; elegir tradición y demostrar ganancia frente a fe + mercado como facetas.
- [ ] `propertarianismo`: Propertarianismo; delimitar corpus y diferenciar uso propio, crítico, ancap y hoppeanismo.
- [ ] `georgismo`: Georgismo; añadir renta del suelo, recepción española y autoridad no inventada.
- [ ] `agorismo`: Agorismo; documentar Konkin, contraevidencia y diferencia con ilegalismo.
- [ ] `anarcofeminismo`: Anarcofeminismo; fuentes históricas, Mujeres Libres cuando proceda y poder patriarcal no estatal.
- [ ] `anarquismo-queer`: Anarquismo queer; corpus delimitado sin heredar automáticamente controversias contemporáneas.
- [ ] `egoismo-anarquista`: Egoísmo anarquista; separar Stirner, tradición posterior e ilegalismo.
- [ ] `voluntarismo`: Voluntarismo político; elegir corpus y probar utilidad incremental frente a minarquismo/ancap.
- [ ] `hoppeanismo`: Hoppeanismo; fuente primaria y crítica, sin inferir exclusión o autoridad desde fiscalidad.
- [ ] `anarcoprimitivismo`: Anarcoprimitivismo; discriminar civilización industrial y elegir variante explícita.
- [ ] `titoismo`: Titoísmo yugoslavo; periodo, autogestión, federalismo y partido-Estado, como contexto E.
- [ ] `guevarismo`: Guevarismo; separar foco, internacionalismo, periodo histórico y apoyo actual a violencia, como contexto E.
- [ ] `menchevismo`: Menchevismo; Mártov/RSDLP 1903–1921, no sinónimo atemporal de moderación, como contexto E.
- [ ] `neozapatismo`: Neozapatismo; declaraciones EZLN y contexto chiapaneco, no identidad española, como movimiento E.
- [ ] `situacionismo`: Situacionismo; Internacional Situacionista, mercancía/espectáculo y periodo, como contexto E.

### Contrato de decisión para los 178 rótulos

- [ ] Cada rótulo tiene una decisión editorial explícita y mutuamente excluyente: `region-conservada`, `faceta`, `contexto`, `diagnostico`, `modelo-historico`, `sustituida` o `exclusion-justificada`; la letra inicial A–F no cuenta como decisión final.
- [ ] El recibo nominal de decisión conserva nombre original/traducción, definición, criterios aplicados, fuentes, conexión española cuando exista, mensurabilidad, ganancia respecto de vecinos, riesgos, capa final y, si procede, id del sustituto; el validador rechaza campos vacíos o justificaciones copiadas.
- [ ] Una segunda revisión editorial independiente confirma cada decisión discutible y todas las exclusiones/sustituciones; desacuerdos y cambios quedan registrados en vez de resolverse por mayoría automática o preferencia estética.
- [ ] La relevancia española ayuda a priorizar y contextualizar, pero no elimina doctrinas universales medibles ni corrientes sin partido; la conservación exige validez conceptual y discriminación, no una organización electoral española.
- [ ] La criba compara los 178 casos, no solo las 30 sustituciones propuestas: toda etiqueta extranjera, personalista, transversal, histórica o dudosa recibe decisión individual antes de cerrar el inventario.
- [ ] Los términos generales `General Authoritarianisms`, `General Socialism`, `General Capitalism`, `Collectivism`, `Statism`, `Centrism` y `Progressivism` se auditan como familias/ejes y no compiten como regiones con sus propios subtipos sin demostrar ganancia incremental.
- [ ] `Anti Communism`, `Anti Capitalism`, `Anti Authoritarianism`, `Antifa` y `Pink Capitalism` se auditan como oposición, movimiento, estrategia o fenómeno transversal; ninguna respuesta negativa aislada genera una identidad ideológica integral.
- [ ] Anticomunismo y anticapitalismo aplican la misma ontología de negación + motivo + alternativa: ambos conservan ficha pedagógica/faceta fuera de regiones, sin que uno desaparezca como exclusión mientras el otro ocupa el atlas.
- [ ] `Corporatocracy`, `Kleptocracy`, `Technocracy`, `Aristocracy`, `Feudalism`, `Fordism` e `Imperialism` se auditan como diagnóstico, modo de gobierno, orden/modelo histórico o faceta; solo son región si existe doctrina positiva mensurable y no un rasgo atribuido por terceros.
- [ ] `Constitutional Monarchism`, `Elective Monarchism`, `Absolute Monarchism`, `Republicanism`, `Religious Democracy` y las teocracias se contrastan con la escala religión–Estado y la forma de Estado; esas facetas no heredan por sí solas economía, sociedad o autoridad.
- [ ] `Third Way` se investiga como familia política real y plural —no como punto medio automático— y solo conserva región si las preguntas distinguen su síntesis programática de socialdemocracia, social-liberalismo, centrismo y neoliberalismo.
- [ ] `Dark Enlightenment` se investiga como neorreacción contemporánea con fuentes serias, separando monarquismo CEO, antidemocracia y aceleracionismo; no se usa como cajón de sastre de derecha tecnológica.
- [ ] `Gandhism` se clasifica separando filosofía política, estrategia no violenta y contexto histórico; pacifismo por sí solo no basta para asignar la corriente.
- [ ] `Zionism` no funciona como bloque ideológico único ni como proxy religioso/étnico: la ficha explica sus ramas y la capa geopolítica solo se publica si el instrumento puede discriminarlas sin inferencias sobre identidad personal.
- [ ] Personalismos/regímenes foráneos —Mladorossismo, Pol Pot, Juche, Pancasila, Baazismo, Vichy, Shōwa, Mugabe, Chavismo, Castro, Deng, Huey Long, Hamilton, Pinochet, Ho Chi Minh, Trump, Gadafi y Gorbachov— se revisan uno por uno frente a familias doctrinales transferibles o sustitutos españoles; no se conserva una región por exotismo ni se borra su trazabilidad histórica.
- [ ] Corrientes de internet o etiquetas inestables —Cuarta Teoría Política, alt-right, neorreacción, aceleracionismos, neolibertarismo, Korwinismo, nacional-libertarismo y derivados ficticios ya identificados— documentan origen, usos incompatibles y recepción española antes de participar en afinidad.
- [ ] `Neo Bolshevism` corrige tipo y motivo como ficción orwelliana trazable, sin confundirse con bolchevismo histórico ni quedar como mera ambigüedad internética.
- [ ] Las sustituciones españolas propuestas —Costa, CEDA, Cánovas, Primo de Rivera, desarrollismo franquista, neocatolicismo, republicanismo radical-socialista, Fernando de los Ríos, socialismo cristiano, integrismo y nacionalismo integral, entre otras— se auditan también por anacronismo, solapamiento y pluralidad interna; «español» no equivale automáticamente a «mejor».
- [ ] Tras la criba se genera una matriz de cobertura por cuadrante y frontera que señala huecos doctrinales reales; los sustitutos se eligen por utilidad y evidencia y no para colorear una celda exacta, igualar recuentos o imitar la referencia.
- [ ] Cada región final, no solo cada sustituto, enlaza al menos tres discriminantes vigentes con ids de preguntas que acercan y alejan, razones doctrinales diferentes y una contradicción decisiva; las rutas condicionales quedan verificadas en el exhaustivo.
- [ ] Las preguntas de corrientes nicho viven en el exhaustivo y se redactan como dilemas políticos comprensibles, nunca como trivia o autoadscripción nominal; el rápido mantiene su contrato de 50 ítems de alto valor general.
- [ ] Un auditor detecta regiones inalcanzables, regiones alcanzables mediante una sola bandera, pares con rutas idénticas y preguntas que empujan simultáneamente a doctrinas contradictorias; todos los hallazgos tienen prueba de regresión.

### Criba nominal de 30 regiones

- [ ] `Kuomintangism` conserva ficha china E independiente; regeneracionismo costista es un alta española separada, sin alias, coordenada ni identidad heredados.
- [ ] `Buddhist Theocracy` queda como modelo religioso comparado C; Salazarismo/Estado Novo es una ficha portuguesa independiente por país y periodo.
- [ ] `Hindu Theocracy` queda como modelo religioso comparado C; integrismo católico español es una tradición independiente y no ocupa su casilla.
- [ ] `Islamic Theocracy` queda como modelo religioso comparado C; maurrasismo/nacionalismo integral tiene ficha francesa y recepción española propias.
- [ ] `Sikh Theocracy` queda como modelo religioso comparado C; corporativismo social católico se documenta como alta independiente.
- [ ] `Christian Theocracy` permanece como polo institucional C; catolicismo político cedista es un caso histórico independiente y no sinónimo de teocracia.
- [ ] `Kraterocracy` queda como concepto marginal F de gobierno por la fuerza, no ficción; primorriverismo es una alta histórica española independiente.
- [ ] `Fordism` queda como modelo productivo E; desarrollismo tecnocrático franquista es una fase político-económica española independiente.
- [ ] `Feudalism` queda como orden histórico E; neocatolicismo español isabelino es una ficha independiente y no implica relaciones feudales.
- [ ] `Mandelaism` queda como rótulo F ambiguo entre legado de Mandela y posible confusión con Ernest Mandel; Anarquismo sin adjetivos es un alta independiente.
- [ ] `Distributist Libertarianism` no usa a Rawls como normalización: rótulo original contextual/excluido según corpus y liberalismo igualitario como alta independiente.
- [ ] `Ho Chi Minh Thought` permanece contexto vietnamita E; De Leonismo es una rama socialista independiente con su propio corpus.
- [ ] `Mugabeism` permanece personalismo/contexto zimbabuense E; socialismo humanista de Fernando de los Ríos es un alta española absolutamente separada.
- [ ] `Hamiltonianism` permanece contexto estadounidense E; conservadurismo canovista es una ficha histórica española independiente.
- [ ] `Longism` permanece populismo personalista estadounidense E; republicanismo radical-socialista español es una ficha independiente.
- [ ] `Georgism` se conserva por su historia española, añade pregunta directa sobre renta del suelo y se recalibra desde `(0,−61)` hacia una autoridad no inventada.
- [ ] `Titoism` conserva autogestión, federalismo, no alineamiento y partido único como contexto histórico E; no vuelve a región hasta completar expediente y justificar una variante española distinta.
- [ ] `Esoteric Fascism` pasa a contexto sensible/de seguridad y nunca produce afinidad ordinaria por autoritarismo, etnicidad o violencia aislados.
- [ ] `Constitutional Monarchism` se representa como faceta institucional española visible, no como ideología económica integral.
- [ ] `Elective Monarchism` se representa como faceta/modelo histórico y deja de usar elección de jueces como discriminante.
- [ ] `Absolute Monarchism` se representa como faceta histórica de soberanía, no resultado ideológico integral.
- [ ] `Corporatocracy` se representa como diagnóstico institucional; apoyar transparencia nunca aproxima a una identidad corporatocrática.
- [ ] `Kleptocracy` se representa como diagnóstico institucional; apoyar denunciantes nunca aproxima a una identidad cleptocrática.
- [ ] `Imperialism` se representa como faceta de política exterior, no programa ideológico completo.
- [ ] `Zionism` se trata como familia geopolítica plural y separa ramas laborista, liberal, revisionista, religiosa y cultural antes de asignar coordenadas.
- [ ] `National Capitalism` se revisa como nacionalismo económico y baja de la esquina autoritaria si no existe evidencia institucional directa.
- [ ] `Conservative Socialism` se localiza como socialismo cristiano español sin convertir religiosidad en conservadurismo social automático.
- [ ] `Neo Libertarianism` queda como contexto/investigación y declara sus dos usos incompatibles: filosófico de 1978 e intervencionista de los años 2000.
- [ ] `Korwinism` queda como contexto personalista y solo conserva región si aporta información distinta de paleolibertarismo, hoppeanismo y nacional-libertarismo.
- [ ] `National Libertarianism` se conserva en investigación con preguntas directas sobre minarquismo, soberanía, inmigración y tradición.

## Rendimiento y entrega web/app

- [x] El presupuesto calcula el cierre transitivo de imports del manifest de Vite; ningún chunk de datos pesado queda fuera del recuento por su nombre.
- [x] El auditor acepta una carpeta de build explícita y se ejecuta sobre el artefacto recién construido; un `web/dist` obsoleto no puede producir un verde falso.
- [ ] El auditor de presupuesto, ejecutado de forma aislada, exige una prueba de frescura o un manifest del build de la misma invocación; fuera del orden protegido de CI tampoco puede dar verde sobre un `dist` antiguo.
- [x] Transferencia adicional de Resultados y catálogos ≤390 KiB gzip, sin ocultar fuentes ni perfiles para aprobar.
- [x] Atlas 2D y referencias doctrinales tienen puertas bajo gesto, fallback accesible y presupuestos independientes ≤180/≤150 KiB gzip; la PWA sigue precargando sus chunks para uso offline.
- [x] Visor de resultado compartido ≤250 KiB gzip adicionales y aislado de los datos completos que no necesita.
- [x] Visor 3D ≤300 KiB gzip adicionales después de Resultados; PWA instalable completa ≤3,20 MiB en este corte.
- [ ] Build real inspeccionado en PC y 320/360/390 px, navegación táctil ≥44 px, sin desbordamientos, CLS ni regresiones del diseño editorial.
- [ ] Los cuatro `<summary>` de doble marcador (PP, PSOE, VOX y Sumar) reservan espacio real para título y métrica sin solape a 320/360 px, en tema claro y oscuro.
- [ ] Cada punto interactivo de la brújula ofrece un objetivo táctil medido ≥44×44 CSS px a 320/360/390 px; la forma puede seguir pequeña, pero su hit target y foco no.
- [ ] Arquitectura preparada para una app posterior: lógica/datos compartibles, PWA offline correcta y ningún supuesto irreversible exclusivo del navegador de escritorio.

## Partidos (66)

- [x] Un único contrato puro de evidencia alimenta CLI, CI y mapa web; no existen contadores paralelos de IDs y pasajes independientes.
- [ ] Las 399 posiciones citadas conservan `grupoEvidencia` canónico y revisión nominal: las 398 reales tienen hoy URL HTTPS y localizador runtime; el único aviso restante es el perfil ficticio `demo-vanguardia`, sin URL y excluido de producción. El migrador es determinista, idempotente y transaccional ante conflictos; cualquier identidad textual incoherente bloquea el grupo.
- [x] La deduplicación elimina caracteres invisibles y variaciones de transcripción sin fusionar pasajes doctrinalmente distintos por vocabulario compartido; hay fixtures hostiles y casos vivos como PCTE `dem-033`/`dem-034`/`sd-004`.
- [ ] Los espejos del mismo documento o pasaje alojados bajo URLs distintas reciben una identidad de fuente revisada o quedan explícitamente separados; cambiar de dominio no puede inflar cobertura sin auditoría nominal.
- [x] Un valor cero solo entra por modelo mixto o equilibrio explícito documentado; silencio, ausencia o texto ajeno se omiten y nunca crean un centro artificial.
- [x] La puerta runtime rechaza tipos, escalas, calidades, protocolos, `consultado`, `fuente.fecha` y demás campos malformados sin lanzar excepciones, aunque el schema del repositorio también los bloquee; una fecha numérica como `fuente.fecha: 7` no puede resultar sustentada.
- [x] MAP-05 se ejecuta realmente: Propiedad exige dos anclas independientes en cada subdimensión utilizada; una distribución 4+1+1 no obtiene coordenada sólida ni provisional.
- [x] Ningún ítem del contrato cartográfico puede cargar cero en el eje declarado, y ninguna auditoría concede grado sólido/provisional con coordenada nula o no finita.
- [x] Brújula, tres macroplanos y cubo comparten los vetos `sin-datos`, monotemático y `publicacionMapa`; una ruta secundaria nunca rescata un perfil excluido por la principal.
- [x] La coordenada publicada excluye posiciones sin fuente completa, evidencia baja, duplicados documentales y ceros no resueltos; una prueba compara mapa y recibo partido por partido.
- [ ] Los extremos se revisan por evidencia moderadora o incertidumbre estadística explícita, nunca mediante desplazamientos editoriales manuales.
- [x] La media publicada usa grupos documentales deduplicados (`valorPorGrupos`), no el promedio crudo por ítems; regresiones cubren PCE, CRT, Compromís, Geroa Bai, BNG y Más Madrid.
- [x] Economía × Sociedad, Economía × Territorio y Sociedad × Territorio reutilizan el mismo contrato de fuente, calidad, localizador, cero y deduplicación; el umbral antiguo de cuatro posiciones crudas queda retirado.
- [ ] Un partido extremo sigue requiriendo moderadoras o incertidumbre aunque alcance cobertura mecánica; BNG, EH Bildu y Sumar no se cierran solo por superar 6/3 y 6/3/2.
- [ ] En generales, cada relación candidatura–perfil declara explícitamente su ámbito territorial (`territorios`/CCAA) además del perfil enlazado: elegir Catalunya, Galicia, Madrid o Aragón no depende de inferir el ámbito del perfil ni arrastra componentes nacionales de Sumar que no son votables allí.
- [x] La doble lectura de PSOE, PP, VOX y Sumar clasifica cada fuente como programa/formal o conducta fechada; una base llamada «Programa 2023» no mezcla votaciones, declaraciones y otros documentos sin explicarlo (tipo de fuente por posición; las cuatro descripcionBase declaran ahora la mezcla real de tipos; test de que toda posición de contraste lleva fuente.fecha; 2026-07-12).
- [ ] BNG, Compromís, EH Bildu y Geroa Bai declaran componentes/identidades completos o una limitación explícita; el detalle los muestra sin heredar posiciones entre ellos.
- [ ] Las 1.550 posiciones partidistas inventariadas alcanzan cita/localizador y fecha suficientes según el contrato final; una URL al documento completo no cuenta como pasaje reproducible y cualquier alta posterior actualiza de forma explícita este total.
- [ ] La puerta semántica final ejecuta el auditor partidista estricto o una lista nominal de excepciones `auditado-no-mapa`; el modo no estricto queda solo para desarrollo incremental.
- [ ] Prioridad de cierre documentada: PP/PSOE/CUP/Más Madrid; ERC/VOX/EAJ-PNV; Geroa Bai/Junts/Podemos; luego CC/Compromís/UPN/IU/Por Andalucía/Adelante/NC/Aliança; después comunistas, FE-JONS/extrema derecha, P-LIB y PACMA.

- [ ] `adelante-andalucia` — Adelante Andalucía _(actividad: activa)_
- [ ] `alianca-catalana` — Aliança Catalana _(actividad: activa)_
- [ ] `alianza-futurista` — Alianza Futurista _(actividad: activa)_
- [ ] `alianza-verde` — Alianza Verde _(actividad: activa)_
- [ ] `aragon-existe` — Aragón Existe _(actividad: activa; hoy sin datos)_
- [ ] `bng` — Bloque Nacionalista Galego _(actividad: activa)_
- [ ] `cup` — Candidatura d'Unitat Popular _(actividad: activa)_
- [ ] `chunta-aragonesista` — Chunta Aragonesista _(actividad: activa)_
- [ ] `ciudadanos` — Ciudadanos-Partido de la Ciudadanía _(actividad: activa)_
- [ ] `coalicion-canaria` — Coalición Canaria _(actividad: activa)_
- [ ] `coalicion-existe` — Coalición Existe (Aragón Existe – Teruel Existe) _(actividad: activa; hoy sin datos)_
- [ ] `coalicion-por-el-bierzo` — Coalición por El Bierzo _(actividad: activa)_
- [ ] `compromis` — Compromís _(actividad: activa)_
- [ ] `comunion-tradicionalista-carlista` — Comunión Tradicionalista Carlista _(actividad: activa)_
- [ ] `comunistes-de-catalunya` — Comunistes de Catalunya _(actividad: activa)_
- [ ] `crt` — Corriente Revolucionaria de Trabajadores y Trabajadoras _(actividad: activa)_
- [ ] `democracia-nacional` — Democracia Nacional _(actividad: activa)_
- [ ] `el-bierzo-existe` — El Bierzo Existe _(actividad: activa; hoy sin datos)_
- [ ] `escanos-en-blanco` — Escaños en Blanco _(actividad: activa; hoy monotemático)_
- [ ] `espana-2000` — España 2000 _(actividad: activa)_
- [ ] `erc` — Esquerra Republicana de Catalunya _(actividad: activa)_
- [ ] `eh-bildu` — Euskal Herria Bildu _(actividad: activa)_
- [ ] `eaj-pnv` — Euzko Alderdi Jeltzalea-Partido Nacionalista Vasco _(actividad: activa)_
- [ ] `fe-jons` — Falange Española de las JONS _(actividad: activa)_
- [ ] `frente-obrero` — Frente Obrero _(actividad: activa)_
- [ ] `geroa-bai` — Geroa Bai _(actividad: activa)_
- [ ] `izquierda-espanola` — Izquierda Española _(actividad: activa)_
- [ ] `iu` — Izquierda Unida _(actividad: activa)_
- [ ] `junts` — Junts per Catalunya _(actividad: activa)_
- [ ] `mas-madrid` — Más Madrid _(actividad: activa)_
- [ ] `movimiento-sumar` — Movimiento Sumar _(actividad: activa)_
- [ ] `nacion-andaluza` — Nación Andaluza _(actividad: activa)_
- [ ] `el-pi` — El Pi – Proposta per les Illes _(actividad: activa; alta 2026-07-12 desde la matriz de la derecha, 9 posiciones verificadas)_
- [ ] `noviembre-nacional` — Noviembre Nacional _(actividad: activa; id renombrado 2026-07-12: el fichero histórico `nucleo-nacional` describía al partido, no a la asociación)_
- [ ] `nueva-canarias` — Nueva Canarias-Bloque Canarista _(actividad: activa)_
- [ ] `pacma` — Partido Animalista con el Medio Ambiente _(actividad: activa)_
- [ ] `partido-carlista` — Partido Carlista _(actividad: activa)_
- [ ] `pce` — Partido Comunista de España _(actividad: activa)_
- [ ] `pce-ml` — Partido Comunista de España (marxista-leninista) _(actividad: activa)_
- [ ] `pcpe` — Partido Comunista de los Pueblos de España _(actividad: activa)_
- [ ] `pcte` — Partido Comunista de los Trabajadores de España _(actividad: activa)_
- [ ] `pcoe` — Partido Comunista Obrero Español _(actividad: activa)_
- [ ] `partido-del-bierzo` — Partido de El Bierzo _(actividad: activa)_
- [ ] `p-lib` — Partido Libertario _(actividad: activa)_
- [ ] `posi` — Partido Obrero Socialista Internacionalista _(actividad: activa)_
- [ ] `pp` — Partido Popular _(actividad: activa)_
- [ ] `prepal` — Partido Regionalista del País Leonés _(actividad: activa)_
- [ ] `psoe` — Partido Socialista Obrero Español _(actividad: activa)_
- [ ] `pcpc` — Partit Comunista del Poble de Catalunya _(actividad: activa)_
- [ ] `pdecat` — Partit Demòcrata Europeu Català _(actividad: historica)_
- [ ] `psuc-viu` — Partit Socialista Unificat de Catalunya Viu _(actividad: activa)_
- [ ] `podemos` — Podemos _(actividad: activa)_
- [ ] `por-andalucia` — Por Andalucía _(actividad: activa)_
- [ ] `por-avila` — Por Ávila _(actividad: activa)_
- [ ] `pum-j` — Por Un Mundo Más Justo _(actividad: activa)_
- [ ] `recortes-cero` — Recortes Cero _(actividad: activa)_
- [ ] `salf` — Se Acabó La Fiesta _(actividad: activa)_
- [ ] `soria-ya` — Soria ¡YA! _(actividad: activa)_
- [ ] `teruel-existe` — Teruel Existe _(actividad: activa)_
- [ ] `uce` — Unificación Comunista de España _(actividad: activa)_
- [ ] `upl` — Unión del Pueblo Leonés _(actividad: activa)_
- [ ] `upn` — Unión del Pueblo Navarro _(actividad: activa)_
- [ ] `upg` — Unión do Povo Galego _(actividad: activa)_
- [ ] `verdes-equo` — Verdes Equo (marca política Partido Verde) _(actividad: activa)_
- [ ] `volt-espana` — Volt España _(actividad: activa)_
- [ ] `vox` — VOX _(actividad: activa)_

## Etiquetas de la imagen (178)

La letra es la clasificación inicial heredada de la auditoría; se reabre en esta fase y no equivale a decisión final.

- [x] 001. `Hive Mind Collectivism` → Colectivismo de mente-colmena _(clasificación inicial F)_
- [ ] 002. `Nazbol` → Nacionalbolchevismo _(clasificación inicial B)_
- [x] 003. `Neo Bolshevism` → Neobolchevismo de *1984* _(clasificación inicial F)_
- [x] 004. `Ingsocism` → Ingsoc/socialismo inglés de *1984* _(clasificación inicial F)_
- [x] 005. `Death Worship` → “Culto a la muerte” de *1984* _(clasificación inicial F)_
- [ ] 006. `Corporatocracy` → Corporatocracia _(clasificación inicial C)_
- [ ] 007. `Kraterocracy` → Kraterocracia _(clasificación inicial F)_
- [x] 008. `Posadism` → Posadismo _(clasificación inicial B)_
- [x] 009. `Stalinism` → Estalinismo/ML ortodoxo _(clasificación inicial A)_
- [x] 010. `Marxist Leninism Maoism` → Marxismo-leninismo-maoísmo _(clasificación inicial B)_
- [ ] 011. `Forth Theory` → **Cuarta Teoría Política** (corrección) _(clasificación inicial B)_
- [ ] 012. `Mladorossism` → Mladorossismo _(clasificación inicial E)_
- [ ] 013. `Pol Potism` → Polpotismo/Jemeres Rojos _(clasificación inicial E)_
- [ ] 014. `Juche` → Juche _(clasificación inicial E)_
- [ ] 015. `Fascism` → Fascismo histórico por fases _(clasificación inicial B)_
- [ ] 016. `Esoteric Fascism` → Fascismo esotérico _(clasificación inicial B)_
- [ ] 017. `Nazism` → Nacionalsocialismo alemán _(clasificación inicial E)_
- [ ] 018. `Neo Nazism` → Neonazismo _(clasificación inicial B)_
- [ ] 019. `National Capitalism` → Capitalismo nacional _(clasificación inicial B)_
- [ ] 020. `Alt Right` → Alt-right _(clasificación inicial D)_
- [ ] 021. `Absolute Monarchism` → Monarquía absoluta _(clasificación inicial C)_
- [ ] 022. `Fordism` → Fordismo _(clasificación inicial E)_
- [ ] 023. `Populism (Left)` → Populismo de izquierda _(clasificación inicial C)_
- [x] 024. `Hoxhaism` → Hoxhaísmo _(clasificación inicial B)_
- [ ] 025. `Left Wing Nationalism` → Nacionalismo de izquierda _(clasificación inicial C)_
- [ ] 026. `Pancasila` → Pancasila indonesia _(clasificación inicial E)_
- [ ] 027. `Ba'athism` → Baazismo _(clasificación inicial E)_
- [ ] 028. `Vichy Fascism` → Régimen de Vichy _(clasificación inicial E)_
- [x] 029. `Falangism` → Falangismo/nacionalsindicalismo _(clasificación inicial A)_
- [ ] 030. `Showa Statism` → Estatismo Shōwa _(clasificación inicial E)_
- [ ] 031. `Neo Fascism` → Neofascismo _(clasificación inicial B)_
- [ ] 032. `Authoritarian Capitalism` → Capitalismo autoritario _(clasificación inicial C)_
- [ ] 033. `Populism (Right)` → Populismo de derecha _(clasificación inicial C)_
- [ ] 034. `Anti Revisionism` → Antirrevisionismo comunista _(clasificación inicial C)_
- [ ] 035. `National Communism` → Nacionalcomunismo _(clasificación inicial B)_
- [ ] 036. `Maoism` → Maoísmo/pensamiento Mao Zedong _(clasificación inicial B)_
- [ ] 037. `Strasserism` → Strasserismo _(clasificación inicial B)_
- [ ] 038. `Technocracy` → Tecnocracia _(clasificación inicial C)_
- [ ] 039. `Sikh Theocracy` → Teocracia sij _(clasificación inicial C)_
- [ ] 040. `Mugabeism` → Mugabismo _(clasificación inicial E)_
- [ ] 041. `Buddhist Theocracy` → Teocracia budista _(clasificación inicial C)_
- [ ] 042. `Hindutva` → Hindutva/nacionalismo hindú _(clasificación inicial E)_
- [ ] 043. `Hindu Theocracy` → Teocracia hindú _(clasificación inicial C)_
- [ ] 044. `Christian Theocracy` → Teocracia cristiana _(clasificación inicial C)_
- [ ] 045. `Islamic Theocracy` → Teocracia islámica _(clasificación inicial C)_
- [ ] 046. `Imperialism` → Imperialismo _(clasificación inicial C)_
- [ ] 047. `Marxist Leninism` → Marxismo-leninismo _(clasificación inicial A)_
- [x] 048. `CapCom` → “Capitalist communism”/CapCom _(clasificación inicial F)_
- [ ] 049. `Chavism` → Chavismo _(clasificación inicial E)_
- [ ] 050. `Arab Socialism` → Socialismo árabe _(clasificación inicial E)_
- [ ] 051. `Titoism` → Titoísmo/autogestión yugoslava _(clasificación inicial E)_
- [x] 052. `Monarcho Communism` → Monarco-comunismo _(clasificación inicial F)_
- [ ] 053. `General Authoritarianisms` → Autoritarismo general _(clasificación inicial C)_
- [ ] 054. `Pan Arabism` → Panarabismo _(clasificación inicial E)_
- [ ] 055. `Pan turkism` → Panturquismo _(clasificación inicial E)_
- [ ] 056. `Trumpism` → Trumpismo _(clasificación inicial E)_
- [ ] 057. `Aristocracy` → Aristocracia _(clasificación inicial C)_
- [ ] 058. `Feudalism` → Feudalismo _(clasificación inicial E)_
- [x] 059. `Leninism` → Leninismo _(clasificación inicial B)_
- [ ] 060. `Conservative Socialism` → Socialismo conservador _(clasificación inicial B)_
- [ ] 061. `Black Nationalism` → Nacionalismo negro _(clasificación inicial E)_
- [ ] 062. `Castroism` → Castrismo _(clasificación inicial E)_
- [ ] 063. `Dengism` → Denguismo _(clasificación inicial E)_
- [ ] 064. `Longism` → Longismo (Huey Long) _(clasificación inicial E)_
- [x] 065. `State Liberalism` → Liberalismo estatal _(clasificación inicial F)_
- [ ] 066. `Elective Monarchism` → Monarquía electiva _(clasificación inicial C)_
- [ ] 067. `Paleo Conservatism` → Paleoconservadurismo _(clasificación inicial B)_
- [ ] 068. `Hamiltonianism` → Hamiltonianismo _(clasificación inicial E)_
- [ ] 069. `Pinochetism` → Pinochetismo _(clasificación inicial E)_
- [ ] 070. `Collectivism` → Colectivismo _(clasificación inicial C)_
- [x] 071. `Trotskyism` → Trotskismo _(clasificación inicial A)_
- [ ] 072. `Agrarianism` → Agrarismo _(clasificación inicial B)_
- [ ] 073. `Guevarism` → Guevarismo _(clasificación inicial E)_
- [ ] 074. `Ho Chi Minh Thought` → Pensamiento Ho Chi Minh _(clasificación inicial E)_
- [ ] 075. `Religious Democracy` → Democracia religiosa _(clasificación inicial C)_
- [ ] 076. `Statism` → Estatismo _(clasificación inicial C)_
- [ ] 077. `Kuomintangism` → Kuomintangismo/Tridemismo _(clasificación inicial E)_
- [ ] 078. `Constitutional Monarchism` → Monarquismo constitucional _(clasificación inicial C)_
- [ ] 079. `Zionism` → Sionismo _(clasificación inicial C)_
- [ ] 080. `Neo Conservatism` → Neoconservadurismo _(clasificación inicial B)_
- [x] 081. `Banana Republicanism` → “Republicanismo bananero” _(clasificación inicial F)_
- [ ] 082. `Menshevism` → Menchevismo _(clasificación inicial E)_
- [ ] 083. `Republicanism` → Republicanismo _(clasificación inicial C)_
- [ ] 084. `Gaddafism` → Gadafismo/Tercera Teoría Universal _(clasificación inicial E)_
- [ ] 085. `Gorbachevism` → Gorbachovismo _(clasificación inicial E)_
- [ ] 086. `Labourism` → Laborismo _(clasificación inicial E)_
- [ ] 087. `Liberalism` → Liberalismo _(clasificación inicial A)_
- [ ] 088. `Progressive Conservatism` → Conservadurismo progresista _(clasificación inicial B)_
- [x] 089. `Liberal Conservatism` → Conservadurismo liberal europeo _(clasificación inicial A)_
- [x] 090. `Conservatism` → Conservadurismo _(clasificación inicial A)_
- [x] 091. `Communalism` → Comunalismo/municipalismo libertario _(clasificación inicial A)_
- [ ] 092. `Left Communism` → Comunismo de izquierda _(clasificación inicial B)_
- [ ] 093. `Anti Capitalism` → Anticapitalismo _(clasificación inicial C)_
- [ ] 094. `General Socialism` → Socialismo general _(clasificación inicial C)_
- [x] 095. `Distributism` → Distributismo _(clasificación inicial A)_
- [ ] 096. `Centrism` → Centrismo _(clasificación inicial C)_
- [ ] 097. `National Liberalism` → Liberalismo nacional _(clasificación inicial B)_
- [ ] 098. `General Capitalism` → Capitalismo general _(clasificación inicial C)_
- [ ] 099. `Anti Communism` → Anticomunismo _(clasificación inicial C)_
- [ ] 100. `Dark Enlightenment` → Ilustración Oscura/neorreacción _(clasificación inicial B)_
- [ ] 101. `Social Darwinism` → Darwinismo social _(clasificación inicial E)_
- [ ] 102. `Progressivism` → Progresismo _(clasificación inicial C)_
- [ ] 103. `Third Way` → Tercera vía _(clasificación inicial B)_
- [ ] 104. `Girondism` → Girondinismo _(clasificación inicial E)_
- [ ] 105. `Kleptocracy` → Cleptocracia _(clasificación inicial C)_
- [x] 106. `Council Communism` → Comunismo de consejos _(clasificación inicial B)_
- [ ] 107. `Democratic Confederalism` → Confederalismo democrático _(clasificación inicial A)_
- [ ] 108. `Greenism` → Ecologismo verde _(clasificación inicial A)_
- [x] 109. `Social Democracy` → Socialdemocracia _(clasificación inicial A)_
- [ ] 110. `Social Liberalism` → Liberalismo social _(clasificación inicial A)_
- [x] 111. `Neo Liberalism` → Neoliberalismo _(clasificación inicial A)_
- [ ] 112. `Green Libertarianism` → Libertarismo verde _(clasificación inicial B)_
- [ ] 113. `Confederalism` → Confederalismo _(clasificación inicial C)_
- [ ] 114. `Laissez Faire Capitalism` → Capitalismo laissez-faire _(clasificación inicial B)_
- [ ] 115. `Transhumanism` → Transhumanismo _(clasificación inicial C)_
- [x] 116. `Luxemburgism` → Luxemburgismo _(clasificación inicial A)_
- [ ] 117. `Liberal Socialism` → Socialismo liberal _(clasificación inicial B)_
- [ ] 118. `Utopian Socialism` → Socialismo utópico _(clasificación inicial E)_
- [x] 119. `Democratic Socialism` → Socialismo democrático pluralista _(clasificación inicial A)_
- [ ] 120. `Social Libertarianism` → Libertarismo social _(clasificación inicial B)_
- [ ] 121. `Libertarianism` → Libertarismo _(clasificación inicial C)_
- [ ] 122. `Distributist Libertarianism` → Distributismo libertario _(clasificación inicial B)_
- [x] 123. `Classical Liberalism` → Liberalismo clásico _(clasificación inicial A)_
- [ ] 124. `Marxism` → Marxismo _(clasificación inicial C)_
- [ ] 125. `Gandhism` → Gandhismo _(clasificación inicial E)_
- [ ] 126. `Syndicalism` → Sindicalismo _(clasificación inicial D)_
- [ ] 127. `Anti Authoritarianism` → Antiautoritarismo _(clasificación inicial C)_
- [x] 128. `Astro Libertarianism` → Astrolibertarismo _(clasificación inicial F)_
- [ ] 129. `National Libertarianism` → Libertarismo nacional _(clasificación inicial B)_
- [ ] 130. `Paleo Libertarianism` → Paleolibertarismo _(clasificación inicial B)_
- [ ] 131. `Situationism` → Situacionismo _(clasificación inicial E)_
- [x] 132. `Market Socialism` → Socialismo de mercado _(clasificación inicial A)_
- [ ] 133. `Left Rothbardianism` → Rothbardianismo de izquierda _(clasificación inicial B)_
- [ ] 134. `Neozapatismo` → Neozapatismo _(clasificación inicial E)_
- [ ] 135. `Libertarian Feminism` → Feminismo libertario _(clasificación inicial B)_
- [ ] 136. `Korwinism` → Korwinismo _(clasificación inicial E)_
- [ ] 137. `Christian Libertarianism` → Libertarismo cristiano _(clasificación inicial B)_
- [ ] 138. `Propertarianism` → Propertarianismo _(clasificación inicial B)_
- [ ] 139. `Libertarian Socialism` → Socialismo libertario _(clasificación inicial A)_
- [ ] 140. `Libertarian Market Socialism` → Socialismo libertario de mercado _(clasificación inicial B)_
- [ ] 141. `Mandelaism` → Mandelaísmo/mandelismo **ambiguo** _(clasificación inicial F)_
- [ ] 142. `Antifa` → Antifascismo militante _(clasificación inicial D)_
- [ ] 143. `Georgism` → Georgismo _(clasificación inicial B)_
- [ ] 144. `Objectivism` → Objetivismo randiano _(clasificación inicial B)_
- [ ] 145. `Bleeding-Heart Libertarianism` → Libertarismo compasivo _(clasificación inicial B)_
- [ ] 146. `Neo Libertarianism` → Neolibertarismo _(clasificación inicial F)_
- [x] 147. `Minarchism` → Minarquismo _(clasificación inicial A)_
- [ ] 148. `Accelerationism (Left)` → Aceleracionismo de izquierda _(clasificación inicial B)_
- [x] 149. `Anarcho communism` → Anarcocomunismo _(clasificación inicial A)_
- [x] 150. `Minarcho Socialism` → Socialismo minarquista _(clasificación inicial F)_
- [x] 151. `Platformism` → Plataformismo/especifismo _(clasificación inicial A)_
- [x] 152. `Anarcho Pacifism` → Anarcopacifismo _(clasificación inicial A)_
- [x] 153. `Mutualism` → Mutualismo _(clasificación inicial A)_
- [ ] 154. `Religious Anarchism` → Anarquismo religioso _(clasificación inicial B)_
- [x] 155. `Anarcho Fascism` → “Anarcofascismo” _(clasificación inicial F)_
- [ ] 156. `Agorism` → Agorismo _(clasificación inicial B)_
- [x] 157. `Anarcho Monarchism` → “Anarcomonarquismo” _(clasificación inicial F)_
- [ ] 158. `Pink Capitalism` → Capitalismo rosa _(clasificación inicial D)_
- [x] 159. `Anarcho capitalism` → Anarcocapitalismo rothbardiano _(clasificación inicial A)_
- [ ] 160. `Accelerationism (Right)` → Aceleracionismo de derecha _(clasificación inicial B)_
- [x] 161. `Anarcho Posadism` → “Anarcoposadismo” _(clasificación inicial F)_
- [x] 162. `Anarcho Syndicalism` → Anarcosindicalismo _(clasificación inicial A)_
- [ ] 163. `Anarcha Feminism` → Anarcofeminismo _(clasificación inicial B)_
- [ ] 164. `Queer Anarchism` → Anarquismo queer _(clasificación inicial B)_
- [x] 165. `Anarcho Collectivism` → Anarquismo colectivista _(clasificación inicial A)_
- [ ] 166. `Eco Anarchism` → Ecoanarquismo/ecología social _(clasificación inicial B)_
- [ ] 167. `Egoism` → Egoísmo anarquista/stirneriano _(clasificación inicial B)_
- [x] 168. `Individualist Anarchism` → Anarquismo individualista _(clasificación inicial A)_
- [ ] 169. `Voluntaryism` → Voluntarismo político _(clasificación inicial B)_
- [ ] 170. `Hoppeanism` → Hoppeanismo _(clasificación inicial B)_
- [x] 171. `Anarcho Darwinism` → “Anarcodarwinismo” _(clasificación inicial F)_
- [x] 172. `Soulism` → Soulism/ego-comunalismo de foro _(clasificación inicial F)_
- [x] 173. `Anarcho Nazbol` → “Anarco-nazbol” _(clasificación inicial F)_
- [ ] 174. `Anarcho primitivism` → Anarcoprimitivismo _(clasificación inicial B)_
- [x] 175. `True Anarchism` → “Anarquismo verdadero” _(clasificación inicial F)_
- [x] 176. `Anarcho Frontierism` → “Anarcofronterismo” _(clasificación inicial F)_
- [ ] 177. `Illegalism` → Ilegalismo histórico _(clasificación inicial D)_
- [x] 178. `Avaritionism` → Avaricionismo _(clasificación inicial F)_
