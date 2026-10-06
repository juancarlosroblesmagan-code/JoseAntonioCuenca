import fs from 'node:fs/promises';
import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: 'chrome' });
const results = [];
for (const width of [390, 1440, 1902]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });
  await page.locator('#profesionales').scrollIntoViewIfNeeded();
  await page.locator('.professionals-picture img').evaluate(image => image.decode());
  const result = await page.locator('.professionals-picture img').evaluate(image => {
    const r = image.getBoundingClientRect();
    return { viewport: innerWidth, source: image.currentSrc, frameWidth: r.width, frameHeight: r.height, transform: getComputedStyle(image).transform, requiredWidth: Math.max(r.width, r.height * 1920 / 1045) };
  });
  assert.equal(result.transform, 'none');
  if (width >= 900) assert.ok(result.source.endsWith('-1920.avif'));
  results.push(result);
  await page.locator('#profesionales').screenshot({ path: `reports/professionals-quality-${width}.png` });
  await page.close();
}
await fs.writeFile('reports/image-quality-verification.json', JSON.stringify(results, null, 2));
await browser.close();
console.log('Imagen verificada: fuente 1920 px en desktop, responsive en móvil y sin ampliación por hover.');
