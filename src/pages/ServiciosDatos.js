import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const WA = (msg) => 'https://wa.me/56975204813?text=' + encodeURIComponent(msg);

const AREAS = [
  { icono: '📊', titulo: 'Dashboards & Analytics', desc: 'Visualizaciones en Power BI, Looker y Python. Métricas clave del negocio en tiempo real.' },
  { icono: '🔄', titulo: 'Ingeniería de Datos', desc: 'Pipelines ETL, ingesta en BigQuery y Dataflow. Datos limpios, disponibles y confiables.' },
  { icono: '🤖', titulo: 'ML & Inteligencia Artificial', desc: 'Modelos predictivos, LLMs y análisis avanzado para automatizar decisiones con datos.' },
  { icono: '🗃️', titulo: 'Bases de Datos', desc: 'Modelado, optimización y administración de BD relacionales y NoSQL para mejor rendimiento.' },
  { icono: '🎓', titulo: 'Consultoría & Formación', desc: 'Estrategia de datos, roadmaps técnicos y capacitación práctica para tu equipo.' },
];

const PACKS = [
  {
    color: 'green',
    badge: 'Inteligencia',
    titulo: 'Pack Datos & Dashboards',
    ideal: 'Empresas que operan pero no miden bien',
    resuelve: 'Decisiones a ciegas, métricas dispersas',
    items: ['Modelo de datos simple', 'Integración de fuentes existentes', 'Dashboard ejecutivo en la nube', 'Métricas clave del negocio'],
    resultado: 'Ver el negocio con datos claros.',
    tiempo: '21–30 días',
    wa: WA('Hola! Quiero cotizar el Pack Datos & Dashboards. ¿Me pueden ayudar?'),
  },
  {
    color: 'emerald',
    badge: 'Avanzado',
    titulo: 'Pack IA Aplicada a Datos',
    ideal: 'Empresas con necesidad de análisis predictivo',
    resuelve: 'Análisis manual, predicciones imposibles, patrones ocultos',
    items: ['Diagnóstico del caso de uso', 'Diseño de modelo ML / LLM', 'Integración con datos existentes', 'Control, seguridad y monitoreo'],
    resultado: 'Modelos en producción, no demos.',
    tiempo: '30–45 días',
    wa: WA('Hola! Quiero cotizar el Pack IA Aplicada para datos. ¿Me pueden ayudar?'),
  },
];

const PACK_STYLES = {
  green:   { border: 'border-green-500',   bg: 'bg-green-50',   badge: 'bg-green-600',   check: 'text-green-600',   result: 'bg-green-100 border-green-200 text-green-900',     btn: 'from-green-600 to-green-800' },
  emerald: { border: 'border-emerald-500', bg: 'bg-emerald-50', badge: 'bg-emerald-600', check: 'text-emerald-600', result: 'bg-emerald-100 border-emerald-200 text-emerald-900', btn: 'from-emerald-600 to-emerald-800' },
};

const SERVICIOS = [
  { nombre: 'Optimización de Bases de Datos',     desc: 'Mejora de rendimiento y estructura en BD relacionales y NoSQL.', img: '/db_optimization.jpg' },
  { nombre: 'Análisis y Visualización de Datos',   desc: 'Dashboards interactivos y reportes en Power BI, Tableau y Python.', img: '/data_viz.jpg' },
  { nombre: 'Consultoría en Ciencia de Datos',     desc: 'Asesoramiento para implementar estrategias y soluciones basadas en datos.', img: '/cienciadatos_consultoria.jpg' },
  { nombre: 'Big Data e Ingesta',                  desc: 'Procesamiento de grandes volúmenes en BigQuery, Dataflow y Apache Beam.', img: '/bigdata.jpg' },
  { nombre: 'Machine Learning & IA',               desc: 'Entrenamiento y despliegue de modelos para predicciones y automatización.', img: '/ml_ai.jpg' },
  { nombre: 'Reportes Automáticos',                desc: 'Generación de reportes automáticos en Google Sheets, Excel y otras plataformas.', img: '/reportes.jpg' },
  { nombre: 'Consultoría en Transformación Digital', desc: 'Asesoría para modernizar procesos empresariales con tecnología y datos.', img: '/consultoria.jpg' },
  { nombre: 'Capacitaciones en Datos',             desc: 'Cursos personalizados en Python, SQL, BI e IA aplicada para equipos.', img: '/capacitaciones.jpg' },
];

const STACK = ['Python', 'SQL', 'BigQuery', 'Dataflow', 'Power BI', 'Looker', 'Tableau', 'LangChain', 'GCP', 'pandas', 'scikit-learn', 'FastAPI'];

