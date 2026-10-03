// Mobile navigation toggle + form submit state. Keep this tiny.
(function () {
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Stamp each form with the page-load time (spam trap: bots submit instantly)
  // and disable the submit button after click so double-taps do not send twice
  var loadedAt = String(Date.now());
  document.querySelectorAll("form.quote-form").forEach(function (form) {
    var t = form.querySelector('input[name="_t"]');
    if (t) t.value = loadedAt;
    form.addEventListener("submit", function () {
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
    });
  });

  // Track phone clicks in Google Analytics if it is installed
  document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
    a.addEventListener("click", function () {
      if (typeof gtag === "function") gtag("event", "phone_call", { event_category: "lead" });
    });
  });
})();
