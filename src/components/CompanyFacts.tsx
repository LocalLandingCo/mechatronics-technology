import { ExternalLink } from 'lucide-react';
import { companyFacts, INDIAMART_URL } from '@/data/company';

const CompanyFacts = () => {
  return (
    <section id="company-facts" className="relative py-14 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-8 md:mb-10">
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground">
            Company Factsheet
          </h2>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {companyFacts.map((fact) => (
            <div
              key={fact.label}
              className="glow-card bg-card border border-border rounded-lg p-5"
            >
              <dt className="font-barlow text-sm text-muted-foreground">{fact.label}</dt>
              <dd className="font-display font-bold text-lg text-foreground mt-1 break-words">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="text-center mt-8">
          <a
            href={INDIAMART_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-display font-semibold text-primary hover:underline"
          >
            View our IndiaMART page
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CompanyFacts;
