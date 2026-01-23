import React, { useState, useEffect } from "react";

const Contactanos = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // SEO
  useEffect(() => {
    document.title = "Contacto - Sur Digital Labs | Cotiza tu proyecto";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contacta con Sur Digital Labs. Empresa regional de Coyhaique. Cotiza tu proyecto, agenda diagnóstico o escríbenos por WhatsApp.');
    }
  }, []);

  const servicios = [
    "Desarrollo Web",
    "Aplicaciones Móviles",
    "E-commerce",
    "APIs y Backend",
    "Ciencia de Datos",
    "Machine Learning / AI",
    "Cloud y DevOps",
    "Seguridad Informática",
    "Automatización",
    "Consultoría",
    "Capacitaciones",
    "Otro",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simular envío (aquí deberías integrar con tu API)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        nombre: "",
        email: "",
        mensaje: "",
      });
    }, 1500);
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
            <p className="mt-4 max-w-2xl mx-auto text-white/90 text-lg">
              Cuéntanos tu proyecto y te responderemos en menos de 24 horas
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

              <form onSubmit={handleSubmit} className="space-y-4">
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
                        href="mailto:surdigitallabs@gmail.cl"
                        className="text-azulGrisaceo hover:text-blue-600 transition"
                      >
                        surdigitallabs@gmail.cl
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
                <h3 className="text-xl font-extrabold text-azulOscuro mb-4">
                  Contacto directo
                </h3>
                <p className="text-sm text-azulGrisaceo mb-4">
                  Empresa regional de Coyhaique. Acompañamiento cercano con talento local y supervisión senior.
                </p>
                <div className="space-y-3">
                  <a
                    href="https://calendly.com/surdigitallabs/30min"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-5 py-3.5 text-white font-extrabold hover:shadow-lg transition group touch-manipulation"
                  >
                    <span>Agenda diagnóstico</span>
                    <svg className="h-5 w-5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/56975204813?text=Hola!%20Quiero%20cotizar%20el%20Pack%20Web%20PYME%20Profesional.%20¿Me%20pueden%20ayudar?"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-lg bg-green-600 px-5 py-3.5 text-white font-extrabold hover:bg-green-700 hover:shadow-lg transition group touch-manipulation"
                  >
                    <span>WhatsApp (Pack Web PYME)</span>
                    <svg className="h-5 w-5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/56975204813?text=Hola!%20Quiero%20cotizar%20un%20servicio.%20¿Me%20pueden%20ayudar?"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-lg border-2 border-green-600 bg-white px-5 py-3.5 text-green-700 font-extrabold hover:bg-green-50 transition group touch-manipulation"
                  >
                    <span>WhatsApp (Otro servicio)</span>
                    <svg className="h-5 w-5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HORARIOS */}
      <section className="bg-white py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="rounded-2xl border border-azulOscuro/10 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-8 md:p-12 text-center">
            <h2 className="text-2xl font-extrabold text-white mb-4">
              Horarios de atención
            </h2>
            <p className="text-white/90 mb-2">
              <strong>Lunes a Viernes:</strong> 9:00 - 18:00 (GMT-3)
            </p>
            <p className="text-white/90">
              <strong>Sábados:</strong> 10:00 - 14:00
            </p>
            <p className="text-white/70 text-sm mt-4">
              Respondemos emails y mensajes en menos de 24 horas
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contactanos;
