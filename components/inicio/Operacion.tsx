import Image from "next/image";
import frontal from "@/assets/media/flota-frontal.webp";
import trasera from "@/assets/media/flota-trasera.webp";
import chaleco from "@/assets/media/dotacion-chaleco.webp";
import { proceso } from "@/content/marca";
import { Lamina } from "@/components/ui/Lamina";
import { Etiqueta } from "@/components/ui/Pulso";
import { Ruta } from "@/components/ui/Ruta";
import s from "./Operacion.module.css";

// La vista lateral de la flota ya protagoniza la portada: aquí, el resto de la operación.
const vistas = [
  { src: frontal, titulo: "Flota MPST", detalle: "Vista frontal", alt: "Vista frontal de una furgoneta de la flota de MPST con el logotipo sobre el capó." },
  { src: trasera, titulo: "Flota MPST", detalle: "Vista posterior", alt: "Vista posterior de la furgoneta de MPST con el logotipo en las puertas traseras." },
  { src: chaleco, titulo: "Dotación", detalle: "Chaleco reflectivo", alt: "Chaleco azul marino con franjas reflectivas y el logotipo de MPST." },
];

export function Operacion() {
  return (
    <section id="operacion" data-nav="nosotros" className={`seccion oscuro ${s.operacion}`} aria-labelledby="titulo-operacion">
      <div className="contenedor">
        <header className={s.cabeza} data-revelar>
          <Etiqueta>Operación y logística</Etiqueta>
          <h2 id="titulo-operacion" className={`titulo-seccion ${s.titulo}`}>
            Una operación preparada para responder a las necesidades del sector salud.
          </h2>
          <p className={`entrada ${s.entrada}`}>
            Vehículos y personal identificados con la marca MPST hacen reconocible cada entrega en las instituciones
            que atendemos.
          </p>
        </header>

        <div className={s.flota} data-revelar>
          {/* En móvil es una fila desplazable: región con nombre y enfocable para el teclado */}
          <div className={s.vistas} role="region" aria-label="Flota y dotación de MPST" tabIndex={0}>
            {vistas.map((v) => (
              <Lamina key={v.detalle} titulo={v.titulo} detalle={v.detalle} className={s.vista}>
                <Image src={v.src} alt={v.alt} sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1320px) 31vw, 400px" />
              </Lamina>
            ))}
          </div>
          <Ruta posicion={0.5} tono="oscuro" className={s.ruta} />
        </div>

        <div className={s.proceso}>
          <h3 className={s.procesoTitulo} data-revelar>
            Cómo trabajamos
          </h3>
          <ol role="list" className={s.pasos}>
            {proceso.map((p, i) => (
              <li key={p.titulo} className={s.paso} data-revelar style={{ "--retardo": `${i * 0.08}s` } as React.CSSProperties}>
                <span className={s.nodo} aria-hidden="true" />
                <span className={s.numero} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className={s.pasoTitulo}>{p.titulo}</h4>
                <p className={s.pasoTexto}>{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
