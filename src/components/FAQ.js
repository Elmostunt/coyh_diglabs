import React, { useState } from 'react';

const FAQ = ({ items = [], title = "Preguntas Frecuentes" }) => {
  const [openIdx, setOpenIdx] = useState(null);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-800/30">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white">
            {title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Resolvemos tus dudas
          </p>
        </div>

        <div className="space-y-3">
          {items.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
              >
                <span className="font-semibold text-slate-900 dark:text-white text-left">
                  {faq.q || faq.question}
                </span>
                <span className="text-slate-600 dark:text-slate-400 ml-4 flex-shrink-0">
                  {openIdx === idx ? '−' : '+'}
                </span>
              </button>

              {openIdx === idx && (
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-600">
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                    {faq.a || faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
