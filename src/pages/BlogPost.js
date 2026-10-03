// src/pages/BlogPost.js — artículo individual /blog/:slug
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { blogApi, formatDate } from '../lib/api';
import Markdown, { readingTime } from '../lib/Markdown';
import { PrimaryButton, waLink } from '../components/Editorial';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ok | notfound | error

  useEffect(() => {
    let alive = true;
    setStatus('loading');
    blogApi.get(slug)
      .then((data) => { if (alive) { setPost(data); setStatus('ok'); } })
      .catch((err) => { if (alive) setStatus(err.status === 404 ? 'notfound' : 'error'); });
    return () => { alive = false; };
  }, [slug]);

  useSEO({
    title: post ? `${post.title} | Sur Digital Labs` : 'Blog | Sur Digital Labs',
    description: post?.summary || 'Guías prácticas de tecnología para empresas de Aysén y Chile.',
    path: `/blog/${slug}`,
    ogImage: post?.coverImage || '/og-home.jpg',
  });

  if (status === 'loading') {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 py-20 animate-pulse" aria-busy="true">
        <div className="h-3 w-40 bg-ink/10 mb-8" />
        <div className="h-12 w-full bg-ink/10 mb-4" />
        <div className="h-12 w-2/3 bg-ink/10 mb-10" />
        {[0, 1, 2, 3].map((i) => <div key={i} className="h-4 w-full bg-ink/10 mb-3" />)}
      </div>
    );
  }

  if (status !== 'ok') {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 py-24 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">{status === 'notfound' ? 'Error 404' : 'Error'}</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl text-ink">
          {status === 'notfound' ? 'Este artículo no existe.' : 'No pudimos cargar el artículo.'}
        </h1>
        <Link to="/blog" className="mt-8 inline-block link-rule text-sm font-semibold text-ink/80">← Volver al blog</Link>
      </div>
    );
  }

  return (
    <article className="w-full bg-paper text-ink">

      {/* ── Cabecera del artículo ── */}
      <header className="border-b border-ink/10">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 pt-8 sm:pt-12 pb-12 sm:pb-16">
          <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-ink/50 border-b border-ink/10 pb-4">
            <Link to="/blog" className="hover:text-ink transition-colors">← Blog</Link>
            <span className="text-laguna">{post.category || 'Notas'}</span>
          </div>

          <h1 className="mt-10 sm:mt-14 font-display font-medium text-[clamp(2.2rem,6vw,4.2rem)] leading-[1.03] tracking-tight">
            {post.title}
          </h1>
          {post.summary && (
            <p className="mt-6 font-display italic text-xl sm:text-2xl text-ink/65 leading-snug max-w-3xl">{post.summary}</p>
          )}

          <div className="mt-8 grid grid-cols-3 border-t border-ink/15 divide-x divide-ink/10">
            {[
              ['Autor', post.author || 'Sur Digital Labs'],
              ['Publicado', formatDate(post.publishedAt)],
              ['Lectura', `${readingTime(post.content)} min`],
            ].map(([label, value]) => (
              <div key={label} className="pt-4 px-3 first:pl-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">{label}</p>
                <p className="mt-1 text-sm text-ink/80">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {post.coverImage && (
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 pt-10">
          <img src={post.coverImage} alt="" className="w-full max-h-[520px] object-cover border border-ink/15" />
        </div>
      )}

      {/* ── Cuerpo ── */}
      <div className="mx-auto w-full max-w-[44rem] px-4 sm:px-6 py-12 sm:py-16">
        <Markdown source={post.content} />

        {post.video && (
          <a
            href={post.video}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 group flex items-center justify-between gap-4 border border-ink/15 bg-paper2/60 px-5 py-4 hover:border-ink/40 transition-colors duration-200"
          >
            <span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-ember mb-1">Video</span>
              <span className="font-display text-lg text-ink">{post.videoTitle || 'Ver el video relacionado'}</span>
            </span>
            <span className="text-ink/50 group-hover:text-ink transition-colors">↗</span>
          </a>
        )}
      </div>

      {/* ── Cierre ── */}
      <section className="border-t border-ink/10 bg-azulOscuro text-bone">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-14 sm:py-16 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-turquesaVibrante mb-3">¿Te pasa algo parecido?</p>
            <p className="font-display italic text-2xl sm:text-3xl leading-snug max-w-lg">
              Cuéntanos tu caso. La evaluación inicial es gratis.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <PrimaryButton to="/contacto" className="!bg-bone !text-azulOscuro hover:!bg-turquesaVibrante">Conversemos</PrimaryButton>
            <a
              href={waLink(`Hola! Leí el artículo "${post.title}" y me gustaría conversar sobre mi caso.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-sm font-semibold text-bone/80 hover:text-turquesaVibrante transition-colors"
            >
              o escríbenos por WhatsApp ↗
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-10">
        <Link to="/blog" className="link-rule text-sm font-semibold text-ink/80">← Todos los artículos</Link>
      </div>
    </article>
  );
}
