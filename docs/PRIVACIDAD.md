# Privacidad por diseño

Este proyecto trata la opinión política del usuario, y eso condiciona la arquitectura entera. Este documento no es asesoramiento jurídico; es el análisis que fundamenta las decisiones técnicas. Antes de un lanzamiento público, revisión legal.

## 1. Marco normativo

- **Art. 9.1 RGPD**: las opiniones políticas son categoría especial; su tratamiento está prohibido salvo excepciones tasadas. La aplicable a un test voluntario es el consentimiento explícito (art. 9.2.a).
- **Art. 9.1 LOPDGDD (LO 3/2018)** — el punto determinante en España: *«el solo consentimiento del afectado no bastará para levantar la prohibición del tratamiento de datos cuya finalidad principal sea identificar su ideología»*. Un test de afinidad tiene exactamente esa finalidad principal. Conclusión de diseño: **no basta con pedir consentimiento y almacenar; hay que no tratar el dato en servidor**.
- **STC 76/2019**: el Constitucional anuló por unanimidad el art. 58 bis.1 LOREG (recopilación de opiniones políticas por partidos), afirmando que las opiniones políticas son datos sensibles con protección reforzada.
- **Circular 1/2019 AEPD**: prohíbe el microtargeting ideológico y la inferencia de ideología a partir de otros datos.

## 2. Decisiones de arquitectura

1. **Cálculo 100 % client-side.** El motor (`src/engine`) es puro: sin red, sin E/S. El frontend descarga ítems y posiciones de partidos (datos públicos) y calcula afinidad y ejes en el navegador. **Las respuestas del usuario nunca salen del dispositivo.**
2. **Sin cuentas, sin identificadores.** Nada de login, IDs publicitarios, fingerprinting ni cookies de terceros. Sin analítica de terceros; si hay telemetría, autoalojada, agregada y opt-in.
3. **Persistencia solo local y bajo control del usuario.** Guardar/retomar el test usa almacenamiento local del navegador, con botón de borrado visible y caducidad automática tras 90 días sin actividad. Cada sesión declara la versión metodológica del instrumento: si cambia el significado o la carga de los ítems, el estado anterior se descarta en vez de reinterpretarse. Exportar o compartir un resumen es siempre una acción explícita del usuario; nunca ocurre al calcular el resultado.
4. **Sin inferencia ampliada.** El sistema no cruza respuestas con ninguna otra fuente ni construye perfiles. Prohibido por diseño y por licencia de facto: AGPL obliga a publicar el código de cualquier despliegue derivado, lo que hace auditable que nadie añada perfilado en silencio.
5. **Anonimización real para calibración.** El análisis de Mokken/IRT (docs/METODOLOGIA.md §7) usa exclusivamente datos anonimizados y agregados aportados voluntariamente (opt-in claro y separado). Recordatorio AEPD: los datos *seudonimizados* siguen siendo personales; solo la anonimización irreversible queda fuera del RGPD. El pipeline de calibración debe recibir vectores de respuesta sin IP, sin timestamp fino y sin combinaciones reidentificables (k-anonimato mínimo antes de almacenar).
6. **Higiene técnica**: CSP estricta, fuentes autoalojadas, sin CDNs de terceros que vean tráfico, TLS, cabeceras de no-referrer hacia fuentes citadas.

### 2.1 Excepción deliberada: enlace de resumen compartible

La aplicación puede crear, solo al pulsar «Compartir enlace» o «Copiar enlace», un fragmento
`#r=...` de solo lectura. El fragmento no forma parte de la petición HTTP y no se envía al
alojamiento al abrir la URL. Sí contiene información política derivada que cualquier persona o
software con acceso al enlace puede leer:

- versión del instrumento y del catálogo;
- nivel del perfil, tipo de elección y comunidad autónoma si se indicó;
- número de preguntas administradas y contestadas con opinión;
- valores, cobertura y suficiencia de las facetas;
- cinco mayores afinidades, su cobertura y grado de confianza.

No contiene respuestas, prioridades, textos libres, detalle por ítem, justificaciones, fuentes,
direcciones de red, identificadores de cuenta ni contenido de `localStorage`. La vista receptora,
mientras permanece abierta, no hidrata, mezcla, borra ni renueva la sesión local. Al cerrarla se
monta la aplicación ordinaria: una sesión vigente queda byte a byte igual, mientras que una sesión
ya caducada o incompatible se elimina conforme a la política normal de 90 días. El payload usa un
esquema cerrado, límites de tamaño y listas de identificadores permitidos; no es cifrado ni una
prueba de autenticidad.

Modelo de amenaza y límites: el enlace no caduca, no se puede revocar y puede quedar en historial,
portapapeles, sincronización del navegador, copias de seguridad, capturas o aplicaciones de
mensajería. También puede ser modificado por quien lo recibe. Por eso la interfaz avisa antes de
compartir, no añade etiquetas sensibles a la tarjeta predeterminada y separa enlace e imagen. La
ausencia de scripts de terceros sigue siendo esencial: cualquier script ejecutado en la página
podría leer el fragmento aunque el servidor no lo reciba.

## 3. Si algún día hubiera tratamiento en servidor

Cualquier funcionalidad futura que implique persistir respuestas identificables (p. ej. cuentas con historial) exige, antes de escribir código: Evaluación de Impacto (EIPD, art. 35 RGPD — tratamiento a gran escala de categorías especiales), Registro de Actividades del Tratamiento, minimización estricta y reevaluación completa frente al art. 9.1 LOPDGDD. La posición por defecto del proyecto es **no hacerlo**: el valor del producto no lo requiere.

## 4. Qué comunicar al usuario

En la primera pantalla, en lenguaje claro: qué se calcula, dónde (su navegador), qué no se envía (sus respuestas), qué es opt-in (telemetría agregada), y el enlace a este documento y al código. La confianza es una característica del producto.

## 5. Publicidad

Si algún día se muestra publicidad, será **autoservida y estática**: contenido aprobado editorialmente, incluido en el propio build y renderizado como texto plano (componente `web/src/componentes/EspacioPatrocinado.tsx`, con `activo: false` por defecto), siempre rotulado «Espacio patrocinado». Sin scripts de terceros, sin cookies, sin píxeles y sin ninguna petición de red.

Queda prohibido cualquier tercero con tracking. La razón es la misma que estructura todo el proyecto: las respuestas revelan la ideología del usuario (art. 9 RGPD) y un script de terceros ejecutándose en la página podría observar la sesión completa —respuestas, resultados, almacenamiento local—, lo que comprometería el diseño 100 % client-side por mucho que el cálculo siga ocurriendo en el navegador. La publicidad tampoco participa en el cálculo ni condiciona el orden o el contenido de los resultados.
