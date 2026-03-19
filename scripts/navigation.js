const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");

  menuBtn.textContent = navMenu.classList.contains("open") ? "✖" : "☰";
});