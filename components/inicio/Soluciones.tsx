import { soluciones } from "@/content/soluciones";
import { IconoFlecha } from "@/components/ui/Iconos";
import { Lamina } from "@/components/ui/Lamina";
import { Etiqueta } from "@/components/ui/Pulso";
import { Dibujo } from "./Dibujos";
import { IndiceActivo } from "./IndiceActivo";
import s from "./Soluciones.module.css";

export function Soluciones() {
  return (
    <section id="soluciones" data-nav="soluciones" className={`seccion ${s.soluciones}`} aria-labelledby="titulo-soluciones">
      <div className="contenedor">
        <header className={s.cabeza}>
          <div data-revelar>
            <Etiqueta>Soluciones</Etiqueta>
            <h2 id="titulo-soluciones" className={`titulo-seccion ${s.titulo}`}>
              Cuatro líneas de suministro para el sector salud.
            </h2>
          </div>
          <p className={`entrada ${s.entrada}`} data-revelar style={{ "--retardo": "0.1s" } as React.CSSProperties}>
            Elige la línea que necesitas y cuéntanos tu requerimiento: el equipo comercial te orienta sobre las
            opciones disponibles.
          </p>
        </header>

        <IndiceActivo className={s.cuerpo}>
          <ol role="list" className={s.lista}>
            {soluciones.map((x, i) => (
              <li
                key={x.id}
                id={x.id}
                className={s.item}
                data-i={i}
                data-revelar
                style={{ "--retardo": `${i * 0.07}s` } as React.CSSProperties}
              >
                <span className={s.indice} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={s.contenido}>
                  <h3 className={s.nombre}>{x.nombre}</h3>
                  <p className={s.descripcion}>{x.descripcion}</p>
                  <a href="#cotizacion" className={s.accion} data-categoria={x.id}>
                    Solicitar información<span className="sr-only"> sobre {x.nombre.toLowerCase()}</span>
                    <IconoFlecha className={s.flecha} />
                  </a>
                </div>
                <div className={s.miniatura} aria-hidden="true">
                  <Dibujo id={x.id} />
                </div>
              </li>
            ))}
          </ol>

          <div className={s.visor} aria-hidden="true" data-revelar>
            <Lamina
              como="div"
              className={s.lamina}
              titulo={
                <span className={s.rotulos}>
                  {soluciones.map((x, i) => (
                    <span key={x.id} data-i={i}>
                      {String(i + 1).padStart(2, "0")} · {x.nombre}
                    </span>
                  ))}
                </span>
              }
              detalle="Lámina técnica"
            >
              <div className={s.dibujos}>
                {soluciones.map((x, i) => (
                  <div key={x.id} data-i={i} className={s.capa}>
                    <Dibujo id={x.id} />
                  </div>
                ))}
              </div>
            </Lamina>
          </div>
        </IndiceActivo>
      </div>
    </section>
  );
}
