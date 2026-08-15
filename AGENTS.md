# AGENTS.md

## Project: Pasta Restaurant Menu

### Source Files

| File | Purpose |
|------|---------|
| `menu_definitief_hybrid_CLEAN.html` | **Single current menu** (the only menu HTML): 2-page A4, page 1 = Beverages (Soft Drinks / Alcohol-Free Cocktails / Coffee), page 2 = Antipasti & Pasta & Extras. Hybrid descriptions, manually renamed fizzy line ("Fizzy ... Lemonade"). Locked items & prices. PDF: `pdf-menus-weasyprint/menu_definitief_hybrid_CLEAN.pdf` (render via weasyprint, see Commands). |
| `pdf-menus-weasyprint/menu_definitief_hybrid_CLEAN.pdf` | Current weasyprint render of the menu (exactly 2 pages). |
| `menu_screen.html` | **LG signage page** for the 32SM5J-B (portrait, 1080×1920). Two-column static split: left = Antipasti & Drinks, right = Pasta. Image backgrounds + dark scrim, live clock, 10-min auto-reload. Right column header was renamed from "Pasta & Mare" after the seafood dishes were removed from the menu. |
| `images/` | Royalty-free food photos (all Unsplash, commercial use, no attribution required). Includes: `pasta-carbonara.jpg` (dark moody carbonara with Pecorino wheel), `focaccia.jpg` (lemon rosemary focaccia, dark bg), `bruschetta.jpg` (bruschetta board, candlelit trattoria), `linguine-mussels.jpg` (seafood pasta with mussels/calamari), `spritz-cocktail.jpg` (Aperol Spritz glasses), `olive-oil.jpg`, `italian-flatlay.jpg`, `qr-lacarbonara.png` (QR code for `menu_QR_alt.html`). `pasta-bowl-dark.jpg`, `cacio-e-pepe.jpg`, and `pasta-tomato.jpg` were deleted as dead files; **references to `pasta-bowl-dark.jpg` in `menu_screen.html` and `lg_menu*/` boards are left broken on purpose** (do not restore broken images). Used as section backgrounds in `menu_screen.html` and hero image in `menu_signage_lc_hero.html`. **Image usage rule for signage**: only use images that accurately represent what the restaurant serves. No wine/alcohol imagery (all drinks are 0.0%), no cheese boards (could misrepresent the actual cheeses). The 4 approved hero images for customer-facing signage rotation are: `pasta-carbonara.jpg`, `spritz-cocktail.jpg`, `bruschetta.jpg`, `focaccia.jpg`. Other images may appear in internal/variant boards but not in the final street-facing selection. |
| `signage_images/` | Curated set of 4 high-quality royalty-free images selected specifically for the `lg_signage` video output. Files: `pasta-carbonara.jpg` (hero carbonara, plays first), `bruschetta-tomato-close.jpg`, `extra-drink-2.jpg`, `extra-italian-7.jpg`. Referenced by `menu_signage_lc_y1_cream_si.html` and copied into the build directory by `build_signage_video.js` alongside `images/`. |
| `SIGNAGE_PLAN.md` | Full plan for deploying the menu on the LG 32SM5J-B signage display (device setup, layout, hosting, update workflow). Includes Part C2 (USB app) and C2.6 (USB video). **Read this before touching signage.** |
| `scripts/build_signage_usb.py` | Builds a self-contained **offline webOS app**: copies every `menu_screen*.html` variant, bundles the webfonts as woff2 + `fonts.css`, copies `images/`, adds a launcher page and `appinfo.json`, and zips to `dist/usb/application/pasta-signage.zip`. No network needed on the screen. |
| `scripts/build_signage_video.js` | Renders every signage HTML variant into a **seamlessly-looping MP4** (H.264, 1080×1920) for USB Plug & Play. Headless Chromium records the real CSS motion; the clock, 10-min reload, and meta-refresh are stripped (a frozen clock on a loop looks wrong). Normalizes `../images/` and `../signage_images/` paths so `lg_menu_v3/` variants find their assets in the build dir (both directories are copied into the build). Includes all La Carbonara `lc_*` boards. Supports selective rendering: `node scripts/build_signage_video.js lgmenuv3-lc-hero lgmenuv3-lc-pasta`. Output: `dist/usb/videos/*.mp4` (+ `dist/usb/menu-signage.mp4` = main). **Env overrides**: `SIGNAGE_OUT_DIR=path` redirects output to a different directory (e.g. `dist/usb/lg_signage`); `CAPTURE_MS=22000` overrides the Chromium capture duration (default 20000). **ffmpeg resolution**: tries system `ffmpeg` first, then falls back to the `imageio-ffmpeg` uv bundle automatically - no `sudo` or manual install needed. Xfade filter uses CFR-forced inputs to avoid variable-frame-rate errors from the Chromium webm. |
| `dist/usb/` | USB deploy artifacts: `application/pasta-signage.zip` (app route) and `menu-signage.mp4` + `videos/*.mp4` (video route). Includes `lgmenuv3-lc-{hero,antipasti,pasta,mare,chiusura}.mp4` for the La Carbonara 5-board loop. Copy to a FAT32 stick. |
| `dist/usb/lg_signage/` | Output directory for the `signage_images`-based video set. Contains `lgmenuv3-lc-y1-cream-si.mp4` (short test, ~3MB, ~20s, all 4 signage images cycling at 4.5s each) and `lgmenuv3-lc-y1-cream-clean-long.mp4` (3GB looped version for USB Plug & Play, 5h33m, produced by concatenating the short clip 992 times with `ffmpeg -f concat -c copy`). |
| `lg_menu/`, `lg_menu_v2/` | Signage variant experiments (design / motion / tech / typography / ux), each a portrait 1080×1920 page derived from `menu_screen.html`. All are bundled into the USB app and the video set so they can be A/B tested on the screen. |
| `lg_menu_v3/` | **Street-attraction signage**: five light, single-column full-menu boards (`menu_signage_{classic,editorial,minimal,bistro,hero}.html`) plus two street-puller boards (`menu_signage_attract_photo.html` = hero food photo + signatures + hook; `menu_signage_attract_type.html` = pure-type version) plus five SIMPLE one-message street boards (`menu_signage_street_{photo,offer,trio,aperitivo,open}.html`), and five AUTHENTIC-ITALIAN-VIBE boards (`menu_signage_vibe_{family,fresh,roma,stagione,benvenuti}.html`). Generated by `scripts/gen_signage_v3.py`, `scripts/gen_signage_attract.py`, `scripts/gen_signage_street.py`, `scripts/gen_signage_vibe.py`. The street/vibe boards drop the full drinks list and minor items and each carry ONE clear message (a dish+price, a craft/seasonal/family cue, a regional marker, or "open" + hours) so the TV cycles them as a rotating attract loop. They avoid tourist-trap signals (no all-caps hype, flags, photo menus, "Authentic!"): restraint, real Italian language, warmth. |
| `lg_menu_v3/menu_signage_lc_*.html` | **"La Carbonara" branded signage boards** for the 32SM5J-B. Dark warm background (#1c1917), cream text, terracotta prices, gold accents. Cormorant Garamond + Montserrat. All boards carry the restaurant name, live clock, 10-min auto-reload, prefers-reduced-motion support. **Original 5-board set**: lc_hero (food photo stopper), lc_antipasti (7 starters), lc_pasta (10 pasta dishes), lc_mare (drinks; seafood section removed with the seafood dishes), lc_chiusura (proverb + hours). **Extra layouts**: lc_light (cream bg full menu), lc_gallery (photo bands), lc_columns (two-column dark), lc_carousel (4-slide JS rotator). **V2 5-board set** (improved, each board has one job): lc_benvenuto (hero photo + 3 bestsellers with prices), lc_antipasti_v2 (photo band + 7 items grouped logically: piccoli assaggi/bruschette/da condividere), lc_primi (all 10 pasta + extras/add-ons, olive oil atmospheric strip), lc_mare_e_bere (spritz photo right strip + 0.0% drinks as proud feature; seafood removed), lc_arrivederci (italian-flatlay bg, proverb, hours, no-reservations, lacarbonara.nl). **Single all-in-one boards** (tourist street attention = 3 seconds, one board shows everything): lc_single_v1-v10 (first batch, various layouts), lc_single_w1-w10 (second batch, no dead space, full 1920px height via flex space-evenly/space-between). w-series concepts: w1 photo hero + single-column, w2 two-column full menu, w3 full-bleed photo bg + overlay, w4 split-screen photo left, w5 photo strips alternating with sections, w6 warm cream bg, w7 spritz hero, w8 price-forward grid tiles, w9 editorial luxury, w10 Italian flatlay bg + two-column. **x-series** (lc_single_x1-x6): refined layouts from the best v/w boards. **y-series** (lc_single_y1-y3): rotating image slideshow boards that cycle through 4 photos (carbonara, 0.0% spritz, bruschetta, focaccia) every 10s with CSS crossfade. y1 = hero banner top + full menu below, y2 = left side panel (spritz-first) + full menu right, y3 = left side panel (carbonara-first) + full menu right. |
| `lg_menu_v3/color_variants/` | **Color variants of y1** with expanded food menu (beverages removed, replaced with more bruschette; the old "Dal Mare" section was removed along with the seafood dishes). 7 variants: y1_white (clean white), y1_cream (warm cream), y1_sage (soft green), y1_rose (dusty blush), y1_sand (warm linen), y1_dark (original dark scheme), y1_cream_clean (cream without restaurant name or footer text). All have rotating 4-image slideshow, complementary color schemes. MP4 videos in `dist/usb/videos/lgmenuv3-lc-y1-{white,cream,sage,rose,sand,dark,cream-clean}.mp4`. **Also**: `menu_signage_lc_y1_cream_si.html` is a cream_clean variant that uses the 4 curated `signage_images/` (carbonara first, 4.5s interval so all 4 fit in a 22s capture). Built via `node scripts/build_signage_video.js` to `dist/usb/lg_signage/`. |
| `scripts/screenshot_signage.js` | Headless Chromium screenshot tool for visual QA of signage HTML at 1080x1920. Usage: `node scripts/screenshot_signage.js file1.html [file2.html ...]`. Output: `dist/screenshots/<name>.png`. |

### Architecture

- **Two menu surfaces** (the print/PDF menu and the LG signage are separate files; keep them in sync manually when dishes/prices change):
  1. **Print/PDF**: static A4 HTML (`menu_definitief_hybrid_CLEAN.html` is canonical), generated via weasyprint (see Commands).
  2. **LG signage**: `menu_screen.html`, a standalone portrait page for the 32SM5J-B. References local images in `images/`, so it must be hosted with the `images/` folder alongside it.
- A4 page dimensions hardcoded (210mm x 297mm) with `@page { size: A4 }`
- Two-page structure: Page 1 = Antipasti & Drinks, Page 2 = Pasta & Extras
- Fonts: Cormorant Garamond (headings/names) + Montserrat (body/prices) via Google Fonts `@import`
- PDF generation: `uv run weasyprint menu_definitief_hybrid_CLEAN.html pdf-menus-weasyprint/menu_definitief_hybrid_CLEAN.pdf` (requires system GTK libs: present in devcontainer)
- **Signage display**: LG 32SM5J-B, webOS 6.0, 1920×1080 panel used in **portrait (1080×1920)**. Deployed via the built-in **Play via URL** feature (Settings → EZ Settings → SI Server Setting → URL mode) pointing at a hosted `menu_screen.html`. No external PC. Full deployment plan in `SIGNAGE_PLAN.md`.
- **Two USB-only deployment routes** (no network, no host) are also supported, see `SIGNAGE_PLAN.md` Part C2 / C2.6:
  1. **App (ZIP)**: `python3 scripts/build_signage_usb.py` → `dist/usb/application/pasta-signage.zip`. Copy the `application/` folder to a FAT32 stick root; install via SI Server Setting (Launch Mode: Local, Type: ZIP, Upgrade: USB). Boots into a launcher to click between all variants. Live clock + animation preserved.
  2. **Video (MP4)**: `node scripts/build_signage_video.js` → `dist/usb/videos/*.mp4` (+ `menu-signage.mp4`). Copy the `.mp4` files to a FAT32 stick (any folder); USB Plug & Play auto-plays and loops with **zero setup**. Loses the live clock. Set TV orientation to PORTRAIT.
- `menu_screen.html` is **static 2-column** (no rotation): left column = Antipasti & Drinks, right column = Pasta. Includes a live clock and a 10-minute `setTimeout(location.reload)` so price edits appear without a manual reboot. Swap background images by editing the `background-image:url('images/...')` on each `.col .bg`.
- Variant HTMLs reference fonts via Google Fonts `@import` (CDN) and images via `images/` or `../images/`. `build_signage_usb.py` rewrites the font import to a local `fonts.css` and normalizes image paths to `images/`. `build_signage_video.js` renders them headless (so it needs network for the CDN fonts at build time).
- Image licensing: all files in `images/` are royalty-free for commercial use (Unsplash/Pexels), no attribution required.

### Agentic Sparring Workflow

Sparring rounds produced `menu_agentic_vN.html` files and the earlier `menu_improved*.html` variants. Those are no longer kept: the current single menu is `menu_definitief_hybrid_CLEAN.html` (hybrid descriptions from the last Claude session, with manually renamed fizzy items). When menu content changes, edit `menu_definitief_hybrid_CLEAN.html` directly and re-render the PDF.

### Locked Decisions

- **Menu items and prices are FINAL** (set in `menu_definitief_hybrid_CLEAN.html`). Never ship lowered prices.
- Keep the PDF in `pdf-menus-weasyprint/` in sync with the HTML (re-render after any edit).

### Known Issues

- `overflow: hidden` on `.page` silently clips content if a page overflows A4: keep page-2 content trimmed.
- `weasyprint` is not declared in `pyproject.toml`; install into the venv (`uv pip install weasyprint`) before rendering the PDF.
- **USB video loop seam**: a naive render shows a ~1s blank at the loop point because the clip's first second is still loading fonts/images. `build_signage_video.js` fixes this by discarding a 2s lead-in (`LEAD_IN`) and crossfading the tail into a fully-rendered frame. If a residual black still appears between loops on the TV, it is the player firmware's own transition: set USB playback **Conversion Effect -> Off** (or use the ZIP app route, which never loops a file).

### Item Name Conventions

- Italian dish names used as-is (Carbonara, Cacio e Pepe, Amatriciana)
- Fizzy drinks carry their brand + flavor: "Fizzy Amarena Fabbri Lemonade", "Fizzy Mint Lemonade", "Fizzy Lemon Lemonade", "Fizzy Strawberry Lemonade", "Fizzy Ice Tea Lemonade", "Fizzy Passionfruit Lemonade"
- "Extra" prefix for add-ons (Add Pecorino Romano, Add Parmigiano Reggiano 22 Month Aged)
- Volume in parentheses: Still Water (0.70 L)
- No articles before dish names (Carbonara, not La Carbonara)

### Writing Style

- **Never use an em-dash or en-dash in any menu copy, comments, or docs.** They read as AI-generated. Use a colon, comma, period, or rephrase instead. Plain ASCII hyphens are fine only for compound words (alcohol-free).
- Copy must not read like an LLM: avoid filler words ("elevate", "crafted", "delight", "journey", "perfectly balanced"), avoid marketing fluff, and keep descriptions short and plain. Write like a human owner talking to a customer.

### Dependencies

- `uv`: Python package manager (used for weasyprint)
- `weasyprint`: HTML/CSS to PDF converter (respects `@page` rules, loads Google Fonts from CDN)
- `ffmpeg`: renders the looping MP4s (H.264 + yuv420p) from the headless Chromium capture. `build_signage_video.js` resolves ffmpeg automatically: tries system PATH first, then falls back to the `imageio-ffmpeg` Python package via `uv run --with imageio-ffmpeg`. Install the fallback with `uv run --with imageio-ffmpeg true` (one-time, cached). No `sudo` needed.
- `node` + `playwright-core` (installed locally via `npm i`): drives headless Chromium for the video capture
- Chromium binary: cached at `/home/dev/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome` (set via `EXEC` in `scripts/build_signage_video.js`). DevContainer includes chromium for headless rendering.
- `zip` is NOT installed; `build_signage_usb.py` uses Python's `zipfile` to create the app archive.

### Commands

```bash
uv run weasyprint menu_definitief_hybrid_CLEAN.html pdf-menus-weasyprint/menu_definitief_hybrid_CLEAN.pdf  # Generate PDF from the menu HTML
python3 scripts/build_signage_usb.py    # Offline webOS app -> dist/usb/application/pasta-signage.zip (all variants + launcher)
node scripts/build_signage_video.js     # Looping MP4s of every variant -> dist/usb/videos/*.mp4 (+ dist/usb/menu-signage.mp4)
node scripts/build_signage_video.js lgmenuv3-lc-y1-cream-si   # Renders the signage_images variant -> dist/usb/lg_signage/lgmenuv3-lc-y1-cream-si.mp4

# Long looped video for USB Plug & Play (run after the si render to have the source):
python3 -c "
src='dist/usb/lg_signage/lgmenuv3-lc-y1-cream-si.mp4'
import os; n = -(-3*1024**3 // os.path.getsize(src))
open('/tmp/ll.txt','w').writelines(f\"file '{os.path.abspath(src)}'\n\" for _ in range(n))
"
# then: <ffmpeg> -f concat -safe 0 -i /tmp/ll.txt -c copy dist/usb/lg_signage/lgmenuv3-lc-y1-cream-clean-long.mp4
# (substitute <ffmpeg> with the imageio-ffmpeg path if system ffmpeg is absent)
```

Note: the `Makefile` was removed during cleanup; use the direct `uv`/`node`/`python3` commands above.

### Menu Gallery (removed)

The `menus/` review gallery, its manifest script, and the streamlit gallery were removed during the single-menu cleanup. Review the current menu directly in `menu_definitief_hybrid_CLEAN.html` or its PDF.

### Review Notes (from sub-agent audit)

- Descriptions at 9.4px/weight-300 are borderline for print legibility: consider 10.5px/400 if printing on non-laser printers
- Line-height 1.08 on item names is tight for long names (e.g. "Linguine al Pesto Genovese con Stracciatella")
- Dotted leader color (#c4b28f) has low contrast (~2.3:1): darken if needed
- `overflow: hidden` on `.page` silently clips content if it overflows: monitor when editing
- Two `<main>` elements (one per page) is technically invalid HTML5 but works in practice
