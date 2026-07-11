// Audita el contexto electoral versionado: recorre todas las convocatorias de
// /data/convocatorias y los perfiles de /data/partidos y comprueba la
// coherencia territorial y relacional que el esquema JSON no puede expresar
// (contención autonómica, duplicidad votable, vías de aparición de un perfil).
//
// Distingue dos severidades:
//   - ERROR: incoherencia dura que rompe el contrato de los datos (exit 1).
//   - AVISO: discrepancia informativa que no bloquea (exit 0).
//
// Uso:
//   node scripts/auditar-contexto-electoral.mjs           salida humana
//   node scripts/auditar-contexto-electoral.mjs --json    informe estructurado
//   node scripts/auditar-contexto-electoral.mjs --check   sin salida; solo exit code
//
// El auditor solo lee: nunca escribe ni modifica ficheros, en ningún modo.
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

const argumentos = process.argv.slice(2);
const desconocidos = argumentos.filter((arg) => arg !== '--json' && arg !== '--check');
if (desconocidos.length > 0) {
  console.error(
    `✗ argumento(s) no reconocido(s): ${desconocidos.join(', ')}\n` +
      'Uso: node scripts/auditar-contexto-electoral.mjs [--json] [--check]',
  );
  process.exit(2);
}
const modoJson = argumentos.includes('--json');
const modoCheck = argumentos.includes('--check');

const errores = [];
const avisos = [];
const error = (codigo, donde, detalle) => errores.push({ codigo, donde, detalle });
const aviso = (codigo, donde, detalle) => avisos.push({ codigo, donde, detalle });

const leer = (ruta) => JSON.parse(readFileSync(join(raiz, ruta), 'utf8'));
const listarJson = (directorio) =>
  readdirSync(join(raiz, directorio))
    .filter((fichero) => fichero.endsWith('.json') && !fichero.startsWith('_'))
    .sort();

// Mismas comunidades y ciudades autónomas que scripts/validate-data.mjs.
const CCAA_VALIDAS = new Set([
  'andalucia', 'aragon', 'asturias', 'canarias', 'cantabria', 'castilla-la-mancha',
  'castilla-y-leon', 'catalunya', 'ceuta', 'comunitat-valenciana', 'euskadi',
  'extremadura', 'galicia', 'illes-balears', 'la-rioja', 'madrid', 'melilla',
  'murcia', 'navarra',
]);

// Vocabularios deducidos del esquema versionado de convocatorias (la misma
// fuente que valida los datos en CI), no inventados aquí. En los datos de hoy
// se observan los motivos umbral / historica-activa / comunista-activa y las
// relaciones misma-organizacion / organizacion-territorial / coalicion /
// componente; el esquema documenta además `sucesora`, todavía sin uso.
const esquemaConvocatoria = leer('data/schemas/convocatoria.schema.json');
const propiedadesCandidatura =
  esquemaConvocatoria?.properties?.candidaturas?.items?.properties ?? {};
const RELACIONES_VALIDAS = new Set(
  propiedadesCandidatura?.perfilRelaciones?.items?.properties?.relacion?.enum ?? [],
);
const MOTIVOS_VALIDOS = new Set(propiedadesCandidatura?.motivoInclusion?.enum ?? []);
if (RELACIONES_VALIDAS.size === 0 || MOTIVOS_VALIDOS.size === 0) {
  if (!modoCheck) {
    console.error(
      '✗ no se pudo deducir el vocabulario de relaciones o motivos del esquema ' +
        'data/schemas/convocatoria.schema.json; el auditor falla cerrado',
    );
  }
  process.exit(2);
}

// Relaciones que presentan un perfil como la identidad votable de la papeleta.
// Una relación `coalicion` también identifica la papeleta (el perfil ES la
// coalición); `componente` y `sucesora` solo identifican actores relacionados.
const RELACIONES_IDENTIDAD_VOTABLE = new Set(['misma-organizacion', 'organizacion-territorial']);

// 1. Catálogo de perfiles: solo se necesita identidad, ámbito y territorio.
const partidosPorId = new Map();
for (const fichero of listarJson('data/partidos')) {
  const perfil = leer(`data/partidos/${fichero}`);
  partidosPorId.set(perfil.id, perfil);
}

// 2. Convocatorias y candidaturas.
let nConvocatorias = 0;
let nAutonomicas = 0;
let nCandidaturas = 0;
const idsConvocatorias = new Map(); // id → primer fichero donde aparece
const idsCandidaturasGlobal = new Map(); // id → primera convocatoria donde aparece
const perfilesEnlazados = new Set();

