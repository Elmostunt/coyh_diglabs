// src/lib/Markdown.js — renderizador de markdown a elementos React.
// No usa dangerouslySetInnerHTML: todo el contenido se escapa por React y las
// URLs se filtran, así un post nunca puede inyectar scripts en el sitio.
//
// Soporta: # ## ### títulos, párrafos, listas (- * 1.), > citas, ``` código,
// --- separador, ![alt](url) imágenes, **negrita**, *cursiva*, `código`, [enlaces](url).
import React from 'react';
import { Link } from 'react-router-dom';

const SAFE_URL = /^(https?:\/\/|mailto:|tel:|\/|#)/i;
const isSafeUrl = (url) => SAFE_URL.test(String(url).trim());

const INLINE = /(!?\[([^\]]*)\]\(([^)\s]+)\))|(\*\*([^*]+)\*\*)|(`([^`]+)`)|(\*([^*\s][^*]*)\*)|(_([^_\s][^_]*)_)/g;

export function renderInline(text, keyPrefix = 'i') {
  const out = [];
  let last = 0;
  let m;
  let k = 0;
  INLINE.lastIndex = 0;
  while ((m = INLINE.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = `${keyPrefix}-${k++}`;
    if (m[1]) {
      const isImage = m[1].startsWith('!');
      const [label, url] = [m[2], m[3]];
      if (!isSafeUrl(url)) {
        out.push(label);
      } else if (isImage) {
        out.push(<img key={key} src={url} alt={label} loading="lazy" className="inline-block max-h-6 align-middle" />);
      } else if (url.startsWith('/')) {
        out.push(<Link key={key} to={url} className="link-rule font-semibold text-petrol dark:text-aqua">{label}</Link>);
      } else {
        out.push(<a key={key} href={url} target="_blank" rel="noopener noreferrer" className="link-rule font-semibold text-petrol dark:text-aqua">{label}</a>);
      }
    } else if (m[4]) {
      out.push(<strong key={key} className="font-semibold text-ink">{m[5]}</strong>);
    } else if (m[6]) {
      out.push(<code key={key} className="font-mono text-[0.88em] bg-paper2 border border-ink/10 px-1.5 py-0.5 rounded-sm">{m[7]}</code>);
    } else if (m[8]) {
      out.push(<em key={key} className="italic">{m[9]}</em>);
    } else if (m[10]) {
      out.push(<em key={key} className="italic">{m[11]}</em>);
    }
    last = INLINE.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

// Convierte el texto en bloques: { type, ... }
function parseBlocks(src) {
  const lines = String(src || '').replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) { i++; continue; }

    // Código
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      const code = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) code.push(lines[i++]);
      i++;
      blocks.push({ type: 'code', lang: fence[1], text: code.join('\n') });
      continue;
    }

    // Títulos
    const heading = line.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      blocks.push({ type: 'heading', level: heading[1].length, text: heading[2] });
      i++;
      continue;
    }

    // Separador
    if (/^(-{3,}|\*{3,})\s*$/.test(line)) { blocks.push({ type: 'hr' }); i++; continue; }

    // Imagen sola en su línea
    const image = line.match(/^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/);
    if (image) {
      blocks.push({ type: 'image', alt: image[1], url: image[2] });
      i++;
      continue;
    }

    // Cita
    if (/^>\s?/.test(line)) {
      const quote = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) quote.push(lines[i++].replace(/^>\s?/, ''));
      blocks.push({ type: 'quote', text: quote.join(' ') });
      continue;
    }

    // Listas
    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*[-*]\s+/, ''));
      blocks.push({ type: 'ul', items });
      continue;
    }
    if (/^\s*\d+[.)]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*\d+[.)]\s+/, ''));
      blocks.push({ type: 'ol', items });
      continue;
    }

    // Párrafo: líneas consecutivas hasta una línea vacía o un bloque nuevo
    const para = [];
    while (
      i < lines.length && lines[i].trim() &&
      !/^(#{1,3}\s|```|>\s?|\s*[-*]\s+|\s*\d+[.)]\s+|-{3,}\s*$)/.test(lines[i])
    ) para.push(lines[i++]);
    blocks.push({ type: 'p', text: para.join(' ') });
  }
  return blocks;
}

export default function Markdown({ source, className = '' }) {
  const blocks = parseBlocks(source);
  return (
    <div className={`text-[17px] leading-[1.75] text-ink/80 ${className}`}>
      {blocks.map((b, idx) => {
        const key = `b-${idx}`;
        switch (b.type) {
          case 'heading':
            if (b.level === 1) return <h2 key={key} className="font-display text-3xl sm:text-4xl text-ink mt-12 mb-4 leading-tight">{renderInline(b.text, key)}</h2>;
            if (b.level === 2) return <h2 key={key} className="font-display text-2xl sm:text-3xl text-ink mt-11 mb-4 leading-tight">{renderInline(b.text, key)}</h2>;
            return <h3 key={key} className="font-display italic text-xl sm:text-2xl text-ink mt-8 mb-3 leading-snug">{renderInline(b.text, key)}</h3>;
          case 'code':
            return (
              <pre key={key} className="my-6 bg-night text-bone/90 border border-ink/15 p-5 overflow-x-auto text-sm leading-relaxed rounded-sm">
                {b.lang && <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-turquesaVibrante/70 mb-3">{b.lang}</span>}
                <code className="font-mono">{b.text}</code>
              </pre>
            );
          case 'quote':
            return (
              <blockquote key={key} className="my-8 border-l-2 border-ember pl-6 font-display italic text-xl sm:text-2xl text-ink leading-snug">
                {renderInline(b.text, key)}
              </blockquote>
            );
          case 'ul':
            return (
              <ul key={key} className="my-5 space-y-2">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="text-ember shrink-0 mt-[0.15em]">—</span>
                    <span>{renderInline(it, `${key}-${j}`)}</span>
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={key} className="my-5 space-y-2.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-4">
                    <span className="font-mono text-sm text-laguna shrink-0 mt-[0.3em] w-5">{String(j + 1).padStart(2, '0')}</span>
                    <span>{renderInline(it, `${key}-${j}`)}</span>
                  </li>
                ))}
              </ol>
            );
          case 'image':
            return isSafeUrl(b.url) ? (
              <figure key={key} className="my-8">
                <img src={b.url} alt={b.alt} loading="lazy" className="w-full border border-ink/15" />
                {b.alt && <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">{b.alt}</figcaption>}
              </figure>
            ) : null;
          case 'hr':
            return <hr key={key} className="my-10 border-0 border-t border-ink/15" />;
          default:
            return <p key={key} className="my-5">{renderInline(b.text, key)}</p>;
        }
      })}
    </div>
  );
}

// Tiempo de lectura estimado (200 palabras/minuto)
export function readingTime(text) {
  const words = String(text || '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
