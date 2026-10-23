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

## Concepto

**«La infraestructura invisible que hace posible la atención médica».** La línea de ECG del logotipo se convierte en
el signo gráfico de la web: una **ruta** que recorre la portada, conecta las líneas de suministro, sostiene la flota
y cierra el pie. Las fotografías se presentan como **láminas técnicas** (marcas de registro y pie con rótulo), y las
categorías sin fotografía real se ilustran con **dibujos de línea propios** con cotas, como en un plano.

Sistema visual en `app/globals.css`:

| Token | Valor | Uso |
|---|---|---|
| `--azul-800` | `#03256B` | Azul extraído del logotipo oficial: marca, títulos, enlaces |
| `--azul-900` / `--azul-950` | `#031A4A` / `#020F2C` | Secciones oscuras, pie |
| `--verde-600` | `#198A3D` | Verde extraído del logotipo: pulso, acentos |
| `--verde-700` | `#146E31` | Botones y texto verde sobre blanco (contraste 6,4:1) |
| `--gris-50` / `--gris-500` | `#F3F5F7` / `#566274` | Fondos de descanso / texto secundario |

Una sola familia tipográfica (Manrope 400–800), radios pequeños (4/8/14 px), dos niveles de sombra, retícula de 12
columnas y movimiento con `cubic-bezier(.22,1,.36,1)`. Todo respeta `prefers-reduced-motion`.

## Estructura

```
app/            layout (metadatos, fuente, script de la pantalla de carga), página, acción del formulario,
                sitemap, robots, manifest, iconos e imagen Open Graph
components/
  inicio/       Héroe, Soluciones (+ dibujos técnicos), Nosotros, Operación, Cobertura, Cotización (+ formulario)
  layout/       Cabecera (menú móvil con <dialog>), Pie, navegación
  intro/        Pantalla de carga (solo CSS; su ciclo lo controla el script de app/layout.tsx)
  ui/           Botón, Lámina, Ruta, Pulso, iconos, aparición progresiva, foco en anclas
  dev/          Aviso de datos pendientes (solo en `next dev`)
config/sitio.ts Datos comerciales centralizados (contacto, cobertura, datos legales)
content/        Líneas de suministro, principios de marca y proceso de trabajo
lib/            Validación del formulario (cliente y servidor), envío, datos estructurados
assets/medicos  Archivos originales recibidos (sin modificar)
assets/media    Recursos derivados (generados por `npm run media`)
```

## Recursos de la carpeta `medicos`

| Archivo original | Tipo | Uso en la web |
|---|---|---|
| `Logotipo médico MPST con ECG.png` | Logotipo oficial (insignia circular) | Cabecera, pantalla de carga, pie, 404, imagen Open Graph, iconos. Solo se hizo transparente el fondo exterior al anillo; el símbolo (cruz con ECG) recortado del mismo archivo es el favicon. |
| `16. Flotilla corporativa MPST.png` | Lámina del manual de marca (3 vistas + títulos) | Se separaron las tres furgonetas sin los títulos de la lámina: **lateral** en el héroe y en Open Graph; **frontal** y **posterior** en Operación. |
| `Chaleco de seguridad médico azul marino.png` | Aplicación de marca (dotación) | Operación |
| `Polo azul marino con logo médico MPST.png` | Aplicación de marca (dotación) | Nosotros |
| `Camisa Corporativa Médica Blanca con Logotipo.png` | Aplicación de marca (dotación) | Nosotros |
| `Chaqueta corporativa médica azul marino.png` | Aplicación de marca (dotación) | No se usa (evita repetir prendas azules); disponible en `npm run media`. |

La carpeta no contiene fotografías de producto, instalaciones ni personal, documentos comerciales, catálogos ni datos
de contacto. Por eso las categorías llevan dibujos técnicos (no fotos de stock) y los datos de contacto quedan
preparados pero vacíos.

## Datos pendientes (no se inventó ninguno)

Edita `config/sitio.ts`. Lo que esté vacío no aparece en la web, en el pie ni en los datos estructurados:

- Teléfono comercial, correo, WhatsApp empresarial, dirección y ciudad de la sede, horario.
- Ciudades con cobertura confirmada (`cobertura`).
- NIT y URL de la política de tratamiento de datos personales (Ley 1581 de 2012).
- Confirmación de las cuatro líneas de suministro (`content/soluciones.ts`) y, si existen, fotografías reales de
  producto para sustituir los dibujos.

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

## Dominio y SEO

`NEXT_PUBLIC_SITE_URL=https://www.dominio-definitivo.com` activa canonical, `sitemap.xml`, `robots.txt` con sitemap
y las URL absolutas de Open Graph. En Vercel, si no se define, se usa automáticamente el dominio de producción del
proyecto. Los datos estructurados (`Organization`) solo incluyen nombre, razón social, logotipo y URL hasta que se
completen los datos de contacto.

## Pruebas realizadas (23-10-2026)

- `npm run build` y `npm run lint` sin errores ni avisos.
- Revisión visual en 320, 375, 768, 1024, 1280 y 1440 px: sin desbordamiento horizontal.
- Menú móvil (abre, cierra con enlace/Esc, bloquea el fondo, devuelve el foco), enlaces internos con foco, enlace
  «Saltar al contenido», preselección de categoría desde Soluciones y consulta de cobertura que precarga el mensaje.
- Formulario: errores por campo con icono y texto, foco al primer error, formatos de correo y teléfono, aviso honesto
  sin proveedor, error del proveedor (HTTP 500) y envío correcto contra un webhook local de prueba.
- Pantalla de carga con Chrome sin movimiento reducido (logotipo, trazo de ECG, barra y cortina) y sin ella con
  movimiento reducido.
- Lighthouse 13.5 sobre la compilación de producción en local:
  - Escritorio: Rendimiento 100 · Accesibilidad 100 · Buenas prácticas 100 · SEO 100 (LCP 0,6 s, CLS 0).
  - Móvil (simulado, 4G lenta y CPU ×4): Rendimiento 93–94 · Accesibilidad 100 · Buenas prácticas 100 · SEO 100;
    CLS 0, TBT 30–40 ms; **LCP simulado 3,0–3,2 s** (la foto principal pesa ~21 KB; el tiempo lo marca el
    JavaScript base de React/Next que el simulador sitúa antes del pintado). Sin limitación, el LCP observado es ~0,2 s.
