// Carousel preview server — zero-dependency companion to Remotion Studio.
// Serves the IG-carousel viewer and the slide decks under
// public/assets/carousels/<name>/ (slides are `<n>-<slug>.png`, caption
// copy lives in caption.txt alongside them).
// Run: npm run carousel  →  http://localhost:3131

import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {readFile, readdir, stat} from 'node:fs/promises';
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
  '.mp4': 'video/mp4',
};

const json = (res, status, body) => {
  res.writeHead(status, {'Content-Type': 'application/json; charset=utf-8'});
  res.end(JSON.stringify(body));
};

const safeName = (name) => /^[a-z0-9][a-z0-9-]{0,80}$/.test(name);

/**
 * `range` is the request's Range header. Video needs it: Chrome asks for byte
 * ranges, and a server that only ever answers 200 with the whole body makes
 * playback and scrubbing flaky. Images ignore it and take the plain path.
 */
const serveFile = (res, filePath, range) => {
  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    res.writeHead(404);
    return res.end('Not found');
  }
  const type = MIME[path.extname(filePath).toLowerCase()] ?? 'application/octet-stream';
  const {size} = statSync(filePath);
  const match = range?.match(/^bytes=(\d*)-(\d*)$/);
  if (match && type.startsWith('video/') && (match[1] || match[2])) {
    // Three forms, and the suffix one is easy to get wrong: `bytes=N-` is
    // from N to the end, `bytes=N-M` is that span, and `bytes=-N` is the LAST
    // N bytes, not the first N. Chrome's media loader uses the suffix form to
    // grab the moov atom when it sits at the end of an mp4 (anything not
    // muxed with +faststart, which includes Remotion's output). Answer that
    // with the head of the file instead and the video hangs at readyState 0
    // forever, with no error fired.
    const suffix = !match[1] && match[2];
    const start = suffix ? Math.max(0, size - Number(match[2])) : Number(match[1]);
    const end = suffix || !match[2] ? size - 1 : Number(match[2]);
    if (start >= size || end >= size || start > end) {
      res.writeHead(416, {'Content-Range': `bytes */${size}`});
      return res.end();
    }
    res.writeHead(206, {
      'Content-Type': type,
      'Content-Length': end - start + 1,
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache',
    });
    return createReadStream(filePath, {start, end}).pipe(res);
  }
  res.writeHead(200, {
    'Content-Type': type,
    'Content-Length': size,
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'no-cache',
  });
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
    .map((file) => {
      // A slide with a sibling mp4 is a motion card: the png is only its
      // poster, and the video is what actually gets posted, so the viewer
      // should play that rather than show the still.
      const mp4 = file.replace(/\.[^.]+$/, '.mp4');
      return {
        file,
        url: `/carousels/${name}/${file}`,
        video: entries.includes(mp4) ? `/carousels/${name}/${mp4}` : null,
        label: file.replace(/^\d+-/, '').replace(/\.[^.]+$/, ''),
      };
    });
  const extras = entries.filter((f) => f.startsWith('_') && /\.(png|jpe?g|webp)$/i.test(f));
  const captionPath = path.join(dir, 'caption.txt');
  const caption = existsSync(captionPath) ? await readFile(captionPath, 'utf8') : '';
  const {mtimeMs} = await stat(dir);
  return {
    name,
    slides,
    caption,
    mtimeMs,
    contactSheet: extras[0] ? `/carousels/${name}/${extras[0]}` : null,
  };
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
    // Newest deck first, so a fresh restyle is what opens.
    carousels.sort((a, b) => b.mtimeMs - a.mtimeMs);
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
    return serveFile(res, filePath, req.headers.range);
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Carousel preview → http://localhost:${PORT}`);
  console.log(`Serving decks from ${path.relative(ROOT, CAROUSELS_DIR)}/`);
});
