#!/usr/bin/env bash
# svg2pdf.sh — convert SVG files to PDF
# Requires: node + pdfkit + svg-to-pdfkit in node_modules (npm install)
#
# Usage:
#   ./svg2pdf.sh                 # all *.svg in current directory
#   ./svg2pdf.sh a.svg b.svg     # specific files
#   ./svg2pdf.sh -o out/         # write PDFs into a directory

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export NODE_PATH="${SCRIPT_DIR}/node_modules"

OUT_DIR=""
FILES=()

while [[ $# -gt 0 ]]; do
  case "$1" in
    -o|--output) OUT_DIR="${2:?'--output needs a path'}"; mkdir -p "$OUT_DIR"; shift 2 ;;
    -h|--help)   sed -n '/^#/p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *)           FILES+=("$1"); shift ;;
  esac
done

if [[ ${#FILES[@]} -eq 0 ]]; then
  mapfile -t FILES < <(find . -maxdepth 1 -name '*.svg' | sort)
fi

[[ ${#FILES[@]} -gt 0 ]] || { echo "No SVG files found." >&2; exit 1; }

CONVERTER="${SCRIPT_DIR}/_svg2pdf_node.js"

# ── convert loop ────────────────────────────────────────────────────────────
OK=0; FAIL=0

for src in "${FILES[@]}"; do
  [[ "$src" == *.svg || "$src" == *.SVG ]] || { echo "  skip: $src (not .svg)"; continue; }
  src="$(realpath "$src")"
  base="$(basename "${src%.*}")"
  dst="$(realpath "${OUT_DIR:-.}")/${base}.pdf"

  printf "  %-36s → %-30s " "$(basename "$src")" "$(basename "$dst")"

  if node "$CONVERTER" "$src" "$dst" 2>/tmp/_svg2pdf.err; then
    echo "✓"
    (( OK+=1 )) || true
  else
    echo "✗"
    sed 's/^/      /' /tmp/_svg2pdf.err >&2
    (( FAIL+=1 )) || true
  fi
done

echo ""
printf "  %d converted  %d failed\n" "$OK" "$FAIL"
[[ $FAIL -eq 0 ]]
