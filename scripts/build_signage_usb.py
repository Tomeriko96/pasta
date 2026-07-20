#!/usr/bin/env python3
"""
Build a self-contained webOS signage app for the LG 32SM5J-B (portrait 1080x1920)
that can be installed from a USB stick with NO network connection.

It bundles every HTML variant you want to test, the two webfonts (downloaded
once and inlined as @font-face), and the background images, then zips everything
into dist/usb/application/pasta-signage.zip.

Copy the `application/` folder produced under dist/usb/ onto a FAT32 USB stick
(root level) and install it via:
  Settings -> EZ Settings -> SI Server Setting
    Application Launch Mode: Local
    Application Type: ZIP
    Local Application Upgrade: USB
Then reboot. The app boots into a launcher page; use the remote to click between
every variant. To change a file, re-run `make usb`, re-copy, and re-upgrade.

No external dependencies (stdlib only).
"""

import os
import re
import shutil
import zipfile
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STAGING = os.path.join(ROOT, "build", "signage-usb")
DIST_USB_APP = os.path.join(ROOT, "dist", "usb", "application")
ZIP_PATH = os.path.join(DIST_USB_APP, "pasta-signage.zip")
IMAGES_SRC = os.path.join(ROOT, "images")

# (source relative path, output filename in app, label shown in launcher)
VARIANTS = [
    ("menu_screen.html", "v_main.html", "Main (merged)"),
    ("lg_menu/menu_screen_design.html", "v_lgmenu_design.html", "lg_menu / design"),
    ("lg_menu/menu_screen_motion.html", "v_lgmenu_motion.html", "lg_menu / motion"),
    ("lg_menu/menu_screen_tech.html", "v_lgmenu_tech.html", "lg_menu / tech"),
    ("lg_menu/menu_screen_typography.html", "v_lgmenu_typography.html", "lg_menu / typography"),
    ("lg_menu/menu_screen_ux.html", "v_lgmenu_ux.html", "lg_menu / ux"),
    ("lg_menu_v2/menu_screen_design.html", "v_lgmenuv2_design.html", "lg_menu_v2 / design"),
    ("lg_menu_v2/menu_screen_motion.html", "v_lgmenuv2_motion.html", "lg_menu_v2 / motion"),
    ("lg_menu_v2/menu_screen_ux.html", "v_lgmenuv2_ux.html", "lg_menu_v2 / ux"),
    ("lg_menu_v3/menu_signage_classic.html", "v_lgmenuv3_classic.html", "v3 / classic"),
    ("lg_menu_v3/menu_signage_editorial.html", "v_lgmenuv3_editorial.html", "v3 / editorial"),
    ("lg_menu_v3/menu_signage_minimal.html", "v_lgmenuv3_minimal.html", "v3 / minimal"),
    ("lg_menu_v3/menu_signage_bistro.html", "v_lgmenuv3_bistro.html", "v3 / bistro"),
    ("lg_menu_v3/menu_signage_hero.html", "v_lgmenuv3_hero.html", "v3 / hero"),
    ("lg_menu_v3/menu_signage_attract_photo.html", "v_lgmenuv3_attract_photo.html", "v3 / attract-photo"),
    ("lg_menu_v3/menu_signage_attract_type.html", "v_lgmenuv3_attract_type.html", "v3 / attract-type"),
    ("lg_menu_v3/menu_signage_street_photo.html", "v_lgmenuv3_street_photo.html", "v3 / street-photo"),
    ("lg_menu_v3/menu_signage_street_offer.html", "v_lgmenuv3_street_offer.html", "v3 / street-offer"),
    ("lg_menu_v3/menu_signage_street_trio.html", "v_lgmenuv3_street_trio.html", "v3 / street-trio"),
    ("lg_menu_v3/menu_signage_street_aperitivo.html", "v_lgmenuv3_street_aperitivo.html", "v3 / street-aperitivo"),
    ("lg_menu_v3/menu_signage_street_open.html", "v_lgmenuv3_street_open.html", "v3 / street-open"),
    ("lg_menu_v3/menu_signage_vibe_family.html", "v_lgmenuv3_vibe_family.html", "v3 / vibe-family"),
    ("lg_menu_v3/menu_signage_vibe_fresh.html", "v_lgmenuv3_vibe_fresh.html", "v3 / vibe-fresh"),
    ("lg_menu_v3/menu_signage_vibe_roma.html", "v_lgmenuv3_vibe_roma.html", "v3 / vibe-roma"),
    ("lg_menu_v3/menu_signage_vibe_stagione.html", "v_lgmenuv3_vibe_stagione.html", "v3 / vibe-stagione"),
    ("lg_menu_v3/menu_signage_vibe_benvenuti.html", "v_lgmenuv3_vibe_benvenuti.html", "v3 / vibe-benvenuti"),
]

