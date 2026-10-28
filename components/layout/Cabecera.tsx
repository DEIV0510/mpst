"use client";

import { useEffect, useRef, useState } from "react";
import type { Canal } from "@/config/sitio";
import { soluciones } from "@/content/soluciones";
import { Logo } from "@/components/marca/Logo";
import { Boton } from "@/components/ui/Boton";
import { IconoCerrar, IconoFlecha, IconoTelefono, IconoWhatsApp } from "@/components/ui/Iconos";
import { IconoLinea } from "@/components/ui/IconosLinea";
import { navegacion, type IdNavegacion } from "./navegacion";
import s from "./Cabecera.module.css";

/** `canales`: WhatsApp y teléfono confirmados (vacío mientras no existan). */
export function Cabecera({ canales = [] }: { canales?: Canal[] }) {
  const [compacta, setCompacta] = useState(false);
  const [activa, setActiva] = useState<IdNavegacion>("inicio");
  const [submenu, setSubmenu] = useState(false);
  const [menu, setMenu] = useState(false);
  const dialogo = useRef<HTMLDialogElement>(null);
  const zonaSubmenu = useRef<HTMLLIElement>(null);
  const botonSubmenu = useRef<HTMLButtonElement>(null);

  // Al desplazarse: línea inferior y sombra suave.
  useEffect(() => {
    let raf = 0;
    const medir = () => {
      raf = 0;
      setCompacta(window.scrollY > 40);
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

  // Submenú de soluciones: se cierra con Esc, clic fuera o al elegir una línea.
  useEffect(() => {
    if (!submenu) return;
    const fuera = (e: PointerEvent) => {
      if (!zonaSubmenu.current?.contains(e.target as Node)) setSubmenu(false);
    };
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSubmenu(false);
        botonSubmenu.current?.focus();
      }
    };
    document.addEventListener("pointerdown", fuera);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("pointerdown", fuera);
      document.removeEventListener("keydown", tecla);
    };
  }, [submenu]);

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

  const [, ...resto] = navegacion;

  return (
    <>
      <div className={s.utilidades}>
        <div className={`contenedor ${s.utilidadesFila}`}>
          <p>Medical Products &amp; Solutions Team S.A.S. · Distribución médica en Colombia</p>
          <ul role="list">
            {canales.map((c) => (
              <li key={c.tipo}>
                <a href={c.href} {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  {c.tipo === "whatsapp" ? <IconoWhatsApp /> : <IconoTelefono />}
                  {c.valor}
                </a>
              </li>
            ))}
            <li>
              <a href="#cobertura">Consultar cobertura</a>
            </li>
            <li>
              <a href="#contacto">Contacto</a>
            </li>
          </ul>
        </div>
      </div>

      <header className={s.cabecera} data-compacta={compacta ? "" : undefined}>
        <div className={`contenedor ${s.fila}`}>
          <a href="#inicio" className={s.marca} aria-label="MPST, ir al inicio">
            <Logo sizes="140px" decorativo className={s.logo} />
          </a>

          <nav aria-label="Principal" className={s.nav}>
            <ul role="list">
              <li
                ref={zonaSubmenu}
                className={s.conSubmenu}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setSubmenu(false);
                }}
              >
                <button
                  ref={botonSubmenu}
                  type="button"
                  className={s.enlace}
                  aria-expanded={submenu}
                  aria-controls="submenu-soluciones"
                  data-activo={activa === "soluciones" ? "" : undefined}
                  onClick={() => setSubmenu((v) => !v)}
                >
                  Soluciones
                  <svg className={s.chevron} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                    <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div id="submenu-soluciones" className={s.submenu} hidden={!submenu}>
                  <div className={s.submenuIntro}>
                    <p className={s.submenuTitulo}>Líneas de suministro</p>
                    <p>Medicamentos, dispositivos, material quirúrgico e insumos para instituciones y profesionales de la salud.</p>
                    <a href="#soluciones" className="enlace-flecha" onClick={() => setSubmenu(false)}>
                      Ver todas las soluciones
                      <IconoFlecha />
                    </a>
                  </div>
                  <ul role="list" className={s.submenuLista}>
                    {soluciones.map((x) => (
                      <li key={x.id}>
                        <a href={`#${x.id}`} className={s.submenuEnlace} onClick={() => setSubmenu(false)}>
                          <IconoLinea nombre={x.id} className={s.submenuIcono} />
                          <span>
                            <strong>{x.nombre}</strong>
                            <span>{x.descripcion}</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              {resto.map((n) => (
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
                <span />
              </span>
              <span className="sr-only">Abrir menú</span>
            </button>
          </div>
        </div>

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
              <ul role="list" className={s.menuLista}>
                <li>
                  <details className={s.menuGrupo}>
                    <summary className={s.menuEnlace}>
                      Soluciones
                      <svg className={s.chevron} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                        <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </summary>
                    <ul role="list" className={s.menuSub}>
                      {soluciones.map((x) => (
                        <li key={x.id}>
                          <a href={`#${x.id}`} onClick={cerrarMenu}>
                            <IconoLinea nombre={x.id} />
                            {x.nombre}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
                {resto.map((n) => (
                  <li key={n.id}>
                    <a
                      href={`#${n.id}`}
                      className={s.menuEnlace}
                      data-activo={activa === n.id ? "" : undefined}
                      onClick={cerrarMenu}
                    >
                      {n.texto}
                    </a>
                  </li>
                ))}
              </ul>
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
    </>
  );
}
