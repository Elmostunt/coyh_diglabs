// src/pages/Nosotros.js
import React, { useEffect, useMemo } from "react";

// --- util: scroll to top
const useScrollTop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
};

// --- card de persona/mascota con estilo similar a Servicios
const TeamCard = ({ name, role, img, linkedin, email }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
    <img
      src={img}
      alt={name}
      className="w-full h-40 object-cover mb-4 rounded-lg"
    />
    <h3 className="text-lg font-bold mb-1">{name}</h3>
    <p className="text-gray-600 mb-3">{role}</p>

    <div className="flex gap-2">
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100"
          aria-label={`${name} LinkedIn`}
        >
          {/* svg linkedin */}
        </a>
      )}
      {email && (
        <a
          href={`mailto:${email}`}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100"
          aria-label={`${name} email`}
        >
          {/* svg mail */}
        </a>
      )}
    </div>
  </div>
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
    <div>
      <div className="flex flex-col md:flex-row p-4">
        {/* Sección principal */}
        <main className="w-full md:w-4/4 p-4">
          <h1 className="text-2xl font-bold mb-6">Nosotros</h1>

          <p className="text-gray-700 mb-4">
            En <strong>Sur Digital Labs</strong> diseñamos y construimos
            soluciones de <em>software</em>, <em>datos</em> e{" "}
            <em>inteligencia artificial</em> que mejoran la vida de las personas
            y potencian a los negocios del sur de Chile y LATAM.
          </p>
          <p className="text-gray-700 mb-4">
            Nacimos en <strong>Coyhaique, Aysén</strong>, con la idea de acercar
            tecnología de clase mundial a la Patagonia y a cualquier
            organización que valore la calidad técnica. Unimos ingeniería,
            educación y comunidad: desarrollamos proyectos reales, formamos
            talento y compartimos conocimiento.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Nuestro equipo</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((persona, i) => (
              <TeamCard key={i} {...persona} />
            ))}
          </div>
        </main>
      </div>

      <div aria-live="assertive" aria-atomic="true" className="sr-only">
        Sobre Sur Digital Labs
      </div>
    </div>
  );
};

export default Nosotros;
