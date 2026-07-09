# Investigación: socialdemocracia, reformismo, liberalismos, verdes y corrientes libertarias

**Fecha de corte:** 9 de julio de 2026

**Ámbito:** España. Los arquetipos internacionales solo se emplean para definir diferencias doctrinales que no pueden atribuirse a un partido español sin fuente propia.

**Uso previsto:** cuestionario exhaustivo de Espectro, perfiles de afinidad y auditoría de las categorías `socialdemocracia-reformismo`, `centro-liberalismo`, `verde-animalista`, `democracia-instituciones`, `estado-sindicatos`, `energia`, `geopolitica` y `religion`.

**Criterio:** una posición se asigna a un actor únicamente cuando figura en un programa, estatuto, resolución congresual, comunicación institucional o candidatura comprobada. Una coalición no transfiere automáticamente todo su programa a cada componente, ni un texto firmado por un colaborador convierte su opinión en doctrina de la fundación que lo publica.

## Resumen ejecutivo

El espacio estudiado no forma un «centro» continuo. Contiene familias que coinciden en algunas respuestas y divergen en el motivo, el alcance y la institución encargada de aplicarlas:

1. **Socialdemocracia institucional:** PSOE combina economía social de mercado, negociación colectiva, Estado social, europeísmo, OTAN y cierre nuclear ordenado.
2. **Izquierda reformista y ecosocial:** Movimiento Sumar, Podemos y Más Madrid comparten protección social y protagonismo sindical, pero difieren en organización, seguridad europea, relación con la OTAN y grado de soberanía estatal. Sumar fue además una candidatura de coalición; no debe confundirse con el partido Movimiento Sumar ni con todos sus componentes.
3. **Izquierda republicana centralista:** Izquierda Española es un actor separado, con énfasis en unidad estatal, laicidad, representación proporcional, intervención pública y separación de poderes. Su candidatura europea de 2024 no equivale a representación obtenida.
4. **Centro-derecha liberal y democristiano:** el PP se define a la vez liberal, democristiano y conservador; de esa genealogía no se deduce confesionalidad. Su documentación actual respalda democracia constitucional, elección de vocales judiciales de procedencia judicial por los jueces, diálogo social, OTAN y continuidad nuclear condicionada a seguridad.
5. **Liberalismo electoral sin representación nacional actual:** Ciudadanos mantiene actividad orgánica y comunicación en 2026 y fue candidatura europea en 2024, pero carece de representación estatal. Volt España también fue candidatura en 2024 y combina federalismo europeo, negociación colectiva y energía nuclear condicionada; no es libertarianismo de Estado mínimo.
6. **Libertarismo minarquista:** P-LIB es el único partido español activo localizado que se define expresamente como minarquista en su programa vigente. No es anarcocapitalista: conserva justicia, orden y defensa estatales, aunque quiere reducirlos, abrir arbitraje y devolver funciones a la sociedad civil.
7. **Ecologismo y animalismo:** PACMA, Verdes Equo —marca pública Partido Verde desde 2026— y Alianza Verde son organizaciones distintas. PACMA fue candidatura propia; Verdes Equo concurrió integrado en coaliciones; Alianza Verde participó en la candidatura de Podemos en 2024. Las tres rechazan la prolongación nuclear en sus fuentes propias, pero no se les deben heredar posiciones de política exterior de sus respectivas coaliciones.
8. **Humanismo, transversalidad y tecnoprogresismo:** Por Un Mundo Más Justo, Futuro y Alianza Futurista son casos útiles para no convertir «basarse en evidencia» o «incorporar expertos» en apoyo a ministros no electos. Son actores pequeños y con distinta evidencia electoral.
9. **Entidades no electorales:** NEOS es una fundación/movimiento de sociedad civil; Instituto Juan de Mariana y Fundación para el Avance de la Libertad son centros de ideas; Students For Liberty es una red formativa. Ninguno debe ofrecerse como «partido más afín».
10. **UPyD es histórico:** anunció su disolución en diciembre de 2020. Puede conservarse para comparar programas pasados, nunca como opción activa.

Las respuestas con mayor riesgo de **equifinalidad** son «los impuestos son un robo», salir de la OTAN, apoyar o rechazar la energía nuclear, pedir un referéndum saharaui, defender consultas directas o desconfiar de los partidos. Un anarcocapitalista, un marxista revolucionario y un ultranacionalista pueden elegir la misma frase sobre impuestos por razones incompatibles. Espectro necesita subpreguntas causales en esos nodos.

## 1. Método, evidencia y escala

### 1.1 Valores codificables

| Valor | Significado |
|---:|---|
| +2 | apoyo explícito, central y reciente a la proposición exacta |
| +1 | apoyo explícito pero condicionado, indirecto o documentado en una fuente menos reciente |
| 0 | compromiso deliberado entre los dos polos o posición realmente mixta |
| −1 | preferencia contraria moderada o rechazo condicionado |
| −2 | rechazo explícito y central |
| ? | evidencia insuficiente; no imputar una posición |

El cero no significa «sin datos». La ausencia siempre es `?`. Tampoco se debe completar un perfil por cercanía familiar: que un partido se llame verde no determina su postura sobre la OTAN; que sea democristiano no determina que quiera un Estado confesional; que sea libertario no determina por sí solo su posición sobre aborto o fronteras.

### 1.2 Confianza y fecha

| Confianza | Evidencia admisible |
|---|---|
| Alta | BOE, estatutos vigentes, programa electoral o resolución congresual propia reciente |
| Media | comunicado oficial inequívoco, borrador institucional identificado o documento propio antiguo aún publicado |
| Baja | archivo histórico, texto de una entidad afín o inferencia mínima y señalada |
| No codificable | prensa, opinión de tercero, silencio documental o extrapolación desde una coalición |

Cada valor de producción debería guardar como mínimo `actor_id`, `proposition_id`, valor, URL, título, fecha del documento, fecha de consulta, ámbito electoral, tipo de fuente, pasaje resumido y confianza. Sin ese historial no será posible mostrar que una posición cambió o quedó obsoleta.

### 1.3 Cuatro estados que el frontend debe mostrar por separado

| Estado | Qué demuestra | Qué no demuestra |
|---|---|---|
| Partido activo | organización y actividad pública en 2026 | que vaya a figurar en la próxima papeleta |
| Candidatura proclamada | presencia en una elección concreta | actividad posterior ni escaños |
| Componente de coalición | participación en una lista común | adhesión íntegra a todas las posiciones de la coalición |
| Fundación, asociación o corriente | producción doctrinal o militante | condición de partido o posibilidad de voto |

