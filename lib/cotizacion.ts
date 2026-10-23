import { categoriasCotizacion } from "@/content/soluciones";

/**
 * Reglas del formulario de cotización. Se usan igual en el navegador
 * (mensajes inmediatos) y en el servidor (validación definitiva).
 */
export const CAMPOS = ["nombre", "empresa", "correo", "telefono", "categoria", "mensaje", "autorizacion"] as const;
export type Campo = (typeof CAMPOS)[number];
export type Valores = Record<Campo, string>;
export type Errores = Partial<Record<Campo, string>>;

export const LIMITES = { nombre: 80, empresa: 120, correo: 120, telefono: 24, mensaje: 1500 } as const;

export const valoresVacios: Valores = {
  nombre: "",
  empresa: "",
  correo: "",
  telefono: "",
  categoria: "",
  mensaje: "",
  autorizacion: "",
};

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validarCampo(campo: Campo, valor: string): string | undefined {
  const v = valor.trim();
  switch (campo) {
    case "nombre":
      if (!v) return "Escribe tu nombre.";
      if (v.length < 2) return "El nombre debe tener al menos 2 letras.";
      if (v.length > LIMITES.nombre) return `El nombre puede tener máximo ${LIMITES.nombre} caracteres.`;
      return;
    case "empresa":
      if (!v) return "Indica la empresa o institución que representas.";
      if (v.length < 2) return "El nombre de la empresa debe tener al menos 2 caracteres.";
      if (v.length > LIMITES.empresa) return `Máximo ${LIMITES.empresa} caracteres.`;
      return;
    case "correo":
      if (!v) return "Escribe tu correo electrónico.";
      if (v.length > LIMITES.correo || !CORREO.test(v)) return "Revisa el correo: debe tener el formato nombre@empresa.com.";
      return;
    case "telefono": {
      if (!v) return "Escribe un teléfono de contacto.";
      if (!/^[\d\s()+.-]+$/.test(v)) return "El teléfono solo puede tener números, espacios y los signos + ( ) -.";
      const digitos = v.replace(/\D/g, "").length;
      if (digitos < 7 || digitos > 15) return "Revisa el teléfono: debe tener entre 7 y 15 dígitos.";
      return;
    }
    case "categoria":
      if (!categoriasCotizacion.some((c) => c.valor === v)) return "Elige la categoría que más se acerca a lo que necesitas.";
      return;
    case "mensaje":
      if (v.length > LIMITES.mensaje) return `El mensaje puede tener máximo ${LIMITES.mensaje.toLocaleString("es-CO")} caracteres.`;
      return;
    case "autorizacion":
      if (v !== "si") return "Necesitamos tu autorización para usar estos datos y responder tu solicitud.";
      return;
  }
}

export function validar(valores: Valores): Errores {
  const errores: Errores = {};
  for (const campo of CAMPOS) {
    const e = validarCampo(campo, valores[campo] ?? "");
    if (e) errores[campo] = e;
  }
  return errores;
}

export function leerFormulario(datos: FormData): Valores {
  const v = { ...valoresVacios };
  for (const campo of CAMPOS) {
    const crudo = datos.get(campo);
    v[campo] = typeof crudo === "string" ? crudo.slice(0, 2000) : "";
  }
  return v;
}

export type EstadoCotizacion =
  | { estado: "inicial" }
  | { estado: "invalido"; errores: Errores }
  | { estado: "enviado"; nombre: string }
  | { estado: "no-configurado" }
  | { estado: "error" };
