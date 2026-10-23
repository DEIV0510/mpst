import { sitio } from "@/config/sitio";
import { Etiqueta } from "@/components/ui/Pulso";
import { ConsultaCobertura } from "./ConsultaCobertura";
import s from "./Cobertura.module.css";

/**
 * Cobertura sin mapas ni zonas supuestas: muestra solo lo confirmado en
 * config/sitio.ts (sede y ciudades atendidas) y ofrece consultar la
 * disponibilidad para una ciudad concreta.
 */
export function Cobertura() {
  const { ciudad } = sitio.contacto;
  const confirmadas = sitio.cobertura;

  return (
    <section id="cobertura" data-nav="cobertura" className={`seccion ${s.cobertura}`} aria-labelledby="titulo-cobertura">
      <div className={`contenedor ${s.rejilla}`}>
        <div className={s.texto} data-revelar>
          <Etiqueta>Cobertura</Etiqueta>
          <h2 id="titulo-cobertura" className="titulo-seccion">
            ¿Dónde está tu institución?
          </h2>
          <p className="entrada">
            MPST opera en {sitio.pais}. Indícanos la ciudad o el municipio de entrega y te confirmamos la
            disponibilidad para tu zona.
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
        </div>

        <div className={s.consulta} data-revelar style={{ "--retardo": "0.1s" } as React.CSSProperties}>
          <ConsultaCobertura origen={ciudad ? `MPST · ${ciudad}` : `MPST · ${sitio.pais}`} />
        </div>
      </div>
    </section>
  );
}
