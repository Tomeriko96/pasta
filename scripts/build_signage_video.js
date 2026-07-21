#!/usr/bin/env node
/*
 * Render every menu HTML variant into a seamlessly-looping MP4 for USB Plug &
 * Play. No app install / SI Server Setting / manifest needed: copy the .mp4
 * files onto a FAT32 stick and they auto-play and loop.
 *
 * Each clip is crossfaded end->start so the loop has no visible jump. (The TV's
 * own 1s black between loops is a player behaviour; see SIGNAGE_PLAN.md C2.6.)
 *
 * The live clock and 10-min auto-reload are stripped for the render (a frozen
 * clock on a loop looks wrong).
 *
 * Usage: node scripts/build_signage_video.js
 * Output: dist/usb/videos/<name>.mp4  (+ dist/usb/menu-signage.mp4 = main)
 */

const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = process.cwd();
const BUILD = path.join(ROOT, "build", "signage-video");
fs.mkdirSync(BUILD, { recursive: true });
fs.mkdirSync(path.join(BUILD, "images"), { recursive: true });

// Make both `images/` and `../images/` resolve when the temp html lives in BUILD.
copyImages(path.join(ROOT, "images"), path.join(BUILD, "images"));

const EXEC = "/home/dev/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome";
const CAPTURE_MS = 20000;
const LEAD_IN = 2; // seconds of load/blank at the very start to discard
const FADE = 1; // seconds of crossfade for a seamless loop

