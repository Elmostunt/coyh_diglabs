import React from 'react';
import { useSEO } from '../hooks/useSEO';

const BLOG_POSTS = [
  {
    id: 'migracion-excel-sistema',
    titulo: 'Migrar de Excel a un Sistema Real en 30 Días',
    resumen: 'Una guía práctica para reemplazar hojas de cálculo con una aplicación que el equipo puede operar sin intermediarios.',
    contenido: `Las hojas de cálculo son herramientas valiosas, pero llegan a un punto donde se convierten en un cuello de botella:

- Errores de entrada manual
- Versiones desactualizadas circulando
- Imposible controlar quién cambió qué
- No escala para múltiples usuarios simultáneos

**¿Cuál es el verdadero costo de mantener Excel?**

Cada persona que dedica 2 horas semanales a tareas manuales son ~100 horas anuales. A un salario de $25/hora, eso es $2,500 al año, solo en una persona.

**Un sistema real resuelve esto:**

1. Entrada de datos única y validada
2. Histórico de cambios automático
3. Múltiples usuarios sin conflictos
4. Reportes en tiempo real
5. Integraciones con otros sistemas

**Nuestro proceso:**

- Semana 1-2: Mapeo del proceso actual y diseño de la solución
- Semana 2-3: Desarrollo del backend y frontend funcional
- Semana 3-4: Testing, documentación y capacitación

Hemos migrado más de 15 empresas de Excel a sistemas personalizados. El ROI típicamente se recupera en 3-6 meses.

**Comienza hoy:** [Ver servicios de Automatización](/software)`,
    autor: 'Guillermo Cárcamo',
    fecha: '2026-06-01',
    categoria: 'Automatización',
    video: 'https://www.youtube.com/watch?v=ejemplo1',
    videoTitulo: 'Ver: Automatización de Flujos de Datos en Excel'
  },
  {
    id: 'software-medida-vs-template',
    titulo: 'Software a Medida vs Template: ¿Por Qué Cuesta Más?',
    resumen: 'Explicación honesta sobre por qué un sistema personalizado tiene un precio diferente a un template genérico.',
    contenido: `La pregunta es válida: "¿Por qué un software a medida cuesta el triple que un template de Shopify?"

**La respuesta corta:** Porque están siendo cosas completamente diferentes.

**Template:**
- Solución lista para usar
- Sin customización
- Funciona para 80% de los casos
- Pero los casos especiales requieren trucos o plugins costosos
- Proveedor controla los datos

**Software a Medida:**
- Construido para tu proceso específico
- Escalable conforme creces
- Datos completamente tuyos
- Sin sorpresas de pricing futuro
- Mantenible y documentado

**Un ejemplo real:**

Una tienda online típica necesita:
- Catálogo de productos
- Carrito de compras
- Pagos en línea
- Reportes de ventas

Un template cubre todo esto. Pero si además necesitas:
- Integración con tu proveedor de inventario
- Generar facturas electrónicas automáticamente
- Análisis predictivo de demanda
- Sistema de comisiones para vendedores
- Punto de venta en tienda física

...cada una de esas cosas requiere plugins adicionales, personalizaciones complejas, o simplemente "no es posible".

Con software a medida, todo eso es posible porque está diseñado para tu negocio específico.

**¿Cuál elegir?**

- **Template:** Si tu proceso es estándar y no cambias
- **Medida:** Si tu negocio es único o quieres diferenciarte

Muchas empresas comienzan con template y después necesitan migrar a medida cuando crecen. Es más caro que hacerlo bien desde el inicio.

**Hablemos de tu caso:** [Contactanos](/contacto)`,
    autor: 'Guillermo Cárcamo',
    fecha: '2026-05-28',
    categoria: 'Software',
    video: 'https://www.youtube.com/@guillermocarcamo8219',
    videoTitulo: 'Ver mi canal de YouTube'
  },
  {
    id: 'pipelines-datos-basicos',
    titulo: 'Primeros Pasos en Data Engineering: Pipelines que Funcionan',
    resumen: 'Una introducción práctica a construir pipelines de datos confiables sin usar herramientas complejas.',
    contenido: `Cuando hablamos de "data engineering", muchas empresas piensan que necesitan Apache Spark, Kafka y un equipo de 5 personas.

En la realidad, 80% de los casos se resuelven con Python + un scheduler + una base de datos.

**¿Qué es un pipeline de datos?**

Un flujo automatizado que:
1. Extrae datos de una fuente (API, BD, CSV)
2. Los transforma (limpia, valida, enriquece)
3. Los carga en un destino (DW, BI, caché)

Todo sin intervención manual.

**Componentes básicos:**

**Extracción (E):**
\`\`\`python
import requests
respuesta = requests.get('https://api.ejemplo.com/datos')
datos = respuesta.json()
\`\`\`

**Transformación (T):**
\`\`\`python
datos_limpios = [d for d in datos if d['estado'] == 'activo']
datos_procesados = [{'id': d['id'], 'monto': float(d['monto'])} for d in datos_limpios]
\`\`\`

**Carga (L):**
\`\`\`python
from sqlalchemy import create_engine
engine = create_engine('postgresql://...')
df.to_sql('ventas', engine, if_exists='append')
\`\`\`

**Scheduler:**

Usa cron o Airflow para ejecutar esto cada día:

\`\`\`bash
0 2 * * * python /app/pipeline.py
\`\`\`

**Errores comunes:**

- No validar datos en la transformación (garbage in = garbage out)
- No trackear versiones del pipeline
- No loguear qué falló
- Correr todo en producción sin testing

**Empezar con confianza:**

1. Escribe tu pipeline localmente
2. Testea con datos de prueba
3. Deploy a un scheduler
4. Monitorea logs y alertas
5. Itera rápido cuando hay cambios

**Resultado esperado:**

Datos confiables, actualizados automáticamente, listos para análisis.

**Caso real:** Migrar ventas de 5 sistemas manuales a un dashboard único = decisiones 10x más rápidas.

**Aprende más:** [Ver servicios de Datos](/datos)`,
    autor: 'Guillermo Cárcamo',
    fecha: '2026-05-20',
    categoria: 'Datos & IA',
    video: 'https://www.youtube.com/@guillermocarcamo8219',
    videoTitulo: 'Ver tutoriales en mi canal'
  }
];

