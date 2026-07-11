/**
 * Auditoría reproducible de las referencias doctrinales en los cuatro planos
 * que publica la interfaz. No modifica datos: imprime un informe JSON para
 * que las decisiones editoriales puedan contrastarse con el motor real.
 *
 * Uso:
 *   node scripts/auditar-geometria-ideologias.mjs > /tmp/geometria.json
 */
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const directorioItems = join(raiz, 'data/items');
const directorioReferencias = join(raiz, 'data/referencias');
const rutaTaxonomia = join(raiz, 'docs/investigacion/TAXONOMIA-MAPA-IDEOLOGIAS.md');

const leerJson = (ruta) => JSON.parse(readFileSync(ruta, 'utf8'));
const contratoAtlas = leerJson(join(raiz, 'data/mapa-ideologias.json'));
const redondear = (valor, decimales = 1) => {
  const factor = 10 ** decimales;
  return Math.round(valor * factor) / factor;
};

const ejes = leerJson(join(raiz, 'data/ejes.json'));
const idsEjes = ejes.map((eje) => eje.id);
const items = readdirSync(directorioItems)
  .filter((fichero) => fichero.endsWith('.json') && !fichero.startsWith('_'))
  .sort()
  .flatMap((fichero) => leerJson(join(directorioItems, fichero)))
  // Coincide con web/src/datos.ts: los solo-mapa sí forman parte del mapa.
  .filter((item) => item.estado !== 'retirado');
const referencias = readdirSync(directorioReferencias)
  .filter((fichero) => fichero.endsWith('.json') && !fichero.startsWith('_'))
  .sort()
  .map((fichero) => leerJson(join(directorioReferencias, fichero)));

function calcularFacetas(referencia) {
  const acumuladores = new Map(
    idsEjes.map((id) => [id, {
      numerador: 0,
      cargaRespondida: 0,
      cargaDisponible: 0,
      itemsRespondidos: new Set(),
      itemsDisponibles: new Set(),
    }]),
  );

  for (const item of items) {
    const posicion = referencia.posiciones[item.id];
    for (const carga of item.ejes ?? []) {
      const acumulador = acumuladores.get(carga.eje);
      if (!acumulador || !Number.isFinite(carga.carga) || carga.carga === 0) continue;
      acumulador.itemsDisponibles.add(item.id);
      acumulador.cargaDisponible += Math.abs(carga.carga);
      if (typeof posicion?.valor !== 'number') continue;
      acumulador.itemsRespondidos.add(item.id);
      acumulador.cargaRespondida += Math.abs(carga.carga);
      acumulador.numerador += posicion.valor * carga.carga;
    }
  }

  return Object.fromEntries(idsEjes.map((id) => {
    const a = acumuladores.get(id);
    const denominador = 2 * a.cargaRespondida;
    return [id, {
      valor: denominador > 0 ? redondear((100 * a.numerador) / denominador) : null,
      items: a.itemsRespondidos.size,
      itemsDisponibles: a.itemsDisponibles.size,
      carga: redondear(a.cargaRespondida, 4),
      cargaDisponible: redondear(a.cargaDisponible, 4),
      coberturaBanco: a.cargaDisponible > 0
        ? redondear(a.cargaRespondida / a.cargaDisponible, 3)
        : 0,
      suficienteEntidad: a.itemsRespondidos.size >= 4,
    }];
  }));
}

function evidenciaPorGrupos(idsPresentes, grupos, minItems, minFamilias, gruposNucleo = []) {
  const presentes = new Set(idsPresentes);
  const entradas = Object.entries(grupos);
  const idsInstrumento = new Set(entradas.flatMap(([, ids]) => ids));
  const idsNucleo = new Set(gruposNucleo.flatMap((id) => grupos[id] ?? []));
  const items = [...presentes].filter((id) => idsInstrumento.has(id)).length;
  const familias = entradas.filter(([, ids]) => ids.some((id) => presentes.has(id))).length;
  const itemsNucleo = [...presentes].filter((id) => idsNucleo.has(id)).length;
  return {
    items,
    familias,
    itemsNucleo,
    suficiente: items >= minItems && familias >= minFamilias,
  };
}

