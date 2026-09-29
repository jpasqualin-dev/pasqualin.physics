// DOM wiring for a single "problem card": difficulty selector, new-problem
// button, answer input/check, and a toggleable solution.
import { buildRandomProblem, isAnswerCorrect } from '../core/problemEngine.mjs';

/**
 * Mounts an interactive problem card inside `container`.
 * @param {HTMLElement} container
 * @param {Array<object>} specs - problem specs for this unit (or a subset).
 * @param {string} [defaultDifficulty]
 */
export function mountProblemWidget(container, specs, defaultDifficulty = 'medium') {
  container.innerHTML = `
    <div class="problem-controls">
      <label for="${container.id}-difficulty">Difficulty:</label>
      <select id="${container.id}-difficulty">
        <option value="easy">Easy</option>
        <option value="medium" selected>Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button type="button" class="new-problem-btn">New Problem</button>
      <button type="button" class="secondary show-solution-btn">Show Solution</button>
    </div>
    <h3 class="problem-title"></h3>
    <p class="problem-statement"></p>
    <div class="answer-row">
      <input type="number" step="any" class="answer-input" placeholder="Your answer" />
      <span class="answer-unit"></span>
      <button type="button" class="check-answer-btn">Check Answer</button>
    </div>
    <p class="feedback" role="status"></p>
    <div class="solution-steps">
      <ol></ol>
    </div>
  `;

  const difficultySelect = container.querySelector(`#${container.id}-difficulty`);
  const newProblemBtn = container.querySelector('.new-problem-btn');
  const showSolutionBtn = container.querySelector('.show-solution-btn');
  const checkAnswerBtn = container.querySelector('.check-answer-btn');
  const titleEl = container.querySelector('.problem-title');
  const statementEl = container.querySelector('.problem-statement');
  const answerInput = container.querySelector('.answer-input');
  const answerUnitEl = container.querySelector('.answer-unit');
  const feedbackEl = container.querySelector('.feedback');
  const solutionEl = container.querySelector('.solution-steps');
  const solutionList = solutionEl.querySelector('ol');

  let currentProblem = null;

  function newProblem() {
    const difficulty = difficultySelect.value;
    currentProblem = buildRandomProblem(specs, difficulty);
    titleEl.textContent = currentProblem.title;
    statementEl.textContent = currentProblem.statement;
    answerUnitEl.textContent = currentProblem.unit;
    answerInput.value = '';
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
    solutionEl.classList.remove('visible');
    showSolutionBtn.textContent = 'Show Solution';
    solutionList.innerHTML = currentProblem.solutionSteps
      .map((step) => `<li>${step}</li>`)
      .join('');
  }

  function checkAnswer() {
    if (!currentProblem) return;
    const userValue = parseFloat(answerInput.value);
    const correct = isAnswerCorrect(userValue, currentProblem.answer);
    feedbackEl.textContent = correct
      ? 'Correct! Nice work.'
      : `Not quite. The correct answer is ${currentProblem.answer} ${currentProblem.unit}.`;
    feedbackEl.className = `feedback ${correct ? 'correct' : 'incorrect'}`;
  }

  function toggleSolution() {
    solutionEl.classList.toggle('visible');
    showSolutionBtn.textContent = solutionEl.classList.contains('visible')
      ? 'Hide Solution'
      : 'Show Solution';
  }

  newProblemBtn.addEventListener('click', newProblem);
  showSolutionBtn.addEventListener('click', toggleSolution);
  checkAnswerBtn.addEventListener('click', checkAnswer);
  difficultySelect.addEventListener('change', newProblem);
  answerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkAnswer();
  });

  difficultySelect.value = defaultDifficulty;
  newProblem();
}
