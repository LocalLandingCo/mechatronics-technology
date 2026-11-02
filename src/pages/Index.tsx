<<<<<<< HEAD
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import Markets from '@/components/Markets';
import Contact from '@/components/Contact';

// Old-style hash links (e.g. shared/bookmarked `/#about`) now have a real,
// dedicated route. Redirect them once on arrival; this never runs again on
// a hash change from clicking an in-page anchor, so normal scrolling and
// the Hero/Products in-page CTAs are untouched.
const HASH_REDIRECTS: Record<string, string> = {
  '#about': '/about',
  '#products': '/products',
  '#markets': '/markets',
  '#contact': '/contact',
};

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const target = HASH_REDIRECTS[location.hash];
    if (target) {
      navigate(target, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Hero />
      <About />
      <Products />
      <Markets />
      <Contact />
    </Layout>
  );
};

export default Index;
=======
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import Markets from '@/components/Markets';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
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
    </div>
  );
};

export default Index;
>>>>>>> claude/mechatronics-tech-website-3a370a
