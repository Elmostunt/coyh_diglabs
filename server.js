const express = require('express');
const compression = require('compression');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(compression());
app.use(express.static(path.join(__dirname, 'build'), { maxAge: '1d' }));

// Metadatos por ruta para SEO
const pageMetadata = {
  '/': {
    title: 'Sur Digital Labs - Software, datos y automatización en Chile',
    description: 'Desarrollo de software a medida, ingeniería de datos y consultoría cloud para empresas en Chile y Latinoamérica. Especialistas en GCP, AWS, Python y automatización.',
    ogImage: '/og-home.jpg',
    keywords: 'software a medida chile, desarrollo web, datos, cloud, automatización'
  },
  '/software': {
    title: 'Desarrollo de Software a Medida | Sur Digital Labs',
    description: 'Desarrollo web y apps personalizadas para PYMEs y empresas. Arquitectura moderna, UX/UI optimizada, mantenimiento incluido. Cotiza gratis.',
    ogImage: '/og-software.jpg',
    keywords: 'desarrollo software chile, desarrollo web a medida, apps personalizadas'
  },
  '/datos': {
    title: 'Ingeniería de Datos & Business Intelligence | Sur Digital Labs',
    description: 'Pipelines de datos, análisis avanzado, dashboards inteligentes. GCP, AWS, Python. Convierte datos en decisiones de negocio.',
    ogImage: '/og-datos.jpg',
    keywords: 'ingeniería de datos chile, business intelligence, pipelines datos'
  },
  '/nosotros': {
    title: 'Sobre Sur Digital Labs | Equipo, historia y valores',
    description: 'Consultora de software desde Coyhaique, Patagonia. 10+ años de experiencia, equipos especializados, acompañamiento cercano.',
    ogImage: '/og-nosotros.jpg',
    keywords: 'sur digital labs, consultora software, patagonia tech'
  },
  '/empleos': {
    title: 'Trabaja con Nosotros | Sur Digital Labs Ofertas de Empleo',
    description: 'Únete a nuestro equipo. Posiciones disponibles en desarrollo, datos y cloud. Trabajo remoto, beneficios, desarrollo profesional.',
    ogImage: '/og-empleos.jpg',
    keywords: 'empleos, trabajos, desarrollo software'
  },
  '/contacto': {
    title: 'Contacta con Sur Digital Labs - Consulta Gratis',
    description: 'Contacta con nosotros para una consulta gratuita. Respuesta en 24h. Desarrollo de software, datos, cloud y automatización.',
    ogImage: '/og-contacto.jpg',
    keywords: 'contacto, presupuesto, consultoría'
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

// Ruta para generar OG images dinámicamente
app.get('/og-*.jpg', (req, res) => {
  const filename = req.params[0];
  const pageMapping = {
    'home': { title: 'Sur Digital Labs', subtitle: 'Software • Datos • Cloud' },
    'software': { title: 'Desarrollo de Software', subtitle: 'Apps a medida para tu empresa' },
    'datos': { title: 'Ingeniería de Datos', subtitle: 'Pipelines, BI y análisis' },
    'nosotros': { title: 'Sobre Sur Digital Labs', subtitle: 'Equipo y experiencia' },
    'empleos': { title: 'Trabaja con Nosotros', subtitle: 'Únete a nuestro equipo' },
    'contacto': { title: 'Contáctanos', subtitle: 'Consulta gratuita en 24h' }
  };

  const page = pageMapping[filename] || pageMapping['home'];

  // SVG simple como OG image (1200x630)
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#6c63ff;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#00d4aa;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="#0a0a0f"/>
    <rect width="1200" height="630" fill="url(#grad)" opacity="0.1"/>
    <text x="600" y="280" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">${page.title}</text>
    <text x="600" y="380" font-family="Arial, sans-serif" font-size="36" fill="#00d4aa" text-anchor="middle">${page.subtitle}</text>
    <text x="600" y="570" font-family="Arial, sans-serif" font-size="24" fill="#9999bb" text-anchor="middle">surdigitallabs.cl</text>
  </svg>`;

  res.type('image/svg+xml').send(svg);
});

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
</urlset>`;
  res.type('application/xml').send(sitemap);
});

// SPA Fallback: para cualquier otra ruta, sirve index.html con metadatos inyectados
app.get('*', (req, res) => {
  const modifiedHtml = injectMetadata(htmlTemplate, req.path);
  res.type('text/html').send(modifiedHtml);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor SSR corriendo en puerto ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});
