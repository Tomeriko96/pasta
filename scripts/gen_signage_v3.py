#!/usr/bin/env python3
"""
Generate five new, light, calm, single-column signage menus for the LG 32SM5J-B
(portrait 1080x1920). These address the review feedback:
  - light / bright backgrounds (not dark)
  - single column (no left/right split)
  - not busy: restrained type, generous space, minimal effects
  - beverages de-emphasised: full drinks list dropped, one small "ask us" note

Outputs go to lg_menu_v3/. Each file is self-contained (Google Fonts @import +
local images) so it renders in the video builder and the USB app builder.
"""

import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "lg_menu_v3")
os.makedirs(OUT, exist_ok=True)

# ---- Locked menu content (from menu_definitief_hybrid_CLEAN.html / menu_screen.html) ----
ANTIPASTI = [
    ("Warm Focaccia", "€5.00", "Served with extra virgin olive oil."),
    ("Bruschetta Classica", "€8.00", "Toasted bread with tomato, basil, garlic and extra virgin olive oil."),
    ("Bruschetta Cremosa", "€10.00", "Toasted bread with stracciatella, cherry tomatoes, fresh basil and extra virgin olive oil."),
    ("Bruschetta Gorgonzola e Miele", "€10.00", "Toasted bread with Gorgonzola Dolce, honey, walnuts and freshly cracked black pepper."),
    ("Tagliere Formaggi", "€16.00", "A selection of Italian cheeses served with warm focaccia, olives, honey and fig jam."),
    ("Olive Marinate", "€5.00", "Italian olives marinated with herbs, garlic and citrus."),
]
PASTA_CLASSICA = [
    ("La Carbonara", "€19.00", "Rome's iconic pasta. Silky egg, crispy guanciale, sharp Pecorino Romano and black pepper."),
    ("Cacio e Pepe", "€16.00", "Roman minimalism. Creamy cheese, cracked pepper. That's all."),
    ("Amatriciana", "€18.00", "From Amatrice. Crispy guanciale, tangy tomato, sharp Pecorino Romano. Bold and balanced."),
    ("Bolognese", "€18.00", "Bologna's signature. Slow-cooked meat ragu, served with Parmigiano Reggiano. Rich and warming."),
    ("Arrabbiata", "€15.00", "Roman fire. Fiery red sauce, fresh chili, served with Parmigiano Reggiano. Simple and spicy."),
    ("Al Pomodoro", "€14.00", "Italy's simplest. Fresh tomato, basil, served with Parmigiano Reggiano. Light and bright."),
]
PASTA_SPECIALE = [
    ("Linguine al Pesto Genovese con Stracciatella", "€17.00", "Genovese pesto with fresh stracciatella. Vibrant and herbaceous."),
    ("Quattro Formaggi", "€20.00", "Four Italian cheeses in rich, creamy sauce. Sharp, tangy, decadent."),
    ("Pesto Gamberetti", "€21.00", "Fresh shrimp with garlic and pesto. Subtle and refined."),
]
EXTRAS = [
    ("Gluten-Free Pasta", "€3.00", "Swap any pasta."),
    ("Add Pecorino Romano", "€4.00", ""),
    ("Add Parmigiano Reggiano 22 Month Aged", "€4.00", ""),
    ("Add Fresh Stracciatella", "€4.00", ""),
]


def item_html(name, price, desc):
    desc_html = f'<div class="desc">{desc}</div>' if desc else ""
    return (
        '<div class="item">'
        f'<div class="line"><span class="name">{name}</span>'
        '<span class="lead"></span>'
        f'<span class="price">{price}</span></div>'
        f"{desc_html}</div>"
    )


def section_html(label, items):
    body = "".join(item_html(n, p, d) for n, p, d in items)
    return f'<div class="section"><div class="label">{label}</div><div class="items">{body}</div></div>'


