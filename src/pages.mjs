// Every page on the site. Each entry returns { path, title, description, body, schema? }.
// Add a page by adding a function here and listing it in `pages()` at the bottom.
import { esc, telHref, icon } from "./lib.mjs";
import { faqSchema } from "./layout.mjs";
import {
  hero, servicesGrid, whyUs, processSteps, reviews, serviceArea, gallery, faq,
  ctaBand, quoteForm, pageHero, contactInfo,
} from "./components.mjs";

const city = (cfg) => `${cfg.business.address.city}, ${cfg.business.address.state}`;

// ---------- Home ----------
const home = (cfg) => ({
  path: "/",
  title: `${cfg.business.name} | ${cfg.business.industry} in ${city(cfg)}`,
  description: `${cfg.business.tagline}. Call ${cfg.business.phone} for ${cfg.business.emergency24h ? "24/7 " : ""}service in ${cfg.business.address.city} and surrounding areas.`,
  schema: [faqSchema(cfg)],
  body: [
    hero(cfg),
    servicesGrid(cfg, { intro: `Everything your home needs from a local ${cfg.business.industry} company you can trust.` }),
    whyUs(cfg),
    processSteps(cfg),
    reviews(cfg),
    serviceArea(cfg),
    gallery(cfg),
    faq(cfg),
    ctaBand(cfg),
  ].join("\n"),
});

// ---------- Services index ----------
const servicesIndex = (cfg) => ({
  path: "/services/",
  title: `${cfg.business.industry} Services in ${city(cfg)}`,
  description: `${cfg.business.name} offers ${cfg.services.map((s) => s.name.toLowerCase()).join(", ")} in ${cfg.business.address.city} and all of ${cfg.serviceArea.cities.slice(0, 3).join(", ")}.`,
  body: [
    pageHero(`${cfg.business.industry} Services`, `Serving ${cfg.business.address.city} and surrounding communities. Upfront pricing on every job.`),
    servicesGrid(cfg, { heading: "What We Do" }),
    whyUs(cfg),
    ctaBand(cfg),
  ].join("\n"),
});

// ---------- Service detail ----------
const serviceDetail = (cfg, s) => ({
  path: `/services/${s.slug}/`,
  title: `${s.name} in ${city(cfg)}`,
  description: `${s.short} ${cfg.business.name} serves ${cfg.business.address.city} and ${cfg.serviceArea.cities.slice(1, 4).join(", ")}. Call ${cfg.business.phone}.`,
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.name,
      serviceType: s.name,
      provider: { "@id": cfg.site.url + "/#business" },
      areaServed: cfg.serviceArea.cities.map((c) => ({ "@type": "City", name: c })),
      description: s.short,
      url: `${cfg.site.url}/services/${s.slug}/`,
    },
  ],
  body: [
    pageHero(`${s.name} in ${city(cfg)}`, s.short),
    `
<section class="section">
  <div class="container service-layout">
    <article class="service-body">
      <img src="${esc(s.image)}" alt="${esc(s.name)} by ${esc(cfg.business.name)}" class="service-img" width="800" height="500" loading="eager">
      ${s.description.map((p) => `<p>${esc(p)}</p>`).join("")}
      <h2>What's Included</h2>
      <ul class="check-list">${s.bullets.map((b) => `<li>${icon("check", "icon-sm")} ${esc(b)}</li>`).join("")}</ul>
      <h2>${esc(s.name)} Across ${esc(cfg.serviceArea.cities.length > 6 ? "Central Indiana" : cfg.business.address.city)}</h2>
      <p>We provide ${esc(s.name.toLowerCase())} in ${esc(cfg.serviceArea.cities.join(", "))} and the surrounding area. Call <a href="${telHref(cfg.business.phone)}">${esc(cfg.business.phone)}</a> or use the form to schedule.</p>
      <h2>Other Services</h2>
      <ul class="inline-links">${cfg.services.filter((o) => o.slug !== s.slug).map((o) => `<li><a href="/services/${esc(o.slug)}/">${esc(o.name)}</a></li>`).join("")}</ul>
    </article>
    <aside class="service-aside">
      <div class="card sticky">
        <h3>Request ${esc(s.name)}</h3>
        ${quoteForm(cfg, { compact: true })}
      </div>
    </aside>
  </div>
</section>`,
    reviews(cfg),
    ctaBand(cfg, `Need ${s.name.toLowerCase()}? We can usually be there today.`),
  ].join("\n"),
});

