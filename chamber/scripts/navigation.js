const btn = document.getElementById("menuBtn");
const nav = document.getElementById("navMenu");

btn.addEventListener("click", () => {
  nav.classList.toggle("open");
});