# TODO pendiente de Espectro

**Corte:** 10 de julio de 2026.
Las prioridades evitan que «más partidos» desplace los problemas reales de producto y honestidad metodológica.

## P0 — antes de presentar la rama como terminada

- [ ] Ejecutar una última matriz limpia de validación después de detener todos los agentes: datos, TypeScript raíz/web, Vitest, build Vite 7 y `git diff --check`.
- [ ] Hacer un smoke test manual completo: rápido → provisional → exhaustivo → revisión → resultados → cambio de elección/CCAA → reinicio.
- [ ] Revisar visualmente móvil estrecho, tableta y escritorio; el build compila, pero no existe aún una prueba visual automatizada.
- [ ] Auditar el diff final, crear commit intencional y subir `codex/frontend-exhaustivo-mapeo-politico`.

## P1 — solicitudes funcionales aún incompletas

- [ ] Crear perfiles separados de **Adelante Andalucía** y **Por Andalucía 2026**, con candidatura fechada, componentes y programas propios. No heredar posiciones entre ambas ni desde sus componentes.
- [ ] Completar la doble lectura de **PSOE** y **Movimiento Sumar**. Para PSOE incluir la ley mordaza y compromisos ítem a ítem; no inventar un porcentaje global de cumplimiento.
- [ ] Auditar y ampliar la capa observada del PP y VOX: actualmente existe, pero la cobertura es reducida.
- [ ] Añadir posiciones documentadas de partidos al nuevo subtipo unitario/autonómico/federal/confederal; hoy el mapa personal funciona mejor que el matching partidario en esos ítems nuevos.
- [ ] Revisar si el ranking debe agrupar primero por **candidatura votable** y después mostrar componentes. El catálogo ya explica relaciones, pero el ranking compara perfiles enlazados y puede mostrar varios componentes de una misma lista.
- [ ] Añadir una ficha propia para las coaliciones electorales prioritarias cuando exista programa común suficiente; mientras tanto deben seguir como «inventariadas, pendientes de perfil».
- [ ] Mantener ETA, violencia y memoria fuera del rápido y revisar el lenguaje sensible con una segunda lectura humana antes de producción.

## P1 — frontend realmente precioso y robusto

- [x] Cubo 3D: anticolisión rótulo-polo hecha (el polo pisado cede atenuándose mientras dura el solape, medido sobre el DOM proyectado con cualquier ángulo de cámara).
- [x] Mapa 2D: los rótulos apretados del borde inferior izquierdo ya no se rozan: anchura estimada por clases de carácter, abanico radial de 12 direcciones × 8 radios con línea guía y elisión con hover/foco solo para referencias sin hueco. Brújula y planos: 0 pares solapados.

- [x] Dividir el bundle. Hecho: la carga inicial pasa de 1.034 kB a 352 kB minificados (gzip 245 kB → 102 kB); perfiles, sindicatos, referencias y convocatorias viajan en un chunk perezoso de 505 kB (gzip 93 kB) que se precarga al llegar a fin-del-rápido, módulos o revisión. Las notas metodológicas y etiquetas internas del banco de ítems se retiran del build sin tocar los JSON fuente.
- [x] Cargar `Resultados` y sus catálogos con `React.lazy`/`import()` y separar `datosResultados.ts` de los datos necesarios para el cuestionario. La portada muestra el número de perfiles reales mediante un recuento en tiempo de build (`__PERFILES_REALES__`).
- [ ] Revisar visualmente el catálogo de hasta 31 candidaturas, las referencias de escala y los dobles marcadores en pantallas pequeñas.
- [ ] Añadir pruebas E2E (Playwright): teclado Likert, `Sin opinión`, ramas condicionales, foco, recarga, almacenamiento fallido, resultado provisional y continuación exhaustiva.
- [ ] Añadir pruebas visuales o capturas de referencia para portada, pregunta, módulos, perfil, ranking y detalle.
- [x] Auditoría Lighthouse y lector de pantalla hechas: portada 99-100/100/100/100 y resultados con rendimiento 82→100 (CLS 0.213→0, LCP 3,2s→1,2s, robots.txt real); targets táctiles ≥44 px con `@media (pointer: coarse)`; axe-core 0 violaciones en las siete superficies; región viva que anuncia la respuesta por atajos 1-5/0. Señalado sin corregir: ~32 KiB de JS sin usar en el chunk inicial; sin sourcemaps de producción.
- [ ] Incorporar un límite/virtualización o paginación suave si el catálogo de candidaturas crece mucho más.
- [ ] Añadir error boundary para un JSON inesperado y una vista de recuperación que no borre respuestas.

## P1 — convertir la web en app instalable

