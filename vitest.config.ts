import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@engine': fileURLToPath(new URL('./src/engine/index.ts', import.meta.url)),
      '@data': fileURLToPath(new URL('./data', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    // Los E2E de Playwright (web/e2e) tienen su propio runner: npx playwright test.
    exclude: ['**/node_modules/**', 'web/e2e/**', '**/.claude/**'],
  },
});
