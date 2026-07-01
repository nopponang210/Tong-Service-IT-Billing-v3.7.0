import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');
const apiBase = String(process.env.API_BASE_URL || '').trim();

if (!apiBase) {
  throw new Error('Missing API_BASE_URL environment variable. Example: https://YOUR-RENDER-SERVICE.onrender.com/api');
}

await fs.rm(dist, { recursive: true, force: true });
await fs.cp(src, dist, { recursive: true });

const config = `window.APP_CONFIG = ${JSON.stringify({ API_BASE_URL: apiBase })};\n`;
await fs.writeFile(path.join(dist, 'config.js'), config, 'utf8');

console.log(`Built frontend to ${dist}`);
console.log(`API_BASE_URL=${apiBase}`);
