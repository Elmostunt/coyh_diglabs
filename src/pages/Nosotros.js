// src/pages/Nosotros.js
import React from "react";
import { useSEO } from '../hooks/useSEO';
import { useReveal } from '../hooks/useReveal';
import { PageHero, SectionHeading, PrimaryButton, ClosingCta, EditorialFAQ, Eyebrow } from '../components/Editorial';

const PROYECTOS = [
  {
    titulo: "Plataforma de agentes con IA",
    desc: "Sistema multi-agente con LangChain y FastAPI para automatizar flujos de análisis que antes requerían intervención manual constante.",
    resultado: "El equipo del cliente lo opera solo — sin llamarnos.",
  },
  {
    titulo: "Infraestructura de datos en la nube",
    desc: "Migración de una base de datos manual a un stack cloud con Terraform y BigQuery. Sin interrupciones, con documentación completa.",
    resultado: "Infraestructura reproducible que el cliente puede auditar y evolucionar.",
  },
  {
    titulo: "Sistema de gestión operativa",
    desc: "Aplicación web para reemplazar hojas de cálculo en la planificación de operaciones de campo.",
    resultado: "De Excel a una app propia. Menos errores, más visibilidad.",
  },
];

const PROCESO = [
  { paso: "01", titulo: "Entendemos tu caso", desc: "Antes de proponer nada, escuchamos. Queremos entender el problema real, no el síntoma." },
  { paso: "02", titulo: "Definimos juntos el alcance", desc: "Qué se hace, en cuánto tiempo, con qué tecnología y por qué. Sin sorpresas después." },
  { paso: "03", titulo: "Construimos con criterio", desc: "Desarrollo iterativo. Te mostramos avances reales, no solo el resultado al final." },
  { paso: "04", titulo: "Entregamos y explicamos", desc: "Documentación, traspaso real y soporte en la puesta en marcha. Que funcione de verdad." },
  { paso: "05", titulo: "Seguimos contigo", desc: "Si el negocio cambia, el sistema puede cambiar. Estamos disponibles cuando nos necesitas." },
];

const VALORES = [
  { titulo: "Criterio", desc: "Aplicamos tecnología donde realmente tiene sentido — no porque esté de moda." },
  { titulo: "Calidad", desc: "Cada entrega cumple un estándar profesional. Sin atajos." },
  { titulo: "Comunidad", desc: "Somos de aquí. Apostamos por el crecimiento tecnológico de la Patagonia." },
];

const FAQ_NOSOTROS = [
  { q: "¿Dónde están ubicados? ¿Solo trabajan en Coyhaique?", a: "Nuestra base está en Coyhaique, Región de Aysén, pero trabajamos de forma remota con empresas de todo Chile." },
  { q: "¿Con quién voy a hablar?", a: "Directamente con quien diseña y construye la solución. Cada proyecto lo lleva una persona senior de principio a fin — no pasa por cinco manos antes de llegar a ti." },
  { q: "¿Qué pasa si necesito soporte después de la entrega?", a: "Ofrecemos soporte y mantenimiento continuo, desde acompañamiento técnico hasta evoluciones del sistema." },
  { q: "¿Cuál es la metodología de trabajo?", a: "Desarrollo iterativo con entregas funcionales cada 1–2 semanas. Entendemos primero, definimos juntos el alcance, construimos con criterio y entregamos con documentación." },
];

