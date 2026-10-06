import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))));
assert.equal(await page.locator('body').evaluate(el => el.classList.contains('motion-ready')), true);
await page.locator('.kinetic-bridge').scrollIntoViewIfNeeded();
await page.waitForFunction(() => document.querySelector('.kinetic-bridge').style.getPropertyValue('--bridge-shift') !== '');
const shift = await page.locator('.kinetic-bridge').evaluate(el => el.style.getPropertyValue('--bridge-shift'));
assert.ok(shift);
for (const element of await page.locator('.reveal').all()) {
  await element.scrollIntoViewIfNeeded();
  await page.waitForFunction(node => node.classList.contains('is-visible'), await element.elementHandle());
  await page.evaluate(() => Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))));
}
assert.equal(await page.locator('.reveal:not(.is-visible)').count(), 0);
await page.locator('#novedades').scrollIntoViewIfNeeded();
await page.screenshot({ path: 'reports/journal-motion-1440.png' });
await page.evaluate(() => window.scrollTo(0, 0));
await page.evaluate(() => Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))));
await page.screenshot({ path: 'reports/hero-motion-1440.png' });
await page.emulateMedia({ reducedMotion: 'reduce' });
const animations = await page.evaluate(() => ({ active: document.getAnimations().filter(a => a.playState === 'running').length, heroTransform: getComputedStyle(document.querySelector('.hero-image img')).transform, sealTransform: getComputedStyle(document.querySelector('.hero-seal svg')).transform }));
assert.equal(animations.active, 0);
assert.equal(animations.heroTransform, 'none');
assert.equal(animations.sealTransform, 'none');
await fs.writeFile('reports/motion-verification.json', JSON.stringify({ scrollMotion: 'OK', reveals: 'OK', reducedMotion: animations }, null, 2));
await browser.close();
console.log('Movimiento normal, reveal completo y prefers-reduced-motion verificados.');
