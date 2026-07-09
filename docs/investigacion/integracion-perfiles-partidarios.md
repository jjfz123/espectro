# Integración de perfiles partidarios verificados

**Corte documental:** 10 de julio de 2026.
**Objeto:** convertir la investigación de derechas, tradicionalismos y partidos territoriales en perfiles comparables sin confundir doctrina, conducta, organización, candidatura y corriente histórica.

## 1. Resultado integrado

Se añadieron diecinueve perfiles y se amplió el del PP:

| Perfil | Naturaleza real | Estado acreditado | Tratamiento en datos |
|---|---|---|---|
| VOX | partido estatal | activo | programa como base y conducta reciente en `dobleLectura` |
| FE-JONS | partido estatal | activo; programa electoral andaluz de 2026 | perfil actual; no hereda el franquismo ni los puntos de 1934 |
| Comunión Tradicionalista Carlista | organización política tradicionalista | actividad pública en 2026 | excepción `historica-activa`, separada de la papeleta documentada |
| Partido Carlista | partido socialista, federal y autogestionario | congreso convocado para 2026 y actividad pública | excepción `historica-activa`; nunca hereda la doctrina de la CTC |
| ERC | partido | activo | perfil catalán actual |
| Junts | partido | activo; Junts+ fue marca electoral | perfil de Junts, sin duplicar Junts+ |
| CUP | organización política asamblearia | activa; CUP-DT fue marca electoral | se usa `partido` por límite del esquema, sin duplicar CUP-DT |
| EH Bildu | federación | activa | se usa `coalicion` por límite del esquema; no se copian posiciones de sus componentes |
| EAJ-PNV | partido | activo | perfil vasco-navarro actual |
| UPN | partido | activo | perfil navarro actual |
| BNG | frente político | activo | se usa `coalicion` por límite del esquema; no se copian posiciones de UPG ni corrientes |
| UPL | partido regionalista | activo; candidatura autonómica de 2026 | autonomía triprovincial de León, Zamora y Salamanca dentro de España |
| PREPAL | partido regionalista | activo; candidatura autonómica de 2026 | proyecto propio de Región Reino Leonés, sin confundirlo con UPL |
| Coalición por El Bierzo | coalición regionalista | activa; candidatura autonómica de 2026 | perfil común de candidatura, sin heredar posiciones de sus componentes |
| Partido de El Bierzo | componente de Coalición por El Bierzo | activo | identidad bercianista propia; sólo posiciones directamente documentadas |
| El Bierzo Existe | componente de Coalición por El Bierzo | activo | ficha `sin-datos`; no se rellenan huecos con el programa de la coalición |
| Soria ¡YA! | partido provincial transversal | activo; representación autonómica | perfil provincialista, no una variante del leonesismo |
| Por Ávila | partido provincial transversal | activo; candidatura autonómica de 2026 | perfil abulense propio |
| Coalición Canaria | partido nacionalista canario | activo; representación autonómica y estatal | programa 2023, declaración de principios de 2025 y resoluciones oficiales, sin herencia de alas insulares |

### 1.1. Distinciones territoriales que no se pueden colapsar

- **Leonesismo autonómico:** UPL y PREPAL persiguen una comunidad para León, Zamora y Salamanca dentro de España. Se puntúan por fuentes propias y no como soberanismo independentista.
- **Bercianismo:** Coalición por El Bierzo reclama circunscripción, provincia y autogobierno bercianos; acepta varios encajes territoriales si los decide la población de El Bierzo. No equivale a respaldar o rechazar en bloque la autonomía triprovincial leonesa.
- **Provincialismo:** Soria ¡YA! y Por Ávila priorizan financiación, servicios e infraestructuras provinciales. Su transversalidad no autoriza a copiar posiciones económicas o morales entre ambas.
- **Canarismo:** Coalición Canaria propone máximo autogobierno dentro de España, un proyecto archipielágico común y defensa del REF. La posición nacional sobre ecotasa, moratoria o pactos no se sustituye por la de una organización insular concreta.

UPL, PREPAL, Coalición por El Bierzo, Soria ¡YA!, Por Ávila y Coalición Canaria se enlazan a candidaturas exactas de las convocatorias estructuradas. Ninguna necesita `excepcionCatalogo`. Partido de El Bierzo y El Bierzo Existe aparecen como componentes informativos de la candidatura común: esa relación no transfiere posiciones en ninguna dirección.

## 2. Regla de doble lectura

