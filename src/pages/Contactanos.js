import React, { useState, useEffect } from "react";

const Contactanos = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
    website: "", // honeypot: debe quedar vacío (anti-spam)
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // SEO
  useEffect(() => {
    document.title = "Contacto - Cotiza tu Proyecto de Software en Coyhaique | Sur Digital Labs";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contacta con Sur Digital Labs en Coyhaique, Patagonia. Cotiza tu proyecto de software, datos o automatización. Agenda diagnóstico gratuito o escríbenos por WhatsApp. Respuesta en menos de 24 h.');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.website) return; // honeypot: si está rellenado, es spam
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simular envío (aquí deberías integrar con tu API)
      await new Promise((resolve, reject) => {
        setTimeout(resolve, 1500);
      });
      setSubmitStatus("success");
      setFormData({
        nombre: "",
        email: "",
        mensaje: "",
        website: "",
      });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Contáctanos
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-white/90 text-base">
              Respuesta en menos de 24 h.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT FORM & INFO */}
      <section className="bg-blancoCremoso/40 py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* FORMULARIO */}
            <div className="rounded-2xl border border-azulOscuro/10 bg-white p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-extrabold text-azulOscuro mb-6">
                Envíanos un mensaje
              </h2>

              {submitStatus === "success" && (
                <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm font-semibold text-green-800">
                      ¡Mensaje enviado! Te contactaremos pronto.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4" role="alert">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm font-semibold text-red-800">
                      No pudimos enviar el mensaje. Revisa tu conexión e inténtalo de nuevo.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot: oculto para usuarios; los bots lo rellenan */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
                  <label htmlFor="website">No completar</label>
                  <input type="text" id="website" name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                </div>
                <div>
                  <label htmlFor="nombre" className="block text-sm font-semibold text-azulOscuro mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full h-12 rounded-lg border border-azulOscuro/20 bg-white px-4 text-azulOscuro placeholder:text-azulGrisaceo focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition text-base touch-manipulation"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-azulOscuro mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full h-12 rounded-lg border border-azulOscuro/20 bg-white px-4 text-azulOscuro placeholder:text-azulGrisaceo focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition text-base touch-manipulation"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-semibold text-azulOscuro mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full rounded-lg border border-azulOscuro/20 bg-white px-4 py-3 text-azulOscuro placeholder:text-azulGrisaceo focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition resize-none text-base touch-manipulation"
                    placeholder="Cuéntanos sobre tu proyecto..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-6 py-3.5 text-base font-extrabold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                >
                  {isSubmitting ? "Enviando..." : "Cotiza tu proyecto"}
                </button>
              </form>
            </div>

            {/* INFORMACIÓN DE CONTACTO */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-azulOscuro/10 bg-white p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-extrabold text-azulOscuro mb-6">
                  Información de contacto
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shrink-0">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-azulOscuro mb-1">Email</h3>
                      <a
                        href="mailto:surdigitallabs@gmail.com"
                        className="text-azulGrisaceo hover:text-blue-600 transition"
                      >
                        surdigitallabs@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shrink-0">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-azulOscuro mb-1">Teléfono</h3>
                      <a
                        href="tel:+56975204813"
                        className="text-azulGrisaceo hover:text-blue-600 transition"
                      >
                        +56 9 7520 4813
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shrink-0">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-azulOscuro mb-1">Ubicación</h3>
                      <p className="text-azulGrisaceo">Coyhaique, Aysén, Chile</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACCIONES RÁPIDAS */}
              <div className="rounded-2xl border-2 border-blue-600 bg-gradient-to-br from-blue-50 to-white p-6 md:p-8 shadow-lg">
                <h3 className="text-lg font-extrabold text-azulOscuro mb-3">Contacto directo</h3>
                <div className="space-y-2">
                  <a href="https://calendly.com/surdigitallabs/30min" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-lg bg-blue-600 px-4 py-3 text-white font-extrabold hover:bg-blue-700 transition text-sm">
                    Agenda llamada
                  </a>
                  <a href="https://wa.me/56975204813?text=Hola!%20Quiero%20cotizar%20o%20consultar." target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-lg bg-green-600 px-4 py-3 text-white font-extrabold hover:bg-green-700 transition text-sm">
                    WhatsApp (general)
                  </a>
                  <a href="https://wa.me/56975204813?text=Hola!%20Quiero%20información%20sobre%20SDLabCar." target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-lg border border-amber-500 bg-amber-50 px-4 py-3 text-amber-800 font-extrabold hover:bg-amber-100 transition text-sm">
                    WhatsApp (SDLabCar)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HORARIOS */}
      <section className="bg-white py-8">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="rounded-xl bg-blue-600/90 p-6 text-center">
            <p className="text-white/90 text-sm">Lun–Vie 9:00–18:00 · Sáb 10:00–14:00 · Respuesta en menos de 24 h</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contactanos;
