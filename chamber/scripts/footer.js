// footer.js

// Año actual
const yearElement = document.getElementById("currentyear");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Última modificación
const lastModifiedElement = document.getElementById("lastModified");
if (lastModifiedElement) {
  lastModifiedElement.textContent = `Last Updated: ${document.lastModified}`;
}