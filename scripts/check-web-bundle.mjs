// Presupuestos de transferencia para impedir regresiones silenciosas en móvil.
// Ejecutar después de `npm run web:build`.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const dist = fileURLToPath(new URL('../web/dist/', import.meta.url));
const assets = join(dist, 'assets');

if (!existsSync(dist) || !existsSync(assets)) {
  console.error('✗ Falta web/dist. Ejecuta primero npm run web:build.');
  process.exit(1);
}

const reglas = [
  { nombre: 'aplicación inicial', patron: /^index-[^.]+\.js$/, maxGzip: 120 * 1024 },
  // Recalibrado de 365 a 390 KiB al pasar de 39 a 46 referencias y añadir el
  // atlas explicativo validado de 78 corrientes. Deja menos de 3 % de margen:
  // una nueva expansión seguirá exigiendo división de chunk o poda de datos.
  { nombre: 'resultados y catálogos', patron: /^Resultados-[^.]+\.js$/, maxGzip: 390 * 1024 },
  { nombre: 'visor 3D', patron: /^Mapa3D-[^.]+\.js$/, maxGzip: 300 * 1024 },
];

const ficherosAssets = readdirSync(assets);
const errores = [];
for (const regla of reglas) {
  const candidatos = ficherosAssets.filter((fichero) => regla.patron.test(fichero));
  if (candidatos.length !== 1) {
    errores.push(`${regla.nombre}: se esperaba un chunk y se encontraron ${candidatos.length}`);
    continue;
  }
  const ruta = join(assets, candidatos[0]);
  const gzip = gzipSync(readFileSync(ruta)).byteLength;
  if (gzip > regla.maxGzip) {
    errores.push(
      `${regla.nombre}: ${(gzip / 1024).toFixed(1)} KiB gzip supera ${(regla.maxGzip / 1024).toFixed(0)} KiB`,
    );
  } else {
    console.log(`✓ ${regla.nombre}: ${(gzip / 1024).toFixed(1)} KiB gzip`);
  }
}

function tamanoDirectorio(ruta) {
  return readdirSync(ruta, { withFileTypes: true }).reduce((total, entrada) => {
    const hijo = join(ruta, entrada.name);
    return total + (entrada.isDirectory() ? tamanoDirectorio(hijo) : statSync(hijo).size);
  }, 0);
}

const total = tamanoDirectorio(dist);
const maxTotal = 3.2 * 1024 * 1024;
if (total > maxTotal) {
  errores.push(`PWA completa: ${(total / 1024 / 1024).toFixed(2)} MiB supera 3,20 MiB`);
} else {
  console.log(`✓ PWA completa: ${(total / 1024 / 1024).toFixed(2)} MiB`);
}

if (errores.length > 0) {
  console.error(`✗ Presupuesto web incumplido:\n- ${errores.join('\n- ')}`);
  process.exit(1);
}
