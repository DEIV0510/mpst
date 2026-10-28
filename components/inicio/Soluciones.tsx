import { soluciones } from "@/content/soluciones";
import { Boton } from "@/components/ui/Boton";
import { IconoFlecha } from "@/components/ui/Iconos";
import { IconoLinea } from "@/components/ui/IconosLinea";
import s from "./Soluciones.module.css";

/** Banda azul de soluciones: las cuatro líneas de suministro con acceso directo a cotizar. */
export function Soluciones() {
  return (
    <section id="soluciones" data-nav="soluciones" className={`seccion oscuro ${s.soluciones}`} aria-labelledby="titulo-soluciones">
      <div className="contenedor">
        <header className={s.cabeza} data-revelar>
          <div>
            <p className="antetitulo">Soluciones</p>
            <h2 id="titulo-soluciones" className={`titulo-seccion ${s.titulo}`}>
              Suministro médico para instituciones y profesionales de la salud.
            </h2>
          </div>
          <p className="entrada">
            Elige la línea que necesitas y cuéntanos tu requerimiento: el equipo comercial te orienta sobre las
            opciones disponibles.
          </p>
        </header>

        <ul role="list" className={s.lista}>
          {soluciones.map((x, i) => (
            <li
              key={x.id}
              id={x.id}
              className={s.item}
              data-revelar
              style={{ "--retardo": `${i * 0.07}s` } as React.CSSProperties}
            >
              <span className={s.icono} aria-hidden="true">
                <IconoLinea nombre={x.id} />
              </span>
              <h3 className={s.nombre}>{x.nombre}</h3>
              <p className={s.descripcion}>{x.descripcion}</p>
              <a href="#cotizacion" className="enlace-flecha" data-categoria={x.id}>
                Solicitar información<span className="sr-only"> sobre {x.nombre.toLowerCase()}</span>
                <IconoFlecha />
              </a>
            </li>
          ))}
        </ul>

        <div className={s.pie} data-revelar>
          <Boton href="#cotizacion" variante="contorno-claro">
            Solicitar una cotización
          </Boton>
        </div>
      </div>
    </section>
  );
}
