import fs from 'node:fs/promises';
import path from 'node:path';
import { render, pagePaths, conceptPaths, site } from '../.ssr/entry-server.js';
import { escapeHtml as e, serializeJson } from './html.mjs';
const root = path.resolve('dist');
const template = await fs.readFile(path.join(root, 'index.html'), 'utf8');
const assetNames = await fs.readdir(path.join(root, 'assets'));
const manifest = JSON.parse(await fs.readFile(path.join(root, '.vite/manifest.json'), 'utf8'));
const font = assetNames.find(
  (name) => name.startsWith('bricolage-grotesque-latin-wght-normal') && name.endsWith('.woff2'),
);
function pageStyles(entry, visited = new Set(), styles = new Set()) {
  if (visited.has(entry)) return styles;
  visited.add(entry);
  const chunk = manifest[entry];
  if (!chunk) throw new Error('Missing manifest entry: ' + entry);
  for (const css of chunk.css || []) styles.add(css);
  for (const dependency of chunk.imports || []) pageStyles(dependency, visited, styles);
  return styles;
}
const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': site.origin + '/#person',
  name: site.name,
  url: site.origin + '/',
  jobTitle: 'Web Developer',
  sameAs: [site.github, site.linkedin],
  knowsAbout: ['PHP', 'WordPress', 'React', 'Node.js', 'TypeScript'],
  address: { '@type': 'PostalAddress', addressCountry: 'PY' },
  memberOf: { '@type': 'Organization', name: 'OnlineHelp', url: site.team },
};
for (const url of [...pagePaths, ...conceptPaths, '/404']) {
  const { html, page } = render(url);
  const canonical = site.origin + (page.path === '/' ? '/' : page.path);
  const alternates = page.alternate ? [page, render(page.alternate).page] : [];
  const entry =
    page.kind === 'concept'
      ? 'src/concepts/ConceptSite.tsx'
      : page.kind === 'home'
        ? 'src/HomeSite.tsx'
        : 'src/Site.tsx';
  const webPage = {
    '@type': page.kind === 'profile' ? 'ProfilePage' : 'WebPage',
    '@id': canonical + '#webpage',
    url: canonical,
    name: page.title,
    description: page.description,
    inLanguage: page.language,
    isPartOf: { '@id': site.origin + '/#website' },
    about: { '@id': person['@id'] },
    ...(page.kind === 'profile' || page.kind === 'home'
      ? { mainEntity: { '@id': person['@id'] } }
      : {}),
    ...(page.project
      ? {
          mainEntity: {
            '@type': 'CreativeWork',
            name: page.project.name,
            description: page.project.description[page.language],
            ...(page.project.image ? { image: site.origin + page.project.image } : {}),
          },
        }
      : {}),
  };
  const head = [
    ...[...pageStyles(entry)]
      .filter((css) => !template.includes(css))
      .map((css) => '<link rel="stylesheet" href="/' + css + '" />'),
    '<meta name="description" content="' + e(page.description) + '" />',
    ...(page.kind === 'notFound' || page.kind === 'concept'
      ? ['<meta name="robots" content="noindex,follow" />']
      : ['<link rel="canonical" href="' + e(canonical) + '" />']),
    ...alternates.map(
      (alternate) =>
        '<link rel="alternate" hreflang="' +
        alternate.language +
        '" href="' +
        site.origin +
        alternate.path +
        '" />',
    ),
    ...(alternates.length
      ? [
          '<link rel="alternate" hreflang="x-default" href="' +
            site.origin +
            alternates.find((alternate) => alternate.language === 'es').path +
            '" />',
        ]
      : []),
    '<meta property="og:title" content="' + e(page.title) + '" />',
    '<meta property="og:description" content="' + e(page.description) + '" />',
    '<meta property="og:type" content="website" />',
    '<meta property="og:url" content="' + e(canonical) + '" />',
    '<meta property="og:site_name" content="denilson.me" />',
    '<meta property="og:locale" content="' + (page.language === 'es' ? 'es_PY' : 'en_US') + '" />',
    '<meta property="og:image" content="' + site.origin + '/og-image.png" />',
    '<meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />',
    '<meta property="og:image:alt" content="Denilson Arguello · PHP, WordPress, React, Node.js" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    '<meta name="twitter:title" content="' + e(page.title) + '" />',
    '<meta name="twitter:description" content="' + e(page.description) + '" />',
    '<meta name="twitter:image" content="' + site.origin + '/og-image.png" />',
    ...(font
      ? [
          '<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/' +
            font +
            '" />',
        ]
      : []),
    '<script type="application/ld+json">' +
      serializeJson({
        '@context': 'https://schema.org',
        '@graph': [
          person,
          {
            '@type': 'WebSite',
            '@id': site.origin + '/#website',
            url: site.origin + '/',
            name: 'Denilson Arguello · dev.play',
            inLanguage: ['es', 'en'],
          },
          webPage,
        ],
      }) +
      '</script>',
  ].join('\n');
  const output = template
    .replace('<div id="root">', '<div id="root" data-prerendered="true">')
    .replace('lang="es"', 'lang="' + page.language + '"')
    .replace(/<title>.*?<\/title>/s, '<title>' + e(page.title) + '</title>')
    .replace('<!--page-head-->', head)
    .replace('<!--app-html-->', html);
  const filename = page.path === '/' ? 'index.html' : page.path.slice(1) + '.html';
  const destination = path.resolve(root, filename);
  if (!destination.startsWith(root + path.sep)) throw new Error('Output outside dist');
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, output);
  console.log('Generated ' + page.path);
}
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
  pagePaths.map((url) => '<url><loc>' + e(site.origin + url) + '</loc></url>').join('') +
  '</urlset>\n';
await fs.writeFile(path.join(root, 'sitemap.xml'), sitemap);
await fs.writeFile(
  path.join(root, 'robots.txt'),
  'User-agent: *\nAllow: /\n\nSitemap: ' + site.origin + '/sitemap.xml\n',
);
