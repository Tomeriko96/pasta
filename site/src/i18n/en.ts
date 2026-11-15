// English: the source text. Every other language file mirrors these keys.
// Write as the restaurant talking to a guest ("we" to "you", full sentences);
// see VOICE.md. Use ${f.…} for facts. No em-dashes or en-dashes.
import type { Facts, Faq } from './facts';

const en = (f: Facts) => ({
  locale: 'en_GB',
  langName: 'English',
  skip: 'Skip to content',
  nav: { language: "Language", home: 'Home', menu: 'Menu', visit: 'Find us', faq: 'FAQ', label: 'Main' },
  status: {
    fallback: `Open every day, ${f.open} to ${f.close}`,
    open: `Open now until ${f.close}`,
    before: `Closed now. We open at ${f.open}`,
    after: `Closed now. We open tomorrow at ${f.open}`,
  },
  actions: { label: "Quick links", menu: 'See the menu', directions: 'Directions', call: 'Call us', google: 'Google Maps', apple: 'Apple Maps' },
  facts: { open: 'Open', openValue: `Every day, ${f.open} to ${f.close}`, address: 'Address', phone: 'Phone' },
  storefrontAlt: 'The shop front of La Carbonara on Lange Niezel.',
  storefrontCaption: 'Look for the red neon sign.',
  guests: {
    title: "Photos from our guests",
    pomodoro: "Linguine with tomato sauce and basil.",
    ragu: "Bolognese: rigatoni with Bolognese sauce and Parmigiano Reggiano.",
    bruschetta: "Bruschetta Cremosa with stracciatella and tomato.",
  },
  photos: {
    carbonara: "Linguine carbonara with guanciale, Pecorino Romano and black pepper.",
    bruschetta: "Bruschetta Cremosa: toasted bread with stracciatella, tomatoes and basil.",
    rigatoni: "Pomodoro: rigatoni with tomato sauce, Parmigiano Reggiano and basil.",
  },
  footer: {
    allergy: 'Allergies or dietary needs? Please tell us before you order.',
    pages: 'Pages',
    language: 'Language',
  },

  home: {
    title: 'Roman carbonara near Amsterdam Central Station | La Carbonara',
    description: `Roman carbonara without cream at ${f.street}, Amsterdam. Open every day ${f.open} to ${f.close}, walk-ins and takeaway, every drink alcohol-free.`,
    schema: 'Pasta restaurant in central Amsterdam with Roman classics: carbonara without cream, Cacio e Pepe, Amatriciana and Gricia. Walk-ins only, takeaway available, every drink alcohol-free.',
    h1: 'Roman carbonara on Lange Niezel',
    lead: `We make our carbonara with guanciale, egg yolk, Pecorino Romano and black pepper, without cream. We don't take bookings, so just walk in, or take your pasta away.`,
    pastaTitle: 'Our pasta',
    pastaIntro: 'Most of our pasta is Roman. The Bolognese, the Linguine al Pesto and the Quattro Formaggi come from elsewhere in Italy.',
    fullMenu: 'See the full menu',
    drinksTitle: 'Drinks',
    drinksText: `We don't serve alcohol. The spritzes and the Birra Moretti Zero are 0.0%, and we also have fizzy lemonades and coffee.`,
    visitTitle: 'Find us',
    visitText: `We're at ${f.street}, in the old centre.`,
    lemonades: (n: number) => `Fizzy lemonades, ${n} flavours`,
    visitMore: 'Opening hours and directions',
    faqTitle: 'Questions',
    faqMore: 'All questions',
  },

  menu: {
    title: 'Menu and prices | La Carbonara Amsterdam',
    description: `Roman pasta from ${f.minPasta} to ${f.maxPasta} near Amsterdam Central Station. The carbonara is ${f.carbonara}, and any pasta can be made gluten-free.`,
    h1: 'Menu',
    lead: `We can make any pasta gluten-free for ${f.gf} extra.`,
    food: 'Food',
    drinks: 'Drinks',
    drinksNote: 'Every drink we serve is alcohol-free.',
    featured: 'Specialità della casa',
  },

  visit: {
    title: 'Opening hours and directions | La Carbonara Amsterdam',
    description: `We're at ${f.street} in Amsterdam, a ${f.walk.centraal}-minute walk from Central Station. Open every day ${f.open} to ${f.close}, walk-ins only.`,
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
    title: 'Questions | La Carbonara Amsterdam',
    description: "We don't take reservations and there's no cream in our carbonara. Answers on gluten-free pasta, takeaway, prices and the walk from Central Station.",
    h1: 'Questions guests ask us',
    items: [
      { q: 'Do I need to book a table?', a: "No. We don't take reservations, so just walk in." },
      { q: 'Can I take my pasta away?', a: 'Yes, just tell us when you order.' },
      { q: 'Is there cream in the carbonara?', a: 'No. We make it with guanciale, egg yolk, Pecorino Romano and black pepper, the Roman way.' },
      { q: 'Do you have gluten-free pasta?', a: `Yes. We can make any pasta gluten-free for ${f.gf} extra. Tell us when you order.` },
      { q: 'Do you serve alcohol?', a: 'No. Every drink we serve is alcohol-free (0.0%), including our spritzes and Birra Moretti Zero.' },
      { q: 'How much is the pasta?', a: `Our pasta dishes cost ${f.minPasta} to ${f.maxPasta}, and the carbonara is ${f.carbonara}.` },
      { q: 'How far are you from Central Station?', a: `About a ${f.walk.centraal}-minute walk. You'll find us at ${f.address}.` },
    ] as Faq[],
  },

  notFound: {
    title: 'Page not found | La Carbonara',
    h1: "We can't find that page",
    text: "This link doesn't lead anywhere. Maybe you were looking for our menu or our opening hours?",
  },
});

export type Copy = ReturnType<typeof en>;
export default en;
