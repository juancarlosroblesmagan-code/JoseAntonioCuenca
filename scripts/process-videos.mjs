import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import ffmpeg from 'ffmpeg-static';
import probe from 'ffprobe-static';
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { applyAmbientSound } from './ambient-sound.mjs';

const exec = promisify(execFile);
await fs.mkdir('assets/videos', { recursive: true });
await fs.mkdir('reports/videos', { recursive: true });
const videos = [
  { original: 'VIDEO-2026-10-05-14-43-57.mp4', name: 'joseantoniocuenca-video-feria-habitat', title: 'Feria Hábitat. Producto en contexto.', posterTime: 24, description: 'Recorrido por espacios expositivos de Karibian, Koala Beds y Torresol en Feria Hábitat. Ambientes de descanso, colchones y sofás presentados en un entorno profesional.' },
  { original: 'VIDEO-2026-10-05-14-43-58.mp4', name: 'joseantoniocuenca-video-ferias-diseno', title: 'Una mirada a las ferias de diseño.', posterTime: 24, description: 'Montaje de espacios expositivos, mobiliario y materiales, con imágenes del Salone del Mobile. Una mirada visual al producto dentro de las ferias del sector.' },
  { original: 'VIDEO-2026-10-05-14-43-58 - menos tiempo.mp4', name: 'joseantoniocuenca-video-feria-torresol', title: 'Torresol. Diseño y confort en exposición.', posterTime: 1.5, description: 'Presentación audiovisual de Torresol con sofás, sillones y ambientes de su espacio expositivo. La marca y los detalles del producto, en un recorrido de 33 segundos.' }
];
const manifest = [];
for (const [index, video] of videos.entries()) {
  let input = path.join(process.env.USERPROFILE, 'Downloads', video.original);
  try { await fs.access(input); } catch { input = path.join(process.env.USERPROFILE, 'Downloads', `${video.name}-original.mp4`); }
  const { stdout } = await exec(probe.path, ['-v', 'quiet', '-show_format', '-show_streams', '-of', 'json', input]);
  const metadata = JSON.parse(stdout);
  await fs.writeFile(`reports/videos/metadata-${index + 1}.json`, JSON.stringify(metadata, null, 2));
  console.log(index + 1, metadata.streams.map(s => ({ type: s.codec_type, codec: s.codec_name, width: s.width, height: s.height, duration: s.duration })), metadata.format.tags);
  const frames = [];
  const duration = Number(metadata.streams.find(s => s.codec_type === 'video').duration);
  for (const time of [0.04, 0.2, 0.4, 0.6, 0.8, 0.95].map(f => Number((duration * f).toFixed(2)))) {
    const output = `reports/videos/film-${index + 1}-${time}.jpg`;
    await exec(ffmpeg, ['-y', '-ss', String(time), '-i', input, '-frames:v', '1', '-q:v', '2', output]);
    frames.push(await sharp(output).resize(400, 400, { fit: 'contain', background: '#202521' }).toBuffer());
  }
  await sharp({ create: { width: 1200, height: 800, channels: 3, background: '#202521' } }).composite(frames.map((input, i) => ({ input, left: (i % 3) * 400, top: Math.floor(i / 3) * 400 }))).jpeg().toFile(`reports/videos/film-sheet-${index + 1}.jpg`);
  const output = `assets/videos/${video.name}.mp4`;
  await exec(ffmpeg, ['-y', '-i', input, '-map', '0:v:0', '-map', '0:a?', '-c:v', 'libx264', '-preset', 'medium', '-crf', '26', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', '-map_metadata', '-1', output], { maxBuffer: 4 * 1024 * 1024 });
  const poster = `reports/videos/${video.name}-poster.jpg`;
  await exec(ffmpeg, ['-y', '-ss', String(video.posterTime), '-i', input, '-frames:v', '1', '-q:v', '2', poster]);
  await sharp(poster).resize(480, 270, { fit: 'cover' }).webp({ quality: 86 }).toFile(`assets/images/${video.name}-poster.webp`);
  await sharp(poster).resize(480, 270, { fit: 'cover' }).avif({ quality: 56 }).toFile(`assets/images/${video.name}-poster.avif`);
  const stream = metadata.streams.find(s => s.codec_type === 'video');
  manifest.push({ id: video.name.replace('joseantoniocuenca-video-', ''), title: video.title, description: video.description, src: `/assets/videos/${video.name}.mp4`, poster: `/assets/images/${video.name}-poster.webp`, originalName: video.original, originalRenamed: `${video.name}-original.mp4`, sourceHash: createHash('sha256').update(await fs.readFile(input)).digest('hex'), width: stream.width, height: stream.height, duration: Number(stream.duration), hasAudio: metadata.streams.some(s => s.codec_type === 'audio'), originalBytes: (await fs.stat(input)).size, webBytes: (await fs.stat(output)).size });
}
await fs.writeFile('assets/videos/manifest.json', JSON.stringify({ importedOn: '2026-10-06', videos: manifest, notes: 'Tres archivos diferentes verificados mediante SHA256. Sin recortar ni acelerar el metraje; audio original preservado donde existe. Copias web H.264 con faststart. Confirmar año de las ferias y transcripción de cualquier contenido hablado antes de publicar.' }, null, 2));
console.log('Vídeos web y posters preparados:', manifest.map(v => ({ name: v.id, original: v.originalBytes, web: v.webBytes })));
await applyAmbientSound();
if (process.argv.includes('--rename-originals')) {
  for (const video of videos) {
    const source = path.join(process.env.USERPROFILE, 'Downloads', video.original);
    const target = path.join(process.env.USERPROFILE, 'Downloads', `${video.name}-original.mp4`);
    try { await fs.access(source); } catch { continue; }
    try { await fs.access(target); throw new Error(`No se sobrescribe un archivo existente: ${target}`); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
    await fs.rename(source, target);
    console.log('Original conservado, nuevo nombre:', path.basename(target));
  }
}
