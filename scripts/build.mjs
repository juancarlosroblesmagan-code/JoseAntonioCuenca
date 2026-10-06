import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { renderSEO } from './seo.mjs';

const out = 'dist';
await fs.mkdir(out, { recursive: true });
const html = renderSEO(await fs.readFile('index.html', 'utf8'), process.env.SITE_URL || '');
const sources = [...html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)].map(m => m[1]);
const srcsets = [...html.matchAll(/srcset="([^"]+)"/g)].flatMap(m => m[1].split(',').map(s => s.trim().split(' ')[0]));
for (const src of new Set([...sources, ...srcsets])) {
  await fs.access(`.${src}`).catch(() => { throw new Error(`Missing asset: ${src}`); });
}
await fs.writeFile(`${out}/index.html`, html);
for (const file of ['styles.css', 'modern.css', 'app.js']) await fs.copyFile(file, `${out}/${file}`);
for (const folder of ['images', 'logos', 'fonts']) {
  await fs.mkdir(`${out}/assets/${folder}`, { recursive: true });
  for (const file of await fs.readdir(`assets/${folder}`)) await fs.copyFile(`assets/${folder}/${file}`, `${out}/assets/${folder}/${file}`);
}
await fs.copyFile('assets/favicon.svg', `${out}/assets/favicon.svg`);
await fs.copyFile('.htaccess', `${out}/.htaccess`);
const videos = JSON.parse(await fs.readFile('assets/videos/manifest.json', 'utf8'));
await fs.mkdir(`${out}/assets/videos`, { recursive: true });
for (const video of videos.videos) {
  await fs.copyFile(`.${video.src}`, `${out}${video.src}`);
  if (video.captions) await fs.copyFile(`.${video.captions}`, `${out}${video.captions}`);
}
const backdrop = await sharp('assets/images/joseantoniocuenca-dormitorio-karibian-biosilk-1000.webp').resize(510, 550, { fit: 'cover' }).toBuffer();
const socialOverlay = Buffer.from('<svg width="1200" height="630"><rect width="1200" height="630" fill="#f4f2ed"/><text x="65" y="85" fill="#202521" font-family="Arial,sans-serif" font-size="25">José Antonio Cuenca.</text><text x="65" y="232" fill="#202521" font-family="Arial,sans-serif" font-size="78" letter-spacing="-4">Descanso</text><text x="65" y="328" fill="#806e55" font-family="Georgia,serif" font-style="italic" font-size="96">premium.</text><text x="69" y="415" fill="#202521" font-family="Arial,sans-serif" font-size="24">Gestión comercial especializada.</text><text x="69" y="551" fill="#62645e" font-family="Arial,sans-serif" font-size="17">PARA PROFESIONALES · DESDE 2002</text></svg>');
await sharp(socialOverlay).composite([{ input: backdrop, left: 650, top: 40 }]).jpeg({ quality: 88 }).toFile('assets/images/social.jpg');
await fs.copyFile('assets/images/social.jpg', `${out}/assets/images/social.jpg`);
console.log('Build validado. HOME estática en dist/.');
console.log('SEO: Person, WebSite, WebPage/FAQPage y Service. Tres vídeos a demanda.');
console.log('Propuesta no indexable: pendientes contacto, legales y aprobación de contenidos/medios.');