export default function ServiciosDatos() {
  useEffect(() => {
    document.title = 'Datos & Analítica — Sur Digital Labs Coyhaique';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Dashboards, pipelines de datos, ML e inteligencia artificial en Coyhaique. Ingeniería de datos y analítica avanzada para pymes y empresas de la Patagonia.');
  }, []);

  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 via-green-700 to-green-800">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-14 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold mb-4 tracking-wide uppercase">
              Datos & Analítica
            </span>
            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Convierte tus datos en decisiones.
            </h1>
            <p className="mt-4 text-white/90 text-base leading-relaxed max-w-xl">
              Dashboards, pipelines, modelos ML y consultoría. Para que tu empresa deje de operar con información dispersa o incompleta.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-extrabold text-green-700 shadow-lg hover:bg-white/90 transition touch-manipulation"
              >
                Cotiza tu proyecto
              </Link>
              <Link
                to="/software"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition touch-manipulation"
              >
                Ver Software & Desarrollo →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ÁREAS */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <header className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-azulOscuro">Áreas de trabajo</h2>
            <p className="mt-2 text-sm text-azulGrisaceo">Las capacidades que aplicamos en cada proyecto de datos</p>
          </header>
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {AREAS.map((a) => (
              <article key={a.titulo} className="rounded-xl border border-azulOscuro/10 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-600 to-green-800 grid place-items-center text-xl text-white mb-4 shadow-sm">
                  {a.icono}
                </div>
                <h3 className="text-sm font-extrabold text-azulOscuro mb-2 leading-tight">{a.titulo}</h3>
                <p className="text-xs text-azulGrisaceo leading-relaxed">{a.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="bg-blancoHueso py-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <p className="text-center text-xs text-azulGrisaceo mb-4 font-semibold uppercase tracking-widest">Stack de datos</p>
          <div className="flex flex-wrap justify-center gap-2">
            {STACK.map((tech) => (
              <span key={tech} className="px-3 py-1.5 rounded-full bg-white border border-green-200 text-green-800 text-xs font-semibold shadow-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PACKS */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <header className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-azulOscuro">Packs de Datos</h2>
            <p className="mt-2 text-sm text-azulGrisaceo">Soluciones empaquetadas con alcance, tiempo y resultado definidos desde el inicio</p>
          </header>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto">
            {PACKS.map((pack) => {
              const s = PACK_STYLES[pack.color];
              return (
                <article key={pack.titulo} className={`rounded-xl border-2 ${s.border} ${s.bg} p-5 shadow-sm flex flex-col`}>
                  <div className="mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full ${s.badge} text-white text-xs font-extrabold`}>
                      {pack.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-azulOscuro mb-2 leading-tight">{pack.titulo}</h3>
                  <p className="text-xs text-azulGrisaceo mb-1">
                    <strong className="text-azulOscuro">Ideal para:</strong> {pack.ideal}
                  </p>
                  <p className="text-xs text-azulGrisaceo mb-3">
                    <strong className="text-azulOscuro">Resuelve:</strong> {pack.resuelve}
                  </p>
                  <ul className="space-y-1.5 mb-4 flex-1">
                    {pack.items.map((item) => (
                      <li key={item} className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                        <span className={`${s.check} mt-0.5 shrink-0 font-bold`}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={`rounded-lg border p-3 mb-4 ${s.result}`}>
                    <p className="text-xs font-semibold leading-snug">
                      <strong>Resultado:</strong> {pack.resultado}
                    </p>
                    <p className="text-xs mt-1">
                      <strong>Tiempo:</strong> {pack.tiempo}
                    </p>
                  </div>
                  <a
                    href={pack.wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-r ${s.btn} px-3 py-2.5 text-xs font-extrabold text-white shadow-sm hover:shadow-md transition touch-manipulation`}
                  >
                    Cotizar por WhatsApp
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICIOS INDIVIDUALES */}
      <section className="bg-blancoHueso py-12 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <header className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-azulOscuro">Todos los servicios</h2>
            <p className="mt-2 text-sm text-azulGrisaceo">Catálogo completo del área de Datos & Analítica</p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {SERVICIOS.map((s) => (
              <article
                key={s.nombre}
                className="group rounded-2xl border border-azulOscuro/10 bg-white overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden bg-azulOscuro/5">
                  <img
                    src={s.img}
                    alt={s.nombre}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { e.target.src = '/logo_chico.jpg'; }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-extrabold text-azulOscuro mb-1.5 leading-tight">{s.nombre}</h3>
                  <p className="text-xs text-azulGrisaceo leading-relaxed mb-3">{s.desc}</p>
                  <Link
                    to="/contacto"
                    className="inline-flex items-center justify-center w-full rounded-lg bg-gradient-to-r from-green-600 to-green-800 px-3 py-2 text-xs font-extrabold text-white hover:shadow-md transition"
                  >
                    Cotizar →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl bg-gradient-to-r from-green-600 via-green-700 to-green-800 p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">¿Listo para trabajar con tus datos?</h2>
            <p className="text-white/80 mb-6 text-sm">Coyhaique · Respuesta en menos de 24 h.</p>
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-extrabold text-green-700 shadow-lg hover:bg-white/90 transition"
            >
              Cotiza tu proyecto
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
