import Image from "next/image";
import flotaLateral from "@/assets/media/flota-lateral.webp";
import flotaTrasera from "@/assets/media/flota-trasera.webp";
import { Boton } from "@/components/ui/Boton";
import { IconoLinea, type NombreIcono } from "@/components/ui/IconosLinea";
import s from "./Heroe.module.css";

/** Datos breves y verificables bajo los botones (sin cifras sin confirmar). */
const datos: { texto: string; icono: NombreIcono }[] = [
  { texto: "Cuatro líneas de suministro", icono: "productos" },
  { texto: "Flota y personal identificados", icono: "operacion" },
  { texto: "Operación en Colombia", icono: "presencia" },
];

export function Heroe() {
  return (
    <section id="inicio" data-nav="inicio" className={s.heroe} aria-labelledby="titulo-inicio">
      <div className={`contenedor ${s.rejilla}`}>
        <div className={s.cabeza}>
          <p className="antetitulo">Distribución de productos médicos en Colombia</p>
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
        </div>

        <div className={s.texto}>
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
          <ul role="list" className={s.datos}>
            {datos.map((d) => (
              <li key={d.texto}>
                <IconoLinea nombre={d.icono} className={s.datoIcono} />
                {d.texto}
              </li>
            ))}
          </ul>
        </div>

        <div className={s.collage}>
          <span className={s.forma} aria-hidden="true" />
          <figure className={s.fotoGrande}>
            <Image
              src={flotaLateral}
              alt="Furgoneta de la flota corporativa de MPST, rotulada con el logotipo y el nombre de la empresa."
              sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 92vw, 680px"
              loading="eager"
              fetchPriority="high"
              quality={90}
              data-lcp
            />
            <figcaption className={s.chip}>
              <span className={s.punto} aria-hidden="true" />
              Flota corporativa MPST
            </figcaption>
          </figure>
          <figure className={s.fotoPequena}>
            <Image
              src={flotaTrasera}
              alt="Vista posterior de la furgoneta de MPST con el logotipo en las puertas traseras."
              sizes="(max-width: 767px) 40vw, 240px"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
