// src/pages/Nosotros.js
import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import FAQ from '../components/FAQ';

const useSEO = (title, description) => {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [title, description]);
};

const TeamCard = ({ name, role, img, linkedin, email }) => (
  <article className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
    <div className="aspect-square overflow-hidden bg-slate-50 dark:bg-slate-700">
      <img
        src={img}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onError={(e) => { e.target.src = '/logo_chico.jpg'; }}
      />
    </div>
    <div className="p-5">
      <h3 className="text-base font-bold text-slate-950 dark:text-white mb-0.5">{name}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{role}</p>
      <div className="flex gap-2">
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} LinkedIn`}
            className="h-9 w-9 grid place-items-center rounded-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-200"
          >
            <svg viewBox="0 0 448 512" className="h-3.5 w-3.5 fill-current">
              <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 1 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
            </svg>
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            aria-label={`${name} email`}
            className="h-9 w-9 grid place-items-center rounded-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-200"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  </article>
);

const VALUES = [
  {
    title: 'Calidad',
    desc: 'Cada entrega cumple un estándar que nos enorgullece. No hay atajos.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    bg: 'bg-blue-50', color: 'text-blue-600',
  },
  {
    title: 'Criterio',
    desc: 'Aplicamos tecnología donde realmente tiene sentido — no porque esté de moda.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    bg: 'bg-violet-50', color: 'text-violet-600',
  },
  {
    title: 'Comunidad',
    desc: 'Somos de aquí. Apostamos por el crecimiento tecnológico de la Patagonia.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    bg: 'bg-emerald-50', color: 'text-emerald-600',
  },
];

const PARA_QUIENES = [
  "Pymes y empresas que necesitan software real, no plantillas ni soluciones genéricas.",
  "Organizaciones que quieren un partner técnico confiable, no una agencia que desaparece.",
  "Equipos que buscan automatizar procesos con impacto real y medible.",
];

const FAQ_NOSOTROS = [
  {
    q: "¿Cuánto tiempo han estado en el mercado?",
    a: "Más de 8 años desarrollando software profesional. Comenzamos como desarrolladores freelance y hemos evolucionado a una consultora especializada con proyectos reales en producción.",
  },
  {
    q: "¿Dónde están ubicados? ¿Solo trabajan en Coyhaique?",
    a: "Tenemos base en Coyhaique, Región de Aysén, pero trabajamos con clientes en todo Chile y Latinoamérica. El trabajo es 100% remoto — la ubicación no es limitante.",
  },
  {
    q: "¿Qué pasa si necesito soporte después de la entrega?",
    a: "Ofrecemos soporte y mantenimiento continuo. Muchos clientes están con nosotros a largo plazo — desde acompañamiento técnico hasta evoluciones del sistema.",
  },
  {
    q: "¿Cuál es la metodología de trabajo?",
    a: "Desarrollo iterativo con entregas funcionales cada 1-2 semanas. Entendemos primero, definimos juntos el alcance, construimos con criterio, entregamos con documentación y seguimos disponibles.",
  },
  {
    q: "¿Trabajan con equipos internos o solo agencias?",
    a: "Trabajamos principalmente con empresas y sus equipos internos. Nos encanta transferencia de conocimiento — el objetivo es que tu equipo sea independiente después.",
  },
];

const Nosotros = () => {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  useSEO(
    "Nosotros - Socio tecnológico en Coyhaique, Patagonia | Sur Digital Labs",
    "Equipo con base en Coyhaique, Aysén: software, datos y automatización con estándar profesional."
  );

  const team = useMemo(() => [
    {
      name: "Guillermo Cárcamo Díaz",
      role: "Fundador · Ing. de Ejecución en Informática",
      img: "https://storage.googleapis.com/surdigilabs_images/nosotros/guillermo.png",
    },
    {
      name: "Memo",
      role: "Chief Happiness Officer",
      img: "https://storage.googleapis.com/surdigilabs_images/nosotros/memito.jpeg",
    },
  ], []);

  const proyectos = useMemo(() => [
    {
      titulo: "Plataforma de agentes con IA",
      desc: "Sistema multi-agente con LangChain y FastAPI para automatizar flujos de análisis que antes requerían intervención manual constante.",
      resultado: "El equipo del cliente lo opera solo — sin llamarnos.",
    },
    {
      titulo: "Infraestructura de datos en GCP",
      desc: "Migración de base de datos manual a un stack cloud con Terraform, BigQuery y VPC peering. Sin interrupciones, con documentación completa.",
      resultado: "Infraestructura reproducible que el cliente puede auditar y evolucionar.",
    },
    {
      titulo: "Sistema de gestión operativa",
      desc: "Frontend en Next.js + backend FastAPI para reemplazar hojas de cálculo en la planificación de operaciones de campo.",
      resultado: "De Excel a una app propia. Menos errores, más visibilidad.",
    },
  ], []);

  const proceso = useMemo(() => [
    { paso: "01", titulo: "Entendemos tu caso", desc: "Antes de proponer nada, escuchamos. Queremos entender el problema real, no el síntoma." },
    { paso: "02", titulo: "Definimos juntos el alcance", desc: "Qué se hace, en cuánto tiempo, con qué tecnología y por qué. Sin sorpresas después." },
    { paso: "03", titulo: "Construimos con criterio", desc: "Desarrollo iterativo. Te mostramos avances reales, no solo el resultado al final." },
    { paso: "04", titulo: "Entregamos y explicamos", desc: "Documentación, traspaso real y soporte en la puesta en marcha. Que funcione de verdad." },
    { paso: "05", titulo: "Seguimos contigo", desc: "Si el negocio cambia, el sistema puede cambiar. Estamos disponibles cuando nos necesitas." },
  ], []);

  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section className="bg-white dark:bg-slate-900 py-16 sm:py-20 border-b border-slate-100 dark:border-slate-700">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-blue-600 inline-block" />
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Coyhaique · Patagonia</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white leading-tight tracking-tight">
                Somos Sur Digital Labs. Hacemos tecnología que funciona.
              </h1>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Un equipo técnico en Coyhaique — sin agencias grandes, sin intermediarios. Proyectos reales, plazos reales, comunicación directa.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors duration-200"
                >
                  Cotiza tu proyecto
                </Link>
                <Link
                  to="/software"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-600 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500 transition-colors duration-200"
                >
                  Ver servicios →
                </Link>
              </div>
            </div>

            {/* Para quiénes — integrado en el hero */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
              <h2 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5">
                Para quiénes trabajamos
              </h2>
              <ul className="space-y-0">
                {PARA_QUIENES.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 py-3 border-b border-slate-200 dark:border-slate-600 last:border-0">
                    <span className="h-5 w-5 rounded-full bg-blue-50 text-blue-600 grid place-items-center shrink-0 mt-0.5">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROYECTOS ── */}
      <section className="bg-slate-50 dark:bg-slate-800 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">Proyectos representativos</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Casos reales descritos de forma anonimizada.</p>
          </div>
          <div className="space-y-4">
            {proyectos.map((proyecto, i) => (
              <article key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-black text-slate-100 dark:text-slate-700 leading-none shrink-0 select-none w-10 text-right">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-950 dark:text-white mb-2">{proyecto.titulo}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">{proyecto.desc}</p>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <p className="text-sm font-medium text-emerald-700">{proyecto.resultado}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESO ── */}
      <section className="bg-white dark:bg-slate-900 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">Cómo trabajamos</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Un proceso claro desde el primer contacto.</p>
          </div>
          <div className="grid gap-0 max-w-2xl">
            {proceso.map((item, i) => (
              <div key={item.paso} className="flex gap-6 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-black text-slate-100 dark:text-slate-700 leading-none select-none">
                    {item.paso}
                  </span>
                  {i < proceso.length - 1 && (
                    <div className="w-px flex-1 bg-slate-100 dark:bg-slate-700 mt-2" />
                  )}
                </div>
                <div className="pt-1">
                  <h3 className="text-base font-semibold text-slate-950 dark:text-white mb-1">{item.titulo}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TALENTO REGIONAL (sección destacada) ── */}
      <section className="bg-slate-950 dark:bg-slate-800 py-12 sm:py-14">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Apostamos por el talento de aquí
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Trabajamos con estudiantes y profesionales en formación de la región, siempre con supervisión senior. El resultado final cumple estándar profesional — eso no se negocia.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-black text-white mb-1">+8 años</div>
                <div className="text-sm text-slate-400">Experiencia en proyectos</div>
              </div>
              <div className="flex-1 bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-black text-white mb-1">7–14 días</div>
                <div className="text-sm text-slate-400">Primera entrega</div>
              </div>
              <div className="flex-1 bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-black text-white mb-1">Seguridad</div>
                <div className="text-sm text-slate-400">Desde el día 1</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EQUIPO ── */}
      <section className="bg-white dark:bg-slate-900 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white mb-3">Equipo</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                Equipo pequeño, criterio grande. Cada proyecto lo lleva una persona senior de principio a fin — no pasa por cinco manos antes de llegar a ti.
              </p>
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Y sí, Memo es real y está en cada reunión.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {team.map((persona, i) => (
                <TeamCard key={i} {...persona} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALORES ── */}
      <section className="bg-slate-50 dark:bg-slate-800 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">Valores</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VALUES.map((v) => (
              <article key={v.title} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
                <div className={`h-10 w-10 rounded-xl ${v.bg} ${v.color} grid place-items-center mb-4`}>
                  {v.icon}
                </div>
                <h3 className="text-base font-bold text-slate-950 dark:text-white mb-1">{v.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white dark:bg-slate-900 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <FAQ items={FAQ_NOSOTROS} title="Preguntas frecuentes" />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white dark:bg-slate-900 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="bg-slate-950 rounded-2xl sm:rounded-3xl px-8 py-12 sm:px-12 sm:py-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              ¿Proyecto en mente?
            </h2>
            <p className="text-slate-400 mb-8 text-sm">Coyhaique · Respuesta en menos de 24 h.</p>
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 transition-colors duration-200"
            >
              Hablemos
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Nosotros;
