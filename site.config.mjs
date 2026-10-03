// ============================================================
// EMERALD WEBSITES — CLIENT SITE CONFIG
// This is the ONLY file that changes between clients.
// Everything on the site is generated from these values.
// ============================================================

export default {
  // ---------- Business identity ----------
  business: {
    name: "Summit Heating & Air",
    legalName: "Summit Heating & Air LLC",
    industry: "HVAC", // short label used in copy: "HVAC", "Plumbing", "Concrete", "Roofing"
    tagline: "Fast, honest heating and cooling service in Morgan County",
    phone: "(765) 555-0142",
    email: "office@summitheatingair.com",
    leadEmail: "office@summitheatingair.com", // quote form deliveries go here
    address: {
      street: "1240 E Morgan St",
      city: "Martinsville",
      state: "IN",
      zip: "46151",
    },
    geo: { lat: 39.4278, lng: -86.4283 },
    hours: [
      { days: "Monday – Friday", time: "7:00 AM – 6:00 PM" },
      { days: "Saturday", time: "8:00 AM – 2:00 PM" },
      { days: "Sunday", time: "Emergency calls only" },
    ],
    emergency24h: true,
    yearFounded: 2009,
    license: "Indiana HVAC Contractor License #HV1234567",
    insured: true,
    // Schema.org type. Common choices: HVACBusiness, Plumber, Electrician,
    // RoofingContractor, GeneralContractor, HousePainter, Locksmith, MovingCompany,
    // LandscapingBusiness (use "HomeAndConstructionBusiness" if unsure)
    schemaType: "HVACBusiness",
    social: {
      facebook: "https://www.facebook.com/",
      google: "https://www.google.com/maps",
      instagram: "",
    },
    reviewSummary: { rating: 4.9, count: 137, source: "Google" },
  },

  // ---------- Site settings ----------
  site: {
    url: "https://summitheatingair.com", // no trailing slash
    // Colors: change these three and the whole site re-themes
    theme: {
      primary: "#1f6f8b",   // main brand color (buttons, links, accents)
      accent: "#f28c28",    // call-to-action color (phone button, form submit)
      dark: "#12242e",      // header / footer background
    },
    logo: "", // path like "/images/logo.svg". Leave empty to use text logo.
    ogImage: "/images/og-default.jpg",
    googleAnalyticsId: "", // "G-XXXXXXXXXX" or leave empty
  },

  // ---------- Quote form ----------
  form: {
    // "cloudflare" = built-in Pages Function, emails via Resend (free tier, $0)
    // "formspree"  = post to Formspree (free tier 50/month)
    provider: "cloudflare",
    formspreeId: "", // e.g. "xkgqbzyz" when provider is "formspree"
    turnstileSiteKey: "", // optional Cloudflare Turnstile spam protection
    services: ["Repair", "New installation", "Maintenance", "Emergency service", "Not sure"],
  },

  // ---------- Navigation ----------
  nav: [
    { label: "Services", href: "/services/" },
    { label: "Service Area", href: "/service-area/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
  ],

  // ---------- Hero ----------
  hero: {
    headline: "Heating & Cooling Repair You Can Count On",
    subheadline:
      "Same-day service, upfront pricing, and technicians who treat your home like their own. Serving Martinsville and all of Morgan County since 2009.",
    image: "/images/hero.jpg",
    badges: ["Licensed & Insured", "Same-Day Service", "Upfront Pricing", "Family Owned"],
  },

  // ---------- Services ----------
  // Each service gets its own page at /services/<slug>/ for local SEO.
  services: [
    {
      slug: "ac-repair",
      name: "AC Repair",
      short: "Fast diagnosis and repair for all major brands. Most repairs done the same day.",
      icon: "snowflake",
      image: "/images/service-ac-repair.jpg",
      description: [
        "When your air conditioner quits in July, you need someone there today, not next week. Our technicians arrive in a stocked truck, diagnose the problem, and give you a flat price before any work starts.",
        "We repair all major brands including Carrier, Trane, Lennox, Goodman, and Rheem. If a repair does not make financial sense, we will tell you honestly and show you your replacement options.",
      ],
      bullets: ["Same-day appointments", "Flat-rate pricing, no surprises", "All major brands", "1-year parts and labor warranty"],
    },
    {
      slug: "furnace-repair",
      name: "Furnace Repair",
      short: "No heat? We answer the phone 24 hours a day and get your furnace running safely.",
      icon: "flame",
      image: "/images/service-furnace.jpg",
      description: [
        "A furnace that will not start, short-cycles, or blows cold air is not something to wait on in an Indiana winter. We offer 24-hour emergency furnace repair across Morgan County.",
        "Every repair includes a safety inspection of the heat exchanger and carbon monoxide check at no extra charge.",
      ],
      bullets: ["24-hour emergency service", "Free carbon monoxide check", "Gas, electric, and propane", "Financing available on major repairs"],
    },
    {
      slug: "hvac-installation",
      name: "New System Installation",
      short: "High-efficiency furnaces, air conditioners, and heat pumps installed right the first time.",
      icon: "home",
      image: "/images/service-install.jpg",
      description: [
        "A new system is a big investment. We size it correctly using a Manual J load calculation instead of guessing, so you get even temperatures and lower bills for the next 15 to 20 years.",
        "We handle permits, rebates, and haul-away of your old equipment. Most installations are complete in one day.",
      ],
      bullets: ["Free in-home estimates", "Manual J load calculation", "Rebate and financing help", "10-year parts warranty on new systems"],
    },
    {
      slug: "maintenance",
      name: "Maintenance Plans",
      short: "Two tune-ups a year, priority scheduling, and 15% off repairs for one flat price.",
      icon: "wrench",
      image: "/images/service-maintenance.jpg",
      description: [
        "Regular maintenance is the cheapest insurance you can buy for your heating and cooling equipment. Our Comfort Club members get a spring AC tune-up and a fall furnace tune-up every year.",
        "Members also get priority scheduling during peak season, 15% off all repairs, and no overtime charges on emergency calls.",
      ],
      bullets: ["Spring and fall tune-ups", "Priority scheduling", "15% off repairs", "No overtime fees"],
    },
    {
      slug: "indoor-air-quality",
      name: "Indoor Air Quality",
      short: "Whole-home humidifiers, air purifiers, and duct cleaning for healthier air.",
      icon: "wind",
      image: "/images/service-air-quality.jpg",
      description: [
        "Allergies, dry winter air, and dust are all things your HVAC system can fix. We install whole-home humidifiers, media air cleaners, and UV purifiers that work with your existing equipment.",
      ],
      bullets: ["Whole-home humidifiers", "Media and HEPA filtration", "UV air purifiers", "Duct cleaning and sealing"],
    },
    {
      slug: "emergency-service",
      name: "24/7 Emergency Service",
      short: "No heat or no cooling is an emergency. Call any time, day or night.",
      icon: "phone",
      image: "/images/service-emergency.jpg",
      description: [
        "We keep a technician on call every night, weekend, and holiday. When you call, a real person answers and a technician is dispatched, usually within two hours.",
      ],
      bullets: ["Real person answers 24/7", "Typical arrival under 2 hours", "Stocked trucks", "No overtime fees for Comfort Club members"],
    },
  ],

  // ---------- Why choose us ----------
  whyUs: {
    heading: "Why Morgan County Trusts Summit",
    points: [
      { title: "Upfront, flat-rate pricing", text: "You approve the price before we touch a tool. No hourly clock, no surprise line items." },
      { title: "Background-checked technicians", text: "Every technician is drug tested, background checked, and NATE certified." },
      { title: "We show up when we say we will", text: "You get a text when your technician is on the way with their name and photo." },
      { title: "Local and family owned", text: "We live here too. Our reputation in this town is the only marketing that matters to us." },
    ],
  },

  // ---------- Process ----------
  process: [
    { step: "Call or request a quote", text: "Tell us what is going on. We schedule most calls for the same day." },
    { step: "We diagnose and quote", text: "Your technician finds the problem and gives you a flat price before starting." },
    { step: "Fixed right, guaranteed", text: "Work is done with a written warranty and a clean job site." },
  ],

  // ---------- Service area ----------
  serviceArea: {
    heading: "Proudly Serving Morgan County and Central Indiana",
    intro: "Based in Martinsville, we cover the whole county and surrounding communities. If you do not see your town, call us. We probably go there.",
    cities: [
      "Martinsville", "Mooresville", "Monrovia", "Morgantown", "Paragon", "Brooklyn",
      "Camby", "Plainfield", "Greenwood", "Bloomington", "Spencer", "Franklin",
    ],
    radiusMiles: 30,
  },

  // ---------- Reviews ----------
  reviews: [
    { name: "Dana R.", city: "Martinsville", rating: 5, text: "AC died on a Saturday in July. They were here in 90 minutes and had it fixed in an hour. Price was exactly what they quoted on the phone." },
    { name: "Mike T.", city: "Mooresville", rating: 5, text: "Replaced our 22-year-old furnace. Crew was clean, on time, and walked us through the thermostat before they left. Bills are noticeably lower." },
    { name: "Sarah K.", city: "Monrovia", rating: 5, text: "Honest company. Told us our system had a few more years in it instead of pushing a replacement. That is who we will call when it does need replacing." },
    { name: "Jim and Carol B.", city: "Morgantown", rating: 5, text: "We have been on the maintenance plan for three years. Never had a breakdown since. Worth every penny." },
  ],

  // ---------- Gallery ----------
  gallery: [
    { src: "/images/gallery-1.jpg", alt: "New high-efficiency furnace installation in Martinsville" },
    { src: "/images/gallery-2.jpg", alt: "Air conditioner condenser replacement" },
    { src: "/images/gallery-3.jpg", alt: "Technician servicing a heat pump" },
    { src: "/images/gallery-4.jpg", alt: "Ductwork installation in a new home" },
    { src: "/images/gallery-5.jpg", alt: "Summit service truck" },
    { src: "/images/gallery-6.jpg", alt: "Smart thermostat installation" },
  ],

  // ---------- FAQ ----------
  faqs: [
    { q: "How fast can you get here?", a: "Most calls are scheduled the same day. Emergency no-heat and no-cool calls are typically reached within two hours." },
    { q: "Do you charge a trip fee?", a: "We charge a $79 diagnostic fee, which is waived if you approve the repair." },
    { q: "Do you offer financing?", a: "Yes. We offer 0% financing for 18 months on new system installations, subject to credit approval." },
    { q: "Which brands do you service?", a: "All of them. Carrier, Trane, Lennox, Goodman, Rheem, Bryant, American Standard, and more." },
    { q: "Are you licensed and insured?", a: "Yes. We hold an Indiana HVAC contractor license and carry full liability and workers' compensation insurance." },
  ],

  // ---------- About ----------
  about: {
    heading: "A Local Company Built on Word of Mouth",
    image: "/images/about.jpg",
    paragraphs: [
      "Summit Heating & Air was started in 2009 by a Martinsville native who spent twelve years working for one of the big Indianapolis HVAC companies and got tired of watching customers get upsold.",
      "Today we are a team of eight technicians and two office staff, and we still run the company the same way: fix what is broken, charge a fair price, and tell people the truth about their equipment.",
      "Most of our new customers come from referrals. That only happens when you do the job right.",
    ],
    stats: [
      { value: "15+", label: "Years in business" },
      { value: "4,000+", label: "Homes served" },
      { value: "4.9", label: "Google rating" },
      { value: "24/7", label: "Emergency service" },
    ],
  },
};
