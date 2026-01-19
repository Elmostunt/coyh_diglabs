// src/pages/Home.jsx
import React, { useState, useEffect } from "react";

/* =========================
   CONFIG & DATA
========================= */
const bucketName = "surdigilabs_images";
const folderName = "carrusel";

const CALENDLY_URL = "https://calendly.com/surdigitallabs/30min";

const TRUST = [
  { kpi: "+6 años", title: "Experiencia", desc: "Software, datos y nube en producción." },
  { kpi: "7–14 días", title: "Entrega", desc: "Roadmap, hitos y entregables claros." },
  { kpi: "Seguridad", title: "Día 1", desc: "OWASP, IAM, backups y accesos." },
  { kpi: "Soporte", title: "Continuidad", desc: "Post-entrega y operación tranquila." },
  { kpi: "Stack", title: "GCP/AWS", desc: "BigQuery, Cloud Run, CI/CD." },
];

const ROUTES = [
  {
    title: "Servicios",
    desc: "Paquetes claros: web, datos, nube y automatización.",
    href: "/servicios",
    cta: "Ver servicios",
  },
  {
    title: "Casos reales",
    desc: "Implementaciones concretas y resultados.",
    href: "/galeria",
    cta: "Ver casos",
  },
  {
    title: "Soporte & Transformación Digital",
    desc: "Recuperación de correos, migraciones y asistencia TI.",
    href: "/contacto#soporte",
    cta: "Solicitar soporte",
  },
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);

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

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1 >= slides.length ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleImgError = (idx) => {
    setSlides((prev) => prev.filter((_, i) => i !== idx));
    setCurrentSlide(0);
  };

  return (
    <main className="flex flex-col items-center w-full bg-blancoCremoso">
      {/* ===== HERO / Carrusel ===== */}
      <section
        className="relative w-full h-[60vh] md:h-[70vh] lg:h-[75vh] min-h-[480px] max-h-[60vh] overflow-hidden mb-10 md:mb-12"
        aria-roledescription="carousel"
        aria-label="Galería principal"
      >
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

      {/* ===== Mensaje ultra corto ===== */}
      <section className="w-full max-w-6xl px-4 text-center pb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-azulOscuro leading-tight">
          Software y datos <span className="text-azulProfundo">desde la Patagonia</span>
        </h1>
        <p className="mt-2 text-azulGrisaceo">
          Web, datos, nube y soporte. Claro, seguro y con resultados.
        </p>
        <p className="mt-3 text-sm text-azulGrisaceo">
          Agenda desde la barra superior o revisa servicios y casos abajo.
        </p>
      </section>

      {/* ===== Confianza (compacto, sin CTA) ===== */}
      <section className="w-full max-w-6xl px-4 pb-10">
        <div className="rounded-3xl border border-azulOscuro/10 bg-white p-6 md:p-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {TRUST.map((t) => (
              <article
                key={t.title}
                className="rounded-2xl border border-azulOscuro/10 bg-blancoCremoso p-4"
              >
                <div className="text-xl font-extrabold text-azulOscuro">{t.kpi}</div>
                <div className="mt-1 font-semibold text-azulOscuro">{t.title}</div>
                <p className="mt-1 text-sm text-azulGrisaceo">{t.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Rutas (3 tiles) ===== */}
      <section className="w-full max-w-6xl px-4 pb-14">
        <header className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-azulOscuro">Explora</h2>
          <p className="text-azulGrisaceo mt-1">
            Elige el camino: servicios, casos reales o soporte.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {ROUTES.map((r) => (
            <article
              key={r.title}
              className="rounded-2xl border border-azulOscuro/15 p-6 bg-white shadow-sm flex flex-col"
            >
              <h3 className="text-xl font-semibold text-azulOscuro">{r.title}</h3>
              <p className="mt-2 text-azulGrisaceo flex-1">{r.desc}</p>

              <div className="mt-5">
                <a
                  href={r.href}
                  className="inline-flex px-4 py-2 rounded bg-azulOscuro text-blancoHueso hover:bg-azulProfundo transition font-semibold"
                >
                  {r.cta}
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* CTA suave extra (opcional) */}
        <div className="mt-8 flex justify-center">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 rounded-full border border-azulOscuro/20 text-azulOscuro hover:bg-blancoCremoso transition font-semibold"
          >
            Agendar 30 min
          </a>
        </div>
      </section>
    </main>
  );
};

export default Home;
