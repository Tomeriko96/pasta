// Deutsch. Mirrors en.ts; written in the same voice (du/wir), see VOICE.md.
import type { Facts } from './facts';
import type { Copy } from './en';

const de = (f: Facts): Copy => ({
  locale: 'de_DE',
  langName: 'Deutsch',
  skip: 'Zum Inhalt springen',
  nav: { home: 'Start', menu: 'Speisekarte', visit: 'Anfahrt', faq: 'Fragen', label: 'Hauptmenü' },
  status: {
    fallback: `Täglich geöffnet, ${f.open} bis ${f.close} Uhr`,
    open: `Jetzt geöffnet, bis ${f.close} Uhr`,
    before: `Gerade geschlossen, wir öffnen um ${f.open} Uhr`,
    after: `Gerade geschlossen, wir öffnen morgen um ${f.open} Uhr`,
  },
  actions: { menu: 'Zur Speisekarte', directions: 'Route', call: 'Ruf uns an', google: 'Google Maps', apple: 'Apple Karten' },
  facts: { open: 'Geöffnet', openValue: `Täglich, ${f.open} bis ${f.close} Uhr`, address: 'Adresse', phone: 'Telefon' },
  storefrontAlt: 'Die Fassade von La Carbonara in der Lange Niezel.',
  storefrontCaption: `Du erkennst uns an der roten Leuchtreklame in der ${f.street}.`,
  guests: {
    title: "Fotos unserer Gäste",
    credit: (name: string) => `Foto: ${name}`,
    pomodoro: "Linguine mit Tomatensauce und Basilikum.",
    ragu: "Rigatoni mit Fleischsauce und Parmigiano Reggiano.",
    bruschetta: "Bruschetta mit Stracciatella und Tomaten.",
  },
  photos: {
    carbonara: "Linguine Carbonara mit Guanciale, Pecorino Romano und schwarzem Pfeffer.",
    bruschetta: "Bruschetta Cremosa: geröstetes Brot mit Stracciatella, Tomaten und Basilikum.",
    rigatoni: "Rigatoni in Tomatensauce mit Parmigiano Reggiano und Basilikum.",
  },
  footer: {
    allergy: 'Allergien oder besondere Ernährungswünsche? Sag uns bitte Bescheid, bevor du bestellst.',
    pages: 'Seiten',
    language: 'Sprache',
  },

  home: {
    title: 'Römische Carbonara nahe dem Hauptbahnhof Amsterdam | La Carbonara',
    description: `Carbonara nach römischer Art, ohne Sahne, in der ${f.street} in Amsterdam. Täglich von ${f.open} bis ${f.close} Uhr geöffnet. Komm einfach vorbei oder nimm dein Essen mit, alle Getränke sind alkoholfrei.`,
    schema: 'Pastarestaurant in der Amsterdamer Innenstadt mit römischen Klassikern: Carbonara ohne Sahne, Cacio e Pepe, Amatriciana und Gricia. Keine Reservierungen, Essen zum Mitnehmen möglich, alle Getränke alkoholfrei.',
    h1: 'Römische Carbonara in der Lange Niezel',
    lead: `Unsere Carbonara machen wir mit Guanciale, Eigelb, Pecorino Romano und schwarzem Pfeffer, ohne Sahne. Reservieren musst du nicht: Komm einfach vorbei oder nimm deine Pasta mit. Vom Hauptbahnhof sind es ${f.walk.centraal} Minuten zu Fuß.`,
    pastaTitle: 'Unsere Pasta',
    pastaIntro: 'Die meisten unserer Pastagerichte kommen aus Rom. Bolognese, Pesto und Quattro Formaggi stammen aus anderen Teilen Italiens.',
    fullMenu: 'Ganze Speisekarte ansehen',
    drinksTitle: 'Getränke',
    drinksText: `Alkohol gibt es bei uns nicht. Unsere Spritz mit Aperol, Bitter und Limoncello sind alkoholfrei, genauso wie das Birra Moretti. Außerdem haben wir Limonade und Kaffee.`,
    visitTitle: 'So findest du uns',
    visitText: `Du findest uns in der ${f.street}, in der Altstadt.`,
    lemonades: (n: number) => `Limonaden, ${n} Sorten`,
    visitMore: 'Öffnungszeiten und Anfahrt',
    faqTitle: 'Fragen',
    faqMore: 'Alle Fragen',
  },

  menu: {
    title: 'Speisekarte und Preise | La Carbonara',
    description: `Unsere Pasta, Antipasti und alkoholfreien Getränke mit Preisen. Pasta von ${f.minPasta} bis ${f.maxPasta}, jede Pasta gibt es auch glutenfrei.`,
    h1: 'Speisekarte',
    lead: `Jede Pasta können wir gegen ${f.gf} Aufpreis glutenfrei zubereiten. Wenn du eine Allergie hast, sag uns bitte Bescheid, bevor du bestellst.`,
    food: 'Essen',
    drinks: 'Getränke',
    drinksNote: 'Alle unsere Getränke sind alkoholfrei.',
    featured: 'Specialità della Casa',
  },

  visit: {
    title: 'Öffnungszeiten und Anfahrt | La Carbonara',
    description: `Unsere Adresse: ${f.address}, ${f.walk.centraal} Minuten zu Fuß vom Hauptbahnhof Amsterdam. Täglich von ${f.open} bis ${f.close} Uhr geöffnet, reservieren musst du nicht.`,
    h1: 'Öffnungszeiten und Anfahrt',
    hoursTitle: 'Öffnungszeiten',
    hoursText: `Wir haben jeden Tag von ${f.open} bis ${f.close} Uhr geöffnet.`,
    addressTitle: 'Adresse',
    walkTitle: 'Fußweg',
    walk: [
      { place: 'Hauptbahnhof', min: f.walk.centraal },
      { place: 'Dam-Platz', min: f.walk.dam },
      { place: 'Nieuwmarkt', min: f.walk.nieuwmarkt },
    ],
    minutes: (n: number) => `${n} Min.`,
    comingTitle: 'Vorbeikommen oder mitnehmen',
    comingText: 'Wir nehmen keine Reservierungen an, komm also einfach vorbei, wann immer wir geöffnet haben. Deine Pasta kannst du auch mitnehmen.',
    phoneTitle: 'Telefon',
  },

  faq: {
    title: 'Fragen | La Carbonara',
    description: 'Muss man reservieren, ist Sahne in der Carbonara, gibt es glutenfreie Pasta? Unsere Antworten auf die Fragen, die Gäste uns am häufigsten stellen.',
    h1: 'Fragen, die Gäste uns stellen',
    items: [
      { q: 'Muss ich einen Tisch reservieren?', a: `Nein. Wir nehmen keine Reservierungen an, komm einfach vorbei. Wir haben jeden Tag von ${f.open} bis ${f.close} Uhr geöffnet.` },
      { q: 'Kann ich meine Pasta mitnehmen?', a: 'Ja, sag einfach bei der Bestellung Bescheid.' },
      { q: 'Ist Sahne in der Carbonara?', a: 'Nein. Wir machen sie mit Guanciale, Eigelb, Pecorino Romano und schwarzem Pfeffer, wie in Rom.' },
      { q: 'Habt ihr glutenfreie Pasta?', a: `Ja. Jede Pasta können wir gegen ${f.gf} Aufpreis glutenfrei zubereiten. Sag einfach bei der Bestellung Bescheid.` },
      { q: 'Gibt es bei euch Alkohol?', a: 'Nein. Alle unsere Getränke sind alkoholfrei (0,0 %), auch die Spritz und das Birra Moretti Zero.' },
      { q: 'Was kostet eine Pasta?', a: `Unsere Pasta kostet ${f.minPasta} bis ${f.maxPasta}. Die Carbonara kostet ${f.carbonara}.` },
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
