import type { MetadataRoute } from "next";
import { sitio } from "@/config/sitio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${sitio.marca} — ${sitio.razonSocial}`,
    short_name: sitio.marca,
    description: "Distribución de productos médicos e insumos hospitalarios en Colombia.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#03256b",
    lang: "es-CO",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
