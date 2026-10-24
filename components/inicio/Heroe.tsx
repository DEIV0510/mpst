import Image from "next/image";
import flotaLateral from "@/assets/media/flota-lateral.webp";
import { soluciones } from "@/content/soluciones";
import { Boton } from "@/components/ui/Boton";
import { IconoFlecha } from "@/components/ui/Iconos";
import { Lamina } from "@/components/ui/Lamina";
import { Etiqueta } from "@/components/ui/Pulso";
import { Ruta } from "@/components/ui/Ruta";
import s from "./Heroe.module.css";

export function Heroe() {
  return (
    <section id="inicio" data-nav="inicio" className={s.heroe} aria-labelledby="titulo-inicio">
      <div className={s.reticula} aria-hidden="true" />

      <div className={`contenedor ${s.rejilla}`}>
        <div className={s.texto}>
          <Etiqueta>
            <span className={s.trozo}>MPST · Distribución médica</span> <span className={s.trozo}>en Colombia</span>
          </Etiqueta>
          {/* Saltos de línea fijos: el titular ocupa las mismas líneas con la fuente
              de respaldo y con Manrope, así el cambio de fuente no desplaza la portada. */}
          <h1 id="titulo-inicio" className={s.titulo}>
            <span className={s.frase}>
              <span>Soluciones</span> <span>médicas.</span>
            </span>{" "}
            <span className={`${s.frase} ${s.segunda}`}>
              <span>Distribución</span> <span>que responde.</span>
            </span>
          </h1>
          <p className={s.entrada}>
            Conectamos productos médicos e insumos hospitalarios con las necesidades de las instituciones y los
            profesionales de la salud.
          </p>
          <div className={s.acciones}>
            <Boton href="#cotizacion">Solicitar cotización</Boton>
            <Boton href="#soluciones" variante="secundario" icono="abajo">
              Conocer nuestras soluciones
            </Boton>
          </div>
        </div>

        <div className={s.figura}>
          <Lamina titulo="Flota corporativa MPST" detalle="Vista lateral" className={s.lamina}>
            <Image
              src={flotaLateral}
              alt="Furgoneta de la flota corporativa de MPST, rotulada con el logotipo y el nombre de la empresa."
              sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1320px) 46vw, 600px"
              loading="eager"
              fetchPriority="high"
              quality={90}
              data-lcp
            />
          </Lamina>
        </div>
      </div>

      <div className={`contenedor ${s.base}`}>
        <Ruta posicion={0.7} alCargar className={s.ruta} />
        <nav aria-labelledby="titulo-lineas" className={s.lineas}>
          <p id="titulo-lineas" className={s.lineasTitulo}>
            Líneas de suministro
          </p>
          <ol role="list">
            {soluciones.map((x, i) => (
              <li key={x.id}>
                <a href={`#${x.id}`} className={s.linea}>
                  <span className={s.indice} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={s.nombre}>{x.nombre}</span>
                  <IconoFlecha className={s.flecha} />
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
