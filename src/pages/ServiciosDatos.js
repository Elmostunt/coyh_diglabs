import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const WA = (msg) => 'https://wa.me/56975204813?text=' + encodeURIComponent(msg);
const CALENDLY = 'https://calendly.com/surdigitallabs/30min';

const AREAS = [
  {
    titulo: 'Dashboards & Analytics',
    desc: 'Visualizaciones en Power BI, Looker y Python. Métricas clave del negocio en tiempo real.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    bg: 'bg-cyan-50', color: 'text-cyan-600',
  },
  {
    titulo: 'Ingeniería de Datos',
    desc: 'Pipelines ETL, ingesta en BigQuery y Dataflow. Datos limpios, disponibles y confiables.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    bg: 'bg-blue-50', color: 'text-blue-600',
  },
  {
    titulo: 'ML & Inteligencia Artificial',
    desc: 'Modelos predictivos, LLMs y análisis avanzado para automatizar decisiones con datos.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    bg: 'bg-violet-50', color: 'text-violet-600',
  },
  {
    titulo: 'Bases de Datos',
    desc: 'Modelado, optimización y administración de BD relacionales y NoSQL para mejor rendimiento.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4" />
      </svg>
    ),
    bg: 'bg-emerald-50', color: 'text-emerald-600',
  },
  {
    titulo: 'Consultoría & Formación',
    desc: 'Estrategia de datos, roadmaps técnicos y capacitación práctica para tu equipo.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
    bg: 'bg-amber-50', color: 'text-amber-600',
  },
];

const PACKS = [
  {
    color: 'cyan',
    badge: 'Inteligencia',
    titulo: 'Pack Datos & Dashboards',
    ideal: 'Para empresas que tienen datos pero no saben qué hacer con ellos',
    items: ['Modelo de datos simple', 'Integración de fuentes existentes', 'Dashboard ejecutivo en la nube', 'Métricas clave del negocio'],
    resultado: 'Ver el negocio con datos claros.',
    tiempo: '21–30 días',
    wa: WA('Hola! Quiero cotizar el Pack Datos & Dashboards. ¿Me pueden ayudar?'),
  },
  {
    color: 'violet',
    badge: 'Avanzado',
    titulo: 'Pack IA Aplicada a Datos',
    ideal: 'Para empresas con un caso real donde un modelo puede tomar o apoyar decisiones',
    items: ['Diagnóstico del caso de uso', 'Diseño de modelo ML / LLM', 'Integración con datos existentes', 'Control, seguridad y monitoreo'],
    resultado: 'Modelos en producción, no demos.',
    tiempo: '30–45 días',
    wa: WA('Hola! Quiero cotizar el Pack IA Aplicada para datos. ¿Me pueden ayudar?'),
  },
];

const PACK_STYLES = {
  cyan:   { accent: 'bg-cyan-500',   badgeBg: 'bg-cyan-50',   badgeText: 'text-cyan-700',   dot: 'bg-cyan-500' },
  violet: { accent: 'bg-violet-600', badgeBg: 'bg-violet-50', badgeText: 'text-violet-700', dot: 'bg-violet-500' },
};

