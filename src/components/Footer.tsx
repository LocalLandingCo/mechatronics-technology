import { Link } from 'react-router-dom';
import LogoMark from '@/components/LogoMark';
import { Heart } from 'lucide-react';
import { allProducts } from '@/data/products';
import { GST_NUMBER, INDIAMART_URL } from '@/data/company';

const Footer = () => (
  <footer className="relative bg-card/80 border-t border-border py-12 noise-bg">
    <div className="container mx-auto px-4 md:px-8 relative z-10">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 font-rajdhani font-bold text-lg text-foreground mb-2">
            <LogoMark className="h-8 w-8 text-primary" />
            <span><span className="text-primary">MECHATRONICS</span> TECHNOLOGY</span>
          </div>
          <p className="font-barlow text-sm text-muted-foreground leading-relaxed">
            Wholesale distributor of precision sensing and measurement instruments, supplying Indian industry since 2018.
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

        {/* Products */}
        <div>
          <h4 className="font-rajdhani font-semibold text-sm text-foreground mb-3 uppercase tracking-wider">Products</h4>
          <div className="flex flex-col gap-2">
            {allProducts.slice(0, 5).map((product) => (
              <Link
                key={product.slug}
                to={`/products/${product.slug}`}
                className="font-barlow text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {product.title}
              </Link>
            ))}
            <Link to="/products" className="font-barlow text-sm text-primary hover:underline">All products</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-rajdhani font-semibold text-sm text-foreground mb-3 uppercase tracking-wider">Contact</h4>
          <div className="font-barlow text-sm text-muted-foreground space-y-1">
            <p><a href="tel:+918237813940" className="hover:text-primary transition-colors">+91 82378 13940</a></p>
            <p>Kolhapur, Maharashtra, India</p>
            <p><a href="mailto:info@mechtec.in" className="hover:text-primary transition-colors">info@mechtec.in</a></p>
            <p>GST: {GST_NUMBER}</p>
            <p className="pt-2">
              <a href={INDIAMART_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Find us on IndiaMART
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-10 pt-6 text-center">
        <p className="font-barlow text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mechatronics Technology. All rights reserved.
        </p>
        <p className="font-barlow text-xs text-muted-foreground mt-2 inline-flex items-center gap-1">
          Site created with love
          <Heart className="w-3 h-3 text-secondary fill-secondary" aria-hidden="true" />
          by LocalLandingCo
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
