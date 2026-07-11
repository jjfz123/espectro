import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Flujos críticos desde la portada hasta resultados y recuperación local. */

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

async function empezarTest(page: Page) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar el test' }).click();
  await expect(page.getByRole('radio', { name: 'Muy de acuerdo', exact: true })).toBeVisible();
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
  await expect(page.locator('.mapa-plano--brujula .mapa-zona--interactiva')).toHaveCount(28);
  await expect(page.getByLabel('Incluir corrientes de profundidad')).not.toBeChecked();
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
  await expect(page.locator('.ranking')).toBeVisible();
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

  await expect(page.locator('.mapa-plano--brujula .mapa-zona--interactiva')).toHaveCount(78);
  await expect(page.getByLabel('Incluir corrientes de profundidad')).toHaveCount(0);
  await expect(page.getByText(/Atlas exhaustivo: incluye las 28 corrientes principales/i)).toBeVisible();

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
  await page.getByRole('button', { name: 'Ver en 3D' }).click();
  await expect(page.getByText('No se ha podido abrir el visor 3D.')).toBeVisible();

  await page.unroute(patron3D);
  await page.getByRole('button', { name: 'Recargar y reintentar el 3D' }).click();
  await expect(page.getByText(/Arrastra para girar|no puede mostrar el cubo 3D/)).toBeVisible();
  expect(fallos).toBeGreaterThan(0);
});

test('móvil estrecho no desborda y conserva objetivos táctiles utilizables', async ({ browser }) => {
  const contextoMovil = await browser.newContext({
    baseURL: 'http://localhost:4180',
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

  await expect(page.locator('.mapa-plano--brujula radialGradient')).toHaveCount(4);
  await expect(page.locator('.mapa-plano--brujula svg')).toHaveAttribute(
    'aria-label',
    /Propiedad y mercado por Poder político/i,
  );
  await expect(page.locator('.mapa-plano--brujula .mapa-zona--interactiva')).toHaveCount(28);
  const partidosBrujula = page.locator(
    '.mapa-plano--brujula .mapa-punto[data-tipo="partido"]',
  );
  expect(await partidosBrujula.count()).toBeGreaterThanOrEqual(4);
  for (const nombre of [
    'Partido Socialista Obrero Español',
    'Partido Popular',
    'VOX',
    'Movimiento Sumar',
  ]) {
    await expect(
      page.getByLabel('Localizar un partido').locator('option', { hasText: nombre }),
    ).toHaveCount(1);
  }
  expect(
    await page.locator(
      '.mapa-plano--brujula .mapa-punto[data-tipo="partido"][data-evidencia="provisional"]',
    ).count(),
  ).toBeGreaterThan(0);
  await expect(
    page.getByLabel('Buscar en el atlas').locator('option', { hasText: 'Posadismo' }),
  ).toHaveCount(0);
  const respuestasAntes = await page.evaluate(
    (clave) => Object.keys(JSON.parse(localStorage.getItem(clave) ?? '{}').respuestas ?? {}).length,
    CLAVE_ALMACEN,
  );
  await page.getByLabel('Incluir corrientes de profundidad').check();
  await expect(page.locator('.mapa-plano--brujula .mapa-zona--interactiva')).toHaveCount(78);
  await expect(
    page.locator('.mapa-plano--brujula .mapa-punto[data-tipo="referencia"]'),
  ).toHaveCount(0);
  await expect(page.locator('.mapa-plano--brujula .mapa-zona__nombre')).toHaveCount(0);
  await expect(page.getByText(/regiones están sin rotular/i)).toBeVisible();

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

  await page
    .getByLabel('Buscar en el atlas')
    .selectOption({ label: 'Posadismo' });
  await page.getByRole('button', { name: 'Más información', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Fuentes marco' })).toBeVisible();
  await page.getByLabel('Incluir corrientes de profundidad').uncheck();
  await expect(page.locator('.mapa-plano--brujula .mapa-zona--interactiva')).toHaveCount(28);
  await expect(page.locator('.mapa-corriente-lectura')).toHaveCount(0);
  const respuestasDespues = await page.evaluate(
    (clave) => Object.keys(JSON.parse(localStorage.getItem(clave) ?? '{}').respuestas ?? {}).length,
    CLAVE_ALMACEN,
  );
  expect(respuestasDespues).toBe(respuestasAntes);
});

test('la brújula móvil distingue evidencia provisional y resuelve puntos próximos', async ({
  browser,
}) => {
  const contexto = await browser.newContext({
    baseURL: 'http://localhost:4180',
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
    expect(await partidos.count()).toBeGreaterThanOrEqual(4);
    const tamanos = await partidos.evaluateAll((puntos) =>
      puntos.map((punto) => {
        const caja = punto.getBoundingClientRect();
        return { ancho: caja.width, alto: caja.height };
      }),
    );
    expect(Math.min(...tamanos.map((caja) => caja.ancho))).toBeGreaterThanOrEqual(44);
    expect(Math.min(...tamanos.map((caja) => caja.alto))).toBeGreaterThanOrEqual(44);

    const selectorPartidos = page.getByLabel('Localizar un partido');
    await expect(selectorPartidos.locator('option[value="vox"]')).toContainText(
      'posición provisional',
    );
    await selectorPartidos.selectOption('vox');
    const vox = page.locator(
      '.mapa-plano--brujula .mapa-punto[data-entidad-id="vox"]',
    );
    const pp = page.locator(
      '.mapa-plano--brujula .mapa-punto[data-entidad-id="pp"]',
    );
    await expect(vox).toHaveAttribute('data-evidencia', 'provisional');
    await expect(vox).toHaveAttribute('aria-pressed', 'true');
    await expect(vox).toHaveAttribute('aria-label', /Posición provisional/i);
    const rellenoVox = await vox.locator('.mapa-punto__forma').evaluate(
      (forma) => getComputedStyle(forma).fill,
    );
    const rellenoPp = await pp.locator('.mapa-punto__forma').evaluate(
      (forma) => getComputedStyle(forma).fill,
    );
    expect(rellenoVox).not.toBe(rellenoPp);

    await selectorPartidos.selectOption('');
    /* CUP y Más Madrid quedan a menos del radio táctil: tocar el punto que
       queda arriba abre el selector, en vez de elegirlo por orden del DOM. */
    const masMadrid = partidos.filter({
      has: page.locator('title', { hasText: 'Más Madrid' }),
    });
    await expect(masMadrid).toHaveCount(1);
    await masMadrid.tap();
    const cumulo = page.locator('.mapa-cumulo');
    await expect(cumulo).toBeVisible();
    expect(await cumulo.getByRole('button').count()).toBeGreaterThanOrEqual(2);
    await expect(cumulo).toContainText("Candidatura d'Unitat Popular");
    await expect(cumulo).toContainText('Más Madrid');
    const cajasCumulo = await cumulo.getByRole('button').evaluateAll((botones) =>
      botones.map((boton) => boton.getBoundingClientRect().height),
    );
    expect(Math.min(...cajasCumulo)).toBeGreaterThanOrEqual(44);
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
  await page.getByRole('button', { name: 'Ver en 3D' }).click();
  await expect(page.getByText(/Arrastra para girar|no puede mostrar el cubo 3D/)).toBeVisible();
  await context.setOffline(false);
});
