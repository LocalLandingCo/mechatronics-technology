import { Calendar, Phone, Star, BadgeCheck } from 'lucide-react';
import HeroCarousel from '@/components/HeroCarousel';
import { buyerRating, INDIAMART_REVIEWS_URL } from '@/data/company';

const facts = [
  { icon: Calendar, value: 'Since 2018', label: 'Kolhapur, Maharashtra' },
  { icon: BadgeCheck, value: 'GST registered', label: 'Trader and wholesale distributor' },
];

const Hero = () => {
  return (
    <section id="home" className="band-dark blueprint relative min-h-[100svh] flex items-center overflow-hidden" data-spot>
      <div className="absolute inset-0 pointer-spot pointer-events-none hidden md:block" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 pt-24 pb-12">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-12 items-center">
          {/* Left: what we supply and to whom */}
          <div>
            <h1 className="font-display font-bold text-[2.125rem] sm:text-5xl xl:text-[3.5rem] leading-[1.05] mb-6">
              <span className="headline-line"><span>Torque, Load</span></span>
              <span className="headline-line"><span>&amp; Tilt Sensors</span></span>
              <span className="headline-line"><span>for Indian Industry</span></span>
            </h1>
            <p className="font-barlow text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Wholesale distributor of tilt sensors, inclinometers, torque sensors, load cells and protective packaging indicators for defence, automotive and R&amp;D teams.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="font-display font-semibold px-7 py-3 rounded bg-secondary text-secondary-foreground hover:brightness-110 transition-all"
              >
                Get a quote
              </a>
              <a
                href="#products"
                className="font-display font-semibold px-7 py-3 rounded border border-border text-foreground hover:border-primary hover:text-primary transition-all"
              >
                Browse Products
              </a>
            </div>
          </div>

          {/* Right: product carousel */}
          <div>
            <HeroCarousel />
          </div>
        </div>

        {/* Facts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 md:mt-16">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="glow-card bg-card border border-border rounded-lg p-5 flex items-center gap-4 hover:border-primary/40 transition-colors"
            >
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                <fact.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-display font-bold text-lg leading-tight text-foreground">{fact.value}</div>
                <div className="font-barlow text-xs text-muted-foreground mt-0.5">{fact.label}</div>
              </div>
            </div>
          ))}
          <a
            href={INDIAMART_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-card bg-card border border-border rounded-lg p-5 flex items-center gap-4 hover:border-primary/40 transition-colors"
          >
            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-display font-bold text-lg leading-tight text-foreground">{buyerRating.score} / 5 buyer rating</div>
              <div className="font-barlow text-xs text-muted-foreground mt-0.5">{buyerRating.count} ratings on IndiaMART</div>
            </div>
          </a>
          <a
            href="tel:+918237813940"
            className="glow-card bg-card border border-border rounded-lg p-5 flex items-center gap-4 hover:border-primary/40 transition-colors"
          >
            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-display font-bold text-lg leading-tight text-foreground">+91 82378 13940</div>
              <div className="font-barlow text-xs text-muted-foreground mt-0.5">Call for pricing and availability</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
