import { test, expect, type Download, type Locator, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Flujos críticos desde la portada hasta resultados y recuperación local. */

const BASE_URL_E2E = `http://localhost:${process.env.PLAYWRIGHT_PORT ?? '4180'}`;
const CLAVE_ALMACEN = 'espectro.v1';

interface ItemDePrueba {
  id: string;
  modulo: string;
  estado?: string;
  condicion?: unknown;
}

interface ModuloDePrueba {
  id: string;
  orden?: number;
}

interface CorrienteMapaDePrueba {
  decision: 'A' | 'B';
  capa: 'region' | 'faceta' | 'contexto' | 'diagnostico' | 'modelo-historico';
  publicacionGeometrica?: 'publicada' | 'bloqueada-investigacion';
}

const CORRIENTES_MAPA = (
  JSON.parse(
    readFileSync(
      resolve(dirname(fileURLToPath(import.meta.url)), '../../data/mapa-ideologias.json'),
      'utf8',
    ),
  ) as { corrientes: CorrienteMapaDePrueba[] }
).corrientes;
const REGIONES_MAPA = CORRIENTES_MAPA.filter(
  (corriente) => corriente.publicacionGeometrica === 'publicada',
);
const ANCLAS_BLOQUEADAS_MAPA = CORRIENTES_MAPA.filter(
  (corriente) => corriente.publicacionGeometrica === 'bloqueada-investigacion',
);
const TOTAL_CORRIENTES_MAPA = REGIONES_MAPA.length;
const CORRIENTES_PRINCIPALES_MAPA = CORRIENTES_MAPA.filter(
  (corriente) => corriente.publicacionGeometrica === 'publicada' && corriente.decision === 'A',
).length;
const ANCLAS_BLOQUEADAS_PRINCIPALES = ANCLAS_BLOQUEADAS_MAPA.filter(
  (corriente) => corriente.decision === 'A',
).length;
const ENTRADAS_PRINCIPALES_ATLAS = CORRIENTES_MAPA.filter(
  (corriente) => corriente.decision === 'A',
).length;
const ENTRADAS_CONTEXTO_PRINCIPALES =
  ENTRADAS_PRINCIPALES_ATLAS -
  CORRIENTES_PRINCIPALES_MAPA -
  ANCLAS_BLOQUEADAS_PRINCIPALES;
const ENTRADAS_CONTEXTO_ATLAS =
  CORRIENTES_MAPA.length - REGIONES_MAPA.length - ANCLAS_BLOQUEADAS_MAPA.length;

/** Reproduce el orden público del banco sin importar código de producción en Playwright. */
function crearSesionEnHitoIntermedio() {
  const directorioDatos = resolve(dirname(fileURLToPath(import.meta.url)), '../../data');
  const items = readdirSync(resolve(directorioDatos, 'items'))
    .filter((archivo) => archivo.endsWith('.json'))
    .sort((a, b) => a.localeCompare(b))
    .flatMap(
      (archivo) =>
        JSON.parse(readFileSync(resolve(directorioDatos, 'items', archivo), 'utf8')) as ItemDePrueba[],
    )
    .filter((item) => item.estado !== 'retirado');
  const modulos = (
    JSON.parse(readFileSync(resolve(directorioDatos, 'modulos.json'), 'utf8')) as ModuloDePrueba[]
  ).sort((a, b) => (a.orden ?? 99) - (b.orden ?? 99));
  const ampliacionNucleo = new Set([
    'dem-011',
    'dem-014',
    'dem-021',
    'lab-006',
    'ene-001',
    'sd-002',
    'fem-006',
    'geo-002',
    'geo-005',
    'va-001',
  ]);
  const nucleo = [
    ...items.filter((item) => item.modulo === 'nucleo' && !ampliacionNucleo.has(item.id)),
    ...[...ampliacionNucleo]
      .map((id) => items.find((item) => item.id === id))
      .filter((item): item is ItemDePrueba => item !== undefined),
  ];
  const modulosActivos = modulos.filter((modulo) => modulo.id !== 'nucleo').map((modulo) => modulo.id);
  const secuencia = [
    ...nucleo,
    ...modulosActivos.flatMap((modulo) => items.filter((item) => item.modulo === modulo)),
  ].filter((item) => !item.condicion);
  const idsRespondidos = [...new Set(secuencia.map((item) => item.id))].slice(0, 150);
  if (idsRespondidos.length !== 150) throw new Error('El banco no alcanza el hito de prueba');
  const ultimoId = idsRespondidos.at(-1);

  return {
    version: 3,
    versionInstrumento: '4',
    fase: 'hito-intermedio',
    ccaa: '',
    eleccion: 'generales',
    modo: 'completo',
    respuestas: Object.fromEntries(idsRespondidos.map((id) => [id, 0])),
    importantes: { [idsRespondidos[0]!]: true },
    modulosActivos,
    indice: Math.max(0, secuencia.findIndex((item) => item.id === ultimoId)),
    editando: false,
    hitoIntermedio150Visto: true,
    perfilIntermedio: false,
  };
}

function crearSesionResultadosRapidos(valor: -2 | -1 | 0 | 1 | 2 = 0) {
  const directorioDatos = resolve(dirname(fileURLToPath(import.meta.url)), '../../data');
  const itemsPorId = new Map(
    readdirSync(resolve(directorioDatos, 'items'))
      .filter((archivo) => archivo.endsWith('.json'))
      .flatMap(
        (archivo) =>
          JSON.parse(
            readFileSync(resolve(directorioDatos, 'items', archivo), 'utf8'),
          ) as ItemDePrueba[],
      )
      .map((item) => [item.id, item] as const),
  );
  const manifiesto = JSON.parse(
    readFileSync(resolve(directorioDatos, 'rapido.json'), 'utf8'),
  ) as { ids: string[] };
  if (manifiesto.ids.length !== 50 || new Set(manifiesto.ids).size !== 50) {
    throw new Error('El manifiesto rápido debe contener 50 ids únicos');
  }
  const rapido = manifiesto.ids.map((id) => {
    const item = itemsPorId.get(id);
    if (!item || item.estado === 'retirado') {
      throw new Error(`El manifiesto rápido referencia un ítem ausente o retirado: ${id}`);
    }
    return item;
  });

  return {
    version: 3,
    versionInstrumento: '4',
    guardadoEn: new Date().toISOString(),
    fase: 'resultados',
    ccaa: '',
    eleccion: 'generales',
    modo: 'rapido',
    respuestas: Object.fromEntries(rapido.map((item) => [item.id, valor])),
    importantes: {},
    modulosActivos: [],
    indice: 0,
    editando: false,
    hitoIntermedio150Visto: false,
    perfilIntermedio: false,
  };
}

async function empezarTest(page: Page) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar el test' }).click();
  await expect(page.getByRole('radio', { name: 'Muy de acuerdo', exact: true })).toBeVisible();
}

async function dimensionesPngDescargado(
  descarga: Download,
): Promise<{ ancho: number; alto: number }> {
  const ruta = await descarga.path();
  if (!ruta) throw new Error('Playwright no ha conservado la descarga PNG para inspeccionarla.');
  const bytes = readFileSync(ruta);
  expect(bytes.subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  expect(bytes.subarray(12, 16).toString('ascii')).toBe('IHDR');
  return { ancho: bytes.readUInt32BE(16), alto: bytes.readUInt32BE(20) };
}

/** Activa un control ya visible sin autodesplazar el larguísimo informe móvil. */
async function activarSinDesplazamiento(control: Locator): Promise<void> {
  await control.evaluate((elemento) => {
    if (!(elemento instanceof HTMLElement)) throw new Error('El control no es activable.');
    elemento.click();
  });
}

async function completarRapido(page: Page) {
  await empezarTest(page);
  for (let indice = 0; indice < 50; indice += 1) {
    await page.keyboard.press('3');
    await page
      .getByRole('button', {
        name: indice === 49 ? 'Finalizar modo rápido' : 'Siguiente',
        exact: true,
      })
      .click();
  }
  await expect(page.getByRole('heading', { name: 'Ya puedes ver tu perfil provisional' }))
    .toBeVisible();
}

async function esperarMapaDesplegado(page: Page) {
  /* Norma dura del atlas: el cuadrante rico se muestra desplegado sin exigir
     un clic. La espera cubre solo la resolucion del chunk perezoso, y el foco
     del usuario no se roba en una carga normal. */
  await expect(page.locator('.mapa-politico')).toBeVisible({ timeout: 20_000 });
  await expect(page.getByRole('heading', { name: 'Mapa del espectro' })).not.toBeFocused();
}

async function abrirReferenciasDoctrinales(page: Page) {
  const boton = page.getByRole('button', { name: 'Explorar corrientes afines' });
  await boton.click();
  await expect(page.getByRole('heading', { name: 'Referencias doctrinales' })).toBeFocused();
  await expect(page.locator('.referencias-doctrinales__contenido')).toBeVisible();
}

function textoPregunta(page: Page) {
  return page.locator('main h2, main h1').first().innerText();
}

test('portada: título, modos y arranque del cuestionario', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('espectro político español');
  await expect(page.getByText('Empezar el test').first()).toBeVisible();
  await empezarTest(page);
  await expect(page.getByRole('radio', { name: 'Muy en desacuerdo', exact: true })).toBeVisible();
  await expect(page.getByRole('radio', { name: 'Sin opinión' })).toBeVisible();
});