const SERVICIOS = [
  { nombre: 'Dashboards & Visualización', desc: 'Reportes interactivos en Power BI, Looker o Python. Métricas que el equipo realmente usa.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { nombre: 'Ingeniería de Datos',        desc: 'Pipelines ETL, ingesta en BigQuery y fuentes de datos limpias, confiables y actualizadas.', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
  { nombre: 'Machine Learning & IA',      desc: 'Modelos entrenados y desplegados en producción. No prototipos — sistemas que funcionan.', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { nombre: 'Reportes Automáticos',       desc: 'Informes que se generan solos y llegan donde tienen que llegar, sin intervención manual.', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { nombre: 'Consultoría en Datos',       desc: 'Te ayudamos a definir qué medir, cómo estructurarlo y qué herramienta tiene sentido para tu caso.', icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222' },
  { nombre: 'Capacitación para Equipos',  desc: 'Python, SQL, BI e IA aplicada. Formación práctica para que tu equipo trabaje con datos de verdad.', icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122' },
];

const STACK = ['Python', 'SQL', 'BigQuery', 'Dataflow', 'Power BI', 'Looker', 'Tableau', 'LangChain', 'GCP', 'pandas', 'scikit-learn', 'FastAPI'];

const DATA_BARS = [30, 45, 38, 62, 55, 72, 60, 80, 68, 88, 76, 100];
const DATA_INSIGHTS = [
  { dot: "bg-cyan-500",   text: "Tu mejor mes fue octubre (+18%)" },
  { dot: "bg-violet-500", text: "El canal online creció 34% vs presencial" },
  { dot: "bg-blue-500",   text: "El martes concentra el mayor volumen de ventas" },
];

function DataMockup() {
  return (
    <div className="relative select-none">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-50 via-slate-50 to-blue-50/40" />
      <div className="relative p-6 sm:p-8">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">

          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400 mb-0.5 uppercase tracking-wide">Analítica de negocio</div>
              <div className="text-sm font-bold text-slate-900">Dashboard Ejecutivo</div>
            </div>
            <div className="text-[10px] font-medium text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-100">
              Dic 2024
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-3 divide-x divide-slate-100">
            {[
              { label: "Ventas",     value: "$4.2M", badge: "+23%" },
              { label: "Clientes",   value: "1,248", badge: "+12%" },
              { label: "Conversión", value: "8.4%",  badge: "+1.2%" },
            ].map((kpi, i) => (
              <div key={i} className="px-4 py-4">
                <div className="text-[10px] text-slate-400 mb-0.5">{kpi.label}</div>
                <div className="text-base font-black text-slate-900">{kpi.value}</div>
                <div className="text-[10px] font-semibold text-emerald-600 mt-0.5">{kpi.badge}</div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="px-5 py-3 border-t border-slate-100">
            <div className="text-[10px] text-slate-400 mb-2">Ventas mensuales 2024</div>
            <div className="flex items-end gap-1 h-12">
              {DATA_BARS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{
                    height: `${h}%`,
                    backgroundColor: i === 11 ? "#0891b2" : i >= 9 ? "#a5f3fc" : "#e2e8f0",
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-slate-300">Ene</span>
              <span className="text-[9px] font-semibold text-cyan-600">Dic ↑</span>
            </div>
          </div>

          {/* Insights */}
          <div className="border-t border-slate-100 px-5 py-3 space-y-2">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">Insights automáticos</div>
            {DATA_INSIGHTS.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${item.dot}`} />
                <span className="text-[11px] text-slate-600">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mini cards */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 px-4 py-3">
            <div className="text-[10px] text-slate-400 mb-1.5">Datos actualizados</div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-slate-800">Automáticamente</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 px-4 py-3">
            <div className="text-[10px] text-slate-400 mb-1">Fuentes conectadas</div>
            <div className="text-sm font-bold text-slate-900">4 <span className="text-xs font-normal text-slate-400">sistemas</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServiciosDatos() {
  useEffect(() => {
    document.title = 'Datos & Analítica — Sur Digital Labs Coyhaique';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Dashboards, pipelines de datos, ML e inteligencia artificial en Coyhaique. Ingeniería de datos y analítica avanzada para pymes y empresas de la Patagonia.');
  }, []);

  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section className="bg-white py-16 sm:py-20 border-b border-slate-100">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-cyan-500 inline-block" />
            <span className="text-sm font-medium text-slate-500">Datos & Analítica</span>
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 leading-tight tracking-tight">
                Convierte tus datos en decisiones.
              </h1>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                Pipelines, dashboards y modelos ML. Para que dejes de tomar decisiones con hojas de cálculo dispersas y datos que nadie entiende.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors duration-200"
                >
                  Cotiza tu proyecto
                </Link>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:text-slate-900 transition-colors duration-200"
                >
                  Agenda una llamada
                </a>
              </div>
            </div>
            <div><DataMockup /></div>
          </div>
        </div>
      </section>

      {/* ── PACKS ── */}
      <section className="bg-slate-50 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950">Packs de Datos</h2>
            <p className="mt-2 text-sm text-slate-500 max-w-lg mx-auto">
              Alcance, tiempo y resultado definidos desde el inicio.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 max-w-2xl mx-auto">
            {PACKS.map((pack) => {
              const s = PACK_STYLES[pack.color];
              return (
                <article key={pack.titulo} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all duration-200">
                  <div className={`h-1 ${s.accent}`} />
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="mb-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.badgeBg} ${s.badgeText}`}>
                        {pack.badge}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-950 mb-1 leading-tight">{pack.titulo}</h3>
                    <p className="text-xs text-slate-400 mb-4">{pack.ideal}</p>
                    <ul className="space-y-2 mb-5 flex-1">
                      {pack.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                          <span className={`h-1.5 w-1.5 rounded-full ${s.dot} mt-1 shrink-0`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 mb-4">
                      <p className="text-xs text-slate-400 mb-0.5">{pack.tiempo}</p>
                      <p className="text-xs font-semibold text-slate-700">{pack.resultado}</p>
                    </div>
                    <a
                      href={pack.wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center rounded-full bg-slate-950 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors duration-200"
                    >
                      Cotizar por WhatsApp
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ÁREAS ── */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950">Cómo lo hacemos</h2>
            <p className="mt-2 text-sm text-slate-500">Las capacidades que aplicamos en cada proyecto de datos</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {AREAS.map((a) => (
              <article key={a.titulo} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className={`h-10 w-10 rounded-xl ${a.bg} ${a.color} grid place-items-center mb-4`}>
                  {a.icon}
                </div>
                <h3 className="text-sm font-semibold text-slate-950 mb-1.5 leading-tight">{a.titulo}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{a.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── STACK ── */}
      <section className="border-y border-slate-100 bg-slate-50 py-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">
            Herramientas que usamos a diario
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {STACK.map((tech) => (
              <span key={tech} className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICIOS INDIVIDUALES ── */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950">Catálogo de servicios</h2>
            <p className="mt-2 text-sm text-slate-500">Todo el alcance del área de Datos & Analítica</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICIOS.map((s) => (
              <article
                key={s.nombre}
                className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
              >
                <div className="h-8 w-8 rounded-lg bg-cyan-50 text-cyan-600 grid place-items-center mb-3">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={s.icon} />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-slate-950 mb-1 leading-tight">{s.nombre}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors"
            >
              ¿Tienes un caso específico? Cuéntanos →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="bg-slate-950 rounded-2xl sm:rounded-3xl px-8 py-12 sm:px-12 sm:py-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              ¿Empezamos con tus datos?
            </h2>
            <p className="text-slate-400 mb-8 text-sm">Coyhaique · Respuesta en menos de 24 h.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 transition-colors duration-200"
              >
                Cotiza tu proyecto
              </Link>
              <a
                href={CALENDLY}
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
