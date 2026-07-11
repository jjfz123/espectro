# TODO pendiente de Espectro

**Corte:** 11 de julio de 2026.
Las prioridades evitan que «más partidos» desplace los problemas reales de producto y honestidad metodológica.

## P0 — antes de presentar la rama como terminada

- [ ] Cerrar el [TODO nominal de cartografía, ranking y resultados compartibles](./TODO-MAPEO-EXHAUSTIVO.md): contiene una casilla para cada uno de los 65 partidos reales, cada uno de los 178 rótulos de la imagen y cada requisito de enlaces/capturas. Los totales agregados no sustituyen esas casillas.
- [ ] Matriz final de corte por repetir después de corregir el atlas y los contratos de partidos. Última foto preintegración: 61 referencias, 175 entradas/94 regiones, TypeScript raíz/web y Vitest 180/180 verdes; build/presupuestos y Playwright 23/23 verdes sobre el snapshot auditado, no todavía sobre el diff final.
- [ ] Hacer un smoke test manual completo: rápido → provisional → exhaustivo → revisión → resultados → cambio de elección/CCAA → reinicio.
- [ ] Repetir la revisión visual manual de portada, pregunta, hito/perfil intermedio, resultados, brújula, selección y fichas a 320, 390 y 1440 px, incluida apariencia oscura, sobre el build final; la revisión anterior no cubre las capas y fichas nuevas.
- [ ] Auditar el diff final y publicar primero en `claude/espectro-political-vaa-3d35l3`. Promover a `main` solo después de revisar la versión desplegada; no se presupone que ambas ramas deban apuntar al mismo commit durante el trabajo.

## P1 — solicitudes funcionales aún incompletas

- [x] Perfiles separados de **Adelante Andalucía** y **Por Andalucía 2026**, con candidatura fechada y posiciones propias, sin herencia automática entre coalición y componentes.
- [x] Doble lectura de **PSOE** y **Movimiento Sumar**, incluida la ley mordaza y compromisos ítem a ítem, sin porcentaje global de cumplimiento.
- [x] Salida intermedia a las 150 respuestas: hito único, perfil expresamente provisional, persistencia, reanudación en la primera pendiente y aviso honesto cuando el almacenamiento está bloqueado; el rápido conserva exactamente 50 preguntas.
- [ ] Auditar y ampliar la capa observada del PP y VOX: actualmente existe, pero la cobertura es reducida.
- [ ] Ampliar posiciones documentadas en el subtipo unitario/autonómico/federal/confederal. Ya hay 12 perfiles con al menos una posición `dem-033`–`dem-035`, pero la cobertura sigue siendo desigual.
- [ ] Revisar si el ranking debe agrupar primero por **candidatura votable** y después mostrar componentes. El catálogo ya explica relaciones, pero el ranking compara perfiles enlazados y puede mostrar varios componentes de una misma lista.
- [ ] Añadir una ficha propia para las coaliciones electorales prioritarias cuando exista programa común suficiente; mientras tanto deben seguir como «inventariadas, pendientes de perfil».
- [ ] Mantener ETA, violencia y memoria fuera del rápido y revisar el lenguaje sensible con una segunda lectura humana antes de producción.

## P1 — frontend realmente precioso y robusto

- [x] Cubo 3D: anticolisión rótulo-polo hecha (el polo pisado cede atenuándose mientras dura el solape, medido sobre el DOM proyectado con cualquier ángulo de cámara).
- [x] Mapa 2D: el plano detallado conserva anticolisión radial y elisión; la brújula limpia deja todos los puntos visibles y revela un solo nombre de partido por hover/foco/toque. Las zonas doctrinales usan polígonos de Voronoi vectoriales, sin franjas ni bordes escalonados.
- [ ] Brújula degradada e interactiva: existen 175 entradas, de las que 94 son regiones, pero las 15 sustituciones, su alcanzabilidad y la coherencia entre prior/evidencia siguen abiertas; no presentar el atlas como cerrado hasta resolver la auditoría adversarial.

