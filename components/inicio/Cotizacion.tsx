import { canales, sitio } from "@/config/sitio";
import { IconoCorreo, IconoReloj, IconoTelefono, IconoUbicacion, IconoWhatsApp } from "@/components/ui/Iconos";
import { FormularioCotizacion } from "./FormularioCotizacion";
import s from "./Cotizacion.module.css";

const iconos = {
  whatsapp: IconoWhatsApp,
  telefono: IconoTelefono,
  correo: IconoCorreo,
  direccion: IconoUbicacion,
};

const sugerencias = ["Productos o categoría", "Cantidades aproximadas", "Ciudad de entrega", "Fecha estimada"];

/**
 * «¿Cómo podemos ayudarte?»: panel azul con el argumento y los canales
 * directos confirmados (config/sitio.ts) junto al formulario de cotización.
 * Si aún no hay canales, el formulario es el canal y el panel no muestra huecos.
 */
export function Cotizacion() {
  const lista = canales();
  const { horario } = sitio.contacto;

  return (
    <section id="contacto" data-nav="contacto" className={`seccion ${s.contacto}`} aria-labelledby="titulo-contacto">
      <div className="contenedor">
        <div className={s.panel}>
          <div className={`oscuro ${s.texto}`} data-revelar>
            <p className="antetitulo">Contacto</p>
            <h2 id="titulo-contacto" className={`titulo-seccion ${s.titulo}`}>
              ¿Cómo podemos ayudarte?
            </h2>
            <p className="entrada">
              Cuéntanos qué necesita tu organización y nuestro equipo comercial te orientará sobre las opciones
              disponibles.
            </p>

            <div className={`${s.bloque} ${s.consejos}`}>
              <h3 className={s.subtitulo}>Para una cotización más precisa, incluye</h3>
              <ul role="list" className={s.sugerencias}>
                {sugerencias.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>

            {lista.length ? (
              <div className={s.bloque}>
                <h3 className={s.subtitulo}>Contacto directo</h3>
                <ul role="list" className={s.canales}>
                  {lista.map((c) => {
                    const Icono = iconos[c.tipo];
                    const contenido = (
                      <>
                        <span className={s.canalIcono}>
                          <Icono />
                        </span>
                        <span>
                          <span className={s.canalEtiqueta}>{c.etiqueta}</span>
                          <span className={s.canalValor}>{c.valor}</span>
                        </span>
                      </>
                    );
                    return (
                      <li key={c.tipo}>
                        {c.href ? (
                          <a
                            href={c.href}
                            className={s.canal}
                            {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          >
                            {contenido}
                            {c.externo ? <span className="sr-only"> (se abre en una pestaña nueva)</span> : null}
                          </a>
                        ) : (
                          <div className={s.canal}>{contenido}</div>
                        )}
                      </li>
                    );
                  })}
                  {horario ? (
                    <li>
                      <div className={s.canal}>
                        <span className={s.canalIcono}>
                          <IconoReloj />
                        </span>
                        <span>
                          <span className={s.canalEtiqueta}>Horario</span>
                          <span className={s.canalValor}>{horario}</span>
                        </span>
                      </div>
                    </li>
                  ) : null}
                </ul>
              </div>
            ) : null}
          </div>

          <div id="cotizacion" className={s.formulario} data-revelar style={{ "--retardo": "0.1s" } as React.CSSProperties}>
            <h3 className={s.formTitulo}>Solicitud de cotización</h3>
            <FormularioCotizacion canales={lista} politicaDatos={sitio.legal.politicaDatos} />
          </div>
        </div>
      </div>
    </section>
  );
}
