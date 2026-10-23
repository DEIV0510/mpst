import type { Solucion } from "@/content/soluciones";
import { TRAZO_PULSO } from "@/components/ui/Pulso";
import s from "./Dibujos.module.css";

/**
 * Láminas técnicas de cada línea de suministro: dibujos de línea propios
 * (no fotografías), con cotas y llamadas como en un plano. Ilustran la
 * categoría sin representar productos, marcas ni referencias concretas.
 */
export function Dibujo({ id, className }: { id: Solucion["id"]; className?: string }) {
  return (
    <svg viewBox="0 0 320 300" className={`${s.dibujo} ${className ?? ""}`} fill="none" aria-hidden="true" focusable="false">
      {id === "medicamentos" ? <Medicamentos /> : null}
      {id === "dispositivos" ? <Dispositivos /> : null}
      {id === "quirurgico" ? <Quirurgico /> : null}
      {id === "insumos" ? <Insumos /> : null}
    </svg>
  );
}

function Llamada({ x, y, n, a }: { x: number; y: number; n: string; a: [number, number] }) {
  return (
    <g className={s.llamada}>
      <path d={`M${x} ${y}L${a[0]} ${a[1]}`} className={s.guia} />
      <circle cx={a[0]} cy={a[1]} r="2.5" className={s.punto} />
      <circle cx={x} cy={y} r="10" className={s.circulo} />
      <text x={x} y={y + 3.5} textAnchor="middle" className={s.texto}>
        {n}
      </text>
    </g>
  );
}

function Cota({ x1, x2, y, rotulo }: { x1: number; x2: number; y: number; rotulo: string }) {
  return (
    <g className={s.cota}>
      <path d={`M${x1} ${y}H${x2}M${x1} ${y - 5}v10M${x2} ${y - 5}v10`} />
      <text x={(x1 + x2) / 2} y={y - 7} textAnchor="middle" className={s.texto}>
        {rotulo}
      </text>
    </g>
  );
}

function Medicamentos() {
  const alveolos = [0, 1, 2, 3].flatMap((c) => [0, 1].map((f) => ({ x: 84 + c * 38, y: 96 + f * 50, k: `${c}-${f}` })));
  return (
    <>
      <Cota x1={66} x2={234} y={62} rotulo="A" />
      <g transform="rotate(-6 150 130)">
        <rect x="66" y="78" width="168" height="112" rx="10" className={s.trazo} />
        <rect x="74" y="86" width="152" height="96" rx="6" className={s.fino} />
        {alveolos.map((a, i) => (
          <rect
            key={a.k}
            x={a.x}
            y={a.y}
            width="24"
            height="38"
            rx="12"
            className={i === 7 ? s.vacio : s.trazo}
          />
        ))}
      </g>
      <g transform="rotate(32 222 232)">
        <rect x="172" y="215" width="100" height="34" rx="17" className={s.trazo} />
        <path d="M222 215v34" className={s.trazo} />
        <path d="M189 215h33v34h-33a17 17 0 0 1 0-34Z" className={s.relleno} />
      </g>
      <Llamada x={52} y={238} n="1" a={[112, 170]} />
      <Llamada x={290} y={168} n="2" a={[246, 210]} />
    </>
  );
}

function Dispositivos() {
  return (
    <>
      <Cota x1={46} x2={274} y={44} rotulo="A" />
      <rect x="46" y="58" width="228" height="152" rx="12" className={s.trazo} />
      <rect x="60" y="72" width="156" height="118" rx="4" className={s.fino} />
      <path d="M68 88h40M68 98h24" className={s.fino} />
      <g transform="translate(66 108) scale(1.2)">
        <path d={TRAZO_PULSO} className={s.acento} />
      </g>
      <path d="M68 168h140" className={s.punteado} />
      {[96, 122, 148].map((y) => (
        <circle key={y} cx="245" cy={y} r="7" className={s.trazo} />
      ))}
      <rect x="232" y="168" width="26" height="12" rx="3" className={s.fino} />
      <path d="M150 210v24M112 246h76" className={s.trazo} />
      <rect x="108" y="234" width="84" height="12" rx="6" className={s.trazo} />
      <path d="M46 150c-26 6-30 52 6 66 22 9 26 30 12 44" className={s.fino} />
      <rect x="44" y="258" width="34" height="20" rx="8" className={s.relleno} />
      <Llamada x={292} y={236} n="1" a={[216, 150]} />
      <Llamada x={22} y={110} n="2" a={[60, 262]} />
    </>
  );
}

function Quirurgico() {
  return (
    <>
      <g transform="rotate(-38 160 150)">
        {/* Bisturí */}
        <rect x="52" y="92" width="150" height="16" rx="8" className={s.trazo} />
        <path d="M74 100h24M108 100h6M120 100h6" className={s.fino} />
        <path d="M202 94h34c18 0 30 6 38 16l-72 0Z" className={s.trazo} />
        <path d="M202 102h52" className={s.acento} />
        {/* Tijera quirúrgica */}
        <circle cx="66" cy="178" r="13" className={s.trazo} />
        <circle cx="66" cy="212" r="13" className={s.trazo} />
        <path d="M78 183l58 12M78 207l58-12" className={s.trazo} />
        <path d="M134 191l130-8-128 16M134 199l130 8-128-16" className={s.trazo} />
        <circle cx="138" cy="195" r="4.5" className={s.relleno} />
      </g>
      <Cota x1={40} x2={290} y={278} rotulo="A" />
      <Llamada x={282} y={50} n="1" a={[226, 74]} />
      <Llamada x={40} y={110} n="2" a={[150, 196]} />
    </>
  );
}

function Insumos() {
  return (
    <>
      <g transform="rotate(-24 150 110)">
        {/* Jeringa */}
        <rect x="40" y="96" width="34" height="8" rx="2" className={s.fino} />
        <path d="M74 100h38" className={s.trazo} />
        <rect x="112" y="80" width="8" height="40" rx="2" className={s.trazo} />
        <rect x="120" y="86" width="132" height="28" rx="3" className={s.trazo} />
        <rect x="126" y="89" width="10" height="22" rx="2" className={s.trazo} />
        <rect x="136" y="90" width="78" height="20" className={s.relleno} />
        {[150, 164, 178, 192, 206, 220, 234].map((x, i) => (
          <path key={x} d={`M${x} 86v${i % 2 ? 5 : 9}`} className={s.fino} />
        ))}
        <rect x="252" y="94" width="16" height="12" rx="2" className={s.trazo} />
        <path d="M268 100h50" className={s.acento} />
      </g>
      {/* Rollo de gasa */}
      <circle cx="226" cy="222" r="46" className={s.trazo} />
      <circle cx="226" cy="222" r="30" className={s.fino} />
      <circle cx="226" cy="222" r="12" className={s.trazo} />
      <path d="M180 226H74v38h112" className={s.trazo} />
      <path d="M90 226v38M106 226v38M122 226v38M138 226v38M154 226v38M74 245h106" className={s.punteado} />
      <Cota x1={180} x2={272} y={290} rotulo="A" />
      <Llamada x={44} y={60} n="1" a={[120, 118]} />
      <Llamada x={44} y={196} n="2" a={[96, 240]} />
    </>
  );
}
