import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

const base = process.env.DEPLOY_URL || 'https://joseantoniocuenca.es';
const results = [];
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
async function verify(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { await verify(file); continue; }
    const relative = path.relative('dist', file).split(path.sep).join('/');
    if (relative.startsWith('api/')) continue; // PHP is executed, never downloaded as source.
    if (relative.startsWith('.')) continue;
    const url = new URL(relative, `${base}/`);
    const response = await fetch(url, { cache: 'no-store' });
    assert.equal(response.status, 200, relative);
    const bytes = Buffer.from(await response.arrayBuffer());
    assert.equal(hash(bytes), hash(await fs.readFile(file)), `${relative}: deployed bytes differ`);
    results.push({ file: relative, status: response.status, bytes: bytes.length, sha256: hash(bytes) });
    if (relative.endsWith('.mp4')) {
      const ranged = await fetch(url, { headers: { Range: 'bytes=0-1023' } });
      assert.equal(ranged.status, 206);
      assert.equal((await ranged.arrayBuffer()).byteLength, 1024);
      assert.match(ranged.headers.get('content-type'), /video\/mp4/);
    }
    if (relative.endsWith('.vtt')) assert.match(response.headers.get('content-type'), /text\/vtt/);
  }
}
await verify('dist');
const html = await (await fetch(`${base}/`)).text();
assert.match(html, /index, follow, max-image-preview:large/);
assert.ok(html.includes(`rel="canonical" href="${base}/"`));
const archive = await fetch(`${base}/backup-web-20261006.zip`);
assert.ok([403, 404].includes(archive.status), 'backup must not be publicly exposed');
await fs.mkdir('reports', { recursive: true });
await fs.writeFile('reports/deployment-verification.json', JSON.stringify({ base, verifiedAt: new Date().toISOString(), results }, null, 2));
console.log(`${results.length} archivos publicados idénticos al build. HTTPS, canonical, indexación autorizada, WebVTT, rangos MP4 y backup no público OK.`);
