# Pasta Restaurant Menu

Static and digital menus for La Carbonara, a pasta restaurant. Two surfaces, kept in sync manually when dishes or prices change:

1. **Print / PDF** - a single static A4 HTML (`menu_definitief_hybrid_CLEAN.html`), rendered with weasyprint into `pdf-menus-weasyprint/menu_definitief_hybrid_CLEAN.pdf`.
2. **LG signage** - `menu_screen.html`, a standalone portrait page for the 32SM5J-B display. See `SIGNAGE_PLAN.md`.

## Quick start

```bash
uv run weasyprint menu_definitief_hybrid_CLEAN.html pdf-menus-weasyprint/menu_definitief_hybrid_CLEAN.pdf  # PDF from the menu HTML
python3 scripts/build_signage_usb.py    # Offline webOS app -> dist/usb/application/pasta-signage.zip
node scripts/build_signage_video.js     # Looping MP4s of all variants -> dist/usb/videos/
node scripts/build_signage_video.js lgmenuv3-lc-y1-cream-si   # Signage-images variant -> dist/usb/lg_signage/lgmenuv3-lc-y1-cream-si.mp4
```

`uv` is required for the PDF target. `weasyprint` is not declared in `pyproject.toml`; install it into the venv (`uv pip install weasyprint`) before rendering.

## Docs

- `AGENTS.md` - full architecture, locked decisions, conventions, and the agentic sparring workflow.
- `SIGNAGE_PLAN.md` - LG 32SM5J-B signage deployment plan.

## Conventions

- Menu items and prices are locked (set in `menu_definitief_hybrid_CLEAN.html`). Never ship lowered prices.
- No em-dashes or en-dashes in any menu copy or docs.
- Italian dish names used as-is; fizzy drinks carry their brand + flavor ("Fizzy Amarena Fabbri Lemonade"); "Add" prefix for extras; volume in parentheses.
