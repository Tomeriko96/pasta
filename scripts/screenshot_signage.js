const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

// Unset: Playwright uses the browser build that matches the installed playwright-core.
const CHROME = process.env.CHROMIUM_PATH || undefined;
const WIDTH = 1080;
const HEIGHT = 1920;

async function screenshot(htmlPath, outPath) {
  let browser;
  try {
    browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
  } catch (err) {
    console.error('Could not launch Chromium. Run `node node_modules/playwright-core/cli.js install chromium` or set CHROMIUM_PATH.');
    throw err;
  }
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