function calcularPoder(referencia, facetas) {
  const ids = Object.keys(referencia.posiciones);
  const evidencia = evidenciaPorGrupos(
    ids,
    contratoAtlas.sistema.familiasY,
    contratoAtlas.umbrales.minimoItemsY,
    contratoAtlas.umbrales.minimoFamiliasY,
    contratoAtlas.sistema.familiasNucleoY,
  );
  const suficiente =
    evidencia.suficiente &&
    evidencia.itemsNucleo >= contratoAtlas.umbrales.minimoItemsNucleoY;
  const faceta = facetas['autoridad-politica'];
  return {
    valor: faceta?.valor ?? null,
    items: evidencia.items,
    familias: evidencia.familias,
    itemsNucleo: evidencia.itemsNucleo,
    suficienteEntidad: suficiente && typeof faceta?.valor === 'number',
    componentes: items
      .filter((item) => referencia.posiciones[item.id] && item.ejes.some((carga) => carga.eje === 'autoridad-politica'))
      .map((item) => {
        const carga = item.ejes.find((entrada) => entrada.eje === 'autoridad-politica');
        const valor = referencia.posiciones[item.id].valor;
        return { itemId: item.id, valor, carga: carga.carga, aportacion: redondear(valor * carga.carga, 4) };
      }),
  };
}

function calcularEvidenciaPropiedad(referencia) {
  return evidenciaPorGrupos(
    Object.keys(referencia.posiciones),
    contratoAtlas.sistema.subdimensionesX,
    contratoAtlas.umbrales.minimoItemsX,
    contratoAtlas.umbrales.minimoSubdimensionesX,
  );
}

const pares = {
  propiedadPoder: ['propiedad-mercado', 'poder'],
  economiaGalTan: ['economico', 'social'],
  economiaTerritorio: ['economico', 'territorial'],
  galTanTerritorio: ['social', 'territorial'],
};

function construirFila(referencia) {
  const facetas = calcularFacetas(referencia);
  const poder = calcularPoder(referencia, facetas);
  const valores = Object.fromEntries(
    Object.entries(facetas)
      .filter(([, faceta]) => faceta.suficienteEntidad && typeof faceta.valor === 'number')
      .map(([id, faceta]) => [id, faceta.valor]),
  );
  // Coincide con web/src/atlasIdeologias.ts: ids únicos y cobertura de
  // subdimensiones, en vez de un mínimo bruto de cargas.
  const propiedad = facetas['propiedad-mercado'];
  const evidenciaPropiedad = calcularEvidenciaPropiedad(referencia);
  if (evidenciaPropiedad.suficiente && typeof propiedad?.valor === 'number') {
    valores['propiedad-mercado'] = propiedad.valor;
  } else {
    // La faceta genérica usa un mínimo bruto de cargas. El primer plano exige
    // además los ids y subdimensiones del contrato; no debe sobrevivir aquí
    // una coordenada que el frontend rechazaría.
    delete valores['propiedad-mercado'];
  }
  if (poder.suficienteEntidad) valores.poder = poder.valor;
  const vetoGlobal = referencia.publicacionMapa?.publicable === false;
  const planosTecnicos = Object.fromEntries(Object.entries(pares).map(([id, [x, y]]) => [
    id,
    typeof valores[x] === 'number' && typeof valores[y] === 'number',
  ]));
  const planosPublicados = Object.fromEntries(
    Object.entries(planosTecnicos).map(([id, publicable]) => [id, publicable && !vetoGlobal]),
  );
  return {
    id: referencia.id,
    nombre: referencia.nombre,
    periodo: referencia.periodo ?? null,
    sensibilidad: referencia.sensibilidad ?? 'normal',
    confianza: referencia.confianza,
    posiciones: Object.keys(referencia.posiciones).length,
    fuentesMarco: referencia.fuentesMarco.length,
    facetasDefinitorias: referencia.facetasDefinitorias,
    definitoriasSinEvidencia: referencia.facetasDefinitorias.filter(
      (id) => !facetas[id] || facetas[id].items === 0,
    ),
    facetas,
    poder,
    valores,
    vetoGlobal,
    motivoVeto: referencia.publicacionMapa?.motivo ?? null,
    planosTecnicos,
    planosPublicados,
    cuboTecnico: ['economico', 'social', 'territorial'].every(
      (id) => typeof valores[id] === 'number',
    ),
    cuboPublicado:
      !vetoGlobal && ['economico', 'social', 'territorial'].every(
        (id) => typeof valores[id] === 'number',
      ),
  };
}

const filas = referencias.map(construirFila);

function distancia(a, b, ejesPar) {
  return Math.sqrt(ejesPar.reduce((suma, eje) => suma + (a.valores[eje] - b.valores[eje]) ** 2, 0));
}

