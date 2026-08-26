const sharp = require('sharp');

async function processImage() {
  const originalPath = 'public/paper-plate-cursor-original.png';
  const meta = await sharp(originalPath).metadata();
  const w = meta.width;
  const h = meta.height;
  
  // Outer radius inset to cleanly trim fake transparent checkerboard background
  const r = Math.floor(Math.min(w, h) / 2) - 25;
  const cx = Math.floor(w / 2);
  const cy = Math.floor(h / 2);

  const svgMask = `<svg width="${w}" height="${h}">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" />
  </svg>`;

  const maskBuffer = Buffer.from(svgMask);

  // Composite circular mask onto image
  await sharp(originalPath)
    .composite([{ input: maskBuffer, blend: 'dest-in' }])
    .png()
    .toFile('public/paper-plate-transparent.png');

  // Generate 32x32 and 24x24 cursors with smooth anti-aliasing
  await sharp('public/paper-plate-transparent.png')
    .resize(32, 32)
    .toFile('public/paper-plate-cursor-32.png');

  await sharp('public/paper-plate-transparent.png')
    .resize(24, 24)
    .toFile('public/paper-plate-cursor-24.png');

  console.log('Background removed! 100% transparent circular paper plate cursor updated.');
}

processImage().catch(console.error);
