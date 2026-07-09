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
  },
});
