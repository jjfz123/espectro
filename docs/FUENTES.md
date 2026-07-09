# Fuentes de datos

## Partidos inscritos
- **Registro de Partidos Políticos (Ministerio del Interior)**: buscador web en infoelectoral.interior.gob.es y servicio.mir.es (búsqueda por denominación, siglas, fecha; exporta PDF). No hay API ni descarga masiva oficial; el listado completo se ha obtenido históricamente vía solicitudes de transparencia (así lo hicieron Maldita.es y Newtral). ~6.300 partidos activos (dic-2023), pero solo ~60 candidaturas concurrieron a las generales de 2023: el filtro relevante es la **actividad electoral**, no la inscripción.

## Actividad electoral (el filtro de cobertura)
- **infoelectoral.interior.gob.es**: resultados y candidaturas de todas las elecciones. Área de descargas con microdatos .DAT.
- **Paquete R `infoelectoral`** (CRAN): `candidatos()`, `municipios()`, `provincias()`, hasta nivel de mesa.
- **github.com/JaimeObregon/infoelectoral** (AGPLv3): microdatos del Ministerio convertidos a CSV reutilizable, incluidas candidaturas (con cabildos canarios).

## Posiciones de partidos
- **Programas electorales**: webs oficiales + archivado propio (los programas desaparecen tras cada ciclo; archivar PDF con fecha en el momento de codificar).
- **Votaciones del Congreso**: datos abiertos de congreso.es (XML/JSON/CSV). Fuente preferente para partidos con grupo parlamentario: los votos pesan más que las palabras.
- **Autoubicación**: cuestionario directo a los partidos (modelo Wahl-O-Mat), respuesta + justificación ≤ 500 caracteres.

## Anclaje académico de ejes
- **Chapel Hill Expert Survey (CHES)**: dimensiones económica, GAL-TAN, territorial, UE; incluye partidos españoles.
- **Manifesto Project (MARPOR)**: codificación de programas; útil para validar posiciones estimadas.

## Referencias metodológicas VAA
- Wahl-O-Mat (bpb.de): proceso editorial de tesis y autoubicación de partidos.
- EU&I / euandi (European University Institute): método mixto con cita textual por posición; metodología publicada.
- Walgrave, Nuytemans & Pepermans (2009): sesgo de selección de afirmaciones.
- Louwerse & Rosema: efecto del modelo espacial en el consejo.
- Germann & Méndez: análisis de Mokken para validar escalas VAA.
- Declaración de Lausana sobre VAAs: estándar de transparencia.

## Proyectos open source de referencia
- **OpenVAA** (openvaa.org) — framework completo y activo, respaldo académico.
- **OpenElectionCompass** — ligero, con guía editorial para redactar tesis.
- **Mat-O-Wahl** (GPLv3) — clon simple del Wahl-O-Mat.
- **KAIROS** (Django) — VAA multilingüe.
