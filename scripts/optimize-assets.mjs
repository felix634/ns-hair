// scripts/optimize-assets.mjs
// Build-time image optimization: WebP konverzió, favicon generálás, OG kép készítés.
// Futtatás: node scripts/optimize-assets.mjs

import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, parse } from 'node:path';

const PUBLIC_DIR = 'public';
const FAVICON_SRC = 'public/logo.png';

// ──────────────────────────────────────────────────────────────────────────
// 1. PNG → WebP konverzió a galéria + háttér képeknek
// ──────────────────────────────────────────────────────────────────────────
async function convertToWebP() {
  const files = await readdir(PUBLIC_DIR);
  const pngs = files.filter(f =>
    f.endsWith('.png') &&
    (f.startsWith('munka') || f === 'bg.png' || f === 'logo.png')
  );

  for (const file of pngs) {
    const src = join(PUBLIC_DIR, file);
    const dst = join(PUBLIC_DIR, parse(file).name + '.webp');

    const isLargeHero = file === 'bg.png';
    const quality = isLargeHero ? 75 : 82;

    await sharp(src)
      .webp({ quality, effort: 6 })
      .toFile(dst);

    console.log(`  ✓ ${file} → ${parse(file).name}.webp`);
  }
}

// ──────────────────────────────────────────────────────────────────────────
// 2. Favicon készletek (apple-touch-icon, PNG favicons)
// ──────────────────────────────────────────────────────────────────────────
async function generateFavicons() {
  // Apple touch icon: 180x180, padding-gel hogy a logo ne fusson ki, sötét háttér
  await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 10, g: 10, b: 10, alpha: 1 },
    },
  })
    .composite([{
      input: await sharp(FAVICON_SRC)
        .resize(140, 140, { fit: 'inside' })
        .toBuffer(),
      gravity: 'center',
    }])
    .png()
    .toFile(join(PUBLIC_DIR, 'apple-touch-icon.png'));
  console.log('  ✓ apple-touch-icon.png (180×180)');

  // 32x32 és 16x16 PNG favicon (régebbi böngészők, modern browserek SVG-t használnak)
  for (const size of [16, 32, 192, 512]) {
    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 10, g: 10, b: 10, alpha: 1 },
      },
    })
      .composite([{
        input: await sharp(FAVICON_SRC)
          .resize(Math.round(size * 0.78), Math.round(size * 0.78), { fit: 'inside' })
          .toBuffer(),
        gravity: 'center',
      }])
      .png()
      .toFile(join(PUBLIC_DIR, `favicon-${size}.png`));
    console.log(`  ✓ favicon-${size}.png`);
  }
}

// ──────────────────────────────────────────────────────────────────────────
// 3. Open Graph kép (1200x630)
// ──────────────────────────────────────────────────────────────────────────
async function generateOGImage() {
  const width = 1200;
  const height = 630;

  // SVG overlay: gradient + szöveg
  const svgOverlay = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0.95" />
        </linearGradient>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#D4A574" />
          <stop offset="100%" stop-color="#E8C9A0" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)" />
      <text x="${width / 2}" y="${height / 2 + 60}"
            font-family="Georgia, 'Playfair Display', serif"
            font-size="68" font-weight="700"
            fill="#ffffff" text-anchor="middle"
            letter-spacing="2">
        Nagy Sándor Hair &amp; Beauty
      </text>
      <text x="${width / 2}" y="${height / 2 + 120}"
            font-family="Arial, sans-serif"
            font-size="22" font-weight="300"
            fill="#D4A574" text-anchor="middle"
            letter-spacing="6">
        PRÉMIUM FODRÁSZAT • SZEGED
      </text>
      <line x1="${width / 2 - 60}" y1="${height / 2 + 145}"
            x2="${width / 2 + 60}" y2="${height / 2 + 145}"
            stroke="url(#gold)" stroke-width="2" />
    </svg>
  `;

  // Base: bg.png lefedve, majd gradient overlay, majd a logo középre fent
  const bg = await sharp('public/bg.png')
    .resize(width, height, { fit: 'cover', position: 'center' })
    .toBuffer();

  const logoBuffer = await sharp(FAVICON_SRC)
    .resize(180, null, { fit: 'inside' })
    .toBuffer();

  await sharp(bg)
    .composite([
      { input: Buffer.from(svgOverlay), top: 0, left: 0 },
      { input: logoBuffer, top: 140, left: Math.round((width - 180) / 2) },
    ])
    .jpeg({ quality: 88, progressive: true })
    .toFile(join(PUBLIC_DIR, 'og-image.jpg'));

  console.log('  ✓ og-image.jpg (1200×630)');
}

// ──────────────────────────────────────────────────────────────────────────
// Futtatás
// ──────────────────────────────────────────────────────────────────────────
console.log('▶ WebP konverzió…');
await convertToWebP();

console.log('\n▶ Favicon készletek…');
await generateFavicons();

console.log('\n▶ Open Graph kép…');
await generateOGImage();

console.log('\n✅ Minden asset elkészült.');
