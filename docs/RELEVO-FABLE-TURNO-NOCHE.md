# Relevo a Fable — turno de noche de Espectro

**Fecha de corte:** 10 de julio de 2026
**Rama de integración:** `codex/frontend-exhaustivo-mapeo-politico`
**Rama de origen intacta:** `claude/espectro-political-vaa-3d35l3`
**Nombre del siguiente hito:** **Espectro 1.0 — cierre exhaustivo, evidencia y pulido de producto**

## 1. Qué es este estado del proyecto

La rama de integración convierte el prototipo en una aplicación política multidimensional que separa tres resultados:

1. el **perfil propio** de la persona, aunque no exista un partido que lo represente;
2. las **referencias doctrinales no electorales**, sin afirmar «eres X»;
3. la **afinidad documentada con partidos y sindicatos**, con cobertura, fuentes y advertencias.

El producto sigue siendo una SPA web privada: todo el cálculo y la persistencia suceden en el navegador. No existe todavía una app nativa ni una PWA instalable completa.

## 2. Trabajo ya integrado

### 2.1. Rama y seguridad de trabajo

- Todo se ha trabajado en `codex/frontend-exhaustivo-mapeo-politico`.
- La rama de origen no se ha modificado.
- El árbol puede contener muchos archivos nuevos porque se incorporaron datos, esquemas, investigación, motor y frontend en una sola fase; no son demos externas ni artefactos de otro proyecto.
- Los perfiles ficticios permanecen únicamente como fixtures de prueba y se filtran de producción.

### 2.2. Modo rápido y continuidad exhaustiva

- El rápido contiene **exactamente 50 preguntas generales**: las 40 anteriores y 10 discriminantes nuevos.
- Los 10 añadidos cubren parlamentarismo, democracia interna, protesta, sindicato corporativo, nuclear civil, gasto de defensa, aborto, intervención humanitaria, disuasión nuclear y derechos animales.
- Al terminar aparece una decisión explícita:
  - `Ver perfil provisional`;
  - `Continuar al exhaustivo`.
- Desde los resultados provisionales también se puede continuar al exhaustivo.
- Se conservan respuestas, prioridades y contexto electoral; no se repiten preguntas compatibles.
- El rápido nunca absorbe preguntas sobre ETA, León, deuda histórica andaluza ni otros asuntos territoriales.
- La interfaz no revela categorías ni puntuaciones mientras se responde.

Archivos principales: `web/src/estado.ts`, `web/src/vistas/FinRapido.tsx`, `web/src/vistas/Cuestionario.tsx`, `web/src/vistas/Resultados.tsx`, `web/src/datos.ts` y `tests/estado.test.ts`.

### 2.3. Estado, accesibilidad y edge cases

- Migración y saneamiento defensivo del estado persistido.
- `localStorage` puede fallar sin romper la sesión; la UI avisa.
- `Sin opinión` no se convierte en cero ni en desacuerdo.
- Cero respuestas con opinión produce «sin afinidad calculable», no un ranking falso.
- Las subpreguntas ocultas se eliminan si cambia la respuesta padre.
- Revisión y edición de respuestas antes o después del resultado.
- Radios Likert nativos, teclado, foco al cambiar de vista y navegación anterior/siguiente.
- Cobertura baja y facetas insuficientes se rotulan como provisionales.

### 2.4. Perfil multidimensional

- Hay **27 facetas/ejes**; no se promedian en una sola etiqueta.
- Dominios visibles: economía/trabajo, democracia, sociedad, territorio, ecología/energía, defensa y organización política.
- Cada barra declara polos, preguntas respondidas, carga y suficiencia de evidencia.
- Existe un explorador 2D opcional sin cuadrantes prefabricados.
- Se añadió el subtipo **arquitectura territorial** con referencias visibles:
  - confederación;
  - federación;
  - Estado autonómico;
  - Estado unitario.
- Independencia, asimetría y procedimiento de secesión siguen separados para no convertir el territorio en una escala falsa.
- La escala religión/Estado muestra también sus cinco referencias: ateísmo de Estado, laicismo, aconfesionalidad, confesionalidad y teocracia.

Archivos principales: `data/ejes.json`, `src/engine/ideologia.ts`, `web/src/componentes/PerfilFacetas.tsx` y `data/items/democracia-instituciones.json`.

### 2.5. Banco exhaustivo y metodología

Estado validado al corte:

- **19 módulos**;
- **369 ítems**, de los que 355 están vigentes;
- 255 ítems con carga de faceta;
- 82 solo para matching;
- 10 seguimientos condicionales;
- 8 solo para mapa personal;
- 14 retirados y conservados para trazabilidad.

