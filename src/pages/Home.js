// src/pages/Home.js
import React, { useEffect, useMemo, useState } from "react";
import ProyectoModal from "../components/ProyectoModal";

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
];

const PROYECTOS = [
  // Inteligencia Artificial / LLMs
  {
    id: 1,
    titulo: "Sistema de agentes especializados con LLMs",
    categoria: "Inteligencia Artificial",
    descripcion: "Arquitectura de agentes desacoplados con LangChain, orquestados mediante flujos de decisión y herramientas externas.",
    tecnologias: ["LangChain", "Python", "LLMs", "OpenAI"],
    arquitectura: "Agentes especializados desacoplados con orquestación mediante flujos de decisión explícitos y herramientas externas.",
    valor: "Mayor capacidad de automatización avanzada y base sólida para escalar casos de uso con LLMs.",
  },
  {
    id: 2,
    titulo: "Custom GPT integrado a backend productivo",
    categoria: "Inteligencia Artificial",
    descripcion: "GPT personalizado conectado vía OpenAPI a servicios en Cloud Run con autenticación OAuth.",
    tecnologias: ["OpenAI", "Cloud Run", "OAuth", "OpenAPI"],
    arquitectura: "Backend en Cloud Run exponiendo endpoints OpenAPI, con autenticación OAuth y Cloud Run Invoker para control de acceso.",
    valor: "Uso seguro y gobernado de LLMs sobre datos reales, manteniendo control técnico y operativo.",
  },
  {
    id: 3,
    titulo: "Integración de GPTs con Cosmos OpenAI Bridge",
    categoria: "Inteligencia Artificial",
    descripcion: "Backend en Cloud Run exponiendo acciones bajo `/action/api/{id}`, alineado al contrato Cosmos.",
    tecnologias: ["Cloud Run", "OpenAI", "FastAPI", "GCP"],
    arquitectura: "Servicio backend stateless en Cloud Run que expone acciones mediante endpoints REST compatibles con Cosmos.",
    valor: "Integración nativa de capacidades corporativas con ecosistema OpenAI/Cosmos.",
  },
  {
    id: 4,
    titulo: "Consumo de datos corporativos desde Confluence para IA",
    categoria: "Inteligencia Artificial",
    descripcion: "Servicio intermedio que obtiene, procesa y expone datos de Confluence a modelos de lenguaje.",
    tecnologias: ["Confluence API", "Python", "LLMs", "Cloud Run"],
    arquitectura: "Servicio de procesamiento que extrae, transforma y estructura datos de Confluence para consumo por modelos de lenguaje.",
    valor: "Acceso estructurado a conocimiento corporativo desde sistemas de IA.",
  },
  // Backend / APIs
  {
    id: 5,
    titulo: "API de orquestación en FastAPI",
    categoria: "Backend / APIs",
    descripcion: "Backend REST desacoplado encargado de reglas de negocio, validaciones y coordinación de servicios.",
    tecnologias: ["FastAPI", "Python", "REST", "Cloud Run"],
    arquitectura: "API REST stateless con separación clara de responsabilidades: validación, lógica de negocio y coordinación de servicios externos.",
    valor: "Mayor velocidad de desarrollo, mejor mantenibilidad y experiencia de uso consistente.",
  },
  {
    id: 6,
    titulo: "Backend serverless en Cloud Run",
    categoria: "Backend / APIs",
    descripcion: "Servicios stateless desplegados en Cloud Run con control de invocación vía IAM.",
    tecnologias: ["Cloud Run", "GCP", "Serverless", "IAM"],
    arquitectura: "Servicios stateless con escalado automático, control de acceso mediante IAM y gestión de secretos centralizada.",
    valor: "Infraestructura escalable, segura y alineada con buenas prácticas de operación cloud.",
  },
  {
    id: 7,
    titulo: "Capa de servicios para microplanificación",
    categoria: "Backend / APIs",
    descripcion: "Backend que coordina frontend, optimizador y persistencia operativa mediante contratos claros.",
    tecnologias: ["FastAPI", "Python", "Cloud Run", "BigQuery"],
    arquitectura: "Arquitectura modular con frontend, backend de coordinación, optimizador independiente y persistencia en BigQuery.",
    valor: "Mejora en la toma de decisiones operativas y reducción de fricción en la planificación diaria.",
  },
  // Frontend / Aplicaciones Web
  {
    id: 8,
    titulo: "Frontend administrativo en Next.js",
    categoria: "Frontend / Web",
    descripcion: "Aplicación web en Next.js con Ant Design conectada a una API FastAPI para operaciones CRUD.",
    tecnologias: ["Next.js", "React", "Ant Design", "TypeScript"],
    arquitectura: "Aplicación web desacoplada con contratos claros entre frontend y backend, facilitando evolución independiente.",
    valor: "Interfaz clara para administración, con mejor mantenibilidad y experiencia de uso consistente.",
  },
  {
    id: 9,
    titulo: "UI de gestión para microplanificación",
    categoria: "Frontend / Web",
    descripcion: "Frontend orientado a visualización, edición y simulación de tareas operativas.",
    tecnologias: ["React", "Next.js", "Visualización", "Simulación"],
    arquitectura: "Interfaz especializada para visualización de datos operativos, edición de parámetros y simulación de escenarios.",
    valor: "Mejor visibilidad operativa y capacidad de análisis de escenarios.",
  },
  // Optimización / Analítica
  {
    id: 10,
    titulo: "Optimizador operativo basado en modelos entrenados",
    categoria: "Optimización / Analítica",
    descripcion: "Componente independiente que consume datos históricos y genera planes optimizados.",
    tecnologias: ["Machine Learning", "Python", "Optimización", "Modelos"],
    arquitectura: "Componente desacoplado que procesa datos históricos, ejecuta modelos de optimización y genera planes operativos.",
    valor: "Optimización automática de procesos operativos basada en datos históricos.",
  },
  {
    id: 11,
    titulo: "Arquitectura analítica con BigQuery",
    categoria: "Optimización / Analítica",
    descripcion: "Replicación de datos operativos hacia BigQuery para análisis y evaluación de modelos.",
    tecnologias: ["BigQuery", "GCP", "ETL", "Analytics"],
    arquitectura: "Pipeline de datos que replica información operativa hacia BigQuery, habilitando análisis histórico y evaluación de modelos.",
    valor: "Base de datos analítica para decisiones basadas en datos y evaluación continua de modelos.",
  },
  // Infraestructura Cloud / DevOps
  {
    id: 12,
    titulo: "Infraestructura Cloud SQL en red privada",
    categoria: "Infraestructura / DevOps",
    descripcion: "Bases de datos en Cloud SQL con VPC peering y acceso restringido desde Cloud Run.",
    tecnologias: ["Cloud SQL", "VPC", "Terraform", "GCP"],
    arquitectura: "Cloud SQL en red privada con VPC peering, acceso controlado desde Cloud Run mediante red privada y gestión de secretos.",
    valor: "Infraestructura reproducible, segura y alineada con buenas prácticas de operación.",
  },
  {
    id: 13,
    titulo: "Gestión de secretos con Secret Manager",
    categoria: "Infraestructura / DevOps",
    descripcion: "Arquitectura centralizada de secretos con roles diferenciados por entorno.",
    tecnologias: ["Secret Manager", "IAM", "GCP", "Terraform"],
    arquitectura: "Gestión centralizada de secretos con roles IAM diferenciados por entorno (dev/prod) y acceso controlado.",
    valor: "Seguridad mejorada y gestión simplificada de credenciales y secretos.",
  },
  {
    id: 14,
    titulo: "Infraestructura multi-entorno con Terraform",
    categoria: "Infraestructura / DevOps",
    descripcion: "Definición de entornos `dev` y `prod` usando workspaces y módulos reutilizables.",
    tecnologias: ["Terraform", "IaC", "GCP", "Workspaces"],
    arquitectura: "Infraestructura como código con módulos reutilizables, workspaces para entornos y versionado de cambios.",
    valor: "Infraestructura reproducible, versionada y consistente entre entornos.",
  },
  {
    id: 15,
    titulo: "Automatización de permisos e IAM",
    categoria: "Infraestructura / DevOps",
    descripcion: "Asignación de roles mediante módulos Terraform para servicios y secretos.",
    tecnologias: ["Terraform", "IAM", "GCP", "Automatización"],
    arquitectura: "Módulos Terraform que automatizan la asignación de roles IAM para servicios, secretos y recursos cloud.",
    valor: "Gestión consistente y automatizada de permisos, reduciendo errores manuales.",
  },
  // Cloud & Sistemas
  {
    id: 16,
    titulo: "Laboratorios de despliegue en AWS",
    categoria: "Cloud / Formación",
    descripcion: "Arquitecturas educativas con EC2, hardening básico y configuración de servicios.",
    tecnologias: ["AWS", "EC2", "Linux", "Windows"],
    arquitectura: "Entornos educativos con EC2, configuración de servicios, hardening básico y documentación para formación.",
    valor: "Capacitación práctica en despliegue y administración de infraestructura cloud.",
  },
  // Proyectos Regionales / Pymes
  {
    id: 17,
    titulo: "E-commerce con carrito de compra y pasarela de pago",
    categoria: "E-commerce / Web",
    descripcion: "Tienda online completa con catálogo de productos, carrito de compra, gestión de pedidos e integración con pasarelas de pago.",
    tecnologias: ["React", "Next.js", "Stripe", "PostgreSQL", "Node.js"],
    arquitectura: "Aplicación web fullstack con frontend en Next.js, backend en Node.js, base de datos PostgreSQL y integración con pasarelas de pago (Stripe/Transbank).",
    valor: "Presencia online 24/7, ventas automatizadas y gestión eficiente de pedidos para negocios regionales.",
  },
  {
    id: 18,
    titulo: "Sitio web corporativo y landing pages optimizadas",
    categoria: "Web / Marketing",
    descripcion: "Sitios web corporativos responsivos con landing pages optimizadas para conversión, integración con formularios y analytics.",
    tecnologias: ["Next.js", "React", "Tailwind CSS", "SEO", "Google Analytics"],
    arquitectura: "Sitio web estático/dinámico con Next.js, optimizado para SEO, velocidad y conversión, con integración de analytics y formularios de contacto.",
    valor: "Presencia digital profesional, mejor visibilidad en buscadores y captación de leads para pymes regionales.",
  },
  {
    id: 19,
    titulo: "Sistema de reservas y gestión de citas online",
    categoria: "Web / Gestión",
    descripcion: "Plataforma web para reservas de servicios, gestión de disponibilidad, confirmaciones automáticas y recordatorios por email/SMS.",
    tecnologias: ["React", "Node.js", "PostgreSQL", "Email", "SMS API"],
    arquitectura: "Aplicación web con calendario interactivo, gestión de disponibilidad, sistema de notificaciones y panel de administración para negocios de servicios.",
    valor: "Automatización de reservas, reducción de llamadas telefónicas y mejor experiencia para clientes de negocios locales.",
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
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleProyectoClick = (proyecto) => {
    setProyectoSeleccionado(proyecto);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProyectoSeleccionado(null);
  };

  // Proyectos destacados (incluyendo proyectos regionales)
  const proyectosDestacados = useMemo(() => {
    return [
      PROYECTOS.find((p) => p.id === 17), // E-commerce
      PROYECTOS.find((p) => p.id === 18), // Sitio web corporativo
      PROYECTOS.find((p) => p.id === 19), // Sistema de reservas
      PROYECTOS.find((p) => p.id === 1), // Agentes LLMs
      PROYECTOS.find((p) => p.id === 2), // Custom GPT
      PROYECTOS.find((p) => p.id === 8), // Next.js
    ].filter(Boolean);
  }, []);

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

        <div className="mx-auto w-full max-w-6xl px-4 py-14 md:py-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            {/* Texto */}
            <div>
              <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
                Soluciones tecnológicas
                <span className="block">desde la Patagonia</span>
              </h1>
              <p className="mt-4 max-w-xl text-white/90 text-lg">
                Software, datos e inteligencia artificial con estándar profesional. 
                Experiencia real, criterio técnico y compromiso con el talento regional.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/servicios"
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-extrabold text-blue-700 shadow-sm hover:bg-white/90 transition"
                >
                  Ver Servicios
                </a>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/15 transition"
                >
                  Agenda 30 min
                </a>
              </div>

              {/* mini métricas */}
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {TRUST.map((t) => (
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

      {/* SERVICIOS RÁPIDOS */}
      <section className="bg-white py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-azulOscuro">Nuestros Servicios</h2>
            <p className="mt-2 text-azulGrisaceo">Soluciones tecnológicas completas para tu empresa</p>
          </header>

          <div className="grid gap-6 sm:grid-cols-3">
            <a
              href="/servicios"
              className="group rounded-2xl border border-azulOscuro/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-sm mb-4">
                <span className="text-lg">⚡</span>
              </div>
              <h3 className="text-lg font-extrabold text-azulOscuro mb-2">Desarrollo Web & Apps</h3>
              <p className="text-sm text-azulGrisaceo mb-4">
                Frontend, backend, APIs y aplicaciones móviles con tecnologías modernas.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-azulOscuro group-hover:text-blue-600 transition">
                Ver servicios →
              </span>
            </a>

            <a
              href="/servicios"
              className="group rounded-2xl border border-azulOscuro/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-sm mb-4">
                <span className="text-lg">🤖</span>
              </div>
              <h3 className="text-lg font-extrabold text-azulOscuro mb-2">IA & Machine Learning</h3>
              <p className="text-sm text-azulGrisaceo mb-4">
                LLMs, agentes especializados, modelos de optimización y análisis de datos.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-azulOscuro group-hover:text-blue-600 transition">
                Ver servicios →
              </span>
            </a>

            <a
              href="/servicios"
              className="group rounded-2xl border border-azulOscuro/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-sm mb-4">
                <span className="text-lg">☁️</span>
              </div>
              <h3 className="text-lg font-extrabold text-azulOscuro mb-2">Cloud & DevOps</h3>
              <p className="text-sm text-azulGrisaceo mb-4">
                Infraestructura cloud, automatización, CI/CD y gestión de infraestructura como código.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-azulOscuro group-hover:text-blue-600 transition">
                Ver servicios →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* PROYECTOS DESTACADOS */}
      <section className="bg-blancoCremoso/40 py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-azulOscuro">Proyectos Representativos</h2>
            <p className="mt-2 text-azulGrisaceo">
              Ejemplos de proyectos técnicos en los que hemos trabajado. Haz click para ver detalles.
            </p>
          </header>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {proyectosDestacados.map((proyecto) => (
              <article
                key={proyecto.id}
                onClick={() => handleProyectoClick(proyecto)}
                className="group cursor-pointer rounded-2xl border border-azulOscuro/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                    {proyecto.categoria}
                  </span>
                  <svg className="h-5 w-5 text-azulGrisaceo group-hover:text-blue-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-extrabold text-azulOscuro mb-2 group-hover:text-blue-600 transition">
                  {proyecto.titulo}
                </h3>
                <p className="text-sm text-azulGrisaceo line-clamp-3">
                  {proyecto.descripcion}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {proyecto.tecnologias.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded bg-azulOscuro/5 text-azulOscuro text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {proyecto.tecnologias.length > 3 && (
                    <span className="px-2 py-1 rounded bg-azulOscuro/5 text-azulOscuro text-xs font-medium">
                      +{proyecto.tecnologias.length - 3}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="/nosotros"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-600 hover:text-blue-700 transition"
            >
              Ver todos los proyectos
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-white py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="rounded-3xl border border-azulOscuro/10 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-8 md:p-12 text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Desarrollamos software con estándar profesional
            </h2>
            <p className="text-white/90 mb-2 text-lg">
              Experiencia real y compromiso con el talento regional
            </p>
            <p className="text-white/80 mb-6">
              Especialmente para pymes y organizaciones regionales que necesitan un socio tecnológico.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-extrabold text-blue-700 shadow-sm hover:bg-white/90 transition"
              >
                Contáctanos
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/15 transition"
              >
                Agenda 30 min
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL */}
      <ProyectoModal
        proyecto={proyectoSeleccionado}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
