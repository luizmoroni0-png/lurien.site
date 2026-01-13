/* =========================================================
   LURIEN — app.js
   - Default language: EN
   - Header: Home hidden ONLY on homepage
   - Language dropdown: click OR hover (luxury effect in CSS)
   - Home: remove subtitle text (European Design...)
========================================================= */

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const appEl = $("#app");
  const yearEl = $("#year");
  const yearEl2 = $("#year2");

  const navHomeLink = $("#navHomeLink");
  const langBtn = $("#langBtn");
  const langMenu = $("#langMenu");
  const langDropdown = $("#langDropdown");

  const STORAGE_LANG = "lurien_lang";
  const LANGS = ["en", "it", "pt", "es"];

  const I18N = window.I18N || {};
  const TT = I18N.T || {};
  const t = (lang, key) =>
    (I18N.t ? I18N.t(lang, key) : ((TT[lang] && TT[lang][key]) || (TT.en && TT.en[key]) || key));

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (m) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[m]));
  }

  function getLang() {
    const saved = localStorage.getItem(STORAGE_LANG);
    return LANGS.includes(saved) ? saved : "en"; // ✅ default EN
  }

  function setLang(lang) {
    const safe = LANGS.includes(lang) ? lang : "en";
    localStorage.setItem(STORAGE_LANG, safe);
    updateLangUI(safe);
    applyI18n(safe);
    window.dispatchEvent(new CustomEvent("lurien:langchange", { detail: { lang: safe } }));
  }

  function langFlag(lang) {
    if (lang === "it") return "🇮🇹";
    if (lang === "pt") return "🇧🇷";
    if (lang === "es") return "🇪🇸";
    return "🇬🇧";
  }

  function updateLangUI(lang) {
    document.documentElement.lang = lang;

    if (langBtn) {
      const flagEl = $(".lang-flag", langBtn);
      const codeEl = $(".lang-code", langBtn);
      if (flagEl) flagEl.textContent = langFlag(lang);
      if (codeEl) codeEl.textContent = lang.toUpperCase();
      langBtn.setAttribute("aria-label", `Language: ${lang.toUpperCase()}`);
    }

    if (langMenu) {
      $$(".lang-item", langMenu).forEach((btn) => {
        const l = btn.getAttribute("data-lang");
        btn.setAttribute("aria-checked", l === lang ? "true" : "false");
      });
    }
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
      const aHref = (a.getAttribute("href") || "").replace(/\/$/, "");
      const on = aHref === href || aHref === `index.html${href}`;
      a.setAttribute("aria-current", on ? "page" : "false");
    });
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateHomeLinkVisibility(isHome) {
    if (!navHomeLink) return;
    navHomeLink.classList.toggle("nav-hidden", isHome);
    navHomeLink.setAttribute("aria-hidden", isHome ? "true" : "false");
    if (isHome) navHomeLink.setAttribute("tabindex", "-1");
    else navHomeLink.removeAttribute("tabindex");
  }

  async function fetchProjects() {
    const res = await fetch("assets/data/projects.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  function renderHome() {
    const lang = getLang();

    setActiveNav("");
    updateHomeLinkVisibility(true);

    appEl.innerHTML = `
      <section class="hero">
        <div class="container hero-inner">
          <h1 class="hero-title" data-i18n="hero_title">${escapeHtml(t(lang, "hero_title"))}</h1>
        </div>
      </section>

      <section class="container section">
        <h2 class="section-title" data-i18n="about_title">${escapeHtml(t(lang, "about_title"))}</h2>
        <p class="section-text" data-i18n="about_text">${escapeHtml(t(lang, "about_text"))}</p>
      </section>

      <section class="container section">
        <h2 class="section-title" data-i18n="projects_title">${escapeHtml(t(lang, "projects_title"))}</h2>
        <div id="projectsGrid" class="projects-grid">
          <div style="opacity:.7;" data-i18n="loading">${escapeHtml(t(lang, "loading"))}</div>
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

      if (!Array.isArray(projects) || projects.length === 0) {
        grid.innerHTML = `<div style="opacity:.8;" data-i18n="projects_empty">${escapeHtml(t(lang, "projects_empty"))}</div>`;
        applyI18n(lang);
        return;
      }

      grid.innerHTML = projects.map((p) => {
        const title = (p.title && (p.title[lang] || p.title.en || p.title.it)) || p.id;
        const cover = p.cover ? escapeHtml(p.cover) : "";
        const statusKey = p.status ? `status_${String(p.status).toLowerCase()}` : "";
        const statusText = statusKey ? t(lang, statusKey) : "";
        return `
          <a class="project-card" href="#/project/${escapeHtml(p.id)}">
            ${cover ? `<img src="${cover}" alt="${escapeHtml(title)}">` : ""}
            <div class="pc-body">
              <h3 class="pc-title">${escapeHtml(title)}</h3>
              <p class="pc-meta">${escapeHtml(statusText)}</p>
            </div>
          </a>
        `;
      }).join("");
    } catch (e) {
      grid.innerHTML = `<div style="opacity:.85;">${escapeHtml(t(lang, "load_projects_error"))} ${escapeHtml(e.message || e)}</div>`;
    }
  }

  function renderSimplePage(titleKey, textKey) {
    const lang = getLang();
    appEl.innerHTML = `
      <section class="container section">
        <h2 class="section-title" data-i18n="${titleKey}">${escapeHtml(t(lang, titleKey))}</h2>
        <p class="section-text" data-i18n="${textKey}">${escapeHtml(t(lang, textKey))}</p>
      </section>
    `;
    applyI18n(lang);
  }

  function renderProjectsPage() {
    const lang = getLang();

    appEl.innerHTML = `
      <section class="container section">
        <h2 class="section-title" data-i18n="projects_title">${escapeHtml(t(lang, "projects_title"))}</h2>
        <div id="projectsGrid" class="projects-grid">
          <div style="opacity:.7;" data-i18n="loading">${escapeHtml(t(lang, "loading"))}</div>
        </div>
      </section>
    `;

    applyI18n(lang);
    renderProjectsGrid();
  }

  async function renderProjectDetail(id) {
    const lang = getLang();
    setActiveNav("progetti");
    updateHomeLinkVisibility(false);
    scrollToTop();

    appEl.innerHTML = `
      <section class="container section">
        <h2 class="section-title" data-i18n="loading">${escapeHtml(t(lang, "loading"))}</h2>
        <p class="section-text" style="opacity:.75;">${escapeHtml(id)}</p>
      </section>
    `;

    try {
      const projects = await fetchProjects();
      const p = Array.isArray(projects) ? projects.find(x => x.id === id) : null;

      if (!p) {
        appEl.innerHTML = `
          <section class="container section">
            <h2 class="section-title">${escapeHtml(t(lang, "not_found"))}</h2>
            <p class="section-text">${escapeHtml(t(lang, "not_found"))}</p>
            <p><a class="btn" href="#/progetti">${escapeHtml(t(lang, "back"))}</a></p>
          </section>
        `;
        applyI18n(lang);
        return;
      }

      const title = (p.title && (p.title[lang] || p.title.en || p.title.it)) || p.id;
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
            <a class="btn" href="#/progetti">← ${escapeHtml(t(lang, "projects_title"))}</a>
          </div>
        </section>
      `;

      applyI18n(lang);
    } catch (e) {
      appEl.innerHTML = `
        <section class="container section">
          <h2 class="section-title">Error</h2>
          <p class="section-text">${escapeHtml(String(e.message || e))}</p>
        </section>
      `;
      applyI18n(lang);
    }
  }

  function route() {
    const parts = parseRoute();
    const [a, b] = parts;

    if (!a) {
      renderHome();
      return;
    }

    updateHomeLinkVisibility(false);

    if (a === "chi-siamo") {
      setActiveNav("chi-siamo");
      scrollToTop();
      renderSimplePage("about_title", "about_text");
      return;
    }

    if (a === "progetti") {
      setActiveNav("progetti");
      scrollToTop();
      renderProjectsPage();
      return;
    }

    if (a === "contenuti") {
      setActiveNav("contenuti");
      scrollToTop();
      renderSimplePage("content_title", "content_text");
      return;
    }

    if (a === "project" && b) {
      renderProjectDetail(b);
      return;
    }

    renderHome();
  }

  function openLangMenu() {
    if (!langBtn || !langMenu) return;
    langMenu.classList.add("open");
    langBtn.setAttribute("aria-expanded", "true");
  }

  function closeLangMenu() {
    if (!langBtn || !langMenu) return;
    langMenu.classList.remove("open");
    langBtn.setAttribute("aria-expanded", "false");
  }

  function toggleLangMenu() {
    if (!langMenu) return;
    if (langMenu.classList.contains("open")) closeLangMenu();
    else openLangMenu();
  }

  function initLangDropdown() {
    if (!langBtn || !langMenu || !langDropdown) return;

    // Click open/close
    langBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleLangMenu();
    });

    // Select language
    $$(".lang-item", langMenu).forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang") || "en";
        setLang(lang);
        closeLangMenu();
      });
    });

    // Click outside closes
    document.addEventListener("click", (e) => {
      if (!langDropdown.contains(e.target)) closeLangMenu();
    });

    // Escape closes
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLangMenu();
    });

    // ✅ Hover open (desktop)
    const canHover = window.matchMedia && window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    if (canHover) {
      let hoverTimer = null;
      langDropdown.addEventListener("mouseenter", () => {
        if (hoverTimer) clearTimeout(hoverTimer);
        openLangMenu();
      });
      langDropdown.addEventListener("mouseleave", () => {
        hoverTimer = setTimeout(() => closeLangMenu(), 120);
      });
    }
  }

  function init() {
    const y = String(new Date().getFullYear());
    if (yearEl) yearEl.textContent = y;
    if (yearEl2) yearEl2.textContent = y;

    // header glass on scroll
    const header = document.getElementById("siteHeader");
    const onScroll = () => {
      if (!header) return;
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // language init
    const lang = getLang();
    updateLangUI(lang);
    applyI18n(lang);

    initLangDropdown();

    // route
    window.addEventListener("hashchange", route);
    route();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
