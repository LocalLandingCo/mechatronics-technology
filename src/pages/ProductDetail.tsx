import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSEO } from '@/hooks/useSEO';
import { getProductBySlug, getRelatedProducts, getCategoryById } from '@/data/products';
import { ArrowLeft } from 'lucide-react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

const WHATSAPP_NUMBER = '918237813940';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  useSEO({
    title: product
      ? `${product.title} | Mechatronics Technology`
      : 'Product Not Found | Mechatronics Technology',
    description: product
      ? `${product.description} Request pricing and availability from Mechatronics Technology, Kolhapur.`
      : 'This product could not be found.',
    path: `/products/${slug ?? ''}`,
  });

  useEffect(() => {
    if (!product) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description: product.description,
      brand: { '@type': 'Brand', name: 'Mechatronics Technology' },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'INR',
        seller: { '@type': 'Organization', name: 'Mechatronics Technology' },
      },
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [product]);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const category = getCategoryById(product.categoryId);
  const related = getRelatedProducts(product);

  const requestQuote = () => {
    const msg = `Hi, I'm interested in *${product.title}*. Please share pricing and availability details.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="font-barlow text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
            {category && (
              <>
                <span className="mx-2">/</span>
                <Link to="/products" className="hover:text-primary transition-colors">{category.title}</Link>
              </>
            )}
            <span className="mx-2">/</span>
            <span className="text-foreground" aria-current="page">{product.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-white border border-border flex items-center justify-center">
              <img src={product.image} alt={product.title} className="w-full h-full object-contain p-6" decoding="async" width={1024} height={1024} {...{ fetchpriority: 'high' }} />
            </div>

            <div>
              <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mt-3 mb-6 text-foreground">
                {product.title}
              </h1>
              <p className="font-barlow text-muted-foreground leading-relaxed mb-6">{product.description}</p>

              {product.minOrder && (
                <div className="mb-8">
                  <span className="font-barlow text-sm text-muted-foreground block">Minimum order</span>
                  <span className="font-display font-bold text-2xl text-foreground">{product.minOrder}</span>
                </div>
              )}

              <h2 className="font-display font-semibold text-sm text-primary mb-3">
                Technical Specifications
              </h2>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="bg-muted/50 rounded-lg p-3 border border-border/50">
                    <span className="font-barlow text-[10px] text-muted-foreground block">
                      {key}
                    </span>
                    <span className="font-display font-semibold text-sm text-foreground mt-1 block">{value}</span>
                  </div>
                ))}
              </div>

              {product.applications && (
                <>
                  <h2 className="font-display font-semibold text-sm text-primary mb-3">
                    Applications
                  </h2>
                  <ul className="font-barlow text-sm text-muted-foreground list-disc pl-5 space-y-1.5 mb-8">
                    {product.applications.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={requestQuote}
                  className="font-display font-semibold text-sm flex items-center gap-2 px-6 py-3 rounded bg-secondary text-secondary-foreground hover:brightness-110 transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Get a quote on WhatsApp
                </button>
                <Link
                  to="/contact"
                  className="font-display font-semibold text-sm flex items-center gap-2 px-6 py-3 rounded border border-border text-foreground hover:border-primary/40 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8">
              Related Products
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/products/${rel.slug}`}
                  className="glow-card group border border-border rounded-lg overflow-hidden bg-card hover:border-primary/40 transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-contain bg-white p-2 group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
 decoding="async" width={1024} height={1024}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors">
                      {rel.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4 md:px-8">
          <Link to="/products" className="inline-flex items-center gap-2 font-barlow text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to full catalogue
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
