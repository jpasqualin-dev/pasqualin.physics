// Unit 1: Kinematics

export const unitInfo = {
  id: 'unit1',
  number: 1,
  title: 'Kinematics',
  description:
    'The study of motion without regard to its causes: position, velocity, acceleration, ' +
    'and how they relate under constant acceleration, including free fall and projectile motion.',
  topics: [
    'Position, velocity, and acceleration',
    'Constant-acceleration ("kinematics") equations',
    'Free fall',
    'Projectile motion',
    'Graphical analysis of motion (x-t, v-t, a-t graphs)',
  ],
};

export const problems = [
  {
    id: 'final-velocity',
    title: 'Final Velocity Under Constant Acceleration',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      v0: { easy: [0, 5], medium: [-5, 10], hard: [-15, 20], step: 1 },
      a: { easy: [1, 3], medium: [1, 6], hard: [-8, 8], step: 0.5, nonZero: true },
      t: { easy: [1, 5], medium: [1, 10], hard: [1, 20], step: 1 },
    },
    statement: (v) =>
      `A cart starts with an initial velocity of ${v.v0} m/s and accelerates at ${v.a} m/s^2 ` +
      `for ${v.t} s. Find the cart's final velocity.`,
    compute: (v) => v.v0 + v.a * v.t,
    unit: 'm/s',
    decimals: 2,
    solution: (v, answer) => ['v = v0 + a*t', `v = ${v.v0} + (${v.a})(${v.t}) = ${answer} m/s`],
  },
  {
    id: 'displacement',
    title: 'Displacement Under Constant Acceleration',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      v0: { easy: [0, 5], medium: [0, 10], hard: [-10, 15], step: 1 },
      a: { easy: [1, 3], medium: [1, 5], hard: [-6, 6], step: 0.5, nonZero: true },
      t: { easy: [1, 4], medium: [1, 8], hard: [1, 12], step: 1 },
    },
    statement: (v) =>
      `A ball starts with a velocity of ${v.v0} m/s and accelerates at ${v.a} m/s^2 for ${v.t} s. ` +
      `Find the ball's displacement.`,
    compute: (v) => v.v0 * v.t + 0.5 * v.a * v.t * v.t,
    unit: 'm',
    decimals: 2,
    solution: (v, answer) => [
      'x = v0*t + (1/2)a*t^2',
      `x = (${v.v0})(${v.t}) + (0.5)(${v.a})(${v.t})^2 = ${answer} m`,
    ],
  },
  {
    id: 'free-fall-time',
    title: 'Free Fall Time',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      height: { easy: [5, 20], medium: [20, 60], hard: [60, 150], step: 1 },
    },
    statement: (v) =>
      `An object is dropped from rest from a height of ${v.height} m. ` +
      `Find the time it takes to reach the ground (use g = 9.8 m/s^2, ignore air resistance).`,
    compute: (v) => Math.sqrt((2 * v.height) / 9.8),
    unit: 's',
    decimals: 2,
    solution: (v, answer) => [
      'h = (1/2)g*t^2  ->  t = sqrt(2h/g)',
      `t = sqrt(2(${v.height})/9.8) = ${answer} s`,
    ],
  },
  {
    id: 'projectile-range',
    title: 'Projectile Range',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      v0: { easy: [10, 20], medium: [10, 30], hard: [15, 45], step: 1 },
      angle: { easy: [30, 45], medium: [15, 60], hard: [10, 80], step: 1 },
    },
    statement: (v) =>
      `A projectile is launched from ground level at ${v.v0} m/s at an angle of ${v.angle}\u00b0 ` +
      `above the horizontal. Find its horizontal range (use g = 9.8 m/s^2).`,
    compute: (v) => (v.v0 * v.v0 * Math.sin((2 * v.angle * Math.PI) / 180)) / 9.8,
    unit: 'm',
    decimals: 2,
    solution: (v, answer) => [
      'R = v0^2 * sin(2*angle) / g',
      `R = (${v.v0})^2 * sin(2 * ${v.angle}\u00b0) / 9.8 = ${answer} m`,
    ],
  },
];
