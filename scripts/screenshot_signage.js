const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const CHROME = '/home/dev/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome';
const WIDTH = 1080;
const HEIGHT = 1920;

async function screenshot(htmlPath, outPath) {
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });
  await page.goto('file://' + path.resolve(htmlPath), { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: outPath, fullPage: false });
  await browser.close();
  console.log('saved', outPath);
}

(async () => {
  const files = process.argv.slice(2);
  if (!files.length) { console.error('Usage: node screenshot_signage.js file1.html [file2.html ...]'); process.exit(1); }
  const outDir = path.join(__dirname, '..', 'dist', 'screenshots');
  fs.mkdirSync(outDir, { recursive: true });
  for (const f of files) {
    const name = path.basename(f, '.html') + '.png';
    await screenshot(f, path.join(outDir, name));
  }
})();
