// src/pages/Empleos.js
import React, { useState } from "react"

const Empleos = () => {
  const [sortBy, setSortBy] = useState("recent")
  const [search, setSearch] = useState("")

  const jobListings = [
    {
      id: 1,
      title: "Manager GenAI",
      department: "Data & AI",
      location: { country: "CHILE", city: "SANTIAGO" },
      timeAgo: "Hace 3 días",
    },
    {
      id: 2,
      title: "Data Platform Administrator",
      department: "Data & AI",
      location: { country: "CHILE", city: "SANTIAGO" },
      timeAgo: "Hace 3 días",
    },
    {
      id: 3,
      title: "Data Engineer Azure MLOps",
      department: "Data & AI",
      location: { country: "CHILE", city: "SANTIAGO" },
      timeAgo: "Hace 3 días",
    },
    {
      id: 4,
      title: "Especialista de Conectividad | Minería",
      department: "Information Technology Operations",
      location: { country: "CHILE", city: "SANTIAGO" },
      timeAgo: "Hace 3 días",
    },
    {
      id: 5,
      title: "Desarrollador/a iOS Senior",
      department: "Software Engineering",
      location: { country: "CHILE", city: "SANTIAGO" },
      timeAgo: "Hace 3 días",
    },
    {
      id: 6,
      title: "Consultores SAP Plant Maintenance",
      department: "Software Engineering",
      location: { country: "CHILE", city: "SANTIAGO" },
      timeAgo: "Hace 3 días",
    },
  ]

  const filteredJobs = jobListings.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.department.toLowerCase().includes(search.toLowerCase()) ||
    job.location.city.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col md:flex-row p-4">
        {/* Sección principal */}
        <main className="w-full md:w-4/4 p-4">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">
            Busca Oportunidades Laborales en Sur Digital Labs
          </h1>

          {/* Barra de búsqueda */}
          <div className="flex flex-col sm:flex-row gap-2 mb-6">
            <input
              type="text"
              placeholder='Usa comillas para coincidencia exacta'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-azulOscuro text-blancoHueso text-sm font-semibold hover:bg-turquesaVibrante transition-colors"
            >
              BUSCAR
            </button>
          </div>

          {/* Filtros / Orden */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="text-sm font-semibold text-gray-700">
                Últimas búsquedas de Empleo ({jobListings.length})
              </h2>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <span className="font-medium">ORDENAR POR:</span>
                <button
                  className={`px-2 py-1 rounded ${
                    sortBy === "recent"
                      ? "font-bold text-azulOscuro"
                      : "hover:text-gray-900"
                  }`}
                  onClick={() => setSortBy("recent")}
                  type="button"
                >
                  MÁS RECIENTE
                </button>
                <span>|</span>
                <button
                  className={`px-2 py-1 rounded ${
                    sortBy === "relevant"
                      ? "font-bold text-azulOscuro"
                      : "hover:text-gray-900"
                  }`}
                  onClick={() => setSortBy("relevant")}
                  type="button"
                >
                  LO MÁS RELEVANTE
                </button>
              </div>
            </div>
          </div>

          {/* Lista de empleos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-4 rounded-lg shadow-md border border-gray-100 flex flex-col gap-2 transition-transform duration-300 hover:scale-105"
                >
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="uppercase tracking-wide">
                      {job.location.country}
                    </span>
                    <span>•</span>
                    <span>{job.location.city}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mt-1">
                    {job.title}
                  </h3>

                  <p className="text-sm text-gray-600">{job.department}</p>

                  <p className="text-xs italic text-gray-500 mt-2">
                    {job.timeAgo}
                  </p>

                  <div className="mt-3">
                    <button
                      type="button"
                      className="px-3 py-1 text-xs font-semibold rounded-lg bg-verdeTurquesa text-blancoHueso hover:bg-turquesaVibrante transition-colors"
                    >
                      Ver detalle
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-sm">
                No se encontraron oportunidades que coincidan con tu búsqueda.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Empleos
