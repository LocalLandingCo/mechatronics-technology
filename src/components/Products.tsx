import SpecFinder from '@/components/SpecFinder';

const Products = () => (
  <section id="products" className="relative py-14 md:py-20">
    <div className="container mx-auto px-4 md:px-8">
      <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-8">
        Choose by what you need to measure or protect
      </h2>
      <SpecFinder limit={6} />
    </div>
  </section>
);

export default Products;
