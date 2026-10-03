// Small helpers shared by templates. No dependencies.

export const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const telHref = (phone) => "tel:+1" + String(phone).replace(/\D/g, "");

export const fullAddress = (a) => `${a.street}, ${a.city}, ${a.state} ${a.zip}`;

export const mapsEmbedUrl = (cfg) => {
  const q = encodeURIComponent(`${cfg.business.name}, ${fullAddress(cfg.business.address)}`);
  return `https://www.google.com/maps?q=${q}&z=10&output=embed`;
};

export const mapsLink = (cfg) =>
  cfg.business.social.google ||
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress(cfg.business.address))}`;

export const stars = (n = 5) =>
  `<span class="stars" aria-label="${n} out of 5 stars">${"★".repeat(n)}${"☆".repeat(5 - n)}</span>`;

// Inline SVG icons keyed by name. Add more as needed.
const ICONS = {
  snowflake: '<path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1"/>',
  flame: '<path d="M12 22c4.4 0 8-3.1 8-7.5 0-3.3-2-5.6-3.7-7.5C15.4 6 15 5 15 4c-2.7 1-4.2 3-4.5 5.5C9.3 8.9 8.6 8 8.5 6.5 6.4 8.4 4 11 4 14.5 4 18.9 7.6 22 12 22z"/>',
  home: '<path d="M3 11 12 3l9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0 5 5l-9.4 9.4a2 2 0 0 1-2.8-2.8l9.4-9.4a4 4 0 0 0-2.2-2.2z"/>',
  wind: '<path d="M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h8a2 2 0 1 1-2 2"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  pin: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  droplet: '<path d="M12 2.7 6.3 9.4a8 8 0 1 0 11.4 0z"/>',
  bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
  truck: '<path d="M1 3h15v13H1zM16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  dollar: '<path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
};

export const icon = (name, cls = "icon") =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.check}</svg>`;

export const slugify = (s) =>
  String(s).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
