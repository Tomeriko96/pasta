# Plan: Pasta Menu on LG 32SM5J-B Signage Display

> **Note:** The USB app/video signage routes (`build_signage_usb.py`, `build_signage_video.js`) and the `lg_menu_v3/` boards were removed as archive. The live deployment is `menu_screen.html` via **Play via URL**; the attract-loop videos are built with `scripts/build_attract_video.js`. The USB sections below are retained for historical reference only.

## Device Confirmed

| Spec | Value |
|------|-------|
| Model | LG 32SM5J-B (32" Full HD Standard Signage) |
| OS | webOS Signage 6.0 |
| Resolution | **1920 × 1080 (FHD)**: design target |
| Brightness | 400 nits (Typ) |
| Orientation | Landscape / Portrait supported (landscape recommended for menu) |
| Key features | **Play via URL**, Local Contents Scheduling, USB Plug & Play, Fail-over, Group Manager |
| Connectivity | HDMI ×3, USB 2.0, RJ45 (LAN), RS-232C, Wi-Fi, IR, Audio Out |
| Internal memory | 8 GB eMMC |

This is a **true commercial webOS signage display**: it renders HTML/CSS/JS directly in its built-in Chromium engine, no external PC required.

---

## Goal

Show the restaurant menu as a live, auto-updating digital signage page on the 32SM5J-B, replacing the static print PDF with a screen-optimized layout that can rotate between the two menu pages and include light animation / images.

---

## Part A: Hardware & Display Setup (do once)

### 1. Physical setup
- Mount via VESA 200×200 (or place on stand). Keep indoor, out of direct sunlight (panel is 400 nits: not outdoor-rated).
- Connect **LAN (RJ45)** or join **Wi-Fi** via the on-screen setup. Wired is more reliable for 24/7.
- Plug in power, IR sensor, and (optional) USB stick for offline fallback.

### 2. Initial configuration (remote control)
1. Power on → choose **Quick Start** → set **Language**, **Continent/Country**, **Time Zone** (important: scheduling & URLs depend on correct clock).
2. Press **Settings** → **EZ Settings** → **SI Server Setting**.
3. Set:
   - **Fully Qualified Domain Name:** ON
   - **Application Launch Mode:** Local
   - **Application Type:** URL (this enables "Play via URL" for a plain web page: no app install needed)
   - **URL:** `https://<your-host>/menu_screen.html`  *(fill in after Part B)*
4. Press **OK / Confirm**, then **Reboot apply**.
5. The screen now loads your menu URL on boot and survives power cycles.

> Note: "Play via URL" points the signage browser straight at a webpage: perfect for our single HTML file. (The IPK / SI App route is only needed for third-party CMS like Look, EasySignage, etc.: not required here.)

### 3. Power & burn-in hygiene
- webOS has DPM (Display Power Management) and ISM (Image Sticking Minimization). Keep ISM on.
- Use **Local Contents Scheduling** (built in) to power the display on at open, off at close: avoids 24/7 static burn-in.
- Menu content should animate/rotate so no pixel is static for hours.

---

## Part B: Build the Screen HTML (`menu_screen.html`)

Derive from `menu_definitief_hybrid_CLEAN.html` content but redesign for a 1920×1080 live screen, NOT A4 print.

### B1. Layout
- Single full-viewport page, no `@page` / `page-break` / fixed mm sizes.
- Two "slides": **Slide 1 = Antipasti & Drinks**, **Slide 2 = Pasta & Mare & Extras** (mirrors current page-1 / page-2 split).
- Auto-rotate every ~12 to 15s with a gentle cross-fade (CSS `@keyframes` + JS interval, or pure CSS animation). Pause/restart on visibility.
- Keep typography (Cormorant Garamond headings, Montserrat body) and color vars from the source.

### B2. Readability for a wall screen
- Bump sizes vs print: item names ~28 to 34px, prices ~22px, descriptions ~16 to 18px (print used 9.4px: far too small at distance).
- Description weight 300 → **400** for legibility; darken dotted leaders (`#c4b28f` low contrast → `~#9a875f`).
- Line-height 1.08 → **1.2** so long names like "Linguine al Pesto Genovese con Stracciatella" wrap comfortably.

### B3. Fonts: inline / self-host
- webOS 6.0 Chromium fetches Google Fonts fine **if online**, but to be safe and avoid FOUT/offline gaps:
  - Either keep the `<link>` (simplest, needs internet), OR
  - Download the two font families and embed via `@font-face` (base64 or local files) so the page is fully self-contained.
- Recommend: keep `<link>` for now; add inline `@font-face` only if offline mode is needed.

### B4. Animation / dynamic / images (recommended, gentle)
- **Slide rotation** between the two menu sections (above).
- **Subtle entrance animation**: section titles fade/slide in on slide change.
- **"Today's special" highlight**: one item gets a soft pulsing accent border (CSS only).
- **Hero image**: optional dish photo or restaurant logo in a side/header band (`<img>` or CSS background). Keep file sizes small (<300KB) for the 8GB storage / smooth playback.
- **Live touches (optional, JS)**:
  - Time-of-day greeting ("Buongiorno" / "Buonasera").
  - Prices pulled from a small data file so editing one file updates the screen (fetch on load + periodic refresh).
- Avoid: anything that hides the menu for long, fast flashing, or heavy video (panel is 400 nits FHD: photos + CSS animation are ideal).

### B5. Output file
- New file `menu_screen.html` in repo root (does NOT replace `menu_definitief_hybrid_CLEAN.html` or the print PDF flow).
- Valid HTML5 (single `<main>`, proper structure: fix the two-`<main>` issue from the print file while we're at it).

---

## Part C: Hosting the Page (pick one)

| Option | Pros | Cons |
|--------|------|------|
| **Static host** (GitHub Pages / Netlire / Netlify Drop / Cloudflare Pages) | Free, reliable, HTTPS, instant updates | Needs internet on the screen |
| **Local server on restaurant network** (tiny Pi / old PC / `python -m http.server`) | Works fully offline, full control | Must keep a box running 24/7 |
| **LG Promota app** (mobile) | No coding, LG-provided | Templated, not our custom HTML: skip |
| **USB stick (FAT32)** | No network | Fully works for live HTML if installed as a local webOS app (ZIP) via SI Server Setting. See Part C2. (Plain USB Plug & Play is image/video only.) |

**Recommended:** Static host (e.g. GitHub Pages) for the URL; keep a USB with a static screenshot/PDF as fail-over.

---

## Part C2: USB-only (offline) deployment with live HTML

WebOS Plug & Play auto-plays only images/video. To show the live `menu_screen.html` (rotation, clock, animation) with **no network**, install it as a local webOS app from USB. The repo builds a self-contained package for exactly this.

### C2.1 Build the package
```
python3 scripts/build_signage_usb.py
```
This runs `scripts/build_signage_usb.py`, which:
- Copies every HTML variant you want to test (`menu_screen.html`, `lg_menu/*.html`, `lg_menu_v2/*.html`) into one app folder.
- Downloads Cormorant Garamond + Montserrat as woff2 and rewrites each variant's Google Fonts `@import` to a local `fonts.css` (so it works offline).
- Copies `images/` alongside.
- Generates a **launcher page** (`index.html`) with a tab bar to click between all variants on the screen (no reinstall needed to A/B test).
- Writes `appinfo.json` and zips everything to `dist/usb/application/pasta-signage.zip`.

Output layout you copy to the stick:
```
dist/usb/application/pasta-signage.zip
```

### C2.2 Copy to USB
- Format the stick **FAT32**.
- Copy the `application/` folder to the **root** of the USB stick (so the stick has `application/pasta-signage.zip`).

### C2.3 Install on the display
Remote: **Settings -> EZ Settings -> SI Server Setting**
- Application Launch Mode: **Local**
- Application Type: **ZIP**
- Local Application Upgrade: **USB**
- Confirm, then reboot. The app installs to internal memory and boots into the launcher on every power cycle.

### C2.4 Use / update
- On screen: the launcher shows a tab per variant. Use the remote to click between them.
- Edit a source HTML, re-run `python3 scripts/build_signage_usb.py`, re-copy `application/` to the stick, and re-run Local Application Upgrade: USB on the TV to push the change. (The 10-min `location.reload()` only refreshes the clock; new content needs a re-install.)

### C2.5 Fallback (zero config)
If app install misbehaves on your firmware, render each slide to a 1920x1080 PNG and drop them on the FAT32 stick: USB Plug & Play auto-plays the slideshow, no setup. You lose the clock/animation.

### C2.6 Simplest of all: render to video
USB Plug & Play auto-plays MP4 with **no setup at all** (no app, no SI Server Setting, no manifest). Run `node scripts/build_signage_video.js` to render `menu_screen.html` (with its real Ken Burns / shimmer / glow motion) into `dist/usb/menu-signage.mp4`. Copy that single file to a FAT32 stick root; the TV (orientation set to PORTRAIT) loops it automatically. The live clock and auto-reload are stripped for the render because a frozen clock on a loop looks wrong. Updates = re-render and re-copy.

### C2.7 Long looped video for all-day USB playback
For a large-capacity USB stick (no network required, no CMS), the recommended approach is a single large MP4 that plays for several hours before the TV's own player loops it:

1. **Render the short source clip** (all 4 signage images, ~20s, ~3MB):
   ```bash
   node scripts/build_signage_video.js lgmenuv3-lc-y1-cream-si
   # output: dist/usb/lg_signage/lgmenuv3-lc-y1-cream-si.mp4
   ```
   The short clip already has a seamless loop baked in: `build_signage_video.js` crossfades the tail back into the first frame, so there is no visible jump at the join.

2. **Concatenate to ~3GB** (992 repetitions, no re-encode, fast):
   ```bash
   python3 -c "
   import os; src=os.path.abspath('dist/usb/lg_signage/lgmenuv3-lc-y1-cream-si.mp4')
   n = -(-3*1024**3 // os.path.getsize(src))
   open('/tmp/ll.txt','w').writelines(f\"file '{src}'\n\" for _ in range(n))
   "
   <ffmpeg> -f concat -safe 0 -i /tmp/ll.txt -c copy \
     dist/usb/lg_signage/lgmenuv3-lc-y1-cream-clean-long.mp4
   ```
   Replace `<ffmpeg>` with your ffmpeg path (the build script logs it on startup). The `-c copy` flag means no re-encoding: a 3GB file is produced in under a minute at 487x speed.

   Result: `dist/usb/lg_signage/lgmenuv3-lc-y1-cream-clean-long.mp4` (3.1GB, 5h33m).

3. **Copy to FAT32 stick** and set TV orientation to PORTRAIT. No other configuration needed.

---

## Part D: Update Workflow

1. Edit `menu_screen.html` (or a data file if using data-driven prices).
2. Push / re-upload to host.
3. Screen auto-refreshes (add a JS `setInterval(location.reload, N)` or rely on CMS scheduling). For plain URL mode, add a meta-refresh or JS reload every ~10 min so price edits show without a manual reboot.
4. Verify on screen (or via LG SuperSign Control+ / ConnectedCare remote screenshot if licensed).

---

## Open Questions / Decisions Needed

- **Hosting choice**: static host vs local server? (I can scaffold GitHub Pages or a local-server README.)
- **Data-driven prices**: use a small data file + fetch, or hardcode in HTML?
- **Images**: do you have dish photos / a logo to include, or keep it typographic?
- **Rotation interval**: default 12s OK, or prefer manual/longer?

## Next Steps (implementation)
1. Create `menu_screen.html`: 1920×1080 two-slide layout from current content, inlined-friendly fonts, larger type, gentle animations.
2. Add auto-reload + (optional) data-file loader.
3. Write a short `SIGNAGE.md` with the exact remote-button steps from Part A for future reference.
4. Provide hosting instructions for the chosen option.
