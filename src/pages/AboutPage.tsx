<<<<<<< HEAD
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import About from '@/components/About';

const AboutPage = () => (
  <Layout>
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 noise-bg dot-grid overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        <nav className="font-barlow text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">About</span>
        </nav>
        <h1 className="font-rajdhani font-bold text-4xl md:text-5xl lg:text-6xl text-foreground">
          ABOUT US
        </h1>
        <div className="w-16 h-1 bg-primary mx-auto mt-4" />
      </div>
    </section>
    <About />
  </Layout>
);

export default AboutPage;
=======
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import About from '@/components/About';
import { useSEO } from '@/hooks/useSEO';

const AboutPage = () => {
  useSEO({
    title: 'About Us | Mechatronics Technology — Kolhapur, Maharashtra',
    description:
      "Mechatronics Technology is a Kolhapur-based wholesale distributor and trader of torque sensors, load cells, inclinometers, and protective packaging solutions, serving Indian industry since 2018.",
    path: '/about',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        title="ABOUT US"
        subtitle="A Kolhapur-based wholesale distributor and trader of high-performance sensing and measurement instruments, serving Indian industry since 2018."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />
      <About />
      <Footer />
    </div>
  );
};

export default AboutPage;
>>>>>>> claude/mechatronics-tech-website-3a370a
