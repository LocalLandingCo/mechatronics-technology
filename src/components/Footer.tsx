import { Link } from 'react-router-dom';
import LogoMark from '@/components/LogoMark';

const Footer = () => (
  <footer className="relative bg-card/80 border-t border-border py-12 noise-bg">
    <div className="container mx-auto px-4 md:px-8 relative z-10">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 font-rajdhani font-bold text-lg text-foreground mb-2">
            <LogoMark className="h-8 w-8 text-primary" />
            <span><span className="text-primary">MECHATRONICS</span> TECHNOLOGY</span>
          </div>
          <p className="font-barlow text-sm text-muted-foreground leading-relaxed">
            Precision Sensing & Measurement Solutions — India's trusted industrial sensor distributor.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-rajdhani font-semibold text-sm text-foreground mb-3 uppercase tracking-wider">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Products', href: '/products' },
              { label: 'Markets', href: '/markets' },
              { label: 'Contact', href: '/contact' },
              { label: 'Careers', href: '/careers' },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-barlow text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-rajdhani font-semibold text-sm text-foreground mb-3 uppercase tracking-wider">Contact</h4>
          <div className="font-barlow text-sm text-muted-foreground space-y-1">
            <p>+91 82378 13940</p>
            <p>Kolhapur, Maharashtra, India</p>
            <p>info@mechtec.in</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-10 pt-6 text-center">
        <p className="font-barlow text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mechatronics Technology. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
