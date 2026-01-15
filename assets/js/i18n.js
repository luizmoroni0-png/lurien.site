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

      "about.bio.p1": "Lurien Incorporadora nasce con lo scopo di sviluppare progetti che uniscono architettura contemporanea, intelligenza costruttiva e valorizzazione immobiliare. Operando a Pará de Minas – MG, realizziamo progetti pensati per soddisfare un pubblico esigente, che cerca qualità, comfort e sicurezza in ogni dettaglio.",
      "about.bio.p2": "Con un'azione strategica e orientata da processi moderni e automatizzati, Lurien segue tutte le fasi dello sviluppo immobiliare — dall'analisi del terreno alla consegna dell'immobile — garantendo efficienza, trasparenza e un alto standard costruttivo.",
      "about.bio.p3": "I nostri progetti sono sviluppati con un focus su design funzionale, innovazione e potenziale di valorizzazione, sempre allineati alle tendenze del mercato e alle reali esigenze di vivere e investire bene. Lavoriamo con partner qualificati, tecnologia applicata alla gestione e uno sguardo attento al futuro urbano della città.",
      "about.bio.p4": "Crediamo che incorporare significhi pianificare con responsabilità, eseguire con eccellenza e offrire esperienze che generano valore duraturo.",

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
      "footer.phoneLabel": "Telefono:",
      "footer.landlineLabel": "Telefono fisso:",
      "footer.emailLabel": "Email:",
      "footer.addressLabel": "Indirizzo:",
      "footer.addressValue": "R. Antônio Carlos, 2071 - São Cristovao, Pará de Minas - MG, 35660-390",

      "footer.whatsLabel": "WhatsApp:",
      "footer.hoursLabel": "Orari:",
      "footer.hoursValue": "Lun–Gio 07:00–12:00 / 13:00–17:00 · Ven 07:00–12:00 / 13:00–16:00 · Sab–Dom Chiuso",
      "footer.whatsButton": "Contatta su WhatsApp",

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

      "about.bio.p1": "A Lurien Incorporadora nasce com o propósito de desenvolver empreendimentos que unem arquitetura contemporânea, inteligência construtiva e valorização imobiliária. Atuando em Pará de Minas – MG, entregamos projetos pensados para atender um público exigente, que busca qualidade, conforto e segurança em cada detalhe.",
      "about.bio.p2": "Com uma atuação estratégica e orientada por processos modernos e automatizados, a Lurien acompanha todas as etapas do desenvolvimento imobiliário — da análise do terreno à entrega do empreendimento — garantindo eficiência, transparência e alto padrão construtivo.",
      "about.bio.p3": "Nossos projetos são desenvolvidos com foco em design funcional, inovação e potencial de valorização, sempre alinhados às tendências do mercado e às necessidades reais de morar e investir bem. Trabalhamos com parceiros qualificados, tecnologia aplicada à gestão e um olhar atento ao futuro urbano da cidade.",
      "about.bio.p4": "Acreditamos que incorporar é planejar com responsabilidade, executar com excelência e entregar experiências que geram valor duradouro.",

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
      "footer.phoneLabel": "Telefone:",
      "footer.landlineLabel": "Telefone fixo:",
      "footer.emailLabel": "Email:",
      "footer.addressLabel": "Endereço:",
      "footer.addressValue": "R. Antônio Carlos, 2071 - São Cristovao, Pará de Minas - MG, 35660-390",

      "footer.whatsLabel": "WhatsApp:",
      "footer.hoursLabel": "Horário:",
      "footer.hoursValue": "Seg–Qui 07:00–12:00 / 13:00–17:00 · Sex 07:00–12:00 / 13:00–16:00 · Sáb–Dom Fechado",
      "footer.whatsButton": "Falar no WhatsApp",

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

      "about.bio.p1": "Lurien Incorporadora was born with the purpose of developing projects that combine contemporary architecture, constructive intelligence, and real estate appreciation. Operating in Pará de Minas – MG, we deliver projects designed to meet an exacting audience seeking quality, comfort, and safety in every detail.",
      "about.bio.p2": "With strategic action guided by modern and automated processes, Lurien monitors every stage of real estate development — from land analysis to project delivery — ensuring efficiency, transparency, and a high standard of construction.",
      "about.bio.p3": "Our projects are developed with a focus on functional design, innovation, and appreciation potential, always aligned with market trends and the real needs of living and investing well. We work with qualified partners, technology applied to management, and a keen eye on the city's urban future.",
      "about.bio.p4": "We believe that developing means planning with responsibility, executing with excellence, and delivering experiences that generate lasting value.",

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
      "footer.phoneLabel": "Phone:",
      "footer.landlineLabel": "Landline:",
      "footer.emailLabel": "Email:",
      "footer.addressLabel": "Address:",
      "footer.addressValue": "R. Antônio Carlos, 2071 - São Cristovao, Pará de Minas - MG, 35660-390",

      "footer.whatsLabel": "WhatsApp:",
      "footer.hoursLabel": "Hours:",
      "footer.hoursValue": "Mon–Thu 07:00–12:00 / 13:00–17:00 · Fri 07:00–12:00 / 13:00–16:00 · Sat–Sun Closed",
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
})()