Se añadieron bloques de:

- democracia parlamentaria/directa, revocación, mandatos, jueces y contrapesos;
- poder laboral, cogestión, consejos, autonomía sindical y corporativismo;
- razones distintas para rechazar impuestos;
- nuclear civil, propiedad energética y modelo productivo;
- pacifismo, intervención, aislamiento, OTAN, armas nucleares, Sáhara e hipótesis ibérica;
- límites del pluralismo y uso de violencia, solo para mapa y nunca para recomendar grupos violentos.

La metodología distingue preguntas lineales, solo-matching y solo-mapa. La prioridad «me importa el doble» afecta a afinidad, no mueve artificialmente el perfil personal.

### 2.6. ETA, memoria y política vasca

El módulo vasco-navarro separa, sin inferir unas respuestas de otras:

- evaluación histórica de ETA;
- legitimidad o rechazo de la violencia;
- compromiso actual con vías pacíficas y democráticas;
- memoria y reparación específica de víctimas de ETA;
- reconocimiento de víctimas de vulneraciones cometidas por agentes del Estado;
- rechazo de la minimización o justificación;
- política penitenciaria y reinserción.

El soberanismo no genera automáticamente ninguna posición sobre ETA. EH Bildu conserva ausencia de dato donde su fuente no permite una calificación completa. Los ítems son exhaustivos y territoriales, no rápidos.

### 2.7. Territorio

Se han ampliado o mantenido bloques específicos para:

- Andalucía: deuda histórica con la cautela del acuerdo de 2010, financiación singular, andalucismo de izquierda/transversal y pertenencia cívica;
- Catalunya: vía pactada/unilateral, pluralismo tras una eventual independencia, lengua, cierre temporal de un proceso y diferencias derecha/izquierda mediante facetas cruzadas;
- Canarias: REF, insularidad, moratoria/ecotasa, turismo y diferencias entre partidos insularistas;
- Euskadi/Navarra: foralidad, euskera, memoria, violencia y estrategia democrática;
- Galicia: lengua, industria, litoral y soberanismo;
- León: autonomía de León-Zamora-Salamanca separada de independencia, provincialismo y bercianismo.

La arquitectura general distingue centralismo, autonomías, federalismo y confederalismo.

### 2.8. Partidos, coaliciones y conducta observada

- Hay **48 perfiles reales comparables** al último corte validado.
- Los perfiles tienen fuentes por posición, fecha de consulta y calidad de evidencia.
- Coalición, componente y partido se tratan como identidades distintas; una relación nunca hereda posiciones.
- PP y VOX tienen doble marcador:
  - programa o posición oficial;
  - conducta/declaraciones/votaciones recientes.
- La capa observada no rellena huecos con el programa.
- No se inventa un porcentaje global de «programa cumplido»; los compromisos se auditan ítem a ítem.
- La afirmación de que ACOM dirige VOX no se aceptó: se documenta como asociación externa sin evidencia suficiente de dirección orgánica.

### 2.9. Comunismo, anarquismo y referencias sin partido

- Se auditó un inventario de 51 organizaciones comunistas como fuente de descubrimiento, contrastando cada alta con fuentes primarias.
- Hay perfiles distintos para PCE, PCTE, PCPE, PCPC, PCOE, PCE(m-l), POSI, CRT, UCE, Recortes Cero, Comunistes, PSUC Viu, UPG y Nación Andaluza.
- Se corrigieron equivalencias falsas: POSI no es posadismo; UCE no es pensamiento Gonzalo; Recortes Cero no hereda toda la historia de UCE.
- Los grupos violentos, clandestinos, juveniles o no electorales no se convierten en «partidos recomendados».
- Hay cinco referencias doctrinales no electorales:
  - anarcocapitalismo rothbardiano;
  - anarcocomunismo;
  - anarcosindicalismo/sindicalismo revolucionario libertario;
  - anarquismo individualista;
  - mutualismo proudhoniano.
- Una referencia solo aparece al superar simultáneamente afinidad y cobertura; puede no aparecer ninguna.

### 2.10. Sindicatos

- Catálogo separado de **11 sindicatos**: no compiten en el ranking de partidos.
- La comparación usa únicamente preguntas laborales y exige cobertura mínima.
- La UI advierte que similitud doctrinal no acredita presencia en el centro de trabajo ni recomienda afiliación.

### 2.11. Universo electoral oficial

