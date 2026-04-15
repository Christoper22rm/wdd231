// ==============================
// SELECTORES (CON VALIDACIÓN)
// ==============================
const container = document.querySelector("#cars-container");
const modal = document.querySelector("#car-modal");
const modalContent = document.querySelector("#modal-body");
const closeModalBtn = document.querySelector("#close-modal");

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

// ==============================
// NAV MENU (SAFE)
// ==============================
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// ==============================
// FETCH DATA (TRY/CATCH ✔)
// ==============================
async function getCars() {
  // Si no existe el contenedor, no ejecutar
  if (!container) return;

  try {
    const response = await fetch("data/cars.json");

    if (!response.ok) {
      throw new Error("Error loading data");
    }

    const data = await response.json();

    displayCars(data);

  } catch (error) {
    console.error("Fetch error:", error);
    container.innerHTML = "<p>Failed to load cars data.</p>";
  }
}

// ==============================
// DISPLAY CARS (ARRAY METHOD ✔)
// ==============================
function displayCars(cars) {
  container.innerHTML = "";

  cars.forEach(car => {

    const card = document.createElement("div");
    card.classList.add("car-card");

    card.innerHTML = `
      <img src="${car.image}" alt="${car.name}" loading="lazy">

      <div class="car-info">
        <h2>${car.name}</h2>
        <p><strong>Brand:</strong> ${car.brand}</p>
        <p><strong>Range:</strong> ${car.range} km</p>
        <p><strong>Price:</strong> $${car.price}</p>

        <div class="car-buttons">
          <button class="details-btn">More Info</button>
          <button class="fav-btn">⭐ Save</button>
        </div>
      </div>
    `;

    // ==============================
    // EVENTOS
    // ==============================
    const detailsBtn = card.querySelector(".details-btn");
    const favBtn = card.querySelector(".fav-btn");

    if (detailsBtn) {
      detailsBtn.addEventListener("click", () => {
        openModal(car);
      });
    }

    if (favBtn) {
      favBtn.addEventListener("click", () => {
        saveFavorite(car);
      });
    }

    container.appendChild(card);
  });
}

// ==============================
// MODAL FUNCTION (SAFE)
// ==============================
function openModal(car) {
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <h2>${car.name}</h2>
    <img src="${car.image}" alt="${car.name}">
    <p><strong>Brand:</strong> ${car.brand}</p>
    <p><strong>Range:</strong> ${car.range} km</p>
    <p><strong>Price:</strong> $${car.price}</p>
    <p>${car.description}</p>
  `;

  modal.showModal();
}

// ==============================
// CLOSE MODAL (SAFE ✔)
// ==============================
if (closeModalBtn && modal) {
  closeModalBtn.addEventListener("click", () => {
    modal.close();
  });
}

// CLICK FUERA DEL MODAL
if (modal) {
  modal.addEventListener("click", (e) => {
    const rect = modal.getBoundingClientRect();

    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      modal.close();
    }
  });
}

// ==============================
// LOCAL STORAGE ✔
// ==============================
function saveFavorite(car) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const exists = favorites.some(item => item.name === car.name);

  if (!exists) {
    favorites.push(car);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`${car.name} saved!`);
  } else {
    alert("Already saved!");
  }
}

// ==============================
// INIT
// ==============================
getCars();