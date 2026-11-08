import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SlidersHorizontal, MessagesSquare, PencilRuler, CalendarCheck } from 'lucide-react';

const reasons = [
  {
    icon: SlidersHorizontal,
    title: 'Help choosing the right instrument',
    desc: 'Tell us what you need to measure and the range. We match it to a sensor that fits your application.',
  },
  {
    icon: MessagesSquare,
    title: 'Answers from technical people',
    desc: 'The company was founded by technologists, so your questions get an engineering answer.',
  },
  {
    icon: PencilRuler,
    title: 'Custom requirements',
    desc: "If a standard model doesn't fit your setup, ask us about a custom solution.",
  },
  {
    icon: CalendarCheck,
    title: 'Availability confirmed with your quote',
    desc: 'Every quote covers availability, so you can plan your project around it.',
  },
];

const WhyUs = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="why-us" className="relative py-14 md:py-20 noise-bg overflow-hidden" ref={ref}>
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="font-barlow text-xs tracking-widest text-primary uppercase">Working With Us</span>
          <h2 className="font-rajdhani font-bold text-3xl md:text-4xl lg:text-5xl mt-3 text-foreground">
            Why Buy From <span className="text-primary">Us</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className={`glow-card bg-card/30 backdrop-blur border border-border rounded-lg p-6 hover:border-primary/40 transition-colors ${
                isVisible ? `animate-fade-up delay-${(i + 1) * 100}` : 'opacity-0'
              }`}
            >
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-4">
                <reason.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-rajdhani font-bold text-lg leading-snug text-foreground mb-2">{reason.title}</h3>
              <p className="font-barlow text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
