import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
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
      <WhatsAppButton />
    </div>
  );
};

export default AboutPage;
