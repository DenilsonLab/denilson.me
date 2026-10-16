import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { brotliCompress, constants, gzip } from 'node:zlib';
const compressBrotli = promisify(brotliCompress);
const compressGzip = promisify(gzip);
const root = path.resolve('dist');
const config = JSON.parse(await fs.readFile('vercel.json', 'utf8'));
const security = config.headers.find((rule) => rule.source === '/(.*)').headers;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};
const server = http.createServer(async (request, response) => {
  for (const header of security) response.setHeader(header.key, header.value);
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    response.writeHead(400).end();
    return;
  }
  const relative = pathname === '/' ? 'index.html' : pathname.slice(1).replace(/\/$/, '');
  const candidate = path.resolve(root, relative);
  if (
    !candidate.startsWith(root + path.sep) ||
    relative.split('/').some((part) => part.startsWith('.'))
  ) {
    response.writeHead(404).end();
    return;
  }
  let file, body;
  for (const possible of [candidate, candidate + '.html', path.join(candidate, 'index.html')]) {
    try {
      const stat = await fs.stat(possible);
      if (stat.isFile()) {
        body = await fs.readFile(possible);
        file = possible;
        break;
      }
    } catch {
      /* Try the next clean URL representation. */
    }
  }
  if (!file) {
    file = path.join(root, '404.html');
    body = await fs.readFile(file);
    response.statusCode = 404;
    response.setHeader('X-Robots-Tag', 'noindex');
  }
  const contentType = types[path.extname(file)] || 'application/octet-stream';
  response.setHeader('Content-Type', contentType);
  response.setHeader(
    'Cache-Control',
    pathname.startsWith('/assets/') ? 'public,max-age=31536000,immutable' : 'no-cache',
  );
  // Match the compressed text delivery used by the production CDN.
  if (
    body.length > 1024 &&
    /^(text\/|application\/(xml|manifest\+json)|image\/svg)/.test(contentType)
  ) {
    response.setHeader('Vary', 'Accept-Encoding');
    const accepted = request.headers['accept-encoding'] || '';
    if (/\bbr\b/.test(accepted)) {
      body = await compressBrotli(body, { params: { [constants.BROTLI_PARAM_QUALITY]: 4 } });
      response.setHeader('Content-Encoding', 'br');
    } else if (/\bgzip\b/.test(accepted)) {
      body = await compressGzip(body);
      response.setHeader('Content-Encoding', 'gzip');
    }
  }
  response.setHeader('Content-Length', body.length);
  response.end(request.method === 'HEAD' ? undefined : body);
});
server.listen(Number(process.env.PORT || 4173), '127.0.0.1', () =>
  console.log('Static preview: http://127.0.0.1:' + server.address().port),
);
