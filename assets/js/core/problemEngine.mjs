// Core, framework-agnostic problem generation engine.
// Pure functions only (no DOM access) so they can be unit tested with Node.

/**
 * Deterministic-friendly random integer generator (inclusive range), aligned to `step`.
 * @param {number} min
 * @param {number} max
 * @param {number} [step=1]
 * @param {() => number} [rng=Math.random]
 */
export function randomInRange(min, max, step = 1, rng = Math.random) {
  if (max < min) {
    throw new RangeError(`max (${max}) must be >= min (${min})`);
  }
  const steps = Math.floor((max - min) / step);
  const chosen = Math.floor(rng() * (steps + 1));
  const value = min + chosen * step;
  // Guard against floating point drift (e.g. 0.1 + 0.2 issues).
  const decimals = (step.toString().split('.')[1] || '').length;
  return Number(value.toFixed(decimals));
}

/**
 * Rounds a number to a fixed number of decimal places, returned as a Number.
 */
export function round(value, decimals = 2) {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/**
 * Checks whether a numeric answer is within tolerance of the expected value.
 * Tolerance defaults to 1% (relative) with a small absolute floor to handle
 * answers near zero.
 */
export function isAnswerCorrect(userValue, expectedValue, tolerancePct = 0.02) {
  if (Number.isNaN(userValue)) return false;
  const absTolerance = Math.max(Math.abs(expectedValue) * tolerancePct, 0.02);
  return Math.abs(userValue - expectedValue) <= absTolerance;
}

/**
 * Builds a concrete problem instance from a declarative spec.
 *
 * A spec looks like:
 * {
 *   id: 'kinematics-final-velocity',
 *   title: 'Final Velocity',
 *   difficulties: ['easy', 'medium', 'hard'],
 *   variables: {
 *     v0: { easy: [0, 5], medium: [-5, 10], hard: [-15, 20], step: 1, unit: 'm/s' },
 *     a:  { easy: [1, 3], medium: [1, 6],  hard: [-8, 8],  step: 0.5, unit: 'm/s^2' },
 *     t:  { easy: [1, 5], medium: [1, 10], hard: [1, 20], step: 1, unit: 's' },
 *   },
 *   statement: (v) => `A car starts at ${v.v0} m/s ...`,
 *   compute: (v) => v.v0 + v.a * v.t,
 *   unit: 'm/s',
 *   decimals: 2,
 *   solution: (v, answer) => [`v = v0 + a*t`, `v = ${v.v0} + (${v.a})(${v.t}) = ${answer} m/s`],
 * }
 *
 * @param {object} spec
 * @param {'easy'|'medium'|'hard'} difficulty
 * @param {() => number} [rng]
 */
export function buildProblem(spec, difficulty, rng = Math.random) {
  if (!spec.variables) {
    throw new Error(`Problem spec "${spec.id}" is missing variables`);
  }
  if (spec.difficulties && !spec.difficulties.includes(difficulty)) {
    throw new Error(`Difficulty "${difficulty}" not supported by "${spec.id}"`);
  }

  const values = {};
  for (const [name, ranges] of Object.entries(spec.variables)) {
    const range = ranges[difficulty] || ranges.medium || ranges.easy;
    if (!range) {
      throw new Error(`Problem spec "${spec.id}" variable "${name}" has no range for "${difficulty}"`);
    }
    const step = ranges.step ?? 1;
    let value = randomInRange(range[0], range[1], step, rng);
    if (ranges.nonZero && value === 0) {
      value = step; // nudge away from zero to avoid degenerate problems
    }
    values[name] = value;
  }

  const rawAnswer = spec.compute(values);
  const answer = round(rawAnswer, spec.decimals ?? 2);
  const statement = spec.statement(values);
  const solution = spec.solution ? spec.solution(values, answer) : [];

  return {
    id: spec.id,
    title: spec.title,
    difficulty,
    variables: values,
    statement,
    answer,
    unit: spec.unit || '',
    solutionSteps: solution,
  };
}

/**
 * Convenience helper to build a problem chosen at random from a list of specs.
 */
export function buildRandomProblem(specs, difficulty, rng = Math.random) {
  if (!specs.length) {
    throw new Error('No problem specs provided');
  }
  const index = Math.floor(rng() * specs.length);
  return buildProblem(specs[index], difficulty, rng);
}
