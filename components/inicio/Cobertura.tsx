import { sitio } from "@/config/sitio";
import { vistazo } from "@/content/marca";
import { IconoLinea } from "@/components/ui/IconosLinea";
import { ConsultaCobertura } from "./ConsultaCobertura";
import s from "./Cobertura.module.css";

/**
 * «MPST de un vistazo»: presencia y consulta de cobertura junto a tarjetas
 * con datos confirmados. Sin mapas ni zonas supuestas: la sede y las ciudades
 * atendidas solo aparecen cuando están en config/sitio.ts.
 */
export function Cobertura() {
  const { ciudad } = sitio.contacto;
  const confirmadas = sitio.cobertura;

  return (
    <section id="cobertura" data-nav="cobertura" className={`seccion ${s.cobertura}`} aria-labelledby="titulo-cobertura">
      <div className="contenedor">
        <header className={s.cabeza} data-revelar>
          <p className="antetitulo">Cobertura</p>
          <h2 id="titulo-cobertura" className="titulo-seccion">
            MPST de un vistazo
          </h2>
        </header>

        <div className={s.panel} data-revelar style={{ "--retardo": "0.08s" } as React.CSSProperties}>
          <div className={s.presencia}>
            <IconoLinea nombre="presencia" className={s.iconoGrande} />
            <h3 className={s.presenciaTitulo}>Presencia en {sitio.pais}</h3>
            <p className={s.presenciaTexto}>
              Indícanos la ciudad o el municipio de entrega y te confirmamos la disponibilidad para tu zona.
            </p>

            {ciudad || confirmadas.length ? (
              <dl className={s.datos}>
                {ciudad ? (
                  <div>
                    <dt>Sede</dt>
                    <dd>{ciudad}</dd>
                  </div>
                ) : null}
                {confirmadas.length ? (
                  <div>
                    <dt>Cobertura confirmada</dt>
                    <dd>
                      <ul role="list" className={s.ciudades}>
                        {confirmadas.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : null}

            <ConsultaCobertura />
          </div>

          <ul role="list" className={s.tarjetas}>
            {vistazo.map((v) => (
              <li key={v.titulo} className={s.tarjeta}>
                <div className={s.tarjetaCabeza}>
                  <IconoLinea nombre={v.icono} className={s.icono} />
                  <h3 className={s.tarjetaTitulo}>{v.titulo}</h3>
                </div>
                <ul role="list" className={s.detalle}>
                  {v.detalle.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