function recortar(poligono, propia, ajena) {
  const a = 2 * (ajena.x - propia.x);
  const b = 2 * (ajena.y - propia.y);
  if (Math.abs(a) < 1e-9 && Math.abs(b) < 1e-9) return poligono;
  const c = ajena.x ** 2 + ajena.y ** 2 - propia.x ** 2 - propia.y ** 2;
  const salida = [];
  for (let i = 0; i < poligono.length; i += 1) {
    const inicio = poligono[i];
    const fin = poligono[(i + 1) % poligono.length];
    const vi = a * inicio.x + b * inicio.y - c;
    const vf = a * fin.x + b * fin.y - c;
    const dentroI = vi <= 1e-7;
    const dentroF = vf <= 1e-7;
    if (dentroI) salida.push(inicio);
    if (dentroI !== dentroF) {
      const t = vi / (vi - vf);
      salida.push({
        x: inicio.x + (fin.x - inicio.x) * t,
        y: inicio.y + (fin.y - inicio.y) * t,
      });
    }
  }
  return salida;
}

function areaPoligono(poligono) {
  let doble = 0;
  for (let i = 0; i < poligono.length; i += 1) {
    const a = poligono[i];
    const b = poligono[(i + 1) % poligono.length];
    doble += a.x * b.y - b.x * a.y;
  }
  return Math.abs(doble) / 2;
}

function auditarPlano(
  id,
  ejesPar,
  filasFuente = filas,
  incluida = (fila) => fila.planosPublicados[id],
) {
  const publicadas = filasFuente.filter(incluida);
  const puntos = publicadas.map((fila) => ({
    fila,
    x: fila.valores[ejesPar[0]],
    y: fila.valores[ejesPar[1]],
  }));
  const duplicados = [];
  for (let i = 0; i < puntos.length; i += 1) {
    for (let j = i + 1; j < puntos.length; j += 1) {
      const d = distancia(puntos[i].fila, puntos[j].fila, ejesPar);
      if (d <= 10) duplicados.push({
        a: puntos[i].fila.id,
        b: puntos[j].fila.id,
        distancia: redondear(d),
      });
    }
  }

  const regiones = puntos.map((punto, indice) => {
    let poligono = [
      { x: -100, y: -100 },
      { x: 100, y: -100 },
      { x: 100, y: 100 },
      { x: -100, y: 100 },
    ];
    for (let otra = 0; otra < puntos.length && poligono.length; otra += 1) {
      if (otra === indice) continue;
      poligono = recortar(poligono, punto, puntos[otra]);
    }
    const distancias = puntos
      .filter((_, otra) => otra !== indice)
      .map((otro) => ({ id: otro.fila.id, distancia: distancia(punto.fila, otro.fila, ejesPar) }))
      .sort((a, b) => a.distancia - b.distancia);
    return {
      id: punto.fila.id,
      x: punto.x,
      y: punto.y,
      areaPorcentaje: redondear((100 * areaPoligono(poligono)) / 40000, 2),
      vecino: distancias[0]
        ? { id: distancias[0].id, distancia: redondear(distancias[0].distancia) }
        : null,
    };
  }).sort((a, b) => a.areaPorcentaje - b.areaPorcentaje);

  // Máximo de la distancia al ancla más próxima en una rejilla 201×201.
  let vacioMaximo = null;
  for (let yi = 0; yi <= 200; yi += 1) {
    const y = -100 + yi;
    for (let xi = 0; xi <= 200; xi += 1) {
      const x = -100 + xi;
      const cercana = puntos
        .map((punto) => ({
          id: punto.fila.id,
          distancia: Math.hypot(x - punto.x, y - punto.y),
        }))
        .sort((a, b) => a.distancia - b.distancia)[0];
      if (cercana && (!vacioMaximo || cercana.distancia > vacioMaximo.distancia)) {
        vacioMaximo = { x, y, idMasCercano: cercana.id, distancia: cercana.distancia };
      }
    }
  }

  const cuadrantes = { izquierdaAbajo: 0, izquierdaArriba: 0, derechaAbajo: 0, derechaArriba: 0, ejes: 0 };
  for (const punto of puntos) {
    if (punto.x === 0 || punto.y === 0) cuadrantes.ejes += 1;
    else if (punto.x < 0 && punto.y < 0) cuadrantes.izquierdaAbajo += 1;
    else if (punto.x < 0 && punto.y > 0) cuadrantes.izquierdaArriba += 1;
    else if (punto.x > 0 && punto.y < 0) cuadrantes.derechaAbajo += 1;
    else cuadrantes.derechaArriba += 1;
  }

  return {
    id,
    ejes: ejesPar,
    referencias: puntos.length,
    cuadrantes,
    duplicadosOProximas: duplicados.sort((a, b) => a.distancia - b.distancia),
    regiones,
    vacioMaximo: vacioMaximo ? {
      ...vacioMaximo,
      distancia: redondear(vacioMaximo.distancia),
    } : null,
  };
}

