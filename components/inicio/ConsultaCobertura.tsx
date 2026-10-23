"use client";

import { useState } from "react";
import { IconoAlerta, IconoFlecha } from "@/components/ui/Iconos";
import { TRAZO_PULSO } from "@/components/ui/Pulso";
import { EVENTO_COBERTURA } from "./eventos";
import b from "@/components/ui/Boton.module.css";
import s from "./Cobertura.module.css";

/**
 * «Guía de ruta»: origen MPST → destino escrito por el visitante. Al enviar,
 * lleva al formulario de cotización con la ciudad ya incluida en el mensaje.
 * Sin JavaScript funciona como enlace con ?ciudad= que el formulario lee.
 */
export function ConsultaCobertura({ origen }: { origen: string }) {
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
    <form className={s.guia} action="#cotizacion" method="get" onSubmit={enviar} noValidate>
      <span className={s.marcas} aria-hidden="true" />
      <div className={s.extremos}>
        <div className={s.extremo}>
          <span className={s.rotulo}>Origen</span>
          <span className={s.valor}>{origen}</span>
        </div>

        <svg className={s.tramo} viewBox="0 0 120 40" fill="none" aria-hidden="true" focusable="false">
          <path d={TRAZO_PULSO} />
        </svg>

        <div className={`${s.extremo} ${s.destino}`}>
          <label htmlFor="cobertura-ciudad" className={s.rotulo}>
            Destino
          </label>
          <input
            id="cobertura-ciudad"
            name="ciudad"
            type="text"
            className={s.campo}
            placeholder="Ciudad o municipio"
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
        </div>
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

      <button type="submit" className={`${b.boton} ${s.boton}`}>
        <span>Consultar cobertura</span>
        <IconoFlecha className={b.icono} />
      </button>
    </form>
  );
}