def body_html():
    slide_a = section_html("Antipasti", ANTIPASTI) + section_html("Pasta Classica", PASTA_CLASSICA)
    slide_b = (
        section_html("Pasta Speciale", PASTA_SPECIALE)
        + section_html("Extras", EXTRAS)
    )
    return f"""
<div class="stage">
  <div class="clock" id="clock"></div>

  <section class="slide slide-a is-active">
    <header class="masthead">
      <div class="kicker">Cucina Italiana</div>
      <h1>Antipasti &amp; Pasta</h1>
      <div class="tag">To share, then to savour</div>
    </header>
    {slide_a}
  </section>

  <section class="slide slide-b">
    <header class="masthead">
      <div class="kicker">Cucina Italiana</div>
      <h1>Pasta &amp; Mare</h1>
      <div class="tag">From the kitchen and the sea</div>
    </header>
    {slide_b}
    <div class="note">Drinks: alcohol-free spritz, cocktails, beer &amp; sodas available. Ask us.</div>
  </section>
</div>
"""


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
      }, 9000);
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


def doc(css, extra=""):
    body = body_html()
    if extra:
        body = body.replace('<div class="stage">', '<div class="stage">' + extra, 1)
    template = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>Pasta Menu: Signage</title>
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
    return template.replace("__CSS__", css).replace("__BODY__", body).replace("__SCRIPT__", SCRIPT)


# ---------- Design 1: Classic (centered, terracotta, soft rules) ----------
CLASSIC_CSS = """
:root{--bg:#faf5ec;--ink:#2c2118;--muted:#6f6354;--accent:#9c4a3c;--rule:#d8c7ad;}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:var(--bg);color:var(--ink);font-family:'Montserrat',system-ui,Arial,sans-serif;overflow:hidden}
.stage{position:relative;width:1080px;height:1920px;margin:0 auto;display:flex;flex-direction:column}
.clock{position:absolute;top:26px;right:44px;z-index:5;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;color:var(--muted)}
.slide{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:80px 90px;opacity:0;transition:opacity 1.1s ease;pointer-events:none}
.slide.is-active{opacity:1;pointer-events:auto}
.masthead{text-align:center;margin-bottom:30px}
.kicker{font-size:14px;letter-spacing:6px;text-transform:uppercase;color:var(--accent);font-weight:600}
h1{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:56px;letter-spacing:2px;margin-top:8px;color:var(--ink)}
.tag{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:20px;color:var(--muted);margin-top:6px}
.section{margin-bottom:24px}
.label{text-align:center;font-family:'Cormorant Garamond',serif;font-size:27px;letter-spacing:3px;text-transform:uppercase;color:var(--accent);margin-bottom:14px}
.label::after{content:"";display:block;width:90px;height:1px;background:var(--rule);margin:8px auto 0}
.items{display:flex;flex-direction:column;gap:13px}
.item{text-align:center}
.line{display:flex;justify-content:center;align-items:baseline;gap:14px}
.lead{display:none}
.name{font-family:'Cormorant Garamond',serif;font-size:31px;font-weight:600}
.price{font-family:'Montserrat',sans-serif;font-size:22px;font-weight:600;color:var(--accent)}
.desc{font-size:15px;color:var(--muted);margin-top:2px;max-width:760px;margin-left:auto;margin-right:auto}
.note{text-align:center;font-size:15px;color:var(--muted);margin-top:20px;font-style:italic}
"""

# ---------- Design 2: Editorial (left list, dotted leaders) ----------
EDITORIAL_CSS = """
:root{--bg:#fffdf8;--ink:#23201c;--muted:#7a7066;--accent:#8a5a2b;--rule:#e2d8c8;}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:var(--bg);color:var(--ink);font-family:'Montserrat',system-ui,Arial,sans-serif;overflow:hidden}
.stage{position:relative;width:1080px;height:1920px;margin:0 auto;display:flex;flex-direction:column}
.clock{position:absolute;top:26px;right:44px;z-index:5;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;color:var(--muted)}
.slide{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:80px 96px;opacity:0;transition:opacity 1.1s ease;pointer-events:none}
.slide.is-active{opacity:1;pointer-events:auto}
.masthead{text-align:left;margin-bottom:26px;border-bottom:2px solid var(--ink);padding-bottom:16px}
.kicker{font-size:14px;letter-spacing:5px;text-transform:uppercase;color:var(--accent);font-weight:600}
h1{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:54px;letter-spacing:1px;margin-top:8px;color:var(--ink)}
.tag{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:19px;color:var(--muted);margin-top:4px}
.section{margin-bottom:22px}
.label{text-align:left;font-family:'Montserrat',sans-serif;font-weight:600;font-size:14px;letter-spacing:3px;text-transform:uppercase;color:var(--accent);margin-bottom:12px}
.items{display:flex;flex-direction:column;gap:14px}
.item{text-align:left}
.line{display:flex;align-items:baseline}
.name{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:600}
.lead{flex:1;border-bottom:1px dotted var(--rule);margin:0 12px 6px;min-width:24px}
.price{font-family:'Montserrat',sans-serif;font-size:22px;font-weight:600;color:var(--accent)}
.desc{font-size:15px;color:var(--muted);max-width:840px;margin-top:1px}
.note{text-align:left;font-size:15px;color:var(--muted);margin-top:18px;font-style:italic}
"""

