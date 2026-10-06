import fs from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import ffmpeg from 'ffmpeg-static';
import { pathToFileURL } from 'node:url';

const exec = promisify(execFile);
const sampleRate = 44100;
const duration = 72;
const track = 'assets/audio/joseantoniocuenca-ambiental-original.wav';

// A deterministic, newly synthesised score. No samples, recordings or commercial songs.
async function createScore() {
  await fs.mkdir('assets/audio', { recursive: true });
  const frames = sampleRate * duration;
  const wav = Buffer.alloc(44 + frames * 4);
  wav.write('RIFF', 0); wav.writeUInt32LE(wav.length - 8, 4); wav.write('WAVE', 8);
  wav.write('fmt ', 12); wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20);
  wav.writeUInt16LE(2, 22); wav.writeUInt32LE(sampleRate, 24); wav.writeUInt32LE(sampleRate * 4, 28);
  wav.writeUInt16LE(4, 32); wav.writeUInt16LE(16, 34); wav.write('data', 36); wav.writeUInt32LE(frames * 4, 40);
  const chords = [[45, 52, 59, 60, 64], [41, 48, 55, 57, 64], [48, 55, 59, 62, 64], [43, 50, 57, 60, 62]];
  const notes = [76, 71, 72, 67, 69, 64, 67, 71, 72, 76, 74, 67, 69, 71, 67, 64];
  const frequency = midi => 440 * 2 ** ((midi - 69) / 12);
  const events = [];
  for (let start = 0; start < duration; start += 8) {
    chords[Math.floor(start / 8) % chords.length].forEach((midi, i) => events.push({ start, length: 11, hz: frequency(midi), volume: i === 0 ? .032 : .016, pan: (i - 2) * .23, pad: true }));
  }
  for (let start = 3, i = 0; start < duration; start += 3.2, i++) events.push({ start, length: 8, hz: frequency(notes[i % notes.length]), volume: .016, pan: Math.sin(i * 1.7) * .5, pad: false });
  const active = [];
  let cursor = 0;
  events.sort((a, b) => a.start - b.start);
  for (let frame = 0; frame < frames; frame++) {
    const t = frame / sampleRate;
    while (cursor < events.length && events[cursor].start <= t) active.push(events[cursor++]);
    let left = 0, right = 0;
    for (let j = active.length - 1; j >= 0; j--) {
      const event = active[j], age = t - event.start;
      if (age >= event.length) { active.splice(j, 1); continue; }
      const phase = 2 * Math.PI * event.hz * age;
      const envelope = event.pad ? Math.sin(Math.PI * age / event.length) ** 2 : (1 - Math.exp(-age * 20)) * Math.exp(-age * .8);
      const tone = event.pad ? Math.sin(phase + .008 * Math.sin(t * .6)) + .2 * Math.sin(phase * 2.001) + .08 * Math.sin(phase * 3) : Math.sin(phase) + .15 * Math.sin(phase * 2) * Math.exp(-age * 2);
      const value = tone * envelope * event.volume;
      left += value * Math.sqrt((1 - event.pan) / 2);
      right += value * Math.sqrt((1 + event.pan) / 2);
    }
    const fade = Math.min(1, t / 3, (duration - t) / 4);
    wav.writeInt16LE(Math.round(Math.max(-1, Math.min(1, left * fade)) * 32767), 44 + frame * 4);
    wav.writeInt16LE(Math.round(Math.max(-1, Math.min(1, right * fade)) * 32767), 46 + frame * 4);
  }
  await fs.writeFile(track, wav);
  await exec(ffmpeg, ['-y', '-i', track, '-af', 'loudnorm=I=-24:TP=-3:LRA=7', '-c:a', 'libmp3lame', '-b:a', '160k', 'assets/audio/joseantoniocuenca-ambiental-muestra.mp3']);
}

export async function applyAmbientSound() {
  await createScore();
  const file = 'assets/videos/manifest.json';
  const manifest = JSON.parse(await fs.readFile(file, 'utf8'));
  for (const video of manifest.videos) {
    const output = `.${video.src}`;
    const temporary = output.replace('.mp4', '-audio-temp.mp4');
    const filter = `loudnorm=I=-24:TP=-3:LRA=7,afade=t=in:st=0:d=2,afade=t=out:st=${Math.max(0, video.duration - 2.5)}:d=2.5`;
    await exec(ffmpeg, ['-y', '-i', output, '-i', track, '-map', '0:v:0', '-map', '1:a:0', '-c:v', 'copy', '-af', filter, '-c:a', 'aac', '-b:a', '128k', '-t', String(video.duration), '-movflags', '+faststart', '-map_metadata', '-1', temporary], { maxBuffer: 4 * 1024 * 1024 });
    await fs.rename(temporary, output);
    const minutes = Math.floor(video.duration / 60), seconds = video.duration % 60;
    const end = `00:${String(minutes).padStart(2, '0')}:${seconds.toFixed(3).padStart(6, '0')}`;
    const captions = output.replace('.mp4', '.es.vtt');
    await fs.writeFile(captions, `WEBVTT\n\n00:00:00.000 --> ${end}\n[Música instrumental ambiental suave, sin voces]\n`);
    video.captions = video.src.replace('.mp4', '.es.vtt');
    video.originalHasAudio = video.originalHasAudio ?? video.hasAudio;
    video.hasAudio = true;
    video.soundtrack = 'Base ambiental sintetizada para este proyecto, sin voces ni grabaciones comerciales. Volumen de referencia -24 LUFS y fundidos de entrada/salida.';
    video.webBytes = (await fs.stat(output)).size;
    console.log(video.id, 'audio sustituido, imagen sin recodificar:', video.webBytes, 'bytes');
  }
  manifest.soundtrack = { source: 'Síntesis original reproducible en scripts/ambient-sound.mjs', preview: '/assets/audio/joseantoniocuenca-ambiental-muestra.mp3', vocals: false, originalFiles: 'Sin modificar en Descargas', approvedDirection: 'Ambiental suave, elegida por el cliente' };
  manifest.notes = 'Tres archivos diferentes verificados mediante SHA256. Imagen sin recortar ni acelerar. Audio de las versiones web unificado con una base ambiental sintetizada, sin voces. Audio original conservado en los originales de Descargas. Confirmar fechas y permisos de las ferias antes de publicar.';
  await fs.writeFile(file, JSON.stringify(manifest, null, 2));
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await applyAmbientSound();
