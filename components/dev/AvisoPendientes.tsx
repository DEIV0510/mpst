import { datosPendientes } from "@/config/sitio";
import { proveedorConfigurado } from "@/lib/envio";

/**
 * Recordatorio visible SOLO en desarrollo (`next dev`): datos comerciales y
 * configuración que faltan antes de publicar. En producción no renderiza nada.
 */
export function AvisoPendientes() {
  if (process.env.NODE_ENV !== "development") return null;
  const faltan = datosPendientes();
  if (!proveedorConfigurado()) faltan.unshift("Envío del formulario (COTIZACION_WEBHOOK_URL o Resend)");
  if (!faltan.length) return null;
  return (
    <details
      style={{
        position: "fixed",
        right: 12,
        bottom: 12,
        zIndex: 110,
        maxWidth: "min(92vw, 360px)",
        background: "#fffaeb",
        border: "1px dashed #b7791f",
        color: "#5a3d0c",
        font: "12px/1.5 system-ui, sans-serif",
        padding: "8px 12px",
      }}
    >
      <summary style={{ cursor: "pointer", fontWeight: 700 }}>Desarrollo: {faltan.length} pendientes</summary>
      <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
        {faltan.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <p style={{ margin: "8px 0 0" }}>Se completan en config/sitio.ts y en las variables de entorno (README).</p>
    </details>
  );
}
