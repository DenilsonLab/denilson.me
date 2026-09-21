// Convierte los PNG pesados del sitio a WebP (menor tamaño, misma calidad visual).
// Uso: node scripts/convert-images.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// [origen, destino, calidad]
const targets = [
  ["src/assets/Accounty.png", "src/assets/Accounty.webp", 82],
  ["src/assets/InvoiceGen Pro.png", "src/assets/InvoiceGen Pro.webp", 82],
  ["src/assets/profile.png", "src/assets/profile.webp", 85],
];

for (const [from, to, quality] of targets) {
  const src = path.join(root, from);
  const dest = path.join(root, to);
  const info = await sharp(src).webp({ quality }).toFile(dest);
  console.log(`${to}  ->  ${Math.round(info.size / 1024)} KB`);
}
