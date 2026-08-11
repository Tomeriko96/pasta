# La Carbonara Menu - Development Guide

## Font Rendering & PDF Generation

### Typography
The menus use two Google Fonts loaded via preconnect + preload for optimal performance:
- **Cormorant Garamond** (serif) - for headers and dish names (weights: 400, 600, 700, italic)
- **Montserrat** (sans-serif) - for body text and descriptions (weights: 300, 400, 500, 600)

### PDF Rendering
**Use weasyprint, not Playwright**, for PDF generation. Weasyprint properly embeds Google Fonts and maintains typographic integrity.

```bash
uv pip install weasyprint
uv run weasyprint menu_improved_additions.html output.pdf
```

Playwright's PDF rendering (via headless Chromium) does not reliably embed external fonts and may fall back to system fonts, causing the serif font to appear without proper styling.

### HTML Font Loading Strategy
All menu HTML files use preconnect + preload for font efficiency:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=..." onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="..."></noscript>
```

This ensures fonts load quickly and render correctly across browsers and PDF generators.

### Menu Variants
- `menu_improved_additions.html` - current active version (Beverages page 1, Antipasti & Pasta page 2)
- `menu_improved_additions_beschrijving_smaak.html` - test: taste/texture-focused descriptions
- `menu_improved_additions_beschrijving_herkomst.html` - test: tradition/origin-focused descriptions
- `menu_improved_additions_beschrijving_verhaal.html` - test: narrative/connection-focused descriptions

### Content Guidelines
- No em-dashes (—) or en-dashes (–); use periods or commas
- Italian dish names kept as-is
- Single-line descriptions on printed menus
- Descriptions should sound natural, not AI-generated
