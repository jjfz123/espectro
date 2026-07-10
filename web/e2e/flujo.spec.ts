import { test, expect, type Page } from '@playwright/test';

/**
 * Flujos estables del cuestionario (portada, teclado, persistencia, glosario,
 * borrado). Deliberadamente NO se asserta sobre la presentación de resultados
 * ni sobre la lectura de puntuaciones: esas superficies evolucionan aparte.
 */

const CLAVE_ALMACEN = 'espectro.v1';

async function empezarTest(page: Page) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Empezar el test' }).click();
  await expect(page.getByRole('radio', { name: 'Muy de acuerdo', exact: true })).toBeVisible();
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
