// HTML document shell: head tags, SEO, schema.org, header, footer.
import { esc, fullAddress } from "./lib.mjs";
import { header, footer } from "./components.mjs";

export const localBusinessSchema = (cfg) => {
  const b = cfg.business;
  return {
    "@context": "https://schema.org",
    "@type": b.schemaType || "HomeAndConstructionBusiness",
    "@id": cfg.site.url + "/#business",
    name: b.name,
    legalName: b.legalName,
    url: cfg.site.url,
    telephone: b.phone,
    email: b.email,
    image: cfg.site.url + cfg.site.ogImage,
    logo: cfg.site.logo ? cfg.site.url + cfg.site.logo : undefined,
    priceRange: "$$",
    foundingDate: String(b.yearFounded),
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address.street,
      addressLocality: b.address.city,
      addressRegion: b.address.state,
      postalCode: b.address.zip,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: b.geo.lat, longitude: b.geo.lng },
    areaServed: cfg.serviceArea.cities.map((c) => ({ "@type": "City", name: `${c}, ${b.address.state}` })),
    openingHoursSpecification: b.hours.map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.days, description: h.time })),
    aggregateRating: b.reviewSummary.count
      ? { "@type": "AggregateRating", ratingValue: b.reviewSummary.rating, reviewCount: b.reviewSummary.count }
      : undefined,
    sameAs: Object.values(b.social).filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: cfg.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: `${cfg.site.url}/services/${s.slug}/` },
      })),
    },
  };
};

export const faqSchema = (cfg) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: cfg.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

/**
 * @param {object} cfg site config
 * @param {object} page { title, description, path, body, schema: [], noindex }
 */
export const layout = (cfg, page) => {
  const b = cfg.business;
  const t = cfg.site.theme;
  const fullTitle = page.title.includes(b.name) ? page.title : `${page.title} | ${b.name}`;
  const canonical = cfg.site.url + page.path;
  const schemas = [localBusinessSchema(cfg), ...(page.schema || [])];
  const ga = cfg.site.googleAnalyticsId
    ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(cfg.site.googleAnalyticsId)}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${esc(cfg.site.googleAnalyticsId)}');</script>`
    : "";
  const turnstile = cfg.form.turnstileSiteKey
    ? `<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>`
    : "";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${esc(canonical)}">
${page.noindex ? '<meta name="robots" content="noindex">' : ""}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(b.name)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(cfg.site.url + cfg.site.ogImage)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="geo.region" content="US-${esc(b.address.state)}">
<meta name="geo.placename" content="${esc(b.address.city)}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="sitemap" href="/sitemap.xml">
<style>:root{--primary:${t.primary};--accent:${t.accent};--dark:${t.dark};}</style>
<link rel="stylesheet" href="/styles.css">
${schemas.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n")}
${ga}
${turnstile}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${header(cfg)}
<main id="main">
${page.body}
</main>
${footer(cfg)}
<script src="/main.js" defer></script>
</body>
</html>`;
};
