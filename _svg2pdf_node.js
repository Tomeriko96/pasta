const PDFDocument = require('pdfkit');
const SVGtoPDF   = require('svg-to-pdfkit');
const fs         = require('fs');

const src = process.argv[2];
const dst = process.argv[3];

if (!src || !dst) {
  process.stderr.write('Usage: node _svg2pdf_node.js in.svg out.pdf\n');
  process.exit(1);
}

const svg = fs.readFileSync(src, 'utf8');

const w = parseFloat((svg.match(/<svg[^>]+\bwidth="([0-9.]+)"/)  || [])[1] || '595');
const h = parseFloat((svg.match(/<svg[^>]+\bheight="([0-9.]+)"/) || [])[1] || '842');

const doc = new PDFDocument({ size: [w, h], margin: 0, autoFirstPage: false });
const out = fs.createWriteStream(dst);
doc.pipe(out);
doc.addPage({ size: [w, h], margin: 0 });
SVGtoPDF(doc, svg, 0, 0, { width: w, height: h });
doc.end();
out.on('finish', () => process.exit(0));
out.on('error',  e  => { process.stderr.write(e.message + '\n'); process.exit(1); });
