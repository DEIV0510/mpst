import Image from "next/image";
import polo from "@/assets/media/dotacion-polo.webp";
import camisa from "@/assets/media/dotacion-camisa.webp";
import { principios } from "@/content/marca";
import { Lamina } from "@/components/ui/Lamina";
import { Etiqueta } from "@/components/ui/Pulso";
import s from "./Nosotros.module.css";

export function Nosotros() {
  return (
    <section id="nosotros" data-nav="nosotros" className={`seccion ${s.nosotros}`} aria-labelledby="titulo-nosotros">
      <div className="contenedor">
        <div className={s.apertura}>
          <div className={s.declaracion} data-revelar>
            <Etiqueta>Nosotros</Etiqueta>
            <h2 id="titulo-nosotros" className={`titulo-seccion ${s.titulo}`}>
              La infraestructura invisible detrás de la atención médica.
            </h2>
            <p className="entrada">
              MPST — Medical Products &amp; Solutions Team S.A.S. — es una empresa colombiana de distribución de
              productos médicos. Trabajamos para que instituciones y profesionales de la salud cuenten con lo que su
              operación necesita.
            </p>
          </div>

          <div className={s.dotacion} data-revelar style={{ "--retardo": "0.12s" } as React.CSSProperties}>
            <Lamina titulo="Dotación" detalle="Polo corporativo" className={s.polo}>
              <Image
                src={polo}
                alt="Polo azul marino de la dotación de MPST con el logotipo de la empresa en el pecho."
                sizes="(max-width: 639px) 58vw, (max-width: 1023px) 40vw, 300px"
              />
            </Lamina>
            <Lamina titulo="Dotación" detalle="Camisa" className={s.segunda}>
              <Image
                src={camisa}
                alt="Camisa blanca de manga larga de la dotación de MPST con el logotipo en el pecho."
                sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, 230px"
              />
            </Lamina>
          </div>
        </div>

        <ol role="list" className={s.principios} aria-label="Lo que nos define">
          {principios.map((p, i) => (
            <li key={p.titulo} className={s.principio} data-revelar style={{ "--retardo": `${i * 0.06}s` } as React.CSSProperties}>
              <span className={s.numero} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={s.palabra}>{p.titulo}</h3>
              <p className={s.texto}>{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