`posiciones` contiene la postura programática u oficial que entra en el cálculo de afinidad. `dobleLectura.contraste.posiciones` contiene votaciones, decisiones o declaraciones recientes y **no entra en el cálculo ni se promedia con la primera capa**.

La separación resuelve cuatro problemas:

1. una votación puede referirse a una pregunta distinta de la formulada en el programa;
2. un gobierno autonómico no representa automáticamente al partido nacional;
3. rechazar una reforma constitucional no equivale a querer prohibir la conducta regulada;
4. una declaración reciente puede reforzar, matizar o contradecir una promesa sin reemplazarla silenciosamente.

Los huecos de la capa de conducta permanecen huecos. No se copian valores del programa para hacerla parecer completa.

### 2.1. PP y derechos reproductivos

La posición nacional de base se codifica con la declaración oficial de Alberto Núñez Feijóo de 15 de febrero de 2023: acepta la regulación por plazos vigente y afirma que no coaccionará a quien interrumpa el embarazo conforme a la ley, aunque rechaza eliminar el consentimiento parental para menores de 16 y 17 años. Por ello:

- `fem-006 = -2`: no propone limitar el aborto de adultas exclusivamente a violación, riesgo grave o anomalía fetal;
- `fem-012 = -2`: se opone a que las jóvenes de 16 y 17 años aborten sin consentimiento parental.

