# Producción web, PWA y aplicación móvil

**Corte de esta hoja de ruta:** 11 de julio de 2026.

Este documento convierte la arquitectura actual de Espectro en un plan de publicación. No
sustituye la metodología política ni la revisión jurídica de privacidad. Su objetivo es que la
web funcione de forma fiable en PC y móvil, que la PWA pueda instalarse y terminar el test sin
conexión y que una futura aplicación de tiendas reutilice la misma base mediante Capacitor.

## 1. Decisión de arquitectura

La ruta recomendada es:

1. estabilizar una única web responsive;
2. publicar esa web como PWA;
3. comprobarla en navegadores y dispositivos reales;
4. envolver el mismo build con Capacitor solo cuando exista una razón para entrar en tiendas.

El motor de `src/engine`, el banco y los perfiles siguen siendo compartidos. No se crea un segundo
frontend nativo ni una API de respuestas. El servidor estático entrega código y datos públicos;
las respuestas, la comunidad, las prioridades y el resultado permanecen en el dispositivo.

```text
datos JSON + esquemas ─┐
                       ├─ build validado ─ web/PWA estática ─ CDN
motor TypeScript puro ─┘                         │
                                                └─ Capacitor futuro
                                                   (mismo web/dist)
```

React Native solo se reconsiderará si aparecen requisitos que una WebView no pueda satisfacer:
integraciones nativas intensivas, rendimiento demostrado como insuficiente o una experiencia de
accesibilidad imposible de resolver en la web. Hoy duplicaría interfaz, mapas, pruebas y errores.
Una TWA puede servir como atajo para Google Play, pero no cubre iOS; no es la ruta principal.

## 2. Estado técnico de partida

La base disponible ya incluye:

- cálculo y persistencia exclusivamente locales;
- diseño responsive, tema oscuro y objetivos táctiles;
- carga diferida de resultados y del visor 3D;
- estado persistido versionado por instrumento y con caducidad;
- manifest e iconos instalables;
- service worker generado en build, con precache de shell, resultados, datos y 3D;
- actualización bajo confirmación, sin activar un worker nuevo a mitad de sesión;
- límites de error generales y respaldo 2D para el visor 3D;
- configuración de build y cabeceras para Netlify;
- Vitest, validación de datos, TypeScript, build y Playwright en CI.

El build auditado como referencia produjo aproximadamente:

| Recurso | Minificado | Gzip | Carga |
|---|---:|---:|---|
| aplicación inicial | 360 kB | 104 kB | inmediata |
| resultados y catálogos | 1.576 kB | 362 kB | diferida |
| visor 3D | 926 kB | 250 kB | al solicitarlo |
| precache PWA completo | 2,81 MiB | depende de compresión HTTP | segundo plano |

El precache garantiza el flujo offline, pero descarga los chunks diferidos en segundo plano desde
la primera visita. Debe medirse en una red móvil real y mantenerse un presupuesto de tamaño.

## 3. Puerta de publicación

No se promociona un despliegue a producción hasta que se cumplan, sobre el mismo commit, todos
estos criterios:

```bash
npm ci
npm --prefix web ci
npm run validate:data
npm run typecheck
npm test
npm run web:build
npm run web:budget
npm run web:test:e2e
git diff --check
```

Además de la matriz automática:

- el árbol debe estar limpio y el commit debe identificar la versión publicada;
- `data/version.json` debe declarar el instrumento y la fecha de corte correctos;
- un cambio de significado, condición o carga de un ítem debe incrementar
  `versionInstrumento`;
- se completa manualmente rápido → provisional → exhaustivo → revisión → resultados;
- se cambia elección y comunidad sin repetir respuestas;
- se prueba borrar datos y continuar con almacenamiento bloqueado;
- se instala la PWA, se desconecta la red y se abren resultados y 3D;
- se instala un segundo build y se prueba aceptar y posponer la actualización;
- nunca se debe recargar afirmando que las respuestas están guardadas si el almacenamiento ha
  fallado;
- un fallo de chunk debe ofrecer una recuperación que realmente vuelva a solicitarlo o una
  recarga explícita y segura.

Conviene automatizar una regla de revisión que exija cambiar `data/version.json` cuando un diff
modifique campos semánticos del instrumento. La decisión sobre si un cambio editorial invalida
sesiones puede seguir siendo humana, pero no debe pasar inadvertida.

## 4. Despliegue web

### 4.1 Entornos

Mantener tres niveles:

- **preview de PR:** URL efímera para revisión funcional, visual y editorial;
- **staging:** réplica de producción con el candidato exacto a publicar;
- **producción:** dominio canónico y despliegue aprobado.

