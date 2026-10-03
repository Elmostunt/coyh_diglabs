// src/components/Editorial.js — piezas compartidas del sistema "Patagonia Editorial"
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const WA_NUMBER = '56975204813';
export const CALENDLY_URL = 'https://calendly.com/surdigitallabs/30min';
export const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

export const Eyebrow = ({ num, children, className = '' }) => (
  <div className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55 ${className}`}>
    {num && <span className="text-ember">{num}</span>}
    <span className="h-px w-8 bg-ink/25 inline-block" />
    <span>{children}</span>
  </div>
);

export const SectionHeading = ({ num, eyebrow, title, intro, aside }) => (
  <div data-reveal>
    <Eyebrow num={num}>{eyebrow}</Eyebrow>
    <div className="mt-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
      <h2 className="font-display font-medium text-4xl sm:text-5xl tracking-tight leading-[1.05]">{title}</h2>
      {aside}
    </div>
    {intro && <p className="mt-3 max-w-xl text-sm text-ink/60 leading-relaxed">{intro}</p>}
  </div>
);

export const PrimaryButton = ({ to, href, children, className = '' }) => {
  const cls = `group inline-flex items-center justify-center gap-3 rounded-sm bg-ink px-6 py-3.5 text-sm font-semibold text-paper hover:bg-petrol dark:hover:bg-aqua dark:hover:text-night transition-colors duration-200 ${className}`;
  const inner = <>{children}<span className="group-hover:translate-x-1 transition-transform duration-200">→</span></>;
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
};

/** Hero de página interior: línea de meta + titular grande + bajada + CTAs */
export const PageHero = ({ kicker, title, lede, children, aside }) => (
  <section className="border-b border-ink/10">
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-8 sm:pt-12 pb-14 sm:pb-20">
      <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-ink/50 border-b border-ink/10 pb-4">
        <span>{kicker}</span>
        <span className="hidden sm:inline">Sur Digital Labs · Coyhaique</span>
      </div>
      <div className={`mt-10 sm:mt-14 grid gap-10 items-end ${aside ? 'lg:grid-cols-12' : ''}`}>
        <div className={aside ? 'lg:col-span-7' : 'max-w-4xl'} data-reveal>
          <h1 className="font-display font-medium text-[clamp(2.4rem,6.5vw,4.6rem)] leading-[1.02] tracking-tight text-ink">
            {title}
          </h1>
          {lede && <p className="mt-6 max-w-2xl text-base sm:text-lg text-ink/70 leading-relaxed">{lede}</p>}
          {children && <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">{children}</div>}
        </div>
        {aside && <div className="lg:col-span-5" data-reveal style={{ '--reveal-delay': '120ms' }}>{aside}</div>}
      </div>
    </div>
  </section>
);

/** Cierre de página: titular grande + filas de contacto */
export const ClosingCta = ({ title = 'Conversemos', intro = 'Cuéntanos el problema — no necesitas saber qué tecnología se requiere.', waMessage }) => {
  const rows = [
    { num: '01', label: 'Escríbenos', desc: 'Formulario simple, respuesta en menos de 24 h', to: '/contacto' },
    { num: '02', label: 'WhatsApp directo', desc: 'Para algo rápido, sin vueltas', href: waLink(waMessage || 'Hola! Quiero conversar sobre un proyecto para mi empresa.') },
    { num: '03', label: 'Agenda 30 minutos', desc: 'Una llamada para entender tu caso, sin compromiso', href: CALENDLY_URL },
  ];
  const rowCls = 'group flex items-center justify-between gap-6 border-b border-ink/10 py-6 px-2 -mx-2 hover:bg-paper2/70 transition-colors duration-200';
  const RowInner = ({ row, icon }) => (
    <>
      <div className="flex items-baseline gap-6">
        <span className="font-mono text-[11px] text-ink/40 w-7 shrink-0">{row.num}</span>
        <div>
          <span className="font-display text-2xl sm:text-3xl text-ink">{row.label}</span>
          <p className="mt-1 text-sm text-ink/55">{row.desc}</p>
        </div>
      </div>
      <span className="h-10 w-10 grid place-items-center border border-ink/20 rounded-full text-ink/60 group-hover:bg-ink group-hover:text-paper group-hover:border-ink transition-all duration-200 shrink-0">{icon}</span>
    </>
  );
  return (
    <section>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div data-reveal>
          <Eyebrow>Contacto</Eyebrow>
          <h2 className="mt-5 font-display font-medium text-[clamp(3rem,10vw,6.5rem)] leading-none tracking-tight">
            {title}<span className="text-laguna">.</span>
          </h2>
          <p className="mt-4 max-w-md text-sm text-ink/60 leading-relaxed">{intro}</p>
        </div>
        <div className="mt-10 border-t border-ink/15" data-reveal>
          {rows.map((row) => row.to ? (
            <Link key={row.num} to={row.to} className={rowCls}><RowInner row={row} icon="→" /></Link>
          ) : (
            <a key={row.num} href={row.href} target="_blank" rel="noopener noreferrer" className={rowCls}><RowInner row={row} icon="↗" /></a>
          ))}
        </div>
      </div>
    </section>
  );
};

/** FAQ editorial: acordeón con reglas de 1px */
export const EditorialFAQ = ({ items = [], num, title = 'Preguntas frecuentes' }) => {
  const [open, setOpen] = useState(0);
  if (!items.length) return null;
  return (
    <section className="border-b border-ink/10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-20 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4" data-reveal>
          <Eyebrow num={num}>Dudas</Eyebrow>
          <h2 className="mt-5 font-display font-medium text-4xl sm:text-5xl tracking-tight leading-[1.05]">{title}</h2>
        </div>
        <div className="lg:col-span-8 border-t border-ink/15" data-reveal style={{ '--reveal-delay': '100ms' }}>
          {items.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-ink/10">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-6 py-5 text-left group"
                >
                  <span className="font-display text-lg sm:text-xl text-ink leading-snug group-hover:text-petrol dark:group-hover:text-aqua transition-colors duration-200">
                    {faq.q || faq.question}
                  </span>
                  <span className={`shrink-0 mt-1 h-7 w-7 grid place-items-center border border-ink/20 rounded-full text-ink/60 text-sm transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-12 text-[15px] text-ink/65 leading-relaxed">{faq.a || faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/** Grilla de packs/ofertas en estilo editorial */
export const PackGrid = ({ packs }) => (
  <div className={`grid gap-4 sm:grid-cols-2 ${packs.length > 2 ? 'lg:grid-cols-4' : 'max-w-3xl'}`}>
    {packs.map((pack, i) => (
      <article
        key={pack.titulo}
        data-reveal
        style={{ '--reveal-delay': `${i * 70}ms` }}
        className="relative bg-paper border border-ink/15 flex flex-col hover:border-ink/40 transition-colors duration-200"
      >
        {pack.popular && (
          <span className="absolute -top-3 right-4 rotate-2 bg-ember text-paper font-mono text-[9px] uppercase tracking-[0.18em] px-2 py-1">
            Más solicitado
          </span>
        )}
        <div className="p-5 border-b border-ink/10">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-laguna mb-2">{pack.badge}</p>
          <h3 className="font-display text-xl text-ink leading-tight">{pack.titulo}</h3>
          <p className="mt-2 text-[13px] text-ink/55 leading-relaxed">{pack.ideal}</p>
        </div>
        <ul className="p-5 space-y-2 flex-1">
          {pack.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[13px] text-ink/75">
              <span className="text-ember shrink-0">—</span>{item}
            </li>
          ))}
        </ul>
        <div className="px-5 pb-5">
          <div className="border-t border-ink/10 pt-3 mb-4 flex items-baseline justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">{pack.tiempo}</span>
            <span className="text-[12px] font-semibold text-ink/80 text-right">{pack.resultado}</span>
          </div>
          <a
            href={pack.wa}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center rounded-sm bg-ink py-2.5 text-xs font-semibold text-paper hover:bg-petrol dark:hover:bg-aqua dark:hover:text-night transition-colors duration-200"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </article>
    ))}
  </div>
);
