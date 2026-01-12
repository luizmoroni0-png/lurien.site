(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);

  function getLang() {
    return localStorage.getItem("lurien_lang") || "pt";
  }

  // Crea UI chat
  const fab = document.createElement("button");
  fab.className = "chat-fab";
  fab.type = "button";
  fab.textContent = "💬";
  fab.setAttribute("aria-label", "Chat");

  const panel = document.createElement("div");
  panel.className = "chat-panel";
  panel.innerHTML = `
    <div class="chat-head">
      <div class="chat-title">Lurien Assistant</div>
      <button class="chat-close" type="button">✕</button>
    </div>
    <div class="chat-body" id="chatBody"></div>
    <div class="chat-foot">
      <input class="chat-input" id="chatInput" type="text" placeholder="Scrivi…" />
      <button class="btn chat-send" id="chatSend" type="button">Invia</button>
    </div>
  `;

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  const closeBtn = $(".chat-close", panel);
  const body = $("#chatBody", panel);
  const input = $("#chatInput", panel);
  const sendBtn = $("#chatSend", panel);

  function msg(text, me = false) {
    const div = document.createElement("div");
    div.className = "chat-msg" + (me ? " me" : "");
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function botWelcome() {
    const lang = getLang();
    if (lang === "it") msg("Ciao! Come posso aiutarti? (Progetti, prezzi, contatti)");
    else if (lang === "en") msg("Hi! How can I help? (Projects, prices, contacts)");
    else msg("Olá! Como posso ajudar? (Projetos, preços, contato)");
  }

  function botReply(text) {
    const s = text.toLowerCase();
    const lang = getLang();

    if (s.includes("prez") || s.includes("price") || s.includes("valor")) {
      if (lang === "it") return "I prezzi dipendono dal progetto. Scrivimi quale progetto ti interessa e ti dico come richiedere la scheda completa.";
      if (lang === "en") return "Prices depend on the project. Tell me which one you’re interested in and I’ll guide you to request full details.";
      return "Os valores dependem do projeto. Diga qual projeto você quer e eu te ajudo a pedir a ficha completa.";
    }

    if (s.includes("contatt") || s.includes("contact") || s.includes("whats")) {
      if (lang === "it") return "Puoi contattarci dal footer: Email / WhatsApp / Instagram. Vuoi che ti apra la sezione Contatti?";
      if (lang === "en") return "You can contact us in the footer: Email / WhatsApp / Instagram. Want me to open Contacts?";
      return "Você encontra contato no rodapé: Email / WhatsApp / Instagram. Quer que eu abra Contato?";
    }

    if (lang === "it") return "Ok! Dimmi cosa vuoi fare: aggiungere un progetto, cambiare testi, o sistemare immagini?";
    if (lang === "en") return "Got it! Tell me what you want to do: add a project, change texts, or fix images?";
    return "Beleza! O que você quer fazer: adicionar projeto, mudar textos, ou ajustar imagens?";
  }

  function send() {
    const text = (input.value || "").trim();
    if (!text) return;
    msg(text, true);
    input.value = "";
    setTimeout(() => msg(botReply(text), false), 250);
  }

  fab.addEventListener("click", () => {
    panel.classList.toggle("open");
    if (panel.classList.contains("open") && body.childElementCount === 0) botWelcome();
  });

  closeBtn.addEventListener("click", () => panel.classList.remove("open"));
  sendBtn.addEventListener("click", send);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") send(); });
})();