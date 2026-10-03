const express = require('express');
const compression = require('compression');
const path = require('path');
const fs = require('fs');
const { createBlogStore } = require('./server/blogStore');
const { createBlogApi } = require('./server/blogApi');

const app = express();
const PORT = process.env.PORT || 8080;
const BASE_URL = 'https://www.surdigitallabs.cl';

// App Engine está detrás de un proxy: necesario para req.ip (rate limit del login)
app.set('trust proxy', true);
app.use(compression());

const BUILD_DIR = path.join(__dirname, 'build');

// URL canónica sin barra final: /software/ → /software (antes era al revés y el
// canonical apuntaba a una URL que redirigía)
app.use((req, res, next) => {
  if ((req.method === 'GET' || req.method === 'HEAD') && req.path.length > 1 && req.path.endsWith('/')) {
    const query = req.url.slice(req.path.length);
    return res.redirect(301, req.path.replace(/\/+$/, '') + query);
  }
  return next();
});

// ── API del blog ──
const blogStore = createBlogStore();
app.use('/api', createBlogApi(blogStore));

// Assets: los de /static llevan hash en el nombre → caché inmutable de 1 año.
// El HTML se revalida siempre para que cada deploy se vea de inmediato.
app.use(express.static(BUILD_DIR, {
  redirect: false,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache');
    else if (filePath.includes(`${path.sep}static${path.sep}`)) res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    else res.setHeader('Cache-Control', 'public, max-age=86400');
  },
}));

// Páginas prerenderizadas por react-snap (build/<ruta>/index.html) servidas sin redirect
app.get('*', (req, res, next) => {
  if (!/^\/[a-z0-9-]+$/.test(req.path)) return next();
  const file = path.join(BUILD_DIR, req.path, 'index.html');
  if (!fs.existsSync(file)) return next();
  res.setHeader('Cache-Control', 'no-cache');
  return res.sendFile(file);
});

// Metadatos por ruta — sincronizados con useSEO hook (src/hooks/useSEO.js)
const pageMetadata = {
  '/': {
    title: 'Sur Digital Labs | Tecnología, Software y Datos en Aysén',
    description: 'Consultora tecnológica en Coyhaique: software a medida, automatización y datos para empresas de Aysén y todo Chile. Conversemos sobre tu proyecto.',
    ogImage: '/og-home.jpg',
  },
  '/software': {
    title: 'Desarrollo Web y Software a Medida en Aysén | Sur Digital Labs',
    description: 'Sitios web, sistemas a medida, automatización e integraciones para empresas de Aysén y todo Chile. Primera entrega en 7–14 días. Desde Coyhaique.',
    ogImage: '/og-software.jpg',
  },
  '/datos': {
    title: 'Datos, Dashboards y BI para Empresas | Sur Digital Labs',
    description: 'Dashboards, reportes automáticos e integración de datos para PYMEs de Aysén y Chile. Deja de depender de Excel y toma decisiones con datos claros.',
    ogImage: '/og-datos.jpg',
  },
  '/nosotros': {
    title: 'Sobre Sur Digital Labs | Consultora Tecnológica en Coyhaique',
    description: 'Somos Sur Digital Labs: consultora tecnológica en Coyhaique, Aysén. Experiencia empresarial en software, datos y cloud, con cercanía local.',
    ogImage: '/og-nosotros.jpg',
  },
  '/empleos': {
    title: 'Empleos y Prácticas en Sur Digital Labs Coyhaique',
    description: 'Únete al equipo de Sur Digital Labs en Coyhaique, Aysén. Buscamos practicantes en Frontend y Backend. Trabajo desafiante desde la Patagonia.',
    ogImage: '/og-empleos.jpg',
  },
  '/contacto': {
    title: 'Conversemos sobre tu proyecto | Sur Digital Labs',
    description: 'Cuéntanos el problema de tu empresa: software, datos, automatización o cloud. Respuesta en menos de 24 horas, sin compromiso. Coyhaique, Aysén.',
    ogImage: '/og-contacto.jpg',
  },
  '/blog': {
    title: 'Blog: Tecnología para Empresas de Aysén | Sur Digital Labs',
    description: 'Guías prácticas sobre páginas web, sistemas, automatización y datos para PYMEs de Aysén y Chile. Sin tecnicismos, desde Coyhaique.',
    ogImage: '/og-home.jpg',
  },
};

const escapeHtml = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

