#!/usr/bin/env bash
# Regenerate menus/menus.json listing every menu_*.html (except index.html).
# Run this after adding new menu versions, then `make gallery`.
set -eu
cd "$(dirname "$0")/.."
out="menus/menus.json"
{
  echo "["
  first=1
  for f in $(ls menus/menu_*.html 2>/dev/null | xargs -n1 basename | sort -V); do
    [ "$f" = "index.html" ] && continue
    if [ $first -eq 1 ]; then first=0; else echo ","; fi
    printf '  "%s"' "$f"
  done
  echo ""
  echo "]"
} > "$out"
echo "Wrote $out ($(grep -c '"menu_' "$out") menus)"
