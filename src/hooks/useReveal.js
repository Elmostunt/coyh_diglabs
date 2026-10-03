import { useEffect } from 'react';

/**
 * Activa el revelado al scroll de todos los elementos [data-reveal] de la página.
 * Marca <html> con .reveal-ready solo cuando JS corre, así el HTML prerenderizado
 * (react-snap) se ve completo sin JavaScript. Observa también los elementos que
 * aparecen después (contenido cargado desde la API).
 */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('reveal-ready');

    if (!('IntersectionObserver' in window)) {
      const showAll = () => document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
      showAll();
      const mo = new MutationObserver(showAll);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => { mo.disconnect(); root.classList.remove('reveal-ready'); };
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px' }
    );

    const observed = new WeakSet();
    const scan = () => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => {
        if (!observed.has(el)) { observed.add(el); io.observe(el); }
      });
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);
}
