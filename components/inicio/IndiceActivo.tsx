"use client";

import { useState } from "react";

/**
 * Contenedor que recuerda qué elemento [data-i] se señaló por última vez
 * (puntero o foco de teclado) y lo expone como data-activo para que el CSS
 * muestre la lámina correspondiente. Sin JavaScript queda la primera.
 */
export function IndiceActivo({ children, className }: { children: React.ReactNode; className?: string }) {
  const [activo, setActivo] = useState("0");

  function seleccionar(e: React.SyntheticEvent) {
    const item = (e.target as Element).closest?.("li[data-i]") as HTMLElement | null;
    if (item?.dataset.i && item.dataset.i !== activo) setActivo(item.dataset.i);
  }

  return (
    <div className={className} data-activo={activo} onPointerOver={seleccionar} onFocus={seleccionar}>
      {children}
    </div>
  );
}
