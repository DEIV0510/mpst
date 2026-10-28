/**
 * Iconos de línea de 40×40 (trazo 1,6) para soluciones, valores y el panel
 * «de un vistazo». Decorativos: el texto contiguo da el nombre.
 */
export type NombreIcono =
  | "medicamentos"
  | "dispositivos"
  | "quirurgico"
  | "insumos"
  | "calidad"
  | "cumplimiento"
  | "confianza"
  | "especializacion"
  | "productos"
  | "clientes"
  | "operacion"
  | "presencia"
  | "asesoria";

const trazos: Record<NombreIcono, React.ReactNode> = {
  medicamentos: (
    <>
      <g transform="rotate(-40 17 21)">
        <rect x="6" y="16" width="22" height="10" rx="5" />
        <path d="M17 16v10" />
      </g>
      <circle cx="29" cy="28" r="6" />
      <path d="M24.8 28h8.4" />
    </>
  ),
  dispositivos: (
    <>
      <rect x="5" y="7" width="30" height="21" rx="3" />
      <path d="M20 28v5M14 33h12" />
      <path d="M9 18.5h5l2-4 3 8 3-6.5 2 2.5h7" />
    </>
  ),
  quirurgico: (
    <>
      <path d="M19.5 20.5 27 13c3-3 7.5-2.6 7.5-.5-1 4-6 8.5-12.5 10.5Z" />
      <rect x="4" y="26" width="19" height="5" rx="2.5" transform="rotate(-45 13.5 28.5)" />
    </>
  ),
  insumos: (
    <g transform="rotate(-45 20 20)">
      <path d="M3 16v8M3 20h6M9 15v10" />
      <rect x="9" y="16" width="18" height="8" rx="1.5" />
      <path d="M14 16v3M18 16v3M22 16v3M27 18h3v4h-3M30 20h7" />
    </g>
  ),
  calidad: (
    <>
      <path d="M20 5 32 9v9c0 8-5 14-12 17C13 32 8 26 8 18V9Z" />
      <path d="m14.5 19.5 4 4 7.5-8" />
    </>
  ),
  cumplimiento: (
    <>
      <rect x="9" y="8" width="22" height="27" rx="3" />
      <rect x="15" y="5" width="10" height="6" rx="2" />
      <path d="m14.5 22 4 4 7.5-8" />
    </>
  ),
  confianza: (
    <>
      <circle cx="14" cy="14" r="5" />
      <circle cx="27.5" cy="15.5" r="4" />
      <path d="M5 32c1-6 4.5-9 9-9s8 3 9 9M24.5 23.5c4.5 0 8 3 9.5 8" />
    </>
  ),
  especializacion: (
    <>
      <circle cx="20" cy="20" r="15" />
      <path d="M17 12h6v5h5v6h-5v5h-6v-5h-5v-6h5Z" />
    </>
  ),
  productos: (
    <>
      <path d="m20 5 13 7v16l-13 7-13-7V12Z" />
      <path d="m7 12 13 7 13-7M20 19v16" />
    </>
  ),
  clientes: (
    <>
      <rect x="8" y="9" width="24" height="26" rx="2" />
      <path d="M20 13v8M16 17h8M17 35v-7h6v7M12 25h2M26 25h2" />
    </>
  ),
  operacion: (
    <>
      <path d="M4 11h20v17H4Z" />
      <path d="M24 16h7l5 6v6H24Z" />
      <circle cx="11" cy="30" r="3" />
      <circle cx="29" cy="30" r="3" />
    </>
  ),
  presencia: (
    <>
      <path d="M20 35s-11-10-11-18a11 11 0 0 1 22 0c0 8-11 18-11 18Z" />
      <circle cx="20" cy="17" r="4" />
    </>
  ),
  asesoria: (
    <>
      <path d="M6 8h28v18H17l-7 6v-6H6Z" />
      <path d="M12 15h16M12 20h10" />
    </>
  ),
};

export function IconoLinea({ nombre, className }: { nombre: NombreIcono; className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width="40"
      height="40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {trazos[nombre]}
    </svg>
  );
}
