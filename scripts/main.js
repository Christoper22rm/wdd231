document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('open');
  });

  const yearSpan = document.getElementById('year');
  const now = new Date();
  yearSpan.textContent = now.getFullYear();

  const lastModifiedEl = document.getElementById('lastModified');
  lastModifiedEl.textContent = document.lastModified || 'Unknown';

  const courses = [
    { id: 1, code: 'WDD131', title: 'Introduction to Web Development', credits: 3, category: 'WDD', completed: true },
    { id: 2, code: 'WDD231', title: 'Web Frontend Developer 1', credits: 4, category: 'WDD', completed: false },
    { id: 3, code: 'CSE120', title: 'Computer Science Basics', credits: 3, category: 'CSE', completed: true },
    { id: 4, code: 'CSE210', title: 'Data Structures', credits: 4, category: 'CSE', completed: false },
    { id: 5, code: 'WDD241', title: 'Responsive Design', credits: 2, category: 'WDD', completed: true },
  ];

  const coursesGrid = document.getElementById('coursesGrid');
  const creditsCount = document.getElementById('creditsCount');
  const filterButtons = document.querySelectorAll('.filter-btn');

  function renderCourses(filter = 'all') {
    const filtered = courses.filter(course => {
      if (filter === 'all') return true;
      return course.category === filter;
    });

    coursesGrid.innerHTML = '';
    filtered.forEach(course => {
      const card = document.createElement('article');
      card.className = 'course ' + (course.completed ? 'completed' : 'not-completed');
      card.setAttribute('tabindex', '0');

      card.innerHTML = `
        <h3>${escapeHtml(course.title)}</h3>
        <div class="meta">${course.code} • ${course.credits} credits • <span>${course.category}</span></div>
        <div aria-hidden="true">${course.completed ? 'Completed' : 'In Progress'}</div>
      `;
      coursesGrid.appendChild(card);
    });

    const totalCredits = filtered.reduce((sum, cur) => sum + (Number(cur.credits) || 0), 0);
    creditsCount.textContent = totalCredits;
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => { b.setAttribute('aria-pressed','false'); b.classList.remove('active'); });
      btn.setAttribute('aria-pressed','true');
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      renderCourses(filter === 'all' ? 'all' : filter);
    });
  });

  renderCourses('all');

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
    }
  });

});