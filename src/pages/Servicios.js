import React, { useState } from 'react';

const Servicios = () => {
  // Lista de servicios agrupados por categoría
  const servicios = [
    // Desarrollo Web
    { id: 1, nombre: 'Desarrollo Web Fullstack', descripcion: 'Creación de aplicaciones web personalizadas con tecnologías modernas como React, Node.js y bases de datos SQL/NoSQL.', precio: "", imagen_url: '/webdev.jpg', categoria: 'Desarrollo Web' },
    { id: 2, nombre: 'Desarrollo de Aplicaciones Móviles', descripcion: 'Creación de apps en React Native o Flutter para Android y iOS.', precio: "", imagen_url: '/movil.jpg', categoria: 'Desarrollo Web' },
    { id: 3, nombre: 'Desarrollo de E-commerce', descripcion: 'Implementación de tiendas online con Shopify, WooCommerce o desarrollo personalizado.', precio: "", imagen_url: '/ecommerce.jpg', categoria: 'Desarrollo Web' },
    { id: 4, nombre: 'Desarrollo de APIs REST y GraphQL', descripcion: 'Implementación de servicios backend escalables y seguros para integración con aplicaciones móviles y web.', precio: "", imagen_url: '/apis.jpg', categoria: 'Desarrollo Web' },
    { id: 5, nombre: 'Optimización de Sitios Web', descripcion: 'Mejora de velocidad y rendimiento de sitios web mediante optimización de código, imágenes y caché.', precio: "", imagen_url: '/web_optimization.jpg', categoria: 'Desarrollo Web' },
    { id: 6, nombre: 'Migración de Sitios Web', descripcion: 'Traslado de sitios web entre servidores o plataformas sin pérdida de datos.', precio: "", imagen_url: '/web_migration.jpg', categoria: 'Desarrollo Web' },

    // Bases de Datos y Ciencia de Datos
    { id: 7, nombre: 'Optimización de Bases de Datos', descripcion: 'Mejora del rendimiento y estructuración de bases de datos relacionales y no relacionales.', precio: "", imagen_url: '/db_optimization.jpg', categoria: 'Datos' },
    { id: 8, nombre: 'Análisis y Visualización de Datos', descripcion: 'Generación de dashboards interactivos y reportes en Power BI, Tableau y Python.', precio: "", imagen_url: '/data_viz.jpg', categoria: 'Datos' },
    { id: 9, nombre: 'Consultoría en Ciencia de Datos', descripcion: 'Asesoramiento para la implementación de soluciones basadas en datos.', precio: "", imagen_url: '/cienciadatos_consultoria.jpg', categoria: 'Datos' },
    { id: 10, nombre: 'Big Data e Ingesta de Datos', descripcion: 'Procesamiento de grandes volúmenes de datos en plataformas como BigQuery, Dataflow y Apache Beam.', precio: "", imagen_url: '/bigdata.jpg', categoria: 'Datos' },
    { id: 11, nombre: 'Machine Learning y AI', descripcion: 'Entrenamiento y despliegue de modelos de inteligencia artificial para predicciones y automatización.', precio: "", imagen_url: '/ml_ai.jpg', categoria: 'Datos' },

    // Infraestructura y Cloud
    { id: 12, nombre: 'Despliegue en la Nube', descripcion: 'Configuración y administración de servidores en AWS, GCP y Azure.', precio: "", imagen_url: '/cloud_native.jpg', categoria: 'Cloud' },
    { id: 13, nombre: 'DevOps e Infraestructura como Código', descripcion: 'Automatización de despliegues con Terraform, Kubernetes y CI/CD.', precio: "", imagen_url: '/devops.jpg', categoria: 'Cloud' },
    { id: 14, nombre: 'Monitorización y Alertas en Cloud', descripcion: 'Configuración de alertas y monitoreo en Cloud Monitoring, Prometheus y Grafana.', precio: "", imagen_url: '/alerts.jpg', categoria: 'Cloud' },
    { id: 15, nombre: 'Administración y Mantenimiento de Servidores', descripcion: 'Manejo de servidores Linux y Windows para garantizar estabilidad y seguridad.', precio: "", imagen_url: '/server_adm.jpg', categoria: 'Cloud' },

    // Seguridad y Auditoría
    { id: 16, nombre: 'Auditoría y Seguridad Informática', descripcion: 'Evaluación de vulnerabilidades en sistemas y recomendaciones de seguridad.', precio: "", imagen_url: '/audit_security.jpg', categoria: 'Seguridad' },
    { id: 17, nombre: 'Cifrado y Seguridad de Datos', descripcion: 'Implementación de protocolos de seguridad y cifrado de información sensible.', precio: "", imagen_url: '/cif_seg.jpg', categoria: 'Seguridad' },

    // Automatización y Soporte IT
    { id: 18, nombre: 'Automatización de Procesos con Python', descripcion: 'Creación de scripts para optimizar flujos de trabajo en empresas.', precio: "", imagen_url: '/python_automation.jpg', categoria: 'Automatización' },
    { id: 19, nombre: 'Automatización con RPA', descripcion: 'Implementación de bots para reducir tareas manuales en procesos empresariales.', precio: "", imagen_url: '/auto_rpa.jpg', categoria: 'Automatización' },
    { id: 20, nombre: 'Soporte Técnico y Formateo de PC', descripcion: 'Instalación y configuración de software, eliminación de virus y optimización de sistemas.', precio: "", imagen_url: '/soporte_tecnico.jpg', categoria: 'Soporte' },

    // Consultoría y Educación
    { id: 21, nombre: 'Consultoría en Transformación Digital', descripcion: 'Asesoría para modernizar procesos empresariales con tecnología.', precio: "", imagen_url: '/consultoria.jpg', categoria: 'Consultoría' },
    { id: 22, nombre: 'Capacitaciones en Desarrollo y Ciencia de Datos', descripcion: 'Cursos personalizados en programación, bases de datos, IA y más.', precio: "", imagen_url: '/capacitaciones.jpg', categoria: 'Consultoría' },

    // Proyectos y Desarrollo a Medida
    { id: 23, nombre: 'Desarrollo de Software a Medida', descripcion: 'Soluciones tecnológicas personalizadas según requerimientos empresariales.', precio: "", imagen_url: '/custom_software.jpg', categoria: 'Desarrollo Web' },
    { id: 24, nombre: 'Automatización de Reportes Empresariales', descripcion: 'Generación de reportes automáticos en Google Sheets, Excel y otras plataformas.', precio: "", imagen_url: '/reportes.jpg', categoria: 'Automatización' },
    { id: 25, nombre: 'Integración de Sistemas', descripcion: 'Conexión entre diferentes aplicaciones empresariales con APIs y middleware.', precio: "", imagen_url: '/integracion.jpg', categoria: 'Desarrollo Web' }
  ];

  const categorias = ['Todos', 'Desarrollo Web', 'Datos', 'Cloud', 'Seguridad', 'Automatización', 'Soporte', 'Consultoría'];

  // Estado para almacenar los servicios filtrados y categoría seleccionada
  const [serviciosFiltrados, setServiciosFiltrados] = useState(servicios);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  // Función para filtrar servicios
  const filtrarServicios = (criterio, categoria) => {
    let filtrados = servicios;

    // Filtrar por categoría
    if (categoria && categoria !== 'Todos') {
      filtrados = filtrados.filter(servicio => servicio.categoria === categoria);
    }

    // Filtrar por búsqueda
    if (criterio) {
      filtrados = filtrados.filter(servicio =>
        servicio.nombre.toLowerCase().includes(criterio.toLowerCase()) ||
        servicio.descripcion.toLowerCase().includes(criterio.toLowerCase())
      );
    }

    setServiciosFiltrados(filtrados);
  };

  const handleBusquedaChange = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    filtrarServicios(valor, categoriaSeleccionada);
  };

  const handleCategoriaChange = (categoria) => {
    setCategoriaSeleccionada(categoria);
    filtrarServicios(busqueda, categoria);
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Nuestros Servicios
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-white/90 text-lg">
              Soluciones tecnológicas completas para tu empresa. Desde desarrollo web hasta inteligencia artificial.
            </p>
          </div>
        </div>
      </section>

      {/* FILTROS Y BÚSQUEDA */}
      <section className="bg-white border-b border-azulOscuro/10 sticky top-[104px] z-30 shadow-sm">
        <div className="mx-auto w-full max-w-6xl px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Búsqueda */}
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="Buscar servicios..."
                value={busqueda}
                onChange={handleBusquedaChange}
                className="w-full h-11 rounded-lg border border-azulOscuro/20 bg-white px-4 text-azulOscuro placeholder:text-azulGrisaceo focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
              />
            </div>

            {/* Filtros por categoría */}
            <div className="flex flex-wrap gap-2">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoriaChange(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    categoriaSeleccionada === cat
                      ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-sm'
                      : 'bg-white border border-azulOscuro/20 text-azulOscuro hover:bg-azulOscuro/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS GRID */}
      <section className="bg-blancoCremoso/40 py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          {serviciosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {serviciosFiltrados.map((servicio) => (
                <article
                  key={servicio.id}
                  className="group rounded-2xl border border-azulOscuro/10 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Imagen */}
                  <div className="relative aspect-video overflow-hidden bg-azulOscuro/5">
                    <img
                      src={servicio.imagen_url}
                      alt={servicio.nombre}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = '/logo_chico.jpg';
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-azulOscuro">
                        {servicio.categoria}
                      </span>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-5">
                    <h3 className="text-lg font-extrabold text-azulOscuro line-clamp-2 mb-2">
                      {servicio.nombre}
                    </h3>
                    <p className="text-sm text-azulGrisaceo line-clamp-3 mb-4">
                      {servicio.descripcion}
                    </p>

                    {/* Botón */}
                    <a
                      href="/contacto"
                      className="inline-flex items-center justify-center w-full rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-4 py-2.5 text-sm font-extrabold text-white shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      Cotizar Servicio
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-azulOscuro/10 mb-4">
                <svg className="w-8 h-8 text-azulGrisaceo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-azulOscuro mb-2">No se encontraron servicios</h3>
              <p className="text-azulGrisaceo">Intenta con otros términos de búsqueda o selecciona otra categoría.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-white py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="rounded-3xl border border-azulOscuro/10 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-8 md:p-12 text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Contáctanos y te ayudamos a encontrar la solución perfecta para tu empresa.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-extrabold text-blue-700 shadow-sm hover:bg-white/90 transition"
              >
                Contáctanos
              </a>
              <a
                href="https://calendly.com/surdigitallabs/30min"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/15 transition"
              >
                Agenda 30 min
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servicios;
