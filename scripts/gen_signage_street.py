#!/usr/bin/env python3
"""
Generate five SIMPLE, CLEAR street-attraction boards for the LG 32SM5J-B
(portrait 1080x1920). Each is ONE message, big and legible from the sidewalk,
so when the TV cycles the videos it reads like a rotating attract loop:

  1. street_photo      - hero dish photo + name + price (one craving)
  2. street_offer      - combo offer "Pasta + Spritz EUR 25" (price hook)
  3. street_trio       - 3 signature dishes with prices (trust anchor)
  4. street_aperitivo  - alcohol-free aperitivo hook (evening pull)
  5. street_open       - "Open" + hours + walk-in (stop-them-now)

Light theme, restrained type, no full menu. Outputs: lg_menu_v3/
"""

import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "lg_menu_v3")
os.makedirs(OUT, exist_ok=True)

SCRIPT = """
<script>
  (function () {
    "use strict";
    try {
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

BASE = """
:root{--bg:#faf5ec;--ink:#2c2118;--muted:#6f6354;--accent:#9c4a3c;--rule:#d8c7ad;}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:var(--bg);color:var(--ink);font-family:'Montserrat',system-ui,Arial,sans-serif;overflow:hidden}
.stage{position:relative;width:1080px;height:1920px;margin:0 auto;display:flex;flex-direction:column}
.clock{position:absolute;top:26px;right:44px;z-index:6;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;color:var(--muted)}
.center{margin:auto;text-align:center;padding:0 90px;width:100%}
.kicker{font-family:'Montserrat',sans-serif;font-weight:600;font-size:16px;letter-spacing:6px;text-transform:uppercase;color:var(--accent);margin-bottom:20px}
"""

PHOTO_CSS = BASE + """
.stage{background:url('images/pasta-carbonara.jpg') center/cover}
.stage::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,14,10,0.28),rgba(20,14,10,0.55) 55%,rgba(20,14,10,0.75))}
.center{color:#fff;z-index:2}
.clock{color:#fff}
.name{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:88px;line-height:1.02;text-shadow:0 3px 18px rgba(0,0,0,0.6)}
.price{font-family:'Montserrat',sans-serif;font-weight:600;font-size:46px;color:#f0c9a0;margin-top:14px;text-shadow:0 2px 12px rgba(0,0,0,0.6)}
.sub{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:28px;margin-top:16px;color:#f3e6d6;text-shadow:0 2px 10px rgba(0,0,0,0.6)}
"""

OFFER_CSS = BASE + """
.kicker{margin-bottom:26px}
.big{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:82px;line-height:1.05}
.price{font-family:'Montserrat',sans-serif;font-weight:600;font-size:70px;color:var(--accent);margin-top:24px}
.sub{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:28px;color:var(--muted);margin-top:18px}
"""

TRIO_CSS = BASE + """
.label{font-family:'Montserrat',sans-serif;font-weight:600;font-size:15px;letter-spacing:5px;text-transform:uppercase;color:var(--accent);margin-bottom:34px}
.dishes{display:flex;flex-direction:column;gap:32px}
.dish{display:flex;align-items:baseline;justify-content:center}
.dname{font-family:'Cormorant Garamond',serif;font-size:48px;font-weight:600}
.dlead{flex:1;border-bottom:2px dotted var(--rule);margin:0 18px 12px;min-width:30px;max-width:180px}
.dprice{font-family:'Montserrat',sans-serif;font-size:34px;font-weight:600;color:var(--accent)}
.foot{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;color:var(--muted);margin-top:40px}
"""

APERITIVO_CSS = BASE + """
.kicker{margin-bottom:24px}
.big{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:78px;line-height:1.05}
.line{font-family:'Montserrat',sans-serif;font-weight:600;font-size:56px;color:var(--accent);margin-top:22px}
.sub{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:28px;color:var(--muted);margin-top:18px}
"""

OPEN_CSS = BASE + """
.big{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:120px;line-height:1.0}
.hours{font-family:'Montserrat',sans-serif;font-weight:500;font-size:34px;color:var(--ink);margin-top:26px}
.sub{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:30px;color:var(--muted);margin-top:14px}
.tag{font-family:'Montserrat',sans-serif;font-weight:600;font-size:24px;letter-spacing:2px;color:var(--accent);margin-top:30px}
"""

DESIGNS = [
    ("menu_signage_street_photo.html", "lgmenuv3-street-photo", "v3 / street-photo", PHOTO_CSS,
     '<div class="name">La Carbonara</div><div class="price">€19</div>'
     '<div class="sub">Fresh pasta, made daily</div>'),
    ("menu_signage_street_offer.html", "lgmenuv3-street-offer", "v3 / street-offer", OFFER_CSS,
     '<div class="kicker">Every day, till 21:00</div><div class="big">Pasta + Spritz</div>'
     '<div class="price">€25</div><div class="sub">A plate and an alcohol-free aperitivo</div>'),
    ("menu_signage_street_trio.html", "lgmenuv3-street-trio", "v3 / street-trio", TRIO_CSS,
     '<div class="label">Signatures</div><div class="dishes">'
     '<div class="dish"><span class="dname">La Carbonara</span><span class="dlead"></span>'
     '<span class="dprice">€19</span></div>'
     '<div class="dish"><span class="dname">Cacio e Pepe</span><span class="dlead"></span>'
     '<span class="dprice">€16</span></div>'
     '<div class="dish"><span class="dname">Quattro Formaggi</span><span class="dlead"></span>'
     '<span class="dprice">€20</span></div>'
     '</div><div class="foot">Ask inside for the full menu</div>'),
    ("menu_signage_street_aperitivo.html", "lgmenuv3-street-aperitivo", "v3 / street-aperitivo", APERITIVO_CSS,
     '<div class="kicker">Alcohol-free</div><div class="big">Aperitivo</div>'
     '<div class="line">Spritz €10</div><div class="sub">From 17:00 · Walk in</div>'),
    ("menu_signage_street_open.html", "lgmenuv3-street-open", "v3 / street-open", OPEN_CSS,
     '<div class="big">Aperto</div><div class="hours">We\'re open till 23:00</div>'
     '<div class="sub">Fresh pasta, walk in</div><div class="tag">Carbonara from €19</div>'),
]


def build(css, inner):
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
<div class="stage">
  <div class="clock" id="clock"></div>
  <div class="center">
__INNER__
  </div>
</div>
__SCRIPT__
</body>
</html>
"""
    return template.replace("__CSS__", css).replace("__INNER__", inner).replace("__SCRIPT__", SCRIPT)


for fname, base, label, css, inner in DESIGNS:
    with open(os.path.join(OUT, fname), "w", encoding="utf-8") as f:
        f.write(build(css, inner))
    print(f"[ok] {label} -> {os.path.join(OUT, fname)}")

print(f"\n[done] {len(DESIGNS)} simple street boards in lg_menu_v3/")
