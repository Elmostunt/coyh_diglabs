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
  { kpi: "+6 años", title: "Experiencia" },
  { kpi: "7–14 días", title: "Entrega" },
  { kpi: "Seguridad", title: "Día 1" },
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

      {/* ÁREAS PRINCIPALES */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <header className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-azulOscuro">Nuestras áreas</h2>
            <p className="mt-2 text-sm text-azulGrisaceo">Dos especialidades. Un solo socio tecnológico.</p>
          </header>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {/* Software */}
            <Link
              to="/software"
              className="group rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6 sm:p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 touch-manipulation flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 grid place-items-center text-2xl text-white shadow-sm shrink-0 p-3">
                  ⚡
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold mb-1">Software & Desarrollo</span>
                  <p className="text-sm font-extrabold text-azulOscuro leading-snug">Construimos software que tu equipo puede operar.</p>
                </div>
              </div>
              <ul className="space-y-1.5 mb-5 flex-1">
                {['Web, apps y e-commerce', 'APIs y software a medida', 'Cloud & DevOps', 'Automatización de procesos'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-azulGrisaceo">
                    <span className="text-blue-500 font-bold shrink-0">✓</span> {item}
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center text-sm font-extrabold text-blue-600 group-hover:text-blue-700 transition">
                Ver servicios de Software →
              </span>
            </Link>

            {/* Datos */}
            <Link
              to="/datos"
              className="group rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-white p-6 sm:p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 touch-manipulation flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-600 to-green-800 grid place-items-center text-2xl text-white shadow-sm shrink-0 p-3">
                  📊
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-green-100 border border-green-200 text-green-800 text-xs font-bold mb-1">Datos & Analítica</span>
                  <p className="text-sm font-extrabold text-azulOscuro leading-snug">Convierte tus datos en decisiones.</p>
                </div>
              </div>
              <ul className="space-y-1.5 mb-5 flex-1">
                {['Dashboards y reportes ejecutivos', 'Pipelines ETL y Big Data', 'Machine Learning e IA aplicada', 'Consultoría y capacitaciones'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-azulGrisaceo">
                    <span className="text-green-500 font-bold shrink-0">✓</span> {item}
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center text-sm font-extrabold text-green-600 group-hover:text-green-700 transition">
                Ver servicios de Datos →
              </span>
            </Link>
          </div>

          {/* Stack */}
          <div className="mt-6 sm:mt-8 rounded-xl border border-azulOscuro/10 bg-blancoHueso p-4 sm:p-5">
            <p className="text-xs sm:text-sm text-azulGrisaceo leading-relaxed">
              <strong className="text-azulOscuro">Stack:</strong> GCP, AWS, Terraform, FastAPI, React/Next.js, Python, LangChain, BigQuery, Power BI.{' '}
              <strong className="text-azulOscuro">Clientes:</strong> pymes de retail, servicios, turismo y administración en Chile y la región.
            </p>
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
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">¿Empezamos?</h2>
            <p className="text-white/80 mb-6 text-sm">Coyhaique · Respuesta en menos de 24 h.</p>
            <Link to="/contacto" className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-extrabold text-blue-700 shadow-lg hover:bg-white/90 transition">
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
