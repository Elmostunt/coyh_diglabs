// src/pages/Home.js — "Patagonia Editorial"
import React from "react";
import { Link } from "react-router-dom";
import { useSEO } from '../hooks/useSEO';
import { useReveal } from '../hooks/useReveal';

const CALENDLY_URL = "https://calendly.com/surdigitallabs/30min";
const WA_HOME = "https://wa.me/56975204813?text=" + encodeURIComponent("Hola! Tengo un problema en mi empresa que creo que se puede resolver con tecnología. ¿Conversamos?");

const STATS = [
  { kpi: "+8", unidad: "años", label: "en la industria del software" },
  { kpi: "7–14", unidad: "días", label: "primera entrega funcional" },
  { kpi: "<24", unidad: "horas", label: "tiempo de respuesta" },
];

const MARQUEE = ["Software a medida", "Datos & BI", "Automatización", "Cloud & Arquitectura", "Desarrollo web", "Integraciones"];

const PROBLEMAS = [
  "Tu empresa depende de demasiados Excel para operar",
  "Copias información a mano entre un sistema y otro",
  "Pierdes horas cada semana armando los mismos reportes",
  "Tu página web quedó antigua — o todavía no tienes una",
  "Necesitas un sistema propio y no sabes por dónde partir",
  "Tienes sistemas que no se comunican entre sí",
  "La información del negocio está repartida en mil lugares",
  "Hay una tarea repetitiva que alguien hace todos los días",
];

const SERVICIOS = [
  {
    num: "A",
    title: "Desarrollo Web",
    tagline: "No solo una página bonita",
    desc: "Sitios corporativos, reservas, catálogos y portales que generan contactos y ventas. Una herramienta para tu negocio.",
    to: "/software",
    span: "lg:col-span-7",
  },
  {
    num: "B",
    title: "Software & Aplicaciones",
    tagline: "Para cuando una web ya no alcanza",
    desc: "Sistemas internos, plataformas e integraciones hechas sobre tu proceso real.",
    to: "/software",
    span: "lg:col-span-5",
  },
  {
    num: "C",
    title: "Datos & BI",
    tagline: "Deja de adivinar, empieza a medir",
    desc: "Dashboards, reportes automáticos e información centralizada para saber qué pasa en tu negocio.",
    to: "/datos",
    span: "lg:col-span-5",
  },
  {
    num: "D",
    title: "Cloud & Arquitectura",
    tagline: "Tecnología que crece contigo",
    desc: "Modernización, integración de sistemas y asesoría para decidir bien antes de invertir. Sin sorpresas.",
    to: "/software",
    span: "lg:col-span-7",
  },
];

// Imágenes: reemplazar con fotos reales del rubro en producción.
const CASOS_DE_USO = [
  {
    id: "turismo",
    categoria: "Turismo & Gastronomía",
    titulo: "¿Reservas por WhatsApp, correo y redes, todo a la vez?",
    desc: "Centralizamos la información y automatizamos la operación. Menú online, reservas y cero papel.",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&h=900&fit=crop&q=80",
    to: "/software",
  },
  {
    id: "comercio",
    categoria: "Comercio & Retail",
    titulo: "Tu tienda abierta 24/7, desde Coyhaique para todo Chile",
    desc: "Catálogo, pedidos y pagos integrados en un solo lugar — sin depender de planillas.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&h=900&fit=crop&q=80",
    to: "/software",
  },
  {
    id: "servicios",
    categoria: "Empresas de Servicios",
    titulo: "¿Información operacional repartida entre mil Excel?",
    desc: "La centralizamos y construimos un dashboard para ver el negocio completo de un vistazo.",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&h=900&fit=crop&q=80",
    to: "/datos",
  },
  {
    id: "industria",
    categoria: "Industria & Logística",
    titulo: "Trazabilidad, rutas y operaciones en tiempo real",
    desc: "Sistemas que conversan entre sí y visibilidad total del proceso.",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&h=900&fit=crop&q=80",
    to: "/datos",
  },
];

