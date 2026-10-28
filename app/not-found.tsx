import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/marca/Logo";
import { Pulso } from "@/components/ui/Pulso";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false },
};

export default function NoEncontrada() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: "2rem var(--gutter)",
        background: "var(--azul-50)",
        textAlign: "center",
      }}
    >
      <div style={{ display: "grid", justifyItems: "center", gap: "1.25rem", maxWidth: "32rem" }}>
        <div style={{ width: 96 }}>
          <Logo sizes="140px" eager />
        </div>
        <span style={{ width: 120, color: "var(--verde-600)" }}>
          <Pulso />
        </span>
        <h1 style={{ fontSize: "var(--t-h2)", color: "var(--azul-900)" }}>Esta página no existe</h1>
        <p style={{ color: "var(--texto-2)" }}>La dirección no corresponde a ninguna sección de la web de MPST.</p>
        <Link
          href="/"
          style={{ fontWeight: 700, color: "var(--verde-700)", minHeight: 44, display: "inline-flex", alignItems: "center" }}
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
