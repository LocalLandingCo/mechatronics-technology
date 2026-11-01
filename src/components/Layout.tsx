import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Shared chrome for every route: the fixed Navbar, the Footer, and the
 * floating WhatsApp button. Extracted so new standalone pages (About,
 * Products, Markets, Contact) don't each hand-roll this trio the way
 * Careers used to.
 */
const Layout = ({ children }: LayoutProps) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    {children}
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Layout;