test('teclado: 1-5 responde, 0 es sin opinión y las flechas navegan', async ({ page }) => {
  await empezarTest(page);
  const primera = await textoPregunta(page);

  await page.keyboard.press('5');
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => textoPregunta(page)).not.toBe(primera);
  const segunda = await textoPregunta(page);

  await page.keyboard.press('0'); // sin opinión también permite avanzar
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => textoPregunta(page)).not.toBe(segunda);

  await page.keyboard.press('ArrowLeft');
  await expect.poll(() => textoPregunta(page)).toBe(segunda);
});

test('la prioridad «importa el doble» se puede marcar y desmarcar', async ({ page }) => {
  await empezarTest(page);
  const prioridad = page.getByText('Este tema me importa el doble');
  await prioridad.click();
  await expect(page.locator('input[type="checkbox"]').first()).toBeChecked();
  await prioridad.click();
  await expect(page.locator('input[type="checkbox"]').first()).not.toBeChecked();
});

test('persistencia: recargar conserva la posición y las respuestas', async ({ page }) => {
  await empezarTest(page);
  for (const tecla of ['5', '1', '3'] as const) {
    await page.keyboard.press(tecla);
    await page.keyboard.press('ArrowRight');
  }
  const actual = await textoPregunta(page);

  await page.reload();
  await expect.poll(() => textoPregunta(page)).toBe(actual);
  const guardado = await page.evaluate((clave) => localStorage.getItem(clave), CLAVE_ALMACEN);
  expect(guardado).not.toBeNull();
  expect(guardado).toContain('respuestas');
});

test('glosario: se abre desde la marca, enlaza a Wikipedia y cierra con Escape', async ({ page }) => {
  await empezarTest(page);
  const marca = page.getByRole('button', { name: /qué significa/i }).first();
  // Avanza por todo el modo rápido hasta encontrar un ítem con término de glosario.
  for (let i = 0; i < 55 && !(await marca.isVisible()); i++) {
    await page.keyboard.press('3');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(80); // deja pintar la pregunta antes de mirar la marca
  }
  await expect(marca).toBeVisible();
  await marca.click();
  await expect(page.getByText('Del glosario')).toBeVisible();
  /* La ampliación llega plegada bajo «Más detalle» y se abre bajo demanda:
     el primer ítem con glosario del rápido (autodeterminación) la tiene. */
  const masDetalle = page.locator('.glosario-mas').first();
  await expect(masDetalle).toBeVisible();
  await expect(masDetalle).not.toHaveAttribute('open', '');
  await masDetalle.locator('summary').click();
  await expect(masDetalle).toHaveAttribute('open', '');
  expect(((await masDetalle.locator('p').textContent()) ?? '').length).toBeGreaterThan(150);
  await expect(page.getByRole('link', { name: /Ver en Wikipedia/i }).first()).toHaveAttribute(
    'href',
    /wikipedia\.org/,
  );
  await page.keyboard.press('Escape');
  await expect(page.getByText('Del glosario')).toBeHidden();
});

test('borrar mis datos limpia el almacenamiento y vuelve a empezar', async ({ page }) => {
  await empezarTest(page);
  await page.keyboard.press('4');
  await page.keyboard.press('ArrowRight');

  page.on('dialog', (dialogo) => dialogo.accept());
  await page.getByText('Borrar mis datos guardados').first().click();

  await expect(page.getByRole('heading', { level: 1 })).toContainText('espectro político español');
  const guardado = await page.evaluate((clave) => localStorage.getItem(clave), CLAVE_ALMACEN);
  expect(guardado).toBeNull();
});

test('rápido → perfil provisional → exhaustivo conserva las 50 respuestas', async ({ page }) => {
  await completarRapido(page);

  await page.getByRole('button', { name: 'Ver perfil provisional' }).click();
  await expect(
    page.getByRole('heading', { name: 'Tu posición provisional y tus afinidades' }),
  ).toBeVisible();
  await expect(page.getByText(/50 ítems respondidos/)).toBeVisible();
  await esperarMapaDesplegado(page);
  await expect(
    page.locator('.mapa-plano--brujula .mapa-punto[data-tipo="usuario"]'),
  ).toHaveCount(1);

  await page.getByRole('button', { name: 'Continuar al exhaustivo' }).first().click();
  await expect(page.getByRole('heading', { name: 'Profundización personalizada' })).toBeVisible();

  const guardado = await page.evaluate((clave) => JSON.parse(localStorage.getItem(clave) ?? '{}'), CLAVE_ALMACEN);
  expect(guardado.modo).toBe('completo');
  expect(Object.keys(guardado.respuestas ?? {})).toHaveLength(50);

  await page.getByRole('button', { name: 'Saltar a los resultados sin profundizar' }).click();
  await expect(
    page.getByRole('heading', { name: 'Tu posición provisional y tus afinidades' }),
  ).toBeVisible();
});

test('resultados: un único ranking por afinidad, sin bloque de mayoritarios (orden del propietario)', async ({ page }) => {
  const sesion = crearSesionResultadosRapidos(0);
  await page.setViewportSize({ width: 320, height: 720 });
  await page.addInitScript(
    ({ clave, estado }) => localStorage.setItem(clave, JSON.stringify(estado)),
    { clave: CLAVE_ALMACEN, estado: sesion },
  );
  await page.goto('/');

  /* Orden del propietario (2026-07-12): sin bloque de mayoritarios por orden
     de voto — un único ranking por afinidad, de más a menos, y punto. */
  await expect(page.locator('.seccion--principales')).toHaveCount(0);
  await expect(
    page.getByRole('heading', { name: 'Partidos principales de las últimas generales' }),
  ).toHaveCount(0);
  await expect(page.getByText('Contexto por representación, no recomendación')).toHaveCount(0);

  const solapesContraste = await page
    .locator('.marcador-contraste--replegado > summary')
    .evaluateAll((resumenes) =>
      resumenes.flatMap((resumen) => {
        const titulo = resumen.querySelector('strong');
        const metrica = resumen.querySelector('span');
        if (!titulo || !metrica) return ['estructura incompleta'];
        const rango = document.createRange();
        rango.selectNodeContents(titulo);
        const cajaMetrica = metrica.getBoundingClientRect();
        const seSolapa = [...rango.getClientRects()].some(
          (cajaTitulo) =>
            Math.min(cajaTitulo.right, cajaMetrica.right) >
              Math.max(cajaTitulo.left, cajaMetrica.left) &&
            Math.min(cajaTitulo.bottom, cajaMetrica.bottom) >
              Math.max(cajaTitulo.top, cajaMetrica.top),
        );
        return seSolapa ? [resumen.textContent?.trim() ?? 'doble marcador'] : [];
      }),
    );
  expect(solapesContraste).toEqual([]);

  const maximos = page.locator('section').filter({
    has: page.getByRole('heading', { name: 'Máximos por afinidad' }),
  });
  const rankingTop = maximos.locator('.ranking').first();
  await expect(rankingTop.locator(':scope > li')).toHaveCount(3);
  const porcentajes = await rankingTop.locator('.ranking-pct').evaluateAll((elementos) =>
    elementos.map((elemento) => {
      const coincidencia = elemento.textContent?.match(/([0-9]+(?:,[0-9]+)?)\s*%\s*$/);
      return Number((coincidencia?.[1] ?? '0').replace(',', '.'));
    }),
  );
  expect(porcentajes).toEqual([...porcentajes].sort((a, b) => b - a));

  const nombresTop = await rankingTop.locator('.ranking-nombre').allInnerTexts();
  const resto = maximos.locator('.ranking-resto');
  await expect(resto).not.toHaveAttribute('open', '');
  await resto.getByText(/Ver el resto del ranking/).click();
  await expect(resto).toHaveAttribute('open', '');

  // Doble lectura: al desplegar un marcador se ven el disclaimer y las fechas
  // de ambos marcadores (corte del base y periodo del contraste).
  const marcadorDesplegado = page.locator('.marcador-contraste--replegado').first();
  await marcadorDesplegado.locator('summary').click();
  const lecturas = marcadorDesplegado.locator('.marcador-contraste__lecturas');
  await expect(lecturas).toContainText('Ninguna es «la verdad esencial»');
  await expect(lecturas).toContainText(/corte \d{4}-\d{2}-\d{2}/);
  await expect(lecturas).toContainText(/\d{4}-\d{2}-\d{2} – \d{4}-\d{2}-\d{2}/);

  await expect(resto.locator('.ranking-pos').first()).toHaveText('4.');
  const nombresResto = await resto.locator('.ranking-nombre').allInnerTexts();
  expect(nombresResto.some((nombre) => nombresTop.includes(nombre))).toBe(false);

  const auditoria = page.locator('.auditoria-afinidad');
  await expect(auditoria).not.toHaveAttribute('open', '');
  await expect(auditoria.getByText(/Auditar el cálculo y las fuentes/)).toBeVisible();
  /* El cuadrante se despliega solo (norma dura del atlas); las referencias
     doctrinales conservan su puerta bajo gesto y su chunk perezoso. */
  const abrirReferencias = page.getByRole('button', { name: 'Explorar corrientes afines' });
  await expect(abrirReferencias).toBeVisible();
  await expect(page.getByRole('button', { name: 'Abrir mapa interactivo' })).toHaveCount(0);
  await expect(page.locator('.mapa-politico')).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('.referencias-doctrinales__contenido')).toHaveCount(0);
  const recursosProfundos = await page.evaluate(() =>
    performance
      .getEntriesByType('resource')
      .map((entrada) => entrada.name)
      .filter((nombre) => /ReferenciasDoctrinales/u.test(nombre)),
  );
  expect(recursosProfundos).toEqual([]);
  expect((await abrirReferencias.boundingBox())?.height ?? 0).toBeGreaterThanOrEqual(44);
  const desborde = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(desborde).toBeLessThanOrEqual(1);
  const accesibilidad = await new AxeBuilder({ page })
    .include('[aria-labelledby="maximos-afinidad-titulo"]')
    .analyze();
  expect(accesibilidad.violations).toEqual([]);
});

