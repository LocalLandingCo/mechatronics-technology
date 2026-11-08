import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SpecFinder from '@/components/SpecFinder';
import { useSEO } from '@/hooks/useSEO';

const ProductsPage = () => {
  useSEO({
    title: 'Industrial Sensors & Protective Packaging Catalogue | Mechatronics Technology',
    description:
      'Browse torque sensors, load cells, inclinometers, and protective packaging labels distributed by Mechatronics Technology across India. Request a quote on WhatsApp or email.',
    path: '/products',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        title="Product catalogue"
        subtitle="Sensors and transit-protection indicators, supplied across India. Compare range and output, then ask for a quote."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
      />

      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-8">
          <SpecFinder />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