const PROCESO = [
  { paso: "01", titulo: "Entendemos tu caso", desc: "Escuchamos el problema real antes de proponer nada." },
  { paso: "02", titulo: "Definimos el alcance", desc: "Qué se hace, en cuánto tiempo y por qué. Sin sorpresas." },
  { paso: "03", titulo: "Construimos", desc: "Avances reales cada 1–2 semanas, no solo el resultado final." },
  { paso: "04", titulo: "Entregamos y seguimos", desc: "Documentación, traspaso y soporte cuando lo necesites." },
];

const DIFERENCIADORES = [
  { titulo: "Experiencia empresarial", desc: "Arquitectura y sistemas de organizaciones grandes, aplicados al tamaño y ritmo de tu negocio." },
  { titulo: "Tecnología sin humo", desc: "Recomendamos la solución apropiada para tu problema. No vendemos tecnología innecesaria." },
  { titulo: "Cercanía", desc: "Estamos en Aysén y entendemos el contexto regional. Hablas directo con quien resuelve." },
  { titulo: "De la idea a la implementación", desc: "Diseñamos la solución y también la construimos. Un solo interlocutor de principio a fin." },
  { titulo: "Datos como ventaja", desc: "No solo construimos software: te ayudamos a convertir tu información en decisiones." },
];

const CONTACT_ROWS = [
  { num: "01", label: "Escríbenos", desc: "Formulario simple, respuesta en menos de 24 h", href: "/contacto", interno: true },
  { num: "02", label: "WhatsApp directo", desc: "Para algo rápido, sin vueltas", href: WA_HOME, interno: false },
  { num: "03", label: "Agenda 30 minutos", desc: "Una llamada para entender tu caso, sin compromiso", href: CALENDLY_URL, interno: false },
];

const Eyebrow = ({ num, children }) => (
  <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
    <span className="text-ember">{num}</span>
    <span className="h-px w-8 bg-ink/25 inline-block" />
    <span>{children}</span>
  </div>
);