test('el enlace compartido es mínimo, accesible y no toca la sesión local', async ({ page }) => {
  test.setTimeout(90_000);
  const sesion = crearSesionResultadosRapidos(1);
  const erroresNoCapturados: string[] = [];
  page.on('pageerror', (error) => erroresNoCapturados.push(error.message));
  await page.setViewportSize({ width: 320, height: 720 });
  await page.addInitScript(
    ({ clave, estado }) => {
      if (!localStorage.getItem(clave)) localStorage.setItem(clave, JSON.stringify(estado));

      const operaciones: string[] = [];
      Object.defineProperty(window, '__operacionesAlmacenEspectro', {
        configurable: true,
        value: operaciones,
      });
      for (const metodo of ['getItem', 'setItem', 'removeItem'] as const) {
        const original = Storage.prototype[metodo];
        Object.defineProperty(Storage.prototype, metodo, {
          configurable: true,
          value: function (...argumentos: string[]) {
            if (this === localStorage) operaciones.push(`${metodo}:${argumentos[0] ?? ''}`);
            return original.apply(this, argumentos as [string, string]);
          },
        });
      }
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async (texto: string) => sessionStorage.setItem('enlaceCompartido', texto),
        },
      });
    },
    { clave: CLAVE_ALMACEN, estado: sesion },
  );
  await page.goto('/?utm_source=no-compartir');
  await expect(
    page.getByRole('heading', { name: 'Tu posición provisional y tus afinidades' }),
  ).toBeVisible();

  const lanzadorCompartir = page.getByRole('button', {
    name: 'Abrir opciones para compartir y guardar',
  });
  await expect(lanzadorCompartir).toBeVisible();
  // El objetivo de este caso es el contrato de las APIs tras el lazy-load. En
  // móvil el enorme documento de resultados puede seguir recalculando altura
  // mientras Playwright intenta autodesplazarse, así que activamos el control
  // ya visible sin convertir esa estabilidad geométrica en parte de este test.
  await activarSinDesplazamiento(lanzadorCompartir);
  const bloque = page.locator('.compartir-resultados');
  await expect(bloque.getByRole('button', { name: 'Compartir enlace' })).toBeVisible();
  await expect(bloque.getByRole('button', { name: 'Copiar enlace' })).toBeVisible();
  await expect(bloque.getByText('Descargar tarjetas PNG una a una', { exact: true })).toBeVisible();
  await expect(bloque.getByRole('button', { name: 'Compartir imagen' })).toBeVisible();
  await expect(bloque).toContainText('No incluye respuestas, prioridades');
  await expect(bloque).toContainText('no caduca, no se puede revocar y no está firmado');

  await activarSinDesplazamiento(bloque.getByRole('button', { name: 'Copiar enlace' }));
  await expect(bloque.getByRole('status')).toContainText('Enlace copiado');
  const enlace = await page.evaluate(() => sessionStorage.getItem('enlaceCompartido'));
  expect(enlace).toMatch(/#r=1\.[A-Za-z0-9_-]+$/);
  expect(enlace).not.toContain('utm_source');
  expect(enlace).not.toContain('respuestas');
  expect(enlace).not.toContain('importantes');

  const botonCopiar = bloque.getByRole('button', { name: 'Copiar enlace' });
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async () => {
          throw new DOMException('Permiso denegado', 'NotAllowedError');
        },
      },
    });
    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      value: () => false,
    });
  });
  await botonCopiar.focus();
  await activarSinDesplazamiento(botonCopiar);
  await expect(bloque.getByRole('alert')).toContainText('no ha permitido copiar el enlace');
  await expect(bloque.getByRole('alert')).toContainText('tarjeta PNG');
  await expect(botonCopiar).toBeFocused();

  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (texto: string) => sessionStorage.setItem('enlaceCompartido', texto),
      },
    });
    Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
  });
  const botonCompartirEnlace = bloque.getByRole('button', { name: 'Compartir enlace' });
  await botonCompartirEnlace.focus();
  await activarSinDesplazamiento(botonCompartirEnlace);
  await expect(bloque.getByRole('status')).toContainText('no ofrece el menú de compartir');
  await expect(botonCompartirEnlace).toBeFocused();

  await page.evaluate(() => {
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: async (datos: ShareData) =>
        sessionStorage.setItem('datosShare', JSON.stringify({ title: datos.title, url: datos.url })),
    });
  });
  await botonCompartirEnlace.focus();
  await activarSinDesplazamiento(botonCompartirEnlace);
  await expect(bloque.getByRole('status')).toContainText('menú para compartir el enlace');
  const datosShare = await page.evaluate(() => sessionStorage.getItem('datosShare'));
  expect(JSON.parse(datosShare ?? '{}')).toMatchObject({
    title: 'Resultado de Espectro',
    url: enlace,
  });
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: async () => {
        throw new DOMException('Cancelado por la persona', 'AbortError');
      },
    });
  });
  await botonCompartirEnlace.focus();
  await activarSinDesplazamiento(botonCompartirEnlace);
  await expect(bloque.getByRole('alert')).toHaveCount(0);
  await expect(bloque.locator('.compartir-resultados__estado')).toBeEmpty();
  await expect(botonCompartirEnlace).toBeFocused();

  await page.evaluate(() => {
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: async () => {
        throw new DOMException('Compartición denegada', 'NotAllowedError');
      },
    });
  });
  await botonCompartirEnlace.focus();
  await activarSinDesplazamiento(botonCompartirEnlace);
  await expect(bloque.getByRole('status')).toContainText('No se ha podido abrir');
  await expect(bloque.getByRole('status')).toContainText('Enlace copiado');
  await expect(botonCompartirEnlace).toBeFocused();

  await activarSinDesplazamiento(
    bloque.getByText('Descargar tarjetas PNG una a una', { exact: true }),
  );
  const descargaBrujulaPrometida = page.waitForEvent('download');
  await activarSinDesplazamiento(bloque.getByRole('button', { name: 'Descargar brújula' }));
  const descargaBrujula = await descargaBrujulaPrometida;
  expect(descargaBrujula.suggestedFilename()).toBe('espectro-brujula.png');
  expect(await dimensionesPngDescargado(descargaBrujula)).toEqual({ ancho: 1_080, alto: 1_080 });
  await expect(bloque.getByRole('status')).toContainText('una tarjeta PNG');

  await page.evaluate(() => {
    Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
    Object.defineProperty(window, 'File', { configurable: true, value: undefined });
  });

  const descargaPrometida = page.waitForEvent('download');
  const botonCompartirImagen = bloque.getByRole('button', { name: 'Compartir imagen' });
  await botonCompartirImagen.focus();
  await activarSinDesplazamiento(botonCompartirImagen);
  const descarga = await descargaPrometida;
  expect(descarga.suggestedFilename()).toBe('espectro-resumen.png');
  expect(await dimensionesPngDescargado(descarga)).toEqual({ ancho: 1_200, alto: 630 });
  await expect(bloque.getByRole('status')).toContainText('hemos descargado la imagen');
  await expect(botonCompartirImagen).toBeFocused();
  expect(erroresNoCapturados).toEqual([]);

  const almacenAntes = await page.evaluate((clave) => localStorage.getItem(clave), CLAVE_ALMACEN);
  await page.evaluate(() => {
    const registro = (window as unknown as { __operacionesAlmacenEspectro?: string[] })
      .__operacionesAlmacenEspectro;
    registro?.splice(0, registro.length);
  });
  await page.goto(enlace!);
  await expect(page.getByRole('heading', { name: 'Resultado político compartido' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page.getByText('Vista compartida · solo lectura')).toBeVisible();
  await expect(page.getByText(/abrirlo no lee, guarda ni renueva el test/i)).toBeVisible();
  await expect(page.getByText('Aceleracionismo neonazi')).toHaveCount(0);

  const operaciones = await page.evaluate(
    () =>
      (window as unknown as { __operacionesAlmacenEspectro?: string[] })
        .__operacionesAlmacenEspectro ?? [],
  );
  // Única operación tolerada: LEER la preferencia de tema (UI del dispositivo,
  // nunca la sesión). Cualquier escritura o cualquier acceso a otra clave
  // sigue rompiendo el contrato de solo-lectura del snapshot.
  expect(operaciones.filter((op) => op !== 'getItem:espectro.v1.tema')).toEqual([]);
  const desborde = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(desborde).toBeLessThanOrEqual(1);
  const accesibilidad = await new AxeBuilder({ page }).include('main').analyze();
  expect(accesibilidad.violations).toEqual([]);

  // Una carga directa del enlace tampoco debe montar el reducer ni renovar la
  // sesión que ya existiera en el navegador receptor.
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Resultado político compartido' })).toBeVisible();
  const operacionesCargaDirecta = await page.evaluate(
    () =>
      (window as unknown as { __operacionesAlmacenEspectro?: string[] })
        .__operacionesAlmacenEspectro ?? [],
  );
  // Misma tolerancia única que arriba: leer la preferencia de tema no monta
  // el reducer ni toca la sesión; todo lo demás sigue prohibido.
  expect(operacionesCargaDirecta.filter((op) => op !== 'getItem:espectro.v1.tema')).toEqual([]);

  await page.getByRole('button', { name: 'Cerrar el enlace y volver a mi Espectro' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(
    page.getByRole('heading', { name: 'Tu posición provisional y tus afinidades' }),
  ).toBeVisible();
  const almacenDespues = await page.evaluate((clave) => localStorage.getItem(clave), CLAVE_ALMACEN);
  expect(almacenDespues).toBe(almacenAntes);
});

test('el hito de 150 persiste, ofrece perfil intermedio y reanuda sin repetirse', async ({
  page,
}) => {
  const sesion = crearSesionEnHitoIntermedio();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(
    ({ clave, estado }) => {
      if (!localStorage.getItem(clave)) {
        localStorage.setItem(
          clave,
          JSON.stringify({ ...estado, guardadoEn: new Date().toISOString() }),
        );
      }
    },
    { clave: CLAVE_ALMACEN, estado: sesion },
  );
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Has llegado a 150 respuestas' })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Ver perfil con profundidad intermedia' }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Seguir con el exhaustivo' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Has llegado a 150 respuestas' })).toBeVisible();

  const desborde = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(desborde).toBeLessThanOrEqual(1);
  const auditoriaHito = await new AxeBuilder({ page }).include('main').analyze();
  expect(auditoriaHito.violations).toEqual([]);

  await page.getByRole('button', { name: 'Ver perfil con profundidad intermedia' }).click();
  await expect(
    page.getByRole('heading', { name: 'Tu perfil con profundidad intermedia' }),
  ).toBeVisible();
  await expect(page.getByText('Una lectura profunda, todavía provisional')).toBeVisible();
  await expect(page.getByText(/150 ítems respondidos/)).toBeVisible();
  await esperarMapaDesplegado(page);
  /* Orden del propietario (2026-07-12): el atlas completo es el ÚNICO modo,
     sin conmutadores de profundidad ni variante simplificada, en ningún nivel. */
  await expect(page.locator('.mapa-plano--brujula .mapa-zona--interactiva')).toHaveCount(
    TOTAL_CORRIENTES_MAPA,
  );
  await expect(page.getByLabel('Incluir corrientes de profundidad')).toHaveCount(0);
  await expect(page.getByLabel('Explorar corrientes ideológicas')).toHaveCount(0);
  await page.reload();
  await expect(
    page.getByRole('heading', { name: 'Tu perfil con profundidad intermedia' }),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Seguir con el exhaustivo' }).first().click();
  await expect(page.getByRole('radio', { name: 'Muy de acuerdo', exact: true })).toBeVisible();
  const preguntaPendiente = await textoPregunta(page);
  const guardado = await page.evaluate(
    (clave) => JSON.parse(localStorage.getItem(clave) ?? '{}'),
    CLAVE_ALMACEN,
  );
  expect(guardado.fase).toBe('cuestionario');
  expect(guardado.hitoIntermedio150Visto).toBe(true);
  expect(guardado.perfilIntermedio).toBe(false);
  expect(Object.keys(guardado.respuestas ?? {})).toHaveLength(150);

  await page.reload();
  await expect.poll(() => textoPregunta(page)).toBe(preguntaPendiente);
  await page.keyboard.press('3');
  await page.getByRole('button', { name: 'Siguiente', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Has llegado a 150 respuestas' })).toHaveCount(0);

  await page.evaluate((clave) => {
    const estado = JSON.parse(localStorage.getItem(clave) ?? '{}');
    localStorage.setItem(
      clave,
      JSON.stringify({ ...estado, fase: 'hito-intermedio', perfilIntermedio: false }),
    );
  }, CLAVE_ALMACEN);
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException('Almacenamiento bloqueado', 'QuotaExceededError');
    };
  });
  await page.reload();
  await expect(
    page.getByText('Tu avance se conserva solo en memoria mientras esta pestaña siga abierta.'),
  ).toBeVisible();
  await expect(page.getByText(/No cierres ni recargues la página/).last()).toBeVisible();
});

