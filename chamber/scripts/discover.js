// js/discover.js
import { items } from "./data/items.mjs";

// Render cards into pre-existing article slots (.area-a1 ... .area-a8)
const slots = document.querySelectorAll(".discover-grid .card");

items.slice(0, 8).forEach((item, i) => {
  const slot = slots[i];
  slot.innerHTML = `
    <figure>
      <img src="${item.image}" width="300" height="200" alt="${item.title}">
      <figcaption class="sr-only">${item.title}</figcaption>
    </figure>
    <div class="card-content">
      <h2>${item.title}</h2>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <a class="button" href="${item.link}" target="_blank" rel="noopener">Learn more</a>
    </div>
  `;
});

// Visit message with localStorage
const VISIT_KEY = "discoverLastVisit";
const visitEl = document.getElementById("visit-message");

function getDaysBetween(msThen, msNow) {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((msNow - msThen) / msPerDay);
}

const now = Date.now();
const last = localStorage.getItem(VISIT_KEY);

let message = "Welcome! Let us know if you have any questions.";
if (last) {
  const days = getDaysBetween(Number(last), now);
  if (days < 1) {
    message = "Back so soon! Awesome!";
  } else if (days === 1) {
    message = "You last visited 1 day ago.";
  } else {
    message = `You last visited ${days} days ago.`;
  }
}

// Display message and update storage
visitEl.textContent = message;
localStorage.setItem(VISIT_KEY, String(now));

// Footer info
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

