/**
 * La línea de ECG del logotipo de MPST (pantalla de carga y página 404).
 *
 * Trazo en una caja de 120×40 con línea base en y=24:
 * onda P, descenso Q, pico R, valle S y onda T, como en el símbolo.
 */
export const TRAZO_PULSO = "M0 24H40l4-5 4 7 7-22 8 32 6-17 5 5h46";

export function Pulso({ className, grosor = 2.4 }: { className?: string; grosor?: number }) {
  return (
    <svg viewBox="0 0 120 40" fill="none" className={className} aria-hidden="true" focusable="false">
      <path
        d={TRAZO_PULSO}
        stroke="currentColor"
        strokeWidth={grosor}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
      />
    </svg>
  );
}
