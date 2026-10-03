// Cloudflare Pages Function: /api/contact
//   POST  receives the quote form, emails the lead via Resend, redirects to /thank-you/
//   GET   health check: open /api/contact in a browser to see whether the function is
//         deployed and which variables it can see (values are never shown).
//
// Setup (one time per client site, Cloudflare Pages → Settings → Variables and Secrets, Production):
//   RESEND_API_KEY   = re_xxxxxxxx      (Secret) from resend.com
//   LEAD_TO          = client@example.com   (Text) where leads go; comma-separate for multiple
//   LEAD_FROM        = leads@yourdomain.com (Text) must be a domain verified in Resend,
//                      or onboarding@resend.dev for testing (delivers only to the Resend account email)
//   LEAD_BCC         = you@emeraldwebsites.com   (Text, optional) copy Emerald on every lead
//   TURNSTILE_SECRET = 0x...             (Secret, optional) only if turnstileSiteKey is set in site.config.mjs
// Variables take effect on the next deployment after they are added.

const REQUIRED = ["RESEND_API_KEY", "LEAD_TO", "LEAD_FROM"];

export async function onRequestGet({ env }) {
  const status = {
    function: "deployed",
    variables: Object.fromEntries([...REQUIRED, "LEAD_BCC", "TURNSTILE_SECRET"].map((k) => [k, Boolean(env[k])])),
    ready: REQUIRED.every((k) => Boolean(env[k])),
    checkedAt: new Date().toISOString(),
  };
  return new Response(JSON.stringify(status, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export async function onRequestPost({ request, env }) {
  const url = new URL(request.url);
  const form = await request.formData();
  const get = (k) => (form.get(k) || "").toString().trim();

  // Spam trap 1: hidden checkbox. Humans never see it; browser autofill never ticks it.
  if (get("_gotcha")) {
    console.log("contact: spam trap checkbox ticked, dropping submission");
    return redirect(url, "/thank-you/");
  }
  // Spam trap 2: submitted less than 2 seconds after the page loaded (bots do, people cannot)
  const loadedAt = Number(get("_t"));
  if (loadedAt && Date.now() - loadedAt < 2000) {
    console.log("contact: submitted too fast, dropping submission");
    return redirect(url, "/thank-you/");
  }

  const name = get("name"), phone = get("phone");
  if (!name || !phone) return page(400, "Name and phone are required. Please go back and try again.");

  // Fail loudly if the function is not configured. A silent failure loses leads.
  const missing = REQUIRED.filter((k) => !env[k]);
  if (missing.length) {
    console.error("contact: not configured, missing " + missing.join(", "));
    return page(
      500,
      `This form is not fully set up yet (missing: ${missing.join(", ")}). Please call us directly, or if you are the site owner, add these variables in Cloudflare Pages → Settings → Variables and Secrets, then redeploy.`
    );
  }

  // Optional Turnstile verification
  if (env.TURNSTILE_SECRET) {
    const token = get("cf-turnstile-response");
    const ip = request.headers.get("CF-Connecting-IP") || "";
    const check = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token, remoteip: ip }),
    }).then((r) => r.json());
    if (!check.success) return page(403, "Spam check failed. Please go back and try again.");
  }

  const fields = {
    Name: name,
    Phone: phone,
    Email: get("email"),
    Address: get("address"),
    Service: get("service"),
    Details: get("message"),
    Page: request.headers.get("Referer") || "",
    Time: new Date().toLocaleString("en-US", { timeZone: "America/Indiana/Indianapolis" }),
  };
  const text = Object.entries(fields).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<h2>New quote request</h2><table>${Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table><p><a href="tel:${phone.replace(/\D/g, "")}">Call ${escapeHtml(phone)}</a></p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.LEAD_FROM,
      to: env.LEAD_TO.split(",").map((s) => s.trim()),
      bcc: env.LEAD_BCC ? env.LEAD_BCC.split(",").map((s) => s.trim()) : undefined,
      reply_to: fields.Email || undefined,
      subject: `New lead: ${name} — ${fields.Service || "Quote request"}`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("contact: Resend error", res.status, detail);
    return page(
      502,
      `Sorry, something went wrong sending your request. Please call us directly.<br><br><small style="color:#777">Resend responded ${res.status}: ${escapeHtml(detail)}</small>`
    );
  }
  const sent = await res.json().catch(() => ({}));
  console.log("contact: sent via Resend, id " + (sent.id || "unknown"));
  return redirect(url, "/thank-you/");
}

const redirect = (url, path) => Response.redirect(new URL(path, url.origin).toString(), 303);
const escapeHtml = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const page = (status, message) =>
  new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Quote form</title><style>body{font-family:system-ui,sans-serif;max-width:560px;margin:80px auto;padding:0 20px;line-height:1.6;color:#1c2429}a{color:#1f6f8b}</style></head><body><h1>${status >= 500 ? "Something went wrong" : "One more thing"}</h1><p>${message}</p><p><a href="javascript:history.back()">Go back</a></p></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
