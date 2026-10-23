/**
 * Navegación principal, en el mismo orden en que aparecen las secciones.
 * `id` es el ancla de destino; otras secciones pueden declararse parte de
 * un mismo apartado con data-nav (p. ej. Operación pertenece a Nosotros).
 */
export const navegacion = [
  { id: "inicio", texto: "Inicio" },
  { id: "soluciones", texto: "Soluciones" },
  { id: "nosotros", texto: "Nosotros" },
  { id: "cobertura", texto: "Cobertura" },
  { id: "contacto", texto: "Contacto" },
] as const;

export type IdNavegacion = (typeof navegacion)[number]["id"];
