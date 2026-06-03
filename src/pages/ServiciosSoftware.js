import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Testimonials from '../components/Testimonials';
import CaseStudies from '../components/CaseStudies';
import FAQ from '../components/FAQ';
import WhatsAppWidget from '../components/WhatsAppWidget';

const WA = (msg) => 'https://wa.me/56975204813?text=' + encodeURIComponent(msg);
const CALENDLY = 'https://calendly.com/surdigitallabs/30min';

const AREAS = [
  {
    titulo: 'Web & Aplicaciones',
    desc: 'Sitios corporativos, e-commerce y apps móviles que convierten y se mantienen en el tiempo.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    bg: 'bg-blue-50', color: 'text-blue-600',
  },
  {
    titulo: 'Software a Medida',
    desc: 'Sistemas personalizados, APIs y backoffice construidos sobre tu proceso real, con documentación.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    bg: 'bg-indigo-50', color: 'text-indigo-600',
  },
  {
    titulo: 'Cloud & DevOps',
    desc: 'Infraestructura en GCP y AWS con Terraform, CI/CD y monitoreo. Estable y reproducible.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    bg: 'bg-sky-50', color: 'text-sky-600',
  },
  {
    titulo: 'Automatización',
    desc: 'Elimina tareas manuales con scripts Python, RPA e integraciones entre sistemas.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    bg: 'bg-violet-50', color: 'text-violet-600',
  },
  {
    titulo: 'Seguridad',
    desc: 'Auditoría OWASP, cifrado de datos sensibles y hardening. Seguridad desde el día 1.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    bg: 'bg-emerald-50', color: 'text-emerald-600',
  },
];

const PACKS = [
  {
    color: 'blue',
    badge: 'Esencial',
    popular: true,
    titulo: 'Pack Web PYME Profesional',
    ideal: 'Para negocios que necesitan presencia web profesional y funcional',
    items: ['Web corporativa (5–7 secciones)', 'Diseño responsive', 'SEO básico', 'Formulario + WhatsApp', 'Analytics configurado'],
    resultado: 'Web profesional que genera contactos.',
    tiempo: '7–14 días',
    wa: WA('Hola! Quiero cotizar el Pack Web PYME Profesional. ¿Me pueden ayudar?'),
  },
  {
    color: 'indigo',
    badge: 'Eficiencia',
    titulo: 'Pack Automatización & Backoffice',
    ideal: 'Para empresas que pierden tiempo en tareas que debería hacer una máquina',
    items: ['Levantamiento de procesos', 'Automatización de flujos e integraciones', 'Backend en la nube', 'Documentación básica'],
    resultado: 'Menos tareas manuales, más orden.',
    tiempo: '14–21 días',
    wa: WA('Hola! Quiero cotizar el Pack Automatización & Backoffice. ¿Me pueden ayudar?'),
  },
  {
    color: 'violet',
    badge: 'Innovación',
    titulo: 'Pack IA Aplicada',
    ideal: 'Para empresas con un caso real de uso de IA, no para explorar qué es la IA',
    items: ['Diagnóstico del caso de uso', 'Diseño de solución con IA / LLM', 'Integración con backend existente', 'Control y seguridad'],
    resultado: 'Uso real de IA, no demo.',
    tiempo: '30–45 días',
    wa: WA('Hola! Quiero cotizar el Pack IA Aplicada. ¿Me pueden ayudar?'),
  },
  {
    color: 'slate',
    badge: 'Tranquilidad',
    titulo: 'Pack Acompañamiento Tecnológico',
    ideal: 'Para empresas que necesitan un área TI sin contratarla de planta',
    items: ['Soporte mensual', 'Revisión de sistemas', 'Asesoría técnica', 'Mejoras continuas'],
    resultado: 'Tranquilidad y orden tecnológico.',
    tiempo: 'Servicio mensual',
    wa: WA('Hola! Quiero cotizar el Pack Acompañamiento Tecnológico. ¿Me pueden ayudar?'),
  },
];

const PACK_STYLES = {
  blue:   { accent: 'bg-blue-600',   badgeBg: 'bg-blue-50',   badgeText: 'text-blue-700',   dot: 'bg-blue-500' },
  indigo: { accent: 'bg-indigo-600', badgeBg: 'bg-indigo-50', badgeText: 'text-indigo-700', dot: 'bg-indigo-500' },
  violet: { accent: 'bg-violet-600', badgeBg: 'bg-violet-50', badgeText: 'text-violet-700', dot: 'bg-violet-500' },
  slate:  { accent: 'bg-slate-400',  badgeBg: 'bg-slate-100', badgeText: 'text-slate-600',  dot: 'bg-slate-400' },
};

