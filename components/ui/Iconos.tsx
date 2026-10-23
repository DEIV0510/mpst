/** Iconos de línea propios (24×24, trazo 1.75). Decorativos: el texto contiguo da el nombre. */

type P = { className?: string };

function Base({ className, children }: P & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const IconoFlecha = (p: P) => (
  <Base {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Base>
);

export const IconoFlechaAbajo = (p: P) => (
  <Base {...p}>
    <path d="M12 4v15M6 13l6 6 6-6" />
  </Base>
);

export const IconoTelefono = (p: P) => (
  <Base {...p}>
    <path d="M5 3.5h3.2l1.6 4.2-2.2 1.5a11.5 11.5 0 0 0 7.2 7.2l1.5-2.2 4.2 1.6V19a1.6 1.6 0 0 1-1.7 1.6C10.9 20.1 3.9 13.1 3.4 5.2A1.6 1.6 0 0 1 5 3.5Z" />
  </Base>
);

export const IconoCorreo = (p: P) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </Base>
);

export const IconoUbicacion = (p: P) => (
  <Base {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.4" />
  </Base>
);

export const IconoReloj = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Base>
);

export const IconoCerrar = (p: P) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const IconoCheck = (p: P) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);

export const IconoAlerta = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5v5.5M12 16.4v.1" />
  </Base>
);

export const IconoInfo = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5.5M12 7.6v.1" />
  </Base>
);

/** Logotipo de WhatsApp (relleno, forma oficial simplificada). */
export const IconoWhatsApp = ({ className }: P) => (
  <svg viewBox="0 0 24 24" width="24" height="24" className={className} aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M12.04 2.5a9.43 9.43 0 0 0-8.1 14.27L2.6 21.5l4.86-1.28A9.43 9.43 0 1 0 12.04 2.5Zm0 17.25c-1.4 0-2.77-.38-3.97-1.09l-.28-.17-2.88.76.77-2.8-.19-.29a7.8 7.8 0 1 1 6.55 3.59Zm4.28-5.84c-.23-.12-1.38-.68-1.6-.76-.21-.08-.37-.12-.53.12-.15.23-.6.76-.74.92-.14.15-.27.17-.5.06-.23-.12-.99-.37-1.88-1.17-.7-.62-1.17-1.38-1.3-1.62-.14-.23-.02-.36.1-.47.1-.1.23-.27.35-.41.11-.14.15-.23.23-.39.08-.15.04-.29-.02-.41-.06-.12-.53-1.27-.72-1.74-.19-.46-.38-.39-.53-.4h-.45a.86.86 0 0 0-.62.29c-.21.23-.82.8-.82 1.95s.84 2.26.95 2.42c.12.15 1.65 2.52 4 3.53.56.24 1 .39 1.34.5.56.18 1.07.15 1.48.09.45-.07 1.38-.56 1.57-1.11.2-.55.2-1.02.14-1.12-.06-.1-.21-.15-.45-.27Z"
    />
  </svg>
);