Cada despliegue debe ser atómico y conservar la posibilidad de volver al build anterior. No se
debe subir `web/dist` al repositorio: lo genera el proveedor desde los lockfiles con `npm ci`.

### 4.2 Netlify y caché

`netlify.toml` define el build, `web/dist`, Node 22, CSP y las cabeceras principales. Antes de
abrir producción hay que comprobar sobre la respuesta real del CDN:

- HTTPS y redirección única de HTTP a HTTPS;
- `sw.js`, `/` e `index.html` sin caché duradera;
- assets con hash y Workbox con un año e `immutable`;
- CSP, `Referrer-Policy`, `Permissions-Policy`, HSTS y `nosniff` presentes también en errores;
- ausencia de scripts, píxeles, fuentes o CDN de terceros;
- rollback que mantenga juntos HTML, chunks y service worker del mismo build.

La rama de producción se protege: CI obligatoria, revisión del diff y prohibición de publicar si
falla cualquier job. Las credenciales de Netlify o del dominio viven en el gestor de secretos, no
en el repositorio.

### 4.3 Operación sin perfilar usuarios

La observabilidad inicial debe apoyarse en:

- monitor sintético de portada y descarga de assets;
- smoke test periódico con un estado artificial, nunca con respuestas reales;
- identificador de build visible para soporte;
- sourcemaps como artefactos privados de CI;
- diagnóstico que el usuario pueda copiar voluntariamente y que excluya estado, respuestas,
  comunidad, resultados y contenido de `localStorage`.

No se integran grabadores de sesión, publicidad programática ni SDK de analítica/error de terceros.
Si en el futuro se propone telemetría, debe pasar por revisión jurídica y de amenazas, ser
primera-parte, agregada, sin identificadores y con opt-in separado. La calibración voluntaria de
respuestas es otro tratamiento y no debe mezclarse con la observabilidad operativa.

## 5. QA real en PC y móvil

Playwright en Chromium es una red de seguridad, no una certificación de compatibilidad. Antes de
producción se ejecutará esta matriz mínima:

| Plataforma | Navegadores o modo | Qué validar |
|---|---|---|
| Windows 11 | Chrome, Edge y Firefox actuales | teclado, zoom 200 %, tablas, impresión visual, instalación escritorio |
| macOS actual y anterior | Safari, Chrome y Firefox | WebKit, contraste, gestos, PWA cuando proceda |
| iPhone | Safari y PWA instalada, iOS actual y anterior | safe areas, volver, actualización, offline, VoiceOver |
| Android | Chrome y PWA instalada, versión actual y anterior | botón Atrás, teclado/táctil, actualización, offline, TalkBack |
| iPad o tableta Android | vertical y horizontal | mapas, tablas, cambios de orientación y multitarea |

Anchuras de referencia: 320, 360, 390, 412, 768, 1024, 1280 y 1440 píxeles. También se prueba
altura reducida, zoom de texto, tema oscuro, alto contraste cuando esté disponible,
`prefers-reduced-motion` y conexión lenta.

### 5.1 Automatización que falta ampliar

- proyectos Playwright para Chromium, Firefox y WebKit;
- emulación de iPhone y Android, sin sustituir los dispositivos reales;
- actualización entre dos builds distintos del service worker;
- fallo de registro y fallo de cada chunk perezoso;
- error boundary con y sin almacenamiento disponible;
- navegación Atrás/Adelante y restauración tras recarga;
- capturas de referencia de portada, pregunta, módulos, mapas, ranking y detalle;
- axe-core en CI sobre todas las fases;
- presupuesto Lighthouse o equivalente para portada y resultados.

### 5.2 Presupuestos orientativos

Mientras el catálogo crece, usar como alarma —no como sustituto de la medición real—:

- JavaScript inicial ≤ 120 kB gzip;
- resultados y datos ≤ 365 kB gzip (recalibrado al catálogo de 39 referencias; si vuelve a crecer, separar cartografía y fichas antes de ampliar de nuevo);
- visor 3D ≤ 300 kB gzip;
- LCP ≤ 2,5 s y CLS ≤ 0,05 en un móvil medio;
- Lighthouse rendimiento, accesibilidad, buenas prácticas y SEO ≥ 95;
- ninguna tarea larga atribuible al cálculo que bloquee la interacción más de 200 ms.

Si resultados supera el presupuesto, separar cartografía, detalle documental y catálogos; no
recortar evidencia. Si el DOM crece, renderizar los detalles al abrirlos y paginar o virtualizar
catálogos, conservando navegación por teclado y lectura lineal.

## 6. Navegación, History API y botón Atrás

La máquina de estados actual no debe volcarse a la URL: una URL compartida nunca contendrá
respuestas ni resultados. Sí debe integrarse con el historial para que Atrás sea predecible:

