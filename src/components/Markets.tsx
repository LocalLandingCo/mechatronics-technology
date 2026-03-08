import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Shield, Car, FlaskConical, Cog, Cpu, Wrench } from 'lucide-react';

const sectors = [
  { icon: Shield, title: 'Defense', desc: 'Precision sensors for military platforms, artillery systems, and defense R&D applications' },
  { icon: Car, title: 'Automotive', desc: 'Torque and force measurement for engine testing, chassis R&D, and production QA' },
  { icon: FlaskConical, title: 'Research & Development', desc: 'High-accuracy instruments for academic and industrial research laboratories' },
  { icon: Cog, title: 'Industrial Automation', desc: 'Sensing solutions for automated manufacturing, robotics, and process control' },
  { icon: Cpu, title: 'Consumer Electronics', desc: 'Micro-sensors and measurement tools for electronic device testing and QC' },
  { icon: Wrench, title: 'Engineering', desc: 'General-purpose measurement tools for mechanical, civil, and structural engineering' },
];

const Markets = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="markets" className="relative py-24 md:py-32 noise-bg grid-lines overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="font-barlow text-xs tracking-widest text-primary uppercase">Markets We Serve</span>
          <h2 className="font-rajdhani font-bold text-3xl md:text-4xl lg:text-5xl mt-3 text-foreground">
            Trusted Across <span className="text-primary">6+ Sectors</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sectors.map((sector, i) => (
            <div
              key={sector.title}
              className={`group bg-card/30 backdrop-blur border border-border rounded-lg p-6 hover:border-primary/40 hover:bg-card/60 transition-all duration-300 ${
                isVisible ? `animate-fade-up delay-${(i + 1) * 100}` : 'opacity-0'
              }`}
            >
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <sector.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-rajdhani font-bold text-lg text-foreground mb-2">{sector.title}</h3>
              <p className="font-barlow text-xs text-muted-foreground leading-relaxed">{sector.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Markets;
