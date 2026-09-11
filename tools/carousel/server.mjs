// Carousel preview server — zero-dependency companion to Remotion Studio.
// Serves the IG-carousel viewer and the slide decks under
// public/assets/carousels/<name>/ (slides are `<n>-<slug>.png`, caption
// copy lives in caption.txt alongside them).
// Run: npm run carousel  →  http://localhost:3131

import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {readFile, readdir} from 'node:fs/promises';
import {createReadStream, existsSync, statSync} from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const CAROUSELS_DIR = path.join(ROOT, 'public', 'assets', 'carousels');
const PORT = 3131;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
};

const json = (res, status, body) => {
  res.writeHead(status, {'Content-Type': 'application/json; charset=utf-8'});
  res.end(JSON.stringify(body));
};

const safeName = (name) => /^[a-z0-9][a-z0-9-]{0,80}$/.test(name);

const serveFile = (res, filePath) => {
  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    res.writeHead(404);
    return res.end('Not found');
  }
  const type = MIME[path.extname(filePath).toLowerCase()] ?? 'application/octet-stream';
  res.writeHead(200, {'Content-Type': type, 'Cache-Control': 'no-cache'});
  createReadStream(filePath).pipe(res);
};

// Slides sort by their leading number; `_`-prefixed files (contact sheets,
// scratch exports) are helpers, not slides.
const readDeck = async (name) => {
  const dir = path.join(CAROUSELS_DIR, name);
  const entries = await readdir(dir);
  const slides = entries
    .filter((f) => /^\d+-.+\.(png|jpe?g|webp)$/i.test(f))
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
    .map((file) => ({
      file,
      url: `/carousels/${name}/${file}`,
      label: file.replace(/^\d+-/, '').replace(/\.[^.]+$/, ''),
    }));
  const extras = entries.filter((f) => f.startsWith('_') && /\.(png|jpe?g|webp)$/i.test(f));
  const captionPath = path.join(dir, 'caption.txt');
  const caption = existsSync(captionPath) ? await readFile(captionPath, 'utf8') : '';
  return {name, slides, caption, contactSheet: extras[0] ? `/carousels/${name}/${extras[0]}` : null};
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = decodeURIComponent(url.pathname);

  if (pathname === '/' || pathname === '/index.html') {
    return serveFile(res, path.join(__dirname, 'index.html'));
  }

  // List every carousel folder that has at least one slide.
  if (pathname === '/api/carousels') {
    if (!existsSync(CAROUSELS_DIR)) return json(res, 200, {carousels: []});
    const dirs = (await readdir(CAROUSELS_DIR, {withFileTypes: true}))
      .filter((d) => d.isDirectory() && safeName(d.name))
      .map((d) => d.name);
    const carousels = [];
    for (const name of dirs) {
      const deck = await readDeck(name);
      if (deck.slides.length) carousels.push(deck);
    }
    return json(res, 200, {carousels});
  }

  if (pathname.startsWith('/carousels/')) {
    const rel = pathname.slice('/carousels/'.length);
    const filePath = path.join(CAROUSELS_DIR, rel);
    // Keep traversal inside the carousels dir.
    if (!filePath.startsWith(CAROUSELS_DIR + path.sep)) {
      res.writeHead(403);
      return res.end('Forbidden');
    }
    return serveFile(res, filePath);
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Carousel preview → http://localhost:${PORT}`);
  console.log(`Serving decks from ${path.relative(ROOT, CAROUSELS_DIR)}/`);
});
