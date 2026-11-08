import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { MapPin, Calendar, Phone, Factory, ArrowRight } from 'lucide-react';
import { getProductBySlug } from '@/data/products';

const featured = getProductBySlug('rotary-torque-sensor')!;
const featuredSpecs = ['Capacity', 'Speed Range', 'Accuracy'] as const;

const facts = [
  { icon: Calendar, value: 'Since 2018', label: 'Supplying Indian industry' },
  { icon: Factory, value: 'Defense, Automotive, R&D', label: 'Core sectors served' },
  { icon: MapPin, value: 'Kolhapur', label: 'Maharashtra, India' },
];

const Hero = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center overflow-hidden noise-bg dot-grid" ref={ref} data-spot>
      <div className="absolute inset-0 pointer-spot pointer-events-none hidden md:block" />
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 pt-24 pb-12">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-12 items-center">
          {/* Left: what we supply and to whom */}
          <div className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <div className="inline-block px-3 py-1 border border-primary/30 rounded-full mb-6">
              <span className="font-barlow text-xs tracking-widest text-primary uppercase">
                Industrial Sensing Solutions
              </span>
            </div>
            <h1 className="font-rajdhani font-bold text-[2.25rem] sm:text-5xl xl:text-[4rem] leading-[1.02] tracking-tight mb-6">
              <span className="headline-line"><span>Torque Sensors</span></span>
              <span className="headline-line"><span className="text-sweep">&amp; Load Cells</span></span>
              <span className="headline-line"><span>for Indian Industry</span></span>
            </h1>
            <p className="font-barlow text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Wholesale distributor of torque sensors, load cells, inclinometers and protective packaging indicators for defense, automotive and R&amp;D teams.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="font-rajdhani font-semibold px-7 py-3 rounded bg-primary text-primary-foreground hover:brightness-110 transition-all cyan-glow btn-shine active:scale-95"
              >
                Get a Quote
              </a>
              <a
                href="#products"
                className="font-rajdhani font-semibold px-7 py-3 rounded border border-border text-foreground hover:border-primary hover:text-primary transition-all"
              >
                Browse Products
              </a>
            </div>
          </div>

          {/* Right: a real product with its real specs */}
          <Link
            to={`/products/${featured.slug}`}
            className={`glow-card group block rounded-lg overflow-hidden border border-border bg-card hover:border-primary/40 transition-colors ${
              isVisible ? 'animate-fade-up delay-200' : 'opacity-0'
            }`}
          >
            <div className="bg-white aspect-[16/10]">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-contain p-4"
                width={1024}
                height={1024}
                {...{ fetchpriority: 'high' }}
              />
            </div>
            <div className="p-5 border-t border-border">
              <div className="flex items-center justify-between gap-4">
                <p className="font-rajdhani font-bold text-lg text-foreground">{featured.title}</p>
                <span className="font-rajdhani font-semibold text-sm text-primary flex items-center gap-1 shrink-0">
                  View specs
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
              <dl className="grid grid-cols-3 gap-4 mt-4">
                {featuredSpecs.map((key) => (
                  <div key={key}>
                    <dt className="font-barlow text-xs text-muted-foreground">{key}</dt>
                    <dd className="font-rajdhani font-semibold text-sm sm:text-base text-foreground mt-0.5">{featured.specs[key]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Link>
        </div>

        {/* Facts */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 md:mt-16 ${isVisible ? 'animate-fade-up delay-300' : 'opacity-0'}`}>
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="glow-card bg-card/50 backdrop-blur border border-border rounded-lg p-5 flex items-center gap-4 hover:border-primary/40 transition-colors"
            >
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                <fact.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-rajdhani font-bold text-lg leading-tight text-foreground">{fact.value}</div>
                <div className="font-barlow text-xs text-muted-foreground mt-0.5">{fact.label}</div>
              </div>
            </div>
          ))}
          <a
            href="tel:+918237813940"
            className="glow-card bg-card/50 backdrop-blur border border-border rounded-lg p-5 flex items-center gap-4 hover:border-primary/40 transition-colors"
          >
            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-rajdhani font-bold text-lg leading-tight text-foreground">+91 82378 13940</div>
              <div className="font-barlow text-xs text-muted-foreground mt-0.5">Call for pricing and availability</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
