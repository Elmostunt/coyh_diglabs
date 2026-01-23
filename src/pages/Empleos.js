// src/pages/Empleos.js
import React, { useState } from "react";

const Empleos = () => {
  const [sortBy, setSortBy] = useState("recent");
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("Todos");
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const jobListings = [
    {
      id: 1,
      title: "Practicante Frontend",
      department: "Desarrollo",
      location: { country: "CHILE", city: "COYHAIQUE" },
      timeAgo: "Hace 1 día",
      descripcion: "Buscamos un practicante de Frontend para unirse a nuestro equipo de desarrollo. Trabajarás en proyectos reales, desarrollando interfaces modernas y responsivas con React y tecnologías web actuales.",
      labores: [
        "Desarrollar componentes React reutilizables y mantenibles",
        "Implementar diseños responsive usando Tailwind CSS",
        "Integrar componentes frontend con APIs REST",
        "Realizar testing básico de componentes",
        "Colaborar con el equipo en code reviews",
        "Participar en reuniones de planificación y retrospectivas",
        "Documentar código y componentes desarrollados",
        "Optimizar rendimiento de aplicaciones web",
      ],
      requisitos: [
        "Conocimientos básicos de HTML, CSS y JavaScript",
        "Interés en React o frameworks similares",
        "Disposición para aprender y trabajar en equipo",
        "Compromiso y responsabilidad",
      ],
      beneficios: [
        "Experiencia en proyectos reales",
        "Mentoría y supervisión senior",
        "Ambiente de trabajo colaborativo",
        "Oportunidad de crecimiento profesional",
      ],
    },
    {
      id: 2,
      title: "Practicante Backend",
      department: "Desarrollo",
      location: { country: "CHILE", city: "COYHAIQUE" },
      timeAgo: "Hace 1 día",
      descripcion: "Buscamos un practicante de Backend para desarrollar APIs y lógica de negocio. Trabajarás con tecnologías modernas en la nube, aprendiendo arquitectura de software y mejores prácticas.",
      labores: [
        "Desarrollar endpoints de APIs REST con Python/FastAPI o Node.js",
        "Implementar lógica de negocio y validaciones",
        "Integrar con bases de datos (SQL y NoSQL)",
        "Escribir y ejecutar tests unitarios",
        "Documentar APIs usando OpenAPI/Swagger",
        "Colaborar en el diseño de arquitectura de servicios",
        "Participar en code reviews y mejoras continuas",
        "Trabajar con servicios cloud (GCP/AWS)",
      ],
      requisitos: [
        "Conocimientos básicos de programación (Python o JavaScript)",
        "Interés en desarrollo backend y APIs",
        "Disposición para aprender arquitectura de software",
        "Compromiso y responsabilidad",
      ],
      beneficios: [
        "Experiencia en proyectos reales",
        "Mentoría y supervisión senior",
        "Aprendizaje de tecnologías cloud",
        "Oportunidad de crecimiento profesional",
      ],
    },
  ];

  const handleVerDetalle = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const departments = ["Todos", "Desarrollo"];

  const filteredJobs = jobListings
    .filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.department.toLowerCase().includes(search.toLowerCase()) ||
        job.location.city.toLowerCase().includes(search.toLowerCase());
      
      const matchesDepartment = selectedDepartment === "Todos" || job.department === selectedDepartment;
      
      return matchesSearch && matchesDepartment;
    })
    .sort((a, b) => {
      if (sortBy === "recent") {
        return 0; // Mantener orden original
      }
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Oportunidades Laborales
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-white/90 text-lg">
              Únete a nuestro equipo y trabaja en proyectos desafiantes desde la Patagonia
            </p>
          </div>
        </div>
      </section>

      {/* FILTROS Y BÚSQUEDA */}
      <section className="bg-white border-b border-azulOscuro/10 sticky top-[104px] z-30 shadow-sm">
        <div className="mx-auto w-full max-w-6xl px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Búsqueda */}
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="Buscar por título, departamento o ubicación..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 rounded-lg border border-azulOscuro/20 bg-white px-4 text-azulOscuro placeholder:text-azulGrisaceo focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
              />
            </div>

            {/* Filtro por departamento */}
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    selectedDepartment === dept
                      ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-sm'
                      : 'bg-white border border-azulOscuro/20 text-azulOscuro hover:bg-azulOscuro/5'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Ordenar */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-azulGrisaceo">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'oportunidad encontrada' : 'oportunidades encontradas'}
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-azulGrisaceo">
              <span className="font-medium">ORDENAR POR:</span>
              <button
                className={`px-3 py-1 rounded-full transition ${
                  sortBy === "recent"
                    ? "font-bold bg-blue-600/10 text-blue-700"
                    : "hover:text-azulOscuro"
                }`}
                onClick={() => setSortBy("recent")}
                type="button"
              >
                MÁS RECIENTE
              </button>
              <span>|</span>
              <button
                className={`px-3 py-1 rounded-full transition ${
                  sortBy === "relevant"
                    ? "font-bold bg-blue-600/10 text-blue-700"
                    : "hover:text-azulOscuro"
                }`}
                onClick={() => setSortBy("relevant")}
                type="button"
              >
                LO MÁS RELEVANTE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* LISTA DE EMPLEOS */}
      <section className="bg-blancoCremoso/40 py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <article
                  key={job.id}
                  className="group rounded-2xl border border-azulOscuro/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center gap-2 text-xs text-azulGrisaceo mb-3">
                    <span className="uppercase tracking-wide font-semibold">
                      {job.location.country}
                    </span>
                    <span>•</span>
                    <span>{job.location.city}</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-azulOscuro mb-2">
                    {job.title}
                  </h3>

                  <p className="text-sm text-azulGrisaceo mb-4">{job.department}</p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-azulOscuro/10">
                    <p className="text-xs text-azulGrisaceo italic">
                      {job.timeAgo}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleVerDetalle(job)}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-sm font-extrabold text-white shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] touch-manipulation"
                    >
                      Ver detalle
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-azulOscuro/10 mb-4">
                <svg className="w-8 h-8 text-azulGrisaceo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-azulOscuro mb-2">No se encontraron oportunidades</h3>
              <p className="text-azulGrisaceo">Intenta con otros términos de búsqueda o selecciona otro departamento.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-white py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="rounded-3xl border border-azulOscuro/10 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-8 md:p-12 text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              ¿No encuentras la oportunidad que buscas?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Envíanos tu CV y te contactaremos cuando tengamos una posición que coincida con tu perfil.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-extrabold text-blue-700 shadow-sm hover:bg-white/90 transition"
              >
                Enviar CV
              </a>
              <a
                href="https://calendly.com/surdigitallabs/30min"
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

      {/* MODAL DE DETALLES */}
      {isModalOpen && selectedJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-4 sm:px-6 py-4 sm:py-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                    {selectedJob.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-white/90">
                    <span className="font-semibold">{selectedJob.department}</span>
                    <span>•</span>
                    <span>{selectedJob.location.city}, {selectedJob.location.country}</span>
                    <span>•</span>
                    <span>{selectedJob.timeAgo}</span>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="ml-4 grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition touch-manipulation shrink-0"
                  aria-label="Cerrar"
                >
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-6 py-4 sm:py-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Descripción */}
              <div className="mb-6">
                <h3 className="text-lg font-extrabold text-azulOscuro mb-3">Descripción del puesto</h3>
                <p className="text-sm sm:text-base text-azulGrisaceo leading-relaxed">
                  {selectedJob.descripcion}
                </p>
              </div>

              {/* Labores */}
              <div className="mb-6">
                <h3 className="text-lg font-extrabold text-azulOscuro mb-3">Labores y responsabilidades</h3>
                <ul className="space-y-2">
                  {selectedJob.labores.map((labor, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <span className="text-blue-600 mt-1 shrink-0 font-bold">•</span>
                      <span className="text-sm sm:text-base text-azulGrisaceo leading-relaxed">{labor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requisitos */}
              <div className="mb-6">
                <h3 className="text-lg font-extrabold text-azulOscuro mb-3">Requisitos</h3>
                <ul className="space-y-2">
                  {selectedJob.requisitos.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <span className="text-green-600 mt-1 shrink-0">✓</span>
                      <span className="text-sm sm:text-base text-azulGrisaceo leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Beneficios */}
              <div className="mb-6">
                <h3 className="text-lg font-extrabold text-azulOscuro mb-3">Beneficios</h3>
                <ul className="space-y-2">
                  {selectedJob.beneficios.map((beneficio, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <span className="text-yellow-600 mt-1 shrink-0">★</span>
                      <span className="text-sm sm:text-base text-azulGrisaceo leading-relaxed">{beneficio}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-6 pt-6 border-t border-azulOscuro/10">
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/contacto"
                    className="flex-1 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-5 py-3 text-sm sm:text-base font-extrabold text-white shadow-lg hover:shadow-xl transition touch-manipulation"
                  >
                    Postular ahora
                  </a>
                  <a
                    href={`https://wa.me/56975204813?text=${encodeURIComponent(`Hola! Estoy interesado en el puesto de ${selectedJob.title}. ¿Me pueden dar más información?`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center rounded-lg border-2 border-green-600 bg-white px-5 py-3 text-sm sm:text-base font-extrabold text-green-700 hover:bg-green-50 transition touch-manipulation"
                  >
                    Consultar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Empleos;
