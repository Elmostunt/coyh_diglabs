// src/pages/Nosotros.js
import React, { useEffect, useMemo } from "react";

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
    "Nosotros - Equipo de Desarrollo de Software en Coyhaique, Patagonia | Sur Digital Labs",
    "Empresa regional de desarrollo de software en Coyhaique, Aysén. Equipo con experiencia en proyectos reales: desarrollo web, APIs, cloud, IA. Compromiso con talento tecnológico local y supervisión senior."
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
              Nosotros
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-white/90 text-lg">
              Desarrollo de software con foco regional y estándar profesional
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
            <p className="text-center mb-6 text-azulGrisaceo">
              <a href="/servicios" className="text-blue-600 hover:text-blue-700 font-semibold">Ver nuestros servicios →</a> | 
              <a href="/contacto" className="text-blue-600 hover:text-blue-700 font-semibold ml-1"> Contacta con nosotros →</a>
            </p>
            <div className="prose prose-lg max-w-none">
              <div className="rounded-lg bg-blue-50 border-2 border-blue-200 p-4 mb-6">
                <p className="text-blue-900 font-extrabold text-lg mb-2">
                  Empresa regional de Coyhaique, Patagonia
                </p>
                <p className="text-blue-800 text-base">
                  Acompañamiento cercano con talento local y supervisión senior. 
                  Creamos soluciones digitales reales para empresas que necesitan avanzar con orden, criterio técnico y acompañamiento cercano.
                </p>
              </div>
              <p className="text-azulGrisaceo text-lg mb-4">
                Somos una empresa de desarrollo de software y consultoría tecnológica con base en{" "}
                <strong className="text-azulOscuro">Coyhaique, Aysén</strong>. 
                Creamos soluciones digitales reales para empresas que necesitan avanzar con orden, criterio técnico y acompañamiento cercano.
              </p>
              <p className="text-azulGrisaceo text-lg mb-4">
                Nuestro enfoque combina <strong className="text-azulOscuro">experiencia en proyectos complejos</strong> con un{" "}
                <strong className="text-azulOscuro">compromiso activo por el desarrollo del talento tecnológico local</strong>, 
                integrando formación, mentoría y supervisión profesional en cada iniciativa.
              </p>
              <p className="text-azulGrisaceo text-lg">
                Nacimos en <strong className="text-azulOscuro">Coyhaique, Aysén</strong>, con la idea de acercar
                tecnología de clase mundial a la Patagonia y a cualquier
                organización que valore la calidad técnica. Unimos ingeniería,
                educación y comunidad: desarrollamos proyectos reales, formamos
                talento y compartimos conocimiento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCIA */}
      <section className="bg-blancoCremoso/40 py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-azulOscuro mb-4">
              Experiencia en proyectos reales
            </h2>
            <p className="text-lg text-azulGrisaceo max-w-3xl mx-auto">
              Nuestro equipo ha participado en proyectos de software, cloud, datos e inteligencia artificial 
              en distintos contextos operativos y empresariales. Trabajamos en iniciativas que van desde 
              plataformas web y backends productivos, hasta arquitecturas en la nube, automatización avanzada 
              y soluciones basadas en modelos de lenguaje (LLMs).
            </p>
            <p className="mt-4 text-azulGrisaceo max-w-3xl mx-auto">
              Por confidencialidad, no publicamos nombres de clientes, pero sí compartimos{" "}
              <strong className="text-azulOscuro">el tipo de problemas que abordamos, cómo los resolvemos y el valor que entregamos</strong>.
            </p>
          </header>
        </div>
      </section>

      {/* PROYECTOS REPRESENTATIVOS */}
      <section className="bg-white py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-azulOscuro mb-4">
              Proyectos representativos
            </h2>
            <p className="text-azulGrisaceo max-w-3xl mx-auto">
              A continuación, algunos ejemplos de proyectos en los que hemos trabajado, descritos de forma anonimizada 
              y enfocados en el proceso técnico y el impacto logrado.
            </p>
            <p className="mt-2 text-sm text-azulGrisaceo italic max-w-3xl mx-auto">
              Nuestro interés no es mostrar logos, sino demostrar <strong className="text-azulOscuro">criterio profesional, forma de trabajo y capacidad técnica</strong>.
            </p>
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
      <section className="bg-blancoCremoso/40 py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-azulOscuro mb-4">
              Cómo abordamos cada proyecto
            </h2>
            <p className="text-azulGrisaceo max-w-3xl mx-auto">
              Nuestro trabajo se basa en procesos claros y decisiones técnicas bien fundamentadas:
            </p>
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
      <section className="bg-white py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="max-w-3xl mx-auto">
            <header className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-azulOscuro mb-4">
                Compromiso con el talento tecnológico regional
              </h2>
            </header>
            <div className="prose prose-lg max-w-none">
              <p className="text-azulGrisaceo text-lg mb-4">
                Creemos en el desarrollo del talento local como parte del crecimiento tecnológico sostenible.
              </p>
              <p className="text-azulGrisaceo text-lg mb-4">
                Por eso, fomentamos la participación de <strong className="text-azulOscuro">ingenieros y profesionales en formación</strong> en nuestros proyectos, 
                bajo un modelo de <strong className="text-azulOscuro">mentorías, revisión técnica y supervisión senior</strong>.
              </p>
              <p className="text-azulGrisaceo text-lg mb-6">
                Esto nos permite:
              </p>
              <ul className="space-y-2 text-azulGrisaceo mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Aportar a la formación práctica de la comunidad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Mantener estándares profesionales en cada entrega</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Construir soluciones con impacto técnico y social</span>
                </li>
              </ul>
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                <p className="text-sm text-blue-900 italic">
                  <strong>Nota importante:</strong> La responsabilidad técnica y la calidad final del proyecto siempre están lideradas por perfiles senior.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARA QUIÉNES TRABAJAMOS */}
      <section className="bg-blancoCremoso/40 py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-azulOscuro mb-4">
              Para quiénes trabajamos
            </h2>
            <p className="text-azulGrisaceo max-w-3xl mx-auto mb-8">
              Trabajamos con empresas que buscan:
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Ordenar y profesionalizar su tecnología",
              "Desarrollar software a medida",
              "Automatizar procesos reales",
              "Escalar con criterio, no improvisación",
              "Acompañamiento cercano y comunicación clara",
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
          <p className="text-center text-azulGrisaceo mt-8 max-w-3xl mx-auto">
            Especialmente pymes y organizaciones regionales que necesitan{" "}
            <strong className="text-azulOscuro">un socio tecnológico</strong>, no solo un proveedor.
          </p>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="bg-white py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-azulOscuro">Nuestro Equipo</h2>
            <p className="mt-2 text-azulGrisaceo">Las personas que hacen posible Sur Digital Labs</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((persona, i) => (
              <TeamCard key={i} {...persona} />
            ))}
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="bg-blancoCremoso/40 py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-azulOscuro">Nuestros Valores</h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Calidad Técnica",
                desc: "Desarrollamos soluciones robustas y escalables con las mejores prácticas de la industria.",
                icon: "⚡"
              },
              {
                title: "Innovación",
                desc: "Aplicamos tecnologías de vanguardia para resolver problemas reales de manera eficiente.",
                icon: "🚀"
              },
              {
                title: "Comunidad",
                desc: "Creemos en compartir conocimiento y formar talento local en la Patagonia.",
                icon: "🤝"
              }
            ].map((value, i) => (
              <div
                key={i}
                className="rounded-2xl border border-azulOscuro/10 bg-white p-6 shadow-sm"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-extrabold text-azulOscuro mb-2">{value.title}</h3>
                <p className="text-azulGrisaceo">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
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
              ¿Quieres trabajar con nosotros?
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-base font-extrabold text-blue-700 shadow-lg hover:bg-white/90 hover:shadow-xl transition touch-manipulation"
              >
                Cotiza tu proyecto
              </a>
              <a
                href="https://calendly.com/surdigitallabs/30min"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/40 bg-white/10 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/20 transition touch-manipulation"
              >
                Agenda diagnóstico
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
