// Unit 8: Fluids

export const unitInfo = {
  id: 'unit8',
  number: 8,
  title: 'Fluids',
  description:
    'Fluid statics and dynamics: pressure, buoyancy, and the continuity equation for ' +
    'incompressible flow.',
  topics: [
    'Density and pressure',
    'Pressure as a function of depth',
    "Archimedes' principle (buoyancy)",
    'Continuity equation',
  ],
};

export const problems = [
  {
    id: 'pressure-at-depth',
    title: 'Pressure at Depth',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      density: { easy: [1000, 1000], medium: [900, 1200], hard: [800, 1400], step: 10 },
      depth: { easy: [1, 5], medium: [1, 15], hard: [1, 50], step: 0.5 },
    },
    statement: (v) =>
      `Find the gauge pressure at a depth of ${v.depth} m in a fluid of density ` +
      `${v.density} kg/m^3 (use g = 9.8 m/s^2). Ignore atmospheric pressure.`,
    compute: (v) => v.density * 9.8 * v.depth,
    unit: 'Pa',
    decimals: 0,
    solution: (v, answer) => [
      'P = \u03c1*g*h',
      `P = (${v.density})(9.8)(${v.depth}) = ${answer} Pa`,
    ],
  },
  {
    id: 'buoyant-force',
    title: 'Buoyant Force',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      fluidDensity: { easy: [1000, 1000], medium: [900, 1200], hard: [800, 1400], step: 10 },
      volume: { easy: [0.001, 0.01], medium: [0.0005, 0.05], hard: [0.0001, 0.2], step: 0.0005 },
    },
    statement: (v) =>
      `An object of volume ${v.volume} m^3 is fully submerged in a fluid of density ` +
      `${v.fluidDensity} kg/m^3. Find the buoyant force on the object (use g = 9.8 m/s^2).`,
    compute: (v) => v.fluidDensity * 9.8 * v.volume,
    unit: 'N',
    decimals: 2,
    solution: (v, answer) => [
      'F_b = \u03c1_fluid * g * V_displaced',
      `F_b = (${v.fluidDensity})(9.8)(${v.volume}) = ${answer} N`,
    ],
  },
  {
    id: 'continuity-equation',
    title: 'Continuity Equation',
    difficulties: ['easy', 'medium', 'hard'],
    variables: {
      area1: { easy: [0.01, 0.05], medium: [0.005, 0.1], hard: [0.001, 0.3], step: 0.001 },
      speed1: { easy: [1, 3], medium: [0.5, 6], hard: [0.2, 15], step: 0.1 },
      area2: { easy: [0.002, 0.008], medium: [0.001, 0.03], hard: [0.0005, 0.1], step: 0.0005 },
    },
    statement: (v) =>
      `An incompressible fluid flows through a pipe. At a point where the cross-sectional area ` +
      `is ${v.area1} m^2, the fluid speed is ${v.speed1} m/s. Find the fluid speed at a second ` +
      `point where the cross-sectional area narrows to ${v.area2} m^2.`,
    compute: (v) => (v.area1 * v.speed1) / v.area2,
    unit: 'm/s',
    decimals: 2,
    solution: (v, answer) => [
      'A1*v1 = A2*v2  ->  v2 = A1*v1 / A2',
      `v2 = (${v.area1})(${v.speed1}) / ${v.area2} = ${answer} m/s`,
    ],
  },
];
