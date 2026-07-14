#!/usr/bin/env node
import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const raiz = resolve(import.meta.dirname, '..');
const leer = (ruta) => JSON.parse(readFileSync(join(raiz, ruta), 'utf8'));
const fallos = [];
const fallo = (mensaje) => fallos.push(mensaje);

const registro = leer('data/brujula-partidos.json');
const evidenciaRegistro = leer('data/brujula-partidos-anclas.json');
const partidos = readdirSync(join(raiz, 'data/partidos'))
  .filter((nombre) => nombre.endsWith('.json') && !nombre.startsWith('_'))
  .map((nombre) => leer(`data/partidos/${nombre}`))
  .filter((partido) => partido.actividad === 'activa' && !partido.demo);
const porId = new Map(partidos.map((partido) => [partido.id, partido]));
const entradas =
  registro.partidos && typeof registro.partidos === 'object' && !Array.isArray(registro.partidos)
    ? Object.entries(registro.partidos)
    : [];
const evidencias =
  evidenciaRegistro.partidos &&
  typeof evidenciaRegistro.partidos === 'object' &&
  !Array.isArray(evidenciaRegistro.partidos)
    ? evidenciaRegistro.partidos
    : {};
const formatoEsperado = ['x', 'y', 'incertidumbreX', 'incertidumbreY', 'criterio'];
const formatoEvidencia = ['anclasX', 'anclasY', 'anclasGenerales', 'usaAutodescripcion'];
const criterios = {
  D: 'síntesis-documental',
  P: 'síntesis-documental-parcial',
  M: 'programa-monotemático',
};

if (registro.version !== '3') fallo('version debe ser «3»');
if (evidenciaRegistro.version !== '1') fallo('la versión de anclas debe ser «1»');
if (!/^\d{4}-\d{2}-\d{2}$/.test(registro.fechaCorte ?? '')) {
  fallo('fechaCorte debe estar en formato AAAA-MM-DD');
}
if (evidenciaRegistro.fechaCorte !== registro.fechaCorte) {
  fallo('las coordenadas y las anclas deben compartir fechaCorte');
}
if (JSON.stringify(registro.metodologia?.formatoEntrada) !== JSON.stringify(formatoEsperado)) {
  fallo('metodologia.formatoEntrada no coincide con el contrato compacto v3');
}
if (JSON.stringify(evidenciaRegistro.formatoEntrada) !== JSON.stringify(formatoEvidencia)) {
  fallo('formatoEntrada de anclas no coincide con su contrato v1');
}
if (entradas.length !== partidos.length) {
  fallo(`el registro contiene ${entradas.length} entradas y el catálogo activo ${partidos.length}`);
}
if (Object.keys(evidencias).length !== partidos.length) {
  fallo(`el registro de anclas contiene ${Object.keys(evidencias).length} entradas y el catálogo activo ${partidos.length}`);
}

for (const [id, entrada] of entradas) {
  const prefijo = `${id}: `;
  const partido = porId.get(id);
  if (!partido) {
    fallo(`${prefijo}no corresponde a un partido activo`);
    continue;
  }
  if (!Array.isArray(entrada) || entrada.length !== formatoEsperado.length) {
    fallo(`${prefijo}la coordenada debe tener ${formatoEsperado.length} campos en el orden declarado`);
    continue;
  }
  const [x, y, incertidumbreX, incertidumbreY, codigoCriterio] = entrada;
  const evidencia = evidencias[id];
  if (!Array.isArray(evidencia) || evidencia.length !== formatoEvidencia.length) {
    fallo(`${prefijo}la evidencia debe tener ${formatoEvidencia.length} campos en el orden declarado`);
    continue;
  }
  const [anclasX, anclasY, anclasGenerales, usaAutodescripcion] = evidencia;

  for (const [eje, valor] of [['x', x], ['y', y]]) {
    if (typeof valor !== 'number' || !Number.isFinite(valor)) {
      fallo(`${prefijo}${eje} no es un número finito`);
    } else if (Math.abs(valor) > 80) {
      fallo(`${prefijo}${eje}=${valor} rebasa el rango editorial de partidos [-80, 80]`);
    }
  }
  for (const [campo, valor] of [
    ['incertidumbreX', incertidumbreX],
    ['incertidumbreY', incertidumbreY],
  ]) {
    if (!Number.isInteger(valor) || valor < 5 || valor > 100) {
      fallo(`${prefijo}${campo} debe ser un entero entre 5 y 100`);
    }
  }
  if (!(codigoCriterio in criterios)) fallo(`${prefijo}criterio desconocido: ${codigoCriterio}`);
  if (typeof usaAutodescripcion !== 'boolean') {
    fallo(`${prefijo}usaAutodescripcion debe ser booleano`);
  }

  const posiciones = partido.posiciones ?? {};
  const listasAnclas = { anclasX, anclasY, anclasGenerales };
  for (const [campo, anclas] of Object.entries(listasAnclas)) {
    if (!Array.isArray(anclas)) {
      fallo(`${prefijo}${campo} debe ser una lista`);
      continue;
    }
    if (anclas.length > 3) fallo(`${prefijo}${campo} supera el máximo de 3 anclas de síntesis`);
    if (new Set(anclas).size !== anclas.length) fallo(`${prefijo}${campo} contiene anclas duplicadas`);
    for (const itemId of anclas) {
      const posicion = posiciones[itemId];
      if (!posicion) {
        fallo(`${prefijo}ancla inexistente en el perfil: ${itemId}`);
        continue;
      }
      const fuente = posicion.fuente ?? {};
      if (!fuente.url || !fuente.titulo || !fuente.consultado) {
        fallo(`${prefijo}ancla sin fuente completa: ${itemId}`);
      }
    }
  }
  const todasLasAnclas = [...(anclasX ?? []), ...(anclasY ?? []), ...(anclasGenerales ?? [])];
  if (todasLasAnclas.length === 0 && !usaAutodescripcion) {
    fallo(`${prefijo}sin ancla documental ni autodescripción atribuida`);
  }
  if (usaAutodescripcion) {
    const fuente = partido.autodescripcion?.fuente;
    if (!fuente?.url || !fuente?.titulo) {
      fallo(`${prefijo}declara autodescripción pero el perfil no aporta fuente`);
    }
  }
  if (partido.monotematico && codigoCriterio !== 'M') {
    fallo(`${prefijo}un perfil monotemático debe declararse como tal en el registro`);
  }
}

for (const partido of partidos) {
  if (!Object.hasOwn(registro.partidos ?? {}, partido.id)) {
    fallo(`${partido.id}: partido activo ausente del registro`);
  }
  if (!Object.hasOwn(evidencias, partido.id)) {
    fallo(`${partido.id}: partido activo ausente del registro de anclas`);
  }
}

if (fallos.length) {
  console.error(`Brújula de partidos inválida (${fallos.length} fallos):`);
  for (const mensaje of fallos) console.error(`- ${mensaje}`);
  process.exit(1);
}

const coordenadas = entradas.map(([, entrada]) => ({ x: entrada[0], y: entrada[1] }));
const minX = Math.min(...coordenadas.map((entrada) => entrada.x));
const maxX = Math.max(...coordenadas.map((entrada) => entrada.x));
const minY = Math.min(...coordenadas.map((entrada) => entrada.y));
const maxY = Math.max(...coordenadas.map((entrada) => entrada.y));
console.log(
  `Brújula de partidos válida: ${entradas.length}/${partidos.length} activos; ` +
    `X ${minX}…${maxX}; Y ${minY}…${maxY}; sin coordenadas ±100.`,
);
