import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PageHero from '@/components/PageHero';
import Contact from '@/components/Contact';
import { useSEO } from '@/hooks/useSEO';

const ContactPage = () => {
  useSEO({
    title: 'Contact Us | Mechatronics Technology',
    description:
      'Get in touch with Mechatronics Technology for sensor and protective packaging enquiries. Call +91 82378 13940, email info@mechtec.in, or send a message online.',
    path: '/contact',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        title="CONTACT US"
        subtitle="Share your application details for a technical consultation and quote — we typically respond within one business day."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ContactPage;