test('las ramas condicionales aparecen y sus respuestas se limpian al cambiar el motivo', async ({ page }) => {
  await page.addInitScript((clave) => {
    localStorage.setItem(
      clave,
      JSON.stringify({
        version: 3,
        versionInstrumento: '4',
        guardadoEn: new Date().toISOString(),
        fase: 'revision',
        ccaa: '',
        eleccion: 'generales',
        modo: 'completo',
        respuestas: { 'eco-001': 0 },
        importantes: {},
        modulosActivos: ['trabajo-estado-sindicatos'],
        indice: 0,
        editando: false,
      }),
    );
  }, CLAVE_ALMACEN);
  await page.goto('/');

  const padre = page.locator('.revision-lista li').filter({
    hasText: 'Cobrar impuestos mediante la coacción legal del Estado es, en esencia, una forma de robo.',
  });
  await padre.getByRole('button', { name: 'Editar' }).click();
  await page.getByText('Muy de acuerdo', { exact: true }).click();
  await page.getByRole('button', { name: 'Guardar y volver a la revisión' }).click();

  const hijaTexto = 'Mi rechazo a los impuestos se debe a que la propiedad privada no debería financiar servicios colectivos sin consentimiento individual.';
  const hija = page.locator('.revision-lista li').filter({ hasText: hijaTexto });
  await expect(hija).toBeVisible();
  await hija.getByRole('button', { name: 'Editar' }).click();
  await page.getByText('Muy de acuerdo', { exact: true }).click();
  await page.getByRole('button', { name: 'Guardar y volver a la revisión' }).click();

  await padre.getByRole('button', { name: 'Editar' }).click();
  await page.getByText('Neutral', { exact: true }).click();
  await page.getByRole('button', { name: 'Guardar y volver a la revisión' }).click();
  await expect(page.getByText(hijaTexto, { exact: true })).toHaveCount(0);

  const guardado = await page.evaluate((clave) => JSON.parse(localStorage.getItem(clave) ?? '{}'), CLAVE_ALMACEN);
  expect(guardado.respuestas?.['lab-010']).toBeUndefined();
});

test('si localStorage falla, avisa y el cuestionario continúa en memoria', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException('Almacenamiento bloqueado', 'QuotaExceededError');
    };
  });
  await page.goto('/');
  await expect(page.getByRole('alert')).toContainText('Esta sesión no puede guardarse');

  await page.getByRole('button', { name: 'Empezar el test' }).click();
  await page.getByText('De acuerdo', { exact: true }).click();
  await expect(page.getByRole('button', { name: 'Siguiente', exact: true })).toBeEnabled();

  await page.evaluate(() =>
    window.dispatchEvent(new Event('espectro:actualizacion-disponible')),
  );
  await expect(page.getByText(/actualización queda aplazada/i)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Actualizar ahora' })).toBeDisabled();
});

test('si el almacenamiento vuelve a funcionar, retira el bloqueo transitorio', async ({ page }) => {
  await page.addInitScript(() => {
    const original = Storage.prototype.setItem;
    let fallosPendientes = 1;
    Storage.prototype.setItem = function (...argumentos) {
      if (fallosPendientes > 0) {
        fallosPendientes -= 1;
        throw new DOMException('Fallo transitorio', 'QuotaExceededError');
      }
      return original.apply(this, argumentos as [string, string]);
    };
  });
  await page.goto('/');
  await expect(page.getByText('Esta sesión no puede guardarse.')).toBeVisible();

  await page.getByRole('button', { name: 'Empezar el test' }).click();
  await expect(page.getByText('Esta sesión no puede guardarse.')).toHaveCount(0);
  const guardado = await page.evaluate((clave) => localStorage.getItem(clave), CLAVE_ALMACEN);
  expect(guardado).toContain('cuestionario');
});

