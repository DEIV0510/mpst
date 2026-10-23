import type { MetadataRoute } from "next";
import { sitio } from "@/config/sitio";

/**
 * Mapa del sitio. Requiere dominio (NEXT_PUBLIC_SITE_URL o el de producción
 * en Vercel): sin él no se publican URLs absolutas incorrectas.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!sitio.dominio) return [];
  return [{ url: `${sitio.dominio}/`, changeFrequency: "monthly", priority: 1 }];
}
