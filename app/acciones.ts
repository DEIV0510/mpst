"use server";

import { leerFormulario, validar, type EstadoCotizacion } from "@/lib/cotizacion";
import { entregarSolicitud, proveedorConfigurado } from "@/lib/envio";

/**
 * Recibe el formulario de cotización. Solo responde «enviado» cuando el
 * proveedor configurado confirma la recepción; en cualquier otro caso el
 * visitante ve el motivo real (datos inválidos, envío sin configurar o fallo).
 */
export async function enviarCotizacion(_previo: EstadoCotizacion, datos: FormData): Promise<EstadoCotizacion> {
  // Campo trampa: invisible para personas, los robots suelen rellenarlo.
  if (String(datos.get("sitio_web") ?? "").trim()) return { estado: "error" };

  const valores = leerFormulario(datos);
  const errores = validar(valores);
  if (Object.keys(errores).length) return { estado: "invalido", errores };

  const proveedor = proveedorConfigurado();
  if (!proveedor) return { estado: "no-configurado" };

  try {
    await entregarSolicitud(valores, proveedor);
    return { estado: "enviado", nombre: valores.nombre.trim().split(/\s+/)[0] };
  } catch (e) {
    console.error("[cotización] No se pudo entregar la solicitud:", e instanceof Error ? e.message : e);
    return { estado: "error" };
  }
}
