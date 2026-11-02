<<<<<<< HEAD
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Markets from '@/components/Markets';

const MarketsPage = () => (
  <Layout>
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 noise-bg dot-grid overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        <nav className="font-barlow text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Markets</span>
        </nav>
        <h1 className="font-rajdhani font-bold text-4xl md:text-5xl lg:text-6xl text-foreground">
          MARKETS
        </h1>
        <div className="w-16 h-1 bg-primary mx-auto mt-4" />
      </div>
    </section>
    <Markets />
  </Layout>
);

export default MarketsPage;
=======
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import Markets from '@/components/Markets';
import { useSEO } from '@/hooks/useSEO';

const MarketsPage = () => {
  useSEO({
    title: 'Markets We Serve | Mechatronics Technology',
    description:
      'Mechatronics Technology supplies precision sensors and protective packaging to Defense, Automotive, R&D, Industrial Automation, Consumer Electronics, and Engineering sectors across India.',
    path: '/markets',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        title="MARKETS WE SERVE"
        subtitle="Precision sensing and transit-protection solutions trusted across six core Indian industry sectors."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Markets' }]}
      />
      <Markets />
      <Footer />
    </div>
  );
};

export default MarketsPage;
>>>>>>> claude/mechatronics-tech-website-3a370a
