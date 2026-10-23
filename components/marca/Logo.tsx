import Image from "next/image";
import logo from "@/assets/media/logo-mpst.png";

export const NOMBRE_LOGO = "MPST — Medical Products & Solutions Team S.A.S.";

/**
 * Logotipo oficial de MPST («Logotipo médico MPST con ECG.png»): mismo
 * dibujo, colores y proporción; solo el fondo exterior al anillo es
 * transparente para poder colocarlo sobre superficies azules.
 */
export function Logo({
  sizes,
  className,
  decorativo = false,
  eager = false,
}: {
  sizes: string;
  className?: string;
  /** true cuando el nombre de la marca ya está en el texto contiguo o en el enlace. */
  decorativo?: boolean;
  eager?: boolean;
}) {
  return (
    <Image
      src={logo}
      alt={decorativo ? "" : NOMBRE_LOGO}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      quality={90}
      className={className}
      draggable={false}
    />
  );
}
