/* =========================================================
   LURIEN — app.js
   Router hash + render pagine + carica progetti da JSON + anno + lingua base
   (Struttura modulare: index.html resta quasi sempre fisso)
========================================================= */

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const appEl = $("#app");
  const yearEl = $("#year");
  const langBtn = $("#langBtn");

  const STORAGE_LANG = "lurien_lang";
  const LANGS = ["it", "en", "pt", "es"];

  // NOTE: i18n.js definisce window.I18N
  const T = (window.I18N && window.I18N.T) ? window.I18N.T : {
    it: {
      nav_home: "Home",
      nav_about: "Chi siamo",
      nav_projects: "Progetti",
      nav_content: "Contenuti",
      nav_contacts: "Contatti",
      hero_title: "LURIEN",
      hero_subtitle: "European Design. Brazilian Heart. AI Technology.",
      hero_cta: "Scopri i progetti",
      about_title: "Chi siamo",
      about_text: "Lurien Incorporadora LTDA: incorporazione, costruzione e concetti con attenzione ai dettagli.",
      projects_title: "Progetti",
      content_title: "Contenuti",
      contacts_title: "Contatti",
      loading: "Caricando..."
    }
  };

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (m) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[m]));
  }

  function getLang() {
    const saved = localStorage.getItem(STORAGE_LANG);
    return LANGS.includes(saved) ? saved : "it";
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_LANG, lang);
    updateLangUI(lang);
    applyI18n(lang);
  }

  function nextLang(curr) {
    const idx = LANGS.indexOf(curr);
    return LANGS[(idx + 1) % LANGS.length];
  }

  function t(lang, key) {
    return (T[lang] && T[lang][key]) || (T.it && T.it[key]) || key;
  }

  function updateLangUI(lang) {
    if (langBtn) langBtn.textContent = lang.toUpperCase();
    applyI18n(lang);
  }

  function applyI18n(lang) {
    $$("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      el.textContent = t(lang, key);
    });
  }

  function parseRoute() {
    const hash = (location.hash || "#/").replace(/^#/, "");
    const clean = hash.replace(/^\/+/, "");
    return clean.split("/").filter(Boolean);
  }

  function setActiveNav(path) {
    const href = `#/${path || ""}`.replace(/\/$/, "");
    $$(".main-nav a").forEach((a) => {
      const on = a.getAttribute("href").replace(/\/$/, "") === href;
      a.setAttribute("aria-current", on ? "page" : "false");
    });
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function fetchProjects() {
    const res = await fetch("assets/data/projects.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  function renderHome() {
    const lang = getLang();
    setActiveNav("");
    appEl.innerHTML = `
      <section class="hero">
        <div class="container hero-inner">
          <h1 class="hero-title" data-i18n="hero_title">${t(lang, "hero_title")}</h1>
          <p class="hero-subtitle" data-i18n="hero_subtitle">${t(lang, "hero_subtitle")}</p>
          <a class="btn" href="#/progetti" data-i18n="hero_cta">${t(lang, "hero_cta")}</a>
        </div>
      </section>

      <section class="container section">
        <h2 class="section-title" data-i18n="about_title">${t(lang, "about_title")}</h2>
        <p class="section-text" data-i18n="about_text">${t(lang, "about_text")}</p>
      </section>

      <section class="container section">
        <h2 class="section-title" data-i18n="projects_title">${t(lang, "projects_title")}</h2>
        <div id="projectsGrid" class="projects-grid">
          <div style="opacity:.7;" data-i18n="loading">${t(lang, "loading")}</div>
        </div>
      </section>
    `;

    applyI18n(lang);
    renderProjectsGrid();
  }

  async function renderProjectsGrid() {
    const grid = $("#projectsGrid");
    if (!grid) return;

    const lang = getLang();

    try {
      const projects = await fetchProjects();

      grid.innerHTML = projects.map((p) => {
        const title = (p.title && (p.title[lang] || p.title.it || p.title.en)) || p.id;
        const cover = p.cover ? escapeHtml(p.cover) : "";
        const status = escapeHtml(p.status || "");
        return `
          <a class="project-card" href="#/project/${escapeHtml(p.id)}">
            ${cover ? `<img src="${cover}" alt="${escapeHtml(title)}">` : ""}
            <div class="pc-body">
              <h3 class="pc-title">${escapeHtml(title)}</h3>
              <p class="pc-meta">${status}</p>
            </div>
          </a>
        `;
      }).join("");

      applyI18n(lang);
    } catch (e) {
      grid.innerHTML = `<div style="opacity:.8;">Errore nel caricare projects.json: ${escapeHtml(e.message || e)}</div>`;
    }
  }

  function renderSimplePage(titleKey, text) {
    const lang = getLang();
    appEl.innerHTML = `
      <section class="container section">
        <h2 class="section-title" data-i18n="${titleKey}">${t(lang, titleKey)}</h2>
        <p class="section-text">${escapeHtml(text)}</p>
      </section>
    `;
    applyI18n(lang);
  }

  async function renderProjectDetail(id) {
    const lang = getLang();
    setActiveNav("progetti");
    scrollToTop();

    appEl.innerHTML = `
      <section class="container section">
        <h2 class="section-title">Caricando...</h2>
        <p class="section-text" style="opacity:.75;">${escapeHtml(id)}</p>
      </section>
    `;

    try {
      const projects = await fetchProjects();
      const p = projects.find(x => x.id === id);
      if (!p) {
        appEl.innerHTML = `
          <section class="container section">
            <h2 class="section-title">Non trovato</h2>
            <p class="section-text">Progetto non trovato.</p>
            <p><a class="btn" href="#/progetti">Torna ai progetti</a></p>
          </section>
        `;
        return;
      }

      const title = (p.title && (p.title[lang] || p.title.it || p.title.en)) || p.id;
      const cover = p.cover ? escapeHtml(p.cover) : "";
      const gallery = Array.isArray(p.gallery) ? p.gallery : [];

      appEl.innerHTML = `
        <section class="container section">
          <h2 class="section-title">${escapeHtml(title)}</h2>

          ${cover ? `<div style="margin:16px 0;">
            <img src="${cover}" alt="${escapeHtml(title)}" style="width:100%; max-height:520px; object-fit:cover; border-radius:18px; border:1px solid rgba(255,255,255,0.12);">
          </div>` : ""}

          ${gallery.length ? `
            <div class="project-gallery">
              ${gallery.map(src => `<img src="${escapeHtml(src)}" alt="">`).join("")}
            </div>
          ` : ""}

          <div style="margin-top:22px;">
            <a class="btn" href="#/progetti">← Torna ai progetti</a>
          </div>
        </section>
      `;
    } catch (e) {
      appEl.innerHTML = `
        <section class="container section">
          <h2 class="section-title">Errore</h2>
          <p class="section-text">${escapeHtml(String(e.message || e))}</p>
        </section>
      `;
    }
  }

  function route() {
    const parts = parseRoute(); // [] or ["progetti"] or ["project","id"]
    const [a, b] = parts;

    if (!a) {
      renderHome();
      return;
    }

    if (a === "chi-siamo") {
      setActiveNav("chi-siamo");
      scrollToTop();
      renderSimplePage("about_title", "Pagina in costruzione (testo temporaneo).");
      return;
    }

    if (a === "progetti") {
      setActiveNav("progetti");
      scrollToTop();
      renderHome();
      return;
    }

    if (a === "contenuti") {
      setActiveNav("contenuti");
      scrollToTop();
      renderSimplePage("content_title", "Pagina contenuti (placeholder).");
      return;
    }

    if (a === "contatti") {
      setActiveNav("contatti");
      scrollToTop();
      renderSimplePage("contacts_title", "Contatti (placeholder).");
      return;
    }

    if (a === "project" && b) {
      renderProjectDetail(b);
      return;
    }

    renderHome();
  }

  function init() {
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // ✅ header: logo grande in alto, poi si riduce quando scrolli
    const header = document.getElementById("siteHeader");
    const onScroll = () => {
      if (!header) return;
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // lingua iniziale
    const lang = getLang();
    updateLangUI(lang);

    // bottone lingua: cicla IT -> EN -> PT -> ES
    if (langBtn) {
      langBtn.addEventListener("click", () => {
        const curr = getLang();
        setLang(nextLang(curr));
      });
    }

    // route
    window.addEventListener("hashchange", route);
    route();
  }

  document.addEventListener("DOMContentLoaded", init);
})();