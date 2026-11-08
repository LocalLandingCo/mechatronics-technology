import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ShieldCheck, Truck, Handshake, Scale, BadgeIndianRupee, Package } from 'lucide-react';

const reasons = [
  { icon: ShieldCheck, title: 'Quality assured products', desc: 'Instruments chosen for ease of use, strong performance and a long operating life.' },
  { icon: Truck, title: 'Timely deliveries', desc: 'Shipped by road to buyers across India. IndiaMART buyers rate our delivery at 100%.' },
  { icon: Handshake, title: 'Transparent dealings', desc: 'Clear commercial dealings have made us a preferred name among our clients.' },
  { icon: Scale, title: 'Ethical business policies', desc: 'A GST-registered business, trading since 2018.' },
  { icon: BadgeIndianRupee, title: 'Industry leading prices', desc: 'Economical pricing across diverse product configurations.' },
  { icon: Package, title: 'Careful packing', desc: 'Goods are packed into standard corrugated boxes for delivery.' },
];

const WhyUs = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="why-us" className="relative py-14 md:py-20 noise-bg overflow-hidden" ref={ref}>
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="font-barlow text-xs tracking-widest text-primary uppercase">Working With Us</span>
          <h2 className="font-rajdhani font-bold text-3xl md:text-4xl lg:text-5xl mt-3 text-foreground">
            Why Buy From <span className="text-primary">Us</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className={`glow-card bg-card/30 backdrop-blur border border-border rounded-lg p-6 hover:border-primary/40 transition-colors ${
                isVisible ? `animate-fade-up delay-${(i + 1) * 100}` : 'opacity-0'
              }`}
            >
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-4">
                <reason.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-rajdhani font-bold text-lg leading-snug text-foreground mb-2">{reason.title}</h3>
              <p className="font-barlow text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
