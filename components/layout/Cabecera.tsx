"use client";

import { useEffect, useRef, useState } from "react";
import type { Canal } from "@/config/sitio";
import { Logo } from "@/components/marca/Logo";
import { Boton } from "@/components/ui/Boton";
import { IconoCerrar, IconoTelefono, IconoWhatsApp } from "@/components/ui/Iconos";
import { navegacion, type IdNavegacion } from "./navegacion";
import s from "./Cabecera.module.css";

/** `canales`: WhatsApp y teléfono confirmados (vacío mientras no existan). */
export function Cabecera({ canales = [] }: { canales?: Canal[] }) {
  const [compacta, setCompacta] = useState(false);
  const [activa, setActiva] = useState<IdNavegacion>("inicio");
  const [menu, setMenu] = useState(false);
  const dialogo = useRef<HTMLDialogElement>(null);

  // Al desplazarse: cabecera más baja con fondo y línea inferior.
  useEffect(() => {
    let raf = 0;
    const medir = () => {
      raf = 0;
      setCompacta(window.scrollY > 24);
    };
    const alDesplazar = () => {
      if (!raf) raf = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => {
      window.removeEventListener("scroll", alDesplazar);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Indicador de sección: la que cruza la franja central de la pantalla.
  useEffect(() => {
    const secciones = Array.from(document.querySelectorAll<HTMLElement>("[data-nav]"));
    if (!secciones.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) setActiva((e.target as HTMLElement).dataset.nav as IdNavegacion);
        }
      },
      { rootMargin: "-42% 0px -56% 0px" },
    );
    secciones.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Menú móvil: <dialog> modal (foco atrapado, fondo inerte). Se abre y cierra
  // de forma imperativa según su estado real, sin depender de que el evento
  // «close» llegue a tiempo: el botón nunca queda desincronizado.
  function abrirMenu() {
    const d = dialogo.current;
    if (d && !d.open) d.showModal();
    setMenu(true);
  }

  function cerrarMenu() {
    const d = dialogo.current;
    if (d?.open) d.close();
    setMenu(false);
  }

  // Fondo bloqueado mientras el menú está abierto.
  useEffect(() => {
    document.documentElement.classList.toggle("menu-abierto", menu);
    return () => document.documentElement.classList.remove("menu-abierto");
  }, [menu]);

  return (
    <header className={s.cabecera} data-compacta={compacta ? "" : undefined}>
      <div className={`contenedor ${s.fila}`}>
        <a href="#inicio" className={s.marca} aria-label="MPST, ir al inicio">
          <Logo sizes="140px" decorativo className={s.logo} />
        </a>

        <nav aria-label="Principal" className={s.nav}>
          <ul role="list">
            {navegacion.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className={s.enlace} data-activo={activa === n.id ? "" : undefined}>
                  {n.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.acciones}>
          <Boton href="#cotizacion" compacto className={s.cta} icono="ninguno">
            <span className={s.ctaLargo}>Solicitar cotización</span>
            <span className={s.ctaCorto} aria-hidden="true">
              Cotizar
            </span>
          </Boton>
          <button
            type="button"
            className={s.botonMenu}
            onClick={abrirMenu}
            aria-expanded={menu}
            aria-controls="menu-movil"
            aria-haspopup="dialog"
          >
            <span className={s.lineas} aria-hidden="true">
              <span />
              <span />
            </span>
            <span className="sr-only">Abrir menú</span>
          </button>
        </div>
      </div>
      <span className={s.progreso} aria-hidden="true" />

      <dialog
        id="menu-movil"
        ref={dialogo}
        className={s.menu}
        aria-label="Menú"
        // Esc se resuelve aquí de inmediato; onClose cubre otros cierres nativos (gesto atrás).
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            cerrarMenu();
          }
        }}
        onClose={() => setMenu(false)}
      >
        <div className={s.menuCaja}>
          <div className={`contenedor ${s.menuCabecera}`}>
            {menu ? <Logo sizes="140px" decorativo className={s.logoMenu} /> : <span className={s.logoMenu} />}
            <button type="button" className={s.cerrar} onClick={cerrarMenu}>
              <IconoCerrar />
              <span className="sr-only">Cerrar menú</span>
            </button>
          </div>
          <nav aria-label="Menú móvil" className="contenedor">
            <ol role="list" className={s.menuLista}>
              {navegacion.map((n, i) => (
                <li key={n.id} style={{ "--i": i } as React.CSSProperties}>
                  <a
                    href={`#${n.id}`}
                    className={s.menuEnlace}
                    data-activo={activa === n.id ? "" : undefined}
                    onClick={cerrarMenu}
                  >
                    <span className={s.menuIndice} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {n.texto}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className={`contenedor ${s.menuPie}`}>
            <Boton href="#cotizacion" ancho onClick={cerrarMenu}>
              Solicitar cotización
            </Boton>
            {canales.length ? (
              <ul role="list" className={s.menuCanales}>
                {canales.map((c) => (
                  <li key={c.tipo}>
                    <a
                      href={c.href}
                      className={s.menuCanal}
                      onClick={cerrarMenu}
                      {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {c.tipo === "whatsapp" ? <IconoWhatsApp /> : <IconoTelefono />}
                      {c.tipo === "whatsapp" ? "WhatsApp" : "Llamar"}
                      <span className="sr-only">: {c.valor}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </dialog>
    </header>
  );
}
