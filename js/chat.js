"use strict";

/*
  chat.js
  - Chat opzionale
  - Non blocca mai il sito
  - Nessuna dipendenza esterna
  - Pronta per IA futura
*/

document.addEventListener("DOMContentLoaded", () => {

  const chat = document.getElementById("chat-container");
  const closeBtn = chat?.querySelector("[data-action='close-chat']");
  const form = document.getElementById("chat-form");
  const messages = document.getElementById("chat-messages");
  const input = form?.querySelector("input");

  // se manca qualcosa → esce senza errori
  if (!chat || !form || !messages || !input) return;

  // mostra chat automaticamente (puoi cambiarlo in futuro)
  chat.removeAttribute("hidden");

  function addMessage(text, type = "bot") {
    const msg = document.createElement("div");
    msg.className = `chat-message chat-${type}`;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  // messaggio iniziale
  addMessage("Ciao 👋 Posso aiutarti?");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const value = input.value.trim();
    if (!value) return;

    addMessage(value, "user");
    input.value = "";

    // risposta simulata (placeholder IA)
    setTimeout(() => {
      addMessage("Grazie per il messaggio. A breve potrai parlare con la nostra IA.");
    }, 600);
  });

  // chiusura chat
  closeBtn?.addEventListener("click", () => {
    chat.setAttribute("hidden", "");
  });

});