- [x] Dividir el bundle. Snapshot con 61 referencias y atlas lazy: inicial 102,9 KiB gzip; Resultados 263,3; atlas 155,4; referencias 141,9; visor compartido 5,0; 3D 244,2; PWA 3,09 MiB. CI aplica presupuestos independientes y cualquier subida exige justificar datos o código añadido.
- [x] Cargar `Resultados` y sus catálogos con `React.lazy`/`import()` y separar `datosResultados.ts` de los datos necesarios para el cuestionario. La portada muestra el número de perfiles reales mediante un recuento en tiempo de build (`__PERFILES_REALES__`).
- [ ] Revisar visualmente el catálogo de hasta 31 candidaturas, las referencias de escala y los dobles marcadores en pantallas pequeñas.
- [x] Playwright cubre 23 flujos en Chromium, incluidos compartir/privacidad, carga lazy, teclado Likert, `Sin opinión`, ramas condicionales, rápido → provisional → exhaustivo, hito de 150, 320 px, contexto electoral, referencias sensibles, brújula, axe, recuperación 3D y PWA offline. WebKit/Firefox y dispositivos reales siguen abiertos.
- [ ] Añadir pruebas visuales o capturas de referencia para portada, pregunta, módulos, perfil, ranking y detalle.
- [ ] Repetir Lighthouse, lector de pantalla y CWV sobre el build desplegado final. El corte anterior alcanzó portada 99-100/100/100/100, resultados 100, CLS 0 y LCP 1,2 s, targets ≥44 px y axe 0, pero no valida el diff final ni INP/WebKit.
- [ ] Incorporar un límite/virtualización o paginación suave si el catálogo de candidaturas crece mucho más.
- [x] Límites de error global y 3D con recuperación; toda recarga vuelve a guardar y queda bloqueada si la sesión solo vive en memoria.
- [ ] Integrar History API y política Atrás/Adelante antes de Capacitor.
- [ ] Añadir proyectos Firefox/WebKit, prueba de actualización entre dos builds y regla CI que exija revisar `versionInstrumento` al cambiar semántica o cargas.

## P1 — convertir la web en app instalable

La recomendación es una sola base responsive convertida primero en **PWA**; mantener dos frontends independientes duplicaría bugs y metodología.

- [x] Crear `manifest.webmanifest`, iconos, colores, nombre corto, `display: standalone` y metadatos de instalación.
- [x] Service worker generado por VitePWA, precache versionado, aviso visible y actualización consentida; si el guardado falla, la actualización queda bloqueada.
- [ ] Probar instalación y actualización en Android, iOS/Safari y escritorio.
- [x] Datos políticos incluidos y versionados dentro de la app (`instrumento v4`, corte offline `2026-07-11`, caducidad local de 90 días).
- [ ] Solo si se necesita publicar en tiendas, envolver la PWA con Capacitor después de estabilizarla; no empezar un frontend nativo nuevo.

## P2 — cobertura política y electoral

- [x] **Criterio sistemático de cobertura**: top-20 de las últimas generales, familias comunistas activas y extrema derecha activa. Catálogo actual: 65 perfiles reales, 61 comparables para afinidad general, tres `sin-datos`, un monotemático y dos demos excluidas de producción.
- [x] Volt: 12 posiciones económicas/sociales/territoriales añadidas desde sus programas; ya aparece en Economía × Sociedad sin inventar los planos aún insuficientes.
- [x] Nueva Canarias: moderadoras `eco-013` e `izq-044` documentadas; deja de proyectarse artificialmente en −100 económico/social.
- [ ] Aliança Catalana: encontrar una moderadora territorial primaria atribuible al partido. Los totales del Pleno no bastan para imputar su voto; se mantiene el aviso antes que introducir una inferencia débil.
- [x] Verificación primaria: Podemos enlazado como componente de Sumar 2023 y PCPA enlazado como organización territorial del PCPE con JEC/PCPE, sin heredar posiciones.
- [x] Escaños en Blanco: `dem-036` y perfil monotemático verificado. Solo aparece como coincidencia específica, nunca como porcentaje de afinidad general.

- [ ] El inventario tiene 323 candidaturas en 21 convocatorias y 65 perfiles reales (61 comparables para afinidad general). Cerrar el anexo nominal por identidad/relación y seguir priorizando por votos, representación y capacidad discriminante; no rellenar cientos de fichas superficialmente.
- [ ] Completar perfiles canarios: Drago, ASG, AHI, Unidos por Gran Canaria y otros con evidencia suficiente (Nueva Canarias ya tiene perfil verificado y enlazado).
- [ ] Completar perfiles andaluces: Adelante, Por Andalucía, Andalucistas, Jaén Merece Más y PCPA, respetando identidad exacta.
- [ ] Completar candidaturas territoriales de Catalunya, Euskadi, Navarra, Galicia y otras CCAA que siguen como inventario sin datos.
- [ ] Añadir más sindicatos solo con corpus suficiente y, después, filtrado por sector/presencia territorial.
- [ ] Crear un importador reproducible o bloque normalizado versionado para CAT/EUS/NAV/GAL; los JSON finales están validados, pero el importador general aún no documenta toda esa regeneración.
- [ ] Automatizar una comprobación periódica de nueva convocatoria y vigencia sin convertir el Registro de Partidos en prueba de actividad.
- [ ] Revisión editorial periódica de URLs y contenido. El validador ya bloquea regresiones a los dominios/rutas comprometidos conocidos de AC, NC y PCPA, pero no puede detectar por sí solo una futura inyección SEO.

