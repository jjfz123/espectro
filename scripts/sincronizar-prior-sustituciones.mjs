#!/usr/bin/env node

/**
 * Conserva el prior real de los quince rótulos sustituidos y documenta los
 * desplazamientos grandes. Trabaja línea a línea para no reformatear el atlas.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const ruta = join(raiz, 'data/mapa-ideologias.json');
const rutaTaxonomia = join(raiz, 'docs/investigacion/TAXONOMIA-MAPA-IDEOLOGIAS.md');
const etiquetasIndependientes = {
  'liberalismo-igualitario-rawlsiano': 'Liberalismo igualitario rawlsiano',
  'conservadurismo-canovista-restauracion': 'Conservadurismo canovista de la Restauración',
  deleonismo: 'Deleonismo',
  'regeneracionismo-costista-joaquin-costa': 'Regeneracionismo costista de Joaquín Costa',
  'desarrollismo-tecnocratico-franquista-1957-1973': 'Desarrollismo tecnocrático franquista (1957–1973)',
  'corporativismo-social-catolico': 'Corporativismo social católico español',
  'socialismo-humanista-democratico-fernando-de-los-rios': 'Socialismo humanista democrático de Fernando de los Ríos',
  'salazarismo-estado-novo-portugues': 'Salazarismo del Estado Novo portugués',
  'integrismo-catolico-espanol-nocedal': 'Integrismo católico español de Nocedal',
  'catolicismo-politico-cedista-1933': 'Catolicismo político cedista (1933)',
  'maurrasismo-nacionalismo-integral-recepcion-espanola': 'Maurrasismo y nacionalismo integral en España',
  'neocatolicismo-espanol-isabelino': 'Neocatolicismo español isabelino',
  'republicanismo-radical-socialista-espanol': 'Republicanismo radical-socialista español',
  'regeneracionismo-autoritario-primorriverista': 'Regeneracionismo autoritario primorriverista',
  'anarquismo-sin-adjetivos': 'Anarquismo sin adjetivos',
};

const inventarioOriginal = new Map();
for (const linea of readFileSync(rutaTaxonomia, 'utf8').split('\n')) {
  const match = linea.match(
    /^\|\s*(\d+)\s*\|\s*`([^`]+)`\s*\|\s*([^|]+?)\s*\|\s*([A-F])\s*\|/u,
  );
  if (!match) continue;
  inventarioOriginal.set(match[2], {
    numeroOriginal: Number(match[1]),
    decisionOriginal: match[4],
  });
}
const justificaciones = {
  'liberalismo-igualitario-rawlsiano': 'No hereda el extremo de mercado del rótulo distributista-libertario: combina propiedad privada con instituciones redistributivas y libertades iguales, por lo que se ancla cerca del centro económico y en poder distribuido.',
  'conservadurismo-canovista-restauracion': 'Se separa del hamiltonianismo estadounidense original y se sitúa como conservadurismo liberal español de orden, monarquía constitucional y parlamentarismo restringido, no como máximo estatismo económico.',
  deleonismo: 'No hereda la autoridad del pensamiento Ho Chi Minh: la centralidad del sindicato industrial y la administración obrera lo desplazan hacia propiedad social y poder más distribuido que un partido-Estado.',
  'desarrollismo-tecnocratico-franquista-1957-1973': 'El fordismo ocupaba una esquina capitalista-autoritaria; el desarrollismo franquista conserva concentración política, pero combina mercado, planificación indicativa, empresas públicas e intervención estatal y por eso no queda en el máximo de propiedad privada.',
  'socialismo-humanista-democratico-fernando-de-los-rios': 'No hereda el autoritarismo del mugabismo sustituido: socialismo humanista, parlamentarismo y libertades desplazan el ancla hacia propiedad social y poder democrático.',
  'neocatolicismo-espanol-isabelino': 'No hereda el orden económico feudal: se trata como tradición político-religiosa conservadora del siglo XIX, con autoridad alta pero sin atribuirle servidumbre ni una economía feudal integral.',
  'republicanismo-radical-socialista-espanol': 'No hereda el populismo autoritario de Huey Long: republicanismo, laicismo y reforma social parlamentaria desplazan el ancla hacia la izquierda democrática.',
  'regeneracionismo-autoritario-primorriverista': 'No hereda la esquina kraterocrática: mantiene una vertical fuertemente autoritaria, pero el intervencionismo y corporativismo estatal impiden situarlo en el máximo de propiedad privada.',
};
const revisionesDobles = {
  'socialismo-humanista-democratico-fernando-de-los-rios': 'Revisión adversarial e integración raíz del 11 de julio de 2026: el desplazamiento no conserva el hueco de Mugabe, porque hacerlo atribuiría autoritarismo a una tradición socialista humanista y parlamentaria. La región sigue pendiente de evidencia publicable; esta revisión solo valida que no herede la casilla sustituida.',
  'regeneracionismo-autoritario-primorriverista': 'Revisión adversarial e integración raíz del 11 de julio de 2026: se mantiene alta concentración de poder, pero se rechaza heredar el máximo propietario de Kraterocracy por el corporativismo e intervencionismo del régimen. La región sigue pendiente de evidencia publicable; esta revisión solo valida el desplazamiento.',
};

const lineas = readFileSync(ruta, 'utf8').split('\n');
let actualizadas = 0;
for (let indice = 0; indice < lineas.length; indice += 1) {
  const linea = lineas[indice];
  if (!linea.includes('"trazabilidadOriginal"')) continue;
  const sangria = linea.match(/^\s*/u)?.[0] ?? '';
  const coma = linea.trimEnd().endsWith(',');
  const objeto = JSON.parse(linea.trim().replace(/,$/u, ''));
  const prior = objeto.trazabilidadOriginal?.coordenadasOriginales;
  if (!prior) continue;
  const etiquetaOriginal =
    objeto.trazabilidadOriginal.etiquetaOriginal ?? objeto.etiquetaOriginal;
  const filaOriginal = inventarioOriginal.get(etiquetaOriginal);
  if (!filaOriginal) {
    throw new Error(`No se encontró «${etiquetaOriginal}» en el inventario original.`);
  }
  objeto.trazabilidadOriginal = {
    ...objeto.trazabilidadOriginal,
    etiquetaOriginal,
    ...filaOriginal,
  };
  const etiquetaIndependiente = etiquetasIndependientes[objeto.id];
  if (!etiquetaIndependiente) {
    throw new Error(`Falta etiqueta técnica independiente para ${objeto.id}.`);
  }
  objeto.etiquetaOriginal = etiquetaIndependiente;
  objeto.coordenadasPrior = { ...prior };
  const distancia = Math.hypot(
    objeto.coordenadas.x - prior.x,
    objeto.coordenadas.y - prior.y,
  );
  if (distancia > 25) {
    const motivo = justificaciones[objeto.id];
    if (!motivo) throw new Error(`Falta justificación editorial para ${objeto.id}.`);
    objeto.desviacionJustificada = motivo;
  }
  if (distancia > 60) {
    const revision = revisionesDobles[objeto.id];
    if (!revision) throw new Error(`Falta revisión editorial doble para ${objeto.id}.`);
    objeto.revisionEditorialDoble = revision;
  }
  lineas[indice] = `${sangria}${JSON.stringify(objeto)}${coma ? ',' : ''}`;
  actualizadas += 1;
}

if (actualizadas !== 15) {
  throw new Error(`Se esperaban 15 sustituciones y se encontraron ${actualizadas}.`);
}
writeFileSync(ruta, lineas.join('\n'));
console.log(`✓ Priors reales sincronizados en ${actualizadas} sustituciones.`);
