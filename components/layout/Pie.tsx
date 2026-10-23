import { canales, sitio } from "@/config/sitio";
import { soluciones } from "@/content/soluciones";
import { Logo } from "@/components/marca/Logo";
import { Ruta } from "@/components/ui/Ruta";
import { navegacion } from "./navegacion";
import s from "./Pie.module.css";

export function Pie() {
  const lista = canales().filter((c) => c.href);
  const { nit, politicaDatos } = sitio.legal;
  const anio = new Date().getFullYear();

  return (
    <footer className={`oscuro ${s.pie}`}>
      <div className="contenedor">
        <Ruta posicion={0.1} tono="oscuro" className={s.ruta} />

        <div className={s.rejilla}>
          <div className={s.marca}>
            <a href="#inicio" className={s.logo} aria-label="MPST, volver al inicio">
              <Logo sizes="140px" decorativo />
            </a>
            <p className={s.descripcion}>
              {sitio.razonSocial}. Distribución de medicamentos, dispositivos médicos, material quirúrgico e insumos
              hospitalarios para el sector salud en {sitio.pais}.
            </p>
          </div>

          <nav aria-labelledby="pie-navegacion" className={s.columna}>
            <h2 id="pie-navegacion" className={s.tituloColumna}>
              Navegación
            </h2>
            <ul role="list">
              {navegacion.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`}>{n.texto}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={s.columna}>
            <h2 className={s.tituloColumna}>Soluciones</h2>
            <ul role="list">
              {soluciones.map((x) => (
                <li key={x.id}>
                  <a href={`#${x.id}`}>{x.nombre}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={s.columna}>
            <h2 className={s.tituloColumna}>Contacto</h2>
            <ul role="list">
              {lista.map((c) => (
                <li key={c.tipo}>
                  <a href={c.href} {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {c.valor}
                  </a>
                </li>
              ))}
              {sitio.contacto.direccion || sitio.contacto.ciudad ? (
                <li className={s.texto}>{[sitio.contacto.direccion, sitio.contacto.ciudad].filter(Boolean).join(", ")}</li>
              ) : null}
              <li>
                <a href="#cotizacion" className={s.cotizar}>
                  Solicitar cotización
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={s.legal}>
          <p>
            © {anio} {sitio.marca} — {sitio.razonSocial}
            {nit ? ` · NIT ${nit}` : ""}. Todos los derechos reservados.
          </p>
          {politicaDatos ? (
            <a href={politicaDatos} target="_blank" rel="noopener noreferrer">
              Política de tratamiento de datos
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
