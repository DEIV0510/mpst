import { Logo } from "@/components/marca/Logo";
import { TRAZO_PULSO } from "@/components/ui/Pulso";
import s from "./Intro.module.css";

/**
 * Pantalla de carga (solo marcado y CSS). Su ciclo lo controla el script
 * inicial de app/layout.tsx:
 * - Solo existe mientras html.intro-activa: sin JavaScript, en visitas
 *   repetidas de la sesión o con movimiento reducido no aparece.
 * - El contenido ya está pintado debajo; la pantalla no bloquea clics ni
 *   foco (pointer-events: none, aria-hidden) y se retira como una cortina.
 * - Red de seguridad: una animación CSS la oculta a los 3 s pase lo que pase.
 */
export function Intro() {
  return (
    <div id="intro" className={s.intro} aria-hidden="true">
      <div className={s.escena}>
        <div className={s.logo}>
          <Logo sizes="140px" decorativo eager />
        </div>
        <svg className={s.pulso} viewBox="0 0 120 40" fill="none" focusable="false">
          <path d={TRAZO_PULSO} pathLength={1} />
        </svg>
        <span className={s.barra}>
          <span />
        </span>
      </div>
    </div>
  );
}