- Hay **20 convocatorias versionadas**: generales y la última elección disponible de las 17 comunidades y las dos ciudades autónomas.
- Se incluyen **312 candidaturas** con el umbral reproducible de `0,02 %` sobre votos a candidaturas.
- El denominador, total oficial, fecha, ámbito y fuente quedan en cada JSON.
- Se documentan agregaciones insulares/provinciales y variantes de papeleta.
- Catalunya, Euskadi, Navarra y Galicia usan denominadores corregidos a votos a candidaturas; Ongi Etorri, FNC contemporáneo y Convergents quedan fuera por no superar el corte y no cumplir una excepción autorizada.
- Falange y comunistas activos usan excepciones solo cuando la regla declarada lo permite; una marca histórica no obtiene una excepción automática.
- El resultado muestra un catálogo desplegable de candidaturas y distingue perfiles enlazados de candidaturas inventariadas todavía sin perfil doctrinal.

Archivos principales: `data/convocatorias/`, `src/engine/elecciones.ts`, `scripts/importar-resultados-generales.mjs`, `scripts/importar-candidaturas-autonomicas.mjs` y `web/src/componentes/CatalogoCandidaturas.tsx`.

### 2.12. Validación alcanzada

Última ejecución conjunta antes del relevo:

- validador de datos: correcto;
- TypeScript raíz: correcto;
- TypeScript frontend: correcto;
- Vitest: **38/38 pruebas**;
- build Vite 7: correcto;
- `git diff --check`: correcto.

El build mantiene un aviso no bloqueante: el chunk principal ronda 1 MB minificado porque banco, perfiles y convocatorias se cargan de forma eager.

## 3. Qué debe leer Fable primero

1. Este documento.
2. [`TODO-PENDIENTES.md`](./TODO-PENDIENTES.md).
3. [`METODOLOGIA.md`](./METODOLOGIA.md).
4. [`BANCO-ITEMS.md`](./BANCO-ITEMS.md).
5. Las investigaciones de `docs/investigacion/`, escogiendo solo la que corresponda a su tarea.

No debe rellenar una posición por «parecido ideológico». Un hueco documental es un resultado correcto.

## 4. Comandos de control

En un entorno normal con npm:

```bash
npm ci
npm --prefix web ci
npm run typecheck
npm test
npm run validate:data
npm run web:build
git diff --check
```

En el entorno actual también funcionan los binarios locales:

```bash
./node_modules/.bin/tsc --noEmit
./node_modules/.bin/vitest run
node scripts/validate-data.mjs
./web/node_modules/.bin/tsc --noEmit -p web/tsconfig.json
cd web && ./node_modules/.bin/vite build
```

## 5. Estrategia Git para casar las ramas

### Nombre propuesto

- Rama ya existente: `codex/frontend-exhaustivo-mapeo-politico`.
- Rama de Fable: `fable/turno-noche-cierre-espectro`.
- PR de Fable: **Turno de noche: pulido visual, PWA y cierre de perfiles prioritarios**.
- PR global posterior: **Espectro 1.0: frontend exhaustivo y catálogo político documentado**.

### Flujo recomendado

1. Subir y fijar primero el commit de esta rama.
2. Fable crea su rama **desde ese commit**, no desde `main`:

```bash
git fetch origin
git switch -c fable/turno-noche-cierre-espectro \
  origin/codex/frontend-exhaustivo-mapeo-politico
```

3. Si Fable trabaja en la misma máquina mientras esta rama sigue abierta, usar un worktree para no compartir índice ni rama activa:

```bash
git fetch origin
git worktree add ../espectro-fable \
  -b fable/turno-noche-cierre-espectro \
  origin/codex/frontend-exhaustivo-mapeo-politico
```

4. Fable hace commits pequeños por bloque: `frontend`, `PWA`, `perfiles`, `tests`.
5. Abre una PR cuya base sea `codex/frontend-exhaustivo-mapeo-politico`, no `main`.
6. Se valida y se integra esa PR en la rama Codex.
7. Solo después se abre o actualiza la PR global desde Codex hacia la rama de origen `claude/espectro-political-vaa-3d35l3` o hacia `main`, según decida el propietario.

Este encadenamiento deja una revisión limpia:

```text
fable/turno-noche-cierre-espectro
              ↓ PR de relevo
codex/frontend-exhaustivo-mapeo-politico
              ↓ PR global
rama de origen o main
```

No conviene que Fable mezcle directamente su rama con `main`: perderíamos la capacidad de revisar qué corresponde al relevo nocturno y qué pertenecía a esta fase.