FONT_CSS_URL = (
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:"
    "ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family="
    "Montserrat:wght@300;400;500;600&display=swap"
)
UA = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)


def fetch(url, binary=False):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        data = r.read()
    return data if binary else data.decode("utf-8")


def clean_family(name):
    return re.sub(r"[^A-Za-z0-9]", "", name.strip().lower().title())


def build_fonts(fonts_dir):
    """Download the webfonts and emit a local fonts.css. Returns True on success."""
    os.makedirs(fonts_dir, exist_ok=True)
    try:
        css = fetch(FONT_CSS_URL)
    except Exception as e:  # pragma: no cover - network dependent
        print(f"[warn] Could not fetch Google Fonts CSS ({e}).")
        print("[warn] Variants will fall back to system fonts (Georgia / system-ui).")
        with open(os.path.join(fonts_dir, "fonts.css"), "w") as f:
            f.write("/* Font download failed; relying on system fallback stacks. */\n")
        return False

    faces = re.findall(r"@font-face\s*\{([^}]*)\}", css, re.S)
    out_blocks = []
    copies = {}  # family(lower) -> 400-normal woff2 path, for tech.html
    for block in faces:
        fam = re.search(r"font-family:\s*['\"]?([^'\"]+?)['\"]?", block)
        weight = re.search(r"font-weight:\s*(\d+)", block)
        style = re.search(r"font-style:\s*(\w+)", block)
        src = re.search(r"src:\s*url\((['\"]?)([^'\")]+)\1\)", block)
        if not (fam and src):
            continue
        family = fam.group(1).strip()
        w = weight.group(1) if weight else "400"
        st = style.group(1) if style else "normal"
        url = src.group(2)
        suffix = "i" if st == "italic" else ""
        fname = f"{clean_family(family)}-{w}{suffix}.woff2"
        dest = os.path.join(fonts_dir, fname)
        try:
            data = fetch(url, binary=True)
            with open(dest, "wb") as f:
                f.write(data)
        except Exception as e:  # pragma: no cover
            print(f"[warn] Failed to download {url}: {e}")
            continue
        out_blocks.append(
            "@font-face {\n"
            f"  font-family: '{family}';\n"
            f"  font-style: {st};\n"
            f"  font-weight: {w};\n"
            "  font-display: swap;\n"
            f"  src: url('fonts/{fname}') format('woff2');\n"
            "}\n"
        )
        if w == "400" and st == "normal":
            copies[family.lower()] = fname

    # tech.html references fonts/CormorantGaramond.woff2 and fonts/Montserrat.woff2
    for fam_lower, fname in copies.items():
        if fam_lower.startswith("cormorant"):
            shutil.copy(os.path.join(fonts_dir, fname),
                        os.path.join(fonts_dir, "CormorantGaramond.woff2"))
        elif fam_lower.startswith("montserrat"):
            shutil.copy(os.path.join(fonts_dir, fname),
                        os.path.join(fonts_dir, "Montserrat.woff2"))

    with open(os.path.join(fonts_dir, "fonts.css"), "w") as f:
        f.write("/* Auto-generated local webfonts (offline). */\n")
        f.write("\n".join(out_blocks))
    return True


def patch_variant(text):
    # Swap the Google Fonts CDN @import for the local bundled fonts.css
    text = re.sub(
        r"@import\s+url\(['\"]https://fonts\.googleapis\.com[^'\"]*['\"]\)\s*;?",
        "@import url('fonts.css');",
        text,
    )
    # Normalize image paths: every variant lives at app root next to images/
    text = text.replace("../images/", "images/")
    return text


