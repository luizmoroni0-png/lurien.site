/* ======================
   i18n (globale)
   - legge da: assets/data/i18n/{lang}.json
   - salva lingua in localStorage
   - applica testo a elementi con [data-i18n]
   - supporta chiavi tipo "nav.home"
====================== */

const LANG_KEY = "lurien-lang";

/* ✅ LINGUA DEFAULT = PORTOGHESE */
const DEFAULT_LANG = "pt";

function getRootPrefix() {
  // /index.html -> ""
  // /pages/projects.html -> "../"
  // /pages/vendita/villa-antonio.html -> "../../"
  const path = window.location.pathname || "";
  const parts = path.split("/").filter(Boolean);
  const depth = Math.max(0, parts.length - 1);
  return "../".repeat(depth);
}

function getByPath(obj, path) {
  return path
    .split(".")
    .reduce((acc, key) => (acc && acc[key] != null ? acc[key] : null), obj);
}

async function fetchDict(lang) {
  const prefix = getRootPrefix();
  const url = `${prefix}assets/data/i18n/${lang}.json`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`i18n file not found: ${url}`);
  return await res.json();
}

function applyDict(dict) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;

    const val = getByPath(dict, key);
    if (val == null) return;

    el.textContent = String(val);
  });
}

async function setLanguage(lang) {
  try {
    const dict = await fetchDict(lang);
    applyDict(dict);
    localStorage.setItem(LANG_KEY, lang);

    /* ✅ aggiorna anche <html lang=""> */
    document.documentElement.setAttribute("lang", lang);
  } catch (err) {
    console.warn(err);
  }
}

function initI18n() {
  const select = document.querySelector(".lang-select");

  /* ✅ se non c’è nulla salvato → PT */
  const saved = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;

  setLanguage(saved);

  if (!select) return;

  select.value = saved;

  select.addEventListener("change", e => {
    setLanguage(e.target.value);
  });
}

document.addEventListener("DOMContentLoaded", initI18n);
