# MPST — Sitio web corporativo

Web comercial de **MPST — Medical Products & Solutions Team S.A.S.**, distribuidora de productos médicos en Colombia.
Página única orientada a solicitudes de cotización.

- **Stack:** Next.js 16 (App Router, página estática) · React 19 · TypeScript · CSS Modules con variables · `next/image` + `sharp`.
- **Sin dependencias de terceros en el navegador:** sin librerías de animación ni de iconos, sin scripts externos. Fuente Manrope autoalojada con `next/font`.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
npm run media      # regenera imágenes e iconos desde assets/medicos
```

## Diseño y estructura

Estructura de portal corporativo de distribución farmacéutica (tomando como referencia la organización de páginas
como cencora.com y zuelligpharma.com, sin copiar sus textos, imágenes ni identidad): la marca, los colores, el
logotipo y las fotografías son los de MPST.

1. **Cabecera**: barra de utilidades (escritorio), logotipo, menú con desplegable de *Soluciones* (cuatro líneas con
   icono y descripción) y botón «Solicitar cotización». En móvil, menú a pantalla completa con submenú.
2. **Portada**: titular a lo ancho sobre fondo tintado; debajo, collage de fotografías redondeadas de la flota, texto,
   botones y tres datos breves verificables.
3. **Soluciones**: banda azul con las cuatro líneas en tarjetas (icono de línea, descripción y «Solicitar información»).
4. **Por qué MPST**: presentación de la empresa, dotación del equipo y los cuatro valores de la marca en columnas.
5. **Operación**: historia destacada con flota y dotación + «Cómo trabajamos» en cuatro pasos.
6. **MPST de un vistazo**: panel con la presencia en Colombia y consulta de cobertura junto a tarjetas de datos
   confirmados (sin cifras inventadas; preparado para añadirlas en `content/marca.ts`).
7. **¿Cómo podemos ayudarte?**: panel azul con el formulario de cotización y los canales directos.
8. **Pie** corporativo con soluciones, empresa, contacto y datos legales.

Sistema visual en `app/globals.css`:

| Token | Valor | Uso |
|---|---|---|
| `--azul-800` | `#03256B` | Azul extraído del logotipo oficial: marca, titulares, botones, banda de soluciones |
| `--azul-900` | `#021C52` | Pie |
| `--azul-50` / `--azul-100` | `#F2F6FC` / `#E3EBF7` | Fondos tintados (portada, operación) |
| `--verde-600` / `--verde-700` | `#198A3D` / `#146E31` | Verde del logotipo: iconos y acentos |
| `--verde-50` | `#EFF8F2` | Panel «de un vistazo» |
| `--texto-2` | `#4B596D` | Texto secundario (7:1 sobre blanco) |

Manrope con titulares de peso medio (500), radios de 10/18/28 px, botones en píldora, iconos de línea propios
(`components/ui/IconosLinea.tsx`) y movimiento con `cubic-bezier(.22,1,.36,1)`. Todo respeta `prefers-reduced-motion`.

## Estructura del código

```
app/            layout (metadatos, fuente, script de la pantalla de carga), página, acción del formulario,
                sitemap, robots, manifest, iconos e imagen Open Graph
components/
  inicio/       Héroe, Soluciones, Nosotros, Operación, Cobertura (+ consulta), Cotización (+ formulario)
  layout/       Cabecera (desplegable de soluciones y menú móvil con <dialog>), Pie, botón de WhatsApp, navegación
  intro/        Pantalla de carga (solo CSS; su ciclo lo controla el script de app/layout.tsx)
  ui/           Botón, iconos, iconos de línea, pulso, aparición progresiva, foco en anclas
  dev/          Aviso de datos pendientes (solo en `next dev`)
config/sitio.ts Datos comerciales centralizados (contacto, cobertura, datos legales)
content/        Líneas de suministro, valores, proceso y panel «de un vistazo»
lib/            Validación del formulario (cliente y servidor), envío, datos estructurados
assets/medicos  Archivos originales recibidos (sin modificar)
assets/media    Recursos derivados (generados por `npm run media`)
```

## Recursos de la carpeta `medicos`

| Archivo original | Tipo | Uso en la web |
|---|---|---|
| `Logotipo médico MPST con ECG.png` | Logotipo oficial (insignia circular) | Cabecera, pantalla de carga, pie, 404, imagen Open Graph, iconos. Solo se hizo transparente el fondo exterior al anillo; el símbolo (cruz con ECG) recortado del mismo archivo es el favicon. |
| `16. Flotilla corporativa MPST.png` | Lámina del manual de marca (3 vistas + títulos) | Se separaron las tres furgonetas sin los títulos de la lámina: **lateral** y **posterior** en el collage de la portada (la lateral también en Open Graph); **frontal** en Operación. |
| `Chaleco de seguridad médico azul marino.png` | Aplicación de marca (dotación) | Operación |
| `Polo azul marino con logo médico MPST.png` | Aplicación de marca (dotación) | Nosotros |
| `Camisa Corporativa Médica Blanca con Logotipo.png` | Aplicación de marca (dotación) | Nosotros |
| `Chaqueta corporativa médica azul marino.png` | Aplicación de marca (dotación) | No se usa (evita repetir prendas azules); disponible en `npm run media`. |

