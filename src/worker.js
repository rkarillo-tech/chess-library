// Puerta de acceso con usuario y contraseña (autenticación HTTP Basic) delante de la web estática.
// El usuario y la contraseña NO están en el código: se configuran en Cloudflare
// (Workers & Pages → chess-library → Settings → Variables and Secrets):
//   APP_USER      → usuario (texto)
//   APP_PASSWORD  → contraseña (secreto)
// El navegador pide los datos una vez y los recuerda. Cada acceso queda anotado en los registros
// del Worker (pestaña Observability / Logs): fecha, IP, país y usuario.

const REALM = 'Chess Analyzer';

async function sameText(a, b) {
  // Comparación en tiempo constante (vía SHA-256) para no dar pistas por tiempos de respuesta
  const enc = new TextEncoder();
  const [ha, hb] = await Promise.all([crypto.subtle.digest('SHA-256', enc.encode(a)), crypto.subtle.digest('SHA-256', enc.encode(b))]);
  const x = new Uint8Array(ha), y = new Uint8Array(hb);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

function askLogin(msg) {
  return new Response(msg || 'Acceso restringido. Introduce tu usuario y contraseña.', {
    status: 401,
    headers: { 'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`, 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
  });
}

export default {
  async fetch(request, env) {
    const user = env.APP_USER || '', pass = env.APP_PASSWORD || '';
    if (!pass) return new Response('Falta configurar APP_PASSWORD en Cloudflare (Settings → Variables and Secrets).', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });

    const auth = request.headers.get('Authorization') || '';
    const m = auth.match(/^Basic\s+(.+)$/i);
    let u = '', p = '';
    if (m) {
      try {
        const raw = new TextDecoder().decode(Uint8Array.from(atob(m[1]), c => c.charCodeAt(0)));
        const i = raw.indexOf(':');
        u = raw.slice(0, i); p = raw.slice(i + 1);
      } catch (e) { /* cabecera mal formada */ }
    }
    const okUser = await sameText(u, user), okPass = await sameText(p, pass);
    const ok = !!m && okUser && okPass;
    const url = new URL(request.url);
    if (!ok) {
      if (m) console.log(JSON.stringify({ evento: 'acceso-denegado', usuario: u, ip: request.headers.get('CF-Connecting-IP'), pais: request.cf && request.cf.country, ruta: url.pathname }));
      return askLogin();
    }
    if (url.pathname === '/' || url.pathname === '/index.html') {
      console.log(JSON.stringify({ evento: 'acceso', usuario: u, ip: request.headers.get('CF-Connecting-IP'), pais: request.cf && request.cf.country, navegador: request.headers.get('User-Agent') }));
    }
    const res = await env.ASSETS.fetch(request);
    const out = new Response(res.body, res);
    out.headers.set('Cache-Control', 'private, no-cache');
    return out;
  }
};
