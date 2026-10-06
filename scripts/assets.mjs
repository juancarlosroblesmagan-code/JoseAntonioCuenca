import fs from 'node:fs/promises';
import sharp from 'sharp';

const photos = {
  hero: 'https://karibiandescanso.com/wp-content/uploads/2017/03/BIOSILK-PORTADA-1.jpg',
  bedroom: 'https://karibiandescanso.com/wp-content/uploads/2024/05/ELASTEX-PORTADA.jpg',
  craft: 'https://karibiandescanso.com/wp-content/uploads/2018/08/AGUJA-MAQUINA.jpg',
  sofa: 'https://torresolpiel.com/wp-content/uploads/2025/03/sofa-torresol-vejer-vertical-1.jpg',
  textile: 'https://karibiandescanso.com/wp-content/uploads/2017/03/Colchon-Biosilk-1-1.jpg',
  interior: 'https://torresolpiel.com/wp-content/uploads/2023/02/sofa-meridien-vejer-torresol-verde-slider.jpg'
};
const names = {
  hero: 'joseantoniocuenca-dormitorio-karibian-biosilk',
  bedroom: 'joseantoniocuenca-colchon-karibian-elastex',
  craft: 'joseantoniocuenca-fabricacion-karibian-costura',
  sofa: 'joseantoniocuenca-sofa-torresol-vejer',
  textile: 'joseantoniocuenca-tejido-karibian-biosilk',
  interior: 'joseantoniocuenca-ambiente-sofas-torresol'
};
const logos = {
  karibian: 'https://karibiandescanso.com/wp-content/uploads/2020/08/KARIBIANLOGOBLACK.png',
  torresol: 'https://torresolpiel.com/wp-content/uploads/2021/05/torresol-logo2x-negro.png',
  ivorimatex: 'https://ivorimatex.com/wp-content/uploads/2022/05/logo_ivorimatex2021.fw_.png',
  bsensible: 'https://bsensible.com/wp-content/uploads/2024/07/Logo-BSENSIBLE-1.png'
};
await fs.mkdir('assets/images', { recursive: true });
await fs.mkdir('assets/logos', { recursive: true });
await fs.mkdir('assets/fonts', { recursive: true });
await fs.mkdir('assets/originals', { recursive: true });
async function download(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status}: ${url}`);
  return Buffer.from(await r.arrayBuffer());
}
await Promise.all(Object.entries(photos).map(async ([name, url]) => {
  const file = `assets/originals/${name}-${url.split('/').at(-1)}`;
  let data;
  try { data = await fs.readFile(file); } catch { data = await download(url); await fs.writeFile(file, data); }
  const meta = await sharp(data).metadata();
  console.log(name, meta.width, meta.height);
  for (const width of [480, 800, 1000, 1280, 1920].filter(w => w <= meta.width || w === 480)) {
    await sharp(data).resize({ width, withoutEnlargement: true }).webp({ quality: name === 'interior' ? 92 : 82 }).toFile(`assets/images/${names[name]}-${width}.webp`);
    await sharp(data).resize({ width, withoutEnlargement: true }).avif({ quality: name === 'interior' ? 68 : 52 }).toFile(`assets/images/${names[name]}-${width}.avif`);
  }
}));
await Promise.all(Object.entries(logos).map(async ([name, url]) => {
  await sharp(await download(url)).trim().resize({ width: 400, height: 150, fit: 'inside', withoutEnlargement: true }).png().toFile(`assets/logos/${name}.png`);
}));
for (const [name, family] of [['editorial', 'DM+Serif+Display'], ['editorial-italic', 'DM+Serif+Display:ital@1'], ['sans', 'Manrope:wght@400..700']]) {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}&display=swap`, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } })).text();
  const urls = [...css.matchAll(/url\((https:[^)]+)\)/g)];
  if (!urls.length) throw new Error(`Font unavailable: ${name}`);
  await fs.writeFile(`assets/fonts/${name}.woff2`, await download(urls.at(-1)[1]));
}
await fs.writeFile('assets/sources.json', JSON.stringify({ retrieved: '2026-10-06', photos, logos, note: 'Material de fabricantes para propuesta local. Confirmar autorización de uso antes de publicar. Koala Beds no dispone de logo verificado en esta propuesta.' }, null, 2));
for (const name of ['dmserifdisplay', 'manrope']) {
  await fs.writeFile(`assets/fonts/${name}-OFL.txt`, await download(`https://raw.githubusercontent.com/google/fonts/main/ofl/${name}/OFL.txt`));
}
