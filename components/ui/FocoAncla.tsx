"use client";

import { useEffect } from "react";

/**
 * Accesibilidad de los enlaces internos (#soluciones, #cotizacion…): además
 * de desplazar la vista, mueve el foco del teclado a la sección de destino,
 * para que el siguiente Tab continúe desde allí. Espera un instante para no
 * competir con el foco que devuelve el menú móvil al cerrarse.
 */
export function FocoAncla() {
  useEffect(() => {
    function enfocar(id: string) {
      const destino = document.getElementById(id);
      if (!destino) return;
      if (!destino.hasAttribute("tabindex")) destino.setAttribute("tabindex", "-1");
      destino.focus({ preventScroll: true });
    }

    function alHacerClic(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const enlace = (e.target as Element | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!enlace) return;
      const url = new URL(enlace.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const id = decodeURIComponent(url.hash.slice(1));
      window.setTimeout(() => enfocar(id), 60);
    }

    document.addEventListener("click", alHacerClic);
    return () => document.removeEventListener("click", alHacerClic);
  }, []);

  return null;
}
