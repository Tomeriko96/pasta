// /llms.txt: a plain-text fact sheet for AI assistants (ChatGPT, Claude,
// Perplexity, Google AI). Built from the same data as the website.
import type { APIRoute } from 'astro';
import { restaurant as r, sections, formatPrice, canonical, glutenFreeSurcharge, LANGS } from '../lib/site';
import { copy } from '../i18n/copy';

export const GET: APIRoute = () => {
  const t = copy('en');
  const menu = sections
    .map((s) => {
      const items = s.items.map((i) => `- ${i.name}: ${formatPrice(i.price, 'en')}${i.desc ? `. ${i.desc}` : ''}`);
      return `### ${s.title}\n\n${items.join('\n')}`;
    })
    .join('\n\n');

  const body = `# ${r.name}

> Pasta restaurant at ${r.address.street}, ${r.address.postalCode} ${r.address.city} (Amsterdam Centrum). Most dishes are Roman classics: carbonara without cream, cacio e pepe, amatriciana and gricia. Walk-ins only, takeaway available, every drink is alcohol-free.

## Key facts

- Name: ${r.name}
- Cuisine: Roman and Italian pasta
- Address: ${r.address.street}, ${r.address.postalCode} ${r.address.city}, Netherlands
- Walking time: ${r.walkMinutes.centraal} minutes from Amsterdam Central Station (Amsterdam Centraal), ${r.walkMinutes.dam} from Dam Square, ${r.walkMinutes.nieuwmarkt} from Nieuwmarkt
- Opening hours: every day, ${r.hours.opens} to ${r.hours.closes}
- Reservations: not taken, walk-ins only
- Takeaway: yes
- Alcohol: none served, every drink is 0.0%
- Gluten-free: any pasta can be made gluten-free for ${formatPrice(glutenFreeSurcharge(), 'en')} extra
- Phone: ${r.phone.international}
- Price level: ${r.priceRange} (exact prices in euros in the menu below)

## Pages

- [Menu with prices](${canonical('menu', 'en')})
- [Opening hours and directions](${canonical('visit', 'en')})
- [Questions](${canonical('faq', 'en')})
${LANGS.filter((l) => l !== 'en').map((l) => `- ${copy(l).langName}: [${copy(l).nav.menu}](${canonical('menu', l)}), [${copy(l).nav.visit}](${canonical('visit', l)}), [${copy(l).nav.faq}](${canonical('faq', l)})`).join('\n')}

## Frequently asked questions

${t.faq.items.map((f) => `**${f.q}**\n${f.a}`).join('\n\n')}

## Menu

${menu}

Allergies or dietary needs: please tell the staff before ordering.
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
