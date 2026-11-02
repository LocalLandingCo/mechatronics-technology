import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Markets', to: '/markets' },
  { label: 'Contact', to: '/contact' },
  { label: 'Careers', to: '/careers' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const renderLink = (link: typeof navLinks[0], onClick?: () => void) => {
    const className = "font-barlow text-base tracking-wide text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full";
    const mobileClassName = "font-barlow text-muted-foreground hover:text-primary transition-colors py-2";

    return (
      <Link key={link.to} to={link.to} onClick={onClick} className={onClick ? mobileClassName : className}>
        {link.label}
      </Link>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="font-rajdhani font-bold text-lg md:text-xl tracking-wider text-foreground shrink-0 mr-12">
          <span className="text-primary">MECHATRONICS</span>{' '}
          <span className="hidden sm:inline">TECHNOLOGY</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 ml-auto">
          {navLinks.map((link) => renderLink(link))}
          <ThemeToggle />
          <Link
            to="/contact"
            className="font-rajdhani font-semibold text-sm px-5 py-2 rounded bg-secondary text-secondary-foreground hover:brightness-110 transition-all amber-glow"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            className="text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => renderLink(link, () => setMobileOpen(false)))}
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="font-rajdhani font-semibold text-sm px-5 py-2 rounded bg-secondary text-secondary-foreground text-center"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
