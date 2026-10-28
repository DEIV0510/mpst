import Image from "next/image";
import frontal from "@/assets/media/flota-frontal.webp";
import chaleco from "@/assets/media/dotacion-chaleco.webp";
import { proceso } from "@/content/marca";
import { Boton } from "@/components/ui/Boton";
import s from "./Operacion.module.css";

/** Historia destacada de la operación: flota y dotación reales + cómo trabajamos. */
export function Operacion() {
  return (
    <section id="operacion" data-nav="operacion" className={`seccion ${s.operacion}`} aria-labelledby="titulo-operacion">
      <div className={`contenedor ${s.rejilla}`}>
        <div className={s.collage} data-revelar>
          <figure className={s.fotoGrande}>
            <Image
              src={frontal}
              alt="Vista frontal de una furgoneta de la flota de MPST con el logotipo sobre el capó."
              sizes="(max-width: 1023px) 80vw, 460px"
            />
          </figure>
          <figure className={s.fotoPequena}>
            <Image
              src={chaleco}
              alt="Chaleco azul marino con franjas reflectivas y el logotipo de MPST."
              sizes="(max-width: 1023px) 36vw, 220px"
            />
            <figcaption>Dotación de operación</figcaption>
          </figure>
        </div>

        <div className={s.texto}>
          <div className={s.cabeza} data-revelar>
            <p className="antetitulo">Operación y logística</p>
            <h2 id="titulo-operacion" className="titulo-seccion">
              Una operación preparada para responder a las necesidades del sector salud.
            </h2>
            <p className="entrada">
              Vehículos y personal identificados con la marca MPST hacen reconocible cada entrega en las instituciones
              que atendemos.
            </p>
          </div>

          <div data-revelar style={{ "--retardo": "0.1s" } as React.CSSProperties}>
            <h3 className={s.procesoTitulo}>Cómo trabajamos</h3>
            <ol role="list" className={s.pasos}>
              {proceso.map((p, i) => (
                <li key={p.titulo} className={s.paso}>
                  <span className={s.numero} aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className={s.pasoTitulo}>{p.titulo}</h4>
                    <p className={s.pasoTexto}>{p.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div data-revelar>
            <Boton href="#cotizacion">Solicitar cotización</Boton>
          </div>
        </div>
      </div>
    </section>
  );
}
