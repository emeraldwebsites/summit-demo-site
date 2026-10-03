// Reusable page sections. Each function takes the site config and returns HTML.
import { esc, telHref, fullAddress, mapsEmbedUrl, mapsLink, stars, icon } from "./lib.mjs";

// ---------- Header ----------
export const header = (cfg) => {
  const b = cfg.business;
  const logo = cfg.site.logo
    ? `<img src="${esc(cfg.site.logo)}" alt="${esc(b.name)}" class="logo-img">`
    : `<span class="logo-text">${esc(b.name)}</span>`;
  return `
<header class="site-header">
  <div class="topbar">
    <div class="container topbar-inner">
      <span>${icon("pin", "icon-sm")} ${esc(b.address.city)}, ${esc(b.address.state)}</span>
      <span>${icon("clock", "icon-sm")} ${b.emergency24h ? "24/7 Emergency Service" : esc(b.hours[0].days + " " + b.hours[0].time)}</span>
      <span class="topbar-license">${icon("shield", "icon-sm")} Licensed &amp; Insured</span>
    </div>
  </div>
  <div class="container header-inner">
    <a href="/" class="logo" aria-label="${esc(b.name)} home">${logo}</a>
    <nav class="nav" id="nav" aria-label="Main">
      ${cfg.nav.map((n) => `<a href="${esc(n.href)}">${esc(n.label)}</a>`).join("")}
      <a href="/contact/" class="btn btn-outline nav-quote">Get a Quote</a>
    </nav>
    <a href="${telHref(b.phone)}" class="btn btn-accent header-phone">${icon("phone", "icon-sm")} <span>${esc(b.phone)}</span></a>
    <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="nav" aria-label="Open menu">${icon("menu")}</button>
  </div>
</header>`;
};

// ---------- Footer ----------
export const footer = (cfg) => {
  const b = cfg.business;
  return `
<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <h3 class="footer-title">${esc(b.name)}</h3>
      <p>${esc(b.tagline)}</p>
      <p class="footer-license">${esc(b.license)}</p>
      <div class="social">
        ${b.social.facebook ? `<a href="${esc(b.social.facebook)}" rel="noopener" target="_blank">Facebook</a>` : ""}
        ${b.social.google ? `<a href="${esc(b.social.google)}" rel="noopener" target="_blank">Google</a>` : ""}
        ${b.social.instagram ? `<a href="${esc(b.social.instagram)}" rel="noopener" target="_blank">Instagram</a>` : ""}
      </div>
    </div>
    <div>
      <h3 class="footer-title">Services</h3>
      <ul class="footer-links">
        ${cfg.services.map((s) => `<li><a href="/services/${esc(s.slug)}/">${esc(s.name)}</a></li>`).join("")}
      </ul>
    </div>
    <div>
      <h3 class="footer-title">Contact</h3>
      <address>
        <a href="${telHref(b.phone)}" class="footer-phone">${esc(b.phone)}</a><br>
        <a href="mailto:${esc(b.email)}">${esc(b.email)}</a><br>
        <a href="${mapsLink(cfg)}" rel="noopener" target="_blank">${esc(b.address.street)}<br>${esc(b.address.city)}, ${esc(b.address.state)} ${esc(b.address.zip)}</a>
      </address>
    </div>
    <div>
      <h3 class="footer-title">Hours</h3>
      <ul class="footer-hours">
        ${b.hours.map((h) => `<li><span>${esc(h.days)}</span><span>${esc(h.time)}</span></li>`).join("")}
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <span>&copy; ${new Date().getFullYear()} ${esc(b.legalName)}. All rights reserved.</span>
    <span><a href="/privacy/">Privacy</a> · Website by <a href="https://emeraldwebsites.com" rel="noopener" target="_blank">Emerald Websites</a></span>
  </div>
</footer>
<a href="${telHref(b.phone)}" class="mobile-call">${icon("phone", "icon-sm")} Call ${esc(b.phone)}</a>`;
};