// ---------- Service area ----------
const serviceAreaPage = (cfg) => ({
  path: "/service-area/",
  title: `Service Area | ${cfg.business.industry} in ${cfg.serviceArea.cities.slice(0, 4).join(", ")}`,
  description: `${cfg.business.name} provides ${cfg.business.industry} service within ${cfg.serviceArea.radiusMiles} miles of ${cfg.business.address.city}, including ${cfg.serviceArea.cities.slice(0, 6).join(", ")}.`,
  body: [
    pageHero("Where We Work", cfg.serviceArea.intro),
    serviceArea(cfg, { full: true }),
    `
<section class="section section-alt">
  <div class="container narrow">
    <h2>${esc(cfg.business.industry)} Service Near You</h2>
    <p>${esc(cfg.business.name)} is based at ${esc(cfg.business.address.street)} in ${esc(cfg.business.address.city)} and dispatches technicians across a ${cfg.serviceArea.radiusMiles}-mile radius. Because we are local, our response times are shorter than the big Indianapolis companies and our prices reflect a small-town cost of doing business.</p>
    <p>Not sure if we cover your address? Call <a href="${telHref(cfg.business.phone)}">${esc(cfg.business.phone)}</a>. If we cannot help, we will point you to someone who can.</p>
  </div>
</section>`,
    ctaBand(cfg),
  ].join("\n"),
});

// ---------- About ----------
const about = (cfg) => ({
  path: "/about/",
  title: `About ${cfg.business.name}`,
  description: `${cfg.business.name} has served ${cfg.business.address.city} since ${cfg.business.yearFounded}. Licensed, insured, and locally owned. Meet the team.`,
  body: [
    pageHero(cfg.about.heading),
    `
<section class="section">
  <div class="container about-layout">
    <img src="${esc(cfg.about.image)}" alt="${esc(cfg.business.name)} team" class="about-img" width="700" height="500">
    <div>
      ${cfg.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
      <p><strong>${esc(cfg.business.license)}</strong>${cfg.business.insured ? " · Fully insured" : ""}</p>
    </div>
  </div>
  <div class="container stats">
    ${cfg.about.stats.map((s) => `<div class="stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join("")}
  </div>
</section>`,
    whyUs(cfg),
    reviews(cfg),
    ctaBand(cfg),
  ].join("\n"),
});

// ---------- Contact ----------
const contact = (cfg) => ({
  path: "/contact/",
  title: `Contact ${cfg.business.name} | Free Quotes`,
  description: `Call ${cfg.business.phone} or request a free quote online. ${cfg.business.name} serves ${cfg.business.address.city} and surrounding areas.`,
  body: [
    pageHero("Get a Free Quote", "Call, email, or send the form. A real person will get back to you within one business hour."),
    `
<section class="section">
  <div class="container contact-layout">
    <div class="card">${quoteForm(cfg)}</div>
    ${contactInfo(cfg)}
  </div>
</section>`,
    serviceArea(cfg),
  ].join("\n"),
});

// ---------- Thank you ----------
const thankYou = (cfg) => ({
  path: "/thank-you/",
  title: "Thank You",
  description: "We received your request.",
  noindex: true,
  body: `
<section class="section">
  <div class="container narrow center">
    <h1>Thanks, we got it.</h1>
    <p class="lead">Someone from ${esc(cfg.business.name)} will call you within one business hour. If this is an emergency, call us right now at <a href="${telHref(cfg.business.phone)}">${esc(cfg.business.phone)}</a>.</p>
    <a href="/" class="btn btn-outline">Back to home</a>
  </div>
</section>`,
});

// ---------- Privacy ----------
const privacy = (cfg) => ({
  path: "/privacy/",
  title: "Privacy Policy",
  description: `How ${cfg.business.name} handles information submitted through this website.`,
  noindex: true,
  body: `
<section class="section">
  <div class="container narrow">
    <h1>Privacy Policy</h1>
    <p>${esc(cfg.business.legalName)} collects only the information you submit through our contact form (name, phone, email, address, and message) so we can respond to your request. We do not sell or share this information with third parties, other than the services required to deliver it to us.</p>
    <p>This site may use basic analytics to understand traffic. No personally identifying information is collected by analytics.</p>
    <p>Questions: <a href="mailto:${esc(cfg.business.email)}">${esc(cfg.business.email)}</a></p>
  </div>
</section>`,
});

// ---------- 404 ----------
const notFound = (cfg) => ({
  path: "/404.html",
  title: "Page Not Found",
  description: "That page does not exist.",
  noindex: true,
  body: `
<section class="section">
  <div class="container narrow center">
    <h1>Page not found</h1>
    <p class="lead">That link is broken or the page moved. Try one of these instead.</p>
    <p><a href="/" class="btn btn-outline">Home</a> <a href="/services/" class="btn btn-outline">Services</a> <a href="/contact/" class="btn btn-accent">Get a Quote</a></p>
  </div>
</section>`,
});

export const pages = (cfg) => [
  home(cfg),
  servicesIndex(cfg),
  ...cfg.services.map((s) => serviceDetail(cfg, s)),
  serviceAreaPage(cfg),
  about(cfg),
  contact(cfg),
  thankYou(cfg),
  privacy(cfg),
  notFound(cfg),
];
