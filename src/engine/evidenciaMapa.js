/**
 * Contrato puro de evidencia para publicar organizaciones en la brújula
 * Propiedad/mercado × Poder político.
 *
 * Este módulo es JavaScript ESM deliberadamente: lo consumen sin transpilar
 * tanto los auditores de Node como la aplicación Vite. La declaración
 * adyacente mantiene el contrato estricto para TypeScript. De este modo la
 * interfaz y CI no pueden divergir al contar fuentes, citas o ceros.
 */

export function normalizarUrl(url) {
  if (typeof url !== 'string' || !url.trim()) return null;
  try {
    const normalizada = new URL(url.trim());
    if (normalizada.protocol !== 'https:') return null;
    normalizada.hash = '';
    normalizada.hostname = normalizada.hostname.toLowerCase();
    const parametros = [...normalizada.searchParams.entries()]
      .filter(
        ([clave]) =>
          !/^utm_/i.test(clave) && !['fbclid', 'gclid', 'mc_cid', 'mc_eid'].includes(clave),
      )
      .sort(([claveA, valorA], [claveB, valorB]) =>
        claveA.localeCompare(claveB) || valorA.localeCompare(valorB),
      );
    normalizada.search = '';
    for (const [clave, valor] of parametros) normalizada.searchParams.append(clave, valor);
    if (normalizada.pathname.length > 1) {
      normalizada.pathname = normalizada.pathname.replace(/\/+$/, '');
    }
    return normalizada.toString();
  } catch {
    return null;
  }
}