const SERVICIOS = [
  { nombre: 'Desarrollo Web Fullstack',  desc: 'Aplicaciones web con React y Node.js que se mantienen solas y escalan cuando las necesitas.', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { nombre: 'E-commerce',               desc: 'Tienda online que funciona de verdad: pagos, pedidos y catálogo integrados en un solo lugar.', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
  { nombre: 'Software a Medida',        desc: 'Si no hay una herramienta que haga exactamente lo que necesitas, la construimos sobre tu proceso real.', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { nombre: 'APIs e Integraciones',     desc: 'Conectamos tus sistemas para que hablen entre sí y dejen de requerir trabajo manual de por medio.', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
  { nombre: 'Cloud & Despliegue',       desc: 'Tu aplicación en GCP o AWS, configurada para no darte problemas en producción.', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
  { nombre: 'DevOps e Infraestructura', desc: 'Terraform, Docker y CI/CD para que los despliegues sean predecibles y reversibles.', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  { nombre: 'Automatización',           desc: 'Scripts Python y flujos automáticos para eliminar tareas que no debería hacer un humano.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { nombre: 'Seguridad',                desc: 'Revisión OWASP, cifrado de datos sensibles y hardening. Seguridad pensada desde el diseño.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
];

// TODO: Agregar testimonios reales de clientes cuando estén disponibles
const TESTIMONIALS = [];

// TODO: Agregar casos de éxito reales cuando estén disponibles
const CASE_STUDIES = [];

const FAQ_ITEMS = [
  {
    question: '¿Cuánto cuesta un proyecto de desarrollo web?',
    answer: 'Depende del alcance. Un sitio corporativo básico comienza en $2.000-3.000 USD. Un e-commerce funcional está entre $5.000-10.000 USD. Software a medida personalizado puede ser mucho más. Podemos cotizar gratis después de una conversación de 30 minutos.'
  },
  {
    question: '¿Cuánto tiempo toma un proyecto típico?',
    answer: 'Nuestro Pack Web PYME Profesional se entrega en 7-14 días. Proyectos de automatización y backoffice toman 14-21 días. Software a medida completo puede tardar 60-120 días dependiendo de la complejidad. Siempre definimos plazos claros desde el inicio.'
  },
  {
    question: '¿Puedo hacer cambios después de que terminen?',
    answer: 'Sí. Incluimos un período de ajustes post-entrega. Cambios después de eso tienen costo. Además, ofrecemos Pack Acompañamiento Tecnológico para quienes quieren soporte continuo y mejoras mensuales.'
  },
  {
    question: '¿Trabajan con empresas grandes o solo PYMEs?',
    answer: 'Trabajamos con ambas. Nuestra fortaleza está en PYMEs y empresas medianas que necesitan soluciones específicas a un costo razonable. Nos encanta enfrentar casos únicos que las agencias grandes no quieren tocar.'
  },
  {
    question: '¿Incluye hosting y dominio?',
    answer: 'El hosting no está incluido por defecto, pero lo configuramos en tus servidores o en GCP/AWS si lo prefieres. El dominio corre por tu cuenta. Podemos asesorarte en ambos temas.'
  },
  {
    question: '¿Qué diferencia hay entre "a medida" y un template?',
    answer: 'Los templates son soluciones genéricas rápidas. Lo "a medida" es construido sobre tu proceso real: cómo trabajas, qué necesitas, qué datos tienes. Resultados completamente diferentes. Los templates son útiles si tu caso es estándar; lo a medida es para casos únicos.'
  }
];

function SoftwareMockup() {
  return (
    <div className="relative select-none">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50/40 dark:from-blue-950/40 dark:via-slate-800/40 dark:to-indigo-950/20" />
      <div className="relative p-6 sm:p-8">

        {/* Browser frame */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          {/* Chrome */}
          <div className="bg-slate-50 border-b border-slate-100 px-4 py-2.5 flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="flex-1 bg-white rounded border border-slate-200 px-3 py-1 text-[10px] text-slate-400">
              minegocio.cl
            </div>
          </div>

          {/* Site nav */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-50">
            <div className="h-3 w-20 bg-slate-900 rounded" />
            <div className="hidden sm:flex gap-4">
              <div className="h-2 w-10 bg-slate-200 rounded" />
              <div className="h-2 w-10 bg-slate-200 rounded" />
              <div className="h-2 w-10 bg-slate-200 rounded" />
            </div>
            <div className="h-7 w-20 bg-blue-600 rounded-full" />
          </div>

          {/* Hero */}
          <div className="bg-slate-50 px-5 py-5">
            <div className="h-2 w-28 bg-blue-100 rounded mb-3" />
            <div className="h-4 w-52 bg-slate-800 rounded mb-2" />
            <div className="h-3 w-40 bg-slate-300 rounded mb-4" />
            <div className="flex gap-2">
              <div className="h-8 w-24 bg-blue-600 rounded-full" />
              <div className="h-8 w-24 bg-white border border-slate-200 rounded-full" />
            </div>
          </div>

          {/* Cards */}
          <div className="px-5 py-4">
            <div className="grid grid-cols-3 gap-2.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-xl p-2.5 shadow-sm">
                  <div className="h-12 bg-slate-100 rounded-lg mb-2" />
                  <div className="h-2 w-full bg-slate-200 rounded mb-1" />
                  <div className="h-2 w-2/3 bg-slate-100 rounded mb-2" />
                  <div className="h-5 w-14 bg-blue-600 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 px-4 py-3 flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-50 grid place-items-center shrink-0">
              <svg className="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">+127%</div>
              <div className="text-[10px] text-slate-400">más consultas</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 px-4 py-3 flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-blue-50 grid place-items-center shrink-0">
              <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">7–14 días</div>
              <div className="text-[10px] text-slate-400">primera entrega</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServiciosSoftware() {
  useEffect(() => {
    document.title = 'Software & Desarrollo — Sur Digital Labs Coyhaique';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Desarrollo web, apps móviles, APIs, cloud, DevOps y automatización en Coyhaique. Software a medida para pymes y empresas de la Patagonia.');
  }, []);

  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section className="bg-white dark:bg-slate-900 py-16 sm:py-20 border-b border-slate-100 dark:border-slate-700">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-blue-600 inline-block" />
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Software & Desarrollo</span>
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white leading-tight tracking-tight">
                Software que funciona. Y que puedes mantener sin llamarnos cada semana.
              </h1>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Web, apps, cloud y automatización. Con plazos claros, documentación real y sin dependencias artificiales.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors duration-200"
                >
                  Cotiza tu proyecto
                </Link>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-600 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200"
                >
                  Agenda una llamada
                </a>
              </div>
            </div>
            <div><SoftwareMockup /></div>
          </div>
        </div>
      </section>

      {/* ── PACKS ── */}
      <section className="bg-slate-50 dark:bg-slate-800 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">Packs de Software</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
              Alcance, tiempo y resultado definidos desde el inicio — sin sorpresas.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PACKS.map((pack) => {
              const s = PACK_STYLES[pack.color];
              return (
                <article key={pack.titulo} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all duration-200">
                  <div className={`h-1 ${s.accent}`} />
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.badgeBg} ${s.badgeText}`}>
                        {pack.badge}
                      </span>
                      {pack.popular && (
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Más solicitado</span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-slate-950 dark:text-white mb-1 leading-tight">{pack.titulo}</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">{pack.ideal}</p>
                    <ul className="space-y-2 mb-5 flex-1">
                      {pack.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <span className={`h-1.5 w-1.5 rounded-full ${s.dot} mt-1 shrink-0`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 p-3 mb-4">
                      <p className="text-xs text-slate-400 dark:text-slate-500 mb-0.5">{pack.tiempo}</p>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{pack.resultado}</p>
                    </div>
                    <a
                      href={pack.wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center rounded-full bg-slate-950 dark:bg-white py-2.5 text-xs font-semibold text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors duration-200"
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
      <section className="bg-white dark:bg-slate-900 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">Cómo lo hacemos</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Las capacidades que aplicamos en cada proyecto</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {AREAS.map((a) => (
              <article key={a.titulo} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className={`h-10 w-10 rounded-xl ${a.bg} ${a.color} grid place-items-center mb-4`}>
                  {a.icon}
                </div>
                <h3 className="text-sm font-semibold text-slate-950 dark:text-white mb-1.5 leading-tight">{a.titulo}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{a.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICIOS INDIVIDUALES ── */}
      <section className="bg-slate-50 dark:bg-slate-800 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">Catálogo de servicios</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Todo el alcance del área de Software & Desarrollo</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICIOS.map((s) => (
              <article
                key={s.nombre}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
              >
                <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 grid place-items-center mb-3">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={s.icon} />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-slate-950 dark:text-white mb-1 leading-tight">{s.nombre}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              ¿No encuentras lo que buscas? Cuéntanos tu caso →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SDLABCAR ── */}
      <section className="bg-white dark:bg-slate-900 py-6 border-y border-slate-100 dark:border-slate-700">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-950 dark:text-white">SDLabCar</span> — sistema de rentacar adaptado al proceso de cada empresa.
            </p>
            <a
              href={WA('Hola! Quiero información sobre SDLabCar (sistema de rentacar).')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 shrink-0 transition-colors"
            >
              Más información →
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <Testimonials testimonials={TESTIMONIALS} />

      {/* ── CASOS DE ÉXITO ── */}
      <CaseStudies cases={CASE_STUDIES} />

      {/* ── FAQ ── */}
      <FAQ items={FAQ_ITEMS} title="Preguntas sobre Desarrollo Web & Software" />

      {/* ── CTA ── */}
      <section className="bg-white dark:bg-slate-900 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="bg-slate-950 rounded-2xl sm:rounded-3xl px-8 py-12 sm:px-12 sm:py-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              ¿Tienes un proyecto en mente?
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

      {/* ── WHATSAPP WIDGET ── */}
      <WhatsAppWidget
        phone="56975204813"
        message="Hola! Quisiera consultar sobre desarrollo web y software a medida para mi empresa."
      />

    </div>
  );
}
