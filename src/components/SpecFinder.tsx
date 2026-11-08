import { useState } from 'react';
import { Link } from 'react-router-dom';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import { finderGroups, finderProducts, type FinderGroup } from '@/data/specFinder';
import { whatsappQuoteUrl } from '@/data/company';

type Filter = FinderGroup | 'All';

const filters: Filter[] = ['All', ...finderGroups];
const specGrid = 'md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,1.8fr)_minmax(0,1.8fr)_5.5rem] md:gap-5 md:items-center';
const rowGrid = 'md:grid-cols-[5.5rem_minmax(0,1fr)_9rem] md:gap-6';

const countFor = (filter: Filter) =>
  filter === 'All' ? finderProducts.length : finderProducts.filter((p) => p.group === filter).length;

/** Filterable comparison of the catalogue: table rows on desktop, cards on phones. */
const SpecFinder = ({ limit }: { limit?: number }) => {
  const [filter, setFilter] = useState<Filter>('All');
  const [expanded, setExpanded] = useState(false);

  const matches = filter === 'All' ? finderProducts : finderProducts.filter((p) => p.group === filter);
  const rows = limit && !expanded ? matches.slice(0, limit) : matches;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter products">
        {filters.map((option) => {
          const active = option === filter;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option)}
              className={`min-h-11 px-4 rounded-full border font-display font-semibold text-sm transition-colors ${
                active ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-foreground hover:border-primary hover:text-primary'
              }`}
            >
              {option} <span className="opacity-70">{countFor(option)}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">{rows.length} products shown</p>

      <div className="md:bg-card md:border md:border-border md:rounded-lg md:shadow-md md:overflow-hidden">
        <div className={`hidden md:grid ${rowGrid} items-center bg-muted px-5 py-3 font-barlow text-sm font-semibold text-foreground`} aria-hidden="true">
          <span>Photo</span>
          <div className={specGrid}>
            <span>Product</span>
            <span>Range</span>
            <span>Output</span>
            <span>Min. order</span>
          </div>
          <span />
        </div>

        <ul className="space-y-2 md:space-y-0">
          {rows.map((product) => (
            <li
              key={product.slug}
              className={`spec-row group relative grid grid-cols-[4rem_minmax(0,1fr)_3.5rem] ${rowGrid} gap-x-3 items-center bg-card border border-border rounded-lg shadow-sm p-3 md:bg-transparent md:border-0 md:border-t md:rounded-none md:shadow-none md:p-4 md:px-5 transition-colors hover:bg-primary/5`}
            >
              <div className="w-16 h-16 md:w-[5.5rem] md:h-[5.5rem] bg-white border border-border rounded overflow-hidden">
                <img
                  src={product.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={88}
                  height={88}
                  className="w-full h-full object-contain p-1 transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className={`min-w-0 space-y-0.5 md:space-y-0 ${specGrid}`}>
                <h3 className="font-display font-bold text-[0.9375rem] md:text-[1.0625rem] leading-snug text-foreground group-hover:text-primary transition-colors">
                  <Link to={`/products/${product.slug}`} className="after:absolute after:inset-0">
                    {product.title}
                  </Link>
                </h3>
                <p className="font-barlow text-sm leading-snug text-muted-foreground md:text-foreground">
                  <span className="sr-only">Range: </span>{product.range}
                </p>
                <p className="hidden md:block font-barlow text-sm text-muted-foreground">
                  <span className="sr-only">Output: </span>{product.output}
                </p>
                <p className="hidden md:block font-barlow text-sm text-muted-foreground">
                  <span className="sr-only">Minimum order: </span>{product.minOrder ?? 'On request'}
                </p>
              </div>

              <a
                href={whatsappQuoteUrl(product.title)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Get a quote for ${product.title} on WhatsApp`}
                className="relative z-10 h-14 md:h-11 flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 rounded bg-secondary text-secondary-foreground font-display font-semibold text-xs md:text-sm hover:brightness-110 transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span className="md:hidden">Quote</span>
                <span className="hidden md:inline">Get a quote</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {rows.length < matches.length && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="min-h-11 px-6 rounded border border-primary text-primary font-display font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Show all {matches.length} products
          </button>
        </div>
      )}
    </div>
  );
};

export default SpecFinder;