test('autonómicas sin comunidad no mezclan partidos de territorios distintos', async ({ page }) => {
  await page.addInitScript((clave) => {
    localStorage.setItem(
      clave,
      JSON.stringify({
        version: 3,
        versionInstrumento: '4',
        guardadoEn: new Date().toISOString(),
        fase: 'resultados',
        ccaa: '',
        eleccion: 'autonomicas',
        modo: 'rapido',
        respuestas: { 'eco-001': 1 },
        importantes: {},
        modulosActivos: [],
        indice: 0,
        editando: false,
      }),
    );
  }, CLAVE_ALMACEN);
  await page.goto('/');

  await expect(page.getByText('Falta la comunidad autónoma.')).toBeVisible();
  await expect(page.getByText(/no mostramos un ranking que mezcle/)).toBeVisible();
  await expect(page.locator('.ranking')).toHaveCount(0);

  await page.getByLabel('Tipo de elección').selectOption('municipales');
  await expect(page.getByText('Falta la comunidad autónoma.')).toBeVisible();
  await expect(page.locator('.ranking')).toHaveCount(0);

  await page.getByLabel('Comunidad autónoma').selectOption('madrid');
  await expect(page.getByText('Falta la comunidad autónoma.')).toHaveCount(0);
  const maximos = page.locator('section').filter({
    has: page.getByRole('heading', { name: 'Máximos por afinidad' }),
  });
  await expect(maximos.locator('.ranking').first()).toBeVisible();
});

test('un partido monotemático aparece sin porcentaje de afinidad general', async ({ page }) => {
  await page.addInitScript((clave) => {
    localStorage.setItem(
      clave,
      JSON.stringify({
        version: 3,
        versionInstrumento: '4',
        guardadoEn: new Date().toISOString(),
        fase: 'resultados',
        ccaa: '',
        eleccion: 'generales',
        modo: 'completo',
        respuestas: { 'dem-036': 2 },
        importantes: {},
        modulosActivos: ['democracia-instituciones'],
        indice: 0,
        editando: false,
      }),
    );
  }, CLAVE_ALMACEN);
  await page.goto('/');

  await esperarMapaDesplegado(page);
  await expect(page.locator('.mapa-plano--brujula .mapa-zona--interactiva')).toHaveCount(
    TOTAL_CORRIENTES_MAPA,
  );
  await expect(page.getByLabel('Incluir corrientes de profundidad')).toHaveCount(0);
  await expect(
    page.getByText(
      new RegExp(
        `El atlas completo es el único modo: incluye ${TOTAL_CORRIENTES_MAPA} regiones geométricas, ${ANCLAS_BLOQUEADAS_MAPA.length} anclas huecas en investigación y ${ENTRADAS_CONTEXTO_ATLAS} entradas contextuales`,
        'i',
      ),
    ),
  ).toBeVisible();

  const coincidencia = page.locator('.coincidencia-especifica').filter({
    hasText: 'Escaños en Blanco',
  });
  await expect(coincidencia).toBeVisible();
  await expect(coincidencia).toContainText('Muy de acuerdo');
  await expect(coincidencia).not.toContainText('%');
  await expect(page.locator('.ranking').getByText('Escaños en Blanco')).toHaveCount(0);
});

test('una referencia violenta se contextualiza sin porcentaje ni identidad personal', async ({ page }) => {
  await page.addInitScript((clave) => {
    localStorage.setItem(
      clave,
      JSON.stringify({
        version: 3,
        versionInstrumento: '4',
        guardadoEn: new Date().toISOString(),
        fase: 'resultados',
        ccaa: '',
        eleccion: 'generales',
        modo: 'completo',
        respuestas: {
          'lim-002': 2,
          'lim-003': 2,
          'lim-005': 2,
          'lim-006': -2,
          'lim-007': 2,
          'dr-024': 2,
          'dr-025': -2,
        },
        importantes: {},
        modulosActivos: ['limites-antipluralismo', 'derecha-radical'],
        indice: 0,
        editando: false,
      }),
    );
  }, CLAVE_ALMACEN);
  await page.goto('/');

  await abrirReferenciasDoctrinales(page);
  const referencia = page.locator('.referencia-resultado').filter({
    hasText: 'Aceleracionismo neonazi',
  });
  await expect(referencia).toBeVisible();
  await expect(referencia.getByText('Patrón doctrinal sensible')).toBeVisible();
  await expect(referencia).not.toContainText('%');
  await referencia.getByRole('button', { name: /Más información sobre/ }).click();
  await expect(referencia).toContainText(/no implica pertenencia, militancia, delito ni intención/i);
});

test('reintentar el 3D vuelve a solicitar el chunk después de un fallo', async ({ page }) => {
  let fallos = 0;
  const patron3D = /\/assets\/Mapa3D-[^/]+\.js(?:\?.*)?$/;
  await page.route(patron3D, async (ruta) => {
    fallos += 1;
    await ruta.abort('failed');
  });
  await page.addInitScript((clave) => {
    localStorage.setItem(
      clave,
      JSON.stringify({
        version: 3,
        versionInstrumento: '4',
        guardadoEn: new Date().toISOString(),
        fase: 'resultados',
        ccaa: '',
        eleccion: 'generales',
        modo: 'rapido',
        respuestas: { 'eco-001': 0 },
        importantes: {},
        modulosActivos: [],
        indice: 0,
        editando: false,
      }),
    );
  }, CLAVE_ALMACEN);
  await page.goto('/');
  await esperarMapaDesplegado(page);
  await page.getByRole('button', { name: 'Ver en 3D' }).click();
  await expect(page.getByText('No se ha podido abrir el visor 3D.')).toBeVisible();

  await page.unroute(patron3D);
  await page.getByRole('button', { name: 'Recargar y reintentar el 3D' }).click();
  await expect(page.getByText(/Arrastra para girar|no puede mostrar el cubo 3D/)).toBeVisible();
  expect(fallos).toBeGreaterThan(0);
});

