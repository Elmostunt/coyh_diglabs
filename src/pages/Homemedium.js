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

// versión más corta (MEDIO)
const BENEFICIOS = [
  { h: "Impacto medible", p: "Resultados claros y seguimiento real." },
  { h: "Arquitectura segura", p: "Seguridad y buenas prácticas desde el día 1." },
  { h: "Cercanía y soporte", p: "Acompañamiento y continuidad operativa." },
];

const CASOS = [
  {
    title: "SDLabCar (Rent a Car)",
    subtitle: "Reservas, pagos y administración",
    result: "Centraliza ventas y reduce tiempos de gestión",
    tags: ["React", "Node.js", "MySQL", "Auth"],
    href: "/galeria#sdlabcar",
    cta: "Ver caso",
  },
  {
    title: "Data & Dashboards (BigQuery)",
    subtitle: "Modelado + ETL/ELT + tablero ejecutivo",
    result: "KPIs diarios y trazabilidad para decisiones",
    tags: ["BigQuery", "Dataform", "Looker/PowerBI", "SQL"],
    href: "/servicios#datos",
    cta: "Ver enfoque",
  },
  {
    title: "Automatización & Alertas",
    subtitle: "Monitoreo + notificaciones + operación tranquila",
    result: "Menos incidentes y respuesta más rápida",
    tags: ["Cloud Run", "Pub/Sub", "Monitoring", "CI/CD"],
    href: "/servicios#nube",
    cta: "Ver enfoque",
  },
  {
    title: "Soporte & Transformación Digital",
    subtitle: "Continuidad operativa, rescate y modernización tecnológica",
    result:
      "Recuperación de correos, migraciones seguras y asistencia técnica con foco en continuidad del negocio",
    tags: [
      "Google Workspace",
      "Outlook / Exchange",
      "Migraciones",
      "Recuperación de correos",
      "Soporte TI",
    ],
    href: "/contacto#soporte",
    cta: "Solicitar soporte",
  },
];

const TRUST = [
  { kpi: "+6 años", title: "Experiencia real", desc: "Software, datos y nube en producción." },
  { kpi: "7–14 días", title: "Entrega clara", desc: "Roadmap, hitos y entregables." },
  { kpi: "Seguridad", title: "Desde el día 1", desc: "OWASP, IAM, backups y accesos." },
  { kpi: "Soporte", title: "Post-entrega", desc: "Acompañamiento y continuidad." },
  { kpi: "Stack", title: "Cloud & Datos", desc: "GCP/AWS, BigQuery, CI/CD." },
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

  // MEDIO: mostrar solo 2 casos (curados)
  const CASOS_HOME = [CASOS[0], CASOS[3]].filter(Boolean);

  /* =========================
     RENDER
  ========================= */
  return (
    <main className="flex flex-col items-center w-full bg-blancoCremoso">
      {/* ===== Carrusel ===== */}
      <section
        className="relative w-full h-[60vh] md:h-[70vh] lg:h-[75vh] min-h-[480px] max-h-[60vh] overflow-hidden mb-12 md:mb-16"
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

      {/* ===== H1 + tagline (corto, sin botones) ===== */}
      <section className="w-full max-w-6xl px-4 -mt-4 md:-mt-8 pb-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-azulOscuro mb-2 leading-tight">
          Software y datos <span className="text-azulProfundo">desde la Patagonia</span>
        </h1>
        <p className="text-azulGrisaceo">
          Desarrollo web, analítica y nube con foco en impacto medible.
        </p>
      </section>

      {/* ===== Confianza & Autoridad (1 CTA) ===== */}
      <section className="w-full max-w-6xl px-4 py-8">
        <div className="rounded-3xl border border-azulOscuro/10 bg-white p-6 md:p-8">
          <header className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-azulOscuro">
              Confianza desde el primer día
            </h2>
            <p className="text-azulGrisaceo mt-1">
              Señales claras: experiencia, seguridad, entrega y soporte.
            </p>
          </header>

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

          <div className="mt-6 flex justify-center">
            <a
              href="/contacto#cotizar"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-azulOscuro text-blancoHueso hover:bg-azulProfundo transition font-semibold"
            >
              Quiero una propuesta
            </a>
          </div>
        </div>
      </section>

      {/* ===== Qué hacemos (compacto) ===== */}
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

              {/* chips en vez de lista + precio */}
              <div className="mt-4 flex flex-wrap gap-2">
                {s.items.slice(0, 3).map((it) => (
                  <span
                    key={it}
                    className="text-xs px-2 py-1 rounded-full border border-azulOscuro/15 bg-blancoCremoso text-azulOscuro"
                  >
                    {it}
                  </span>
                ))}
              </div>

              <div className="mt-5">
                <a
                  href={s.href}
                  className="inline-flex px-4 py-2 rounded border border-azulOscuro text-azulOscuro hover:bg-azulOscuro hover:text-blancoHueso transition font-medium"
                >
                  Ver detalles
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* CTA único al final de la sección */}
        <div className="mt-8 flex justify-center">
          <a
            href="/contacto#cotizar"
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-azulOscuro text-blancoHueso hover:bg-azulProfundo transition font-semibold"
          >
            Solicitar propuesta
          </a>
        </div>
      </section>

      {/* ===== Casos reales (solo 2 + ver todos) ===== */}
      <section className="w-full max-w-6xl px-4 py-10">
        <header className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold text-azulOscuro">Casos reales</h2>
          <p className="text-azulGrisaceo mt-1">
            Dos ejemplos concretos. El resto en la galería.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {CASOS_HOME.map((c) => (
            <article
              key={c.title}
              className="rounded-2xl border border-azulOscuro/15 p-6 bg-white shadow-sm"
            >
              <h3 className="text-xl font-semibold text-azulOscuro">{c.title}</h3>
              <p className="mt-2 text-azulGrisaceo">{c.subtitle}</p>

              <p className="mt-3 text-sm text-azulOscuro">
                <span className="font-semibold">Resultado:</span>{" "}
                <span className="text-azulGrisaceo">{c.result}</span>
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {c.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-full border border-azulOscuro/15 bg-blancoCremoso text-azulOscuro"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* 1 CTA por card */}
              <div className="mt-5">
                <a
                  href={c.href}
                  className="inline-flex px-4 py-2 rounded border border-azulOscuro text-azulOscuro hover:bg-azulOscuro hover:text-blancoHueso transition font-medium"
                >
                  {c.cta}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="/galeria"
            className="inline-flex items-center px-5 py-2.5 rounded-full border border-azulOscuro/20 text-azulOscuro hover:bg-blancoCremoso transition font-semibold"
          >
            Ver todos los casos
          </a>
        </div>
      </section>

      {/* ===== Beneficios (corto) ===== */}
      <section className="w-full max-w-6xl px-4 py-10">
        <header className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold text-azulOscuro">¿Por qué elegirnos?</h2>
          <p className="text-azulGrisaceo mt-1">Simple, claro y con respaldo.</p>
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
    </main>
  );
};

export default Home;
