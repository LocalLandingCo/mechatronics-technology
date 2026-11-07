import { Link } from 'react-router-dom';
import { Fragment } from 'react';

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
};

const PageHero = ({ title, subtitle, crumbs }: PageHeroProps) => (
  <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 noise-bg dot-grid overflow-hidden">
    <div className="absolute inset-0 gradient-mesh pointer-events-none" />
    <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
      <nav aria-label="Breadcrumb" className="font-barlow text-sm text-muted-foreground mb-6">
        {crumbs.map((crumb, i) => (
          <Fragment key={crumb.label}>
            {i > 0 && <span className="mx-2">/</span>}
            {crumb.href ? (
              <Link to={crumb.href} className="hover:text-primary transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-foreground" aria-current="page">
                {crumb.label}
              </span>
            )}
          </Fragment>
        ))}
      </nav>
      <h1 className="font-rajdhani font-bold text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight animate-fade-up">{title}</h1>
      <div className="w-16 h-1 bg-primary mx-auto mt-4 title-underline" />
      {subtitle && (
        <p className="font-barlow text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </div>
  </section>
);

export default PageHero;