# ---------- Design 3: Minimal Air (hairlines, airy) ----------
MINIMAL_CSS = """
:root{--bg:#fcfbf7;--ink:#1f1c18;--muted:#8a8175;--accent:#b06a3a;--rule:#e7e1d6;}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:var(--bg);color:var(--ink);font-family:'Montserrat',system-ui,Arial,sans-serif;overflow:hidden}
.stage{position:relative;width:1080px;height:1920px;margin:0 auto;display:flex;flex-direction:column}
.clock{position:absolute;top:26px;right:44px;z-index:5;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;color:var(--muted)}
.slide{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:90px 110px;opacity:0;transition:opacity 1.1s ease;pointer-events:none}
.slide.is-active{opacity:1;pointer-events:auto}
.masthead{text-align:center;margin-bottom:40px}
.kicker{font-size:13px;letter-spacing:8px;text-transform:uppercase;color:var(--accent);font-weight:600}
h1{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:60px;letter-spacing:2px;margin-top:10px;color:var(--ink)}
.tag{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:19px;color:var(--muted);margin-top:8px}
.section{margin-bottom:18px}
.label{text-align:center;font-family:'Montserrat',sans-serif;font-size:13px;letter-spacing:4px;text-transform:uppercase;color:var(--muted);margin:26px 0 14px}
.label::before,.label::after{content:"";display:inline-block;width:44px;height:1px;background:var(--rule);vertical-align:middle;margin:0 14px 4px}
.items{display:flex;flex-direction:column;gap:17px}
.item{text-align:center}
.line{display:flex;justify-content:center;align-items:baseline;gap:14px}
.lead{display:none}
.name{font-family:'Cormorant Garamond',serif;font-size:29px;font-weight:600}
.price{font-family:'Montserrat',sans-serif;font-size:20px;font-weight:600;color:var(--accent)}
.desc{font-size:14px;color:var(--muted);margin-top:2px;max-width:720px;margin-left:auto;margin-right:auto}
.note{text-align:center;font-size:14px;color:var(--muted);margin-top:24px;font-style:italic}
"""

# ---------- Design 4: Framed Bistro (keyline card on cream) ----------
BISTRO_CSS = """
:root{--bg:#efe3cd;--ink:#3a2c1e;--muted:#7c6a52;--accent:#9c4a3c;--rule:#cdb892;}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:var(--bg);color:var(--ink);font-family:'Montserrat',system-ui,Arial,sans-serif;overflow:hidden}
.stage{position:relative;width:1080px;height:1920px;margin:0 auto;display:flex;flex-direction:column}
.frame{position:absolute;inset:34px;border:1px solid var(--accent);box-shadow:inset 0 0 0 5px rgba(255,255,255,0.35), inset 0 0 0 6px var(--rule);pointer-events:none;z-index:2}
.clock{position:absolute;top:54px;right:70px;z-index:5;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;color:var(--muted)}
.slide{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:96px 120px;opacity:0;transition:opacity 1.1s ease;pointer-events:none}
.slide.is-active{opacity:1;pointer-events:auto}
.masthead{text-align:center;margin-bottom:28px}
.kicker{font-size:14px;letter-spacing:6px;text-transform:uppercase;color:var(--accent);font-weight:600}
h1{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:54px;letter-spacing:2px;margin-top:8px;color:var(--ink)}
.tag{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:20px;color:var(--muted);margin-top:6px}
.section{margin-bottom:22px}
.label{text-align:center;font-family:'Cormorant Garamond',serif;font-size:26px;letter-spacing:3px;text-transform:uppercase;color:var(--accent);margin-bottom:12px}
.label::after{content:"";display:block;width:80px;height:1px;background:var(--rule);margin:8px auto 0}
.items{display:flex;flex-direction:column;gap:12px}
.item{text-align:center}
.line{display:flex;justify-content:center;align-items:baseline;gap:14px}
.lead{display:none}
.name{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:600}
.price{font-family:'Montserrat',sans-serif;font-size:21px;font-weight:600;color:var(--accent)}
.desc{font-size:15px;color:var(--muted);margin-top:2px;max-width:760px;margin-left:auto;margin-right:auto}
.note{text-align:center;font-size:15px;color:var(--muted);margin-top:18px;font-style:italic}
"""
BISTRO_EXTRA = '<div class="frame"></div>'

