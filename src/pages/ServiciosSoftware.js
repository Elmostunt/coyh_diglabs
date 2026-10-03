// src/pages/ServiciosSoftware.js — Software, web, automatización y cloud
import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { useReveal } from '../hooks/useReveal';
import {
  PageHero, SectionHeading, PrimaryButton, ClosingCta, EditorialFAQ, PackGrid, waLink, CALENDLY_URL,
} from '../components/Editorial';

const PACKS = [
  {
    badge: 'Presencia digital',
    popular: true,
    titulo: 'Web profesional para tu PYME',
    ideal: 'Para empresas que necesitan comenzar o renovar su presencia digital.',
    items: ['Sitio web de 5–7 secciones', 'Diseño responsive', 'Dominio e integración de contacto', 'WhatsApp + formulario', 'SEO básico y analytics'],
    resultado: 'Una web que genera contactos.',
    tiempo: '7–14 días',
    wa: waLink('Hola! Quiero cotizar una web profesional para mi empresa. ¿Me pueden ayudar?'),
  },
  {
    badge: 'Automatización',
    titulo: 'Menos tareas manuales',
    ideal: 'Para empresas que pierden horas en tareas que debería hacer un sistema.',
    items: ['Levantamiento del proceso', 'Formularios digitales', 'Reportes y notificaciones automáticas', 'Integración entre sistemas'],
    resultado: 'Menos tareas manuales, más orden.',
    tiempo: '14–21 días',
    wa: waLink('Hola! Quiero automatizar un proceso de mi empresa. ¿Conversamos?'),
  },
  {
    badge: 'Sistema a medida',
    titulo: 'Tu propia aplicación',
    ideal: 'Para empresas que necesitan una herramienta hecha sobre su forma de trabajar.',
    items: ['Portales y sistemas de gestión', 'Reservas, inventario u operaciones', 'Plataforma interna con usuarios', 'Documentación y traspaso'],
    resultado: 'Una herramienta que se adapta a ti.',
    tiempo: 'Según alcance',
    wa: waLink('Hola! Necesito un sistema a medida para mi empresa. ¿Conversamos?'),
  },
  {
    badge: 'Acompañamiento',
    titulo: 'Tu área TI, sin contratarla',
    ideal: 'Para empresas que quieren alguien de confianza para sus decisiones tecnológicas.',
    items: ['Soporte mensual', 'Revisión de sistemas y proveedores', 'Asesoría de arquitectura', 'Mejoras continuas'],
    resultado: 'Tranquilidad y orden tecnológico.',
    tiempo: 'Servicio mensual',
    wa: waLink('Hola! Me interesa el acompañamiento tecnológico mensual. ¿Conversamos?'),
  },
];

const CAPACIDADES = [
  { titulo: 'Desarrollo web', desc: 'Sitios corporativos, landing pages, sitios turísticos, catálogos y portales. No solo una página bonita: una herramienta para tu negocio.' },
  { titulo: 'Software y aplicaciones', desc: 'Sistemas internos, plataformas web y aplicaciones empresariales construidas sobre tu proceso real, con documentación.' },
  { titulo: 'Automatización', desc: 'Reportes que se arman solos, formularios digitales, notificaciones y procesamiento de información sin copiar y pegar.' },
  { titulo: 'Integraciones y APIs', desc: 'Conectamos tus sistemas para que hablen entre sí. Menos doble digitación, menos errores.' },
  { titulo: 'Cloud y arquitectura', desc: 'Infraestructura en Google Cloud o AWS, segura y escalable. Te explicamos el beneficio, no solo la tecnología.' },
  { titulo: 'Seguridad', desc: 'Buenas prácticas desde el diseño: datos sensibles protegidos, accesos controlados y sistemas actualizados.' },
];

