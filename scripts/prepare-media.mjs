/**
 * Genera los recursos web a partir de los archivos originales de MPST
 * (assets/medicos/, copia sin modificar de la carpeta «medicos»).
 *
 * Salidas:
 *   assets/media/logo-mpst.png            logotipo oficial completo; solo el fondo
 *                                         exterior al anillo pasa a transparente
 *   assets/media/flota-{lateral,frontal,trasera}.webp
 *                                         cada vista recortada de la lámina
 *                                         «16. Flotilla corporativa» (sin títulos)
 *   assets/media/dotacion-*.webp          prendas de dotación recortadas
 *   app/icon.png, app/favicon.ico         símbolo (cruz con ECG) del logotipo
 *   app/apple-icon.png                    logotipo completo, 180×180
 *   public/icons/icon-{192,512}.png       iconos del manifest
 *   app/opengraph-image.jpg               1200×630
 *
 * El logotipo nunca se redibuja ni se deforma: solo se recorta, se escala
 * proporcionalmente o se coloca sobre un lienzo.
 *
 * Uso: npm run media
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const SRC = "assets/medicos/";
const OUT = "assets/media/";
const LOGO = SRC + "Logotipo médico MPST con ECG.png";
const FLOTA = SRC + "16. Flotilla corporativa MPST.png";
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

await mkdir(OUT, { recursive: true });

/**
 * El fondo de las láminas originales no es blanco puro (ruido 250–255). Se
 * lleva a #fff con una rampa suave (solo píxeles casi blancos) para que las
 * fotos se integren sin bordes visibles sobre las superficies blancas de la web.
 */
async function blanquear(input) {
  const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 3) {
    const m = Math.min(data[i], data[i + 1], data[i + 2]);
    if (m < 238) continue;
    const t = Math.min(1, (m - 238) / 10);
    for (let c = 0; c < 3; c++) data[i + c] = Math.round(data[i + c] + (255 - data[i + c]) * t);
  }
  return sharp(data, { raw: info }).png().toBuffer();
}
await mkdir("public/icons", { recursive: true });

// ── 1. Logotipo: transparente fuera del anillo exterior ────────────────────
// El anillo azul ocupa x 42–1211, y 42–1206 (centro ≈ 626,5 · 624; radio ≈ 584).
const meta = await sharp(LOGO).metadata();
const mascara = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${meta.width}" height="${meta.height}">
     <circle cx="626.5" cy="624.5" r="586.5" fill="#fff"/>
   </svg>`,
);
// sharp aplica extract() antes que composite(): primero la máscara, luego el recorte.
const enmascarado = await sharp(LOGO)
  .ensureAlpha()
  .composite([{ input: mascara, blend: "dest-in" }])
  .png()
  .toBuffer();
const logo = await sharp(
  await sharp(enmascarado).extract({ left: 38, top: 36, width: 1178, height: 1178 }).png().toBuffer(),
)
  .resize({ width: 760, kernel: "lanczos3" })
  .png({ compressionLevel: 9 })
  .toBuffer();
await writeFile(OUT + "logo-mpst.png", logo);

// ── 2. Flota: cada vista por separado ──────────────────────────────────────
// Las vistas lateral y frontal se tocan en x≈646–671: el retrovisor de la
// furgoneta frontal invade el recorte lateral y el paragolpes de la lateral
// invade el frontal. Esas zonas se cubren con el mismo blanco del fondo.
async function vista({ x, y, w, h, tapar = [], escala = 2 }) {
  const parches = tapar.map((r) => ({
    input: { create: { width: r.w, height: r.h, channels: 4, background: WHITE } },
    left: r.x - x,
    top: r.y - y,
  }));
  const recorte = await sharp(FLOTA)
    .extract({ left: x, top: y, width: w, height: h })
    .composite(parches)
    .toBuffer();
  return sharp(await blanquear(recorte))
    .resize({ width: w * escala, kernel: "lanczos3" })
    .sharpen({ sigma: 0.6 })
    .webp({ quality: 90, effort: 6 })
    .toBuffer();
}

await writeFile(
  OUT + "flota-lateral.webp",
  await vista({ x: 0, y: 326, w: 690, h: 500, tapar: [{ x: 646, y: 430, w: 44, h: 110 }, { x: 663, y: 430, w: 27, h: 396 }] }),
);
await writeFile(
  OUT + "flota-frontal.webp",
  await vista({ x: 630, y: 290, w: 490, h: 580, tapar: [{ x: 630, y: 525, w: 42, h: 345 }] }),
);
await writeFile(OUT + "flota-trasera.webp", await vista({ x: 1124, y: 310, w: 519, h: 570 }));

// ── 3. Dotación (prendas sobre fondo blanco) ───────────────────────────────
const prendas = {
  "dotacion-chaleco": "Chaleco de seguridad médico azul marino.png",
  "dotacion-chaqueta": "Chaqueta corporativa médica azul marino.png",
  "dotacion-polo": "Polo azul marino con logo médico MPST.png",
  "dotacion-camisa": "Camisa Corporativa Médica Blanca con Logotipo.png",
};
for (const [nombre, archivo] of Object.entries(prendas)) {
  const buf = await sharp(await blanquear(SRC + archivo))
    .resize({ height: 1100, kernel: "lanczos3" })
    .webp({ quality: 88, effort: 6 })
    .toBuffer();
  await writeFile(OUT + nombre + ".webp", buf);
}

// ── 4. Iconos ──────────────────────────────────────────────────────────────
// Símbolo (cruz con línea de ECG) tal como aparece en el logotipo: x 414–840, y 223–664.
const simbolo = await sharp(LOGO).extract({ left: 404, top: 213, width: 447, height: 462 }).toBuffer();

async function iconoSimbolo(size) {
  const radio = Math.round(size * 0.22);
  const fondo = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radio}" fill="#fff"/></svg>`,
  );
  const s = await sharp(simbolo).resize({ height: Math.round(size * 0.8), kernel: "lanczos3" }).toBuffer();
  return sharp(fondo).composite([{ input: s, gravity: "center" }]).png({ compressionLevel: 9 }).toBuffer();
}

