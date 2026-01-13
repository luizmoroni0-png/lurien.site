(function () {
  const toggle = document.getElementById("langToggle");
  const menu = document.getElementById("langMenu");
  const codeEl = document.getElementById("langCode");
  const flagEl = document.getElementById("langFlag");

  const DICT = {
    it: {
      "nav.about": "Chi siamo",
      "nav.projects": "Progetti",
      "nav.contacts": "Contatti",
      "hero.tagline": "Dove i tuoi sogni prendono forma",

      "about.title": "Chi siamo",
      "about.desc": "Un team orientato a qualità, design e realizzazione concreta.",
      "about.card1.title": "Visione",
      "about.card1.text": "Creiamo spazi moderni e funzionali, con un’estetica curata e un processo chiaro.",
      "about.card2.title": "Qualità",
      "about.card2.text": "Attenzione ai dettagli, materiali e scelte coerenti con budget e obiettivi.",
      "about.card3.title": "Affidabilità",
      "about.card3.text": "Pianificazione e comunicazione costante: meno sorprese, più controllo.",

      "projects.title": "Progetti",
      "projects.desc": "Alcuni esempi di lavori e concept.",
      "projects.meta.residential": "Residenziale",
      "projects.next.title": "Prossimo progetto",
      "projects.next.meta": "Coming soon",

      "footer.slogan": "Dove i tuoi sogni prendono forma",
      "footer.badge1": "Design Premium",
      "footer.badge2": "Costruzione",
      "footer.badge3": "Sviluppo",
      "footer.contactTitle": "Contatti",
      "footer.emailLabel": "Email:",
      "footer.whatsLabel": "WhatsApp:",
      "footer.hoursLabel": "Orari:",
      "footer.hoursValue": "Lun–Ven 09:00–18:00",
      "footer.whatsButton": "Contact on WhatsApp",
      "footer.socialTitle": "Social",
      "footer.companyTitle": "Azienda",
      "footer.backTop": "Torna su"
    },

    pt: {
      "nav.about": "Quem somos",
      "nav.projects": "Projetos",
      "nav.contacts": "Contato",
      "hero.tagline": "Onde seus sonhos ganham forma",

      "about.title": "Quem somos",
      "about.desc": "Uma equipe focada em qualidade, design e entrega real.",
      "about.card1.title": "Visão",
      "about.card1.text": "Criamos espaços modernos e funcionais, com estética refinada e processo claro.",
      "about.card2.title": "Qualidade",
      "about.card2.text": "Atenção aos detalhes, materiais e escolhas alinhadas ao orçamento e objetivos.",
      "about.card3.title": "Confiabilidade",
      "about.card3.text": "Planejamento e comunicação constante: menos surpresas, mais controle.",

      "projects.title": "Projetos",
      "projects.desc": "Alguns exemplos de trabalhos e conceitos.",
      "projects.meta.residential": "Residencial",
      "projects.next.title": "Próximo projeto",
      "projects.next.meta": "Em breve",

      "footer.slogan": "Onde seus sonhos ganham forma",
      "footer.badge1": "Design Premium",
      "footer.badge2": "Construção",
      "footer.badge3": "Desenvolvimento",
      "footer.contactTitle": "Contato",
      "footer.emailLabel": "Email:",
      "footer.whatsLabel": "WhatsApp:",
      "footer.hoursLabel": "Horário:",
      "footer.hoursValue": "Seg–Sex 09:00–18:00",
      "footer.whatsButton": "Contact on WhatsApp",
      "footer.socialTitle": "Social",
      "footer.companyTitle": "Empresa",
      "footer.backTop": "Voltar ao topo"
    },

    en: {
      "nav.about": "About",
      "nav.projects": "Projects",
      "nav.contacts": "Contact",
      "hero.tagline": "Where your dreams take shape",

      "about.title": "About",
      "about.desc": "A team focused on quality, design, and real delivery.",
      "about.card1.title": "Vision",
      "about.card1.text": "We create modern, functional spaces with refined aesthetics and a clear process.",
      "about.card2.title": "Quality",
      "about.card2.text": "Attention to detail, materials, and choices aligned with budget and goals.",
      "about.card3.title": "Reliability",
      "about.card3.text": "Planning and constant communication: fewer surprises, more control.",

      "projects.title": "Projects",
      "projects.desc": "A few examples of work and concepts.",
      "projects.meta.residential": "Residential",
      "projects.next.title": "Next project",
      "projects.next.meta": "Coming soon",

      "footer.slogan": "Where your dreams take shape",
      "footer.badge1": "Premium Design",
      "footer.badge2": "Construction",
      "footer.badge3": "Development",
      "footer.contactTitle": "Contact",
      "footer.emailLabel": "Email:",
      "footer.whatsLabel": "WhatsApp:",
      "footer.hoursLabel": "Hours:",
      "footer.hoursValue": "Mon–Fri 09:00–18:00",
      "footer.whatsButton": "Contact on WhatsApp",
      "footer.socialTitle": "Social",
      "footer.companyTitle": "Company",
      "footer.backTop": "Back to top"
    }
  };

  function openMenu() {
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function t(lang, key) {
    return (DICT[lang] && DICT[lang][key]) || (DICT.it && DICT.it[key]) || "";
  }

  function applyTranslations(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = t(lang, key);
      if (value) el.textContent = value;
    });

    // Title (opzionale ma utile)
    if (lang === "pt") document.title = "Lurien Incorporadora";
    if (lang === "en") document.title = "Lurien Incorporadora";
    if (lang === "it") document.title = "Lurien Incorporadora";
  }

  function setLang(lang, flag) {
    codeEl.textContent = (lang || "it").toUpperCase();
    flagEl.textContent = flag || "🇮🇹";
    localStorage.setItem("site_lang", lang);
    localStorage.setItem("site_flag", flag || "🇮🇹");
    applyTranslations(lang);
  }

  // Init
  const savedLang = localStorage.getItem("site_lang") || "it";
  const savedFlag = localStorage.getItem("site_flag") || (savedLang === "pt" ? "🇧🇷" : savedLang === "en" ? "🇺🇸" : "🇮🇹");
  setLang(savedLang, savedFlag);

  // Menu actions
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.contains("is-open") ? closeMenu() : openMenu();
  });

  document.addEventListener("click", () => closeMenu());

  menu.addEventListener("click", (e) => {
    const btn = e.target.closest(".lang-item");
    if (!btn) return;
    setLang(btn.dataset.lang, btn.dataset.flag);
    closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();