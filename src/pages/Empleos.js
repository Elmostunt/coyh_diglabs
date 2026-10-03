// src/pages/Empleos.js
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSEO } from '../hooks/useSEO';
import { useReveal } from '../hooks/useReveal';
import { PageHero, SectionHeading, PrimaryButton, waLink } from '../components/Editorial';

const JOBS = [
  {
    id: 1,
    title: "Practicante Frontend",
    area: "Desarrollo",
    lugar: "Coyhaique, Chile",
    descripcion: "Buscamos un practicante de Frontend para unirse al equipo. Trabajarás en proyectos reales, desarrollando interfaces modernas y responsivas con React y tecnologías web actuales.",
    labores: [
      "Desarrollar componentes React reutilizables y mantenibles",
      "Implementar diseños responsive con Tailwind CSS",
      "Integrar componentes frontend con APIs REST",
      "Realizar testing básico de componentes",
      "Colaborar en code reviews y planificación",
      "Documentar código y componentes desarrollados",
    ],
    requisitos: [
      "Conocimientos básicos de HTML, CSS y JavaScript",
      "Interés en React o frameworks similares",
      "Disposición para aprender y trabajar en equipo",
      "Compromiso y responsabilidad",
    ],
    beneficios: ["Experiencia en proyectos reales", "Mentoría y supervisión senior", "Ambiente colaborativo", "Oportunidad de crecimiento profesional"],
  },
  {
    id: 2,
    title: "Practicante Backend",
    area: "Desarrollo",
    lugar: "Coyhaique, Chile",
    descripcion: "Buscamos un practicante de Backend para desarrollar APIs y lógica de negocio. Trabajarás con tecnologías modernas en la nube, aprendiendo arquitectura de software y buenas prácticas.",
    labores: [
      "Desarrollar APIs REST con Python o Node.js",
      "Implementar lógica de negocio y validaciones",
      "Integrar bases de datos SQL y NoSQL",
      "Escribir y ejecutar tests unitarios",
      "Documentar APIs con OpenAPI/Swagger",
      "Trabajar con servicios cloud (GCP/AWS)",
    ],
    requisitos: [
      "Conocimientos básicos de programación (Python o JavaScript)",
      "Interés en desarrollo backend y APIs",
      "Disposición para aprender arquitectura de software",
      "Compromiso y responsabilidad",
    ],
    beneficios: ["Experiencia en proyectos reales", "Mentoría y supervisión senior", "Aprendizaje de tecnologías cloud", "Oportunidad de crecimiento profesional"],
  },
];

function JobDetail({ job, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  const List = ({ title, items, mark }) => (
    <div className="mt-8">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it} className="flex gap-3 text-[15px] text-ink/75 leading-relaxed">
            <span className="text-ember shrink-0">{mark}</span>{it}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-night/50 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="job-title">
      <div className="h-full w-full max-w-xl overflow-y-auto bg-paper border-l border-ink/15 p-6 sm:p-10" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-6 border-b border-ink/10 pb-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">{job.area} · {job.lugar}</p>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="h-9 w-9 shrink-0 grid place-items-center border border-ink/20 rounded-full text-ink/60 hover:bg-ink hover:text-paper transition-colors">✕</button>
        </div>
        <h2 id="job-title" className="mt-6 font-display text-4xl text-ink leading-tight">{job.title}</h2>
        <p className="mt-4 text-[15px] text-ink/70 leading-relaxed">{job.descripcion}</p>
        <List title="Qué harás" items={job.labores} mark="—" />
        <List title="Qué buscamos" items={job.requisitos} mark="✓" />
        <List title="Qué ofrecemos" items={job.beneficios} mark="✳" />
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <PrimaryButton to="/contacto" className="flex-1">Postular</PrimaryButton>
          <a
            href={waLink(`Hola! Me interesa el puesto de ${job.title}. ¿Me pueden dar más información?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center rounded-sm border border-ink/25 px-6 py-3.5 text-sm font-semibold text-ink hover:border-ink transition-colors"
          >
            Consultar por WhatsApp ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Empleos() {
  useReveal();
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);

  useSEO({
    title: 'Empleos y Prácticas en Sur Digital Labs Coyhaique',
    description: 'Únete al equipo de Sur Digital Labs en Coyhaique, Aysén. Buscamos practicantes en Frontend y Backend. Trabajo desafiante desde la Patagonia.',
    path: '/empleos',
    ogImage: '/og-empleos.jpg',
  });

  return (
    <div className="w-full bg-paper text-ink">
      <PageHero
        kicker="Empleos · Prácticas"
        title={<>Trabaja en tecnología <em className="italic text-petrol dark:text-aqua">sin irte de Aysén</em><span className="text-laguna">.</span></>}
        lede="Proyectos reales, supervisión senior y la oportunidad de crecer profesionalmente desde la Patagonia."
      >
        <Link to="/nosotros" className="link-rule text-sm font-semibold text-ink/80">Conoce al equipo →</Link>
      </PageHero>

      <section className="border-b border-ink/10">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <SectionHeading num="01" eyebrow="Posiciones abiertas" title={`${JOBS.length} oportunidades`} />
          <div className="mt-10 border-t border-ink/15">
            {JOBS.map((job, i) => (
              <button
                key={job.id}
                type="button"
                onClick={() => setSelected(job)}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` }}
                className="group w-full text-left grid sm:grid-cols-12 gap-3 sm:gap-8 items-center border-b border-ink/10 py-7 px-2 -mx-2 hover:bg-paper2/70 transition-colors duration-200"
              >
                <span className="sm:col-span-1 font-mono text-[11px] text-ink/40">{String(i + 1).padStart(2, '0')}</span>
                <span className="sm:col-span-6 font-display text-2xl sm:text-3xl text-ink group-hover:text-petrol dark:group-hover:text-aqua transition-colors">{job.title}</span>
                <span className="sm:col-span-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50">{job.area} · {job.lugar}</span>
                <span className="hidden sm:grid sm:col-span-1 justify-self-end h-10 w-10 place-items-center border border-ink/20 rounded-full text-ink/60 group-hover:bg-ink group-hover:text-paper group-hover:border-ink transition-all duration-200">→</span>
              </button>
            ))}
          </div>

          <div className="mt-14 border border-ink/15 bg-paper2/60 px-6 py-8 sm:px-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6" data-reveal>
            <div>
              <p className="font-display text-2xl text-ink">¿No encuentras tu posición?</p>
              <p className="mt-1 text-sm text-ink/60">Envíanos tu CV y te contactamos cuando haya una oportunidad que calce con tu perfil.</p>
            </div>
            <PrimaryButton to="/contacto">Enviar CV</PrimaryButton>
          </div>
        </div>
      </section>

      {selected && <JobDetail job={selected} onClose={close} />}
    </div>
  );
}
