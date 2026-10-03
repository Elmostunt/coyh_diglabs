import { useEffect } from 'react';

/**
 * Activa el revelado al scroll de todos los elementos [data-reveal] de la página.
 * Marca <html> con .reveal-ready solo cuando JS corre, así el HTML prerenderizado
 * (react-snap) se ve completo sin JavaScript.
 */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('reveal-ready');
    const els = Array.from(document.querySelectorAll('[data-reveal]'));

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return () => root.classList.remove('reveal-ready');
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
    els.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);
}
