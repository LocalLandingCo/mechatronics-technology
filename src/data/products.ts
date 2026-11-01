import { Gauge, Package, type LucideIcon } from 'lucide-react';
import rotaryTorqueSensorImg from '@/assets/products/rotary-torque-sensor.jpg';
import reactionTorqueSensorImg from '@/assets/products/reaction-torque-sensor.jpg';
import sTypeLoadCellImg from '@/assets/products/s-type-load-cell.jpg';
import singlePointLoadCellImg from '@/assets/products/single-point-load-cell.jpg';
import inclinometerSensorImg from '@/assets/products/inclinometer-sensor.jpg';
import tiltIndicatorImg from '@/assets/products/tilt-indicator.jpg';
import impactIndicatorImg from '@/assets/products/impact-indicator.jpg';
import clipLabelImg from '@/assets/products/clip-label.jpg';
import palletCushionImg from '@/assets/products/pallet-cushion.jpg';

export type Product = {
  slug: string;
  title: string;
  image: string;
  description: string;
  specs: Record<string, string>;
  categoryId: string;
};

export type ProductCategory = {
  id: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  products: Product[];
};

export const catalogue: ProductCategory[] = [
  {
    id: 'transducers',
    icon: Gauge,
    title: 'Transducers & Sensors',
    tagline: 'Precision Measurement Instruments',
    description:
      'High-accuracy sensing solutions for industrial, automotive, defense, and R&D applications. Global-standard transducers distributed with expert technical support.',
    products: [
      {
        slug: 'rotary-torque-sensor',
        title: 'Dynamic / Rotary Torque Sensor',
        image: rotaryTorqueSensorImg,
        description:
          'Compact type torque sensor suitable for various kinds of torque measuring occasions with small volume and high speed. Ideal for motor testing, pump testing, and rotating machinery. Also used for gearbox testing.',
        specs: {
          'Capacity': '1Nm to 5000Nm',
          'Power Supply': '±15V DC / 24V DC',
          'Speed Range': '0–10,000 RPM',
          'Accuracy': '±0.25% / ±0.5%',
          'Signal Output': 'mV, 5–15KHz, 4–20mA, 0–10V',
        },
        categoryId: 'transducers',
      },
      {
        slug: 'reaction-torque-sensor',
        title: 'Reaction / Non-Rotary Torque Sensor',
        image: reactionTorqueSensorImg,
        description:
          'Reaction torque sensor for measurement of torque on stationary objects or within a certain angle rotation. Developed on strain bridge technology. Also used for assembly tools, valve actuators, and screwdriver testing rigs.',
        specs: {
          'Capacity': '1Nm to 5000Nm',
          'Power Supply': '±15V DC / 24V DC',
          'Signal Output': 'mV, 5–15KHz, 4–20mA, 0–10V',
          'Accuracy': '±0.25% / ±0.5%',
        },
        categoryId: 'transducers',
      },
      {
        slug: 's-type-load-cell',
        title: 'S-Type Load Cell',
        image: sTypeLoadCellImg,
        description:
          'Versatile S-beam load cell for tension and compression force measurement. Widely used in hopper, tank, and platform scales.',
        specs: {
          'Capacity': '50kgf – 10tf',
          'Rated Output': '2mV/V ±0.5%',
          'Nonlinearity': '0.01% of R.O',
          'Excitation': '10V recommended',
        },
        categoryId: 'transducers',
      },
      {
        slug: 'single-point-load-cell',
        title: 'Single Point Load Cell',
        image: singlePointLoadCellImg,
        description:
          'Aluminium load cell designed for platform and bench scales. Provides accurate readings regardless of load position on the platform.',
        specs: {
          'Capacity': '10 – 2000 kgf',
          'Rated Output': '1mV/V ±0.5%',
          'Nonlinearity': '0.01% of R.O',
          'Excitation': '10V recommended',
        },
        categoryId: 'transducers',
      },
      {
        slug: 'inclinometer-sensor',
        title: 'Inclinometer Sensor',
        image: inclinometerSensorImg,
        description:
          'High-precision inclinometer measuring orientation angle with respect to gravity. Used in solar tracking, crane monitoring, military, and structural applications.',
        specs: {
          'Angle Range': '0° to 360°',
          'Axis': 'Single or Dual',
          'Resolution': '0.001° to 0.2°',
          'Protection': 'IP67',
        },
        categoryId: 'transducers',
      },
    ],
  },
  {
    id: 'packaging',
    icon: Package,
    title: 'Protective Packaging Labels',
    tagline: 'Transit Monitoring & Protection',
    description:
      'Smart packaging indicators and cushioning solutions that monitor and protect goods during transit. Provides clear visual evidence of mishandling for insurance and quality assurance.',
    products: [
      {
        slug: 'tilt-indicator',
        title: 'Tilt Indicator',
        image: tiltIndicatorImg,
        description:
          'Self-adhesive shipping label that monitors unacceptable tilting on items in transit. When tilt occurs, the display window activates and changes from silver to red, providing tamper evidence of mishandling for transit insurance claims.',
        specs: {
          'Dimension': '75 × 60 × 5 mm',
          'Activated Angle': '≥ 80°',
          'Detection': '180° / 360°',
          'Shelf Life': '2 Years',
        },
        categoryId: 'packaging',
      },
      {
        slug: 'impact-indicator',
        title: 'Impact Indicator',
        image: impactIndicatorImg,
        description:
          'Detects and tracks impact events during transit and storage. When goods are dropped or impacted, the indicator window immediately turns red, indicating potential damage.',
        specs: {
          'Sensitivity': '25G / 37G / 50G / 75G / 100G',
          'Activation': 'Instant on impact',
          'Indication': 'Window turns red',
          'Non-reversible': 'Yes',
        },
        categoryId: 'packaging',
      },
      {
        slug: 'clip-label',
        title: 'Clip Label',
        image: clipLabelImg,
        description:
          'Specifically designed for smaller packages with limited adhesive surfaces. Insert on product surfaces or interior to indicate transport conditions and serve as evidence for compensation.',
        specs: {
          'Dimension': '47 × 29 mm',
          'Sensitivity': '25G / 50G',
          'Tolerance': '± 15%',
          'Shelf Life': '2 Years',
        },
        categoryId: 'packaging',
      },
      {
        slug: 'pallet-cushion',
        title: 'Pallet Cushion',
        image: palletCushionImg,
        description:
          'Air-dampened cushions for reducing vibration and shock during transportation. Designed to mount directly on pallet bases, crates, and wooden cases. Reusable and easy to install.',
        specs: {
          'Colours': 'Tan, Green, Yellow, Blue, Orange',
          'Load Range': '9.6 – 56.7 kg/unit',
          'Reusable': 'Yes',
          'Installation': 'Direct mount on pallets',
        },
        categoryId: 'packaging',
      },
    ],
  },
];

export const allProducts: Product[] = catalogue.flatMap((c) => c.products);

export const getProductBySlug = (slug: string): Product | undefined =>
  allProducts.find((p) => p.slug === slug);

export const getCategoryById = (id: string): ProductCategory | undefined =>
  catalogue.find((c) => c.id === id);

export const getRelatedProducts = (product: Product, limit = 3): Product[] =>
  allProducts.filter((p) => p.categoryId === product.categoryId && p.slug !== product.slug).slice(0, limit);
