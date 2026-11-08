import { lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
const About = lazy(() => import('@/components/About'));
const Products = lazy(() => import('@/components/Products'));
const Markets = lazy(() => import('@/components/Markets'));
const BuyerMap = lazy(() => import('@/components/BuyerMap'));
const WhyUs = lazy(() => import('@/components/WhyUs'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));
import { useSEO } from '@/hooks/useSEO';

const Index = () => {
  useSEO({
    title: 'Mechatronics Technology — Torque Sensors, Load Cells & Industrial Measurement Solutions India',
    description:
      "Mechatronics Technology is India's trusted B2B distributor of torque sensors, load cells, inclinometers, and protective packaging indicators. Serving defence, automotive, and R&D sectors from Kolhapur, Maharashtra since 2018.",
    path: '/',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Suspense fallback={null}>
        <Reveal><Products /></Reveal>
        <Reveal><Markets /></Reveal>
        <BuyerMap />
        <Reveal><WhyUs /></Reveal>
        <Reveal><About compact /></Reveal>
        <Reveal><Contact /></Reveal>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
