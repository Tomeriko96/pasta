// Deutsch. Mirrors en.ts; written in the same voice (du/wir), see VOICE.md.
import type { Facts } from './facts';
import type { Copy } from './en';

const de = (f: Facts): Copy => ({
  locale: 'de_DE',
  langName: 'Deutsch',
  skip: 'Zum Inhalt springen',
  nav: { language: "Sprache", home: 'Startseite', menu: 'Speisekarte', visit: 'Anfahrt', faq: 'Fragen', label: 'Hauptmenü' },
  status: {
    fallback: `Täglich geöffnet, ${f.open} bis ${f.close} Uhr`,
    open: `Jetzt geöffnet bis ${f.close} Uhr`,
    before: `Zurzeit geschlossen. Wir öffnen um ${f.open} Uhr`,
    after: `Zurzeit geschlossen. Wir öffnen morgen um ${f.open} Uhr`,
  },
  actions: { label: "Schnellzugriff", menu: 'Zur Speisekarte', directions: 'Route', call: 'Ruf uns an', google: 'Google Maps', apple: 'Apple Karten' },
  facts: { open: 'Geöffnet', openValue: `Täglich, ${f.open} bis ${f.close} Uhr`, address: 'Adresse', phone: 'Telefon' },
  storefrontAlt: 'Die Fassade von La Carbonara in der Lange Niezel.',
  storefrontCaption: 'Achte auf die rote Leuchtreklame.',
  guests: {
    title: "Fotos unserer Gäste",
    credit: (name: string) => `Foto: ${name}`,
    pomodoro: "Linguine mit Tomatensauce und Basilikum.",
    ragu: "Bolognese: Rigatoni mit Bolognese-Sauce und Parmigiano Reggiano.",
    bruschetta: "Bruschetta Cremosa mit Stracciatella und Tomaten.",
  },
  photos: {
    carbonara: "Linguine Carbonara mit Guanciale, Pecorino Romano und schwarzem Pfeffer.",
    bruschetta: "Bruschetta Cremosa: geröstetes Brot mit Stracciatella, Tomaten und Basilikum.",
    rigatoni: "Pomodoro: Rigatoni mit Tomatensauce, Parmigiano Reggiano und Basilikum.",
  },
  footer: {
    allergy: 'Allergien oder besondere Ernährungswünsche? Sag uns bitte Bescheid, bevor du bestellst.',
    pages: 'Seiten',
    language: 'Sprache',
  },

  home: {
    title: 'Römische Carbonara nahe Amsterdam Centraal | La Carbonara',
    description: `Römische Carbonara ohne Sahne in der ${f.street}, Amsterdam. Täglich ${f.open} bis ${f.close} Uhr, ohne Reservierung. Alle Getränke sind alkoholfrei.`,
    schema: 'Pastarestaurant in der Amsterdamer Innenstadt mit römischen Klassikern: Carbonara ohne Sahne, Cacio e Pepe, Amatriciana und Gricia. Keine Reservierungen, Essen zum Mitnehmen möglich, alle Getränke alkoholfrei.',
    h1: 'Römische Carbonara in der Lange Niezel',
    lead: `Unsere Carbonara machen wir mit Guanciale, Eigelb, Pecorino Romano und schwarzem Pfeffer, ohne Sahne. Reservierungen nehmen wir nicht an, komm einfach vorbei oder nimm deine Pasta mit.`,
    pastaTitle: 'Unsere Pasta',
    pastaIntro: 'Die meisten unserer Pastagerichte kommen aus Rom. Die Bolognese, die Linguine al Pesto und die Quattro Formaggi stammen aus anderen Teilen Italiens.',
    fullMenu: 'Zur Speisekarte',
    drinksTitle: 'Getränke',
    drinksText: `Bei uns ist jedes Getränk alkoholfrei, auch der Aperol Spritz, der Bitter Spritz, der Limoncello Spritz und das Birra Moretti Zero. Dazu gibt es Limonade und Kaffee.`,
    visitTitle: 'Anfahrt',
    visitText: `Wir sind in der ${f.street}, mitten in der Altstadt.`,
    lemonades: (n: number) => `Limonade in ${n} Sorten`,
    visitMore: 'Öffnungszeiten und Anfahrt',
    faqTitle: 'Häufige Fragen',
    faqMore: 'Alle Fragen',
  },

  menu: {
    title: 'Speisekarte und Preise | La Carbonara Amsterdam',
    description: `Römische Pasta von ${f.minPasta} bis ${f.maxPasta} in der Amsterdamer Altstadt. Die Carbonara kostet ${f.carbonara}, und jede Pasta gibt es gegen Aufpreis auch glutenfrei.`,
    h1: 'Speisekarte',
    lead: `Jede Pasta können wir gegen ${f.gf} Aufpreis glutenfrei zubereiten.`,
    food: 'Essen',
    drinks: 'Getränke',
    drinksNote: 'Alle unsere Getränke sind alkoholfrei.',
    featured: 'Specialità della casa',
  },

  visit: {
    title: 'Öffnungszeiten und Anfahrt | La Carbonara Amsterdam',
    description: `Wir sind in der ${f.street} in Amsterdam, ${f.walk.centraal} Minuten zu Fuß vom Hauptbahnhof. Täglich von ${f.open} bis ${f.close} Uhr geöffnet, ohne Reservierung.`,
    h1: 'Öffnungszeiten und Anfahrt',
    hoursTitle: 'Öffnungszeiten',
    hoursText: `Wir haben jeden Tag von ${f.open} bis ${f.close} Uhr geöffnet.`,
    addressTitle: 'Adresse',
    walkTitle: 'Zu Fuß',
    walk: [
      { place: 'Hauptbahnhof', min: f.walk.centraal },
      { place: 'Dam-Platz', min: f.walk.dam },
      { place: 'Nieuwmarkt', min: f.walk.nieuwmarkt },
    ],
    minutes: (n: number) => `${n} Min.`,
    comingTitle: 'Vorbeikommen oder mitnehmen',
    comingText: 'Reservieren geht bei uns nicht, komm einfach vorbei. Deine Pasta kannst du auch mitnehmen.',
    phoneTitle: 'Telefon',
  },

  faq: {
    title: 'Häufige Fragen | La Carbonara Amsterdam',
    description: 'Reservierungen nehmen wir nicht an, und in unsere Carbonara kommt keine Sahne. Jede Pasta machen wir gegen Aufpreis auch glutenfrei.',
    h1: 'Häufige Fragen',
    items: [
      { q: 'Muss ich einen Tisch reservieren?', a: 'Nein. Wir nehmen keine Reservierungen an, komm einfach vorbei.' },
      { q: 'Kann ich meine Pasta mitnehmen?', a: 'Ja, sag einfach bei der Bestellung Bescheid.' },
      { q: 'Kommt Sahne in eure Carbonara?', a: 'Nein. Wir machen sie mit Guanciale, Eigelb, Pecorino Romano und schwarzem Pfeffer, wie in Rom.' },
      { q: 'Habt ihr glutenfreie Pasta?', a: `Ja. Jede Pasta können wir gegen ${f.gf} Aufpreis glutenfrei zubereiten. Sag es uns einfach, wenn du bestellst.` },
      { q: 'Gibt es bei euch Alkohol?', a: 'Nein. Alle unsere Getränke sind alkoholfrei (0,0 %), auch jeder Spritz und das Birra Moretti Zero.' },
      { q: 'Was kostet die Pasta?', a: `Unsere Pastagerichte kosten zwischen ${f.minPasta} und ${f.maxPasta}, die Carbonara ${f.carbonara}.` },
      { q: 'Wie weit ist es vom Hauptbahnhof?', a: `Etwa ${f.walk.centraal} Minuten zu Fuß. Unsere Adresse ist ${f.address}.` },
    ],
  },

  notFound: {
    title: 'Seite nicht gefunden | La Carbonara',
    h1: 'Diese Seite gibt es nicht',
    text: 'Dieser Link führt ins Leere. Hast du vielleicht unsere Speisekarte oder unsere Öffnungszeiten gesucht?',
  },
});

export default de;
