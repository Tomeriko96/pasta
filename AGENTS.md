# AGENTS.md

## Project: Pasta Restaurant Menu

### Source Files

| File | Purpose |
|------|---------|
| `menu.html` | Original 2-page A4 layout (Georgia/Arial fonts) |
| `font.html` | Font reference (Cormorant Garamond + Montserrat, Google Fonts) |
| `menu_new.html` | **Current working file** — combines menu.html layout + font.html fonts |
| `menu_new.pdf` | PDF output generated via weasyprint |
| `Makefile` | `make pdf` target for one-command PDF generation |

### Architecture

- **Single HTML source** (`menu_new.html`) drives both screen display and print
- A4 page dimensions hardcoded (210mm x 297mm) with `@page { size: A4 }`
- Two-page structure: Page 1 = Antipasti & Drinks, Page 2 = Pasta & Mare & Extras
- Google Fonts loaded via `<link>` (Cormorant Garamond for headings/names, Montserrat for body/prices)
- PDF generation: `uv run weasyprint menu_new.html menu_new.pdf`

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
