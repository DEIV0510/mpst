import { enlaceWhatsApp } from "@/config/sitio";
import { IconoWhatsApp } from "@/components/ui/Iconos";
import s from "./BotonWhatsApp.module.css";

/**
 * Acceso directo a WhatsApp, fijo en la esquina (pensado sobre todo para
 * móvil). Solo existe cuando config/sitio.ts tiene un número confirmado:
 * nunca se muestra con un número de ejemplo.
 */
export function BotonWhatsApp() {
  const href = enlaceWhatsApp();
  if (!href) return null;
  return (
    <a href={href} className={s.boton} target="_blank" rel="noopener noreferrer">
      <IconoWhatsApp className={s.icono} />
      <span className={s.texto}>WhatsApp</span>
      <span className="sr-only"> de MPST (se abre en una pestaña nueva)</span>
    </a>
  );
}
