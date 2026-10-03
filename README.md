# Emerald Websites — Master Client Template

A fast, lead-focused website template for trades and local service businesses. One config file drives the whole site. No frameworks, no `npm install`, builds in under a second, hosts free on Cloudflare Pages.

## Quick start 

```bash
# Requires Node 18 or newer. Nothing to install.
node dev.mjs          # preview at http://localhost:4000, rebuilds on save
node build.mjs        # writes the finished site to ./dist
```

## Files

|Path|Purpose|
|-|-|
|`site.config.mjs`|**All client content and colors.** The only file that changes per client.|
|`src/components.mjs`|Page sections: header, hero, services grid, reviews, service area map, gallery, FAQ, quote form, footer|
|`src/pages.mjs`|Page definitions. Service pages are generated from the config.|
|`src/layout.mjs`|HTML shell with SEO tags and schema.org structured data|
|`src/lib.mjs`|Helpers and inline SVG icons|
|`public/`|Static files copied to the output: CSS, JS, images, Cloudflare `\_headers` and `\_redirects`|
|`functions/api/contact.js`|Cloudflare Pages Function that emails quote-form leads via Resend|
|`CLAUDE.md`|Instructions for Claude Code when setting up or editing a client site|

## What every client site includes

Home page with hero and inline quote form, trust bar, services grid, why-us, three-step process, reviews, service area with embedded Google Map, photo gallery, FAQ, and call-to-action band. One SEO page per service. Service area page. About page. Contact page. Thank-you and privacy pages. Custom 404. Sticky header with click-to-call. Sticky mobile call bar. LocalBusiness, Service, and FAQPage schema. Sitemap and robots.txt. Security headers. Honeypot spam protection with optional Cloudflare Turnstile.

## Deploying to Cloudflare Pages

1. Push the repository to GitHub.
2. Cloudflare dashboard → Workers \& Pages → Create → Pages → Connect to Git → pick the repository.
3. Build settings: framework preset **None**, build command `node build.mjs`, build output directory `dist`.
4. Settings → Environment variables (Production):

   * `RESEND\_API\_KEY` — from resend.com (free tier, 3,000 emails per month)
   * `LEAD\_TO` — client's email for leads
   * `LEAD\_FROM` — an address on a domain verified in Resend (or `onboarding@resend.dev` for testing)
   * `LEAD\_BCC` — optional, Emerald's address to receive a copy of every lead
5. Custom domains → add the client's domain. Cloudflare handles SSL.
6. Submit the sitemap in Google Search Console.

Redeploys happen automatically on every push. Every pull request gets a preview URL.

## Monthly cost per site

Cloudflare Pages: $0. Resend: $0. Domain: about $1/month. Total: about $1/month.