const FAQ_ITEMS = [
  { q: '¿Cuánto cuesta un proyecto?', a: 'Depende del alcance. Un sitio corporativo parte desde aproximadamente US$2.000; un sistema a medida depende de lo que necesites resolver. Te damos una cotización clara después de una conversación de 30 minutos, sin costo.' },
  { q: '¿Cuánto demora?', a: 'Una web profesional se entrega en 7–14 días. Las automatizaciones toman 14–21 días. Un sistema a medida se planifica por etapas, con avances visibles cada 1–2 semanas.' },
  { q: 'No sé qué tecnología necesito. ¿Igual puedo consultar?', a: 'Sí, de hecho es lo más común. Cuéntanos el problema del negocio; nosotros te proponemos la solución más simple que lo resuelva.' },
  { q: '¿Puedo hacer cambios después de la entrega?', a: 'Sí. Incluimos un período de ajustes post-entrega, y si quieres acompañamiento continuo existe el servicio mensual.' },
  { q: '¿Trabajan solo en Aysén?', a: 'Nuestra base está en Coyhaique, pero trabajamos de forma remota con empresas de todo Chile.' },
];

export default function ServiciosSoftware() {
  useReveal();
  useSEO({
    title: 'Desarrollo Web y Software a Medida en Aysén | Sur Digital Labs',
    description: 'Sitios web, sistemas a medida, automatización e integraciones para empresas de Aysén y todo Chile. Primera entrega en 7–14 días. Desde Coyhaique.',
    path: '/software',
    ogImage: '/og-software.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Desarrollo Web y Software a Medida',
      description: 'Sitios web, sistemas a medida, automatización e integraciones para empresas de Aysén y Chile.',
      provider: { '@type': 'Organization', name: 'Sur Digital Labs', url: 'https://www.surdigitallabs.cl' },
      areaServed: [{ '@type': 'AdministrativeArea', name: 'Región de Aysén' }, { '@type': 'Country', name: 'Chile' }],
      serviceType: 'Software Development',
      url: 'https://www.surdigitallabs.cl/software',
    },
    faqs: FAQ_ITEMS,
  });

  return (
    <div className="w-full bg-paper text-ink">
      <PageHero
        kicker="Software & Desarrollo"
        title={<>Tecnología que se adapta a <em className="italic text-petrol dark:text-aqua">tu negocio</em>, no al revés<span className="text-laguna">.</span></>}
        lede="Sitios web, sistemas propios y automatizaciones hechas sobre tu forma real de trabajar. Con plazos claros, documentación y sin dependencias artificiales."
        aside={
          <div className="border border-ink/20 bg-paper2/60">
            {[
              ['7–14 días', 'primera entrega funcional'],
              ['1–2 semanas', 'entre avances visibles'],
              ['100%', 'del código y los datos son tuyos'],
            ].map(([kpi, label]) => (
              <div key={label} className="flex items-baseline justify-between gap-4 border-b border-ink/10 last:border-0 px-5 py-4">
                <span className="font-display text-3xl text-ink">{kpi}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50 text-right">{label}</span>
              </div>
            ))}
          </div>
        }
      >
        <PrimaryButton to="/contacto">Conversemos sobre tu proyecto</PrimaryButton>
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="link-rule text-sm font-semibold text-ink/80">Agenda 30 minutos ↗</a>
      </PageHero>

      {/* ── 01 · Ofertas ── */}
      <section className="border-b border-ink/10 bg-paper2/50">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <SectionHeading
            num="01"
            eyebrow="Puntos de partida"
            title="¿Por dónde empezar?"
            intro="No todo tiene que ser un proyecto enorme. Estas son las formas más comunes de partir — si tu caso es otro, lo conversamos."
          />
          <div className="mt-12"><PackGrid packs={PACKS} /></div>
        </div>
      </section>

      {/* ── 02 · Capacidades ── */}
      <section className="border-b border-ink/10">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <SectionHeading num="02" eyebrow="Capacidades" title="Lo que construimos" />
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
        </div>
      </section>

      {/* ── 03 · Producto propio ── */}
      <section className="border-b border-ink/10">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4" data-reveal>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember shrink-0">Producto</span>
              <p className="text-ink/75">
                <span className="font-display text-xl text-ink">SDLabCar</span> — sistema de arriendo de vehículos adaptable al proceso de cada empresa.
              </p>
            </div>
            <a href={waLink('Hola! Quiero información sobre SDLabCar (sistema de rentacar).')} target="_blank" rel="noopener noreferrer" className="link-rule text-sm font-semibold text-ink/80 shrink-0">
              Más información ↗
            </a>
          </div>
        </div>
      </section>

      <EditorialFAQ num="04" items={FAQ_ITEMS} />
      <ClosingCta waMessage="Hola! Quisiera consultar sobre desarrollo web y software a medida para mi empresa." />
    </div>
  );
}
