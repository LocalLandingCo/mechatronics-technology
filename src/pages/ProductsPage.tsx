import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { useSEO } from '@/hooks/useSEO';
import { catalogue } from '@/data/products';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

const WHATSAPP_NUMBER = '918237813940';

const requestQuote = (productTitle: string) => {
  const msg = `Hi, I'm interested in *${productTitle}*. Please share pricing and availability details.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
};

const ProductsPage = () => {
  useSEO({
    title: 'Industrial Sensors & Protective Packaging Catalogue | Mechatronics Technology',
    description:
      'Browse torque sensors, load cells, inclinometers, and protective packaging labels distributed by Mechatronics Technology across India. Request a quote on WhatsApp or email.',
    path: '/products',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        title="PRODUCT CATALOGUE"
        subtitle="Precision transducers and transit-protection indicators, distributed across India with expert technical guidance."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 space-y-20">
          {catalogue.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} id={cat.id}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-rajdhani font-bold text-2xl md:text-3xl text-foreground">{cat.title}</h2>
                    <p className="font-barlow text-xs text-primary uppercase tracking-widest">{cat.tagline}</p>
                  </div>
                </div>
                <p className="font-barlow text-muted-foreground max-w-3xl mb-8">{cat.description}</p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {cat.products.map((product) => (
                    <div
                      key={product.slug}
                      className="group border border-border rounded-lg overflow-hidden bg-card/30 backdrop-blur hover:border-primary/40 transition-all duration-300 flex flex-col"
                    >
                      <Link to={`/products/${product.slug}`} className="block aspect-[4/3] overflow-hidden bg-muted">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </Link>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-rajdhani font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                          <Link to={`/products/${product.slug}`}>{product.title}</Link>
                        </h3>
                        <p className="font-barlow text-sm text-muted-foreground mt-2 line-clamp-2 flex-1">
                          {product.description}
                        </p>
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
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