export default function Home() {
  useReveal();
  useSEO({
    title: 'Sur Digital Labs | Tecnología, Software y Datos en Aysén',
    description: 'Consultora tecnológica en Coyhaique: software a medida, automatización y datos para empresas de Aysén y todo Chile. Conversemos sobre tu proyecto.',
    path: '/',
    ogImage: '/og-home.jpg',
  });

  return (
    <div className="w-full bg-paper text-ink">

      {/* ── HERO ── */}
      <section className="border-b border-ink/10">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-8 sm:pt-12 pb-12 sm:pb-16">

          {/* Línea de meta editorial */}
          <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-ink/50 border-b border-ink/10 pb-4">
            <span>Coyhaique · Aysén</span>
            <span className="hidden md:inline">45.57° S — 72.07° O</span>
            <span>Software y datos desde la Patagonia</span>
          </div>

          <div className="mt-10 sm:mt-14 grid lg:grid-cols-12 gap-10 lg:gap-8 items-end">
            {/* Titular */}
            <div className="lg:col-span-7" data-reveal>
              <h1 className="font-display font-medium text-[clamp(2.7rem,8vw,5.4rem)] leading-[0.98] tracking-tight text-ink">
                Tecnología <em className="italic font-semibold text-petrol dark:text-aqua">útil</em>,
                <br />
                hecha en la
                <br />
                Patagonia<span className="text-laguna">.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base sm:text-lg text-ink/70 leading-relaxed">
                Desarrollamos software, automatizamos procesos y convertimos tus datos en mejores decisiones. Para empresas de Aysén y todo Chile.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <Link
                  to="/contacto"
                  className="group inline-flex items-center gap-3 rounded-sm bg-ink px-6 py-3.5 text-sm font-semibold text-paper hover:bg-petrol dark:hover:bg-aqua dark:hover:text-night transition-colors duration-200"
                >
                  Conversemos sobre tu proyecto
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Link>
                <a href="#servicios" className="link-rule text-sm font-semibold text-ink/80">
                  Ver soluciones
                </a>
              </div>
            </div>

            {/* Foto duotono de Coyhaique */}
            <div className="lg:col-span-5 relative" data-reveal style={{ "--reveal-delay": "120ms" }}>
              <div className="duotone border border-ink/20 aspect-[4/3]" style={{ "--duo": "#0d3b66" }}>
                <img src="/coyhaique.jpg" alt="Coyhaique, Región de Aysén, Patagonia chilena" />
              </div>
              <div className="flex items-center justify-between border-x border-b border-ink/20 bg-paper2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                <span>Fig. 01 — Coyhaique, base de operaciones</span>
                <span className="text-laguna">●</span>
              </div>
              {/* Sello rotado */}
              <div className="hidden sm:block absolute -top-4 -right-3 rotate-6 border border-ink/30 bg-paper px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70 shadow-sm">
                Desde Aysén → todo Chile
              </div>
            </div>
          </div>

          {/* Stats como tabla editorial */}
          <div className="mt-12 sm:mt-16 grid grid-cols-3 border-t border-ink/15 divide-x divide-ink/10" data-reveal>
            {STATS.map((s) => (
              <div key={s.label} className="pt-5 px-3 sm:px-6">
                <div className="font-display text-3xl sm:text-5xl text-ink">
                  {s.kpi}<span className="text-laguna text-xl sm:text-2xl ml-1 italic">{s.unidad}</span>
                </div>
                <div className="mt-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-ink/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="border-b border-ink/10 py-4 overflow-hidden select-none" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {MARQUEE.map((item) => (
                <span key={`${copy}-${item}`} className="flex items-center font-display italic text-xl sm:text-2xl text-ink/70 whitespace-nowrap">
                  <span className="px-6">{item}</span>
                  <span className="text-ember not-italic text-base">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── 01 · ¿TE PASA ESTO? ── */}
      <section className="border-b border-ink/10">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <div data-reveal>
            <Eyebrow num="01">Problemas que resolvemos</Eyebrow>
            <div className="mt-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <h2 className="font-display font-medium text-4xl sm:text-5xl tracking-tight">¿Te pasa esto?</h2>
              <p className="max-w-md text-sm text-ink/60 leading-relaxed lg:text-right">
                Si tu empresa está creciendo, probablemente la tecnología que usabas al principio ya no alcanza.
              </p>
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-x-12 border-t border-ink/15" data-reveal>
            {PROBLEMAS.map((p, i) => (
              <div
                key={i}
                className="group flex items-baseline gap-4 border-b border-ink/10 py-4 hover:bg-paper2/70 transition-colors duration-200 px-2 -mx-2"
              >
                <span className="font-mono text-xs text-ember shrink-0">✕</span>
                <p className="text-[15px] text-ink/80 leading-snug group-hover:translate-x-1 transition-transform duration-200">{p}</p>
              </div>
            ))}
          </div>

          {/* Banda CTA petróleo */}
          <div className="mt-12 bg-azulOscuro text-bone rounded-sm px-6 py-9 sm:px-10 sm:py-10 relative overflow-hidden" data-reveal>
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-turquesaVibrante via-verdeTurquesa to-transparent" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-xl">
                <p className="font-display italic text-2xl sm:text-3xl leading-snug">
                  Cuéntanos qué problema tienes. Nosotros vemos cómo resolverlo.
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/60">
                  Sin compromiso · Sin lenguaje técnico · Respuesta &lt; 24 h
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center rounded-sm bg-bone px-6 py-3 text-sm font-semibold text-azulOscuro hover:bg-turquesaVibrante transition-colors duration-200"
                >
                  Conversemos
                </Link>
                <a
                  href={WA_HOME}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-sm border border-bone/30 px-6 py-3 text-sm font-semibold text-bone hover:border-turquesaVibrante hover:text-turquesaVibrante transition-colors duration-200"
                >
                  WhatsApp directo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 · SERVICIOS (bento editorial) ── */}
      <section id="servicios" className="border-b border-ink/10 bg-paper2/50 scroll-mt-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <div data-reveal>
            <Eyebrow num="02">Soluciones</Eyebrow>
            <h2 className="mt-5 font-display font-medium text-4xl sm:text-5xl tracking-tight">Lo que hacemos</h2>
            <p className="mt-3 max-w-xl text-sm text-ink/60 leading-relaxed">
              Primero el problema del negocio. Después, la tecnología. Todo por el mismo equipo, de principio a fin.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            {SERVICIOS.map((s, i) => (
              <Link
                key={s.num}
                to={s.to}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` }}
                className={`group relative bg-paper border border-ink/15 p-6 sm:p-8 flex flex-col justify-between min-h-[200px] hover:border-ink/40 hover:-translate-y-0.5 transition-all duration-200 ${s.span}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-laguna mb-2.5">{s.tagline}</p>
                    <h3 className="font-display text-2xl sm:text-[1.7rem] text-ink leading-tight">{s.title}</h3>
                  </div>
                  <span className="font-display italic text-5xl sm:text-6xl text-ink/10 group-hover:text-ember/60 leading-none select-none transition-colors duration-300">
                    {s.num}
                  </span>
                </div>
                <div className="mt-5 flex items-end justify-between gap-6">
                  <p className="text-sm text-ink/65 leading-relaxed max-w-md">{s.desc}</p>
                  <span className="shrink-0 h-9 w-9 grid place-items-center border border-ink/20 rounded-full text-ink/60 group-hover:bg-ink group-hover:text-paper group-hover:border-ink transition-all duration-200">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 · CASOS DE USO ── */}
      <section className="border-b border-ink/10">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <div data-reveal>
            <Eyebrow num="03">Casos de uso</Eyebrow>
            <div className="mt-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <h2 className="font-display font-medium text-4xl sm:text-5xl tracking-tight">¿Qué se puede hacer en tu rubro?</h2>
              <p className="max-w-sm text-sm text-ink/60 leading-relaxed lg:text-right">
                Ejemplos para los sectores que mueven la Patagonia. Si tu caso es distinto, cuéntanoslo.
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CASOS_DE_USO.map((v, i) => (
              <Link
                key={v.id}
                to={v.to}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` }}
                className="group border border-ink/15 bg-paper hover:border-ink/40 transition-colors duration-200 flex flex-col"
              >
                <div className="duotone aspect-[4/3] border-b border-ink/15" style={{ "--duo": "#0d3b66" }}>
                  <img
                    src={v.img}
                    alt={v.categoria}
                    loading="lazy"
                    className="group-hover:scale-[1.04] transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 mb-2.5">{v.categoria}</p>
                  <h3 className="font-display text-lg leading-snug text-ink mb-2">{v.titulo}</h3>
                  <p className="text-[13px] text-ink/60 leading-relaxed flex-1">{v.desc}</p>
                  <span className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-laguna group-hover:text-ember transition-colors duration-200">
                    Ver solución →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 · PROCESO ── */}
      <section className="border-b border-ink/10 bg-paper2/50">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4" data-reveal>
            <div>
              <Eyebrow num="04">El proceso</Eyebrow>
              <h2 className="mt-5 font-display font-medium text-4xl sm:text-5xl tracking-tight">Cómo trabajamos</h2>
            </div>
            <Link to="/nosotros" className="link-rule text-sm font-semibold text-ink/80 shrink-0">
              Conoce el proceso completo →
            </Link>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {PROCESO.map((item, i) => (
              <div key={item.paso} className="border-t-2 border-ink pt-5" data-reveal style={{ "--reveal-delay": `${i * 80}ms` }}>
                <span className="font-display italic text-4xl text-ember/80 leading-none select-none">{item.paso}</span>
                <h3 className="mt-3 font-semibold text-ink text-base">{item.titulo}</h3>
                <p className="mt-1.5 text-sm text-ink/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 · POR QUÉ NOSOTROS ── */}
      <section className="border-b border-ink/10">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5" data-reveal>
              <div className="lg:sticky lg:top-24">
                <Eyebrow num="05">Diferencia</Eyebrow>
                <h2 className="mt-5 font-display font-medium text-4xl sm:text-5xl tracking-tight leading-[1.05]">
                  ¿Por qué trabajar con nosotros?
                </h2>
                <p className="mt-4 max-w-sm text-sm text-ink/60 leading-relaxed">
                  No necesitas una gran consultora para resolver un problema tecnológico. Necesitas a alguien que entienda tecnología y negocio — y que esté cerca.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7" data-reveal style={{ "--reveal-delay": "100ms" }}>
              <div className="border-t border-ink/15">
                {DIFERENCIADORES.map((d, i) => (
                  <div key={d.titulo} className="group border-b border-ink/10 py-6 flex gap-6 hover:bg-paper2/70 transition-colors duration-200 px-2 -mx-2">
                    <span className="font-mono text-[11px] text-ink/40 pt-1.5 shrink-0 w-7">0{i + 1}</span>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl text-ink leading-snug">{d.titulo}</h3>
                      <p className="mt-1.5 text-sm text-ink/60 leading-relaxed max-w-lg">{d.desc}</p>
                    </div>
                  </div>
                ))}
                <Link to="/nosotros" className="flex items-center justify-between py-5 px-2 -mx-2 group">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-laguna">Conócenos — equipo y proyectos</span>
                  <span className="text-ink/50 group-hover:translate-x-1 group-hover:text-ink transition-all duration-200">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BANDA PATAGONIA ── */}
      <section className="relative overflow-hidden border-b border-ink/10">
        <div className="duotone absolute inset-0" style={{ "--duo": "#0d3b66" }}>
          <img src="/coyhaique.jpg" alt="" aria-hidden="true" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1923]/95 via-[#0d3b66]/80 to-[#0d3b66]/40" />
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-2xl" data-reveal>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-turquesaVibrante">
              <span className="h-px w-8 bg-turquesaVibrante inline-block" />
              Hecho en Aysén
            </div>
            <h2 className="mt-6 font-display italic font-medium text-[clamp(2.2rem,6vw,4rem)] leading-[1.05] text-bone">
              Software y datos desde la Patagonia.
            </h2>
            <p className="mt-5 max-w-xl text-base sm:text-lg text-bone/80 leading-relaxed">
              Somos de aquí. Trabajamos con la misma tecnología que usan las grandes empresas, aplicada al tamaño y ritmo de tu negocio. La tecnología se adapta a tu empresa — no al revés.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONVERSEMOS (CTA final editorial) ── */}
      <section>
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <div data-reveal>
            <Eyebrow num="06">Contacto</Eyebrow>
            <h2 className="mt-5 font-display font-medium text-[clamp(3rem,10vw,6.5rem)] leading-none tracking-tight">
              Conversemos<span className="text-laguna">.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm text-ink/60 leading-relaxed">
              Cuéntanos el problema — no necesitas saber qué tecnología se requiere.
            </p>
          </div>

          <div className="mt-10 border-t border-ink/15" data-reveal>
            {CONTACT_ROWS.map((row) =>
              row.interno ? (
                <Link key={row.num} to={row.href} className="group flex items-center justify-between gap-6 border-b border-ink/10 py-6 px-2 -mx-2 hover:bg-paper2/70 transition-colors duration-200">
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono text-[11px] text-ink/40 w-7 shrink-0">{row.num}</span>
                    <div>
                      <span className="font-display text-2xl sm:text-3xl text-ink">{row.label}</span>
                      <p className="mt-1 text-sm text-ink/55">{row.desc}</p>
                    </div>
                  </div>
                  <span className="h-10 w-10 grid place-items-center border border-ink/20 rounded-full text-ink/60 group-hover:bg-ink group-hover:text-paper group-hover:border-ink transition-all duration-200 shrink-0">→</span>
                </Link>
              ) : (
                <a key={row.num} href={row.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-6 border-b border-ink/10 py-6 px-2 -mx-2 hover:bg-paper2/70 transition-colors duration-200">
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono text-[11px] text-ink/40 w-7 shrink-0">{row.num}</span>
                    <div>
                      <span className="font-display text-2xl sm:text-3xl text-ink">{row.label}</span>
                      <p className="mt-1 text-sm text-ink/55">{row.desc}</p>
                    </div>
                  </div>
                  <span className="h-10 w-10 grid place-items-center border border-ink/20 rounded-full text-ink/60 group-hover:bg-ink group-hover:text-paper group-hover:border-ink transition-all duration-200 shrink-0">↗</span>
                </a>
              )
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
