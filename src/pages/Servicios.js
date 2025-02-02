import React, { useState } from 'react';

const Servicios = () => {
  // Lista de servicios
  const servicios = [
    { id: 1, nombre: 'Desarrollo Web Fullstack', descripcion: 'Creación de aplicaciones web personalizadas con tecnologías modernas como React, Node.js y bases de datos SQL/NoSQL.', precio: 1500, imagen_url: 'webdev.webp' },
    { id: 2, nombre: 'Desarrollo de Aplicaciones Móviles', descripcion: 'Creación de apps en React Native o Flutter para Android y iOS.', precio: 2000, imagen_url: 'movil.webp' },
    { id: 3, nombre: 'Desarrollo de E-commerce', descripcion: 'Implementación de tiendas online con Shopify, WooCommerce o desarrollo personalizado.', precio: 1800, imagen_url: 'ecommerce.webp' },
    { id: 4, nombre: 'Desarrollo de APIs REST y GraphQL', descripcion: 'Implementación de servicios backend escalables y seguros para integración con aplicaciones móviles y web.', precio: 1300, imagen_url: 'apis.webp' },
    { id: 5, nombre: 'Optimización de Sitios Web', descripcion: 'Mejora de velocidad y rendimiento de sitios web mediante optimización de código, imágenes y caché.', precio: 1000, imagen_url: 'web_optimization.webp' },
    { id: 6, nombre: 'Migración de Sitios Web', descripcion: 'Traslado de sitios web entre servidores o plataformas sin pérdida de datos.', precio: 900, imagen_url: 'web_migration.webp' },

    // Bases de Datos y Ciencia de Datos
    { id: 7, nombre: 'Optimización de Bases de Datos', descripcion: 'Mejora del rendimiento y estructuración de bases de datos relacionales y no relacionales.', precio: 1200, imagen_url: 'db_optimization.webp' },
    { id: 8, nombre: 'Análisis y Visualización de Datos', descripcion: 'Generación de dashboards interactivos y reportes en Power BI, Tableau y Python.', precio: 1800, imagen_url: 'data_viz.webp' },
    { id: 9, nombre: 'Consultoría en Ciencia de Datos', descripcion: 'Asesoramiento para la implementación de soluciones basadas en datos.', precio: 2200, imagen_url: 'cienciadatos_consultoria.webp' },
    { id: 10, nombre: 'Big Data e Ingesta de Datos', descripcion: 'Procesamiento de grandes volúmenes de datos en plataformas como BigQuery, Dataflow y Apache Beam.', precio: 2500, imagen_url: 'bigdata.webp' },
    { id: 11, nombre: 'Machine Learning y AI', descripcion: 'Entrenamiento y despliegue de modelos de inteligencia artificial para predicciones y automatización.', precio: 3000, imagen_url: 'ml_ai.webp' },

    // Infraestructura y Cloud
    { id: 12, nombre: 'Despliegue en la Nube', descripcion: 'Configuración y administración de servidores en AWS, GCP y Azure.', precio: 1600, imagen_url: 'cloud_native.webp' },
    { id: 13, nombre: 'DevOps e Infraestructura como Código', descripcion: 'Automatización de despliegues con Terraform, Kubernetes y CI/CD.', precio: 2500, imagen_url: 'devops.webp' },
    { id: 14, nombre: 'Monitorización y Alertas en Cloud', descripcion: 'Configuración de alertas y monitoreo en Cloud Monitoring, Prometheus y Grafana.', precio: 1400, imagen_url: 'alerts.webp' },
    { id: 15, nombre: 'Administración y Mantenimiento de Servidores', descripcion: 'Manejo de servidores Linux y Windows para garantizar estabilidad y seguridad.', precio: 1800, imagen_url: 'server_adm.webp' },

    // Seguridad y Auditoría
    { id: 16, nombre: 'Auditoría y Seguridad Informática', descripcion: 'Evaluación de vulnerabilidades en sistemas y recomendaciones de seguridad.', precio: 2000, imagen_url: 'audit_security.webp' },
    { id: 17, nombre: 'Cifrado y Seguridad de Datos', descripcion: 'Implementación de protocolos de seguridad y cifarado de información sensible.', precio: 1700, imagen_url: 'cif_seg.webp' },

    // Automatización y Soporte IT
    { id: 18, nombre: 'Automatización de Procesos con Python', descripcion: 'Creación de scripts para optimizar flujos de trabajo en empresas.', precio: 1400, imagen_url: 'python_automation.webp' },
    { id: 19, nombre: 'Automatización con RPA', descripcion: 'Implementación de bots para reducir tareas manuales en procesos empresariales.', precio: 2300, imagen_url: 'auto_rpa.webp' },
    { id: 20, nombre: 'Soporte Técnico y Formateo de PC', descripcion: 'Instalación y configuración de software, eliminación de virus y optimización de sistemas.', precio: 500, imagen_url: 'soporte_tecnico.webp' },

    // Consultoría y Educación
    { id: 21, nombre: 'Consultoría en Transformación Digital', descripcion: 'Asesoría para modernizar procesos empresariales con tecnología.', precio: 2500, imagen_url: 'consultoria.webp' },
    { id: 22, nombre: 'Capacitaciones en Desarrollo y Ciencia de Datos', descripcion: 'Cursos personalizados en programación, bases de datos, IA y más.', precio: 2000, imagen_url: 'capacitaciones.webp' },

    // Proyectos y Desarrollo a Medida
    { id: 23, nombre: 'Desarrollo de Software a Medida', descripcion: 'Soluciones tecnológicas personalizadas según requerimientos empresariales.', precio: 3000, imagen_url: 'custom_software.webp' },
    { id: 24, nombre: 'Automatización de Reportes Empresariales', descripcion: 'Generación de reportes automáticos en Google Sheets, Excel y otras plataformas.', precio: 1600, imagen_url: 'reportes.webp' },
    { id: 25, nombre: 'Integración de Sistemas', descripcion: 'Conexión entre diferentes aplicaciones empresariales con APIs y middleware.', precio: 2200, imagen_url: 'integracion.webp' }

    // Agrega más servicios aquí
  ];

  // Estado para almacenar los servicios filtrados
  const [serviciosFiltrados, setServiciosFiltrados] = useState(servicios);

  // Función para filtrar servicios
  const filtrarServicios = (criterio) => {
    const serviciosFiltrados = servicios.filter(servicio =>
      servicio.nombre.toLowerCase().includes(criterio.toLowerCase())
    );
    setServiciosFiltrados(serviciosFiltrados);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row p-4">
        {/* Sección principal */}
        <main className="w-full md:w-4/4 p-4">
          <h1 className="text-2xl font-bold mb-6">Servicios</h1>

          {/* Campo de búsqueda para filtrar servicios */}
          <input
            type="text"
            placeholder="Buscar servicios..."
            onChange={(e) => filtrarServicios(e.target.value)}
            className="mb-6 p-2 border border-gray-300 rounded-lg"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {serviciosFiltrados.length > 0 ? (
              serviciosFiltrados.map((servicio) => (
                <div
                  key={servicio.id}
                  className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={servicio.imagen_url}
                    alt={servicio.nombre}
                    className="w-full h-32 object-cover mb-4 rounded-lg"
                  />
                  <h3 className="text-lg font-bold">{servicio.nombre}</h3>
                  <p className="text-gray-600 mb-2">{servicio.descripcion}</p>
                  <p className="text-green-500 font-bold">${servicio.precio}</p>
                  <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
                    Cotiza Aquí
                  </button>
                </div>
              ))
            ) : (
              <p>No hay servicios disponibles.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Servicios;