test('móvil estrecho no desborda y conserva objetivos táctiles utilizables', async ({ browser }) => {
  const contextoMovil = await browser.newContext({
    baseURL: BASE_URL_E2E,
    viewport: { width: 320, height: 700 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await contextoMovil.newPage();
  try {
    await page.goto('/');
    const desbordePortada = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(desbordePortada).toBeLessThanOrEqual(1);

    await page.getByRole('button', { name: 'Empezar el test' }).click();
    const caja = await page.getByRole('radio', { name: 'Muy de acuerdo', exact: true })
      .locator('..')
      .boundingBox();
    expect(caja?.height ?? 0).toBeGreaterThanOrEqual(44);
    const desbordePregunta = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(desbordePregunta).toBeLessThanOrEqual(1);
  } finally {
    await contextoMovil.close();
  }
});

test('el recuento del plano coincide con los puntos realmente dibujados', async ({ page }) => {
  await page.addInitScript((clave) => {
    localStorage.setItem(
      clave,
      JSON.stringify({
        version: 3,
        versionInstrumento: '4',
        guardadoEn: new Date().toISOString(),
        fase: 'resultados',
        ccaa: '',
        eleccion: 'generales',
        modo: 'rapido',
        respuestas: { 'eco-001': 0 },
        importantes: {},
        modulosActivos: [],
        indice: 0,
        editando: false,
      }),
    );
  }, CLAVE_ALMACEN);
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Tu posición provisional y tus afinidades' }),
  ).toBeVisible();

  await esperarMapaDesplegado(page);
  await page.getByText('Economía × Territorio', { exact: true }).click();
  const puntos = page.locator(
    '.mapa-plano:not(.mapa-plano--brujula) .mapa-punto[data-tipo="partido"]',
  );
  const totalDibujado = await puntos.count();
  await expect(page.locator('.mapa-exclusiones').getByText(/En este plano:/)).toContainText(
    `${totalDibujado} de`,
  );
});

test('la brújula degrada el fondo y revela corrientes solo al enfocar o tocar', async ({ page }) => {
  await page.addInitScript((clave) => {
    localStorage.setItem(
      clave,
      JSON.stringify({
        version: 3,
        versionInstrumento: '4',
        guardadoEn: new Date().toISOString(),
        fase: 'resultados',
        ccaa: '',
        eleccion: 'generales',
        modo: 'rapido',
        respuestas: { 'eco-001': 0 },
        importantes: {},
        modulosActivos: [],
        indice: 0,
        editando: false,
      }),
    );
  }, CLAVE_ALMACEN);
  await page.goto('/');

  await esperarMapaDesplegado(page);
  await expect(page.locator('.mapa-plano--brujula radialGradient')).toHaveCount(4);
  await expect(page.locator('.mapa-plano--brujula svg')).toHaveAttribute(
    'aria-label',
    /Propiedad y mercado por Poder político/i,
  );
  /* Atlas completo como único modo: sin conmutador y sin exigir clic. */
  await expect(page.getByLabel('Incluir corrientes de profundidad')).toHaveCount(0);
  await expect(page.locator('.mapa-plano--brujula .mapa-zona--interactiva')).toHaveCount(
    TOTAL_CORRIENTES_MAPA,
  );
  await expect(page.locator('.mapa-plano--brujula .mapa-ancla-bloqueada')).toHaveCount(
    ANCLAS_BLOQUEADAS_MAPA.length,
  );
  await expect(
    page.locator('.mapa-plano--brujula .mapa-punto[data-tipo="referencia"]'),
  ).toHaveCount(0);
  await expect(page.locator('.mapa-plano--brujula .mapa-zona__nombre')).toHaveCount(0);
  await expect(page.getByText(/regiones están sin rotular/i)).toBeVisible();
  const partidosBrujula = page.locator(
    '.mapa-plano--brujula .mapa-punto[data-tipo="partido"]',
  );
  const totalPartidosBrujula = await partidosBrujula.count();
  expect(totalPartidosBrujula).toBeGreaterThan(0);
  await expect(page.getByLabel('Localizar un partido').locator('option')).toHaveCount(
    totalPartidosBrujula + 1,
  );
  for (const id of await partidosBrujula.evaluateAll((puntos) =>
    puntos.map((punto) => punto.getAttribute('data-entidad-id')).filter(Boolean),
  )) {
    await expect(
      page.getByLabel('Localizar un partido').locator(`option[value="${id}"]`),
    ).toHaveCount(1);
  }
  expect(
    await page.locator(
      '.mapa-plano--brujula .mapa-punto[data-tipo="partido"][data-evidencia="provisional"]',
    ).count(),
  ).toBeGreaterThan(0);
  await expect(
    page.getByLabel('Buscar en el atlas').locator('option', { hasText: 'Posadismo' }),
  ).toHaveCount(1);
  await expect(
    page.getByText(
      new RegExp(
        `El atlas completo es el único modo: incluye ${TOTAL_CORRIENTES_MAPA} regiones geométricas`,
        'i',
      ),
    ),
  ).toBeVisible();
  const respuestasAntes = await page.evaluate(
    (clave) => Object.keys(JSON.parse(localStorage.getItem(clave) ?? '{}').respuestas ?? {}).length,
    CLAVE_ALMACEN,
  );
  /* Sin variante simplificada que restar: la profundidad no es conmutable. */
  await expect(page.getByLabel('Incluir corrientes de profundidad')).toHaveCount(0);
  await expect(page.locator('.mapa-plano--brujula .mapa-zona--interactiva')).toHaveCount(
    TOTAL_CORRIENTES_MAPA,
  );

  const zonas = page.locator('.mapa-plano--brujula .mapa-zona--interactiva');
  await expect(
    page.locator('.mapa-plano--brujula .mapa-zona--interactiva[tabindex="0"]'),
  ).toHaveCount(1);
  const zona = zonas.first();
  const trazado = (await zona.getAttribute('d')) ?? '';
  expect(trazado.match(/M/g)).toHaveLength(1); // polígono vectorial, no franjas rasterizadas
  await zona.focus();
  await expect(page.locator('.mapa-corriente-lectura')).toBeVisible();
  const idInicial = await zona.getAttribute('data-zona-id');
  await zona.press('ArrowRight');
  const idTrasFlecha = await page.evaluate(
    () => document.activeElement?.getAttribute('data-zona-id'),
  );
  expect(idTrasFlecha).not.toBe(idInicial);
  await zona.press('Enter');
  await expect(page.getByRole('button', { name: /Cerrar explicación de/i })).toBeVisible();

  const ficha = page.locator('.mapa-corriente-lectura .ficha-ideologia');
  const tituloFijado = await ficha.getByRole('heading', { level: 3 }).innerText();
  const otraZona = zonas.nth(2);
  await otraZona.hover();
  await expect(ficha.getByRole('heading', { level: 3 })).toHaveText(tituloFijado);
  await otraZona.click();
  await expect(ficha.getByRole('heading', { level: 3 })).not.toHaveText(tituloFijado);

  /* 2026-07-12: las 20 anclas en investigación quedaron instrumentadas
     (contrato 92/0) — no queda ningún ancla hueca y la antigua
     cuarta-teoria-politica se abre como región publicada con ancla editorial. */
  await expect(page.locator('.mapa-plano--brujula .mapa-ancla-bloqueada')).toHaveCount(0);
  const zonaCuarta = page.locator(
    '.mapa-plano--brujula .mapa-zona--interactiva[data-zona-id="cuarta-teoria-politica"]',
  );
  await expect(zonaCuarta).toHaveCount(1);
  await zonaCuarta.click();
  await expect(ficha.getByRole('heading', { level: 3 })).toHaveText('Cuarta Teoría Política');
  await expect(ficha.getByLabel('Ancla editorial de la corriente')).toBeVisible();

  const buscadorAtlas = page.getByLabel('Buscar en el atlas');
  const rotuloRawls = buscadorAtlas.locator(
    'option[value="rotulo-original:liberalismo-igualitario-rawlsiano"]',
  );
  await expect(rotuloRawls).toContainText('Distributismo libertario');
  await expect(rotuloRawls).toContainText('Distributist Libertarianism');
  await expect(rotuloRawls).toContainText('contexto histórico o comparado');
  await buscadorAtlas.selectOption('rotulo-original:liberalismo-igualitario-rawlsiano');
  await expect(ficha).toHaveAttribute('data-vista', 'rotulo-original');
  await expect(ficha.getByRole('heading', { level: 3 })).toHaveText('Distributismo libertario');
  await expect(ficha).toContainText('no participa en el cálculo de afinidad');
  await expect(ficha.getByLabel('Ancla editorial de la corriente')).toHaveCount(0);
  await page.getByRole('button', { name: 'Más información', exact: true }).click();
  await expect(ficha).toContainText('Rótulo literal de la imagen: Distributist Libertarianism');
  await expect(ficha).toContainText('no las dibuja ni las trata como una posición calculada');

  await buscadorAtlas.selectOption('liberalismo-igualitario-rawlsiano');
  await expect(ficha).toHaveAttribute('data-vista', 'entrada-atlas');
  await expect(ficha.getByRole('heading', { level: 3 })).toHaveText(
    'Liberalismo igualitario rawlsiano',
  );
  await expect(ficha.getByLabel('Ancla editorial de la corriente')).toBeVisible();
  /* Sin vetos editoriales (orden del propietario, 2026-07-12): la ficha del
     atlas declara que el ancla es editorial y no una proyección calculada;
     la afinidad queda guardada por su regla de publicación, no por veto. */
  await expect(ficha).toContainText('región educativa publicada del atlas');
  await expect(ficha).toContainText(
    'no es una proyección calculada de esta referencia ni una coincidencia doctrinal',
  );
  await page.getByRole('button', { name: 'Ocultar información', exact: true }).click();

  await buscadorAtlas.selectOption('posadismo');
  await page.getByRole('button', { name: 'Más información', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Fuentes marco' })).toBeVisible();
  /* Sin conmutadores: el buscador del atlas siempre está operativo y la
     lectura de la corriente se cierra con su propio control, no apagando capas. */
  await expect(page.getByLabel('Incluir corrientes de profundidad')).toHaveCount(0);
  await expect(page.getByLabel('Explorar corrientes ideológicas')).toHaveCount(0);
  await expect(buscadorAtlas).toBeEnabled();
  await page.getByRole('button', { name: 'Ocultar información', exact: true }).click();
  const respuestasDespues = await page.evaluate(
    (clave) => Object.keys(JSON.parse(localStorage.getItem(clave) ?? '{}').respuestas ?? {}).length,
    CLAVE_ALMACEN,
  );
  expect(respuestasDespues).toBe(respuestasAntes);
});

test('el plano detallado ofrece objetivos táctiles reales y desambigua los cúmulos', async ({
  browser,
}) => {
  const contexto = await browser.newContext({
    baseURL: BASE_URL_E2E,
    viewport: { width: 390, height: 844 },
    hasTouch: true,
  });
  const page = await contexto.newPage();
  try {
    const sesion = crearSesionResultadosRapidos(-1);
    await page.addInitScript(
      ({ clave, estado }) => localStorage.setItem(clave, JSON.stringify(estado)),
      { clave: CLAVE_ALMACEN, estado: sesion },
    );
    await page.goto('/');
    await esperarMapaDesplegado(page);
    const planoDetalle = page.locator('.mapa-plano:not(.mapa-plano--brujula)');
    await planoDetalle.scrollIntoViewIfNeeded();
    const puntos = planoDetalle.locator('.mapa-punto');
    expect(await puntos.count()).toBeGreaterThan(3);

    /* Todo punto del plano detallado (usuario, partidos y referencias) y toda
       ancla en investigación de la brújula ofrecen un objetivo de toque real
       de al menos 44×44 px en 320/360/390. */
    for (const ancho of [320, 360, 390]) {
      await page.setViewportSize({ width: ancho, height: 844 });
      const objetivos = await planoDetalle
        .locator('.mapa-punto .mapa-punto__hit')
        .evaluateAll((circulos) =>
          circulos.map((circulo) => {
            const caja = circulo.getBoundingClientRect();
            return Math.min(caja.width, caja.height);
          }),
        );
      expect(objetivos.length).toBeGreaterThan(3);
      expect(
        Math.min(...objetivos),
        `objetivo táctil mínimo del plano detallado con viewport ${ancho}`,
      ).toBeGreaterThanOrEqual(44);
      /* 2026-07-12: las 20 anclas en investigación quedaron instrumentadas
         (contrato 92/0); si alguna reapareciera, su objetivo táctil vuelve a
         exigirse ≥44 px. */
      const objetivosAnclas = await page
        .locator('.mapa-plano--brujula .mapa-ancla-bloqueada__hit')
        .evaluateAll((circulos) =>
          circulos.map((circulo) => {
            const caja = circulo.getBoundingClientRect();
            return Math.min(caja.width, caja.height);
          }),
        );
      if (objetivosAnclas.length > 0) {
        expect(
          Math.min(...objetivosAnclas),
          `objetivo táctil mínimo de las anclas en investigación con viewport ${ancho}`,
        ).toBeGreaterThanOrEqual(44);
      } else {
        expect(objetivosAnclas).toHaveLength(0);
      }
    }

    /* Un cúmulo no premia al punto de encima: el toque abre la
       desambiguación y cada miembro sigue siendo alcanzable. */
    const cumulo = await puntos.evaluateAll((nodos) => {
      const posiciones = nodos.map((nodo) => {
        const hit = nodo.querySelector('.mapa-punto__hit');
        return {
          id: nodo.getAttribute('data-entidad-id') ?? '',
          x: Number(hit?.getAttribute('cx')),
          y: Number(hit?.getAttribute('cy')),
        };
      });
      const origen = posiciones.find((candidato) =>
        posiciones.some(
          (otro) =>
            otro.id !== candidato.id &&
            Math.hypot(otro.x - candidato.x, otro.y - candidato.y) <= 32,
        ),
      );
      return origen?.id ?? null;
    });
    if (cumulo) {
      await planoDetalle.locator(`.mapa-punto[data-entidad-id="${cumulo}"]`).click({ force: true });
      const panelCumulo = page.locator('.mapa-cumulo');
      await expect(panelCumulo).toBeVisible();
      /* El panel recibe el foco al abrirse (anuncio para lector de pantalla). */
      await expect(panelCumulo).toBeFocused();
      const opciones = panelCumulo.getByRole('button');
      expect(await opciones.count()).toBeGreaterThan(1);
      await opciones.last().click();
      await expect(panelCumulo).toHaveCount(0);
      await expect(page.locator('.mapa-lectura')).toBeVisible();
      /* Al resolver, el foco vuelve al punto elegido, no se pierde en body. */
      await expect
        .poll(async () =>
          page.evaluate(() => document.activeElement?.getAttribute('data-entidad-id') ?? null),
        )
        .not.toBeNull();
    }

    /* El teclado no depende del cúmulo: cada punto conserva su tabulador. */
    const primerPunto = puntos.first();
    await primerPunto.focus();
    await primerPunto.press('Enter');
    await expect(page.locator('.mapa-lectura')).toBeVisible();
  } finally {
    await contexto.close();
  }
});

test('el atlas completo es el único modo: sin conmutadores ni variante simplificada (orden del propietario)', async ({
  page,
}) => {
  const sesion = crearSesionResultadosRapidos(1);
  await page.addInitScript(
    ({ clave, estado }) => localStorage.setItem(clave, JSON.stringify(estado)),
    { clave: CLAVE_ALMACEN, estado: sesion },
  );
  await page.goto('/');
  await esperarMapaDesplegado(page);

  /* Ningún conmutador de capas: ni corrientes ni profundidad. */
  await expect(page.getByLabel('Explorar corrientes ideológicas')).toHaveCount(0);
  await expect(page.getByLabel('Incluir corrientes de profundidad')).toHaveCount(0);

  /* El atlas completo está presente de entrada, con buscador operativo. */
  await expect(page.locator('.mapa-plano--brujula .mapa-zona--interactiva')).toHaveCount(
    TOTAL_CORRIENTES_MAPA,
  );
  await expect(page.locator('.mapa-plano--brujula .mapa-ancla-bloqueada')).toHaveCount(
    ANCLAS_BLOQUEADAS_MAPA.length,
  );
  await expect(page.getByLabel('Buscar en el atlas')).toBeEnabled();
  await expect(
    page.locator('.mapa-plano--brujula .mapa-punto[data-tipo="usuario"]'),
  ).toHaveCount(1);
  await expect(page.locator('.mapa-plano--brujula .mapa-plano__marco')).toHaveCount(1);
  const esquinas = page.locator('.mapa-plano--brujula .mapa-plano__esquinas text');
  expect(await esquinas.count()).toBeGreaterThanOrEqual(4);
});

test('la brújula móvil distingue evidencia provisional y resuelve con seguridad los puntos disponibles', async ({
  browser,
}) => {
  const contexto = await browser.newContext({
    baseURL: BASE_URL_E2E,
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await contexto.newPage();
  try {
    await page.addInitScript((clave) => {
      localStorage.setItem(
        clave,
        JSON.stringify({
          version: 3,
          versionInstrumento: '4',
          guardadoEn: new Date().toISOString(),
          fase: 'resultados',
          ccaa: '',
          eleccion: 'generales',
          modo: 'rapido',
          respuestas: { 'eco-001': 0 },
          importantes: {},
          modulosActivos: [],
          indice: 0,
          editando: false,
        }),
      );
    }, CLAVE_ALMACEN);
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: 'Tu posición provisional y tus afinidades' }),
    ).toBeVisible();
    await esperarMapaDesplegado(page);
    const anchoDocumento = await page.evaluate(() => ({
      contenido: document.documentElement.scrollWidth,
      ventana: window.innerWidth,
    }));
    expect(anchoDocumento.contenido).toBeLessThanOrEqual(anchoDocumento.ventana);
    await page.evaluate(() =>
      document.querySelector('.mapa-plano--brujula')?.scrollIntoView({ block: 'center' }),
    );

    const partidos = page.locator('.mapa-plano--brujula .mapa-punto[data-tipo="partido"]');
    await expect(partidos.first()).toBeVisible();
    const numeroPartidos = await partidos.count();
    expect(numeroPartidos).toBeGreaterThanOrEqual(1);
    for (const ancho of [320, 360, 390]) {
      await page.setViewportSize({ width: ancho, height: 844 });
      const tamanos = await partidos.evaluateAll((puntos) =>
        puntos.map((punto) => {
          const caja = punto.getBoundingClientRect();
          return { ancho: caja.width, alto: caja.height };
        }),
      );
      expect(
        Math.min(...tamanos.map((caja) => caja.ancho)),
        `ancho táctil de partido con viewport ${ancho}`,
      ).toBeGreaterThanOrEqual(44);
      expect(
        Math.min(...tamanos.map((caja) => caja.alto)),
        `alto táctil de partido con viewport ${ancho}`,
      ).toBeGreaterThanOrEqual(44);
    }

    const selectorPartidos = page.getByLabel('Localizar un partido');
    const opcionesPartido = selectorPartidos.locator('option:not([value=""])');
    await expect(opcionesPartido).toHaveCount(numeroPartidos);
    const textosOpciones = await opcionesPartido.allInnerTexts();
    const indiceProvisional = textosOpciones.findIndex((texto) =>
      texto.includes('posición provisional'),
    );
    const opcionElegida = opcionesPartido.nth(indiceProvisional >= 0 ? indiceProvisional : 0);
    const primerId = await opcionElegida.getAttribute('value');
    expect(primerId).toBeTruthy();
    await selectorPartidos.selectOption(primerId!);
    const primerPartido = page.locator(
      `.mapa-plano--brujula .mapa-punto[data-entidad-id="${primerId}"]`,
    );
    await expect(primerPartido).toHaveAttribute(
      'data-evidencia',
      indiceProvisional >= 0 ? 'provisional' : 'solida',
    );
    await expect(primerPartido).toHaveAttribute('aria-pressed', 'true');
    if (indiceProvisional >= 0) {
      await expect(primerPartido).toHaveAttribute('aria-label', /Posición provisional/i);
    }

    await selectorPartidos.selectOption('');
    const origenCumulo = await partidos.evaluateAll((puntos) => {
      const posiciones = puntos.map((punto) => {
        const forma = punto.querySelector('.mapa-punto__forma');
        return {
          id: punto.getAttribute('data-entidad-id') ?? '',
          x: Number(forma?.getAttribute('cx')),
          y: Number(forma?.getAttribute('cy')),
        };
      });
      return posiciones.find((origen) =>
        posiciones.some(
          (otro) =>
            otro.id !== origen.id && Math.hypot(otro.x - origen.x, otro.y - origen.y) <= 32,
        ),
      )?.id ?? null;
    });
    const cumulo = page.locator('.mapa-cumulo');
    if (origenCumulo) {
      await page
        .locator(`.mapa-plano--brujula .mapa-punto[data-entidad-id="${origenCumulo}"]`)
        .tap();
      await expect(cumulo).toBeVisible();
      const botonesCumulo = cumulo.getByRole('button');
      expect(await botonesCumulo.count()).toBeGreaterThanOrEqual(2);
      const nombresCumulo = await botonesCumulo.allInnerTexts();
      expect(new Set(nombresCumulo).size).toBe(nombresCumulo.length);
      const cajasCumulo = await botonesCumulo.evaluateAll((botones) =>
        botones.map((boton) => boton.getBoundingClientRect().height),
      );
      expect(Math.min(...cajasCumulo)).toBeGreaterThanOrEqual(44);
    } else {
      await expect(cumulo).toHaveCount(0);
    }
  } finally {
    await contexto.close();
  }
});

test('resultados abiertos no introducen violaciones automáticas de accesibilidad', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript((clave) => {
    localStorage.setItem(
      clave,
      JSON.stringify({
        version: 3,
        versionInstrumento: '4',
        guardadoEn: new Date().toISOString(),
        fase: 'resultados',
        ccaa: 'madrid',
        eleccion: 'generales',
        modo: 'rapido',
        respuestas: {
          'eco-001': 1,
          'dem-008': 2,
          'dem-021': 2,
          'soc-001': 1,
          'ter-001': -1,
        },
        importantes: {},
        modulosActivos: [],
        indice: 0,
        editando: false,
      }),
    );
  }, CLAVE_ALMACEN);
  await page.goto('/');
  await page.locator('details.detalle-partido').evaluateAll((detalles) => {
    for (const detalle of detalles) (detalle as HTMLDetailsElement).open = true;
  });
  await page.waitForTimeout(100);

  const auditoria = await new AxeBuilder({ page }).include('main').analyze();
  expect(auditoria.violations).toEqual([]);
});

test('resultados y visor 3D siguen disponibles sin conexión tras instalar la PWA', async ({
  page,
  context,
}) => {
  await page.goto('/');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller)))
    .toBe(true);

  await page.evaluate((clave) => {
    localStorage.setItem(
      clave,
      JSON.stringify({
        version: 3,
        versionInstrumento: '4',
        guardadoEn: new Date().toISOString(),
        fase: 'resultados',
        ccaa: '',
        eleccion: 'generales',
        modo: 'rapido',
        respuestas: { 'eco-001': 0 },
        importantes: {},
        modulosActivos: [],
        indice: 0,
        editando: false,
      }),
    );
  }, CLAVE_ALMACEN);

  await context.setOffline(true);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(
    page.getByRole('heading', { name: 'Tu posición provisional y tus afinidades' }),
  ).toBeVisible();
  await esperarMapaDesplegado(page);
  await page.getByRole('button', { name: 'Ver en 3D' }).click();
  await expect(page.getByText(/Arrastra para girar|no puede mostrar el cubo 3D/)).toBeVisible();
  await context.setOffline(false);
});

