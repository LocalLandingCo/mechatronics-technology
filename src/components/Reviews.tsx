import { ExternalLink, MapPin, Star } from 'lucide-react';
import { buyerRating, INDIAMART_REVIEWS_URL, type BuyerReview } from '@/data/company';

const Bar = ({ label, percent }: { label: string; percent: number }) => (
  <div className="flex items-center gap-3">
    <span className="font-barlow text-sm text-muted-foreground w-20 shrink-0">{label}</span>
    <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
      <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
    </div>
    <span className="font-display font-semibold text-sm text-foreground w-10 text-right">{percent}%</span>
  </div>
);

export const RatingSummary = ({ className = '' }: { className?: string }) => (
  <div className={`glow-card flex flex-col bg-card border border-border rounded-lg p-6 ${className}`}>
    <div className="flex items-end gap-2">
      <span className="font-display font-bold text-6xl leading-none text-foreground">{buyerRating.score}</span>
      <span className="font-display font-semibold text-xl text-muted-foreground">/ 5</span>
      <Star className="w-6 h-6 mb-1 ml-1 text-primary fill-primary" aria-hidden="true" />
    </div>
    <p className="font-barlow text-sm text-muted-foreground mt-2">Based on {buyerRating.count} buyer ratings</p>

    {/* These groups share any extra height when the panel is stretched to match the map. */}
    <div className="flex-[3] flex flex-col justify-evenly gap-3 mt-6">
      {buyerRating.breakdown.map((item) => <Bar key={item.label} {...item} />)}
    </div>
    <div className="flex-[2] flex flex-col justify-evenly gap-3 mt-6 pt-6 border-t border-border">
      {buyerRating.stars.map((item) => <Bar key={item.label} {...item} />)}
    </div>

    <a
      href={INDIAMART_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 font-display font-semibold text-primary mt-6 hover:underline"
    >
      Read all reviews on IndiaMART
      <ExternalLink className="w-4 h-4" />
    </a>
  </div>
);

export const ReviewCard = ({ review }: { review: BuyerReview }) => (
  <div className="glow-card flex flex-col bg-card border border-border rounded-lg p-5">
    <h3 className="font-display font-bold text-lg text-foreground">{review.name}</h3>
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
);
