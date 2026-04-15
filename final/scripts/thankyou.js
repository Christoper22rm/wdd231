const params = new URLSearchParams(window.location.search);

const name = params.get("name");
const email = params.get("email");
const brand = params.get("brand");

const message = document.querySelector("#user-message");

if (name) {
  message.textContent = `Thanks ${name}! We received your message. We'll contact you at ${email}. You are interested in ${brand} vehicles.`;
} else {
  message.textContent = "Your form was submitted successfully.";
}