import fs from 'node:fs/promises';
import sharp from 'sharp';

await fs.mkdir('public/concepts', { recursive: true });
for (const name of ['workshop-still-life', 'orbit-sculpture', 'code-garden']) {
  for (const width of [...(name === 'code-garden' ? [320] : []), 640, 960, 1440]) {
    await sharp('src/assets/concepts/' + name + '.png')
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile('public/concepts/' + name + '-' + width + '.webp');
  }
}
for (const name of ['denibot', 'denibot-thinking', 'denibot-celebrate']) {
  for (const width of [160, 320, ...(name === 'denibot' ? [640] : [])]) {
    await sharp('src/assets/concepts/' + name + '.png')
      .resize({ width })
      .webp({ quality: 85, alphaQuality: 100 })
      .toFile('public/concepts/' + name + '-' + width + '.webp');
  }
}
await sharp('src/assets/profile.png')
  .resize(448, 448)
  .webp({ quality: 85 })
  .toFile('public/profile-448.webp');
console.log(
  'Prepared responsive concept artwork, transparent mascot and high-resolution portrait.',
);
