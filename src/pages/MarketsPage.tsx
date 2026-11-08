import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import Markets from '@/components/Markets';
import { useSEO } from '@/hooks/useSEO';

const MarketsPage = () => {
  useSEO({
    title: 'Markets We Serve | Mechatronics Technology',
    description:
      'Mechatronics Technology supplies precision sensors and protective packaging to Defence, Automotive, R&D, Industrial Automation, Consumer Electronics, and Engineering sectors across India.',
    path: '/markets',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        title="Markets we serve"
        subtitle="Precision sensing and transit-protection solutions trusted across six core Indian industry sectors."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Markets' }]}
      />
      <Markets />
      <Footer />
    </div>
  );
};

export default MarketsPage;
