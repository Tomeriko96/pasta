#!/usr/bin/env node
/*
 * Render attract_v12_white_loop.html (repo root) into a seamlessly-looping MP4.
 * Mirrors the capture + xfade logic of build_signage_video.js, but for the
 * single root attract board. Output: attract-v12-white-loop.mp4 (repo root).
 *
 * Usage: node scripts/build_attract_video.js
 */

const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = process.cwd();
const SRC = process.argv[2] || "attract_v12_white_loop.html";
const OUT = process.argv[3] || "attract-v12-white-loop.mp4";

function resolveFFmpeg() {
  try { execSync("ffmpeg -version", { stdio: "ignore" }); return "ffmpeg"; } catch (_) {}
  try {
    const p = execSync(
      "uv run --with imageio-ffmpeg python -c \"import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())\"",
      { encoding: "utf8" }
    ).trim();
    if (p && fs.existsSync(p)) return p;
  } catch (_) {}
  throw new Error("ffmpeg not found. Install it or run: uv run --with imageio-ffmpeg true");
}
const FFMPEG = resolveFFmpeg();

const BUILD = path.join(ROOT, "build", "signage-video");
fs.mkdirSync(BUILD, { recursive: true });
fs.mkdirSync(path.join(BUILD, "images"), { recursive: true });

// Copy images so `images/` resolves next to the temp html.
if (fs.existsSync(path.join(ROOT, "images"))) {
  for (const n of fs.readdirSync(path.join(ROOT, "images"))) {
    const s = path.join(ROOT, "images", n);
    if (fs.statSync(s).isFile()) fs.copyFileSync(s, path.join(BUILD, "images", n));
  }
}

const EXEC = "/home/dev/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome";
const CAPTURE_MS = process.env.CAPTURE_MS ? parseInt(process.env.CAPTURE_MS) : 24000;
const LEAD_IN = 2;
const FADE = 1;

function patch(src) {
  let html = fs.readFileSync(src, "utf8");
  html = html.replace(/(?:\.\.\/)+images\//g, "images/");
  html = html.replace(/(?:\.\.\/)+signage_images\//g, "signage_images/");
  return html;
}

function probeDuration(file) {
  const out = execSync(`"${FFMPEG}" -i "${file}" 2>&1 || true`, { encoding: "utf8", shell: true });
  const m = out.match(/Duration:\s*(\d+):(\d+):([\d.]+)/);
  if (!m) throw new Error("Could not parse duration from: " + file);
  return parseInt(m[1]) * 3600 + parseInt(m[2]) * 60 + parseFloat(m[3]);
}

function encodeLoop(webm, mp4, L) {
  const S = LEAD_IN;
  if (L <= S + 1) {
    execSync(
      `"${FFMPEG}" -y -ss ${S} -i "${webm}" -vf "fps=30" ` +
        `-c:v libx264 -profile:v baseline -level 4.0 -preset medium -crf 23 -pix_fmt yuv420p -movflags +faststart "${mp4}"`,
      { stdio: "inherit", shell: true }
    );
    return;
  }
  const D = Math.max(0.3, Math.min(FADE, (L - S) / 2 - 0.2));
  const filter =
    `[0:v]fps=30,trim=${S}:${L},setpts=PTS-STARTPTS,split=2[body][pre];` +
    `[pre]trim=0:${D},setpts=PTS-STARTPTS,fps=30[pre];` +
    `[body]trim=${D},setpts=PTS-STARTPTS,fps=30[body];` +
    `[body][pre]xfade=transition=fade:duration=${D}:offset=${(L - S - D).toFixed(3)}[v]`;
  execSync(
    `"${FFMPEG}" -y -i "${webm}" -filter_complex "${filter}" -map "[v]" ` +
      `-c:v libx264 -profile:v baseline -level 4.0 -preset medium -crf 23 -pix_fmt yuv420p -movflags +faststart "${mp4}"`,
    { stdio: "inherit", shell: true }
  );
}

(async () => {
  const tmp = path.join(BUILD, path.basename(SRC));
  fs.writeFileSync(tmp, patch(path.join(ROOT, SRC)));

  const browser = await chromium.launch({
    executablePath: EXEC,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const ctx = await browser.newContext({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 1,
    recordVideo: { dir: BUILD, size: { width: 1080, height: 1920 } },
  });
  const page = await ctx.newPage();
  await page.goto("file://" + tmp, { waitUntil: "networkidle" });
  await page.waitForTimeout(CAPTURE_MS);
  await ctx.close();
  await browser.close();

  const webms = fs
    .readdirSync(BUILD)
    .filter((f) => f.endsWith(".webm"))
    .sort((a, b) => fs.statSync(path.join(BUILD, b)).mtime - fs.statSync(path.join(BUILD, a)).mtime);
  if (!webms.length) throw new Error("No webm recorded");
  const webm = path.join(BUILD, webms[0]);

  const mp4 = path.join(ROOT, OUT);
  const L = probeDuration(webm);
  encodeLoop(webm, mp4, L);
  fs.unlinkSync(webm);
  console.log(`[ok] ${SRC} -> ${mp4} (${(L - 0).toFixed(1)}s source)`);
})().catch((e) => {
  console.error("[error]", e);
  process.exit(1);
});
