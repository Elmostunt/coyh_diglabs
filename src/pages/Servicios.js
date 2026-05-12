import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const WA = (msg) => 'https://wa.me/56975204813?text=' + encodeURIComponent(msg);

const PILLARS = [
  {
    id: 'software',
    to: '/software',
    icono: '⚡',
    titulo: 'Software & Desarrollo',
    tagline: 'Construimos software que tu equipo puede operar.',
    desc: 'Web, apps móviles, APIs, cloud y automatización. Proyectos con hitos claros, documentación y acompañamiento real.',
    color: 'blue',
    items: [
      'Desarrollo Web Fullstack & E-commerce',
      'Apps móviles (React Native / Flutter)',
      'APIs REST y software a medida',
      'Cloud & DevOps (GCP, AWS, Terraform)',
      'Automatización de procesos (Python, RPA)',
      'Seguridad y auditoría OWASP',
    ],
    cta: 'Ver Software →',
  },
  {
    id: 'datos',
    to: '/datos',
    icono: '📊',
    titulo: 'Datos & Analítica',
    tagline: 'Convierte tus datos en decisiones.',
    desc: 'Dashboards, pipelines, modelos ML y consultoría. Para que tu empresa deje de operar con información dispersa.',
    color: 'green',
    items: [
      'Dashboards y reportes ejecutivos',
      'Pipelines ETL y Big Data (BigQuery)',
      'Machine Learning e IA aplicada',
      'Optimización de bases de datos',
      'Ciencia de datos y análisis avanzado',
      'Capacitaciones en datos para equipos',
    ],
    cta: 'Ver Datos →',
  },
];

const PILLAR_STYLES = {
  blue: {
    border: 'border-blue-200',
    bg: 'bg-gradient-to-br from-blue-50 to-white',
    icon: 'from-blue-600 to-blue-800',
    check: 'text-blue-600',
    btn: 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900',
    tag: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  green: {
    border: 'border-green-200',
    bg: 'bg-gradient-to-br from-green-50 to-white',
    icon: 'from-green-600 to-green-800',
    check: 'text-green-600',
    btn: 'bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900',
    tag: 'bg-green-100 text-green-800 border-green-200',
  },
};

export default function Servicios() {
  useEffect(() => {
    document.title = 'Servicios — Sur Digital Labs Coyhaique';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Software a medida, datos y analítica en Coyhaique. Socio tecnológico para pymes y empresas regionales de la Patagonia.');
  }, []);

  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-800 to-green-700">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-14 md:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Nuestros Servicios
            </h1>
            <p className="mt-4 text-white/90 text-base leading-relaxed">
              Dos áreas especializadas. Un solo socio tecnológico.{' '}
              <Link to="/contacto" className="text-white underline hover:no-underline">Cotiza tu proyecto</Link>
            </p>
          </div>
        </div>
      </section>

      {/* DOS PILARES */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {PILLARS.map((pillar) => {
              const s = PILLAR_STYLES[pillar.color];
              return (
                <article
                  key={pillar.id}
                  className={`rounded-2xl border-2 ${s.border} ${s.bg} p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col`}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${s.icon} grid place-items-center text-2xl text-white shadow-sm shrink-0`}>
                      {pillar.icono}
                    </div>
                    <div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full border text-xs font-bold mb-1 ${s.tag}`}>
                        {pillar.titulo}
                      </span>
                      <p className="text-sm font-extrabold text-azulOscuro leading-snug">{pillar.tagline}</p>
                    </div>
                  </div>

                  <p className="text-sm text-azulGrisaceo leading-relaxed mb-5">{pillar.desc}</p>

                  <ul className="space-y-2 mb-6 flex-1">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-azulGrisaceo">
                        <span className={`${s.check} mt-0.5 shrink-0 font-bold`}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={pillar.to}
                    className={`inline-flex items-center justify-center rounded-xl ${s.btn} px-5 py-3 text-sm font-extrabold text-white shadow-sm hover:shadow-md transition touch-manipulation`}
                  >
                    {pillar.cta}
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SDLabCar */}
      <section className="bg-blancoHueso py-6">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="rounded-xl border border-amber-500/30 bg-amber-50/80 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-azulGrisaceo">
              <strong className="text-azulOscuro">SDLabCar:</strong> sistema de rentacar que se ajusta al proceso de cada empresa.
            </p>
            <a
              href={WA('Hola! Quiero información sobre SDLabCar (sistema de rentacar).')}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-sm font-extrabold text-amber-700 hover:text-amber-800"
            >
              Más info →
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blancoHueso py-10 sm:py-14">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl bg-gradient-to-r from-blue-700 via-blue-800 to-green-700 p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">¿Por dónde empezamos?</h2>
            <p className="text-white/80 mb-6 text-sm">Coyhaique · Respuesta en menos de 24 h.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-extrabold text-blue-700 shadow-lg hover:bg-white/90 transition"
              >
                Cotiza tu proyecto
              </Link>
              <a
                href="https://calendly.com/surdigitallabs/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition"
              >
                Agenda 30 min
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
