"use client";

import { useState } from "react";
import { IconoAlerta, IconoFlecha } from "@/components/ui/Iconos";
import { EVENTO_COBERTURA } from "./eventos";
import b from "@/components/ui/Boton.module.css";
import s from "./ConsultaCobertura.module.css";

/**
 * Consulta de cobertura: el visitante escribe su ciudad y pasa al formulario
 * de cotización con la ciudad ya incluida en el mensaje. Sin JavaScript lleva
 * igualmente al formulario (#cotizacion).
 */
export function ConsultaCobertura() {
  const [ciudad, setCiudad] = useState("");
  const [error, setError] = useState("");

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const valor = ciudad.trim();
    if (valor.length < 2) {
      setError("Escribe la ciudad o el municipio de entrega.");
      (e.currentTarget.elements.namedItem("ciudad") as HTMLInputElement | null)?.focus();
      return;
    }
    setError("");
    window.dispatchEvent(new CustomEvent(EVENTO_COBERTURA, { detail: valor.slice(0, 80) }));
    const destino = document.getElementById("cotizacion");
    if (destino) {
      const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      destino.scrollIntoView({ behavior: reducido ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", "#cotizacion");
      window.setTimeout(() => document.getElementById("cotizacion-nombre")?.focus({ preventScroll: true }), reducido ? 0 : 450);
    }
  }

  return (
    <form className={s.consulta} action="#cotizacion" method="get" onSubmit={enviar} noValidate>
      <label htmlFor="cobertura-ciudad" className={s.etiqueta}>
        Ciudad o municipio de entrega
      </label>
      <div className={s.fila}>
        <input
          id="cobertura-ciudad"
          name="ciudad"
          type="text"
          className={s.campo}
          placeholder="Escribe aquí tu ciudad"
          autoComplete="address-level2"
          maxLength={80}
          value={ciudad}
          onChange={(e) => {
            setCiudad(e.target.value);
            if (error) setError("");
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "cobertura-error" : "cobertura-ayuda"}
        />
        <button type="submit" className={`${b.boton} ${s.boton}`}>
          <span>Consultar cobertura</span>
          <IconoFlecha className={b.icono} />
        </button>
      </div>
      {error ? (
        <p id="cobertura-error" className={s.error} role="alert">
          <IconoAlerta />
          {error}
        </p>
      ) : (
        <p id="cobertura-ayuda" className={s.ayuda}>
          Abriremos el formulario de cotización con tu ciudad ya incluida.
        </p>
      )}
    </form>
  );
}
