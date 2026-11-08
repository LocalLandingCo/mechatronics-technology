import { Link } from 'react-router-dom';
import { Fragment } from 'react';

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
};

const PageHero = ({ title, subtitle, crumbs }: PageHeroProps) => (
  <section className="relative pt-28 pb-8 md:pt-36 md:pb-12">
    <div className="container mx-auto px-4 md:px-8">
      <nav aria-label="Breadcrumb" className="font-barlow text-sm text-muted-foreground mb-4">
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
      <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground">{title}</h1>
      {subtitle && (
        <p className="font-barlow text-muted-foreground mt-4 max-w-2xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  </section>
);

export default PageHero;
