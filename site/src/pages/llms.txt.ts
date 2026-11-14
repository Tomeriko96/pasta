// /llms.txt: a plain-text fact sheet for AI assistants (ChatGPT, Claude,
// Perplexity, Google AI). Built from the same data as the website.
import type { APIRoute } from 'astro';
import { restaurant as r, sections, formatPrice, ORIGIN, homePath } from '../lib/site';
import { copy } from '../i18n/copy';

export const GET: APIRoute = () => {
  const t = copy('en');
  const menu = sections
    .map((s) => {
      const items = s.items.map((i) => `- ${i.name}: ${formatPrice(i.price, 'en')}${i.desc ? `. ${i.desc.en}` : ''}`);
      return `### ${s.title.en}\n\n${items.join('\n')}`;
    })
    .join('\n\n');

  const body = `# ${r.name}

> Roman pasta restaurant at ${r.address.street}, ${r.address.postalCode} ${r.address.city}, in the city centre. The menu is built around Roman classics: carbonara (no cream), cacio e pepe, amatriciana and gricia. Walk-ins only, all drinks alcohol-free.

## Key facts

- Name: ${r.name}
- Cuisine: Roman, Italian, pasta
- Address: ${r.address.street}, ${r.address.postalCode} ${r.address.city}, Netherlands
- Opening hours: every day, ${r.hours.opens} to ${r.hours.closes}
- Reservations: not taken, walk-ins only
- Alcohol: none served, all drinks are 0.0%
- Gluten-free: any pasta can be made gluten-free for ${formatPrice(r.glutenFreeSurcharge, 'en')} extra
- Phone: ${r.phone.international}
- Price level: ${r.priceRange} (exact prices in euros in the menu below)
- Website: ${ORIGIN}${homePath.en} (English), ${ORIGIN}${homePath.nl} (Dutch)

## Frequently asked questions

${t.faqs.map((f) => `**${f.q}**\n${f.a}`).join('\n\n')}

## Menu

${menu}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
