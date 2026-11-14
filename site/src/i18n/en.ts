// English: the source text. Every other language file mirrors these keys.
// Write as the restaurant talking to a guest ("we" to "you", full sentences);
// see VOICE.md. Use ${f.…} for facts. No em-dashes or en-dashes.
import type { Facts, Faq } from './facts';

const en = (f: Facts) => ({
  locale: 'en_GB',
  langName: 'English',
  skip: 'Skip to content',
  nav: { home: 'Home', menu: 'Menu', visit: 'Visit', faq: 'FAQ', label: 'Main' },
  status: {
    fallback: `Open every day, ${f.open} to ${f.close}`,
    open: `Open now, until ${f.close}`,
    before: `Closed now, we open at ${f.open}`,
    after: `Closed now, we open tomorrow at ${f.open}`,
  },
  actions: { menu: 'See the menu', directions: 'Directions', call: 'Call us', google: 'Google Maps', apple: 'Apple Maps' },
  facts: { open: 'Open', openValue: `Every day, ${f.open} to ${f.close}`, address: 'Address', phone: 'Phone' },
  storefrontAlt: 'The shop front of La Carbonara on the Lange Niezel.',
  storefrontCaption: `Look for the red neon sign at ${f.street}.`,
  guests: {
    title: "Photos from our guests",
    credit: (name: string) => `Photo: ${name}`,
    pomodoro: "Linguine with tomato sauce and basil.",
    ragu: "Rigatoni with a meat sauce and Parmigiano Reggiano.",
    bruschetta: "Bruschetta with stracciatella and tomato.",
  },
  photos: {
    carbonara: "Linguine carbonara with guanciale, Pecorino Romano and black pepper.",
    bruschetta: "Bruschetta Cremosa: toasted bread with stracciatella, tomatoes and basil.",
    rigatoni: "Rigatoni in tomato sauce with Parmigiano Reggiano and basil.",
  },
  footer: {
    allergy: 'Allergies or dietary needs? Please tell us before you order.',
    pages: 'Pages',
    language: 'Language',
  },

  home: {
    title: 'Roman carbonara near Amsterdam Central Station | La Carbonara',
    description: `Carbonara made the Roman way, without cream, at ${f.street} in Amsterdam. Open every day ${f.open} to ${f.close}. Walk in or take away, and every drink is alcohol-free.`,
    schema: 'Pasta restaurant in Amsterdam Centrum with Roman classics: carbonara without cream, cacio e pepe, amatriciana and gricia. No reservations, takeaway available, all drinks alcohol-free.',
    h1: 'Roman carbonara on the Lange Niezel',
    lead: `We make our carbonara with guanciale, egg yolk, Pecorino Romano and black pepper, without cream. You don't need to book: walk in, or take your pasta away. We're a ${f.walk.centraal}-minute walk from Central Station.`,
    pastaTitle: 'Our pasta',
    pastaIntro: 'Most of our pasta is Roman. The Bolognese, the pesto and the quattro formaggi come from elsewhere in Italy.',
    fullMenu: 'See the full menu',
    drinksTitle: 'Drinks',
    drinksText: `We don't serve alcohol. Our Aperol, Bitter and Limoncello spritzes are alcohol-free, and so is the Birra Moretti. We also have fizzy lemonade and coffee.`,
    visitTitle: 'Finding us',
    visitText: `We're at ${f.street}, in the old centre.`,
    lemonades: (n: number) => `Fizzy lemonades, ${n} flavours`,
    visitMore: 'Opening hours and directions',
    faqTitle: 'Questions',
    faqMore: 'All questions',
  },

  menu: {
    title: 'Menu and prices | La Carbonara',
    description: `Our pasta, antipasti and alcohol-free drinks, with prices. Pasta from ${f.minPasta} to ${f.maxPasta}; any pasta can be made gluten-free.`,
    h1: 'Menu',
    lead: `We can make any pasta gluten-free for ${f.gf} extra. If you have an allergy, please tell us before you order.`,
    food: 'Food',
    drinks: 'Drinks',
    drinksNote: 'Every drink we serve is alcohol-free.',
    featured: 'Specialità della Casa',
  },

  visit: {
    title: 'Opening hours and directions | La Carbonara',
    description: `We're at ${f.address}, a ${f.walk.centraal}-minute walk from Amsterdam Central Station. Open every day ${f.open} to ${f.close}, no reservations needed.`,
    h1: 'Opening hours and directions',
    hoursTitle: 'Opening hours',
    hoursText: `We're open every day from ${f.open} to ${f.close}.`,
    addressTitle: 'Address',
    walkTitle: 'Walking time',
    walk: [
      { place: 'Central Station', min: f.walk.centraal },
      { place: 'Dam Square', min: f.walk.dam },
      { place: 'Nieuwmarkt', min: f.walk.nieuwmarkt },
    ],
    minutes: (n: number) => `${n} min`,
    comingTitle: 'Walk in or take away',
    comingText: "We don't take reservations, so come in whenever we're open. You can also take your pasta away.",
    phoneTitle: 'Phone',
  },

  faq: {
    title: 'Questions | La Carbonara',
    description: 'Do you need to book, is there cream in the carbonara, is there gluten-free pasta? Our answers to the questions guests ask most.',
    h1: 'Questions guests ask us',
    items: [
      { q: 'Do I need to book a table?', a: `No. We don't take reservations, so just walk in. We're open every day from ${f.open} to ${f.close}.` },
      { q: 'Can I take my pasta away?', a: 'Yes, just tell us when you order.' },
      { q: 'Is there cream in the carbonara?', a: 'No. We make it with guanciale, egg yolk, Pecorino Romano and black pepper, the Roman way.' },
      { q: 'Do you have gluten-free pasta?', a: `Yes. We can make any pasta gluten-free for ${f.gf} extra. Tell us when you order.` },
      { q: 'Do you serve alcohol?', a: 'No. Every drink we serve is alcohol-free (0.0%), including our spritzes and Birra Moretti Zero.' },
      { q: 'How much does a pasta cost?', a: `Our pasta costs ${f.minPasta} to ${f.maxPasta}. The carbonara is ${f.carbonara}.` },
      { q: 'How far are you from Central Station?', a: `About a ${f.walk.centraal}-minute walk. You'll find us at ${f.address}.` },
    ] as Faq[],
  },

  notFound: {
    title: 'Page not found | La Carbonara',
    h1: 'We can’t find that page',
    text: 'This link doesn’t lead anywhere. Maybe you were looking for our menu or our opening hours?',
  },
});

export type Copy = ReturnType<typeof en>;
export default en;