# ---------- Design 5: Soft Hero (light image band + list) ----------
HERO_CSS = """
:root{--bg:#fbf7ef;--ink:#2c2118;--muted:#6f6354;--accent:#9c4a3c;--rule:#e3d8c4;}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:var(--bg);color:var(--ink);font-family:'Montserrat',system-ui,Arial,sans-serif;overflow:hidden}
.stage{position:relative;width:1080px;height:1920px;margin:0 auto;display:flex;flex-direction:column}
.hero{position:absolute;top:0;left:0;right:0;height:560px;background:url('images/focaccia.jpg') center/cover;z-index:0}
.hero::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(251,247,239,0.15),rgba(251,247,239,0.96))}
.clock{position:absolute;top:26px;right:44px;z-index:5;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;color:var(--ink)}
.slide{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-start;padding:600px 96px 70px;opacity:0;transition:opacity 1.1s ease;pointer-events:none}
.slide.is-active{opacity:1;pointer-events:auto}
.masthead{text-align:center;margin-bottom:22px}
.kicker{font-size:13px;letter-spacing:6px;text-transform:uppercase;color:var(--accent);font-weight:600}
h1{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:52px;letter-spacing:2px;margin-top:6px;color:var(--ink)}
.tag{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:19px;color:var(--muted);margin-top:6px}
.section{margin-bottom:18px}
.label{text-align:center;font-family:'Cormorant Garamond',serif;font-size:25px;letter-spacing:3px;text-transform:uppercase;color:var(--accent);margin-bottom:12px}
.label::after{content:"";display:block;width:80px;height:1px;background:var(--rule);margin:8px auto 0}
.items{display:flex;flex-direction:column;gap:12px}
.item{text-align:center}
.line{display:flex;justify-content:center;align-items:baseline;gap:14px}
.lead{display:none}
.name{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:600}
.price{font-family:'Montserrat',sans-serif;font-size:21px;font-weight:600;color:var(--accent)}
.desc{font-size:15px;color:var(--muted);margin-top:2px;max-width:760px;margin-left:auto;margin-right:auto}
.note{text-align:center;font-size:15px;color:var(--muted);margin-top:16px;font-style:italic}
"""
HERO_EXTRA = '<div class="hero"></div>'

DESIGNS = [
    ("menu_signage_classic.html", "lgmenuv3-classic", "v3 / classic", CLASSIC_CSS, ""),
    ("menu_signage_editorial.html", "lgmenuv3-editorial", "v3 / editorial", EDITORIAL_CSS, ""),
    ("menu_signage_minimal.html", "lgmenuv3-minimal", "v3 / minimal", MINIMAL_CSS, ""),
    ("menu_signage_bistro.html", "lgmenuv3-bistro", "v3 / bistro", BISTRO_CSS, BISTRO_EXTRA),
    ("menu_signage_hero.html", "lgmenuv3-hero", "v3 / hero", HERO_CSS, HERO_EXTRA),
]

for fname, base, label, css, extra in DESIGNS:
    out = os.path.join(OUT, fname)
    with open(out, "w", encoding="utf-8") as f:
        f.write(doc(css, extra))
    print(f"[ok] {label} -> {out}")

print(f"\n[done] {len(DESIGNS)} light single-column signage menus in lg_menu_v3/")
