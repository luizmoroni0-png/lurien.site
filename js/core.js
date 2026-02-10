"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MENU MOBILE
  ========================= */
  const toggleBtn = document.querySelector("[data-action='toggle-menu']");
  const mobileNav = document.getElementById("nav-mobile");

  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = !mobileNav.hasAttribute("hidden");
      mobileNav.toggleAttribute("hidden");
      toggleBtn.setAttribute("aria-expanded", String(!isOpen));
    });
  }

  if (mobileNav) {
    mobileNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileNav.setAttribute("hidden", "");
        if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =========================
     LINK ESTERNI SICURI
  ========================= */
  document.querySelectorAll("a[data-external]").forEach(link => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  /* =========================
     COLLABORATORI
  ========================= */
  const grid = document.querySelector(".collaborators-grid");

  if (grid) {
    fetch("assets/data/collaborators.json")
      .then(res => res.json())
      .then(data => {
        data.forEach(item => {
          const link = document.createElement("a");
          link.href = item.website;
          link.setAttribute("data-external", "");
          link.className = "collaborator";

          const img = document.createElement("img");
          img.src = `assets/media/images/collaborators/${item.logo}`;
          img.alt = item.name;

          link.appendChild(img);
          grid.appendChild(link);
        });
      })
      .catch(err => {
        console.warn("Collaboratori non caricati:", err);
      });
  }

});
