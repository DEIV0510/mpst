import { canales, sitio } from "@/config/sitio";
import { soluciones } from "@/content/soluciones";
import { Logo } from "@/components/marca/Logo";
import { Boton } from "@/components/ui/Boton";
import { navegacion } from "./navegacion";
import s from "./Pie.module.css";

export function Pie() {
  const lista = canales().filter((c) => c.href);
  const { nit, politicaDatos } = sitio.legal;
  const anio = new Date().getFullYear();
  const empresa = navegacion.filter((n) => n.id !== "soluciones");

  return (
    <footer className={`oscuro ${s.pie}`}>
      <div className="contenedor">
        <div className={s.superior}>
          <div className={s.marca}>
            <a href="#inicio" className={s.logo} aria-label="MPST, volver al inicio">
              <Logo sizes="140px" decorativo />
            </a>
            <p className={s.descripcion}>
              Distribución de medicamentos, dispositivos médicos, material quirúrgico e insumos hospitalarios para el
              sector salud en {sitio.pais}.
            </p>
          </div>
          <Boton href="#cotizacion" variante="claro" className={s.cta}>
            Solicitar cotización
          </Boton>
        </div>

        <div className={s.rejilla}>
          <nav aria-labelledby="pie-soluciones" className={s.columna}>
            <h2 id="pie-soluciones" className={s.tituloColumna}>
              Soluciones
            </h2>
            <ul role="list">
              {soluciones.map((x) => (
                <li key={x.id}>
                  <a href={`#${x.id}`}>{x.nombre}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="pie-empresa" className={s.columna}>
            <h2 id="pie-empresa" className={s.tituloColumna}>
              Empresa
            </h2>
            <ul role="list">
              {empresa.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`}>{n.texto}</a>
                </li>
              ))}
            </ul>
          </nav>

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
                <a href="#cotizacion">Formulario de cotización</a>
              </li>
              <li>
                <a href="#cobertura">Consultar cobertura</a>
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
