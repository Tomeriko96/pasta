// Fails the build when a page in dist/ links to an internal page, image, font,
// script or PDF that does not exist, or to a #fragment missing on that page.
// External links (https://, tel:, mailto:) are not checked.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, extname, dirname, posix } from 'node:path';

const DIST = 'dist';
const BASE = (process.env.BASE_PATH ?? '/').replace(/\/$/, ''); // '' or '/sfb'

const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (extname(p) === '.html') pages.push(p);
  }
})(DIST);

function resolve(urlPath) {
  const p = join(DIST, decodeURIComponent(urlPath));
  // Strict: no `.html` guessing, so a link only passes if it works on any
  // static server (python -m http.server, GitHub Pages, Cloudflare).
  for (const c of [p, join(p, 'index.html')]) {
    if (existsSync(c) && statSync(c).isFile()) return c;
  }
  return null;
}

const idsCache = new Map();
function ids(file) {
  if (!idsCache.has(file)) {
    idsCache.set(file, new Set([...readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idsCache.get(file);
}

const problems = [];
let checked = 0;
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const urls = [
    ...[...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(/\s+/)[0])),
  ];
  for (const raw of urls) {
    if (/^(https?:|tel:|mailto:|data:)/.test(raw)) continue;
    const [pathPart, frag] = raw.split('#');
    let target;
    if (!pathPart) target = page; // same-page #fragment
    else {
      let path = pathPart.split('?')[0];
      if (!path.startsWith('/')) path = posix.join('/', dirname(page.slice(DIST.length)), path);
      if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length) || '/';
      target = resolve(path);
    }
    checked++;
    if (!target) problems.push(`${page}: missing ${raw}`);
    else if (frag && extname(target) === '.html' && !ids(target).has(frag)) problems.push(`${page}: missing #${frag} in ${raw}`);
  }
}

if (problems.length) {
  console.error(`Link check failed (${problems.length}):\n` + [...new Set(problems)].join('\n'));
  process.exit(1);
}
console.log(`Link check: ${checked} internal links on ${pages.length} pages, all resolve`);
