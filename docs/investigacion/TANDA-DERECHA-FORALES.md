# TANDA DERECHA-FORALES — drenaje de huecos del campo FORAL/INSULAR

Encargo: drenar los huecos eje-entidad del campo FORAL/INSULAR de la matriz del propietario para **eaj-pnv (14 ejes), coalicion-canaria (13) y upn (10) = 37 huecos**. Solo se añaden posiciones por ítem; no se tocan coordenadas, brújula ni valores existentes.

Investigador: agente de datos (Opus). Corte: **2026-07-12**. Rama: `worktree-agent-a5c422f7a350f86ff`.

---

## 0. Nota de base (comprobación exigida por el integrador)

- El worktree se creó desde `c42e406` (main), no desde la base fresca `70843d4` citada en el encargo.
- Comprobado: `70843d4` es **descendiente** de `c42e406` (su `merge-base` es `c42e406`); su mensaje es «Levanta el veto felipista, fija la regla de base fresca…».
- Los **tres ficheros del encargo son byte-idénticos entre `c42e406` y `70843d4`** (`git diff --stat 70843d4 c42e406 -- data/partidos/{eaj-pnv,coalicion-canaria,upn}.json` → vacío), así que no hay colisión posible.
- Acción tomada: alineé **toda la rama** a la base fresca con `git reset --hard 70843d4` (más completo que el checkout por ficheros) y ejecuté además el comando solicitado `git checkout 70843d4 -- <3 ficheros>` → **«nothing to commit»** (ya alineado). No se creó commit de sincronización porque no había deriva.
- `git diff --stat 70843d4 HEAD -- data/partidos/` antes de editar: vacío. Base fresca confirmada.

## 1. Restricción de red (condiciona toda la tanda)

**WebFetch está inutilizado en este entorno**: los sitios de partido (eaj-pnv.eus, coalicioncanaria.org, upn.org), la prensa (infobae, eldiario, europapress, cadenaser), Wikipedia y parcan.es devuelven **403 Forbidden a nivel de servidor** (bloqueo anti-bot, no denegación de política del proxy — verificado en `/__agentproxy/status`); web.archive.org y varios dominios están directamente bloqueados para la herramienta.

Única vía operativa: **WebSearch**. Consecuencia metodológica (regla del encargo «titular = media máx»; «≥2 extractos independientes»): **no ha sido posible obtener ni un solo pasaje verbatim limpio por fetch directo**, de modo que el **techo de calidad de esta tanda es MEDIA**. Todas las altas se codifican por la vía prevista para «evidencia sin pasaje limpio»: **fuente + justificación SIN cita** (media/baja). Se descartó incluir citas verbatim para no arriesgar comillas inexactas (regla: inventado/mal atribuido es PEOR que hueco). El integrador re-verificará URLs y encaje por triaje.

## 2. Método aplicado por hueco

1. Índice eje→ítems construido leyendo `data/items/*.json` (campo `ejes[].eje`). Elección de 0–3 ítems por eje **cuya redacción literal aplica realmente al partido**, sin forzar.
2. Verificación por WebSearch con **≥2 extractos independientes** (votos parlamentarios reportados, autodefiniciones doctrinales corroboradas).
3. Valor (−2..+2) decidido por el **enunciado exacto del ítem** + evidencia, cotejado (nunca copiado) con el campo `notas`/«Esperado» del ítem como control de coherencia. **Las puntuaciones −100..100 de la matriz NO se copiaron** (p. ej. la matriz sugería +90 monarquía para UPN y +10 unitario para UPN: ambas ignoradas; se decidió por ítem).
4. Fecha por fuente: web viva = `2026`; voto/documento de época = fecha real (2014, 2023, 2024, 2025, 2026-01…).
5. Un pasaje/evidencia no sostiene dos ítems del mismo eje.

## 3. Resumen ejecutivo

| Entidad | Huecos de eje | Ejes drenados | Huecos declarados | Ítems-alta añadidos |
|---|---|---|---|---|
| eaj-pnv | 14 | **10** | 4 | 10 |
| coalicion-canaria | 13 | **4** | 9 | 4 |
| upn | 10 | **4** | 6 | 4 |
| **Total** | **37** | **18** | **19** | **18** |

Posiciones por fichero: eaj-pnv 46→56, coalicion-canaria 42→46, upn 25→29.

---

## 4. eaj-pnv — antes/después