async function iconoLogo(size, aire = 0.05) {
  const lado = Math.round(size * (1 - aire * 2));
  const l = await sharp(logo).resize({ width: lado, kernel: "lanczos3" }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: WHITE } })
    .composite([{ input: l, gravity: "center" }])
    // Paleta indexada: el logotipo tiene pocos colores y el PNG pesa una fracción
    .png({ palette: true, quality: 95, effort: 10, compressionLevel: 9 })
    .toBuffer();
}

await writeFile("app/icon.png", await iconoSimbolo(96));
await writeFile("app/apple-icon.png", await iconoLogo(180));
await writeFile("public/icons/icon-192.png", await iconoLogo(192));
await writeFile("public/icons/icon-512.png", await iconoLogo(512));

// favicon.ico con PNG embebidos (16, 32, 48)
const tamanos = [16, 32, 48];
const pngs = await Promise.all(tamanos.map((s) => iconoSimbolo(s)));
const cabecera = Buffer.alloc(6);
cabecera.writeUInt16LE(0, 0);
cabecera.writeUInt16LE(1, 2);
cabecera.writeUInt16LE(tamanos.length, 4);
let desplazamiento = 6 + 16 * tamanos.length;
const entradas = tamanos.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0);
  e.writeUInt8(s, 1);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(pngs[i].length, 8);
  e.writeUInt32LE(desplazamiento, 12);
  desplazamiento += pngs[i].length;
  return e;
});
await writeFile("app/favicon.ico", Buffer.concat([cabecera, ...entradas, ...pngs]));

// ── 5. Imagen para redes (Open Graph) ──────────────────────────────────────
// Composición sin texto rasterizado: logotipo oficial + vista lateral de la flota.
{
  const W = 1200;
  const H = 630;
  const lienzo = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
       <rect width="${W}" height="${H}" fill="#ffffff"/>
       <rect x="0" y="0" width="430" height="${H}" fill="#f3f5f7"/>
       <rect x="0" y="${H - 14}" width="${W}" height="14" fill="#03256b"/>
       <rect x="0" y="${H - 14}" width="300" height="14" fill="#198a3d"/>
     </svg>`,
  );
  const insignia = await sharp(logo).resize({ width: 330 }).toBuffer();
  const furgon = await sharp(OUT + "flota-lateral.webp").resize({ width: 720 }).toBuffer();
  const og = await sharp(lienzo)
    .composite([
      { input: insignia, left: 50, top: 140 },
      { input: furgon, left: 450, top: 52 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();
  await writeFile("app/opengraph-image.jpg", og);
}

console.log("Recursos generados.");
