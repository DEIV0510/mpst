import { IconoFlecha, IconoFlechaAbajo } from "./Iconos";
import s from "./Boton.module.css";

type Variante = "primario" | "secundario" | "texto" | "claro" | "contorno-claro";

/**
 * Enlace con aspecto de botón (todas las acciones de la página llevan a
 * secciones o a canales externos, por eso son <a>).
 */
export function Boton({
  href,
  children,
  variante = "primario",
  icono = "flecha",
  compacto = false,
  ancho = false,
  className,
  externo = false,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variante?: Variante;
  icono?: "flecha" | "abajo" | "ninguno";
  compacto?: boolean;
  ancho?: boolean;
  className?: string;
  externo?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">) {
  return (
    <a
      href={href}
      className={`${s.boton} ${className ?? ""}`}
      data-variante={variante}
      data-compacto={compacto ? "" : undefined}
      data-ancho={ancho ? "" : undefined}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      <span>{children}</span>
      {icono === "flecha" ? <IconoFlecha className={s.icono} /> : null}
      {icono === "abajo" ? <IconoFlechaAbajo className={s.icono} /> : null}
    </a>
  );
}
