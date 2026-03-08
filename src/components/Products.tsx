import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Gauge, Weight, RotateCcw, Package } from 'lucide-react';

const products = [
  {
    icon: Gauge,
    title: 'Torque Sensors',
    description: 'Precision torque measurement solutions for automotive testing, R&D labs, and industrial quality assurance. Static and dynamic measurement capabilities.',
  },
  {
    icon: Weight,
    title: 'Load Cells & Force Sensors',
    description: 'Industrial-grade load measurement for manufacturing, weighing systems, and structural testing. Available in compression, tension, and universal configurations.',
  },
  {
    icon: RotateCcw,
    title: 'Inclinometer / Tilt Sensors',
    description: 'Accurate tilt and angle measurement instruments for construction, defense platforms, and automation systems. High-precision MEMS-based technology.',
  },
];

const Products = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="products" className="relative py-24 md:py-32 noise-bg overflow-hidden" ref={ref}>
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="font-barlow text-xs tracking-widest text-primary uppercase">Our Products</span>
          <h2 className="font-rajdhani font-bold text-3xl md:text-4xl lg:text-5xl mt-3 text-foreground">
            Sensing & Measurement{' '}
            <span className="text-primary">Instruments</span>
          </h2>
          <p className="font-barlow text-muted-foreground mt-4 max-w-2xl mx-auto">
            World-class sensors from leading global manufacturers, distributed with expert technical support and after-sales service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <div
              key={product.title}
              className={`group relative bg-card/50 backdrop-blur border border-border rounded-lg p-8 hover:border-primary/40 transition-all duration-300 dot-grid ${
                isVisible ? `animate-fade-up delay-${(i + 1) * 200}` : 'opacity-0'
              }`}
            >
              <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center mb-5 group-hover:cyan-glow transition-shadow duration-300">
                <product.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-foreground">{product.title}</h3>
              <p className="font-barlow text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          ))}
        </div>

        {/* Extra mention */}
        <div className={`mt-8 flex items-center justify-center gap-3 ${isVisible ? 'animate-fade-up delay-700' : 'opacity-0'}`}>
          <Package className="w-4 h-4 text-secondary" />
          <span className="font-barlow text-sm text-muted-foreground">
            Also available: <span className="text-secondary font-medium">Protective Packaging Labels</span> for secure product shipping
          </span>
        </div>
      </div>
    </section>
  );
};

export default Products;
