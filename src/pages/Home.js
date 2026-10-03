// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import { useSEO } from '../hooks/useSEO';

const CALENDLY_URL = "https://calendly.com/surdigitallabs/30min";
const WA_HOME = "https://wa.me/56975204813?text=" + encodeURIComponent("Hola! Tengo un problema en mi empresa que creo que se puede resolver con tecnología. ¿Conversamos?");

const STATS = [
  { kpi: "+8 años", label: "en la industria del software" },
  { kpi: "7–14 días", label: "Primera entrega funcional" },
  { kpi: "< 24 h", label: "Tiempo de respuesta" },
];

// Sección "¿Te pasa esto?" — problemas reales de negocio (mecanismo principal de conversión)
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
    title: "Desarrollo Web",
    tagline: "No solo una página bonita: una herramienta para tu negocio.",
    desc: "Sitios corporativos, reservas, catálogos y portales que generan contactos y ventas.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    iconBg: "bg-blue-50", iconColor: "text-blue-600", accent: "bg-blue-600", taglineColor: "text-blue-600",
    to: "/software",
  },
  {
    title: "Software & Aplicaciones",
    tagline: "Para cuando una web ya no alcanza.",
    desc: "Sistemas internos, plataformas, formularios digitales e integraciones hechas sobre tu proceso real.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    iconBg: "bg-indigo-50", iconColor: "text-indigo-600", accent: "bg-indigo-600", taglineColor: "text-indigo-600",
    to: "/software",
  },
  {
    title: "Datos & BI",
    tagline: "Deja de adivinar. Empieza a medir.",
    desc: "Dashboards, reportes automáticos e información centralizada para saber qué pasa en tu negocio.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4" />
      </svg>
    ),
    iconBg: "bg-cyan-50", iconColor: "text-cyan-600", accent: "bg-cyan-500", taglineColor: "text-cyan-600",
    to: "/datos",
  },
  {
    title: "Cloud & Arquitectura",
    tagline: "Tecnología que crece contigo, sin sorpresas.",
    desc: "Modernización, integración de sistemas y asesoría para decidir bien antes de invertir.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    iconBg: "bg-violet-50", iconColor: "text-violet-600", accent: "bg-violet-600", taglineColor: "text-violet-600",
    to: "/software",
  },
];

// Casos de uso narrativos por industria.
// Imágenes: reemplazar con fotos reales del rubro en producción.
const CASOS_DE_USO = [
  {
    id: "turismo",
    categoria: "Turismo & Gastronomía",
    titulo: "¿Reservas por WhatsApp, correo y redes, todo a la vez?",
    desc: "Centralizamos la información y automatizamos parte del proceso. Menú online, reservas y operación sin papel.",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=900&fit=crop&q=80",
    to: "/software",
  },
  {
    id: "comercio",
    categoria: "Comercio & Retail",
    titulo: "Tu tienda abierta 24/7, desde Coyhaique para todo Chile",
    desc: "Catálogo, pedidos y pagos integrados en un solo lugar — sin depender de planillas.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=900&fit=crop&q=80",
    to: "/software",
  },
  {
    id: "servicios",
    categoria: "Empresas de Servicios",
    titulo: "¿Información operacional repartida entre mil Excel?",
    desc: "La centralizamos y construimos un dashboard para ver el negocio completo de un vistazo.",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=900&fit=crop&q=80",
    to: "/datos",
  },
  {
    id: "industria",
    categoria: "Industria, Transporte & Logística",
    titulo: "Trazabilidad, rutas y operaciones en tiempo real",
    desc: "Sistemas que conversan entre sí y visibilidad total del proceso, sin hojas de cálculo.",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=900&fit=crop&q=80",
    to: "/datos",
  },
];