// (source relative path, output base name, label)
const VARIANTS = [
  ["menu_screen.html", "menu-signage", "Main (merged)"],
  ["lg_menu/menu_screen_design.html", "lgmenu-design", "lg_menu / design"],
  ["lg_menu/menu_screen_motion.html", "lgmenu-motion", "lg_menu / motion"],
  ["lg_menu/menu_screen_tech.html", "lgmenu-tech", "lg_menu / tech"],
  ["lg_menu/menu_screen_typography.html", "lgmenu-typography", "lg_menu / typography"],
  ["lg_menu/menu_screen_ux.html", "lgmenu-ux", "lg_menu / ux"],
  ["lg_menu_v2/menu_screen_design.html", "lgmenuv2-design", "lg_menu_v2 / design"],
  ["lg_menu_v2/menu_screen_motion.html", "lgmenuv2-motion", "lg_menu_v2 / motion"],
  ["lg_menu_v2/menu_screen_ux.html", "lgmenuv2-ux", "lg_menu_v2 / ux"],
  ["lg_menu_v3/menu_signage_classic.html", "lgmenuv3-classic", "v3 / classic"],
  ["lg_menu_v3/menu_signage_editorial.html", "lgmenuv3-editorial", "v3 / editorial"],
  ["lg_menu_v3/menu_signage_minimal.html", "lgmenuv3-minimal", "v3 / minimal"],
  ["lg_menu_v3/menu_signage_bistro.html", "lgmenuv3-bistro", "v3 / bistro"],
  ["lg_menu_v3/menu_signage_hero.html", "lgmenuv3-hero", "v3 / hero"],
  ["lg_menu_v3/menu_signage_attract_photo.html", "lgmenuv3-attract-photo", "v3 / attract-photo"],
  ["lg_menu_v3/menu_signage_attract_type.html", "lgmenuv3-attract-type", "v3 / attract-type"],
  ["lg_menu_v3/menu_signage_street_photo.html", "lgmenuv3-street-photo", "v3 / street-photo"],
  ["lg_menu_v3/menu_signage_street_offer.html", "lgmenuv3-street-offer", "v3 / street-offer"],
  ["lg_menu_v3/menu_signage_street_trio.html", "lgmenuv3-street-trio", "v3 / street-trio"],
  ["lg_menu_v3/menu_signage_street_aperitivo.html", "lgmenuv3-street-aperitivo", "v3 / street-aperitivo"],
  ["lg_menu_v3/menu_signage_street_open.html", "lgmenuv3-street-open", "v3 / street-open"],
  ["lg_menu_v3/menu_signage_vibe_family.html", "lgmenuv3-vibe-family", "v3 / vibe-family"],
  ["lg_menu_v3/menu_signage_vibe_fresh.html", "lgmenuv3-vibe-fresh", "v3 / vibe-fresh"],
  ["lg_menu_v3/menu_signage_vibe_roma.html", "lgmenuv3-vibe-roma", "v3 / vibe-roma"],
  ["lg_menu_v3/menu_signage_vibe_stagione.html", "lgmenuv3-vibe-stagione", "v3 / vibe-stagione"],
  ["lg_menu_v3/menu_signage_vibe_benvenuti.html", "lgmenuv3-vibe-benvenuti", "v3 / vibe-benvenuti"],
  ["lg_menu_v3/menu_signage_lc_hero.html", "lgmenuv3-lc-hero", "La Carbonara / hero"],
  ["lg_menu_v3/menu_signage_lc_antipasti.html", "lgmenuv3-lc-antipasti", "La Carbonara / antipasti"],
  ["lg_menu_v3/menu_signage_lc_pasta.html", "lgmenuv3-lc-pasta", "La Carbonara / pasta"],
  ["lg_menu_v3/menu_signage_lc_mare.html", "lgmenuv3-lc-mare", "La Carbonara / mare"],
  ["lg_menu_v3/menu_signage_lc_chiusura.html", "lgmenuv3-lc-chiusura", "La Carbonara / chiusura"],
  ["lg_menu_v3/menu_signage_lc_light.html", "lgmenuv3-lc-light", "La Carbonara / light"],
  ["lg_menu_v3/menu_signage_lc_gallery.html", "lgmenuv3-lc-gallery", "La Carbonara / gallery"],
  ["lg_menu_v3/menu_signage_lc_columns.html", "lgmenuv3-lc-columns", "La Carbonara / columns"],
  ["lg_menu_v3/menu_signage_lc_carousel.html", "lgmenuv3-lc-carousel", "La Carbonara / carousel"],
  ["lg_menu_v3/menu_signage_lc_benvenuto.html", "lgmenuv3-lc-benvenuto", "La Carbonara / benvenuto"],
  ["lg_menu_v3/menu_signage_lc_antipasti_v2.html", "lgmenuv3-lc-antipasti-v2", "La Carbonara / antipasti v2"],
  ["lg_menu_v3/menu_signage_lc_primi.html", "lgmenuv3-lc-primi", "La Carbonara / primi"],
  ["lg_menu_v3/menu_signage_lc_mare_e_bere.html", "lgmenuv3-lc-mare-e-bere", "La Carbonara / mare e bere"],
  ["lg_menu_v3/menu_signage_lc_arrivederci.html", "lgmenuv3-lc-arrivederci", "La Carbonara / arrivederci"],
  ["lg_menu_v3/menu_signage_lc_single_v1.html", "lgmenuv3-lc-single-v1", "La Carbonara / single v1"],
  ["lg_menu_v3/menu_signage_lc_single_v2.html", "lgmenuv3-lc-single-v2", "La Carbonara / single v2"],
  ["lg_menu_v3/menu_signage_lc_single_v3.html", "lgmenuv3-lc-single-v3", "La Carbonara / single v3"],
  ["lg_menu_v3/menu_signage_lc_single_v4.html", "lgmenuv3-lc-single-v4", "La Carbonara / single v4"],
  ["lg_menu_v3/menu_signage_lc_single_v5.html", "lgmenuv3-lc-single-v5", "La Carbonara / single v5"],
  ["lg_menu_v3/menu_signage_lc_single_v6.html", "lgmenuv3-lc-single-v6", "La Carbonara / single v6"],
  ["lg_menu_v3/menu_signage_lc_single_v7.html", "lgmenuv3-lc-single-v7", "La Carbonara / single v7"],
  ["lg_menu_v3/menu_signage_lc_single_v8.html", "lgmenuv3-lc-single-v8", "La Carbonara / single v8"],
  ["lg_menu_v3/menu_signage_lc_single_v9.html", "lgmenuv3-lc-single-v9", "La Carbonara / single v9"],
  ["lg_menu_v3/menu_signage_lc_single_v10.html", "lgmenuv3-lc-single-v10", "La Carbonara / single v10"],
  ["lg_menu_v3/menu_signage_lc_single_w1.html", "lgmenuv3-lc-single-w1", "La Carbonara / single w1"],
  ["lg_menu_v3/menu_signage_lc_single_w2.html", "lgmenuv3-lc-single-w2", "La Carbonara / single w2"],
  ["lg_menu_v3/menu_signage_lc_single_w3.html", "lgmenuv3-lc-single-w3", "La Carbonara / single w3"],
  ["lg_menu_v3/menu_signage_lc_single_w4.html", "lgmenuv3-lc-single-w4", "La Carbonara / single w4"],
  ["lg_menu_v3/menu_signage_lc_single_w5.html", "lgmenuv3-lc-single-w5", "La Carbonara / single w5"],
  ["lg_menu_v3/menu_signage_lc_single_w6.html", "lgmenuv3-lc-single-w6", "La Carbonara / single w6"],
  ["lg_menu_v3/menu_signage_lc_single_w7.html", "lgmenuv3-lc-single-w7", "La Carbonara / single w7"],
  ["lg_menu_v3/menu_signage_lc_single_w8.html", "lgmenuv3-lc-single-w8", "La Carbonara / single w8"],
  ["lg_menu_v3/menu_signage_lc_single_w9.html", "lgmenuv3-lc-single-w9", "La Carbonara / single w9"],
  ["lg_menu_v3/menu_signage_lc_single_w10.html", "lgmenuv3-lc-single-w10", "La Carbonara / single w10"],
  ["lg_menu_v3/menu_signage_lc_single_x1.html", "lgmenuv3-lc-single-x1", "La Carbonara / single x1"],
  ["lg_menu_v3/menu_signage_lc_single_x2.html", "lgmenuv3-lc-single-x2", "La Carbonara / single x2"],
  ["lg_menu_v3/menu_signage_lc_single_x3.html", "lgmenuv3-lc-single-x3", "La Carbonara / single x3"],
  ["lg_menu_v3/menu_signage_lc_single_x4.html", "lgmenuv3-lc-single-x4", "La Carbonara / single x4"],
  ["lg_menu_v3/menu_signage_lc_single_x5.html", "lgmenuv3-lc-single-x5", "La Carbonara / single x5"],
  ["lg_menu_v3/menu_signage_lc_single_x6.html", "lgmenuv3-lc-single-x6", "La Carbonara / single x6"],
  ["lg_menu_v3/color_variants/menu_signage_lc_y1_white.html", "lgmenuv3-lc-y1-white", "La Carbonara / y1 white"],
  ["lg_menu_v3/color_variants/menu_signage_lc_y1_cream.html", "lgmenuv3-lc-y1-cream", "La Carbonara / y1 cream"],
  ["lg_menu_v3/color_variants/menu_signage_lc_y1_sage.html", "lgmenuv3-lc-y1-sage", "La Carbonara / y1 sage"],
  ["lg_menu_v3/color_variants/menu_signage_lc_y1_rose.html", "lgmenuv3-lc-y1-rose", "La Carbonara / y1 rose"],
  ["lg_menu_v3/color_variants/menu_signage_lc_y1_sand.html", "lgmenuv3-lc-y1-sand", "La Carbonara / y1 sand"],
  ["lg_menu_v3/color_variants/menu_signage_lc_y1_dark.html", "lgmenuv3-lc-y1-dark", "La Carbonara / y1 dark"],
  ["lg_menu_v3/color_variants/menu_signage_lc_y1_cream_clean.html", "lgmenuv3-lc-y1-cream-clean", "La Carbonara / y1 cream clean"],
];

