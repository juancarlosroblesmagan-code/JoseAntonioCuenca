import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const base = process.env.TEST_URL || 'http://localhost:4173';
const browser = await chromium.launch({ channel: 'chrome' });
const results = [];
for (const width of [390, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  for (const path of ['/', '/aviso-legal.html', '/privacidad.html', '/cookies.html']) {
    const response = await page.goto(base + path, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.equal(await page.locator('h1').count(), 1);
    if (path !== '/') {
      assert.ok((await page.locator('main').textContent()).includes('44393436D'));
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      assert.deepEqual(axe.violations.map(v => v.id), []);
      if (path === '/privacidad.html') assert.match(await page.locator('main').textContent(), /máximo tres meses desde su recepción/);
      if (width === 390 && path === '/aviso-legal.html') await page.screenshot({ path: 'reports/legal-390.png', fullPage: true });
    }
    assert.equal((await context.cookies()).length, 0);
    assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length), 0);
  }
  assert.deepEqual(errors, []);
  results.push({ width, legalPages: 3, axeViolations: 0, cookies: 0, browserStorage: 0, consoleErrors: 0 });
  await context.close();
}
if (base.startsWith('https:')) {
  const response = await fetch(base);
  assert.match(response.headers.get('content-security-policy') || '', /frame-ancestors 'none'/);
  assert.match(response.headers.get('strict-transport-security') || '', /max-age=31536000/);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(response.headers.get('x-frame-options'), 'DENY');
  const html = await response.text();
  assert.match(html, /index, follow, max-image-preview:large/);
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
  const person = graph.find(e => e['@type'] === 'Person');
  assert.equal(person.telephone, '+34615559577');
  assert.equal(person.name, 'José Antonio Cuenca Gómez');
  assert.equal(person.email, 'info@joseantoniocuenca.es');
  for (const path of ['/robots.txt', '/sitemap.xml', '/llms.txt', '/favicon.ico', '/assets/favicon-descanso.svg', '/assets/apple-touch-icon.png']) assert.equal((await fetch(base + path)).status, 200, path);
  for (const path of ['/.env', '/.user.ini', '/.git/config', '/contact-config.php']) assert.ok([403, 404].includes((await fetch(base + path)).status), path);
}
await browser.close();
await fs.writeFile('reports/release-verification.json', JSON.stringify({ base, testedAt: new Date().toISOString(), results }, null, 2));
console.log('Legales, privacidad 3 meses, accesibilidad, favicon y ausencia de cookies/almacenamiento verificados. En HTTPS: cabeceras de seguridad, Schema, sitemap y rastreo.');
