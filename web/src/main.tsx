import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './estilos.css';

const raiz = document.getElementById('raiz');
if (!raiz) throw new Error('No existe el nodo raíz de la aplicación.');

createRoot(raiz).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// PWA: solo en producción y solo mismo origen (ver web/public/sw.js).
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registro) => {
      registro.addEventListener('updatefound', () => {
        const nuevo = registro.installing;
        nuevo?.addEventListener('statechange', () => {
          if (nuevo.state === 'installed' && navigator.serviceWorker.controller) {
            // Hay versión nueva lista; la interfaz puede escuchar este aviso.
            window.dispatchEvent(new CustomEvent('espectro:actualizacion-disponible'));
          }
        });
      });
    });
  });
}
