// Storyboard server — zero-dependency companion to Remotion Studio.
// Serves the storyboard app, proxies public/assets for previews, and
// persists boards as JSON under plans/storyboards/.
// Run: npm run storyboard  →  http://localhost:3111

import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {readFile, writeFile, readdir, mkdir, unlink} from 'node:fs/promises';
import {createReadStream, existsSync, statSync} from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const ASSETS_DIR = path.join(ROOT, 'public', 'assets');
const BOARDS_DIR = path.join(ROOT, 'plans', 'storyboards');
const PORT = 3111;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

const json = (res, status, body) => {
  res.writeHead(status, {'Content-Type': 'application/json; charset=utf-8'});
  res.end(JSON.stringify(body));
};

// Board names: kebab-case only, so they map 1:1 to safe filenames.
const safeBoardName = (name) => /^[a-z0-9][a-z0-9-]{0,80}$/.test(name);

const serveFile = (req, res, filePath) => {
  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    res.writeHead(404);
    return res.end('Not found');
  }
  const type = MIME[path.extname(filePath).toLowerCase()] ?? 'application/octet-stream';
  const {size} = statSync(filePath);
  const range = req.headers.range;
  if (range) {
    // Range support so <video> previews can scrub.
    const match = /bytes=(\d*)-(\d*)/.exec(range);
    const start = match?.[1] ? parseInt(match[1], 10) : 0;
    const end = match?.[2] ? parseInt(match[2], 10) : size - 1;
    if (start >= size) {
      res.writeHead(416, {'Content-Range': `bytes */${size}`});
      return res.end();
    }
    res.writeHead(206, {
      'Content-Type': type,
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Content-Length': end - start + 1,
      'Accept-Ranges': 'bytes',
    });
    return createReadStream(filePath, {start, end}).pipe(res);
  }
  res.writeHead(200, {'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes'});
  createReadStream(filePath).pipe(res);
};

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (c) => {
      data += c;
      if (data.length > 5_000_000) reject(new Error('Body too large'));
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = decodeURIComponent(url.pathname);

  try {
    if (pathname === '/' || pathname === '/index.html') {
      return serveFile(req, res, path.join(__dirname, 'index.html'));
    }

    // Studio assets (manifest previews).
    if (pathname.startsWith('/assets/')) {
      const rel = pathname.slice('/assets/'.length);
      const filePath = path.join(ASSETS_DIR, rel);
      if (!filePath.startsWith(ASSETS_DIR)) {
        res.writeHead(403);
        return res.end('Forbidden');
      }
      return serveFile(req, res, filePath);
    }

    if (pathname === '/api/manifest' && req.method === 'GET') {
      const raw = await readFile(path.join(ASSETS_DIR, 'manifest.json'), 'utf8');
      res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
      return res.end(raw);
    }

    if (pathname === '/api/boards' && req.method === 'GET') {
      await mkdir(BOARDS_DIR, {recursive: true});
      const files = (await readdir(BOARDS_DIR)).filter((f) => f.endsWith('.json'));
      const boards = [];
      for (const f of files) {
        try {
          boards.push(JSON.parse(await readFile(path.join(BOARDS_DIR, f), 'utf8')));
        } catch {
          console.warn(`Skipping unreadable board file: ${f}`);
        }
      }
      boards.sort((a, b) => (b.updatedAt ?? '').localeCompare(a.updatedAt ?? ''));
      return json(res, 200, boards);
    }

    const boardMatch = pathname.match(/^\/api\/boards\/([^/]+)$/);
    if (boardMatch) {
      const name = boardMatch[1];
      if (!safeBoardName(name)) return json(res, 400, {error: 'Board names must be kebab-case'});
      const filePath = path.join(BOARDS_DIR, `${name}.json`);

      if (req.method === 'PUT') {
        const body = JSON.parse(await readBody(req));
        body.name = name;
        body.updatedAt = new Date().toISOString();
        await mkdir(BOARDS_DIR, {recursive: true});
        await writeFile(filePath, JSON.stringify(body, null, 2) + '\n');
        return json(res, 200, {ok: true, updatedAt: body.updatedAt});
      }
      if (req.method === 'DELETE') {
        if (existsSync(filePath)) await unlink(filePath);
        return json(res, 200, {ok: true});
      }
    }

    res.writeHead(404);
    res.end('Not found');
  } catch (err) {
    console.error(err);
    json(res, 500, {error: String(err.message ?? err)});
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Storyboard running at http://localhost:${PORT}`);
  console.log(`Boards saved to ${path.relative(ROOT, BOARDS_DIR)}/`);
});