export default function Blog() {
  useSEO({
    title: 'Blog de Tecnología y Software | Sur Digital Labs',
    description: 'Artículos prácticos sobre software, datos y automatización para empresas en Chile. Guías reales desde el equipo de Sur Digital Labs.',
    path: '/blog',
    ogImage: '/og-home.jpg',
  });

  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section className="bg-white dark:bg-slate-900 py-16 sm:py-20 border-b border-slate-100 dark:border-slate-700">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-blue-600 inline-block" />
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Blog</span>
          </div>
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white leading-tight tracking-tight">
              Artículos sobre software, datos y automatización
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Guías prácticas, casos reales y aprendizajes de 8+ años construyendo sistemas en Patagonia.
            </p>
          </div>
        </div>
      </section>

      {/* ── ARTÍCULOS ── */}
      <section className="bg-slate-50 dark:bg-slate-800 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="space-y-6">
            {BLOG_POSTS.map((post) => (
              <article key={post.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="p-6 sm:p-8">

                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white mb-2">
                        {post.titulo}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {post.resumen}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
                      {post.categoria}
                    </span>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 mb-6 text-sm text-slate-500 dark:text-slate-400">
                    <span>{post.autor}</span>
                    <span>•</span>
                    <time>{new Date(post.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  </div>

                  {/* Contenido */}
                  <div className="prose dark:prose-invert prose-sm sm:prose-base max-w-none mb-6">
                    {post.contenido.split('\n\n').map((parrafo, i) => {
                      if (parrafo.startsWith('**') || parrafo.startsWith('#') || parrafo.startsWith('-')) {
                        return parrafo.startsWith('-') ? (
                          <ul key={i} className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                            {parrafo.split('\n').map((item, j) => (
                              <li key={j} className="ml-2">{item.replace(/^-\s/, '')}</li>
                            ))}
                          </ul>
                        ) : (
                          <p key={i} className="font-semibold text-slate-900 dark:text-white">
                            {parrafo.replace(/\*\*/g, '')}
                          </p>
                        );
                      }
                      if (parrafo.startsWith('```')) {
                        const codigo = parrafo.split('\n').slice(1, -1).join('\n');
                        return (
                          <pre key={i} className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto mb-4">
                            <code className="text-sm">{codigo}</code>
                          </pre>
                        );
                      }
                      return <p key={i} className="text-slate-600 dark:text-slate-300 leading-relaxed">{parrafo}</p>;
                    })}
                  </div>

                  {/* Video CTA */}
                  {post.video && (
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {post.videoTitulo}
                        </span>
                      </div>
                      <a
                        href={post.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors duration-200"
                      >
                        Ver video
                      </a>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* CTA de YouTube */}
          <div className="mt-12 bg-slate-950 rounded-2xl sm:rounded-3xl px-8 py-12 sm:px-12 sm:py-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Más contenido en YouTube
            </h2>
            <p className="text-slate-300 mb-8">
              Tutoriales, guías de desarrollo y casos reales en mi canal
            </p>
            <a
              href="https://www.youtube.com/@guillermocarcamo8219"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white hover:bg-red-700 transition-colors duration-200"
            >
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Ir a YouTube
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
