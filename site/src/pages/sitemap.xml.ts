// sitemap.xml with hreflang alternates for every page in English and Dutch.
import type { APIRoute } from 'astro';
import { LANGS, routes, canonical, type RouteKey } from '../lib/site';

export const GET: APIRoute = () => {
  const urls = (Object.keys(routes) as RouteKey[]).flatMap((route) => {
    const alts = [
      ...LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${canonical(route, l)}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${canonical(route, 'en')}"/>`,
    ].join('\n');
    return LANGS.map((l) => `  <url>\n    <loc>${canonical(route, l)}</loc>\n${alts}\n  </url>`);
  });
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
