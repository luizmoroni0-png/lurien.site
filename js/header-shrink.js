document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header-absolute");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});
