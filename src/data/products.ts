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
import digitalTiltSensorImg from '@/assets/products/digital-tilt-sensor.jpg';
import tiltSwitchSensorImg from '@/assets/products/tilt-switch-sensor.jpg';
import inertialMeasurementUnitImg from '@/assets/products/inertial-measurement-unit.jpg';
import shockIndicatorLabelsImg from '@/assets/products/shock-indicator-labels.jpg';

export type Product = {
  slug: string;
  title: string;
  image: string;
  description: string;
  specs: Record<string, string>;
  categoryId: string;
  minOrder?: string;
  applications?: string[];
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
      'High-accuracy sensing solutions for industrial, automotive, defence, and R&D applications. Global-standard transducers distributed with expert technical support.',
    products: [
      {
        slug: 'inclinometer-sensor',
        title: 'Digital Inclinometer Sensor',
        image: inclinometerSensorImg,
        description:
          "MEMS inclinometer with single or dual axis measurement and a choice of analog or digital outputs. Resolution and accuracy can be customized.",
        specs: {
          'Measuring Range': '-90° to 90°',
          'Axis': 'Single / Dual',
          'Output': '0-5V, 0-10V, 4-20mA, RS485, RS232',
          'Power Source': '9-35 V DC',
          'Sensor': 'MEMS',
          'Working Current': '40 mA',
          'Weight': '350 g',
          'Material': 'Metal',
          'Resolution': 'Customizable',
          'Accuracy': 'Customizable',
        },
        categoryId: 'transducers',
        minOrder: '1 piece',
        applications: [
          'Indicating pitch and roll of vehicles, nautical craft and aircraft',
          'Monitoring the boom angle of cranes and material handlers',
          'Setting solar panels to the optimal angle to maximize output',
          'Measuring the look angle of a satellite antenna towards a satellite',
        ],
      },
      {
        slug: 'digital-tilt-sensor',
        title: 'Digital Tilt Sensor',
        image: digitalTiltSensorImg,
        description:
          "MEMS tilt sensor in single or dual axis, base mounted, with analog and digital output options. Accuracy can be customized on request.",
        specs: {
          'Measuring Range': '±90°',
          'Axis': 'Single / Dual',
          'Output': '0-5V, 4-20mA, RS485, RS232',
          'Supply Voltage': '10-30 V DC',
          'Sensor': 'MEMS',
          'Current': '50 mA',
          'Frequency': 'Up to 100 Hz',
          'Protection': 'IP65, IP67 or IP68',
          'Operating Temperature': '-40 to +85 °C',
          'Mounting': 'Base Mount',
          'Material': 'Metal / ABS Plastic',
          'Accuracy': 'Customizable',
        },
        categoryId: 'transducers',
        minOrder: '1 piece',
        applications: [
          'Indicating pitch and roll of vehicles, nautical craft and aircraft',
          'Monitoring the boom angle of cranes and material handlers',
          'Setting solar panels to the optimal angle to maximize output',
          'Measuring the look angle of a satellite antenna towards a satellite',
        ],
      },
      {
        slug: 'tilt-switch-sensor',
        title: 'Tilt Switch Sensor',
        image: tiltSwitchSensorImg,
        description:
          "MEMS tilt switch that monitors inclination. When the angle exceeds the alarm threshold, it gives a relay or voltage output to drive a buzzer system. The threshold can be set to suit your setup. Small, stable and cost effective.",
        specs: {
          'Angle Range': '0° to ±90°',
          'Axis': 'Dual',
          'Output': 'Relay / Voltage',
          'Supply Voltage': '9-30 V DC',
          'Sensor': 'MEMS',
          'Mounting': 'Surface Mount',
          'Protection': 'IP65 / IP67',
          'Usage': 'Industrial',
        },
        categoryId: 'transducers',
        minOrder: '1 piece',
      },
      {
        slug: 'inertial-measurement-unit',
        title: 'Inertial Measurement Unit Sensor',
        image: inertialMeasurementUnitImg,
        description:
          "Measures the inertial attitude of moving carriers, sensing an object's acceleration, angular velocity and orientation using accelerometers, gyroscopes and sometimes magnetometers.",
        specs: {
          'Measures': 'Acceleration, angular velocity, orientation',
          'Output': 'Modbus',
          'Resolution': '0.01',
          'Supply Voltage': '12-35 V',
          'Sensor': 'MEMS',
          'Housing': 'Aluminium',
          'Protection': 'IP67',
        },
        categoryId: 'transducers',
        minOrder: '5 pieces',
      },
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
        slug: 'shock-indicator-labels',
        title: 'Shock Indicator Labels',
        image: shockIndicatorLabelsImg,
        description:
          "Shock or impact indicator labels for sensitive product packaging, used to reduce the cost of transit damage.",
        specs: {
          'G Level': '25 g',
          'Label Size': '97 × 97 mm',
          'Activation Type': 'Single Use',
          'Mounting': 'Self Adhesive',
          'Indicator': 'Color Change',
          'Operating Temperature': '−25 to 80 °C',
          'Material': 'Plastic, self-adhesive back',
          'Origin': 'India',
        },
        categoryId: 'packaging',
        minOrder: '1000 pieces',
      },
      {
        slug: 'tilt-indicator',
        title: 'Tilt Indicator Label',
        image: tiltIndicatorImg,
        description:
          "Detects tilting of a shipment during transportation, helping reduce transit damage to the goods inside. Gives a clear indication if the shipment tilts more than 80 degrees.",
        specs: {
          'Activation': 'Tilt over 80°',
          'Label Size': '50 × 25 mm',
          'Activation Type': 'Single Use',
          'Mounting': 'Self Adhesive',
          'Indicator': 'Color Change',
          'Operating Temperature': '−25 to 80 °C',
          'Material': 'Plastic',
          'Origin': 'Made in India',
        },
        categoryId: 'packaging',
        minOrder: '100 pieces',
      },
      {
        slug: 'impact-indicator',
        title: 'Impact Indicator 2 Label',
        image: impactIndicatorImg,
        description:
          "Tamper-proof, field-armable labels that turn bright red when a specific impact threshold is exceeded, indicating potential damage during shipping or storage.",
        specs: {
          'G Level': '25 g',
          'Label Size': '50 × 50 mm',
          'Activation Type': 'Single Use',
          'Mounting': 'Self Adhesive',
          'Indicator': 'Window Display',
          'Operating Temperature': '−25 to 80 °C',
          'Material': 'Plastic',
          'Origin': 'Made in India',
        },
        categoryId: 'packaging',
        minOrder: '100 pieces',
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
        title: 'Pallet Cushion / Dampers',
        image: palletCushionImg,
        description:
          "Air-dampened cushion for reducing vibration and shock during transportation, designed to mount directly on pallet bases, crates and wooden cases. A durable, cost-effective way to protect shipments with minimal size and weight.",
        specs: {
          'Load Capacity': '51 to 100 kg',
          'Material': 'Polyurethane',
          'Mounting': 'Bolt On',
          'Frequency Range': 'Up to 10 Hz',
          'Shape': 'Round',
          'Colours': 'Multiple',
          'Application': 'HVAC equipment, compressors, pumps, DG sets',
        },
        categoryId: 'packaging',
        minOrder: '100 pieces',
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
