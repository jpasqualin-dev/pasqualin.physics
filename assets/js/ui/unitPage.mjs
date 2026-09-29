import { renderNav, renderFooter } from '../nav.mjs';
import { mountProblemWidget } from './problemWidget.mjs';

/**
 * Renders a full unit page: header/nav, title/description/topics, one
 * problem-practice card per canonical problem type, and an optional
 * simulation mount callback.
 *
 * @param {object} unitModule - `{ unitInfo, problems }` as exported by
 *   assets/js/problems/unitN.mjs
 * @param {object} [options]
 * @param {(container: HTMLElement) => void} [options.mountSimulation] -
 *   called with the #simulation-container element, if present on the page.
 */
export function renderUnitPage(unitModule, options = {}) {
  const { unitInfo, problems } = unitModule;

  renderNav('../', unitInfo.id);
  renderFooter();

  document.title = `Unit ${unitInfo.number}: ${unitInfo.title} \u2014 AP Physics 1 Study Hub`;

  const titleEl = document.getElementById('unit-title');
  if (titleEl) titleEl.textContent = `Unit ${unitInfo.number}: ${unitInfo.title}`;

  const descEl = document.getElementById('unit-description');
  if (descEl) descEl.textContent = unitInfo.description;

  const topicListEl = document.getElementById('topic-list');
  if (topicListEl) {
    topicListEl.innerHTML = unitInfo.topics.map((t) => `<li>${t}</li>`).join('');
  }

  const problemsContainer = document.getElementById('problems-container');
  if (problemsContainer) {
    problems.forEach((spec, index) => {
      const card = document.createElement('div');
      card.className = 'problem-card';
      card.id = `problem-${unitInfo.id}-${index}`;
      problemsContainer.appendChild(card);
      mountProblemWidget(card, [spec]);
    });
  }

  const simContainer = document.getElementById('simulation-container');
  if (simContainer && options.mountSimulation) {
    options.mountSimulation(simContainer);
  }
}
