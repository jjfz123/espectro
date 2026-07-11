#!/usr/bin/env node

/**
 * Verifica el inventario nominal contra un manifiesto canónico independiente.
 * Sin opciones comprueba estructura e integridad; `--require-closed` exige
 * además todas las casillas cerradas y recibos automáticos para las entidades.
 */
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const rutaPropia = fileURLToPath(import.meta.url);
const leer = (ruta) => readFileSync(join(raiz, ruta), 'utf8');
const hash = (texto) => createHash('sha256').update(texto).digest('hex');

function seccion(documento, titulo) {
  const inicio = documento.indexOf(titulo);
  if (inicio < 0) return null;
  const contenido = documento.slice(inicio + titulo.length);
  const siguiente = contenido.search(/^## /mu);
  return siguiente < 0 ? contenido : contenido.slice(0, siguiente);
}

function duplicados(valores) {
  const vistos = new Set();
  const repetidos = new Set();
  for (const valor of valores) {
    if (vistos.has(valor)) repetidos.add(valor);
    vistos.add(valor);
  }
  return [...repetidos];
}

function compararExacto(nombre, esperados, actuales, errores) {
  const cuenta = (valores) => {
    const mapa = new Map();
    for (const valor of valores) mapa.set(valor, (mapa.get(valor) ?? 0) + 1);
    return mapa;
  };
  const a = cuenta(esperados);
  const b = cuenta(actuales);
  const faltan = [...a].filter(([valor, n]) => (b.get(valor) ?? 0) < n).map(([valor]) => valor);
  const sobran = [...b].filter(([valor, n]) => (a.get(valor) ?? 0) < n).map(([valor]) => valor);
  if (faltan.length) errores.push(`${nombre}: faltan ${faltan.join(', ')}`);
  if (sobran.length) errores.push(`${nombre}: sobran o se repiten ${sobran.join(', ')}`);
}

export function validarInventario({
  todo,
  todoCandidaturas = '',
  taxonomia,
  partidos,
  sindicatos = [],
  convocatorias = [],
  rapido = { ids: [], idsAmpliacion2026: [] },
  manifiesto,
  atlas,
  exigirCierre = false,
  gradosPartidos = new Map(),
}) {
  const errores = [];
  const tituloPartidos = `## Partidos (${manifiesto.partidos.total})`;
  const tituloSindicatos = `## Sindicatos (${manifiesto.sindicatos.total})`;
  const tituloIdeologias = `## Etiquetas de la imagen (${manifiesto.ideologiasImagen.total})`;
  const bloquePartidos = seccion(todo, tituloPartidos);
  const bloqueSindicatos = seccion(todo, tituloSindicatos);
  const bloqueIdeologias = seccion(todo, tituloIdeologias);
  const bloqueCriba = seccion(todo, '### Criba nominal de 30 regiones');
  const bloqueTaxonomia = seccion(
    taxonomia,
    '## 4. Inventario exhaustivo de etiquetas legibles de la imagen',
  );

  if (!bloquePartidos) errores.push(`falta la sección «${tituloPartidos}»`);
  if (!bloqueSindicatos) errores.push(`falta la sección «${tituloSindicatos}»`);
  if (!bloqueIdeologias) errores.push(`falta la sección «${tituloIdeologias}»`);
  if (!bloqueTaxonomia) errores.push('falta la sección canónica «## 4. Inventario exhaustivo»');
  if (!bloqueCriba) errores.push('falta la sección «### Criba nominal de 30 regiones»');

  for (const titulo of [
    '## Modos del cuestionario, continuidad y privacidad de la respuesta',
    '## Cobertura y neutralidad del instrumento',
    '## Resultado ideológico y explicación metodológica',
    '## Partidos, elecciones y doble lectura',
    '## Pluralidad territorial española',
    '## Calidad de producto, web, PWA y futura app',
    '## Proceso de cierre y publicación',
    '## Ranking y presentación de partidos',
    '## Investigación, fuentes y calibración',
    '## Compartir resultados y capturas',
    '## Utilidad española, fuentes y sustituciones del atlas',
    '## Rendimiento y entrega web/app',
  ]) {
    if (!seccion(todo, titulo)) errores.push(`falta la sección «${titulo}»`);
  }

  const partidosDatos = partidos
    .filter((partido) => !partido.demo)
    .map((partido) => ({
      id: partido.id,
      nombre: partido.nombre,
      confianza: partido.confianza,
      monotematico: partido.monotematico === true,
    }))
    .sort((a, b) => a.id.localeCompare(b.id, 'es'));
  const totalPosicionesPartidistas = partidos
    .filter((partido) => !partido.demo)
    .reduce(
      (total, partido) =>
        total +
        Object.keys(partido.posiciones ?? {}).length +
        Object.keys(partido.dobleLectura?.contraste?.posiciones ?? {}).length,
      0,
    );
  const totalPosicionesDeclarado = Number(
    (todo.match(/Las ([\d.]+) posiciones partidistas inventariadas/u)?.[1] ?? '').replaceAll(
      '.',
      '',
    ),
  );
  if (!Number.isFinite(totalPosicionesDeclarado) || totalPosicionesDeclarado <= 0) {
    errores.push('falta el total explícito de posiciones partidistas inventariadas');
  } else if (totalPosicionesPartidistas !== totalPosicionesDeclarado) {
    errores.push(
      `posiciones partidistas: ${totalPosicionesPartidistas}/${totalPosicionesDeclarado}; actualiza datos y contrato en la misma revisión`,
    );
  }
  const partidosTodo = [...(bloquePartidos ?? '').matchAll(
    /^- \[([ x])\] `([^`]+)` — (.*?)(?: _\(|$)/gmu,
  )].map((coincidencia) => ({
    cerrado: coincidencia[1] === 'x',
    id: coincidencia[2],
    nombre: coincidencia[3].trim(),
  }));
  const sindicatosDatos = sindicatos
    .map((sindicato) => ({ id: sindicato.id, nombre: sindicato.nombre }))
    .sort((a, b) => a.id.localeCompare(b.id, 'es'));
  const sindicatosTodo = [...(bloqueSindicatos ?? '').matchAll(
    /^- \[([ x])\] `([^`]+)` — (.*?)\.$/gmu,
  )].map((coincidencia) => ({
    cerrado: coincidencia[1] === 'x',
    id: coincidencia[2],
    nombre: coincidencia[3].trim(),
  }));
  const candidaturasDatos = convocatorias.flatMap((convocatoria) =>
    (convocatoria.candidaturas ?? []).map((candidatura) => ({
      convocatoriaId: convocatoria.id,
      id: candidatura.id,
      nombre: candidatura.nombre,
      motivoInclusion: candidatura.motivoInclusion,
    })),
  );
  const candidaturasTodo = [...todoCandidaturas.matchAll(
    /^- \[([ x])\] `([^|`]+)\|([^`]+)` — (.*?) — .* — .*; inclusión: ([^.]+)\.$/gmu,
  )].map((coincidencia) => ({
    cerrado: coincidencia[1] === 'x',
    convocatoriaId: coincidencia[2],
    id: coincidencia[3],
    nombre: coincidencia[4].trim(),
    motivoInclusion: coincidencia[5].trim(),
  }));
  const cribaTodo = [...(bloqueCriba ?? '').matchAll(/^- \[[ x]\] `([^`]+)`/gmu)].map(
    (coincidencia) => coincidencia[1],
  );
  const contratoFuncional = todo
    .split('\n')
    .filter((linea) => /^- \[[ x]\] /u.test(linea))
    .filter((linea) => !/^- \[[ x]\] `[^`]+` —/u.test(linea))
    .filter((linea) => !/^- \[[ x]\] \d{3}\. `/u.test(linea))
    .map((linea) => linea.replace(/^- \[[ x]\] /u, ''));

  const ideologiasTaxonomia = [...(bloqueTaxonomia ?? '').matchAll(
    /^\|\s*(\d+)\s*\|\s*`([^`]+)`\s*\|\s*(.*?)\s*\|\s*([A-F])\s*\|/gmu,
  )].map((coincidencia) => ({
    numero: Number(coincidencia[1]),
    etiqueta: coincidencia[2],
    normalizacion: coincidencia[3].trim(),
    decision: coincidencia[4],
  }));
  const ideologiasTodo = [...(bloqueIdeologias ?? '').matchAll(
    /^- \[([ x])\] (\d{3})\. `([^`]+)` → (.*?) _\(clasificación inicial ([A-F])\)_$/gmu,
  )].map((coincidencia) => ({
    cerrado: coincidencia[1] === 'x',
    numero: Number(coincidencia[2]),
    etiqueta: coincidencia[3],
    normalizacion: coincidencia[4].trim(),
    decision: coincidencia[5],
  }));

  const canonPartido = (partido) => `${partido.id}|${partido.nombre}`;
  const canonSindicato = (sindicato) => `${sindicato.id}|${sindicato.nombre}`;
  const canonCandidatura = (candidatura) =>
    `${candidatura.convocatoriaId}|${candidatura.id}|${candidatura.nombre}|${candidatura.motivoInclusion}`;
  const canonIdeologia = (ideologia) =>
    `${ideologia.numero}|${ideologia.etiqueta}|${ideologia.normalizacion}|${ideologia.decision}`;
  const canonPartidosDatos = partidosDatos.map(canonPartido);
  const canonPartidosTodo = [...partidosTodo]
    .sort((a, b) => a.id.localeCompare(b.id, 'es'))
    .map(canonPartido);
  const canonSindicatosDatos = sindicatosDatos.map(canonSindicato);
  const canonSindicatosTodo = [...sindicatosTodo]
    .sort((a, b) => a.id.localeCompare(b.id, 'es'))
    .map(canonSindicato);
  const canonCandidaturasDatos = candidaturasDatos.map(canonCandidatura);
  const canonCandidaturasTodo = candidaturasTodo.map(canonCandidatura);
  const canonIdeologiasTaxonomia = ideologiasTaxonomia.map(canonIdeologia);
  const canonIdeologiasTodo = ideologiasTodo.map(canonIdeologia);

  const comprobarTotal = (nombre, actual, esperado) => {
    if (actual !== esperado) errores.push(`${nombre}: ${actual}/${esperado} filas`);
  };
  comprobarTotal('partidos en datos', partidosDatos.length, manifiesto.partidos.total);
  comprobarTotal('partidos en TODO', partidosTodo.length, manifiesto.partidos.total);
  comprobarTotal('sindicatos en datos', sindicatosDatos.length, manifiesto.sindicatos.total);
  comprobarTotal('sindicatos en TODO', sindicatosTodo.length, manifiesto.sindicatos.total);
  comprobarTotal(
    'candidaturas en datos',
    candidaturasDatos.length,
    manifiesto.candidaturas.total,
  );
  comprobarTotal('ids del rápido', rapido.ids.length, manifiesto.rapido.total);
  comprobarTotal(
    'ids de ampliación rápida',
    rapido.idsAmpliacion2026.length,
    manifiesto.rapido.ampliacionTotal,
  );
  comprobarTotal('regiones de la criba', cribaTodo.length, manifiesto.cribaRegiones.total);
  comprobarTotal(
    'tareas del contrato funcional',
    contratoFuncional.length,
    manifiesto.contratoFuncional.total,
  );
  comprobarTotal(
    'candidaturas en TODO',
    candidaturasTodo.length,
    manifiesto.candidaturas.total,
  );
  comprobarTotal(
    'ideologías en taxonomía',
    ideologiasTaxonomia.length,
    manifiesto.ideologiasImagen.total,
  );
  comprobarTotal('ideologías en TODO', ideologiasTodo.length, manifiesto.ideologiasImagen.total);

  const idsPartidosDuplicados = duplicados(partidosDatos.map((partido) => partido.id));
  const idsTodoDuplicados = duplicados(partidosTodo.map((partido) => partido.id));
  const idsSindicatosDatosDuplicados = duplicados(sindicatosDatos.map((sindicato) => sindicato.id));
  const idsSindicatosTodoDuplicados = duplicados(sindicatosTodo.map((sindicato) => sindicato.id));
  const idsCandidaturasDatosDuplicados = duplicados(
    candidaturasDatos.map((candidatura) => `${candidatura.convocatoriaId}|${candidatura.id}`),
  );
  const idsCandidaturasTodoDuplicados = duplicados(
    candidaturasTodo.map((candidatura) => `${candidatura.convocatoriaId}|${candidatura.id}`),
  );
  const numerosTaxonomia = ideologiasTaxonomia.map((ideologia) => ideologia.numero);
  const numerosTodo = ideologiasTodo.map((ideologia) => ideologia.numero);
  const etiquetasTaxonomiaDuplicadas = duplicados(
    ideologiasTaxonomia.map((ideologia) => ideologia.etiqueta),
  );
  const etiquetasTodoDuplicadas = duplicados(ideologiasTodo.map((ideologia) => ideologia.etiqueta));
  if (idsPartidosDuplicados.length) errores.push(`partidos en datos duplicados: ${idsPartidosDuplicados}`);
  if (idsTodoDuplicados.length) errores.push(`partidos en TODO duplicados: ${idsTodoDuplicados}`);
  if (idsSindicatosDatosDuplicados.length) {
    errores.push(`sindicatos en datos duplicados: ${idsSindicatosDatosDuplicados}`);
  }
  if (idsSindicatosTodoDuplicados.length) {
    errores.push(`sindicatos en TODO duplicados: ${idsSindicatosTodoDuplicados}`);
  }
  if (idsCandidaturasDatosDuplicados.length) {
    errores.push(`candidaturas en datos duplicadas: ${idsCandidaturasDatosDuplicados}`);
  }
  if (idsCandidaturasTodoDuplicados.length) {
    errores.push(`candidaturas en TODO duplicadas: ${idsCandidaturasTodoDuplicados}`);
  }
  if (duplicados(rapido.ids).length) errores.push('ids duplicados en el rápido');
  if (duplicados(rapido.idsAmpliacion2026).length) {
    errores.push('ids duplicados en la ampliación rápida');
  }
  if (duplicados(cribaTodo).length) errores.push('regiones duplicadas en la criba nominal');
  if (duplicados(numerosTaxonomia).length) errores.push('ordinales duplicados en taxonomía');
  if (duplicados(numerosTodo).length) errores.push('ordinales duplicados en TODO');
  if (etiquetasTaxonomiaDuplicadas.length) errores.push('etiquetas duplicadas en taxonomía');
  if (etiquetasTodoDuplicadas.length) errores.push('etiquetas duplicadas en TODO');

  const consecutivos = Array.from(
    { length: manifiesto.ideologiasImagen.total },
    (_, indice) => indice + 1,
  );
  if (numerosTaxonomia.some((numero, indice) => numero !== consecutivos[indice])) {
    errores.push('la taxonomía no conserva ordinales consecutivos 1..178');
  }
  if (numerosTodo.some((numero, indice) => numero !== consecutivos[indice])) {
    errores.push('el TODO no conserva ordinales consecutivos 1..178');
  }

  compararExacto('partidos TODO/datos', canonPartidosDatos, canonPartidosTodo, errores);
  compararExacto('sindicatos TODO/datos', canonSindicatosDatos, canonSindicatosTodo, errores);
  compararExacto(
    'candidaturas TODO/datos',
    canonCandidaturasDatos,
    canonCandidaturasTodo,
    errores,
  );
  compararExacto(
    'ideologías TODO/taxonomía',
    canonIdeologiasTaxonomia,
    canonIdeologiasTodo,
    errores,
  );

  if (hash(canonPartidosDatos.join('\n')) !== manifiesto.partidos.sha256) {
    errores.push('los datos de partidos no coinciden con el manifiesto canónico independiente');
  }
  if (hash(canonPartidosTodo.join('\n')) !== manifiesto.partidos.sha256) {
    errores.push('el TODO de partidos no coincide con el manifiesto canónico independiente');
  }
  if (hash(canonSindicatosDatos.join('\n')) !== manifiesto.sindicatos.sha256) {
    errores.push('los datos de sindicatos no coinciden con el manifiesto canónico independiente');
  }
  if (hash(canonSindicatosTodo.join('\n')) !== manifiesto.sindicatos.sha256) {
    errores.push('el TODO de sindicatos no coincide con el manifiesto canónico independiente');
  }
  if (hash(canonCandidaturasDatos.join('\n')) !== manifiesto.candidaturas.sha256) {
    errores.push('los datos de candidaturas no coinciden con el manifiesto canónico independiente');
  }
  if (hash(canonCandidaturasTodo.join('\n')) !== manifiesto.candidaturas.sha256) {
    errores.push('el TODO de candidaturas no coincide con el manifiesto canónico independiente');
  }
  if (hash(rapido.ids.join('\n')) !== manifiesto.rapido.sha256) {
    errores.push('los 50 ids del rápido no coinciden con el manifiesto canónico independiente');
  }
  if (
    hash(rapido.idsAmpliacion2026.join('\n')) !== manifiesto.rapido.ampliacionSha256
  ) {
    errores.push('los 10 ids de ampliación rápida no coinciden con el manifiesto canónico');
  }
  if (
    rapido.ids.slice(-rapido.idsAmpliacion2026.length).join('\n') !==
    rapido.idsAmpliacion2026.join('\n')
  ) {
    errores.push('la ampliación rápida no ocupa las diez posiciones finales del recorrido');
  }
  if (hash(cribaTodo.join('\n')) !== manifiesto.cribaRegiones.sha256) {
    errores.push('la criba nominal de 30 regiones no coincide con el manifiesto canónico');
  }
  if (hash(contratoFuncional.join('\n')) !== manifiesto.contratoFuncional.sha256) {
    errores.push('las tareas del contrato funcional no coinciden con el manifiesto canónico');
  }
  if (hash(canonIdeologiasTaxonomia.join('\n')) !== manifiesto.ideologiasImagen.sha256) {
    errores.push('la taxonomía no coincide con el manifiesto canónico independiente');
  }
  if (hash(canonIdeologiasTodo.join('\n')) !== manifiesto.ideologiasImagen.sha256) {
    errores.push('el TODO ideológico no coincide con el manifiesto canónico independiente');
  }

  const corrientesPorEtiqueta = new Map(
    (atlas?.corrientes ?? []).map((corriente) => [corriente.etiquetaOriginal, corriente]),
  );
  const exclusionesPorEtiqueta = new Map(
    (atlas?.exclusiones ?? []).map((exclusion) => [exclusion.etiquetaOriginal, exclusion]),
  );
  for (const ideologia of ideologiasTodo.filter((fila) => fila.cerrado)) {
    const corriente = corrientesPorEtiqueta.get(ideologia.etiqueta);
    const exclusion = exclusionesPorEtiqueta.get(ideologia.etiqueta);
    if (!corriente && !exclusion) {
      errores.push(`ideología cerrada sin recibo en atlas/exclusiones: ${ideologia.etiqueta}`);
    } else if (
      corriente &&
      !corriente.referenciaId &&
      !(Array.isArray(corriente.fuentes) && corriente.fuentes.length > 0)
    ) {
      errores.push(`ideología cerrada sin fuente o referencia instrumentada: ${ideologia.etiqueta}`);
    }
  }
  for (const partido of partidosTodo.filter((fila) => fila.cerrado)) {
    const perfil = partidosDatos.find((candidato) => candidato.id === partido.id);
    const cierreHonestoSinMapa = perfil?.confianza === 'sin-datos' || perfil?.monotematico === true;
    if (gradosPartidos.get(partido.id) !== 'solida' && !cierreHonestoSinMapa) {
      errores.push(`partido cerrado sin auditoría sólida ni recibo honesto sin mapa: ${partido.id}`);
    }
  }

  const casillas = [
    ...todo.matchAll(/^- \[([ x])\] /gmu),
    ...todoCandidaturas.matchAll(/^- \[([ x])\] /gmu),
  ];
  const abiertas = casillas.filter((coincidencia) => coincidencia[1] === ' ').length;
  const cerradas = casillas.length - abiertas;
  if (exigirCierre && abiertas > 0) {
    errores.push(`cierre pendiente: ${abiertas} de ${casillas.length} casillas siguen abiertas`);
  }

  return {
    errores,
    resumen: {
      abiertas,
      cerradas,
      casillas: casillas.length,
      partidos: partidosTodo.length,
      sindicatos: sindicatosTodo.length,
      candidaturas: candidaturasTodo.length,
      ideologias: ideologiasTodo.length,
    },
  };
}

function cargarGradosPartidos() {
  try {
    const salida = execFileSync(
      process.execPath,
      [join(raiz, 'scripts/auditar-brujula-partidos.mjs'), '--all', '--json'],
      { encoding: 'utf8', maxBuffer: 5 * 1024 * 1024 },
    );
    const informe = JSON.parse(salida);
    return new Map(informe.resultados.map((resultado) => [resultado.id, resultado.grado]));
  } catch {
    return new Map();
  }
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(rutaPropia)) {
  const exigirCierre = process.argv.includes('--require-closed');
  const partidos = readdirSync(join(raiz, 'data/partidos'))
    .filter((fichero) => fichero.endsWith('.json') && !fichero.startsWith('_'))
    .map((fichero) => JSON.parse(leer(`data/partidos/${fichero}`)));
  const sindicatos = readdirSync(join(raiz, 'data/sindicatos'))
    .filter((fichero) => fichero.endsWith('.json') && !fichero.startsWith('_'))
    .map((fichero) => JSON.parse(leer(`data/sindicatos/${fichero}`)));
  const convocatorias = readdirSync(join(raiz, 'data/convocatorias'))
    .filter((fichero) => fichero.endsWith('.json') && !fichero.startsWith('_'))
    .sort()
    .map((fichero) => JSON.parse(leer(`data/convocatorias/${fichero}`)));
  const resultado = validarInventario({
    todo: leer('docs/TODO-MAPEO-EXHAUSTIVO.md'),
    todoCandidaturas: leer('docs/TODO-CANDIDATURAS.md'),
    taxonomia: leer('docs/investigacion/TAXONOMIA-MAPA-IDEOLOGIAS.md'),
    partidos,
    sindicatos,
    convocatorias,
    rapido: JSON.parse(leer('data/rapido.json')),
    manifiesto: JSON.parse(leer('data/inventario-canonico-mapeo.json')),
    atlas: JSON.parse(leer('data/mapa-ideologias.json')),
    exigirCierre,
    gradosPartidos: cargarGradosPartidos(),
  });

  if (resultado.errores.length) {
    console.error(
      `✗ TODO nominal ${exigirCierre ? 'sin cerrar' : 'inválido'}:\n- ${resultado.errores.join('\n- ')}`,
    );
    process.exitCode = 1;
  } else {
    const r = resultado.resumen;
    console.log(
      exigirCierre
        ? `✓ TODO nominal cerrado: ${r.cerradas}/${r.casillas} casillas; ${r.partidos} partidos, ${r.sindicatos} sindicatos, ${r.candidaturas} candidaturas y ${r.ideologias} rótulos.`
        : `✓ Inventario TODO íntegro: ${r.partidos} partidos, ${r.sindicatos} sindicatos, ${r.candidaturas} candidaturas y ${r.ideologias} rótulos; ${r.abiertas} casillas abiertas.`,
    );
  }
}