- registrar transiciones de fase con `history.pushState` usando solo nombres genéricos;
- usar `replaceState` para restauración inicial y cambios que no deban crear un paso;
- traducir `popstate` a una transición segura del reductor;
- no retroceder pregunta por pregunta salvo que se decida y pruebe expresamente;
- preservar las respuestas al volver de resultados, revisión o metodología;
- si el almacenamiento no funciona, avisar antes de una salida que destruiría la sesión;
- en Capacitor, conectar `App.addListener('backButton', ...)` con la misma política;
- en la portada, el Atrás nativo puede minimizar/cerrar la app; en cualquier otra fase debe volver
  a la fase lógica anterior.

No se añaden rutas profundas de resultados. Una futura ruta pública de metodología o privacidad
puede ser estática y no depender del estado personal.

## 7. PWA: instalación, offline y actualizaciones

### 7.1 Política de caché

El manifiesto de precache debe generarse siempre desde el build. Debe incluir el shell y todos los
datos necesarios para terminar el test y calcular resultados. Los nombres con hash son
inmutables; HTML, manifest y service worker se revalidan.

El 3D puede seguir precacheado mientras el total sea pequeño. Si crece, se puede convertir en una
descarga offline opcional: el mapa 2D continuará siendo el respaldo funcional y accesible.

### 7.2 Actualización segura

La versión activa se conserva hasta que el usuario acepte actualizar. El flujo esperado es:

1. el worker nuevo queda esperando;
2. la interfaz muestra la versión disponible;
3. se persiste de nuevo el estado actual;
4. si el guardado falla, no se promete conservación ni se recarga sin confirmación explícita;
5. al aceptar, se envía `SKIP_WAITING`;
6. al adquirir control, se recarga una sola vez;
7. el cargador valida `version`, `versionInstrumento` y caducidad antes de restaurar.

Una actualización que cambie el instrumento puede descartar respuestas por seguridad
metodológica. Si hay una sesión activa, debe explicarse antes de actualizar o posponerse hasta
terminarla. Este escenario necesita una prueba específica con dos builds.

### 7.3 Instalación

Probar manifest, iconos `any` y `maskable`, nombre, orientación, colores y arranque desde icono.
No activar `window-controls-overlay` en escritorio hasta implementar y probar las variables
`titlebar-area-*`; `standalone` es el modo seguro por defecto. Añadir capturas al manifest cuando
existan imágenes definitivas.

## 8. Almacenamiento y privacidad

El estado local contiene opiniones políticas. La política por defecto sigue siendo:

- sin cuentas ni sincronización;
- sin servidor de respuestas;
- guardado local con borrado visible;
- caducidad tras 90 días sin actividad;
- invalidación completa si cambia el significado del instrumento;
- filtrado defensivo de IDs, valores, módulos y fases al restaurar.

Antes del lanzamiento se decidirá si el usuario puede elegir entre memoria de sesión y
persistencia. En un dispositivo compartido, «No guardar este test» debe ser una opción clara. No
se debe afirmar que una sesión está guardada solo porque `localStorage` exista: cada escritura
puede fallar por cuota, modo privado o política del navegador.

La política pública debe identificar responsable y contacto, proveedor de alojamiento, finalidad
y retención de logs técnicos del CDN, mecanismo de borrado y ausencia de analytics. Los logs de
acceso pueden contener IP y agente de usuario aunque nunca contengan respuestas; se minimizan y
se documentan. Una revisión jurídica previa al lanzamiento debe confirmar RGPD, LOPDGDD y la
redacción de los disclaimers.

## 9. SEO y presentación social

El dominio definitivo es un prerrequisito para cerrar esta fase. Cuando se elija:

- añadir `link rel="canonical"` con la URL de producción;
- añadir Open Graph (`og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:locale`);
- añadir Twitter Card equivalente;
- crear una imagen social de 1200 × 630 sin resultados personales;
- publicar `sitemap.xml` y referenciarlo desde `robots.txt`;
- verificar el dominio en buscadores y herramientas de previsualización;
- servir una portada prerenderizada o HTML significativo para crawlers que no ejecuten React;
- mantener resultados y estado personal fuera de URLs, metadatos y previews.

Hasta conocer dominio y nombre definitivo no se deben fijar canonical ni imágenes sociales con
URLs provisionales que luego queden cacheadas.

## 10. Evolución a Capacitor

### 10.1 Criterios de entrada

No se empieza el wrapper hasta que:

- la PWA haya pasado al menos un ciclo real de publicación y actualización;
- el flujo completo funcione en Safari iOS y Chrome Android;
- History API y botón Atrás tengan una política estable;
- el almacenamiento y la caducidad estén cerrados;
- exista dominio, política de privacidad, soporte y responsable editorial;
- la revisión de licencia y tiendas esté resuelta.