export default function Nosotros() {
  useReveal();
  useSEO({
    title: 'Sobre Sur Digital Labs | Consultora Tecnológica en Coyhaique',
    description: 'Somos Sur Digital Labs: consultora tecnológica en Coyhaique, Aysén. Experiencia empresarial en software, datos y cloud, con cercanía local.',
    path: '/nosotros',
    ogImage: '/og-nosotros.jpg',
    faqs: FAQ_NOSOTROS,
  });

  return (
    <div className="w-full bg-paper text-ink">
      <PageHero
        kicker="Nosotros · Coyhaique, Aysén"
        title={<>Son de Aysén, entienden tecnología <em className="italic text-petrol dark:text-aqua">de verdad</em><span className="text-laguna">.</span></>}
        lede="Una consultora tecnológica boutique en Coyhaique. Experiencia en arquitectura de sistemas de grandes organizaciones, aplicada al tamaño y ritmo de las empresas de la región. Sin intermediarios: hablas directo con quien resuelve."
        aside={
          <div>
            <div className="duotone border border-ink/20 aspect-[4/3]" style={{ "--duo": "#0d3b66" }}>
              <img src="/coyhaique.jpg" alt="Coyhaique, Región de Aysén" />
            </div>
            <div className="border-x border-b border-ink/20 bg-paper2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
              Fig. 03 — Donde trabajamos
            </div>
          </div>
        }
      >
        <PrimaryButton to="/contacto">Conversemos sobre tu proyecto</PrimaryButton>
      </PageHero>

      {/* ── 01 · Quién está detrás ── */}
      <section className="border-b border-ink/10">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-20 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4" data-reveal>
            <div className="border border-ink/20 aspect-[4/5] overflow-hidden bg-paper2">
              <img
                src="https://storage.googleapis.com/surdigilabs_images/nosotros/guillermo.png"
                alt="Guillermo Cárcamo, fundador de Sur Digital Labs"
                loading="lazy"
                className="w-full h-full object-cover grayscale-[35%]"
                onError={(e) => { e.target.src = '/logo_chico.jpg'; }}
              />
            </div>
            <div className="border-x border-b border-ink/20 px-4 py-3">
              <p className="font-display text-lg text-ink">Guillermo Cárcamo Díaz</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50 mt-0.5">Fundador</p>
            </div>
          </div>
          <div className="lg:col-span-8" data-reveal style={{ "--reveal-delay": "100ms" }}>
            <Eyebrow num="01">Quién está detrás</Eyebrow>
            <h2 className="mt-5 font-display font-medium text-4xl sm:text-5xl tracking-tight leading-[1.05]">
              Experiencia empresarial, cercanía local.
            </h2>
            <p className="mt-6 font-display italic text-2xl sm:text-3xl text-ink/85 leading-snug">
              "Una empresa pequeña de Aysén no necesita contratar una gran consultora para resolver un problema tecnológico. Necesita a alguien que entienda su negocio — y que esté cerca."
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-x-10 border-t border-ink/15">
              {[
                ["Arquitectura de soluciones", "Diseño de sistemas en organizaciones grandes, aplicado a problemas concretos de empresas pequeñas y medianas."],
                ["Datos e ingeniería de datos", "Pipelines, modelos de datos y BI: convertir información dispersa en decisiones."],
                ["Cloud", "Experiencia en Google Cloud y AWS para construir sistemas seguros y que escalan."],
                ["Formación continua", "Cursando un Magíster en Informática. La tecnología cambia; nosotros también."],
              ].map(([t, d]) => (
                <div key={t} className="border-b border-ink/10 py-5">
                  <h3 className="font-display text-lg text-ink">{t}</h3>
                  <p className="mt-1 text-sm text-ink/60 leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-ink/50">
              Y sí: Memo, nuestro Chief Happiness Officer, está en cada reunión.
            </p>
          </div>
        </div>
      </section>

      {/* ── 02 · Proyectos ── */}
      <section className="border-b border-ink/10 bg-paper2/50">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <SectionHeading num="02" eyebrow="Trabajo" title="Proyectos representativos" intro="Casos reales, descritos de forma anonimizada." />
          <div className="mt-10 border-t border-ink/15">
            {PROYECTOS.map((p, i) => (
              <article key={p.titulo} className="grid md:grid-cols-12 gap-4 md:gap-8 border-b border-ink/10 py-8" data-reveal style={{ "--reveal-delay": `${i * 70}ms` }}>
                <span className="md:col-span-1 font-display italic text-4xl text-ember/70 leading-none">{String(i + 1).padStart(2, '0')}</span>
                <div className="md:col-span-6">
                  <h3 className="font-display text-2xl text-ink leading-snug">{p.titulo}</h3>
                  <p className="mt-2 text-[15px] text-ink/60 leading-relaxed">{p.desc}</p>
                </div>
                <div className="md:col-span-5 md:border-l md:border-ink/10 md:pl-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-laguna mb-2">Resultado</p>
                  <p className="font-display italic text-lg text-ink/85 leading-snug">{p.resultado}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 · Proceso ── */}
      <section className="border-b border-ink/10">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <SectionHeading num="03" eyebrow="El proceso" title="Cómo trabajamos" intro="Un proceso claro desde el primer contacto." />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-10">
            {PROCESO.map((item, i) => (
              <div key={item.paso} className="border-t-2 border-ink pt-5" data-reveal style={{ "--reveal-delay": `${i * 70}ms` }}>
                <span className="font-display italic text-4xl text-ember/80 leading-none select-none">{item.paso}</span>
                <h3 className="mt-3 font-semibold text-ink">{item.titulo}</h3>
                <p className="mt-1.5 text-sm text-ink/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 · Talento regional ── */}
      <section className="border-b border-ink/10 bg-azulOscuro text-bone">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-20 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7" data-reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-turquesaVibrante">04 · Talento regional</p>
            <h2 className="mt-5 font-display italic font-medium text-4xl sm:text-5xl leading-[1.05]">Apostamos por el talento de aquí.</h2>
            <p className="mt-5 text-bone/75 leading-relaxed max-w-xl">
              Trabajamos con estudiantes y profesionales en formación de la región, siempre con supervisión senior. El resultado final cumple estándar profesional — eso no se negocia.
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-3 border-t border-bone/20" data-reveal>
            {VALORES.map((v) => (
              <div key={v.titulo} className="pt-4 pr-3">
                <p className="font-display text-xl">{v.titulo}</p>
                <p className="mt-1 text-[12px] text-bone/60 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EditorialFAQ num="05" items={FAQ_NOSOTROS} />
      <ClosingCta />
    </div>
  );
}

