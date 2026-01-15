(() => {
  // Supports both: <nav class="nav"> and <nav class="main-nav">
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('siteNav') || document.querySelector('nav.nav, nav.main-nav');

  if (!toggle || !nav) return;

  const setOpen = (isOpen) => {
    nav.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.documentElement.classList.toggle('nav-open', isOpen);
  };

  toggle.addEventListener('click', () => {
    setOpen(!nav.classList.contains('is-open'));
  });

  // Close on click any link inside nav (mobile/tablet previews)
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    setOpen(false);
  });

  // Close on resize to desktop-like widths
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) setOpen(false);
  });
})();