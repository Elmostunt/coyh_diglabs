import React from "react";

const ProyectoModal = ({ proyecto, isOpen, onClose }) => {
  if (!isOpen || !proyecto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-6 py-4 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-2">
                {proyecto.categoria}
              </div>
              <h2 className="text-2xl font-extrabold text-white">{proyecto.titulo}</h2>
            </div>
            <button
              onClick={onClose}
              className="ml-4 grid h-8 w-8 place-items-center rounded-full bg-white/20 text-white hover:bg-white/30 transition"
              aria-label="Cerrar"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {proyecto.descripcion && (
            <div>
              <h3 className="text-sm font-extrabold text-azulOscuro uppercase tracking-wide mb-2">
                Descripción
              </h3>
              <p className="text-azulGrisaceo">{proyecto.descripcion}</p>
            </div>
          )}

          {proyecto.tecnologias && proyecto.tecnologias.length > 0 && (
            <div>
              <h3 className="text-sm font-extrabold text-azulOscuro uppercase tracking-wide mb-3">
                Tecnologías
              </h3>
              <div className="flex flex-wrap gap-2">
                {proyecto.tecnologias.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {proyecto.arquitectura && (
            <div>
              <h3 className="text-sm font-extrabold text-azulOscuro uppercase tracking-wide mb-2">
                Arquitectura
              </h3>
              <p className="text-azulGrisaceo">{proyecto.arquitectura}</p>
            </div>
          )}

          {proyecto.valor && (
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
              <h3 className="text-sm font-extrabold text-blue-900 mb-2">Valor aportado</h3>
              <p className="text-blue-800">{proyecto.valor}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-azulOscuro/10 bg-white px-6 py-4 rounded-b-2xl">
          <div className="flex flex-wrap gap-3">
            <a
              href="/contacto"
              className="flex-1 min-w-[120px] inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-4 py-2 text-sm font-extrabold text-white shadow-sm hover:shadow-md transition"
            >
              Solicitar cotización
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-azulOscuro/20 text-azulOscuro text-sm font-semibold hover:bg-azulOscuro/5 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProyectoModal;
