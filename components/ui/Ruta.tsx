import { TRAZO_PULSO } from "./Pulso";
import s from "./Ruta.module.css";

/**
 * Ruta: una línea continua de ancho fluido con el pulso de la marca en un
 * punto dado (0–1). Los tramos rectos son cajas CSS y el pulso un SVG de
 * tamaño fijo, así el pico nunca se deforma con el ancho de pantalla.
 * Se dibuja de izquierda a derecha al aparecer (ver Ruta.module.css).
 */
export function Ruta({
  posicion = 0.5,
  className,
  tono = "claro",
  alCargar = false,
}: {
  posicion?: number;
  className?: string;
  /** "claro" sobre fondos blancos; "oscuro" sobre azul. */
  tono?: "claro" | "oscuro";
  /** Se dibuja al terminar la pantalla de carga (portada) en lugar de al entrar en pantalla. */
  alCargar?: boolean;
}) {
  return (
    <div
      className={`${s.ruta} ${alCargar ? s.carga : ""} ${className ?? ""}`}
      data-tono={tono}
      style={{ "--antes": posicion, "--despues": 1 - posicion } as React.CSSProperties}
      aria-hidden="true"
    >
      <span className={s.tramo} />
      <svg className={s.pulso} viewBox="0 0 120 40" fill="none" focusable="false">
        <path d={TRAZO_PULSO} pathLength={1} />
      </svg>
      <span className={`${s.tramo} ${s.final}`} />
    </div>
  );
}
