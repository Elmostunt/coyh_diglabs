import React from 'react';

const Testimonials = ({ testimonials = [] }) => {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-800/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Empresas que confiaron en nosotros y obtuvieron resultados
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-700 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-600"
            >
              {/* Estrellas */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>

              {/* Cita */}
              <p className="text-slate-700 dark:text-slate-300 mb-6 italic text-sm leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Autor */}
              <div className="border-t border-slate-200 dark:border-slate-600 pt-4">
                <p className="font-semibold text-slate-900 dark:text-white">
                  {testimonial.author}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {testimonial.position}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
