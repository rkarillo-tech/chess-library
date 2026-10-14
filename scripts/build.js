// Prepara la carpeta dist/ que publica Cloudflare: regenera partidas/index.json
// y copia solo los archivos de la web (nada de .git, scripts ni configuración).
// Comando de compilación en Cloudflare: node scripts/build.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), dist = path.join(root, 'dist');
require('./build-index.js');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist);
const PUBLIC = ['index.html', 'partidas', 'Manual de Chess Analyzer.pdf', 'ejemplo-la-inmortal.json', 'prompt-analisis-ajedrez.md', 'README.md'];
let n = 0;
for (const f of PUBLIC) {
  const src = path.join(root, f);
  if (!fs.existsSync(src)) continue;
  fs.cpSync(src, path.join(dist, f), { recursive: true });
  n++;
}
console.log(`dist/ preparado (${n} elementos)`);
