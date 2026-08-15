#!/usr/bin/env python3
"""
Generate two STREET-ATTRACTION signage boards for the LG 32SM5J-B (portrait
1080x1920). These follow a marketing critique: the street board must STOP feet,
not list the whole menu.

  - One hero food photo (full-screen) OR a bold typographic statement.
  - 2-3 signature dishes WITH prices (price anchor builds trust).
  - A hook slide: aperitivo, hours, "walk in".
  - Slow rotation (~7s), 3 slides, light theme (photo slide uses a scrim only
    for legibility over the image, not a dark theme).

Outputs: lg_menu_v3/menu_signage_attract_photo.html, ..._type.html
"""

import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "lg_menu_v3")
os.makedirs(OUT, exist_ok=True)

SIGNATURES = [
    ("La Carbonara", "€19", "Guanciale, egg yolk, Pecorino"),
    ("Cacio e Pepe", "€16", "Pecorino, cracked black pepper"),
    ("Quattro Formaggi", "€20", "Four Italian cheeses, rich and creamy"),
]
HOOKS = [
    ("Alcohol-free Spritz", "€10"),
    ("Bruschetta from", "€8"),
    ("Open till 23:00", ""),
    ("Walk in, we're open", ""),
]

SCRIPT = """
<script>
  (function () {
    "use strict";
    try {
      var slides = document.querySelectorAll('.slide');
      var idx = 0;
      setInterval(function () {
        slides[idx].classList.remove('is-active');
        idx = (idx + 1) % slides.length;
        slides[idx].classList.add('is-active');
      }, 7000);
      var clockEl = document.getElementById('clock');
      function tick() {
        var d = new Date(), h = d.getHours(), m = d.getMinutes();
        var ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12;
        clockEl.textContent = (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ' ' + ap;
      }
      tick(); setInterval(tick, 1000);
      setTimeout(function () { location.reload(); }, 10 * 60 * 1000);
    } catch (e) {}
  })();
</script>
"""


def sig_html():
    items = "".join(
        f'<div class="dish"><div class="dline"><span class="dname">{n}</span>'
        f'<span class="dlead"></span><span class="dprice">{p}</span></div>'
        f'<div class="ddesc">{d}</div></div>'
        for n, p, d in SIGNATURES
    )
    return f'<div class="dishes">{items}</div>'


def hook_html():
    rows = "".join(
        f'<div class="hook"><span class="htext">{t}</span>'
        + (f'<span class="hprice">{p}</span>' if p else "")
        + "</div>"
        for t, p in HOOKS
    )
    return f'<div class="hooks">{rows}</div>'


def build(style, slide_a_extra, base):
    body = f"""
<div class="stage">
  <div class="clock" id="clock"></div>

  <section class="slide slide-a is-active">
    <div class="a-inner">
      {slide_a_extra}
      <div class="a-tag">Fresh pasta, made daily</div>
      <div class="a-sub">Walk in, we're open</div>
    </div>
  </section>

  <section class="slide slide-b">
    <div class="b-inner">
      <div class="b-head">Signatures</div>
      {sig_html()}
      <div class="b-foot">Ask inside for the full menu</div>
    </div>
  </section>

  <section class="slide slide-c">
    <div class="c-inner">
      <div class="b-head">Today</div>
      {hook_html()}
    </div>
  </section>
</div>
"""
    template = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>Pasta Menu: Street</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap');