El [BOE de candidaturas generales de 2023](https://www.boe.es/buscar/doc.php?id=BOE-A-2023-14733&lang=es), su [proclamación definitiva](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-15066), la [proclamación europea de 2024](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-9687) y el [escrutinio europeo](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-13092) deben registrarse como fuentes diferentes: aparecer, ser proclamado y obtener representación son hechos distintos.

## 2. Estado real de los actores a julio de 2026

| Actor | Estado comprobado | Evidencia electoral reciente | Etiqueta correcta en Espectro |
|---|---|---|---|
| PSOE | partido activo; 41.º Congreso y primarias en 2026 | generales 2023 y europeas 2024 | partido nacional con representación |
| Movimiento Sumar | partido activo desde 2023, documentos de Asamblea 2025 | integrado en candidatura Sumar en europeas 2024 | partido; no confundir con la coalición Sumar |
| Sumar | coalición/candidatura de varios actores | generales 2023 y europeas 2024 | candidatura de esas elecciones, con programa propio de coalición |
| Podemos | partido activo; V Asamblea de 2025 | candidatura propia europea 2024 | partido y candidatura 2024 |
| Más Madrid | partido activo de ámbito madrileño | componente de Sumar; representación autonómica y municipal | partido territorial, no papeleta estatal separada |
| Izquierda Española | partido activo con afiliación y web propias | candidatura europea 2024; sin escaño | partido activo y candidatura 2024 |
| PP | partido activo; 21.º Congreso de 2025 | generales 2023 y europeas 2024 | partido nacional con representación |
| Ciudadanos | partido activo, prensa y estrategia vigentes en 2026 | candidatura europea 2024; sin escaño | partido activo extraparlamentario a escala estatal |
| P-LIB | partido activo, programa y estatutos vigentes publicados en 2025 | sin candidatura estatal 2023/2024 verificada aquí | partido doctrinal activo, no «opción de papeleta actual» |
| Volt España | partido activo, estatutos 2025 | candidatura europea 2024; sin escaño | partido pan-europeo y candidatura 2024 |
| PACMA | partido activo | generales 2023 y europeas 2024 | partido y candidatura propia |
| Verdes Equo / Partido Verde | partido activo; «Partido Verde» es marca política pública desde 2026 | componente de coaliciones, no lista separada estatal en 2024 | partido componente; conservar nombre legal y marca |
| Alianza Verde | partido activo | integrado en la candidatura de Podemos de 2024 | partido componente, no candidatura separada |
| Por Un Mundo Más Justo (M+J) | partido activo | generales 2023; componente de EXISTE en europeas 2024; actividad electoral 2026 | partido humanista/transversal |
| Futuro | partido activo y extraparlamentario | candidatura europea 2024 | partido/candidatura pequeña |
| Alianza Futurista (ALFA) | partido activo muy pequeño, actividad web 2026 | candidatura estatal reciente no verificada | partido doctrinal extraparlamentario |
| NEOS | fundación y movimiento cultural activo | no procede | organización no electoral |
| Instituto Juan de Mariana | asociación/centro de estudios activo | no procede | productor de ideas, no partido |
| Fundación para el Avance de la Libertad | fundación activa | no procede | productor de ideas, no partido |
| Students For Liberty | red educativa internacional con actividad en España | no procede | red no electoral |
| UPyD | disuelto en diciembre de 2020 | candidatura histórica; no vigente | perfil histórico desactivado |

La actividad web por sí sola no prueba inscripción vigente ni capacidad para concurrir; a la inversa, una inscripción registral no prueba actividad real. Conviene guardar `legal_status`, `activity_status`, `ballot_status` y `representation_status` como campos separados.

## 3. Socialdemocracia y reformismo de izquierdas

### 3.1 PSOE

La [resolución política del 41.º Congreso](https://41congreso.psoe.es/wp-content/uploads/2024/12/RESOLUCION-41Congreso.pdf) y los [Estatutos federales](https://41congreso.psoe.es/wp-content/uploads/2025/03/ESTATUTOS41o-CF.pdf) ofrecen la base más reciente. El partido defiende democracia representativa, Estado social, separación de poderes, diálogo social y negociación colectiva. Pide reforzar recursos y participación institucional de los sindicatos y proyecta una ley de negociación colectiva; no propone integrar los sindicatos en el Estado.

En energía sostiene el calendario de cierre ordenado del parque nuclear y una transición renovable. En seguridad respalda los compromisos de la OTAN, el apoyo a Ucrania y el desarrollo de capacidades europeas complementarias. La resolución trata el riesgo nuclear militar, pero no basta para imputarle adhesión al Tratado sobre la Prohibición de las Armas Nucleares. Sobre el Sáhara apoya la mediación de Naciones Unidas y una solución mutuamente aceptable conforme a sus normas; eso no equivale automáticamente a exigir la opción concreta de referéndum que formula `sd-019`. No se localizó una propuesta de federación con Portugal.

En religión combina aconfesionalidad constitucional con una agenda laicista: escuela pública laica, neutralidad de actos públicos, igualdad entre convicciones y revisión del régimen de acuerdos con la Santa Sede. No defiende ateísmo de Estado ni prohibición de la expresión religiosa privada o pública.

Internamente, permite corrientes de opinión pero no tendencias organizadas que rompan la unidad de acción. La secretaría general se elige por voto directo de la militancia; la regla general limita a tres mandatos internos, con excepción cuando se ejerce la Presidencia del Gobierno. Determinados pactos de gobierno o investidura se someten a consulta vinculante. La revocación exige un procedimiento orgánico, no una destitución instantánea a voluntad de cualquier elector.

| Proposición exacta | Valor | Fuente/fecha | Confianza |
|---|---:|---|---|
| La separación de poderes debe preservarse (`dem-008`) | +2 | resolución 41.º Congreso, 2024 | alta |
| Los jueces superiores deben ser elegidos directamente por toda la ciudadanía (`dem-005`) | ? | no se formula | no codificable |
| Gobierno, sindicatos y patronal deben mantener diálogo social institucional | +2 | resolución 41.º Congreso, 2024 | alta; no equivale a planes vinculantes de `lab-007` |
| Los sindicatos deben quedar integrados en una estructura estatal única (`lab-006`) | −2 | pluralismo sindical y diálogo social | alta |
| Las centrales nucleares deben cerrar al final del calendario acordado (`ene-003`) | +2 | resolución 41.º Congreso, 2024 | alta |
| España debe salir de la OTAN (`sd-001`) | −2 | resolución 41.º Congreso, 2024 | alta |
| Deben prohibirse totalmente las armas nucleares aunque choque con alianzas (`geo-006`) | ? | no hay compromiso exacto localizado | no codificable |
| El Sáhara debe decidirse necesariamente mediante referéndum (`sd-019`) | ? | solución ONU mutuamente aceptable, sin mecanismo exacto | no codificable |
| España y Portugal deben constituir una federación (`geo-010`) | ? | no localizado | no codificable |
| El Estado debe imponer el ateísmo y excluir religiones de la vida pública (`rel-001`) | −2 | aconfesionalidad/laicidad pluralista | alta |
| La militancia debe decidir de forma vinculante ciertos acuerdos de gobierno (`dem-014`) | +2 | Estatutos, 2025 | alta |
| La máxima dirección del partido debe tener límites temporales | +1 | tres mandatos con excepción | alta; no reutilizar `dem-003`, que es público |

### 3.2 Movimiento Sumar y la candidatura Sumar

Movimiento Sumar mantiene [documentos propios de su Asamblea de 2025](https://movimientosumar.es/docs-asamblea2025/), incluidos el [documento político](https://movimientosumar.es/transparencia/wp-content/uploads/sites/6/2025/05/Documento_Politico_Asamblea_Mov_Sumar_2025.pdf), el [organizativo](https://movimientosumar.es/transparencia/wp-content/uploads/sites/6/2025/05/Documento_Organizativo_Asamblea_Mov_Sumar_2025.pdf) y sus [estatutos](https://movimientosumar.es/transparencia/wp-content/uploads/sites/6/2025/07/Estatutos-tras-Asamblea-2025_DEF.pdf). Son la fuente adecuada para el partido. El programa de la candidatura Sumar de 2023/2024 solo debe asociarse al objeto «coalición Sumar».

El partido actual se define laborista, ecosocial y feminista. Sitúa a los sindicatos de clase y la negociación colectiva en el centro, propone democracia en la empresa, defiende instituciones democráticas y a la vez una ampliación republicana y participativa. En política exterior sostiene pacifismo, no violencia, autonomía estratégica europea y reducción de dependencia estadounidense; rechaza que el aumento de gasto y la confrontación entre bloques organicen la política exterior. El documento actual no aporta, por sí solo, un mandato inequívoco de salida inmediata de la OTAN.

Reivindica la libre autodeterminación del Sáhara Occidental y la responsabilidad española como potencia administradora. Defiende independencia judicial y desbloqueo democrático de los órganos, no elección popular directa de jueces. Propone terminar con los privilegios confesionales y los acuerdos con la Santa Sede, dentro de un Estado laico. En los documentos partidarios revisados no aparece una posición suficientemente concreta sobre extensión o cierre de centrales nucleares, armas nucleares ni integración política con Portugal.

La Asamblea General de personas inscritas es el órgano soberano. Elige un grupo coordinador; la coordinación general se selecciona dentro de este por mayoría reforzada, con límite temporal. Hay mecanismos de revocación, representación proporcional de sensibilidades, doble militancia y ratificación de acuerdos para formar gobierno. Por tanto, «la dirección la elige la militancia» necesita distinguir elección directa del máximo cargo y elección indirecta mediante órgano.

| Proposición exacta | Valor | Fuente/fecha | Confianza |
|---|---:|---|---|
| Los convenios sectoriales y sindicatos de clase deben vertebrar el trabajo (`lab-001`) | +2 | documento político, 2025 | alta |
| Las plantillas deben participar en decisiones empresariales (`lab-002`) | +2 | documento político, 2025 | alta |
| España debe abandonar inmediatamente la OTAN (`sd-001`) | ? | crítica de bloques sin mandato exacto | no codificable |
| La política exterior debe priorizar vías pacíficas y desmilitarización | +2 | documento político, 2025 | alta; no equivale a neutralidad de `geo-001` |
| El Sáhara debe ejercer libre autodeterminación (`sd-019`) | +2 | documento político, 2025 | alta |
| Altos jueces deben elegirse por sufragio ciudadano (`dem-005`) | ? | independencia y reforma no resuelven el método de elección | no codificable |
| Deben terminar los acuerdos privilegiados con la Santa Sede (`fem-009`) | +2 | documento político, 2025 | alta |
| Debe prolongarse o cerrar el parque nuclear (`ene-001`/`ene-003`) | ? | no localizado en fuente propia actual | no codificable |
| Toda la militancia elige directamente a la coordinación general | −1 | elección indirecta dentro del grupo coordinador | alta |
| Los acuerdos para formar gobierno deben ratificarse internamente (`dem-014`) | +2 | estatutos/documento organizativo, 2025 | alta |

### 3.3 Podemos

Podemos conserva [actividad, documentos y estructura propias](https://podemos.info/eu/documentos/); su [programa europeo de 2024](https://podemos.info/wp-content/uploads/2024/05/Programa-PODEMOS-elecciones-europeas-2024.pdf) permite separar su perfil del de Sumar. Defiende desarme, prohibición de armas nucleares y adhesión al tratado correspondiente. Plantea terminar con la subordinación a Estados Unidos y desplazar recursos de la OTAN hacia una política europea común, junto a una fuerza europea defensiva y control parlamentario. Esta combinación no se resume bien como aislacionismo ni como simple «salir/no salir» de la OTAN.

El programa pide autodeterminación y referéndum para el Sáhara, relaciones con la RASD y una MINURSO con competencias de derechos humanos. En energía exige abandonar la fisión nuclear, excluirla de la taxonomía verde y desarrollar redes públicas, renovables y distribuidas. No se localizó en la fuente revisada una posición partidaria actual bastante precisa sobre Portugal ni sobre toda la escala religión-Estado.

En el modelo organizativo de su V Asamblea, la Asamblea Ciudadana de personas inscritas decide estrategia, programas, listas, pactos, secretaría general y órganos de garantías, con procedimientos de revocación. La secretaría general se elige directamente y puede ser revocada; la convocatoria no es un derecho instantáneo de cualquier inscrito, sino que exige umbrales orgánicos. Podemos [declara financiarse sin préstamos bancarios](https://podemos.info/financiacion/) mediante mecanismos propios y microcréditos, elemento relevante para organización pero no para el eje ideológico general.

| Proposición exacta | Valor | Fuente/fecha | Confianza |
|---|---:|---|---|
| La fisión nuclear debe abandonarse y no considerarse verde (`ene-002`/`ene-003`) | +2 / +1 | programa europeo, 2024 | alta; el calendario exacto de `ene-003` es más específico |
| Deben prohibirse y eliminarse las armas nucleares (`geo-006`) | +2 | programa europeo, 2024 | alta |
| España debe desarrollar armas nucleares propias (`geo-007`) | −2 | programa europeo, 2024 | alta |
| España debe salir sin más de toda estructura de seguridad aliada (`sd-001`) | ? | propone sustituir subordinación OTAN por defensa europea | no codificable |
| El Sáhara debe celebrar un referéndum de autodeterminación (`sd-019`) | +2 | programa europeo, 2024 | alta |
| Toda operación militar importante debe controlarse democráticamente (`geo-009`) | +1 | control parlamentario/consulta, alcance condicionado | alta |
| Las listas y pactos relevantes deben decidirse mediante voto interno (`dem-014`) | +2 | documentos V Asamblea, 2025 | alta |
| La dirección interna puede revocarse mediante umbrales y procedimiento | +2 | documentos V Asamblea, 2025 | alta; no reutilizar `dem-002` público |

### 3.4 Más Madrid

Más Madrid es un partido territorial activo; no debe rellenarse con todo el programa estatal de la coalición Sumar. Su [programa autonómico de 2023](https://programa.masmadrid.org/pdf/Comunidad%20de%20Madrid/Programa%20M%C3%A1s%20Madrid%20-%20CM%202023.pdf) respalda servicios públicos, transición renovable, participación ciudadana, diálogo con sindicatos y una administración profesional. El [Ayuntamiento de Madrid mantiene su grupo municipal](https://www.madrid.es/portales/munimadrid/es/Inicio/El-Ayuntamiento/El-Pleno/Composicion/Corporacion-actual/Grupo-Municipal-Mas-Madrid/Grupo-Municipal-Mas-Madrid/?vgnextchannel=8bfd75b8ce8fa610VgnVCM2000001f4a900aRCRD&vgnextfmt=default&vgnextoid=aed69cd8de7d8810VgnVCM2000001f4a900aRCRD), lo que verifica actividad institucional.

El ámbito autonómico explica el silencio sobre OTAN, armas nucleares, Sáhara y Portugal; ese silencio no es neutralidad política y debe quedar como `?`. Tampoco se encontró una posición propia actual suficientemente precisa sobre prolongación de centrales nucleares ni estatutos recientes accesibles para codificar su organización interna sin inferencias.

| Proposición | Valor | Fuente/fecha | Confianza |
|---|---:|---|---|
| La administración debe institucionalizar diálogo con sindicatos | +2 | programa autonómico, 2023 | alta para Madrid; no prueba planes vinculantes de `lab-007` |
| Debe ampliarse la participación directa ciudadana (`dem-001`) | +1 | programa autonómico, 2023 | alta para Madrid |
| Energía nuclear civil (`ene-001`/`ene-003`) | ? | no documentada con precisión | no codificable |
| OTAN, armas nucleares, Sáhara y Portugal | ? | fuera del programa localizado | no codificable |
| Elección y revocación de la dirección interna | ? | estatuto vigente no localizado | no codificable |

### 3.5 Izquierda Española

Izquierda Española mantiene [web, afiliación y actividad propias](https://www.izqesp.es/) y fue candidatura proclamada en las europeas de 2024. Sus [estatutos y declaración programática](https://www.izqesp.es/docs/Estatutos%20Izquierda%20Espan%CC%83ola.pdf) defienden un Estado democrático y social, representación proporcional, separación e independencia judicial, modelo territorial unitario, negociación colectiva e iniciativa económica pública. También declaran un Estado laico y libertad de conciencia.

En energía formula sostenibilidad, precio asequible, descarbonización y soberanía, sin fijar en ese texto si la nuclear debe ampliarse o cerrarse. Sobre el Sáhara apela a la responsabilidad histórica de España y al Derecho internacional, pero no concreta necesariamente el procedimiento `sd-019`. No se localizó posición sobre OTAN, armas nucleares o federación ibérica.

El Congreso, compuesto por delegados elegidos por afiliados, es soberano y se celebra normalmente cada tres o cuatro años. La secretaría general encabeza una lista cerrada al ejecutivo elegida en Congreso; no es una elección directa separada de toda la afiliación. Una revocación exige Congreso extraordinario y procedimiento del Consejo Nacional. Esta arquitectura distingue representación interna de democracia plebiscitaria.

| Proposición | Valor | Fuente/fecha | Confianza |
|---|---:|---|---|
| Debe preservarse separación e independencia judicial (`dem-008`) | +2 | estatutos/declaración, 2022; candidatura 2024 | alta para el texto, media para actualidad material |
| España debe adoptar un modelo territorial unitario | +2 | declaración programática | alta |
| El Estado debe poder intervenir y emprender en la economía (`lab-016`) | +2 | declaración programática | alta |
| La negociación colectiva debe protegerse (`lab-001`) | +2 | declaración programática | alta |
| Debe existir un Estado laico con libertad de conciencia | +2 | declaración programática | alta |
| El Sáhara debe celebrar necesariamente referéndum (`sd-019`) | ? | responsabilidad y Derecho internacional sin mecanismo | no codificable |
| La nuclear debe ampliarse o cerrarse | ? | no precisa tecnología | no codificable |
| Toda afiliación elige directamente al secretario general | −1 | elección congresual por lista | alta |

## 4. Liberalismo, democracia cristiana y centro reformista

### 4.1 Partido Popular

La [ponencia política del 21.º Congreso](https://www.pp.es/storage/2025/06/21_Congreso_Ponencia_Politica.pdf) se sitúa expresamente en las tradiciones liberal, democristiana y conservadora, dentro de la democracia constitucional y la economía social de mercado. Estas tres etiquetas describen corrientes internas históricas; no autorizan a crear tres partidos ni a inferir teocracia o confesionalidad.

El PP defiende separación de poderes y que los vocales judiciales del CGPJ sean elegidos por jueces, no una elección directa de jueces por toda la ciudadanía. Considera el diálogo social un pilar y no propone sindicatos estatales. En energía apuesta por neutralidad tecnológica, prolongación nuclear segura y nuevas capacidades. En seguridad califica la OTAN de indispensable, exige cumplir compromisos y someter decisiones relevantes al Congreso. Sobre el Sáhara invoca Derecho internacional, sin fijar en la ponencia un referéndum; no hay propuesta de integración con Portugal ni posición actual explícita localizada sobre dotarse de armamento nuclear español.

Los [estatutos del 21.º Congreso](https://www.pp.es/storage/2025/06/250616-PONENCIA-ESTATUTOS.-21-Congreso-PP.pdf) articulan la elección de presidencia mediante compromisarios vinculados al proceso de candidaturas. No es sufragio directo final de toda la afiliación. Las corrientes organizadas contrarias a la unidad del partido pueden ser sancionadas y no existe un límite general fijo de mandatos de la presidencia.

| Proposición exacta | Valor | Fuente/fecha | Confianza |
|---|---:|---|---|
| La separación de poderes debe preservarse (`dem-008`) | +2 | ponencia política, 2025 | alta |
| Los altos jueces deben ser elegidos directamente por todos los votantes (`dem-005`) | −2 | propone elección por jueces para vocales judiciales | alta |
| Gobierno, sindicatos y patronal deben mantener diálogo social | +2 | ponencia política, 2025 | alta; no prueba el plan vinculante de `lab-007` |
| Debe autorizarse nueva capacidad nuclear y prolongarse la segura (`ene-001`) | +2 | ponencia política, 2025 | alta |
| La taxonomía sostenible debe incluir nuclear bajo requisitos (`ene-002`) | ? | apoyo nuclear no prueba posición exacta sobre taxonomía | no codificable |
| España debe salir de la OTAN (`sd-001`) | −2 | OTAN indispensable | alta |
| España debe construir armas nucleares propias (`geo-007`) | ? | no localizado | no codificable |
| El Sáhara debe celebrar necesariamente referéndum (`sd-019`) | ? | solo Derecho internacional | no codificable |
| La militancia elige en voto final directo al presidente | −1 | proceso mediante compromisarios | alta |
| Debe haber un máximo fijo de mandatos internos | −1 | no consta límite general | alta; distinto de `dem-003` público |

### 4.2 Ciudadanos

Ciudadanos mantiene [actividad de prensa en 2026](https://www.ciudadanos-cs.org/prensa), una [estrategia pública](https://www.ciudadanos-cs.org/estrategia) y [estatutos](https://www.ciudadanos-cs.org/estatutos). Fue candidatura proclamada en las europeas de 2024, aunque el escrutinio confirma que no obtuvo escaño. Por tanto, «desaparecido» sería falso; «sin representación estatal» es preciso.

Su [programa europeo de 2024](https://www.ciudadanos-cs.org/var/public/documentos/2024-05/programa-electoral-9j-europeas.pdf) defiende federalización europea, política exterior común y capacidades militares europeas compatibles con la OTAN. No se localizó allí una posición concluyente sobre nuclear civil, armas nucleares, Sáhara, Portugal o el continuo completo de relación Iglesia-Estado.

Los estatutos establecen elección directa y secreta de secretaría general y comité nacional mediante lista, con avales; Asamblea General normalmente delegada cada cuatro años; y moción interna de censura/revocación con umbrales. Algunas candidaturas se someten a primarias. La existencia de un mecanismo no significa revocación libre e inmediata.

| Proposición | Valor | Fuente/fecha | Confianza |
|---|---:|---|---|
| La UE debe federalizarse y desarrollar defensa común (`lib-013`) | +2 | programa europeo, 2024 | alta |
| La defensa europea debe coordinarse con la OTAN | +2 | programa europeo, 2024 | alta |
| España debe salir de la OTAN (`sd-001`) | −2 | programa europeo, 2024 | alta |
| Nuclear civil, armas nucleares, Sáhara y Portugal | ? | no localizado en fuente actual revisada | no codificable |
| La afiliación elige directamente secretaría general | +2 | estatutos vigentes consultados en 2026 | alta |
| La dirección interna puede revocarse mediante procedimiento y umbrales | +1 | estatutos | alta; distinto de `dem-002` público |

### 4.3 UPyD: solo referencia histórica

UPyD [anunció oficialmente su disolución en diciembre de 2020](https://www.europapress.es/nacional/noticia-upyd-anuncia-oficialmente-disolucion-recuerda-compromiso-regeneracion-democratica-20201206195939.html). Su última presencia electoral debe fecharse con BOE histórico, por ejemplo la [proclamación de candidaturas de 2016](https://www.boe.es/buscar/doc.php?id=BOE-A-2016-5186&lang=es). No se deben mezclar sus programas pasados con posiciones de Ciudadanos, Izquierda Española o Futuro por compartir algunas palabras como «regeneración» o «centralismo».

En producción conviene mantener `active=false`, `historical_profile=true` y ocultarlo de resultados que prometan «qué puedes votar ahora». Esta es una fuente secundaria para la disolución; si se localiza la resolución registral, debe sustituirla.

## 5. Liberalismo libertario y federalismo europeo

### 5.1 P-LIB: partido minarquista, no anarcocapitalista

P-LIB mantiene [actividad y noticias propias en 2026](https://www.p-lib.es/noticias/), publica sus [datos oficiales](https://www.p-lib.es/datos-oficiales-del-partido-libertario/) y concentra sus textos normativos en [Documentos](https://www.p-lib.es/documentos). El [Programa Político Marco vigente](https://www.p-lib.es/wp-content/uploads/2025/12/PPM-vigente.pdf) se define expresamente **minarquista**: quiere un Estado mínimo, austero y limitado, pero conserva justicia, seguridad y defensa. Es por ello incorrecto asignarle el arquetipo anarcocapitalista, que aboliría también esos monopolios y la financiación fiscal obligatoria.

El núcleo del programa es propiedad, libre contratación, responsabilidad individual y prohibición de iniciar coacción. Presenta los impuestos como exacción forzosa o mal que ha de minimizarse, limita tipos y bases y favorece proporcionalidad; no pide su abolición inmediata. Apoya arbitraje privado y devolución gradual de tareas a la sociedad civil, pero mantiene la justicia estatal como último garante y funciones de orden. En dinero propone competencia monetaria, fin del curso forzoso, libertad para criptoactivos y banca libre, con una transición alejada del banco central monopolista.

En inmigración reconoce un derecho muy amplio a instalarse y trabajar, condicionado al respeto de personas, contratos y propiedad. Esa respuesta puede coincidir con una regularización progresista, pero la justificación es distinta: libertad de movimiento y asociación frente a igualdad social o reparación colonial. En aborto el programa busca neutralidad estatal, reconoce libertad especialmente en una primera fase y protege objeción de conciencia; no encaja de forma limpia en un polo moral-conservador o en una financiación pública universal.

Prefiere una república y más control democrático, aunque subordina la regla de mayoría a derechos individuales. Defiende una Unión Europea más integrada en funciones comunes pero limitada y subsidiaria, y una defensa común; no se localizó un mandato actual inequívoco sobre pertenencia a la OTAN. En política exterior combina no intervención y rechazo de guerras no defensivas con pasajes favorables a intervenciones humanitarias bajo condiciones: debe conservarse como tensión documental, no forzarse a `pacifista` o `belicista`. Rechaza la conscripción.

El programa admite secesión pacífica de personas o colectivos junto a la renuncia a los servicios y protección de la jurisdicción abandonada. No es nacionalismo periférico: deriva de consentimiento y salida. Defiende separación completa entre Iglesias y Estado, fin de privilegios vaticanos, libertad religiosa y libertad atea. Sobre el Sáhara propone referéndum supervisado, garantías de censo y derechos, y contempla vínculos de nacionalidad española. En sindicatos defiende asociación voluntaria, pero rechaza privilegios, subvenciones y exclusividad negociadora; una [posición oficial de 2026](https://www.p-lib.es/2026/05/01/devolver-a-los-trabajadores-el-poder-sobre-su-vida/) insiste en sindicatos independientes y voluntarios.

Una [posición oficial sobre el apagón y la energía](https://www.p-lib.es/2025/04/30/pedro-sanchez-miente-la-causa-de-fondo-del-apagon-es-el-mercantilismo/) apoya la nuclear y critica el cierre político; al no ser el programa marco, la confianza es media. Los [estatutos vigentes](https://www.p-lib.es/wp-content/uploads/2025/12/Estatutos-vigentes-del-Partido-Libertario.pdf) atribuyen al Congreso la elección y control de los órganos; no documentan una democracia líquida ni revocación instantánea por cualquier simpatizante.

| Proposición exacta | Valor | Fuente/fecha | Confianza |
|---|---:|---|---|
| Policía, tribunales y defensa deben ser las únicas funciones permanentes del Estado | +2 | programa vigente, 2025 | alta |
| Policía y justicia deben prestarse sin monopolio estatal (`lib-002`) | +1 | abre arbitraje y devolución gradual, pero conserva garante estatal | alta |
| Cobrar impuestos mediante coacción es, en esencia, una forma de robo (`lab-009`) | +1 | describe exacción coercitiva, pero conserva imposición mínima | alta |
| El rechazo fiscal se basa en propiedad y consentimiento individual (`lab-010`) | +2 | programa vigente | alta |
| Monedas privadas y criptoactivos deben competir sin curso forzoso | +2 | programa vigente | alta |
| Debe terminar el monopolio de los bancos centrales | +2 | programa vigente | alta |
| La inmigración pacífica debe ser legal con respeto a propiedad y contratos (`lib-018`) | +2 | programa vigente | alta |
| El Estado debe imponer una moral religiosa sobre el aborto | −2 | neutralidad y libertad inicial | alta |
| Iglesia y Estado deben separarse por completo | +2 | programa vigente | alta |
| La conscripción militar debe abolirse (`geo-014`) | +2 | programa vigente | alta |
| España debe salir de la OTAN (`sd-001`) | ? | no localizado de forma inequívoca | no codificable |
| Una persona o comunidad puede separarse pacíficamente de la jurisdicción | +2 | programa vigente | alta |
| El Sáhara debe celebrar un referéndum supervisado (`sd-019`) | +2 | programa vigente | alta |
| Debe autorizarse nueva nuclear (`ene-001`) | ? | el comunicado respalda nuclear y critica cierres, pero no prueba obra nueva | no codificable para el ítem exacto |

### 5.2 Volt España

Volt España es un partido activo, con [presentación y estructura propias](https://voltespana.org/sobre-volt), [estatutos de 2025](https://voltespana.org/storage/pdf/estatutos-de-volt-espana-2025.pdf) y candidatura europea proclamada en 2024. Su identidad pan-europea hace aplicables sus programas comunes, pero la base de datos debe marcar `scope=Volt Europa` cuando la fuente no sea específica de España.

El [programa europeo de 2024](https://volteuropa.org/storage/pdf/eu-elections-2024/volt-eur-electoral-moonshot-program_v5-final-%281%29.pdf) respalda negociación colectiva, representación de trabajadores en consejos y sindicatos modernos sometidos a rendición de cuentas. En energía propone mantener reactores existentes durante su ciclo seguro, prolongarlos cuando sean necesarios para el clima y el operador asuma costes, admitir nuevos diseños inherentemente seguros e investigar fisión avanzada y fusión. No es «nuclear sin condiciones».

En seguridad propone una unión europea de defensa coordinada con la OTAN. Una [declaración de julio de 2026 alojada por Volt Europa y firmada, entre otros, por sus eurodiputados](https://volteuropa.org/news/nato-30-can-only-be-built-with-a-european-defence-union) sigue considerando la alianza columna vertebral mientras se construye capacidad europea. Sobre armas nucleares combina disuasión europea —incluida una transición del componente francés a control europeo democrático— con reducción de arsenales y objetivo de prohibición cuando exista una arquitectura de seguridad creíble. Es una postura secuencial: respalda `geo-005`, pero el apoyo final al desarme no equivale a firmar **ahora** el tratado aunque los aliados se opongan, como exige `geo-006`; `geo-008`, nunca responder ni siquiera a un ataque, tampoco se deduce.

No se localizaron posiciones propias actuales suficientemente exactas sobre el Sáhara, federación con Portugal o modelo religioso español. Federalizar Europa no implica fusionar España y Portugal. Asimismo, el lenguaje de evidencia y datos no prueba que apoye ministros tecnócratas sin responsabilidad parlamentaria.

La Asamblea General está abierta a la membresía, se reúne con periodicidad estatutaria, elige órganos y puede destituirlos con mayorías reforzadas. La junta tiene copresidencia de distinto género, mandatos de dos años y máximo de tres; una fracción de la militancia puede convocar asamblea extraordinaria.

| Proposición exacta | Valor | Fuente/fecha | Confianza |
|---|---:|---|---|
| Trabajadores deben estar representados en consejos de empresa (`lab-002`) | +2 | programa europeo, 2024 | alta para Volt Europa; media-alta para Volt España |
| Debe autorizarse nueva nuclear de diseño inherentemente seguro (`ene-001`) | +1 | programa europeo, 2024 | alta para política común; apoyo condicionado |
| La taxonomía debe incluir actividades nucleares que cumplan requisitos (`ene-002`) | +2 | programa europeo, 2024 | alta |
| La UE debe federalizarse y tener defensa común (`lib-013`) | +2 | programa europeo, 2024 | alta |
| La OTAN sigue siendo necesaria durante la construcción de defensa europea | +2 | programa 2024 y declaración con firmantes Volt, julio 2026 | alta por convergencia de fuentes |
| Debe conservarse disuasión nuclear aliada mientras no haya sustituto creíble (`geo-005`) | +2 | programa/posición europea | alta |
| España debe ratificar ahora el TPAN aunque aliados se opongan (`geo-006`) | −1 | el desarme se condiciona a una arquitectura de seguridad creíble | alta |
| España debe construir unilateralmente su propia bomba (`geo-007`) | −2 | propone control europeo, no arsenal nacional | alta |
| Los ministros deben ser técnicos no elegidos (`lib-014`) | ? | evidencia no equivale a falta de control democrático | no codificable |
| La dirección interna debe tener límites temporales | +2 | estatutos, 2025 | alta; distinto de `dem-003` público |

## 6. Ecologismo, animalismo y partidos verdes

### 6.1 PACMA

PACMA mantiene [actividad propia](https://pacma.es/actualidad/), [programas electorales](https://pacma.es/programa-electoral/) y candidaturas estatales y europeas. Su [programa europeo de 2024](https://pacma.es/wp-content/uploads/2024/05/PE_EUROPA_9J24.pdf) considera fósiles y nuclear insostenibles y arriesgados, y prioriza renovables. También defiende escuela pública laica y un catálogo amplio de derechos animales. No contiene una posición suficientemente concreta sobre OTAN, armas nucleares, Sáhara o integración con Portugal; «PACMA es pacifista porque protege animales» sería una inferencia inválida.

La [dirección actual](https://pacma.es/equipo-humano/) procede de una Asamblea General celebrada en marzo de 2024 y fue elegida por tres años. Sin los estatutos completos actuales no conviene convertir ese dato en una teoría general sobre revocación o corrientes internas.

| Proposición | Valor | Fuente/fecha | Confianza |
|---|---:|---|---|
| Debe mantenerse exactamente el calendario nuclear y descartar prórrogas (`ene-003`) | +1 | programa europeo, 2024 | alta en rechazo nuclear; mecanismo temporal menos preciso |
| La nuclear puede ser verde si cumple condiciones (`ene-002`) | −2 | programa europeo, 2024 | alta |
| Escuela pública debe ser laica | +2 | programa europeo, 2024 | alta |
| Caza y tauromaquia deben prohibirse (`va-002`/`va-003`) | +2 | programas propios | alta |
| Animales deben recibir protección jurídica reforzada (`va-001`) | +2 | programa propio | alta |
| OTAN, armas nucleares, Sáhara y Portugal | ? | no documentado en fuente revisada | no codificable |
| La dirección tiene mandato temporal | +2 | equipo/Asamblea 2024, tres años | alta para este mandato |

### 6.2 Verdes Equo y la marca Partido Verde

La organización anunció en 2026 que [renovaba su marca política como Partido Verde](https://verdesequo.es/renovamos-nuestra-marca-politica-como-partido-verde). Sus estatutos siguen usando Verdes Equo; la interfaz debería mostrar «Partido Verde (Verdes Equo)» y almacenar por separado `legal_name` y `display_name`. Su [página de principios](https://verdesequo.es/principios) y su posición de [clima y energía](https://verdesequo.es/clima-y-energia) defienden una transición sin combustibles fósiles ni nuclear.

Los [estatutos publicados](https://verdesequo.es/wp-content/uploads/2021/03/ESTATUTOS-2020-V3CC.pdf) sitúan la Asamblea Federal de afiliados como máximo órgano, prevén elección directa, universal y secreta de la ejecutiva y coportavocías, voto transferible, mandatos temporales, revocación con umbral y consultas vinculantes. La fecha de 2020 rebaja la confianza sobre la literalidad vigente si no se confirma una versión posterior.

Las [bases programáticas continuas](https://asamblea.verdesequo.es/wp-content/uploads/2025/11/Programa-Electoral-Continuo-VQ-VF.pdf) son un documento vivo hacia 2026/2027, no un programa electoral final. Priorizan paz, multilateralismo y seguridad humana, y cuestionan gasto ofensivo y alianzas militarizadas. No permiten atribuir con confianza alta una salida inmediata de la OTAN. Las posiciones de Sumar sobre Sáhara o defensa no se transfieren a Verdes Equo por haber concurrido juntos.

| Proposición | Valor | Fuente/fecha | Confianza |
|---|---:|---|---|
| Debe mantenerse exactamente el calendario nuclear y descartar prórrogas (`ene-003`) | +1 | web temática vigente, consulta 2026 | alta en rechazo nuclear; calendario exacto no explicitado |
| La nuclear puede ser verde bajo requisitos (`ene-002`) | −2 | web temática | alta |
| La seguridad debe centrarse en paz, multilateralismo y necesidades humanas | +2 | bases continuas 2025/26 | media por ser documento vivo |
| España debe abandonar inmediatamente la OTAN (`sd-001`) | ? | crítica de alianzas sin mandato exacto final | no codificable |
| El Sáhara debe celebrar referéndum (`sd-019`) | ? | no atribuir programa de coalición | no codificable con fuentes actuales revisadas |
| Ejecutiva y portavocías deben elegirse directamente | +2 | estatutos publicados, 2020 | media |
| La afiliación puede activar consultas vinculantes (`dem-014`) | +2 | estatutos publicados, 2020 | media |

### 6.3 Alianza Verde

Alianza Verde conserva [web, afiliación y actividad propias](https://alianzaverde.es/) en 2026. En las europeas de 2024 suscribió un [acuerdo para integrarse en la candidatura de Podemos](https://alianzaverde.es/noticias/alianza-verde-y-podemos-presentan-un-acuerdo-para-concurrir-juntos-a-las-europeas-en-la-candidatura-de-irene-montero/) y eligió su candidata mediante [primarias internas](https://alianzaverde.es/noticias/alba-ramos-solano-elegida-candidata-en-las-primarias-de-alianza-verde-para-las-elecciones-europeas/). El BOE, por tanto, prueba la lista Podemos; las fuentes de Alianza Verde prueban que fue componente.

En 2025 rechazó la prórroga de Almaraz y en enero de 2026 celebró una [jornada parlamentaria por un futuro libre de nucleares](https://www.alianzaverde.es/news/jornada-parlamentaria-sobre-un-futuro-libre-de-nucleares/). Esa es una posición propia sólida. No se localizaron documentos propios actuales que permitan copiar las posiciones de Podemos sobre OTAN, prohibición nuclear militar, Sáhara o religión.

Su primera Asamblea Federal [eligió coordinación por cuatro años](https://alianzaverde.es/noticias/alianza-verde-celebra-su-primera-asamblea-federal-con-el-objetivo-de-sumar-en-verde-de-cara-al-proximo-ciclo-electoral-y-elige-a-juantxo-lopez-de-uralde-como-coordinador-federal/) y la página de afiliación reconoce voz, voto y elegibilidad. Sin estatutos actuales completos, el mecanismo de revocación queda desconocido.

| Proposición | Valor | Fuente/fecha | Confianza |
|---|---:|---|---|
| Debe cumplirse el cierre nuclear y no prorrogar Almaraz (`ene-003`) | +2 | comunicados 2025/2026 | alta |
| La nuclear puede considerarse verde bajo requisitos (`ene-002`) | −2 | campaña propia 2026 | alta |
| Las candidaturas internas pueden decidirse por primarias | +2 | primarias europeas 2024 | alta para esa elección |
| OTAN, armas nucleares, Sáhara, Portugal y religión | ? | no localizar fuente propia actual | no codificable |
| Toda posición del programa europeo de Podemos pertenece también a Alianza Verde | −2 | error de herencia de coalición | alta metodológica |

## 7. Humanismo, transversalidad y tecnoprogresismo

### 7.1 Por Un Mundo Más Justo (M+J)

M+J mantiene [actividad y organización propias](https://www.porunmundomasjusto.es/) y fue candidatura en las generales de 2023; en 2024 participó en la coalición EXISTE. Su [página de ideología](https://www.porunmundomasjusto.es/ideologia/) se define humanista, transversal, orientada a justicia global, lucha contra pobreza, acogida y regularización migratoria. Su formulación religiosa es plural y de convivencia, no un programa confesional.

Es especialmente útil para el diseño organizativo: la propia organización declara que sus proposiciones ideológicas son dinámicas y requieren aprobación por dos tercios con un cuórum del 40 %. Esto obliga a versionar posiciones y evita tratar una web como texto eterno. Su iniciativa [Tejer la Paz](https://tejerlapaz.es/) y sus mensajes actuales respaldan mediación y cultura de paz, pero no bastan para fijar salida de la OTAN, desarme nuclear unilateral o aislacionismo. La [memoria de actividades 2024](https://www.porunmundomasjusto.es/wp-content/uploads/2025/03/Memoria-de-actividades-2024-MJ.pdf) acredita actividad organizativa.

| Proposición | Valor | Fuente/fecha | Confianza |
|---|---:|---|---|
| Debe facilitarse regularización y acogida migratoria (`sd-021`/`lib-018`) | +2 | ideología y campañas vigentes | alta |
| La política exterior debe priorizar mediación y paz | +2 | Tejer la Paz/actividad oficial | media-alta |
| España debe salir de la OTAN o renunciar siempre a defensa aliada | ? | no se desprende de la cultura de paz | no codificable |
| La doctrina interna puede ser modificada por voto cualificado de afiliados (`dem-014`) | +2 | página de ideología | alta |
| El partido es confesional porque usa lenguaje humanista | −2 | pluralidad expresa | alta |

### 7.2 Futuro

Futuro mantiene [web activa](https://futuro.org.es/), [programa](https://futuro.org.es/home/programa/), [presentación](https://futuro.org.es/home/quienes-somos/) y [estatutos](https://futuro.org.es/wp-content/uploads/2022/04/2021-10-18-ESTATUTOS-COMPLETOS-DEL-PARTIDO-POLI%CC%81TICO-FUTU%CC%81RO.pdf). Fue candidatura europea en 2024. Se presenta como centrista, transversal, socialdemócrata, liberal, europeísta y constitucionalista, con énfasis en talento, administración digital, evaluación y colaboración público-privada.

Ese lenguaje no prueba `lib-014` —que ministros no elegidos sustituyan a representantes—. Un perfil serio debe buscar por separado quién nombra a los expertos, quién puede destituirlos y qué órgano adopta la decisión final. No se localizaron posiciones actuales bastante precisas sobre nuclear, OTAN, armas nucleares, Sáhara, Portugal o relación Iglesia-Estado; dejarlas vacías es preferible a construir un «centro estadístico» artificial.

### 7.3 Alianza Futurista (ALFA)

Alianza Futurista mantiene [actividad web propia en 2026](https://alianzafuturista.org/), publica [estatutos](https://alianzafuturista.org/estatutos.html) y una [declaración de principios](https://alianzafuturista.org/assets/alianza-futurista---ddp-3.3.pdf). Se reconoce como partido muy pequeño y extraparlamentario; no se verificó candidatura estatal reciente.

Su programa tecnoprogresista combina reducción del sufrimiento, democracia, transparencia, renta básica, elementos georgistas, Estado emprendedor, energía nuclear —incluido torio y prolongación técnicamente segura—, consultas y europeísmo. También declara neutralidad política y religiosa. Esta mezcla demuestra que «futurista», «tecnológico» y «liberal» no son sinónimos y que apoyar ciencia no implica gobierno de tecnócratas sin elecciones.

| Proposición | Valor | Fuente/fecha | Confianza |
|---|---:|---|---|
| Debe permitirse nuclear avanzada y prolongar reactores técnicamente seguros (`ene-001`/`ene-009`) | +2 | declaración de principios v3.3 | alta para el documento; media para representatividad electoral |
| La renta básica debe implantarse (`sd-008`) | +2 | declaración de principios | alta |
| Deben utilizarse mecanismos de consulta directa (`dem-001`) | +1 | declaración de principios | alta |
| Expertos no elegidos deben reemplazar al parlamento (`lib-014`) | ? | no se formula | no codificable |
| Debe imponerse ateísmo oficial o veto teocrático (`rel-001`/`rel-003`) | −2 | neutralidad religiosa | alta |

### 7.4 NEOS: referente cultural, no partido

NEOS se presenta como [alternativa cultural y movimiento de sociedad civil](https://neosfundacion.es/la-alternativa-cultural/); su [aviso legal](https://neosfundacion.es/aviso-legal/) identifica la fundación. Defiende humanismo cristiano, vida desde la concepción hasta la muerte natural, matrimonio entre hombre y mujer, papel educativo de las familias y doctrina social de la Iglesia. Sirve para documentar una corriente social conservadora, no para crear una candidatura ficticia ni para completar el perfil del PP.

No se localizaron posiciones institucionales suficientemente precisas sobre nuclear civil, OTAN, armas nucleares, Sáhara o Portugal. Tampoco debe llamarse «paleolibertaria»: el conservadurismo moral y el cristianismo no implican abolición o reducción minarquista del Estado.

## 8. Mapa profundo de liberalismo clásico, minarquismo, anarcocapitalismo y paleolibertarismo

### 8.1 Las etiquetas no son una escalera lineal

El [Manifiesto de Oxford de Liberal International](https://liberal-international.org/who-we-are/our-mission/landmark-documents/political-manifestos/oxford-manifesto-1997/) define el liberalismo mediante derechos, responsabilidad, tolerancia, justicia social, igualdad de oportunidades, mercado, sociedad civil, separación de poderes y responsabilidad democrática. El [Manifiesto de Andorra de 2017](https://liberal-international.org/who-we-are/our-mission/landmark-documents/political-manifestos/liberal-manifesto-2017/) añade descentralización y separación entre religiones organizadas e instituciones estatales. Este liberalismo internacional no exige Estado mínimo ni abolición del banco central.

«Libertarianismo clásico» es una etiqueta especialmente ambigua. En inglés puede aludir al liberalismo radical de derechos naturales, al minarquismo contemporáneo o a una genealogía antiestatal; en español «libertario» tiene además una tradición anarquista de izquierdas. Espectro no debería crear un vector con ese nombre sin preguntar primero si se conserva un Estado mínimo o se elimina, cómo se entiende la propiedad y si la libertad contractual está limitada por derechos sociales. La etiqueta no resuelve esas preguntas.

El minarquismo sí limita al Estado a protección de derechos, policía, tribunales y defensa. La exposición oficial de Ayn Rand sobre [la naturaleza del Gobierno](https://courses.aynrand.org/works/the-nature-of-government/) conserva precisamente esas tres funciones y rechaza la anarquía. El objetivismo no es, sin embargo, sinónimo de todo minarquismo: el Ayn Rand Institute defiende [derecho al aborto](https://newideal.aynrand.org/ayn-rands-radical-views-on-abortion/) y una política exterior de autodefensa firme. Es un contraejemplo útil a la suposición «Estado pequeño = conservadurismo moral = aislacionismo».

El anarcocapitalismo de Murray Rothbard, expuesto en [*For a New Liberty*](https://mises.org/library/book/new-liberty-libertarian-manifesto?d7_alias_migrate=1) y en [«Society Without a State»](https://mises.org/mises-daily/society-without-state), elimina Estado, impuestos y monopolio público de policía, tribunales y defensa, sustituyéndolos por propiedad, contratos, aseguradoras, arbitraje y proveedores competitivos. Esto es un **arquetipo doctrinal**, no un programa de P-LIB ni una candidatura española comprobada.

El paleolibertarismo no es simplemente «anarcocapitalismo más conservador» como casilla estable. Fue una estrategia de finales del siglo XX asociada a Rothbard y Lew Rockwell para coaligar antiestatismo y economía libertaria con paleoconservadurismo y populismo de derechas. El texto primario de Rothbard [«Right-Wing Populism» (1992)](https://archive.lewrockwell.com/rothbard/ir/Ch5.html) suma recorte fiscal y abolición del banco central a orden policial duro, valores familiares, localismo y aislacionismo estadounidense; también plantea transacciones tácticas sobre aborto y moral pública. Es un documento histórico estadounidense, con pasajes hoy incompatibles con estándares de igualdad y derechos, y no puede convertirse en vector automático para una persona española ni para todo autor libertario. No se halló un partido español activo que se autodefina paleolibertario en un programa vigente, y P-LIB no debe recibir esa etiqueta por inferencia.

Hans-Hermann Hoppe argumenta en su [economía política de monarquía y democracia](https://mises.org/journal-libertarian-studies/political-economy-monarchy-and-democracy-and-idea-natural-order?d7_alias_migrate=1) que la monarquía tendría incentivos de horizonte más largo que la democracia, pero su objetivo final sigue siendo una sociedad de derecho privado. También vincula esa salida a [secesión y jurisdicciones competitivas](https://mises.org/mises-daily/political-economy-monarchy-and-democracy). Esto prueba una tesis de **un autor**, no que anarcocapitalistas sean monárquicos, ni que defender una monarquía parlamentaria española sea paleolibertarismo.

### 8.2 Diferencias que sí deben medir los ítems

| Dimensión | Liberalismo democrático/clásico | Minarquismo | Anarcocapitalismo rothbardiano | Paleolibertarismo histórico |
|---|---|---|---|---|
| Estado | limitado, constitucional y responsable; extensión variable | policía, tribunales y defensa como núcleo | abolido, incluida soberanía fiscal y monopolio jurídico | base minarquista o ancap, más estrategia cultural/populista |
| Impuestos | limitados, legales y sujetos a control; pueden financiar bienes públicos | mal o coacción tolerada solo para funciones mínimas; hay variantes voluntaristas | robo/expropiación institucional; abolición | recorte/abolición como bandera populista; alcance según autor |
| Policía y jueces | públicos e independientes, con garantías | funciones estatales irrenunciables | proveedores, aseguradoras y arbitrajes privados competidores | variable; el programa rothbardiano de 1992 combinó fin último privado con policía pública más dura en transición |
| Propiedad y contratos | derechos centrales limitados por ley y derechos ajenos | principio central; pocas limitaciones | orden jurídico basado en propiedad, no agresión y contrato | mismo núcleo libertario, acompañado de instituciones culturales tradicionales según corriente |
| Dinero y banco central | admite banco central independiente y regulación | desde banco central restringido hasta banca libre | moneda competitiva y banca libre; abolición del monopolio | «abolir la Fed» fue bandera histórica, no criterio cultural suficiente |
| Fronteras e inmigración | movilidad legal con derechos e integración | desde fronteras abiertas hasta control mínimo por seguridad | desacuerdo interno: libertad de movimiento frente a acceso a propiedad/jurisdicciones privadas | a menudo más restrictivo o localista por alianza cultural, pero no universal |
| Aborto y moral | pluralidad liberal; autonomía y derechos dentro de ley | depende de teoría sobre personalidad fetal; Rand es proelección | también dividido por cuándo nace un sujeto de derechos | tendencia a compromiso local/tradicional en estrategia histórica, no regla lógica del antiestatismo |
| Democracia y monarquía | democracia constitucional y separación de poderes | democracia limitada por derechos; república frecuente | mayoría no puede vulnerar propiedad; orden contractual | Hoppe compara monarquía favorablemente con democracia, pero busca sociedad sin Estado; no es consenso ancap |
| UE | cooperación o federalismo liberal | cooperación subsidiaria y limitada | asociación voluntaria; rechazo a soberanía fiscal coercitiva | frecuente soberanismo/anti-globalismo histórico, dependiente del país |
| OTAN y guerra | desde atlantismo hasta seguridad colectiva europea | defensa estatal; intervención exterior disputada | fuerte tradición no intervencionista, autodefensa privada | aislacionismo/«primero el país» frecuente en la estrategia estadounidense |
| Ejército y conscripción | ejército bajo control civil; conscripción discutida | defensa estatal profesional; conscripción normalmente rechazada | defensa competitiva/asegurada; conscripción rechazada como coacción | combina no intervención con discurso de orden; no implica pacifismo |
| Secesión | autodeterminación territorial bajo reglas constitucionales | descentralización y salida amplia en algunas variantes | salida contractual hasta individuo/comunidad; pierde servicios de la jurisdicción | localismo y secesión como estrategia contra centralización |
| Religión | libertad de conciencia y separación institucional | depende del autor; Estado no impone credo | asociaciones religiosas voluntarias sin privilegio fiscal estatal | alianza cultural con tradición religiosa en algunas formulaciones |

Las columnas no son perfiles para puntuar directamente. Sirven para generar proposiciones independientes. Una persona puede ser minarquista, proaborto, partidaria de fronteras abiertas, federalista europea y atlantista; otra puede compartir el Estado mínimo y responder al revés en cuatro dimensiones.

### 8.3 Ecosistema español comprobado

| Actor | Naturaleza | Qué puede atribuirse | Qué no debe atribuirse |
|---|---|---|---|
| P-LIB | partido político activo | minarquismo, mercado, competencia monetaria, federalismo/secesión, inmigración amplia, separación Iglesia-Estado y posiciones de su programa | abolición completa de policía, tribunales y Estado; toda tesis de Rothbard o Hoppe |
| Instituto Juan de Mariana | asociación/centro de estudios activo | que promueve estudio y debate liberal; actividad y publicaciones propias | convertir cada artículo de autor en programa institucional o electoral |
| Fundación para el Avance de la Libertad | fundación independiente activa | promoción de libertad individual y producción editorial plural liberal/libertaria | un vector único ancap; candidaturas o afiliación partidaria |
| Students For Liberty | red educativa internacional con actividad europea/española | formación y red de estudiantes prolibertad | partido español o programa electoral único |
| Ayn Rand Institute | entidad internacional doctrinal | objetivismo y textos oficiales de Rand | organización española o portavoz de P-LIB |
| Mises Institute y autores | instituto/editor y archivo doctrinal internacional | textos identificados de Rothbard, Hoppe y otros autores | consenso de todos los liberales españoles |

El [Instituto Juan de Mariana](https://juandemariana.org/) continúa activo en 2026 y publica posiciones distintas firmadas por autores. Un artículo de junio de 2026 sobre [Estado protector y funciones mínimas](https://juandemariana.org/el-estado-protector-nos-consume/) es evidencia de una voz minarquista en su ecosistema, no un estatuto vinculante del Instituto. La propia variedad de sus actividades exige guardar `author` y `institutional_approval`.

La [Fundación para el Avance de la Libertad](https://fundalib.org/obj/) es una entidad no electoral y mantiene [estudios en 2026](https://fundalib.org/estudios/). Un número de su revista explica la diferencia entre minarquismo y anarcocapitalismo, y un [cuaderno de Jesús Huerta de Soto](https://fundalib.org/wp-content/uploads/2021/06/Cuaderno-06-JHS-Liberalismo-versus-anarcocapitalismo-WEB.pdf) argumenta contra la estabilidad del Estado mínimo. Ambos son textos con autor; no convierten a la Fundación entera en partido ancap. [LibertyCon Europe 2026](https://studentsforliberty.org/blog/libertycon-europe-2026/) acredita actividad de Students For Liberty, no candidatura.

### 8.4 No usar «libertario» como resultado único

El resultado exhaustivo debería devolver, como mínimo, cinco componentes separados:

- alcance del Estado;
- propiedad, contrato y fiscalidad;
- libertades civiles y moral;
- democracia, salida y organización territorial;
- política exterior, defensa y alianzas.

Solo después puede describirse una combinación. «Liberal constitucional con fuerte Estado social», «federalista europeo socioliberal», «minarquista civilmente plural» o «antiestatista de mercado no intervencionista» informa más que una etiqueta total. «Anarcocapitalista» solo debería aparecer cuando coincidan abolición estatal, rechazo fiscal y provisión no monopolística de justicia/seguridad; `lib-002` por sí solo no basta.

## 9. Equifinalidad y subpreguntas esenciales

### 9.1 Impuestos: el caso prioritario

El bloque existente `lab-009` a `lab-013` va en la dirección correcta: la pregunta principal debe ser de *matching* y no puntuar ideología por sí sola. Sus ramas deben distinguir al menos:

| Respuesta causal | Corrientes posibles | Qué discrimina |
|---|---|---|
| «La propiedad no debe financiar nada sin consentimiento individual» | anarcocapitalismo, minarquismo voluntarista | propiedad/no agresión; `lab-010` |
| «Los impuestos no alteran quién posee y dirige la producción» | marxismos, socialización autogestionaria | crítica de propiedad, no deseo de bajar gasto; `lab-011` |
| «Las aportaciones deben gestionarlas organizaciones laborales» | sindicalismo revolucionario, mutualismo, corporativismos voluntarios | sustitución institucional; `lab-012` |
| «Rechazo cuantía y uso, no la existencia» | liberalismo fiscal, conservadurismo, protesta coyuntural | gradualismo; `lab-013` |
| «Una nación o territorio paga para sostener a otro» | nacionalismo fiscal | agravio territorial, ausente en las ramas actuales |
| «El sistema beneficia a élites conectadas y grandes empresas» | populismos de izquierda/derecha, liberalismo anticorporativista | captura/élite, todavía mezclado con otros motivos |

No debe mostrarse «tu puntuación económica» tras la pregunta. Solo se muestra una subpregunta breve: «Has dicho que cobrar impuestos se parece a un robo. ¿Cuál es la razón principal?». Debe permitirse «varias razones» o una segunda selección, porque una respuesta única forzada puede falsear perfiles reales.

### 9.2 Salir de la OTAN no equivale a pacifismo

Una respuesta afirmativa a `sd-001` puede deberse a:

- pacifismo y desarme;
- antiimperialismo de izquierda;
- soberanismo nacional y deseo de ejército propio más fuerte;
- no intervención libertaria y rechazo a financiar guerras ajenas;
- federalismo europeo que quiere sustituir OTAN por una fuerza de la UE;
- neutralidad pragmática para evitar arrastre a conflictos.

La rama debe preguntar por el sustituto: neutralidad sin alianzas; defensa nacional; defensa europea; seguridad colectiva ONU; abolición de fuerzas armadas; o alianza distinta. Después se aplican `geo-001` a `geo-009`. Rechazar la OTAN y apoyar armas nucleares españolas es coherente en un soberanismo militar; rechazar ambas es otro perfil.

### 9.3 Energía nuclear civil y armas nucleares son ejes distintos

Apoyar nuclear civil puede provenir de descarbonización, soberanía energética, abundancia tecnológica o confianza en el mercado. Rechazarla puede proceder de riesgo ambiental, coste, centralización empresarial o pacifismo antinuclear. La respuesta a `ene-002` nunca debe rellenar `geo-006`.

Cuando alguien considere la nuclear verde, preguntar:

1. si acepta reactores existentes, nuevos o solo investigación avanzada;
2. quién asume costes de construcción, residuos y seguro;
3. si seguridad y emisiones de ciclo completo son condiciones;
4. si la prioridad es clima, precio, soberanía o innovación.

Cuando alguien apoye disuasión nuclear, separar arsenal español (`geo-007`), paraguas aliado (`geo-005`), uso en represalia (`geo-008`) y desarme multilateral condicionado (`geo-006`). Volt muestra que disuasión temporal y abolición final pueden coexistir.

### 9.4 Democracia directa, revocación y organización interna

«Más democracia directa» puede significar referéndums estatales, mandato imperativo, primarias de afiliados, asamblea de todo el partido, sorteo o derecho de secesión. No deben sumarse como una misma intensidad.

Una revocación también necesita cuatro campos: quién inicia, umbral de firmas, quién decide y cuándo puede activarse. PSOE, Sumar, Podemos, Ciudadanos, Verdes Equo y Volt tienen mecanismos muy distintos aun cuando todos puedan recibir un `+` genérico en «revocabilidad».

### 9.5 Sáhara, Portugal y reclamaciones históricas

El apoyo a un referéndum saharaui puede justificarse por Derecho internacional, descolonización, responsabilidad española, apoyo a la RASD o voluntad de los residentes. La pregunta `sd-019` necesita una rama sobre el mecanismo y otra sobre qué hacer si Marruecos, el Polisario o parte del censo rechazan el acuerdo.

`geo-010`, federación España-Portugal, debe distinguir:

- federación ibérica voluntaria aprobada en ambos países;
- integración dentro de una federación europea más amplia;
- anexión o reclamación histórica;
- cooperación reforzada sin soberanía común.

El apoyo de Volt a una Europa federal no prueba iberismo; la secesión voluntaria de P-LIB tampoco prueba expansionismo. `geo-011` es la salvaguarda correcta: la voluntad de residentes debe prevalecer sobre títulos históricos.

### 9.6 Religión: una sola escala tampoco basta

La gradación propuesta por el usuario —ateísmo de Estado, laicismo, aconfesionalidad, confesionalidad, teocracia— es útil como presentación inicial, pero combina cinco mecanismos distintos:

| Mecanismo | Pregunta necesaria |
|---|---|
| credo legal | ¿El Estado declara una religión, ninguna o una doctrina atea? |
| financiación | ¿Financia cultos, servicios sociales concertados o ninguno? |
| educación | ¿Hay religión curricular, extracurricular o solo historia de religiones? |
| expresión pública | ¿Pueden ciudadanos y cargos exhibir símbolos sin que el Estado adopte credo? |
| poder político | ¿Puede una autoridad religiosa vetar leyes o nombrar cargos? |

Así, PSOE puede defender laicidad y revisión de acuerdos sin excluir expresión religiosa; P-LIB puede pedir separación completa por anti-privilegio; NEOS puede promover cultura cristiana sin ser teocracia. `rel-001`, `rel-002` y `rel-003` cubren extremos, pero faltan piezas intermedias de financiación, enseñanza y símbolos.

## 10. Matriz comparada de posiciones verificadas

La matriz resume evidencia, no sustituye los pasajes actor por actor. `Cond.` significa apoyo sujeto a condiciones explícitas y `?` ausencia de evidencia suficiente. Una casilla vacía nunca debe convertirse en punto medio.

### 10.1 Instituciones, sindicatos y nuclear civil

| Actor | Democracia e instituciones | Estado y sindicatos | Nuclear civil | Confianza temporal |
|---|---|---|---|---|
| PSOE | constitucional, representativa, separación de poderes; consultas internas en supuestos tasados | diálogo social, negociación colectiva y pluralismo sindical | cierre conforme al calendario acordado | alta, Congreso 2024/estatutos 2025 |
| Movimiento Sumar | institucional, republicano y participativo; coordinación interna indirecta | sindicatos de clase, negociación colectiva y democracia en empresa | ? en documento partidario actual | alta, Asamblea 2025 |
| Podemos | democracia participativa, primarias y votaciones internas vinculantes | poder laboral, servicios y redes públicas | abandono de fisión y exclusión de taxonomía verde | alta, programa 2024/Asamblea 2025 |
| Más Madrid | participación y servicios públicos en ámbito autonómico | diálogo con sindicatos en Madrid | ? | alta para programa autonómico 2023; alcance territorial |
| Izquierda Española | representativa, proporcional, unitaria y con separación judicial | negociación colectiva e iniciativa económica estatal | política energética sostenible sin tecnología especificada | alta para documento; actividad confirmada 2026 |
| PP | constitucional y representativa; vocales judiciales elegidos por jueces | diálogo social y economía social de mercado | prórroga y nueva capacidad bajo seguridad/neutralidad tecnológica | alta, Congreso 2025 |
| Ciudadanos | liberal representativa y federalista europea | ? con fuente actual revisada | ? | alta para programa/estatutos 2024; actividad 2026 |
| P-LIB | república, derechos individuales y mayoría limitada | sindicatos voluntarios, independientes y sin privilegio/subvención | favorable; provisión despolitizada/competitiva | alta programa 2025; media comunicado energía 2025 |
| Volt | federalismo europeo y órganos internos electivos | negociación colectiva y representación laboral en consejos | continuidad y nueva tecnología solo bajo condiciones | alta para política europea 2024/2026 |
| PACMA | partido electoral; estructura interna asamblearia documentada parcialmente | ? | rechazo y transición renovable | alta, programa 2024 |
| Partido Verde/Verdes Equo | democracia interna directa según estatuto publicado | ? con fuente propia actual revisada | transición sin nuclear | alta posición energética; media estatutos 2020 |
| Alianza Verde | primarias verificadas para candidatura 2024 | ? | cierre y rechazo de prórroga | alta, 2024-2026 |
| M+J | ideología interna dinámica aprobada por mayoría reforzada | enfoque de justicia social, sin modelo sindical exacto localizado | ? | alta para proceso interno; actividad 2026 |
| Futuro | constitucionalismo, evaluación y reforma administrativa | colaboración público-privada; detalle sindical insuficiente | ? | media-alta, programa activo pero poco fechado |
| ALFA | democracia, consultas y tecnoprogresismo | renta básica/Estado emprendedor, no socialdemocracia clásica | nuclear avanzada y extensión técnica | alta para declaración; baja representatividad electoral |

### 10.2 Alianzas, armas nucleares, Sáhara, Portugal y religión

| Actor | OTAN/seguridad | Armas nucleares | Sáhara | Portugal | Religión-Estado | Organización interna |
|---|---|---|---|---|---|---|
| PSOE | OTAN y pilar europeo | ? sobre TPAN | solución ONU mutuamente aceptable; mecanismo ? | ? | aconfesionalidad con agenda laicista | SG directa; consultas tasadas; tres mandatos con excepción |
| Movimiento Sumar | pacifismo, autonomía UE y menor dependencia de EE. UU.; salida OTAN ? | desarme general; compromiso exacto ? | libre autodeterminación | ? | fin de acuerdos/privilegios confesionales | Asamblea soberana; coordinación indirecta y revocable |
| Podemos | superar subordinación OTAN mediante defensa europea controlada | prohibición/TPAN | referéndum y autodeterminación | ? | ? en fuente actual revisada | Asamblea de inscritos; SG directa; revocación reglada |
| Más Madrid | ? | ? | ? | ? | ? | estatuto vigente no localizado |
| Izquierda Española | ? | ? | responsabilidad española y Derecho internacional; mecanismo ? | ? | Estado laico y libertad de conciencia | Congreso de delegados; SG por lista; revocación congresual |
| PP | OTAN indispensable y defensa europea complementaria | ? sobre arsenal/TPAN | Derecho internacional; mecanismo ? | ? | no inferir del rótulo democristiano | presidencia mediante compromisarios; sin límite general fijo |
| Ciudadanos | OTAN y ejército/defensa común europea | ? | ? | ? | ? | SG y comité elegidos directamente; censura reglada |
| P-LIB | no intervención y defensa; OTAN actual ? | ? | referéndum supervisado | ?; sí cooperación/federalismo europeo | separación completa y libertad religiosa | Congreso elige presidencia, SG y ejecutiva |
| Volt | OTAN como columna vertebral y unión europea de defensa | disuasión europea transitoria + desarme final condicionado | ? | ? | ? | Asamblea de miembros; copresidencia; límites de mandato |
| PACMA | ? | ? | ? | ? | escuela pública laica | Junta elegida tres años en 2024 |
| Partido Verde/Verdes Equo | paz/seguridad humana; salida OTAN ? | ? | ? con fuente propia actual | ? | no codificado aquí con fuente reciente | elección directa y revocación según estatuto 2020 |
| Alianza Verde | ? propio | ? propio | ? propio | ? | ? propio | coordinación cuatro años; primarias 2024 |
| M+J | cultura de paz; alianza concreta ? | ? | ? | ? | pluralidad de convicciones | posiciones aprobadas 2/3 con cuórum declarado |
| Futuro | europeísmo; arquitectura militar ? | ? | ? | ? | ? | estatutos propios, detalle no codificado aquí |
| ALFA | europeísmo/neutralidad declarada | ? | ? | ? | neutralidad religiosa | Asamblea y presidencia electa según estatutos publicados |

## 11. Auditoría del banco actual

### 11.1 Elementos bien resueltos

- `lab-009` es correctamente *solo-matching* y sus ramas `lab-010` a `lab-013` evitan asignar automáticamente una ideología.
- `dem-002` y su seguimiento condicionado `izq-037` distinguen revocación reglada de revocabilidad permanente; no son duplicado si la condición se respeta.
- `dem-003` conserva una sola formulación sobre límites públicos y `dem-004` está retirado por ser su inverso, lo que evita doble peso.
- `lib-002` separa bien anarcocapitalismo de minarquismo: privatizar también policía y justicia es el salto doctrinal relevante.
- `geo-005` a `geo-008` distinguen paraguas aliado, tratado de prohibición, arsenal español y no uso absoluto.
- `geo-010` exige aprobación separada de España y Portugal, por lo que no confunde iberismo voluntario con anexión.
- `ene-001`, `ene-002` y `ene-003` separan nuevas centrales, taxonomía sostenible bajo requisitos y calendario de cierre.
- `rel-001`, `rel-002` y `rel-003` evitan confundir ateísmo de Estado, aconfesionalidad plural y veto teocrático.

### 11.2 Duplicados o pesos que deben revisarse antes de ampliar

| Elementos | Problema | Recomendación |
|---|---|---|
| `sd-011` y `ene-007` | ambos miden empresa pública energética | conservar el texto más preciso y que el otro sea alias/no puntuable |
| `va-005` frente a `ene-001`/`ene-003` | extensión nuclear reaparece en dos módulos | una sola pregunta puntuable; el módulo verde puede reutilizarla |
| `va-007` y `ene-010` | decrecimiento casi repetido | consolidar o reservar uno a motivo/alcance sectorial |
| `sd-019` dentro de geopolítica | prefijo heredado sugiere familia socialdemócrata | migrar a `geo-sahara-*` o documentar alias estable |
| límites y revocación públicos frente a internos | `dem-002`/`dem-003` hablan de representantes/cargos públicos, pero fuentes partidarias describen cargos internos | crear ítems internos separados; no reutilizar valores |
| `lab-007` | pregunta por planes sectoriales **vinculantes**, más fuerte que «diálogo social» | añadir un ítem previo sobre negociación/consulta tripartita; no codificar PSOE o PP `+2` solo por dialogar |
| `lib-014` | mezcla cualificación profesional, independencia partidaria y legitimidad de nombramiento | dividir en experto sujeto a control parlamentario y decisor no electo con autonomía política |
| notas `Esperado:` de `centro-liberalismo` | contienen valores partidarios no enlazados a evidencia y algunos generalizan familias | convertirlos en hipótesis de calibración, no verdad de producción; exigir fuente por valor |

Un error concreto a evitar es leer `ene-002` como «nuclear verde sin condiciones»: el texto actual ya exige requisitos técnicos y gestión de residuos. Volt encaja precisamente en un apoyo condicionado. Otro es asignar `dem-003` a un partido porque limita mandatos de su dirección; el ítem se refiere a cargos ejecutivos públicos.

### 11.3 Huecos prioritarios con redacción neutral

Los siguientes textos cubren diferencias solicitadas y no deberían puntuar hasta ser revisados y pilotados:

| ID provisional | Texto propuesto | Función |
|---|---|---|
| `lib-gap-min-state` | «La policía, los tribunales y la defensa deberían ser las únicas funciones permanentes del Estado.» | ancla minarquista distinta de `lib-002` |
| `lib-gap-no-state` | «También la defensa nacional debería prestarse mediante contratos voluntarios, sin impuestos ni monopolio estatal.» | completa el salto ancap; usar tras apoyo a `lib-002` |
| `lib-gap-money` | «El euro debería poder competir con monedas privadas o criptomonedas sin obligación general de aceptarlo.» | curso forzoso/competencia monetaria |
| `lib-gap-central-bank` | «Los bancos centrales deberían abolirse y la emisión de dinero quedar abierta a entidades competidoras.» | separa banca libre radical de cripto tolerada |
| `lib-gap-contract` | «Un contrato entre personas adultas debería ser válido salvo fraude, coacción o daño directo a terceros.» | alcance de libertad contractual sin absolutismo retórico |
| `lib-gap-exit` | «Una persona o comunidad debería poder dejar una jurisdicción política si renuncia también a sus servicios y protección.» | secesión privada/individual frente a autodeterminación nacional |
| `lib-gap-private-rules` | «Una comunidad residencial podría fijar reglas de convivencia más restrictivas que la ley general si aceptarlas fuera voluntario y salir siguiera siendo posible.» | orden contractual; requiere prueba cognitiva y salvaguardas |
| `lib-gap-abortion-reason` | «Mi posición sobre el aborto depende principalmente de cuándo considero que existe una persona con derechos propios.» | separa personalidad fetal de moral religiosa o financiación pública |
| `lib-gap-monarchy` | «Aunque sea hereditaria, una monarquía limitada puede proteger mejor la propiedad a largo plazo que una democracia electoral.» | tesis hoppeana, solo mapa; no confundir con monarquismo tradicional |
| `dem-gap-expert` | «El parlamento debería fijar los objetivos y poder destituir a expertos independientes que gestionen organismos técnicos.» | pericia con control democrático |
| `dem-gap-technocrat` | «En materias técnicas, un órgano de expertos debería poder tomar decisiones finales aunque el parlamento discrepara.» | tecnocracia fuerte y coste de legitimidad |
| `lab-gap-dialogue` | «Gobierno, sindicatos y organizaciones empresariales deberían negociar reformas laborales antes de aprobarlas.» | diálogo social sin planes vinculantes |
| `org-gap-direct-leader` | «La máxima dirección de un partido debería elegirse por voto directo de toda su afiliación.» | elección directa frente a delegados/órgano intermedio |
| `org-gap-term-limit` | «La máxima dirección de un partido debería tener un límite de mandatos internos.» | no contaminar `dem-003` público |
| `org-gap-recall` | «La afiliación debería poder iniciar una votación para destituir a la dirección antes del siguiente congreso.» | revocación interna con posterior rama de umbral |
| `geo-gap-isolation` | «España debería reducir su participación en organizaciones internacionales y limitar su política exterior a intereses nacionales directos.» | aislacionismo, distinto de neutralidad militar y pacifismo |
| `geo-gap-civil-engagement` | «Aunque fuera militarmente neutral, España debería participar activamente en diplomacia, ayuda humanitaria y sanciones internacionales.» | internacionalismo no militar; contrapunto al aislacionismo |
| `geo-gap-eventual-tpan` | «España debería promover la eliminación mundial, verificable y recíproca, de las armas nucleares, manteniendo la disuasión hasta que el acuerdo entrara en vigor.» | desarme final condicionado, que `geo-006` inmediato no captura |
| `rel-gap-funding` | «El Estado no debería financiar cultos ni conceder ventajas fiscales específicas a confesiones religiosas.» | laicismo financiero |
| `rel-gap-school` | «La enseñanza confesional debería quedar fuera del horario lectivo de los centros públicos.» | educación, distinto de credo oficial |
| `rel-gap-symbols` | «Los cargos públicos pueden mostrar símbolos religiosos personales siempre que la institución no adopte un credo.» | expresión individual frente a neutralidad institucional |
| `rel-gap-confessional` | «El Estado puede reconocer una religión oficial sin otorgar poder político a sus autoridades.» | confesionalidad no teocrática |

`lib-018` ya cubre ampliación de inmigración laboral con oferta. Si se necesita fronteras más abiertas, debe ser seguimiento y no duplicado: residencia para cualquier persona pacífica; condición de autosuficiencia; acceso a prestaciones; respeto de propiedad; y tratamiento de refugiados son decisiones diferentes.

### 11.4 Correcciones de atribución sugeridas en metadatos

Las notas internas actuales incluyen predicciones como «P-LIB +2», «Volt +1» o «UPyD +1» sin adjuntar fuente y, a veces, describen una familia como si fuera uniforme. Esas notas son útiles como hipótesis de discriminación, pero no deben alimentar perfiles reales. En particular:

- `lib-001` aproxima sanidad de seguro privado a todo liberalismo duro; el programa de P-LIB mantiene ayuda pública mediante cheque para personas sin recursos y exige codificar financiación y provisión por separado.
- `lib-002` acierta al esperar P-LIB menos extremo que el ancap, pero el valor debe proceder del programa vigente, no de la etiqueta.
- `lib-003` no permite imputar impuesto plano a «liberalismo clásico» en bloque.
- `lib-014` no permite asignar Volt o Ciudadanos por hablar de profesionalización o evidencia.
- `lib-018` reconoce correctamente la división ancap sobre fronteras, que debe resolverse con respuestas individuales, no mediante un vector arquetípico único.
- cualquier valor de UPyD debe llevar fecha histórica y quedar fuera del comparador activo.

## 12. Decisiones de producto y UX

### 12.1 Ocultar aproximación hasta el final

Durante el cuestionario no deben mostrarse puntos por categoría, barras «izquierda/derecha», partido provisional ni color ideológico. Solo son seguros:

- progreso neutro —porcentaje de preguntas respondidas—;
- nombre descriptivo del bloque, si no revela cómo puntúa cada respuesta;
- posibilidad de volver, omitir y marcar «no tengo posición»;
- aviso cuando una subpregunta aparece para aclarar un motivo.

Mostrar afinidad parcial incentiva respuestas estratégicas y hace que el encuestado aprenda qué opción «lleva» a un resultado. El resumen ideológico se calcula una vez terminadas las preguntas esenciales. Si se permite pausa, el estado guardado no debe contener un marcador visible por partido.

### 12.2 Subpreguntas solo en nodos de alta información

No toda respuesta necesita interrogatorio. Las ramas deben activarse cuando una misma opción cambia de sentido según el motivo:

1. impuestos como robo;
2. rechazo de parlamentarismo;
3. salida de OTAN/no intervención;
4. apoyo a energía nuclear;
5. armas nucleares y tipo de disuasión;
6. referéndum saharaui/reclamaciones históricas;
7. relación entre religión y Estado;
8. inmigración abierta;
9. rechazo de democracia mayoritaria;
10. libertad contractual y salida de jurisdicción.

Una rama debe cambiar un eje o resolver una ambigüedad real. Si solo repite la respuesta con palabras más ideológicas, sobra.

### 12.3 Resultados con incertidumbre y motivos

El resultado final debería mostrar:

- afinidad por dimensiones, no solo un porcentaje global;
- posiciones decisivas compartidas y discrepancias decisivas;
- fuente y fecha de cada posición partidaria;
- incertidumbre cuando el partido no ha publicado una postura;
- estado del actor: activo, candidatura de una elección, componente, histórico o no electoral;
- aviso de que afinidad no implica recomendación ni evaluación moral.

Un actor no debe beneficiarse porque tenga muchos `?`: el denominador de similitud debe exigir cobertura mínima y mostrarla. Tampoco debe penalizarse una pregunta omitida como si fuera neutral.

### 12.4 Coaliciones, tiempo y cambios de marca

El modelo de datos necesita relaciones versionadas:

```text
actor --participó_en--> candidatura --en_elección--> convocatoria
actor --usó_marca--> nombre público --durante--> intervalo
posición --respaldada_por--> fuente --con_fecha_y_ámbito--> documento
```

Esto permite representar Movimiento Sumar frente a Sumar, Alianza Verde dentro de Podemos, Verdes Equo bajo la marca Partido Verde, M+J dentro de EXISTE y UPyD como histórico. Copiar posiciones entre nodos debe estar prohibido por defecto.

## 13. Recomendación de implementación de perfiles

Para cada actor, la unidad mínima no es un vector escrito a mano, sino un registro de evidencia:

```json
{
  "actorId": "p-lib",
  "propositionId": "lib-gap-min-state",
  "value": 2,
  "sourceUrl": "https://www.p-lib.es/wp-content/uploads/2025/12/PPM-vigente.pdf",
  "sourceDate": "2025-12",
  "retrievedAt": "2026-07-09",
  "sourceType": "programa-marco",
  "scope": "partido",
  "confidence": "alta",
  "status": "vigente",
  "notes": "Conserva seguridad, justicia y defensa; no codificar como ancap."
}
```

Las posiciones de arquetipos deberían residir en otra colección sin `electoral=true`. Los textos de autor necesitan `author` y no deben elevarse a la organización anfitriona salvo aprobación institucional explícita. Un proceso automático debería rechazar perfiles activos sin fuente, fecha o estado electoral.

## 14. Fuentes primarias y de verificación

| Actor/tema | Fuente | Fecha o vigencia usada | Qué verifica | Confianza |
|---|---|---|---|---|
| Elecciones generales | [BOE: candidaturas presentadas](https://www.boe.es/buscar/doc.php?id=BOE-A-2023-14733&lang=es) y [proclamadas](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-15066) | 2023 | candidatura concreta, no ideología ni actividad 2026 | alta |
| Elecciones europeas | [BOE: candidaturas proclamadas](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-9687) y [escrutinio](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-13092) | 2024 | presencia en papeleta y resultado/representación | alta |
| PSOE | [Resolución del 41.º Congreso](https://41congreso.psoe.es/wp-content/uploads/2024/12/RESOLUCION-41Congreso.pdf) | diciembre 2024 | instituciones, sindicatos, energía, OTAN, religión, Sáhara | alta |
| PSOE | [Estatutos del 41.º Congreso](https://41congreso.psoe.es/wp-content/uploads/2025/03/ESTATUTOS41o-CF.pdf) | 2025 | elección, consultas, corrientes, disciplina y mandatos internos | alta |
| PSOE | [Primarias 2026](https://www.psoe.es/primarias-2026/) | 2026 | actividad organizativa actual | alta |
| Movimiento Sumar | [Documentos de Asamblea](https://movimientosumar.es/docs-asamblea2025/) | 2025 | catálogo oficial de documentos partidarios | alta |
| Movimiento Sumar | [Documento político](https://movimientosumar.es/transparencia/wp-content/uploads/sites/6/2025/05/Documento_Politico_Asamblea_Mov_Sumar_2025.pdf) | mayo 2025 | democracia, sindicatos, paz, Sáhara y laicidad | alta |
| Movimiento Sumar | [Documento organizativo](https://movimientosumar.es/transparencia/wp-content/uploads/sites/6/2025/05/Documento_Organizativo_Asamblea_Mov_Sumar_2025.pdf) y [estatutos](https://movimientosumar.es/transparencia/wp-content/uploads/sites/6/2025/07/Estatutos-tras-Asamblea-2025_DEF.pdf) | 2025 | asamblea, coordinación, revocación, corrientes y ratificación | alta |
| Podemos | [Programa europeo](https://podemos.info/wp-content/uploads/2024/05/Programa-PODEMOS-elecciones-europeas-2024.pdf) | mayo 2024 | nuclear, defensa europea, OTAN, armas nucleares y Sáhara | alta |
| Podemos | [Documentos oficiales](https://podemos.info/eu/documentos/) y [financiación](https://podemos.info/financiacion/) | V Asamblea 2025/consulta 2026 | organización vigente y modelo financiero | alta |
| Más Madrid | [Programa Comunidad de Madrid](https://programa.masmadrid.org/pdf/Comunidad%20de%20Madrid/Programa%20M%C3%A1s%20Madrid%20-%20CM%202023.pdf) | 2023 | servicios, participación, transición y diálogo sindical autonómico | alta en su ámbito |
| Más Madrid | [Grupo municipal oficial](https://www.madrid.es/portales/munimadrid/es/Inicio/El-Ayuntamiento/El-Pleno/Composicion/Corporacion-actual/Grupo-Municipal-Mas-Madrid/Grupo-Municipal-Mas-Madrid/?vgnextchannel=8bfd75b8ce8fa610VgnVCM2000001f4a900aRCRD&vgnextfmt=default&vgnextoid=aed69cd8de7d8810VgnVCM2000001f4a900aRCRD) | consulta julio 2026 | actividad institucional, no programa estatal | alta |
| Izquierda Española | [Estatutos y declaración programática](https://www.izqesp.es/docs/Estatutos%20Izquierda%20Espan%CC%83ola.pdf) | documento publicado antes de candidatura 2024 | democracia, unidad, economía, laicidad y organización | alta para texto; media temporal |
| Izquierda Española | [Web y afiliación](https://www.izqesp.es/) | consulta julio 2026 | actividad actual | alta |
| PP | [Ponencia política del 21.º Congreso](https://www.pp.es/storage/2025/06/21_Congreso_Ponencia_Politica.pdf) | junio 2025 | familia ideológica, justicia, sindicatos, nuclear, OTAN y Sáhara | alta |
| PP | [Estatutos del 21.º Congreso](https://www.pp.es/storage/2025/06/250616-PONENCIA-ESTATUTOS.-21-Congreso-PP.pdf) | junio 2025 | compromisarios, órganos, corrientes y mandatos | alta |
| Ciudadanos | [Programa europeo](https://www.ciudadanos-cs.org/var/public/documentos/2024-05/programa-electoral-9j-europeas.pdf) | mayo 2024 | federalismo y defensa europea/OTAN | alta |
| Ciudadanos | [Estatutos](https://www.ciudadanos-cs.org/estatutos), [estrategia](https://www.ciudadanos-cs.org/estrategia) y [prensa](https://www.ciudadanos-cs.org/prensa) | consulta julio 2026 | organización y actividad; no representación | alta |
| P-LIB | [Programa Político Marco](https://www.p-lib.es/wp-content/uploads/2025/12/PPM-vigente.pdf) | vigente, publicado 2025 | minarquismo, propiedad, fiscalidad, moneda, migración, secesión, religión, defensa y Sáhara | alta |
| P-LIB | [Estatutos vigentes](https://www.p-lib.es/wp-content/uploads/2025/12/Estatutos-vigentes-del-Partido-Libertario.pdf) y [órganos](https://www.p-lib.es/organos-del-partido/) | 2025/consulta 2026 | condición de partido, financiación y elección congresual | alta |
| P-LIB | [Posición energética](https://www.p-lib.es/2025/04/30/pedro-sanchez-miente-la-causa-de-fondo-del-apagon-es-el-mercantilismo/) | abril 2025 | apoyo a nuclear y mercado energético | media-alta |
| P-LIB | [Posición laboral y sindical](https://www.p-lib.es/2026/05/01/devolver-a-los-trabajadores-el-poder-sobre-su-vida/) | mayo 2026 | sindicatos voluntarios/independientes y crítica de subvención | media-alta |
| Volt España | [Estatutos](https://voltespana.org/storage/pdf/estatutos-de-volt-espana-2025.pdf) y [presentación](https://voltespana.org/sobre-volt) | 2025/consulta 2026 | partido activo y organización interna | alta |
| Volt Europa | [Programa europeo](https://volteuropa.org/storage/pdf/eu-elections-2024/volt-eur-electoral-moonshot-program_v5-final-%281%29.pdf) | 2024 | sindicatos, nuclear, federalismo, defensa y desarme | alta para política común |
| Volt Europa | [NATO 3.0 y unión de defensa](https://volteuropa.org/news/nato-30-can-only-be-built-with-a-european-defence-union) | 6 julio 2026 | declaración conjunta alojada por Volt y firmada por eurodiputados Volt; confirma orientación, no resolución orgánica exclusiva | media-alta por sí sola; alta junto al programa |
| PACMA | [Programa europeo](https://pacma.es/wp-content/uploads/2024/05/PE_EUROPA_9J24.pdf) | mayo 2024 | nuclear, laicidad y animalismo | alta |
| PACMA | [Equipo humano](https://pacma.es/equipo-humano/) y [programas](https://pacma.es/programa-electoral/) | consulta julio 2026 | actividad y mandato de la dirección | alta |
| Verdes Equo | [Cambio de marca a Partido Verde](https://verdesequo.es/renovamos-nuestra-marca-politica-como-partido-verde) | 2026 | marca pública frente a nombre estatutario | alta |
| Verdes Equo | [Clima y energía](https://verdesequo.es/clima-y-energia) y [principios](https://verdesequo.es/principios) | consulta julio 2026 | rechazo nuclear y marco verde propio | alta |
| Verdes Equo | [Estatutos publicados](https://verdesequo.es/wp-content/uploads/2021/03/ESTATUTOS-2020-V3CC.pdf) | 2020 | elección, consultas y revocación; confirmar vigencia literal | media |
| Verdes Equo | [Bases programáticas continuas](https://asamblea.verdesequo.es/wp-content/uploads/2025/11/Programa-Electoral-Continuo-VQ-VF.pdf) | 2025/2026 | paz y seguridad humana; documento no final | media |
| Alianza Verde | [Acuerdo europeo con Podemos](https://alianzaverde.es/noticias/alianza-verde-y-podemos-presentan-un-acuerdo-para-concurrir-juntos-a-las-europeas-en-la-candidatura-de-irene-montero/) y [primarias](https://alianzaverde.es/noticias/alba-ramos-solano-elegida-candidata-en-las-primarias-de-alianza-verde-para-las-elecciones-europeas/) | 2024 | componente de candidatura y selección interna | alta |
| Alianza Verde | [Futuro libre de nucleares](https://www.alianzaverde.es/news/jornada-parlamentaria-sobre-un-futuro-libre-de-nucleares/) | enero 2026 | posición antinuclear propia | alta |
| Alianza Verde | [Primera Asamblea Federal](https://alianzaverde.es/noticias/alianza-verde-celebra-su-primera-asamblea-federal-con-el-objetivo-de-sumar-en-verde-de-cara-al-proximo-ciclo-electoral-y-elige-a-juantxo-lopez-de-uralde-como-coordinador-federal/) | 2022 | elección de coordinación y duración del mandato | media-alta |
| M+J | [Ideología](https://www.porunmundomasjusto.es/ideologia/), [Tejer la Paz](https://tejerlapaz.es/) y [memoria 2024](https://www.porunmundomasjusto.es/wp-content/uploads/2025/03/Memoria-de-actividades-2024-MJ.pdf) | 2024-2026 | posiciones dinámicas, humanismo, migración, paz y actividad | alta/medio-alta según proposición |
| Futuro | [Programa](https://futuro.org.es/home/programa/), [quiénes somos](https://futuro.org.es/home/quienes-somos/) y [estatutos](https://futuro.org.es/wp-content/uploads/2022/04/2021-10-18-ESTATUTOS-COMPLETOS-DEL-PARTIDO-POLI%CC%81TICO-FUTU%CC%81RO.pdf) | consulta 2026; estatutos 2021 | transversalidad, europeísmo y existencia orgánica | media-alta |
| ALFA | [Declaración de principios v3.3](https://alianzafuturista.org/assets/alianza-futurista---ddp-3.3.pdf), [estatutos](https://alianzafuturista.org/estatutos.html) y [web](https://alianzafuturista.org/) | consulta julio 2026 | tecnoprogresismo, nuclear, renta básica, neutralidad y actividad | media-alta |
| NEOS | [Alternativa cultural](https://neosfundacion.es/la-alternativa-cultural/) y [aviso legal](https://neosfundacion.es/aviso-legal/) | consulta julio 2026 | fundación/movimiento y doctrina cultural, no partido | alta |
| UPyD | [Anuncio de disolución recogido por Europa Press](https://www.europapress.es/nacional/noticia-upyd-anuncia-oficialmente-disolucion-recuerda-compromiso-regeneracion-democratica-20201206195939.html) y [BOE histórico](https://www.boe.es/buscar/doc.php?id=BOE-A-2016-5186&lang=es) | 2020/2016 | disolución y candidatura histórica | media para disolución; alta BOE |
| Liberalismo democrático | [Oxford Manifesto 1997](https://liberal-international.org/who-we-are/our-mission/landmark-documents/political-manifestos/oxford-manifesto-1997/) y [Andorra Manifesto 2017](https://liberal-international.org/who-we-are/our-mission/landmark-documents/political-manifestos/liberal-manifesto-2017/) | 1997/2017 | arquetipo liberal constitucional, no partido español | alta doctrinal |
| Objetivismo/minarquismo | [Ayn Rand: *The Nature of Government*](https://courses.aynrand.org/works/the-nature-of-government/) y [posición sobre aborto](https://newideal.aynrand.org/ayn-rands-radical-views-on-abortion/) | texto clásico/compilación 2019 | Estado mínimo y pluralidad moral respecto a conservadurismo | alta doctrinal; no electoral |
| Anarcocapitalismo | [Rothbard: *For a New Liberty*](https://mises.org/library/book/new-liberty-libertarian-manifesto?d7_alias_migrate=1) y [«Society Without a State»](https://mises.org/mises-daily/society-without-state) | textos doctrinales históricos | abolición estatal, impuestos y provisión privada de justicia/seguridad | alta para el autor; no actor español |
| Paleolibertarismo | [Rothbard: «Right-Wing Populism»](https://archive.lewrockwell.com/rothbard/ir/Ch5.html) | enero 1992 | estrategia histórica de coalición populista/cultural | alta para el autor; no generalizable |
| Hoppe | [Monarquía, democracia y orden natural](https://mises.org/journal-libertarian-studies/political-economy-monarchy-and-democracy-and-idea-natural-order?d7_alias_migrate=1) y [secesión](https://mises.org/mises-daily/political-economy-monarchy-and-democracy) | 1995/archivo | tesis de autor sobre propiedad del gobierno y secesión | alta para el autor; no consenso ancap |
| Instituto Juan de Mariana | [Portada/actividad](https://juandemariana.org/) y [artículo minarquista firmado](https://juandemariana.org/el-estado-protector-nos-consume/) | 2026 | centro activo y voz de autor; no programa institucional único | alta para naturaleza; media para corriente |
| Fundación para el Avance de la Libertad | [Objetivos](https://fundalib.org/obj/), [estudios](https://fundalib.org/estudios/) y [cuaderno de Huerta de Soto](https://fundalib.org/wp-content/uploads/2021/06/Cuaderno-06-JHS-Liberalismo-versus-anarcocapitalismo-WEB.pdf) | consulta 2026/texto 2021 | fundación activa y pluralidad autoral liberal-libertaria | alta para naturaleza; texto atribuible al autor |
| Students For Liberty | [LibertyCon Europe 2026](https://studentsforliberty.org/blog/libertycon-europe-2026/) | 2026 | red educativa activa, no partido español | alta |
