import { defineConfig } from '@playwright/test';

/**
 * En CI Playwright usa el Chromium que instala su propio comando `install`.
 * Un ejecutable del sistema sigue siendo útil en entornos preparados (como
 * el de auditoría), pero nunca debe quedar ligado a una ruta local concreta.
 */
const ejecutableChromium = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;

export default defineConfig({
  testDir: './e2e',
  timeout: 45_000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:4180',
    launchOptions: ejecutableChromium ? { executablePath: ejecutableChromium } : undefined,
  },
  webServer: {
    command: 'npm run build && npm run preview -- --port 4180 --strictPort',
    url: 'http://localhost:4180',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
