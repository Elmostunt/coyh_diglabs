// src/pages/Home.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const CALENDLY_URL = "https://calendly.com/surdigitallabs/30min";

const STATS = [
  { kpi: "+8 años", label: "en la industria del software" },
  { kpi: "7–14 días", label: "Primera entrega funcional" },
  { kpi: "< 24 h", label: "Tiempo de respuesta" },
];

const SERVICIOS = [
  {
    title: "Desarrollo Web",
    tagline: "De la idea al sitio que convierte.",
    desc: "Aplicaciones, e-commerce y software a medida que tu equipo puede operar sin depender de nosotros.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    iconBg: "bg-blue-50", iconColor: "text-blue-600", accent: "bg-blue-600", taglineColor: "text-blue-600",
    to: "/software",
  },
  {
    title: "Datos & IA",
    tagline: "Deja de adivinar. Empieza a medir.",
    desc: "Pipelines, dashboards y modelos que transforman datos dispersos en decisiones claras.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4" />
      </svg>
    ),
    iconBg: "bg-cyan-50", iconColor: "text-cyan-600", accent: "bg-cyan-500", taglineColor: "text-cyan-600",
    to: "/datos",
  },
  {
    title: "Automatización & Cloud",
    tagline: "Infraestructura que no te da sorpresas.",
    desc: "Sistemas documentados, seguros y construidos para durar. Sin dependencias ocultas.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    iconBg: "bg-violet-50", iconColor: "text-violet-600", accent: "bg-violet-600", taglineColor: "text-violet-600",
    to: "/software",
  },
];

// Imágenes: reemplazar con fotos reales del rubro en producción.
// Placeholder: picsum.photos (determinístico por seed, siempre el mismo resultado).
const VERTICALES = [
  {
    id: "turismo",
    categoria: "Turismo & Gastronomía",
    titulo: "Reservas online, menús digitales y operación sin papel",
    desc: "Hostales, restaurantes y tours que trabajan mientras duermes.",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=900&fit=crop&q=80",
    to: "/software",
  },
  {
    id: "comercio",
    categoria: "Comercio & Retail",
    titulo: "Tu tienda abierta 24/7, desde Coyhaique para todo Chile",
    desc: "E-commerce, catálogo, pagos y gestión de pedidos integrados.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=900&fit=crop&q=80",
    to: "/software",
  },
  {
    id: "salud",
    categoria: "Salud & Bienestar",
    titulo: "Citas online, fichas digitales y seguimiento de pacientes",
    desc: "Para clínicas, consultorios y centros de bienestar.",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=900&fit=crop&q=80",
    to: "/software",
  },
  {
    id: "industria",
    categoria: "Industria & Logística",
    titulo: "Trazabilidad, rutas y operaciones en tiempo real",
    desc: "Visibilidad total del proceso, sin hojas de cálculo.",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=900&fit=crop&q=80",
    to: "/datos",
  },
];

const TECHS = [
  { name: "React",        slug: "react" },
  { name: "Next.js",      slug: "nextdotjs" },
  { name: "Node.js",      slug: "nodedotjs" },
  { name: "TypeScript",   slug: "typescript" },
  { name: "Python",       slug: "python" },
  { name: "AWS",          slug: "amazonaws" },
  { name: "Google Cloud", slug: "googlecloud" },
  { name: "Docker",       slug: "docker" },
  { name: "Kubernetes",   slug: "kubernetes" },
];

const CHART_BARS = [4, 6, 5, 7, 6, 8, 7, 9, 8, 10];
const AUTO_STEPS = [
  { label: "Datos de entrada", bg: "bg-violet-50", border: "border-violet-100", dot: "bg-violet-500" },
  { label: "Procesamiento",    bg: "bg-slate-50",  border: "border-slate-100",  dot: "bg-slate-300"  },
  { label: "Resultado listo",  bg: "bg-emerald-50",border: "border-emerald-100",dot: "bg-emerald-500" },
];

