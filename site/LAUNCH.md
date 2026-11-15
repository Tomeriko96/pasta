# Livegang-checklist: nieuwe website lacarbonara.nl

Een merge naar `main` zet de site direct live. Werk deze lijst van boven naar beneden af en zet er de datum bij. Bron: eigen audit en de externe re-audit van PR #15 (14 november 2026).

## 0. Blokkerend: eerst afronden, dan pas mergen

- [ ] **Eigen foto's.** Bevestig dat de foto's van de gevel, de rigatoni en de bruschetta van de zaak zelf zijn (geüpload als "Tomer").
- [ ] **Glutenvrij.** De site zegt dat elke pasta glutenvrij kan voor de toeslag. Laat de keuken bevestigen hoe dat bereid wordt: apart water, aparte pan, en geen gedeelde saus of kaas. Is het niet veilig bij coeliakie, zet dat er dan in alle zes talen bij.
- [ ] **Vertalingen.** Laat IT, DE, FR, ES en NL nalezen door moedertaalsprekers. Geef ze `src/i18n/<taal>.ts` en `src/i18n/menu-<taal>.json`, plus `VOICE.md`.
- [ ] **Menu.** De eigenaar keurt alle 37 gerechten, prijzen en beschrijvingen goed, en ook de print-PDF.
- [ ] **Openingstijden.** Bevestig de tijden (nu elke dag 12:00 tot 23:00), de laatste bestelling en afwijkingen op feestdagen.

### Al bevestigd (14 november 2026)
- Koffie €3, cappuccino €4. De oude QR-PDF met €3,50 en €4,50 is verouderd.
- De spritzen en het bier zijn echte 0,0%-producten. Leg de merken nog vast voor het dossier.
- "Coffee" is gewone koffie uit het apparaat.
- Het LG-scherm in de zaak speelt van USB, niet via `lacarbonara.nl/attract.html`.
- De rigatoni-foto is een pomodoro.

## 1. Bij de merge (livegang)

Deze oude adressen verdwijnen bewust:
- `/attract.html` en de MP4: het scherm speelt van USB.
- `/pdf-menus-weasyprint/menu_definitief_hybrid_CLEAN.pdf`: de print-PDF wordt niet meer online gezet.
- `/pdf-menus-weasyprint/menu_QR_alt.pdf`: verouderde prijzen.

Deze blijven werken:
- De QR-code op de menukaart wijst naar `https://lacarbonara.nl` en blijft dus werken.
- Oude ankerlinks van de huidige site: `#top`, `#about` en `#visit` landen op de bijbehorende sectie, `#menu` gaat naar de menupagina.

Controle direct na de deploy:
- [ ] Alle 24 pagina's geven 200. Een niet-bestaande URL geeft de 404-pagina.
- [ ] `/og.jpg`, `/robots.txt`, `/sitemap.xml` en `/llms.txt` laden.
- [ ] Google Rich Results Test: Restaurant en Menu zonder fouten.
- [ ] Linkvoorbeeld in WhatsApp: titel en foto kloppen.
- [ ] Op een echte iPhone en een echte Android-telefoon:
  - Google Maps en Apple Maps openen op de juiste ingang;
  - de belknop werkt;
  - de actiebalk onderaan dekt niets af;
  - de taalkeuze werkt.

## 2. Na de livegang

- [ ] Google Search Console: domein toevoegen en `https://lacarbonara.nl/sitemap.xml` indienen.
- [ ] Google Bedrijfsprofiel en Apple Business Connect: website, menulink (`/menu/`), tijden en foto's (#14).
- [ ] `geo` en `sameAs` invullen in `src/data/restaurant.json`.
- [ ] Het echte logo plaatsen (#16).
- [ ] Eigen foto's maken en de gastfoto's vervangen (#7). De gevelfoto toont nog een menubord met oude gerechten.
- [ ] Na 4 tot 6 weken: vraag in ChatGPT, Perplexity en Gemini naar "carbonara near Amsterdam Central Station" en noteer datum en antwoord.