/** Sesión al borde del afinamiento: núcleo respondido al extremo económico izquierdo. */
function crearSesionConOfertaPendiente() {
  const directorioDatos = resolve(dirname(fileURLToPath(import.meta.url)), '../../data');
  const items = readdirSync(resolve(directorioDatos, 'items'))
    .filter((archivo) => archivo.endsWith('.json'))
    .flatMap(
      (archivo) =>
        JSON.parse(readFileSync(resolve(directorioDatos, 'items', archivo), 'utf8')) as Array<
          ItemDePrueba & { ejes?: Array<{ eje: string; carga: number }> }
        >,
    )
    .filter((item) => item.estado !== 'retirado');
  const respuestas: Record<string, number> = {};
  for (const item of items) {
    if (item.modulo !== 'nucleo' || item.condicion) continue;
    const cargaEco = item.ejes?.find((c) => c.eje === 'economico' && c.carga !== 0);
    respuestas[item.id] = cargaEco ? (cargaEco.carga > 0 ? -2 : 2) : 0;
  }
  return {
    version: 3,
    versionInstrumento: '4',
    guardadoEn: new Date().toISOString(),
    fase: 'oferta-modulos',
    ccaa: '',
    eleccion: 'generales',
    modo: 'completo',
    respuestas,
    importantes: {},
    modulosActivos: ['democracia-instituciones'],
    modulosOfrecidos: [],
    indice: 0,
    editando: false,
    hitoIntermedio150Visto: true,
    perfilIntermedio: false,
  };
}

