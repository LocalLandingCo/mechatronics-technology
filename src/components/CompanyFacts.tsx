import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ExternalLink } from 'lucide-react';
import { companyFacts, INDIAMART_URL } from '@/data/company';

const CompanyFacts = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="company-facts" className="relative py-14 md:py-20 noise-bg overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <h2 className="font-rajdhani font-bold text-3xl md:text-4xl lg:text-5xl text-foreground">
            Company <span className="text-primary">Factsheet</span>
          </h2>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {companyFacts.map((fact, i) => (
            <div
              key={fact.label}
              className={`glow-card bg-card/30 backdrop-blur border border-border rounded-lg p-5 ${
                isVisible ? `animate-fade-up delay-${((i % 4) + 1) * 100}` : 'opacity-0'
              }`}
            >
              <dt className="font-barlow text-sm text-muted-foreground">{fact.label}</dt>
              <dd className="font-rajdhani font-bold text-lg text-foreground mt-1 break-words">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="text-center mt-8">
          <a
            href={INDIAMART_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-rajdhani font-semibold text-primary hover:underline"
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
