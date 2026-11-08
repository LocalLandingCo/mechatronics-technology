import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import india from '@svg-maps/india';
import { RatingSummary } from '@/components/Reviews';
import { useInView } from '@/hooks/useInView';
import { buyerReviews, HOME_COORDS } from '@/data/company';

// Fitted to the map artwork, which uses a Mercator projection.
const project = ([latitude, longitude]: [number, number]) => ({
  x: 20.8826 * longitude - 1422.104,
  y: -20.9525 * ((Math.log(Math.tan(Math.PI / 4 + (latitude * Math.PI) / 360)) * 180) / Math.PI) + 837.626,
});

const home = project(HOME_COORDS);
const buyerRegions = new Set(buyerReviews.map((review) => review.region));

const buyers = buyerReviews.map((review) => {
  const point = project(review.coords);
  const [city, state] = review.location.split(', ');
  const midX = (home.x + point.x) / 2;
  const midY = (home.y + point.y) / 2;
  // Bow each route to one side so routes to nearby cities stay apart.
  const curve = `M${home.x} ${home.y} Q${midX + (home.y - point.y) * 0.16} ${midY + (point.x - home.x) * 0.16} ${point.x} ${point.y}`;
  const summary = `${city}, ${state}: ${review.product ?? 'Product not listed'}`;
  return { key: `${review.name}-${review.date}`, city, summary, state, point, curve };
});

const stateCount = new Set(buyers.map((buyer) => buyer.state)).size;
const headingClass = 'font-display font-bold text-3xl md:text-4xl text-foreground';

const BuyerMap = () => {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const [active, setActive] = useState<string | null>(null);
  const activeBuyer = buyers.find((buyer) => buyer.key === active);

  return (
    <section id="buyers" className="band-dark blueprint relative py-14 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-12 lg:gap-14">
        <div className="flex flex-col">
          <h2 className={headingClass}>Buyer ratings on IndiaMART</h2>
          <RatingSummary className="mt-6 lg:flex-1" />
          <Link
            to="/reviews"
            className="self-start inline-flex items-center gap-2 min-h-11 mt-3 font-display font-semibold text-primary hover:underline"
          >
            Check more reviews
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div ref={ref} className={inView ? 'is-drawn' : ''}>
          <h2 className={headingClass}>Our buyers across India</h2>
          <p className="font-barlow text-muted-foreground mt-3 max-w-xl leading-relaxed">
            Routes from Kolhapur to {buyers.length} cities in {stateCount} states, each from a buyer rating on IndiaMART.
          </p>
          <p className="font-display font-semibold text-sm text-foreground mt-3 min-h-10 sm:min-h-5" aria-live="polite">
            {activeBuyer ? activeBuyer.summary : 'Select a pin to see what each buyer bought.'}
          </p>

          <svg viewBox={india.viewBox} role="group" aria-label="Map of India with routes from Kolhapur to buyer cities" className="block w-full max-w-[34rem] h-auto mx-auto mt-2">
            {india.locations.map((region) => (
              <path
                key={region.id}
                d={region.path}
                className={buyerRegions.has(region.id) ? 'fill-primary/30' : 'fill-muted'}
                stroke="hsl(var(--background))"
                strokeWidth={0.8}
              />
            ))}

            {buyers.map((buyer, i) => (
              <path
                key={buyer.key}
                d={buyer.curve}
                pathLength={1}
                fill="none"
                className={`map-route stroke-primary ${active === buyer.key ? 'is-active' : ''}`}
                style={{ transitionDelay: inView && !active ? `${i * 90}ms` : undefined }}
              />
            ))}

            {buyers.map((buyer, i) => (
              <g
                key={buyer.key}
                role="button"
                tabIndex={0}
                aria-label={buyer.summary}
                aria-pressed={active === buyer.key}
                className="map-target"
                onMouseEnter={() => setActive(buyer.key)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(buyer.key)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(buyer.key)}
              >
                {/* Keeps the pin easy to tap on a phone, where the map is drawn small. */}
                <circle cx={buyer.point.x} cy={buyer.point.y} r={22} fill="transparent" />
                <circle
                  cx={buyer.point.x}
                  cy={buyer.point.y}
                  r={active === buyer.key ? 9 : 6}
                  className="map-pin fill-primary stroke-background"
                  strokeWidth={2}
                  style={{ transitionDelay: inView && !active ? `${700 + i * 90}ms` : undefined }}
                />
              </g>
            ))}

            <circle cx={home.x} cy={home.y} r={9} className="fill-secondary stroke-background" strokeWidth={2} />
            <text x={home.x - 14} y={home.y + 6} textAnchor="end" className="map-label">Kolhapur</text>

            {activeBuyer && (
              <text x={activeBuyer.point.x + 14} y={activeBuyer.point.y - 8} className="map-label">
                {activeBuyer.city}
              </text>
            )}
          </svg>
          <p className="font-barlow text-xs text-muted-foreground mt-2">
            Illustrative map, not an authoritative boundary. Outline: SVG Maps by Victor Cazanave, CC BY 4.0.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BuyerMap;
