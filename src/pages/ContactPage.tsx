<<<<<<< HEAD
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Contact from '@/components/Contact';

const ContactPage = () => (
  <Layout>
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 noise-bg dot-grid overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        <nav className="font-barlow text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Contact</span>
        </nav>
        <h1 className="font-rajdhani font-bold text-4xl md:text-5xl lg:text-6xl text-foreground">
          CONTACT US
        </h1>
        <div className="w-16 h-1 bg-primary mx-auto mt-4" />
      </div>
    </section>
    <Contact />
  </Layout>
);

export default ContactPage;
=======
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
    </div>
  );
};

export default ContactPage;
>>>>>>> claude/mechatronics-tech-website-3a370a
