import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import LogoMark from '@/components/LogoMark';

const differentiators = [
  'Quality assured products',
  'Timely deliveries',
  'Transparent dealings',
  'Ethical business policies',
  'Industry leading prices',
  'Goods packed in standard corrugated boxes',
];

const About = ({ compact = false }: { compact?: boolean }) => {
  if (compact) {
    return (
      <section id="about" className="relative bg-surface py-14 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <LogoMark className="h-14 w-14 text-primary mb-4" />
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">About Mechatronics Technology</h2>
          <p className="font-barlow text-muted-foreground leading-relaxed mt-4 max-w-2xl">
            Established in 2018, we are a Kolhapur-based wholesale trader of sensors, measurement instruments and protective packaging, working under the guidance of our mentor, Mr. Akshay Kulkarni.
          </p>
          <Link to="/about" className="inline-flex items-center gap-2 font-display font-semibold text-primary mt-6 hover:underline">
            More about us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="relative bg-surface py-14 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: logo */}
          <div className="relative flex items-center justify-center h-[300px] md:h-[400px]">
            <div className="relative text-center">
              <LogoMark className="mx-auto h-20 w-20 md:h-28 md:w-28 text-primary" />
              <div className="font-barlow text-xs text-muted-foreground mt-1">Since 2018</div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6 text-foreground">
              Engineering Trust Through Precision
            </h2>
            <p className="font-barlow text-muted-foreground leading-relaxed mb-6">
              Established in 2018, Mechatronics Technology is a Kolhapur-based wholesale trader of digital meters, Leeb hardness testers, load cells, tilt sensors and protective packaging. Our products are valued by clients for being easy to use, performing well and lasting a long time, and they are available in diverse configurations.
            </p>
            <p className="font-barlow text-muted-foreground leading-relaxed mb-8">
              We work under the guidance of our mentor, Mr. Akshay Kulkarni, whose knowledge and experience in this field have helped us build a large clientele across India.
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
