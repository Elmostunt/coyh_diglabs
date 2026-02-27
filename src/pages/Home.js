// src/pages/Home.js
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
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

  // SEO
  useEffect(() => {
    document.title = "Sur Digital Labs - Software, datos y automatización en Coyhaique, Patagonia";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Socio tecnológico en Coyhaique, Patagonia: software a medida, datos y automatización para pymes y empresas regionales. Estándar profesional y acompañamiento cercano.');
    }
  }, []);

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
        if (process.env.NODE_ENV !== "production") {
          console.error("Error al obtener imágenes del carrusel:", error);
        }
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

  // Proyectos destacados (4 para Home; el resto en Nosotros)
  const proyectosDestacados = useMemo(() => {
    return [
      PROYECTOS.find((p) => p.id === 17), // E-commerce
      PROYECTOS.find((p) => p.id === 1),  // Agentes LLMs
      PROYECTOS.find((p) => p.id === 2),  // Custom GPT
      PROYECTOS.find((p) => p.id === 8),   // Next.js
    ].filter(Boolean);
  }, []);

  const [experienciaTab, setExperienciaTab] = useState('casos');
  const miniCasos = useMemo(() => [
    { problema: "Orquestar múltiples capacidades sin perder control técnico", solucion: "Arquitectura de agentes especializados con LangChain y flujos de decisión explícitos", impacto: "Mayor automatización avanzada y base sólida para escalar casos de uso con LLMs" },
    { problema: "Integrar datos corporativos y lógica de negocio sin exponer sistemas internos", solucion: "Backend en Cloud Run con OpenAPI, autenticación OAuth y Cloud Run Invoker", impacto: "Uso seguro y gobernado de LLMs sobre datos reales, manteniendo control técnico" },
    { problema: "Falta de visibilidad y optimización en asignación de tareas operativas", solucion: "Plataforma con frontend de gestión, backend en Cloud Run y modelos de optimización", impacto: "Mejora en toma de decisiones operativas y reducción de fricción en planificación" },
  ], []);

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-10 sm:py-14 md:py-16">
          <div className="grid items-center gap-8 sm:gap-10 md:grid-cols-2">
            {/* Texto */}
            <div className="order-2 md:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white">
                Software, datos y automatización
                <span className="block">Desde la Patagonia.</span>
              </h1>
              <p className="mt-3 sm:mt-4 max-w-xl text-white/90 text-base sm:text-lg leading-relaxed">
                Socio tecnológico para pymes y empresas regionales.
              </p>

              <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  to="/contacto"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-base font-extrabold text-blue-700 shadow-lg hover:bg-white/90 hover:shadow-xl transition touch-manipulation"
                >
                  Cotiza tu proyecto
                </Link>
                <span className="text-white/70 text-sm">o <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">agenda una llamada</a></span>
              </div>

              {/* mini métricas */}
              <div className="mt-6 sm:mt-7 grid grid-cols-3 gap-2 sm:gap-3">
                {TRUST.map((t) => (
                  <div
                    key={t.title}
                    className="rounded-xl sm:rounded-2xl border border-white/15 bg-white/10 p-3 sm:p-4"
                  >
                    <div className="text-base sm:text-lg font-extrabold text-white">{t.kpi}</div>
                    <div className="mt-0.5 text-xs font-semibold text-white/85">{t.title}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="relative order-1 md:order-2">
              <div className="rounded-2xl sm:rounded-3xl border border-white/15 bg-white/10 p-2 sm:p-3 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                <div className="flex items-center gap-2 border-b border-white/10 px-2 sm:px-3 py-1.5 sm:py-2">
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-red-400/90" />
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-amber-300/90" />
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-300/90" />
                  <span className="ml-2 text-xs font-semibold text-white/75 truncate">surdigitallabs.cl</span>
                </div>

                <div
                  className="relative mt-2 sm:mt-3 aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl bg-white/10"
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
                      <p className="text-white/80 text-sm">Cargando imágenes…</p>
                    </div>
                  )}

                  <button
                    onClick={() => changeSlide(-1)}
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 px-2.5 py-2 sm:px-3 sm:py-2 text-white hover:bg-black/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-white touch-manipulation text-lg sm:text-base"
                    aria-label="Anterior"
                  >
                    &#10094;
                  </button>
                  <button
                    onClick={() => changeSlide(1)}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 px-2.5 py-2 sm:px-3 sm:py-2 text-white hover:bg-black/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-white touch-manipulation text-lg sm:text-base"
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
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <header className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-azulOscuro">Nuestros Servicios</h2>
            <p className="mt-2 text-sm text-azulGrisaceo">
              <Link to="/servicios" className="text-blue-600 hover:text-blue-700 font-semibold">Ver servicios →</Link>
            </p>
          </header>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-3">
            <Link
              to="/servicios"
              className="group rounded-xl sm:rounded-2xl border border-azulOscuro/10 bg-white p-4 sm:p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg touch-manipulation"
            >
              <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-sm mb-3 sm:mb-4">
                <span className="text-base sm:text-lg">⚡</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-azulOscuro mb-2">Desarrollo Web & Apps</h3>
              <p className="text-xs sm:text-sm text-azulGrisaceo mb-3 sm:mb-4 leading-relaxed">
                Sistemas y sitios que escalan y se mantienen.
              </p>
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-azulOscuro group-hover:text-blue-600 transition">
                Ver servicios →
              </span>
            </Link>

            <Link
              to="/servicios"
              className="group rounded-xl sm:rounded-2xl border border-azulOscuro/10 bg-white p-4 sm:p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg touch-manipulation"
            >
              <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-sm mb-3 sm:mb-4">
                <span className="text-base sm:text-lg">🤖</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-azulOscuro mb-2">IA & Machine Learning</h3>
              <p className="text-xs sm:text-sm text-azulGrisaceo mb-3 sm:mb-4 leading-relaxed">
                Automatización y análisis con LLMs e integraciones seguras.
              </p>
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-azulOscuro group-hover:text-blue-600 transition">
                Ver servicios →
              </span>
            </Link>

            <Link
              to="/servicios"
              className="group rounded-xl sm:rounded-2xl border border-azulOscuro/10 bg-white p-4 sm:p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg touch-manipulation"
            >
              <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-sm mb-3 sm:mb-4">
                <span className="text-base sm:text-lg">☁️</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-azulOscuro mb-2">Cloud & DevOps</h3>
              <p className="text-xs sm:text-sm text-azulGrisaceo mb-3 sm:mb-4 leading-relaxed">
                Infraestructura clara, segura y reproducible.
              </p>
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-azulOscuro group-hover:text-blue-600 transition">
                Ver servicios →
              </span>
            </Link>
          </div>

          {/* Stack + proceso */}
          <div className="mt-8 sm:mt-10 rounded-xl sm:rounded-2xl border border-blue-200 bg-blue-50/50 p-4 sm:p-5">
            <p className="text-xs sm:text-sm text-azulGrisaceo leading-relaxed">
              <strong className="text-azulOscuro">Stack:</strong> GCP, AWS, Terraform, FastAPI, React/Next.js, Python, LangChain. <strong className="text-azulOscuro">Proceso:</strong> análisis, hitos claros, documentación. Pymes de retail, servicios, turismo y administración en Chile y la región.
            </p>
          </div>
        </div>
      </section>

      {/* SDLabCar */}
      <section className="bg-white py-6 sm:py-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="rounded-xl border border-amber-500/30 bg-amber-50/80 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-azulGrisaceo">
              <strong className="text-azulOscuro">SDLabCar:</strong> sistema de rentacar que se ajusta al proceso de cada empresa.
            </p>
            <a href="https://wa.me/56975204813?text=Hola!%20Quiero%20información%20sobre%20SDLabCar." target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm font-extrabold text-amber-700 hover:text-amber-800">
              Más info →
            </a>
          </div>
        </div>
      </section>

      {/* PACKS DE SERVICIOS */}
      <section className="bg-blancoCremoso/40 py-10 sm:py-14">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <header className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-azulOscuro">Packs</h2>
          </header>

          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {/* Pack 1: Web PYME Profesional - PRINCIPAL */}
            <article className="group relative rounded-lg sm:rounded-xl border-2 border-blue-600 bg-gradient-to-br from-blue-50 to-white p-3 sm:p-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs font-extrabold">
                  Esencial
                </span>
                <span className="px-1.5 py-0.5 rounded bg-yellow-400 text-yellow-900 text-xs font-extrabold">
                  ⭐ PRINCIPAL
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-azulOscuro mb-1.5 leading-tight">
                Pack Web PYME Profesional
              </h3>
              
              {/* Contenido expandido en hover */}
              <div className="max-h-0 group-hover:max-h-[600px] transition-all duration-300 overflow-hidden">
                <div className="pt-2">
                  <p className="text-xs text-azulGrisaceo mb-1.5">
                    <strong className="text-azulOscuro">Ideal para:</strong> Pymes, emprendedores, servicios locales
                  </p>
                  <p className="text-xs text-azulGrisaceo mb-2">
                    <strong className="text-azulOscuro">Resuelve:</strong> Presencia digital + conversión
                  </p>
                  <div className="space-y-1 mb-2">
                    <div className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                      <span className="text-blue-600 mt-0.5 shrink-0">✓</span>
                      <span>Web corporativa (5–7 secciones)</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                      <span className="text-blue-600 mt-0.5 shrink-0">✓</span>
                      <span>Diseño responsive</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                      <span className="text-blue-600 mt-0.5 shrink-0">✓</span>
                      <span>SEO básico</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                      <span className="text-blue-600 mt-0.5 shrink-0">✓</span>
                      <span>Formulario + WhatsApp</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                      <span className="text-blue-600 mt-0.5 shrink-0">✓</span>
                      <span>Analytics configurado</span>
                    </div>
                  </div>
                  <div className="rounded bg-blue-100 border border-blue-200 p-2 mb-2">
                    <p className="text-xs text-blue-900 font-semibold leading-tight mb-1">
                      <strong>Resultado:</strong> Web profesional que genera contactos.
                    </p>
                    <p className="text-xs text-blue-800">
                      <strong>Tiempo:</strong> 7-14 días
                    </p>
                  </div>
                  <a
                    href="https://wa.me/56975204813?text=Hola!%20Quiero%20cotizar%20el%20Pack%20Web%20PYME%20Profesional.%20¿Me%20pueden%20ayudar?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-3 py-2 text-xs font-extrabold text-white shadow-sm hover:shadow-md transition touch-manipulation"
                  >
                    Cotizar por WhatsApp
                  </a>
                </div>
              </div>
            </article>

            {/* Pack 2: Automatización & Backoffice */}
            <article className="group relative rounded-lg sm:rounded-xl border-2 border-green-600 bg-gradient-to-br from-green-50 to-white p-3 sm:p-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full bg-green-600 text-white text-xs font-extrabold">
                  Eficiencia
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-azulOscuro mb-1.5 leading-tight">
                Pack Automatización & Backoffice
              </h3>
              
              <div className="max-h-0 group-hover:max-h-[600px] transition-all duration-300 overflow-hidden">
                <div className="pt-2">
                  <p className="text-xs text-azulGrisaceo mb-1.5">
                    <strong className="text-azulOscuro">Ideal para:</strong> Empresas con procesos manuales
                  </p>
                  <p className="text-xs text-azulGrisaceo mb-2">
                    <strong className="text-azulOscuro">Resuelve:</strong> Pérdida de tiempo, Excel infinito, errores
                  </p>
                  <div className="space-y-1 mb-2">
                    <div className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                      <span className="text-green-600 mt-0.5 shrink-0">✓</span>
                      <span>Levantamiento de procesos</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                      <span className="text-green-600 mt-0.5 shrink-0">✓</span>
                      <span>Automatización (formularios, flujos, integraciones)</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                      <span className="text-green-600 mt-0.5 shrink-0">✓</span>
                      <span>Backend en la nube</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                      <span className="text-green-600 mt-0.5 shrink-0">✓</span>
                      <span>Documentación básica</span>
                    </div>
                  </div>
                  <div className="rounded bg-green-100 border border-green-200 p-2 mb-2">
                    <p className="text-xs text-green-900 font-semibold leading-tight mb-1">
                      <strong>Resultado:</strong> Menos tareas manuales, más orden.
                    </p>
                    <p className="text-xs text-green-800">
                      <strong>Tiempo:</strong> 14-21 días
                    </p>
                  </div>
                  <a
                    href="https://wa.me/56975204813?text=Hola!%20Quiero%20cotizar%20el%20Pack%20Automatización%20%26%20Backoffice.%20¿Me%20pueden%20ayudar?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 via-green-700 to-green-800 px-3 py-2 text-xs font-extrabold text-white shadow-sm hover:shadow-md transition touch-manipulation"
                  >
                    Cotizar por WhatsApp
                  </a>
                </div>
              </div>
            </article>

            {/* Pack 3: Datos & Dashboards */}
            <article className="group relative rounded-lg sm:rounded-xl border-2 border-yellow-600 bg-gradient-to-br from-yellow-50 to-white p-3 sm:p-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full bg-yellow-600 text-white text-xs font-extrabold">
                  Inteligencia
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-azulOscuro mb-1.5 leading-tight">
                Pack Datos & Dashboards
              </h3>
              
              <div className="max-h-0 group-hover:max-h-[600px] transition-all duration-300 overflow-hidden">
                <div className="pt-2">
                  <p className="text-xs text-azulGrisaceo mb-1.5">
                    <strong className="text-azulOscuro">Ideal para:</strong> Empresas que operan pero no miden bien
                  </p>
                  <p className="text-xs text-azulGrisaceo mb-2">
                    <strong className="text-azulOscuro">Resuelve:</strong> Decisiones a ciegas
                  </p>
                  <div className="space-y-1 mb-2">
                    <div className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                      <span className="text-yellow-600 mt-0.5 shrink-0">✓</span>
                      <span>Modelo de datos simple</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                      <span className="text-yellow-600 mt-0.5 shrink-0">✓</span>
                      <span>Integración de fuentes</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                      <span className="text-yellow-600 mt-0.5 shrink-0">✓</span>
                      <span>Dashboard ejecutivo</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                      <span className="text-yellow-600 mt-0.5 shrink-0">✓</span>
                      <span>Métricas clave del negocio</span>
                    </div>
                  </div>
                  <div className="rounded bg-yellow-100 border border-yellow-200 p-2 mb-2">
                    <p className="text-xs text-yellow-900 font-semibold leading-tight mb-1">
                      <strong>Resultado:</strong> Ver el negocio con datos claros.
                    </p>
                    <p className="text-xs text-yellow-800">
                      <strong>Tiempo:</strong> 21-30 días
                    </p>
                  </div>
                  <a
                    href="https://wa.me/56975204813?text=Hola!%20Quiero%20cotizar%20el%20Pack%20Datos%20%26%20Dashboards.%20¿Me%20pueden%20ayudar?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-800 px-3 py-2 text-xs font-extrabold text-white shadow-sm hover:shadow-md transition touch-manipulation"
                  >
                    Cotizar por WhatsApp
                  </a>
                </div>
              </div>
            </article>

            {/* Pack 4: IA Aplicada */}
            <article className="group relative rounded-lg sm:rounded-xl border-2 border-purple-600 bg-gradient-to-br from-purple-50 to-white p-3 sm:p-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-xs font-extrabold">
                  Innovación
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-azulOscuro mb-1.5 leading-tight">
                Pack IA Aplicada / Soluciones a Medida
              </h3>
              
              <div className="max-h-0 group-hover:max-h-[600px] transition-all duration-300 overflow-hidden">
                <div className="pt-2">
                  <p className="text-xs text-azulGrisaceo mb-1.5">
                    <strong className="text-azulOscuro">Ideal para:</strong> Empresas con necesidad específica
                  </p>
                  <p className="text-xs text-azulGrisaceo mb-2">
                    <strong className="text-azulOscuro">Resuelve:</strong> Tareas complejas, análisis, asistencia interna
                  </p>
                  <div className="space-y-1 mb-2">
                    <div className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                      <span className="text-purple-600 mt-0.5 shrink-0">✓</span>
                      <span>Diagnóstico del caso</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                      <span className="text-purple-600 mt-0.5 shrink-0">✓</span>
                      <span>Diseño de solución con IA / LLM</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                      <span className="text-purple-600 mt-0.5 shrink-0">✓</span>
                      <span>Integración con backend</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                      <span className="text-purple-600 mt-0.5 shrink-0">✓</span>
                      <span>Control y seguridad</span>
                    </div>
                  </div>
                  <div className="rounded bg-purple-100 border border-purple-200 p-2 mb-2">
                    <p className="text-xs text-purple-900 font-semibold leading-tight mb-1">
                      <strong>Resultado:</strong> Uso real de IA, no demo.
                    </p>
                    <p className="text-xs text-purple-800">
                      <strong>Tiempo:</strong> 30-45 días
                    </p>
                  </div>
                  <a
                    href="https://wa.me/56975204813?text=Hola!%20Quiero%20cotizar%20el%20Pack%20IA%20Aplicada.%20¿Me%20pueden%20ayudar?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 px-3 py-2 text-xs font-extrabold text-white shadow-sm hover:shadow-md transition touch-manipulation"
                  >
                    Cotizar por WhatsApp
                  </a>
                </div>
              </div>
            </article>

            {/* Pack 5: Acompañamiento Tecnológico */}
            <article className="group relative rounded-lg sm:rounded-xl border-2 border-red-600 bg-gradient-to-br from-red-50 to-white p-3 sm:p-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-xs font-extrabold">
                  Tranquilidad
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-azulOscuro mb-1.5 leading-tight">
                Pack Acompañamiento Tecnológico
              </h3>
              
              <div className="max-h-0 group-hover:max-h-[600px] transition-all duration-300 overflow-hidden">
                <div className="pt-2">
                  <p className="text-xs text-azulGrisaceo mb-1.5">
                    <strong className="text-azulOscuro">Ideal para:</strong> Empresas sin área TI
                  </p>
                  <p className="text-xs text-azulGrisaceo mb-2">
                    <strong className="text-azulOscuro">Resuelve:</strong> Desorden, malas decisiones técnicas
                  </p>
                  <div className="space-y-1 mb-2">
                    <div className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                      <span className="text-red-600 mt-0.5 shrink-0">✓</span>
                      <span>Soporte mensual</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                      <span className="text-red-600 mt-0.5 shrink-0">✓</span>
                      <span>Revisión de sistemas</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                      <span className="text-red-600 mt-0.5 shrink-0">✓</span>
                      <span>Asesoría técnica</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-azulGrisaceo">
                      <span className="text-red-600 mt-0.5 shrink-0">✓</span>
                      <span>Mejoras continuas</span>
                    </div>
                  </div>
                  <div className="rounded bg-red-100 border border-red-200 p-2 mb-2">
                    <p className="text-xs text-red-900 font-semibold leading-tight mb-1">
                      <strong>Resultado:</strong> Tranquilidad y orden tecnológico.
                    </p>
                    <p className="text-xs text-red-800">
                      <strong>Tiempo:</strong> Servicio mensual
                    </p>
                  </div>
                  <a
                    href="https://wa.me/56975204813?text=Hola!%20Quiero%20cotizar%20el%20Pack%20Acompañamiento%20Tecnológico.%20¿Me%20pueden%20ayudar?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-red-600 via-red-700 to-red-800 px-3 py-2 text-xs font-extrabold text-white shadow-sm hover:shadow-md transition touch-manipulation"
                  >
                    Cotizar por WhatsApp
                  </a>
                </div>
              </div>
            </article>
          </div>

        </div>
      </section>

      {/* EXPERIENCIA: Casos + Proyectos (pestañas) */}
      <section className="bg-blancoCremoso/40 py-10 sm:py-14">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <header className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-azulOscuro">Experiencia</h2>
          </header>

          {/* Pestañas */}
          <div className="flex justify-center gap-2 mb-6 sm:mb-8">
            <button
              type="button"
              onClick={() => setExperienciaTab('casos')}
              className={`px-4 py-2.5 rounded-full text-sm font-extrabold transition touch-manipulation ${
                experienciaTab === 'casos'
                  ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-sm'
                  : 'bg-white border border-azulOscuro/20 text-azulOscuro hover:bg-azulOscuro/5'
              }`}
            >
              Casos
            </button>
            <button
              type="button"
              onClick={() => setExperienciaTab('proyectos')}
              className={`px-4 py-2.5 rounded-full text-sm font-extrabold transition touch-manipulation ${
                experienciaTab === 'proyectos'
                  ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-sm'
                  : 'bg-white border border-azulOscuro/20 text-azulOscuro hover:bg-azulOscuro/5'
              }`}
            >
              Proyectos
            </button>
          </div>

          {experienciaTab === 'casos' && (
            <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
              {miniCasos.map((caso, i) => (
                <article
                  key={i}
                  className="rounded-xl sm:rounded-2xl border border-azulOscuro/10 bg-white p-4 sm:p-5 shadow-sm"
                >
                  <div className="mb-3">
                    <span className="inline-block px-2 py-1 rounded bg-red-50 border border-red-200 text-red-700 text-xs font-extrabold mb-2">Problema</span>
                    <p className="text-xs sm:text-sm text-azulGrisaceo leading-relaxed">{caso.problema}</p>
                  </div>
                  <div className="mb-3">
                    <span className="inline-block px-2 py-1 rounded bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold mb-2">Solución</span>
                    <p className="text-xs sm:text-sm text-azulGrisaceo leading-relaxed">{caso.solucion}</p>
                  </div>
                  <div className="rounded-lg bg-green-50 border border-green-200 p-3">
                    <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-extrabold mb-1.5">Impacto</span>
                    <p className="text-xs sm:text-sm text-green-900 font-semibold leading-tight">{caso.impacto}</p>
                  </div>
                </article>
              ))}
            </div>
          )}

          {experienciaTab === 'proyectos' && (
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {proyectosDestacados.map((proyecto) => (
                <article
                  key={proyecto.id}
                  onClick={() => handleProyectoClick(proyecto)}
                  className="group cursor-pointer rounded-xl sm:rounded-2xl border border-azulOscuro/10 bg-white p-4 sm:p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg touch-manipulation active:scale-[0.98]"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold line-clamp-1">
                      {proyecto.categoria}
                    </span>
                    <svg className="h-4 w-4 text-azulGrisaceo group-hover:text-blue-600 transition shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-azulOscuro mb-1.5 group-hover:text-blue-600 transition leading-tight line-clamp-2">
                    {proyecto.titulo}
                  </h3>
                  <p className="text-xs text-azulGrisaceo line-clamp-2 leading-relaxed">
                    {proyecto.descripcion}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {proyecto.tecnologias.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-azulOscuro/5 text-azulOscuro text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}

          <p className="text-center mt-6">
            <Link to="/nosotros" className="text-sm font-extrabold text-blue-600 hover:text-blue-700">Más en Nosotros →</Link>
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-6 sm:p-8 text-center">
            <p className="text-white/90 mb-4 text-sm sm:text-base">Coyhaique · Respuesta en menos de 24 h.</p>
            <Link to="/contacto" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-extrabold text-blue-700 shadow-lg hover:bg-white/90 transition">
              Cotiza tu proyecto
            </Link>
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