function HeroIllustration() {
  return (
    <div className="relative select-none">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50 via-violet-50/40 to-cyan-50/50" />
      <div className="relative p-6 sm:p-8">

        {/* Tres columnas staggered */}
        <div className="grid grid-cols-3 gap-3 items-end">

          {/* ── Software (azul, más alta) ── */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-100 px-3 py-2 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-300" />
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-2 w-10 bg-slate-900 rounded" />
                <div className="h-5 w-10 bg-blue-600 rounded-full" />
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded" />
              <div className="h-1.5 w-3/4 bg-slate-100 rounded" />
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <div className="h-9 bg-blue-50 rounded-xl border border-blue-100" />
                <div className="h-9 bg-slate-50 rounded-xl border border-slate-100" />
                <div className="h-9 bg-slate-50 rounded-xl border border-slate-100" />
                <div className="h-9 bg-blue-50 rounded-xl border border-blue-100" />
              </div>
            </div>
            <div className="px-3 pb-3 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Software</span>
            </div>
          </div>

          {/* ── Datos & IA (cyan, más baja) ── */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-5">
            <div className="p-3">
              <div className="text-[9px] text-slate-400 mb-2 uppercase tracking-wide font-semibold">Analítica</div>
              <div className="grid grid-cols-2 gap-1 mb-3">
                <div className="bg-cyan-50 rounded-lg p-1.5 border border-cyan-100">
                  <div className="text-xs font-black text-cyan-700">↑23%</div>
                  <div className="text-[8px] text-cyan-500">ventas</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-1.5 border border-slate-100">
                  <div className="text-xs font-black text-slate-700">1.2k</div>
                  <div className="text-[8px] text-slate-400">clientes</div>
                </div>
              </div>
              <div className="flex items-end gap-0.5 h-10">
                {CHART_BARS.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{
                      height: `${h * 10}%`,
                      backgroundColor: i === 9 ? "#0891b2" : i > 6 ? "#a5f3fc" : "#e2e8f0",
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="px-3 pb-3 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
              <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest">Datos & IA</span>
            </div>
          </div>

          {/* ── Automatización (violeta, media) ── */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-2">
            <div className="p-3">
              <div className="text-[9px] text-slate-400 mb-2 uppercase tracking-wide font-semibold">Automatización</div>
              <div className="space-y-1">
                {AUTO_STEPS.map((step, i) => (
                  <div key={i}>
                    <div className={`flex items-center gap-1.5 rounded-lg border px-2 py-1.5 ${step.bg} ${step.border}`}>
                      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${step.dot}`} />
                      <span className="text-[9px] font-medium text-slate-600">{step.label}</span>
                    </div>
                    {i < AUTO_STEPS.length - 1 && (
                      <div className="flex justify-center my-0.5">
                        <div className="w-px h-2 bg-slate-200" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="px-3 pb-3 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
              <span className="text-[10px] font-bold text-violet-600 uppercase tracking-widest">Cloud</span>
            </div>
          </div>

        </div>

        {/* Tira inferior */}
        <div className="mt-3 bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-slate-700">Sistemas en línea</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 border border-slate-100 rounded-full px-2 py-0.5">GCP Certified</span>
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 border border-slate-100 rounded-full px-2 py-0.5">CI/CD activo</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    document.title = "Sur Digital Labs - Software, datos y automatización en Coyhaique, Patagonia";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Socio tecnológico en Coyhaique, Patagonia: software a medida, datos y automatización para pymes y empresas regionales.");
  }, []);

  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section className="bg-white dark:bg-slate-900 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-blue-600 inline-block" />
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 tracking-wide">
              Coyhaique · Patagonia, Chile
            </span>
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-slate-950 dark:text-white leading-[1.1] tracking-tight">
                Construimos{" "}
                <span className="text-blue-600">software</span>{" "}
                que tu equipo puede operar sin depender de nosotros.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                Somos un equipo técnico en Coyhaique. Trabajamos con pymes y empresas que necesitan más que una página web.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors duration-200"
                >
                  Cotiza tu proyecto
                </Link>
                <Link
                  to="/nosotros"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-600 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200"
                >
                  Ver cómo trabajamos
                </Link>
              </div>
            </div>
            <div><HeroIllustration /></div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-4 divide-x divide-slate-200 dark:divide-slate-600">
            {STATS.map((s) => (
              <div key={s.kpi} className="text-center px-4">
                <div className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">{s.kpi}</div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section className="bg-white dark:bg-slate-900 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">Lo que hacemos</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Todo por el mismo equipo, de principio a fin.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {SERVICIOS.map((s, i) => (
              <Link
                key={i}
                to={s.to}
                className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div className="p-6 flex-1">
                  <div className={`h-10 w-10 rounded-xl ${s.iconBg} ${s.iconColor} grid place-items-center mb-4`}>
                    {s.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-950 dark:text-white mb-0.5">{s.title}</h3>
                  <p className={`text-xs font-semibold ${s.taglineColor} mb-3`}>{s.tagline}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{s.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-200">
                    Ver servicios
                    <svg className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div className={`h-1 ${s.accent}`} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── VERTICALES POR INDUSTRIA ── */}
      <section className="bg-slate-50 dark:bg-slate-800 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">Soluciones para tu industria</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Llevamos tecnología profesional a los sectores que mueven la Patagonia.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {VERTICALES.map((v) => (
              <Link
                key={v.id}
                to={v.to}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                style={{ aspectRatio: "3 / 4" }}
              >
                {/* Imagen de fondo — reemplazar con foto real del rubro */}
                <img
                  src={v.img}
                  alt={v.categoria}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/10" />

                {/* Contenido */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
                  <span className="text-[10px] sm:text-xs font-semibold text-white/50 mb-2 uppercase tracking-widest">
                    {v.categoria}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug mb-2">
                    {v.titulo}
                  </h3>
                  <p className="text-xs text-white/55 leading-relaxed hidden sm:block mb-3">
                    {v.desc}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-white/40 group-hover:text-white transition-colors duration-200">
                    Ver solución
                    <svg
                      className="h-3 w-3 group-hover:translate-x-0.5 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STRIP ── */}
      <section className="border-y border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 py-10 sm:py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-8">
            Las herramientas que usamos a diario
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {TECHS.map((tech) => (
              <div key={tech.name} className="group flex flex-col items-center gap-2">
                <img
                  src={`https://cdn.simpleicons.org/${tech.slug}`}
                  alt={tech.name}
                  className="h-7 w-7 object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 dark:invert dark:grayscale dark:opacity-30 dark:group-hover:opacity-70 transition-all duration-300 select-none"
                />
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-200">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white dark:bg-slate-900 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="bg-slate-950 dark:ring-1 dark:ring-white/10 rounded-2xl sm:rounded-3xl px-8 py-12 sm:px-12 sm:py-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">¿Empezamos?</h2>
            <p className="text-slate-400 mb-8 text-sm">Coyhaique · Respuesta en menos de 24 h.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 transition-colors duration-200"
              >
                Cotiza tu proyecto
              </Link>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors duration-200"
              >
                Agenda una llamada
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
