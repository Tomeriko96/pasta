#!/usr/bin/env python3
"""
Generate five AUTHENTIC-ITALIAN-VIBE street boards for the LG 32SM5J-B
(portrait 1080x1920).

Design goal (revised): keep the authentic, non-touristy identity (real Italian
kicker, warm cream palette, restraint, no all-caps hype / flags / photo menus)
BUT be genuinely useful to a passer-by: every board lists a curated set of REAL
dishes with PRICES and a short plain-English line so a tourist knows what they
will eat and how much it costs. One clear theme per board so the TV can cycle
them as a rotating attract loop.

  1. vibe_family     - "Cucina di famiglia": the everyday classics
  2. vibe_fresh       - "Pasta fresca, fatta a mano": handmade pasta picks
  3. vibe_roma        - "Cucina Romana": the three Roman classics
  4. vibe_stagione    - "Cucina di stagione": from the sea, today
  5. vibe_benvenuti   - "Benvenuti": a warm welcome + signatures + hours

Prices are LOCKED, copied verbatim from menu_definitief_hybrid_CLEAN.html / menu_screen.html.
Outputs: lg_menu_v3/
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

CSS = """
:root{--bg:#faf6ee;--ink:#2c2118;--muted:#6f6354;--rule:#ddd0ba;--accent:%ACCENT%;}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:var(--bg);color:var(--ink);font-family:'Montserrat',system-ui,Arial,sans-serif;overflow:hidden}
.stage{position:relative;width:1080px;height:1920px;margin:0 auto;display:flex;flex-direction:column;justify-content:center;padding:110px 96px}
.clock{position:absolute;top:26px;right:44px;z-index:6;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;color:var(--muted)}
.masthead{text-align:center;margin-bottom:56px}
.kicker{font-family:'Montserrat',sans-serif;font-weight:600;font-size:16px;letter-spacing:6px;text-transform:uppercase;color:var(--accent)}
h1{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:78px;line-height:1.04;margin-top:16px}
.tag{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:30px;color:var(--muted);margin-top:16px}
.rule{width:96px;height:1px;background:var(--rule);margin:34px auto 0}
.items{display:flex;flex-direction:column;gap:34px}
.item .line{display:flex;align-items:baseline;gap:16px}
.name{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:600;white-space:nowrap}
.dots{flex:1;border-bottom:2px dotted var(--rule);transform:translateY(-8px)}
.price{font-family:'Montserrat',sans-serif;font-size:34px;font-weight:600;color:var(--accent);white-space:nowrap}
.desc{font-family:'Montserrat',sans-serif;font-size:22px;font-weight:400;color:var(--muted);margin-top:6px;line-height:1.35}
.foot{text-align:center;margin-top:60px;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:28px;color:var(--accent)}
.hours{text-align:center;margin-top:14px;font-family:'Montserrat',sans-serif;font-weight:500;font-size:24px;color:var(--ink)}
"""

# (filename, base, label, accent, kicker, title, tag, [ (name, price, desc), ... ], foot, hours)
DESIGNS = [
    ("menu_signage_vibe_family.html", "lgmenuv3-vibe-family", "v3 / vibe-family",
     "#9c4a3c", "Cucina di famiglia", "The classics",
     "The dishes we cook every day",
      [
          ("Carbonara", "€19", "Egg, pecorino, guanciale, black pepper."),
          ("Cacio e Pepe", "€16", "Pecorino Romano and cracked pepper."),
          ("Amatriciana", "€18", "Tomato, guanciale, pecorino, chili."),
          ("Quattro Formaggi", "€20", "Four Italian cheeses, rich and creamy."),
      ],
      "Antipasti from €5", ""),

    ("menu_signage_vibe_fresh.html", "lgmenuv3-vibe-fresh", "v3 / vibe-fresh",
     "#6b7a4f", "Pasta fresca", "Fatta a mano",
     "Pasta made by hand, every morning",
     [
         ("Linguine al Pesto Genovese con Stracciatella", "€17", "Basil pesto and fresh cream cheese."),
         ("Cacio e Pepe", "€16", "Pecorino Romano and cracked pepper."),
         ("Carbonara", "€19", "Egg, pecorino, guanciale, black pepper."),
         ("Pesto Gamberetti", "€21", "Shrimp, garlic and pesto."),
     ],
     "Gluten-free pasta on request, €3", ""),

    ("menu_signage_vibe_roma.html", "lgmenuv3-vibe-roma", "v3 / vibe-roma",
     "#9c4a3c", "Cucina Romana", "Come a Roma",
     "The three Roman classics, done right",
     [
         ("Carbonara", "€19", "Egg, pecorino, guanciale, black pepper."),
         ("Cacio e Pepe", "€16", "Pecorino Romano and cracked pepper."),
         ("Amatriciana", "€18", "Tomato, guanciale, pecorino, chili."),
     ],
     "Start with warm focaccia, €5.00", ""),

    ("menu_signage_vibe_stagione.html", "lgmenuv3-vibe-stagione", "v3 / vibe-stagione",
     "#6b7a4f", "Le specialità", "From the kitchen",
     "Our pasta specials, cooked to order",
     [
         ("Linguine al Pesto Genovese con Stracciatella", "€17", "Basil pesto and fresh cream cheese."),
         ("Quattro Formaggi", "€20", "Four Italian cheeses, rich and creamy."),
         ("Pesto Gamberetti", "€21", "Shrimp, garlic and pesto."),
     ],
     "Ask us what came in fresh today", ""),

    ("menu_signage_vibe_benvenuti.html", "lgmenuv3-vibe-benvenuti", "v3 / vibe-benvenuti",
     "#9c4a3c", "", "Benvenuti",
     "Sit down, eat well",
     [
         ("Carbonara", "€19", "Egg, pecorino, guanciale, black pepper."),
         ("Cacio e Pepe", "€16", "Pecorino Romano and cracked pepper."),
         ("Quattro Formaggi", "€20", "Four Italian cheeses, rich and creamy."),
     ],
     "Alcohol-free spritz, beer and sodas too", "Open every day until 23:00"),
]


def build(accent, kicker, title, tag, items, foot, hours):
    kicker_html = f'<div class="kicker">{kicker}</div>' if kicker else ""
    rows = ""
    for name, price, desc in items:
        rows += (
            '<div class="item">'
            f'<div class="line"><span class="name">{name}</span>'
            '<span class="dots"></span>'
            f'<span class="price">{price}</span></div>'
            f'<div class="desc">{desc}</div>'
            '</div>'
        )
    foot_html = f'<div class="foot">{foot}</div>' if foot else ""
    hours_html = f'<div class="hours">{hours}</div>' if hours else ""
    style = CSS.replace("%ACCENT%", accent)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>Pasta Menu: Street</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap');
{style}
</style>
</head>
<body>
<div class="stage">
  <div class="clock" id="clock"></div>
  <header class="masthead">
    {kicker_html}
    <h1>{title}</h1>
    <div class="tag">{tag}</div>
    <div class="rule"></div>
  </header>
  <div class="items">
    {rows}
  </div>
  {foot_html}
  {hours_html}
</div>
{SCRIPT}
</body>
</html>
"""


for fname, base, label, accent, kicker, title, tag, items, foot, hours in DESIGNS:
    with open(os.path.join(OUT, fname), "w", encoding="utf-8") as f:
        f.write(build(accent, kicker, title, tag, items, foot, hours))
    print(f"[ok] {label} -> {os.path.join(OUT, fname)}")

print(f"\n[done] {len(DESIGNS)} authentic-Italian-vibe boards (with dishes + prices) in lg_menu_v3/")
