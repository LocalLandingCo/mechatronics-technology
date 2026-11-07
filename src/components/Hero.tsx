import { useScrollReveal } from '@/hooks/useScrollReveal';
import { MapPin, Calendar, BarChart3 } from 'lucide-react';

const stats = [
  { icon: Calendar, value: 'Since 2018', label: 'Precision Sensing Partner' },
  { icon: BarChart3, value: '6', label: 'Industry Sectors Served' },
  { icon: MapPin, value: 'Kolhapur', label: 'Maharashtra, India' },
];

const Hero = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center overflow-hidden noise-bg dot-grid" ref={ref} data-spot>
      <div className="absolute inset-0 pointer-spot pointer-events-none hidden md:block" />
      {/* Gradient mesh */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <div className="inline-block px-3 py-1 border border-primary/30 rounded-full mb-6">
              <span className="font-barlow text-xs tracking-widest text-primary uppercase">
                Industrial Sensing Solutions
              </span>
            </div>
            <h1 className="font-rajdhani font-bold text-[2.6rem] sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.02] tracking-tight mb-6">
              <span className="headline-line"><span>Precision Sensing</span></span>
              <span className="headline-line"><span className="text-sweep">&amp; Measurement</span></span>
              <span className="headline-line"><span>Solutions</span></span>
            </h1>
            <p className="font-barlow text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              India's trusted distributor for industrial sensors, load cells, and measurement instruments — serving defense, automotive, R&D, and automation sectors.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#products"
                className="font-rajdhani font-semibold px-7 py-3 rounded bg-primary text-primary-foreground hover:brightness-110 transition-all cyan-glow btn-shine active:scale-95"
              >
                Explore Products
              </a>
              <a
                href="#contact"
                className="font-rajdhani font-semibold px-7 py-3 rounded border border-border text-foreground hover:border-primary hover:text-primary transition-all"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Right: Orbital diagram */}
          <div className="relative flex items-center justify-center h-[350px] md:h-[450px]">
            {/* Outer ring */}
            <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-primary/20 animate-orbit">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-secondary animate-pulse-glow delay-500" />
            </div>
            {/* Middle ring */}
            <div className="absolute w-[200px] h-[200px] md:w-[270px] md:h-[270px] rounded-full border border-primary/15 animate-orbit-reverse">
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary animate-pulse-glow delay-300" />
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-secondary/70 animate-pulse-glow delay-700" />
            </div>
            {/* Inner ring */}
            <div className="absolute w-[100px] h-[100px] md:w-[140px] md:h-[140px] rounded-full border border-primary/10 animate-orbit">
              <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-primary/80 animate-pulse-glow delay-200" />
            </div>
            {/* Center core */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center cyan-glow">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/30 animate-pulse-glow" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 md:mt-20 ${isVisible ? 'animate-fade-up delay-300' : 'opacity-0'}`}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glow-card bg-card/50 backdrop-blur border border-border rounded-lg p-5 flex items-center gap-4 hover:border-primary/40 transition-colors animate-float"
            >
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-rajdhani font-bold text-xl text-foreground">{stat.value}</div>
                <div className="font-barlow text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
