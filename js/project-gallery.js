/* ======================
   CONFIG (EDITA SOLO QUI)
====================== */
const PROJECT_FOLDER = "../../assets/media/images/projects/vendita/villa-antonio/gallery/";
const IMAGES = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg"
];

/* ======================
   ELEMENTI
====================== */
const grid = document.getElementById("galleryGrid");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCounter = document.getElementById("lightboxCounter");
const thumbsWrap = document.getElementById("lightboxThumbs");

const btnClose = document.getElementById("lightboxClose");
const btnPrev = document.getElementById("lightboxPrev");
const btnNext = document.getElementById("lightboxNext");

let currentIndex = 0;

/* ======================
   GRID (4 per riga lo fa il CSS)
====================== */
function renderGrid() {
  if (!grid) return;
  grid.innerHTML = "";

  IMAGES.forEach((file, idx) => {
    const card = document.createElement("div");
    card.className = "gallery-item";

    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = PROJECT_FOLDER + file;
    img.alt = "Villa Antonio - Foto " + (idx + 1);

    card.appendChild(img);
    card.addEventListener("click", () => openLightbox(idx));

    grid.appendChild(card);
  });
}

/* ======================
   THUMBS CRONOLOGICHE
====================== */
function renderThumbs() {
  if (!thumbsWrap) return;
  thumbsWrap.innerHTML = "";

  IMAGES.forEach((file, idx) => {
    const t = document.createElement("img");
    t.src = PROJECT_FOLDER + file;
    if (idx === currentIndex) t.classList.add("active");
    t.alt = "Thumb " + (idx + 1);

    t.addEventListener("click", () => {
      currentIndex = idx;
      updateLightbox();
    });

    thumbsWrap.appendChild(t);
  });
}

/* ======================
   LIGHTBOX
====================== */
function openLightbox(idx) {
  currentIndex = idx;
  updateLightbox();
  renderThumbs();

  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateLightbox() {
  const file = IMAGES[currentIndex];
  lightboxImg.src = PROJECT_FOLDER + file;
  lightboxImg.alt = "Villa Antonio - Foto " + (currentIndex + 1);
  lightboxCounter.textContent = `${currentIndex + 1} / ${IMAGES.length}`;
  renderThumbs();
}

function prev() {
  currentIndex = (currentIndex - 1 + IMAGES.length) % IMAGES.length;
  updateLightbox();
}

function next() {
  currentIndex = (currentIndex + 1) % IMAGES.length;
  updateLightbox();
}

/* ======================
   EVENTI
====================== */
btnClose.addEventListener("click", closeLightbox);
btnPrev.addEventListener("click", prev);
btnNext.addEventListener("click", next);

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") prev();
  if (e.key === "ArrowRight") next();
});

/* click fuori = chiudi */
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

renderGrid();