const auditoriaPlanos = Object.fromEntries(
  Object.entries(pares).map(([id, ejesPar]) => [id, auditarPlano(id, ejesPar)]),
);
const filasAtlas = contratoAtlas.corrientes.map((corriente) => ({
  id: corriente.id,
  nombre: corriente.nombre,
  valores: {
    'propiedad-mercado': corriente.coordenadas.x,
    poder: corriente.coordenadas.y,
  },
}));
const auditoriaAtlas = auditarPlano(
  'atlasPropiedadPoder',
  ['propiedad-mercado', 'poder'],
  filasAtlas,
  () => true,
);

function auditarTaxonomia() {
  const texto = readFileSync(rutaTaxonomia, 'utf8');
  const inicioInventario = texto.indexOf('## 4. Inventario exhaustivo');
  const finInventario = texto.indexOf('\n## 5.', inicioInventario);
  const inventario = texto.slice(inicioInventario, finInventario);
  const etiquetas = [];
  for (const linea of inventario.split('\n')) {
    const match = linea.match(/^\|\s*(\d+)\s*\|\s*`([^`]+)`\s*\|\s*([^|]+?)\s*\|\s*([A-F])\s*\|/);
    if (match) etiquetas.push({
      numero: Number(match[1]),
      etiqueta: match[2],
      normalizacion: match[3].trim(),
      decision: match[4],
    });
  }
  const conteo = Object.fromEntries('ABCDEF'.split('').map((letra) => [
    letra,
    etiquetas.filter((fila) => fila.decision === letra).length,
  ]));
  const numeros = new Set(etiquetas.map((fila) => fila.numero));
  return {
    total: etiquetas.length,
    conteo,
    numerosAusentes: Array.from({ length: 178 }, (_, i) => i + 1).filter((n) => !numeros.has(n)),
    duplicadosEtiqueta: etiquetas
      .filter((fila, indice) => etiquetas.findIndex((otra) => otra.etiqueta === fila.etiqueta) !== indice)
      .map((fila) => fila.etiqueta),
    etiquetas,
  };
}

const taxonomia = auditarTaxonomia();
const errores = [];
const avisos = [];
const idsReferencias = new Set(referencias.map((referencia) => referencia.id));
if (idsReferencias.size !== referencias.length) errores.push('Hay ids de referencia duplicados.');
if (taxonomia.total !== 178) errores.push(`Se esperaban 178 etiquetas y hay ${taxonomia.total}.`);
if (taxonomia.numerosAusentes.length > 0) errores.push('El inventario A–F no es consecutivo.');
const conteoDeclarado = readFileSync(rutaTaxonomia, 'utf8').match(
  /El cat[aá]logo actual re[uú]ne \*\*(\d+) referencias doctrinales\*\*/,
);
if (conteoDeclarado && Number(conteoDeclarado[1]) !== referencias.length) {
  avisos.push(
    `La taxonomía declara ${conteoDeclarado[1]} referencias, pero data/referencias contiene ${referencias.length}.`,
  );
}
for (const fila of filas) {
  for (const [id, faceta] of Object.entries(fila.facetas)) {
    if (typeof faceta.valor === 'number' && (faceta.valor < -100 || faceta.valor > 100)) {
      errores.push(`${fila.id}/${id} queda fuera de [-100,100].`);
    }
  }
  if (fila.definitoriasSinEvidencia.length > 0) {
    avisos.push(`${fila.id} declara facetas definitorias sin ninguna carga: ${fila.definitoriasSinEvidencia.join(', ')}.`);
  }
}

const informe = {
  generado: new Date().toISOString(),
  instrumento: leerJson(join(raiz, 'data/version.json')),
  resumen: {
    referencias: referencias.length,
    referenciasConVetoGlobal: filas.filter((fila) => fila.vetoGlobal).length,
    publicadasPropiedadPoder: filas.filter((fila) => fila.planosPublicados.propiedadPoder).length,
    publicadasEconomiaGalTan: filas.filter((fila) => fila.planosPublicados.economiaGalTan).length,
    publicadasEconomiaTerritorio: filas.filter((fila) => fila.planosPublicados.economiaTerritorio).length,
    publicadasGalTanTerritorio: filas.filter((fila) => fila.planosPublicados.galTanTerritorio).length,
    publicadasCubo: filas.filter((fila) => fila.cuboPublicado).length,
  },
  referencias: filas,
  planos: auditoriaPlanos,
  atlas: auditoriaAtlas,
  taxonomia: {
    total: taxonomia.total,
    conteo: taxonomia.conteo,
    numerosAusentes: taxonomia.numerosAusentes,
    duplicadosEtiqueta: taxonomia.duplicadosEtiqueta,
  },
  validacion: { correcta: errores.length === 0, errores, avisos },
};

console.log(JSON.stringify(informe, null, 2));
if (errores.length > 0) process.exitCode = 1;
