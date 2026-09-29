import test from 'node:test';
import assert from 'node:assert/strict';
import {
  randomInRange,
  round,
  isAnswerCorrect,
  buildProblem,
  buildRandomProblem,
} from '../assets/js/core/problemEngine.mjs';

test('randomInRange stays within bounds and respects step', () => {
  for (let i = 0; i < 200; i++) {
    const value = randomInRange(2, 10, 0.5, Math.random);
    assert.ok(value >= 2 && value <= 10, `value ${value} out of range`);
    // value should land on a 0.5 step from 2
    const stepsFromMin = (value - 2) / 0.5;
    assert.ok(Math.abs(stepsFromMin - Math.round(stepsFromMin)) < 1e-9);
  }
});

test('randomInRange is deterministic with a fixed rng', () => {
  const value = randomInRange(0, 10, 1, () => 0);
  assert.equal(value, 0);
  const valueMax = randomInRange(0, 10, 1, () => 0.999999);
  assert.equal(valueMax, 10);
});

test('randomInRange throws when max < min', () => {
  assert.throws(() => randomInRange(10, 0));
});

test('round rounds to the given number of decimals', () => {
  assert.equal(round(1.005, 2), 1.01);
  assert.equal(round(3.14159, 3), 3.142);
  assert.equal(round(5, 2), 5);
});

test('isAnswerCorrect accepts values within tolerance', () => {
  assert.ok(isAnswerCorrect(10.05, 10, 0.02));
  assert.ok(!isAnswerCorrect(10.5, 10, 0.02));
  assert.ok(!isAnswerCorrect(NaN, 10));
});

const sampleSpec = {
  id: 'sample',
  title: 'Sample',
  difficulties: ['easy', 'medium'],
  variables: {
    a: { easy: [1, 2], medium: [1, 5], step: 1 },
    b: { easy: [1, 2], medium: [1, 5], step: 1 },
  },
  statement: (v) => `a=${v.a}, b=${v.b}`,
  compute: (v) => v.a + v.b,
  unit: 'unit',
  decimals: 1,
  solution: (v, answer) => [`a+b=${answer}`],
};

test('buildProblem produces a value consistent with compute()', () => {
  const problem = buildProblem(sampleSpec, 'easy', () => 0);
  assert.equal(problem.variables.a, 1);
  assert.equal(problem.variables.b, 1);
  assert.equal(problem.answer, 2);
  assert.equal(problem.unit, 'unit');
  assert.equal(problem.statement, 'a=1, b=1');
  assert.deepEqual(problem.solutionSteps, ['a+b=2']);
});

test('buildProblem rejects unsupported difficulty', () => {
  assert.throws(() => buildProblem(sampleSpec, 'hard', Math.random));
});

test('buildRandomProblem picks from the provided specs', () => {
  const problem = buildRandomProblem([sampleSpec], 'easy', Math.random);
  assert.equal(problem.id, 'sample');
});

test('buildRandomProblem throws on empty spec list', () => {
  assert.throws(() => buildRandomProblem([], 'easy'));
});
