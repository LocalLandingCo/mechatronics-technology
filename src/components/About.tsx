import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import LogoMark from '@/components/LogoMark';

const differentiators = [
  'Uncompromising Quality Standards',
  'Customer-Centric Service',
  'Timely Delivery Assurance',
  'Custom Solutions & Technical Support',
];

const About = ({ compact = false }: { compact?: boolean }) => {
  const { ref, isVisible } = useScrollReveal();

  if (compact) {
    return (
      <section id="about" className="relative py-14 md:py-20 noise-bg grid-lines overflow-hidden" ref={ref}>
        <div className={`container mx-auto px-4 md:px-8 relative z-10 max-w-3xl text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <LogoMark className="mx-auto h-14 w-14 text-primary mb-4" />
          <h2 className="font-rajdhani font-bold text-3xl md:text-4xl text-foreground">About Mechatronics Technology</h2>
          <p className="font-barlow text-muted-foreground leading-relaxed mt-4">
            A Kolhapur-based wholesale distributor and trader of sensing and measurement instruments, founded by seasoned technologists and supplying Indian industry since 2018.
          </p>
          <Link to="/about" className="inline-flex items-center gap-2 font-rajdhani font-semibold text-primary mt-6 hover:underline">
            More about us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="relative py-14 md:py-20 noise-bg grid-lines overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Animated diagram */}
          <div className={`relative flex items-center justify-center h-[300px] md:h-[400px] ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            {/* Circuit-style box */}
            <div className="absolute w-[250px] h-[250px] md:w-[320px] md:h-[320px] border border-primary/20 rounded-lg rotate-45">
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 rounded-full bg-secondary animate-pulse-glow delay-500" />
              <div className="absolute -top-1.5 -right-1.5 w-2 h-2 rounded-full bg-primary/50 animate-pulse-glow delay-300" />
              <div className="absolute -bottom-1.5 -left-1.5 w-2 h-2 rounded-full bg-secondary/50 animate-pulse-glow delay-700" />
            </div>
            <div className="absolute w-[180px] h-[180px] md:w-[220px] md:h-[220px] border border-primary/10 rounded-lg rotate-[30deg] animate-orbit" style={{ animationDuration: '30s' }} />
            <div className="relative text-center -rotate-0">
              <LogoMark className="mx-auto h-20 w-20 md:h-28 md:w-28 text-primary drop-shadow-[0_0_12px_hsl(var(--primary)/0.5)]" />
              <div className="font-barlow text-xs text-muted-foreground tracking-widest mt-1">SINCE 2018</div>
            </div>
          </div>

          {/* Right: Content */}
          <div className={`${isVisible ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
            <span className="font-barlow text-xs tracking-widest text-primary uppercase">About Us</span>
            <h2 className="font-rajdhani font-bold text-3xl md:text-4xl lg:text-5xl mt-3 mb-6 text-foreground">
              Engineering Trust Through{' '}
              <span className="text-primary">Precision</span>
            </h2>
            <p className="font-barlow text-muted-foreground leading-relaxed mb-6">
              Mechatronics Technology is a Kolhapur-based wholesale distributor and trader of high-performance sensing and measurement instruments. Founded by seasoned technologists, we represent leading global principals to deliver world-class sensors to Indian industry.
            </p>
            <p className="font-barlow text-muted-foreground leading-relaxed mb-8">
              Our product range includes torque sensors, load cells, force sensors, inclinometers, and protective packaging solutions — all backed by rigorous quality standards and expert technical guidance.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {differentiators.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-barlow text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
