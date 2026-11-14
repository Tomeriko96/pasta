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
  actions: { label: "Snel naar", menu: 'Bekijk het menu', directions: 'Routebeschrijving', call: 'Bel ons', google: 'Google Maps', apple: 'Apple Kaarten' },
  facts: { open: 'Open', openValue: `Elke dag, ${f.open} tot ${f.close}`, address: 'Adres', phone: 'Telefoon' },
  storefrontAlt: 'De gevel van La Carbonara op de Lange Niezel.',
  storefrontCaption: 'Je herkent ons aan het rode neonbord.',
  guests: {
    title: "Foto’s van onze gasten",
    credit: (name: string) => `Foto: ${name}`,
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
    allergy: 'Allergie of dieetwens? Laat het ons weten voordat je bestelt.',
    pages: 'Pagina’s',
    language: 'Taal',
  },

  home: {
    title: 'Romeinse carbonara bij Amsterdam Centraal | La Carbonara',
    description: `Romeinse carbonara zonder room op de Lange Niezel in Amsterdam. Elke dag open van ${f.open} tot ${f.close}. Reserveren kan niet, afhalen wel.`,
    schema: 'Pastarestaurant in het centrum van Amsterdam met Romeinse klassiekers: carbonara zonder room, Cacio e Pepe, Amatriciana en Gricia. Reserveren kan niet, je loopt gewoon binnen. Afhalen kan ook en alle drankjes zijn alcoholvrij.',
    h1: 'Romeinse carbonara op de Lange Niezel',
    lead: `Onze carbonara maken we met guanciale, eidooier, Pecorino Romano en zwarte peper, zonder room. Reserveren kan niet, dus loop gewoon binnen of neem je pasta mee.`,
    pastaTitle: 'Onze pasta',
    pastaIntro: 'De meeste pasta’s zijn Romeins. De Bolognese, de Linguine al Pesto en de Quattro Formaggi komen uit andere streken van Italië.',
    fullMenu: 'Bekijk het hele menu',
    drinksTitle: 'Drinken',
    drinksText: `We schenken geen alcohol. De spritzen en de Birra Moretti Zero zijn 0,0%, en verder hebben we limonade met prik en koffie.`,
    visitTitle: 'Route',
    visitText: 'We zitten op de Lange Niezel, in de oude binnenstad.',
    lemonades: (n: number) => `Limonade met prik, ${n} smaken`,
    visitMore: 'Openingstijden en route',
    faqTitle: 'Vragen',
    faqMore: 'Alle vragen',
  },

  menu: {
    title: 'Menu en prijzen | La Carbonara Amsterdam',
    description: `Romeinse pasta van ${f.minPasta} tot ${f.maxPasta} bij Amsterdam Centraal. De carbonara kost ${f.carbonara} en elke pasta kunnen we ook glutenvrij maken.`,
    h1: 'Menu',
    lead: `Elke pasta kunnen we glutenvrij maken, voor ${f.gf} extra.`,
    food: 'Eten',
    drinks: 'Drinken',
    drinksNote: 'Al onze drankjes zijn alcoholvrij.',
    featured: 'Specialità della casa',
  },

  visit: {
    title: 'Openingstijden en route | La Carbonara Amsterdam',
    description: `We zitten op de Lange Niezel in Amsterdam, op ${f.walk.centraal} minuten lopen van het Centraal Station. Elke dag open van ${f.open} tot ${f.close}, reserveren kan niet.`,
    h1: 'Openingstijden en route',
    hoursTitle: 'Openingstijden',
    hoursText: `We zijn elke dag open van ${f.open} tot ${f.close}.`,
    addressTitle: 'Adres',
    walkTitle: 'Lopen vanaf',
    walk: [
      { place: 'Centraal Station', min: f.walk.centraal },
      { place: 'De Dam', min: f.walk.dam },
      { place: 'Nieuwmarkt', min: f.walk.nieuwmarkt },
    ],
    minutes: (n: number) => `${n} min`,
    comingTitle: 'Binnenlopen of afhalen',
    comingText: 'We werken niet met reserveringen, je loopt gewoon binnen. Afhalen kan ook.',
    phoneTitle: 'Telefoon',
  },

  faq: {
    title: 'Veelgestelde vragen | La Carbonara Amsterdam',
    description: `Reserveren kan niet en in onze carbonara zit geen room. Elke pasta kunnen we glutenvrij maken voor ${f.gf} extra, en afhalen kan ook.`,
    h1: 'Veelgestelde vragen',
    items: [
      { q: 'Moet ik reserveren?', a: 'Nee. Reserveren kan niet, dus loop gewoon binnen.' },
      { q: 'Kan ik pasta afhalen?', a: 'Ja, zeg het even als je bestelt.' },
      { q: 'Zit er room in de carbonara?', a: 'Nee. We maken hem met guanciale, eidooier, Pecorino Romano en zwarte peper, zoals in Rome.' },
      { q: 'Hebben jullie glutenvrije pasta?', a: `Ja. Elke pasta kunnen we glutenvrij maken, voor ${f.gf} extra. Zeg het als je bestelt.` },
      { q: 'Schenken jullie alcohol?', a: 'Nee. Al onze drankjes zijn alcoholvrij (0,0%), ook de spritzen en de Birra Moretti Zero.' },
      { q: 'Wat kost een pasta?', a: `Een pasta kost bij ons ${f.minPasta} tot ${f.maxPasta}, de carbonara ${f.carbonara}.` },
      { q: 'Hoe ver is het lopen vanaf het Centraal Station?', a: `Ongeveer ${f.walk.centraal} minuten lopen. Ons adres is ${f.address}.` },
    ],
  },

  notFound: {
    title: 'Pagina niet gevonden | La Carbonara',
    h1: 'Deze pagina bestaat niet',
    text: 'Deze link leidt nergens heen. Zocht je misschien ons menu of de openingstijden?',
  },
});

export default nl;
