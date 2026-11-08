import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProductBySlug, type Product } from '@/data/products';

const slides = [
  'inclinometer-sensor',
  'digital-tilt-sensor',
  'tilt-switch-sensor',
  'inertial-measurement-unit',
  'shock-indicator-labels',
  'tilt-indicator',
  'impact-indicator',
  'pallet-cushion',
].map((slug) => getProductBySlug(slug)).filter((p): p is Product => Boolean(p));

const AUTOPLAY_MS = 3500;
const SWIPE_PX = 40;

/** Fanned card carousel: the active product sits in front, neighbours slide behind it. */
const HeroCarousel = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const swiped = useRef(false);
  const count = slides.length;

  const step = useCallback((delta: number) => setActive((a) => (a + delta + count) % count), [count]);

  useEffect(() => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || calm) return;
    const timer = window.setInterval(() => step(1), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, step]);

  const onPointerUp = (x: number) => {
    if (pointerStart.current === null) return;
    const dx = x - pointerStart.current;
    pointerStart.current = null;
    swiped.current = Math.abs(dx) > SWIPE_PX;
    if (swiped.current) step(dx < 0 ? 1 : -1);
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured products"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="relative h-[325px] sm:h-[420px] lg:h-[335px] xl:h-[405px] touch-pan-y select-none [perspective:1200px]"
        onPointerDown={(e) => { pointerStart.current = e.clientX; swiped.current = false; }}
        onPointerUp={(e) => onPointerUp(e.clientX)}
        onPointerCancel={() => { pointerStart.current = null; }}
      >
        {slides.map((product, i) => {
          let offset = (i - active + count) % count;
          if (offset > count / 2) offset -= count;
          const distance = Math.abs(offset);
          const isFront = offset === 0;
          const specs = Object.entries(product.specs).slice(0, 2);

          return (
            <Link
              key={product.slug}
              to={`/products/${product.slug}`}
              draggable={false}
              tabIndex={isFront ? 0 : -1}
              aria-hidden={!isFront}
              onClick={(e) => {
                if (swiped.current) { e.preventDefault(); return; }
                if (!isFront) { e.preventDefault(); setActive(i); }
              }}
              className="hero-slide group absolute top-0 left-1/2 w-[72%] sm:w-[60%] rounded-xl overflow-hidden border border-border bg-card shadow-xl"
              style={{
                transform: `translateX(calc(-50% + ${offset * 30}%)) rotateY(${offset * -14}deg) scale(${1 - distance * 0.13})`,
                zIndex: 10 - distance,
                opacity: distance > 2 ? 0 : 1 - distance * 0.25,
                pointerEvents: distance > 2 ? 'none' : undefined,
              }}
            >
              <div className="bg-white aspect-[4/3]">
                <img
                  src={product.image}
                  alt={isFront ? product.title : ''}
                  draggable={false}
                  className="w-full h-full object-contain p-3"
                  width={1000}
                  height={750}
                  {...(i === 0 ? { fetchpriority: 'high' } : {})}
                />
              </div>
              <div className="p-4 border-t border-border">
                <p className="font-rajdhani font-bold text-base sm:text-lg text-foreground truncate">{product.title}</p>
                <dl className="grid grid-cols-2 gap-3 mt-2">
                  {specs.map(([key, value]) => (
                    <div key={key} className="min-w-0">
                      <dt className="font-barlow text-xs text-muted-foreground truncate">{key}</dt>
                      <dd className="font-rajdhani font-semibold text-sm text-foreground truncate">{value}</dd>
                    </div>
                  ))}
                </dl>
                <span className="font-rajdhani font-semibold text-sm text-primary inline-flex items-center gap-1 mt-2">
                  View specs
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 mt-3">
        <button type="button" onClick={() => step(-1)} aria-label="Previous product" className="w-11 h-11 flex items-center justify-center rounded-full text-foreground hover:text-primary transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center">
          {slides.map((product, i) => (
            <button
              key={product.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${product.title}`}
              aria-current={i === active}
              className="h-11 px-1 flex items-center"
            >
              <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/40'}`} />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => step(1)} aria-label="Next product" className="w-11 h-11 flex items-center justify-center rounded-full text-foreground hover:text-primary transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel;
