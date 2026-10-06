import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const base = process.env.TEST_URL || 'https://joseantoniocuenca.es';
const browser = await chromium.launch({ channel: 'chrome' });
const results = [];
for (const width of [320, 390, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: 844 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await Promise.all([page.waitForResponse(response => response.url().endsWith('/api/contact.php') && response.request().method() === 'GET'), page.locator('[data-open-contact]').click()]);
  const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  assert.deepEqual(axe.violations.map(v => v.id), []);
  assert.equal(await page.locator('#contact-form').evaluate(form => form.checkValidity()), false);
  await page.screenshot({ path: `reports/contact-${width}.png` });
  results.push({ width, axeViolations: 0, requiredValidation: true });
  if (width === 390 && process.argv.includes('--send')) {
    await page.locator('[name=name]').fill('Prueba técnica de la web');
    await page.locator('[name=email]').fill('info@joseantoniocuenca.es');
    await page.locator('[name=company]').fill('Validación del formulario');
    await page.locator('[name=message]').fill('Mensaje de prueba técnica autorizado para verificar el formulario nuevo de joseantoniocuenca.es. No es una consulta comercial. Confirma que lo has recibido; no se ha cambiado la contraseña del correo.');
    await page.locator('[name=consent]').check();
    // The server intentionally rejects submissions faster than two seconds.
    await page.waitForTimeout(2200);
    await page.locator('#contact-form button[type=submit]').click();
    await page.waitForFunction(() => !document.querySelector('#contact-form').hasAttribute('aria-busy'));
    const feedback = await page.locator('#contact-feedback').textContent();
    assert.match(feedback, /Mensaje enviado/);
    results.at(-1).smtpAcceptedTestMessage = true;
    await page.screenshot({ path: 'reports/contact-sent-390.png' });
    console.log('Un mensaje técnico enviado y aceptado por SMTP. La recepción en bandeja debe confirmarla el titular.');
  }
  await context.close();
}
const tokenResponse = await fetch(`${base}/api/contact.php`);
const { token } = await tokenResponse.json();
assert.ok(token);
const forbidden = await fetch(`${base}/api/contact.php`, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://not-authorized.invalid' }, body: JSON.stringify({ token }) });
assert.equal(forbidden.status, 403);
const invalid = await fetch(`${base}/api/contact.php`, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: base }, body: JSON.stringify({ token, name: [], email: 'invalid' }) });
assert.equal(invalid.status, 422);
const configResponse = await fetch(`${base}/contact-config.php`);
assert.ok([403, 404].includes(configResponse.status));
const library = await fetch(`${base}/api/lib/PHPMailer.php`);
assert.equal(library.status, 403);
const installer = await fetch(`${base}/cuenca-config-import.php`);
assert.equal(installer.status, 404);
await browser.close();
await fs.writeFile('reports/contact-verification.json', JSON.stringify({ base, testedAt: new Date().toISOString(), results, originValidation: 403, inputValidation: 422, privateConfigNotPublic: true, libraryNotPublic: true, installerRemoved: true }, null, 2));
console.log('Formulario: responsive, accesibilidad, validación y protección de credenciales OK.');
