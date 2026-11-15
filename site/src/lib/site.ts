import restaurant from '../data/restaurant.json';
import menu from '../data/menu.json';
import menuNl from '../i18n/menu-nl.json';
import menuIt from '../i18n/menu-it.json';
import menuDe from '../i18n/menu-de.json';
import menuFr from '../i18n/menu-fr.json';
import menuEs from '../i18n/menu-es.json';

export { restaurant };

// English is the source and lives at the root; the others under /<code>/.
export const LANGS = ['en', 'nl', 'it', 'de', 'fr', 'es'] as const;
export type Lang = (typeof LANGS)[number];

export const ORIGIN = restaurant.origin;

/** URL per page and language. Slugs are in the page's own language. Every
 * page is built as <slug>/index.html, so these URLs work on any static server. */
export const routes = {
  home: { en: '/', nl: '/nl/', it: '/it/', de: '/de/', fr: '/fr/', es: '/es/' },
  menu: { en: '/menu/', nl: '/nl/menu/', it: '/it/menu/', de: '/de/speisekarte/', fr: '/fr/carte/', es: '/es/carta/' },
  visit: { en: '/visit/', nl: '/nl/route/', it: '/it/dove-siamo/', de: '/de/anfahrt/', fr: '/fr/acces/', es: '/es/como-llegar/' },
  faq: { en: '/faq/', nl: '/nl/faq/', it: '/it/domande/', de: '/de/fragen/', fr: '/fr/questions/', es: '/es/preguntas/' },
} as const satisfies Record<string, Record<Lang, string>>;
export type RouteKey = keyof typeof routes;

export const canonical = (route: RouteKey, lang: Lang) => ORIGIN + routes[route][lang];

export type MenuItem = { name: string; price: number; featured?: boolean; desc?: string };
export type MenuSection = { id: string; title: string; items: MenuItem[] };

export const sections = menu.sections as MenuSection[];
export const section = (id: string) => sections.find((s) => s.id === id)!;

// Menu translations, keyed by the English text. Descriptions and section
// titles must be translated (the build fails otherwise); dish names fall back
// to the original, so Italian names stay as they are.
const MENU_I18N: Record<Exclude<Lang, 'en'>, Record<string, string>> = {
  nl: menuNl, it: menuIt, de: menuDe, fr: menuFr, es: menuEs,
};
function tr(text: string, lang: Lang, required: boolean) {
  if (lang === 'en') return text;
  const hit = MENU_I18N[lang][text];
  if (hit) return hit;
  if (required) throw new Error(`Missing ${lang} menu translation for: "${text}" (add it to src/i18n/menu-${lang}.json)`);
  return text;
}
export const itemName = (item: MenuItem, lang: Lang) => tr(item.name, lang, false);
export const itemDesc = (item: MenuItem, lang: Lang) => (item.desc ? tr(item.desc, lang, true) : undefined);
// A section title may need its own translation when it equals an item name
// ("Coffee" the section vs "Coffee" the drink): use the key "section:<id>".
export const sectionTitle = (s: MenuSection, lang: Lang) =>
  (lang !== 'en' && MENU_I18N[lang][`section:${s.id}`]) || tr(s.title, lang, true);

export const LOCALES: Record<Lang, string> = { en: 'en-GB', nl: 'nl-NL', it: 'it-IT', de: 'de-DE', fr: 'fr-FR', es: 'es-ES' };

/** Euro prices in each language's own notation (€19, € 19, 19 €); cents only when there are any. */
export function formatPrice(value: number, lang: Lang) {
  const whole = Number.isInteger(value);
  return new Intl.NumberFormat(LOCALES[lang], {
    style: 'currency', currency: 'EUR',
    minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: 2,
  }).format(value);
}

export function findItem(name: string): MenuItem {
  for (const s of sections) {
    const hit = s.items.find((i) => i.name === name);
    if (hit) return hit;
  }
  throw new Error(`Menu item not found: ${name}`);
}

/** The gluten-free surcharge is the price of the menu item, so it can never differ. */
export const GLUTEN_FREE_ITEM = 'Gluten-Free Pasta';
export const glutenFreeSurcharge = () => findItem(GLUTEN_FREE_ITEM).price;

export const OG_IMAGE = `${ORIGIN}/og.jpg`;

export function restaurantSchema(lang: Lang, description: string) {
  const r = restaurant;
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${ORIGIN}/#restaurant`,
    name: r.name,
    description,
    url: canonical('home', 'en'),
    image: OG_IMAGE,
    servesCuisine: r.cuisine,
    priceRange: r.priceRange,
    acceptsReservations: r.reservations,
    hasMenu: canonical('menu', 'en'),
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
    hasMap: r.maps.google,
    ...(r.sameAs.length ? { sameAs: r.sameAs } : {}),
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Alcohol-free drinks', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Gluten-free pasta available', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Walk-ins only', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Takeaway', value: r.takeaway },
    ],
  };
}

export function menuSchema(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${canonical('menu', lang)}#menu`,
    name: 'La Carbonara',
    url: canonical('menu', lang),
    inLanguage: lang,
    hasMenuSection: sections.map((s) => ({
      '@type': 'MenuSection',
      name: sectionTitle(s, lang),
      hasMenuItem: s.items.map((i) => ({
        '@type': 'MenuItem',
        name: itemName(i, lang),
        ...(i.desc ? { description: itemDesc(i, lang) } : {}),
        offers: { '@type': 'Offer', price: i.price.toFixed(2), priceCurrency: 'EUR' },
      })),
    })),
  };
}

export function faqSchema(lang: Lang, faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${canonical('faq', lang)}#faq`,
    inLanguage: lang,
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}
