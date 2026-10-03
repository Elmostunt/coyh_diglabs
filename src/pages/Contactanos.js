import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useSEO } from '../hooks/useSEO';
import { useReveal } from '../hooks/useReveal';
import { EditorialFAQ, waLink, CALENDLY_URL } from '../components/Editorial';

const WA_GENERAL = waLink("Hola! Me gustaría conversar sobre un proyecto. ¿Pueden ayudarme?");

const NECESIDADES = [
  "Una página web",
  "Un sistema o aplicación a medida",
  "Automatizar un proceso manual",
  "Datos, dashboards o reportes",
  "Cloud / asesoría tecnológica",
  "Aún no lo tengo claro",
];

const FAQ_CONTACTO = [
  { q: "¿Cuál es el primer paso?", a: "Cuéntanos tu problema por el formulario, WhatsApp o una llamada. Te respondemos en menos de 24 horas con una evaluación inicial. Sin compromiso." },
  { q: "¿Cuánto cuesta la primera conversación?", a: "Nada. La evaluación inicial es gratis: primero entendemos tu caso y, si tiene sentido trabajar juntos, definimos alcance y presupuesto." },
  { q: "No sé qué tecnología necesito. ¿Igual puedo escribir?", a: "Claro. No necesitas saber de tecnología: descríbenos el problema del negocio y nosotros proponemos cómo resolverlo." },
  { q: "¿Hacen proyectos pequeños?", a: "Sí. Trabajamos desde un sitio web o una automatización puntual hasta sistemas completos. Lo importante es que el objetivo esté claro." },
];

const inputCls = "w-full h-12 border-0 border-b border-ink/25 bg-transparent px-0 text-base text-ink placeholder:text-ink/35 focus:outline-none focus:border-ink focus:ring-0 transition-colors";
const labelCls = "block font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55";

