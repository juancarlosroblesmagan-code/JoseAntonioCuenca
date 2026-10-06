import fs from 'node:fs/promises';
import sharp from 'sharp';

const source = 'assets/favicon-jc.svg';
await fs.copyFile(source, 'assets/favicon.svg');
const entries = [];
for (const size of [16, 32, 48]) entries.push({ size, bytes: await sharp(source).resize(size, size).png().toBuffer() });
const header = Buffer.alloc(6 + 16 * entries.length);
header.writeUInt16LE(1, 2); header.writeUInt16LE(entries.length, 4);
let offset = header.length;
entries.forEach(({ size, bytes }, index) => {
  const start = 6 + index * 16;
  header[start] = size; header[start + 1] = size;
  header.writeUInt16LE(1, start + 4); header.writeUInt16LE(32, start + 6);
  header.writeUInt32LE(bytes.length, start + 8); header.writeUInt32LE(offset, start + 12);
  offset += bytes.length;
});
await fs.writeFile('favicon.ico', Buffer.concat([header, ...entries.map(e => e.bytes)]));
for (const [name, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-192.png', 192]]) await sharp(source).resize(size, size).png().toFile(`assets/${name}`);
console.log('Favicon JC: SVG, ICO 16/32/48 y PNG 32/180/192 preparados.');