// Reemplaza el atributo de un tag existente o agrega el tag antes de </head>.
// Usa función como replacer para que "$" en el contenido no se interprete.
function setTag(html, matcher, attr, value, fallbackTag) {
  if (matcher.test(html)) {
    const re = new RegExp(`(${matcher.source}[^>]*${attr}=")([^"]*)(")`, 'g');
    return html.replace(re, (_m, pre, _old, post) => `${pre}${value}${post}`);
  }
  return html.replace('</head>', () => `${fallbackTag}\n</head>`);
}

function injectMetadata(html, route, metadata, extra = {}) {
  const title = escapeHtml(metadata.title);
  const description = escapeHtml(metadata.description);
  const image = escapeHtml(metadata.ogImage.startsWith('http') ? metadata.ogImage : `${BASE_URL}${metadata.ogImage}`);
  const url = escapeHtml(`${BASE_URL}${route}`);

  let out = html.replace(/<title>.*?<\/title>/s, () => `<title>${title}</title>`);
  out = setTag(out, /<meta\s+name="description"/, 'content', description, `<meta name="description" content="${description}">`);
  out = setTag(out, /<meta\s+property="og:title"/, 'content', title, `<meta property="og:title" content="${title}">`);
  out = setTag(out, /<meta\s+property="og:description"/, 'content', description, `<meta property="og:description" content="${description}">`);
  out = setTag(out, /<meta\s+property="og:image"/, 'content', image, `<meta property="og:image" content="${image}">`);
  out = setTag(out, /<meta\s+property="og:url"/, 'content', url, `<meta property="og:url" content="${url}">`);
  out = setTag(out, /<meta\s+name="twitter:title"/, 'content', title, `<meta name="twitter:title" content="${title}">`);
  out = setTag(out, /<meta\s+name="twitter:description"/, 'content', description, `<meta name="twitter:description" content="${description}">`);
  out = setTag(out, /<meta\s+name="twitter:image"/, 'content', image, `<meta name="twitter:image" content="${image}">`);
  out = setTag(out, /<link\s+rel="canonical"/, 'href', url, `<link rel="canonical" href="${url}">`);
  if (extra.ogType) out = setTag(out, /<meta\s+property="og:type"/, 'content', extra.ogType, `<meta property="og:type" content="${extra.ogType}">`);
  if (extra.noindex) out = out.replace('</head>', () => '<meta name="robots" content="noindex, nofollow">\n</head>');
  return out;
}

// JSON seguro dentro de <script>
const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

// Template: el shell SPA limpio (200.html de react-snap). Si no existe (build sin
// prerender), index.html. Nunca la home prerenderizada para otras rutas: el
// hydrate mezclaría el HTML de la home con la ruta pedida.
const shellPath = ['200.html', 'index.html']
  .map((f) => path.join(__dirname, 'build', f))
  .find((p) => fs.existsSync(p));

if (!shellPath) {
  console.error('ERROR: No se encontró build/index.html. Ejecuta: npm run build');
  process.exit(1);
}
const htmlTemplate = fs.readFileSync(shellPath, 'utf8');

// Redirects 301 para rutas antiguas /servicios/* → nuevas rutas
const SERVICIOS_REDIRECTS = {
  '/servicios/datos':          '/datos',
  '/servicios/data':           '/datos',
  '/servicios/cloud':          '/software',
  '/servicios/automatizacion': '/software',
  '/servicios/automatización': '/software',
  '/servicios/desarrollo-web': '/software',
  '/servicios/desarrollo':     '/software',
  '/servicios/software':       '/software',
  '/servicios':                '/software',
};
app.get(['/servicios', '/servicios/*'], (req, res) => {
  const dest = SERVICIOS_REDIRECTS[req.path] || '/software';
  res.redirect(301, dest);
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\n\nSitemap: ${BASE_URL}/sitemap.xml\n`);
});

// Sitemap dinámico: páginas fijas + posts publicados
app.get('/sitemap.xml', async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const pages = [
    ['/', '1.0'], ['/software', '0.9'], ['/datos', '0.9'], ['/contacto', '0.9'],
    ['/nosotros', '0.8'], ['/blog', '0.8'], ['/empleos', '0.5'],
  ].map(([loc, priority]) => ({ loc, lastmod: today, priority }));

  let posts = [];
  try {
    posts = (await blogStore.listPublished()).map((p) => ({
      loc: `/blog/${p.slug}`,
      lastmod: String(p.updatedAt || p.publishedAt || today).split('T')[0],
      priority: '0.7',
    }));
  } catch (err) {
    console.error('[sitemap] No se pudieron leer los posts:', err.message);
  }

  const urls = [...pages, ...posts]
    .map((u) => `  <url>\n    <loc>${BASE_URL}${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`)
    .join('\n');
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`);
});

