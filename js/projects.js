"use strict";

document.addEventListener("DOMContentLoaded", () => {

  const grid = document.querySelector(".projects-grid");
  if (!grid) return;

  fetch("assets/data/projects.json")
    .then(res => res.json())
    .then(projects => {
      projects.forEach(p => {

        const card = document.createElement("a");
        card.href = p.link;
        card.className = "project-card";

        const img = document.createElement("img");
        img.src = `assets/media/images/${p.image}`;
        img.alt = p.title;

        const title = document.createElement("h3");
        title.textContent = p.title;

        card.appendChild(img);
        card.appendChild(title);
        grid.appendChild(card);

      });
    })
    .catch(err => {
      console.error("Errore progetti:", err);
    });

});
