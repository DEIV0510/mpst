"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { enviarCotizacion } from "@/app/acciones";
import type { Canal } from "@/config/sitio";
import { categoriasCotizacion } from "@/content/soluciones";
import {
  CAMPOS,
  LIMITES,
  validar,
  validarCampo,
  valoresVacios,
  type Campo,
  type Errores,
  type EstadoCotizacion,
  type Valores,
} from "@/lib/cotizacion";
import { IconoAlerta, IconoCheck, IconoFlecha, IconoInfo } from "@/components/ui/Iconos";
import b from "@/components/ui/Boton.module.css";
import { EVENTO_COBERTURA } from "./eventos";
import s from "./Formulario.module.css";

const inicial: EstadoCotizacion = { estado: "inicial" };

/** Envoltorio: «Enviar otra solicitud» monta un formulario nuevo y limpio. */
export function FormularioCotizacion({ canales, politicaDatos }: { canales: Canal[]; politicaDatos: string }) {
  const [vuelta, setVuelta] = useState(0);
  return <Formulario key={vuelta} canales={canales} politicaDatos={politicaDatos} reiniciar={() => setVuelta((v) => v + 1)} />;
}

function Formulario({ canales, politicaDatos, reiniciar }: { canales: Canal[]; politicaDatos: string; reiniciar: () => void }) {
  const [estado, accion, enviando] = useActionState(enviarCotizacion, inicial);
  const [valores, setValores] = useState<Valores>(valoresVacios);
  const [errores, setErrores] = useState<Errores>({});
  const [intentado, setIntentado] = useState(false);
  const [resumen, setResumen] = useState("");
  const exito = useRef<HTMLHeadingElement>(null);
  const aviso = useRef<HTMLDivElement>(null);

  // Errores devueltos por el servidor (estado derivado, sin efectos).
  const [estadoPrevio, setEstadoPrevio] = useState(estado);
  if (estado !== estadoPrevio) {
    setEstadoPrevio(estado);
    if (estado.estado === "invalido") {
      setErrores(estado.errores);
      setResumen(textoResumen(estado.errores));
    }
  }

  // Foco al resultado del envío para lectores de pantalla y teclado.
  useEffect(() => {
    if (estado.estado === "enviado") exito.current?.focus();
    if (estado.estado === "no-configurado" || estado.estado === "error") aviso.current?.focus();
  }, [estado]);

  // Preselección desde otras secciones: enlaces «Solicitar información» y consulta de cobertura.
  useEffect(() => {
    function alHacerClic(e: MouseEvent) {
      const enlace = (e.target as Element | null)?.closest?.("a[data-categoria]");
      const categoria = enlace?.getAttribute("data-categoria");
      if (categoria) {
        setValores((v) => ({ ...v, categoria }));
        setErrores((x) => ({ ...x, categoria: undefined }));
      }
    }
    function alConsultarCobertura(e: Event) {
      const ciudad = (e as CustomEvent<string>).detail;
      const linea = `Quisiera confirmar la cobertura de entrega para: ${ciudad}.`;
      setValores((v) => ({ ...v, mensaje: v.mensaje.trim() ? `${v.mensaje.trim()}\n${linea}` : linea }));
    }
    document.addEventListener("click", alHacerClic);
    window.addEventListener(EVENTO_COBERTURA, alConsultarCobertura);
    return () => {
      document.removeEventListener("click", alHacerClic);
      window.removeEventListener(EVENTO_COBERTURA, alConsultarCobertura);
    };
  }, []);

  function cambiar(campo: Campo, valor: string) {
    setValores((v) => ({ ...v, [campo]: valor }));
    // Si el campo ya mostraba un error, se revalida mientras se corrige.
    if (errores[campo]) setErrores((x) => ({ ...x, [campo]: validarCampo(campo, valor) }));
  }

  function salir(campo: Campo) {
    if (!intentado && !valores[campo].trim()) return;
    setErrores((x) => ({ ...x, [campo]: validarCampo(campo, valores[campo]) }));
  }

  function alEnviar(e: React.FormEvent<HTMLFormElement>) {
    // El envío lo gestiona este manejador (sin el reinicio automático de React);
    // sin JavaScript, el atributo action envía el formulario al servidor igualmente.
    e.preventDefault();
    if (enviando) return;
    setIntentado(true);
    const encontrados = validar(valores);
    setErrores(encontrados);
    if (Object.keys(encontrados).length) {
      setResumen(textoResumen(encontrados));
      const primero = CAMPOS.find((c) => encontrados[c]);
      if (primero) document.getElementById(`cotizacion-${primero}`)?.focus();
      return;
    }
    setResumen("");
    const datos = new FormData(e.currentTarget);
    startTransition(() => accion(datos));
  }

  if (estado.estado === "enviado") {
    return (
      <div className={s.exito}>
        <span className={s.exitoIcono} aria-hidden="true">
          <IconoCheck />
        </span>
        <h3 ref={exito} tabIndex={-1} className={s.exitoTitulo}>
          Solicitud enviada
        </h3>
        <p>
          Gracias, {estado.nombre}. Recibimos tu solicitud y el equipo comercial de MPST se pondrá en contacto contigo
          por correo o teléfono.
        </p>
        <button type="button" className={`${b.boton} ${s.otra}`} data-variante="secundario" onClick={reiniciar}>
          <span>Enviar otra solicitud</span>
        </button>
      </div>
    );
  }

  const fallo = estado.estado === "no-configurado" || estado.estado === "error";

  return (
    <form action={accion} onSubmit={alEnviar} noValidate className={s.formulario} aria-describedby="cotizacion-nota">
      <p id="cotizacion-nota" className={s.nota}>
        Todos los campos son obligatorios, salvo el mensaje.
      </p>

      <div className={s.campos}>
        <Texto campo="nombre" etiqueta="Nombre y apellido" autoComplete="name" valores={valores} errores={errores} cambiar={cambiar} salir={salir} maxLength={LIMITES.nombre} />
        <Texto campo="empresa" etiqueta="Empresa o institución" autoComplete="organization" valores={valores} errores={errores} cambiar={cambiar} salir={salir} maxLength={LIMITES.empresa} />
        <Texto campo="correo" etiqueta="Correo electrónico" type="email" autoComplete="email" inputMode="email" valores={valores} errores={errores} cambiar={cambiar} salir={salir} maxLength={LIMITES.correo} />
        <Texto campo="telefono" etiqueta="Teléfono" type="tel" autoComplete="tel" inputMode="tel" valores={valores} errores={errores} cambiar={cambiar} salir={salir} maxLength={LIMITES.telefono} />

        <div className={`${s.campo} ${s.completo}`}>
          <label htmlFor="cotizacion-categoria" className={s.etiqueta}>
            Categoría de interés
          </label>
          <div className={s.selector}>
            <select
              id="cotizacion-categoria"
              name="categoria"
              required
              value={valores.categoria}
              onChange={(e) => cambiar("categoria", e.target.value)}
              onBlur={() => salir("categoria")}
              aria-invalid={errores.categoria ? true : undefined}
              aria-describedby={errores.categoria ? "cotizacion-categoria-error" : undefined}
              className={s.control}
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              {categoriasCotizacion.map((c) => (
                <option key={c.valor} value={c.valor}>
                  {c.texto}
                </option>
              ))}
            </select>
          </div>
          <Error campo="categoria" errores={errores} />
        </div>

        <div className={`${s.campo} ${s.completo}`}>
          <label htmlFor="cotizacion-mensaje" className={s.etiqueta}>
            Mensaje <span className={s.opcional}>(opcional)</span>
          </label>
          <textarea
            id="cotizacion-mensaje"
            name="mensaje"
            rows={4}
            maxLength={LIMITES.mensaje}
            value={valores.mensaje}
            onChange={(e) => cambiar("mensaje", e.target.value)}
            onBlur={() => salir("mensaje")}
            placeholder="Productos, cantidades aproximadas, ciudad de entrega…"
            aria-invalid={errores.mensaje ? true : undefined}
            aria-describedby={`cotizacion-mensaje-contador${errores.mensaje ? " cotizacion-mensaje-error" : ""}`}
            className={`${s.control} ${s.area}`}
          />
          <p id="cotizacion-mensaje-contador" className={s.contador}>
            {valores.mensaje.length.toLocaleString("es-CO")} / {LIMITES.mensaje.toLocaleString("es-CO")} caracteres
          </p>
          <Error campo="mensaje" errores={errores} />
        </div>
      </div>

      <div className={s.autorizacion}>
        <input
          id="cotizacion-autorizacion"
          name="autorizacion"
          type="checkbox"
          value="si"
          required
          checked={valores.autorizacion === "si"}
          onChange={(e) => cambiar("autorizacion", e.target.checked ? "si" : "")}
          aria-invalid={errores.autorizacion ? true : undefined}
          aria-describedby={errores.autorizacion ? "cotizacion-autorizacion-error" : undefined}
          className={s.casilla}
        />
        <label htmlFor="cotizacion-autorizacion">
          Autorizo a MPST a usar estos datos únicamente para responder mi solicitud.
          {politicaDatos ? (
            <>
              {" "}
              <a href={politicaDatos} target="_blank" rel="noopener noreferrer">
                Política de tratamiento de datos
              </a>
              .
            </>
          ) : null}
        </label>
        <Error campo="autorizacion" errores={errores} />
      </div>

      {/* Campo trampa contra envíos automáticos: invisible y fuera del orden de tabulación */}
      <div className={s.trampa} aria-hidden="true">
        <label>
          No completar
          <input name="sitio_web" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {resumen}
      </p>

      {fallo ? (
        <div ref={aviso} tabIndex={-1} role="alert" className={s.aviso} data-tipo={estado.estado}>
          <IconoInfo className={s.avisoIcono} />
          <div>
            <p className={s.avisoTitulo}>
              {estado.estado === "no-configurado"
                ? "El envío en línea todavía no está habilitado."
                : "No pudimos enviar tu solicitud."}
            </p>
            <p>
              {estado.estado === "no-configurado"
                ? "Tus datos no se han enviado. "
                : "Tus datos no se han enviado; inténtalo de nuevo en unos minutos. "}
              {canales.length ? "También puedes escribirnos directamente:" : null}
            </p>
            {canales.length ? (
              <ul role="list" className={s.avisoCanales}>
                {canales
                  .filter((c) => c.href)
                  .map((c) => (
                    <li key={c.tipo}>
                      <a href={c.href} {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {c.etiqueta}: {c.valor}
                      </a>
                    </li>
                  ))}
              </ul>
            ) : null}
          </div>
        </div>
      ) : null}

      <button type="submit" className={`${b.boton} ${s.enviar}`} aria-disabled={enviando || undefined} data-enviando={enviando ? "" : undefined}>
        <span>{enviando ? "Enviando solicitud…" : "Solicitar cotización"}</span>
        {enviando ? <span className={s.girando} aria-hidden="true" /> : <IconoFlecha className={b.icono} />}
      </button>
    </form>
  );
}

function textoResumen(e: Errores) {
  const n = Object.values(e).filter(Boolean).length;
  return n ? `Revisa ${n === 1 ? "el campo marcado" : `los ${n} campos marcados`} para continuar.` : "";
}

function Error({ campo, errores }: { campo: Campo; errores: Errores }) {
  if (!errores[campo]) return null;
  return (
    <p id={`cotizacion-${campo}-error`} className={s.error}>
      <IconoAlerta />
      {errores[campo]}
    </p>
  );
}

function Texto({
  campo,
  etiqueta,
  valores,
  errores,
  cambiar,
  salir,
  ...rest
}: {
  campo: Campo;
  etiqueta: string;
  valores: Valores;
  errores: Errores;
  cambiar: (c: Campo, v: string) => void;
  salir: (c: Campo) => void;
} & Pick<React.InputHTMLAttributes<HTMLInputElement>, "type" | "autoComplete" | "inputMode" | "maxLength">) {
  return (
    <div className={s.campo}>
      <label htmlFor={`cotizacion-${campo}`} className={s.etiqueta}>
        {etiqueta}
      </label>
      <input
        id={`cotizacion-${campo}`}
        name={campo}
        type="text"
        required
        value={valores[campo]}
        onChange={(e) => cambiar(campo, e.target.value)}
        onBlur={() => salir(campo)}
        aria-invalid={errores[campo] ? true : undefined}
        aria-describedby={errores[campo] ? `cotizacion-${campo}-error` : undefined}
        className={s.control}
        {...rest}
      />
      <Error campo={campo} errores={errores} />
    </div>
  );
}
