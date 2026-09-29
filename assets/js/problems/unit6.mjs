// Unit 6: Energy and Momentum of Rotating Systems

export const unitInfo = {
  id: 'unit6',
  number: 6,
  title: 'Energy and Momentum of Rotating Systems',
  description:
    'Rotational kinetic energy, angular momentum, and conservation of angular momentum.',
  topics: [
    'Rotational kinetic energy',
    'Angular momentum',
    'Conservation of angular momentum',
    'Rolling motion (combined translation and rotation)',
  ],
};

export const problems = [
  {
    id: 'rotational-kinetic-energy',
    title: 'Rotational Kinetic Energy',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      inertia: { easy: [1, 5], medium: [0.5, 15], hard: [0.1, 40], step: 0.1 },
      omega: { easy: [1, 5], medium: [1, 10], hard: [1, 25], step: 0.5 },
    },
    statement: (v) =>
      `A rotating object has a moment of inertia of ${v.inertia} kg\u00b7m^2 and an angular ` +
      `velocity of ${v.omega} rad/s. Find its rotational kinetic energy.`,
    compute: (v) => 0.5 * v.inertia * v.omega * v.omega,
    unit: 'J',
    decimals: 2,
    solution: (v, answer) => [
      'KE_rot = (1/2)I\u03c9^2',
      `KE_rot = (0.5)(${v.inertia})(${v.omega})^2 = ${answer} J`,
    ],
  },
  {
    id: 'angular-momentum',
    title: 'Angular Momentum',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      inertia: { easy: [1, 5], medium: [0.5, 15], hard: [0.1, 40], step: 0.1 },
      omega: { easy: [1, 5], medium: [1, 10], hard: [1, 25], step: 0.5 },
    },
    statement: (v) =>
      `A rotating object has a moment of inertia of ${v.inertia} kg\u00b7m^2 and spins with an ` +
      `angular velocity of ${v.omega} rad/s. Find its angular momentum.`,
    compute: (v) => v.inertia * v.omega,
    unit: 'kg\u00b7m^2/s',
    decimals: 2,
    solution: (v, answer) => [
      'L = I\u03c9',
      `L = (${v.inertia})(${v.omega}) = ${answer} kg\u00b7m^2/s`,
    ],
  },
  {
    id: 'conservation-angular-momentum',
    title: 'Conservation of Angular Momentum',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      i1: { easy: [4, 8], medium: [3, 12], hard: [1, 20], step: 0.5 },
      omega1: { easy: [1, 4], medium: [1, 8], hard: [1, 15], step: 0.5 },
      i2: { easy: [1, 3], medium: [0.5, 6], hard: [0.2, 10], step: 0.2 },
    },
    statement: (v) =>
      `An ice skater spinning with moment of inertia ${v.i1} kg\u00b7m^2 at ${v.omega1} rad/s ` +
      `pulls her arms in, reducing her moment of inertia to ${v.i2} kg\u00b7m^2. Assuming no ` +
      `external torques, find her new angular velocity.`,
    compute: (v) => (v.i1 * v.omega1) / v.i2,
    unit: 'rad/s',
    decimals: 2,
    solution: (v, answer) => [
      'I1\u03c91 = I2\u03c92  ->  \u03c92 = I1\u03c91 / I2',
      `\u03c92 = (${v.i1})(${v.omega1}) / ${v.i2} = ${answer} rad/s`,
    ],
  },
];
