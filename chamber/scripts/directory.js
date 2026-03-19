const url = "data/members.json";
const container = document.getElementById("membersContainer");

async function getMembers() {
  const response = await fetch(url);
  const data = await response.json();
  displayMembers(data);
}

function displayMembers(members) {
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit</a>
    `;

    container.appendChild(card);
  });
}

/* VIEW SWITCH */
document.getElementById("gridView").onclick = () => {
  container.classList.add("grid");
  container.classList.remove("list");
};

document.getElementById("listView").onclick = () => {
  container.classList.add("list");
  container.classList.remove("grid");
};

getMembers();