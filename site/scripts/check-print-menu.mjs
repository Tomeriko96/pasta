// Fails the build when the print menu (../menu_definitief_hybrid_CLEAN.html)
// and the website menu (src/data/menu.json) disagree on a dish, a price or an
// English description. Guests should never see two different prices.
// Fix the side that is wrong, then re-render the PDF if the print menu changed.
import { readFileSync } from 'node:fs';

const PRINT = '../menu_definitief_hybrid_CLEAN.html';
const menu = JSON.parse(readFileSync('src/data/menu.json', 'utf8'));
const html = readFileSync(PRINT, 'utf8');

const decode = (s) =>
  s.replace(/&agrave;/g, 'à').replace(/&egrave;/g, 'è').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'").replace(/\s+/g, ' ').trim();

// <span class="nm|lnm|en">Name</span> ... <span class="pz|lpz">19</span> [</h3><p>Description</p>]
const re = /<span class="(?:nm|lnm|en)">(.*?)<\/span>(?:<span class="(?:ldr|sp)"><\/span>)?<span class="(?:pz|lpz)">(.*?)<\/span>(?:<\/h3><p>(.*?)<\/p>)?/g;
const print = new Map();
for (const m of html.matchAll(re)) {
  print.set(decode(m[1]), { price: Number(decode(m[2]).replace(',', '.')), desc: m[3] ? decode(m[3]) : undefined });
}

const problems = [];
const web = new Map();
for (const s of menu.sections) for (const i of s.items) web.set(i.name, i);

for (const [name, item] of web) {
  const p = print.get(name);
  if (!p) { problems.push(`On the website, missing from print: ${name}`); continue; }
  if (p.price !== item.price) problems.push(`Price differs for ${name}: website ${item.price}, print ${p.price}`);
  if ((item.desc?.en ?? undefined) !== p.desc) problems.push(`Description differs for ${name}:\n    website: ${item.desc?.en}\n    print:   ${p.desc}`);
}
for (const name of print.keys()) if (!web.has(name)) problems.push(`In print, missing from website: ${name}`);

if (problems.length) {
  console.error(`Print menu check failed (${problems.length}):\n  ` + problems.join('\n  '));
  process.exit(1);
}
console.log(`Print menu check: ${web.size} items, website and print menu match`);