| Eje (hueco) | Después | Ítem·valor·calidad·cita·fecha |
|---|---|---|
| estatismo | DRENADO | lab-007 +1 · media · no · 2025 |
| poder-laboral | DRENADO | lab-001 +2 · media · no · 2024; lab-007 +1 (comparte carga) |
| autonomia-sindical | DRENADO | lab-005 +1 · media · no · 2025 |
| institucionalismo | DRENADO | dem-012 +1 · media · no · 2026 |
| libertades-civiles | DRENADO | dem-021 +1 · media · no · 2025 |
| libertad-conciencia | DRENADO | rel-002 +2 · media · no · 2026 |
| monarquia | DRENADO | sd-013 +2 · media · no · 2014 |
| internacionalismo | DRENADO | der-015 −2 · media · no · 2026; lab-027 −2 · media · no · 2024 |
| ecologia | DRENADO | der-015 −2 (carga ecologia −0.5) · media · no · 2026 |
| energia-nuclear | DRENADO | ene-003 +1 · media · no · 2025 |
| pluralismo-institucional | **HUECO** | sin evidencia limpia por ítem (ver §7) |
| populismo | **HUECO** | partido de gobierno; sin evidencia antielitista (ver §7) |
| animalismo | **HUECO** | sin posición documentable (ver §7) |
| metodo-cambio | **HUECO** | ítems del eje son de estrategia comunista, inaplicables (ver §7) |

Notas de valor:
- **rel-002 +2**: autodefinición «democrático, participativo, plural, aconfesional y humanista»; ruptura con la confesión católica en 1977 (≥2 fuentes). rel-002 solo carga libertad-conciencia (no laicismo).
- **der-015 −2**: Agenda 2030 «una apuesta firme, sincera y total de EAJ-PNV» (web del partido + Sabino Arana Fundazioa). Un solo ítem drena internacionalismo Y ecologia (carga en ambos).
- **sd-013 +2**: voto **a favor** (16-09-2014) de la moción de referéndum monarquía/república (26 síes: IU, PNV, ERC, Amaiur, BNG). Voto documentado; no se usó mon-001 para no duplicar el eje.
- **ene-003 +1** (no +2): votó contra retrasar el cierre nuclear y prioriza renovables, pero mantiene reserva pragmática ante prórrogas → apoyo al calendario con matiz.
- **lab-001 +2 / lab-007 +1 / lab-005 +1**: prevalencia de convenios vascos (Consejo de Ministros), Mesa de Diálogo Social tripartita y «respeto a la autonomía de los agentes sociales» (acuerdo PNV-PSE). Tres facetas distintas de la concertación → tres ejes distintos.

## 5. coalicion-canaria — antes/después

| Eje (hueco) | Después | Ítem·valor·calidad·cita·fecha |
|---|---|---|
| estatismo | DRENADO | lab-016 −1 · media · no · 2026 |
| institucionalismo | DRENADO | dem-012 +2 · media · no · 2026 |
| internacionalismo | DRENADO | izq-013 −1 · media · no · 2024 |
| organizacion | DRENADO | dem-015 −1 · media · no · 2026 |
| pluralismo-institucional | **HUECO** | defensa de instituciones canarias documentada, pero sin evidencia por ítem (separación poderes/control judicial) |
| libertades-civiles | **HUECO** | progresismo social sí, protesta/vigilancia no documentado |
| populismo | **HUECO** | antibipartidismo instrumental; gobierna CON PP/PSOE; el ítem afín (and-002) es de Andalucía |
| monarquia | **HUECO** | sin posición documentable sobre forma de Estado |
| laicismo | **HUECO** | sin declaración aconfesional propia (la hallada era de Nueva Canarias) |
| libertad-conciencia | **HUECO** | votos sociales progresistas ≠ principio aconfesional explícito |
| animalismo | **HUECO** | su predecesor RECHAZÓ prohibir los toros; la prohibición canaria vino por ILP |
| energia-nuclear | **HUECO** | sin parque nuclear ni posición nacional |
| metodo-cambio | **HUECO** | ítems de estrategia comunista, inaplicables |

Notas de valor:
- **lab-016 −1**: ponencia ideológica «promover y propiciar la iniciativa privada, la responsabilidad individual, el esfuerzo, el mérito y la emprendeduría»; matiz «sectores estratégicos en manos canarias» (regional, no estatal) → inclinación leve contra el estatismo, no −2.
- **dem-015 −1**: «federación de sensibilidades insulares… más que un partido centralizado clásico»; su estructura federal-insular resta a la disciplina jerárquica. (La matriz sugería +45 centralización: **no copiado**; la evidencia apunta a descentralización interna.)
- **izq-013 −1**: pro-regularización (voto ILP 2024, «no condenarlos a la economía sumergida»), pero con preocupación por la saturación → −1, no −2.

