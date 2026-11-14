// /og.jpg: 1200x630 share image (WhatsApp, Google, social), cropped from the
// storefront photo so the neon sign is in view. Metadata is stripped.
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { resolve } from 'node:path';

// Resolved from the project root (site/), where `astro build` runs.
const SRC = resolve('src/assets/storefront.jpg');

export const GET: APIRoute = async () => {
  const img = await sharp(SRC)
    .extract({ left: 0, top: 120, width: 1200, height: 630 })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  return new Response(new Uint8Array(img), { headers: { 'Content-Type': 'image/jpeg' } });
};
