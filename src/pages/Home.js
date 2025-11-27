// src/pages/Home.jsx
import React, { useState, useEffect } from "react";

/* =========================
   CONFIG & DATA
========================= */
const bucketName = "surdigilabs_images";
const folderName = "carrusel";

const CALENDLY_URL = "https://calendly.com/surdigitallabs/30min";
const QUOTE_URL = "/contacto";

const SERVICIOS_HOME = [
  {
    title: "Sitio web pro",
    desc: "Landing o web corporativa optimizada para SEO y conversión.",
    from: "$ 600.000 CLP",
    items: ["Diseño responsive", "SEO técnico", "Hosting/CDN"],
    href: "/servicios#web",
  },
  {
    title: "Datos & Dashboards",
    desc: "Analítica con BigQuery y dashboards ejecutivos.",
    from: "$ 900.000 CLP",
    items: ["Modelado de datos", "ETL/ELT", "Looker/PowerBI"],
    href: "/servicios#datos",
  },
  {
    title: "Nube & Automatización",
    desc: "Cloud Run/Lambda, pipelines y alertas para operar tranquilo.",
    from: "$ 700.000 CLP",
    items: ["Infra as Code", "CI/CD", "Monitoreo"],
    href: "/servicios#nube",
  },
];

const BENEFICIOS = [
  { h: "Impacto medible", p: "Trabajamos con metas claras: leads, ventas o ahorro de horas." },
  { h: "Arquitectura segura", p: "Buenas prácticas OWASP, IAM y backups desde el día 1." },
  { h: "Cercanía y soporte", p: "Acompañamiento en Coyhaique/Aysén y remoto para todo Chile." },
];

/* =========================
   HELPERS
========================= */
const apiUrl =
  `https://storage.googleapis.com/storage/v1/b/${bucketName}/o` +
  `?prefix=${folderName}/&fields=items(name,contentType,size)`;

const encodeGcsPath = (name) => name.split("/").map(encodeURIComponent).join("/");

