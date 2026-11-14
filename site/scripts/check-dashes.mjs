// Fails the build if an em-dash or en-dash reaches the published site.
// They read as AI-generated copy; use a period, comma or colon instead.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const TEXT = new Set(['.html', '.txt', '.xml']);
const BAD = [/[–—]/, /&mdash;|&ndash;|&#821[12];/];
const hits = [];

(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (TEXT.has(extname(p))) {
      const s = readFileSync(p, 'utf8');
      for (const re of BAD) {
        const m = s.match(re);
        if (m) hits.push(`${p}: ...${s.slice(Math.max(0, m.index - 40), m.index + 40).replace(/\s+/g, ' ')}...`);
      }
    }
  }
})('dist');

if (hits.length) {
  console.error(`Dash check failed (${hits.length}):\n` + hits.join('\n'));
  process.exit(1);
}
console.log('Dash check: no em-dashes or en-dashes in dist/');
