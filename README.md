# Pasta Restaurant Menu

https://qrmenucreator.com/____SAVE_THIS_URL_TO_EDIT_YOUR_MENU_LATER____&action=edit&menu_id=pd9lsl&menu_hash=jzeg80piacrbxwoz

Static and digital menus for a pasta restaurant. Three surfaces, kept in sync manually when dishes or prices change:

1. **Print / PDF** - static A4 HTML. `menu_improved.html` is the baseline; `menu_agentic_vN.html` are sparring-round revisions (latest is canonical for print). Generate a PDF with `make pdf`.
2. **JSON pipeline** - `menu.json` + `js/menu.js` + `css/*` drive `tv.html`, `web.html`, and `print.html`.
3. **LG signage** - `menu_screen.html`, a standalone portrait page for the 32SM5J-B display. See `SIGNAGE_PLAN.md`.
4. **QR menu** - `qr_menu.md`, a markdown export for qrmenucreator.com.

## Quick start

```bash
make dev       # Serve the repo on http://localhost:8080
make pdf       # Generate menu_improved.pdf via weasyprint
make gallery   # Regenerate menus/menus.json then serve the review gallery
```

`uv` is required for the PDF target. `weasyprint` is not declared in `pyproject.toml`; install it into the venv (`uv pip install weasyprint`) before `make pdf`.

## QR menu

`qr_menu.md` contains the menu in qrmenucreator.com markdown format (food first, Bevande last). Prices and descriptions are copied verbatim from `menu_improved.html`. Add image lines once photos are uploaded in qrmenucreator.com.

## Docs

- `AGENTS.md` - full architecture, locked decisions, conventions, and the agentic sparring workflow.
- `SIGNAGE_PLAN.md` - LG 32SM5J-B signage deployment plan.

## Conventions

- Menu items and prices are locked (set in `menu_improved.html`). Never ship lowered prices.
- No em-dashes or en-dashes in any menu copy or docs.
- Italian dish names used as-is; "Fruit Sodas" not "Fizzy"; "Extra" prefix for add-ons; volume in parentheses.
