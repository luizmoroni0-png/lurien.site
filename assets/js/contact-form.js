/* =========================================================
   LURIEN — contact-form.js (FULL)
   - Invia il form a Formspree (endpoint già configurato)
   - Mostra messaggio di stato sotto al bottone
========================================================= */

(() => {
  "use strict";

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdaakkdn";

  
  const MAX_MESSAGE = 1000;
const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("contactFormStatus");
  if (!form) return;

  const setStatus = (msg) => {
    if (statusEl) statusEl.textContent = msg || "";
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = (form.elements["name"]?.value || "").trim();
    const email = (form.elements["email"]?.value || "").trim();
    const message = (form.elements["message"]?.value || "").trim();

    if (!name || !email || !message) {
      setStatus("Compila Nome, Email e Messaggio.");
      return;
    }

    if (message.length > MAX_MESSAGE) {
      setStatus(`Messaggio troppo lungo (max ${MAX_MESSAGE} caratteri).`);
      return;
    }

    setStatus("Invio in corso...");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        form.reset();
        setStatus("Messaggio inviato ✅");
      } else {
        setStatus("Errore invio. Riprova o contattaci su WhatsApp.");
      }
    } catch (err) {
      setStatus("Errore di connessione. Riprova o contattaci su WhatsApp.");
    }
  });
})();
