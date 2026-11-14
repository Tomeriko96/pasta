// All page text per language. Facts (prices, hours, address) come from
// src/data/*.json so the copy never goes stale. No em-dashes or en-dashes.
import { restaurant as r, sections, findItem, formatPrice, type Lang } from '../lib/site';

const pasta = sections.find((s) => s.id === 'pasta')!.items.map((i) => i.price);
const spritzCount = sections.find((s) => s.id === 'spritz')!.items.length;
const hours = `${r.hours.opens}`;
const closes = `${r.hours.closes}`;
const address = `${r.address.street}, ${r.address.postalCode} ${r.address.city}`;

const numberWord = {
  en: ['zero', 'one', 'two', 'three', 'four', 'five', 'six'],
  nl: ['nul', 'een', 'twee', 'drie', 'vier', 'vijf', 'zes'],
};

export function copy(lang: Lang) {
  const p = (v: number) => formatPrice(v, lang);
  const gf = p(r.glutenFreeSurcharge);
  const carbonara = p(findItem('La Carbonara').price);
  const minPasta = p(Math.min(...pasta));
  const maxPasta = p(Math.max(...pasta));
  const spritzes = numberWord[lang][spritzCount] ?? String(spritzCount);

  if (lang === 'nl') {
    return {
      locale: 'nl_NL',
      title: 'La Carbonara | Romeinse pasta in Amsterdam',
      description: `La Carbonara, Romeinse pasta aan de ${r.address.street} midden in Amsterdam. Reserveren is niet nodig, alle drankjes zijn alcoholvrij.`,
      schemaDescription: 'Romeinse trattoria midden in Amsterdam. Klassiekers als carbonara, cacio e pepe, amatriciana en gricia. Geen reserveringen, alle drankjes zijn alcoholvrij.',
      skip: 'Naar de inhoud',
      nav: { about: 'Pasta', menu: 'Menu', visit: 'Bezoek', switchLabel: 'English', switchShort: 'EN' },
      eyebrow: 'Romeinse trattoria',
      tagline: `Romeinse pasta aan de ${r.address.street}, midden in Amsterdam. Reserveren is niet nodig, loop gewoon binnen.`,
      directions: 'Route',
      viewMenu: 'Bekijk het menu',
      alcoholFree: 'Alle drankjes zijn alcoholvrij (0,0%).',
      aboutTitle: 'Onze pasta',
      about: [
        'Romeinse klassiekers met guanciale en Pecorino Romano. Het menu draait om carbonara, cacio e pepe, amatriciana en gricia, met daarnaast een paar andere Italiaanse favorieten.',
        'Onze carbonara is linguine met guanciale, eidooier, Pecorino Romano en zwarte peper. Zonder room.',
        `Elke pasta kan glutenvrij, voor ${gf} extra. Zeg het gewoon bij het bestellen.`,
      ],
      menuTitle: 'Menu',
      featured: 'Specialità della Casa',
      faqTitle: 'Goed om te weten',
      faqs: [
        { q: 'Moet ik reserveren?', a: `Nee. We nemen geen reserveringen aan, je loopt gewoon binnen. We zijn elke dag open van ${hours} tot ${closes}.` },
        { q: 'Zit er room in de carbonara?', a: 'Nee. Onze carbonara is linguine met guanciale, eidooier, Pecorino Romano en zwarte peper. Zonder room.' },
        { q: 'Hebben jullie glutenvrije pasta?', a: `Ja. Elke pasta kan glutenvrij, voor ${gf} extra. Zeg het bij het bestellen.` },
        { q: 'Schenken jullie alcohol?', a: `Nee. Al onze drankjes zijn alcoholvrij (0,0%), ook de Birra Moretti Zero en de ${spritzes} spritzen.` },
        { q: 'Wat kost een pasta?', a: `Onze pasta's kosten ${minPasta} tot ${maxPasta}. La Carbonara kost ${carbonara}.` },
        { q: 'Waar zitten jullie en wanneer zijn jullie open?', a: `${address}, in het centrum. We zijn elke dag open van ${hours} tot ${closes}.` },
      ],
      visitTitle: 'Bezoek ons',
      openDaily: `Elke dag open, ${hours} tot ${closes}`,
      noReservations: 'Reserveren kan niet. Loop gewoon binnen.',
      footerNoReservations: 'Geen reserveringen',
    };
  }

  return {
    locale: 'en_GB',
    title: 'La Carbonara | Roman pasta in Amsterdam',
    description: `La Carbonara, Roman pasta at ${r.address.street} in the heart of Amsterdam. No reservations, all drinks alcohol-free.`,
    schemaDescription: 'Roman trattoria in the heart of Amsterdam. Classics like carbonara, cacio e pepe, amatriciana and gricia. No reservations, all drinks are alcohol-free.',
    skip: 'Skip to content',
    nav: { about: 'Pasta', menu: 'Menu', visit: 'Visit', switchLabel: 'Nederlands', switchShort: 'NL' },
    eyebrow: 'Roman trattoria',
    tagline: `Roman pasta at ${r.address.street}, in the heart of Amsterdam. No reservations, just come.`,
    directions: 'Get Directions',
    viewMenu: 'View Menu',
    alcoholFree: 'All drinks are alcohol-free (0.0%).',
    aboutTitle: 'Our pasta',
    about: [
      'Roman classics made with guanciale and Pecorino Romano. The menu is built around carbonara, cacio e pepe, amatriciana and gricia, with a few other Italian favourites alongside.',
      'Our carbonara is linguine with guanciale, egg yolk, Pecorino Romano and black pepper. No cream.',
      `Any pasta can be made gluten-free for ${gf} extra. Just tell us when you order.`,
    ],
    menuTitle: 'Menu',
    featured: 'Specialità della Casa',
    faqTitle: 'Good to know',
    faqs: [
      { q: 'Do I need a reservation?', a: `No. We do not take reservations, just walk in. We are open every day from ${hours} to ${closes}.` },
      { q: 'Is the carbonara made with cream?', a: 'No. Our carbonara is linguine with guanciale, egg yolk, Pecorino Romano and black pepper. No cream.' },
      { q: 'Do you have gluten-free pasta?', a: `Yes. Any pasta can be made gluten-free for ${gf} extra. Tell us when you order.` },
      { q: 'Do you serve alcohol?', a: `No. All our drinks are alcohol-free (0.0%), including Birra Moretti Zero and our ${spritzes} spritzes.` },
      { q: 'How much does a pasta cost?', a: `Our pasta dishes cost ${minPasta} to ${maxPasta}. La Carbonara is ${carbonara}.` },
      { q: 'Where are you and when are you open?', a: `${address}, in the city centre. We are open every day from ${hours} to ${closes}.` },
    ],
    visitTitle: 'Visit Us',
    openDaily: `Open daily, ${hours} to ${closes}`,
    noReservations: 'No reservations. Just come.',
    footerNoReservations: 'No reservations',
  };
}