export function normalizarLocalizador(cita) {
  if (typeof cita !== 'string') return null;
  const normalizada = cita
    .replace(/[\p{Cf}\uFEFF]/gu, '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es')
    .replace(/[\p{P}\p{S}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return normalizada.length >= 20 ? normalizada : null;
}

export function grupoEvidenciaDe(posicion) {
  const url = normalizarUrl(posicion?.fuente?.url);
  if (!url) return null;
  const grupo =
    typeof posicion?.grupoEvidencia === 'string'
      ? posicion.grupoEvidencia.trim().toLocaleLowerCase('es')
      : null;
  if (!grupo || !/^[a-z0-9][a-z0-9-]{5,100}$/u.test(grupo)) return null;
  return `${url}#grupo:${grupo}`;
}

export function transcripcionesRelacionadas(a, b) {
  const urlA = normalizarUrl(a?.fuente?.url);
  const urlB = normalizarUrl(b?.fuente?.url);
  if (!urlA || urlA !== urlB) return false;
  const textoA = normalizarLocalizador(a?.fuente?.cita);
  const textoB = normalizarLocalizador(b?.fuente?.cita);
  if (!textoA || !textoB) return false;
  if (textoA === textoB) return true;
  const corta = textoA.length <= textoB.length ? textoA : textoB;
  const larga = corta === textoA ? textoB : textoA;
  if (corta.length >= 40 && corta.length / larga.length >= 0.55 && larga.includes(corta)) {
    return true;
  }
  if (corta.length < 120 || corta.length / larga.length < 0.6) return false;
  const tokensA = new Set(textoA.split(' ').filter((token) => token.length >= 3));
  const tokensB = new Set(textoB.split(' ').filter((token) => token.length >= 3));
  const menor = Math.min(tokensA.size, tokensB.size);
  if (menor < 12) return false;
  let comunes = 0;
  for (const token of tokensA) if (tokensB.has(token)) comunes += 1;
  return comunes / menor >= 0.85;
}

/**
 * Detecta un posible conflicto editorial entre dos identidades declaradas.
 * Los ids iguales expresan la decisión canónica; la coherencia textual de ese
 * grupo se audita además antes de permitir que contribuya a una coordenada.
 */
export function pasajesEquivalentes(a, b) {
  const grupoA = grupoEvidenciaDe(a);
  const grupoB = grupoEvidenciaDe(b);
  if (grupoA && grupoA === grupoB) return true;
  return transcripcionesRelacionadas(a, b);
}

function grupoTextualmenteCoherente(entradas) {
  if (entradas.length < 2) return true;
  for (let indice = 0; indice < entradas.length; indice += 1) {
    for (let otro = indice + 1; otro < entradas.length; otro += 1) {
      if (!transcripcionesRelacionadas(entradas[indice].posicion, entradas[otro].posicion)) {
        return false;
      }
    }
  }
  return true;
}

function depurarConflictosDeIdentidad(porGrupo, omitidos) {
  const grupos = [...porGrupo.entries()];
  const conflictivos = new Set();
  for (const [clave, entradas] of grupos) {
    if (!grupoTextualmenteCoherente(entradas)) conflictivos.add(clave);
  }
  for (let indice = 0; indice < grupos.length; indice += 1) {
    const [claveA, entradasA] = grupos[indice];
    for (let otro = indice + 1; otro < grupos.length; otro += 1) {
      const [claveB, entradasB] = grupos[otro];
      if (
        entradasA.some((entradaA) =>
          entradasB.some((entradaB) =>
            transcripcionesRelacionadas(entradaA.posicion, entradaB.posicion),
          ),
        )
      ) {
        conflictivos.add(claveA);
        conflictivos.add(claveB);
      }
    }
  }
  for (const clave of conflictivos) {
    for (const { itemId } of porGrupo.get(clave) ?? []) {
      omitidos.push({
        itemId,
        motivo: 'conflicto entre identificadores canónicos de un mismo pasaje probable',
      });
    }
    porGrupo.delete(clave);
  }
}

function ceroResueltoExplicitamente(posicion) {
  if (posicion?.valor !== 0) return true;
  return Boolean(
    posicion?.resolucionCero &&
      ['modelo-mixto', 'equilibrio-explicito'].includes(
        posicion.resolucionCero.tipo,
      ) &&
      typeof posicion.resolucionCero.explicacion === 'string' &&
      posicion.resolucionCero.explicacion.trim().length >= 30,
  );
}

function fechaIsoValida(fecha) {
  if (typeof fecha !== 'string' || !/^\d{4}-\d{2}-\d{2}$/u.test(fecha)) return false;
  const valor = new Date(`${fecha}T00:00:00Z`);
  return !Number.isNaN(valor.getTime()) && valor.toISOString().slice(0, 10) === fecha;
}

function fechaFuenteValida(fecha) {
  if (fecha === undefined) return true;
  if (typeof fecha !== 'string') return false;
  if (/^\d{4}$/u.test(fecha)) return Number(fecha) >= 1;
  if (/^\d{4}-\d{2}$/u.test(fecha)) {
    const valor = new Date(`${fecha}-01T00:00:00Z`);
    return !Number.isNaN(valor.getTime()) && valor.toISOString().slice(0, 7) === fecha;
  }
  return fechaIsoValida(fecha);
}

export function evaluarPosicion(posicion) {
  if (
    !posicion ||
    !Number.isInteger(posicion.valor) ||
    posicion.valor < -2 ||
    posicion.valor > 2
  ) {
    return { sustentada: false, motivo: 'valor ausente o inválido', grupo: null };
  }
  if (typeof posicion.justificacion !== 'string' || !posicion.justificacion.trim()) {
    return { sustentada: false, motivo: 'sin justificación', grupo: null };
  }
  if (!['alta', 'media'].includes(posicion.calidadEvidencia)) {
    return { sustentada: false, motivo: 'evidencia baja o no calificada', grupo: null };
  }
  const url = normalizarUrl(posicion.fuente?.url);
  const tiposFuente = [
    'programa',
    'votacion',
    'declaracion',
    'autoubicacion',
    'estatutos',
    'redes',
    'otro',
  ];
  if (
    !url ||
    !tiposFuente.includes(posicion.fuente?.tipo) ||
    typeof posicion.fuente?.titulo !== 'string' ||
    !posicion.fuente.titulo.trim() ||
    !fechaFuenteValida(posicion.fuente?.fecha) ||
    !fechaIsoValida(posicion.fuente?.consultado)
  ) {
    return { sustentada: false, motivo: 'fuente incompleta', grupo: null };
  }
  if (!normalizarLocalizador(posicion.fuente.cita)) {
    return {
      sustentada: false,
      motivo: 'sin pasaje o localizador reproducible',
      grupo: null,
    };
  }
  const grupo = grupoEvidenciaDe(posicion);
  if (!grupo) {
    return {
      sustentada: false,
      motivo: 'sin identificador canónico de pasaje',
      grupo: null,
    };
  }
  if (!ceroResueltoExplicitamente(posicion)) {
    return {
      sustentada: false,
      motivo: 'valor 0 sin resolución documental explícita',
      grupo,
    };
  }
  return { sustentada: true, motivo: null, grupo };
}

function describirGrupo(clave, entradas) {
  const primera = entradas[0];
  return {
    clave,
    url: normalizarUrl(primera.posicion.fuente.url),
    localizador: primera.posicion.fuente.cita ?? null,
    items: entradas.map(({ itemId }) => itemId).sort(),
  };
}

export function evidenciaIndependiente(posiciones, grupos, idsNucleo = new Set()) {
  const familiaPorItem = new Map();
  for (const [familia, ids] of grupos) {
    for (const id of ids) {
      const familias = familiaPorItem.get(id) ?? [];
      familias.push(familia);
      familiaPorItem.set(id, familias);
    }
  }

  const porGrupo = new Map();
  const omitidos = [];
  for (const [itemId, posicion] of Object.entries(posiciones ?? {})) {
    const familias = familiaPorItem.get(itemId);
    if (!familias) continue;
    const evaluacion = evaluarPosicion(posicion);
    if (!evaluacion.sustentada) {
      omitidos.push({ itemId, motivo: evaluacion.motivo });
      continue;
    }
    const entrada = { itemId, posicion, familias, nucleo: idsNucleo.has(itemId) };
    const acumuladas = porGrupo.get(evaluacion.grupo) ?? [];
    acumuladas.push(entrada);
    porGrupo.set(evaluacion.grupo, acumuladas);
  }

  depurarConflictosDeIdentidad(porGrupo, omitidos);

  const recibo = [...porGrupo.entries()]
    .map(([clave, entradas]) => ({
      ...describirGrupo(clave, entradas),
      familias: [...new Set(entradas.flatMap(({ familias }) => familias))].sort(),
      nucleo: entradas.some(({ nucleo }) => nucleo),
    }))
    .sort((a, b) => a.clave.localeCompare(b.clave, 'es'));

  return {
    items: recibo.reduce((total, grupo) => total + grupo.items.length, 0),
    grupos: recibo.length,
    familias: [...new Set(recibo.flatMap(({ familias }) => familias))].sort(),
    itemsNucleo: recibo.reduce(
      (total, grupo) => total + grupo.items.filter((id) => idsNucleo.has(id)).length,
      0,
    ),
    gruposNucleo: recibo.filter(({ nucleo }) => nucleo).length,
    recibo,
    omitidos: omitidos.sort((a, b) => a.itemId.localeCompare(b.itemId, 'es')),
  };
}

export function coordenadaAuditable(posiciones, ejeId, itemPorId) {
  const porGrupo = new Map();
  const omitidos = [];
  let numeradorItems = 0;
  let cargaItems = 0;
  for (const [itemId, posicion] of Object.entries(posiciones ?? {})) {
    const cargaEje = itemPorId
      .get(itemId)
      ?.ejes?.find((entrada) => entrada.eje === ejeId)?.carga;
    if (typeof cargaEje !== 'number' || cargaEje === 0) continue;
    const evaluacion = evaluarPosicion(posicion);
    if (!evaluacion.sustentada) {
      omitidos.push({ itemId, motivo: evaluacion.motivo });
      continue;
    }
    numeradorItems += posicion.valor * cargaEje;
    cargaItems += Math.abs(cargaEje);
    const entradas = porGrupo.get(evaluacion.grupo) ?? [];
    entradas.push({ itemId, valor: posicion.valor, carga: cargaEje, posicion });
    porGrupo.set(evaluacion.grupo, entradas);
  }


  depurarConflictosDeIdentidad(porGrupo, omitidos);

  let numerador = 0;
  let pesoTotal = 0;
  const componentes = [];
  for (const [grupo, entradas] of porGrupo) {
    const cargaGrupo = entradas.reduce((total, entrada) => total + Math.abs(entrada.carga), 0);
    const direccion =
      cargaGrupo === 0
        ? 0
        : entradas.reduce(
            (total, entrada) => total + entrada.valor * entrada.carga,
            0,
          ) / cargaGrupo;
    const peso = Math.max(...entradas.map((entrada) => Math.abs(entrada.carga)));
    numerador += direccion * peso;
    pesoTotal += peso;
    componentes.push({
      grupo,
      items: entradas.map(({ itemId }) => itemId).sort(),
      direccion: Math.round(direccion * 1000) / 1000,
      peso,
    });
  }

  const valorPorItems =
    cargaItems > 0 ? Math.round((500 * numeradorItems) / cargaItems) / 10 : null;
  const valorPorGrupos =
    pesoTotal > 0 ? Math.round((500 * numerador) / pesoTotal) / 10 : null;
  const extremoSinContrapeso = Boolean(
    typeof valorPorGrupos === 'number' &&
      Math.abs(valorPorGrupos) >= 75 &&
      componentes.length > 0 &&
      componentes.every(
        (componente) =>
          Math.abs(componente.direccion) >= 1 &&
          Math.sign(componente.direccion) === Math.sign(valorPorGrupos),
      ),
  );

  return {
    // La coordenada publicable siempre concede una sola contribución a cada
    // pasaje documental independiente. `valorPorItems` se conserva únicamente
    // como diagnóstico para detectar cuánto sesgaría repetir la misma cita en
    // varios ítems; ninguna interfaz debe usarlo como posición de la entidad.
    valor: valorPorGrupos,
    valorPorItems,
    valorPorGrupos,
    extremoSinContrapeso,
    grupos: componentes.length,
    componentes: componentes.sort((a, b) => a.grupo.localeCompare(b.grupo, 'es')),
    omitidos: omitidos.sort((a, b) => a.itemId.localeCompare(b.itemId, 'es')),
  };
}

/** Clasifica un perfil con el mismo recibo que consume CI. */
export function auditarPerfilBrujula(perfil, items, atlas) {
  const itemPorId = new Map(items.map((item) => [item.id, item]));
  const gruposX = Object.entries(atlas.sistema.subdimensionesX);
  const gruposY = Object.entries(atlas.sistema.familiasY);
  const idsNucleoY = new Set(
    atlas.sistema.familiasNucleoY.flatMap(
      (familia) => atlas.sistema.familiasY[familia] ?? [],
    ),
  );
  const x = evidenciaIndependiente(perfil.posiciones, gruposX);
  const y = evidenciaIndependiente(perfil.posiciones, gruposY, idsNucleoY);
  const u = atlas.umbrales;
  const gruposPorSubdimensionX = new Map(
    x.familias.map((familia) => [
      familia,
      x.recibo.filter((grupo) => grupo.familias.includes(familia)).length,
    ]),
  );
  const subdimensionesXConUnaSolaAncla = [...gruposPorSubdimensionX]
    .filter(([, cantidad]) => cantidad < 2)
    .map(([familia]) => familia);
  const subdimensionesXEquilibradas = subdimensionesXConUnaSolaAncla.length === 0;
  const coordX = coordenadaAuditable(perfil.posiciones, atlas.sistema.ejeX, itemPorId);
  const coordY = coordenadaAuditable(perfil.posiciones, atlas.sistema.ejeY, itemPorId);
  const coordenadaXCalculable = Number.isFinite(coordX.valor);
  const coordenadaYCalculable = Number.isFinite(coordY.valor);
  const solidaX =
    x.grupos >= u.minimoItemsX &&
    x.familias.length >= u.minimoSubdimensionesX &&
    subdimensionesXEquilibradas &&
    coordenadaXCalculable;
  const solidaY =
    y.grupos >= u.minimoItemsY &&
    y.familias.length >= u.minimoFamiliasY &&
    y.gruposNucleo >= u.minimoItemsNucleoY &&
    coordenadaYCalculable;
  const provisionalX =
    x.grupos >= 3 &&
    x.familias.length >= 2 &&
    subdimensionesXEquilibradas &&
    coordenadaXCalculable;
  const provisionalY =
    y.grupos >= 3 &&
    y.familias.length >= 2 &&
    y.gruposNucleo >= 1 &&
    coordenadaYCalculable;
  const problemas = [];
  if (perfil.confianza === 'sin-datos') problemas.push('perfil sin datos');
  if (perfil.monotematico) problemas.push('perfil monotemático sin posición general');
  if (!solidaX) {
    problemas.push(
      `X ${x.grupos}/${u.minimoItemsX} grupos independientes (${x.items} ítems) y ${x.familias.length}/${u.minimoSubdimensionesX} familias`,
    );
  }
  if (!subdimensionesXEquilibradas) {
    problemas.push(
      `X subdimensiones con una sola ancla independiente: ${subdimensionesXConUnaSolaAncla.join(', ')}`,
    );
  }
  if (!coordenadaXCalculable) problemas.push('X sin coordenada calculable con carga no nula');
  if (!solidaY) {
    problemas.push(
      `Y ${y.grupos}/${u.minimoItemsY} grupos independientes (${y.items} ítems), ${y.familias.length}/${u.minimoFamiliasY} familias y ${y.gruposNucleo}/${u.minimoItemsNucleoY} grupos núcleo`,
    );
  }
  if (!coordenadaYCalculable) problemas.push('Y sin coordenada calculable con carga no nula');
  const extremoSinContrapeso = coordX.extremoSinContrapeso || coordY.extremoSinContrapeso;
  if (extremoSinContrapeso) {
    problemas.push('extremo sin evidencia moderadora o contradictoria independiente');
  }
  if (perfil.publicacionMapa?.publicable === false) {
    problemas.push('veto editorial de mapa incompatible con cobertura total');
  }
  const grado =
    solidaX &&
    solidaY &&
    perfil.confianza !== 'sin-datos' &&
    !perfil.monotematico &&
    perfil.publicacionMapa?.publicable !== false &&
    !extremoSinContrapeso
      ? 'solida'
      : provisionalX &&
          provisionalY &&
          perfil.confianza !== 'sin-datos' &&
          !perfil.monotematico &&
          perfil.publicacionMapa?.publicable !== false &&
          !extremoSinContrapeso
        ? 'provisional'
        : 'insuficiente';
  return {
    id: perfil.id,
    nombre: perfil.nombre,
    actividad: perfil.actividad,
    grado,
    x: {
      ...x,
      valor: coordX.valor,
      valorPorItems: coordX.valorPorItems,
      valorPorGrupos: coordX.valorPorGrupos,
      extremoSinContrapeso: coordX.extremoSinContrapeso,
      componentes: coordX.componentes,
    },
    y: {
      ...y,
      valor: coordY.valor,
      valorPorItems: coordY.valorPorItems,
      valorPorGrupos: coordY.valorPorGrupos,
      extremoSinContrapeso: coordY.extremoSinContrapeso,
      componentes: coordY.componentes,
    },
    problemas,
  };
}

export function crearAuditoriaBrujula({ items, partidos, atlas }) {
  const resultados = partidos.map((partido) => auditarPerfilBrujula(partido, items, atlas)).sort((a, b) => {
    const orden = { insuficiente: 0, provisional: 1, solida: 2 };
    return orden[a.grado] - orden[b.grado] || a.id.localeCompare(b.id, 'es');
  });
  const resumen = {
    perfiles: resultados.length,
    solidas: resultados.filter((resultado) => resultado.grado === 'solida').length,
    provisionales: resultados.filter((resultado) => resultado.grado === 'provisional').length,
    insuficientes: resultados.filter((resultado) => resultado.grado === 'insuficiente').length,
    extremosInsuficientes: resultados.filter((resultado) =>
      resultado.problemas.includes('extremo sin evidencia moderadora o contradictoria independiente'),
    ).length,
  };
  resumen.activas = resultados.filter((resultado) => resultado.actividad === 'activa').length;
  return { resumen, resultados };
}
