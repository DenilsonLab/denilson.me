import fs from 'node:fs/promises';
import sharp from 'sharp';
await fs.mkdir('public', { recursive: true });
for (const name of ['karuplan', 'qlinnt']) {
  for (const width of [480, 800]) {
    await sharp('public/projects/' + name + '-cover.webp')
      .resize({ width })
      .webp({ quality: 80 })
      .toFile('public/projects/' + name + '-cover-' + width + '.webp');
  }
}
for (const size of [80, 160, 224]) {
  await sharp('src/assets/profile.png')
    .resize(size, size)
    .webp({ quality: 85 })
    .toFile('public/profile-' + size + '.webp');
}
await import('./prepare-brand.mjs');
console.log('Prepared responsive portraits, project images and brand assets.');
