import { useEffect } from 'react';

const BASE = 'https://www.surdigitallabs.cl';

function setMeta(sel, attr, val) {
  const el = document.querySelector(sel);
  if (el) el.setAttribute(attr, val);
}

function buildFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question || faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer || faq.a },
    })),
  };
}

/**
 * @param {object} opts
 * @param {string} opts.title        - <title> y og:title (idealmente ≤60 chars)
 * @param {string} opts.description  - meta description y og:description (≤155 chars)
 * @param {string} opts.path         - ruta relativa, e.g. '/software'
 * @param {string} [opts.ogImage]    - ruta relativa al og:image, e.g. '/og-software.jpg'
 * @param {object} [opts.schema]     - JSON-LD adicional (Service, Organization, etc.)
 * @param {Array}  [opts.faqs]       - items FAQ → genera FAQPage schema automáticamente
 */
export function useSEO({ title, description, path = '/', ogImage = '/og-home.jpg', schema, faqs }) {
  useEffect(() => {
    const url = `${BASE}${path}`;
    const img = `${BASE}${ogImage}`;

    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:image"]', 'content', img);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', img);

    const schemas = [schema, faqs && buildFAQSchema(faqs)].filter(Boolean);
    schemas.forEach((s, i) => {
      const id = `page-schema-${i}`;
      let el = document.getElementById(id);
      if (!el) {
        el = document.createElement('script');
        el.type = 'application/ld+json';
        el.id = id;
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(s);
    });

    return () => {
      [0, 1].forEach(i => {
        const el = document.getElementById(`page-schema-${i}`);
        if (el) el.remove();
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
