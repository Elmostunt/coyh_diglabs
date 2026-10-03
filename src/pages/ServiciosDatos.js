// src/pages/ServiciosDatos.js — Datos, dashboards y BI
import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { useReveal } from '../hooks/useReveal';
import {
  PageHero, SectionHeading, PrimaryButton, ClosingCta, EditorialFAQ, PackGrid, waLink, CALENDLY_URL,
} from '../components/Editorial';

const PREGUNTAS = [
  '¿Tienes información repartida entre Excel, sistemas y plataformas?',
  '¿Te cuesta saber qué está pasando realmente en tu negocio?',
  '¿Alguien pierde horas cada semana armando el mismo reporte?',
  '¿Los números cambian según quién arme la planilla?',
];

const PACKS = [
  {
    badge: 'Datos para tu negocio',
    popular: true,
    titulo: 'Dashboard de tu empresa',
    ideal: 'Para empresas que quieren entender sus números sin abrir diez planillas.',
    items: ['Integración de Excel, CSV y sistemas', 'Modelo de datos simple', 'Dashboard en la nube', 'Indicadores clave del negocio'],
    resultado: 'Ver el negocio de un vistazo.',
    tiempo: '21–30 días',
    wa: waLink('Hola! Quiero un dashboard para entender los números de mi empresa. ¿Conversamos?'),
  },
  {
    badge: 'Reportes automáticos',
    titulo: 'Reportes que se arman solos',
    ideal: 'Para equipos que pierden horas copiando datos entre archivos.',
    items: ['Conexión a tus fuentes de datos', 'Reportes programados', 'Envío por correo o enlace', 'Alertas cuando algo se sale de rango'],
    resultado: 'Horas de vuelta cada semana.',
    tiempo: '14–21 días',
    wa: waLink('Hola! Quiero automatizar los reportes de mi empresa. ¿Conversamos?'),
  },
];

const CAPACIDADES = [
  { titulo: 'Dashboards e indicadores', desc: 'Visualizaciones que el equipo realmente usa: pocas métricas, bien elegidas, siempre actualizadas.' },
  { titulo: 'Integración de datos', desc: 'Excel, bases de datos, APIs y sistemas legados reunidos en un solo lugar confiable.' },
  { titulo: 'Pipelines y automatización', desc: 'Flujos que extraen, limpian y cargan los datos sin intervención manual.' },
  { titulo: 'Modelos de datos', desc: 'Estructuramos tu información para que responder preguntas del negocio sea simple.' },
  { titulo: 'Análisis e IA aplicada', desc: 'Modelos predictivos y análisis avanzado cuando hay un caso real que lo justifique — no por moda.' },
  { titulo: 'Asesoría y formación', desc: 'Te ayudamos a definir qué medir y capacitamos a tu equipo para trabajar con datos.' },
];

const STACK = ['Python', 'BigQuery', 'Looker Studio', 'Power BI', 'PostgreSQL', 'Google Cloud', 'AWS', 'pandas'];

const FAQ_DATOS = [
  { q: '¿Necesito saber de datos para usar un dashboard?', a: 'No. Los diseñamos para dueños y equipos sin formación técnica: las métricas se entienden de un vistazo.' },
  { q: 'Mi información está en Excel. ¿Sirve?', a: 'Sí, es el punto de partida más común. Integramos tus planillas y, si conviene, te ayudamos a migrar a algo más ordenado.' },
  { q: '¿Cuánto cuesta mantenerlo?', a: 'Para una PYME, la infraestructura en la nube suele ser de bajo costo mensual. Te lo estimamos antes de partir y diseñamos pensando en optimizarlo.' },
  { q: '¿Pueden conectar varios sistemas?', a: 'Sí, es exactamente lo que hacemos: reunimos datos de distintas fuentes en un solo lugar para ver el negocio completo.' },
];

