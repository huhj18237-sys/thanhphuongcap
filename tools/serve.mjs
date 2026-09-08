import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.mp4': 'video/mp4' };
http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const file = path.resolve(root, relative);
  if (!file.startsWith(`${root}${path.sep}`)) { response.writeHead(403).end(); return; }
  fs.createReadStream(file).on('error', () => response.writeHead(404).end('Not found')).once('open', () => response.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' })).pipe(response);
}).listen(4173, '127.0.0.1', () => console.log('Preview: http://127.0.0.1:4173'));
