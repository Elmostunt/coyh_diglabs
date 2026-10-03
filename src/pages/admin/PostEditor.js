// src/pages/admin/PostEditor.js — crear / editar un artículo
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import Markdown, { readingTime } from '../../lib/Markdown';

const EMPTY = {
  title: '', slug: '', summary: '', content: '', category: '',
  coverImage: '', video: '', videoTitle: '', author: 'Guillermo Cárcamo',
  status: 'draft', publishedAt: '',
};

const CATEGORIAS_BASE = ['Desarrollo Web', 'Software', 'Automatización', 'Datos & IA', 'Digitalización', 'Cloud'];

const slugify = (text) => String(text || '')
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

// Botones de formato: envuelven la selección o insertan un bloque
const TOOLS = [
  { label: 'B', title: 'Negrita (Ctrl+B)', wrap: ['**', '**'], placeholder: 'texto en negrita', cls: 'font-bold' },
  { label: 'I', title: 'Cursiva (Ctrl+I)', wrap: ['*', '*'], placeholder: 'texto en cursiva', cls: 'italic font-display' },
  { label: 'H2', title: 'Título de sección', line: '## ', placeholder: 'Título de sección' },
  { label: 'H3', title: 'Subtítulo', line: '### ', placeholder: 'Subtítulo' },
  { label: '—', title: 'Lista', line: '- ', placeholder: 'Elemento de la lista' },
  { label: '1.', title: 'Lista numerada', line: '1. ', placeholder: 'Primer paso' },
  { label: '❝', title: 'Cita destacada', line: '> ', placeholder: 'Una frase para destacar' },
  { label: 'Link', title: 'Enlace (Ctrl+K)', wrap: ['[', '](https://)'], placeholder: 'texto del enlace' },
  { label: 'Img', title: 'Imagen', block: '![Descripción de la imagen](https://)' },
  { label: '</>', title: 'Bloque de código', block: '```\ncódigo\n```' },
];

const Field = ({ label, hint, children, counter }) => (
  <label className="block">
    <span className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1.5">
      <span>{label}</span>
      {counter}
    </span>
    {children}
    {hint && <span className="mt-1 block text-[11px] text-ink/45">{hint}</span>}
  </label>
);

const inputCls = 'w-full h-10 border border-ink/20 bg-paper px-3 text-sm text-ink focus:outline-none focus:border-ink';

