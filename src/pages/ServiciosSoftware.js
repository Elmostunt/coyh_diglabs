import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const WA = (msg) => 'https://wa.me/56975204813?text=' + encodeURIComponent(msg);

const AREAS = [
  { icono: '⚡', titulo: 'Web & Aplicaciones', desc: 'Sitios corporativos, e-commerce y apps móviles que convierten y se mantienen en el tiempo.' },
  { icono: '🔧', titulo: 'Software a Medida', desc: 'Sistemas personalizados, APIs y backoffice construidos sobre tu proceso real, con documentación.' },
  { icono: '☁️', titulo: 'Cloud & DevOps', desc: 'Infraestructura en GCP y AWS con Terraform, CI/CD y monitoreo. Estable y reproducible.' },
  { icono: '🤖', titulo: 'Automatización', desc: 'Elimina tareas manuales con scripts Python, RPA e integraciones entre sistemas.' },
  { icono: '🔒', titulo: 'Seguridad', desc: 'Auditoría OWASP, cifrado de datos sensibles y hardening. Seguridad desde el día 1.' },
];

const PACKS = [
  {
    color: 'blue',
    badge: 'Esencial',
    star: true,
    titulo: 'Pack Web PYME Profesional',
    ideal: 'Pymes, emprendedores, servicios locales',
    resuelve: 'Presencia digital + conversión',
    items: ['Web corporativa (5–7 secciones)', 'Diseño responsive', 'SEO básico', 'Formulario + WhatsApp', 'Analytics configurado'],
    resultado: 'Web profesional que genera contactos.',
    tiempo: '7–14 días',
    wa: WA('Hola! Quiero cotizar el Pack Web PYME Profesional. ¿Me pueden ayudar?'),
  },
  {
    color: 'indigo',
    badge: 'Eficiencia',
    titulo: 'Pack Automatización & Backoffice',
    ideal: 'Empresas con procesos manuales repetitivos',
    resuelve: 'Pérdida de tiempo, Excel infinito, errores',
    items: ['Levantamiento de procesos', 'Automatización de flujos e integraciones', 'Backend en la nube', 'Documentación básica'],
    resultado: 'Menos tareas manuales, más orden.',
    tiempo: '14–21 días',
    wa: WA('Hola! Quiero cotizar el Pack Automatización & Backoffice. ¿Me pueden ayudar?'),
  },
  {
    color: 'violet',
    badge: 'Innovación',
    titulo: 'Pack IA Aplicada',
    ideal: 'Empresas con necesidad específica de IA',
    resuelve: 'Tareas complejas, análisis, asistencia interna',
    items: ['Diagnóstico del caso de uso', 'Diseño de solución con IA / LLM', 'Integración con backend existente', 'Control y seguridad'],
    resultado: 'Uso real de IA, no demo.',
    tiempo: '30–45 días',
    wa: WA('Hola! Quiero cotizar el Pack IA Aplicada. ¿Me pueden ayudar?'),
  },
  {
    color: 'slate',
    badge: 'Tranquilidad',
    titulo: 'Pack Acompañamiento Tecnológico',
    ideal: 'Empresas sin área TI interna',
    resuelve: 'Desorden técnico y malas decisiones',
    items: ['Soporte mensual', 'Revisión de sistemas', 'Asesoría técnica', 'Mejoras continuas'],
    resultado: 'Tranquilidad y orden tecnológico.',
    tiempo: 'Servicio mensual',
    wa: WA('Hola! Quiero cotizar el Pack Acompañamiento Tecnológico. ¿Me pueden ayudar?'),
  },
];

const PACK_STYLES = {
  blue:   { border: 'border-blue-500',   bg: 'bg-blue-50',   badge: 'bg-blue-600',   check: 'text-blue-600',   result: 'bg-blue-100 border-blue-200 text-blue-900',   btn: 'from-blue-600 to-blue-800' },
  indigo: { border: 'border-indigo-500', bg: 'bg-indigo-50', badge: 'bg-indigo-600', check: 'text-indigo-600', result: 'bg-indigo-100 border-indigo-200 text-indigo-900', btn: 'from-indigo-600 to-indigo-800' },
  violet: { border: 'border-violet-500', bg: 'bg-violet-50', badge: 'bg-violet-600', check: 'text-violet-600', result: 'bg-violet-100 border-violet-200 text-violet-900', btn: 'from-violet-600 to-violet-800' },
  slate:  { border: 'border-slate-500',  bg: 'bg-slate-50',  badge: 'bg-slate-600',  check: 'text-slate-600',  result: 'bg-slate-100 border-slate-200 text-slate-900',   btn: 'from-slate-600 to-slate-800' },
};