La recomendación es una sola base responsive convertida primero en **PWA**; mantener dos frontends independientes duplicaría bugs y metodología.

- [x] Crear `manifest.webmanifest`, iconos, colores, nombre corto, `display: standalone` y metadatos de instalación.
- [x] Añadir service worker con estrategia offline para assets versionados y aviso de actualización (evento `espectro:actualizacion-disponible`; el rótulo de interfaz queda pendiente).
- [ ] Probar instalación y actualización en Android, iOS/Safari y escritorio.
- [ ] Mantener todos los datos políticos versionados dentro de la app y declarar su fecha de corte offline.
- [ ] Solo si se necesita publicar en tiendas, envolver la PWA con Capacitor después de estabilizarla; no empezar un frontend nativo nuevo.

## P2 — cobertura política y electoral

- [x] **Criterio sistemático de cobertura** (decisión del dueño): top-20 de votos en las últimas generales + todas las familias completas de comunistas activos y de extrema derecha activa. Cerrado el 2026-07-10: top-20 completo (NC-bc, PUM+J y Existe con perfil y candidaturas enlazadas); comunistas completos; extrema derecha activa completa (FE-JONS + DN + España 2000 + Núcleo Nacional + SALF + VOX; La Falange documentada como fusionada en FE-JONS el 29-10-2024, sin perfil propio); Volt cubierto; Escaños en Blanco resuelto como caso meta `sin-datos` razonado.
- [ ] Volt: cero posiciones en los tres ejes del mapa pese a que el Moonshot Programme 2024 daría corpus (hipótesis del banco: lib-001 −2, lib-009 +2, lib-018 +2); codificar con evidencia para que aparezca en los planos.
- [ ] Moderadoras pendientes señaladas por el detector de sesgo-bandera: Nueva Canarias (económico y social) y Aliança Catalana (territorial; documentada como esquina real tipo VOX, pero conviene reintentarlo).
- [ ] Verificación primaria JEC pendiente: Podemos dentro de la coalición registrada Sumar 2023 (hoy anotado como puestos pactados) y PCPA como federación andaluza del PCPE (hoy sin enlazar por la regla de identidad).
- [ ] Decisión de banco de ítems (dueño): posible ítem ad hoc «el voto en blanco debería traducirse en escaños vacíos que computen para las mayorías», donde Escaños en Blanco puntuaría +2 con evidencia alta y dejaría de estar fuera del matching.

- [ ] El universo oficial tiene 312 candidaturas, pero solo 48 perfiles comparables. Priorizar por votos, representación y capacidad discriminante; no rellenar cientos de fichas superficialmente.
- [ ] Completar perfiles canarios: Drago, ASG, AHI, Unidos por Gran Canaria y otros con evidencia suficiente (Nueva Canarias ya tiene perfil verificado y enlazado).
- [ ] Completar perfiles andaluces: Adelante, Por Andalucía, Andalucistas, Jaén Merece Más y PCPA, respetando identidad exacta.
- [ ] Completar candidaturas territoriales de Catalunya, Euskadi, Navarra, Galicia y otras CCAA que siguen como inventario sin datos.
- [ ] Añadir más sindicatos solo con corpus suficiente y, después, filtrado por sector/presencia territorial.
- [ ] Crear un importador reproducible o bloque normalizado versionado para CAT/EUS/NAV/GAL; los JSON finales están validados, pero el importador general aún no documenta toda esa regeneración.
- [ ] Automatizar una comprobación periódica de nueva convocatoria y vigencia sin convertir el Registro de Partidos en prueba de actividad.

## P2 — metodología e investigación

- [ ] Pilotar las 50 preguntas con datos reales: discriminación, fiabilidad por faceta, no respuesta, efecto de orden y funcionamiento diferencial por grupos.
- [ ] Revisar los umbrales de publicación de referencias doctrinales tras el piloto; ahora son reglas transparentes, no estimaciones empíricamente calibradas.
- [ ] Documentar más corrientes sin partido —consejismo, ecologismo pronuclear, carlismos por etapa— solo como referencias y nunca como papeletas.
- [ ] Ampliar el desglose de organización interna de partidos cuando existan estatutos actuales accesibles.
- [ ] Versionar cambios de programa y conducta con ventanas temporales comparables.

## Fuera de alcance deliberadamente

- No convertir organizaciones terroristas, clandestinas o violentas en resultados lúdicos.
- No deducir apoyo a ETA de soberanismo ni deducir ideología económica de una posición territorial.
- No atribuir a una coalición todas las posiciones de un componente.
- No presentar como disponible una candidatura que no consta en la convocatoria seleccionada.
- No inventar posiciones para elevar artificialmente la cobertura.
