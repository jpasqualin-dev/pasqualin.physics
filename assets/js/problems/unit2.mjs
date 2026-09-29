// Unit 2: Force and Translational Dynamics

export const unitInfo = {
  id: 'unit2',
  number: 2,
  title: 'Force and Translational Dynamics',
  description:
    "Newton's laws of motion, forces (gravity, normal, friction, tension), and how nets forces " +
    'produce acceleration in systems such as inclines and Atwood machines.',
  topics: [
    "Newton's first, second, and third laws",
    'Free-body diagrams',
    'Friction (static and kinetic)',
    'Inclined planes',
    'Systems of connected objects (Atwood machines, pulleys)',
  ],
};

export const problems = [
  {
    id: 'newtons-second-law',
    title: "Newton's Second Law",
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      mass: { easy: [2, 10], medium: [1, 20], hard: [0.5, 40], step: 0.5 },
      force: { easy: [5, 30], medium: [5, 60], hard: [5, 150], step: 1 },
    },
    statement: (v) =>
      `A net force of ${v.force} N is applied to an object with a mass of ${v.mass} kg. ` +
      `Find the object's acceleration.`,
    compute: (v) => v.force / v.mass,
    unit: 'm/s^2',
    decimals: 2,
    solution: (v, answer) => [
      'F_net = m*a  ->  a = F_net / m',
      `a = ${v.force} / ${v.mass} = ${answer} m/s^2`,
    ],
  },
  {
    id: 'incline-friction',
    title: 'Acceleration on a Frictional Incline',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      angle: { easy: [15, 25], medium: [10, 35], hard: [5, 50], step: 1 },
      mu: { easy: [0.1, 0.2], medium: [0.05, 0.3], hard: [0.02, 0.4], step: 0.01 },
    },
    statement: (v) =>
      `A block slides down a ramp inclined at ${v.angle}\u00b0 above the horizontal. ` +
      `The coefficient of kinetic friction between the block and ramp is ${v.mu}. ` +
      `Find the block's acceleration down the ramp (use g = 9.8 m/s^2).`,
    compute: (v) =>
      9.8 * (Math.sin((v.angle * Math.PI) / 180) - v.mu * Math.cos((v.angle * Math.PI) / 180)),
    unit: 'm/s^2',
    decimals: 2,
    solution: (v, answer) => [
      'a = g(sin(angle) - mu*cos(angle))',
      `a = 9.8(sin ${v.angle}\u00b0 - ${v.mu}*cos ${v.angle}\u00b0) = ${answer} m/s^2`,
    ],
  },
  {
    id: 'atwood-machine',
    title: 'Atwood Machine Acceleration',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      m1: { easy: [2, 5], medium: [1, 8], hard: [0.5, 15], step: 0.5 },
      m2: { easy: [6, 10], medium: [9, 16], hard: [16, 30], step: 0.5 },
    },
    statement: (v) =>
      `Two blocks (mass ${v.m1} kg and ${v.m2} kg) are connected by a massless string over a ` +
      `frictionless, massless pulley. Find the magnitude of the system's acceleration ` +
      `(use g = 9.8 m/s^2).`,
    compute: (v) => (9.8 * Math.abs(v.m2 - v.m1)) / (v.m1 + v.m2),
    unit: 'm/s^2',
    decimals: 2,
    solution: (v, answer) => [
      'a = g|m2 - m1| / (m1 + m2)',
      `a = 9.8|${v.m2} - ${v.m1}| / (${v.m1} + ${v.m2}) = ${answer} m/s^2`,
    ],
  },
];
