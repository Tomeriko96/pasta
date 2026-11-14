import restaurant from '../data/restaurant.json';
import menu from '../data/menu.json';

export { restaurant, menu };

export const LANGS = ['en', 'nl'] as const;
export type Lang = (typeof LANGS)[number];

export const ORIGIN = restaurant.origin;

/** Path of the home page per language. */
export const homePath: Record<Lang, string> = { en: '/', nl: '/nl/' };
export const canonical = (lang: Lang) => ORIGIN + homePath[lang];

export type MenuItem = {
  name: string;
  name_nl?: string;
  price: number;
  featured?: boolean;
  desc?: { en: string; nl: string };
};
export type MenuSection = { id: string; title: { en: string; nl: string }; items: MenuItem[] };

export const sections = menu.sections as MenuSection[];

export const itemName = (item: MenuItem, lang: Lang) => (lang === 'nl' && item.name_nl) || item.name;

/** €19.00 in English, €19,00 in Dutch. */
export function formatPrice(value: number, lang: Lang) {
  const n = value.toFixed(2);
  return `€${lang === 'nl' ? n.replace('.', ',') : n}`;
}

export function findItem(name: string): MenuItem {
  for (const s of sections) {
    const hit = s.items.find((i) => i.name === name);
    if (hit) return hit;
  }
  throw new Error(`Menu item not found: ${name}`);
}

export function restaurantSchema(lang: Lang, description: string) {
  const r = restaurant;
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${ORIGIN}/#restaurant`,
    name: r.name,
    description,
    url: canonical(lang),
    servesCuisine: r.cuisine,
    priceRange: r.priceRange,
    acceptsReservations: r.reservations,
    hasMenu: `${canonical(lang)}#menu`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: r.address.street,
      addressLocality: r.address.city,
      postalCode: r.address.postalCode,
      addressRegion: r.address.region,
      addressCountry: r.address.country,
    },
    ...(r.geo ? { geo: { '@type': 'GeoCoordinates', latitude: (r.geo as any).lat, longitude: (r.geo as any).lng } } : {}),
    telephone: r.phone.tel,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: r.hours.days,
      opens: r.hours.opens,
      closes: r.hours.closes,
    },
    hasMap: r.maps.place,
    ...(r.sameAs.length ? { sameAs: r.sameAs } : {}),
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Alcohol-free drinks', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Gluten-free pasta available', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Walk-ins only', value: true },
    ],
  };
}

export function faqSchema(lang: Lang, faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${canonical(lang)}#faq`,
    inLanguage: lang,
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}
