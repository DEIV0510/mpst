import type { Valores } from "@/lib/cotizacion";
import { categoriasCotizacion } from "@/content/soluciones";
import { sitio } from "@/config/sitio";

/**
 * Entrega de las solicitudes de cotización (solo servidor).
 *
 * Se activa con variables de entorno; sin ellas, el formulario informa que el
 * envío en línea no está habilitado y NO simula un envío. Opciones:
 *
 *  A) Webhook (Make, Zapier, n8n, Google Apps Script, Formspree, un CRM…):
 *       COTIZACION_WEBHOOK_URL     URL que recibe un POST con JSON
 *       COTIZACION_WEBHOOK_TOKEN   (opcional) se envía como Authorization: Bearer
 *
 *  B) Correo con Resend (https://resend.com):
 *       RESEND_API_KEY
 *       COTIZACION_CORREO_DESTINO  buzón comercial que recibe las solicitudes
 *       COTIZACION_CORREO_REMITENTE  remitente verificado en Resend,
 *                                    p. ej. "Web MPST <web@dominio.com>"
 *
 * Si ambas están configuradas se usa el webhook.
 */
export type Proveedor = "webhook" | "resend";

export function proveedorConfigurado(): Proveedor | null {
  if (process.env.COTIZACION_WEBHOOK_URL) return "webhook";
  if (process.env.RESEND_API_KEY && process.env.COTIZACION_CORREO_DESTINO && process.env.COTIZACION_CORREO_REMITENTE) {
    return "resend";
  }
  return null;
}

function nombreCategoria(valor: string) {
  return categoriasCotizacion.find((c) => c.valor === valor)?.texto ?? valor;
}

export async function entregarSolicitud(v: Valores, proveedor: Proveedor): Promise<void> {
  const solicitud = {
    origen: "Formulario de cotización — sitio web MPST",
    fecha: new Date().toISOString(),
    nombre: v.nombre.trim(),
    empresa: v.empresa.trim(),
    correo: v.correo.trim(),
    telefono: v.telefono.trim(),
    categoria: nombreCategoria(v.categoria),
    mensaje: v.mensaje.trim(),
    autorizaTratamientoDatos: v.autorizacion === "si",
  };

  if (proveedor === "webhook") {
    const token = process.env.COTIZACION_WEBHOOK_TOKEN;
    const r = await fetch(process.env.COTIZACION_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(solicitud),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!r.ok) throw new Error(`Webhook respondió ${r.status}`);
    return;
  }

  const texto = [
    `Nueva solicitud de cotización desde la web de ${sitio.marca}`,
    "",
    `Nombre: ${solicitud.nombre}`,
    `Empresa o institución: ${solicitud.empresa}`,
    `Correo: ${solicitud.correo}`,
    `Teléfono: ${solicitud.telefono}`,
    `Categoría de interés: ${solicitud.categoria}`,
    "",
    "Mensaje:",
    solicitud.mensaje || "(sin mensaje)",
    "",
    `Autoriza el tratamiento de datos: ${solicitud.autorizaTratamientoDatos ? "sí" : "no"}`,
    `Fecha: ${solicitud.fecha}`,
  ].join("\n");

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    body: JSON.stringify({
      from: process.env.COTIZACION_CORREO_REMITENTE,
      to: process.env.COTIZACION_CORREO_DESTINO!.split(",").map((s) => s.trim()),
      reply_to: solicitud.correo,
      subject: `Cotización · ${solicitud.categoria} · ${solicitud.empresa}`,
      text: texto,
    }),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`Resend respondió ${r.status}`);
}
