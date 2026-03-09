import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Gauge, Weight, RotateCcw, Package, ChevronRight, ChevronDown, ArrowRight, Shield, Tag, Boxes, Layers, X, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type SubProduct = {
  title: string;
  image: string;
  description: string;
  specs?: Record<string, string>;
};

type ProductCategory = {
  title: string;
  image: string;
  description: string;
  specs?: Record<string, string>;
  subProducts?: SubProduct[];
};

type MainCategory = {
  id: string;
  icon: typeof Gauge;
  title: string;
  tagline: string;
  description: string;
  products: ProductCategory[];
};

const catalogue: MainCategory[] = [
  {
    id: 'transducers',
    icon: Gauge,
    title: 'Transducers & Sensors',
    tagline: 'Precision Measurement Instruments',
    description: 'High-accuracy sensing solutions for industrial, automotive, defense, and R&D applications. Global-standard transducers distributed with expert technical support.',
    products: [
      {
        title: 'Torque Sensors',
        image: '/images/products/rotary-torque-sensor.jpg',
        description: 'Compact torque sensors developed on strain bridge technology, suitable for various torque measuring occasions with small volume and high speed.',
        specs: {
          'Capacity': '1Nm – 5000Nm',
          'Accuracy': '±0.25% / ±0.5%',
          'Signal Output': 'mV, 5–15KHz, 4–20mA, 0–10V',
          'Speed Range': 'Up to 10,000 RPM',
        },
        subProducts: [
          {
            title: 'Dynamic / Rotary Torque Sensor',
            image: '/images/products/rotary-torque-sensor.jpg',
            description: 'Compact type torque sensor suitable for various kinds of torque measuring occasions with small volume and high speed. Ideal for motor testing, pump testing, and rotating machinery.',
            specs: {
              'Capacity': '1Nm to 5000Nm',
              'Power Supply': '±15V DC / 24V DC',
              'Speed Range': '0–10,000 RPM',
              'Accuracy': '±0.25% / ±0.5%',
            },
          },
          {
            title: 'Reaction / Non-Rotary Torque Sensor',
            image: '/images/products/reaction-torque-sensor.jpg',
            description: 'Reaction torque sensor for measurement of torque on stationary objects or within a certain angle rotation. Developed on strain bridge technology.',
            specs: {
              'Capacity': '1Nm to 5000Nm',
              'Power Supply': '±15V DC / 24V DC',
              'Signal Output': 'mV, 5–15KHz, 4–20mA, 0–10V',
            },
          },
        ],
      },
      {
        title: 'Load Cells',
        image: '/images/products/s-type-load-cell.jpg',
        description: 'Industrial-grade load measurement sensors available in multiple configurations for manufacturing, weighing systems, and structural testing applications.',
        specs: {
          'Rated Output': '1–2 mV/V ±0.5%',
          'Nonlinearity': '0.01% of R.O',
          'Excitation': '10V recommended',
        },
        subProducts: [
          {
            title: 'S-Type Load Cell',
            image: '/images/products/s-type-load-cell.jpg',
            description: 'Versatile S-beam load cell for tension and compression force measurement. Widely used in hopper, tank, and platform scales.',
            specs: {
              'Capacity': '50kgf – 10tf',
              'Rated Output': '2mV/V ±0.5%',
              'Nonlinearity': '0.01% of R.O',
              'Excitation': '10V recommended',
            },
          },
          {
            title: 'Single Point Load Cell',
            image: '/images/products/single-point-load-cell.jpg',
            description: 'Designed for platform and bench scales. Provides accurate readings regardless of load position on the platform.',
            specs: {
              'Capacity': '10 – 2000 kgf',
              'Rated Output': '1mV/V ±0.5%',
              'Nonlinearity': '0.01% of R.O',
              'Excitation': '10V recommended',
            },
          },
        ],
      },
      {
        title: 'Inclinometer Sensors',
        image: '/images/products/rotary-torque-sensor.jpg',
        description: 'High-precision inclinometers measuring orientation angle with respect to gravity. Used in solar tracking, crane monitoring, military, and structural applications.',
        specs: {
          'Angle Range': '0° to 360°',
          'Axis': 'Single or Dual',
          'Resolution': '0.001° to 0.2°',
          'Protection': 'IP67',
        },
      },
    ],
  },
  {
    id: 'packaging',
    icon: Package,
    title: 'Protective Packaging Labels',
    tagline: 'Transit Monitoring & Protection',
    description: 'Smart packaging indicators and cushioning solutions that monitor and protect goods during transit. Provides indubitable evidence of mishandling for insurance and quality assurance.',
    products: [
      {
        title: 'Tilt Indicator',
        image: '/images/products/tilt-indicator.jpg',
        description: 'Monitors unacceptable tilting on items in transit. When tilt occurs, the display window activates and changes from silver to red, providing evidence of mishandling.',
        specs: {
          'Dimension': '75 × 60 × 5 mm',
          'Activated Angle': '≥ 80°',
          'Detection': '180° / 360°',
          'Shelf Life': '2 Years',
        },
      },
      {
        title: 'Impact Indicator',
        image: '/images/products/impact-indicator.jpg',
        description: 'Detects and tracks impact events during transit and storage. When goods are dropped or impacted, the indicator window immediately turns red, indicating potential damage.',
        specs: {
          'Sensitivity': '25G / 37G / 50G / 75G / 100G',
          'Activation': 'Instant on impact',
          'Indication': 'Window turns red',
          'Non-reversible': 'Yes',
        },
      },
      {
        title: 'Clip Label',
        image: '/images/products/clip-label.jpg',
        description: 'Specifically designed for smaller packages with limited adhesive surfaces. Insert on product surfaces or interior to indicate transport conditions and serve as evidence for compensation.',
        specs: {
          'Dimension': '47 × 29 mm',
          'Sensitivity': '25G / 50G',
          'Tolerance': '± 15%',
          'Shelf Life': '2 Years',
        },
      },
      {
        title: 'Pallet Cushion',
        image: '/images/products/pallet-cushion.jpg',
        description: 'Air-dampened cushions for reducing vibration and shock during transportation. Designed to mount directly on pallet bases, crates, and wooden cases. Reusable and easy to install.',
        specs: {
          'Colors': 'Tan, Green, Yellow, Blue, Orange',
          'Load Range': '9.6 – 56.7 kg/unit',
          'Reusable': 'Yes',
          'Installation': 'Direct mount on pallets',
        },
      },
    ],
  },
];