export default function PostEditor({ onAuthError }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const [form, setForm] = useState(EMPTY);
  const [saved, setSaved] = useState(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'ok' | 'error', text }
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [tab, setTab] = useState('write'); // móvil: write | preview
  const [categorias, setCategorias] = useState(CATEGORIAS_BASE);
  const textareaRef = useRef(null);

  // Cargar post existente + categorías usadas
  useEffect(() => {
    adminApi.list()
      .then((posts) => setCategorias(Array.from(new Set([...CATEGORIAS_BASE, ...posts.map((p) => p.category).filter(Boolean)]))))
      .catch(() => {});
    if (isNew) return;
    adminApi.get(id)
      .then((post) => {
        const loaded = { ...EMPTY, ...post };
        setForm(loaded);
        setSaved(loaded);
      })
      .catch((err) => { onAuthError(err); setMessage({ type: 'error', text: err.message }); })
      .finally(() => setLoading(false));
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const dirty = useMemo(() => JSON.stringify(form) !== JSON.stringify(saved), [form, saved]);

  // Avisar antes de salir con cambios sin guardar
  useEffect(() => {
    if (!dirty) return undefined;
    const handler = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  const set = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'title' && !slugTouched) next.slug = slugify(value);
      return next;
    });
  };

  const save = useCallback(async (overrides = {}) => {
    const payload = { ...form, ...overrides };
    if (payload.slug) payload.slug = slugify(payload.slug);
    setSaving(true);
    setMessage(null);
    try {
      const result = isNew ? await adminApi.create(payload) : await adminApi.update(id, payload);
      const next = { ...EMPTY, ...result };
      setForm(next);
      setSaved(next);
      setMessage({ type: 'ok', text: next.status === 'published' ? 'Publicado.' : 'Borrador guardado.' });
      if (isNew) navigate(`/admin/editar/${result.id}`, { replace: true });
    } catch (err) {
      onAuthError(err);
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  }, [form, id, isNew, navigate, onAuthError]);

  // Atajos: Ctrl/Cmd+S guarda
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (!saving) save();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [save, saving]);

  const applyTool = (tool) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const { selectionStart: start, selectionEnd: end, value } = ta;
    const selected = value.slice(start, end);
    let insert;
    let cursorStart;
    let cursorEnd;

    if (tool.wrap) {
      const text = selected || tool.placeholder;
      insert = `${tool.wrap[0]}${text}${tool.wrap[1]}`;
      cursorStart = start + tool.wrap[0].length;
      cursorEnd = cursorStart + text.length;
    } else if (tool.line) {
      const lines = (selected || tool.placeholder).split('\n');
      insert = lines.map((l, i) => (tool.line === '1. ' ? `${i + 1}. ` : tool.line) + l.replace(/^(#{1,3}\s|[-*]\s|\d+\.\s|>\s?)/, '')).join('\n');
      const needsBreak = start > 0 && value[start - 1] !== '\n';
      if (needsBreak) insert = `\n\n${insert}`;
      cursorStart = start + (needsBreak ? 2 : 0);
      cursorEnd = start + insert.length;
    } else {
      const needsBreak = start > 0 && value[start - 1] !== '\n';
      insert = `${needsBreak ? '\n\n' : ''}${tool.block}\n`;
      cursorStart = start + insert.length - 1;
      cursorEnd = cursorStart;
    }

    const next = value.slice(0, start) + insert + value.slice(end);
    setForm((prev) => ({ ...prev, content: next }));
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(cursorStart, cursorEnd);
    });
  };

  const onEditorKeyDown = (e) => {
    if (!(e.metaKey || e.ctrlKey)) return;
    const key = e.key.toLowerCase();
    const tool = key === 'b' ? TOOLS[0] : key === 'i' ? TOOLS[1] : key === 'k' ? TOOLS[7] : null;
    if (tool) { e.preventDefault(); applyTool(tool); }
  };

  if (loading) return <p className="p-10 font-mono text-xs uppercase tracking-[0.2em] text-ink/50">Cargando artículo…</p>;

  const isPublished = form.status === 'published';
  const words = form.content.trim() ? form.content.trim().split(/\s+/).length : 0;
  const seoTitle = `${form.title || 'Título del artículo'} | Sur Digital Labs`;

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6">

      {/* Barra superior */}
      <div className="sticky top-14 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-paper/95 backdrop-blur-md border-b border-ink/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 min-w-0">
          <Link
            to="/admin"
            onClick={(e) => { if (dirty && !window.confirm('Tienes cambios sin guardar. ¿Salir igual?')) e.preventDefault(); }}
            className="text-sm text-ink/60 hover:text-ink shrink-0"
          >
            ← Artículos
          </Link>
          <span className={`font-mono text-[9px] uppercase tracking-[0.16em] px-2 py-0.5 shrink-0 ${isPublished ? 'bg-laguna/15 text-laguna' : 'bg-ember/15 text-ember'}`}>
            {isPublished ? 'Publicado' : 'Borrador'}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45 truncate">
            {saving ? 'Guardando…' : dirty ? 'Cambios sin guardar' : message?.type === 'ok' ? message.text : 'Sin cambios'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isPublished && !isNew && (
            <a href={`/blog/${form.slug}`} target="_blank" rel="noopener noreferrer" className="hidden sm:inline text-sm text-ink/60 hover:text-ink mr-2">Ver ↗</a>
          )}
          <button
            type="button"
            disabled={saving}
            onClick={() => save(isPublished ? {} : { status: 'draft' })}
            className="rounded-sm border border-ink/25 px-4 py-2 text-sm font-semibold text-ink hover:border-ink disabled:opacity-40 transition-colors"
            title="Ctrl/Cmd + S"
          >
            {isPublished ? 'Actualizar' : 'Guardar borrador'}
          </button>
          {isPublished ? (
            <button
              type="button"
              disabled={saving}
              onClick={() => save({ status: 'draft' })}
              className="rounded-sm px-4 py-2 text-sm font-semibold text-ember hover:bg-ember/10 disabled:opacity-40 transition-colors"
            >
              Despublicar
            </button>
          ) : (
            <button
              type="button"
              disabled={saving}
              onClick={() => save({ status: 'published' })}
              className="rounded-sm bg-ink px-4 py-2 text-sm font-semibold text-paper hover:bg-petrol disabled:opacity-40 transition-colors"
            >
              Publicar
            </button>
          )}
        </div>
      </div>

      {message?.type === 'error' && (
        <p className="mt-4 border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-ember" role="alert">{message.text}</p>
      )}

      <div className="mt-6 grid lg:grid-cols-12 gap-8">

        {/* ── Columna principal: título + contenido ── */}
        <div className="lg:col-span-8 min-w-0">
          <textarea
            value={form.title}
            onChange={set('title')}
            placeholder="Título del artículo"
            rows={1}
            className="w-full resize-none bg-transparent font-display text-3xl sm:text-4xl leading-tight text-ink placeholder:text-ink/25 focus:outline-none"
            onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = `${e.target.scrollHeight}px`; }}
          />
          <textarea
            value={form.summary}
            onChange={set('summary')}
            placeholder="Bajada: una o dos frases que resumen el artículo (aparece en el listado y en Google)"
            rows={2}
            maxLength={320}
            className="mt-2 w-full resize-none bg-transparent font-display italic text-lg text-ink/70 placeholder:text-ink/25 focus:outline-none"
          />

          {/* Pestañas (móvil) */}
          <div className="mt-4 flex lg:hidden border-b border-ink/15">
            {[['write', 'Escribir'], ['preview', 'Vista previa']].map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`px-4 py-2 text-sm -mb-px border-b-2 ${tab === key ? 'border-ink text-ink font-semibold' : 'border-transparent text-ink/50'}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-4 grid xl:grid-cols-2 gap-6">
            {/* Editor */}
            <div className={`${tab === 'write' ? 'block' : 'hidden'} lg:block min-w-0`}>
              <div className="flex flex-wrap gap-1 border border-ink/20 border-b-0 bg-paper2/60 p-1.5">
                {TOOLS.map((tool) => (
                  <button
                    key={tool.label}
                    type="button"
                    title={tool.title}
                    onClick={() => applyTool(tool)}
                    className={`min-w-[2rem] h-8 px-2 text-xs text-ink/70 hover:bg-paper hover:text-ink border border-transparent hover:border-ink/15 ${tool.cls || 'font-mono'}`}
                  >
                    {tool.label}
                  </button>
                ))}
              </div>
              <textarea
                ref={textareaRef}
                value={form.content}
                onChange={set('content')}
                onKeyDown={onEditorKeyDown}
                spellCheck
                placeholder={'Escribe aquí en markdown.\n\n## Un título de sección\n\nUn párrafo con **negrita** y un [enlace](/contacto).\n\n- Un punto\n- Otro punto'}
                className="w-full min-h-[60vh] border border-ink/20 bg-paper p-4 font-mono text-[13px] leading-relaxed text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink resize-y"
              />
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">
                {words} palabras · {readingTime(form.content)} min de lectura · Ctrl/Cmd+S para guardar
              </p>
            </div>

            {/* Vista previa */}
            <div className={`${tab === 'preview' ? 'block' : 'hidden'} lg:block min-w-0`}>
              <div className="border border-ink/15 bg-paper p-5 sm:p-7 xl:max-h-[calc(60vh+3rem)] xl:overflow-y-auto">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-laguna mb-3">{form.category || 'Categoría'}</p>
                <h1 className="font-display text-3xl leading-tight text-ink">{form.title || 'Título del artículo'}</h1>
                {form.summary && <p className="mt-3 font-display italic text-lg text-ink/65 leading-snug">{form.summary}</p>}
                <div className="mt-4 border-t border-ink/15">
                  {form.content
                    ? <Markdown source={form.content} className="!text-[15px]" />
                    : <p className="mt-6 text-sm text-ink/40">La vista previa aparecerá aquí.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Columna lateral: metadatos ── */}
        <aside className="lg:col-span-4 space-y-5">
          <div className="border border-ink/15 p-5 space-y-4">
            <p className="font-display text-xl">Detalles</p>
            <Field label="URL (slug)" hint={isPublished ? 'Cambiar el slug de un artículo publicado rompe los enlaces existentes.' : 'Se genera desde el título.'}>
              <div className="flex items-center border border-ink/20 focus-within:border-ink">
                <span className="pl-3 font-mono text-[11px] text-ink/40">/blog/</span>
                <input
                  value={form.slug}
                  onChange={(e) => { setSlugTouched(true); set('slug')(e); }}
                  onBlur={() => setForm((prev) => ({ ...prev, slug: slugify(prev.slug) }))}
                  className="flex-1 min-w-0 h-10 bg-paper pr-3 font-mono text-[12px] text-ink focus:outline-none"
                />
              </div>
            </Field>
            <Field label="Categoría">
              <input list="categorias" value={form.category} onChange={set('category')} className={inputCls} />
              <datalist id="categorias">{categorias.map((c) => <option key={c} value={c} />)}</datalist>
            </Field>
            <Field label="Autor">
              <input value={form.author} onChange={set('author')} className={inputCls} />
            </Field>
            {isPublished && (
              <Field label="Fecha de publicación">
                <input
                  type="date"
                  value={(form.publishedAt || '').slice(0, 10)}
                  onChange={(e) => setForm((prev) => ({ ...prev, publishedAt: e.target.value ? `${e.target.value}T12:00:00.000Z` : prev.publishedAt }))}
                  className={inputCls}
                />
              </Field>
            )}
          </div>

          <div className="border border-ink/15 p-5 space-y-4">
            <p className="font-display text-xl">Imagen y video</p>
            <Field label="Imagen de portada (URL)" hint="Opcional. Ideal 1600×900, por ejemplo desde el bucket de GCS.">
              <input value={form.coverImage} onChange={set('coverImage')} placeholder="https://…" className={inputCls} />
            </Field>
            {form.coverImage && /^https?:\/\//.test(form.coverImage) && (
              <img src={form.coverImage} alt="" className="w-full aspect-video object-cover border border-ink/15" />
            )}
            <Field label="Video relacionado (URL)">
              <input value={form.video} onChange={set('video')} placeholder="https://youtube.com/…" className={inputCls} />
            </Field>
            {form.video && (
              <Field label="Texto del enlace al video">
                <input value={form.videoTitle} onChange={set('videoTitle')} placeholder="Ver el tutorial completo" className={inputCls} />
              </Field>
            )}
          </div>

          {/* Vista previa en Google */}
          <div className="border border-ink/15 p-5">
            <p className="font-display text-xl mb-3">Así se verá en Google</p>
            <div className="bg-white rounded p-4 border border-slate-200">
              <p className="text-[12px] text-slate-600 truncate">surdigitallabs.cl › blog › {form.slug || 'slug'}</p>
              <p className={`mt-1 text-[17px] leading-snug truncate ${seoTitle.length > 65 ? 'text-amber-700' : 'text-[#1a0dab]'}`}>{seoTitle}</p>
              <p className="mt-1 text-[13px] text-slate-600 leading-snug line-clamp-2">
                {form.summary || 'Agrega una bajada: es el texto que Google muestra bajo el título.'}
              </p>
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/45">
              Título {seoTitle.length}/65 · Bajada {form.summary.length}/160 recomendado
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
