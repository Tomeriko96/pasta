# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A restaurant branding kit for **La Bella Pasta**. Source files are SVGs; the deliverables are PDFs. The tooling converts SVGs → PDFs using Node.js (`pdfkit` + `svg-to-pdfkit`).

## Setup

```bash
npm install
```

## Converting SVGs to PDFs

```bash
# Convert all *.svg in the current directory
./svg2pdf.sh

# Convert specific files
./svg2pdf.sh menu.svg placemat.svg

# Write PDFs into a subdirectory
./svg2pdf.sh -o out/
```

The script reads width/height from each SVG's root `<svg>` element to set the PDF page size. It delegates to `_svg2pdf_node.js` for each file.

## Architecture

- **`*.svg`** — source design files (a-board, business-card, menu, placemat, window-poster, cacio-e-pepe)
- **`svg2pdf.sh`** — bash driver: parses args, discovers SVGs, loops and reports results
- **`_svg2pdf_node.js`** — Node.js converter: reads one SVG, creates a PDFKit document at the correct dimensions, renders via svg-to-pdfkit, writes the PDF
- **`*.pdf`** — generated output (not committed; regenerate with `./svg2pdf.sh`)
