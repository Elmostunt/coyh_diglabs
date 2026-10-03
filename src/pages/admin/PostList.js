// src/pages/admin/PostList.js — listado de posts en el admin
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi, formatDate } from '../../lib/api';

const FILTROS = [
  { id: 'all', label: 'Todos' },
  { id: 'published', label: 'Publicados' },
  { id: 'draft', label: 'Borradores' },
];

export default function PostList({ onAuthError }) {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState('');
  const [filtro, setFiltro] = useState('all');
  const [query, setQuery] = useState('');

  const load = () => {
    adminApi.list()
      .then(setPosts)
      .catch((err) => { onAuthError(err); setError(err.message); });
  };
  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const remove = async (post) => {
    if (!window.confirm(`¿Eliminar "${post.title}"? Esta acción no se puede deshacer.`)) return;
    try {
      await adminApi.remove(post.id);
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch (err) {
      onAuthError(err);
      window.alert(err.message);
    }
  };

  const visibles = (posts || [])
    .filter((p) => filtro === 'all' || p.status === filtro)
    .filter((p) => !query || `${p.title} ${p.category} ${p.slug}`.toLowerCase().includes(query.toLowerCase()));

  const count = (status) => (posts || []).filter((p) => status === 'all' || p.status === status).length;

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-ink/15 pb-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">Blog</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl">Artículos</h1>
        </div>
        <Link
          to="/admin/nuevo"
          className="inline-flex items-center gap-2 self-start sm:self-auto rounded-sm bg-ink px-5 py-3 text-sm font-semibold text-paper hover:bg-petrol transition-colors"
        >
          + Nuevo artículo
        </Link>
      </div>

      <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-2">
          {FILTROS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFiltro(f.id)}
              className={`rounded-sm border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                filtro === f.id ? 'bg-ink text-paper border-ink' : 'border-ink/20 text-ink/60 hover:border-ink/50'
              }`}
            >
              {f.label} <span className="opacity-60">{count(f.id)}</span>
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="Buscar por título, categoría o slug…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-80 h-10 border border-ink/20 bg-paper px-3 text-sm focus:outline-none focus:border-ink"
        />
      </div>

      {error && <p className="mt-8 text-ember" role="alert">{error}</p>}
      {!posts && !error && <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-ink/50">Cargando…</p>}

      {posts && (
        <div className="mt-6 border-t border-ink/15">
          {visibles.length === 0 && (
            <p className="py-12 text-center font-display italic text-xl text-ink/50">
              {posts.length === 0 ? 'Todavía no hay artículos. Crea el primero.' : 'Ningún artículo coincide.'}
            </p>
          )}
          {visibles.map((post) => (
            <div key={post.id} className="group grid md:grid-cols-12 gap-3 md:gap-6 items-center border-b border-ink/10 py-5">
              <div className="md:col-span-7">
                <div className="flex items-center gap-3 mb-1.5">
                  <span
                    className={`font-mono text-[9px] uppercase tracking-[0.16em] px-2 py-0.5 ${
                      post.status === 'published' ? 'bg-laguna/15 text-laguna' : 'bg-ember/15 text-ember'
                    }`}
                  >
                    {post.status === 'published' ? 'Publicado' : 'Borrador'}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">{post.category || 'Sin categoría'}</span>
                </div>
                <Link to={`/admin/editar/${post.id}`} className="font-display text-xl text-ink hover:text-petrol leading-snug">
                  {post.title}
                </Link>
                <p className="mt-1 font-mono text-[11px] text-ink/40">/blog/{post.slug}</p>
              </div>
              <div className="md:col-span-2 text-sm text-ink/55">
                {post.status === 'published' ? formatDate(post.publishedAt) : `Editado ${formatDate(post.updatedAt)}`}
              </div>
              <div className="md:col-span-3 flex md:justify-end gap-4 text-sm">
                <Link to={`/admin/editar/${post.id}`} className="font-semibold text-ink hover:text-petrol">Editar</Link>
                {post.status === 'published' && (
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="text-ink/60 hover:text-ink">Ver ↗</a>
                )}
                <button type="button" onClick={() => remove(post)} className="text-ink/45 hover:text-ember">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