test('la oferta dinámica de módulos es ciega, suma preguntas al aceptar y no repite', async ({
  page,
}) => {
  const sesion = crearSesionConOfertaPendiente();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(
    ({ clave, estado }) => {
      localStorage.setItem(clave, JSON.stringify(estado));
    },
    { clave: CLAVE_ALMACEN, estado: sesion },
  );
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Tus respuestas abren/ })).toBeVisible();
  // Oferta CIEGA: ni nombres de módulos ni áreas, y TAMPOCO recuentos exactos
  // (con un banco asimétrico, el número de bloques/preguntas/minutos delataría
  // hacia dónde apunta el perfil — revisión adversarial holística).
  await expect(page.getByText('Corrientes de la izquierda')).toHaveCount(0);
  await expect(page.getByText('no te decimos cuáles son')).toBeVisible();
  const textoOferta = await page.locator('main').innerText();
  expect(textoOferta).not.toMatch(/\d+\s*(bloques?|preguntas?|min)/i);
  const accesibilidad = await new AxeBuilder({ page }).include('main').analyze();
  expect(accesibilidad.violations).toEqual([]);

  await page.getByRole('button', { name: 'Añadirlos y seguir' }).click();
  await expect(page.getByRole('radio', { name: 'Muy de acuerdo', exact: true })).toBeVisible();
  const guardado = await page.evaluate((clave) => {
    const crudo = localStorage.getItem(clave);
    return crudo ? (JSON.parse(crudo) as { modulosActivos: string[]; modulosOfrecidos: string[] }) : null;
  }, CLAVE_ALMACEN);
  expect(guardado?.modulosActivos).toContain('corrientes-izquierda');
  expect(guardado?.modulosOfrecidos).toContain('corrientes-izquierda');
  // Ninguna respuesta se pierde al aceptar.
  const respondidasTrasAceptar = await page.evaluate((clave) => {
    const crudo = localStorage.getItem(clave);
    return crudo ? Object.keys((JSON.parse(crudo) as { respuestas: object }).respuestas).length : 0;
  }, CLAVE_ALMACEN);
  expect(respondidasTrasAceptar).toBeGreaterThanOrEqual(
    Object.keys(crearSesionConOfertaPendiente().respuestas).length,
  );
});

test('el conmutador de tema alterna sistema→claro→oscuro y persiste tras recargar', async ({
  page,
}) => {
  await page.goto('/');
  const boton = page.getByRole('button', { name: /Tema: sistema/ });
  await expect(boton).toBeVisible();
  await expect(page.locator('html')).not.toHaveAttribute('data-tema', /./);

  await boton.click();
  await expect(page.locator('html')).toHaveAttribute('data-tema', 'claro');
  await page.getByRole('button', { name: /Tema: claro/ }).click();
  await expect(page.locator('html')).toHaveAttribute('data-tema', 'oscuro');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-tema', 'oscuro');
  await expect(page.getByRole('button', { name: /Tema: oscuro/ })).toBeVisible();

  await page.getByRole('button', { name: /Tema: oscuro/ }).click();
  await expect(page.locator('html')).not.toHaveAttribute('data-tema', /./);
  const clave = await page.evaluate(() => localStorage.getItem('espectro.v1.tema'));
  expect(clave).toBeNull();
});

test('la enciclopedia ideológica se explora desde la portada sin hacer el test', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Abrir la enciclopedia ideológica' }).click();
  await expect(page.getByRole('heading', { name: 'Enciclopedia ideológica' })).toBeVisible();
  await expect(page.getByText(/corrientes, de la A a la Z/)).toBeVisible();

  const buscador = page.getByLabel('Buscar una corriente');
  await buscador.fill('posadismo');
  const entrada = page.locator('.enciclopedia-entrada');
  await expect(entrada).toHaveCount(1);
  await entrada.locator('summary').click();
  await expect(entrada.getByRole('heading', { name: 'Fuentes marco' })).toBeVisible();

  // Explorar no toca la sesión: sin respuestas nuevas y la fase sigue en portada.
  const guardado = await page.evaluate(() => localStorage.getItem('espectro.v1'));
  const sesionGuardada = JSON.parse(guardado ?? '{}');
  expect(Object.keys(sesionGuardada.respuestas ?? {})).toHaveLength(0);
  expect(sesionGuardada.fase).toBe('portada');

  await page.getByRole('button', { name: 'Volver' }).click();
  await expect(
    page.getByRole('button', { name: 'Abrir la enciclopedia ideológica' }),
  ).toBeVisible();
});

test('la enciclopedia muestra el aviso legal de las corrientes ilegalizadas al abrirlas', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Abrir la enciclopedia ideológica' }).click();
  await page.getByLabel('Buscar una corriente').fill('reconstituido');
  const entrada = page.locator('.enciclopedia-entrada');
  await expect(entrada).toHaveCount(1);
  await expect(entrada.getByText('patrón sensible documentado')).toBeVisible();
  await entrada.locator('summary').click();
  await expect(entrada.getByText(/ORGANIZACIÓN ILEGAL/)).toBeVisible();
  await expect(entrada.getByText(/brazo político de la organización terrorista GRAPO/)).toBeVisible();
  await expect(entrada.getByText(/ninguna cercanía parcial en ítems identifica a nadie/)).toBeVisible();
});
