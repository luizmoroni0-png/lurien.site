"use strict";

document.addEventListener("DOMContentLoaded", () => {

  const grid = document.querySelector(".collaborators-grid");
  if (!grid) return;

  fetch("assets/data/collaborators.json")
    .then(res => res.json())
    .then(items => {

      items.forEach(c => {

        const link = document.createElement("a");
        link.href = c.website;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = "collaborator-card";

        const img = document.createElement("img");
        img.src = `assets/media/images/collaborators/${c.logo}`;
        img.alt = c.name;

        link.appendChild(img);
        grid.appendChild(link);

      });

    })
    .catch(err => {
      console.warn("Collaboratori non caricati:", err);
    });

});