/* =========================
   COMPONENT
========================= */
const Home = () => {
  // Carrusel
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);

  // Carga de imágenes desde GCS
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (!data.items) return;

        const archivos = data.items
          .filter(
            (it) =>
              it.name &&
              !it.name.endsWith("/") &&
              it.contentType?.startsWith("image/") &&
              Number(it.size) > 0
          )
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item) => {
            const path = encodeGcsPath(item.name);
            return {
              src: `https://storage.googleapis.com/${bucketName}/${path}`,
              alt: item.name.split("/").pop(),
            };
          });

        setSlides(archivos);
      } catch (error) {
        console.error("Error al obtener imágenes:", error);
      }
    };

    fetchImages();
  }, []);

  // Helpers de navegación
  const showSlide = (index) => {
    setCurrentSlide((prev) => {
      const len = slides.length;
      if (len === 0) return prev;
      if (index >= len) return 0;
      if (index < 0) return len - 1;
      return index;
    });
  };
  const changeSlide = (direction) => showSlide(currentSlide + direction);

  // Autoplay
  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1 >= slides.length ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Remueve imagen que falla
  const handleImgError = (idx) => {
    setSlides((prev) => prev.filter((_, i) => i !== idx));
    setCurrentSlide(0);
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <main className="flex flex-col items-center w-full bg-blancoCremoso">
      {/* ===== Carrusel (más alto) ===== */}
      <section
        className="relative w-full h-[60vh] md:h-[70vh] lg:h-[75vh] min-h-[480px] max-h-[60vh] overflow-hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label="Galería principal"
      >
        {/* Overlay para contraste del hero (si pones texto encima) 
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent z-[1]"
          aria-hidden="true"
        />
*/}
        {slides.length > 0 ? (
          slides.map((slide, index) => (
            <img
              key={index}
              src={slide.src}
              alt={slide.alt}
              onError={() => handleImgError(index)}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              } pointer-events-none`}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === currentSlide ? "high" : "auto"}
              width={1920}
              height={1080}
            />
          ))
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-azulOscuro/5">
            <p className="text-center text-azulGrisaceo">Cargando imágenes...</p>
          </div>
        )}

        {/* Flechas */}
        <button
          onClick={() => changeSlide(-1)}
          className="absolute z-10 left-3 top-1/2 -translate-y-1/2 px-3 py-2 text-white font-bold text-lg rounded bg-black/45 hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Anterior"
        >
          &#10094;
        </button>
        <button
          onClick={() => changeSlide(1)}
          className="absolute z-10 right-3 top-1/2 -translate-y-1/2 px-3 py-2 text-white font-bold text-lg rounded bg-black/45 hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Siguiente"
        >
          &#10095;
        </button>
      </section>

      {/* ===== Slogan + CTA ===== */}
      <section className="w-full max-w-6xl px-4 py-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-azulOscuro mb-3 leading-tight">
          Software y datos <span className="text-azulProfundo">desde la Patagonia</span>
        </h1>
        <p className="text-lg text-azulGrisaceo mb-6">
          Desarrollo web, analítica y nube (GCP/AWS) con foco en impacto medible.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-azulOscuro text-blancoHueso py-3 px-6 rounded font-semibold shadow-md hover:bg-azulProfundo transition focus:outline-none focus-visible:ring-2 focus-visible:ring-azulOscuro/40"
            aria-label="Agenda una reunión"
          >
            Agenda una reunión
          </a>

        <a
            href={QUOTE_URL}
            className="bg-blancoCremoso text-azulOscuro border border-azulOscuro py-3 px-6 rounded font-semibold shadow-md hover:bg-azulOscuro hover:text-blancoHueso transition focus:outline-none focus-visible:ring-2 focus-visible:ring-azulOscuro/40"
            aria-label="Pide una cotización"
          >
            Pide una cotización
          </a>
        </div>
      </section>

      {/* ===== Qué hacemos ===== */}
      <section className="w-full max-w-6xl px-4 py-10">
        <header className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold text-azulOscuro">Qué hacemos</h2>
          <p className="text-azulGrisaceo mt-1">
            Paquetes claros, entregables concretos y tiempos realistas.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICIOS_HOME.map((s) => (
            <article
              key={s.title}
              className="rounded-2xl border border-azulOscuro/15 p-6 bg-white shadow-sm"
            >
              <h3 className="text-xl font-semibold text-azulOscuro">{s.title}</h3>
              <p className="mt-2 text-azulGrisaceo">{s.desc}</p>

              <p className="mt-3 text-sm text-azulGrisaceo">
                desde <span className="font-semibold text-azulOscuro">{s.from}</span>
              </p>

              <ul className="mt-4 space-y-1 text-sm text-azulOscuro">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2">• {it}</li>
                ))}
              </ul>

              <div className="mt-5 flex gap-2">
                <a
                  href={s.href}
                  className="inline-flex px-4 py-2 rounded border border-azulOscuro text-azulOscuro hover:bg-azulOscuro hover:text-blancoHueso transition font-medium"
                >
                  Ver detalles
                </a>
                <a
                  href="/contacto#cotizar"
                  className="inline-flex px-4 py-2 rounded bg-azulOscuro text-blancoHueso hover:bg-azulProfundo transition font-semibold"
                >
                  Solicitar propuesta
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== ¿Por qué elegirnos? ===== */}
      <section className="w-full max-w-6xl px-4 py-10">
        <header className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold text-azulOscuro">¿Por qué elegirnos?</h2>
          <p className="text-azulGrisaceo mt-1">
            Somos locales, medimos resultados y cuidamos la seguridad.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {BENEFICIOS.map((b) => (
            <article
              key={b.h}
              className="rounded-2xl p-6 bg-white border border-azulOscuro/15 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-azulOscuro">{b.h}</h3>
              <p className="mt-2 text-azulGrisaceo">{b.p}</p>
            </article>
          ))}
        </div>
      </section>

      {/* (Si usas un <Footer /> global, asegúrate de: className="bg-azulOscuro text-blancoHueso") */}
    </main>
  );
};

export default Home;