__CSS__
</style>
</head>
<body>
__BODY__
__SCRIPT__
</body>
</html>
"""
    return template.replace("__CSS__", style).replace("__BODY__", body).replace("__SCRIPT__", SCRIPT)


PHOTO_CSS = """
:root{--bg:#fbf7ef;--ink:#2c2118;--muted:#6f6354;--accent:#9c4a3c;--rule:#e3d8c4;--cream:#fbf7ef;}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:var(--bg);color:var(--ink);font-family:'Montserrat',system-ui,Arial,sans-serif;overflow:hidden}
.stage{position:relative;width:1080px;height:1920px;margin:0 auto;display:flex;flex-direction:column}
.clock{position:absolute;top:26px;right:44px;z-index:6;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,0.6)}
.slide{position:absolute;inset:0;display:flex;opacity:0;transition:opacity 1s ease;pointer-events:none}
.slide.is-active{opacity:1;pointer-events:auto}
.slide-a{background:url('images/pasta-carbonara.jpg') center/cover}
.slide-a::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,14,10,0.30),rgba(20,14,10,0.55) 60%,rgba(20,14,10,0.78))}
.a-inner{position:relative;z-index:2;margin-top:auto;padding:0 80px 120px;text-align:left;color:#fff}
.a-kicker{font-family:'Montserrat',sans-serif;font-weight:600;font-size:16px;letter-spacing:6px;text-transform:uppercase;color:#f0c9a0;margin-bottom:18px}
.a-tag{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:78px;line-height:1.02;letter-spacing:1px;text-shadow:0 3px 18px rgba(0,0,0,0.6)}
.a-sub{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:30px;margin-top:14px;color:#f3e6d6;text-shadow:0 2px 10px rgba(0,0,0,0.6)}
.b-inner,.c-inner{margin:auto;padding:90px 96px;width:100%;text-align:center}
.b-head{font-family:'Montserrat',sans-serif;font-weight:600;font-size:15px;letter-spacing:5px;text-transform:uppercase;color:var(--accent);margin-bottom:30px}
.dishes{display:flex;flex-direction:column;gap:30px}
.dish{text-align:left}
.dline{display:flex;align-items:baseline}
.dname{font-family:'Cormorant Garamond',serif;font-size:46px;font-weight:600}
.dlead{flex:1;border-bottom:2px dotted var(--rule);margin:0 16px 10px;min-width:30px}
.dprice{font-family:'Montserrat',sans-serif;font-size:32px;font-weight:600;color:var(--accent)}
.ddesc{font-size:18px;color:var(--muted);margin-top:2px}
.b-foot{margin-top:36px;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:20px;color:var(--muted)}
.hooks{display:flex;flex-direction:column;gap:26px;align-items:center}
.hook{display:flex;align-items:baseline;gap:18px;font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:600}
.hprice{font-family:'Montserrat',sans-serif;font-size:30px;font-weight:600;color:var(--accent)}
"""

TYPE_CSS = """
:root{--bg:#faf5ec;--ink:#2c2118;--muted:#6f6354;--accent:#9c4a3c;--rule:#d8c7ad;--cream:#faf5ec;}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:var(--bg);color:var(--ink);font-family:'Montserrat',system-ui,Arial,sans-serif;overflow:hidden}
.stage{position:relative;width:1080px;height:1920px;margin:0 auto;display:flex;flex-direction:column}
.clock{position:absolute;top:26px;right:44px;z-index:6;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;color:var(--muted)}
.slide{position:absolute;inset:0;display:flex;opacity:0;transition:opacity 1s ease;pointer-events:none}
.slide.is-active{opacity:1;pointer-events:auto}
.a-inner{margin:auto;padding:0 90px;text-align:center}
.a-kicker{font-family:'Montserrat',sans-serif;font-weight:600;font-size:16px;letter-spacing:6px;text-transform:uppercase;color:var(--accent);margin-bottom:18px}
.a-tag{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:84px;line-height:1.04;letter-spacing:1px;color:var(--ink)}
.a-sub{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:30px;margin-top:18px;color:var(--accent)}
.b-inner,.c-inner{margin:auto;padding:90px 96px;width:100%;text-align:center}
.b-head{font-family:'Montserrat',sans-serif;font-weight:600;font-size:15px;letter-spacing:5px;text-transform:uppercase;color:var(--accent);margin-bottom:30px}
.dishes{display:flex;flex-direction:column;gap:30px}
.dish{text-align:left}
.dline{display:flex;align-items:baseline}
.dname{font-family:'Cormorant Garamond',serif;font-size:46px;font-weight:600}
.dlead{flex:1;border-bottom:2px dotted var(--rule);margin:0 16px 10px;min-width:30px}
.dprice{font-family:'Montserrat',sans-serif;font-size:32px;font-weight:600;color:var(--accent)}
.ddesc{font-size:18px;color:var(--muted);margin-top:2px}
.b-foot{margin-top:36px;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:20px;color:var(--muted)}
.hooks{display:flex;flex-direction:column;gap:26px;align-items:center}
.hook{display:flex;align-items:baseline;gap:18px;font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:600}
.hprice{font-family:'Montserrat',sans-serif;font-size:30px;font-weight:600;color:var(--accent)}
"""

DESIGNS = [
    ("menu_signage_attract_photo.html", "lgmenuv3-attract-photo", "v3 / attract-photo",
     PHOTO_CSS, '<div class="a-kicker">Cucina Italiana</div>'),
    ("menu_signage_attract_type.html", "lgmenuv3-attract-type", "v3 / attract-type",
     TYPE_CSS, '<div class="a-kicker">Cucina Italiana</div>'),
]

for fname, base, label, css, a_extra in DESIGNS:
    with open(os.path.join(OUT, fname), "w", encoding="utf-8") as f:
        f.write(build(css, a_extra, base))
    print(f"[ok] {label} -> {os.path.join(OUT, fname)}")

print(f"\n[done] {len(DESIGNS)} street-attraction boards in lg_menu_v3/")
