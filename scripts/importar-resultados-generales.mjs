#!/usr/bin/env node
/**
 * Convierte el ZIP TOTA oficial de Infoelectoral para el Congreso de julio
 * de 2023 en la convocatoria versionada que consume Espectro.
 *
 * Uso:
 *   node scripts/importar-resultados-generales.mjs /ruta/02202307_TOTA.zip
 *
 * El script no descarga nada: la URL y la fecha de consulta quedan en el
 * resultado, pero el ZIP se obtiene manualmente de la fuente oficial. Requiere
 * `unzip`, solo durante la regeneración; el frontend no lo usa.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const zip = process.argv[2];
const salida = process.argv[3] ?? join(raiz, 'data/convocatorias/congreso-2023-07.json');

if (!zip || !existsSync(zip)) {
  console.error('Uso: node scripts/importar-resultados-generales.mjs RUTA_TOTA.zip [SALIDA.json]');
  process.exit(1);
}

const decodificador = new TextDecoder('windows-1252');
const extraer = (nombre) => decodificador.decode(execFileSync('unzip', ['-p', zip, nombre]));
const lineas = (texto) => texto.trimEnd().split(/\r?\n/);
const limpiar = (texto) => texto.trim().replace(/\s+/g, ' ');
const slug = (texto) =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const CCAA = {
  '01': 'andalucia',
  '02': 'aragon',
  '03': 'asturias',
  '04': 'illes-balears',
  '05': 'canarias',
  '06': 'cantabria',
  '07': 'castilla-la-mancha',
  '08': 'castilla-y-leon',
  '09': 'catalunya',
  '10': 'extremadura',
  '11': 'galicia',
  '12': 'madrid',
  '13': 'navarra',
  '14': 'euskadi',
  '15': 'murcia',
  '16': 'la-rioja',
  '17': 'comunitat-valenciana',
  '18': 'ceuta',
  '19': 'melilla',
};

// Solo equivalencias de identidad comprobables. En particular, SUMAR 2023 no
// se convierte automáticamente en Movimiento Sumar ni transmite posiciones a
// los partidos que integraron la coalición.
const RELACIONES_POR_SIGLAS = {
  PP: [{ perfilId: 'pp', relacion: 'misma-organizacion' }],
  PSOE: [{ perfilId: 'psoe', relacion: 'misma-organizacion' }],
  VOX: [{ perfilId: 'vox', relacion: 'misma-organizacion' }],
  ERC: [{ perfilId: 'erc', relacion: 'misma-organizacion' }],
  'JxCAT - JUNTS': [{ perfilId: 'junts', relacion: 'misma-organizacion' }],
  'EH Bildu': [{ perfilId: 'eh-bildu', relacion: 'misma-organizacion' }],
  'EAJ-PNV': [{ perfilId: 'eaj-pnv', relacion: 'misma-organizacion' }],
  PACMA: [{ perfilId: 'pacma', relacion: 'misma-organizacion' }],
  'B.N.G.': [{ perfilId: 'bng', relacion: 'misma-organizacion' }],
  CCa: [{ perfilId: 'coalicion-canaria', relacion: 'misma-organizacion' }],
  'CUP-PR': [{ perfilId: 'cup', relacion: 'misma-organizacion' }],
  'U.P.N.': [{ perfilId: 'upn', relacion: 'misma-organizacion' }],
  'U.P.L.': [{ perfilId: 'upl', relacion: 'misma-organizacion' }],
  SY: [{ perfilId: 'soria-ya', relacion: 'misma-organizacion' }],
  XAV: [{ perfilId: 'por-avila', relacion: 'misma-organizacion' }],
  PCTE: [{ perfilId: 'pcte', relacion: 'misma-organizacion' }],
  'FE de las JONS': [{ perfilId: 'fe-jons', relacion: 'misma-organizacion' }],
  'AHORA CANARIAS-PCPC': [
    {
      perfilId: 'pcpc',
      relacion: 'componente',
      nota: 'El nombre oficial de la candidatura identifica al PCPC como componente; no se heredan posiciones de la coalición.',
    },
  ],
};

const EXCEPCIONES = {
  'FE de las JONS': 'historica-activa',
  'AHORA CANARIAS-PCPC': 'comunista-activa',
};

const candidaturas = new Map(
  lineas(extraer('03022307.DAT')).map((linea) => [
    linea.slice(8, 14),
    {
      codigo: linea.slice(8, 14),
      siglas: limpiar(linea.slice(14, 64)),
      nombre: limpiar(linea.slice(64, 214)),
      cabeceraProvincial: linea.slice(214, 220).trim(),
      cabeceraAutonomica: linea.slice(220, 226).trim(),
      cabeceraNacional: linea.slice(226, 232).trim(),
    },
  ]),
);

const resultados = lineas(extraer('08022307.DAT'));
const nacionales = resultados
  .filter(
    (linea) =>
      linea.slice(9, 11) === '99' &&
      linea.slice(11, 13) === '99' &&
      linea.slice(13, 14) === '9',
  )
  .map((linea) => ({
    codigo: linea.slice(14, 20),
    votos: Number(linea.slice(20, 28)),
    escanos: Number(linea.slice(28, 33)),
  }));

const denominador = nacionales.reduce((total, resultado) => total + resultado.votos, 0);
const territoriosPorCodigo = new Map();
for (const linea of resultados) {
  const codigoCcaa = linea.slice(9, 11);
  const codigoProvincia = linea.slice(11, 13);
  const codigoCandidatura = linea.slice(14, 20);
  const fichaCandidatura = candidaturas.get(codigoCandidatura);
  const codigoAcumulado = fichaCandidatura?.cabeceraNacional || codigoCandidatura;
  if (codigoCcaa === '99' || codigoProvincia === '99' || linea.slice(13, 14) !== '9') continue;
  if (Number(linea.slice(20, 28)) === 0) continue;
  const ccaa = CCAA[codigoCcaa];
  if (!ccaa) continue;
  const territorios = territoriosPorCodigo.get(codigoAcumulado) ?? new Set();
  territorios.add(ccaa);
  territoriosPorCodigo.set(codigoAcumulado, territorios);
}

const seleccionadas = nacionales
  .map((resultado) => ({ ...resultado, ...candidaturas.get(resultado.codigo) }))
  .filter((candidatura) => candidatura.nombre)
  .map((candidatura) => ({
    ...candidatura,
    porcentaje: (100 * candidatura.votos) / denominador,
  }))
  .filter(
    (candidatura) =>
      candidatura.porcentaje >= 0.02 || Object.hasOwn(EXCEPCIONES, candidatura.siglas),
  )
  .sort((a, b) => b.votos - a.votos)
  .map((candidatura) => {
    const perfilRelaciones = RELACIONES_POR_SIGLAS[candidatura.siglas] ?? [];
    return {
      id: `congreso-2023-07-${slug(candidatura.siglas || candidatura.nombre)}`,
      codigoOficial: candidatura.codigo,
      siglas: candidatura.siglas,
      nombre: candidatura.nombre,
      votos: candidatura.votos,
      porcentaje: Number(candidatura.porcentaje.toFixed(6)),
      escanos: candidatura.escanos,
      territorios: [...(territoriosPorCodigo.get(candidatura.codigo) ?? [])].sort(),
      motivoInclusion: EXCEPCIONES[candidatura.siglas] ?? 'umbral',
      perfilRelaciones,
    };
  });

const convocatoria = {
  id: 'congreso-2023-07',
  nombre: 'Elecciones generales al Congreso de los Diputados de julio de 2023',
  tipo: 'generales',
  fecha: '2023-07-23',
  territorio: 'espana',
  camara: 'Congreso de los Diputados',
  umbralPorcentaje: 0.02,
  denominador: {
    tipo: 'votos-a-candidaturas',
    valor: denominador,
  },
  totalCandidaturasOficiales: nacionales.length,
  fuente: {
    titulo: 'Base de datos de resultados electorales, fichero TOTA (Congreso 2023-07)',
    url: 'https://infoelectoral.interior.gob.es/estaticos/docxl/apliextr/02202307_TOTA.zip',
    fechaDatos: '2023-11-10',
    consultado: '2026-07-09',
  },
  candidaturas: seleccionadas,
};

mkdirSync(dirname(salida), { recursive: true });
writeFileSync(salida, `${JSON.stringify(convocatoria, null, 2)}\n`);
console.log(
  `Generada ${salida}: ${seleccionadas.length}/${nacionales.length} candidaturas; ` +
    `${denominador} votos a candidaturas.`,
);
