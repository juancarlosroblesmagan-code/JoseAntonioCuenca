import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import probe from 'ffprobe-static';

const exec = promisify(execFile);
const manifest = JSON.parse(await fs.readFile('assets/videos/manifest.json', 'utf8'));
const results = [];
for (const video of manifest.videos) {
  const original = path.join(process.env.USERPROFILE, 'Downloads', video.originalRenamed);
  const hash = createHash('sha256').update(await fs.readFile(original)).digest('hex');
  assert.equal(hash, video.sourceHash, `${video.id}: original must remain byte-for-byte intact`);
  const { stdout } = await exec(probe.path, ['-v', 'quiet', '-show_format', '-show_streams', '-of', 'json', `.${video.src}`]);
  const metadata = JSON.parse(stdout);
  const image = metadata.streams.find(s => s.codec_type === 'video');
  const audio = metadata.streams.find(s => s.codec_type === 'audio');
  assert.equal(image.width, video.width);
  assert.equal(image.height, video.height);
  assert.ok(Math.abs(Number(image.duration) - video.duration) < .1);
  assert.equal(audio.codec_name, 'aac');
  assert.ok((await fs.readFile(`.${video.captions}`, 'utf8')).startsWith('WEBVTT'));
  const response = await fetch(`http://localhost:4173${video.src}`, { headers: { Range: 'bytes=0-1023' } });
  assert.equal(response.status, 206);
  assert.equal(response.headers.get('content-type'), 'video/mp4');
  assert.equal((await response.arrayBuffer()).byteLength, 1024);
  results.push({ id: video.id, originalHashPreserved: true, width: image.width, height: image.height, duration: image.duration, audio: audio.codec_name, rangeRequests: '206 OK', captions: 'WebVTT valid header' });
}
await fs.writeFile('reports/videos/final-verification.json', JSON.stringify(results, null, 2));
console.log('Verificados: originales intactos, 3 bandas sonoras AAC, dimensiones/duración y reproducción por rangos.');
