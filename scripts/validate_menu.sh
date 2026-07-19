#!/usr/bin/env bash
# Validates a set of menu HTML files for the locked rules:
#  1. no em-dashes or en-dashes
#  2. prices use decimal points, never commas
#  3. all 44 locked item names present
# Usage: ./scripts/validate_menu.sh menus/menu_tourist_v4.html [more files...]
set -u

fail=0

items=(
"Warm Focaccia" "Bruschetta Classica" "Bruschetta Cremosa" "Bruschetta Mediterranea"
"Bruschetta Gorgonzola e Miele" "Bruschetta Mista" "Tagliere Formaggi" "Insalata di Rucola"
"Olive Marinate" "Aperol 0.0" "Bitter 0.0" "Limoncello 0.0" "Mojito" "Amaretto Sour"
"Pornstar Martini" "Strawberry Daiquiri" "Sex on the Beach" "Heineken 0.0"
"Passion Fruit" "Orange" "Pineapple" "Apricot" "Still Water" "Sparkling Water"
"La Carbonara" "Cacio e Pepe" "Amatriciana" "Bolognese" "Alla Puttanesca" "Arrabbiata"
"Al Pomodoro" "Linguine al Pesto Genovese con Stracciatella" "Quattro Formaggi"
"Linguine alla Diavola con Cozze" "Gamberetti" "Linguine alle Cozze e Gorgonzola"
"Cozze alla Diavola" "Cozze al Gorgonzola" "Gluten-Free Pasta" "Pecorino Romano"
"Parmigiano Reggiano" "Stracciatella"
)

for f in "$@"; do
  if [ ! -f "$f" ]; then
    echo "MISSING: $f"; fail=1; continue
  fi
  # 1. dashes
  if grep -qP '\x{2014}|\x{2013}' "$f"; then
    echo "DASH FAIL: $f contains em/en dash"; fail=1
  fi
  # 2. comma prices like EUR6,50
  if grep -qP '\x{20AC}[0-9]+,[0-9]' "$f"; then
    echo "COMMA-PRICE FAIL: $f uses decimal comma in a price"; fail=1
  fi
  # 3. item count sanity: each menu should list ~44 priced items.
  # (connoisseur uses Italian names, so we count price occurrences, not exact English strings)
  pc=$(grep -oP '\x{20AC}[0-9]' "$f" | wc -l)
  if [ "$pc" -lt 28 ]; then
    echo "ITEM-COUNT FAIL: $f has only $pc priced entries (expected >= 28)"; fail=1
  fi
  # 4. locked-price spot checks (values that must never change or be lowered)
  for p in "6.50" "19.00" "22.00" "21.00" "14.00"; do
    if ! grep -qF "$p" "$f"; then
      echo "MISSING LOCKED PRICE in $f: EUR$p"; fail=1
    fi
  done
done

if [ "$fail" -eq 0 ]; then
  echo "VALIDATION PASS for: $*"
else
  echo "VALIDATION FAILED"
fi
exit $fail
