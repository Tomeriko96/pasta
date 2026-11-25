// Nederlands. Mirrors en.ts; written in the same voice (je/jij), see VOICE.md.
import type { Facts } from './facts';
import type { Copy } from './en';

const nl = (f: Facts): Copy => ({
  locale: 'nl_NL',
  langName: 'Nederlands',
  skip: 'Naar de inhoud',
  nav: { language: "Taal", home: 'Home', menu: 'Menu', visit: 'Route', faq: 'Vragen', label: 'Hoofdnavigatie' },
  status: {
    fallback: `Elke dag open, ${f.open} tot ${f.close}`,
    open: `Nu open tot ${f.close}`,
    before: `Nu dicht. We gaan om ${f.open} open`,
    after: `Nu dicht. We gaan morgen om ${f.open} open`,
  },
  actions: { label: "Snel naar", menu: 'Het menu', directions: 'De route', call: 'Bellen', google: 'Google Maps', apple: 'Apple Kaarten' },
  facts: { open: 'Open', openValue: `Elke dag, ${f.open} tot ${f.close}`, address: 'Adres', phone: 'Telefoon' },
  storefrontAlt: 'De gevel van La Carbonara op de Lange Niezel.',
  storefrontCaption: 'Je herkent ons aan het rode neonbord.',
  guests: {
    title: "Foto’s van onze gasten",
    pomodoro: "Linguine met tomatensaus en basilicum.",
    ragu: "Rigatoni Bolognese met Parmigiano Reggiano.",
    bruschetta: "Bruschetta Cremosa met stracciatella en tomaat.",
  },
  photos: {
    carbonara: "Linguine carbonara met guanciale, Pecorino Romano en zwarte peper.",
    bruschetta: "Bruschetta Cremosa: geroosterd brood met stracciatella, tomaat en basilicum.",
    rigatoni: "Pomodoro: rigatoni met tomatensaus, Parmigiano Reggiano en basilicum.",
  },
  footer: {
    allergy: 'Allergie of dieetwens? Zeg het voordat je bestelt.',
    pages: 'Pagina’s',
    language: 'Taal',
  },

  home: {
    title: 'Romeinse carbonara zonder room | La Carbonara Amsterdam',
    description: `Carbonara met guanciale, eidooier en Pecorino Romano, zonder room. Elke dag open van ${f.open} tot ${f.close}, zonder reservering. Afhalen kan ook.`,
    schema: 'Pastarestaurant in Amsterdam met Romeinse klassiekers: carbonara zonder room, Cacio e Pepe, Amatriciana en Gricia. Je loopt zo binnen, afhalen kan ook en alle drankjes zijn alcoholvrij.',
    h1: 'Carbonara zoals ze die in Rome maken',
    lead: `Guanciale, eidooier, Pecorino Romano en zwarte peper. Room zit er niet in. Je loopt zo binnen, of je neemt je pasta mee.`,
    pastaTitle: 'Onze pasta',
    pastaIntro: 'De meeste pasta’s zijn Romeins. Bolognese, pesto en quattro formaggi komen uit andere streken van Italië.',
    fullMenu: 'Het hele menu',
    drinksTitle: 'Drinken',
    drinksText: `Bij ons is 0,0 een keuze, geen gemis: spritzen en Birra Moretti Zero, limonade met prik en koffie.`,
    visitTitle: 'Je vindt ons hier',
    visitText: 'We zitten aan de Lange Niezel, in de oude binnenstad.',
    lemonades: (n: number) => `Limonade met prik, ${n} smaken`,
    visitMore: 'Openingstijden en route',
    faqTitle: 'Vragen',
    faqMore: 'Alle vragen',
  },

  menu: {
    title: 'Menu en prijzen | La Carbonara Amsterdam',
    description: `Romeinse pasta van ${f.minPasta} tot ${f.maxPasta}. De carbonara kost ${f.carbonara} en elke pasta kan glutenvrij.`,
    h1: 'Menu',
    lead: `Elke pasta kunnen we glutenvrij maken, voor ${f.gf} extra.`,
    food: 'Eten',
    drinks: 'Drinken',
    drinksNote: 'Al onze drankjes zijn alcoholvrij.',
    featured: 'Specialità della casa',
  },

  visit: {
    title: 'Openingstijden en route | La Carbonara Amsterdam',
    description: `Elke dag open van ${f.open} tot ${f.close}, aan de Lange Niezel in Amsterdam. Je hoeft niet te reserveren en afhalen kan ook.`,
    h1: 'Openingstijden en route',
    hoursTitle: 'Openingstijden',
    hoursText: `We zijn elke dag open van ${f.open} tot ${f.close}.`,
    addressTitle: 'Adres',
    walkTitle: '',
    walk: [],
    minutes: (n: number) => `ca. ${n} min`,
    comingTitle: 'Zo werkt het',
    comingText: 'Je loopt zo binnen, een tafel reserveren hoeft niet. Je pasta meenemen kan ook. Alles wat we schenken is alcoholvrij.',
    phoneTitle: 'Telefoon',
    deliveryTitle: 'Bezorgen',
    deliveryText: 'Bezorgen doen we via Uber Eats. Je bestelt en betaalt daar, en Uber Eats bepaalt de bezorgkosten.',
    deliveryLink: 'Bestel via Uber Eats',
  },

  faq: {
    title: 'Veelgestelde vragen | La Carbonara Amsterdam',
    description: `Reserveren hoeft niet en in onze carbonara zit geen room. Elke pasta kan glutenvrij voor ${f.gf} extra, en meenemen kan ook.`,
    h1: 'Veelgestelde vragen',
    items: [
      { q: 'Moet ik reserveren?', a: 'Nee, je loopt zo binnen.' },
      { q: 'Kan ik pasta meenemen?', a: 'Ja, laat het weten als je bestelt.' },
      { q: 'Zit er room in de carbonara?', a: 'Nee. We maken hem met guanciale, eidooier, Pecorino Romano en zwarte peper, zoals ze in Rome doen.' },
      { q: 'Hebben jullie glutenvrije pasta?', a: `Ja. Elke pasta kunnen we glutenvrij maken, voor ${f.gf} extra. Laat het weten als je bestelt.` },
      { q: 'Schenken jullie alcohol?', a: 'Nee, alles is 0,0%: ook de spritzen en de Birra Moretti Zero.' },
      { q: 'Wat kost een pasta?', a: `Een pasta kost bij ons ${f.minPasta} tot ${f.maxPasta}, de carbonara ${f.carbonara}.` },
      { q: 'Waar zitten jullie?', a: `Op ${f.address}.` },
    ],
  },

  notFound: {
    title: 'Pagina niet gevonden | La Carbonara',
    h1: 'Deze pagina bestaat niet',
    text: 'Deze link leidt nergens heen. Zoek je ons menu of de openingstijden?',
  },
});

export default nl;
