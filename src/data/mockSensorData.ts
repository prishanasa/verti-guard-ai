// Mock sensor data simulating a fall (200 samples x 6 axes)
// Axes: accel_x, accel_y, accel_z, gyro_x, gyro_y, gyro_z
export const mockFallData: number[][] = [
  // Normal walking pattern (samples 0-150)
  [0.12, 0.98, 0.05, 0.02, -0.01, 0.03],
  [0.11, 0.97, 0.06, 0.01, -0.02, 0.02],
  [0.13, 0.99, 0.04, 0.03, -0.01, 0.04],
  [0.10, 0.96, 0.07, 0.02, 0.00, 0.01],
  [0.14, 1.00, 0.03, 0.01, -0.03, 0.05],
  ...Array(145).fill(null).map(() => [
    0.10 + Math.random() * 0.08,
    0.95 + Math.random() * 0.10,
    0.02 + Math.random() * 0.08,
    -0.02 + Math.random() * 0.08,
    -0.03 + Math.random() * 0.06,
    0.01 + Math.random() * 0.08,
  ]),
  
  // Fall detection pattern (samples 150-175) - sudden acceleration changes
  [0.15, 1.10, 0.08, 0.05, 0.02, 0.10],
  [0.35, 1.85, 0.25, 0.35, 0.15, 0.45],
  [0.85, 3.20, 0.75, 1.25, 0.85, 1.35],
  [1.45, 4.80, 1.55, 2.65, 1.95, 2.85],
  [2.25, 6.50, 2.75, 4.50, 3.85, 4.95],
  [2.95, 7.80, 3.65, 6.25, 5.50, 6.75],
  [3.15, 8.20, 3.95, 7.15, 6.35, 7.45],
  [2.85, 7.50, 3.45, 6.45, 5.85, 6.95],
  [2.25, 6.20, 2.65, 4.95, 4.55, 5.65],
  [1.55, 4.50, 1.75, 3.25, 2.95, 3.85],
  [0.95, 2.80, 0.95, 1.65, 1.45, 1.95],
  [0.45, 1.50, 0.45, 0.75, 0.55, 0.85],
  [0.25, 0.95, 0.25, 0.35, 0.25, 0.45],
  [0.15, 0.75, 0.15, 0.15, 0.10, 0.25],
  ...Array(11).fill(null).map(() => [
    0.85 + Math.random() * 2.50,
    3.50 + Math.random() * 4.50,
    1.25 + Math.random() * 2.50,
    2.85 + Math.random() * 4.50,
    2.45 + Math.random() * 3.50,
    3.15 + Math.random() * 4.50,
  ]),
  
  // Impact and recovery (samples 175-200)
  [0.12, 0.65, 0.08, 0.08, 0.05, 0.15],
  [0.10, 0.55, 0.06, 0.05, 0.03, 0.10],
  [0.11, 0.48, 0.07, 0.04, 0.02, 0.08],
  [0.09, 0.42, 0.05, 0.03, 0.01, 0.05],
  [0.08, 0.38, 0.04, 0.02, 0.01, 0.03],
  ...Array(20).fill(null).map(() => [
    0.08 + Math.random() * 0.05,
    0.35 + Math.random() * 0.15,
    0.03 + Math.random() * 0.05,
    0.01 + Math.random() * 0.03,
    0.00 + Math.random() * 0.02,
    0.02 + Math.random() * 0.04,
  ]),
];

export const mockNormalData: number[][] = [
  // Normal activity pattern (200 samples)
  ...Array(200).fill(null).map(() => [
    0.08 + Math.random() * 0.12,
    0.92 + Math.random() * 0.16,
    0.02 + Math.random() * 0.10,
    -0.03 + Math.random() * 0.10,
    -0.04 + Math.random() * 0.08,
    0.00 + Math.random() * 0.10,
  ]),
];
