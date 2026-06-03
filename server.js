const express = require('express');
const compression = require('compression');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(compression());
app.use(express.static(path.join(__dirname, 'build'), { maxAge: '1d' }));

// Metadatos por ruta para SEO — OPTIMIZADOS PARA CTR Y KEYWORDS
const pageMetadata = {
  '/': {
    title: 'Software, Datos y Cloud | Empresa Chile',
    description: 'Desarrollo de software a medida, ingeniería de datos y consultoría cloud para PYMEs en Chile. Respuesta en 24h. 8+ años de experiencia.',
    ogImage: '/og-home.jpg',
    keywords: 'software a medida chile, desarrollo web, datos, cloud, automatización, consultoría tech'
  },
  '/software': {
    title: 'Desarrollo Web Profesional para PYMEs | Chile',
    description: 'Apps y sitios web a medida. Arquitectura moderna, UX/UI optimizada. Proyectos en retail, fintech y manufactura. Desde 90 días. Cotiza gratis.',
    ogImage: '/og-software.jpg',
    keywords: 'desarrollo software a medida chile, desarrollo web pymes, apps personalizadas, desarrollo web profesional'
  },
  '/datos': {
    title: 'Ingeniería de Datos & BI | GCP AWS Python',
    description: 'Pipelines de datos, dashboards inteligentes y análisis avanzado. De datos caóticos a decisiones claras. GCP, AWS, Python. Consulta sin costo.',
    ogImage: '/og-datos.jpg',
    keywords: 'ingeniería de datos chile, business intelligence, gcp aws, pipelines datos, analítica empresarial'
  },
  '/nosotros': {
    title: 'Sur Digital Labs | Equipo, Historia, Valores',
    description: '8+ años desarrollando software en Patagonia. Consultora especializada en tech para PYMEs. Equipo multidisciplinario, acompañamiento cercano.',
    ogImage: '/og-nosotros.jpg',
    keywords: 'sur digital labs, consultora software, patagonia tech, equipo desarrollo'
  },
  '/empleos': {
    title: 'Trabaja en Sur Digital Labs | Ofertas de Empleo Tech',
    description: 'Únete a nuestro equipo. Posiciones en desarrollo, datos y cloud. Trabajo remoto, beneficios, desarrollo profesional garantizado.',
    ogImage: '/og-empleos.jpg',
    keywords: 'empleos desarrollo software, trabajos tech chile, ofertas empleo, remoto'
  },
  '/contacto': {
    title: 'Contacta Sur Digital Labs | Consulta Gratis 24h',
    description: 'Escríbenos para consulta sin compromiso. Software, datos, cloud, automatización. Respuesta garantizada en menos de 24 horas.',
    ogImage: '/og-contacto.jpg',
    keywords: 'contacto, presupuesto software, consultoría tech, desarrollo a medida'
  },
  '/blog': {
    title: 'Blog — Sur Digital Labs | Artículos sobre Software y Datos',
    description: 'Guías prácticas, casos reales y aprendizajes sobre software a medida, datos y automatización. Desde Coyhaique, Patagonia.',
    ogImage: '/og-home.jpg',
    keywords: 'blog software, desarrollo web, data engineering, automatización, tutorials'
  }
};

