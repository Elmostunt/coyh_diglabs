// src/pages/Blog.js — índice editorial del blog (posts desde /api/posts)
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { useReveal } from '../hooks/useReveal';
import { blogApi, formatDate } from '../lib/api';
import { Eyebrow, ClosingCta } from '../components/Editorial';

const TODAS = 'Todas';

function PostMeta({ post }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-ink/50">
      <span className="text-laguna">{post.category || 'Notas'}</span>
      <span>·</span>
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      <span>·</span>
      <span>{post.readingMinutes} min de lectura</span>
    </div>
  );
}

export default function Blog() {
  useReveal();
  useSEO({
    title: 'Blog: Tecnología para Empresas de Aysén | Sur Digital Labs',
    description: 'Guías prácticas sobre páginas web, sistemas, automatización y datos para PYMEs de Aysén y Chile. Sin tecnicismos, desde Coyhaique.',
    path: '/blog',
    ogImage: '/og-home.jpg',
  });

  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(false);
  const [categoria, setCategoria] = useState(TODAS);

  useEffect(() => {
    let alive = true;
    blogApi.list()
      .then((data) => { if (alive) setPosts(data); })
      .catch(() => { if (alive) setError(true); });
    return () => { alive = false; };
  }, []);

  const categorias = useMemo(
    () => [TODAS, ...Array.from(new Set((posts || []).map((p) => p.category).filter(Boolean)))],
    [posts]
  );
  const filtrados = (posts || []).filter((p) => categoria === TODAS || p.category === categoria);
  const [destacado, ...resto] = filtrados;

  return (
    <div className="w-full bg-paper text-ink">

      {/* ── CABECERA ── */}
      <section className="border-b border-ink/10">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-8 sm:pt-12 pb-12 sm:pb-16">
          <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-ink/50 border-b border-ink/10 pb-4">
            <span>Blog</span>
            <span className="hidden sm:inline">Publicado desde Coyhaique</span>
          </div>
          <div className="mt-10 sm:mt-14 grid lg:grid-cols-12 gap-8 items-end" data-reveal>
            <h1 className="lg:col-span-8 font-display font-medium text-[clamp(2.8rem,8vw,5.6rem)] leading-[0.98] tracking-tight">
              Notas desde<br /><em className="italic text-petrol dark:text-aqua">el sur</em><span className="text-laguna">.</span>
            </h1>
            <p className="lg:col-span-4 text-base text-ink/65 leading-relaxed">
              Guías prácticas sobre web, sistemas, automatización y datos para empresas de Aysén y todo Chile. Sin tecnicismos.
            </p>
          </div>

          {categorias.length > 2 && (
            <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filtrar por categoría">
              {categorias.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={categoria === c}
                  onClick={() => setCategoria(c)}
                  className={`rounded-sm border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 ${
                    categoria === c
                      ? 'bg-ink text-paper border-ink'
                      : 'border-ink/20 text-ink/60 hover:border-ink/50 hover:text-ink'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── LISTADO ── */}
      <section className="border-b border-ink/10">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-12 sm:py-16">

          {posts === null && !error && (
            <div className="space-y-6" aria-busy="true" aria-label="Cargando artículos">
              {[0, 1, 2].map((i) => (
                <div key={i} className="border-b border-ink/10 pb-6 animate-pulse">
                  <div className="h-3 w-48 bg-ink/10 mb-4" />
                  <div className="h-7 w-3/4 bg-ink/10 mb-3" />
                  <div className="h-4 w-1/2 bg-ink/10" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="border border-ink/15 bg-paper2/60 p-8 text-center">
              <p className="font-display text-2xl text-ink">No pudimos cargar los artículos.</p>
              <p className="mt-2 text-sm text-ink/60">Intenta recargar la página en unos segundos.</p>
            </div>
          )}

          {posts && filtrados.length === 0 && (
            <p className="font-display italic text-2xl text-ink/60 text-center py-10">Aún no hay artículos en esta categoría.</p>
          )}

          {/* Destacado */}
          {destacado && (
            <Link
              to={`/blog/${destacado.slug}`}
              data-reveal
              className="group grid lg:grid-cols-12 gap-8 border-b border-ink/15 pb-12 mb-4"
            >
              {destacado.coverImage && (
                <div className="lg:col-span-5 border border-ink/15 overflow-hidden aspect-[4/3]">
                  <img src={destacado.coverImage} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                </div>
              )}
              <div className={destacado.coverImage ? 'lg:col-span-7' : 'lg:col-span-10'}>
                <Eyebrow num="Nº 01">Lo más reciente</Eyebrow>
                <h2 className="mt-5 font-display font-medium text-3xl sm:text-5xl leading-[1.05] tracking-tight text-ink group-hover:text-petrol dark:group-hover:text-aqua transition-colors duration-200">
                  {destacado.title}
                </h2>
                {destacado.summary && <p className="mt-4 text-base sm:text-lg text-ink/65 leading-relaxed max-w-2xl">{destacado.summary}</p>}
                <div className="mt-6"><PostMeta post={destacado} /></div>
                <span className="mt-6 inline-block link-rule text-sm font-semibold text-ink/80">Leer artículo →</span>
              </div>
            </Link>
          )}

          {/* Resto: filas editoriales */}
          {resto.map((post, i) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              data-reveal
              style={{ '--reveal-delay': `${Math.min(i, 4) * 60}ms` }}
              className="group grid sm:grid-cols-12 gap-4 sm:gap-8 border-b border-ink/10 py-8 px-2 -mx-2 hover:bg-paper2/60 transition-colors duration-200"
            >
              <span className="hidden sm:block sm:col-span-1 font-mono text-[11px] text-ink/40 pt-2">
                Nº {String(i + 2).padStart(2, '0')}
              </span>
              <div className="sm:col-span-8">
                <h3 className="font-display text-2xl sm:text-3xl leading-snug text-ink group-hover:text-petrol dark:group-hover:text-aqua transition-colors duration-200">
                  {post.title}
                </h3>
                {post.summary && <p className="mt-2 text-[15px] text-ink/60 leading-relaxed">{post.summary}</p>}
                <div className="mt-4"><PostMeta post={post} /></div>
              </div>
              <div className="sm:col-span-3 flex sm:justify-end items-start">
                {post.coverImage ? (
                  <div className="w-full sm:w-40 aspect-[4/3] border border-ink/15 overflow-hidden">
                    <img src={post.coverImage} alt="" loading="lazy" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <span className="hidden sm:grid h-10 w-10 place-items-center border border-ink/20 rounded-full text-ink/60 group-hover:bg-ink group-hover:text-paper group-hover:border-ink transition-all duration-200">→</span>
                )}
              </div>
            </Link>
          ))}

          {/* YouTube */}
          <div className="mt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border border-ink/15 bg-paper2/60 px-6 py-6" data-reveal>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember mb-1.5">También en video</p>
              <p className="font-display text-xl text-ink">Tutoriales y casos reales en el canal de YouTube.</p>
            </div>
            <a
              href="https://www.youtube.com/@guillermocarcamo8219"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 link-rule text-sm font-semibold text-ink/80"
            >
              Ir al canal ↗
            </a>
          </div>
        </div>
      </section>

      <ClosingCta title="¿Te identificas?" intro="Si alguno de estos temas es el que hoy tienes en tu empresa, conversemos. La evaluación inicial es gratis." />
    </div>
  );
}
