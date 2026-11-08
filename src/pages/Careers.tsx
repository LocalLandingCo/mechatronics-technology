import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { useSEO } from '@/hooks/useSEO';
import { Briefcase, Mail, MapPin, Phone } from 'lucide-react';

const Careers = () => {
  useSEO({
    title: 'Careers | Mechatronics Technology',
    description:
      'Join Mechatronics Technology, a Kolhapur-based industrial sensor distributor. We welcome motivated, energetic professionals with a passion for engineering.',
    path: '/careers',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <PageHero title="Careers" crumbs={[{ label: 'Home', href: '/' }, { label: 'Careers' }]} />

      {/* Content */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <div>
            {/* Main message */}
            <div className="bg-card border border-border rounded-lg p-8 md:p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-6">
                Join Our Team
              </h2>
              <p className="font-barlow text-lg text-muted-foreground leading-relaxed mb-8">
                If you're motivated and energetic professional with a passion for engineering and a drive to succeed, we look forward to hearing from you.
              </p>

              <div className="border-t border-border pt-8">
                <p className="font-barlow text-muted-foreground mb-4">Contact us at</p>
                <a
                  href="mailto:info@mechtec.in"
                  className="inline-flex items-center gap-2 font-display font-semibold text-lg text-primary hover:text-primary/80 transition-colors"
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

      <Footer />
    </div>
  );
};

export default Careers;
