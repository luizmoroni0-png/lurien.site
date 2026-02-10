(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function q(sel) { return document.querySelector(sel); }
  function qa(sel) { return document.querySelectorAll(sel); }

  function setText(sel, val) {
    var el = q(sel);
    if (!el) return;
    el.textContent = val;
  }

  function setHTML(sel, val) {
    var el = q(sel);
    if (!el) return;
    el.innerHTML = val;
  }

  function setNodeText(el, val) {
    if (!el) return;
    el.textContent = val;
  }

  function applyCards(t) {
    var cards = qa(".identity-right .identity-card");
    if (!cards || cards.length < 4) return;

    for (var i = 0; i < 4; i++) {
      var h3 = cards[i].querySelector("h3");
      var p = cards[i].querySelector("p");
      if (h3) h3.textContent = t.cards[i].h3;
      if (p) p.textContent = t.cards[i].p;
    }
  }

  var I18N = {
    it: {
      homeNav: ["Chi siamo", "Progetti", "Contatti"],
      proNav: ["Vendita", "Venduti", "Concepts", "Contatto"],

      heroSub: "Dove i tuoi sogni prendono forma",
      projectsHeroSub: "Selezione dei nostri lavori",

      identityH2: "Lurien Incorporadora",
      identityP: [
        "Lurien Incorporadora nasce con l’obiettivo di sviluppare iniziative che uniscono architettura contemporanea, intelligenza costruttiva e valorizzazione immobiliare. Operando a Pará de Minas – MG, realizziamo progetti pensati per un pubblico esigente, che cerca qualità, comfort e sicurezza in ogni dettaglio.",
        "Con un approccio strategico e guidato da processi moderni e automatizzati, Lurien segue tutte le fasi dello sviluppo immobiliare — dall’analisi del terreno alla consegna dell’impresa — garantendo efficienza, trasparenza e uno standard costruttivo elevato.",
        "I nostri progetti sono sviluppati con focus su design funzionale, innovazione e potenziale di valorizzazione, sempre allineati alle tendenze del mercato e alle esigenze reali dell’abitare e dell’investire bene. Lavoriamo con partner qualificati, tecnologia applicata alla gestione e uno sguardo attento al futuro urbano della città."
      ],
      identityQuote:
        "Crediamo che costruire significhi pianificare con responsabilità, eseguire con eccellenza e consegnare esperienze che generano valore duraturo.",
      tags: [
        "Innovazione nella costruzione residenziale.",
        "Case moderne, progetti unici.",
        "Trasformiamo idee in case reali."
      ],

      cards: [
        { h3: "Architettura contemporanea", p: "Progetti con design funzionale, estetica pulita e soluzioni intelligenti per vivere meglio." },
        { h3: "Processi moderni", p: "Fasi automatizzate e gestione chiara per maggiore efficienza, tempi migliori e trasparenza." },
        { h3: "Comfort e sicurezza", p: "Dettagli pensati per un pubblico esigente: qualità di opera, materiali ed esecuzione." },
        { h3: "Valorizzazione immobiliare", p: "Progetti allineati al mercato e al futuro urbano, con alto potenziale di valorizzazione." }
      ],

      projectsTitle: "Progetti",
      ctaTitle: "Parliamo del tuo progetto",
      ctaSub: "Contattaci per informazioni o collaborazioni",
      ctaBtn: "Contatto",

      footerAddrTitle: "INDIRIZZO",
      footerContactsTitle: "CONTATTI",
      footerTel1: "Telefono: +55 37 99976-0175",
      footerTel2: "Telefono fisso: +55 37 3237-1396",
      footerEmailLabel: "Email:"
    },

    pt: {
      homeNav: ["Quem somos", "Projetos", "Contato"],
      proNav: ["À venda", "Vendidos", "Concepts", "Contato"],

      heroSub: "Onde seus sonhos ganham forma",
      projectsHeroSub: "Seleção dos nossos trabalhos",

      identityH2: "Lurien Incorporadora",
      identityP: [
        "A Lurien Incorporadora nasce com o propósito de desenvolver empreendimentos que unem arquitetura contemporânea, inteligência construtiva e valorização imobiliária. Atuando em Pará de Minas – MG, entregamos projetos pensados para atender um público exigente, que busca qualidade, conforto e segurança em cada detalhe.",
        "Com uma atuação estratégica e orientada por processos modernos e automatizados, a Lurien acompanha todas as etapas do desenvolvimento imobiliário — da análise do terreno à entrega do empreendimento — garantindo eficiência, transparência e alto padrão construtivo.",
        "Nossos projetos são desenvolvidos com foco em design funcional, inovação e potencial de valorização, sempre alinhados às tendências do mercado e às necessidades reais de morar e investir bem. Trabalhamos com parceiros qualificados, tecnologia aplicada à gestão e um olhar atento ao futuro urbano da cidade."
      ],
      identityQuote:
        "Acreditamos que incorporar é planejar com responsabilidade, executar com excelência e entregar experiências que geram valor duradouro.",
      tags: [
        "Inovação em construção residencial.",
        "Casas modernas, projetos únicos.",
        "Transformando ideias em lares reais."
      ],

      cards: [
        { h3: "Arquitetura contemporânea", p: "Projetos com design funcional, estética limpa e soluções inteligentes para morar melhor." },
        { h3: "Processos modernos", p: "Etapas automatizadas e gestão clara para mais eficiência, prazos melhores e transparência." },
        { h3: "Conforto e segurança", p: "Detalhes pensados para um público exigente: qualidade de obra, materiais e execução." },
        { h3: "Valorização imobiliária", p: "Projetos alinhados ao mercado e ao futuro urbano, com alto potencial de valorização." }
      ],

      projectsTitle: "Projetos",
      ctaTitle: "Vamos falar do seu projeto",
      ctaSub: "Entre em contato para informações ou parcerias",
      ctaBtn: "Contato",

      footerAddrTitle: "ENDEREÇO",
      footerContactsTitle: "CONTATOS",
      footerTel1: "Telefone: +55 37 99976-0175",
      footerTel2: "Telefone fixo: +55 37 3237-1396",
      footerEmailLabel: "Email:"
    },

    en: {
      homeNav: ["About", "Projects", "Contact"],
      proNav: ["For sale", "Sold", "Concepts", "Contact"],

      heroSub: "Where your dreams take shape",
      projectsHeroSub: "A selection of our work",

      identityH2: "Lurien Incorporadora",
      identityP: [
        "Lurien Incorporadora was created to develop projects that combine contemporary architecture, smart construction, and real estate appreciation. Operating in Pará de Minas – MG, we deliver developments designed for a demanding audience seeking quality, comfort, and safety in every detail.",
        "With a strategic approach supported by modern and automated processes, Lurien follows every stage of real estate development — from land analysis to delivery — ensuring efficiency, transparency, and high construction standards.",
        "Our projects focus on functional design, innovation, and value potential, aligned with market trends and real needs for living and investing well. We work with qualified partners, management technology, and a close eye on the city’s urban future."
      ],
      identityQuote:
        "We believe that developing means planning responsibly, executing with excellence, and delivering experiences that create lasting value.",
      tags: [
        "Innovation in residential construction.",
        "Modern homes, unique projects.",
        "Turning ideas into real homes."
      ],

      cards: [
        { h3: "Contemporary architecture", p: "Functional design, clean aesthetics, and smart solutions for better living." },
        { h3: "Modern processes", p: "Automated steps and clear management for higher efficiency, better timelines, and transparency." },
        { h3: "Comfort & safety", p: "Details built for a demanding audience: workmanship, materials, and execution quality." },
        { h3: "Real estate value", p: "Market-aligned projects focused on the city’s future, with strong appreciation potential." }
      ],

      projectsTitle: "Projects",
      ctaTitle: "Let’s talk about your project",
      ctaSub: "Contact us for information or partnerships",
      ctaBtn: "Contact",

      footerAddrTitle: "ADDRESS",
      footerContactsTitle: "CONTACT",
      footerTel1: "Phone: +55 37 99976-0175",
      footerTel2: "Landline: +55 37 3237-1396",
      footerEmailLabel: "Email:"
    }
  };

  function applyLang(lang) {
    var t = I18N[lang] || I18N.it;

    // salva scelta
    try { localStorage.setItem("lurien_lang", lang); } catch (e) {}

    // aggiorna select (se c'è)
    var sel = q(".lang-select");
    if (sel) sel.value = lang;

    // NAV: HOME (3 voci)
    var navLinks = qa(".nav-primary a");
    if (navLinks && navLinks.length === 3) {
      setNodeText(navLinks[0], t.homeNav[0]);
      setNodeText(navLinks[1], t.homeNav[1]);
      setNodeText(navLinks[2], t.homeNav[2]);
    }

    // NAV: PROGETTI / ALTRE PAGINE (4 voci)
    if (navLinks && navLinks.length === 4) {
      setNodeText(navLinks[0], t.proNav[0]);
      setNodeText(navLinks[1], t.proNav[1]);
      setNodeText(navLinks[2], t.proNav[2]);
      setNodeText(navLinks[3], t.proNav[3]);
    }

    // HERO subtitle (home + progetti)
    var heroP = q(".hero-content p");
    var heroH1 = q(".hero-content h1");
    if (heroP && heroH1) {
      var h1 = (heroH1.textContent || "").trim().toUpperCase();
      // se la pagina è PROGETTI (h1 diverso da LURIEN)
      if (h1 === "PROGETTI" || h1 === "PROJECTS" || h1 === "PROJETOS") {
        setNodeText(heroP, t.projectsHeroSub);
        setNodeText(heroH1, t.projectsTitle.toUpperCase());
      } else {
        setNodeText(heroP, t.heroSub);
      }
    }

    // IDENTITY (solo se esiste)
    if (q("#identity")) {
      setText("#identity .identity-left h2", t.identityH2);

      var ps = qa("#identity .identity-left p");
      if (ps && ps.length >= 3) {
        ps[0].textContent = t.identityP[0];
        ps[1].textContent = t.identityP[1];
        ps[2].textContent = t.identityP[2];
      }

      setText("#identity .identity-left blockquote", t.identityQuote);

      var tags = qa("#identity .identity-tags span");
      if (tags && tags.length >= 3) {
        tags[0].textContent = t.tags[0];
        tags[1].textContent = t.tags[1];
        tags[2].textContent = t.tags[2];
      }

      applyCards(t);
    }

    // TITOLI SEZIONI
    var proH2 = q(".projects-dark h2");
    if (proH2) proH2.textContent = t.projectsTitle;

    // CTA
    if (q("#cta")) {
      setText("#cta h2", t.ctaTitle);
      setText("#cta p", t.ctaSub);
      var btn = q("#cta .cta-button");
      if (btn) btn.textContent = t.ctaBtn;
    }

    // FOOTER (se esiste)
    if (q(".footer-home")) {
      var footerH3 = qa(".footer-home .footer-block h3");
      var footerP = qa(".footer-home .footer-block p");

      if (footerH3 && footerH3.length >= 1) footerH3[0].textContent = t.footerAddrTitle;

      // CONTATTI: nel tuo footer attuale ci sono 2 h3 (indirizzo + contatti)
      if (footerH3 && footerH3.length >= 2) footerH3[1].textContent = t.footerContactsTitle;

      // Nel tuo footer attuale: p[0]=indirizzo, p[1]=contatti
      // indirizzo non lo tocco (contiene <br>)
      // contatti: ricostruisco solo le etichette mantenendo mail link
      if (footerP && footerP.length >= 2) {
        // p[0] indirizzo: resta com'è (no cambio)
        // p[1] contatti: aggiorno le prime righe e l'etichetta Email
        var mailA = footerP[1].querySelector('a[href^="mailto:"]');
        var mailHTML = mailA ? mailA.outerHTML : "";
        footerP[1].innerHTML =
          t.footerTel1 + "<br>" +
          t.footerTel2 + "<br>" +
          t.footerEmailLabel + " " +
          mailHTML;
      }
    }
  }

  function initLang() {
    var sel = q(".lang-select");
    var saved = null;
    try { saved = localStorage.getItem("lurien_lang"); } catch (e) {}
    var lang = saved || (sel && sel.value) || "it";

    // se nel select ci sono value pt/it/en, setto
    if (sel) {
      sel.value = lang;
      sel.addEventListener("change", function () {
        applyLang(sel.value || "it");
      });
    }

    applyLang(lang);
  }

  function initReveal() {
    var cards = qa(".identity-card");
    if (!cards || !cards.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    cards.forEach(function (card) {
      observer.observe(card);
    });
  }

  ready(function () {
    initReveal();
    initLang();
  });
})();
