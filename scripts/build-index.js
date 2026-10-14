// Genera partidas/index.json con todas las partidas (.json y .pgn), también las de subcarpetas como partidas/mias/.
// Lo ejecuta Cloudflare Pages en cada publicación (comando de compilación: node scripts/build-index.js).
// También se puede lanzar a mano: node scripts/build-index.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', 'partidas');
const games = [];
(function walk(dir, rel) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (e.name.startsWith('.')) continue;
    const r = rel ? rel + '/' + e.name : e.name;
    if (e.isDirectory()) walk(path.join(dir, e.name), r);
    else if (/\.(json|pgn)$/i.test(e.name) && r !== 'index.json') games.push(r);
  }
})(root, '');
fs.writeFileSync(path.join(root, 'index.json'), JSON.stringify({ games }, null, 2) + '\n');
console.log(`partidas/index.json: ${games.length} partidas`);
