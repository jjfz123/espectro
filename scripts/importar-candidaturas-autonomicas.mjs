#!/usr/bin/env node
/**
 * Convierte el bloque JSON normalizado de una investigación autonómica en
 * convocatorias versionadas para la aplicación.
 *
 * Uso:
 *   node scripts/importar-candidaturas-autonomicas.mjs RUTA.md [DIRECTORIO_SALIDA]
 *
 * La investigación conserva las identidades de candidatura y coalición. Las
 * relaciones con perfiles solo se añaden cuando existe una equivalencia
 * declarada aquí y el perfil está presente; nunca se heredan posiciones.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const entrada = process.argv[2];
const directorioSalida = process.argv[3] ?? join(raiz, 'data/convocatorias');

if (!entrada || !existsSync(entrada)) {
  console.error(
    'Uso: node scripts/importar-candidaturas-autonomicas.mjs RUTA.md [DIRECTORIO_SALIDA]',
  );
  process.exit(1);
}

const TERRITORIOS = {
  'AND-2026': { id: 'andalucia', nombre: 'Andalucía', camara: 'Parlamento de Andalucía' },
  'ARA-2026': { id: 'aragon', nombre: 'Aragón', camara: 'Cortes de Aragón' },
  'AST-2023': { id: 'asturias', nombre: 'Principado de Asturias', camara: 'Junta General del Principado de Asturias' },
  'CAN-2023': { id: 'canarias', nombre: 'Canarias', camara: 'Parlamento de Canarias' },
  'CNT-2023': { id: 'cantabria', nombre: 'Cantabria', camara: 'Parlamento de Cantabria' },
  'CYL-2026': { id: 'castilla-y-leon', nombre: 'Castilla y León', camara: 'Cortes de Castilla y León' },
  'EXT-2025': { id: 'extremadura', nombre: 'Extremadura', camara: 'Asamblea de Extremadura' },
  'BAL-2023': { id: 'illes-balears', nombre: 'Illes Balears', camara: 'Parlament de les Illes Balears' },
  'MAD-2023': { id: 'madrid', nombre: 'Comunidad de Madrid', camara: 'Asamblea de Madrid' },
  'CLM-2023': { id: 'castilla-la-mancha', nombre: 'Castilla-La Mancha', camara: 'Cortes de Castilla-La Mancha' },
  'MUR-2023': { id: 'murcia', nombre: 'Región de Murcia', camara: 'Asamblea Regional de Murcia' },
  'RIO-2023': { id: 'la-rioja', nombre: 'La Rioja', camara: 'Parlamento de La Rioja' },
  'VAL-2023': { id: 'comunitat-valenciana', nombre: 'Comunitat Valenciana', camara: 'Les Corts Valencianes' },
  'CEU-2023': { id: 'ceuta', nombre: 'Ceuta', camara: 'Asamblea de Ceuta' },
  'MEL-2023': { id: 'melilla', nombre: 'Melilla', camara: 'Asamblea de Melilla' },
  'CAT-2024': { id: 'catalunya', nombre: 'Catalunya', camara: 'Parlament de Catalunya' },
  'EUS-2024': { id: 'euskadi', nombre: 'Euskadi', camara: 'Parlamento Vasco' },
  'NAV-2023': { id: 'navarra', nombre: 'Navarra', camara: 'Parlamento de Navarra' },
  'GAL-2024': { id: 'galicia', nombre: 'Galicia', camara: 'Parlamento de Galicia' },
};

// Número total de candidaturas en la fuente, incluidas las que no alcanzaron
// el 0,02 %. No se deduce de las filas importadas porque estas ya están
// filtradas por el umbral de catálogo.
const TOTALES_OFICIALES = {
  'AND-2026': 27,
  'CYL-2026': 28,
  'EXT-2025': 11,
  'MAD-2023': 13,
  'CLM-2023': 14,
  'MUR-2023': 15,
  'RIO-2023': 10,
  'CAT-2024': 18,
  'EUS-2024': 14,
  'NAV-2023': 11,
  'GAL-2024': 11,
};

// Equivalencias de organización exactas, no de parecido ideológico.
const PERFILES_DIRECTOS = {
  'and-2026-pp': ['pp', 'misma-organizacion'],
  'and-2026-psoe-a': ['psoe', 'organizacion-territorial'],
  'and-2026-vox': ['vox', 'misma-organizacion'],
  'and-2026-pacma': ['pacma', 'misma-organizacion'],
  'and-2026-nacion-andaluza': ['nacion-andaluza', 'misma-organizacion'],
  'and-2026-pcte': ['pcte', 'misma-organizacion'],
  'and-2026-fe': ['fe-jons', 'misma-organizacion'],
  'cyl-2026-pp': ['pp', 'misma-organizacion'],
  'cyl-2026-psoe': ['psoe', 'misma-organizacion'],
  'cyl-2026-vox': ['vox', 'misma-organizacion'],
  'cyl-2026-upl': ['upl', 'misma-organizacion'],
  'cyl-2026-xav': ['por-avila', 'misma-organizacion'],
  'cyl-2026-soria-ya': ['soria-ya', 'misma-organizacion'],
  'cyl-2026-pacma': ['pacma', 'misma-organizacion'],
  'cyl-2026-cs': ['ciudadanos', 'misma-organizacion'],
  'cyl-2026-bierzo': ['coalicion-por-el-bierzo', 'misma-organizacion'],
  'cyl-2026-pcte': ['pcte', 'misma-organizacion'],
  'cyl-2026-fe': ['fe-jons', 'misma-organizacion'],
  'cyl-2026-prepal': ['prepal', 'misma-organizacion'],
  'ext-2025-pp': ['pp', 'misma-organizacion'],
  'ext-2025-psoe': ['psoe', 'misma-organizacion'],
  'ext-2025-vox': ['vox', 'misma-organizacion'],
  'ext-2025-pacma': ['pacma', 'misma-organizacion'],
  'ext-2025-cs': ['ciudadanos', 'misma-organizacion'],
  'mad-2023-pp': ['pp', 'misma-organizacion'],
  'mad-2023-psoe': ['psoe', 'misma-organizacion'],
  'mad-2023-vox': ['vox', 'misma-organizacion'],
  'mad-2023-cs': ['ciudadanos', 'misma-organizacion'],
  'mad-2023-pacma': ['pacma', 'misma-organizacion'],
  'mad-2023-pcte': ['pcte', 'misma-organizacion'],
  'mad-2023-fe': ['fe-jons', 'misma-organizacion'],
  'clm-2023-psoe': ['psoe', 'misma-organizacion'],
  'clm-2023-pp': ['pp', 'misma-organizacion'],
  'clm-2023-vox': ['vox', 'misma-organizacion'],
  'clm-2023-cs': ['ciudadanos', 'misma-organizacion'],
  'clm-2023-pacma': ['pacma', 'misma-organizacion'],
  'clm-2023-pcpe': ['pcpe', 'misma-organizacion'],
  'clm-2023-fe': ['fe-jons', 'misma-organizacion'],
  'mur-2023-pp': ['pp', 'misma-organizacion'],
  'mur-2023-psoe': ['psoe', 'misma-organizacion'],
  'mur-2023-vox': ['vox', 'misma-organizacion'],
  'mur-2023-cs': ['ciudadanos', 'misma-organizacion'],
  'mur-2023-pacma': ['pacma', 'misma-organizacion'],
  'mur-2023-pcpe': ['pcpe', 'misma-organizacion'],
  'mur-2023-fe': ['fe-jons', 'misma-organizacion'],
  'rio-2023-pp': ['pp', 'misma-organizacion'],
  'rio-2023-psoe': ['psoe', 'misma-organizacion'],
  'rio-2023-vox': ['vox', 'misma-organizacion'],
  'rio-2023-cs': ['ciudadanos', 'misma-organizacion'],
  'rio-2023-pacma': ['pacma', 'misma-organizacion'],
  'cat-2024-psc': ['psoe', 'organizacion-territorial'],
  'cat-2024-junts': ['junts', 'coalicion'],
  'cat-2024-erc': ['erc', 'misma-organizacion'],
  'cat-2024-pp': ['pp', 'misma-organizacion'],
  'cat-2024-vox': ['vox', 'misma-organizacion'],
  'cat-2024-cup-dt': ['cup', 'coalicion'],
  'cat-2024-pacma': ['pacma', 'misma-organizacion'],
  'cat-2024-cs': ['ciudadanos', 'misma-organizacion'],
  'cat-2024-pctc': ['pcte', 'organizacion-territorial'],
  'cat-2024-recortes-cero': ['recortes-cero', 'misma-organizacion'],
  'eus-2024-eaj-pnv': ['eaj-pnv', 'misma-organizacion'],
  'eus-2024-eh-bildu': ['eh-bildu', 'misma-organizacion'],
  'eus-2024-pse': ['psoe', 'organizacion-territorial'],
  'eus-2024-pp': ['pp', 'misma-organizacion'],
  'eus-2024-sumar': ['movimiento-sumar', 'organizacion-territorial'],
  'eus-2024-vox': ['vox', 'misma-organizacion'],
  'eus-2024-pacma': ['pacma', 'misma-organizacion'],
  'eus-2024-pcte': ['pcte', 'misma-organizacion'],
  'nav-2023-upn': ['upn', 'misma-organizacion'],
  'nav-2023-psn': ['psoe', 'organizacion-territorial'],
  'nav-2023-eh-bildu': ['eh-bildu', 'misma-organizacion'],
  'nav-2023-ppn': ['pp', 'organizacion-territorial'],
  'nav-2023-vox': ['vox', 'misma-organizacion'],
  'nav-2023-cs': ['ciudadanos', 'misma-organizacion'],
  'gal-2024-pp': ['pp', 'misma-organizacion'],
  'gal-2024-bng': ['bng', 'misma-organizacion'],
  'gal-2024-psdeg': ['psoe', 'organizacion-territorial'],
  'gal-2024-vox': ['vox', 'misma-organizacion'],
  'gal-2024-pacma': ['pacma', 'misma-organizacion'],
  'can-2023-coalicion-canaria': ['coalicion-canaria', 'misma-organizacion'],
};

const PERFILES_COMPONENTES = {
  'Alianza Verde': 'alianza-verde',
  'Movimiento Sumar': 'movimiento-sumar',
  'Más Madrid': 'mas-madrid',
  Podemos: 'podemos',
  'Recortes Cero': 'recortes-cero',
  'Verdes Equo': 'verdes-equo',
};

const COMPONENTES_POR_CANDIDATURA = {
  'ara-2026-izquierda-unida-movimiento-sumar': [
    ['Movimiento Sumar', 'movimiento-sumar'],
  ],
  'ara-2026-podemos-alianza-verde': [
    ['Podemos', 'podemos'],
    ['Alianza Verde', 'alianza-verde'],
  ],
  'ast-2023-convocatoria-por-asturies-iu-mas-pais-ias': [],
  'ast-2023-verdes-equo-asturias-asturies': [['Verdes Equo', 'verdes-equo']],
  'can-2023-unidas-si-podemos': [['Podemos', 'podemos']],
  'can-2023-drago-verdes-canarias': [['Verdes Equo Canarias', 'verdes-equo']],
  // El Partido Comunista del Pueblo Canario no tiene perfil propio; el id
  // pcpc pertenece al Partit Comunista del Poble de Catalunya y no debe usarse.
  'can-2023-ahora-canarias-partido-comunista-del-pueblo-cana': [],
  'cnt-2023-podemos-izquierda-unida': [['Podemos', 'podemos']],
  'cyl-2026-bierzo': [
    ['Partido de El Bierzo', 'partido-del-bierzo'],
    ['El Bierzo Existe', 'el-bierzo-existe'],
  ],
  'bal-2023-unidas-podemos': [['Podemos', 'podemos']],
  'bal-2023-progreso-en-verde-pacma': [['PACMA', 'pacma']],
  'bal-2023-sa-unio-de-formentera-pp-compromis': [['Partido Popular', 'pp']],
  'bal-2023-gent-per-formentera-partit-socialista-de-les-ill': [['PSIB-PSOE', 'psoe']],
  'val-2023-compromis-mes-iniciativa-verdsequo': [['VerdsEquo', 'verdes-equo']],
  'val-2023-unides-podem-esquerra-unida': [['Podem', 'podemos']],
  'cat-2024-comuns-sumar': [['Movimiento Sumar', 'movimiento-sumar']],
  'eus-2024-podemos-av': [
    ['Podemos', 'podemos'],
    ['Alianza Verde', 'alianza-verde'],
  ],
  'nav-2023-geroa-bai': [['EAJ-PNV de Navarra', 'eaj-pnv']],
  'nav-2023-contigo': [['Podemos Navarra', 'podemos']],
  'gal-2024-sumar': [['Movimiento Sumar', 'movimiento-sumar']],
  'gal-2024-podemos-av': [
    ['Podemos', 'podemos'],
    ['Alianza Verde', 'alianza-verde'],
  ],
};

const normalizarNombre = (nombre) =>
  nombre
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, ' ')
    .trim();

const PERFILES_POR_NOMBRE = new Map([
  ['PARTIDO POPULAR', ['pp', 'misma-organizacion']],
  ['PARTIDO POPULAR DE CANTABRIA', ['pp', 'organizacion-territorial']],
  ['PARTIDO SOCIALISTA OBRERO ESPANOL', ['psoe', 'misma-organizacion']],
  ['PARTIDO SOCIALISTA OBRERO ESPANOL DE ANDALUCIA', ['psoe', 'organizacion-territorial']],
  ['PARTIDO SOCIALISTA DE CANTABRIA PSOE', ['psoe', 'organizacion-territorial']],
  ['PARTIT SOCIALISTA DE LES ILLES BALEARS', ['psoe', 'organizacion-territorial']],
  ['VOX', ['vox', 'misma-organizacion']],
  ['CIUDADANOS PARTIDO DE LA CIUDADANIA', ['ciudadanos', 'misma-organizacion']],
  ['PARTIDO ANIMALISTA CON EL MEDIO AMBIENTE', ['pacma', 'misma-organizacion']],
  ['PARTIDO COMUNISTA DE LOS TRABAJADORES DE ESPANA', ['pcte', 'misma-organizacion']],
  ['PARTIDO COMUNISTA DE LOS PUEBLOS DE ESPANA', ['pcpe', 'misma-organizacion']],
  ['RECORTES CERO', ['recortes-cero', 'misma-organizacion']],
  ['NACION ANDALUZA', ['nacion-andaluza', 'misma-organizacion']],
  ['PODEMOS', ['podemos', 'misma-organizacion']],
  ['PODEMOS ASTURIES', ['podemos', 'organizacion-territorial']],
  ['VERDES EQUO', ['verdes-equo', 'misma-organizacion']],
  ['FALANGE ESPANOLA DE LAS JONS', ['fe-jons', 'misma-organizacion']],
]);

const texto = readFileSync(entrada, 'utf8');
const marcador = texto.lastIndexOf('```json');
const fin = texto.indexOf('```', marcador + 7);
if (marcador < 0 || fin < 0) {
  throw new Error(`${entrada}: no se encontró el bloque final \`\`\`json`);
}
const inventario = JSON.parse(texto.slice(marcador + 7, fin).trim());
if (!inventario.elecciones || !Array.isArray(inventario.candidaturas)) {
  throw new Error(`${entrada}: el bloque no tiene elecciones y candidaturas normalizadas`);
}

const idsPerfiles = new Set(
  readdirSync(join(raiz, 'data/partidos'))
    .filter((fichero) => fichero.endsWith('.json') && !fichero.startsWith('_'))
    .map((fichero) => JSON.parse(readFileSync(join(raiz, 'data/partidos', fichero), 'utf8')).id),
);

const relacionDirecta = (candidatura) => {
  const nombre = candidatura.nombrePapeleta ?? candidatura.nombreResultado ?? '';
  const equivalencia =
    PERFILES_DIRECTOS[candidatura.id] ?? PERFILES_POR_NOMBRE.get(normalizarNombre(nombre));
  if (!equivalencia || !idsPerfiles.has(equivalencia[0])) return [];
  const [perfilId, relacion] = equivalencia;
  return [
    {
      perfilId,
      relacion,
      ...(relacion === 'organizacion-territorial'
        ? {
            nota:
              'La candidatura corresponde a la organización territorial del perfil estatal; comparte identidad orgánica, no una matriz autonómica copiada.',
          }
        : {}),
    },
  ];
};

const relacionesComponentes = (candidatura) =>
  [
    ...(candidatura.componentes ?? []).map((componente) => [
      componente,
      PERFILES_COMPONENTES[componente],
    ]),
    ...(COMPONENTES_POR_CANDIDATURA[candidatura.id] ?? []),
  ]
    .filter(([, perfilId]) => perfilId && idsPerfiles.has(perfilId))
    .map(([componente, perfilId]) => ({
      perfilId,
      relacion: 'componente',
      nota: `${componente} figura como componente de esta candidatura fechada; sus posiciones no se atribuyen automáticamente a la coalición.`,
    }));

const nombreFichero = (territorio, fecha) => `${territorio}-${fecha.slice(0, 7)}.json`;
const formatearFecha = (fecha) =>
  new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${fecha}T00:00:00Z`));
const candidaturasPorEleccion = new Map();
for (const candidatura of inventario.candidaturas) {
  const grupo = candidaturasPorEleccion.get(candidatura.eleccion) ?? [];
  grupo.push(candidatura);
  candidaturasPorEleccion.set(candidatura.eleccion, grupo);
}

mkdirSync(directorioSalida, { recursive: true });
let total = 0;
for (const [codigo, eleccion] of Object.entries(inventario.elecciones)) {
  const territorio = TERRITORIOS[codigo];
  if (!territorio) throw new Error(`${entrada}: falta el territorio normalizado de ${codigo}`);
  const filas = candidaturasPorEleccion.get(codigo) ?? [];
  const totalOficial = TOTALES_OFICIALES[codigo] ?? eleccion.totalAgregados;
  if (!Number.isInteger(totalOficial) || totalOficial < filas.length) {
    throw new Error(`${entrada}: total oficial inválido o ausente para ${codigo}`);
  }
  const candidaturas = filas
    .map((candidatura) => {
      const perfilRelaciones = [
        ...relacionDirecta(candidatura),
        ...relacionesComponentes(candidatura),
      ].filter(
        (relacion, indice, todas) =>
          todas.findIndex((otra) => otra.perfilId === relacion.perfilId) === indice,
      );
      const circunscripciones = candidatura.circ?.includes('todas')
        ? undefined
        : candidatura.circ;
      const porcentaje = (100 * candidatura.votos) / eleccion.votosCandidaturas;
      return {
        id: candidatura.id,
        nombre: candidatura.nombrePapeleta ?? candidatura.nombreResultado,
        votos: candidatura.votos,
        porcentaje: Number(porcentaje.toFixed(6)),
        ...(Number.isInteger(candidatura.escanos) ? { escanos: candidatura.escanos } : {}),
        territorios: [territorio.id],
        ...(circunscripciones?.length ? { circunscripciones } : {}),
        ...(candidatura.nombresPapeletaPorCircunscripcion
          ? { variantesPapeleta: candidatura.nombresPapeletaPorCircunscripcion }
          : {}),
        motivoInclusion: 'umbral',
        perfilRelaciones,
        nota: [
          `Naturaleza inventariada: ${candidatura.tipo}.`,
          `Vigencia comprobada: ${candidatura.actividad}.`,
          `Tratamiento previsto: ${candidatura.destino}.`,
        ].join(' '),
      };
    })
    .sort((a, b) => b.votos - a.votos);

  const fuentesAdicionales = [
    ...(eleccion.fuenteIdentidad
      ? [
          {
            titulo: `Proclamación e identidad de candidaturas de ${territorio.nombre}`,
            url: eleccion.fuenteIdentidad,
            consultado: inventario.corte,
          },
        ]
      : []),
    ...(eleccion.fuenteCorreccion
      ? [
          {
            titulo: `Corrección oficial de resultados de ${territorio.nombre}`,
            url: eleccion.fuenteCorreccion,
            consultado: inventario.corte,
          },
        ]
      : []),
    ...(eleccion.fuenteEstatuto
      ? [
          {
            titulo: `Estatuto de Autonomía de ${territorio.nombre}`,
            url: eleccion.fuenteEstatuto,
            consultado: inventario.corte,
          },
        ]
      : []),
  ];
  const notas = [
    `El porcentaje usa como denominador ${eleccion.votosCandidaturas.toLocaleString('es-ES')} votos a candidaturas en toda la comunidad.`,
    'Una relación con un componente identifica la candidatura, pero no transfiere sus posiciones al perfil de la coalición.',
    `Naturaleza de la convocatoria en el inventario: ${eleccion.convocatoria}.`,
  ];
  if (eleccion.descuadreFilasVsDenominador) {
    notas.push(
      `La suma de filas publicada difiere del denominador oficial en ${eleccion.descuadreFilasVsDenominador} votos; se conserva el denominador declarado y se documenta el descuadre.`,
    );
  }

  const convocatoria = {
    id: `${territorio.id}-${eleccion.fecha.slice(0, 7)}`,
    nombre: `Elecciones autonómicas de ${territorio.nombre} del ${formatearFecha(eleccion.fecha)}`,
    tipo: 'autonomicas',
    fecha: eleccion.fecha,
    territorio: territorio.id,
    camara: territorio.camara,
    umbralPorcentaje: 0.02,
    denominador: {
      tipo: 'votos-a-candidaturas',
      valor: eleccion.votosCandidaturas,
    },
    totalCandidaturasOficiales: totalOficial,
    fuente: {
      titulo: `Resultados definitivos de las elecciones autonómicas de ${territorio.nombre}`,
      url: eleccion.fuenteResultado,
      consultado: inventario.corte,
    },
    ...(fuentesAdicionales.length ? { fuentesAdicionales } : {}),
    nota: notas.join(' '),
    candidaturas,
  };

  const salida = join(directorioSalida, nombreFichero(territorio.id, eleccion.fecha));
  writeFileSync(salida, `${JSON.stringify(convocatoria, null, 2)}\n`);
  total += candidaturas.length;
  console.log(
    `Generada ${basename(salida)}: ${candidaturas.length}/${convocatoria.totalCandidaturasOficiales} candidaturas incluidas.`,
  );
}

console.log(`Importadas ${total} candidaturas desde ${basename(entrada)}.`);
