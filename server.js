const express = require('express');
const compression = require('compression');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(compression());
app.use(express.static(path.join(__dirname, 'build'), { maxAge: '1d' }));

const BASE_URL = 'https://www.surdigitallabs.cl';

// Metadatos por ruta — sincronizados con useSEO hook (src/hooks/useSEO.js)
const pageMetadata = {
  '/': {
    title: 'Software a Medida, Cloud y Datos | Sur Digital Labs Chile',
    description: 'Software a medida, cloud (GCP/AWS) y datos para PYMEs en Chile. Arquitectura sólida, entrega en 7–14 días. Desde Coyhaique, Patagonia.',
    ogImage: '/og-home.jpg',
  },
  '/software': {
    title: 'Desarrollo Web y Software a Medida Chile | Sur Digital Labs',
    description: 'Creamos apps web, software a medida, APIs y sistemas cloud para PYMEs en Chile. Primera entrega en 7–14 días. Desde Coyhaique, Patagonia.',
    ogImage: '/og-software.jpg',
  },
  '/datos': {
    title: 'Datos, Analytics y ML para PYMEs en Chile | Sur Digital Labs',
    description: 'Pipelines ETL, dashboards analíticos y modelos ML para PYMEs en Chile. Convierte datos dispersos en decisiones claras. Consulta gratis.',
    ogImage: '/og-datos.jpg',
  },
  '/nosotros': {
    title: 'Sobre Sur Digital Labs | Equipo Tech en Coyhaique, Patagonia',
    description: 'Somos Sur Digital Labs: equipo tecnológico en Coyhaique, Aysén. 8+ años en software, datos y cloud para empresas en Chile.',
    ogImage: '/og-nosotros.jpg',
  },
  '/empleos': {
    title: 'Empleos y Prácticas en Sur Digital Labs Coyhaique',
    description: 'Únete al equipo de Sur Digital Labs en Coyhaique, Aysén. Buscamos practicantes en Frontend y Backend. Trabajo desafiante desde la Patagonia.',
    ogImage: '/og-empleos.jpg',
  },
  '/contacto': {
    title: 'Contacta Sur Digital Labs | Consulta Gratis en 24h',
    description: 'Escríbenos para consulta sin compromiso. Software, datos, cloud y automatización. Respuesta garantizada en menos de 24 horas.',
    ogImage: '/og-contacto.jpg',
  },
  '/blog': {
    title: 'Blog de Tecnología y Software | Sur Digital Labs',
    description: 'Artículos prácticos sobre software, datos y automatización para empresas en Chile. Guías reales desde el equipo de Sur Digital Labs.',
    ogImage: '/og-home.jpg',
  },
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
    modified = modified.replace(/(<meta property="og:image"[^>]*content=")([^"]*)(")/g, `$1${BASE_URL}${metadata.ogImage}$3`);
  } else {
    modified = modified.replace('</head>', `<meta property="og:image" content="${BASE_URL}${metadata.ogImage}">\n</head>`);
  }

  // Reemplaza twitter:image
  if (modified.includes('name="twitter:image"')) {
    modified = modified.replace(/(<meta name="twitter:image"[^>]*content=")([^"]*)(")/g, `$1${BASE_URL}${metadata.ogImage}$3`);
  } else {
    modified = modified.replace('</head>', `<meta name="twitter:image" content="${BASE_URL}${metadata.ogImage}">\n</head>`);
  }

  // Reemplaza og:url
  if (modified.includes('property="og:url"')) {
    modified = modified.replace(/(<meta property="og:url"[^>]*content=")([^"]*)(")/g, `$1${BASE_URL}${route}$3`);
  } else {
    modified = modified.replace('</head>', `<meta property="og:url" content="${BASE_URL}${route}">\n</head>`);
  }

  // Reemplaza canonical
  if (modified.includes('rel="canonical"')) {
    modified = modified.replace(/(<link rel="canonical"[^>]*href=")([^"]*)(")/g, `$1${BASE_URL}${route}$3`);
  } else {
    modified = modified.replace('</head>', `<link rel="canonical" href="${BASE_URL}${route}">\n</head>`);
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

// robots.txt y sitemap.xml se sirven como archivos estáticos desde build/
// (express.static definido arriba los sirve antes de llegar aquí)
// Estas rutas son fallback por si los archivos estáticos no están disponibles.

app.get('/robots.txt', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  res.type('text/plain').send(`User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`);
});

app.get('/sitemap.xml', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const routes = ['/', '/software', '/datos', '/contacto', '/nosotros', '/blog', '/empleos'];
  const priorities = { '/': '1.0', '/software': '0.9', '/datos': '0.9', '/contacto': '0.9', '/nosotros': '0.8', '/blog': '0.8', '/empleos': '0.6' };
  const urls = routes.map(r => `  <url>\n    <loc>${BASE_URL}${r}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priorities[r]}</priority>\n  </url>`).join('\n');
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`);
});

// Función para generar Schema.org JSON-LD por página
function generateSchema(route) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Sur Digital Labs',
    'description': 'Empresa de desarrollo de software a medida, ingeniería de datos y consultoría cloud',
    'url': BASE_URL,
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
