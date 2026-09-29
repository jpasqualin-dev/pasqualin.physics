import test from 'node:test';
import assert from 'node:assert/strict';
import { buildProblem, round } from '../assets/js/core/problemEngine.mjs';

import * as unit0 from '../assets/js/problems/unit0.mjs';
import * as unit1 from '../assets/js/problems/unit1.mjs';
import * as unit2 from '../assets/js/problems/unit2.mjs';
import * as unit3 from '../assets/js/problems/unit3.mjs';
import * as unit4 from '../assets/js/problems/unit4.mjs';
import * as unit5 from '../assets/js/problems/unit5.mjs';
import * as unit6 from '../assets/js/problems/unit6.mjs';
import * as unit7 from '../assets/js/problems/unit7.mjs';
import * as unit8 from '../assets/js/problems/unit8.mjs';

const units = [unit0, unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8];
const difficulties = ['easy', 'medium', 'hard'];

for (const unitModule of units) {
  const { unitInfo, problems } = unitModule;

  test(`${unitInfo.id}: exposes well-formed unit metadata`, () => {
    assert.ok(unitInfo.title.length > 0);
    assert.ok(unitInfo.description.length > 0);
    assert.ok(Array.isArray(unitInfo.topics) && unitInfo.topics.length > 0);
    assert.ok(Array.isArray(problems) && problems.length > 0);
  });

  for (const spec of problems) {
    test(`${unitInfo.id} / ${spec.id}: generates a valid problem for every difficulty`, () => {
      for (const difficulty of difficulties) {
        // Deterministic rng (always picks the low end of each range) plus
        // several random draws to broadly sample the space.
        const rngSamples = [() => 0, () => 0.5, () => 0.999999, Math.random, Math.random];
        for (const rng of rngSamples) {
          const problem = buildProblem(spec, difficulty, rng);

          assert.equal(typeof problem.statement, 'string');
          assert.ok(problem.statement.length > 0);
          assert.ok(!problem.statement.includes('NaN'));
          assert.ok(!problem.statement.includes('undefined'));

          assert.equal(typeof problem.answer, 'number');
          assert.ok(Number.isFinite(problem.answer), `answer must be finite for ${spec.id}`);

          // The stored answer should be the rounded compute() result for the
          // same variable set (i.e. compute() is deterministic and consistent).
          const expected = round(spec.compute(problem.variables), spec.decimals ?? 2);
          assert.equal(problem.answer, expected);

          if (spec.solution) {
            assert.ok(Array.isArray(problem.solutionSteps));
            assert.ok(problem.solutionSteps.length > 0);
            for (const step of problem.solutionSteps) {
              assert.ok(!step.includes('NaN'));
              assert.ok(!step.includes('undefined'));
            }
          }
        }
      }
    });
  }
}