// ---------- Hero ----------
export const hero = (cfg) => {
  const b = cfg.business;
  const h = cfg.hero;
  return `
<section class="hero" style="--hero-img:url('${esc(h.image)}')">
  <div class="container hero-inner">
    <div class="hero-copy">
      <p class="eyebrow">${esc(b.industry)} · ${esc(b.address.city)}, ${esc(b.address.state)}</p>
      <h1>${esc(h.headline)}</h1>
      <p class="lead">${esc(h.subheadline)}</p>
      <div class="hero-ctas">
        <a href="${telHref(b.phone)}" class="btn btn-accent btn-lg">${icon("phone", "icon-sm")} Call ${esc(b.phone)}</a>
        <a href="/contact/" class="btn btn-light btn-lg">Request a Free Quote</a>
      </div>
      <div class="hero-rating">${stars(5)} <strong>${b.reviewSummary.rating}</strong> from ${b.reviewSummary.count} ${esc(b.reviewSummary.source)} reviews</div>
    </div>
    <div class="hero-card">
      <h2>Get a Free Quote</h2>
      <p>Fill this out and we will call you back within one business hour.</p>
      ${quoteForm(cfg, { compact: true })}
    </div>
  </div>
</section>
<section class="trustbar">
  <div class="container trustbar-inner">
    ${h.badges.map((t) => `<span>${icon("check", "icon-sm")} ${esc(t)}</span>`).join("")}
  </div>
</section>`;
};

// ---------- Services grid ----------
export const servicesGrid = (cfg, { heading = "Our Services", intro = "" } = {}) => `
<section class="section" id="services">
  <div class="container">
    <div class="section-head">
      <h2>${esc(heading)}</h2>
      ${intro ? `<p>${esc(intro)}</p>` : ""}
    </div>
    <div class="grid grid-3">
      ${cfg.services
        .map(
          (s) => `
      <a class="card service-card" href="/services/${esc(s.slug)}/">
        <div class="service-icon">${icon(s.icon)}</div>
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.short)}</p>
        <span class="card-link">Learn more →</span>
      </a>`
        )
        .join("")}
    </div>
  </div>
</section>`;

// ---------- Why us ----------
export const whyUs = (cfg) => `
<section class="section section-alt">
  <div class="container">
    <div class="section-head"><h2>${esc(cfg.whyUs.heading)}</h2></div>
    <div class="grid grid-2">
      ${cfg.whyUs.points
        .map(
          (p) => `
      <div class="why-item">
        <div class="why-icon">${icon("check")}</div>
        <div><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></div>
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>`;

// ---------- Process ----------
export const processSteps = (cfg) => `
<section class="section">
  <div class="container">
    <div class="section-head"><h2>How It Works</h2></div>
    <ol class="steps">
      ${cfg.process
        .map(
          (p, i) => `
      <li class="step">
        <span class="step-num">${i + 1}</span>
        <h3>${esc(p.step)}</h3>
        <p>${esc(p.text)}</p>
      </li>`
        )
        .join("")}
    </ol>
  </div>
</section>`;

// ---------- Reviews ----------
export const reviews = (cfg) => {
  const b = cfg.business;
  return `
<section class="section section-alt" id="reviews">
  <div class="container">
    <div class="section-head">
      <h2>What Your Neighbors Say</h2>
      <p>${stars(5)} <strong>${b.reviewSummary.rating}</strong> average from ${b.reviewSummary.count} ${esc(b.reviewSummary.source)} reviews</p>
    </div>
    <div class="grid grid-2">
      ${cfg.reviews
        .map(
          (r) => `
      <blockquote class="review">
        ${stars(r.rating)}
        <p>“${esc(r.text)}”</p>
        <footer>— ${esc(r.name)}, ${esc(r.city)}</footer>
      </blockquote>`
        )
        .join("")}
    </div>
    ${b.social.google ? `<p class="center"><a class="btn btn-outline" href="${esc(b.social.google)}" rel="noopener" target="_blank">Read all reviews on Google</a></p>` : ""}
  </div>
</section>`;
};

// ---------- Service area ----------
export const serviceArea = (cfg, { full = false } = {}) => {
  const sa = cfg.serviceArea;
  return `
<section class="section" id="service-area">
  <div class="container">
    <div class="section-head">
      <h2>${esc(sa.heading)}</h2>
      <p>${esc(sa.intro)}</p>
    </div>
    <div class="area-grid">
      <ul class="city-list">
        ${sa.cities.map((c) => `<li>${icon("pin", "icon-sm")} ${esc(c)}, ${esc(cfg.business.address.state)}</li>`).join("")}
      </ul>
      <div class="map-wrap">
        <iframe src="${mapsEmbedUrl(cfg)}" width="100%" height="${full ? 420 : 320}" style="border:0" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" title="Map of ${esc(cfg.business.name)} service area"></iframe>
      </div>
    </div>
  </div>
