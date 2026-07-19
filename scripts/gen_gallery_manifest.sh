#!/usr/bin/env bash
# Regenerate menus/menus.json describing every menu HTML as grouped entries.
# Each entry: {"section": "...", "file": "path/name.html", "name": "name.html"}
# Sections: agent, print, signage, pipeline
# Run this after adding new menu versions, then `make gallery`.
set -eu
cd "$(dirname "$0")/.."
out="menus/menus.json"
{
  echo "["
  first=1
  emit() {
    local section="$1" file="$2" name
    name="$(basename "$file")"
    if [ $first -eq 1 ]; then first=0; else echo ","; fi
    printf '  {"section": "%s", "file": "%s", "name": "%s"}' "$section" "$file" "$name"
  }
  # Agent menus in menus/
  for f in $(ls menus/menu_*.html 2>/dev/null | xargs -n1 basename | sort -V); do
    [ "$f" = "index.html" ] && continue
    emit "agent" "menus/$f"
  done
  # Print menus in parent dir (exclude the signage page)
  for f in $(ls menu_*.html 2>/dev/null | sort -V); do
    case "$f" in menu_screen.html) continue;; esac
    emit "print" "$f"
  done
  # Signage pages: root screen + lg_menu + lg_menu_v2 (exclude index.html)
  for f in menu_screen.html $(ls lg_menu/*.html lg_menu_v2/*.html 2>/dev/null); do
    [ "$(basename "$f")" = "index.html" ] && continue
    emit "signage" "$f"
  done
  # JSON-pipeline surfaces
  for f in web.html tv.html print.html; do
    [ -f "$f" ] && emit "pipeline" "$f"
  done
  echo ""
  echo "]"
} > "$out"
echo "Wrote $out ($(grep -c '"section"' "$out") entries)"
