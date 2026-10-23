import { canales, sitio } from "@/config/sitio";
import { IconoCorreo, IconoReloj, IconoTelefono, IconoUbicacion, IconoWhatsApp } from "@/components/ui/Iconos";
import { Etiqueta } from "@/components/ui/Pulso";
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
 * Conversión y contacto. El panel azul reúne el argumento y los canales
 * directos confirmados (config/sitio.ts); si aún no hay ninguno, el
 * formulario es el canal y el panel no muestra huecos.
 */
export function Cotizacion() {
  const lista = canales();
  const { horario } = sitio.contacto;

  return (
    <section id="contacto" data-nav="contacto" className={`seccion ${s.cotizacion}`} aria-labelledby="titulo-cotizacion">
      <div className={`contenedor ${s.rejilla}`}>
        <div className={`oscuro ${s.panel}`} data-revelar>
          <Etiqueta>Cotización</Etiqueta>
          <h2 id="titulo-cotizacion" className={`titulo-seccion ${s.titulo}`}>
            Encuentra las soluciones médicas que necesita tu organización.
          </h2>
          <p className="entrada">
            Cuéntanos qué necesitas y nuestro equipo comercial te orientará sobre las opciones disponibles.
          </p>

          <div className={s.bloque}>
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
                      <Icono className={s.canalIcono} />
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
                      <IconoReloj className={s.canalIcono} />
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
          <span className={s.marcas} aria-hidden="true" />
          <h3 className={s.formTitulo}>Solicitud de cotización</h3>
          <FormularioCotizacion canales={lista} politicaDatos={sitio.legal.politicaDatos} />
        </div>
      </div>
    </section>
  );
}
