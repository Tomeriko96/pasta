// sitemap.xml with hreflang alternates for the English and Dutch pages.
import type { APIRoute } from 'astro';
import { LANGS, canonical } from '../lib/site';

export const GET: APIRoute = () => {
  const alternates = [
    ...LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${canonical(l)}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${canonical('en')}"/>`,
  ].join('\n');
  const urls = LANGS.map((l) => `  <url>\n    <loc>${canonical(l)}</loc>\n${alternates}\n  </url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
