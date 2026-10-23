import type { NextConfig } from "next";

const produccion = process.env.NODE_ENV === "production";

/**
 * Política de seguridad de contenido. Next.js inserta scripts en línea para
 * hidratar la página, por eso se permite 'unsafe-inline' en scripts; la web
 * no carga scripts, fuentes ni recursos de terceros.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const cabecerasSeguridad = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ...(produccion
    ? [
        { key: "Content-Security-Policy", value: csp },
        { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
      ]
    : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600],
    imageSizes: [96, 128, 160, 256, 320, 480],
    minimumCacheTTL: 2678400,
  },
  async headers() {
    return [{ source: "/:path*", headers: cabecerasSeguridad }];
  },
};

export default nextConfig;
