// Cloudflare Pages Function: POST /api/contact
// Receives the quote form, emails the lead via Resend (free tier: 3,000 emails/month),
// then redirects the visitor to /thank-you/.
//
// Setup (one time per client site, in the Cloudflare Pages dashboard → Settings → Environment variables):
//   RESEND_API_KEY   = re_xxxxxxxx      (from resend.com, free account)
//   LEAD_TO          = client@example.com   (where leads go; comma-separate for multiple)
//   LEAD_FROM        = leads@yourdomain.com (must be a verified domain in Resend, or use onboarding@resend.dev for testing)
//   LEAD_BCC         = you@emeraldwebsites.com   (optional: copy Emerald on every lead)
//   TURNSTILE_SECRET = 0x...             (optional: only if turnstileSiteKey is set in site.config.mjs)

export async function onRequestPost({ request, env }) {
  const url = new URL(request.url);
  const form = await request.formData();
  const get = (k) => (form.get(k) || "").toString().trim();

  // Honeypot: bots fill hidden fields, humans do not
  if (get("_gotcha")) return redirect(url, "/thank-you/");

  const name = get("name"), phone = get("phone");
  if (!name || !phone) return new Response("Name and phone are required.", { status: 400 });

  // Optional Turnstile verification
  if (env.TURNSTILE_SECRET) {
    const token = get("cf-turnstile-response");
    const ip = request.headers.get("CF-Connecting-IP") || "";
    const check = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token, remoteip: ip }),
    }).then((r) => r.json());
    if (!check.success) return new Response("Spam check failed. Please go back and try again.", { status: 403 });
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

  if (!env.RESEND_API_KEY || !env.LEAD_TO) {
    console.log("Lead received but RESEND_API_KEY / LEAD_TO not configured:\n" + text);
    return redirect(url, "/thank-you/");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.LEAD_FROM || "onboarding@resend.dev",
      to: env.LEAD_TO.split(",").map((s) => s.trim()),
      bcc: env.LEAD_BCC ? env.LEAD_BCC.split(",").map((s) => s.trim()) : undefined,
      reply_to: fields.Email || undefined,
      subject: `New lead: ${name} — ${fields.Service || "Quote request"}`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return new Response("Sorry, something went wrong sending your request. Please call us directly.", { status: 502 });
  }
  return redirect(url, "/thank-you/");
}

const redirect = (url, path) => Response.redirect(new URL(path, url.origin).toString(), 303);
const escapeHtml = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
