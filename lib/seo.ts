import { sitio } from "@/config/sitio";

/**
 * Datos estructurados de la organización. Solo incluye lo confirmado en
 * config/sitio.ts: sin teléfono, dirección o NIT, esas propiedades no se
 * publican (nunca se completan con datos de ejemplo).
 */
export function datosOrganizacion() {
  const c = sitio.contacto;
  const url = sitio.dominio;
  const puntoContacto =
    c.telefono || c.correo
      ? {
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "sales",
              availableLanguage: ["es"],
              ...(c.telefono ? { telephone: c.telefono.replace(/[^\d+]/g, "") } : {}),
              ...(c.correo ? { email: c.correo } : {}),
            },
          ],
        }
      : {};

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: sitio.marca,
    legalName: sitio.razonSocial,
    alternateName: "Medical Products & Solutions Team",
    description:
      "Distribución de medicamentos, dispositivos médicos, material quirúrgico e insumos hospitalarios para instituciones y profesionales de la salud.",
    ...(url ? { url, logo: `${url}/icons/icon-512.png` } : {}),
    ...puntoContacto,
    ...(c.direccion
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: c.direccion,
            ...(c.ciudad ? { addressLocality: c.ciudad } : {}),
            addressCountry: sitio.paisCodigo,
          },
        }
      : {}),
    ...(sitio.legal.nit ? { taxID: sitio.legal.nit } : {}),
  };
}
