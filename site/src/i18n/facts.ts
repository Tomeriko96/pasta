// Facts that the copy in every language fills in. They come from the data
// files, so prices, hours and walking times are never typed by hand.
import { restaurant as r, section, findItem, formatPrice, type Lang } from '../lib/site';

export type Faq = { q: string; a: string };

export function facts(lang: Lang) {
  const p = (v: number) => formatPrice(v, lang);
  const pasta = section('pasta').items.map((i) => i.price);
  return {
    open: r.hours.opens,
    close: r.hours.closes,
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
