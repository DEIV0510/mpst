import type { MetadataRoute } from "next";
import { sitio } from "@/config/sitio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(sitio.dominio ? { sitemap: `${sitio.dominio}/sitemap.xml`, host: sitio.dominio } : {}),
  };
}