const SERVICIOS = [
  { nombre: 'Desarrollo Web Fullstack',      desc: 'Aplicaciones web con React, Node.js y bases de datos SQL/NoSQL.', img: '/webdev.jpg' },
  { nombre: 'Apps Móviles',                  desc: 'Aplicaciones nativas y multiplataforma con React Native o Flutter.', img: '/movil.jpg' },
  { nombre: 'E-commerce',                    desc: 'Tiendas online con Shopify, WooCommerce o desarrollo personalizado.', img: '/ecommerce.jpg' },
  { nombre: 'APIs REST y GraphQL',            desc: 'Servicios backend escalables y seguros para integración web y móvil.', img: '/apis.jpg' },
  { nombre: 'Software a Medida',             desc: 'Soluciones tecnológicas construidas sobre tus requerimientos reales.', img: '/custom_software.jpg' },
  { nombre: 'Optimización Web',              desc: 'Mejora de velocidad, rendimiento y caché en sitios existentes.', img: '/web_optimization.jpg' },
  { nombre: 'Migración de Sitios',           desc: 'Traslado entre servidores o plataformas sin pérdida de datos.', img: '/web_migration.jpg' },
  { nombre: 'Integración de Sistemas',       desc: 'Conexión entre aplicaciones empresariales via APIs y middleware.', img: '/integracion.jpg' },
  { nombre: 'Despliegue en la Nube',         desc: 'Configuración y administración en GCP, AWS y Azure.', img: '/cloud_native.jpg' },
  { nombre: 'DevOps e Infraestructura',      desc: 'Despliegues automáticos con Terraform, Kubernetes y CI/CD.', img: '/devops.jpg' },
  { nombre: 'Monitorización y Alertas',      desc: 'Monitoreo en Cloud Monitoring, Prometheus y Grafana.', img: '/alerts.jpg' },
  { nombre: 'Administración de Servidores',  desc: 'Gestión Linux y Windows para estabilidad, seguridad y rendimiento.', img: '/server_adm.jpg' },
  { nombre: 'Automatización con Python',     desc: 'Scripts para optimizar y automatizar flujos de trabajo empresariales.', img: '/python_automation.jpg' },
  { nombre: 'Automatización RPA',            desc: 'Bots para reducir tareas manuales en procesos repetitivos.', img: '/auto_rpa.jpg' },
  { nombre: 'Auditoría y Seguridad',         desc: 'Evaluación de vulnerabilidades y recomendaciones basadas en OWASP.', img: '/audit_security.jpg' },
  { nombre: 'Cifrado y Seguridad de Datos',  desc: 'Protocolos de seguridad y cifrado de información sensible.', img: '/cif_seg.jpg' },
];

export default function ServiciosSoftware() {
  useEffect(() => {
    document.title = 'Software & Desarrollo — Sur Digital Labs Coyhaique';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Desarrollo web, apps móviles, APIs, cloud, DevOps y automatización en Coyhaique. Software a medida para pymes y empresas de la Patagonia.');
  }, []);

  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-14 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold mb-4 tracking-wide uppercase">
              Software & Desarrollo
            </span>
            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Construimos software que tu equipo puede operar.
            </h1>
            <p className="mt-4 text-white/90 text-base leading-relaxed max-w-xl">
              Web, apps, cloud y automatización con hitos claros, documentación y acompañamiento real. Sin sorpresas.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-extrabold text-blue-700 shadow-lg hover:bg-white/90 transition touch-manipulation"
              >
                Cotiza tu proyecto
              </Link>
              <Link
                to="/datos"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition touch-manipulation"
              >
                Ver Datos & Analítica →
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
            <p className="mt-2 text-sm text-azulGrisaceo">Las capacidades que aplicamos en cada proyecto de software</p>
          </header>
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {AREAS.map((a) => (
              <article key={a.titulo} className="rounded-xl border border-azulOscuro/10 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 grid place-items-center text-xl text-white mb-4 shadow-sm">
                  {a.icono}
                </div>
                <h3 className="text-sm font-extrabold text-azulOscuro mb-2 leading-tight">{a.titulo}</h3>
                <p className="text-xs text-azulGrisaceo leading-relaxed">{a.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PACKS */}
      <section className="bg-blancoHueso py-12 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <header className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-azulOscuro">Packs de Software</h2>
            <p className="mt-2 text-sm text-azulGrisaceo">Soluciones empaquetadas con alcance, tiempo y resultado definidos desde el inicio</p>
          </header>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {PACKS.map((pack) => {
              const s = PACK_STYLES[pack.color];
              return (
                <article key={pack.titulo} className={`rounded-xl border-2 ${s.border} ${s.bg} p-5 shadow-sm flex flex-col`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full ${s.badge} text-white text-xs font-extrabold`}>
                      {pack.badge}
                    </span>
                    {pack.star && (
                      <span className="px-2 py-0.5 rounded-full bg-white border border-blue-300 text-blue-700 text-xs font-extrabold">
                        Más solicitado
                      </span>
                    )}
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
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <header className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-azulOscuro">Todos los servicios</h2>
            <p className="mt-2 text-sm text-azulGrisaceo">Catálogo completo del área de Software & Desarrollo</p>
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
                    className="inline-flex items-center justify-center w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-3 py-2 text-xs font-extrabold text-white hover:shadow-md transition"
                  >
                    Cotizar →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SDLABCAR */}
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
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">¿Tienes un proyecto en mente?</h2>
            <p className="text-white/80 mb-6 text-sm">Coyhaique · Respuesta en menos de 24 h.</p>
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-extrabold text-blue-700 shadow-lg hover:bg-white/90 transition"
            >
              Cotiza tu proyecto
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