// Función para inyectar metadatos en el HTML
function injectMetadata(html, route) {
  const metadata = pageMetadata[route] || pageMetadata['/'];

  // Reemplaza el title
  let modified = html.replace(/<title>.*?<\/title>/g, `<title>${metadata.title}</title>`);

  // Reemplaza o agrega meta description
  if (modified.includes('name="description"')) {
    modified = modified.replace(/(<meta name="description"[^>]*content=")([^"]*)(")/g, `$1${metadata.description}$3`);
  } else {
    modified = modified.replace('</head>', `<meta name="description" content="${metadata.description}">\n</head>`);
  }

  // Reemplaza og:title
  if (modified.includes('property="og:title"')) {
    modified = modified.replace(/(<meta property="og:title"[^>]*content=")([^"]*)(")/g, `$1${metadata.title}$3`);
  } else {
    modified = modified.replace('</head>', `<meta property="og:title" content="${metadata.title}">\n</head>`);
  }

  // Reemplaza og:description
  if (modified.includes('property="og:description"')) {
    modified = modified.replace(/(<meta property="og:description"[^>]*content=")([^"]*)(")/g, `$1${metadata.description}$3`);
  } else {
    modified = modified.replace('</head>', `<meta property="og:description" content="${metadata.description}">\n</head>`);
  }

  // Reemplaza og:image
  if (modified.includes('property="og:image"')) {
    modified = modified.replace(/(<meta property="og:image"[^>]*content=")([^"]*)(")/g, `$1https://www.surdigitallabs.cl${metadata.ogImage}$3`);
  } else {
    modified = modified.replace('</head>', `<meta property="og:image" content="https://www.surdigitallabs.cl${metadata.ogImage}">\n</head>`);
  }

  // Reemplaza og:url
  if (modified.includes('property="og:url"')) {
    modified = modified.replace(/(<meta property="og:url"[^>]*content=")([^"]*)(")/g, `$1https://www.surdigitallabs.cl${route}$3`);
  } else {
    modified = modified.replace('</head>', `<meta property="og:url" content="https://www.surdigitallabs.cl${route}">\n</head>`);
  }

  // Reemplaza canonical
  if (modified.includes('rel="canonical"')) {
    modified = modified.replace(/(<link rel="canonical"[^>]*href=")([^"]*)(")/g, `$1https://www.surdigitallabs.cl${route}$3`);
  } else {
    modified = modified.replace('</head>', `<link rel="canonical" href="https://www.surdigitallabs.cl${route}">\n</head>`);
  }

  // Agrega keywords si no existe
  if (!modified.includes('name="keywords"')) {
    modified = modified.replace('</head>', `<meta name="keywords" content="${metadata.keywords}">\n</head>`);
  }

  return modified;
}

// Lee el template HTML una sola vez al inicio
let htmlTemplate;
const templatePath = path.join(__dirname, 'build', 'index.html');

if (fs.existsSync(templatePath)) {
  htmlTemplate = fs.readFileSync(templatePath, 'utf8');
} else {
  console.error('ERROR: No se encontró build/index.html. Ejecuta: npm run build');
  process.exit(1);
}

// Nota: Las imágenes OG ahora se sirven desde public/ (archivos estáticos generados)
// No se necesita ruta dinámica aquí

// Ruta para robots.txt
app.get('/robots.txt', (req, res) => {
  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://www.surdigitallabs.cl/sitemap.xml
`;
  res.type('text/plain').send(robots);
});

// Ruta para sitemap.xml
app.get('/sitemap.xml', (req, res) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.surdigitallabs.cl/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.surdigitallabs.cl/software</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.surdigitallabs.cl/datos</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.surdigitallabs.cl/nosotros</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.surdigitallabs.cl/empleos</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.surdigitallabs.cl/contacto</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.surdigitallabs.cl/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
  res.type('application/xml').send(sitemap);
});

// Función para generar Schema.org JSON-LD por página
function generateSchema(route) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Sur Digital Labs',
    'description': 'Empresa de desarrollo de software a medida, ingeniería de datos y consultoría cloud',
    'url': 'https://www.surdigitallabs.cl',
    'telephone': '+56975204813',
    'email': 'contacto@surdigitallabs.cl',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Coyhaique',
      'addressLocality': 'Coyhaique',
      'addressRegion': 'Región de Aysén',
      'postalCode': '5800000',
      'addressCountry': 'CL'
    },
    'areaServed': ['CL', 'AR', 'PE', 'CO', 'MX'],
    'foundingDate': '2016',
    'sameAs': [
      'https://linkedin.com/company/sur-digital-labs',
      'https://www.instagram.com/surdigitallabs'
    ],
    'knowsAbout': ['Software Development', 'Data Engineering', 'Cloud Consulting', 'AWS', 'GCP', 'Automation', 'Web Development']
  };

  // Agregar service schema por página
  const serviceSchemas = {
    '/software': {
      '@type': 'Service',
      'name': 'Desarrollo Web y Software a Medida',
      'provider': { '@type': 'Organization', 'name': 'Sur Digital Labs' },
      'areaServed': 'CL'
    },
    '/datos': {
      '@type': 'Service',
      'name': 'Ingeniería de Datos & Business Intelligence',
      'provider': { '@type': 'Organization', 'name': 'Sur Digital Labs' },
      'areaServed': 'CL'
    }
  };

  if (serviceSchemas[route]) {
    return JSON.stringify([baseSchema, serviceSchemas[route]]);
  }
  return JSON.stringify(baseSchema);
}

// SPA Fallback: para cualquier otra ruta, sirve index.html con metadatos + schema inyectados
app.get('*', (req, res) => {
  let modifiedHtml = injectMetadata(htmlTemplate, req.path);

  // Inyecta Schema.org JSON-LD
  const schema = generateSchema(req.path);
  const schemaTag = `<script type="application/ld+json">${schema}</script>`;

  // Busca el último </head> y reemplaza antes que injectMetadata lo haga
  modifiedHtml = modifiedHtml.replace('</head>', schemaTag + '\n</head>');

  res.type('text/html').send(modifiedHtml);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor SSR corriendo en puerto ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});
