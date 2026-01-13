(function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = (form.elements["name"]?.value || "").trim();
    const contact = (form.elements["contact"]?.value || "").trim();
    const message = (form.elements["message"]?.value || "").trim();

    if (!name || !contact || !message) return;

    const to = "luizmoroni0@gmail.com";
    const subject = encodeURIComponent(`[LURIEN] Richiesta da ${name}`);
    const body = encodeURIComponent(
      `Nome: ${name}\n` +
      `Contatto: ${contact}\n\n` +
      `Messaggio:\n${message}\n`
    );

    // apre client email (Gmail app / Mail / ecc.)
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
})();