"use client";

import { useEffect } from "react";

/**
 * Aparición progresiva de los elementos [data-revelar] con un único
 * IntersectionObserver. Lo que ya está en pantalla se marca como visto
 * antes de activar el estado oculto, para que nada parpadee; sin
 * JavaScript, sin IntersectionObserver o con movimiento reducido, todo se
 * muestra de inmediato.
 */
export function Revelador() {
  useEffect(() => {
    const raiz = document.documentElement;
    const todos = Array.from(document.querySelectorAll<HTMLElement>("[data-revelar]:not(.visto)"));
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window) || reducido) {
      todos.forEach((el) => el.classList.add("visto"));
      return;
    }

    const alto = window.innerHeight;
    const pendientes = todos.filter((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < alto * 0.92 && r.bottom > 0) {
        el.classList.add("visto");
        return false;
      }
      return true;
    });
    raiz.classList.add("revelar-listo");

    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.classList.add("visto");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    pendientes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
