import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import FAQ from '../components/FAQ';
import { useSEO } from '../hooks/useSEO';

const CALENDLY = "https://calendly.com/surdigitallabs/30min";
const WA_GENERAL = "https://wa.me/56975204813?text=" + encodeURIComponent("Hola! Me gustaría cotizar un proyecto. ¿Pueden ayudarme?");

const CONTACT_INFO = [
  {
    label: "Email",
    value: "surdigitallabs@gmail.com",
    href: "mailto:surdigitallabs@gmail.com",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Teléfono",
    value: "+56 9 7520 4813",
    href: "tel:+56975204813",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: "Ubicación",
    value: "Coyhaique, Aysén, Chile",
    href: null,
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const FAQ_CONTACTO = [
  {
    q: "¿Cuál es el primer paso para trabajar con ustedes?",
    a: "Envía un mensaje con tu proyecto o consulta. Te respondemos en menos de 24 horas con una evaluación inicial. Sin compromiso.",
  },
  {
    q: "¿Cuánto cuesta una consultoría inicial?",
    a: "La evaluación inicial es completamente gratis. Nos encanta entender tu caso primero, sin presiones. Si hay mutual interés, definimos presupuesto y alcance juntos.",
  },
  {
    q: "¿Puedo agendar una llamada directa?",
    a: "Sí. Usa nuestro calendario (Calendly) para agendar 30 minutos de conversación. O usa WhatsApp si prefieres algo más rápido y directo.",
  },
  {
    q: "¿Qué información necesitan para hacer un presupuesto?",
    a: "El objetivo del proyecto, usuarios/equipo involucrado, timeline aproximado y presupuesto de referencia si lo tienes. Con eso hacemos una primera propuesta técnica.",
  },
  {
    q: "¿Hacen proyectos muy pequeños o solo grandes?",
    a: "Trabajamos desde landing pages hasta sistemas complejos. Lo importante es que el proyecto tenga claridad en su objetivo. No hay tamaño mínimo si el caso es interesante.",
  },
];

const Contactanos = () => {
  const [formData, setFormData] = useState({ nombre: "", empresa: "", email: "", mensaje: "", website: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useSEO({
    title: 'Contacta Sur Digital Labs | Consulta Gratis en 24h',
    description: 'Escríbenos para consulta sin compromiso. Software, datos, cloud y automatización. Respuesta garantizada en menos de 24 horas.',
    path: '/contacto',
    ogImage: '/og-contacto.jpg',
    faqs: FAQ_CONTACTO,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.website) return;
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name:    formData.nombre,
          from_empresa: formData.empresa || "No indicada",
          from_email:   formData.email,
          message:      formData.mensaje,
          reply_to:     formData.email,
        },
        { publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY }
      );
      setSubmitStatus("success");
      setFormData({ nombre: "", empresa: "", email: "", mensaje: "", website: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section className="bg-white dark:bg-slate-900 py-16 sm:py-20 border-b border-slate-100 dark:border-slate-700">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-blue-600 inline-block" />
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Contacto</span>
          </div>
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white leading-tight tracking-tight">
              Cuéntanos tu proyecto.
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Sin compromiso. Evaluamos tu caso y te respondemos en menos de 24 h.
            </p>
          </div>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="bg-slate-50 dark:bg-slate-800 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2">

            {/* Formulario */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 sm:p-8 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">Escríbenos</h2>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                  Respuesta en 24h
                </span>
              </div>

              {submitStatus === "success" && (
                <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-100 p-4 flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center shrink-0 mt-0.5">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-emerald-800">¡Mensaje enviado! Te contactaremos pronto.</p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 rounded-xl bg-red-50 border border-red-100 p-4 flex items-start gap-3" role="alert">
                  <div className="h-5 w-5 rounded-full bg-red-100 text-red-600 grid place-items-center shrink-0 mt-0.5">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-red-800">No pudimos enviar el mensaje. Intenta de nuevo.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
                  <input type="text" name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                </div>

                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre"
                    className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 text-sm text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="empresa" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Empresa u organización
                  </label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    placeholder="Nombre de tu empresa (opcional)"
                    className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 text-sm text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
                    className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 text-sm text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Cuéntanos sobre tu proyecto o consulta..."
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-slate-950 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            </div>

            {/* Información + acciones */}
            <div className="space-y-5">

              {/* Datos de contacto */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-6">Información de contacto</h2>
                <ul className="space-y-5">
                  {CONTACT_INFO.map((item) => (
                    <li key={item.label} className="flex items-center gap-4">
                      <div className="h-9 w-9 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 text-slate-500 dark:text-slate-400 grid place-items-center shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm font-medium text-slate-950 dark:text-white hover:text-blue-600 transition-colors duration-200">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-slate-950 dark:text-white">{item.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contacto directo */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-950 dark:text-white mb-4">Contacto directo</h3>
                <div className="space-y-2.5">
                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-950 dark:hover:text-white transition-colors duration-200"
                  >
                    <span className="flex items-center gap-2.5">
                      <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Agenda una llamada de 30 min
                    </span>
                    <svg className="h-4 w-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    href={WA_GENERAL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-950 dark:hover:text-white transition-colors duration-200"
                  >
                    <span className="flex items-center gap-2.5">
                      <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp — respuesta rápida
                    </span>
                    <svg className="h-4 w-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Horario */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 px-5 py-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                  Lun–Vie 9:00–18:00 · Sáb 10:00–14:00 · Respuesta en menos de 24 h
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-slate-50 dark:bg-slate-800 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <FAQ items={FAQ_CONTACTO} title="Preguntas frecuentes" />
        </div>
      </section>

    </div>
  );
};

export default Contactanos;
