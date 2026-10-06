import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({ channel: 'chrome' });
for (const width of [320, 390, 768, 1024, 1201, 1440, 1920]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  await page.goto(process.env.TEST_URL || 'http://localhost:4173');
  await page.evaluate(() => document.fonts.ready);
  await page.locator('footer').scrollIntoViewIfNeeded();
  const layout = await page.locator('.footer-bottom').evaluate(el => ({
    overflow: document.documentElement.scrollWidth > innerWidth,
    centers: [...el.children].filter(node => getComputedStyle(node).display !== 'none').map(node => { const r = node.getBoundingClientRect(); return r.top + r.height / 2; })
  }));
  assert.equal(layout.overflow, false, `${width}: overflow`);
  if (width >= 1201) assert.ok(Math.max(...layout.centers) - Math.min(...layout.centers) < 1, `${width}: footer must be one row`);
  if ([390, 1440].includes(width)) await page.locator('footer').screenshot({ path: `reports/footer-current-${width}.png` });
  await page.close();
}
await browser.close();
console.log('Footer: una línea en escritorio y sin desbordamientos en siete anchuras.');
