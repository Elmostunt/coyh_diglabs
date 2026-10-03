// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export default function NotFound() {
  useSEO({
    title: 'Página no encontrada | Sur Digital Labs',
    description: 'La página que buscas no existe.',
    path: '/404',
  });

  return (
    <section className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-24 sm:py-32">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">Error 404 · Fuera del mapa</p>
      <h1 className="mt-5 font-display font-medium text-[clamp(2.6rem,8vw,5rem)] leading-[1.02] tracking-tight text-ink">
        Este camino no<br />lleva a ninguna parte<span className="text-laguna">.</span>
      </h1>
      <p className="mt-6 max-w-md text-ink/65 leading-relaxed">
        Puede que el enlace esté roto o que la página se haya movido. Volvamos a terreno conocido.
      </p>
      <div className="mt-9 flex flex-wrap gap-5 items-center">
        <Link to="/" className="rounded-sm bg-ink px-6 py-3.5 text-sm font-semibold text-paper hover:bg-petrol transition-colors">Ir al inicio</Link>
        <Link to="/contacto" className="link-rule text-sm font-semibold text-ink/80">Conversemos →</Link>
      </div>
    </section>
  );
}
