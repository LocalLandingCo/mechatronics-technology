import { Link } from 'react-router-dom';
import { Shield, Car, FlaskConical, Cog, Cpu, Wrench } from 'lucide-react';

const ROTARY = { slug: 'rotary-torque-sensor', label: 'Rotary torque sensor' };
const REACTION = { slug: 'reaction-torque-sensor', label: 'Reaction torque sensor' };
const S_TYPE = { slug: 's-type-load-cell', label: 'S-type load cell' };
const SINGLE_POINT = { slug: 'single-point-load-cell', label: 'Single point load cell' };
const INCLINOMETER = { slug: 'inclinometer-sensor', label: 'Inclinometer' };
const IMPACT = { slug: 'impact-indicator', label: 'Impact indicator' };

const sectors = [
  { icon: Shield, title: 'Defence', desc: 'Precision sensors for military platforms, artillery systems, and defence R&D applications', products: [INCLINOMETER, IMPACT] },
  { icon: Car, title: 'Automotive', desc: 'Torque and force measurement for engine testing, chassis R&D, and production QA', products: [ROTARY, REACTION] },
  { icon: FlaskConical, title: 'Research & Development', desc: 'High-accuracy instruments for academic and industrial research laboratories', products: [REACTION, S_TYPE] },
  { icon: Cog, title: 'Industrial Automation', desc: 'Sensing solutions for automated manufacturing, robotics, and process control', products: [S_TYPE, SINGLE_POINT] },
  { icon: Cpu, title: 'Consumer Electronics', desc: 'Micro-sensors and measurement tools for electronic device testing and QC', products: [REACTION, IMPACT] },
  { icon: Wrench, title: 'Engineering', desc: 'General-purpose measurement tools for mechanical, civil, and structural engineering', products: [INCLINOMETER, S_TYPE] },
];

const Markets = () => {
  return (
    <section id="markets" className="relative bg-surface py-14 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-8 md:mb-10">
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground">
            Sensors by Industry
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectors.map((sector) => (
            <div
              key={sector.title}
              className="glow-card flex flex-col group bg-card border border-border rounded-lg p-6 hover:border-primary/40 hover:bg-card transition-all duration-300"
            >
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <sector.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">{sector.title}</h3>
              <p className="font-barlow text-sm text-muted-foreground leading-relaxed flex-1">{sector.desc}</p>
              <ul className="mt-4 pt-4 border-t border-border space-y-1.5">
                {sector.products.map((product) => (
                  <li key={product.slug}>
                    <Link to={`/products/${product.slug}`} className="font-barlow text-sm text-primary hover:underline">
                      {product.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Markets;
