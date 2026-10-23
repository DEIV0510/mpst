/**
 * Líneas de suministro de MPST, tomadas del encargo y de la referencia de
 * identidad. Las descripciones definen cada categoría; no enumeran marcas,
 * referencias ni inventario (pendientes de la empresa).
 *
 * `foto`: cuando la empresa entregue fotografías reales de producto, se
 * añaden aquí (import estático) y sustituyen a la lámina técnica.
 */
export type Solucion = {
  id: "medicamentos" | "dispositivos" | "quirurgico" | "insumos";
  nombre: string;
  descripcion: string;
};

export const soluciones: Solucion[] = [
  {
    id: "medicamentos",
    nombre: "Medicamentos",
    descripcion: "Suministro de medicamentos para instituciones y profesionales de la salud.",
  },
  {
    id: "dispositivos",
    nombre: "Dispositivos médicos",
    descripcion: "Equipos y dispositivos para el diagnóstico, el monitoreo y la atención de pacientes.",
  },
  {
    id: "quirurgico",
    nombre: "Material quirúrgico",
    descripcion: "Material para procedimientos quirúrgicos y salas de cirugía.",
  },
  {
    id: "insumos",
    nombre: "Insumos hospitalarios",
    descripcion: "Insumos de uso diario para la operación clínica y hospitalaria.",
  },
];

/** Opciones del formulario de cotización: las cuatro líneas y dos casos abiertos. */
export const categoriasCotizacion = [
  ...soluciones.map((s) => ({ valor: s.id as string, texto: s.nombre })),
  { valor: "varias", texto: "Varias categorías" },
  { valor: "otra", texto: "Otra / aún no lo sé" },
];