## P2 — metodología e investigación

- [ ] Pilotar las 50 preguntas con datos reales: discriminación, fiabilidad por faceta, no respuesta, efecto de orden y funcionamiento diferencial por grupos.
- [ ] Revisar los umbrales de publicación de referencias doctrinales tras el piloto; ahora son reglas transparentes, no estimaciones empíricamente calibradas.
- [ ] Equilibrar la evidencia macro de Eurocomunismo y Democracia cristiana antes de devolverlas a los cuadrantes. Siguen disponibles en el matching doctrinal, pero se excluyen del mapa con motivo visible para evitar coordenadas engañosas.
- [ ] Taxonomía maestra de la imagen: 178 etiquetas clasificadas A–F y 175 entradas A/B trasladadas a capas, 94 como regiones. Falta cerrar las 30 revisiones nominales, hacer buscables los contextos sustituidos y regenerar los recuentos metodológicos antes de considerar serio el atlas.
- [x] Brújula v4 separada en dos facetas directas: propiedad/coordinación económica y poder político/libertades. El nivel sólido usa 6/3 y 6/3/2; solo los partidos pueden aparecer además como punto provisional hueco con 3/2 y 3/2/1. Una sola pregunta nunca fabrica una posición y las referencias no heredan el umbral provisional.
- [x] Primera tanda transversal añadida sin partidos: leninismo bolchevique, marxismo-leninismo soviético en fase estaliniana, socialismo democrático pluralista, fascismo italiano de régimen y neoliberalismo friedmaniano; Posadismo ampliado con evidencia suficiente en ambos macroejes.
- [x] Segunda tanda P1 añadida: luxemburgismo, ecosocialismo, anarquismo colectivista, plataformismo, comunalismo, anarcopacifismo, abolicionismo animal, republicanismo federal pimargalliano y socialismo de mercado autogestionario. Las fichas sin macroejes suficientes siguen en matching y no reciben una coordenada inventada.
- [x] Falangismo de FE de las JONS (1934) y franquismo nacionalcatólico (1945-1957) separados entre sí, del fascismo italiano y del carlismo. FE-JONS entra solo en Economía × Poder; no se le fabrica GAL–TAN ni aparece en 3D. El franquismo nacionalcatólico queda fuera del mapa macro por falta de economía equilibrada.
- [x] Títulos de fuentes no españolas señalados en el catálogo doctrinal: 499 marcas nuevas de «en inglés», siete de «en francés» y seis de «en italiano», además de las ya incluidas por las tandas nuevas.
- [ ] Diseñar y pilotar los discriminantes neutrales `N1`–`N3` para reducir el solapamiento todavía documentado entre colectivismo/anarcocomunismo, plataformismo y otras economías autogestionarias.
- [ ] Ampliar el desglose de organización interna de partidos cuando existan estatutos actuales accesibles.
- [ ] Versionar cambios de programa y conducta con ventanas temporales comparables.
- [ ] Resolver solapamientos semánticos antes del piloto: `lib-009`/`fem-014` (cannabis), `lib-016`/`nac-014` (diputaciones), `fem-008`/`lai-001` (religión), `lib-012`/`der-024` (gestación subrogada) y `soc-004`/`sd-021` (regularización).
- [ ] Revisar ítems territoriales no lineales: `nac-008`, la mezcla descentralización/unilateralidad en `nac-001` y el hecho de que rechazar `dem-033`–`dem-035` puede significar tanto unitarismo como independencia.

## Fuera de alcance deliberadamente

- No convertir organizaciones terroristas, clandestinas o violentas en resultados lúdicos.
- No deducir apoyo a ETA de soberanismo ni deducir ideología económica de una posición territorial.
- No atribuir a una coalición todas las posiciones de un componente.
- No presentar como disponible una candidatura que no consta en la convocatoria seleccionada.
- No inventar posiciones para elevar artificialmente la cobertura.
