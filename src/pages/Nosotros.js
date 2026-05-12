// src/pages/Nosotros.js
import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

// --- util: scroll to top
const useScrollTop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
};

// --- SEO hook
const useSEO = (title, description) => {
  useEffect(() => {
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);
};

// --- card de persona/mascota con estilo moderno
const TeamCard = ({ name, role, img, linkedin, email }) => (
  <article className="group rounded-2xl border border-azulOscuro/10 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div className="relative aspect-square overflow-hidden bg-azulOscuro/5">
      <img
        src={img}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          e.target.src = '/logo_chico.jpg';
        }}
      />
    </div>
    <div className="p-5">
      <h3 className="text-lg font-extrabold text-azulOscuro mb-1">{name}</h3>
      <p className="text-sm text-azulGrisaceo mb-4">{role}</p>

      <div className="flex gap-2">
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 border border-azulOscuro/20 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition"
            aria-label={`${name} LinkedIn`}
          >
            <svg viewBox="0 0 448 512" className="h-4 w-4 fill-current">
              <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 1 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
            </svg>
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 border border-azulOscuro/20 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition"
            aria-label={`${name} email`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  </article>
);

const Nosotros = () => {
  useScrollTop();
  useSEO(
    "Nosotros - Socio tecnológico en Coyhaique, Patagonia | Sur Digital Labs",
    "Equipo con base en Coyhaique, Aysén: software, datos y automatización con estándar profesional. Experiencia en proyectos reales, APIs, cloud e IA. Compromiso con talento tecnológico local y supervisión senior."
  );

  const team = useMemo(
    () => [
      {
        name: "Guillermo Cárcamo Díaz",
        role: "Fundador & Arquitecto de Software y Datos",
        img: "https://storage.googleapis.com/surdigilabs_images/nosotros/guillermo.png",
        // linkedin: "https://www.linkedin.com/in/tu-perfil",
        // email: "guillermo@tudominio.cl",
      },
      {
        name: "Memo",
        role: "Chief Happiness Officer (Feel Good Manager)",
        img: "https://storage.googleapis.com/surdigilabs_images/nosotros/memito.jpeg",
      },
    ],
    []
  );

  const proyectos = useMemo(
    () => [
      {
        titulo: "Plataforma de agentes especializados con LLMs",
        contexto: "Necesidad de automatizar análisis y tareas complejas usando modelos de lenguaje en entornos productivos.",
        problema: "Orquestar múltiples capacidades sin perder control técnico ni trazabilidad de decisiones.",
        solucion: "Diseño de agentes especializados con LangChain, separación clara de responsabilidades y flujos de decisión explícitos.",
        entrega: "Arquitectura de agentes coordinados, integrables vía API y extensibles por dominio.",
        valor: "Mayor capacidad de automatización avanzada y base sólida para escalar casos de uso con LLMs.",
      },
      {
        titulo: "Custom GPT integrado con backend productivo",
        contexto: "Requerimiento de exponer capacidades internas a través de un GPT personalizado.",
        problema: "Integrar datos corporativos y lógica de negocio sin exponer directamente sistemas internos.",
        solucion: "Desarrollo de backend en Cloud Run, definición de contrato OpenAPI y autenticación con OAuth y Cloud Run Invoker.",
        entrega: "Custom GPT conectado a un endpoint controlado, compatible con el esquema esperado por OpenAI/Cosmos.",
        valor: "Uso seguro y gobernado de LLMs sobre datos reales, manteniendo control técnico y operativo.",
      },
      {
        titulo: "Sistema de microplanificación y optimización de tareas",
        contexto: "Necesidad de planificar y ajustar tareas operativas de forma dinámica.",
        problema: "Falta de visibilidad y optimización en la asignación y secuencia de tareas.",
        solucion: "Diseño modular con frontend de gestión, backend en Cloud Run y modelos de optimización entrenados.",
        entrega: "Plataforma con base operativa, análisis en BigQuery y capacidad de simulación de escenarios.",
        valor: "Mejora en la toma de decisiones operativas y reducción de fricción en la planificación diaria.",
      },
      {
        titulo: "Frontend de gestión conectado a API backend",
        contexto: "Requerimiento de una interfaz clara para administrar entidades de negocio.",
        problema: "Desacople entre UI y lógica backend dificultaba evolución y mantenimiento.",
        solucion: "Implementación de frontend en Next.js con Ant Design y backend en FastAPI para orquestar CRUD y acciones.",
        entrega: "Aplicación web desacoplada, con contratos claros entre frontend y backend.",
        valor: "Mayor velocidad de desarrollo, mejor mantenibilidad y experiencia de uso consistente.",
      },
      {
        titulo: "Infraestructura de bases de datos en GCP con red privada",
        contexto: "Necesidad de desplegar bases de datos seguras y reutilizables entre entornos.",
        problema: "Configuración manual y poco consistente de redes, permisos y secretos.",
        solucion: "Infraestructura como código con Terraform, uso de módulos comunes, VPC peering y Secret Manager.",
        entrega: "Cloud SQL en red privada, con entornos dev/prod y permisos gestionados por módulos.",
        valor: "Infraestructura reproducible, segura y alineada con buenas prácticas de operación.",
      },
    ],
    []
  );

  const proceso = useMemo(
    () => [
      {
        paso: "1",
        titulo: "Análisis y diagnóstico",
        descripcion: "Entendemos el contexto, los objetivos y las restricciones reales del cliente.",
      },
      {
        paso: "2",
        titulo: "Diseño de solución",
        descripcion: "Definimos arquitectura, tecnologías y alcance, priorizando mantenibilidad y escalabilidad.",
      },
      {
        paso: "3",
        titulo: "Ejecución controlada",
        descripcion: "Desarrollo iterativo, coordinación técnica y validaciones constantes.",
      },
      {
        paso: "4",
        titulo: "Entrega y traspaso",
        descripcion: "Documentación, explicación del sistema y apoyo en la adopción.",
      },
      {
        paso: "5",
        titulo: "Acompañamiento",
        descripcion: "Soporte inicial y mejoras según evolución del negocio.",
      },
    ],
    []
  );

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Tecnología con estándar profesional, desde la Patagonia.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-white/90 text-base leading-relaxed">
              Socio tecnológico con base en Coyhaique: software, datos y automatización para pymes y organizaciones que necesitan un partner técnico real.
            </p>
          </div>
        </div>
      </section>

      {/* ENFOQUE DE LA EMPRESA */}
      <section className="bg-white py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-azulOscuro mb-6 text-center">
              Nuestro enfoque
            </h2>
            <p className="text-center mb-6 text-sm text-azulGrisaceo">
              <Link to="/servicios" className="text-blue-600 hover:text-blue-700 font-semibold">Servicios</Link> · <Link to="/contacto" className="text-blue-600 hover:text-blue-700 font-semibold">Contacto</Link>
            </p>
            <div className="prose prose-lg max-w-none">
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 mb-6">
                <p className="text-blue-900 font-extrabold mb-1">Coyhaique, Patagonia</p>
                <p className="text-blue-800 text-sm">
                  Socio tecnológico con talento local y supervisión senior. Software, datos y automatización con estándar profesional.
                </p>
              </div>
              <p className="text-azulGrisaceo text-base mb-4">
                Combinamos experiencia en proyectos complejos con compromiso por el talento tecnológico local: mentoría y supervisión en cada iniciativa.
              </p>
              <p className="text-azulGrisaceo text-base">
                Nacimos en Coyhaique con la idea de acercar tecnología de calidad a la Patagonia: proyectos reales, formación y comunidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROYECTOS REPRESENTATIVOS */}
      <section className="bg-blancoHueso py-12 sm:py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <header className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-azulOscuro">Proyectos representativos</h2>
            <p className="mt-2 text-sm text-azulGrisaceo max-w-2xl mx-auto">Casos reales descritos de forma anonimizada: problema, solución e impacto.</p>
          </header>

          <div className="space-y-8">
            {proyectos.map((proyecto, i) => (
              <article
                key={i}
                className="rounded-2xl border border-azulOscuro/10 bg-white p-6 md:p-8 shadow-sm"
              >
                <h3 className="text-xl font-extrabold text-azulOscuro mb-4">
                  {proyecto.titulo}
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-extrabold text-azulOscuro mb-2 uppercase tracking-wide">
                      Contexto
                    </h4>
                    <p className="text-sm text-azulGrisaceo mb-4">{proyecto.contexto}</p>
                    <h4 className="text-sm font-extrabold text-azulOscuro mb-2 uppercase tracking-wide">
                      Problema
                    </h4>
                    <p className="text-sm text-azulGrisaceo">{proyecto.problema}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-azulOscuro mb-2 uppercase tracking-wide">
                      Cómo se trabajó
                    </h4>
                    <p className="text-sm text-azulGrisaceo mb-4">{proyecto.solucion}</p>
                    <h4 className="text-sm font-extrabold text-azulOscuro mb-2 uppercase tracking-wide">
                      Solución entregada
                    </h4>
                    <p className="text-sm text-azulGrisaceo mb-4">{proyecto.entrega}</p>
                    <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
                      <h4 className="text-sm font-extrabold text-blue-900 mb-1">
                        Valor aportado
                      </h4>
                      <p className="text-sm text-blue-800">{proyecto.valor}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section className="bg-blancoCremoso/40 py-10">
        <div className="mx-auto w-full max-w-6xl px-4">
          <header className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-azulOscuro">Cómo trabajamos</h2>
          </header>

          <div className="grid gap-6 md:grid-cols-5">
            {proceso.map((item) => (
              <div
                key={item.paso}
                className="rounded-2xl border border-azulOscuro/10 bg-white p-6 shadow-sm"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white text-xl font-extrabold mb-4">
                  {item.paso}
                </div>
                <h3 className="text-lg font-extrabold text-azulOscuro mb-2">
                  {item.titulo}
                </h3>
                <p className="text-sm text-azulGrisaceo">{item.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TALENTO REGIONAL */}
      <section className="bg-white py-10">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-extrabold text-azulOscuro mb-4">Talento regional</h2>
            <p className="text-azulGrisaceo text-base">
              Fomentamos la participación de profesionales en formación con mentoría y supervisión senior. La calidad final siempre la lideran perfiles senior.
            </p>
          </div>
        </div>
      </section>

      {/* PARA QUIÉNES TRABAJAMOS */}
      <section className="bg-blancoCremoso/40 py-10">
        <div className="mx-auto w-full max-w-6xl px-4">
          <header className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-azulOscuro">Para quiénes</h2>
          </header>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Empresas que quieren ordenar y profesionalizar su tecnología.",
              "Organizaciones que necesitan software a medida, no soluciones genéricas.",
              "Equipos que buscan automatizar procesos reales con impacto medible.",
              "Pymes que quieren escalar con criterio, sin improvisar.",
              "Clientes que valoran el acompañamiento cercano y la comunicación directa.",
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-azulOscuro/10 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shrink-0">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-azulGrisaceo font-medium">{item}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-azulGrisaceo mt-6 text-sm max-w-2xl mx-auto">Pymes y organizaciones que necesitan un socio tecnológico.</p>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="bg-white py-10">
        <div className="mx-auto w-full max-w-6xl px-4">
          <header className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-azulOscuro">Equipo</h2>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((persona, i) => (
              <TeamCard key={i} {...persona} />
            ))}
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="bg-blancoCremoso/40 py-10">
        <div className="mx-auto w-full max-w-6xl px-4">
          <header className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-azulOscuro">Valores</h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Calidad", desc: "Soluciones robustas y buenas prácticas.", icon: "⚡" },
              { title: "Innovación", desc: "Tecnología para problemas reales.", icon: "🚀" },
              { title: "Comunidad", desc: "Conocimiento y talento local.", icon: "🤝" }
            ].map((value, i) => (
              <div key={i} className="rounded-xl border border-azulOscuro/10 bg-white p-4 shadow-sm">
                <span className="text-2xl">{value.icon}</span>
                <h3 className="text-lg font-extrabold text-azulOscuro mt-2 mb-1">{value.title}</h3>
                <p className="text-sm text-azulGrisaceo">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-white py-8">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-6 sm:p-8 text-center">
            <h2 className="text-2xl font-extrabold text-white mb-2">¿Proyecto en mente?</h2>
            <p className="text-white/80 mb-6 text-sm">Coyhaique · Respuesta en menos de 24 h.</p>
            <Link to="/contacto" className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-extrabold text-blue-700 shadow-lg hover:bg-white/90 transition">
              Cotiza tu proyecto
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