export default function ServiciosDatos() {
  useReveal();
  useSEO({
    title: 'Datos, Dashboards y BI para Empresas | Sur Digital Labs',
    description: 'Dashboards, reportes automáticos e integración de datos para PYMEs de Aysén y Chile. Deja de depender de Excel y toma decisiones con datos claros.',
    path: '/datos',
    ogImage: '/og-datos.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Datos, Dashboards y Business Intelligence',
      description: 'Dashboards, reportes automáticos e integración de datos para empresas de Aysén y Chile.',
      provider: { '@type': 'Organization', name: 'Sur Digital Labs', url: 'https://www.surdigitallabs.cl' },
      areaServed: [{ '@type': 'AdministrativeArea', name: 'Región de Aysén' }, { '@type': 'Country', name: 'Chile' }],
      serviceType: 'Business Intelligence',
      url: 'https://www.surdigitallabs.cl/datos',
    },
    faqs: FAQ_DATOS,
  });

  return (
    <div className="w-full bg-paper text-ink">
      <PageHero
        kicker="Datos & Business Intelligence"
        title={<>Deja de adivinar.<br /><em className="italic text-petrol dark:text-aqua">Empieza a medir</em><span className="text-laguna">.</span></>}
        lede="Convertimos la información repartida entre planillas y sistemas en dashboards y reportes que te dicen qué está pasando en tu negocio."
        aside={
          <div className="border border-ink/20 bg-paper p-5" aria-hidden="true">
            <div className="flex items-baseline justify-between border-b border-ink/10 pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50">Fig. 02 — Ventas mensuales</span>
              <span className="font-mono text-[10px] text-laguna">● en vivo</span>
            </div>
            <div className="mt-5 flex items-end gap-1.5 h-32">
              {[34, 42, 38, 55, 49, 61, 58, 70, 64, 78, 72, 92].map((h, i) => (
                <div key={i} className={`flex-1 ${i === 11 ? 'bg-ember' : i > 8 ? 'bg-laguna' : 'bg-ink/15'}`} style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 border-t border-ink/10 pt-3">
              {[['+23%', 'vs año anterior'], ['4', 'fuentes unidas'], ['0', 'planillas manuales']].map(([k, l]) => (
                <div key={l}>
                  <p className="font-display text-2xl text-ink">{k}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/45">{l}</p>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <PrimaryButton to="/contacto">Conversemos sobre tus datos</PrimaryButton>
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="link-rule text-sm font-semibold text-ink/80">Agenda 30 minutos ↗</a>
      </PageHero>

      {/* ── 01 · ¿Te suena? ── */}
      <section className="border-b border-ink/10">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <SectionHeading num="01" eyebrow="Diagnóstico" title="¿Te suena familiar?" />
          <div className="mt-10 grid md:grid-cols-2 gap-x-12 border-t border-ink/15" data-reveal>
            {PREGUNTAS.map((p) => (
              <p key={p} className="border-b border-ink/10 py-5 font-display text-xl sm:text-2xl text-ink/85 leading-snug">{p}</p>
            ))}
          </div>
          <p className="mt-8 max-w-xl text-ink/65 leading-relaxed" data-reveal>
            Si respondiste que sí a alguna, no necesitas un equipo de datos: necesitas tus datos ordenados en un solo lugar. Eso es lo que hacemos.
          </p>
        </div>
      </section>

      {/* ── 02 · Ofertas ── */}
      <section className="border-b border-ink/10 bg-paper2/50">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <SectionHeading num="02" eyebrow="Puntos de partida" title="Datos para tu negocio" intro="Dos formas concretas de empezar. Resultados visibles en semanas, no en meses." />
          <div className="mt-12"><PackGrid packs={PACKS} /></div>
        </div>
      </section>

      {/* ── 03 · Capacidades ── */}
      <section className="border-b border-ink/10">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <SectionHeading num="03" eyebrow="Capacidades" title="Cómo lo hacemos" />
          <div className="mt-10 grid md:grid-cols-2 gap-x-12 border-t border-ink/15" data-reveal>
            {CAPACIDADES.map((c, i) => (
              <div key={c.titulo} className="flex gap-5 border-b border-ink/10 py-6">
                <span className="font-display italic text-3xl text-ember/70 leading-none w-10 shrink-0">{String.fromCharCode(65 + i)}</span>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl text-ink">{c.titulo}</h3>
                  <p className="mt-1.5 text-sm text-ink/60 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2" data-reveal>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">Herramientas</span>
            {STACK.map((s) => (
              <span key={s} className="font-display italic text-lg text-ink/60">{s}</span>
            ))}
          </div>
        </div>
      </section>

      <EditorialFAQ num="04" items={FAQ_DATOS} />
      <ClosingCta title="Ordenemos tus datos" waMessage="Hola! Quisiera consultar sobre dashboards y datos para mi empresa." />
    </div>
  );
}
