// src/pages/Nosotros.js
import React, { useEffect, useMemo } from "react";

// --- util: scroll to top
const useScrollTop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
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
              Conoce al equipo detrás de Sur Digital Labs
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="bg-white py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-azulGrisaceo text-lg mb-4">
                En <strong className="text-azulOscuro">Sur Digital Labs</strong> diseñamos y construimos
                soluciones de <em>software</em>, <em>datos</em> e{" "}
                <em>inteligencia artificial</em> que mejoran la vida de las personas
                y potencian a los negocios del sur de Chile y LATAM.
              </p>
              <p className="text-azulGrisaceo text-lg mb-4">
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

      {/* TEAM SECTION */}
      <section className="bg-blancoCremoso/40 py-14">
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
      <section className="bg-white py-14">
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
      <section className="bg-blancoCremoso/40 py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="rounded-3xl border border-azulOscuro/10 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-8 md:p-12 text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              ¿Quieres trabajar con nosotros?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Estamos siempre buscando talento y proyectos interesantes. Contáctanos para conocer más.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-extrabold text-blue-700 shadow-sm hover:bg-white/90 transition"
              >
                Contáctanos
              </a>
              <a
                href="/empleos"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/15 transition"
              >
                Ver Empleos
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
