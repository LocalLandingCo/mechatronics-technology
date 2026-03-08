import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="relative bg-card/80 border-t border-border py-12 noise-bg">
    <div className="container mx-auto px-4 md:px-8 relative z-10">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="font-rajdhani font-bold text-lg text-foreground mb-2">
            <span className="text-primary">MECHATRONICS</span> TECHNOLOGY
          </div>
          <p className="font-barlow text-sm text-muted-foreground leading-relaxed">
            Precision Sensing & Measurement Solutions — India's trusted industrial sensor distributor.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-rajdhani font-semibold text-sm text-foreground mb-3 uppercase tracking-wider">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {['Home', 'About', 'Products', 'Markets', 'Contact'].map((link) => (
              <a
                key={link}
                href={`/#${link.toLowerCase()}`}
                className="font-barlow text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
            <Link
              to="/careers"
              className="font-barlow text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Careers
            </Link>
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