## 6. upn — antes/después

| Eje (hueco) | Después | Ítem·valor·calidad·cita·fecha |
|---|---|---|
| modelo-territorial | DRENADO | dr-021 −2 · media · no · 2026 |
| institucionalismo | DRENADO | dem-012 +2 · media · no · 2026 |
| ue | DRENADO | ue-001 −1 · media · no · 2026-01 |
| estatismo | DRENADO | lab-016 −1 · **baja** · no · 2023 |
| pluralismo-institucional | **HUECO** | constitucionalista, pero sin evidencia por ítem (control judicial vía Consejo de Navarra es instrumental/consultivo) |
| populismo | **HUECO** | partido de gobierno; sin evidencia antielitista |
| monarquia | **HUECO** | constitucionalista, pero sin declaración monárquica propia limpia (inferencia insuficiente) |
| libertad-conciencia | **HUECO** | perfil confesional-tradicional mixto; rel-002 no es obvio sin declaración |
| internacionalismo | **HUECO** | restrictivo en migración, pero los ítems del eje no encajan en su marco (orden/seguridad ≠ salarial/nativista) |
| metodo-cambio | **HUECO** | ítems de estrategia comunista, inaplicables |

Notas de valor:
- **dr-021 −2**: UPN existe para defender el Amejoramiento y el autogobierno foral; suprimir las autonomías en un Estado unitario de administración única eliminaría sus instituciones forales. (La matriz sugería +10 unitario: **no copiado**; sobre este ítem categórico, la defensa foral manda → −2.)
- **ue-001 −1**: voto a favor (22-01-2026) de la resolución foral que reafirma el «compromiso proeuropeo… defendiendo el proyecto europeo»; europeísmo moderado alineado con el PPE, sin federalismo → −1.
- **lab-016 −1 (baja)**: inferido de su perfil fiscal liberal documentado (rebajas de tramos, exención de Patrimonio, oposición a topes de alquiler). Calidad **baja** por ser inferencia de identidad económica, no declaración sobre propiedad/dirección de empresas.

---

## 7. Huecos declarados — razonamiento (inventar es PEOR que hueco)

- **metodo-cambio (PNV, CC, UPN)**: los 10 ítems que cargan este eje son de **estrategia interna comunista** (revolución vs. reforma, PCE, boicot electoral, expropiación). Ninguno aplica a un partido nacionalista/regionalista moderado sin forzar. Hueco legítimo por falta de ítem propio adecuado.
- **populismo (PNV, CC, UPN)**: pop-001/002/003 son afirmaciones antielitistas/antibipartidistas. Los tres son partidos de gobierno establecidos (PNV y CC cogobiernan; UPN gobernó Navarra) que **pactan con las élites estatales**, no evidencia antielitista. El ítem regionalista afín (and-002) es **específico de Andalucía** y no reutilizable.
- **pluralismo-institucional (PNV, CC, UPN)**: los tres son inequívocamente parlamentarios/pluralistas, pero **no hallé evidencia por ítem** (control judicial de leyes, separación de poderes con coste, derechos de minoría irrevocables). Sus recursos ante tribunales/consejos consultivos son **instrumentales** (oposición a leyes concretas), insuficientes para dem-006/dem-008/dem-010 sin sobre-lectura. Se declina forzar.
- **energia-nuclear (CC)** y **estatismo/…**: CC no tiene parque nuclear ni posición nacional. Hueco limpio.
- **animalismo (PNV, CC)**: PNV sin posición documentable (caza/toros); en CC, su predecesor **rechazó** la prohibición taurina (vino por ILP), así que no cabe atribuirle animalismo.
- **laicismo / libertad-conciencia (CC)** y **libertad-conciencia (UPN)**: sin declaración doctrinal propia limpia sobre aconfesionalidad (en CC la hallada era de Nueva Canarias; UPN tiene perfil confesional-tradicional mixto). Sus votos sociales no equivalen al principio Iglesia-Estado del ítem.
- **internacionalismo (UPN)**: su restrictivismo migratorio se enmarca en orden/seguridad, no en la lógica salarial (izq-013) ni claramente nativista de recursos (lab-027); der-015 (abandonar Agenda 2030) es de Vox, no consta en UPN. Sin encaje limpio.

## 8. Banderas para el integrador

