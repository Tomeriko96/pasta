const sharp = require('sharp');
const fs    = require('fs');

const src   = process.argv[2];
const dst   = process.argv[3];
const scale = parseFloat(process.argv[4] || '1.5');

if (!src || !dst) {
  process.stderr.write('Usage: node _svg2png_node.js in.svg out.png [scale]\n');
  process.exit(1);
}

const svg = fs.readFileSync(src);
const str = svg.toString();

const w = parseFloat((str.match(/<svg[^>]+\bwidth="([0-9.]+)"/)  || [])[1] || '595');
const h = parseFloat((str.match(/<svg[^>]+\bheight="([0-9.]+)"/) || [])[1] || '842');

sharp(svg)
  .resize(Math.round(w * scale), Math.round(h * scale))
  .png()
  .toFile(dst)
  .then(() => process.exit(0))
  .catch(e => { process.stderr.write(e.message + '\n'); process.exit(1); });
