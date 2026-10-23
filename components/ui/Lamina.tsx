import s from "./Lamina.module.css";

/**
 * Lámina: superficie blanca con marcas de registro en las esquinas y pie
 * técnico (título · detalle). Es el formato con el que la web presenta las
 * fotografías y dibujos de MPST.
 */
export function Lamina({
  titulo,
  detalle,
  children,
  className,
  como: Etiqueta = "figure",
}: {
  titulo?: React.ReactNode;
  detalle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  como?: "figure" | "div";
}) {
  const pie = titulo || detalle;
  return (
    <Etiqueta className={`${s.lamina} ${className ?? ""}`}>
      <span className={s.marcas} aria-hidden="true" />
      <div className={s.lienzo}>{children}</div>
      {pie ? (
        Etiqueta === "figure" ? (
          <figcaption className={s.pie}>
            <span className={s.titulo}>{titulo}</span>
            {detalle ? <span className={s.detalle}>{detalle}</span> : null}
          </figcaption>
        ) : (
          <div className={s.pie}>
            <span className={s.titulo}>{titulo}</span>
            {detalle ? <span className={s.detalle}>{detalle}</span> : null}
          </div>
        )
      ) : null}
    </Etiqueta>
  );
}
