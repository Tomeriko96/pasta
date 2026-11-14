// Nederlands. Mirrors en.ts; written in the same voice (je/jij), see VOICE.md.
import type { Facts } from './facts';
import type { Copy } from './en';

const nl = (f: Facts): Copy => ({
  locale: 'nl_NL',
  langName: 'Nederlands',
  skip: 'Naar de inhoud',
  nav: { home: 'Home', menu: 'Menu', visit: 'Route', faq: 'Vragen', label: 'Hoofdmenu' },
  status: {
    fallback: `Elke dag open, ${f.open} tot ${f.close}`,
    open: `Nu open, tot ${f.close}`,
    before: `Nu dicht, we gaan om ${f.open} open`,
    after: `Nu dicht, morgen open vanaf ${f.open}`,
  },
  actions: { menu: 'Bekijk het menu', directions: 'Route', call: 'Bel ons', google: 'Google Maps', apple: 'Apple Kaarten' },
  facts: { open: 'Open', openValue: `Elke dag, ${f.open} tot ${f.close}`, address: 'Adres', phone: 'Telefoon' },
  storefrontAlt: 'De gevel van La Carbonara op de Lange Niezel.',
  storefrontCaption: `Je herkent ons aan het rode neonbord op de ${f.street}.`,
  photos: {
    carbonara: "Carbonara met guanciale, Pecorino Romano en zwarte peper.",
    bruschetta: "Bruschetta Cremosa: geroosterd brood met stracciatella, tomaat en basilicum.",
    rigatoni: "Rigatoni in tomatensaus met Parmigiano Reggiano en basilicum.",
  },
  footer: {
    allergy: 'Allergie of dieetwens? Laat het ons weten voordat je bestelt.',
    pages: 'Pagina’s',
    language: 'Taal',
  },

  home: {
    title: 'Romeinse carbonara bij Amsterdam Centraal | La Carbonara',
    description: `Carbonara zoals in Rome, zonder room, op de ${f.street} in Amsterdam. Elke dag open van ${f.open} tot ${f.close}. Je kunt zo binnenlopen of afhalen. Alle drankjes zijn alcoholvrij.`,
    schema: 'Pastarestaurant in Amsterdam Centrum met Romeinse klassiekers: carbonara zonder room, cacio e pepe, amatriciana en gricia. Geen reserveringen, afhalen kan, alle drankjes zijn alcoholvrij.',
    h1: 'Romeinse carbonara op de Lange Niezel',
    lead: `Onze carbonara maken we met guanciale, eidooier, Pecorino Romano en zwarte peper, zonder room. Reserveren hoeft niet: loop gewoon binnen, of neem je pasta mee. We zitten op ${f.walk.centraal} minuten lopen van het Centraal Station.`,
    pastaTitle: 'Onze pasta',
    pastaIntro: 'De meeste pasta’s zijn Romeins. De bolognese, de pesto en de quattro formaggi komen uit de rest van Italië.',
    fullMenu: 'Bekijk het hele menu',
    drinksTitle: 'Drinken',
    drinksText: `We schenken geen alcohol. Onze Aperol-, Bitter- en Limoncellospritz zijn alcoholvrij, net als de Birra Moretti. Verder hebben we limonade met prik en koffie.`,
    visitTitle: 'Zo vind je ons',
    visitText: `Je vindt ons op de ${f.street}, in de oude binnenstad.`,
    lemonades: (n: number) => `Limonade met prik, ${n} smaken`,
    visitMore: 'Openingstijden en route',
    faqTitle: 'Vragen',
    faqMore: 'Alle vragen',
  },

  menu: {
    title: 'Menu en prijzen | La Carbonara',
    description: `Onze pasta, antipasti en alcoholvrije drankjes, met prijzen. Pasta van ${f.minPasta} tot ${f.maxPasta}; elke pasta kan glutenvrij.`,
    h1: 'Menu',
    lead: `Elke pasta kunnen we glutenvrij maken, voor ${f.gf} extra. Heb je een allergie, laat het ons dan weten voordat je bestelt.`,
    food: 'Eten',
    drinks: 'Drinken',
    drinksNote: 'Al onze drankjes zijn alcoholvrij.',
    featured: 'Specialità della Casa',
  },

  visit: {
    title: 'Openingstijden en route | La Carbonara',
    description: `Je vindt ons op de ${f.street} in Amsterdam, op ${f.walk.centraal} minuten lopen van het Centraal Station. Elke dag open van ${f.open} tot ${f.close}, reserveren hoeft niet.`,
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
    comingText: 'We werken niet met reserveringen, dus je loopt gewoon binnen als we open zijn. Je pasta meenemen kan ook.',
    phoneTitle: 'Telefoon',
  },

  faq: {
    title: 'Vragen | La Carbonara',
    description: 'Moet je reserveren, zit er room in de carbonara, hebben jullie glutenvrije pasta? Onze antwoorden op wat gasten het vaakst vragen.',
    h1: 'Vragen die gasten ons stellen',
    items: [
      { q: 'Moet ik reserveren?', a: `Nee. We nemen geen reserveringen aan, je loopt gewoon binnen. We zijn elke dag open van ${f.open} tot ${f.close}.` },
      { q: 'Kan ik pasta afhalen?', a: 'Ja, zeg het even als je bestelt.' },
      { q: 'Zit er room in de carbonara?', a: 'Nee. We maken hem met guanciale, eidooier, Pecorino Romano en zwarte peper, zoals in Rome.' },
      { q: 'Hebben jullie glutenvrije pasta?', a: `Ja. Elke pasta kunnen we glutenvrij maken, voor ${f.gf} extra. Zeg het als je bestelt.` },
      { q: 'Schenken jullie alcohol?', a: 'Nee. Al onze drankjes zijn alcoholvrij (0,0%), ook de spritzen en de Birra Moretti Zero.' },
      { q: 'Wat kost een pasta?', a: `Onze pasta kost ${f.minPasta} tot ${f.maxPasta}. De carbonara kost ${f.carbonara}.` },
      { q: 'Hoe ver is het lopen vanaf het Centraal Station?', a: `Ongeveer ${f.walk.centraal} minuten. Je vindt ons op de ${f.address}.` },
    ],
  },

  notFound: {
    title: 'Pagina niet gevonden | La Carbonara',
    h1: 'Deze pagina bestaat niet',
    text: 'Deze link leidt nergens heen. Zocht je misschien ons menu of de openingstijden?',
  },
});

export default nl;