function copyImages(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  for (const n of fs.readdirSync(srcDir)) {
    const s = path.join(srcDir, n);
    if (fs.statSync(s).isFile()) fs.copyFileSync(s, path.join(destDir, n));
  }
}

function patch(src) {
  let html = fs.readFileSync(src, "utf8");
  html = html.replace("<style>", "<style>\n#clock{display:none!important}\n");
  html = html.replace(
    /setTimeout\(function \(\) \{ location\.reload\(\); \}, 10 \* 60 \* 1000\);/,
    "/* auto-reload disabled for video render */"
  );
  html = html.replace(
    /setTimeout\(function \(\) \{ location\.reload\(\); \}, 600000\);/,
    "/* auto-reload disabled for video render */"
  );
  html = html.replace(
    /<meta http-equiv="refresh" content="\d+">/,
    "<!-- meta-refresh disabled for video render -->"
  );
  html = html.replace(/(?:\.\.\/)+images\//g, "images/");
  return html;
}

function probeDuration(file) {
  const out = execSync(
    `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${file}"`
  )
    .toString()
    .trim();
  return parseFloat(out);
}

function encodeLoop(webm, mp4, L) {
  // Discard LEAD_IN seconds (page still loading fonts/images -> would be blank),
  // then crossfade the tail into a fully-rendered frame so the loop has no jump
  // or blank frame.
  const S = LEAD_IN;
  if (L <= S + 1) {
    // Clip too short to loop cleanly: just trim the lead-in and pass through.
    execSync(
      `ffmpeg -y -ss ${S} -i "${webm}" -vf "fps=30" ` +
        `-c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p -movflags +faststart "${mp4}"`,
      { stdio: "inherit" }
    );
    return;
  }
  const D = Math.max(0.3, Math.min(FADE, (L - S) / 2 - 0.2));
  const filter =
    `[0:v]trim=${S}:${L},setpts=PTS-STARTPTS,fps=30,split=2[body][pre];` +
    `[pre]trim=0:${D},setpts=PTS-STARTPTS[pre];` +
    `[body]trim=${D},setpts=PTS-STARTPTS[body];` +
    `[body][pre]xfade=transition=fade:duration=${D}:offset=${(L - S - D).toFixed(3)}[v]`;
  execSync(
    `ffmpeg -y -i "${webm}" -filter_complex "${filter}" -map "[v]" ` +
      `-c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p -movflags +faststart "${mp4}"`,
    { stdio: "inherit" }
  );
}

async function renderOne(srcRel, outBase, label) {
  const tmp = path.join(BUILD, outBase + ".html");
  fs.writeFileSync(tmp, patch(path.join(ROOT, srcRel)));

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

  const webms = fs.readdirSync(BUILD).filter((f) => f.endsWith(".webm"));
  if (!webms.length) throw new Error("No webm recorded for " + label);
  // newest webm
  webms.sort(
    (a, b) =>
      fs.statSync(path.join(BUILD, b)).mtime - fs.statSync(path.join(BUILD, a)).mtime
  );
  const webm = path.join(BUILD, webms[0]);

  const outDir = path.join(ROOT, "dist", "usb", "videos");
  fs.mkdirSync(outDir, { recursive: true });
  const mp4 = path.join(outDir, outBase + ".mp4");
  const L = probeDuration(webm);
  encodeLoop(webm, mp4, L);
  fs.unlinkSync(webm);
  console.log(`[ok] ${label} -> ${mp4} (${(L - 0).toFixed(1)}s source)`);
  return { outBase, mp4 };
}

(async () => {
  // Optional filter: `node build_signage_video.js base1 base2 ...` renders only
  // the named variants (matches outBase). No args = render everything.
  const wanted = process.argv.slice(2);
  const variants = wanted.length
    ? VARIANTS.filter(([, base]) => wanted.includes(base))
    : VARIANTS;
  if (!variants.length) {
    console.error("[error] No variants match: " + wanted.join(", "));
    process.exit(1);
  }
  const results = [];
  for (const [src, base, label] of variants) {
    if (!fs.existsSync(path.join(ROOT, src))) {
      console.log(`[skip] missing ${src}`);
      continue;
    }
    results.push(await renderOne(src, base, label));
  }
  // Convenience: also drop the main as dist/usb/menu-signage.mp4
  const main = results.find((r) => r.outBase === "menu-signage");
  if (main) {
    fs.copyFileSync(main.mp4, path.join(ROOT, "dist", "usb", "menu-signage.mp4"));
  }
  console.log(`\n[done] ${results.length} videos in dist/usb/videos/`);
  console.log("[next] Copy the .mp4 files to a FAT32 USB stick (any folder).");
  console.log("       Set TV orientation to PORTRAIT; USB Plug & Play loops them.");
})().catch((e) => {
  console.error("[error]", e);
  process.exit(1);
});