### 10.2 Implementación

Capacitor debe consumir el mismo `web/dist`. El shell nativo añade solo lo imprescindible:

- identificadores de paquete estables para iOS y Android;
- iconos, splash y colores nativos;
- safe areas y edge-to-edge comprobados en dispositivos;
- integración del botón Atrás;
- enlaces de fuentes abiertos en el navegador del sistema, no dentro de la WebView;
- navegación restringida al contenido empaquetado y HTTPS;
- service worker desactivado en plataforma nativa: allí los assets ya van dentro del paquete;
- acceso a compartir/exportar únicamente por acción explícita;
- almacenamiento local excluido de copias cloud o backups automáticos si pudiera contener
  respuestas; cualquier plugin de almacenamiento requiere auditoría previa.

El baseline político viaja en la aplicación para conservar funcionamiento offline. Una futura
actualización de datos sin nueva versión de tienda solo será aceptable si descarga para todos el
mismo paquete genérico, versionado, validado y firmado; nunca debe variar según respuestas. El
código ejecutable se actualiza por los canales oficiales de las tiendas, no mediante hot update
remoto improvisado.

### 10.3 QA nativo

- builds de desarrollo, staging y producción diferenciados;
- pruebas en iPhone pequeño/grande, iPad y dos gamas Android;
- arranque frío, actualización, reinstalación y restauración del sistema;
- modo avión desde el primer arranque y después de actualizar datos;
- rotación, multitarea, memoria baja y pérdida de contexto WebGL;
- VoiceOver y TalkBack;
- enlaces externos, compartir y retorno a la app;
- confirmación de que backups, logs y crash reports no contienen el estado político.

### 10.4 Firma y publicación

Antes de generar una release:

- crear y proteger keystore de Android, certificados y perfiles de Apple;
- guardar secretos en CI con acceso mínimo y rotación documentada;
- separar versión de producto, `versionCode` Android, `CFBundleVersion` iOS y versión del
  instrumento;
- generar builds reproducibles y conservar hashes y artefactos de cada release;
- preparar fichas de privacidad/Data Safety, clasificación de contenido, capturas, texto de
  tienda, URL de soporte y URL de privacidad;
- inventariar licencias de dependencias y publicar avisos y código fuente correspondientes;
- probar actualización desde la versión pública anterior, no solo instalación limpia.

## 11. AGPL y tiendas

La web y cualquier wrapper siguen sujetos a AGPL-3.0. Cada despliegue debe enlazar el código fuente
correspondiente a la versión que ejecuta y conservar avisos de copyright y licencia.

Antes de App Store o Play Store hace falta una revisión jurídica específica sobre:

- compatibilidad entre AGPL y los términos/DRM de cada tienda, especialmente Apple;
- titularidad o permisos de todas las contribuciones;
- conveniencia de un acuerdo de contribución o licencia dual para distribución en tiendas;
- obligaciones de ofrecer el código fuente correspondiente del binario publicado;
- licencias y atribuciones de Capacitor, React, Three y demás dependencias.

No debe cambiarse la licencia como trámite técnico sin decisión del titular y revisión de las
contribuciones existentes. La PWA sigue siendo la vía de distribución universal mientras esta
cuestión se resuelve.

## 12. Secuencia recomendada

### Fase A — web candidata

- cerrar matriz verde sobre un commit;
- desplegar previews y staging;
- verificar cabeceras, caché, CSP y rollback;
- cerrar dominio, aviso legal y política pública;
- completar SEO una vez exista la URL canónica.

### Fase B — navegadores y PWA

- añadir Firefox/WebKit a la automatización;
- ejecutar QA real en PC, iOS, Android y tabletas;
- cerrar History API y botón Atrás;
- probar actualización entre dos builds y almacenamiento fallido;
- publicar la PWA y observar un ciclo real de actualización.

### Fase C — endurecimiento

- mantener presupuestos de rendimiento y capturas visuales;
- añadir monitor sintético y build ID;
- revisar accesibilidad con tecnologías asistivas reales;
- ensayar respuesta a rollback, caché rota y fuente política retirada.

### Fase D — Capacitor

- resolver licencia y requisitos de tiendas;
- crear el shell mínimo y desactivar mecanismos web innecesarios en nativo;
- completar QA, firma, privacidad y materiales de tienda;
- publicar primero en un canal cerrado y validar actualización desde la versión anterior.

La condición de éxito no es «estar en una tienda»: es mantener una sola aplicación verificable,
offline, privada y metodológicamente versionada en web, PWA y, si aporta valor, en los dos shells
nativos.
