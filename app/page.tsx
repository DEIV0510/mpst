import { AvisoPendientes } from "@/components/dev/AvisoPendientes";
import { Cobertura } from "@/components/inicio/Cobertura";
import { Cotizacion } from "@/components/inicio/Cotizacion";
import { Heroe } from "@/components/inicio/Heroe";
import { Nosotros } from "@/components/inicio/Nosotros";
import { Operacion } from "@/components/inicio/Operacion";
import { Soluciones } from "@/components/inicio/Soluciones";
import { Intro } from "@/components/intro/Intro";
import { Cabecera } from "@/components/layout/Cabecera";
import { Pie } from "@/components/layout/Pie";
import { FocoAncla } from "@/components/ui/FocoAncla";
import { Revelador } from "@/components/ui/Revelador";
import { datosOrganizacion } from "@/lib/seo";

export default function Inicio() {
  return (
    <>
      <a href="#contenido" className="salto">
        Saltar al contenido
      </a>
      <Intro />
      <Cabecera />
      <main id="contenido">
        <Heroe />
        <Soluciones />
        <Nosotros />
        <Operacion />
        <Cobertura />
        <Cotizacion />
      </main>
      <Pie />
      <Revelador />
      <FocoAncla />
      <AvisoPendientes />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datosOrganizacion()).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
