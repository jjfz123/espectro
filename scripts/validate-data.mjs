// Valida todos los datos de /data contra los esquemas y comprueba la
// integridad referencial (ítems → módulos/ejes, posiciones → ítems).
// Uso: npm run validate:data   (falla con exit 1 si hay errores)
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const leer = (ruta) => JSON.parse(readFileSync(join(raiz, ruta), 'utf8'));

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validaEje = ajv.compile(leer('data/schemas/eje.schema.json'));
const validaModulo = ajv.compile(leer('data/schemas/modulo.schema.json'));
const validaItem = ajv.compile(leer('data/schemas/item.schema.json'));
const validaPartido = ajv.compile(leer('data/schemas/partido.schema.json'));
const validaTermino = ajv.compile(leer('data/schemas/termino.schema.json'));

const errores = [];
const fallo = (donde, detalle) => errores.push(`- ${donde}: ${detalle}`);
const ajvErrores = (v) =>
  (v.errors ?? []).map((e) => `${e.instancePath || '/'} ${e.message}`).join('; ');

// 1. Ejes
const ejes = leer('data/ejes.json');
for (const eje of ejes) {
  if (!validaEje(eje)) fallo(`ejes.json (${eje.id ?? '?'})`, ajvErrores(validaEje));
}
const idsEjes = new Set(ejes.map((e) => e.id));

// 2. Módulos
const modulos = leer('data/modulos.json');
for (const m of modulos) {
  if (!validaModulo(m)) fallo(`modulos.json (${m.id ?? '?'})`, ajvErrores(validaModulo));
  if (m.desbloqueo?.tipo === 'eje' && !idsEjes.has(m.desbloqueo.eje)) {
    fallo(`modulos.json (${m.id})`, `desbloqueo referencia un eje inexistente: ${m.desbloqueo.eje}`);
  }
}
const idsModulos = new Set(modulos.map((m) => m.id));

// 3. Glosario
const terminos = leer('data/glosario.json');
const idsTerminos = new Set();
for (const t of terminos) {
  const donde = `glosario.json (${t.id ?? '?'})`;
  if (!validaTermino(t)) fallo(donde, ajvErrores(validaTermino));
  if (idsTerminos.has(t.id)) fallo(donde, 'id duplicado');
  idsTerminos.add(t.id);
}

// 4. Ítems
const idsItems = new Set();
const terminosUsados = new Set();
for (const fichero of readdirSync(join(raiz, 'data/items'))) {
  if (!fichero.endsWith('.json')) continue;
  const items = leer(`data/items/${fichero}`);
  for (const item of items) {
    const donde = `items/${fichero} (${item.id ?? '?'})`;
    if (!validaItem(item)) fallo(donde, ajvErrores(validaItem));
    if (idsItems.has(item.id)) fallo(donde, 'id duplicado');
    idsItems.add(item.id);
    if (!idsModulos.has(item.modulo)) fallo(donde, `módulo inexistente: ${item.modulo}`);
    for (const c of item.ejes ?? []) {
      if (!idsEjes.has(c.eje)) fallo(donde, `eje inexistente: ${c.eje}`);
    }
    for (const t of item.terminos ?? []) {
      if (!idsTerminos.has(t)) fallo(donde, `término de glosario inexistente: ${t}`);
      terminosUsados.add(t);
    }
  }
}
for (const t of idsTerminos) {
  if (!terminosUsados.has(t)) fallo(`glosario.json (${t})`, 'término sin ningún ítem que lo use');
}

// 5. Partidos (los ficheros que empiezan por "_" son plantillas y se omiten)
let nPartidos = 0;
for (const fichero of readdirSync(join(raiz, 'data/partidos'))) {
  if (!fichero.endsWith('.json') || fichero.startsWith('_')) continue;
  nPartidos++;
  const p = leer(`data/partidos/${fichero}`);
  const donde = `partidos/${fichero} (${p.id ?? '?'})`;
  if (!validaPartido(p)) fallo(donde, ajvErrores(validaPartido));
  for (const itemId of Object.keys(p.posiciones ?? {})) {
    if (!idsItems.has(itemId)) fallo(donde, `posición sobre ítem inexistente: ${itemId}`);
  }
  if (p.confianza === 'verificada') {
    for (const [itemId, pos] of Object.entries(p.posiciones ?? {})) {
      if (!pos.fuente?.cita && !pos.justificacion) {
        fallo(donde, `posición «verificada» sin cita ni justificación: ${itemId}`);
      }
    }
  }
}

if (errores.length > 0) {
  console.error(`✗ ${errores.length} error(es) de validación:\n${errores.join('\n')}`);
  process.exit(1);
}
console.log(
  `✓ Datos válidos: ${ejes.length} ejes, ${modulos.length} módulos, ${idsItems.size} ítems, ${terminos.length} términos de glosario, ${nPartidos} partidos.`,
);