</section>`;
};

// ---------- Gallery ----------
export const gallery = (cfg) => `
<section class="section section-alt" id="gallery">
  <div class="container">
    <div class="section-head"><h2>Recent Work</h2></div>
    <div class="gallery">
      ${cfg.gallery.map((g) => `<figure><img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy" width="600" height="450"></figure>`).join("")}
    </div>
  </div>
</section>`;

// ---------- FAQ ----------
export const faq = (cfg) => `
<section class="section" id="faq">
  <div class="container narrow">
    <div class="section-head"><h2>Frequently Asked Questions</h2></div>
    ${cfg.faqs
      .map(
        (f) => `
    <details class="faq-item">
      <summary>${esc(f.q)}</summary>
      <p>${esc(f.a)}</p>
    </details>`
      )
      .join("")}
  </div>
</section>`;

// ---------- CTA band ----------
export const ctaBand = (cfg, text = "Ready to get started? Call now or request a free quote online.") => `
<section class="cta-band">
  <div class="container cta-inner">
    <h2>${esc(text)}</h2>
    <div class="hero-ctas">
      <a href="${telHref(cfg.business.phone)}" class="btn btn-accent btn-lg">${icon("phone", "icon-sm")} ${esc(cfg.business.phone)}</a>
      <a href="/contact/" class="btn btn-light btn-lg">Request a Quote</a>
    </div>
  </div>
</section>`;

// ---------- Quote form ----------
export const quoteForm = (cfg, { compact = false } = {}) => {
  const f = cfg.form;
  const action = f.provider === "formspree" && f.formspreeId ? `https://formspree.io/f/${esc(f.formspreeId)}` : "/api/contact";
  return `
<form class="quote-form${compact ? " compact" : ""}" action="${action}" method="POST" data-provider="${esc(f.provider)}">
  <input type="hidden" name="_redirect" value="${esc(cfg.site.url)}/thank-you/">
  <input type="hidden" name="_subject" value="New quote request from ${esc(cfg.business.name)} website">
  <input type="text" name="_gotcha" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
  <div class="form-row">
    <label>Name<input type="text" name="name" required autocomplete="name"></label>
    <label>Phone<input type="tel" name="phone" required autocomplete="tel"></label>
  </div>
  ${compact ? "" : `<label>Email<input type="email" name="email" autocomplete="email"></label>
  <label>Address or City<input type="text" name="address" autocomplete="street-address"></label>`}
  <label>What do you need?
    <select name="service">
      ${f.services.map((s) => `<option>${esc(s)}</option>`).join("")}
    </select>
  </label>
  <label>Details<textarea name="message" rows="${compact ? 2 : 4}" placeholder="Tell us what is going on"></textarea></label>
  ${f.turnstileSiteKey ? `<div class="cf-turnstile" data-sitekey="${esc(f.turnstileSiteKey)}"></div>` : ""}
  <button type="submit" class="btn btn-accent btn-lg btn-block">Request My Free Quote</button>
  <p class="form-note">We never share your information. Expect a call back within one business hour.</p>
</form>`;
};

// ---------- Page hero (inner pages) ----------
export const pageHero = (title, subtitle = "") => `
<section class="page-hero">
  <div class="container">
    <h1>${esc(title)}</h1>
    ${subtitle ? `<p class="lead">${esc(subtitle)}</p>` : ""}
  </div>
</section>`;

// ---------- Contact info block ----------
export const contactInfo = (cfg) => {
  const b = cfg.business;
  return `
<div class="contact-info">
  <h2>Contact ${esc(b.name)}</h2>
  <p><strong>Phone:</strong> <a href="${telHref(b.phone)}">${esc(b.phone)}</a>${b.emergency24h ? " (24/7 emergency line)" : ""}</p>
  <p><strong>Email:</strong> <a href="mailto:${esc(b.email)}">${esc(b.email)}</a></p>
  <p><strong>Address:</strong> <a href="${mapsLink(cfg)}" rel="noopener" target="_blank">${esc(fullAddress(b.address))}</a></p>
  <h3>Hours</h3>
  <ul class="footer-hours">
    ${b.hours.map((h) => `<li><span>${esc(h.days)}</span><span>${esc(h.time)}</span></li>`).join("")}
  </ul>
</div>`;
};