La carpeta no contiene fotografías de producto, instalaciones ni personal, documentos comerciales, catálogos ni datos
de contacto. Por eso las categorías llevan iconos de línea (no fotos de stock) y los datos de contacto quedan
preparados pero vacíos. Para acercarse aún más a las webs de referencia, que se apoyan en fotografía de personas y
operaciones, conviene sumar fotos reales de MPST (bodega, equipo, entregas).

## Datos pendientes (no se inventó ninguno)

Edita `config/sitio.ts`. Lo que esté vacío no aparece en la web, en el pie ni en los datos estructurados:

- Teléfono comercial, correo, WhatsApp empresarial, dirección y ciudad de la sede, horario.
- Ciudades con cobertura confirmada (`cobertura`).
- NIT y URL de la política de tratamiento de datos personales (Ley 1581 de 2012).
- Confirmación de las cuatro líneas de suministro (`content/soluciones.ts`) y, si existen, fotografías reales de
  producto, bodega o equipo.
- Cifras reales para el panel «MPST de un vistazo» (clientes, ciudades, vehículos…), solo si la empresa las confirma.

En `npm run dev` aparece un aviso en la esquina con la lista de lo que falta.

## Formulario de cotización

`app/acciones.ts` (Server Action) valida en el servidor con las mismas reglas que el navegador (`lib/cotizacion.ts`)
y entrega la solicitud con `lib/envio.ts`. **Solo muestra «Solicitud enviada» cuando el proveedor confirma la
recepción.** Sin proveedor configurado, el visitante ve «El envío en línea todavía no está habilitado. Tus datos no se
han enviado» y sus datos permanecen en el formulario.

Configura **una** opción en las variables de entorno (ver `.env.example`; en Vercel: *Settings → Environment Variables*):

**A) Webhook** (Make, Zapier, n8n, Google Apps Script, Formspree, CRM…)

```
COTIZACION_WEBHOOK_URL=https://…
COTIZACION_WEBHOOK_TOKEN=…        # opcional: se envía como Authorization: Bearer
```

Recibe un `POST` con este JSON (respuesta 2xx = enviado; cualquier otra = error visible):

```json
{
  "origen": "Formulario de cotización — sitio web MPST",
  "fecha": "2026-10-23T19:38:08.478Z",
  "nombre": "…", "empresa": "…", "correo": "…", "telefono": "…",
  "categoria": "Insumos hospitalarios",
  "mensaje": "…",
  "autorizaTratamientoDatos": true
}
```

**B) Correo con [Resend](https://resend.com)** (dominio remitente verificado)

```
RESEND_API_KEY=…
COTIZACION_CORREO_DESTINO=ventas@…        # admite varios separados por coma
COTIZACION_CORREO_REMITENTE=Web MPST <web@…>
```

Protecciones incluidas: validación en servidor, campo trampa contra robots, límite de longitud y comprobación de
origen de Next.js. No incluye limitación de frecuencia por IP (requiere un almacén externo).

## Móvil

- Portada: titular, texto y botones antes del collage; el botón «Solicitar cotización» se ve sin desplazarse.
- Soluciones y valores con el icono a la izquierda del texto para tarjetas más bajas.
- Cotización: las pistas para el mensaje van en el texto de ejemplo del campo y el formulario aparece antes.
- Menú a pantalla completa con `<dialog>` y submenú de soluciones, desplazable en horizontal; cuando haya WhatsApp o
  teléfono confirmados, muestra accesos directos y aparece un botón flotante de WhatsApp
  (`components/layout/BotonWhatsApp.tsx`).

## Dominio y SEO

`NEXT_PUBLIC_SITE_URL=https://www.dominio-definitivo.com` activa canonical, `sitemap.xml`, `robots.txt` con sitemap
y las URL absolutas de Open Graph. En Vercel, si no se define, se usa automáticamente el dominio de producción del
proyecto. Los datos estructurados (`Organization`) solo incluyen nombre, razón social, logotipo y URL hasta que se
completen los datos de contacto.

## Pruebas realizadas (rediseño corporativo, 28-10-2026)

- `npm run build`, `npm run lint` y `npm run typecheck` sin errores ni avisos.
- Revisión visual de la página completa en 320, 375, 768 y 1440 px: sin desbordamiento horizontal.
- Desplegable de Soluciones (abre, cierra con Esc devolviendo el foco, con clic fuera y al elegir una línea), menú
  móvil con submenú, preselección de categoría, consulta de cobertura que precarga el mensaje y validación del
  formulario.
- Envío del formulario: aviso honesto sin proveedor, error del proveedor (HTTP 500) y envío correcto contra un
  webhook local de prueba (verificado antes del rediseño; la lógica del formulario no cambió).
- Lighthouse 13.5 sobre la compilación de producción en local:
  - Escritorio: Rendimiento 100 · Accesibilidad 100 · Buenas prácticas 100 · SEO 100 (LCP 0,7 s, CLS 0).
  - Móvil (simulado, 4G lenta y CPU ×4, tres ejecuciones): Rendimiento 94–95 · Accesibilidad 100 · Buenas
    prácticas 100 · SEO 100; CLS 0, TBT 30 ms; **LCP simulado 2,9–3,1 s** (la foto principal pesa ~21 KB; el tiempo
    lo marca el JavaScript base de React/Next que el simulador sitúa antes del pintado).
