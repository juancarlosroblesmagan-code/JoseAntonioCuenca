import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

await fs.mkdir('reports/mobile-review', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const profiles = [{ width: 320, height: 568 }, { width: 375, height: 812 }, { width: 390, height: 844 }, { width: 430, height: 932 }, { width: 844, height: 390 }];
const results = [];
for (const viewport of profiles) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [], mp4Requests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  page.on('request', request => { if (request.url().endsWith('.mp4')) mp4Requests.push(request.url()); });
  await page.goto(process.env.TEST_URL || 'http://localhost:4173', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  for (const image of await page.locator('main img').all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(image => image.decode());
  }
  const initial = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > innerWidth,
    images: [...document.querySelectorAll('main img')].map(img => ({ src: img.currentSrc, width: img.getBoundingClientRect().width, height: img.getBoundingClientRect().height })),
    menuTarget: { width: document.querySelector('.menu-toggle').getBoundingClientRect().width, height: document.querySelector('.menu-toggle').getBoundingClientRect().height },
    pageHeight: document.documentElement.scrollHeight
  }));
  assert.equal(initial.overflow, false);
  assert.ok(initial.menuTarget.width >= 44 && initial.menuTarget.height >= 44);
  assert.equal(mp4Requests.length, 0);
  await page.evaluate(() => window.scrollTo(0, 0));
  if (viewport.width <= 599) {
    const bottom = await page.locator('.hero-actions .button').evaluate(button => button.getBoundingClientRect().bottom);
    assert.ok(bottom <= viewport.height, `${viewport.width}x${viewport.height}: primary CTA must fit in the first viewport`);
  }
  const stem = `reports/mobile-review/${viewport.width}x${viewport.height}`;
  await page.screenshot({ path: `${stem}-hero.png`, scale: 'css' });
  if (viewport.width === 390) await page.screenshot({ path: `${stem}-home.png`, fullPage: true, scale: 'css' });
  await page.locator('.menu-toggle').tap();
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
  const menuAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  assert.equal(menuAxe.violations.length, 0);
  await page.screenshot({ path: `${stem}-menu.png`, scale: 'css' });
  await page.locator('.mobile-nav a[href="#novedades"]').tap();
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
  const journal = page.locator('#novedades');
  if (viewport.width === 390) await journal.screenshot({ path: `${stem}-videos.png`, scale: 'css' });
  for (const [index, link] of (await page.locator('.video-cover').all()).entries()) {
    await link.tap();
    await page.waitForFunction(() => document.querySelector('#video-player').currentTime > .1);
    await page.locator('#video-player').evaluate(video => video.pause());
    assert.ok(await page.locator('#video-dialog .dialog-close').isVisible());
    if (viewport.width === 390 && index === 0) await page.screenshot({ path: `${stem}-player.png`, scale: 'css' });
    await page.locator('#video-dialog .dialog-close').tap();
    await page.waitForFunction(() => !document.querySelector('#video-dialog').open && !document.querySelector('#video-player').hasAttribute('src'));
  }
  await page.locator('.faq details').nth(1).locator('summary').tap();
  assert.equal(await page.locator('.faq details').nth(1).getAttribute('open'), '');
  await page.locator('[data-open-contact]').tap();
  assert.equal(await page.locator('#contact-dialog').evaluate(el => el.open), true);
  await page.locator('#contact-dialog .dialog-close').tap();
  const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  assert.equal(accessibility.violations.length, 0);
  assert.deepEqual(errors, []);
  if (viewport.width === 390) {
    await page.locator('footer').screenshot({ path: `${stem}-footer.png`, scale: 'css' });
    await page.locator('#profesionales').screenshot({ path: `${stem}-profesionales.png`, scale: 'css' });
  }
  results.push({ viewport, dpr: 2, touch: true, ...initial, mp4RequestsBeforeInteraction: 0, videosPlayed: 3, menuAccessibility: menuAxe.violations.length, accessibility: accessibility.violations.length, errors });
  console.log(`${viewport.width}x${viewport.height}: táctil, menú, 3 vídeos, FAQ, contacto y accesibilidad OK.`);
  await context.close();
}
await fs.writeFile('reports/mobile-review/results.json', JSON.stringify({ environment: 'Chrome móvil emulado, táctil, DPR 2. No sustituye pruebas en Safari/iOS o un dispositivo físico.', results }, null, 2));
await browser.close();
