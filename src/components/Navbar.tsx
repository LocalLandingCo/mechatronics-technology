import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import LogoMark from './LogoMark';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Markets', href: '/markets' },
  { label: 'About', href: '/about' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClassName =
    "font-barlow text-base tracking-wide text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full";
  const mobileLinkClassName = "font-barlow text-muted-foreground hover:text-primary transition-colors py-2";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border shadow-sm"
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 font-display font-bold text-base md:text-lg text-foreground shrink-0 mr-12">
          <LogoMark className="h-9 w-9 md:h-11 md:w-11 text-primary" />
          <span>
            <span className="text-primary">MECHATRONICS</span>{' '}
            <span className="hidden sm:inline">TECHNOLOGY</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 ml-auto">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className={linkClassName}>
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link
            to="/contact"
            className="font-display font-semibold text-sm px-5 py-2 rounded bg-secondary text-secondary-foreground hover:brightness-110 transition-all"
          >
            Get a quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            className="text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} onClick={() => setMobileOpen(false)} className={mobileLinkClassName}>
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="font-display font-semibold text-sm px-5 py-2 rounded bg-secondary text-secondary-foreground text-center"
            >
              Get a quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
