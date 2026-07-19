# AGENTS.md

## Project: Pasta Restaurant Menu

### Source Files

| File | Purpose |
|------|---------|
| `menu_improved.html` | Baseline 2-page A4 menu: font.html fonts + menu.html layout, locked items & prices |
| `menu_agentic.html` | Spar round 1 output: repriced, consolidated drinks, honest 0.0% banner, promoted Extras |
| `menu_agentic_v2.html` | **Current best** — spar round 2 output: single "Bevande — Alcohol-Free" block with 3 sub-groupings, trimmed chatty sub-notes, darker dotted leaders, 10.5px descriptions, Extras promoted under Pasta Speciale |
| `menu.json` | Menu data for tv/web/print pipeline (`tv.html`, `web.html`, `print.html` + `js/menu.js`) |
| `menu_screen.html` | **LG signage page** for the 32SM5J-B (portrait, 1080×1920). Two-column static split: left = Antipasti & Drinks, right = Pasta & Mare. Image backgrounds + dark scrim, live clock, 10-min auto-reload. Derived from `menu_improved.html` content. |
| `images/` | Royalty-free hero photos (Unsplash/Pexels, commercial use, no attribution) used as section backgrounds in `menu_screen.html`. |
| `SIGNAGE_PLAN.md` | Full plan for deploying the menu on the LG 32SM5J-B signage display (device setup, layout, hosting, update workflow). **Read this before touching signage.** |
| `Makefile` | `make pdf` target → `menu_improved.pdf` via weasyprint |

### Architecture

- **Three menu surfaces** (keep in sync manually when dishes/prices change):
  1. **Print/PDF** — static A4 HTML (`menu_agentic_v2.html` is canonical for print), generated via `make pdf` / weasyprint.
  2. **JSON pipeline** — `menu.json` + `js/menu.js` + `css/*` for tv/web/print.
  3. **LG signage** — `menu_screen.html`, a standalone portrait page for the 32SM5J-B. Derived from `menu_improved.html` content but redesigned for a live screen (no A4/`@page`). References local images in `images/`, so it must be hosted with the `images/` folder alongside it.
- A4 page dimensions hardcoded (210mm x 297mm) with `@page { size: A4 }`
- Two-page structure: Page 1 = Antipasti & Drinks, Page 2 = Pasta & Mare & Extras
- Fonts: Cormorant Garamond (headings/names) + Montserrat (body/prices) via Google Fonts `@import`
- PDF generation: `uv run weasyprint menu_improved.html menu_improved.pdf` (requires system GTK libs — present in devcontainer)
- **Signage display**: LG 32SM5J-B, webOS 6.0, 1920×1080 panel used in **portrait (1080×1920)**. Deployed via the built-in **Play via URL** feature (Settings → EZ Settings → SI Server Setting → URL mode) pointing at a hosted `menu_screen.html`. No external PC. Full deployment plan in `SIGNAGE_PLAN.md`.
- `menu_screen.html` is **static 2-column** (no rotation): left column = Antipasti & Drinks, right column = Pasta & Mare. Includes a live clock and a 10-minute `setTimeout(location.reload)` so price edits appear without a manual reboot. Swap background images by editing the `background-image:url('images/...')` on each `.col .bg`.
- Image licensing: all files in `images/` are royalty-free for commercial use (Unsplash/Pexels), no attribution required.

### Agentic Sparring Workflow

After each sparring session, a new `menu_agentic_vN.html` is written capturing the consensus.
- **Round 1** (roles: owner, chef, tourist, Italian connoisseur, Amsterdam local): reviewed `menu_improved.html`; produced 5 role-based menus. Consensus → reprice, consolidate bruschette, own the 0.0% concept, add plain-English descriptions, promote Extras.
- **Round 2** (roles: graphic designer, tourist, owner, Italian connoisseur; prices/items locked): compared `menu_improved.html` vs `menu_agentic.html`. Consensus → keep single "Bevande — Alcohol-Free" block + 0.0% note, add 2–3 drink sub-groupings, delete chatty sub-notes (keep quiet courtesy lines), promote Extras, fix dotted-leader legibility. Output: `menu_agentic_v2.html`.
- **Rule:** always write the next `menu_agentic_vN.html` immediately after a sparring round.

### Locked Decisions

- **Menu items and prices are FINAL** (set in `menu_improved.html`). Sparring agents may propose repricing, but the owner has locked prices — never ship lowered prices. The `menu_agentic.html` (round 1) accidentally carried agent-proposed lower prices; `menu_agentic_v2.html` restores the locked prices and only applies layout/copy improvements.
- When creating a new `menu_agentic_vN.html`, copy prices verbatim from `menu_improved.html`.

### Known Issues

- `overflow: hidden` on `.page` silently clips content if a page overflows A4 — keep page-2 content trimmed.
- `weasyprint` is not declared in `pyproject.toml`; install into the venv (`uv pip install weasyprint`) before `make pdf`.
- TV/web/print pipeline (`menu.json`) is a separate data source from the static print HTML — keep both in sync manually when dishes change.

### Item Name Conventions

- Italian dish names used as-is (Carbonara, Cacio e Pepe, Amatriciana)
- "Fruit Sodas" not "Fizzy" — clear to all customers
- "Extra" prefix for add-ons (Extra Pecorino Romano, Extra Parmigiano Reggiano)
- Volume in parentheses: Still Water (0.75 L)
- No articles before dish names (Carbonara, not La Carbonara)

### Dependencies

- `uv` — Python package manager (used for weasyprint)
- `weasyprint` — HTML/CSS to PDF converter (respects `@page` rules, loads Google Fonts from CDN)
- DevContainer includes chromium for headless rendering

### Commands

```bash
make pdf              # Generate PDF from menu_new.html
uv run weasyprint menu_new.html menu_new.pdf  # Direct PDF generation
```

### Review Notes (from sub-agent audit)

- Descriptions at 9.4px/weight-300 are borderline for print legibility — consider 10.5px/400 if printing on non-laser printers
- Line-height 1.08 on item names is tight for long names (e.g. "Linguine al Pesto Genovese con Stracciatella")
- Dotted leader color (#c4b28f) has low contrast (~2.3:1) — darken if needed
- `overflow: hidden` on `.page` silently clips content if it overflows — monitor when editing
- Two `<main>` elements (one per page) is technically invalid HTML5 but works in practice
