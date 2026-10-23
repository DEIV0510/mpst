/**
 * ─────────────────────────────────────────────────────────────
 *  CONFIGURACIÓN CENTRAL DE MPST
 * ─────────────────────────────────────────────────────────────
 *  Único lugar donde se editan los datos comerciales de la web.
 *  Regla: ningún dato se inventa. Lo que esté vacío ("" o []) no se
 *  muestra en la página, ni en los datos estructurados ni en el pie.
 *
 *  Datos confirmados en los archivos de la empresa (carpeta «medicos»):
 *    - Nombre: MPST — Medical Products & Solutions Team S.A.S.
 *    - Logotipo oficial, flota corporativa y dotación del equipo.
 *  Datos del encargo (brief del cliente):
 *    - Distribución de productos médicos en Colombia.
 *    - Líneas: medicamentos, dispositivos médicos, material quirúrgico
 *      e insumos hospitalarios (ver content/soluciones.ts).
 *
 *  Variables de entorno (ver README y .env.example):
 *    NEXT_PUBLIC_SITE_URL   Dominio definitivo, p. ej. https://www.mpst.com.co
 *    COTIZACION_*           Destino del formulario (solo servidor)
 */

/** Dominio configurado o, en Vercel, el dominio de producción del proyecto. */
const dominio = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "")
).replace(/\/$/, "");

export const sitio = {
  marca: "MPST",
  razonSocial: "Medical Products & Solutions Team S.A.S.",
  pais: "Colombia",
  /** Código ISO del país para datos estructurados. */
  paisCodigo: "CO",
  dominio,

  contacto: {
    /** Teléfono comercial tal como debe leerse, p. ej. "+57 601 000 0000". */
    telefono: "",
    /** Correo comercial, p. ej. "ventas@dominio.com". */
    correo: "",
    /** WhatsApp empresarial en formato internacional sin "+" ni espacios, p. ej. "573001234567". */
    whatsapp: "",
    /** Dirección corporativa completa (calle, número, oficina). */
    direccion: "",
    /** Ciudad de la sede, p. ej. "Bogotá D.C.". */
    ciudad: "",
    /** Horario de atención comercial, p. ej. "Lunes a viernes, 8:00 a. m. – 5:00 p. m.". */
    horario: "",
  },

  /** Ciudades o departamentos con cobertura confirmada por la empresa. */
  cobertura: [] as string[],

  legal: {
    /** NIT de la sociedad, p. ej. "900.000.000-0". */
    nit: "",
    /** URL de la política de tratamiento de datos personales (Ley 1581 de 2012). */
    politicaDatos: "",
  },

  /** Mensaje inicial al abrir WhatsApp desde la web. */
  mensajeWhatsApp: "Hola, MPST. Quisiera recibir información sobre sus productos médicos.",
};

export type Canal = {
  tipo: "whatsapp" | "telefono" | "correo" | "direccion";
  etiqueta: string;
  valor: string;
  href?: string;
  externo?: boolean;
};

export function enlaceWhatsApp(mensaje = sitio.mensajeWhatsApp) {
  const numero = sitio.contacto.whatsapp.replace(/\D/g, "");
  return numero ? `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}` : "";
}

/** Canales de contacto directo confirmados (solo los que tienen dato). */
export function canales(): Canal[] {
  const c = sitio.contacto;
  const lista: Canal[] = [];
  if (c.whatsapp) {
    lista.push({ tipo: "whatsapp", etiqueta: "WhatsApp", valor: formatearWhatsApp(c.whatsapp), href: enlaceWhatsApp(), externo: true });
  }
  if (c.telefono) {
    lista.push({ tipo: "telefono", etiqueta: "Teléfono", valor: c.telefono, href: `tel:${c.telefono.replace(/[^\d+]/g, "")}` });
  }
  if (c.correo) {
    lista.push({ tipo: "correo", etiqueta: "Correo", valor: c.correo, href: `mailto:${c.correo}` });
  }
  if (c.direccion || c.ciudad) {
    lista.push({ tipo: "direccion", etiqueta: "Sede", valor: [c.direccion, c.ciudad].filter(Boolean).join(", ") });
  }
  return lista;
}

function formatearWhatsApp(numero: string) {
  const d = numero.replace(/\D/g, "");
  // Colombia: 57 + móvil de 10 dígitos → +57 300 123 4567
  if (d.length === 12 && d.startsWith("57")) return `+57 ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8)}`;
  return `+${d}`;
}

/** Datos que faltan antes de publicar (solo se listan en desarrollo). */
export function datosPendientes(): string[] {
  const c = sitio.contacto;
  const faltan: string[] = [];
  if (!sitio.dominio) faltan.push("Dominio definitivo (NEXT_PUBLIC_SITE_URL)");
  if (!c.telefono) faltan.push("Teléfono comercial");
  if (!c.correo) faltan.push("Correo comercial");
  if (!c.whatsapp) faltan.push("WhatsApp empresarial");
  if (!c.direccion && !c.ciudad) faltan.push("Dirección o ciudad de la sede");
  if (!sitio.cobertura.length) faltan.push("Ciudades con cobertura confirmada");
  if (!sitio.legal.nit) faltan.push("NIT");
  if (!sitio.legal.politicaDatos) faltan.push("Política de tratamiento de datos (Ley 1581)");
  return faltan;
}
