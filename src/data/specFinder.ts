import { allProducts, type Product } from '@/data/products';

export const finderGroups = ['Tilt and motion', 'Torque', 'Load', 'Transit protection'] as const;
export type FinderGroup = (typeof finderGroups)[number];

type FinderSummary = { group: FinderGroup; range: string; output: string };
export type FinderProduct = Product & FinderSummary;

// One comparable line per product, condensed from the specs in products.ts.
const summaries: Record<string, FinderSummary> = {
  'inclinometer-sensor': { group: 'Tilt and motion', range: 'Angle, −90° to 90°, single or dual axis', output: '0–5 V, 0–10 V, 4–20 mA, RS485, RS232' },
  'digital-tilt-sensor': { group: 'Tilt and motion', range: 'Angle, ±90°, single or dual axis', output: '0–5 V, 4–20 mA, RS485, RS232' },
  'tilt-switch-sensor': { group: 'Tilt and motion', range: 'Angle alarm, 0° to ±90°, dual axis', output: 'Relay or voltage' },
  'inertial-measurement-unit': { group: 'Tilt and motion', range: 'Acceleration, angular velocity, orientation', output: 'Modbus' },
  'rotary-torque-sensor': { group: 'Torque', range: 'Rotating torque, 1–5,000 Nm', output: 'mV, 5–15 kHz, 4–20 mA, 0–10 V' },
  'reaction-torque-sensor': { group: 'Torque', range: 'Static torque, 1–5,000 Nm', output: 'mV, 5–15 kHz, 4–20 mA, 0–10 V' },
  's-type-load-cell': { group: 'Load', range: 'Tension and compression, 50 kgf–10 tf', output: '2 mV/V' },
  'single-point-load-cell': { group: 'Load', range: 'Platform load, 10–2,000 kgf', output: '1 mV/V' },
  'shock-indicator-labels': { group: 'Transit protection', range: 'Shock, 25 g', output: 'Colour change' },
  'tilt-indicator': { group: 'Transit protection', range: 'Tilt over 80°', output: 'Colour change' },
  'impact-indicator': { group: 'Transit protection', range: 'Impact, 25 g', output: 'Window display' },
  'clip-label': { group: 'Transit protection', range: 'Shock, 25 g or 50 g', output: 'Visual indicator' },
  'pallet-cushion': { group: 'Transit protection', range: 'Load capacity, 51–100 kg', output: 'Air damping' },
};

export const finderProducts: FinderProduct[] = allProducts.flatMap((product) => {
  const summary = summaries[product.slug];
  return summary ? [{ ...product, ...summary }] : [];
});
