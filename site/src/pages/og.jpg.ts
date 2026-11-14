// /og.jpg: 1200x630 share image (WhatsApp, Google, social), cropped from the
// signature carbonara photo. Metadata is stripped.
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { resolve } from 'node:path';

// Resolved from the project root (site/), where `astro build` runs.
const SRC = resolve('src/assets/carbonara.jpg');

export const GET: APIRoute = async () => {
  const img = await sharp(SRC)
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'centre' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  return new Response(new Uint8Array(img), { headers: { 'Content-Type': 'image/jpeg' } });
};