// Schema.org LocalBusiness + Service por página
function generateSchema(route) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Sur Digital Labs',
    description: 'Consultora tecnológica en Coyhaique: software a medida, automatización, datos y cloud para empresas de Aysén y todo Chile.',
    url: BASE_URL,
    telephone: '+56975204813',
    email: 'surdigitallabs@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Coyhaique',
      addressRegion: 'Región de Aysén',
      postalCode: '5950000',
      addressCountry: 'CL',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Región de Aysén' },
      { '@type': 'Country', name: 'Chile' },
    ],
    sameAs: [
      'https://www.linkedin.com/company/sur-digital-labs/',
      'https://www.instagram.com/surdigitallabs',
    ],
    knowsAbout: ['Desarrollo web', 'Software a medida', 'Automatización', 'Business Intelligence', 'Ingeniería de datos', 'Google Cloud', 'AWS'],
  };

  const serviceSchemas = {
    '/software': {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Desarrollo Web y Software a Medida',
      provider: { '@type': 'Organization', name: 'Sur Digital Labs' },
      areaServed: 'CL',
    },
    '/datos': {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Datos, Dashboards y Business Intelligence',
      provider: { '@type': 'Organization', name: 'Sur Digital Labs' },
      areaServed: 'CL',
    },
  };

  return serviceSchemas[route] ? [baseSchema, serviceSchemas[route]] : [baseSchema];
}

// SPA Fallback: sirve el shell con metadatos y schema inyectados por ruta
app.get('*', async (req, res) => {
  const route = req.path.replace(/\/+$/, '') || '/';

  // Panel admin: nunca indexable
  if (route === '/admin' || route.startsWith('/admin/')) {
    const html = injectMetadata(htmlTemplate, route, {
      title: 'Administración | Sur Digital Labs',
      description: 'Panel de administración.',
      ogImage: '/og-home.jpg',
    }, { noindex: true });
    return res.set('Cache-Control', 'no-store').type('text/html').send(html);
  }

  // Artículo del blog: metadatos del post + schema Article
  const postMatch = route.match(/^\/blog\/([a-z0-9-]+)$/);
  if (postMatch) {
    let post = null;
    try {
      post = await blogStore.getPublishedBySlug(postMatch[1]);
    } catch (err) {
      console.error('[ssr] Error leyendo post:', err.message);
    }
    if (!post) {
      const html = injectMetadata(htmlTemplate, route, {
        title: 'Artículo no encontrado | Sur Digital Labs',
        description: pageMetadata['/blog'].description,
        ogImage: '/og-home.jpg',
      }, { noindex: true });
      return res.status(404).type('text/html').send(html);
    }
    const article = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.summary || '',
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      author: { '@type': 'Person', name: post.author || 'Sur Digital Labs' },
      publisher: { '@type': 'Organization', name: 'Sur Digital Labs', url: BASE_URL },
      mainEntityOfPage: `${BASE_URL}${route}`,
      ...(post.coverImage ? { image: post.coverImage } : {}),
    };
    let html = injectMetadata(htmlTemplate, route, {
      title: `${post.title} | Sur Digital Labs`,
      description: post.summary || pageMetadata['/blog'].description,
      ogImage: post.coverImage || '/og-home.jpg',
    }, { ogType: 'article' });
    html = html.replace('</head>', () => `${jsonLd(article)}\n</head>`);
    return res.type('text/html').send(html);
  }

  const metadata = pageMetadata[route];
  let html = injectMetadata(htmlTemplate, route, metadata || pageMetadata['/'], { noindex: !metadata });
  html = html.replace('</head>', () => `${generateSchema(route).map(jsonLd).join('\n')}\n</head>`);
  return res.status(metadata ? 200 : 404).type('text/html').send(html);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  blogStore.seedIfEmpty()
    .then((n) => { if (n) console.log(`[blog] ${n} posts iniciales cargados.`); })
    .catch((err) => console.error('[blog] No se pudo inicializar el almacenamiento:', err.message));
});
