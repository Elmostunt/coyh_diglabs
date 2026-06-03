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
    title: 'Desarrollo de Software a Medida · GCP · AWS | Sur Digital Labs',
    description: 'Software a medida, datos y cloud para PYMEs en Chile. Arquitectura moderna, SSR, APIs seguras. 8+ años, respuesta en 24h. Cotiza sin costo.',
    ogImage: '/og-home.jpg',
    twitterImage: '/og-home.jpg',
    keywords: 'software a medida chile, desarrollo web, datos, cloud, automatización, consultoría tech'
  },
  '/software': {
    title: 'Servicios de Software para PYMEs | Desarrollo Web a Medida Chile',
    description: 'Apps y sitios web a medida. Arquitectura moderna, UX optimizada. Proyectos en retail, fintech, manufactura. 7-14 días. Contáctanos.',
    ogImage: '/og-software.jpg',
    twitterImage: '/og-software.jpg',
    keywords: 'desarrollo software a medida chile, desarrollo web pymes, apps personalizadas'
  },
  '/datos': {
    title: 'Ingeniería de Datos y BI | GCP AWS Python | Sur Digital Labs',
    description: 'Pipelines ETL, dashboards BI, análisis avanzado. De datos dispersos a decisiones claras. GCP, AWS, Python. Consulta gratis ahora.',
    ogImage: '/og-datos.jpg',
    twitterImage: '/og-datos.jpg',
    keywords: 'ingeniería de datos chile, business intelligence, gcp aws, pipelines datos'
  },
  '/nosotros': {
    title: 'Sobre Sur Digital Labs | Equipo Tech en Coyhaique, Patagonia',
    description: '8+ años de software en Patagonia. Equipo especializado, acompañamiento cercano. PYMEs de Chile y Latinoamérica confían en nosotros.',
    ogImage: '/og-nosotros.jpg',
    twitterImage: '/og-nosotros.jpg',
    keywords: 'sur digital labs, consultora software, patagonia tech, equipo desarrollo'
  },
  '/empleos': {
    title: 'Ofertas de Empleo | Trabaja en Sur Digital Labs',
    description: 'Únete a nuestro equipo. Posiciones en desarrollo, datos y cloud. Trabajo remoto, beneficios, crecimiento profesional. Envía tu candidatura.',
    ogImage: '/og-empleos.jpg',
    twitterImage: '/og-empleos.jpg',
    keywords: 'empleos desarrollo software, trabajos tech chile, ofertas empleo, remoto'
  },
  '/contacto': {
    title: 'Contacto | Sur Digital Labs | Consulta Gratis 24h',
    description: 'Cuéntanos tu proyecto. Software, datos, cloud, automatización. Evaluamos sin compromiso. Respuesta en menos de 24 horas. Escríbenos.',
    ogImage: '/og-contacto.jpg',
    twitterImage: '/og-contacto.jpg',
    keywords: 'contacto, presupuesto software, consultoría tech, desarrollo a medida'
  },
  '/blog': {
    title: 'Blog de Software, Datos y Automatización | Sur Digital Labs',
    description: 'Artículos técnicos, guías prácticas, tutoriales. Aprende sobre desarrollo web, data engineering, cloud. Por Guillermo Cárcamo.',
    ogImage: '/og-home.jpg',
    twitterImage: '/og-home.jpg',
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
    modified = modified.replace(/(<meta property="og:image"[^>]*content=")([^"]*)(")/g, `$1https://surdigitallabs.cl${metadata.ogImage}$3`);
  } else {
    modified = modified.replace('</head>', `<meta property="og:image" content="https://surdigitallabs.cl${metadata.ogImage}">\n</head>`);
  }

  // Reemplaza twitter:image
  if (modified.includes('name="twitter:image"')) {
    modified = modified.replace(/(<meta name="twitter:image"[^>]*content=")([^"]*)(")/g, `$1https://surdigitallabs.cl${metadata.twitterImage}$3`);
  } else {
    modified = modified.replace('</head>', `<meta name="twitter:image" content="https://surdigitallabs.cl${metadata.twitterImage}">\n</head>`);
  }

  // Reemplaza og:url
  if (modified.includes('property="og:url"')) {
    modified = modified.replace(/(<meta property="og:url"[^>]*content=")([^"]*)(")/g, `$1https://surdigitallabs.cl${route}$3`);
  } else {
    modified = modified.replace('</head>', `<meta property="og:url" content="https://surdigitallabs.cl${route}">\n</head>`);
  }

  // Reemplaza canonical
  if (modified.includes('rel="canonical"')) {
    modified = modified.replace(/(<link rel="canonical"[^>]*href=")([^"]*)(")/g, `$1https://surdigitallabs.cl${route}$3`);
  } else {
    modified = modified.replace('</head>', `<link rel="canonical" href="https://surdigitallabs.cl${route}">\n</head>`);
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

Sitemap: https://surdigitallabs.cl/sitemap.xml
`;
  res.type('text/plain').send(robots);
});

// Ruta para sitemap.xml
app.get('/sitemap.xml', (req, res) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://surdigitallabs.cl/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://surdigitallabs.cl/software</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://surdigitallabs.cl/datos</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://surdigitallabs.cl/nosotros</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://surdigitallabs.cl/empleos</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://surdigitallabs.cl/contacto</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://surdigitallabs.cl/blog</loc>
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
    'url': 'https://surdigitallabs.cl',
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
