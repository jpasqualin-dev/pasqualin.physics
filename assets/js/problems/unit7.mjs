// Unit 7: Oscillations

export const unitInfo = {
  id: 'unit7',
  number: 7,
  title: 'Oscillations',
  description:
    'Simple harmonic motion, including mass-spring systems and pendulums, and the relationships ' +
    'between period, frequency, amplitude, and energy.',
  topics: [
    'Simple harmonic motion (SHM)',
    'Mass-spring systems',
    'Simple pendulums',
    'Period and frequency',
    'Energy in oscillating systems',
  ],
};

export const problems = [
  {
    id: 'spring-period',
    title: 'Period of a Mass-Spring System',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      mass: { easy: [0.5, 2], medium: [0.2, 5], hard: [0.1, 15], step: 0.1 },
      k: { easy: [20, 60], medium: [10, 150], hard: [5, 400], step: 5 },
    },
    statement: (v) =>
      `A ${v.mass} kg mass is attached to a spring with spring constant ${v.k} N/m. ` +
      `Find the period of oscillation.`,
    compute: (v) => 2 * Math.PI * Math.sqrt(v.mass / v.k),
    unit: 's',
    decimals: 3,
    solution: (v, answer) => [
      'T = 2\u03c0*sqrt(m/k)',
      `T = 2\u03c0*sqrt(${v.mass}/${v.k}) = ${answer} s`,
    ],
  },
  {
    id: 'pendulum-period',
    title: 'Period of a Simple Pendulum',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      length: { easy: [0.5, 2], medium: [0.2, 5], hard: [0.1, 10], step: 0.1 },
    },
    statement: (v) =>
      `A simple pendulum has a length of ${v.length} m and swings with a small amplitude. ` +
      `Find its period (use g = 9.8 m/s^2).`,
    compute: (v) => 2 * Math.PI * Math.sqrt(v.length / 9.8),
    unit: 's',
    decimals: 3,
    solution: (v, answer) => [
      'T = 2\u03c0*sqrt(L/g)',
      `T = 2\u03c0*sqrt(${v.length}/9.8) = ${answer} s`,
    ],
  },
  {
    id: 'shm-max-speed',
    title: 'Maximum Speed in SHM',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      amplitude: { easy: [0.1, 0.5], medium: [0.05, 1], hard: [0.02, 2], step: 0.01 },
      period: { easy: [1, 3], medium: [0.5, 5], hard: [0.2, 10], step: 0.1 },
    },
    statement: (v) =>
      `An object oscillates in simple harmonic motion with amplitude ${v.amplitude} m and ` +
      `period ${v.period} s. Find the object's maximum speed.`,
    compute: (v) => (2 * Math.PI * v.amplitude) / v.period,
    unit: 'm/s',
    decimals: 3,
    solution: (v, answer) => [
      'v_max = A\u03c9 = A(2\u03c0/T)',
      `v_max = ${v.amplitude} \u00d7 (2\u03c0/${v.period}) = ${answer} m/s`,
    ],
  },
];
