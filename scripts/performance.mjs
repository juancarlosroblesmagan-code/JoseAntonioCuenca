import fs from 'node:fs/promises';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

await fs.mkdir('reports', { recursive: true });
const chrome = await launch({ chromeFlags: ['--headless', '--disable-gpu'], ...(process.env.CHROME_PATH ? { chromePath: process.env.CHROME_PATH } : {}) });
try {
  for (const mode of ['mobile', 'desktop']) {
    const config = { extends: 'lighthouse:default', settings: mode === 'desktop' ? { formFactor: 'desktop', screenEmulation: { mobile: false, width: 1440, height: 1000, deviceScaleFactor: 1, disabled: false }, throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1, requestLatencyMs: 0, downloadThroughputKbps: 0, uploadThroughputKbps: 0 } } : {} };
    const result = await lighthouse(process.env.TEST_URL || 'http://localhost:4173', { port: chrome.port, output: ['html','json'], logLevel: 'error' }, config);
    await fs.writeFile(`reports/lighthouse-${mode}.html`, result.report[0]);
    await fs.writeFile(`reports/lighthouse-${mode}.json`, result.report[1]);
    const lhr = result.lhr;
    console.log(mode, JSON.stringify({ scores: Object.fromEntries(Object.entries(lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)])), metrics: Object.fromEntries(['first-contentful-paint','largest-contentful-paint','cumulative-layout-shift','total-blocking-time','speed-index'].map(key => [key, lhr.audits[key].displayValue])), failed: Object.values(lhr.audits).filter(a => a.score !== null && a.score < 1 && a.scoreDisplayMode === 'binary').map(a => ({ id: a.id, title: a.title })) }, null, 2));
  }
} finally { await chrome.kill(); }
