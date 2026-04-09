/**
 * _svg2png_node.js — render SVG → PNG via sharp
 *
 * Because this environment has no system fonts / fontconfig, we embed
 * the project's bundled fonts as base64 @font-face rules directly into
 * the SVG before passing it to sharp/librsvg. This makes text render
 * correctly regardless of what is (or isn't) installed on the host.
 *
 * Bundled fonts (fonts/):
 *   EBGaramond-Regular / Italic / Bold  — open-source Palatino-class serif
 *   Mapped to: Palatino Linotype, Palatino, Book Antiqua, Georgia, serif
 */

const sharp = require('sharp');
const fs    = require('fs');
const path  = require('path');

const src   = process.argv[2];
const dst   = process.argv[3];
const scale = parseFloat(process.argv[4] || '1.5');

if (!src || !dst) {
  process.stderr.write('Usage: node _svg2png_node.js in.svg out.png [scale]\n');
  process.exit(1);
}

// ── load project fonts as base64 ────────────────────────────────────────────
const FONT_DIR = path.join(__dirname, 'fonts');

function fontB64(filename) {
  const p = path.join(FONT_DIR, filename);
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p).toString('base64');
}

const regularB64 = fontB64('EBGaramond-Regular.ttf');
const italicB64  = fontB64('EBGaramond-Italic.ttf');
const boldB64    = fontB64('EBGaramond-Bold.ttf');

function buildFontFaceCSS() {
  const faces = [];
  const families = [
    'Palatino Linotype', 'Palatino', 'Book Antiqua', 'Georgia',
    'EB Garamond', 'serif',
  ];

  for (const family of families) {
    if (regularB64) faces.push(
      `@font-face { font-family: '${family}'; font-weight: normal; font-style: normal;` +
      ` src: url('data:font/truetype;base64,${regularB64}') format('truetype'); }`
    );
    if (italicB64) faces.push(
      `@font-face { font-family: '${family}'; font-weight: normal; font-style: italic;` +
      ` src: url('data:font/truetype;base64,${italicB64}') format('truetype'); }`
    );
    if (boldB64) faces.push(
      `@font-face { font-family: '${family}'; font-weight: bold; font-style: normal;` +
      ` src: url('data:font/truetype;base64,${boldB64}') format('truetype'); }`
    );
  }
  return faces.join('\n');
}

// ── inject font CSS into SVG <defs> ─────────────────────────────────────────
function injectFonts(svgStr) {
  const css   = buildFontFaceCSS();
  const style = `<defs><style>${css}</style></defs>`;

  // If there's already a <defs> block, insert the style inside it
  if (/<defs[\s>]/.test(svgStr)) {
    return svgStr.replace(/<defs([\s>])/, `<defs$1<style>${css}</style>`);
  }
  // Otherwise insert right after the opening <svg ...> tag
  return svgStr.replace(/(<svg[^>]*>)/, `$1${style}`);
}

// ── read, inject, render ─────────────────────────────────────────────────────
const svgStr = fs.readFileSync(src, 'utf8');
const patched = injectFonts(svgStr);

const w = parseFloat((svgStr.match(/<svg[^>]+\bwidth="([0-9.]+)"/)  || [])[1] || '595');
const h = parseFloat((svgStr.match(/<svg[^>]+\bheight="([0-9.]+)"/) || [])[1] || '842');

sharp(Buffer.from(patched))
  .resize(Math.round(w * scale), Math.round(h * scale))
  .png()
  .toFile(dst)
  .then(() => process.exit(0))
  .catch(e => { process.stderr.write(e.message + '\n'); process.exit(1); });
