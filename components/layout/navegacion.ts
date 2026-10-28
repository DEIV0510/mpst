/**
 * Navegación principal, en el mismo orden en que aparecen las secciones.
 * `id` es el ancla de destino y coincide con el data-nav de la sección
 * (la portada usa data-nav="inicio" y no tiene enlace propio: el logotipo
 * lleva al inicio). «Soluciones» abre además un menú con las cuatro líneas.
 */
export const navegacion = [
  { id: "soluciones", texto: "Soluciones" },
  { id: "nosotros", texto: "Nosotros" },
  { id: "operacion", texto: "Operación" },
  { id: "cobertura", texto: "Cobertura" },
  { id: "contacto", texto: "Contacto" },
] as const;

export type IdNavegacion = (typeof navegacion)[number]["id"] | "inicio";
