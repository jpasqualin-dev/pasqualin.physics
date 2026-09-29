// Unit 5: Torque and Rotational Dynamics

export const unitInfo = {
  id: 'unit5',
  number: 5,
  title: 'Torque and Rotational Dynamics',
  description:
    'Torque, moment of inertia, and the rotational analog of Newton\u2019s second law, along with ' +
    'rotational kinematics.',
  topics: [
    'Torque',
    'Moment of inertia',
    'Rotational form of Newton\u2019s second law (\u03c4_net = I\u03b1)',
    'Rotational kinematics',
  ],
};

export const problems = [
  {
    id: 'torque',
    title: 'Torque From a Force',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      radius: { easy: [0.2, 0.5], medium: [0.1, 1], hard: [0.05, 2], step: 0.05 },
      force: { easy: [10, 30], medium: [10, 60], hard: [5, 150], step: 1 },
      angle: { easy: [90, 90], medium: [45, 90], hard: [20, 90], step: 1 },
    },
    statement: (v) =>
      `A force of ${v.force} N is applied ${v.angle}\u00b0 to a lever arm of length ${v.radius} m ` +
      `from the pivot. Find the magnitude of the torque produced.`,
    compute: (v) => v.radius * v.force * Math.sin((v.angle * Math.PI) / 180),
    unit: 'N\u00b7m',
    decimals: 2,
    solution: (v, answer) => [
      '\u03c4 = r * F * sin(angle)',
      `\u03c4 = (${v.radius})(${v.force})sin(${v.angle}\u00b0) = ${answer} N\u00b7m`,
    ],
  },
  {
    id: 'disk-angular-acceleration',
    title: 'Angular Acceleration of a Disk',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      mass: { easy: [1, 5], medium: [1, 15], hard: [0.5, 30], step: 0.5 },
      radius: { easy: [0.2, 0.5], medium: [0.1, 1], hard: [0.05, 2], step: 0.05 },
      torque: { easy: [1, 5], medium: [1, 15], hard: [0.5, 40], step: 0.5 },
    },
    statement: (v) =>
      `A uniform solid disk of mass ${v.mass} kg and radius ${v.radius} m experiences a net ` +
      `torque of ${v.torque} N\u00b7m about its center. Find its angular acceleration ` +
      `(I_disk = (1/2)MR^2).`,
    compute: (v) => v.torque / (0.5 * v.mass * v.radius * v.radius),
    unit: 'rad/s^2',
    decimals: 2,
    solution: (v, answer) => [
      '\u03c4 = I\u03b1, I = (1/2)MR^2  ->  \u03b1 = \u03c4 / ((1/2)MR^2)',
      `\u03b1 = ${v.torque} / (0.5 \u00d7 ${v.mass} \u00d7 ${v.radius}^2) = ${answer} rad/s^2`,
    ],
  },
  {
    id: 'rotational-kinematics',
    title: 'Rotational Kinematics',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      omega0: { easy: [0, 2], medium: [0, 5], hard: [-5, 10], step: 0.5 },
      alpha: { easy: [1, 3], medium: [1, 6], hard: [-8, 8], step: 0.5, nonZero: true },
      time: { easy: [1, 5], medium: [1, 10], hard: [1, 20], step: 1 },
    },
    statement: (v) =>
      `A wheel starts with an angular velocity of ${v.omega0} rad/s and has an angular ` +
      `acceleration of ${v.alpha} rad/s^2 for ${v.time} s. Find its final angular velocity.`,
    compute: (v) => v.omega0 + v.alpha * v.time,
    unit: 'rad/s',
    decimals: 2,
    solution: (v, answer) => [
      '\u03c9 = \u03c9\u2080 + \u03b1t',
      `\u03c9 = ${v.omega0} + (${v.alpha})(${v.time}) = ${answer} rad/s`,
    ],
  },
];
