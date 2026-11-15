import { defineConfig } from 'astro/config';

// Production site: GitHub Pages with the custom domain lacarbonara.nl.
// Every push to main deploys (see .github/workflows/pages.yml), so test locally
// with `npm run dev` or `npm run build && npm run preview` first.
export default defineConfig({
  site: 'https://lacarbonara.nl',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  // Content Security Policy as a <meta> tag on every page (GitHub Pages cannot
  // set headers). Astro adds hashes for its own inline styles and scripts.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
      ],
    },
  },
});