for (const fichero of listarJson('data/convocatorias')) {
  const convocatoria = leer(`data/convocatorias/${fichero}`);
  const donde = `convocatorias/${fichero} (${convocatoria.id ?? '?'})`;
  nConvocatorias++;

  if (idsConvocatorias.has(convocatoria.id)) {
    error(
      'convocatoria-id-duplicado',
      donde,
      `id de convocatoria repetido; ya aparece en ${idsConvocatorias.get(convocatoria.id)}`,
    );
  } else {
    idsConvocatorias.set(convocatoria.id, fichero);
  }

  // Territorio de la convocatoria. Una autonómica sin comunidad no es un
  // hueco tolerable: el motor no podría contener la selección por territorio.
  const esAutonomica = convocatoria.tipo === 'autonomicas';
  const territorio = convocatoria.territorio;
  let comunidadValida = false;
  if (esAutonomica) {
    nAutonomicas++;
    if (!territorio || territorio === 'espana') {
      error('autonomica-sin-comunidad', donde, 'una convocatoria autonómica debe declarar su comunidad');
    } else if (!CCAA_VALIDAS.has(territorio)) {
      error('territorio-invalido', donde, `territorio inexistente: ${territorio}`);
    } else {
      comunidadValida = true;
    }
  } else if (territorio !== 'espana' && !CCAA_VALIDAS.has(territorio)) {
    error('territorio-invalido', donde, `territorio inexistente: ${territorio}`);
  }

  const idsCandidaturasLocal = new Set();
  const aparicionesPorPerfil = new Map(); // perfilId → [{ candidaturaId, relacion }]

  for (const candidatura of convocatoria.candidaturas ?? []) {
    nCandidaturas++;
    const dondeCandidatura = `${donde}, candidatura ${candidatura.id ?? '?'}`;

    if (idsCandidaturasLocal.has(candidatura.id)) {
      error('candidatura-id-duplicado', dondeCandidatura, 'id repetido dentro de la convocatoria');
    }
    idsCandidaturasLocal.add(candidatura.id);
    if (idsCandidaturasGlobal.has(candidatura.id)) {
      error(
        'candidatura-id-duplicado-global',
        dondeCandidatura,
        `id repetido en otra convocatoria: ${idsCandidaturasGlobal.get(candidatura.id)}`,
      );
    } else {
      idsCandidaturasGlobal.set(candidatura.id, convocatoria.id ?? fichero);
    }

    // Motivo de inclusión: presente y dentro del vocabulario documentado.
    if (!candidatura.motivoInclusion) {
      error('motivo-inclusion-ausente', dondeCandidatura, 'la candidatura no declara motivoInclusion');
    } else if (!MOTIVOS_VALIDOS.has(candidatura.motivoInclusion)) {
      error(
        'motivo-inclusion-desconocido',
        dondeCandidatura,
        `motivo fuera del vocabulario (${[...MOTIVOS_VALIDOS].join(', ')}): ${candidatura.motivoInclusion}`,
      );
    }

    // Territorios declarados por la candidatura: existentes y coherentes con
    // la convocatoria (en autonómicas, solo el de la propia convocatoria).
    for (const ccaa of candidatura.territorios ?? []) {
      if (!CCAA_VALIDAS.has(ccaa)) {
        error('candidatura-territorio-invalido', dondeCandidatura, `territorio inexistente: ${ccaa}`);
      } else if (comunidadValida && ccaa !== territorio) {
        error(
          'candidatura-territorio-incoherente',
          dondeCandidatura,
          `declara votos en ${ccaa}, ajeno a la convocatoria de ${territorio}`,
        );
      }
    }

    // Relaciones con perfiles.
    for (const relacion of candidatura.perfilRelaciones ?? []) {
      if (!RELACIONES_VALIDAS.has(relacion.relacion)) {
        error(
          'relacion-desconocida',
          dondeCandidatura,
          `relación fuera del vocabulario (${[...RELACIONES_VALIDAS].join(', ')}): ${relacion.relacion}`,
        );
      }
      const apariciones = aparicionesPorPerfil.get(relacion.perfilId) ?? [];
      apariciones.push({ candidaturaId: candidatura.id, relacion: relacion.relacion });
      aparicionesPorPerfil.set(relacion.perfilId, apariciones);
      perfilesEnlazados.add(relacion.perfilId);

      const perfil = partidosPorId.get(relacion.perfilId);
      if (!perfil) {
        error('perfil-inexistente', dondeCandidatura, `perfil de partido inexistente: ${relacion.perfilId}`);
        continue;
      }

      // Detección de foráneas: en una autonómica, una relación de identidad
      // votable no puede señalar un perfil declarado en OTRA comunidad. Un
      // perfil no estatal sin territorio declarado no permite comprobarlo:
      // se degrada a aviso en vez de inventar un ámbito.
      if (
        comunidadValida &&
        RELACIONES_IDENTIDAD_VOTABLE.has(relacion.relacion) &&
        perfil.ambito !== 'estatal'
      ) {
        const ccaaPerfil = Array.isArray(perfil.ccaa) ? perfil.ccaa : [];
        if (ccaaPerfil.length === 0) {
          aviso(
            'perfil-sin-territorio',
            dondeCandidatura,
            `el perfil ${relacion.perfilId} (ámbito ${perfil.ambito}) no declara territorio; la contención no es comprobable`,
          );
        } else if (!ccaaPerfil.includes(territorio)) {
          error(
            'candidatura-foranea',
            dondeCandidatura,
            `enlaza como votable el perfil ${relacion.perfilId}, declarado en ${ccaaPerfil.join(', ')}, ajeno a ${territorio}`,
          );
        }
      }
    }
  }

  // Comprobaciones por perfil dentro de la convocatoria.
  for (const [perfilId, apariciones] of aparicionesPorPerfil) {
    const candidaturasIdentidad = new Set(
      apariciones
        .filter((aparicion) => RELACIONES_IDENTIDAD_VOTABLE.has(aparicion.relacion))
        .map((aparicion) => aparicion.candidaturaId),
    );
    // Mismo perfil enlazado como identidad votable en dos candidaturas de la
    // misma convocatoria: una papeleta duplicada.
    if (candidaturasIdentidad.size > 1) {
      error(
        'perfil-votable-duplicado',
        donde,
        `el perfil ${perfilId} aparece como identidad votable en ${candidaturasIdentidad.size} candidaturas: ${[...candidaturasIdentidad].join(', ')}`,
      );
    }
    // Perfil cuya única vía de aparición es una relación `componente`: el
    // motor lo devolverá como perfil comparable sin papeleta propia. Es el
    // patrón deliberado de las coaliciones sin perfil paraguas, así que se
    // señala como aviso, no como error.
    if (
      apariciones.length > 0 &&
      apariciones.every((aparicion) => aparicion.relacion === 'componente')
    ) {
      aviso(
        'perfil-solo-componente',
        donde,
        `el perfil ${perfilId} solo aparece vía componente (${[...new Set(apariciones.map((aparicion) => aparicion.candidaturaId))].join(', ')}); será comparable sin papeleta propia`,
      );
    }
  }

  // Suma de comprobación: candidaturas oficiales declaradas frente a listadas.
  const listadas = convocatoria.candidaturas?.length ?? 0;
  if (
    typeof convocatoria.totalCandidaturasOficiales === 'number' &&
    convocatoria.totalCandidaturasOficiales !== listadas
  ) {
    aviso(
      'total-candidaturas-discrepante',
      donde,
      `candidaturas oficiales declaradas: ${convocatoria.totalCandidaturasOficiales}; incluidas en los datos: ${listadas} (diferencia ${convocatoria.totalCandidaturasOficiales - listadas})`,
    );
  }
}