const WHATSAPP_NUMBER = '918237813940';

const Products = () => {
  const { ref, isVisible } = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState<string>('transducers');
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [activeSubProduct, setActiveSubProduct] = useState<string | null>(null);
  const [modalProduct, setModalProduct] = useState<SubProduct | ProductCategory | null>(null);

  const activeCat = catalogue.find((c) => c.id === activeCategory)!;

  const toggleProduct = (title: string) => {
    if (expandedProduct === title) {
      setExpandedProduct(null);
      setActiveSubProduct(null);
    } else {
      setExpandedProduct(title);
      setActiveSubProduct(null);
    }
  };

  const openModal = (product: SubProduct | ProductCategory) => {
    setModalProduct(product);
  };

  const requestQuote = (productTitle: string) => {
    const msg = `Hi, I'm interested in *${productTitle}*. Please share pricing and availability details.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

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
                onClick={() => {
                  setActiveCategory(cat.id);
                  setExpandedProduct(null);
                  setActiveSubProduct(null);
                }}
                className={`flex-1 group relative p-6 rounded-lg border transition-all duration-300 text-left ${
                  isActive
                    ? 'border-primary/60 bg-primary/10 cyan-glow'
                    : 'border-border bg-card/50 hover:border-primary/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'bg-primary/20' : 'bg-muted'
                  }`}>
                    <Icon className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <h3 className={`font-rajdhani font-bold text-lg md:text-xl transition-colors ${
                      isActive ? 'text-primary' : 'text-foreground'
                    }`}>
                      {cat.title}
                    </h3>
                    <p className="font-barlow text-xs text-muted-foreground mt-1">{cat.tagline}</p>
                  </div>
                </div>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Category Description */}
        <div className={`mb-10 ${isVisible ? 'animate-fade-up delay-300' : 'opacity-0'}`}>
          <p className="font-barlow text-muted-foreground max-w-3xl">{activeCat.description}</p>
        </div>

        {/* Products Grid */}
        <div className={`space-y-4 ${isVisible ? 'animate-fade-up delay-400' : 'opacity-0'}`}>
          {activeCat.products.map((product) => {
            const isExpanded = expandedProduct === product.title;
            return (
              <div key={product.title} className="border border-border rounded-lg overflow-hidden bg-card/30 backdrop-blur">
                {/* Product Header - Clickable */}
                <button
                  onClick={() => toggleProduct(product.title)}
                  className="w-full flex items-center gap-4 md:gap-6 p-4 md:p-6 text-left hover:bg-muted/30 transition-colors group"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-muted shrink-0 border border-border">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-rajdhani font-bold text-lg md:text-xl text-foreground group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="font-barlow text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
                  </div>
                  <div className="shrink-0">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-primary" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-border animate-fade-up">
                    <div className="p-4 md:p-6">
                      {/* Specs Grid */}
                      {product.specs && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                          {Object.entries(product.specs).map(([key, value]) => (
                            <div key={key} className="bg-muted/50 rounded-lg p-3 border border-border/50">
                              <span className="font-barlow text-[10px] uppercase tracking-wider text-muted-foreground block">{key}</span>
                              <span className="font-rajdhani font-semibold text-sm text-foreground mt-1 block">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* View Details & Quote buttons for products without sub-products */}
                      {(!product.subProducts || product.subProducts.length === 0) && (
                        <div className="flex flex-wrap gap-3 mb-4">
                          <button
                            onClick={() => openModal(product)}
                            className="font-rajdhani font-semibold text-sm flex items-center gap-2 px-5 py-2.5 rounded border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Details
                          </button>
                          <button
                            onClick={() => requestQuote(product.title)}
                            className="font-rajdhani font-semibold text-sm flex items-center gap-2 px-5 py-2.5 rounded bg-secondary text-secondary-foreground hover:brightness-110 transition-all"
                          >
                            Request Quote
                          </button>
                        </div>
                      )}

                      {/* Sub Products */}
                      {product.subProducts && product.subProducts.length > 0 && (
                        <div>
                          <h4 className="font-rajdhani font-semibold text-sm uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
                            <Layers className="w-4 h-4" />
                            Available Variants
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {product.subProducts.map((sub) => {
                              const isSubActive = activeSubProduct === sub.title;
                              return (
                                <div
                                  key={sub.title}
                                  className={`rounded-lg border overflow-hidden transition-all duration-300 ${
                                    isSubActive
                                      ? 'border-primary/40 bg-primary/5'
                                      : 'border-border/50 bg-muted/20 hover:border-primary/20'
                                  }`}
                                >
                                  <div
                                    className="flex items-center gap-4 p-4 cursor-pointer"
                                    onClick={() => setActiveSubProduct(isSubActive ? null : sub.title)}
                                  >
                                    <div className="w-14 h-14 rounded overflow-hidden bg-muted shrink-0 border border-border/50">
                                      <img src={sub.image} alt={sub.title} className="w-full h-full object-cover" loading="lazy" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h5 className="font-rajdhani font-bold text-sm text-foreground">{sub.title}</h5>
                                      <p className="font-barlow text-xs text-muted-foreground mt-0.5 line-clamp-2">{sub.description}</p>
                                    </div>
                                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSubActive ? 'rotate-90 text-primary' : 'text-muted-foreground'}`} />
                                  </div>
                                  {isSubActive && (
                                    <div className="px-4 pb-4 border-t border-border/30 pt-3 animate-fade-up">
                                      {sub.specs && (
                                        <div className="grid grid-cols-2 gap-2 mb-3">
                                          {Object.entries(sub.specs).map(([key, value]) => (
                                            <div key={key} className="bg-background/50 rounded p-2">
                                              <span className="font-barlow text-[9px] uppercase tracking-wider text-muted-foreground block">{key}</span>
                                              <span className="font-rajdhani font-semibold text-xs text-foreground block">{value}</span>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                      <div className="flex flex-wrap gap-2">
                                        <button
                                          onClick={(e) => { e.stopPropagation(); openModal(sub); }}
                                          className="font-rajdhani font-semibold text-xs flex items-center gap-1.5 px-4 py-2 rounded border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
                                        >
                                          <ExternalLink className="w-3.5 h-3.5" />
                                          View Details
                                        </button>
                                        <button
                                          onClick={(e) => { e.stopPropagation(); requestQuote(sub.title); }}
                                          className="font-rajdhani font-semibold text-xs flex items-center gap-1.5 px-4 py-2 rounded bg-secondary text-secondary-foreground hover:brightness-110 transition-all"
                                        >
                                          Request Quote
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className={`mt-12 text-center ${isVisible ? 'animate-fade-up delay-600' : 'opacity-0'}`}>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-rajdhani font-semibold text-sm px-6 py-3 rounded bg-secondary text-secondary-foreground hover:brightness-110 transition-all amber-glow"
          >
            Request Product Specifications
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Product Detail Modal */}
      <Dialog open={!!modalProduct} onOpenChange={(open) => !open && setModalProduct(null)}>
        <DialogContent className="max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
          {modalProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="font-rajdhani font-bold text-2xl text-foreground">
                  {modalProduct.title}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-6">
                {/* Image */}
                <div className="w-full aspect-[16/10] rounded-lg overflow-hidden bg-muted border border-border">
                  <img
                    src={modalProduct.image}
                    alt={modalProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Description */}
                <p className="font-barlow text-muted-foreground leading-relaxed">
                  {modalProduct.description}
                </p>

                {/* Specs */}
                {modalProduct.specs && (
                  <div>
                    <h4 className="font-rajdhani font-semibold text-sm uppercase tracking-wider text-primary mb-3">
                      Technical Specifications
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(modalProduct.specs).map(([key, value]) => (
                        <div key={key} className="bg-muted/50 rounded-lg p-3 border border-border/50">
                          <span className="font-barlow text-[10px] uppercase tracking-wider text-muted-foreground block">{key}</span>
                          <span className="font-rajdhani font-semibold text-sm text-foreground mt-1 block">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => requestQuote(modalProduct.title)}
                    className="font-rajdhani font-semibold text-sm flex items-center gap-2 px-6 py-3 rounded bg-primary text-primary-foreground hover:brightness-110 transition-all cyan-glow"
                  >
                    Request Quote on WhatsApp
                  </button>
                  <a
                    href="#contact"
                    onClick={() => setModalProduct(null)}
                    className="font-rajdhani font-semibold text-sm flex items-center gap-2 px-6 py-3 rounded border border-border text-foreground hover:border-primary/40 transition-colors"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Products;
