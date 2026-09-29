// Central registry of unit metadata + navigation rendering.
// Each entry lazily imports its problems module so the home page and nav
// don't need to eagerly load every unit's problem bank.

export const unitList = [
  { id: 'unit0', number: 0, title: 'Math Foundations', path: 'units/unit0.html' },
  { id: 'unit1', number: 1, title: 'Kinematics', path: 'units/unit1.html' },
  { id: 'unit2', number: 2, title: 'Force & Translational Dynamics', path: 'units/unit2.html' },
  { id: 'unit3', number: 3, title: 'Work, Energy, and Power', path: 'units/unit3.html' },
  { id: 'unit4', number: 4, title: 'Linear Momentum', path: 'units/unit4.html' },
  { id: 'unit5', number: 5, title: 'Torque & Rotational Dynamics', path: 'units/unit5.html' },
  {
    id: 'unit6',
    number: 6,
    title: 'Energy & Momentum of Rotating Systems',
    path: 'units/unit6.html',
  },
  { id: 'unit7', number: 7, title: 'Oscillations', path: 'units/unit7.html' },
  { id: 'unit8', number: 8, title: 'Fluids', path: 'units/unit8.html' },
];

/**
 * Renders the shared site header/nav into the element with id "site-header".
 * @param {string} basePath - relative path prefix to the site root (e.g. '' for
 *   root pages, '../' for pages inside /units/).
 * @param {string} [activeId] - id of the unit/page to highlight as active.
 */
export function renderNav(basePath = '', activeId = '') {
  const root = document.getElementById('site-header');
  if (!root) return;

  const options = unitList
    .map(
      (u) =>
        `<option value="${basePath}${u.path}" ${u.id === activeId ? 'selected' : ''}>` +
        `Unit ${u.number}: ${u.title}</option>`
    )
    .join('');

  root.innerHTML = `
    <nav class="site-nav">
      <a class="brand" href="${basePath}index.html">AP Physics 1 Study Hub</a>
      <select id="unit-jump" aria-label="Jump to unit">
        <option value="">Jump to a unit\u2026</option>
        ${options}
      </select>
      <div class="nav-links">
        <a class="nav-link ${activeId === 'home' ? 'active' : ''}" href="${basePath}index.html">Home</a>
        <a class="nav-link ${activeId === 'exam-info' ? 'active' : ''}" href="${basePath}exam-info.html">Exam Info</a>
      </div>
    </nav>
  `;

  const jump = document.getElementById('unit-jump');
  if (jump) {
    jump.addEventListener('change', () => {
      if (jump.value) window.location.href = jump.value;
    });
  }
}

export function renderFooter() {
  const root = document.getElementById('site-footer');
  if (!root) return;
  root.innerHTML = `Built for students studying for the College Board AP Physics 1 exam. Not affiliated with the College Board.`;
}
