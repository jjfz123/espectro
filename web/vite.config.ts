import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// El motor puro vive en ../src/engine y los datos en ../data:
// se importan en tiempo de build. La app resultante no hace
// ninguna llamada de red (requisito de privacidad del proyecto).

/**
 * La portada muestra cuántos perfiles reales hay sin descargar los perfiles:
 * el recuento se calcula aquí, en tiempo de build, con el mismo criterio que
 * datosResultados.ts (sin archivos «_*» y sin perfiles de demostración).
 */
function contarPerfilesReales(): number {
  const directorio = fileURLToPath(new URL('../data/partidos', import.meta.url));
  return readdirSync(directorio)
    .filter((archivo) => archivo.endsWith('.json') && !archivo.startsWith('_'))
    .map((archivo) => JSON.parse(readFileSync(join(directorio, archivo), 'utf8')))
    .filter((partido) => !partido.demo).length;
}

/**
 * El banco de ítems viaja completo en el chunk inicial porque el cuestionario
 * y la restauración de sesión lo necesitan de forma síncrona. Las notas
 * metodológicas y las etiquetas internas de cada ítem no se muestran nunca en
 * la interfaz, así que se retiran del build; siguen íntegras en data/items.
 */
function minimizarBancoItems() {
  return {
    name: 'espectro:minimizar-banco-items',
    enforce: 'pre' as const,
    transform(codigo: string, id: string) {
      if (!/data\/items\/[^/]+\.json$/.test(id)) return null;
      const items = JSON.parse(codigo) as Record<string, unknown>[];
      for (const item of items) {
        delete item.notas;
        delete item.tags;
      }
      return { code: JSON.stringify(items), map: null };
    },
  };
}

export default defineConfig({
  plugins: [react(), minimizarBancoItems()],
  define: {
    __PERFILES_REALES__: JSON.stringify(contarPerfilesReales()),
  },
  resolve: {
    alias: {
      '@engine': fileURLToPath(new URL('../src/engine', import.meta.url)),
      '@data': fileURLToPath(new URL('../data', import.meta.url)),
    },
  },
  server: {
    fs: {
      allow: [fileURLToPath(new URL('..', import.meta.url))],
    },
  },
});