const Contactanos = () => {
  useReveal();
  const [formData, setFormData] = useState({ nombre: "", empresa: "", email: "", necesidad: "", mensaje: "", website: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useSEO({
    title: 'Conversemos sobre tu proyecto | Sur Digital Labs',
    description: 'Cuéntanos el problema de tu empresa: software, datos, automatización o cloud. Respuesta en menos de 24 horas, sin compromiso. Coyhaique, Aysén.',
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
          message:      (formData.necesidad ? `[Necesita: ${formData.necesidad}]\n\n` : "") + formData.mensaje,
          reply_to:     formData.email,
        },
        { publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY }
      );
      setSubmitStatus("success");
      setFormData({ nombre: "", empresa: "", email: "", necesidad: "", mensaje: "", website: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-paper text-ink">

      {/* ── HERO + FORM ── */}
      <section className="border-b border-ink/10">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-8 sm:pt-12 pb-16 sm:pb-20">
          <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-ink/50 border-b border-ink/10 pb-4">
            <span>Contacto</span>
            <span className="text-laguna">● Respuesta en menos de 24 h</span>
          </div>

          <div className="mt-10 sm:mt-14 grid lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Columna izquierda: titular + canales */}
            <div className="lg:col-span-5" data-reveal>
              <h1 className="font-display font-medium text-[clamp(2.6rem,7vw,4.8rem)] leading-[1] tracking-tight">
                Conversemos<span className="text-laguna">.</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-ink/70 leading-relaxed">
                Cuéntanos el problema — no necesitas saber qué tecnología se requiere. Evaluamos tu caso y te respondemos en menos de 24 horas, sin compromiso.
              </p>

              <div className="mt-10 border-t border-ink/15">
                {[
                  { label: "WhatsApp", value: "+56 9 7520 4813", href: WA_GENERAL, ext: true, note: "Lo más rápido" },
                  { label: "Videollamada", value: "Agenda 30 minutos", href: CALENDLY_URL, ext: true, note: "Sin costo" },
                  { label: "Email", value: "surdigitallabs@gmail.com", href: "mailto:surdigitallabs@gmail.com" },
                  { label: "Teléfono", value: "+56 9 7520 4813", href: "tel:+56975204813" },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.ext ? "_blank" : undefined}
                    rel={c.ext ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between gap-4 border-b border-ink/10 py-4 hover:bg-paper2/70 px-2 -mx-2 transition-colors duration-200"
                  >
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                        {c.label}{c.note && <span className="text-ember"> · {c.note}</span>}
                      </p>
                      <p className="mt-0.5 font-display text-lg text-ink">{c.value}</p>
                    </div>
                    <span className="text-ink/40 group-hover:text-ink transition-colors">{c.ext ? "↗" : "→"}</span>
                  </a>
                ))}
              </div>

              <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45 leading-relaxed">
                Coyhaique, Región de Aysén<br />
                Lun–Vie 9:00–18:00 · Sáb 10:00–14:00
              </div>
            </div>

            {/* Columna derecha: formulario tipo carta */}
            <div className="lg:col-span-7" data-reveal style={{ "--reveal-delay": "120ms" }}>
              <div className="border border-ink/20 bg-paper p-6 sm:p-10 relative">
                <span className="absolute -top-3 left-6 bg-paper px-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
                  Formulario
                </span>

                {submitStatus === "success" ? (
                  <div className="py-10 text-center" role="status">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-laguna">Mensaje enviado</p>
                    <p className="mt-4 font-display text-3xl sm:text-4xl text-ink leading-tight">Gracias. Te respondemos en menos de 24 horas.</p>
                    <button
                      type="button"
                      onClick={() => setSubmitStatus(null)}
                      className="mt-8 link-rule text-sm font-semibold text-ink/70"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-7">
                    {/* Honeypot */}
                    <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
                      <input type="text" name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-7">
                      <div>
                        <label htmlFor="nombre" className={labelCls}>Tu nombre *</label>
                        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required autoComplete="name" placeholder="Nombre y apellido" className={inputCls} />
                      </div>
                      <div>
                        <label htmlFor="empresa" className={labelCls}>Empresa</label>
                        <input type="text" id="empresa" name="empresa" value={formData.empresa} onChange={handleChange} autoComplete="organization" placeholder="Opcional" className={inputCls} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className={labelCls}>Email *</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" placeholder="tu@empresa.cl" className={inputCls} />
                    </div>

                    <fieldset>
                      <legend className={labelCls}>¿Qué necesitas?</legend>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {NECESIDADES.map((n) => {
                          const active = formData.necesidad === n;
                          return (
                            <button
                              key={n}
                              type="button"
                              aria-pressed={active}
                              onClick={() => setFormData((prev) => ({ ...prev, necesidad: active ? "" : n }))}
                              className={`rounded-sm border px-3 py-2 text-[13px] transition-colors duration-200 ${
                                active ? "bg-ink text-paper border-ink" : "border-ink/20 text-ink/70 hover:border-ink/50"
                              }`}
                            >
                              {n}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>

                    <div>
                      <label htmlFor="mensaje" className={labelCls}>Cuéntanos brevemente el problema *</label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Ej: hoy llevamos los pedidos en Excel y se nos pierden entre correos…"
                        className="mt-2 w-full border border-ink/20 bg-transparent p-4 text-base text-ink placeholder:text-ink/35 focus:outline-none focus:border-ink resize-none transition-colors"
                      />
                    </div>

                    {submitStatus === "error" && (
                      <p className="border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-ember" role="alert">
                        No pudimos enviar el mensaje. Intenta de nuevo o escríbenos por WhatsApp.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-sm bg-ink px-8 py-4 text-sm font-semibold text-paper hover:bg-petrol dark:hover:bg-aqua dark:hover:text-night transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Enviando…" : "Enviar mensaje"}
                      {!isSubmitting && <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <EditorialFAQ num="02" items={FAQ_CONTACTO} />
    </div>
  );
};

export default Contactanos;
