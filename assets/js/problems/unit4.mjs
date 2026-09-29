// Unit 4: Linear Momentum

export const unitInfo = {
  id: 'unit4',
  number: 4,
  title: 'Linear Momentum',
  description:
    'Momentum, impulse, and the conservation of momentum in collisions (elastic and inelastic).',
  topics: [
    'Momentum',
    'Impulse-momentum theorem',
    'Conservation of momentum',
    'Elastic and perfectly inelastic collisions',
  ],
};

export const problems = [
  {
    id: 'momentum',
    title: 'Momentum',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      mass: { easy: [1, 5], medium: [1, 15], hard: [0.5, 40], step: 0.5 },
      speed: { easy: [2, 10], medium: [2, 20], hard: [1, 40], step: 1 },
    },
    statement: (v) => `An object of mass ${v.mass} kg moves at ${v.speed} m/s. Find its momentum.`,
    compute: (v) => v.mass * v.speed,
    unit: 'kg\u00b7m/s',
    decimals: 2,
    solution: (v, answer) => ['p = m*v', `p = (${v.mass})(${v.speed}) = ${answer} kg\u00b7m/s`],
  },
  {
    id: 'impulse-velocity-change',
    title: 'Impulse and Change in Velocity',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      mass: { easy: [1, 5], medium: [1, 15], hard: [0.5, 30], step: 0.5 },
      force: { easy: [10, 30], medium: [10, 60], hard: [5, 150], step: 1 },
      time: { easy: [0.5, 2], medium: [0.2, 4], hard: [0.1, 8], step: 0.1 },
    },
    statement: (v) =>
      `A constant net force of ${v.force} N acts on an object of mass ${v.mass} kg for ` +
      `${v.time} s. Find the resulting change in the object's velocity.`,
    compute: (v) => (v.force * v.time) / v.mass,
    unit: 'm/s',
    decimals: 2,
    solution: (v, answer) => [
      'J = F*t = m*(delta v)  ->  delta v = F*t/m',
      `delta v = (${v.force})(${v.time}) / ${v.mass} = ${answer} m/s`,
    ],
  },
  {
    id: 'inelastic-collision',
    title: 'Perfectly Inelastic Collision',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      m1: { easy: [1, 5], medium: [1, 10], hard: [0.5, 20], step: 0.5 },
      v1: { easy: [2, 10], medium: [2, 15], hard: [-15, 20], step: 1 },
      m2: { easy: [1, 5], medium: [1, 10], hard: [0.5, 20], step: 0.5 },
      v2: { easy: [0, 0], medium: [-5, 5], hard: [-15, 15], step: 1 },
    },
    statement: (v) =>
      `A ${v.m1} kg cart moving at ${v.v1} m/s collides and sticks to a ${v.m2} kg cart moving ` +
      `at ${v.v2} m/s (same direction is positive). Find the final velocity of the combined carts.`,
    compute: (v) => (v.m1 * v.v1 + v.m2 * v.v2) / (v.m1 + v.m2),
    unit: 'm/s',
    decimals: 2,
    solution: (v, answer) => [
      'm1*v1 + m2*v2 = (m1 + m2)*vf',
      `vf = (${v.m1}(${v.v1}) + ${v.m2}(${v.v2})) / (${v.m1} + ${v.m2}) = ${answer} m/s`,
    ],
  },
];
