import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { sitio } from "@/config/sitio";
import "./globals.css";

/** Una sola familia: grotesca geométrica, técnica y legible, afín a las letras del logotipo. */
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--f-manrope",
});

const titulo = "MPST — Distribución de productos médicos en Colombia";
const descripcion =
  "Distribución de medicamentos, dispositivos médicos, material quirúrgico e insumos hospitalarios para instituciones y profesionales de la salud en Colombia.";

export const metadata: Metadata = {
  ...(sitio.dominio ? { metadataBase: new URL(sitio.dominio), alternates: { canonical: "/" } } : {}),
  title: {
    default: titulo,
    template: `%s · ${sitio.marca}`,
  },
  description: descripcion,
  applicationName: sitio.marca,
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: `${sitio.marca} — ${sitio.razonSocial}`,
    title: titulo,
    description: descripcion,
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: descripcion,
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/**
 * Se ejecuta antes del primer pintado y solo en cargas completas.
 * Pantalla de carga (html.intro-activa):
 * - No aparece si ya se vio en esta sesión ni con movimiento reducido.
 * - Se retira en cuanto la fuente y la imagen principal están listas; solo
 *   espera lo justo para que el logotipo complete su entrada (~0,75 s desde
 *   el inicio de la navegación) y nunca más de 1,4 s tras recibir la página.
 * - Si algo falla, una animación CSS la retira a los 3 s (Intro.module.css).
 * - html.intro-vista queda puesta al terminar para que las entradas de la
 *   portada que empezaron con la cortina no se corten.
 */
const scriptInicial = `(function(){var d=document.documentElement;
var reducido=false;try{reducido=matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){}
var visto=false;try{visto=sessionStorage.getItem('mpst-intro')==='1';}catch(e){}
if(visto||reducido)return;
d.classList.add('intro-activa');
function quitar(){d.classList.remove('intro-activa','intro-sale');d.classList.add('intro-vista');}
function salir(){if(d.classList.contains('intro-sale'))return;
try{sessionStorage.setItem('mpst-intro','1');}catch(e){}
var falta=Math.max(0,750-performance.now());
setTimeout(function(){d.classList.add('intro-sale');setTimeout(quitar,650);},falta);}
var tope=setTimeout(salir,1400);
document.addEventListener('DOMContentLoaded',function(){
if(!document.getElementById('intro')){clearTimeout(tope);quitar();return;}
var esperas=[];if(document.fonts&&document.fonts.ready)esperas.push(document.fonts.ready);
var img=document.querySelector('img[data-lcp]');
if(img&&!img.complete)esperas.push(new Promise(function(r){img.addEventListener('load',r,{once:true});img.addEventListener('error',r,{once:true});}));
Promise.all(esperas).then(function(){clearTimeout(tope);salir();},function(){clearTimeout(tope);salir();});},{once:true});
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={manrope.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptInicial }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
