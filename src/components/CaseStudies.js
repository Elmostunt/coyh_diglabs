import React from 'react';

const CaseStudies = ({ cases = [] }) => {
  if (!cases || cases.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white">
            Casos de éxito
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Proyectos reales con resultados medibles
          </p>
        </div>

        <div className="space-y-8">
          {cases.map((caseStudy, idx) => (
            <div
              key={idx}
              className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="grid md:grid-cols-3 gap-0">
                {/* Contenido */}
                <div className="md:col-span-2 p-8 bg-white dark:bg-slate-800">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {caseStudy.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {caseStudy.company} • {caseStudy.industry}
                  </p>

                  <div className="mb-4">
                    <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                      <strong>Desafío:</strong> {caseStudy.challenge}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                      <strong>Solución:</strong> {caseStudy.solution}
                    </p>
                  </div>

                  {/* Resultados */}
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded">
                    {caseStudy.results.map((result, i) => (
                      <div key={i}>
                        <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                          {result.metric}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {result.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Badge */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 p-8 flex items-center justify-center md:col-span-1">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {caseStudy.duration}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                      Duración del proyecto
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
