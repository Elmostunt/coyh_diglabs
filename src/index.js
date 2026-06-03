import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const rootEl = document.getElementById('root');

// Si react-snap pre-renderizó el contenido, usar hydrateRoot para no re-montar el DOM.
// En SPA normal o primera carga sin pre-render, usar createRoot.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, <React.StrictMode><App /></React.StrictMode>);
} else {
  createRoot(rootEl).render(<React.StrictMode><App /></React.StrictMode>);
}
