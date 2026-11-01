import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Briefcase, Mail, MapPin, Phone } from 'lucide-react';

const Careers = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 noise-bg dot-grid overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <nav className="font-barlow text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Careers</span>
          </nav>
          <h1 className="font-rajdhani font-bold text-4xl md:text-5xl lg:text-6xl text-foreground">
            CAREERS
          </h1>
          <div className="w-16 h-1 bg-primary mx-auto mt-4" />
        </div>
      </section>

      {/* Content */}
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <div className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            {/* Main message */}
            <div className="bg-card/40 backdrop-blur border border-border rounded-lg p-8 md:p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-rajdhani font-bold text-2xl md:text-3xl text-foreground mb-6">
                Join Our Team
              </h2>
              <p className="font-barlow text-lg text-muted-foreground leading-relaxed mb-8">
                If you're motivated and energetic professional with a passion for engineering and a drive to succeed, we look forward to hearing from you.
              </p>

              <div className="border-t border-border pt-8">
                <p className="font-barlow text-muted-foreground mb-4">Contact us at</p>
                <a
                  href="mailto:info@mechtec.in"
                  className="inline-flex items-center gap-2 font-rajdhani font-semibold text-lg text-primary hover:text-primary/80 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  info@mechtec.in
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 text-sm text-muted-foreground font-barlow">
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  +91 82378 13940
                </span>
                <span className="hidden sm:inline text-border">|</span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Kolhapur, Maharashtra, India
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
