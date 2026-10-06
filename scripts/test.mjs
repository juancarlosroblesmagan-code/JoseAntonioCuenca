import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

await fs.mkdir('reports', { recursive: true });
const browser = await chromium.launch({ ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
const widths = [320, 375, 390, 430, 768, 1024, 1366, 1440, 1920, 2560];
const results = [];
for (const width of widths) {
  const context = await browser.newContext({ viewport: { width, height: width < 600 ? 844 : 1000 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  if (!process.env.TEST_URL) await page.route('**/api/contact.php', route => route.fulfill({ json: { token: 'mock-token-local-no-email' } }));
  const errors = [];
  const videoRequests = [];
  page.on('request', request => { if (request.url().endsWith('.mp4')) videoRequests.push(request.url()); });
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', res => { if (res.status() >= 400) errors.push(`${res.status()} ${res.url()}`); });
  await page.goto(process.env.TEST_URL || 'http://localhost:4173', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  for (const section of await page.locator('main > section').all()) await section.scrollIntoViewIfNeeded();
  const data = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > innerWidth,
    brokenImages: [...document.images].filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src),
    missingAnchors: [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href')).filter(href => !document.getElementById(href.slice(1))),
    h1: document.querySelectorAll('h1').length,
    externalResources: performance.getEntriesByType('resource').filter(r => !r.name.startsWith(location.origin)).map(r => r.name),
    overflowElements: [...document.querySelectorAll('body *')].filter(el => el.getBoundingClientRect().right > innerWidth + 1 && getComputedStyle(el).position !== 'absolute').slice(0, 10).map(el => el.className)
  }));
  assert.equal(data.overflow, false, `${width}: overflow ${data.overflowElements}`);
  assert.deepEqual(data.brokenImages, [], `${width}: broken images`);
  assert.deepEqual(data.missingAnchors, [], `${width}: broken anchors`);
  assert.equal(data.h1, 1);
  assert.deepEqual(errors, [], `${width}: console/network errors`);
  assert.deepEqual(videoRequests, [], `${width}: no video downloads before user interaction`);
  assert.equal(await page.locator('.video-film').count(), 3);
  if (width <= 1200) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.locator('.menu-toggle').click();
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
    await page.keyboard.press('Shift+Tab');
    assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), 'Contacto ↗');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
    await page.locator('.menu-toggle').click();
    await page.locator('.mobile-nav a[href="#marcas"]').click();
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
  }
  await page.locator('.faq details').nth(1).locator('summary').click();
  assert.equal(await page.locator('.faq details').nth(1).getAttribute('open'), '');
  await page.locator('[data-open-contact]').click();
  assert.equal(await page.locator('#contact-dialog').evaluate(el => el.open), true);
  await page.keyboard.press('Escape');
  if ([390, 1440].includes(width)) {
    for (const link of await page.locator('.video-cover').all()) {
      await link.click();
      assert.equal(await page.locator('#video-dialog').evaluate(el => el.open), true);
      await page.waitForFunction(() => document.querySelector('#video-player').readyState >= 2);
      await page.waitForFunction(() => document.querySelector('#video-player').currentTime > .1);
      await page.locator('#video-player').evaluate(video => new Promise(resolve => { video.pause(); video.addEventListener('seeked', resolve, { once: true }); video.currentTime = video.duration / 2; }));
      await page.keyboard.press('Escape');
      await page.waitForFunction(() => !document.querySelector('#video-dialog').open && !document.querySelector('#video-player').hasAttribute('src'));
      assert.equal(await page.locator('#video-player').getAttribute('src'), null);
    }
  }
  await page.locator('[data-legal="cookies"]').click();
  assert.equal(await page.locator('#legal-dialog').evaluate(el => el.open), true);
  await page.keyboard.press('Escape');
  const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
  const violations = accessibility.violations.map(v => ({ id: v.id, impact: v.impact, description: v.description, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }));
  results.push({ width, ...data, errors, violations });
  if ([390, 768, 1440].includes(width)) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `reports/home-${width}.png`, fullPage: true });
    await page.screenshot({ path: `reports/hero-${width}.png` });
  }
  console.log(`${width}px: overflow=${data.overflow}, images=OK, errors=${errors.length}, axe=${violations.length}`);
  await context.close();
}
const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
const noJsPage = await noJs.newPage();
await noJsPage.goto('http://localhost:4173');
assert.equal(await noJsPage.locator('h1').isVisible(), true);
assert.equal(await noJsPage.locator('#brands-title').isVisible(), true);
assert.equal(await noJsPage.locator('.video-cover[href$=".mp4"]').count(), 3);
await noJs.close();
await fs.writeFile('reports/responsive-accessibility.json', JSON.stringify(results, null, 2));
await browser.close();
assert.equal(results.flatMap(r => r.violations).length, 0, 'Accessibility violations: see reports/responsive-accessibility.json');
console.log('Validado: responsive, navegación, FAQ, modales, imágenes, consola y accesibilidad automatizada.');
