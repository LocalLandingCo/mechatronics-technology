import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { catalogue } from '@/data/products';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

const WHATSAPP_NUMBER = '918237813940';

const requestQuote = (productTitle: string) => {
  const msg = `Hi, I'm interested in *${productTitle}*. Please share pricing and availability details.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
};

const Products = () => {
  const { ref, isVisible } = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState<string>('transducers');

  const activeCat = catalogue.find((c) => c.id === activeCategory)!;

  return (
    <section id="products" className="relative py-14 md:py-20 noise-bg overflow-hidden" ref={ref}>
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="font-barlow text-xs tracking-widest text-primary uppercase">Our Products</span>
          <h2 className="font-rajdhani font-bold text-3xl md:text-4xl lg:text-5xl mt-3 text-foreground">
            Product <span className="text-primary">Catalogue</span>
          </h2>
          <p className="font-barlow text-muted-foreground mt-4 max-w-2xl mx-auto">
            Comprehensive range of sensing instruments and protective packaging solutions for industrial applications.
          </p>
        </div>

        {/* Category Tabs */}
        <div className={`flex flex-col sm:flex-row gap-4 mb-12 ${isVisible ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
          {catalogue.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={isActive}
                className={`flex-1 group relative p-6 rounded-lg border transition-all duration-300 text-left ${
                  isActive ? 'border-primary/60 bg-primary/10 cyan-glow' : 'border-border bg-card/50 hover:border-primary/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'bg-primary/20' : 'bg-muted'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <h3
                      className={`font-rajdhani font-bold text-lg md:text-xl transition-colors ${
                        isActive ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {cat.title}
                    </h3>
                    <p className="font-barlow text-xs text-muted-foreground mt-1">{cat.tagline}</p>
                  </div>
                </div>
                {isActive && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary rounded-full" />}
              </button>
            );
          })}
        </div>

        {/* Category Description */}
        <div className={`mb-10 ${isVisible ? 'animate-fade-up delay-300' : 'opacity-0'}`}>
          <p className="font-barlow text-muted-foreground max-w-3xl">{activeCat.description}</p>
        </div>

        {/* Products Grid */}
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-5 ${isVisible ? 'animate-fade-up delay-400' : 'opacity-0'}`}>
          {activeCat.products.map((product) => (
            <div
              key={product.slug}
              className="glow-card group border border-border rounded-lg overflow-hidden bg-card/30 backdrop-blur hover:border-primary/40 transition-all duration-300 flex flex-col"
            >
              <Link to={`/products/${product.slug}`} className="block aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
 decoding="async" width={1024} height={1024}
                />
              </Link>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-rajdhani font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  <Link to={`/products/${product.slug}`}>{product.title}</Link>
                </h3>
                <p className="font-barlow text-sm text-muted-foreground mt-2 line-clamp-2 flex-1">{product.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Link
                    to={`/products/${product.slug}`}
                    className="font-rajdhani font-semibold text-xs flex items-center gap-1.5 px-4 py-2 rounded border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Details
                  </Link>
                  <button
                    onClick={() => requestQuote(product.title)}
                    className="font-rajdhani font-semibold text-xs flex items-center gap-1.5 px-4 py-2 rounded bg-secondary text-secondary-foreground hover:brightness-110 transition-all"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-12 text-center ${isVisible ? 'animate-fade-up delay-600' : 'opacity-0'}`}>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 font-rajdhani font-semibold text-sm px-6 py-3 rounded bg-secondary text-secondary-foreground hover:brightness-110 transition-all amber-glow"
          >
            View Full Catalogue
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
