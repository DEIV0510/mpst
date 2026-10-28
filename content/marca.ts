import type { NombreIcono } from "@/components/ui/IconosLinea";

/**
 * Atributos que la identidad de MPST propone comunicar (calidad,
 * cumplimiento, confianza y distribución médica especializada). Se redactan
 * como compromisos de la marca: sin cifras, certificaciones ni plazos.
 */
export const principios: { titulo: string; texto: string; icono: NombreIcono }[] = [
  {
    titulo: "Calidad",
    texto: "Productos adecuados para el uso clínico e institucional, elegidos con criterio.",
    icono: "calidad",
  },
  {
    titulo: "Cumplimiento",
    texto: "Compromiso con lo acordado, desde la cotización hasta la entrega.",
    icono: "cumplimiento",
  },
  {
    titulo: "Confianza",
    texto: "Relaciones comerciales claras y un equipo que acompaña cada solicitud.",
    icono: "confianza",
  },
  {
    titulo: "Especialización",
    texto: "Distribución médica especializada: una operación enfocada en el sector salud.",
    icono: "especializacion",
  },
];

/** Cómo se trabaja con MPST: del primer contacto a la entrega. */
export const proceso = [
  {
    titulo: "Solicitud",
    texto: "Nos cuentas qué productos necesitas y para qué institución.",
  },
  {
    titulo: "Orientación",
    texto: "El equipo comercial revisa contigo las opciones disponibles.",
  },
  {
    titulo: "Cotización",
    texto: "Recibes una propuesta con las condiciones de suministro.",
  },
  {
    titulo: "Entrega",
    texto: "Coordinamos el despacho directamente con tu institución.",
  },
];

/**
 * Panel «MPST de un vistazo». Solo datos confirmados, sin cifras: cuando la
 * empresa entregue números reales (clientes, ciudades, vehículos…), se
 * añaden aquí como nuevas tarjetas.
 */
export const vistazo: { titulo: string; detalle: string[]; icono: NombreIcono }[] = [
  {
    titulo: "Líneas de producto",
    detalle: ["Medicamentos", "Dispositivos médicos", "Material quirúrgico", "Insumos hospitalarios"],
    icono: "productos",
  },
  {
    titulo: "Atendemos a",
    detalle: ["Instituciones de salud", "Profesionales de la salud"],
    icono: "clientes",
  },
  {
    titulo: "Operación",
    detalle: ["Vehículos identificados con la marca", "Personal con dotación MPST"],
    icono: "operacion",
  },
  {
    titulo: "Atención comercial",
    detalle: ["Cotización en línea", "Orientación del equipo comercial"],
    icono: "asesoria",
  },
];
