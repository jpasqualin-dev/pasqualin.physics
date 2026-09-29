// Unit 3: Work, Energy, and Power

export const unitInfo = {
  id: 'unit3',
  number: 3,
  title: 'Work, Energy, and Power',
  description:
    'The work-energy theorem, kinetic and potential energy, conservation of energy, and power.',
  topics: [
    'Work done by a constant force',
    'Kinetic energy and the work-energy theorem',
    'Gravitational potential energy',
    'Conservation of mechanical energy',
    'Power',
  ],
};

export const problems = [
  {
    id: 'work-by-force',
    title: 'Work Done by a Force at an Angle',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      force: { easy: [10, 30], medium: [10, 60], hard: [5, 120], step: 1 },
      distance: { easy: [2, 10], medium: [2, 20], hard: [1, 40], step: 1 },
      angle: { easy: [0, 0], medium: [0, 45], hard: [0, 70], step: 1 },
    },
    statement: (v) =>
      `A force of ${v.force} N is applied at an angle of ${v.angle}\u00b0 to the direction of ` +
      `motion, moving an object ${v.distance} m. Find the work done by the force.`,
    compute: (v) => v.force * v.distance * Math.cos((v.angle * Math.PI) / 180),
    unit: 'J',
    decimals: 2,
    solution: (v, answer) => [
      'W = F * d * cos(angle)',
      `W = (${v.force})(${v.distance})cos(${v.angle}\u00b0) = ${answer} J`,
    ],
  },
  {
    id: 'kinetic-energy',
    title: 'Kinetic Energy',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      mass: { easy: [1, 5], medium: [1, 15], hard: [0.5, 40], step: 0.5 },
      speed: { easy: [2, 10], medium: [2, 20], hard: [1, 40], step: 1 },
    },
    statement: (v) =>
      `An object of mass ${v.mass} kg moves at a speed of ${v.speed} m/s. ` +
      `Find its kinetic energy.`,
    compute: (v) => 0.5 * v.mass * v.speed * v.speed,
    unit: 'J',
    decimals: 2,
    solution: (v, answer) => [
      'KE = (1/2)m*v^2',
      `KE = (0.5)(${v.mass})(${v.speed})^2 = ${answer} J`,
    ],
  },
  {
    id: 'energy-conservation-height',
    title: 'Speed From Conservation of Energy',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      height: { easy: [1, 5], medium: [1, 15], hard: [1, 40], step: 0.5 },
    },
    statement: (v) =>
      `A block starts from rest and slides down a frictionless ramp, dropping a vertical ` +
      `height of ${v.height} m. Find the block's speed at the bottom (use g = 9.8 m/s^2).`,
    compute: (v) => Math.sqrt(2 * 9.8 * v.height),
    unit: 'm/s',
    decimals: 2,
    solution: (v, answer) => [
      'm*g*h = (1/2)m*v^2  ->  v = sqrt(2*g*h)',
      `v = sqrt(2(9.8)(${v.height})) = ${answer} m/s`,
    ],
  },
  {
    id: 'power',
    title: 'Power Delivered',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      force: { easy: [10, 30], medium: [10, 60], hard: [5, 150], step: 1 },
      speed: { easy: [1, 5], medium: [1, 10], hard: [1, 20], step: 0.5 },
    },
    statement: (v) =>
      `A motor exerts a constant force of ${v.force} N on an object moving at a constant ` +
      `speed of ${v.speed} m/s in the direction of the force. Find the power delivered.`,
    compute: (v) => v.force * v.speed,
    unit: 'W',
    decimals: 2,
    solution: (v, answer) => ['P = F * v', `P = (${v.force})(${v.speed}) = ${answer} W`],
  },
];
