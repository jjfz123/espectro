/*
 * Service worker de Espectro.
 *
 * Estrategia acorde al proyecto: los datos políticos van VERSIONADOS dentro
 * de los propios bundles (no hay API), así que basta con:
 * - assets con hash en /assets/: cache-first (inmutables por construcción);
 * - navegaciones: red primero con respaldo en caché (funciona offline);
 * - el resto de mismo origen (iconos, manifest): stale-while-revalidate.
 * Sin terceros: este SW nunca cachea ni contacta con otros orígenes.
 */
const VERSION = 'espectro-v1';
const APP_SHELL = ['/', '/manifest.webmanifest', '/icono-192.png', '/icono-512.png'];

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches
      .open(VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches
      .keys()
      .then((claves) =>
        Promise.all(claves.filter((c) => c !== VERSION).map((c) => caches.delete(c))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (evento) => {
  const peticion = evento.request;
  if (peticion.method !== 'GET') return;
  const url = new URL(peticion.url);
  if (url.origin !== self.location.origin) return; // jamás terceros

  // Navegaciones: red primero, respaldo offline con el shell cacheado.
  if (peticion.mode === 'navigate') {
    evento.respondWith(
      fetch(peticion)
        .then((respuesta) => {
          const copia = respuesta.clone();
          caches.open(VERSION).then((cache) => cache.put('/', copia));
          return respuesta;
        })
        .catch(() => caches.match('/')),
    );
    return;
  }

  // Assets con hash: inmutables, caché primero.
  if (url.pathname.startsWith('/assets/')) {
    evento.respondWith(
      caches.match(peticion).then(
        (encontrado) =>
          encontrado ??
          fetch(peticion).then((respuesta) => {
            const copia = respuesta.clone();
            caches.open(VERSION).then((cache) => cache.put(peticion, copia));
            return respuesta;
          }),
      ),
    );
    return;
  }

  // Resto de mismo origen: sirve caché y refresca en segundo plano.
  evento.respondWith(
    caches.match(peticion).then((encontrado) => {
      const refresco = fetch(peticion)
        .then((respuesta) => {
          const copia = respuesta.clone();
          caches.open(VERSION).then((cache) => cache.put(peticion, copia));
          return respuesta;
        })
        .catch(() => encontrado);
      return encontrado ?? refresco;
    }),
  );
});
