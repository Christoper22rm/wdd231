import { places } from "../data/discover.mjs";

const container = document.getElementById("cards");

// MENU HAMBURGER
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// CREAR CARDS
places.forEach(place => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <h2>${place.name}</h2>
    <figure>
      <img src="${place.image}" alt="${place.name}" loading="lazy">
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button>More Info</button>
  `;

  container.appendChild(card);
});

// VISIT MESSAGE
const message = document.getElementById("visit-message");

const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  message.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const diff = now - lastVisit;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days < 1) {
    message.textContent = "Back so soon! Awesome!";
  } else if (days === 1) {
    message.textContent = "Your last visit was 1 day ago.";
  } else {
    message.textContent = `Your last visit was ${days} days ago.`;
  }
}

localStorage.setItem("lastVisit", now);

// FOOTER DATES (SIN INLINE JS)
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;