Fuente: PP, [posición nacional sobre interrupción voluntaria del embarazo](https://www.pp.es/actualidad/articulos/feijoo-urge-al-gobierno-dar-explicaciones-por-casi-300000-euros-gastados-por/), 15-02-2023.

El Grupo Popular presentó en abril de 2026 una enmienda de devolución al proyecto que pretendía garantizar constitucionalmente la interrupción voluntaria del embarazo. Se conserva como contraste parcial (`fem-006 = -1`) porque prueba rechazo al blindaje constitucional, **no** una propuesta de volver al sistema exclusivo de supuestos. Fuentes: Congreso, [enmiendas a la totalidad](https://www.congreso.es/ca/busqueda-de-publicaciones?_publicaciones_id_texto=BOCG-15-A-92-2.CODI.&_publicaciones_legislatura=XV&_publicaciones_mode=mostrarTextoIntegro&p_p_id=publicaciones&p_p_lifecycle=0&p_p_mode=view&p_p_state=normal), 23-04-2026, y [resultado de la votación](https://www.congreso.es/gl/notas-de-prensa?_notasprensa_mvcPath=detalle&_notasprensa_notaId=51452&p_p_id=notasprensa&p_p_lifecycle=0&p_p_mode=view&p_p_state=normal), 30-04-2026.

Dos actuaciones recientes se documentaron, pero no reciben valor de ítem porque no son equivalentes a restringir legalmente el aborto:

- Feijóo anunció una futura ley nacional para computar al concebido no nacido en determinadas ayudas familiares: PP, [anuncio nacional](https://www.pp.es/actualidad/articulos/feijoo-anuncia-una-ley-nacional-para-reconocer-ayudas-a-las-familias-por-los-hijos-concebidos-y-no-nacidos/), 06-07-2026.
- La Comunidad de Madrid aprobó una ley autonómica de unidad familiar y ayudas: Comunidad de Madrid, [aprobación definitiva](https://www.comunidad.madrid/publicacion/ref/09109), 02-07-2026. Es conducta de un gobierno autonómico del PP, no programa nacional y no una prohibición de la interrupción voluntaria del embarazo.

No se atribuyen al PP estatal las decisiones de Madrid, Galicia, Castilla y León ni ninguna otra autonomía salvo que exista una adopción nacional expresa.

### 2.2. VOX, Israel y la hipótesis «ACOM/ACCOM»

La entidad identificable en fuentes primarias es **ACOM, Acción y Comunicación sobre Oriente Medio**. ACOM se define como organización española, aconfesional e independiente que trabaja con gobiernos, partidos y sociedad civil: [Somos ACOM](https://a-com.es/somos-acom/), consulta 09-07-2026. No se encontró una entidad «ACCOM» distinta con un papel verificable en esta materia; puede ser una errata o una denominación informal que debe aclarar quien formuló la hipótesis.

Sí existe convergencia pública en asuntos concretos. Por ejemplo, VOX menciona el recurso judicial promovido por ACOM contra subvenciones municipales a proyectos palestinos: [comunicado de VOX Rivas](https://www.voxespana.es/noticias/tras-anos-de-denuncias-de-vox-el-tribunal-de-cuentas-investigara-las-subvenciones-del-ayuntamiento-de-rivas-a-proyectos-palestinos-20251127?provincia=madrid), 27-11-2025. Eso acredita coincidencia o interacción en un expediente, no dependencia orgánica, financiación, dirección ni causalidad.

Por tanto:

- no se codifica «ACOM dirige el giro de VOX»;
- no se usa a ACOM como fuente de la posición de VOX;
- se codifican únicamente declaraciones, iniciativas y votos de VOX;
- `dr-017` distingue alineamiento con Israel frente al islamismo;
- `dr-022` queda en `+1`, no `+2`, porque apoyo intenso a Israel no prueba respaldo literalmente «sin reservas» ante cualquier actuación.

Fuentes partidarias usadas para el contraste: VOX, [declaración de apoyo a Israel ante Hamás](https://www.voxespana.es/noticias/vox-propone-parlamento-andalucia-declaracion-institucional-apoyo-estado-pueblo-israel-ante-ataques-terroristas-hamas-20231010), 10-10-2023, y [defensa de la cooperación militar y tecnológica con Israel](https://www.voxespana.es/grupo_parlamentario/actividad-parlamentaria/asarta-denuncia-que-el-embargo-a-israel-pone-en-riesgo-la-seguridad-nacional-es-una-desconexion-tecnologica-suicida-20260304), 04-03-2026.

## 3. Matices doctrinales preservados

### 3.1. Impuestos

No se asignó `lab-009` a VOX, FE-JONS, CTC ni Partido Carlista. Pedir rebajas, denunciar despilfarro, preferir financiación por cuotas o querer nacionalizar sectores no demuestra que toda imposición fiscal sea ilegítima. La subpregunta sobre el motivo del rechazo a los impuestos debe separar:

- ilegitimidad libertaria de toda coacción fiscal;
- rechazo al destino o cuantía del gasto;
- crítica socialista a gravar renta sin transformar propiedad;
- rechazo de tributos concretos;
- sustitución por cuotas de organizaciones profesionales.

### 3.2. Religión

La CTC se codifica como confesional católica (`dr-011 = +2`, `rel-002 = -2`) porque sus textos subordinan el orden político al cristianismo. No se le asigna `rel-003`: confesionalidad e integralismo no demuestran por sí solos que una autoridad religiosa pueda vetar jurídicamente toda ley, requisito más cercano a teocracia.

El Partido Carlista se mantiene separado: su documento vigente de identidad es socialista, federal, autogestionario y pluralista. No hereda monarquía tradicional ni confesionalidad de la CTC.

### 3.3. Sindicatos y Estado

- VOX defiende sindicatos plurales y sin subvenciones; no un sindicato único estatal.
- FE-JONS sí pide en su programa andaluz de 2026 sindicalización única y representación política desde el lugar de trabajo. Se codifica esa propuesta actual, no el sindicato vertical franquista por analogía histórica.
- La CTC defiende cuerpos intermedios y representación orgánica, pero no se le asigna automáticamente `lab-006` ni `dr-014`: el texto vigente no concreta un monopolio sindical estatal equivalente al enunciado.
- El Partido Carlista defiende autogestión; se puntúa de forma parcial porque no todo uso de esa palabra implica transferir obligatoriamente cada gran empresa a una cooperativa.

### 3.4. Energía y defensa

La fuente de 2026 corrige un hueco previo: FE-JONS propone recuperar centrales nucleares, además de hidráulica y renovables, por lo que recibe `ene-001 = +2` y `ene-003 = -2`. VOX recibe valores favorables a nueva nuclear, prórrogas y reactores modulares. Ninguno recibe una posición sobre arsenal nuclear español, acogida de armas nucleares ajenas o adhesión al TPNW sin fuente específica.

Salir de la OTAN tampoco se interpreta como pacifismo automático:

- FE-JONS quiere salir de la OTAN por soberanía y rechazo de guerras exteriores;
- CUP, EH Bildu y BNG lo hacen desde marcos antimilitaristas;
- EAJ-PNV acepta la OTAN como marco actual y pide un pilar europeo más autónomo;
- VOX condiciona su apoyo a la protección de todo el territorio español, pero no formula una salida incondicional vigente.

## 4. Coaliciones, federaciones, frentes y marcas

No se hereda ninguna posición entre organizaciones:

- EH Bildu no recibe automáticamente posiciones de Sortu, Eusko Alkartasuna o Alternatiba;
- el BNG no recibe automáticamente las posiciones máximas de UPG, Movemento Arredista, FOGA o Alicerce;
- Junts no recibe posiciones de Demòcrates o MESCat;
- EAJ-PNV en Euskadi no hereda una posición de Geroa Bai ni a la inversa;
- Junts+, CUP-Defensem la Terra y otras marcas electorales no generan perfiles doctrinales duplicados.

Los componentes sirven para explicar relaciones organizativas o enlazar una candidatura, nunca para rellenar celdas de matching.

## 5. Exclusiones de seguridad y de categoría

No se crearon perfiles recomendables o «papeletas» para:

- Atomwaffen Division y redes aceleracionistas neonazis;
- corrientes que reivindiquen violencia política o colapso deliberado;
- pensamiento Gonzalo, posadismo u otras corrientes sin candidatura española actual verificada;
- regímenes o fases históricas —San Sepolcro, fascismo pre-Marcha, República Social Italiana, franquismo—;
- organizaciones inactivas, sucesoras no acreditadas o meras páginas doctrinales sin actividad política actual.

Las ideas necesarias para cartografía crítica pertenecen a ítems `solo-mapa`, que el validador prohíbe usar para recomendar partidos reales. Describir una doctrina violenta no la convierte en opción electoral ni la normaliza como equivalente a un partido legal.

CTC y Partido Carlista sí tienen actividad actual verificada, pero entran mediante `excepcionCatalogo: historica-activa`: el selector documentado los devuelve en un bloque separado de las candidaturas de la convocatoria. La etiqueta explica que actividad organizativa no equivale a figurar en la papeleta elegida.

## 6. Huecos del esquema y riesgos pendientes

1. **Naturaleza jurídica y organizativa.** `tipo` solo admite `partido` o `coalicion`. Esto fuerza a representar EH Bildu y BNG como coalición aunque sean federación y frente, y a CUP como partido aunque se defina como organización asamblearia. Conviene ampliar el enum a `federacion`, `frente` y `organizacion-politica` o añadir `naturaleza` informativa.
2. **Aliases electorales.** El perfil no guarda todavía `aliasesElectorales`. La relación Junts/Junts+, CUP/CUP-DT y denominaciones de candidatura debe permanecer en el catálogo de convocatorias para no duplicar resultados.
3. **Actividad frente a candidatura.** `actividad: activa` acredita vida organizativa, no concurrencia a cada elección. `excepcionCatalogo` resuelve el caso de una convocatoria documentada; la ruta heurística para contextos sin convocatoria aún necesita una presentación visual que nunca la llame papeleta.
4. **Cobertura electoral.** Hay una sola convocatoria estructurada en datos. Hasta incorporar autonómicas y europeas, la selección por ámbito es una heurística y debe anunciarse como tal.
5. **Fuentes web sin versión.** Algunas páginas doctrinales vigentes no publican una fecha de versión. Se conserva fecha de consulta y calidad media; sería mejor que el esquema permitiera marcar explícitamente `fechaPublicacionDesconocida` en vez de reutilizar el año de la versión observada.
6. **Doble lectura en interfaz.** El motor de afinidad usa únicamente `posiciones`, lo que evita promedios encubiertos. La interfaz debe mostrar el contraste como segundo marcador con su advertencia, no como otra entrada de matching ni como porcentaje de «cumplimiento».
7. **PP territorial.** Para comparar conductas autonómicas de forma sistemática haría falta una entidad o capa con `alcance` (`nacional`, `autonomico:madrid`, etc.). Por ahora se documenta el alcance y solo se puntúa el nivel nacional comparable.
8. **Items compuestos.** `cat-006` mezcla permisos, residencia y expulsiones; `eus-003` mezcla mayoría de plazas y necesidad del puesto. Los valores parciales de ERC, Junts y PNV reflejan esa limitación y no deberían presentarse como una precisión mayor que la pregunta.

## 7. Regla de mantenimiento

Cada cambio futuro de una celda debe conservar:

- justificación específica del ítem;
- fuente primaria titulada y enlazada;
- fecha publicada con la precisión disponible;
- fecha de consulta;
- calidad de evidencia;
- alcance territorial y organizativo;
- separación de programa y conducta;
- ausencia explícita cuando la fuente no contesta la pregunta.

Una nueva declaración no reemplaza una posición anterior: se añade al contraste o se abre una nueva versión temporal del perfil. Una coalición nueva tampoco absorbe doctrinas de sus componentes sin documento común verificable.
