import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import Markets from '@/components/Markets';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useSEO } from '@/hooks/useSEO';

const Index = () => {
  useSEO({
    title: 'Mechatronics Technology — Torque Sensors, Load Cells & Industrial Measurement Solutions India',
    description:
      "Mechatronics Technology is India's trusted B2B distributor of torque sensors, load cells, inclinometers, and protective packaging indicators. Serving defense, automotive, and R&D sectors from Kolhapur, Maharashtra since 2018.",
    path: '/',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Markets />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
