// Facts that the copy in every language fills in. They come from the data
// files, so prices, hours and walking times are never typed by hand.
import { restaurant as r, section, findItem, formatPrice, type Lang } from '../lib/site';

export type Faq = { q: string; a: string };

/** 12:00 everywhere, except French, which writes 12 h (and 12 h 30). */
function time(hhmm: string, lang: Lang) {
  if (lang !== 'fr') return hhmm;
  const [h, m] = hhmm.split(':');
  return m === '00' ? `${Number(h)}\u00a0h` : `${Number(h)}\u00a0h\u00a0${m}`;
}

export function facts(lang: Lang) {
  const p = (v: number) => formatPrice(v, lang);
  const pasta = section('pasta').items.map((i) => i.price);
  return {
    open: time(r.hours.opens, lang),
    close: time(r.hours.closes, lang),
    street: r.address.street,
    address: `${r.address.street}, ${r.address.postalCode} ${r.address.city}`,
    phone: r.phone.display,
    gf: p(r.glutenFreeSurcharge),
    carbonara: p(findItem('La Carbonara').price),
    spritz: p(section('spritz').items[0].price),
    minPasta: p(Math.min(...pasta)),
    maxPasta: p(Math.max(...pasta)),
    walk: r.walkMinutes,
  };
}

export type Facts = ReturnType<typeof facts>;
