// src/pages/Home.js
import React, { useEffect, useMemo, useState } from "react";

/* =========================
   CONFIG & DATA (se mantiene tu contenido)
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
    href: "/servicios",
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
   PAGE
========================= */
export default function Home() {
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

  const servicesLikeMock = useMemo(() => {
    // 4 tarjetas como el mockup, manteniendo tu contenido
    return [
      ...ROUTES,
      {
        title: "Agendar 30 min",
        desc: "Cuéntame tu idea y te propongo un plan en 30 minutos.",
        href: CALENDLY_URL,
        cta: "Agendar",
        external: true,
      },
    ];
  }, []);

  const projects = useMemo(() => {
    const top = slides.slice(0, 3);
    if (top.length === 0) {
      return [
        { title: "Proyecto 1", desc: "Web/landing optimizada para conversión.", src: null },
        { title: "Proyecto 2", desc: "Dashboard/BI para decisiones rápidas.", src: null },
        { title: "Proyecto 3", desc: "Automatización e integraciones.", src: null },
      ];
    }
    return top.map((s, i) => ({
      title: `Proyecto ${i + 1}`,
      desc: "Lorem ipsum dolor sit amet, consectetur.",
      src: s.src,
      alt: s.alt,
    }));
  }, [slides]);

  return (
    <div className="w-full">
      {/* HERO (estilo mockup) */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600">
        {/* decoraciones */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

        <div className="mx-auto w-full max-w-6xl px-4 py-14 md:py-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            {/* Texto */}
            <div>
              <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
                Software y datos
                <span className="block">desde la Patagonia</span>
              </h1>
              <p className="mt-4 max-w-xl text-white/85">
                Web, datos, nube y soporte. Claro, seguro y con resultados.
              </p>
              <p className="mt-2 text-sm text-white/75">
                Agenda desde la barra superior o revisa servicios y casos abajo.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/servicios"
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-extrabold text-indigo-700 shadow-sm hover:bg-white/90"
                >
                  Nuestros Servicios
                </a>
                <a
                  href="/servicios"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/15"
                >
                  Ver Portafolio
                </a>
              </div>

              {/* mini métricas */}
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {TRUST.slice(0, 3).map((t) => (
                  <div
                    key={t.title}
                    className="rounded-2xl border border-white/15 bg-white/10 p-4"
                  >
                    <div className="text-lg font-extrabold text-white">{t.kpi}</div>
                    <div className="mt-0.5 text-xs font-semibold text-white/85">{t.title}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/90" />
                  <span className="ml-2 text-xs font-semibold text-white/75">surdigitallabs.cl</span>
                </div>

                <div
                  className="relative mt-3 aspect-[16/10] overflow-hidden rounded-2xl bg-white/10"
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
                        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
                          index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchPriority={index === currentSlide ? "high" : "auto"}
                        width={1600}
                        height={1000}
                      />
                    ))
                  ) : (
                    <div className="absolute inset-0 grid place-items-center">
                      <p className="text-white/80">Cargando imágenes…</p>
                    </div>
                  )}

                  <button
                    onClick={() => changeSlide(-1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 px-3 py-2 text-white hover:bg-black/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label="Anterior"
                  >
                    &#10094;
                  </button>
                  <button
                    onClick={() => changeSlide(1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 px-3 py-2 text-white hover:bg-black/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label="Siguiente"
                  >
                    &#10095;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS (4 cards como el mockup) */}
      <section className="bg-blancoCremoso/40 py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <header className="text-center">
            <h2 className="text-3xl font-extrabold text-azulOscuro">Nuestros Servicios</h2>
            <p className="mt-2 text-azulGrisaceo">Soluciones creativas para tu empresa.</p>
          </header>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {servicesLikeMock.map((s) => {
              const common =
                "group rounded-2xl border border-azulOscuro/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md";
              const innerIcon =
                "grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-sm";
              const linkCls =
                "mt-5 inline-flex items-center gap-2 text-sm font-bold text-azulOscuro group-hover:text-azulProfundo";

              const content = (
                <>
                  <div className={innerIcon} aria-hidden="true">
                    <span className="text-lg">✦</span>
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold text-azulOscuro">{s.title}</h3>
                  <p className="mt-2 text-sm text-azulGrisaceo">{s.desc}</p>
                  <span className={linkCls}>{s.cta} →</span>
                </>
              );

              if (s.external) {
                return (
                  <a
                    key={s.title}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className={common}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <a key={s.title} href={s.href} className={common}>
                  {content}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROYECTOS (3 cards como el mockup) */}
      <section className="bg-white py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <header className="text-center">
            <h2 className="text-3xl font-extrabold text-azulOscuro">Nuestros Proyectos</h2>
            <p className="mt-2 text-azulGrisaceo">Algunos de nuestros trabajos recientes.</p>
          </header>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {projects.map((p) => (
              <article
                key={p.title}
                className="overflow-hidden rounded-2xl border border-azulOscuro/10 bg-white shadow-sm"
              >
                <div className="aspect-[16/9] bg-azulOscuro/5">
                  {p.src ? (
                    <img src={p.src} alt={p.alt || p.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full" />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-azulOscuro">{p.title}</h3>
                  <p className="mt-1 text-sm text-azulGrisaceo">{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS (reusamos TRUST como “prueba social” para no inventar contenido nuevo) */}
      <section className="bg-blancoCremoso/40 py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <header className="text-center">
            <h2 className="text-3xl font-extrabold text-azulOscuro">Testimonios</h2>
            <p className="mt-2 text-azulGrisaceo">¿Qué puedes esperar al trabajar con nosotros?</p>
          </header>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {TRUST.slice(0, 4).map((t) => (
              <article
                key={t.title}
                className="rounded-2xl border border-azulOscuro/10 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600" />
                  <div>
                    <div className="font-extrabold text-azulOscuro">{t.title}</div>
                    <div className="text-xs text-azulGrisaceo">{t.kpi}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-azulGrisaceo">{t.desc}</p>
                <div className="mt-4 text-amber-400">★★★★★</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