const DIFERENCIADORES = [
  {
    titulo: "Experiencia empresarial",
    desc: "Arquitectura y sistemas de organizaciones grandes, aplicados al tamaño y ritmo de tu negocio.",
    icon: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
  },
  {
    titulo: "Tecnología sin humo",
    desc: "Recomendamos la solución apropiada para tu problema. No vendemos tecnología innecesaria.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    titulo: "Cercanía",
    desc: "Estamos en Aysén y entendemos el contexto regional. Hablas directo con quien resuelve.",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    titulo: "De la idea a la implementación",
    desc: "Diseñamos la solución y también la construimos. Un solo interlocutor de principio a fin.",
    icon: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085",
  },
  {
    titulo: "Datos como ventaja",
    desc: "No solo construimos software: te ayudamos a convertir tu información en decisiones.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
];

const PROCESO_HOME = [
  { paso: "01", titulo: "Entendemos tu caso", desc: "Escuchamos el problema real antes de proponer nada." },
  { paso: "02", titulo: "Definimos el alcance", desc: "Qué se hace, en cuánto tiempo y por qué. Sin sorpresas." },
  { paso: "03", titulo: "Construimos", desc: "Avances reales cada 1–2 semanas, no solo el resultado final." },
  { paso: "04", titulo: "Entregamos y seguimos", desc: "Documentación, traspaso y soporte cuando lo necesites." },
];

const TECHS = [
  { name: "React",        slug: "react" },
  { name: "Next.js",      slug: "nextdotjs" },
  { name: "Node.js",      slug: "nodedotjs" },
  { name: "TypeScript",   slug: "typescript" },
  { name: "Python",       slug: "python" },
  { name: "AWS",          slug: null },
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
  useSEO({
    title: 'Sur Digital Labs | Tecnología, Software y Datos en Aysén',
    description: 'Consultora tecnológica en Coyhaique: software a medida, automatización y datos para empresas de Aysén y todo Chile. Conversemos sobre tu proyecto.',
    path: '/',
    ogImage: '/og-home.jpg',
  });

  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section className="bg-white dark:bg-slate-900 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-verdeTurquesa inline-block" />
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 tracking-wide">
              Software y datos desde la Patagonia · Coyhaique, Aysén
            </span>
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-slate-950 dark:text-white leading-[1.1] tracking-tight">
                Tecnología para hacer{" "}
                <span className="text-blue-600">crecer tu empresa</span>.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                Desarrollamos software, automatizamos procesos y convertimos tus datos en herramientas para tomar mejores decisiones. Para empresas de Aysén y todo Chile.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors duration-200"
                >
                  Conversemos sobre tu proyecto
                </Link>
                <a
                  href="#servicios"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-600 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200"
                >
                  Ver soluciones
                </a>
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

      {/* ── ¿TE PASA ESTO? ── */}
      <section className="bg-white dark:bg-slate-900 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">¿Te pasa esto?</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Si tu empresa está creciendo, probablemente la tecnología que usabas al principio ya no alcanza.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PROBLEMAS.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3.5"
              >
                <span className="h-5 w-5 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 grid place-items-center shrink-0 mt-0.5">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v3.75m0 3h.008v.008H12v-.008z" />
                  </svg>
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug">{p}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-azulOscuro dark:ring-1 dark:ring-white/10 px-6 py-8 sm:px-10 sm:py-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="text-lg sm:text-xl font-bold text-white">
                Cuéntanos qué problema tienes. Nosotros vemos cómo resolverlo.
              </p>
              <p className="text-sm text-slate-300 mt-1">
                Sin compromiso y sin lenguaje técnico. Respuesta en menos de 24 h.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-azulOscuro hover:bg-slate-100 transition-colors duration-200"
              >
                Conversemos
              </Link>
              <a
                href={WA_HOME}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors duration-200"
              >
                WhatsApp directo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section id="servicios" className="bg-slate-50 dark:bg-slate-800 py-14 sm:py-16 scroll-mt-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">Lo que hacemos</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Primero el problema del negocio. Después, la tecnología. Todo por el mismo equipo, de principio a fin.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICIOS.map((s, i) => (
              <Link
                key={i}
                to={s.to}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col"
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

      {/* ── CASOS DE USO POR INDUSTRIA ── */}
      <section className="bg-white dark:bg-slate-900 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">¿Qué se puede hacer en tu rubro?</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Ejemplos concretos para los sectores que mueven la Patagonia. Si tu caso es distinto, cuéntanoslo.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {CASOS_DE_USO.map((v) => (
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
                  loading="lazy"
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

      {/* ── CÓMO TRABAJAMOS ── */}
      <section className="bg-slate-50 dark:bg-slate-800 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">Cómo trabajamos</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Un proceso claro desde el primer contacto.</p>
            </div>
            <Link
              to="/nosotros"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors shrink-0"
            >
              Conoce el proceso completo →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESO_HOME.map((item) => (
              <div key={item.paso} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
                <span className="text-3xl font-black text-slate-100 dark:text-slate-700 leading-none select-none">
                  {item.paso}
                </span>
                <h3 className="text-base font-semibold text-slate-950 dark:text-white mt-3 mb-1">{item.titulo}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUÉ SUR DIGITAL LABS ── */}
      <section className="bg-white dark:bg-slate-900 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">¿Por qué trabajar con nosotros?</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              No necesitas una gran consultora para resolver un problema tecnológico. Necesitas a alguien que entienda tecnología y negocio — y que esté cerca.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DIFERENCIADORES.map((d) => (
              <article key={d.titulo} className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5">
                <div className="h-10 w-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 text-verdeTurquesa grid place-items-center mb-4">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={d.icon} />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-slate-950 dark:text-white mb-1">{d.titulo}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{d.desc}</p>
              </article>
            ))}
            {/* Card CTA para completar la grilla */}
            <Link
              to="/nosotros"
              className="group rounded-2xl border border-dashed border-slate-200 dark:border-slate-600 p-5 flex flex-col justify-center items-start hover:border-verdeTurquesa transition-colors duration-200"
            >
              <h3 className="text-base font-bold text-slate-950 dark:text-white mb-1">Conócenos</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                Quiénes somos, cómo trabajamos y proyectos representativos.
              </p>
              <span className="text-sm font-semibold text-verdeTurquesa group-hover:translate-x-0.5 transition-transform duration-200">
                Ver más →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── IDENTIDAD PATAGONIA ── */}
      <section className="relative overflow-hidden">
        <img
          src="/coyhaique.jpg"
          alt="Coyhaique, Región de Aysén, Patagonia chilena"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-azulOscuro/95 via-azulOscuro/80 to-azulOscuro/50" />
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-turquesaVibrante inline-block" />
              <span className="text-sm font-medium text-turquesaVibrante tracking-wide">Hecho en Aysén</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
              Software y datos desde la Patagonia.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              Somos de aquí. Trabajamos con la misma tecnología que usan las grandes empresas, aplicada al tamaño y ritmo de tu negocio. La tecnología se adapta a tu empresa — no al revés.
            </p>
            <div className="mt-7">
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-azulOscuro hover:bg-slate-100 transition-colors duration-200"
              >
                Conversemos sobre tu proyecto
              </Link>
            </div>
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
                {tech.slug ? (
                  <img
                    src={`https://cdn.simpleicons.org/${tech.slug}`}
                    alt={tech.name}
                    onError={(e) => { e.target.replaceWith(Object.assign(document.createElement('span'), { className: 'h-7 flex items-center text-[11px] font-black text-slate-400', textContent: tech.name })); }}
                    className="h-7 w-7 object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 dark:invert dark:grayscale dark:opacity-30 dark:group-hover:opacity-70 transition-all duration-300 select-none"
                  />
                ) : (
                  <span className="h-7 flex items-center text-[11px] font-black text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-200 select-none">
                    {tech.name}
                  </span>
                )}
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Conversemos sobre tu proyecto</h2>
            <p className="text-slate-400 mb-8 text-sm">Cuéntanos qué necesitas — respuesta en menos de 24 h, sin compromiso.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 transition-colors duration-200"
              >
                Escríbenos
              </Link>
              <a
                href={WA_HOME}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors duration-200"
              >
                WhatsApp
              </a>
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
