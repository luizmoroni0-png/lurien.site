/* =========================================================
   LURIEN — Chat Multilingua (Developer Mode)
   - Animation Combo: "Shockwave" + "Erupting Ink"
   - Update: Wave triggers on OPEN and CLOSE
   - Features: Button stays on top, Liquid Expansion
========================================================= */

(function () {
  "use strict";

  // --- CONFIGURATION ---
  const FAQ_BASE_PATH = "assets/data/faq"; 

  // UI Translations
    const I18N = {
    it: {
      title: "Assistente Lurien",
      welcome: "Benvenuto. Seleziona un'opzione qui sotto per iniziare.",
      defaultReply: "Se vuoi, scrivici su WhatsApp +55 37 99976-0175 oppure via email supervisaolurienincorporadora@gmail.com.",
      actions: [
        { label: "🏠 Case in vendita", query: "vendita" },
        { label: "💰 Prezzi / Preventivo", query: "prezzi" },
        { label: "⏱️ Tempi di consegna", query: "tempi" },
        { label: "🌿 Terreni", query: "terreno" },
        { label: "🏦 Finanziamento", query: "finanziamento" },
        { label: "📅 Visita cantiere", query: "visita" },
        { label: "📍 Dove operiamo", query: "dove" },
        { label: "☎️ Contatti", query: "contatti" }
      ]
    },
    en: {
      title: "Lurien Assistant",
      welcome: "Welcome. Choose an option below to get started.",
      defaultReply: "You can also reach us on WhatsApp +55 37 99976-0175 or by email supervisaolurienincorporadora@gmail.com.",
      actions: [
        { label: "🏠 Homes for sale", query: "sale" },
        { label: "🌿 Do you buy land?", query: "buy_land" },
        { label: "📍 Where do you build?", query: "where" },
        { label: "🏦 Financing", query: "financing" },
        { label: "📅 Site visit", query: "visit" },
        { label: "☎️ Contacts", query: "contact" }
      ]
    },
    pt: {
      title: "Assistente Lurien",
      welcome: "Bem-vindo. Selecione uma opção abaixo para começar.",
      defaultReply: "Se preferir, fale conosco no WhatsApp +55 37 99976-0175 ou por email supervisaolurienincorporadora@gmail.com.",
      actions: [
        { label: "🏠 Imóveis à venda", query: "venda" },
        { label: "🌿 Compra de terreno", query: "compra_terreno" },
        { label: "📍 Onde atuamos?", query: "onde" },
        { label: "🏦 Financiamento", query: "financiamento" },
        { label: "📅 Visita ao canteiro", query: "visita" },
        { label: "☎️ Contato", query: "contato" }
      ]
    }
  };

  // --- HELPERS ---

  function getLang() {
    const lang = document.documentElement.lang || "it";
    return ["it", "pt", "en"].includes(lang) ? lang : "it";
  }

  function normalize(s = "") {
    return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (m) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[m]));
  }

  // --- STYLES (Ink + Wave) ---

  const css = document.createElement("style");
  css.textContent = `
    /* FAB (Button) - Top Layer */
    .lurien-fab {
      position: fixed; right: 20px; bottom: 20px; 
      z-index: 10001; /* Must be higher than chat */
      width: 58px; height: 58px; border-radius: 50%;
      background: linear-gradient(180deg, #e2c05a, #caa23a);
      border: 1px solid rgba(0,0,0,0.18);
      box-shadow: 0 14px 40px rgba(0,0,0,0.45);
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      -webkit-tap-highlight-color: transparent;
      transform-style: preserve-3d;
    }
    .lurien-fab:hover { transform: translateY(-2px); }
    .lurien-fab:active { transform: scale(0.9); } 
    
    .lurien-fab svg { 
      width: 22px; height: 22px; 
      stroke: #0b0b0b; stroke-width: 2; fill: none; 
      transition: opacity 0.3s;
      position: relative; z-index: 2;
    }

    /* --- THE WAVE (Shockwave Animation) --- */
    .lurien-fab::after {
      content: "";
      position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      border-radius: 50%;
      /* Golden Ring */
      box-shadow: 0 0 0 2px rgba(214, 181, 74, 0.7); 
      opacity: 0;
      pointer-events: none;
      z-index: -1;
    }
    /* Triggered by JS */
    .lurien-fab.is-rippling::after {
      animation: rippleEffect 0.6s ease-out forwards;
    }

    @keyframes rippleEffect {
      0% {
        transform: scale(1);
        opacity: 0.8;
        border-width: 4px;
      }
      100% {
        transform: scale(2.5);
        opacity: 0;
        border-width: 0px;
      }
    }

    /* CHAT BOX (The Ink Splash) - Bottom Layer */
    .lurien-chat {
      position: fixed; 
      right: 20px; 
      bottom: 90px; 
      z-index: 9999; /* Behind FAB */
      
      width: 380px; max-width: 90vw; height: 500px;
      background: rgba(11,11,11,0.98);
      border: 1px solid rgba(255,255,255,0.12);
      
      display: none; 
      flex-direction: column;
      box-shadow: 0 18px 60px rgba(0,0,0,0.6);
      backdrop-filter: blur(12px);
      font-family: 'Outfit', sans-serif;
      
      /* Hides corners */
      overflow: hidden;

      /* Origin: Center of the FAB relative to chat position */
      transform-origin: calc(100% - 29px) calc(100% + 41px);
      
      /* Start State: Tiny circle hidden behind button */
      opacity: 0;
      transform: scale(0.05);
      border-radius: 50%; 
      
      transition: 
        transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), 
        opacity 0.2s ease,
        border-radius 0.5s ease;
    }
    
    /* Open State: Full Rectangle */
    .lurien-chat.is-open {
      display: flex;
      opacity: 1;
      transform: scale(1);
      border-radius: 18px;
    }

    /* Content Fade In */
    .lurien-chat__content-wrapper {
      opacity: 0;
      flex: 1; display: flex; flex-direction: column; 
      overflow: hidden; 
      transition: opacity 0.3s ease 0.15s; 
    }
    .lurien-chat.is-open .lurien-chat__content-wrapper {
      opacity: 1;
    }

    /* --- Inner Elements --- */
    .lurien-chat__top {
      padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.12);
      display: flex; align-items: center; justify-content: space-between;
    }
    .lurien-chat__title {
      color: #d6b54a; font-weight: 800; letter-spacing: 0.05em;
      text-transform: uppercase; font-size: 13px;
    }
    .lurien-chat__actions { display: flex; gap: 8px; }

    .lurien-header-btn {
      background: transparent; color: #fff; 
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 8px; width: 32px; height: 32px;
      padding: 0; cursor: pointer; transition: all 0.2s;
      display: flex; align-items: center; justify-content: center;
    }
    .lurien-header-btn:hover { 
      background: rgba(255,255,255,0.1); 
      color: #d6b54a; border-color: rgba(214,181,74,0.3);
    }
    .lurien-header-btn svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; }

    .lurien-chat__log {
      flex: 1; padding: 16px; overflow-y: auto;
      display: flex; flex-direction: column; gap: 12px;
      padding-bottom: 10px;
    }

    .lurien-msg {
      padding: 10px 14px; border-radius: 12px; font-size: 14px; line-height: 1.5;
      max-width: 85%; word-wrap: break-word;
    }
    .lurien-msg--user {
      align-self: flex-end; background: rgba(255,255,255,0.08); color: #fff;
      border-bottom-right-radius: 2px;
    }
    .lurien-msg--ai {
      align-self: flex-start; background: rgba(214,181,74,0.1); color: #e6e6e6;
      border: 1px solid rgba(214,181,74,0.25);
      border-bottom-left-radius: 2px;
    }

    .lurien-chips-wrapper {
      position: relative;
      display: flex; align-items: center;
      padding: 10px 10px 16px 10px;
      border-top: 1px solid rgba(255,255,255,0.12);
      background: rgba(0,0,0,0.3);
    }
    .lurien-scroll-btn {
      width: 28px; height: 28px; border-radius: 50%;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(214,181,74,0.3);
      color: #d6b54a;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; flex-shrink: 0; font-size: 16px;
      transition: all 0.2s; z-index: 2;
    }
    .lurien-scroll-btn:hover { background: #d6b54a; color: #000; }

    .lurien-chips { 
      flex: 1; display: flex; flex-direction: row;      
      overflow-x: auto; gap: 10px; 
      scroll-behavior: smooth; padding: 0 8px;
      scrollbar-width: none; -ms-overflow-style: none; 
    }
    .lurien-chips::-webkit-scrollbar { display: none; }
    
    .lurien-chip {
      background: rgba(255,255,255,0.03); 
      border: 1px solid rgba(255,255,255,0.15);
      color: #d6b54a; 
      padding: 10px 16px; border-radius: 20px; 
      font-size: 13px; cursor: pointer; 
      transition: all 0.2s; white-space: nowrap;      
      flex-shrink: 0; font-weight: 600;
    }
    .lurien-chip:hover { 
      background: rgba(214,181,74,0.15); 
      border-color: #d6b54a; color: #fff;
    }
  `;
  document.head.appendChild(css);

  // --- UI ELEMENTS ---

  const fab = document.createElement("button");
  fab.className = "lurien-fab";
  fab.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5.5C4 4.12 5.12 3 6.5 3h11C18.88 3 20 4.12 20 5.5v7C20 13.88 18.88 15 17.5 15H10l-4.5 4v-4H6.5C5.12 15 4 13.88 4 12.5v-7Z" stroke-linejoin="round"/>
      <path d="M7.5 7.5h9M7.5 10.5h6" stroke-linecap="round"/>
    </svg>
  `;

  const box = document.createElement("div");
  box.className = "lurien-chat";
  box.innerHTML = `
    <div class="lurien-chat__content-wrapper">
      <div class="lurien-chat__top">
        <div class="lurien-chat__title" id="chatTitle"></div>
        <div class="lurien-chat__actions">
          <button class="lurien-header-btn" id="chatRestart" aria-label="Restart chat">
            <svg viewBox="0 0 24 24"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
          </button>
          <button class="lurien-header-btn" id="chatClose" aria-label="Close">
            <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>
      
      <div class="lurien-chat__log" id="chatLog"></div>
      
      <div class="lurien-chips-wrapper">
        <button class="lurien-scroll-btn" id="scrollLeft">‹</button>
        <div class="lurien-chips" id="chatChips"></div>
        <button class="lurien-scroll-btn" id="scrollRight">›</button>
      </div>
    </div>
  `;

  document.body.appendChild(fab);
  document.body.appendChild(box);

  // --- LOGIC ---

  let currentLang = "it";
  let faqCache = {};

  async function loadFaq(lang) {
    if (faqCache[lang]) return faqCache[lang];
    try {
      const r = await fetch(`${FAQ_BASE_PATH}.${lang}.json`); 
      if (!r.ok) throw new Error("404");
      faqCache[lang] = await r.json();
    } catch (e) {
      faqCache[lang] = [];
    }
    return faqCache[lang];
  }

  function addMsg(cls, text) {
    const log = document.getElementById("chatLog");
    const div = document.createElement("div");
    div.className = `lurien-msg lurien-msg--${cls}`;
    div.innerHTML = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }

  async function processQuery(displayText, queryOverride) {
    if (!displayText) return;
    addMsg("user", escapeHtml(displayText));
    
    const faq = await loadFaq(currentLang);
    const q = normalize(queryOverride || displayText);
    let ans = null;

    for (const item of faq) {
      if (item.id === q || (item.keywords || []).some(k => q.includes(normalize(k)))) {
        ans = item.answer;
        break;
      }
    }

    setTimeout(() => {
      addMsg("ai", ans ? escapeHtml(ans) : I18N[currentLang].defaultReply);
    }, 500);
  }

  function updateUI() {
    currentLang = getLang();
    const t = I18N[currentLang];
    document.getElementById("chatTitle").textContent = t.title;

    const chips = document.getElementById("chatChips");
    chips.innerHTML = "";
    t.actions.forEach(act => {
      const btn = document.createElement("button");
      btn.className = "lurien-chip";
      btn.textContent = act.label;
      btn.onclick = () => processQuery(act.label, act.query);
      chips.appendChild(btn);
    });
  }

  function toggleChat() {
    const isOpen = box.classList.contains("is-open");

    // TRIGGER WAVE (Always ripples on click)
    fab.classList.remove("is-rippling");
    void fab.offsetWidth; // Force reflow
    fab.classList.add("is-rippling");
    
    if (isOpen) {
      // CLOSE
      box.classList.remove("is-open");
      
      setTimeout(() => {
        if (!box.classList.contains("is-open")) {
          box.style.display = "none";
        }
      }, 500);
      
    } else {
      // OPEN
      updateUI();
      box.style.display = "flex";
      void box.offsetWidth; // Force Reflow
      box.classList.add("is-open");

      const log = document.getElementById("chatLog");
      if (!log.hasChildNodes()) {
        addMsg("ai", I18N[currentLang].welcome);
      }
    }
  }

  // --- EVENT LISTENERS ---

  fab.onclick = toggleChat;
  document.getElementById("chatClose").onclick = toggleChat;
  
  document.getElementById("chatRestart").onclick = () => {
    document.getElementById("chatLog").innerHTML = ""; 
    addMsg("ai", I18N[currentLang].welcome); 
  };

  document.getElementById("scrollLeft").onclick = () => {
    document.getElementById("chatChips").scrollBy({ left: -150, behavior: 'smooth' });
  };
  document.getElementById("scrollRight").onclick = () => {
    document.getElementById("chatChips").scrollBy({ left: 150, behavior: 'smooth' });
  };

  window.addEventListener("lurien:langchange", (e) => {
    if (e.detail && e.detail.lang) {
      currentLang = e.detail.lang;
      if (box.classList.contains("is-open")) updateUI(); 
    }
  });

  updateUI();
})();