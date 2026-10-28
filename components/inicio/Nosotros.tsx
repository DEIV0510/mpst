import Image from "next/image";
import polo from "@/assets/media/dotacion-polo.webp";
import camisa from "@/assets/media/dotacion-camisa.webp";
import { principios } from "@/content/marca";
import { IconoLinea } from "@/components/ui/IconosLinea";
import s from "./Nosotros.module.css";

/** «Por qué MPST»: presentación de la empresa y los cuatro valores de la marca en columnas. */
export function Nosotros() {
  return (
    <section id="nosotros" data-nav="nosotros" className={`seccion ${s.nosotros}`} aria-labelledby="titulo-nosotros">
      <div className="contenedor">
        <div className={s.apertura}>
          <div className={s.texto} data-revelar>
            <p className="antetitulo">Nosotros</p>
            <h2 id="titulo-nosotros" className="titulo-seccion">
              Por qué MPST
            </h2>
            <p className="entrada">
              MPST — Medical Products &amp; Solutions Team S.A.S. — es una empresa colombiana de distribución de
              productos médicos. Trabajamos para que instituciones y profesionales de la salud cuenten con lo que su
              operación necesita.
            </p>
          </div>

          <figure className={s.equipo} data-revelar style={{ "--retardo": "0.1s" } as React.CSSProperties}>
            <div className={s.prendas}>
              <div className={s.prenda}>
                <Image
                  src={polo}
                  alt="Polo azul marino de la dotación de MPST con el logotipo de la empresa en el pecho."
                  sizes="(max-width: 1023px) 44vw, 250px"
                />
              </div>
              <div className={s.prenda}>
                <Image
                  src={camisa}
                  alt="Camisa blanca de manga larga de la dotación de MPST con el logotipo en el pecho."
                  sizes="(max-width: 1023px) 44vw, 250px"
                />
              </div>
            </div>
            <figcaption className={s.leyenda}>Dotación del equipo MPST</figcaption>
          </figure>
        </div>

        <ul role="list" className={s.valores}>
          {principios.map((p, i) => (
            <li key={p.titulo} className={s.valor} data-revelar style={{ "--retardo": `${i * 0.07}s` } as React.CSSProperties}>
              <IconoLinea nombre={p.icono} className={s.icono} />
              <h3 className={s.nombre}>{p.titulo}</h3>
              <p className={s.descripcion}>{p.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