1. **Deriva de base (resuelta)**: worktree nacido en `c42e406`, no en `70843d4`; alineado por `reset --hard`. Los 3 ficheros eran idénticos entre ambas bases. Cherry-pick limpio garantizado.
2. **Techo de calidad MEDIA por bloqueo de WebFetch** (§1). Ninguna alta lleva cita verbatim; todas son fuente+justificación. Si el integrador tiene fetch operativo, procede **elevar a ALTA** las mejores (der-015 Agenda 2030, sd-013 voto 2014, ue-001 resolución 2026, lab-001 prevalencia convenios) añadiendo el pasaje verbatim y su `grupoEvidencia` (via `node scripts/asignar-grupos-evidencia.mjs --write`).
3. **`node_modules` NO está en `.gitignore` de `70843d4`**: creé un symlink `node_modules → /home/user/espectro/node_modules` para correr validadores; queda **untracked** y **NO** se commiteó (solo se añadieron ficheros explícitos). Conviene borrarlo o ignorarlo tras el triaje.
4. **upn/lab-016 es la única alta de calidad `baja`** (inferencia de perfil fiscal). Candidata a revisión o retirada si el triaje la juzga sobre-lectura.
5. **der-015 (PNV)** drena dos ejes a la vez (internacionalismo carga +0.5, ecologia carga −0.5): un valor −2 aporta señal pro-Agenda 2030 coherente en ambos. Verificar que el motor lo reparta como se espera.
6. Ningún valor existente fue tocado; no detecté errores en los valores previos que exijan bandera.

## 9. Cola de URLs (verificación humana)

**eaj-pnv**
- https://www.eaj-pnv.eus/es/historia-e-ideologia/ (rel-002, dem-012 — autodefinición aconfesional y vía pactista)
- https://www.eaj-pnv.eus/es/noticias/52427/la-agenda-2030-es-una-oportunidad-para-avanzar-en- (der-015)
- https://www.noticiasdegipuzkoa.eus/politica/2024/12/10/pnv-plantea-extender-epsv-agilizar-9033730.html (lab-027)
- https://www.eaj-pnv.eus/es/noticias/57232/eaj-pnv-apuesta-por-la-negociacion-colectiva-para-/ (lab-007)
- https://www.eaj-pnv.eus/es/noticias/55667/eaj-pnv-logra-que-el-consejo-de-ministros-apruebe-/ (lab-001)
- https://www.noticiasdealava.eus/politica/2025/10/20/pnv-defiende-smi-vasco-insta-10242052.html (lab-005)
- https://www.eldiario.es/politica/congreso-rechaza-enmiendas-pp-vox-reforma-ley-mordaza_1_11894158.html (dem-021)
- https://es.ara.cat/politica/ultima-vez-espana-voto-monarquia-republica_1_4204843.html (sd-013)
- https://www.deia.eus/politica/2025/05/05/pnv-apuesta-renovables-previene-coste-9594683.html (ene-003)

**coalicion-canaria**
- https://coalicioncanaria.org/quienes-somos/ (dem-012)
- https://coalicioncanaria.org/historia-e-ideologia/ (lab-016 — ponencia ideológica)
- https://coalicioncanaria.org/organos-del-partido/ (dem-015)
- https://www.infobae.com/espana/2024/04/09/el-congreso-apoya-la-iniciativa-de-regularizacion-extraordinaria-de-extranjeros/ (izq-013)

**upn**
- https://www.upn.org/principios-y-valores/ (dr-021, dem-012)
- https://www.navarrainformacion.es/2026/01/22/el-parlamento-de-navarra-reafirma-el-compromiso-en-el-40o-aniversario-del-ingreso-de-espana-en-la-ue/ (ue-001)
- https://elecciones.upn.org/programa/ (lab-016)

## 10. Salida de puertas

- `npm run validate:data` → **✓ Datos válidos (instrumento v4, corte 2026-07-12)**. Los avisos de sesgo evidencia-bandera son PRE-EXISTENTES y afectan a otros partidos (cup, fe-jons, vox…), no a los tres del encargo.
- `npm run validate:evidence-groups` → **✓ Todos los pasajes citados conservan un grupo de evidencia canónico.** (El único aviso de «1 cita sin URL/localizador» es pre-existente en la base, ajeno a esta tanda; ninguna de mis 18 altas añade citas.)
- No se ejecutó `asignar-grupos-evidencia.mjs --write` porque no se añadieron citas (no procede).
- JSON de los 3 ficheros: parseo válido; 216 inserciones, 0 borrados.
