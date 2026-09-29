// Unit 0: Foundational math skills (vectors, right-angle trigonometry).
// These problems reinforce prerequisite math skills used throughout the course.

const DEG_TO_RAD = Math.PI / 180;

export const unitInfo = {
  id: 'unit0',
  number: 0,
  title: 'Math Foundations: Vectors & Trigonometry',
  description:
    'A refresher on the mathematical tools used throughout AP Physics 1: vector addition and ' +
    'decomposition, and right-triangle trigonometry (SOH-CAH-TOA).',
  topics: [
    'Scalars vs. vectors',
    'Vector components (x/y decomposition)',
    'Vector magnitude and direction',
    'Right-triangle trigonometry: sine, cosine, tangent',
    'The Pythagorean theorem',
  ],
};

export const problems = [
  {
    id: 'vector-magnitude-direction',
    title: 'Vector Magnitude and Direction',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      x: { easy: [3, 8], medium: [-10, 12], hard: [-20, 20], step: 1, nonZero: true },
      y: { easy: [3, 8], medium: [-10, 12], hard: [-20, 20], step: 1, nonZero: true },
    },
    statement: (v) =>
      `A displacement vector has components (x, y) = (${v.x} m, ${v.y} m). ` +
      `Find the magnitude of the vector.`,
    compute: (v) => Math.sqrt(v.x * v.x + v.y * v.y),
    unit: 'm',
    decimals: 2,
    solution: (v, answer) => [
      '|r| = sqrt(x^2 + y^2)',
      `|r| = sqrt((${v.x})^2 + (${v.y})^2) = ${answer} m`,
    ],
  },
  {
    id: 'right-triangle-opposite',
    title: 'Right-Triangle Trigonometry',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      hyp: { easy: [10, 20], medium: [5, 40], hard: [2, 60], step: 1 },
      angle: { easy: [20, 40], medium: [10, 60], hard: [5, 80], step: 1 },
    },
    statement: (v) =>
      `A ramp forms the hypotenuse of a right triangle with length ${v.hyp} m, ` +
      `at an angle of ${v.angle}\u00b0 above the horizontal. ` +
      `Find the vertical height (the side opposite the angle).`,
    compute: (v) => v.hyp * Math.sin(v.angle * DEG_TO_RAD),
    unit: 'm',
    decimals: 2,
    solution: (v, answer) => [
      'opposite = hypotenuse * sin(angle)',
      `opposite = (${v.hyp})(sin ${v.angle}\u00b0) = ${answer} m`,
    ],
  },
  {
    id: 'vector-components',
    title: 'Vector Component Decomposition',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      magnitude: { easy: [10, 20], medium: [5, 40], hard: [2, 60], step: 1 },
      angle: { easy: [20, 40], medium: [10, 60], hard: [5, 85], step: 1 },
    },
    statement: (v) =>
      `A force of magnitude ${v.magnitude} N points at ${v.angle}\u00b0 above the +x axis. ` +
      `Find the x-component of the force.`,
    compute: (v) => v.magnitude * Math.cos(v.angle * DEG_TO_RAD),
    unit: 'N',
    decimals: 2,
    solution: (v, answer) => [
      'Fx = F * cos(angle)',
      `Fx = (${v.magnitude})(cos ${v.angle}\u00b0) = ${answer} N`,
    ],
  },
];