LAUNCHER = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pasta Menu Tester</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { height: 100%; background: #0e0a07; color: #f1e9dc;
    font-family: 'Montserrat', system-ui, Arial, sans-serif; overflow: hidden; }
  #bar { position: fixed; top: 0; left: 0; right: 0; z-index: 10;
    display: flex; align-items: center; gap: 10px; padding: 10px 14px;
    background: rgba(14,10,7,0.96); border-bottom: 1px solid rgba(212,195,165,0.35); }
  #bar .title { font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 26px; letter-spacing: 1px; color: #fbf5ea; white-space: nowrap; }
  #bar .clock { font-style: italic; color: #d4c3a5; font-size: 18px; margin-left: auto;
    white-space: nowrap; padding-right: 6px; }
  #tabs { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 2px; }
  #tabs button { flex: 0 0 auto; cursor: pointer; white-space: nowrap;
    background: rgba(139,58,58,0.18); color: #f4d9d9; border: 1px solid rgba(212,195,165,0.4);
    border-radius: 18px; padding: 7px 14px; font-size: 14px; letter-spacing: 0.5px; }
  #tabs button.active { background: #8b3a3a; color: #fff; }
  iframe { position: absolute; top: 56px; left: 0; right: 0; bottom: 0;
    width: 100%; border: 0; background: #000; }
</style>
</head>
<body>
<div id="bar">
  <span class="title">Pasta Menu Tester</span>
  <div id="tabs"></div>
  <span class="clock" id="clock"></span>
</div>
<iframe id="view" src="__FIRST__"></iframe>
<script>
  var variants = __VARIANTS__;
  var tabs = document.getElementById('tabs');
  var view = document.getElementById('view');
  var buttons = {};
  variants.forEach(function (v, i) {
    var b = document.createElement('button');
    b.textContent = v.label;
    b.onclick = function () { load(v.file, b); };
    tabs.appendChild(b);
    buttons[v.file] = b;
    if (i === 0) b.classList.add('active');
  });
  function load(file, btn) {
    view.src = file;
    for (var k in buttons) buttons[k].classList.remove('active');
    btn.classList.add('active');
  }
  var clk = document.getElementById('clock');
  function tick() {
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    var ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12;
    clk.textContent = (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ' ' + ap;
  }
  tick(); setInterval(tick, 1000);
</script>
</body>
</html>
"""


def main():
    # Clean staging
    if os.path.isdir(STAGING):
        shutil.rmtree(STAGING)
    os.makedirs(os.path.join(STAGING, "images"), exist_ok=True)
    fonts_dir = os.path.join(STAGING, "fonts")

    # Fonts (best effort)
    build_fonts(fonts_dir)

    # Images: copy the whole folder so every variant's backgrounds resolve
    if os.path.isdir(IMAGES_SRC):
        for name in os.listdir(IMAGES_SRC):
            src = os.path.join(IMAGES_SRC, name)
            if os.path.isfile(src):
                shutil.copy(src, os.path.join(STAGING, "images", name))

    # Variants
    var_meta = []
    for src_rel, out_name, label in VARIANTS:
        src_path = os.path.join(ROOT, src_rel)
        if not os.path.isfile(src_path):
            print(f"[skip] missing {src_rel}")
            continue
        with open(src_path, "r", encoding="utf-8") as f:
            text = f.read()
        text = patch_variant(text)
        with open(os.path.join(STAGING, out_name), "w", encoding="utf-8") as f:
            f.write(text)
        var_meta.append({"file": out_name, "label": label})

    # Launcher
    launcher = LAUNCHER.replace("__FIRST__", var_meta[0]["file"] if var_meta else "")
    launcher = launcher.replace("__VARIANTS__",
                                repr([{"file": v["file"], "label": v["label"]} for v in var_meta]))
    with open(os.path.join(STAGING, "index.html"), "w", encoding="utf-8") as f:
        f.write(launcher)

    # App manifest
    appinfo = {
        "id": "com.pasta.signage",
        "title": "Pasta Menu Tester",
        "main": "index.html",
        "type": "web",
        "width": 1080,
        "height": 1920,
    }
    import json
    with open(os.path.join(STAGING, "appinfo.json"), "w", encoding="utf-8") as f:
        json.dump(appinfo, f, indent=2)

    # Zip (contents at root, not nested in a folder)
    os.makedirs(DIST_USB_APP, exist_ok=True)
    if os.path.exists(ZIP_PATH):
        os.remove(ZIP_PATH)
    with zipfile.ZipFile(ZIP_PATH, "w", zipfile.ZIP_DEFLATED) as z:
        for root, _, files in os.walk(STAGING):
            for fn in files:
                full = os.path.join(root, fn)
                arc = os.path.relpath(full, STAGING)
                z.write(full, arc)

    print(f"[ok] Wrote {ZIP_PATH}")
    print(f"[ok] Variants bundled: {len(var_meta)}")
    print("[next] Copy dist/usb/application/ to the root of a FAT32 USB stick,")
    print("       then install via SI Server Setting (Application Type: ZIP, USB).")


if __name__ == "__main__":
    main()
