# Emerald Websites — Client Site Template

This repository is the master template for Emerald Websites client sites (trades and local service businesses: HVAC, plumbing, concrete, roofing, electrical, and similar). One copy of this repository = one client site.

## How the site works

- **Zero dependencies.** No `npm install`. Node 18+ is the only requirement.
- `site.config.mjs` holds every piece of client content: business info, colors, services, reviews, cities, FAQ, gallery. **This is the only file that should change between clients.**
- `src/components.mjs` holds page sections (hero, services grid, reviews, quote form, and so on).
- `src/pages.mjs` defines every page and which sections it uses. Service pages are generated automatically, one per entry in `services`.
- `src/layout.mjs` is the HTML shell: meta tags, Open Graph, schema.org JSON-LD (LocalBusiness, Service, FAQPage).
- `public/` is copied to the output as-is: `styles.css`, `main.js`, images, `_headers`, `_redirects`, favicon.
- `functions/api/contact.js` is a Cloudflare Pages Function that emails quote-form submissions via Resend.
- `node build.mjs` renders everything into `dist/` (about 30 ms). `node dev.mjs` serves a live preview at http://localhost:4000 and rebuilds on save.

## Setting up a new client (the standard workflow)

1. Copy this template into a new repository named `<client-slug>-site`.
2. Edit `site.config.mjs` top to bottom. Every field is commented. Key ones:
   - `business.*` — name, phone, email, address, hours, license, `schemaType`.
   - `site.url` — the final domain, no trailing slash. Used for canonical URLs, sitemap, and schema.
   - `site.theme` — three hex colors. `primary` for brand, `accent` for phone and form buttons (should contrast with primary), `dark` for header and footer.
   - `services[]` — 4 to 8 services. Each gets its own page for local SEO. Write 2 to 3 paragraphs of `description` and 4 `bullets` per service in the client's voice.
   - `serviceArea.cities` — 8 to 16 real towns the client actually serves. These feed the schema `areaServed` and the on-page text.
   - `reviews[]` — 4 to 6 real reviews, copied from Google. Never invent reviews.
   - `faqs[]` — 5 to 8 questions. These generate FAQPage schema.
3. Replace placeholder images in `public/images/` with the client's photos. Keep the same file names or update the paths in the config. Resize to a maximum of 1600 px wide and compress (JPEG quality 80). Landscape orientation only for hero, service, and gallery images.
4. Run `node build.mjs`, fix any error, then `node dev.mjs` and check every page on desktop and a phone-width window.
5. Push to GitHub, connect to Cloudflare Pages (build command `node build.mjs`, output directory `dist`), set environment variables for the contact function, add the custom domain.

## Rules when editing

- Escape all client-provided text with `esc()` from `src/lib.mjs` when adding new template code. Config values already flow through `esc()` in the existing components.
- Keep `public/styles.css` framework-free. All colors derive from `--primary`, `--accent`, `--dark`, which are injected from the config. Do not hard-code brand colors in CSS.
- Do not add npm dependencies. If a feature seems to need one, discuss first. The value of this template is that it never breaks.
- Do not add external scripts except the ones already conditional in `src/layout.mjs` (Google Analytics, Turnstile). Every extra request costs page speed, which costs leads.
- Phone number links must use `telHref()` so they work on mobile.
- Every page must have a unique `title` and `description` in `src/pages.mjs`. Titles follow the pattern `<Service> in <City>, <State>` for local SEO.
- When a client asks for a new page type (for example, a financing page), add a function in `src/pages.mjs` and append it to `pages()`. The sitemap picks it up automatically.
- After any edit, run `node build.mjs` and confirm it prints "Built N pages" with no error.

## Industry adaptation cheatsheet

| Industry | `business.schemaType` | `hero.badges` ideas | `form.services` ideas |
|---|---|---|---|
| HVAC | HVACBusiness | Same-Day Service, 24/7 Emergency, Financing | Repair, Installation, Maintenance, Emergency |
| Plumbing | Plumber | 24/7 Emergency, Upfront Pricing, Licensed | Leak repair, Water heater, Drain cleaning, Emergency |
| Electrical | Electrician | Licensed Master Electrician, Panel Upgrades | Panel upgrade, Repair, New wiring, EV charger |
| Concrete / driveways | GeneralContractor | Free Estimates, Locally Owned, 10-Year Warranty | Driveway, Patio, Sidewalk, Foundation |
| Roofing | RoofingContractor | Storm Damage Experts, Insurance Claims Help | Repair, Replacement, Inspection, Gutters |
| Lawn / landscaping | LandscapingBusiness | Weekly Service, Free Quotes | Mowing, Landscaping, Hardscape, Snow removal |

## Forms

Default provider is `cloudflare`: the form posts to `/api/contact`, the Pages Function emails the lead through Resend and redirects to `/thank-you/`. Required environment variables in the Cloudflare Pages project: `RESEND_API_KEY`, `LEAD_TO`, `LEAD_FROM`. Optional: `LEAD_BCC` (copy Emerald on every lead), `TURNSTILE_SECRET`.

Alternative: set `form.provider` to `"formspree"` and fill `form.formspreeId`. No environment variables needed. Free tier allows 50 submissions per month.

## Deploy checklist

- [ ] `site.url` is the real domain with `https://` and no trailing slash
- [ ] `business.phone` is correct (this is the number one thing clients check)
- [ ] All placeholder images replaced
- [ ] Reviews are real and attributed
- [ ] Environment variables set in Cloudflare Pages
- [ ] Test the quote form once on the live site and confirm the email arrives
- [ ] Add the domain in Cloudflare Pages → Custom domains
- [ ] Submit `https://<domain>/sitemap.xml` in Google Search Console
- [ ] Link the site from the client's Google Business Profile
