// Nederlands. Mirrors en.ts; written in the same voice (je/jij), see VOICE.md.
import type { Facts } from './facts';
import type { Copy } from './en';

const nl = (f: Facts): Copy => ({
  locale: 'nl_NL',
  langName: 'Nederlands',
  skip: 'Naar de inhoud',
  nav: { home: 'Home', menu: 'Menu', visit: 'Bezoek', faq: 'Vragen', label: 'Hoofdmenu' },
  status: {
    fallback: `Elke dag open, ${f.open} tot ${f.close}`,
    open: `Nu open, tot ${f.close}`,
    before: `Nu gesloten, we gaan om ${f.open} open`,
    after: `Nu gesloten, morgen open om ${f.open}`,
  },
  actions: { menu: 'Bekijk het menu', directions: 'Route', call: 'Bel ons', google: 'Google Maps', apple: 'Apple Kaarten' },
  facts: { open: 'Open', openValue: `Elke dag, ${f.open} tot ${f.close}`, address: 'Adres', phone: 'Telefoon' },
  storefrontAlt: 'De gevel van La Carbonara aan de Lange Niezel 7, met het rode neonbord boven het raam.',
  storefrontCaption: `Je herkent ons aan het rode neonbord op de ${f.street}.`,
  footer: {
    allergy: 'Allergie of dieetwens? Zeg het ons voordat je bestelt.',
    pages: 'Pagina’s',
    language: 'Taal',
  },

  home: {
    title: 'Romeinse carbonara bij Amsterdam Centraal | La Carbonara',
    description: `Carbonara zoals in Rome, zonder room, aan de ${f.street} in Amsterdam. Elke dag open van ${f.open} tot ${f.close}. Loop binnen of haal af, alle drankjes zijn alcoholvrij.`,
    schema: 'Pastarestaurant in Amsterdam Centrum met Romeinse klassiekers: carbonara zonder room, cacio e pepe, amatriciana en gricia. Geen reserveringen, afhalen kan, alle drankjes zijn alcoholvrij.',
    h1: 'Romeinse carbonara aan de Lange Niezel',
    lead: `Onze carbonara maken we met guanciale, eidooier, Pecorino Romano en zwarte peper, zonder room, zoals in Rome. Reserveren hoeft niet: loop gewoon binnen, of neem je pasta mee. We zijn elke dag open van ${f.open} tot ${f.close}, op ${f.walk.centraal} minuten lopen van Centraal Station.`,
    pastaTitle: 'Onze pasta',
    pastaIntro: 'De meeste gerechten zijn Romeinse klassiekers: carbonara, cacio e pepe, amatriciana en gricia. Daarnaast koken we een paar favorieten uit de rest van Italië, zoals bolognese en linguine met pesto en stracciatella.',
    fullMenu: 'Bekijk het hele menu',
    drinksTitle: 'Drankjes zonder alcohol',
    drinksText: `We schenken geen alcohol. In plaats daarvan krijg je bij ons een alcoholvrije Aperol, Bitter of Limoncello spritz voor ${f.spritz}, Birra Moretti Zero, bruisende limonades en koffie.`,
    visitTitle: 'Zo vind je ons',
    visitText: `Je vindt ons op de ${f.address}, in de oude binnenstad tussen Centraal Station, de Dam en de Nieuwmarkt.`,
    lemonades: (n: number) => `Bruisende limonade, ${n} smaken`,
    visitMore: 'Openingstijden en route',
    faqTitle: 'Vragen',
    faqMore: 'Alle vragen',
  },

  menu: {
    title: 'Menu en prijzen | La Carbonara',
    description: `Onze pasta, antipasti en alcoholvrije drankjes, met prijzen. Pasta van ${f.minPasta} tot ${f.maxPasta}; elke pasta kan glutenvrij.`,
    h1: 'Menu',
    lead: `Elke pasta kunnen we glutenvrij maken, voor ${f.gf} extra. Heb je een allergie, zeg het ons dan voordat je bestelt.`,
    food: 'Eten',
    drinks: 'Drinken',
    drinksNote: 'Al onze drankjes zijn alcoholvrij.',
    featured: 'Specialità della Casa',
  },

  visit: {
    title: 'Openingstijden en route | La Carbonara',
    description: `Je vindt ons op de ${f.address}, op ${f.walk.centraal} minuten lopen van Amsterdam Centraal. Elke dag open van ${f.open} tot ${f.close}, reserveren hoeft niet.`,
    h1: 'Openingstijden en route',
    hoursTitle: 'Openingstijden',
    hoursText: `We zijn elke dag open van ${f.open} tot ${f.close}.`,
    addressTitle: 'Adres',
    walkTitle: 'Looptijd',
    walk: [
      { place: 'Centraal Station', min: f.walk.centraal },
      { place: 'De Dam', min: f.walk.dam },
      { place: 'Nieuwmarkt', min: f.walk.nieuwmarkt },
    ],
    minutes: (n: number) => `${n} min`,
    comingTitle: 'Binnenlopen of afhalen',
    comingText: 'We nemen geen reserveringen aan, dus je kunt binnenlopen wanneer we open zijn. Eet je liever ergens anders, dan bestel je je pasta om mee te nemen.',
    phoneTitle: 'Telefoon',
  },

  faq: {
    title: 'Vragen | La Carbonara',
    description: 'Moet je reserveren, zit er room in de carbonara, hebben jullie glutenvrije pasta? Onze antwoorden op wat gasten het vaakst vragen.',
    h1: 'Vragen die gasten ons stellen',
    items: [
      { q: 'Moet ik reserveren?', a: `Nee. We nemen geen reserveringen aan, je loopt gewoon binnen. We zijn elke dag open van ${f.open} tot ${f.close}.` },
      { q: 'Kan ik pasta afhalen?', a: 'Ja, je kunt je pasta ook bestellen om mee te nemen.' },
      { q: 'Zit er room in de carbonara?', a: 'Nee. We maken hem met guanciale, eidooier, Pecorino Romano en zwarte peper, zoals in Rome.' },
      { q: 'Hebben jullie glutenvrije pasta?', a: `Ja. Elke pasta kunnen we glutenvrij maken, voor ${f.gf} extra. Zeg het als je bestelt.` },
      { q: 'Schenken jullie alcohol?', a: 'Nee. Al onze drankjes zijn alcoholvrij (0,0%), ook de spritzen en de Birra Moretti Zero.' },
      { q: 'Wat kost een pasta?', a: `Onze pasta kost tussen ${f.minPasta} en ${f.maxPasta}. La Carbonara kost ${f.carbonara}.` },
      { q: 'Hoe ver is het van Centraal Station?', a: `Ongeveer ${f.walk.centraal} minuten lopen. Je vindt ons op de ${f.address}.` },
    ],
  },

  notFound: {
    title: 'Pagina niet gevonden | La Carbonara',
    h1: 'Deze pagina bestaat niet',
    text: 'Deze link leidt nergens heen. Zocht je misschien ons menu of de openingstijden?',
  },
});

export default nl;
