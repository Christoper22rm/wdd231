const courses = [
  { code: "WDD 130", category: "WDD", credits: 2, completed: true },
  { code: "WDD 131", category: "WDD", credits: 2, completed: true },
  { code: "WDD 231", category: "WDD", credits: 2, completed: false },
  { code: "CSE 111", category: "CSE", credits: 2, completed: false }
];

const container = document.getElementById("courseContainer");
const total = document.getElementById("totalCredits");

function displayCourses(list) {
  container.innerHTML = "";

  list.forEach(course => {
    const div = document.createElement("div");
    div.textContent = course.code;

    if (course.completed) div.classList.add("completed");

    container.appendChild(div);
  });

  const credits = list.reduce((sum, c) => sum + c.credits, 0);
  total.textContent = `Total Credits: ${credits}`;
}

function filterCourses(type) {
  if (type === "all") displayCourses(courses);
  else displayCourses(courses.filter(c => c.category === type));
}

displayCourses(courses);