// 3. Informe.
const informe = {
  resumen: {
    convocatorias: nConvocatorias,
    autonomicas: nAutonomicas,
    candidaturas: nCandidaturas,
    perfilesEnlazados: perfilesEnlazados.size,
    perfilesEnCatalogo: partidosPorId.size,
    errores: errores.length,
    avisos: avisos.length,
  },
  vocabulario: {
    relaciones: [...RELACIONES_VALIDAS],
    relacionesIdentidadVotable: [...RELACIONES_IDENTIDAD_VOTABLE],
    motivosInclusion: [...MOTIVOS_VALIDOS],
  },
  errores,
  avisos,
};

if (!modoCheck) {
  if (modoJson) {
    console.log(JSON.stringify(informe, null, 2));
  } else {
    const linea = ({ codigo, donde, detalle }) => `- ${donde}: [${codigo}] ${detalle}`;
    if (errores.length > 0) {
      console.error(`✗ ${errores.length} error(es) de contexto electoral:\n${errores.map(linea).join('\n')}`);
    }
    if (avisos.length > 0) {
      console.warn(`⚠ ${avisos.length} aviso(s) (no bloquean):\n${avisos.map(linea).join('\n')}`);
    }
    if (errores.length === 0) {
      console.log(
        `✓ Contexto electoral coherente: ${nConvocatorias} convocatorias (${nAutonomicas} autonómicas), ` +
          `${nCandidaturas} candidaturas, ${perfilesEnlazados.size} perfiles enlazados sobre ${partidosPorId.size} en catálogo; ` +
          `${avisos.length} aviso(s).`,
      );
    }
  }
}

process.exit(errores.length > 0 ? 1 : 0);
