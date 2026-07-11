import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

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

/**
 * Metadatos editoriales que valida el repositorio pero que ninguna vista usa
 * no deben viajar a cada móvil. Se conservan intactos en `data/`; solo se poda
 * su proyección de producción. Fuentes y justificaciones nunca se eliminan.
 */
function minimizarCatalogosResultados() {
  return {
    name: 'espectro:minimizar-catalogos-resultados',
    enforce: 'pre' as const,
    transform(codigo: string, id: string) {
      if (!/data\/(partidos|referencias|sindicatos|convocatorias)\/[^/]+\.json$/.test(id)) {
        return null;
      }
      const dato = JSON.parse(codigo) as Record<string, unknown>;
      const eliminarNotasNoRenderizadas = (valor: unknown) => {
        if (!valor || typeof valor !== 'object') return;
        if (Array.isArray(valor)) {
          valor.forEach(eliminarNotasNoRenderizadas);
          return;
        }
        const objeto = valor as Record<string, unknown>;
        delete objeto.nota;
        Object.values(objeto).forEach(eliminarNotasNoRenderizadas);
      };
      eliminarNotasNoRenderizadas(dato);
      if (id.includes('/data/partidos/')) {
        delete dato.registroMir;
        delete dato.autodescripcion;
        delete dato.clasificacion;
        delete dato.revisado;
        delete dato.web;
        delete dato.componentes;
      } else if (id.includes('/data/sindicatos/')) {
        delete dato.autodescripcion;
        delete dato.clasificacion;
        delete dato.revisado;
        delete dato.web;
      } else if (id.includes('/data/referencias/')) {
        delete dato.revisado;
        delete dato.version;
      } else if (id.includes('/data/convocatorias/')) {
        delete dato.nota;
        delete dato.fuentesAdicionales;
        delete dato.denominador;
        delete dato.camara;
        delete dato.totalCandidaturasOficiales;
      }
      return { code: JSON.stringify(dato), map: null };
    },
  };
}

export default defineConfig({
  build: {
    // El presupuesto de transferencia usa el grafo real de imports para no
    // declarar ligero un chunk que arrastra catálogos estáticos pesados.
    manifest: true,
  },
  plugins: [
    react(),
    minimizarBancoItems(),
    minimizarCatalogosResultados(),
    VitePWA({
      // El manifest se mantiene como fichero público y el registro se hace
      // desde pwa.ts para poder pedir permiso antes de recargar una sesión.
      manifest: false,
      injectRegister: false,
      registerType: 'prompt',
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: false,
        skipWaiting: false,
        navigateFallback: '/index.html',
        // Incluye también Resultados, sus datos y el visor 3D: terminar el
        // test sin conexión nunca debe provocar un import() roto.
        globPatterns: ['**/*.{html,js,css,png,svg,webmanifest,txt}'],
        maximumFileSizeToCacheInBytes: 2 * 1024 * 1024,
      },
    }),
  ],
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
