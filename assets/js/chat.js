/* LURIEN - Chat (statico)
   - Risposte predefinite da /assets/data/faq-it.json
   - UI premium: FAB con icona + contorno oro su focus/click
*/

(function () {
  const FAQ_URL = "/assets/data/faq-it.json";

  const DEFAULT_REPLY =
    "Grazie! Scrivi: città, metratura, tipo di progetto e budget indicativo. " +
    "Se preferisci: WhatsApp +55 37 99999-0000.";

  function normalize(s = "") {
    return s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  async function loadFaq() {
    try {
      const r = await fetch(FAQ_URL, { cache: "no-store" });
      if (!r.ok) throw new Error("FAQ fetch failed");
      return await r.json();
    } catch (e) {
      return [];
    }
  }

  function findAnswer(message, faq) {
    const m = normalize(message);
    if (!m) return null;

    for (const item of faq) {
      const kws = Array.isArray(item.keywords) ? item.keywords : [];
      const hit = kws.some((kw) => m.includes(normalize(kw)));
      if (hit) return item.answer || null;
    }
    return null;
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  // Inject minimal CSS for chat (così non devi toccare altro)
  const css = document.createElement("style");
  css.textContent = `
    .lurien-fab{
      position:fixed; right:20px; bottom:20px; z-index:9999;
      width:58px; height:58px; border-radius:999px;
      background: linear-gradient(180deg, #e2c05a, #caa23a);
      border:1px solid rgba(0,0,0,.18);
      box-shadow: 0 14px 40px rgba(0,0,0,.45);
      cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      transition: transform .15s ease, box-shadow .15s ease;
    }
    .lurien-fab:hover{ transform: translateY(-2px); }
    .lurien-fab:active{ box-shadow:0 0 0 2px rgba(214,181,74,.55), 0 14px 40px rgba(0,0,0,.45); }
    .lurien-fab:focus-visible{ box-shadow:0 0 0 2px rgba(214,181,74,.55), 0 14px 40px rgba(0,0,0,.45); outline:none; }
    .lurien-fab svg{ width:22px; height:22px; }

    .lurien-chat{
      position:fixed; right:20px; bottom:92px; z-index:9999;
      width:360px; max-width:90vw; height:460px;
      background: rgba(11,11,11,.92);
      border:1px solid rgba(255,255,255,.12);
      border-radius:18px;
      overflow:hidden;
      display:none;
      flex-direction:column;
      box-shadow: 0 18px 60px rgba(0,0,0,.55);
      backdrop-filter: blur(10px);
    }
    .lurien-chat__top{
      padding:14px 14px;
      border-bottom:1px solid rgba(255,255,255,.12);
      display:flex; align-items:center; justify-content:space-between;
    }
    .lurien-chat__title{
      color:#d6b54a;
      font-weight:900;
      letter-spacing:.10em;
      text-transform:uppercase;
      font-size:13px;
    }
    .lurien-chat__close{
      background:transparent;
      color:#fff;
      border:1px solid rgba(255,255,255,.12);
      border-radius:10px;
      padding:6px 10px;
      cursor:pointer;
    }
    .lurien-chat__close:active,
    .lurien-chat__close:focus-visible{
      box-shadow:0 0 0 2px rgba(214,181,74,.55);
    }
    .lurien-chat__log{
      flex:1; padding:12px; overflow:auto;
      color:#bdbdbd; font-family:system-ui;
    }
    .lurien-chat__row{ margin:0 0 10px 0; line-height:1.35; }
    .lurien-chat__who-you{ color:#fff; font-weight:800; }
    .lurien-chat__who-ai{ color:#d6b54a; font-weight:900; }

    .lurien-chat__bottom{
      display:flex; gap:8px;
      padding:12px;
      border-top:1px solid rgba(255,255,255,.12);
    }
    .lurien-chat__input{
      flex:1;
      background:#111;
      border:1px solid rgba(255,255,255,.12);
      color:#fff;
      padding:10px 12px;
      border-radius:12px;
      outline:none;
    }
    .lurien-chat__input:focus-visible{
      box-shadow:0 0 0 2px rgba(214,181,74,.55);
    }
    .lurien-chat__send{
      background:#d6b54a;
      border:none;
      border-radius:12px;
      padding:10px 14px;
      font-weight:900;
      cursor:pointer;
    }
    .lurien-chat__send:active,
    .lurien-chat__send:focus-visible{
      box-shadow:0 0 0 2px rgba(214,181,74,.55);
    }
  `;
  document.head.appendChild(css);

  // FAB
  const fab = document.createElement("button");
  fab.className = "lurien-fab";
  fab.setAttribute("aria-label", "Open chat");
  fab.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5.5C4 4.12 5.12 3 6.5 3h11C18.88 3 20 4.12 20 5.5v7C20 13.88 18.88 15 17.5 15H10l-4.5 4v-4H6.5C5.12 15 4 13.88 4 12.5v-7Z" stroke="#0b0b0b" stroke-width="2" stroke-linejoin="round"/>
      <path d="M7.5 7.5h9M7.5 10.5h6" stroke="#0b0b0b" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;

  // Chat box
  const box = document.createElement("div");
  box.className = "lurien-chat";
  box.innerHTML = `
    <div class="lurien-chat__top">
      <div class="lurien-chat__title">Assistant</div>
      <button class="lurien-chat__close" type="button">Chiudi</button>
    </div>
    <div class="lurien-chat__log" id="ai-log"></div>
    <div class="lurien-chat__bottom">
      <input class="lurien-chat__input" id="ai-input" placeholder="Scrivi una domanda..." />
      <button class="lurien-chat__send" id="ai-send" type="button">Invia</button>
    </div>
  `;

  function addLine(who, text) {
    const log = box.querySelector("#ai-log");
    const row = document.createElement("div");
    row.className = "lurien-chat__row";
    row.innerHTML =
      who === "Tu"
        ? `<span class="lurien-chat__who-you">Tu:</span> ${escapeHtml(text)}`
        : `<span class="lurien-chat__who-ai">AI:</span> ${escapeHtml(text)}`;
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
  }

  let FAQ_CACHE = null;
  async function ensureFaq() {
    if (FAQ_CACHE) return FAQ_CACHE;
    FAQ_CACHE = await loadFaq();
    return FAQ_CACHE;
  }

  async function replyTo(msg) {
    const faq = await ensureFaq();
    const ans = findAnswer(msg, faq);
    return ans || DEFAULT_REPLY;
  }

  async function send() {
    const input = box.querySelector("#ai-input");
    const msg = (input.value || "").trim();
    if (!msg) return;
    input.value = "";

    addLine("Tu", msg);
    addLine("AI", "...");

    const log = box.querySelector("#ai-log");
    const last = log.lastElementChild;

    const r = await replyTo(msg);
    last.innerHTML = `<span class="lurien-chat__who-ai">AI:</span> ${escapeHtml(r)}`;
    log.scrollTop = log.scrollHeight;
  }

  function openChat() {
    box.style.display = "flex";
  }
  function closeChat() {
    box.style.display = "none";
  }

  fab.addEventListener("click", () => {
    box.style.display === "flex" ? closeChat() : openChat();
  });

  box.querySelector(".lurien-chat__close").addEventListener("click", closeChat);

  box.addEventListener("click", (e) => {
    if (e.target && e.target.id === "ai-send") send();
  });

  box.addEventListener("keydown", (e) => {
    if (e.target && e.target.id === "ai-input" && e.key === "Enter") send();
  });

  document.body.appendChild(fab);
  document.body.appendChild(box);

  addLine("AI", "Ciao! Posso aiutarti con prezzi, tempi, contatti e informazioni sul progetto.");
})();