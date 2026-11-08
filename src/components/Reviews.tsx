import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ExternalLink, MapPin, Star } from 'lucide-react';
import { buyerRating, buyerReviews, INDIAMART_REVIEWS_URL } from '@/data/company';

const Bar = ({ label, percent }: { label: string; percent: number }) => (
  <div className="flex items-center gap-3">
    <span className="font-barlow text-sm text-muted-foreground w-20 shrink-0">{label}</span>
    <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
      <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
    </div>
    <span className="font-rajdhani font-semibold text-sm text-foreground w-10 text-right">{percent}%</span>
  </div>
);

const Reviews = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="reviews" className="relative py-14 md:py-20 noise-bg grid-lines overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="font-barlow text-xs tracking-widest text-primary uppercase">Ratings &amp; Reviews</span>
          <h2 className="font-rajdhani font-bold text-3xl md:text-4xl lg:text-5xl mt-3 text-foreground">
            What Buyers Say on <span className="text-primary">IndiaMART</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-5">
          <div className={`glow-card bg-card/50 backdrop-blur border border-border rounded-lg p-6 ${isVisible ? 'animate-fade-up delay-100' : 'opacity-0'}`}>
            <div className="flex items-end gap-2">
              <span className="font-rajdhani font-bold text-6xl leading-none text-foreground">{buyerRating.score}</span>
              <span className="font-rajdhani font-semibold text-xl text-muted-foreground">/ 5</span>
              <Star className="w-6 h-6 mb-1 ml-1 text-secondary fill-secondary" aria-hidden="true" />
            </div>
            <p className="font-barlow text-sm text-muted-foreground mt-2">Based on {buyerRating.count} buyer ratings</p>

            <div className="space-y-3 mt-6">
              {buyerRating.breakdown.map((item) => <Bar key={item.label} {...item} />)}
            </div>
            <div className="space-y-3 mt-6 pt-6 border-t border-border">
              {buyerRating.stars.map((item) => <Bar key={item.label} {...item} />)}
            </div>

            <a
              href={INDIAMART_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-rajdhani font-semibold text-primary mt-6 hover:underline"
            >
              Read all reviews on IndiaMART
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className={`grid sm:grid-cols-2 xl:grid-cols-3 gap-5 ${isVisible ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
            {buyerReviews.map((review) => (
              <div key={`${review.name}-${review.date}`} className="glow-card flex flex-col bg-card/30 backdrop-blur border border-border rounded-lg p-5">
                <h3 className="font-rajdhani font-bold text-lg text-foreground">{review.name}</h3>
                <p className="font-barlow text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  {review.location}
                </p>
                {review.comment && (
                  <p className="font-barlow text-foreground mt-3">&ldquo;{review.comment}&rdquo;</p>
                )}
                <p className="font-barlow text-sm text-muted-foreground mt-auto pt-3">
                  {review.product ? `${review.product}, ` : ''}{review.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
